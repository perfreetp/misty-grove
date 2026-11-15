<script>
  import TerrainView from './lib/TerrainView.svelte';
  import ProfileImport from './lib/ProfileImport.svelte';
  import RampPanel from './lib/RampPanel.svelte';
  import StatsPanel from './lib/StatsPanel.svelte';
  import ExportPanel from './lib/ExportPanel.svelte';
  import ProfileChart from './lib/ProfileChart.svelte';
  import { ramps, results, addMode, resetAll } from './lib/store.js';

  let tab = 'ramps';
  const tabs = [
    { k: 'profile', t: '纵断面' },
    { k: 'ramps', t: '避险车道' },
    { k: 'stats', t: '统计与修订' },
    { k: 'export', t: '导出论证表' }
  ];

  $: badCount = $ramps.filter(r => ($results[r.id]?.errors.length || 0) > 0).length;
</script>

<div class="app">
  <header>
    <h1>山区高速公路长下坡避险车道选址与制动床验算系统</h1>
    <div class="meta">
      {#if badCount}<span class="warn">⚠ {badCount} 处标红待处理</span>{/if}
      <button class="reset" on:click={() => confirm('清空全部方案并恢复示例纵断面?') && resetAll()}>重置</button>
    </div>
  </header>

  <div class="main">
    <aside>
      <nav>
        {#each tabs as t}
          <button class:on={tab === t.k} on:click={() => tab = t.k}>{t.t}</button>
        {/each}
      </nav>
      <div class="panel">
        {#if tab === 'profile'}<ProfileImport />
        {:else if tab === 'ramps'}<RampPanel />
        {:else if tab === 'stats'}<StatsPanel />
        {:else}<ExportPanel />{/if}
      </div>
    </aside>

    <section class="view">
      <div class="canvas-wrap">
        <TerrainView />
        {#if $addMode}
          <div class="tip">布设模式: 在主线上点击放置避险车道引道口</div>
        {/if}
        <div class="legend">
          <span><i style="background:#f59e0b"></i>拟定</span>
          <span><i style="background:#3b82f6"></i>联审中</span>
          <span><i style="background:#22c55e"></i>已批复</span>
          <span><i style="background:#9ca3af"></i>已建成</span>
          <span><i style="background:#ef4444"></i>验算不合格</span>
        </div>
      </div>
      <ProfileChart />
    </section>
  </div>
</div>

<style>
  .app { display: flex; flex-direction: column; height: 100vh; }
  header { display: flex; align-items: center; justify-content: space-between; padding: 8px 14px; background: #0d1420; border-bottom: 1px solid #223047; }
  h1 { font-size: 16px; margin: 0; color: #d7e5f8; font-weight: 600; }
  .meta { display: flex; align-items: center; gap: 10px; }
  .warn { color: #ffb3b3; font-size: 13px; }
  .reset { background: #2a3648; color: #c6d2e2; border: 0; border-radius: 6px; padding: 4px 10px; cursor: pointer; font-size: 12px; }
  .main { flex: 1; display: flex; min-height: 0; }
  aside { width: 380px; min-width: 380px; display: flex; flex-direction: column; background: #0f1622; border-right: 1px solid #223047; }
  nav { display: flex; }
  nav button { flex: 1; background: #0f1622; color: #8b95a5; border: 0; border-bottom: 2px solid transparent; padding: 9px 4px; cursor: pointer; font-size: 13px; }
  nav button.on { color: #fff; border-bottom-color: #3b82f6; background: #131c2b; }
  .panel { flex: 1; overflow-y: auto; }
  .view { flex: 1; display: flex; flex-direction: column; min-width: 0; }
  .canvas-wrap { position: relative; flex: 1; min-height: 0; }
  .tip { position: absolute; top: 10px; left: 50%; transform: translateX(-50%); background: #b45309; color: #fff; font-size: 13px; padding: 6px 14px; border-radius: 6px; pointer-events: none; }
  .legend { position: absolute; left: 10px; bottom: 10px; display: flex; gap: 12px; background: rgba(10,16,24,0.75); padding: 6px 10px; border-radius: 6px; font-size: 12px; color: #c6d2e2; }
  .legend i { display: inline-block; width: 10px; height: 10px; border-radius: 2px; margin-right: 4px; }
</style>
