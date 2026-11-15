import type { Contour, PixelPoint, Vec2, Vec3 } from './types';

export const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
export const add = (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
export const scale = (a: Vec3, s: number): Vec3 => [a[0] * s, a[1] * s, a[2] * s];
export const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
export const cross = (a: Vec3, b: Vec3): Vec3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
export const norm = (a: Vec3) => Math.sqrt(dot(a, a));
export const normalize = (a: Vec3): Vec3 => {
  const n = norm(a) || 1;
  return [a[0] / n, a[1] / n, a[2] / n];
};
export const dist3 = (a: Vec3, b: Vec3) => norm(sub(a, b));
export const lerp3 = (a: Vec3, b: Vec3, t: number): Vec3 => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

export function meanPoint(points: Vec3[]): Vec3 {
  const out: Vec3 = [0, 0, 0];
  for (const p of points) {
    out[0] += p[0];
    out[1] += p[1];
    out[2] += p[2];
  }
  const n = points.length || 1;
  return [out[0] / n, out[1] / n, out[2] / n];
}

/** Newell's method – robust normal for a (possibly non-planar) closed polygon. */
export function polygonNormal(points: Vec3[]): Vec3 {
  const n: Vec3 = [0, 0, 0];
  for (let i = 0; i < points.length; i++) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    n[0] += (a[1] - b[1]) * (a[2] + b[2]);
    n[1] += (a[2] - b[2]) * (a[0] + b[0]);
    n[2] += (a[0] - b[0]) * (a[1] + b[1]);
  }
  return normalize(n);
}

export function anyPerpendicular(n: Vec3): Vec3 {
  const candidate: Vec3 = Math.abs(n[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0];
  return normalize(cross(n, candidate));
}

/** Centroid of a polygon in its own plane. */
export function polygonCentroid(points: Vec3[], normal: Vec3): Vec3 {
  let cx = 0;
  let cy = 0;
  let cz = 0;
  let area = 0;
  for (let i = 0; i < points.length; i++) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    const cr = cross(a, b);
    const w = dot(cr, normal);
    cx += (a[0] + b[0]) * w;
    cy += (a[1] + b[1]) * w;
    cz += (a[2] + b[2]) * w;
    area += w;
  }
  if (Math.abs(area) < 1e-6) return meanPoint(points);
  return [cx / (3 * area), cy / (3 * area), cz / (3 * area)];
}

/** Project 3D points onto a plane basis returning 2D coordinates. */
export function projectToPlane(points: Vec3[], origin: Vec3, u: Vec3, v: Vec3): Vec2[] {
  return points.map((p) => {
    const d = sub(p, origin);
    return [dot(d, u), dot(d, v)] as Vec2;
  });
}

export function signedArea2D(poly: Vec2[]): number {
  let a = 0;
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i];
    const q = poly[(i + 1) % poly.length];
    a += p[0] * q[1] - q[0] * p[1];
  }
  return a / 2;
}

export function perimeter2D(poly: Vec2[]): number {
  let len = 0;
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i];
    const q = poly[(i + 1) % poly.length];
    len += Math.hypot(q[0] - p[0], q[1] - p[1]);
  }
  return len;
}

function catmullRomSample(p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2, t: number): Vec2 {
  const t2 = t * t;
  const t3 = t2 * t;
  const f = (a: number, b: number, c: number, d: number) =>
    0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
  return [f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])];
}

/** Resample a closed polyline with a centripetal-ish Catmull-Rom spline. */
export function smoothClosed(points: Vec2[], perSegment = 8): Vec2[] {
  if (points.length < 3) return points.slice();
  const n = points.length;
  const out: Vec2[] = [];
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    for (let s = 0; s < perSegment; s++) {
      out.push(catmullRomSample(p0, p1, p2, p3, s / perSegment));
    }
  }
  return out;
}

export function resampleClosed(points: Vec2[], count: number): Vec2[] {
  if (points.length < 2) return points.slice();
  const total = perimeter2D(points);
  const step = total / count;
  const out: Vec2[] = [];
  let seg = 0;
  let acc = 0;
  let segLen = Math.hypot(points[1][0] - points[0][0], points[1][1] - points[0][1]);
  for (let k = 0; k < count; k++) {
    const target = k * step;
    while (acc + segLen < target && seg < points.length - 1) {
      acc += segLen;
      seg++;
      const a = points[seg];
      const b = points[(seg + 1) % points.length];
      segLen = Math.hypot(b[0] - a[0], b[1] - a[1]);
    }
    const a = points[seg % points.length];
    const b = points[(seg + 1) % points.length];
    const t = segLen > 1e-9 ? (target - acc) / segLen : 0;
    out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
  }
  return out;
}

