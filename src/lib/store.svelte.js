import {
  STATUS_FLOW, STATUS_META, addMonths, iso, todayISO, pathologyComplete, statusIndex,
  guardAdvance, vialNumber, pointSite, tzCoverage, polygonClockSpan, worstGrade,
  followupMonths, areaMM2, DEFAULT_GEO, clamp, normaliseHour, unitMM
} from './domain.js';
import { buildSeed } from './seed.js';

const STORAGE_KEY = 'colpo-clock-workbench-v1';

export const ROLES = {
  physician: { key: 'physician', label: '阴道镜医师', short: '医师', desc: '图像标注 · 活检取材 · 结案', home: 'annotation' },
  nurse: { key: 'nurse', label: '病理对接护士', short: '病理', desc: '病理回填 · 点位核对', home: 'pathology' },
  coordinator: { key: 'coordinator', label: '随访专员', short: '随访', desc: '登记预约 · 随访任务 · 改约', home: 'followup' }
};

export const PERMISSIONS = {
  annotate: ['physician'],
  biopsy: ['physician'],
  pathology: ['nurse', 'physician'],
  followup: ['coordinator', 'physician'],
  register: ['coordinator', 'physician', 'nurse'],
  close: ['physician'],
  reschedule: ['coordinator', 'physician']
};

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.cases) && parsed.cases.length) return parsed;
    }
  } catch (e) {
    console.warn('读取本地数据失败，使用示例数据', e);
  }
  return { cases: buildSeed(), role: 'physician', version: 1 };
}

const initial = load();

export const store = $state({
  cases: initial.cases,
  role: initial.role || 'physician',
  view: 'registry',
  selectedId: null,
  drawingCaseId: null,
  toasts: [],
  lastSaved: null,
  persistence: 'ok'
});

export function can(action) {
  return (PERMISSIONS[action] || []).includes(store.role);
}

export function currentCase() {
  return store.cases.find(c => c.id === store.selectedId) || null;
}

let saveTimer = null;
export function persist() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ cases: store.cases, role: store.role, version: 1 }));
      store.lastSaved = new Date();
      store.persistence = 'ok';
    } catch (e) {
      store.persistence = 'error';
      notify('本地存储空间不足，本次修改仅保存在内存中；请导出数据后清理旧图像。', 'warn', 6000);
    }
  }, 220);
}

let toastId = 0;
export function notify(message, kind = 'ok', ttl = 3600) {
  const id = ++toastId;
  store.toasts.push({ id, message, kind });
  setTimeout(() => {
    store.toasts = store.toasts.filter(t => t.id !== id);
  }, ttl);
}
export function dismissToast(id) {
  store.toasts = store.toasts.filter(t => t.id !== id);
}

export function setRole(role) {
  store.role = role;
  persist();
}
export function setView(view) {
  store.view = view;
}
export function selectCase(id) {
  store.selectedId = id;
}

export function caseById(id) {
  return store.cases.find(c => c.id === id) || null;
}

export function logEvent(c, action, note) {
  if (!c.log) c.log = [];
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  c.log.unshift({
    at: `${iso(now)} ${pad(now.getHours())}:${pad(now.getMinutes())}`,
    action,
    by: ROLES[store.role].short,
    note: note || ''
  });
}

export function nextAccession() {
  const y = new Date().getFullYear();
  const nums = store.cases
    .map(c => c.accession || '')
    .map(a => {
      const m = a.match(/(\d{4})-(\d+)$/);
      return m ? Number(m[2]) : 0;
    });
  const next = Math.max(1100, ...nums) + 1;
  return `C-${y}-${next}`;
}

export function nextLesionId(c) {
  const prefix = (c.accession || 'L').slice(-4);
  const n = ((c.exam?.lesions?.length) || 0) + 1;
  return `L-${prefix}-${n}`;
}

export function nextBiopsySeq(c) {
  const list = c.exam?.biopsies || [];
  return list.reduce((m, b) => Math.max(m, b.seq || 0), 0) + 1;
}

// ---------- 登记 ----------
export function createCase(payload) {
  const id = payload.accession || nextAccession();
  const c = {
    id,
    accession: id,
    name: payload.name,
    age: Number(payload.age) || null,
    phone: payload.phone || '',
    physician: payload.physician || '李敏',
    registeredAt: todayISO(),
    scheduledAt: payload.scheduledAt || todayISO(),
    status: 'pending',
    indication: payload.indication || '',
    parity: payload.parity || '',
    lmp: payload.lmp || '',
    priorScreen: payload.priorScreen || '',
    exam: null,
    priorExams: [],
    tasks: [],
    log: []
  };
  logEvent(c, '登记', `${payload.indication || '门诊登记'}，预约 ${c.scheduledAt}`);
  store.cases.unshift(c);
  persist();
  notify(`已登记 ${c.name}（${c.accession}），状态：待检查`);
  return c;
}

