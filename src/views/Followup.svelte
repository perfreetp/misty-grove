<script>
  import {
    STATUS_META, STATUS_FLOW, fmtCN, fmtShort, todayISO, daysBetween, addMonths,
    compareExams, totalAreaMM2, pathologyProgress, pathologyComplete, worstGrade,
    taskDueStatus, DUE_META, followupMonths, guardAdvance, lesionMetrics, PATH_SEVERITY
  } from '../lib/domain.js';
  import {
    store, can, currentCase, selectCase, rescheduleTask, completeTask, reopenTask,
    startFollowup, closeCase, generateDueTasks, findDueTasks, notify
  } from '../lib/store.svelte.js';
  import ColpoStrip from '../components/ColpoStrip.svelte';
  import PageHead from '../components/PageHead.svelte';
  import StatusBadge from '../components/StatusBadge.svelte';
  import FlowStepper from '../components/FlowStepper.svelte';
  import Modal from '../components/Modal.svelte';
  import Icon from '../components/Icon.svelte';
  import { openReport, downloadReport, buildReportHTML } from '../lib/report.js';

  let tab = $state('compare'); // compare | tasks
  let resch = $state(null); // {taskId, kind, dueDate}
  let reschDate = $state('');
  let reschReason = $state('');
  let closeForm = $state({ open: false, summary: '' });
  let startForm = $state({ open: false, months: '', kinds: [], base: '', note: '' });
  let showReport = $state(false);
  let reportUrl = $state('');
  let doneTask = $state(null);
  let doneNote = $state('');
  let showAllPatients = $state(false);
  let priorOpacity = $state(0.5);

  const followCandidates = $derived.by(() => {
    const open = store.cases
      .filter(x => ['pathology', 'followup', 'closed'].includes(x.status))
      .sort((a, b) => (a.status === 'pathology' ? 0 : a.status === 'followup' ? 1 : 2) - (b.status === 'pathology' ? 0 : b.status === 'followup' ? 1 : 2));
    return showAllPatients ? store.cases : open;
  });
  const c = $derived((followCandidates.find(x => x.id === store.selectedId)) || followCandidates[0] || null);
  const exam = $derived(c?.exam || null);
  const prior = $derived((c?.priorExams || [])[0] || null);
  const cmp = $derived(compareExams(prior, exam));
  const complete = $derived(pathologyComplete(exam));
  const prog = $derived(pathologyProgress(exam));
  const worst = $derived(worstGrade(exam));
  const guard = $derived(c ? guardAdvance(c, 'closed') : { ok: false, message: '' });

  const allTasks = $derived.by(() => findDueTasks());
  const myTasks = $derived(c ? (c.tasks || []).map(t => ({ t, days: daysBetween(todayISO(), t.dueDate) })) : []);
  const pendingTasks = $derived((c?.tasks || []).filter(t => t.status !== '已完成'));

  const steps = $derived.by(() => {
    if (!c) return [];
    const idx = STATUS_FLOW.indexOf(c.status);
    return STATUS_FLOW.map((s, i) => ({ label: STATUS_META[s].label, state: i < idx ? 'done' : i === idx ? 'current' : 'todo' }));
  });

  function pickCase(id) {
    selectCase(id);
  }

  // 锁定当前工作对象，避免队列排序变化后自动跳单
  $effect(() => {
    if (c && store.selectedId !== c.id) selectCase(c.id);
  });

  function openResch(t, kind) {
    resch = { taskId: t.id, kind };
    reschDate = t.dueDate;
    reschReason = '';
  }

  function doResch() {
    if (!reschReason.trim()) { notify('改约必须填写原因', 'warn'); return; }
    const ok = rescheduleTask(c.id, resch.taskId, reschDate, reschReason);
    if (ok) { resch = null; reschReason = ''; }
  }

  function doStart() {
    const months = Number(startForm.months) || followupMonths(exam);
    const ok = startFollowup(c.id, {
      months,
      baseDate: startForm.base || exam?.examDate || todayISO(),
      kinds: startForm.kinds.length ? startForm.kinds : ['阴道镜复查', 'HPV 分型复查'],
      note: startForm.note
    });
    if (ok) startForm.open = false;
  }

  function doClose() {
    if (!closeForm.summary.trim()) { notify('请填写结案小结', 'warn'); return; }
    const ok = closeCase(c.id, closeForm.summary);
    if (ok) closeForm = { open: false, summary: '' };
  }

  function finishTask() {
    completeTask(c.id, doneTask.t.id, doneNote);
    doneTask = null;
    doneNote = '';
  }

  const reportHtml = $derived.by(() => {
    if (!c || !showReport) return '';
    try { return buildReportHTML(c); } catch (e) { console.error(e); return ''; }
  });

  function openPrint() {
    openReport(c);
    showReport = false;
  }

  const areaRows = $derived.by(() => {
    if (!c) return [];
    const rows = [];
    for (const p of c.priorExams || []) {
      rows.push({ label: `前次 ${fmtShort(p.examDate)}`, area: totalAreaMM2(p), count: p.lesions?.length || 0, cur: false });
    }
    if (exam) rows.push({ label: `本次 ${fmtShort(exam.examDate || todayISO())}`, area: totalAreaMM2(exam), count: exam.lesions?.length || 0, cur: true });
    return rows;
  });

  const diffLesions = $derived.by(() => {
    if (!exam) return [];
    return (exam.lesions || []).map((l, i) => {
      const m = lesionMetrics(l, exam.geometry);
      return { l, m, i };
    });
  });

  function openStart() {
    startForm = {
      open: true,
      months: followupMonths(exam),
      base: exam?.examDate || todayISO(),
      kinds: ['阴道镜复查', 'HPV 分型复查'],
      note: ''
    };
  }

  function toggleKind(k) {
    startForm.kinds = startForm.kinds.includes(k)
      ? startForm.kinds.filter(x => x !== k)
      : [...startForm.kinds, k];
  }
