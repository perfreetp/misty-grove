import {
  STATUS_META, fmtCN, pointSite, polygonClockSpan, polygonQuadrants, tzCoverage,
  lesionMetrics, totalAreaMM2, pathologyProgress, worstGrade, PATH_SEVERITY, TZ_TYPES,
  compareExams, todayISO, unitMM
} from './domain.js';
import { resolveImage } from './imageCache.js';

const esc = s => String(s ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

function lesionSvg(lesions, geo, w = 300, h = 300) {
  const l = Array.isArray(lesions) ? lesions[0] : lesions;
  const pts = (l.points || []).map(p => `${(p.x * w).toFixed(1)},${(p.y * h).toFixed(1)}`).join(' ');
  const cx = geo.cx * w, cy = geo.cy * h;
  const ro = geo.outerR * Math.min(w, h);
  const ri = geo.innerR * Math.min(w, h);
  const clock = Array.from({ length: 12 }, (_, i) => {
    const a = ((i + 1) * 30 * Math.PI) / 180;
    return `<line x1="${cx + (ro * 0.94) * Math.sin(a)}" y1="${cy - (ro * 0.94) * Math.cos(a)}" x2="${cx + ro * 1.04 * Math.sin(a)}" y2="${cy - ro * 1.04 * Math.cos(a)}" stroke="#c9d2cc" stroke-width="1"/>`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="${w}" height="${h}" fill="#f7f8f4"/>
    <circle cx="${cx}" cy="${cy}" r="${ro}" fill="none" stroke="#b8c5bd" stroke-dasharray="4 4" stroke-width="1.2"/>
    <circle cx="${cx}" cy="${cy}" r="${ri}" fill="none" stroke="#d8bd85" stroke-width="1.2"/>
    ${clock}
    <text x="${cx}" y="${cy - ro * 1.08}" font-size="10" fill="#8b9992" text-anchor="middle" font-family="monospace">12</text>
    <text x="${cx + ro * 1.12}" y="${cy + 4}" font-size="10" fill="#8b9992" text-anchor="middle" font-family="monospace">3</text>
    <text x="${cx}" y="${cy + ro * 1.16}" font-size="10" fill="#8b9992" text-anchor="middle" font-family="monospace">6</text>
    <text x="${cx - ro * 1.12}" y="${cy + 4}" font-size="10" fill="#8b9992" text-anchor="middle" font-family="monospace">9</text>
    ${(Array.isArray(lesions) ? lesions : [lesions]).map(x => {
      const p2 = (x.points || []).map(pt => `${(pt.x * w).toFixed(1)},${(pt.y * h).toFixed(1)}`).join(' ');
      const c = x.grade === '高级别' ? '#be185d' : x.grade === '可疑浸润' ? '#9f1239' : '#b45309';
      return `<polygon points="${p2}" fill="rgba(219,39,119,.16)" stroke="${c}" stroke-width="2"/>`;
    }).join('')}

    <circle cx="${cx}" cy="${cy}" r="2.5" fill="#0f766e"/>
  </svg>`;
}

export function buildReportHTML(c, options = {}) {
  const exam = c.exam || {};
  const geo = exam.geometry || { cx: 0.5, cy: 0.47, innerR: 0.052, outerR: 0.3 };
  const lesions = exam.lesions || [];
  const biopsies = exam.biopsies || [];
  const prior = (c.priorExams || [])[0] || null;
  const cmp = compareExams(prior, exam);
  const prog = pathologyProgress(exam);
  const worst = worstGrade(exam);
  const tz = TZ_TYPES.find(t => t.key === exam.tzType);
  const img = k => {
    const src = exam.images?.[k];
    if (!src) return '';
    const url = resolveImage(src, lesions, geo, exam.tzType);
    return url ? `<img src="${url}" alt="">` : '';
  };

  const lesionRows = lesions.map((l, i) => {
    const m = lesionMetrics(l, geo);
    return `<tr>
      <td>${i + 1}</td>
      <td>${esc(m.label)}</td>
      <td>${esc(l.grade)}</td>
      <td>${m.quadrants.join('、')}</td>
      <td>${l.circumferenceManual ?? m.circumference}%</td>
      <td>${m.areaMM2.toFixed(1)} mm²</td>
      <td>${esc(m.tz.label)}</td>
    </tr>`;
  }).join('');

  const biopsyRows = biopsies.map((b, i) => {
    const site = pointSite(b.point, geo);
    return `<tr>
      <td>${i + 1}</td>
      <td style="font-family:monospace">${esc(b.vial)}</td>
      <td>${esc(b.siteText || site.description)}</td>
      <td>${esc(b.pathGrade || '待回填')}</td>
      <td>${esc(b.pathDate ? fmtCN(b.pathDate) : '—')}</td>
      <td>${esc(b.pathNote || '')}</td>
    </tr>`;
  }).join('');

  const taskRows = (c.tasks || []).map(t => `<tr>
      <td>${esc(t.kind)}</td><td>${esc(t.dueDate)}</td><td>${esc(t.status)}</td>
      <td style="font-size:10px">${(t.history || []).map(h => `改约 ${h.from}→${h.to}（${esc(h.reason)}）`).join('<br>') || '—'}</td>
    </tr>`).join('');

  return `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><title>阴道镜检查报告 ${esc(c.accession)}</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; padding: 26px 30px; font-family: "Songti SC","STSong","SimSun",serif; color: #1a2320; background: #fff; font-size: 12px; line-height: 1.6; }
  .head { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0f766e; padding-bottom: 10px; }
  .title { font-size: 19px; font-weight: 700; letter-spacing: .04em; }
  .sub { font-size: 11px; color: #5d6b64; margin-top: 3px; }
  .acc { text-align: right; font-size: 11px; color: #5d6b64; }
  .acc b { font-family: monospace; font-size: 13px; color: #152320; display: block; }
  h2 { font-size: 12px; letter-spacing: .12em; color: #0b5f59; border-left: 3px solid #0f766e; padding-left: 7px; margin: 18px 0 8px; }
  table { width: 100%; border-collapse: collapse; font-size: 11px; }
  th, td { border: 1px solid #d8e0d9; padding: 5px 7px; text-align: left; vertical-align: top; }
  th { background: #f2f5f0; font-weight: 600; color: #41524c; font-size: 10px; }
  .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px 22px; }
  .grid div { display: flex; gap: 8px; border-bottom: 1px dotted #e0e6df; padding: 3px 0; }
  .grid span:first-child { color: #71807a; width: 84px; flex: none; font-size: 11px; }
  .imgs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .imgs figure { margin: 0; }
  .imgs img { width: 100%; aspect-ratio: 4/3; object-fit: cover; border-radius: 4px; display: block; border: 1px solid #e0e6df; }
  .imgs figcaption { font-size: 10px; color: #5d6b64; text-align: center; margin-top: 3px; }
  .draw { display: grid; grid-template-columns: 250px 1fr; gap: 14px; align-items: start; }
  .callout { background: #fff8e6; border: 1px solid #f1d49a; color: #7c4a06; padding: 7px 10px; border-radius: 5px; font-size: 11px; margin-top: 8px; }
  .sign { display: flex; justify-content: space-between; margin-top: 30px; padding-top: 12px; border-top: 1px solid #d8e0d9; font-size: 11px; color: #41524c; }
  .sign div { display: flex; gap: 6px; }
  .sign b { font-weight: 600; }
  @media print { body { padding: 10mm 12mm; } .noprint { display: none; } @page { size: A4; margin: 8mm; } }
</style></head>
<body>
  <div class="head">
    <div>
      <div class="title">宫颈阴道镜检查报告</div>
      <div class="sub">钟面法病灶标注 · 活检与病理随访</div>
    </div>
    <div class="acc">检查编号<b>${esc(c.accession)}</b>${esc(STATUS_META[c.status]?.label || '')}</div>
  </div>

  <h2>基本信息</h2>
  <div class="grid">
    <div><span>姓名</span><span>${esc(c.name)}</span></div>
    <div><span>年龄</span><span>${esc(c.age ?? '—')} 岁</span></div>
    <div><span>阴道镜医师</span><span>${esc(c.physician)}</span></div>
    <div><span>联系电话</span><span>${esc(c.phone || '—')}</span></div>
    <div><span>检查日期</span><span>${exam.examDate ? fmtCN(exam.examDate) : '—'}</span></div>
    <div><span>孕产次</span><span>${esc(c.parity || '—')}</span></div>
    <div><span>末次月经</span><span>${esc(c.lmp || '—')}</span></div>
    <div><span>检查指征</span><span>${esc(c.indication || '—')}</span></div>
  </div>

  <h2>阴道镜影像</h2>
  <div class="imgs">
    <figure>${img('pre') || '<div style="aspect-ratio:4/3;background:#f2f5f0;border:1px solid #e0e6df"></div>'}<figcaption>醋酸前</figcaption></figure>
    <figure>${img('post') || '<div style="aspect-ratio:4/3;background:#f2f5f0;border:1px solid #e0e6df"></div>'}<figcaption>醋酸后</figcaption></figure>
    <figure>${img('iodine') || '<div style="aspect-ratio:4/3;background:#f2f5f0;border:1px solid #e0e6df"></div>'}<figcaption>碘染</figcaption></figure>
  </div>

  <h2>镜下所见</h2>
  <div class="grid">
    <div><span>转化区类型</span><span>${esc(tz?.label || exam.tzType || '—')}（${esc(tz?.hint || '')}）</span></div>
    <div><span>鳞柱交界</span><span>${esc(exam.scjVisible || '—')}</span></div>
    <div><span>醋酸反应</span><span>${esc(exam.aceticOnset || '—')} s</span></div>
    <div><span>碘试验</span><span>${esc(exam.lugol || '—')}</span></div>
  </div>
  <p style="margin:8px 0 0">${esc(exam.impression || exam.noLesionNote || '未见异常。')}</p>

  <h2>钟面病灶标注</h2>
  <div class="draw">
    <div>${lesions.length ? lesionSvg(lesions, geo) : '<div style="height:200px;display:grid;place-items:center;color:#98a39d;font-size:11px;background:#f7f8f4;border-radius:4px">未标注病灶</div>'}</div>
    <div>
      <table>
        <thead><tr><th>#</th><th>钟面方位</th><th>镜下分级</th><th>累及象限</th><th>累及周长</th><th>面积</th><th>转化区</th></tr></thead>
        <tbody>${lesionRows || '<tr><td colspan="7" style="text-align:center;color:#98a39d">无病灶标注</td></tr>'}</tbody>
      </table>
      <div class="legend" style="font-size:10px;color:#5d6b64;margin-bottom:6px">钟面为检查者视角 · 12 点朝上 · 3 点对应患者左侧</div>
      <div class="callout">总标注面积 <b>${totalAreaMM2(exam).toFixed(1)} mm²</b>；标定按原始 SCJ 直径 30mm。${lesions.some(l => tzCoverage(l.points, geo).crosses) ? '存在越过转化区的病灶。' : ''}</div>
    </div>
  </div>

  <h2>活检与病理</h2>
  <table>
    <thead><tr><th>#</th><th>瓶号</th><th>部位描述</th><th>病理分级</th><th>报告日期</th><th>备注</th></tr></thead>
    <tbody>${biopsyRows || '<tr><td colspan="6" style="text-align:center;color:#98a39d">未取活检</td></tr>'}</tbody>
  </table>
  ${biopsies.length ? `<p style="margin:7px 0 0">病理回填进度 ${prog.done}/${prog.total}，最高分级 <b>${esc(worst || '—')}</b>。</p>` : ''}

  ${prior ? `<h2>与上次检查对比</h2><p>上次检查：${esc(fmtCN(prior.examDate))}。${esc(cmp.summary)}。</p>${cmp.increased ? '<div class="callout">本次病灶面积较前次增大，已提示复核。</div>' : ''}` : ''}

  ${taskRows ? `<h2>随访计划</h2><table><thead><tr><th>任务</th><th>到期日</th><th>状态</th><th>改约记录</th></tr></thead><tbody>${taskRows}</tbody></table>` : ''}

  ${c.status === 'closed' ? `<h2>结案小结</h2><p>${esc(c.closeSummary || '')}</p>` : ''}

  <div class="sign">
    <div><b>报告医师：</b>${esc(c.physician)}</div>
    <div><b>病理核对：</b>${esc(biopsies.find(b => b.pathGrade)?.takenBy || '—')}</div>
    <div><b>报告日期：</b>${fmtCN(todayISO())}</div>
  </div>
  <div class="noprint" style="margin-top:20px;text-align:center">
    <button onclick="window.print()" style="padding:8px 20px;border-radius:6px;border:1px solid #0f766e;background:#0f766e;color:#fff;font-size:13px;cursor:pointer">打印 / 另存为 PDF</button>
  </div>
</body></html>`;
}

export function openReport(c) {
  const html = buildReportHTML(c);
  const w = window.open('', '_blank', 'width=900,height=1000');
  if (!w) {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `阴道镜报告-${c.accession}.html`;
    a.click();
    URL.revokeObjectURL(url);
    return false;
  }
  w.document.open();
  w.document.write(html);
  w.document.close();
  return true;
}

export function downloadReport(c) {
  const html = buildReportHTML(c);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `阴道镜报告-${c.accession}-${todayISO()}.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
