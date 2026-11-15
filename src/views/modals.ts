// 模态框：新建病例、退回原因

import { store } from '../storage/store';
import { h, toast } from '../utils/dom';
import { renderCaseList } from './caseList';
import { showCaseView } from './caseView';

function openModal(body: HTMLElement): () => void {
  const mask = h('div', { class: 'modal-mask' });
  const modal = h('div', { class: 'modal' }, body);
  mask.append(modal);
  mask.addEventListener('click', (e) => {
    if (e.target === mask) close();
  });
  document.body.append(mask);
  function close(): void {
    mask.remove();
  }
  return close;
}

export function showCreateCaseModal(): void {
  const patientNo = h('input', {
    value: `ESD-${new Date().getFullYear()}-${String(store.state.cases.length + 1).padStart(3, '0')}`,
  });
  const site = h('input', { placeholder: '如：胃窦小弯侧 / 直肠' });
  const operator = h('input', { placeholder: '操作医师姓名' });
  const close = openModal(h('div', {},
    h('h3', {}, '新建 ESD 病例'),
    h('label', { class: 'field' }, h('span', {}, '病例编号'), patientNo),
    h('label', { class: 'field' }, h('span', {}, '病灶部位'), site),
    h('label', { class: 'field' }, h('span', {}, '操作医师'), operator),
    h('div', { class: 'modal-actions' },
      h('button', { class: 'btn', onclick: () => close() }, '取消'),
      h('button', {
        class: 'btn btn-primary',
        onclick: async () => {
          if (!patientNo.value.trim()) return toast('请填写病例编号', 'error');
          const c = await store.createCase({
            patientNo: patientNo.value.trim(),
            lesionSite: site.value.trim(),
            operator: operator.value.trim(),
          });
          close();
          toast('病例已创建', 'success');
          showCaseView(c.id);
        },
      }, '创建'),
    ),
  ));
}

export function showReturnModal(caseId: string): void {
  const ta = h('textarea', {
    rows: '4',
    placeholder: '请填写退回原因，例如：病变边界在 NBI 下与腺管结构不符，需向 7 点方向外扩 2 mm',
  });
  const close = openModal(h('div', {},
    h('h3', {}, '退回修改'),
    h('p', { class: 'muted' }, '退回后病例回到内镜医师工作台，医师需按原因修改边界并重新提交。'),
    ta,
    h('div', { class: 'modal-actions' },
      h('button', { class: 'btn', onclick: () => close() }, '取消'),
      h('button', {
        class: 'btn btn-danger',
        onclick: async () => {
          try {
            await store.returnCase(caseId, ta.value);
            close();
            toast('病例已退回', 'success');
            renderCaseList(document.getElementById('view-root')!);
          } catch (err) {
            toast((err as Error).message, 'error');
          }
        },
      }, '确认退回'),
    ),
  ));
}
