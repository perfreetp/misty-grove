import type { SegmentKey } from './types';

/**
 * Pre-rendered mucosal wall textures. Generating these once per (seed, segment)
 * keeps per-frame playback cheap while giving the lumen a much richer, more
 * endoscopy-like appearance than flat gradients.
 */

export interface MucosaTexture {
  canvas: HTMLCanvasElement;
  size: number;
}

const TEXTURE_SIZE = 760;
const cache = new Map<string, MucosaTexture>();

function hash2(x: number, y: number, seed: number): number {
  let h = Math.imul(x | 0, 0x27d4eb2d) ^ Math.imul(y | 0, 0x165667b1) ^ Math.imul(seed | 0, 0x9e3779b9);
  h = Math.imul(h ^ (h >>> 15), 0x2545f491);
  h ^= h >>> 13;
  h = Math.imul(h, 0x27d4eb2d);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

function smoothNoise(x: number, y: number, seed: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi, seed);
  const b = hash2(xi + 1, yi, seed);
  const c = hash2(xi, yi + 1, seed);
  const d = hash2(xi + 1, yi + 1, seed);
  return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
}

function fbm(x: number, y: number, seed: number, octaves = 4): number {
  let amp = 0.5;
  let freq = 1;
  let sum = 0;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += smoothNoise(x * freq, y * freq, seed + i * 17) * amp;
    norm += amp;
    amp *= 0.5;
    freq *= 2.1;
  }
  return sum / norm;
}

interface WallPalette {
  deep: [number, number, number];
  wall: [number, number, number];
  wallDark: [number, number, number];
  wallLight: [number, number, number];
  foldDark: [number, number, number];
  foldLight: [number, number, number];
}

const WALL_PALETTES: Record<SegmentKey, WallPalette> = {
  esophagus: {
    deep: [70, 30, 26],
    wall: [214, 150, 136],
    wallDark: [138, 70, 58],
    wallLight: [240, 190, 172],
    foldDark: [120, 56, 46],
    foldLight: [248, 202, 184],
  },
  stomach: {
    deep: [86, 40, 20],
    wall: [212, 122, 82],
    wallDark: [128, 60, 34],
    wallLight: [240, 172, 124],
    foldDark: [112, 50, 28],
    foldLight: [250, 190, 140],
  },
  duodenum: {
    deep: [80, 44, 26],
    wall: [218, 152, 104],
    wallDark: [134, 74, 44],
    wallLight: [244, 196, 148],
    foldDark: [116, 60, 36],
    foldLight: [250, 208, 162],
  },
  jejunum: {
    deep: [70, 44, 34],
    wall: [206, 158, 128],
    wallDark: [124, 82, 62],
    wallLight: [236, 200, 172],
    foldDark: [106, 66, 50],
    foldLight: [246, 214, 186],
  },
  ileum: {
    deep: [86, 40, 24],
    wall: [214, 138, 96],
    wallDark: [134, 66, 40],
    wallLight: [240, 178, 132],
    foldDark: [114, 52, 32],
    foldLight: [248, 194, 150],
  },
  colon: {
    deep: [78, 44, 36],
    wall: [202, 150, 122],
    wallDark: [124, 76, 58],
    wallLight: [234, 190, 164],
    foldDark: [106, 62, 46],
    foldLight: [242, 202, 176],
  },
};

