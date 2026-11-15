import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
  CaseDoc,
  Contour,
  Landmark,
  LandmarkKind,
  PixelPoint,
  Vec3,
  Volume,
} from '../lib/types';
import { useStore } from '../state/store';
import { SliceView, SliceOverlay } from '../components/SliceView';
import { axialFrame, enfaceFrame, longAxisFrame, samplePix } from '../lib/planes';
import { computeMeasurement, hotSectorRanges, summarySignature } from '../lib/measure';
import { add, pixelToWorld, scale, sub, worldToPixel } from '../lib/geom';
import { WL_PRESETS } from '../render/window';
import { Num, StatusChip } from '../components/ui';
import { IconTarget, IconUndo, IconTrash, IconEye, IconLayers, IconRotate, IconCheck, IconUpload } from '../components/icons';
import { ImportDialog } from './CasesPage';

type Tool =
  | 'contour-annulus'
  | 'contour-lvot'
  | 'ostium-left'
  | 'ostium-right'
  | 'axis-aortic'
  | 'axis-lv'
  | 'caliper'
  | 'access-caliper';

const TOOLS: { id: Tool; label: string; hint: string; color: string; needs2?: boolean }[] = [
  { id: 'contour-annulus', label: '瓣环勾画', hint: '逐层沿瓣环内缘点击,形成闭合轮廓', color: '#ffb44a' },
  { id: 'contour-lvot', label: 'LVOT 勾画', hint: '在瓣环下 5 mm 层面勾画左室流出道', color: '#57c8e8' },
  { id: 'ostium-left', label: '左冠开口', hint: '点击左冠开口中心点', color: '#e8615a' },
  { id: 'ostium-right', label: '右冠开口', hint: '点击右冠开口中心点', color: '#c68ce0' },
  { id: 'axis-aortic', label: '主动脉轴线', hint: '长轴视图:点击两点定义主动脉轴', color: '#9fd0ec', needs2: true },
  { id: 'axis-lv', label: '左室轴线', hint: '长轴视图:点击两点定义左室长轴', color: '#7fd99b', needs2: true },
  { id: 'caliper', label: '冠脉开口测径', hint: '两点测量冠脉开口直径', color: '#f0bd6b', needs2: true },
  { id: 'access-caliper', label: '入路血管测径', hint: '在髂股动脉层面两点测量最小管径', color: '#8bd3c7', needs2: true },
];

const CONTOUR_COLOR = '#ffb44a';
const LVOT_COLOR = '#57c8e8';

