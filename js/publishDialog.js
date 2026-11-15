/* BoardDocs Studio — 发布对话框（评审页与编辑器共用） */
import { U } from './util.js';
import { store, publishChecks } from './store.js';

export function openPublishDialog({ board, content, onPublished }) {
  const body = content || (board.work ? board.work.content : store.contentFor(board));
  const checks = publishChecks(board, body);
  const fw = U.h('input', { type: 'text', value: store.nextFirmware(board), class: 'mono' });
  const note = U.h('textarea', { rows: 2, placeholder: '本版本变更说明（写入发布记录）' });
  const warnCount = checks.warnings.length;
  const ack = U.h('input', { type: 'checkbox', style: { width: 'auto' } });

  U.modal({
    title: '生成发布版本',
    width: '620px',
    body: U.h('div', { class: 'stack' },
      U.h('p', { class: 'hint', style: { margin: 0 } }, '发布后会生成与固件版本对应的说明版本快照；该版本不可直接修改，后续修改需基于它开修订。'),
      U.h('label', { class: 'field' }, U.h('span', {}, '对应固件版本'), fw),
      U.h('label', { class: 'field', style: { marginBottom: 0 } }, U.h('span', {}, '变更说明'), note),
      checks.blockers.length
        ? U.h('div', { class: 'issue blocking', style: { marginTop: '10px' } },
            U.h('div', { class: 'body' },
              U.h('b', {}, `存在 ${checks.blockers.length} 个阻断项`),
              U.h('small', {}, checks.blockers.slice(0, 3).map((b) => b.title).join('；') + (checks.blockers.length > 3 ? ' 等' : '')),
              U.h('small', {}, '未标注电压的引脚会阻断发布，请先在编辑器中补齐。')))
        : U.h('p', { class: 'ok-row', style: { margin: '6px 0 0' } }, '✓ 发布检查通过（无阻断项）'),
      warnCount
        ? U.h('div', {},
            U.h('label', { style: { display: 'flex', gap: '7px', alignItems: 'center', fontSize: '12px' } }, ack,
              U.h('span', {}, `我已知悉 ${warnCount} 条非阻断提醒，确认发布`)),
            U.h('div', { class: 'check-list', style: { maxHeight: '170px', marginTop: '6px' } },
              checks.warnings.slice(0, 8).map((w) => U.h('div', { class: 'issue', style: { marginBottom: '5px' } }, U.h('div', { class: 'body' }, U.h('b', {}, w.title), U.h('small', {}, w.detail)))),
              checks.warnings.length > 8 ? U.h('p', { class: 'hint' }, `还有 ${checks.warnings.length - 8} 条提醒…`) : null
            ))
        : null
    ),
    actions: [
      { label: '取消' },
      {
        label: '确认发布', kind: 'primary',
        onClick: () => {
          if (checks.blockers.length) { U.toast('存在阻断项，无法发布', 'err'); return false; }
          if (warnCount && !ack.checked) { U.toast('请勾选确认提醒后发布', 'warn'); return false; }
          if (!fw.value.trim()) { U.toast('请填写固件版本', 'warn'); return false; }
          const v = store.publish(board, { firmware: fw.value.trim(), changelog: note.value.trim(), allowWarnings: true });
          if (v) {
            U.toast(`已发布 ${v.label} · 固件 ${v.firmware}`);
            if (onPublished) onPublished(v);
          }
        },
      },
    ],
  });
}
