import { For, Show, createMemo } from 'solid-js';
import type { Accessor } from 'solid-js';
import type { Scheme } from '../types';
import type { Store } from '../store';
import { fmt } from '../lib/constants';
import { hasBlockingErrors } from '../lib/engine';
import { statusLabel } from '../lib/deliverables';
import { useToast } from './ui';

export function RightPanel(props: {
  store: Store;
  s: Accessor<Scheme>;
  onReview: () => void;
  onDeliver: () => void;
  onLocate: (componentId: string | null) => void;
}) {
  const store = props.store;
  const s = () => props.s();
  const toast = useToast();
  const issues = createMemo(() => store.issues(s()));
  const metrics = createMemo(() => store.metrics(s()));
  const errors = () => issues().filter((i) => i.level === 'error');
  const warnings = () => issues().filter((i) => i.level === 'warning');

  const submit = () => {
    const r = store.submit(s().id);
    if (r.ok) toast(`方案「${s().name}」已提交公路部门审核`);
    else toast(r.reason ?? '提交失败', true);
  };

  return (
    <>
      <div class="section">
        <div class="sec-head">
          <span>方案指标</span>
          <span class={`badge ${s().status}`}>{statusLabel(s().status)}</span>
        </div>
        <div class="sec-body">
          <div class="metric-grid">
            <div class="metric-card">
              <div class={`v${metrics().clearance < 5 ? ' bad' : ''}`}>{fmt(metrics().clearance)} m</div>
              <div class="k">桥下净空</div>
            </div>
            <div class="metric-card">
              <div class="v">{fmt(metrics().costWan, 1)} 万</div>
              <div class="k">估算造价</div>
            </div>
            <div class="metric-card">
              <div class="v">{fmt(metrics().steelTons, 1)} t</div>
              <div class="k">钢材用量</div>
            </div>
            <div class="metric-card">
              <div class="v">{fmt(metrics().concreteM3, 1)} m³</div>
              <div class="k">混凝土用量</div>
            </div>
            <div class="metric-card">
              <div class="v">{fmt(metrics().footprintM2, 0)} ㎡</div>
              <div class="k">占地面积</div>
            </div>
            <div class="metric-card">
              <div class="v">{metrics().closureDays} 天</div>
              <div class="k">封闭施工</div>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="sec-head">
          <span>自动校核（{errors().length} 错误 / {warnings().length} 警告）</span>
        </div>
        <div class="sec-body">
          <Show when={issues().length === 0}>
            <div class="issue-ok">✓ 全部校核项通过，可提交审核</div>
          </Show>
          <For each={issues()}>
            {(i) => (
              <div
                class={`issue-item ${i.level}`}
                style={i.componentId ? { cursor: 'pointer' } : undefined}
                onClick={() => i.componentId && props.onLocate(i.componentId)}
              >
                <span class="ico">{i.level === 'error' ? '⛔' : '⚠️'}</span>
                <div>
                  <div>{i.message}</div>
                  {i.componentId && (
                    <div class="muted" style={{ 'font-size': '11px', 'margin-top': '2px' }}>
                      挂靠构件：{componentName(s(), i.componentId)}（点击定位）
                    </div>
                  )}
                </div>
              </div>
            )}
          </For>
          <Show when={hasBlockingErrors(issues())}>
            <div class="issue-item error" style={{ 'margin-top': '8px' }}>
              <span class="ico">🚫</span>
              <div>存在强制性错误，提交按钮已锁定。请抬高梁底或调整墩位后重试。</div>
            </div>
          </Show>
        </div>
      </div>

      <div class="section">
        <div class="sec-head">审核流程</div>
        <div class="sec-body">
          <div class="gap6">
            <button class="primary" disabled={s().status === 'submitted' || hasBlockingErrors(issues())} onClick={submit}>
              提交公路部门审核
            </button>
            <button disabled={s().status !== 'submitted'} onClick={props.onReview}>
              公路部门受理
            </button>
            <button disabled={s().status !== 'approved'} onClick={props.onDeliver}>
              交底图 / 清单
            </button>
          </div>
          <Show when={s().approver}>
            <div class="mt8 muted" style={{ 'font-size': '11.5px' }}>
              审定人：<b>{s().approver}</b>　审定日期：<b>{s().approvalDate}</b>
            </div>
          </Show>
        </div>
      </div>

      <Show when={s().comments.length > 0}>
        <div class="section">
          <div class="sec-head">退回意见（{s().comments.length}）</div>
          <div class="sec-body">
            <For each={s().comments}>
              {(c) => (
                <div class={`comment-item${c.resolved ? ' resolved' : ''}`}>
                  <div class="ch">
                    <span>
                      {c.date} · {c.reviewer}
                      {c.componentId && (
                        <>
                          {' '}
                          ·{' '}
                          <span class="comp" onClick={() => props.onLocate(c.componentId)}>
                            {componentName(s(), c.componentId)}
                          </span>
                        </>
                      )}
                    </span>
                    {!c.resolved && (
                      <button class="tiny" onClick={() => store.resolveComment(s().id, c.id)}>
                        已整改
                      </button>
                    )}
                  </div>
                  <div>{c.text}</div>
                  {c.resolved && <div class="muted" style={{ 'font-size': '11px' }}>已标记整改完成</div>}
                </div>
              )}
            </For>
          </div>
        </div>
      </Show>

      <Show when={s().history.length > 0}>
        <div class="section">
          <div class="sec-head">审定记录</div>
          <div class="sec-body">
            <For each={[...s().history].reverse()}>
              {(h) => (
                <div class="history-item">
                  {h.date} · {h.reviewer} ·{' '}
                  <b>
                    {h.action === 'submit' ? '提交审核' : h.action === 'approve' ? '审定通过' : '退回修改'}
                  </b>
                  {h.comment && <div>意见：{h.comment}</div>}
                </div>
              )}
            </For>
          </div>
        </div>
      </Show>
    </>
  );
}

export function componentName(s: Scheme, id: string): string {
  if (id === 'main-girder') return '主梁';
  const pier = s.piers.find((p) => p.id === id);
  if (pier) return `桥墩「${pier.name}」`;
  const ap = s.approaches.find((a) => a.id === id);
  if (ap) return `${ap.side === 'left' ? '左' : '右'}侧${ap.type === 'stair' ? '梯道' : ap.type === 'ramp' ? '坡道' : '电梯'}`;
  return id;
}
