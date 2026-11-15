import { For, createMemo, createSignal } from 'solid-js';
import type { Scheme } from '../types';
import type { Store } from '../store';
import { approachSlope, calcMetrics, ratioText } from '../lib/engine';
import { MATERIAL_SPECS } from '../lib/constants';
import {
  briefingSvg,
  componentListCsv,
  downloadText,
  steelStatistics,
} from '../lib/deliverables';

type Tab = 'briefing' | 'bom' | 'steel';

export function DeliverModal(props: { store: Store; s: Scheme; onClose: () => void }) {
  const { store, s } = props;
  const [tab, setTab] = createSignal<Tab>('briefing');
  const metrics = createMemo(() => calcMetrics(s));
  const stats = createMemo(() => steelStatistics(store.state.schemes));
  const totalSteel = createMemo(() => stats().reduce((sum, r) => sum + r.total, 0));

  const bomRows = createMemo(() => {
    const rows: { id: string; name: string; cat: string; spec: string; mat: string; note: string }[] = [
      {
        id: 'G-01',
        name: '主梁',
        cat: s.material === 'steel' ? '钢箱梁' : '混凝土箱梁',
        spec: `跨径${s.span} × 梁高${s.girderDepth} × 桥宽${s.deckWidth} m`,
        mat: MATERIAL_SPECS[s.material].label,
        note: `梁底高程 ${s.girderBottomElev.toFixed(2)}m`,
      },
    ];
    s.piers.forEach((p, i) =>
      rows.push({
        id: `P-${String(i + 1).padStart(2, '0')}`,
        name: p.name,
        cat: '桥墩/桥台',
        spec: `${p.thickness} × ${p.width} m`,
        mat: '钢筋混凝土',
        note: `X=${p.x.toFixed(2)}m`,
      }),
    );
    s.approaches.forEach((a, i) => {
      const tn = a.type === 'stair' ? '梯道' : a.type === 'ramp' ? '坡道' : '电梯';
      const slope = approachSlope(s, a);
      rows.push({
        id: `A-${String(i + 1).padStart(2, '0')}`,
        name: `${a.side === 'left' ? '左' : '右'}侧${tn}`,
        cat: tn,
        spec: a.type === 'elevator' ? '井道 2.6 × 2.6 m' : `水平长 ${a.run} × 宽 ${a.width} m`,
        mat: a.type === 'ramp' ? '钢筋混凝土' : '钢结构',
        note: slope ? `坡度 ${ratioText(slope)}` : '垂直提升',
      });
    });
    return rows;
  });

  return (
    <div class="modal-mask" onClick={(e) => e.target === e.currentTarget && props.onClose()}>
      <div class="modal wide">
        <div class="modal-head">
          <span>审定通过交付物 —— {s.name}（审定人 {s.approver} · {s.approvalDate}）</span>
          <button class="tiny" onClick={props.onClose}>
            关闭
          </button>
        </div>
        <div class="modal-body">
          <div class="sub-tabs">
            <button class={tab() === 'briefing' ? 'on' : ''} onClick={() => setTab('briefing')}>
              技术交底图
            </button>
            <button class={tab() === 'bom' ? 'on' : ''} onClick={() => setTab('bom')}>
              构件清单
            </button>
            <button class={tab() === 'steel' ? 'on' : ''} onClick={() => setTab('steel')}>
              各方案钢材用量统计
            </button>
          </div>

          {tab() === 'briefing' && (
            <>
              <div class="svg-preview" innerHTML={briefingSvg(s)} />
              <div class="mt8 gap6">
                <button
                  class="primary"
                  onClick={() =>
                    downloadText(`${s.name}-技术交底图.svg`, briefingSvg(s), 'image/svg+xml;charset=utf-8')
                  }
                >
                  下载交底图 SVG
                </button>
              </div>
            </>
          )}

          {tab() === 'bom' && (
            <>
              <table class="compare">
                <thead>
                  <tr>
                    <th>构件编号</th>
                    <th>名称</th>
                    <th>类别</th>
                    <th>规格尺寸</th>
                    <th>材料</th>
                    <th>备注</th>
                  </tr>
                </thead>
                <tbody>
                  <For each={bomRows()}>
                    {(r) => (
                      <tr>
                        <td>{r.id}</td>
                        <td>{r.name}</td>
                        <td>{r.cat}</td>
                        <td>{r.spec}</td>
                        <td>{r.mat}</td>
                        <td>{r.note}</td>
                      </tr>
                    )}
                  </For>
                </tbody>
              </table>
              <div class="mt8 muted" style={{ 'font-size': '12px' }}>
                汇总：钢材 {metrics().steelTons.toFixed(2)} t ｜ 混凝土 {metrics().concreteM3.toFixed(2)} m³ ｜
                造价 {metrics().costWan.toFixed(2)} 万元 ｜ 占地 {metrics().footprintM2.toFixed(0)} ㎡ ｜
                封闭施工 {metrics().closureDays} 天
              </div>
              <button
                class="primary mt8"
                onClick={() =>
                  downloadText(`${s.name}-构件清单.csv`, componentListCsv(s), 'text/csv;charset=utf-8')
                }
              >
                导出构件清单 CSV
              </button>
            </>
          )}

          {tab() === 'steel' && (
            <>
              <table class="steel-table">
                <thead>
                  <tr>
                    <th>方案</th>
                    <th>结构形式</th>
                    <th>主梁型钢(t)</th>
                    <th>钢筋(t)</th>
                    <th>梯道/电梯/栏杆钢(t)</th>
                    <th>合计(t)</th>
                  </tr>
                </thead>
                <tbody>
                  <For each={stats()}>
                    {(r) => (
                      <tr>
                        <td>{r.schemeName}</td>
                        <td>{r.material}</td>
                        <td>{r.girderSteel.toFixed(2)}</td>
                        <td>{r.rebar.toFixed(2)}</td>
                        <td>{r.approachSteel.toFixed(2)}</td>
                        <td>
                          <b>{r.total.toFixed(2)}</b>
                        </td>
                      </tr>
                    )}
                  </For>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="5">全部方案钢材总计</td>
                    <td>{totalSteel().toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
              <button
                class="mt8"
                onClick={() => {
                  const csv =
                    '﻿方案,结构形式,主梁型钢(t),钢筋(t),附属钢(t),合计(t)\r\n' +
                    stats()
                      .map((r) =>
                        [r.schemeName, r.material, r.girderSteel, r.rebar, r.approachSteel, r.total].join(','),
                      )
                      .join('\r\n') +
                    `\r\n总计,,,,,${totalSteel().toFixed(2)}`;
                  downloadText('各方案钢材用量统计.csv', csv, 'text/csv;charset=utf-8');
                }}
              >
                导出钢材统计 CSV
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
