<script>
  import { getState, physicianStats } from '../lib/store.svelte.js';

  const s = getState();
  const stats = $derived(physicianStats());

  function pct(v) {
    return v === null ? '—' : (v * 100).toFixed(1) + '%';
  }

  const totalFlagged = $derived(
    s.tasks.reduce((acc, t) => acc + (followupFlagCount(t.id)), 0)
  );
  function followupFlagCount(taskId) {
    // 轻量内联：避免循环依赖
    const t = s.tasks.find((x) => x.id === taskId);
    if (!t) return 0;
    let n = 0;
    for (const f of s.findings.filter((x) => x.visitId === t.visitId)) {
      const base = s.findings.find((b) => b.moleId === f.moleId && b.visitId === t.baselineVisitId);
      const d0 = base?.diameterMm;
      const edgeNow = ['明显不规则', '伪足/放射纹'].includes(f.edgeType);
      const edgeBefore = ['明显不规则', '伪足/放射纹'].includes(base?.edgeType);
      if (!base || (d0 !== undefined && f.diameterMm - d0 > 1) || (edgeNow && !edgeBefore)) n++;
    }
    return n;
  }
</script>

<div>
  <h2 style="margin:0 0 4px">统计分析</h2>
  <div class="small muted">按判读医师统计标黄命中率与活检/切除比例，数据全部来自本地记录。</div>

  <div class="kpi-row">
    <div class="kpi card"><div class="num">{s.patients.length}</div><div class="muted small">患者</div></div>
    <div class="kpi card"><div class="num">{s.moles.length}</div><div class="muted small">建档痣数</div></div>
    <div class="kpi card"><div class="num warn">{totalFlagged}</div><div class="muted small">累计标黄</div></div>
    <div class="kpi card"><div class="num">{s.judgments.length}</div><div class="muted small">判读记录</div></div>
    <div class="kpi card"><div class="num">{s.tasks.filter((t) => t.status === 'judged').length}</div><div class="muted small">已判读任务</div></div>
  </div>

  <div class="card" style="margin-top:16px">
    <h3>医师质量指标</h3>
    <table>
      <thead>
        <tr>
          <th>医师</th><th>判读总数</th><th>观察</th><th>活检</th><th>切除</th>
          <th>标黄命中（活检/切除 ÷ 标黄数）</th><th>活检比例</th><th>有创处置比例</th>
        </tr>
      </thead>
      <tbody>
        {#each stats as r (r.physician)}
          <tr>
            <td><strong>{r.physician}</strong></td>
            <td>{r.total}</td>
            <td>{r.observe}</td>
            <td>{r.biopsy}</td>
            <td>{r.excise}</td>
            <td>
              <span class={r.flagHitRate !== null && r.flagHitRate >= 0.5 ? 'good' : 'warn-txt'}>
                {pct(r.flagHitRate)}
              </span>
              <span class="small muted">（{r.flaggedAction}/{r.flaggedTotal}）</span>
            </td>
            <td>{pct(r.biopsyRate)}</td>
            <td>{pct(r.actionRate)}</td>
          </tr>
        {/each}
        {#if stats.length === 0}
          <tr><td colspan="8" class="muted" style="text-align:center;padding:26px">尚无判读数据。</td></tr>
        {/if}
      </tbody>
    </table>
    <div class="small muted" style="margin-top:10px;line-height:1.7">
      口径说明：标黄命中率 = 标黄痣中判为活检或切除的比例；活检比例 = 活检数 ÷ 该医师全部判读数；
      有创处置比例 =（活检+切除）÷ 全部判读数。
    </div>
  </div>
</div>

<style>
  h2 { font-size: 19px; }
  .kpi-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-top: 16px; }
  .kpi { text-align: center; padding: 18px 10px; }
  .num { font-size: 28px; font-weight: 700; }
  .num.warn { color: var(--warn); }
  .good { color: var(--ok); font-weight: 700; }
  .warn-txt { color: var(--warn); font-weight: 700; }
</style>