/** Least squares circle through 2D points. Returns center + radius. */
export function fitCircle2D(points: Vec2[]): { center: Vec2; radius: number; rms: number } {
  let sxx = 0;
  let sxy = 0;
  let syy = 0;
  let sx = 0;
  let sy = 0;
  let sxz = 0;
  let syz = 0;
  let sz = 0;
  const n = points.length;
  for (const [x, y] of points) {
    const z = x * x + y * y;
    sxx += x * x;
    sxy += x * y;
    syy += y * y;
    sx += x;
    sy += y;
    sxz += x * z;
    syz += y * z;
    sz += z;
  }
  const a11 = sxx;
  const a12 = sxy;
  const a13 = sx;
  const a22 = syy;
  const a23 = sy;
  const a33 = n;
  const det =
    a11 * (a22 * a33 - a23 * a23) - a12 * (a12 * a33 - a23 * a13) + a13 * (a12 * a23 - a22 * a13);
  if (Math.abs(det) < 1e-9) return { center: [sx / n, sy / n], radius: 0, rms: 0 };
  const b1 = sxz;
  const b2 = syz;
  const b3 = sz;
  const inv = (m: number[][]) => m;
  void inv;
  // Cramer's rule
  const detA = det;
  const detX =
    b1 * (a22 * a33 - a23 * a23) - a12 * (b2 * a33 - a23 * b3) + a13 * (b2 * a23 - a22 * b3);
  const detY =
    a11 * (b2 * a33 - a23 * b3) - b1 * (a12 * a33 - a23 * a13) + a13 * (a12 * b3 - b2 * a13);
  const detZ =
    a11 * (a22 * b3 - b2 * a23) - a12 * (a12 * b3 - b2 * a13) + b1 * (a12 * a23 - a22 * a13);
  const A = detX / detA;
  const B = detY / detA;
  const C = detZ / detA;
  const cx = A / 2;
  const cy = B / 2;
  const r2 = C + cx * cx + cy * cy;
  const radius = Math.sqrt(Math.max(r2, 0));
  let sq = 0;
  for (const [x, y] of points) {
    const d = Math.hypot(x - cx, y - cy) - radius;
    sq += d * d;
  }
  return { center: [cx, cy], radius, rms: Math.sqrt(sq / Math.max(n, 1)) };
}

export function circleAreaRadius(area: number) {
  return Math.sqrt(Math.max(area, 0) / Math.PI);
}

export function circlePerimeterRadius(perimeter: number) {
  return perimeter / (2 * Math.PI);
}

/** PCA on 3D points; returns centroid and orthonormal frame sorted by variance. */
export function planeFit(points: Vec3[]): {
  centroid: Vec3;
  normal: Vec3;
  u: Vec3;
  v: Vec3;
  rms: number;
  eigenvalues: [number, number, number];
} {
  const centroid = meanPoint(points);
  let xx = 0;
  let xy = 0;
  let xz = 0;
  let yy = 0;
  let yz = 0;
  let zz = 0;
  for (const p of points) {
    const dx = p[0] - centroid[0];
    const dy = p[1] - centroid[1];
    const dz = p[2] - centroid[2];
    xx += dx * dx;
    xy += dx * dy;
    xz += dx * dz;
    yy += dy * dy;
    yz += dy * dz;
    zz += dz * dz;
  }
  const m = [
    [xx, xy, xz],
    [xy, yy, yz],
    [xz, yz, zz],
  ];
  const { values, vectors } = eigenSym3(m);
  // smallest eigenvalue's eigenvector = plane normal
  const order = [0, 1, 2].sort((a, b) => values[b] - values[a]);
  const nrm = normalize([
    vectors[0][order[2]],
    vectors[1][order[2]],
    vectors[2][order[2]],
  ]);
  const u0 = normalize([vectors[0][order[0]], vectors[1][order[0]], vectors[2][order[0]]]);
  const u = normalize(sub(u0, scale(nrm, dot(u0, nrm))));
  const v = normalize(cross(nrm, u));
  let sq = 0;
  for (const p of points) {
    const d = dot(sub(p, centroid), nrm);
    sq += d * d;
  }
  return {
    centroid,
    normal: nrm,
    u,
    v,
    rms: Math.sqrt(sq / Math.max(points.length, 1)),
    eigenvalues: [values[order[0]], values[order[1]], values[order[2]]],
  };
}

