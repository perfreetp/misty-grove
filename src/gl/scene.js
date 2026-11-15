// 极简 WebGL2 场景渲染器：主梁(变高程)、桥墩、地面网格、构件盒体、红色低净空区、消防通道
import { bridgeNodes, pierRects, lowZones, totalLength, MIN_CLEARANCE } from '../bridge.js'
import { TYPES, compRect } from '../rules.js'

const VS = `#version 300 es
layout(location=0) in vec3 aPos;
layout(location=1) in vec3 aNormal;
layout(location=2) in vec3 aColor;
uniform mat4 uProj, uView;
out vec3 vN; out vec3 vC; out vec3 vP;
void main(){ vN=aNormal; vC=aColor; vP=aPos; gl_Position=uProj*uView*vec4(aPos,1.0); }`

const FS = `#version 300 es
precision mediump float;
in vec3 vN; in vec3 vC; in vec3 vP;
uniform vec3 uLight; uniform float uAlpha;
out vec4 outColor;
void main(){
  vec3 n=normalize(vN);
  float diff=max(dot(n,normalize(uLight)),0.0);
  vec3 col=vC*(0.35+0.65*diff);
  outColor=vec4(col,uAlpha);
}`

const VS_LINE = `#version 300 es
layout(location=0) in vec3 aPos;
uniform mat4 uProj, uView;
void main(){ gl_Position=uProj*uView*vec4(aPos,1.0); }`
const FS_LINE = `#version 300 es
precision mediump float;
uniform vec4 uColor;
out vec4 outColor;
void main(){ outColor=uColor; }`

function hex(c) {
  return [parseInt(c.slice(1, 3), 16) / 255, parseInt(c.slice(3, 5), 16) / 255, parseInt(c.slice(5, 7), 16) / 255]
}

// 8 顶点任意棱柱（两端高程可不同），世界坐标：x 纵向, y 高程, z 横向
function pushPrism(arr, x0, x1, z0, z1, yb0, yb1, yt0, yt1, color) {
  const v = {
    b00: [x0, yb0, z0], b01: [x0, yb0, z1], b10: [x1, yb1, z0], b11: [x1, yb1, z1],
    t00: [x0, yt0, z0], t01: [x0, yt0, z1], t10: [x1, yt1, z0], t11: [x1, yt1, z1]
  }
  const quad = (a, b, c, d, n) => {
    for (const p of [a, b, c, a, c, d]) { arr.pos.push(...p); arr.nrm.push(...n); arr.col.push(...color) }
  }
  quad(v.t00, v.t10, v.t11, v.t01, [0, 1, 0])   // 顶
  quad(v.b01, v.b11, v.b10, v.b00, [0, -1, 0])  // 底
  quad(v.b00, v.b10, v.t10, v.t00, [0, 0, -1])  // z0 侧
  quad(v.b11, v.b01, v.t01, v.t11, [0, 0, 1])   // z1 侧
  quad(v.b01, v.b00, v.t00, v.t01, [-1, 0, 0])  // x0 端
  quad(v.b10, v.b11, v.t11, v.t10, [1, 0, 0])   // x1 端
}

function pushQuad(arr, a, b, c, d, color) {
  for (const p of [a, b, c, a, c, d]) { arr.pos.push(...p); arr.nrm.push(0, 1, 0); arr.col.push(...color) }
}

function compile(gl, vsSrc, fsSrc) {
  const mk = (type, src) => {
    const s = gl.createShader(type)
    gl.shaderSource(s, src); gl.compileShader(s)
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s))
    return s
  }
  const p = gl.createProgram()
  gl.attachShader(p, mk(gl.VERTEX_SHADER, vsSrc))
  gl.attachShader(p, mk(gl.FRAGMENT_SHADER, fsSrc))
  gl.linkProgram(p)
  return p
}

