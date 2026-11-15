<script>
  import { profile, importProfile } from './store.js';
  import { parseStake, stakeText } from './calc.js';
  import { SAMPLE_PROFILE } from './sampleData.js';

  let text = '';
  let msg = '';
  let fileInput;

  $: totalLen = $profile.reduce((s, x) => s + x.length, 0);
  $: totalDrop = $profile.reduce((s, x) => s + x.grade * x.length / 100, 0);

  function parse(text) {
    const segs = [];
    const lines = text.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || line.startsWith('#') || line.startsWith('//')) continue;
      const parts = line.split(/[,，\t\s]+/).filter(Boolean);
      if (parts.length < 3) throw new Error(`第 ${i + 1} 行格式错误: 需要 桩号,坡度,坡长`);
      const stakeM = parseStake(parts[0]);
      const grade = parseFloat(parts[1]);
      const length = parseFloat(parts[2]);
      const radius = parts[3] ? parseFloat(parts[3]) : 0;
      if (isNaN(stakeM)) throw new Error(`第 ${i + 1} 行桩号无法识别: ${parts[0]}`);
      if (isNaN(grade) || isNaN(length) || length <= 0) throw new Error(`第 ${i + 1} 行坡度/坡长无效`);
      segs.push({ stakeM, grade, length, radius });
    }
    if (segs.length < 1) throw new Error('未解析到任何纵断面段');
    segs.sort((a, b) => a.stakeM - b.stakeM);
    return segs;
  }

  function doImport() {
    try {
      const segs = parse(text);
      importProfile(segs);
      msg = `已导入 ${segs.length} 个纵断面段,共 ${(segs.reduce((s, x) => s + x.length, 0) / 1000).toFixed(1)} km`;
    } catch (e) {
      msg = '导入失败: ' + e.message;
    }
  }

  function loadSample() {
    text = SAMPLE_PROFILE.map(s => `${stakeText(s.stakeM)},${s.grade},${s.length},${s.radius}`).join('\n');
    importProfile(SAMPLE_PROFILE.map(s => ({ ...s })));
    msg = '已载入示例长下坡纵断面(13.3km 连续下坡)';
  }

  function onFile(e) {
    const f = e.target.files[0];
    if (!f) return;
    const rd = new FileReader();
    rd.onload = () => { text = String(rd.result); };
    rd.readAsText(f, 'utf-8');
  }
</script>

<div class="pane">
  <h3>纵断面导入</h3>
  <p class="hint">每行一段: <code>桩号,坡度(%),坡长(m)[,平曲线半径(m)]</code><br>
    桩号支持 K12+500 或 12500;半径 0 为直线,符号表示转向。</p>
  <textarea rows="9" bind:value={text} placeholder="K0+000,-2.5,800,0&#10;K0+800,-4.8,1500,600&#10;..."></textarea>
  <div class="row">
    <button on:click={doImport}>导入并渲染</button>
    <button class="sec" on:click={loadSample}>载入示例</button>
    <button class="sec" on:click={() => fileInput.click()}>选择CSV文件</button>
    <input type="file" accept=".csv,.txt" bind:this={fileInput} on:change={onFile} hidden />
  </div>
  {#if msg}<p class="msg">{msg}</p>{/if}

  <h3>当前纵断面</h3>
  <p class="hint">连续下坡 {(totalLen / 1000).toFixed(2)} km,累计落差 {Math.abs(totalDrop).toFixed(0)} m</p>
  <table>
    <thead><tr><th>起点桩号</th><th>坡度%</th><th>坡长m</th><th>半径m</th></tr></thead>
    <tbody>
      {#each $profile as s}
        <tr class:steep={s.grade <= -5}>
          <td>{stakeText(s.stakeM)}</td><td>{s.grade}</td><td>{s.length}</td><td>{s.radius || '直线'}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .pane { padding: 10px; }
  h3 { margin: 8px 0 6px; font-size: 14px; color: #9fc3ff; }
  .hint { font-size: 12px; color: #8b95a5; margin: 4px 0 8px; line-height: 1.5; }
  textarea { width: 100%; box-sizing: border-box; background: #0f1622; color: #d5dde8; border: 1px solid #2a3648; border-radius: 6px; font-family: Consolas, monospace; font-size: 12px; padding: 6px; }
  .row { display: flex; gap: 6px; margin: 8px 0; flex-wrap: wrap; }
  button { background: #2563eb; color: #fff; border: 0; border-radius: 6px; padding: 6px 12px; cursor: pointer; font-size: 13px; }
  button.sec { background: #2a3648; }
  button:hover { filter: brightness(1.15); }
  .msg { font-size: 12px; color: #7ee2a8; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; }
  th, td { border-bottom: 1px solid #223047; padding: 4px 6px; text-align: right; }
  th { color: #8b95a5; font-weight: normal; }
  td:first-child, th:first-child { text-align: left; }
  tr.steep td { color: #ffb26b; }
</style>
