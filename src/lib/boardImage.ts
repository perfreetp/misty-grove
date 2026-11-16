import { mulberry32 } from './prng';

export interface PadSpec {
  x: number;
  y: number;
  w: number;
  h: number;
  through?: boolean;
  round?: boolean;
}

export type CompKind = 'chip' | 'ic' | 'connector' | 'tht';

export interface CompSpec {
  ref: string;
  kind: CompKind;
  x: number;
  y: number;
  w: number;
  h: number;
  pads: PadSpec[];
  /** 用于描述元件引脚方向 */
  label?: string;
}

export interface LayoutResult {
  components: CompSpec[];
  traces: { pts: [number, number][]; w: number }[];
  boardW: number;
  boardH: number;
}

export const BOARD_W = 2000;
export const BOARD_H = 1400;

function chip(
  ref: string,
  cx: number,
  cy: number,
  size: 'sm' | 'md' = 'md',
): CompSpec {
  const bodyW = size === 'sm' ? 34 : 46;
  const bodyH = size === 'sm' ? 26 : 34;
  const padW = size === 'sm' ? 34 : 42;
  const padH = size === 'sm' ? 30 : 38;
  const gap = size === 'sm' ? 26 : 34;
  const left = { x: cx - gap / 2 - padW, y: cy - padH / 2, w: padW, h: padH };
  const right = { x: cx + gap / 2, y: cy - padH / 2, w: padW, h: padH };
  return {
    ref,
    kind: 'chip',
    x: cx - bodyW / 2,
    y: cy - bodyH / 2,
    w: bodyW,
    h: bodyH,
    pads: [left, right],
    label: 'R0603',
  };
}

function qfpSides(ref: string, cx: number, cy: number, size: number, perSide: number): CompSpec {
  const body = size;
  const pitch = (body - 40) / (perSide - 1);
  const pinLen = 40;
  const pinW = 15;
  const pads: PadSpec[] = [];
  const start = -((perSide - 1) * pitch) / 2;
  for (let i = 0; i < perSide; i++) {
    const off = start + i * pitch;
    pads.push({ x: cx + off - pinW / 2, y: cy - body / 2 - pinLen, w: pinW, h: pinLen });
    pads.push({ x: cx + off - pinW / 2, y: cy + body / 2, w: pinW, h: pinLen });
    pads.push({ x: cx - body / 2 - pinLen, y: cy + off - pinW / 2, w: pinLen, h: pinW });
    pads.push({ x: cx + body / 2, y: cy + off - pinW / 2, w: pinLen, h: pinW });
  }
  return { ref, kind: 'ic', x: cx - body / 2, y: cy - body / 2, w: body, h: body, pads };
}

function soic(ref: string, cx: number, cy: number, w: number, h: number, perSide: number): CompSpec {
  const pitch = (w - 30) / (perSide - 1);
  const pinLen = 32;
  const pinH = 14;
  const pads: PadSpec[] = [];
  const start = -((perSide - 1) * pitch) / 2;
  for (let i = 0; i < perSide; i++) {
    const off = start + i * pitch;
    pads.push({ x: cx + off - pinH / 2, y: cy - h / 2 - pinLen, w: pinH, h: pinLen });
    pads.push({ x: cx + off - pinH / 2, y: cy + h / 2, w: pinH, h: pinLen });
  }
  return { ref, kind: 'ic', x: cx - w / 2, y: cy - h / 2, w, h, pads };
}

function connector(ref: string, x: number, y: number, rows: number): CompSpec {
  const pads: PadSpec[] = [];
  const pitch = 38;
  for (let i = 0; i < rows; i++) {
    pads.push({ x: x + 20, y: y + i * pitch, w: 46, h: 26 });
    pads.push({ x: x + 116, y: y + i * pitch, w: 46, h: 26 });
  }
  return { ref, kind: 'connector', x, y: y - 18, w: 182, h: rows * pitch + 18, pads };
}

function tht(ref: string, cx: number, cy: number): CompSpec {
  const r = 46;
  return {
    ref,
    kind: 'tht',
    x: cx - r,
    y: cy - r,
    w: r * 2,
    h: r * 2,
    pads: [
      { x: cx - 26, y: cy + r - 4, w: 30, h: 44, through: true, round: true },
      { x: cx + 8, y: cy + r - 4, w: 30, h: 44, through: true, round: true },
    ],
  };
}