</script>

<PageHead
  eyebrow="随访对比 · 面积与病理"
  title="随访、影像对比与结案"
  sub="两次检查图像可半透明对齐，直接观察病灶面积变化。面积增大或点位与病理不符时标黄提示复核；随访到期生成任务，改约须填写原因。"
>
  {#if c}<span class="tag">{c.accession}</span><StatusBadge status={c.status} />{/if}
  <button class="btn btn-sm" onclick={() => (showAllPatients = !showAllPatients)}>
    <Icon name="users" size={13} />{showAllPatients ? '只看随访相关' : '全部病例'}
  </button>
</PageHead>

{#if !c}
  <div class="card card-pad empty-state">
    <Icon name="followup" size={26} />
    <h2>暂无随访病例</h2>
    <p class="muted">病理归档后可开启随访计划。</p>
  </div>
{:else}
  <div class="case-bar card">
    <div class="cb-left">
      <select class="select case-pick" value={c.id} onchange={(e) => pickCase(e.currentTarget.value)} aria-label="选择检查单">
        {#each followCandidates as x}
          <option value={x.id}>{x.accession} · {x.name} · {STATUS_META[x.status].label}</option>
        {/each}
      </select>
      <div class="cb-meta">
        <span>{c.name} · {c.age} 岁</span><span class="dot-sep">·</span>
        <span>最高 {worst || '—'}</span><span class="dot-sep">·</span>
        <span>{c.priorExams?.length ? '有前次影像' : '无前次影像'}</span>
      </div>
    </div>
    <div class="cb-right">
      <div class="seg">
        <button class:on={tab === 'compare'} onclick={() => (tab = 'compare')}><Icon name="layers" size={12} />影像对比</button>
        <button class:on={tab === 'tasks'} onclick={() => (tab = 'tasks')}><Icon name="calendar" size={12} />随访任务{pendingTasks.length ? ` (${pendingTasks.length})` : ''}</button>
      </div>
      <FlowStepper items={steps} />
    </div>
  </div>

  {#if !complete && exam?.biopsies?.length}
    <div class="alert-strip block-gap">
      <Icon name="alert" size={14} />
      <span>病理未填全（{prog.done}/{prog.total}），<b>不允许结案</b>，也无法开启新的随访周期。请先到「病理回填」补齐。</span>
    </div>
  {/if}

  {#if tab === 'compare'}
    <div class="layout">
      <div class="stage card">
        <div class="stage-top">
          <div class="toolbar">
            <span class="chip"><Icon name="layers" size={11} />{prior ? '叠加前次' : '仅本次'}</span>
            {#if prior}
              <label class="opacity">
                <span class="tiny muted">前次透明度 {Math.round(priorOpacity * 100)}%</span>
                <input type="range" min="0.15" max="0.85" step="0.05" bind:value={priorOpacity} />
              </label>
            {:else}
              <span class="chip">无前次检查，无法叠加</span>
            {/if}
          </div>
          <div class="toolbar">
            <button class="btn btn-sm" onclick={() => (showReport = true)}><Icon name="file" size={13} />图文报告</button>
          </div>
        </div>
        {#if prior}
          <div class="strip-wrap">
            <ColpoStrip
              {exam}
              priorExam={prior}
              mode="annotate"
              showPrior={true}
              priorOpacity={priorOpacity}
              activeLesionId={null}
              activeBiopsyId={null}
              onselectlesion={() => {}}
              onselectbiopsy={() => {}}
              onbiopsypoint={() => {}}
              onmovepoint={() => {}}
              oncreate={() => {}}
              showGrid={true}
              showLabels={true}
              showTz={true}
              hint={prior ? '前次图像与轮廓以半透明叠加，拖动下方滑块调整透明度' : ''}
            />
          </div>
        {:else}
          <div class="strip-wrap">
            <ColpoStrip
              {exam}
              mode="annotate"
              showPrior={false}
              activeLesionId={null}
              activeBiopsyId={null}
              onselectlesion={() => {}}
              onselectbiopsy={() => {}}
              onbiopsypoint={() => {}}
              onmovepoint={() => {}}
              oncreate={() => {}}
              showGrid={true}
              showLabels={true}
              showTz={true}
            />
          </div>
        {/if}
        <div class="stage-foot">
          <span class="tiny muted">
            {#if prior}半透明层为前次（{fmtCN(prior.examDate)}）影像与轮廓，实线为本次{/if}；三图同步叠加，可拖动看边界位移。
          </span>
          <div class="legend-mini">
            <span class="lm"><i class="dash"></i>前次轮廓（虚线）</span>
            <span class="lm"><i style="background:#db2777"></i>本次轮廓（实线）</span>
          </div>
        </div>
      </div>

      <aside class="panel">
        <section class="card block">
          <header class="bh"><h3>面积变化</h3>{#if cmp.increased}<span class="chip flaged"><Icon name="alert" size={10} />较前增大</span>{/if}</header>
          <div class="area-box">
            <div class="area-nums">
              <div class="an">
                <span class="an-k">前次</span>
                <span class="an-v num">{cmp.prevArea ? cmp.prevArea.toFixed(1) : '—'}<em> mm²</em></span>
                <span class="an-d">{prior ? fmtShort(prior.examDate) : '无前次'}</span>
              </div>
              <div class="an-arrow {cmp.increased ? 'up' : cmp.delta < 0 ? 'down' : ''}">
                <Icon name={cmp.increased ? 'alert' : 'arrowRight'} size={16} />
                <span class="num">{cmp.prevArea ? `${cmp.delta >= 0 ? '+' : ''}${cmp.delta.toFixed(1)}` : '—'}</span>
                {#if cmp.pct != null}<span class="pct num">{cmp.pct >= 0 ? '+' : ''}{cmp.pct.toFixed(0)}%</span>{/if}
              </div>
              <div class="an">
                <span class="an-k">本次</span>
                <span class="an-v num">{cmp.curArea.toFixed(1)}<em> mm²</em></span>
                <span class="an-d">{fmtShort(exam?.examDate || todayISO())}</span>
              </div>
            </div>
            {#if cmp.increased}
              <div class="warn-strip small-warn"><Icon name="alert" size={12} /><span>面积较前次增大，已标黄提示复核；建议结合病理与随访间隔评估。</span></div>
            {:else if cmp.prevArea > 0}
              <p class="cmp-note">面积{ cmp.delta < 0 ? '缩小' : '基本持平'}，继续按计划随访。</p>
            {:else}
              <p class="cmp-note muted">前次无标注病灶，无法比较面积。</p>
            {/if}
          </div>
        </section>

        <section class="card block">
          <header class="bh"><h3>本次病灶 · 面积占比</h3></header>
          <ul class="les-bars">
            {#each diffLesions as d}
              <li>
                <div class="lb-top">
                  <span class="lb-span">{d.m.label}</span>
                  <span class="lb-area num">{d.m.areaMM2.toFixed(0)} mm²</span>
                </div>
                <div class="lb-bar"><span style="width:{Math.min(100, (d.m.areaMM2 / Math.max(1, totalAreaMM2(exam))) * 100)}%"></span></div>
                <div class="lb-foot">
                  <span class="mini-tag" class:hi={d.l.grade !== '低级别'}>{d.l.grade}</span>
                  <span class="mini-tag tz" class:cross={d.m.tz.crosses}>{d.m.tz.crosses ? '越过转化区' : '转化区内'}</span>
                  <span class="lb-q">{d.m.quadrants.join('·')}</span>
                </div>
              </li>
            {:else}
              <li class="muted small pad">本次未标注病灶</li>
            {/each}
          </ul>
        </section>

        <section class="card block">
          <header class="bh"><h3>病理与操作</h3></header>
          <div class="op-box">
            <div class="op-stat">
              <span class="op-k">最高分级</span>
              <span class="op-v {PATH_SEVERITY[worst] >= 2 ? 'hi' : ''}">{worst || '—'}</span>
            </div>
            <div class="op-stat">
              <span class="op-k">病理</span>
              <span class="op-v">{complete ? '齐全' : `${prog.done}/${prog.total} 待回填`}</span>
            </div>
          </div>
          <div class="op-actions">
            <button class="btn btn-sm" onclick={() => (showReport = true)}><Icon name="file" size={12} />查看报告</button>
            {#if c.status === 'pathology' && can('followup')}
              <button class="btn btn-sm btn-primary" onclick={openStart}><Icon name="followup" size={12} />开启随访</button>
            {:else if c.status === 'followup' && can('close')}
              <button class="btn btn-sm" disabled={!guard.ok} onclick={() => (closeForm.open = true)} title={guard.ok ? '' : guard.message}>
                <Icon name="shield" size={12} />结案
              </button>
            {:else if c.status === 'closed'}
              <span class="chip">已结案 {fmtShort(c.closedAt)}</span>
            {/if}
          </div>
          {#if c.status === 'followup' && !guard.ok}
            <p class="tiny muted op-note"><Icon name="info" size={10} /> {guard.message}</p>
          {/if}
        </section>
      </aside>
    </div>
  {:else}
    <div class="task-layout">
      <section class="card block">
        <header class="bh">
          <h3>本病例随访任务 <span class="count">{pendingTasks.length}</span></h3>
          <div class="bh-actions">
            <button class="btn btn-xs" onclick={() => generateDueTasks()}><Icon name="rotate" size={11} />检查到期</button>
            {#if c.status === 'followup' && can('close')}
              <button class="btn btn-xs btn-soft" disabled={!guard.ok} onclick={() => { if (guard.ok) closeForm.open = true; else notify(guard.message, 'warn'); }} title={guard.ok ? '' : guard.message}>
                <Icon name="shield" size={11} />结案
              </button>
            {/if}
          </div>
        </header>
        {#if !myTasks.length}
          <div class="empty-note">
            {#if c.status === 'pathology'}
              <p>尚未开启随访。</p>
              <button class="btn btn-sm btn-primary" onclick={openStart}><Icon name="plus" size={12} />按病理结果开启随访</button>
            {:else}
              <p>本病例暂无随访任务。</p>
            {/if}
          </div>
        {/if}
        <ul class="task-list">
          {#each myTasks as { t, days }}
            {@const st = taskDueStatus(t)}
            <li class:overdue={st === 'overdue'} class:done={t.status === '已完成'}>
              <div class="tk-main">
                <span class="tk-kind">{t.kind}</span>
                <span class="status {DUE_META[st].cls}" style="height:20px;font-size:10.5px">{DUE_META[st].label}</span>
                {#if st === 'overdue'}<span class="tk-days num">逾期 {Math.abs(days)} 天</span>{:else if t.status !== '已完成'}<span class="tk-days num">{days} 天后</span>{/if}
              </div>
              <div class="tk-meta">
                <span class="mono">{t.dueDate}</span>
                <span class="dot-sep">·</span>
                <span>{t.assignee}</span>
                <span class="dot-sep">·</span>
                <span>{t.phone}</span>
                {#if t.note}<span class="tk-note">· {t.note}</span>{/if}
              </div>
              {#if t.history?.length}
                <ul class="hist">
                  {#each t.history as h}
                    <li><Icon name="rotate" size={10} /><span class="mono">{h.from} → {h.to}</span><span class="h-by">{h.by}</span><span class="h-reason">{h.reason}</span></li>
                  {/each}
                </ul>
              {/if}
              <div class="tk-actions">
                {#if t.status === '已完成'}
                  <span class="tiny muted">完成于 {t.completedAt}{t.completeNote ? ` · ${t.completeNote}` : ''}</span>
                  <button class="btn btn-xs btn-ghost" onclick={() => reopenTask(c.id, t.id)}>重新开启</button>
                {:else}
                  <button class="btn btn-xs" onclick={() => { doneTask = { t }; doneNote = ''; }}><Icon name="check" size={11} />标记完成</button>
                  <button class="btn btn-xs" onclick={() => openResch(t)}><Icon name="calendar" size={11} />改约</button>
                  {#if can('close')}<button class="btn btn-xs btn-ghost" onclick={() => (closeForm.open = true)}>申请结案</button>{/if}
                {/if}
              </div>
            </li>
          {/each}
        </ul>
      </section>

      <section class="card block">
        <header class="bh"><h3>全队列随访到期</h3><span class="tiny muted">按到期日排序</span></header>
        <ul class="queue">
          {#each allTasks.filter(x => x.days <= 30).slice(0, 14) as { c: cc, task: tt, days: dd }}
            {@const st = taskDueStatus(tt)}
            <li class:sel={cc.id === c.id}>
              <button type="button" class="q-go" onclick={() => pickCase(cc.id)} aria-label="切换到 {cc.name}"></button>
              <span class="q-name">{cc.name}</span>
              <span class="q-kind">{tt.kind}</span>
              <span class="q-date mono">{tt.dueDate}</span>
              <span class="status {DUE_META[st].cls}" style="height:19px;font-size:10px">{DUE_META[st].label}</span>
            </li>
          {:else}
            <li class="muted small pad">30 日内无到期任务</li>
          {/each}
        </ul>
      </section>
    </div>
  {/if}
{/if}

<Modal open={!!resch} title="随访改约" subtitle="改约必须填写原因，系统将保留原约日期与操作人" width={500} onclose={() => (resch = null)}>
  {#if resch}
    <div class="form2">
      <div class="field">
        <span class="label">任务</span>
        <input class="input" value={resch.kind} disabled />
      </div>
      <div class="field">
        <label for="rd">新随访日期</label>
        <input id="rd" class="input" type="date" bind:value={reschDate} />
      </div>
      <div class="field">
        <label for="rr">改约原因 <span class="req">必填</span></label>
        <textarea id="rr" class="textarea" rows="3" bind:value={reschReason} placeholder="如：患者外地出差，电话沟通后改约（记录沟通要点）"></textarea>
        {#if !reschReason.trim()}<p class="tiny muted">未填写原因无法保存改约。</p>{/if}
      </div>
      <div class="warn-strip"><Icon name="info" size={13} /><span>改约记录会写入病案流转日志与导出报告，请如实填写。</span></div>
    </div>
  {/if}
  {#snippet footer()}
    <button class="btn" onclick={() => (resch = null)}>取消</button>
    <button class="btn btn-primary" disabled={!reschReason.trim()} onclick={doResch}><Icon name="check" size={14} />保存改约</button>
  {/snippet}
</Modal>

<Modal open={startForm.open} title="开启随访计划" subtitle="按病理最高分级推荐复查间隔，生成到期任务" width={520} onclose={() => (startForm.open = false)}>
  <div class="form2">
    <div class="field-row">
      <div class="field">
        <label for="sm">复查间隔（月）</label>
        <input id="sm" class="input" type="number" min="1" max="24" bind:value={startForm.months} />
      </div>
      <div class="field">
        <label for="sb">起算日期</label>
        <input id="sb" class="input" type="date" bind:value={startForm.base} />
      </div>
    </div>
    <p class="tiny muted">按最高分级 <b>{worst || '—'}</b> 推荐 {followupMonths(exam)} 个月；到期日 {addMonths(startForm.base || todayISO(), startForm.months || followupMonths(exam))}。</p>
    <div class="field">
      <span class="label">随访项目</span>
      <div class="kinds">
        {#each ['阴道镜复查', 'HPV 分型复查', 'TCT + HPV 联合筛查', '补取活检'] as k}
          <button class="kind" class:on={startForm.kinds.includes(k)} onclick={() => toggleKind(k)}>
            {#if startForm.kinds.includes(k)}<Icon name="check" size={11} />{/if}{k}
          </button>
        {/each}
      </div>
    </div>
    <div class="field">
      <label for="sn">备注</label>
      <textarea id="sn" class="textarea" rows="2" bind:value={startForm.note} placeholder="随访沟通、联系方式确认等"></textarea>
    </div>
  </div>
  {#snippet footer()}
    <button class="btn" onclick={() => (startForm.open = false)}>取消</button>
    <button class="btn btn-primary" onclick={doStart}><Icon name="check" size={14} />生成随访任务</button>
  {/snippet}
</Modal>

<Modal open={closeForm.open} title="结案" subtitle="病理全部回填且随访任务完成后方可结案" width={520} onclose={() => (closeForm.open = false)}>
  <div class="form2">
    {#if !guard.ok}
      <div class="alert-strip"><Icon name="alert" size={14} /><span>{guard.message}</span></div>
    {/if}
    {#if pendingTasks.length}
      <div class="warn-strip"><Icon name="alert" size={14} /><span>仍有 {pendingTasks.length} 项随访任务未完成：{pendingTasks.map(t => t.kind).join('、')}。</span></div>
    {/if}
    <div class="field">
      <label for="cs">结案小结 <span class="req">必填</span></label>
      <textarea id="cs" class="textarea" rows="4" bind:value={closeForm.summary} placeholder="本次随访结果、症状变化、下一步建议…"></textarea>
    </div>
  </div>
  {#snippet footer()}
    <button class="btn" onclick={() => (closeForm.open = false)}>取消</button>
    <button class="btn btn-primary" onclick={doClose}><Icon name="check" size={14} />确认结案</button>
  {/snippet}
</Modal>

<Modal open={!!doneTask} title="标记随访完成" subtitle={doneTask ? doneTask.t.kind + ' · 到期 ' + doneTask.t.dueDate : ''} width={460} onclose={() => (doneTask = null)}>
  <div class="form2">
    <div class="field">
      <label for="dn">随访结果摘要</label>
      <textarea id="dn" class="textarea" rows="3" bind:value={doneNote} placeholder="如：复查 TCT NILM、HPV 阴性，阴道镜未见病灶"></textarea>
    </div>
  </div>
  {#snippet footer()}
    <button class="btn" onclick={() => (doneTask = null)}>取消</button>
    <button class="btn btn-primary" onclick={finishTask}><Icon name="check" size={14} />确认完成</button>
  {/snippet}
</Modal>

<Modal open={showReport} title="图文报告" subtitle="包含三图、钟面标注、病理与随访计划；可在新窗口打印或另存 PDF" width={760} onclose={() => (showReport = false)}>
  <div class="report-preview">
    {#if c && reportHtml}
      <iframe title="报告预览" srcdoc={reportHtml}></iframe>
    {:else}
      <div class="spin"></div>
    {/if}
  </div>
  {#snippet footer()}
    <button class="btn" onclick={() => (showReport = false)}>关闭</button>
    <button class="btn" onclick={() => { downloadReport(c); notify('报告已下载为 HTML，可用浏览器打印为 PDF'); }}><Icon name="download" size={14} />下载</button>
    <button class="btn btn-primary" onclick={openPrint}><Icon name="file" size={14} />新窗口打印</button>
  {/snippet}
</Modal>

<style>
  .empty-state { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 60px 20px; color: var(--ink-3); text-align: center; }
  .empty-state h2 { font-size: 15px; color: var(--ink); font-weight: 600; }
  .case-bar { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 11px 14px; margin-bottom: 12px; flex-wrap: wrap; }
  .cb-left { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; min-width: 0; }
  .case-pick { width: auto; max-width: 300px; height: 30px; font-size: 12px; }
  .cb-meta { display: flex; align-items: center; gap: 6px; font-size: 11.5px; color: var(--ink-3); }
  .dot-sep { color: var(--ink-4); }
  .cb-right { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
  .block-gap { margin-bottom: 12px; }

  .layout { display: grid; grid-template-columns: minmax(0, 1fr) 356px; gap: 12px; align-items: start; }
  .stage { overflow: hidden; }
  .stage-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 9px 12px; border-bottom: 1px solid var(--line); background: var(--panel-2); flex-wrap: wrap; }
  .opacity { display: flex; flex-direction: column; gap: 1px; min-width: 120px; }
  .opacity input[type="range"] { width: 120px; accent-color: var(--accent); height: 14px; }
  .strip-wrap { padding: 10px; background: #0c1411; }
  .stage-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 8px 13px; border-top: 1px solid var(--line); flex-wrap: wrap; }
  .legend-mini { display: flex; gap: 12px; flex-wrap: wrap; }
  .lm { display: inline-flex; align-items: center; gap: 4px; font-size: 10px; color: var(--ink-3); }
  .lm i { width: 10px; height: 10px; border-radius: 2px; display: inline-block; }
  .lm i.dash { background: transparent; border: 1.5px dashed #78ebf5; }

  .panel { display: flex; flex-direction: column; gap: 10px; }
  .block { overflow: hidden; }
  .bh { display: flex; align-items: center; justify-content: space-between; padding: 10px 13px; border-bottom: 1px solid var(--line); background: var(--panel-2); gap: 8px; }
  .bh-actions { display: flex; gap: 5px; }
  .bh h3 { font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: var(--ink-3); font-weight: 650; }
  .count { background: var(--accent-soft); color: var(--accent-2); border-radius: 5px; padding: 0 5px; font-size: 10px; letter-spacing: 0; }
  .chip.flaged { background: var(--amber-bg); color: var(--amber); }

  .area-box { padding: 12px 13px; }
  .area-nums { display: flex; align-items: stretch; gap: 6px; }
  .an { flex: 1; display: flex; flex-direction: column; gap: 1px; }
  .an-k { font-size: 9.5px; color: var(--ink-4); }
  .an-v { font-size: 19px; font-weight: 620; letter-spacing: -.03em; }
  .an-v em { font-size: 9px; font-style: normal; color: var(--ink-4); font-weight: 400; }
  .an-d { font-size: 9.5px; color: var(--ink-4); font-family: var(--mono); }
  .an-arrow { display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--ink-3); padding: 0 2px; min-width: 56px; }
  .an-arrow .num { font-size: 11px; font-weight: 600; margin-top: 1px; }
  .an-arrow .pct { font-size: 9.5px; color: var(--ink-4); }
  .an-arrow.up { color: var(--amber); }
  .an-arrow.down { color: #0b6b5f; }
  .small-warn { margin-top: 11px; font-size: 11px; }
  .cmp-note { font-size: 11px; color: var(--ink-3); margin-top: 10px; }

  .les-bars { list-style: none; margin: 0; padding: 4px 13px 10px; }
  .les-bars li { padding: 8px 0; border-bottom: 1px solid #f0f3ee; }
  .les-bars li:last-child { border-bottom: 0; }
  .les-bars li.pad { color: var(--ink-4); padding: 14px 0; text-align: center; }
  .lb-top { display: flex; justify-content: space-between; font-size: 11.5px; }
  .lb-span { font-weight: 600; }
  .lb-area { color: var(--ink-3); font-size: 11px; }
  .lb-bar { height: 4px; border-radius: 2px; background: #eef2ed; margin: 5px 0; overflow: hidden; }
  .lb-bar span { display: block; height: 100%; background: linear-gradient(90deg, #f0a8c0, #be185d); border-radius: 2px; }
  .lb-foot { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; }
  .mini-tag { font-size: 9px; font-weight: 600; padding: 1px 5px; border-radius: 4px; background: #fef3d6; color: #8a4d05; }
  .mini-tag.hi { background: #fde8ef; color: #a1124c; }
  .mini-tag.tz { background: #e3f4ef; color: #0b6b5f; }
  .mini-tag.tz.cross { background: var(--amber-bg); color: var(--amber); }
  .lb-q { font-size: 9.5px; color: var(--ink-4); margin-left: auto; }

  .op-box { display: flex; gap: 1px; background: var(--line); }
  .op-stat { flex: 1; background: var(--panel-2); padding: 9px 12px; display: flex; flex-direction: column; }
  .op-k { font-size: 9px; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-4); }
  .op-v { font-size: 12.5px; font-weight: 600; margin-top: 2px; }
  .op-v.hi { color: #a1124c; }
  .op-actions { display: flex; gap: 6px; padding: 10px 13px; flex-wrap: wrap; }
  .op-note { padding: 0 13px 10px; display: flex; align-items: center; gap: 4px; line-height: 1.4; }

  .task-layout { display: grid; grid-template-columns: minmax(0, 1fr) 358px; gap: 12px; align-items: start; }
  .empty-note { padding: 18px 14px; text-align: center; font-size: 12px; color: var(--ink-3); display: flex; flex-direction: column; align-items: center; gap: 8px; line-height: 1.5; }
  .task-list { list-style: none; margin: 0; padding: 0; }
  .task-list li { padding: 11px 13px; border-bottom: 1px solid #eef1ec; }
  .task-list li:last-child { border-bottom: 0; }
  .task-list li.overdue { background: #fffdf6; box-shadow: inset 2px 0 0 #d9a33a; }
  .task-list li.done { opacity: .68; }
  .tk-main { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .tk-kind { font-size: 13px; font-weight: 600; }
  .tk-days { font-size: 10.5px; color: var(--ink-3); }
  .task-list li.overdue .tk-days { color: var(--amber); font-weight: 600; }
  .tk-meta { display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--ink-3); margin-top: 4px; flex-wrap: wrap; }
  .mono { font-family: var(--mono); }
  .tk-note { color: var(--ink-4); }
  .hist { list-style: none; margin: 7px 0 0; padding: 7px 9px; background: #faf8f2; border: 1px dashed #ecdfc2; border-radius: 6px; display: flex; flex-direction: column; gap: 4px; }
  .hist li { display: flex; align-items: center; gap: 7px; font-size: 10.5px; color: var(--ink-3); padding: 0; border: 0; background: none; box-shadow: none; }
  .hist .mono { color: var(--ink-2); }
  .h-by { color: var(--ink-4); }
  .h-reason { color: var(--ink-2); flex: 1; }
  .tk-actions { display: flex; gap: 5px; margin-top: 8px; align-items: center; flex-wrap: wrap; }

  .queue { list-style: none; margin: 0; padding: 0; }
  .queue li { display: grid; grid-template-columns: 62px 1fr auto auto; gap: 8px; align-items: center; padding: 8px 13px; border-bottom: 1px solid #eef1ec; font-size: 11.5px; cursor: pointer; position: relative; }
  .q-go { position: absolute; inset: 0; border: 0; background: transparent; padding: 0; }
  .q-go:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }
  .queue li > :not(.q-go) { position: relative; pointer-events: none; }
  .queue li:hover { background: #fafcf9; }
  .queue li.sel { background: #f1f8f5; }
  .queue li.pad { display: block; text-align: center; color: var(--ink-4); padding: 16px; cursor: default; }
  .q-name { font-weight: 600; }
  .q-kind { color: var(--ink-3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .q-date { color: var(--ink-3); font-size: 10.5px; }

  .form2 { display: flex; flex-direction: column; gap: 11px; }
  .field-row { display: flex; gap: 8px; }
  .field-row .field { flex: 1; }
  .req { color: var(--red); font-size: 9.5px; font-weight: 600; }
  .kinds { display: flex; gap: 5px; flex-wrap: wrap; }
  .kind { border: 1px solid var(--line-2); background: #fff; height: 28px; padding: 0 10px; border-radius: 7px; font-size: 11.5px; display: inline-flex; align-items: center; gap: 4px; color: var(--ink-2); }
  .kind:hover { border-color: #bcc8c0; }
  .kind.on { background: var(--accent-soft); border-color: transparent; color: var(--accent-2); font-weight: 600; }
  .report-preview { border: 1px solid var(--line); border-radius: 8px; overflow: hidden; height: min(62vh, 560px); display: flex; align-items: center; justify-content: center; background: #f4f6f3; }
  .report-preview iframe { width: 100%; height: 100%; border: 0; background: #fff; }
  @media (max-width: 1180px) { .layout, .task-layout { grid-template-columns: 1fr; } }
  @media (max-width: 760px) { .case-bar { align-items: flex-start; } .cb-right { width: 100%; } }
</style>
