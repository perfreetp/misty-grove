import { FINDING_META, FINDING_ORDER, SEGMENT_META, SEGMENT_ORDER, STATUS_META } from '../constants';
import { store } from '../store';
import type { Exam, ExamStatus } from '../types';
import { formatClock, formatDuration, formatWhenFull, percent } from '../utils';
import { html, icon } from '../ui';
import { segmentForFrame } from '../frames';
import type { ViewInstance } from './types';

interface Row {
  exam: Exam;
  readerSeconds: number;
  findings: number;
  returns: number;
  published: boolean;
}

export function createStatsView(): ViewInstance {
  let root: HTMLElement | null = null;
  let charts: { destroy(): void }[] = [];

  function computeRows(): Row[] {
    return store.state.exams.map((e) => {
      const readerSeconds = e.assessments.reduce((sum, a) => sum + (a.readingSeconds ?? 0), 0);
      return {
        exam: e,
        readerSeconds,
        findings: e.findings.length,
        returns: e.returnCount ?? 0,
        published: e.status === 'published',
      };
    });
  }

  function aggregate(): {
    total: number;
    publishedCount: number;
    inProgress: number;
    pending: number;
    review: number;
    returnedCount: number;
    returnRate: number;
    totalSeconds: number;
    avgSeconds: number;
    totalFindings: number;
    avgFindings: number;
    detectRate: number;
    dual: number;
    dualDisagree: number;
  } {
    const exams = store.state.exams;
    const total = exams.length;
    const publishedExams = exams.filter((e) => e.reportVersions.some((v) => v.status === 'published' || v.status === 'superseded'));
    const reviewReached = exams.filter((e) => e.reportVersions.length > 0);
    const returnedExams = exams.filter((e) => (e.returnCount ?? 0) > 0);
    const readingRows = exams.filter((e) => e.assessments.some((a) => a.startedAt));
    const totalSeconds = exams.reduce((s, e) => s + e.assessments.reduce((x, a) => x + (a.readingSeconds ?? 0), 0), 0);
    const totalFindings = exams.reduce((s, e) => s + e.findings.length, 0);
    const dualExams = exams.filter((e) => e.dualReading && e.readers.length >= 2);
    const disagree = dualExams.filter((e) => store.hasConclusionDisagreement(e)).length;
    const detectRate = publishedExams.length
      ? percent(publishedExams.filter((e) => e.findings.length > 0).length, publishedExams.length)
      : 0;
    return {
      total,
      publishedCount: publishedExams.length,
      inProgress: exams.filter((e) => e.status === 'reading').length,
      pending: exams.filter((e) => e.status === 'pending').length,
      review: exams.filter((e) => e.status === 'review').length,
      returnedCount: returnedExams.length,
      returnRate: reviewReached.length ? percent(returnedExams.length, reviewReached.length) : 0,
      totalSeconds,
      avgSeconds: readingRows.length ? totalSeconds / readingRows.length : 0,
      totalFindings,
      avgFindings: total ? totalFindings / total : 0,
      detectRate,
      dual: dualExams.length,
      dualDisagree: disagree,
    };
  }

  function render(): void {
    if (!root) return;
    for (const c of charts) c.destroy();
    charts = [];
    const rows = computeRows();
    const a = aggregate();
    const statusCounts = (Object.keys(STATUS_META) as ExamStatus[]).map((s) => ({
      key: s,
      count: store.state.exams.filter((e) => e.status === s).length,
    }));
    const findingCounts = FINDING_ORDER.map((t) => ({
      type: t,
      count: store.state.exams.reduce((s, e) => s + e.findings.filter((f) => f.type === t).length, 0),
    }));
    const maxFinding = Math.max(1, ...findingCounts.map((f) => f.count));
    const segCounts = SEGMENT_ORDER.map((key) => ({
      key,
      count: store.state.exams.reduce(
        (s, e) => s + e.findings.filter((f) => segmentForFrame(e, f.frameIndex) === key).length,
        0,
      ),
    }));
    const maxSeg = Math.max(1, ...segCounts.map((s) => s.count));
    const sortedByFindings = [...rows].sort((x, y) => y.findings - x.findings).slice(0, 6);

    root.innerHTML = String(html`
      <div class="stats-view">
        <div class="view-head">
          <div>
            <h1 class="view-title">阅片统计</h1>
            <div class="view-sub">统计阅片时长、病灶检出数与退回率；数据来自浏览器本地存储，实时汇总。</div>
          </div>
          <span class="tag" style="padding:4px 10px">${icon('layers')} ${a.total} 条检查单</span>
        </div>

        <div class="kpi-grid">
          <div class="kpi" style="--kpi-glow:rgba(45,212,191,0.2)">
            <div class="kpi-label">${icon('clock')}平均阅片时长</div>
            <div class="kpi-value">${(a.avgSeconds / 60).toFixed(1)}<small>分钟 / 人次</small></div>
            <div class="kpi-sub">累计 ${formatDuration(a.totalSeconds)} · 含双阅人次</div>
          </div>
          <div class="kpi" style="--kpi-glow:rgba(139,92,246,0.2)">
            <div class="kpi-label">${icon('lesions')}病灶检出</div>
            <div class="kpi-value">${a.totalFindings}<small>处</small></div>
            <div class="kpi-sub">平均 ${a.avgFindings.toFixed(2)} 处/检查 · 阳性率 ${a.detectRate}%</div>
          </div>
          <div class="kpi" style="--kpi-glow:rgba(251,113,133,0.2)">
            <div class="kpi-label">${icon('undo')}退回率</div>
            <div class="kpi-value">${a.returnRate}<small>%</small></div>
            <div class="kpi-sub">${a.returnedCount} 条被退回 · 送审 ${a.total - a.pending - a.inProgress} 条</div>
          </div>
          <div class="kpi" style="--kpi-glow:rgba(56,189,248,0.2)">
            <div class="kpi-label">${icon('check')}已发布 / 待审核</div>
            <div class="kpi-value">${a.publishedCount}<small>/ ${a.review} 待审</small></div>
            <div class="kpi-sub">待阅片 ${a.pending} · 阅片中 ${a.inProgress}</div>
          </div>
        </div>

        <div class="stats-grid">
          <section class="panel">
            <div class="panel-head">
              <span class="panel-title"><span class="accent-bar"></span>状态分布</span>
              <span class="hint">按检查单当前状态</span>
            </div>
            <div class="panel-body">
              <div class="chart-host" id="statusChart"></div>
              <div class="chart-legend">
                ${statusCounts.map(
                  (s) => html`<span><span class="legend-dot" style="background:${statusColor(s.key)}"></span>${STATUS_META[s.key].label} ${s.count}</span>`,
                )}
              </div>
            </div>
          </section>

          <section class="panel">
            <div class="panel-head">
              <span class="panel-title"><span class="accent-bar"></span>阅片时长分布</span>
              <span class="hint">单位：分钟 / 检查（按阅片人次累计）</span>
            </div>
            <div class="panel-body">
              <div class="chart-host" id="durationChart"></div>
            </div>
          </section>
        </div>

        <div class="stats-grid">
          <section class="panel">
            <div class="panel-head">
              <span class="panel-title"><span class="accent-bar"></span>病灶类型检出</span>
              <span class="tag">${FINDING_ORDER.length} 类</span>
            </div>
            <div class="panel-body">
              ${findingCounts.map(
                (f) => html`<div class="dist-row">
                  <span class="dist-label"><span class="legend-dot" style="background:${FINDING_META[f.type].color}"></span>${FINDING_META[f.type].label}</span>
                  <span class="dist-track"><span class="dist-fill" style="width:${(f.count / maxFinding) * 100}%;background:${FINDING_META[f.type].color}"></span></span>
                  <span class="dist-num">${f.count}</span>
                </div>`,
              )}
            </div>
          </section>
          <section class="panel">
            <div class="panel-head">
              <span class="panel-title"><span class="accent-bar"></span>病灶肠段分布</span>
              <span class="hint">按病灶帧所在分段</span>
            </div>
            <div class="panel-body">
              ${segCounts.map(
                (s) => html`<div class="dist-row">
                  <span class="dist-label" style="color:${SEGMENT_META[s.key].text}"><span class="legend-dot" style="background:${SEGMENT_META[s.key].border}"></span>${SEGMENT_META[s.key].short}</span>
                  <span class="dist-track"><span class="dist-fill" style="width:${(s.count / maxSeg) * 100}%;background:${SEGMENT_META[s.key].border}"></span></span>
                  <span class="dist-num">${s.count}</span>
                </div>`,
              )}
            </div>
          </section>
        </div>

        <section class="panel">
          <div class="panel-head">
            <span class="panel-title"><span class="accent-bar"></span>检查单明细</span>
            <span class="hint">点击行跳转到对应检查单</span>
          </div>
          <div class="panel-body" style="padding:4px 10px 10px;overflow-x:auto">
            <table class="stats-table">
              <thead>
                <tr>
                  <th>检查号</th><th>受检者</th><th>状态</th><th>阅片人</th><th class="num">阅片时长</th><th class="num">检出病灶</th><th class="num">关键帧</th><th class="num">退回</th><th>版本</th>
                </tr>
              </thead>
              <tbody>
                ${rows.map((r) => {
                  const e = r.exam;
                  const kf = e.findings.reduce((s, f) => s + f.keyframes.length, 0);
                  return html`<tr data-exam="${e.id}">
                    <td class="mono">${e.code}</td>
                    <td>${e.patientName}</td>
                    <td><span class="status-badge ${STATUS_META[e.status].tone}">${STATUS_META[e.status].label}</span></td>
                    <td>${e.readers.map((id) => e.readerNames[id] ?? id).join(' / ')}</td>
                    <td class="num">${formatClock(r.readerSeconds)}</td>
                    <td class="num">${r.findings}</td>
                    <td class="num">${kf}</td>
                    <td class="num">
                      <span class="rate-bar">
                        <span class="rate-track"><span class="rate-fill" style="width:${Math.min(100, r.returns * 50)}%;background:${r.returns > 0 ? '#fb7185' : 'rgba(255,255,255,0.2)'}"></span></span>
                        ${r.returns}
                      </span>
                    </td>
                    <td class="mono">${e.reportVersions.length ? `v${e.reportVersions.at(-1)?.version}` : '—'}</td>
                  </tr>`;
                })}
              </tbody>
            </table>
          </div>
        </section>

        <div class="stats-grid">
          <section class="panel">
            <div class="panel-head">
              <span class="panel-title"><span class="accent-bar"></span>病灶检出 TOP</span>
              <span class="hint">按病灶数排序</span>
            </div>
            <div class="panel-body">
              ${sortedByFindings.map(
                (r, i) => html`<div class="dist-row">
                  <span class="dist-label mono" style="width:22px;color:var(--text-faint)">${i + 1}</span>
                  <span class="dist-label" style="width:70px">${r.exam.patientName}</span>
                  <span class="dist-track"><span class="dist-fill" style="width:${(r.findings / Math.max(1, sortedByFindings[0]?.findings ?? 1)) * 100}%;background:linear-gradient(90deg,#2dd4bf,#38bdf8)"></span></span>
                  <span class="dist-num">${r.findings}</span>
                </div>`,
              )}
            </div>
          </section>
          <section class="panel">
            <div class="panel-head">
              <span class="panel-title"><span class="accent-bar"></span>双人阅片一致性</span>
            </div>
            <div class="panel-body">
              <div class="kv"><span class="k">双人阅片检查</span><span class="v mono">${a.dual} 条</span></div>
              <div class="kv"><span class="k">结论存在差异</span><span class="v mono">${a.dualDisagree} 条</span></div>
              <div class="kv"><span class="k">差异率</span><span class="v mono">${a.dual ? percent(a.dualDisagree, a.dual) : 0}%</span></div>
              <div class="divider"></div>
              <div class="hint" style="line-height:1.65">退回后被重新提交的记录计入退回率；发布时间以最终审核通过时间为准。</div>
            </div>
          </section>
        </div>
      </div>
    `);

    charts.push(drawStatusDonut(root.querySelector<HTMLElement>('#statusChart'), statusCounts));
    charts.push(drawDurationBars(root.querySelector<HTMLElement>('#durationChart'), rows));
    bindRows();
  }

  function bindRows(): void {
    root?.querySelectorAll<HTMLElement>('tr[data-exam]').forEach((tr) => {
      tr.addEventListener('click', () => {
        if (tr.dataset.exam) store.selectExam(tr.dataset.exam);
      });
    });
  }

  return {
    mount(el: HTMLElement) {
      root = el;
      render();
    },
    update() {
      const active = document.activeElement;
      if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) return;
      render();
    },
    destroy() {
      for (const c of charts) c.destroy();
      charts = [];
      root = null;
    },
  };
}

