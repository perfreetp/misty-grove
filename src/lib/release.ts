import type {
  Conventions,
  ReleaseFlag,
  ReleaseResult,
  RingMetrics,
  SizingResult,
  ValveModel,
  CalcDistribution,
  MeasurementSummary,
  Vec3,
} from './types';
import { add, dot, scale, sub } from './geom';

export interface FrameGeometry {
  /** ring parameter samples (0..2π) */
  theta: number[];
  /** per-theta radius of the deployed frame at each of `levels` heights */
  radii: number[][];
  /** heights relative to annulus plane, mm (0 = annulus, negative = LVOT) */
  levels: number[];
  /** base (annulus) radius profile */
  baseProfile: number[];
  /** undeformed nominal radius profile */
  nominalProfile: number[];
  /** per-theta radial stiffness load 0..1 (from calcium) */
  stiffness: number[];
  underExpansionPct: number[];
  gapsMm: number[];
  maxRadius: number;
  minRadius: number;
}

export function valveLabel(v: ValveModel, nominal: number): string {
  return v.sizes.find((s) => s.nominalMm === nominal)?.label ?? `${nominal} mm`;
}

export function nearestSize(v: ValveModel, targetDiameter: number): { nominalMm: number; label: string } {
  let best = v.sizes[0];
  let bestDiff = Infinity;
  for (const s of v.sizes) {
    const d = Math.abs(s.nominalMm - targetDiameter);
    if (d < bestDiff) {
      bestDiff = d;
      best = s;
    }
  }
  return best;
}

export function computeSizing(
  summary: MeasurementSummary,
  valve: ValveModel,
  conventions: Conventions,
): SizingResult {
  const refRaw = conventions.sizingReference === '面积派生径' ? summary.ring.dAreaMm : summary.ring.dPerimMm;
  const ref = conventions.sizingReference === '面积派生径' ? summary.ring.dAreaMm : summary.ring.dPerimMm;
  const target = ref * (1 + conventions.targetOversizePct / 100);
  const size = nearestSize(valve, target);
  const oversize = ((size.nominalMm - refRaw) / refRaw) * 100;
  const withinRange = oversize >= conventions.minOversizePct && oversize <= conventions.maxOversizePct;
  return {
    valveModelId: valve.id,
    valveModelName: `${valve.brand} ${valve.name}`,
    valveLabel: size.label,
    nominalMm: size.nominalMm,
    refDiameterMm: ref,
    refBasis: conventions.sizingReference,
    oversizePct: oversize,
    recommendedNominalMm: size.nominalMm,
    recommendedLabel: size.label,
    withinRange,
    computedAt: Date.now(),
  };
}