function eigenSym3(a: number[][]): { values: number[]; vectors: number[][] } {
  // Jacobi eigenvalue iteration for symmetric 3x3.
  const m = a.map((r) => r.slice());
  const v = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  for (let sweep = 0; sweep < 24; sweep++) {
    let off = 0;
    for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) off += m[i][j] * m[i][j];
    if (off < 1e-14) break;
    for (let p = 0; p < 2; p++) {
      for (let q = p + 1; q < 3; q++) {
        if (Math.abs(m[p][q]) < 1e-15) continue;
        const theta = (m[q][q] - m[p][p]) / (2 * m[p][q]);
        const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
        const c = 1 / Math.sqrt(t * t + 1);
        const s = t * c;
        for (let k = 0; k < 3; k++) {
          const mkp = m[k][p];
          const mkq = m[k][q];
          m[k][p] = c * mkp - s * mkq;
          m[k][q] = s * mkp + c * mkq;
        }
        for (let k = 0; k < 3; k++) {
          const mpk = m[p][k];
          const mqk = m[q][k];
          m[p][k] = c * mpk - s * mqk;
          m[q][k] = s * mpk + c * mqk;
        }
        for (let k = 0; k < 3; k++) {
          const vkp = v[k][p];
          const vkq = v[k][q];
          v[k][p] = c * vkp - s * vkq;
          v[k][q] = s * vkp + c * vkq;
        }
      }
    }
  }
  return { values: [m[0][0], m[1][1], m[2][2]], vectors: v };
}

export function pixelToWorld(pt: PixelPoint, vol: {
  spacing: Vec3;
  origin: Vec3;
  axisU?: Vec3;
  axisV?: Vec3;
  normal?: Vec3;
}): Vec3 {
  const u = vol.axisU ?? [1, 0, 0];
  const v = vol.axisV ?? [0, 1, 0];
  const n = vol.normal ?? [0, 0, 1];
  const x = vol.origin[0] + pt.x * vol.spacing[0] * u[0] + pt.y * vol.spacing[1] * v[0] + pt.slice * vol.spacing[2] * n[0];
  const y = vol.origin[1] + pt.x * vol.spacing[0] * u[1] + pt.y * vol.spacing[1] * v[1] + pt.slice * vol.spacing[2] * n[1];
  const z = vol.origin[2] + pt.x * vol.spacing[0] * u[2] + pt.y * vol.spacing[1] * v[2] + pt.slice * vol.spacing[2] * n[2];
  return [x, y, z];
}

export function worldToPixel(p: Vec3, vol: {
  spacing: Vec3;
  origin: Vec3;
  axisU?: Vec3;
  axisV?: Vec3;
  normal?: Vec3;
}): PixelPoint {
  const u = vol.axisU ?? [1, 0, 0];
  const v = vol.axisV ?? [0, 1, 0];
  const n = vol.normal ?? [0, 0, 1];
  const d = sub(p, vol.origin);
  return {
    x: dot(d, u) / vol.spacing[0],
    y: dot(d, v) / vol.spacing[1],
    slice: dot(d, n) / vol.spacing[2],
  };
}

export function angleBetween(a: Vec3, b: Vec3): number {
  const c = Math.max(-1, Math.min(1, dot(normalize(a), normalize(b))));
  return (Math.acos(c) * 180) / Math.PI;
}

/** Point-in-polygon, pixel space. */
export function pointInPolygon(pt: Vec2, poly: PixelPoint[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i].x;
    const yi = poly[i].y;
    const xj = poly[j].x;
    const yj = poly[j].y;
    const intersect = yi > pt[1] !== yj > pt[1] && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi + 1e-12) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

export function contourAtSlice(contours: Contour[], kind: Contour['kind'], slice: number): Contour | undefined {
  return contours.find((c) => c.kind === kind && c.slice === slice && c.points.length >= 3);
}

