<script>
  import { getState, createPatient } from '../lib/store.svelte.js';
  import { createDemoData } from '../lib/demo.js';
  import { fmtDay } from '../lib/utils.js';
  import Modal from '../components/Modal.svelte';

  let { onopen } = $props();
  const s = getState();

  let showCreate = $state(false);
  let busy = $state(false);
  const form = $state({ name: '', gender: '女', birthYear: '', medicalNo: '', note: '' });
  let keyword = $state('');

  const filtered = $derived(
    s.patients.filter(
      (p) =>
        !keyword ||
        p.name.includes(keyword) ||
        (p.medicalNo || '').includes(keyword)
    )
  );

  async function submit() {
    if (!form.name.trim()) return;
    const p = await createPatient({ ...form });
    showCreate = false;
    form.name = '';
    form.birthYear = '';
    form.medicalNo = '';
    form.note = '';
    onopen(p.id);
  }

  async function loadDemo() {
    busy = true;
    try {
      const result = await createDemoData();
      onopen(result.patient.id);
    } finally {
      busy = false;
    }
  }

  function moleCount(pid) {
    return s.moles.filter((m) => m.patientId === pid).length;
  }
  function taskCount(pid) {
    return s.tasks.filter((t) => t.patientId === pid).length;
  }
</script>

<div class="head row" style="justify-content:space-between">
  <div>
    <h2 style="margin:0 0 4px">患者与痣图档案</h2>
    <div class="muted small">照片与痣图全部存储于本浏览器，共 {s.patients.length} 位患者。</div>
  </div>
  <div class="row">
    <input placeholder="搜索姓名 / 病案号" bind:value={keyword} style="width:220px" />
    <button class="primary" onclick={() => (showCreate = true)}>新建患者</button>
    <button onclick={loadDemo} disabled={busy}>{busy ? '生成中…' : '载入演示数据'}</button>
  </div>
</div>

<div class="card" style="margin-top:16px">
  <table>
    <thead>
      <tr>
        <th>病案号</th>
        <th>姓名</th>
        <th>性别</th>
        <th>出生年份</th>
        <th>痣数</th>
        <th>随访任务</th>
        <th>建档时间</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {#each filtered as p (p.id)}
        <tr>
          <td class="mono">{p.medicalNo || '—'}</td>
          <td>{p.name}</td>
          <td>{p.gender}</td>
          <td>{p.birthYear || '—'}</td>
          <td><span class="badge info">{moleCount(p.id)}</span></td>
          <td><span class="badge purple">{taskCount(p.id)}</span></td>
          <td class="small muted">{fmtDay(p.createdAt)}</td>
          <td><button class="sm primary" onclick={() => onopen(p.id)}>打开痣图</button></td>
        </tr>
      {/each}
      {#if filtered.length === 0}
        <tr>
          <td colspan="8" class="muted" style="text-align:center;padding:30px">暂无患者，可新建或载入演示数据。</td>
        </tr>
      {/if}
    </tbody>
  </table>
</div>

{#if showCreate}
  <Modal title="新建患者" onclose={() => (showCreate = false)} width="560px">
    <div class="grid2">
      <div class="field">
        <label>姓名 *</label>
        <input bind:value={form.name} placeholder="患者姓名" />
      </div>
      <div class="field">
        <label>病案号</label>
        <input bind:value={form.medicalNo} placeholder="门诊病案号" />
      </div>
      <div class="field">
        <label>性别</label>
        <select bind:value={form.gender}>
          <option>女</option>
          <option>男</option>
          <option>其他</option>
        </select>
      </div>
      <div class="field">
        <label>出生年份</label>
        <input type="number" bind:value={form.birthYear} placeholder="如 1986" />
      </div>
    </div>
    <div class="field">
      <label>备注</label>
      <textarea rows="3" bind:value={form.note} placeholder="既往史、家族史等"></textarea>
    </div>
    <div class="row" style="justify-content:flex-end;gap:8px">
      <button onclick={() => (showCreate = false)}>取消</button>
      <button class="primary" onclick={submit} disabled={!form.name.trim()}>创建并进入痣图</button>
    </div>
  </Modal>
{/if}

<style>
  .mono { font-family: monospace; }
  .head h2 { font-size: 19px; }
</style>
