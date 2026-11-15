import type {
  MeasurementSummary,
  ReleaseResult,
  ValveModel,
  Vec3,
} from '../lib/types';
import { add, cross3, dot3, norm3, sub3 } from './vecUtil';
import type { MeshData } from './mesh';
import { MeshBuilder, emptyMesh, latheSurface, tubeAlong } from './mesh';
import { extractCalcification } from './marching';
import { gapColor } from '../lib/release';
import type { FrameGeometry } from '../lib/release';
import type { Volume } from '../lib/types';

/** Annular ring as a glowing tube. */
export function ringMesh(summary: MeasurementSummary, color: [number, number, number] = [1, 0.62, 0.2]): MeshData {
  return tubeAlong(summary.ring.points3d as unknown as number[][], 0.3, [...color, 1], true, 8);
}

/** Thin outline of the ring drawn in its own plane. */
export function ringOutlineMesh(summary: MeasurementSummary, color: [number, number, number] = [1, 0.78, 0.42]): MeshData {
  return tubeAlong(summary.ring.points3d as unknown as number[][], 0.14, [...color, 1], true, 4);
}

export function lvotMesh(summary: MeasurementSummary): MeshData | null {
  if (!summary.lvot) return null;
  const r = summary.lvot.dAreaMm / 2;
  const c = summary.lvot.center;
  const u = summary.ring.basisU;
  const v = summary.ring.basisV;
  const pts: number[][] = [];
  const seg = 72;
  for (let i = 0; i < seg; i++) {
    const a = (i / seg) * Math.PI * 2;
    pts.push(add(c, add(scale3(u, Math.cos(a) * r), scale3(v, Math.sin(a) * r))));
  }
  return tubeAlong(pts, 0.18, [0.34, 0.78, 0.9, 1], true, 4);
}

/**
 * Deployed frame: a cell-patterned lattice. Vertical struts plus zig-zag
 * connector bands, deformed by the radial-force solution.
 */
export function frameMesh(
  frame: FrameGeometry,
  summary: MeasurementSummary,
  valve: ValveModel,
  release: ReleaseResult | null,
  deployProgress = 1,
): { mesh: MeshData; skirt: MeshData } {
  // 0 = crimped on the delivery system, 1 = fully deployed
  const t = Math.max(0.12, Math.min(1, deployProgress));
  const ease = t * t * (3 - 2 * t);
  const n = frame.theta.length;
  const { basisU: u, basisV: v, normal: nrm, center } = summary.ring;
  const levels = frame.levels;
  const nj = levels.length;
  const heights = levels;
  const pointAt = (i: number, j: number, radialOffset = 0): number[] => {
    const idx = ((i % n) + n) % n;
    const a = frame.theta[idx];
    const full = frame.radii[j][idx];
    const crimped = Math.min(full, 3.6);
    const r = (crimped + (full - crimped) * ease) + radialOffset * ease;
    return add(center, add(add(scale3(u, Math.cos(a) * r), scale3(v, Math.sin(a) * r)), scale3(nrm, heights[j])));
  };
  const gains = valve.cellCount;
  const parts: MeshData[] = [];

  // vertical struts
  const strutColor: [number, number, number] = [0.66, 0.79, 0.9];
  for (let c = 0; c < gains; c++) {
    const base = Math.round((c / gains) * n);
    const path: number[][] = [];
    for (let j = 0; j < nj; j++) path.push(pointAt(base, j, 0.06));
    const col = (i: number) => {
      const jf = i / (nj - 1);
      const t = Math.min(1, Math.max(0, jf));
      return [strutColor[0] * (0.7 + 0.3 * t), strutColor[1] * (0.72 + 0.28 * t), strutColor[2], 1];
    };
    parts.push(tubeAlong(path, 0.19, [...strutColor, 1], false, 5, col));
  }

  // zig-zag bands at cell boundaries
  const bandCount = Math.max(3, Math.round(valve.frameHeightMm / 9));
  for (let b = 0; b < bandCount; b++) {
    const t = (b + 0.5) / bandCount;
    const path: number[][] = [];
    const steps = n;
    for (let i = 0; i < steps; i++) {
      const jj = Math.round(t * (nj - 1) + Math.sin((i / gains) * Math.PI * 2) * 0.9);
      const j = Math.max(0, Math.min(nj - 1, jj));
      path.push(pointAt(i, j, 0.04));
    }
    parts.push(tubeAlong(path, 0.115, [0.52, 0.66, 0.8, 1], true, 4));
  }

  // Inflow fabric skirt: wraps the ventricular end of the frame.
  const dDepth = release?.depthMm ?? 4;
  const skirtH = Math.min(valve.skirtHeightMm, Math.max(4, dDepth + 5));
  const skirtLevels = [-dDepth, -dDepth + skirtH * 0.55, -dDepth + skirtH];
  const skirtRadii = skirtLevels.map((z) => {
    const j = nearestLevel(levels, z);
    return frame.radii[j].map((r) => Math.min(r, 3.6) + (r - Math.min(r, 3.6)) * ease + 0.16 * ease);
  });
  const skirt = latheSurface(
    frame.theta,
    skirtLevels,
    skirtRadii,
    center as unknown as number[],
    u as unknown as number[],
    v as unknown as number[],
    nrm as unknown as number[],
    [0.82, 0.88, 0.97, 1.0],
    false,
  );

  return { mesh: parts.length ? mergeAll(parts) : emptyMesh(), skirt };
}