function intersects(a: { x: number; y: number; w: number; h: number }, b: CompSpec, pad = 30) {
  return !(
    a.x + a.w < b.x - pad ||
    a.x > b.x + b.w + pad ||
    a.y + a.h < b.y - pad ||
    a.y > b.y + b.h + pad
  );
}

export function layoutBoard(seed: number): LayoutResult {
  const rng = mulberry32(seed * 7919 + 17);
  const comps: CompSpec[] = [];
  const ics = [
    qfpSides('U1', 560, 470, 210, 11),
    qfpSides('U2', 1245, 420, 190, 10),
    soic('U4', 880, 1010, 240, 120, 12),
    qfpSides('U7', 1490, 830, 150, 8),
  ];
  comps.push(...ics);
  const conn = connector('J1', 1700, 300, 16);
  comps.push(conn);
  comps.push(tht('C101', 190, 330), tht('C102', 190, 640), tht('C103', 190, 940));

  let chipIdx = 0;
  const rows = [220, 700, 1250];
  const cols = [300, 430, 720, 860, 1000, 1150, 1300, 1440, 1580];
  for (const y of rows) {
    for (const x of cols) {
      const cx = x + (rng() - 0.5) * 26;
      const cy = y + (rng() - 0.5) * 18;
      const box = { x: cx - 90, y: cy - 60, w: 180, h: 120 };
      if (comps.some((c) => intersects(box, c))) continue;
      chipIdx += 1;
      const prefix = chipIdx % 3 === 0 ? 'C' : chipIdx % 3 === 1 ? 'R' : 'L';
      const num = 10 + chipIdx * 3 + Math.floor(rng() * 3);
      comps.push(chip(`${prefix}${num}`, cx, cy, chipIdx % 4 === 0 ? 'sm' : 'md'));
    }
  }

  const traces: { pts: [number, number][]; w: number }[] = [];
  for (let i = 0; i < 46; i++) {
    const comp = comps[Math.floor(rng() * comps.length)];
    const pad = comp.pads[Math.floor(rng() * comp.pads.length)];
    const sx = pad.x + pad.w / 2;
    const sy = pad.y + pad.h / 2;
    const dirX = rng() > 0.5 ? 1 : -1;
    const len1 = 90 + rng() * 260;
    const len2 = 60 + rng() * 220;
    const pts: [number, number][] = [[sx, sy]];
    pts.push([sx + dirX * len1 * 0.55, sy]);
    pts.push([sx + dirX * len1, sy + (rng() > 0.5 ? len2 : -len2) * 0.3]);
    traces.push({ pts, w: 3 + Math.floor(rng() * 5) });
  }
  return { components: comps, traces, boardW: BOARD_W, boardH: BOARD_H };
}

export interface RenderDefect {
  id: string;
  type: 'insufficient_solder' | 'cold_joint' | 'offset' | 'bridging' | null;
  compIdx: number;
  padIdx: number | null;
  x: number;
  y: number;
  w: number;
  h: number;
  /** 轻微形貌，用于人眼才可发现的漏判缺陷 */
  subtle?: boolean;
}

export interface RenderOptions {
  layoutSeed: number;
  renderSeed: number;
  exposure: number;
  defects: RenderDefect[];
  boardNo: string;
  batchCode: string;
  versionLabel: string;
  width?: number;
  height?: number;
}

let noiseTile: HTMLCanvasElement | null = null;
function getNoise(): HTMLCanvasElement {
  if (noiseTile) return noiseTile;
  const c = document.createElement('canvas');
  c.width = 160;
  c.height = 160;
  const g = c.getContext('2d')!;
  const img = g.createImageData(160, 160);
  const rng = mulberry32(4242);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = 128 + (rng() - 0.5) * 90;
    img.data[i] = v;
    img.data[i + 1] = v;
    img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  noiseTile = c;
  return c;
}

function padGradient(g: CanvasRenderingContext2D, p: PadSpec, base: string, edge: string) {
  const grd = g.createLinearGradient(p.x, p.y, p.x + p.w, p.y + p.h);
  grd.addColorStop(0, base);
  grd.addColorStop(1, edge);
  return grd;
}

