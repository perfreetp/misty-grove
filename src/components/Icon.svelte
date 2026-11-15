<script>
  let { name, size = 16, stroke = 1.7, fill = 'none', cls = '', label = '' } = $props();
  import paths from '../lib/icons.js';
  const d = $derived(paths[name] || '');
</script>

<svg
  class={cls}
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill={fill}
  stroke="currentColor"
  stroke-width={stroke}
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden={label ? undefined : 'true'}
  role={label ? 'img' : undefined}
  aria-label={label || undefined}
>
  {@html d}
</svg>
