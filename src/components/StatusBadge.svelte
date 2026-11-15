<script>
  import Icon from './Icon.svelte';
  import { STATUS_META } from '../lib/domain.js';
  let { status = 'pending', size = 'md' } = $props();
  const meta = $derived(STATUS_META[status] || STATUS_META.pending);
</script>

<span class="status {meta.cls}" class:sm={size === 'sm'}>{meta.label}</span>

<style>
  .status.sm { height: 21px; padding: 0 8px; font-size: 10.5px; }
</style>