/** Radial-force driven deployment. */
export function simulateDeployment(
  valve: ValveModel,
  nominalMm: number,
  ring: RingMetrics,
  calc: CalcDistribution | null,
  conventions: Conventions,
  depthMm: number,
  lvotDiameterMm = 0,
): FrameGeometry {
  const n = 72;
  const theta = Array.from({ length: n }, (_, i) => (i / n) * Math.PI * 2);
  const nominalRadius = nominalMm / 2;

  const sampleRadius = (deg: number) => {
    const bins = ring.radiusProfile.length;
    const t = ((deg % 360) + 360) % 360;
    const f = (t / 360) * bins;
    const i0 = Math.floor(f) % bins;
    const i1 = (i0 + 1) % bins;
    const w = f - Math.floor(f);
    return ring.radiusProfile[i0] * (1 - w) + ring.radiusProfile[i1] * w;
  };

  const sectorCount = calc?.sectors.length ?? 0;
  const calcLoad = theta.map((th) => {
    if (!calc || !sectorCount) return 0;
    const deg = ((th * 180) / Math.PI + 360) % 360;
    const si = Math.min(sectorCount - 1, Math.floor((deg / 360) * sectorCount));
    const s = calc.sectors[si];
    const norm = Math.min(1, s.burden * 1.15);
    return norm;
  });

  const baseProfile = theta.map((th) => sampleRadius((th * 180) / Math.PI));
  const stiffness = calcLoad.map((c) => Math.min(1, c * conventions.calcStiffnessGain));

  const lvotRadius = lvotDiameterMm / 2;
  const lvotRadiusAt = (z: number) => {
    if (lvotDiameterMm <= 0 || z >= 0) return 0;
    const t = Math.min(1, Math.abs(z) / Math.max(4, conventions.lvotOffsetMm + 6));
    // outflow tract tapers toward the LV
    return lvotRadius * (1 + t * 0.06);
  };

  // Aortic root above the annulus: sinus of Valsalva bulge (≈ +18 %) peaking
  // ~12 mm up, then the sinotubular junction narrows again.
  // Aortic root: annulus radius + wall, sinus bulge (~+22 %) around 11 mm,
  // then the sinotubular junction narrows toward the ascending aorta.
  const aortWallRadiusAt = (z: number, i: number) => {
    // Outer wall contour; the frame contacts the inner surface ~1.8 mm inside.
    const base = baseProfile[i] + 1.2;
    if (z <= 0) return base;
    const sinus = 1 + 0.34 * Math.exp(-(((z - 11) / 9) ** 2));
    const stj = z > 28 ? 1 - Math.min(0.10, (z - 28) * 0.005) : 1;
    return base * sinus * stj;
  };

  const skirtHeight = Math.min(valve.skirtHeightMm, valve.frameHeightMm);
  const levels: number[] = [];
  const levelCount = 13;
  for (let i = 0; i < levelCount; i++) {
    levels.push(-depthMm + (i / (levelCount - 1)) * (valve.frameHeightMm + depthMm));
  }

  // Radial force → contact pressure. Higher force / softer wall = deeper engagement.
  const force = valve.radialForceNPerMm;
  const penetrationBase = 0.55 + Math.min(1.6, force / 0.55);
  const profileShape = (rel: number) => {
    // rel: 0 at the annulus, negative into the LVOT, positive up the frame
    const t = Math.min(1, rel / Math.max(1e-6, valve.frameHeightMm));
    if (rel <= 0) {
      // the ventricular end tapers in, like every self-expanding frame
      const below = Math.min(1, -rel / Math.max(1e-6, depthMm));
      return valve.shape === 'straight' ? 1 - 0.02 * below : 1 - 0.14 * below * below;
    }
    if (valve.shape === 'flare') return 1 + 0.11 * t * t;
    if (valve.shape === 'taper') return 1 - 0.06 * t;
    return 1;
  };

  // Deployed radius per angle/level.
  //  1. In the annulus band the frame is constrained by the wall: it opens to
  //     the local wall radius plus a radial-force-dependent penetration. A
  //     calcified sector is stiffer, so the frame opens *less* there.
  //  2. Away from the annulus the frame relaxes to its free (nominal) shape,
  //     blended smoothly so the barrel does not show a step.
  //  3. Below the annulus the LVOT limits expansion.
  const annulusContact = (i: number, z: number): number => {
    const a = baseProfile[i];
    const c = stiffness[i];
    const compressibility = 1 - 0.7 * c;
    const penetration = penetrationBase * compressibility;
    return Math.max(0.4, a + penetration - 0.9 * c) * (1 - 0.03 * Math.min(1, Math.abs(z) / Math.max(1e-6, skirtHeight + 4)));
  };

  const radii: number[][] = levels.map((z) => {
    return theta.map((_, i) => {
      const freeR = nominalRadius * profileShape(z);
      // contact influence falls off over ~8 mm either side of the annulus
      const w = Math.exp(-((z / 9) ** 2));
      let r = freeR * (1 - w) + annulusContact(i, z) * w;
      // Above the annulus the frame presses against the aortic root / sinotubular
      // junction; it can never expand beyond the vessel wall there.
      if (z > 0) {
        const wall = aortWallRadiusAt(z, i) + penetrationBase * 0.5 * (1 - 0.7 * stiffness[i]);
        r = Math.min(r, wall);
      }
      if (z < 0 && lvotRadiusAt(z) > 0) r = Math.min(r, Math.max(lvotRadiusAt(z) + 0.4, freeR * 0.96));
      return Math.max(0.4, r);
    });
  });

  const annulusLevel = levels.reduce((best, z, i) => (Math.abs(z) < Math.abs(levels[best]) ? i : best), 0);
  const baseRing = radii[annulusLevel] ?? radii[0];
  const nominalAtAnnulus = nominalRadius * profileShape(levels[annulusLevel]);
  // Underexpansion = how far the frame sits below its own nominal diameter.
  const underExpansionPct = baseRing.map((r) => Math.max(0, ((nominalAtAnnulus - r) / nominalAtAnnulus) * 100));
  // Paravalvular gap = residual space between frame and annular wall. Where the
  // frame opens wider than the wall there is no gap (the wall is compressed);
  // where calcium or an undersized valve keeps it inside the wall, a gap remains.
  const gapsMm = baseRing.map((r, i) => Math.max(0, baseProfile[i] - r));

  let maxRadius = 0;
  let minRadius = Infinity;
  for (const row of radii) {
    for (const r of row) {
      if (r > maxRadius) maxRadius = r;
      if (r < minRadius) minRadius = r;
    }
  }

  return {
    theta,
    radii,
    levels,
    baseProfile,
    nominalProfile: baseRing.map(() => nominalRadius),
    stiffness,
    underExpansionPct,
    gapsMm,
    maxRadius,
    minRadius,
  };
}

