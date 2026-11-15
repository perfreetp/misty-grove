// 增强参数面板：预设选择、实时滑块、假彩色矩阵、技师另存预设

import type { EnhanceParams, EsdCase } from '../types';
import { store } from '../storage/store';
import { h, toast } from '../utils/dom';
import type { CaseViewController } from './caseView';
import { silent } from './caseView';

export function renderEnhancePanel(c: EsdCase, ctrl: CaseViewController): HTMLElement {
  const box = h('div', { class: 'card' });
  box.append(h('h3', {}, 'WebGL2 图像增强'));

  // 预设选择
  const presetSel = h('select', {
    onchange: (e: Event) => {
      const id = (e.target as HTMLSelectElement).value;
      if (id) void silent(() => store.applyPreset(c.id, id)).then(() => ctrl.reload());
    },
  },
    h('option', { value: '' }, '— 选择预设 —'),
    ...store.state.presets.map((p) => {
      const opt = h('option', { value: p.id }, `${p.name}（使用 ${p.usageCount} 次）${p.builtin ? ' · 内置' : ''}`);
      if (c.presetId === p.id) opt.selected = true;
      return opt;
    }),
  );
  box.append(h('label', { class: 'field' }, h('span', {}, '增强预设（技师维护）'), presetSel));

  const p = c.enhanceParams;
  if (!p) {
    box.append(h('p', { class: 'muted' }, '当前无增强参数。'));
    return box;
  }

  const update = (patch: Partial<EnhanceParams>, rerenderGl = true): void => {
    const next: EnhanceParams = {
      ...ctrl.getLiveParams(),
      ...patch,
    };
    ctrl.setLiveParams(next);
    void silent(() => store.updateEnhanceParams(c.id, next));
    if (rerenderGl) ctrl.renderGl();
  };

  box.append(
    rangeRow('血管增强强度', p.vesselGain, 0, 3, 0.05, (v) => update({ vesselGain: v })),
    rangeRow('饱和度 / 明度去相关', p.saturation, 0, 2, 0.05, (v) => update({ saturation: v })),
    rangeRow('对比度', p.contrast, 0.5, 2, 0.05, (v) => update({ contrast: v })),
    rangeRow('绿色通道强调 (NBI)', p.greenBoost, 0, 1, 0.05, (v) => update({ greenBoost: v })),
  );

  // 假彩色矩阵
  const matrixWrap = h('div', {});
  matrixWrap.append(h('h4', {}, '假彩色通道混合矩阵（行=输出 RGB，列=输入 RGB）'));
  const grid = h('div', { class: 'matrix-grid' });
  const inputs: HTMLInputElement[] = [];
  for (let i = 0; i < 9; i++) {
    const inp = h('input', {
      type: 'number',
      step: '0.05',
      value: String(p.colorMatrix[i]),
      onchange: (e: Event) => {
        const matrix = ctrl.getLiveParams().colorMatrix.slice();
        matrix[i] = Number((e.target as HTMLInputElement).value) || 0;
        update({ colorMatrix: matrix });
      },
    }) as HTMLInputElement;
    inputs.push(inp);
    grid.append(inp);
  }
  matrixWrap.append(grid);
  box.append(matrixWrap);

  // 操作按钮
  const isTech = store.state.role === 'technician';
  box.append(h('div', { class: 'btn-row', style: 'margin-top:12px' },
    h('button', {
      class: 'btn btn-sm',
      onclick: () => {
        const name = prompt('预设名称：', `自定义预设 ${store.state.presets.filter((x) => !x.builtin).length + 1}`);
        if (!name) return;
        void store.savePreset(name, ctrl.getLiveParams()).then(() => {
          toast(`预设「${name}」已保存`, 'success');
          ctrl.reload();
        });
      },
    }, isTech ? '另存为新预设' : '另存为新预设（技师权限）'),
    h('button', {
      class: 'btn btn-sm',
      onclick: () => {
        // 原图对比：临时把参数恢复为恒等矩阵风格
        const identity: EnhanceParams = {
          colorMatrix: [1, 0, 0, 0, 1, 0, 0, 0, 1],
          vesselGain: 0,
          saturation: 1,
          contrast: 1,
          greenBoost: 0,
        };
        ctrl.setLiveParams(identity);
        ctrl.renderGl();
        toast('已切换为原图效果，调整任意滑块恢复增强', 'info');
      },
    }, '查看原图'),
    h('button', {
      class: 'btn btn-sm',
      onclick: () => {
        if (c.presetId) void silent(() => store.applyPreset(c.id, c.presetId!)).then(() => ctrl.reload());
      },
    }, '重置为预设值'),
  ));

  if (!isTech) {
    box.append(h('p', { class: 'muted', style: 'margin-top:8px' }, '提示：预设的维护（重命名/删除）请切换到技师角色，在「技师维护」页完成。'));
  }
  return box;
}

function rangeRow(
  label: string,
  value: number,
  min: number,
  max: number,
  step: number,
  onInput: (v: number) => void,
): HTMLElement {
  const out = h('output', {}, value.toFixed(2));
  const input = h('input', {
    type: 'range',
    min: String(min),
    max: String(max),
    step: String(step),
    value: String(value),
    oninput: (e: Event) => {
      const v = Number((e.target as HTMLInputElement).value);
      out.textContent = v.toFixed(2);
      onInput(v);
    },
  });
  return h('div', { class: 'range-row' },
    h('div', { class: 'range-head' }, h('span', {}, label), out),
    input,
  );
}
