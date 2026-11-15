export const mat4 = {
  identity(): Float32Array {
    return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  },
  multiply(a: Float32Array, b: Float32Array): Float32Array {
    const out = new Float32Array(16);
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        let s = 0;
        for (let k = 0; k < 4; k++) s += a[k * 4 + j] * b[i * 4 + k];
        out[i * 4 + j] = s;
      }
    }
    return out;
  },
  perspective(fovY: number, aspect: number, near: number, far: number): Float32Array {
    const f = 1 / Math.tan(fovY / 2);
    const nf = 1 / (near - far);
    return new Float32Array([
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, far * nf, -1,
      0, 0, far * near * nf, 0,
    ]);
  },
  ortho(left: number, right: number, bottom: number, top: number, near: number, far: number): Float32Array {
    return new Float32Array([
      2 / (right - left), 0, 0, 0,
      0, 2 / (top - bottom), 0, 0,
      0, 0, 1 / (near - far), 0,
      -(right + left) / (right - left), -(top + bottom) / (top - bottom), near / (near - far), 1,
    ]);
  },
  lookAt(eye: number[], target: number[], up: number[]): Float32Array {
    const z = norm3([eye[0] - target[0], eye[1] - target[1], eye[2] - target[2]]);
    const x = norm3(cross3(up, z));
    const y = cross3(z, x);
    return new Float32Array([
      x[0], y[0], z[0], 0,
      x[1], y[1], z[1], 0,
      x[2], y[2], z[2], 0,
      -dot3(x, eye), -dot3(y, eye), -dot3(z, eye), 1,
    ]);
  },
  rotationY(a: number): Float32Array {
    const c = Math.cos(a);
    const s = Math.sin(a);
    return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);
  },
  rotationX(a: number): Float32Array {
    const c = Math.cos(a);
    const s = Math.sin(a);
    return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]);
  },
  transform(m: Float32Array, p: number[]): number[] {
    return [
      m[0] * p[0] + m[4] * p[1] + m[8] * p[2] + m[12],
      m[1] * p[0] + m[5] * p[1] + m[9] * p[2] + m[13],
      m[2] * p[0] + m[6] * p[1] + m[10] * p[2] + m[14],
      m[3] * p[0] + m[7] * p[1] + m[11] * p[2] + m[15],
    ];
  },
};

export function norm3(a: number[]): number[] {
  const n = Math.hypot(a[0], a[1], a[2]) || 1;
  return [a[0] / n, a[1] / n, a[2] / n];
}
export function cross3(a: number[], b: number[]): number[] {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}
export function dot3(a: number[], b: number[]): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

export interface MeshData {
  positions: Float32Array;
  normals: Float32Array;
  colors: Float32Array;
  indices: Uint32Array;
}

export function emptyMesh(): MeshData {
  return {
    positions: new Float32Array(0),
    normals: new Float32Array(0),
    colors: new Float32Array(0),
    indices: new Uint32Array(0),
  };
}

export class MeshBuilder {
  pos: number[] = [];
  nrm: number[] = [];
  col: number[] = [];
  idx: number[] = [];

  get vertexCount() {
    return this.pos.length / 3;
  }

  addVertex(p: number[], n: number[], c: number[]) {
    this.pos.push(p[0], p[1], p[2]);
    this.nrm.push(n[0], n[1], n[2]);
    this.col.push(c[0], c[1], c[2], c[3]);
    return this.vertexCount - 1;
  }

  addTriangle(a: number, b: number, c: number) {
    this.idx.push(a, b, c);
  }

  addQuad(a: number, b: number, c: number, d: number) {
    this.idx.push(a, b, c, a, c, d);
  }

  build(): MeshData {
    return {
      positions: new Float32Array(this.pos),
      normals: new Float32Array(this.nrm),
      colors: new Float32Array(this.col),
      indices: new Uint32Array(this.idx),
    };
  }
}

