// 标注画布：WebGL2 增强画布 + 绝对定位的 Canvas 2D 叠加层
// 支持绘制/编辑三类多边形（病变、抬举、切开线）与标定参考线，坐标全部归一化

import type { Calibration, EsdCase, Point, Polygon } from '../types';
import { hitEdge, hitVertex, uid } from '../utils/geometry';
import type { EnhanceRenderer } from '../webgl/EnhanceRenderer';

export type DrawKind = Polygon['kind'] | 'calibration' | null;

const KIND_STYLE: Record<Polygon['kind'], { stroke: string; fill: string; width: number; label: string }> = {
  lesion: { stroke: '#ff3b30', fill: 'rgba(255,59,48,0.14)', width: 2.5, label: '病变范围' },
  lifting: { stroke: '#34c759', fill: 'rgba(52,199,89,0.12)', width: 2, label: '抬举边界' },
  incision: { stroke: '#ffcc00', fill: 'rgba(255,204,0,0.10)', width: 2.5, label: '切开线' },
};

export interface AnnotationCanvasOptions {
  glCanvas: HTMLCanvasElement;
  overlay: HTMLCanvasElement;
  renderer: EnhanceRenderer;
  getCase: () => EsdCase | null;
  getCalibrationDraft: () => Calibration | null;
  /** 双击闭合提交新多边形（同类替换），由外层负责持久化 */
  onCommit: (poly: Polygon) => void;
  /** 顶点拖拽/边线插入等就地编辑，由外层负责持久化 */
  onEdit: (poly: Polygon) => void;
  onChange: () => void;
}

export class AnnotationCanvas {
  private opts: AnnotationCanvasOptions;
  private drawKind: DrawKind = null;
  private active: Polygon | null = null;
  private calDraft: { p1: Point | null; p2: Point | null } = { p1: null, p2: null };
  private dragVertex: { poly: Polygon; index: number } | null = null;
  private dpr = 1;
  private displayW = 0;
  private displayH = 0;

  constructor(opts: AnnotationCanvasOptions) {
    this.opts = opts;
    this.bind();
  }

  setDrawKind(kind: DrawKind): void {
    this.drawKind = kind;
    this.active = null;
    this.calDraft = { p1: null, p2: null };
    this.opts.overlay.style.cursor = kind ? 'crosshair' : 'default';
    this.redraw();
  }

  /** 适配 CSS 尺寸，处理 devicePixelRatio */
  resize(cssW: number, cssH: number): void {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.displayW = cssW;
    this.displayH = cssH;
    for (const cv of [this.opts.glCanvas, this.opts.overlay]) {
      cv.width = Math.round(cssW * this.dpr);
      cv.height = Math.round(cssH * this.dpr);
      cv.style.width = `${cssW}px`;
      cv.style.height = `${cssH}px`;
    }
    const ctx = this.opts.overlay.getContext('2d')!;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.opts.renderer.render();
    this.redraw();
  }

