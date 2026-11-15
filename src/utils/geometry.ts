// 几何与测量：像素 ↔ mm 换算、面积、旋转卡壳长/短径、覆盖对账

import type { Calibration, Point, Polygon, Reconciliation, SpecimenBlock } from '../types';

export function uid(prefix = 'id'): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

export function dist(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/** 由标定计算：每像素对应的毫米数（像素为正方形，x/y 同尺度） */
export function mmPerPixel(cal: Calibration, imgW: number, imgH: number): number {
  const dx = (cal.p1.x - cal.p2.x) * imgW;
  const dy = (cal.p1.y - cal.p2.y) * imgH;
  const pxLen = Math.hypot(dx, dy);
  if (pxLen < 1e-6) return NaN;
  return cal.knownLengthMm / pxLen;
}

/** 归一化点 → 物理 mm 坐标（标定基于像素长度，x/y 各自换算） */
export function normToMmPoints(points: Point[], scale: number, imgW: number, imgH: number): Point[] {
  return points.map((p) => ({ x: p.x * imgW * scale, y: p.y * imgH * scale }));
}

/** mm 坐标系下的多边形面积 */
export function polygonAreaMm(points: Point[]): number {
  if (points.length < 3) return 0;
  let sum = 0;
  for (let i = 0; i < points.length; i++) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    sum += a.x * b.y - b.x * a.y;
  }
  return Math.abs(sum) / 2;
}

/** 鞋带公式：多边形面积（归一化单位²） */
export function polygonAreaNorm(poly: Point[]): number {
  if (poly.length < 3) return 0;
  let sum = 0;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    sum += a.x * b.y - b.x * a.y;
  }
  return Math.abs(sum) / 2;
}

/** 凸包（Andrew monotone chain），用于稳定地求直径/短径 */
export function convexHull(points: Point[]): Point[] {
  const pts = [...points].sort((a, b) => (a.x - b.x || a.y - b.y));
  if (pts.length <= 2) return pts;
  const cross = (o: Point, a: Point, b: Point) =>
    (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  const lower: Point[] = [];
  for (const p of pts) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
    lower.push(p);
  }
  const upper: Point[] = [];
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
    upper.push(p);
  }
  lower.pop();
  upper.pop();
  return lower.concat(upper);
}

/**
 * 旋转卡壳：返回凸包的直径（最长对踵点距离，归一化单位）
 */
export function diameterNorm(hull: Point[]): number {
  const n = hull.length;
  if (n < 2) return 0;
  if (n === 2) return dist(hull[0], hull[1]);
  let best = 0;
  let j = 1;
  const area2 = (a: Point, b: Point, c: Point) =>
    Math.abs((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x));
  for (let i = 0; i < n; i++) {
    const ni = (i + 1) % n;
    while (area2(hull[i], hull[ni], hull[(j + 1) % n]) > area2(hull[i], hull[ni], hull[j])) {
      j = (j + 1) % n;
    }
    best = Math.max(best, dist(hull[i], hull[j]), dist(hull[ni], hull[j]));
  }
  return best;
}

/**
 * 最小外接矩形（旋转卡壳旋转枚举），返回 { 长边, 短边 }（归一化单位）。
 * 对凸包每条边枚举方向，取包围矩形面积最小者。
 */
export function minBoundingRectNorm(hull: Point[]): { long: number; short: number } {
  const n = hull.length;
  if (n < 3) {
    const d = n === 2 ? dist(hull[0], hull[1]) : 0;
    return { long: d, short: 0 };
  }
  let bestArea = Infinity;
  let bestLong = 0;
  let bestShort = 0;
  for (let i = 0; i < n; i++) {
    const a = hull[i];
    const b = hull[(i + 1) % n];
    const angle = Math.atan2(b.y - a.y, b.x - a.x);
    const cos = Math.cos(-angle);
    const sin = Math.sin(-angle);
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    for (const p of hull) {
      const rx = p.x * cos - p.y * sin;
      const ry = p.x * sin + p.y * cos;
      minX = Math.min(minX, rx);
      maxX = Math.max(maxX, rx);
      minY = Math.min(minY, ry);
      maxY = Math.max(maxY, ry);
    }
    const w = maxX - minX;
    const h = maxY - minY;
    const area = w * h;
    if (area < bestArea) {
      bestArea = area;
      bestLong = Math.max(w, h);
      bestShort = Math.min(w, h);
    }
  }
  return { long: bestLong, short: bestShort };
}

/** 归一化长度 → mm（图像宽高分别标定，长度按方向折算） */
export function normLenToMm(dxNorm: number, dyNorm: number, scale: number, imgW: number, imgH: number): number {
  return Math.hypot(dxNorm * imgW * scale, dyNorm * imgH * scale);
}

export interface CaseMeasureInput {
  lesion?: Polygon;
  lifting?: Polygon;
  incision?: Polygon;
  calibration: Calibration | null;
  imgW: number;
  imgH: number;
}