function statusColor(s: ExamStatus): string {
  switch (s) {
    case 'pending':
      return '#94a3b8';
    case 'reading':
      return '#22d3ee';
    case 'review':
      return '#fbbf24';
    case 'returned':
      return '#fb7185';
    case 'published':
      return '#34d399';
  }
}

function drawStatusDonut(host: HTMLElement | null, counts: { key: ExamStatus; count: number }[]): { destroy(): void } {
  if (!host) return { destroy: () => {} };
  const canvas = document.createElement('canvas');
  host.appendChild(canvas);
  let ro: ResizeObserver | null = null;
  const total = counts.reduce((s, c) => s + c.count, 0);

  const paint = () => {
    const w = host.clientWidth;
    const h = 170;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const cx = Math.min(w * 0.32, 104);
    const cy = h / 2;
    const r = Math.min(h * 0.41, 64);
    const thick = 17;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = thick;
    ctx.stroke();
    let start = -Math.PI / 2;
    if (total === 0) {
      ctx.fillStyle = 'rgba(148,163,184,0.6)';
      ctx.font = '11px "Segoe UI", "Microsoft YaHei", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('暂无数据', cx, cy + 4);
      return;
    }
    const gap = 0.03;
    for (const c of counts) {
      if (c.count === 0) continue;
      const sweep = (c.count / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(cx, cy, r, start + gap / 2, start + Math.max(gap, sweep - gap / 2));
      ctx.strokeStyle = statusColor(c.key);
      ctx.lineWidth = thick;
      ctx.lineCap = 'butt';
      ctx.stroke();
      start += sweep;
    }
    ctx.fillStyle = '#e6edf7';
    ctx.font = '700 22px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(total), cx, cy - 6);
    ctx.fillStyle = '#64748b';
    ctx.font = '500 10px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText('检查单', cx, cy + 13);

    const legendX = cx + r + 30;
    let ly = cy - (counts.filter((c) => c.count > 0).length * 22) / 2 + 6;
    ctx.textAlign = 'left';
    for (const c of counts) {
      if (c.count === 0) continue;
      ctx.fillStyle = statusColor(c.key);
      ctx.beginPath();
      ctx.roundRect(legendX, ly - 5, 8, 8, 2);
      ctx.fill();
      ctx.fillStyle = '#93a4bb';
      ctx.font = '500 11px "Segoe UI", "Microsoft YaHei", sans-serif';
      const label = `${STATUS_META[c.key].label}`;
      ctx.fillText(label, legendX + 14, ly + 2);
      ctx.fillStyle = '#e6edf7';
      ctx.font = '600 11.5px "Cascadia Mono", ui-monospace, monospace';
      ctx.fillText(`${c.count} · ${percent(c.count, total)}%`, legendX + 76, ly + 2);
      ly += 22;
    }
  };

  paint();
  ro = new ResizeObserver(() => paint());
  ro.observe(host);
  return {
    destroy() {
      ro?.disconnect();
      canvas.remove();
    },
  };
}

function drawDurationBars(host: HTMLElement | null, rows: Row[]): { destroy(): void } {
  if (!host) return { destroy: () => {} };
  const canvas = document.createElement('canvas');
  host.appendChild(canvas);
  let ro: ResizeObserver | null = null;

  const paint = () => {
    const w = host.clientWidth;
    const h = 170;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const items = rows.filter((r) => r.readerSeconds > 0).sort((a, b) => b.readerSeconds - a.readerSeconds).slice(0, 8);
    if (items.length === 0) {
      ctx.fillStyle = 'rgba(148,163,184,0.6)';
      ctx.font = '11px "Segoe UI", "Microsoft YaHei", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('暂无阅片时长数据', w / 2, h / 2);
      return;
    }
    const padL = 74;
    const padR = 44;
    const padT = 8;
    const padB = 8;
    const rowH = (h - padT - padB) / items.length;
    const max = Math.max(...items.map((i) => i.readerSeconds));
    items.forEach((r, i) => {
      const y = padT + i * rowH + rowH / 2;
      const barH = Math.min(11, rowH - 5);
      const bw = ((w - padL - padR) * r.readerSeconds) / max;
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      ctx.beginPath();
      ctx.roundRect(padL, y - barH / 2, w - padL - padR, barH, barH / 2);
      ctx.fill();
      const grad = ctx.createLinearGradient(padL, 0, padL + bw, 0);
      grad.addColorStop(0, '#14b8a6');
      grad.addColorStop(1, '#38bdf8');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(padL, y - barH / 2, Math.max(barH, bw), barH, barH / 2);
      ctx.fill();
      ctx.fillStyle = '#93a4bb';
      ctx.font = '500 10.5px "Segoe UI", "Microsoft YaHei", sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      const label = r.exam.patientName;
      ctx.fillText(label, padL - 9, y + 0.5);
      ctx.fillStyle = '#e6edf7';
      ctx.font = '600 10px "Cascadia Mono", ui-monospace, monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`${(r.readerSeconds / 60).toFixed(1)} 分`, padL + Math.max(barH, bw) + 7, y + 0.5);
      void formatWhenFull;
    });
  };

  paint();
  ro = new ResizeObserver(() => paint());
  ro.observe(host);
  return {
    destroy() {
      ro?.disconnect();
      canvas.remove();
    },
  };
}