export function MeasurementWorkbench({ caseDoc, onNavigate }: { caseDoc: CaseDoc; onNavigate: (v: string) => void }) {
  const { state, volume, loadCaseVolume, volumeLoading, volumeError, updateCase, toast, addAudit } = useStore();
  const conv = state.conventions;
  const [slice, setSlice] = useState(48);
  const [tool, setTool] = useState<Tool>('contour-annulus');
  const [draft, setDraft] = useState<PixelPoint[]>([]);
  const [pendingPoint, setPendingPoint] = useState<Vec3 | null>(null);
  const [pendingLandmark, setPendingLandmark] = useState<{ kind: LandmarkKind; a: Vec3 } | null>(null);
  const [wlIndex, setWlIndex] = useState(0);
  const [window, setWindow] = useState({ center: WL_PRESETS.angio.center, width: WL_PRESETS.angio.width });
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState<'axial' | 'long' | 'enface'>('axial');
  const [azimuth, setAzimuth] = useState(20);
  const [showRingPreview, setShowRingPreview] = useState(true);
  const [importOpen, setImportOpen] = useState(false);
  const loadedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!caseDoc.volumeRef) {
      setImportOpen(true);
      return;
    }
    if (loadedRef.current === caseDoc.volumeRef) return;
    loadedRef.current = caseDoc.volumeRef;
    loadCaseVolume(caseDoc.volumeRef);
  }, [caseDoc.volumeRef, loadCaseVolume]);

  useEffect(() => {
    if (!volume) return;
    const ann = caseDoc.measurement.contours.filter((c) => c.kind === 'annulus');
    const mid = ann.length ? Math.round(ann.reduce((a, c) => a + c.slice, 0) / ann.length) : Math.round(volume.depth * 0.45);
    setSlice(Math.max(0, Math.min(volume.depth - 1, mid)));
  }, [volume, caseDoc.id]);

  const measurement = caseDoc.measurement;
  const summary = useMemo(() => {
    if (!volume || !measurement.contours.some((c) => c.kind === 'annulus' && c.points.length >= 3)) return null;
    try {
      return computeMeasurement(volume, measurement, conv);
    } catch (e) {
      console.warn(e);
      return null;
    }
  }, [volume, measurement, conv]);

  const cachedSignature = summarySignature(caseDoc.summary);
  const liveSignature = summarySignature(summary);
  useEffect(() => {
    if (!summary || !liveSignature) return;
    if (cachedSignature === liveSignature) return;
    updateCase(caseDoc.id, { summary });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveSignature, cachedSignature, caseDoc.id]);

  const wl = { center: window.center, width: window.width };

  const axial = volume ? axialFrame(volume, slice) : null;
  const longFrame = useMemo(() => {
    if (!volume) return null;
    if (summary) return longAxisFrame(volume, summary.ring.center, summary.ring.normal, azimuth, 98, 0.7);
    const c = volume.origin;
    const center: Vec3 = [
      c[0] + volume.axisU[0] * volume.width * volume.spacing[0] * 0.5 + volume.axisV[0] * volume.height * volume.spacing[1] * 0.5 + volume.normal[0] * slice * volume.spacing[2],
      c[1] + volume.axisU[1] * volume.width * volume.spacing[0] * 0.5 + volume.axisV[1] * volume.height * volume.spacing[1] * 0.5 + volume.normal[1] * slice * volume.spacing[2],
      c[2] + volume.axisU[2] * volume.width * volume.spacing[0] * 0.5 + volume.axisV[2] * volume.height * volume.spacing[1] * 0.5 + volume.normal[2] * slice * volume.spacing[2],
    ];
    return longAxisFrame(volume, center, volume.normal, azimuth, 98, 0.7);
  }, [volume, summary, azimuth, slice]);

  const enface = useMemo(() => {
    if (!summary) return null;
    return enfaceFrame(summary.ring.center, summary.ring.basisU, summary.ring.basisV, 62, 0.4);
  }, [summary]);

  const commitMeasurement = useCallback(
    (m: { contours: Contour[]; landmarks: Landmark[] }, note?: string) => {
      updateCase(caseDoc.id, { measurement: m });
      if (note) addAudit(caseDoc.id, '测量更新', note);
    },
    [caseDoc.id, updateCase, addAudit],
  );

  const addContourPoint = (p: Vec3) => {
    if (!volume || tool !== 'contour-annulus' && tool !== 'contour-lvot') return;
    const pix = worldToPixel(p, volume);
    const kind = tool === 'contour-annulus' ? 'annulus' : 'lvot';
    const pts = [...draft, { x: pix.x, y: pix.y, slice }];
    setDraft(pts);
    // auto-close when the new point lands near the first
    if (pts.length >= 4) {
      const first = pts[0];
      const d = Math.hypot(first.x - pix.x, first.y - pix.y);
      if (d < 1.6) closeContour(pts.slice(0, -1), kind);
    }
  };

  const closeContour = (pts: PixelPoint[], kind: 'annulus' | 'lvot') => {
    if (pts.length < 3) {
      toast('至少需要 3 个点才能形成闭合轮廓', 'warn');
      return;
    }
    const existing = measurement.contours.find((c) => c.kind === kind && c.slice === slice);
    const contour: Contour = {
      id: existing?.id ?? `${kind}-${slice}-${Date.now().toString(36)}`,
      kind,
      slice,
      points: pts,
    };
    const contours = existing
      ? measurement.contours.map((c) => (c.id === existing.id ? contour : c))
      : [...measurement.contours, contour];
    commitMeasurement(
      { ...measurement, contours },
      `${kind === 'annulus' ? '瓣环' : 'LVOT'} 第 ${slice + 1} 层轮廓:${pts.length} 个顶点`,
    );
    setDraft([]);
    setPendingPoint(null);
  };

  const placeLandmark = (p: Vec3, frameKind: 'axial' | 'longaxis' | 'enface') => {
    if (tool === 'caliper' || tool === 'axis-aortic' || tool === 'axis-lv' || tool === 'access-caliper') {
      if (!pendingLandmark || pendingLandmark.kind !== tool) {
        setPendingLandmark({ kind: tool, a: p });
        return;
      }
      const kind: LandmarkKind = tool;
      const existing = measurement.landmarks.find((l) => l.kind === kind);
      const lm: Landmark = {
        id: existing?.id ?? `${kind}-${Date.now().toString(36)}`,
        kind,
        a: pendingLandmark.a,
        b: p,
        pickedOn: frameKind,
        pickedSlice: slice,
      };
      const landmarks = existing
        ? measurement.landmarks.map((l) => (l.id === existing.id ? lm : l))
        : [...measurement.landmarks, lm];
      commitMeasurement(
        { ...measurement, landmarks },
        `标注 ${labelForKind(kind)}`,
      );
      setPendingLandmark(null);
      setPendingPoint(null);
      return;
    }
    if (tool === 'ostium-left' || tool === 'ostium-right') {
      const existing = measurement.landmarks.find((l) => l.kind === tool);
      const lm: Landmark = {
        id: existing?.id ?? `${tool}-${Date.now().toString(36)}`,
        kind: tool,
        a: p,
        pickedOn: frameKind,
        pickedSlice: slice,
      };
      const landmarks = existing
        ? measurement.landmarks.map((l) => (l.id === existing.id ? lm : l))
        : [...measurement.landmarks, lm];
      commitMeasurement({ ...measurement, landmarks }, `标注${tool === 'ostium-left' ? '左' : '右'}冠开口`);
    }
  };

  const handlePointer = (
    p: Vec3,
    _frame: typeof axial,
    phase: 'down' | 'move' | 'up' | 'leave',
    plane: 'axial' | 'long' | 'enface' = 'axial',
  ) => {
    if (!volume) return;
    if (phase === 'move') {
      setPendingPoint(p);
      return;
    }
    if (phase !== 'down') return;
    if (tool === 'contour-annulus' || tool === 'contour-lvot') {
      addContourPoint(p);
      return;
    }
    placeLandmark(p, plane === 'long' ? 'longaxis' : plane === 'enface' ? 'enface' : 'axial');
  };

  const undoPoint = () => setDraft((d) => d.slice(0, -1));
  const clearDraft = () => {
    setDraft([]);
    setPendingLandmark(null);
    setPendingPoint(null);
  };
  const deleteCurrentContour = () => {
    const kind = tool === 'contour-lvot' ? 'lvot' : 'annulus';
    const existing = measurement.contours.find((c) => c.kind === kind && c.slice === slice);
    if (!existing) {
      toast('当前层没有已保存的轮廓', 'warn');
      return;
    }
    commitMeasurement(
      { ...measurement, contours: measurement.contours.filter((c) => c.id !== existing.id) },
      `删除第 ${slice + 1} 层${kind === 'annulus' ? '瓣环' : 'LVOT'}轮廓`,
    );
  };

  const autoFill = () => {
    if (!volume || !summary) {
      toast('请先在瓣环中心层勾画一个轮廓作为种子', 'warn');
      return;
    }
    toast('已根据种子轮廓在相邻层面生成候选轮廓,请逐层确认', 'ok');
    const kind = 'annulus';
    const base = measurement.contours.filter((c) => c.kind === kind);
    if (!base.length) return;
    const cols: Contour[] = [];
    const seed = base[0];
    for (const offset of [-1, 1]) {
      const s = seed.slice + offset;
      if (s < 0 || s >= volume.depth) continue;
      if (measurement.contours.some((c) => c.kind === kind && c.slice === s)) continue;
      const pts = seed.points.map((p) => {
        const w = pixelToWorld(p, volume);
        const w2 = add(w, scale(volume.normal, offset * volume.spacing[2]));
        const px = worldToPixel(w2, volume);
        return { x: px.x, y: px.y, slice: s };
      });
      cols.push({ id: `annulus-${s}-${Date.now().toString(36)}-${offset}`, kind, slice: s, points: pts });
    }
    if (!cols.length) {
      toast('相邻层已存在轮廓', 'warn');
      return;
    }
    commitMeasurement({ ...measurement, contours: [...measurement.contours, ...cols] }, `自动延伸 ${cols.length} 层瓣环候选轮廓`);
  };

  const onWheelZoom = (delta: number) => {
    setZoom((z) => Math.max(0.6, Math.min(6, z * (delta > 0 ? 0.9 : 1.1))));
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  if (!caseDoc.volumeRef && !volume) {
    return (
      <div className="card" style={{ padding: 22, maxWidth: 560 }}>
        <div className="banner banner-info" style={{ marginBottom: 12 }}>
          该申请单尚未关联 CT 序列。导入 DICOM 序列或载入演示体模后即可开始测量。
        </div>
        <button className="btn btn-primary" onClick={() => setImportOpen(true)}>
          <IconUpload size={14} /> 导入 CT 序列
        </button>
        {importOpen ? <ImportDialog caseId={caseDoc.id} onClose={() => setImportOpen(false)} /> : null}
      </div>
    );
  }

  if (volumeError && !volume) {
    return (
      <div className="card" style={{ padding: 22, maxWidth: 560 }}>
        <div className="banner banner-danger" style={{ marginBottom: 12 }}>{volumeError}</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary" onClick={() => setImportOpen(true)}>
            <IconUpload size={14} /> 为本次申请导入序列
          </button>
          <button className="btn" onClick={() => onNavigate('cases')}>返回申请单列表</button>
        </div>
        {importOpen ? <ImportDialog caseId={caseDoc.id} onClose={() => setImportOpen(false)} /> : null}
      </div>
    );
  }

  const annulusHere = measurement.contours.find((c) => c.kind === 'annulus' && c.slice === slice);
  const lvotHere = measurement.contours.find((c) => c.kind === 'lvot' && c.slice === slice);

  const overlayFor = (mode: 'axial' | 'long' | 'enface'): SliceOverlay => {
    const contours: SliceOverlay['contours'] = [];
    if (mode === 'axial') {
      if (annulusHere) contours.push({ contour: annulusHere, color: CONTOUR_COLOR, label: '瓣环' });
      if (lvotHere) contours.push({ contour: lvotHere, color: LVOT_COLOR, label: 'LVOT' });
      if (draft.length >= 2 && (tool === 'contour-annulus' || tool === 'contour-lvot')) {
        contours.push({
          contour: { id: 'draft', kind: 'annulus', slice, points: draft },
          color: tool === 'contour-annulus' ? CONTOUR_COLOR : LVOT_COLOR,
          label: `${draft.length} 点`,
          dashed: true,
        });
      }
    }
    const landmarks: SliceOverlay['landmarks'] = [];
    for (const l of measurement.landmarks) {
      if (l.kind === 'ostium-left') landmarks.push({ landmark: l, color: '#e8615a', label: 'LCA' });
      if (l.kind === 'ostium-right') landmarks.push({ landmark: l, color: '#c68ce0', label: 'RCA' });
      if (l.kind === 'axis-aortic' || l.kind === 'axis-lv') {
        landmarks.push({ landmark: l, color: l.kind === 'axis-aortic' ? '#9fd0ec' : '#7fd99b', label: l.kind === 'axis-aortic' ? '主A' : 'LV' });
      }
      if (l.kind === 'caliper' || l.kind === 'access-caliper') {
        landmarks.push({
          landmark: l,
          color: l.kind === 'caliper' ? '#f0bd6b' : '#8bd3c7',
          label: l.kind === 'caliper' ? '开口径' : '入路径',
        });
      }
    }
    if (pendingLandmark) {
      landmarks.push({ landmark: { id: 'pending', kind: pendingLandmark.kind, a: pendingLandmark.a, pickedOn: 'axial' }, color: '#f0bd6b', label: '待定' });
    }
    const polylines: SliceOverlay['polylines'] = [];
    if (summary && mode !== 'enface') {
      if (showRingPreview) {
        polylines.push({ points: summary.ring.points3d, color: 'rgba(255,180,74,0.85)', width: 1.8, closed: true });
      }
    }
    if (summary?.lvot && mode !== 'enface') {
      const c = summary.lvot.center;
      polylines.push({
        points: [c, add(c, scale(summary.ring.normal, -8))],
        color: 'rgba(87,200,232,0.70)',
        width: 1.4,
      });
    }
    const rulers: SliceOverlay['rulers'] = [];
    if (summary && mode === 'long') {
      for (const side of ['left', 'right'] as const) {
        const c = summary.coronaries[side];
        if (!c) continue;
        const foot = sub(c.point, scale(summary.ring.normal, c.heightMm));
        rulers.push({
          a: foot,
          b: c.point,
          color: side === 'left' ? '#e8615a' : '#c68ce0',
          label: `${side === 'left' ? '左' : '右'}冠 ${c.heightMm.toFixed(1)} mm`,
        });
      }
    }
    if (pendingLandmark && pendingPoint && mode !== 'axial') {
      rulers.push({ a: pendingLandmark.a, b: pendingPoint, color: '#f0bd6b', label: '测距' });
    }
    const texts: SliceOverlay['texts'] = [];
    if (mode === 'enface' && summary) {
      const r = summary.ring;
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2;
        const p = add(r.center, add(scale(r.basisU, Math.cos(a) * (r.dMaxMm / 2 + 4)), scale(r.basisV, Math.sin(a) * (r.dMaxMm / 2 + 4))));
        texts.push({ at: p, text: ['0°', '90°', '180°', '270°'][i], color: 'rgba(147,164,184,0.9)' });
      }
    }
    return {
      contours,
      landmarks,
      polylines,
      rulers,
      texts,
      crosshair: mode === 'axial' && pendingPoint ? pendingPoint : undefined,
    };
  };

  if (!volume) {
    return (
      <div className="card" style={{ padding: 28, display: 'grid', placeItems: 'center', minHeight: 320 }}>
        <div style={{ textAlign: 'center', maxWidth: 380 }}>
          <div style={{ marginBottom: 10, color: 'var(--text-2)' }}>
            {volumeLoading ? '正在从浏览器本地读取 CT 序列…' : '该申请单尚未关联影像'}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 14 }}>
            序列引用:<span className="mono">{caseDoc.volumeRef}</span>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            <button className="btn" onClick={() => loadCaseVolume(caseDoc.volumeRef)}>重新读取</button>
            <button className="btn btn-primary" onClick={() => setImportOpen(true)}>
              <IconUpload size={14} /> 导入 CT 序列
            </button>
          </div>
        </div>
        {importOpen ? (
          <ImportDialog
            caseId={caseDoc.id}
            onClose={() => {
              setImportOpen(false);
              loadCaseVolume(caseDoc.volumeRef);
            }}
          />
        ) : null}
      </div>
    );
  }

  return (
    <div className="workbench">
      <div className="wb-toolbar">
        <ToolGroup tools={TOOLS} tool={tool} onPick={(t) => { setTool(t); setDraft([]); setPendingLandmark(null); }} />
        <div className="wb-toolbar-right">
          <button className="btn btn-sm" onClick={undoPoint} disabled={!draft.length} title="撤销上一个点">
            <IconUndo size={13} /> 撤销
          </button>
          <button className="btn btn-sm" onClick={clearDraft} disabled={!draft.length && !pendingLandmark}>
            清除草稿
          </button>
          <button className="btn btn-sm" onClick={() => (tool === 'contour-annulus' || tool === 'contour-lvot') && draft.length >= 3 && closeContour(draft, tool === 'contour-annulus' ? 'annulus' : 'lvot')} disabled={draft.length < 3}>
            <IconCheck size={13} /> 闭合轮廓
          </button>
          <button className="btn btn-sm" onClick={deleteCurrentContour} title="删除当前层轮廓">
            <IconTrash size={13} /> 删层
          </button>
          <span style={{ width: 1, height: 18, background: 'var(--line)' }} />
          <select
            value={wlIndex}
            onChange={(e) => {
              const i = Number(e.target.value);
              setWlIndex(i);
              const p = Object.values(WL_PRESETS)[i];
              setWindow({ center: p.center, width: p.width });
            }}
            style={{ height: 26, fontSize: 11.5 }}
          >
            {Object.values(WL_PRESETS).map((p, i) => (
              <option key={p.name} value={i}>{p.name}</option>
            ))}
          </select>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-3)' }}>
            长轴方位
            <input
              className="azimuth-slider"
              type="range"
              min={0}
              max={180}
              step={2}
              value={azimuth}
              onChange={(e) => setAzimuth(Number(e.target.value))}
              style={{ width: 92 }}
            />
            <span className="mono" style={{ width: 26, color: 'var(--text-2)' }}>{azimuth}°</span>
          </label>
          <button
            className={`btn btn-sm ${showRingPreview ? 'btn-primary' : ''}`}
            onClick={() => setShowRingPreview((v) => !v)}
            title="在 2D 视图中显示重建后的三维瓣环投影"
          >
            <IconTarget size={13} /> 瓣环投影
          </button>
          <button className="btn btn-sm" onClick={resetView}><IconEye size={13} /> 复位</button>
        </div>
      </div>

      <div className="wb-body">
        <div className="wb-views">
          <div className="wb-main">
            <SliceView
              volume={volume}
              frame={axial!}
              overlay={overlayFor('axial')}
              lutMode={1}
              windowCenter={wl.center}
              windowWidth={wl.width}
              label="轴位 · AXIAL"
              subtitle={`层 ${slice + 1}/${volume.depth} · ${(volume.origin[2] + slice * volume.spacing[2]).toFixed(1)} mm`}
              zoom={zoom}
              pan={pan}
              onPointerWorld={(p, f, phase) => handlePointer(p, f, phase, 'axial')}
              onWheelZoom={onWheelZoom}
              active={active === 'axial'}
              onActivate={() => setActive('axial')}
              minHeight={300}
            >
              <div className="wb-hud">
                <span className="mono">{`WW ${wl.width} / WL ${wl.center}`}</span>
                <span className="mono">{`Z ${(volume.origin[2] + slice * volume.spacing[2]).toFixed(1)} mm`}</span>
                <span className="mono">{pendingPoint ? `HU ${samplePix(volume, worldToPixel(pendingPoint, volume).x, worldToPixel(pendingPoint, volume).y, slice).toFixed(0)}` : ''}</span>
              </div>
              <SliceSlider
                slice={slice}
                depth={volume.depth}
                contours={measurement.contours}
                onChange={setSlice}
              />
            </SliceView>

            <div className="wb-side-panes">
              <SliceView
                volume={volume}
                frame={longFrame!}
                overlay={overlayFor('long')}
                lutMode={1}
                windowCenter={wl.center}
                windowWidth={wl.width}
                label="长轴 · LONG"
                subtitle={`方位角 ${azimuth}°`}
                zoom={1}
                pan={{ x: 0, y: 0 }}
                onPointerWorld={(p, f, phase) => handlePointer(p, f, phase, 'long')}
                onWheelZoom={() => undefined}
                active={active === 'long'}
                onActivate={() => setActive('long')}
                minHeight={150}
              >
                <div style={{ position: 'absolute', right: 6, bottom: 6, display: 'flex', gap: 4 }}>
                  <button className="icon-btn" style={{ background: 'rgba(9,14,21,0.7)' }} onClick={(e) => { e.stopPropagation(); setAzimuth((a) => (a + 30) % 360); }} title="旋转切面">
                    <IconRotate size={13} />
                  </button>
                </div>
              </SliceView>
              {enface ? (
                <SliceView
                  volume={volume}
                  frame={enface}
                  overlay={{
                    ...overlayFor('enface'),
                    polylines: summary
                      ? [
                          ...(overlayFor('enface').polylines ?? []),
                          ...(summary.calc
                            ? [] : []),
                        ]
                      : overlayFor('enface').polylines,
                    wedges: ringWedges(summary),
                  }}
                  lutMode={1}
                  windowCenter={wl.center}
                  windowWidth={wl.width}
                  label="瓣环平面 · EN FACE"
                  subtitle="近似垂直瓣环切面"
                  zoom={1}
                  pan={{ x: 0, y: 0 }}
                  onPointerWorld={(p, f, phase) => handlePointer(p, f, phase, 'enface')}
                  active={active === 'enface'}
                  onActivate={() => setActive('enface')}
                  minHeight={150}
                />
              ) : (
                <div className="wb-pane-empty">
                  <IconLayers size={18} />
                  <div style={{ marginTop: 6, fontSize: 11.5 }}>勾画至少 1 层瓣环轮廓后显示瓣环平面</div>
                  <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text-3)' }}>
                    提示:先在轴位像上沿瓣环内缘点击 ≥3 点并「闭合轮廓」。
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <aside className="wb-sidebar scroll-y">
          <SidePanel
            caseDoc={caseDoc}
            summary={summary}
            slice={slice}
            volume={volume}
            onSetSlice={setSlice}
            tool={tool}
            draftCount={draft.length}
            onAutoFill={autoFill}
            onNavigate={onNavigate}
          />
        </aside>
      </div>
    </div>
  );
}

