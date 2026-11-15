import { FINDING_META, SEGMENT_META } from '../constants';
import { store } from '../store';
import type { Exam, ReportVersion, ValidationIssue } from '../types';
import { downloadText, formatClock, formatDuration, formatSize, formatWhen, formatWhenFull, summarize } from '../utils';
import { bindActions, html, icon, openModal, raw, toast } from '../ui';
import type { ViewInstance } from './types';

export function createReportView(): ViewInstance {
  let root: HTMLElement | null = null;
  let examRef: Exam | null = null;
  let lastSignature = '';
  let conclusionDrafts: Record<string, { conclusion: string; impression: string }> = {};
  let reviewComment = '';

  function current(): Exam | undefined {
    return store.selectedExam();
  }

  function signature(e: Exam | undefined): string {
    if (!e) return 'none';
    return [
      e.id,
      e.status,
      e.findings.length,
      e.reportVersions.map((v) => `${v.version}:${v.status}`).join(','),
      e.assessments.map((a) => `${a.readerId}:${a.submittedAt ?? 0}`).join(','),
      e.returnCount,
      e.amendment?.status ?? '-',
      store.state.currentUserId,
    ].join('|');
  }

  function readerIdFor(e: Exam): string {
    return store.activeReaderId(e);
  }

  function syncDrafts(e: Exam): void {
    for (const id of e.readers) {
      const a = store.assessmentFor(e, id);
      const existing = conclusionDrafts[id];
      if (!existing) {
        conclusionDrafts[id] = { conclusion: a?.conclusion ?? '', impression: a?.impression ?? '' };
      }
    }
  }

  function draftFor(id: string): { conclusion: string; impression: string } {
    return conclusionDrafts[id] ?? { conclusion: '', impression: '' };
  }

  function commitDraft(e: Exam, id: string): void {
    const d = draftFor(id);
    const a = store.assessmentFor(e, id);
    if ((a?.conclusion ?? '') === d.conclusion && (a?.impression ?? '') === d.impression) return;
    store.updateAssessment(e, id, { conclusion: d.conclusion.trim(), impression: d.impression.trim() });
  }

  function banner(e: Exam): ReturnType<typeof html> {
    const user = store.currentUser();
    const meta = e.status;
    if (meta === 'pending') {
      return html`<div class="report-banner">
        <div class="banner-icon">${icon('clock')}</div>
        <div class="banner-main">
          <div class="banner-title">检查单尚未开始阅片</div>
          <div class="banner-sub">请先在「时间轴阅片」中开始阅片并登记病灶，提交后才能进入报告审核。</div>
        </div>
        <div class="banner-actions"><button class="btn" data-act="goto-reading">${icon('reading')}去阅片</button></div>
      </div>`;
    }
    if (meta === 'reading') {
      const waiting = store.pendingReaders(e).map((id) => e.readerNames[id] ?? id);
      const canSubmit = user.role === 'reader';
      const issues = store.validateForSubmit(e).issues;
      return html`<div class="report-banner">
        <div class="banner-icon">${icon('edit')}</div>
        <div class="banner-main">
          <div class="banner-title">阅片中 · 待提交${waiting.length ? `（等待 ${waiting.join('、')}）` : ''}</div>
          <div class="banner-sub">${issues.length === 0 ? '所有必填项已就绪，可提交审核。' : `${issues.length} 项未完成，提交将被拦截。`}</div>
        </div>
        <div class="banner-actions">
          <button class="btn" data-act="goto-reading">${icon('reading')}继续阅片</button>
          <button class="btn primary" data-act="submit-read" ${canSubmit ? '' : raw('disabled')}>${icon('check')}提交审核</button>
        </div>
      </div>`;
    }
    if (meta === 'review') {
      return html`<div class="report-banner warn">
        <div class="banner-icon">${icon('report')}</div>
        <div class="banner-main">
          <div class="banner-title">待审核 · 报告已送审</div>
          <div class="banner-sub">${e.submittedAt ? `提交于 ${formatWhenFull(e.submittedAt)}` : ''} · 审核医师可核对病灶、结论差异后发布或退回。</div>
        </div>
        <div class="banner-actions"><span class="tag amber" style="padding:4px 10px">等待审核</span></div>
      </div>`;
    }
    if (meta === 'returned') {
      const r = e.lastReturn;
      return html`<div class="report-banner rose">
        <div class="banner-icon">${icon('undo')}</div>
        <div class="banner-main">
          <div class="banner-title">报告已退回 · 需修改后重新提交</div>
          <div class="banner-sub">${r ? `${r.byName} 于 ${formatWhen(r.at)} 退回：${r.comment}` : ''}</div>
        </div>
        <div class="banner-actions">
          <button class="btn" data-act="goto-reading">${icon('reading')}返回阅片</button>
          <button class="btn primary" data-act="submit-read" ${user.role === 'reader' ? '' : raw('disabled')}>${icon('check')}重新提交</button>
        </div>
      </div>`;
    }
    const published = e.reportVersions.find((v) => v.status === 'published');
    const amendment = e.amendment;
    const draftVersion = amendment
      ? e.reportVersions.find((v) => v.id === amendment.draftVersionId)
      : undefined;
    const returnedAmendment = Boolean(amendment?.returnedAt);
    return html`<div class="report-banner ${returnedAmendment ? 'warn' : 'emerald'}">
      <div class="banner-icon">${icon(returnedAmendment ? 'undo' : 'check')}</div>
      <div class="banner-main">
        <div class="banner-title">
          已发布${amendment ? ` · 更正版本 v${draftVersion?.version ?? (published?.version ?? 1) + 1} ${returnedAmendment ? '被退回，待修改' : '编辑中'}` : ''}
        </div>
        <div class="banner-sub">
          ${published ? `报告 v${published.version} 由 ${published.reviewerName ?? ''} 于 ${formatWhenFull(published.publishedAt)} 发布` : ''}
          ${amendment ? ` · 更正原因：${amendment.reason}` : ''}
          ${returnedAmendment ? ` · 审核意见：${amendment?.returnedComment}` : ''}
        </div>
      </div>
      <div class="banner-actions">
        <button class="btn" data-act="export-report">${icon('download')}导出报告</button>
        ${amendment
          ? html`<button class="btn primary" data-act="submit-read" ${user.role === 'reader' ? '' : raw('disabled')}>${icon('check')}${returnedAmendment ? '重新提交更正' : '提交更正'}</button>`
          : html`<button class="btn warn" data-act="start-amendment" ${user.role === 'reader' || user.role === 'reviewer' ? '' : raw('disabled')}>${icon('history')}发起更正版本</button>`}
      </div>
    </div>`;
  }

  function findingsTable(e: Exam): ReturnType<typeof html> {
    if (e.findings.length === 0) {
      return html`<div class="empty" style="padding:26px 10px">${icon('lesions')}
        <div class="empty-title">未登记病灶</div>
        <div class="empty-sub">若确未见异常，请在镜下结论中写明“未见明显异常”。</div></div>`;
    }
    return html`<table class="finding-table">
      <thead>
        <tr><th>#</th><th>类型</th><th>大小</th><th>位置</th><th>关键帧</th><th>描述</th><th>登记人</th></tr>
      </thead>
      <tbody>
        ${e.findings.map((f, i) => {
          const seg = store.segmentAt(e, f.frameIndex);
          const warn = f.sizeMm === null || f.keyframes.length === 0;
          return html`<tr class="${warn ? 'row-warn' : ''}">
            <td class="mono">${i + 1}</td>
            <td><span class="type-tag"><span class="legend-dot" style="background:${FINDING_META[f.type].color}"></span>${FINDING_META[f.type].label}</span></td>
            <td class="mono">${f.sizeMm === null ? html`<span class="badge-err">空</span>` : formatSize(f.sizeMm)}</td>
            <td>${SEGMENT_META[seg].name} · F${f.frameIndex + 1}</td>
            <td class="mono">${f.keyframes.length === 0 ? html`<span class="badge-err">0</span>` : `${f.keyframes.length} 张`}</td>
            <td style="max-width:190px;color:var(--text-dim)">${f.note || '—'}</td>
            <td>${f.authorName}</td>
          </tr>`;
        })}
      </tbody>
    </table>`;
  }

  function readerCards(e: Exam): ReturnType<typeof html> {
    const user = store.currentUser();
    const activeId = readerIdFor(e);
    const editable = store.conclusionEditable(e) && user.role === 'reader';
    return html`${e.readers.map((id) => {
      const a = store.assessmentFor(e, id);
      const d = draftFor(id);
      const name = e.readerNames[id] ?? id;
      const isMine = id === activeId && user.role === 'reader';
      const conclusion = isMine && editable ? d.conclusion : a?.conclusion ?? '';
      const submitted = Boolean(a?.submittedAt);
      return html`<div class="reader-card ${submitted ? 'submitted' : ''}">
        <div class="reader-head">
          <span class="reader-avatar">${name.slice(0, 1)}</span>
          <span class="reader-name">${name}${isMine ? '（我）' : ''}</span>
          ${e.dualReading ? html`<span class="tag">双阅</span>` : ''}
          <span class="reader-state ${submitted ? 'done' : 'wait'}">${submitted ? `已提交 ${formatWhen(a?.submittedAt)}` : '待提交'}</span>
        </div>
        ${isMine && editable
          ? html`<textarea class="textarea" rows="3" data-conclusion="${id}" placeholder="填写镜下结论，例如：回肠末段纵行溃疡，考虑克罗恩病">${conclusion}</textarea>`
          : html`<div class="reader-conclusion ${conclusion ? '' : 'empty'}">${conclusion || '尚未填写镜下结论'}</div>`}
        <div class="reader-meta">
          <span>${icon('clock')} 阅片时长 ${formatDuration(a?.readingSeconds ?? 0)}</span>
          ${a?.startedAt ? html`<span>开始 ${formatWhen(a.startedAt)}</span>` : html`<span>未开始</span>`}
        </div>
      </div>`;
    })}`;
  }

  function diffPanel(e: Exam): ReturnType<typeof html> {
    if (!e.dualReading || e.readers.length < 2) return html``;
    const rows = store.conclusionDiff(e);
    const disagree = store.hasConclusionDisagreement(e);
    const anyEmpty = rows.some((r) => !r.conclusion);
    return html`<div class="diff-panel">
      <div class="diff-head">${icon(disagree ? 'alert' : 'check')}双人阅片结论${disagree ? '存在差异' : anyEmpty ? '待两位阅片人填写' : '一致'}</div>
      ${anyEmpty && !disagree
        ? html`<div class="hint">两人结论尚未全部填写，提交后此处会并列展示并可对比差异。</div>`
        : html`<div class="diff-cols">
            ${rows.map(
              (r) => html`<div class="diff-col">
                <div class="diff-col-name">${r.readerName}</div>
                <div class="diff-col-text">${r.conclusion || '—'}</div>
              </div>`,
            )}
          </div>`}
      ${disagree ? html`<div class="diff-only">${icon('info')}审核医师需确认差异原因，并在审核意见中说明采纳依据</div>` : ''}
    </div>`;
  }

  function versionsPanel(e: Exam): ReturnType<typeof html> {
    const versions = [...e.reportVersions].sort((a, b) => b.version - a.version);
    if (versions.length === 0) {
      return html`<div class="hint" style="padding:6px 0">暂无报告版本。阅片人提交后自动生成 v1。</div>`;
    }
    return html`<div class="version-list">
      ${versions.map((v) => {
        const isCurrent = v.status === 'published';
        const cls = v.status === 'draft' ? 'draft' : isCurrent ? 'current' : 'old';
        return html`<div class="version-item ${cls}">
          <div class="version-head">
            <span class="version-num">v${v.version}</span>
            ${versionBadge(v)}
            ${v.replacesVersion ? html`<span class="tag">替代 v${v.replacesVersion}</span>` : ''}
            <span class="version-foot" style="margin-left:auto">
              ${v.publishedAt ? formatWhen(v.publishedAt) : v.submittedAt ? `送审 ${formatWhen(v.submittedAt)}` : `创建 ${formatWhen(v.createdAt)}`}
            </span>
          </div>
          ${v.amendmentReason ? html`<div class="reason-line">${icon('history')}更正原因：${v.amendmentReason}</div>` : ''}
          <div class="version-body">${summarize(v.conclusion, 140) || '（结论为空）'}</div>
          <div class="snapshot-strip">
            ${v.findingsSnapshot.length === 0
              ? html`<span class="snap-chip">无病灶</span>`
              : v.findingsSnapshot.map(
                  (f) => html`<span class="snap-chip"><span class="legend-dot" style="background:${FINDING_META[f.type].color}"></span>${f.segmentName} ${formatSize(f.sizeMm)} · ${f.keyframeCount}帧</span>`,
                )}
          </div>
          <div class="version-foot">
            <span class="author">${icon('user')} ${v.authorName}</span>
            ${v.reviewerName ? html`<span>审核 ${v.reviewerName}</span>` : ''}
            ${v.reviewComment ? html`<span>意见：${summarize(v.reviewComment, 40)}</span>` : ''}
          </div>
        </div>`;
      })}
    </div>`;
  }

  function versionBadge(v: ReportVersion): ReturnType<typeof html> {
    switch (v.status) {
      case 'published':
        return html`<span class="status-badge emerald">当前发布</span>`;
      case 'pending':
        return html`<span class="status-badge amber">待审核</span>`;
      case 'draft':
        return html`<span class="status-badge cyan">更正草稿</span>`;
      case 'returned':
        return html`<span class="status-badge rose">已退回</span>`;
      default:
        return html`<span class="status-badge slate">历史版本</span>`;
    }
  }

  function reviewPanel(e: Exam): ReturnType<typeof html> {
    const user = store.currentUser();
    const canReview = user.role === 'reviewer' && e.status === 'review';
    if (e.status !== 'review') {
      if (user.role !== 'reviewer') return html``;
      const lastReview = [...e.reportVersions].reverse().find((v) => v.reviewedAt);
      return html`<div class="panel">
        <div class="panel-head"><span class="panel-title"><span class="accent-bar"></span>审核记录</span></div>
        <div class="panel-body">
          ${lastReview
            ? html`<div class="kv"><span class="k">最近审核</span><span class="v">${lastReview.reviewerName ?? '—'} · ${formatWhen(lastReview.reviewedAt)}</span></div>
                ${lastReview.reviewComment ? html`<div class="note-block" style="margin-top:8px">${lastReview.reviewComment}</div>` : ''}`
            : html`<div class="hint">尚无审核记录。</div>`}
          ${e.lastReturn ? html`<div class="schedule-note" style="margin-top:8px">${icon('undo')}上次退回：${e.lastReturn.comment}</div>` : ''}
        </div>
      </div>`;
    }
    const disagree = store.hasConclusionDisagreement(e);
    return html`<div class="panel">
      <div class="panel-head">
        <span class="panel-title"><span class="accent-bar"></span>审核意见</span>
        ${disagree ? html`<span class="tag amber">${icon('alert')}结论存在差异</span>` : ''}
      </div>
      <div class="panel-body">
        <div class="review-box">
          ${disagree ? html`<div class="notice warn">${icon('alert')}<div>两位阅片人的镜下结论不一致，请在意见中说明采纳哪一结论及依据。</div></div>` : ''}
          <textarea class="textarea" rows="4" data-review-comment placeholder="审核意见（退回时必填）">${reviewComment}</textarea>
          <div class="review-actions">
            <button class="btn danger" data-act="return-report" ${canReview ? '' : raw('disabled')}>${icon('undo')}退回修改</button>
            <button class="btn primary" data-act="publish-report" ${canReview ? '' : raw('disabled')}>${icon('check')}审核通过并发布</button>
          </div>
          ${user.role !== 'reviewer' ? html`<div class="hint">当前身份不可审核，请切换为「陈思远 · 审核医师」。</div>` : ''}
        </div>
      </div>
    </div>`;
  }

  function auditPanel(e: Exam): ReturnType<typeof html> {
    const events = store.state.audit.filter((a) => a.examId === e.id).slice(0, 14);
    return html`<div class="panel">
      <div class="panel-head"><span class="panel-title"><span class="accent-bar"></span>操作轨迹</span><span class="tag">${events.length}</span></div>
      <div class="panel-body" style="padding:6px 12px">
        <div class="audit-list">
          ${events.length === 0 ? html`<div class="hint">暂无记录</div>` : events.map(
            (ev) => html`<div class="audit-row">
              <span class="audit-dot"></span>
              <span class="audit-msg">${ev.message}</span>
              <span class="audit-time">${formatWhen(ev.at)}</span>
            </div>`,
          )}
        </div>
      </div>
    </div>`;
  }

  function render(): void {
    if (!root) return;
    const e = current();
    if (!e) {
      root.innerHTML = String(html`<div class="empty" style="height:100%">${icon('report')}
        <div class="empty-title">请从左侧选择一条检查单</div>
        <div class="empty-sub">报告审核汇总镜下结论、病灶清单与双人阅片差异，并管理版本与更正。</div></div>`);
      return;
    }
    syncDrafts(e);
    lastSignature = signature(e);
    const user = store.currentUser();
    const published = e.reportVersions.find((v) => v.status === 'published');
    const editable = user.role === 'reader' && store.conclusionEditable(e);
    root.innerHTML = String(html`
      <div class="report-view">
        <div class="view-head">
          <div>
            <h1 class="view-title">报告审核</h1>
            <div class="view-sub">${e.code} · ${e.patientName}（${e.patientSex} ${e.patientAge} 岁）· ${e.readers.map((id) => e.readerNames[id] ?? id).join(' / ')}</div>
          </div>
          <div style="display:flex;gap:8px;align-items:center">
            <span class="tag">${e.findings.length} 处病灶</span>
            <span class="tag">${e.reportVersions.length} 个版本</span>
            <span class="tag">退回 ${e.returnCount} 次</span>
          </div>
        </div>
        ${banner(e)}
        <div class="report-grid">
          <div class="report-col">
            <div class="panel">
              <div class="panel-head">
                <span class="panel-title"><span class="accent-bar"></span>阅片结论</span>
                <span class="hint">${editable ? '编辑后自动保存' : '当前不可编辑'}</span>
              </div>
              <div class="panel-body" style="display:flex;flex-direction:column;gap:9px">
                ${readerCards(e)}
                ${diffPanel(e)}
              </div>
            </div>
            <div class="panel">
              <div class="panel-head">
                <span class="panel-title"><span class="accent-bar"></span>病灶清单</span>
                <button class="btn sm ghost" data-act="goto-lesions">${icon('lesions')}打开标注</button>
              </div>
              <div class="panel-body" style="padding:4px 8px 8px">${findingsTable(e)}</div>
            </div>
            ${reviewPanel(e)}
          </div>
          <div class="report-col">
            ${published
              ? html`<div class="panel">
                  <div class="panel-head"><span class="panel-title"><span class="accent-bar"></span>当前发布报告</span><span class="tag mono">v${published.version}</span></div>
                  <div class="panel-body">
                    <div class="reader-conclusion">${published.conclusion || '—'}</div>
                    <div class="divider"></div>
                    <div class="kv"><span class="k">审核医师</span><span class="v">${published.reviewerName ?? '—'}</span></div>
                    <div class="kv"><span class="k">发布时间</span><span class="v mono">${formatWhenFull(published.publishedAt)}</span></div>
                    <div class="kv"><span class="k">阅片人</span><span class="v">${published.readerConclusions.map((r) => r.readerName).join(' / ')}</span></div>
                  </div>
                </div>`
              : ''}
            <div class="panel">
              <div class="panel-head">
                <span class="panel-title"><span class="accent-bar"></span>报告版本</span>
                <span class="hint">更正保留旧版</span>
              </div>
              <div class="panel-body">${versionsPanel(e)}</div>
            </div>
            ${auditPanel(e)}
            <div class="panel">
              <div class="panel-head"><span class="panel-title"><span class="accent-bar"></span>检查信息</span></div>
              <div class="panel-body">
                <div class="kv"><span class="k">适应证</span><span class="v" style="max-width:210px">${e.indication}</span></div>
                <div class="kv"><span class="k">图像来源</span><span class="v">${e.source.kind === 'generated' ? '演示序列' : `本地导入 ${e.source.frameCount} 帧`}</span></div>
                <div class="kv"><span class="k">登记</span><span class="v">${e.registeredByName} · ${formatWhen(e.registeredAt)}</span></div>
                <div class="kv"><span class="k">分段修正</span><span class="v">${e.segments.filter((s) => s.startAdjustedBy || s.endAdjustedBy).length} 处</span></div>
                ${e.notes ? html`<div class="divider"></div><div class="hint">${e.notes}</div>` : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
    bindInputs();
  }

  function bindInputs(): void {
    root?.querySelectorAll<HTMLTextAreaElement>('[data-conclusion]').forEach((ta) => {
      const id = ta.dataset.conclusion!;
      ta.addEventListener('input', () => {
        const d = draftFor(id);
        conclusionDrafts[id] = { ...d, conclusion: ta.value };
      });
      ta.addEventListener('blur', () => {
        const e = current();
        if (!e) return;
        commitDraft(e, id);
      });
    });
    const rc = root?.querySelector<HTMLTextAreaElement>('[data-review-comment]');
    rc?.addEventListener('input', () => {
      reviewComment = rc.value;
    });
  }

  async function validateAndGo(submit: (e: Exam) => Promise<void>): Promise<void> {
    const e = current();
    if (!e) return;
    const res = store.validateForSubmit(e);
    if (!res.ok) {
      showIssues(e, res.issues);
      return;
    }
    await submit(e);
  }

  function showIssues(e: Exam, issues: ValidationIssue[]): void {
    const sizeIssues = issues.filter((i) => i.code === 'missing-size' || i.code === 'missing-keyframe');
    openModal({
      title: '提交被拦截',
      subtitle: `${e.code} · ${e.patientName}`,
      body: String(html`
        <div class="notice warn" style="margin-bottom:12px">${icon('alert')}<div>以下必填项尚未完成，请补全后重新提交：</div></div>
        <div style="display:flex;flex-direction:column;gap:6px">
          ${issues.map(
            (i) => html`<div class="issue-row">
              <span class="issue-dot"></span>
              <span>${i.message}</span>
            </div>`,
          )}
        </div>
        ${sizeIssues.length ? html`<div class="hint" style="margin-top:12px">提示：每个病灶必须填写估计大小，并至少绑定一张关键帧（在「病灶标注」中切到目标帧后点击“绑定当前帧”）。</div>` : ''}
      `),
      footer: String(html`
        <button class="btn" data-close>知道了</button>
        <button class="btn primary" data-goto>${icon('lesions')}去补全病灶</button>
      `),
      onMount: (r, close) => {
        r.querySelector('[data-goto]')?.addEventListener('click', () => {
          close();
          store.setView('lesions');
        });
      },
    });
  }

  function openAmendmentDialog(e: Exam): void {
    openModal({
      title: '发起更正版本',
      subtitle: `${e.code} · 当前发布 v${e.reportVersions.find((v) => v.status === 'published')?.version ?? 1}`,
      body: String(html`
        <div class="field">
          <span class="field-label">更正原因<span class="req">*</span></span>
          <textarea class="textarea" id="amendReason" rows="3" placeholder="例如：补充息肉山田分型描述"></textarea>
        </div>
        <div class="hint" style="margin-top:9px">更正将生成新版本草稿，原发布版本保留在版本记录中；更正版本经审核发布后，原版本标记为历史版本。</div>
      `),
      footer: String(html`<button class="btn" data-close>取消</button><button class="btn primary" data-ok>生成更正草稿</button>`),
      onMount: (r, close) => {
        const ta = r.querySelector<HTMLTextAreaElement>('#amendReason');
        ta?.focus();
        r.querySelector('[data-ok]')?.addEventListener('click', async () => {
          const reason = ta?.value ?? '';
          if (!reason.trim()) {
            toast('请填写更正原因', 'err');
            return;
          }
          const res = await store.startAmendment(store.examById(e.id) ?? e, reason);
          if (!res.ok) {
            toast(res.error ?? '发起失败', 'err');
            return;
          }
          close();
          toast('更正版本草稿已生成，修改后提交审核', 'ok', 3200);
          render();
        });
      },
    });
  }

  function exportReport(e: Exam): void {
    const v = e.reportVersions.find((x) => x.status === 'published') ?? [...e.reportVersions].reverse()[0];
    if (!v) {
      toast('暂无可导出的报告', 'warn');
      return;
    }
    const lines = [
      '胶囊内镜（小肠镜）检查报告',
      '================================',
      `检查号：${e.code}`,
      `受检者：${e.patientName}   ${e.patientSex}   ${e.patientAge} 岁`,
      `适应证：${e.indication}`,
      `图像帧数：${e.source.frameCount}`,
      `检查时间：${formatWhenFull(e.registeredAt)}`,
      '',
      '— 胃肠分段 —',
      ...e.segments.map((s) => `${s.name}：F${s.startFrame + 1}–${s.endFrame}（${formatClock(s.startFrame / e.fps)}–${formatClock(s.endFrame / e.fps)}）`),
      '',
      '— 病灶 —',
      e.findings.length === 0
        ? '未见明显异常。'
        : e.findings
            .map(
              (f, i) =>
                `${i + 1}. ${FINDING_META[f.type].label}，估计 ${formatSize(f.sizeMm)}，位于${SEGMENT_META[store.segmentAt(e, f.frameIndex)].name} F${f.frameIndex + 1}，关键帧 ${f.keyframes.length} 张${f.note ? `；${f.note}` : ''}`,
            )
            .join('\n'),
      '',
      '— 镜下结论 —',
      v.conclusion || '—',
      '',
      `报告版本：v${v.version}${v.amendmentReason ? `（更正原因：${v.amendmentReason}）` : ''}`,
      `阅片医师：${v.readerConclusions.map((r) => r.readerName).join(' / ')}`,
      `审核医师：${v.reviewerName ?? '—'}`,
      `发布时间：${formatWhenFull(v.publishedAt)}`,
    ];
    downloadText(`${e.code}-报告-v${v.version}.txt`, lines.join('\n'));
    toast('报告已导出为文本文件', 'ok');
  }

  const handlers: Record<string, (target: HTMLElement) => void> = {
    'goto-reading': () => store.setView('reading'),
    'goto-lesions': () => store.setView('lesions'),
    'submit-read': () => {
      void validateAndGo(async (e) => {
        const res = await store.submitForReview(store.examById(e.id) ?? e);
        if (!res.ok) {
          if (res.issues.length) showIssues(e, res.issues);
          else toast('提交失败', 'err');
          return;
        }
        if (res.waitingFor?.length) {
          toast(`已提交，等待 ${res.waitingFor.join('、')} 完成双阅`, 'ok', 3400);
        } else {
          toast(e.amendment ? '更正版本已提交审核' : '阅片已提交，等待审核医师把关', 'ok', 3400);
        }
        render();
      });
    },
    'publish-report': () => {
      const e = current();
      if (!e) return;
      void store.reviewReport(store.examById(e.id) ?? e, 'publish', reviewComment).then((res) => {
        if (!res.ok) {
          toast(res.error ?? '发布失败', 'err');
          return;
        }
        reviewComment = '';
        toast('审核通过，报告已发布', 'ok', 3200);
        render();
      });
    },
    'return-report': () => {
      const e = current();
      if (!e) return;
      if (!reviewComment.trim()) {
        toast('退回时必须填写退回意见', 'err');
        const ta = root?.querySelector<HTMLTextAreaElement>('[data-review-comment]');
        ta?.focus();
        return;
      }
      void store.reviewReport(store.examById(e.id) ?? e, 'return', reviewComment).then((res) => {
        if (!res.ok) {
          toast(res.error ?? '退回失败', 'err');
          return;
        }
        reviewComment = '';
        toast('已退回阅片人修改', 'ok');
        render();
      });
    },
    'start-amendment': () => {
      const e = current();
      if (e) openAmendmentDialog(e);
    },
    'export-report': () => {
      const e = current();
      if (e) exportReport(e);
    },
  };

  return {
    mount(el: HTMLElement) {
      root = el;
      examRef = current() ?? null;
      const e = current();
      if (e) syncDrafts(e);
      render();
      bindActions(el, handlers);
    },
    update() {
      const e = current();
      if (e && e.id !== examRef?.id) {
        examRef = e;
        conclusionDrafts = {};
        reviewComment = '';
        lastSignature = '';
        render();
        return;
      }
      examRef = e ?? null;
      if (!root) return;
      // The store emits on every keystroke (reading time, autosaved conclusions).
      // Re-rendering then would detach the control the user is clicking, so only
      // redraw when something structural actually changed.
      const sig = signature(e);
      if (sig === lastSignature) return;
      lastSignature = sig;
      render();
    },
    destroy() {
      root?.querySelectorAll<HTMLTextAreaElement>('[data-conclusion]').forEach((ta) => {
        const id = ta.dataset.conclusion;
        if (id) {
          const e = current();
          if (e) commitDraft(e, id);
        }
      });
      root = null;
      examRef = null;
    },
  };
}

