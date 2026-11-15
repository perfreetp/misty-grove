<script>
  import {
    STATUS_FLOW, STATUS_META, PATH_GRADES, PATH_SEVERITY, POSITIVE_CIN1, POSITIVE_CIN2,
    pointSite, pointInPolygon, polygonClockSpan, fmtCN, todayISO, guardAdvance,
    pathologyProgress, pathologyComplete, worstGrade, LESION_GRADE_SEVERITY
  } from '../lib/domain.js';
  import {
    store, can, currentCase, selectCase, updateBiopsy, commitPathology, notify
  } from '../lib/store.svelte.js';
  import ColpoStrip from '../components/ColpoStrip.svelte';
  import PageHead from '../components/PageHead.svelte';
  import StatusBadge from '../components/StatusBadge.svelte';
  import FlowStepper from '../components/FlowStepper.svelte';
  import Modal from '../components/Modal.svelte';
  import Icon from '../components/Icon.svelte';

  let activeBiopsyId = $state(null);
  let confirm = $state(false);
  let showFinished = $state(false);
  let hoverBiopsyId = $state(null);

  const eligible = $derived.by(() => {
    const open = store.cases
      .filter(x => ['biopsy', 'pathology'].includes(x.status))
      .sort((a, b) => (a.status === 'biopsy' ? 0 : 1) - (b.status === 'biopsy' ? 0 : 1));
    const done = store.cases.filter(x => ['followup', 'closed'].includes(x.status) && (x.exam?.biopsies || []).length);
    return showFinished ? [...open, ...done] : open;
  });
  const c = $derived((eligible.find(x => x.id === store.selectedId)) || eligible[0] || null);
  const exam = $derived(c?.exam || null);
  const biopsies = $derived(exam?.biopsies || []);
  const lesions = $derived(exam?.lesions || []);
  const geo = $derived(exam?.geometry || DEFAULT_GEO);
  const progress = $derived(pathologyProgress(exam));
  const complete = $derived(pathologyComplete(exam));
  const editable = $derived(c ? c.status === 'biopsy' && can('pathology') : false);
  const guard = $derived(c ? guardAdvance(c, 'pathology') : { ok: false, message: '' });
  const worst = $derived(exam ? worstGrade(exam) : null);

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

  function setGrade(b, grade) {
    updateBiopsy(c.id, b.id, { pathGrade: grade || null, pathDate: b.pathDate || (grade ? todayISO() : null) });
    if (grade) activeBiopsyId = b.id;
  }

  function fillRest(grade) {
    const empty = biopsies.filter(b => !b.pathGrade);
    if (!empty.length) { notify('所有瓶号均已回填', 'info'); return; }
    empty.forEach(b => updateBiopsy(c.id, b.id, { pathGrade: grade, pathDate: todayISO() }));
    notify(`已将其余 ${empty.length} 瓶批量回填为「${grade}」，请逐瓶核对`, 'info');
  }

  function submit() {
    const ok = commitPathology(c.id);
    confirm = false;
  }

  function lesionOf(b) {
    return lesions.find(l => l.id === b.lesionId) || null;
  }

  function mismatch(b) {
    if (!b.pathGrade) return null;
    const sev = PATH_SEVERITY[b.pathGrade];
    const l = lesionOf(b);
    const inside = l ? pointInPolygon(b.point, l.points) : false;
    if (sev >= 1 && !inside) {
      return { code: 'pos-outside', text: '阳性点位不在标注病灶内', level: 'warn' };
    }
    if (sev >= 2 && l && LESION_GRADE_SEVERITY[l.grade] <= 1) {
      return { code: 'grade-up', text: `镜下${l.grade}、病理${b.pathGrade}，分级升级`, level: 'warn' };
    }
    if (b.pathGrade === '取材不足 / 无法评价') {
      return { code: 'inadequate', text: '取材不足，建议补取', level: 'warn' };
    }
    return null;
  }

  const flagCount = $derived(biopsies.filter(b => mismatch(b)).length);
  const positive = $derived(biopsies.filter(b => POSITIVE_CIN1.includes(b.pathGrade)).length);
  const positive2 = $derived(biopsies.filter(b => POSITIVE_CIN2.includes(b.pathGrade)).length);

  const gradeTone = g => {
    if (!g) return 'none';
    const s = PATH_SEVERITY[g];
    if (s >= 5) return 'cancer';
    if (s >= 3) return 'cin3';
    if (s === 2) return 'cin2';
    if (s === 1) return 'cin1';
    if (g === '取材不足 / 无法评价') return 'inadeq';
    return 'neg';
  };

  function copyResult() {
    const lines = biopsies.map(b => `${b.vial}\t${b.siteText}\t${b.pathGrade || '待回填'}\t${b.pathDate || ''}`);
    navigator.clipboard?.writeText(lines.join('\n')).then(
      () => notify('病理结果已复制'),
      () => notify('复制失败，请手动选择', 'warn')
    );
  }