export function smoothStep(t: number) {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

export interface EllipseFit {
  center: Vec2;
  /** semi-axis lengths, major first */
  a: number;
  b: number;
  /** major axis direction, radians */
  phi: number;
  rms: number;
}

/**
 * Direct least-squares ellipse fit (Fitzgibbon). Falls back to a circle when
 * the points are too few or degenerate. Annulus contours are well modelled by
 * an ellipse, so this is far more stable than per-angle medians on freehand
 * input.
 */
export function fitEllipse2D(points: Vec2[]): EllipseFit | null {
  const n = points.length;
  if (n < 6) return null;
  let mx = 0;
  let my = 0;
  for (const [x, y] of points) {
    mx += x;
    my += y;
  }
  mx /= n;
  my /= n;
  let scaleMax = 0;
  for (const [x, y] of points) scaleMax = Math.max(scaleMax, Math.abs(x - mx), Math.abs(y - my));
  const sc = scaleMax || 1;
  const xs = points.map(([x]) => (x - mx) / sc);
  const ys = points.map(([, y]) => (y - my) / sc);

  // Design matrix for conic ax^2 + bxy + cy^2 + dx + ey + f = 0 with f = 1
  // (points are centred and scaled, so f ~ -1 for an ellipse around origin).
  const M: number[][] = [];
  const rhs: number[] = [];
  for (let i = 0; i < n; i++) {
    const x = xs[i];
    const y = ys[i];
    M.push([x * x, x * y, y * y, x, y]);
    rhs.push(1);
  }
  const sol = solveLeastSquares(M, rhs);
  if (!sol) return null;
  const [A, B, C, D, E] = sol;
  const disc = B * B - 4 * A * C;
  if (disc >= 0 || Math.abs(A) < 1e-12 || Math.abs(C) < 1e-12) return null;
  // Convert to centre / axes.
  const denom = 4 * A * C - B * B;
  const cx0 = (B * E - 2 * C * D) / denom;
  const cy0 = (B * D - 2 * A * E) / denom;
  const Fc = 1 + A * cx0 * cx0 + B * cx0 * cy0 + C * cy0 * cy0 + D * cx0 + E * cy0;
  const theta = 0.5 * Math.atan2(B, A - C);
  const cosT = Math.cos(theta);
  const sinT = Math.sin(theta);
  // rotated quadratic form eigenvalues
  const A2 = A * cosT * cosT + B * cosT * sinT + C * sinT * sinT;
  const C2 = A * sinT * sinT - B * cosT * sinT + C * cosT * cosT;
  const a2 = -Fc / A2;
  const b2 = -Fc / C2;
  if (!(a2 > 0 && b2 > 0)) return null;
  let a = Math.sqrt(a2) * sc;
  let b = Math.sqrt(b2) * sc;
  let phi = theta;
  if (b > a) {
    const t = a;
    a = b;
    b = t;
    phi = theta + Math.PI / 2;
  }
  if (!Number.isFinite(a) || !Number.isFinite(b) || a > sc * 6) return null;
  const center: Vec2 = [cx0 * sc + mx, cy0 * sc + my];
  // residual
  let sq = 0;
  for (const [x, y] of points) {
    const dx = x - center[0];
    const dy = y - center[1];
    const u = dx * Math.cos(phi) + dy * Math.sin(phi);
    const v = -dx * Math.sin(phi) + dy * Math.cos(phi);
    const r = Math.hypot(u / a, v / b);
    sq += (r - 1) ** 2 * (a + b) * 0.5;
  }
  return { center, a, b, phi, rms: Math.sqrt(sq / n) };
}

export function ellipsePoint(e: EllipseFit, t: number): Vec2 {
  const u = e.a * Math.cos(t);
  const v = e.b * Math.sin(t);
  return [e.center[0] + u * Math.cos(e.phi) - v * Math.sin(e.phi), e.center[1] + u * Math.sin(e.phi) + v * Math.cos(e.phi)];
}

/** Gauss-Newton / normal equations solver for small dense systems. */
function solveLeastSquares(M: number[][], rhs: number[]): number[] | null {
  const cols = M[0].length;
  const ata: number[][] = Array.from({ length: cols }, () => new Array(cols).fill(0));
  const atb: number[] = new Array(cols).fill(0);
  for (let r = 0; r < M.length; r++) {
    for (let i = 0; i < cols; i++) {
      atb[i] += M[r][i] * rhs[r];
      for (let j = 0; j < cols; j++) ata[i][j] += M[r][i] * M[r][j];
    }
  }
  return solveDense(ata, atb);
}

function solveDense(A: number[][], b: number[]): number[] | null {
  const n = A.length;
  const m = A.map((row, i) => [...row, b[i]]);
  for (let c = 0; c < n; c++) {
    let pivot = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(m[r][c]) > Math.abs(m[pivot][c])) pivot = r;
    if (Math.abs(m[pivot][c]) < 1e-12) return null;
    [m[c], m[pivot]] = [m[pivot], m[c]];
    const pv = m[c][c];
    for (let k = c; k <= n; k++) m[c][k] /= pv;
    for (let r = 0; r < n; r++) {
      if (r === c) continue;
      const f = m[r][c];
      if (!f) continue;
      for (let k = c; k <= n; k++) m[r][k] -= f * m[c][k];
    }
  }
  return m.map((row) => row[n]);
}

/** Ramanujan's second approximation for the ellipse perimeter. */
export function ellipsePerimeter(a: number, b: number): number {
  const h = ((a - b) / (a + b)) ** 2;
  return Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
}
