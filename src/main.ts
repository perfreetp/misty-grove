import './styles/base.css';
import './styles/views.css';
import { APP_NAME, APP_SUBTITLE, FINDING_META, STATUS_META, USERS, VIEW_META } from './constants';
import { store } from './store';
import type { Exam, ExamStatus, User, ViewKey } from './types';
import { formatWhen, initials } from './utils';
import { bindActions, closeAllModals, html, icon, openModal, raw, setHtml, toast } from './ui';
import { createReadingView } from './views/reading';
import { createLesionsView } from './views/lesions';
import { createReportView } from './views/report';
import { createRegistryView } from './views/registry';
import { createStatsView } from './views/stats';
import type { ViewInstance } from './views/types';

const app = document.getElementById('app')!;

const DEFAULT_VIEW_BY_ROLE: Record<User['role'], ViewKey> = {
  technician: 'registry',
  reader: 'reading',
  reviewer: 'report',
};

interface ShellRefs {
  nav: HTMLElement;
  sidebarList: HTMLElement;
  sidebarCount: HTMLElement;
  main: HTMLElement;
  filterBar: HTMLElement;
  searchInput: HTMLInputElement;
}

let refs: ShellRefs | null = null;
let currentView: ViewInstance | null = null;
let mountedKey = '';
const viewFactories = new Map<ViewKey, () => ViewInstance>();
const handlers: Record<string, (target: HTMLElement, ev: Event) => void> = {};

function userTag(user: User): string {
  return user.role === 'technician' ? '技师' : user.role === 'reader' ? '阅片医师' : '审核医师';
}

function roleHint(user: User): string {
  return user.role === 'technician'
    ? '当前身份：登记检查单并导入图像序列'
    : user.role === 'reader'
      ? '当前身份：阅片、标注病灶并提交结论'
      : '当前身份：审核、退回与发布报告';
}

function shellHtml(): string {
  const state = store.state;
  const user = store.currentUser();
  const pendingCount = state.exams.filter((e) => e.status === 'pending' || e.status === 'reading').length;
  const reviewCount = state.exams.filter((e) => e.status === 'review').length;
  return String(html`
    <header class="topbar">
      <div class="brand">
        <div class="brand-mark">${icon('sparkle')}</div>
        <div class="brand-text">
          <div class="brand-name">${APP_NAME}</div>
          <div class="brand-sub">${APP_SUBTITLE}</div>
        </div>
      </div>
      <nav class="nav" id="nav" aria-label="主模块">
        ${(Object.keys(VIEW_META) as ViewKey[]).map((key) => {
          const meta = VIEW_META[key];
          const badge =
            key === 'reading' && pendingCount > 0
              ? html`<span class="nav-badge">${pendingCount}</span>`
              : key === 'report' && reviewCount > 0
                ? html`<span class="nav-badge amber">${reviewCount}</span>`
                : '';
          return html`<button class="nav-btn ${state.view === key ? 'active' : ''}" data-view="${key}" title="${meta.hint}" aria-label="${meta.label}" ${state.view === key ? raw('aria-current="page"') : ''}>
            ${icon(meta.icon)}<span>${meta.label}</span>${badge}
          </button>`;
        })}
      </nav>
      <div class="spacer"></div>
      <div class="topbar-meta">
        <span class="live-dot">本地存储 · 自动保存</span>
      </div>
      <div class="user-switch" id="userBox" title="${roleHint(user)}">
        <div class="avatar ${user.role === 'technician' ? 'tech' : user.role === 'reviewer' ? 'reviewer' : ''}">${initials(user.name)}</div>
        <select class="user-select" id="userSelect" aria-label="切换当前身份">
          ${state.users.map(
            (u) => html`<option value="${u.id}" ${u.id === user.id ? raw('selected') : ''}>${u.name} · ${userTag(u)}</option>`,
          )}
        </select>
      </div>
    </header>
    <div class="workspace">
      <aside class="sidebar">
        <div class="sidebar-head">
          <span class="sidebar-title">检查单</span>
          <span class="count-pill" id="sidebarCount">${state.exams.length}</span>
        </div>
        <div class="filter-bar" id="filterBar"></div>
        <div class="search-wrap">
          ${icon('search')}
          <input class="search-input" id="searchInput" type="search" placeholder="搜索姓名 / 检查号 / 适应证" value="${state.filter.query}" autocomplete="off" />
        </div>
        <div class="exam-list" id="examList"></div>
        <div class="sidebar-foot">
          <span>${state.storageError ? '存储异常' : 'IndexedDB 已持久化'}</span>
          <button class="btn ghost sm" data-act="reset-demo" title="恢复演示数据">${icon('refresh')}重置演示</button>
        </div>
      </aside>
      <main class="main" id="main"></main>
    </div>
  `);
}

