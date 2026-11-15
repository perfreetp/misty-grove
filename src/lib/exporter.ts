// 进展报告（HTML 下载）与厚度趋势表（CSV 下载）
import { compareQuads, meanThicknessUm, quadStats } from './oct';
import { getDevice, state, visitChain } from '../store';
import { EYE_LABEL, LAYER_LABEL, STAGE_LABEL, VERDICT_LABEL, type Eye, type Patient, type Visit } from '../types';
import { fmtDate, fmtDay } from './util';

function download(filename: string, content: string, mime: string) {
  const blob = new Blob(['﻿', content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function patient(id: string): Patient {
  return state.patients.find((p) => p.id === id) as Patient;
}

function previous(v: Visit): Visit | null {
  const chain = visitChain(v.patientId, v.eye).filter((x) => x.acquiredAt < v.acquiredAt && x.layers);
  return chain.length ? chain[chain.length - 1] : null;
}

/** 单患者进展报告：汇总所有已判读访视 */
export function exportProgressReport(patientId: string) {
  const p = patient(patientId);
  const visits = ['OD', 'OS'].flatMap((eye) => visitChain(patientId, eye as Eye));
  const interpreted = visits.filter((v) => v.interpretation);

  const rows = interpreted
    .map((v) => {
      const dev = getDevice(v.deviceId);
      const prev = previous(v);
      const cmp = compareQuads(v, prev, dev.scaleZum);
      const flags = cmp.filter((c) => c.flagged);
      return `
      <section class="card">
        <h3>${fmtDay(v.acquiredAt)} · ${EYE_LABEL[v.eye]} · ${STAGE_LABEL[v.stage]}</h3>
        <p><b>结论：<span class="verdict-${v.interpretation!.verdict}">${VERDICT_LABEL[v.interpretation!.verdict]}</span></b>
        &nbsp;判读人：${v.interpretation!.by}（${fmtDate(v.interpretation!.at)}）</p>
        <p><b>依据：</b>${v.interpretation!.rationale}</p>
        <p><b>平均厚度：</b>${meanThicknessUm(v, dev.scaleZum).toFixed(1)} µm
        ${prev ? `（上次 ${meanThicknessUm(prev, dev.scaleZum).toFixed(1)} µm，差值 ${(meanThicknessUm(v, dev.scaleZum) - meanThicknessUm(prev, dev.scaleZum)).toFixed(1)} µm）` : '（首次访视）'}</p>
        <table>
          <thead><tr><th>象限</th><th>本次均值(µm)</th><th>上次均值(µm)</th><th>差值(µm)</th><th>断裂点</th><th>标红原因</th></tr></thead>
          <tbody>
            ${cmp
              .map((c) => {
                const q = quadStats(v, dev.scaleZum).find((x) => x.quad === c.quad)!;
                return `<tr class="${c.flagged ? 'flag' : ''}">
                  <td>${c.label}</td><td>${c.current.toFixed(1)}</td>
                  <td>${c.previous != null ? c.previous.toFixed(1) : '—'}</td>
                  <td>${c.deltaUm != null ? c.deltaUm.toFixed(1) : '—'}</td>
                  <td>${q.breaks}</td><td>${c.reason}</td></tr>`;
              })
              .join('')}
          </tbody>
        </table>
        ${flags.length ? `<p class="flags">标红象限：${flags.map((f) => `${f.label}（${f.reason}）`).join('；')}</p>` : ''}
        <details><summary>操作审计（${v.audit.length} 条）</summary>
        <table class="audit"><thead><tr><th>时间</th><th>操作人</th><th>角色</th><th>动作</th><th>明细</th></tr></thead>
        <tbody>${v.audit
          .map(
            (a) =>
              `<tr><td>${fmtDate(a.at)}</td><td>${a.user}</td><td>${a.role}</td><td>${a.action}</td><td>${a.detail ?? ''}</td></tr>`,
          )
          .join('')}</tbody></table></details>
      </section>`;
    })
    .join('');

  const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">
<title>OCT 随访进展报告 - ${p.name}</title>
<style>
body{font-family:"Microsoft YaHei",sans-serif;margin:32px;color:#1d2733}
h1{margin-bottom:4px}.sub{color:#667}
.card{border:1px solid #d4dce6;border-radius:10px;padding:16px 20px;margin:16px 0;page-break-inside:avoid}
table{border-collapse:collapse;width:100%;margin-top:8px;font-size:13px}
th,td{border:1px solid #c8d2de;padding:6px 8px;text-align:left}
th{background:#eef2f7}.flag{background:#fdeaea}.flags{color:#c0392b;font-weight:bold}
.verdict-progression{color:#c0392b}.verdict-suspect{color:#b8860b}.verdict-stable{color:#1e8449}
.audit{font-size:12px;color:#445}summary{cursor:pointer;margin-top:10px}
</style></head><body>
<h1>OCT 随访进展报告</h1>
<p class="sub">患者：${p.name}（${p.mrn}） · ${p.sex} · ${new Date().getFullYear() - p.birthYear} 岁 · 生成时间：${fmtDate(new Date().toISOString())}</p>
<p class="sub">分层边界：${(['ILM', 'GCL', 'LC'] as const).map((k) => LAYER_LABEL[k]).join('、')}；预警规则：象限平均厚度变薄 &gt; 5µm 或存在分层断裂。</p>
${rows || '<p>暂无已判读访视。</p>'}
</body></html>`;
  download(`OCT进展报告_${p.name}_${fmtDay(new Date().toISOString())}.html`, html, 'text/html');
}

/** 厚度趋势 CSV：每访视一行，含双眼四象限与均值 */
export function exportThicknessTrend(patientId: string) {
  const p = patient(patientId);
  const header = [
    '采集日期', '眼别', '状态', '设备',
    '颞上均值µm', '鼻上均值µm', '颞下均值µm', '鼻下均值µm', '全眼均值µm',
    '断裂点合计', '判读结论', '判读依据', '判读人', '判读时间',
  ];
  const lines: string[] = [header.join(',')];
  for (const eye of ['OD', 'OS'] as Eye[]) {
    for (const v of visitChain(patientId, eye)) {
      if (!v.layers) continue;
      const dev = getDevice(v.deviceId);
      const q = quadStats(v, dev.scaleZum);
      const get = (k: string) => q.find((x) => x.quad === k)!.meanUm.toFixed(1);
      const breaks = q.reduce((s, x) => s + x.breaks, 0);
      lines.push(
        [
          fmtDay(v.acquiredAt),
          eye,
          STAGE_LABEL[v.stage],
          `${getDevice(v.deviceId).vendor} ${getDevice(v.deviceId).model}`,
          get('ST'), get('SN'), get('IT'), get('IN'),
          meanThicknessUm(v, dev.scaleZum).toFixed(1),
          breaks,
          v.interpretation ? VERDICT_LABEL[v.interpretation.verdict] : '',
          `"${(v.interpretation?.rationale ?? '').replace(/"/g, '""')}"`,
          v.interpretation?.by ?? '',
          v.interpretation ? fmtDate(v.interpretation.at) : '',
        ].join(','),
      );
    }
  }
  download(`OCT厚度趋势表_${p.name}.csv`, lines.join('\n'), 'text/csv');
}
