// 平台核心领域类型定义

export type Role = 'technician' | 'clinician' | 'chief';

export interface User {
  id: string;
  name: string;
  role: Role;
}

export type Stage = 'pending_layers' | 'pending_review' | 'interpreted' | 'returned';

export const STAGE_LABEL: Record<Stage, string> = {
  pending_layers: '待分层',
  pending_review: '待判读',
  interpreted: '已判读',
  returned: '已退回',
};

export type Eye = 'OD' | 'OS';
export const EYE_LABEL: Record<Eye, string> = { OD: '右眼(OD)', OS: '左眼(OS)' };

/** 分层边界：内界膜 ILM、神经节细胞层下边界 GCL、筛板 LC */
export type LayerKind = 'ILM' | 'GCL' | 'LC';
export const LAYER_LABEL: Record<LayerKind, string> = {
  ILM: '内界膜 ILM',
  GCL: '神经节细胞层 GCL',
  LC: '筛板 LC',
};
export const LAYER_COLOR: Record<LayerKind, [number, number, number]> = {
  ILM: [0.2, 0.9, 1.0], // 青
  GCL: [1.0, 0.75, 0.2], // 琥珀
  LC: [0.85, 0.4, 1.0], // 紫
};
export const LAYER_ORDER: LayerKind[] = ['ILM', 'GCL', 'LC'];

/** 一条分层线：每个 A 扫描列一个深度值（像素坐标，0=顶部）；断裂处为 null */
export type LayerCurve = (number | null)[];

export interface Layers {
  ILM: LayerCurve;
  GCL: LayerCurve;
  LC: LayerCurve;
}

/** 分层模板（技师维护）：自动分层的参数预设 */
export interface LayerTemplate {
  id: string;
  name: string;
  builtin: boolean;
  /** 各层平滑窗口（列） */
  smoothWindow: Record<LayerKind, number>;
  /** 断裂检测灵敏度 0-1 */
  breakSensitivity: number;
  /** 筛板估计深度比例 */
  lcDepthRatio: number;
  updatedAt: string;
  updatedBy: string;
}

export interface Device {
  id: string;
  vendor: string;
  model: string;
  serial: string;
  importedAt: string;
  operator: string;
  /** 体数据尺寸 */
  width: number; // A 扫描列数
  height: number; // 深度像素
  slices: number; // B 扫描帧数
  scaleXum: number; // 每像素横向微米
  scaleZum: number; // 每像素深度微米
}

export type Verdict = 'progression' | 'stable' | 'suspect';
export const VERDICT_LABEL: Record<Verdict, string> = {
  progression: '进展',
  stable: '稳定',
  suspect: '可疑',
};

export interface Interpretation {
  verdict: Verdict;
  rationale: string;
  by: string;
  at: string;
}

export interface AuditEntry {
  id: string;
  at: string;
  user: string;
  role: Role;
  action: string;
  detail?: string;
}

export interface Visit {
  id: string;
  patientId: string;
  eye: Eye;
  stage: Stage;
  acquiredAt: string; // 采集日期
  importedAt: string;
  deviceId: string;
  templateId: string;
  /** 体数据生成种子（实际环境此处为像素文件引用；演示环境程序化重建） */
  seed: number;
  /** 病理参数：整体厚度偏移（微米），随访变薄用负值 */
  thicknessBiasUm: number;
  /** 真实断裂位置（自动分层会检出），格式 slice:col */
  trueBreaks: string[];
  layers: Layers | null;
  /** 分层修正/确认人 */
  layeredBy: string | null;
  layeredAt: string | null;
  interpretation: Interpretation | null;
  returnReason: string | null;
  returnedBy: string | null;
  returnedAt: string | null;
  audit: AuditEntry[];
}

export interface Patient {
  id: string;
  name: string;
  sex: '男' | '女';
  birthYear: number;
  mrn: string; // 病历号
  visits: string[]; // visit id
}

export interface PlatformState {
  users: User[];
  currentUserId: string;
  patients: Patient[];
  visits: Record<string, Visit>;
  devices: Device[];
  templates: LayerTemplate[];
}
