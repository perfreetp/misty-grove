import { getDevice, configureCanvas, createVolumeTexture } from './gpu';
import type { Vec3, Volume } from '../lib/types';

const WGSL = /* wgsl */ `
struct Params {
  origin: vec4<f32>,   // world of uv(0,0)
  du: vec4<f32>,       // world delta per unit u
  dv: vec4<f32>,       // world delta per unit v
  volOrigin: vec4<f32>,
  axisU: vec4<f32>,
  axisV: vec4<f32>,
  axisN: vec4<f32>,
  dims: vec4<f32>,     // width, height, depth, unused
  spacing: vec4<f32>,  // sx, sy, sz, unused
  win: vec4<f32>,      // center, width, lutMode, invert
  opts: vec4<f32>,     // opacity, unused, unused, unused
};

@group(0) @binding(0) var<uniform> p: Params;
@group(0) @binding(1) var volTex: texture_3d<f32>;
@group(0) @binding(2) var samp: sampler;

struct VSOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) uv: vec2<f32>,
};

@vertex
fn vs(@builtin(vertex_index) vi: u32) -> VSOut {
  var corners = array<vec2<f32>, 6>(
    vec2<f32>(-1.0, -1.0), vec2<f32>(1.0, -1.0), vec2<f32>(1.0, 1.0),
    vec2<f32>(-1.0, -1.0), vec2<f32>(1.0, 1.0), vec2<f32>(-1.0, 1.0)
  );
  let q = corners[vi];
  var out: VSOut;
  out.pos = vec4<f32>(q, 0.0, 1.0);
  out.uv = vec2<f32>((q.x + 1.0) * 0.5, (1.0 - q.y) * 0.5);
  return out;
}

fn toVolume(world: vec3<f32>) -> vec3<f32> {
  let rel = world - p.volOrigin.xyz;
  let vx = dot(rel, p.axisU.xyz) / p.spacing.x;
  let vy = dot(rel, p.axisV.xyz) / p.spacing.y;
  let vz = dot(rel, p.axisN.xyz) / p.spacing.z;
  return vec3<f32>((vx + 0.5) / p.dims.x, (vy + 0.5) / p.dims.y, (vz + 0.5) / p.dims.z);
}

fn lutCta(t: f32) -> vec3<f32> {
  if (t < 0.28) { return mix(vec3<f32>(0.02, 0.03, 0.05), vec3<f32>(0.12, 0.14, 0.18), t / 0.28); }
  if (t < 0.42) { return mix(vec3<f32>(0.12, 0.14, 0.18), vec3<f32>(0.40, 0.22, 0.22), (t - 0.28) / 0.14); }
  if (t < 0.56) { return mix(vec3<f32>(0.40, 0.22, 0.22), vec3<f32>(0.93, 0.55, 0.36), (t - 0.42) / 0.14); }
  if (t < 0.72) { return mix(vec3<f32>(0.93, 0.55, 0.36), vec3<f32>(1.0, 0.86, 0.66), (t - 0.56) / 0.16); }
  return mix(vec3<f32>(1.0, 0.86, 0.66), vec3<f32>(1.0, 0.99, 0.95), clamp((t - 0.72) / 0.28, 0.0, 1.0));
}

fn lutHot(t: f32) -> vec3<f32> {
  if (t < 0.3) { return mix(vec3<f32>(0.02, 0.03, 0.06), vec3<f32>(0.07, 0.12, 0.24), t / 0.3); }
  if (t < 0.55) { return mix(vec3<f32>(0.07, 0.12, 0.24), vec3<f32>(0.08, 0.38, 0.55), (t - 0.3) / 0.25); }
  if (t < 0.78) { return mix(vec3<f32>(0.08, 0.38, 0.55), vec3<f32>(0.98, 0.75, 0.27), (t - 0.55) / 0.23); }
  if (t < 0.92) { return mix(vec3<f32>(0.98, 0.75, 0.27), vec3<f32>(0.94, 0.35, 0.24), (t - 0.78) / 0.14); }
  return mix(vec3<f32>(0.94, 0.35, 0.24), vec3<f32>(1.0, 0.98, 0.92), (t - 0.92) / 0.08);
}

@fragment
fn fs(in: VSOut) -> @location(0) vec4<f32> {
  let world = p.origin.xyz + p.du.xyz * in.uv.x + p.dv.xyz * in.uv.y;
  let coords = toVolume(world);
  if (coords.x < 0.0 || coords.y < 0.0 || coords.z < 0.0 ||
      coords.x > 1.0 || coords.y > 1.0 || coords.z > 1.0) {
    return vec4<f32>(0.012, 0.016, 0.024, 1.0);
  }
  let hu = textureSampleLevel(volTex, samp, coords, 0.0).r * 1024.0;
  let lo = p.win.x - p.win.y * 0.5;
  var t = clamp((hu - lo) / max(p.win.y, 1.0), 0.0, 1.0);
  if (p.win.w > 0.5) { t = 1.0 - t; }
  var col: vec3<f32>;
  if (p.win.z < 0.5) { col = vec3<f32>(t); }
  else if (p.win.z < 1.5) { col = lutCta(t); }
  else { col = lutHot(t); }
  return vec4<f32>(col, p.opts.x);
}
`;

export interface VolumeViewParams {
  origin: Vec3;
  du: Vec3;
  dv: Vec3;
  windowCenter: number;
  windowWidth: number;
  lutMode: 0 | 1 | 2;
  invert?: boolean;
  opacity?: number;
}

