import type {
  AngulationMetrics,
  CalcDistribution,
  CalcSector,
  Contour,
  Conventions,
  CoronaryMetric,
  Landmark,
  LvotMetrics,
  Measurement,
  MeasurementSummary,
  RingMetrics,
  Vec2,
  Vec3,
  Volume,
} from '../lib/types';
import {
  angleBetween,
  ellipsePerimeter,
  ellipsePoint,
  fitEllipse2D,
  circleAreaRadius,
  circlePerimeterRadius,
  cross,
  dist3,
  dot,
  meanPoint,
  normalize,
  pixelToWorld,
  planeFit,
  polygonNormal,
  projectToPlane,
  scale,
  sub,
  add,
} from './geom';

const TWO_PI = Math.PI * 2;

function circularSmooth(values: number[], pass = 2, radius = 3): number[] {
  let cur = values.slice();
  for (let p = 0; p < pass; p++) {
    const next = new Array(cur.length).fill(0);
    for (let i = 0; i < cur.length; i++) {
      let s = 0;
      let w = 0;
      for (let k = -radius; k <= radius; k++) {
        const wgt = radius + 1 - Math.abs(k);
        s += cur[(i + k + cur.length) % cur.length] * wgt;
        w += wgt;
      }
      next[i] = s / w;
    }
    cur = next;
  }
  return cur;
}

function fillMissing(values: (number | null)[]): number[] {
  const n = values.length;
  const out = new Array<number>(n).fill(0);
  const known = values.map((v) => v !== null);
  if (!known.some(Boolean)) return out.fill(NaN);
  for (let i = 0; i < n; i++) {
    if (values[i] !== null) {
      out[i] = values[i] as number;
      continue;
    }
    let prev = -1;
    let next = -1;
    for (let k = 1; k < n; k++) {
      if (values[(i - k + n) % n] !== null) {
        prev = (i - k + n) % n;
        break;
      }
    }
    for (let k = 1; k < n; k++) {
      if (values[(i + k) % n] !== null) {
        next = (i + k) % n;
        break;
      }
    }
    if (prev < 0 || next < 0) {
      out[i] = prev >= 0 ? (values[prev] as number) : (values[next] as number);
      continue;
    }
    let dPrev = (i - prev + n) % n;
    const dNext = (next - i + n) % n;
    const total = dPrev + dNext;
    const t = total ? dPrev / total : 0;
    out[i] = (values[prev] as number) * (1 - t) + (values[next] as number) * t;
  }
  return out;
}

export function annulusContours(m: Measurement): Contour[] {
  return m.contours.filter((c) => c.kind === 'annulus' && c.points.length >= 3);
}

export function lvotContours(m: Measurement): Contour[] {
  return m.contours.filter((c) => c.kind === 'lvot' && c.points.length >= 3);
}

export function contourWorldPoints(contour: Contour, vol: Volume): Vec3[] {
  return contour.points.map((p) => pixelToWorld(p, vol));
}

