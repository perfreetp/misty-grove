// ============================================================
// WebGL2 渲染器：相机轨道控制 + 边坡/构件场景绘制 + 射线拾取
// ============================================================
import type {
  Ditch, FaceWall, FrameBeam, MonitorPoint, ProtectionComponents, SlopeModel, Vec3,
} from '../types';
import {
  identity, invert, lookAt, multiply, perspective, rayFromNdc, transformPoint,
  v3, type Mat4, type Ray, clamp,
} from '../core/math';
import { pointOnFace } from '../core/geometry';

const VERT = `#version 300 es
layout(location=0) in vec3 aPos;
layout(location=1) in vec3 aColor;
layout(location=2) in vec3 aNormal;
uniform mat4 uViewProj;
out vec3 vColor;
out vec3 vNormal;
out vec3 vWorld;
void main() {
  vColor = aColor;
  vNormal = aNormal;
  vWorld = aPos;
  gl_Position = uViewProj * vec4(aPos, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
in vec3 vColor;
in vec3 vNormal;
in vec3 vWorld;
uniform vec3 uLightDir;
uniform vec3 uEye;
uniform float uAlpha;
uniform int uUnlit;
out vec4 frag;
void main() {
  vec3 base = vColor;
  if (uUnlit == 1) {
    frag = vec4(base, uAlpha);
    return;
  }
  vec3 n = normalize(vNormal);
  float diff = max(dot(n, normalize(-uLightDir)), 0.0);
  vec3 viewDir = normalize(uEye - vWorld);
  vec3 h = normalize(normalize(-uLightDir) + viewDir);
  float spec = pow(max(dot(n, h), 0.0), 24.0) * 0.25;
  float ambient = 0.55;
  vec3 col = base * (ambient + 0.5 * diff) + vec3(spec);
  // 简单距离雾，增强纵深
  float dist = length(uEye - vWorld);
  float fog = clamp((dist - 220.0) / 260.0, 0.0, 0.55);
  col = mix(col, vec3(0.05, 0.08, 0.12), fog);
  frag = vec4(col, uAlpha);
}`;

interface Drawable {
  vao: WebGLVertexArrayObject;
  count: number;
  mode: number;
  alpha: number;
  unlit: boolean;
}

export const COLORS = {
  frame: [0.18, 0.62, 0.95] as Vec3,
  frameHi: [1.0, 0.84, 0.25] as Vec3,
  anchor: [0.95, 0.35, 0.32] as Vec3,
  anchorDense: [1.0, 0.62, 0.15] as Vec3,
  ditch: [0.2, 0.85, 0.8] as Vec3,
  wall: [0.55, 0.8, 0.5] as Vec3,
  monitor: [0.78, 0.6, 0.98] as Vec3,
  boundary: [1.0, 0.92, 0.3] as Vec3,
  grid: [0.32, 0.42, 0.55] as Vec3,
  white: [0.9, 0.95, 1.0] as Vec3,
};

class GeoBuilder {
  positions: number[] = [];
  colors: number[] = [];
  normals: number[] = [];
  indices: number[] = [];

  private addVertex(p: Vec3, c: Vec3, n: Vec3) {
    this.positions.push(p[0], p[1], p[2]);
    this.colors.push(c[0], c[1], c[2]);
    this.normals.push(n[0], n[1], n[2]);
  }

