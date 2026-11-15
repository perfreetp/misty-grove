<script>
  import { STATUS_META, STATUS_FLOW, fmtCN, fmtShort, pathologyProgress, summarizePathology, totalAreaMM2, daysBetween, todayISO } from '../lib/domain.js';
  import { store, createCase, setView, selectCase, nextAccession, casePriorExam, findDueTasks, notify } from '../lib/store.svelte.js';
  import PageHead from '../components/PageHead.svelte';
  import StatusTabs from '../components/StatusTabs.svelte';
  import StatusBadge from '../components/StatusBadge.svelte';
  import FlowStepper from '../components/FlowStepper.svelte';
  import Modal from '../components/Modal.svelte';
  import CaseDrawer from '../components/CaseDrawer.svelte';
  import Icon from '../components/Icon.svelte';

  let filter = $state('all');
  let query = $state('');
  let drawerId = $state(null);
  let showNew = $state(false);
  let sortKey = $state('scheduled');
  let form = $state(emptyForm());

  function emptyForm() {
    return {
      name: '', age: '', phone: '', physician: '李敏',
      scheduledAt: todayISO(), indication: '', parity: '', lmp: '', priorScreen: ''
    };
  }

  const counts = $derived.by(() => {
    const out = { all: store.cases.length };
    for (const s of STATUS_FLOW) out[s] = store.cases.filter(c => c.status === s).length;
    return out;
  });

  const filtered = $derived.by(() => {
    let list = store.cases.slice();
    if (filter !== 'all') list = list.filter(c => c.status === filter);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(c =>
        (c.name || '').toLowerCase().includes(q) ||
        (c.accession || '').toLowerCase().includes(q) ||
        (c.physician || '').toLowerCase().includes(q) ||
        (c.indication || '').toLowerCase().includes(q)
      );
    }
    list.sort((a, b) => {
      if (sortKey === 'name') return a.name.localeCompare(b.name, 'zh');
      if (sortKey === 'status') return STATUS_FLOW.indexOf(a.status) - STATUS_FLOW.indexOf(b.status);
      return (b.scheduledAt || '').localeCompare(a.scheduledAt || '');
    });
    return list;
  });

  const statusNotes = $derived.by(() => {
    const out = {};
    for (const s of STATUS_FLOW) {
      const list = store.cases.filter(c => c.status === s);
      out[s] = list.slice(0, 3).map(c => c.name);
    }
    return out;
  });

  function rowsFor(c) {
    const exam = c.exam;
    const prog = pathologyProgress(exam);
    const sum = summarizePathology(exam);
    const prior = casePriorExam(c);
    const curArea = exam ? totalAreaMM2(exam) : 0;
    const prevArea = prior ? totalAreaMM2(prior) : 0;
    const areaUp = prevArea > 0 && curArea > prevArea + 0.5;
    const overdue = (c.tasks || []).filter(t => t.status !== '已完成' && daysBetween(todayISO(), t.dueDate) < 0);
    return {
      lesionCount: exam?.lesions?.length ?? 0,
      biopsyCount: exam?.biopsies?.length ?? 0,
      prog,
      sum,
      areaUp,
      curArea,
      prevArea,
      overdue: overdue.length,
      nextDue: (c.tasks || []).filter(t => t.status !== '已完成').sort((a, b) => a.dueDate.localeCompare(b.dueDate))[0] || null,
      flags: flagsOf(c)
    };
  }

  function flagsOf(c) {
    const exam = c.exam;
    if (!exam) return [];
    const out = [];
    const prior = casePriorExam(c);
    if (prior) {
      const ca = totalAreaMM2(exam), pa = totalAreaMM2(prior);
      if (pa > 0 && ca > pa + 0.5) out.push('面积增大');
    }
    for (const b of exam.biopsies || []) {
      if (!b.pathGrade) continue;
      const hi = ['CIN 2', 'CIN 3', 'AIS', '鳞状细胞癌', '腺癌'].includes(b.pathGrade);
      const les = (exam.lesions || []).find(l => l.id === b.lesionId);
      const inside = les && pointInPoly(b.point, les.points);
      if (!inside) out.push('点位不符');
      if (hi && les && les.grade === '低级别') out.push('病理升级');
    }
    return [...new Set(out)];
  }

  function pointInPoly(pt, pts) {
    let inside = false;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const xi = pts[i].x, yi = pts[i].y, xj = pts[j].x, yj = pts[j].y;
      if ((yi > pt.y) !== (yj > pt.y) && pt.x < ((xj - xi) * (pt.y - yi)) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  }

  function submit() {
    if (!form.name?.trim()) { notify('请填写患者姓名', 'warn'); return; }
    if (!form.age) { notify('请填写年龄', 'warn'); return; }
    const c = createCase({ ...form, accession: nextAccession() });
    showNew = false;
    form = emptyForm();
    drawerId = c.id;
  }

  function openCase(c) {
    drawerId = c.id;
  }

  function goModule(c, view) {
    selectCase(c.id);
    setView(view);
  }

  const nextCase = $derived.by(() => {
    const p = store.cases.filter(c => c.status === 'pending').sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt));
    return p[0] || null;
  });

  const dueSummary = $derived.by(() => {
    const due = findDueTasks().filter(t => t.days <= 7);
    return { total: due.length, overdue: due.filter(t => t.days < 0).length, names: due.slice(0, 2).map(d => d.c.name) };
  });

  const pathGap = $derived.by(() =>
    store.cases.filter(c => {
      const bs = c.exam?.biopsies || [];
      return bs.length > 0 && !bs.every(b => b.pathGrade && b.pathDate);
    }).length
  );
