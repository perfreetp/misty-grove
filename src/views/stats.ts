// 统计视图：按医师的边界修改率、各增强预设使用次数、病例状态分布

import { store } from '../storage/store';
import { clear, h } from '../utils/dom';
import { STATUS_LABEL } from '../types';

export function renderStats(root: HTMLElement): void {
  clear(root);
  root.append(h('div', { class: 'page-head' }, h('h2', {}, '质量与使用统计')));

  const counts = store.statusCounts();
  root.append(h('div', { class: 'stat-cards' },
    ...Object.entries(counts).map(([k, v]) =>
      h('div', { class: 'stat-card' },
        h('div', { class: 'num' }, String(v)),
        h('div', { class: 'lbl' }, STATUS_LABEL[k as keyof typeof STATUS_LABEL]),
      ),
    ),
  ));

  // 医师边界修改率
  const phys = store.physicianStats();
  const physCard = h('div', { class: 'card', style: 'margin-bottom:16px' });
  physCard.append(h('h3', {}, '按医师统计边界修改率'));
  if (phys.length === 0 || phys.every((p) => p.total === 0)) {
    physCard.append(h('p', { class: 'muted' }, '暂无已提交讨论的病例。'));
  } else {
    physCard.append(h('table', {},
      h('thead', {}, h('tr', {},
        h('th', {}, '操作医师'),
        h('th', {}, '提交讨论数'),
        h('th', {}, '被退回数'),
        h('th', {}, '边界修改率'),
        h('th', {}, '分布'),
      )),
      h('tbody', {},
        ...phys.filter((p) => p.total > 0).map((p) => h('tr', {},
          h('td', {}, p.operator),
          h('td', {}, String(p.total)),
          h('td', {}, String(p.returned)),
          h('td', {}, h('strong', { style: p.modificationRate > 0 ? 'color:var(--danger)' : 'color:var(--ok)' },
            `${(p.modificationRate * 100).toFixed(1)}%`)),
          h('td', {}, h('div', { class: 'bar', style: 'width:160px' },
            h('span', { style: `width:${Math.round(p.modificationRate * 100)}%;background:${p.modificationRate > 0 ? 'var(--danger)' : 'var(--ok)'}` }))),
        )),
      ),
    ));
  }
  root.append(physCard);

  // 预设使用次数
  const presetCard = h('div', { class: 'card' });
  presetCard.append(h('h3', {}, '各增强预设使用次数'));
  const presets = store.presetStats();
  const maxUsage = Math.max(1, ...presets.map((p) => p.usageCount));
  presetCard.append(h('table', {},
    h('thead', {}, h('tr', {}, h('th', {}, '预设'), h('th', {}, '类型'), h('th', {}, '使用次数'), h('th', {}, '占比'))),
    h('tbody', {},
      ...presets.map((p) => h('tr', {},
        h('td', {}, p.name),
        h('td', {}, p.builtin ? '内置' : '自定义'),
        h('td', {}, h('strong', {}, String(p.usageCount))),
        h('td', {}, h('div', { class: 'bar', style: 'width:200px' },
          h('span', { style: `width:${Math.round((p.usageCount / maxUsage) * 100)}%` }))),
      )),
    ),
  ));
  root.append(presetCard);
}
