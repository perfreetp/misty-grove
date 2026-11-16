export type Role = 'rechecker' | 'supervisor' | 'engineer';

export interface User {
  id: string;
  name: string;
  role: Role;
  code: string;
}

export type DefectType =
  | 'insufficient_solder'
  | 'cold_joint'
  | 'offset'
  | 'bridging'
  | 'false_call';

export type MachineDefectType = Exclude<DefectType, 'false_call'>;

export type Shift = '白班' | '夜班';

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Program {
  id: string;
  code: string;
  name: string;
  machineId: string;
  line: string;
  /** 误报率预警阈值，百分比 */
  alertThreshold: number;
}

/**
 * 图像上的焊点记录。
 * machineJudged=true 表示检测机吐出了这条缺陷记录（可疑焊点）；
 * actual 表示该处焊点的真实形貌，null 表示焊点正常（即机器误报）；
 * machineJudged=false 且 actual 非空，表示检测机漏判、只有人眼能发现的缺陷。
 */
export interface DefectRecord extends Rect {
  id: string;
  machineJudged: boolean;
  machineType: MachineDefectType | null;
  actual: MachineDefectType | null;
  /** 机器置信度 0-99，仅对机器记录有效 */
  confidence: number;
  /** 形貌轻微、机器未能报出 */
  subtle?: boolean;
  componentRef: string;
  compIdx: number;
  padIdx: number | null;
}

export interface Annotation extends Rect {
  id: string;
  versionId: string;
  boardId: string;
  batchId: string;
  type: DefectType;
  note: string;
  /** 关联的机器缺陷记录，人工发现的漏判缺陷为空 */
  defectId: string | null;
  status: 'active' | 'void';
  createdAt: string;
  createdBy: string;
  updatedAt?: string;
  voidedAt?: string;
  voidedBy?: string;
  voidReason?: string;
}

export interface ImageVersion {
  id: string;
  seq: number;
  label: string;
  kind: 'import' | 'rescan';
  createdAt: string;
  createdBy: string;
  layoutSeed: number;
  renderSeed: number;
  exposure: number;
  width: number;
  height: number;
  defects: DefectRecord[];
  annotations: Annotation[];
}

export interface VerdictSnapshot {
  verdict: 'pass' | 'rework';
  counts: Record<DefectType, number>;
  reasons: string[];
  at: string;
  by: string;
}

export interface Board {
  id: string;
  batchId: string;
  boardNo: string;
  activeVersionId: string;
  versions: ImageVersion[];
  reviewStatus: 'pending' | 'reviewed';
  verdict?: VerdictSnapshot;
  reviewedBy?: string;
  reviewedAt?: string;
  submitTimes: number;
}

export type BatchStatus = 'pending' | 'reviewing' | 'awaiting_release' | 'released';

export interface ReturnRecord {
  id: string;
  by: string;
  at: string;
  category: string;
  reason: string;
}

export interface SamplingRecord {
  boardId: string;
  by: string;
  at: string;
  /** 主管实际查看抽检图像的时间，未查看为空 */
  viewedAt?: string;
  note?: string;
}

export interface ReleaseRecord {
  by: string;
  at: string;
  note: string;
  coveragePct: number;
  sampledBoardIds: string[];
}

export interface Batch {
  id: string;
  code: string;
  product: string;
  programId: string;
  machineId: string;
  line: string;
  shift: Shift;
  importedAt: string;
  importedBy: string;
  status: BatchStatus;
  boards: Board[];
  submittedAt?: string;
  submittedBy?: string;
  sampling: SamplingRecord[];
  released?: ReleaseRecord;
  returns: ReturnRecord[];
  notes?: string;
}

export interface Thresholds {
  insufficient_solder: number;
  cold_joint: number;
  offset: number;
  bridging: number;
  /** 抽检比例，默认 0.05 */
  sampleRatio: number;
}

export interface AuditEntry {
  id: string;
  at: string;
  actorId: string;
  action: string;
  detail: string;
  batchId?: string;
  boardId?: string;
  versionId?: string;
}

export interface Appeal {
  id: string;
  batchId: string;
  boardId?: string;
  programId: string;
  shift: Shift;
  raisedAt: string;
  source: '客户' | '下游工站' | 'OQA';
  type: DefectType;
  note: string;
  status: 'open' | 'closed';
}

export interface Database {
  schema: number;
  users: User[];
  currentUserId: string;
  programs: Program[];
  thresholds: Thresholds;
  batches: Batch[];
  appeals: Appeal[];
  audit: AuditEntry[];
}
