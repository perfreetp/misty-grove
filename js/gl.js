/* BoardDocs Studio — WebGL2 分层板卡渲染器
   自包含：矩阵、程序、网格构建、轨道相机、拾取、分层动画。 */
import { U } from './util.js';

/* ============================================================
   Math
   ============================================================ */
export const M = {
  ident: () => new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
  mul(a, b) {
    const o = new Float32Array(16);
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++) {
        let s = 0;
        for (let k = 0; k < 4; k++) s += a[k * 4 + j] * b[i * 4 + k];
        o[i * 4 + j] = s;
      }
    return o;
  },
  perspective(fovy, aspect, near, far) {
    const f = 1 / Math.tan(fovy / 2), nf = 1 / (near - far);
    return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]);
  },
  lookAt(eye, center, up) {
    let zx = eye[0] - center[0], zy = eye[1] - center[1], zz = eye[2] - center[2];
    let l = Math.hypot(zx, zy, zz) || 1;
    zx /= l; zy /= l; zz /= l;
    let xx = up[1] * zz - up[2] * zy, xy = up[2] * zx - up[0] * zz, xz = up[0] * zy - up[1] * zx;
    l = Math.hypot(xx, xy, xz) || 1;
    xx /= l; xy /= l; xz /= l;
    const yx = zy * xz - zz * xy, yy = zz * xx - zx * xz, yz = zx * xy - zy * xx;
    return new Float32Array([
      xx, yx, zx, 0,
      xy, yy, zy, 0,
      xz, yz, zz, 0,
      -(xx * eye[0] + xy * eye[1] + xz * eye[2]),
      -(yx * eye[0] + yy * eye[1] + yz * eye[2]),
      -(zx * eye[0] + zy * eye[1] + zz * eye[2]),
      1,
    ]);
  },
  translate(x, y, z) {
    return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]);
  },
  scale(s) {
    return new Float32Array([s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, 1]);
  },
  rotY(a) {
    const c = Math.cos(a), s = Math.sin(a);
    return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);
  },
  xform(m, p) {
    const [x, y, z] = p;
    return [
      m[0] * x + m[4] * y + m[8] * z + m[12],
      m[1] * x + m[5] * y + m[9] * z + m[13],
      m[2] * x + m[6] * y + m[10] * z + m[14],
      m[3] * x + m[7] * y + m[11] * z + m[15],
    ];
  },
};

/* ============================================================
   Shaders
   ============================================================ */
const PIN_Y = 0.265;
const BOARD_TOP = 0.12;

const VS_MESH = `#version 300 es
layout(location=0) in vec3 aPos;
layout(location=1) in vec3 aNrm;
layout(location=2) in vec3 aCol;
uniform mat4 uVP;
uniform mat4 uModel;
out vec3 vN; out vec3 vC; out vec3 vW;
void main(){
  vec4 w = uModel * vec4(aPos, 1.0);
  vW = w.xyz;
  vN = mat3(uModel) * aNrm;
  vC = aCol;
  gl_Position = uVP * w;
}`;

const FS_MESH = `#version 300 es
precision highp float;
in vec3 vN; in vec3 vC; in vec3 vW;
uniform vec3 uTint;
uniform float uAlpha;
uniform float uGlow;
uniform float uMetal;
uniform vec3 uEye;
out vec4 outColor;
void main(){
  vec3 n = normalize(vN);
  vec3 L1 = normalize(vec3(0.42, 0.92, 0.52));
  vec3 L2 = normalize(vec3(-0.65, 0.30, -0.55));
  vec3 base = vC * uTint;
  float d1 = max(dot(n, L1), 0.0);
  float d2 = max(dot(n, L2), 0.0);
  vec3 col = base * (0.30 + 0.62 * d1) + base * 0.20 * d2;
  vec3 V = normalize(uEye - vW);
  vec3 H = normalize(L1 + V);
  float spec = pow(max(dot(n, H), 0.0), mix(16.0, 80.0, uMetal)) * mix(0.20, 0.85, uMetal);
  col += vec3(spec);
  float fres = pow(1.0 - max(dot(n, V), 0.0), 3.0);
  col += fres * vec3(0.30, 0.55, 0.62) * (0.45 + uMetal * 0.8);
  col += uGlow * (base * 0.9 + vec3(0.06, 0.12, 0.12));
  float fog = clamp((length(vW - uEye) - 13.0) / 34.0, 0.0, 0.62);
  col = mix(col, vec3(0.035, 0.055, 0.07), fog);
  outColor = vec4(col, uAlpha);
}`;

const VS_FLOOR = `#version 300 es
layout(location=0) in vec2 aPos;
uniform mat4 uVP;
out vec2 vW;
void main(){
  vW = aPos;
  gl_Position = uVP * vec4(aPos.x, 0.0, aPos.y, 1.0);
}`;

