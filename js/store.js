/* BoardDocs Studio — 数据与工作流 */
import { U } from './util.js';

const KEY = 'boarddocs.studio.v1';
const DAY = 86400000;
const HOUR = 3600000;

export const GROUPS = [
  { id: 'power', label: '电源', color: '#e8b45a' },
  { id: 'gpio', label: 'GPIO', color: '#4fd6c0' },
  { id: 'comm', label: '通信', color: '#5aa9f5' },
  { id: 'analog', label: '模拟', color: '#a48cf0' },
  { id: 'usb', label: 'USB', color: '#5fd68a' },
  { id: 'debug', label: '调试', color: '#ef8a8a' },
  { id: 'boot', label: '启动', color: '#f0a35e' },
  { id: 'display', label: '显示', color: '#7ed0e8' },
];
export const GROUP_MAP = Object.fromEntries(GROUPS.map((g) => [g.id, g]));

export const LAYER_KINDS = {
  shell: { label: '外壳', color: '#9fb3c4', thickness: 1.5 },
  pcb: { label: '主板', color: '#2f7a5c', thickness: 0.3 },
  shield: { label: '屏蔽罩', color: '#b9c6cf', thickness: 0.5 },
  connector: { label: '接口', color: '#c9a24a', thickness: 0.6 },
  display: { label: '显示模块', color: '#2b3a4a', thickness: 0.22 },
  battery: { label: '电池', color: '#5a6b7a', thickness: 0.55 },
  custom: { label: '零件', color: '#6f8294', thickness: 0.4 },
};

export const USERS = [
  { id: 'u_li', name: '李工', role: '编辑', initials: '李' },
  { id: 'u_wang', name: '王敏', role: '评审员', initials: '王' },
  { id: 'u_chen', name: '陈可', role: '评审主管', initials: '陈' },
];

const S = (window.BD = window.BD || {});
export const store = (S.store = {});

let state = null;
let listeners = [];

/* ============================================================
   基础
   ============================================================ */
const persist = U.debounce(() => {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('persist failed', e);
  }
}, 220);

store.emit = (reason) => {
  listeners.forEach((fn) => {
    try {
      fn(reason);
    } catch (e) {
      console.error(e);
    }
  });
};
store.subscribe = (fn) => {
  listeners.push(fn);
  return () => (listeners = listeners.filter((f) => f !== fn));
};
store.touch = (reason) => {
  if (state) state.updatedAt = Date.now();
  persist();
  store.emit(reason || 'changed');
};

store.now = () => Date.now();
store.users = () => USERS;
store.currentUser = () => USERS.find((u) => u.id === state.currentUserId) || USERS[0];
store.setUser = (id) => {
  if (!USERS.some((u) => u.id === id)) return;
  state.currentUserId = id;
  store.touch('user');
};
store.canReview = () => ['评审员', '评审主管'].includes(store.currentUser().role);

store.boards = () => state.boards;
store.board = (id) => state.boards.find((b) => b.id === id) || null;

store.load = function () {
  let raw = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch (e) {
    raw = null;
  }
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.boards) && parsed.boards.length) {
        state = parsed;
        if (!USERS.some((u) => u.id === state.currentUserId)) state.currentUserId = 'u_li';
        return state;
      }
    } catch (e) {
      console.warn('bad saved data', e);
    }
  }
  state = seed();
  persist();
  return state;
};
store.resetDemo = function () {
  state = seed();
  persist();
  store.emit('reset');
};
store.raw = () => U.clone(state);
store.importState = function (parsed) {
  if (!parsed || !Array.isArray(parsed.boards) || !parsed.boards.length) throw new Error('缺少 boards 数据');
  state = parsed;
  if (!USERS.some((u) => u.id === state.currentUserId)) state.currentUserId = 'u_li';
  state.boards.forEach((b) => {
    b.reviews = b.reviews || [];
    b.versions = b.versions || [];
    if (!b.work && !b.versions.length) {
      b.work = null;
    }
  });
  persist();
  store.emit('import');
};
/* ============================================================
   冲突 / 检查
   ============================================================ */
export function pinConflicts(pin) {
  if (!pin || !Array.isArray(pin.funcs)) return [];
  const groups = new Map();
  pin.funcs.forEach((f) => {
    const key = String(f.label || '').trim().toLowerCase();
    if (!key) return;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(f);
  });
  const out = [];
  for (const [key, arr] of groups) {
    if (arr.length > 1) out.push({ key, name: arr[0].label, funcIds: arr.map((f) => f.id), count: arr.length });
  }
  return out;
}
export function findConflicts(content) {
  const out = [];
  for (const pin of content.pins || []) {
    for (const c of pinConflicts(pin)) out.push({ pinId: pin.id, pinName: pin.name, ...c });
  }
  return out;
}
export function conflictPinSet(content) {
  return new Set(findConflicts(content).map((c) => c.pinId));
}
export function pinAnnotation(pin) {
  return {
    named: !!String(pin.name || '').trim(),
    voltage: !!String(pin.voltage || '').trim(),
    funcs: (pin.funcs || []).filter((f) => String(f.label || '').trim()).length > 0,
    get complete() {
      return this.named && this.voltage && this.funcs;
    },
  };
}
export function unlabeledVoltagePins(content) {
  return (content.pins || []).filter((p) => !String(p.voltage || '').trim());
}

export function boardStats(board) {
  const content = store.workingContent(board) || board.versions?.[board.versions.length - 1]?.content || { pins: [], steps: [], layers: [] };
  const pins = content.pins || [];
  const annotated = pins.filter((p) => pinAnnotation(p).complete).length;
  const voltage = pins.filter((p) => String(p.voltage || '').trim()).length;
  const conflicts = findConflicts(content);
  const reviews = (board.reviews || []).filter((r) => r.status !== 'in_review');
  const durations = reviews.map((r) => (r.decidedAt || 0) - (r.submittedAt || 0)).filter((d) => d > 0);
  const avgReview = durations.length ? durations.reduce((a, b) => a + b, 0) / durations.length : null;
  const lastReview = reviews[reviews.length - 1] || null;
  return {
    pinCount: pins.length,
    annotated,
    annotatedRatio: pins.length ? annotated / pins.length : 0,
    voltageCount: voltage,
    voltageRatio: pins.length ? voltage / pins.length : 0,
    conflictCount: conflicts.length,
    layerCount: (content.layers || []).length,
    stepCount: (content.steps || []).length,
    reviewCount: reviews.length,
    avgReview,
    lastReview,
    reviewDurations: durations,
    versionCount: (board.versions || []).length,
    pins,
    content,
  };
}

