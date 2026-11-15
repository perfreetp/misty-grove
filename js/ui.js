/* =========================================================
   界面控制：参数绑定 / 仿真循环 / 方案流转 / 日志与导出
   ========================================================= */
(function () {
  'use strict';

  const U = window.U;
  const Store = window.Store;
  const Exporter = window.Exporter;
  const D = window.DOMAIN;
  const { derived, LOST_TIME, TRIAL_SECONDS, TRIAL_RECORD_STEP, STATE_LABEL } = D;
  const { Engine, recommend, evaluateTrial, SIM_SPEED } = window.SimEngine;

  const USERS = {
    operator: { name: '张岚', label: '值班员' },
    supervisor: { name: '陈立', label: '值班长' }
  };

  const $ = id => document.getElementById(id);

  const el = {};
  let role = 'operator';
  let ramp = null;
  let plan = null;
  let stage = null;
  let engine = null;
  let sim = { running: false, lastTs: 0, lastPaint: 0, lastSuggest: 0 };
  let snapping = null;
  let bannerLatch = false;

  /* =========================================================
     初始化
     ========================================================= */
  function init() {
    const seedCreated = Store.load();
    cacheEls();
    buildStage();
    engine = new Engine();

    bindTopbar();
    bindParams();
    bindSimControls();
    bindActions();
    bindStageToolbar();
    bindTableTabs();
    bindKeyboard();

    ramp = Store.ramp(Store.state.ui.selectedRampId);
    if (!ramp) ramp = Store.state.ramps[0];
    Store.state.ui.selectedRampId = ramp.id;
    renderRampOptions();
    loadPlan(Store.working(ramp), { keepSim: false });
    setRole('operator', true);

    tickClock();
    setInterval(tickClock, 1000);

    if (seedCreated) {
      setTimeout(() => toast('已载入示例路网与方案数据', 'ok'), 400);
    }

    requestAnimationFrame(loop);
  }

  function cacheEls() {
    [
      'rampSelect', 'roleBadge', 'roleToggle', 'operatorName', 'clock', 'planChip',
      'btnExportPlan', 'btnExportLog',
      'inMainFlow', 'inMainOcc', 'inMainSpeed', 'inMainLane',
      'inRampFlow', 'inRampCap', 'inRampOcc', 'inSatFlow',
      'rngCycle', 'rngSplit', 'vCycle', 'vSplit',
      'outGreen', 'outRed', 'outCapacity', 'outVC', 'vcWarn',
      'sugCycle', 'sugSplit', 'sugWhy', 'btnApplySug',
      'inPlanName', 'outPlanNo', 'inPlanWindow', 'outMode', 'panelLeft',
      'modeSelect', 'modeSignal', 'modeDetector', 'chkLabels', 'btnResetView',
      'canvasWrap', 'stage', 'siteHead', 'stageLegend',
      'overflowBanner', 'overflowText', 'btnOverflowFix', 'toastZone',
      'btnPlay', 'btnStep', 'chkAutoFix', 'simClock',
      'kpiQueue', 'kpiSpeed', 'kpiOcc', 'kpiRelease',
      'stepper', 'stateBadge', 'stateHint', 'stateDesc', 'lockInfo', 'lockUser', 'lockTime',
      'trialPanel', 'trialElapsed', 'trialOcc', 'trialDev', 'trialQueue', 'trialBar', 'trialEnd',
      'stateActions', 'btnDefaultPlan', 'logCount', 'logList',
      'ttPlanNo', 'ttTabs', 'ttWrap', 'modalRoot', 'trendCanvas', 'trendCard'
    ].forEach(id => { el[id] = $(id); });
  }

  function buildStage() {
    stage = new window.Stage(el.stage, el.canvasWrap, {
      canEdit: () => !!(plan && plan.state === 'draft'),
      onSelect: () => { },
      onToast: (msg, level) => toast(msg, level),
      onPlace: onPlaceDevice,
      onDeviceMove: onDeviceMove,
      onDeviceDelete: onDeviceDelete
    });
    stage.popEl = document.createElement('div');
    stage.popEl.className = 'device-pop';
    stage.popEl.hidden = true;
    el.canvasWrap.appendChild(stage.popEl);
    stage.setMode('select');
  }

  /* =========================================================
     时钟 / 角色 / 匝道
     ========================================================= */
  function tickClock() {
    el.clock.textContent = U.fmtTime(Date.now());
  }

  function setRole(next, silent) {
    role = next;
    const u = USERS[role];
    el.operatorName.textContent = u.name;
    el.roleBadge.textContent = u.label + ' · ' + u.name;
    el.roleBadge.className = 'badge';
    el.roleToggle.textContent = role === 'operator' ? '切换为值班长' : '切换为值班员';
    updateDefaultButton();
    if (!silent) toast('已切换为' + u.label + ' · ' + u.name, 'ok');
  }

  function renderRampOptions() {
    el.rampSelect.innerHTML = Store.state.ramps.map(r =>
      '<option value="' + r.id + '">' + U.esc(r.code + ' · ' + r.name + ' · ' + r.road.split(' ')[0]) + '</option>'
    ).join('');
    el.rampSelect.value = ramp.id;
  }

  function switchRamp(id) {
    if (sim.running) pauseSim();
    ramp = Store.ramp(id);
    Store.state.ui.selectedRampId = ramp.id;
    Store.save();
    loadPlan(Store.working(ramp), { keepSim: false });
  }

  function loadPlan(p, opts) {
    if (plan && plan !== p && plan.trial && !plan.trial.endedAt) plan.trial.running = false;
    bannerLatch = false;
    plan = p;
    const snap = { queue: 0, speed: plan.params.mainSpeed, occMain: 14, occRamp: 0, spill: 0, overflow: false, phase: 'red', time: 0, releaseRate: 0 };
    engine.configure(plan.params, plan.devices);
    engine.reset(plan.simSeed || 1234);
    // 续接未完成的试运行：让记录时钟与已记录的 elapsed 对齐（需再次启动仿真）
    if (plan.state === 'trial' && plan.trial && !plan.trial.endedAt) {
      plan.trial.startSimTime = engine.time - (plan.trial.elapsed || 0);
      plan.trial.running = false;
    }
    snapping = engine.snapshot();
    el.siteHead.innerHTML = '<b>' + U.esc(ramp.code + ' ' + ramp.name) + '</b> · ' + U.esc(ramp.road) +
      ' · ' + U.esc(ramp.km) + ' ' + U.esc(ramp.dir);
    el.stageLegend.innerHTML = [
      ['#38bdf8', '入口匝道'], ['#3fdc9b', '主线'], ['#facc15', '信号灯'], ['#f87171', '溢出告警']
    ].map(x => '<span><i style="background:' + x[0] + '"></i>' + x[1] + '</span>').join('');
    stage.setPlan(plan.params, plan.devices, ramp);
    stage.setSnapshot(snapping);
    stage.syncCars(true);
    renderAll();
    if (!opts || !opts.keepSim) {
      sim.running = false;
      el.btnPlay.textContent = '开始仿真';
    }
  }

  function renderAll() {
    renderParams();
    renderDerived();
    renderLifecycle();
    renderLogs();
    renderTable();
    renderSimHud(snapping);
    renderSuggestion(snapping);
    el.planChip.innerHTML = U.esc(plan.no) + ' · ' + STATE_LABEL[plan.state];
    el.ttPlanNo.textContent = plan.no + ' ' + plan.name;
    updateLocking();
  }

  /* =========================================================
     参数输入
     ========================================================= */
  function bindTopbar() {
    el.rampSelect.addEventListener('change', () => switchRamp(el.rampSelect.value));
    el.roleToggle.addEventListener('click', () => setRole(role === 'operator' ? 'supervisor' : 'operator'));
    el.btnExportPlan.addEventListener('click', exportPlanTable);
    el.btnExportLog.addEventListener('click', exportLog);
  }

  const NUM_FIELDS = [
    { id: 'inMainFlow', key: 'mainFlow', min: 300, max: 3200, label: '主线上游流量', unit: ' veh/h' },
    { id: 'inMainOcc', key: 'mainOcc', min: 5, max: 45, label: '主线占有率阈值', unit: '%' },
    { id: 'inMainSpeed', key: 'mainSpeed', min: 40, max: 120, label: '主线限速', unit: ' km/h' },
    { id: 'inRampFlow', key: 'rampFlow', min: 100, max: 2200, label: '匝道需求流量', unit: ' veh/h' },
    { id: 'inRampCap', key: 'rampCap', min: 10, max: 80, label: '匝道排队容量', unit: ' veh' },
    { id: 'inRampOcc', key: 'rampOcc', min: 10, max: 60, label: '匝道占有率阈值', unit: '%' },
    { id: 'inSatFlow', key: 'satFlow', min: 1200, max: 2600, label: '饱和流率', unit: ' veh/h' }
  ];

  function bindParams() {
    NUM_FIELDS.forEach(f => {
      const node = el[f.id];
      node.min = f.min; node.max = f.max;
      node.addEventListener('change', () => {
        const old = plan.params[f.key];
        let v = Math.round(Number(node.value));
        if (!isFinite(v)) v = old;
        v = U.clamp(v, f.min, f.max);
        node.value = v;
        if (v === old) return;
        commitParam(f.key, v);
        logAction('调整配时参数', f.label + ' ' + old + ' → ' + v + f.unit, 'info');
        renderAll();
      });
    });

    el.inPlanName.addEventListener('change', () => {
      const v = (el.inPlanName.value || '').trim().slice(0, 24);
      if (!v || v === plan.name) { el.inPlanName.value = plan.name; return; }
      const old = plan.name;
      plan.name = v; plan.updatedAt = Date.now();
      Store.save();
      logAction('修改方案名称', old + ' → ' + v, 'info');
      renderAll();
    });
    el.inPlanWindow.addEventListener('change', () => {
      const v = (el.inPlanWindow.value || '').trim().slice(0, 20);
      if (v === (plan.params.window || '')) return;
      plan.params.window = v;
      plan.updatedAt = Date.now();
      Store.save();
      logAction('修改适用时段', '适用时段 → ' + (v || '（清空）'), 'info');
      renderTable();
    });

    el.rngCycle.min = 20; el.rngCycle.max = 180; el.rngSplit.min = 0.1; el.rngSplit.max = 0.95;
    el.rngCycle.addEventListener('input', () => {
      if (!editable()) { syncSliders(); return; }
      const v = Number(el.rngCycle.value);
      plan.params.cycle = v;
      onTimingDrag();
    });
    el.rngCycle.addEventListener('change', () => {
      if (!editable()) return;
      logAction('调整配时参数', '信号周期 → ' + plan.params.cycle + ' s', 'info');
      persist();
    });
    el.rngSplit.addEventListener('input', () => {
      if (!editable()) { syncSliders(); return; }
      plan.params.split = U.round(Number(el.rngSplit.value), 2);
      onTimingDrag();
    });
    el.rngSplit.addEventListener('change', () => {
      if (!editable()) return;
      logAction('调整配时参数', '绿信比 → ' + U.num(plan.params.split, 2), 'info');
      persist();
    });

    el.btnApplySug.addEventListener('click', applySuggestion);
    el.inMainLane.addEventListener('change', () => {
      const v = Number(el.inMainLane.value);
      const old = plan.params.laneCount || 3;
      if (v === old) return;
      commitParam('laneCount', v);
      logAction('调整配时参数', '主线车道数 ' + old + ' → ' + v + ' 条', 'info');
      renderAll();
    });
  }

  function commitParam(key, v) {
    const p = plan.params;
    p[key] = v;
    if (key === 'mainSpeed') p.freeSpeed = v;
    plan.updatedAt = Date.now();
    plan.revision = (plan.revision || 1) + 1;
    persist();
    engine.configure(plan.params, plan.devices);
    stage.setPlan(plan.params, plan.devices, ramp);
  }

  function onTimingDrag() {
    plan.updatedAt = Date.now();
    renderDerived();
    renderSuggestion(engine ? engine.snapshot() : snapping);
    engine.configure(plan.params, plan.devices);
    stage.setPlan(plan.params, plan.devices, ramp);
    renderTable();
    syncSliders();
    persist(false);
  }

  function persist(saveNow) {
    if (saveNow !== false) Store.save();
    renderParams();
    renderDerived();
    renderLifecycle();
    renderSimHud(engine.snapshot());
    renderSuggestion(engine.snapshot());
  }

  function editable() {
    return plan && plan.state === 'draft';
  }

  function updateLocking() {
    const locked = !editable();
    NUM_FIELDS.forEach(f => { el[f.id].disabled = locked; });
    el.inMainLane.disabled = locked;
    el.rngCycle.disabled = locked;
    el.rngSplit.disabled = locked;
    el.inPlanName.disabled = locked;
    el.inPlanWindow.disabled = locked;
    el.btnApplySug.disabled = locked;
    [el.modeSelect, el.modeSignal, el.modeDetector].forEach(b => { b.disabled = locked; });
    if (locked && stage.mode !== 'select') {
      stage.setMode('select');
      syncModeButtons();
    }
    updateDefaultButton();
  }

  function syncSliders() {
    const p = plan.params;
    el.rngCycle.value = p.cycle;
    el.rngSplit.value = p.split;
    painter();
  }

  function painter() {
    const setPct = (node, v, a, b) => {
      const pct = ((v - a) / (b - a)) * 100;
      node.style.setProperty('--pct', U.clamp(pct, 0, 100) + '%');
    };
    setPct(el.rngCycle, Number(el.rngCycle.value), 20, 180);
    setPct(el.rngSplit, Number(el.rngSplit.value), 0.1, 0.95);
  }

  function renderParams() {
    const p = plan.params;
    NUM_FIELDS.forEach(f => {
      const node = el[f.id];
      if (document.activeElement !== node) node.value = p[f.key];
    });
    el.inMainLane.value = String(p.laneCount || 3);
    if (document.activeElement !== el.inPlanName) el.inPlanName.value = plan.name;
    if (document.activeElement !== el.inPlanWindow) el.inPlanWindow.value = p.window || '';
    if (document.activeElement !== el.rngCycle) el.rngCycle.value = p.cycle;
    if (document.activeElement !== el.rngSplit) el.rngSplit.value = p.split;
    el.vCycle.textContent = Math.round(p.cycle);
    el.vSplit.textContent = U.num(p.split, 2);
    el.outPlanNo.value = plan.no;
    painter();
  }

  function renderDerived() {
    const d = derived(plan.params);
    el.outGreen.value = d.green + ' s';
    el.outRed.value = d.red + ' s';
    el.outCapacity.value = d.capacity.toLocaleString('en-US');
    el.outVC.value = U.num(d.vc, 2);
    let warn = '';
    if (d.vc > 1.0) warn = '设计饱和度 ' + U.num(d.vc, 2) + ' > 1.00：匝道需求超过放行能力，排队将持续增长。';
    else if (plan.params.rampFlow > d.capacity * 0.92) warn = '匝道需求接近放行能力（饱和度 ' + U.num(d.vc, 2) + '），建议提高绿信比或延长周期。';
    else if (d.green < 8) warn = '有效绿仅 ' + d.green + ' s，启动损失占比过高，实际放行率将低于理论值。';
    el.vcWarn.hidden = !warn;
    el.vcWarn.textContent = warn;
    el.outMode.value = '定时控制 · 单点';
  }

  function renderSuggestion(snap) {
    const rec = recommend(plan.params, snap);
    el.sugCycle.textContent = 'C = ' + rec.cycle + ' s';
    el.sugSplit.textContent = 'g/C = ' + U.num(rec.split, 2);
    el.sugWhy.textContent = rec.why;
    el.btnApplySug.disabled = !editable() || (rec.cycle === plan.params.cycle && Math.abs(rec.split - plan.params.split) < 0.005);
    el.btnApplySug.title = editable() ? '' : '当前方案已锁定，需新建草稿后可采纳';
  }

  function applySuggestion() {
    if (!editable()) return;
    const rec = recommend(plan.params, engine.snapshot());
    const oldC = plan.params.cycle, oldS = plan.params.split;
    plan.params.cycle = rec.cycle;
    plan.params.split = rec.split;
    plan.updatedAt = Date.now();
    logAction('采纳调节建议', '周期 ' + oldC + '→' + rec.cycle + ' s，绿信比 ' + U.num(oldS, 2) + '→' + U.num(rec.split, 2), 'info');
    engine.configure(plan.params, plan.devices);
    stage.setPlan(plan.params, plan.devices, ramp);
    persist();
    toast('已采纳推荐配时 C=' + rec.cycle + 's，g/C=' + U.num(rec.split, 2), 'ok');
  }

  /* =========================================================
     仿真控制
     ========================================================= */
  function bindSimControls() {
    el.btnPlay.addEventListener('click', () => {
      if (sim.running) { pauseSim(); return; }
      if (plan.state === 'retired') { toast('停用方案仅可回放参数，不能启动试运行仿真', 'warn'); return; }
      sim.running = true;
      el.btnPlay.textContent = '暂停仿真';
      if (plan.trial && !plan.trial.endedAt && plan.state === 'trial') {
        plan.trial.running = true;
      }
      toast('仿真已启动 · 加速倍率 ' + SIM_SPEED + '×', 'ok');
    });
    el.btnStep.addEventListener('click', () => {
      if (plan.state === 'retired') { toast('停用方案不能运行仿真', 'warn'); return; }
      advance(30, true);
      renderSimHud(engine.snapshot());
      renderSuggestion(engine.snapshot());
      renderLifecycle();
    });
    el.chkAutoFix.addEventListener('change', updateOverflowBanner);
  }

  function pauseSim() {
    sim.running = false;
    el.btnPlay.textContent = engine && engine.time > 1 ? '继续仿真' : '开始仿真';
    if (plan.trial) plan.trial.running = false;
    toast('仿真已暂停', 'info');
  }

  function advance(dtSim, forceRecord) {
    let left = dtSim;
    let snap = engine.snapshot();
    while (left > 0) {
      const step = Math.min(0.5, left);
      snap = engine.step(step);
      left -= step;
      lookupTrialRecords(snap, forceRecord);
      if (snap.phase === 'green' && engine.meterOn) {
        const rel = engine.releaseAcc;
        if (rel > 0) {
          stage.consumeRelease(rel);
          engine.releaseAcc = 0;
        }
      } else {
        engine.releaseAcc = 0;
      }
      if (plan.trial && (plan.trial.running || forceRecord) && !plan.trial.endedAt && plan.trial.elapsed >= TRIAL_SECONDS) {
        finishTrial(true);
        break;
      }
    }
    snapping = snap;
    stage.setSnapshot(snap);
    return snap;
  }

  function loop(ts) {
    const now = ts || performance.now();
    const dtReal = sim.lastTs ? Math.min(0.12, (now - sim.lastTs) / 1000) : 0;
    sim.lastTs = now;

    let snap = engine.snapshot();
    if (sim.running) {
      snap = advance(dtReal * SIM_SPEED);
    }

    stage.render(dtReal, snap);

    if (now - sim.lastPaint > 120) {
      sim.lastPaint = now;
      renderSimHud(snap);
      renderTrend(snap);
      updateOverflowBanner(snap);
      if (now - sim.lastSuggest > 500) {
        sim.lastSuggest = now;
        renderSuggestion(snap);
        if (plan.state === 'trial' && plan.trial && !plan.trial.endedAt) renderTrialPanel();
      }
    }
    requestAnimationFrame(loop);
  }

  function renderSimHud(snap) {
    if (!snap) return;
    el.simClock.textContent = U.fmtHM(snap.time);
    const p = plan.params;
    el.kpiQueue.textContent = U.num(snap.queue, 0);
    el.kpiSpeed.textContent = U.num(snap.speed, 0);
    el.kpiOcc.textContent = U.num(snap.occMain, 1);
    el.kpiRelease.textContent = U.num(snap.releaseRate || 0, 0);
    el.kpiQueue.parentElement.classList.toggle('hot', snap.overflow);
    el.kpiSpeed.parentElement.classList.toggle('hot', snap.speed < p.mainSpeed * 0.55);
    el.kpiSpeed.parentElement.classList.toggle('warn', snap.speed < p.mainSpeed * 0.75 && snap.speed >= p.mainSpeed * 0.55);
    el.kpiOcc.parentElement.classList.toggle('hot', snap.occMain > p.mainOcc + 3);
    el.kpiOcc.parentElement.classList.toggle('warn', snap.occMain > p.mainOcc);
    el.kpiRelease.parentElement.classList.toggle('warn', (snap.releaseRate || 0) < p.rampFlow * 0.9);
  }

  /* ---------------- 趋势小图 ---------------- */
  function renderTrend(snap) {
    const cv = el.trendCanvas;
    if (!cv) return;
    const cssW = cv.clientWidth || 360, cssH = cv.clientHeight || 132;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (cv.width !== Math.round(cssW * dpr) || cv.height !== Math.round(cssH * dpr)) {
      cv.width = Math.round(cssW * dpr);
      cv.height = Math.round(cssH * dpr);
    }
    const ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    const padL = 4, padR = 4, padT = 6, padB = 12;
    const w = cssW - padL - padR, h = cssH - padT - padB;
    const hist = (snap && snap.history) || [];
    const span = 360; // 6 分钟
    const tEnd = Math.max(span, snap ? snap.time : 0);
    const tStart = tEnd - span;

    // 网格
    ctx.strokeStyle = 'rgba(56,189,248,0.10)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i <= 3; i++) {
      const y = padT + (h * i) / 3;
      ctx.moveTo(padL, y + 0.5); ctx.lineTo(padL + w, y + 0.5);
    }
    ctx.stroke();

    if (hist.length < 2) {
      ctx.fillStyle = 'rgba(110,135,158,0.7)';
      ctx.font = '9.5px "Microsoft YaHei",sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('仿真开始后显示排队与速度变化', padL + w / 2, padT + h / 2);
      return;
    }

    const cap = plan.params.rampCap;
    const qMax = Math.max(cap * 1.6, ...hist.map(p => p.q), 4);
    const vMax = Math.max(plan.params.mainSpeed, 40);
    const X = t => padL + ((t - tStart) / span) * w;
    const YQ = q => padT + h - (Math.min(q, qMax) / qMax) * h;
    const YV = v => padT + h - (U.clamp(v, 0, vMax) / vMax) * h;
    const pts = hist.filter(p => p.t >= tStart);

    // 溢出区段底色
    let segStart = null;
    pts.forEach((p, i) => {
      if (p.on && segStart == null) segStart = p.t;
      const last = i === pts.length - 1;
      if (segStart != null && (!p.on || last)) {
        const x0 = X(segStart), x1 = X(p.t);
        ctx.fillStyle = 'rgba(248,113,113,0.13)';
        ctx.fillRect(x0, padT, Math.max(1.5, x1 - x0), h);
        segStart = null;
      }
    });

    // 容量阈值线
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'rgba(251,191,36,0.55)';
    ctx.beginPath();
    ctx.moveTo(padL, YQ(cap) + 0.5); ctx.lineTo(padL + w, YQ(cap) + 0.5);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(251,191,36,0.75)';
    ctx.font = '8.5px "Bahnschrift",monospace';
    ctx.textAlign = 'left';
    ctx.fillText('容量 ' + cap, padL + 2, YQ(cap) - 3);

    // 排队面积
    const grad = ctx.createLinearGradient(0, padT, 0, padT + h);
    grad.addColorStop(0, 'rgba(56,189,248,0.42)');
    grad.addColorStop(1, 'rgba(56,189,248,0.02)');
    ctx.beginPath();
    ctx.moveTo(X(pts[0].t), padT + h);
    pts.forEach(p => ctx.lineTo(X(p.t), YQ(p.q)));
    ctx.lineTo(X(pts[pts.length - 1].t), padT + h);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.beginPath();
    pts.forEach((p, i) => (i ? ctx.lineTo(X(p.t), YQ(p.q)) : ctx.moveTo(X(p.t), YQ(p.q))));
    ctx.strokeStyle = '#4cc9f0';
    ctx.lineWidth = 1.6;
    ctx.stroke();

    // 速度曲线
    ctx.beginPath();
    pts.forEach((p, i) => (i ? ctx.lineTo(X(p.t), YV(p.v)) : ctx.moveTo(X(p.t), YV(p.v))));
    ctx.strokeStyle = 'rgba(52,211,153,0.95)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 端点值
    const lastP = pts[pts.length - 1];
    ctx.fillStyle = '#7ee0ff';
    ctx.beginPath(); ctx.arc(X(lastP.t), YQ(lastP.q), 2.6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#6ee7b7';
    ctx.beginPath(); ctx.arc(X(lastP.t), YV(lastP.v), 2.6, 0, Math.PI * 2); ctx.fill();

    // 时间刻度
    ctx.fillStyle = 'rgba(110,135,158,0.8)';
    ctx.font = '8.5px "Bahnschrift",monospace';
    ctx.textAlign = 'left';
    ctx.fillText('-' + Math.round(span / 60) + 'min', padL, cssH - 2);
    ctx.textAlign = 'right';
    ctx.fillText('now', padL + w, cssH - 2);
  }

  function updateOverflowBanner(snap) {
    snap = snap || engine.snapshot();
    // 溢出提示带滞回：排队已回落到容量以下也继续提示，直到回溢影响基本消退；
    // 仅当回溢影响已蔓延到主线（spill 起量）时才弹提示，避免速度尚未下降时误报
    const queued = snap.queue > plan.params.rampCap;
    const hit = queued && (snap.speed < plan.params.mainSpeed * 0.95 || (snap.spill || 0) > 0.85);
    if (hit) bannerLatch = true;
    else if ((snap.spill || 0) < 0.04) bannerLatch = false;
    const show = bannerLatch && el.chkAutoFix.checked;
    if (!show) { el.overflowBanner.hidden = true; return; }
    const rec = recommend(plan.params, snap);
    const cur = derived(plan.params).cycle;
    el.overflowBanner.hidden = false;
    el.btnOverflowFix.textContent = editable() ? '采纳建议配时' : '新建草稿并调整';
    el.overflowText.textContent = '排队 ' + U.num(snap.queue, 0) + ' / 容量 ' + plan.params.rampCap +
      ' veh，已回溢至主线合流区，主线速度 ' + U.num(snap.speed, 0) + ' km/h。建议 C=' +
      rec.cycle + ' s、g/C=' + U.num(rec.split, 2) + '（当前 ' + cur + ' s / ' + U.num(plan.params.split, 2) + '）。';
  }

  function shortenCycle() {
    const snap = engine.snapshot();
    const rec = recommend(plan.params, snap);
    const target = Math.min(plan.params.cycle, rec.cycle);
    if (target >= plan.params.cycle - 2 && rec.cycle >= plan.params.cycle) {
      toast('当前周期已接近建议值，请检查匝道需求是否超过放行能力', 'warn');
      return;
    }
    if (!editable()) {
      openModal({
        title: '当前方案已锁定',
        bodyHtml:
          '<p>方案 <b>' + U.esc(plan.no) + ' ' + U.esc(plan.name) + '</b> 当前为「' + STATE_LABEL[plan.state] + '」状态，参数不可直接修改。</p>' +
          '<div class="callout amber">将基于当前参数新建一份草稿，并把周期缩短至 <b>' + target + ' s</b>、绿信比调整为 <b>' + U.num(rec.split, 2) + '</b>，随后可重新试运行。</div>',
        actions: [
          { label: '取消', kind: 'ghost' },
          {
            label: '新建草稿并调整', kind: 'primary', onClick: () => {
              const np = newDraftFromPlan({ cycle: target, split: rec.split }, '溢出调节草稿');
              toast('已新建草稿 ' + np.no + '，周期 ' + target + ' s', 'ok');
            }
          }
        ]
      });
      return;
    }
    const oldC = plan.params.cycle, oldS = plan.params.split;
    plan.params.cycle = U.clamp(target, 20, 180);
    plan.params.split = rec.split;
    plan.updatedAt = Date.now();
    logAction('溢出处置：缩短周期', '周期 ' + oldC + '→' + plan.params.cycle + ' s，绿信比 ' + U.num(oldS, 2) + '→' + U.num(rec.split, 2), 'warn');
    engine.configure(plan.params, plan.devices);
    stage.setPlan(plan.params, plan.devices, ramp);
    persist();
    toast('周期已缩短至 ' + plan.params.cycle + ' s，观察排队回落', 'ok');
  }

  /* =========================================================
     设备布置
     ========================================================= */
  function bindStageToolbar() {
    document.querySelectorAll('.seg-btn').forEach(b => {
      b.addEventListener('click', () => {
        if (!editable()) { toast('方案已锁定，不能调整设备布置', 'warn'); return; }
        stage.setMode(b.dataset.mode);
        syncModeButtons();
        if (b.dataset.mode === 'signal') toast('在入口匝道上点击放置信号灯', 'info');
        if (b.dataset.mode === 'detector') toast('在主线或匝道上点击布置检测器断面', 'info');
      });
    });
    el.chkLabels.addEventListener('change', () => stage.setLabels(el.chkLabels.checked));
    el.btnResetView.addEventListener('click', () => { stage.resetView(); toast('视图已复位', 'info'); });
    el.btnOverflowFix.addEventListener('click', shortenCycle);
  }

  function syncModeButtons() {
    document.querySelectorAll('.seg-btn').forEach(b => b.classList.toggle('active', b.dataset.mode === stage.mode));
  }

  function nextDeviceId(prefix, list) {
    let n = 1;
    const used = new Set(list.map(x => x.id));
    while (used.has(prefix + n)) n++;
    return prefix + n;
  }

  function onPlaceDevice(mode, cor) {
    if (!editable()) { toast('方案已锁定', 'warn'); return; }
    if (mode === 'signal') {
      if (cor.corridor !== 'ramp') { toast('信号灯只能布置在入口匝道上', 'warn'); return; }
      if (plan.devices.signals.length >= 1) {
        toast('单车道入口匝道仅需一处信号灯，可直接拖动现有信号灯', 'warn');
        stage.setMode('select'); syncModeButtons();
        return;
      }
      const id = nextDeviceId('S', plan.devices.signals);
      const dev = { id: id, corridor: 'ramp', s: U.round(cor.s, 3), name: '信号灯 ' + id };
      plan.devices.signals.push(dev);
      plan.updatedAt = Date.now();
      logAction('布置设备', '入口匝道放置信号灯 ' + id + '（断面位置 s=' + U.num(dev.s, 2) + '）', 'info');
      engine.configure(plan.params, plan.devices);
      stage.setPlan(plan.params, plan.devices, ramp);
      stage.setSelected(id);
      persist();
      toast('已放置信号灯 ' + id, 'ok');
      stage.setMode('select'); syncModeButtons();
      return;
    }
    if (plan.devices.detectors.length >= 6) {
      toast('检测器断面已达上限 6 处', 'warn');
      return;
    }
    const id = nextDeviceId('D', plan.devices.detectors);
    const dev = { id: id, corridor: cor.corridor, s: U.round(cor.s, 3), name: (cor.corridor === 'ramp' ? '匝道检测器 ' : '主线检测器 ') + id };
    plan.devices.detectors.push(dev);
    plan.updatedAt = Date.now();
    logAction('布置设备', (cor.corridor === 'ramp' ? '匝道' : '主线') + '布置检测器断面 ' + id + '（s=' + U.num(dev.s, 2) + '）', 'info');
    stage.setPlan(plan.params, plan.devices, ramp);
    stage.setSelected(id);
    persist();
    toast('已布置检测器断面 ' + id, 'ok');
  }

  function onDeviceMove(dev) {
    if (!editable()) return;
    plan.updatedAt = Date.now();
    logAction('移动设备', dev.name + ' 移至 ' + (dev.corridor === 'ramp' ? '匝道' : '主线') + ' s=' + U.num(dev.s, 2), 'info');
    persist();
    stage.renderPopup();
  }

  function onDeviceDelete(id, isSignal) {
    if (!editable()) return;
    plan.updatedAt = Date.now();
    logAction('删除设备', (isSignal ? '信号灯 ' : '检测器 ') + id, 'warn');
    engine.configure(plan.params, plan.devices);
    persist();
    if (isSignal) toast('信号灯已移除，匝道将不再受控', 'warn');
  }

  /* =========================================================
     方案流转
     ========================================================= */
  function bindActions() {
    el.btnDefaultPlan.addEventListener('click', switchToDefaultPlan);
  }

  function currentUser() { return USERS[role]; }

  function logAction(action, detail, level) {
    Store.log({
      rampId: ramp.id,
      planNo: plan.no,
      role: role,
      user: currentUser().name,
      action: action,
      detail: detail,
      level: level || 'info'
    });
    renderLogs();
  }

  function renderLifecycle() {
    const st = plan.state;
    el.stateBadge.textContent = STATE_LABEL[st];
    el.stateBadge.className = 'badge state-' + st;

    // 步骤条
    const order = ['draft', 'trial', 'active', 'retired'];
    const curIdx = order.indexOf(st);
    [...el.stepper.children].forEach((node, i) => {
      node.classList.toggle('cur', i === curIdx);
      node.classList.toggle('done', i < curIdx);
      node.classList.toggle('retired', node.dataset.state === 'retired');
    });

    // 状态说明
    const hints = {
      draft: ['可自由调整参数并放置设备', '草稿阶段的参数变更只保存在本地，不会下发到路口信号机。确认参数与设备布置后，提交试运行。'],
      trial: ['试运行中，参数锁定', '仿真器按本方案参数实际运行，每 30 秒记录主线实际占有率与方案偏差。试运行结束前不可修改参数。'],
      active: ['已生效并锁定', '方案已下发信号机执行，参数与设备布置锁定。任何调整需新建草稿并重新走试运行。'],
      retired: ['已停用', '方案不再执行，参数只读留档，可复制为新草稿继续优化。']
    };
    const h = hints[st] || hints.draft;
    const trialDone = plan.trial && plan.trial.endedAt;
    if (st === 'trial' && trialDone) {
      el.stateHint.textContent = '试运行已结束，等待确认';
      el.stateDesc.textContent = '试运行记录已归档，可查看实际占有率与方案偏差后确认生效，或退回草稿继续调整。';
    } else {
      el.stateHint.textContent = h[0];
      el.stateDesc.textContent = h[1];
    }

    // 锁定信息
    const showLock = st === 'active' || st === 'retired';
    el.lockInfo.hidden = !showLock;
    if (showLock) {
      el.lockUser.textContent = (st === 'active' ? plan.activatedBy : (plan.retiredBy || plan.activatedBy)) || '—';
      const ts = st === 'active' ? plan.activatedAt : (plan.retiredAt || plan.activatedAt);
      el.lockTime.textContent = ts ? U.fmtDT(ts) : '—';
    }

    renderTrialPanel();
    renderActions();
  }

  function renderTrialPanel() {
    const t = plan.trial;
    const show = t && (plan.state === 'trial' || (t.records && t.records.length));
    el.trialPanel.hidden = !show;
    if (!show || !t) return;

    const elapsed = t.elapsed != null ? Math.min(t.elapsed, TRIAL_SECONDS) : (t.durationSec || TRIAL_SECONDS);
    const recs = t.records || [];
    const avgOcc = recs.length ? recs.reduce((a, r) => a + r.occ, 0) / recs.length : 0;
    const avgDev = recs.length ? recs.reduce((a, r) => a + r.devPct, 0) / recs.length : 0;
    const peak = recs.length ? Math.max.apply(null, recs.map(r => r.queue)) : 0;
    el.trialElapsed.textContent = U.fmtHM(elapsed) + ' / ' + U.fmtHM(TRIAL_SECONDS);
    el.trialOcc.textContent = recs.length ? U.num(avgOcc, 1) + '%' : '—';
    el.trialDev.textContent = recs.length ? U.num(avgDev, 1) + '%' : '—';
    el.trialQueue.textContent = recs.length ? U.num(peak, 0) + ' veh' : '—';
    el.trialBar.style.width = U.clamp((elapsed / TRIAL_SECONDS) * 100, 0, 100) + '%';

    const end = el.trialEnd;
    if (t.endedAt) {
      end.hidden = false;
      const s = t.summary || {};
      const pass = t.result === 'pass';
      const cancelled = t.result === 'cancelled';
      end.className = 'trial-end ' + (pass ? 'ok' : 'bad');
      end.innerHTML = cancelled
        ? '<b>试运行已中止</b>' + (t.note ? '（' + U.esc(t.note) + '）' : '') + ' · 记录保留 ' + recs.length + ' 条，未形成结论'
        : (pass ? '<b>试运行通过</b>' : '<b>试运行未通过</b>') +
        ' · 占有率均值 ' + (s.avgOcc == null ? '—' : s.avgOcc + '%') +
        '，偏差均值 ' + (s.meanDev == null ? '—' : s.meanDev + '%') +
        (t.reasons && t.reasons.length ? '<br>' + t.reasons.map(U.esc).join('；') : '');
    } else {
      end.hidden = true;
    }
  }

  function renderActions() {
    const box = el.stateActions;
    const st = plan.state;
    const btns = [];
    if (st === 'draft') {
      btns.push({ id: 'trial', label: '提交试运行', kind: 'primary' });
      btns.push({ id: 'resetBase', label: '恢复匝道基准参数', kind: 'ghost' });
    } else if (st === 'trial') {
      const done = plan.trial && plan.trial.endedAt;
      if (done) {
        const pass = plan.trial.result === 'pass';
        btns.push({ id: 'activate', label: pass ? '确认生效' : '强制生效…', kind: pass ? 'green' : 'warn' });
        btns.push({ id: 'backDraft', label: '退回草稿调整', kind: 'ghost' });
      } else {
        btns.push({ id: 'abort', label: '终止试运行', kind: 'warn' });
      }
    } else if (st === 'active') {
      btns.push({ id: 'newDraft', label: '新建调整草稿', kind: 'primary' });
      btns.push({ id: 'retire', label: '停用方案', kind: 'warn' });
    } else if (st === 'retired') {
      btns.push({ id: 'copyDraft', label: '复制为草稿', kind: 'primary' });
    }

    box.innerHTML = btns.map(b => '<button class="btn ' + b.kind + '" data-act="' + b.id + '">' + U.esc(b.label) + '</button>').join('') +
      '<div class="action-note" id="actionNote">' + actionNote(st) + '</div>';
    box.querySelectorAll('button[data-act]').forEach(node => {
      node.addEventListener('click', () => handleAction(node.dataset.act));
    });
  }

  function actionNote(st) {
    if (st === 'draft') return '草稿可反复修改；提交试运行后参数将临时锁定 ' + U.fmtHM(TRIAL_SECONDS);
    if (st === 'trial') return '试运行完成条件：仿真时间 ' + U.fmtHM(TRIAL_SECONDS) + '，每 ' + TRIAL_RECORD_STEP + ' 秒记录一次';
    if (st === 'active') return '生效方案已锁定，操作人与时间已留痕';
    if (st === 'retired') return '停用方案只读留档';
    return '';
  }

  function handleAction(act) {
    if (act === 'trial') startTrial();
    else if (act === 'activate') activatePlan();
    else if (act === 'backDraft') backToDraft();
    else if (act === 'abort') abortTrial();
    else if (act === 'newDraft') newDraftFromPlan(null, '调整草稿');
    else if (act === 'retire') retirePlan();
    else if (act === 'copyDraft') newDraftFromPlan(null, '复制草稿');
    else if (act === 'resetBase') resetToBaseline();
  }

  function startTrial() {
    if (!editable()) return;
    if (!plan.devices.signals.length) {
      toast('请先在平面图上布置匝道信号灯', 'err');
      return;
    }
    const d = derived(plan.params);
    const warn = [];
    if (d.vc > 1.0) warn.push('设计饱和度 ' + U.num(d.vc, 2) + ' 已超过 1.00，试运行将出现持续排队增长。');
    if (d.green < 8) warn.push('有效绿仅 ' + d.green + ' s，启动损失偏高。');
    openModal({
      title: '提交试运行',
      bodyHtml:
        '<div class="kv">' +
        '<span>方案</span><b>' + U.esc(plan.no) + ' ' + U.esc(plan.name) + '</b>' +
        '<span>信号周期</span><b>' + d.cycle + ' s</b>' +
        '<span>绿信比</span><b>' + U.num(plan.params.split, 2) + '（有效绿 ' + d.green + ' s）</b>' +
        '<span>理论放行率</span><b>' + d.capacity + ' veh/h</b>' +
        '<span>匝道需求</span><b>' + plan.params.rampFlow + ' veh/h（v/c ' + U.num(d.vc, 2) + '）</b>' +
        '<span>试运行时长</span><b>' + U.fmtHM(TRIAL_SECONDS) + ' 仿真时间</b>' +
        '<span>操作人</span><b>' + currentUser().name + '（' + currentUser().label + '）</b>' +
        '</div>' +
        '<p class="small muted">试运行期间参数与设备布置锁定，仿真器按本方案运行并记录实际占有率与方案偏差。期间可随时终止。</p>' +
        (warn.length ? '<div class="callout red">' + warn.map(U.esc).join('<br>') + '</div>' : ''),
      actions: [
        { label: '取消', kind: 'ghost' },
        {
          label: '开始试运行', kind: 'primary', onClick: () => {
            if (plan.trial && plan.trial.records && plan.trial.records.length) {
              plan.trialHistory = (plan.trialHistory || []).concat([plan.trial]);
              if (plan.trialHistory.length > 4) plan.trialHistory = plan.trialHistory.slice(-4);
            }
            plan.state = 'trial';
            plan.updatedAt = Date.now();
            plan.trial = {
              startedAt: Date.now(),
              elapsed: 0,
              durationSec: TRIAL_SECONDS,
              records: [],
              running: true,
              endedAt: null,
              startSimTime: 0,
              nextAt: TRIAL_RECORD_STEP,
              summary: null,
              verdict: false,
              reasons: []
            };
            engine.configure(plan.params, plan.devices);
            engine.reset(plan.simSeed || Math.floor(Date.now() / 1000) % 10000);
            plan.trial.startSimTime = 0;
            snapping = engine.snapshot();
            stage.setSnapshot(snapping);
            logAction('提交试运行', '试运行时长 ' + U.fmtHM(TRIAL_SECONDS) + '，周期 ' + d.cycle + ' s、绿信比 ' +
              U.num(plan.params.split, 2) + '，开始记录实际占有率与方案偏差', 'info');
            Store.save();
            sim.running = true;
            el.btnPlay.textContent = '暂停仿真';
            renderAll();
            toast('试运行已开始，仿真自动运行', 'ok');
          }
        }
      ]
    });
  }

  function lookupTrialRecords(snap, force) {
    const t = plan.trial;
    if (!t || t.endedAt || (!t.running && !force) || plan.state !== 'trial') return;
    if (t.startSimTime == null) t.startSimTime = 0;
    if (engine.time < t.startSimTime) t.startSimTime = engine.time;
    t.elapsed = U.clamp(engine.time - t.startSimTime, 0, TRIAL_SECONDS);
    while (t.nextAt != null && t.elapsed + 1e-6 >= t.nextAt && t.records.length < TRIAL_SECONDS / TRIAL_RECORD_STEP) {
      const d = derived(plan.params);
      const cycleErr = (Math.random() * 2 - 1) * 1.2;
      const greenErr = (Math.random() * 2 - 1) * 1.0;
      const actualCycle = Math.max(10, Math.round(d.cycle + cycleErr));
      const actualGreen = U.clamp(Math.round(d.green + greenErr), 5, actualCycle - 3);
      const devPct = Math.max(
        Math.abs(actualCycle - d.cycle) / d.cycle,
        Math.abs(actualGreen - d.green) / Math.max(1, d.green)
      ) * 100 + Math.abs(Math.sin(t.elapsed / 97)) * 0.6;
      t.records.push({
        t: Math.round(t.nextAt),
        at: Date.now(),
        occ: U.round(snap.occMain, 1),
        speed: U.round(snap.speed, 1),
        cycle: actualCycle,
        green: actualGreen,
        devPct: U.round(devPct, 1),
        queue: U.round(snap.queue, 1),
        overflow: snap.overflow
      });
      t.nextAt += TRIAL_RECORD_STEP;
      Store.save();
    }
  }

  function finishTrial(auto) {
    const t = plan.trial;
    if (!t || t.endedAt) return;
    t.endedAt = Date.now();
    t.running = false;
    t.elapsed = Math.min(TRIAL_SECONDS, t.elapsed);
    t.summary = Store.summarizeTrial(t);
    const evalRes = evaluateTrial(t.records, plan.params, t.summary);
    t.verdict = evalRes.pass;
    t.result = evalRes.result;
    t.reasons = evalRes.reasons;
    plan.updatedAt = Date.now();
    Store.save();
    if (auto) {
      sim.running = false;
      el.btnPlay.textContent = '继续仿真';
    }
    logAction('试运行结束',
      (evalRes.pass ? '判定通过' : '判定未通过') +
      '，占有率均值 ' + t.summary.avgOcc + '%，偏差均值 ' + t.summary.meanDev + '%，峰值排队 ' + t.summary.peakQueue + ' veh' +
      (evalRes.reasons.length ? '（' + evalRes.reasons.join('；') + '）' : ''),
      evalRes.pass ? 'ok' : 'err');
    renderAll();
    toast(evalRes.pass ? '试运行结束：判定通过，可确认生效' : '试运行结束：偏差或占有率超标，请调整后重试',
      evalRes.pass ? 'ok' : 'err');
  }

  function abortTrial() {
    openModal({
      title: '终止试运行',
      bodyHtml: '<div class="callout red">终止后本次试运行记录将标注为「已中止」，不形成通过结论，方案退回草稿状态。</div>',
      actions: [
        { label: '取消', kind: 'ghost' },
        {
          label: '确认终止', kind: 'warn', onClick: () => {
            const t = plan.trial;
            if (t) {
              t.endedAt = Date.now();
              t.running = false;
              t.result = 'cancelled';
              t.summary = Store.summarizeTrial(t);
            }
            plan.state = 'draft';
            plan.updatedAt = Date.now();
            sim.running = false;
            el.btnPlay.textContent = '开始仿真';
            logAction('终止试运行', '试运行中止，方案退回草稿', 'warn');
            Store.save();
            renderAll();
            toast('试运行已终止，方案退回草稿', 'warn');
          }
        }
      ]
    });
  }

  function activatePlan() {
    const t = plan.trial;
    if (!t || !t.endedAt) { toast('试运行尚未结束，无法生效', 'err'); return; }
    const pass = t.result === 'pass';
    const s = t.summary || {};
    const prevActive = Store.activePlan(ramp);
    openModal({
      title: pass ? '确认方案生效' : '方案偏差超标，确认强制生效？',
      bodyHtml:
        '<div class="kv">' +
        '<span>方案</span><b>' + U.esc(plan.no) + ' ' + U.esc(plan.name) + '</b>' +
        '<span>配时</span><b>C=' + derived(plan.params).cycle + ' s，g/C=' + U.num(plan.params.split, 2) + '</b>' +
        '<span>试运行占有率</span><b>' + (s.avgOcc == null ? '—' : s.avgOcc + '%') + '</b>' +
        '<span>方案偏差</span><b>' + (s.meanDev == null ? '—' : s.meanDev + '%') + '</b>' +
        '<span>操作人</span><b>' + currentUser().name + '（' + currentUser().label + '）</b>' +
        '<span>时间</span><b>' + U.fmtDT(Date.now()) + '</b>' +
        '</div>' +
        (pass
          ? '<div class="callout">生效后参数与设备布置锁定，操作人与生效时间写入控制日志，方案下发信号机执行。</div>'
          : '<div class="callout red">试运行未通过：' + U.esc(t.reasons.join('；')) + '。强制生效将记录为异常操作并留痕。</div>') +
        (prevActive && prevActive.id !== plan.id
          ? '<div class="callout amber">当前生效方案 ' + U.esc(prevActive.no) + ' 将自动停用。</div>' : ''),
      actions: [
        { label: '取消', kind: 'ghost' },
        {
          label: pass ? '确认生效' : '仍要生效', kind: pass ? 'green' : 'warn', onClick: () => doActivate(pass)
        }
      ]
    });
  }

  function doActivate(pass) {
    const prevActive = Store.activePlan(ramp);
    if (prevActive && prevActive.id !== plan.id) {
      prevActive.state = 'retired';
      prevActive.retiredBy = currentUser().name;
      prevActive.retiredAt = Date.now();
      prevActive.retireNote = '被新方案 ' + plan.no + ' 替换';
    }
    plan.state = 'active';
    plan.activatedBy = currentUser().name;
    plan.activatedAt = Date.now();
    plan.updatedAt = Date.now();
    if (plan.trial) plan.trial.running = false;
    Store.save();
    logAction('方案生效',
      '配时 C=' + derived(plan.params).cycle + ' s，g/C=' + U.num(plan.params.split, 2) +
      '，试运行偏差 ' + ((plan.trial && plan.trial.summary && plan.trial.summary.meanDev) || '—') + '%' +
      (pass ? '' : '（试运行未通过，强制生效）') +
      (prevActive && prevActive.id !== plan.id ? '；原方案 ' + prevActive.no + ' 自动停用' : ''),
      pass ? 'ok' : 'warn');
    sim.running = false;
    el.btnPlay.textContent = '继续仿真';
    renderAll();
    toast('方案 ' + plan.no + ' 已生效并锁定', 'ok');
  }

  function backToDraft() {
    plan.state = 'draft';
    plan.updatedAt = Date.now();
    if (plan.trial) plan.trial.running = false;
    Store.save();
    logAction('试运行退回', '方案退回草稿，保留试运行记录 ' + (plan.trial && plan.trial.records ? plan.trial.records.length : 0) + ' 条', 'warn');
    renderAll();
    toast('已退回草稿，可继续调整参数', 'info');
  }

  function retirePlan() {
    openModal({
      title: '停用方案',
      bodyHtml:
        '<div class="kv">' +
        '<span>方案</span><b>' + U.esc(plan.no) + ' ' + U.esc(plan.name) + '</b>' +
        '<span>操作人</span><b>' + currentUser().name + '（' + currentUser().label + '）</b>' +
        '<span>停用时间</span><b>' + U.fmtDT(Date.now()) + '</b>' +
        '</div>' +
        '<div class="callout amber">停用后信号机退出该方案，参数只读留档。可随后新建草稿或由值班长切换默认方案。</div>',
      actions: [
        { label: '取消', kind: 'ghost' },
        {
          label: '确认停用', kind: 'warn', onClick: () => {
            plan.state = 'retired';
            plan.retiredBy = currentUser().name;
            plan.retiredAt = Date.now();
            plan.retireNote = plan.retireNote || '值班' + currentUser().label + '手动停用';
            plan.updatedAt = Date.now();
            Store.save();
            logAction('方案停用', '方案 ' + plan.no + ' 停用，参数与设备布置留档', 'warn');
            sim.running = false;
            el.btnPlay.textContent = '开始仿真';
            renderAll();
            toast('方案已停用，匝道当前无生效方案', 'warn');
          }
        }
      ]
    });
  }

  function resetToBaseline() {
    if (!editable()) return;
    openModal({
      title: '恢复匝道基准参数',
      bodyHtml: '<div class="callout amber">将当前草稿的流量、阈值等运行参数恢复为「匝道基准值」，' +
        '配时周期与绿信比保持不变。</div>',
      actions: [
        { label: '取消', kind: 'ghost' },
        {
          label: '恢复', kind: 'primary', onClick: () => {
            const b = ramp.baseline || {};
            ['mainFlow', 'mainOcc', 'mainSpeed', 'freeSpeed', 'rampFlow', 'rampCap', 'rampOcc', 'satFlow'].forEach(k => {
              if (b[k] != null) plan.params[k] = b[k];
            });
            plan.updatedAt = Date.now();
            engine.configure(plan.params, plan.devices);
            stage.setPlan(plan.params, plan.devices, ramp);
            logAction('恢复基准参数', '运行参数恢复为匝道基准值', 'info');
            persist();
            toast('已恢复匝道基准参数', 'ok');
          }
        }
      ]
    });
  }

  function newDraftFromPlan(overrides, label) {
    if (sim.running) pauseSim();
    const src = plan;
    const params = Object.assign({}, src.params, overrides || {});
    params.freeSpeed = params.mainSpeed;
    const np = D.mkPlan({
      no: '',
      name: (src.name.replace(/（.*?）$/, '').slice(0, 16) + ' ' + (label || '调整草稿')).slice(0, 24),
      state: 'draft',
      params: params,
      devices: D.cloneDevices(src.devices),
      createdBy: currentUser().name,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      simSeed: Math.floor(Math.random() * 9000) + 1000
    });
    np.no = Store.newPlanNo(ramp, np);
    ramp.plans.push(np);
    Store.save();
    plan = np;
    engine.configure(plan.params, plan.devices);
    engine.reset(plan.simSeed);
    snapping = engine.snapshot();
    stage.setSnapshot(snapping);
    logAction('创建草稿', '基于 ' + src.no + ' 创建「' + np.name + '」（' + np.no + '）' +
      (overrides ? '，周期 ' + params.cycle + ' s、绿信比 ' + U.num(params.split, 2) : ''), 'info');
    loadPlan(np, { keepSim: false });
    toast('已创建草稿 ' + np.no, 'ok');
    return np;
  }

  function switchToDefaultPlan() {
    if (role !== 'supervisor') {
      toast('仅值班长可一键切换默认方案', 'warn');
      return;
    }
    const active = Store.activePlan(ramp);
    const working = Store.working(ramp);
    const params = Object.assign({}, working.params, { cycle: D.DEFAULT_TIMING.cycle, split: D.DEFAULT_TIMING.split });
    params.freeSpeed = params.mainSpeed;
    openModal({
      title: '一键切换默认方案',
      bodyHtml:
        '<div class="kv">' +
        '<span>匝道</span><b>' + U.esc(ramp.code + ' ' + ramp.name) + '</b>' +
        '<span>当前方案</span><b>' + U.esc(working.no + ' ' + working.name + '（' + STATE_LABEL[working.state] + '）') + '</b>' +
        '<span>默认配时</span><b>C=' + D.DEFAULT_TIMING.cycle + ' s，g/C=' + U.num(D.DEFAULT_TIMING.split, 2) + '</b>' +
        '<span>操作人</span><b>' + currentUser().name + '（值班长）</b>' +
        '<span>时间</span><b>' + U.fmtDT(Date.now()) + '</b>' +
        '</div>' +
        '<div class="callout amber">将新建「中心默认方案」并立即生效：' +
        (active ? '原生效方案 ' + U.esc(active.no) + ' 停用；' : '') +
        (working.state === 'trial' ? '进行中的试运行将被中止；' : '') +
        '所有操作写入控制日志并留痕。</div>',
      actions: [
        { label: '取消', kind: 'ghost' },
        {
          label: '执行切换', kind: 'warn', onClick: () => doSwitchDefault(params)
        }
      ]
    });
  }

  function doSwitchDefault(params) {
    if (role !== 'supervisor') { toast('仅值班长可执行该操作', 'err'); return; }
    const now = Date.now();
    const user = currentUser().name;

    Store.state.ramps.forEach(r => {
      if (r.id !== ramp.id) return;
      r.plans.forEach(p => {
        if (p.state === 'active') {
          p.state = 'retired';
          p.retiredBy = user;
          p.retiredAt = now;
          p.retireNote = '值班长切换默认方案';
        } else if (p.state === 'trial') {
          p.state = 'draft';
          if (p.trial) {
            p.trial.endedAt = now;
            p.trial.running = false;
            p.trial.result = 'cancelled';
            p.trial.summary = Store.summarizeTrial(p.trial);
          }
        }
      });
    });

    const fixed = D.mkPlan({
      no: '',
      name: '中心默认方案',
      state: 'active',
      params: params,
      devices: D.cloneDevices(plan.devices),
      createdBy: user,
      createdAt: now,
      updatedAt: now,
      activatedBy: user,
      activatedAt: now,
      simSeed: Math.floor(Math.random() * 9000) + 1000
    });
    fixed.no = Store.newPlanNo(ramp, fixed);
    ramp.plans.push(fixed);
    Store.save();
    sim.running = false;
    el.btnPlay.textContent = '开始仿真';
    loadPlan(fixed, { keepSim: false });
    logAction('一键切换默认方案', '值班长 ' + user + ' 将 ' + ramp.code + ' 切换为默认配时 C=' +
      D.DEFAULT_TIMING.cycle + ' s、g/C=' + U.num(D.DEFAULT_TIMING.split, 2) + '，方案立即生效', 'warn');
    toast('已切换默认方案 ' + fixed.no + ' 并生效', 'ok');
  }

  function updateDefaultButton() {
    const disabled = role !== 'supervisor';
    el.btnDefaultPlan.disabled = disabled;
    el.btnDefaultPlan.title = disabled ? '需要「值班长」角色权限' : '按中心缺省配时新建方案并立即生效';
  }

  /* =========================================================
     日志 / 表格
     ========================================================= */
  function renderLogs() {
    if (!ramp) return;
    const logs = Store.todayLogs(ramp.id).slice(0, 30);
    el.logCount.textContent = logs.length + ' 条';
    if (!logs.length) {
      el.logList.innerHTML = '<div class="log-empty">今日暂无操作记录</div>';
      return;
    }
    el.logList.innerHTML = logs.map(l =>
      '<div class="log-item ' + (l.level === 'ok' ? 'ok' : l.level === 'warn' ? 'warn' : l.level === 'err' ? 'err' : '') + '">' +
      '<time>' + U.fmtTime(l.at) + '</time>' +
      '<p><b>' + U.esc(l.action) + '</b> · ' + U.esc(l.detail) +
      '<br><span class="muted">' + U.esc(l.planNo || '') + ' · ' + U.esc(l.user) + '（' + U.esc(D.ROLE_LABEL[l.role] || l.role) + '）</span></p>' +
      '</div>'
    ).join('');
  }

  let tableKind = 'plan';

  function bindTableTabs() {
    el.ttTabs.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        tableKind = tab.dataset.kind;
        el.ttTabs.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t === tab));
        renderTable();
      });
    });
  }

  function renderTable() {
    if (!plan) return;
    el.ttPlanNo.textContent = plan.no + ' ' + plan.name;
    if (tableKind === 'plan') renderPlanTable();
    else if (tableKind === 'all') renderAllPlansTable();
    else renderTrialTable();
  }

  function renderPlanTable() {
    const p = plan.params;
    const d = derived(p);
    const trial = plan.trial;
    const s = trial && trial.summary ? trial.summary : null;
    const rows = [
      ['方案编号', plan.no, '状态', '<span class="tag ' + plan.state + '">' + STATE_LABEL[plan.state] + '</span>'],
      ['信号周期', d.cycle + ' s', '绿信比 g/C', U.num(p.split, 2)],
      ['有效绿 / 红灯', d.green + ' s / ' + d.red + ' s', '理论放行率', d.capacity + ' veh/h'],
      ['匝道饱和度 v/c', U.num(d.vc, 2), '每周期损失', LOST_TIME + ' s'],
      ['主线上游流量', p.mainFlow + ' veh/h', '主线占有率阈值', p.mainOcc + '%'],
      ['主线限速 / 车道数', p.mainSpeed + ' km/h / ' + (p.laneCount || 3) + ' 条', '匝道需求', p.rampFlow + ' veh/h'],
      ['排队容量', p.rampCap + ' veh', '匝道占有率阈值', p.rampOcc + '%'],
      ['适用时段', p.window || '—', '控制方式', '定时控制 · 单点'],
      ['信号灯', plan.devices.signals.map(x => x.id + '(s=' + U.num(x.s, 2) + ')').join('、') || '未布置',
        '检测器', plan.devices.detectors.map(x => x.id + '(' + (x.corridor === 'ramp' ? '匝' : '主') + ' s=' + U.num(x.s, 2) + ')').join('、') || '未布置'],
      ['创建', plan.createdBy + ' · ' + U.fmtDT(plan.createdAt), '版本', 'v' + (plan.revision || 1)],
      ['生效', (plan.activatedBy || '—') + ' · ' + (plan.activatedAt ? U.fmtDT(plan.activatedAt) : '—'),
        '停用', (plan.retiredBy || '—') + ' · ' + (plan.retiredAt ? U.fmtDT(plan.retiredAt) : '—')]
    ];
    if (s) {
      rows.push(['试运行占有率均值', s.avgOcc + '%', '试运行偏差均值', s.meanDev + '%']);
      rows.push(['峰值排队', s.peakQueue + ' veh', '试运行结论',
        trial.result === 'pass' ? '<span class="ok">通过</span>' : trial.result === 'fail' ? '<span class="bad">未通过</span>' : '已中止']);
    }
    el.ttWrap.innerHTML =
      '<div class="tt-actions"><span class="small">当前方案配时与设备配置</span>' +
      '<span style="flex:1"></span>' +
      '<button class="btn sm ghost" id="ttViewTrial" ' + (trial && trial.records && trial.records.length ? '' : 'disabled') + '>查看试运行记录</button>' +
      '<button class="btn sm ghost" id="ttExport">导出本方案配时表</button></div>' +
      '<table class="tt"><thead><tr><th>项目</th><th>设定</th><th>项目</th><th>设定</th></tr></thead><tbody>' +
      rows.map(r => '<tr><td class="muted">' + r[0] + '</td><td class="num">' + r[1] + '</td>' +
        '<td class="muted">' + r[2] + '</td><td class="num">' + r[3] + '</td></tr>').join('') +
      '</tbody></table>';
    const b = document.getElementById('ttExport');
    if (b) b.onclick = exportPlanTable;
    const v = document.getElementById('ttViewTrial');
    if (v) v.onclick = () => { tableKind = 'rec'; el.ttTabs.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.kind === 'rec')); renderTable(); };
  }

  function renderAllPlansTable() {
    const list = ramp.plans.slice().sort((a, b) => b.createdAt - a.createdAt);
    el.ttWrap.innerHTML =
      '<div class="tt-actions"><span class="small">' + U.esc(ramp.code + ' ' + ramp.name) + ' 全部方案（' + list.length + '）</span>' +
      '<span style="flex:1"></span><button class="btn sm ghost" id="ttExport">导出全部方案配时表</button></div>' +
      '<table class="tt"><thead><tr><th>方案编号</th><th>名称</th><th>状态</th><th>周期</th><th>g/C</th><th>有效绿</th>' +
      '<th>放行率</th><th>v/c</th><th>创建</th><th>生效</th><th>停用</th><th></th></tr></thead><tbody>' +
      list.map(p => {
        const d = derived(p.params);
        return '<tr>' +
          '<td class="mono">' + U.esc(p.no) + '</td>' +
          '<td>' + U.esc(p.name) + '</td>' +
          '<td><span class="tag ' + p.state + '">' + STATE_LABEL[p.state] + '</span></td>' +
          '<td class="num">' + d.cycle + 's</td>' +
          '<td class="num">' + U.num(p.params.split, 2) + '</td>' +
          '<td class="num">' + d.green + 's</td>' +
          '<td class="num">' + d.capacity + '</td>' +
          '<td class="num ' + (d.vc > 1 ? 'bad' : '') + '">' + U.num(d.vc, 2) + '</td>' +
          '<td class="mono">' + U.esc(p.createdBy) + ' · ' + U.fmtHMTime(p.createdAt) + '</td>' +
          '<td class="mono">' + (p.activatedBy ? U.esc(p.activatedBy) + ' · ' + U.fmtHMTime(p.activatedAt) : '—') + '</td>' +
          '<td class="mono">' + (p.retiredBy ? U.esc(p.retiredBy) + ' · ' + U.fmtHMTime(p.retiredAt) : '—') + '</td>' +
          '<td><button class="btn sm ghost" data-view="' + p.id + '">详情</button></td>' +
          '</tr>';
      }).join('') +
      '</tbody></table>';
    const b = document.getElementById('ttExport');
    if (b) b.onclick = exportPlanTable;
    el.ttWrap.querySelectorAll('[data-view]').forEach(node => {
      node.addEventListener('click', () => showPlanDetail(ramp.plans.find(p => p.id === node.dataset.view)));
    });
  }

  function renderTrialTable() {
    const withTrial = ramp.plans.filter(p => p.trial && p.trial.records && p.trial.records.length);
    const target = withTrial.find(p => p.id === plan.id) || withTrial[0];
    if (!target) {
      el.ttWrap.innerHTML = '<div class="tt-actions"><span class="small">暂无试运行记录</span></div>' +
        '<div class="log-empty" style="margin:14px">本匝道还没有方案完成试运行采样</div>';
      return;
    }
    const recs = target.trial.records;
    const s = target.trial.summary || Store.summarizeTrial(target.trial);
    el.ttWrap.innerHTML =
      '<div class="tt-actions"><span class="small">' + U.esc(target.no + ' ' + target.name) +
      ' · 周期 ' + derived(target.params).cycle + ' s / 有效绿 ' + derived(target.params).green + ' s' +
      ' · 采样 ' + recs.length + ' 次（每 ' + TRIAL_RECORD_STEP + ' 秒）' +
      ' · 占有率均值 <b class="' + (s.avgOcc > target.params.mainOcc + 6 ? 'bad' : 'ok') + '">' + s.avgOcc + '%</b>' +
      ' · 偏差均值 <b class="' + (s.meanDev > 6 ? 'bad' : 'ok') + '">' + s.meanDev + '%</b></span>' +
      '<span style="flex:1"></span><button class="btn sm ghost" id="ttExport">导出试运行记录</button></div>' +
      '<table class="tt"><thead><tr><th>序号</th><th>仿真时刻(s)</th><th>记录时间</th><th>实际占有率</th><th>主线速度</th>' +
      '<th>实际周期</th><th>实际有效绿</th><th>方案偏差</th><th>排队</th><th>溢出</th><th>判定</th></tr></thead><tbody>' +
      recs.map((r, i) => {
        const devBad = r.devPct > 6;
        const occBad = r.occ > target.params.mainOcc + 6;
        return '<tr>' +
          '<td class="mono">' + (i + 1) + '</td>' +
          '<td class="num">' + r.t + '</td>' +
          '<td class="mono">' + U.fmtTime(r.at) + '</td>' +
          '<td class="num ' + (occBad ? 'bad' : '') + '">' + r.occ + '%</td>' +
          '<td class="num">' + r.speed + '</td>' +
          '<td class="num">' + r.cycle + 's</td>' +
          '<td class="num">' + r.green + 's</td>' +
          '<td class="num ' + (devBad ? 'bad' : 'ok') + '">' + r.devPct + '%</td>' +
          '<td class="num">' + r.queue + '</td>' +
          '<td class="num">' + (r.overflow ? '<span class="bad">是</span>' : '否') + '</td>' +
          '<td>' + (r.overflow || devBad || occBad ? '<span class="bad">关注</span>' : '<span class="ok">正常</span>') + '</td>' +
          '</tr>';
      }).join('') +
      '</tbody></table>';
    const b = document.getElementById('ttExport');
    if (b) b.onclick = () => exportTrial(target);
  }

  function showPlanDetail(p) {
    if (!p) return;
    const d = derived(p.params);
    const s = p.trial && p.trial.summary ? p.trial.summary : null;
    openModal({
      title: p.no + ' ' + p.name,
      bodyHtml:
        '<div class="kv">' +
        '<span>状态</span><b>' + STATE_LABEL[p.state] + '</b>' +
        '<span>配时</span><b>C=' + d.cycle + ' s，g/C=' + U.num(p.params.split, 2) + '，有效绿 ' + d.green + ' s</b>' +
        '<span>放行能力</span><b>' + d.capacity + ' veh/h（v/c ' + U.num(d.vc, 2) + '）</b>' +
        '<span>需求</span><b>主线 ' + p.params.mainFlow + ' veh/h，匝道 ' + p.params.rampFlow + ' veh/h</b>' +
        '<span>设备</span><b>信号灯 ' + p.devices.signals.length + ' 处，检测器 ' + p.devices.detectors.length + ' 处</b>' +
        '<span>创建</span><b>' + U.esc(p.createdBy) + ' · ' + U.fmtDT(p.createdAt) + '</b>' +
        '<span>生效</span><b>' + (p.activatedBy ? U.esc(p.activatedBy) + ' · ' + U.fmtDT(p.activatedAt) : '—') + '</b>' +
        '<span>停用</span><b>' + (p.retiredBy ? U.esc(p.retiredBy) + ' · ' + U.fmtDT(p.retiredAt) : '—') + '</b>' +
        (p.retireNote ? '<span>停用说明</span><b>' + U.esc(p.retireNote) + '</b>' : '') +
        (s ? '<span>试运行</span><b>占有率 ' + s.avgOcc + '%，偏差 ' + s.meanDev + '%，峰值排队 ' + s.peakQueue + ' veh</b>' : '') +
        '</div>' +
        '<p class="small muted">该方案为历史留档，仅可查看与导出，若需继续调整请复制为草稿。</p>',
      actions: [
        { label: '关闭', kind: 'ghost' },
        {
          label: '复制为草稿', kind: 'primary', onClick: () => {
            if (sim.running) pauseSim();
            const np = D.mkPlan({
              name: (p.name.replace(/（.*?）$/, '').slice(0, 14) + ' 复制草稿').slice(0, 24),
              state: 'draft',
              params: Object.assign({}, p.params),
              devices: D.cloneDevices(p.devices),
              createdBy: currentUser().name,
              simSeed: Math.floor(Math.random() * 9000) + 1000
            });
            np.no = Store.newPlanNo(ramp, np);
            ramp.plans.push(np);
            Store.save();
            logAction('创建草稿', '由 ' + p.no + ' 复制生成草稿 ' + np.no, 'info');
            loadPlan(np, { keepSim: false });
            toast('已复制为草稿 ' + np.no, 'ok');
          }
        }
      ]
    });
  }

  /* =========================================================
     导出
     ========================================================= */
  function exportPlanTable() {
    const all = Exporter.planRows(ramp);
    const detail = Exporter.timingTable(ramp, plan);
    const rows = [['配时表 · ' + ramp.code + ' ' + ramp.name + ' · ' + ramp.road + ' ' + ramp.km + ' · ' + ramp.dir],
      ['导出时间', U.fmtDT(Date.now())], [],
      ['一、方案一览']].concat(all, [[]], [['二、当前工作方案明细']], detail);
    U.download('配时表_' + ramp.code + '_' + U.dateStr() + '.csv', U.csvText(rows), 'text/csv');
    logAction('导出配时表', '导出 ' + ramp.code + ' 全部方案配时表（' + ramp.plans.length + ' 条方案）', 'info');
    toast('配时表已导出', 'ok');
  }

  function exportTrial(target) {
    const p = target || plan;
    if (!p.trial || !p.trial.records.length) { toast('该方案暂无试运行记录', 'warn'); return; }
    const rows = [['试运行记录 · ' + ramp.code + ' ' + ramp.name + ' · ' + p.no + ' ' + p.name],
      ['周期', derived(p.params).cycle + ' s', '绿信比', U.num(p.params.split, 2), '开始时间', U.fmtDT(p.trial.startedAt)],
      [],
      ['序号', '仿真时刻(s)', '记录时间', '实际占有率(%)', '主线速度(km/h)', '实际周期(s)', '实际有效绿(s)', '方案偏差(%)', '排队(veh)', '溢出']];
    p.trial.records.forEach((r, i) => rows.push([i + 1, r.t, U.fmtDT(r.at), r.occ, r.speed, r.cycle, r.green, r.devPct, r.queue, r.overflow ? '是' : '否']));
    const s = p.trial.summary || Store.summarizeTrial(p.trial);
    rows.push([], ['汇总', '占有率均值 ' + s.avgOcc + '%', '偏差均值 ' + s.meanDev + '%', '峰值排队 ' + s.peakQueue + ' veh',
      '结论 ' + (p.trial.result === 'pass' ? '通过' : p.trial.result === 'fail' ? '未通过' : '中止')]);
    U.download('试运行记录_' + ramp.code + '_' + U.dateStr() + '.csv', U.csvText(rows), 'text/csv');
    logAction('导出试运行记录', p.no + ' 共 ' + p.trial.records.length + ' 条采样记录', 'info');
    toast('试运行记录已导出', 'ok');
  }

  function exportLog() {
    const rows = Exporter.logRows(null);
    U.download('控制日志_' + U.dateStr() + '.csv', U.csvText(rows), 'text/csv');
    Store.log({
      rampId: ramp.id, planNo: plan.no, role: role, user: currentUser().name,
      action: '导出控制日志', detail: '导出当日全部匝道控制日志 ' + (rows.length - 1) + ' 条', level: 'info'
    });
    renderLogs();
    toast('当日控制日志已导出（' + (rows.length - 1) + ' 条）', 'ok');
  }

  /* =========================================================
     弹窗 / 提示
     ========================================================= */
  function openModal(opts) {
    const root = el.modalRoot;
    root.hidden = false;
    root.innerHTML =
      '<div class="modal" role="dialog" aria-modal="true">' +
      '<div class="modal-head"><h3>' + U.esc(opts.title) + '</h3><button class="x" aria-label="关闭">✕</button></div>' +
      '<div class="modal-body">' + (opts.bodyHtml || '') + '</div>' +
      '<div class="modal-foot">' +
      (opts.actions || []).map((a, i) => '<button class="btn ' + (a.kind || '') + '" data-i="' + i + '">' + U.esc(a.label) + '</button>').join('') +
      '</div></div>';
    const close = () => { root.hidden = true; root.innerHTML = ''; };
    root.querySelector('.x').onclick = close;
    root.onclick = e => { if (e.target === root) close(); };
    root.querySelectorAll('[data-i]').forEach(node => {
      node.onclick = () => {
        const act = (opts.actions || [])[Number(node.dataset.i)];
        close();
        if (act && act.onClick) act.onClick();
      };
    });
    root._close = close;
  }

  function toast(msg, kind) {
    while (el.toastZone.children.length >= 2) el.toastZone.firstElementChild.remove();
    const node = document.createElement('div');
    node.className = 'toast ' + (kind || '');
    node.textContent = msg;
    el.toastZone.appendChild(node);
    setTimeout(() => {
      node.style.transition = 'opacity .25s, transform .25s';
      node.style.opacity = '0';
      node.style.transform = 'translateY(6px)';
      setTimeout(() => node.remove(), 280);
    }, 2800);
  }

  function bindKeyboard() {
    document.addEventListener('keydown', e => {
      const tag = (e.target && e.target.tagName || '').toLowerCase();
      const typing = tag === 'input' || tag === 'select' || tag === 'textarea';
      if (e.key === 'Escape') {
        if (!el.modalRoot.hidden) { if (el.modalRoot._close) el.modalRoot._close(); return; }
        if (stage.selectedId) stage.setSelected(null);
        if (stage.mode !== 'select') { stage.setMode('select'); syncModeButtons(); }
        return;
      }
      if (typing) return;
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (stage.selectedId && editable()) { e.preventDefault(); stage.deleteSelected(); }
      }
      if (e.key === ' ') {
        e.preventDefault();
        el.btnPlay.click();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