const FS_FLOOR = `#version 300 es
precision highp float;
in vec2 vW;
uniform vec2 uBoard;
uniform vec3 uAccent;
out vec4 outColor;
float gridLine(vec2 p, float step, float w){
  vec2 g = abs(fract(p / step - 0.5) - 0.5) * step;
  float d = min(g.x, g.y);
  return 1.0 - smoothstep(0.0, w, d);
}
void main(){
  float r = length(vW);
  float fade = 1.0 - smoothstep(5.0, 26.0, r);
  vec2 q = vW / (uBoard * 0.72);
  float shadow = 1.0 - smoothstep(0.55, 1.5, length(q));
  float g1 = gridLine(vW, 1.0, 0.02) * 0.5;
  float g2 = gridLine(vW, 5.0, 0.035) * 0.85;
  vec3 col = vec3(0.035, 0.052, 0.068);
  col += uAccent * (g1 + g2) * 0.16;
  col *= 1.0 - shadow * 0.55;
  col = mix(col, vec3(0.028, 0.042, 0.056), 1.0 - fade);
  outColor = vec4(col, fade * (0.55 + shadow * 0.45));
}`;

/* ============================================================
   Mesh builder
   ============================================================ */
class Mesh {
  constructor() {
    this.v = []; // pos3 nrm3 col3
  }
  tri(a, b, c, col, colB, colC) {
    const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    const vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    const l = Math.hypot(nx, ny, nz) || 1;
    nx /= l; ny /= l; nz /= l;
    const ca = colB || col, cb = colC || col;
    for (const [pos, cc] of [[a, col], [b, ca], [c, cb]]) this.v.push(pos[0], pos[1], pos[2], nx, ny, nz, cc[0], cc[1], cc[2]);
  }
  quad(a, b, c, d, col) {
    // a-b-c-d counter-clockwise
    this.tri(a, b, c, col);
    this.tri(a, c, d, col);
  }
  box(cx, cy, cz, w, h, d, col, opt) {
    const x0 = cx - w / 2, x1 = cx + w / 2;
    const y0 = cy - h / 2, y1 = cy + h / 2;
    const z0 = cz - d / 2, z1 = cz + d / 2;
    const top = opt?.top || col, side = col, bot = opt?.bottom || shade(col, 0.55);
    this.quad([x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0], top); // +y
    this.quad([x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1], bot); // -y
    this.quad([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1], side); // +z
    this.quad([x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0], shade(side, 0.86)); // -z
    this.quad([x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1], shade(side, 0.94)); // +x
    this.quad([x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0], shade(side, 0.8)); // -x
  }
  cyl(cx, cy, cz, r, h, seg, col, topCol) {
    const y0 = cy, y1 = cy + h;
    const tc = topCol || col;
    for (let i = 0; i < seg; i++) {
      const a0 = (i / seg) * Math.PI * 2, a1 = ((i + 1) / seg) * Math.PI * 2;
      const x0 = cx + Math.cos(a0) * r, z0 = cz + Math.sin(a0) * r;
      const x1 = cx + Math.cos(a1) * r, z1 = cz + Math.sin(a1) * r;
      this.tri([x0, y0, z0], [x1, y0, z1], [x1, y1, z1], shade(col, 0.85));
      this.tri([x0, y0, z0], [x1, y1, z1], [x0, y1, z0], shade(col, 0.85));
      this.tri([cx, y1, cz], [x1, y1, z1], [x0, y1, z0], tc);
    }
  }
  ring(cx, cy, cz, r0, r1, seg) {
    // flat annulus facing +y
    for (let i = 0; i < seg; i++) {
      const a0 = (i / seg) * Math.PI * 2, a1 = ((i + 1) / seg) * Math.PI * 2;
      const c0 = Math.cos(a0), s0 = Math.sin(a0), c1 = Math.cos(a1), s1 = Math.sin(a1);
      this.quad(
        [cx + c0 * r0, cy, cz + s0 * r0],
        [cx + c1 * r0, cy, cz + s1 * r0],
        [cx + c1 * r1, cy, cz + s1 * r1],
        [cx + c0 * r1, cy, cz + s0 * r1],
        [1, 1, 1]
      );
    }
  }
  get count() {
    return this.v.length / 9;
  }
  float32() {
    return new Float32Array(this.v);
  }
}
function shade(c, k) {
  return [c[0] * k, c[1] * k, c[2] * k];
}
const rgb = (hex) => U.hexToRgb(hex);

/* ============================================================
   Renderer
   ============================================================ */
