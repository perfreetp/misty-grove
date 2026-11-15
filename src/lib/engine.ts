// ===== 道路几何、工程量与校核计算引擎 =====
import type { Approach, CheckIssue, Metrics, Pier, Scheme } from '../types';
import {
  APPROACH_COST,
  CLEARANCE_WARN,
  DEFAULT_GIRDER_DEPTH,
  FOOTPRINT_FACTOR,
  MATERIAL_SPECS,
  MIN_CLEARANCE,
  PIER,
  RAILING_PRICE_PER_M,
  RAILING_STEEL_PER_M,
  RAMP_SLOPE_LIMIT,
  STAIR_SLOPE_LIMIT,
} from './constants';

export interface RoadGeometry {
  /** 行车道外缘（含硬路肩）半幅宽度，米 */
  roadwayHalfWidth: number;
  /** 公路用地界半宽，米 */
  rightOfWayHalfWidth: number;
  /** 单幅行车道 X 区间（左、右） */
  carriageways: { xStart: number; xEnd: number }[];
  /** 中央分隔带 X 区间 */
  median: { xStart: number; xEnd: number };
}

/** 由车道数推算道路横断面几何（X=0 为道路中线） */
export function roadGeometry(s: Scheme): RoadGeometry {
  const carriageHalf = s.lanesPerSide * s.laneWidth + s.shoulderWidth;
  const medianHalf = s.medianWidth / 2;
  return {
    roadwayHalfWidth: carriageHalf,
    rightOfWayHalfWidth: carriageHalf + 3.0, // 用地界外留 3m
    carriageways: [
      { xStart: -carriageHalf, xEnd: -medianHalf },
      { xStart: medianHalf, xEnd: carriageHalf },
    ],
    median: { xStart: -medianHalf, xEnd: medianHalf },
  };
}

/** 桥下净空 = 梁底高程 − 路面高程 */
export function calcClearance(s: Scheme): number {
  return s.girderBottomElev - s.roadElevation;
}

/** 桥面铺装顶高程 */
export function deckTopElev(s: Scheme): number {
  return s.girderBottomElev + s.girderDepth + 0.08;
}

/** 接入设施爬升高度（桥面顶 − 外侧地面，外侧地面按路面高程计） */
export function approachRise(s: Scheme): number {
  return deckTopElev(s) - s.roadElevation;
}

function overlap(a1: number, a2: number, b1: number, b2: number): boolean {
  return a1 < b2 && b1 < a2;
}

/** 判断墩位是否落在行车道内（含硬路肩） */
export function pierInCarriageway(p: Pier, road: RoadGeometry): boolean {
  const half = p.thickness / 2;
  return road.carriageways.some((c) => overlap(p.x - half, p.x + half, c.xStart, c.xEnd));
}

/** 判断墩位是否落在管线保护范围内 */
export function pierInPipeline(p: Pier, s: Scheme): string | null {
  const half = p.thickness / 2;
  for (const z of s.pipelines) {
    if (overlap(p.x - half, p.x + half, z.xStart, z.xEnd)) return z.name;
  }
  return null;
}

/** 坡度（rise/run）；电梯返回 null */
export function approachSlope(s: Scheme, a: Approach): number | null {
  if (a.type === 'elevator') return null;
  return approachRise(s) / a.run;
}

export function ratioText(slope: number): string {
  return `1:${(1 / slope).toFixed(1)}`;
}

/** 全量校核，返回问题清单（含挂靠构件 id，供三维标红 / 标黄） */
export function runChecks(s: Scheme): CheckIssue[] {
  const issues: CheckIssue[] = [];
  const road = roadGeometry(s);
  const clearance = calcClearance(s);

  // —— 净空 ——
  if (clearance < MIN_CLEARANCE) {
    issues.push({
      level: 'error',
      code: 'CLEARANCE_LOW',
      message: `桥下净空 ${clearance.toFixed(2)}m，低于 ${MIN_CLEARANCE.toFixed(1)}m 控制标准`,
      componentId: 'main-girder',
    });
  } else if (clearance < CLEARANCE_WARN) {
    issues.push({
      level: 'warning',
      code: 'CLEARANCE_TIGHT',
      message: `桥下净空 ${clearance.toFixed(2)}m，富余不足 0.5m，建议复核`,
      componentId: 'main-girder',
    });
  }

  // —— 桥墩 ——
  for (const p of s.piers) {
    if (pierInCarriageway(p, road)) {
      issues.push({
        level: 'error',
        code: 'PIER_IN_LANE',
        message: `桥墩「${p.name}」落在行车道（含硬路肩）范围内`,
        componentId: p.id,
      });
    }
    const pipe = pierInPipeline(p, s);
    if (pipe) {
      issues.push({
        level: 'error',
        code: 'PIER_IN_PIPELINE',
        message: `桥墩「${p.name}」落在管线保护范围「${pipe}」内`,
        componentId: p.id,
      });
    }
  }

  // —— 梯道坡度（陡于 1:4 提示）；坡道按 1:10 提示 ——
  for (const a of s.approaches) {
    const slope = approachSlope(s, a);
    if (slope === null) continue;
    const limit = a.type === 'stair' ? STAIR_SLOPE_LIMIT : RAMP_SLOPE_LIMIT;
    const label = a.type === 'stair' ? '梯道' : '坡道';
    if (slope > limit) {
      issues.push({
        level: 'warning',
        code: 'SLOPE_STEEP',
        message: `${label}坡度 ${ratioText(slope)}（${(slope * 100).toFixed(1)}%）${
          a.type === 'stair' ? '陡于 1:4' : '陡于 1:10'
        }，请优化`,
        componentId: a.id,
      });
    }
  }

  // —— 接入设施完整性 ——
  const sides = new Set(s.approaches.map((a) => a.side));
  for (const side of ['left', 'right'] as const) {
    if (!sides.has(side)) {
      issues.push({
        level: 'warning',
        code: 'APPROACH_MISSING',
        message: `${side === 'left' ? '左' : '右'}侧未布置任何接入设施`,
        componentId: null,
      });
    }
  }

  return issues;
}