// ---------- 检查与标注 ----------
export function ensureExam(c) {
  if (!c.exam) {
    c.exam = {
      examDate: todayISO(),
      tzType: 'I',
      geometry: { ...DEFAULT_GEO },
      images: { pre: null, post: null, iodine: null },
      lesions: [],
      biopsies: [],
      noLesionNote: '',
      impression: '',
      aceticOnset: '60',
      lugol: '部分不着色',
      scjVisible: '完全可见'
    };
  }
  return c.exam;
}

export function updateExam(caseId, patch) {
  const c = caseById(caseId);
  if (!c) return;
  const exam = ensureExam(c);
  Object.assign(exam, patch);
  persist();
}

export function setImage(caseId, phase, dataURL, source = 'imported') {
  const c = caseById(caseId);
  if (!c) return;
  const exam = ensureExam(c);
  exam.images = { ...(exam.images || {}), [phase]: dataURL };
  exam.imageSource = source;
  persist();
}

export function addLesion(caseId, lesion) {
  const c = caseById(caseId);
  if (!c) return null;
  const exam = ensureExam(c);
  const id = lesion.id || nextLesionId(c);
  const item = {
    id,
    points: lesion.points,
    grade: lesion.grade || '低级别',
    clockNote: lesion.clockNote || '',
    circumferenceManual: lesion.circumferenceManual ?? null,
    note: lesion.note || '',
    createdAt: new Date().toISOString()
  };
  exam.lesions = [...(exam.lesions || []), item];
  persist();
  return item;
}

export function updateLesion(caseId, lesionId, patch) {
  const c = caseById(caseId);
  if (!c?.exam) return;
  const idx = c.exam.lesions.findIndex(l => l.id === lesionId);
  if (idx < 0) return;
  c.exam.lesions[idx] = { ...c.exam.lesions[idx], ...patch };
  persist();
}

export function removeLesion(caseId, lesionId) {
  const c = caseById(caseId);
  if (!c?.exam) return;
  c.exam.lesions = c.exam.lesions.filter(l => l.id !== lesionId);
  c.exam.biopsies = (c.exam.biopsies || []).map(b => (b.lesionId === lesionId ? { ...b, lesionId: null } : b));
  persist();
}

export function submitExam(caseId) {
  const c = caseById(caseId);
  const guard = guardAdvance(c, 'examined');
  if (!guard.ok) { notify(guard.message, 'warn'); return false; }
  c.status = 'examined';
  logEvent(c, '完成检查', `${c.exam.lesions.length} 处病灶标注，三图齐全`);
  persist();
  notify('检查结论已提交，状态：已检查');
  return true;
}

// ---------- 活检 ----------
export function addBiopsy(caseId, point, opts = {}) {
  const c = caseById(caseId);
  if (!c) return null;
  const exam = ensureExam(c);
  if ((exam.biopsies || []).length >= 4) {
    notify('活检点位最多 4 个', 'warn');
    return null;
  }
  const seq = nextBiopsySeq(c);
  const site = pointSite(point, exam.geometry || DEFAULT_GEO);
  const lesion = (exam.lesions || []).find(l => pointInLesion(point, l.points)) || null;
  const item = {
    id: `B-${Date.now().toString(36)}-${seq}`,
    seq,
    vial: vialNumber(c.accession, seq),
    point,
    siteHour: site.hour,
    siteText: site.description,
    lesionId: opts.lesionId ?? lesion?.id ?? null,
    pathGrade: null,
    pathDate: null,
    pathNote: '',
    takenBy: ROLES[store.role].short,
    createdAt: new Date().toISOString()
  };
  exam.biopsies = [...(exam.biopsies || []), item];
  persist();
  return item;
}