export class BoardRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.gl = canvas.getContext('webgl2', { antialias: true, alpha: false, premultipliedAlpha: false });
    this.ok = !!this.gl;
    if (!this.ok) return;
    const gl = this.gl;
    this.progMesh = this.#program(VS_MESH, FS_MESH);
    this.progFloor = this.#program(VS_FLOOR, FS_FLOOR);
    this.uMesh = this.#uniforms(this.progMesh, ['uVP', 'uModel', 'uTint', 'uAlpha', 'uGlow', 'uMetal', 'uEye']);
    this.uFloor = this.#uniforms(this.progFloor, ['uVP', 'uBoard', 'uAccent']);
    this.floorVAO = this.#makeFloor();
    this.cache = new Map();
    this.cam = { yaw: -0.62, pitch: 0.62, dist: 16.5, tx: 0, ty: 0.3, tz: 0.4 };
    this.target = { ...this.cam };
    this.view = { content: null, board: null };
    this.state = {
      visible: null,
      highlightGroups: new Set(),
      selectedPinId: null,
      hoverPinId: null,
      conflictPins: new Set(),
      selectedLayerId: null,
      stepLayerIds: new Set(),
      dimPins: false,
      pinInteractive: true,
    };
    this.layers = [];
    this.pins = [];
    this.conflictsOn = true;
    this.pulse = 0;
    this.eye = [0, 0, 20];
    this.vp = M.ident();
    this.cssW = 1;
    this.cssH = 1;
    this.#bind();
    this.resize();
  }

  /* ---------- gl helpers ---------- */
  #shader(type, src) {
    const gl = this.gl;
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader error');
    return s;
  }
  #program(vs, fs) {
    const gl = this.gl;
    const p = gl.createProgram();
    gl.attachShader(p, this.#shader(gl.VERTEX_SHADER, vs));
    gl.attachShader(p, this.#shader(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) || 'link error');
    return p;
  }
  #uniforms(prog, names) {
    const gl = this.gl, o = {};
    names.forEach((n) => (o[n] = gl.getUniformLocation(prog, n)));
    return o;
  }
  #makeFloor() {
    const gl = this.gl;
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    const S = 70;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-S, -S, S, -S, S, S, -S, -S, S, S, -S, S]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);
    return vao;
  }
  #meshVAO(mesh) {
    const gl = this.gl;
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, mesh.float32(), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 36, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 36, 12);
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 36, 24);
    gl.bindVertexArray(null);
    return { vao, n: mesh.count };
  }

  /* ---------- input ---------- */
  #bind() {
    const c = this.canvas;
    let drag = null;
    c.addEventListener('pointerdown', (e) => {
      if (e.button === 0 && !e.shiftKey) {
        drag = { mode: 'orbit', x: e.clientX, y: e.clientY, moved: 0 };
      } else {
        drag = { mode: 'pan', x: e.clientX, y: e.clientY, moved: 0 };
      }
      c.setPointerCapture(e.pointerId);
      c.classList.add('panning');
    });
    c.addEventListener('pointermove', (e) => {
      const rect = c.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      if (!drag) {
        this.onHoverCanvas && this.onHoverCanvas(mx, my, e);
        return;
      }
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      drag.moved += Math.abs(dx) + Math.abs(dy);
      drag.x = e.clientX; drag.y = e.clientY;
      if (drag.mode === 'orbit') {
        this.target.yaw -= dx * 0.008;
        this.target.pitch = Math.max(-0.12, Math.min(1.45, this.target.pitch + dy * 0.007));
      } else {
        const s = this.target.dist * 0.0016;
        const cy = Math.cos(this.target.yaw), sy = Math.sin(this.target.yaw);
        this.target.tx -= (dx * cy - dy * sy * 0.6) * s;
        this.target.tz -= (dx * sy + dy * cy * 0.6) * s;
      }
    });
    const end = (e) => {
      if (drag && drag.moved < 5) {
        const rect = c.getBoundingClientRect();
        this.onClickCanvas && this.onClickCanvas(e.clientX - rect.left, e.clientY - rect.top, e);
      }
      drag = null;
      c.classList.remove('panning');
      try { c.releasePointerCapture(e.pointerId); } catch (_) {}
    };
    c.addEventListener('pointerup', end);
    c.addEventListener('pointercancel', () => { drag = null; c.classList.remove('panning'); });
    c.addEventListener('pointerleave', () => { if (!drag) this.onHoverCanvas && this.onHoverCanvas(-1e5, -1e5, null); });
    c.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault();
        this.target.dist = Math.max(3.2, Math.min(48, this.target.dist * (1 + Math.sign(e.deltaY) * 0.11)));
      },
      { passive: false }
    );
    c.addEventListener('dblclick', () => this.resetView());
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(c.parentElement || c);
  }

  resetView() {
    this.target = { yaw: -0.62, pitch: 0.62, dist: 16.5, tx: 0, ty: 0.3, tz: 0.4 };
  }
  focusPin(pin) {
    if (!pin) return;
    this.target.tx = pin.x;
    this.target.tz = pin.z;
    this.target.ty = 0.2;
    this.target.dist = Math.min(this.target.dist, 9);
    this.target.pitch = Math.max(0.62, this.target.pitch);
  }
  resize() {
    if (!this.gl) return;
    const c = this.canvas;
    const rect = c.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(rect.width * dpr));
    const h = Math.max(1, Math.round(rect.height * dpr));
    if (c.width !== w || c.height !== h) {
      c.width = w;
      c.height = h;
    }
    this.cssW = rect.width || 1;
    this.cssH = rect.height || 1;
    this.dpr = dpr;
  }

  /* ---------- content ---------- */
  setContent(board, content, state) {
    const key = board ? board.id + ':' + (content?.layers?.length || 0) + ':' + (content?.pins?.length || 0) : 'none';
    this.board = board;
    this.content = content;
    if (state) Object.assign(this.state, state);
    this.#ensureGeometry(content, key);
  }
  setState(patch) {
    Object.assign(this.state, patch);
  }
  /** 不重建几何，只同步图层位移/缩放/颜色等即时属性（供滑杆连续调整） */
  syncLive(content) {
    if (!content || !this.layers) return;
    for (const L of this.layers) {
      const src = content.layers.find((l) => l.id === L.layer.id);
      if (!src) continue;
      L.layer.offsetX = src.offsetX || 0;
      L.layer.offsetZ = src.offsetZ || 0;
      L.layer.scale = src.scale || 1;
      L.layer.visible = src.visible !== false;
    }
  }

  #ensureGeometry(content, key) {
    if (!content) {
      this.layers = [];
      this.pins = [];
      return;
    }
    const sig =
      key +
      '|' +
      content.layers.map((l) => `${l.id}:${l.name}:${l.kind}:${l.color}:${l.scale}:${l.offsetX}:${l.offsetZ}`).join(',') +
      '|' +
      content.pins.map((p) => `${p.id}:${(p.x ?? 0).toFixed(2)}:${(p.z ?? 0).toFixed(2)}:${p.group}`).join(',') +
      '|' +
      (this.board?.boardW || 6) +
      'x' +
      (this.board?.boardD || 8);
    if (sig === this.geoSig) return;
    this.geoSig = sig;
    const W = this.board?.boardW || 6.4, D = this.board?.boardD || 8.4;
    this.W = W; this.D = D;

    const layerGeom = content.layers.map((layer) => {
      const mesh = new Mesh();
      buildLayer(mesh, layer, W, D, this.board);
      return { layer, mesh, vao: this.#meshVAO(mesh), alpha: layer.kind === 'shell' ? 0.3 : 1, targetY: 0, y: 0, targetAlpha: 1, a: 1, seed: hash(layer.id) };
    });
    this.layers = layerGeom;

    // pins grouped by (group, layer) for batch drawing; they ride on their layer
    const groups = new Map();
    content.pins.forEach((p) => {
      const g = p.group || 'gpio';
      const key = g + '|' + (p.layerId || '');
      if (!groups.has(key)) groups.set(key, { group: g, layerId: p.layerId || null, mesh: new Mesh() });
      const m = groups.get(key).mesh;
      const c = rgb(groupColor(g));
      m.cyl(p.x, PIN_Y, p.z, 0.105, 0.075, 12, shade(c, 0.72), c);
      // pad ring
      m.ring(p.x, PIN_Y - 0.004, p.z, 0.105, 0.155, 14);
    });
    this.pinMeshes = [...groups.values()].map(({ group: g, layerId, mesh }) => ({
      group: g,
      layerId,
      vao: this.#meshVAO(mesh),
      color: rgb(groupColor(g)),
    }));
    this.pins = content.pins;
    this.selRing = this.#meshVAO(mkRingMesh());
    this.bandMesh = this.#meshVAO(mkBandMesh());
  }

  /* ---------- frame ---------- */
  frame(dt) {
    if (!this.gl || !this.content) return;
    const gl = this.gl;
    const cam = this.cam, t = this.target;
    const k = 1 - Math.pow(0.0015, dt || 0.016);
    cam.yaw += (t.yaw - cam.yaw) * k;
    cam.pitch += (t.pitch - cam.pitch) * k;
    cam.dist += (t.dist - cam.dist) * k;
    cam.tx += (t.tx - cam.tx) * k;
    cam.ty += (t.ty - cam.ty) * k;
    cam.tz += (t.tz - cam.tz) * k;

    const cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);
    const eye = [
      cam.tx + Math.sin(cam.yaw) * cp * cam.dist,
      cam.ty + sp * cam.dist,
      cam.tz + Math.cos(cam.yaw) * cp * cam.dist,
    ];
    this.eye = eye;
    const view = M.lookAt(eye, [cam.tx, cam.ty, cam.tz], [0, 1, 0]);
    const proj = M.perspective((38 * Math.PI) / 180, this.cssW / this.cssH, 0.1, 200);
    this.vp = M.mul(proj, view);
    this.pulse += dt || 0.016;

    // layer animation
    const vis = this.state.visible;
    for (const L of this.layers) {
      const wantVisible = !vis || vis.has(L.layer.id);
      const k2 = 1 - Math.pow(0.0025, dt || 0.016);
      L.y += (L.targetY - L.y) * k2;
      const target = wantVisible ? (L.targetAlpha == null ? 1 : L.targetAlpha) : 0;
      L.a += (target - L.a) * k2;
      L.drawAlpha = L.a * baseAlpha(L) * (L.layer.visible === false ? 0.16 : 1);
    }

    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.clearColor(0.028, 0.042, 0.056, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    // floor
    gl.useProgram(this.progFloor);
    gl.uniformMatrix4fv(this.uFloor.uVP, false, this.vp);
    gl.uniform2f(this.uFloor.uBoard, this.W || 6.4, this.D || 8.4);
    gl.uniform3f(this.uFloor.uAccent, 0.31, 0.84, 0.75);
    gl.depthMask(true);
    gl.disable(gl.CULL_FACE);
    gl.bindVertexArray(this.floorVAO);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.enable(gl.CULL_FACE);

    // meshes: opaque first, then transparent
    gl.useProgram(this.progMesh);
    gl.uniformMatrix4fv(this.uMesh.uVP, false, this.vp);
    gl.uniform3fv(this.uMesh.uEye, new Float32Array(eye));

    const opaque = [], trans = [];
    for (const L of this.layers) {
      if (L.drawAlpha < 0.012) continue;
      (L.drawAlpha >= 0.985 ? opaque : trans).push(L);
    }
    const drawLayer = (L, isTrans) => {
      const sel = this.state.selectedLayerId === L.layer.id;
      const stepHit = this.state.stepLayerIds && this.state.stepLayerIds.has(L.layer.id);
      const color = rgb(L.layer.color);
      const glow = (sel ? 0.5 : 0) + (stepHit ? 0.22 + Math.sin(this.pulse * 3) * 0.12 : 0);
      let tint = [1, 1, 1];
      if (sel) tint = [1.35, 1.55, 1.5];
      if (stepHit) tint = [tint[0] * 1.15, tint[1] * 1.35, tint[2] * 1.3];
      const model = M.mul(M.translate(L.layer.offsetX || 0, L.y, L.layer.offsetZ || 0), M.scale(L.layer.scale || 1));
      gl.uniformMatrix4fv(this.uMesh.uModel, false, model);
      gl.uniform3fv(this.uMesh.uTint, new Float32Array(tint));
      gl.uniform1f(this.uMesh.uAlpha, L.drawAlpha);
      gl.uniform1f(this.uMesh.uGlow, glow);
      gl.uniform1f(this.uMesh.uMetal, L.layer.kind === 'shield' ? 0.8 : L.layer.kind === 'connector' ? 0.55 : 0.1);
      gl.bindVertexArray(L.vao.vao);
      gl.drawArrays(gl.TRIANGLES, 0, L.vao.n);
    };

    gl.depthMask(true);
    opaque.forEach((L) => drawLayer(L, false));

    // pins (ride on their layer's transform)
    const hl = this.state.highlightGroups;
    const anyHl = hl && hl.size > 0;
    gl.disable(gl.CULL_FACE);
    const layerMap = new Map(this.layers.map((L) => [L.layer.id, L]));
    for (const pm of this.pinMeshes) {
      const L = pm.layerId ? layerMap.get(pm.layerId) : null;
      const ly = L ? L.y : 0;
      const la = L ? L.a : 1;
      if (la < 0.02) continue;
      const on = !anyHl || hl.has(pm.group);
      gl.uniformMatrix4fv(this.uMesh.uModel, false, M.translate(0, ly, 0));
      if (!on) {
        gl.uniform1f(this.uMesh.uAlpha, 0.12 * la);
        gl.uniform3fv(this.uMesh.uTint, new Float32Array([0.5, 0.6, 0.7]));
        gl.uniform1f(this.uMesh.uGlow, 0);
      } else {
        gl.uniform1f(this.uMesh.uAlpha, la);
        gl.uniform3fv(this.uMesh.uTint, new Float32Array([1, 1, 1]));
        gl.uniform1f(this.uMesh.uGlow, anyHl ? 0.35 : 0.04);
      }
      gl.uniform1f(this.uMesh.uMetal, 0.6);
      gl.bindVertexArray(pm.vao.vao);
      gl.drawArrays(gl.TRIANGLES, 0, pm.vao.n);
    }
    gl.enable(gl.CULL_FACE);
    gl.depthMask(true);

    // selected / hover ring + conflict band
    const layerYOf = (p) => {
      const L = this.layers.find((l) => l.layer.id === p.layerId);
      return L ? L.y : 0;
    };
    const id = this.state.hoverPinId || this.state.selectedPinId;
    const pin = id && this.pins.find((p) => p.id === id);
    if (pin) {
      gl.disable(gl.CULL_FACE);
      gl.depthMask(false);
      const isSel = this.state.selectedPinId === pin.id;
      const hasConflict = this.state.conflictPins && this.state.conflictPins.has(pin.id);
      const model = M.mul(M.translate(pin.x, PIN_Y + (hasConflict ? 0.5 : 0.09) + layerYOf(pin), pin.z), M.scale(isSel ? 1.5 + Math.sin(this.pulse * 4) * 0.06 : 1.25));
      gl.uniformMatrix4fv(this.uMesh.uModel, false, model);
      const selTint = hasConflict ? [1.7, 0.5, 0.45] : [0.35, 1.4, 1.25];
      gl.uniform3fv(this.uMesh.uTint, new Float32Array(isSel ? selTint : hasConflict ? [1.5, 0.55, 0.5] : [0.5, 0.9, 1.2]));
      gl.uniform1f(this.uMesh.uAlpha, 1);
      gl.uniform1f(this.uMesh.uGlow, hasConflict ? 0.55 : 1.4);
      gl.uniform1f(this.uMesh.uMetal, 0);
      gl.bindVertexArray(this.selRing.vao);
      gl.drawArrays(gl.TRIANGLES, 0, this.selRing.n);
      gl.depthMask(true);
      gl.enable(gl.CULL_FACE);
    }
    // conflict pins — red pulsing band
    if (this.state.conflictPins && this.state.conflictPins.size) {
      gl.disable(gl.CULL_FACE);
      gl.depthMask(false);
      const s = 1.0 + Math.sin(this.pulse * 5) * 0.12;
      for (const pid of this.state.conflictPins) {
        const p = this.pins.find((q) => q.id === pid);
        if (!p) continue;
        gl.uniformMatrix4fv(this.uMesh.uModel, false, M.mul(M.translate(p.x, PIN_Y - 0.02 + layerYOf(p), p.z), M.scale(s)));
        gl.uniform3fv(this.uMesh.uTint, new Float32Array([1.9, 0.28, 0.26]));
        gl.uniform1f(this.uMesh.uAlpha, 1);
        gl.uniform1f(this.uMesh.uGlow, 0.3);
        gl.uniform1f(this.uMesh.uMetal, 0);
        gl.bindVertexArray(this.bandMesh.vao);
        gl.drawArrays(gl.TRIANGLES, 0, this.bandMesh.n);
      }
      gl.depthMask(true);
      gl.enable(gl.CULL_FACE);
    }

    // transparent layers last
    if (trans.length) {
      gl.depthMask(false);
      trans.sort((a, b) => distSq(b, eye) - distSq(a, eye));
      trans.forEach((L) => drawLayer(L, true));
      gl.depthMask(true);
    }

    gl.bindVertexArray(null);
  }

  /* ---------- projection / picking ---------- */
  project(x, y, z) {
    const c = M.xform(this.vp, [x, y, z]);
    if (c[3] <= 0) return { x: 0, y: 0, visible: false };
    const nx = c[0] / c[3], ny = c[1] / c[3];
    return { x: ((nx + 1) / 2) * this.cssW, y: ((1 - ny) / 2) * this.cssH, visible: true, depth: c[3] };
  }
  pinScreenPos(p) {
    const L = this.layers.find((l) => l.layer.id === p.layerId);
    return this.project(p.x, PIN_Y + 0.04 + (L ? L.y : 0), p.z);
  }
  pickPin(mx, my, radius) {
    let best = null, bestD = radius || 16;
    for (const p of this.pins) {
      const s = this.pinScreenPos(p);
      if (!s.visible) continue;
      const d = Math.hypot(s.x - mx, s.y - my);
      if (d < bestD) { bestD = d; best = p; }
    }
    return best;
  }
  pickSurface(mx, my) {
    // unproject two points, intersect y = 0.12 plane
    const nx = (mx / this.cssW) * 2 - 1;
    const ny = 1 - (my / this.cssH) * 2;
    const inv = invert(this.vp);
    if (!inv) return null;
    const p0 = M.xform(inv, [nx, ny, -1, 1]);
    const p1 = M.xform(inv, [nx, ny, 1, 1]);
    const a = p0.map((v, i) => v / p0[3]);
    const b = p1.map((v, i) => v / p1[3]);
    const dy = b[1] - a[1];
    if (Math.abs(dy) < 1e-6) return null;
    const t = (BOARD_TOP - a[1]) / dy;
    if (t < 0) return null;
    const x = a[0] + (b[0] - a[0]) * t;
    const z = a[2] + (b[2] - a[2]) * t;
    const inX = Math.abs(x) <= (this.W || 6.4) / 2 - 0.15;
    const inZ = Math.abs(z) <= (this.D || 8.4) / 2 - 0.15;
    return { x, z, onBoard: inX && inZ };
  }
  /**
   * 分步播放时设置各层目标位移/透明度。
   * offsets: { layerId: { y, alpha, instant } }  instant 表示立刻跳到该位置（随后由动画回到目标）
   */
  applyStepLayout(offsets, visibleSet) {
    for (const L of this.layers) {
      const off = offsets && offsets[L.layer.id];
      L.targetY = off ? off.y : 0;
      L.targetAlpha = off && off.alpha != null ? off.alpha : 1;
      if (off && off.instant) {
        L.y = off.instantY != null ? off.instantY : off.y;
        L.a = L.targetAlpha;
      }
    }
    this.state.visible = visibleSet || null;
  }
}

