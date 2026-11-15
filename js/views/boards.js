/* BoardDocs Studio — 型号列表页 */
import { U } from '../util.js';
import { store, boardStats, statusText, findConflicts, GROUP_MAP } from '../store.js';

export function renderBoards({ host, app, nav }) {
  const boards = store.boards();
  const total = boards.reduce((a, b) => a + boardStats(b).pinCount, 0);
  const annotated = boards.reduce((a, b) => a + boardStats(b).annotated, 0);
  const pending = store.openReviews().length;

  const page = U.h('div', { class: 'page' });
  page.appendChild(
    U.h('div', { class: 'page-head' },
      U.h('div', {},
        U.h('h1', {}, '开发板型号'),
        U.h('p', {}, `${boards.length} 个型号 · ${total} 个引脚 · ${annotated} 个已完成标注${pending ? ` · ${pending} 个版本待审核` : ''}`)
      ),
      U.h('div', { class: 'spacer' }),
      U.h('button', { class: 'btn primary', onclick: () => openCreate() }, '+ 新建型号')
    )
  );

  if (!boards.length) {
    page.appendChild(U.h('div', { class: 'empty' }, U.h('b', {}, '还没有开发板型号'), '新建型号后可在场景里导入分层模型并编排引脚说明。'));
    host.appendChild(page);
    return {};
  }

  const grid = U.h('div', { class: 'board-grid' });
  boards.forEach((b) => {
    const st = boardStats(b);
    const conflicts = st.conflictCount;
    const ratio = st.annotatedRatio;
    const card = U.h(
      'div',
      { class: 'board-card', onclick: () => nav(`#/board/${b.id}/editor`), tabindex: '0', onkeydown: (e) => { if (e.key === 'Enter') nav(`#/board/${b.id}/editor`); } },
      U.h('div', { style: { display: 'flex', alignItems: 'flex-start', gap: '10px' } },
        U.h('div', {},
          U.h('h3', {}, b.name),
          U.h('div', { class: 'sku' }, b.sku)
        ),
        U.h('div', { style: { marginLeft: 'auto', display: 'flex', gap: '5px', flexDirection: 'column', alignItems: 'flex-end' } },
          U.h('span', { class: 'tag ' + statusColor(b) }, statusText(b)),
          b.versions.length ? U.h('span', { class: 'tag violet' }, b.versions[b.versions.length - 1].label + ' / ' + b.versions[b.versions.length - 1].firmware) : U.h('span', { class: 'tag off' }, '未发布')
        )
      ),
      U.h('div', { class: 'metrics' },
        U.h('div', { class: 'metric' }, U.h('b', {}, String(st.pinCount)), U.h('small', {}, '引脚')),
        U.h('div', { class: 'metric ' + (ratio >= 0.99 ? 'good' : ratio > 0.6 ? 'warn' : 'bad') }, U.h('b', {}, U.fmtPct(ratio)), U.h('small', {}, '已标注')),
        U.h('div', { class: 'metric ' + (conflicts ? 'bad' : 'good') }, U.h('b', {}, String(conflicts)), U.h('small', {}, '功能冲突'))
      ),
      U.h('div', { class: 'bar' }, U.h('i', { style: { width: Math.max(2, ratio * 100) + '%' } })),
      U.h('div', { class: 'row' },
        U.h('span', { class: 'muted', style: { fontSize: '11px' } }, `${st.layerCount} 层 · ${st.stepCount} 步装配 · 审核 ${st.avgReview ? U.fmtDuration(st.avgReview) : '—'}`),
        U.h('div', { style: { flex: 1 } }),
        U.h('span', { class: 'tag' + (st.voltageCount < st.pinCount ? ' red' : '') }, `${st.pinCount - st.voltageCount} 个未标电压`)
      )
    );
    grid.appendChild(card);
  });
  page.appendChild(grid);

  page.appendChild(U.h('div', { class: 'section-title' }, '接下来'));
  page.appendChild(U.h('div', { class: 'next-grid' },
    U.h('div', { class: 'next-card', onclick: () => host.closest('body') && (location.hash = '#/review') },
      U.h('b', {}, pending ? `${pending} 个版本等待评审` : '暂无待评审版本'),
      U.h('small', {}, pending ? '评审可逐条批注、退回或通过；通过后按固件版本生成发布版本。' : '编辑提交后会出现在评审队列。'),
      U.h('span', { class: 'tag blue' }, '评审队列')),
    U.h('div', { class: 'next-card', onclick: () => (location.hash = '#/published') },
      U.h('b', {}, `${boards.reduce((a, b) => a + b.versions.length, 0)} 个已发布说明版本`),
      U.h('small', {}, '发布后只读；售后与课程组可从版本页导出引脚清单与步骤图。'),
      U.h('span', { class: 'tag violet' }, '发布版本')),
    U.h('div', { class: 'next-card', onclick: () => (location.hash = '#/stats') },
      U.h('b', {}, '按型号汇总统计'),
      U.h('small', {}, `全平台 ${total} 个引脚，${annotated} 个完成名称 / 电压 / 功能标注。`),
      U.h('span', { class: 'tag green' }, '统计'))
  ));
  host.appendChild(page);

  function statusColor(b) {
    if (!b.work) return b.versions.length ? 'violet' : 'off';
    return { draft: 'amber', in_review: 'blue', rejected: 'red', approved: 'green' }[b.work.status] || 'off';
  }

  function openCreate() {
    const name = U.h('input', { type: 'text', placeholder: '例如 ESP32-C6 教学板', value: '' });
    const sku = U.h('input', { type: 'text', placeholder: '例如 ESP32C6-EDU', value: '' });
    const desc = U.h('textarea', { placeholder: '课程定位、板载资源等（可选）', rows: 3 });
    U.modal({
      title: '新建开发板型号',
      body: U.h('div', { class: 'stack' },
        U.h('label', { class: 'field' }, U.h('span', {}, '型号名称'), name),
        U.h('label', { class: 'field' }, U.h('span', {}, 'SKU / 编号'), sku),
        U.h('label', { class: 'field', style: { marginBottom: 0 } }, U.h('span', {}, '说明'), desc),
        U.h('p', { class: 'hint', style: { margin: 0 } }, '创建后会自动生成「外壳 / 主板」两个初始图层，可在场景里继续导入分层模型。')
      ),
      actions: [
        { label: '取消' },
        {
          label: '创建', kind: 'primary',
          onClick: () => {
            if (!name.value.trim()) { U.toast('请填写型号名称', 'warn'); return false; }
            const b = store.createBoard({ name: name.value.trim(), sku: sku.value.trim() || undefined, desc: desc.value.trim() });
            nav(`#/board/${b.id}/editor`);
            setTimeout(() => U.toast('已创建，导入模型后即可开始标注'), 200);
          },
        },
      ],
    });
  }

  return {};
}
