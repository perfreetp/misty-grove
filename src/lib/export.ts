import type { Batch, Database, DefectType } from '../types';
import { DEFECT_META, DEFECT_ORDER, RETURN_CATEGORIES, STATUS_META } from './defects';
import { batchStats, programStats } from './stats';
import { fmtFull, fmtPct } from './format';

function download(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function esc(s: string | number | undefined): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function csvOf(rows: (string | number)[][]): string {
  return rows
    .map((r) =>
      r
        .map((c) => {
          const s = String(c ?? '');
          return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
        })
        .join(','),
    )
    .join('\r\n');
}

export function exportBatchCsv(batch: Batch, db: Database) {
  const program = db.programs.find((p) => p.id === batch.programId);
  const rows: (string | number)[][] = [
    ['批次号', '板号', '状态', '复判人', '复判时间', '判定', '判定依据', ...DEFECT_ORDER.map((t) => DEFECT_META[t].label), '图像版本'],
  ];
  for (const b of batch.boards) {
    const v = b.versions.find((x) => x.id === b.activeVersionId);
    const counts = DEFECT_ORDER.map(
      (t) => v?.annotations.filter((a) => a.status === 'active' && a.type === t).length ?? 0,
    );
    rows.push([
      batch.code,
      b.boardNo,
      b.reviewStatus === 'reviewed' ? '已复判' : '待复判',
      b.reviewedBy ?? '',
      b.reviewedAt ? fmtFull(b.reviewedAt) : '',
      b.verdict ? (b.verdict.verdict === 'pass' ? '通过' : '返修') : '',
      b.verdict?.reasons.join('；') ?? '',
      ...counts,
      v?.label ?? '',
    ]);
  }
  const stats = batchStats(batch);
  rows.push([]);
  rows.push(['汇总', `批次 ${batch.code}`, `产品 ${batch.product}`, `程式 ${program?.code ?? ''}`, `班次 ${batch.shift}`]);
  rows.push(['板数', stats.total, '已复判', stats.reviewed, '返修', stats.rework, '通过', stats.pass]);
  rows.push(['误报率', fmtPct(stats.falseRate), '机器判点', stats.machineCalls, '漏判发现', stats.missedDefects]);
  rows.push(['状态', STATUS_META[batch.status].label, '放行人', batch.released?.by ?? '', '放行时间', batch.released ? fmtFull(batch.released.at) : '']);
  for (const r of batch.returns) {
    rows.push(['退回记录', r.category, r.reason, `退回人 ${r.by}`, fmtFull(r.at)]);
  }
  download(`${batch.code}-复判明细.csv`, new Blob([`﻿${csvOf(rows)}`], { type: 'text/csv;charset=utf-8' }));
}

function releaseSheetHtml(batch: Batch, db: Database): string {
  const program = db.programs.find((p) => p.id === batch.programId);
  const stats = batchStats(batch);
  const supervisor = batch.released?.by ?? '—';
  const sampled = batch.sampling
    .map((s) => {
      const b = batch.boards.find((x) => x.id === s.boardId);
      return `<tr><td>${esc(b?.boardNo ?? s.boardId)}</td><td>${esc(b?.verdict?.verdict === 'pass' ? '通过' : b?.verdict?.verdict === 'rework' ? '返修' : '—')}</td><td>${esc(s.by)}</td><td>${esc(fmtFull(s.at))}</td><td>${s.viewedAt ? '已检视 ' + esc(fmtFull(s.viewedAt)) : '<b style="color:#b57b00">未检视</b>'}</td></tr>`;
    })
    .join('');
  const boardRows = batch.boards
    .map((b) => {
      const v = b.versions.find((x) => x.id === b.activeVersionId);
      const cnt = DEFECT_ORDER.map(
        (t) => v?.annotations.filter((a) => a.status === 'active' && a.type === t).length ?? 0,
      );
      return `<tr><td>${esc(b.boardNo)}</td>${cnt
        .map((c, i) => `<td class="${c > 0 ? 'nz' : 'z'}" style="color:${c > 0 ? DEFECT_META[DEFECT_ORDER[i]].color : '#999'}">${c}</td>`)
        .join('')}<td>${b.verdict ? (b.verdict.verdict === 'pass' ? '通过' : '返修') : '待复判'}</td><td>${esc(b.reviewedBy ?? '')}</td><td>${esc(v?.label ?? '')}</td></tr>`;
    })
    .join('');
  const returnRows = batch.returns
    .map(
      (r) => `<tr><td>${esc(fmtFull(r.at))}</td><td>${esc(r.by)}</td><td>${esc(r.category)}</td><td>${esc(r.reason)}</td></tr>`,
    )
    .join('');

  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><title>${esc(batch.code)} 批次放行单</title>
<style>
@page{size:A4;margin:16mm 14mm}
*{box-sizing:border-box}
body{font-family:"Microsoft YaHei","Noto Sans SC",system-ui,sans-serif;color:#16211d;font-size:12px;margin:0}
.hd{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #1c6b4b;padding-bottom:10px;margin-bottom:14px}
h1{font-size:19px;margin:0 0 3px}
.sub{color:#5d6b66;font-size:11px;font-family:Consolas,monospace}
.badge{border:1px solid #1c6b4b;color:#1c6b4b;padding:5px 12px;border-radius:5px;font-weight:700;font-size:13px}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border:1px solid #d5ddd9;border-radius:6px;overflow:hidden;margin-bottom:14px}
.cell{padding:7px 10px;border-right:1px solid #e6ebe9;border-bottom:1px solid #e6ebe9}
.cell .k{color:#78867f;font-size:10px;margin-bottom:2px}
.cell .v{font-family:Consolas,monospace;font-weight:600;font-size:12.5px}
h2{font-size:13px;margin:16px 0 7px;border-left:3px solid #1c6b4b;padding-left:7px}
table{width:100%;border-collapse:collapse;font-size:11px}
th{background:#f2f6f4;text-align:left;padding:6px 8px;border:1px solid #dde4e1;font-weight:600;color:#41514b}
td{padding:5px 8px;border:1px solid #e6ebe9}
td.z{color:#a8b3ae}
.note{color:#5d6b66;font-size:10.5px;line-height:1.7}
.sign{display:flex;gap:40px;margin-top:34px;font-size:11px}
.sign div{flex:1;border-top:1px solid #9aa7a2;padding-top:6px;color:#5d6b66}
.foot{margin-top:20px;color:#96a29d;font-size:9.5px;border-top:1px solid #e6ebe9;padding-top:8px}
</style></head><body>
<div class="hd"><div>
<h1>AOI 复判批次放行单</h1>
<div class="sub">BATCH RELEASE SHEET · ${esc(batch.code)} · 导出时间 ${fmtFull(new Date().toISOString())}</div>
</div><div class="badge">${esc(STATUS_META[batch.status].label)}</div></div>
<div class="grid">
<div class="cell"><div class="k">批次号</div><div class="v">${esc(batch.code)}</div></div>
<div class="cell"><div class="k">产品</div><div class="v">${esc(batch.product)}</div></div>
<div class="cell"><div class="k">检测程式</div><div class="v">${esc(program?.code ?? '')}</div></div>
<div class="cell"><div class="k">线体 / 机台</div><div class="v">${esc(batch.line)} / ${esc(batch.machineId)}</div></div>
<div class="cell"><div class="k">班次</div><div class="v">${esc(batch.shift)}</div></div>
<div class="cell"><div class="k">板数</div><div class="v">${stats.total} 块</div></div>
<div class="cell"><div class="k">返修 / 通过</div><div class="v">${stats.rework} / ${stats.pass}</div></div>
<div class="cell"><div class="k">机器误报率</div><div class="v">${fmtPct(stats.falseRate)}</div></div>
<div class="cell"><div class="k">导入时间</div><div class="v">${esc(fmtFull(batch.importedAt))}</div></div>
<div class="cell"><div class="k">提交放行</div><div class="v">${esc(batch.submittedBy ?? '—')}</div></div>
<div class="cell"><div class="k">放行主管</div><div class="v">${esc(supervisor)}</div></div>
<div class="cell"><div class="k">放行时间</div><div class="v">${batch.released ? esc(fmtFull(batch.released.at)) : '—'}</div></div>
</div>
<h2>缺陷类型分布</h2>
<table><tr><th>类型</th>${DEFECT_ORDER.map((t) => `<th>${DEFECT_META[t].label}</th>`).join('')}<th>合计</th></tr>
<tr><td>有效标注数</td>${DEFECT_ORDER.map((t) => `<td>${stats.detail[t]}</td>`).join('')}<td>${DEFECT_ORDER.reduce((a, t) => a + stats.detail[t], 0)}</td></tr>
<tr><td>类型代码</td>${DEFECT_ORDER.map((t) => `<td>${DEFECT_META[t].code}</td>`).join('')}<td>—</td></tr></table>
<h2>单板判定明细（${stats.reviewed}/${stats.total} 已复判）</h2>
<table><tr><th>板号</th>${DEFECT_ORDER.map((t) => `<th>${DEFECT_META[t].label}</th>`).join('')}<th>判定</th><th>复判人</th><th>图像版本</th></tr>${boardRows}</table>
<h2>抽检记录（抽检比例要求 ≥ ${(db.thresholds.sampleRatio * 100).toFixed(0)}%，实际覆盖 ${batch.released?.coveragePct.toFixed(1) ?? ((batch.sampling.length / Math.max(1, stats.total)) * 100).toFixed(1)}%）</h2>
<table><tr><th>板号</th><th>复判判定</th><th>抽检人</th><th>标记时间</th><th>图像检视</th></tr>${sampled || '<tr><td colspan="5">无抽检记录</td></tr>'}</table>
${returnRows ? `<h2>退回记录</h2><table><tr><th>时间</th><th>退回人</th><th>分类</th><th>原因</th></tr>${returnRows}</table>` : ''}
<h2>放行意见</h2>
<div class="note">${esc(batch.released?.note ?? '—')}</div>
<div class="sign"><div>复判员签字 / 日期</div><div>品质主管签字 / 日期</div><div>客户签收 / 日期</div></div>
<div class="foot">本放行单由 AOI 焊点复判工作台自动生成。所有标注均挂接于具体图像版本（有效版本 ${batch.boards.map((b) => b.versions.length).reduce((a, b) => Math.max(a, b), 1)} 版以内），换图后旧标注自动作废并留痕。缺陷判定依据见批次审计记录。</div>
</body></html>`;
}

export function exportReleaseSheet(batch: Batch, db: Database) {
  download(`${batch.code}-放行单.html`, new Blob([releaseSheetHtml(batch, db)], { type: 'text/html;charset=utf-8' }));
}

/** 缺陷分布图（客户版），SVG */
export function buildDistributionSvg(batch: Batch, db: Database, width = 900, height = 420): string {
  const program = db.programs.find((p) => p.id === batch.programId);
  const stats = batchStats(batch);
  const total = DEFECT_ORDER.reduce((a, t) => a + stats.detail[t], 0);
  const padL = 58;
  const padR = 26;
  const padT = 86;
  const padB = 92;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const max = Math.max(1, ...DEFECT_ORDER.map((t) => stats.detail[t]));
  const niceMax = Math.ceil(max / 2) * 2;
  const bw = plotW / DEFECT_ORDER.length;
  let grid = '';
  for (let i = 0; i <= 4; i++) {
    const y = padT + (plotH / 4) * i;
    const v = Math.round(niceMax - (niceMax / 4) * i);
    grid += `<line x1="${padL}" y1="${y}" x2="${width - padR}" y2="${y}" stroke="#1e2a26" stroke-width="1"/>`;
    grid += `<text x="${padL - 10}" y="${y + 4}" text-anchor="end" fill="#6d7d76" font-size="10" font-family="Consolas,monospace">${v}</text>`;
  }
  const bars = DEFECT_ORDER.map((t, i) => {
    const v = stats.detail[t];
    const h = (v / niceMax) * plotH;
    const x = padL + bw * i + bw * 0.24;
    const w = bw * 0.52;
    const y = padT + plotH - h;
    const meta = DEFECT_META[t];
    return `<g>
      <rect x="${x}" y="${y}" width="${w}" height="${Math.max(h, 1)}" rx="3" fill="${meta.color}" opacity="0.9"/>
      <text x="${x + w / 2}" y="${y - 8}" text-anchor="middle" fill="#dbe6e1" font-size="12" font-family="Consolas,monospace" font-weight="600">${v}</text>
      <text x="${x + w / 2}" y="${padT + plotH + 20}" text-anchor="middle" fill="#a9b6b0" font-size="11.5">${meta.label}</text>
      <text x="${x + w / 2}" y="${padT + plotH + 36}" text-anchor="middle" fill="#6d7d76" font-size="9.5" font-family="Consolas,monospace">${((v / Math.max(total, 1)) * 100).toFixed(0)}%</text>
    </g>`;
  }).join('');

  const pct = (v: number) => `${(v / Math.max(total, 1)) * 100}%`;
  const legend = DEFECT_ORDER.map(
    (t) => `<rect x="0" y="0" width="9" height="9" rx="2" fill="${DEFECT_META[t].color}"/><text x="14" y="8" fill="#a9b6b0" font-size="10">${DEFECT_META[t].label} ${pct(stats.detail[t])}</text>`,
  ).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="#0b120f"/>
  <text x="${padL}" y="34" fill="#e8efeb" font-size="17" font-weight="600" font-family="system-ui,'Microsoft YaHei'">${esc(batch.product)} · 焊点缺陷分布</text>
  <text x="${padL}" y="54" fill="#7d8b85" font-size="11" font-family="Consolas,monospace">${esc(batch.code)}  |  ${esc(program?.code ?? '')}  |  ${esc(batch.shift)}  |  ${stats.total} 块板  |  复判 ${stats.reviewed}  |  返修 ${stats.rework}  |  误报率 ${fmtPct(stats.falseRate)}</text>
  <g transform="translate(${width - padR - 250}, 22)">${legend}</g>
  ${grid}
  <line x1="${padL}" y1="${padT + plotH}" x2="${width - padR}" y2="${padT + plotH}" stroke="#33433c" stroke-width="1.4"/>
  ${bars}
  <text x="${padL}" y="${height - 22}" fill="#6d7d76" font-size="9.5">数据来源：AOI 焊点复判工作台 · 有效标注（不含已作废）· 导出于 ${fmtFull(new Date().toISOString())}</text>
  <text x="${width - padR}" y="${height - 22}" text-anchor="end" fill="#6d7d76" font-size="9.5">客户交付文件</text>
</svg>`;
}

export function exportDistributionSvg(batch: Batch, db: Database) {
  download(`${batch.code}-缺陷分布图.svg`, new Blob([buildDistributionSvg(batch, db)], { type: 'image/svg+xml;charset=utf-8' }));
}

export async function exportDistributionPng(batch: Batch, db: Database) {
  const svg = buildDistributionSvg(batch, db, 1200, 560);
  const img = new Image();
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  await new Promise<void>((res, rej) => {
    img.onload = () => res();
    img.onerror = () => rej(new Error('svg render failed'));
    img.src = url;
  });
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 560;
  const g = canvas.getContext('2d')!;
  g.drawImage(img, 0, 0);
  URL.revokeObjectURL(url);
  const dataUrl = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = `${batch.code}-缺陷分布图.png`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function exportProgramReportCsv(db: Database) {
  const stats = programStats(db);
  const rows: (string | number)[][] = [
    ['检测程式', '名称', '线体', '机台', '批次数', '板数', '机器判点', '误报数', '误报率%', '返修板', '返修率%', '申诉数', '未结申诉', '退回批次', '误报预警阈值%'],
  ];
  for (const s of stats) {
    rows.push([
      s.code,
      s.name,
      s.line,
      s.machineId,
      s.batches,
      s.boards,
      s.machineCalls,
      s.falseCalls,
      (s.falseRate * 100).toFixed(2),
      s.reworkBoards,
      (s.reworkRate * 100).toFixed(2),
      s.appeals,
      s.openAppeals,
      s.rejectedBatches,
      s.alertThreshold,
    ]);
  }
  download(`AOI-程式质量统计.csv`, new Blob([`﻿${csvOf(rows)}`], { type: 'text/csv;charset=utf-8' }));
}

export { RETURN_CATEGORIES };
