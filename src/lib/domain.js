// 宫颈钟面 · 阴道镜临床领域逻辑
// 纯函数，便于测试：钟面几何、转化区判定、瓶号与部位描述、复核规则、随访与统计。

export const STATUS_FLOW = ['pending', 'examined', 'biopsy', 'pathology', 'followup', 'closed'];

export const STATUS_META = {
  pending:   { label: '待检查', cls: 'st-pending',   desc: '已登记，等待阴道镜检查' },
  examined:  { label: '已检查', cls: 'st-examined',  desc: '图像与病灶标注已完成' },
  biopsy:    { label: '待活检', cls: 'st-biopsy',    desc: '活检点位已登记，等待病理回填' },
  pathology: { label: '已出病理', cls: 'st-pathology', desc: '病理结果齐全，可进入随访' },
  followup:  { label: '随访中', cls: 'st-followup',  desc: '随访计划执行中' },
  closed:    { label: '已结案', cls: 'st-closed',    desc: '随访完成，病案归档' }
};

export const LESION_GRADES = ['低级别', '高级别', '可疑浸润'];
export const LESION_GRADE_SEVERITY = { 低级别: 1, 高级别: 2, 可疑浸润: 3 };
export const LESION_GRADE_COLOR = {
  低级别: { line: '#b45309', fill: 'rgba(217,148,26,0.24)', chip: '#fef3d6', text: '#8a4d05' },
  高级别: { line: '#be185d', fill: 'rgba(219,39,119,0.20)', chip: '#fde8ef', text: '#a1124c' },
  可疑浸润: { line: '#9f1239', fill: 'rgba(159,18,57,0.24)', chip: '#fbe4e7', text: '#86102f' }
};

export const PATH_GRADES = ['未见CIN / 炎症', 'CIN 1', 'CIN 2', 'CIN 3', 'AIS', '鳞状细胞癌', '腺癌', '取材不足 / 无法评价'];
export const PATH_SEVERITY = {
  '未见CIN / 炎症': 0,
  '取材不足 / 无法评价': 0,
  'CIN 1': 1,
  'CIN 2': 2,
  'CIN 3': 3,
  AIS: 4,
  '鳞状细胞癌': 5,
  '腺癌': 5
};
export const POSITIVE_CIN1 = ['CIN 1', 'CIN 2', 'CIN 3', 'AIS', '鳞状细胞癌', '腺癌'];
export const POSITIVE_CIN2 = ['CIN 2', 'CIN 3', 'AIS', '鳞状细胞癌', '腺癌'];
export const POSITIVE_DEFS = {
  cin1: { key: 'cin1', label: 'CIN1 及以上', grades: POSITIVE_CIN1 },
  cin2: { key: 'cin2', label: 'CIN2 及以上', grades: POSITIVE_CIN2 }
};

export const TZ_TYPES = [
  { key: 'I', label: 'I 型', hint: '转化区完全可见' },
  { key: 'II', label: 'II 型', hint: '转化区可见，部分伸入颈管' },
  { key: 'III', label: 'III 型', hint: '转化区不可见（SCJ 入颈管）' }
];

export const DEFAULT_GEO = { cx: 0.5, cy: 0.47, innerR: 0.052, outerR: 0.3 };
export const QUADRANT_NAMES = ['左前', '左后', '右后', '右前'];
export const QUADRANT_FULL = { 左前: '左前（前唇·患者左）', 左后: '左后（后唇·患者左）', 右后: '右后（后唇·患者右）', 右前: '右前（前唇·患者右）' };

export const CLOCK_TO_QUADRANT = h => {
  const hour = ((Math.round(h) % 12) + 12) % 12;
  if (hour === 0) return '左前';
  return QUADRANT_NAMES[Math.floor(hour / 3) % 4];
};

export const hourLabel = h => {
  const n = ((Math.round(h) % 12) + 12) % 12;
  return (n === 0 ? 12 : n) + '点';
};

export const lineAngleLabel = (startHour, endHour) => {
  const s = normaliseHour(startHour);
  const e = normaliseHour(endHour);
  return `${hourLabel(s)} → ${hourLabel(e)}`;
};

export const normaliseHour = h => ((Math.round(h) % 12) + 12) % 12;

