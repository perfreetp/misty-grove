// 病例列表视图：按状态筛选，展示待标注/待讨论/已通过/已退回

import type { EsdCase } from '../types';
import { STATUS_LABEL, MODALITY_LABEL } from '../types';
import { store } from '../storage/store';
import { clear, fmtTime, h } from '../utils/dom';
import { showCaseView } from './caseView';
import { showCreateCaseModal } from './modals';

export function renderCaseList(root: HTMLElement): void {
  clear(root);
  const cases = store.state.cases;
  const counts = store.statusCounts();

  root.append(
    h('div', { class: 'page-head' },
      h('h2', {}, '病例工作台'),
      h('div', { class: 'btn-row' },
        h('button', {
          class: 'btn btn-primary',
          onclick: () => showCreateCaseModal(),
        }, '＋ 新建病例'),
      ),
    ),
    h('div', { class: 'stat-cards' },
      statCard('待标注', counts.drafting, '#6e6e73'),
      statCard('待讨论', counts.pending, '#b25c00'),
      statCard('已通过', counts.approved, '#248a3d'),
      statCard('已退回', counts.returned, '#d70015'),
    ),
  );

  const card = h('div', { class: 'card' });
  if (cases.length === 0) {
    card.append(h('p', { class: 'muted' }, '暂无病例。点击「新建病例」开始，导入白光/NBI 截图后圈定病变边界。'));
  } else {
    const table = h('table', {},
      h('thead', {}, h('tr', {},
        h('th', {}, '病例编号'),
        h('th', {}, '病灶部位'),
        h('th', {}, '操作医师'),
        h('th', {}, '截图'),
        h('th', {}, '状态'),
        h('th', {}, '更新时间'),
        h('th', {}, ''),
      )),
      h('tbody', {},
        ...cases.map((c) => {
          const modalities = [...new Set(c.images.map((i) => MODALITY_LABEL[i.modality].split(' ')[0]))].join('/');
          return h('tr', { class: 'clickable', onclick: () => showCaseView(c.id) },
            h('td', {}, c.patientNo),
            h('td', {}, c.lesionSite || '—'),
            h('td', {}, c.operator || '—'),
            h('td', {}, `${c.images.length} 张${modalities ? `（${modalities}）` : ''}`),
            h('td', {}, h('span', { class: `badge badge-${c.status}` }, STATUS_LABEL[c.status])),
            h('td', {}, fmtTime(c.updatedAt)),
            h('td', {},
              h('button', {
                class: 'btn btn-sm btn-danger',
                onclick: (e: Event) => {
                  e.stopPropagation();
                  if (confirm(`确认删除病例 ${c.patientNo}？截图与标注将一并删除。`)) {
                    void store.deleteCase(c.id);
                  }
                },
              }, '删除'),
            ),
          );
        }),
      ),
    );
    card.append(table);
  }
  root.append(card);
}

function statCard(label: string, num: number, color: string): HTMLElement {
  return h('div', { class: 'stat-card' },
    h('div', { class: 'num', style: `color:${color}` }, String(num)),
    h('div', { class: 'lbl' }, label),
  );
}

export function caseStatusHint(c: EsdCase): string {
  if (c.status === 'returned') return `已退回：${c.returnReason}`;
  return STATUS_LABEL[c.status];
}
