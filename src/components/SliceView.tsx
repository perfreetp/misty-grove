import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { Contour, Landmark, Vec3, Volume } from '../lib/types';
import { CineFrame, frameToWorld, worldToFrame } from '../lib/planes';
import { VolumeRenderer } from '../render/volumeView';
import { axialQuad } from '../render/volumeView';

export interface SliceOverlay {
  contours: { contour: Contour; color: string; label?: string; dashed?: boolean }[];
  landmarks: { landmark: Landmark; color: string; label: string }[];
  ringPath3d?: { points: Vec3[]; color: string; width?: number };
  crosshair?: Vec3;
  /** extra arbitrary polyline in world space */
  polylines?: { points: Vec3[]; color: string; width?: number; closed?: boolean }[];
  /** ruler between two world points */
  rulers?: { a: Vec3; b: Vec3; color: string; label: string }[];
  /** highlighted sector wedges in the en-face plane, in degrees from basisU */
  wedges?: { startDeg: number; endDeg: number; color: string; opacity?: number }[];
  texts?: { at: Vec3; text: string; color: string }[];
}

export interface SliceViewProps {
  volume: Volume;
  frame: CineFrame;
  overlay: SliceOverlay;
  lutMode: 0 | 1 | 2;
  windowCenter: number;
  windowWidth: number;
  invert?: boolean;
  label: string;
  subtitle?: string;
  zoom: number;
  pan: { x: number; y: number };
  onPointerWorld?: (p: Vec3, frame: CineFrame, phase: 'down' | 'move' | 'up' | 'leave') => void;
  onWheelZoom?: (delta: number) => void;
  active: boolean;
  onActivate?: () => void;
  pixelCrosshair?: { x: number; y: number };
  children?: React.ReactNode;
  minHeight?: number;
}

/**
 * One cine pane. The image comes from the WebGPU volume plane renderer; the
 * annotations are drawn on a transparent 2D overlay on top.
 */
