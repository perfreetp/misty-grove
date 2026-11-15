import { FINDING_META, SEGMENT_META } from '../constants';
import type { Exam, SegmentKey } from '../types';
import { clamp, formatClock } from '../utils';

export interface TimelineCallbacks {
  onSeek: (frame: number, final: boolean) => void;
  onBoundaryChange?: (boundaryIndex: number, frame: number) => void;
  onBoundaryPreview?: (boundaryIndex: number, frame: number) => void;
  onKeyframeClick?: (findingId: string, keyframeId: string) => void;
  canEditBoundaries: () => boolean;
}

export interface TimelineOptions {
  fps: number;
  showFindings?: boolean;
  compact?: boolean;
  showBoundaryHandles?: boolean;
}

interface Geometry {
  left: number;
  width: number;
  laneTop: number;
  laneHeight: number;
  bandTop: number;
  bandHeight: number;
  markerTop: number;
  markerHeight: number;
}

const PAD = { left: 10, right: 10 };

export class Timeline {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private exam: Exam;
  private frame = 0;
  private hoverFrame: number | null = null;
  private hoverBoundary: number | null = null;
  private dragBoundary: number | null = null;
  private scrubPointer: number | null = null;
  private raf = 0;
  private readonly opts: Required<TimelineOptions>;
  private readonly cbs: TimelineCallbacks;
  private ro: ResizeObserver | null = null;
  private dpr = 1;

  constructor(
    host: HTMLElement,
    exam: Exam,
    private readonly callbacks: TimelineCallbacks,
    options: TimelineOptions = { fps: 30 },
  ) {
    this.exam = exam;
    this.cbs = callbacks;
    this.opts = {
      fps: options.fps ?? 30,
      showFindings: options.showFindings ?? true,
      compact: options.compact ?? false,
      showBoundaryHandles: options.showBoundaryHandles ?? true,
    };
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'timeline-canvas';
    this.canvas.setAttribute('role', 'slider');
    this.canvas.tabIndex = 0;
    this.canvas.setAttribute('aria-label', '胶囊内镜时间轴');
    host.appendChild(this.canvas);
    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas2D 不可用');
    this.ctx = ctx;
    this.attach();
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(host);
    this.resize();
  }

  setExam(exam: Exam): void {
    this.exam = exam;
    this.requestDraw();
  }

  setFrame(frame: number): void {
    if (this.frame === frame) return;
    this.frame = frame;
    this.requestDraw();
  }

  setFps(fps: number): void {
    this.opts.fps = fps;
    this.requestDraw();
  }

  get element(): HTMLCanvasElement {
    return this.canvas;
  }

  destroy(): void {
    this.ro?.disconnect();
    if (this.raf) cancelAnimationFrame(this.raf);
    this.canvas.remove();
  }

  private attach(): void {
    this.canvas.addEventListener('pointerdown', (ev) => this.onPointerDown(ev));
    this.canvas.addEventListener('pointermove', (ev) => this.onPointerMove(ev));
    this.canvas.addEventListener('pointerup', (ev) => this.onPointerUp(ev));
    this.canvas.addEventListener('pointercancel', (ev) => this.onPointerUp(ev));
    this.canvas.addEventListener('pointerleave', () => {
      if (this.scrubPointer === null && this.dragBoundary === null) {
        this.hoverFrame = null;
        this.hoverBoundary = null;
        this.requestDraw();
      }
    });
    this.canvas.addEventListener('keydown', (ev) => this.onKey(ev));
  }

  private resize(): void {
    const rect = this.canvas.parentElement?.getBoundingClientRect();
    const width = Math.max(220, Math.round(rect?.width ?? this.canvas.clientWidth));
    const height = this.opts.compact ? 82 : 130;
    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    this.canvas.style.width = '100%';
    this.canvas.style.height = `${height}px`;
    this.canvas.width = Math.round(width * this.dpr);
    this.canvas.height = Math.round(height * this.dpr);
    this.requestDraw();
  }

