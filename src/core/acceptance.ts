// ============================================================
// 验收批次流转 + 看板统计
// ============================================================
import type {
  AcceptanceBatch, ComponentType, DesignConfig, ProjectState, ProtectionComponents,
} from '../types';
import { uid } from './engine';

const DAY = 24 * 3600 * 1000;

export function nowISO(): string {
  return new Date().toISOString();
}

function addDays(iso: string, days: number): string {
  return new Date(new Date(iso).getTime() + days * DAY).toISOString();
}

/** 批次是否超期：已申报且未签认，当前时间超过应完成日期 */
export function isOverdue(batch: AcceptanceBatch): boolean {
  if (batch.status !== 'submitted' || !batch.dueAt) return false;
  return Date.now() > new Date(batch.dueAt).getTime();
}

export function statusLabel(s: AcceptanceBatch['status']): string {
  return { draft: '草稿', submitted: '待签认', approved: '已签认', rejected: '退回整改' }[s];
}

/** 取某级坡某类构件当前工程量 */
export function gradeSnapshot(
  components: ProtectionComponents, gradeId: string, type: ComponentType,
) {
  let anchorCount = 0;
  let concrete = 0;
  let steel = 0;
  if (type === 'frame') {
    const f = components.frames.find((x) => x.gradeId === gradeId);
    if (f) {
      anchorCount = f.anchors.length;
      concrete = f.concrete;
      steel = f.steel;
    }
  } else if (type === 'ditch') {
    concrete = components.ditches
      .filter((d) => d.gradeId === gradeId || (gradeId === '__top__' && d.gradeId === null))
      .reduce((s, d) => s + d.concrete, 0);
  } else if (type === 'wall') {
    concrete = components.walls.filter((w) => w.gradeId === gradeId).reduce((s, w) => s + w.concrete, 0);
  }
  return { anchorCount, concrete, steel };
}

/** 施工班组申报验收批次 */
export function declareBatch(
  state: ProjectState, gradeId: string, type: ComponentType, crew: string,
): AcceptanceBatch {
  const seqNo = state.batches.filter((b) => b.gradeId === gradeId).length + 1;
  const gradeIndex = state.config.grades.findIndex((g) => g.id === gradeId);
  const code = `P${gradeIndex + 1}-${String(seqNo).padStart(2, '0')}`;
  const created = nowISO();
  const batch: AcceptanceBatch = {
    id: uid('B'),
    code,
    gradeId,
    componentType: type,
    crew: crew || '未填报班组',
    status: 'submitted',
    createdAt: created,
    submittedAt: created,
    approvedAt: null,
    dueAt: addDays(created, state.config.batchDueDays),
    snapshot: gradeSnapshot(state.components, gradeId, type),
    reviewNote: '',
    rectification: '',
  };
  return batch;
}

/** 监理签认合格 */
export function approveBatch(batch: AcceptanceBatch, note: string): AcceptanceBatch {
  return {
    ...batch,
    status: 'approved',
    approvedAt: nowISO(),
    reviewNote: note,
  };
}

/** 监理退回并填写整改说明 */
export function rejectBatch(batch: AcceptanceBatch, note: string, rectification: string): AcceptanceBatch {
  return {
    ...batch,
    status: 'rejected',
    reviewNote: note,
    rectification,
    approvedAt: null,
  };
}

/** 整改后重新申报 */
export function resubmitBatch(batch: AcceptanceBatch, config: DesignConfig, components: ProtectionComponents): AcceptanceBatch {
  const t = nowISO();
  return {
    ...batch,
    status: 'submitted',
    submittedAt: t,
    dueAt: addDays(t, config.batchDueDays),
    snapshot: gradeSnapshot(components, batch.gradeId, batch.componentType),
    reviewNote: '',
  };
}

export interface GradeProgress {
  gradeId: string;
  label: string;
  total: number;
  approved: number;
  submitted: number;
  rejected: number;
  ratio: number; // 0..1 完成比例（已签认批次 / 总批次）
}

/** 各级坡完成比例（按验收批次计） */
export function gradeProgress(state: ProjectState): GradeProgress[] {
  return state.config.grades.map((g, i) => {
    const list = state.batches.filter((b) => b.gradeId === g.id);
    const approved = list.filter((b) => b.status === 'approved').length;
    const submitted = list.filter((b) => b.status === 'submitted').length;
    const rejected = list.filter((b) => b.status === 'rejected').length;
    return {
      gradeId: g.id,
      label: `第${i + 1}级坡`,
      total: list.length,
      approved,
      submitted,
      rejected,
      ratio: list.length ? approved / list.length : 0,
    };
  });
}

export interface DashboardStats {
  totalBatches: number;
  submitted: number;
  approved: number;
  rejected: number;
  overdue: number;
  progress: GradeProgress[];
}

export function dashboard(state: ProjectState): DashboardStats {
  const progress = gradeProgress(state);
  return {
    totalBatches: state.batches.length,
    submitted: state.batches.filter((b) => b.status === 'submitted').length,
    approved: state.batches.filter((b) => b.status === 'approved').length,
    rejected: state.batches.filter((b) => b.status === 'rejected').length,
    overdue: state.batches.filter(isOverdue).length,
    progress,
  };
}
