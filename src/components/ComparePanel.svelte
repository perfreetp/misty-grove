<script>
  import { onDestroy } from 'svelte';
  import { fmtDay } from '../lib/utils.js';

  let { row } = $props();

  let urls = $state({ base: null, cur: null });
  const cache = { base: null, cur: null };

  // 只依赖 row 中的 Blob；cache 为普通对象，避免读写同一状态导致的 effect 死循环
  $effect(() => {
    const bBlob = row?.baseline?.photoBlob || null;
    const cBlob = row?.current?.photoBlob || null;
    if (cache.base && cache.base !== bBlob) URL.revokeObjectURL(cache.base);
    if (cache.cur && cache.cur !== cBlob) URL.revokeObjectURL(cache.cur);
    cache.base = bBlob ? URL.createObjectURL(bBlob) : null;
    cache.cur = cBlob ? URL.createObjectURL(cBlob) : null;
    urls = { base: cache.base, cur: cache.cur };
  });

  onDestroy(() => {
    if (cache.base) URL.revokeObjectURL(cache.base);
    if (cache.cur) URL.revokeObjectURL(cache.cur);
  });
</script>

<div class="compare">
  {#if row.diff?.flagged}
    <div class="flag-banner">
      ⚠ 自动标黄：{row.diff.reasons.join('；')}
    </div>
  {:else if row.current}
    <div class="ok-banner">✓ 与基线比较未见触发标黄的变化（阈值：直径增加 &gt;1mm 或新发边缘不规则）</div>
  {:else}
    <div class="muted small">本次复诊尚未拍摄该部位。</div>
  {/if}

  <div class="photo-grid">
    <figure>
      <figcaption class="small muted">基线{row.baseline ? ` · ${fmtDay(row.baseline.capturedAt)}` : ''}</figcaption>
      {#if urls.base}
        <img src={urls.base} class="cmp-img" alt="基线皮肤镜照片" />
      {:else}
        <div class="cmp-img empty">无基线照片</div>
      {/if}
      {#if row.baseline}
        <dl class="metrics">
          <div><dt>直径</dt><dd>{row.baseline.diameterMm} mm</dd></div>
          <div><dt>边缘</dt><dd>{row.baseline.edgeType}</dd></div>
          <div><dt>色素网络</dt><dd>{row.baseline.networkType}</dd></div>
        </dl>
      {/if}
    </figure>
    <figure>
      <figcaption class="small muted">本次复诊{row.current ? ` · ${fmtDay(row.current.capturedAt)}` : ''}</figcaption>
      {#if urls.cur}
        <img src={urls.cur} class="cmp-img" alt="复诊皮肤镜照片" />
      {:else}
        <div class="cmp-img empty">待采集</div>
      {/if}
      {#if row.current}
        <dl class="metrics">
          <div>
            <dt>直径</dt>
            <dd class:grow={row.diff && row.diff.deltaMm > 1}>
              {row.current.diameterMm} mm
              {#if row.diff?.deltaMm !== null && row.diff?.deltaMm !== undefined}
                <span class="small">（{row.diff.deltaMm >= 0 ? '+' : ''}{row.diff.deltaMm.toFixed(2)}）</span>
              {/if}
            </dd>
          </div>
          <div><dt>边缘</dt><dd class:grow={row.diff?.reasons.some((r) => r.startsWith('边缘'))}>{row.current.edgeType}</dd></div>
          <div><dt>色素网络</dt><dd>{row.current.networkType}</dd></div>
        </dl>
      {/if}
    </figure>
  </div>
  {#if row.current?.note}
    <div class="small muted">复诊备注：{row.current.note}</div>
  {/if}
  {#if row.judgment}
    <div class="judged small">
      判读：<strong>{({observe:'观察',biopsy:'活检',excise:'切除'})[row.judgment.decision]}</strong>
      · {row.judgment.physician} · {fmtDay(row.judgment.ts)}<br />
      理由：{row.judgment.reason}
    </div>
  {/if}
</div>

<style>
  .compare { margin-top: 10px; }
  .flag-banner {
    background: rgba(240, 180, 41, 0.14); border: 1px solid var(--warn);
    color: var(--warn); border-radius: 8px; padding: 8px 10px; font-size: 12px; margin-bottom: 10px;
  }
  .ok-banner {
    background: rgba(55, 178, 108, 0.12); border: 1px solid var(--ok);
    color: var(--ok); border-radius: 8px; padding: 8px 10px; font-size: 12px; margin-bottom: 10px;
  }
  .photo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  figure { margin: 0; }
  figcaption { margin-bottom: 4px; }
  .cmp-img {
    width: 100%; aspect-ratio: 1; object-fit: cover;
    border-radius: 8px; border: 1px solid var(--border); background: #0c121c;
    display: grid; place-items: center;
  }
  .cmp-img.empty { color: var(--muted); font-size: 12px; }
  .metrics { margin: 8px 0 0; display: flex; flex-direction: column; gap: 3px; font-size: 12px; }
  .metrics div { display: flex; justify-content: space-between; gap: 8px; }
  dt { color: var(--muted); }
  dd { margin: 0; }
  dd.grow { color: var(--warn); font-weight: 700; }
  .judged {
    margin-top: 10px; padding: 8px 10px; border-radius: 8px;
    background: var(--panel-2); border: 1px solid var(--border); line-height: 1.7;
  }
</style>