function drawPad(g: CanvasRenderingContext2D, p: PadSpec) {
  g.save();
  g.fillStyle = padGradient(g, p, '#e0b465', '#9c6f22');
  if (p.round) {
    g.beginPath();
    g.ellipse(p.x + p.w / 2, p.y + p.h / 2, p.w / 2, p.h / 2, 0, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = 'rgba(24,20,12,.85)';
    g.beginPath();
    g.ellipse(p.x + p.w / 2, p.y + p.h / 2, p.w * 0.28, p.h * 0.28, 0, 0, Math.PI * 2);
    g.fill();
  } else {
    g.beginPath();
    g.roundRect(p.x, p.y, p.w, p.h, 3);
    g.fill();
    g.strokeStyle = 'rgba(255,231,178,.35)';
    g.lineWidth = 1;
    g.stroke();
  }
  g.restore();
}

type JointStyle = 'good' | 'low' | 'cold' | 'bridge';

function drawJoint(
  g: CanvasRenderingContext2D,
  p: PadSpec,
  style: JointStyle,
  bridgeTo?: PadSpec,
  intensity = 1,
) {
  const cx = p.x + p.w / 2;
  const cy = p.y + p.h / 2;
  const lowK = 0.26 + 0.14 * (1 - intensity);
  const rx = style === 'low' ? p.w * lowK : p.w * 0.42;
  const ry = style === 'low' ? p.h * (lowK - 0.04) : p.h * 0.4;

  if (style === 'bridge' && bridgeTo) {
    const bx = bridgeTo.x + bridgeTo.w / 2;
    const by = bridgeTo.y + bridgeTo.h / 2;
    g.save();
    g.globalAlpha = 0.55 + 0.45 * intensity;
    const grd = g.createLinearGradient(cx, cy, bx, by);
    grd.addColorStop(0, '#f2f7f9');
    grd.addColorStop(0.45, '#b9c6cb');
    grd.addColorStop(1, '#e6eef1');
    g.fillStyle = grd;
    g.beginPath();
    g.ellipse(
      (cx + bx) / 2,
      (cy + by) / 2,
      Math.abs(bx - cx) / 2 + rx * 0.9,
      Math.min(ry, 16) * (0.55 + 0.45 * intensity),
      0,
      0,
      Math.PI * 2,
    );
    g.fill();
    g.restore();
  }

  g.save();
  const grd = g.createRadialGradient(
    cx - rx * 0.3,
    cy - ry * 0.35,
    Math.max(1, rx * 0.15),
    cx,
    cy,
    Math.max(rx, ry) * 1.05,
  );
  if (style === 'cold') {
    grd.addColorStop(0, '#b9bcb4');
    grd.addColorStop(0.5, '#8d938f');
    grd.addColorStop(1, '#626a68');
  } else if (style === 'low') {
    grd.addColorStop(0, '#c9d0ce');
    grd.addColorStop(0.6, '#98a09e');
    grd.addColorStop(1, '#6f7876');
  } else {
    grd.addColorStop(0, '#ffffff');
    grd.addColorStop(0.28, '#e8f0f3');
    grd.addColorStop(0.7, '#a8b6bb');
    grd.addColorStop(1, '#7a878c');
  }
  g.fillStyle = grd;
  g.beginPath();
  g.ellipse(cx, cy + (style === 'low' ? -ry * 0.15 : 0), rx, ry, 0, 0, Math.PI * 2);
  g.fill();

  if (style === 'good' || style === 'bridge') {
    g.fillStyle = 'rgba(255,255,255,.72)';
    g.beginPath();
    g.ellipse(cx - rx * 0.32, cy - ry * 0.38, rx * 0.26, ry * 0.2, -0.5, 0, Math.PI * 2);
    g.fill();
  }
  if (style === 'cold') {
    g.strokeStyle = `rgba(60,60,55,${0.28 * (0.25 + 0.75 * intensity)})`;
    g.lineWidth = 1;
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      g.beginPath();
      g.moveTo(cx + Math.cos(a) * rx * 0.25, cy + Math.sin(a) * ry * 0.25);
      g.lineTo(cx + Math.cos(a) * rx * 0.92, cy + Math.sin(a) * ry * 0.92);
      g.stroke();
    }
  }
  g.restore();
}