/** Rebuild the annulus ring from all contoured slices. */
export function buildRing(contours: Contour[], vol: Volume, conventions: Conventions): RingMetrics | null {
  const pts3: Vec3[] = [];
  for (const c of contours) {
    const wp = contourWorldPoints(c, vol);
    if (wp.length >= 3) pts3.push(...wp);
  }
  if (pts3.length < 12) return null;

  const fit = planeFit(pts3);
  // orient normal towards the cranial / superior side (positive slice direction)
  const volNormal: Vec3 = vol.normal;
  let normal = fit.normal;
  if (dot(normal, volNormal) < 0) normal = scale(normal, -1);
  const u = normalize(sub(fit.u, scale(normal, dot(fit.u, normal))));
  const v = normalize(cross(normal, u));

  const flat = projectToPlane(pts3, fit.centroid, u, v);
  const centroid2: Vec2 = [0, 0];
  for (const p of flat) {
    centroid2[0] += p[0];
    centroid2[1] += p[1];
  }
  centroid2[0] /= flat.length;
  centroid2[1] /= flat.length;

  // The annulus is a saddle-shaped 3D ring. Bin every contour vertex by angle,
  // keeping both its in-plane radius and its plane-normal offset (the saddle).
  const bins = 360;
  const radial: number[][] = Array.from({ length: bins }, () => []);
  const offsets: number[][] = Array.from({ length: bins }, () => []);
  const innerRadius: (number | null)[] = new Array(bins).fill(null);
  for (const p3 of pts3) {
    const rel = sub(p3, fit.centroid);
    const dx = dot(rel, u);
    const dy = dot(rel, v);
    const r = Math.hypot(dx, dy);
    if (r < 1.2) continue;
    let a = Math.atan2(dy, dx);
    if (a < 0) a += TWO_PI;
    const bi = Math.min(bins - 1, Math.floor((a / TWO_PI) * bins));
    radial[bi].push(r);
    offsets[bi].push(dot(rel, normal));
  }
  for (let i = 0; i < bins; i++) {
    if (radial[i].length) {
      radial[i].sort((a, b) => a - b);
      innerRadius[i] = radial[i][Math.floor(radial[i].length / 2)];
    }
  }
  const medianOrNull = (arr: number[]): number | null => {
    if (!arr.length) return null;
    const sorted = arr.slice().sort((a, b) => a - b);
    return sorted[Math.floor(sorted.length / 2)];
  };
  const offsetRaw: (number | null)[] = offsets.map(medianOrNull);
  const hasOffset = offsetRaw.some((x) => x !== null);
  const offsetProfile = hasOffset ? circularSmooth(fillMissing(offsetRaw), 2, 3) : new Array(bins).fill(0);

  const centre3d = add(fit.centroid, add(scale(u, centroid2[0]), scale(v, centroid2[1])));
  const inferred = inferWallRadii(vol, centre3d, u, v, normal, innerRadius, conventions);
  const measured = inferred ?? fillMissing(innerRadius);
  if (!measured || measured.some((x) => !Number.isFinite(x))) return null;

  // The annulus is an ellipse, so fit one ellipse to the binned radii (each bin
  // weighted by its vertex count) rather than keeping a noisy per-angle profile.
  const binCounts = radial.map((arr) => arr.length);
  const samplePoints: Vec2[] = [];
  for (let i = 0; i < bins; i++) {
    if (!Number.isFinite(measured[i])) continue;
    const weight = Math.max(1, Math.min(6, binCounts[i]));
    const a = (i / bins) * TWO_PI;
    for (let w = 0; w < weight; w++) samplePoints.push([Math.cos(a) * measured[i], Math.sin(a) * measured[i]]);
  }
  const ellipseFit = fitEllipse2D(samplePoints);
  const outlineCount = 256;
  const outline2: Vec2[] = [];
  const points3d: Vec3[] = [];
  let perimeter = 0;
  let area = 0;
  let radiusProfile = new Array(bins).fill(0);

  if (ellipseFit) {
    const { a, b, phi } = ellipseFit;
    const cx2 = ellipseFit.center[0];
    const cy2 = ellipseFit.center[1];
    radiusProfile = new Array(bins).fill(0).map((_, i) => {
      const ang = (i / bins) * TWO_PI;
      const uu = Math.cos(ang) * Math.cos(phi) + Math.sin(ang) * Math.sin(phi);
      const vv = -Math.cos(ang) * Math.sin(phi) + Math.sin(ang) * Math.cos(phi);
      return 1 / Math.sqrt((uu / a) ** 2 + (vv / b) ** 2);
    });
    for (let i = 0; i < outlineCount; i++) {
      const t = (i / outlineCount) * TWO_PI;
      const p = ellipsePoint(ellipseFit, t);
      outline2.push(p);
      const angle = Math.atan2(p[1] - cy2, p[0] - cx2);
      const bi = ((Math.round((angle / TWO_PI) * bins) % bins) + bins) % bins;
      points3d.push(
        add(fit.centroid, add(add(scale(u, p[0]), scale(v, p[1])), scale(normal, offsetProfile[bi]))),
      );
    }
    area = Math.PI * a * b;
    perimeter = ellipsePerimeter(a, b);
    // The saddle offsets add real 3D length: scale the planar ellipse
    // perimeter by the spatial / planar arclength ratio.
    let planarLen = 0;
    let spatialLen = 0;
    for (let i = 0; i < outlineCount; i++) {
      const p = outline2[i];
      const q = outline2[(i + 1) % outlineCount];
      planarLen += Math.hypot(q[0] - p[0], q[1] - p[1]);
      const p3 = points3d[i];
      const q3 = points3d[(i + 1) % outlineCount];
      spatialLen += Math.hypot(q3[0] - p3[0], q3[1] - p3[1], q3[2] - p3[2]);
    }
    if (planarLen > 1e-6) perimeter *= spatialLen / planarLen;
    centroid2[0] = cx2;
    centroid2[1] = cy2;
  } else {
    radiusProfile = circularSmooth(measured, 2, 3);
    for (let i = 0; i < outlineCount; i++) {
      const ang = (i / outlineCount) * TWO_PI;
      const bi = Math.round((ang / TWO_PI) * bins) % bins;
      const p: Vec2 = [Math.cos(ang) * radiusProfile[bi], Math.sin(ang) * radiusProfile[bi]];
      outline2.push(p);
      points3d.push(add(fit.centroid, add(add(scale(u, p[0]), scale(v, p[1])), scale(normal, offsetProfile[bi]))));
    }
    for (let i = 0; i < outlineCount; i++) {
      const p = outline2[i];
      const q = outline2[(i + 1) % outlineCount];
      area += p[0] * q[1] - q[0] * p[1];
      const p3 = points3d[i];
      const q3 = points3d[(i + 1) % outlineCount];
      perimeter += Math.hypot(q3[0] - p3[0], q3[1] - p3[1], q3[2] - p3[2]);
    }
    area = Math.abs(area) / 2;
  }

  const center3 = add(fit.centroid, add(scale(u, centroid2[0]), scale(v, centroid2[1])));

  const rMin = Math.min(...radiusProfile);
  const rMax = Math.max(...radiusProfile);
  const eig = fit.eigenvalues;
  const eccentricity = eig[1] > 1e-6 ? Math.sqrt(Math.max(0, 1 - eig[1] / eig[0])) : 0;

  return {
    center: center3,
    normal,
    basisU: u,
    basisV: v,
    outline: outline2,
    points3d,
    perimeterMm: perimeter,
    areaMm2: area,
    dPerimMm: perimeter / Math.PI,
    dAreaMm: Math.sqrt((4 * area) / Math.PI),
    dMinMm: rMin * 2,
    dMaxMm: rMax * 2,
    eccentricity,
    planarityRmsMm: fit.rms,
    planeAngleDeg: angleBetween(normal, volNormal),
    radiusProfile,
    sliceSpan: contours.map((c) => c.slice),
  };
}