  private geometry(): Geometry {
    const w = this.canvas.width / this.dpr;
    const h = this.canvas.height / this.dpr;
    if (this.opts.compact) {
      return {
        left: PAD.left,
        width: Math.max(10, w - PAD.left - PAD.right),
        laneTop: 8,
        laneHeight: 20,
        bandTop: 32,
        bandHeight: 11,
        markerTop: 64,
        markerHeight: Math.max(16, h - 68),
      };
    }
    return {
      left: PAD.left,
      width: Math.max(10, w - PAD.left - PAD.right),
      laneTop: 10,
      laneHeight: 28,
      bandTop: 42,
      bandHeight: 12,
      markerTop: 80,
      markerHeight: Math.max(22, h - 84),
    };
  }

  private frameToX(frame: number, g: Geometry): number {
    const total = Math.max(1, this.exam.source.frameCount - 1);
    return g.left + (clamp(frame, 0, total) / total) * g.width;
  }

  private xToFrame(x: number, g: Geometry): number {
    const total = Math.max(1, this.exam.source.frameCount - 1);
    return clamp(Math.round(((x - g.left) / g.width) * total), 0, total);
  }

  private boundaryHandles(g: Geometry): { index: number; x: number }[] {
    return this.exam.segments.slice(1).map((seg, i) => ({
      index: i + 1,
      x: this.frameToX(seg.startFrame, g),
    }));
  }

  private eventPos(ev: PointerEvent): { x: number; y: number } {
    const rect = this.canvas.getBoundingClientRect();
    return { x: ev.clientX - rect.left, y: ev.clientY - rect.top };
  }

  private nearestBoundary(x: number, y: number, g: Geometry): number | null {
    if (!this.opts.showBoundaryHandles) return null;
    const inBand = y >= g.bandTop - 10 && y <= g.bandTop + g.bandHeight + 12;
    if (!inBand) return null;
    let best: { index: number; dist: number } | null = null;
    for (const h of this.boundaryHandles(g)) {
      const dist = Math.abs(h.x - x);
      if (dist <= 8 && (!best || dist < best.dist)) best = { index: h.index, dist };
    }
    return best?.index ?? null;
  }

  private onPointerDown(ev: PointerEvent): void {
    const g = this.geometry();
    const { x, y } = this.eventPos(ev);
    const boundary = this.nearestBoundary(x, y, g);
    this.canvas.setPointerCapture(ev.pointerId);
    if (boundary !== null && this.cbs.canEditBoundaries()) {
      this.dragBoundary = boundary;
      this.callbacks.onBoundaryPreview?.(boundary, this.xToFrame(x, g));
      this.requestDraw();
      return;
    }
    this.scrubPointer = x;
    const frame = this.xToFrame(x, g);
    this.frame = frame;
    this.callbacks.onSeek(frame, false);
    this.requestDraw();
  }

  private onPointerMove(ev: PointerEvent): void {
    const g = this.geometry();
    const { x, y } = this.eventPos(ev);
    if (this.dragBoundary !== null) {
      const frame = this.clampBoundaryFrame(this.dragBoundary, this.xToFrame(x, g));
      this.callbacks.onBoundaryPreview?.(this.dragBoundary, frame);
      return;
    }
    if (this.scrubPointer !== null) {
      const frame = this.xToFrame(x, g);
      this.frame = frame;
      this.callbacks.onSeek(frame, false);
      this.requestDraw();
      return;
    }
    const boundary = this.nearestBoundary(x, y, g);
    const hoverFrame = this.opts.showFindings ? this.pickFindingMarker(x, y, g) : null;
    if (boundary !== this.hoverBoundary || (hoverFrame === null) !== (this.hoverFrame === null)) {
      this.hoverBoundary = boundary;
      this.hoverFrame = hoverFrame;
      this.canvas.style.cursor = boundary !== null && this.cbs.canEditBoundaries() ? 'ew-resize' : 'pointer';
      this.requestDraw();
    } else {
      this.hoverFrame = hoverFrame;
    }
  }