function drawBody(g: CanvasRenderingContext2D, c: CompSpec, dx: number, dy: number) {
  g.save();
  if (c.kind === 'tht') {
    const cx = c.x + c.w / 2 + dx;
    const cy = c.y + c.h / 2 + dy;
    const grd = g.createRadialGradient(cx - 16, cy - 20, 6, cx, cy, c.w / 2);
    grd.addColorStop(0, '#4c5457');
    grd.addColorStop(1, '#1c2225');
    g.fillStyle = grd;
    g.beginPath();
    g.arc(cx, cy, c.w / 2 - 4, 0, Math.PI * 2);
    g.fill();
    g.strokeStyle = 'rgba(224,196,120,.5)';
    g.lineWidth = 2;
    g.stroke();
    g.fillStyle = 'rgba(230,236,238,.55)';
    g.fillRect(cx - c.w / 2 + 10, cy - 3, c.w - 20, 6);
    return;
  }
  const grad = g.createLinearGradient(c.x + dx, c.y + dy, c.x + dx + c.w, c.y + dy + c.h);
  if (c.kind === 'ic') {
    grad.addColorStop(0, '#101614');
    grad.addColorStop(0.5, '#1d2624');
    grad.addColorStop(1, '#0c1110');
  } else if (c.kind === 'connector') {
    grad.addColorStop(0, '#242a2c');
    grad.addColorStop(1, '#121617');
  } else {
    grad.addColorStop(0, '#3a352c');
    grad.addColorStop(0.55, '#2a2620');
    grad.addColorStop(1, '#191713');
  }
  g.fillStyle = grad;
  g.beginPath();
  g.roundRect(c.x + dx, c.y + dy, c.w, c.h, c.kind === 'connector' ? 6 : 4);
  g.fill();
  g.strokeStyle = 'rgba(255,255,255,.06)';
  g.lineWidth = 1.5;
  g.stroke();
  if (c.kind === 'ic') {
    g.fillStyle = 'rgba(180,190,190,.5)';
    g.beginPath();
    g.arc(c.x + dx + 20, c.y + dy + 20, 4, 0, Math.PI * 2);
    g.fill();
    g.font = '600 13px Consolas, monospace';
    g.fillStyle = 'rgba(190,200,200,.35)';
    g.fillText('STM32F4', c.x + dx + c.w / 2 - 30, c.y + dy + c.h / 2 + 4);
  }
  g.restore();
}