/**
 * Refines the drawn contour to the blood-pool / annular-wall boundary.
 *
 * The clinician draws along the contrast column edge, so we march radially and
 * look for the steepest HU drop (contrast -> fibrous wall). Where calcium makes
 * the wall brighter than the pool we use the foot of the steepest rise instead.
 * The correction is clamped so a rough freehand outline can never move the
 * annulus by more than ~2.4 mm. Returns null if the volume has no usable
 * contrast (the drawn contour is then used unchanged).
 */
function inferWallRadii(
  vol: Volume,
  centre: Vec3,
  u: Vec3,
  v: Vec3,
  normal: Vec3,
  inner: (number | null)[],
  conventions: Conventions,
): number[] | null {
  const bins = inner.length;
  const out: number[] = new Array(bins).fill(NaN);
  // The contour convention is the annulus inner edge, so refinement may only
  // nudge the outline; it must never walk out to the adventitia.
  const step = 0.2;
  const maxOut = 0.9;
  const maxIn = 0.9;
  let hits = 0;
  for (let i = 0; i < bins; i++) {
    const base = inner[i];
    if (base === null) continue;
    const a = (i / bins) * TWO_PI;
    const dir = add(scale(u, Math.cos(a)), scale(v, Math.sin(a)));
    const sample = (r: number) => {
      let sum = 0;
      for (let k = -1; k <= 1; k++) {
        sum += sampleWorld(vol, add(centre, add(scale(dir, r), scale(normal, (k * conventions.annularThicknessMm) / 2))));
      }
      return sum / 3;
    };
    const nSamples = Math.round((maxIn + maxOut) / step) + 1;
    const profile: number[] = [];
    for (let k = 0; k < nSamples; k++) profile.push(sample(base - maxIn + k * step));
    const sm = profile.map((_, k) => {
      const a1 = profile[Math.max(0, k - 1)];
      const a2 = profile[k];
      const a3 = profile[Math.min(profile.length - 1, k + 1)];
      return (a1 + 2 * a2 + a3) / 4;
    });
    const poolRef = (sm[0] + sm[1] + sm[2]) / 3;
    if (poolRef < 120) continue;
    let dropEdge = -1;
    let bestDrop = 0;
    let riseEdge = -1;
    let bestRise = 0;
    for (let k = 2; k < sm.length - 1; k++) {
      const d = sm[k + 1] - sm[k - 1];
      if (d < -bestDrop) {
        bestDrop = -d;
        dropEdge = k;
      }
      if (d > bestRise) {
        bestRise = d;
        riseEdge = k;
      }
    }
    const threshold = Math.max(35, poolRef * 0.13);
    let radius = base;
    if (bestDrop > threshold) {
      radius = base - maxIn + (dropEdge + 0.5) * step;
    } else if (bestRise > threshold) {
      radius = base - maxIn + (riseEdge + 0.5) * step;
    }
    const correction = Math.max(-maxIn, Math.min(maxOut, radius - base));
    out[i] = base + correction;
    if (Math.abs(correction) > 0.05) hits++;
  }
  if (hits < bins * 0.5) return null;
  const filled = fillMissing(out.map((x) => (Number.isFinite(x) ? x : null)));
  return filled.every((x) => Number.isFinite(x)) ? filled : null;
}

