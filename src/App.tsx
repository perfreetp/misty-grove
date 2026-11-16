import { useEffect, useState } from 'react';
import { BatchesPage } from './pages/BatchesPage';
import { BatchDetailPage } from './pages/BatchDetailPage';
import { WorkbenchPage } from './pages/WorkbenchPage';
import { DashboardPage } from './pages/DashboardPage';
import { SettingsPage } from './pages/SettingsPage';
import { useStore } from './store/useStore';
import { ROLE_META } from './lib/defects';
import { Toasts } from './components/Modal';
import { IconChart, IconLayers, IconList, IconShield } from './components/Icons';

export type Route =
  | { name: 'batches' }
  | { name: 'batch'; batchId: string }
  | { name: 'workbench'; batchId: string; boardId: string }
  | { name: 'dashboard' }
  | { name: 'settings' };

export function parseHash(hash: string): Route {
  const clean = hash.replace(/^#\/?/, '');
  const parts = clean.split('?')[0].split('/').filter(Boolean);
  if (parts[0] === 'batch' && parts[1]) {
    if (parts[2] === 'board' && parts[3]) {
      return { name: 'workbench', batchId: parts[1], boardId: parts[3] };
    }
    return { name: 'batch', batchId: parts[1] };
  }
  if (parts[0] === 'dashboard') return { name: 'dashboard' };
  if (parts[0] === 'settings') return { name: 'settings' };
  return { name: 'batches' };
}

export function navigate(path: string) {
  window.location.hash = path;
}

export function App() {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));
  const db = useStore((s) => s.db);
  const setCurrentUser = useStore((s) => s.setCurrentUser);
  const user = db.users.find((u) => u.id === db.currentUserId) ?? db.users[0];

  useEffect(() => {
    const onHash = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', onHash);
    if (!window.location.hash) window.location.hash = '/batches';
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const fullscreen = route.name === 'workbench';

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">
            <IconLayers size={15} />
          </div>
          <div>
            <div>AOI 焊点复判工作台</div>
            <div className="brand-sub">Solder Joint Recheck</div>
          </div>
        </div>
        <nav className="nav">
          <a href="#/batches" className={route.name === 'batches' || route.name === 'batch' ? 'on' : ''}>
            <span style={{ display: 'inline-flex', verticalAlign: '-2px', marginRight: 6 }}>
              <IconList size={13} />
            </span>
            批次复判
          </a>
          <a href="#/dashboard" className={route.name === 'dashboard' ? 'on' : ''}>
            <span style={{ display: 'inline-flex', verticalAlign: '-2px', marginRight: 6 }}>
              <IconChart size={13} />
            </span>
            质量看板
          </a>
          <a href="#/settings" className={route.name === 'settings' ? 'on' : ''}>
            <span style={{ display: 'inline-flex', verticalAlign: '-2px', marginRight: 6 }}>
              <IconShield size={13} />
            </span>
            规则与留痕
          </a>
        </nav>
        <div className="topbar-spacer" />
        <div className="row small dim" style={{ gap: 14 }}>
          <span className="mono">SMT-1 / AOI-01</span>
          <span className="vdiv" />
          <span className="mono">2026-11-16</span>
        </div>
        <div className="user-switch" title="切换演示身份">
          <div className="avatar" style={{ background: ROLE_META[user.role].color }}>
            {user.name.slice(0, 1)}
          </div>
          <select value={user.id} onChange={(e) => setCurrentUser(e.target.value)}>
            {db.users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} · {ROLE_META[u.role].label}
              </option>
            ))}
          </select>
        </div>
      </header>

      {route.name === 'batches' && <BatchesPage />}
      {route.name === 'batch' && <BatchDetailPage batchId={route.batchId} />}
      {route.name === 'workbench' && <WorkbenchPage batchId={route.batchId} boardId={route.boardId} />}
      {route.name === 'dashboard' && <DashboardPage />}
      {route.name === 'settings' && <SettingsPage />}
      <Toasts />
      {fullscreen && null}
    </div>
  );
}
