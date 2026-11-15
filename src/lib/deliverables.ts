// ===== 交底图 SVG、构件清单 CSV、钢材用量统计 =====
import type { Scheme } from '../types';
import { approachSlope, calcMetrics, ratioText, roadGeometry } from './engine';
import { MATERIAL_SPECS } from './constants';

/** 各方案钢材用量统计（汇总） */
export interface SteelStatRow {
  schemeName: string;
  material: string;
  girderSteel: number;
  rebar: number;
  approachSteel: number;
  total: number;
}

export function steelStatistics(schemes: Scheme[]): SteelStatRow[] {
  return schemes.map((s) => {
    const m = calcMetrics(s);
    const spec = MATERIAL_SPECS[s.material];
    const deckArea = s.span * s.deckWidth;
    const girderSteel = spec.steelPerM2 * deckArea;
    const approachSteel = s.approaches.reduce((sum, a) => {
      if (a.type === 'stair') return sum + a.run * a.width * 0.12;
      if (a.type === 'elevator') return sum + 6.0;
      return sum;
    }, 0) + s.span * 0.04;
    const rebar = m.steelTons - girderSteel - approachSteel;
    return {
      schemeName: s.name,
      material: spec.label,
      girderSteel: round2(girderSteel),
      rebar: round2(Math.max(0, rebar)),
      approachSteel: round2(approachSteel),
      total: round2(m.steelTons),
    };
  });
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/** 生成技术交底图（SVG 立面 + 平面示意，含尺寸标注与净空） */
export function briefingSvg(s: Scheme): string {
  const m = calcMetrics(s);
  const W = 980;
  const H = 640;
  const scale = Math.min(640 / s.span, 12); // px/m，两侧留出接入设施标注空间
  const cx = W / 2;
  const baseY = 420; // 路面线
  const x = (mx: number) => cx + mx * scale;
  const y = (elev: number) => baseY - (elev - s.roadElevation) * scale;
  const girderTop = s.girderBottomElev + s.girderDepth + 0.08;

  const piers = s.piers
    .map(
      (p) => `
    <rect x="${x(p.x) - 9}" y="${y(s.girderBottomElev)}" width="18" height="${baseY - y(s.girderBottomElev)}" fill="#b0a595" stroke="#5d5346"/>
    <text x="${x(p.x)}" y="${baseY + 18}" text-anchor="middle" class="dim">${p.name} X=${p.x.toFixed(1)}</text>`,
    )
    .join('');

  const pipelines = s.pipelines
    .map(
      (z) => `
    <rect x="${x(z.xStart)}" y="${baseY + 2}" width="${(z.xEnd - z.xStart) * scale}" height="10" fill="#ff7043" opacity="0.45"/>
    <text x="${x((z.xStart + z.xEnd) / 2)}" y="${baseY + 40}" text-anchor="middle" class="dim">${z.name}</text>`,
    )
    .join('');

  const approaches = s.approaches
    .map((a) => {
      const dir = a.side === 'left' ? -1 : 1;
      const sx = dir * (s.span / 2);
      const ex = sx + dir * a.run;
      const slope = approachSlope(s, a);
      if (a.type === 'elevator') {
        return `<rect x="${x(sx) - 10}" y="${y(girderTop) - (baseY - y(girderTop))}" width="20" height="${baseY - y(girderTop)}" fill="#90a4ae" stroke="#455a64"/>
        <text x="${x(sx)}" y="${y(girderTop) - 6}" text-anchor="middle" class="dim">电梯</text>`;
      }
      const label = a.type === 'stair' ? `梯道 ${slope ? ratioText(slope) : ''}` : `坡道 ${slope ? ratioText(slope) : ''}`;
      return `<line x1="${x(sx)}" y1="${y(girderTop)}" x2="${x(ex)}" y2="${baseY}" stroke="${a.type === 'stair' ? '#455a64' : '#8d7d5b'}" stroke-width="6"/>
      <text x="${x((sx + ex) / 2)}" y="${(y(girderTop) + baseY) / 2 - 8}" text-anchor="middle" class="dim">${label}</text>`;
    })
    .join('');

  const clearanceColor = m.clearance < 5 ? '#e53935' : '#1565c0';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Microsoft YaHei, sans-serif">
  <style>
    .title { font-size: 22px; font-weight: 700; }
    .sub { font-size: 13px; fill: #546e7a; }
    .dim { font-size: 12px; fill: #37474f; }
    .big { font-size: 15px; font-weight: 600; }
  </style>
  <rect width="100%" height="100%" fill="#fbfcfe"/>
  <text x="30" y="40" class="title">跨线人行天桥技术交底图 —— ${esc(s.name)}</text>
  <text x="30" y="62" class="sub">结构形式：${MATERIAL_SPECS[s.material].label}　|　审定人：${esc(s.approver || '—')}　|　审定日期：${esc(s.approvalDate || '—')}　|　制图日期：${new Date().toISOString().slice(0, 10)}</text>

  <!-- 立面示意 -->
  <text x="30" y="98" class="big">一、立面布置（X=0 为公路中线，单位：m）</text>
  <line x1="40" y1="${baseY}" x2="${W - 40}" y2="${baseY}" stroke="#37474f" stroke-width="2"/>
  <text x="${W - 44}" y="${baseY - 6}" text-anchor="end" class="dim">路面高程 ${s.roadElevation.toFixed(2)}</text>
  ${pipelines}
  ${piers}
  <rect x="${x(-s.span / 2)}" y="${y(s.girderBottomElev + s.girderDepth)}" width="${s.span * scale}" height="${s.girderDepth * scale}" fill="${s.material === 'steel' ? '#8a94a6' : '#d8cfc0'}" stroke="#2b3440"/>
  <text x="${cx}" y="${y(s.girderBottomElev + s.girderDepth) - 8}" text-anchor="middle" class="dim">${MATERIAL_SPECS[s.material].label}，梁高 ${s.girderDepth}m，桥面净宽 ${s.deckWidth}m</text>
  ${approaches}
  <!-- 净空标注 -->
  <line x1="${cx + 14}" y1="${baseY}" x2="${cx + 14}" y2="${y(s.girderBottomElev)}" stroke="${clearanceColor}" stroke-dasharray="5 4" stroke-width="2"/>
  <text x="${cx + 22}" y="${(baseY + y(s.girderBottomElev)) / 2}" fill="${clearanceColor}" class="big">净空 ${m.clearance.toFixed(2)}m${m.clearance < 5 ? '（不足5m）' : ''}</text>
  <!-- 跨径标注 -->
  <line x1="${x(-s.span / 2)}" y1="${baseY + 58}" x2="${x(s.span / 2)}" y2="${baseY + 58}" stroke="#37474f"/>
  <text x="${cx}" y="${baseY + 76}" text-anchor="middle" class="dim">桥跨总长 ${s.span}m</text>

  <!-- 道路横断面（平面信息） -->
  <text x="30" y="528" class="big">二、公路横断面（双向 ${s.lanesPerSide * 2} 车道）</text>
  ${roadSectionSvg(s, 30, 544)}

  <text x="30" y="${H - 14}" class="sub">主要工程量：钢材 ${m.steelTons.toFixed(1)}t，混凝土 ${m.concreteM3.toFixed(1)}m³，造价 ${m.costWan.toFixed(1)} 万元，占地 ${m.footprintM2.toFixed(0)}㎡，封闭施工 ${m.closureDays} 天</text>
</svg>`;
}

function roadSectionSvg(s: Scheme, ox: number, oy: number): string {
  const road = roadGeometry(s);
  const scale = 16;
  const totalHalf = road.roadwayHalfWidth + 1;
  let parts = '';
  for (const c of road.carriageways) {
    parts += `<rect x="${ox + (totalHalf + c.xStart) * scale}" y="${oy}" width="${(c.xEnd - c.xStart) * scale}" height="26" fill="#3a3d42"/>`;
    for (let i = 1; i < s.lanesPerSide; i++) {
      const lx = ox + (totalHalf + c.xStart + (i * (c.xEnd - c.xStart)) / s.lanesPerSide) * scale;
      parts += `<line x1="${lx}" y1="${oy}" x2="${lx}" y2="${oy + 26}" stroke="#f5f5f5" stroke-dasharray="4 3"/>`;
    }
  }
  parts += `<rect x="${ox + (totalHalf + road.median.xStart) * scale}" y="${oy}" width="${(road.median.xEnd - road.median.xStart) * scale}" height="26" fill="#6ab04c"/>`;
  parts += `<text x="${ox}" y="${oy + 46}" class="dim">单幅宽 ${road.roadwayHalfWidth.toFixed(2)}m（${s.lanesPerSide}×${s.laneWidth}m 车道 + ${s.shoulderWidth}m 硬路肩），中央分隔带 ${s.medianWidth}m</text>`;
  return parts;
}

function esc(t: string): string {
  return t.replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' })[c]!);
}

/** 构件清单（CSV，含 BOM 与审核信息） */
export function componentListCsv(s: Scheme): string {
  const rows: string[][] = [
    ['构件编号', '构件名称', '类别', '规格/尺寸(m)', '数量', '材料', '备注'],
  ];
  rows.push([
    'G-01',
    '主梁',
    s.material === 'steel' ? '钢箱梁' : '混凝土箱梁',
    `跨径${s.span}×梁高${s.girderDepth}×桥宽${s.deckWidth}`,
    '1',
    MATERIAL_SPECS[s.material].label,
    `梁底高程${s.girderBottomElev.toFixed(2)}m`,
  ]);
  s.piers.forEach((p, i) => {
    rows.push([
      `P-${String(i + 1).padStart(2, '0')}`,
      p.name,
      '桥墩/桥台',
      `${p.thickness}×${p.width}`,
      '1',
      '钢筋混凝土',
      `X=${p.x.toFixed(2)}m`,
    ]);
  });
  s.approaches.forEach((a, i) => {
    const typeName = a.type === 'stair' ? '梯道' : a.type === 'ramp' ? '坡道' : '电梯';
    const slope = approachSlope(s, a);
    rows.push([
      `A-${String(i + 1).padStart(2, '0')}`,
      `${a.side === 'left' ? '左' : '右'}侧${typeName}`,
      typeName,
      a.type === 'elevator' ? '井道2.6×2.6' : `水平长${a.run}×宽${a.width}`,
      '1',
      a.type === 'ramp' ? '钢筋混凝土' : '钢结构',
      slope ? `坡度${ratioText(slope)}` : '垂直提升',
    ]);
  });
  rows.push([]);
  rows.push(['方案名称', s.name]);
  rows.push(['状态', statusLabel(s.status)]);
  rows.push(['审定人', s.approver || '—']);
  rows.push(['审定日期', s.approvalDate || '—']);
  rows.push(['钢材用量(t)', calcMetrics(s).steelTons.toFixed(2)]);
  rows.push(['混凝土用量(m³)', calcMetrics(s).concreteM3.toFixed(2)]);
  rows.push(['造价(万元)', calcMetrics(s).costWan.toFixed(2)]);
  return '﻿' + rows.map((r) => r.map(csvCell).join(',')).join('\r\n');
}

function csvCell(v: string | number | undefined): string {
  const t = String(v ?? '');
  return /[",\n]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t;
}

export function statusLabel(st: Scheme['status']): string {
  return { draft: '草稿', submitted: '待审核', returned: '已退回', approved: '已通过' }[st];
}

/** 浏览器下载文本文件 */
export function downloadText(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
