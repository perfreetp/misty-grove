<script>
  import { untrack } from 'svelte';
  import {
    getState, addMole, addFinding, markMoleRemoved,
    molesOfPatient, findingsOfVisit, zoneOfMole, findingOfMoleInVisit,
    saveJudgment, followupRows, transitionTask, repairFinding,
    judgmentOf, createVisit, baselineVisitOf
  } from '../lib/store.svelte.js';
  import { DECISIONS, TASK_STATUS } from '../lib/constants.js';
  import { fmtDay, fmtDate } from '../lib/utils.js';
  import BodyViewer3D from '../components/BodyViewer3D.svelte';
  import FlatMap from '../components/FlatMap.svelte';
  import FindingForm from '../components/FindingForm.svelte';
  import ComparePanel from '../components/ComparePanel.svelte';
  import Modal from '../components/Modal.svelte';

  let { patientId, mode = 'baseline', visitId = null, taskId = null, onchanged = null } = $props();
  const s = getState();

  let tab = $state('3d');
  let pickMode = $state(false);
  let selectedId = $state(null);
  let showAddMole = $state(false);
  let showFinding = $state(false);
  let showPair = $state(false);
  let opacity = $state(1);
  let pendingSurface = $state(null);
  let effectiveVisitId = $state(visitId);
  const ensured = new Set();

  // 基线模式下若患者尚无基线就诊，自动创建一条，使定位/录入按钮可用（每个患者仅一次）
  // untrack 隔离全局 store 读取，避免 effect 因自身写入引发的重复执行
  $effect(() => {
    const pid = patientId;
    const initialVisit = visitId;
    const modeNow = mode;
    untrack(() => {
      if (modeNow !== 'baseline' || !pid || initialVisit || ensured.has(pid)) return;
      ensured.add(pid);
      const existing = baselineVisitOf(pid);
      if (existing) {
        effectiveVisitId = existing.id;
      } else {
        createVisit(pid, 'baseline', Date.now()).then((v) => {
          effectiveVisitId = v.id;
        });
      }
    });
  });

  const patient = $derived(s.patients.find((p) => p.id === patientId));
  const moles = $derived(molesOfPatient(patientId));
  const visit = $derived(s.visits.find((v) => v.id === effectiveVisitId));
  const task = $derived(taskId ? s.tasks.find((t) => t.id === taskId) : null);
  const visitFindings = $derived(effectiveVisitId ? findingsOfVisit(effectiveVisitId) : []);

  const addForm = $state({ zoneId: '', u: 0.5, v: 0.5, partId: '', side: 'front' });

  // 标黄集合（判读模式）
  const flaggedIds = $derived(
    taskId
      ? followupRows(taskId)
          .filter((r) => r.diff?.flagged)
          .map((r) => r.mole.id)
      : []
  );

  const selectedMole = $derived(moles.find((m) => m.id === selectedId) || null);
  const selectedFinding = $derived(
    selectedId && effectiveVisitId ? findingOfMoleInVisit(selectedId, effectiveVisitId) : null
  );
  const selectedBase = $derived(
    selectedId && task ? findingOfMoleInVisit(selectedId, task.baselineVisitId) : null
  );
  const selectedRow = $derived(
    taskId ? followupRows(taskId).find((r) => r.mole.id === selectedId) : null
  );
  const selectedJudgment = $derived(
    taskId && selectedId ? judgmentOf(taskId, selectedId) : null
  );

  const canEdit = $derived(mode === 'baseline' || (task && task.status !== 'judged'));
  const isReadMode = mode === 'read';
  const isCaptureMode = mode === 'capture';

  // ---- 三维表面点击 ----
  function onSurfacePick(hit) {
    addForm.u = hit.u;
    addForm.v = hit.v;
    addForm.partId = hit.partId;
    addForm.side = hit.side;
    if (!addForm.zoneId) {
      const z = s.zones.find((zz) => zz.parts.includes(hit.partId) && zz.active);
      if (z) addForm.zoneId = z.id;
    }
    pendingSurface = hit;
    showAddMole = true;
    pickMode = false;
  }

  async function confirmAddMole() {
    if (!addForm.zoneId || !addForm.partId) return;
    const mole = await addMole({ patientId, ...addForm });
    showAddMole = false;
    selectedId = mole.id;
    showFinding = true;
    onchanged?.();
  }

  async function submitFinding(payload) {
    await addFinding({ visitId: effectiveVisitId, moleId: selectedId, ...payload });
    showFinding = false;
    onchanged?.();
  }

  async function removeMole() {
    if (!selectedMole || !confirm(`确认将 ${selectedMole.code} 标记为已切除/去除？`)) return;
    await markMoleRemoved(selectedId);
  }

  // ---- 判读 ----
  const jForm = $state({ decision: 'observe', reason: '' });
  $effect(() => {
    if (selectedJudgment) {
      jForm.decision = selectedJudgment.decision;
      jForm.reason = selectedJudgment.reason;
    } else {
      jForm.decision = 'observe';
      jForm.reason = '';
    }
  });

  async function submitJudgment() {
    if (!selectedRow?.current) {
      alert('该痣尚无复诊记录，无法判读。');
      return;
    }
    await saveJudgment(taskId, selectedId, selectedRow.current.id, jForm.decision, jForm.reason);
  }

  const judgedCount = $derived(taskId ? followupRows(taskId).filter((r) => r.judgment).length : 0);
  const totalRows = $derived(taskId ? followupRows(taskId).length : 0);

  async function submitRead() {
    if (!task) return;
    const rows = followupRows(taskId);
    const missing = rows.filter((r) => r.current && !r.judgment);
    if (missing.length) {
      if (!confirm(`还有 ${missing.length} 颗有复诊记录的痣未判读，确认提交判读？`)) return;
    }
    await transitionTask(task.id, 'judged');
    onchanged?.();
  }

  // ---- 重新配对 ----
  let pairTarget = $state('');
  function openPair() {
    pairTarget = '';
    showPair = true;
  }
  async function confirmPair() {
    if (!selectedRow?.current || !pairTarget) return;
    await repairFinding(selectedRow.current.id, pairTarget);
    showPair = false;
    selectedId = pairTarget;
    onchanged?.();
  }

  function zoneName(id) {
    return zoneOfMole({ zoneId: id })?.name || id;
  }
  function statusName(id) {
    return TASK_STATUS.find((x) => x.id === id)?.name || id;
  }
  function findingOn(moleId) {
    return visitFindings.find((f) => f.moleId === moleId);
  }
