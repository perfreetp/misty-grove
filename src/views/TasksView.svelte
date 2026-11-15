<script>
  import {
    getState, createTask, transitionTask, followupRows, baselineVisitOf,
    molesOfPatient
  } from '../lib/store.svelte.js';
  import { TASK_STATUS } from '../lib/constants.js';
  import { fmtDay, fmtDate, toCSV, downloadBlob } from '../lib/utils.js';
  import Modal from '../components/Modal.svelte';
  import WorkspaceView from './WorkspaceView.svelte';

  let { focusTaskId = null, clearFocus } = $props();
  const s = getState();

  let filter = $state('all');
  let showCreate = $state(false);
  let activeTaskId = $state(focusTaskId);
  let activeMode = $state('capture');
  const createForm = $state({ patientId: '', due: '' });

  const counts = $derived(
    Object.fromEntries(TASK_STATUS.map((x) => [x.id, s.tasks.filter((t) => t.status === x.id).length]))
  );

  const shown = $derived(
    s.tasks.filter((t) => filter === 'all' || t.status === filter)
  );

  function patientName(id) {
    return s.patients.find((p) => p.id === id)?.name || '—';
  }
  function patientNo(id) {
    return s.patients.find((p) => p.id === id)?.medicalNo || '';
  }
  function statusBadge(id) {
    return {
      pending_capture: 'info',
      pending_read: 'purple',
      judged: 'ok',
      returned: 'danger'
    }[id] || '';
  }
  function flagCount(taskId) {
    return followupRows(taskId).filter((r) => r.diff?.flagged).length;
  }
  function capturedCount(taskId) {
    const t = s.tasks.find((x) => x.id === taskId);
    return followupRows(taskId).filter((r) => r.current).length +
      (t ? s.findings.filter((f) => f.visitId === t.visitId &&
        !molesOfPatient(t.patientId).some((m) => m.id === f.moleId)).length : 0);
  }

  async function openCreate() {
    createForm.patientId = s.patients[0]?.id || '';
    createForm.due = new Date(Date.now() + 180 * 86400000).toISOString().slice(0, 10);
    showCreate = true;
  }

  async function submitCreate() {
    if (!createForm.patientId || !createForm.due) return;
    const base = baselineVisitOf(createForm.patientId);
    if (!base) {
      alert('该患者尚无基线就诊，无法建立随访任务。');
      return;
    }
    const t = await createTask(createForm.patientId, base.id, new Date(createForm.due).getTime());
    showCreate = false;
    activeTaskId = t.id;
    activeMode = 'capture';
  }

  const activeTask = $derived(s.tasks.find((t) => t.id === activeTaskId) || null);

  async function submitCapture(taskId) {
    await transitionTask(taskId, 'pending_read');
    activeMode = 'read';
  }
  function reopenCapture(taskId) {
    activeTaskId = taskId;
    activeMode = 'capture';
  }
  function openRead(taskId) {
    activeTaskId = taskId;
    activeMode = 'read';
  }
  function exitTask() {
    activeTaskId = null;
    clearFocus?.();
  }

  // ---- 导出 ----
  function exportDiff(taskId) {
    const task = s.tasks.find((t) => t.id === taskId);
    const rows = followupRows(taskId);
    const headers = [
      { label: '痣编号', get: (r) => r.mole.code },
      { label: '解剖分区', get: (r) => r.zone?.name || '' },
      { label: '基线直径mm', get: (r) => r.baseline?.diameterMm ?? '' },
      { label: '复诊直径mm', get: (r) => r.current?.diameterMm ?? '未采集' },
      { label: '直径变化mm', get: (r) => r.diff?.deltaMm ?? '' },
      { label: '基线边缘', get: (r) => r.baseline?.edgeType ?? '' },
      { label: '复诊边缘', get: (r) => r.current?.edgeType ?? '' },
      { label: '色素网络', get: (r) => r.current?.networkType ?? '' },
      { label: '是否标黄', get: (r) => (r.diff?.flagged ? '是' : '否') },
      { label: '标黄原因', get: (r) => r.diff?.reasons.join('；') || '' },
      { label: '判读决定', get: (r) => ({ observe: '观察', biopsy: '活检', excise: '切除' }[r.judgment?.decision] || '') },
      { label: '判读医师', get: (r) => r.judgment?.physician || '' },
      { label: '判读理由', get: (r) => r.judgment?.reason || '' }
    ];
    const csv = toCSV(rows, headers);
    downloadBlob(
      new Blob([csv], { type: 'text/csv;charset=utf-8' }),
      `随访差异清单_${patientName(task.patientId)}_${fmtDay(task.lastStatusAt)}.csv`
    );
  }

  function exportBiopsy(taskId) {
    const task = s.tasks.find((t) => t.id === taskId);
    const rows = followupRows(taskId).filter(
      (r) => r.judgment?.decision === 'biopsy' || r.judgment?.decision === 'excise'
    );
    if (!rows.length) {
      alert('当前没有「活检」或「切除」判读，无可导出的建议单。');
      return;
    }
    const headers = [
      { label: '建议序号', get: (r, i) => i + 1 },
      { label: '痣编号', get: (r) => r.mole.code },
      { label: '解剖分区', get: (r) => r.zone?.name || '' },
      { label: '建议处置', get: (r) => (r.judgment.decision === 'biopsy' ? '活检' : '切除') },
      { label: '当前直径mm', get: (r) => r.current?.diameterMm ?? '' },
      { label: '边缘形态', get: (r) => r.current?.edgeType ?? '' },
      { label: '色素网络', get: (r) => r.current?.networkType ?? '' },
      { label: '标黄原因', get: (r) => r.diff?.reasons.join('；') || '' },
      { label: '判读理由', get: (r) => r.judgment.reason },
      { label: '判读医师', get: (r) => r.judgment.physician },
      { label: '判读时间', get: (r) => fmtDate(r.judgment.ts) }
    ];
    const csv = toCSV(rows, headers);
    const patient = s.patients.find((p) => p.id === task.patientId);
    const head =
      `﻿活检/切除建议单\r\n患者,${patient.name}\r\n病案号,${patient.medicalNo || '—'}\r\n` +
      `基线就诊,${fmtDay(task.baselineVisitId && s.visits.find((v) => v.id === task.baselineVisitId)?.visitDate)}\r\n` +
      `生成时间,${fmtDate(Date.now())}\r\n\r\n`;
    downloadBlob(
      new Blob([head + csv.slice(1)], { type: 'text/csv;charset=utf-8' }),
      `活检建议单_${patient.name}_${fmtDay(Date.now())}.csv`
    );
  }