/** Slice index ~ conv.lvotOffsetMm below the reconstructed annulus plane. */
function lvotSliceFromSummary(
  summary: NonNullable<ReturnType<typeof computeMeasurement>>,
  volume: Volume,
  offsetMm = 5,
): number {
  const normalZ = volume.normal[2] || 1;
  const dz = summary.ring.center[2] - volume.origin[2];
  const baseSlice = dz / volume.spacing[2];
  const below = (volume.spacing[2] || 0.7) / Math.abs(normalZ);
  return Math.max(0, Math.min(volume.depth - 1, Math.round(baseSlice - offsetMm / below)));
}

function ringWedges(summary: ReturnType<typeof computeMeasurement>) {
  if (!summary?.calc) return [];
  return summary.calc.sectors
    .filter((s) => s.burden > 0.45)
    .map((s) => ({ startDeg: s.startDeg, endDeg: s.endDeg, color: '#ff8c3a', opacity: 0.2 + s.burden * 0.3 }));
}

function labelForKind(k: LandmarkKind) {
  switch (k) {
    case 'ostium-left':
      return '左冠开口';
    case 'ostium-right':
      return '右冠开口';
    case 'axis-aortic':
      return '主动脉轴线';
    case 'axis-lv':
      return '左室轴线';
    default:
      return '冠脉开口径';
  }
}