</script>

<PageHead
  eyebrow="病理回填 · 瓶号联动"
  title="病理结果回填与点位核对"
  sub="逐瓶回填 CIN 分级与报告日期。选择瓶号时图像同步高亮对应点位；阳性点位落在病灶轮廓外或病理级别高于镜下所见时自动标黄提示复核。"
>
  {#if c}<span class="tag">{c.accession}</span><StatusBadge status={c.status} />{/if}
  <button class="btn btn-sm" onclick={() => (showFinished = !showFinished)}>
    <Icon name="layers" size={13} />{showFinished ? '只看待回填' : '含已完成病例'}
  </button>
</PageHead>

{#if !c}
  <div class="card card-pad empty-state">
    <Icon name="pathology" size={26} />
    <h2>暂无待回填的病理</h2>
    <p class="muted">活检送检后，检查单会进入「待活检」队列等待病理回填。</p>
  </div>
{:else}
  <div class="case-bar card">
    <div class="cb-left">
      <select class="select case-pick" value={c.id} onchange={(e) => pickCase(e.currentTarget.value)} aria-label="选择检查单">
        {#each eligible as x}
          <option value={x.id}>{x.accession} · {x.name} · {STATUS_META[x.status].label} · {pathologyProgress(x.exam).done}/{pathologyProgress(x.exam).total}</option>
        {/each}
      </select>
      <div class="cb-meta">
        <span>{c.name} · {c.age} 岁</span><span class="dot-sep">·</span>
        <span>取材 {c.exam?.examDate ? fmtCN(c.exam.examDate) : '—'}</span><span class="dot-sep">·</span>
        <span>{biopsies.length} 瓶</span>
      </div>
    </div>
    <div class="cb-right">
      <div class="prog">
        <div class="prog-bar"><span style="width:{progress.pct}%"></span></div>
        <span class="prog-txt num">{progress.done}/{progress.total}</span>
      </div>
      <FlowStepper items={steps} />
    </div>
  </div>

  <div class="layout">
    <div class="stage">
      <div class="stage-top">
        <div class="stage-info">
          <span class="chip" class:ok={complete}>{complete ? '病理齐全' : `待回填 ${progress.total - progress.done} 瓶`}</span>
          <span class="chip">{positive2} 瓶 CIN2+</span>
          {#if flagCount}<span class="chip flaged"><Icon name="alert" size={10} />{flagCount} 项待复核</span>{/if}
        </div>
        <span class="tiny muted">图像点位与瓶号一一对应，点击右侧瓶号可定位</span>
      </div>
      <div class="strip-wrap">
        <ColpoStrip
          {exam}
          mode="annotate"
          activeBiopsyId={hoverBiopsyId || activeBiopsyId}
          activeLesionId={null}
          onselectbiopsy={(id) => (activeBiopsyId = id)}
          onselectlesion={() => {}}
          onbiopsypoint={() => {}}
          onmovepoint={() => {}}
          oncreate={() => {}}
          showGrid={true}
          showLabels={true}
          showTz={true}
          hint="点击右侧瓶号可定位对应点位"
        />
      </div>
      <div class="stage-foot">
        <div class="legend-mini">
          <span class="lm"><i class="dot pos2"></i>CIN2 / CIN3 / AIS</span>
          <span class="lm"><i class="dot pos1"></i>CIN1</span>
          <span class="lm"><i class="dot neg"></i>阴性 / 炎症</span>
          <span class="lm"><i class="dot none"></i>待回填</span>
        </div>
        <button class="btn btn-xs" onclick={copyResult}><Icon name="file" size={11} />复制结果</button>
      </div>

      <div class="vials">
        <table class="table">
          <colgroup>
            <col style="width:30px" />
            <col style="width:78px" />
            <col style="width:142px" />
            <col style="width:86px" />
            <col style="width:104px" />
            <col style="width:120px" />
            <col style="width:106px" />
            <col style="width:112px" />
          </colgroup>
          <thead>
            <tr>
              <th class="th-n">#</th>
              <th>瓶号</th>
              <th>取样部位</th>
              <th>镜下病灶</th>
              <th class="th-grade">病理分级</th>
              <th class="th-date">报告日期</th>
              <th>备注</th>
              <th class="th-flag">核对</th>
            </tr>
          </thead>
          <tbody>
            {#each biopsies as b, i}
              {@const m = mismatch(b)}
              {@const l = lesionOf(b)}
              <tr class:on={b.id === activeBiopsyId} class:review={m}
                  onclick={() => (activeBiopsyId = b.id)}
                  onmouseenter={() => (hoverBiopsyId = b.id)}
                  onmouseleave={() => (hoverBiopsyId = null)}>
                <td class="th-n"><span class="ord">{i + 1}</span></td>
                <td class="vial-cell">
                  <span class="vial-code">{b.vial.split('-B')[1] ? 'B' + b.vial.split('-B')[1] : b.vial}</span>
                  <span class="vial-full" title={b.vial}>{b.vial.replace(/^C-\d{4}-/, '')}</span>
                </td>
                <td class="site">
                  <div class="loc">{pointSite(b.point, geo).hourText} · {pointSite(b.point, geo).quadrant}象限</div>
                  <div class="tiny muted">距宫颈口 {pointSite(b.point, geo).distanceMM}mm</div>
                  <div class="tiny muted">{pointSite(b.point, geo).tzText}</div>
                </td>
                <td>
                  {#if l}
                    <span class="les-tag {l.grade === '低级别' ? 'low' : 'high'}">{l.grade}</span>
                    <span class="tiny muted">{polygonClockSpan(l.points, geo).label}</span>
                  {:else}
                    <span class="tiny muted">未标注灶</span>
                  {/if}
                </td>
                <td class="th-grade">
                  <select class="select grade-select {gradeTone(b.pathGrade)}" value={b.pathGrade || ''}
                    onchange={(e) => setGrade(b, e.currentTarget.value)} disabled={!editable} aria-label="病理分级">
                    <option value="">待回填</option>
                    {#each PATH_GRADES as g}<option value={g}>{g}</option>{/each}
                  </select>
                </td>
                <td class="th-date">
                  <input class="input date-input" type="date" value={b.pathDate || ''} onchange={(e) => updateBiopsy(c.id, b.id, { pathDate: e.currentTarget.value })} disabled={!editable} aria-label="报告日期" />
                </td>
                <td><input class="input note-input" value={b.pathNote || ''} onchange={(e) => updateBiopsy(c.id, b.id, { pathNote: e.currentTarget.value })} disabled={!editable} placeholder="p16 / 切缘 / 腺体…" /></td>
                <td class="th-flag">
                  {#if m}
                    <span class="flag"><Icon name="alert" size={11} /><span>{m.text}</span></span>
                  {:else if b.pathGrade}
                    <span class="okflag"><Icon name="check" size={11} />已核对</span>
                  {:else}
                    <span class="tiny muted">—</span>
                  {/if}
                </td>
              </tr>
            {:else}
              <tr><td colspan="8" class="empty">该检查单没有活检瓶号</td></tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>

    <aside class="panel">
      {#if flagCount}
        <div class="warn-strip">
          <Icon name="alert" size={14} />
          <span>有 {flagCount} 项点位与病理不一致，已标黄。请核对取材部位或联系医师复核后再提交。</span>
        </div>
      {/if}

      {#if editable}
        <section class="block">
          <header class="bh"><h3>批量回填</h3></header>
          <div class="batch">
            <p class="tiny muted">仅对尚未回填的瓶号生效，回填后仍需逐瓶确认。</p>
            <div class="batch-btns">
              <button class="btn btn-sm" onclick={() => fillRest('未见CIN / 炎症')}>其余阴性</button>
              <button class="btn btn-sm" onclick={() => fillRest('CIN 1')}>其余 CIN1</button>
              <button class="btn btn-sm" onclick={() => fillRest('CIN 2')}>其余 CIN2</button>
            </div>
          </div>
        </section>
      {/if}

      <section class="block">
        <header class="bh"><h3>结果汇总</h3></header>
        <div class="summary-box">
          <div class="sm-row">
            <span class="sm-k">最高分级</span>
            <span class="sm-v {gradeTone(worst)}">{worst || '—'}</span>
          </div>
          <div class="sm-row">
            <span class="sm-k">CIN1+ 瓶数</span>
            <span class="sm-v num">{positive} / {biopsies.length}</span>
          </div>
          <div class="sm-row">
            <span class="sm-k">CIN2+ 瓶数</span>
            <span class="sm-v num">{positive2} / {biopsies.length}</span>
          </div>
          <div class="sm-row">
            <span class="sm-k">回填进度</span>
            <span class="sm-v num">{progress.done} / {progress.total}</span>
          </div>
        </div>
        {#if !complete && biopsies.length}
          <p class="notready"><Icon name="info" size={11} />病理未填全，不可开启随访或结案</p>
        {/if}
      </section>

      <section class="block">
        <header class="bh"><h3>提交病理</h3></header>
        <div class="submit-zone">
          {#if c.status === 'biopsy'}
            {#if !guard.ok}<p class="guard-msg"><Icon name="info" size={12} />{guard.message}</p>{/if}
            <button class="btn btn-primary submit" disabled={!can('pathology') || !complete} onclick={() => { if (guard.ok) confirm = true; else notify(guard.message, 'warn'); }}>
              <Icon name="check" size={14} />提交病理结果
            </button>
            <p class="tiny muted center">全部瓶号回填并填写报告日期后方可提交</p>
          {:else if c.status === 'pathology'}
            <span class="done-chip"><Icon name="check" size={12} />病理已归档</span>
            <p class="tiny muted center">下一步：在「随访对比」中开启随访</p>
          {:else}
            <span class="done-chip"><Icon name="shield" size={12} />已进入{STATUS_META[c.status].label}</span>
          {/if}
        </div>
      </section>
    </aside>
  </div>
{/if}

<Modal open={confirm} title="提交病理结果" subtitle="提交后病理归档，检查单转为「已出病理」，即可开启随访" width={540} onclose={() => (confirm = false)}>
  <div class="confirm">
    <dl class="kv">
      <dt>检查单</dt><dd>{c?.accession} · {c?.name}</dd>
      <dt>最高分级</dt><dd><strong>{worst || '—'}</strong></dd>
      <dt>瓶号结果</dt><dd>{biopsies.map(b => `${b.vial.slice(-3)} ${b.pathGrade}`).join(' · ')}</dd>
      <dt>待复核</dt><dd>{flagCount ? `${flagCount} 项，已标黄` : '无'}</dd>
    </dl>
    {#if flagCount}
      <div class="warn-strip"><Icon name="alert" size={14} /><span>存在不一致项，仍要提交将记入复核记录，由医师确认。</span></div>
    {/if}
  </div>
  {#snippet footer()}
    <button class="btn" onclick={() => (confirm = false)}>返回核对</button>
    <button class="btn btn-primary" onclick={submit}><Icon name="check" size={14} />确认归档</button>
  {/snippet}
</Modal>

<style>
  .empty-state { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 60px 20px; color: var(--ink-3); text-align: center; }
  .empty-state h2 { font-size: 15px; color: var(--ink); font-weight: 600; }
  .case-bar { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 11px 14px; margin-bottom: 12px; flex-wrap: wrap; }
  .cb-left { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; min-width: 0; }
  .case-pick { width: auto; max-width: 300px; height: 30px; font-size: 12px; }
  .cb-meta { display: flex; align-items: center; gap: 6px; font-size: 11.5px; color: var(--ink-3); }
  .dot-sep { color: var(--ink-4); }
  .cb-right { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
  .prog { display: flex; align-items: center; gap: 7px; }
  .prog-bar { width: 84px; height: 5px; border-radius: 3px; background: #e6ebe5; overflow: hidden; }
  .prog-bar span { display: block; height: 100%; background: var(--accent); border-radius: 3px; transition: width .25s; }
  .prog-txt { font-size: 11px; color: var(--ink-3); }

  .layout { display: grid; grid-template-columns: minmax(0, 1fr) 330px; gap: 12px; align-items: start; }
  .stage { background: var(--panel); border: 1px solid var(--line); border-radius: var(--r); overflow: hidden; box-shadow: var(--shadow-sm); }
  .stage-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 9px 12px; border-bottom: 1px solid var(--line); background: var(--panel-2); flex-wrap: wrap; }
  .stage-info { display: flex; gap: 6px; flex-wrap: wrap; }
  .chip.ok { background: #e3f4ef; color: #0b6b5f; }
  .chip.flaged { background: var(--amber-bg); color: var(--amber); }
  .strip-wrap { padding: 10px; background: #0c1411; }
  .stage-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 8px 13px; border-top: 1px solid var(--line); flex-wrap: wrap; }
  .legend-mini { display: flex; gap: 12px; flex-wrap: wrap; }
  .lm { display: inline-flex; align-items: center; gap: 4px; font-size: 10px; color: var(--ink-3); }
  .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
  .dot.pos2 { background: #f6a7c1; } .dot.pos1 { background: #ffd98a; } .dot.neg { background: #a7d9c4; } .dot.none { background: #cfd8d2; }

  .vials { max-height: 420px; overflow: auto; border-top: 1px solid var(--line); }
  .vials .table { width: 100%; min-width: 760px; border-collapse: separate; border-spacing: 0; table-layout: fixed; }
  .vials th { background: var(--panel-2); }
  .vials td { border-bottom: 1px solid #edf0ec; }
  tbody tr { cursor: pointer; }
  tbody tr.on td { background: #f0f8f5; }
  tbody tr.review td { background: #fffcf0; }
  tbody tr.review.on td { background: #fff7e2; }
  .th-n { width: 34px; }
  .ord { width: 18px; height: 18px; border-radius: 50%; background: #eef2ed; display: grid; place-items: center; font-size: 9.5px; font-weight: 700; color: var(--ink-2); }
  .vial-cell { white-space: nowrap; }
  .vial-code { display: inline-block; font-family: var(--mono); font-size: 11px; font-weight: 600; background: #f0f3ef; border: 1px solid #e3e8e2; padding: 1px 5px; border-radius: 4px; }
  .vial-full { display: block; font-size: 8.5px; color: var(--ink-4); font-family: var(--mono); margin-top: 2px; letter-spacing: -.03em; }
  .site { font-size: 11px; line-height: 1.4; }
  .site .loc { white-space: nowrap; }
  .les-tag { display: inline-block; font-size: 9.5px; font-weight: 700; padding: 1px 5px; border-radius: 4px; }
  .les-tag.low { background: #fef3d6; color: #8a4d05; }
  .les-tag.high { background: #fde8ef; color: #a1124c; }
  .th-grade { width: auto; }
  .grade-select { height: 30px; font-size: 11.5px; padding-left: 8px; font-weight: 600; }
  .grade-select.cin2, .grade-select.cin3, .grade-select.cancer { border-color: #ecb7c8; background: #fffafb; color: #a1124c; }
  .grade-select.cin1 { border-color: #ecd09a; background: #fffdf6; color: #8a4d05; }
  .grade-select.neg { border-color: #cbe5db; background: #fbfefc; color: #0b6b5f; }
  .grade-select.inadeq { border-color: var(--amber-line); background: var(--amber-bg); color: var(--amber); }
  .th-date { width: auto; }
  .date-input { height: 30px; font-size: 11px; padding: 0 6px; }
  .note-input { height: 30px; font-size: 11px; padding: 0 7px; min-width: 120px; }
  .th-flag { width: auto; }
  .th-flag .flag { align-items: flex-start; line-height: 1.35; font-size: 10.5px; }
  .th-flag .flag :global(svg) { flex: none; margin-top: 1px; }
  .okflag { display: inline-flex; align-items: center; gap: 3px; font-size: 10px; color: #0b6b5f; }
  .empty { text-align: center; color: var(--ink-4); padding: 26px 0 !important; font-size: 12px; }

  .panel { display: flex; flex-direction: column; gap: 10px; }
  .block { background: var(--panel); border: 1px solid var(--line); border-radius: var(--r); box-shadow: var(--shadow-sm); overflow: hidden; }
  .bh { padding: 10px 13px; border-bottom: 1px solid var(--line); background: var(--panel-2); }
  .bh h3 { font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: var(--ink-3); font-weight: 650; }
  .batch { padding: 11px 13px; display: flex; flex-direction: column; gap: 8px; }
  .batch-btns { display: flex; gap: 5px; flex-wrap: wrap; }
  .batch-btns .btn { flex: 1; min-width: 74px; }
  .summary-box { padding: 10px 13px; display: flex; flex-direction: column; gap: 8px; }
  .sm-row { display: flex; align-items: center; justify-content: space-between; font-size: 12px; }
  .sm-k { color: var(--ink-3); font-size: 11.5px; }
  .sm-v { font-weight: 600; }
  .sm-v.cin2, .sm-v.cin3, .sm-v.cancer { color: #a1124c; }
  .sm-v.cin1 { color: #8a4d05; }
  .sm-v.neg { color: #0b6b5f; }
  .notready { display: flex; gap: 5px; align-items: center; font-size: 10.5px; color: var(--amber); padding: 8px 13px; background: #fffdf6; border-top: 1px solid #f6efdd; }
  .submit-zone { padding: 12px 13px; display: flex; flex-direction: column; gap: 7px; }
  .guard-msg { display: flex; gap: 6px; align-items: flex-start; font-size: 11px; color: var(--amber); line-height: 1.45; background: var(--amber-bg); padding: 7px 9px; border-radius: 7px; }
  .submit { width: 100%; height: 36px; }
  .center { text-align: center; }
  .done-chip { display: inline-flex; align-items: center; gap: 6px; justify-content: center; font-size: 12px; font-weight: 600; color: var(--accent-2); background: var(--accent-soft); padding: 8px; border-radius: 8px; }
  .confirm { display: flex; flex-direction: column; gap: 12px; }
  @media (max-width: 1180px) { .layout { grid-template-columns: 1fr; } .panel { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: start; } .panel > :global(.warn-strip) { grid-column: 1 / -1; } }
  @media (max-width: 760px) { .panel { grid-template-columns: 1fr; } .cb-right { width: 100%; } }
</style>