export interface CaseMeasureResult {
  longAxisMm: number;
  shortAxisMm: number;
  areaMm2: number;
  incisionAreaMm2: number;
  liftingAreaMm2: number;
  /** 是否具备有效标定（false 时各尺寸为 0） */
  calibrated: boolean;
}

export function measureCase(input: CaseMeasureInput): CaseMeasureResult {
  const zero: CaseMeasureResult = {
    longAxisMm: 0,
    shortAxisMm: 0,
    areaMm2: 0,
    incisionAreaMm2: 0,
    liftingAreaMm2: 0,
    calibrated: false,
  };
  const { lesion, lifting, incision, calibration, imgW, imgH } = input;
  if (!calibration || !lesion || lesion.points.length < 3) return zero;
  const scale = mmPerPixel(calibration, imgW, imgH);
  if (!Number.isFinite(scale)) return zero;

  // 先把归一化多边形变换到 mm 物理坐标，再在各向同性的 mm 空间求径线与面积
  const lesionMm = normToMmPoints(lesion.points, scale, imgW, imgH);
  const hull = convexHull(lesionMm);
  const { long, short } = minBoundingRectNorm(hull);
  const areaMm2 = polygonAreaMm(lesionMm);
  const incisionAreaMm2 = incision ? polygonAreaMm(normToMmPoints(incision.points, scale, imgW, imgH)) : 0;
  const liftingAreaMm2 = lifting ? polygonAreaMm(normToMmPoints(lifting.points, scale, imgW, imgH)) : 0;
  return {
    longAxisMm: round2(long),
    shortAxisMm: round2(short),
    areaMm2: round2(areaMm2),
    incisionAreaMm2: round2(incisionAreaMm2),
    liftingAreaMm2: round2(liftingAreaMm2),
    calibrated: true,
  };
}

/** 取材对账：块总面积 vs 切开面积；块数 × 块长 vs 病变长径 */
export function reconcileBlocks(
  blocks: SpecimenBlock[],
  m: CaseMeasureResult | null,
): Reconciliation {
  const totalBlockAreaMm2 = round2(blocks.reduce((s, b) => s + b.lengthMm * b.widthMm, 0));
  const warnings: string[] = [];
  if (!m || !m.calibrated) {
    return {
      totalBlockAreaMm2,
      blockCount: blocks.length,
      areaCovered: false,
      longAxisCovered: false,
      passed: false,
      warnings: ['缺少比例尺标定或病变边界，无法对账'],
    };
  }
  const areaCovered = m.incisionAreaMm2 > 0 ? totalBlockAreaMm2 >= m.incisionAreaMm2 : totalBlockAreaMm2 >= m.areaMm2;
  const maxBlockLen = blocks.reduce((mx, b) => Math.max(mx, b.lengthMm), 0);
  const longAxisCovered = blocks.length > 0 && maxBlockLen >= m.longAxisMm;
  if (blocks.length === 0) warnings.push('病理申请单未填写取材块');
  if (!areaCovered) {
    const target = m.incisionAreaMm2 > 0 ? m.incisionAreaMm2 : m.areaMm2;
    warnings.push(`取材总面积 ${totalBlockAreaMm2.toFixed(1)} mm² 小于切开范围 ${target.toFixed(1)} mm²，取材盖不住切开线`);
  }
  if (!longAxisCovered) {
    warnings.push(`最长取材块 ${maxBlockLen.toFixed(1)} mm 短于病变长径 ${m.longAxisMm.toFixed(1)} mm，长径方向可能漏切`);
  }
  return {
    totalBlockAreaMm2,
    blockCount: blocks.length,
    areaCovered,
    longAxisCovered,
    passed: areaCovered && longAxisCovered && blocks.length > 0,
    warnings,
  };
}

/** 点到线段距离（归一化坐标） */
export function distToSegment(p: Point, a: Point, b: Point): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len2 = dx * dx + dy * dy;
  if (len2 < 1e-9) return dist(p, a);
  let t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
}

/** 命中多边形顶点：返回顶点下标，否则 -1 */
export function hitVertex(poly: Polygon, p: Point, thresholdNorm: number): number {
  for (let i = 0; i < poly.points.length; i++) {
    if (dist(poly.points[i], p) <= thresholdNorm) return i;
  }
  return -1;
}

/** 命中多边形边：返回插入位置（在该边之后插入），否则 -1 */
export function hitEdge(poly: Polygon, p: Point, thresholdNorm: number): number {
  for (let i = 0; i < poly.points.length; i++) {
    const a = poly.points[i];
    const b = poly.points[(i + 1) % poly.points.length];
    if (distToSegment(p, a, b) <= thresholdNorm) return i + 1;
  }
  return -1;
}

export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function formatMm(n: number): string {
  return `${n.toFixed(1)} mm`;
}

export function formatArea(n: number): string {
  if (n >= 100) return `${(n / 100).toFixed(2)} cm²`;
  return `${n.toFixed(1)} mm²`;
}