export function SliceView({
  volume,
  frame,
  overlay,
  lutMode,
  windowCenter,
  windowWidth,
  invert,
  label,
  subtitle,
  zoom,
  pan,
  onPointerWorld,
  onWheelZoom,
  active,
  onActivate,
  pixelCrosshair,
  children,
  minHeight = 220,
}: SliceViewProps) {
  const holderRef = useRef<HTMLDivElement>(null);
  const gpuRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<VolumeRenderer | null>(null);
  const [gpuError, setGpuError] = useState<string | null>(null);
  const [size, setSize] = useState({ w: 300, h: 300 });

  // GPU plane renderer
  useEffect(() => {
    let disposed = false;
    const canvas = gpuRef.current;
    if (!canvas) return;
    const r = new VolumeRenderer();
    rendererRef.current = r;
    r.init(canvas)
      .then(() => r.setVolume(volume))
      .catch((e) => setGpuError(e instanceof Error ? e.message : String(e)));
    return () => {
      disposed = true;
      void disposed;
      r.dispose();
      rendererRef.current = null;
    };
  }, [volume]);

  // keep plane params in sync
  useEffect(() => {
    const r = rendererRef.current;
    if (!r) return;
    const du: Vec3 = [frame.du[0] * frame.cols, frame.du[1] * frame.cols, frame.du[2] * frame.cols];
    const dv: Vec3 = [frame.dv[0] * frame.rows, frame.dv[1] * frame.rows, frame.dv[2] * frame.rows];
    r.setParams({
      origin: frame.origin,
      du,
      dv,
      windowCenter,
      windowWidth,
      lutMode,
      invert,
      opacity: 1,
    });
  }, [frame, windowCenter, windowWidth, lutMode, invert]);

  // size observer
  useEffect(() => {
    const el = holderRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setSize({ w: el.clientWidth, h: el.clientHeight });
    });
    ro.observe(el);
    setSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  // image layout inside the pane
  const layout = useMemo(() => {
    const aspect = frame.cols / frame.rows;
    const paneAspect = size.w / Math.max(1, size.h);
    let w: number;
    let h: number;
    if (paneAspect > aspect) {
      h = size.h;
      w = h * aspect;
    } else {
      w = size.w;
      h = w / aspect;
    }
    w *= zoom;
    h *= zoom;
    const ox = (size.w - w) / 2 + pan.x;
    const oy = (size.h - h) / 2 + pan.y;
    return { w, h, ox, oy, scaleX: w / frame.cols, scaleY: h / frame.rows };
  }, [size, frame.cols, frame.rows, zoom, pan]);

  const toScreen = (p: Vec3) => {
    const f = worldToFrame(p, frame);
    return { x: layout.ox + f.x * layout.scaleX, y: layout.oy + f.y * layout.scaleY };
  };

  const toWorld = (sx: number, sy: number): Vec3 => {
    const fx = (sx - layout.ox) / layout.scaleX;
    const fy = (sy - layout.oy) / layout.scaleY;
    return frameToWorld(frame, fx, fy);
  };

  // overlay drawing
  useEffect(() => {
    const canvas = overlayRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(2, Math.floor(size.w * dpr));
    canvas.height = Math.max(2, Math.floor(size.h * dpr));
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size.w, size.h);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    const frameClip = () => {
      ctx.save();
      ctx.beginPath();
      ctx.rect(layout.ox, layout.oy, layout.w, layout.h);
      ctx.clip();
    };

    frameClip();
    // image border
    ctx.strokeStyle = 'rgba(78,164,216,0.26)';
    ctx.lineWidth = 1;
    ctx.strokeRect(layout.ox + 0.5, layout.oy + 0.5, layout.w - 1, layout.h - 1);

    if (overlay.wedges?.length) {
      const cx = layout.ox + layout.w / 2;
      const cy = layout.oy + layout.h / 2;
      const rad = Math.min(layout.w, layout.h) * 0.5;
      for (const w of overlay.wedges) {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, rad, (w.startDeg * Math.PI) / 180, (w.endDeg * Math.PI) / 180);
        ctx.closePath();
        ctx.fillStyle = w.color;
        ctx.globalAlpha = w.opacity ?? 0.28;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    for (const poly of overlay.polylines ?? []) {
      if (poly.points.length < 2) continue;
      ctx.beginPath();
      poly.points.forEach((p, i) => {
        const s = toScreen(p);
        if (i === 0) ctx.moveTo(s.x, s.y);
        else ctx.lineTo(s.x, s.y);
      });
      if (poly.closed) ctx.closePath();
      ctx.strokeStyle = poly.color;
      ctx.lineWidth = poly.width ?? 1.6;
      ctx.stroke();
    }

    if (overlay.ringPath3d) {
      const pts = overlay.ringPath3d.points;
      if (pts.length > 2) {
        ctx.beginPath();
        pts.forEach((p, i) => {
          const s = toScreen(p);
          if (i === 0) ctx.moveTo(s.x, s.y);
          else ctx.lineTo(s.x, s.y);
        });
        ctx.closePath();
        ctx.strokeStyle = overlay.ringPath3d.color;
        ctx.lineWidth = overlay.ringPath3d.width ?? 1.8;
        ctx.setLineDash([5, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    for (const item of overlay.contours) {
      const pts = item.contour.points;
      if (pts.length < 2) continue;
      ctx.beginPath();
      pts.forEach((p, i) => {
        const s = toScreen(frameToWorld(frame, p.x, p.y));
        if (i === 0) ctx.moveTo(s.x, s.y);
        else ctx.lineTo(s.x, s.y);
      });
      if (pts.length > 2) ctx.closePath();
      if (item.dashed) ctx.setLineDash([5, 4]);
      ctx.strokeStyle = item.color;
      ctx.lineWidth = 1.9;
      ctx.stroke();
      ctx.setLineDash([]);
      // vertex dots
      if (pts.length <= 40) {
        ctx.fillStyle = item.color;
        for (const p of pts) {
          const s = toScreen(frameToWorld(frame, p.x, p.y));
          ctx.beginPath();
          ctx.arc(s.x, s.y, 1.7, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (item.label) {
        const p0 = pts[0];
        const s = toScreen(frameToWorld(frame, p0.x, p0.y));
        drawTag(ctx, s.x + 6, s.y - 14, item.label, item.color);
      }
    }

    for (const item of overlay.landmarks) {
      const s = toScreen(item.landmark.a);
      ctx.fillStyle = item.color;
      ctx.strokeStyle = 'rgba(6,10,15,0.85)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(s.x, s.y, 3.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      if (item.landmark.b) {
        const e = toScreen(item.landmark.b);
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(e.x, e.y);
        ctx.strokeStyle = item.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(e.x, e.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
      drawTag(ctx, s.x + 7, s.y + 4, item.label, item.color);
    }

    for (const r of overlay.rulers ?? []) {
      const a = toScreen(r.a);
      const b = toScreen(r.b);
      ctx.strokeStyle = r.color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      for (const p of [a, b]) {
        ctx.beginPath();
        ctx.moveTo(p.x - 4, p.y);
        ctx.lineTo(p.x + 4, p.y);
        ctx.moveTo(p.x, p.y - 4);
        ctx.lineTo(p.x, p.y + 4);
        ctx.stroke();
      }
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      drawTag(ctx, mx + 4, my - 6, r.label, r.color);
    }

    for (const t of overlay.texts ?? []) {
      const s = toScreen(t.at);
      drawTag(ctx, s.x, s.y, t.text, t.color);
    }

    if (overlay.crosshair) {
      const s = toScreen(overlay.crosshair);
      ctx.strokeStyle = 'rgba(140,200,233,0.55)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(s.x - 12, s.y);
      ctx.lineTo(s.x + 12, s.y);
      ctx.moveTo(s.x, s.y - 12);
      ctx.lineTo(s.x, s.y + 12);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.restore();

    // scale bar bottom-left
    const targetPx = 68;
    const mmPerPx = frame.du[0] ? Math.hypot(frame.du[0], frame.du[1], frame.du[2]) : 0.7;
    const worldPerScreenPx = 1 / (layout.scaleX || 1);
    const mmPerScreenPx = worldPerScreenPx * mmPerPx;
    const candidates = [5, 10, 20, 50];
    const barMm = candidates.reduce((best, c) => (Math.abs(c / mmPerScreenPx - targetPx) < Math.abs(best / mmPerScreenPx - targetPx) ? c : best), 10);
    const barPx = barMm / mmPerScreenPx;
    const bx = layout.ox + 10;
    const by = layout.oy + layout.h - 12;
    ctx.strokeStyle = 'rgba(219,229,239,0.85)';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(bx, by - 4);
    ctx.lineTo(bx, by);
    ctx.lineTo(bx + barPx, by);
    ctx.lineTo(bx + barPx, by - 4);
    ctx.stroke();
    ctx.fillStyle = 'rgba(219,229,239,0.85)';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText(`${barMm} mm`, bx + barPx + 5, by + 1);
  }, [overlay, layout, size, frame]);

  const handlePointer = (phase: 'down' | 'move' | 'up' | 'leave') => (e: React.PointerEvent) => {
    if (!onPointerWorld) return;
    if (phase === 'down') {
      onActivate?.();
      (e.target as Element).setPointerCapture?.(e.pointerId);
    }
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;
    const p = toWorld(sx, sy);
    onPointerWorld(p, frame, phase);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!onWheelZoom) return;
    e.preventDefault();
    onWheelZoom(e.deltaY);
  };

  const cross = pixelCrosshair
    ? {
        x: layout.ox + pixelCrosshair.x * layout.scaleX,
        y: layout.oy + pixelCrosshair.y * layout.scaleY,
      }
    : null;

  return (
    <div
      ref={holderRef}
      className="pane"
      onPointerDown={handlePointer('down')}
      onPointerMove={handlePointer('move')}
      onPointerUp={handlePointer('up')}
      onPointerLeave={handlePointer('leave')}
      onWheel={handleWheel}
      onContextMenu={(e) => e.preventDefault()}
      style={{
        position: 'relative',
        flex: 1,
        minHeight,
        background: '#080b11',
        borderRadius: 8,
        overflow: 'hidden',
        border: active ? '1px solid rgba(78,164,216,0.6)' : '1px solid var(--line)',
        cursor: 'crosshair',
        touchAction: 'none',
      }}
    >
      <canvas
        ref={gpuRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          imageRendering: zoom > 2.4 ? 'pixelated' : 'auto',
        }}
      />
      <canvas
        ref={overlayRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      />
      {cross ? (
        <div
          style={{
            position: 'absolute',
            left: cross.x,
            top: cross.y,
            width: 1,
            height: 14,
            background: 'rgba(78,164,216,0.9)',
            transform: 'translate(-0.5px, -14px)',
            pointerEvents: 'none',
          }}
        />
      ) : null}
      <div style={{ position: 'absolute', top: 6, left: 8, pointerEvents: 'none' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#a9c4da', letterSpacing: '0.04em' }}>{label}</div>
        {subtitle ? <div className="mono" style={{ fontSize: 10, color: 'var(--text-3)' }}>{subtitle}</div> : null}
      </div>
      {gpuError ? (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', padding: 16, textAlign: 'center' }}>
          <div className="banner banner-danger" style={{ maxWidth: 260 }}>{gpuError}</div>
        </div>
      ) : null}
      {children}
    </div>
  );
}

function drawTag(ctx: CanvasRenderingContext2D, x: number, y: number, text: string, color: string) {
  ctx.font = '600 10px "Inter","PingFang SC",sans-serif';
  const w = ctx.measureText(text).width + 8;
  ctx.fillStyle = 'rgba(6,10,16,0.82)';
  roundRect(ctx, x, y - 10, w, 14, 3);
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.8;
  roundRect(ctx, x, y - 10, w, 14, 3);
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.fillText(text, x + 4, y + 1);
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export { axialQuad };
