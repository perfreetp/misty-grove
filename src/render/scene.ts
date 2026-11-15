import { getDevice, configureCanvas, destroyTexture } from './gpu';
import type { MeshData } from './mesh';
import { mergeMeshes } from './mesh';
import { mat4 } from './mesh';

const SHARED_STRUCT = /* wgsl */ `
struct Uniforms {
  viewProj: mat4x4<f32>,
  eye: vec4<f32>,
  params: vec4<f32>,
  lightDir: vec4<f32>,
  clipPlane: vec4<f32>,
  tint: vec4<f32>,
};
`;

const SHADER = /* wgsl */ `
${SHARED_STRUCT}
@group(0) @binding(0) var<uniform> u: Uniforms;

struct VSOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) world: vec3<f32>,
  @location(1) normal: vec3<f32>,
  @location(2) color: vec4<f32>,
};

@vertex
fn vs(
  @location(0) position: vec3<f32>,
  @location(1) normal: vec3<f32>,
  @location(2) color: vec4<f32>
) -> VSOut {
  var out: VSOut;
  out.pos = u.viewProj * vec4<f32>(position, 1.0);
  out.world = position;
  out.normal = normal;
  out.color = color;
  return out;
}

@fragment
fn fs(in: VSOut) -> @location(0) vec4<f32> {
  let n = normalize(in.normal);
  let viewDir = normalize(u.eye.xyz - in.world);
  let l1 = max(dot(n, normalize(u.lightDir.xyz)), 0.0);
  let l2 = max(dot(n, normalize(vec3<f32>(-0.45, 0.8, 0.4))), 0.0);
  let rim = pow(1.0 - max(dot(n, viewDir), 0.0), 2.6);
  let base = in.color.rgb * u.tint.rgb;
  let shade = u.params.x + 0.62 * l1 + 0.22 * l2;
  var col = base * shade + rim * vec3<f32>(0.24, 0.4, 0.62) * 0.75;
  col = col / (col + vec3<f32>(0.8)) * 1.28;
  return vec4<f32>(col, in.color.a * u.params.y);
}
`;

const LINE_SHADER = /* wgsl */ `
${SHARED_STRUCT}
@group(0) @binding(0) var<uniform> u: Uniforms;
struct VSOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) color: vec4<f32>,
};
@vertex
fn vs(@location(0) position: vec3<f32>, @location(1) color: vec4<f32>) -> VSOut {
  var out: VSOut;
  out.pos = u.viewProj * vec4<f32>(position, 1.0);
  out.color = color;
  return out;
}
@fragment
fn fs(in: VSOut) -> @location(0) vec4<f32> {
  return vec4<f32>(in.color.rgb * u.tint.rgb, in.color.a * u.params.y);
}
`;

export interface SceneLayer {
  id: string;
  mesh: MeshData;
  kind: 'mesh' | 'lines';
  opacity?: number;
  ambient?: number;
  tint?: [number, number, number];
  visible?: boolean;
}

export interface CameraState {
  yaw: number;
  pitch: number;
  distance: number;
  target: [number, number, number];
  fov: number;
}

interface LayerGpu {
  layer: SceneLayer;
  vbo: GPUBuffer;
  nbo: GPUBuffer | null;
  cbo: GPUBuffer;
  ibo: GPUBuffer;
  indexCount: number;
  uniform: GPUBuffer;
  bindGroup: GPUBindGroup;
  mesh: MeshData;
}

const UNIFORM_SIZE = 144;