export function sampleWorld(vol: Volume, p: Vec3): number {
  const { origin, spacing, axisU, axisV, normal, width, height, depth, voxels } = vol;
  const rel = sub(p, origin);
  const fx = dot(rel, axisU) / spacing[0] - 0.5;
  const fy = dot(rel, axisV) / spacing[1] - 0.5;
  const fz = dot(rel, normal) / spacing[2] - 0.5;
  const x0 = Math.floor(fx);
  const y0 = Math.floor(fy);
  const z0 = Math.floor(fz);
  const tx = fx - x0;
  const ty = fy - y0;
  const tz = fz - z0;
  const at = (x: number, y: number, z: number) => {
    if (x < 0 || y < 0 || z < 0 || x >= width || y >= height || z >= depth) return -1024;
    return voxels[(z * height + y) * width + x];
  };
  const c00 = at(x0, y0, z0) * (1 - tx) + at(x0 + 1, y0, z0) * tx;
  const c10 = at(x0, y0 + 1, z0) * (1 - tx) + at(x0 + 1, y0 + 1, z0) * tx;
  const c01 = at(x0, y0, z0 + 1) * (1 - tx) + at(x0 + 1, y0, z0 + 1) * tx;
  const c11 = at(x0, y0 + 1, z0 + 1) * (1 - tx) + at(x0 + 1, y0 + 1, z0 + 1) * tx;
  const c0 = c00 * (1 - ty) + c10 * ty;
  const c1 = c01 * (1 - ty) + c11 * ty;
  return c0 * (1 - tz) + c1 * tz;
}

/** Contour on a single slice in its own plane. */
function contourPlaneMetrics(contour: Contour, vol: Volume) {
  const pts3 = contourWorldPoints(contour, vol);
  const normal = polygonNormal(pts3);
  const centroid = meanPoint(pts3);
  const u = normalize(sub([1, 0, 0], scale(normal, dot([1, 0, 0], normal))));
  const uu = Math.abs(dot(u, u)) < 0.5 ? normalize(cross(normal, [0, 1, 0])) : u;
  const v = normalize(cross(normal, uu));
  const flat = projectToPlane(pts3, centroid, uu, v);
  let area = 0;
  let perimeter = 0;
  for (let i = 0; i < flat.length; i++) {
    const p = flat[i];
    const q = flat[(i + 1) % flat.length];
    area += p[0] * q[1] - q[0] * p[1];
    perimeter += Math.hypot(q[0] - p[0], q[1] - p[1]);
  }
  return { centroid, normal, area: Math.abs(area) / 2, perimeter };
}

