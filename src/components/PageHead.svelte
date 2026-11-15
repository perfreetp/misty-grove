<script>
  let { eyebrow = '', title = '', sub = '', children } = $props();
</script>

<header class="ph">
  <div class="ph-text">
    {#if eyebrow}<p class="eyebrow">{eyebrow}</p>{/if}
    <h1>{title}</h1>
    {#if sub}<p class="sub">{sub}</p>{/if}
  </div>
  {#if children}<div class="ph-actions">{@render children()}</div>{/if}
</header>

<style>
  .ph { display: flex; align-items: flex-end; justify-content: space-between; gap: 18px; margin-bottom: 20px; flex-wrap: wrap; }
  .ph-text { min-width: 0; }
  h1 { font-size: 22px; font-weight: 640; letter-spacing: -.02em; line-height: 1.2; }
  .sub { color: var(--ink-3); font-size: 12.5px; margin-top: 5px; max-width: 70ch; line-height: 1.5; }
  .eyebrow { margin-bottom: 5px; }
  .ph-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
</style>
