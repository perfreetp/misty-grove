<script>
  import { onDestroy } from 'svelte';

  let {
    blob = $bindable(null),
    name = $bindable(''),
    label = '皮肤镜照片'
  } = $props();

  let url = $state(null);
  let inputEl = $state(null);
  let createdUrl = null;

  // 只依赖 blob；createdUrl 为普通变量，不参与响应式，避免 effect 自触发死循环
  $effect(() => {
    if (createdUrl) URL.revokeObjectURL(createdUrl);
    createdUrl = blob ? URL.createObjectURL(blob) : null;
    url = createdUrl;
  });

  onDestroy(() => {
    if (createdUrl) URL.revokeObjectURL(createdUrl);
  });

  function onFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    blob = f;
    name = f.name;
  }
  function clear() {
    blob = null;
    name = '';
    if (inputEl) inputEl.value = '';
  }
</script>

<div class="field">
  <label>{label}</label>
  <div class="photo-box">
    {#if url}
      <img src={url} alt="皮肤镜照片" class="thumb lg" />
    {:else}
      <div class="placeholder thumb lg">未上传</div>
    {/if}
    <div class="photo-actions">
      <input type="file" accept="image/*" capture="environment" bind:this={inputEl} onchange={onFile} />
      {#if blob}
        <button class="sm danger" onclick={clear}>移除照片</button>
        <div class="small muted break">{name}</div>
      {/if}
      <div class="small muted">照片仅以 Blob 形式存入本浏览器 IndexedDB。</div>
    </div>
  </div>
</div>

<style>
  .photo-box { display: flex; gap: 14px; align-items: flex-start; }
  .placeholder {
    display: grid; place-items: center; color: var(--muted);
    border: 1px dashed var(--border);
  }
  .photo-actions { flex: 1; display: flex; flex-direction: column; gap: 8px; }
  .break { word-break: break-all; }
</style>
