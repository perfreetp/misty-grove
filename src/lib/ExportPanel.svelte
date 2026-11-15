<script>
  import { ramps, results, stats, profile } from './store.js';
  import { RAMP_TYPES, VEHICLES, STATUS, stakeText, MIN_BED_LENGTH } from './calc.js';

  let msg = '';

  function csvCell(s) {
    s = String(s ?? '');
    return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  }

  function download(filename, content, mime = 'text/csv') {
    const blob = new Blob([content], { type: mime + ';charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function exportTable() {
    const sorted = [...$ramps].sort((a, b) => a.stakeM - b.stakeM);
    if (sorted.length === 0) { msg = '尚无避险车道可导出'; return; }
    const head = ['序号', '名称', '引道口桩号', '型式', '状态', '设计车型', '载重(t)',
      '制动失效初速度(km/h)', '主线坡度(%)', '制动床纵坡(%)', '滚动阻力系数',
      `计算长度(m)`, `设计长度(m,≥${MIN_BED_LENGTH}控制)`, '设计宽度(m)',
      '入口视距要求(m)', '视距检验', '场地可用长度(m)', '检验结论',
      '与上游间距(km)', '覆盖里程(km)', '覆盖失控车辆(辆)', '工程量', '计算依据'];
    const rows = sorted.map((r, i) => {
      const res = $results[r.id];
      const st = $stats.rows.find(x => x.ramp.id === r.id);
      const q = Object.entries(res.quantities).map(([k, v]) => `${k}:${v}`).join(';');
      return [
        i + 1, r.name, stakeText(r.stakeM), RAMP_TYPES[r.type].name, STATUS[r.status].name,
        VEHICLES[r.vehicle].name, r.loadT, r.v0, res.mainGrade, res.bedGrade, res.fric,
        res.L_req.toFixed(1), res.L_design, res.width,
        Math.ceil(res.sight.required),
        res.sight.blocked ? `被${stakeText(res.sight.blockerStake)}弯道遮挡` : '满足',
        res.available,
        res.errors.length ? '不合格:' + res.errors.join('|') : '合格',
        st && st.spacing !== null ? (st.spacing / 1000).toFixed(2) : '—',
        st ? st.zoneKm.toFixed(2) : '',
        st ? st.covered.toFixed(1) : '',
        q, res.basis
      ];
    });
    const csv = '﻿' + [head, ...rows].map(r => r.map(csvCell).join(',')).join('\r\n');
    download('避险车道选址论证表.csv', csv);
    msg = `已导出 ${rows.length} 条选址论证记录`;
  }

  function exportJson() {
    const data = {
      导出时间: new Date().toLocaleString('zh-CN', { hour12: false }),
      纵断面: $profile,
      避险车道: $ramps.map(r => ({ ...r, 验算: $results[r.id] }))
    };
    download('避险车道方案.json', JSON.stringify(data, null, 2), 'application/json');
    msg = '已导出方案 JSON(含修订记录与计算依据)';
  }
</script>

<div class="pane">
  <h3>导出选址论证表</h3>
  <p class="hint">论证表包含每处避险车道的桩号、型式、设计车型与载重、失效初速度、制动床长度/宽度验算、视距检验、工程量、覆盖统计与计算依据,提交养护科与交警联审使用。</p>
  <div class="row">
    <button on:click={exportTable}>导出选址论证表 (CSV)</button>
    <button class="sec" on:click={exportJson}>导出方案 JSON</button>
  </div>
  {#if msg}<p class="msg">{msg}</p>{/if}

  {#if $ramps.length}
    <h3>预览</h3>
    <div class="scroll">
      <table>
        <thead><tr><th>桩号</th><th>型式</th><th>设计长度</th><th>宽度</th><th>视距</th><th>结论</th><th>状态</th></tr></thead>
        <tbody>
          {#each [...$ramps].sort((a, b) => a.stakeM - b.stakeM) as r}
            {@const res = $results[r.id]}
            <tr class:bad={res.errors.length}>
              <td>{stakeText(r.stakeM)}</td>
              <td>{RAMP_TYPES[r.type].name}</td>
              <td>{res.L_design} m</td>
              <td>{res.width} m</td>
              <td>{res.sight.blocked ? '遮挡' : '满足'}</td>
              <td>{res.errors.length ? '不合格' : '合格'}</td>
              <td>{STATUS[r.status].name}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>

<style>
  .pane { padding: 10px; }
  h3 { margin: 8px 0 6px; font-size: 14px; color: #9fc3ff; }
  .hint { font-size: 12px; color: #8b95a5; line-height: 1.5; }
  .row { display: flex; gap: 6px; margin: 8px 0; flex-wrap: wrap; }
  button { background: #2563eb; color: #fff; border: 0; border-radius: 6px; padding: 6px 12px; cursor: pointer; font-size: 13px; }
  button.sec { background: #2a3648; }
  .msg { font-size: 12px; color: #7ee2a8; }
  .scroll { overflow-x: auto; }
  table { border-collapse: collapse; font-size: 12px; min-width: 100%; }
  th, td { border-bottom: 1px solid #223047; padding: 4px 6px; text-align: right; color: #c6d2e2; white-space: nowrap; }
  th { color: #8b95a5; font-weight: normal; }
  td:first-child, th:first-child { text-align: left; }
  tr.bad td { color: #ff8f8f; }
</style>