function renderFilterBar(): string {
  const state = store.state;
  const counts = new Map<ExamStatus, number>();
  for (const e of state.exams) counts.set(e.status, (counts.get(e.status) ?? 0) + 1);
  const items: { key: ExamStatus | 'all'; label: string; count: number }[] = [
    { key: 'all', label: '全部', count: state.exams.length },
    ...(Object.keys(STATUS_META) as ExamStatus[])
      .filter((s) => s !== 'reading')
      .map((s) => ({ key: s, label: STATUS_META[s].label, count: (counts.get(s) ?? 0) + (s === 'pending' ? (counts.get('reading') ?? 0) : 0) })),
  ];
  return items
    .map(
      (it) =>
        `<button class="chip ${state.filter.status === it.key ? 'active' : ''}" data-filter="${it.key}">${STATUS_META[it.key as ExamStatus]?.label ?? it.label} <span class="mono" style="opacity:.55">${it.count}</span></button>`,
    )
    .join('');
}

function examCardHtml(exam: Exam): string {
  const meta = STATUS_META[exam.status];
  const dots = exam.findings
    .slice(0, 7)
    .map((f) => `<span class="finding-dot" style="background:${FINDING_META[f.type].color}" title="${FINDING_META[f.type].label}"></span>`)
    .join('');
  const readerNames = exam.readers.map((id) => exam.readerNames[id] ?? id).join(' / ');
  return String(html`
    <button class="exam-card ${store.state.selectedExamId === exam.id ? 'active' : ''}" data-exam="${exam.id}">
      <div class="exam-card-top">
        <span class="exam-code">${exam.code}</span>
        <span class="status-badge ${meta.tone}">${meta.label}</span>
      </div>
      <div class="exam-name">${exam.patientName} <span class="meta">${exam.patientSex} · ${exam.patientAge} 岁</span></div>
      <div class="exam-indication">${exam.indication}</div>
      <div class="exam-foot">
        <span>${readerNames || '未指派'}${exam.dualReading ? ' · 双阅' : ''}</span>
        <span>${formatWhen(exam.registeredAt)}</span>
        <span class="finding-dots">${raw(dots)}</span>
      </div>
    </button>
  `);
}

function filteredExams(): Exam[] {
  const { filter } = store.state;
  const q = filter.query.trim().toLowerCase();
  return store.state.exams.filter((e) => {
    if (filter.status !== 'all') {
      if (filter.status === 'pending') {
        if (e.status !== 'pending' && e.status !== 'reading') return false;
      } else if (e.status !== filter.status) return false;
    }
    if (filter.reader !== 'all' && !e.readers.includes(filter.reader)) return false;
    if (!q) return true;
    return e.patientName.toLowerCase().includes(q) || e.code.toLowerCase().includes(q) || e.indication.toLowerCase().includes(q);
  });
}

