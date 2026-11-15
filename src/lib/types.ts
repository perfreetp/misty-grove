export type Vec2 = [number, number];
export type Vec3 = [number, number, number];

export type Role = 'physician' | 'technologist' | 'director';

export type CaseStatus = '待测量' | '待审核' | '已通过' | '需复核';

export type Priority = '常规' | '优先' | '急诊';

export type ContourKind = 'annulus' | 'lvot';

export type LandmarkKind =
  | 'ostium-left'
  | 'ostium-right'
  | 'axis-aortic'
  | 'axis-lv'
  | 'caliper'
  /** iliofemoral access vessel caliper (minimum luminal diameter) */
  | 'access-caliper';

export interface Person {
  id: string;
  name: string;
  title: string;
  role: Role;
}

/** Geometry of a stacked CT series. World coordinates are millimetres. */
export interface VolumeMeta {
  id: string;
  width: number;
  height: number;
  depth: number;
  /** sx, sy, sz in mm */
  spacing: Vec3;
  origin: Vec3;
  /** direction cosines of the image column axis (x) */
  axisU: Vec3;
  /** direction cosines of the image row axis (y) */
  axisV: Vec3;
  normal: Vec3;
  minHU: number;
  maxHU: number;
  description: string;
  studyDate: string;
  patientLabel: string;
  source: 'dicom' | 'synthetic';
  sliceLocations?: number[];
}

export interface Volume extends VolumeMeta {
  voxels: Int16Array;
}

/** 技师维护的测量口径 */
export interface Conventions {
  annulusContour: '内缘' | '中心线';
  perimeterMethod: '样条' | '折线';
  lvotOffsetMm: number;
  coronaryHeightRef: '开口下缘' | '开口中心';
  sizingReference: '周长派生径' | '面积派生径';
  minOversizePct: number;
  maxOversizePct: number;
  targetOversizePct: number;
  frameClearanceMinMm: number;
  ostiumHeightMinMm: number;
  pvlGapMm: number;
  calcThresholdHU: number;
  calcSectorCount: number;
  calcBandMm: number;
  calcStiffnessGain: number;
  annularThicknessMm: number;
  updatedAt: number;
  updatedBy: string;
}

export interface PixelPoint {
  slice: number;
  /** column */
  x: number;
  /** row */
  y: number;
}

export interface Contour {
  id: string;
  kind: ContourKind;
  /** axial slice index */
  slice: number;
  points: PixelPoint[];
}

export interface Landmark {
  id: string;
  kind: LandmarkKind;
  /** world coordinates (mm) of the picked point */
  a: Vec3;
  /** second world point, only for caliper / axis landmarks */
  b?: Vec3;
  /** where it was picked, for traceability */
  pickedOn: 'axial' | 'longaxis' | 'enface';
  pickedSlice?: number;
}

export type ViewMode = 'axial' | 'longaxis' | 'enface';

export interface ViewPlane {
  mode: ViewMode;
  /** world origin of the top-left pixel */
  origin: Vec3;
  /** unit vectors of increasing column / row */
  u: Vec3;
  v: Vec3;
  normal: Vec3;
  /** in-plane pixel spacing, mm */
  spacing: [number, number];
  cols: number;
  rows: number;
  /** label shown in the corner */
  label: string;
  /** axial slice index when mode = axial */
  slice?: number;
}

export interface RingMetrics {
  center: Vec3;
  normal: Vec3;
  basisU: Vec3;
  basisV: Vec3;
  /** smooth closed outline resampled in the fitted plane, mm */
  outline: Vec2[];
  points3d: Vec3[];
  perimeterMm: number;
  areaMm2: number;
  dPerimMm: number;
  dAreaMm: number;
  dMinMm: number;
  dMaxMm: number;
  eccentricity: number;
  planarityRmsMm: number;
  planeAngleDeg: number;
  radiusProfile: number[];
  sliceSpan: number[];
}

export interface CalcSector {
  index: number;
  startDeg: number;
  endDeg: number;
  clockStart: number;
  clockEnd: number;
  volumeMm3: number;
  maxHU: number;
  meanHU: number;
  burden: number;
}

export interface CalcDistribution {
  sectors: CalcSector[];
  totalVolumeMm3: number;
  peakHU: number;
  burdenScore: number;
  hotSectors: number[];
  thresholdHU: number;
  bandMm: number;
}

export interface LvotMetrics {
  slice: number;
  offsetMm: number;
  areaMm2: number;
  perimeterMm: number;
  dAreaMm: number;
  dPerimMm: number;
  distanceToAnnulusPlaneMm: number;
  center: Vec3;
}

export interface CoronaryMetric {
  point: Vec3;
  slice: number;
  heightMm: number;
  ostiumRadiusMm: number;
}

