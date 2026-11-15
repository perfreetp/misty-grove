// 取材块面板：录入病理申请单的取材块尺寸，自动与切开线对账

import type { EsdCase, SpecimenBlock } from '../types';
import { store } from '../storage/store';
import { formatArea, uid } from '../utils/geometry';
import { h } from '../utils/dom';
import { silentReload } from './caseView';

export function renderBlocksPanel(c: EsdCase): HTMLElement {
  const box = h('div', { class: 'card' });
  box.append(h('h3', {}, '病理取材对账'));

  const lenIn = h('input', { type: 'number', step: '0.1', placeholder: '长 mm', value: '15' });
  const widIn = h('input', { type: 'number', step: '0.1', placeholder: '宽 mm', value: '10' });
  box.append(
    h('div', { class: 'form-row' }, lenIn, widIn,
      h('button', {
        class: 'btn btn-primary',
        style: 'flex:0 0 auto',
        onclick: () => {
          const block: SpecimenBlock = {
            id: uid('blk'),
            lengthMm: Number(lenIn.value) || 0,
            widthMm: Number(widIn.value) || 0,
          };
          if (block.lengthMm <= 0 || block.widthMm <= 0) return;
          void silentReload(() => store.saveBlock(c.id, block));
        },
      }, '添加取材块'),
    ),
    h('p', { class: 'muted' }, '按病理申请单逐块登记，系统用块总面积比对计划切开范围、用最长块比对病变长径。'),
  );

  if (c.blocks.length > 0) {
    const table = h('table', {},
      h('thead', {}, h('tr', {}, h('th', {}, '#'), h('th', {}, '长 (mm)'), h('th', {}, '宽 (mm)'), h('th', {}, '面积'), h('th', {}, ''))),
      h('tbody', {},
        ...c.blocks.map((b, i) => h('tr', {},
          h('td', {}, String(i + 1)),
          h('td', {}, b.lengthMm.toFixed(1)),
          h('td', {}, b.widthMm.toFixed(1)),
          h('td', {}, formatArea(b.lengthMm * b.widthMm)),
          h('td', {}, h('button', {
            class: 'pill-remove',
            onclick: () => void silentReload(() => store.deleteBlock(c.id, b.id)),
          }, '移除')),
        )),
      ),
    );
    box.append(table);
  }

  const r = c.reconciliation;
  if (r) {
    if (r.passed) {
      box.append(h('div', { class: 'ok-box', style: 'margin-top:12px' },
        `✓ 对账通过：${r.blockCount} 块取材合计 ${formatArea(r.totalBlockAreaMm2)}，可覆盖切开范围。`));
    } else {
      box.append(h('div', { class: 'warn-box', style: 'margin-top:12px' },
        h('strong', {}, '⚠ 对账未通过'),
        h('ul', {}, ...r.warnings.map((w) => h('li', {}, w))),
      ));
    }
  }
  return box;
}
