<script>
  import { onMount } from 'svelte';
  import { initStore, getState, setOperator } from './lib/store.svelte.js';
  import { ROLES } from './lib/constants.js';
  import PatientsView from './views/PatientsView.svelte';
  import WorkspaceView from './views/WorkspaceView.svelte';
  import TasksView from './views/TasksView.svelte';
  import ReviewView from './views/ReviewView.svelte';
  import SettingsView from './views/SettingsView.svelte';
  import StatsView from './views/StatsView.svelte';
  import LogsView from './views/LogsView.svelte';

  const s = getState();
  let view = $state('patients');
  let navPatientId = $state(null);
  let navTaskId = $state(null);

  onMount(initStore);

  const NAV = [
    { id: 'patients', label: '患者与痣图', icon: '👤' },
    { id: 'tasks', label: '随访任务', icon: '🔁' },
    { id: 'review', label: '主任待审', icon: '✅' },
    { id: 'stats', label: '统计分析', icon: '📊' },
    { id: 'settings', label: '规则维护', icon: '⚙️' },
    { id: 'logs', label: '操作日志', icon: '📝' }
  ];

  function openWorkspace(patientId) {
    navPatientId = patientId;
    view = 'workspace';
  }
  function openTask(taskId) {
    navTaskId = taskId;
    view = 'tasks';
  }
  function switchRole(ev) {
    const [role, name] = ev.target.value.split('|');
    setOperator(name, role);
  }
  const roleAccounts = [
    ['physician', '张医生'],
    ['physician', '李医生'],
    ['tech', '王技师'],
    ['director', '陈主任']
  ];
</script>

{#if !s.ready}
  <div style="padding:60px;text-align:center" class="muted">正在加载本地数据库…</div>
{:else}
  <div class="shell">
    <aside>
      <div class="brand">
        <div class="logo">◆</div>
        <div>
          <div class="brand-name">三维痣图随访</div>
          <div class="small muted">MoleMap 3D · 本地版</div>
        </div>
      </div>
      <nav>
        {#each NAV as item (item.id)}
          <button
            class="nav-item"
            class:active={view === item.id || (item.id === 'patients' && view === 'workspace')}
            onclick={() => (view = item.id)}
          >
            <span>{item.icon}</span>{item.label}
          </button>
        {/each}
      </nav>
      <div class="operator card">
        <div class="small muted">当前操作人</div>
        <select value="{s.operator.role}|{s.operator.name}" onchange={switchRole}>
          {#each roleAccounts as [role, name]}
            <option value="{role}|{name}" selected={s.operator.name === name && s.operator.role === role}>
              {ROLES.find((r) => r.id === role).name} · {name}
            </option>
          {/each}
        </select>
        <div class="small muted" style="margin-top:8px;line-height:1.6">
          数据全部保存在本浏览器 IndexedDB，不上传服务器。
        </div>
      </div>
    </aside>

    <main>
      {#key view}
        {#if view === 'patients'}
          <PatientsView onopen={openWorkspace} />
        {:else if view === 'workspace'}
          <WorkspaceView patientId={navPatientId} onback={() => (view = 'patients')} onopenTask={openTask} />
        {:else if view === 'tasks'}
          <TasksView focusTaskId={navTaskId} clearFocus={() => (navTaskId = null)} onopenPatient={openWorkspace} />
        {:else if view === 'review'}
          <ReviewView onopenTask={openTask} />
        {:else if view === 'settings'}
          <SettingsView />
        {:else if view === 'stats'}
          <StatsView />
        {:else if view === 'logs'}
          <LogsView />
        {/if}
      {/key}
    </main>
  </div>
{/if}

<style>
  .shell { display: flex; height: 100vh; }
  aside {
    width: 232px; flex: none; background: var(--panel);
    border-right: 1px solid var(--border); padding: 18px 14px;
    display: flex; flex-direction: column; gap: 18px;
  }
  .brand { display: flex; gap: 10px; align-items: center; padding: 0 6px; }
  .logo {
    width: 38px; height: 38px; border-radius: 10px;
    background: linear-gradient(135deg, var(--primary), var(--purple));
    display: grid; place-items: center; font-size: 18px; color: #fff;
  }
  .brand-name { font-weight: 700; }
  nav { display: flex; flex-direction: column; gap: 4px; }
  .nav-item {
    text-align: left; background: transparent; border: 1px solid transparent;
    border-radius: 9px; padding: 9px 12px; color: var(--muted);
    display: flex; gap: 9px; align-items: center;
  }
  .nav-item:hover { color: var(--text); background: var(--panel-2); }
  .nav-item.active { color: #fff; background: rgba(79, 140, 255, 0.18); border-color: var(--primary); }
  .operator { margin-top: auto; padding: 12px; }
  main { flex: 1; min-width: 0; overflow: auto; padding: 22px 26px; }
</style>
