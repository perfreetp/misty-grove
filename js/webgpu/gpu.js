/* 自研轻量 WebGPU 渲染引擎：实体网格 + 实例化网格 + 全局剖切平面 + 轨道相机 */
(function (global) {
  const App = global.App || (global.App = {});
  const { Mat4, v3 } = App;

  const UNIFORM_SIZE = 128; // viewProj(64) + eye(16) + light(16) + clipPlane(16) + clipFlags(16)

  const SOLID_WGSL = /* wgsl */ `
struct Uniforms {
  viewProj : mat4x4<f32>,
  eyePos   : vec4<f32>,
  lightDir : vec4<f32>,
  clipPlane: vec4<f32>,
  clipFlags: vec4<f32>,
};
@group(0) @binding(0) var<uniform> U: Uniforms;

struct VSIn {
  @location(0) pos: vec3<f32>,
  @location(1) normal: vec3<f32>,
  @location(2) color: vec4<f32>,
};
struct VSOut {
  @builtin(position) clipPos: vec4<f32>,
  @location(0) normal: vec3<f32>,
  @location(1) color: vec4<f32>,
  @location(2) worldPos: vec3<f32>,
};
@vertex
fn vs(in: VSIn) -> VSOut {
  var out: VSOut;
  out.worldPos = in.pos;
  out.clipPos = U.viewProj * vec4<f32>(in.pos, 1.0);
  out.normal = in.normal;
  out.color = in.color;
  return out;
}
@fragment
fn fs(in: VSOut) -> @location(0) vec4<f32> {
  if (U.clipFlags.x > 0.0 && dot(in.worldPos, U.clipPlane.xyz) - U.clipPlane.w < 0.0) {
    discard;
  }
  let N = normalize(in.normal);
  let L = normalize(U.lightDir.xyz);
  let V = normalize(U.eyePos.xyz - in.worldPos);
  let H = normalize(L + V);
  let diff = max(dot(N, L), 0.0);
  let spec = pow(max(dot(N, H), 0.0), 24.0) * 0.35;
  let rim  = pow(1.0 - max(dot(N, V), 0.0), 3.0) * 0.18;
  let ambient = 0.32;
  let lit = ambient + diff * 0.62;
  var col = in.color.rgb * lit + vec3<f32>(spec + rim);
  return vec4<f32>(col, in.color.a);
}
`;

  const INSTANCED_WGSL = /* wgsl */ `
struct Uniforms {
  viewProj : mat4x4<f32>,
  eyePos   : vec4<f32>,
  lightDir : vec4<f32>,
  clipPlane: vec4<f32>,
  clipFlags: vec4<f32>,
};
@group(0) @binding(0) var<uniform> U: Uniforms;

struct VSIn {
  @location(0) pos: vec3<f32>,
  @location(1) normal: vec3<f32>,
  @location(2) color: vec4<f32>,
  @location(3) m0: vec4<f32>,
  @location(4) m1: vec4<f32>,
  @location(5) m2: vec4<f32>,
  @location(6) m3: vec4<f32>,
  @location(7) instanceColor: vec4<f32>,
};
struct VSOut {
  @builtin(position) clipPos: vec4<f32>,
  @location(0) normal: vec3<f32>,
  @location(1) color: vec4<f32>,
  @location(2) worldPos: vec3<f32>,
};
@vertex
fn vs(in: VSIn) -> VSOut {
  let model = mat4x4<f32>(in.m0, in.m1, in.m2, in.m3);
  var out: VSOut;
  let wp = model * vec4<f32>(in.pos, 1.0);
  out.worldPos = wp.xyz;
  out.clipPos = U.viewProj * wp;
  out.normal = normalize((model * vec4<f32>(in.normal, 0.0)).xyz);
  out.color = vec4<f32>(in.instanceColor.rgb, in.instanceColor.a * in.color.a);
  return out;
}
@fragment
fn fs(in: VSOut) -> @location(0) vec4<f32> {
  if (U.clipFlags.x > 0.0 && dot(in.worldPos, U.clipPlane.xyz) - U.clipPlane.w < 0.0) {
    discard;
  }
  let N = normalize(in.normal);
  let L = normalize(U.lightDir.xyz);
  let V = normalize(U.eyePos.xyz - in.worldPos);
  let H = normalize(L + V);
  let diff = max(dot(N, L), 0.0);
  let spec = pow(max(dot(N, H), 0.0), 24.0) * 0.35;
  let rim  = pow(1.0 - max(dot(N, V), 0.0), 3.0) * 0.18;
  let lit = 0.32 + diff * 0.62;
  var col = in.color.rgb * lit + vec3<f32>(spec + rim);
  return vec4<f32>(col, in.color.a);
}
`;

  class GpuRenderer {
    static isSupported() { return typeof navigator !== "undefined" && !!navigator.gpu; }

    constructor(canvas) {
      this.canvas = canvas;
      this.device = null;
      this.context = null;
      this.items = [];
      this.uniformData = new Float32Array(32);
      // 轨道相机
      this.target = [0, 0, 0];
      this.radius = 1400;
      this.yaw = -0.7;
      this.pitch = 0.42;
      this.clipPlane = [1, 0, 0, 0];
      this.clipEnabled = 0;
      this._running = false;
      this._depthTex = null;
    }

    async init() {
      const adapter = await navigator.gpu.requestAdapter({ powerPreference: "high-performance" });
      if (!adapter) throw new Error("无可用 GPU 适配器");
      this.device = await adapter.requestDevice();
      this.device.lost.then((info) => console.warn("WebGPU device lost:", info.message));
      this.context = this.canvas.getContext("webgpu");
      this.format = navigator.gpu.getPreferredCanvasFormat();
      this.context.configure({ device: this.device, format: this.format, alphaMode: "opaque" });

      this.uniformBuffer = this.device.createBuffer({
        size: UNIFORM_SIZE,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      });
      this.bindGroupLayout = this.device.createBindGroupLayout({
        entries: [{ binding: 0, visibility: GPUShaderUsage.VERTEX | GPUShaderUsage.FRAGMENT, buffer: { size: UNIFORM_SIZE } }],
      });
      this.pipelineLayout = this.device.createPipelineLayout({ bindGroupLayouts: [this.bindGroupLayout] });
      this.bindGroup = this.device.createBindGroup({
        layout: this.bindGroupLayout,
        entries: [{ binding: 0, resource: { buffer: this.uniformBuffer } }],
      });

      const solidModule = this.device.createShaderModule({ code: SOLID_WGSL });
      const instModule = this.device.createShaderModule({ code: INSTANCED_WGSL });
      const solidBufLayout = [
        { arrayStride: 12, attributes: [{ shaderLocation: 0, offset: 0, format: "float32x3" }] },
        { arrayStride: 12, attributes: [{ shaderLocation: 1, offset: 0, format: "float32x3" }] },
        { arrayStride: 16, attributes: [{ shaderLocation: 2, offset: 0, format: "float32x4" }] },
      ];
      const instBufLayout = [
        ...solidBufLayout,
        { arrayStride: 16, stepMode: "instance", attributes: [{ shaderLocation: 3, offset: 0, format: "float32x4" }] },
        { arrayStride: 16, stepMode: "instance", attributes: [{ shaderLocation: 4, offset: 0, format: "float32x4" }] },
        { arrayStride: 16, stepMode: "instance", attributes: [{ shaderLocation: 5, offset: 0, format: "float32x4" }] },
        { arrayStride: 16, stepMode: "instance", attributes: [{ shaderLocation: 6, offset: 0, format: "float32x4" }] },
        { arrayStride: 16, stepMode: "instance", attributes: [{ shaderLocation: 7, offset: 0, format: "float32x4" }] },
      ];
      const depthStencil = { format: "depth24plus", depthWriteEnabled: true, depthCompare: "less" };
      const blend = {
        color: { srcFactor: "src-alpha", dstFactor: "one-minus-src-alpha", operation: "add" },
        alpha: { srcFactor: "one", dstFactor: "one-minus-src-alpha", operation: "add" },
      };
      this.pipelines = {
        solid: this.device.createRenderPipeline({
          layout: this.pipelineLayout,
          vertex: { module: solidModule, buffers: solidBufLayout },
          fragment: { module: solidModule, targets: [{ format: this.format }] },
          primitive: { topology: "triangle-list", cullMode: "none" },
          depthStencil,
        }),
        solidTransparent: this.device.createRenderPipeline({
          layout: this.pipelineLayout,
          vertex: { module: solidModule, buffers: solidBufLayout },
          fragment: { module: solidModule, targets: [{ format: this.format, blend }] },
          primitive: { topology: "triangle-list", cullMode: "none" },
          depthStencil: { ...depthStencil, depthWriteEnabled: false },
        }),
        instanced: this.device.createRenderPipeline({
          layout: this.pipelineLayout,
          vertex: { module: instModule, buffers: instBufLayout },
          fragment: { module: instModule, targets: [{ format: this.format }] },
          primitive: { topology: "triangle-list", cullMode: "none" },
          depthStencil,
        }),
      };
      this._ensureDepth();
      this._bindControls();
      this.start();
    }

    _ensureDepth() {
      const w = Math.max(1, this.canvas.width), h = Math.max(1, this.canvas.height);
      if (this._depthTex) this._depthTex.destroy();
      this._depthTex = this.device.createTexture({
        size: [w, h],
        format: "depth24plus",
        usage: GPUTextureUsage.RENDER_ATTACHMENT,
      });
    }

    _resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(this.canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(this.canvas.clientHeight * dpr));
      if (this.canvas.width !== w || this.canvas.height !== h) {
        this.canvas.width = w;
        this.canvas.height = h;
        this._ensureDepth();
      }
    }

    /* ---------- 场景对象 ---------- */
    clearObjects() {
      for (const it of this.items) {
        it.vb?.destroy(); it.ib?.destroy(); it.instanceBuffer?.destroy();
      }
      this.items = [];
    }

    _uploadMesh(mesh) {
      const device = this.device;
      const vb = device.createBuffer({
        size: (mesh.positions.byteLength + mesh.normals.byteLength + mesh.colors.byteLength),
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
      });
      device.queue.writeBuffer(vb, 0, mesh.positions);
      device.queue.writeBuffer(vb, mesh.positions.byteLength, mesh.normals);
      device.queue.writeBuffer(vb, mesh.positions.byteLength + mesh.normals.byteLength, mesh.colors);
      const ib = device.createBuffer({ size: mesh.indices.byteLength, usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST });
      device.queue.writeBuffer(ib, 0, mesh.indices);
      return { vb, ib, offsets: [0, mesh.positions.byteLength, mesh.positions.byteLength + mesh.normals.byteLength] };
    }

    addSolid(mesh, opts = {}) {
      const up = this._uploadMesh(mesh);
      const item = {
        kind: "solid",
        vb: up.vb, ib: up.ib, offsets: up.offsets,
        indexCount: mesh.indices.length,
        transparent: !!opts.transparent,
      };
      this.items.push(item);
      return item;
    }

    /* 用新几何原位替换一个 solid（用于移动剖切平面这类低频更新） */
    _replaceSolid(item, mesh, transparent) {
      item.vb.destroy(); item.ib.destroy();
      const up = this._uploadMesh(mesh);
      item.vb = up.vb; item.ib = up.ib; item.offsets = up.offsets;
      item.indexCount = mesh.indices.length;
      item.transparent = !!transparent;
    }

    addInstanced(mesh, capacityMat4 = 256) {
      const up = this._uploadMesh(mesh);
      const instanceBuffer = this.device.createBuffer({
        size: capacityMat4 * 80, // mat4(64) + color(16)
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
      });
      const item = {
        kind: "instanced",
        vb: up.vb, ib: up.ib, offsets: up.offsets,
        instanceBuffer, instanceCount: 0,
        indexCount: mesh.indices.length,
      };
      this.items.push(item);
      return item;
    }

    /* transforms: Float32Array，每条 80 字节 = mat4(16f) + rgba(4f) */
    setInstances(item, transforms, count) {
      const bytes = count * 80;
      if (item.instanceBuffer.size < bytes) {
        item.instanceBuffer.destroy();
        item.instanceBuffer = this.device.createBuffer({
          size: Math.ceil(bytes / 256) * 256,
          usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
        });
      }
      this.device.queue.writeBuffer(item.instanceBuffer, 0, transforms, 0, count * 20);
      item.instanceCount = count;
    }

    setClip(planeNormal, d, enabled) {
      this.clipPlane = [planeNormal[0], planeNormal[1], planeNormal[2], d];
      this.clipEnabled = enabled ? 1 : 0;
    }

    /* ---------- 轨道相机交互 ---------- */
    _bindControls() {
      const c = this.canvas;
      let dragging = false, mode = "rotate", lastX = 0, lastY = 0;
      c.addEventListener("contextmenu", (e) => e.preventDefault());
      c.addEventListener("pointerdown", (e) => {
        dragging = true;
        mode = e.button === 2 ? "pan" : "rotate";
        lastX = e.clientX; lastY = e.clientY;
        c.setPointerCapture(e.pointerId);
      });
      c.addEventListener("pointermove", (e) => {
        if (!dragging) return;
        const dx = e.clientX - lastX, dy = e.clientY - lastY;
        lastX = e.clientX; lastY = e.clientY;
        if (mode === "rotate") {
          this.yaw -= dx * 0.008;
          this.pitch = Math.max(-1.45, Math.min(1.45, this.pitch + dy * 0.008));
        } else {
          const s = this.radius * 0.0016;
          const right = v3.normalize(v3.cross(this._forward(), [0, 1, 0]));
          const up = v3.normalize(v3.cross(right, this._forward()));
          this.target[0] -= right[0] * dx * s - up[0] * dy * s;
          this.target[1] -= right[1] * dx * s - up[1] * dy * s;
          this.target[2] -= right[2] * dx * s - up[2] * dy * s;
        }
      });
      const end = (e) => { dragging = false; try { c.releasePointerCapture(e.pointerId); } catch (_) {} };
      c.addEventListener("pointerup", end);
      c.addEventListener("pointercancel", end);
      c.addEventListener("wheel", (e) => {
        e.preventDefault();
        this.radius = Math.max(40, Math.min(20000, this.radius * (1 + Math.sign(e.deltaY) * 0.12)));
      }, { passive: false });
    }

    _forward() {
      const cp = Math.cos(this.pitch);
      return v3.normalize([cp * Math.cos(this.yaw), Math.sin(this.pitch), cp * Math.sin(this.yaw)]);
    }

    _eyePos() {
      const f = this._forward();
      return [this.target[0] + f[0] * this.radius, this.target[1] + f[1] * this.radius, this.target[2] + f[2] * this.radius];
    }

    resetView(radius, target = [0, 0, 0]) {
      this.radius = radius;
      this.target = [...target];
      this.yaw = -0.7;
      this.pitch = 0.42;
    }

    /* ---------- 渲染循环 ---------- */
    start() {
      if (this._running) return;
      this._running = true;
      const proj = Mat4.create(), view = Mat4.create(), vp = Mat4.create();
      const frame = () => {
        if (!this._running) return;
        this._resize();
        const eye = this._eyePos();
        Mat4.perspective(proj, Math.PI / 4.5, this.canvas.width / this.canvas.height, 1, 50000);
        Mat4.lookAt(view, eye, this.target, [0, 1, 0]);
        Mat4.multiply(vp, proj, view);

        const u = this.uniformData;
        u.set(vp, 0);
        u[16] = eye[0]; u[17] = eye[1]; u[18] = eye[2]; u[19] = 1;
        const L = v3.normalize([0.45, 0.85, 0.35]);
        u[20] = L[0]; u[21] = L[1]; u[22] = L[2]; u[23] = 0;
        u[24] = this.clipPlane[0]; u[25] = this.clipPlane[1]; u[26] = this.clipPlane[2]; u[27] = this.clipPlane[3];
        u[28] = this.clipEnabled;
        this.device.queue.writeBuffer(this.uniformBuffer, 0, u);

        const encoder = this.device.createCommandEncoder();
        const pass = encoder.beginRenderPass({
          colorAttachments: [{
            view: this.context.getCurrentTexture().createView(),
            clearValue: { r: 0.039, g: 0.063, b: 0.094, a: 1 },
            loadOp: "clear", storeOp: "store",
          }],
          depthStencilAttachment: {
            view: this._depthTex.createView(),
            depthClearValue: 1, depthLoadOp: "clear", depthStoreOp: "discard",
          },
        });
        pass.setBindGroup(0, this.bindGroup);
        for (const it of this.items) {
          if (it._hidden) continue;
          if (it.kind === "instanced") {
            if (!it.instanceCount) continue;
            pass.setPipeline(this.pipelines.instanced);
            pass.setVertexBuffer(0, it.vb, it.offsets[0]);
            pass.setVertexBuffer(1, it.vb, it.offsets[1]);
            pass.setVertexBuffer(2, it.vb, it.offsets[2]);
            pass.setVertexBuffer(3, it.instanceBuffer);
            pass.setIndexBuffer(ibView(it.ib), "uint32");
            pass.drawIndexed(it.indexCount, it.instanceCount);
          } else {
            pass.setPipeline(it.transparent ? this.pipelines.solidTransparent : this.pipelines.solid);
            pass.setVertexBuffer(0, it.vb, it.offsets[0]);
            pass.setVertexBuffer(1, it.vb, it.offsets[1]);
            pass.setVertexBuffer(2, it.vb, it.offsets[2]);
            pass.setIndexBuffer(ibView(it.ib), "uint32");
            pass.drawIndexed(it.indexCount);
          }
        }
        pass.end();
        this.device.queue.submit([encoder.finish()]);
        requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    }

    dispose() {
      this._running = false;
      this.clearObjects();
      this._depthTex?.destroy();
      this.uniformBuffer?.destroy();
    }
  }

  function ibView(buffer) { return buffer; }

  App.GpuRenderer = GpuRenderer;
})(window);
