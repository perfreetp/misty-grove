import { createMemo, createSignal, For } from 'solid-js';
import type { Scheme } from '../types';
import type { Store } from '../store';
import { componentName } from './RightPanel';

export function ReviewModal(props: { store: Store; s: Scheme; onClose: () => void }) {
  const { store, s } = props;
  const [text, setText] = createSignal('');
  const [componentId, setComponentId] = createSignal<string>('');

  const componentOptions = createMemo(() => [
    { id: '', name: '（不挂靠具体构件，整体意见）' },
    { id: 'main-girder', name: componentName(s, 'main-girder') },
    ...s.piers.map((p) => ({ id: p.id, name: componentName(s, p.id) })),
    ...s.approaches.map((a) => ({ id: a.id, name: componentName(s, a.id) })),
  ]);

  const doReturn = () => {
    if (!text().trim()) return;
    store.returnScheme(s.id, text().trim(), componentId() || null);
    props.onClose();
  };

  const doApprove = () => {
    store.approve(s.id);
    props.onClose();
  };

  return (
    <div class="modal-mask" onClick={(e) => e.target === e.currentTarget && props.onClose()}>
      <div class="modal">
        <div class="modal-head">
          <span>公路部门审核 —— {s.name}</span>
          <button class="tiny" onClick={props.onClose}>
            关闭
          </button>
        </div>
        <div class="modal-body">
          <div class="field">
            <label>审核人</label>
            <input value={store.state.reviewer} onInput={(e) => store.setReviewer(e.currentTarget.value)} />
          </div>
          <div class="muted mb8" style={{ 'font-size': '11.5px' }}>
            审核日期：{new Date().toISOString().slice(0, 10)}（自动记录）；审核人与日期将写入方案审定记录。
          </div>

          <div class="field">
            <label>意见挂靠构件</label>
            <select value={componentId()} onChange={(e) => setComponentId(e.currentTarget.value)}>
              <For each={componentOptions()}>{(o) => <option value={o.id}>{o.name}</option>}</For>
            </select>
          </div>

          <div class="field" style={{ 'align-items': 'flex-start' }}>
            <label style={{ 'margin-top': '6px' }}>审核意见</label>
            <textarea
              rows={5}
              style={{
                width: '100%',
                'border-radius': '5px',
                border: '1px solid var(--border)',
                padding: '8px',
                'font-family': 'inherit',
                'font-size': '12.5px',
              }}
              placeholder="退回时必须填写意见，通过后可留空。意见将以气泡形式挂在三维构件上。"
              value={text()}
              onInput={(e) => setText(e.currentTarget.value)}
            />
          </div>
        </div>
        <div class="modal-foot">
          <button class="danger" disabled={!text().trim()} onClick={doReturn}>
            退回修改（意见挂构件）
          </button>
          <button class="primary" onClick={doApprove}>
            审定通过并选定该方案
          </button>
        </div>
      </div>
    </div>
  );
}