function renderSidebar(): void {
  if (!refs) return;
  const list = filteredExams();
  refs.sidebarCount.textContent = `${list.length}/${store.state.exams.length}`;
  setHtml(refs.filterBar, renderFilterBar());
  setHtml(
    refs.sidebarList,
    list.length === 0
      ? html`<div class="empty">
          <div class="empty-title">没有匹配的检查单</div>
          <div class="empty-sub">调整筛选条件，或到「登记导入」新建检查单。</div>
        </div>`
      : html`${list.map((e) => raw(examCardHtml(e)))}`,
  );
}

function renderNav(): void {
  document.querySelectorAll<HTMLElement>('#nav .nav-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.view === store.state.view);
  });
  const pendingCount = store.state.exams.filter((e) => e.status === 'pending' || e.status === 'reading').length;
  const reviewCount = store.state.exams.filter((e) => e.status === 'review').length;
  document.querySelectorAll<HTMLElement>('#nav .nav-btn').forEach((btn) => {
    const key = btn.dataset.view;
    const want = key === 'reading' && pendingCount > 0 ? pendingCount : key === 'report' && reviewCount > 0 ? reviewCount : null;
    let badge = btn.querySelector('.nav-badge');
    if (want === null) {
      badge?.remove();
      return;
    }
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'nav-badge';
      btn.appendChild(badge);
    }
    badge.textContent = String(want);
    badge.classList.toggle('amber', key === 'report');
  });
}

function renderUser(): void {
  const user = store.currentUser();
  const box = document.getElementById('userBox');
  const select = box?.querySelector<HTMLSelectElement>('#userSelect');
  const avatar = box?.querySelector('.avatar');
  if (select && select.value !== user.id) select.value = user.id;
  if (avatar) {
    avatar.className = `avatar ${user.role === 'technician' ? 'tech' : user.role === 'reviewer' ? 'reviewer' : ''}`;
    avatar.textContent = initials(user.name);
  }
  if (box) box.title = roleHint(user);
}

function mountView(): void {
  const exam = store.selectedExam();
  const key = `${store.state.view}:${exam?.id ?? 'none'}`;
  if (currentView && mountedKey === key) {
    currentView.update();
    return;
  }
  currentView?.destroy();
  currentView = null;
  mountedKey = key;
  const main = refs!.main;
  main.innerHTML = '';
  const factory = viewFactories.get(store.state.view);
  if (!factory) {
    main.innerHTML = String(html`<div class="empty"><div class="empty-title">模块未注册</div></div>`);
    return;
  }
  // Each mount gets a brand-new wrapper so delegated listeners from the previous
  // view instance die with their DOM node instead of stacking up on #main.
  const host = document.createElement('div');
  host.className = 'view-root';
  host.style.height = '100%';
  host.style.minHeight = '0';
  host.style.display = 'flex';
  host.style.flexDirection = 'column';
  main.appendChild(host);
  currentView = factory();
  currentView.mount(host);
}

function renderAll(): void {
  if (!refs) return;
  renderNav();
  renderUser();
  renderSidebar();
  mountView();
}

function switchView(view: ViewKey): void {
  closeAllModals();
  if (store.state.view === view) {
    store.stopPlay();
    return;
  }
  store.stopPlay();
  store.setView(view);
  store.setState({ activeFindingId: null, findingDraft: null });
}

function onUserChange(id: string): void {
  store.stopPlay();
  store.setUser(id);
  const user = store.state.users.find((u) => u.id === id);
  if (user) {
    switchView(DEFAULT_VIEW_BY_ROLE[user.role]);
    toast(`已切换为 ${user.name} · ${user.title}`, 'info', 2400);
  }
}

