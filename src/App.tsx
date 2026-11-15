import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StoreProvider, useStore } from './state/store';
import { CasesPage, NewCasePage } from './pages/CasesPage';
import { MeasurementWorkbench } from './pages/MeasurementWorkbench';
import { ReleasePage } from './pages/ReleasePage';
import { ReviewQueuePage } from './pages/ReviewPage';
import { LibraryPage } from './pages/LibraryPage';
import { StatsPage } from './pages/StatsPage';
import { ReportPage } from './pages/ReportPage';
import type { CaseDoc, Role } from './lib/types';
import { IconChart, IconDoc, IconList, IconSliders, IconUser, IconFilter } from './components/icons';
import { probeGpu } from './render/gpu';

interface Route {
  view: 'cases' | 'new-case' | 'measure' | 'release' | 'review' | 'library' | 'stats' | 'report' | 'queue';
  caseId?: string;
}

function parseHash(): Route {
  const raw = window.location.hash.replace(/^#\/?/, '');
  const parts = raw.split('/').filter(Boolean);
  if (!parts.length) return { view: 'cases' };
  const [head, id] = parts;
  switch (head) {
    case 'cases':
      return { view: 'cases' };
    case 'new':
      return { view: 'new-case' };
    case 'review':
      return { view: 'review' };
    case 'library':
      return { view: 'library' };
    case 'stats':
      return { view: 'stats' };
    case 'case': {
      const view = parts[2] as Route['view'];
      const known: Route['view'][] = ['measure', 'release', 'report'];
      return { view: known.includes(view) ? view : 'measure', caseId: id };
    }
    default:
      return { view: 'cases' };
  }
}

const NAV: { id: Route['view']; label: string; icon: React.ComponentType<{ size?: number }>; roles: Role[] }[] = [
  { id: 'cases', label: '申请单', icon: IconList, roles: ['physician', 'technologist', 'director'] },
  { id: 'review', label: '待审队列', icon: IconFilter, roles: ['director', 'physician'] },
  { id: 'library', label: '型号库 / 口径', icon: IconSliders, roles: ['technologist', 'director'] },
  { id: 'stats', label: '统计', icon: IconChart, roles: ['director', 'physician'] },
];

function Shell() {
  const { state, setRole, toasts, ready, storage, refreshStorage, resetDemo } = useStore();
  const [route, setRoute] = useState<Route>(() => parseHash());
  const [gpu, setGpu] = useState<{ ok: boolean; message: string } | null>(null);

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHash);
    probeGpu().then((s) => setGpu({ ok: s.ok, message: s.message }));
    refreshStorage();
    return () => window.removeEventListener('hashchange', onHash);
  }, [refreshStorage]);

  const navigate = useCallback((view: string, id?: string) => {
    if (view === 'cases') window.location.hash = '#/cases';
    else if (view === 'new-case') window.location.hash = '#/new';
    else if (view === 'review') window.location.hash = '#/review';
    else if (view === 'library') window.location.hash = '#/library';
    else if (view === 'stats') window.location.hash = '#/stats';
    else if (id) window.location.hash = `#/case/${id}/${view}`;
  }, []);

  const openCase = useCallback((c: CaseDoc, view: string) => {
    window.location.hash = `#/case/${c.id}/${view}`;
  }, []);

  const activeCase = useMemo(
    () => (route.caseId ? state.cases.find((c) => c.id === route.caseId) ?? null : null),
    [route.caseId, state.cases],
  );

  const go = useCallback(
    (v: string) => {
      if (!activeCase) {
        navigate(v);
        return;
      }
      if (v === 'cases' || v === 'new-case' || v === 'review' || v === 'library' || v === 'stats') navigate(v);
      else navigate(v, activeCase.id);
    },
    [activeCase, navigate],
  );

  const pendingReview = state.cases.filter((c) => c.status === '待审核').length;
  const myMeasure = state.cases.filter((c) => c.status === '待测量' || c.status === '需复核').length;

  if (!ready) {
    return (
      <div style={{ height: '100%', display: 'grid', placeItems: 'center', color: 'var(--text-3)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 15, color: 'var(--text-2)', marginBottom: 6 }}>TAVR 规划台</div>
          <div style={{ fontSize: 12 }}>正在恢复本地病例库…</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <aside className="rail">
        <div className="rail-logo" title="TAVR 规划台">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="8.4" stroke="#4ea4d8" strokeWidth="1.6" />
            <circle cx="12" cy="12" r="3.4" stroke="#e8a33d" strokeWidth="1.6" />
            <path d="M12 3.6v3M12 17.4v3M3.6 12h3M17.4 12h3" stroke="#4ea4d8" strokeWidth="1.4" />
          </svg>
        </div>
        {NAV.map((n) => {
          const allowed = n.roles.includes(state.role);
          const isActive =
            route.view === n.id ||
            (n.id === 'cases' && ['measure', 'release', 'report', 'new-case'].includes(route.view));
          return (
            <button
              key={n.id}
              className={`rail-item ${isActive ? 'on' : ''} ${allowed ? '' : 'dim'}`}
              onClick={() => {
                if (!allowed) return;
                navigate(n.id);
              }}
              title={allowed ? n.label : `${n.label}(当前角色无权限)`}
            >
              <n.icon size={19} />
              {n.id === 'review' && pendingReview ? <span className="rail-badge">{pendingReview}</span> : null}
            </button>
          );
        })}
        <div style={{ flex: 1 }} />
        <button className="rail-item" title="恢复演示数据" onClick={() => { if (confirm('恢复演示数据?当前测量进度将被重置。')) resetDemo(); }}>
          <IconDoc size={18} />
        </button>
        <div className="rail-user" title={`${state.role}`}><IconUser size={17} /></div>
      </aside>

      <div className="app-main">
        <header className="topbar">
          <div className="topbar-left">
            <span className="brand">TAVR 规划台</span>
            <span className="brand-sub">结构性心脏病 · 术前测量与虚拟释放</span>
          </div>
          <div className="topbar-mid">
            <NavLink on={route.view === 'cases' || route.view === 'new-case' || ['measure', 'release', 'report'].includes(route.view)} onClick={() => navigate('cases')}>
              申请单 {myMeasure ? <span className="nav-count">{myMeasure}</span> : null}
            </NavLink>
            <NavLink on={route.view === 'review'} onClick={() => navigate('review')}>
              待审队列 {pendingReview ? <span className="nav-count hot">{pendingReview}</span> : null}
            </NavLink>
            <NavLink on={route.view === 'library'} onClick={() => navigate('library')}>型号库</NavLink>
            <NavLink on={route.view === 'stats'} onClick={() => navigate('stats')}>统计</NavLink>
          </div>
          <div className="topbar-right">
            <div className={`gpu-pill ${gpu?.ok ? 'ok' : 'err'}`} title={gpu?.message ?? '检测中'}>
              <span className="dot" />
              {gpu ? (gpu.ok ? 'WebGPU' : 'WebGPU 不可用') : '检测中'}
            </div>
            {storage ? (
              <div className="storage-pill" title="浏览器本地影像与数据占用">
                本地 {(storage.usage / 1048576).toFixed(0)} MB
              </div>
            ) : null}
            <select
              className="role-select"
              value={state.role}
              onChange={(e) => {
                setRole(e.target.value as Role);
                setRoute(parseHash());
              }}
            >
              <option value="physician">介入医师 · 李承泽</option>
              <option value="technologist">技师 · 周立群</option>
              <option value="director">主任 · 陈嘉禾</option>
            </select>
          </div>
        </header>

        <main className="app-content">
          {route.view === 'cases' ? <CasesPage onNavigate={go} onOpenCase={openCase} /> : null}
          {route.view === 'new-case' ? <NewCasePage onNavigate={go} onOpenCase={openCase} /> : null}
          {route.view === 'measure' ? (
            activeCase ? (
              <MeasurementWorkbench caseDoc={activeCase} onNavigate={go} />
            ) : (
              <NotFound />
            )
          ) : null}
          {route.view === 'release' ? (
            activeCase ? (
              <ReleasePage caseDoc={activeCase} onNavigate={go} />
            ) : (
              <NotFound />
            )
          ) : null}
          {route.view === 'review' ? (
            state.role === 'technologist' ? (
              <PermissionNote label="待审队列由主任审核,技师无审核权限" onSwitch={() => setRole('director')} />
            ) : (
              <ReviewQueuePage onOpenCase={openCase} />
            )
          ) : null}
          {route.view === 'library' ? (
            state.role === 'physician' ? <PermissionNote label="型号库与测量口径仅由技师和主任维护" onSwitch={() => setRole('technologist')} /> : <LibraryPage />
          ) : null}
          {route.view === 'stats' ? <StatsPage /> : null}
          {route.view === 'report' ? (
            activeCase ? (
              <ReportPage caseDoc={activeCase} onNavigate={go} />
            ) : (
              <NotFound />
            )
          ) : null}
        </main>
      </div>

      <div className="toast-wrap">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.tone}`}>
            {t.text}
          </div>
        ))}
      </div>
    </div>
  );
}

function PermissionNote({ label, onSwitch }: { label: string; onSwitch: () => void }) {
  return (
    <div className="card" style={{ padding: 22, maxWidth: 520 }}>
      <div className="banner banner-warn" style={{ marginBottom: 12 }}>{label}</div>
      <button className="btn btn-primary" onClick={onSwitch}>
        切换为技师角色
      </button>
    </div>
  );
}

function NotFound() {
  return (
    <div className="card" style={{ padding: 24 }}>
      申请单不存在或已被删除。
      <button className="btn" style={{ marginLeft: 10 }} onClick={() => (window.location.hash = '#/cases')}>
        返回列表
      </button>
    </div>
  );
}

function NavLink({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button className={`navlink ${on ? 'on' : ''}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
