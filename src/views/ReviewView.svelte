<script>
  import { getState, reviewQueue, followupRows, submitReview, reviewsOfTask } from '../lib/store.svelte.js';
  import { fmtDay, fmtDate } from '../lib/utils.js';
  import ComparePanel from '../components/ComparePanel.svelte';
  import Modal from '../components/Modal.svelte';

  let { onopenTask } = $props();
  const s = getState();

  let selectedTaskId = $state(null);
  let showReview = $state(false);
  let reviewNote = $state('');

  const queue = $derived(reviewQueue());
  const selectedTask = $derived(s.tasks.find((t) => t.id === selectedTaskId) || null);
  const selectedRows = $derived(selectedTaskId ? followupRows(selectedTaskId) : []);
  let selectedMoleId = $state(null);
  const focusRow = $derived(selectedRows.find((r) => r.mole.id === selectedMoleId) || selectedRows.find((r) => r.diff?.flagged) || null);
  const history = $derived(selectedTaskId ? reviewsOfTask(selectedTaskId) : []);

  function patientName(id) {
    return s.patients.find((p) => p.id === id)?.name || '—';
  }

  async function doReview(verdict) {
    if (verdict === 'returned' && !reviewNote.trim()) {
      alert('退回时必须填写退回原因（如：编号配对错误，请重新配对）。');
      return;
    }
    await submitReview(selectedTaskId, verdict, reviewNote);
    showReview = false;
    reviewNote = '';
  }
</script>

<div>
  <h2 style="margin:0 0 4px">主任待审列表</h2>
  <div class="small muted">仅列出已判读/已退回任务；重点审核自动标黄痣的前后对比与医师判读意见，可退回要求重新配对。</div>

  <div class="review-grid">
    <div class="card" style="margin-top:14px">
      <h3>任务（{queue.length}）</h3>
      <div class="scroll task-list">
        {#each queue as item (item.task.id)}
          {@const t = item.task}
          <button
            class="task-item"
            class:sel={t.id === selectedTaskId}
            onclick={() => (selectedTaskId = t.id)}
          >
            <div class="row" style="justify-content:space-between">
              <strong>{patientName(t.patientId)}</strong>
              {#if item.approved}<span class="badge ok">已通过</span>
              {:else if t.status === 'returned'}<span class="badge danger">已退回</span>
              {:else}<span class="badge warn">待审核</span>{/if}
            </div>
            <div class="small muted" style="margin:4px 0">
              复诊 {fmtDay(t.dueDate)} · 标黄 {item.flagged.length} 颗
            </div>
            <div class="small muted">{t.lastStatusBy} · {fmtDate(t.lastStatusAt)}</div>
          </button>
        {/each}
        {#if queue.length === 0}
          <div class="muted small" style="padding:16px 4px">暂无待审任务。</div>
        {/if}
      </div>
    </div>

    {#if selectedTask}
      <div class="card" style="margin-top:14px">
        <div class="row" style="justify-content:space-between">
          <h3 style="margin:0">逐颗复核 · {patientName(selectedTask.patientId)}</h3>
          <div class="row">
            <button class="sm" onclick={() => onopenTask(selectedTask.id)}>打开采集/判读工作台</button>
            <button class="sm danger" onclick={() => (showReview = true)}>退回重新配对</button>
            <button class="sm primary" onclick={() => (showReview = true)}>审核通过</button>
          </div>
        </div>

        {#if history.length}
          <div class="history small">
            {#each history as h (h.id)}
              <div>
                {h.verdict === 'approved' ? '✅ 审核通过' : '↩ 退回'} · {h.director} · {fmtDate(h.ts)}
                {#if h.note}<div class="muted">意见：{h.note}</div>{/if}
              </div>
            {/each}
          </div>
        {/if}

        <div class="mole-pills">
          {#each selectedRows as r (r.mole.id)}
            <button
              class="sm mole-pill"
              class:flag={r.diff?.flagged}
              class:sel={focusRow?.mole.id === r.mole.id}
              onclick={() => (selectedMoleId = r.mole.id)}
            >
              {r.mole.code}{r.diff?.flagged ? ' ⚠' : ''}
            </button>
          {/each}
        </div>

        {#if focusRow}
          <div class="row" style="justify-content:space-between;margin:10px 0 6px">
            <strong class="mono">{focusRow.mole.code} · {focusRow.zone?.name}</strong>
            {#if focusRow.judgment}
              <span class="badge {focusRow.judgment.decision === 'observe' ? 'info' : 'purple'}">
                判读：{({observe:'观察',biopsy:'活检',excise:'切除'})[focusRow.judgment.decision]}
              </span>
            {:else}
              <span class="badge">未判读</span>
            {/if}
          </div>
          <ComparePanel row={focusRow} />
        {/if}
      </div>
    {:else}
      <div class="card muted" style="margin-top:14px;display:grid;place-items:center;min-height:200px">
        选择左侧任务查看标黄痣的前后对比
      </div>
    {/if}
  </div>
</div>

{#if showReview}
  <Modal title="主任审核意见" onclose={() => (showReview = false)} width="520px">
    <div class="field">
      <label>审核意见 / 退回原因</label>
      <textarea rows="4" bind:value={reviewNote} placeholder="退回时请写明原因，例如：BK-L-001 配对有误，请重新配对后再提交。"></textarea>
    </div>
    <div class="row" style="justify-content:flex-end;gap:8px">
      <button onclick={() => (showReview = false)}>取消</button>
      <button class="danger" onclick={() => doReview('returned')}>退回（任务回到已退回）</button>
      <button class="primary" onclick={() => doReview('approved')}>审核通过</button>
    </div>
  </Modal>
{/if}

<style>
  h2 { font-size: 19px; }
  .review-grid { display: grid; grid-template-columns: 320px minmax(0, 1fr); gap: 16px; }
  .task-list { display: flex; flex-direction: column; gap: 8px; max-height: calc(100vh - 240px); overflow: auto; }
  .task-item { text-align: left; background: var(--panel-2); border: 1px solid var(--border); }
  .task-item.sel { border-color: var(--primary); background: rgba(79, 140, 255, 0.12); }
  .mole-pills { display: flex; flex-wrap: wrap; gap: 6px; margin: 12px 0; }
  .mole-pill { font-family: monospace; }
  .mole-pill.flag { border-color: var(--warn); color: var(--warn); }
  .mole-pill.sel { background: var(--primary); border-color: var(--primary); color: #fff; }
  .history { background: var(--panel-2); border-radius: 8px; padding: 8px 12px; margin-top: 10px; line-height: 1.8; }
  .mono { font-family: monospace; }
</style>