export class VolumeRenderer {
  private device: GPUDevice | null = null;
  private ctx: GPUCanvasContext | null = null;
  private pipeline!: GPURenderPipeline;
  private bindGroup: GPUBindGroup | null = null;
  private uniform!: GPUBuffer;
  private sampler!: GPUSampler;
  private texture: GPUTexture | null = null;
  private volume: Volume | null = null;
  private params: VolumeViewParams | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private open = false;
  private dirty = false;
  private frameHandle = 0;
  private onFrame?: () => void;

  async init(canvas: HTMLCanvasElement) {
    const device = await getDevice();
    this.device = device;
    this.canvas = canvas;
    const { ctx, format } = configureCanvas(canvas, device);
    this.ctx = ctx;
    const module = device.createShaderModule({ code: WGSL });
    this.pipeline = device.createRenderPipeline({
      layout: 'auto',
      vertex: { module, entryPoint: 'vs' },
      fragment: { module, entryPoint: 'fs', targets: [{ format }] },
      primitive: { topology: 'triangle-list' },
    });
    this.uniform = device.createBuffer({
      size: 176,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
    this.sampler = device.createSampler({
      magFilter: 'linear',
      minFilter: 'linear',
      addressModeU: 'clamp-to-edge',
      addressModeV: 'clamp-to-edge',
      addressModeW: 'clamp-to-edge',
    });
    this.open = true;
    this.loop();
  }

  setOnFrame(cb: () => void) {
    this.onFrame = cb;
  }

  async setVolume(vol: Volume) {
    const device = this.device;
    if (!device) return;
    // Textures are cached per Volume in gpu.ts and shared between panes, so we
    // must not destroy the previous one here.
    this.texture = await createVolumeTexture(device, vol);
    this.volume = vol;
    this.bindGroup = device.createBindGroup({
      layout: this.pipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: { buffer: this.uniform } },
        { binding: 1, resource: this.texture.createView({ dimension: '3d' }) },
        { binding: 2, resource: this.sampler },
      ],
    });
    this.dirty = true;
  }

  setParams(params: VolumeViewParams) {
    this.params = params;
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
        this.onFrame?.();
      } catch (e) {
        console.error('[volume-view]', e);
      }
      this.dirty = false;
    }
    this.frameHandle = requestAnimationFrame(this.loop);
  };

  private render() {
    const device = this.device;
    const ctx = this.ctx;
    const canvas = this.canvas;
    const vol = this.volume;
    const params = this.params;
    if (!device || !ctx || !canvas || !vol || !params || !this.bindGroup) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(2, Math.floor(canvas.clientWidth * dpr));
    const h = Math.max(2, Math.floor(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    const data = new Float32Array(44);
    data.set([...params.origin, 1], 0);
    data.set([...params.du, 0], 4);
    data.set([...params.dv, 0], 8);
    data.set([...vol.origin, 1], 12);
    data.set([...vol.axisU, 0], 16);
    data.set([...vol.axisV, 0], 20);
    data.set([...vol.normal, 0], 24);
    data.set([vol.width, vol.height, vol.depth, 0], 28);
    data.set([vol.spacing[0], vol.spacing[1], vol.spacing[2], 0], 32);
    data.set([params.windowCenter, params.windowWidth, params.lutMode, params.invert ? 1 : 0], 36);
    data.set([params.opacity ?? 1, 0, 0, 0], 40);
    device.queue.writeBuffer(this.uniform, 0, data);

    const enc = device.createCommandEncoder();
    const pass = enc.beginRenderPass({
      colorAttachments: [
        {
          view: ctx.getCurrentTexture().createView(),
          clearValue: { r: 0.01, g: 0.015, b: 0.02, a: 1 },
          loadOp: 'clear',
          storeOp: 'store',
        },
      ],
    });
    pass.setPipeline(this.pipeline);
    pass.setBindGroup(0, this.bindGroup);
    pass.draw(6);
    pass.end();
    device.queue.submit([enc.finish()]);
  }

  dispose() {
    this.open = false;
    cancelAnimationFrame(this.frameHandle);
    this.texture = null;
  }
}

/** World-space quad description for an axial slice (uv origin at top-left). */
export function axialQuad(vol: Volume, slice: number): { origin: Vec3; du: Vec3; dv: Vec3 } {
  const s = Math.max(0, Math.min(vol.depth - 1, slice));
  const origin: Vec3 = [
    vol.origin[0] + vol.normal[0] * s * vol.spacing[2],
    vol.origin[1] + vol.normal[1] * s * vol.spacing[2],
    vol.origin[2] + vol.normal[2] * s * vol.spacing[2],
  ];
  const du: Vec3 = [
    vol.axisU[0] * vol.width * vol.spacing[0],
    vol.axisU[1] * vol.width * vol.spacing[0],
    vol.axisU[2] * vol.width * vol.spacing[0],
  ];
  const dv: Vec3 = [
    vol.axisV[0] * vol.height * vol.spacing[1],
    vol.axisV[1] * vol.height * vol.spacing[1],
    vol.axisV[2] * vol.height * vol.spacing[1],
  ];
  return { origin, du, dv };
}

/** World-space quad for an arbitrary oblique plane. */
export function obliqueQuad(
  worldOrigin: Vec3,
  u: Vec3,
  v: Vec3,
  extentU: number,
  extentV: number,
): { origin: Vec3; du: Vec3; dv: Vec3 } {
  return {
    origin: worldOrigin,
    du: [u[0] * extentU, u[1] * extentU, u[2] * extentU],
    dv: [v[0] * extentV, v[1] * extentV, v[2] * extentV],
  };
}
