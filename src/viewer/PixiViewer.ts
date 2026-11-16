import {
  Application,
  CanvasSource,
  Container,
  Graphics,
  Rectangle,
  Sprite,
  Text,
  Texture,
  type FederatedPointerEvent,
  type TextStyleOptions,
} from 'pixi.js';
import { DEFECT_META } from '../lib/defects';
import type { Annotation, DefectRecord, Rect } from '../types';
import { renderBoardImage } from '../lib/boardImage';
import type { ImageVersion } from '../types';

export type ViewerMode = 'select' | 'draw' | 'pan';

export interface ViewerData {
  version: ImageVersion;
  machineDefects: DefectRecord[];
  annotations: Annotation[];
  readOnly: boolean;
}

interface ViewerCallbacks {
  onSelect: (id: string | null) => void;
  onHoverMachine: (d: DefectRecord | null, sx: number, sy: number) => void;
  onDraftChange: (rect: Rect | null) => void;
  onViewportChange: (zoom: number) => void;
}

const textureCache = new Map<string, Texture>();

export function getBoardTexture(version: ImageVersion, boardNo: string, batchCode: string): Texture {
  const key = `${version.id}:${version.renderSeed}`;
  const hit = textureCache.get(key);
  if (hit) return hit;
  const canvas = renderBoardImage({
    layoutSeed: version.layoutSeed,
    renderSeed: version.renderSeed,
    exposure: version.exposure,
    defects: version.defects.filter((d) => d.actual).map((d) => ({
      id: d.id,
      type: d.actual,
      compIdx: d.compIdx,
      padIdx: d.padIdx,
      x: d.x,
      y: d.y,
      w: d.w,
      h: d.h,
    })),
    boardNo,
    batchCode,
    versionLabel: version.label,
    width: version.width,
    height: version.height,
  });
  const source = new CanvasSource({ resource: canvas, resolution: 1 });
  const tex = new Texture({ source });
  textureCache.set(key, tex);
  if (textureCache.size > 12) {
    const firstKey = textureCache.keys().next().value;
    if (firstKey) {
      textureCache.get(firstKey)?.destroy(true);
      textureCache.delete(firstKey);
    }
  }
  return tex;
}

function drawDashedRect(
  g: Graphics,
  x: number,
  y: number,
  w: number,
  h: number,
  dash: number,
  gap: number,
) {
  const seg = (x1: number, y1: number, x2: number, y2: number) => {
    const len = Math.hypot(x2 - x1, y2 - y1);
    const ux = (x2 - x1) / len;
    const uy = (y2 - y1) / len;
    let t = 0;
    while (t < len) {
      const e = Math.min(len, t + dash);
      g.moveTo(x1 + ux * t, y1 + uy * t);
      g.lineTo(x1 + ux * e, y1 + uy * e);
      t = e + gap;
    }
  };
  seg(x, y, x + w, y);
  seg(x + w, y, x + w, y + h);
  seg(x + w, y + h, x, y + h);
  seg(x, y + h, x, y);
}

function labelStyle(fill: string): TextStyleOptions {
  return ({
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
    fontSize: 11,
    fontWeight: '600',
    fill,
    letterSpacing: 0.4,
  });
}

export class PixiViewer {
  app = new Application();
  private host: HTMLElement;
  private cb: ViewerCallbacks;
  private world = new Container();
  private imageLayer = new Container();
  private machineLayer = new Graphics();
  private annLayer = new Container();
  private overlay = new Graphics();
  private draft = new Graphics();
  private sprite: Sprite | null = null;
  private labels = new Map<string, Container>();
  private selectedId: string | null = null;
  private hoveredMachine: string | null = null;
  private data: ViewerData | null = null;
  private mode: ViewerMode = 'select';
  private showMachine = true;
  private zoom = 1;
  private inited = false;
  private drag: { kind: 'pan' | 'draw'; sx: number; sy: number; ox: number; oy: number } | null = null;
  private spaceDown = false;
  private ro: ResizeObserver | null = null;
  private destroyed = false;
  private anim: number | null = null;
  private boardInfo = { boardNo: '', batchCode: '' };

  constructor(host: HTMLElement, cb: ViewerCallbacks) {
    this.host = host;
    this.cb = cb;
  }