function distSq(L, eye) {
  const x = (L.layer.offsetX || 0) - eye[0], z = (L.layer.offsetZ || 0) - eye[2];
  return x * x + z * z + L.y * L.y;
}
function invert(m) {
  const a = m;
  const b00 = a[0] * a[5] - a[1] * a[4];
  const b01 = a[0] * a[6] - a[2] * a[4];
  const b02 = a[0] * a[7] - a[3] * a[4];
  const b03 = a[1] * a[6] - a[2] * a[5];
  const b04 = a[1] * a[7] - a[3] * a[5];
  const b05 = a[2] * a[7] - a[3] * a[6];
  const b06 = a[8] * a[13] - a[9] * a[12];
  const b07 = a[8] * a[14] - a[10] * a[12];
  const b08 = a[8] * a[15] - a[11] * a[12];
  const b09 = a[9] * a[14] - a[10] * a[13];
  const b10 = a[9] * a[15] - a[11] * a[13];
  const b11 = a[10] * a[15] - a[11] * a[14];
  let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  if (!det) return null;
  det = 1 / det;
  const o = new Float32Array(16);
  o[0] = (a[5] * b11 - a[6] * b10 + a[7] * b09) * det;
  o[1] = (a[2] * b10 - a[1] * b11 - a[3] * b09) * det;
  o[2] = (a[13] * b05 - a[14] * b04 + a[15] * b03) * det;
  o[3] = (a[10] * b04 - a[9] * b05 - a[11] * b03) * det;
  o[4] = (a[6] * b08 - a[4] * b11 - a[7] * b07) * det;
  o[5] = (a[0] * b11 - a[2] * b08 + a[3] * b07) * det;
  o[6] = (a[14] * b02 - a[12] * b05 - a[15] * b01) * det;
  o[7] = (a[8] * b05 - a[10] * b02 + a[11] * b01) * det;
  o[8] = (a[4] * b10 - a[5] * b08 + a[7] * b06) * det;
  o[9] = (a[1] * b08 - a[0] * b10 - a[3] * b06) * det;
  o[10] = (a[12] * b04 - a[13] * b02 + a[15] * b00) * det;
  o[11] = (a[9] * b02 - a[8] * b04 - a[11] * b00) * det;
  o[12] = (a[5] * b07 - a[4] * b09 - a[6] * b06) * det;
  o[13] = (a[0] * b09 - a[1] * b07 + a[2] * b06) * det;
  o[14] = (a[13] * b01 - a[12] * b03 - a[14] * b00) * det;
  o[15] = (a[8] * b03 - a[9] * b01 + a[10] * b00) * det;
  return o;
}