export function assessRelease(
  frame: FrameGeometry,
  valve: ValveModel,
  nominalMm: number,
  summary: MeasurementSummary,
  sizing: SizingResult,
  conventions: Conventions,
): ReleaseResult {
  const n = frame.theta.length;
  const gaps = frame.gapsMm;
  const pvlThreshold = conventions.pvlGapMm;
  const pvlSectors: number[] = [];
  for (let i = 0; i < n; i++) if (gaps[i] >= pvlThreshold) pvlSectors.push(i);
  // merge contiguous sectors into arcs
  let arcCount = pvlSectors.length;
  if (pvlSectors.length > 1 && pvlSectors.length < n) {
    // count distinct arcs (circular)
    let breaks = 0;
    for (let i = 0; i < n; i++) {
      const cur = pvlSectors.includes(i);
      const prev = pvlSectors.includes((i - 1 + n) % n);
      if (cur && !prev) breaks++;
    }
    arcCount = Math.max(1, breaks);
  }
  const pvlArcPct = (pvlSectors.length / n) * 100;
  const maxGap = Math.max(...gaps);
  const meanGap = gaps.reduce((a, b) => a + b, 0) / n;
  void arcCount;

  /** Frame ring nearest a given height above the annulus. */
  const frameRel = (z: number): { row: number[]; z: number } => {
    let best = 0;
    let bestD = Infinity;
    for (let i = 0; i < frame.levels.length; i++) {
      const d = Math.abs(frame.levels[i] - z);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }
    return { row: frame.radii[best], z: frame.levels[best] };
  };

  // Coronary obstruction risk: the frame only threatens an ostium when the
  // ostium lies within the frame's risk zone (its skirted / flared height) and
  // the frame surface at that height reaches out near the ostium.
  const coronarySide = (metric: MeasurementSummary['coronaries']['left']) => {
    if (!metric) return { distanceMm: null, heightMm: null, verticalClearanceMm: null, ok: true };
    const rel = sub(metric.point, summary.ring.center);
    const px = dot(rel, summary.ring.basisU);
    const py = dot(rel, summary.ring.basisV);
    const ostialRadius = Math.hypot(px, py);
    const ang = Math.atan2(py, px);
    const height = metric.heightMm;
    const n = frame.theta.length;
    const idx = ((Math.round((((ang + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2)) * n) % n) + n) % n;
    // highest frame level that is at or below the ostium
    const clampH = Math.max(0, Math.min(valve.riskZoneHeightMm, height));
    const { row, z } = frameRel(clampH);
    const frameAt = row[idx];
    // 3D distance from the ostium centre to the frame surface at that height
    const radialGap = ostialRadius - frameAt;
    const verticalGap = Math.abs(height - z);
    // Clearance = frame surface to the ostium *centre* (the convention the
    // reporting template uses); the ostium radius is shown alongside so the
    // reader can judge edge-to-frame clearance.
    const clearance = radialGap;
    const distance = Math.hypot(Math.max(0, clearance), height > z ? 0 : verticalGap);
    const vertical = height - valve.riskZoneHeightMm;
    // An ostium at or below the annulus plane was almost certainly marked on
    // the wrong structure: never report that as safe.
    const belowAnnulus = height < 0;
    const lowHeight = height < conventions.ostiumHeightMinMm;
    const tight = clearance < conventions.frameClearanceMinMm;
    // Low ostium is only compensated by real clearance when it sits above the
    // frame's coronary risk zone; otherwise the frame skirt covers it.
    const ok = !belowAnnulus && !lowHeight && (!tight || height > valve.riskZoneHeightMm);
    return {
      distanceMm: clearance,
      heightMm: height,
      verticalClearanceMm: vertical,
      ok,
      distance3dMm: distance,
      belowAnnulus,
      lowHeight,
    };
  };

  const left = coronarySide(summary.coronaries.left);
  const right = coronarySide(summary.coronaries.right);

  const frameTop = valve.frameHeightMm;
  const depth = Math.min(valve.frameHeightMm * 0.42, Math.max(4, valve.frameHeightMm * 0.35));

  const flags: ReleaseFlag[] = [];
  if (!sizing.withinRange) {
    if (sizing.oversizePct > conventions.maxOversizePct) {
      flags.push({
        code: 'oversize-high',
        severity: 'warn',
        title: '型号偏大',
        detail: `选用 ${nominalMm} mm 型号,相对瓣环${sizing.refBasis} ${sizing.refDiameterMm.toFixed(1)} mm 过度扩张 ${sizing.oversizePct.toFixed(1)}%,超出 ${conventions.maxOversizePct}% 上限,存在瓣环破裂与传导阻滞风险。`,
        value: `${sizing.oversizePct.toFixed(1)}%`,
      });
    } else if (sizing.oversizePct < conventions.minOversizePct) {
      flags.push({
        code: 'oversize-low',
        severity: 'warn',
        title: '型号偏小',
        detail: `选用 ${nominalMm} mm 型号,相对瓣环${sizing.refBasis} ${sizing.refDiameterMm.toFixed(1)} mm 仅 ${sizing.oversizePct.toFixed(1)}%,低于 ${conventions.minOversizePct}% 下限,瓣周漏与瓣架移位风险升高。`,
        value: `${sizing.oversizePct.toFixed(1)}%`,
      });
    }
  }
  {
    if (!left.ok) {
      flags.push({
        code: 'coronary-left',
        severity: 'warn',
        title: left.belowAnnulus ? '左冠开口标记异常' : '左冠开口净距不足',
        detail: left.belowAnnulus
          ? `左冠开口高度为 ${left.heightMm?.toFixed(1)} mm,位于瓣环平面以下,请回到测量台在长轴视图重新标记开口中心。`
          : `左冠开口高度 ${left.heightMm?.toFixed(1) ?? '—'} mm,瓣架表面至开口净距 ${left.distanceMm?.toFixed(1) ?? '—'} mm(阈值 ${conventions.frameClearanceMinMm} mm / 高度 ${conventions.ostiumHeightMinMm} mm)。`,
        value: `${left.distanceMm?.toFixed(1)} mm`,
      });
    }
    if (!right.ok) {
      flags.push({
        code: 'coronary-right',
        severity: 'warn',
        title: right.belowAnnulus ? '右冠开口标记异常' : '右冠开口净距不足',
        detail: right.belowAnnulus
          ? `右冠开口高度为 ${right.heightMm?.toFixed(1)} mm,位于瓣环平面以下,请回到测量台在长轴视图重新标记开口中心。`
          : `右冠开口高度 ${right.heightMm?.toFixed(1) ?? '—'} mm,瓣架表面至开口净距 ${right.distanceMm?.toFixed(1) ?? '—'} mm(阈值 ${conventions.frameClearanceMinMm} mm / 高度 ${conventions.ostiumHeightMinMm} mm)。`,
        value: `${right.distanceMm?.toFixed(1)} mm`,
      });
    }
  }
  if (pvlArcPct >= 5 || maxGap >= pvlThreshold) {
    flags.push({
      code: 'pvl',
      severity: 'warn',
      title: '瓣周漏风险区',
      detail: `瓣架与瓣环贴合间隙达到 ${pvlThreshold} mm 的弧段占 ${pvlArcPct.toFixed(0)}%(最大 ${maxGap.toFixed(2)} mm),建议结合钙化分布调整型号或考虑后扩。`,
      value: `${pvlArcPct.toFixed(0)}%`,
    });
  }
  const maxUnder = Math.max(...frame.underExpansionPct);
  if (maxUnder > 12) {
    flags.push({
      code: 'under-expansion',
      severity: 'warn',
      title: '瓣架膨胀不全',
      detail: `钙化最重区域瓣架欠膨胀 ${maxUnder.toFixed(1)}%,径向力 ${valve.radialForceNPerMm} N/mm 未能充分撑开,需评估球囊后扩张。`,
      value: `${maxUnder.toFixed(1)}%`,
    });
  }
  if (flags.length === 0) {
    flags.push({
      code: 'ok',
      severity: 'info',
      title: '释放参数在口径范围内',
      detail: `型号 ${nominalMm} mm、过度扩张 ${sizing.oversizePct.toFixed(1)}%、最大贴合间隙 ${maxGap.toFixed(2)} mm、冠脉净距正常。`,
    });
  }

  return {
    radiusProfile: frame.radii[frame.levels.findIndex((z) => Math.abs(z) < 0.001)] ?? frame.radii[0],
    underExpansionPct: frame.underExpansionPct,
    gapsMm: frame.gapsMm,
    pvlSectors,
    pvlArcPct,
    maxGapMm: maxGap,
    meanGapMm: meanGap,
    coronary: { left, right },
    flags,
    depthMm: depth,
    frameTopAboveAnnulusMm: frameTop,
    computedAt: Date.now(),
  };
}

export function ringPointAt(summary: MeasurementSummary, theta: number): Vec3 {
  const bins = summary.ring.radiusProfile.length;
  const t = ((theta % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  const f = (t / (Math.PI * 2)) * bins;
  const i0 = Math.floor(f) % bins;
  const i1 = (i0 + 1) % bins;
  const w = f - Math.floor(f);
  const r = summary.ring.radiusProfile[i0] * (1 - w) + summary.ring.radiusProfile[i1] * w;
  return add(
    summary.ring.center,
    add(scale(summary.ring.basisU, Math.cos(t) * r), scale(summary.ring.basisV, Math.sin(t) * r)),
  );
}

export function gapColor(gap: number, threshold: number): string {
  if (gap >= threshold) return '#ef4444';
  if (gap >= threshold * 0.7) return '#f59e0b';
  if (gap >= threshold * 0.4) return '#facc15';
  return '#22c55e';
}

export { distanceToRing } from './measure';
