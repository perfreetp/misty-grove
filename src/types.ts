// ============================================================
// 领域类型定义
// ============================================================

export type Vec3 = [number, number, number];

/** 岩土层（按高程描述，自上而下） */
export interface GeoLayer {
  id: string;
  name: string;
  /** 层底高程（m），最下层可设为一个很小的数 */
  bottomElev: number;
  /** 类别：土 / 岩 */
  kind: 'soil' | 'rock';
  /** 该层内锚杆标准长度（m） */
  anchorLength: number;
  /** 三维显示颜色 */
  color: [number, number, number];
}

/** 单级边坡参数 */
export interface SlopeGrade {
  id: string;
  /** 坡率 1:n（竖直:水平），n 为坡率值，如 0.75 表示 1:0.75 */
  ratio: number;
  /** 分级高度（m） */
  height: number;
  /** 平台宽度（m），该级坡顶处的碎落台/平台 */
  bermWidth: number;
}

/** 工程整体设计参数 */
export interface DesignConfig {
  /** 项目名称 */
  projectName: string;
  /** 起讫桩号文本，如 K12+300 ~ K12+520 */
  chainage: string;
  /** 边坡沿路线走向长度（m） */
  slopeLength: number;
  /** 坡顶（地面）高程（m） */
  topElev: number;
  /** 坡脚（路基面）高程（m） */
  toeElev: number;
  /** 分级坡定义，自上而下 */
  grades: SlopeGrade[];
  /** 地质分层，自上而下 */
  layers: GeoLayer[];
  /** 框架梁沿走向分块尺寸（m），需求固定 6m */
  frameBlock: number;
  /** 框架梁沿坡面竖向（倾向）排距（m），默认 6m */
  frameRowSpacing: number;
  /** 框架梁截面宽（m） */
  beamWidth: number;
  /** 框架梁截面高（m） */
  beamDepth: number;
  /** 截水沟截面：底宽（m） */
  ditchBottomWidth: number;
  /** 截水沟截面：顶宽（m） */
  ditchTopWidth: number;
  /** 截水沟截面：深（m） */
  ditchDepth: number;
  /** 护面墙厚（m） */
  wallThickness: number;
  /** 锚杆杆体钢筋直径（mm） */
  anchorBarDiameter: number;
  /** 框架梁配筋率（%），用于估算钢筋吨位 */
  beamSteelRatio: number;
  /** 验收批次计划工期（天），超期判定 */
  batchDueDays: number;
}

export type ComponentType = 'frame' | 'ditch' | 'wall' | 'monitor';

/** 锚杆（框架节点） */
export interface Anchor {
  id: string;
  gradeId: string;
  /** 在坡面上的位置（世界坐标） */
  pos: Vec3;
  /** 锚杆方向（坡面外法线，指向坡外） */
  dir: Vec3;
  /** 锚杆长度（m，随岩层变化） */
  length: number;
  /** 所处岩土层 id */
  layerId: string;
  /** 走向列索引 */
  col: number;
  /** 倾向排索引 */
  row: number;
  /** 是否为土岩分界加密锚杆 */
  densified: boolean;
}

/** 锚杆框架梁（每级坡一套，自动 6m 分块） */
export interface FrameBeam {
  id: string;
  gradeId: string;
  /** 沿走向分块数 */
  colCount: number;
  /** 沿倾向排数（锚杆排数） */
  rowCount: number;
  anchors: Anchor[];
  /** 混凝土方量 m³ */
  concrete: number;
  /** 钢筋吨 */
  steel: number;
  /** 土岩分界处是否触发加密 */
  densifiedAtBoundary: boolean;
}

/** 截水沟 */
export interface Ditch {
  id: string;
  /** 放置位置：坡顶 / 某级平台（gradeId 为 null 表示坡顶） */
  gradeId: string | null;
  /** 沿走向起点、终点（m，相对边坡起点） */
  startX: number;
  endX: number;
  /** 中心线三维坐标采样 */
  path: Vec3[];
  concrete: number;
}

/** 护面墙（覆盖某级坡的一个走向区间） */
export interface FaceWall {
  id: string;
  gradeId: string;
  startX: number;
  endX: number;
  /** 墙顶、墙底高程 */
  topElev: number;
  bottomElev: number;
  concrete: number;
}

