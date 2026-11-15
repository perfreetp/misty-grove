import { SEGMENT_META, SEGMENT_ORDER } from './constants';
import type { Exam, SegmentKey } from './types';
import { storage } from './db';
import { getMucosaTexture } from './texture';

export const SOURCE_FPS = 30;

function hash(seed: number, n: number): number {
  let x = (seed ^ 0x9e3779b9) >>> 0;
  x = Math.imul(x ^ (n + 0x165667b1), 0x85ebca6b) >>> 0;
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35) >>> 0;
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

export interface LesionCue {
  type: 'bleeding' | 'ulcer' | 'polyp' | 'vascular';
  frame: number;
  x: number;
  y: number;
  r: number;
  span: number;
  sizeMm: number;
}

const CUE_TYPES = ['bleeding', 'ulcer', 'polyp', 'vascular'] as const;

function lesionCuesFor(seed: number, frameCount: number): LesionCue[] {
  const count = 3 + Math.floor(hash(seed, 7) * 4);
  const cues: LesionCue[] = [];
  for (let i = 0; i < count; i++) {
    const frac = 0.1 + ((i + 0.6) / count) * 0.78 + (hash(seed, 100 + i) - 0.5) * 0.07;
    const frame = Math.round(Math.min(0.96, Math.max(0.05, frac)) * frameCount);
    const angle = hash(seed, 200 + i) * Math.PI * 2;
    const dist = 0.12 + hash(seed, 300 + i) * 0.3;
    cues.push({
      type: CUE_TYPES[Math.floor(hash(seed, 400 + i) * CUE_TYPES.length)]!,
      frame,
      x: 0.5 + Math.cos(angle) * dist,
      y: 0.5 + Math.sin(angle) * dist * 0.9,
      r: 0.075 + hash(seed, 500 + i) * 0.075,
      span: 70 + Math.floor(hash(seed, 600 + i) * 60),
      sizeMm: Math.round((2 + hash(seed, 700 + i) * 16) * 10) / 10,
    });
  }
  return cues.sort((a, b) => a.frame - b.frame);
}

export function segmentForFrame(exam: Exam, frameIndex: number): SegmentKey {
  for (const seg of exam.segments) {
    if (frameIndex >= seg.startFrame && frameIndex < seg.endFrame) return seg.key;
  }
  return exam.segments[exam.segments.length - 1]?.key ?? SEGMENT_ORDER[SEGMENT_ORDER.length - 1]!;
}

export interface FrameRenderOptions {
  seed: number;
  frameIndex: number;
  frameCount: number;
  segment: SegmentKey;
  fps?: number;
  showOverlay?: boolean;
  patientTag?: string;
}

const FOV_SEGMENTS: Record<SegmentKey, { lumen: number; wobble: number; drift: number }> = {
  esophagus: { lumen: 0.2, wobble: 0.03, drift: 0.02 },
  stomach: { lumen: 0.34, wobble: 0.07, drift: 0.05 },
  duodenum: { lumen: 0.24, wobble: 0.045, drift: 0.028 },
  jejunum: { lumen: 0.27, wobble: 0.038, drift: 0.032 },
  ileum: { lumen: 0.25, wobble: 0.035, drift: 0.03 },
  colon: { lumen: 0.33, wobble: 0.05, drift: 0.04 },
};

