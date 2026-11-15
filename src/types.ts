// ===== 跨线人行天桥方案系统：领域类型定义 =====

export type Material = 'steel' | 'concrete';
export type ApproachType = 'stair' | 'ramp' | 'elevator';
export type Side = 'left' | 'right';
export type SchemeStatus = 'draft' | 'submitted' | 'returned' | 'approved';

/** 管线保护范围（X 区间，米） */
export interface PipelineZone {
  id: string;
  name: string;
  xStart: number;
  xEnd: number;
}

/** 桥墩 */
export interface Pier {
  id: string;
  name: string;
  /** 墩中心沿桥跨方向坐标（米），X=0 为道路中线 */
  x: number;
  /** 顺桥向（沿公路 Z 向）墩厚，米 */
  thickness: number;
  /** 横桥向（桥宽方向）墩宽，米 */
  width: number;
}

/** 梯道 / 坡道 / 电梯 */
export interface Approach {
  id: string;
  type: ApproachType;
  side: Side;
  /** 平面沿桥跨方向（X）的水平投影长度，米；电梯忽略 */
  run: number;
  /** 净宽，米 */
  width: number;
}

/** 公路部门审核退回意见，可挂靠到构件 */
export interface ReviewComment {
  id: string;
  date: string;
  reviewer: string;
  text: string;
  /** 挂靠构件 id（桥墩 / 梯道 / 电梯 / 'main-girder' / null） */
  componentId: string | null;
  resolved: boolean;
}

export interface ReviewRecord {
  id: string;
  date: string;
  reviewer: string;
  action: 'submit' | 'approve' | 'return';
  comment?: string;
}

/** 方案输入 */
export interface Scheme {
  id: string;
  name: string;
  status: SchemeStatus;
  material: Material;
  /** 交叉处路面设计高程，米（绝对高程） */
  roadElevation: number;
  /** 单幅行车道数（双向两幅） */
  lanesPerSide: number;
  /** 单车道宽度，米 */
  laneWidth: number;
  /** 中央分隔带宽度，米 */
  medianWidth: number;
  /** 硬路肩宽度（每侧），米 */
  shoulderWidth: number;
  /** 管线保护范围 */
  pipelines: PipelineZone[];
  /** 主梁梁底高程，米（绝对高程）——桥下净空由此几何推算 */
  girderBottomElev: number;
  /** 梁高，米 */
  girderDepth: number;
  /** 桥面净宽，米 */
  deckWidth: number;
  /** 桥跨总长（左桥台至右桥台 X 向距离），米 */
  span: number;
  /** 桥墩（含桥台可在此管理；默认中墩） */
  piers: Pier[];
  /** 两侧接入设施 */
  approaches: Approach[];
  /** 审定人（通过/退回时记录） */
  approver: string;
  /** 审定日期 */
  approvalDate: string;
  comments: ReviewComment[];
  history: ReviewRecord[];
  preferred: boolean;
}

/** 校核结果条目 */
export interface CheckIssue {
  level: 'error' | 'warning';
  code: string;
  message: string;
  componentId: string | null;
}

/** 方案派生工程量 / 经济指标 */
export interface Metrics {
  /** 桥下净空（米） */
  clearance: number;
  /** 钢材用量（吨） */
  steelTons: number;
  /** 混凝土用量（立方米） */
  concreteM3: number;
  /** 造价（万元） */
  costWan: number;
  /** 占地面积（平方米） */
  footprintM2: number;
  /** 封闭施工天数（天） */
  closureDays: number;
  /** 梯道/坡道坡度提示列表 */
  slopeWarnings: { approachId: string; slope: number; ratioText: string }[];
}