/** Tube along a polyline (closed or open), used for frame struts and ring outlines. */
export function tubeAlong(
  path: number[][],
  radius: number,
  color: number[],
  closed = true,
  segments = 6,
  colorAt?: (i: number) => number[],
): MeshData {
  const b = new MeshBuilder();
  const n = path.length;
  if (n < 2) return emptyMesh();
  const count = closed ? n : n;
  for (let i = 0; i < count; i++) {
    const prev = path[(i - 1 + n) % n];
    const next = path[(i + 1) % n];
    const cur = path[i];
    const tangent = norm3([next[0] - prev[0], next[1] - prev[1], next[2] - prev[2]]);
    const ref = Math.abs(tangent[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
    const n1 = norm3(cross3(tangent, ref));
    const n2 = cross3(tangent, n1);
    const c = colorAt ? colorAt(i) : color;
    for (let s = 0; s < segments; s++) {
      const a = (s / segments) * Math.PI * 2;
      const nx = n1[0] * Math.cos(a) + n2[0] * Math.sin(a);
      const ny = n1[1] * Math.cos(a) + n2[1] * Math.sin(a);
      const nz = n1[2] * Math.cos(a) + n2[2] * Math.sin(a);
      b.addVertex(
        [cur[0] + nx * radius, cur[1] + ny * radius, cur[2] + nz * radius],
        [nx, ny, nz],
        c,
      );
    }
  }
  const rings = closed ? n : n - 1;
  for (let i = 0; i < rings; i++) {
    const i0 = i * segments;
    const i1 = ((i + 1) % n) * segments;
    for (let s = 0; s < segments; s++) {
      const s1 = (s + 1) % segments;
      b.addQuad(i0 + s, i0 + s1, i1 + s1, i1 + s);
    }
  }
  return b.build();
}

/** Lathe surface: radii[j][i] at height levels[j] around theta[i]. */
export function latheSurface(
  theta: number[],
  levels: number[],
  radii: number[][],
  center: number[],
  axisU: number[],
  axisV: number[],
  axisN: number[],
  color: number[] | ((i: number, j: number) => number[]),
  cap = true,
): MeshData {
  const b = new MeshBuilder();
  const ni = theta.length;
  const nj = levels.length;
  const getColor = typeof color === 'function' ? color : () => color;
  const grid: number[][] = [];
  for (let j = 0; j < nj; j++) {
    const row: number[] = [];
    for (let i = 0; i < ni; i++) {
      const a = theta[i];
      const r = radii[j][i];
      const p = [
        center[0] + axisU[0] * Math.cos(a) * r + axisV[0] * Math.sin(a) * r + axisN[0] * levels[j],
        center[1] + axisU[1] * Math.cos(a) * r + axisV[1] * Math.sin(a) * r + axisN[1] * levels[j],
        center[2] + axisU[2] * Math.cos(a) * r + axisV[2] * Math.sin(a) * r + axisN[2] * levels[j],
      ];
      // approximate normal: radial direction, tilted by radius change over height
      const dr = j > 0 && j < nj - 1 ? (radii[j + 1][i] - radii[j - 1][i]) / (levels[j + 1] - levels[j - 1] || 1) : 0;
      const radial = [
        axisU[0] * Math.cos(a) + axisV[0] * Math.sin(a),
        axisU[1] * Math.cos(a) + axisV[1] * Math.sin(a),
        axisU[2] * Math.cos(a) + axisV[2] * Math.sin(a),
      ];
      const nrm = norm3([
        radial[0] - axisN[0] * dr,
        radial[1] - axisN[1] * dr,
        radial[2] - axisN[2] * dr,
      ]);
      row.push(b.addVertex(p, nrm, getColor(i, j)));
    }
    grid.push(row);
  }
  for (let j = 0; j < nj - 1; j++) {
    for (let i = 0; i < ni; i++) {
      const i1 = (i + 1) % ni;
      b.addQuad(grid[j][i], grid[j][i1], grid[j + 1][i1], grid[j + 1][i]);
    }
  }
  if (cap) {
    // bottom cap
    const centreB = b.addVertex(center.slice(), axisN.map((x) => -x), getColor(0, 0));
    for (let i = 0; i < ni; i++) b.addTriangle(centreB, grid[0][(i + 1) % ni], grid[0][i]);
  }
  return b.build();
}

export function mergeMeshes(list: MeshData[]): MeshData {
  let vcount = 0;
  let icount = 0;
  for (const m of list) {
    vcount += m.positions.length / 3;
    icount += m.indices.length;
  }
  const positions = new Float32Array(vcount * 3);
  const normals = new Float32Array(vcount * 3);
  const colors = new Float32Array(vcount * 4);
  const indices = new Uint32Array(icount);
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
