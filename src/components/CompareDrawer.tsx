import { For, createMemo } from 'solid-js';
import type { Store } from '../store';
import { fmt } from '../lib/constants';
import { hasBlockingErrors, runChecks } from '../lib/engine';
import { statusLabel } from '../lib/deliverables';

interface Row {
  key: string;
  label: string;
  unit: string;
  get: (m: ReturnType<Store['metrics']>, s: ReturnType<Store['active']>) => number;
  /** 指标方向：low=越小越优，high=越大越优，none=不评优劣 */
  better: 'low' | 'high' | 'none';
  bad?: (v: number) => boolean;
}

const ROWS: Row[] = [
  { key: 'clearance', label: '桥下净空', unit: 'm', get: (m) => m.clearance, better: 'high', bad: (v) => v < 5 },
  { key: 'cost', label: '估算造价', unit: '万元', get: (m) => m.costWan, better: 'low' },
  { key: 'steel', label: '钢材用量', unit: 't', get: (m) => m.steelTons, better: 'low' },
  { key: 'concrete', label: '混凝土用量', unit: 'm³', get: (m) => m.concreteM3, better: 'low' },
  { key: 'footprint', label: '占地面积', unit: '㎡', get: (m) => m.footprintM2, better: 'low' },
  { key: 'closure', label: '封闭施工天数', unit: '天', get: (m) => m.closureDays, better: 'low' },
];

export function CompareDrawer(props: { store: Store; onClose: () => void }) {
  const { store } = props;

  const data = createMemo(() =>
    store.state.schemes.map((s) => ({
      scheme: s,
      metrics: store.metrics(s),
      blocked: hasBlockingErrors(runChecks(s)),
    })),
  );

  // 每一行的最优值（仅在无强制错误的方案间评比）
  const bestOf = (row: Row): number | null => {
    const eligible = data().filter((d) => !d.blocked);
    if (!eligible.length || row.better === 'none') return null;
    const vals = eligible.map((d) => row.get(d.metrics, d.scheme));
    return row.better === 'low' ? Math.min(...vals) : Math.max(...vals);
  };

  return (
    <div class="modal-mask" onClick={(e) => e.target === e.currentTarget && props.onClose()}>
      <div class="modal wide">
        <div class="modal-head">
          <span>多方案并排比选（造价 · 净空 · 占地 · 封闭工期）</span>
          <button class="tiny" onClick={props.onClose}>
            关闭
          </button>
        </div>
        <div class="modal-body">
          <table class="compare">
            <thead>
              <tr>
                <th style={{ width: '130px' }}>比选指标</th>
                <For each={data()}>
                  {(d) => (
                    <th>
                      <div>{d.scheme.name}</div>
                      <div style={{ 'font-weight': 400, 'font-size': '11px', 'margin-top': '4px' }}>
                        <span class={`badge ${d.scheme.status}`}>{statusLabel(d.scheme.status)}</span>
                        {d.scheme.preferred && (
                          <span class="badge star" style={{ margin: '0 0 0 4px' }}>
                            ★ 选定
                          </span>
                        )}
                        {d.blocked && <span class="badge error" style={{ margin: '0 0 0 4px' }}>禁报</span>}
                      </div>
                    </th>
                  )}
                </For>
              </tr>
            </thead>
            <tbody>
              <For each={ROWS}>
                {(row) => (
                  <tr>
                    <td class="metric-name">
                      {row.label}
                      <span class="muted">（{row.unit}）</span>
                    </td>
                    <For each={data()}>
                      {(d) => {
                        const v = row.get(d.metrics, d.scheme);
                        const best = bestOf(row);
                        const isBest = best !== null && !d.blocked && Math.abs(v - best) < 1e-9;
                        const isBad = row.bad?.(v) || d.blocked;
                        return (
                          <td class={isBad ? 'bad' : isBest ? 'best' : ''}>
                            {fmt(v, row.key === 'closure' || row.key === 'footprint' ? 0 : 2)}
                            {isBest && <div style={{ 'font-size': '10.5px' }}>最优 ↑</div>}
                          </td>
                        );
                      }}
                    </For>
                  </tr>
                )}
              </For>
              <tr>
                <td class="metric-name">结构形式</td>
                <For each={data()}>
                  {(d) => <td>{d.scheme.material === 'steel' ? '钢箱梁' : '混凝土箱梁'}</td>}
                </For>
              </tr>
              <tr>
                <td class="metric-name">接入设施</td>
                <For each={data()}>
                  {(d) => (
                    <td>
                      <For each={d.scheme.approaches}>
                        {(a) => (
                          <span class="badge draft" style={{ margin: '1px 2px' }}>
                            {a.side === 'left' ? '左' : '右'}
                            {a.type === 'stair' ? '梯' : a.type === 'ramp' ? '坡' : '电'}
                          </span>
                        )}
                      </For>
                    </td>
                  )}
                </For>
              </tr>
              <tr>
                <td class="metric-name">校核结论</td>
                <For each={data()}>
                  {(d) => {
                    const issues = runChecks(d.scheme);
                    const errs = issues.filter((i) => i.level === 'error').length;
                    const warns = issues.filter((i) => i.level === 'warning').length;
                    return (
                      <td class={errs ? 'bad' : ''}>
                        {errs ? `${errs} 项强制错误，禁止提交` : warns ? `${warns} 项警告，可提交` : '✓ 全部通过'}
                      </td>
                    );
                  }}
                </For>
              </tr>
              <tr>
                <td class="metric-name">审定信息</td>
                <For each={data()}>
                  {(d) => (
                    <td>
                      {d.scheme.approver ? (
                        <>
                          {d.scheme.approver}
                          <br />
                          <span class="muted">{d.scheme.approvalDate}</span>
                        </>
                      ) : (
                        <span class="muted">未审定</span>
                      )}
                    </td>
                  )}
                </For>
              </tr>
              <tr>
                <td class="metric-name">操作</td>
                <For each={data()}>
                  {(d) => (
                    <td>
                      <button
                        class="tiny"
                        onClick={() => {
                          store.selectScheme(d.scheme.id);
                          props.onClose();
                        }}
                      >
                        打开方案
                      </button>
                      <button
                        class="tiny"
                        style={{ margin: '0 0 0 6px' }}
                        disabled={d.blocked}
                        onClick={() => store.togglePreferred(d.scheme.id)}
                      >
                        {d.scheme.preferred ? '取消★选定' : '★ 选定'}
                      </button>
                    </td>
                  )}
                </For>
              </tr>
            </tbody>
          </table>
          <div class="muted mt8" style={{ 'font-size': '11.5px' }}>
            绿色＝该行最优方案（仅在可提交方案间评比）；红色＝净空不足或存在强制错误。造价与工期为方案阶段估算指标，供比选参考。
          </div>
        </div>
      </div>
    </div>
  );
}
