// 全局状态：Solid store + localStorage 持久化，所有写操作附带审计日志
import { createStore, produce } from 'solid-js/store';
import type {
  AuditEntry,
  Device,
  Interpretation,
  LayerKind,
  LayerTemplate,
  Patient,
  PlatformState,
  Role,
  Stage,
  User,
  Verdict,
  Visit,
  Eye,
} from './types';
import { LAYER_ORDER } from './types';
import { autoSegment, VOL } from './lib/oct';
import { nowIso, uid } from './lib/util';

const STORAGE_KEY = 'oct-platform-state-v1';

export const USERS: User[] = [
  { id: 'u_tech', name: '李技师', role: 'technician' },
  { id: 'u_clin', name: '王医师', role: 'clinician' },
  { id: 'u_chief', name: '张主任', role: 'chief' },
];

export const ROLE_LABEL: Record<Role, string> = {
  technician: '技师',
  clinician: '门诊医师',
  chief: '主任医师',
};

export const DEFAULT_TEMPLATES: LayerTemplate[] = [
  {
    id: 'tpl_standard',
    name: '标准黄斑模板',
    builtin: true,
    smoothWindow: { ILM: 5, GCL: 7, LC: 9 },
    breakSensitivity: 0.5,
    lcDepthRatio: 0.72,
    updatedAt: '2026-01-05T09:00:00.000Z',
    updatedBy: '系统',
  },
  {
    id: 'tpl_glaucoma',
    name: '青光眼筛板模板',
    builtin: true,
    smoothWindow: { ILM: 7, GCL: 9, LC: 5 },
    breakSensitivity: 0.75,
    lcDepthRatio: 0.68,
    updatedAt: '2026-01-05T09:00:00.000Z',
    updatedBy: '系统',
  },
];

function seedState(): PlatformState {
  const devices: Device[] = [
    {
      id: 'dev_zeiss_01',
      vendor: 'Zeiss',
      model: 'Cirrus 6000',
      serial: 'CZ6-22481',
      importedAt: '2026-07-10T02:00:00.000Z',
      operator: '李技师',
      width: VOL.width,
      height: VOL.height,
      slices: VOL.slices,
      scaleXum: VOL.scaleXum,
      scaleZum: VOL.scaleZum,
    },
    {
      id: 'dev_heidel_01',
      vendor: 'Heidelberg',
      model: 'Spectralis',
      serial: 'HD-SP-9913',
      importedAt: '2026-10-02T02:00:00.000Z',
      operator: '李技师',
      width: VOL.width,
      height: VOL.height,
      slices: VOL.slices,
      scaleXum: VOL.scaleXum,
      scaleZum: VOL.scaleZum,
    },
  ];

  const patients: Patient[] = [
    { id: 'p_1001', name: '陈建华', sex: '男', birthYear: 1968, mrn: 'MRN-1001', visits: [] },
    { id: 'p_1002', name: '赵敏', sex: '女', birthYear: 1975, mrn: 'MRN-1002', visits: [] },
    { id: 'p_1003', name: '孙立国', sex: '男', birthYear: 1959, mrn: 'MRN-1003', visits: [] },
  ];

  const visits: Record<string, Visit> = {};
  const mk = (
    patient: Patient,
    eye: Eye,
    acquiredAt: string,
    seed: number,
    bias: number,
    breaks: string[],
    stage: Stage,
    deviceId: string,
    withLayers: boolean,
    interp?: Interpretation,
  ): Visit => {
    const tpl = DEFAULT_TEMPLATES[0];
    const dev = devices.find((d) => d.id === deviceId) as Device;
    const layers = withLayers ? autoSegment(seed, bias, breaks, dev, tpl) : null;
    const v: Visit = {
      id: uid('v'),
      patientId: patient.id,
      eye,
      stage,
      acquiredAt,
      importedAt: acquiredAt,
      deviceId,
      templateId: tpl.id,
      seed,
      thicknessBiasUm: bias,
      trueBreaks: breaks,
      layers,
      layeredBy: withLayers ? '李技师' : null,
      layeredAt: withLayers ? acquiredAt : null,
      interpretation: interp ?? null,
      returnReason: null,
      returnedBy: null,
      returnedAt: null,
      audit: [],
    };
    v.audit.push({
      id: uid('a'),
      at: acquiredAt,
      user: '李技师',
      role: 'technician',
      action: '设备导入',
      detail: `${dev.vendor} ${dev.model} / ${eye}`,
    });
    if (withLayers) {
      v.audit.push({
        id: uid('a'),
        at: acquiredAt,
        user: '李技师',
        role: 'technician',
        action: '自动分层',
        detail: `模板：${tpl.name}`,
      });
    }
    if (interp) {
      v.audit.push({
        id: uid('a'),
        at: interp.at,
        user: interp.by,
        role: 'clinician',
        action: `判读：${interp.verdict}`,
        detail: interp.rationale,
      });
    }
    visits[v.id] = v;
    patient.visits.push(v.id);
    return v;
  };

  // 患者1：双眼各两次随访，第二次明显变薄（进展示例）
  mk(patients[0], 'OD', '2026-07-12T03:00:00.000Z', 1101, 0, [], 'interpreted', 'dev_zeiss_01', true, {
    verdict: 'stable',
    rationale: '基线各象限厚度均匀，未见断裂。',
    by: '王医师',
    at: '2026-07-13T01:00:00.000Z',
  });
  mk(patients[0], 'OS', '2026-07-12T03:20:00.000Z', 1102, 0, [], 'interpreted', 'dev_zeiss_01', true, {
    verdict: 'stable',
    rationale: '基线与右眼对称。',
    by: '王医师',
    at: '2026-07-13T01:10:00.000Z',
  });
  mk(patients[0], 'OD', '2026-10-14T03:00:00.000Z', 2101, -13, ['30:140'], 'pending_review', 'dev_heidel_01', true);
  mk(patients[0], 'OS', '2026-10-14T03:20:00.000Z', 2102, -3, [], 'pending_review', 'dev_heidel_01', true);

  // 患者2：一次已退回（主任要求重新分层），一次待分层
  const returned = mk(
    patients[1],
    'OD',
    '2026-09-01T03:00:00.000Z',
    3101,
    -2,
    ['20:80'],
    'returned',
    'dev_zeiss_01',
    true,
  );
  returned.returnReason = '筛板分层线在鼻侧偏移，疑似贴合血管投影，请重新分层后提交。';
  returned.returnedBy = '张主任';
  returned.returnedAt = '2026-09-02T06:00:00.000Z';
  returned.audit.push({
    id: uid('a'),
    at: returned.returnedAt,
    user: '张主任',
    role: 'chief',
    action: '审核退回',
    detail: returned.returnReason,
  });
  mk(patients[1], 'OS', '2026-11-10T03:00:00.000Z', 3102, 0, [], 'pending_layers', 'dev_heidel_01', false);

  // 患者3：待分层 + 已判读稳定
  mk(patients[2], 'OD', '2026-11-08T03:00:00.000Z', 4101, 0, [], 'pending_layers', 'dev_heidel_01', false);
  mk(patients[2], 'OS', '2026-08-20T03:00:00.000Z', 4102, 0, [], 'interpreted', 'dev_zeiss_01', true, {
    verdict: 'suspect',
    rationale: '颞上象限厚度 borderline，建议 3 个月复查。',
    by: '王医师',
    at: '2026-08-21T02:00:00.000Z',
  });

  return {
    users: USERS,
    currentUserId: USERS[1].id,
    patients,
    visits,
    devices,
    templates: DEFAULT_TEMPLATES.map((t) => ({ ...t, smoothWindow: { ...t.smoothWindow } })),
  };
}

