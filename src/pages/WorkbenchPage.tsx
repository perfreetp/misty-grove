import { useEffect, useMemo, useRef, useState } from 'react';
import { navigate } from '../App';
import { useStore } from '../store/useStore';
import { PixiViewer, type ViewerMode } from '../viewer/PixiViewer';
import { DEFECT_META, DEFECT_ORDER } from '../lib/defects';
import { effectiveLimit, evaluateVerdict } from '../lib/verdict';
import { fmtDateTime, fmtTime } from '../lib/format';
import { useUI } from '../components/uiStore';
import { Field, Segmented, StatusChip, Empty } from '../components/common';
import { Modal } from '../components/Modal';
import {
  IconArrowLeft,
  IconBox,
  IconCheck,
  IconCursor,
  IconDraw,
  IconEye,
  IconEyeOff,
  IconLayers,
  IconFit,
  IconHand,
  IconHistory,
  IconLock,
  IconRefresh,
  IconSwap,
  IconTarget,
  IconTrash,
  IconUndo,
  IconWarn,
  IconX,
  IconZoomIn,
  IconZoomOut,
} from '../components/Icons';
import type { Annotation, Batch, Board, DefectRecord, DefectType, ImageVersion, Rect } from '../types';

interface Props {
  batchId: string;
  boardId: string;
}

