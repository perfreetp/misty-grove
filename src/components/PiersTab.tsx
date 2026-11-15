import { For } from 'solid-js';
import type { Accessor } from 'solid-js';
import type { Scheme } from '../types';
import type { Store } from '../store';
import { NumberInput } from './ui';
import { pierInCarriageway, pierInPipeline, roadGeometry } from '../lib/engine';

export function PiersTab(props: { store: Store; s: Accessor<Scheme> }) {
  const store = props.store;
  const s = () => props.s();
  const road = () => roadGeometry(s());

  return (
    <div class="section">
      <div class="sec-head">
        <span>桥墩 / 桥台（{s().piers.length}）</span>
        <button class="tiny primary" onClick={() => store.addPier(s().id)}>
          + 新增桥墩
        </button>
      </div>
      <div class="sec-body">
        <div class="muted mb8" style={{ 'font-size': '11.5px' }}>
          可在三维视图中直接拖动桥墩，也可在此精确输入 X 坐标。落入行车道（含硬路肩）或管线保护范围将标红并禁止提交。
        </div>
        <For each={s().piers}>
          {(p) => {
            const inLane = () => pierInCarriageway(p, road());
            const pipe = () => pierInPipeline(p, s());
            const flag = () => (inLane() || pipe() ? 'flag-error' : '');
            return (
              <div class={`comp-row ${flag()}`}>
                <div class="cr-head">
                  <input
                    value={p.name}
                    style={{ width: '130px' }}
                    onInput={(e) => store.updatePier(s().id, p.id, { name: e.currentTarget.value })}
                  />
                  <button class="tiny danger" onClick={() => store.removePier(s().id, p.id)}>
                    删除
                  </button>
                </div>
                <div class="inline-fields mb8">
                  <span class="muted">中心 X</span>
                  <NumberInput value={p.x} step={0.5} onInput={(v) => store.updatePier(s().id, p.id, { x: v })} />
                  <span class="muted">顺桥厚</span>
                  <NumberInput
                    value={p.thickness}
                    step={0.1}
                    onInput={(v) => store.updatePier(s().id, p.id, { thickness: v })}
                  />
                  <span class="muted">横桥宽</span>
                  <NumberInput
                    value={p.width}
                    step={0.1}
                    onInput={(v) => store.updatePier(s().id, p.id, { width: v })}
                  />
                </div>
                {inLane() && <div class="badge error">落在行车道范围内</div>}
                {pipe() && (
                  <span class="badge error" style={{ margin: '0 0 0 6px' }}>
                    侵入管线范围：{pipe()}
                  </span>
                )}
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
}
