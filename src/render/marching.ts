import type { Vec3, Volume } from '../lib/types';
import type { MeshData } from './mesh';
import { norm3, cross3 } from './mesh';
import { add, dot, scale, sub } from '../lib/geom';

const CORNERS: [number, number, number][] = [
  [0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0],
  [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1],
];
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
];

/**
 * Surface-nets isosurface extraction of dense calcium around the annulus.
 *
 * One vertex per sign-changing cell placed at the mean of its edge crossings,
 * then quads stitched between adjacent cells. This is used instead of marching
 * cubes because it needs no 256-entry triangle table and never produces holes.
 * Isolated specks are removed by a 3D connected-component pass, and one
 * Laplacian pass rounds nodular calcium into a readable surface.
 */
export function extractCalcification(
  vol: Volume,
  centre: Vec3,
  normal: Vec3,
  basisU: Vec3,
  basisV: Vec3,
  halfBandMm: number,
  halfExtentMm: number,
  thresholdHU: number,
  resolution = 0.8,
): MeshData {
  const { origin, spacing, axisU, axisV, width, height, depth, voxels } = vol;

  // World-space box around the annulus -> voxel coordinate box.
  const corners: Vec3[] = [];
  for (const su of [-1, 1]) {
    for (const sv of [-1, 1]) {
      for (const sn of [-1, 1]) {
        corners.push(
          add(
            centre,
            add(add(scale(basisU, su * halfExtentMm), scale(basisV, sv * halfExtentMm)), scale(normal, sn * halfBandMm)),
          ),
        );
      }
    }
  }
  const lo = [Infinity, Infinity, Infinity];
  const hi = [-Infinity, -Infinity, -Infinity];
  for (const c of corners) {
    for (let k = 0; k < 3; k++) {
      lo[k] = Math.min(lo[k], c[k]);
      hi[k] = Math.max(hi[k], c[k]);
    }
  }
  const toVoxel = (p: number[]) => {
    const rel = sub([p[0], p[1], p[2]] as Vec3, origin);
    return [dot(rel, axisU) / spacing[0], dot(rel, axisV) / spacing[1], dot(rel, normal) / spacing[2]];
  };
  const v0 = toVoxel(lo);
  const v1 = toVoxel(hi);
  const x0 = Math.max(0, Math.floor(Math.min(v0[0], v1[0])));
  const x1 = Math.min(width - 1, Math.ceil(Math.max(v0[0], v1[0])));
  const y0 = Math.max(0, Math.floor(Math.min(v0[1], v1[1])));
  const y1 = Math.min(height - 1, Math.ceil(Math.max(v0[1], v1[1])));
  const z0 = Math.max(0, Math.floor(Math.min(v0[2], v1[2])));
  const z1 = Math.min(depth - 1, Math.ceil(Math.max(v0[2], v1[2])));
  if (x1 - x0 < 2 || y1 - y0 < 2 || z1 - z0 < 2) return empty();

  const step = Math.max(1, Math.round(resolution / Math.min(spacing[0], spacing[1], spacing[2])));
  const nx = Math.floor((x1 - x0) / step) + 1;
  const ny = Math.floor((y1 - y0) / step) + 1;
  const nz = Math.floor((z1 - z0) / step) + 1;
  if (nx * ny * nz > 8_000_000) return empty();

  const field = new Float32Array(nx * ny * nz);
  let maxHU = thresholdHU + 1;
  for (let z = 0; z < nz; z++) {
    for (let y = 0; y < ny; y++) {
      const sy = (y0 + y * step) * width;
      const sz = (z0 + z * step) * height * width;
      for (let x = 0; x < nx; x++) {
        const hu = voxels[sz + sy + (x0 + x * step)];
        field[(z * ny + y) * nx + x] = hu;
        if (hu > maxHU) maxHU = hu;
      }
    }
  }

  const iso = thresholdHU;
  const resVox = Math.min(spacing[0], spacing[1], spacing[2]) * step;

  // ---- drop isolated specks: keep components with real volume -------------
  const keep = new Uint8Array(nx * ny * nz);
  {
    const seen = new Uint8Array(nx * ny * nz);
    const stack: number[] = [];
    const minVoxels = Math.max(3, Math.round(0.6 / resVox ** 3));
    for (let i0 = 0; i0 < field.length; i0++) {
      if (seen[i0] || field[i0] <= iso) continue;
      const comp: number[] = [];
      stack.length = 0;
      stack.push(i0);
      seen[i0] = 1;
      while (stack.length) {
        const j = stack.pop()!;
        comp.push(j);
        const jx = j % nx;
        const jy = Math.floor(j / nx) % ny;
        const jz = Math.floor(j / (nx * ny));
        for (let dz = -1; dz <= 1; dz++) {
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (!dx && !dy && !dz) continue;
              const ax = jx + dx;
              const ay = jy + dy;
              const az = jz + dz;
              if (ax < 0 || ay < 0 || az < 0 || ax >= nx || ay >= ny || az >= nz) continue;
              const nb = (az * ny + ay) * nx + ax;
              if (seen[nb] || field[nb] <= iso) continue;
              seen[nb] = 1;
              stack.push(nb);
            }
          }
        }
      }
      if (comp.length >= minVoxels) for (const j of comp) keep[j] = 1;
    }
  }

  /** Field value where only real nodules count as solid. */
  const value = (x: number, y: number, z: number): number => {
    const i = (z * ny + y) * nx + x;
    return keep[i] ? field[i] : -1024;
  };

  // ---- one vertex per sign-changing cell ---------------------------------
  const cellVertex = new Int32Array(nx * ny * nz).fill(-1);
  const pos: number[] = [];
  const col: number[] = [];
  const cellIndex = (x: number, y: number, z: number) => (z * ny + y) * nx + x;

  const worldOf = (vx: number, vy: number, vz: number): Vec3 => [
    origin[0] + vx * spacing[0] * axisU[0] + vy * spacing[1] * axisV[0] + vz * spacing[2] * normal[0],
    origin[1] + vx * spacing[0] * axisU[1] + vy * spacing[1] * axisV[1] + vz * spacing[2] * normal[1],
    origin[2] + vx * spacing[0] * axisU[2] + vy * spacing[1] * axisV[2] + vz * spacing[2] * normal[2],
  ];

  const vals = new Float64Array(8);
  for (let z = 0; z < nz - 1; z++) {
    for (let y = 0; y < ny - 1; y++) {
      for (let x = 0; x < nx - 1; x++) {
        let mask = 0;
        let peak = 0;
        for (let i = 0; i < 8; i++) {
          const v = value(x + CORNERS[i][0], y + CORNERS[i][1], z + CORNERS[i][2]);
          vals[i] = v;
          if (v > iso) {
            mask |= 1 << i;
            if (v > peak) peak = v;
          }
        }
        if (mask === 0 || mask === 255) continue;
        let sx = 0;
        let sy = 0;
        let sz = 0;
        let n = 0;
        for (let e = 0; e < 12; e++) {
          const [a, b] = EDGES[e];
          const va = vals[a];
          const vb = vals[b];
          if (va > iso === vb > iso) continue;
          const t = Math.abs(vb - va) < 1e-6 ? 0.5 : (iso - va) / (vb - va);
          const ca = CORNERS[a];
          const cb = CORNERS[b];
          sx += ca[0] + (cb[0] - ca[0]) * t;
          sy += ca[1] + (cb[1] - ca[1]) * t;
          sz += ca[2] + (cb[2] - ca[2]) * t;
          n++;
        }
        if (!n) continue;
        const p = worldOf(x0 + (x + sx / n) * step, y0 + (y + sy / n) * step, z0 + (z + sz / n) * step);
        cellVertex[cellIndex(x, y, z)] = pos.length / 3;
        pos.push(p[0], p[1], p[2]);
        const hue = Math.max(0, Math.min(1, (peak - iso) / Math.max(220, maxHU - iso)));
        col.push(1.0, 0.34 + 0.36 * (1 - hue), 0.05 + 0.18 * (1 - hue), 1);
      }
    }
  }
  if (!pos.length) return empty();

  // ---- stitch quads between neighbouring cells ---------------------------
  const idx: number[] = [];
  const quad = (a: number, b: number, c: number, d: number) => {
    if (a < 0 || b < 0 || c < 0 || d < 0) return;
    idx.push(a, b, c, a, c, d);
  };
  for (let z = 1; z < nz - 1; z++) {
    for (let y = 1; y < ny - 1; y++) {
      for (let x = 1; x < nx - 1; x++) {
        const inside = value(x, y, z) > iso;
        if (inside !== (value(x + 1, y, z) > iso)) {
          quad(
            cellVertex[cellIndex(x, y - 1, z - 1)],
            cellVertex[cellIndex(x, y, z - 1)],
            cellVertex[cellIndex(x, y, z)],
            cellVertex[cellIndex(x, y - 1, z)],
          );
        }
        if (inside !== (value(x, y + 1, z) > iso)) {
          quad(
            cellVertex[cellIndex(x - 1, y, z - 1)],
            cellVertex[cellIndex(x - 1, y, z)],
            cellVertex[cellIndex(x, y, z)],
            cellVertex[cellIndex(x, y, z - 1)],
          );
        }
        if (inside !== (value(x, y, z + 1) > iso)) {
          quad(
            cellVertex[cellIndex(x - 1, y - 1, z)],
            cellVertex[cellIndex(x, y - 1, z)],
            cellVertex[cellIndex(x, y, z)],
            cellVertex[cellIndex(x - 1, y, z)],
          );
        }
      }
    }
  }
  if (!idx.length) return empty();

  // ---- one Laplacian smoothing pass --------------------------------------
  const count = pos.length / 3;
  const sumP = new Float32Array(count * 3);
  const sumN = new Uint16Array(count);
  const addEdge = (a: number, b: number) => {
    sumP[a * 3] += pos[b * 3];
    sumP[a * 3 + 1] += pos[b * 3 + 1];
    sumP[a * 3 + 2] += pos[b * 3 + 2];
    sumN[a]++;
  };
  for (let i = 0; i < idx.length; i += 3) {
    const a = idx[i];
    const b = idx[i + 1];
    const c = idx[i + 2];
    addEdge(a, b);
    addEdge(b, c);
    addEdge(c, a);
  }
  const smoothed = new Float32Array(pos);
  for (let i = 0; i < count; i++) {
    if (!sumN[i]) continue;
    for (let k = 0; k < 3; k++) {
      smoothed[i * 3 + k] = pos[i * 3 + k] * 0.4 + (sumP[i * 3 + k] / sumN[i]) * 0.6;
    }
  }

  // ---- area-weighted normals --------------------------------------------
  const nrm = new Float32Array(count * 3);
  for (let i = 0; i < idx.length; i += 3) {
    const ia = idx[i];
    const ib = idx[i + 1];
    const ic = idx[i + 2];
    const a = [smoothed[ia * 3], smoothed[ia * 3 + 1], smoothed[ia * 3 + 2]];
    const b = [smoothed[ib * 3], smoothed[ib * 3 + 1], smoothed[ib * 3 + 2]];
    const c = [smoothed[ic * 3], smoothed[ic * 3 + 1], smoothed[ic * 3 + 2]];
    const fn = cross3([b[0] - a[0], b[1] - a[1], b[2] - a[2]], [c[0] - a[0], c[1] - a[1], c[2] - a[2]]);
    for (const j of [ia, ib, ic]) {
      nrm[j * 3] += fn[0];
      nrm[j * 3 + 1] += fn[1];
      nrm[j * 3 + 2] += fn[2];
    }
  }
  for (let i = 0; i < count; i++) {
    const n = norm3([nrm[i * 3], nrm[i * 3 + 1], nrm[i * 3 + 2]]);
    nrm[i * 3] = n[0];
    nrm[i * 3 + 1] = n[1];
    nrm[i * 3 + 2] = n[2];
  }

  return {
    positions: smoothed,
    normals: nrm,
    colors: new Float32Array(col),
    indices: new Uint32Array(idx),
  };
}

function empty(): MeshData {
  return {
    positions: new Float32Array(0),
    normals: new Float32Array(0),
    colors: new Float32Array(0),
    indices: new Uint32Array(0),
  };
}