/* ============================================================
   small meshes
   ============================================================ */
function mkRingMesh() {
  const m = new Mesh();
  m.ring(0, 0, 0, 0.14, 0.30, 26);
  m.ring(0, 0, 0, 0.055, 0.075, 18);
  return m;
}
function mkBandMesh() {
  const m = new Mesh();
  // thin vertical band around the pin
  const seg = 24, r = 0.30, h = 0.42;
  for (let i = 0; i < seg; i++) {
    const a0 = (i / seg) * Math.PI * 2, a1 = ((i + 1) / seg) * Math.PI * 2;
    const x0 = Math.cos(a0) * r, z0 = Math.sin(a0) * r;
    const x1 = Math.cos(a1) * r, z1 = Math.sin(a1) * r;
    m.quad([x0, 0, z0], [x1, 0, z1], [x1, h, z1], [x0, h, z0], [1, 1, 1]);
  }
  return m;
}
const hash = (s) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0) / 4294967295;
};
function baseAlpha(L) {
  return L.layer.kind === 'shell' ? 0.15 : 1;
}
export function groupColor(g) {
  const map = {
    power: '#e8b45a', gpio: '#4fd6c0', comm: '#5aa9f5', analog: '#a48cf0',
    usb: '#5fd68a', debug: '#ef8a8a', boot: '#f0a35e', display: '#7ed0e8',
  };
  return map[g] || '#9fb3c4';
}

