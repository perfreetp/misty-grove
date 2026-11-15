import { buildPhantomVolume, PHANTOM_PRESETS } from '../src/data/phantom';
import { computeMeasurement } from '../src/lib/measure';
import { computeSizing, simulateDeployment, assessRelease } from '../src/lib/release';
import { DEFAULT_CONVENTIONS, DEFAULT_VALVES } from '../src/data/seed';
import { worldToPixel } from '../src/lib/geom';
import type { Contour, Landmark, Measurement } from '../src/lib/types';
const DEG = Math.PI/180;
const spec = PHANTOM_PRESETS[0];
const vol = buildPhantomVolume(spec);
const rot = (spec.ellipseRotationDeg*Math.PI)/180;
const contours: Contour[] = [];
for (let s=0;s<vol.depth;s++){
  const wz = vol.origin[2]+s*vol.spacing[2];
  if (Math.abs(wz-spec.annulusZ)>2) continue;
  const pts=[];
  for (let i=0;i<360;i++){
    const th=(i/360)*Math.PI*2;
    const lx=spec.semiMajor*Math.cos(th), ly=spec.semiMinor*Math.sin(th);
    const x=lx*Math.cos(rot)-ly*Math.sin(rot), y=lx*Math.sin(rot)+ly*Math.cos(rot);
    const z=spec.annulusZ+spec.saddleMm*Math.sin(2*th+0.35);
    if (Math.abs(z-wz)>0.35) continue;
    const px=worldToPixel([x,y,z],vol); pts.push({x:px.x,y:px.y,slice:s});
  }
  if (pts.length>=8) contours.push({id:'a'+s,kind:'annulus',slice:s,points:pts});
}
const mk=(which:'L'|'R'):Landmark=>{
  const ang=which==='L'?52*DEG:152*DEG; const h=which==='L'?spec.coronaryLeftHeightMm:spec.coronaryRightHeightMm;
  const base=1/Math.sqrt((Math.cos(ang)/spec.semiMajor)**2+(Math.sin(ang)/spec.semiMinor)**2);
  return {id:which, kind: which==='L'?'ostium-left':'ostium-right', a:[Math.cos(ang)*(base+2.6), Math.sin(ang)*(base+2.6), spec.annulusZ+h], pickedOn:'longaxis', pickedSlice:0};
};
const m: Measurement = {contours, landmarks:[mk('L'),mk('R')]};
const summary = computeMeasurement(vol,m,DEFAULT_CONVENTIONS)!;
const valve = DEFAULT_VALVES[0];
const sizing = computeSizing(summary,valve,DEFAULT_CONVENTIONS);
const frame = simulateDeployment(valve, sizing.nominalMm, summary.ring, summary.calc, DEFAULT_CONVENTIONS, 6, summary.lvot?.dAreaMm ?? 0);
console.log('nominal', sizing.nominalMm, 'dPerim', summary.ring.dPerimMm.toFixed(2));
console.log('levels', frame.levels.map(v=>v.toFixed(1)).join(' '));
console.log('baseProfile min/max', Math.min(...frame.baseProfile).toFixed(2), Math.max(...frame.baseProfile).toFixed(2));
console.log('gaps min/max', Math.min(...frame.gapsMm).toFixed(2), Math.max(...frame.gapsMm).toFixed(2));
console.log('under max', Math.max(...frame.underExpansionPct).toFixed(1));
console.log('stiffness max', Math.max(...frame.stiffness).toFixed(2));
const rel = assessRelease(frame,valve,sizing.nominalMm,summary,sizing,DEFAULT_CONVENTIONS);
console.log('coronary L', rel.coronary.left, 'R', rel.coronary.right);
console.log('flags', rel.flags.map(f=>f.code+':'+f.value));
