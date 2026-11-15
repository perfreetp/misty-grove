<script>
  import { store, setView, setRole, can, persist, ROLES, findDueTasks, downloadBackup, importAll, resetDemo, notify } from '../lib/store.svelte.js';
  import { todayISO } from '../lib/domain.js';
  import Icon from './Icon.svelte';
  import Modal from './Modal.svelte';

  const nav = [
    { key: 'registry', label: '检查登记', icon: 'registry', roles: ['coordinator', 'physician', 'nurse'] },
    { key: 'annotation', label: '图像标注', icon: 'annotate', roles: ['physician', 'nurse'] },
    { key: 'biopsy', label: '活检点位', icon: 'biopsy', roles: ['physician', 'nurse'] },
    { key: 'pathology', label: '病理回填', icon: 'pathology', roles: ['nurse', 'physician'] },
    { key: 'followup', label: '随访对比', icon: 'followup', roles: ['coordinator', 'physician'] },
    { key: 'stats', label: '统计', icon: 'stats', roles: ['physician', 'coordinator', 'nurse'] }
  ];

  const dueCount = $derived(findDueTasks().filter(t => t.days <= 7).length);
  let fileInput = $state(null);
  let showData = $state(false);

  async function onImport(e) {
    const el = e.currentTarget;
    const file = el?.files?.[0];
    if (!file) return;
    const text = await file.text();
    importAll(text);
    if (el) el.value = '';
    showData = false;
  }

  function confirmReset() {
    if (window.confirm('恢复演示数据将覆盖当前全部检查单，确定继续？')) {
      resetDemo();
      showData = false;
    }
  }
  const pendingPath = $derived(store.cases.filter(c => c.status === 'biopsy').length);
</script>

