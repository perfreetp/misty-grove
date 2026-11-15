import type { Conventions, Landmark, PixelPoint, Vec3, ViewMode, Volume } from '../lib/types';
import { add, dot, normalize, pixelToWorld, scale, sub, worldToPixel } from '../lib/geom';
import { sampleWorld } from '../lib/measure';

export interface CineFrame {
  /** world origin of the top-left texel */
  origin: Vec3;
  /** world delta per column / row */
  du: Vec3;
  dv: Vec3;
  cols: number;
  rows: number;
  /** axial slice index when mode=axial */
  sliceIndex?: number;
}

/** Axial cine frame spanning the whole volume at the given slice. */
export function axialFrame(vol: Volume, slice: number): CineFrame {
  const s = Math.max(0, Math.min(vol.depth - 1, slice));
  const origin = add(vol.origin, scale(vol.normal, s * vol.spacing[2]));
  return {
    origin,
    du: scale(vol.axisU, vol.spacing[0]),
    dv: scale(vol.axisV, vol.spacing[1]),
    cols: vol.width,
    rows: vol.height,
    sliceIndex: s,
  };
}

/** Oblique frame in the annulus plane (the "en-face" view). */
export function enfaceFrame(
  center: Vec3,
  basisU: Vec3,
  basisV: Vec3,
  extentMm: number,
  px = 0.4,
): CineFrame {
  const half = extentMm / 2;
  const cols = Math.round(extentMm / px);
  const rows = cols;
  const origin = add(center, add(scale(basisU, -half), scale(basisV, -half)));
  return {
    origin,
    du: scale(basisU, extentMm / cols),
    dv: scale(basisV, extentMm / rows),
    cols,
    rows,
  };
}

/**
 * Coronal-ish long axis frame through the annulus centre, containing the
 * annular plane normal. `azimuth` rotates the cut around the normal.
 */
export function longAxisFrame(_vol: Volume, center: Vec3, normal: Vec3, azimuthDeg: number, extentMm: number, px = 0.55): CineFrame {
  const ref = Math.abs(dot(normal, [1, 0, 0])) < 0.9 ? [1, 0, 0] : [0, 1, 0];
  const e1 = normalize(sub(ref as Vec3, scale(normal, dot(ref as Vec3, normal))));
  const e2 = normalize([
    normal[1] * e1[2] - normal[2] * e1[1],
    normal[2] * e1[0] - normal[0] * e1[2],
    normal[0] * e1[1] - normal[1] * e1[0],
  ]);
  const a = (azimuthDeg * Math.PI) / 180;
  const horiz = add(scale(e1, Math.cos(a)), scale(e2, Math.sin(a)));
  const vert = normal;
  const cols = Math.round(extentMm / px);
  const rows = cols;
  const origin = add(center, add(scale(horiz, -extentMm / 2), scale(vert, -extentMm / 2)));
  return {
    origin,
    du: scale(horiz, extentMm / cols),
    dv: scale(vert, extentMm / rows),
    cols,
    rows,
  };
}

/** Sample a cine frame into an RGBA image using the given window. */
export function renderCineFrame(
  vol: Volume,
  frame: CineFrame,
  win: { center: number; width: number },
  out: Uint8ClampedArray,
  invert = false,
): void {
  const { origin, du, dv, cols, rows } = frame;
  const lo = win.center - win.width / 2;
  const inv = 1 / Math.max(1, win.width);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const p: Vec3 = [
        origin[0] + du[0] * x + dv[0] * y,
        origin[1] + du[1] * x + dv[1] * y,
        origin[2] + du[2] * x + dv[2] * y,
      ];
      let t = (sampleWorld(vol, p) - lo) * inv;
      t = Math.max(0, Math.min(1, t));
      if (invert) t = 1 - t;
      const v = Math.round(t * 255);
      const i = (y * cols + x) * 4;
      out[i] = v;
      out[i + 1] = v;
      out[i + 2] = v;
      out[i + 3] = 255;
    }
  }
}

/** Frame pixel from a world point (may be off-frame). */
export function worldToFrame(p: Vec3, frame: CineFrame): { x: number; y: number } {
  const rel = sub(p, frame.origin);
  return { x: dot(rel, frame.du) / dot(frame.du, frame.du), y: dot(rel, frame.dv) / dot(frame.dv, frame.dv) };
}

export function frameToWorld(frame: CineFrame, x: number, y: number): Vec3 {
  return add(frame.origin, add(scale(frame.du, x), scale(frame.dv, y)));
}

/** World point of a contour vertex (axial slices). */
export function contourVertexWorld(vol: Volume, pt: PixelPoint): Vec3 {
  return pixelToWorld(pt, vol);
}

export function projectLandmark(l: Landmark, frame: CineFrame, which: 'a' | 'b' = 'a') {
  const p = which === 'a' ? l.a : l.b;
  if (!p) return null;
  return worldToFrame(p, frame);
}

export interface InteractionState {
  tool: 'pan' | 'contour-annulus' | 'contour-lvot' | 'landmark' | 'caliper' | 'erase';
  activeContour?: string;
  activeLandmark?: Landmark['kind'];
}

export function suggestAnnulusFromHU(vol: Volume, slice: number, cx: number, cy: number, conventions: Conventions): PixelPoint[] {
  // Seed a contour on the blood-pool / wall boundary via a radial threshold scan.
  const pts: PixelPoint[] = [];
  const centerWorld = pixelToWorld({ x: cx, y: cy, slice }, vol);
  void centerWorld;
  const threshold = 250;
  const samples = 64;
  for (let i = 0; i < samples; i++) {
    const ang = (i / samples) * Math.PI * 2;
    let best = 14;
    for (let r = 5; r < 24; r += 0.5) {
      const px = cx + Math.cos(ang) * r;
      const py = cy + Math.sin(ang) * r;
      const hu = samplePix(vol, px, py, slice);
      if (hu < threshold) {
        best = r;
        break;
      }
    }
    pts.push({ x: cx + Math.cos(ang) * best, y: cy + Math.sin(ang) * best, slice });
  }
  void conventions;
  return pts;
}

export function samplePix(vol: Volume, px: number, py: number, slice: number): number {
  const p = pixelToWorld({ x: px, y: py, slice }, vol);
  return sampleWorld(vol, p);
}

export function worldOfPixel(vol: Volume, px: number, py: number, slice: number): Vec3 {
  return pixelToWorld({ x: px, y: py, slice }, vol);
}

export function pixelOfWorld(vol: Volume, p: Vec3): PixelPoint {
  return worldToPixel(p, vol);
}

export type { ViewMode };
