/* BoardDocs Studio — 发布版本查看与修订 */
import { U } from '../util.js';
import { store, boardStats, findConflicts, publishChecks, statusText, GROUP_MAP, pinConflicts } from '../store.js';
import { openPreview } from '../preview.js';
import { exportPinCsv, exportStepsSvg, exportDocJson } from '../export.js';

export function renderPublished({ host, app, nav, versionId }) {
  // 收集所有版本
  const all = [];
  store.boards().forEach((b) => (b.versions || []).forEach((v) => all.push({ board: b, version: v })));
  all.sort((a, b) => b.version.publishedAt - a.version.publishedAt);
  let pick = versionId ? all.find((x) => x.version.id === versionId) : all[0];
  if (!pick) {
    host.appendChild(U.h('div', { class: 'page' }, U.h('div', { class: 'empty' }, U.h('b', {}, '还没有已发布的版本'), '评审通过后可在评审页生成发布版本。')));
    return {};
  }
  const { board, version } = pick;
  const content = version.content;
  const otherVersions = all.filter((x) => x.board.id === board.id);

  const wrap = U.h('div', { class: 'pub-wrap' });
  host.appendChild(wrap);

  const left = U.h('div', { class: 'review-list' });
  left.appendChild(U.h('div', { class: 'panel-head', style: { margin: '-10px -10px 6px', padding: '9px 12px' } }, U.h('b', {}, '已发布版本'), U.h('span', { class: 'spacer' }), U.h('span', { class: 'tag violet' }, `${all.length}`)));
  all.forEach(({ board: b, version: v }) => {
    left.appendChild(U.h('div', { class: 'rv-item' + (v.id === version.id ? ' on' : ''), onclick: () => nav('#/published/' + v.id) },
      U.h('b', {}, b.name),
      U.h('small', {}, `${v.label} · 固件 ${v.firmware} · ${U.fmtDay(v.publishedAt)}`),
      U.h('div', { class: 'row' },
        U.h('span', { class: 'tag violet' }, v.label),
        v.rev ? U.h('span', { class: 'tag' }, 'Rev ' + v.rev) : null,
        b.work ? U.h('span', { class: 'tag amber' }, '有进行中的修订') : null
      )
    ));
  });
  wrap.appendChild(left);

  const main = U.h('div', { class: 'review-main' });
  wrap.appendChild(main);

  const head = U.h('div', { class: 'doc-head' });
  head.appendChild(U.h('div', {},
    U.h('h1', {}, `${board.name} · ${version.label}`),
    U.h('div', { class: 'muted', style: { fontSize: '11.5px', marginTop: '3px' } },
      `${board.sku} · 固件 ${version.firmware} · 发布于 ${U.fmtDate(version.publishedAt)} · ${version.publishedBy}` +
      (version.baseVersionId ? ' · 基线 ' + (board.versions.find((v) => v.id === version.baseVersionId)?.label || '—') : ' · 首版'))
  ));
  head.appendChild(U.h('span', { style: { flex: 1 } }));
  head.appendChild(U.h('span', { class: 'tag green' }, '已发布 · 只读'));
  head.appendChild(U.h('button', { class: 'btn', onclick: () => openPreview({ board, content, title: `${board.name} · ${version.label}`, subtitle: `${version.firmware} · 已发布快照`, readonly: true }) }, '▸ 预览'));
  head.appendChild(U.h('button', {
    class: 'btn primary',
    disabled: !!board.work,
    title: board.work ? '已有进行中的草稿' : '基于该版本创建新草稿',
    onclick: () => openRevision(),
  }, '开修订'));
  main.appendChild(head);

  const body = U.h('div', { class: 'doc-body' });
  main.appendChild(body);

  /* 版本信息 */
  const stats = {
    pinCount: content.pins.length,
    annotated: content.pins.filter((p) => p.name && p.voltage && (p.funcs || []).some((f) => f.label)).length,
  };
  body.appendChild(U.h('div', { class: 'check-grid' },
    card(String(stats.pinCount), '引脚数量'),
    card(U.fmtPct(stats.pinCount ? stats.annotated / stats.pinCount : 0), '已标注比例'),
    card(String((content.layers || []).length), '零件图层'),
    card(String((content.steps || []).length), '装配步骤'),
    card(version.firmware, '对应固件')
  ));

  if (version.changelog) {
    body.appendChild(U.h('div', { class: 'comment', style: { marginBottom: '12px' } },
      U.h('div', { class: 'head' }, U.h('b', {}, '变更说明'), U.h('span', {}, U.fmtDate(version.publishedAt))),
      U.h('div', { class: 'txt' }, version.changelog)));
  }

  /* 导出 */
  body.appendChild(U.h('div', { class: 'section-title' }, '交付物'));
  body.appendChild(U.h('div', { class: 'btn-row', style: { marginBottom: '8px' } },
    U.h('button', { class: 'btn', onclick: () => { exportPinCsv(board, content); U.toast('已导出引脚清单'); } }, '⤓ 引脚清单 CSV'),
    U.h('button', { class: 'btn', onclick: () => { exportStepsSvg(board, content); U.toast('已导出装配步骤图'); } }, '⤓ 装配步骤图 SVG'),
    U.h('button', { class: 'btn', onclick: () => exportDocJson(board, content, `${board.sku}_${version.label}`) }, '⤓ 说明包 JSON')
  ));
  body.appendChild(U.h('p', { class: 'hint' }, '引脚清单供售后检索，步骤图供课程组备课；两者均带版本号与固件版本，便于追溯。'));

  /* 时间线 */
  body.appendChild(U.h('div', { class: 'section-title' }, '版本时间线'));
  const tl = U.h('div', { class: 'timeline' });
  tl.appendChild(tlItem(false, `创建草稿${version.rev ? ' Rev ' + version.rev : ''}`, `基线 ${version.baseVersionId ? (board.versions.find((v) => v.id === version.baseVersionId)?.label || '') : '首版'}`, ''));
  const rv = (board.reviews || []).find((r) => r.id === version.reviewId);
  if (rv) {
    tl.appendChild(tlItem(false, `提交评审 · ${rv.submittedBy}`, U.fmtDate(rv.submittedAt), ''));
    tl.appendChild(tlItem(false, `评审通过 · ${rv.decidedBy || '—'}`, U.fmtDate(rv.decidedAt), rv.decisionNote));
  }
  tl.appendChild(tlItem(false, `发布 ${version.label} · 固件 ${version.firmware}`, `${U.fmtDate(version.publishedAt)} · ${version.publishedBy}`, version.changelog));
  body.appendChild(tl);

  /* 历史版本 */
  if (otherVersions.length > 1) {
    body.appendChild(U.h('div', { class: 'section-title' }, '该型号全部版本'));
    const table = U.h('table', { class: 'grid' },
      U.h('thead', {}, U.h('tr', {}, ['版本', '固件', '发布时间', '发布人', '引脚', '步骤', '说明'].map((h) => U.h('th', {}, h)))),
      U.h('tbody', {}, [...otherVersions].reverse().map(({ version: v }) =>
        U.h('tr', { style: v.id === version.id ? { background: 'rgba(79,214,192,.06)' } : null },
          U.h('td', { class: 'mono' }, v.label),
          U.h('td', { class: 'mono' }, v.firmware),
          U.h('td', {}, U.fmtDay(v.publishedAt)),
          U.h('td', {}, v.publishedBy),
          U.h('td', { class: 'mono' }, String(v.content.pins.length)),
          U.h('td', { class: 'mono' }, String((v.content.steps || []).length)),
          U.h('td', { class: 'muted' }, v.changelog || '—')
        )))
    );
    body.appendChild(U.h('div', { style: { overflowX: 'auto', border: '1px solid var(--line)', borderRadius: '9px' } }, table));
  }

  /* 引脚清单（只读） */
  body.appendChild(U.h('div', { class: 'section-title' }, '引脚清单（快照）'));
  const ptRows = content.pins.map((p, i) => {
    const fnTags = (p.funcs || [])
      .filter((f) => f && String(f.label).trim())
      .map((f) => U.h('span', { class: 'tag', style: { marginRight: '3px' } }, f.label));
    return U.h('tr', {},
      U.h('td', { class: 'mono muted' }, String(i + 1)),
      U.h('td', { class: 'mono' }, p.name || '—'),
      U.h('td', { class: 'mono' }, p.voltage || '—'),
      U.h('td', {}, U.h('span', { class: 'tag', style: { color: GROUP_MAP[p.group]?.color } }, GROUP_MAP[p.group]?.label || '—')),
      U.h('td', {}, fnTags.length ? fnTags : U.h('span', { class: 'muted' }, '—'))
    );
  });
  const pt = U.h('table', { class: 'grid' },
    U.h('thead', {}, U.h('tr', {}, ['#', '引脚', '电压', '分组', '复用功能'].map((h) => U.h('th', {}, h)))),
    U.h('tbody', {}, ptRows)
  );
  body.appendChild(U.h('div', { style: { overflowX: 'auto', border: '1px solid var(--line)', borderRadius: '9px', maxHeight: '420px' } }, pt));

  function card(v, l) {
    return U.h('div', { class: 'check-card' }, U.h('b', {}, v), U.h('small', {}, l));
  }
  function tlItem(reject, title, sub, note) {
    return U.h('div', { class: 'tl-item' + (reject ? ' reject' : '') },
      U.h('span', { class: 'dot' }),
      U.h('div', { class: 'txt' }, U.h('b', {}, title), U.h('small', {}, sub || '—'), note ? U.h('div', { class: 'hint' }, note) : null)
    );
  }

  function openRevision() {
    U.confirm('基于该版本开修订', `将以 ${version.label}（${version.firmware}）创建新的修订草稿。发布后的版本本身不可直接修改。`, '创建修订', () => {
      const ok = store.openRevision(board, version.id);
      if (ok) {
        U.toast('已创建修订草稿');
        nav(`#/board/${board.id}/editor`);
      }
    });
  }

  const unsub = store.subscribe(() => {
    if (!store.board(board.id)) nav('#/boards');
  });
  return { cleanup: () => unsub() };
}