/* ============================================================
   分层几何
   ============================================================ */
function buildLayer(mesh, layer, W, D, board) {
  const c = rgb(layer.color);
  const rnd = U.seeded(Math.floor(hash(layer.id) * 1e9));
  // 便于 layer.scale 缩放整体；几何都围绕原点构建
  switch (layer.kind) {
    case 'pcb': {
      const hw = W / 2, hd = D / 2, th = 0.24;
      mesh.box(0, 0, 0, W, th, D, c, { top: shade(c, 1.12), bottom: shade(c, 0.6) });
      // 板边倒角亮线
      mesh.box(0, th / 2 + 0.002, 0, W - 0.12, 0.004, D - 0.12, shade(c, 0.82));
      // 丝印边框
      mesh.box(0, th / 2 + 0.006, hd - 0.32, W - 0.9, 0.004, 0.03, [0.82, 0.86, 0.84]);
      mesh.box(0, th / 2 + 0.006, -hd + 0.32, W - 0.9, 0.004, 0.03, [0.82, 0.86, 0.84]);
      // 元件
      const chips = 16;
      for (let i = 0; i < chips; i++) {
        const cw = 0.18 + rnd() * 0.5, cd = 0.16 + rnd() * 0.45;
        const x = (rnd() - 0.5) * (W - 1.9);
        const z = (rnd() - 0.5) * (D - 2.1);
        if (Math.hypot(x, z) < 0.75) continue;
        const ch = 0.05 + rnd() * 0.16;
        const dark = 0.09 + rnd() * 0.12;
        mesh.box(x, th / 2 + ch / 2, z, cw, ch, cd, [dark, dark * 1.05, dark * 1.12]);
      }
      // 主控芯片
      mesh.box(0, th / 2 + 0.11, 0.1, 1.35, 0.22, 1.35, [0.07, 0.08, 0.09], { top: [0.1, 0.11, 0.12] });
      mesh.box(0, th / 2 + 0.225, 0.1, 1.36, 0.006, 1.36, [0.16, 0.17, 0.19]);
      // 排针底座
      const pinRows = 2;
      for (const side of [-1, 1]) {
        mesh.box(side * (hw - 0.38), th / 2 + 0.075, 0, 0.24, 0.15, D - 1.6, [0.06, 0.07, 0.08]);
      }
      // 贴片 LED 与电容
      for (let i = 0; i < 3; i++) {
        mesh.box(-hw + 0.75, th / 2 + 0.05, -hd + 1.2 + i * 0.5, 0.16, 0.09, 0.1, [0.15, 0.9, 0.45]);
      }
      break;
    }
    case 'shield': {
      const w = W * 0.52, d = D * 0.4, h = 0.5;
      mesh.box(0, 0.16 + h / 2, 0, w, h, d, c, { top: shade(c, 1.1) });
      mesh.box(0, 0.16 + h + 0.006, 0, w * 0.93, 0.01, d * 0.9, shade(c, 0.86));
      // 卡扣
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
        mesh.box(sx * (w / 2 - 0.05), 0.16 + h / 2, sz * (d / 2 - 0.05), 0.12, h * 0.9, 0.12, shade(c, 0.95));
      }
      break;
    }
    case 'display': {
      const w = W * 0.46, d = D * 0.34;
      mesh.box(0, 0.16 + 0.09, 0, w, 0.18, d, [0.05, 0.06, 0.07], { top: [0.06, 0.07, 0.08] });
      mesh.box(0, 0.16 + 0.185, 0, w * 0.88, 0.008, d * 0.82, [0.03, 0.16, 0.2]);
      mesh.box(0, 0.16 + 0.19, 0, w * 0.84, 0.004, d * 0.78, [0.05, 0.3, 0.38]);
      // FPC
      mesh.box(0, 0.16 + 0.02, d / 2 + 0.16, w * 0.42, 0.03, 0.32, [0.72, 0.55, 0.18]);
      break;
    }
    case 'connector': {
      // USB-C 位于前缘
      mesh.box(0, 0.16 + 0.16, D / 2 - 0.22, 1.05, 0.32, 0.55, [0.62, 0.64, 0.68], { top: [0.7, 0.72, 0.76] });
      mesh.box(0, 0.16 + 0.16, D / 2 + 0.02, 0.86, 0.2, 0.16, [0.12, 0.13, 0.15]);
      // 后缘排针桥
      mesh.box(0, 0.16 + 0.1, -D / 2 + 0.2, W * 0.5, 0.18, 0.34, [0.08, 0.09, 0.1], { top: [0.55, 0.46, 0.22] });
      // 侧边按键
      for (const sz of [-1, 1]) {
        mesh.cyl(-W / 2 + 0.02, 0.16, sz * 1.4, 0.16, 0.08, 12, [0.32, 0.35, 0.38]);
      }
      // 电池座
      mesh.box(W / 2 - 1.2, 0.16 + 0.04, -D / 2 + 1.4, 1.1, 0.06, 0.9, [0.2, 0.22, 0.25]);
      break;
    }
    case 'shell': {
      const hw = W / 2 + 0.16, hd = D / 2 + 0.16;
      const h = 1.05, base = -0.34;
      const wall = 0.1;
      const sc = [c[0], c[1], c[2]];
      const cc = [sc[0] * 0.9, sc[1] * 0.9, sc[2] * 0.9];
      mesh.box(0, base + h / 2, hd, hw * 2, h, wall, cc, { top: shade(cc, 1.2) });
      mesh.box(0, base + h / 2, -hd, hw * 2, h, wall, cc, { top: shade(cc, 1.2) });
      mesh.box(hw, base + h / 2, 0, wall, h, hd * 2, cc, { top: shade(cc, 1.2) });
      mesh.box(-hw, base + h / 2, 0, wall, h, hd * 2, cc, { top: shade(cc, 1.2) });
      // 顶盖带屏幕开窗（用四块板拼出窗）
      const topY = base + h;
      const winW = W * 0.5, winD = D * 0.38;
      const t = 0.09;
      mesh.box(0, topY, -hd + (hd * 2 - winD) / 4, hw * 2, t, (hd * 2 - winD) / 2, sc);
      mesh.box(0, topY, hd - (hd * 2 - winD) / 4, hw * 2, t, (hd * 2 - winD) / 2, sc);
      mesh.box(-(hw - (hw * 2 - winW) / 4), topY, 0, (hw * 2 - winW) / 2, t, winD, sc);
      mesh.box(hw - (hw * 2 - winW) / 4, topY, 0, (hw * 2 - winW) / 2, t, winD, sc);
      break;
    }
    case 'battery': {
      mesh.box(0, 0.16 + 0.22, 0, W * 0.5, 0.44, D * 0.4, c, { top: shade(c, 1.2) });
      break;
    }
    default: {
      mesh.box(0, 0.16 + 0.14, 0, W * 0.4, 0.28, D * 0.3, c, { top: shade(c, 1.15) });
    }
  }
}