export function WorkbenchPage({ batchId, boardId }: Props) {
  const db = useStore((s) => s.db);
  const batch = db.batches.find((b) => b.id === batchId);
  const board = batch?.boards.find((b) => b.id === boardId);
  const user = db.users.find((u) => u.id === db.currentUserId)!;
  const toast = useUI((s) => s.toast);

  const addAnnotation = useStore((s) => s.addAnnotation);
  const updateAnnotation = useStore((s) => s.updateAnnotation);
  const removeAnnotation = useStore((s) => s.removeAnnotation);
  const startReview = useStore((s) => s.startReview);
  const submitBoard = useStore((s) => s.submitBoard);
  const reopenBoard = useStore((s) => s.reopenBoard);
  const rescanBoard = useStore((s) => s.rescanBoard);
  const toggleSample = useStore((s) => s.toggleSample);
  const markSampleViewed = useStore((s) => s.markSampleViewed);

  const hostRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<PixiViewer | null>(null);
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<ViewerMode>('select');
  const [showMachine, setShowMachine] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoverMachine, setHoverMachine] = useState<{ d: DefectRecord; x: number; y: number } | null>(null);
  const [draft, setDraft] = useState<Rect | null>(null);
  const [draftOpen, setDraftOpen] = useState(false);
  const [versionId, setVersionId] = useState(() => board?.activeVersionId ?? '');
  const [showHistory, setShowHistory] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [showRescan, setShowRescan] = useState(false);
  const [newNote, setNewNote] = useState('');
  const draftRef = useRef<Rect | null>(null);
  draftRef.current = draft;

  const version: ImageVersion | undefined = board?.versions.find((v) => v.id === versionId) ?? board?.versions.find((v) => v.id === board?.activeVersionId);
  const isActive = !!board && !!version && board.activeVersionId === version.id;
  const released = batch?.status === 'released';
  const engineerReadOnly = user.role === 'engineer';
  const readOnly = released || !isActive || engineerReadOnly;
  const activeAnnotations = version?.annotations.filter((a) => a.status === 'active') ?? [];
  const voidAnnotations = version?.annotations.filter((a) => a.status === 'void') ?? [];
  const verdict = useMemo(
    () => (version ? evaluateVerdict(version.annotations, db.thresholds) : null),
    [version, db.thresholds],
  );

  const machineDefects = useMemo(
    () => version?.defects.filter((d) => d.machineJudged) ?? [],
    [version],
  );

  // 进入待复判批次的单板即视为接单复判
  useEffect(() => {
    if (batch && board && batch.status === 'pending' && user.role !== 'engineer') {
      startReview(batch.id, board.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batch?.id, board?.id]);

  // 切换单板时同步图像版本选择
  useEffect(() => {
    if (board) setVersionId(board.activeVersionId);
    setSelectedId(null);
  }, [board?.id, board?.activeVersionId]);

  // 自动记录抽检检视
  useEffect(() => {
    if (!batch || !board) return;
    const rec = batch.sampling.find((x) => x.boardId === board.id);
    if (rec && !rec.viewedAt && user.role === 'supervisor' && batch.status === 'awaiting_release') {
      const t = setTimeout(() => markSampleViewed(batch.id, board.id), 1200);
      return () => clearTimeout(t);
    }
  }, [batch, board, user.role, markSampleViewed]);

  // 初始化 Pixi
  useEffect(() => {
    let cancelled = false;
    const v = new PixiViewer(hostRef.current!, {
      onSelect: (id) => setSelectedId(id),
      onHoverMachine: (d, x, y) => setHoverMachine(d ? { d, x, y } : null),
      onDraftChange: (r) => {
        setDraft(r);
        if (r) setDraftOpen(true);
      },
      onViewportChange: (z) => setZoom(z),
    });
    viewerRef.current = v;
    v.init().then(() => {
      if (cancelled) return;
      setReady(true);
      if (board) v.setBoardInfo(board.boardNo, batch?.code ?? '');
      requestAnimationFrame(() => v.fit(0.94));
    });
    return () => {
      cancelled = true;
      v.destroy();
      viewerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (board) viewerRef.current?.setBoardInfo(board.boardNo, batch?.code ?? '');
  }, [board, batch?.code]);

  useEffect(() => {
    const v = viewerRef.current;
    if (!v || !ready || !version || !board) return;
    v.setData({
      version,
      machineDefects: machineDefects,
      annotations: version.annotations,
      readOnly,
    });
    v.setMode(mode);
    v.setShowMachine(showMachine);
    v.setSelected(selectedId);
  }, [ready, version, board, machineDefects, readOnly, mode, showMachine, selectedId]);

  useEffect(() => {
    viewerRef.current?.setSelected(selectedId);
  }, [selectedId]);

  // 键盘快捷键
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement)
        return;
      if (e.key === 'v' || e.key === 'V') setMode('select');
      if (e.key === 'b' || e.key === 'B') setMode('draw');
      if (e.key === 'h' || e.key === 'H') setMode('pan');
      if (e.key === 'f' || e.key === 'F') viewerRef.current?.fit(0.94, true);
      if (e.key === 'Escape') {
        setDraft(null);
        setDraftOpen(false);
        setSelectedId(null);
      }
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId && !readOnly) {
        const a = version?.annotations.find((x) => x.id === selectedId);
        if (a && a.status === 'active' && board && batch) {
          removeAnnotation(batch.id, board.id, a.versionId, a.id);
          setSelectedId(null);
          toast('已删除标注');
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedId, readOnly, version, board, batch, removeAnnotation, toast]);

  if (!batch || !board || !version) {
    return (
      <div className="page">
        <div className="page-pad">
          <Empty>单板不存在</Empty>
        </div>
      </div>
    );
  }

  const program = db.programs.find((p) => p.id === batch.programId)!;
  const sampleRec = batch.sampling.find((x) => x.boardId === board.id);
  const versionIndex = board.versions.findIndex((v) => v.id === version.id);
  const retired = board.versions.filter((v) => v.id !== board.activeVersionId);

  const commitDraft = (type: DefectType) => {
    if (!draft) return;
    const linked =
      version.defects.find(
        (d) =>
          d.machineJudged &&
          d.x < draft.x + draft.w &&
          d.x + d.w > draft.x &&
          d.y < draft.y + draft.h &&
          d.y + d.h > draft.y,
      ) ?? null;
    const id = addAnnotation({
      batchId: batch.id,
      boardId: board.id,
      versionId: version.id,
      rect: draft,
      type,
      defectId: linked?.id ?? null,
      note: type === 'false_call' ? '焊点成形正常，判为程序误报' : '',
    });
    setDraft(null);
    setDraftOpen(false);
    viewerRef.current?.clearDraft();
    if (id) {
      setSelectedId(id);
      toast(`已标注「${DEFECT_META[type].label}」${linked ? ` · 关联机器判点 ${linked.componentRef}` : ' · 人工发现'}`);
    }
  };

  const applyTypeToMachine = (d: DefectRecord, type: DefectType) => {
    const existing = activeAnnotations.find((a) => a.defectId === d.id);
    if (existing) {
      updateAnnotation(batch.id, board.id, version.id, existing.id, { type });
      setSelectedId(existing.id);
      return;
    }
    const id = addAnnotation({
      batchId: batch.id,
      boardId: board.id,
      versionId: version.id,
      rect: { x: d.x, y: d.y, w: d.w, h: d.h },
      type,
      defectId: d.id,
      note: type === 'false_call' ? '焊点成形正常，判为程序误报' : '',
    });
    if (id) {
      setSelectedId(id);
      toast(`已判为「${DEFECT_META[type].label}」`);
    }
  };

  const gotoBoard = (dir: -1 | 1) => {
    const idx = batch.boards.findIndex((b) => b.id === board.id);
    const next = batch.boards[(idx + dir + batch.boards.length) % batch.boards.length];
    if (next) navigate(`/batch/${batch.id}/board/${next.id}`);
  };

  const progress = batch.boards.filter((b) => b.reviewStatus === 'reviewed').length;

  return (
    <div className="wb">
      <div className="wb-toolbar">
        <button
          className="icon-btn"
          onClick={() => navigate(`/batch/${batch.id}`)}
          title="返回批次"
        >
          <IconArrowLeft size={16} />
        </button>
        <div className="wb-title">
          <span className="b">
            {batch.code} · {board.boardNo} 号板
          </span>
          <span className="s">
            {program.code} · {batch.shift} · {progress}/{batch.boards.length} 已复判
          </span>
        </div>
        <StatusChip status={batch.status} />
        {sampleRec && (
          <span
            className="chip"
            style={{
              color: sampleRec.viewedAt ? 'var(--green)' : 'var(--blue)',
              background: sampleRec.viewedAt ? 'var(--green-dim)' : 'var(--blue-dim)',
            }}
          >
            <IconEye size={10} /> 抽检样本{sampleRec.viewedAt ? '·已检视' : ''}
          </span>
        )}
        <div className="vdiv" />
        <div className="row" style={{ gap: 4 }}>
          <span className="small dim">图像</span>
          <select
            value={version.id}
            onChange={(e) => {
              setVersionId(e.target.value);
              setSelectedId(null);
            }}
            style={{ width: 176, padding: '4px 7px', fontSize: 11.5 }}
          >
            {board.versions.map((v, i) => (
              <option key={v.id} value={v.id}>
                {v.id === board.activeVersionId ? '● ' : ''}
                {v.label} · {fmtDateTime(v.createdAt)}
              </option>
            ))}
          </select>
        </div>
        <div className="grow" />
        <Segmented<ViewerMode>
          size="sm"
          value={mode}
          onChange={setMode}
          options={[
            { value: 'select', label: <><IconCursor size={12} /> 选择</>, title: '选择/移动视图 (V)' },
            { value: 'draw', label: <><IconDraw size={12} /> 框选</>, title: '框选标注 (B)' },
            { value: 'pan', label: <><IconHand size={12} /> 平移</>, title: '拖拽平移 (H / 空格)' },
          ]}
        />
        <button
          className={`btn btn-sm ${showMachine ? '' : 'btn-ghost'}`}
          onClick={() => setShowMachine((v) => !v)}
          title="显示/隐藏检测机判点框"
        >
          {showMachine ? <IconEye size={12} /> : <IconEyeOff size={12} />} 机器判点
        </button>
        <div className="vdiv" />
        {!readOnly && (
          <>
            <button className="btn btn-sm" onClick={() => setShowRescan(true)} title="换用重扫图像，旧标注作废留痕">
              <IconSwap size={12} /> 换图
            </button>
            {board.reviewStatus === 'reviewed' ? (
              <button
                className="btn btn-sm"
                onClick={() => {
                  reopenBoard(batch.id, board.id);
                  toast('已撤回该板复判，可继续修改');
                }}
              >
                <IconUndo size={12} /> 撤回复判
              </button>
            ) : null}
            <button
              className="btn btn-sm btn-primary"
              onClick={() => setShowSubmit(true)}
              title="提交本板复判"
            >
              <IconCheck size={12} /> 提交本板
            </button>
          </>
        )}
        {readOnly && (
          <span className="chip" style={{ color: 'var(--amber)', background: 'var(--amber-dim)' }}>
            <IconLock size={10} />{' '}
            {released ? '批次已放行 · 只读' : engineerReadOnly ? '品质工程 · 只读查看' : '历史图像版本 · 只读'}
          </span>
        )}
      </div>

      <div className="wb-body">
        {/* 左侧：机器判点 + 版本 */}
        <aside className="wb-side">
          <div className="side-section" style={{ flex: '1 1 auto' }}>
            <div className="side-hd">
              <IconTarget size={11} /> 检测机判点 <span className="n">{machineDefects.length}</span>
              <div className="grow" />
              <span className="small dim" style={{ textTransform: 'none', letterSpacing: 0 }}>
                虚线框
              </span>
            </div>
            <div className="side-scroll">
              {machineDefects.length === 0 && <div className="empty">本板无机器判点</div>}
              {machineDefects.map((d) => {
                const ann = activeAnnotations.find((a) => a.defectId === d.id);
                return (
                  <div
                    key={d.id}
                    className={`defect-item ${hoverMachine?.d.id === d.id ? 'hovered' : ''} ${ann ? 'done' : ''}`}
                  >
                    <div className="top">
                      <span
                        className="type-dot"
                        style={{ background: DEFECT_META[ann?.type ?? d.machineType ?? 'insufficient_solder'].color }}
                      />
                      <span className="ref">{d.componentRef}</span>
                      <span className="tag">{DEFECT_META[d.machineType ?? 'insufficient_solder'].label}</span>
                      <span className="conf">置信 {d.confidence}</span>
                    </div>
                    {ann ? (
                      <div className="state">
                        <IconCheck size={10} style={{ color: 'var(--green)' }} />
                        已判为 <b style={{ color: DEFECT_META[ann.type].color }}>{DEFECT_META[ann.type].label}</b>
                        <button
                          className="btn btn-sm btn-ghost"
                          style={{ marginLeft: 'auto', padding: '1px 5px' }}
                          onClick={() => setSelectedId(ann.id)}
                        >
                          编辑
                        </button>
                      </div>
                    ) : (
                      <div className="actions">
                        <button
                          className="btn btn-sm"
                          disabled={readOnly}
                          onClick={() => applyTypeToMachine(d, 'false_call')}
                          title="焊点正常，程序误判"
                        >
                          误报
                        </button>
                        <button
                          className="btn btn-sm"
                          disabled={readOnly}
                          onClick={() => applyTypeToMachine(d, d.machineType ?? 'insufficient_solder')}
                          title="采信机器判定类型"
                        >
                          采信{DEFECT_META[d.machineType ?? 'insufficient_solder'].label}
                        </button>
                        <button
                          className="btn btn-sm btn-ghost"
                          onClick={() => viewerRef.current?.zoomToRect(d)}
                          title="定位到该判点"
                        >
                          <IconTarget size={10} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="side-section" style={{ flex: '0 0 auto' }}>
            <div className="side-hd">
              <IconHistory size={11} /> 图像版本 <span className="n">{board.versions.length}</span>
            </div>
            <div style={{ padding: '0 8px 10px' }}>
              {[...board.versions].reverse().map((v) => {
                const active = v.id === board.activeVersionId;
                const valid = v.annotations.filter((a) => a.status === 'active').length;
                const dead = v.annotations.filter((a) => a.status === 'void').length;
                return (
                  <button
                    key={v.id}
                    className={`check-line ${v.id === version.id ? 'sel' : ''}`}
                    onClick={() => {
                      setVersionId(v.id);
                      setSelectedId(null);
                    }}
                    style={{
                      width: '100%',
                      cursor: 'pointer',
                      textAlign: 'left',
                      borderColor: v.id === version.id ? 'rgba(61,220,151,.45)' : undefined,
                      background: v.id === version.id ? 'rgba(61,220,151,.06)' : undefined,
                    }}
                  >
                    <span
                      style={{
                        color: active ? 'var(--green)' : 'var(--muted)',
                        display: 'inline-flex',
                      }}
                    >
                      <IconBox size={12} />
                    </span>
                    <div className="grow">
                      <div style={{ fontSize: 11.5 }}>
                        {v.label} {active && <span className="tag" style={{ marginLeft: 4 }}>有效</span>}
                      </div>
                      <div className="small dim mono" style={{ marginTop: 2 }}>
                        {fmtDateTime(v.createdAt)} · {valid} 有效 / {dead} 作废
                      </div>
                    </div>
                  </button>
                );
              })}
              {retired.length > 0 && (
                <button className="btn btn-sm btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: 2 }} onClick={() => setShowHistory(true)}>
                  查看作废留痕
                </button>
              )}
            </div>
          </div>
        </aside>

        {/* 画布 */}
        <div className="stage">
          <div className="canvas-host" ref={hostRef} />
          <div className="stage-hud">
            <span className="hud-pill">
              <IconLayers size={11} /> {version.label}
            </span>
            <span className="hud-pill mono">{Math.round(zoom * 100)}%</span>
            <span className="hud-pill">
              {readOnly
                ? '只读比对'
                : mode === 'draw'
                  ? '拖拽框选可疑焊点'
                  : mode === 'pan'
                    ? '拖拽平移'
                    : '点击标注查看 · 滚轮缩放'}
            </span>
            {!readOnly && (
              <span className="hud-pill" style={{ color: 'var(--muted)' }}>
                <kbd>V</kbd> 选择 <kbd>B</kbd> 框选 <kbd>H</kbd> 平移 <kbd>F</kbd> 适应
              </span>
            )}
            {!isActive && (
              <span className="hud-pill" style={{ color: 'var(--amber)', borderColor: 'rgba(255,200,87,.4)' }}>
                <IconWarn size={11} /> 非当前有效版本
              </span>
            )}
          </div>
          <div className="zoom-ctrl">
            <button onClick={() => viewerRef.current?.zoomBy(1.3)} title="放大">
              <IconZoomIn size={14} />
            </button>
            <button onClick={() => viewerRef.current?.zoomBy(1 / 1.3)} title="缩小">
              <IconZoomOut size={14} />
            </button>
            <button onClick={() => viewerRef.current?.fit(0.94, true)} title="适应窗口 (F)">
              <IconFit size={14} />
            </button>
            <button onClick={() => viewerRef.current?.actualSize()} title="实际像素">
              1:1
            </button>
          </div>

          {draftOpen && draft && (
            <QuickPick
              rect={draft}
              suggestion={suggestType(version.defects, draft)}
              onPick={commitDraft}
              onCancel={() => {
                setDraft(null);
                setDraftOpen(false);
                viewerRef.current?.clearDraft();
              }}
            />
          )}

          <div style={{ position: 'absolute', bottom: 12, left: 12 }} className="hud-pill">
            {activeAnnotations.length} 有效标注 · {voidAnnotations.length} 已作废
          </div>
        </div>

        {/* 右侧：标注 + 判定 */}
        <aside className="wb-side right">
          <div className="verdict-card">
            {!isActive && (
              <div
                className="verdict-badge"
                style={{
                  color: 'var(--amber)',
                  background: 'var(--amber-dim)',
                  borderColor: 'rgba(255,200,87,.35)',
                  marginBottom: 9,
                }}
              >
                <IconHistory size={14} />
                历史版本 · 只读比对
                <span className="mono small" style={{ marginLeft: 'auto', opacity: 0.8 }}>
                  {activeAnnotations.length + voidAnnotations.length} 条记录
                </span>
              </div>
            )}
            {!isActive && (
              <div className="small dim" style={{ lineHeight: 1.6 }}>
                该版本已不作为当前有效图像，其标注仅用于追溯，不参与本板过站判定。当前有效版本为{' '}
                <b className="mono">{board.versions.find((v) => v.id === board.activeVersionId)?.label}</b>。
              </div>
            )}
            {isActive && verdict && (
              <>
                <div
                  className="verdict-badge"
                  style={{
                    color: verdict.verdict === 'pass' ? 'var(--green)' : 'var(--red)',
                    background: verdict.verdict === 'pass' ? 'var(--green-dim)' : 'var(--red-dim)',
                    borderColor: verdict.verdict === 'pass' ? 'rgba(61,220,151,.4)' : 'rgba(255,107,94,.4)',
                  }}
                >
                  {board.verdict && board.reviewStatus === 'reviewed' ? (
                    board.verdict.verdict === 'pass' ? (
                      <IconCheck size={15} />
                    ) : (
                      <IconWarn size={15} />
                    )
                  ) : verdict.verdict === 'pass' ? (
                    <IconCheck size={15} />
                  ) : (
                    <IconWarn size={15} />
                  )}
                  {board.verdict && board.reviewStatus === 'reviewed'
                    ? board.verdict.verdict === 'pass'
                      ? '已提交 · 通过'
                      : '已提交 · 返修'
                    : verdict.verdict === 'pass'
                      ? '当前判定 · 通过'
                      : '当前判定 · 返修'}
                  <span className="mono small" style={{ marginLeft: 'auto', opacity: 0.8 }}>
                    {activeAnnotations.length} 标注
                  </span>
                </div>
                <div style={{ marginTop: 9 }}>
                  {DEFECT_ORDER.filter((t) => DEFECT_META[t].counted).map((t) => {
                    const limit = effectiveLimit(t, db.thresholds) ?? 0;
                    const count = verdict.counts[t];
                    const over = count > limit;
                    return (
                      <div className={`rule-row ${over ? 'over' : ''}`} key={t}>
                        <span className="type-name row" style={{ gap: 6 }}>
                          <span className="type-dot" style={{ background: DEFECT_META[t].color }} />
                          {DEFECT_META[t].label}
                          {DEFECT_META[t].hard && (
                            <span className="tag" style={{ fontSize: 9, padding: '0 4px' }}>
                              硬性
                            </span>
                          )}
                        </span>
                        <span className="limit">阈值 ≤ {limit}</span>
                        <span className="cnt">
                          {count}
                          {over ? ' ↑' : ''}
                        </span>
                      </div>
                    );
                  })}
                  <div className="rule-row">
                    <span className="row" style={{ gap: 6 }}>
                      <span className="type-dot" style={{ background: DEFECT_META.false_call.color }} />
                      误报
                    </span>
                    <span className="limit">不计入</span>
                    <span className="cnt" style={{ color: 'var(--muted)' }}>
                      {verdict.counts.false_call}
                    </span>
                  </div>
                </div>
                {verdict.reasons.length > 0 && (
                  <div
                    className="small"
                    style={{
                      marginTop: 8,
                      color: '#ffb3ac',
                      lineHeight: 1.55,
                      background: 'rgba(255,107,94,.07)',
                      border: '1px solid rgba(255,107,94,.22)',
                      borderRadius: 6,
                      padding: '6px 8px',
                    }}
                  >
                    {verdict.reasons.map((r) => (
                      <div key={r}>· {r}</div>
                    ))}
                  </div>
                )}
                {board.verdict && board.reviewStatus === 'reviewed' && (
                  <div className="small dim" style={{ marginTop: 7, fontFamily: 'var(--mono)' }}>
                    提交于 {fmtDateTime(board.verdict.at)} · {board.verdict.by}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="side-section" style={{ flex: 1 }}>
            <div className="side-hd">
              <IconBox size={11} /> 本版标注
              <span className="n">{activeAnnotations.length}</span>
              <div className="grow" />
              {!readOnly && (
                <button
                  className="btn btn-sm btn-ghost"
                  style={{ padding: '2px 6px' }}
                  onClick={() => setMode(mode === 'draw' ? 'select' : 'draw')}
                >
                  {mode === 'draw' ? '结束框选' : '+ 框选'}
                </button>
              )}
            </div>
            <div className="side-scroll">
              {activeAnnotations.length === 0 && (
                <div className="empty">
                  暂无标注
                  <div className="small" style={{ marginTop: 6 }}>
                    切到「框选」在画布上拖拽出缺陷范围
                  </div>
                </div>
              )}
              {activeAnnotations.map((a, i) => (
                <AnnotationItem
                  key={a.id}
                  ann={a}
                  index={i + 1}
                  selected={a.id === selectedId}
                  readOnly={readOnly}
                  onSelect={() => {
                    const next = a.id === selectedId ? null : a.id;
                    setSelectedId(next);
                    if (next) viewerRef.current?.zoomToRect(a, 0.9);
                  }}
                  onType={(t) => updateAnnotation(batch.id, board.id, version.id, a.id, { type: t })}
                  onNote={(note) => updateAnnotation(batch.id, board.id, version.id, a.id, { note })}
                  onDelete={() => {
                    removeAnnotation(batch.id, board.id, version.id, a.id);
                    if (selectedId === a.id) setSelectedId(null);
                    toast('已删除标注');
                  }}
                  onZoom={() => viewerRef.current?.zoomToRect(a)}
                  machineRef={version.defects.find((d) => d.id === a.defectId)?.componentRef}
                />
              ))}
              {voidAnnotations.length > 0 && (
                <div style={{ marginTop: 10 }}>
                  <div className="side-hd" style={{ padding: '4px 4px 6px', height: 'auto' }}>
                    <IconHistory size={10} /> 已作废 <span className="n">{voidAnnotations.length}</span>
                  </div>
                  {voidAnnotations.map((a) => (
                    <div key={a.id} className="ann-item voided" onClick={() => viewerRef.current?.zoomToRect(a)}>
                      <div className="hd">
                        <span className="type-dot" style={{ background: 'var(--muted)' }} />
                        <span style={{ fontSize: 11.5 }}>{DEFECT_META[a.type].label}</span>
                        <span className="voidtag" style={{ marginLeft: 'auto' }}>
                          作废
                        </span>
                      </div>
                      <div className="meta" style={{ fontFamily: 'var(--sans)' }}>
                        {a.voidReason}
                      </div>
                      <div className="meta mono">
                        {a.voidedAt ? fmtDateTime(a.voidedAt) : ''} · {a.voidedBy}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {!readOnly && (
            <div style={{ padding: 10, borderTop: '1px solid var(--line)', display: 'flex', gap: 6 }}>
              <button className="btn btn-sm" style={{ flex: 1 }} onClick={() => gotoBoard(-1)} title="上一块板">
                ← 上一块
              </button>
              <button className="btn btn-sm" style={{ flex: 1 }} onClick={() => gotoBoard(1)} title="下一块板">
                下一块 →
              </button>
            </div>
          )}
        </aside>
      </div>

      <div className="filmstrip">
        <span className="small dim" style={{ flex: 'none', marginRight: 4 }}>
          板
        </span>
        {batch.boards.map((b) => {
          const v = b.versions.find((x) => x.id === b.activeVersionId)!;
          const cnt = v.annotations.filter((a) => a.status === 'active').length;
          const isCur = b.id === board.id;
          const rv = b.reviewStatus === 'reviewed';
          return (
            <button
              key={b.id}
              className={`film ${isCur ? 'on' : ''} ${rv ? 'reviewed' : ''}`}
              onClick={() => navigate(`/batch/${batch.id}/board/${b.id}`)}
              title={`${b.boardNo} 号板 · ${rv ? (b.verdict?.verdict === 'pass' ? '通过' : '返修') : '待复判'} · ${cnt} 处标注`}
            >
              <span className="n" style={{ color: rv ? (b.verdict?.verdict === 'pass' ? 'var(--green)' : 'var(--red)') : 'var(--txt)' }}>
                {b.boardNo}
              </span>
              <span
                className="d"
                style={{
                  background: cnt === 0 ? 'rgba(255,255,255,.12)' : 'var(--amber)',
                  opacity: cnt === 0 ? 1 : Math.min(1, 0.35 + cnt * 0.14),
                }}
              />
            </button>
          );
        })}
      </div>

      {hoverMachine && !draftOpen && (
        <div
          className="tooltip"
          style={{
            left: Math.min(window.innerWidth - 260, hoverMachine.x + 16),
            top: Math.min(window.innerHeight - 120, hoverMachine.y + 16),
          }}
        >
          <div className="mono" style={{ fontWeight: 600, marginBottom: 3 }}>
            {hoverMachine.d.componentRef}
            <span className="dim" style={{ fontWeight: 400 }}>
              {' '}· 置信 {hoverMachine.d.confidence}
            </span>
          </div>
          <div className="small" style={{ color: 'var(--amber)' }}>
            检测机判：{DEFECT_META[hoverMachine.d.machineType ?? 'insufficient_solder'].label}
          </div>
          <div className="small dim" style={{ marginTop: 4, lineHeight: 1.5 }}>
            框内拖拽可创建标注；左侧「机器判点」可一键采信或判为误报。
          </div>
        </div>
      )}

      {showSubmit && (
        <SubmitModal
          batch={batch}
          board={board}
          verdict={verdict!}
          onClose={() => setShowSubmit(false)}
          onConfirm={() => {
            submitBoard(batch.id, board.id);
            setShowSubmit(false);
            toast(`已提交 · 判定「${verdict?.verdict === 'pass' ? '通过' : '返修'}」`);
            const pending = batch.boards.find((b) => b.id !== board.id && b.reviewStatus === 'pending');
            if (pending) navigate(`/batch/${batch.id}/board/${pending.id}`);
          }}
        />
      )}

      {showRescan && (
        <RescanModal
          board={board}
          version={version}
          onClose={() => setShowRescan(false)}
          onConfirm={(note) => {
            rescanBoard(batch.id, board.id, note);
            setShowRescan(false);
            toast('已换图，旧版标注已作废并留痕');
            const nb = useStore.getState().db.batches.find((b) => b.id === batch.id)?.boards.find((b) => b.id === board.id);
            if (nb) setVersionId(nb.activeVersionId);
            setSelectedId(null);
          }}
        />
      )}

      {showHistory && (
        <Modal
          title="作废标注留痕"
          desc={`${board.boardNo} 号板 · 换图后旧版标注全部作废，原始记录保留可追溯`}
          width={640}
          onClose={() => setShowHistory(false)}
          footer={
            <button className="btn" onClick={() => setShowHistory(false)}>
              关闭
            </button>
          }
        >
          {board.versions
            .filter((v) => v.id !== board.activeVersionId)
            .map((v) => (
              <div key={v.id} style={{ marginBottom: 14 }}>
                <div className="row" style={{ marginBottom: 6 }}>
                  <b>{v.label}</b>
                  <span className="tag">{fmtDateTime(v.createdAt)}</span>
                  <span className="small dim">{v.annotations.filter((a) => a.status === 'void').length} 处作废</span>
                </div>
                {v.annotations.map((a) => (
                  <div className="check-line" key={a.id} style={{ alignItems: 'flex-start' }}>
                    <span className="type-dot" style={{ background: 'var(--muted)', marginTop: 4 }} />
                    <div className="grow">
                      <div style={{ fontSize: 11.5 }}>
                        {DEFECT_META[a.type].label}
                        <span className="dim mono" style={{ marginLeft: 8, fontSize: 10 }}>
                          {Math.round(a.x)},{Math.round(a.y)} {Math.round(a.w)}×{Math.round(a.h)}
                        </span>
                      </div>
                      <div className="small dim" style={{ marginTop: 2 }}>
                        {a.voidReason} · {a.voidedBy} · {a.voidedAt ? fmtDateTime(a.voidedAt) : ''}
                      </div>
                      {a.note && <div className="small" style={{ marginTop: 2, color: 'var(--txt-2)' }}>{a.note}</div>}
                    </div>
                  </div>
                ))}
                {v.annotations.length === 0 && <div className="empty">该版本无标注</div>}
              </div>
            ))}
        </Modal>
      )}
    </div>
  );
}

function suggestType(defects: DefectRecord[], rect: Rect): DefectType | null {
  const hit = defects.find(
    (d) => d.machineJudged && d.x < rect.x + rect.w && d.x + d.w > rect.x && d.y < rect.y + rect.h && d.y + d.h > rect.y,
  );
  return (hit?.machineType as DefectType | undefined) ?? null;
}

function QuickPick({
  rect,
  suggestion,
  onPick,
  onCancel,
}: {
  rect: Rect;
  suggestion: DefectType | null;
  onPick: (t: DefectType) => void;
  onCancel: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const idx = Number(e.key);
      if (idx >= 1 && idx <= DEFECT_ORDER.length) onPick(DEFECT_ORDER[idx - 1]);
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onPick, onCancel]);

  return (
    <div className="quickpick" style={{ left: '50%', bottom: 56, transform: 'translateX(-50%)' }}>
      <div className="qp-hd">
        <span>选择缺陷类型</span>
        <span>
          {Math.round(rect.w)}×{Math.round(rect.h)} px
        </span>
      </div>
      <div className="qp-grid">
        {DEFECT_ORDER.map((t, i) => (
          <button
            key={t}
            className="qp-btn"
            onClick={() => onPick(t)}
            style={
              suggestion === t
                ? { borderColor: DEFECT_META[t].color, background: `${DEFECT_META[t].color}1f` }
                : undefined
            }
          >
            <span className="type-dot" style={{ background: DEFECT_META[t].color }} />
            {DEFECT_META[t].label}
            {suggestion === t && <span className="small dim">建议</span>}
            <span className="k">{i + 1}</span>
          </button>
        ))}
      </div>
      <div className="small dim" style={{ marginTop: 7, lineHeight: 1.5 }}>
        按 <kbd>1</kbd>–<kbd>5</kbd> 快速选择 · <kbd>Esc</kbd> 取消。框内若含机器判点会自动关联。
      </div>
    </div>
  );
}

function AnnotationItem({
  ann,
  index,
  selected,
  readOnly,
  machineRef,
  onSelect,
  onType,
  onNote,
  onDelete,
  onZoom,
}: {
  ann: Annotation;
  index: number;
  selected: boolean;
  readOnly: boolean;
  machineRef?: string;
  onSelect: () => void;
  onType: (t: DefectType) => void;
  onNote: (n: string) => void;
  onDelete: () => void;
  onZoom: () => void;
}) {
  const [editingNote, setEditingNote] = useState(false);
  const [note, setNote] = useState(ann.note);
  useEffect(() => setNote(ann.note), [ann.note]);
  const meta = DEFECT_META[ann.type];
  return (
    <div
      className={`ann-item ${selected ? 'on' : ''}`}
      onClick={onSelect}
      style={{ borderLeftColor: meta.color }}
    >
      <div className="hd">
        <span className="idx">{index}</span>
        <select
          value={ann.type}
          disabled={readOnly}
          onChange={(e) => onType(e.target.value as DefectType)}
          onClick={(e) => e.stopPropagation()}
          style={{ width: 'auto', color: meta.color }}
        >
          {DEFECT_ORDER.map((t) => (
            <option key={t} value={t}>
              {DEFECT_META[t].label}
            </option>
          ))}
        </select>
        {machineRef && (
          <span className="tag" title={`关联检测机判点 ${machineRef}`}>
            {machineRef}
          </span>
        )}
        <div className="grow" />
        <button
          className="icon-btn"
          style={{ width: 20, height: 20 }}
          onClick={(e) => {
            e.stopPropagation();
            onZoom();
          }}
          title="定位"
        >
          <IconTarget size={11} />
        </button>
        {!readOnly && (
          <button
            className="icon-btn"
            style={{ width: 20, height: 20 }}
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            title="删除标注"
          >
            <IconTrash size={11} />
          </button>
        )}
      </div>
      <div className="meta">
        <span>
          x{Math.round(ann.x)} y{Math.round(ann.y)}
        </span>
        <span>
          {Math.round(ann.w)}×{Math.round(ann.h)}
        </span>
        <span style={{ color: ann.defectId ? 'var(--txt-2)' : 'var(--blue)' }}>
          {ann.defectId ? '机器判点' : '人工发现'}
        </span>
      </div>
      {editingNote && !readOnly ? (
        <div onClick={(e) => e.stopPropagation()} style={{ marginTop: 6 }}>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{ minHeight: 52, fontSize: 11.5 }}
            placeholder="补充判定备注…"
          />
          <div className="row" style={{ gap: 4, marginTop: 4 }}>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => {
                onNote(note);
                setEditingNote(false);
              }}
            >
              保存
            </button>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => {
                setNote(ann.note);
                setEditingNote(false);
              }}
            >
              取消
            </button>
          </div>
        </div>
      ) : (
        <div
          className="small"
          style={{ marginTop: 5, color: ann.note ? 'var(--txt-2)' : 'var(--muted)', lineHeight: 1.5 }}
          onClick={(e) => {
            if (readOnly) return;
            e.stopPropagation();
            setEditingNote(true);
          }}
        >
          {ann.note || (readOnly ? '无备注' : '+ 添加备注')}
        </div>
      )}
    </div>
  );
}

function SubmitModal({
  batch,
  board,
  verdict,
  onClose,
  onConfirm,
}: {
  batch: Batch;
  board: Board;
  verdict: ReturnType<typeof evaluateVerdict>;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const version = board.versions.find((v) => v.id === board.activeVersionId)!;
  const machine = version.defects.filter((d) => d.machineJudged);
  const active = version.annotations.filter((a) => a.status === 'active');
  const handled = machine.filter((d) => active.some((a) => a.defectId === d.id));
  const unhandled = machine.length - handled.length;
  const manual = active.filter((a) => !a.defectId).length;
  const reviewedCount = batch.boards.filter((b) => b.reviewStatus === 'reviewed').length;
  const willFinish = reviewedCount + (board.reviewStatus === 'reviewed' ? 0 : 1);

  return (
    <Modal
      title="提交本板复判"
      desc={`${batch.code} · ${board.boardNo} 号板 · 图像 ${version.label}`}
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-ghost" onClick={onClose}>
            继续检查
          </button>
          <button className="btn btn-primary" onClick={onConfirm}>
            <IconCheck size={13} /> 确认提交
          </button>
        </>
      }
    >
      <div
        className="verdict-badge"
        style={{
          color: verdict.verdict === 'pass' ? 'var(--green)' : 'var(--red)',
          background: verdict.verdict === 'pass' ? 'var(--green-dim)' : 'var(--red-dim)',
          borderColor: verdict.verdict === 'pass' ? 'rgba(61,220,151,.4)' : 'rgba(255,107,94,.4)',
          marginBottom: 14,
        }}
      >
        {verdict.verdict === 'pass' ? <IconCheck size={15} /> : <IconWarn size={15} />}
        {verdict.verdict === 'pass' ? '本板判定通过' : '本板判定返修'}
        <span className="mono small" style={{ marginLeft: 'auto', opacity: 0.85 }}>
          {active.length} 处标注
        </span>
      </div>
      {verdict.reasons.map((r) => (
        <div className="check-line" key={r} style={{ borderColor: 'rgba(255,107,94,.3)' }}>
          <span style={{ color: 'var(--red)' }}>
            <IconWarn size={12} />
          </span>
          {r}
        </div>
      ))}
      {verdict.verdict === 'pass' && (
        <div className="check-line">
          <span style={{ color: 'var(--green)' }}>
            <IconCheck size={12} />
          </span>
          各类型缺陷数量均未超过阈值
        </div>
      )}
      <div className="hr" />
      <div className="check-line">
        <span className={unhandled === 0 ? 'ok' : 'bad'}>
          {unhandled === 0 ? <IconCheck size={12} /> : <IconWarn size={12} />}
        </span>
        {unhandled === 0
          ? `检测机 ${machine.length} 处判点已全部复判`
          : `还有 ${unhandled} 处机器判点未处理`}
      </div>
      <div className="check-line">
        <span style={{ color: 'var(--blue)' }}>
          <IconDraw size={12} />
        </span>
        人工复核补标 {manual} 处
        <span className="small dim" style={{ marginLeft: 'auto' }}>
          漏判需补标
        </span>
      </div>
      <div className="small dim" style={{ marginTop: 10, lineHeight: 1.6 }}>
        提交后判定结果写入批次；这是第 {willFinish}/{batch.boards.length} 块完成复判
        {willFinish === batch.boards.length ? '，全批完成后批次进入「待放行」，需品质主管抽检放行。' : '。'}
      </div>
    </Modal>
  );
}

function RescanModal({
  board,
  version,
  onClose,
  onConfirm,
}: {
  board: Board;
  version: ImageVersion;
  onClose: () => void;
  onConfirm: (note: string) => void;
}) {
  const [note, setNote] = useState('');
  const active = version.annotations.filter((a) => a.status === 'active').length;
  return (
    <Modal
      title="换用重扫图像"
      desc={`${board.boardNo} 号板 · 由 ${version.label} 切换到新的重扫图像`}
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-ghost" onClick={onClose}>
            取消
          </button>
          <button className="btn btn-amber" onClick={() => onConfirm(note)}>
            <IconSwap size={13} /> 确认换图
          </button>
        </>
      }
    >
      <div
        className="check-line"
        style={{ borderColor: 'rgba(255,200,87,.35)', background: 'rgba(255,200,87,.07)', alignItems: 'flex-start' }}
      >
        <span style={{ color: 'var(--amber)', marginTop: 1 }}>
          <IconWarn size={13} />
        </span>
        <div style={{ lineHeight: 1.6 }}>
          换图后本板 <b>{active}</b> 处旧标注将<b>全部作废</b>，作废原因、操作人、时间会写入审计留痕，
          原始标注记录保留可追溯。新版本从零开始标注，需重新提交复判。
        </div>
      </div>
      <Field label="换图原因" required hint="例如：首检图像反光导致误判，重扫后复核">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="填写换图原因，将随作废记录一并留痕…"
        />
      </Field>
      <div className="small dim">
        当前版本 {version.label}（{fmtTime(version.createdAt)} 生成）· 现有 {board.versions.length} 个版本
      </div>
    </Modal>
  );
}
