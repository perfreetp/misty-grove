/* BoardDocs Studio — 评审工作台 */
import { U } from '../util.js';
import {
  store, findConflicts, unlabeledVoltagePins, publishChecks, boardStats, pinConflicts, GROUPS, GROUP_MAP, statusText,
} from '../store.js';
import { openPreview } from '../preview.js';
import { openPublishDialog } from '../publishDialog.js';
import { exportPinCsv, exportStepsSvg } from '../export.js';

export function renderReviews({ host, app, nav, reviewId }) {
  const all = store.allReviews();
  const openList = all.filter((x) => x.review.status === 'in_review');
  const pick = reviewId ? all.find((x) => x.review.id === reviewId) : openList[0] || all[0];
  const filtered = [...all.filter((x) => x.review.status === 'in_review'), ...all.filter((x) => x.review.status !== 'in_review')];

  if (!pick) {
    host.appendChild(U.h('div', { class: 'page' }, U.h('div', { class: 'empty' }, U.h('b', {}, '暂无提交的评审'), '在编辑器中完成说明后提交审核，这里会显示待审版本。')));
    return {};
  }
  const { board, review } = pick;
  const content = review.snapshot || board.work?.content || store.contentFor(board);
  const checks = publishChecks(board, content);
  const conflicts = findConflicts(content);
  const annotated = content.pins.filter((p) => p.name && p.voltage && (p.funcs || []).some((f) => f.label)).length;
  const ratio = content.pins.length ? annotated / content.pins.length : 0;
  const isOpen = review.status === 'in_review';
  const canReview = store.canReview();
  const openComments = review.comments.filter((c) => !c.resolved);

  const wrap = U.h('div', { class: 'review-wrap' });
  host.appendChild(wrap);

  /* ---------- left list ---------- */
  const listCol = U.h('div', { class: 'review-list' });
  listCol.appendChild(U.h('div', { class: 'panel-head', style: { margin: '-10px -10px 6px', padding: '9px 12px' } }, U.h('b', {}, '评审队列'), U.h('span', { class: 'spacer' }), U.h('span', { class: 'tag blue' }, `${openList.length} 待审`)));
  filtered.forEach(({ board: b, review: r }) => {
    listCol.appendChild(U.h('div', { class: 'rv-item' + (r.id === review.id ? ' on' : ''), onclick: () => nav('#/review/' + r.id) },
      U.h('b', {}, b.name),
      U.h('small', {}, `Rev ${r.rev} · ${r.submittedBy} · ${U.rel(r.submittedAt)}`),
      U.h('div', { class: 'row' },
        U.h('span', { class: 'tag ' + (r.status === 'approved' ? 'green' : r.status === 'rejected' ? 'red' : 'blue') }, { approved: '已通过', rejected: '已退回', in_review: '待审核' }[r.status]),
        U.h('span', { class: 'tag' }, `${r.comments.filter((c) => !c.resolved).length} 待处理批注`)
      )
    ));
  });
  if (!filtered.length) listCol.appendChild(U.h('p', { class: 'hint' }, '暂无评审。'));
  wrap.appendChild(listCol);

  /* ---------- main ---------- */
  const main = U.h('div', { class: 'review-main' });
  wrap.appendChild(main);

  const head = U.h('div', { class: 'review-head' });
  head.appendChild(U.h('div', {},
    U.h('h1', {}, `${board.name} · Rev ${review.rev}`),
    U.h('div', { class: 'muted', style: { fontSize: '11.5px', marginTop: '3px' } },
      `${board.sku} · 提交人 ${review.submittedBy} · ${U.fmtDate(review.submittedAt)}` +
      (review.status !== 'in_review' ? ` · ${review.decidedBy} ${review.status === 'approved' ? '通过' : '退回'}于 ${U.fmtDate(review.decidedAt)}` : '') +
      ` · 目标固件 ${review.firmwareTarget || '—'}`)
  ));
  head.appendChild(U.h('span', { style: { flex: 1 } }));
  head.appendChild(U.h('span', { class: 'tag ' + (review.status === 'approved' ? 'green' : review.status === 'rejected' ? 'red' : 'blue'), style: { fontSize: '12px', padding: '3px 10px' } },
    { approved: '已通过', rejected: '已退回', in_review: '待审核' }[review.status]));
  head.appendChild(U.h('button', { class: 'btn', onclick: () => openPreview({ board, content, title: `${board.name} · Rev ${review.rev}`, subtitle: '评审快照预览', readonly: true }) }, '▸ 预览快照'));
  head.appendChild(U.h('button', { class: 'btn', onclick: () => { exportPinCsv(board, content); } }, '⤓ 引脚清单'));
  main.appendChild(head);

  const body = U.h('div', { class: 'review-body' });
  main.appendChild(body);

  /* summary */
  const grid = U.h('div', { class: 'check-grid' });
  const card = (v, l, cls) => U.h('div', { class: 'check-card ' + (cls || '') }, U.h('b', {}, v), U.h('small', {}, l));
  grid.appendChild(card(`${content.pins.length}`, '引脚总数'));
  grid.appendChild(card(U.fmtPct(ratio), '已标注比例', ratio >= 0.99 ? '' : 'bad'));
  grid.appendChild(card(`${unlabeledVoltagePins(content).length}`, '未标电压（阻断）', unlabeledVoltagePins(content).length ? 'bad' : ''));
  grid.appendChild(card(`${conflicts.length}`, '功能重复占用', conflicts.length ? 'bad' : ''));
  grid.appendChild(card(`${(content.steps || []).length}`, '装配步骤'));
  grid.appendChild(card(`${(content.layers || []).length}`, '零件图层'));
  body.appendChild(grid);

  if (review.note) {
    body.appendChild(U.h('div', { class: 'comment' }, U.h('div', { class: 'head' }, U.h('b', {}, '提交说明'), U.h('span', {}, U.rel(review.submittedAt))), U.h('div', { class: 'txt' }, review.note)));
  }
  if (review.status === 'rejected' && review.decisionNote) {
    body.appendChild(U.h('div', { class: 'issue blocking' }, U.h('div', { class: 'body' }, U.h('b', {}, '退回原因'), U.h('small', {}, review.decisionNote))));
  }

  /* checks */
  body.appendChild(U.h('div', { class: 'section-title' }, '发布检查'));
  if (!checks.blockers.length && !checks.warnings.length) {
    body.appendChild(U.h('div', { class: 'ok-row' }, '✓ 全部检查通过，可以发布'));
  } else {
    checks.blockers.forEach((b) => body.appendChild(issueRow(b, true, review, content)));
    checks.warnings.slice(0, 12).forEach((b) => body.appendChild(issueRow(b, false, review, content)));
    if (checks.warnings.length > 12) body.appendChild(U.h('p', { class: 'hint' }, `还有 ${checks.warnings.length - 12} 条提醒未展开。`));
  }

  /* pins table */
  body.appendChild(U.h('div', { class: 'section-title' }, '引脚清单'));
  const pinTable = U.h('table', { class: 'grid' });
  const headRow = U.h('tr', {}, ['#', '引脚', '电压', '分组', '复用功能', '批注', ''].map((h) => U.h('th', {}, h)));
  pinTable.appendChild(U.h('thead', {}, headRow));
  const tb = U.h('tbody');
  content.pins.forEach((p, i) => {
    const pcs = pinConflicts(p);
    const cms = review.comments.filter((c) => c.targetType === 'pin' && c.targetId === p.id);
    tb.appendChild(U.h('tr', {},
      U.h('td', { class: 'mono muted' }, String(i + 1)),
      U.h('td', { class: 'mono' }, p.name || U.h('span', { class: 'muted' }, '(未命名)')),
      U.h('td', { class: 'mono', style: !p.voltage ? { color: 'var(--red)' } : null }, p.voltage || '未标注'),
      U.h('td', {}, U.h('span', { class: 'tag', style: { color: GROUP_MAP[p.group]?.color } }, GROUP_MAP[p.group]?.label || '—')),
      U.h('td', {}, (p.funcs || []).map((f) => U.h('span', { class: 'tag ' + (pcs.some((c) => c.name === f.label) ? 'red' : '') , style: { marginRight: '3px', marginBottom: '2px' } }, f.label)).filter((e) => e.textContent.trim())),
      U.h('td', {}, cms.length ? U.h('span', { class: 'tag amber' }, `${cms.length} 条`) : U.h('span', { class: 'muted' }, '—')),
      U.h('td', {}, isOpen ? U.h('button', { class: 'icon-btn', title: '对该引脚批注', onclick: () => focusComment('pin', p.id, `引脚 ${p.name}`) }, '✎') : null)
    ));
  });
  pinTable.appendChild(tb);
  body.appendChild(U.h('div', { style: { overflowX: 'auto', border: '1px solid var(--line)', borderRadius: '9px' } }, pinTable));

  /* steps */
  body.appendChild(U.h('div', { class: 'section-title' }, '装配步骤'));
  (content.steps || []).forEach((s, i) => {
    const cms = review.comments.filter((c) => c.targetType === 'step' && c.targetId === s.id);
    const parts = (s.layerIds || [])
      .map((id) => (content.layers.find((l) => l.id === id) || {}).name || '?')
      .join(' + ');
    const sub = `${s.action === 'install' ? '安装' : '拆卸'} · ${parts || '未指定零件'}${s.note ? ' · ' + s.note : ''}`;
    const acts = U.h('div', { class: 'act' });
    if (cms.length) acts.appendChild(U.h('span', { class: 'tag amber' }, `${cms.length} 条`));
    if (isOpen) {
      acts.appendChild(U.h('button', {
        class: 'btn small',
        onclick: () => focusComment('step', s.id, `第 ${i + 1} 步 · ${s.title || ''}`),
      }, '✎ 批注'));
    }
    body.appendChild(U.h('div', {
      class: 'issue ' + (s.action === 'install' ? 'info' : ''),
      style: { borderLeftColor: s.action === 'install' ? 'var(--blue)' : 'var(--amber)' },
    },
      U.h('div', { class: 'body' }, U.h('b', {}, `${i + 1}. ${s.title || '(未命名)'}`), U.h('small', {}, sub)),
      acts
    ));
  });

  /* comments */
  const cTitle = U.h('div', { class: 'section-title' }, `批注 ${review.comments.length}`);
  body.appendChild(cTitle);
  const cWrap = U.h('div', { id: 'comment-wrap' });
  body.appendChild(cWrap);
  renderComments();

  /* decision */
  body.appendChild(U.h('div', { class: 'section-title' }, '评审结论'));
  if (isOpen) {
    const note = U.h('textarea', { rows: 3, placeholder: '结论说明 / 退回原因（退回时必填）' });
    const form = U.h('div', { class: 'comment-form' },
      U.h('div', { class: 'col' }, note),
      U.h('div', { class: 'stack', style: { gap: '6px' } },
        U.h('button', {
          class: 'btn primary',
          disabled: checks.blockers.length > 0,
          title: checks.blockers.length ? '存在发布阻断项，需退回让编辑补齐后再通过' : '',
          onclick: () => {
            if (!canReview) { U.toast('请切换到评审员账号（右上角）', 'warn'); return; }
            if (openComments.length) { U.toast(`还有 ${openComments.length} 条批注未标记解决`, 'warn'); return; }
            if (store.approve(board, review.id, note.value.trim())) {
              U.toast('评审已通过，可生成发布版本');
              nav('#/review/' + review.id);
            }
          },
        }, '通过'),
        U.h('button', {
          class: 'btn danger',
          onclick: () => {
            if (!canReview) { U.toast('请切换到评审员账号（右上角）', 'warn'); return; }
            if (!note.value.trim()) { U.toast('退回必须填写原因', 'warn'); note.focus(); return; }
            if (store.reject(board, review.id, note.value.trim())) {
              U.toast('已退回给编辑');
              nav('#/review/' + review.id);
            }
          },
        }, '退回')
      )
    );
    if (!canReview) body.appendChild(U.h('p', { class: 'hint' }, `当前账号「${store.currentUser().name}」为${store.currentUser().role}，无评审权限。可在右上角切换为评审员。`));
    if (checks.blockers.length) {
      body.appendChild(U.h('p', { class: 'hint', style: { color: 'var(--red)' } }, `存在 ${checks.blockers.length} 个发布阻断项（未标注电压的引脚），通过前需要编辑补齐，或直接退回说明原因。`));
    }
    body.appendChild(form);
  } else {
    body.appendChild(U.h('div', { class: 'comment' },
      U.h('div', { class: 'head' }, U.h('b', {}, review.decidedBy || '—'), U.h('span', {}, `${review.status === 'approved' ? '通过' : '退回'} · ${U.fmtDate(review.decidedAt)}`)),
      U.h('div', { class: 'txt' }, review.decisionNote || '—')
    ));
    if (review.status === 'approved') {
      body.appendChild(U.h('div', { class: 'btn-row' },
        U.h('button', { class: 'btn primary', onclick: () => openPublish() }, '生成发布版本'),
        review.decisionNote ? null : null
      ));
    } else if (review.status === 'rejected') {
      body.appendChild(U.h('div', { class: 'btn-row' }, U.h('button', { class: 'btn', onclick: () => nav(`#/board/${board.id}/editor`) }, '前往编辑器修改')));
    }
  }

  /* ---------- helpers ---------- */
  function renderComments() {
    U.clear(cWrap);
    cTitle.textContent = `批注 ${review.comments.length}`;
    const openTag = listCol.querySelector('.rv-item.on .tag:last-child');
    if (openTag) openTag.textContent = `${review.comments.filter((c) => !c.resolved).length} 待处理批注`;
    const cms = [...review.comments];
    const general = cms.filter((c) => c.targetType === 'general' || !c.targetId);
    const ordered = [...general, ...cms.filter((c) => c.targetType !== 'general' && c.targetId)];
    if (!ordered.length) {
      cWrap.appendChild(U.h('div', { class: 'empty', style: { padding: '18px' } }, U.h('b', {}, '还没有批注'), '点击引脚行或步骤右侧的 ✎ 发起逐条批注，或直接在下方的输入框添加整体批注。'));
    }
    ordered.forEach((c) => {
      cWrap.appendChild(U.h('div', { class: 'comment' + (c.resolved ? ' resolved' : '') },
        U.h('div', { class: 'head' },
          U.h('b', {}, c.author), U.h('span', { class: 'tag' }, c.role),
          c.carriedFrom ? U.h('span', { class: 'tag violet', title: '上一轮退回时提出，本轮需确认已处理' }, `上一轮 · Rev ${c.carriedFrom}`) : null,
          U.h('span', {}, U.rel(c.at)),
          U.h('span', { style: { flex: 1 } }),
          c.resolved ? U.h('span', { class: 'tag green' }, '已解决') : U.h('span', { class: 'tag amber' }, '待处理'),
          isOpen ? U.h('button', { class: 'btn small', onclick: () => store.resolveComment(board, review.id, c.id) }, c.resolved ? '重新打开' : '标记解决') : null
        ),
        c.targetLabel ? U.h('div', { class: 'quote' }, '↳ ' + c.targetLabel) : null,
        U.h('div', { class: 'txt' }, c.text)
      ));
    });
    if (isOpen) {
      const note = U.h('textarea', { rows: 2, placeholder: '整体批注…' });
      cWrap.appendChild(U.h('div', { class: 'comment-form' },
        U.h('div', { class: 'col' }, note),
        U.h('button', { class: 'btn', onclick: () => { addComment({ targetType: 'general', targetId: null, targetLabel: '整体', text: note.value }); note.value = ''; } }, '添加批注')
      ));
    }
  }

  function addComment(payload) {
    if (!canReview) { U.toast('请切换到评审员账号（右上角）', 'warn'); return; }
    if (!payload.text || !payload.text.trim()) { U.toast('批注内容不能为空', 'warn'); return; }
    const ok = store.addComment(board, review.id, payload);
    if (ok) {
      U.toast('批注已添加');
      renderComments();
      refreshLight();
    }
  }

  function focusComment(type, id, label) {
    if (!isOpen) { U.toast('该评审已结束', 'warn'); return; }
    if (!canReview) { U.toast('请切换到评审员账号（右上角）', 'warn'); return; }
    const ta = U.h('textarea', { rows: 3, placeholder: '针对这一项的批注…' });
    U.modal({
      title: '添加批注',
      body: U.h('div', { class: 'stack' },
        U.h('div', { class: 'quote', style: { fontSize: '11.5px' } }, '↳ ' + label),
        ta,
        U.h('p', { class: 'hint', style: { margin: 0 } }, '批注会关联到具体对象，编辑在修改时可以直接看到。')
      ),
      actions: [{ label: '取消' }, { label: '添加批注', kind: 'primary', onClick: () => { addComment({ targetType: type, targetId: id, targetLabel: label, text: ta.value }); } }],
    });
  }

  function issueRow(b, blocking, rv, cont) {
    const el = U.h('div', { class: 'issue' + (blocking ? ' blocking' : '') },
      U.h('div', { class: 'body' }, U.h('b', {}, b.title), U.h('small', {}, b.detail)),
      U.h('div', { class: 'act' },
        b.targetId ? U.h('button', { class: 'btn small', onclick: () => focusComment(b.targetType, b.targetId, b.title) }, blocking ? '批注并要求修复' : '批注') : null
      )
    );
    return el;
  }

  function openPublish() {
    openPublishDialog({ board, content, onPublished: (v) => nav('#/published/' + v.id) });
  }

  function refreshLight() {
    // 局部刷新副标题中的批注数量
    const headSmall = head.querySelector('.muted');
    if (headSmall) {
      headSmall.textContent =
        `${board.sku} · 提交人 ${review.submittedBy} · ${U.fmtDate(review.submittedAt)}` +
        (review.status !== 'in_review' ? ` · ${review.decidedBy} ${review.status === 'approved' ? '通过' : '退回'}于 ${U.fmtDate(review.decidedAt)}` : '') +
        ` · 目标固件 ${review.firmwareTarget || '—'}`;
    }
  }

  const unsub = store.subscribe((reason) => {
    if (!store.board(board.id)) { nav('#/review'); return; }
    if (['comment', 'approve', 'reject', 'user', 'reset', 'import'].includes(reason)) {
      if (app.rerender) app.rerender();
    }
  });

  return {
    cleanup() {
      unsub();
    },
  };
}
