import { useEffect, useMemo, useRef, useState } from 'react';
import type { CaseDoc, ReleaseResult, SizingResult, ValveModel } from '../lib/types';
import { useStore } from '../state/store';
import { computeMeasurement } from '../lib/measure';
import { assessRelease, computeSizing, nearestSize, valveLabel } from '../lib/release';
import { hotSectorRanges, summarySignature } from '../lib/measure';
import { ReleaseCanvas, assembleScene } from '../components/ReleaseCanvas';
import { CalcPolarChart, Num, RiskBanner, Stat, fmt } from '../components/ui';
import { IconAlert, IconBack, IconCheck, IconCube, IconGauge, IconTarget } from '../components/icons';

export function ReleasePage({ caseDoc, onNavigate }: { caseDoc: CaseDoc; onNavigate: (v: string, extra?: string) => void }) {
  const { state, updateCase, saveSizing, saveRelease, saveJustification, submitReview, toast, addAudit } = useStore();
  const conv = state.conventions;
  const [modelId, setModelId] = useState(caseDoc.sizing?.valveModelId ?? state.valves.find((v) => v.active)?.id ?? state.valves[0].id);
  const model = state.valves.find((v) => v.id === modelId) ?? state.valves[0];
  const [nominal, setNominal] = useState<number>(caseDoc.sizing?.nominalMm ?? model.sizes[1]?.nominalMm ?? model.sizes[0].nominalMm);
  const [depth, setDepth] = useState(6);
  const [reason, setReason] = useState(caseDoc.justification?.text ?? '');
  const [showCalc, setShowCalc] = useState(true);
  const [showFrame, setShowFrame] = useState(true);
  const [showRing, setShowRing] = useState(true);
  const [showGaps, setShowGaps] = useState(true);
  const [showAxes, setShowAxes] = useState(true);
  const [deploy, setDeploy] = useState(1);
  const snapshotRef = useRef<(() => Promise<string | null>) | null>(null);
  const [tab, setTab] = useState<'scene' | 'compare'>('scene');

  const { volume } = useStore();
  const summary = useMemo(() => {
    if (!volume) return caseDoc.summary ?? null;
    try {
      return computeMeasurement(volume, caseDoc.measurement, conv) ?? caseDoc.summary ?? null;
    } catch {
      return caseDoc.summary ?? null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume, caseDoc.measurement, conv]);

  const cachedSignature = summarySignature(caseDoc.summary);
  const liveSignature = summarySignature(summary);
  useEffect(() => {
    if (!summary || !liveSignature) return;
    // Cache the measurement so reviewers can read values without the volume.
    if (cachedSignature === liveSignature) return;
    updateCase(caseDoc.id, { summary });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveSignature, cachedSignature, caseDoc.id]);

  const sizing: SizingResult | null = useMemo(() => {
    if (!summary) return null;
    return computeSizing(summary, model, conv);
  }, [summary, model, conv]);

  useEffect(() => {
    if (!sizing) return;
    setNominal(sizing.nominalMm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelId, sizing?.refDiameterMm, conv.sizingReference, conv.targetOversizePct]);

  const scene = useMemo(() => {
    if (!summary) return null;
    return assembleScene({
      summary,
      conventions: conv,
      volume: volume ?? null,
      valve: model,
      nominalMm: nominal,
      depthMm: depth,
      calcThreshold: conv.calcThresholdHU,
      pvlThreshold: conv.pvlGapMm,
      showCalc,
      showFrame,
      showRing,
      showGaps,
      showAxes,
      deployProgress: deploy,
    });
  }, [summary, conv, volume, model, nominal, depth, showCalc, showFrame, showRing, showGaps, showAxes, deploy]);

  const effectiveForAssessment = useMemo<SizingResult | null>(() => {
    if (!sizing) return null;
    if (sizing.nominalMm === nominal) return sizing;
    const oversize = ((nominal - sizing.refDiameterMm) / sizing.refDiameterMm) * 100;
    return {
      ...sizing,
      nominalMm: nominal,
      valveLabel: valveLabel(model, nominal),
      oversizePct: oversize,
      withinRange: oversize >= conv.minOversizePct && oversize <= conv.maxOversizePct,
    };
  }, [sizing, nominal, model, conv]);

  // Assess against the size the operator actually selected, not the suggestion.
  const result: ReleaseResult | null = useMemo(() => {
    if (!summary || !effectiveForAssessment || !scene) return null;
    return assessRelease(scene.frameGeometry, model, nominal, summary, effectiveForAssessment, conv);
  }, [summary, effectiveForAssessment, scene, model, nominal, conv]);

  const effective = effectiveForAssessment;

  const warnFlags = (result?.flags ?? []).filter((f) => f.severity === 'warn');
  const needsReason = warnFlags.length > 0;

  const persist = () => {
    if (!result || !effective) {
      toast('请先完成瓣环测量', 'warn');
      return;
    }
    saveSizing(caseDoc.id, effective);
    saveRelease(caseDoc.id, result);
    if (needsReason) {
      if (reason.trim().length < 12) {
        toast('存在偏离口径的告警,请填写不少于 12 字的理由', 'warn');
        return;
      }
      saveJustification(caseDoc.id, {
        text: reason.trim(),
        by: '李承泽',
        at: Date.now(),
        flags: warnFlags.map((f) => f.code),
        nominalMm: nominal,
      });
      toast('已保存型号、释放参数与偏离理由', 'ok');
    } else {
      toast('已保存型号与释放参数', 'ok');
    }
  };

  const submit = () => {
    if (!result || !effective) {
      toast('尚无虚拟释放结果', 'warn');
      return;
    }
    if (needsReason && reason.trim().length < 12) {
      toast('存在告警,提交前必须填写偏离理由(≥12 字)', 'err');
      return;
    }
    persist();
    submitReview(caseDoc.id);
    toast('已提交主任审核', 'ok');
  };

  if (!summary) {
    return (
      <div className="card" style={{ padding: 26 }}>
        <div className="banner banner-warn" style={{ marginBottom: 12 }}>
          尚未完成瓣环测量,无法进行虚拟释放。请先回到测量台勾画瓣环。
        </div>
        <button className="btn btn-primary" onClick={() => onNavigate('measure')}>
          返回测量台
        </button>
      </div>
    );
  }

  return (
    <div className="release-page">
      <div className="release-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <button className="icon-btn" onClick={() => onNavigate('measure')} title="返回测量">
            <IconBack size={16} />
          </button>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>
              虚拟释放 · {caseDoc.patient.name}
              <span style={{ color: 'var(--text-3)', fontSize: 11.5, fontWeight: 400, marginLeft: 8 }}>{caseDoc.orderNo}</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-3)' }}>
              瓣环周长 {summary.ring.perimeterMm.toFixed(1)} mm · 面积 {summary.ring.areaMm2.toFixed(0)} mm² · 参考径 {summary.ring.dPerimMm.toFixed(1)} mm
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, marginLeft: 'auto', alignItems: 'center' }}>
          <button className={`btn btn-sm ${tab === 'scene' ? 'btn-primary' : ''}`} onClick={() => setTab('scene')}>
            <IconCube size={13} /> 三维
          </button>
          <button className={`btn btn-sm ${tab === 'compare' ? 'btn-primary' : ''}`} onClick={() => setTab('compare')}>
            <IconGauge size={13} /> 径向对比
          </button>
          <div style={{ width: 1, height: 18, background: 'var(--line)', margin: '0 3px' }} />
          <button className="btn btn-sm" onClick={persist}>保存结果</button>
          <button className="btn btn-sm btn-primary" onClick={submit}>提交审核</button>
        </div>
      </div>

      <div className="release-body">
        <div className="release-left scroll-y">
          <div className="section-title">瓣膜型号库</div>
          <div style={{ display: 'grid', gap: 5 }}>
            {state.valves.map((v) => (
              <ModelRow
                key={v.id}
                valve={v}
                active={v.id === modelId}
                disabled={!v.active}
                selectedSize={v.id === modelId ? nominal : undefined}
                onPick={() => {
                  if (!v.active) {
                    toast('该型号已停用,请联系技师维护', 'warn');
                    return;
                  }
                  setModelId(v.id);
                  setNominal(nearestSize(v, (summary.ring.dPerimMm) * (1 + conv.targetOversizePct / 100)).nominalMm);
                }}
                onSize={(s) => setNominal(s)}
              />
            ))}
          </div>

          <div className="divider" />
          <div className="section-title">
            型号匹配
            <span style={{ fontSize: 10.5, color: 'var(--text-3)', fontWeight: 400 }}>{conv.sizingReference}</span>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', marginBottom: 8 }}>
            <div>
              <div className="label">选定型号</div>
              <div className="mono" style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.1 }}>{nominal}<span style={{ fontSize: 12, color: 'var(--text-3)' }}> mm</span></div>
            </div>
            <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
              <div className="label">过度扩张</div>
              <div className="mono" style={{ fontSize: 17, fontWeight: 600, color: effective && !effective.withinRange ? 'var(--amber)' : 'var(--green)' }}>
                {effective ? `${effective.oversizePct > 0 ? '+' : ''}${effective.oversizePct.toFixed(1)}%` : '—'}
              </div>
            </div>
          </div>
          <OversizeBar value={effective?.oversizePct ?? 0} min={conv.minOversizePct} max={conv.maxOversizePct} target={conv.targetOversizePct} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-3)', marginTop: 3 }}>
            <span>{conv.minOversizePct}%</span>
            <span>推荐 {conv.targetOversizePct}%</span>
            <span>{conv.maxOversizePct}%</span>
          </div>
          {sizing && sizing.nominalMm !== nominal ? (
            <div className="banner banner-info" style={{ marginTop: 10, fontSize: 11.5 }}>
              系统推荐 {sizing.nominalMm} mm({sizing.recommendedLabel}),当前手动选择 {nominal} mm。
              <button className="btn btn-sm" style={{ marginLeft: 6 }} onClick={() => setNominal(sizing.nominalMm)}>
                采用推荐
              </button>
            </div>
          ) : null}

          <div className="divider" />
          <div className="section-title">释放参数</div>
          <SliderRow label="释放深度" value={depth} min={0} max={14} step={0.5} unit="mm" onChange={setDepth} hint="瓣环平面以下" />
          <SliderRow label="释放进度" value={deploy} min={0.15} max={1} step={0.01} unit="" onChange={setDeploy} hint="瓣架展开动画" />
          <div className="divider" />
          <div className="section-title">显示图层</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, fontSize: 11.5 }}>
            <Toggle label="瓣架" on={showFrame} onChange={setShowFrame} />
            <Toggle label="瓣环" on={showRing} onChange={setShowRing} />
            <Toggle label="钙化" on={showCalc} onChange={setShowCalc} />
            <Toggle label="贴合间隙" on={showGaps} onChange={setShowGaps} />
            <Toggle label="冠脉标记" on={showAxes} onChange={setShowAxes} />
          </div>
        </div>

        <div className="release-center">
          {tab === 'scene' ? (
            scene ? (
              <>
                <ReleaseCanvas
                  sceneKey={`${caseDoc.id}-${volume?.id ?? 'cached'}`}
                  layers={scene.layers}
                  bounds={scene.bounds}
                  onReady={(api) => {
                    snapshotRef.current = api.snapshot;
                  }}
                  className="release-canvas"
                  showHint
                />
                <div className="release-overlay-tl">
                  <div className="chip" style={{ background: 'rgba(12,18,26,0.82)', borderColor: 'var(--line-2)' }}>
                    <span className="dot" style={{ background: '#ffb44a' }} /> 瓣环
                    <span className="dot" style={{ background: '#a8c4dc', marginLeft: 6 }} /> 瓣架
                    <span className="dot" style={{ background: '#ff8c3a', marginLeft: 6 }} /> 钙化
                  </div>
                </div>
              </>
            ) : null
          ) : (
            <RadialCompare result={result} model={model} nominal={nominal} />
          )}
        </div>

        <div className="release-right scroll-y">
          <div className="section-title">
            自动比对结果
            <span style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 400 }}>实时</span>
          </div>
          {result ? <RiskBanner flags={result.flags} /> : null}

          <div className="divider" />
          <div className="section-title">冠脉净距</div>
          <CoronaryCard side="左冠" data={result?.coronary.left} min={conv.frameClearanceMinMm} color="#e8615a" heightMin={conv.ostiumHeightMinMm} />
          <CoronaryCard side="右冠" data={result?.coronary.right} min={conv.frameClearanceMinMm} color="#c68ce0" heightMin={conv.ostiumHeightMinMm} />
          <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2, lineHeight: 1.6 }}>
            净距为该高度瓣架表面到开口的径向距离;{model.name} 冠脉风险区高度 {model.riskZoneHeightMm} mm。
          </div>

          <div className="divider" />
          <div className="section-title">瓣周漏风险区</div>
          {result ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
                <Stat label="超过阈值的弧段" value={result.pvlArcPct.toFixed(0)} unit="%" tone={result.pvlArcPct >= 5 || result.maxGapMm >= conv.pvlGapMm ? 'warn' : 'ok'} />
                <Stat label="最大贴合间隙" value={result.maxGapMm.toFixed(2)} unit="mm" tone={result.maxGapMm >= conv.pvlGapMm ? 'warn' : 'ok'} />
              </div>
              <GapHistogram gaps={result.gapsMm} threshold={conv.pvlGapMm} />
              {summary.calc ? (
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 12 }}>
                  <CalcPolarChart calc={summary.calc} size={100} label={false} />
                  <div style={{ fontSize: 11, color: 'var(--text-2)', lineHeight: 1.65 }}>
                    <div>钙化总量 <Num>{summary.calc.totalVolumeMm3.toFixed(0)}</Num> mm³</div>
                    <div>峰值 <Num>{summary.calc.peakHU}</Num> HU</div>
                    <div style={{ color: 'var(--amber)' }}>
                      热区 {summary.calc.hotSectors.length ? hotSectorRanges(summary.calc).slice(0, 3).join('、') : '无'}
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          ) : null}

          <div className="divider" />
          <div className="section-title">
            偏离理由
            {needsReason ? <span className="chip tag-review">必填</span> : <span className="chip tag-todo">可选</span>}
          </div>
          {needsReason ? (
            <div className="banner banner-warn" style={{ marginBottom: 8, fontSize: 11.5 }}>
              当前存在 {warnFlags.length} 项偏离测量口径的告警(标黄),提交前必须书面说明临床理由。
            </div>
          ) : null}
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={needsReason ? '例:患者瓣环钙化非对称,选择 26 mm 以规避瓣环破裂风险;术后计划球囊后扩张。' : '可补充说明…'}
            rows={4}
            style={{ width: '100%', resize: 'vertical', fontSize: 12, lineHeight: 1.6 }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: reason.trim().length >= 12 ? 'var(--green)' : 'var(--text-3)', marginTop: 4 }}>
            <span>至少 12 字</span>
            <span className="mono">{reason.trim().length} 字</span>
          </div>

          <div className="divider" />
          <div className="section-title">操作</div>
          <div style={{ display: 'grid', gap: 6 }}>
            <button className="btn btn-primary" onClick={submit} disabled={!result || (needsReason && reason.trim().length < 12)}>
              <IconCheck size={14} /> 保存并提交审核
            </button>
            <button className="btn" onClick={persist}>
              仅保存草稿
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => {
                addAudit(caseDoc.id, '查看三维截图', '重置视角');
                toast('可用三维视图右下角视角按钮切换标准体位', 'ok');
              }}
            >
              <IconTarget size={13} /> 视角提示
            </button>
          </div>
          {effective && !effective.withinRange ? (
            <div className="banner banner-warn" style={{ marginTop: 10, fontSize: 11 }}>
              <IconAlert size={13} />
              <div>型号超出 {conv.minOversizePct}% ~ {conv.maxOversizePct}% 口径区间,提交后主任将重点复核。</div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ModelRow({
  valve,
  active,
  disabled,
  selectedSize,
  onPick,
  onSize,
}: {
  valve: ValveModel;
  active: boolean;
  disabled: boolean;
  selectedSize?: number;
  onPick: () => void;
  onSize: (n: number) => void;
}) {
  return (
    <div className={`model-row ${active ? 'on' : ''} ${disabled ? 'disabled' : ''}`}>
      <button className="model-main" onClick={onPick}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
            {valve.name}
            <span className="chip tag-todo" style={{ height: 17, fontSize: 9.5, padding: '0 6px' }}>{valve.type}</span>
            {!valve.active ? <span className="chip tag-danger" style={{ height: 17, fontSize: 9.5, padding: '0 6px' }}>停用</span> : null}
          </div>
          <div style={{ fontSize: 10.5, color: 'var(--text-3)' }}>
            {valve.brand} · 径向力 {valve.radialForceNPerMm} N/mm · 瓣架 {valve.frameHeightMm} mm
          </div>
        </div>
      </button>
      {active ? (
        <div style={{ display: 'flex', gap: 3, marginTop: 6 }}>
          {valve.sizes.map((s) => (
            <button
              key={s.nominalMm}
              className={`size-pill ${selectedSize === s.nominalMm ? 'on' : ''}`}
              onClick={() => onSize(s.nominalMm)}
            >
              {s.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
  hint?: string;
}) {
  return (
    <div style={{ marginBottom: 9 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, marginBottom: 2 }}>
        <span style={{ color: 'var(--text-2)' }}>{label}</span>
        <span className="mono" style={{ color: 'var(--text)' }}>
          {value.toFixed(step < 1 ? 1 : 0)}{unit}
          {hint ? <span style={{ color: 'var(--text-3)', marginLeft: 5, fontSize: 10 }}>{hint}</span> : null}
        </span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} style={{ width: '100%' }} />
    </div>
  );
}

function Toggle({ label, on, onChange }: { label: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 7px',
        borderRadius: 5,
        border: '1px solid ' + (on ? 'rgba(78,164,216,0.4)' : 'var(--line)'),
        background: on ? 'rgba(78,164,216,0.1)' : 'transparent',
        color: on ? '#a9d5ee' : 'var(--text-3)',
        fontSize: 11.5,
        textAlign: 'left',
      }}
    >
      <span
        style={{
          width: 9,
          height: 9,
          borderRadius: 2,
          border: '1px solid currentColor',
          background: on ? 'currentColor' : 'transparent',
        }}
      />
      {label}
    </button>
  );
}

function OversizeBar({ value, min, max, target }: { value: number; min: number; max: number; target: number }) {
  const lo = -8;
  const hi = 20;
  const pct = (v: number) => ((Math.max(lo, Math.min(hi, v)) - lo) / (hi - lo)) * 100;
  return (
    <div style={{ position: 'relative', height: 8, borderRadius: 4, background: 'var(--bg-2)', border: '1px solid var(--line)' }}>
      <div style={{ position: 'absolute', left: `${pct(min)}%`, width: `${pct(max) - pct(min)}%`, top: 0, bottom: 0, background: 'rgba(76,187,120,0.28)', borderRadius: 3 }} />
      <div style={{ position: 'absolute', left: `${pct(target)}%`, top: -2, bottom: -2, width: 1, background: 'rgba(76,187,120,0.85)' }} />
      <div
        style={{
          position: 'absolute',
          left: `${pct(value)}%`,
          top: -3,
          width: 2,
          height: 14,
          borderRadius: 1,
          background: value < min || value > max ? 'var(--amber)' : '#8cc8e9',
          transform: 'translateX(-1px)',
          boxShadow: '0 0 6px rgba(140,200,233,0.6)',
        }}
      />
    </div>
  );
}

function CoronaryCard({
  side,
  data,
  min,
  color,
  heightMin,
}: {
  side: string;
  data: { distanceMm: number | null; heightMm: number | null; verticalClearanceMm: number | null; ok: boolean } | undefined;
  min: number;
  color: string;
  heightMin: number;
}) {
  if (!data || data.distanceMm === null) {
    return (
      <div className="mini-card" style={{ marginBottom: 7 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="dot" style={{ background: color }} />
          <span style={{ fontSize: 12 }}>{side}</span>
          <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-3)' }}>未标记开口</span>
        </div>
      </div>
    );
  }
  const bad = !data.ok;
  return (
    <div className="mini-card" style={{ marginBottom: 7, borderColor: bad ? 'rgba(232,163,61,0.45)' : undefined }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
        <span className="dot" style={{ background: color }} />
        <span style={{ fontSize: 12, fontWeight: 500 }}>{side}</span>
        <span className={`chip ${bad ? 'tag-review' : 'tag-pass'}`} style={{ marginLeft: 'auto', height: 18, fontSize: 9.5 }}>
          {bad ? '净距不足' : '安全'}
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        <div>
          <div style={{ fontSize: 9.5, color: 'var(--text-3)' }}>瓣架–开口净距</div>
          <div className="mono" style={{ fontSize: 15, fontWeight: 600, color: (data.distanceMm ?? 0) < min ? 'var(--amber)' : 'var(--text)' }}>
            {fmt(data.distanceMm, 1)}<span style={{ fontSize: 9.5, color: 'var(--text-3)' }}> mm</span>
          </div>
          <div style={{ fontSize: 9, color: 'var(--text-3)' }}>阈值 {min} mm</div>
        </div>
        <div>
          <div style={{ fontSize: 9.5, color: 'var(--text-3)' }}>开口高度</div>
          <div className="mono" style={{ fontSize: 15, fontWeight: 600, color: (data.heightMm ?? 0) < heightMin ? 'var(--amber)' : 'var(--text)' }}>
            {fmt(data.heightMm, 1)}<span style={{ fontSize: 9.5, color: 'var(--text-3)' }}> mm</span>
          </div>
          <div style={{ fontSize: 9, color: 'var(--text-3)' }}>阈值 {heightMin} mm</div>
        </div>
      </div>
    </div>
  );
}

function GapHistogram({ gaps, threshold }: { gaps: number[]; threshold: number }) {
  const bins = 26;
  const max = Math.max(threshold * 2, ...gaps) * 1.05;
  const hist = new Array(bins).fill(0);
  for (const g of gaps) {
    const i = Math.min(bins - 1, Math.floor((g / max) * bins));
    hist[i]++;
  }
  const peak = Math.max(...hist, 1);
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 1, height: 42 }}>
        {hist.map((h, i) => {
          const g = (i / bins) * max;
          return (
            <div
              key={i}
              title={`${g.toFixed(2)}–${((i + 1) / bins * max).toFixed(2)} mm: ${h} 个方位`}
              style={{
                flex: 1,
                height: `${Math.max(3, (h / peak) * 100)}%`,
                background: g >= threshold ? 'var(--red)' : g >= threshold * 0.7 ? 'var(--amber)' : '#4c7ea6',
                borderRadius: 1,
                opacity: 0.85,
              }}
            />
          );
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5, color: 'var(--text-3)', marginTop: 2 }}>
        <span>0</span>
        <span>阈值 {threshold} mm</span>
        <span>{max.toFixed(1)} mm</span>
      </div>
    </div>
  );
}

function RadialCompare({ result, model, nominal }: { result: ReleaseResult | null; model: ValveModel; nominal: number }) {
  if (!result) return null;
  const n = result.gapsMm.length;
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2 - 34;
  // Gap (mm) and underexpansion (%) live on different scales, so each gets its
  // own normalisation; the rings share the same radius axis with tick labels.
  const maxGap = Math.max(1.5, ...result.gapsMm) * 1.15;
  const maxUnder = Math.max(12, ...result.underExpansionPct) * 1.1;
  const pts = result.gapsMm.map((g, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    const r = 6 + (Math.max(0, g) / maxGap) * (R - 10);
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  });
  const underPts = result.underExpansionPct.map((u, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    const r = 6 + (u / maxUnder) * (R - 10);
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  });
  const basePts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return [cx + Math.cos(a) * 6, cy + Math.sin(a) * 6];
  });
  const pvlThresholdPts = result.gapsMm.map((_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    const r = 6 + (1.2 / maxGap) * (R - 10);
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  });
  return (
    <div className="radial-compare card">
      <div className="section-title">
        瓣架径向贴合(瓣环层面 72 方位)
        <span style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 400 }}>{model.name} · {nominal} mm</span>
      </div>
      <svg width={size} height={size} style={{ display: 'block', margin: '0 auto' }}>
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <circle key={f} cx={cx} cy={cy} r={6 + (R - 10) * f} fill="none" stroke="var(--line)" strokeDasharray={f === 1 ? undefined : '2 3'} />
        ))}
        <polyline
          points={pvlThresholdPts.map((p) => p.join(',')).join(' ') + ' ' + pvlThresholdPts[0].join(',')}
          fill="none"
          stroke="rgba(226,87,76,0.55)"
          strokeWidth={1}
          strokeDasharray="3 3"
        />
        <polyline
          points={basePts.map((p) => p.join(',')).join(' ')}
          fill="none"
          stroke="rgba(120,145,170,0.5)"
          strokeWidth={1}
        />
        <polyline
          points={pts.map((p) => p.join(',')).join(' ') + ' ' + pts[0].join(',')}
          fill="rgba(232,163,61,0.16)"
          stroke="var(--amber)"
          strokeWidth={1.6}
        />
        <polyline
          points={underPts.map((p) => p.join(',')).join(' ') + ' ' + underPts[0].join(',')}
          fill="rgba(78,164,216,0.1)"
          stroke="#6fb6dc"
          strokeWidth={1.3}
          strokeDasharray="4 3"
        />
        {[0, 90, 180, 270].map((deg) => {
          const a = (deg * Math.PI) / 180 - Math.PI / 2;
          const rr = size / 2 - 30;
          return (
            <text key={deg} x={cx + Math.cos(a) * (rr + 8)} y={cy + Math.sin(a) * (rr + 8)} fill="var(--text-3)" fontSize={9} textAnchor="middle" dominantBaseline="middle">
              {deg}°
            </text>
          );
        })}
      </svg>
      <div className="radial-legend">
        <span><span className="sw" style={{ background: 'var(--amber)' }} /> 贴合间隙 0–{maxGap.toFixed(1)} mm</span>
        <span><span className="sw" style={{ background: '#6fb6dc' }} /> 欠膨胀 0–{maxUnder.toFixed(0)}%</span>
        <span><span className="sw" style={{ background: 'rgba(226,87,76,0.6)' }} /> 瓣周漏阈值</span>
      </div>
      <div className="sector-table">
        <div className="sector-row head"><span>钟点</span><span>间隙</span><span>欠膨胀</span></div>
        {Array.from({ length: 12 }, (_, k) => {
          const from = Math.floor((k / 12) * n);
          const to = Math.floor(((k + 1) / 12) * n);
          let gap = 0;
          let under = 0;
          for (let i = from; i < to; i++) {
            gap = Math.max(gap, result.gapsMm[i]);
            under = Math.max(under, result.underExpansionPct[i]);
          }
          const hot = gap >= 1.2;
          return (
            <div className="sector-row" key={k}>
              <span>{k + 1} 点</span>
              <span className="mono" style={{ color: hot ? 'var(--red)' : gap > 0.8 ? 'var(--amber)' : 'var(--text-2)' }}>{gap.toFixed(2)}</span>
              <span className="mono" style={{ color: under > 10 ? 'var(--amber)' : 'var(--text-3)' }}>{under.toFixed(0)}%</span>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 12, fontSize: 11.5, color: 'var(--text-2)', lineHeight: 1.7 }}>
        <div>平均间隙 <Num>{result.meanGapMm.toFixed(2)}</Num> mm · 最大 <Num>{result.maxGapMm.toFixed(2)}</Num> mm</div>
        <div>最大欠膨胀 <Num>{Math.max(...result.underExpansionPct).toFixed(1)}%</Num></div>
        <div style={{ color: 'var(--text-3)', fontSize: 10.5, marginTop: 6 }}>
          径向力 {model.radialForceNPerMm} N/mm,瓣架高 {model.frameHeightMm} mm,释放深度 {result.depthMm.toFixed(1)} mm。
        </div>
      </div>
    </div>
  );
}