  addBox(p0: Vec3, p1: Vec3, axisA: Vec3, halfA: number, halfB: number, color: Vec3) {
    const dir = v3.norm(v3.sub(p1, p0));
    const a = v3.norm(axisA);
    const b = v3.norm(v3.cross(dir, a));
    // 8 个角点：端点 0/1 × a ± × b ±
    const verts: { p: Vec3; n: Vec3 }[] = [];
    for (const end of [p0, p1]) {
      for (const sa of [-1, 1]) {
        for (const sb of [-1, 1]) {
          const off = v3.add(v3.scale(a, sa * halfA), v3.scale(b, sb * halfB));
          verts.push({ p: v3.add(end, off), n: v3.norm(v3.add(v3.scale(a, sa), v3.scale(b, sb))) });
        }
      }
    }
    const base = this.positions.length / 3;
    for (const v of verts) this.addVertex(v.p, color, v.n);
    // 索引：每端 4 角，编码 end*4 + saIdx*2 + sbIdx
    const idx = (e: number, sai: number, sbi: number) => base + e * 4 + sai * 2 + sbi;
    for (let sai = 0; sai < 2; sai++) for (let sbi = 0; sbi < 2; sbi++) {
      // 侧面
      const other = (sbi + 1) % 2;
      this.indices.push(idx(0, sai, sbi), idx(1, sai, sbi), idx(1, sai, other), idx(0, sai, sbi), idx(1, sai, other), idx(0, sai, other));
      const oa = (sai + 1) % 2;
      this.indices.push(idx(0, sai, sbi), idx(0, oa, sbi), idx(1, oa, sbi), idx(0, sai, sbi), idx(1, oa, sbi), idx(1, sai, sbi));
    }
    // 端盖
    for (const e of [0, 1]) {
      this.indices.push(idx(e, 0, 0), idx(e, 0, 1), idx(e, 1, 1), idx(e, 0, 0), idx(e, 1, 1), idx(e, 1, 0));
    }
  }

  addSphere(center: Vec3, radius: number, color: Vec3, seg = 12, rings = 8) {
    const base = this.positions.length / 3;
    for (let r = 0; r <= rings; r++) {
      const theta = (Math.PI * r) / rings;
      const st = Math.sin(theta), ct = Math.cos(theta);
      for (let s = 0; s <= seg; s++) {
        const phi = (2 * Math.PI * s) / seg;
        const n: Vec3 = [st * Math.cos(phi), ct, st * Math.sin(phi)];
        this.addVertex(v3.add(center, v3.scale(n, radius)), color, n);
      }
    }
    const row = seg + 1;
    for (let r = 0; r < rings; r++) {
      for (let s = 0; s < seg; s++) {
        const a = base + r * row + s;
        this.indices.push(a, a + row, a + 1, a + 1, a + row, a + row + 1);
      }
    }
  }

  addLine(p0: Vec3, p1: Vec3, color: Vec3) {
    const base = this.positions.length / 3;
    const n: Vec3 = [0, 1, 0];
    this.addVertex(p0, color, n);
    this.addVertex(p1, color, n);
    this.indices.push(base, base + 1);
  }

  addLineStrip(points: Vec3[], color: Vec3) {
    const base = this.positions.length / 3;
    for (const p of points) this.addVertex(p, color, [0, 1, 0]);
    for (let i = 0; i < points.length - 1; i++) this.indices.push(base + i, base + i + 1);
  }
}

export class Renderer {
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram;
  private uViewProj: WebGLUniformLocation;
  private uLightDir: WebGLUniformLocation;
  private uEye: WebGLUniformLocation;
  private uAlpha: WebGLUniformLocation;
  private uUnlit: WebGLUniformLocation;
  private drawables: Drawable[] = [];
  private model!: SlopeModel;
  private components: ProtectionComponents = { frames: [], ditches: [], walls: [], monitors: [] };
  private highlightGrade: string | null = null;

  // 相机（球坐标）
  private azim = -0.65;
  private elev = 0.38;
  private dist = 260;
  private target: Vec3 = [90, 300, 6];
  private viewProj: Mat4 = identity();
  private invViewProj: Mat4 = identity();

  constructor(private canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl2', { antialias: true, alpha: false });
    if (!gl) throw new Error('当前浏览器不支持 WebGL2');
    this.gl = gl;
    this.program = this.buildProgram(VERT, FRAG);
    this.uViewProj = gl.getUniformLocation(this.program, 'uViewProj')!;
    this.uLightDir = gl.getUniformLocation(this.program, 'uLightDir')!;
    this.uEye = gl.getUniformLocation(this.program, 'uEye')!;
    this.uAlpha = gl.getUniformLocation(this.program, 'uAlpha')!;
    this.uUnlit = gl.getUniformLocation(this.program, 'uUnlit')!;
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.clearColor(0.045, 0.07, 0.1, 1);
  }