export class Scene3D {
  private device: GPUDevice | null = null;
  private ctx: GPUCanvasContext | null = null;
  private format: GPUTextureFormat = 'bgra8unorm';
  private canvas: HTMLCanvasElement | null = null;
  private pipelineMesh!: GPURenderPipeline;
  private pipelineLine!: GPURenderPipeline;
  private bindLayout!: GPUBindGroupLayout;
  private layers = new Map<string, LayerGpu>();
  private depthTex: GPUTexture | null = null;
  private msaaTex: GPUTexture | null = null;
  private open = false;
  private dirty = true;
  private frameHandle = 0;
  private onFrame?: () => void;
  private lastSize = [0, 0];
  camera: CameraState = {
    yaw: 0.9,
    pitch: 0.42,
    distance: 130,
    target: [0, 0, 0],
    fov: 0.72,
  };

  async init(canvas: HTMLCanvasElement) {
    const device = await getDevice();
    this.device = device;
    this.canvas = canvas;
    const { ctx, format } = configureCanvas(canvas, device);
    this.ctx = ctx;
    this.format = format;
    this.bindLayout = device.createBindGroupLayout({
      entries: [
        {
          binding: 0,
          visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
          buffer: { type: 'uniform', minBindingSize: UNIFORM_SIZE },
        },
      ],
    });
    const layout = device.createPipelineLayout({ bindGroupLayouts: [this.bindLayout] });
    const meshModule = device.createShaderModule({ code: SHADER });
    const lineModule = device.createShaderModule({ code: LINE_SHADER });
    const blend: GPUBlendState = {
      color: { srcFactor: 'src-alpha', dstFactor: 'one-minus-src-alpha', operation: 'add' },
      alpha: { srcFactor: 'one', dstFactor: 'one-minus-src-alpha', operation: 'add' },
    };
    this.pipelineMesh = device.createRenderPipeline({
      layout,
      vertex: {
        module: meshModule,
        entryPoint: 'vs',
        buffers: [
          { arrayStride: 12, attributes: [{ shaderLocation: 0, offset: 0, format: 'float32x3' }] },
          { arrayStride: 12, attributes: [{ shaderLocation: 1, offset: 0, format: 'float32x3' }] },
          { arrayStride: 16, attributes: [{ shaderLocation: 2, offset: 0, format: 'float32x4' }] },
        ],
      },
      fragment: { module: meshModule, entryPoint: 'fs', targets: [{ format, blend }] },
      primitive: { topology: 'triangle-list', cullMode: 'none' },
      depthStencil: { format: 'depth24plus', depthWriteEnabled: true, depthCompare: 'less' },
      multisample: { count: 4 },
    });
    this.pipelineLine = device.createRenderPipeline({
      layout,
      vertex: {
        module: lineModule,
        entryPoint: 'vs',
        buffers: [
          { arrayStride: 12, attributes: [{ shaderLocation: 0, offset: 0, format: 'float32x3' }] },
          { arrayStride: 16, attributes: [{ shaderLocation: 1, offset: 0, format: 'float32x4' }] },
        ],
      },
      fragment: { module: lineModule, entryPoint: 'fs', targets: [{ format, blend }] },
      primitive: { topology: 'line-list' },
      depthStencil: { format: 'depth24plus', depthWriteEnabled: true, depthCompare: 'less' },
      multisample: { count: 4 },
    });
    this.open = true;
    this.dirty = true;
    this.loop();
  }

  setOnFrame(cb: () => void) {
    this.onFrame = cb;
  }

  setCamera(patch: Partial<CameraState>) {
    this.camera = { ...this.camera, ...patch };
    this.dirty = true;
  }

  invalidate() {
    this.dirty = true;
  }

  private loop = () => {
    if (!this.open) return;
    if (this.dirty) {
      try {
        this.render();
      } catch (e) {
        console.error('[render]', e);
      }
      this.dirty = false;
      this.onFrame?.();
    }
    this.frameHandle = requestAnimationFrame(this.loop);
  };