</script>

{#if !patient}
  <div class="muted">患者不存在。</div>
{:else}
  <div class="ws-head row" style="justify-content:space-between">
    <div>
      <h2 style="margin:0 0 4px">{patient.name} 的三维痣图
        {#if task}<span class="badge purple" style="margin-left:8px">{statusName(task.status)}</span>{/if}
      </h2>
      <div class="small muted">
        {#if visit}就诊日期 {fmtDay(visit.visitDate)} · {visit.type === 'baseline' ? '基线建档' : '复诊'} · {/if}
        共 {moles.length} 颗痣{#if taskId} · 已判读 {judgedCount}/{totalRows}{/if}
      </div>
    </div>
    <div class="row">
      {#if canEdit && effectiveVisitId}
        <button class="primary" onclick={() => (pickMode = true)}>＋ 在体表定位新痣</button>
      {/if}
      {#if isReadMode && task?.status === 'pending_read'}
        <button class="primary" onclick={submitRead}>完成判读并提交主任审核</button>
      {/if}
    </div>
  </div>

  <div class="ws-grid">
    <div class="viewer-col">
      <div class="pill-tabs">
        <button class="sm" class:active={tab === '3d'} onclick={() => (tab = '3d')}>三维体表模型</button>
        <button class="sm" class:active={tab === 'flat'} onclick={() => (tab = 'flat')}>平面展开图</button>
      </div>
      {#if tab === '3d'}
        <BodyViewer3D
          {moles}
          {flaggedIds}
          bind:selectedId
          {pickMode}
          bind:opacity
          onpick={onSurfacePick}
        />
      {:else}
        <FlatMap {moles} zones={s.zones} {flaggedIds} bind:selectedId />
      {/if}
    </div>

    <div class="side-col scroll">
      <!-- 痣列表 -->
      <div class="card">
        <h3>痣编号清单（按解剖分区编码）</h3>
        <div class="mole-list scroll">
          {#each moles as m (m.id)}
            {@const z = zoneOfMole(m)}
            {@const f = effectiveVisitId ? findingOn(m.id) : null}
            <button
              class="mole-item"
              class:sel={m.id === selectedId}
              class:flag={flaggedIds.includes(m.id)}
              onclick={() => (selectedId = m.id)}
            >
              <div class="row" style="justify-content:space-between;gap:6px">
                <strong class="mono">{m.code}</strong>
                <span class="row" style="gap:4px">
                  {#if m.removed}<span class="badge">已切除</span>{/if}
                  {#if flaggedIds.includes(m.id)}<span class="badge warn">标黄</span>{/if}
                  {#if f}<span class="badge ok">已记录</span>{:else if effectiveVisitId}<span class="badge">待拍</span>{/if}
                </span>
              </div>
              <div class="small muted">{z?.name} · {m.side === 'front' ? '前侧' : '后侧'}{#if f} · ⌀{f.diameterMm}mm{/if}</div>
            </button>
          {/each}
          {#if moles.length === 0}
            <div class="muted small" style="padding:14px 4px">尚无痣记录，点击「在体表定位新痣」开始建档。</div>
          {/if}
        </div>
      </div>

      <!-- 选中痣详情 -->
      {#if selectedMole}
        <div class="card">
          <h3 class="row" style="justify-content:space-between">
            <span class="mono">{selectedMole.code}</span>
            {#if canEdit && !selectedMole.removed}<button class="sm danger" onclick={removeMole}>标记切除</button>{/if}
          </h3>
          <div class="small muted" style="line-height:1.9">
            分区：{zoneName(selectedMole.zoneId)}<br />
            部件：{selectedMole.partId} · {selectedMole.side === 'front' ? '前侧' : '后侧'} ·
            局部坐标 u={selectedMole.u} / v={selectedMole.v}
          </div>

          <!-- 基线/复诊对比 -->
          {#if task}
            <ComparePanel row={selectedRow} />
            {#if isCaptureMode && canEdit}
              {#if selectedRow.current}
                <div class="badge ok" style="margin-top:10px">该部位已完成复诊拍摄配对</div>
              {:else}
                <button class="primary" style="margin-top:10px;width:100%" onclick={() => (showFinding = true)}>
                  拍同部位并挂接（编号 {selectedMole.code}）
                </button>
              {/if}
              <button class="sm" style="margin-top:8px;width:100%" onclick={openPair}>配对有误？重新配对</button>
            {/if}
            {#if isReadMode}
              <div class="judge-box">
                <h4 style="margin:12px 0 8px">医师判读</h4>
                {#if !selectedRow.current}
                  <div class="badge">该痣本次复诊无记录</div>
                {:else}
                  <div class="field">
                    <label>处置决定</label>
                    <div class="decision-row">
                      {#each DECISIONS as d (d.id)}
                        <button
                          class="sm"
                          class:primary={jForm.decision === d.id}
                          onclick={() => (jForm.decision = d.id)}
                        >{d.name}</button>
                      {/each}
                    </div>
                  </div>
                  <div class="field">
                    <label>判读理由 *</label>
                    <textarea rows="3" bind:value={jForm.reason} placeholder="结合直径变化、边缘与色素网络给出理由"></textarea>
                  </div>
                  <button class="primary" onclick={submitJudgment} disabled={!jForm.reason.trim()}>
                    {selectedJudgment ? '更新判读' : '保存判读'}
                  </button>
                  {#if selectedJudgment}
                    <div class="small muted" style="margin-top:8px">
                      上次判读：{selectedJudgment.physician} · {fmtDate(selectedJudgment.ts)}
                    </div>
                  {/if}
                {/if}
              </div>
            {/if}
          {:else if mode === 'baseline'}
            {#if selectedFinding}
              <div class="badge ok" style="margin-top:10px">基线已记录 ⌀{selectedFinding.diameterMm}mm</div>
            {:else if canEdit}
              <button class="primary" style="margin-top:10px;width:100%" onclick={() => (showFinding = true)}>
                录入皮肤镜记录
              </button>
            {/if}
          {/if}
        </div>
      {/if}
    </div>
  </div>
{/if}

<!-- 新增痣弹窗 -->
{#if showAddMole}
  <Modal title="体表定位与分区编码" onclose={() => (showAddMole = false)} width="560px">
    <div class="field">
      <label>解剖分区 *（决定编号前缀）</label>
      <select bind:value={addForm.zoneId}>
        <option value="">— 选择分区 —</option>
        {#each s.zones.filter((z) => z.active) as z (z.id)}
          <option value={z.id}>{z.name}（{z.code}）</option>
        {/each}
      </select>
    </div>
    <div class="grid2">
      <div class="field">
        <label>命中部件</label>
        <input value={addForm.partId || '—'} readonly />
      </div>
      <div class="field">
        <label>朝向</label>
        <input value={addForm.side === 'front' ? '前侧' : '后侧'} readonly />
      </div>
      <div class="field"><label>局部 u</label><input type="number" step="0.001" bind:value={addForm.u} /></div>
      <div class="field"><label>局部 v</label><input type="number" step="0.001" bind:value={addForm.v} /></div>
    </div>
    <div class="small muted" style="margin-bottom:12px">
      保存后按「分区码-左右侧-流水号」自动生成永久编号，复诊凭编号配对。
    </div>
    <div class="row" style="justify-content:flex-end;gap:8px">
      <button onclick={() => (showAddMole = false)}>取消</button>
      <button class="primary" onclick={confirmAddMole} disabled={!addForm.zoneId || !addForm.partId}>生成编号并继续录入照片</button>
    </div>
  </Modal>
{/if}

<!-- 测量记录弹窗 -->
{#if showFinding && selectedMole}
  <Modal title={`皮肤镜记录 · ${selectedMole.code}`} onclose={() => (showFinding = false)} width="640px">
    <FindingForm
      angles={s.angles}
      initial={selectedRow?.current || selectedFinding || {}}
      onsubmit={submitFinding}
      oncancel={() => (showFinding = false)}
    />
  </Modal>
{/if}

<!-- 重新配对弹窗 -->
{#if showPair}
  <Modal title="重新配对复诊记录" onclose={() => (showPair = false)} width="520px">
    <div class="small muted" style="margin-bottom:10px">
      将当前复诊照片与测量改挂到另一颗编号的痣上（用于主任退回后的修正）。
    </div>
    <select bind:value={pairTarget}>
      <option value="">— 选择目标痣编号 —</option>
      {#each moles.filter((m) => m.id !== selectedId) as m (m.id)}
        <option value={m.id}>{m.code}（{zoneName(m.zoneId)}）</option>
      {/each}
    </select>
    <div class="row" style="justify-content:flex-end;gap:8px;margin-top:14px">
      <button onclick={() => (showPair = false)}>取消</button>
      <button class="primary" onclick={confirmPair} disabled={!pairTarget}>确认重新配对</button>
    </div>
  </Modal>
{/if}

<style>
  .ws-head { margin-bottom: 14px; }
  .ws-grid { display: grid; grid-template-columns: minmax(0, 1fr) 380px; gap: 16px; height: calc(100vh - 150px); }
  .viewer-col { display: flex; flex-direction: column; min-width: 0; }
  .side-col { display: flex; flex-direction: column; gap: 14px; min-height: 0; }
  .mole-list { max-height: 260px; overflow: auto; display: flex; flex-direction: column; gap: 6px; }
  .mole-item {
    text-align: left; display: block; width: 100%;
    background: var(--panel-2); border: 1px solid var(--border);
  }
  .mole-item.sel { border-color: var(--primary); background: rgba(79, 140, 255, 0.12); }
  .mole-item.flag { border-color: rgba(240, 180, 41, 0.6); }
  .mono { font-family: monospace; }
  .judge-box { border-top: 1px solid var(--border); margin-top: 12px; padding-top: 4px; }
  .decision-row { display: flex; gap: 8px; }
  .decision-row button { flex: 1; }
</style>
