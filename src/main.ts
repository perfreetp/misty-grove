// 应用入口：顶栏（角色切换 + 视图导航）、简易哈希路由、全局订阅重渲染

import './styles.css';
import { store } from './storage/store';
import type { Role } from './types';
import { ROLE_LABEL } from './types';
import { h, clear, toast } from './utils/dom';
import { renderCaseList } from './views/caseList';
import { renderDiscussion } from './views/discussion';
import { renderTechnician } from './views/technician';
import { renderStats } from './views/stats';
import { teardownCaseView, showCaseView } from './views/caseView';

type Tab = 'cases' | 'discussion' | 'technician' | 'stats';

const TABS: { id: Tab; label: string; roles: Role[] }[] = [
  { id: 'cases', label: '病例工作台', roles: ['endoscopist', 'technician', 'reviewer'] },
  { id: 'discussion', label: '待讨论列表', roles: ['reviewer', 'endoscopist'] },
  { id: 'technician', label: '技师维护', roles: ['technician'] },
  { id: 'stats', label: '统计分析', roles: ['reviewer', 'technician', 'endoscopist'] },
];

let currentTab: Tab = 'cases';

function shell(): void {
  const app = document.getElementById('app')!;
  clear(app);
  const roleSel = h('select', {
    onchange: (e: Event) => {
      store.setRole((e.target as HTMLSelectElement).value as Role);
      // 技师角色不在病例工作区时自动跳到维护页
      if (store.state.role === 'technician' && currentTab === 'discussion') currentTab = 'technician';
      route();
    },
  },
    ...(Object.keys(ROLE_LABEL) as Role[]).map((r) => {
      const opt = h('option', { value: r }, ROLE_LABEL[r]);
      if (store.state.role === r) opt.selected = true;
      return opt;
    }),
  );

  const nav = h('nav', { class: 'nav-tabs' },
    ...TABS.filter((t) => t.roles.includes(store.state.role)).map((t) =>
      h('button', {
        class: `nav-tab ${currentTab === t.id ? 'active' : ''}`,
        onclick: () => {
          currentTab = t.id;
          teardownCaseView();
          store.setCurrentCase(null);
          location.hash = t.id;
          route();
        },
      }, t.label),
    ),
  );

  app.append(
    h('header', { class: 'topbar' },
      h('div', { class: 'brand' }, 'ESD 边界增强与术前讨论系统', h('small', {}, 'WebGL2 · 本地存储')),
      nav,
      h('div', { class: 'role-switch' }, h('label', {}, '当前角色'), roleSel),
    ),
    h('main', { class: 'page', id: 'view-root' }),
    h('div', { id: 'toast-root' }),
  );
}

function route(): void {
  shell();
  const root = document.getElementById('view-root')!;
  const hash = (location.hash.replace('#', '') || currentTab) as Tab;
  if (store.state.currentCaseId && (hash === 'cases' || !hash)) {
    showCaseView(store.state.currentCaseId);
    return;
  }
  switch (hash) {
    case 'discussion':
      currentTab = 'discussion';
      renderDiscussion(root);
      break;
    case 'technician':
      currentTab = store.state.role === 'technician' ? 'technician' : currentTab;
      if (store.state.role === 'technician') renderTechnician(root);
      else renderCaseList(root);
      break;
    case 'stats':
      currentTab = 'stats';
      renderStats(root);
      break;
    case 'cases':
    default:
      currentTab = 'cases';
      renderCaseList(root);
      break;
  }
}

window.addEventListener('hashchange', () => {
  teardownCaseView();
  route();
});

// 全局数据变化时重渲染当前视图（标注拖拽等高频更新由组件自行处理，不经过 emit）
store.subscribe(() => {
  if (document.getElementById('view-root')) route();
});

async function boot(): Promise<void> {
  try {
    await store.init();
    const hash = location.hash.replace('#', '') as Tab;
    if (hash && TABS.some((t) => t.id === hash)) currentTab = hash;
    route();
  } catch (err) {
    const app = document.getElementById('app')!;
    app.append(h('div', { class: 'page' }, h('div', { class: 'warn-box' }, `初始化失败：${(err as Error).message}。请使用支持 WebGL2 与 IndexedDB 的现代浏览器。`)));
    toast((err as Error).message, 'error');
  }
}

void boot();
