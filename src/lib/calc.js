// 制动床验算与几何计算核心模块
// 依据:《公路交通安全设施设计规范》(JTG D81) 及避险车道设计细则的常用计算方法

export const RAMP_TYPES = {
  uphill: {
    name: '上坡式',
    fric: 0.10,        // 滚动阻力系数(级配碎石路面)
    grade: 10.0,       // 制动床纵坡 %(上坡为正)
    desc: '利用上坡坡度与滚动阻力减速,地形条件允许时优先采用'
  },
  sand: {
    name: '砂床式',
    fric: 0.25,        // 松散砂砾集料
    grade: 3.0,
    desc: '松散砂砾集料制动床,滚动阻力大,长度较短'
  },
  net: {
    name: '网索式',
    fric: 0.45,        // 网索拦截系统等效减速度折算
    grade: 2.0,
    desc: '网索(拦截网)系统,受地形限制小、所需长度最短'
  }
};

export const VEHICLES = {
  heavyTruck: { name: '重型货车', load: 49, v0: 100, width: 8.0 },
  medTruck:  { name: '中型货车', load: 18, v0: 90,  width: 6.0 },
  bus:        { name: '大型客车', load: 15, v0: 95,  width: 6.0 }
};

export const STATUS = {
  draft:    { name: '拟定',   color: '#f59e0b', next: 'review',  nextLabel: '提交养护科/交警联审' },
  review:   { name: '联审中', color: '#3b82f6', next: 'approved', nextLabel: '联审通过,批复' },
  approved: { name: '已批复', color: '#22c55e', next: 'built',    nextLabel: '确认建成' },
  built:    { name: '已建成', color: '#9ca3af', next: null,       nextLabel: null }
};

export const MIN_BED_LENGTH = 120;   // 制动床长度控制下限 (m)
export const SIGHT_CURVE_RADIUS = 450; // 小于该半径的平曲线视为遮挡视距的弯道 (m)

// 桩号格式化: 43200 -> "K43+200"
export function stakeText(m) {
  const v = Math.round(m);
  return 'K' + Math.floor(v / 1000) + '+' + String(v % 1000).padStart(3, '0');
}

export function parseStake(s) {
  const m = String(s).trim().match(/^[Kk]?(\d+)(?:\+(\d+(?:\.\d+)?))?$/);
  if (!m) return NaN;
  return parseInt(m[1], 10) * 1000 + (m[2] ? parseFloat(m[2]) : 0);
}

// 由纵断面(桩号/坡度/坡长/平曲线半径)构建三维主线线位,每 step 米一个采样点
export function buildAlignment(profile, step = 20) {
  const pts = [];
  let x = 0, z = 0, heading = 0, y = 1000; // 假设起点高程 1000m
  let stake = profile.length ? profile[0].stakeM : 0;
  pts.push({ stakeM: stake, x, y, z, grade: profile[0]?.grade ?? 0, radius: 0, heading });
  for (const seg of profile) {
    const n = Math.max(1, Math.round(seg.length / step));
    const ds = seg.length / n;
    for (let i = 0; i < n; i++) {
      const r = seg.radius || 0;
      const dh = r !== 0 ? ds / r : 0;
      heading += dh / 2;
      x += Math.sin(heading) * ds;
      z += Math.cos(heading) * ds;
      y += (seg.grade / 100) * ds;
      heading += dh / 2;
      stake += ds;
      pts.push({ stakeM: stake, x, y, z, grade: seg.grade, radius: r, heading });
    }
  }
  return pts;
}

export function gradeAt(profile, stakeM) {
  if (!profile.length) return 0;
  for (const seg of profile) {
    if (stakeM >= seg.stakeM && stakeM <= seg.stakeM + seg.length) return seg.grade;
  }
  return stakeM < profile[0].stakeM ? profile[0].grade : profile[profile.length - 1].grade;
}

// 制动床长度: L = V² / (254 × (f + i)),V km/h,f 滚动阻力系数,i 制动床纵坡(小数,上坡为正)
export function calcBedLength(v0, fric, gradePct) {
  const denom = 254 * (fric + gradePct / 100);
  if (denom <= 0) return Infinity;
  return v0 * v0 / denom;
}

// 入口视距要求: 反应距离 + 制动距离(下坡取 φ−i)
export function requiredSightDistance(v0, mainGradePct) {
  const t = 2.5, phi = 0.29;
  const i = Math.abs(mainGradePct) / 100;
  const denom = 254 * Math.max(0.05, phi - i);
  return (v0 / 3.6) * t + (v0 * v0) / denom;
}

// 沿主线向上游检查视距是否被小半径弯道遮挡
export function sightCheck(alignment, stakeM, v0, mainGrade) {
  const required = requiredSightDistance(v0, mainGrade);
  let blocker = null;
  for (let i = alignment.length - 1; i >= 0; i--) {
    const p = alignment[i];
    if (p.stakeM > stakeM) continue;
    if (stakeM - p.stakeM > required) break;
    const r = Math.abs(p.radius || 0);
    if (r > 0 && r < SIGHT_CURVE_RADIUS) { blocker = p; break; }
  }
  return { required, blocked: !!blocker, blockerStake: blocker ? blocker.stakeM : null, blockerRadius: blocker ? Math.abs(blocker.radius) : null };
}