  async init() {
    await this.app.init({
      background: '#070b0a',
      antialias: true,
      resolution: Math.min(2, window.devicePixelRatio || 1),
      autoDensity: true,
      width: Math.max(320, this.host.clientWidth),
      height: Math.max(240, this.host.clientHeight),
      preference: 'webgl',
    });
    if (this.destroyed) {
      this.app.destroy(true);
      return;
    }
    const canvas = this.app.canvas;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.touchAction = 'none';
    this.host.appendChild(canvas);
    this.world.addChild(this.imageLayer, this.machineLayer, this.annLayer, this.overlay, this.draft);
    this.app.stage.addChild(this.world);
    this.app.stage.eventMode = 'static';
    this.app.stage.hitArea = new Rectangle(0, 0, 10, 10);
    this.resizeStage();
    this.attach();
    this.ro = new ResizeObserver(() => this.resizeStage());
    this.ro.observe(this.host);
    this.inited = true;
    if (this.data) this.build();
  }

  private resizeStage() {
    if (!this.inited) return;
    const w = Math.max(320, this.host.clientWidth);
    const h = Math.max(240, this.host.clientHeight);
    this.app.renderer.resize(w, h);
    (this.app.stage.hitArea as Rectangle).width = w;
    (this.app.stage.hitArea as Rectangle).height = h;
  }

  private attach() {
    const stage = this.app.stage;
    stage.on('pointerdown', this.onPointerDown);
    stage.on('pointermove', this.onPointerMove);
    stage.on('pointerup', this.onPointerUp);
    stage.on('pointerupoutside', this.onPointerUp);
    stage.on('pointerleave', () => {
      this.hoveredMachine = null;
      this.cb.onHoverMachine(null, 0, 0);
      this.drawMachine();
    });
    stage.on('pointertap', this.onClick);
    stage.on('wheel', this.onWheel);
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    stage.cursor = 'default';
  }