export function buildLvot(contours: Contour[], vol: Volume, ring: RingMetrics): LvotMetrics | null {
  if (!contours.length) return null;
  const sorted = [...contours].sort((a, b) => a.slice - b.slice);
  const c = sorted[0];
  const m = contourPlaneMetrics(c, vol);
  const d = dot(sub(m.centroid, ring.center), ring.normal);
  return {
    slice: c.slice,
    offsetMm: d,
    areaMm2: m.area,
    perimeterMm: m.perimeter,
    dAreaMm: Math.sqrt((4 * m.area) / Math.PI),
    dPerimMm: m.perimeter / Math.PI,
    distanceToAnnulusPlaneMm: Math.abs(d),
    center: m.centroid,
  };
}

export function buildCoronary(
  landmarks: Landmark[],
  kind: 'ostium-left' | 'ostium-right',
  vol: Volume,
  ring: RingMetrics,
  conventions: Conventions,
): CoronaryMetric | null {
  const lm = landmarks.find((l) => l.kind === kind);
  if (!lm) return null;
  const p = lm.a;
  const h = dot(sub(p, ring.center), ring.normal);
  const caliper = landmarks.find((l) => l.kind === 'caliper' && l.b);
  let radius = 2.0;
  if (caliper?.b) {
    const r = dist3(caliper.a, caliper.b) / 2;
    if (r > 0.6 && r < 6) radius = r;
  }
  void conventions;
  void vol;
  return { point: p, slice: lm.pickedSlice ?? 0, heightMm: h, ostiumRadiusMm: radius };
}

export function buildAngulation(landmarks: Landmark[], vol: Volume, ring: RingMetrics | null): AngulationMetrics | null {
  const access = landmarks.find((l) => l.kind === 'access-caliper' && l.b);
  const accessDiameter = access?.b ? dist3(access.a, access.b) : null;
  const aortic = landmarks.find((l) => l.kind === 'axis-aortic' && l.b);
  const lv = landmarks.find((l) => l.kind === 'axis-lv' && l.b);
  const accessLocation = access?.b
    ? { slice: access.pickedSlice ?? 0, a: access.a, b: access.b }
    : undefined;
  if (!aortic?.b) {
    if (accessDiameter === null) return null;
    return {
      aortoVentricularDeg: NaN,
      annularPlaneDeg: ring ? angleBetween(ring.normal, vol.normal) : NaN,
      aorticAxis: null,
      lvAxis: null,
      accessMinDiameterMm: accessDiameter,
      accessLocation,
    };
  }
  const a0 = aortic.a;
  const a1 = aortic.b!;
  const l0 = lv?.a ?? null;
  const l1 = lv?.b ?? null;
  const angle = l0 && l1 ? angleBetween(sub(a1, a0), sub(l1, l0)) : NaN;
  return {
    aortoVentricularDeg: Number.isFinite(angle) ? angle : NaN,
    annularPlaneDeg: ring ? angleBetween(ring.normal, vol.normal) : NaN,
    aorticAxis: [a0, a1],
    lvAxis: l0 && l1 ? [l0, l1] : null,
    accessMinDiameterMm: accessDiameter,
    accessLocation,
  };
}

