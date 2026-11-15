<script>
  import {
    DEFAULT_GEO, LESION_GRADES, LESION_GRADE_COLOR, TZ_TYPES, hourLabel,
    lesionMetrics, totalAreaMM2, fmtCN, todayISO, guardAdvance, clamp, unitMM, radiusMM
  } from '../lib/domain.js';
  import {
    store, can, currentCase, selectCase, ensureExam, setImage, addLesion, updateLesion,
    removeLesion, submitExam, updateExam, notify, caseById
  } from '../lib/store.svelte.js';
  import { readImageFile } from '../lib/imaging.js';
  import ColpoStrip from '../components/ColpoStrip.svelte';
  import PageHead from '../components/PageHead.svelte';
  import StatusBadge from '../components/StatusBadge.svelte';
  import FlowStepper from '../components/FlowStepper.svelte';
  import Modal from '../components/Modal.svelte';
  import Icon from '../components/Icon.svelte';
  import { STATUS_FLOW, STATUS_META } from '../lib/domain.js';

  let uploadPhase = $state(null);
  let uploadInput = $state(null);
  let pendingUploadPhase = null;
  let busy = $state(false);

  let newStart = $state(7);
  let newEnd = $state(9);
  let newGrade = $state('高级别');
  let newRIn = $state(0.10);
  let newROut = $state(0.24);
  let showAddPanel = $state(true);
  let showSettings = $state(false);
  let activeLesionId = $state(null);
  let showPrior = $state(false);
  let zoom = $state(1);
  let priorOpacity = $state(0.45);
  let confirmSubmit = $state(false);

  const eligible = $derived.by(() =>
    store.cases
      .filter(x => x.status === 'pending' || x.status === 'examined' || x.status === 'biopsy')
      .sort((a, b) => {
        const w = x => (x.status === 'pending' ? 0 : x.status === 'examined' ? 1 : 2);
        return w(a) - w(b);
      })
      .slice(0, 40)
  );
  const c = $derived((eligible.find(x => x.id === store.selectedId)) || eligible[0] || null);
  const exam = $derived(c?.exam || null);
  const geo = $derived(exam?.geometry || DEFAULT_GEO);
  const lesions = $derived(exam?.lesions || []);
  const activeLesion = $derived(lesions.find(l => l.id === activeLesionId) || lesions[0] || null);
  const prior = $derived(c?.priorExams?.[0] || null);
  const metrics = $derived(lesions.map(l => ({ l, m: lesionMetrics(l, geo) })));
  const totalArea = $derived(exam ? totalAreaMM2(exam) : 0);
  const guard = $derived(c ? guardAdvance(c, 'examined') : { ok: false, message: '' });
  const editable = $derived(c ? (c.status === 'pending' || c.status === 'examined') && can('annotate') : false);
  const steps = $derived.by(() => {
    if (!c) return [];
    const idx = STATUS_FLOW.indexOf(c.status);
    return STATUS_FLOW.map((s, i) => ({ label: STATUS_META[s].label, state: i < idx ? 'done' : i === idx ? 'current' : 'todo' }));
  });
  const tzLabel = $derived(TZ_TYPES.find(t => t.key === exam?.tzType)?.label || '—');

  $effect(() => {
    if (c && !store.selectedId) selectCase(c.id);
  });

  function pickCase(id) {
    selectCase(id);
    activeLesionId = null;
    ensureExam(caseById(id));
  }

  function useDemoImages() {
    if (!c) return;
    const ex = ensureExam(c);
    const seed = 200 + store.cases.findIndex(x => x.id === c.id) + 1;
    const lesions = (ex.lesions || []).map(l => ({ points: l.points }));
    ['pre', 'post', 'iodine'].forEach(ph => setImage(c.id, ph, `syn:${seed}:${ph}`, 'demo'));
    notify('已载入演示影像（合成图，非真实患者）', 'info', 4200);
  }

  async function onFile(e) {
    const el = e.currentTarget;
    const files = [...(el.files || [])];
    if (!files.length) return;
    const phase = pendingUploadPhase || 'post';
    busy = true;
    try {
      for (let i = 0; i < files.length && i < 3; i++) {
        const target = files.length === 3 ? ['pre', 'post', 'iodine'][i] : phase;
        const url = await readImageFile(files[i]);
        setImage(c.id, target, url);
      }
      notify(`已导入 ${Math.min(files.length, 3)} 张图像，可在图上重新标定钟面`);
    } catch (err) {
      notify(err.message || '图像导入失败', 'warn');
    } finally {
      busy = false;
      if (el) el.value = '';
      pendingUploadPhase = null;
    }
  }

  function triggerUpload(phase) {
    pendingUploadPhase = phase;
    uploadInput?.click();
  }

  function createLesion() {
    if (!c || !editable) { notify('当前检查单不可标注（需为待检查/已检查且具备医师权限）', 'warn'); return; }
    const ex = ensureExam(c);
    const l = addLesion(c.id, {
      grade: newGrade,
      startHour: newStart,
      endHour: newEnd,
      rIn: newRIn,
      rOut: newROut,
      points: sectorPoints(newStart, newEnd, newRIn, newROut)
    });
    if (l) {
      activeLesionId = l.id;
      notify(`已添加病灶：${hourLabel(newStart)} → ${hourLabel(newEnd)}`);
    }
  }

  const clockArcPath = $derived.by(() => {
    const sax = 60 + 46 * Math.sin((newStart * 30 * Math.PI) / 180);
    const say = 60 - 46 * Math.cos((newStart * 30 * Math.PI) / 180);
    const eax = 60 + 46 * Math.sin((newEnd * 30 * Math.PI) / 180);
    const eay = 60 - 46 * Math.cos((newEnd * 30 * Math.PI) / 180);
    const span = (newEnd - newStart + 12) % 12;
    return `M60,60 L${sax},${say} A46,46 0 ${span > 6 ? 1 : 0},1 ${eax},${eay} Z`;
  });

  function sectorPoints(s, e, rIn, rOut) {
    const g = geo;
    const start = ((Number(s) % 12) + 12) % 12;
    const end = ((Number(e) % 12) + 12) % 12;
    let span = (end - start + 12) % 12;
    if (span === 0) span = 12;
    const n = span >= 12 ? 40 : Math.max(6, Math.round((span / 12) * 40));
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const a = (start + (span * i) / n) * 30 * Math.PI / 180;
      pts.push({ x: g.cx + rOut * Math.sin(a), y: g.cy - rOut * Math.cos(a) });
    }
    for (let i = n; i >= 0; i--) {
      const a = (start + (span * i) / n) * 30 * Math.PI / 180;
      pts.push({ x: g.cx + rIn * Math.sin(a), y: g.cy - rIn * Math.cos(a) });
    }
    return pts;
  }

  function onMovePoints({ lesionId, points }) {
    updateLesion(c.id, lesionId, { points });
  }

  function onSelectLesion(id) {
    activeLesionId = id;
  }

  function deleteLesion(id) {
    removeLesion(c.id, id);
    if (activeLesionId === id) activeLesionId = null;
  }

  function setCircumference(l, value) {
    const v = value === '' ? null : clamp(Number(value), 0, 100);
    updateLesion(c.id, l.id, { circumferenceManual: v });
  }

  async function submit() {
    if (!c) return;
    const ok = submitExam(c.id);
    confirmSubmit = false;
    if (ok) activeLesionId = null;
  }

