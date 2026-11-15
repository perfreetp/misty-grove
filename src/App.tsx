import { createSignal } from 'solid-js';
import { useStore } from './store';
import { ToastProvider } from './components/ui';
import { SchemeList } from './components/SchemeList';
import { ParamsTab } from './components/ParamsTab';
import { PiersTab } from './components/PiersTab';
import { ApproachesTab } from './components/ApproachesTab';
import { RightPanel } from './components/RightPanel';
import { SceneView } from './components/SceneView';
import { ReviewModal } from './components/ReviewModal';
import { DeliverModal } from './components/DeliverModal';
import { CompareDrawer } from './components/CompareDrawer';

type Tab = 'params' | 'piers' | 'approaches';

function Shell() {
  const store = useStore();
  const [tab, setTab] = createSignal<Tab>('params');
  const [reviewOpen, setReviewOpen] = createSignal(false);
  const [deliverOpen, setDeliverOpen] = createSignal(false);
  const [compareOpen, setCompareOpen] = createSignal(false);
  const [locateId, setLocateId] = createSignal<string | null>(null);

  const s = () => store.active();

  const locate = (id: string | null) => {
    setLocateId(id);
    // 构件在桥墩/接入页时自动切到对应编辑页
    if (id?.startsWith('pier-')) setTab('piers');
    else if (id?.startsWith('ap-')) setTab('approaches');
  };

  return (
    <div class="app-shell">
      <header class="app-header">
        <h1>🌉 高速公路跨线人行天桥 · 方案比选与净空校核系统</h1>
        <div class="spacer" />
        <label>
          当前审核人
          <input value={store.state.reviewer} onInput={(e) => store.setReviewer(e.currentTarget.value)} />
        </label>
        <button onClick={() => setCompareOpen(true)}>📊 方案并排比选</button>
      </header>

      <div class="app-body">
        {/* 左栏：方案 + 参数编辑 */}
        <aside class="sidebar">
          <div class="side-scroll">
            <SchemeList store={store} />
            <div class="sub-tabs">
              <button class={tab() === 'params' ? 'on' : ''} onClick={() => setTab('params')}>
                道路与桥梁
              </button>
              <button class={tab() === 'piers' ? 'on' : ''} onClick={() => setTab('piers')}>
                桥墩布置
              </button>
              <button class={tab() === 'approaches' ? 'on' : ''} onClick={() => setTab('approaches')}>
                梯道坡道电梯
              </button>
            </div>
            {tab() === 'params' && <ParamsTab store={store} s={s} />}
            {tab() === 'piers' && <PiersTab store={store} s={s} />}
            {tab() === 'approaches' && <ApproachesTab store={store} s={s} />}
            <Show locateId={locateId()} />
          </div>
        </aside>

        {/* 中央：三维场景 */}
        <SceneView store={store} onSelect={locate} />

        {/* 右栏：校核 + 指标 + 审核 */}
        <aside class="sidebar right">
          <div class="side-scroll">
            <RightPanel
              store={store}
              s={s}
              onReview={() => setReviewOpen(true)}
              onDeliver={() => setDeliverOpen(true)}
              onLocate={locate}
            />
          </div>
        </aside>
      </div>

      {reviewOpen() && <ReviewModal store={store} s={s()} onClose={() => setReviewOpen(false)} />}
      {deliverOpen() && <DeliverModal store={store} s={s()} onClose={() => setDeliverOpen(false)} />}
      {compareOpen() && <CompareDrawer store={store} onClose={() => setCompareOpen(false)} />}
    </div>
  );
}

// 定位提示条（点选校核项后提示当前关注构件）
function Show(props: { locateId: string | null }) {
  if (!props.locateId) return null;
  return (
    <div class="section">
      <div class="sec-body" style={{ background: 'var(--warning-bg)', 'font-size': '12px' }}>
        📍 三维场景已关注构件 id：{props.locateId}（红色/黄色高亮），可在对应页签调整参数
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <Shell />
    </ToastProvider>
  );
}
