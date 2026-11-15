import { For } from 'solid-js';
import type { Accessor } from 'solid-js';
import type { Scheme } from '../types';
import type { Store } from '../store';
import { Field, NumberInput } from './ui';
import { MATERIAL_SPECS } from '../lib/constants';
import { calcClearance, roadGeometry } from '../lib/engine';

export function ParamsTab(props: { store: Store; s: Accessor<Scheme> }) {
  const store = props.store;
  const s = () => props.s();
  const patch = <K extends keyof Scheme>(k: K, v: Scheme[K]) => store.patch(s().id, k, v);
  const road = () => roadGeometry(s());

  return (
    <>
      <div class="section">
        <div class="sec-head">基本信息与结构材料</div>
        <div class="sec-body">
          <Field label="方案名称">
            <input value={s().name} onInput={(e) => patch('name', e.currentTarget.value)} />
          </Field>
          <Field label="主梁材料">
            <select
              value={s().material}
              onChange={(e) => {
                const material = e.currentTarget.value as Scheme['material'];
                patch('material', material);
                patch('girderDepth', MATERIAL_SPECS[material].steelPerM2 ? 1.2 : 1.6);
              }}
            >
              <option value="steel">钢箱梁</option>
              <option value="concrete">混凝土箱梁</option>
            </select>
          </Field>
        </div>
      </div>

      <div class="section">
        <div class="sec-head">公路条件（交叉处）</div>
        <div class="sec-body">
          <Field label="路面设计高程" unit="m">
            <NumberInput value={s().roadElevation} onInput={(v) => patch('roadElevation', v)} />
          </Field>
          <Field label="单幅车道数" unit="条">
            <NumberInput value={s().lanesPerSide} step={1} min={1} onInput={(v) => patch('lanesPerSide', Math.round(v))} />
          </Field>
          <Field label="单车道宽度" unit="m">
            <NumberInput value={s().laneWidth} onInput={(v) => patch('laneWidth', v)} />
          </Field>
          <Field label="硬路肩宽度" unit="m">
            <NumberInput value={s().shoulderWidth} onInput={(v) => patch('shoulderWidth', v)} />
          </Field>
          <Field label="中央分隔带宽" unit="m">
            <NumberInput value={s().medianWidth} onInput={(v) => patch('medianWidth', v)} />
          </Field>
          <div class="muted" style={{ 'font-size': '11.5px' }}>
            推算：单幅宽 {road().roadwayHalfWidth.toFixed(2)}m，公路用地界半宽{' '}
            {road().rightOfWayHalfWidth.toFixed(2)}m
          </div>
        </div>
      </div>

      <div class="section">
        <div class="sec-head">桥梁主体几何</div>
        <div class="sec-body">
          <Field label="梁底高程" unit="m">
            <NumberInput value={s().girderBottomElev} step={0.05} onInput={(v) => patch('girderBottomElev', v)} />
          </Field>
          <Field label="梁高" unit="m">
            <NumberInput value={s().girderDepth} step={0.1} onInput={(v) => patch('girderDepth', v)} />
          </Field>
          <Field label="桥面净宽" unit="m">
            <NumberInput value={s().deckWidth} step={0.1} onInput={(v) => patch('deckWidth', v)} />
          </Field>
          <Field label="桥跨总长" unit="m">
            <NumberInput value={s().span} step={1} onInput={(v) => patch('span', v)} />
          </Field>
          <div
            class="metric-card"
            style={{
              'margin-top': '8px',
              background: calcClearance(s()) < 5 ? 'var(--error-bg)' : '#f5f8fc',
            }}
          >
            <div class="v" style={{ color: calcClearance(s()) < 5 ? 'var(--error)' : 'var(--primary-dark)' }}>
              桥下净空 {calcClearance(s()).toFixed(2)} m
            </div>
            <div class="k">= 梁底高程 − 路面高程；强制标准 ≥ 5.00m</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="sec-head">
          <span>管线保护范围</span>
          <button class="tiny" onClick={() => store.addPipeline(s().id)}>
            + 新增
          </button>
        </div>
        <div class="sec-body">
          <For each={s().pipelines}>
            {(z) => (
              <div class="comp-row">
                <div class="cr-head">
                  <input
                    value={z.name}
                    style={{ width: '150px' }}
                    onInput={(e) => store.updatePipeline(s().id, z.id, { name: e.currentTarget.value })}
                  />
                  <button class="tiny danger" onClick={() => store.removePipeline(s().id, z.id)}>
                    删除
                  </button>
                </div>
                <div class="inline-fields">
                  <span class="muted">X起</span>
                  <NumberInput
                    value={z.xStart}
                    onInput={(v) => store.updatePipeline(s().id, z.id, { xStart: v })}
                  />
                  <span class="muted">X止</span>
                  <NumberInput
                    value={z.xEnd}
                    onInput={(v) => store.updatePipeline(s().id, z.id, { xEnd: v })}
                  />
                  <span class="unit">m</span>
                </div>
              </div>
            )}
          </For>
          <div class="muted" style={{ 'font-size': '11.5px' }}>
            保护范围在三维场景中以橙色半透明带显示，墩位落入即判强制错误。
          </div>
        </div>
      </div>
    </>
  );
}