export function buildCalc(
  vol: Volume,
  ring: RingMetrics,
  conventions: Conventions,
): CalcDistribution {
  const sectorCount = conventions.calcSectorCount;
  const band = conventions.calcBandMm;
  const thr = conventions.calcThresholdHU;
  const counts = new Array<number>(sectorCount).fill(0);
  const maxHU = new Array<number>(sectorCount).fill(0);
  const sumHU = new Array<number>(sectorCount).fill(0);
  const radialMax: number[] = new Array(sectorCount).fill(0);
  const sectorVol: number[] = new Array(sectorCount).fill(0);
  let total = 0;
  let peak = 0;

  const voxelVol = vol.spacing[0] * vol.spacing[1] * vol.spacing[2];
  const { width, height, depth, origin, axisU, axisV, normal, spacing } = vol;
  const planeD = dot(ring.center, ring.normal);
  const maxRadius = 26;

  for (let z = 0; z < depth; z++) {
    // quick reject on plane distance range
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const hu = vol.voxels[(z * height + y) * width + x];
        if (hu < thr) continue;
        const p: Vec3 = [
          origin[0] + (x + 0.5) * spacing[0] * axisU[0] + (y + 0.5) * spacing[1] * axisV[0] + z * spacing[2] * normal[0],
          origin[1] + (x + 0.5) * spacing[0] * axisU[1] + (y + 0.5) * spacing[1] * axisV[1] + z * spacing[2] * normal[1],
          origin[2] + (x + 0.5) * spacing[0] * axisU[2] + (y + 0.5) * spacing[1] * axisV[2] + z * spacing[2] * normal[2],
        ];
        const dPlane = dot(p, ring.normal) - planeD;
        if (Math.abs(dPlane) > band) continue;
        const rel = sub(p, ring.center);
        const px = dot(rel, ring.basisU);
        const py = dot(rel, ring.basisV);
        const r = Math.hypot(px, py);
        if (r > maxRadius) continue;
        let ang = Math.atan2(py, px);
        if (ang < 0) ang += TWO_PI;
        const bi = Math.min(sectorCount - 1, Math.floor((ang / TWO_PI) * sectorCount));
        counts[bi]++;
        sumHU[bi] += hu;
        if (hu > maxHU[bi]) maxHU[bi] = hu;
        if (hu > peak) peak = hu;
        const binR = ring.radiusProfile[Math.min(359, Math.floor((ang / TWO_PI) * 360))];
        if (binR && r > radialMax[bi]) radialMax[bi] = r - binR;
        total++;
      }
    }
  }
  for (let i = 0; i < sectorCount; i++) sectorVol[i] = counts[i] * voxelVol;
  const maxVol = Math.max(1e-6, ...sectorVol);
  const totalVol = sectorVol.reduce((a, b) => a + b, 0);
  // The clock face must follow the patient's axial plane, not the ring's
  // arbitrary basis: 12 o'clock is anterior (image top) and hours run
  // clockwise. Project each sector's mid-direction into the axial plane.
  const clockOf = (sectorIndex: number): number => {
    const ang = ((sectorIndex + 0.5) / sectorCount) * TWO_PI;
    const dir = add(scale(ring.basisU, Math.cos(ang)), scale(ring.basisV, Math.sin(ang)));
    const east = dot(dir, vol.axisU);
    const anterior = -dot(dir, vol.axisV);
    const deg = (Math.atan2(east, anterior) * 180) / Math.PI;
    const hour = ((deg + 360) % 360) / 30;
    const rounded = Math.round(hour * 10) / 10;
    return rounded === 0 ? 12 : rounded;
  };

  const sectors: CalcSector[] = sectorVol.map((v, i) => {
    const startDeg = (i / sectorCount) * 360;
    const endDeg = ((i + 1) / sectorCount) * 360;
    return {
      index: i,
      startDeg,
      endDeg,
      clockStart: clockOf(i - 0.5),
      clockEnd: clockOf(i + 0.5),
      volumeMm3: v,
      maxHU: Math.round(maxHU[i]),
      meanHU: counts[i] ? Math.round(sumHU[i] / counts[i]) : 0,
      burden: v / maxVol,
    };
  });
  // A "hot" sector is one carrying a real share of the annular calcium, not
  // merely the tallest peak in an otherwise clean arc.
  const sortedVol = sectorVol.slice().sort((a, b) => b - a);
  const p75 = sortedVol[Math.floor(sortedVol.length * 0.25)] ?? 0;
  const hotFloor = Math.max(p75 * 0.75, 8);
  const hot = sectors
    .filter((sec) => sec.volumeMm3 >= hotFloor)
    .map((sec) => sec.index);
  const burdenScore = Math.min(
    100,
    Math.round(
      42 * Math.min(1, Math.log10(1 + totalVol / 12) / Math.log10(1 + 220)) +
        26 * Math.min(1, Math.max(0, (peak - thr) / 900)) +
        32 * Math.min(1, hot.length / Math.max(4, sectorCount * 0.28)),
    ),
  );
  void radialMax;
  return {
    sectors,
    totalVolumeMm3: totalVol,
    peakHU: Math.round(peak),
    burdenScore,
    hotSectors: hot,
    thresholdHU: thr,
    bandMm: band,
  };
}

