<script>
  import { physicianStats, aggregateStats, POSITIVE_DEFS, PATH_GRADES, PATH_SEVERITY, todayISO } from '../lib/domain.js';
  import { store } from '../lib/store.svelte.js';
  import PageHead from '../components/PageHead.svelte';
  import Icon from '../components/Icon.svelte';

  let def = $state('cin1');
  let sortBy = $state('rate');
  let range = $state('all');

  const scoped = $derived.by(() => {
    if (range === 'all') return store.cases;
    const days = range === '90' ? 90 : 365;
    const cutoff = new Date(Date.now() - days * 86400000);
    return store.cases.filter(c => new Date(c.exam?.examDate || c.registeredAt) >= cutoff);
  });

  const agg = $derived(aggregateStats(scoped, def));

  const rows = $derived.by(() => {
    const base = physicianStats(scoped, def);
    const sorted = base.slice().sort((a, b) => {
      if (sortBy === 'volume') return b.biopsied - a.biopsied;
      if (sortBy === 'cin2') return b.cin2Rate - a.cin2Rate;
      return b.rate - a.rate;
    });
    return sorted;
  });

  const gradeDist = $derived.by(() => {
    const map = {};
    let total = 0;
    for (const c of scoped) {
      for (const b of c.exam?.biopsies || []) {
        if (!b.pathGrade) continue;
        map[b.pathGrade] = (map[b.pathGrade] || 0) + 1;
        total++;
      }
    }
    return PATH_GRADES.filter(g => map[g]).map(g => ({ g, n: map[g], pct: total ? (map[g] / total) * 100 : 0, sev: PATH_SEVERITY[g] })).sort((a, b) => b.sev - a.sev);
  });
  const gradeTotal = $derived(gradeDist.reduce((s, x) => s + x.n, 0));

  const tzStats = $derived.by(() => {
    const m = {};
    for (const c of scoped) {
      if (!c.exam) continue;
      const k = c.exam.tzType || 'I';
      m[k] = (m[k] || 0) + 1;
    }
    const total = Object.values(m).reduce((s, x) => s + x, 0) || 1;
    return ['I', 'II', 'III'].map(k => ({ k, n: m[k] || 0, pct: ((m[k] || 0) / total) * 100 }));
  });

  const summary = $derived.by(() => {
    const all = scoped.filter(c => (c.exam?.biopsies || []).length);
    const pathDone = all.filter(c => (c.exam.biopsies || []).every(b => b.pathGrade && b.pathDate));
    const areaUp = all.filter(c => {
      const p = (c.priorExams || [])[0];
      if (!p) return false;
      const pa = (p.lesions || []).reduce((s, l) => s + polyArea(l.points), 0);
      const ca = (c.exam.lesions || []).reduce((s, l) => s + polyArea(l.points), 0);
      return pa > 0 && ca > pa;
    });
    return { biopsied: all.length, pathDone: pathDone.length, areaUp: areaUp.length };
  });

  function polyArea(pts) {
    let a = 0;
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i], q = pts[(i + 1) % pts.length];
      a += p.x * q.y - q.x * p.y;
    }
    return Math.abs(a) / 2;
  }

  const maxRate = $derived(Math.max(20, ...rows.map(r => r.rate)));
  const defLabel = $derived(POSITIVE_DEFS[def].label);

  function exportCsv() {
    const head = ['医师', '检查例数', '活检例数', '活检点位数', '阳性例数', `阳性率(≥${defLabel})`, 'CIN2+例数', 'CIN2+率(%)'];
    const lines = [head.join(',')];
    for (const r of rows) {
      lines.push([r.name, r.cases, r.biopsied, r.points, r.positiveCases, r.rate.toFixed(1), r.cin2Cases, r.cin2Rate.toFixed(1)].join(','));
    }
    const blob = new Blob(['﻿' + lines.join('\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `活检阳性率统计-${todayISO()}.csv`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 3000);
  }
</script>

<PageHead
  eyebrow="统计 · 质量指标"
  title="各医师活检阳性率"
  sub="阳性定义为该病例任一活检瓶达到所选阈值。统计随病理回填实时更新，可用于科室质控与医师工作量评估。"
>
  <div class="seg">
    <button class:on={def === 'cin1'} onclick={() => (def = 'cin1')}>CIN1+</button>
    <button class:on={def === 'cin2'} onclick={() => (def = 'cin2')}>CIN2+</button>
  </div>
  <select class="select rsel" bind:value={range} aria-label="时间范围">
    <option value="all">全部时间</option>
    <option value="90">近 90 天</option>
    <option value="365">近 1 年</option>
  </select>
  <button class="btn btn-sm" onclick={exportCsv}><Icon name="download" size={13} />导出 CSV</button>
</PageHead>

<section class="hero">
  <div class="hero-main">
    <span class="eyebrow">总体活检阳性率 · {defLabel}</span>
    <div class="hero-num num">{agg.rate.toFixed(1)}<em>%</em></div>
    <p class="hero-sub num">{agg.positive} / {agg.biopsied} 例活检阳性 · 共 {agg.cases} 例检查单</p>
    <div class="hero-track"><span style="width:{Math.min(100, agg.rate)}%"></span></div>
  </div>
  <div class="hero-side">
    <div class="hs">
      <span class="eyebrow">活检例数</span>
      <strong class="num">{agg.biopsied}</strong>
      <span class="hs-note">占检查 {agg.cases ? Math.round((agg.biopsied / agg.cases) * 100) : 0}%</span>
    </div>
    <div class="hs">
      <span class="eyebrow">CIN2+ 例数</span>
      <strong class="num">{agg.cin2}</strong>
      <span class="hs-note">病理升级需复核</span>
    </div>
    <div class="hs">
      <span class="eyebrow">病理齐全</span>
      <strong class="num">{summary.pathDone}/{summary.biopsied}</strong>
      <span class="hs-note">未齐全不可结案</span>
    </div>
    <div class="hs">
      <span class="eyebrow">面积增大</span>
      <strong class="num">{summary.areaUp}</strong>
      <span class="hs-note">已标黄提示</span>
    </div>
  </div>
</section>

<div class="grid2">
  <section class="card">
    <header class="ch">
      <h2>医师维度</h2>
      <div class="seg sm">
        <button class:on={sortBy === 'rate'} onclick={() => (sortBy = 'rate')}>按阳性率</button>
        <button class:on={sortBy === 'volume'} onclick={() => (sortBy = 'volume')}>按例数</button>
        <button class:on={sortBy === 'cin2'} onclick={() => (sortBy = 'cin2')}>按 CIN2+</button>
      </div>
    </header>
    <div class="table-wrap">
      <table class="table stats-table">
        <thead>
          <tr>
            <th>医师</th>
            <th class="r">检查</th>
            <th class="r">活检</th>
            <th class="r">点位</th>
            <th class="r">阳性例</th>
            <th class="r">阳性率</th>
            <th class="r">CIN2+</th>
            <th class="c-bar">分布</th>
          </tr>
        </thead>
        <tbody>
          {#each rows as r}
            <tr>
              <td class="doc"><span class="avatar">{r.name.slice(0, 1)}</span>{r.name}</td>
              <td class="r num">{r.cases}</td>
              <td class="r num">{r.biopsied}</td>
              <td class="r num muted">{r.points}</td>
              <td class="r num">{r.positiveCases}</td>
              <td class="r num"><strong>{r.biopsied ? r.rate.toFixed(1) + '%' : '—'}</strong></td>
              <td class="r num">{r.cin2Cases}</td>
              <td class="c-bar">
                <div class="minibar">
                  <span style="width:{(r.rate / maxRate) * 100}%"></span>
                </div>
                <span class="tiny muted num">{r.biopsied} 例</span>
              </td>
            </tr>
          {:else}
            <tr><td colspan="8" class="empty">暂无数据</td></tr>
          {/each}
        </tbody>
      </table>
    </div>
    <footer class="cfoot">
      <span class="tiny muted">阳性率 = 阳性病例数 / 活检病例数（非点位数）。点位阳性率见下方点位数。</span>
    </footer>
  </section>

  <div class="side-col">
    <section class="card">
      <header class="ch"><h2>病理分级构成</h2><span class="tiny muted">{gradeTotal} 瓶</span></header>
      <div class="dist">
        {#each gradeDist as g}
          <div class="drow">
            <span class="dlabel" class:hi={g.sev >= 2} class:cancer={g.sev >= 5}>{g.g}</span>
            <div class="dbar"><span class="fill s{g.sev}" style="width:{g.pct}%"></span></div>
            <span class="dnum num">{g.n}</span>
            <span class="dpct num muted">{g.pct.toFixed(0)}%</span>
          </div>
        {:else}
          <p class="muted small pad">暂无已回填病理</p>
        {/each}
      </div>
    </section>

    <section class="card">
      <header class="ch"><h2>转化区类型分布</h2></header>
      <div class="tzdist">
        {#each tzStats as t}
          <div class="tzrow">
            <span class="tzk">{t.k} 型</span>
            <div class="tzbar"><span style="width:{t.pct}%"></span></div>
            <span class="dnum num">{t.n}</span>
            <span class="dpct num muted">{t.pct.toFixed(0)}%</span>
          </div>
        {/each}
      </div>
      <p class="tiny muted note">III 型（SCJ 不可见）比例偏高时，建议关注颈管取样比例。</p>
    </section>

    <section class="card">
      <header class="ch"><h2>点位 vs 病例</h2></header>
      <div class="mini-kv">
        <div><span>活检点位总数</span><strong class="num">{rows.reduce((s, r) => s + r.points, 0)}</strong></div>
        <div><span>点位阳性率</span><strong class="num">{rows.reduce((s, r) => s + r.points, 0) ? ((rows.reduce((s, r) => s + r.points * (r.biopsied ? r.pointRate / 100 : 0), 0) / rows.reduce((s, r) => s + r.points, 0)) * 100).toFixed(1) : '0.0'}%</strong></div>
        <div><span>平均每例点位数</span><strong class="num">{agg.biopsied ? (rows.reduce((s, r) => s + r.points, 0) / agg.biopsied).toFixed(2) : '0.00'}</strong></div>
      </div>
    </section>
  </div>
</div>

<style>
  .rsel { width: auto; height: 30px; font-size: 12px; }
  .hero { display: flex; gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: var(--r); overflow: hidden; margin-bottom: 13px; box-shadow: var(--shadow-sm); }
  .hero-main { flex: 1.15; background: linear-gradient(120deg, #123029, #0f2420); color: #e7f2ec; padding: 18px 22px; }
  .hero-main .eyebrow { color: #7fa295; font-size: 9.5px; }
  .hero-num { font-size: 44px; font-weight: 620; letter-spacing: -.045em; line-height: 1.05; margin-top: 3px; }
  .hero-num em { font-size: 17px; font-style: normal; font-weight: 500; color: #88baa9; margin-left: 2px; }
  .hero-sub { font-size: 11.5px; color: #9db8ac; margin-top: 2px; }
  .hero-track { height: 5px; border-radius: 3px; background: rgba(255,255,255,.1); margin-top: 12px; overflow: hidden; }
  .hero-track span { display: block; height: 100%; background: linear-gradient(90deg, #6fd3b8, #b9f0dd); border-radius: 3px; }
  .hero-side { flex: 1.5; background: var(--panel); display: grid; grid-template-columns: repeat(2, 1fr); }
  .hs { padding: 12px 15px; display: flex; flex-direction: column; gap: 1px; border-left: 1px solid var(--line); border-bottom: 1px solid var(--line); }
  .hs:nth-child(2n+1) { border-left: 0; }
  .hs:nth-child(n+3) { border-bottom: 0; }
  .hs .eyebrow { font-size: 9px; }
  .hs strong { font-size: 22px; font-weight: 620; letter-spacing: -.03em; line-height: 1.15; }
  .hs-note { font-size: 10px; color: var(--ink-4); }

  .grid2 { display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr); gap: 12px; align-items: start; }
  .ch { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 11px 14px; border-bottom: 1px solid var(--line); background: var(--panel-2); flex-wrap: wrap; }
  .ch h2 { font-size: 12px; font-weight: 650; letter-spacing: -.01em; }
  .seg.sm button { height: 24px; font-size: 10.5px; padding: 0 8px; }
  .table-wrap { overflow-x: auto; }
  .stats-table { min-width: 620px; }
  .r { text-align: right; white-space: nowrap; }
  .stats-table th.r { text-align: right; }
  .doc { display: flex; align-items: center; gap: 7px; font-weight: 600; white-space: nowrap; }
  .avatar { width: 20px; height: 20px; border-radius: 50%; background: var(--accent-soft); color: var(--accent-2); display: grid; place-items: center; font-size: 10px; font-weight: 700; }
  .c-bar { width: 132px; }
  .minibar { height: 5px; border-radius: 3px; background: #eef2ed; overflow: hidden; width: 76px; display: inline-block; vertical-align: middle; margin-right: 6px; }
  .minibar span { display: block; height: 100%; background: var(--accent); border-radius: 3px; }
  .empty { text-align: center; color: var(--ink-4); padding: 30px 0 !important; }
  .cfoot { padding: 8px 14px; border-top: 1px solid var(--line); background: var(--panel-2); }

  .side-col { display: flex; flex-direction: column; gap: 12px; }
  .dist, .tzdist { padding: 11px 14px; display: flex; flex-direction: column; gap: 8px; }
  .drow, .tzrow { display: grid; grid-template-columns: 76px 1fr 26px 34px; gap: 8px; align-items: center; font-size: 11px; }
  .tzrow { grid-template-columns: 36px 1fr 26px 34px; }
  .dlabel { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--ink-2); }
  .dlabel.hi { color: #a1124c; font-weight: 600; }
  .dlabel.cancer { color: #86102f; }
  .dbar, .tzbar { height: 6px; background: #f0f3ee; border-radius: 3px; overflow: hidden; }
  .dbar .fill { display: block; height: 100%; border-radius: 3px; background: #b7c5bc; }
  .dbar .fill.s1 { background: #e5b457; }
  .dbar .fill.s2 { background: #d96c96; }
  .dbar .fill.s3 { background: #be185d; }
  .dbar .fill.s4 { background: #9f1239; }
  .dbar .fill.s5 { background: #86102f; }
  .tzbar span { display: block; height: 100%; background: #7fb3a3; border-radius: 3px; }
  .tzk { font-family: var(--mono); font-size: 10.5px; color: var(--ink-2); }
  .dnum { text-align: right; font-weight: 600; font-size: 11px; }
  .dpct { text-align: right; }
  .pad { padding: 14px; text-align: center; }
  .note { padding: 0 14px 11px; line-height: 1.5; }
  .mini-kv { padding: 10px 14px; display: flex; flex-direction: column; gap: 7px; }
  .mini-kv div { display: flex; justify-content: space-between; font-size: 11.5px; }
  .mini-kv span { color: var(--ink-3); }
  .mini-kv strong { font-weight: 600; }

  @media (max-width: 1080px) {
    .grid2 { grid-template-columns: minmax(0, 1fr); }
    .hero { flex-direction: column; }
    .hero-side { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (max-width: 640px) { .hero-side { grid-template-columns: 1fr 1fr; } .hero-num { font-size: 36px; } }
</style>
