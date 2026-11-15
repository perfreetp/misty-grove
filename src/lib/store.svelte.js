import * as db from './db.js';
import { DEFAULT_ZONES, DEFAULT_ANGLES, TASK_STATUS } from './constants.js';
import { diffFinding } from './utils.js';

// ---- 全局响应式状态 ----
const state = $state({
  ready: false,
  operator: { name: '张医生', role: 'physician' },
  zones: [],
  angles: [],
  patients: [],
  visits: [],
  moles: [],
  findings: [],
  tasks: [],
  judgments: [],
  reviews: [],
  logs: [],
  currentPatientId: null,
  currentVisitId: null,
  currentTaskId: null
});

function log(action, target, detail = '') {
  const row = {
    id: db.uid('log_'),
    ts: Date.now(),
    operator: state.operator.name,
    role: state.operator.role,
    action,
    target,
    detail
  };
  state.logs.push(row);
  db.put('logs', row);
}

async function loadAll() {
  const [zones, angles, patients, visits, moles, findings, tasks, judgments, reviews, logs] =
    await Promise.all([
      db.getAll('zones'),
      db.getAll('angles'),
      db.getAll('patients'),
      db.getAll('visits'),
      db.getAll('moles'),
      db.getAll('findings'),
      db.getAll('tasks'),
      db.getAll('judgments'),
      db.getAll('reviews'),
      db.getAll('logs')
    ]);
  state.zones = zones.sort((a, b) => a.code.localeCompare(b.code));
  state.angles = angles.sort((a, b) => a.id.localeCompare(b.id));
  state.patients = patients.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  state.visits = visits;
  state.moles = moles;
  state.findings = findings;
  state.tasks = tasks.sort((a, b) => b.createdAt - a.createdAt);
  state.judgments = judgments;
  state.reviews = reviews;
  state.logs = logs.sort((a, b) => b.ts - a.ts);
}

export async function initStore() {
  await db.openDb();
  const seeded = await db.getMeta('seeded', false);
  if (!seeded) {
    await db.putBulk('zones', DEFAULT_ZONES.map((z) => ({ ...z })));
    await db.putBulk('angles', DEFAULT_ANGLES.map((a) => ({ ...a })));
    await db.setMeta('seeded', true);
  }
  const op = await db.getMeta('operator', null);
  if (op) state.operator = op;
  await loadAll();
  state.ready = true;
}

export function getState() {
  return state;
}

export function setOperator(name, role) {
  state.operator = { name, role };
  db.setMeta('operator', state.operator);
  log('切换操作人', name, `角色=${role}`);
}

// ---- 技师：分区 / 角度模板维护 ----
export async function saveZone(zone) {
  const existing = state.zones.find((z) => z.id === zone.id);
  const row = { active: true, ...zone };
  await db.put('zones', row);
  if (existing) Object.assign(existing, row);
  else state.zones.push(row);
  state.zones.sort((a, b) => a.code.localeCompare(b.code));
  log(existing ? '修改分区规则' : '新增分区规则', row.id, row.name);
}

export async function toggleZone(id) {
  const z = state.zones.find((x) => x.id === id);
  z.active = !z.active;
  await db.put('zones', { ...z });
  log('启停分区规则', id, `active=${z.active}`);
}

export async function saveAngle(angle) {
  const existing = state.angles.find((a) => a.id === angle.id);
  const row = { active: true, ...angle };
  await db.put('angles', row);
  if (existing) Object.assign(existing, row);
  else state.angles.push(row);
  state.angles.sort((a, b) => a.id.localeCompare(b.id));
  log(existing ? '修改拍摄角度模板' : '新增拍摄角度模板', row.id, row.name);
}

export async function toggleAngle(id) {
  const a = state.angles.find((x) => x.id === id);
  a.active = !a.active;
  await db.put('angles', { ...a });
  log('启停角度模板', id, `active=${a.active}`);
}

// ---- 患者 ----
export async function createPatient(input) {
  const p = {
    id: db.uid('pat_'),
    name: input.name,
    gender: input.gender,
    birthYear: input.birthYear ? +input.birthYear : null,
    medicalNo: input.medicalNo || '',
    note: input.note || '',
    createdAt: Date.now(),
    createdBy: state.operator.name
  };
  await db.put('patients', p);
  state.patients.unshift(p);
  log('新建患者', p.id, p.name);
  return p;
}

export function setCurrentPatient(id) {
  state.currentPatientId = id;
}

// ---- 就诊 ----
export async function createVisit(patientId, type, visitDate) {
  const v = {
    id: db.uid('vis_'),
    patientId,
    type, // baseline | followup
    visitDate: visitDate || Date.now(),
    createdAt: Date.now(),
    createdBy: state.operator.name
  };
  await db.put('visits', v);
  state.visits.push(v);
  log(type === 'baseline' ? '创建基线就诊' : '创建复诊就诊', v.id);
  return v;
}