  setLayers(layers: SceneLayer[]) {
    if (!this.device) return;
    const device = this.device;
    const keep = new Set(layers.map((l) => l.id));
    for (const [id, g] of Array.from(this.layers.entries())) {
      if (!keep.has(id)) {
        this.releaseLayer(g);
        this.layers.delete(id);
      }
    }
    for (const layer of layers) {
      const existing = this.layers.get(layer.id);
      if (existing && existing.mesh === layer.mesh) {
        existing.layer = layer;
        continue;
      }
      if (existing) {
        this.releaseLayer(existing);
        this.layers.delete(layer.id);
      }
      const mesh = layer.mesh;
      if (!mesh.positions.length || !mesh.indices.length) continue;
      const vbo = this.makeBuffer(mesh.positions, GPUBufferUsage.VERTEX);
      const ibo = this.makeBuffer(mesh.indices, GPUBufferUsage.INDEX);
      const cbo = this.makeBuffer(mesh.colors, GPUBufferUsage.VERTEX);
      const nbo = layer.kind === 'mesh' ? this.makeBuffer(mesh.normals, GPUBufferUsage.VERTEX) : null;
      const uniform = device.createBuffer({
        size: UNIFORM_SIZE,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      });
      const bindGroup = device.createBindGroup({
        layout: this.bindLayout,
        entries: [{ binding: 0, resource: { buffer: uniform } }],
      });
      this.layers.set(layer.id, {
        layer,
        vbo,
        nbo,
        cbo,
        ibo,
        indexCount: mesh.indices.length,
        uniform,
        bindGroup,
        mesh,
      });
    }
    this.dirty = true;
  }

  private makeBuffer(data: Float32Array | Uint32Array, usage: number) {
    const device = this.device!;
    const buf = device.createBuffer({
      size: Math.max(16, Math.ceil(data.byteLength / 4) * 4),
      usage: usage | GPUBufferUsage.COPY_DST,
    });
    device.queue.writeBuffer(buf, 0, data as unknown as ArrayBufferView);
    return buf;
  }

  private releaseLayer(g: LayerGpu) {
    g.vbo.destroy();
    g.nbo?.destroy();
    g.cbo.destroy();
    g.ibo.destroy();
    g.uniform.destroy();
  }

  /**
   * Reads the last rendered frame back from the GPU. Canvas drawImage() around a
   * WebGPU canvas is not reliable (the swap chain may already be recycled), so
   * we render one extra frame into an offscreen COPY_SRC texture and map it.
   */
  async snapshot(): Promise<string | null> {
    const device = this.device;
    const ctx = this.ctx;
    const canvas = this.canvas;
    if (!device || !ctx || !canvas) return null;
    const w = canvas.width;
    const h = canvas.height;
    if (!w || !h) return null;
    // Render into a dedicated texture that can be copied out.
    const target = device.createTexture({
      size: [w, h],
      format: this.format,
      usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC,
    });
    const msaa = device.createTexture({
      size: [w, h],
      format: this.format,
      sampleCount: 4,
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });
    const depth = device.createTexture({
      size: [w, h],
      format: 'depth24plus',
      sampleCount: 4,
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });
    this.renderTo(target, msaa, depth, w, h);
    const bytesPerRow = Math.ceil((w * 4) / 256) * 256;
    const readback = device.createBuffer({
      size: bytesPerRow * h,
      usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
    });
    const enc = device.createCommandEncoder();
    enc.copyTextureToBuffer({ texture: target }, { buffer: readback, bytesPerRow, rowsPerImage: h }, [w, h]);
    device.queue.submit([enc.finish()]);
    try {
      await readback.mapAsync(GPUMapMode.READ);
      const src = new Uint8Array(readback.getMappedRange());
      const out = document.createElement('canvas');
      out.width = w;
      out.height = h;
      const c2d = out.getContext('2d');
      if (!c2d) return null;
      const img = c2d.createImageData(w, h);
      const bgra = this.format.startsWith('bgra');
      for (let y = 0; y < h; y++) {
        const rowOff = y * bytesPerRow;
        for (let x = 0; x < w; x++) {
          const si = rowOff + x * 4;
          const di = (y * w + x) * 4;
          if (bgra) {
            img.data[di] = src[si + 2];
            img.data[di + 1] = src[si + 1];
            img.data[di + 2] = src[si];
          } else {
            img.data[di] = src[si];
            img.data[di + 1] = src[si + 1];
            img.data[di + 2] = src[si + 2];
          }
          img.data[di + 3] = 255;
        }
      }
      c2d.putImageData(img, 0, 0);
      readback.unmap();
      return out.toDataURL('image/png');
    } finally {
      readback.destroy();
      target.destroy();
      msaa.destroy();
      depth.destroy();
    }
  }

