<script>
  import { alignment, ramps, results, selectedId } from './store.js';
  import { stakeText, STATUS } from './calc.js';

  const W = 1000, H = 110, PAD = 8;

  $: pts = $alignment;
  $: minS = pts.length ? pts[0].stakeM : 0;
  $: maxS = pts.length ? pts[pts.length - 1].stakeM : 1;
  $: minY = pts.length ? Math.min(...pts.map(p => p.y)) : 0;
  $: maxY = pts.length ? Math.max(...pts.map(p => p.y)) : 1;

  $: line = pts.length
    ? pts.filter((_, i) => i % 2 === 0).map(p =>
        `${PAD + (p.stakeM - minS) / (maxS - minS) * (W - 2 * PAD)},${H - PAD - (p.y - minY) / (maxY - minY || 1) * (H - 2 * PAD)}`
      ).join(' ')
    : '';

  function rx(stakeM) { return PAD + (stakeM - minS) / (maxS - minS || 1) * (W - 2 * PAD); }
  function ryAt(stakeM) {
    if (!pts.length) return H / 2;
    let lo = 0, hi = pts.length - 1;
    while (lo < hi) { const m = (lo + hi) >> 1; if (pts[m].stakeM < stakeM) lo = m + 1; else hi = m; }
    const p = pts[lo];
    return H - PAD - (p.y - minY) / (maxY - minY || 1) * (H - 2 * PAD);
  }
</script>

<svg viewBox="0 0 {W} {H}" preserveAspectRatio="none" class="prof">
  {#if pts.length}
    <polyline points={line} fill="none" stroke="#5b8dd9" stroke-width="2" vector-effect="non-scaling-stroke" />
    {#each $ramps as r (r.id)}
      {@const res = $results[r.id]}
      {@const bad = res && res.errors.length > 0}
      <g transform="translate({rx(r.stakeM)},{ryAt(r.stakeM)})" style="cursor:pointer"
         on:click={() => selectedId.set(r.id)}>
        <polygon points="0,-14 7,0 -7,0"
          fill={bad ? '#ef4444' : STATUS[r.status].color}
          stroke={$selectedId === r.id ? '#fff' : 'none'} stroke-width="2" />
        <text y="-20" text-anchor="middle" font-size="13"
          fill={bad ? '#ff9a9a' : '#cfe3ff'}>{r.name.replace('避险车道', '')} {stakeText(r.stakeM)}</text>
      </g>
    {/each}
  {/if}
</svg>

<style>
  .prof { width: 100%; height: 110px; display: block; background: #0b111c; border-top: 1px solid #223047; }
</style>
