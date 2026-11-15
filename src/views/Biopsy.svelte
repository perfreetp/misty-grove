<script>
  import {
    DEFAULT_GEO, STATUS_FLOW, STATUS_META, pointSite, polygonClockSpan,
    pointInPolygon, fmtCN, guardAdvance, dist
  } from '../lib/domain.js';
  import {
    store, can, currentCase, selectCase, addBiopsy, removeBiopsy, updateBiopsy,
    commitBiopsies, notify
  } from '../lib/store.svelte.js';
  import ColpoStrip from '../components/ColpoStrip.svelte';
  import PageHead from '../components/PageHead.svelte';
  import StatusBadge from '../components/StatusBadge.svelte';
  import FlowStepper from '../components/FlowStepper.svelte';
  import Modal from '../components/Modal.svelte';
  import Icon from '../components/Icon.svelte';

  let activeBiopsyId = $state(null);
  let mode = $state('biopsy');
  let confirm = $state(false);
  let editingNote = $state(null);

  const eligible = $derived.by(() =>
    store.cases
      .filter(x => ['pending', 'examined', 'biopsy'].includes(x.status))
      .sort((a, b) => {
        const w = x => (x.status === 'examined' ? 0 : x.status === 'biopsy' ? 1 : 2);
        return w(a) - w(b) || (a.accession > b.accession ? 1 : -1);
      })
  );
  const c = $derived((eligible.find(x => x.id === store.selectedId)) || eligible[0] || null);
  const exam = $derived(c?.exam || null);
  const geo = $derived(exam?.geometry || DEFAULT_GEO);
  const lesions = $derived(exam?.lesions || []);
  const biopsies = $derived(exam?.biopsies || []);
  const editable = $derived(c ? c.status === 'examined' && can('biopsy') : false);
  const guard = $derived(c ? guardAdvance(c, 'biopsy') : { ok: false, message: '' });
  const activeBiopsy = $derived(biopsies.find(b => b.id === activeBiopsyId) || biopsies[0] || null);

  const steps = $derived.by(() => {
    if (!c) return [];
    const idx = STATUS_FLOW.indexOf(c.status);
    return STATUS_FLOW.map((s, i) => ({ label: STATUS_META[s].label, state: i < idx ? 'done' : i === idx ? 'current' : 'todo' }));
  });

  function pickCase(id) {
    selectCase(id);
    activeBiopsyId = null;
  }

  // 锁定当前工作对象，避免队列排序变化后自动跳单
  $effect(() => {
    if (c && store.selectedId !== c.id) selectCase(c.id);
  });

  function handleBiopsyPoint({ x, y }) {
    if (!editable) {
      if (c?.status === 'pending') notify('请先在「图像标注」完成检查结论，再登记活检点位', 'warn');
      else notify('当前检查单已不可新增点位', 'warn');
      return;
    }
    if (biopsies.length >= 4) { notify('每例最多 4 个活检点位', 'warn'); return; }
    const tooClose = biopsies.some(b => dist(b.point, { x, y }) < 0.022);
    if (tooClose) { notify('该位置已有活检点，请错开取材部位', 'warn'); return; }
    const item = addBiopsy(c.id, { x, y });
    if (item) {
      activeBiopsyId = item.id;
      notify(`已生成瓶号 ${item.vial} · ${item.siteText}`, 'ok', 4200);
    }
  }

  function handleMovePoint({ biopsyId, point, lesionId, points }) {
    if (biopsyId) updateBiopsy(c.id, biopsyId, { point });
    if (lesionId) {
      // 标注阶段已锁定几何；此处仅为兼容组件回调
    }
  }

  function del(b) {
    removeBiopsy(c.id, b.id);
    if (activeBiopsyId === b.id) activeBiopsyId = null;
    notify(`已删除点位，剩余瓶号已重新编号`);
  }

  function submit() {
    const ok = commitBiopsies(c.id);
    confirm = false;
    if (ok) activeBiopsyId = null;
  }

  function lesionOf(b) {
    return lesions.find(l => l.id === b.lesionId) || null;
  }

  function insideLesion(b) {
    const l = lesionOf(b);
    return l ? pointInPolygon(b.point, l.points) : false;
  }

  function copyAll() {
    const text = biopsies.map(b => `${b.vial}\t${b.siteText}`).join('\n');
    navigator.clipboard?.writeText(text).then(
      () => notify('瓶号与部位描述已复制，可粘贴至病理申请单'),
      () => notify('复制失败，请手动选择文本', 'warn')
    );
  }

  const vialCount = $derived(biopsies.length);
  const quadrantSpread = $derived.by(() => {
    const set = new Set(biopsies.map(b => pointSite(b.point, geo).quadrant));
    return set.size;
  });
