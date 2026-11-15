/* BoardDocs Studio — 型号汇总统计 */
import { U } from '../util.js';
import { store, boardStats } from '../store.js';

export function renderStats({ host, app, nav }) {
  const rows = store.boards().map((b) => ({ board: b, s: boardStats(b) }));
  const totPins = rows.reduce((a, r) => a + r.s.pinCount, 0);
  const totAnn = rows.reduce((a, r) => a + r.s.annotated, 0);
  const totVolt = rows.reduce((a, r) => a + r.s.voltageCount, 0);
  const totConf = rows.reduce((a, r) => a + r.s.conflictCount, 0);
  const durations = rows.flatMap((r) => r.s.reviewDurations);
  const avg = durations.length ? durations.reduce((a, b) => a + b, 0) / durations.length : null;
  const openCount = store.openReviews().length;
  const versions = rows.reduce((a, r) => a + r.s.versionCount, 0);

  const page = U.h('div', { class: 'page' });
  page.appendChild(U.h('div', { class: 'page-head' },
    U.h('div', {}, U.h('h1', {}, '按型号汇总'), U.h('p', {}, '引脚数量、已标注比例与审核时长；未标注电压的引脚在发布检查中列为阻断项。')),
    U.h('div', { class: 'spacer' }),
    U.h('button', { class: 'btn', onclick: () => exportSummary() }, '⤓ 导出汇总 CSV')
  ));

  const cards = U.h('div', { class: 'stat-cards' },
    sc(String(totPins), '引脚总数'),
    sc(`${totAnn} / ${totPins}`, `已标注 ${U.fmtPct(totPins ? totAnn / totPins : 0)}`),
    sc(String(totPins - totVolt), totPins - totVolt ? '未标电压（阻断）' : '电压标注完整', totPins - totVolt ? 'bad' : 'good'),
    sc(String(totConf), totConf ? '功能重复占用' : '无功能冲突', totConf ? 'bad' : 'good'),
    sc(avg ? U.fmtDuration(avg) : '—', '平均审核时长'),
    sc(String(openCount), '待审核'),
    sc(String(versions), '已发布版本')
  );
  page.appendChild(cards);

  /* 已标注比例图 */
  page.appendChild(U.h('div', { class: 'section-title' }, '已标注比例'));
  const chart = U.h('div', { class: 'chart' });
  rows.forEach(({ board, s }) => {
    const pct = s.pinCount ? s.annotated / s.pinCount : 0;
    const voltPct = s.pinCount ? s.voltageCount / s.pinCount : 0;
    chart.appendChild(U.h('div', { class: 'chart-row' },
      U.h('a', { href: `#/board/${board.id}/editor`, style: { color: 'var(--fg)', textDecoration: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, board.name),
      U.h('div', { class: 'track', title: `完整标注 ${s.annotated} / ${s.pinCount}` },
        U.h('i', { style: { width: pct * 100 + '%', background: 'linear-gradient(90deg,#2aa895,#4fd6c0)' } }),
        U.h('i', { style: { width: Math.max(0, (voltPct - pct)) * 100 + '%', background: 'rgba(232,180,90,.55)' } })
      ),
      U.h('span', { class: 'bounds' }, `${s.annotated}/${s.pinCount} · ${U.fmtPct(pct)}`)
    ));
  });
  page.appendChild(chart);
  page.appendChild(U.h('p', { class: 'hint' }, '绿色为名称 + 电压 + 复用功能均已填写的完整标注；黄色部分为仅填了电压、功能缺失的引脚。'));

  /* 明细表 */
  page.appendChild(U.h('div', { class: 'section-title' }, '型号明细'));
  const table = U.h('table', { class: 'grid' },
    U.h('thead', {}, U.h('tr', {}, ['型号', 'SKU', '引脚数', '已标注', '未标电压', '功能冲突', '装配步骤', '审核次数', '平均审核时长', '状态'].map((h) => U.h('th', {}, h)))),
    U.h('tbody', {}, rows.map(({ board, s }) =>
      U.h('tr', {},
        U.h('td', {}, U.h('a', { href: `#/board/${board.id}/editor`, style: { color: 'var(--accent)', textDecoration: 'none' } }, board.name)),
        U.h('td', { class: 'mono muted' }, board.sku),
        U.h('td', { class: 'mono' }, String(s.pinCount)),
        U.h('td', { class: 'mono', style: { color: s.annotatedRatio >= 0.99 ? 'var(--green)' : 'var(--amber)' } }, `${s.annotated}（${U.fmtPct(s.annotatedRatio)}）`),
        U.h('td', { class: 'mono', style: s.pinCount - s.voltageCount ? { color: 'var(--red)' } : null }, String(s.pinCount - s.voltageCount)),
        U.h('td', { class: 'mono', style: s.conflictCount ? { color: 'var(--red)' } : null }, String(s.conflictCount)),
        U.h('td', { class: 'mono' }, String(s.stepCount)),
        U.h('td', { class: 'mono' }, String(s.reviewCount)),
        U.h('td', { class: 'mono' }, s.avgReview ? U.fmtDuration(s.avgReview) : '—'),
        U.h('td', {}, U.h('span', { class: 'tag ' + statusTag(board) }, statusText(board)))
      )))
  );
  page.appendChild(U.h('div', { style: { overflowX: 'auto', border: '1px solid var(--line)', borderRadius: '9px' } }, table));
  host.appendChild(page);

  function sc(v, l, cls) {
    return U.h('div', { class: 'stat-card' + (cls === 'bad' ? ' bad' : cls === 'good' ? ' good' : '') },
      U.h('div', { class: 'num', style: cls === 'bad' ? { color: 'var(--red)' } : cls === 'good' ? { color: 'var(--green)' } : null }, v),
      U.h('div', { class: 'lbl' }, l));
  }
  function statusText(b) {
    if (!b.work) return b.versions.length ? '已发布' : '未开始';
    return { draft: '编辑中', in_review: '待审核', rejected: '已退回', approved: '已通过' }[b.work.status] || b.work.status;
  }
  function statusTag(b) {
    if (!b.work) return b.versions.length ? 'violet' : 'off';
    return { draft: 'amber', in_review: 'blue', rejected: 'red', approved: 'green' }[b.work.status] || 'off';
  }
  function exportSummary() {
    const head = ['型号', 'SKU', '引脚数', '已标注', '已标注比例', '未标电压', '功能冲突', '图层数', '装配步骤', '审核次数', '平均审核时长(分钟)', '最新版本'];
    const lines = [head.join(',')];
    rows.forEach(({ board, s }) => {
      const last = board.versions[board.versions.length - 1];
      lines.push([
        board.name, board.sku, s.pinCount, s.annotated, (s.annotatedRatio * 100).toFixed(1) + '%',
        s.pinCount - s.voltageCount, s.conflictCount, s.layerCount, s.stepCount, s.reviewCount,
        s.avgReview ? Math.round(s.avgReview / 60000) : '', last ? `${last.label}/${last.firmware}` : '未发布',
      ].map((v) => (/[",\n]/.test(String(v)) ? '"' + String(v).replace(/"/g, '""') + '"' : v)).join(','));
    });
    U.download('board_summary.csv', '﻿' + lines.join('\r\n'), 'text/csv;charset=utf-8');
    U.toast('已导出型号汇总');
  }

  return {};
}
