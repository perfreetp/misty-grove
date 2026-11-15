import { buildPhantomVolume, PHANTOM_PRESETS, buildRingGeometry } from '../src/data/phantom';
import { computeMeasurement } from '../src/lib/measure';
import { worldToPixel } from '../src/lib/geom';
import { DEFAULT_CONVENTIONS } from '../src/data/seed';
import type { Contour, Measurement } from '../src/lib/types';

function truePerimeter(spec: (typeof PHANTOM_PRESETS)[0]) {
  const n = 2000;
  let p = 0;
  const pt = (i: number) => {
    const th = (i / n) * Math.PI * 2;
    const rot = (spec.ellipseRotationDeg * Math.PI) / 180;
    const lx = spec.semiMajor * Math.cos(th);
    const ly = spec.semiMinor * Math.sin(th);
    return [lx * Math.cos(rot) - ly * Math.sin(rot), lx * Math.sin(rot) + ly * Math.cos(rot), spec.annulusZ + spec.saddleMm * Math.sin(2 * th + 0.35)];
  };
  for (let i = 0; i < n; i++) {
    const a = pt(i), b = pt((i + 1) % n);
    p += Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
  }
  return p;
}

for (const spec of PHANTOM_PRESETS.slice(0, 1)) {
  const vol = buildPhantomVolume(spec);
  const geom = buildRingGeometry(spec);
  const contours: Contour[] = [];
  // simulate a clinician contouring the blood-pool boundary on 5 slices
  const target = spec.annulusZ;
  const slices: number[] = [];
  for (let s = 0; s < vol.depth; s++) {
    const wz = vol.origin[2] + s * vol.spacing[2];
    if (Math.abs(wz - target) <= 2.0) slices.push(s);
  }
  for (const s of slices) {
    const wz = vol.origin[2] + s * vol.spacing[2];
    // ring points near this plane
    const pts = geom.ring.filter((p) => Math.abs(p[2] - wz) < 0.5);
    if (pts.length < 8) continue;
    const contourPts = pts.map((p) => {
      const px = worldToPixel(p, vol);
      return { x: px.x, y: px.y, slice: s };
    });
    contours.push({ id: `c${s}`, kind: 'annulus', slice: s, points: contourPts });
  }
  console.log('contours', contours.length, contours.map(c=>c.points.length));
  const m: Measurement = { contours, landmarks: [] };
  const res = computeMeasurement(vol, m, DEFAULT_CONVENTIONS);
  if (!res) { console.log('NO RESULT'); continue; }
  const tp = truePerimeter(spec);
  console.log('true perimeter', tp.toFixed(2), 'computed', res.ring.perimeterMm.toFixed(2), 'err %', (((res.ring.perimeterMm - tp) / tp) * 100).toFixed(2));
  console.log('true ellipse area', (Math.PI * spec.semiMajor * spec.semiMinor).toFixed(1), 'computed', res.ring.areaMm2.toFixed(1));
  console.log('dPerim', res.ring.dPerimMm.toFixed(2), 'dArea', res.ring.dAreaMm.toFixed(2), 'dMax/dMin', res.ring.dMaxMm.toFixed(1), res.ring.dMinMm.toFixed(1));
  console.log('calc', res.calc?.totalVolumeMm3.toFixed(0), 'peak', res.calc?.peakHU, 'hot', res.calc?.hotSectors);
  console.log('ring center', res.ring.center.map(x=>x.toFixed(1)));
  console.log('planarity', res.ring.planarityRmsMm.toFixed(2), 'angle', res.ring.planeAngleDeg.toFixed(1));
}