function mix(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

export function getMucosaTexture(seed: number, segment: SegmentKey): MucosaTexture {
  const key = `${seed}:${segment}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const size = TEXTURE_SIZE;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas2D 不可用');

  const pal = WALL_PALETTES[segment]!;
  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2;

  // --- base value-noise mucosa shading ---
  const img = ctx.createImageData(size, size);
  const data = img.data;
  const fractalScale = segment === 'colon' ? 5.4 : segment === 'stomach' ? 4.2 : 6.6;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (x - cx) / R;
      const dy = (y - cy) / R;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const idx = (y * size + x) * 4;

      // depth falloff: darker toward the far lumen and the rim
      const depth = Math.min(1, Math.max(0, (dist - 0.28) / 0.86));
      const rim = Math.min(1, Math.max(0, (dist - 0.78) / 0.28));

      const n1 = fbm((x / size) * fractalScale, (y / size) * fractalScale, seed, 4);
      const n2 = fbm((x / size) * fractalScale * 4.5 + 11, (y / size) * fractalScale * 4.5 + 7, seed + 91, 4);
      // fine mucosal grain: this is what makes the wall read as tissue rather
      // than as a soft gradient at 1:1 zoom
      const n3 = fbm((x / size) * fractalScale * 17 + 3, (y / size) * fractalScale * 17 + 19, seed + 311, 3);
      const n4 = hash2(x, y, seed + 777);

      let base = mix(pal.wallDark, pal.wall, Math.pow(depth, 0.5));
      base = mix(base, pal.wallLight, Math.max(0, n1 - 0.46) * 1.9 * (0.35 + depth * 0.72));
      base = mix(base, pal.foldDark, Math.max(0, 0.44 - n1) * 1.3 * (1 - depth * 0.35));
      // mottled capillary blush
      base = mix(base, pal.wallLight, Math.max(0, n3 - 0.56) * 0.9 * depth);
      base = mix(base, pal.foldDark, Math.max(0, 0.42 - n3) * 0.75 * depth);
      base = mix(base, pal.deep, rim * 0.82);

      // granular mottling
      const grain =
        (n2 - 0.5) * (segment === 'colon' ? 26 : 38) * (0.45 + depth * 0.55) +
        (n3 - 0.5) * (segment === 'colon' ? 16 : 22) +
        (n4 - 0.5) * 11;
      data[idx] = clampByte(base[0] + grain);
      data[idx + 1] = clampByte(base[1] + grain * 0.84);
      data[idx + 2] = clampByte(base[2] + grain * 0.76);
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  // --- structural folds ---
  ctx.save();
  ctx.translate(cx, cy);
  drawStructure(ctx, R, segment, seed, pal);
  ctx.restore();

  drawMicroTexture(ctx, size, R, segment, seed);

  // --- small specular sheen across the mucosa ---
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  const sheen = ctx.createRadialGradient(cx - R * 0.28, cy - R * 0.34, 0, cx - R * 0.28, cy - R * 0.34, R * 0.95);
  sheen.addColorStop(0, 'rgba(255,246,236,0.16)');
  sheen.addColorStop(0.5, 'rgba(255,228,208,0.05)');
  sheen.addColorStop(1, 'rgba(255,220,196,0)');
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, size, size);
  ctx.restore();

  // --- vignette so the texture blends into the FOV edge ---
  const vig = ctx.createRadialGradient(cx, cy, R * 0.52, cx, cy, R);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(0.74, 'rgba(0,0,0,0.1)');
  vig.addColorStop(1, 'rgba(0,0,0,0.78)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, size, size);

  const tex: MucosaTexture = { canvas, size };
  cache.set(key, tex);
  return tex;
}

/**
 * Overlays a network of fine wrinkles and tactile ridges. Without this the wall
 * looks like a smooth gradient at full size, which reads as "fake" next to the
 * mucosal features.
 */
function drawMicroTexture(
  ctx: CanvasRenderingContext2D,
  size: number,
  R: number,
  segment: SegmentKey,
  seed: number,
): void {
  const cx = size / 2;
  const cy = size / 2;
  ctx.save();
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  const wrinkles = segment === 'colon' ? 190 : segment === 'stomach' ? 150 : 260;
  for (let i = 0; i < wrinkles; i++) {
    const ang = hash2(i, 61, seed) * Math.PI * 2;
    const startR = R * (0.22 + hash2(i, 62, seed) * 0.72);
    const len = R * (0.03 + hash2(i, 63, seed) * 0.13);
    const bend = (hash2(i, 64, seed) - 0.5) * 2.4;
    const x0 = cx + Math.cos(ang) * startR;
    const y0 = cy + Math.sin(ang) * startR;
    const x1 = x0 + Math.cos(ang + bend * 0.3) * len;
    const y1 = y0 + Math.sin(ang + bend * 0.3) * len;
    const midX = (x0 + x1) / 2 + Math.cos(ang + Math.PI / 2) * len * 0.4 * bend;
    const midY = (y0 + y1) / 2 + Math.sin(ang + Math.PI / 2) * len * 0.4 * bend;
    const bright = hash2(i, 65, seed) > 0.55;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.quadraticCurveTo(midX, midY, x1, y1);
    ctx.strokeStyle = bright ? `rgba(255,222,200,${0.045 + hash2(i, 66, seed) * 0.06})` : `rgba(70,28,20,${0.05 + hash2(i, 67, seed) * 0.07})`;
    ctx.lineWidth = Math.max(0.6, R * (0.0025 + hash2(i, 68, seed) * 0.005));
    ctx.stroke();
  }
  ctx.restore();
}

function clampByte(v: number): number {
  return v < 0 ? 0 : v > 255 ? 255 : v | 0;
}

function drawStructure(
  ctx: CanvasRenderingContext2D,
  R: number,
  segment: SegmentKey,
  seed: number,
  pal: WallPalette,
): void {
  const rgb = (c: [number, number, number], a: number) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;
  // Round joins are essential: the wobbly fold paths have near-180° bends, and
  // miter joins would shoot long rectangular spikes out of the mucosa.
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  if (segment === 'esophagus') {
    const strokeStyles: [number, [number, number, number], number, number][] = [
      [1.0, pal.foldDark, 0.26, 0.06],
      [0.72, pal.foldLight, 0.16, 0.022],
    ];
    for (let i = 0; i < 16; i++) {
      const a0 = (i / 16) * Math.PI * 2 + hash2(i, 3, seed) * 0.07;
      const spread = 0.1 + hash2(i, 5, seed) * 0.16;
      for (const [widthMul, color, alpha, wl] of strokeStyles) {
        ctx.beginPath();
        const steps = 16;
        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          const r = R * (0.3 + t * 0.7);
          const ang = a0 + Math.sin(t * 2.4 + i) * spread * 0.5 + t * spread * 0.55;
          const x = Math.cos(ang) * r;
          const y = Math.sin(ang) * r;
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = rgb(color, alpha);
        ctx.lineWidth = R * wl * widthMul;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
    }
  } else if (segment === 'colon') {
    // haustral folds: the colon's sacculations appear as a few broad, shallow
    // creases with soft shadows, not as concentric hoops.
    for (let i = 0; i < 5; i++) {
      const rr = R * (0.34 + i * 0.13);
      const squash = 0.86 + hash2(i, 2, seed) * 0.12;
      const arcStart = hash2(i, 7, seed) * Math.PI * 2;
      const span = Math.PI * (0.8 + hash2(i, 8, seed) * 0.8);
      const offX = (hash2(i, 9, seed) - 0.5) * R * 0.1;
      const offY = (hash2(i, 10, seed) - 0.5) * R * 0.1;
      const ringStyles: [number, [number, number, number], number, number][] = [
        [0, pal.foldDark, 0.2 + hash2(i, 11, seed) * 0.09, 0.085],
        [-R * 0.03, pal.foldLight, 0.14, 0.035],
      ];
      for (const [off, color, alpha, wl] of ringStyles) {
        ctx.beginPath();
        const steps = 60;
        for (let a = 0; a <= steps; a++) {
          const f = a / steps;
          const ang = arcStart + f * span;
          const taper = Math.sin(f * Math.PI) ** 0.5;
          const wob = 1 + Math.sin(ang * 3 + i * 1.1) * 0.055 + Math.sin(ang * 5.3 + i * 2.7) * 0.025;
          const x = offX + Math.cos(ang) * (rr + off * taper) * wob;
          const y = offY + Math.sin(ang) * (rr * squash + off * taper) * wob;
          if (a === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = rgb(color, alpha);
        ctx.lineWidth = R * wl;
        ctx.stroke();
      }
      // haustral pouch shading between folds
      for (let k = 0; k < 5; k++) {
        const ang = (k / 10) * Math.PI * 2 + i * 0.37 + hash2(i, k, seed) * 0.3;
        const pr = rr + R * 0.048;
        const pg = ctx.createRadialGradient(Math.cos(ang) * pr, Math.sin(ang) * pr * squash, 0, Math.cos(ang) * pr, Math.sin(ang) * pr * squash, R * 0.06);
        pg.addColorStop(0, rgb(pal.foldDark, 0.14));
        pg.addColorStop(1, rgb(pal.foldDark, 0));
        ctx.fillStyle = pg;
        ctx.beginPath();
        ctx.arc(Math.cos(ang) * pr, Math.sin(ang) * pr * squash, R * 0.06, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else if (segment === 'stomach') {
    // rugal folds: thick irregular ridges running across the wall
    for (let i = 0; i < 11; i++) {
      const a0 = hash2(i, 1, seed) * Math.PI * 2;
      const r0 = R * (0.32 + hash2(i, 2, seed) * 0.08);
      const r1 = R * (0.86 + hash2(i, 3, seed) * 0.12);
      const curve = (hash2(i, 4, seed) - 0.5) * 1.5;
      const ridgeStyles: [[number, number, number], number, number, number][] = [
        [pal.foldDark, 0.26 + hash2(i, 6, seed) * 0.16, 0.048 + hash2(i, 7, seed) * 0.022, 0],
        [pal.foldLight, 0.16, 0.02, R * 0.02],
      ];
      for (const [color, alpha, wl, off] of ridgeStyles) {
        ctx.beginPath();
        const steps = 20;
        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          const r = r0 + (r1 - r0) * t;
          const ang = a0 + Math.sin(t * Math.PI * 1.6 + i) * 0.22 * curve;
          const x = Math.cos(ang) * (r + off);
          const y = Math.sin(ang) * (r + off);
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = rgb(color, alpha);
        ctx.lineWidth = R * wl;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
    }
    // areolar mucosal relief: overlapping soft blobs give the wall body
    for (let i = 0; i < 300; i++) {
      const ang = hash2(i, 14, seed) * Math.PI * 2;
      const r = R * (0.3 + Math.pow(hash2(i, 15, seed), 0.7) * 0.68);
      const px = Math.cos(ang) * r;
      const py = Math.sin(ang) * r;
      const rad = R * (0.014 + hash2(i, 16, seed) * 0.05);
      const g = ctx.createRadialGradient(px - rad * 0.3, py - rad * 0.35, 0, px, py, rad);
      const light = hash2(i, 17, seed) > 0.5;
      g.addColorStop(0, rgb(light ? pal.foldLight : pal.foldDark, light ? 0.12 : 0.1));
      g.addColorStop(1, rgb(pal.foldDark, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(px, py, rad, 0, Math.PI * 2);
      ctx.fill();
    }
    // gastric pit texture
    for (let i = 0; i < 260; i++) {
      const ang = hash2(i, 11, seed) * Math.PI * 2;
      const r = R * (0.33 + hash2(i, 12, seed) * 0.62);
      ctx.beginPath();
      ctx.ellipse(Math.cos(ang) * r, Math.sin(ang) * r, R * 0.008, R * 0.006, ang, 0, Math.PI * 2);
      ctx.fillStyle = rgb(pal.foldDark, 0.2);
      ctx.fill();
    }
  } else {
    // small bowel: valvulae conniventes. Real folds are partial crescents that
    // overlap at random angles, so build a set of short arcs with drifting
    // centres rather than a set of concentric rings.
    const ringCount = segment === 'duodenum' ? 14 : 22;
    for (let i = 0; i < ringCount; i++) {
      const rr = R * (0.3 + Math.pow(hash2(i, 4, seed), 0.85) * 0.66);
      const offsetAng = hash2(i, 43, seed) * Math.PI * 2;
      const offX = Math.cos(offsetAng) * R * 0.06;
      const offY = Math.sin(offsetAng) * R * 0.06;
      const squash = 0.7 + hash2(i, 5, seed) * 0.3;
      const arcCount = 2 + Math.floor(hash2(i, 44, seed) * 2);
      const styles: [number, [number, number, number], number, number][] = [
        [0, pal.foldDark, 0.17 + hash2(i, 9, seed) * 0.1, 0.06],
        [-R * 0.02, pal.foldLight, 0.13, 0.026],
      ];
      for (let k = 0; k < arcCount; k++) {
        const start = hash2(i, 45 + k, seed) * Math.PI * 2;
        // valvulae are short crescents, not hoops
        const span = Math.PI * (0.28 + hash2(i, 47 + k, seed) * 0.42);
        for (const [off, color, alpha, wl] of styles) {
          ctx.beginPath();
          const steps = 56;
          for (let a = 0; a <= steps; a++) {
            const f = a / steps;
            const ang = start + f * span;
            // taper the ends so folds blend into the wall
            const taper = Math.sin(f * Math.PI) ** 0.55;
            const wob = 1 + Math.sin(ang * 2.6 + i * 1.4) * 0.055 + Math.sin(ang * 4.4 + i * 0.8) * 0.028;
            const r = rr + off * taper;
            const x = offX + Math.cos(ang) * r * wob;
            const y = offY + Math.sin(ang) * r * squash * wob;
            if (a === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = rgb(color, alpha);
          ctx.lineWidth = R * wl;
          ctx.stroke();
        }
      }
    }
    // villi — dense soft tufts, not aligned to a grid
    const villi = segment === 'duodenum' ? 640 : 1100;
    for (let i = 0; i < villi; i++) {
      const ang = hash2(i, 21, seed) * Math.PI * 2 + hash2(i, 27, seed) * 0.2;
      const r = R * (0.28 + Math.pow(hash2(i, 22, seed), 0.62) * 0.68);
      const len = R * (0.008 + hash2(i, 23, seed) * 0.019);
      const tilt = (hash2(i, 24, seed) - 0.5) * 1.5;
      const alpha = 0.05 + hash2(i, 25, seed) * 0.09;
      const px = Math.cos(ang) * r;
      const py = Math.sin(ang) * r;
      ctx.beginPath();
      ctx.arc(px, py, len, ang + tilt, ang + tilt + Math.PI * (0.5 + hash2(i, 28, seed) * 0.9));
      ctx.strokeStyle = rgb(hash2(i, 26, seed) > 0.5 ? pal.foldLight : pal.foldDark, alpha);
      ctx.lineWidth = Math.max(0.5, R * 0.004);
      ctx.stroke();
      if (hash2(i, 29, seed) > 0.72) {
        ctx.beginPath();
        ctx.arc(px, py, len * 0.34, 0, Math.PI * 2);
        ctx.fillStyle = rgb(pal.foldLight, alpha * 0.9);
        ctx.fill();
      }
    }
    // a few lymphoid follicles
    for (let i = 0; i < 9; i++) {
      const ang = hash2(i, 31, seed) * Math.PI * 2;
      const r = R * (0.4 + hash2(i, 32, seed) * 0.5);
      ctx.beginPath();
      ctx.arc(Math.cos(ang) * r, Math.sin(ang) * r, R * (0.01 + hash2(i, 33, seed) * 0.012), 0, Math.PI * 2);
      ctx.fillStyle = rgb(pal.foldLight, 0.22);
      ctx.fill();
    }
  }
}

/**
 * Build textures for every segment ahead of playback. Generating one costs a
 * couple hundred milliseconds, so doing it lazily would stall the first frame
 * after each segment boundary.
 */
export function warmTextures(seeds: number[], segments: SegmentKey[]): void {
  for (const seed of seeds) {
    for (const segment of segments) {
      getMucosaTexture(seed, segment);
    }
  }
}