export function computeMeasurement(
  vol: Volume,
  measurement: Measurement,
  conventions: Conventions,
): MeasurementSummary | null {
  const ann = annulusContours(measurement);
  const ring = buildRing(ann, vol, conventions);
  if (!ring) return null;
  const lvot = buildLvot(lvotContours(measurement), vol, ring);
  const calc = buildCalc(vol, ring, conventions);
  const left = buildCoronary(measurement.landmarks, 'ostium-left', vol, ring, conventions);
  const right = buildCoronary(measurement.landmarks, 'ostium-right', vol, ring, conventions);
  const angulation = buildAngulation(measurement.landmarks, vol, ring);
  return {
    ring,
    lvot,
    calc,
    coronaries: { left, right },
    angulation,
    contouredSlices: ann.length,
    updatedAt: Date.now(),
  };
}

/**
 * Stable content fingerprint of a measurement summary. Used to decide whether a
 * cached copy needs rewriting without trusting wall-clock timestamps.
 */
export function summarySignature(s: MeasurementSummary | null | undefined): string {
  if (!s) return '';
  const parts: (string | number)[] = [
    s.contouredSlices,
    s.ring.perimeterMm.toFixed(2),
    s.ring.areaMm2.toFixed(1),
    s.ring.dPerimMm.toFixed(2),
    s.ring.dAreaMm.toFixed(2),
    s.ring.dMaxMm.toFixed(2),
    s.ring.dMinMm.toFixed(2),
    s.ring.center.map((v) => v.toFixed(2)).join(','),
    s.lvot ? `${s.lvot.slice}:${s.lvot.areaMm2.toFixed(1)}` : '-',
    s.calc ? `${s.calc.totalVolumeMm3.toFixed(0)}:${s.calc.peakHU}:${s.calc.hotSectors.join('|')}` : '-',
    s.coronaries.left ? `L${s.coronaries.left.heightMm.toFixed(2)}` : '-',
    s.coronaries.right ? `R${s.coronaries.right.heightMm.toFixed(2)}` : '-',
    s.angulation ? `${s.angulation.aortoVentricularDeg.toFixed(1)}` : '-',
  ];
  return parts.join(';');
}

/** Groups contiguous hot sectors into "a–b 点" ranges for display. */
export function hotSectorRanges(calc: CalcDistribution): string[] {
  const n = calc.sectors.length;
  const hot = new Set(calc.hotSectors);
  if (!hot.size) return [];
  if (hot.size === n) return ['全周'];
  const ranges: { start: number; end: number }[] = [];
  // start from a non-hot index so ranges never wrap
  let offset = 0;
  while (offset < n && hot.has(offset % n)) offset++;
  let cur: { start: number; end: number } | null = null;
  for (let k = 0; k < n; k++) {
    const i = (offset + k) % n;
    if (hot.has(i)) {
      if (!cur) cur = { start: i, end: i };
      else cur.end = i;
    } else if (cur) {
      ranges.push(cur);
      cur = null;
    }
  }
  if (cur) ranges.push(cur);
  return ranges.map((r) => {
    const s = calc.sectors[r.start];
    const e = calc.sectors[r.end];
    return `${s.clockStart}–${e.clockEnd} 点`;
  });
}

/** Distance from a point to the annulus ring polyline (in 3D). */
export function distanceToRing(p: Vec3, ring: RingMetrics): number {
  let min = Infinity;
  const pts = ring.points3d;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % pts.length];
    const ab = sub(b, a);
    const t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / (dot(ab, ab) || 1)));
    const q = add(a, scale(ab, t));
    const d = dist3(p, q);
    if (d < min) min = d;
  }
  return min;
}

export function ringCircumferencePoint(ring: RingMetrics, theta: number): Vec3 {
  const i = ((Math.round((theta / TWO_PI) * ring.radiusProfile.length) % ring.radiusProfile.length) + ring.radiusProfile.length) % ring.radiusProfile.length;
  const r = ring.radiusProfile[i];
  const a = (i / ring.radiusProfile.length) * TWO_PI;
  return add(ring.center, add(scale(ring.basisU, Math.cos(a) * r), scale(ring.basisV, Math.sin(a) * r)));
}

export { circleAreaRadius, circlePerimeterRadius };