</script>

<PageHead
  eyebrow="图像标注 · 钟面法"
  title="病灶轮廓与转化区评估"
  sub="醋酸前 / 醋酸后 / 碘染三图并排对照。按 1—12 点方位绘制病灶轮廓，系统自动换算累及周长百分比、累及象限与转化区跨越情况。"
>
  {#if c}
    <span class="tag">{c.accession}</span>
    <StatusBadge status={c.status} />
  {/if}
</PageHead>

{#if !c}
  <div class="card card-pad empty-state">
    <Icon name="annotate" size={26} />
    <h2>暂无待标注的检查单</h2>
    <p class="muted">请先在「检查登记」中登记患者，或选择已有的检查单。</p>
  </div>
{:else}
  <div class="case-bar card">
    <div class="cb-left">
      <span class="eyebrow">当前检查单</span>
      <select class="select case-pick" value={c.id} onchange={(e) => pickCase(e.currentTarget.value)} aria-label="选择检查单">
        {#each eligible as x}
          <option value={x.id}>{x.accession} · {x.name} · {STATUS_META[x.status].label}</option>
        {/each}
      </select>
      <div class="cb-meta">
        <span>{c.name} · {c.age} 岁 · {c.physician}</span>
        <span class="dot-sep">·</span>
        <span>检查日 <strong>{fmtCN(exam?.examDate || c.scheduledAt)}</strong></span>
      </div>
    </div>
    <div class="cb-right">
      <FlowStepper items={steps} />
    </div>
  </div>

  <div class="layout">
    <div class="stage">
      <div class="stage-top">
        <div class="toolbar">
          <button class="btn btn-sm" onclick={() => triggerUpload('pre')} disabled={!editable}><Icon name="upload" size={13} />醋酸前</button>
          <button class="btn btn-sm" onclick={() => triggerUpload('post')} disabled={!editable}><Icon name="upload" size={13} />醋酸后</button>
          <button class="btn btn-sm" onclick={() => triggerUpload('iodine')} disabled={!editable}><Icon name="upload" size={13} />碘染</button>
          <span class="vsep"></span>
          <button class="btn btn-sm btn-soft" onclick={() => triggerUpload('post')} disabled={!editable} title="可一次选择三张">
            <Icon name="upload" size={13} />批量导入三图
          </button>
          <button class="btn btn-sm btn-ghost" onclick={useDemoImages} disabled={!editable} title="演示环境无真实图像时使用合成图">
            <Icon name="eye" size={13} />演示影像
          </button>
          <input bind:this={uploadInput} type="file" accept="image/*" multiple hidden onchange={onFile} />
        </div>
        <div class="toolbar">
          {#if prior}
            <div class="seg" role="group" aria-label="前次对比">
              <button class:on={!showPrior} onclick={() => (showPrior = false)}>仅本次</button>
              <button class:on={showPrior} onclick={() => (showPrior = true)}>叠前次</button>
            </div>
            {#if showPrior}
              <label class="opacity">
                <span class="tiny muted">透明度 {Math.round(priorOpacity * 100)}%</span>
                <input type="range" min="0.15" max="0.85" step="0.05" bind:value={priorOpacity} />
              </label>
            {/if}
          {:else}
            <span class="chip">无前次影像</span>
          {/if}
          <label class="zoombox" title="图像缩放">
            <Icon name="search" size={12} />
            <input type="range" min="1" max="1.8" step="0.05" bind:value={zoom} aria-label="图像缩放" />
            <span class="tiny num muted">{Math.round(zoom * 100)}%</span>
          </label>
          <button class="icon-btn" title="图像与转化区设置" aria-label="图像与转化区标定" onclick={() => (showSettings = true)}><Icon name="ruler" size={15} /></button>
        </div>
      </div>

      <div class="strip-wrap">
        <ColpoStrip
          {exam}
          {prior}
          priorExam={prior}
          mode="annotate"
          activeLesionId={activeLesion?.id || null}
          {showPrior}
          {priorOpacity}
          {zoom}
          showGrid={true}
          showLabels={true}
          showTz={true}
          hint={editable ? '拖动轮廓整体移动 · 拖顶点改形状 · 双击边缘加点' : ''}
          onselectlesion={onSelectLesion}
          onmovepoint={onMovePoints}
          onselectbiopsy={() => {}}
          onbiopsypoint={() => {}}
        />
      </div>

      <div class="stage-foot">
        <div class="legend">
          {#each LESION_GRADES as g}
            <span class="lg"><i style="background:{LESION_GRADE_COLOR[g].line}"></i>{g}</span>
          {/each}
          <span class="lg"><i class="ring"></i>原始 SCJ</span>
          <span class="lg"><i class="ring inner"></i>新 SCJ / 宫颈口</span>
        </div>
        <div class="metrics-line">
          <span>总标注面积 <strong class="num">{totalArea.toFixed(1)} mm²</strong></span>
          <span class="dot-sep">·</span>
          <span>{lesions.length} 处病灶</span>
          <span class="dot-sep">·</span>
          <span>标定 1 图像单位 ≈ <strong class="num">{unitMM(geo).toFixed(1)}</strong> mm</span>
          <span class="dot-sep">·</span>
          <span>钟面为检查者视角，3 点对应患者左侧</span>
        </div>
      </div>
    </div>

    <aside class="panel">
      {#if editable}
        <section class="block">
          <header class="bh">
            <h3>按钟面添加病灶</h3>
            <button class="btn btn-xs btn-ghost" onclick={() => (showAddPanel = !showAddPanel)}>{showAddPanel ? '收起' : '展开'}</button>
          </header>
          {#if showAddPanel}
            <div class="clock-add">
              <div class="clock-visual" aria-hidden="true">
                <svg viewBox="0 0 120 120" width="100%" height="100%">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#dfe6df" stroke-width="1" />
                  <circle cx="60" cy="60" r="17" fill="none" stroke="#e9d7ae" stroke-width="1" stroke-dasharray="2 3" />
                  {#each Array(12) as _, i}
                    {@const a = ((i + 1) * 30 * Math.PI) / 180}
                    {@const major = (i + 1) % 3 === 0}
                    <line x1={60 + 44 * Math.sin(a)} y1={60 - 44 * Math.cos(a)} x2={60 + 52 * Math.sin(a)} y2={60 - 52 * Math.cos(a)} stroke={major ? '#9db0a7' : '#cdd8d0'} stroke-width={major ? 1.6 : 1} />
                    {#if major}
                      <text x={60 + 36 * Math.sin(a)} y={60 - 36 * Math.cos(a) + 3} text-anchor="middle" font-size="8" fill="#7c8f86" font-family="monospace">{i + 1 === 12 ? '12' : i + 1}</text>
                    {/if}
                  {/each}
                  <path d={clockArcPath} fill="rgba(219,39,119,.14)" stroke="#be185d" stroke-width="1.2" />
                  <circle cx="60" cy="60" r="3" fill="#0f766e" />
                </svg>
              </div>
              <div class="hour-row">
                <div class="field">
                  <label for="hs">起点</label>
                  <select id="hs" class="select" bind:value={newStart}>
                    {#each Array(12) as _, i}<option value={i + 1}>{hourLabel(i + 1)}</option>{/each}
                  </select>
                </div>
                <div class="arrow"><Icon name="arrowRight" size={14} /></div>
                <div class="field">
                  <label for="he">终点</label>
                  <select id="he" class="select" bind:value={newEnd}>
                    {#each Array(12) as _, i}<option value={i + 1}>{hourLabel(i + 1)}</option>{/each}
                  </select>
                </div>
              </div>
              <div class="span-hint">
                顺时针跨度 <strong>{(((newEnd - newStart + 12) % 12) || 12) * 30}°</strong>
                ≈ 周长 <strong>{Math.round(((((newEnd - newStart + 12) % 12) || 12) / 12) * 100)}%</strong>
              </div>
              <div class="field">
                <label for="gr">镜下分级</label>
                <select id="gr" class="select" bind:value={newGrade}>
                  {#each LESION_GRADES as g}<option>{g}</option>{/each}
                </select>
              </div>
              <div class="radius-row">
                <label class="rfield">
                  <span>内径 <em>{radiusMM(newRIn, geo).toFixed(1)}mm</em></span>
                  <input type="range" min="0.02" max="0.2" step="0.005" bind:value={newRIn} />
                </label>
                <label class="rfield">
                  <span>外径 <em>{radiusMM(newROut, geo).toFixed(1)}mm</em></span>
                  <input type="range" min="0.06" max="0.4" step="0.005" bind:value={newROut} />
                </label>
              </div>
              <button class="btn btn-primary btn-sm add-btn" onclick={createLesion}><Icon name="plus" size={13} />添加该钟面病灶</button>
              <p class="tiny muted add-hint">添加后可在图上拖动顶点微调形状，双击边缘可增加顶点。</p>
            </div>
          {/if}
        </section>
      {:else if c.status === 'biopsy' || c.status === 'pathology' || c.status === 'followup' || c.status === 'closed'}
        <div class="warn-strip lock">
          <Icon name="shield" size={14} />
          <span>该检查单已进入「{STATUS_META[c.status].label}」，图像与病灶已锁定。如需修改请联系医师重新开启。</span>
        </div>
      {/if}

      <section class="block">
        <header class="bh">
          <h3>病灶清单 <span class="count">{lesions.length}</span></h3>
        </header>
        {#if !metrics.length}
          <p class="empty-note">尚未标注病灶。使用上方钟面面板添加，或填写「未见异常」说明。</p>
        {/if}
        <ul class="lesion-list">
          {#each metrics as { l, m }, i}
            <li class:on={l.id === activeLesion?.id}>
              <button type="button" class="les-body" onclick={() => (activeLesionId = l.id)} aria-label="选中病灶 {i + 1}" aria-pressed={l.id === activeLesion?.id}></button>
              <div class="ll-top">
                <span class="ll-idx" style="background:{LESION_GRADE_COLOR[l.grade].chip};color:{LESION_GRADE_COLOR[l.grade].text}">{i + 1}</span>
                <span class="ll-span">{m.label}</span>
                <span class="ll-area num">{m.areaMM2.toFixed(0)} mm²</span>
                {#if editable}
                  <button class="ll-del" onclick={(e) => { e.stopPropagation(); deleteLesion(l.id); }} title="删除病灶" aria-label="删除病灶"><Icon name="trash" size={12} /></button>
                {/if}
              </div>
              <div class="ll-tags">
                <span class="mini-tag" style="background:{LESION_GRADE_COLOR[l.grade].chip};color:{LESION_GRADE_COLOR[l.grade].text}">{l.grade}</span>
                {#each m.quadrants as q}<span class="mini-tag quad">{q}</span>{/each}
                <span class="mini-tag tz" class:cross={m.tz.crosses}>{m.tz.crosses ? '越过转化区' : '转化区内'}</span>
              </div>
              <div class="ll-stats">
                <div>
                  <span class="sk">累及周长</span>
                  <span class="sv num">{l.circumferenceManual ?? m.circumference}%</span>
                </div>
                <div>
                  <span class="sk">跨度</span>
                  <span class="sv num">{Math.round(m.spanDeg)}°</span>
                </div>
                <div>
                  <span class="sk">转化区占比</span>
                  <span class="sv num">{Math.round((1 - m.tz.outer) * 100)}%</span>
                </div>
              </div>
              <div class="ll-edit">
                <label class="circ-edit">
                  <span>周长 %</span>
                  <input class="input" type="number" min="0" max="100" step="5"
                    value={l.circumferenceManual ?? m.circumference}
                    onchange={(e) => setCircumference(l, e.currentTarget.value)}
                    disabled={!editable} />
                  {#if l.circumferenceManual != null}
                    <button class="btn btn-xs btn-ghost" onclick={() => setCircumference(l, '')} title="恢复按轮廓计算">重算</button>
                  {/if}
                </label>
                <select class="select grade-sel" value={l.grade} onchange={(e) => updateLesion(c.id, l.id, { grade: e.currentTarget.value })} disabled={!editable} aria-label="病灶分级">
                  {#each LESION_GRADES as g}<option>{g}</option>{/each}
                </select>
              </div>
              <p class="ll-tzline" class:cross={m.tz.crosses}>{m.tz.label}（内 {Math.round(m.tz.inner * 100)}% / 环 {Math.round(m.tz.ring * 100)}% / 外 {Math.round(m.tz.outer * 100)}%）</p>
            </li>
          {/each}
        </ul>
      </section>

      <section class="block">
        <header class="bh"><h3>检查记录</h3></header>
        <div class="form2">
          <div class="field">
            <label for="tz">转化区类型</label>
            <select id="tz" class="select" value={exam?.tzType || 'I'} onchange={(e) => updateExam(c.id, { tzType: e.currentTarget.value })} disabled={!editable}>
              {#each TZ_TYPES as t}<option value={t.key}>{t.label} — {t.hint}</option>{/each}
            </select>
          </div>
          <div class="field-row">
            <div class="field">
              <label for="ed">检查日期</label>
              <input id="ed" class="input" type="date" value={exam?.examDate || todayISO()} onchange={(e) => updateExam(c.id, { examDate: e.currentTarget.value })} disabled={!editable} />
            </div>
            <div class="field">
              <label for="ao">醋酸反应(s)</label>
              <input id="ao" class="input" value={exam?.aceticOnset || ''} onchange={(e) => updateExam(c.id, { aceticOnset: e.currentTarget.value })} disabled={!editable} placeholder="60" />
            </div>
          </div>
          <div class="field">
            <label for="lg">碘试验</label>
            <select id="lg" class="select" value={exam?.lugol || '部分不着色'} onchange={(e) => updateExam(c.id, { lugol: e.currentTarget.value })} disabled={!editable}>
              <option>均匀着染</option><option>部分不着色</option><option>不着色</option><option>芥末黄（不着色）</option><option>完全不着色</option>
            </select>
          </div>
          <div class="field">
            <label for="imp">镜下所见</label>
            <textarea id="imp" class="textarea" rows="3" value={exam?.impression || ''} oninput={(e) => updateExam(c.id, { impression: e.currentTarget.value })} disabled={!editable} placeholder="描述醋白上皮厚度、边界、血管形态、碘染表现…"></textarea>
          </div>
          {#if !lesions.length}
            <div class="field">
              <label for="nl">未见异常说明（无病灶时必填）</label>
              <textarea id="nl" class="textarea" rows="2" value={exam?.noLesionNote || ''} oninput={(e) => updateExam(c.id, { noLesionNote: e.currentTarget.value })} disabled={!editable} placeholder="如：宫颈光滑，醋酸试验未见白色上皮，碘染均匀着染。"></textarea>
            </div>
          {/if}
        </div>
      </section>

      <div class="submit-zone">
        {#if c.status === 'pending'}
          {#if !guard.ok}
            <p class="guard-msg"><Icon name="info" size={12} />{guard.message}</p>
          {/if}
          <button class="btn btn-primary submit" disabled={!can('annotate')} onclick={() => { if (guard.ok) confirmSubmit = true; else notify(guard.message, 'warn'); }}>
            <Icon name="check" size={14} />提交检查结论
          </button>
          <p class="tiny muted center">提交后进入「已检查」，可继续登记活检点位</p>
        {:else if c.status === 'examined'}
          <span class="done-chip"><Icon name="check" size={12} />检查结论已提交</span>
          <p class="tiny muted center">图像仍可微调，活检登记后锁定</p>
        {:else}
          <span class="done-chip"><Icon name="shield" size={12} />已锁定（{STATUS_META[c.status].label}）</span>
        {/if}
      </div>
    </aside>
  </div>
{/if}

<Modal
  open={confirmSubmit}
  title="提交检查结论"
  subtitle="提交后检查单进入「已检查」，三图与病灶标注仍可微调，但活检登记后即锁定"
  width={520}
  onclose={() => (confirmSubmit = false)}
>
  <div class="confirm">
    <dl class="kv">
      <dt>检查单</dt><dd>{c?.accession} · {c?.name}</dd>
      <dt>病灶数</dt><dd>{lesions.length} 处</dd>
      <dt>累及面积</dt><dd>{totalArea.toFixed(1)} mm²</dd>
      <dt>转化区</dt><dd>{tzLabel}<span class="muted small">（SCJ {exam?.scjVisible || '完全可见'}）</span></dd>
      <dt>三图</dt><dd>{exam?.images?.pre ? '✓' : '—'} 醋酸前 / {exam?.images?.post ? '✓' : '—'} 醋酸后 / {exam?.images?.iodine ? '✓' : '—'} 碘染</dd>
    </dl>
    {#if metrics.some(x => x.m.tz.crosses)}
      <div class="warn-strip">
        <Icon name="alert" size={14} />
        <span>存在越过转化区的病灶，建议在报告中注明并对相应象限加强活检。</span>
      </div>
    {/if}
  </div>
  {#snippet footer()}
    <button class="btn" onclick={() => (confirmSubmit = false)}>返回修改</button>
    <button class="btn btn-primary" onclick={submit}><Icon name="check" size={14} />确认提交</button>
  {/snippet}
</Modal>

<Modal open={showSettings} title="钟面与转化区标定" subtitle="用于换算面积与转化区跨越，按实际宫颈大小调整" width={480} onclose={() => (showSettings = false)}>
  <div class="form2">
    <div class="field">
      <span class="label">原始 SCJ 直径（mm）</span>
      <input class="input" type="number" min="15" max="45" value={(2 * geo.outerR * unitMM(geo)).toFixed(1)}
        onchange={(e) => {
          const d = clamp(Number(e.currentTarget.value) || 30, 15, 45);
          const outerR = (30 / d) * (2 * geo.outerR) / 2;
          updateExam(c.id, { geometry: { ...geo, outerR } });
        }} />
      <p class="tiny muted">当前换算：1 图像单位 ≈ {unitMM(geo).toFixed(2)} mm</p>
    </div>
    <div class="field">
      <span class="label">宫颈口直径（mm）</span>
      <input class="input" type="number" min="2" max="15" step="0.5" value={(2 * geo.innerR * unitMM(geo)).toFixed(1)}
        onchange={(e) => {
          const d = clamp(Number(e.currentTarget.value) || 5, 2, 15);
          updateExam(c.id, { geometry: { ...geo, innerR: (d / 2) / unitMM(geo) } });
        }} />
      <p class="tiny muted">内圈代表新鳞柱交界，用于判断是否累及宫颈管。</p>
    </div>
    <div class="warn-strip">
      <Icon name="info" size={14} />
      <span>标定改变会同时影响已标注病灶的面积与转化区判定，请谨慎修改并复核。</span>
    </div>
  </div>
  {#snippet footer()}
    <button class="btn btn-primary" onclick={() => (showSettings = false)}>完成</button>
  {/snippet}
</Modal>

<style>
  .empty-state { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 60px 20px; color: var(--ink-3); text-align: center; }
  .empty-state h2 { font-size: 15px; color: var(--ink); font-weight: 600; }

  .case-bar { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 11px 14px; margin-bottom: 12px; flex-wrap: wrap; }
  .cb-left { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; min-width: 0; }
  .cb-left .eyebrow { font-size: 9px; }
  .case-pick { width: auto; max-width: 280px; height: 30px; font-size: 12px; }
  .cb-meta { display: flex; align-items: center; gap: 6px; font-size: 11.5px; color: var(--ink-3); }
  .cb-meta strong { color: var(--ink-2); font-weight: 600; }
  .dot-sep { color: var(--ink-4); }
  .cb-right { flex: none; }

  .layout { display: grid; grid-template-columns: minmax(0, 1fr) 372px; gap: 12px; align-items: start; }
  .stage { background: var(--panel); border: 1px solid var(--line); border-radius: var(--r); overflow: hidden; box-shadow: var(--shadow-sm); }
  .stage-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 9px 12px; border-bottom: 1px solid var(--line); flex-wrap: wrap; background: var(--panel-2); }
  .vsep { width: 1px; height: 18px; background: var(--line-2); margin: 0 3px; }
  .zoombox { display: flex; align-items: center; gap: 5px; color: var(--ink-4); }
  .zoombox input { width: 76px; accent-color: var(--accent); }
  .opacity { display: flex; flex-direction: column; gap: 1px; min-width: 108px; }
  .opacity input[type="range"] { width: 108px; accent-color: var(--accent); height: 14px; }
  .strip-wrap { padding: 10px; background: #0c1411; }
  .stage-foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 9px 13px; border-top: 1px solid var(--line); flex-wrap: wrap; }
  .legend { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
  .lg { display: inline-flex; align-items: center; gap: 5px; font-size: 10.5px; color: var(--ink-3); }
  .lg i { width: 9px; height: 9px; border-radius: 2px; display: inline-block; }
  .lg i.ring { background: transparent; border: 1px dashed #b6c4bb; border-radius: 50%; }
  .lg i.ring.inner { border-color: #dcc48f; }
  .metrics-line { display: flex; align-items: center; gap: 7px; font-size: 11px; color: var(--ink-3); flex-wrap: wrap; }
  .metrics-line strong { color: var(--ink-2); font-weight: 600; }

  .panel { display: flex; flex-direction: column; gap: 10px; }
  .block { background: var(--panel); border: 1px solid var(--line); border-radius: var(--r); box-shadow: var(--shadow-sm); overflow: hidden; }
  .bh { display: flex; align-items: center; justify-content: space-between; padding: 10px 13px; border-bottom: 1px solid var(--line); background: var(--panel-2); }
  .bh h3 { font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: var(--ink-3); font-weight: 650; display: flex; align-items: center; gap: 6px; }
  .count { background: var(--accent-soft); color: var(--accent-2); border-radius: 5px; padding: 0 5px; font-size: 10px; letter-spacing: 0; }

  .clock-add { padding: 12px 13px; display: flex; flex-direction: column; gap: 10px; }
  .clock-visual { width: 118px; height: 118px; margin: 0 auto; }
  .hour-row { display: flex; align-items: flex-end; gap: 6px; }
  .hour-row .field { flex: 1; }
  .arrow { color: var(--ink-4); padding-bottom: 8px; }
  .span-hint { font-size: 11px; color: var(--ink-3); background: #f6f8f5; border-radius: 7px; padding: 7px 9px; text-align: center; }
  .span-hint strong { color: var(--ink); font-variant-numeric: tabular-nums; }
  .radius-row { display: flex; gap: 10px; }
  .rfield { flex: 1; display: flex; flex-direction: column; gap: 3px; font-size: 10.5px; color: var(--ink-3); min-width: 0; }
  .rfield em { font-style: normal; color: var(--ink-2); font-variant-numeric: tabular-nums; }
  .rfield input { accent-color: var(--accent); width: 100%; }
  .add-btn { width: 100%; height: 32px; }
  .add-hint { text-align: center; }

  .empty-note { padding: 18px 14px; font-size: 12px; color: var(--ink-4); text-align: center; line-height: 1.6; }
  .lesion-list { list-style: none; margin: 0; padding: 0; }
  .lesion-list li { padding: 10px 13px; border-bottom: 1px solid #eef1ec; cursor: pointer; transition: background .12s; position: relative; }
  .les-body { position: absolute; inset: 0; border: 0; background: transparent; padding: 0; border-radius: 0; }
  .les-body:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }
  .lesion-list li > :not(.les-body) { position: relative; pointer-events: none; }
  .lesion-list li :global(.ll-del) { pointer-events: auto; }
  .lesion-list li :global(.circ-edit), .lesion-list li :global(.grade-sel) { pointer-events: auto; }
  .lesion-list li:last-child { border-bottom: 0; }
  .lesion-list li:hover { background: #fafcf9; }
  .lesion-list li.on { background: #f1f8f5; box-shadow: inset 2px 0 0 var(--accent); }
  .ll-top { display: flex; align-items: center; gap: 7px; }
  .ll-idx { width: 18px; height: 18px; border-radius: 50%; display: grid; place-items: center; font-size: 10px; font-weight: 700; flex: none; }
  .ll-span { font-size: 12.5px; font-weight: 600; }
  .ll-area { margin-left: auto; font-size: 11px; color: var(--ink-3); }
  .ll-del { border: 0; background: transparent; color: var(--ink-4); padding: 2px; border-radius: 4px; display: inline-flex; }
  .ll-del:hover { background: var(--red-bg); color: var(--red); }
  .ll-tags { display: flex; gap: 3px; flex-wrap: wrap; margin-top: 5px; }
  .mini-tag { font-size: 9.5px; font-weight: 600; padding: 1px 5px; border-radius: 4px; background: #eef2ed; color: var(--ink-2); }
  .mini-tag.quad { background: #f2f5f1; color: var(--ink-3); font-weight: 500; }
  .mini-tag.tz { background: #e3f4ef; color: #0b6b5f; }
  .mini-tag.tz.cross { background: var(--amber-bg); color: var(--amber); }
  .ll-stats { display: flex; gap: 14px; margin-top: 6px; }
  .ll-stats div { display: flex; flex-direction: column; gap: 0; }
  .sk { font-size: 9px; color: var(--ink-4); }
  .sv { font-size: 11.5px; font-weight: 600; color: var(--ink-2); }
  .ll-edit { display: flex; gap: 6px; margin-top: 7px; align-items: center; }
  .circ-edit { display: flex; align-items: center; gap: 5px; font-size: 10px; color: var(--ink-3); flex: 1; }
  .circ-edit .input { width: 58px; height: 26px; font-size: 11.5px; padding: 0 6px; }
  .grade-sel { width: 84px; height: 26px; font-size: 11.5px; padding-left: 7px; }
  .ll-tzline { font-size: 10px; color: var(--ink-3); margin-top: 6px; line-height: 1.4; }
  .ll-tzline.cross { color: var(--amber); }

  .form2 { padding: 12px 13px; display: flex; flex-direction: column; gap: 10px; }
  .field-row { display: flex; gap: 8px; }
  .field-row .field { flex: 1; }
  .form2 .textarea { font-size: 12px; }

  .submit-zone { background: var(--panel); border: 1px solid var(--line); border-radius: var(--r); padding: 12px 13px; display: flex; flex-direction: column; gap: 7px; box-shadow: var(--shadow-sm); }
  .guard-msg { display: flex; gap: 6px; align-items: flex-start; font-size: 11px; color: var(--amber); line-height: 1.45; background: var(--amber-bg); padding: 7px 9px; border-radius: 7px; }
  .submit { width: 100%; height: 36px; }
  .center { text-align: center; }
  .done-chip { display: inline-flex; align-items: center; gap: 6px; justify-content: center; font-size: 12px; font-weight: 600; color: var(--accent-2); background: var(--accent-soft); padding: 8px; border-radius: 8px; }
  .lock { align-items: flex-start; }
  .confirm { display: flex; flex-direction: column; gap: 12px; }

  @media (max-width: 1180px) {
    .layout { grid-template-columns: 1fr; }
    .panel { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: start; }
    .submit-zone { grid-column: 1 / -1; }
  }
  @media (max-width: 760px) {
    .panel { grid-template-columns: 1fr; }
    .case-bar { align-items: flex-start; }
    .cb-right { width: 100%; overflow-x: auto; }
  }
</style>
