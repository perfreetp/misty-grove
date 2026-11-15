<script>
  import Icon from './Icon.svelte';
  let { open = false, title = '', subtitle = '', width = 560, onclose = () => {}, children, footer } = $props();
  let dialog;

  $effect(() => {
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  });
</script>

<dialog
  bind:this={dialog}
  onclose={onclose}
  oncancel={(e) => { e.preventDefault(); onclose(); }}
  onclick={(e) => { if (e.target === dialog) onclose(); }}
  style="--w:{width}px"
>
  <div class="panel" role="document">
    <header>
      <div class="titles">
        <h2>{title}</h2>
        {#if subtitle}<p class="sub">{subtitle}</p>{/if}
      </div>
      <button class="x" onclick={onclose} aria-label="关闭">
        <Icon name="x" size={15} stroke={2} />
      </button>
    </header>
    <div class="body">{@render children?.()}</div>
    {#if footer}<footer>{@render footer()}</footer>{/if}
  </div>
</dialog>

<style>
  dialog {
    border: 0;
    padding: 0;
    background: transparent;
    max-width: min(var(--w, 560px), calc(100vw - 28px));
    width: var(--w, 560px);
    color: var(--ink);
  }
  dialog::backdrop { background: rgba(9, 20, 16, .44); backdrop-filter: blur(2px); }
  .panel {
    background: var(--panel);
    border-radius: 14px;
    box-shadow: 0 30px 80px -20px rgba(8, 24, 18, .5);
    overflow: hidden;
    animation: pop .18s ease both;
    max-height: min(86vh, 820px);
    display: flex;
    flex-direction: column;
  }
  header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 14px;
    padding: 17px 18px 13px;
    border-bottom: 1px solid var(--line);
  }
  h2 { font-size: 15px; font-weight: 650; letter-spacing: -.01em; }
  .sub { font-size: 12px; color: var(--ink-3); margin-top: 3px; line-height: 1.45; }
  .x {
    border: 0; background: #f2f5f1; color: var(--ink-3); width: 28px; height: 28px;
    border-radius: 7px; display: inline-flex; align-items: center; justify-content: center; flex: none;
  }
  .x:hover { background: #e8ede7; color: var(--ink); }
  .body { padding: 16px 18px; overflow-y: auto; }
  footer {
    padding: 12px 18px;
    border-top: 1px solid var(--line);
    background: var(--panel-2);
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }
  @keyframes pop { from { opacity: 0; transform: translateY(6px) scale(.985); } }
</style>
