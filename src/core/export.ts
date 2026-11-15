// ============================================================
// 工程量清单导出（CSV）+ 项目 JSON 导入导出
// ============================================================
import type { ProjectState } from '../types';
import { summarize } from './engine';

function csvCell(v: string | number): string {
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function download(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

interface BillRow {
  no: string;
  name: string;
  spec: string;
  unit: string;
  qty: number;
  location: string;
  note: string;
}

/** 生成工程量清单行项目 */
export function buildBillRows(state: ProjectState): BillRow[] {
  const { config, components } = state;
  const rows: BillRow[] = [];
  let no = 1;
  const gradeLabel = (id: string) => {
    const i = config.grades.findIndex((g) => g.id === id);
    return i >= 0 ? `第${i + 1}级坡` : id;
  };

  for (const frame of components.frames) {
    const loc = gradeLabel(frame.gradeId);
    rows.push({
      no: String(no++), name: '锚杆框架梁（C25混凝土）',
      spec: `${config.beamWidth}×${config.beamDepth}m，${frame.colCount}列×${frame.rowCount}排`,
      unit: 'm³', qty: round(frame.concrete), location: loc,
      note: frame.densifiedAtBoundary ? '含土岩分界加密' : '',
    });
    rows.push({
      no: String(no++), name: '框架梁及锚杆钢筋',
      spec: `主筋 HRB400，锚杆杆体 Φ${config.anchorBarDiameter}`,
      unit: 't', qty: round(frame.steel), location: loc, note: '',
    });
    const byLayer = new Map<string, { count: number; length: number }>();
    for (const a of frame.anchors) {
      const cur = byLayer.get(a.layerId) ?? { count: 0, length: 0 };
      cur.count += 1;
      cur.length += a.length;
      byLayer.set(a.layerId, cur);
    }
    for (const [layerId, agg] of byLayer) {
      const layer = config.layers.find((l) => l.id === layerId);
      rows.push({
        no: String(no++), name: '锚杆（带垫板）',
        spec: `Φ${config.anchorBarDiameter}，L=${layer?.anchorLength ?? ''}m，${layer?.name ?? ''}`,
        unit: '根', qty: agg.count, location: loc,
        note: `合计钻孔 ${round(agg.length)} m`,
      });
    }
  }

  for (const ditch of components.ditches) {
    rows.push({
      no: String(no++), name: '截水沟（C20混凝土）',
      spec: `梯形 底宽${config.ditchBottomWidth}/顶宽${config.ditchTopWidth}/深${config.ditchDepth}m`,
      unit: 'm³', qty: round(ditch.concrete),
      location: ditch.gradeId === null ? '坡顶截水沟' : `${gradeLabel(ditch.gradeId)}平台截水沟`,
      note: `桩号方向 ${ditch.startX.toFixed(1)}~${ditch.endX.toFixed(1)}m`,
    });
  }

  for (const wall of components.walls) {
    rows.push({
      no: String(no++), name: '护面墙（M7.5浆砌片石/C20）',
      spec: `厚 ${config.wallThickness}m，高 ${(wall.topElev - wall.bottomElev).toFixed(1)}m`,
      unit: 'm³', qty: round(wall.concrete), location: gradeLabel(wall.gradeId),
      note: `${wall.startX.toFixed(1)}~${wall.endX.toFixed(1)}m`,
    });
  }

  const monitorGroups = new Map<string, number>();
  for (const m of components.monitors) {
    monitorGroups.set(m.kind, (monitorGroups.get(m.kind) ?? 0) + 1);
  }
  for (const [kind, count] of monitorGroups) {
    rows.push({
      no: String(no++), name: kind, spec: '含测斜管/保护装置',
      unit: '点', qty: count, location: '全边坡', note: '',
    });
  }
  return rows;
}

function round(n: number): number {
  return Math.round(n * 1000) / 1000;
}

/** 导出工程量清单 CSV（UTF-8 BOM，Excel 直接打开不乱码） */
export function exportBillCsv(state: ProjectState) {
  const totals = summarize(state.components);
  const header = ['序号', '项目名称', '规格/型号', '单位', '数量', '部位', '备注'];
  const lines = [header.map(csvCell).join(',')];
  for (const r of buildBillRows(state)) {
    lines.push([r.no, r.name, r.spec, r.unit, r.qty, r.location, r.note].map(csvCell).join(','));
  }
  lines.push('');
  lines.push(['汇总', `锚杆 ${totals.anchorCount} 根 / 钻孔 ${round(totals.anchorTotalLength)}m`,
    `混凝土 ${round(totals.concreteTotal)}m³`, `钢筋 ${round(totals.steelTotal)}t`, '', '', ''].map(csvCell).join(','));

  const meta = [
    `项目名称,${csvCell(state.config.projectName)}`,
    `桩号,${csvCell(state.config.chainage)}`,
    `导出时间,${new Date().toLocaleString('zh-CN')}`,
  ].join('\n');

  const bom = '﻿';
  download(`工程量清单_${state.config.projectName}.csv`, bom + meta + '\n\n' + lines.join('\n'), 'text/csv;charset=utf-8');
}

export function exportProjectJson(state: ProjectState) {
  download(`边坡项目_${Date.now()}.json`, JSON.stringify(state, null, 2), 'application/json');
}

export function parseProjectJson(text: string): ProjectState {
  const data = JSON.parse(text) as ProjectState;
  if (!data.config || !data.intents || !data.components) {
    throw new Error('文件结构不完整，缺少 config / intents / components 字段');
  }
  return data;
}
