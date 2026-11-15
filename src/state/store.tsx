import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type {
  AppState,
  AuditEntry,
  CaseDoc,
  CaseStatus,
  Conventions,
  Justification,
  ReleaseResult,
  ReviewRecord,
  Role,
  SizingResult,
  ValveModel,
  Volume,
  VolumeMeta,
} from '../lib/types';
import { initialState } from '../data/seed';
import { loadVolume as loadVolumeDb, saveState, saveVolume as saveVolumeDb, estimateUsage } from '../data/storage';

interface Toast {
  id: number;
  text: string;
  tone: 'ok' | 'warn' | 'err';
}

interface Ctx {
  state: AppState;
  ready: boolean;
  volume: Volume | null;
  volumeLoading: boolean;
  volumeError: string | null;
  toasts: Toast[];
  storage: { usage: number; quota: number } | null;
  setRole: (role: Role) => void;
  toast: (text: string, tone?: Toast['tone']) => void;
  updateCase: (
    id: string,
    patch: Partial<CaseDoc> | ((c: CaseDoc) => Partial<CaseDoc>),
    audit?: { action: string; detail: string },
  ) => void;
  addAudit: (id: string, action: string, detail: string, by?: string, role?: Role) => void;
  createCase: (doc: CaseDoc) => void;
  setStatus: (id: string, status: CaseStatus, detail: string) => void;
  saveSizing: (id: string, sizing: SizingResult) => void;
  saveRelease: (id: string, release: ReleaseResult) => void;
  saveJustification: (id: string, j: Justification) => void;
  submitReview: (id: string) => void;
  reviewCase: (id: string, rec: ReviewRecord) => void;
  saveReport: (id: string, screenshot: string, summary: string) => void;
  updateConventions: (patch: Partial<Conventions>, by: string) => void;
  upsertValve: (v: ValveModel) => void;
  removeValve: (id: string) => void;
  loadCaseVolume: (id: string) => Promise<void>;
  importVolume: (vol: Volume, caseId?: string) => Promise<void>;
  attachVolumeToCase: (caseId: string, volumeRef: string) => void;
  refreshStorage: () => void;
  resetDemo: () => void;
}

const StoreContext = createContext<Ctx | null>(null);