  private toNorm(e: MouseEvent): Point {
    const rect = this.opts.overlay.getBoundingClientRect();
    return {
      x: Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)),
      y: Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height)),
    };
  }

  private bind(): void {
    const ov = this.opts.overlay;
    ov.addEventListener('click', (e) => this.onClick(e));
    ov.addEventListener('mousedown', (e) => this.onMouseDown(e));
    ov.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('mouseup', () => {
      if (this.dragVertex) {
        this.opts.onEdit(this.dragVertex.poly);
        this.dragVertex = null;
      }
    });
    ov.addEventListener('dblclick', (e) => this.onDblClick(e));
    ov.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.setDrawKind(null);
    });
  }

  private existingPoly(kind: Polygon['kind']): Polygon | undefined {
    const c = this.opts.getCase();
    return c?.polygons.find((p) => p.kind === kind);
  }

  private onClick(e: MouseEvent): void {
    const p = this.toNorm(e);
    if (this.drawKind === 'calibration') {
      if (!this.calDraft.p1) {
        this.calDraft.p1 = p;
      } else {
        this.calDraft.p2 = p;
        this.opts.onChange();
      }
      this.redraw();
      return;
    }
    if (!this.drawKind) return;
    const kind = this.drawKind;
    if (!this.active) {
      // 同类已有多边形则继续编辑，否则新建
      const found = this.existingPoly(kind);
      if (found) this.active = found;
      else {
        this.active = { id: uid('poly'), kind, points: [], createdAt: 0, updatedAt: 0 };
      }
    }
    this.active.points.push(p);
    this.redraw();
  }

  private onMouseDown(e: MouseEvent): void {
    if (this.drawKind) return; // 绘制模式不拖拽
    const p = this.toNorm(e);
    const c = this.opts.getCase();
    if (!c) return;
    const threshold = 12 / this.opts.overlay.clientWidth;
    for (const poly of c.polygons) {
      const vi = hitVertex(poly, p, threshold);
      if (vi >= 0) {
        this.dragVertex = { poly, index: vi };
        return;
      }
    }
  }

  private onMouseMove(e: MouseEvent): void {
    const p = this.toNorm(e);
    if (this.dragVertex) {
      this.dragVertex.poly.points[this.dragVertex.index] = p;
      this.redraw();
      return;
    }
    if (!this.drawKind) {
      const c = this.opts.getCase();
      const threshold = 10 / this.opts.overlay.clientWidth;
      let hit = false;
      if (c) {
        for (const poly of c.polygons) {
          if (hitVertex(poly, p, threshold) >= 0 || hitEdge(poly, p, threshold) >= 0) {
            hit = true;
            break;
          }
        }
      }
      this.opts.overlay.style.cursor = hit ? 'move' : 'default';
    }
  }

  private onDblClick(e: MouseEvent): void {
    const p = this.toNorm(e);
    if (this.active && this.active.points.length >= 3) {
      void this.commitActive();
      return;
    }
    // 非绘制模式下双击边插入顶点
    if (!this.drawKind) {
      const c = this.opts.getCase();
      if (!c) return;
      const threshold = 10 / this.opts.overlay.clientWidth;
      for (const poly of c.polygons) {
        const at = hitEdge(poly, p, threshold);
        if (at >= 0) {
          poly.points.splice(at, 0, p);
          this.opts.onEdit(poly);
          this.redraw();
          return;
        }
      }
    }
  }

  /** 双击或切换工具时提交当前多边形 */
  async commitActive(): Promise<void> {
    if (!this.active || this.active.points.length < 3) {
      this.active = null;
      this.redraw();
      return;
    }
    const poly = this.active;
    this.active = null;
    this.drawKind = null;
    this.opts.overlay.style.cursor = 'default';
    this.opts.onCommit(poly);
    this.redraw();
  }

  getCalibrationPoints(): { p1: Point; p2: Point } | null {
    if (this.calDraft.p1 && this.calDraft.p2) return { p1: this.calDraft.p1, p2: this.calDraft.p2 };
    return null;
  }

  resetCalibrationDraft(): void {
    this.calDraft = { p1: null, p2: null };
    this.redraw();
  }

  redraw(): void {
    const ctx = this.opts.overlay.getContext('2d')!;
    const w = this.displayW;
    const h = this.displayH;
    ctx.clearRect(0, 0, w, h);
    const c = this.opts.getCase();

    if (c) {
      for (const poly of c.polygons) this.drawPolygon(ctx, poly, w, h);
    }
    // 正在绘制的多边形
    if (this.active) this.drawPolygon(ctx, this.active, w, h, true);

    // 标定线（草稿或已保存的当前标定）
    const cal = this.opts.getCalibrationDraft();
    if (this.drawKind === 'calibration') {
      if (this.calDraft.p1) {
        const p1 = this.toDisplay(this.calDraft.p1, w, h);
        ctx.strokeStyle = '#0a84ff';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        const mouse = this.calDraft.p2 ? this.toDisplay(this.calDraft.p2, w, h) : p1;
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
        ctx.setLineDash([]);
        this.drawHandle(ctx, p1.x, p1.y, '#0a84ff');
      }
    } else if (cal) {
      const a = this.toDisplay(cal.p1, w, h);
      const b = this.toDisplay(cal.p2, w, h);
      ctx.strokeStyle = '#0a84ff';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      ctx.setLineDash([]);
      this.drawHandle(ctx, a.x, a.y, '#0a84ff');
      this.drawHandle(ctx, b.x, b.y, '#0a84ff');
      ctx.fillStyle = '#0a84ff';
      ctx.font = '12px system-ui';
      ctx.fillText(`标定 ${cal.knownLengthMm} mm`, (a.x + b.x) / 2 + 6, (a.y + b.y) / 2 - 6);
    }
  }

  private drawPolygon(ctx: CanvasRenderingContext2D, poly: Polygon, w: number, h: number, draft = false): void {
    if (poly.points.length === 0) return;
    const style = KIND_STYLE[poly.kind];
    ctx.beginPath();
    poly.points.forEach((pt, i) => {
      const d = this.toDisplay(pt, w, h);
      if (i === 0) ctx.moveTo(d.x, d.y);
      else ctx.lineTo(d.x, d.y);
    });
    if (poly.points.length >= 3) ctx.closePath();
    ctx.fillStyle = style.fill;
    ctx.fill();
    ctx.strokeStyle = style.stroke;
    ctx.lineWidth = style.width;
    ctx.setLineDash(draft ? [5, 4] : []);
    ctx.stroke();
    ctx.setLineDash([]);
    // 顶点
    for (const pt of poly.points) {
      const d = this.toDisplay(pt, w, h);
      this.drawHandle(ctx, d.x, d.y, style.stroke);
    }
    // 标签
    const first = this.toDisplay(poly.points[0], w, h);
    ctx.fillStyle = style.stroke;
    ctx.font = 'bold 12px system-ui';
    ctx.fillText(style.label, first.x + 6, first.y - 6);
  }

  private drawHandle(ctx: CanvasRenderingContext2D, x: number, y: number, color: string): void {
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  private toDisplay(p: Point, w: number, h: number): { x: number; y: number } {
    return { x: p.x * w, y: p.y * h };
  }
}

export { KIND_STYLE };
