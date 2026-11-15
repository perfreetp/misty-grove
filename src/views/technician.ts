// 技师维护视图：增强参数预设管理 + 比例尺标定管理

import type { Calibration, EnhancePreset } from '../types';
import { store } from '../storage/store';
import { clear, h, toast } from '../utils/dom';
import { uid } from '../utils/geometry';
import { defaultParams } from '../webgl/presets';

export function renderTechnician(root: HTMLElement): void {
  clear(root);
  root.append(h('div', { class: 'page-head' }, h('h2', {}, '技师维护：增强预设与比例尺标定')));
  root.append(presetSection(), calibrationSection());
}

// ---------------- 预设 ----------------

function presetSection(): HTMLElement {
  const box = h('div', { class: 'card', style: 'margin-bottom:16px' });
  box.append(h('h3', {}, `增强参数预设（${store.state.presets.length}）`));

  const table = h('table', {},
    h('thead', {}, h('tr', {},
      h('th', {}, '名称'),
      h('th', {}, '血管增强'),
      h('th', {}, '饱和度'),
      h('th', {}, '对比度'),
      h('th', {}, '绿通道'),
      h('th', {}, '使用次数'),
      h('th', {}, '操作'),
    )),
    h('tbody', {},
      ...store.state.presets.map((p) => h('tr', {},
        h('td', {}, p.name, p.builtin ? h('span', { class: 'muted' }, '（内置）') : ''),
        h('td', {}, p.vesselGain.toFixed(2)),
        h('td', {}, p.saturation.toFixed(2)),
        h('td', {}, p.contrast.toFixed(2)),
        h('td', {}, p.greenBoost.toFixed(2)),
        h('td', {}, String(p.usageCount)),
        h('td', {}, h('div', { class: 'btn-row' },
          h('button', { class: 'btn btn-sm', onclick: () => editPreset(p) }, '编辑'),
          p.builtin ? null : h('button', {
            class: 'btn btn-sm btn-danger',
            onclick: () => {
              if (confirm(`删除预设「${p.name}」？`)) void store.deletePreset(p.id);
            },
          }, '删除'),
        )),
      )),
    ),
  );
  box.append(table);
  box.append(h('div', { style: 'margin-top:12px' },
    h('button', {
      class: 'btn btn-primary',
      onclick: () => editPreset(null),
    }, '＋ 新建预设'),
  ));
  return box;
}

function editPreset(existing: EnhancePreset | null): void {
  const params = existing
    ? { colorMatrix: [...existing.colorMatrix], vesselGain: existing.vesselGain, saturation: existing.saturation, contrast: existing.contrast, greenBoost: existing.greenBoost }
    : defaultParams();
  const nameIn = h('input', { value: existing?.name ?? `自定义预设 ${Date.now() % 10000}` });
  const vessel = numInput(params.vesselGain, 0, 3, 0.05);
  const sat = numInput(params.saturation, 0, 2, 0.05);
  const contrast = numInput(params.contrast, 0.5, 2, 0.05);
  const green = numInput(params.greenBoost, 0, 1, 0.05);

  const matrixInputs: HTMLInputElement[] = [];
  const grid = h('div', { class: 'matrix-grid' });
  for (let i = 0; i < 9; i++) {
    const inp = h('input', { type: 'number', step: '0.05', value: String(params.colorMatrix[i]) }) as HTMLInputElement;
    matrixInputs.push(inp);
    grid.append(inp);
  }

  const mask = h('div', { class: 'modal-mask' });
  const close = (): void => mask.remove();
  mask.append(h('div', { class: 'modal' },
    h('h3', {}, existing ? '编辑预设' : '新建预设'),
    h('label', { class: 'field' }, h('span', {}, '预设名称'), nameIn),
    h('div', { class: 'form-row' },
      h('label', { class: 'field' }, h('span', {}, '血管增强'), vessel),
      h('label', { class: 'field' }, h('span', {}, '饱和度'), sat),
    ),
    h('div', { class: 'form-row' },
      h('label', { class: 'field' }, h('span', {}, '对比度'), contrast),
      h('label', { class: 'field' }, h('span', {}, '绿通道强调'), green),
    ),
    h('h4', {}, '假彩色混合矩阵（行=输出，列=输入 RGB）'),
    grid,
    h('div', { class: 'modal-actions' },
      h('button', { class: 'btn', onclick: () => close() }, '取消'),
      h('button', {
        class: 'btn btn-primary',
        onclick: async () => {
          const nextParams = {
            colorMatrix: matrixInputs.map((i) => Number(i.value) || 0),
            vesselGain: Number(vessel.value),
            saturation: Number(sat.value),
            contrast: Number(contrast.value),
            greenBoost: Number(green.value),
          };
          if (existing) {
            const updated: EnhancePreset = { ...existing, ...nextParams, name: nameIn.value || existing.name, updatedAt: Date.now() };
            await store.updatePreset(updated);
          } else {
            await store.savePreset(nameIn.value || '未命名预设', nextParams);
          }
          close();
          toast('预设已保存', 'success');
          renderTechnician(document.getElementById('view-root')!);
        },
      }, '保存'),
    ),
  ));
  document.body.append(mask);
}