export function hasBlockingErrors(issues: CheckIssue[]): boolean {
  return issues.some((i) => i.level === 'error');
}

/** 工程量、造价、占地、封闭工期计算 */
export function calcMetrics(s: Scheme): Metrics {
  const spec = MATERIAL_SPECS[s.material];
  const deckArea = s.span * s.deckWidth;

  // —— 主梁 / 梁体 ——
  const girderSteel = spec.steelPerM2 * deckArea;
  const girderConcrete = spec.concretePerM2 * deckArea;
  const girderRebar = spec.rebarPerM3 * girderConcrete;
  const girderCost = spec.girderPricePerM2 * deckArea;
  const deckCost = spec.deckPricePerM2 * deckArea;

  // —— 桥墩（按梁底到地面高度估算柱身） ——
  const pierHeight = Math.max(2, s.girderBottomElev - s.roadElevation + 1.0);
  let pierConcrete = 0;
  let pierCost = 0;
  for (const p of s.piers) {
    const vol = p.thickness * p.width * pierHeight;
    pierConcrete += vol;
    pierCost += vol * PIER.concretePrice + PIER.foundationPrice;
  }
  const pierRebar = pierConcrete * PIER.rebarPerM3;

  // —— 接入设施 ——
  let approachCost = 0;
  let approachSteel = 0;
  let approachConcrete = 0;
  let footprintApproach = 0;
  const slopeWarnings: Metrics['slopeWarnings'] = [];

  for (const a of s.approaches) {
    const area = a.type === 'elevator' ? 0 : a.run * a.width;
    if (a.type === 'stair') {
      approachCost += area * APPROACH_COST.stair.pricePerM2;
      approachSteel += area * APPROACH_COST.stair.steelPerM2;
      footprintApproach += area;
    } else if (a.type === 'ramp') {
      approachCost += area * APPROACH_COST.ramp.pricePerM2;
      approachConcrete += area * APPROACH_COST.ramp.concretePerM2;
      footprintApproach += area;
    } else {
      approachCost += APPROACH_COST.elevator.priceEach;
      approachSteel += APPROACH_COST.elevator.steelEach;
      footprintApproach += 3.5 * 3.0; // 电梯井道平面
    }
    const slope = approachSlope(s, a);
    if (slope !== null) {
      const limit = a.type === 'stair' ? STAIR_SLOPE_LIMIT : RAMP_SLOPE_LIMIT;
      if (slope > limit) slopeWarnings.push({ approachId: a.id, slope, ratioText: ratioText(slope) });
    }
  }

  // —— 栏杆 ——
  const railingCost = s.span * RAILING_PRICE_PER_M;
  const railingSteel = s.span * RAILING_STEEL_PER_M;

  const steelTons = girderSteel + girderRebar + pierRebar + approachSteel + railingSteel;
  const concreteM3 = girderConcrete + pierConcrete + approachConcrete;
  const costWan = girderCost + deckCost + pierCost + approachCost + railingCost;

  // —— 占地：桥跨投影（用地界内）+ 两侧接入设施投影 ——
  const road = roadGeometry(s);
  const bridgeFootprint = Math.min(s.span, road.rightOfWayHalfWidth * 2) * s.deckWidth;
  const footprintM2 = (bridgeFootprint + footprintApproach) * FOOTPRINT_FACTOR;

  // —— 封闭施工天数 ——
  const closureDays = Math.round(spec.closureBase + spec.closurePerSpanM * s.span + s.piers.length * 2);

  return {
    clearance: calcClearance(s),
    steelTons,
    concreteM3,
    costWan,
    footprintM2,
    closureDays,
    slopeWarnings,
  };
}

/** 新建方案时给出与材料匹配的默认梁高 */
export function defaultGirderDepth(material: Scheme['material']): number {
  return DEFAULT_GIRDER_DEPTH[material];
}

/** 错误/警告构件 id 集合，供场景标红、标黄 */
export function flaggedComponentIds(issues: CheckIssue[]): {
  errors: Set<string>;
  warnings: Set<string>;
} {
  const errors = new Set<string>();
  const warnings = new Set<string>();
  for (const i of issues) {
    if (!i.componentId) continue;
    (i.level === 'error' ? errors : warnings).add(i.componentId);
  }
  return { errors, warnings: new Set([...warnings].filter((id) => !errors.has(id))) };
}
