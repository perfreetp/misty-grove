/* BoardDocs Studio — 应用入口与路由 */
import { U } from './util.js';
import { store, USERS, GROUPS, boardStats, findConflicts, statusText } from './store.js';
import { renderBoards } from './views/boards.js';
import { renderEditor } from './views/editor.js';
import { renderReviews } from './views/review.js';
import { renderPublished } from './views/published.js';
import { renderStats } from './views/stats.js';

store.load();

const app = {
  route: { name: 'boards', boardId: null },
  cleanup: null,
  previewClose: null,
};
window.app = app;

/* ============================================================
   路由
   ============================================================ */
function parseHash() {
  const h = (location.hash || '#/boards').replace(/^#+\/?/, '');
  const parts = h.split('/').filter(Boolean);
  if (!parts.length) return { name: 'boards', boardId: null, arg: null };
  const [name, arg, sub] = parts;
  if (name === 'board' && arg) return { name: sub || 'editor', boardId: arg, arg };
  return { name, boardId: null, arg: arg || null };
}

function nav(path) {
  const h = '#' + (String(path).startsWith('#') ? String(path).slice(1) : String(path));
  if (location.hash === h) render();
  else location.hash = h;
}

function render() {
  app.route = parseHash();
  if (app.cleanup) {
    try { app.cleanup(); } catch (e) { console.error(e); }
    app.cleanup = null;
  }
  if (app.previewClose) {
    try { app.previewClose(); } catch (e) { console.error(e); }
    app.previewClose = null;
  }
  const ws = document.getElementById('workspace');
  U.clear(ws);
  const inspector = document.getElementById('inspector');
  inspector.hidden = true;
  U.clear(inspector);
  const r = app.route;
  let out = null;
  try {
    if (r.name === 'editor') {
      const board = store.board(r.boardId);
      if (!board) return nav('#/boards');
      out = renderEditor({ host: ws, board, app, nav });
    } else if (r.name === 'review') {
      out = renderReviews({ host: ws, app, nav, reviewId: r.arg });
    } else if (r.name === 'published') {
      out = renderPublished({ host: ws, app, nav, versionId: r.arg });
    } else if (r.name === 'stats') {
      out = renderStats({ host: ws, app, nav });
    } else {
      out = renderBoards({ host: ws, app, nav });
    }
  } catch (e) {
    console.error(e);
    ws.appendChild(U.h('div', { class: 'page' }, U.h('div', { class: 'empty' }, U.h('b', {}, '页面渲染出错'), String(e.message))));
  }
  app.rerender = render;
  app.rerender = render;
  if (out && out.cleanup) app.cleanup = out.cleanup;
  syncChrome();
}

/* ============================================================
   顶栏 / 侧栏
   ============================================================ */
function syncChrome() {
  const r = app.route;
  const board = r.boardId ? store.board(r.boardId) : null;
  const label = { boards: '开发板型号', editor: '装配与引脚编辑', review: '评审', published: '发布版本', stats: '统计' }[r.name] || '型号';
  const crumbs = document.getElementById('crumbs');
  U.clear(crumbs);
  crumbs.appendChild(U.h('span', {}, '工作台'));
  crumbs.appendChild(U.h('span', { class: 'sep' }, '/'));
  crumbs.appendChild(U.h('span', { class: board ? '' : 'here' }, label));
  if (board) {
    crumbs.appendChild(U.h('span', { class: 'sep' }, '/'));
    crumbs.appendChild(U.h('span', { class: 'here' }, board.name));
    if (r.name === 'editor') {
      crumbs.appendChild(U.h('span', { class: 'sep' }, '/'));
      crumbs.appendChild(U.h('span', { class: 'tag ' + statusTag(board) }, statusText(board)));
    }
  }
  document.querySelectorAll('#rail button').forEach((b) => {
    const rt = b.dataset.route;
    const active =
      rt === r.name ||
      (rt === 'editor' && r.name === 'editor') ||
      (rt === 'review' && r.name === 'review') ||
      (rt === 'published' && r.name === 'published');
    b.classList.toggle('active', active);
  });
  // review pending badge
  const rail = document.getElementById('rail');
  rail.querySelectorAll('.dot').forEach((d) => d.remove());
  const pending = store.openReviews().length;
  if (pending) {
    const b = rail.querySelector('[data-route="review"]');
    if (b) b.appendChild(U.h('span', { class: 'dot' }));
  }
  // user chip
  const userEl = document.getElementById('current-user');
  U.clear(userEl);
  const sel = U.h(
    'select',
    {
      title: '切换当前用户（用于演示评审权限）',
      style: { width: 'auto', padding: '3px 6px', fontSize: '11.5px', borderRadius: '6px' },
      onchange: (e) => { store.setUser(e.target.value); render(); U.toast('已切换为 ' + store.currentUser().name + '（' + store.currentUser().role + '）'); },
    },
    USERS.map((u) => U.h('option', { value: u.id, selected: u.id === store.currentUser().id }, `${u.name} · ${u.role}`))
  );
  userEl.appendChild(sel);
  // gl badge
  const badge = document.getElementById('gl-badge');
  const ok = !!document.createElement('canvas').getContext('webgl2');
  badge.textContent = ok ? 'WebGL2 ✓' : 'WebGL2 不可用';
  badge.className = 'chip ' + (ok ? 'ok' : 'warn');
}

function statusTag(board) {
  const s = board.work?.status;
  if (s === 'in_review') return 'blue';
  if (s === 'rejected') return 'red';
  if (s === 'approved') return 'green';
  if (!board.work) return board.versions?.length ? 'violet' : 'amber';
  return 'amber';
}

/* ============================================================
   全局命令
   ============================================================ */
document.getElementById('rail').addEventListener('click', (e) => {
  const b = e.target.closest('button[data-route]');
  if (!b) return;
  const rt = b.dataset.route;
  if (rt === 'editor') {
    const id = app.route.boardId || store.boards()[0]?.id;
    if (id) nav(`#/board/${id}/editor`);
    else nav('#/boards');
    return;
  }
  if (rt === 'review') {
    const open = store.openReviews();
    nav(open.length ? '#/review/' + open[0].review.id : '#/review');
    return;
  }
  nav('#/' + rt);
});

document.querySelector('.topbar-right .menu').addEventListener('click', (e) => {
  const cmd = e.target.closest('[data-cmd]')?.dataset.cmd;
  if (!cmd) return;
  e.target.closest('details')?.removeAttribute('open');
  if (cmd === 'save') {
    store.touch('manual-save');
    U.toast('已保存到浏览器本地');
  } else if (cmd === 'export-json') {
    U.download('boarddocs-backup.json', JSON.stringify(rawState(), null, 2), 'application/json');
    U.toast('已导出 JSON 备份');
  } else if (cmd === 'reset-demo') {
    U.confirm('重置演示数据', '将清空本地所有编辑内容并恢复演示数据，此操作不可撤销。', '重置', () => {
      store.resetDemo();
      nav('#/boards');
      render();
      U.toast('已恢复演示数据');
    }, true);
  }
});

document.getElementById('import-json').addEventListener('change', async (e) => {
  const f = e.target.files?.[0];
  e.target.value = '';
  if (!f) return;
  try {
    const text = await f.text();
    const parsed = JSON.parse(text);
    if (!parsed || !Array.isArray(parsed.boards)) throw new Error('文件结构不支持');
    store.importState(parsed);
    nav('#/boards');
    render();
    U.toast('导入成功，共 ' + parsed.boards.length + ' 个型号');
  } catch (err) {
    U.toast('导入失败：' + err.message, 'err');
  }
});

function rawState() {
  return store.raw();
}

window.addEventListener('hashchange', render);
store.subscribe(() => {
  // 顶栏状态轻量刷新（列表/页面自身通过局部渲染更新）
  syncChrome();
});

window.addEventListener('keydown', (e) => {
  if (e.target.matches('input, textarea, select')) return;
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
    e.preventDefault();
    store.touch('manual-save');
    U.toast('已保存');
  }
});

render();