export function setCurrentVisit(id) {
  state.currentVisitId = id;
}

function lateralityOf(partId) {
  if (partId.endsWith('L')) return 'L';
  if (partId.endsWith('R')) return 'R';
  return '';
}

// ---- 痣主档与编号 ----
export async function addMole(input) {
  const zone = state.zones.find((z) => z.id === input.zoneId);
  if (!zone) throw new Error('请选择有效解剖分区');
  const seq = await db.nextZoneSeq(zone.id);
  const lat = lateralityOf(input.partId);
  const code =
    zone.code + (lat ? '-' + lat : '') + '-' + String(seq).padStart(3, '0');
  const mole = {
    id: db.uid('mol_'),
    patientId: input.patientId,
    code,
    zoneId: zone.id,
    partId: input.partId,
    laterality: lat,
    u: input.u,
    v: input.v,
    side: input.side,
    removed: false,
    createdAt: Date.now(),
    createdBy: state.operator.name
  };
  await db.put('moles', mole);
  state.moles.push(mole);
  log('新增痣并编号', mole.id, code);
  return mole;
}

export async function updateMolePosition(moleId, u, v, partId, side) {
  const mole = state.moles.find((m) => m.id === moleId);
  Object.assign(mole, { u, v, partId, side, laterality: lateralityOf(partId) });
  await db.put('moles', { ...mole });
  log('修正痣定位', mole.id, mole.code);
}

export async function markMoleRemoved(moleId) {
  const mole = state.moles.find((m) => m.id === moleId);
  mole.removed = true;
  await db.put('moles', { ...mole });
  log('标记痣已切除/去除', mole.id, mole.code);
}

// ---- 测量记录（含皮肤镜照片 Blob）----
export async function addFinding(input) {
  const f = {
    id: db.uid('fin_'),
    visitId: input.visitId,
    moleId: input.moleId,
    diameterMm: +input.diameterMm,
    edgeType: input.edgeType,
    networkType: input.networkType,
    angleId: input.angleId || '',
    note: input.note || '',
    photoBlob: input.photoBlob || null,
    photoName: input.photoName || '',
    capturedAt: Date.now(),
    capturedBy: state.operator.name
  };
  await db.put('findings', f);
  state.findings.push(f);
  log('保存皮肤镜记录', f.id, `痣=${input.moleId}`);
  return f;
}

// 重新配对：把复诊记录挂到另一颗痣
export async function repairFinding(findingId, newMoleId) {
  const f = state.findings.find((x) => x.id === findingId);
  const old = f.moleId;
  f.moleId = newMoleId;
  await db.put('findings', { ...f });
  log('重新配对', findingId, `${old} → ${newMoleId}`);
}

export async function deleteFinding(findingId) {
  state.findings = state.findings.filter((f) => f.id !== findingId);
  await db.remove('findings', findingId);
  log('删除测量记录', findingId);
}

// ---- 随访任务 ----
export async function createTask(patientId, baselineVisitId, dueDate) {
  const visit = await createVisit(patientId, 'followup', dueDate);
  const t = {
    id: db.uid('tsk_'),
    patientId,
    baselineVisitId,
    visitId: visit.id,
    status: 'pending_capture',
    dueDate: dueDate || Date.now(),
    createdAt: Date.now(),
    createdBy: state.operator.name,
    lastStatusAt: Date.now(),
    lastStatusBy: state.operator.name
  };
  await db.put('tasks', t);
  state.tasks.unshift(t);
  log('创建随访任务', t.id, '待采集');
  return t;
}

export async function transitionTask(taskId, status, detail = '') {
  const t = state.tasks.find((x) => x.id === taskId);
  if (!t) return;
  const old = t.status;
  t.status = status;
  t.lastStatusAt = Date.now();
  t.lastStatusBy = state.operator.name;
  if (status === 'pending_read') t.submittedAt = Date.now();
  if (status === 'judged') t.judgedAt = Date.now();
  if (status === 'returned') t.returnedAt = Date.now();
  await db.put('tasks', { ...t });
  const label = TASK_STATUS.find((s) => s.id === status)?.name || status;
  log('任务状态变更', t.id, `${old} → ${label}${detail ? '；' + detail : ''}`);
}

export function setCurrentTask(id) {
  state.currentTaskId = id;
}

// ---- 判读 ----
export async function saveJudgment(taskId, moleId, findingId, decision, reason) {
  const existing = state.judgments.find(
    (j) => j.taskId === taskId && j.moleId === moleId
  );
  if (existing) {
    existing.decision = decision;
    existing.reason = reason;
    existing.findingId = findingId;
    existing.physician = state.operator.name;
    existing.ts = Date.now();
    await db.put('judgments', { ...existing });
    log('修改判读', existing.id, `${decision}`);
    return existing;
  }
  const j = {
    id: db.uid('jud_'),
    taskId,
    moleId,
    findingId,
    decision,
    reason,
    physician: state.operator.name,
    ts: Date.now()
  };
  await db.put('judgments', j);
  state.judgments.push(j);
  log('提交判读', j.id, decision);
  return j;
}

