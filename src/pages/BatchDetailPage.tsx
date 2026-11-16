import { useMemo, useState } from 'react';
import { navigate } from '../App';
import { useStore } from '../store/useStore';
import { batchStats } from '../lib/stats';
import { effectiveLimit, effectiveSampleRatio, requiredSampleCount } from '../lib/verdict';
import {
  DEFECT_META,
  DEFECT_ORDER,
  RETURN_CATEGORIES,
  STATUS_FLOW,
  STATUS_META,
} from '../lib/defects';
import { fmtDateTime, fmtFull, fmtPct, fmtTime } from '../lib/format';
import { Empty, Field, Kpi, Meter, StatusChip } from '../components/common';
import { Modal } from '../components/Modal';
import { useUI } from '../components/uiStore';
import { StackedBar, DefectLegend } from '../components/charts';
import {
  IconAlertTri,
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconClock,
  IconDownload,
  IconEye,
  IconFile,
  IconHistory,
  IconLock,
  IconShield,
  IconSwap,
  IconX,
} from '../components/Icons';
import { exportBatchCsv, exportDistributionPng, exportDistributionSvg, exportReleaseSheet } from '../lib/export';
import type { Batch, Board } from '../types';

export function BatchDetailPage({ batchId }: { batchId: string }) {
  const db = useStore((s) => s.db);
  const batch = db.batches.find((b) => b.id === batchId);
  const user = db.users.find((u) => u.id === db.currentUserId)!;
  const toast = useUI((s) => s.toast);
  const [showRelease, setShowRelease] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  const [showExport, setShowExport] = useState(false);

  if (!batch) {
    return (
      <div className="page">
        <div className="page-pad">
          <Empty>批次不存在</Empty>
        </div>
      </div>
    );
  }

  const program = db.programs.find((p) => p.id === batch.programId)!;
  const stats = batchStats(batch);
  const need = requiredSampleCount(batch.boards.length, db.thresholds);
  const isSupervisor = user.role === 'supervisor';
  const canRelease = batch.status === 'awaiting_release';
  const samplePct = batch.boards.length ? batch.sampling.length / batch.boards.length : 0;
  const unviewed = batch.sampling.filter((x) => !x.viewedAt).length;
  const allReviewed = batch.boards.every((b) => b.reviewStatus === 'reviewed');
  const nextBoard = batch.boards.find((b) => b.reviewStatus === 'pending');

  const audit = db.audit.filter((a) => a.batchId === batch.id).slice(0, 40);

  const statusIndex = STATUS_FLOW.indexOf(batch.status);
  const stepWhen: Record<string, string> = {
    pending: fmtTime(batch.importedAt),
    reviewing: batch.boards.some((b) => b.reviewedAt)
      ? fmtTime(batch.boards.filter((b) => b.reviewedAt).sort((a, b) => (a.reviewedAt! < b.reviewedAt! ? 1 : -1))[0].reviewedAt)
      : '',
    awaiting_release: batch.submittedAt ? fmtTime(batch.submittedAt) : '',
    released: batch.released ? fmtTime(batch.released.at) : '',
  };

  return (
    <div className="page">
      <div className="page-pad">
        <div className="breadcrumb">
          <a onClick={() => navigate('/batches')}>批次复判</a>
          <span>/</span>
          <span className="mono" style={{ color: 'var(--txt-2)' }}>{batch.code}</span>
        </div>

        <div className="page-hd">
          <button className="icon-btn" onClick={() => navigate('/batches')} title="返回列表">
            <IconArrowLeft size={16} />
          </button>
          <div className="grow">
            <div className="row" style={{ gap: 10 }}>
              <h1 style={{ margin: 0 }}>{batch.code}</h1>
              <StatusChip status={batch.status} />
              {batch.returns.length > 0 && (
                <span className="chip" style={{ color: 'var(--red)', background: 'var(--red-dim)' }}>
                  退回 {batch.returns.length} 次
                </span>
              )}
            </div>
            <div className="sub" style={{ marginTop: 5 }}>
              {batch.product} · {program.code}（{program.name}） · {batch.line}/{batch.machineId} · {batch.shift}
            </div>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <button className="btn" onClick={() => setShowExport(true)}>
              <IconDownload size={13} /> 导出
            </button>
            {canRelease && (
              <>
                <button
                  className="btn btn-amber"
                  onClick={() => {
                    if (!isSupervisor) {
                      toast('退回需品质主管操作，请切换身份', 'err');
                      return;
                    }
                    setShowReturn(true);
                  }}
                >
                  <IconSwap size={13} /> 退回
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    if (!isSupervisor) {
                      toast('放行需品质主管操作，请切换身份', 'err');
                      return;
                    }
                    setShowRelease(true);
                  }}
                >
                  <IconShield size={13} /> 放行审批
                </button>
              </>
            )}
            {batch.status === 'reviewing' || batch.status === 'pending' ? (
              <button
                className="btn btn-primary"
                disabled={!nextBoard}
                onClick={() => nextBoard && navigate(`/batch/${batch.id}/board/${nextBoard.id}`)}
              >
                {nextBoard ? '继续复判' : '全部完成'} <IconArrowRight size={13} />
              </button>
            ) : null}
          </div>
        </div>

        <div className="pipeline">
          {STATUS_FLOW.map((s, i) => {
            const state = i < statusIndex ? 'done' : i === statusIndex ? 'active' : '';
            return (
              <div key={s} className={`pipe-step ${state}`}>
                <div className="pipe-dot">{i < statusIndex ? <IconCheck size={11} /> : i + 1}</div>
                <div className="lbl">
                  <span style={{ color: STATUS_META[s].color }}>{STATUS_META[s].label}</span>
                  <span className="when">{stepWhen[s] || '—'}</span>
                </div>
              </div>
            );
          })}
          {batch.released && (
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
              <IconLock size={13} style={{ color: 'var(--green)' }} />
              <span className="small" style={{ color: 'var(--green)' }}>
                已锁定 · 放行留痕不可修改
              </span>
            </div>
          )}
        </div>

        <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))' }}>
          <Kpi label="板数" value={stats.total} sub={`已复判 ${stats.reviewed}`} accent="var(--blue)" />
          <Kpi
            label="返修板"
            value={stats.rework}
            sub={`返修率 ${fmtPct(stats.reviewed ? stats.rework / stats.reviewed : 0)}`}
            accent="var(--red)"
          />
          <Kpi label="缺陷标注" value={stats.defectCount} sub={`另含误报 ${stats.detail.false_call}`} accent="var(--amber)" />
          <Kpi
            label="机器误报率"
            value={fmtPct(stats.falseRate)}
            sub={`${stats.falseCallCount}/${stats.machineCalls} 判点`}
            accent="var(--violet)"
          />
          <Kpi label="漏判补标" value={stats.missedDefects} sub="检测机未报、复判员发现" accent="var(--blue)" />
          <Kpi
            label="抽检覆盖"
            value={`${batch.sampling.length}/${need}`}
            sub={
              batch.status === 'released'
                ? `放行时 ${batch.released?.coveragePct.toFixed(1)}%`
                : `要求 ≥ ${(effectiveSampleRatio(db.thresholds) * 100).toFixed(0)}%`
            }
            accent={batch.sampling.length >= need ? 'var(--green)' : 'var(--amber)'}
          />
        </div>

        {batch.status === 'awaiting_release' && (
          <div className="warn-banner" style={{ borderColor: 'rgba(92,178,255,.35)', background: 'linear-gradient(180deg,rgba(92,178,255,.1),rgba(92,178,255,.03))', color: '#cfe6ff' }}>
            <IconShield size={15} style={{ flex: 'none', marginTop: 1 }} />
            <div className="grow">
              全批复判已完成，等待品质主管放行。放行前需标记并<b>实际查看</b>不少于{' '}
              <b>
                {need} 块（{(effectiveSampleRatio(db.thresholds) * 100).toFixed(0)}%）
              </b>{' '}
              抽检样本；当前已标记 {batch.sampling.length} 块，其中 {batch.sampling.length - unviewed} 块已检视
              {unviewed > 0 ? `，${unviewed} 块未检视` : ''}。
            </div>
            {isSupervisor && batch.sampling.length < need && (
              <button
                className="btn btn-sm"
                onClick={() => {
                  useStore.getState().markSampleAll(batch.id);
                  toast('已按比例补齐抽检样本');
                }}
              >
                一键补齐
              </button>
            )}
          </div>
        )}

        {batch.returns.length > 0 && (
          <div className="card" style={{ marginBottom: 14 }}>
            <div className="card-hd">
              <IconHistory size={13} style={{ color: 'var(--red)' }} />
              <h3>退回记录</h3>
              <span className="hint">退回需登记分类与原因，记录退回人</span>
            </div>
            {batch.returns.map((r) => (
              <div className="audit-item" key={r.id} style={{ gridTemplateColumns: '92px 1fr' }}>
                <div className="audit-time">{fmtDateTime(r.at)}</div>
                <div className="audit-body">
                  <span className="chip" style={{ color: 'var(--red)', background: 'var(--red-dim)', marginRight: 8 }}>
                    {r.category}
                  </span>
                  <span style={{ lineHeight: 1.6 }}>{r.reason}</span>
                  <div className="small dim" style={{ marginTop: 4 }}>
                    退回人 <b style={{ color: 'var(--txt-2)' }}>{r.by}</b> · 批次已回到复判中，全部单板重新复判
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="split-2" style={{ gridTemplateColumns: '1.6fr 1fr' }}>
          <div className="card">
            <div className="card-hd">
              <IconFile size={13} style={{ color: 'var(--txt-2)' }} />
              <h3>单板复判</h3>
              <span className="hint">
                点击板号进入画布 · 已复判 {stats.reviewed}/{stats.total}
              </span>
              <div className="grow" />
              <span className="small dim">点击板号进入画布复判</span>
            </div>
            <div className="board-grid">
              {batch.boards.map((b) => (
                <BoardTile
                  key={b.id}
                  board={b}
                  batch={batch}
                  sampled={batch.sampling.some((x) => x.boardId === b.id)}
                  sampledViewed={!!batch.sampling.find((x) => x.boardId === b.id)?.viewedAt}
                  canSample={canRelease && isSupervisor}
                  onToggleSample={() => {
                    useStore.getState().toggleSample(batch.id, b.id);
                  }}
                />
              ))}
            </div>
            <div className="row" style={{ padding: '10px 14px', borderTop: '1px solid var(--line)', gap: 14 }}>
              <span className="small dim">
                <span style={{ color: 'var(--green)' }}>■</span> 通过
              </span>
              <span className="small dim">
                <span style={{ color: 'var(--red)' }}>■</span> 返修
              </span>
              <span className="small dim">
                <span style={{ color: 'var(--muted)' }}>■</span> 待复判
              </span>
              <span className="small dim">
                <span style={{ color: 'var(--blue)' }}>抽检</span> = 主管抽检标记
              </span>
              <div className="grow" />
              {batch.status === 'awaiting_release' && (
                <span className="small dim">点击板号可作为抽检样本标记并检视</span>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="card">
              <div className="card-hd">
                <IconAlertTri size={13} style={{ color: 'var(--amber)' }} />
                <h3>缺陷类型分布</h3>
              </div>
              <div style={{ padding: 14 }}>
                <div className="row" style={{ justifyContent: 'space-between', marginBottom: 10 }}>
                  <span className="mono" style={{ fontSize: 20, fontWeight: 600 }}>
                    {DEFECT_ORDER.reduce((a, t) => a + stats.detail[t], 0)}
                  </span>
                  <span className="small dim">有效标注总数</span>
                </div>
                <StackedBar data={stats.detail} height={12} showEmpty />
                <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {DEFECT_ORDER.map((t) => {
                    const v = stats.detail[t];
                    const pct = stats.defectCount ? v / Math.max(1, DEFECT_ORDER.reduce((a, x) => a + stats.detail[x], 0)) : 0;
                    return (
                      <div key={t} className="row" style={{ gap: 8 }}>
                        <span className="type-dot" style={{ background: DEFECT_META[t].color }} />
                        <span style={{ width: 44, fontSize: 11.5 }}>{DEFECT_META[t].label}</span>
                        <div className="grow">
                          <Meter value={pct} max={1} color={DEFECT_META[t].color} height={4} />
                        </div>
                        <span className="mono small" style={{ width: 26, textAlign: 'right' }}>
                          {v}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-hd">
                <IconEye size={13} style={{ color: 'var(--blue)' }} />
                <h3>抽检样本</h3>
                <span className="hint">
                  要求 ≥ {need} 块
                </span>
              </div>
              {batch.sampling.length === 0 ? (
                <div className="empty">尚未标记抽检样本</div>
              ) : (
                <div className="audit">
                  {batch.sampling.map((s) => {
                    const b = batch.boards.find((x) => x.id === s.boardId);
                    return (
                      <div className="audit-item" key={s.boardId} style={{ gridTemplateColumns: '76px 1fr' }}>
                        <div className="audit-time">{s.viewedAt ? fmtTime(s.viewedAt) : '未检视'}</div>
                        <div className="audit-body">
                          <div className="row" style={{ gap: 6 }}>
                            <span className="mono" style={{ fontWeight: 600 }}>
                              {b?.boardNo} 号板
                            </span>
                            {b?.verdict && (
                              <span
                                className="chip"
                                style={{
                                  color: b.verdict.verdict === 'pass' ? 'var(--green)' : 'var(--red)',
                                  background: b.verdict.verdict === 'pass' ? 'var(--green-dim)' : 'var(--red-dim)',
                                }}
                              >
                                {b.verdict.verdict === 'pass' ? '通过' : '返修'}
                              </span>
                            )}
                            {s.viewedAt ? (
                              <span className="chip" style={{ color: 'var(--green)', background: 'var(--green-dim)' }}>
                                <IconCheck size={9} /> 已检视
                              </span>
                            ) : (
                              <span className="chip" style={{ color: 'var(--amber)', background: 'var(--amber-dim)' }}>
                                待检视
                              </span>
                            )}
                          </div>
                          <div className="small dim" style={{ marginTop: 3 }}>
                            {s.note ?? '抽检样本'} · {s.by}
                          </div>
                          <div className="row" style={{ gap: 6, marginTop: 6 }}>
                            <button
                              className="btn btn-sm btn-ghost"
                              onClick={() => navigate(`/batch/${batch.id}/board/${s.boardId}?sample=1`)}
                            >
                              <IconEye size={11} /> 查看图像
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="card">
              <div className="card-hd">
                <IconClock size={13} style={{ color: 'var(--txt-2)' }} />
                <h3>批次审计</h3>
                <span className="hint">{audit.length} 条</span>
              </div>
              <div className="audit">
                {audit.map((a) => (
                  <div className="audit-item" key={a.id}>
                    <div className="audit-time">{fmtDateTime(a.at)}</div>
                    <div className="audit-body">
                      <b>{a.action}</b>{' '}
                      <span className="who">
                        · {db.users.find((u) => u.id === a.actorId)?.name ?? a.actorId}
                      </span>
                      <div style={{ color: 'var(--txt-2)', marginTop: 2, lineHeight: 1.55 }}>{a.detail}</div>
                    </div>
                  </div>
                ))}
                {audit.length === 0 && <div className="empty">暂无记录</div>}
              </div>
            </div>
          </div>
        </div>

        {batch.released && (
          <div className="card" style={{ marginTop: 14 }}>
            <div className="card-hd">
              <IconLock size={13} style={{ color: 'var(--green)' }} />
              <h3>放行信息</h3>
            </div>
            <dl className="dl">
              <dt>放行人</dt>
              <dd>{batch.released.by}</dd>
              <dt>放行时间</dt>
              <dd>{fmtFull(batch.released.at)}</dd>
              <dt>抽检覆盖</dt>
              <dd>{batch.released.coveragePct.toFixed(1)}%</dd>
              <dt>放行意见</dt>
              <dd style={{ fontFamily: 'var(--sans)' }}>{batch.released.note}</dd>
            </dl>
          </div>
        )}
      </div>

      {showRelease && (
        <ReleaseModal
          batch={batch}
          onClose={() => setShowRelease(false)}
          onDone={(msg) => {
            setShowRelease(false);
            toast(msg);
          }}
        />
      )}
      {showReturn && (
        <ReturnModal
          batch={batch}
          onClose={() => setShowReturn(false)}
          onDone={(msg) => {
            setShowReturn(false);
            toast(msg);
          }}
        />
      )}
      {showExport && <ExportModal batch={batch} onClose={() => setShowExport(false)} />}
    </div>
  );
}

function BoardTile({
  board,
  batch,
  sampled,
  sampledViewed,
  canSample,
  onToggleSample,
}: {
  board: Board;
  batch: Batch;
  sampled: boolean;
  sampledViewed: boolean;
  canSample: boolean;
  onToggleSample: () => void;
}) {
  const version = board.versions.find((v) => v.id === board.activeVersionId)!;
  const active = version.annotations.filter((a) => a.status === 'active');
  const counts = DEFECT_ORDER.map((t) => ({ t, n: active.filter((a) => a.type === t).length }));
  const total = active.length;
  const reviewed = board.reviewStatus === 'reviewed';
  const verdict = board.verdict?.verdict;
  return (
    <a
      className="board-tile"
      href={`#/batch/${batch.id}/board/${board.id}`}
      style={{
        borderColor:
          verdict === 'rework'
            ? 'rgba(255,107,94,.45)'
            : verdict === 'pass'
              ? 'rgba(61,220,151,.35)'
              : undefined,
        textDecoration: 'none',
        color: 'inherit',
      }}
      title={`${board.boardNo} 号板 · ${version.label} · ${total} 处标注`}
    >
      {canSample && (
        <span
          role="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleSample();
          }}
          title={sampled ? '取消抽检标记' : '标记为抽检样本'}
          style={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            width: 18,
            height: 18,
            borderRadius: 5,
            border: `1px solid ${sampled ? 'rgba(92,178,255,.6)' : 'var(--line-2)'}`,
            background: sampled ? 'rgba(92,178,255,.22)' : 'rgba(0,0,0,.25)',
            display: 'grid',
            placeItems: 'center',
            color: sampled ? 'var(--blue)' : 'var(--muted)',
          }}
        >
          <IconEye size={10} />
        </span>
      )}
      {sampled && (
        <span className="sampled" style={sampledViewed ? { color: 'var(--green)', borderColor: 'rgba(61,220,151,.45)', background: 'var(--green-dim)' } : undefined}>
          {sampledViewed ? '抽检✓' : '抽检'}
        </span>
      )}
      <div className="no">{board.boardNo}</div>
      <div className="meta">
        <span>{version.label.replace('图像 ', '')}</span>
        {board.versions.length > 1 && <span style={{ color: 'var(--amber)' }}>{board.versions.length}版</span>}
      </div>
      <div className="dotline">
        {counts
          .filter((c) => c.n > 0)
          .map((c) => (
            <span
              key={c.t}
              className="dt"
              style={{ background: DEFECT_META[c.t].color, width: 3 + Math.min(9, c.n * 3) }}
              title={`${DEFECT_META[c.t].label} ${c.n}`}
            />
          ))}
        {total === 0 && <span className="small dim">无标注</span>}
      </div>
      <div
        className="verdict"
        style={{
          color: verdict === 'pass' ? 'var(--green)' : verdict === 'rework' ? 'var(--red)' : 'var(--muted)',
        }}
      >
        {reviewed ? (
          <>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                background: 'currentColor',
                display: 'inline-block',
              }}
            />
            {verdict === 'pass' ? '通过' : '返修'}
            <span className="small dim" style={{ marginLeft: 4, fontWeight: 400 }}>
              {total}处
            </span>
          </>
        ) : (
          <>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                background: 'currentColor',
                display: 'inline-block',
              }}
            />
            待复判 · {total}处
          </>
        )}
      </div>
    </a>
  );
}

function ReleaseModal({
  batch,
  onClose,
  onDone,
}: {
  batch: Batch;
  onClose: () => void;
  onDone: (msg: string) => void;
}) {
  const db = useStore((s) => s.db);
  const release = useStore((s) => s.releaseBatch);
  const markSampleAll = useStore((s) => s.markSampleAll);
  const [note, setNote] = useState('');
  const [err, setErr] = useState('');
  const need = requiredSampleCount(batch.boards.length, db.thresholds);
  const unviewed = batch.sampling.filter((x) => !x.viewedAt).length;

  const checks = [
    { ok: batch.boards.every((b) => b.reviewStatus === 'reviewed'), label: '全部单板已完成复判' },
    {
      ok: batch.sampling.length >= need,
      label: `抽检样本 ≥ ${need} 块（${(effectiveSampleRatio(db.thresholds) * 100).toFixed(0)}%），当前 ${batch.sampling.length} 块`,
    },
    {
      ok: batch.sampling.length > 0 && unviewed === 0,
      label:
        batch.sampling.length === 0
          ? '需先标记抽检样本并逐块打开图像检视'
          : unviewed === 0
            ? '抽检样本均已实际检视图像'
            : `还有 ${unviewed} 块抽检样本未检视图像`,
    },
    { ok: note.trim().length > 0, label: '填写放行意见' },
  ];
  const allOk = checks.every((c) => c.ok);

  return (
    <Modal
      title="批次放行审批"
      desc={`${batch.code} · ${batch.product} · ${batch.boards.length} 块板 · 品质主管审批`}
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-ghost" onClick={onClose}>
            取消
          </button>
          <button
            className="btn btn-primary"
            disabled={!allOk}
            onClick={() => {
              const res = release(batch.id, note);
              if (!res.ok) setErr(res.message);
              else onDone(res.message);
            }}
          >
            <IconShield size={13} /> 确认放行
          </button>
        </>
      }
    >
      <div style={{ marginBottom: 14 }}>
        {checks.map((c) => (
          <div className="check-line" key={c.label}>
            <span className={c.ok ? 'ok' : 'bad'} style={{ display: 'inline-flex' }}>
              {c.ok ? <IconCheck size={13} /> : <IconX size={13} />}
            </span>
            <span style={{ color: c.ok ? 'var(--txt)' : 'var(--txt-2)' }}>{c.label}</span>
          </div>
        ))}
      </div>
      {batch.sampling.length < need && (
        <button
          className="btn btn-sm btn-amber"
          style={{ marginBottom: 14 }}
          onClick={() => markSampleAll(batch.id)}
        >
          按比例一键补齐抽检样本
        </button>
      )}
      {unviewed > 0 && (
        <div className="small dim" style={{ marginBottom: 14, lineHeight: 1.6 }}>
          放行前必须逐块打开抽检板的图像检视。请回到批次详情，在「抽检样本」里点击「查看图像」，检视后
          会自动记录检视时间。
        </div>
      )}
      <Field label="放行意见" required hint="会写入放行单与审计记录">
        <textarea
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
            setErr('');
          }}
          placeholder="例如：抽检 2/12 块，焊点成形与标注一致性符合要求，缺陷分布与历史持平，准予放行。"
        />
      </Field>
      {err && <div className="small" style={{ color: 'var(--red)' }}>{err}</div>}
    </Modal>
  );
}

function ReturnModal({
  batch,
  onClose,
  onDone,
}: {
  batch: Batch;
  onClose: () => void;
  onDone: (msg: string) => void;
}) {
  const user = useStore((s) => s.db.users.find((u) => u.id === s.db.currentUserId)!);
  const returnBatch = useStore((s) => s.returnBatch);
  const [category, setCategory] = useState('');
  const [reason, setReason] = useState('');
  const [err, setErr] = useState('');

  return (
    <Modal
      title="退回批次"
      desc={`${batch.code} · 退回后批次回到「复判中」，全部单板需重新复判并记录退回人`}
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-ghost" onClick={onClose}>
            取消
          </button>
          <button
            className="btn btn-danger"
            disabled={!category || reason.trim().length < 8}
            onClick={() => {
              const res = returnBatch(batch.id, category, reason);
              if (!res.ok) setErr(res.message);
              else onDone(res.message);
            }}
          >
            <IconSwap size={13} /> 确认退回
          </button>
        </>
      }
    >
      <Field label="退回分类" required>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">请选择分类…</option>
          {RETURN_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Field>
      <Field label="退回原因" required hint="不少于 8 个字，需明确指出问题板号或缺陷位置">
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="例如：07 号板 R37 焊点虚焊漏判，客户申诉成立，全批退回重做并补标。"
        />
      </Field>
      <div className="check-line" style={{ marginTop: 4 }}>
        <span style={{ color: 'var(--txt-2)' }}>退回人</span>
        <b style={{ marginLeft: 'auto' }}>{user.name}</b>
        <span className="tag">{user.code}</span>
      </div>
      {err && <div className="small" style={{ color: 'var(--red)', marginTop: 8 }}>{err}</div>}
    </Modal>
  );
}

function ExportModal({ batch, onClose }: { batch: Batch; onClose: () => void }) {
  const db = useStore((s) => s.db);
  const toast = useUI((s) => s.toast);
  const items = [
    {
      icon: <IconFile size={16} />,
      title: '批次放行单',
      desc: 'A4 打印版放行单（HTML），含判定明细、抽检记录、签字栏',
      action: () => {
        exportReleaseSheet(batch, db);
        toast('放行单已导出');
      },
    },
    {
      icon: <IconDownload size={16} />,
      title: '缺陷分布图（SVG）',
      desc: '客户交付用矢量分布图，可直接嵌入报告',
      action: () => {
        exportDistributionSvg(batch, db);
        toast('分布图已导出');
      },
    },
    {
      icon: <IconDownload size={16} />,
      title: '缺陷分布图（PNG）',
      desc: '位图格式，便于邮件/PPT 使用',
      action: async () => {
        await exportDistributionPng(batch, db);
        toast('PNG 已导出');
      },
    },
    {
      icon: <IconFile size={16} />,
      title: '复判明细 CSV',
      desc: '逐板标注数量、判定结论、复判人与图像版本',
      action: () => {
        exportBatchCsv(batch, db);
        toast('明细已导出');
      },
    },
  ];
  return (
    <Modal title="导出批次资料" desc={`${batch.code} · 交付客户与内部归档`} onClose={onClose} width={560}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((it) => (
          <button
            key={it.title}
            className="check-line"
            style={{ textAlign: 'left', cursor: 'pointer', padding: '11px 12px' }}
            onClick={it.action}
          >
            <span style={{ color: 'var(--green)', display: 'inline-flex' }}>{it.icon}</span>
            <div>
              <div style={{ fontWeight: 550 }}>{it.title}</div>
              <div className="small dim" style={{ marginTop: 2 }}>
                {it.desc}
              </div>
            </div>
            <IconArrowRight size={13} style={{ marginLeft: 'auto', color: 'var(--muted)' }} />
          </button>
        ))}
      </div>
    </Modal>
  );
}