function load(): PlatformState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as PlatformState;
  } catch {
    /* 损坏则重建 */
  }
  return seedState();
}

const [state, setState] = createStore<PlatformState>(load());

// 持久化
let saveTimer: ReturnType<typeof setTimeout> | undefined;
function persist() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* 配额满时静默 */
    }
  }, 150);
}

export function resetDemoData() {
  const fresh = seedState();
  setState(fresh);
  persist();
}

export { state, persist };

export function currentUser(): User {
  return state.users.find((u) => u.id === state.currentUserId) as User;
}

export function switchUser(id: string) {
  setState('currentUserId', id);
  persist();
}

function audit(visitId: string, action: string, detail?: string) {
  const u = currentUser();
  const entry: AuditEntry = { id: uid('a'), at: nowIso(), user: u.name, role: u.role, action, detail };
  setState(
    'visits',
    visitId,
    'audit',
    produce((list: AuditEntry[]) => {
      list.push(entry);
    }),
  );
}

export function getVisit(id: string): Visit {
  return state.visits[id];
}

export function getDevice(id: string): Device {
  return state.devices.find((d) => d.id === id) as Device;
}

export function getTemplate(id: string): LayerTemplate {
  return state.templates.find((t) => t.id === id) as LayerTemplate;
}

/** 同眼按时间排序的访视链 */
export function visitChain(patientId: string, eye: Eye): Visit[] {
  return Object.values(state.visits)
    .filter((v) => v.patientId === patientId && v.eye === eye)
    .sort((a, b) => a.acquiredAt.localeCompare(b.acquiredAt));
}

export function previousVisit(v: Visit): Visit | null {
  const chain = visitChain(v.patientId, v.eye).filter((x) => x.acquiredAt < v.acquiredAt);
  return chain.length ? chain[chain.length - 1] : null;
}

// ---------- 技师：设备导入 ----------
export interface ImportSpec {
  patientId: string;
  eye: Eye;
  deviceId: string;
  acquiredAt: string;
  thicknessBiasUm: number;
  breaks: string[];
}