/** 监测点 */
export interface MonitorPoint {
  id: string;
  gradeId: string;
  pos: Vec3;
  /** 监测类型 */
  kind: '位移监测桩' | '深部位移孔' | '地下水位孔' | '锚索测力计';
  code: string;
}

export interface ProtectionComponents {
  frames: FrameBeam[];
  ditches: Ditch[];
  walls: FaceWall[];
  monitors: MonitorPoint[];
}

/** 设计意图（与参数解耦，参数变更后由引擎重算几何/工程量） */
export interface DitchIntent {
  id: string;
  /** null=坡顶截水沟；否则为该级坡脚平台 */
  gradeId: string | null;
  startX: number;
  endX: number;
}
export interface WallIntent {
  id: string;
  gradeId: string;
  startX: number;
  endX: number;
}
export interface MonitorIntent {
  id: string;
  gradeId: string;
  /** 坡面走向坐标 */
  x: number;
  /** 自坡顶沿倾向斜距 */
  s: number;
  kind: MonitorPoint['kind'];
  code: string;
}
export interface DesignIntents {
  /** 各分级是否布置锚杆框架梁 */
  frameEnabled: Record<string, boolean>;
  /** 各分级是否已在土岩分界处加密 */
  densified: Record<string, boolean>;
  ditches: DitchIntent[];
  walls: WallIntent[];
  monitors: MonitorIntent[];
}

export type BatchStatus = 'draft' | 'submitted' | 'approved' | 'rejected';

/** 验收批次 */
export interface AcceptanceBatch {
  id: string;
  /** 批次编号，如 P2-03 */
  code: string;
  gradeId: string;
  /** 申报的构件类型 */
  componentType: ComponentType;
  crew: string;
  status: BatchStatus;
  createdAt: string;
  submittedAt: string | null;
  approvedAt: string | null;
  dueAt: string | null;
  /** 申报时锁定的工程量快照 */
  snapshot: {
    anchorCount: number;
    concrete: number;
    steel: number;
  };
  /** 监理签认意见 */
  reviewNote: string;
  /** 退回整改说明 */
  rectification: string;
}

/** 完整项目持久化结构 */
export interface ProjectState {
  version: number;
  config: DesignConfig;
  intents: DesignIntents;
  components: ProtectionComponents;
  batches: AcceptanceBatch[];
}

/** 几何计算得到的单级坡面 */
export interface GradeFace {
  gradeId: string;
  index: number;
  /** 坡顶线（走向）起点/终点，世界坐标 */
  topStart: Vec3;
  topEnd: Vec3;
  /** 坡脚线（走向）起点/终点 */
  toeStart: Vec3;
  toeEnd: Vec3;
  /** 坡顶、坡脚高程 */
  topElev: number;
  toeElev: number;
  /** 坡面倾向单位向量（坡顶指向坡脚，水平+向下） */
  dipDir: Vec3;
  /** 坡面外法线（指向坡外/观察者） */
  normal: Vec3;
  /** 坡面斜长（m） */
  slopeLength: number;
  ratio: number;
  height: number;
  /** 土岩分界线与该级坡面的交点（沿倾向的斜距参数，null 表示无交点） */
  boundaryS: number | null;
  boundaryElev: number | null;
}

/** 几何总模型 */
export interface SlopeModel {
  faces: GradeFace[];
  /** 剖面折线点（x=0 处，含坡顶地面、各级坡脚/平台） */
  sectionPoints: Vec3[];
  /** 渲染用三角网格：位置 / 颜色 */
  mesh: {
    positions: Float32Array;
    colors: Float32Array;
    indices: Uint32Array;
  };
  /** 土岩分界高程（第一个 rock 层的顶高程），无则 null */
  soilRockBoundaryElev: number | null;
}

/** 射线拾取命中 */
export interface PickHit {
  gradeId: string;
  /** 命中点世界坐标 */
  point: Vec3;
  /** 命中点沿走向坐标 x */
  x: number;
  /** 沿该级坡面倾向的斜距 s（自坡顶 0 -> 坡脚 slopeLength） */
  s: number;
  elev: number;
  face: GradeFace;
}

export type Role = 'designer' | 'crew' | 'supervisor';
export type ToolId = 'select' | ComponentType;