function pointInLesion(pt, points) {
  if (!points || points.length < 3) return false;
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const xi = points[i].x, yi = points[i].y, xj = points[j].x, yj = points[j].y;
    if ((yi > pt.y) !== (yj > pt.y) && pt.x < ((xj - xi) * (pt.y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

export function updateBiopsy(caseId, biopsyId, patch) {
  const c = caseById(caseId);
  if (!c?.exam) return;
  const idx = c.exam.biopsies.findIndex(b => b.id === biopsyId);
  if (idx < 0) return;
  const next = { ...c.exam.biopsies[idx], ...patch };
  if (patch.point) {
    const site = pointSite(patch.point, c.exam.geometry || DEFAULT_GEO);
    next.siteHour = site.hour;
    next.siteText = site.description;
    next.lesionId = (c.exam.lesions || []).find(l => pointInLesion(patch.point, l.points))?.id ?? null;
  }
  c.exam.biopsies[idx] = next;
  persist();
}

export function removeBiopsy(caseId, biopsyId) {
  const c = caseById(caseId);
  if (!c?.exam) return;
  c.exam.biopsies = c.exam.biopsies.filter(b => b.id !== biopsyId);
  // 重新编号，保证瓶号连续
  c.exam.biopsies = c.exam.biopsies.map((b, i) => ({
    ...b,
    seq: i + 1,
    vial: vialNumber(c.accession, i + 1)
  }));
  persist();
}

export function commitBiopsies(caseId) {
  const c = caseById(caseId);
  const guard = guardAdvance(c, 'biopsy');
  if (!guard.ok) { notify(guard.message, 'warn'); return false; }
  c.status = 'biopsy';
  logEvent(c, '登记活检', `${c.exam.biopsies.length} 个点位，瓶号 ${c.exam.biopsies.map(b => b.vial).join('、')}`);
  persist();
  notify('活检点位已提交，状态：待活检，等待病理回填');
  return true;
}

// ---------- 病理 ----------
export function commitPathology(caseId) {
  const c = caseById(caseId);
  const guard = guardAdvance(c, 'pathology');
  if (!guard.ok) { notify(guard.message, 'warn'); return false; }
  c.status = 'pathology';
  logEvent(c, '病理回填', `${c.exam.biopsies.length} 瓶全部回填，最高 ${worstGrade(c.exam)}`);
  persist();
  notify('病理结果已归档，状态：已出病理');
  return true;
}

// ---------- 随访 ----------
export function startFollowup(caseId, options = {}) {
  const c = caseById(caseId);
  const guard = guardAdvance(c, 'followup');
  if (!guard.ok) { notify(guard.message, 'warn'); return false; }
  const exam = c.exam;
  const months = Number(options.months) || followupMonths(exam);
  const base = options.baseDate || exam.examDate || todayISO();
  const kinds = options.kinds || ['阴道镜复查', 'HPV 分型复查'];
  const due = addMonths(base, months);
  c.tasks = [
    {
      id: `T-${Date.now().toString(36)}-1`,
      kind: kinds[0] || '阴道镜复查',
      dueDate: due,
      status: '待随访',
      assignee: options.assignee || c.physician,
      phone: c.phone,
      note: options.note || '',
      history: [],
      createdAt: todayISO()
    },
    ...(kinds[1] ? [{
      id: `T-${Date.now().toString(36)}-2`,
      kind: kinds[1],
      dueDate: due,
      status: '待随访',
      assignee: options.assignee || c.physician,
      phone: c.phone,
      note: '',
      history: [],
      createdAt: todayISO()
    }] : [])
  ];
  c.followupMonths = months;
  c.status = 'followup';
  logEvent(c, '开启随访', `${months} 个月复查任务，到期 ${due}`);
  persist();
  notify(`已开启随访：${months} 个月后复查（${due}）`);
  return true;
}

export function findDueTasks(cases = store.cases, today = todayISO()) {
  const out = [];
  for (const c of cases) {
    for (const t of c.tasks || []) {
      if (t.status === '已完成') continue;
      const d = (new Date(t.dueDate) - new Date(today)) / 86400000;
      out.push({ c, task: t, days: Math.round(d) });
    }
  }
  return out.sort((a, b) => a.days - b.days);
}

/**
 * 随访到期生成任务：为每项已到期的随访计划生成一条可执行的「到期随访」任务。
 * 同一计划任务只生成一次（以 sourceTaskId 去重）；若该病例已结案则不生成。
 */
export function generateDueTasks() {
  const due = findDueTasks().filter(x => x.days <= 0);
  if (!due.length) { notify('暂无到期随访任务', 'info'); return 0; }
  let created = 0;
  const stamp = Date.now().toString(36);
  due.forEach(({ c, task }, idx) => {
    if (c.status === 'closed') return;
    // 已生成的任务不再级联生成；同一计划任务只生成一次
    if (task.sourceTaskId || task.generatedTaskId) return;
    const tid = `T-${stamp}-d${idx + 1}`;
    c.tasks = [
      ...(c.tasks || []),
      {
        id: tid,
        kind: `到期随访 · ${task.kind}`,
        dueDate: todayISO(),
        status: '待随访',
        assignee: task.assignee || c.physician,
        phone: task.phone || c.phone,
        note: `由 ${task.kind}（原定 ${task.dueDate}）到期自动生成`,
        sourceTaskId: task.id,
        history: [],
        createdAt: todayISO()
      }
    ];
    task.generatedTaskId = tid;
    logEvent(c, '到期生成任务', `${task.kind} 已到期（${task.dueDate}），生成随访任务并指派 ${task.assignee || c.physician}`);
    created++;
  });
  persist();
  if (!created) notify('到期随访任务均已生成，无需重复创建', 'info');
  else notify(`已为 ${created} 项到期随访生成任务，可在随访任务页处理`);
  return created;
}

export function rescheduleTask(caseId, taskId, newDate, reason) {
  const c = caseById(caseId);
  const t = c?.tasks?.find(x => x.id === taskId);
  if (!t) return false;
  if (!newDate) { notify('请选择新的随访日期', 'warn'); return false; }
  if (!reason || !reason.trim()) { notify('改约必须填写原因', 'warn'); return false; }
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  t.history = t.history || [];
  t.history.push({
    at: `${iso(now)} ${pad(now.getHours())}:${pad(now.getMinutes())}`,
    by: ROLES[store.role].short,
    from: t.dueDate,
    to: newDate,
    reason: reason.trim()
  });
  t.dueDate = newDate;
  t.status = '待随访';
  logEvent(c, '随访改约', `${t.kind}：${t.history.at(-1).from} → ${newDate}，原因：${reason.trim()}`);
  persist();
  notify(`已改约至 ${newDate}，原因已记录`);
  return true;
}

export function completeTask(caseId, taskId, note = '') {
  const c = caseById(caseId);
  const t = c?.tasks?.find(x => x.id === taskId);
  if (!t) return;
  t.status = '已完成';
  t.completedAt = todayISO();
  t.completeNote = note;
  logEvent(c, '随访完成', `${t.kind} 已完成${note ? '：' + note : ''}`);
  persist();
  notify('随访任务已标记完成');
}

export function reopenTask(caseId, taskId) {
  const c = caseById(caseId);
  const t = c?.tasks?.find(x => x.id === taskId);
  if (!t) return;
  t.status = '待随访';
  t.completedAt = null;
  persist();
}

export function closeCase(caseId, summary) {
  const c = caseById(caseId);
  const guard = guardAdvance(c, 'closed');
  if (!guard.ok) { notify(guard.message, 'warn', 5000); return false; }
  if (!summary || !summary.trim()) { notify('请填写结案小结', 'warn'); return false; }
  const pending = (c.tasks || []).filter(t => t.status !== '已完成');
  if (pending.length) {
    notify(`仍有 ${pending.length} 项随访任务未完成，请先完成或说明后结案`, 'warn', 5000);
    return false;
  }
  c.status = 'closed';
  c.closedAt = todayISO();
  c.closeSummary = summary.trim();
  logEvent(c, '结案', summary.trim());
  persist();
  notify('病案已结案');
  return true;
}

// ---------- 面积与前后对比 ----------
export function casePriorExam(c) {
  const list = [];
  if (c?.priorExams?.length) list.push(...c.priorExams);
  return list.sort((a, b) => new Date(b.examDate) - new Date(a.examDate))[0] || null;
}

// ---------- 导出 / 导入 ----------
export function exportAll() {
  return JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), cases: store.cases }, null, 2);
}

export function importAll(jsonText) {
  let parsed;
  try {
    parsed = JSON.parse(jsonText);
  } catch (e) {
    notify('文件不是有效的 JSON', 'warn');
    return false;
  }
  const list = Array.isArray(parsed) ? parsed : parsed?.cases;
  if (!Array.isArray(list) || !list.length) {
    notify('未找到检查单数据（需为 { cases: [...] } 或数组）', 'warn');
    return false;
  }
  const valid = list.filter(c => c && c.id && c.accession && STATUS_FLOW.includes(c.status));
  if (!valid.length) {
    notify('数据中没有可识别的检查单', 'warn');
    return false;
  }
  store.cases = valid;
  store.selectedId = null;
  persist();
  notify(`已导入 ${valid.length} 条检查单`);
  return true;
}

export function downloadBackup() {
  const blob = new Blob([exportAll()], { type: 'application/json;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `钟面-数据备份-${todayISO()}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 3000);
}

export function resetDemo() {
  store.cases = buildSeed();
  store.selectedId = null;
  store.role = 'physician';
  persist();
  notify('已恢复演示数据');
}