  private buildProgram(vsSrc: string, fsSrc: string): WebGLProgram {
    const gl = this.gl;
    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        throw new Error('着色器编译失败: ' + gl.getShaderInfoLog(sh));
      }
      return sh;
    };
    const p = gl.createProgram()!;
    gl.attachShader(p, compile(gl.VERTEX_SHADER, vsSrc));
    gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fsSrc));
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      throw new Error('程序链接失败: ' + gl.getProgramInfoLog(p));
    }
    return p;
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.floor(this.canvas.clientWidth * dpr);
    const h = Math.floor(this.canvas.clientHeight * dpr);
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
  }

  frameTarget(config: { slopeLength: number; topElev: number; toeElev: number }) {
    this.target = [config.slopeLength / 2, (config.topElev + config.toeElev) / 2, 6];
    this.dist = Math.max(200, config.slopeLength * 1.7);
  }

  setScene(model: SlopeModel, components: ProtectionComponents, highlightGrade: string | null) {
    this.model = model;
    this.components = components;
    this.highlightGrade = highlightGrade;
    this.buildDrawables();
  }

  private upload(builder: GeoBuilder, mode: number, alpha: number, unlit: boolean): Drawable {
    const gl = this.gl;
    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    const buf = (data: Float32Array | Uint32Array, loc: number, size: number) => {
      const bo = gl.createBuffer()!;
      gl.bindBuffer(gl.ARRAY_BUFFER, bo);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
    };
    buf(new Float32Array(builder.positions), 0, 3);
    buf(new Float32Array(builder.colors), 1, 3);
    buf(new Float32Array(builder.normals), 2, 3);
    const ibo = gl.createBuffer()!;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(builder.indices), gl.STATIC_DRAW);
    gl.bindVertexArray(null);
    return { vao, count: builder.indices.length, mode, alpha, unlit };
  }

  private buildDrawables() {
    this.disposeDrawables();
    const gl = this.gl;
    const m = this.model;

    // 1) 边坡主体（地质着色网格）
    const slopeVao = gl.createVertexArray()!;
    gl.bindVertexArray(slopeVao);
    this.bindAttr(m.mesh.positions, 0, 3);
    this.bindAttr(m.mesh.colors, 1, 3);
    const normals = this.computeNormals(m.mesh.positions, m.mesh.indices);
    this.bindAttr(normals, 2, 3);
    const ibo = gl.createBuffer()!;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, m.mesh.indices, gl.STATIC_DRAW);
    gl.bindVertexArray(null);
    this.drawables.push({ vao: slopeVao, count: m.mesh.indices.length, mode: gl.TRIANGLES, alpha: 1, unlit: false });

    // 2) 线条（网格 / 土岩分界 / 平台棱线）
    const lines = new GeoBuilder();
    this.addGroundGrid(lines);
    for (const face of m.faces) {
      // 坡顶、坡脚棱线
      lines.addLine(face.topStart, face.topEnd, COLORS.white);
      lines.addLine(face.toeStart, face.toeEnd, COLORS.grid);
      // 土岩分界
      if (face.boundaryS !== null) {
        const a = pointOnFace(face, 0, face.boundaryS);
        const b = pointOnFace(face, this.configLength(), face.boundaryS);
        const lift = v3.scale(face.normal, 0.18);
        lines.addLine(v3.add(a, lift), v3.add(b, lift), COLORS.boundary);
      }
    }
    this.drawables.push(this.upload(lines, gl.LINES, 1, true));

    // 3) 框架梁 + 锚杆
    for (const frame of this.components.frames) {
      this.drawFrame(frame);
    }
    // 4) 截水沟
    for (const ditch of this.components.ditches) this.drawDitch(ditch);
    // 5) 护面墙
    for (const wall of this.components.walls) this.drawWall(wall);
    // 6) 监测点
    for (const mon of this.components.monitors) this.drawMonitor(mon);
  }

  private configLength(): number {
    return this.model.faces[0] ? this.model.faces[0].topEnd[0] : 1;
  }

  private bindAttr(data: Float32Array, loc: number, size: number) {
    const gl = this.gl;
    const bo = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, bo);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
  }

  private computeNormals(pos: Float32Array, idx: Uint32Array): Float32Array {
    const n = new Float32Array(pos.length);
    for (let i = 0; i < idx.length; i += 3) {
      const ia = idx[i] * 3, ib = idx[i + 1] * 3, ic = idx[i + 2] * 3;
      const a: Vec3 = [pos[ia], pos[ia + 1], pos[ia + 2]];
      const b: Vec3 = [pos[ib], pos[ib + 1], pos[ib + 2]];
      const c: Vec3 = [pos[ic], pos[ic + 1], pos[ic + 2]];
      const nn = v3.cross(v3.sub(b, a), v3.sub(c, a));
      for (const k of [ia, ib, ic]) { n[k] += nn[0]; n[k + 1] += nn[1]; n[k + 2] += nn[2]; }
    }
    for (let i = 0; i < n.length; i += 3) {
      const l = Math.hypot(n[i], n[i + 1], n[i + 2]) || 1;
      n[i] /= l; n[i + 1] /= l; n[i + 2] /= l;
    }
    return n;
  }

  private addGroundGrid(g: GeoBuilder) {
    const L = this.configLength();
    const minY = Math.min(...this.model.sectionPoints.map((p) => p[1])) - 6;
    const maxZ = Math.max(...this.model.sectionPoints.map((p) => p[2])) + 12;
    for (let x = 0; x <= L; x += 15) {
      g.addLine([x, minY, -8], [x, minY, maxZ], COLORS.grid);
    }
    for (let z = -8; z <= maxZ; z += 15) {
      g.addLine([0, minY, z], [L, minY, z], COLORS.grid);
    }
  }

  private drawFrame(frame: FrameBeam) {
    const face = this.model.faces.find((f) => f.gradeId === frame.gradeId)!;
    const hi = this.highlightGrade === frame.gradeId;
    const beamColor: Vec3 = hi ? COLORS.frameHi : COLORS.frame;
    const lift = v3.scale(face.normal, 0.22);
    const g = new GeoBuilder();

    // 收集节点网格坐标
    const cols = frame.colCount + 1;
    const rowsPerCol = frame.anchors.length / cols;
    const nodeAt = (col: number, row: number) =>
      frame.anchors[col * rowsPerCol + row];

    // 竖梁（沿倾向，每列一根）
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rowsPerCol - 1; r++) {
        const p0 = v3.add(nodeAt(c, r).pos, lift);
        const p1 = v3.add(nodeAt(c, r + 1).pos, lift);
        g.addBox(p0, p1, [1, 0, 0], 0.2, 0.175, beamColor);
      }
    }
    // 横梁（沿走向，每排一根）
    for (let r = 0; r < rowsPerCol; r++) {
      for (let c = 0; c < cols - 1; c++) {
        const p0 = v3.add(nodeAt(c, r).pos, lift);
        const p1 = v3.add(nodeAt(c + 1, r).pos, lift);
        g.addBox(p0, p1, face.dipDir, 0.2, 0.175, beamColor);
      }
    }
    this.drawables.push(this.upload(g, this.gl.TRIANGLES, 1, false));

    // 锚杆：坡面节点小球 + 锚入杆体（沿 -normal，长度随岩层）
    const ag = new GeoBuilder();
    for (const a of frame.anchors) {
      const col: Vec3 = a.densified ? COLORS.anchorDense : COLORS.anchor;
      const head = v3.add(a.pos, v3.scale(face.normal, 0.25));
      const tail = v3.add(head, v3.scale(face.normal, -a.length));
      ag.addLine(head, tail, col);
    }
    this.drawables.push(this.upload(ag, this.gl.LINES, 1, true));

    const sg = new GeoBuilder();
    for (const a of frame.anchors) {
      const col: Vec3 = a.densified ? COLORS.anchorDense : COLORS.anchor;
      sg.addSphere(v3.add(a.pos, v3.scale(face.normal, 0.28)), 0.45, col, 10, 7);
    }
    this.drawables.push(this.upload(sg, this.gl.TRIANGLES, 1, false));
  }

  private drawDitch(ditch: Ditch) {
    if (ditch.path.length < 2) return;
    const g = new GeoBuilder();
    for (let i = 0; i < ditch.path.length - 1; i++) {
      const p0 = ditch.path[i], p1 = ditch.path[i + 1];
      g.addBox(p0, p1, [0, 1, 0], 0.45, 0.35, COLORS.ditch);
    }
    this.drawables.push(this.upload(g, this.gl.TRIANGLES, 0.92, false));
  }

  private drawWall(wall: FaceWall) {
    const face = this.model.faces.find((f) => f.gradeId === wall.gradeId)!;
    const g = new GeoBuilder();
    const lift = v3.scale(face.normal, 0.12);
    const p0 = v3.add(pointOnFace(face, wall.startX, 0), lift);
    const p1 = v3.add(pointOnFace(face, wall.endX, 0), lift);
    const p2 = v3.add(pointOnFace(face, wall.endX, face.slopeLength), lift);
    const p3 = v3.add(pointOnFace(face, wall.startX, face.slopeLength), lift);
    const base = g.positions.length / 3;
    const c = COLORS.wall;
    for (const p of [p0, p1, p2, p3]) g.positions.push(...p), g.colors.push(...c), g.normals.push(...face.normal);
    g.indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
    this.drawables.push(this.upload(g, this.gl.TRIANGLES, 0.45, false));
  }

  private drawMonitor(mon: MonitorPoint) {
    const g = new GeoBuilder();
    const top = v3.add(mon.pos, [0, 1.6, 0]);
    g.addLine(mon.pos, top, COLORS.monitor);
    g.addSphere(top, 0.7, COLORS.monitor, 12, 8);
    this.drawables.push(this.upload(g, this.gl.TRIANGLES, 1, false));
  }

  private disposeDrawables() {
    const gl = this.gl;
    for (const d of this.drawables) gl.deleteVertexArray(d.vao);
    this.drawables = [];
  }

  // ---------------- 相机控制 ----------------
  rotate(dx: number, dy: number) {
    this.azim -= dx * 0.006;
    this.elev = clamp(this.elev + dy * 0.005, -0.2, 1.35);
  }

  zoom(delta: number) {
    this.dist = clamp(this.dist * (1 + delta * 0.0012), 30, 600);
  }

  pan(dx: number, dy: number) {
    const eye = this.eyePos();
    const right = v3.norm(v3.cross(v3.sub(eye, this.target), [0, 1, 0]));
    const up: Vec3 = [0, 1, 0];
    const scale = this.dist * 0.0016;
    this.target = v3.add(this.target, v3.add(v3.scale(right, -dx * scale), v3.scale(up, dy * scale)));
  }

  private eyePos(): Vec3 {
    const ce = Math.cos(this.elev);
    return [
      this.target[0] + this.dist * ce * Math.cos(this.azim),
      this.target[1] + this.dist * Math.sin(this.elev),
      this.target[2] + this.dist * ce * Math.sin(this.azim),
    ];
  }

  screenRay(clientX: number, clientY: number): Ray {
    const rect = this.canvas.getBoundingClientRect();
    const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
    const ndcY = 1 - ((clientY - rect.top) / rect.height) * 2;
    return rayFromNdc(ndcX, ndcY, this.invViewProj);
  }

  /** 世界坐标投影到屏幕（用于 HTML 标签定位） */
  worldToScreen(p: Vec3): { x: number; y: number; visible: boolean } {
    const clip = transformPoint(this.viewProj, p);
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: (clip[0] * 0.5 + 0.5) * rect.width,
      y: (-clip[1] * 0.5 + 0.5) * rect.height,
      visible: clip[2] >= -1 && clip[2] <= 1,
    };
  }

  render() {
    const gl = this.gl;
    this.resize();
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const aspect = this.canvas.width / this.canvas.height;
    const proj = perspective((45 * Math.PI) / 180, aspect, 0.5, 2000);
    const view = lookAt(this.eyePos(), this.target, [0, 1, 0]);
    this.viewProj = multiply(proj, view);
    this.invViewProj = invert(this.viewProj);

    gl.useProgram(this.program);
    gl.uniformMatrix4fv(this.uViewProj, false, this.viewProj);
    gl.uniform3f(this.uLightDir, -0.5, -0.8, -0.35);
    const eye = this.eyePos();
    gl.uniform3f(this.uEye, eye[0], eye[1], eye[2]);

    for (const d of this.drawables) {
      gl.uniform1f(this.uAlpha, d.alpha);
      gl.uniform1i(this.uUnlit, d.unlit ? 1 : 0);
      gl.bindVertexArray(d.vao);
      if (d.alpha < 1) {
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.depthMask(false);
      } else {
        gl.disable(gl.BLEND);
        gl.depthMask(true);
      }
      gl.drawElements(d.mode, d.count, gl.UNSIGNED_INT, 0);
    }
    gl.depthMask(true);
    gl.disable(gl.BLEND);
    gl.bindVertexArray(null);
  }

  dispose() {
    this.disposeDrawables();
  }
}