const CURRENT_USER: Record<Role, string> = {
  physician: '李承泽',
  technologist: '周立群',
  director: '陈嘉禾',
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(() => initialState());
  const [ready, setReady] = useState(false);
  const [volume, setVolume] = useState<Volume | null>(null);
  const [volumeLoading, setVolumeLoading] = useState(false);
  const [volumeError, setVolumeError] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [storage, setStorage] = useState<{ usage: number; quota: number } | null>(null);
  const saveTimer = useRef<number | null>(null);
  const toastId = useRef(1);
  const booted = useRef(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { loadState } = await import('../data/storage');
      const saved = await loadState();
      if (cancelled) return;
      if (saved && saved.cases) {
        setState({ ...saved, role: 'physician' });
      }
      booted.current = true;
      setReady(true);
    })().catch(() => setReady(true));
    return () => {
      cancelled = true;
    };
  }, []);

  // debounced persistence
  useEffect(() => {
    if (!ready) return;
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      saveState(state)
        .then(() => {
          estimateUsage().then(setStorage);
        })
        .catch((e) => console.warn('保存失败', e));
    }, 450);
    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    };
  }, [state, ready]);

  const toast = useCallback((text: string, tone: Toast['tone'] = 'ok') => {
    const id = toastId.current++;
    setToasts((t) => [...t, { id, text, tone }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  }, []);

  const refreshStorage = useCallback(() => {
    estimateUsage().then(setStorage);
  }, []);

  const setRole = useCallback((role: Role) => setState((s) => ({ ...s, role })), []);

  const addAuditInternal = useCallback(
    (_c: CaseDoc, action: string, detail: string, by?: string, role?: Role): AuditEntry => ({
      at: Date.now(),
      by: by ?? CURRENT_USER[role ?? 'physician'],
      role: role ?? 'physician',
      action,
      detail,
    }),
    [],
  );

  const updateCase = useCallback<Ctx['updateCase']>(
    (id, patch, audit) => {
      setState((s) => ({
        ...s,
        cases: s.cases.map((c) => {
          if (c.id !== id) return c;
          const p = typeof patch === 'function' ? patch(c) : patch;
          const next: CaseDoc = { ...c, ...p, updatedAt: Date.now() };
          if (audit) next.audit = [...c.audit, { ...addAuditInternal(c, audit.action, audit.detail) }];
          return next;
        }),
      }));
    },
    [addAuditInternal],
  );

  const addAudit = useCallback<Ctx['addAudit']>(
    (id, action, detail, by, role) => {
      setState((s) => ({
        ...s,
        cases: s.cases.map((c) =>
          c.id === id ? { ...c, audit: [...c.audit, addAuditInternal(c, action, detail, by, role)] } : c,
        ),
      }));
    },
    [addAuditInternal],
  );

  const createCase = useCallback((doc: CaseDoc) => {
    setState((s) => ({ ...s, cases: [doc, ...s.cases] }));
  }, []);

  const setStatus = useCallback<Ctx['setStatus']>(
    (id, status, detail) => {
      setState((s) => ({
        ...s,
        cases: s.cases.map((c) =>
          c.id === id
            ? {
                ...c,
                status,
                updatedAt: Date.now(),
                audit: [...c.audit, { at: Date.now(), by: CURRENT_USER[s.role], role: s.role, action: `状态 → ${status}`, detail }],
              }
            : c,
        ),
      }));
    },
    [],
  );

  const saveSizing = useCallback<Ctx['saveSizing']>((id, sizing) => {
    setState((s) => ({
      ...s,
      cases: s.cases.map((c) => (c.id === id ? { ...c, sizing, updatedAt: Date.now() } : c)),
    }));
  }, []);

  const saveRelease = useCallback<Ctx['saveRelease']>((id, release) => {
    setState((s) => ({
      ...s,
      cases: s.cases.map((c) => (c.id === id ? { ...c, release, updatedAt: Date.now() } : c)),
    }));
  }, []);

  const saveJustification = useCallback<Ctx['saveJustification']>((id, j) => {
    setState((s) => ({
      ...s,
      cases: s.cases.map((c) =>
        c.id === id
          ? {
              ...c,
              justification: j,
              updatedAt: Date.now(),
              audit: [
                ...c.audit,
                {
                  at: Date.now(),
                  by: j.by,
                  role: s.role,
                  action: '填写偏离理由',
                  detail: `${j.nominalMm} mm · ${j.flags.join('、')} · ${j.text.slice(0, 40)}${j.text.length > 40 ? '…' : ''}`,
                },
              ],
            }
          : c,
      ),
    }));
  }, []);

  const submitReview = useCallback<Ctx['submitReview']>((id) => {
    setState((s) => ({
      ...s,
      cases: s.cases.map((c) =>
        c.id === id
          ? {
              ...c,
              status: '待审核',
              submittedAt: Date.now(),
              updatedAt: Date.now(),
              submissionCount: c.submissionCount + 1,
              audit: [
                ...c.audit,
                { at: Date.now(), by: CURRENT_USER[s.role], role: s.role, action: '提交审核', detail: '测量、型号与虚拟释放结果已提交主任审核' },
              ],
            }
          : c,
      ),
    }));
  }, []);

  const reviewCase = useCallback<Ctx['reviewCase']>((id, rec) => {
    setState((s) => ({
      ...s,
      cases: s.cases.map((c) => {
        if (c.id !== id) return c;
        const status: CaseStatus = rec.decision === '通过' ? '已通过' : '需复核';
        return {
          ...c,
          status,
          review: rec,
          updatedAt: Date.now(),
          returnCount: rec.decision === '退回' ? c.returnCount + 1 : c.returnCount,
          audit: [
            ...c.audit,
            {
              at: rec.at,
              by: rec.reviewer,
              role: 'director',
              action: rec.decision === '通过' ? '审核通过' : '退回重测',
              detail: rec.comment || (rec.reasonCodes.length ? rec.reasonCodes.join('、') : '无补充意见'),
            },
          ],
        };
      }),
    }));
  }, []);

  const saveReport = useCallback<Ctx['saveReport']>((id, screenshot, summary) => {
    setState((s) => ({
      ...s,
      cases: s.cases.map((c) =>
        c.id === id
          ? {
              ...c,
              report: { at: Date.now(), by: CURRENT_USER[s.role], screenshot, summary },
              audit: [
                ...c.audit,
                { at: Date.now(), by: CURRENT_USER[s.role], role: s.role, action: '生成术前讨论单', detail: '含三维截图与测量摘要' },
              ],
            }
          : c,
      ),
    }));
  }, []);

  const updateConventions = useCallback<Ctx['updateConventions']>((patch, by) => {
    setState((s) => ({ ...s, conventions: { ...s.conventions, ...patch, updatedAt: Date.now(), updatedBy: by } }));
  }, []);

  const upsertValve = useCallback<Ctx['upsertValve']>((v) => {
    setState((s) => {
      const exists = s.valves.some((x) => x.id === v.id);
      return { ...s, valves: exists ? s.valves.map((x) => (x.id === v.id ? v : x)) : [...s.valves, v] };
    });
  }, []);

  const removeValve = useCallback<Ctx['removeValve']>((id) => {
    setState((s) => ({ ...s, valves: s.valves.filter((v) => v.id !== id) }));
  }, []);

  const loadCaseVolume = useCallback<Ctx['loadCaseVolume']>(async (id) => {
    setVolumeLoading(true);
    setVolumeError(null);
    try {
      const vol = await loadVolumeDb(id);
      if (!vol) {
        setVolumeError(`未在本机找到序列 ${id},请重新导入 CT 序列。`);
        setVolume(null);
        return;
      }
      setVolume(vol);
    } catch (e) {
      setVolumeError(e instanceof Error ? e.message : String(e));
    } finally {
      setVolumeLoading(false);
    }
  }, []);

  const importVolume = useCallback<Ctx['importVolume']>(async (vol, caseId) => {
    // Phantom presets keep a stable id so seeded cases can reference them; a
    // DICOM import always gets its own series id.
    const stored: Volume = { ...vol };
    await saveVolumeDb(stored, stored.voxels);
    setVolume(stored);
    refreshStorage();
    if (caseId) {
      setState((s) => ({
        ...s,
        cases: s.cases.map((c) =>
          c.id === caseId
            ? {
                ...c,
                volumeRef: vol.id,
                volumeMeta: (({ id: _id, ...rest }) => rest)(vol),
                updatedAt: Date.now(),
                audit: [
                  ...c.audit,
                  {
                    at: Date.now(),
                    by: CURRENT_USER[s.role],
                    role: s.role,
                    action: '导入影像',
                    detail: `${vol.description} · ${vol.source === 'dicom' ? 'DICOM 序列' : '体模数据'}`,
                  },
                ],
              }
            : c,
        ),
      }));
    }
  }, [refreshStorage]);

  const attachVolumeToCase = useCallback<Ctx['attachVolumeToCase']>((caseId, volumeRef) => {
    setState((s) => ({
      ...s,
      cases: s.cases.map((c) => (c.id === caseId ? { ...c, volumeRef, updatedAt: Date.now() } : c)),
    }));
  }, []);

  const resetDemo = useCallback(() => {
    const fresh = initialState();
    setState({ ...fresh, role: 'physician' });
    toast('已恢复演示数据(影像文件保留在浏览器本地)', 'ok');
  }, [toast]);

  const value = useMemo<Ctx>(
    () => ({
      state,
      ready,
      volume,
      volumeLoading,
      volumeError,
      toasts,
      storage,
      setRole,
      toast,
      updateCase,
      addAudit,
      createCase,
      setStatus,
      saveSizing,
      saveRelease,
      saveJustification,
      submitReview,
      reviewCase,
      saveReport,
      updateConventions,
      upsertValve,
      removeValve,
      loadCaseVolume,
      importVolume,
      attachVolumeToCase,
      refreshStorage,
      resetDemo,
    }),
    [
      state,
      ready,
      volume,
      volumeLoading,
      volumeError,
      toasts,
      storage,
      setRole,
      toast,
      updateCase,
      addAudit,
      createCase,
      setStatus,
      saveSizing,
      saveRelease,
      saveJustification,
      submitReview,
      reviewCase,
      saveReport,
      updateConventions,
      upsertValve,
      removeValve,
      loadCaseVolume,
      importVolume,
      attachVolumeToCase,
      refreshStorage,
      resetDemo,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore 必须在 StoreProvider 内使用');
  return ctx;
}

export function useCurrentUser() {
  const { state } = useStore();
  return { name: CURRENT_USER[state.role], role: state.role };
}

export type { VolumeMeta };