// ---- 主任审核 ----
export async function submitReview(taskId, verdict, note) {
  const r = {
    id: db.uid('rev_'),
    taskId,
    verdict, // approved | returned
    note: note || '',
    director: state.operator.name,
    ts: Date.now()
  };
  await db.put('reviews', r);
  state.reviews.push(r);
  if (verdict === 'returned') {
    await transitionTask(taskId, 'returned', note);
  } else {
    log('审核通过', taskId, note);
  }
  return r;
}

// ---- 查询辅助 ----
export function visitsOfPatient(patientId) {
  return state.visits
    .filter((v) => v.patientId === patientId)
    .sort((a, b) => a.visitDate - b.visitDate);
}

export function findingsOfVisit(visitId) {
  return state.findings.filter((f) => f.visitId === visitId);
}

export function molesOfPatient(patientId) {
  return state.moles.filter((m) => m.patientId === patientId);
}

export function zoneOfMole(mole) {
  return state.zones.find((z) => z.id === mole.zoneId);
}

export function baselineVisitOf(patientId) {
  return state.visits
    .filter((v) => v.patientId === patientId && v.type === 'baseline')
    .sort((a, b) => a.visitDate - b.visitDate)[0];
}

export function findingOfMoleInVisit(moleId, visitId) {
  return state.findings.find((f) => f.moleId === moleId && f.visitId === visitId);
}

export function judgmentOf(taskId, moleId) {
  return state.judgments.find((j) => j.taskId === taskId && j.moleId === moleId);
}

export function reviewsOfTask(taskId) {
  return state.reviews.filter((r) => r.taskId === taskId).sort((a, b) => a.ts - b.ts);
}

// 随访任务的逐颗配对/差异视图
export function followupRows(taskId) {
  const task = state.tasks.find((t) => t.id === taskId);
  if (!task) return [];
  const moles = molesOfPatient(task.patientId);
  const current = findingsOfVisit(task.visitId);
  return moles.map((mole) => {
    const cur = current.find((f) => f.moleId === mole.id) || null;
    const base = findingOfMoleInVisit(mole.id, task.baselineVisitId);
    const diff = cur ? diffFinding(base, cur) : null;
    return {
      mole,
      zone: zoneOfMole(mole),
      baseline: base || null,
      current: cur,
      diff,
      judgment: judgmentOf(taskId, mole.id)
    };
  });
}

// 待审列表：已判读且未被主任通过的任务（含标黄痣）
export function reviewQueue() {
  return state.tasks
    .filter((t) => t.status === 'judged' || t.status === 'returned')
    .map((t) => {
      const rows = followupRows(t.id);
      const flagged = rows.filter((r) => r.diff?.flagged);
      const approved = state.reviews.some(
        (r) => r.taskId === t.id && r.verdict === 'approved'
      );
      return { task: t, patient: state.patients.find((p) => p.id === t.patientId), flagged, approved, rows };
    })
    .sort((a, b) => b.task.lastStatusAt - a.task.lastStatusAt);
}

// 医师统计：标黄命中率、活检比例
export function physicianStats() {
  const map = new Map();
  for (const j of state.judgments) {
    const name = j.physician;
    if (!map.has(name)) {
      map.set(name, {
        physician: name,
        total: 0,
        observe: 0,
        biopsy: 0,
        excise: 0,
        flaggedTotal: 0,
        flaggedAction: 0
      });
    }
    const s = map.get(name);
    s.total++;
    s[j.decision]++;
    const task = state.tasks.find((t) => t.id === j.taskId);
    if (task) {
      const base = findingOfMoleInVisit(j.moleId, task.baselineVisitId);
      const cur = state.findings.find((f) => f.id === j.findingId);
      if (cur) {
        const d = diffFinding(base, cur);
        if (d.flagged) {
          s.flaggedTotal++;
          if (j.decision === 'biopsy' || j.decision === 'excise') s.flaggedAction++;
        }
      }
    }
  }
  return [...map.values()].map((s) => ({
    ...s,
    flagHitRate: s.flaggedTotal ? s.flaggedAction / s.flaggedTotal : null,
    biopsyRate: s.total ? s.biopsy / s.total : null,
    actionRate: s.total ? (s.biopsy + s.excise) / s.total : null
  }));
}

export function taskLogs(targetId) {
  return state.logs
    .filter((l) => l.target === targetId || l.detail.includes(targetId))
    .sort((a, b) => a.ts - b.ts);
}
