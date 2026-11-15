import { For } from 'solid-js';
import type { Accessor } from 'solid-js';
import type { Approach, Scheme } from '../types';
import type { Store } from '../store';
import { NumberInput } from './ui';
import { approachRise, approachSlope } from '../lib/engine';
import { RAMP_SLOPE_LIMIT, STAIR_SLOPE_LIMIT } from '../lib/constants';
import { ratioText } from '../lib/engine';

const TYPE_LABEL: Record<Approach['type'], string> = {
  stair: '梯道',
  ramp: '坡道',
  elevator: '电梯',
};

export function ApproachesTab(props: { store: Store; s: Accessor<Scheme> }) {
  const store = props.store;
  const s = () => props.s();
  const rise = () => approachRise(s());

  const slopeState = (a: Approach) => {
    const slope = approachSlope(s(), a);
    if (slope === null) return null;
    const limit = a.type === 'stair' ? STAIR_SLOPE_LIMIT : RAMP_SLOPE_LIMIT;
    return { slope, steep: slope > limit, limit };
  };

  return (
    <div class="section">
      <div class="sec-head">接入设施（梯道 / 坡道 / 电梯）</div>
      <div class="sec-body">
        <div class="muted mb8" style={{ 'font-size': '11.5px' }}>
          需爬升高度（桥面顶至地面）：<b>{rise().toFixed(2)}m</b>。梯道陡于 1:4、坡道陡于 1:10 时给出黄色提示。
        </div>

        <div class="gap6 mb8">
          {(['left', 'right'] as const).map((side) => (
            <div class="gap6">
              <span class="badge draft">{side === 'left' ? '左侧' : '右侧'}</span>
              <button
                class="tiny"
                onClick={() => store.addApproach(s().id, 'stair', side)}
              >
                + 梯道
              </button>
              <button
                class="tiny"
                onClick={() => store.addApproach(s().id, 'ramp', side)}
              >
                + 坡道
              </button>
              <button
                class="tiny"
                onClick={() => store.addApproach(s().id, 'elevator', side)}
              >
                + 电梯
              </button>
            </div>
          ))}
        </div>

        <For each={s().approaches}>
          {(a) => {
            const st = slopeState(a);
            return (
              <div class={`comp-row${st?.steep ? ' flag-warn' : ''}`}>
                <div class="cr-head">
                  <span>
                    {a.side === 'left' ? '左' : '右'}侧 · {TYPE_LABEL[a.type]}
                  </span>
                  <button class="tiny danger" onClick={() => store.removeApproach(s().id, a.id)}>
                    删除
                  </button>
                </div>
                {a.type !== 'elevator' ? (
                  <div class="inline-fields mb8">
                    <span class="muted">水平投影长</span>
                    <NumberInput value={a.run} step={1} onInput={(v) => store.updateApproach(s().id, a.id, { run: v })} />
                    <span class="muted">净宽</span>
                    <NumberInput
                      value={a.width}
                      step={0.1}
                      onInput={(v) => store.updateApproach(s().id, a.id, { width: v })}
                    />
                  </div>
                ) : (
                  <div class="muted" style={{ 'font-size': '11.5px' }}>
                    电梯井道平面按 2.6m × 2.6m 计，垂直提升 {rise().toFixed(2)}m
                  </div>
                )}
                {st && (
                  <div class="flex-between">
                    <span class={st.steep ? 'badge warn' : 'badge draft'}>
                      坡度 {ratioText(st.slope)}（{(st.slope * 100).toFixed(1)}%）
                    </span>
                    {st.steep && (
                      <span class="muted" style={{ 'font-size': '11px' }}>
                        {a.type === 'stair'
                          ? `陡于 1:4，建议水平长度 ≥ ${(rise() / STAIR_SLOPE_LIMIT).toFixed(1)}m`
                          : `陡于 1:10，建议水平长度 ≥ ${(rise() / RAMP_SLOPE_LIMIT).toFixed(1)}m`}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
}