// mat4 工具
function perspective(fov, asp, near, far) {
  const f = 1 / Math.tan(fov / 2), m = new Float32Array(16)
  m[0] = f / asp; m[5] = f; m[10] = (far + near) / (near - far); m[11] = -1; m[14] = 2 * far * near / (near - far)
  return m
}
function lookAt(eye, ctr, up) {
  let zx = eye[0] - ctr[0], zy = eye[1] - ctr[1], zz = eye[2] - ctr[2]
  let l = Math.hypot(zx, zy, zz); zx /= l; zy /= l; zz /= l
  let xx = up[1] * zz - up[2] * zy, xy = up[2] * zx - up[0] * zz, xz = up[0] * zy - up[1] * zx
  l = Math.hypot(xx, xy, xz); xx /= l; xy /= l; xz /= l
  const yx = zy * xz - zz * xy, yy = zz * xx - zx * xz, yz = zx * xy - zy * xx
  return new Float32Array([
    xx, yx, zx, 0, xy, yy, zy, 0, xz, yz, zz, 0,
    -(xx * eye[0] + xy * eye[1] + xz * eye[2]),
    -(yx * eye[0] + yy * eye[1] + yz * eye[2]),
    -(zx * eye[0] + zy * eye[1] + zz * eye[2]), 1])
}

