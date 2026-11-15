// ============ 角色与状态 ============
export type Role = 'designer' | 'reviewer' | 'manager'

export const ROLE_NAMES: Record<Role, string> = {
  designer: '设计员(隧道专业组)',
  reviewer: '审核人',
  manager: '路段管理处'
}

export type SchemeStatus = 'draft' | 'pending' | 'returned' | 'approved' | 'delivered'

export const STATUS_NAMES: Record<SchemeStatus, string> = {
  draft: '草稿',
  pending: '待审核',
  returned: '退回',
  approved: '已通过',
  delivered: '已交付'
}

// ============ 方案参数 ============
export interface SchemeParams {
  tunnelName: string      // 隧道名称
  portalName: string      // 洞口名称(进口/出口)
  stake: string           // 桩号
  orientation: number     // 洞口朝向(方位角, 度, 0=北 90=东)
  latitude: number        // 纬度(度)
  canopyLength: number    // 减光棚长度(m)
  grilleSpacing: number   // 格栅间距(m)
  grilleDepth: number     // 格栅高度/深度(m)
  thresholdPct: number    // 减光段照度阈值(洞外亮度的百分比): 2|3|4|5
  simDate: string         // 仿真日期 yyyy-mm-dd
  simTime: string         // 仿真时刻 HH:mm
}

// ============ 仿真结果 ============
export interface SimPoint {
  x: number            // 距洞门距离(m), 0=洞门, canopyLength=棚外端
  illuminance: number  // 棚下路面照度(lux)
  limit: number        // 该位置允许上限(lux)
  exceeded: boolean    // 超阈值
  steep: boolean       // 曲线陡跳
  offset: number       // 偏移量(lux, 超限值或梯度超限折算值)
}

export interface SimResult {
  outsideIlluminance: number  // 洞外照度(lux)
  solarAltitude: number       // 太阳高度角(度)
  solarAzimuth: number        // 太阳方位角(度)
  shadingPerGrille: number    // 单层格栅遮挡率
  portalIlluminance: number   // 洞门处棚下照度(lux)
  jumpLimitPct: number        // 陡跳判据: 局部突变占限值的百分比
  points: SimPoint[]
  exceededCount: number
  steepCount: number
  maxOffset: number
  pass: boolean
  computedAt: string
}

// ============ 眩光提示 ============
export interface GlareWindow {
  date: string        // 代表日期
  start: string       // 时段起 HH:mm
  end: string         // 时段止 HH:mm
  maxAltitude: number // 时段内最大太阳高度角
}

// ============ 版本 / 审核 / 批注 / 日志 ============
export interface SchemeVersion {
  version: number
  params: SchemeParams
  result: SimResult | null
  submittedAt: string
  submittedBy: string
}

export interface ReturnRecord {
  reason: string
  paramsToFix: string
  reviewer: string
  time: string
}

export interface Annotation {
  id: string
  text: string
  author: string
  time: string
}

export interface AuditEntry {
  action: string
  operator: string
  role: Role
  time: string
  detail?: string
}

export interface Scheme {
  id: string
  status: SchemeStatus
  reworkCount: number
  locked: boolean
  current: SchemeVersion      // 当前工作版本
  history: SchemeVersion[]    // 已提交版本快照
  returns: ReturnRecord[]
  annotations: Annotation[]
  audit: AuditEntry[]
  createdAt: string
}

// ============ 交付包 ============
export interface DeliveryPackage {
  tunnelName: string
  schemeIds: string[]
  deliveredAt: string | null
  deliveredBy: string | null
}
