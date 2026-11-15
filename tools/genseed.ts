import { buildPhantomVolume, PHANTOM_PRESETS, phantomCoronaryPoints } from '../src/data/phantom';
import { computeMeasurement } from '../src/lib/measure';
import { computeSizing, simulateDeployment, assessRelease } from '../src/lib/release';
import { DEFAULT_CONVENTIONS, DEFAULT_VALVES } from '../src/data/seed';
import { worldToPixel } from '../src/lib/geom';
import type { Contour, Landmark, Measurement } from '../src/lib/types';
import { writeFileSync } from 'node:fs';

function idealContours(vol: ReturnType<typeof buildPhantomVolume>, spec: (typeof PHANTOM_PRESETS)[0]): Contour[] {
  const contours: Contour[] = [];
  const rot = (spec.ellipseRotationDeg * Math.PI) / 180;
  for (let s = 0; s < vol.depth; s++) {
    const wz = vol.origin[2] + s * vol.spacing[2];
    if (Math.abs(wz - spec.annulusZ) > 2.0) continue;
    const pts = [];
    for (let i = 0; i < 360; i++) {
      const th = (i / 360) * Math.PI * 2;
      const lx = spec.semiMajor * Math.cos(th), ly = spec.semiMinor * Math.sin(th);
      const x = lx * Math.cos(rot) - ly * Math.sin(rot), y = lx * Math.sin(rot) + ly * Math.cos(rot);
      const z = spec.annulusZ + spec.saddleMm * Math.sin(2 * th + 0.35);
      if (Math.abs(z - wz) > 0.35) continue;
      const px = worldToPixel([x, y, z], vol);
      pts.push({ x: px.x, y: px.y, slice: s });
    }
    if (pts.length >= 8) contours.push({ id: `a${s}`, kind: 'annulus', slice: s, points: pts });
  }
  // LVOT 5mm below
  const sLvot = Math.round(((spec.annulusZ - 5) - vol.origin[2]) / vol.spacing[2]);
  const wz = vol.origin[2] + sLvot * vol.spacing[2];
  const lvPts = [];
  const shrink = 1.6;
  for (let i = 0; i < 360; i++) {
    const th = (i / 360) * Math.PI * 2;
    const lx = (spec.semiMajor - shrink) * Math.cos(th), ly = (spec.semiMinor - shrink) * Math.sin(th);
    const x = lx * Math.cos(rot) - ly * Math.sin(rot), y = lx * Math.sin(rot) + ly * Math.cos(rot);
    const px = worldToPixel([x, y, wz], vol);
    lvPts.push({ x: px.x, y: px.y, slice: sLvot });
  }
  contours.push({ id: `l${sLvot}`, kind: 'lvot', slice: sLvot, points: lvPts });
  return contours;
}

const DEG = Math.PI / 180;
function ostiumLandmark(spec: (typeof PHANTOM_PRESETS)[0], which: 'L' | 'R'): Landmark {
  // Use the phantom's own ostium position (sinus-aware), i.e. what a reader
  // would actually click on the long-axis view.
  const pts = phantomCoronaryPoints(spec);
  const p = which === 'L' ? pts.left : pts.right;
  return {
    id: which,
    kind: which === 'L' ? 'ostium-left' : 'ostium-right',
    a: [p[0], p[1], p[2]],
    pickedOn: 'longaxis',
    pickedSlice: 0,
  };
}

const out: Record<string, unknown> = {};
for (const spec of PHANTOM_PRESETS) {
  const vol = buildPhantomVolume(spec);
  const m: Measurement = {
    contours: idealContours(vol, spec),
    landmarks: [ostiumLandmark(spec, 'L'), ostiumLandmark(spec, 'R')],
  };
  const summary = computeMeasurement(vol, m, DEFAULT_CONVENTIONS)!;
  const valve = DEFAULT_VALVES[spec.id === 'phantom-tricuspid-a' ? 0 : 1];
  const sizing = computeSizing(summary, valve, DEFAULT_CONVENTIONS);
  const frame = simulateDeployment(valve, sizing.nominalMm, summary.ring, summary.calc, DEFAULT_CONVENTIONS, 6, summary.lvot?.dAreaMm ?? 0);
  const release = assessRelease(frame, valve, sizing.nominalMm, summary, sizing, DEFAULT_CONVENTIONS);
  out[spec.id] = {
    summary,
    sizing,
    release,
    measurement: {
      contours: m.contours.map((c) => ({ ...c, points: c.points.filter((_, i) => i % 12 === 0) })),
      landmarks: m.landmarks,
    },
    metrics: {
      perimeter: summary.ring.perimeterMm,
      area: summary.ring.areaMm2,
      dPerim: summary.ring.dPerimMm,
      lvot: summary.lvot?.dAreaMm,
      calc: summary.calc?.totalVolumeMm3,
      peak: summary.calc?.peakHU,
      size: sizing.nominalMm,
      oversize: sizing.oversizePct,
      pvl: release.pvlArcPct,
      pvlGap: release.maxGapMm,
      flags: release.flags.map((f) => f.code),
      lHeight: summary.coronaries.left?.heightMm,
      rHeight: summary.coronaries.right?.heightMm,
    },
  };
}
writeFileSync('tools/seed-out.json', JSON.stringify(out, null, 1));
console.log(JSON.stringify(Object.fromEntries(Object.entries(out).map(([k, v]) => [k, (v as { metrics: unknown }).metrics])), null, 1));