</script>

{#if activeTask}
  <div>
    <div class="row" style="justify-content:space-between;margin-bottom:12px">
      <button class="sm" onclick={exitTask}>← 返回任务列表</button>
      <div class="row">
        <div class="pill-tabs" style="margin:0">
          <button class="sm" class:active={activeMode === 'capture'} onclick={() => (activeMode = 'capture')}>采集视图</button>
          <button class="sm" class:active={activeMode === 'read'} onclick={() => (activeMode = 'read')}>判读视图</button>
        </div>
        {#if activeMode === 'capture' && activeTask.status === 'pending_capture'}
          <button class="primary" onclick={() => submitCapture(activeTask.id)}>采集完成，提交判读</button>
        {/if}
        {#if activeTask.status === 'judged' || activeTask.status === 'returned'}
          <button onclick={() => exportDiff(activeTask.id)}>导出差异清单</button>
          <button class="primary" onclick={() => exportBiopsy(activeTask.id)}>导出活检建议单</button>
        {/if}
      </div>
    </div>
    <WorkspaceView
      patientId={activeTask.patientId}
      visitId={activeTask.visitId}
      taskId={activeTask.id}
      mode={activeMode === 'capture' ? 'capture' : 'read'}
      onchanged={() => {}}
    />
  </div>
{:else}
  <div class="row" style="justify-content:space-between">
    <div>
      <h2 style="margin:0 0 4px">随访任务</h2>
      <div class="small muted">待采集 → 待判读 → 已判读（主任审核可退回）→ 已退回</div>
    </div>
    <button class="primary" onclick={openCreate}>＋ 新建随访任务</button>
  </div>

  <div class="stat-row">
    {#each TASK_STATUS as st (st.id)}
      <button class="stat-card" class:on={filter === st.id} onclick={() => (filter = st.id)}>
        <div class="num">{counts[st.id] || 0}</div>
        <div class="small muted">{st.name}</div>
      </button>
    {/each}
    <button class="stat-card" class:on={filter === 'all'} onclick={() => (filter = 'all')}>
      <div class="num">{s.tasks.length}</div>
      <div class="small muted">全部</div>
    </button>
  </div>

  <div class="card" style="margin-top:14px">
    <table>
      <thead>
        <tr>
          <th>患者</th><th>病案号</th><th>计划复诊</th><th>状态</th>
          <th>采集/痣数</th><th>标黄</th><th>最后变更</th><th>操作</th>
        </tr>
      </thead>
      <tbody>
        {#each shown as t (t.id)}
          <tr>
            <td>{patientName(t.patientId)}</td>
            <td class="small mono">{patientNo(t.patientId) || '—'}</td>
            <td>{fmtDay(t.dueDate)}</td>
            <td><span class="badge {statusBadge(t.status)}">{TASK_STATUS.find((x) => x.id === t.status)?.name}</span></td>
            <td class="small">{capturedCount(t.id)}/{molesOfPatient(t.patientId).length}</td>
            <td>{#if flagCount(t.id) > 0}<span class="badge warn">{flagCount(t.id)}</span>{:else}<span class="muted small">0</span>{/if}</td>
            <td class="small muted">{fmtDate(t.lastStatusAt)}<br />{t.lastStatusBy}</td>
            <td>
              <div class="row" style="gap:6px;flex-wrap:wrap">
                {#if t.status === 'pending_capture'}
                  <button class="sm primary" onclick={() => reopenCapture(t.id)}>去采集</button>
                {:else}
                  <button class="sm" onclick={() => openRead(t.id)}>查看/判读</button>
                {/if}
                {#if t.status === 'returned'}
                  <button class="sm danger" onclick={() => reopenCapture(t.id)}>重新配对处理</button>
                {/if}
                {#if t.status === 'judged' || t.status === 'returned'}
                  <button class="sm" onclick={() => exportDiff(t.id)}>差异清单</button>
                {/if}
              </div>
            </td>
          </tr>
        {/each}
        {#if shown.length === 0}
          <tr><td colspan="8" class="muted" style="text-align:center;padding:30px">该状态下暂无任务。</td></tr>
        {/if}
      </tbody>
    </table>
  </div>
{/if}

{#if showCreate}
  <Modal title="新建随访任务" onclose={() => (showCreate = false)} width="480px">
    <div class="field">
      <label>选择患者（须已有基线痣图）</label>
      <select bind:value={createForm.patientId}>
        {#each s.patients as p (p.id)}
          <option value={p.id}>{p.name}（{p.medicalNo || '无病案号'} · {molesOfPatient(p.id).length}颗痣）</option>
        {/each}
      </select>
    </div>
    <div class="field">
      <label>计划复诊日期</label>
      <input type="date" bind:value={createForm.due} />
    </div>
    <div class="small muted" style="margin-bottom:12px">
      任务创建后自动生成复诊就诊单，初始状态为「待采集」。
    </div>
    <div class="row" style="justify-content:flex-end;gap:8px">
      <button onclick={() => (showCreate = false)}>取消</button>
      <button class="primary" onclick={submitCreate}>创建并进入采集</button>
    </div>
  </Modal>
{/if}

<style>
  h2 { font-size: 19px; }
  .stat-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-top: 16px; }
  .stat-card { background: var(--panel); border: 1px solid var(--border); border-radius: var(--radius); padding: 14px; }
  .stat-card.on { border-color: var(--primary); background: rgba(79, 140, 255, 0.1); }
  .num { font-size: 24px; font-weight: 700; }
  .mono { font-family: monospace; }
</style>