function bindShell(): void {
  if (!refs) return;
  const r = refs;
  r.nav.addEventListener('click', (ev) => {
    const btn = (ev.target as HTMLElement).closest<HTMLElement>('[data-view]');
    if (btn?.dataset.view) switchView(btn.dataset.view as ViewKey);
  });
  r.filterBar.addEventListener('click', (ev) => {
    const chip = (ev.target as HTMLElement).closest<HTMLElement>('[data-filter]');
    if (chip?.dataset.filter) store.setFilter({ status: chip.dataset.filter as ExamStatus | 'all' });
  });
  r.sidebarList.addEventListener('click', (ev) => {
    const card = (ev.target as HTMLElement).closest<HTMLElement>('[data-exam]');
    if (!card?.dataset.exam) return;
    if (store.state.selectedExamId === card.dataset.exam) return;
    closeAllModals();
    store.stopPlay();
    store.selectExam(card.dataset.exam);
  });
  r.searchInput.addEventListener('input', () => store.setFilter({ query: r.searchInput.value }));
  r.searchInput.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') {
      r.searchInput.value = '';
      store.setFilter({ query: '' });
    }
  });
  document.getElementById('userSelect')?.addEventListener('change', (ev) => {
    onUserChange((ev.target as HTMLSelectElement).value);
  });
  bindActions(document.body, handlers);
}

handlers['reset-demo'] = () => {
  openModal({
    title: '重置演示数据',
    subtitle: '将清空浏览器内的检查单、报告、标注与统计记录，并重新写入演示数据。',
    body: String(html`<div class="notice warn">${icon('alert')}<div>该操作不可撤销。</div></div>`),
    footer: String(html`<button class="btn" data-close>取消</button><button class="btn danger" data-confirm>确认重置</button>`),
    onMount: (root, close) => {
      root.querySelector('[data-confirm]')?.addEventListener('click', async () => {
        close();
        await store.resetAll();
        currentView?.destroy();
        currentView = null;
        mountedKey = '';
        lastShellSignature = '';
        renderAll();
        toast('演示数据已重置', 'ok');
      });
    },
  });
};

// The shell only needs repainting when what it shows changes. Store emits on
// every frame tick, so gate the chrome work behind a cheap signature.
function shellSignature(): string {
  const state = store.state;
  return JSON.stringify([
    state.view,
    state.selectedExamId,
    state.currentUserId,
    state.filter,
    state.exams.map((e) => [e.id, e.status, e.updatedAt, e.findings.length, e.readerNames && Object.keys(e.readerNames).length]),
    state.exams.length,
  ]);
}

let lastShellSignature = '';

function onStoreChange(): void {
  const sig = shellSignature();
  if (sig !== lastShellSignature) {
    lastShellSignature = sig;
    renderNav();
    renderUser();
    renderSidebar();
  }
  mountView();
}

async function boot(): Promise<void> {
  app.innerHTML = String(html`
    <div class="boot-screen">
      <div class="boot-mark">${icon('sparkle')}</div>
      <div class="boot-text">正在加载胶囊内镜工作台…</div>
      <div class="boot-bar"><span></span></div>
    </div>
  `);
  await store.init(USERS, 'u-read1');
  app.innerHTML = shellHtml();
  refs = {
    nav: document.getElementById('nav')!,
    sidebarList: document.getElementById('examList')!,
    sidebarCount: document.getElementById('sidebarCount')!,
    main: document.getElementById('main')!,
    filterBar: document.getElementById('filterBar')!,
    searchInput: document.getElementById('searchInput') as HTMLInputElement,
  };
  viewFactories.set('registry', () => createRegistryView());
  viewFactories.set('reading', () => createReadingView());
  viewFactories.set('lesions', () => createLesionsView());
  viewFactories.set('report', () => createReportView());
  viewFactories.set('stats', () => createStatsView());
  bindShell();
  (window as unknown as { __capsule?: unknown }).__capsule = store;
  store.setView(DEFAULT_VIEW_BY_ROLE[store.currentUser().role] ?? 'reading');
  lastShellSignature = shellSignature();
  renderAll();
  store.subscribe(onStoreChange);
  if (store.state.storageError) toast(`浏览器存储不可用：${store.state.storageError}`, 'err', 7000);
}

void boot();
