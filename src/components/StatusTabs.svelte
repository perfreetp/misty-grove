<script>
  import { STATUS_META } from '../lib/domain.js';
  let { counts = {}, active = 'all', onchange = () => {} } = $props();
  const tabs = $derived([
    { key: 'all', label: '全部', n: counts.all ?? 0 },
    ...Object.keys(STATUS_META).map(k => ({ key: k, label: STATUS_META[k].label, n: counts[k] ?? 0, cls: STATUS_META[k].cls }))
  ]);
</script>

<div class="tabs" role="tablist">
  {#each tabs as t}
    <button
      class="tab"
      class:on={active === t.key}
      role="tab"
      aria-selected={active === t.key}
      onclick={() => onchange(t.key)}
    >
      {#if t.cls}<span class="dot {t.cls}"></span>{/if}
      <span>{t.label}</span>
      <span class="n num">{t.n}</span>
    </button>
  {/each}
</div>

<style>
  .tabs { display: flex; gap: 2px; flex-wrap: wrap; border-bottom: 1px solid var(--line); margin-bottom: 0; }
  .tab {
    border: 0; background: transparent; padding: 8px 11px 9px; font-size: 12.5px; color: var(--ink-3);
    display: inline-flex; align-items: center; gap: 6px; border-bottom: 2px solid transparent; margin-bottom: -1px;
    border-radius: 6px 6px 0 0; font-weight: 500; white-space: nowrap;
  }
  .tab:hover { color: var(--ink); background: #f7f9f6; }
  .tab.on { color: var(--ink); border-bottom-color: var(--accent); font-weight: 600; }
  .dot { width: 6px; height: 6px; border-radius: 50%; flex: none; }
  .dot.st-pending { background: #d19415; }
  .dot.st-examined { background: #2f62c4; }
  .dot.st-biopsy { background: #7440c7; }
  .dot.st-pathology { background: #0b8b78; }
  .dot.st-followup { background: #1b7aa8; }
  .dot.st-closed { background: #7c8a83; }
  .n { font-size: 10.5px; color: var(--ink-4); background: #f0f3ef; border-radius: 5px; padding: 0 5px; min-width: 17px; text-align: center; }
  .tab.on .n { background: var(--accent-soft); color: var(--accent-2); }
</style>
