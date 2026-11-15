import { useEffect, useMemo, useRef, useState } from 'react';
import type { CaseDoc } from '../lib/types';
import { useStore } from '../state/store';
import { computeMeasurement, hotSectorRanges } from '../lib/measure';
import { assembleScene } from '../components/ReleaseCanvas';
import { ReleaseCanvas } from '../components/ReleaseCanvas';
import { CalcPolarChart, StatusChip, fmt, fmtDate } from '../components/ui';
import { IconCamera, IconCheck, IconBack } from '../components/icons';

/**
 * Pre-operative discussion sheet. Generates a printable document with the
 * three-dimensional snapshot taken from the WebGPU canvas.
 */
export function ReportPage({ caseDoc, onNavigate }: { caseDoc: CaseDoc; onNavigate: (v: string) => void }) {
  const { state, saveReport, toast, volume } = useStore();
  const [snapshot, setSnapshot] = useState<string | null>(caseDoc.report?.screenshot ?? null);
  const [busy, setBusy] = useState(false);
  const snapshotFn = useRef<(() => Promise<string | null>) | null>(null);
  const conv = state.conventions;

  const summary = useMemo(() => {
    if (caseDoc.summary) return caseDoc.summary;
    if (!volume) return null;
    try {
      return computeMeasurement(volume, caseDoc.measurement, conv);
    } catch {
      return null;
    }
  }, [caseDoc.summary, caseDoc.measurement, volume, conv]);

  const scene = useMemo(() => {
    if (!summary) return null;
    const model = state.valves.find((v) => v.id === caseDoc.sizing?.valveModelId) ?? state.valves.find((v) => v.active) ?? state.valves[0];
    return assembleScene({
      summary,
      conventions: conv,
      volume: volume ?? null,
      valve: model,
      nominalMm: caseDoc.sizing?.nominalMm ?? model.sizes[1]?.nominalMm ?? model.sizes[0].nominalMm,
      depthMm: caseDoc.release?.depthMm ?? 6,
      calcThreshold: conv.calcThresholdHU,
      pvlThreshold: conv.pvlGapMm,
      showCalc: true,
      showFrame: true,
      showRing: true,
      showGaps: true,
      showAxes: true,
    });
  }, [summary, conv, volume, state.valves, caseDoc.sizing, caseDoc.release]);

  const capture = async () => {
    const url = await snapshotFn.current?.();
    if (!url) {
      toast('三维画布尚未就绪,请稍候重试', 'warn');
      return;
    }
    setSnapshot(url);
    toast('已截取三维视图', 'ok');
    return url;
  };

  const generate = async () => {
    setBusy(true);
    let shot = snapshot;
    if (!shot) {
      shot = (await snapshotFn.current?.()) ?? null;
      if (shot) setSnapshot(shot);
    }
    const summaryText = summary
      ? `瓣环周长 ${summary.ring.perimeterMm.toFixed(1)} mm,面积 ${summary.ring.areaMm2.toFixed(0)} mm²,周长派生径 ${summary.ring.dPerimMm.toFixed(1)} mm;型号 ${caseDoc.sizing?.nominalMm ?? '—'} mm。`
      : '测量数据不完整。';
    saveReport(caseDoc.id, shot ?? '', summaryText);
    setBusy(false);
    toast(shot ? '术前讨论单已生成(含三维截图)' : '讨论单已生成,但三维截图为空', shot ? 'ok' : 'warn');
  };

  // A stored report from an earlier session may predate the snapshot or have
  // been saved before the GPU canvas existed, so capture one automatically.
  const autoCaptured = useRef(false);
  useEffect(() => {
    if (snapshot || autoCaptured.current) return;
    let tries = 0;
    const attempt = async () => {
      tries++;
      if (autoCaptured.current || !snapshotFn.current) {
        if (tries < 12) window.setTimeout(attempt, 500);
        return;
      }
      autoCaptured.current = true;
      const url = await snapshotFn.current();
      if (url) setSnapshot(url);
    };
    const id = window.setTimeout(attempt, 700);
    return () => window.clearTimeout(id);
  }, [snapshot]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onNavigate('review');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onNavigate]);

  if (caseDoc.status !== '已通过' && !caseDoc.report) {
    return (
      <div className="card" style={{ padding: 26 }}>
        <div className="banner banner-warn" style={{ marginBottom: 12 }}>
          申请单尚未审核通过,术前讨论单只能在通过后生成。
        </div>
        <button className="btn btn-primary" onClick={() => onNavigate('review')}>
          返回审核队列
        </button>
      </div>
    );
  }

  return (
    <div className="page report-page">
      <div className="page-head">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button className="icon-btn" onClick={() => onNavigate('review')}><IconBack size={16} /></button>
          <div>
            <h2 style={{ fontSize: 17 }}>术前讨论单</h2>
            <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{caseDoc.orderNo} · {caseDoc.patient.name}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 7 }}>
          <button className="btn" onClick={() => void capture()} disabled={busy}><IconCamera size={14} /> 截取三维视图</button>
          <button className="btn btn-primary" onClick={() => void generate()} disabled={busy}><IconCheck size={14} /> 生成讨论单</button>
        </div>
      </div>

      <div className="report-grid">
        <div className="report-sheet card">
          <div className="report-head">
            <div>
              <div className="report-org">心内科 · 结构性心脏病小组</div>
              <div className="report-title">TAVR 术前讨论单</div>
            </div>
            <div style={{ textAlign: 'right', fontSize: 11, color: 'var(--text-3)' }}>
              <div className="mono">{caseDoc.orderNo}</div>
              <div>{fmtDate(caseDoc.review?.at ?? Date.now())}</div>
              <div style={{ marginTop: 4 }}><StatusChip status={caseDoc.status} /></div>
            </div>
          </div>

          <div className="report-block">
            <div className="report-h">患者与申请</div>
            <div className="report-kv">
              <span>姓名</span><b>{caseDoc.patient.name}</b>
              <span>性别 / 年龄</span><b>{caseDoc.patient.sex} / {caseDoc.patient.age} 岁</b>
              <span>病历号</span><b className="mono">{caseDoc.patient.mrn}</b>
              <span>术者</span><b>{caseDoc.requester}</b>
              <span>优先级</span><b>{caseDoc.priority}</b>
              <span>指征</span><b style={{ gridColumn: '2 / 4' }}>{caseDoc.indication || '—'}</b>
            </div>
          </div>

          <div className="report-block">
            <div className="report-h">瓣环与 LVOT 测量</div>
            <table className="report-table">
              <thead>
                <tr><th>参数</th><th>数值</th><th>参数</th><th>数值</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>瓣环周长</td><td className="mono">{fmt(summary?.ring.perimeterMm, 1, ' mm')}</td>
                  <td>瓣环面积</td><td className="mono">{fmt(summary?.ring.areaMm2, 0, ' mm²')}</td>
                </tr>
                <tr>
                  <td>周长派生径</td><td className="mono">{fmt(summary?.ring.dPerimMm, 1, ' mm')}</td>
                  <td>面积派生径</td><td className="mono">{fmt(summary?.ring.dAreaMm, 1, ' mm')}</td>
                </tr>
                <tr>
                  <td>最大 / 最小径</td><td className="mono">{summary ? `${summary.ring.dMaxMm.toFixed(1)} / ${summary.ring.dMinMm.toFixed(1)} mm` : '—'}</td>
                  <td>轮廓层数</td><td className="mono">{summary ? `${summary.contouredSlices} 层` : '—'}</td>
                </tr>
                <tr>
                  <td>LVOT 派生径</td><td className="mono">{fmt(summary?.lvot?.dAreaMm, 1, ' mm')}</td>
                  <td>瓣环平面倾角</td><td className="mono">{fmt(summary?.ring.planeAngleDeg, 1, '°')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="report-block">
            <div className="report-h">冠脉与成角</div>
            <div className="report-kv">
              <span>左冠开口高度</span>
              <b className="mono">
                {fmt(summary?.coronaries.left?.heightMm, 1, ' mm')}
                {(summary?.coronaries.left?.heightMm ?? 99) < conv.ostiumHeightMinMm ? ' ▲' : ''}
              </b>
              <span>右冠开口高度</span>
              <b className="mono">
                {fmt(summary?.coronaries.right?.heightMm, 1, ' mm')}
                {(summary?.coronaries.right?.heightMm ?? 99) < conv.ostiumHeightMinMm ? ' ▲' : ''}
              </b>
              <span>主动脉–左室成角</span><b className="mono">{fmt(summary?.angulation?.aortoVentricularDeg, 1, '°')}</b>
              <span>入路最小径</span><b className="mono">{fmt(summary?.angulation?.accessMinDiameterMm, 1, ' mm')}</b>
            </div>
          </div>

          <div className="report-block">
            <div className="report-h">钙化分布</div>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              {summary?.calc ? <CalcPolarChart calc={summary.calc} size={120} label={false} /> : <span style={{ color: 'var(--text-3)' }}>无数据</span>}
              {summary?.calc ? (
                <div className="report-kv" style={{ flex: 1, gridTemplateColumns: 'auto 1fr' }}>
                  <span>钙化总量</span><b className="mono">{summary.calc.totalVolumeMm3.toFixed(0)} mm³</b>
                  <span>峰值</span><b className="mono">{summary.calc.peakHU} HU</b>
                  <span>负担评分</span><b className="mono">{summary.calc.burdenScore}/100</b>
                  <span>热区</span>
                  <b>
                    {summary.calc.hotSectors.length ? hotSectorRanges(summary.calc).join('、') : '无'}
                  </b>
                </div>
              ) : null}
            </div>
          </div>

          <div className="report-block">
            <div className="report-h">型号与虚拟释放</div>
            <div className="report-kv">
              <span>瓣膜型号</span><b>{caseDoc.sizing?.valveModelName ?? '—'} · {caseDoc.sizing?.nominalMm ?? '—'} mm</b>
              <span>过度扩张</span><b className="mono">{caseDoc.sizing ? `${caseDoc.sizing.oversizePct.toFixed(1)}%` : '—'}</b>
              <span>瓣周漏风险弧</span><b className="mono">{fmt(caseDoc.release?.pvlArcPct, 0, '%')}</b>
              <span>冠脉净距(左/右)</span>
              <b className="mono">{fmt(caseDoc.release?.coronary.left.distanceMm, 1, ' mm')} / {fmt(caseDoc.release?.coronary.right.distanceMm, 1, ' mm')}</b>
            </div>
            {caseDoc.release?.flags.filter((f) => f.severity === 'warn').length ? (
              <div className="report-flags">
                {caseDoc.release.flags.filter((f) => f.severity === 'warn').map((f) => (
                  <div key={f.code}>▲ {f.title}{f.value ? `(${f.value})` : ''}</div>
                ))}
              </div>
            ) : null}
            {caseDoc.justification ? (
              <div className="report-justify">
                <div style={{ fontSize: 10.5, color: 'var(--text-3)', marginBottom: 2 }}>偏离口径理由</div>
                {caseDoc.justification.text}
              </div>
            ) : null}
          </div>

          <div className="report-block">
            <div className="report-h">三维重建截图</div>
            {snapshot ? (
              <img src={snapshot} alt="三维重建" style={{ width: '100%', borderRadius: 7, border: '1px solid var(--line-2)' }} />
            ) : (
              <div className="report-noimg">尚未截取三维视图 — 点击右上角「截取三维视图」</div>
            )}
          </div>

          <div className="report-block">
            <div className="report-h">审核与签名</div>
            <div className="report-kv">
              <span>测量医师</span><b>{caseDoc.requester}</b>
              <span>审核</span><b>{caseDoc.review ? `${caseDoc.review.reviewer} · ${caseDoc.review.decision}` : '—'}</b>
              <span>审核意见</span><b style={{ gridColumn: '2 / 4' }}>{caseDoc.review?.comment || '—'}</b>
            </div>
          </div>

          <div className="report-foot">
            本单由 TAVR 规划台自动生成 · {fmtDate(Date.now())} · 仅用于术前讨论
          </div>
        </div>

        <div className="report-side">
          {scene ? (
            <ReleaseCanvas
              sceneKey={`report-${caseDoc.id}`}
              layers={scene.layers}
              bounds={scene.bounds}
              onReady={(api) => { snapshotFn.current = api.snapshot; }}
              className="report-canvas"
              showHint
            />
          ) : (
            <div className="card" style={{ padding: 20, color: 'var(--text-3)', fontSize: 12 }}>无三维数据</div>
          )}
          <div className="card" style={{ padding: 12, marginTop: 10 }}>
            <div className="section-title">操作记录</div>
            <div style={{ maxHeight: 220, overflowY: 'auto', display: 'grid', gap: 4 }}>
              {caseDoc.audit.slice().reverse().map((a, i) => (
                <div key={i} style={{ fontSize: 10.5, color: 'var(--text-3)', display: 'flex', gap: 6 }}>
                  <span className="mono" style={{ flex: 'none' }}>{fmtDate(a.at).slice(5)}</span>
                  <span style={{ color: 'var(--text-2)', flex: 'none' }}>{a.by}</span>
                  <span>{a.action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