export function renderBoardImage(opts: RenderOptions): HTMLCanvasElement {
  const W = opts.width ?? BOARD_W;
  const H = opts.height ?? BOARD_H;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const g = canvas.getContext('2d')!;
  const rng = mulberry32(opts.renderSeed * 131 + 7);
  const layout = layoutBoard(opts.layoutSeed);

  g.fillStyle = '#07110d';
  g.fillRect(0, 0, W, H);

  // 板体 + 阻焊层
  const rot = ((opts.renderSeed % 7) - 3) * 0.0035;
  g.save();
  g.translate(W / 2, H / 2);
  g.rotate(rot);
  g.translate(-W / 2, -H / 2);

  const mask = g.createRadialGradient(W * 0.42, H * 0.35, 80, W * 0.5, H * 0.5, W * 0.78);
  mask.addColorStop(0, '#1c5a41');
  mask.addColorStop(0.55, '#124531');
  mask.addColorStop(1, '#0a2c20');
  g.fillStyle = mask;
  g.beginPath();
  g.roundRect(24, 24, W - 48, H - 48, 26);
  g.fill();
  g.strokeStyle = 'rgba(226,214,170,.42)';
  g.lineWidth = 5;
  g.stroke();

  // 铜箔走线（阻焊下）
  for (const t of layout.traces) {
    g.strokeStyle = 'rgba(126,212,168,.16)';
    g.lineWidth = t.w;
    g.lineCap = 'round';
    g.lineJoin = 'round';
    g.beginPath();
    t.pts.forEach(([x, y], i) => (i === 0 ? g.moveTo(x, y) : g.lineTo(x, y)));
    g.stroke();
  }

  // 丝印
  g.fillStyle = 'rgba(238,242,236,.72)';
  g.font = '600 30px Consolas, monospace';
  g.fillText('AOI-BD-2416  REV C', 78, 96);
  g.font = '600 22px Consolas, monospace';
  g.fillStyle = 'rgba(238,242,236,.55)';
  g.fillText(`${opts.batchCode} / ${opts.boardNo}`, 78, 130);
  g.fillText(`${opts.versionLabel}`, W - 78 - g.measureText(opts.versionLabel).width, 96);

  // 基准点
  for (const [fx, fy] of [
    [86, H - 86],
    [W - 86, 176],
    [W - 86, H - 86],
  ]) {
    g.fillStyle = '#d8b166';
    g.beginPath();
    g.arc(fx, fy, 17, 0, Math.PI * 2);
    g.fill();
    g.strokeStyle = 'rgba(20,30,25,.8)';
    g.lineWidth = 3;
    g.beginPath();
    g.arc(fx, fy, 10, 0, Math.PI * 2);
    g.stroke();
  }

  const defects = opts.defects;
  const byComp = new Map<number, RenderDefect[]>();
  for (const d of defects) {
    const list = byComp.get(d.compIdx) ?? [];
    list.push(d);
    byComp.set(d.compIdx, list);
  }

  layout.components.forEach((c, ci) => {
    const ds = byComp.get(ci) ?? [];
    const offsetDefect = ds.find((d) => d.type === 'offset');
    const offK = offsetDefect?.subtle ? 0.45 : 1;
    const dx = offsetDefect ? 14 * offK : 0;
    const dy = offsetDefect ? 9 * offK : 0;

    // 连接器外壳
    if (c.kind === 'connector') {
      g.fillStyle = '#0f1414';
      g.beginPath();
      g.roundRect(c.x - 8, c.y - 8, c.w + 16, c.h + 16, 8);
      g.fill();
    }

    drawBody(g, c, dx, dy);

    c.pads.forEach((p, pi) => {
      const padDefect = ds.find((d) => d.padIdx === pi);
      drawPad(g, p);
      let style: JointStyle = 'good';
      if (padDefect) {
        if (padDefect.type === 'insufficient_solder') style = 'low';
        else if (padDefect.type === 'cold_joint') style = 'cold';
        else if (padDefect.type === 'bridging') style = 'bridge';
      }
      const intensity = padDefect?.subtle ? 0.5 : 1;
      const neighbour = pi % 2 === 0 ? c.pads[pi + 1] : c.pads[pi - 1];
      drawJoint(g, p, style, neighbour, intensity);
    });

    // 丝印位号
    g.font = '600 15px Consolas, monospace';
    g.fillStyle = 'rgba(235,240,235,.5)';
    if (c.kind === 'tht') {
      g.fillText(c.ref, c.x + c.w + 6, c.y + 20);
    } else if (c.kind === 'connector') {
      g.save();
      g.translate(c.x - 14, c.y + c.h / 2);
      g.rotate(-Math.PI / 2);
      g.fillText(c.ref, 0, 0);
      g.restore();
    } else {
      g.fillText(c.ref, c.x + dx, c.y + dy - 8);
    }
  });

  // 相机噪声
  g.save();
  g.globalAlpha = 0.055;
  g.globalCompositeOperation = 'overlay';
  const pat = g.createPattern(getNoise(), 'repeat');
  if (pat) {
    g.fillStyle = pat;
    g.fillRect(0, 0, W, H);
  }
  g.restore();

  // 曝光差异
  g.save();
  if (opts.exposure > 0) {
    g.globalCompositeOperation = 'lighter';
    g.fillStyle = `rgba(255,246,220,${Math.min(0.16, opts.exposure)})`;
    g.fillRect(0, 0, W, H);
  } else {
    g.fillStyle = `rgba(2,10,8,${Math.min(0.22, -opts.exposure)})`;
    g.fillRect(0, 0, W, H);
  }
  g.restore();

  // 轻微色偏 + 边缘暗角
  const vig = g.createRadialGradient(W / 2, H / 2, H * 0.32, W / 2, H / 2, H * 0.86);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(0,0,0,.42)');
  g.fillStyle = vig;
  g.fillRect(0, 0, W, H);

  g.restore();
  return canvas;
}
