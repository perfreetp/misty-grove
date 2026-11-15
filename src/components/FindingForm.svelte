<script>
  import { NETWORK_TYPES, EDGE_TYPES } from '../lib/constants.js';
  import PhotoField from './PhotoField.svelte';

  let {
    initial = {},
    angles = [],
    submitLabel = '保存测量记录',
    onsubmit,
    oncancel
  } = $props();

  const form = $state({
    diameterMm: initial.diameterMm ?? '',
    edgeType: initial.edgeType ?? EDGE_TYPES[0],
    networkType: initial.networkType ?? NETWORK_TYPES[0],
    angleId: initial.angleId ?? (angles.find((a) => a.active)?.id || ''),
    note: initial.note ?? '',
    photoBlob: initial.photoBlob ?? null,
    photoName: initial.photoName ?? ''
  });

  function submit() {
    if (form.diameterMm === '' || +form.diameterMm <= 0) return;
    onsubmit({ ...form, diameterMm: +form.diameterMm });
  }
</script>

<div class="grid2">
  <div class="field">
    <label>直径 (mm) *</label>
    <input type="number" step="0.1" min="0.1" bind:value={form.diameterMm} placeholder="如 3.5" />
  </div>
  <div class="field">
    <label>拍摄角度模板</label>
    <select bind:value={form.angleId}>
      <option value="">— 未选择 —</option>
      {#each angles.filter((a) => a.active) as a (a.id)}
        <option value={a.id}>{a.name}</option>
      {/each}
    </select>
  </div>
  <div class="field">
    <label>边缘形态</label>
    <select bind:value={form.edgeType}>
      {#each EDGE_TYPES as e (e)}<option>{e}</option>{/each}
    </select>
  </div>
  <div class="field">
    <label>色素网络形态</label>
    <select bind:value={form.networkType}>
      {#each NETWORK_TYPES as n (n)}<option>{n}</option>{/each}
    </select>
  </div>
</div>
<div class="field">
  <label>记录备注</label>
  <textarea rows="2" bind:value={form.note} placeholder="皮损描述、症状等"></textarea>
</div>
<PhotoField bind:blob={form.photoBlob} bind:name={form.photoName} />
<div class="row" style="justify-content:flex-end;gap:8px;margin-top:8px">
  {#if oncancel}<button onclick={oncancel}>取消</button>{/if}
  <button class="primary" onclick={submit} disabled={form.diameterMm === '' || +form.diameterMm <= 0}>
    {submitLabel}
  </button>
</div>