  private onKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Space' && !this.spaceDown) {
      this.spaceDown = true;
      this.updateCursor();
    }
  };
  private onKeyUp = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      this.spaceDown = false;
      this.updateCursor();
    }
  };

  private updateCursor() {
    if (!this.inited) return;
    const panning = this.mode === 'pan' || this.spaceDown;
    this.app.stage.cursor = panning ? 'grab' : this.mode === 'draw' ? 'crosshair' : 'default';
  }

  setBoardInfo(boardNo: string, batchCode: string) {
    this.boardInfo = { boardNo, batchCode };
  }

  setData(d: ViewerData) {
    const first = !this.data || this.data.version.id !== d.version.id;
    const prevVersion = this.data?.version.id;
    this.data = d;
    if (!this.inited) return;
    if (first) {
      this.build();
      if (!prevVersion) this.fit(0.93);
      else this.fit(0.93, true);
    } else {
      this.build();
    }
  }

  private build() {
    if (!this.data) return;
    const v = this.data.version;
    if (this.sprite) {
      this.imageLayer.removeChild(this.sprite);
      this.sprite.destroy();
      this.sprite = null;
    }
    const tex = getBoardTexture(v, this.boardInfo.boardNo, this.boardInfo.batchCode);
    const sp = new Sprite(tex);
    sp.width = v.width;
    sp.height = v.height;
    this.imageLayer.addChild(sp);
    this.sprite = sp;
    this.drawMachine();
    this.drawAnnotations();
    this.applyTransform();
  }

  setMode(mode: ViewerMode) {
    this.mode = mode;
    this.updateCursor();
    if (mode !== 'draw') {
      this.draft.clear();
      this.cb.onDraftChange(null);
    }
  }

  clearDraft() {
    this.draft.clear();
  }

  setShowMachine(v: boolean) {
    this.showMachine = v;
    this.drawMachine();
  }

  setSelected(id: string | null) {
    if (this.selectedId === id) return;
    this.selectedId = id;
    this.drawAnnotations();
  }

  getScale() {
    return this.zoom;
  }

  private viewport() {
    return { w: this.app.screen.width, h: this.app.screen.height };
  }

  fit(padding = 0.94, animate = false) {
    if (!this.data || !this.inited) return;
    const { w, h } = this.viewport();
    const vw = this.data.version.width;
    const vh = this.data.version.height;
    const s = Math.min(w / vw, h / vh) * padding;
    const x = (w - vw * s) / 2;
    const y = (h - vh * s) / 2;
    if (animate) this.animateTo(s, x, y);
    else this.setTransform(s, x, y);
  }

  actualSize() {
    if (!this.data) return;
    const { w, h } = this.viewport();
    const s = 1;
    this.animateTo(s, (w - this.data.version.width * s) / 2, (h - this.data.version.height * s) / 2);
  }

  zoomBy(factor: number) {
    const { w, h } = this.viewport();
    const s = Math.max(0.06, Math.min(6, this.zoom * factor));
    const cx = w / 2;
    const cy = h / 2;
    const wx = (cx - this.world.x) / this.zoom;
    const wy = (cy - this.world.y) / this.zoom;
    this.animateTo(s, cx - wx * s, cy - wy * s, 180);
  }

  zoomToRect(rect: Rect, pad = 0.35) {
    if (!this.inited) return;
    const { w, h } = this.viewport();
    const rw = Math.max(rect.w, 24);
    const rh = Math.max(rect.h, 24);
    const s = Math.max(0.4, Math.min(2.0, Math.min(w / (rw * (1 + pad)), h / (rh * (1 + pad)))));
    const cx = rect.x + rect.w / 2;
    const cy = rect.y + rect.h / 2;
    this.animateTo(s, w / 2 - cx * s, h / 2 - cy * s);
  }

  private animating = false;

  private animateTo(scale: number, x: number, y: number, ms = 260) {
    if (this.anim) cancelAnimationFrame(this.anim);
    this.animating = true;
    const start = { s: this.zoom, x: this.world.x, y: this.world.y };
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      const e = 1 - Math.pow(1 - p, 3);
      this.setTransform(
        start.s + (scale - start.s) * e,
        start.x + (x - start.x) * e,
        start.y + (y - start.y) * e,
      );
      if (p < 1) this.anim = requestAnimationFrame(tick);
      else {
        this.anim = null;
        this.animating = false;
        this.drawAnnotations();
      }
    };
    this.anim = requestAnimationFrame(tick);
  }

  private pendingRedraw = false;

  private setTransform(s: number, x: number, y: number) {
    const zoomChanged = Math.abs(s - this.zoom) > 1e-4;
    this.zoom = s;
    this.world.position.set(x, y);
    this.world.scale.set(s);
    this.refreshOverlayScale();
    if (zoomChanged && !this.animating && !this.pendingRedraw) {
      this.pendingRedraw = true;
      requestAnimationFrame(() => {
        this.pendingRedraw = false;
        this.drawAnnotations();
      });
    }
    this.cb.onViewportChange(s);
  }

  private applyTransform() {
    this.setTransform(this.zoom, this.world.x, this.world.y);
  }

  private refreshOverlayScale() {
    const inv = 1 / this.zoom;
    for (const c of this.labels.values()) c.scale.set(inv);
    this.drawMachine();
  }

  worldToScreen(x: number, y: number) {
    return { x: x * this.zoom + this.world.x, y: y * this.zoom + this.world.y };
  }

  screenToWorld(x: number, y: number) {
    return { x: (x - this.world.x) / this.zoom, y: (y - this.world.y) / this.zoom };
  }

  private onWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (this.anim) {
      cancelAnimationFrame(this.anim);
      this.anim = null;
    }
    const rect = this.app.canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const factor = Math.exp(-e.deltaY * 0.0018);
    const s = Math.max(0.06, Math.min(6, this.zoom * factor));
    const wx = (px - this.world.x) / this.zoom;
    const wy = (py - this.world.y) / this.zoom;
    this.setTransform(s, px - wx * s, py - wy * s);
  };

  private hitAnnotation(wx: number, wy: number): Annotation | null {
    if (!this.data) return null;
    const list = this.data.annotations;
    for (let i = list.length - 1; i >= 0; i--) {
      const a = list[i];
      if (wx >= a.x && wx <= a.x + a.w && wy >= a.y && wy <= a.y + a.h) return a;
    }
    return null;
  }

  private hitMachine(wx: number, wy: number): DefectRecord | null {
    if (!this.data || !this.showMachine) return null;
    for (const d of this.data.machineDefects) {
      if (wx >= d.x && wx <= d.x + d.w && wy >= d.y && wy <= d.y + d.h) return d;
    }
    return null;
  }

  private onPointerDown = (e: FederatedPointerEvent) => {
    if (!this.inited) return;
    const pan = this.mode === 'pan' || this.spaceDown || e.button === 1 || e.button === 2;
    const gp = e.global;
    if (pan) {
      this.drag = { kind: 'pan', sx: gp.x, sy: gp.y, ox: this.world.x, oy: this.world.y };
      if (this.inited) this.app.stage.cursor = 'grabbing';
    } else if (this.mode === 'draw' && e.button === 0 && !this.data?.readOnly) {
      const w = this.screenToWorld(gp.x, gp.y);
      this.drag = { kind: 'draw', sx: w.x, sy: w.y, ox: w.x, oy: w.y };
      this.draft.clear();
    }
  };

  private onPointerMove = (e: FederatedPointerEvent) => {
    if (!this.inited) return;
    const gp = e.global;
    if (this.drag?.kind === 'pan') {
      this.setTransform(
        this.zoom,
        this.drag.ox + (gp.x - this.drag.sx),
        this.drag.oy + (gp.y - this.drag.sy),
      );
      return;
    }
    if (this.drag?.kind === 'draw') {
      const w = this.screenToWorld(gp.x, gp.y);
      const r = {
        x: Math.min(this.drag.sx, w.x),
        y: Math.min(this.drag.sy, w.y),
        w: Math.abs(w.x - this.drag.sx),
        h: Math.abs(w.y - this.drag.sy),
      };
      this.drawDraft(r);
      this.cb.onDraftChange(r);
      return;
    }
    const w = this.screenToWorld(gp.x, gp.y);
    const m = this.hitMachine(w.x, w.y);
    if ((m?.id ?? null) !== this.hoveredMachine) {
      this.hoveredMachine = m?.id ?? null;
      this.drawMachine();
    }
    const rect = this.app.canvas.getBoundingClientRect();
    this.cb.onHoverMachine(m, gp.x + rect.left, gp.y + rect.top);
    if (this.mode === 'select' && !this.spaceDown) {
      const a = this.hitAnnotation(w.x, w.y);
      this.app.stage.cursor = a ? 'pointer' : 'default';
    }
  };

  private onPointerUp = (e: FederatedPointerEvent) => {
    if (!this.drag) return;
    if (this.drag.kind === 'draw') {
      const gp = e.global;
      const w = this.screenToWorld(gp.x, gp.y);
      const r = {
        x: Math.min(this.drag.sx, w.x),
        y: Math.min(this.drag.sy, w.y),
        w: Math.abs(w.x - this.drag.sx),
        h: Math.abs(w.y - this.drag.sy),
      };
      this.drag = null;
      if (r.w >= 6 && r.h >= 6) {
        this.draft.clear();
        this.cb.onDraftChange(r);
      } else {
        this.draft.clear();
        this.cb.onDraftChange(null);
      }
    } else {
      this.drag = null;
      this.updateCursor();
    }
  };

  private onClick = (e: FederatedPointerEvent) => {
    if (this.mode !== 'select' || this.spaceDown) return;
    const gp = e.global;
    const w = this.screenToWorld(gp.x, gp.y);
    const a = this.hitAnnotation(w.x, w.y);
    this.cb.onSelect(a ? a.id : null);
  };

  private drawDraft(r: Rect) {
    this.draft.clear();
    this.draft
      .rect(r.x, r.y, r.w, r.h)
      .fill({ color: 0x3ddc97, alpha: 0.1 })
      .stroke({ width: 2 / this.zoom, color: 0x3ddc97, alpha: 0.95 });
    const c = 10 / this.zoom;
    this.draft.moveTo(r.x, r.y + c).lineTo(r.x, r.y).lineTo(r.x + c, r.y);
    this.draft.moveTo(r.x + r.w - c, r.y).lineTo(r.x + r.w, r.y).lineTo(r.x + r.w, r.y + c);
    this.draft
      .moveTo(r.x + r.w, r.y + r.h - c)
      .lineTo(r.x + r.w, r.y + r.h)
      .lineTo(r.x + r.w - c, r.y + r.h);
    this.draft.moveTo(r.x + c, r.y + r.h).lineTo(r.x, r.y + r.h).lineTo(r.x, r.y + r.h - c);
    this.draft.stroke({ width: 2 / this.zoom, color: 0x3ddc97, alpha: 0.95 });
  }

  private drawMachine() {
    const g = this.machineLayer;
    g.clear();
    if (!this.data || !this.showMachine) return;
    const z = this.zoom;
    const inv = 1 / z;
    for (const d of this.data.machineDefects) {
      const hovered = d.id === this.hoveredMachine;
      const color = 0xffc857;
      g.rect(d.x, d.y, d.w, d.h).fill({ color: 0xffc857, alpha: hovered ? 0.1 : 0.045 });
      drawDashedRect(g, d.x, d.y, d.w, d.h, 7 * inv, 4 * inv);
      g.stroke({
        width: (hovered ? 2.2 : 1.7) * inv,
        color: hovered ? 0xfff2c4 : color,
        alpha: hovered ? 1 : 0.9,
      });
      const t = 5 * inv;
      g.moveTo(d.x, d.y).lineTo(d.x + t, d.y).moveTo(d.x, d.y).lineTo(d.x, d.y + t);
      g.moveTo(d.x + d.w - t, d.y).lineTo(d.x + d.w, d.y).moveTo(d.x + d.w, d.y).lineTo(d.x + d.w, d.y + t);
      g.moveTo(d.x, d.y + d.h - t).lineTo(d.x, d.y + d.h).moveTo(d.x, d.y + d.h).lineTo(d.x + t, d.y + d.h);
      g.moveTo(d.x + d.w - t, d.y + d.h).lineTo(d.x + d.w, d.y + d.h).moveTo(d.x + d.w, d.y + d.h - t).lineTo(d.x + d.w, d.y + d.h);
      g.stroke({ width: 1.6 * inv, color: hovered ? 0xfff2c4 : color, alpha: hovered ? 1 : 0.75 });
    }
  }

  private drawAnnotations() {
    this.annLayer.removeChildren().forEach((c) => c.destroy({ children: true }));
    this.labels.clear();
    this.overlay.clear();
    if (!this.data) return;
    const inv = 1 / Math.max(this.zoom, 0.0001);
    const sorted = [...this.data.annotations];
    sorted.forEach((a, i) => {
      const meta = DEFECT_META[a.type];
      const selected = a.id === this.selectedId;
      const voided = a.status === 'void';
      const g = new Graphics();
      const color = Number.parseInt(meta.color.slice(1), 16);
      if (voided) {
        g.rect(a.x, a.y, a.w, a.h).fill({ color: 0x8b9793, alpha: 0.06 });
        drawDashedRect(g, a.x, a.y, a.w, a.h, 8 * inv, 5 * inv);
        g.stroke({ width: 1.2 * inv, color: 0x8b9793, alpha: 0.65 });
      } else {
        g.rect(a.x, a.y, a.w, a.h).fill({ color, alpha: selected ? 0.2 : 0.11 });
        g.rect(a.x, a.y, a.w, a.h).stroke({ width: (selected ? 3 : 2) * inv, color, alpha: 1 });
        if (selected) {
          g.rect(a.x - 2 * inv, a.y - 2 * inv, a.w + 4 * inv, a.h + 4 * inv).stroke({
            width: 1.4 * inv,
            color: 0xffffff,
            alpha: 0.85,
          });
          const hs = 3.4 * inv;
          for (const [hx, hy] of [
            [a.x, a.y],
            [a.x + a.w, a.y],
            [a.x, a.y + a.h],
            [a.x + a.w, a.y + a.h],
          ]) {
            g.rect(hx - hs, hy - hs, hs * 2, hs * 2).fill({ color: 0xffffff, alpha: 1 });
          }
        }
      }
      this.annLayer.addChild(g);

      const label = new Container();
      const bg = new Graphics();
      const num = String(i + 1);
      const txt = new Text({
        text: `${voided ? '作废 ' : ''}${meta.label} ${num}`,
        style: labelStyle(voided ? '#c9d2ce' : '#0a1410'),
        resolution: 2,
      });
      const padX = 5;
      const w = txt.width + padX * 2;
      const h = 16;
      bg.roundRect(0, 0, w, h, 3).fill({ color: voided ? 0x4a5551 : color, alpha: voided ? 0.6 : 0.95 });
      if (selected) bg.roundRect(-1.5, -1.5, w + 3, h + 3, 4).stroke({ width: 1.5, color: 0xffffff, alpha: 0.9 });
      label.addChild(bg, txt);
      txt.position.set(padX, 2);
      label.position.set(a.x, Math.max(2, a.y - h - 3 * inv));
      label.scale.set(inv);
      this.annLayer.addChild(label);
      this.labels.set(a.id, label);
    });
  }

  async destroy() {
    this.destroyed = true;
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    this.ro?.disconnect();
    if (this.anim) cancelAnimationFrame(this.anim);
    if (this.inited) {
      this.inited = false;
      try {
        this.app.destroy(true, { children: true });
      } catch {
        /* noop */
      }
    }
  }
}
