<script>
  import { getState } from '../lib/store.svelte.js';
  import { fmtDate, toCSV, downloadBlob } from '../lib/utils.js';
  import { ROLES } from '../lib/constants.js';

  const s = getState();
  let kw = $state('');

  const shown = $derived(
    s.logs.filter(
      (l) =>
        !kw ||
        l.action.includes(kw) ||
        l.operator.includes(kw) ||
        l.target.includes(kw) ||
        l.detail.includes(kw)
    )
  );

  function roleName(id) {
    return ROLES.find((r) => r.id === id)?.name || id;
  }

  function exportLogs() {
    const csv = toCSV(shown, [
      { label: '时间', get: (r) => fmtDate(r.ts) },
      { label: '操作人', get: (r) => r.operator },
      { label: '角色', get: (r) => roleName(r.role) },
      { label: '动作', get: (r) => r.action },
      { label: '对象', get: (r) => r.target },
      { label: '详情', get: (r) => r.detail }
    ]);
    downloadBlob(new Blob([csv], { type: 'text/csv;charset=utf-8' }), `操作日志_${Date.now()}.csv`);
  }
</script>

<div>
  <div class="row" style="justify-content:space-between">
    <div>
      <h2 style="margin:0 0 4px">操作日志</h2>
      <div class="small muted">所有状态变更、判读、审核与规则维护均记录操作人和时间，不可删除。</div>
    </div>
    <div class="row">
      <input placeholder="筛选动作/操作人/对象" bind:value={kw} style="width:240px" />
      <button onclick={exportLogs}>导出 CSV</button>
    </div>
  </div>

  <div class="card" style="margin-top:14px">
    <table>
      <thead><tr><th style="width:150px">时间</th><th style="width:130px">操作人</th><th style="width:90px">角色</th><th>动作</th><th>对象</th><th>详情</th></tr></thead>
      <tbody>
        {#each shown as l (l.id)}
          <tr>
            <td class="small">{fmtDate(l.ts)}</td>
            <td>{l.operator}</td>
            <td><span class="badge info">{roleName(l.role)}</span></td>
            <td>{l.action}</td>
            <td class="small mono">{l.target}</td>
            <td class="small muted">{l.detail}</td>
          </tr>
        {/each}
        {#if shown.length === 0}
          <tr><td colspan="6" class="muted" style="text-align:center;padding:26px">暂无日志。</td></tr>
        {/if}
      </tbody>
    </table>
  </div>
</div>

<style>
  h2 { font-size: 19px; }
  .mono { font-family: monospace; }
</style>