// ---------- 日期 ----------
export const iso = d => {
  const x = d instanceof Date ? d : new Date(d);
  const p = n => String(n).padStart(2, '0');
  return `${x.getFullYear()}-${p(x.getMonth() + 1)}-${p(x.getDate())}`;
};
export const todayISO = () => iso(new Date());
export const parseDate = s => {
  if (!s) return null;
  const [y, m, d] = String(s).split('-').map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
};
export const addMonths = (dateStr, months) => {
  const d = parseDate(dateStr) || new Date();
  const day = d.getDate();
  const target = new Date(d.getFullYear(), d.getMonth() + Number(months), 1);
  const last = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  target.setDate(Math.min(day, last));
  return iso(target);
};
export const daysBetween = (a, b) => {
  const d1 = parseDate(a), d2 = parseDate(b);
  if (!d1 || !d2) return null;
  return Math.round((d2 - d1) / 86400000);
};
export const fmtCN = s => {
  const d = parseDate(s);
  if (!d) return '—';
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
};
export const fmtShort = s => {
  const d = parseDate(s);
  if (!d) return '—';
  return `${d.getMonth() + 1}/${d.getDate()}`;
};

// ---------- 几何 ----------
export const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

export function thetaDeg(p, geo) {
  const dx = p.x - geo.cx;
  const dy = -(p.y - geo.cy);
  const t = (Math.atan2(dx, dy) * 180) / Math.PI;
  return (t + 360) % 360; // 0 = 12点，顺时针
}

export const pointOnCircle = (geo, r, theta) => ({
  x: geo.cx + r * Math.sin((theta * Math.PI) / 180),
  y: geo.cy - r * Math.cos((theta * Math.PI) / 180)
});

export function polygonArea(points) {
  if (!points || points.length < 3) return 0;
  let a = 0;
  for (let i = 0; i < points.length; i++) {
    const p = points[i], q = points[(i + 1) % points.length];
    a += p.x * q.y - q.x * p.y;
  }
  return Math.abs(a) / 2;
}

export function polygonCentroid(points) {
  if (!points || !points.length) return { x: 0.5, y: 0.5 };
  let a = 0, cx = 0, cy = 0;
  for (let i = 0; i < points.length; i++) {
    const p = points[i], q = points[(i + 1) % points.length];
    const f = p.x * q.y - q.x * p.y;
    a += f;
    cx += (p.x + q.x) * f;
    cy += (p.y + q.y) * f;
  }
  if (Math.abs(a) < 1e-9) {
    const avg = points.reduce((s, p) => ({ x: s.x + p.x, y: s.y + p.y }), { x: 0, y: 0 });
    return { x: avg.x / points.length, y: avg.y / points.length };
  }
  a *= 3;
  return { x: cx / a, y: cy / a };
}

