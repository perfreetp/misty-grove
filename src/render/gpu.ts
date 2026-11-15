import type { Volume } from '../lib/types';

let devicePromise: Promise<GPUDevice> | null = null;

export interface GpuStatus {
  ok: boolean;
  message: string;
  adapter?: string;
}

export async function getDevice(): Promise<GPUDevice> {
  if (!devicePromise) {
    devicePromise = (async () => {
      if (!('gpu' in navigator) || !navigator.gpu) {
        throw new Error('当前浏览器未启用 WebGPU(navigator.gpu 不可用)。请使用 Chrome/Edge 113+ 并允许硬件加速。');
      }
      const adapter = await navigator.gpu.requestAdapter({ powerPreference: 'high-performance' });
      if (!adapter) throw new Error('未能获取 WebGPU 适配器,请检查显卡驱动或浏览器启动参数。');
      const device = await adapter.requestDevice();
      device.addEventListener('uncapturederror', (ev) => {
        console.error('[WebGPU]', (ev as GPUUncapturedErrorEvent).error);
      });
      return device;
    })();
  }
  return devicePromise;
}

export async function probeGpu(): Promise<GpuStatus> {
  try {
    const device = await getDevice();
    return { ok: true, message: 'WebGPU 已就绪', adapter: device.label ?? '硬件适配器' };
  } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : String(e) };
  }
}

export function configureCanvas(canvas: HTMLCanvasElement, device: GPUDevice) {
  const ctx = canvas.getContext('webgpu');
  if (!ctx) throw new Error('无法创建 WebGPU 画布上下文');
  const format = navigator.gpu.getPreferredCanvasFormat();
  ctx.configure({
    device,
    format,
    alphaMode: 'premultiplied',
    // COPY_SRC keeps drawImage()/toDataURL() working for the report screenshot.
    usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC,
  });
  return { ctx, format };
}

export function halfFloat(value: number): number {
  const f32 = new Float32Array(1);
  const i32 = new Int32Array(f32.buffer);
  f32[0] = value;
  const x = i32[0];
  const sign = (x >> 16) & 0x8000;
  let exp = (x >> 23) & 0xff;
  let mant = x & 0x7fffff;
  if (exp === 0xff) return sign | 0x7c00 | (mant ? 1 : 0);
  exp = exp - 127 + 15;
  if (exp <= 0) return sign;
  if (exp >= 31) return sign | 0x7c00;
  mant = (mant >> 13) & 0x3ff;
  return sign | (exp << 10) | mant;
}

/** Uploads the volume into a filterable 3D texture. HU stored as f16 scaled by 1/1024. */
const volumeCache = new WeakMap<Volume, { tex: GPUTexture; device: GPUDevice }>();

export async function createVolumeTexture(device: GPUDevice, vol: Volume): Promise<GPUTexture> {
  const cached = volumeCache.get(vol);
  if (cached && cached.device === device) return cached.tex;
  const { width, height, depth } = vol;
  const tex = device.createTexture({
    size: [width, height, depth],
    dimension: '3d',
    format: 'r16float',
    usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
  });
  const raw = new Uint16Array(width * height * depth);
  const vox = vol.voxels;
  for (let i = 0; i < vox.length; i++) raw[i] = halfFloat(vox[i] / 1024);
  // r16float rows must be 256-byte aligned for writeTexture on some drivers: pad if needed.
  const rowBytes = width * 2;
  const aligned = Math.ceil(rowBytes / 256) * 256;
  if (aligned === rowBytes) {
    device.queue.writeTexture({ texture: tex }, raw, { bytesPerRow: rowBytes, rowsPerImage: height }, [width, height, depth]);
  } else {
    const padded = new Uint8Array(aligned * height * depth);
    const src = new Uint8Array(raw.buffer);
    for (let z = 0; z < depth; z++) {
      for (let y = 0; y < height; y++) {
        const from = (z * height + y) * rowBytes;
        padded.set(src.subarray(from, from + rowBytes), (z * height + y) * aligned);
      }
    }
    device.queue.writeTexture({ texture: tex }, padded, { bytesPerRow: aligned, rowsPerImage: height }, [width, height, depth]);
  }
  volumeCache.set(vol, { tex, device });
  return tex;
}

export function destroyTexture(tex: GPUTexture | null | undefined) {
  try {
    tex?.destroy();
  } catch {
    /* noop */
  }
}