export function publishChecks(board, content) {
  const blockers = [];
  const warnings = [];
  const pins = content.pins || [];
  unlabeledVoltagePins(content).forEach((p) => {
    blockers.push({
      kind: 'voltage',
      targetType: 'pin',
      targetId: p.id,
      title: `引脚 ${p.name || '(未命名)'} 未标注电压`,
      detail: '发布检查要求每个引脚都填写电压，未标注电压属于阻断项。',
    });
  });
  findConflicts(content).forEach((c) => {
    warnings.push({
      kind: 'conflict',
      targetType: 'pin',
      targetId: c.pinId,
      title: `引脚 ${c.pinName} 功能「${c.name}」重复占用 ${c.count} 次`,
      detail: '同一引脚上同一功能只能出现一次，请在复用功能表中去重。',
    });
  });
  pins.forEach((p) => {
    if (!(p.funcs || []).some((f) => String(f.label || '').trim())) {
      warnings.push({
        kind: 'nofunc',
        targetType: 'pin',
        targetId: p.id,
        title: `引脚 ${p.name || '(未命名)'} 没有复用功能`,
        detail: '建议至少填写一个复用功能，方便售后检索。',
      });
    }
  });
  (content.steps || []).forEach((st, i) => {
    if (!st.layerIds || !st.layerIds.length) {
      warnings.push({
        kind: 'step',
        targetType: 'step',
        targetId: st.id,
        title: `第 ${i + 1} 步「${st.title}」未指定零件`,
        detail: '装配步骤需要指定要安装或拆卸的图层。',
      });
    }
  });
  if (!(content.steps || []).length) {
    warnings.push({ kind: 'nosteps', title: '尚未编排装配步骤', detail: '导出给课程组前建议补齐分步说明。' });
  }
  return { blockers, warnings, ok: blockers.length === 0 };
}

/* ============================================================
   工作副本 / 权限
   ============================================================ */
store.workingContent = function (board) {
  return board && board.work ? board.work.content : null;
};
store.draft = function (board) {
  return board ? board.work : null;
};
store.canEdit = function (board) {
  if (!board || !board.work) return false;
  const st = board.work.status;
  return st === 'draft' || st === 'rejected';
};
store.latestVersion = function (board) {
  if (!board || !board.versions?.length) return null;
  return board.versions[board.versions.length - 1];
};
store.contentFor = function (board) {
  if (board.work) return board.work.content;
  return store.latestVersion(board)?.content || { layers: [], pins: [], steps: [] };
};
store.reviewFor = function (board) {
  if (!board || !board.work) return null;
  return (board.reviews || []).find((r) => r.id === board.work.reviewId) || null;
};
store.openReviews = function () {
  return state.boards
    .filter((b) => b.work && b.work.status === 'in_review')
    .map((b) => ({ board: b, review: store.reviewFor(b) }))
    .filter((x) => x.review);
};
store.allReviews = function () {
  const out = [];
  state.boards.forEach((b) => (b.reviews || []).forEach((r) => out.push({ board: b, review: r })));
  return out.sort((a, b) => (b.review.submittedAt || 0) - (a.review.submittedAt || 0));
};

/* ============================================================
   编辑操作
   ============================================================ */
function editable(board) {
  if (!store.canEdit(board)) {
    U.toast('当前草稿不可编辑：' + statusText(board), 'warn');
    return null;
  }
  return board.work.content;
}
store.editable = (board) => (store.canEdit(board) ? board.work.content : null);

export function statusText(board) {
  if (!board.work) {
    if (board.versions?.length) return `已发布 ${board.versions[board.versions.length - 1].label}`;
    return '无草稿';
  }
  return (
    {
      draft: '编辑中',
      in_review: '待审核',
      rejected: '已退回',
      approved: '已通过，待发布',
    }[board.work.status] || board.work.status
  );
}

store.mutate = function (board, fn, reason) {
  const c = editable(board);
  if (!c) return false;
  fn(c, board);
  board.work.updatedAt = Date.now();
  store.touch(reason || 'edit');
  return true;
};

store.addLayer = function (board, kind, name) {
  const k = LAYER_KINDS[kind] || LAYER_KINDS.custom;
  let created = null;
  const ok = store.mutate(board, (c) => {
    created = {
      id: U.uid('ly'),
      name: name || k.label + ' ' + (c.layers.length + 1),
      kind,
      color: k.color,
      visible: true,
      offsetX: 0,
      offsetZ: 0,
      scale: 1,
    };
    c.layers.push(created);
  });
  if (!ok) return null;
  store.emit('layer-add');
  return created;
};
store.updateLayer = function (board, layerId, patch) {
  store.mutate(board, (c) => {
    const l = c.layers.find((x) => x.id === layerId);
    if (l) Object.assign(l, patch);
  });
};
store.removeLayer = function (board, layerId) {
  store.mutate(board, (c) => {
    c.layers = c.layers.filter((l) => l.id !== layerId);
    c.pins.forEach((p) => {
      if (p.layerId === layerId) p.layerId = c.layers[0]?.id || null;
    });
    c.steps.forEach((s) => (s.layerIds = (s.layerIds || []).filter((id) => id !== layerId)));
  });
};
store.moveLayer = function (board, layerId, dir) {
  store.mutate(board, (c) => {
    const i = c.layers.findIndex((l) => l.id === layerId);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= c.layers.length) return;
    [c.layers[i], c.layers[j]] = [c.layers[j], c.layers[i]];
  });
};
store.reorderLayer = function (board, srcId, targetId, after) {
  store.mutate(board, (c) => {
    const from = c.layers.findIndex((l) => l.id === srcId);
    if (from < 0) return;
    const [item] = c.layers.splice(from, 1);
    let to = c.layers.findIndex((l) => l.id === targetId);
    if (to < 0) to = c.layers.length - 1;
    c.layers.splice(after ? to + 1 : to, 0, item);
  });
};
store.reorderStep = function (board, srcId, targetId) {
  store.mutate(board, (c) => {
    const from = c.steps.findIndex((s) => s.id === srcId);
    const to = c.steps.findIndex((s) => s.id === targetId);
    if (from < 0 || to < 0) return;
    const [item] = c.steps.splice(from, 1);
    c.steps.splice(to, 0, item);
  });
};


/* 连续编辑（滑块/输入框）：只更新数据，不触发整页重渲染 */
store.setLayerLive = function (board, layerId, patch) {
  return store.mutate(board, (c) => {
    const l = c.layers.find((x) => x.id === layerId);
    if (l) Object.assign(l, patch);
  }, 'live');
};
store.setPinLive = function (board, pinId, patch) {
  return store.mutate(board, (c) => {
    const p = c.pins.find((x) => x.id === pinId);
    if (p) Object.assign(p, patch);
  }, 'live');
};
store.setStepLive = function (board, stepId, patch) {
  return store.mutate(board, (c) => {
    const s = c.steps.find((x) => x.id === stepId);
    if (s) Object.assign(s, patch);
  }, 'live');
};

store.addPin = function (board, pos) {
  const c = store.editable(board);
  if (!c) {
    U.toast('当前草稿不可编辑', 'warn');
    return null;
  }
  const pcb = c.layers.find((l) => l.kind === 'pcb') || c.layers[0];
  const n = (c.pins || []).length + 1;
  const pin = {
    id: U.uid('pin'),
    name: 'P' + n,
    label: 'P' + n,
    voltage: '',
    group: 'gpio',
    layerId: pcb ? pcb.id : null,
    x: pos?.x ?? 0,
    z: pos?.z ?? 0,
    note: '',
    funcs: [],
  };
  store.mutate(board, (cc) => cc.pins.push(pin));
  return pin;
};
store.addPinTo = store.addPin;
store.updatePin = function (board, pinId, patch) {
  store.mutate(board, (c) => {
    const p = c.pins.find((x) => x.id === pinId);
    if (p) Object.assign(p, patch);
  });
};
store.removePin = function (board, pinId) {
  store.mutate(board, (c) => {
    c.pins = c.pins.filter((p) => p.id !== pinId);
    c.steps.forEach((s) => {
      if (s.pinId === pinId) s.pinId = null;
    });
  });
};
store.addFunction = function (board, pinId, label) {
  const c = store.editable(board);
  if (!c) return;
  const p = c.pins.find((x) => x.id === pinId);
  if (!p) return;
  p.funcs = p.funcs || [];
  p.funcs.push({ id: U.uid('fn'), label: label == null ? '' : label });
  board.work.updatedAt = Date.now();
  store.touch('func-add');
};
store.updateFunction = function (board, pinId, funcId, label) {
  store.mutate(board, (c) => {
    const p = c.pins.find((x) => x.id === pinId);
    const f = p && p.funcs.find((x) => x.id === funcId);
    if (f) f.label = label;
  });
};
store.removeFunction = function (board, pinId, funcId) {
  store.mutate(board, (c) => {
    const p = c.pins.find((x) => x.id === pinId);
    if (p) p.funcs = p.funcs.filter((f) => f.id !== funcId);
  });
};

