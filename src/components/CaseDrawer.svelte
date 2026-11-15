<script>
  import { STATUS_META, STATUS_FLOW, pathologyProgress, worstGrade, polygonClockSpan, totalAreaMM2, fmtCN, fmtShort, daysBetween, todayISO, guardAdvance } from '../lib/domain.js';
  import { store, caseById, setView, selectCase, casePriorExam, findDueTasks } from '../lib/store.svelte.js';
  import StatusBadge from './StatusBadge.svelte';
  import FlowStepper from './FlowStepper.svelte';
  import Icon from './Icon.svelte';
  import { resolveImage, loadImage } from '../lib/imageCache.js';

  let { caseId = null, onclose = () => {} } = $props();
  import { onMount } from 'svelte';

  const c = $derived(caseById(caseId));
  const exam = $derived(c?.exam);
  const prior = $derived(c ? casePriorExam(c) : null);
  const prog = $derived(pathologyProgress(exam));
  const flagsCount = $derived.by(() => {
    if (!c) return 0;
    let n = 0;
    if (exam?.biopsies?.length && !prog.done === prog.total) n++;
    return n;
  });

  const steps = $derived.by(() => {
    if (!c) return [];
    const idx = STATUS_FLOW.indexOf(c.status);
    return STATUS_FLOW.map((s, i) => ({
      label: STATUS_META[s].label,
      state: i < idx ? 'done' : i === idx ? 'current' : 'todo'
    }));
  });

  const caseTasks = $derived((c?.tasks || []).map(t => ({
    ...t,
    days: daysBetween(todayISO(), t.dueDate)
  })));

  function openModule(view) {
    if (!c) return;
    selectCase(c.id);
    setView(view);
  }

  let thumbs = $state({ pre: null, post: null, iodine: null });
  $effect(() => {
    const imgs = exam?.images || {};
    const g = exam?.geometry;
    const ls = exam?.lesions || [];
    const token = {};
    thumbsToken = token;
    Promise.all(['pre', 'post', 'iodine'].map(async k => {
      const img = imgs[k] ? await loadImage(imgs[k], ls, g, exam?.tzType) : null;
      return [k, img ? img.src : null];
    })).then(entries => {
      if (thumbsToken !== token) return;
      thumbs = Object.fromEntries(entries);
    });
  });
  let thumbsToken = null;

  onMount(() => {
    const onKey = (e) => { if (e.key === 'Escape') onclose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const area = $derived(exam ? totalAreaMM2(exam) : 0);
  const priorArea = $derived(prior ? totalAreaMM2(prior) : 0);
</script>

{#if c}
  <div class="scrim" onclick={onclose} role="presentation"></div>
  <aside class="drawer" aria-label="检查单详情">
    <header>
      <div class="idrow">
        <span class="tag">{c.accession}</span>
        <StatusBadge status={c.status} />
      </div>
      <h2>{c.name} <span class="age">{c.age ?? '—'} 岁</span></h2>
      <p class="muted small">{c.indication || '—'}</p>
      <button class="close" onclick={onclose} aria-label="关闭"><Icon name="x" size={16} /></button>
    </header>

    <div class="body">
      <FlowStepper items={steps} />

      <div class="statrow">
        <div><span class="k">病灶</span><span class="v num">{exam?.lesions?.length ?? 0}</span></div>
        <div><span class="k">活检点</span><span class="v num">{exam?.biopsies?.length ?? 0}</span></div>
        <div><span class="k">病理</span><span class="v num">{prog.done}/{prog.total || 0}</span></div>
        <div><span class="k">面积</span><span class="v num">{area ? area.toFixed(0) : '—'}<em>mm²</em></span></div>
      </div>

      <section>
        <h3>基本信息</h3>
        <dl class="kv">
          <dt>阴道镜医师</dt><dd>{c.physician}</dd>
          <dt>联系电话</dt><dd class="mono">{c.phone || '—'}</dd>
          <dt>登记日期</dt><dd>{fmtCN(c.registeredAt)}</dd>
          <dt>预约日期</dt><dd>{fmtCN(c.scheduledAt)}</dd>
          <dt>孕产次</dt><dd>{c.parity || '—'}</dd>
          <dt>末次月经</dt><dd>{c.lmp || '—'}</dd>
          <dt>既往筛查</dt><dd>{c.priorScreen || '—'}</dd>
        </dl>
      </section>

      {#if exam?.images?.post}
        <section>
          <h3>本次影像</h3>
          <div class="thumbs">
            {#each [['pre', '醋酸前'], ['post', '醋酸后'], ['iodine', '碘染']] as [k, label]}
              <figure>
                {#if thumbs[k]}
                  <img src={thumbs[k]} alt={label} />
                {:else}
                  <div class="noimg">无</div>
                {/if}
                <figcaption>{label}</figcaption>
              </figure>
            {/each}
          </div>
        </section>
      {/if}

      {#if exam?.lesions?.length}
        <section>
          <h3>病灶摘要</h3>
          <ul class="mini-list">
            {#each exam.lesions as l, i}
              <li>
                <span class="idx">{i + 1}</span>
                <span class="lbl">{polygonClockSpan(l.points, exam.geometry).label}</span>
                <span class="grade {l.grade === '高级别' ? 'hi' : ''}">{l.grade}</span>
              </li>
            {/each}
          </ul>
          {#if prior && priorArea > 0}
            <p class="cmp small">
              前次（{fmtShort(prior.examDate)}）面积 {priorArea.toFixed(0)} mm² → 本次 {area.toFixed(0)} mm²
              {#if area > priorArea + 0.5}<span class="flag"><Icon name="alert" size={11} />较前增大</span>{/if}
            </p>
          {/if}
        </section>
      {/if}

      {#if exam?.biopsies?.length}
        <section>
          <h3>病理</h3>
          <ul class="mini-list">
            {#each exam.biopsies as b}
              <li>
                <span class="vial">{b.vial.replace(c.accession + '-', '')}</span>
                <span class="lbl">{b.siteText?.split(' · ')[0] || '—'}</span>
                <span class="grade {b.pathGrade?.startsWith('CIN 2') || b.pathGrade?.startsWith('CIN 3') || b.pathGrade === 'AIS' ? 'hi' : ''}">
                  {b.pathGrade || '待回填'}
                </span>
              </li>
            {/each}
          </ul>
        </section>
      {/if}

      {#if caseTasks.length}
        <section>
          <h3>随访任务</h3>
          <ul class="tasks">
            {#each caseTasks as t}
              <li>
                <span class="tk">{t.kind}</span>
                <span class="td num">{t.dueDate}</span>
                <span class="chip" class:warn={t.status !== '已完成' && t.days < 0} class:done={t.status === '已完成'}>
                  {t.status === '已完成' ? '已完成' : t.days < 0 ? `逾期 ${Math.abs(t.days)} 天` : t.days <= 14 ? `${t.days} 天后` : '待随访'}
                </span>
              </li>
            {/each}
          </ul>
        </section>
      {/if}

      {#if c.status === 'closed' && c.closeSummary}
        <section>
          <h3>结案小结</h3>
          <p class="summary">{c.closeSummary}</p>
        </section>
      {/if}

      <section>
        <h3>流转记录</h3>
        <ol class="timeline">
          {#each (c.log || []).slice(0, 8) as e}
            <li>
              <span class="t num">{e.at}</span>
              <span class="a">{e.action} · <em>{e.by}</em></span>
              {#if e.note}<span class="n">{e.note}</span>{/if}
            </li>
          {/each}
        </ol>
      </section>
    </div>

    <footer>
      {#if c.status === 'pending'}
        <button class="btn btn-primary" onclick={() => openModule('annotation')}><Icon name="annotate" size={14} />开始检查标注</button>
      {:else if c.status === 'examined'}
        <button class="btn btn-primary" onclick={() => openModule('biopsy')}><Icon name="biopsy" size={14} />登记活检点位</button>
      {:else if c.status === 'biopsy'}
        <button class="btn btn-primary" onclick={() => openModule('pathology')}><Icon name="pathology" size={14} />回填病理</button>
      {:else}
        <button class="btn btn-primary" onclick={() => openModule('followup')}><Icon name="followup" size={14} />随访与对比</button>
      {/if}
      <button class="btn" onclick={() => openModule('annotation')}><Icon name="eye" size={14} />查看图像</button>
    </footer>
  </aside>
{/if}

<style>
  .scrim { position: fixed; inset: 0; background: rgba(10, 22, 18, .28); z-index: 40; animation: fade .18s ease both; }
  .drawer {
    position: fixed; top: 0; right: 0; bottom: 0; width: min(430px, 94vw); background: var(--panel);
    z-index: 41; display: flex; flex-direction: column; box-shadow: -24px 0 60px -30px rgba(9, 26, 20, .5);
    animation: slide .24s cubic-bezier(.2, .8, .3, 1) both; border-left: 1px solid var(--line);
  }
  header { padding: 16px 18px 14px; border-bottom: 1px solid var(--line); position: relative; }
  .idrow { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
  h2 { font-size: 18px; font-weight: 640; letter-spacing: -.01em; display: flex; align-items: baseline; gap: 8px; }
  .age { font-size: 12px; font-weight: 400; color: var(--ink-3); }
  .muted.small { margin-top: 4px; font-size: 12px; }
  .close { position: absolute; top: 14px; right: 14px; width: 28px; height: 28px; border-radius: 7px; border: 1px solid var(--line); background: #fff; color: var(--ink-3); display: grid; place-items: center; }
  .close:hover { background: #f4f7f3; color: var(--ink); }
  .body { flex: 1; overflow-y: auto; padding: 16px 18px 24px; }
  .statrow { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: 9px; overflow: hidden; margin: 14px 0 4px; }
  .statrow > div { background: var(--panel-2); padding: 9px 10px; display: flex; flex-direction: column; gap: 1px; }
  .k { font-size: 10px; color: var(--ink-3); }
  .v { font-size: 16px; font-weight: 600; letter-spacing: -.02em; }
  .v em { font-size: 9px; font-style: normal; color: var(--ink-4); margin-left: 2px; font-weight: 400; }
  section { margin-top: 18px; }
  h3 { font-size: 10.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--ink-3); font-weight: 650; margin-bottom: 9px; }
  .mono { font-family: var(--mono); font-size: 12px; }
  .thumbs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
  .thumbs figure { margin: 0; }
  .thumbs img { width: 100%; aspect-ratio: 4/3; object-fit: cover; border-radius: 7px; display: block; background: #17110f; }
  .noimg { width: 100%; aspect-ratio: 4/3; border-radius: 7px; background: #f2f5f1; display: grid; place-items: center; color: var(--ink-4); font-size: 11px; }
  figcaption { font-size: 10px; color: var(--ink-3); text-align: center; margin-top: 3px; }
  .mini-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 5px; }
  .mini-list li { display: flex; align-items: center; gap: 8px; font-size: 12.5px; padding: 6px 9px; background: var(--panel-2); border: 1px solid var(--line); border-radius: 7px; }
  .idx { width: 17px; height: 17px; border-radius: 50%; background: #e8ede7; display: grid; place-items: center; font-size: 9.5px; font-weight: 700; color: var(--ink-2); flex: none; }
  .vial { font-family: var(--mono); font-size: 10.5px; background: #eef2ed; border-radius: 4px; padding: 1px 5px; color: var(--ink-2); }
  .lbl { flex: 1; color: var(--ink-2); }
  .grade { font-size: 11px; font-weight: 600; color: var(--ink-2); }
  .grade.hi { color: #a1124c; }
  .cmp { margin-top: 8px; display: flex; align-items: center; gap: 8px; color: var(--ink-3); flex-wrap: wrap; }
  .flag { color: var(--amber); font-weight: 600; display: inline-flex; align-items: center; gap: 4px; }
  .tasks { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 5px; }
  .tasks li { display: flex; align-items: center; gap: 8px; font-size: 12px; }
  .tk { flex: 1; }
  .td { color: var(--ink-3); font-family: var(--mono); font-size: 11px; }
  .chip.warn { background: #fef4df; color: #8a5205; }
  .chip.done { background: #e3f4ef; color: #0b6b5f; }
  .summary { font-size: 12.5px; line-height: 1.6; color: var(--ink-2); background: var(--panel-2); border-left: 2px solid var(--accent); padding: 8px 10px; border-radius: 0 6px 6px 0; }
  .timeline { list-style: none; margin: 0; padding: 0 0 0 2px; display: flex; flex-direction: column; gap: 9px; }
  .timeline li { display: grid; grid-template-columns: 108px 1fr; gap: 8px; font-size: 11.5px; align-items: baseline; }
  .t { color: var(--ink-4); font-family: var(--mono); font-size: 10px; }
  .a { color: var(--ink-2); font-weight: 500; }
  .a em { font-style: normal; color: var(--ink-3); font-weight: 400; }
  .n { grid-column: 2; color: var(--ink-3); font-size: 11px; margin-top: -5px; line-height: 1.4; }
  footer { padding: 12px 18px; border-top: 1px solid var(--line); background: var(--panel-2); display: flex; gap: 8px; }
  footer .btn { flex: 1; }
  @keyframes slide { from { transform: translateX(24px); opacity: 0; } }
  @keyframes fade { from { opacity: 0; } }
</style>