export function createScene(canvas) {
  const gl = canvas.getContext('webgl2', { antialias: true })
  if (!gl) return null
  const prog = compile(gl, VS, FS)
  const progLine = compile(gl, VS_LINE, FS_LINE)
  gl.enable(gl.DEPTH_TEST)
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

  const cam = { yaw: -0.9, pitch: 0.5, dist: 120 }
  let opaque = null, trans = null, grid = null
  let center = [0, 0, 0]

  function makeVAO(data) {
    const vao = gl.createVertexArray()
    gl.bindVertexArray(vao)
    const bind = (loc, arr, size) => {
      const buf = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arr), gl.STATIC_DRAW)
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0)
    }
    bind(0, data.pos, 3)
    if (data.nrm) bind(1, data.nrm, 3)
    if (data.col) bind(2, data.col, 3)
    gl.bindVertexArray(null)
    return { vao, count: data.pos.length / 3 }
  }

  function rebuild(bridge, comps) {
    const b = bridge
    const L = totalLength(b)
    center = [L / 2, b.groundElev, b.deckWidth / 2]
    cam.dist = Math.max(60, L * 1.15)

    const solid = { pos: [], nrm: [], col: [] }
    const glass = { pos: [], nrm: [], col: [] }
    const lines = []

    // 地面
    const gy = b.groundElev
    pushQuad(solid, [-20, gy - 0.05, -20], [L + 20, gy - 0.05, -20], [L + 20, gy - 0.05, b.deckWidth + 20], [-20, gy - 0.05, b.deckWidth + 20], hex('#7a8a6d'))
    // 网格线
    for (let x = 0; x <= L + 0.01; x += 5) lines.push(x, gy + 0.01, -5, x, gy + 0.01, b.deckWidth + 5)
    for (let z = 0; z <= b.deckWidth + 0.01; z += 5) lines.push(-5, gy + 0.01, z, L + 5, gy + 0.01, z)

    // 主梁（逐跨变高程棱柱）
    const nodes = bridgeNodes(b)
    const deckCol = hex('#9aa4ad')
    for (let i = 0; i < nodes.length - 1; i++) {
      const a = nodes[i], c = nodes[i + 1]
      pushPrism(solid, a.x, c.x, 0, b.deckWidth,
        a.elev - b.girderDepth, c.elev - b.girderDepth, a.elev, c.elev, deckCol)
    }
    // 桥墩/桥台
    const pierCol = hex('#6f7a85')
    for (const p of pierRects(b)) {
      const top = Math.min(
        ...nodes.filter(n => Math.abs(n.x - p.cx) < 0.01).map(n => n.elev - b.girderDepth),
        b.groundElev + MIN_CLEARANCE + 5)
      pushPrism(solid, p.x0, p.x1, p.y0, p.y1, gy, gy, top, top, pierCol)
    }
    // 构件
    for (const c of comps) {
      const t = TYPES[c.type]
      const r = compRect(c)
      const col = hex(t.color)
      pushPrism(solid, r.x0, r.x1, r.y0, r.y1, gy, gy, gy + t.height, gy + t.height, col)
    }
    // 低净空红色禁摆区
    for (const z of lowZones(b)) {
      pushQuad(glass, [z.x0, gy + 0.03, 0], [z.x1, gy + 0.03, 0], [z.x1, gy + 0.03, b.deckWidth], [z.x0, gy + 0.03, b.deckWidth], hex('#e03030'))
    }
    // 消防通道覆盖层由 rebuildLane 单独更新

    opaque = makeVAO(solid)
    trans = makeVAO(glass)
    grid = makeVAO({ pos: lines })
  }

  // 消防通道覆盖层单独更新（避免循环依赖，由外部传入）
  function rebuildLane(lane, bridge) {
    // lane: {ok, y0, y1} | null
    laneOverlay = null
    if (lane && lane.y1 - lane.y0 > 0.01) {
      const L = totalLength(bridge)
      const gy = bridge.groundElev
      const glass = { pos: [], nrm: [], col: [] }
      pushQuad(glass, [0, gy + 0.02, lane.y0], [L, gy + 0.02, lane.y0], [L, gy + 0.02, lane.y1], [0, gy + 0.02, lane.y1], hex('#2fbf5f'))
      laneOverlay = makeVAO(glass)
    }
  }
  let laneOverlay = null

  function render() {
    const w = canvas.clientWidth, h = canvas.clientHeight
    if (canvas.width !== w * devicePixelRatio || canvas.height !== h * devicePixelRatio) {
      canvas.width = w * devicePixelRatio; canvas.height = h * devicePixelRatio
    }
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clearColor(0.13, 0.16, 0.2, 1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    const proj = perspective(Math.PI / 4, canvas.width / canvas.height, 0.5, 2000)
    const eye = [
      center[0] + cam.dist * Math.cos(cam.pitch) * Math.sin(cam.yaw),
      center[1] + cam.dist * Math.sin(cam.pitch),
      center[2] + cam.dist * Math.cos(cam.pitch) * Math.cos(cam.yaw)]
    const view = lookAt(eye, center, [0, 1, 0])

    gl.useProgram(prog)
    gl.uniformMatrix4fv(gl.getUniformLocation(prog, 'uProj'), false, proj)
    gl.uniformMatrix4fv(gl.getUniformLocation(prog, 'uView'), false, view)
    gl.uniform3f(gl.getUniformLocation(prog, 'uLight'), 0.5, 1, 0.35)
    gl.uniform1f(gl.getUniformLocation(prog, 'uAlpha'), 1)
    if (opaque) { gl.bindVertexArray(opaque.vao); gl.drawArrays(gl.TRIANGLES, 0, opaque.count) }

    gl.useProgram(progLine)
    gl.uniformMatrix4fv(gl.getUniformLocation(progLine, 'uProj'), false, proj)
    gl.uniformMatrix4fv(gl.getUniformLocation(progLine, 'uView'), false, view)
    gl.uniform4f(gl.getUniformLocation(progLine, 'uColor'), 1, 1, 1, 0.18)
    if (grid) { gl.bindVertexArray(grid.vao); gl.drawArrays(gl.LINES, 0, grid.count) }

    // 半透明覆盖层
    gl.useProgram(prog)
    gl.depthMask(false)
    gl.uniform1f(gl.getUniformLocation(prog, 'uAlpha'), 0.45)
    if (trans) { gl.bindVertexArray(trans.vao); gl.drawArrays(gl.TRIANGLES, 0, trans.count) }
    gl.uniform1f(gl.getUniformLocation(prog, 'uAlpha'), 0.3)
    if (laneOverlay) { gl.bindVertexArray(laneOverlay.vao); gl.drawArrays(gl.TRIANGLES, 0, laneOverlay.count) }
    gl.depthMask(true)
    gl.bindVertexArray(null)
  }

  // 轨道相机交互
  let dragging = false, px = 0, py = 0
  canvas.addEventListener('pointerdown', e => { dragging = true; px = e.clientX; py = e.clientY; canvas.setPointerCapture(e.pointerId) })
  canvas.addEventListener('pointermove', e => {
    if (!dragging) return
    cam.yaw += (e.clientX - px) * 0.008
    cam.pitch = Math.min(1.45, Math.max(0.08, cam.pitch + (e.clientY - py) * 0.006))
    px = e.clientX; py = e.clientY
  })
  canvas.addEventListener('pointerup', () => { dragging = false })
  canvas.addEventListener('wheel', e => {
    e.preventDefault()
    cam.dist = Math.min(600, Math.max(20, cam.dist * (1 + e.deltaY * 0.001)))
  }, { passive: false })

  let raf = 0
  function start() { const loop = () => { render(); raf = requestAnimationFrame(loop) }; loop() }
  function stop() { cancelAnimationFrame(raf) }

  return { rebuild, rebuildLane, start, stop }
}
