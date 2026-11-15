<script>
  import { getState, saveZone, toggleZone, saveAngle, toggleAngle } from '../lib/store.svelte.js';
  import { BODY_PARTS } from '../lib/constants.js';
  import Modal from '../components/Modal.svelte';

  const s = getState();
  let tab = $state('zones');
  let zoneModal = $state(false);
  let angleModal = $state(false);

  const zoneForm = $state({ id: '', name: '', code: '', parts: [], side: 'both', band: null, color: '#88aadd', active: true });
  const angleForm = $state({ id: '', name: '', body: '全身', guidance: '', active: true });

  function editZone(z) {
    Object.assign(zoneForm, { band: null, ...z, parts: [...z.parts] });
    zoneModal = true;
  }
  function newZone() {
    Object.assign(zoneForm, { id: '', name: '', code: '', parts: [], side: 'both', band: null, color: '#88aadd', active: true });
    zoneModal = true;
  }
  async function submitZone() {
    if (!zoneForm.id || !zoneForm.name || !zoneForm.code || !zoneForm.parts.length) {
      alert('编号、名称、编码与关联部件均为必填。');
      return;
    }
    await saveZone({ ...zoneForm, parts: [...zoneForm.parts] });
    zoneModal = false;
  }
  function togglePart(pid) {
    const i = zoneForm.parts.indexOf(pid);
    if (i >= 0) zoneForm.parts.splice(i, 1);
    else zoneForm.parts.push(pid);
  }

  function editAngle(a) {
    Object.assign(angleForm, a);
    angleModal = true;
  }
  function newAngle() {
    Object.assign(angleForm, { id: 'AN' + String(s.angles.length + 1).padStart(2, '0'), name: '', body: '全身', guidance: '', active: true });
    angleModal = true;
  }
  async function submitAngle() {
    if (!angleForm.id || !angleForm.name) return;
    await saveAngle({ ...angleForm });
    angleModal = false;
  }
</script>

<div>
  <h2 style="margin:0 0 4px">技师维护</h2>
  <div class="small muted">维护解剖分区编号规则与拍摄角度模板；停用后的规则不能用于新痣编码，历史痣图保留原编码。</div>

  <div class="pill-tabs" style="margin-top:14px">
    <button class:active={tab === 'zones'} onclick={() => (tab = 'zones')}>解剖分区规则</button>
    <button class:active={tab === 'angles'} onclick={() => (tab = 'angles')}>拍摄角度模板</button>
  </div>

  {#if tab === 'zones'}
    <div class="card">
      <div class="row" style="justify-content:space-between;margin-bottom:10px">
        <h3 style="margin:0">分区编码（{s.zones.length}）</h3>
        <button class="primary sm" onclick={newZone}>＋ 新增分区</button>
      </div>
      <table>
        <thead><tr><th>编码</th><th>分区名称</th><th>关联三维部件</th><th>朝向</th><th>色标</th><th>状态</th><th></th></tr></thead>
        <tbody>
          {#each s.zones as z (z.id)}
            <tr>
              <td class="mono"><strong>{z.code}</strong></td>
              <td>{z.name}</td>
              <td class="small muted">{z.parts.join('、')}</td>
              <td>{z.side === 'front' ? '前侧' : z.side === 'back' ? '后侧' : '前后均可'}</td>
              <td><span class="swatch" style={`background:${z.color}`}></span></td>
              <td>{#if z.active}<span class="badge ok">启用</span>{:else}<span class="badge">停用</span>{/if}</td>
              <td class="row" style="gap:6px">
                <button class="sm" onclick={() => editZone(z)}>编辑</button>
                <button class="sm" onclick={() => toggleZone(z.id)}>{z.active ? '停用' : '启用'}</button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {:else}
    <div class="card">
      <div class="row" style="justify-content:space-between;margin-bottom:10px">
        <h3 style="margin:0">拍摄角度模板（{s.angles.length}）</h3>
        <button class="primary sm" onclick={newAngle}>＋ 新增模板</button>
      </div>
      <table>
        <thead><tr><th>模板号</th><th>名称</th><th>适用部位</th><th>拍摄指引</th><th>状态</th><th></th></tr></thead>
        <tbody>
          {#each s.angles as a (a.id)}
            <tr>
              <td class="mono">{a.id}</td>
              <td>{a.name}</td>
              <td><span class="badge info">{a.body}</span></td>
              <td class="small muted" style="max-width:420px">{a.guidance}</td>
              <td>{#if a.active}<span class="badge ok">启用</span>{:else}<span class="badge">停用</span>{/if}</td>
              <td class="row" style="gap:6px">
                <button class="sm" onclick={() => editAngle(a)}>编辑</button>
                <button class="sm" onclick={() => toggleAngle(a.id)}>{a.active ? '停用' : '启用'}</button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>

{#if zoneModal}
  <Modal title="分区规则" onclose={() => (zoneModal = false)} width="640px">
    <div class="grid2">
      <div class="field"><label>分区 ID（字母码）*</label><input bind:value={zoneForm.id} placeholder="如 BK" /></div>
      <div class="field"><label>显示编码 *</label><input bind:value={zoneForm.code} placeholder="如 BK" /></div>
      <div class="field"><label>分区名称 *</label><input bind:value={zoneForm.name} /></div>
      <div class="field">
        <label>朝向</label>
        <select bind:value={zoneForm.side}>
          <option value="front">仅前侧</option>
          <option value="back">仅后侧</option>
          <option value="both">前后均可</option>
        </select>
      </div>
      <div class="field"><label>平面图色标</label><input type="color" bind:value={zoneForm.color} style="height:38px;padding:3px" /></div>
    </div>
    <div class="field">
      <label>关联三维部件 *（可多选，决定点击身体时的默认分区）</label>
      <div class="part-grid">
        {#each BODY_PARTS as p (p.id)}
          <button
            class="sm part-btn"
            class:on={zoneForm.parts.includes(p.id)}
            onclick={() => togglePart(p.id)}
            type="button"
          >{p.id}</button>
        {/each}
      </div>
    </div>
    <div class="row" style="justify-content:flex-end;gap:8px">
      <button onclick={() => (zoneModal = false)}>取消</button>
      <button class="primary" onclick={submitZone}>保存规则</button>
    </div>
  </Modal>
{/if}

{#if angleModal}
  <Modal title="拍摄角度模板" onclose={() => (angleModal = false)} width="560px">
    <div class="grid2">
      <div class="field"><label>模板号 *</label><input bind:value={angleForm.id} /></div>
      <div class="field"><label>模板名称 *</label><input bind:value={angleForm.name} /></div>
    </div>
    <div class="field">
      <label>适用部位</label>
      <select bind:value={angleForm.body}>
        <option>全身</option><option>头面</option><option>躯干</option><option>上肢</option><option>下肢</option>
      </select>
    </div>
    <div class="field">
      <label>拍摄指引（机位、距离、光源、比例尺等）</label>
      <textarea rows="4" bind:value={angleForm.guidance}></textarea>
    </div>
    <div class="row" style="justify-content:flex-end;gap:8px">
      <button onclick={() => (angleModal = false)}>取消</button>
      <button class="primary" onclick={submitAngle}>保存模板</button>
    </div>
  </Modal>
{/if}

<style>
  h2 { font-size: 19px; }
  .mono { font-family: monospace; }
  .swatch { display: inline-block; width: 18px; height: 18px; border-radius: 5px; border: 1px solid var(--border); }
  .part-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
  .part-btn.on { background: var(--primary); border-color: var(--primary); color: #fff; }
</style>
