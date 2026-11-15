// 领域类型定义：ESD 术前讨论系统的全部数据模型

export type Role = 'endoscopist' | 'technician' | 'reviewer';

export const ROLE_LABEL: Record<Role, string> = {
  endoscopist: '内镜医师',
  technician: '技师',
  reviewer: '上级医师',
};

/** 病例状态：待标注 → 待讨论 → 已通过 / 已退回 */
export type CaseStatus = 'drafting' | 'pending' | 'approved' | 'returned';

export const STATUS_LABEL: Record<CaseStatus, string> = {
  drafting: '待标注',
  pending: '待讨论',
  approved: '已通过',
  returned: '已退回',
};

export type ImageModality = 'WLI' | 'NBI';

export const MODALITY_LABEL: Record<ImageModality, string> = {
  WLI: '白光 (WLI)',
  NBI: '窄带成像 (NBI)',
};

/** 归一化多边形（坐标 0..1，相对图像原始像素），缩放窗口时无需换算 */
export interface Polygon {
  id: string;
  kind: 'lesion' | 'lifting' | 'incision';
  points: Point[];
  /** 闭合多边形的填充色由 kind 决定，此处仅存几何 */
  createdAt: number;
  updatedAt: number;
}

export interface Point {
  x: number;
  y: number;
}

/** 比例尺标定：已知长度的参考线段（归一化坐标） */
export interface Calibration {
  id: string;
  name: string;
  /** 参考线段两端（归一化坐标） */
  p1: Point;
  p2: Point;
  /** 该线段对应的真实物理长度，mm */
  knownLengthMm: number;
  createdAt: number;
}

/** 截图 */
export interface CaseImage {
  id: string;
  modality: ImageModality;
  /** IndexedDB 中的 blob key */
  blobKey: string;
  width: number;
  height: number;
  fileName: string;
  uploadedAt: number;
}

/** 取材块（病理申请单），尺寸为计划切取组织块的真实大小 */
export interface SpecimenBlock {
  id: string;
  /** 长 mm */
  lengthMm: number;
  /** 宽 mm */
  widthMm: number;
}

/** 测量结果（每次标注更新后重算） */
export interface Measurements {
  longAxisMm: number;
  shortAxisMm: number;
  areaMm2: number;
  /** 切开线围合面积 */
  incisionAreaMm2: number;
  /** 抬举边界围合面积 */
  liftingAreaMm2: number;
}

/** 对账结果 */
export interface Reconciliation {
  totalBlockAreaMm2: number;
  blockCount: number;
  /** 取材总面积是否足以覆盖切开范围 */
  areaCovered: boolean;
  /** 沿长径方向能否铺满（块数 × 块长 ≥ 长径） */
  longAxisCovered: boolean;
  /** 综合是否通过 */
  passed: boolean;
  warnings: string[];
}

export interface AuditEntry {
  id: string;
  at: number;
  role: Role;
  action: string;
  detail?: string;
}

/** 增强参数预设（WebGL2 着色器 uniform） */
export interface EnhancePreset {
  id: string;
  name: string;
  builtin: boolean;
  /** 假彩色合成的通道混合权重，RGB 三行 × 输入 RGB */
  colorMatrix: number[]; // 长度 9
  /** 血管（高频细节）增强强度 0..3 */
  vesselGain: number;
  /** 明度去相关/饱和度增益 0..2 */
  saturation: number;
  /** 全局对比度 0.5..2 */
  contrast: number;
  /** 绿色通道强调（NBI 血管常用）0..1 */
  greenBoost: number;
  usageCount: number;
  createdAt: number;
  updatedAt: number;
}

/** 病例（系统的核心聚合根） */
export interface EsdCase {
  id: string;
  patientNo: string;
  lesionSite: string;
  operator: string;
  status: CaseStatus;
  images: CaseImage[];
  /** 当前选中用于标注的图像 id */
  activeImageId: string | null;
  polygons: Polygon[];
  blocks: SpecimenBlock[];
  /** 本病例选用的比例尺标定 id（全局标定表中的一项） */
  calibrationId: string | null;
  /** 当前选用的增强预设 id */
  presetId: string | null;
  /** 实时微调后的增强参数（从预设复制而来） */
  enhanceParams: EnhanceParams | null;
  measurements: Measurements | null;
  reconciliation: Reconciliation | null;
  /** 退回意见 */
  returnReason: string;
  audit: AuditEntry[];
  createdAt: number;
  updatedAt: number;
}

export interface EnhanceParams {
  colorMatrix: number[];
  vesselGain: number;
  saturation: number;
  contrast: number;
  greenBoost: number;
}