<aside class="side">
  <div class="brand">
    <div class="mark" aria-hidden="true">
      <svg viewBox="0 0 40 40" width="30" height="30">
        <circle cx="20" cy="20" r="17.2" fill="none" stroke="currentColor" stroke-width="1.1" opacity=".45"/>
        <circle cx="20" cy="20" r="8.2" fill="none" stroke="currentColor" stroke-width="1.6"/>
        <circle cx="20" cy="20" r="2.6" fill="currentColor" opacity=".85"/>
        <path d="M20 2.8v4.4M20 32.8v4.4M2.8 20h4.4M32.8 20h4.4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
        <path d="M20 20 28.2 9.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity=".8"/>
        <circle cx="28.2" cy="9.5" r="2.6" fill="#7bd8bf" stroke="none"/>
      </svg>
    </div>
    <div class="brand-txt">
      <strong>钟面</strong>
      <span>宫颈病灶随访系统</span>
    </div>
  </div>

  <nav>
    {#each nav as item}
      {#if item.roles.includes(store.role)}
        <button
          class="nav-item"
          class:on={store.view === item.key}
          onclick={() => setView(item.key)}
          title={item.label}
        >
          <span class="ni-icon"><Icon name={item.icon} size={17} /></span>
          <span class="ni-label">{item.label}</span>
          {#if item.key === 'followup' && dueCount}
            <span class="badge warn num">{dueCount}</span>
          {:else if item.key === 'pathology' && pendingPath}
            <span class="badge num">{pendingPath}</span>
          {/if}
        </button>
      {/if}
    {/each}
  </nav>

  <div class="side-foot">
    <div class="role-card">
      <span class="eyebrow">当前角色</span>
      <div class="role-select">
        <select class="select" bind:value={store.role} onchange={(e) => setRole(e.currentTarget.value)} aria-label="切换角色">
          {#each Object.values(ROLES) as r}
            <option value={r.key}>{r.label}</option>
          {/each}
        </select>
      </div>
      <p class="role-desc">{ROLES[store.role].desc}</p>
    </div>
    <div class="save-state">
      <span class="pulse" class:err={store.persistence === 'error'}></span>
      <span>{store.persistence === 'error' ? '仅内存保存' : '本地自动保存'}</span>
      <button class="data-btn" title="数据备份与恢复" aria-label="数据备份与恢复" onclick={() => (showData = true)}>
        <Icon name="save" size={12} />
      </button>
    </div>
  </div>
</aside>

<Modal
  open={showData}
  title="数据备份与恢复"
  subtitle="数据保存在本机浏览器中，建议定期下载备份"
  width={460}
  onclose={() => (showData = false)}
>
  <div class="data-rows">
    <button class="data-row" onclick={() => { downloadBackup(); showData = false; }}>
      <span class="dr-ico"><Icon name="download" size={15} /></span>
      <span class="dr-txt"><b>下载数据备份</b><em>导出全部检查单（含图像）为 JSON 文件</em></span>
    </button>
    <button class="data-row" onclick={() => fileInput?.click()}>
      <span class="dr-ico"><Icon name="upload" size={15} /></span>
      <span class="dr-txt"><b>导入备份文件</b><em>用备份覆盖当前全部检查单</em></span>
    </button>
    <button class="data-row danger" onclick={confirmReset}>
      <span class="dr-ico"><Icon name="rotate" size={15} /></span>
      <span class="dr-txt"><b>恢复演示数据</b><em>清空全部修改，回到初始 10 例示例病案</em></span>
    </button>
  </div>
  <p class="data-note">当前共 {store.cases.length} 条检查单；图像以压缩后 JPEG 内嵌，占用本地存储空间。</p>
  <input bind:this={fileInput} type="file" accept="application/json,.json" hidden onchange={onImport} />
</Modal>

<style>
  .side {
    background: #0f2420;
    color: #d8e6df;
    display: flex;
    flex-direction: column;
    padding: 18px 12px 14px;
    position: sticky;
    top: 0;
    height: 100vh;
    z-index: 20;
    border-right: 1px solid #17352e;
    background-image: radial-gradient(120% 60% at 15% 0%, rgba(43, 120, 104, .28), transparent 60%);
  }
  .brand { display: flex; align-items: center; gap: 9px; padding: 2px 6px 20px; color: #8fe0c8; }
  .mark { flex: none; display: grid; place-items: center; color: #6fd3b8; }
  .brand-txt { display: flex; flex-direction: column; line-height: 1.2; min-width: 0; }
  .brand-txt strong { font-size: 16px; color: #f0f7f2; letter-spacing: .08em; font-weight: 650; }
  .brand-txt span { font-size: 9.5px; color: #7fa295; letter-spacing: .1em; margin-top: 2px; }
  nav { display: flex; flex-direction: column; gap: 2px; flex: 1; }
  .nav-item {
    display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: 9px;
    border: 0; background: transparent; color: #a9c4b8; font-size: 13px; text-align: left;
    transition: background .14s, color .14s; position: relative;
  }
  .nav-item:hover { background: rgba(255, 255, 255, .055); color: #e7f2ec; }
  .nav-item.on { background: rgba(111, 211, 184, .14); color: #ffffff; font-weight: 600; }
  .nav-item.on::before {
    content: ""; position: absolute; left: -12px; top: 50%; transform: translateY(-50%);
    width: 3px; height: 18px; border-radius: 0 3px 3px 0; background: #6fd3b8;
  }
  .ni-icon { display: inline-flex; flex: none; opacity: .9; }
  .nav-item.on .ni-icon { color: #7ee0c3; }
  .ni-label { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .badge {
    font-size: 10px; min-width: 17px; height: 17px; padding: 0 5px; border-radius: 999px;
    background: rgba(255, 255, 255, .12); color: #d6e8df; display: inline-flex; align-items: center; justify-content: center;
  }
  .badge.warn { background: #d9a33a; color: #201503; }
  .side-foot { margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, .08); }
  .role-card { padding: 0 4px; }
  .role-card .eyebrow { color: #6f9186; font-size: 9px; }
  .role-select { margin-top: 6px; }
  .role-select .select {
    height: 32px; background-color: rgba(255, 255, 255, .07); border-color: rgba(255, 255, 255, .12);
    color: #eaf4ee; font-size: 12px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2390b0a4' stroke-width='2.4' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 10px center;
  }
  .role-select .select option { color: #152320; background: #fff; }
  .role-desc { font-size: 10.5px; color: #6f9186; margin-top: 6px; line-height: 1.4; }
  .save-state { display: flex; align-items: center; gap: 6px; font-size: 10px; color: #6b8c80; margin-top: 12px; padding: 0 4px; }
  .pulse { width: 5px; height: 5px; border-radius: 50%; background: #4fbf9f; box-shadow: 0 0 0 3px rgba(79, 191, 159, .14); }
  .pulse.err { background: #e0a83e; box-shadow: 0 0 0 3px rgba(224, 168, 62, .14); }
  .data-btn { margin-left: auto; border: 0; background: transparent; color: #6b8c80; padding: 2px; border-radius: 4px; display: inline-flex; }
  .data-btn:hover { color: #a9f0dc; background: rgba(255, 255, 255, .08); }
  .data-rows { display: flex; flex-direction: column; gap: 7px; }
  .data-row {
    display: flex; align-items: flex-start; gap: 10px; text-align: left; width: 100%;
    border: 1px solid var(--line); background: var(--panel-2); border-radius: 9px; padding: 10px 11px;
  }
  .data-row:hover { border-color: var(--accent); background: #f6fbf9; }
  .data-row.danger:hover { border-color: #e0a83e; background: #fffcf3; }
  .dr-ico { width: 26px; height: 26px; border-radius: 7px; background: var(--accent-soft); color: var(--accent-2); display: grid; place-items: center; flex: none; }
  .data-row.danger .dr-ico { background: #fdf3e2; color: var(--amber); }
  .dr-txt { display: flex; flex-direction: column; gap: 1px; }
  .dr-txt b { font-size: 12.5px; font-weight: 600; }
  .dr-txt em { font-style: normal; font-size: 11px; color: var(--ink-3); }
  .data-note { font-size: 10.5px; color: var(--ink-4); margin-top: 11px; line-height: 1.5; }

  @media (max-width: 1180px) {
    .side { padding: 14px 8px; align-items: center; }
    .brand-txt, .ni-label, .role-desc, .save-state span { display: none; }
    .brand { padding-bottom: 16px; }
    .nav-item { justify-content: center; padding: 10px; }
    .nav-item::before { display: none; }
    .badge { position: absolute; top: 2px; right: 2px; min-width: 14px; height: 14px; font-size: 9px; }
    .side-foot { width: 100%; }
    .role-select .select { padding: 0 6px; text-align: center; }
    .role-card .eyebrow { display: none; }
  }
  @media (max-width: 760px) {
    .side {
      height: auto; position: sticky; top: 0; flex-direction: row; align-items: center;
      gap: 6px; padding: 8px 10px; overflow-x: auto; min-width: 0;
    }
    .brand { padding: 0 6px 0 0; }
    .brand-txt { display: flex; }
    .brand-txt span { display: none; }
    nav { flex-direction: row; gap: 2px; }
    .nav-item { padding: 8px; }
    .ni-label { display: none; }
    .side-foot { display: none; }
  }
</style>