export function importVisit(spec: ImportSpec): string {
  const dev = getDevice(spec.deviceId);
  const tpl = state.templates[0];
  const id = uid('v');
  const visit: Visit = {
    id,
    patientId: spec.patientId,
    eye: spec.eye,
    stage: 'pending_layers',
    acquiredAt: new Date(spec.acquiredAt).toISOString(),
    importedAt: nowIso(),
    deviceId: spec.deviceId,
    templateId: tpl.id,
    seed: Math.floor(Math.random() * 1_000_000) + 5000,
    thicknessBiasUm: spec.thicknessBiasUm,
    trueBreaks: spec.breaks,
    layers: null,
    layeredBy: null,
    layeredAt: null,
    interpretation: null,
    returnReason: null,
    returnedBy: null,
    returnedAt: null,
    audit: [],
  };
  setState('visits', id, visit);
  setState(
    'patients',
    (p) => p.id === spec.patientId,
    'visits',
    produce((list: string[]) => list.push(id)),
  );
  audit(id, '设备导入', `${dev.vendor} ${dev.model} / ${spec.eye}`);
  persist();
  return id;
}

export function registerDevice(d: Omit<Device, 'id' | 'importedAt' | 'operator' | 'width' | 'height' | 'slices' | 'scaleXum' | 'scaleZum'>): string {
  const id = uid('dev');
  const device: Device = {
    ...d,
    id,
    importedAt: nowIso(),
    operator: currentUser().name,
    width: VOL.width,
    height: VOL.height,
    slices: VOL.slices,
    scaleXum: VOL.scaleXum,
    scaleZum: VOL.scaleZum,
  };
  setState('devices', produce((list: Device[]) => list.unshift(device)));
  persist();
  return id;
}

// ---------- 技师：模板维护 ----------
export function saveTemplate(tpl: LayerTemplate) {
  const updated: LayerTemplate = {
    ...tpl,
    smoothWindow: { ...tpl.smoothWindow },
    updatedAt: nowIso(),
    updatedBy: currentUser().name,
  };
  const idx = state.templates.findIndex((t) => t.id === tpl.id);
  if (idx >= 0) {
    setState('templates', idx, updated);
  } else {
    setState('templates', produce((list: LayerTemplate[]) => list.push(updated)));
  }
  persist();
}

export function createTemplate(name: string): string {
  const id = uid('tpl');
  const base = state.templates[0];
  const tpl: LayerTemplate = {
    ...base,
    id,
    name,
    builtin: false,
    smoothWindow: { ...base.smoothWindow },
    updatedAt: nowIso(),
    updatedBy: currentUser().name,
  };
  setState('templates', produce((list: LayerTemplate[]) => list.push(tpl)));
  persist();
  return id;
}

// ---------- 技师/医师：自动分层 ----------
export function runAutoSegmentation(visitId: string, templateId?: string) {
  const v = getVisit(visitId);
  const tpl = getTemplate(templateId ?? v.templateId);
  const dev = getDevice(v.deviceId);
  const layers = autoSegment(v.seed, v.thicknessBiasUm, v.trueBreaks, dev, tpl);
  setState('visits', visitId, {
    layers,
    templateId: tpl.id,
    layeredBy: currentUser().name,
    layeredAt: nowIso(),
  });
  audit(visitId, '自动分层', `模板：${tpl.name}`);
  persist();
}

/** 提交分层：待分层/已退回 → 待判读 */
export function submitLayers(visitId: string) {
  const v = getVisit(visitId);
  if (!v.layers) runAutoSegmentation(visitId);
  setState('visits', visitId, 'stage', 'pending_review');
  audit(visitId, '提交分层', '进入待判读队列');
  persist();
}

// ---------- 医师：拖拽修正分层 ----------
export function updateLayerPoint(visitId: string, layer: LayerKind, slice: number, col: number, depth: number | null) {
  const v = getVisit(visitId);
  if (!v.layers) return;
  const idx = slice * VOL.width + col;
  setState('visits', visitId, 'layers', layer, idx, depth);
}

export function logLayerEdit(visitId: string, layer: LayerKind, slice: number, col: number) {
  audit(visitId, '手动修正分层', `${layer} 帧${slice} 列${col}`);
  setState('visits', visitId, 'layeredBy', currentUser().name);
  setState('visits', visitId, 'layeredAt', nowIso());
  persist();
}

// ---------- 医师：判读 ----------
export function submitInterpretation(visitId: string, verdict: Verdict, rationale: string) {
  const interp: Interpretation = { verdict, rationale, by: currentUser().name, at: nowIso() };
  setState('visits', visitId, { interpretation: interp, stage: 'interpreted' });
  audit(visitId, `判读：${verdict}`, rationale);
  persist();
}

// ---------- 主任：审核退回 ----------
export function returnVisit(visitId: string, reason: string) {
  setState('visits', visitId, {
    stage: 'returned',
    returnReason: reason,
    returnedBy: currentUser().name,
    returnedAt: nowIso(),
  });
  audit(visitId, '审核退回', reason);
  persist();
}

export function approveVisit(visitId: string) {
  audit(visitId, '审核通过', '维持判读结论');
  persist();
}

export function stageQueue(stage: Stage): Visit[] {
  return Object.values(state.visits)
    .filter((v) => v.stage === stage)
    .sort((a, b) => a.acquiredAt.localeCompare(b.acquiredAt));
}

export const LAYERS = LAYER_ORDER;
