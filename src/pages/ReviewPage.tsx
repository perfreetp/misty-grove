import { useMemo, useState } from 'react';
import type { CaseDoc, ReviewRecord } from '../lib/types';
import { useStore } from '../state/store';
import { CalcPolarChart, Num, StatusChip, fmtDate, relativeTime } from '../components/ui';
import { hotSectorRanges } from '../lib/measure';
import { IconCheck, IconEye, IconX, IconDoc, IconTarget } from '../components/icons';

const RETURN_REASONS = ['瓣环勾画偏差', '钙化分布评估不足', '型号选择偏大', '型号选择偏小', '冠脉净距标注缺失', '成角/入路未评估'];

export function ReviewQueuePage({ onOpenCase }: { onOpenCase: (c: CaseDoc, v: string) => void }) {
  const { state, reviewCase, toast } = useStore();
  const [tab, setTab] = useState<'pending' | 'returned' | 'approved'>('pending');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [reasons, setReasons] = useState<string[]>([]);
  const [finalSize, setFinalSize] = useState<number | null>(null);

  const list = useMemo(() => {
    const f =
      tab === 'pending'
        ? state.cases.filter((c) => c.status === '待审核')
        : tab === 'returned'
          ? state.cases.filter((c) => c.status === '需复核')
          : state.cases.filter((c) => c.status === '已通过');
    return f.slice().sort((a, b) => b.updatedAt - a.updatedAt);
  }, [state.cases, tab]);

  const selected = list.find((c) => c.id === selectedId) ?? list[0] ?? null;

  const decide = (decision: '通过' | '退回') => {
    if (!selected) return;
    if (decision === '退回' && reasons.length === 0 && comment.trim().length < 6) {
      toast('退回需选择原因或填写说明', 'warn');
      return;
    }
    const rec: ReviewRecord = {
      reviewer: '陈嘉禾',
      at: Date.now(),
      decision,
      comment: comment.trim(),
      reasonCodes: reasons,
      finalNominalMm: decision === '通过' ? finalSize ?? selected.sizing?.nominalMm : undefined,
    };
    reviewCase(selected.id, rec);
    setComment('');
    setReasons([]);
    setFinalSize(null);
    toast(decision === '通过' ? '已通过,可生成术前讨论单' : '已退回测量医师', decision === '通过' ? 'ok' : 'warn');
  };

  const pendingCount = state.cases.filter((c) => c.status === '待审核').length;

  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div className="page-head">
        <div>
          <h2 style={{ fontSize: 17 }}>
            待审队列
            {pendingCount ? <span className="chip tag-review" style={{ marginLeft: 8, height: 20 }}>{pendingCount} 待审</span> : null}
          </h2>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>测量值 · 入路成角 · 钙化热区 · 型号与释放结果复核</div>
        </div>
        <div className="seg-row" style={{ margin: 0 }}>
          <button className={`seg ${tab === 'pending' ? 'on' : ''}`} onClick={() => setTab('pending')}>待审核</button>
          <button className={`seg ${tab === 'returned' ? 'on' : ''}`} onClick={() => setTab('returned')}>需复核</button>
          <button className={`seg ${tab === 'approved' ? 'on' : ''}`} onClick={() => setTab('approved')}>已通过</button>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', gap: 12, minHeight: 0 }}>
        <div className="review-list scroll-y">
          {list.length === 0 ? <div style={{ padding: 24, color: 'var(--text-3)', fontSize: 12 }}>队列为空</div> : null}
          {list.map((c) => (
            <button
              key={c.id}
              className={`review-item ${selected?.id === c.id ? 'on' : ''}`}
              onClick={() => {
                setSelectedId(c.id);
                setComment('');
                setReasons([]);
                setFinalSize(null);
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6 }}>
                <span style={{ fontWeight: 600, fontSize: 12.5 }}>{c.patient.name}</span>
                <StatusChip status={c.status} />
              </div>
              <div className="mono" style={{ fontSize: 10.5, color: 'var(--text-3)' }}>{c.orderNo}</div>
              <div style={{ display: 'flex', gap: 8, fontSize: 10.5, color: 'var(--text-2)', marginTop: 3 }}>
                <span>{c.summary ? `周长 ${c.summary.ring.perimeterMm.toFixed(1)}` : '未测量'}</span>
                <span>{c.sizing ? `${c.sizing.nominalMm} mm` : '—'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-3)', marginTop: 3 }}>
                <span>{c.requester}</span>
                <span>{relativeTime(c.updatedAt)}</span>
              </div>
              {c.release && c.release.flags.some((f) => f.severity === 'warn') ? (
                <div style={{ marginTop: 4, fontSize: 10, color: 'var(--amber)' }}>
                  ▲ {c.release.flags.filter((f) => f.severity === 'warn').length} 项告警
                </div>
              ) : null}
            </button>
          ))}
        </div>

        <div className="review-detail card scroll-y">
          {selected ? (
            <ReviewDetail
              c={selected}
              finalSize={finalSize}
              setFinalSize={setFinalSize}
              onOpen={() => onOpenCase(selected, 'measure')}
              onRelease={() => onOpenCase(selected, 'release')}
            />
          ) : (
            <div style={{ padding: 30, color: 'var(--text-3)', fontSize: 12 }}>选择左侧申请单查看详情</div>
          )}
        </div>

        {selected && selected.status === '待审核' && state.role !== 'director' ? (
          <div className="review-actions card">
            <div className="section-title">只读视图</div>
            <div style={{ fontSize: 11.5, color: 'var(--text-3)', lineHeight: 1.7 }}>
              审核决定由主任作出。此处可核对测量值、钙化热区与偏离理由。
              如需修改测量,请回到测量台重新提交。
            </div>
          </div>
        ) : null}
        {selected && selected.status === '待审核' && state.role === 'director' ? (
          <div className="review-actions card">
            <div className="section-title">审核决定</div>
            <div className="label" style={{ marginBottom: 4 }}>退回原因</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
              {RETURN_REASONS.map((r) => (
                <button
                  key={r}
                  className={`reason-chip ${reasons.includes(r) ? 'on' : ''}`}
                  onClick={() => setReasons((rs) => (rs.includes(r) ? rs.filter((x) => x !== r) : [...rs, r]))}
                >
                  {r}
                </button>
              ))}
            </div>
            <div className="label" style={{ marginBottom: 4 }}>审核意见</div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              placeholder="测量复核意见 / 退回说明…"
              style={{ width: '100%', resize: 'vertical', fontSize: 12 }}
            />
            <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => decide('通过')}>
                <IconCheck size={14} /> 通过
              </button>
              <button className="btn btn-danger" style={{ flex: 1 }} onClick={() => decide('退回')}>
                <IconX size={14} /> 退回重测
              </button>
            </div>
            <div className="divider" />
            <div className="section-title">口径提醒</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', lineHeight: 1.7 }}>
              通过后系统按术者统计「型号一次选准率」;若最终植入型号与本单选定型号不一致,请在此修正后再通过。
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ReviewDetail({
  c,
  finalSize,
  setFinalSize,
  onOpen,
  onRelease,
}: {
  c: CaseDoc;
  finalSize: number | null;
  setFinalSize: (v: number | null) => void;
  onOpen: () => void;
  onRelease: () => void;
}) {
  const { state } = useStore();
  const conv = state.conventions;
  const s = c.summary;
  const flags = c.release?.flags.filter((f) => f.severity === 'warn') ?? [];
  const sizes = c.sizing ? state.valves.find((v) => v.id === c.sizing?.valveModelId)?.sizes ?? [] : [];

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>
            {c.patient.name}
            <span style={{ fontSize: 11.5, color: 'var(--text-3)', fontWeight: 400, marginLeft: 8 }}>
              {c.patient.sex} · {c.patient.age} 岁 · {c.patient.mrn}
            </span>
          </div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--text-3)' }}>
            {c.orderNo} · 术者 {c.requester} · 提交 {c.submissionCount} 次 / 退回 {c.returnCount} 次
          </div>
        </div>
        <StatusChip status={c.status} />
      </div>
      {c.indication ? <div style={{ marginTop: 8, fontSize: 11.5, color: 'var(--text-2)' }}>指征:{c.indication}</div> : null}

      <div className="divider" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div>
          <div className="section-title">瓣环与流出道</div>
          <div className="kv"><span className="k">周长</span><span className="v mono">{s ? `${s.ring.perimeterMm.toFixed(1)} mm` : '—'}</span></div>
          <div className="kv"><span className="k">面积</span><span className="v mono">{s ? `${s.ring.areaMm2.toFixed(0)} mm²` : '—'}</span></div>
          <div className="kv"><span className="k">周长派生径</span><span className="v mono">{s ? `${s.ring.dPerimMm.toFixed(1)} mm` : '—'}</span></div>
          <div className="kv"><span className="k">最大/最小径</span><span className="v mono">{s ? `${s.ring.dMaxMm.toFixed(1)} / ${s.ring.dMinMm.toFixed(1)} mm` : '—'}</span></div>
          <div className="kv"><span className="k">轮廓层数</span><span className="v mono">{s ? `${s.contouredSlices} 层` : '—'}</span></div>
          <div className="kv"><span className="k">LVOT 派生径</span><span className="v mono">{s?.lvot ? `${s.lvot.dAreaMm.toFixed(1)} mm` : '—'}</span></div>
          <div className="kv"><span className="k">瓣环平面倾角</span><span className="v mono">{s ? `${s.ring.planeAngleDeg.toFixed(1)}°` : '—'}</span></div>
        </div>
        <div>
          <div className="section-title">冠脉与入路</div>
          <div className="kv"><span className="k">左冠开口高度</span><span className="v mono" style={{ color: s?.coronaries.left && s.coronaries.left.heightMm < conv.ostiumHeightMinMm ? 'var(--amber)' : undefined }}>
            {s?.coronaries.left ? `${s.coronaries.left.heightMm.toFixed(1)} mm` : '—'}
          </span></div>
          <div className="kv"><span className="k">右冠开口高度</span><span className="v mono" style={{ color: s?.coronaries.right && s.coronaries.right.heightMm < conv.ostiumHeightMinMm ? 'var(--amber)' : undefined }}>
            {s?.coronaries.right ? `${s.coronaries.right.heightMm.toFixed(1)} mm` : '—'}
          </span></div>
          <div className="kv"><span className="k">主动脉–左室成角</span><span className="v mono">
            {s?.angulation && Number.isFinite(s.angulation.aortoVentricularDeg) ? `${s.angulation.aortoVentricularDeg.toFixed(1)}°` : '—'}
          </span></div>
          <div className="kv">
            <span className="k">入路最小径</span>
            <span className="v mono" style={{ color: s?.angulation?.accessMinDiameterMm && s.angulation.accessMinDiameterMm < 5.5 ? 'var(--amber)' : undefined }}>
              {s?.angulation?.accessMinDiameterMm ? `${s.angulation.accessMinDiameterMm.toFixed(1)} mm` : '未评估'}
            </span>
          </div>
          <div className="kv"><span className="k">瓣膜型号</span><span className="v mono">{c.sizing ? `${c.sizing.nominalMm} mm` : '—'}</span></div>
          <div className="kv"><span className="k">过度扩张</span><span className="v mono" style={{ color: c.sizing && !c.sizing.withinRange ? 'var(--amber)' : 'var(--green)' }}>
            {c.sizing ? `${c.sizing.oversizePct > 0 ? '+' : ''}${c.sizing.oversizePct.toFixed(1)}%` : '—'}
          </span></div>
          <div className="kv">
            <span className="k">瓣周漏风险</span>
            <span className="v mono">
              {c.release ? `${c.release.pvlArcPct.toFixed(0)}% · 最大 ${c.release.maxGapMm.toFixed(2)} mm` : '—'}
            </span>
          </div>
        </div>
      </div>

      <div className="divider" />
      <div className="section-title">钙化热区图</div>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        {s?.calc ? <CalcPolarChart calc={s.calc} size={150} /> : <div style={{ fontSize: 11.5, color: 'var(--text-3)' }}>未计算</div>}
        {s?.calc ? (
          <div style={{ fontSize: 11.5, lineHeight: 1.8 }}>
            <div>总量 <Num>{s.calc.totalVolumeMm3.toFixed(0)}</Num> mm³</div>
            <div>峰值 <Num>{s.calc.peakHU}</Num> HU</div>
            <div>负担评分 <Num>{s.calc.burdenScore}</Num>/100</div>
            <div style={{ color: 'var(--amber)' }}>
              热区:{s.calc.hotSectors.length ? hotSectorRanges(s.calc).join('、') : '无'}
            </div>
          </div>
        ) : null}
      </div>

      {flags.length ? (
        <>
          <div className="divider" />
          <div className="section-title">
            偏离口径告警 <span className="chip tag-review">{flags.length}</span>
          </div>
          <div style={{ display: 'grid', gap: 5 }}>
            {flags.map((f) => (
              <div key={f.code} className="banner banner-warn" style={{ fontSize: 11.5 }}>
                <div>
                  <b>{f.title}</b> {f.value ? <span className="mono">{f.value}</span> : null}
                  <div style={{ opacity: 0.9, marginTop: 1 }}>{f.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}

      {c.justification ? (
        <>
          <div className="divider" />
          <div className="section-title">偏离理由</div>
          <div style={{ fontSize: 11.5, color: 'var(--text-2)', background: 'var(--panel-2)', borderRadius: 6, padding: '8px 10px', lineHeight: 1.7 }}>
            {c.justification.text}
            <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 4 }}>— {c.justification.by} · {fmtDate(c.justification.at)}</div>
          </div>
        </>
      ) : null}

      {c.review ? (
        <>
          <div className="divider" />
          <div className="section-title">上次审核</div>
          <div className="banner banner-info" style={{ fontSize: 11.5 }}>
            <div>
              {c.review.decision} · {c.review.reviewer}
              <div>{c.review.comment || c.review.reasonCodes.join('、') || '无补充意见'}</div>
            </div>
          </div>
        </>
      ) : null}

      {c.status === '待审核' && sizes.length ? (
        <>
          <div className="divider" />
          <div className="section-title">核对最终型号</div>
          <div style={{ display: 'flex', gap: 4 }}>
            {sizes.map((s2) => (
              <button
                key={s2.nominalMm}
                className={`size-pill ${(finalSize ?? c.sizing?.nominalMm) === s2.nominalMm ? 'on' : ''}`}
                onClick={() => setFinalSize(s2.nominalMm)}
              >
                {s2.label}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 10.5, color: 'var(--text-3)', marginTop: 4 }}>以实际计划植入型号为准,用于统计一次选准率。</div>
        </>
      ) : null}

      <div className="divider" />
      <div className="section-title">操作记录</div>
      <div style={{ maxHeight: 130, overflowY: 'auto', display: 'grid', gap: 3 }}>
        {c.audit.slice().reverse().map((a, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, fontSize: 10.5, color: 'var(--text-3)' }}>
            <span className="mono" style={{ flex: 'none' }}>{fmtDate(a.at).slice(5)}</span>
            <span style={{ color: 'var(--text-2)', flex: 'none' }}>{a.by}</span>
            <span>{a.action} · {a.detail}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
        <button className="btn btn-sm" onClick={onOpen}><IconEye size={13} /> 打开测量台</button>
        <button className="btn btn-sm" onClick={onRelease}><IconTarget size={13} /> 查看虚拟释放</button>
        {c.status === '已通过' ? (
          <button className="btn btn-sm" onClick={() => { window.location.hash = `#/case/${c.id}/report`; }} title="前往讨论单">
            <IconDoc size={13} /> 术前讨论单
          </button>
        ) : null}
      </div>
    </div>
  );
}
