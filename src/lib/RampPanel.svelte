<script>
  import { ramps, results, selectedId, addMode } from './store.js';
  import { updateRamp, advanceStatus, rollbackStatus, deleteRamp } from './store.js';
  import { RAMP_TYPES, VEHICLES, STATUS, stakeText, MIN_BED_LENGTH } from './calc.js';

  let flash = '';

  $: sorted = [...$ramps].sort((a, b) => a.stakeM - b.stakeM);

  function onType(r, type) {
    const t = RAMP_TYPES[type];
    updateRamp(r.id, { type, fric: t.fric, bedGrade: t.grade }, '更换型式');
  }
  function onVehicle(r, vehicle) {
    const v = VEHICLES[vehicle];
    updateRamp(r.id, { vehicle, v0: v.v0, loadT: v.load }, '变更设计车型');
  }
  function num(e, fallback) {
    const v = parseFloat(e.target.value);
    return isNaN(v) ? fallback : v;
  }
  function doAdvance(id) {
    const r = advanceStatus(id);
    flash = r.ok ? '' : r.msg;
    if (flash) setTimeout(() => flash = '', 4000);
  }
</script>

<div class="pane">
  <div class="bar">
    <h3>避险车道({sorted.length})</h3>
    <button class:on={$addMode} on:click={() => addMode.update(v => !v)}>
      {$addMode ? '点击主线布设中…(取消)' : '＋ 沿主线布设'}
    </button>
  </div>
  {#if flash}<p class="flash">{flash}</p>{/if}
  {#if sorted.length === 0}
    <p class="hint">点击"沿主线布设"后,在三维地形的主线上点击放置;拖动引道口锥标可调整位置。</p>
  {/if}

  {#each sorted as r (r.id)}
    {@const res = $results[r.id]}
    <div class="card" class:sel={$selectedId === r.id} class:bad={res && res.errors.length}
         on:click={() => selectedId.set(r.id)}>
      <div class="head">
        <input class="name" value={r.name} on:click|stopPropagation
               on:change={e => updateRamp(r.id, { name: e.target.value }, '更名')} />
        <span class="stake">{stakeText(r.stakeM)}</span>
        <span class="badge" style="background:{STATUS[r.status].color}">{STATUS[r.status].name}</span>
      </div>

      {#if $selectedId === r.id && res}
        <div class="body" on:click|stopPropagation>
          <label>型式
            <select value={r.type} on:change={e => onType(r, e.target.value)}>
              {#each Object.entries(RAMP_TYPES) as [k, t]}<option value={k}>{t.name}</option>{/each}
            </select>
          </label>
          <p class="desc">{RAMP_TYPES[r.type].desc}</p>
          <label>设计车型
            <select value={r.vehicle} on:change={e => onVehicle(r, e.target.value)}>
              {#each Object.entries(VEHICLES) as [k, v]}<option value={k}>{v.name}({v.load}t)</option>{/each}
            </select>
          </label>
          <div class="grid">
            <label>失效初速度 km/h<input type="number" value={r.v0} min="40" max="130"
              on:change={e => updateRamp(r.id, { v0: num(e, r.v0) }, '修改参数')} /></label>
            <label>载重 t<input type="number" value={r.loadT} min="1" max="100"
              on:change={e => updateRamp(r.id, { loadT: num(e, r.loadT) }, '修改参数')} /></label>
            <label>制动床纵坡 %<input type="number" step="0.5" value={res.bedGrade}
              on:change={e => updateRamp(r.id, { bedGrade: num(e, res.bedGrade) }, '修改参数')} /></label>
            <label>滚动阻力系数<input type="number" step="0.01" value={res.fric}
              on:change={e => updateRamp(r.id, { fric: num(e, res.fric) }, '修改参数')} /></label>
          </div>

          <table class="calc">
            <tr><td>主线坡度</td><td>{res.mainGrade}%</td></tr>
            <tr><td>计算长度 L=V²/(254(f+i))</td><td>{res.L_req.toFixed(1)} m → 取整 {res.L_calc} m</td></tr>
            <tr class:err={res.L_calc < MIN_BED_LENGTH}><td>设计长度(≥{MIN_BED_LENGTH}m控制)</td><td>{res.L_design} m</td></tr>
            <tr><td>设计宽度</td><td>{res.width} m</td></tr>
            <tr class:err={res.sight.blocked}>
              <td>入口视距</td>
              <td>需要 {Math.ceil(res.sight.required)} m,
                {res.sight.blocked ? `被 ${stakeText(res.sight.blockerStake)} R=${res.sight.blockerRadius}m 弯道遮挡` : '满足'}</td>
            </tr>
            <tr class:err={res.available < res.L_design}><td>场地可用长度</td><td>{res.available} m</td></tr>
          </table>

          {#if res.errors.length}
            <div class="errors">
              {#each res.errors as er}<p>⚠ {er}</p>{/each}
            </div>
          {/if}

          <details>
            <summary>工程量估算</summary>
            <table class="calc">
              {#each Object.entries(res.quantities) as [k, v]}<tr><td>{k}</td><td>{v}</td></tr>{/each}
            </table>
          </details>
          <details>
            <summary>计算依据</summary>
            <p class="basis">{res.basis}</p>
          </details>
          <details>
            <summary>修订记录({r.revisions.length})</summary>
            {#each [...r.revisions].reverse() as v}
              <p class="rev"><b>{v.time}</b> [{v.action}] {v.detail}<br><span>{v.basis}</span></p>
            {/each}
          </details>

          <div class="ops">
            {#if STATUS[r.status].next}
              <button on:click={() => doAdvance(r.id)}>{STATUS[r.status].nextLabel}</button>
            {/if}
            {#if r.status !== 'draft'}
              <button class="sec" on:click={() => rollbackStatus(r.id)}>退回修改</button>
            {/if}
            <button class="danger" on:click={() => deleteRamp(r.id)}>删除</button>
          </div>
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  .pane { padding: 10px; }
  h3 { margin: 0; font-size: 14px; color: #9fc3ff; }
  .bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
  .hint { font-size: 12px; color: #8b95a5; }
  .flash { font-size: 12px; color: #ffb26b; background: #3a2a12; padding: 6px 8px; border-radius: 6px; }
  button { background: #2563eb; color: #fff; border: 0; border-radius: 6px; padding: 5px 10px; cursor: pointer; font-size: 12px; }
  button.sec { background: #2a3648; }
  button.danger { background: #7f1d1d; }
  button.on { background: #b45309; }
  .card { background: #131c2b; border: 1px solid #223047; border-radius: 8px; padding: 8px; margin-bottom: 8px; cursor: pointer; }
  .card.sel { border-color: #3b82f6; }
  .card.bad { border-color: #ef4444; }
  .head { display: flex; align-items: center; gap: 8px; }
  .name { flex: 1; min-width: 0; background: transparent; border: 0; color: #e5ecf5; font-size: 13px; font-weight: bold; }
  .stake { font-size: 12px; color: #8b95a5; }
  .badge { font-size: 11px; color: #0b0f16; border-radius: 4px; padding: 2px 6px; font-weight: bold; }
  .body { margin-top: 8px; cursor: default; }
  label { display: block; font-size: 12px; color: #8b95a5; margin: 6px 0 2px; }
  select, input[type=number] { width: 100%; box-sizing: border-box; background: #0f1622; color: #d5dde8; border: 1px solid #2a3648; border-radius: 5px; padding: 4px 6px; font-size: 12px; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 8px; }
  .desc { font-size: 11px; color: #6b7688; margin: 2px 0; }
  table.calc { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 6px; }
  table.calc td { border-bottom: 1px solid #1d2940; padding: 3px 4px; color: #c6d2e2; }
  table.calc td:last-child { text-align: right; }
  tr.err td { color: #ff8f8f; font-weight: bold; }
  .errors { background: #3a1414; border: 1px solid #ef4444; border-radius: 6px; padding: 6px 8px; margin-top: 6px; }
  .errors p { margin: 2px 0; font-size: 12px; color: #ffb3b3; }
  details { margin-top: 6px; font-size: 12px; }
  summary { cursor: pointer; color: #9fc3ff; }
  .basis { font-size: 11px; color: #8b95a5; line-height: 1.5; word-break: break-all; }
  .rev { font-size: 11px; color: #aab6c6; border-left: 2px solid #2a3648; padding-left: 6px; margin: 4px 0; }
  .rev span { color: #6b7688; }
  .ops { display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap; }
</style>
