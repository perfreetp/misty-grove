import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Annotation,
  AuditEntry,
  Batch,
  Board,
  Database,
  DefectType,
  ImageVersion,
  Rect,
  Thresholds,
} from '../types';
import {
  createSeedDatabase,
  DEFAULT_THRESHOLDS,
  generateDefectRecords,
  isoAgo,
  PRODUCTS,
} from '../data/seed';
import { hashString, mulberry32, randInt } from '../lib/prng';
import { effectiveSampleRatio, evaluateVerdict, requiredSampleCount } from '../lib/verdict';
import { nowIso, uid } from '../lib/prng';

interface AddAnnotationPayload {
  batchId: string;
  boardId: string;
  versionId: string;
  rect: Rect;
  type: DefectType;
  note?: string;
  defectId?: string | null;
}

interface AppState {
  db: Database;
  setCurrentUser: (id: string) => void;
  addAnnotation: (p: AddAnnotationPayload) => string | null;
  updateAnnotation: (
    batchId: string,
    boardId: string,
    versionId: string,
    annotationId: string,
    patch: Partial<Pick<Annotation, 'type' | 'note' | 'x' | 'y' | 'w' | 'h'>>,
  ) => void;
  removeAnnotation: (batchId: string, boardId: string, versionId: string, annotationId: string) => void;
  startReview: (batchId: string, boardId: string) => void;
  submitBoard: (batchId: string, boardId: string) => void;
  reopenBoard: (batchId: string, boardId: string) => void;
  rescanBoard: (batchId: string, boardId: string, note: string) => void;
  toggleSample: (batchId: string, boardId: string) => void;
  markSampleAll: (batchId: string) => void;
  markSampleViewed: (batchId: string, boardId: string) => void;
  releaseBatch: (batchId: string, note: string) => { ok: boolean; message: string };
  returnBatch: (batchId: string, category: string, reason: string) => { ok: boolean; message: string };
  updateThresholds: (t: Partial<Thresholds>) => void;
  importBatch: (opts: { programId: string; shift: import('../types').Shift; boards: number }) => string;
  resetDemo: () => void;
}

const STORAGE_KEY = 'aoi-recheck-db-v2';

function actor(db: Database): string {
  return db.users.find((u) => u.id === db.currentUserId)?.name ?? '未知';
}

function entry(
  db: Database,
  action: string,
  detail: string,
  refs?: Partial<AuditEntry>,
): AuditEntry {
  return { id: uid('AU'), at: nowIso(), actorId: db.currentUserId, action, detail, ...refs };
}

function mapBatch(db: Database, batchId: string, fn: (b: Batch) => Batch): Database {
  return { ...db, batches: db.batches.map((b) => (b.id === batchId ? fn(b) : b)) };
}

function mapBoard(batch: Batch, boardId: string, fn: (b: Board) => Board): Batch {
  return { ...batch, boards: batch.boards.map((b) => (b.id === boardId ? fn(b) : b)) };
}