function nearestLevel(levels: number[], z: number) {
  let best = 0;
  let bd = Infinity;
  for (let i = 0; i < levels.length; i++) {
    const d = Math.abs(levels[i] - z);
    if (d < bd) {
      bd = d;
      best = i;
    }
  }
  return best;
}

function mergeAll(list: MeshData[]): MeshData {
  let vc = 0;
  let ic = 0;
  for (const m of list) {
    vc += m.positions.length / 3;
    ic += m.indices.length;
  }
  const positions = new Float32Array(vc * 3);
  const normals = new Float32Array(vc * 3);
  const colors = new Float32Array(vc * 4);
  const indices = new Uint32Array(ic);
  let vo = 0;
  let io = 0;
  for (const m of list) {
    const vn = m.positions.length / 3;
    positions.set(m.positions, vo * 3);
    normals.set(m.normals, vo * 3);
    colors.set(m.colors, vo * 4);
    for (let i = 0; i < m.indices.length; i++) indices[io + i] = m.indices[i] + vo;
    vo += vn;
    io += m.indices.length;
  }
  return { positions, normals, colors, indices };
}

export { mergeAll };

/** Colour-coded tube along the annulus showing the predicted PVL gap. */
/**
 * A ring drawn on the annulus itself: green where the frame contacts the wall,
 * red/amber over the arc where the predicted paravalvular gap is largest.
 */
export function gapTube(summary: MeasurementSummary, frame: FrameGeometry, threshold: number): MeshData {
  const n = frame.theta.length;
  const { basisU: u, basisV: v, normal: nrm, center } = summary.ring;
  const path: number[][] = [];
  for (let i = 0; i < n; i++) {
    const a = frame.theta[i];
    const r = frame.baseProfile[i] + 0.95;
    path.push(add(center, add(add(scale3(u, Math.cos(a) * r), scale3(v, Math.sin(a) * r)), scale3(nrm, 0.15))) as unknown as number[]);
  }
  return tubeAlong(path, 0.5, [1, 1, 1, 1], true, 6, (i) => {
    const hex = gapColor(frame.gapsMm[i], threshold);
    return [...hexToRgb(hex), 1];
  });
}

export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255];
}

/** Calcium isosurface. */
export function calciumMesh(volume: Volume, summary: MeasurementSummary, threshold: number): MeshData {
  return extractCalcification(
    volume,
    summary.ring.center,
    summary.ring.normal,
    summary.ring.basisU,
    summary.ring.basisV,
    9,
    30,
    threshold,
    0.45,
  );
}

/** Lines: aortic + LV axes, coronary ostium markers as small crosshairs. */
export function axisLines(summary: MeasurementSummary, color: [number, number, number]): MeshData {
  const b = new MeshBuilder();
  const push = (a: number[], bb: number[], c: number[]) => {
    const i0 = b.addVertex(a, [0, 0, 1], [c[0], c[1], c[2], 1]);
    const i1 = b.addVertex(bb, [0, 0, 1], [c[0], c[1], c[2], 1]);
    b.idx.push(i0, i1);
  };
  for (const key of ['aorticAxis', 'lvAxis'] as const) {
    const ax = summary.angulation?.[key];
    if (ax) push(ax[0] as number[], ax[1] as number[], color);
  }
  const out = b.build();
  return { ...out };
}

export function ostiumMarkers(summary: MeasurementSummary): MeshData {
  const b = new MeshBuilder();
  const add = (p: Vec3, c: [number, number, number], size = 1.7) => {
    const dirs: number[][] = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ];
    for (const d of dirs) {
      const a = [p[0] - d[0] * size, p[1] - d[1] * size, p[2] - d[2] * size];
      const bb = [p[0] + d[0] * size, p[1] + d[1] * size, p[2] + d[2] * size];
      const i0 = b.addVertex(a, [0, 0, 1], [c[0], c[1], c[2], 1]);
      const i1 = b.addVertex(bb, [0, 0, 1], [c[0], c[1], c[2], 1]);
      b.idx.push(i0, i1);
    }
  };
  if (summary.coronaries.left) add(summary.coronaries.left.point, [1, 0.35, 0.33], 2.1);
  if (summary.coronaries.right) add(summary.coronaries.right.point, [0.78, 0.55, 0.88], 2.1);
  return b.build();
}

/** Simple floor grid under the scene for spatial context. */
export function gridMesh(_center: Vec3, radius: number, z: number): MeshData {
  const b = new MeshBuilder();
  const step = 10;
  const col: [number, number, number] = [0.16, 0.22, 0.3];
  for (let x = -radius; x <= radius; x += step) {
    const i0 = b.addVertex([x, -radius, z], [0, 0, 1], [...col, 1]);
    const i1 = b.addVertex([x, radius, z], [0, 0, 1], [...col, 1]);
    b.idx.push(i0, i1);
  }
  for (let y = -radius; y <= radius; y += step) {
    const i0 = b.addVertex([-radius, y, z], [0, 0, 1], [...col, 1]);
    const i1 = b.addVertex([radius, y, z], [0, 0, 1], [...col, 1]);
    b.idx.push(i0, i1);
  }
  const out = b.build();
  return {
    positions: out.positions,
    normals: out.normals,
    colors: out.colors,
    indices: out.indices,
  };
}

function scale3(v: Vec3, s: number): Vec3 {
  return [v[0] * s, v[1] * s, v[2] * s];
}

export { scale3, norm3, cross3, dot3, sub3 };
