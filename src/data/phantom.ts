import type { Vec3, Volume, VolumeMeta } from '../lib/types';

export interface PhantomSpec {
  id: string;
  patientLabel: string;
  studyDate: string;
  description: string;
  annulusZ: number;
  /** ellipse semi axes mm */
  semiMajor: number;
  semiMinor: number;
  ellipseRotationDeg: number;
  saddleMm: number;
  /** calcium blobs: angle in ring param, amplitude mm, sigma deg */
  nodules: { angleDeg: number; ampMm: number; sigmaDeg: number; strength: number }[];
  rootTiltDeg: number;
  coronaryLeftHeightMm: number;
  coronaryRightHeightMm: number;
  lvotNarrowing: number;
}

export const PHANTOM_PRESETS: PhantomSpec[] = [
  {
    id: 'phantom-tricuspid-a',
    patientLabel: 'PHANTOM-A / 三叶瓣 中重度钙化',
    studyDate: '2026-11-02',
    description: '三叶式主动脉瓣,瓣环椭圆 27.0×22.4 mm,瓣环区散在结节状钙化,冠状动脉开口高度充足。',
    annulusZ: 0,
    semiMajor: 13.5,
    semiMinor: 11.2,
    ellipseRotationDeg: 18,
    saddleMm: 2.4,
    rootTiltDeg: 6,
    coronaryLeftHeightMm: 13.2,
    coronaryRightHeightMm: 15.6,
    lvotNarrowing: 0.055,
    nodules: [
      { angleDeg: 42, ampMm: 2.6, sigmaDeg: 20, strength: 1.0 },
      { angleDeg: 128, ampMm: 1.6, sigmaDeg: 14, strength: 0.8 },
      { angleDeg: 236, ampMm: 2.1, sigmaDeg: 18, strength: 0.9 },
      { angleDeg: 310, ampMm: 1.1, sigmaDeg: 12, strength: 0.7 },
    ],
  },
  {
    id: 'phantom-bicuspid-b',
    patientLabel: 'PHANTOM-B / 二叶式 重度钙化 低冠脉',
    studyDate: '2026-11-05',
    description: '二叶式主动脉瓣,瓣环 30.2×25.6 mm,右冠窦重度钙化,左冠开口高度偏低,需评估冠脉阻塞风险。',
    annulusZ: 0,
    semiMajor: 15.1,
    semiMinor: 12.8,
    ellipseRotationDeg: 64,
    saddleMm: 3.4,
    rootTiltDeg: 9,
    coronaryLeftHeightMm: 9.4,
    coronaryRightHeightMm: 11.2,
    lvotNarrowing: 0.038,
    nodules: [
      { angleDeg: 8, ampMm: 3.4, sigmaDeg: 26, strength: 1.0 },
      { angleDeg: 180, ampMm: 2.2, sigmaDeg: 18, strength: 0.85 },
      { angleDeg: 300, ampMm: 1.4, sigmaDeg: 15, strength: 0.7 },
    ],
  },
];

interface RingGeometry {
  floorZ: number;
  ring: Vec3[];
  bodyRadius: (z: number, theta: number) => number;
}

