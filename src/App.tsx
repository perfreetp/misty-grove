// 应用外壳：角色切换、全局导航、患者/访视列表
import { createMemo, createSignal, For, Match, Show, Switch } from 'solid-js';
import { ROLE_LABEL, resetDemoData, stageQueue, state, switchUser } from './store';
import { EYE_LABEL, STAGE_LABEL, VERDICT_LABEL } from './types';
import { fmtDay } from './lib/util';
import TechnicianView from './views/TechnicianView';
import ClinicianView from './views/ClinicianView';
import ChiefView from './views/ChiefView';
import VisitWorkspace from './views/VisitWorkspace';

type Nav = 'work' | 'patients';

export default function App() {
  const [nav, setNav] = createSignal<Nav>('work');
  const [openVisitId, setOpenVisitId] = createSignal<string | null>(null);

  const open = (id: string) => {
    setOpenVisitId(id);
    window.scrollTo(0, 0);
  };

  const queueCounts = createMemo(() => ({
    pending_layers: stageQueue('pending_layers').length + stageQueue('returned').length,
    pending_review: stageQueue('pending_review').length,
    interpreted: stageQueue('interpreted').length,
  }));

  return (
    <div class="app-shell">
      <header class="topbar">
        <div class="brand">
          <span class="logo">◉</span>
          <div>
            <h1>OCT 断层分层渲染与随访进展判读平台</h1>
            <small>视网膜 ILM / GCL / 筛板分层 · WebGL2 体数据渲染</small>
          </div>
        </div>
        <nav class="main-nav">
          <button classList={{ active: nav() === 'work' && !openVisitId() }} onClick={() => { setNav('work'); setOpenVisitId(null); }}>
            工作台
          </button>
          <button classList={{ active: nav() === 'patients' }} onClick={() => { setNav('patients'); setOpenVisitId(null); }}>
            患者档案
          </button>
        </nav>
        <div class="role-switch">
          <label>当前身份
            <select value={state.currentUserId} onChange={(e) => switchUser(e.currentTarget.value)}>
              <For each={state.users}>{(u) => (
                <option value={u.id}>{u.name} · {ROLE_LABEL[u.role]}</option>
              )}</For>
            </select>
          </label>
          <button class="btn ghost small" title="清空 localStorage 并重建演示数据" onClick={() => {
            if (confirm('确认重置为初始演示数据？当前所有修改将丢失。')) {
              resetDemoData();
              setOpenVisitId(null);
            }
          }}>重置演示数据</button>
        </div>
      </header>

      <div class="queue-strip">
        <span class="strip-item">待分层/已退回 <b class="amber">{queueCounts().pending_layers}</b></span>
        <span class="strip-item">待判读 <b class="blue">{queueCounts().pending_review}</b></span>
        <span class="strip-item">待审核 <b class="purple">{queueCounts().interpreted}</b></span>
      </div>

      <main class="content">
        <Show when={openVisitId()} fallback={
          nav() === 'patients'
            ? <PatientsPage onOpen={open} />
            : <RoleHome onOpenVisit={open} />
        }>
          {(id) => <VisitWorkspace visitId={id()} onBack={() => setOpenVisitId(null)} />}
        </Show>
      </main>
      <footer class="footer">演示平台 · 数据保存在浏览器 localStorage · 程序化生成的 OCT 体数据仅用于功能演示，不用于临床诊断</footer>
    </div>
  );
}

function RoleHome(props: { onOpenVisit: (id: string) => void }) {
  const role = createMemo(() => state.users.find((u) => u.id === state.currentUserId)!.role);
  return (
    <Switch>
      <Match when={role() === 'technician'}>
        <TechnicianView onOpenVisit={props.onOpenVisit} />
      </Match>
      <Match when={role() === 'clinician'}>
        <ClinicianView onOpenVisit={props.onOpenVisit} />
      </Match>
      <Match when={role() === 'chief'}>
        <ChiefView onOpenVisit={props.onOpenVisit} />
      </Match>
    </Switch>
  );
}

function PatientsPage(props: { onOpen: (id: string) => void }) {
  const [q, setQ] = createSignal('');
  const filtered = createMemo(() => {
    const kw = q().trim();
    return state.patients.filter((p) => !kw || p.name.includes(kw) || p.mrn.includes(kw));
  });
  return (
    <div class="view">
      <div class="panel">
        <h3>患者档案</h3>
        <input class="search" placeholder="按姓名/病历号搜索" value={q()} onInput={(e) => setQ(e.currentTarget.value)} />
        <For each={filtered()}>{(p) => {
          const visits = () => p.visits.map((id) => state.visits[id]).sort((a, b) => b.acquiredAt.localeCompare(a.acquiredAt));
          return (
            <div class="patient-card">
              <div class="patient-head">
                <b>{p.name}</b> <span class="muted">{p.sex} · {new Date().getFullYear() - p.birthYear}岁 · {p.mrn}</span>
                <span class="muted">{p.visits.length} 次访视</span>
              </div>
              <table class="data-table compact">
                <thead><tr><th>日期</th><th>眼别</th><th>状态</th><th>结论</th><th></th></tr></thead>
                <tbody>
                  <For each={visits()}>{(v) => (
                    <tr>
                      <td>{fmtDay(v.acquiredAt)}</td>
                      <td>{EYE_LABEL[v.eye]}</td>
                      <td><span class={`stage-badge ${v.stage}`}>{STAGE_LABEL[v.stage]}</span></td>
                      <td>{v.interpretation ? <span class={`verdict ${v.interpretation.verdict}`}>{VERDICT_LABEL[v.interpretation.verdict]}</span> : '—'}</td>
                      <td><button class="btn small" onClick={() => props.onOpen(v.id)}>打开</button></td>
                    </tr>
                  )}</For>
                </tbody>
              </table>
            </div>
          );
        }}</For>
      </div>
    </div>
  );
}
