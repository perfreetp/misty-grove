<script>
  import { stats, settings, allRevisions } from './store.js';
  import { RAMP_TYPES, STATUS, stakeText } from './calc.js';
</script>

<div class="pane">
  <h3>布设统计</h3>
  <label class="rate">失控车辆密度(辆/km,设计年限内)
    <input type="number" step="0.1" min="0" value={$settings.runawayRate}
      on:change={e => settings.update(s => ({ ...s, runawayRate: parseFloat(e.target.value) || 0 }))} />
  </label>

  {#if $stats.rows.length === 0}
    <p class="hint">尚未布设避险车道。</p>
  {:else}
    <table>
      <thead><tr><th>名称</th><th>桩号</th><th>型式</th><th>与上游间距</th><th>覆盖里程</th><th>覆盖失控车辆</th><th>状态</th></tr></thead>
      <tbody>
        {#each $stats.rows as row}
          <tr>
            <td>{row.ramp.name}</td>
            <td>{stakeText(row.ramp.stakeM)}</td>
            <td>{RAMP_TYPES[row.ramp.type].name}</td>
            <td>{row.spacing === null ? '—' : (row.spacing / 1000).toFixed(2) + ' km'}</td>
            <td>{row.zoneKm.toFixed(2)} km</td>
            <td>{row.covered.toFixed(1)} 辆</td>
            <td><span class="badge" style="background:{STATUS[row.ramp.status].color}">{STATUS[row.ramp.status].name}</span></td>
          </tr>
        {/each}
      </tbody>
    </table>

    <h3>工程量汇总</h3>
    <table>
      <tbody>
        {#each Object.entries($stats.totalQ) as [k, v]}
          <tr><td>{k}</td><td>{Math.round(v)} {k.includes('m³') ? 'm³' : k.includes('m²') ? 'm²' : k.includes('m') ? 'm' : ''}</td></tr>
        {/each}
        <tr class="total"><td>覆盖失控车辆合计</td><td>{$stats.totalCovered.toFixed(1)} 辆</td></tr>
      </tbody>
    </table>
  {/if}

  <h3>全部修订记录</h3>
  {#if $allRevisions.length === 0}
    <p class="hint">暂无修订记录。</p>
  {:else}
    {#each $allRevisions as v}
      <div class="rev">
        <b>{v.time}</b> · {v.rampName} · [{v.action}]<br>
        {v.detail}<br>
        <span>依据: {v.basis}</span>
      </div>
    {/each}
  {/if}
</div>

<style>
  .pane { padding: 10px; }
  h3 { margin: 10px 0 6px; font-size: 14px; color: #9fc3ff; }
  .hint { font-size: 12px; color: #8b95a5; }
  .rate { display: block; font-size: 12px; color: #8b95a5; margin-bottom: 8px; }
  .rate input { width: 90px; margin-left: 6px; background: #0f1622; color: #d5dde8; border: 1px solid #2a3648; border-radius: 5px; padding: 3px 6px; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; }
  th, td { border-bottom: 1px solid #223047; padding: 4px 5px; text-align: right; color: #c6d2e2; }
  th { color: #8b95a5; font-weight: normal; }
  td:first-child, th:first-child { text-align: left; }
  .badge { font-size: 11px; color: #0b0f16; border-radius: 4px; padding: 1px 5px; font-weight: bold; }
  tr.total td { color: #7ee2a8; font-weight: bold; }
  .rev { font-size: 11px; color: #aab6c6; border-left: 2px solid #2a3648; padding-left: 6px; margin: 6px 0; line-height: 1.5; }
  .rev span { color: #6b7688; }
</style>