export function renderSyntheticFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  opts: FrameRenderOptions,
): void {
  const { seed, frameIndex, frameCount, segment } = opts;
  const fps = opts.fps ?? SOURCE_FPS;
  const w = width;
  const h = height;
  const R = Math.min(w, h) * 0.478;
  const cx = w / 2;
  const cy = h / 2;
  const tex = getMucosaTexture(seed, segment);
  const fovMeta = FOV_SEGMENTS[segment];

  ctx.save();
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#050506';
  ctx.fillRect(0, 0, w, h);

  // sensor noise in the dark surround
  for (let i = 0; i < 26; i++) {
    const nx = hash(seed + frameIndex, i * 3 + 1) * w;
    const ny = hash(seed + frameIndex, i * 3 + 2) * h;
    ctx.fillStyle = `rgba(120,140,160,${0.012 + hash(seed + frameIndex, i * 3) * 0.028})`;
    ctx.fillRect(nx, ny, 1.7, 1.7);
  }

  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.clip();

  const phase = frameIndex * 0.052 + (seed % 97) * 0.61;
  const t = frameIndex / Math.max(1, frameCount - 1);

  // peristaltic breathing of the wall texture
  const breathe = 1 + Math.sin(phase * 0.42) * fovMeta.wobble;
  const spin = Math.sin(phase * 0.13) * 0.06 + Math.sin(phase * 0.047) * 0.03;
  const driftX = Math.sin(phase * 0.62 + 1.3) * R * fovMeta.drift + Math.sin(phase * 0.17) * R * 0.016;
  const driftY = Math.cos(phase * 0.47) * R * fovMeta.drift + Math.cos(phase * 0.21 + 2) * R * 0.014;

  // wall texture, rotating and scaling with the capsule's motion
  const scale = (R * 2.18 * breathe) / tex.size;
  ctx.save();
  ctx.translate(cx + driftX * 0.35, cy + driftY * 0.35);
  ctx.rotate(spin);
  ctx.scale(scale, scale);
  ctx.drawImage(tex.canvas, -tex.size / 2, -tex.size / 2);
  ctx.restore();

  // dark lumen opening with a soft mucosal lip
  const lumenR = R * (fovMeta.lumen + Math.sin(phase * 0.39) * 0.028 + Math.sin(phase * 0.11) * 0.012);
  const lx = cx + driftX;
  const ly = cy + driftY;
  const lipGrad = ctx.createRadialGradient(lx, ly, lumenR * 0.45, lx, ly, lumenR * 1.5);
  lipGrad.addColorStop(0, 'rgba(24,8,6,0.9)');
  lipGrad.addColorStop(0.55, 'rgba(34,12,8,0.42)');
  lipGrad.addColorStop(1, 'rgba(34,12,8,0)');
  ctx.fillStyle = lipGrad;
  ctx.beginPath();
  ctx.arc(lx, ly, lumenR * 1.5, 0, Math.PI * 2);
  ctx.fill();

  const lumenGrad = ctx.createRadialGradient(lx, ly, 0, lx, ly, lumenR);
  lumenGrad.addColorStop(0, 'rgba(9,3,3,0.92)');
  lumenGrad.addColorStop(0.42, 'rgba(26,9,6,0.9)');
  lumenGrad.addColorStop(0.72, 'rgba(62,24,16,0.85)');
  lumenGrad.addColorStop(0.9, 'rgba(104,50,34,0.62)');
  lumenGrad.addColorStop(1, 'rgba(150,86,62,0.2)');
  ctx.beginPath();
  ctx.ellipse(lx, ly, lumenR, lumenR * 0.94, Math.sin(phase * 0.2) * 0.15, 0, Math.PI * 2);
  ctx.fillStyle = lumenGrad;
  ctx.fill();
  // a hint of the far wall catching light inside the lumen
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(lx, ly, lumenR, lumenR * 0.94, Math.sin(phase * 0.2) * 0.15, 0, Math.PI * 2);
  ctx.clip();
  const farWall = ctx.createRadialGradient(
    lx + lumenR * 0.34,
    ly + lumenR * 0.26,
    0,
    lx + lumenR * 0.34,
    ly + lumenR * 0.26,
    lumenR * 0.62,
  );
  farWall.addColorStop(0, 'rgba(124,58,38,0.26)');
  farWall.addColorStop(0.55, 'rgba(78,32,20,0.12)');
  farWall.addColorStop(1, 'rgba(78,32,20,0)');
  ctx.fillStyle = farWall;
  ctx.fillRect(lx - lumenR, ly - lumenR, lumenR * 2, lumenR * 2);
  ctx.restore();
  ctx.strokeStyle = 'rgba(255,196,168,0.16)';
  ctx.lineWidth = Math.max(1, R * 0.007);
  ctx.stroke();

  // bile / gastric fluid pooling
  if (segment === 'stomach' || segment === 'duodenum' || segment === 'ileum') {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(lx, ly, lumenR * 0.95, lumenR * 0.9, 0, 0, Math.PI * 2);
    ctx.clip();
    const pool = ctx.createLinearGradient(lx, ly + lumenR * 0.1, lx, ly + lumenR);
    pool.addColorStop(0, 'rgba(120,88,26,0.02)');
    pool.addColorStop(0.65, segment === 'stomach' ? 'rgba(126,96,24,0.3)' : 'rgba(148,120,30,0.18)');
    pool.addColorStop(1, 'rgba(168,140,50,0.34)');
    ctx.fillStyle = pool;
    ctx.fillRect(lx - lumenR, ly - lumenR, lumenR * 2, lumenR * 2);
    ctx.restore();
  }

  // capsule LED illumination: broad warm pool + hotspot
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  const gx = cx - R * 0.3 + Math.sin(phase * 0.44) * R * 0.014;
  const gy = cy - R * 0.36;
  const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, R * 0.62);
  glow.addColorStop(0, 'rgba(255,252,246,0.26)');
  glow.addColorStop(0.3, 'rgba(255,242,228,0.12)');
  glow.addColorStop(0.68, 'rgba(255,230,208,0.04)');
  glow.addColorStop(1, 'rgba(255,226,200,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
  ctx.restore();

  // specular glints off wet mucosa
  for (let i = 0; i < 4; i++) {
    const hx = cx + (hash(seed, 900 + i) - 0.5) * R * 1.24 + Math.sin(phase * 0.5 + i * 1.7) * R * 0.012;
    const hy = cy + (hash(seed, 950 + i) - 0.5) * R * 1.05 + Math.cos(phase * 0.42 + i) * R * 0.01;
    const hr = R * (0.006 + hash(seed, 980 + i) * 0.014);
    const flick = 0.65 + 0.35 * Math.sin(phase * 0.9 + i * 2.1);
    const hg = ctx.createRadialGradient(hx, hy, 0, hx, hy, hr * 2.6);
    hg.addColorStop(0, `rgba(255,255,255,${0.7 * flick})`);
    hg.addColorStop(0.3, `rgba(255,246,232,${0.26 * flick})`);
    hg.addColorStop(1, 'rgba(255,246,232,0)');
    ctx.fillStyle = hg;
    ctx.fillRect(hx - hr * 2.6, hy - hr * 2.6, hr * 5.2, hr * 5.2);
  }

  // bubbles and debris drifting along the wall
  for (let i = 0; i < 7; i++) {
    const ba = hash(seed, 1200 + i) * Math.PI * 2 + phase * (0.13 + hash(seed, 1300 + i) * 0.16);
    const bd = R * (0.18 + hash(seed, 1400 + i) * 0.6);
    const byOff = (phase * 7 + i * 41) % (R * 0.22);
    const bx = cx + driftX * 1.3 + Math.cos(ba) * bd;
    const by = ly + Math.sin(ba) * bd * 0.9 - byOff;
    const br = R * (0.0035 + hash(seed, 1500 + i) * 0.009);
    ctx.beginPath();
    ctx.arc(bx, by, Math.max(0.9, br), 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,236,214,${0.04 + hash(seed, 1600 + i) * 0.08})`;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.14)';
    ctx.lineWidth = 0.7;
    ctx.stroke();
  }

  // synthetic lesion cues
  if (segment !== 'esophagus') {
    const cues = lesionCuesFor(seed, frameCount);
    for (const cue of cues) {
      const delta = frameIndex - cue.frame;
      if (Math.abs(delta) > cue.span) continue;
      const alpha = Math.min(1, 1 - Math.abs(delta) / cue.span) * 0.98;
      drawLesionCue(ctx, cx + driftX * 0.4, cy + driftY * 0.4, R, cue, alpha);
    }
  }

  // depth-of-field darkening toward the FOV rim
  const vig = ctx.createRadialGradient(cx, cy, R * 0.58, cx, cy, R);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(0.82, 'rgba(0,0,0,0.14)');
  vig.addColorStop(1, 'rgba(0,0,0,0.8)');
  ctx.fillStyle = vig;
  ctx.fillRect(cx - R, cy - R, R * 2, R * 2);

  // subtle chromatic fringing at the edge of the lens
  const fringe = ctx.createRadialGradient(cx, cy, R * 0.93, cx, cy, R);
  fringe.addColorStop(0, 'rgba(120,180,255,0)');
  fringe.addColorStop(1, 'rgba(140,190,255,0.12)');
  ctx.fillStyle = fringe;
  ctx.fillRect(cx - R, cy - R, R * 2, R * 2);

  // scanlines from the capsule's rolling sensor readout
  ctx.save();
  ctx.globalAlpha = 0.016;
  ctx.fillStyle = '#000';
  const lineGap = Math.max(2, Math.round(R * 0.013));
  const offset = Math.floor(frameIndex * 1.7) % lineGap;
  for (let y = cy - R; y < cy + R; y += lineGap) {
    ctx.fillRect(cx - R, y + offset, R * 2, 1);
  }
  ctx.restore();
  ctx.restore();

  // FOV ring
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(170,195,225,0.13)';
  ctx.lineWidth = Math.max(1, R * 0.007);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, R * 1.008, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(0,0,0,0.85)';
  ctx.lineWidth = Math.max(2, R * 0.016);
  ctx.stroke();
  ctx.restore();

  if (opts.showOverlay !== false) {
    drawHud(ctx, R, cx, cy, frameIndex, fps, t, opts.patientTag);
  }
}

function drawHud(
  ctx: CanvasRenderingContext2D,
  R: number,
  cx: number,
  cy: number,
  frameIndex: number,
  fps: number,
  t: number,
  patientTag?: string,
): void {
  const totalSec = frameIndex / fps;
  const hh = Math.floor(totalSec / 3600);
  const mm = Math.floor((totalSec % 3600) / 60);
  const ss = Math.floor(totalSec % 60);
  const timeText = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
  const fs = Math.max(10, Math.round(R * 0.043));
  ctx.save();
  ctx.font = `600 ${fs}px "Segoe UI", "Microsoft YaHei", sans-serif`;
  ctx.fillStyle = 'rgba(235,245,255,0.8)';
  ctx.shadowColor = 'rgba(0,0,0,0.85)';
  ctx.shadowBlur = 5;
  ctx.textBaseline = 'top';
  ctx.fillText(timeText, cx - R + R * 0.055, cy + R * 0.79);
  ctx.textAlign = 'right';
  ctx.fillText(`F${frameIndex + 1}`, cx + R - R * 0.055, cy + R * 0.79);
  if (patientTag) {
    ctx.font = `500 ${Math.round(fs * 0.76)}px "Segoe UI", "Microsoft YaHei", sans-serif`;
    ctx.fillStyle = 'rgba(235,245,255,0.4)';
    ctx.fillText(patientTag, cx + R - R * 0.055, cy - R * 0.93);
  }
  const barW = R * 0.56;
  const barH = Math.max(3, R * 0.015);
  const bx = cx - barW / 2;
  const by = cy - R * 0.9;
  ctx.fillStyle = 'rgba(255,255,255,0.13)';
  ctx.fillRect(bx, by, barW, barH);
  ctx.fillStyle = 'rgba(125,211,252,0.82)';
  ctx.fillRect(bx, by, barW * Math.min(1, t + 0.015), barH);
  ctx.restore();
}

function drawLesionCue(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  R: number,
  cue: LesionCue,
  alpha: number,
): void {
  const x = cx + (cue.x - 0.5) * R * 1.66;
  const y = cy + (cue.y - 0.5) * R * 1.66;
  const r = cue.r * R;
  ctx.save();
  ctx.globalAlpha = alpha;
  if (cue.type === 'bleeding') {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(116,4,10,0.94)');
    g.addColorStop(0.42, 'rgba(158,14,22,0.84)');
    g.addColorStop(0.75, 'rgba(188,26,32,0.5)');
    g.addColorStop(1, 'rgba(150,14,18,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * 0.84, 0.2, 0, Math.PI * 2);
    ctx.fill();
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2 + 0.4;
      ctx.beginPath();
      ctx.moveTo(x + Math.cos(a) * r * 0.2, y + Math.sin(a) * r * 0.2);
      ctx.quadraticCurveTo(x + Math.cos(a + 0.26) * r * 0.8, y + Math.sin(a + 0.26) * r * 0.75, x + Math.cos(a) * r * 1.16, y + Math.sin(a) * r * 0.92);
      ctx.strokeStyle = 'rgba(206,32,40,0.44)';
      ctx.lineWidth = Math.max(0.9, r * 0.055);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(x - r * 0.22, y - r * 0.26, r * 0.2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,152,148,0.36)';
    ctx.fill();
  } else if (cue.type === 'ulcer') {
    const g = ctx.createRadialGradient(x, y - r * 0.05, 0, x, y, r);
    g.addColorStop(0, 'rgba(244,240,226,0.94)');
    g.addColorStop(0.34, 'rgba(226,212,180,0.88)');
    g.addColorStop(0.7, 'rgba(198,142,112,0.72)');
    g.addColorStop(0.92, 'rgba(178,64,52,0.5)');
    g.addColorStop(1, 'rgba(140,36,30,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * 0.79, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x, y, r * 1.02, r * 0.81, -0.2, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(198,56,48,0.52)';
    ctx.lineWidth = Math.max(1, r * 0.11);
    ctx.stroke();
    for (let i = 0; i < 5; i++) {
      const a = i * 1.7;
      ctx.beginPath();
      ctx.arc(x + Math.cos(a) * r * 0.44, y + Math.sin(a) * r * 0.32, r * 0.09, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(122,88,58,0.26)';
      ctx.fill();
    }
  } else if (cue.type === 'polyp') {
    const g = ctx.createRadialGradient(x - r * 0.32, y - r * 0.36, r * 0.06, x, y, r * 1.12);
    g.addColorStop(0, 'rgba(252,196,180,0.96)');
    g.addColorStop(0.4, 'rgba(232,146,128,0.94)');
    g.addColorStop(0.72, 'rgba(196,96,86,0.86)');
    g.addColorStop(1, 'rgba(118,40,40,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r * 1.04, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, r * 0.9, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,212,200,0.3)';
    ctx.lineWidth = Math.max(0.8, r * 0.055);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x - r * 0.36, y - r * 0.42, r * 0.21, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,248,244,0.52)';
    ctx.fill();
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(x + Math.cos(a) * r * 0.48, y + Math.sin(a) * r * 0.48, r * 0.082, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(146,52,58,0.3)';
      ctx.fill();
    }
  } else {
    ctx.beginPath();
    ctx.arc(x, y, r * 1.02, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(112,18,28,0.26)';
    ctx.fill();
    for (let i = 0; i < 11; i++) {
      const a = hash(7, i) * Math.PI * 2;
      const len = r * (0.36 + hash(11, i) * 0.74);
      const bend = (hash(13, i) - 0.5) * 0.8;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(
        x + Math.cos(a + bend) * len * 0.62,
        y + Math.sin(a + bend) * len * 0.62,
        x + Math.cos(a) * len,
        y + Math.sin(a) * len,
      );
      ctx.strokeStyle = 'rgba(228,58,58,0.6)';
      ctx.lineWidth = Math.max(0.9, r * 0.048);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x + Math.cos(a) * len, y + Math.sin(a) * len, Math.max(0.8, r * 0.062), 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(250,142,134,0.48)';
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(x, y, r * 0.2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(210,40,46,0.4)';
    ctx.fill();
  }
  ctx.restore();
}

function drawImportedFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  bitmap: ImageBitmap,
  frameIndex: number,
  fps: number,
): void {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#050506';
  ctx.fillRect(0, 0, width, height);
  const scale = Math.min(width / bitmap.width, height / bitmap.height);
  const dw = bitmap.width * scale;
  const dh = bitmap.height * scale;
  ctx.drawImage(bitmap, (width - dw) / 2, (height - dh) / 2, dw, dh);
  const totalSec = frameIndex / fps;
  const hh = Math.floor(totalSec / 3600);
  const mm = Math.floor((totalSec % 3600) / 60);
  const ss = Math.floor(totalSec % 60);
  const timeText = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
  const fs = Math.max(10, Math.round(Math.min(width, height) * 0.022));
  ctx.save();
  ctx.font = `600 ${fs}px "Segoe UI", "Microsoft YaHei", sans-serif`;
  ctx.fillStyle = 'rgba(235,245,255,0.85)';
  ctx.shadowColor = 'rgba(0,0,0,0.9)';
  ctx.shadowBlur = 5;
  ctx.textBaseline = 'top';
  ctx.fillText(timeText, 14, height - fs - 14);
  ctx.textAlign = 'right';
  ctx.fillText(`F${frameIndex + 1}`, width - 14, height - fs - 14);
  ctx.restore();
}

export class FrameSource {
  readonly exam: Exam;
  private readonly cache = new Map<number, ImageBitmap>();
  private readonly cacheOrder: number[] = [];
  private readonly frameCountValue: number;

  constructor(exam: Exam) {
    this.exam = exam;
    this.frameCountValue = exam.source.frameCount;
  }

  get frameCount(): number {
    return this.frameCountValue;
  }

  get isImported(): boolean {
    return this.exam.source.kind === 'imported';
  }

  get fps(): number {
    return this.exam.fps || SOURCE_FPS;
  }

  async draw(ctx: CanvasRenderingContext2D, width: number, height: number, frameIndex: number): Promise<void> {
    const index = Math.max(0, Math.min(this.frameCountValue - 1, frameIndex));
    if (this.exam.source.kind === 'generated') {
      renderSyntheticFrame(ctx, width, height, {
        seed: this.exam.source.seed,
        frameIndex: index,
        frameCount: this.exam.source.frameCount,
        segment: segmentForFrame(this.exam, index),
        patientTag: this.exam.code,
      });
      return;
    }
    const bitmap = await this.load(index);
    if (bitmap) {
      drawImportedFrame(ctx, width, height, bitmap, index, this.fps);
    } else {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#0a0c10';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#7b8797';
      ctx.font = '14px "Segoe UI", "Microsoft YaHei", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('图像帧缺失', width / 2, height / 2);
    }
  }

  private async load(index: number): Promise<ImageBitmap | null> {
    const hit = this.cache.get(index);
    if (hit) return hit;
    const record = await storage.getFrame(this.exam.id, index);
    if (!record) return null;
    try {
      const bitmap = await createImageBitmap(record.blob);
      this.cache.set(index, bitmap);
      this.cacheOrder.push(index);
      while (this.cacheOrder.length > 30) {
        const victim = this.cacheOrder.shift();
        if (victim !== undefined && victim !== index) {
          const bmp = this.cache.get(victim);
          if (bmp) {
            this.cache.delete(victim);
            bmp.close();
          }
        }
      }
      return bitmap;
    } catch {
      return null;
    }
  }

  dispose(): void {
    for (const bmp of this.cache.values()) bmp.close();
    this.cache.clear();
    this.cacheOrder.length = 0;
  }
}

export function defaultSegments(frameCount: number): Exam['segments'] {
  const fractions: Record<SegmentKey, [number, number]> = {
    esophagus: [0, 0.07],
    stomach: [0.07, 0.25],
    duodenum: [0.25, 0.34],
    jejunum: [0.34, 0.65],
    ileum: [0.65, 0.92],
    colon: [0.92, 1],
  };
  return SEGMENT_ORDER.map((key) => ({
    key,
    name: SEGMENT_META[key].name,
    startFrame: Math.round(fractions[key][0] * frameCount),
    endFrame: Math.round(fractions[key][1] * frameCount),
    startAdjustedBy: null,
    startAdjustedAt: null,
    endAdjustedBy: null,
    endAdjustedAt: null,
  }));
}