store.addStep = function (board) {
  const c = store.editable(board);
  if (!c) return null;
  const step = {
    id: U.uid('st'),
    action: c.steps.length ? c.steps[c.steps.length - 1].action : 'install',
    title: '第 ' + (c.steps.length + 1) + ' 步',
    layerIds: [],
    note: '',
  };
  store.mutate(board, (cc) => cc.steps.push(step));
  return step;
};
store.updateStep = function (board, stepId, patch) {
  store.mutate(board, (c) => {
    const s = c.steps.find((x) => x.id === stepId);
    if (s) Object.assign(s, patch);
  });
};
store.removeStep = function (board, stepId) {
  store.mutate(board, (c) => (c.steps = c.steps.filter((s) => s.id !== stepId)));
};
store.moveStep = function (board, stepId, dir) {
  store.mutate(board, (c) => {
    const i = c.steps.findIndex((s) => s.id === stepId);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= c.steps.length) return;
    [c.steps[i], c.steps[j]] = [c.steps[j], c.steps[i]];
  });
};
store.duplicateStep = function (board, stepId) {
  const c = store.editable(board);
  if (!c) return;
  const i = c.steps.findIndex((s) => s.id === stepId);
  if (i < 0) return;
  const copy = U.clone(c.steps[i]);
  copy.id = U.uid('st');
  copy.title = copy.title + '（副本）';
  store.mutate(board, (cc) => cc.steps.splice(i + 1, 0, copy));
};

/* ============================================================
   评审 / 发布 / 修订
   ============================================================ */
store.submitForReview = function (board, note) {
  if (!board.work) return false;
  if (!store.canEdit(board)) {
    U.toast('当前草稿不可提交', 'warn');
    return false;
  }
  const user = store.currentUser();
  const review = {
    id: U.uid('rv'),
    boardId: board.id,
    rev: board.work.rev,
    submittedAt: Date.now(),
    submittedBy: user.name,
    status: 'in_review',
    note: note || '',
    snapshot: U.clone(board.work.content),
    comments: [],
    decidedAt: null,
    decidedBy: null,
    decisionNote: '',
    firmwareTarget: board.work.firmwareTarget,
  };
  // 退回后的重新提交：把上一轮未解决的批注带到本轮，评审可逐条确认
  const prev = [...board.reviews].reverse().find((r) => r.status === 'rejected');
  if (prev && prev.rev <= review.rev) {
    prev.comments
      .filter((c) => !c.resolved)
      .forEach((c) => {
        review.comments.push({
          ...U.clone(c),
          id: U.uid('cm'),
          carriedFrom: prev.rev,
          resolved: false,
          at: c.at,
        });
      });
  }
  board.reviews.push(review);
  board.work.status = 'in_review';
  board.work.submittedAt = review.submittedAt;
  board.work.reviewId = review.id;
  board.work.updatedAt = Date.now();
  store.touch('submit');
  return true;
};

store.addComment = function (board, reviewId, { targetType, targetId, text, targetLabel }) {
  const review = (board.reviews || []).find((r) => r.id === reviewId);
  if (!review || review.status !== 'in_review') {
    U.toast('该评审已结束，无法新增批注', 'warn');
    return false;
  }
  const user = store.currentUser();
  review.comments.push({
    id: U.uid('cm'),
    authorId: user.id,
    author: user.name,
    role: user.role,
    at: Date.now(),
    targetType: targetType || 'general',
    targetId: targetId || null,
    targetLabel: targetLabel || '',
    text,
    resolved: false,
  });
  store.touch('comment');
  return true;
};
store.resolveComment = function (board, reviewId, commentId) {
  const review = (board.reviews || []).find((r) => r.id === reviewId);
  const cm = review && review.comments.find((c) => c.id === commentId);
  if (!cm) return;
  cm.resolved = !cm.resolved;
  store.touch('comment');
};

store.approve = function (board, reviewId, note) {
  const review = (board.reviews || []).find((r) => r.id === reviewId);
  if (!review || review.status !== 'in_review') return false;
  const user = store.currentUser();
  if (!store.canReview()) {
    U.toast('当前用户没有评审权限，请切换到评审员', 'warn');
    return false;
  }
  const open = review.comments.filter((c) => !c.resolved);
  if (open.length) {
    U.toast(`还有 ${open.length} 条未解决批注，请先处理或标记解决`, 'warn');
    return false;
  }
  // 阻断项（如未标电压的引脚）必须清零，否则通过后无法发布
  const checks = publishChecks(board, review.snapshot || board.work.content);
  if (checks.blockers.length) {
    U.toast(`存在 ${checks.blockers.length} 个发布阻断项（未标电压引脚），请退回让编辑补齐后再通过`, 'err');
    return false;
  }
  review.status = 'approved';
  review.decidedAt = Date.now();
  review.decidedBy = user.name;
  review.decisionNote = note || '';
  board.work.status = 'approved';
  board.work.approvedAt = review.decidedAt;
  board.work.updatedAt = Date.now();
  store.touch('approve');
  return true;
};
store.reject = function (board, reviewId, note) {
  const review = (board.reviews || []).find((r) => r.id === reviewId);
  if (!review || review.status !== 'in_review') return false;
  const user = store.currentUser();
  if (!store.canReview()) {
    U.toast('当前用户没有评审权限，请切换到评审员', 'warn');
    return false;
  }
  if (!note || !note.trim()) {
    U.toast('退回时必须填写原因', 'warn');
    return false;
  }
  review.status = 'rejected';
  review.decidedAt = Date.now();
  review.decidedBy = user.name;
  review.decisionNote = note.trim();
  board.work.status = 'rejected';
  board.work.rejectionNote = review.decisionNote;
  board.work.rejectedAt = review.decidedAt;
  board.work.updatedAt = Date.now();
  store.touch('reject');
  return true;
};

store.nextFirmware = function (board) {
  const last = store.latestVersion(board);
  if (!last) return 'v1.0.0';
  const m = /^v?(\d+)\.(\d+)\.(\d+)/i.exec(last.firmware || '');
  if (!m) return last.firmware;
  return `v${m[1]}.${Number(m[2]) + 1}.0`;
};