const DEG = Math.PI / 180;

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function buildRingGeometry(spec: PhantomSpec): RingGeometry {
  const n = 720;
  const ring: Vec3[] = [];
  const rot = spec.ellipseRotationDeg * DEG;
  const cosR = Math.cos(rot);
  const sinR = Math.sin(rot);
  for (let i = 0; i < n; i++) {
    const th = (i / n) * Math.PI * 2;
    const lx = spec.semiMajor * Math.cos(th);
    const ly = spec.semiMinor * Math.sin(th);
    const x = lx * cosR - ly * sinR;
    const y = lx * sinR + ly * cosR;
    const z = spec.annulusZ + spec.saddleMm * Math.sin(2 * th + 0.35);
    ring.push([x, y, z]);
  }
  const tilt = spec.rootTiltDeg * DEG;
  const bodyRadius = (z: number, theta: number) => {
    const dz = z - spec.annulusZ;
    const cosT = Math.cos(theta);
    const sinT = Math.sin(theta);
    // elliptical base slightly rotated with height (root torsion)
    const a = spec.semiMajor;
    const b = spec.semiMinor;
    const base = 1 / Math.sqrt((cosT / a) ** 2 + (sinT / b) ** 2);
    let r: number;
    if (dz < 0) {
      r = base * (1 + dz * spec.lvotNarrowing * 0.35) - Math.min(0, dz) * 0.004;
    } else {
      const sinus = 6.2 * Math.exp(-(((dz - 11) / 8.0) ** 2)) * (0.8 + 0.2 * Math.cos(theta * 2));
      r = base + sinus;
    }
    const tiltShift = Math.tan(tilt) * cosT * 2.0;
    return r + tiltShift * 0.15;
  };
  return { floorZ: spec.annulusZ, ring, bodyRadius };
}

