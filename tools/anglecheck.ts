import { buildPhantomVolume, PHANTOM_PRESETS } from '../src/data/phantom';
import { computeMeasurement } from '../src/lib/measure';
import { DEFAULT_CONVENTIONS } from '../src/data/seed';
import { worldToPixel } from '../src/lib/geom';
import type { Contour } from '../src/lib/types';
const spec = PHANTOM_PRESETS[0];
const vol = buildPhantomVolume(spec);
const rot = (spec.ellipseRotationDeg*Math.PI)/180;
const contours: Contour[] = [];
for (let s=0;s<vol.depth;s++){
  const wz=vol.origin[2]+s*vol.spacing[2];
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
const sum = computeMeasurement(vol,{contours,landmarks:[]},DEFAULT_CONVENTIONS)!;
const calc = sum.calc!;
// find the sector with the max calcium and print its clock label + its world angle
let best=0, bi=0;
calc.sectors.forEach((s,i)=>{ if(s.volumeMm3>best){best=s.volumeMm3;bi=i;} });
const s=calc.sectors[bi];
console.log('hot sector index', bi, 'vol', best.toFixed(1), 'clock', s.clockStart, '-', s.clockEnd, 'startDeg', s.startDeg.toFixed(0));
// phantom nodule angles (world, atan2(y,x) degrees)
console.log('nodule angles', spec.nodules.map(n=>n.angleDeg));
// ring basisU angle in world XY
const u = sum.ring.basisU, v = sum.ring.basisV;
console.log('basisU', u.map(x=>x.toFixed(3)), 'angle', (Math.atan2(u[1],u[0])*180/Math.PI).toFixed(1));
console.log('basisV', v.map(x=>x.toFixed(3)), 'angle', (Math.atan2(v[1],v[0])*180/Math.PI).toFixed(1));

// verify every hot-sector label against the phantom's physical nodule positions
const toClockDeg = (worldDeg: number) => {
  // image frame: east = +x, anterior = -y (image rows increase downward)
  const east = Math.cos(worldDeg * Math.PI / 180);
  const anterior = -Math.sin(worldDeg * Math.PI / 180);
  const deg = Math.atan2(east, anterior) * 180 / Math.PI;
  return ((deg + 360) % 360) / 30;
};
console.log('nodule clock hours', spec.nodules.map(n => toClockDeg(n.angleDeg).toFixed(1)));
console.log('hot sectors (vol>20):', calc.sectors.filter(x=>x.volumeMm3>20).map(x=>`${x.index}:${x.clockStart}-${x.clockEnd}`).join(' '));