store.publish = function (board, { firmware, changelog, allowWarnings }) {
  if (!board.work || board.work.status !== 'approved') {
    U.toast('只有评审通过后的草稿才能发布', 'warn');
    return false;
  }
  const checks = publishChecks(board, board.work.content);
  if (checks.blockers.length) {
    U.toast(`存在 ${checks.blockers.length} 个阻断项，无法发布`, 'err');
    return false;
  }
  if (checks.warnings.length && !allowWarnings) {
    U.toast('请确认发布警告后重试', 'warn');
    return false;
  }
  const user = store.currentUser();
  const n = board.versions.length + 1;
  const version = {
    id: U.uid('ver'),
    label: 'R' + n + '.0',
    firmware: firmware || store.nextFirmware(board),
    changelog: changelog || '',
    publishedAt: Date.now(),
    publishedBy: user.name,
    reviewId: board.work.reviewId,
    baseVersionId: board.work.baseVersionId || null,
    rev: board.work.rev,
    content: U.clone(board.work.content),
  };
  board.versions.push(version);
  board.work = null;
  board.updatedAt = Date.now();
  store.touch('publish');
  return version;
};

store.openRevision = function (board, versionId, hint) {
  if (board.work) {
    U.toast('当前已有进行中的草稿（' + statusText(board) + '）', 'warn');
    return false;
  }
  const ver = board.versions.find((v) => v.id === versionId);
  if (!ver) return false;
  const user = store.currentUser();
  board.work = {
    id: U.uid('wk'),
    boardId: board.id,
    status: 'draft',
    rev: (board.work ? board.work.rev : (board.versions.reduce((m, v) => Math.max(m, v.rev || 0), 0) || 1)) + 1,
    baseVersionId: ver.id,
    baseLabel: ver.label,
    firmwareTarget: store.nextFirmware(board),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    content: U.clone(ver.content),
    hint: hint || '',
  };
  board.updatedAt = Date.now();
  store.touch('revision');
  return true;
};

store.createBoard = function ({ name, sku, desc }) {
  const now = Date.now();
  const pcbId = U.uid('ly');
  const board = {
    id: U.uid('bd'),
    name: name || '新建开发板',
    sku: sku || 'NEW-BOARD',
    desc: desc || '',
    createdAt: now,
    updatedAt: now,
    color: '#2f7a5c',
    boardW: 6.4,
    boardD: 8.4,
    work: {
      id: U.uid('wk'),
      status: 'draft',
      rev: 1,
      baseVersionId: null,
      firmwareTarget: 'v1.0.0',
      createdAt: now,
      updatedAt: now,
      content: {
        layers: [
          { id: U.uid('ly'), name: '外壳', kind: 'shell', color: LAYER_KINDS.shell.color, visible: true, offsetX: 0, offsetZ: 0, scale: 1 },
          { id: pcbId, name: '主板', kind: 'pcb', color: LAYER_KINDS.pcb.color, visible: true, offsetX: 0, offsetZ: 0, scale: 1 },
        ],
        pins: [],
        steps: [],
      },
    },
    versions: [],
    reviews: [],
  };
  state.boards.push(board);
  store.touch('board-add');
  return board;
};

store.removeBoard = function (id) {
  state.boards = state.boards.filter((b) => b.id !== id);
  store.touch('board-remove');
};

export function allContentsForStats() {
  return state.boards.map((b) => ({ board: b, stats: boardStats(b) }));
}

/* ============================================================
   种子数据
   ============================================================ */
function mkPin(def, x, z, pcbId) {
  return {
    id: U.uid('pin'),
    name: def.n,
    label: def.n,
    voltage: def.v ?? '3.3V',
    group: def.g || 'gpio',
    layerId: pcbId,
    x,
    z,
    note: def.note || '',
    funcs: (def.f || []).map((label) => ({ id: U.uid('fn'), label })),
  };
}
function layout(defs, boardW, boardD, pcbId) {
  const pins = [];
  const place = (list, side) => {
    const n = list.length;
    const span = Math.min(boardD - 1.6, 7.4);
    const start = -span / 2;
    const step = n > 1 ? span / (n - 1) : 0;
    list.forEach((d, i) => {
      pins.push(mkPin(d, side * (boardW / 2 - 0.38), start + i * step + (Math.abs(boardW / 2 - 0.38) ? 0 : 0), pcbId));
    });
  };
  place(defs.left || [], -1);
  place(defs.right || [], 1);
  return pins;
}