// 场地可用长度: 自引道口沿主线向下游,至下一处避险车道、连续下坡终点(坡度>-1%)或路线终点
export function availableLength(profile, stakeM, allRamps, selfId) {
  const end = profile.length ? profile[profile.length - 1].stakeM + profile[profile.length - 1].length : stakeM;
  let limit = Math.min(end - stakeM, 600);
  for (const seg of profile) {
    const segEnd = seg.stakeM + seg.length;
    if (segEnd <= stakeM) continue;
    if (seg.grade >= -1) { limit = Math.min(limit, Math.max(0, seg.stakeM - stakeM)); break; }
  }
  for (const r of allRamps) {
    if (r.id !== selfId && r.stakeM > stakeM) limit = Math.min(limit, r.stakeM - stakeM);
  }
  return Math.max(0, Math.round(limit));
}

// 单个避险车道的完整验算
export function calcRamp(ramp, profile, alignment, allRamps) {
  const type = RAMP_TYPES[ramp.type];
  const veh = VEHICLES[ramp.vehicle];
  const fric = ramp.fric ?? type.fric;
  const bedGrade = ramp.bedGrade ?? type.grade;
  const v0 = ramp.v0;
  const mainGrade = gradeAt(profile, ramp.stakeM);

  const L_req = calcBedLength(v0, fric, bedGrade);
  const L_calc = Math.ceil(L_req / 5) * 5;                 // 向上取整至 5m
  const L_design = Math.max(MIN_BED_LENGTH, L_calc);        // 不小于 120m 控制
  const width = veh.width + (ramp.loadT > 40 ? 1.0 : 0);    // 超重加宽
  const sight = sightCheck(alignment, ramp.stakeM, v0, mainGrade);
  const available = availableLength(profile, ramp.stakeM, allRamps, ramp.id);

  const errors = [];
  if (L_calc < MIN_BED_LENGTH && available < MIN_BED_LENGTH) {
    errors.push(`制动床长度不足 ${MIN_BED_LENGTH}m(场地仅 ${available}m),请挪动位置`);
  } else if (available < L_design) {
    errors.push(`场地可用长度 ${available}m 小于设计长度 ${L_design}m,请挪动位置或更换型式`);
  }
  if (sight.blocked) {
    errors.push(`入口视距被 ${stakeText(sight.blockerStake)} 处 R=${sight.blockerRadius}m 弯道遮挡(需要 ${Math.ceil(sight.required)}m),请挪动位置`);
  }

  // 工程量估算
  const q = {};
  if (ramp.type === 'sand') {
    q['砂砾集料'] = Math.round(L_design * width * 0.6) + ' m³';
    q['路床挖方'] = Math.round(L_design * width * 1.0) + ' m³';
  } else if (ramp.type === 'uphill') {
    q['路基填方'] = Math.round(L_design * width * 1.5) + ' m³';
    q['制动床铺面'] = Math.round(L_design * width) + ' m²';
  } else {
    q['网索拦截系统'] = '1 套';
    q['混凝土基础'] = Math.round(width * 2.2) + ' m³';
  }
  q['波形护栏'] = Math.round(2 * (L_design + 20)) + ' m';
  q['标志标线'] = '1 项';

  const basis =
    `L=V²/(254(f+i))=${v0}²/(254×(${fric}+${(bedGrade / 100).toFixed(2)}))=${L_req.toFixed(1)}m,` +
    `取整${L_calc}m,按≥${MIN_BED_LENGTH}m控制取${L_design}m;宽${width}m(${veh.name}${ramp.loadT}t);` +
    `主线坡度${mainGrade}%,视距要求${Math.ceil(sight.required)}m${sight.blocked ? ',被弯道遮挡' : ',满足'}`;

  return { mainGrade, fric, bedGrade, L_req, L_calc, L_design, width, sight, available, errors, quantities: q, basis };
}

// 统计: 相邻间距 / 覆盖里程 / 覆盖失控车辆数
export function calcStats(ramps, results, profile, runawayRate) {
  const sorted = [...ramps].sort((a, b) => a.stakeM - b.stakeM);
  const start = profile.length ? profile[0].stakeM : 0;
  const end = profile.length ? profile[profile.length - 1].stakeM + profile[profile.length - 1].length : 0;
  let totalQ = {};
  const rows = sorted.map((r, i) => {
    const prev = i > 0 ? sorted[i - 1].stakeM : start;
    const next = i < sorted.length - 1 ? sorted[i + 1].stakeM : end;
    const zoneStart = i > 0 ? (prev + r.stakeM) / 2 : start;
    const zoneEnd = i < sorted.length - 1 ? (r.stakeM + next) / 2 : end;
    const zoneKm = Math.max(0, zoneEnd - zoneStart) / 1000;
    const covered = zoneKm * runawayRate;
    const res = results[r.id];
    if (res) {
      for (const [k, v] of Object.entries(res.quantities)) {
        const num = parseFloat(v);
        if (!isNaN(num)) totalQ[k] = (totalQ[k] || 0) + num;
      }
    }
    return {
      ramp: r,
      spacing: i > 0 ? r.stakeM - prev : null,
      zoneKm,
      covered,
      res
    };
  });
  return { rows, totalQ, totalCovered: rows.reduce((s, r) => s + r.covered, 0) };
}
