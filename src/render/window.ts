export type ShadePreset = 'gray' | 'cta' | 'hot';

export interface WindowLevel {
  center: number;
  width: number;
}

export const WL_PRESETS: Record<string, WindowLevel & { name: string }> = {
  angio: { name: 'CTA 血管', center: 330, width: 760 },
  calcium: { name: '钙化窗', center: 480, width: 1400 },
  soft: { name: '软组织', center: 60, width: 400 },
  bone: { name: '骨窗', center: 500, width: 2000 },
  lung: { name: '肺窗', center: -600, width: 1500 },
};

export function applyWindow(hu: number, wl: WindowLevel): number {
  const lo = wl.center - wl.width / 2;
  const t = (hu - lo) / Math.max(1, wl.width);
  return Math.max(0, Math.min(1, t));
}

export const grayLut = (t: number): [number, number, number] => {
  const v = Math.round(t * 255);
  return [v, v, v];
};

export const ctaLut = (t: number): [number, number, number] => {
  // dark background → deep red → orange → warm white for high HU
  const stops: [number, [number, number, number]][] = [
    [0, [6, 8, 12]],
    [0.28, [31, 36, 46]],
    [0.42, [102, 56, 56]],
    [0.56, [237, 140, 92]],
    [0.72, [255, 219, 168]],
    [0.86, [255, 250, 242]],
    [1, [255, 255, 255]],
  ];
  return lerpStops(t, stops);
};

export const hotLut = (t: number): [number, number, number] => {
  const stops: [number, [number, number, number]][] = [
    [0, [6, 8, 14]],
    [0.3, [18, 30, 60]],
    [0.55, [20, 96, 140]],
    [0.75, [250, 190, 70]],
    [0.9, [240, 90, 60]],
    [1, [255, 255, 240]],
  ];
  return lerpStops(t, stops);
};

function lerpStops(t: number, stops: [number, [number, number, number]][]): [number, number, number] {
  const x = Math.max(0, Math.min(1, t));
  for (let i = 0; i < stops.length - 1; i++) {
    const [t0, c0] = stops[i];
    const [t1, c1] = stops[i + 1];
    if (x >= t0 && x <= t1) {
      const f = t1 === t0 ? 0 : (x - t0) / (t1 - t0);
      return [
        Math.round(c0[0] + (c1[0] - c0[0]) * f),
        Math.round(c0[1] + (c1[1] - c0[1]) * f),
        Math.round(c0[2] + (c1[2] - c0[2]) * f),
      ];
    }
  }
  return stops[stops.length - 1][1];
}

export function lutFor(preset: ShadePreset) {
  if (preset === 'cta') return ctaLut;
  if (preset === 'hot') return hotLut;
  return grayLut;
}
