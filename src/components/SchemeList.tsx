import { For } from 'solid-js';
import type { Store } from '../store';
import { statusLabel } from '../lib/deliverables';
import { hasBlockingErrors, runChecks } from '../lib/engine';

export function SchemeList(props: { store: Store }) {
  const { state } = props.store;
  return (
    <div class="section">
      <div class="sec-head">
        <span>方案列表（{state.schemes.length}）</span>
        <button class="tiny primary" onClick={() => props.store.addScheme()}>
          + 新建
        </button>
      </div>
      <div class="sec-body">
        <For each={state.schemes}>
          {(s) => {
            const issues = () => runChecks(s);
            const errCount = () => issues().filter((i) => i.level === 'error').length;
            const warnCount = () => issues().filter((i) => i.level === 'warning').length;
            return (
              <div
                class={`scheme-card${s.id === state.activeId ? ' active' : ''}`}
                onClick={() => props.store.selectScheme(s.id)}
              >
                <div class="flex-between">
                  <div class="sc-name">
                    {s.preferred && <span class="badge star" style={{ margin: '0 6px 0 0' }}>★ 选定</span>}
                    {s.name}
                  </div>
                  <span class={`badge ${s.status}`} style={{ position: 'absolute', right: '10px', top: '10px' }}>
                    {statusLabel(s.status)}
                  </span>
                </div>
                <div class="sc-meta">
                  <span>{s.material === 'steel' ? '钢箱梁' : '混凝土箱梁'}</span>
                  <span>跨径 {s.span}m</span>
                  {errCount() > 0 && <span class="badge error">错误 {errCount()}</span>}
                  {warnCount() > 0 && <span class="badge warn">警告 {warnCount()}</span>}
                </div>
                <div class="sc-actions">
                  <button
                    class="tiny"
                    onClick={(e) => {
                      e.stopPropagation();
                      props.store.duplicateScheme(s.id);
                    }}
                  >
                    复制
                  </button>
                  <button
                    class="tiny danger"
                    disabled={state.schemes.length <= 1}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`确定删除方案「${s.name}」？`)) props.store.removeScheme(s.id);
                    }}
                  >
                    删除
                  </button>
                  <button
                    class="tiny"
                    onClick={(e) => {
                      e.stopPropagation();
                      props.store.togglePreferred(s.id);
                    }}
                  >
                    {s.preferred ? '取消★' : '标为★'}
                  </button>
                </div>
              </div>
            );
          }}
        </For>
        {state.schemes.every((s) => !hasBlockingErrors(runChecks(s))) && (
          <div class="muted" style={{ 'font-size': '11.5px', 'margin-top': '6px' }}>
            提示：全部方案均无强制错误时，可在右侧提交公路部门审核。
          </div>
        )}
      </div>
    </div>
  );
}
