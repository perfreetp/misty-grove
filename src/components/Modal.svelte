<script>
  let { title = '', onclose = null, width = '' } = $props();
</script>

<div class="modal-mask" onclick={(e) => e.target === e.currentTarget && onclose?.()} role="presentation">
  <div class="modal" style={width ? `width:min(${width},94vw)` : ''}>
    <div class="row" style="justify-content:space-between;margin-bottom:14px">
      <h3 style="margin:0">{title}</h3>
      <button class="sm ghost" onclick={() => onclose?.()}>✕ 关闭</button>
    </div>
    <slot />
  </div>
</div>