export function buildPhantomVolume(spec: PhantomSpec): Volume {
  const width = 260;
  const height = 260;
  const depth = 128;
  const spacing: Vec3 = [0.7, 0.7, 0.7];
  const origin: Vec3 = [
    (-width * spacing[0]) / 2,
    (-height * spacing[1]) / 2,
    -48,
  ];
  const voxels = new Int16Array(width * height * depth);
  const geom = buildRingGeometry(spec);
  const { bodyRadius } = geom;
  const z0 = spec.annulusZ;


  // Analytic distance to the annulus ring: rotate into the ellipse frame,
  // recover the ellipse parameter, then compare against that ring point in 3D.
  const rotRad = (spec.ellipseRotationDeg * Math.PI) / 180;
  const cosR = Math.cos(rotRad);
  const sinR = Math.sin(rotRad);
  const ringPointAt = (theta: number): [number, number, number] => {
    const lx = spec.semiMajor * Math.cos(theta);
    const ly = spec.semiMinor * Math.sin(theta);
    return [
      lx * cosR - ly * sinR,
      lx * sinR + ly * cosR,
      z0 + spec.saddleMm * Math.sin(2 * theta + 0.35),
    ];
  };
  const approxRingDistance = (wx: number, wy: number, wz: number): { dist: number; theta: number } => {
    const lu = wx * cosR + wy * sinR;
    const lv = -wx * sinR + wy * cosR;
    const theta = Math.atan2(lv / spec.semiMinor, lu / spec.semiMajor);
    const rp = ringPointAt(theta);
    return { dist: Math.hypot(wx - rp[0], wy - rp[1], wz - rp[2]), theta };
  };
  void buildRingGeometry;

  // The static thorax is identical on every slice, so evaluate it once.
  const bg = new Float32Array(width * height);
  for (let y = 0; y < height; y++) {
    const wy = origin[1] + y * spacing[1];
    for (let x = 0; x < width; x++) {
      const wx = origin[0] + x * spacing[0];
      const r = Math.hypot(wx, wy);
      const theta = Math.atan2(wy, wx);
      let hu = -78;
      const lungMask = smoothstep(60, 71, r) * (1 - smoothstep(80, 87, r) * 0.9);
      hu = hu * (1 - lungMask) + -840 * lungMask;
      const fatOuter = smoothstep(86, 90, r);
      hu = hu * (1 - fatOuter) + -85 * fatOuter;
      const muscle = smoothstep(92, 95, r);
      hu = hu * (1 - muscle) + 62 * muscle;
      const ribAng = Math.sin(theta * 7 + 0.12);
      const ribBand = smoothstep(3.6, 0.4, Math.abs(r - 84)) * smoothstep(0.1, 0.62, ribAng);
      const stern = smoothstep(4.0, 1.2, Math.hypot(wx * 0.9, wy - 88));
      const rib = Math.max(ribBand, stern);
      hu = hu * (1 - rib * 0.92) + 610 * rib * 0.92;
      const vert = smoothstep(13, 11, Math.hypot(wx - 6, wy + 62));
      hu = hu * (1 - vert) + 430 * vert;
      const canal = smoothstep(5, 4, Math.hypot(wx - 6, wy + 73));
      hu = hu * (1 - canal) + 40 * canal;
      const descAorta = smoothstep(10.5, 8.6, Math.hypot(wx + 30, wy + 46));
      hu = hu * (1 - descAorta * 0.8) + 330 * descAorta * 0.8;
      bg[y * width + x] = hu;
    }
  }

  const noduleLut = spec.nodules.map((nd) => {
    const sigma = nd.sigmaDeg;
    return { ...nd, invSigma2: 1 / (2 * sigma * sigma) };
  });
  const ostia = [
    { h: spec.coronaryLeftHeightMm, ang: 52 * DEG },
    { h: spec.coronaryRightHeightMm, ang: 152 * DEG },
  ].map((c) => {
    const cz = z0 + c.h;
    const rbAt = bodyRadius(cz, c.ang);
    return {
      cz,
      cx: Math.cos(c.ang) * rbAt,
      cy: Math.sin(c.ang) * rbAt,
      dirx: Math.cos(c.ang + 0.5),
      diry: Math.sin(c.ang + 0.5),
    };
  });
  const radiusLut = new Float32Array(360);
  for (let z = 0; z < depth; z++) {
    const wz = origin[2] + z * spacing[2];
    const dz = wz - z0;
    const nearAnnulus = Math.abs(dz) < 9;
    for (let k = 0; k < 360; k++) radiusLut[k] = bodyRadius(wz, (k / 360) * Math.PI * 2 - Math.PI);
    const zBase = z * height * width;
    for (let y = 0; y < height; y++) {
      const wy = origin[1] + y * spacing[1];
      for (let x = 0; x < width; x++) {
        const wx = origin[0] + x * spacing[0];
        const r = Math.hypot(wx, wy);
        const theta = Math.atan2(wy, wx);
        let hu = bg[y * width + x];
        // pulmonary artery trunk (anterior-left), only in the upper half
        if (dz > -4 && dz < 30) {
          const pa = smoothstep(11, 9, Math.hypot(wx + 22, wy - 26)) * smoothstep(30, 22, dz);
          hu = hu * (1 - pa * 0.75) + 320 * pa * 0.75;
        }

        if (Math.abs(dz) < 44) {
          const rb = radiusLut[Math.round((((theta + Math.PI) / (Math.PI * 2)) * 360) % 360)];
          const wall = rb + 2.4;
          // blood pool
          const lumenInside = smoothstep(rb + 0.9, rb - 0.9, r);
          hu = hu * (1 - lumenInside) + 352 * lumenInside;
          // aortic wall / annulus fibrosus (thin, denser than pool)
          const wallBand = smoothstep(wall + 0.9, rb - 0.4, r) - lumenInside;
          const wallW = Math.max(0, Math.min(1, wallBand)) * 0.85;
          hu = hu * (1 - wallW) + 118 * wallW;
          // LV myocardium below the annulus
          if (dz < -5) {
            const outer = rb + 12 + Math.min(4, Math.max(0, -dz - 5) * 0.22);
            const myo = smoothstep(outer, wall, r) * smoothstep(-5, -12, dz);
            hu = hu * (1 - myo * 0.92) + 52 * myo * 0.92;
          }
          // sinuses of Valsalva: three subtle bulges above the annulus
          if (dz > 2 && dz < 20) {
            const sin = Math.sin(theta * 3 + 1.1);
            const bulge = Math.max(0, sin) * Math.exp(-(((dz - 11) / 7) ** 2)) * 1.7;
            const ring = smoothstep(bulge + 1.2, 0, Math.abs(r - (rb + bulge))) * 0.5;
            hu = hu * (1 - ring) + 352 * ring;
          }
        } else if (dz < -44) {
          hu = hu * 0.85 + 45;
        }

        if (nearAnnulus) {
          const { dist: minD } = approxRingDistance(wx, wy, wz);
          if (minD < 4.2) {
            // Nodular calcium only: a real annulus is focally calcified, not
            // uniformly ring-shaped, so no continuous ribbon is added.
            const angDeg = theta * 57.2957795;
            let calc = 0;
            for (let ni = 0; ni < noduleLut.length; ni++) {
              const nd = noduleLut[ni];
              const dAng = ((angDeg - nd.angleDeg + 540) % 360) - 180;
              const angW = Math.exp(-(dAng * dAng) * nd.invSigma2);
              if (angW < 0.01) continue;
              // the nodule sits astride the annulus, peaking slightly outside it
              const peak = 0.55;
              const radialW = Math.exp(-((minD - peak) ** 2) / (2 * nd.ampMm * nd.ampMm * 0.42));
              const v = angW * radialW * nd.strength;
              if (v > calc) calc = v;
            }
            if (calc > 0.02) hu = hu * (1 - calc) + (820 + 400 * calc) * calc;
          }
        }

        // coronary ostia: contrast-filled lumen with a short vessel stub that
        // runs radially outward, which is what the reader traces on CT.
        for (let oi = 0; oi < ostia.length; oi++) {
          const c = ostia[oi];
          if (Math.abs(wz - c.cz) > 6) continue;
          const dx = wx - c.cx;
          const dy = wy - c.cy;
          const along = dx * c.dirx + dy * c.diry;
          const across = -dx * c.diry + dy * c.dirx;
          const dzHere = wz - c.cz;
          const lumenR = 2.1;
          if (along < -2.5 || along > 11) continue;
          // vessel axis follows the radial direction and rises slightly
          const axisZ = c.cz + Math.max(0, along) * 0.22;
          const d = Math.hypot(across, wz - axisZ);
          if (d > lumenR + 1.5) continue;
          const stubW = smoothstep(11, 6, along);
          const lumen = smoothstep(lumenR + 0.5, lumenR - 0.6, d) * stubW;
          hu = hu * (1 - lumen * 0.95) + 372 * lumen * 0.95;
          const wall = (smoothstep(lumenR + 1.5, lumenR + 0.2, d) - lumen) * stubW;
          if (wall > 0.02) hu = hu * (1 - wall * 0.8) + 126 * wall * 0.8;
          void dzHere;
        }

        // deterministic hash noise (mild, correlated by 2mm cells)
        const cell = ((x >> 1) * 73856093) ^ ((y >> 1) * 19349663) ^ ((z >> 1) * 83492791);
        const hsh = ((cell ^ (cell >>> 13)) * 1274126177) & 0xffff;
        const noise = (hsh / 65535 - 0.5) * 34;
        voxels[zBase + y * width + x] = Math.round(Math.max(-1024, hu + noise));
      }
    }
  }

  const meta: VolumeMeta = {
    id: spec.id,
    width,
    height,
    depth,
    spacing,
    origin,
    axisU: [1, 0, 0],
    axisV: [0, 1, 0],
    normal: [0, 0, 1],
    minHU: -900,
    maxHU: 1500,
    description: spec.description,
    studyDate: spec.studyDate,
    patientLabel: spec.patientLabel,
    source: 'synthetic',
  };
  return { ...meta, voxels };
}

export function phantomCoronaryPoints(spec: PhantomSpec): { left: Vec3; right: Vec3 } {
  const geom = buildRingGeometry(spec);
  const z0 = spec.annulusZ;
  const pt = (h: number, ang: number): Vec3 => {
    const cz = z0 + h;
    const rb = geom.bodyRadius(cz, ang);
    return [Math.cos(ang) * rb, Math.sin(ang) * rb, cz];
  };
  return {
    left: pt(spec.coronaryLeftHeightMm, 52 * DEG),
    right: pt(spec.coronaryRightHeightMm, 152 * DEG),
  };
}