export interface AngulationMetrics {
  aortoVentricularDeg: number;
  /** measured minimum access vessel diameter, mm */
  accessMinDiameterMm: number | null;
  accessLocation?: { slice: number; a: Vec3; b: Vec3 };
  annularPlaneDeg: number;
  aorticAxis: [Vec3, Vec3] | null;
  lvAxis: [Vec3, Vec3] | null;
}

export interface MeasurementSummary {
  ring: RingMetrics;
  lvot: LvotMetrics | null;
  calc: CalcDistribution | null;
  coronaries: { left: CoronaryMetric | null; right: CoronaryMetric | null };
  angulation: AngulationMetrics | null;
  contouredSlices: number;
  updatedAt: number;
}

export interface Measurement {
  contours: Contour[];
  landmarks: Landmark[];
}

export interface ValveSize {
  nominalMm: number;
  label: string;
}

export interface ValveModel {
  id: string;
  brand: string;
  name: string;
  type: '自膨胀' | '球囊扩张' | '机械扩张';
  active: boolean;
  frameHeightMm: number;
  skirtHeightMm: number;
  /** portion of the frame that can obstruct a coronary ostium */
  riskZoneHeightMm: number;
  radialForceNPerMm: number;
  cellCount: number;
  shape: 'flare' | 'taper' | 'straight';
  sizes: ValveSize[];
  notes: string;
}

export type FlagSeverity = 'warn' | 'info';

export interface ReleaseFlag {
  code: string;
  severity: FlagSeverity;
  title: string;
  detail: string;
  value?: string;
}

export interface SizingResult {
  valveModelId: string;
  valveModelName: string;
  valveLabel: string;
  nominalMm: number;
  refDiameterMm: number;
  refBasis: string;
  oversizePct: number;
  recommendedNominalMm: number | null;
  recommendedLabel: string | null;
  withinRange: boolean;
  computedAt: number;
}

export interface CoronaryAssessment {
  /** frame surface to ostium radial clearance, mm (negative = overlap) */
  distanceMm: number | null;
  heightMm: number | null;
  /** ostium height minus the frame's coronary risk-zone height */
  verticalClearanceMm: number | null;
  /** 3D distance from the ostium centre to the nearest frame surface, mm */
  distance3dMm?: number;
  /** ostium marked below the annulus plane -> likely a marking error */
  belowAnnulus?: boolean;
  /** ostium height below the configured clinical minimum */
  lowHeight?: boolean;
  ok: boolean;
}

export interface ReleaseResult {
  radiusProfile: number[];
  underExpansionPct: number[];
  gapsMm: number[];
  pvlSectors: number[];
  pvlArcPct: number;
  maxGapMm: number;
  meanGapMm: number;
  coronary: { left: CoronaryAssessment; right: CoronaryAssessment };
  flags: ReleaseFlag[];
  depthMm: number;
  frameTopAboveAnnulusMm: number;
  computedAt: number;
}

export interface Justification {
  text: string;
  by: string;
  at: number;
  flags: string[];
  nominalMm: number;
}

export interface ReviewRecord {
  reviewer: string;
  at: number;
  decision: '通过' | '退回';
  comment: string;
  reasonCodes: string[];
  /** size the reviewer signed off (implanted / planned) */
  finalNominalMm?: number;
}

export interface ReportRecord {
  at: number;
  by: string;
  screenshot?: string;
  summary: string;
}

export interface AuditEntry {
  at: number;
  by: string;
  role: Role;
  action: string;
  detail: string;
}

export interface CaseDoc {
  id: string;
  orderNo: string;
  patient: { name: string; sex: '男' | '女'; age: number; mrn: string };
  operatorId: string;
  requester: string;
  createdAt: number;
  updatedAt: number;
  status: CaseStatus;
  priority: Priority;
  indication: string;
  notes: string;
  volumeRef: string;
  volumeMeta?: Omit<VolumeMeta, 'id'>;
  measurement: Measurement;
  summary?: MeasurementSummary;
  sizing?: SizingResult;
  release?: ReleaseResult;
  justification?: Justification;
  review?: ReviewRecord;
  report?: ReportRecord;
  submittedAt?: number;
  submissionCount: number;
  returnCount: number;
  audit: AuditEntry[];
}

export interface AppState {
  role: Role;
  people: Person[];
  cases: CaseDoc[];
  valves: ValveModel[];
  conventions: Conventions;
  version: number;
  lastSavedAt: number;
}

export interface OperatorStats {
  operatorId: string;
  name: string;
  total: number;
  measured: number;
  submitted: number;
  approved: number;
  returned: number;
  firstPass: number;
  firstPassRate: number;
  accurateSize: number;
  accurateSizeRate: number;
  avgReturns: number;
  avgOversize: number;
  pending: number;
}