function mapVersion(board: Board, versionId: string, fn: (v: ImageVersion) => ImageVersion): Board {
  return { ...board, versions: board.versions.map((v) => (v.id === versionId ? fn(v) : v)) };
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      db: createSeedDatabase(),

      setCurrentUser: (id) =>
        set((s) => ({
          db: {
            ...s.db,
            currentUserId: id,
            audit: [
              entry(s.db, '切换身份', `当前操作人切换为 ${s.db.users.find((u) => u.id === id)?.name}`),
              ...s.db.audit,
            ],
          },
        })),

      addAnnotation: (p) => {
        const db = get().db;
        const batch = db.batches.find((b) => b.id === p.batchId);
        const board = batch?.boards.find((b) => b.id === p.boardId);
        const version = board?.versions.find((v) => v.id === p.versionId);
        if (!batch || !board || !version) return null;
        if (board.activeVersionId !== version.id) return null;
        if (batch.status === 'released') return null;
        const r = p.rect;
        if (r.w < 4 || r.h < 4) return null;
        const ann: Annotation = {
          id: uid('AN'),
          versionId: version.id,
          boardId: board.id,
          batchId: batch.id,
          type: p.type,
          note: p.note ?? '',
          defectId: p.defectId ?? null,
          status: 'active',
          createdAt: nowIso(),
          createdBy: actor(db),
          x: Math.round(r.x),
          y: Math.round(r.y),
          w: Math.round(r.w),
          h: Math.round(r.h),
        };
        set({
          db: {
            ...mapBatch(db, batch.id, (b) =>
              mapBoard(b, board.id, (bd) =>
                mapVersion(bd, version.id, (v) => ({ ...v, annotations: [...v.annotations, ann] })),
              ),
            ),
            audit: [
              entry(
                db,
                '新增标注',
                `${board.boardNo} 号板 · ${version.label} · 标注 ${
                  { insufficient_solder: '少锡', cold_joint: '虚焊', offset: '偏移', bridging: '连锡', false_call: '误报' }[ann.type]
                }${ann.defectId ? `（关联检测机记录 ${ann.defectId}）` : '（人工复核发现）'}`,
                { batchId: batch.id, boardId: board.id, versionId: version.id },
              ),
              ...db.audit,
            ],
          },
        });
        return ann.id;
      },

      updateAnnotation: (batchId, boardId, versionId, annotationId, patch) =>
        set((s) => ({
          db: mapBatch(s.db, batchId, (b) =>
            mapBoard(b, boardId, (bd) =>
              mapVersion(bd, versionId, (v) => ({
                ...v,
                annotations: v.annotations.map((a) =>
                  a.id === annotationId ? { ...a, ...patch, updatedAt: nowIso() } : a,
                ),
              })),
            ),
          ),
        })),

      removeAnnotation: (batchId, boardId, versionId, annotationId) =>
        set((s) => {
          const bd0 = s.db.batches
            .find((b) => b.id === batchId)
            ?.boards.find((b) => b.id === boardId);
          const ann = bd0?.versions
            .find((v) => v.id === versionId)
            ?.annotations.find((a) => a.id === annotationId);
          if (!ann || ann.status === 'void') return {};
          return {
            db: {
              ...mapBatch(s.db, batchId, (b) =>
                mapBoard(b, boardId, (bd) =>
                  mapVersion(bd, versionId, (v) => ({
                    ...v,
                    annotations: v.annotations.filter((a) => a.id !== annotationId),
                  })),
                ),
              ),
              audit: [
                entry(s.db, '删除标注', `${bd0?.boardNo} 号板 · 删除 1 处标注（${ann.type}）`, {
                  batchId,
                  boardId,
                  versionId,
                }),
                ...s.db.audit,
              ],
            },
          };
        }),

      startReview: (batchId, boardId) =>
        set((s) => {
          const db = s.db;
          const batch = db.batches.find((b) => b.id === batchId);
          const board = batch?.boards.find((b) => b.id === boardId);
          if (!batch || !board || batch.status !== 'pending') return {};
          return {
            db: {
              ...mapBatch(db, batchId, (b) => ({ ...b, status: 'reviewing' as const })),
              audit: [
                entry(db, '开始复判', `${batch.code} 由 ${actor(db)} 接单复判（${board.boardNo} 号板）`, {
                  batchId,
                  boardId,
                }),
                ...db.audit,
              ],
            },
          };
        }),

      submitBoard: (batchId, boardId) =>
        set((s) => {
          const db = s.db;
          const batch = db.batches.find((b) => b.id === batchId);
          const board = batch?.boards.find((b) => b.id === boardId);
          if (!batch || !board || batch.status === 'released') return {};
          const version = board.versions.find((v) => v.id === board.activeVersionId);
          if (!version) return {};
          const res = evaluateVerdict(version.annotations, db.thresholds);
          const who = actor(db);
          const now = nowIso();
          const next = mapBatch(db, batchId, (b) => {
            const boards = b.boards.map((bd) =>
              bd.id === boardId
                ? {
                    ...bd,
                    reviewStatus: 'reviewed' as const,
                    reviewedBy: who,
                    reviewedAt: now,
                    submitTimes: bd.submitTimes + 1,
                    verdict: {
                      verdict: res.verdict,
                      counts: res.counts,
                      reasons: res.reasons,
                      at: now,
                      by: who,
                    },
                  }
                : bd,
            );
            const allReviewed = boards.every((bd) => bd.reviewStatus === 'reviewed');
            const status: Batch['status'] =
              b.status === 'released'
                ? 'released'
                : allReviewed
                  ? 'awaiting_release'
                  : b.status === 'pending'
                    ? 'reviewing'
                    : b.status;
            return {
              ...b,
              boards,
              status,
              submittedAt:
                status === 'awaiting_release' && b.status !== 'awaiting_release' ? now : b.submittedAt,
              submittedBy:
                status === 'awaiting_release' && b.status !== 'awaiting_release'
                  ? who
                  : b.submittedBy,
            };
          });
          const after = next.batches.find((b) => b.id === batchId)!;
          const entries: AuditEntry[] = [
            entry(
              db,
              '提交单板复判',
              `${board.boardNo} 号板判定「${res.verdict === 'pass' ? '通过' : '返修'}」${
                res.reasons.length ? ` · ${res.reasons.join('；')}` : ' · 未超阈值'
              }`,
              { batchId, boardId, versionId: version.id },
            ),
          ];
          if (after.status === 'awaiting_release' && batch.status === 'reviewing') {
            entries.unshift(
              entry(db, '批次转待放行', `${after.code} 全批 ${after.boards.length} 块板复判完成，等待品质主管放行`, {
                batchId,
              }),
            );
          }
          return { db: { ...next, audit: [...entries, ...db.audit] } };
        }),

      reopenBoard: (batchId, boardId) =>
        set((s) => {
          const db = s.db;
          const batch = db.batches.find((b) => b.id === batchId);
          if (!batch || batch.status === 'released') return {};
          return {
            db: {
              ...mapBatch(db, batchId, (b) => ({
                ...mapBoard(b, boardId, (bd) => ({ ...bd, reviewStatus: 'pending' as const })),
                status: b.status === 'awaiting_release' ? 'reviewing' : b.status,
                submittedAt: undefined,
                submittedBy: undefined,
              })),
              audit: [
                entry(db, '撤回单板复判', `${batch.code} 单板重新打开复判，批次回到复判中`, { batchId, boardId }),
                ...db.audit,
              ],
            },
          };
        }),

      rescanBoard: (batchId, boardId, note) =>
        set((s) => {
          const db = s.db;
          const batch = db.batches.find((b) => b.id === batchId);
          const board = batch?.boards.find((b) => b.id === boardId);
          if (!batch || !board || batch.status === 'released') return {};
          const cur = board.versions.find((v) => v.id === board.activeVersionId)!;
          const who = actor(db);
          const now = nowIso();
          const nextSeq = Math.max(...board.versions.map((v) => v.seq)) + 1;
          const newVersion: ImageVersion = {
            id: `${board.id}-V${nextSeq}`,
            seq: nextSeq,
            label: `重扫图像 V${nextSeq}`,
            kind: 'rescan',
            createdAt: now,
            createdBy: who,
            layoutSeed: cur.layoutSeed,
            renderSeed: cur.renderSeed + 977 * (nextSeq - 1),
            exposure: -0.01 + 0.025 * (nextSeq % 3),
            width: cur.width,
            height: cur.height,
            defects: cur.defects.map((d, i) => ({ ...d, id: `${d.id}-V${nextSeq}-${i}` })),
            annotations: [],
          };
          const reason = note.trim() || `切换至 ${newVersion.label}，旧版标注随图像版本作废`;
          const voided = cur.annotations.filter((a) => a.status === 'active');
          const voidedMap = new Map(
            voided.map((a) => [
              a.id,
              { ...a, status: 'void' as const, voidedAt: now, voidedBy: who, voidReason: reason },
            ]),
          );
          return {
            db: {
              ...mapBatch(db, batchId, (b) => ({
                ...mapBoard(b, boardId, (bd) => ({
                  ...bd,
                  versions: [
                    ...bd.versions.map((v) =>
                      v.id === cur.id
                        ? { ...v, annotations: v.annotations.map((a) => voidedMap.get(a.id) ?? a) }
                        : v,
                    ),
                    newVersion,
                  ],
                  activeVersionId: newVersion.id,
                  reviewStatus: 'pending' as const,
                  verdict: undefined,
                  reviewedAt: undefined,
                  reviewedBy: undefined,
                })),
                status: b.status === 'awaiting_release' ? ('reviewing' as const) : b.status,
                submittedAt: b.status === 'awaiting_release' ? undefined : b.submittedAt,
                submittedBy: b.status === 'awaiting_release' ? undefined : b.submittedBy,
              })),
              audit: [
                entry(
                  db,
                  '换图并作废旧标注',
                  `${board.boardNo} 号板 · ${cur.label} → ${newVersion.label} · 作废 ${voided.length} 处旧标注 · 原因：${reason}`,
                  { batchId, boardId, versionId: newVersion.id },
                ),
                ...db.audit,
              ],
            },
          };
        }),

      toggleSample: (batchId, boardId) =>
        set((s) => {
          const db = s.db;
          const batch = db.batches.find((b) => b.id === batchId);
          if (!batch) return {};
          if (batch.status === 'released') return {};
          const exists = batch.sampling.some((x) => x.boardId === boardId);
          const who = actor(db);
          return {
            db: {
              ...mapBatch(db, batchId, (b) => ({
                ...b,
                sampling: exists
                  ? b.sampling.filter((x) => x.boardId !== boardId)
                  : [...b.sampling, { boardId, by: who, at: nowIso() }],
              })),
              audit: [
                entry(db, exists ? '取消抽检' : '标记抽检', `${batch.code} ${exists ? '取消' : '新增'} 1 块抽检板`, {
                  batchId,
                  boardId,
                }),
                ...db.audit,
              ],
            },
          };
        }),

      markSampleAll: (batchId) =>
        set((s) => {
          const db = s.db;
          const batch = db.batches.find((b) => b.id === batchId);
          if (!batch) return {};
          if (batch.status === 'released') return {};
          const who = actor(db);
          const need = requiredSampleCount(batch.boards.length, db.thresholds);
          const reviewed = batch.boards.filter((b) => b.reviewStatus === 'reviewed');
          const existing = new Set(batch.sampling.map((x) => x.boardId));
          const additions: Batch['sampling'] = [];
          for (const b of reviewed) {
            if (batch.sampling.length + additions.length >= need) break;
            if (existing.has(b.id)) continue;
            additions.push({ boardId: b.id, by: who, at: nowIso(), note: '按抽检比例一键补齐' });
          }
          return {
            db: {
              ...mapBatch(db, batchId, (b) => ({ ...b, sampling: [...b.sampling, ...additions] })),
              audit: [
                entry(db, '补齐抽检样本', `${batch.code} 新增 ${additions.length} 块抽检板`, { batchId }),
                ...db.audit,
              ],
            },
          };
        }),

      markSampleViewed: (batchId, boardId) =>
        set((s) => {
          const db = s.db;
          const target = db.batches.find((b) => b.id === batchId);
          if (!target || target.status === 'released') return {};
          const rec = target.sampling.find((x) => x.boardId === boardId);
          if (!rec || rec.viewedAt) return {};
          return {
            db: mapBatch(db, batchId, (b) => ({
              ...b,
              sampling: b.sampling.map((x) =>
                x.boardId === boardId ? { ...x, viewedAt: nowIso() } : x,
              ),
            })),
          };
        }),

      releaseBatch: (batchId, note) => {
        const { db } = get();
        const batch = db.batches.find((b) => b.id === batchId);
        const user = db.users.find((u) => u.id === db.currentUserId)!;
        if (!batch) return { ok: false, message: '批次不存在' };
        if (user.role !== 'supervisor') return { ok: false, message: '仅品质主管可执行放行' };
        if (batch.status !== 'awaiting_release') return { ok: false, message: '当前批次不在「待放行」状态' };
        if (batch.boards.some((b) => b.reviewStatus !== 'reviewed'))
          return { ok: false, message: '仍有单板未完成复判' };
        const need = requiredSampleCount(batch.boards.length, db.thresholds);
        if (batch.sampling.length < need)
          return {
            ok: false,
            message: `抽检样本不足：需 ≥ ${need} 块（${(effectiveSampleRatio(db.thresholds) * 100).toFixed(0)}%），当前 ${batch.sampling.length} 块`,
          };
        const unviewed = batch.sampling.filter((x) => !x.viewedAt);
        if (unviewed.length > 0)
          return {
            ok: false,
            message: `还有 ${unviewed.length} 块抽检样本未实际查看图像，请先逐块检视`,
          };
        if (!note.trim()) return { ok: false, message: '放行意见必填' };
        const coverage = (batch.sampling.length / batch.boards.length) * 100;
        const now = nowIso();
        set((s) => ({
          db: {
            ...mapBatch(s.db, batchId, (b) => ({
              ...b,
              status: 'released' as const,
              released: {
                by: user.name,
                at: now,
                note: note.trim(),
                coveragePct: coverage,
                sampledBoardIds: b.sampling.map((x) => x.boardId),
              },
            })),
            audit: [
              entry(s.db, '批次放行', `${batch.code} 由 ${user.name} 放行 · 抽检覆盖 ${coverage.toFixed(1)}%（${batch.sampling.length}/${batch.boards.length}）`, {
                batchId,
              }),
              ...s.db.audit,
            ],
          },
        }));
        return { ok: true, message: `已放行，抽检覆盖 ${coverage.toFixed(1)}%` };
      },

      returnBatch: (batchId, category, reason) => {
        const { db } = get();
        const batch = db.batches.find((b) => b.id === batchId);
        const user = db.users.find((u) => u.id === db.currentUserId)!;
        if (!batch) return { ok: false, message: '批次不存在' };
        if (user.role !== 'supervisor') return { ok: false, message: '仅品质主管可执行退回' };
        if (batch.status !== 'awaiting_release') return { ok: false, message: '仅「待放行」批次可退回' };
        if (!category) return { ok: false, message: '请选择退回分类' };
        if (reason.trim().length < 8) return { ok: false, message: '退回原因必填，且不少于 8 个字' };
        const now = nowIso();
        set((s) => ({
          db: {
            ...mapBatch(s.db, batchId, (b) => ({
              ...b,
              status: 'reviewing' as const,
              submittedAt: undefined,
              submittedBy: undefined,
              sampling: [],
              returns: [
                ...b.returns,
                { id: uid('RET'), by: user.name, at: now, category, reason: reason.trim() },
              ],
              boards: b.boards.map((bd) => ({
                ...bd,
                reviewStatus: 'pending' as const,
                verdict: undefined,
              })),
            })),
            audit: [
              entry(s.db, '批次退回', `${batch.code} 由 ${user.name} 退回 · 分类「${category}」 · 原因：${reason.trim()}`, {
                batchId,
              }),
              ...s.db.audit,
            ],
          },
        }));
        return { ok: true, message: '已退回，批次回到复判中' };
      },

      updateThresholds: (t) =>
        set((s) => ({
          db: {
            ...s.db,
            thresholds: { ...s.db.thresholds, ...t },
            audit: [
              entry(
                s.db,
                '修改判定规则',
                Object.entries(t)
                  .map(([k, v]) => `${k} → ${v}`)
                  .join('，'),
              ),
              ...s.db.audit,
            ],
          },
        })),

      importBatch: ({ programId, shift, boards }) => {
        const db = get().db;
        const program = db.programs.find((p) => p.id === programId)!;
        const seq = 119 + db.batches.length;
        const code = `B-2611-${seq}`;
        const batchId = `BAT-${code}`;
        const layoutSeed = hashString(`${code}-layout`);
        const now = nowIso();
        const newBoards = Array.from({ length: boards }, (_, i) => {
          const boardNo = String(i + 1).padStart(2, '0');
          const boardId = `${code}-${boardNo}`;
          const seed = hashString(boardId);
          const rng = mulberry32(seed);
          const calls =
            programId === 'PRG-F1' ? randInt(rng, 3, 6) : programId === 'PRG-B1' ? randInt(rng, 2, 5) : randInt(rng, 1, 4);
          const defects = generateDefectRecords({
            seed,
            layoutSeed,
            falseCallBias: programId === 'PRG-F1' ? 0.3 : programId === 'PRG-B1' ? 0.2 : 0.1,
            missBias: 0.1,
            count: calls,
            idPrefix: `${boardNo}C`,
          });
          const v1: ImageVersion = {
            id: `${boardId}-V1`,
            seq: 1,
            label: '首检图像 V1',
            kind: 'import',
            createdAt: now,
            createdBy: 'AOI 检测机',
            layoutSeed,
            renderSeed: seed,
            exposure: ((seed % 5) - 2) * 0.02,
            width: 2000,
            height: 1400,
            defects,
            annotations: [],
          };
          return {
            id: boardId,
            batchId,
            boardNo,
            activeVersionId: v1.id,
            versions: [v1],
            reviewStatus: 'pending' as const,
            submitTimes: 0,
          };
        });
        const batch: Batch = {
          id: batchId,
          code,
          product: PRODUCTS[programId] ?? '未命名产品',
          programId,
          machineId: program.machineId,
          line: program.line,
          shift,
          importedAt: now,
          importedBy: 'AOI 检测机',
          status: 'pending',
          boards: newBoards,
          sampling: [],
          returns: [],
          notes: '检测机自动上传，等待分配复判',
        };
        set((s) => ({
          db: {
            ...s.db,
            batches: [batch, ...s.db.batches],
            audit: [
              entry(s.db, '批次导入', `${code} 导入 ${boards} 块板 · 检测程式 ${program.code} · ${shift} · 共 ${newBoards.reduce((a, b) => a + b.versions[0].defects.filter((d) => d.machineJudged).length, 0)} 条缺陷记录`, {
                batchId,
              }),
              ...s.db.audit,
            ],
          },
        }));
        return batchId;
      },

      resetDemo: () =>
        set(() => ({
          db: {
            ...createSeedDatabase(),
            thresholds: { ...DEFAULT_THRESHOLDS },
            audit: [
              { id: uid('AU'), at: nowIso(), actorId: 'system', action: '重置演示数据', detail: '恢复初始批次、标注与规则' },
            ],
          },
        })),
    }),
    {
      name: STORAGE_KEY,
      version: 2,
      partialize: (s) => ({ db: s.db }),
    },
  ),
);

export function useCurrentUser() {
  return useStore((s) => s.db.users.find((u) => u.id === s.db.currentUserId)!);
}

export function useBatch(batchId?: string) {
  return useStore((s) => s.db.batches.find((b) => b.id === batchId));
}