</script>

<PageHead
  eyebrow="活检点位 · 瓶号与部位"
  title="宫颈活检点位登记"
  sub="在图像上点选 1—4 个取材部位，系统按检查编号自动生成瓶号（-B1…-B4），并在图上编号、联动生成部位描述，供病理护士核对。"
>
  {#if c}<span class="tag">{c.accession}</span><StatusBadge status={c.status} />{/if}
</PageHead>

{#if !c}
  <div class="card card-pad empty-state">
    <Icon name="biopsy" size={26} />
    <h2>暂无可登记活检的检查单</h2>
    <p class="muted">已完成检查的检查单会出现在此处。</p>
  </div>
{:else}
  <div class="case-bar card">
    <div class="cb-left">
      <select class="select case-pick" value={c.id} onchange={(e) => pickCase(e.currentTarget.value)} aria-label="选择检查单">
        {#each eligible as x}
          <option value={x.id}>{x.accession} · {x.name} · {STATUS_META[x.status].label}</option>
        {/each}
      </select>
      <div class="cb-meta">
        <span>{c.name} · {c.age} 岁</span><span class="dot-sep">·</span>
        <span>{c.physician}</span><span class="dot-sep">·</span>
        <span>病灶 {lesions.length} 处</span>
      </div>
    </div>
    <FlowStepper items={steps} />
  </div>

  <div class="layout">
    <div class="stage">
      <div class="stage-top">
        <div class="seg" role="group" aria-label="交互模式">
          <button class:on={mode === 'biopsy'} onclick={() => (mode = 'biopsy')}><Icon name="target" size={12} />放置活检点</button>
          <button class:on={mode === 'view'} onclick={() => (mode = 'view')}><Icon name="eye" size={12} />仅查看</button>
        </div>
        <div class="stage-info">
          <span class="chip" class:full={vialCount >= 4}>{vialCount}/4 点位</span>
          <span class="chip">{quadrantSpread} 个象限</span>
          {#if !editable}<span class="chip lockchip"><Icon name="shield" size={10} />已锁定</span>{/if}
        </div>
      </div>

      {#if c.status === 'pending'}
        <div class="banner">
          <Icon name="info" size={14} />
          <span>该检查单尚未提交检查结论。请先完成<b>图像标注</b>并提交，再登记活检点位。</span>
        </div>
      {/if}

      <div class="strip-wrap">
        <ColpoStrip
          {exam}
          mode={editable && mode === 'biopsy' ? 'biopsy' : 'annotate'}
          activeBiopsyId={activeBiopsy?.id || null}
          activeLesionId={null}
          onselectbiopsy={(id) => (activeBiopsyId = id)}
          onbiopsypoint={handleBiopsyPoint}
          onmovepoint={handleMovePoint}
          onselectlesion={() => {}}
          oncreate={() => {}}
          showGrid={true}
          showLabels={true}
          showTz={true}
          hint={editable && mode === 'biopsy' ? '点击图像放置活检点 · 拖动点位微调' : ''}
        />
      </div>
      <div class="stage-foot">
        <span class="tiny muted">点击图像放置活检点位；拖动点位可微调。实心圆 = 活检部位，右上角数字 = 瓶序。</span>
        <div class="toolbar">
          <button class="btn btn-xs" onclick={copyAll} disabled={!biopsies.length}><Icon name="file" size={11} />复制瓶号清单</button>
        </div>
      </div>
    </div>

    <aside class="panel">
      <section class="block">
        <header class="bh">
          <h3>活检瓶号 <span class="count">{vialCount}</span></h3>
          {#if vialCount >= 4}<span class="chip">已达上限</span>{:else}<span class="tiny muted">还可添加 {4 - vialCount} 个</span>{/if}
        </header>
        {#if !biopsies.length}
          <div class="empty-note">
            <p>尚未登记活检点位。</p>
            <p class="tiny">在图像上点击取材部位即可生成瓶号；每处会记录钟面方位、象限、距宫颈口距离与转化区位置。</p>
          </div>
        {/if}
        <ol class="vial-list">
          {#each biopsies as b, i}
            {@const site = pointSite(b.point, geo)}
            <li class:on={b.id === activeBiopsy?.id}>
              <button type="button" class="vial-body" onclick={() => (activeBiopsyId = b.id)} aria-label="选中瓶号 {b.vial}" aria-pressed={b.id === activeBiopsy?.id}></button>
              <div class="vl-top">
                <span class="vn">{i + 1}</span>
                <span class="vial-code">{b.vial}</span>
                <span class="vl-clock">{site.hourText}</span>
                {#if editable}
                  <button class="ll-del" onclick={(e) => { e.stopPropagation(); del(b); }} title="删除点位" aria-label="删除点位"><Icon name="trash" size={12} /></button>
                {/if}
              </div>
              <p class="vl-site">{b.siteText}</p>
              <div class="vl-tags">
                <span class="mini-tag quad">{site.quadrant}象限</span>
                <span class="mini-tag">{site.distanceMM} mm</span>
                <span class="mini-tag tz" class:out={site.tzText === '转化区外'}>{site.tzText}</span>
                {#if lesionOf(b)}
                  <span class="mini-tag les">{pointInPolygon(b.point, lesionOf(b).points) ? '灶内' : '灶缘外'}</span>
                {:else}
                  <span class="mini-tag none">未对应标注灶</span>
                {/if}
              </div>
              {#if !insideLesion(b) && b.pathGrade}
                <p class="warnline"><Icon name="alert" size={10} />该点位不在标注病灶内，病理回报后可能提示复核</p>
              {/if}
              <div class="vl-extra">
                <label class="take">
                  <span>取材者</span>
                  <input class="input tiny-input" value={b.takenBy || ''} onchange={(e) => updateBiopsy(c.id, b.id, { takenBy: e.currentTarget.value })} disabled={!editable} placeholder="医师" />
                </label>
                <label class="take note">
                  <span>备注</span>
                  <input class="input tiny-input" value={b.note || ''} onchange={(e) => updateBiopsy(c.id, b.id, { note: e.currentTarget.value })} disabled={!editable} placeholder="取材所见（可选）" />
                </label>
              </div>
            </li>
          {/each}
        </ol>
      </section>

      <section class="block">
        <header class="bh"><h3>病灶对照</h3></header>
        <ul class="les-ref">
          {#each lesions as l, i}
            {@const span = polygonClockSpan(l.points, geo)}
            {@const hits = biopsies.filter(b => pointInPolygon(b.point, l.points))}
            <li>
              <span class="lr-i">{i + 1}</span>
              <span class="lr-span">{span.label}</span>
              <span class="lr-grade" class:hi={l.grade !== '低级别'}>{l.grade}</span>
              <span class="lr-hits num">{hits.length ? hits.map(h => h.seq).join('、') : '—'}</span>
            </li>
          {/each}
          {#if !lesions.length}<li class="muted small pad">无标注病灶</li>{/if}
        </ul>
        {#if lesions.length && lesions.some(l => !biopsies.some(b => pointInPolygon(b.point, l.points)))}
          <p class="hint-warn"><Icon name="alert" size={11} />有病灶未取点，建议在报告中说明理由。</p>
        {/if}
      </section>

      <section class="block">
        <header class="bh"><h3>提交活检</h3></header>
        <div class="submit-zone">
          {#if c.status === 'examined'}
            {#if !guard.ok}<p class="guard-msg"><Icon name="info" size={12} />{guard.message}</p>{/if}
            <button class="btn btn-primary submit" disabled={!can('biopsy')} onclick={() => { if (guard.ok) confirm = true; else notify(guard.message, 'warn'); }}>
              <Icon name="check" size={14} />确认取点并送病理
            </button>
            <p class="tiny muted center">提交后状态转为「待活检」，病理护士可回填每个瓶号</p>
          {:else if c.status === 'pending'}
            <p class="tiny muted center">请先提交检查结论</p>
          {:else}
            <span class="done-chip"><Icon name="check" size={12} />已送检（{STATUS_META[c.status].label}）</span>
          {/if}
        </div>
      </section>
    </aside>
  </div>
{/if}

<Modal open={confirm} title="确认活检取点" subtitle="确认后将生成病理申请，瓶号与部位描述同步至病理护士工作台" width={540} onclose={() => (confirm = false)}>
  <div class="confirm-list">
    {#each biopsies as b, i}
      <div class="cl-row">
        <span class="cl-n">{i + 1}</span>
        <span class="cl-vial">{b.vial}</span>
        <span class="cl-site">{b.siteText}</span>
      </div>
    {/each}
  </div>
  <div class="warn-strip">
    <Icon name="alert" size={14} />
    <span>送检后图像与点位锁定，病理结果必须全部回填才可进入随访。</span>
  </div>
  {#snippet footer()}
    <button class="btn" onclick={() => (confirm = false)}>返回检查</button>
    <button class="btn btn-primary" onclick={submit}><Icon name="check" size={14} />确认送检</button>
  {/snippet}
</Modal>

<style>
  .empty-state { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 60px 20px; color: var(--ink-3); text-align: center; }
  .empty-state h2 { font-size: 15px; color: var(--ink); font-weight: 600; }
  .case-bar { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 11px 14px; margin-bottom: 12px; flex-wrap: wrap; }
  .cb-left { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; min-width: 0; }
  .case-pick { width: auto; max-width: 280px; height: 30px; font-size: 12px; }
  .cb-meta { display: flex; align-items: center; gap: 6px; font-size: 11.5px; color: var(--ink-3); }
  .dot-sep { color: var(--ink-4); }
  .layout { display: grid; grid-template-columns: minmax(0, 1fr) 380px; gap: 12px; align-items: start; }
  .stage { background: var(--panel); border: 1px solid var(--line); border-radius: var(--r); overflow: hidden; box-shadow: var(--shadow-sm); }
  .stage-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 9px 12px; border-bottom: 1px solid var(--line); background: var(--panel-2); flex-wrap: wrap; }
  .stage-info { display: flex; gap: 6px; flex-wrap: wrap; }
  .chip.full { background: var(--amber-bg); color: var(--amber); }
  .lockchip { background: #eef1ef; color: var(--ink-3); }
  .banner { display: flex; gap: 8px; align-items: flex-start; padding: 9px 13px; background: var(--amber-bg); color: #7c4a06; font-size: 12px; border-bottom: 1px solid var(--amber-line); line-height: 1.5; }
  .banner b { font-weight: 650; }
  .strip-wrap { padding: 10px; background: #0c1411; }
  .stage-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 9px 13px; border-top: 1px solid var(--line); flex-wrap: wrap; }
  .panel { display: flex; flex-direction: column; gap: 10px; }
  .block { background: var(--panel); border: 1px solid var(--line); border-radius: var(--r); box-shadow: var(--shadow-sm); overflow: hidden; }
  .bh { display: flex; align-items: center; justify-content: space-between; padding: 10px 13px; border-bottom: 1px solid var(--line); background: var(--panel-2); gap: 8px; }
  .bh h3 { font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: var(--ink-3); font-weight: 650; display: flex; align-items: center; gap: 6px; }
  .count { background: var(--accent-soft); color: var(--accent-2); border-radius: 5px; padding: 0 5px; font-size: 10px; letter-spacing: 0; }
  .empty-note { padding: 18px 14px; text-align: center; font-size: 12px; color: var(--ink-3); display: flex; flex-direction: column; gap: 5px; line-height: 1.55; }
  .vial-list { list-style: none; margin: 0; padding: 0; }
  .vial-list li { padding: 10px 13px; border-bottom: 1px solid #eef1ec; cursor: pointer; transition: background .12s; position: relative; }
  .vial-body { position: absolute; inset: 0; border: 0; background: transparent; padding: 0; }
  .vial-body:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }
  .vial-list li > :not(.vial-body) { position: relative; pointer-events: none; }
  .vial-list li :global(.ll-del), .vial-list li :global(.tiny-input) { pointer-events: auto; }
  .vial-list li:last-child { border-bottom: 0; }
  .vial-list li:hover { background: #fafcf9; }
  .vial-list li.on { background: #f1f8f5; box-shadow: inset 2px 0 0 var(--accent); }
  .vl-top { display: flex; align-items: center; gap: 7px; }
  .vn { width: 18px; height: 18px; border-radius: 50%; background: var(--accent); color: #fff; display: grid; place-items: center; font-size: 10px; font-weight: 700; flex: none; }
  .vial-code { font-family: var(--mono); font-size: 11px; background: #f0f3ef; border: 1px solid #e3e8e2; padding: 1px 6px; border-radius: 5px; color: var(--ink-2); }
  .vl-clock { font-size: 12px; font-weight: 600; margin-left: auto; color: var(--ink-2); }
  .ll-del { border: 0; background: transparent; color: var(--ink-4); padding: 2px; border-radius: 4px; display: inline-flex; }
  .ll-del:hover { background: var(--red-bg); color: var(--red); }
  .vl-site { font-size: 11.5px; color: var(--ink-3); margin-top: 4px; line-height: 1.45; }
  .vl-tags { display: flex; gap: 3px; flex-wrap: wrap; margin-top: 5px; }
  .mini-tag { font-size: 9.5px; font-weight: 600; padding: 1px 5px; border-radius: 4px; background: #eef2ed; color: var(--ink-2); }
  .mini-tag.quad { background: #eef3fb; color: #2b528f; font-weight: 500; }
  .mini-tag.tz { background: #e3f4ef; color: #0b6b5f; }
  .mini-tag.tz.out { background: var(--amber-bg); color: var(--amber); }
  .mini-tag.les { background: #fdeef3; color: #a1124c; }
  .mini-tag.none { background: #f4f6f3; color: var(--ink-4); }
  .warnline { display: flex; align-items: center; gap: 4px; font-size: 10px; color: var(--amber); margin-top: 5px; font-weight: 500; }
  .vl-extra { display: flex; gap: 6px; margin-top: 7px; }
  .take { display: flex; align-items: center; gap: 4px; font-size: 9.5px; color: var(--ink-3); flex: 1; min-width: 0; }
  .take.note { flex: 1.6; }
  .tiny-input { height: 25px; font-size: 11px; padding: 0 6px; }
  .les-ref { list-style: none; margin: 0; padding: 0; }
  .les-ref li { display: flex; align-items: center; gap: 8px; padding: 7px 13px; border-bottom: 1px solid #f0f3ee; font-size: 11.5px; }
  .les-ref li:last-child { border-bottom: 0; }
  .les-ref li.pad { color: var(--ink-4); }
  .lr-i { width: 16px; height: 16px; border-radius: 50%; background: #eef2ed; display: grid; place-items: center; font-size: 9px; font-weight: 700; color: var(--ink-2); flex: none; }
  .lr-span { flex: 1; font-weight: 500; }
  .lr-grade { font-size: 10px; color: var(--ink-3); }
  .lr-grade.hi { color: #a1124c; font-weight: 600; }
  .lr-hits { font-family: var(--mono); font-size: 10.5px; color: var(--ink-3); min-width: 40px; text-align: right; }
  .hint-warn { display: flex; align-items: flex-start; gap: 5px; font-size: 10.5px; color: var(--amber); padding: 8px 13px; background: #fffdf6; line-height: 1.45; border-top: 1px solid #f6efdd; }
  .submit-zone { padding: 12px 13px; display: flex; flex-direction: column; gap: 7px; }
  .guard-msg { display: flex; gap: 6px; align-items: flex-start; font-size: 11px; color: var(--amber); line-height: 1.45; background: var(--amber-bg); padding: 7px 9px; border-radius: 7px; }
  .submit { width: 100%; height: 36px; }
  .center { text-align: center; }
  .done-chip { display: inline-flex; align-items: center; gap: 6px; justify-content: center; font-size: 12px; font-weight: 600; color: var(--accent-2); background: var(--accent-soft); padding: 8px; border-radius: 8px; }
  .confirm-list { display: flex; flex-direction: column; gap: 5px; margin-bottom: 12px; }
  .cl-row { display: flex; align-items: center; gap: 8px; font-size: 12px; background: var(--panel-2); border: 1px solid var(--line); border-radius: 7px; padding: 7px 9px; }
  .cl-n { width: 17px; height: 17px; border-radius: 50%; background: var(--accent); color: #fff; display: grid; place-items: center; font-size: 9.5px; font-weight: 700; flex: none; }
  .cl-vial { font-family: var(--mono); font-size: 10.5px; color: var(--ink-2); }
  .cl-site { flex: 1; color: var(--ink-3); font-size: 11px; text-align: right; }
  @media (max-width: 1180px) { .layout { grid-template-columns: 1fr; } .panel { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: start; } }
  @media (max-width: 760px) { .panel { grid-template-columns: 1fr; } .case-bar { align-items: flex-start; } }
</style>