export function pointInPolygon(pt, points) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const xi = points[i].x, yi = points[i].y, xj = points[j].x, yj = points[j].y;
    if ((yi > pt.y) !== (yj > pt.y) && pt.x < ((xj - xi) * (pt.y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

export function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/** 点到宫颈口（钟面圆心）的归一化半径 */
export function radiusOf(pt, geo = DEFAULT_GEO) {
  return Math.hypot(pt.x - geo.cx, pt.y - geo.cy);
}

// 钟面方位跨度：取边界角度的最小覆盖弧
export function polygonClockSpan(points, geo = DEFAULT_GEO) {
  if (!points || points.length < 3) return { startHour: null, endHour: null, spanDeg: 0, full: false, label: '—' };
  const angs = [];
  for (let i = 0; i < points.length; i++) {
    const p = points[i], q = points[(i + 1) % points.length];
    angs.push(thetaDeg(p, geo));
    angs.push(thetaDeg({ x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 }, geo));
  }
  angs.sort((a, b) => a - b);
  let maxGap = -1, at = 0;
  for (let i = 0; i < angs.length; i++) {
    const a = angs[i], b = i + 1 < angs.length ? angs[i + 1] : angs[0] + 360;
    if (b - a > maxGap) { maxGap = b - a; at = i; }
  }
  const spanDeg = Math.max(0, 360 - maxGap);
  const startDeg = angs[(at + 1) % angs.length];
  const startHour = normaliseHour(startDeg / 30);
  const endHour = normaliseHour((startDeg + spanDeg) / 30);
  const full = spanDeg >= 330;
  return {
    startHour,
    endHour,
    spanDeg,
    full,
    label: full ? '近全周' : `${hourLabel(startHour)} → ${hourLabel(endHour)}`,
    circumference: Math.round(full ? 100 : (spanDeg / 360) * 100)
  };
}

export function polygonQuadrants(points, geo = DEFAULT_GEO) {
  if (!points || points.length < 3) return [];
  const set = new Set();
  for (let i = 0; i < points.length; i++) {
    const p = points[i], q = points[(i + 1) % points.length];
    set.add(CLOCK_TO_QUADRANT(thetaDeg(p, geo) / 30));
    set.add(CLOCK_TO_QUADRANT(thetaDeg({ x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 }, geo) / 30));
  }
  return QUADRANT_NAMES.filter(q => set.has(q));
}

// 钟面扇形轮廓：startHour → endHour 顺时针，rIn/rOut 为归一化半径
export function sectorPolygon(geo, startHour, endHour, rIn = 0.09, rOut = 0.22, steps = 16) {
  const s = ((Number(startHour) % 12) + 12) % 12;
  const e = ((Number(endHour) % 12) + 12) % 12;
  let span = (e - s + 12) % 12;
  if (span === 0) span = 12;
  const pts = [];
  const n = span >= 12 ? Math.max(steps, 36) : Math.max(5, Math.round((steps * span) / 12) + 3);
  for (let i = 0; i <= n; i++) {
    const h = s + (span * i) / n;
    pts.push(pointOnCircle(geo, rOut, h * 30));
  }
  for (let i = n; i >= 0; i--) {
    const h = s + (span * i) / n;
    pts.push(pointOnCircle(geo, rIn, h * 30));
  }
  return pts;
}

// 转化区关系：以宫颈口为中心，内圈 = 新 SCJ，外圈 = 原始 SCJ
export function tzCoverage(points, geo = DEFAULT_GEO) {
  const empty = { inner: 0, ring: 0, outer: 0, code: 'tz', label: '位于转化区内', crosses: false };
  if (!points || points.length < 3) return empty;
  const xs = points.map(p => p.x), ys = points.map(p => p.y);
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
  const N = 44;
  let inner = 0, ring = 0, outer = 0, total = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const pt = { x: minX + ((i + 0.5) / N) * (maxX - minX), y: minY + ((j + 0.5) / N) * (maxY - minY) };
      if (!pointInPolygon(pt, points)) continue;
      total++;
      const r = radiusOf(pt, geo);
      if (r <= geo.innerR) inner++;
      else if (r <= geo.outerR) ring++;
      else outer++;
    }
  }
  if (!total) return empty;
  const f = n => n / total;
  const innerFrac = f(inner), outerFrac = f(outer);
  let code = 'tz', label = '位于转化区内';
  if (innerFrac > 0.02 && outerFrac > 0.02) { code = 'both'; label = '跨越转化区（内、外界均越过）'; }
  else if (innerFrac > 0.02) { code = 'inner'; label = '越过内界 · 累及宫颈管'; }
  else if (outerFrac > 0.02) { code = 'outer'; label = '越过外界 · 达原始鳞状上皮'; }
  return { inner: innerFrac, ring: f(ring), outer: outerFrac, code, label, crosses: code !== 'tz' };
}

// 1 个图像单位对应的毫米数：默认原始 SCJ 直径 30mm
export const unitMM = geo => 30 / (2 * (geo.outerR || DEFAULT_GEO.outerR));
export const areaMM2 = (areaFrac, geo) => areaFrac * Math.pow(unitMM(geo), 2);
export const radiusMM = (r, geo) => r * unitMM(geo);

export function lesionMetrics(lesion, geo = DEFAULT_GEO) {
  const span = polygonClockSpan(lesion.points, geo);
  const quadrants = polygonQuadrants(lesion.points, geo);
  const tz = tzCoverage(lesion.points, geo);
  const area = polygonArea(lesion.points);
  return {
    ...span,
    quadrants,
    tz,
    areaFrac: area,
    areaMM2: areaMM2(area, geo),
    centroid: polygonCentroid(lesion.points)
  };
}

export function totalAreaMM2(exam) {
  const geo = exam.geometry || DEFAULT_GEO;
  return (exam.lesions || []).reduce((s, l) => s + areaMM2(polygonArea(l.points), geo), 0);
}

export function pointClock(p, geo = DEFAULT_GEO) {
  return normaliseHour(thetaDeg(p, geo) / 30) || 12;
}

export function pointSite(p, geo = DEFAULT_GEO) {
  const hour = pointClock(p, geo);
  const quad = CLOCK_TO_QUADRANT(hour);
  const r = radiusOf(p, geo);
  const mm = Math.round(radiusMM(r, geo));
  const tzr = r <= geo.innerR ? '宫颈管内' : r <= geo.outerR ? '转化区内' : '转化区外';
  return {
    hour,
    hourText: hourLabel(hour),
    quadrant: quad,
    distanceMM: mm,
    tzText: tzr,
    description: `${hourLabel(hour)}方位 · ${quad}象限 · 距宫颈口约 ${mm}mm · ${tzr}`
  };
}

export function vialNumber(accession, seq) {
  return `${accession}-B${seq}`;
}

// ---------- 病理 ----------
export function pathologyFilled(b) {
  return !!(b && b.pathGrade);
}
export function pathologyComplete(exam) {
  if (!exam) return false;
  const list = exam.biopsies || [];
  if (!list.length) return false;
  return list.every(b => pathologyFilled(b) && b.pathDate);
}
export function pathologyProgress(exam) {
  const list = exam?.biopsies || [];
  if (!list.length) return { done: 0, total: 0, pct: 0 };
  const done = list.filter(b => pathologyFilled(b) && b.pathDate).length;
  return { done, total: list.length, pct: Math.round((done / list.length) * 100) };
}
export function worstGrade(exam) {
  const list = (exam?.biopsies || []).filter(b => b.pathGrade);
  if (!list.length) return null;
  return list.reduce((best, b) => (PATH_SEVERITY[b.pathGrade] > PATH_SEVERITY[best] ? b.pathGrade : best), list[0].pathGrade);
}
export function positiveCount(exam, def = 'cin1') {
  const allowed = POSITIVE_DEFS[def].grades;
  return (exam?.biopsies || []).filter(b => allowed.includes(b.pathGrade)).length;
}
export function isExamPositive(exam, def = 'cin1') {
  return (exam?.biopsies || []).some(b => POSITIVE_DEFS[def].grades.includes(b.pathGrade));
}

// ---------- 复核提示 ----------
export function flagsForExam(exam, priorExam = null) {
  const flags = [];
  if (!exam) return flags;
  const geo = exam.geometry || DEFAULT_GEO;
  const lesions = exam.lesions || [];
  const biopsies = exam.biopsies || [];

  // 1. 面积变化（对比前次）
  if (priorExam) {
    const prevArea = totalAreaMM2(priorExam);
    const curArea = totalAreaMM2(exam);
    const delta = curArea - prevArea;
    const pct = prevArea > 0 ? (delta / prevArea) * 100 : null;
    if (prevArea > 0 && delta > 0 && (pct >= 5 || delta >= 5)) {
      flags.push({
        code: 'area-increase',
        level: 'warn',
        title: '病灶面积较前次增大',
        text: `标注面积 ${prevArea.toFixed(1)} → ${curArea.toFixed(1)} mm²（+${delta.toFixed(1)} mm²，+${Math.round(pct)}%），建议复核。`
      });
    }
  }

  const pathDone = pathologyComplete(exam);
  for (const b of biopsies) {
    if (!b.pathGrade) continue;
    const sev = PATH_SEVERITY[b.pathGrade];
    const lesion = lesions.find(l => l.id === b.lesionId);
    const inLesion = lesion ? pointInPolygon(b.point, lesion.points) : false;
    if (sev >= 1 && !inLesion) {
      flags.push({
        code: `point-outside-${b.id}`,
        level: 'warn',
        title: '点位与病理不符',
        text: `瓶号 ${b.vial}（${pointSite(b.point, geo).hourText}）病理 ${b.pathGrade}，但取样点不在标注病灶轮廓内，建议复核取样位置。`
      });
    }
    if (sev >= 2 && lesion && LESION_GRADE_SEVERITY[lesion.grade] <= 1) {
      flags.push({
        code: `grade-up-${b.id}`,
        level: 'warn',
        title: '病理升级',
        text: `瓶号 ${b.vial} 镜下登记为${lesion.grade}病灶，病理回报 ${b.pathGrade}，分级不一致，建议复核图像。`
      });
    }
    if (b.pathGrade === '取材不足 / 无法评价') {
      flags.push({
        code: `inadequate-${b.id}`,
        level: 'warn',
        title: '取材不足',
        text: `瓶号 ${b.vial} 病理提示取材不足，建议补取或重新评估。`
      });
    }
  }

  // 高级别病灶未获病理证实
  if (pathDone) {
    for (const l of lesions) {
      if (LESION_GRADE_SEVERITY[l.grade] < 2) continue;
      const pts = biopsies.filter(b => l.id === b.lesionId || pointInPolygon(b.point, l.points));
      const proven = pts.some(b => PATH_SEVERITY[b.pathGrade] >= 2);
      if (!proven && pts.length) {
        flags.push({
          code: `unproven-${l.id}`,
          level: 'warn',
          title: '高级别灶未见病理证实',
          text: `病灶 ${l.label || ''}（${polygonClockSpan(l.points, geo).label}）镜下为${l.grade}，对应点病理最高 ${worstOf(pts)}，建议复核或补取。`
        });
      }
    }
    if (lesions.length && !biopsies.length) {
      flags.push({ code: 'no-biopsy', level: 'info', title: '未取活检', text: '已标注病灶但未登记活检点位，如为免活检需填写原因。' });
    }
  }

  if (biopsies.length && !pathDone) {
    const pr = pathologyProgress(exam);
    flags.push({ code: 'path-incomplete', level: 'info', title: '病理未回填完整', text: `${pr.done}/${pr.total} 瓶已回填，病理不齐全不可结案。` });
  }
  return flags;
}

function worstOf(list) {
  const filled = list.filter(b => b.pathGrade);
  if (!filled.length) return '—';
  return filled.reduce((best, b) => (PATH_SEVERITY[b.pathGrade] > PATH_SEVERITY[best] ? b.pathGrade : best), filled[0].pathGrade);
}

export function worstSeverity(exam) {
  const g = worstGrade(exam);
  return g ? PATH_SEVERITY[g] : -1;
}

// ---------- 随访 ----------
export const FOLLOWUP_MONTHS = {
  '未见CIN / 炎症': 12,
  '取材不足 / 无法评价': 1,
  'CIN 1': 6,
  'CIN 2': 3,
  'CIN 3': 3,
  AIS: 3,
  '鳞状细胞癌': 1,
  '腺癌': 1
};
export function followupMonths(exam) {
  const g = worstGrade(exam);
  return g ? FOLLOWUP_MONTHS[g] : 12;
}
export function taskDueStatus(task, today = todayISO()) {
  if (task.status === '已完成') return 'done';
  const d = daysBetween(today, task.dueDate);
  if (d === null) return 'pending';
  if (d < 0) return 'overdue';
  if (d <= 14) return 'soon';
  return 'pending';
}
export const DUE_META = {
  done: { label: '已完成', cls: 'st-pathology' },
  overdue: { label: '已逾期', cls: 'st-pending' },
  soon: { label: '即将到期', cls: 'st-biopsy' },
  pending: { label: '待随访', cls: 'st-followup' }
};

// ---------- 统计 ----------
export function physicianStats(cases, def = 'cin1') {
  const map = new Map();
  for (const c of cases) {
    const name = c.physician || '未指定';
    if (!map.has(name)) map.set(name, { name, cases: 0, examined: 0, biopsied: 0, points: 0, positivePoints: 0, positiveCases: 0, cin2Cases: 0, grades: {} });
    const row = map.get(name);
    row.cases++;
    if (c.status !== 'pending') row.examined++;
    const exam = c.exam;
    const bs = exam?.biopsies || [];
    if (bs.length) {
      row.biopsied++;
      row.points += bs.length;
      row.positivePoints += bs.filter(b => POSITIVE_DEFS[def].grades.includes(b.pathGrade)).length;
      if (bs.some(b => POSITIVE_DEFS[def].grades.includes(b.pathGrade))) row.positiveCases++;
      if (bs.some(b => POSITIVE_CIN2.includes(b.pathGrade))) row.cin2Cases++;
      for (const b of bs) if (b.pathGrade) row.grades[b.pathGrade] = (row.grades[b.pathGrade] || 0) + 1;
    }
  }
  return [...map.values()].map(r => ({
    ...r,
    rate: r.biopsied ? (r.positiveCases / r.biopsied) * 100 : 0,
    pointRate: r.points ? (r.positivePoints / r.points) * 100 : 0,
    cin2Rate: r.biopsied ? (r.cin2Cases / r.biopsied) * 100 : 0
  })).sort((a, b) => b.rate - a.rate || b.biopsied - a.biopsied);
}

export function aggregateStats(cases, def = 'cin1') {
  const rows = physicianStats(cases, def);
  const biopsied = rows.reduce((s, r) => s + r.biopsied, 0);
  const positive = rows.reduce((s, r) => s + r.positiveCases, 0);
  return {
    rows,
    biopsied,
    positive,
    rate: biopsied ? (positive / biopsied) * 100 : 0,
    cases: cases.length,
    cin2: rows.reduce((s, r) => s + r.cin2Cases, 0)
  };
}

// ---------- 状态推进 ----------
export function statusIndex(status) {
  return STATUS_FLOW.indexOf(status);
}

export function guardAdvance(c, action) {
  if (!c) return { ok: false, message: '未选择检查单' };
  const exam = c.exam || {};
  const lesions = exam.lesions || [];
  const biopsies = exam.biopsies || [];
  const images = exam.images || {};
  switch (action) {
    case 'examined':
      if (c.status !== 'pending') return { ok: false, message: '仅待检查的检查单可提交检查结论' };
      if (!(images.pre && images.post && images.iodine)) return { ok: false, message: '请先导入醋酸前、醋酸后、碘染三张图像' };
      if (!lesions.length && !exam.noLesionNote) return { ok: false, message: '请标注病灶，或填写“未见异常”说明' };
      return { ok: true };
    case 'biopsy':
      if (c.status !== 'examined') return { ok: false, message: '仅已检查的检查单可登记活检' };
      if (!biopsies.length) return { ok: false, message: '请至少登记 1 个活检点位' };
      if (biopsies.length > 4) return { ok: false, message: '活检点位最多 4 个' };
      if (biopsies.some(b => !b.vial || !b.siteText)) return { ok: false, message: '存在未生成瓶号或部位描述的点位' };
      return { ok: true };
    case 'pathology':
      if (c.status !== 'biopsy') return { ok: false, message: '仅待活检的检查单可提交病理' };
      if (!pathologyComplete(exam)) return { ok: false, message: '病理未回填完整，不能进入已出病理' };
      return { ok: true };
    case 'followup':
      if (c.status !== 'pathology') return { ok: false, message: '仅已出病理的检查单可开启随访' };
      if (!pathologyComplete(exam)) return { ok: false, message: '病理未回填完整，不能开启随访' };
      return { ok: true };
    case 'closed':
      if (c.status !== 'followup') return { ok: false, message: '仅随访中的检查单可结案' };
      if (!pathologyComplete(exam)) return { ok: false, message: '病理未填全，不允许结案' };
      return { ok: true };
    default:
      return { ok: false, message: '未知操作' };
  }
}

export function shortLesionLabel(lesion, geo) {
  const span = polygonClockSpan(lesion.points, geo);
  return `${span.label} · ${lesion.grade}`;
}

export function summarizePathology(exam) {
  if (!exam || !(exam.biopsies || []).length) return { text: '无活检', tone: 'muted', worst: null };
  if (!pathologyComplete(exam)) {
    const p = pathologyProgress(exam);
    return { text: `回填中 ${p.done}/${p.total}`, tone: 'warn', worst: worstGrade(exam) };
  }
  const g = worstGrade(exam);
  return { text: `最高 ${g}`, tone: PATH_SEVERITY[g] >= 2 ? 'bad' : PATH_SEVERITY[g] >= 1 ? 'ok' : 'muted', worst: g };
}

// 面积对比（两次检查）
export function compareExams(prevExam, curExam) {
  const prevArea = prevExam ? totalAreaMM2(prevExam) : 0;
  const curArea = curExam ? totalAreaMM2(curExam) : 0;
  const delta = curArea - prevArea;
  const pct = prevArea > 0 ? (delta / prevArea) * 100 : null;
  const increased = prevArea > 0 && delta > 0 && (pct >= 5 || delta >= 5);
  return {
    prevArea,
    curArea,
    delta,
    pct,
    increased,
    prevCount: (prevExam?.lesions || []).length,
    curCount: (curExam?.lesions || []).length,
    summary: prevArea > 0
      ? `面积 ${prevArea.toFixed(1)} → ${curArea.toFixed(1)} mm²，${delta >= 0 ? '增加' : '缩小'} ${Math.abs(delta).toFixed(1)} mm²（${pct >= 0 ? '+' : ''}${pct.toFixed(0)}%）`
      : '前次无标注病灶，无法比较面积'
  };
}