function seed() {
  const now = Date.now();
  const boards = [];

  /* ---------------- 1. ESP32-S3 ---------------- */
  {
    const pcbId = 'esp_pcb', shellId = 'esp_shell', shieldId = 'esp_shield', connId = 'esp_conn', oledId = 'esp_oled';
    const W = 6.4, D = 8.4;
    const pins = layout(
      {
        left: [
          { n: '3V3', g: 'power', v: '3.3V', f: ['3V3', 'PWR'] },
          { n: 'EN', g: 'debug', v: '3.3V', f: ['EN', 'RST', 'CHIP_PU'] },
          { n: 'GPIO4', g: 'comm', v: '3.3V', f: ['GPIO4', 'U0TXD', 'ADC1_CH3'] },
          { n: 'GPIO5', g: 'comm', v: '3.3V', f: ['GPIO5', 'U0RXD'] },
          { n: 'GPIO6', g: 'gpio', v: '3.3V', f: ['GPIO6', 'SPI0_CLK'] },
          { n: 'GPIO7', g: 'gpio', v: '3.3V', f: ['GPIO7', 'SPI0_MISO'] },
          { n: 'GPIO15', g: 'gpio', v: '3.3V', f: ['GPIO15', 'SPI0_MOSI'] },
          { n: 'GPIO16', g: 'gpio', v: '3.3V', f: ['GPIO16', 'SPI0_CS'] },
          { n: 'GPIO17', g: 'comm', v: '3.3V', f: ['GPIO17', 'U1TXD'] },
          { n: 'GPIO18', g: 'comm', v: '3.3V', f: ['GPIO18', 'U1RXD'] },
          { n: 'GPIO8', g: 'comm', v: '3.3V', f: ['GPIO8', 'I2C0_SDA'] },
          { n: 'GPIO9', g: 'comm', v: '3.3V', f: ['GPIO9', 'I2C0_SCL', 'I2C0_SCL'] },
          { n: 'GPIO10', g: 'analog', v: '', f: ['GPIO10', 'ADC1_CH9'], note: '电压待确认' },
          { n: 'GPIO11', g: 'analog', v: '3.3V', f: ['GPIO11', 'ADC2_CH0'] },
          { n: 'GPIO12', g: 'analog', v: '3.3V', f: ['GPIO12', 'ADC2_CH1'] },
          { n: 'GPIO13', g: 'analog', v: '3.3V', f: ['GPIO13', 'ADC2_CH2'] },
          { n: 'GPIO14', g: 'analog', v: '', f: ['GPIO14', 'ADC2_CH3'], note: '电压待确认' },
          { n: 'GPIO21', g: 'gpio', v: '3.3V', f: ['GPIO21', 'SPI1_CLK'] },
          { n: 'GND', g: 'power', v: '0V', f: ['GND'] },
        ],
        right: [
          { n: '5V', g: 'power', v: '5V', f: ['5V', 'VIN'] },
          { n: 'GND', g: 'power', v: '0V', f: ['GND'] },
          { n: 'GPIO0', g: 'boot', v: '3.3V', f: ['GPIO0', 'BOOT', 'ADC1_CH0'] },
          { n: 'GPIO1', g: 'gpio', v: '3.3V', f: ['GPIO1', 'ADC1_CH1', 'TOUCH1'] },
          { n: 'GPIO2', g: 'gpio', v: '3.3V', f: ['GPIO2', 'ADC1_CH2', 'TOUCH2'] },
          { n: 'GPIO3', g: 'gpio', v: '3.3V', f: ['GPIO3', 'ADC1_CH3', 'TOUCH3'] },
          { n: 'GPIO19', g: 'usb', v: '3.3V', f: ['GPIO19', 'USB_D-'] },
          { n: 'GPIO20', g: 'usb', v: '3.3V', f: ['GPIO20', 'USB_D+'] },
          { n: 'GPIO35', g: 'gpio', v: '3.3V', f: ['GPIO35', 'SPI1_MISO'] },
          { n: 'GPIO36', g: 'gpio', v: '3.3V', f: ['GPIO36', 'SPI1_MOSI'] },
          { n: 'GPIO37', g: 'gpio', v: '3.3V', f: ['GPIO37', 'SPI1_CS'] },
          { n: 'GPIO38', g: 'gpio', v: '3.3V', f: ['GPIO38', 'ADC1_CH6'] },
          { n: 'GPIO39', g: 'analog', v: '3.3V', f: ['GPIO39', 'ADC1_CH7'] },
          { n: 'GPIO40', g: 'comm', v: '3.3V', f: ['GPIO40', 'U1_CTS'] },
          { n: 'GPIO41', g: 'comm', v: '3.3V', f: ['GPIO41', 'U1_RTS'] },
          { n: 'GPIO42', g: 'debug', v: '3.3V', f: ['GPIO42', 'JTAG_MTMS'] },
          { n: 'GPIO45', g: 'debug', v: '3.3V', f: ['GPIO45', 'JTAG_MTDI'] },
          { n: 'GPIO46', g: 'debug', v: '3.3V', f: ['GPIO46', 'JTAG_MTCK'] },
          { n: 'GPIO47', g: 'debug', v: '3.3V', f: ['GPIO47', 'JTAG_MTDO'] },
        ],
      },
      W,
      D,
      pcbId
    );

    const layers = [
      { id: shellId, name: '透明外壳', kind: 'shell', color: '#9fb3c4', visible: true, offsetX: 0, offsetZ: 0, scale: 1 },
      { id: pcbId, name: '主板', kind: 'pcb', color: '#2f7a5c', visible: true, offsetX: 0, offsetZ: 0, scale: 1 },
      { id: shieldId, name: '射频屏蔽罩', kind: 'shield', color: '#b9c6cf', visible: true, offsetX: -1.5, offsetZ: -0.6, scale: 1 },
      { id: oledId, name: '0.96" OLED', kind: 'display', color: '#2b3a4a', visible: true, offsetX: 1.2, offsetZ: 2.1, scale: 0.9 },
      { id: connId, name: '接口组件', kind: 'connector', color: '#c9a24a', visible: true, offsetX: 0, offsetZ: 0, scale: 1 },
    ];
    const steps = [
      { id: U.uid('st'), action: 'remove', title: '分离透明外壳', layerIds: [shellId], note: '沿四角卡扣缓慢撬开，避免折断定位柱。' },
      { id: U.uid('st'), action: 'remove', title: '取下 OLED 显示模块', layerIds: [oledId], note: '先断开 FPC 排线，再整体抬起显示模块。' },
      { id: U.uid('st'), action: 'remove', title: '拆除射频屏蔽罩', layerIds: [shieldId], note: '使用热风枪 260℃ 均匀加热后取下，勿损伤周边阻容。' },
      { id: U.uid('st'), action: 'remove', title: '分离接口组件', layerIds: [connId], note: 'USB-C 与排针座一起取下，注意焊盘完整性。' },
      { id: U.uid('st'), action: 'remove', title: '取出主板', layerIds: [pcbId], note: '拧下 4 颗 M2 螺丝后垂直取出主板。' },
    ];

    const content = { layers, pins, steps };
    const versionContent = U.clone(content);
    versionContent.pins.forEach((p) => {
      if (!p.voltage) p.voltage = '3.3V';
      const seen = new Set();
      p.funcs = p.funcs.filter((f) => {
        const k = f.label.trim().toLowerCase();
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      });
    });
    const version = {
      id: U.uid('ver'),
      label: 'R1.0',
      firmware: 'v1.2.0',
      changelog: '首版发布：38 个引脚说明与 5 步拆装流程。',
      publishedAt: now - 12 * DAY - 3 * HOUR,
      publishedBy: '李工',
      reviewId: null,
      baseVersionId: null,
      rev: 1,
      content: versionContent,
    };
    const review = {
      id: U.uid('rv'),
      boardId: 'esp32s3',
      rev: 2,
      submittedAt: now - 2 * DAY - 5 * HOUR,
      submittedBy: '李工',
      status: 'in_review',
      note: '补充了 GPIO10/GPIO14 的模拟功能，接口组件说明已重写，请复核。',
      snapshot: U.clone(content),
      comments: [
        {
          id: U.uid('cm'),
          authorId: 'u_wang',
          author: '王敏',
          role: '评审员',
          at: now - 1 * DAY - 4 * HOUR,
          targetType: 'step',
          targetId: steps[2].id,
          targetLabel: '第 3 步 · 拆除射频屏蔽罩',
          text: '热风温度依据是哪份工艺文件？请补一句“参照《SMT 返修作业指导书》第 4.2 节”。',
          resolved: false,
        },
        {
          id: U.uid('cm'),
          authorId: 'u_wang',
          author: '王敏',
          role: '评审员',
          at: now - 1 * DAY - 1 * HOUR,
          targetType: 'pin',
          targetId: pins[11].id,
          targetLabel: '引脚 GPIO9',
          text: 'GPIO9 的 I2C0_SCL 写了两遍，是复制粘贴残留吗？确认后删除重复项。',
          resolved: false,
        },
        {
          id: U.uid('cm'),
          authorId: 'u_chen',
          author: '陈可',
          role: '评审主管',
          at: now - 22 * HOUR,
          targetType: 'general',
          targetLabel: '整体',
          text: '引脚数量统计口径需要与售后手册一致，请确认是否包含电源排针。',
          resolved: true,
        },
      ],
      decidedAt: null,
      decidedBy: null,
      decisionNote: '',
      firmwareTarget: 'v1.3.0',
    };
    const priorReview = {
      id: U.uid('rv'),
      boardId: 'esp32s3',
      rev: 1,
      submittedAt: now - 14 * DAY,
      submittedBy: '李工',
      status: 'approved',
      note: '首版说明提交评审。',
      snapshot: U.clone(versionContent),
      comments: [
        {
          id: U.uid('cm'),
          authorId: 'u_wang',
          author: '王敏',
          role: '评审员',
          at: now - 13 * DAY - 4 * HOUR,
          targetType: 'general',
          targetLabel: '整体',
          text: '整体清晰，建议后续补一张屏蔽罩拆解示意图。',
          resolved: true,
        },
      ],
      decidedAt: now - 13 * DAY - 2 * HOUR,
      decidedBy: '王敏',
      decisionNote: '通过，按建议在下一版补充示意图。',
      firmwareTarget: 'v1.2.0',
    };
    boards.push({
      id: 'esp32s3',
      name: 'ESP32-S3 教学开发板',
      sku: 'ESP32S3-DEVKIT-A',
      desc: '面向嵌入式入门课程，板载 Wi-Fi/BLE、OLED 与 USB-C 调试接口。',
      color: '#2f7a5c',
      boardW: W,
      boardD: D,
      createdAt: now - 60 * DAY,
      updatedAt: now - 2 * DAY,
      work: {
        id: U.uid('wk'),
        boardId: 'esp32s3',
        status: 'in_review',
        rev: 2,
        baseVersionId: version.id,
        baseLabel: 'R1.0',
        firmwareTarget: 'v1.3.0',
        createdAt: now - 4 * DAY,
        updatedAt: now - 2 * DAY,
        submittedAt: review.submittedAt,
        reviewId: review.id,
        content,
      },
      versions: [version],
      reviews: [priorReview, review],
    });
  }

  /* ---------------- 2. STM32F407 ---------------- */
  {
    const pcbId = 'stm_pcb', shellId = 'stm_shell', shieldId = 'stm_shield', connId = 'stm_conn', lcdId = 'stm_lcd';
    const W = 7.6, D = 9.2;
    const mk = (n, g, v, f) => ({ n, g, v, f });
    const pins = layout(
      {
        left: [
          mk('3V3', 'power', '3.3V', ['3V3', 'VDD']),
          mk('PA0', 'analog', '3.3V', ['PA0', 'ADC1_IN0', 'TIM2_CH1', 'UART4_TX']),
          mk('PA1', 'analog', '3.3V', ['PA1', 'ADC1_IN1', 'TIM2_CH2']),
          mk('PA2', 'comm', '3.3V', ['PA2', 'USART2_TX']),
          mk('PA3', 'comm', '3.3V', ['PA3', 'USART2_RX']),
          mk('PA4', 'analog', '3.3V', ['PA4', 'ADC1_IN4', 'SPI1_NSS']),
          mk('PA5', 'comm', '3.3V', ['PA5', 'SPI1_SCK']),
          mk('PA6', 'comm', '3.3V', ['PA6', 'SPI1_MISO', 'TIM3_CH1']),
          mk('PA7', 'comm', '3.3V', ['PA7', 'SPI1_MOSI', 'TIM3_CH2']),
          mk('PA8', 'gpio', '3.3V', ['PA8', 'MCO1', 'TIM1_CH1']),
          mk('PA9', 'comm', '3.3V', ['PA9', 'USART1_TX', 'USB_OTG_FS_VBUS']),
          mk('PA10', 'comm', '3.3V', ['PA10', 'USART1_RX', 'USB_OTG_FS_ID']),
          mk('PA11', 'usb', '3.3V', ['PA11', 'USB_OTG_FS_DM']),
          mk('PA12', 'usb', '3.3V', ['PA12', 'USB_OTG_FS_DP']),
          mk('PA13', 'debug', '3.3V', ['PA13', 'JTMS_SWDIO']),
          mk('PA14', 'debug', '3.3V', ['PA14', 'JTCK_SWCLK']),
          mk('PA15', 'debug', '3.3V', ['PA15', 'JTDI', 'TIM2_CH1']),
          mk('PB0', 'analog', '3.3V', ['PB0', 'ADC1_IN8', 'TIM3_CH3']),
          mk('PB1', 'analog', '3.3V', ['PB1', 'ADC1_IN9', 'TIM3_CH4']),
          mk('PB2', 'boot', '3.3V', ['PB2', 'BOOT1', 'I2C2_SMBA']),
          mk('PB3', 'debug', '3.3V', ['PB3', 'JTDO', 'TIM2_CH2']),
          mk('GND', 'power', '0V', ['GND']),
          mk('5V', 'power', '5V', ['5V', 'USB_VBUS']),
          mk('VBAT', 'power', '3.0V', ['VBAT']),
        ],
        right: [
          mk('PC0', 'analog', '3.3V', ['PC0', 'ADC1_IN10']),
          mk('PC1', 'analog', '3.3V', ['PC1', 'ADC1_IN11']),
          mk('PC2', 'analog', '3.3V', ['PC2', 'ADC1_IN12']),
          mk('PC3', 'analog', '3.3V', ['PC3', 'ADC1_IN13']),
          mk('PC4', 'analog', '3.3V', ['PC4', 'ADC1_IN14']),
          mk('PC5', 'analog', '3.3V', ['PC5', 'ADC1_IN15']),
          mk('PC6', 'display', '3.3V', ['PC6', 'TIM3_CH1', 'I2S2_MCK', 'LCD_HSYNC']),
          mk('PC7', 'display', '3.3V', ['PC7', 'TIM3_CH2', 'LCD_VSYNC']),
          mk('PC8', 'display', '3.3V', ['PC8', 'TIM3_CH3', 'LCD_RGB_R0']),
          mk('PC9', 'display', '3.3V', ['PC9', 'TIM3_CH4', 'LCD_RGB_G0']),
          mk('PC10', 'comm', '3.3V', ['PC10', 'USART3_TX', 'SPI3_SCK']),
          mk('PC11', 'comm', '3.3V', ['PC11', 'USART3_RX', 'SPI3_MISO']),
          mk('PC12', 'comm', '3.3V', ['PC12', 'USART3_CK', 'SPI3_MOSI']),
          mk('PD0', 'display', '3.3V', ['PD0', 'CAN1_RX', 'LCD_RGB_R3']),
          mk('PD1', 'display', '3.3V', ['PD1', 'CAN1_TX', 'LCD_RGB_R4']),
          mk('PD2', 'comm', '3.3V', ['PD2', 'USART3_RX', 'SDIO_CMD']),
          mk('PD3', 'display', '3.3V', ['PD3', 'USART2_CTS', 'LCD_RGB_G7']),
          mk('PD4', 'comm', '3.3V', ['PD4', 'USART2_RTS', 'FSMC_NOE']),
          mk('PD5', 'comm', '3.3V', ['PD5', 'USART2_TX', 'FSMC_NWE']),
          mk('PD6', 'comm', '3.3V', ['PD6', 'USART2_RX', 'FSMC_NWAIT']),
          mk('PD7', 'comm', '3.3V', ['PD7', 'USART2_CK', 'FSMC_NE1']),
          mk('PE0', 'gpio', '3.3V', ['PE0', 'TIM4_ETR', 'FSMC_NBL0']),
          mk('PE1', 'gpio', '3.3V', ['PE1', 'TIM1_CH2', 'FSMC_NBL1']),
          mk('PE2', 'gpio', '3.3V', ['PE2', 'TRACECLK', 'FSMC_A23']),
        ],
      },
      W,
      D,
      pcbId
    );
    // 一处冲突：PD2 重复 USART3_RX
    const pd2 = pins.find((p) => p.name === 'PD2');
    if (pd2) pd2.funcs.push({ id: U.uid('fn'), label: 'USART3_RX' });

    const layers = [
      { id: shellId, name: '金属外壳', kind: 'shell', color: '#a9b6bf', visible: true, offsetX: 0, offsetZ: 0, scale: 1 },
      { id: pcbId, name: '主板', kind: 'pcb', color: '#24486f', visible: true, offsetX: 0, offsetZ: 0, scale: 1 },
      { id: shieldId, name: 'MCU 屏蔽罩', kind: 'shield', color: '#c2ccd4', visible: true, offsetX: -1.8, offsetZ: -1.2, scale: 1.1 },
      { id: lcdId, name: '2.8" TFT 屏', kind: 'display', color: '#22303d', visible: true, offsetX: 1.3, offsetZ: 2.2, scale: 1.25 },
      { id: connId, name: '接口组件', kind: 'connector', color: '#b8902f', visible: true, offsetX: 0, offsetZ: 0, scale: 1 },
    ];
    const steps = [
      { id: U.uid('st'), action: 'install', title: '安装主板并锁付螺丝', layerIds: [pcbId], note: '对准定位柱，先对角预紧再锁紧 4 颗 M2 螺丝。' },
      { id: U.uid('st'), action: 'install', title: '扣合 MCU 屏蔽罩', layerIds: [shieldId], note: '沿边沿均匀按压，确认四角卡扣全部到位。' },
      { id: U.uid('st'), action: 'install', title: '连接 TFT 显示模块', layerIds: [lcdId], note: 'FPC 金手指朝上插入，锁扣压下后轻拉确认。' },
      { id: U.uid('st'), action: 'install', title: '装回接口面板', layerIds: [connId], note: '先接 USB 座，再压入排针面板。' },
      { id: U.uid('st'), action: 'install', title: '合上金属外壳', layerIds: [shellId], note: '检查屏幕开孔对齐后合壳，扣紧四周卡扣。' },
    ];
    const content = { layers, pins, steps };
    const published = U.clone(content);
    published.pins.forEach((p, i) => {
      if (i === 7) p.voltage = '';
    });
    const oldVersion = {
      id: U.uid('ver'),
      label: 'R1.0',
      firmware: 'v0.9.0',
      changelog: '首个教学版本，覆盖 48 个引脚与 5 步装配流程。',
      publishedAt: now - 34 * DAY,
      publishedBy: '李工',
      reviewId: null,
      baseVersionId: null,
      rev: 1,
      content: U.clone(published),
    };
    const v2 = {
      id: U.uid('ver'),
      label: 'R2.0',
      firmware: 'v1.0.0',
      changelog: '补充 FSMC 复用说明，修正 PA13 调试口标注。',
      publishedAt: now - 9 * DAY,
      publishedBy: '李工',
      reviewId: null,
      baseVersionId: oldVersion.id,
      rev: 2,
      content: U.clone(published),
    };
    v2.content.pins.forEach((p) => {
      if (!p.voltage) p.voltage = '3.3V';
    });
    const rejected = {
      id: U.uid('rv'),
      boardId: 'stm32f407',
      rev: 3,
      submittedAt: now - 6 * DAY,
      submittedBy: '李工',
      status: 'rejected',
      note: '补充 TFT 屏拆装力矩说明。',
      snapshot: U.clone(content),
      comments: [
        {
          id: U.uid('cm'),
          authorId: 'u_wang',
          author: '王敏',
          role: '评审员',
          at: now - 5 * DAY - 6 * HOUR,
          targetType: 'step',
          targetId: steps[2].id,
          targetLabel: '第 3 步 · 连接 TFT 显示模块',
          text: 'FPC 排线方向写反了：金手指应朝下。请按实物更正。',
          resolved: false,
        },
        {
          id: U.uid('cm'),
          authorId: 'u_chen',
          author: '陈可',
          role: '评审主管',
          at: now - 5 * DAY - 2 * HOUR,
          targetType: 'pin',
          targetId: pins[4].id,
          targetLabel: '引脚 PA2',
          text: 'PA2 的 USART2_TX 用途与课程实验 3 不一致，请课程组确认。',
          resolved: false,
        },
      ],
      decidedAt: now - 4 * DAY - 20 * HOUR,
      decidedBy: '王敏',
      decisionNote: '退回：FPC 方向错误，且 PA2 标注需课程组确认后更新。',
      firmwareTarget: 'v1.1.0',
    };
    boards.push({
      id: 'stm32f407',
      name: 'STM32F407 探索板',
      sku: 'STM32F407-DISCO',
      desc: '电机控制与 RTOS 实验平台，板载 TFT 与 FSMC 扩展。',
      color: '#24486f',
      boardW: W,
      boardD: D,
      createdAt: now - 90 * DAY,
      updatedAt: now - 4 * DAY,
      work: {
        id: U.uid('wk'),
        boardId: 'stm32f407',
        status: 'rejected',
        rev: 3,
        baseVersionId: v2.id,
        baseLabel: 'R2.0',
        firmwareTarget: 'v1.1.0',
        createdAt: now - 8 * DAY,
        updatedAt: now - 4 * DAY,
        submittedAt: rejected.submittedAt,
        reviewId: rejected.id,
        rejectedAt: rejected.decidedAt,
        rejectionNote: rejected.decisionNote,
        content,
      },
      versions: [oldVersion, v2],
      reviews: [rejected],
    });
  }

  /* ---------------- 3. RP2040 ---------------- */
  {
    const pcbId = 'rp_pcb', shellId = 'rp_shell', connId = 'rp_conn', pinshieldId = 'rp_shield';
    const W = 5.4, D = 7.2;
    const mk = (n, g, v, f) => ({ n, g, v, f });
    const pins = layout(
      {
        left: [
          mk('GPIO0', 'comm', '3.3V', ['GPIO0', 'UART0_TX', 'I2C0_SDA']),
          mk('GPIO1', 'comm', '3.3V', ['GPIO1', 'UART0_RX', 'I2C0_SCL']),
          mk('GND', 'power', '0V', ['GND']),
          mk('GPIO2', 'comm', '3.3V', ['GPIO2', 'SPI0_SCK', 'I2C1_SDA']),
          mk('GPIO3', 'comm', '3.3V', ['GPIO3', 'SPI0_TX', 'I2C1_SCL']),
          mk('GPIO4', 'comm', '3.3V', ['GPIO4', 'SPI0_RX', 'UART1_TX']),
          mk('GPIO5', 'comm', '3.3V', ['GPIO5', 'SPI0_CSn', 'UART1_RX']),
          mk('GPIO6', 'analog', '3.3V', ['GPIO6', 'ADC0', 'I2C1_SDA']),
          mk('GPIO7', 'analog', '3.3V', ['GPIO7', 'ADC1', 'I2C1_SCL']),
          mk('GPIO8', 'analog', '3.3V', ['GPIO8', 'ADC2', 'UART1_TX']),
          mk('GPIO9', 'analog', '3.3V', ['GPIO9', 'ADC3', 'UART1_RX']),
          mk('GPIO10', 'analog', '', ['GPIO10', 'ADC4', 'SPI1_SCK']),
          mk('GPIO11', 'analog', '3.3V', ['GPIO11', 'ADC5', 'SPI1_TX']),
          mk('GPIO12', 'analog', '3.3V', ['GPIO12', 'ADC6', 'SPI1_RX']),
          mk('GPIO13', 'analog', '3.3V', ['GPIO13', 'ADC7', 'SPI1_CSn']),
        ],
        right: [
          mk('GPIO14', 'comm', '3.3V', ['GPIO14', 'I2C1_SDA', 'PWM7']),
          mk('GPIO15', 'comm', '3.3V', ['GPIO15', 'I2C1_SCL', 'PWM7']),
          mk('GPIO16', 'display', '3.3V', ['GPIO16', 'SPI0_MISO', 'PWM0']),
          mk('GPIO17', 'display', '3.3V', ['GPIO17', 'SPI0_CSn', 'PWM0']),
          mk('GPIO18', 'display', '3.3V', ['GPIO18', 'SPI0_SCK', 'PWM1']),
          mk('GPIO19', 'display', '3.3V', ['GPIO19', 'SPI0_TX', 'PWM1']),
          mk('GPIO20', 'display', '3.3V', ['GPIO20', 'I2C0_SDA', 'PWM2']),
          mk('GPIO21', 'display', '3.3V', ['GPIO21', 'I2C0_SCL', 'PWM2']),
          mk('GPIO22', 'gpio', '3.3V', ['GPIO22', 'PWM3']),
          mk('GPIO23', 'gpio', '', ['GPIO23', 'PWM3']),
          mk('GPIO24', 'gpio', '3.3V', ['GPIO24', 'PWM4']),
          mk('GPIO25', 'gpio', '3.3V', ['GPIO25', 'PWM4', 'LED']),
          mk('GND', 'power', '0V', ['GND']),
          mk('3V3', 'power', '3.3V', ['3V3', '3V3_EN']),
          mk('VBUS', 'power', '5V', ['VBUS']),
        ],
      },
      W,
      D,
      pcbId
    );
    const layers = [
      { id: shellId, name: '亚克力外壳', kind: 'shell', color: '#9fb3c4', visible: true, offsetX: 0, offsetZ: 0, scale: 1 },
      { id: pcbId, name: '主板', kind: 'pcb', color: '#1f5f4a', visible: true, offsetX: 0, offsetZ: 0, scale: 1 },
      { id: pinshieldId, name: '排针护罩', kind: 'shield', color: '#b9c6cf', visible: true, offsetX: 0, offsetZ: 0, scale: 0.62 },
      { id: connId, name: '接口组件', kind: 'connector', color: '#c9a24a', visible: true, offsetX: 0, offsetZ: 0, scale: 1 },
    ];
    const steps = [
      { id: U.uid('st'), action: 'remove', title: '取下亚克力外壳', layerIds: [shellId], note: '拧下四角 M2 铜柱螺丝。' },
      { id: U.uid('st'), action: 'remove', title: '取下排针护罩', layerIds: [pinshieldId], note: '' },
      { id: U.uid('st'), action: 'remove', title: '拔除接口组件', layerIds: [connId], note: '先取下 USB-C 转接板。' },
      { id: U.uid('st'), action: 'remove', title: '取出主板', layerIds: [pcbId], note: '' },
    ];
    boards.push({
      id: 'rp2040',
      name: 'RP2040 入门板',
      sku: 'RP2040-PICO-T',
      desc: '课程配套入门板，30 个引脚，尚未发布说明版本。',
      color: '#1f5f4a',
      boardW: W,
      boardD: D,
      createdAt: now - 20 * DAY,
      updatedAt: now - 3 * HOUR,
      work: {
        id: U.uid('wk'),
        boardId: 'rp2040',
        status: 'draft',
        rev: 1,
        baseVersionId: null,
        firmwareTarget: 'v0.1.0',
        createdAt: now - 6 * DAY,
        updatedAt: now - 3 * HOUR,
        content: { layers, pins, steps },
      },
      versions: [],
      reviews: [],
    });
  }

  /* ---------------- 4. 传感器扩展底板（已发布，无草稿 → 可开修订） ---------------- */
  {
    const pcbId = 'gv_pcb', shellId = 'gv_shell', connId = 'gv_conn';
    const W = 5.0, D = 6.4;
    const mk = (n, g, v, f) => ({ n, g, v, f });
    const pins = layout(
      {
        left: [
          mk('A0', 'analog', '3.3V', ['A0', 'ADC1_IN0', 'I2C0_SDA']),
          mk('A1', 'analog', '3.3V', ['A1', 'ADC1_IN1', 'I2C0_SCL']),
          mk('A2', 'analog', '3.3V', ['A2', 'ADC1_IN2']),
          mk('A3', 'analog', '3.3V', ['A3', 'ADC1_IN3']),
          mk('D2', 'gpio', '3.3V', ['D2', 'PWM0', 'UART1_TX']),
          mk('D3', 'gpio', '3.3V', ['D3', 'PWM1', 'UART1_RX']),
          mk('D4', 'gpio', '3.3V', ['D4', 'PWM2']),
          mk('D5', 'gpio', '3.3V', ['D5', 'PWM3']),
        ],
        right: [
          mk('VIN', 'power', '5V', ['VIN']),
          mk('3V3', 'power', '3.3V', ['3V3']),
          mk('GND', 'power', '0V', ['GND']),
          mk('D6', 'gpio', '3.3V', ['D6', 'PWM4']),
          mk('D7', 'gpio', '3.3V', ['D7', 'PWM5']),
          mk('D8', 'display', '3.3V', ['D8', 'SPI0_SCK']),
          mk('D9', 'display', '3.3V', ['D9', 'SPI0_MOSI']),
          mk('D10', 'display', '3.3V', ['D10', 'SPI0_CS', 'PWM6']),
        ],
      },
      W,
      D,
      pcbId
    );
    const layers = [
      { id: shellId, name: '底板外壳', kind: 'shell', color: '#9fb3c4', visible: true, offsetX: 0, offsetZ: 0, scale: 1 },
      { id: pcbId, name: '底板', kind: 'pcb', color: '#2d6b52', visible: true, offsetX: 0, offsetZ: 0, scale: 1 },
      { id: connId, name: '连接器', kind: 'connector', color: '#c9a24a', visible: true, offsetX: 0, offsetZ: 0, scale: 0.9 },
    ];
    const steps = [
      { id: U.uid('st'), action: 'remove', title: '取下底板外壳', layerIds: [shellId], note: '' },
      { id: U.uid('st'), action: 'remove', title: '拔下连接器', layerIds: [connId], note: '垂直拔出，避免弯针。' },
      { id: U.uid('st'), action: 'remove', title: '取出底板', layerIds: [pcbId], note: '' },
    ];
    const content = { layers, pins, steps };
    const ver = {
      id: U.uid('ver'),
      label: 'R1.0',
      firmware: 'v2.0.1',
      changelog: '传感器扩展底板首版：16 个引脚与 3 步拆装说明。',
      publishedAt: now - 5 * DAY,
      publishedBy: '李工',
      reviewId: null,
      baseVersionId: null,
      rev: 1,
      content: U.clone(content),
    };
    const rv = {
      id: U.uid('rv'),
      boardId: 'grove-ext',
      rev: 1,
      submittedAt: now - 7 * DAY,
      submittedBy: '李工',
      status: 'approved',
      note: '扩展底板首版说明，供课程组备课使用。',
      snapshot: U.clone(content),
      comments: [],
      decidedAt: now - 6 * DAY - 3 * HOUR,
      decidedBy: '王敏',
      decisionNote: '内容完整，通过。',
      firmwareTarget: 'v2.0.1',
    };
    boards.push({
      id: 'grove-ext',
      name: 'Grove 传感器扩展底板',
      sku: 'GROVE-BASE-16',
      desc: '配套传感器课程，16 个引脚已全部发布；适合演示「基于已发布版本开修订」。',
      color: '#2d6b52',
      boardW: W,
      boardD: D,
      createdAt: now - 50 * DAY,
      updatedAt: now - 5 * DAY,
      work: null,
      versions: [ver],
      reviews: [rv],
    });
  }

  return { schema: 1, currentUserId: 'u_li', boards, updatedAt: now };
}
