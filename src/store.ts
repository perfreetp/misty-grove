// ===== 全局 Store：多方案、审核流、持久化 =====
import { createStore, produce } from 'solid-js/store';
import type {
  Approach,
  Pier,
  PipelineZone,
  ReviewComment,
  ReviewRecord,
  Scheme,
} from './types';
import { calcMetrics, hasBlockingErrors, runChecks } from './lib/engine';
import { makeApproach, makePier, makeScheme, sampleSchemes, uid } from './lib/factory';

const STORAGE_KEY = 'footbridge-schemes-v1';

interface AppState {
  schemes: Scheme[];
  activeId: string;
  reviewer: string;
}

function load(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AppState;
      if (parsed.schemes?.length) return parsed;
    }
  } catch {
    /* 忽略损坏的本地数据 */
  }
  const schemes = sampleSchemes();
  return { schemes, activeId: schemes[0].id, reviewer: '张公路' };
}

const [state, setState] = createStore<AppState>(load());

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* 存储满或隐私模式 */
  }
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function update(id: string, fn: (s: Scheme) => void) {
  setState(
    'schemes',
    (s) => s.id === id,
    produce((s: Scheme) => fn(s)),
  );
  persist();
}

export function useStore() {
  const active = (): Scheme =>
    state.schemes.find((s) => s.id === state.activeId) ?? state.schemes[0];

  const issues = (s: Scheme) => runChecks(s);
  const metrics = (s: Scheme) => calcMetrics(s);
  const blocked = (s: Scheme) => hasBlockingErrors(runChecks(s));

  return {
    state,
    active,
    issues,
    metrics,
    blocked,

    selectScheme(id: string) {
      setState('activeId', id);
    },

    addScheme() {
      const s = makeScheme({ name: `方案 ${state.schemes.length + 1}` });
      setState('schemes', state.schemes.length, s);
      setState('activeId', s.id);
      persist();
    },

    duplicateScheme(id: string) {
      const src = state.schemes.find((s) => s.id === id);
      if (!src) return;
      const copy: Scheme = JSON.parse(JSON.stringify(src));
      copy.id = uid('sch');
      copy.name = `${src.name}（副本）`;
      copy.status = 'draft';
      copy.comments = [];
      copy.history = [];
      copy.approver = '';
      copy.approvalDate = '';
      copy.preferred = false;
      copy.piers = copy.piers.map((p) => ({ ...p, id: uid('pier') }));
      copy.approaches = copy.approaches.map((a) => ({ ...a, id: uid('ap') }));
      setState('schemes', state.schemes.length, copy);
      setState('activeId', copy.id);
      persist();
    },

    removeScheme(id: string) {
      const idx = state.schemes.findIndex((s) => s.id === id);
      if (idx < 0) return;
      setState(
        'schemes',
        produce((list: Scheme[]) => list.splice(idx, 1)),
      );
      if (state.activeId === id && state.schemes.length) {
        setState('activeId', state.schemes[0].id);
      }
      persist();
    },

    setReviewer(name: string) {
      setState('reviewer', name);
      persist();
    },

    patch<K extends keyof Scheme>(id: string, key: K, value: Scheme[K]) {
      update(id, (s) => {
        s[key] = value;
        // 关键几何变更后，已退回/已审定方案回到草稿，需重新走审核
        if (['submitted', 'approved'].includes(s.status)) s.status = 'draft';
      });
    },

    // —— 桥墩 ——
    addPier(id: string) {
      update(id, (s) => {
        s.piers.push(makePier(0, `桥墩 ${s.piers.length + 1}`));
        if (s.status !== 'draft') s.status = 'draft';
      });
    },
    updatePier(id: string, pierId: string, patch: Partial<Pier>) {
      update(id, (s) => {
        const p = s.piers.find((x) => x.id === pierId);
        if (p) Object.assign(p, patch);
      });
    },
    removePier(id: string, pierId: string) {
      update(id, (s) => {
        s.piers = s.piers.filter((p) => p.id !== pierId);
      });
    },

    // —— 接入设施 ——
    addApproach(id: string, type: Approach['type'], side: Approach['side']) {
      update(id, (s) => {
        const run = type === 'elevator' ? 0 : type === 'ramp' ? 56 : 22;
        s.approaches.push(makeApproach(type, side, run));
      });
    },
    updateApproach(id: string, apId: string, patch: Partial<Approach>) {
      update(id, (s) => {
        const a = s.approaches.find((x) => x.id === apId);
        if (a) Object.assign(a, patch);
      });
    },
    removeApproach(id: string, apId: string) {
      update(id, (s) => {
        s.approaches = s.approaches.filter((a) => a.id !== apId);
      });
    },

    // —— 管线 ——
    addPipeline(id: string) {
      update(id, (s) => {
        const z: PipelineZone = {
          id: uid('pipe'),
          name: `管线 ${s.pipelines.length + 1}`,
          xStart: -2,
          xEnd: 2,
        };
        s.pipelines.push(z);
      });
    },
    updatePipeline(id: string, pipeId: string, patch: Partial<PipelineZone>) {
      update(id, (s) => {
        const z = s.pipelines.find((x) => x.id === pipeId);
        if (z) Object.assign(z, patch);
      });
    },
    removePipeline(id: string, pipeId: string) {
      update(id, (s) => {
        s.pipelines = s.pipelines.filter((z) => z.id !== pipeId);
      });
    },

    // —— 审核流 ——
    submit(id: string): { ok: boolean; reason?: string } {
      const s = state.schemes.find((x) => x.id === id);
      if (!s) return { ok: false, reason: '方案不存在' };
      if (hasBlockingErrors(runChecks(s))) {
        return { ok: false, reason: '存在强制性校核错误（净空不足或墩位违规），禁止提交' };
      }
      const rec: ReviewRecord = {
        id: uid('rec'),
        date: today(),
        reviewer: state.reviewer,
        action: 'submit',
      };
      update(id, (x) => {
        x.status = 'submitted';
        x.history.push(rec);
      });
      return { ok: true };
    },

    returnScheme(id: string, text: string, componentId: string | null) {
      const rec: ReviewRecord = {
        id: uid('rec'),
        date: today(),
        reviewer: state.reviewer,
        action: 'return',
        comment: text,
      };
      const c: ReviewComment = {
        id: uid('cmt'),
        date: today(),
        reviewer: state.reviewer,
        text,
        componentId,
        resolved: false,
      };
      update(id, (s) => {
        s.status = 'returned';
        s.history.push(rec);
        s.comments.push(c);
      });
    },

    approve(id: string) {
      const rec: ReviewRecord = {
        id: uid('rec'),
        date: today(),
        reviewer: state.reviewer,
        action: 'approve',
      };
      update(id, (s) => {
        s.status = 'approved';
        s.approver = state.reviewer;
        s.approvalDate = today();
        s.history.push(rec);
        s.preferred = true;
        // 同批次其余方案取消选定
      });
      setState(
        'schemes',
        (x) => x.id !== id,
        produce((x: Scheme) => {
          x.preferred = false;
        }),
      );
      persist();
    },

    resolveComment(id: string, commentId: string) {
      update(id, (s) => {
        const c = s.comments.find((x) => x.id === commentId);
        if (c) c.resolved = true;
      });
    },

    togglePreferred(id: string) {
      const target = state.schemes.find((s) => s.id === id);
      if (!target) return;
      const on = !target.preferred;
      setState(
        'schemes',
        produce((list: Scheme[]) => {
          for (const s of list) s.preferred = s.id === id ? on : false;
        }),
      );
      persist();
    },
  };
}

export type Store = ReturnType<typeof useStore>;