  private onPointerUp(ev: PointerEvent): void {
    const g = this.geometry();
    if (this.dragBoundary !== null) {
      const { x } = this.eventPos(ev);
      const frame = this.clampBoundaryFrame(this.dragBoundary, this.xToFrame(x, g));
      const index = this.dragBoundary;
      this.dragBoundary = null;
      this.callbacks.onBoundaryChange?.(index, frame);
      return;
    }
    if (this.scrubPointer !== null) {
      this.scrubPointer = null;
      const { x } = this.eventPos(ev);
      this.callbacks.onSeek(this.xToFrame(x, g), true);
    }
  }

  private clampBoundaryFrame(index: number, frame: number): number {
    const prev = this.exam.segments[index - 1];
    const next = this.exam.segments[index];
    if (!prev || !next) return frame;
    return clamp(frame, prev.startFrame + 1, next.endFrame - 1);
  }

  private onKey(ev: KeyboardEvent): void {
    const step = ev.shiftKey ? 10 : 1;
    const total = this.exam.source.frameCount - 1;
    let next = this.frame;
    switch (ev.key) {
      case 'ArrowLeft':
        next = Math.max(0, this.frame - step);
        break;
      case 'ArrowRight':
        next = Math.min(total, this.frame + step);
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = total;
        break;
      default:
        return;
    }
    ev.preventDefault();
    this.frame = next;
    this.callbacks.onSeek(next, true);
    this.requestDraw();
  }

  private pickFindingMarker(x: number, y: number, g: Geometry): number | null {
    if (!this.opts.showFindings) return null;
    if (y < g.markerTop - 4) return null;
    for (const finding of this.exam.findings) {
      const fx = this.frameToX(finding.frameIndex, g);
      if (Math.abs(fx - x) <= 7) return finding.frameIndex;
    }
    return null;
  }

  private requestDraw(): void {
    if (this.raf) return;
    this.raf = requestAnimationFrame(() => {
      this.raf = 0;
      this.draw();
    });
  }

