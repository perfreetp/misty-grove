<script>
  import Icon from './Icon.svelte';
  import { store, dismissToast } from '../lib/store.svelte.js';
</script>

<div class="toasts" aria-live="polite">
  {#each store.toasts as t (t.id)}
    <div class="toast {t.kind}">
      <Icon name={t.kind === 'warn' ? 'alert' : t.kind === 'info' ? 'info' : 'check'} size={15} />
      <span>{t.message}</span>
      <button class="x" onclick={() => dismissToast(t.id)} aria-label="关闭">
        <Icon name="x" size={12} />
      </button>
    </div>
  {/each}
</div>

<style>
  .toasts {
    position: fixed;
    bottom: 22px;
    right: 22px;
    z-index: 90;
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: min(420px, calc(100vw - 32px));
    pointer-events: none;
  }
  .toast {
    pointer-events: auto;
    display: flex;
    align-items: flex-start;
    gap: 9px;
    background: #10201c;
    color: #edf5f0;
    padding: 10px 10px 10px 13px;
    border-radius: 10px;
    font-size: 12.5px;
    line-height: 1.45;
    box-shadow: 0 12px 34px -12px rgba(3, 16, 12, .55);
    animation: tin .22s cubic-bezier(.2, .9, .3, 1.2) both;
    border-left: 3px solid #4fb39c;
  }
  .toast.warn { border-left-color: #e0a83e; }
  .toast.info { border-left-color: #6fa8c9; }
  .toast span { flex: 1; padding-top: 1px; }
  .x {
    border: 0;
    background: transparent;
    color: rgba(237, 245, 240, .45);
    padding: 2px;
    display: inline-flex;
    border-radius: 4px;
  }
  .x:hover { color: #fff; background: rgba(255, 255, 255, .09); }
  @keyframes tin {
    from { opacity: 0; transform: translateY(8px) scale(.98); }
  }
</style>