function ToolGroup({ tools, tool, onPick }: { tools: typeof TOOLS; tool: Tool; onPick: (t: Tool) => void }) {
  return (
    <div className="wb-tools">
      {tools.map((t) => (
        <button
          key={t.id}
          className={`wb-tool ${tool === t.id ? 'on' : ''}`}
          onClick={() => onPick(t.id)}
          title={t.hint}
          style={{ ['--tool-color' as string]: t.color }}
        >
          <span className="dot" style={{ background: t.color }} />
          {t.label}
        </button>
      ))}
    </div>
  );
}

function SliceSlider({ slice, depth, contours, onChange }: { slice: number; depth: number; contours: Contour[]; onChange: (v: number) => void }) {
  const marks = contours.reduce<Record<number, { a: boolean; l: boolean }>>((acc, c) => {
    acc[c.slice] = acc[c.slice] ?? { a: false, l: false };
    if (c.kind === 'annulus') acc[c.slice].a = true;
    else acc[c.slice].l = true;
    return acc;
  }, {});
  return (
    <div
      style={{ position: 'absolute', right: 10, top: 26, bottom: 26, width: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <input
        className="slice-slider"
        aria-label="层面"
        type="range"
        min={0}
        max={depth - 1}
        value={slice}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ writingMode: 'vertical-lr', direction: 'rtl', height: '100%', width: 16, accentColor: 'var(--accent)' }}
      />
      <div style={{ position: 'absolute', right: 18, top: 0, bottom: 0, width: 3 }}>
        {Object.entries(marks).map(([s, m]) => (
          <div
            key={s}
            title={`第 ${Number(s) + 1} 层`}
            style={{
              position: 'absolute',
              top: `${(Number(s) / Math.max(1, depth - 1)) * 100}%`,
              right: 0,
              width: 3,
              height: m.a ? 8 : 5,
              background: m.a ? CONTOUR_COLOR : LVOT_COLOR,
              borderRadius: 1,
              opacity: 0.85,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function SidePanel({
  caseDoc,
  summary,
  slice,
  volume,
  onSetSlice,
  tool,
  draftCount,
  onAutoFill,
  onNavigate,
}: {
  caseDoc: CaseDoc;
  summary: ReturnType<typeof computeMeasurement>;
  slice: number;
  volume: Volume;
  onSetSlice: (i: number) => void;
  tool: Tool;
  draftCount: number;
  onAutoFill: () => void;
  onNavigate: (v: string) => void;
}) {
  const { state } = useStore();
  const conv = state.conventions;
  const [tab, setTab] = useState<'measure' | 'calc' | 'guide'>('measure');
  const annulusSlices = caseDoc.measurement.contours.filter((c) => c.kind === 'annulus');
  const lvot = caseDoc.measurement.contours.filter((c) => c.kind === 'lvot');

  return (
    <>
      <div className="wb-side-head">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'space-between' }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {caseDoc.patient.name} <span style={{ color: 'var(--text-3)', fontWeight: 400, fontSize: 11.5 }}>{caseDoc.patient.sex} · {caseDoc.patient.age} 岁</span>
            </div>
            <div className="mono" style={{ fontSize: 10.5, color: 'var(--text-3)' }}>{caseDoc.orderNo}</div>
          </div>
          <StatusChip status={caseDoc.status} />
        </div>
      </div>

      <div className="wb-tabs">
        {[
          ['measure', '测量'],
          ['calc', '钙化分布'],
          ['guide', '操作提示'],
        ].map(([id, label]) => (
          <button key={id} className={tab === id ? 'on' : ''} onClick={() => setTab(id as typeof tab)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'measure' ? (
        <div style={{ padding: '10px 12px 18px' }}>
          {!summary ? (
            <div className="banner banner-info" style={{ marginBottom: 10 }}>
              请沿瓣环内缘勾画至少 1 个层面的轮廓(建议 3–5 层,覆盖瓣环全周),系统将重建三维瓣环。
            </div>
          ) : (
            <>
              <div className="section-title">瓣环重建结果</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
                <BigStat label="周长" value={summary.ring.perimeterMm.toFixed(1)} unit="mm" />
                <BigStat label="面积" value={summary.ring.areaMm2.toFixed(0)} unit="mm²" />
                <BigStat label="周长派生径" value={summary.ring.dPerimMm.toFixed(1)} unit="mm" tone="accent" />
                <BigStat label="面积派生径" value={summary.ring.dAreaMm.toFixed(1)} unit="mm" />
              </div>
              <div className="kv"><span className="k">轮廓层数</span><span className="v">{summary.contouredSlices} 层</span></div>
              <div className="kv"><span className="k">最大 / 最小径</span><span className="v mono">{summary.ring.dMaxMm.toFixed(1)} / {summary.ring.dMinMm.toFixed(1)} mm</span></div>
              <div className="kv"><span className="k">椭圆偏心率</span><span className="v mono">{summary.ring.eccentricity.toFixed(2)}</span></div>
              <div className="kv"><span className="k">平面拟合残差</span><span className="v mono">{summary.ring.planarityRmsMm.toFixed(2)} mm</span></div>
              <div className="kv"><span className="k">瓣环平面倾角</span><span className="v mono">{summary.ring.planeAngleDeg.toFixed(1)}°</span></div>
              <div className="kv">
                <span className="k">入路最小管径</span>
                <span className="v mono" style={{ color: summary.angulation?.accessMinDiameterMm && summary.angulation.accessMinDiameterMm < 5.5 ? 'var(--amber)' : undefined }}>
                  {summary.angulation?.accessMinDiameterMm ? `${summary.angulation.accessMinDiameterMm.toFixed(1)} mm` : '未测量'}
                </span>
              </div>
              {summary.lvot && (
                <>
                  <div className="divider" />
                  <div className="section-title">左室流出道</div>
                  <div className="kv"><span className="k">LVOT 面积</span><span className="v mono">{summary.lvot.areaMm2.toFixed(0)} mm²</span></div>
                  <div className="kv"><span className="k">LVOT 派生径</span><span className="v mono">{summary.lvot.dAreaMm.toFixed(1)} mm</span></div>
                  <div className="kv"><span className="k">距瓣环平面</span><span className="v mono">{summary.lvot.distanceToAnnulusPlaneMm.toFixed(1)} mm</span></div>
                </>
              )}
              <div className="divider" />
              <div className="section-title">冠脉开口</div>
              <CoronaryRow label="左冠" value={summary.coronaries.left} min={conv.ostiumHeightMinMm} color="#e8615a" />
              <CoronaryRow label="右冠" value={summary.coronaries.right} min={conv.ostiumHeightMinMm} color="#c68ce0" />
              {summary.angulation && Number.isFinite(summary.angulation.aortoVentricularDeg) ? (
                <>
                  <div className="divider" />
                  <div className="section-title">成角</div>
                  <div className="kv"><span className="k">主动脉–左室夹角</span><span className="v mono">{summary.angulation.aortoVentricularDeg.toFixed(1)}°</span></div>
                </>
              ) : null}
            </>
          )}

          <div className="divider" />
          <div className="section-title">
            轮廓清单
            <button className="btn btn-sm" onClick={onAutoFill} disabled={!summary}>自动延伸</button>
          </div>
          {summary && !summary.lvot ? (
            <button
              className="btn btn-sm"
              style={{ width: '100%', marginBottom: 6 }}
              onClick={() => onSetSlice(lvotSliceFromSummary(summary, volume, conv.lvotOffsetMm))}
            >
              定位 LVOT 层面(瓣环下 {conv.lvotOffsetMm} mm)
            </button>
          ) : null}
          <div style={{ maxHeight: 170, overflowY: 'auto' }}>
            {annulusSlices.length === 0 && lvot.length === 0 ? (
              <div style={{ fontSize: 11.5, color: 'var(--text-3)' }}>尚无轮廓</div>
            ) : null}
            {annulusSlices
              .slice()
              .sort((a, b) => a.slice - b.slice)
              .map((c) => (
                <button key={c.id} className="contour-row" onClick={() => onSetSlice(c.slice)} style={{ borderColor: slice === c.slice ? 'rgba(255,180,74,0.5)' : undefined }}>
                  <span className="dot" style={{ background: CONTOUR_COLOR }} />
                  <span>瓣环 · 第 {c.slice + 1} 层</span>
                  <span className="mono" style={{ marginLeft: 'auto', color: 'var(--text-3)' }}>{c.points.length} 点</span>
                </button>
              ))}
            {lvot.map((c) => (
              <button key={c.id} className="contour-row" onClick={() => onSetSlice(c.slice)}>
                <span className="dot" style={{ background: LVOT_COLOR }} />
                <span>LVOT · 第 {c.slice + 1} 层</span>
                <span className="mono" style={{ marginLeft: 'auto', color: 'var(--text-3)' }}>{c.points.length} 点</span>
              </button>
            ))}
          </div>

          <div className="divider" />
          <div style={{ display: 'flex', gap: 6 }}>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => onNavigate('release')} disabled={!summary}>
              进入虚拟释放
            </button>
          </div>
          {draftCount > 0 ? <div style={{ marginTop: 8, fontSize: 11, color: 'var(--amber)' }}>当前草稿 {draftCount} 点,闭合或清除后生效</div> : null}
        </div>
      ) : tab === 'calc' ? (
        <div style={{ padding: '10px 12px 18px' }}>
          <div className="section-title">钙化分布(瓣环 ±{conv.calcBandMm} mm)</div>
          {summary?.calc ? (
            <>
              <CalcSummaryInline calc={summary.calc} />
              <div className="divider" />
              <div className="section-title">测量口径</div>
              <div className="kv"><span className="k">钙化阈值</span><span className="v mono">{conv.calcThresholdHU} HU</span></div>
              <div className="kv"><span className="k">扇区数</span><span className="v mono">{conv.calcSectorCount}</span></div>
              <div className="kv"><span className="k">瓣环勾画</span><span className="v">{conv.annulusContour}</span></div>
              <div className="kv"><span className="k">周长算法</span><span className="v">{conv.perimeterMethod}</span></div>
            </>
          ) : (
            <div style={{ fontSize: 11.5, color: 'var(--text-3)' }}>完成瓣环轮廓后自动计算钙化分布。</div>
          )}
        </div>
      ) : (
        <div style={{ padding: '10px 12px 18px', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>
          <div className="section-title">勾画顺序建议</div>
          <ol style={{ paddingLeft: 16, margin: '0 0 12px' }}>
            <li>在轴位像上确定瓣环水平(叶瓣铰链点最清晰层)。</li>
            <li>沿瓣环<b>内缘</b>逐点勾画,至少 3 层,闭合后系统自动校准至瓣环壁。</li>
            <li>在瓣环下 {conv.lvotOffsetMm} mm 处勾画 LVOT,用于评估流出道口径。</li>
            <li>长轴视图标记左/右冠开口中心,并测冠脉开口直径。</li>
            <li>标记主动脉轴线与左室长轴,得到成角评估。</li>
          </ol>
          <div className="section-title">当前工具</div>
          <div className="banner banner-info">
            {TOOLS.find((t) => t.id === tool)?.hint}
          </div>
          {tool === 'axis-aortic' || tool === 'axis-lv' || tool === 'caliper' ? (
            <div className="banner banner-warn" style={{ marginTop: 6, fontSize: 11.5 }}>
              该工具需在<b>长轴视图</b>中操作。右侧长轴面板可用 ⟳ 按钮以 30° 步进旋转,找到主动脉与左室同时伸展的切面。
            </div>
          ) : null}
          {tool === 'ostium-left' || tool === 'ostium-right' ? (
            <div className="banner banner-info" style={{ marginTop: 6, fontSize: 11.5 }}>
              冠脉开口通常在长轴视图最清晰。在轴位像上标记也可,系统会按世界坐标计算到瓣环平面的垂直距离。
            </div>
          ) : null}
          <div className="divider" />
          <div className="kv"><span className="k">快捷键</span><span className="v">滚轮缩放 · 拖拽平移</span></div>
          <div className="kv"><span className="k">当前层</span><span className="v mono">{slice + 1} / {volume.depth}</span></div>
        </div>
      )}
    </>
  );
}

function BigStat({ label, value, unit, tone }: { label: string; value: string; unit: string; tone?: 'accent' }) {
  return (
    <div style={{ background: 'var(--panel-2)', borderRadius: 8, padding: '8px 10px', border: '1px solid var(--line)' }}>
      <div style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 600 }}>{label}</div>
      <div className="mono" style={{ fontSize: 19, fontWeight: 600, color: tone === 'accent' ? '#8cc8e9' : 'var(--text)', lineHeight: 1.3 }}>
        {value}
        <span style={{ fontSize: 10, color: 'var(--text-3)', marginLeft: 2 }}>{unit}</span>
      </div>
    </div>
  );
}

function CoronaryRow({ label, value, min, color }: { label: string; value: { heightMm: number; ostiumRadiusMm: number } | null; min: number; color: string }) {
  if (!value) {
    return (
      <div className="kv">
        <span className="k" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span className="dot" style={{ background: color }} />
          {label}开口高度
        </span>
        <span className="v" style={{ color: 'var(--text-3)' }}>未标记</span>
      </div>
    );
  }
  const low = value.heightMm < min;
  return (
    <div className="kv">
      <span className="k" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <span className="dot" style={{ background: color }} />
        {label}开口高度
      </span>
      <span className="v mono" style={{ color: low ? 'var(--amber)' : 'var(--text)' }}>
        {value.heightMm.toFixed(1)} mm {low ? '▲' : ''}
        <span style={{ color: 'var(--text-3)', fontSize: 10.5, marginLeft: 6 }}>开口 {value.ostiumRadiusMm.toFixed(1)} mm</span>
      </span>
    </div>
  );
}

function CalcSummaryInline({ calc }: { calc: NonNullable<ReturnType<typeof computeMeasurement>>['calc'] }) {
  if (!calc) return null;
  const hot = calc.sectors.filter((s) => calc.hotSectors.includes(s.index));
  return (
    <div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <div style={{ fontSize: 11, color: 'var(--text-3)' }}>
          总量 <Num>{calc.totalVolumeMm3.toFixed(0)}</Num> mm³ · 峰值 <Num>{calc.peakHU}</Num> HU
        </div>
      </div>
      <div style={{ marginTop: 8 }}>
        <CalcMiniBar calc={calc} />
      </div>
      <div style={{ marginTop: 8, fontSize: 11.5 }}>
        热区:
        {hot.length ? (
          <span style={{ color: 'var(--amber)' }}>
            {hotSectorRanges(calc).slice(0, 4).join('、')}
          </span>
        ) : (
          <span style={{ color: 'var(--text-3)' }}>未见明显热区</span>
        )}
      </div>
    </div>
  );
}

function CalcMiniBar({ calc }: { calc: NonNullable<ReturnType<typeof computeMeasurement>>['calc'] }) {
  if (!calc) return null;
  const max = Math.max(1e-6, ...calc.sectors.map((s) => s.volumeMm3));
  return (
    <div style={{ display: 'flex', gap: 1, height: 18 }}>
      {calc.sectors.map((s) => (
        <div
          key={s.index}
          title={`${s.clockStart}–${s.clockEnd} 点: ${s.volumeMm3.toFixed(0)} mm³`}
          style={{
            flex: 1,
            background: calc.hotSectors.includes(s.index) ? '#ff8c3a' : s.burden > 0.3 ? '#e9c24a' : '#3a4a5e',
            opacity: 0.35 + (s.volumeMm3 / max) * 0.65,
            borderRadius: 1,
          }}
        />
      ))}
    </div>
  );
}