function numInput(value: number, min: number, max: number, step: number): HTMLInputElement {
  return h('input', { type: 'number', min: String(min), max: String(max), step: String(step), value: String(value) }) as HTMLInputElement;
}

// ---------------- 标定 ----------------

function calibrationSection(): HTMLElement {
  const box = h('div', { class: 'card' });
  box.append(h('h3', {}, '比例尺标定'));
  box.append(h('p', { class: 'muted' }, '标定线段在病例工作区的内镜图上绘制（选择「比例尺标定」工具后点击两个端点），此处统一维护已知长度与删除。'));

  if (store.state.calibrations.length === 0) {
    box.append(h('p', { class: 'muted' }, '暂无标定。打开任一病例，在工具栏选择「比例尺标定」，于图上画线段并录入真实长度。'));
    return box;
  }
  const table = h('table', {},
    h('thead', {}, h('tr', {},
      h('th', {}, '名称'),
      h('th', {}, '已知长度'),
      h('th', {}, '创建时间'),
      h('th', {}, '操作'),
    )),
    h('tbody', {},
      ...store.state.calibrations.map((cal) => h('tr', {},
        h('td', {}, cal.name),
        h('td', {}, h('input', {
          type: 'number',
          step: '0.1',
          value: String(cal.knownLengthMm),
          style: 'width:110px',
          onchange: (e: Event) => {
            const v = Number((e.target as HTMLInputElement).value);
            if (v > 0) void store.saveCalibration({ ...cal, knownLengthMm: v });
          },
        }), ' mm'),
        h('td', {}, new Date(cal.createdAt).toLocaleString('zh-CN')),
        h('td', {}, h('button', {
          class: 'btn btn-sm btn-danger',
          onclick: () => {
            if (confirm('删除该标定？关联病例将失去比例尺。')) void store.deleteCalibration(cal.id);
          },
        }, '删除')),
      )),
    ),
  );
  box.append(table);

  // 手工录入（无法在图上画时的备用入口）
  const manualName = h('input', { placeholder: '标定名称，如：活检钳 5mm 刻度' });
  const manualLen = h('input', { type: 'number', step: '0.1', placeholder: '已知长度 mm' });
  box.append(h('h4', {}, '手工录入（备用，坐标取图像中央水平线段）'));
  box.append(h('div', { class: 'form-row' }, manualName, manualLen,
    h('button', {
      class: 'btn btn-primary',
      style: 'flex:0 0 auto',
      onclick: () => {
        const len = Number(manualLen.value);
        if (!manualName.value || !(len > 0)) return toast('请填写名称与有效长度', 'error');
        const cal: Calibration = {
          id: uid('cal'),
          name: manualName.value,
          p1: { x: 0.35, y: 0.5 },
          p2: { x: 0.65, y: 0.5 },
          knownLengthMm: len,
          createdAt: Date.now(),
        };
        void store.saveCalibration(cal).then(() => {
          toast('标定已录入', 'success');
          renderTechnician(document.getElementById('view-root')!);
        });
      },
    }, '录入'),
  ));
  return box;
}