  private draw(): void {
    const ctx = this.ctx;
    const g = this.geometry();
    const w = this.canvas.width / this.dpr;
    const h = this.canvas.height / this.dpr;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const frameCount = this.exam.source.frameCount;
    const total = Math.max(1, frameCount - 1);

    // segment lanes
    ctx.save();
    roundRect(ctx, g.left, g.laneTop, g.width, g.laneHeight, 7);
    ctx.clip();
    ctx.fillStyle = 'rgba(148,163,184,0.08)';
    ctx.fillRect(g.left, g.laneTop, g.width, g.laneHeight);
    const bounds = this.boundaryHandles(g);
    const segStarts = [0, ...bounds.map((b) => b.x), g.left + g.width];
    this.exam.segments.forEach((seg, i) => {
      const x0 = segStarts[i] ?? g.left;
      const x1 = segStarts[i + 1] ?? g.left + g.width;
      const meta = SEGMENT_META[seg.key];
      ctx.fillStyle = meta.tint;
      ctx.fillRect(x0, g.laneTop, Math.max(0, x1 - x0), g.laneHeight);
      if (x1 - x0 > 34) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(x0, g.laneTop, x1 - x0, g.laneHeight);
        ctx.clip();
        ctx.fillStyle = meta.text;
        ctx.font = '600 10.5px "Segoe UI", "Microsoft YaHei", sans-serif';
        ctx.textBaseline = 'middle';
        ctx.textAlign = x1 - x0 > 64 ? 'left' : 'center';
        const tx = x1 - x0 > 64 ? x0 + 7 : (x0 + x1) / 2;
        ctx.fillText(meta.short, tx, g.laneTop + g.laneHeight / 2 + 0.5);
        ctx.restore();
      }
      if (i > 0) {
        ctx.strokeStyle = meta.border;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x0, g.laneTop);
        ctx.lineTo(x0, g.laneTop + g.laneHeight);
        ctx.stroke();
      }
    });
    ctx.restore();

    // band strip with major ticks
    ctx.save();
    roundRect(ctx, g.left, g.bandTop, g.width, g.bandHeight, 4);
    ctx.clip();
    ctx.fillStyle = 'rgba(148,163,184,0.07)';
    ctx.fillRect(g.left, g.bandTop, g.width, g.bandHeight);
    this.exam.segments.forEach((seg, i) => {
      const x0 = segStarts[i] ?? g.left;
      const x1 = segStarts[i + 1] ?? g.left + g.width;
      ctx.fillStyle = SEGMENT_META[seg.key].lane;
      ctx.fillRect(x0, g.bandTop, Math.max(0, x1 - x0), g.bandHeight);
    });
    // seconds ticks
    const secondsTotal = total / this.opts.fps;
    const tickStep = secondsTotal > 900 ? 120 : secondsTotal > 420 ? 60 : secondsTotal > 180 ? 30 : 10;
    ctx.fillStyle = 'rgba(150,175,205,0.22)';
    for (let s = 0; s <= secondsTotal; s += tickStep) {
      const x = g.left + (s * this.opts.fps / total) * g.width * (1 / 1);
      ctx.fillRect(g.left + ((s * this.opts.fps) / total) * g.width, g.bandTop, 1, g.bandHeight);
      void x;
    }
    ctx.restore();

    // marker lane: a flag per finding on the upper row, keyframe dots below
    if (this.opts.showFindings) {
      const flagTop = g.markerTop;
      const dotRow = Math.min(g.markerTop + 26, g.markerTop + g.markerHeight - 5);
      // dashed guide so the marker lane reads as its own track
      ctx.save();
      ctx.strokeStyle = 'rgba(120,160,210,0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(g.left, flagTop - 5);
      ctx.lineTo(g.left + g.width, flagTop - 5);
      ctx.stroke();
      ctx.restore();
      for (const finding of this.exam.findings) {
        const fx = this.frameToX(finding.frameIndex, g);
        const color = FINDING_META[finding.type].color;
        // stem down to the keyframe row
        ctx.strokeStyle = 'rgba(255,255,255,0.10)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(fx, flagTop + 14);
        ctx.lineTo(fx, dotRow - 4);
        ctx.stroke();
        ctx.save();
        ctx.shadowColor = color;
        ctx.shadowBlur = 7;
        ctx.beginPath();
        ctx.moveTo(fx, flagTop);
        ctx.lineTo(fx + 6, flagTop + 4);
        ctx.lineTo(fx + 6, flagTop + 10);
        ctx.lineTo(fx, flagTop + 14);
        ctx.lineTo(fx - 6, flagTop + 10);
        ctx.lineTo(fx - 6, flagTop + 4);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = 'rgba(7,10,15,0.65)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
        for (const kf of finding.keyframes) {
          const kx = this.frameToX(kf.frameIndex, g);
          ctx.beginPath();
          ctx.arc(kx, dotRow, 2.9, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
          ctx.strokeStyle = 'rgba(7,10,15,0.9)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      if (this.hoverFrame !== null) {
        const hx = this.frameToX(this.hoverFrame, g);
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.setLineDash([2, 3]);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(hx, flagTop - 4);
        ctx.lineTo(hx, flagTop + 14);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    // boundary handles
    if (this.opts.showBoundaryHandles) {
      for (const handle of this.boundaryHandles(g)) {
        const active = this.hoverBoundary === handle.index || this.dragBoundary === handle.index;
        ctx.save();
        ctx.fillStyle = active ? 'rgba(94,234,212,0.95)' : 'rgba(210,235,250,0.55)';
        ctx.strokeStyle = 'rgba(7,10,15,0.75)';
        ctx.lineWidth = 1;
        roundRect(ctx, handle.x - 2.5, g.bandTop - 3, 5, g.bandHeight + 6, 2.5);
        ctx.fill();
        ctx.stroke();
        if (active) {
          const seg = this.exam.segments[handle.index];
          if (seg) {
            const x = this.frameToX(seg.startFrame, g);
            const label = `F${seg.startFrame + 1} · ${formatClock(seg.startFrame / this.opts.fps)}`;
            ctx.font = '600 10px "Segoe UI", "Microsoft YaHei", sans-serif';
            const tw = ctx.measureText(label).width + 12;
            const lx = clamp(x - tw / 2, g.left, g.left + g.width - tw);
            const ly = g.bandTop - 24;
            ctx.fillStyle = 'rgba(9,14,22,0.95)';
            roundRect(ctx, lx, ly, tw, 17, 5);
            ctx.fill();
            ctx.strokeStyle = 'rgba(94,234,212,0.4)';
            ctx.stroke();
            ctx.fillStyle = '#5eead4';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, lx + tw / 2, ly + 9);
          }
        }
        ctx.restore();
      }
    }

    // playhead
    const px = this.frameToX(this.frame, g);
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.92)';
    ctx.lineWidth = 1.4;
    ctx.shadowColor = 'rgba(255,255,255,0.55)';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.moveTo(px, g.laneTop - 4);
    ctx.lineTo(px, g.markerTop + g.markerHeight - 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(px, g.laneTop - 4, 3.4, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.restore();

    // hover scrub time bubble
    if (this.scrubPointer !== null) {
      const hoverX = px;
      const label = `F${this.frame + 1} · ${formatClock(this.frame / this.opts.fps)}`;
      ctx.font = '600 10px "Segoe UI", "Microsoft YaHei", sans-serif';
      const tw = ctx.measureText(label).width + 12;
      const lx = clamp(hoverX - tw / 2, g.left, g.left + g.width - tw);
      const ly = g.laneTop - 24;
      ctx.fillStyle = 'rgba(9,14,22,0.95)';
      roundRect(ctx, lx, ly, tw, 17, 5);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.25)';
      ctx.stroke();
      ctx.fillStyle = '#e6edf7';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, lx + tw / 2, ly + 9);
    }

    // axis labels sit between the band and the marker lane
    ctx.save();
    ctx.font = '9.5px "Cascadia Mono", ui-monospace, monospace';
    ctx.fillStyle = 'rgba(120,140,165,0.7)';
    ctx.textBaseline = 'top';
    const labels = 6;
    for (let i = 0; i <= labels; i++) {
      const frac = i / labels;
      const f = Math.round(frac * total);
      const x = this.frameToX(f, g);
      const text = formatClock(f / this.opts.fps);
      ctx.textAlign = i === 0 ? 'left' : i === labels ? 'right' : 'center';
      ctx.fillText(text, clamp(x, g.left, g.left + g.width), g.bandTop + g.bandHeight + 5);
    }
    ctx.restore();
  }
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

export function segmentChips(exam: Exam, currentFrame: number): string {
  return exam.segments
    .map((seg) => {
      const meta = SEGMENT_META[seg.key];
      const active = currentFrame >= seg.startFrame && currentFrame < seg.endFrame;
      return `<button class="seg-chip ${active ? 'active' : ''}" data-seg="${seg.key}" style="--seg-tint:${meta.tint};--seg-border:${meta.border};--seg-text:${meta.text}">
        <span class="seg-dot"></span>${meta.name}
        <span class="seg-range mono">F${seg.startFrame + 1}–${seg.endFrame}</span>
      </button>`;
    })
    .join('');
}

export function segmentKeyAt(exam: Exam, frame: number): SegmentKey {
  for (const seg of exam.segments) {
    if (frame >= seg.startFrame && frame < seg.endFrame) return seg.key;
  }
  return exam.segments[exam.segments.length - 1]?.key ?? 'colon';
}