  private ensureTargets(w: number, h: number) {
    if (this.lastSize[0] === w && this.lastSize[1] === h && this.depthTex && this.msaaTex) return;
    this.depthTex?.destroy();
    this.msaaTex?.destroy();
    const device = this.device!;
    this.depthTex = device.createTexture({
      size: [w, h],
      format: 'depth24plus',
      sampleCount: 4,
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });
    this.msaaTex = device.createTexture({
      size: [w, h],
      format: this.format,
      sampleCount: 4,
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });
    this.lastSize = [w, h];
  }

  private resize() {
    if (!this.canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(2, Math.floor(this.canvas.clientWidth * dpr));
    const h = Math.max(2, Math.floor(this.canvas.clientHeight * dpr));
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
  }

  private render() {
    const device = this.device;
    const ctx = this.ctx;
    const canvas = this.canvas;
    if (!device || !ctx || !canvas) return;
    this.resize();
    const w = canvas.width;
    const h = canvas.height;
    this.ensureTargets(w, h);
    const enc = this.drawInto(
      this.msaaTex!.createView(),
      ctx.getCurrentTexture().createView(),
      this.depthTex!.createView(),
      w,
      h,
    );
    device.queue.submit([enc.finish()]);
  }

  private renderTo(target: GPUTexture, msaa: GPUTexture, depth: GPUTexture, w: number, h: number) {
    const device = this.device;
    if (!device) return;
    const enc = this.drawInto(msaa.createView(), target.createView(), depth.createView(), w, h);
    device.queue.submit([enc.finish()]);
  }

  private drawInto(
    colorView: GPUTextureView,
    resolveView: GPUTextureView,
    depthView: GPUTextureView,
    w: number,
    h: number,
  ): GPUCommandEncoder {
    const device = this.device!;
    const cam = this.camera;
    const cp = Math.cos(cam.pitch);
    const eye: [number, number, number] = [
      cam.target[0] + cam.distance * cp * Math.sin(cam.yaw),
      cam.target[1] + cam.distance * cp * Math.cos(cam.yaw),
      cam.target[2] + cam.distance * Math.sin(cam.pitch),
    ];
    // World up is +Z (patient superior). For near-top-down en-face views the
    // up vector becomes parallel to the view direction, so derive it by
    // projecting +Z into the view plane and falling back to +Y when degenerate.
    const view = mat4.lookAt(eye, cam.target, cameraUp(eye, cam.target));
    const proj = mat4.perspective(cam.fov, w / Math.max(1, h), 1, 1200);
    const vp = mat4.multiply(proj, view);

    const enc = device.createCommandEncoder();
    const pass = enc.beginRenderPass({
      colorAttachments: [
        {
          view: colorView,
          resolveTarget: resolveView,
          clearValue: { r: 0.031, g: 0.043, b: 0.063, a: 1 },
          loadOp: 'clear',
          storeOp: 'discard',
        },
      ],
      depthStencilAttachment: {
        view: depthView,
        depthClearValue: 1,
        depthLoadOp: 'clear',
        depthStoreOp: 'discard',
      },
    });

    const all = [...this.layers.values()].filter((l) => l.layer.visible !== false);
    const opaque = all.filter((l) => (l.layer.opacity ?? 1) >= 0.999 && l.layer.kind === 'mesh');
    const lines = all.filter((l) => l.layer.kind === 'lines');
    const transparent = all
      .filter((l) => (l.layer.opacity ?? 1) < 0.999 && l.layer.kind === 'mesh')
      .sort((a, b) => {
        const da = Math.hypot(a.mesh.positions[0] - eye[0], a.mesh.positions[1] - eye[1]);
        const db = Math.hypot(b.mesh.positions[0] - eye[0], b.mesh.positions[1] - eye[1]);
        return db - da;
      });

    const ld = normalize3([0.42, -0.55, 0.74]);
    const data = new Float32Array(UNIFORM_SIZE / 4);
    const draw = (list: LayerGpu[]) => {
      for (const g of list) {
        if (!g.indexCount) continue;
        data.set(vp, 0);
        data[16] = eye[0];
        data[17] = eye[1];
        data[18] = eye[2];
        data[19] = 1;
        data[20] = g.layer.ambient ?? 0.28;
        data[21] = g.layer.opacity ?? 1;
        data[22] = 0;
        data[23] = 0;
        data[24] = ld[0];
        data[25] = ld[1];
        data[26] = ld[2];
        data[27] = 0;
        data[28] = 0;
        data[29] = 0;
        data[30] = 0;
        data[31] = 0;
        const t = g.layer.tint ?? [1, 1, 1];
        data[32] = t[0];
        data[33] = t[1];
        data[34] = t[2];
        data[35] = 1;
        device.queue.writeBuffer(g.uniform, 0, data);
        pass.setPipeline(g.layer.kind === 'lines' ? this.pipelineLine : this.pipelineMesh);
        pass.setBindGroup(0, g.bindGroup);
        pass.setVertexBuffer(0, g.vbo);
        if (g.layer.kind === 'lines') {
          pass.setVertexBuffer(1, g.cbo);
        } else {
          pass.setVertexBuffer(1, g.nbo!);
          pass.setVertexBuffer(2, g.cbo);
        }
        pass.setIndexBuffer(g.ibo, 'uint32');
        pass.drawIndexed(g.indexCount);
      }
    };

    draw(opaque);
    draw(transparent);
    draw(lines);
    pass.end();
    return enc;
  }

  clear() {
    for (const g of Array.from(this.layers.values())) this.releaseLayer(g);
    this.layers.clear();
    this.dirty = true;
  }

  dispose() {
    this.open = false;
    cancelAnimationFrame(this.frameHandle);
    this.clear();
    this.depthTex?.destroy();
    this.msaaTex?.destroy();
    this.depthTex = null;
    this.msaaTex = null;
    this.lastSize = [0, 0];
  }
}

/** Stable up vector for a look-at, avoiding the degenerate top-down case. */
function cameraUp(eye: number[], target: number[]): [number, number, number] {
  const dir = normalize3([eye[0] - target[0], eye[1] - target[1], eye[2] - target[2]]);
  const zUp = [0, 0, 1];
  const proj = [zUp[0] - dir[0] * dir[2], zUp[1] - dir[1] * dir[2], zUp[2] - dir[2] * dir[2]];
  const len = Math.hypot(proj[0], proj[1], proj[2]);
  if (len > 0.18) return normalize3(proj) as [number, number, number];
  // top-down: use the patient anterior direction (+Y) projected instead
  const yUp = [0, 1, 0];
  const p2 = [yUp[0] - dir[0] * dir[1], yUp[1] - dir[1] * dir[1], yUp[2] - dir[2] * dir[1]];
  const l2 = Math.hypot(p2[0], p2[1], p2[2]);
  return (l2 > 1e-4 ? normalize3(p2) : [1, 0, 0]) as [number, number, number];
}

function normalize3(a: number[]): number[] {
  const n = Math.hypot(a[0], a[1], a[2]) || 1;
  return [a[0] / n, a[1] / n, a[2] / n];
}

export { mergeMeshes, destroyTexture };