</script>

<PageHead
  eyebrow="检查登记 · 门诊工作台"
  title="宫颈阴道镜检查登记"
  sub="检查单按 待检查 → 已检查 → 待活检 → 已出病理 → 随访中 → 已结案 流转。登记后预约到期自动进入待检查队列。"
>
  <button class="btn btn-primary" onclick={() => (showNew = true)}><Icon name="plus" size={15} />新建检查单</button>
  <button class="btn" onclick={() => setView('followup')}><Icon name="followup" size={14} />随访任务</button>
</PageHead>

<div class="board">
  <section class="kpis">
    <div class="kpi">
      <span class="eyebrow">待检查</span>
      <div class="kv-row"><strong class="num">{counts.pending}</strong><StatusBadge status="pending" size="sm" /></div>
      <p class="hint">{nextCase ? `下一位 ${nextCase.name} · ${fmtShort(nextCase.scheduledAt)}` : '队列为空'}</p>
    </div>
    <div class="kpi">
      <span class="eyebrow">待活检</span>
      <div class="kv-row"><strong class="num">{counts.biopsy}</strong><StatusBadge status="biopsy" size="sm" /></div>
      <p class="hint">{counts.biopsy ? `${statusNotes.biopsy.join('、')} 已完成取材` : '无待处理'}</p>
    </div>
    <div class="kpi">
      <span class="eyebrow">病理回填缺口</span>
      <div class="kv-row"><strong class="num">{pathGap}</strong><span class="chip soft-warn">未齐全</span></div>
      <p class="hint">病理不全不可结案</p>
    </div>
    <div class="kpi">
      <span class="eyebrow">近 7 日随访</span>
      <div class="kv-row"><strong class="num">{dueSummary.total}</strong><span class="chip" class:warn={dueSummary.overdue}>{dueSummary.overdue} 逾期</span></div>
      <p class="hint">{dueSummary.names.length ? dueSummary.names.join('、') : '暂无需随访'}</p>
    </div>
  </section>

  {#if nextCase}
    <section class="next-card">
      <div class="nc-mark"><Icon name="calendar" size={16} /></div>
      <div class="nc-body">
        <p class="eyebrow">今日接诊准备</p>
        <p class="nc-title">{nextCase.name} <span class="muted small">{nextCase.age} 岁 · {nextCase.accession}</span></p>
        <p class="nc-sub">{nextCase.indication}</p>
      </div>
      <div class="nc-actions">
        <span class="muted small">预约 {fmtCN(nextCase.scheduledAt)}</span>
        <button class="btn btn-sm btn-soft" onclick={() => goModule(nextCase, 'annotation')}>进入检查<Icon name="arrowRight" size={13} /></button>
      </div>
    </section>
  {/if}

  <section class="card table-card">
    <div class="table-head">
      <StatusTabs counts={counts} active={filter} onchange={(k) => (filter = k)} />
      <div class="tools">
        <label class="search">
          <Icon name="search" size={14} />
          <input class="input" placeholder="姓名 / 编号 / 医师 / 指征" bind:value={query} />
        </label>
        <select class="select sortsel" bind:value={sortKey} aria-label="排序">
          <option value="scheduled">按预约日期</option>
          <option value="status">按流转状态</option>
          <option value="name">按姓名</option>
        </select>
      </div>
    </div>

    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th class="c-name">患者</th>
            <th>状态</th>
            <th>医师</th>
            <th class="c-clin">病灶 / 活检</th>
            <th>病理</th>
            <th>面积</th>
            <th>预约 / 随访</th>
            <th class="c-act"></th>
          </tr>
        </thead>
        <tbody>
          {#each filtered as c (c.id)}
            {@const r = rowsFor(c)}
            <tr class:warn-row={r.flags.length > 0} onclick={() => openCase(c)} tabindex="0" role="button"
                onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCase(c); } }}>
              <td class="c-name">
                <div class="pname">{c.name}<span class="page">{c.age}</span></div>
                <div class="pid">{c.accession}</div>
              </td>
              <td><StatusBadge status={c.status} size="sm" /></td>
              <td class="c-doc">{c.physician}</td>
              <td class="c-clin">
                {#if r.lesionCount || r.biopsyCount}
                  <span class="mini num">{r.lesionCount} 灶 · {r.biopsyCount} 点</span>
                {:else}
                  <span class="mini muted">—</span>
                {/if}
              </td>
              <td>
                {#if c.status === 'pathology' || c.status === 'followup' || c.status === 'closed'}
                  <span class="path {r.sum.tone}" class:hi={r.sum.tone === 'bad'} class:warn={r.sum.tone === 'warn'}>{r.sum.text}</span>
                {:else if r.prog.total}
                  <span class="path {r.prog.done === r.prog.total ? 'ok' : 'warn'}">{r.prog.done}/{r.prog.total}</span>
                {:else}
                  <span class="muted small">—</span>
                {/if}
                {#if r.flags.length}
                  <span class="flagline" title={r.flags.join('、')}><Icon name="alert" size={10} />{r.flags[0]}{r.flags.length > 1 ? ` +${r.flags.length - 1}` : ''}</span>
                {/if}
              </td>
              <td>
                {#if r.prevArea > 0}
                  <span class="area num" class:up={r.areaUp}>{r.curArea.toFixed(0)}<em>mm²</em></span>
                  <span class="delta num" class:up={r.areaUp}>{r.areaUp ? '+' : ''}{(r.curArea - r.prevArea).toFixed(0)}</span>
                {:else if r.curArea > 0}
                  <span class="area num">{r.curArea.toFixed(0)}<em>mm²</em></span>
                {:else}
                  <span class="muted small">—</span>
                {/if}
              </td>
              <td>
                {#if r.nextDue}
                  <span class="due num">{fmtShort(r.nextDue.dueDate)}</span>
                  <span class="tiny muted">{r.overdue ? `逾期 ${r.overdue}` : r.nextDue.kind.slice(0, 5)}</span>
                {:else}
                  <span class="due num">{fmtShort(c.scheduledAt)}</span>
                  <span class="tiny muted">预约</span>
                {/if}
              </td>
              <td class="c-act" onclick={(e) => e.stopPropagation()}>
                <button class="row-go" onclick={() => goModule(c, nextViewFor(c))} title={actionLabel(c)}>
                  {actionLabel(c)}<Icon name="arrowRight" size={12} />
                </button>
              </td>
            </tr>
          {:else}
            <tr><td colspan="8" class="empty">没有符合条件的检查单</td></tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>
</div>

{#if drawerId}
  <CaseDrawer caseId={drawerId} onclose={() => (drawerId = null)} />
{/if}

<Modal open={showNew} title="新建检查单" subtitle="登记后自动生成检查编号，进入「待检查」队列" width={620} onclose={() => (showNew = false)}>
  <div class="form">
    <div class="form-row">
      <div class="field"><label for="f-name">姓名</label><input id="f-name" class="input" bind:value={form.name} placeholder="如 张*" /></div>
      <div class="field w-sm"><label for="f-age">年龄</label><input id="f-age" class="input" type="number" min="18" max="90" bind:value={form.age} /></div>
      <div class="field"><label for="f-phone">联系电话</label><input id="f-phone" class="input" bind:value={form.phone} placeholder="138****0000" /></div>
    </div>
    <div class="form-row">
      <div class="field"><label for="f-doc">阴道镜医师</label>
        <select id="f-doc" class="select" bind:value={form.physician}>
          <option>李敏</option><option>王雪</option><option>陈立</option>
        </select>
      </div>
      <div class="field"><label for="f-date">预约日期</label><input id="f-date" class="input" type="date" bind:value={form.scheduledAt} /></div>
      <div class="field"><label for="f-parity">孕产次</label><input id="f-parity" class="input" bind:value={form.parity} placeholder="G2P1" /></div>
      <div class="field"><label for="f-lmp">末次月经</label><input id="f-lmp" class="input" type="date" bind:value={form.lmp} /></div>
    </div>
    <div class="field"><label for="f-ind">检查指征</label><input id="f-ind" class="input" bind:value={form.indication} placeholder="如 TCT ASC-US，HPV16 阳性" /></div>
    <div class="field"><label for="f-prior">既往筛查结果</label><textarea id="f-prior" class="textarea" rows="2" bind:value={form.priorScreen} placeholder="最近一次 TCT / HPV 结果及日期"></textarea></div>
    <div class="notice">
      <Icon name="info" size={13} />
      <span>登记编号将生成为 <code>{nextAccession()}</code>，后续活检瓶号以此编号 + <code>-B1…B4</code> 命名。</span>
    </div>
  </div>
  {#snippet footer()}
    <button class="btn" onclick={() => (showNew = false)}>取消</button>
    <button class="btn btn-primary" onclick={submit}><Icon name="check" size={14} />登记并进入待检查</button>
  {/snippet}
</Modal>

<script module>
  function actionLabel(c) {
    if (c.status === 'pending') return '开始检查';
    if (c.status === 'examined') return '登记活检';
    if (c.status === 'biopsy') return '回填病理';
    if (c.status === 'pathology') return '开启随访';
    if (c.status === 'followup') return '随访对比';
    return '查看';
  }
  function nextViewFor(c) {
    if (c.status === 'pending' || c.status === 'examined') return 'annotation';
    if (c.status === 'biopsy') return 'pathology';
    return 'followup';
  }
</script>

<style>
  .board { display: flex; flex-direction: column; gap: 16px; }
  .kpis { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
  .kpi { background: var(--panel); border: 1px solid var(--line); border-radius: var(--r); padding: 13px 14px 11px; box-shadow: var(--shadow-sm); }
  .kpi .eyebrow { font-size: 9.5px; }
  .kv-row { display: flex; align-items: center; gap: 8px; margin-top: 5px; }
  .kv-row strong { font-size: 26px; font-weight: 620; letter-spacing: -.035em; line-height: 1; }
  .hint { font-size: 10.5px; color: var(--ink-3); margin-top: 7px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .chip.soft-warn { background: #fef4df; color: #8a5205; }
  .chip.warn { background: #fef4df; color: #8a5205; }

  .next-card {
    display: flex; align-items: center; gap: 14px; padding: 13px 16px; border-radius: var(--r);
    background: linear-gradient(100deg, #123029, #0f2420 65%); color: #e7f2ec;
    border: 1px solid #1d443a; box-shadow: 0 14px 34px -24px rgba(11, 42, 34, .9);
  }
  .nc-mark { width: 34px; height: 34px; border-radius: 9px; background: rgba(111, 211, 184, .14); color: #7ee0c3; display: grid; place-items: center; flex: none; }
  .nc-body { flex: 1; min-width: 0; }
  .nc-body .eyebrow { color: #6f9186; font-size: 9px; }
  .nc-title { font-size: 14.5px; font-weight: 600; margin-top: 2px; }
  .nc-title .muted { color: #7fa295 !important; }
  .nc-sub { font-size: 11.5px; color: #9db8ac; margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .nc-actions { display: flex; align-items: center; gap: 12px; flex: none; }
  .nc-actions .muted { color: #7fa295 !important; font-size: 11px; }
  .nc-actions .btn-soft { background: rgba(111, 211, 184, .16); color: #a9f0dc; }
  .nc-actions .btn-soft:hover { background: rgba(111, 211, 184, .26); }

  .table-card { overflow: hidden; }
  .table-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 12px; padding: 0 14px 0; flex-wrap: wrap; }
  .tools { display: flex; gap: 8px; padding-bottom: 8px; }
  .search { position: relative; display: inline-flex; align-items: center; }
  .search :global(svg) { position: absolute; left: 9px; color: var(--ink-4); pointer-events: none; }
  .search .input { padding-left: 29px; width: 220px; height: 32px; font-size: 12.5px; }
  .sortsel { width: auto; height: 32px; font-size: 12.5px; }
  .table-wrap { overflow-x: auto; }
  .table { min-width: 900px; }
  th { white-space: nowrap; }
  tbody tr { cursor: pointer; }
  .c-name { min-width: 132px; }
  .pname { font-weight: 600; font-size: 13px; display: flex; align-items: baseline; gap: 5px; }
  .page { font-size: 10.5px; color: var(--ink-4); font-weight: 400; }
  .pid { font-family: var(--mono); font-size: 10px; color: var(--ink-4); margin-top: 1px; }
  .c-doc { font-size: 12.5px; color: var(--ink-2); white-space: nowrap; }
  .c-clin { white-space: nowrap; }
  .mini { font-size: 11.5px; color: var(--ink-2); }
  .path { font-size: 11.5px; font-weight: 600; color: var(--ink-2); }
  .path.hi { color: #a1124c; }
  .path.bad { color: #a1124c; }
  .path.warn { color: var(--amber); }
  .path.ok { color: #0b6b5f; }
  .flagline { display: flex; align-items: center; gap: 3px; font-size: 10px; color: var(--amber); margin-top: 2px; font-weight: 600; }
  .warn-row { background: #fffdf6; }
  .area { font-size: 12.5px; font-weight: 600; }
  .area em { font-size: 9px; font-style: normal; color: var(--ink-4); font-weight: 400; margin-left: 1px; }
  .area.up { color: var(--amber); }
  .delta { display: block; font-size: 9.5px; color: var(--ink-4); }
  .delta.up { color: var(--amber); font-weight: 600; }
  .due { font-size: 12px; display: block; font-family: var(--mono); }
  .c-act { text-align: right; white-space: nowrap; }
  .row-go {
    display: inline-flex; align-items: center; gap: 4px; border: 1px solid var(--line-2); background: #fff;
    height: 26px; padding: 0 9px; border-radius: 6px; font-size: 11px; color: var(--accent-2); font-weight: 600;
  }
  .row-go:hover { background: var(--accent-soft); border-color: transparent; }
  .empty { text-align: center; color: var(--ink-4); padding: 40px 0 !important; font-size: 12.5px; }

  .form { display: flex; flex-direction: column; gap: 12px; }
  .form-row { display: flex; gap: 10px; flex-wrap: wrap; }
  .form-row .field { flex: 1; min-width: 120px; }
  .form-row .field.w-sm { flex: 0 0 88px; min-width: 88px; }
  .notice { display: flex; gap: 8px; align-items: flex-start; background: var(--accent-soft); color: var(--accent-2); border-radius: 8px; padding: 9px 11px; font-size: 11.5px; line-height: 1.5; }
  .notice code { font-family: var(--mono); background: rgba(255, 255, 255, .7); padding: 0 4px; border-radius: 3px; font-size: 11px; }

  @media (max-width: 1000px) {
    .kpis { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (max-width: 700px) {
    .kpis { grid-template-columns: 1fr 1fr; gap: 8px; }
    .kv-row strong { font-size: 22px; }
    .next-card { flex-wrap: wrap; }
    .nc-actions { width: 100%; justify-content: space-between; }
    .search .input { width: 150px; }
    .table-head { padding: 0 10px; }
  }
</style>
