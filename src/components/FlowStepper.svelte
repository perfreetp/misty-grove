<script>
  import Icon from './Icon.svelte';
  let { items = [] } = $props();
</script>

{#if items.length}
  <ul class="flow">
    {#each items as it, i}
      <li class="step {it.state}">
        <span class="dot">{#if it.state === 'done'}<Icon name="check" size={10} stroke={2.6} />{:else}{i + 1}{/if}</span>
        <span class="txt">{it.label}</span>
        {#if it.note}<span class="note">{it.note}</span>{/if}
      </li>
    {/each}
  </ul>
{/if}

<style>
  .flow { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 4px 0; }
  .step {
    display: inline-flex; align-items: center; gap: 6px; padding: 2px 12px 2px 0;
    font-size: 11.5px; color: var(--ink-4); position: relative;
  }
  .step + .step::before {
    content: ""; width: 14px; height: 1px; background: var(--line-2); margin-right: 10px; margin-left: -2px;
  }
  .dot {
    width: 17px; height: 17px; border-radius: 50%; border: 1.5px solid var(--line-2);
    display: inline-flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 700;
    background: #fff; flex: none; color: var(--ink-4);
  }
  .step.done { color: var(--ink-2); }
  .step.done .dot { background: var(--accent); border-color: var(--accent); color: #fff; }
  .step.current { color: var(--ink); font-weight: 600; }
  .step.current .dot { border-color: var(--accent); color: var(--accent); box-shadow: 0 0 0 3px rgba(15,118,110,.12); }
  .note { font-size: 10.5px; color: var(--ink-3); font-weight: 400; }
</style>
