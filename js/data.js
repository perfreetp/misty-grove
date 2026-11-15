/* =========================================================
   数据层：匝道档案、方案模型、默认参数、日志与持久化
   ========================================================= */
(function () {
  'use strict';

  /* ---------------- 工具 ---------------- */
  const U = {
    pad2(n) { return String(n).padStart(2, '0'); },
    clamp(v, a, b) { return Math.min(b, Math.max(a, v)); },
    round(v, d) { const m = Math.pow(10, d || 0); return Math.round(v * m) / m; },
    num(v, d) { return Number(v).toFixed(d == null ? 0 : d); },
    fmtClock(sec) {
      sec = Math.max(0, Math.round(sec));
      const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
      return (h > 0 ? h + ':' + U.pad2(m) : U.pad2(m)) + ':' + U.pad2(s);
    },
    fmtHM(sec) {
      sec = Math.max(0, Math.round(sec));
      const m = Math.floor(sec / 60), s = sec % 60;
      return U.pad2(m) + ':' + U.pad2(s);
    },
    fmtTime(ts) { const d = new Date(ts); return U.pad2(d.getHours()) + ':' + U.pad2(d.getMinutes()) + ':' + U.pad2(d.getSeconds()); },
    fmtHMTime(ts) { const d = new Date(ts); return U.pad2(d.getHours()) + ':' + U.pad2(d.getMinutes()); },
    fmtDT(ts) {
      const d = new Date(ts);
      return d.getFullYear() + '-' + U.pad2(d.getMonth() + 1) + '-' + U.pad2(d.getDate()) + ' ' +
        U.pad2(d.getHours()) + ':' + U.pad2(d.getMinutes()) + ':' + U.pad2(d.getSeconds());
    },
    dateStr(ts) {
      const d = new Date(ts == null ? Date.now() : ts);
      return d.getFullYear() + '-' + U.pad2(d.getMonth() + 1) + '-' + U.pad2(d.getDate());
    },
    isToday(ts) { return U.dateStr(ts) === U.dateStr(Date.now()); },
    uid(p) { return (p || 'id') + '-' + Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4); },
    csvText(rows) {
      return '﻿' + rows.map(row => row.map(cell => {
        let s = cell == null ? '' : String(cell);
        if (/[",\r\n]/.test(s)) s = '"' + s.replace(/"/g, '""') + '"';
        return s;
      }).join(',')).join('\r\n') + '\r\n';
    },
    download(filename, text, mime) {
      const blob = new Blob([text], { type: (mime || 'text/csv') + ';charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    },
    esc(s) {
      return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }
  };

  /* ---------------- 常量 ---------------- */
  const STATE_LABEL = { draft: '草稿', trial: '试运行', active: '生效', retired: '停用' };
  const STATE_RANK = { draft: 0, trial: 1, active: 2, retired: 3 };
  const ROLE_LABEL = { operator: '值班员', supervisor: '值班长' };
  const LOST_TIME = 3;           // 每周期损失时间 s
  const TRIAL_SECONDS = 300;     // 试运行时长为仿真时间 5 分钟
  const TRIAL_RECORD_STEP = 30;  // 每 30s 记录一次

  const DEFAULT_TIMING = { cycle: 60, split: 0.45 };

  /* ---------------- 基础参数 ---------------- */
  function baseParams(o) {
    return Object.assign({
      mainFlow: 2400,
      mainOcc: 20,
      mainSpeed: 100,
      freeSpeed: 100,
      laneCount: 3,
      rampFlow: 700,
      rampCap: 20,
      rampOcc: 28,
      satFlow: 1800,
      cycle: 60,
      split: 0.45,
      planName: '基本配时方案',
      window: '07:00-09:30'
    }, o || {});
  }

  function derived(p, timing) {
    const t = timing || p;
    const cycle = Math.max(10, Math.round(t.cycle));
    const green = U.clamp(Math.round(cycle * t.split), 5, cycle - 3);
    const red = cycle - green;
    const capacity = Math.round(p.satFlow * Math.max(0, green - LOST_TIME) / cycle);
    const vc = capacity > 0 ? p.rampFlow / capacity : 99;
    return { cycle, green, red, capacity, vc, lost: LOST_TIME };
  }

  /* ---------------- 设备布局 ---------------- */
  function devSet(sig, dets) {
    return {
      signals: sig.map((s, i) => ({ id: 'S' + (i + 1), corridor: 'ramp', s: s, name: '信号灯 S' + (i + 1) })),
      detectors: dets.map((d, i) => ({ id: 'D' + (i + 1), corridor: d.c, s: d.s, name: (d.c === 'ramp' ? '匝道检测器' : '主线检测器') + ' D' + (i + 1) }))
    };
  }

  function cloneDevices(d) {
    return JSON.parse(JSON.stringify(d));
  }

  const SEED_DEVICES = {
    r07: devSet([0.735], [{ c: 'mainline', s: 0.30 }, { c: 'ramp', s: 0.655 }, { c: 'mainline', s: 0.815 }]),
    r12: devSet([0.72], [{ c: 'mainline', s: 0.34 }, { c: 'mainline', s: 0.80 }, { c: 'ramp', s: 0.64 }]),
    r03: devSet([0.76], [{ c: 'mainline', s: 0.28 }, { c: 'ramp', s: 0.67 }, { c: 'mainline', s: 0.84 }]),
    r09: devSet([0.70], [{ c: 'mainline', s: 0.33 }, { c: 'ramp', s: 0.62 }, { c: 'mainline', s: 0.78 }])
  };

  function defaultDevices(rampId) {
    return cloneDevices(SEED_DEVICES[rampId] || SEED_DEVICES.r07);
  }

  /* ---------------- 匝道档案 ---------------- */
  const RAMP_META = [
    {
      id: 'r07', code: 'R-07', name: '城北入口', road: 'G15 沈海高速', km: 'K42+300', dir: '东行',
      arterial: '兴业路', laneCount: 2, freeSpeed: 100, note: '与兴业路东延相交，早高峰通勤汇入为主'
    },
    {
      id: 'r12', code: 'R-12', name: '科技园入口', road: 'G15 沈海高速', km: 'K47+100', dir: '东行',
      arterial: '科创大道', laneCount: 2, freeSpeed: 100, note: '服务科技园通勤，平峰需求稳定'
    },
    {
      id: 'r03', code: 'R-03', name: '西环入口', road: 'S20 外环高速', km: 'K12+700', dir: '北行',
      arterial: '西环路', laneCount: 2, freeSpeed: 90, note: '货运占比高，匝道较短，易受主线拥堵影响'
    },
    {
      id: 'r09', code: 'R-09', name: '滨江入口', road: 'G15 沈海高速', km: 'K38+600', dir: '西行',
      arterial: '滨江大道', laneCount: 2, freeSpeed: 100, note: '夜间需求低，常采用短周期放行'
    }
  ].map(m => Object.assign({}, m));

  /* ---------------- 方案工厂 ---------------- */
  function mkPlan(o) {
    const now = Date.now();
    return Object.assign({
      id: U.uid('plan'),
      no: 'P-0000-00',
      name: '未命名方案',
      state: 'draft',
      params: baseParams(),
      devices: defaultDevices('r07'),
      createdBy: '张岚', createdAt: now, updatedAt: now,
      activatedBy: null, activatedAt: null,
      retiredBy: null, retiredAt: null, retireNote: '',
      trial: null,
      revision: 1,
      simSeed: Math.floor(now / 1000) % 10000
    }, o || {});
  }

  function rec(ts, fields) {
    return Object.assign({ at: ts }, fields);
  }

  function seedTrial(planId, startAt, options) {
    const records = [];
    const base = options.base || { occ: 18.4, dev: 2.1, queue: 8 };
    for (let i = 0; i < TRIAL_SECONDS / TRIAL_RECORD_STEP; i++) {
      const occ = base.occ + Math.sin(i * 1.3 + 0.6) * 1.6 + (i * 0.08);
      const dev = Math.abs(base.dev + Math.sin(i * 0.9) * 1.1);
      records.push({
        t: (i + 1) * TRIAL_RECORD_STEP,
        at: startAt + ((i + 1) * TRIAL_RECORD_STEP) * 1000,
        occ: U.round(occ, 1),
        speed: U.round(options.speed || 72, 1),
        green: options.green, cycle: options.cycle,
        devPct: U.round(dev, 1),
        queue: U.round(base.queue + Math.cos(i * 1.1) * 3 + i * 0.4, 1),
        overflow: false
      });
    }
    const avgOcc = records.reduce((a, r) => a + r.occ, 0) / records.length;
    const meanDev = records.reduce((a, r) => a + r.devPct, 0) / records.length;
    const peakQueue = Math.max.apply(null, records.map(r => r.queue));
    return {
      planId,
      startedAt: startAt,
      endedAt: startAt + TRIAL_SECONDS * 1000,
      durationSec: TRIAL_SECONDS,
      elapsed: TRIAL_SECONDS,
      records,
      summary: {
        avgOcc: U.round(avgOcc, 1),
        meanDev: U.round(meanDev, 1),
        peakQueue: U.round(peakQueue, 1),
        overflowCount: 0
      },
      verdict: meanDev <= 5 && avgOcc <= (options.occLimit || 22),
      result: 'pass'
    };
  }

  /* ---------------- 初始数据 ---------------- */
  function buildSeed() {
    const now = Date.now();
    const min = m => now - m * 60000;

    const ramps = RAMP_META.map(meta => Object.assign({}, meta, { plans: [], baseline: null }));
    const byId = {};
    ramps.forEach(r => { byId[r.id] = r; });

    /* ---- R-07 早高峰：一条已停用历史 + 当前草稿（长周期导致溢出） ---- */
    const r07meta = byId.r07;
    const r07base = baseParams({
      mainFlow: 2460, mainOcc: 18, mainSpeed: 100, freeSpeed: 100,
      rampFlow: 940, rampCap: 12, rampOcc: 28, satFlow: 1800,
      cycle: 120, split: 0.46, planName: '早高峰基准方案', window: '07:00-09:30'
    });
    const r07old = mkPlan({
      no: 'P-1116-07-01', name: '早高峰基准方案', state: 'retired',
      params: Object.assign({}, r07base, { cycle: 120, split: 0.46 }),
      devices: defaultDevices('r07'),
      createdBy: '张岚', createdAt: min(310), updatedAt: min(300),
      activatedBy: '陈立', activatedAt: min(298), retiredBy: '张岚', retiredAt: min(128),
      retireNote: '早高峰结束，切换为平峰方案'
    });
    r07old.trial = seedTrial(r07old.id, min(316), {
      base: { occ: 19.6, dev: 1.8, queue: 10 }, speed: 74, green: Math.round(120 * 0.46), cycle: 120, occLimit: 18
    });
    const r07draft = mkPlan({
      no: 'P-1116-07-02', name: '早高峰 R-07 限流（调整）', state: 'draft',
      params: Object.assign({}, r07base, { cycle: 150, split: 0.42, planName: '早高峰 R-07 限流（调整）' }),
      devices: defaultDevices('r07'),
      createdBy: '张岚', createdAt: min(96), updatedAt: min(11), revision: 4
    });
    r07meta.plans = [r07draft, r07old];

    /* ---- R-12 平峰：生效锁定 ---- */
    const r12meta = byId.r12;
    const r12base = baseParams({
      mainFlow: 2280, mainOcc: 20, rampFlow: 760, rampCap: 20, rampOcc: 30,
      satFlow: 1800, cycle: 75, split: 0.50, planName: '平峰基本配时', window: '09:30-16:30'
    });
    const r12old = mkPlan({
      no: 'P-1116-12-01', name: '早高峰配时', state: 'retired',
      params: Object.assign({}, r12base, { cycle: 90, split: 0.47, planName: '早高峰配时' }),
      devices: defaultDevices('r12'),
      createdBy: '张岚', createdAt: min(420), updatedAt: min(410),
      activatedBy: '张岚', activatedAt: min(405), retiredBy: '陈立', retiredAt: min(190),
      retireNote: '早高峰结束，按平峰方案执行'
    });
    const r12active = mkPlan({
      no: 'P-1116-12-02', name: '平峰基本配时', state: 'active',
      params: r12base, devices: defaultDevices('r12'),
      createdBy: '张岚', createdAt: min(210), updatedAt: min(196),
      activatedBy: '陈立', activatedAt: min(190)
    });
    r12active.trial = seedTrial(r12active.id, min(240), {
      base: { occ: 18.9, dev: 1.4, queue: 9 }, speed: 76, green: Math.round(75 * 0.5), cycle: 75, occLimit: 20
    });
    r12meta.plans = [r12active, r12old];

    /* ---- R-03 试运行已结束，待确认 ---- */
    const r03meta = byId.r03;
    const r03base = baseParams({
      mainFlow: 2680, mainOcc: 22, rampFlow: 820, rampCap: 26, rampOcc: 32,
      satFlow: 1800, cycle: 90, split: 0.50, planName: '晚高峰预备方案', window: '16:30-19:30',
      freeSpeed: 90, mainSpeed: 90
    });
    const r03old = mkPlan({
      no: 'P-1116-03-01', name: '西环常规方案', state: 'retired',
      params: Object.assign({}, r03base, { cycle: 100, split: 0.48, planName: '西环常规方案' }),
      devices: defaultDevices('r03'),
      createdBy: '陈立', createdAt: min(500), updatedAt: min(480),
      activatedBy: '陈立', activatedAt: min(478), retiredBy: '陈立', retiredAt: min(150),
      retireNote: '按调度指令调整'
    });
    const r03trial = mkPlan({
      no: 'P-1116-03-02', name: '晚高峰预备方案', state: 'trial',
      params: r03base, devices: defaultDevices('r03'),
      createdBy: '张岚', createdAt: min(62), updatedAt: min(21),
      trial: seedTrial('tmp', min(26), {
        base: { occ: 20.6, dev: 2.4, queue: 12 }, speed: 66,
        green: Math.round(90 * 0.5), cycle: 90, occLimit: 22
      })
    });
    r03trial.trial.planId = r03trial.id;
    r03meta.plans = [r03trial, r03old];

    /* ---- R-09 夜间：生效锁定 ---- */
    const r09meta = byId.r09;
    const r09base = baseParams({
      mainFlow: 2100, mainOcc: 20, rampFlow: 640, rampCap: 24, rampOcc: 30,
      satFlow: 1800, cycle: 60, split: 0.45, planName: '夜间低流量方案', window: '22:00-06:00'
    });
    const r09old = mkPlan({
      no: 'P-1116-09-01', name: '夜间常规方案', state: 'retired',
      params: Object.assign({}, r09base, { cycle: 75, split: 0.44, planName: '夜间常规方案' }),
      devices: defaultDevices('r09'),
      createdBy: '张岚', createdAt: min(650), updatedAt: min(640),
      activatedBy: '张岚', activatedAt: min(635), retiredBy: '陈立', retiredAt: min(320),
      retireNote: '流量下降，缩短周期'
    });
    const r09active = mkPlan({
      no: 'P-1116-09-02', name: '夜间低流量方案', state: 'active',
      params: r09base, devices: defaultDevices('r09'),
      createdBy: '张岚', createdAt: min(340), updatedAt: min(326),
      activatedBy: '陈立', activatedAt: min(320)
    });
    r09meta.plans = [r09active, r09old];

    ramps.forEach(r => {
      const wp = r.plans.find(p => p.state === 'draft') || r.plans.find(p => p.state === 'trial') ||
        r.plans.find(p => p.state === 'active') || r.plans[0];
      r.baseline = baseParams(Object.assign({}, wp ? wp.params : {}));
    });

    const logs = [
      { at: min(11), rampId: 'r07', rampName: 'R-07 城北入口', planNo: 'P-1116-07-02', role: 'operator', user: '张岚', action: '调整配时参数', detail: '信号周期 120 → 150 s，绿灯比 0.46 → 0.42', level: 'info' },
      { at: min(24), rampId: 'r03', rampName: 'R-03 西环入口', planNo: 'P-1116-03-02', role: 'operator', user: '张岚', action: '试运行结束', detail: '实际占有率均值 20.6%，方案偏差 2.4%，峰值排队 14 veh，判定通过', level: 'ok' },
      { at: min(26), rampId: 'r03', rampName: 'R-03 西环入口', planNo: 'P-1116-03-02', role: 'operator', user: '张岚', action: '提交试运行', detail: '试运行时长 5 分钟，仿真时钟 00:00 起算', level: 'info' },
      { at: min(62), rampId: 'r03', rampName: 'R-03 西环入口', planNo: 'P-1116-03-02', role: 'operator', user: '张岚', action: '创建草稿', detail: '基于「西环常规方案」创建调整草稿', level: 'info' },
      { at: min(96), rampId: 'r07', rampName: 'R-07 城北入口', planNo: 'P-1116-07-02', role: 'operator', user: '张岚', action: '创建草稿', detail: '基于早高峰基准方案创建调整草稿', level: 'info' },
      { at: min(128), rampId: 'r07', rampName: 'R-07 城北入口', planNo: 'P-1116-07-01', role: 'operator', user: '张岚', action: '方案停用', detail: '早高峰结束，切换为平峰方案', level: 'warn' },
      { at: min(190), rampId: 'r12', rampName: 'R-12 科技园入口', planNo: 'P-1116-12-02', role: 'supervisor', user: '陈立', action: '方案生效', detail: '平峰基本配时 C=75s g/C=0.50，锁定并下发信号机', level: 'ok' },
      { at: min(320), rampId: 'r09', rampName: 'R-09 滨江入口', planNo: 'P-1116-09-02', role: 'supervisor', user: '陈立', action: '方案生效', detail: '夜间低流量方案 C=60s g/C=0.45，锁定并下发信号机', level: 'ok' }
    ];

    return {
      version: 2,
      createdAt: now,
      ramps,
      logs,
      ui: { selectedRampId: 'r07' }
    };
  }

  /* ---------------- Store ---------------- */
  const KEY = 'ramp-metering-sim.v2';

  const Store = {
    state: null,
    load() {
      try {
        const raw = localStorage.getItem(KEY);
        if (raw) {
          const data = JSON.parse(raw);
          if (data && data.version === 2 && Array.isArray(data.ramps)) {
            this.state = data;
            this.normalize();
            return false;
          }
        }
      } catch (e) { /* ignore corrupted storage */ }
      this.state = buildSeed();
      this.save();
      return true;
    },
    normalize() {
      const st = this.state;
      if (!st.logs) st.logs = [];
      if (!st.ui) st.ui = { selectedRampId: st.ramps[0] && st.ramps[0].id };
      st.ramps.forEach(r => {
        if (!r.plans || !r.plans.length) {
          r.plans = [mkPlan({ name: r.name + ' 默认方案', devices: defaultDevices(r.id), params: baseParams() })];
        }
        r.plans.forEach(p => {
          p.params = baseParams(p.params || {});
          if (!p.devices) p.devices = defaultDevices(r.id);
          if (!Array.isArray(p.devices.signals)) p.devices.signals = [];
          if (!Array.isArray(p.devices.detectors)) p.devices.detectors = [];
          if (!p.no) p.no = this.newPlanNo(r, p);
          if (p.state === 'trial' && p.trial && !p.trial.endedAt) {
            // 页面重载后仿真状态无法接续，本次试运行记为中断并退回草稿，采样记录保留
            p.trial.endedAt = Date.now();
            p.trial.running = false;
            p.trial.result = 'cancelled';
            p.trial.note = '页面刷新，仿真中断';
            p.trial.summary = p.trial.summary || this.summarizeTrial(p.trial);
            p.state = 'draft';
          }
          if (!Array.isArray(p.trialHistory)) p.trialHistory = [];
        });
      });
    },
    save() {
      try { localStorage.setItem(KEY, JSON.stringify(this.state)); } catch (e) { /* quota */ }
    },
    reset() {
      localStorage.removeItem(KEY);
      this.state = buildSeed();
      this.save();
    },
    ramp(id) { return this.state.ramps.find(r => r.id === id) || this.state.ramps[0]; },
    working(ramp) {
      const order = ['draft', 'trial', 'active'];
      for (const s of order) {
        const p = ramp.plans.find(x => x.state === s);
        if (p) return p;
      }
      return ramp.plans.slice().sort((a, b) => b.updatedAt - a.updatedAt)[0];
    },
    activePlan(ramp) { return ramp.plans.find(p => p.state === 'active') || null; },
    plan(ramp, id) { return ramp.plans.find(p => p.id === id) || null; },
    newPlanNo(ramp, plan) {
      const d = new Date(plan && plan.createdAt ? plan.createdAt : Date.now());
      const day = U.pad2(d.getMonth() + 1) + U.pad2(d.getDate());
      const code = (ramp.code || 'R-00').replace('R-', '');
      const seq = ramp.plans.filter(p => p.no && p.no.indexOf('P-' + day + '-' + code) === 0).length + 1;
      return 'P-' + day + '-' + code + '-' + U.pad2(seq);
    },
    log(entry) {
      const ramp = this.ramp(entry.rampId);
      const log = Object.assign({
        at: Date.now(),
        rampId: entry.rampId,
        rampName: ramp ? ramp.code + ' ' + ramp.name : '',
        planNo: entry.planNo || '',
        role: 'operator',
        user: '张岚',
        action: '操作',
        detail: '',
        level: 'info'
      }, entry);
      this.state.logs.unshift(log);
      if (this.state.logs.length > 400) this.state.logs.length = 400;
      this.save();
      return log;
    },
    todayLogs(rampId) {
      return this.state.logs.filter(l => U.isToday(l.at) && (!rampId || l.rampId === rampId));
    },
    summarizeTrial(trial) {
      const records = trial.records || [];
      if (!records.length) return { avgOcc: 0, meanDev: 0, peakQueue: 0, overflowCount: 0 };
      return {
        avgOcc: U.round(records.reduce((a, r) => a + r.occ, 0) / records.length, 1),
        meanDev: U.round(records.reduce((a, r) => a + r.devPct, 0) / records.length, 1),
        peakQueue: U.round(Math.max.apply(null, records.map(r => r.queue)), 1),
        overflowCount: records.filter(r => r.overflow).length
      };
    }
  };

  /* ---------------- 导出 ---------------- */
  const Exporter = {
    planRows(ramp) {
      const rows = [
        ['方案编号', '方案名称', '状态', '信号周期(s)', '绿信比', '有效绿(s)', '红灯(s)',
          '理论放行率(veh/h)', '饱和度(v/c)', '主线上游流量(veh/h)', '主线车道数', '主线占有率阈值(%)',
          '匝道需求(veh/h)', '匝道排队容量(veh)', '匝道占有率阈值(%)', '饱和流率(veh/h)',
          '适用时段', '信号灯(处)', '检测器(处)', '创建人', '创建时间', '生效操作人', '生效时间', '停用人', '停用时间', '备注']
      ];
      ramp.plans.slice().sort((a, b) => a.createdAt - b.createdAt).forEach(p => {
        const d = derived(p.params);
        rows.push([
          p.no, p.name, STATE_LABEL[p.state], d.cycle, U.num(p.params.split, 2), d.green, d.red,
          d.capacity, U.num(d.vc, 2), p.params.mainFlow, p.params.laneCount || 3, p.params.mainOcc,
          p.params.rampFlow, p.params.rampCap, p.params.rampOcc, p.params.satFlow,
          p.params.window || '', p.devices.signals.length, p.devices.detectors.length,
          p.createdBy, U.fmtDT(p.createdAt),
          p.activatedBy || '', p.activatedAt ? U.fmtDT(p.activatedAt) : '',
          p.retiredBy || '', p.retiredAt ? U.fmtDT(p.retiredAt) : '', p.retireNote || ''
        ]);
      });
      return rows;
    },
    timingTable(ramp, plan) {
      const rows = [
        ['配时表 · ' + ramp.code + ' ' + ramp.name],
        ['道路', ramp.road + ' ' + ramp.km + ' · ' + ramp.dir, '导出时间', U.fmtDT(Date.now()), '方案', plan.no + ' ' + plan.name],
        [],
        ['参数项', '设定值', '单位', '说明']
      ];
      const d = derived(plan.params);
      const p = plan.params;
      rows.push(
        ['信号周期', d.cycle, 's', '匝道信号一个完整周期'],
        ['绿信比 g/C', U.num(p.split, 2), '—', '有效绿灯时长占周期比例'],
        ['有效绿', d.green, 's', '绿灯放行时长'],
        ['红灯', d.red, 's', '含黄灯过渡，按红灯计'],
        ['每周期损失时间', d.lost, 's', '启动损失，计算放行能力时扣除'],
        ['理论放行率', d.capacity, 'veh/h', '饱和流率 × (绿灯-损失)/周期'],
        ['匝道饱和度 v/c', U.num(d.vc, 2), '—', '需求流量 / 理论放行率'],
        ['主线上游流量', p.mainFlow, 'veh/h', '主线检测断面输入'],
        ['主线占有率阈值', p.mainOcc, '%', '超过即触发主线拥堵提示'],
        ['主线限速', p.mainSpeed, 'km/h', '仿真自由流速度基准'],
        ['主线车道数', p.laneCount || 3, '条', '决定主线通行能力'],
        ['匝道需求流量', p.rampFlow, 'veh/h', '入口匝道到达需求'],
        ['匝道排队容量', p.rampCap, 'veh', '超过即判定溢出至主线'],
        ['匝道占有率阈值', p.rampOcc, '%', '匝道检测器告警阈值'],
        ['饱和流率', p.satFlow, 'veh/h', '单车道绿灯饱和放行率'],
        ['适用时段', p.window || '—', '—', '方案计划执行时段'],
        ['信号灯', plan.devices.signals.length, '处', plan.devices.signals.map(s => '匝道 s=' + U.num(s.s, 2)).join('；') || '未布置'],
        ['检测器', plan.devices.detectors.length, '处', plan.devices.detectors.map(x => (x.corridor === 'ramp' ? '匝道' : '主线') + ' s=' + U.num(x.s, 2)).join('；') || '未布置'],
        ['方案状态', STATE_LABEL[plan.state], '—', '草稿/试运行/生效/停用'],
        ['创建', plan.createdBy + ' ' + U.fmtDT(plan.createdAt), '—', ''],
        ['生效', (plan.activatedBy || '—') + ' ' + (plan.activatedAt ? U.fmtDT(plan.activatedAt) : ''), '—', '生效后参数锁定'],
        ['停用', (plan.retiredBy || '—') + ' ' + (plan.retiredAt ? U.fmtDT(plan.retiredAt) : ''), '—', plan.retireNote || '']
      );
      if (plan.trial && plan.trial.records && plan.trial.records.length) {
        rows.push([], ['试运行记录', '仿真时刻(s)', '实际占有率(%)', '主线速度(km/h)', '实际周期(s)', '实际有效绿(s)', '方案偏差(%)', '排队(veh)', '溢出']);
        plan.trial.records.forEach(r => {
          rows.push(['', r.t, r.occ, r.speed, r.cycle, r.green, r.devPct, r.queue, r.overflow ? '是' : '否']);
        });
        const s = plan.trial.summary || {};
        rows.push(['试运行汇总', '占有率均值 ' + s.avgOcc + '%', '偏差均值 ' + s.meanDev + '%', '峰值排队 ' + s.peakQueue + ' veh', '结论 ' + (plan.trial.result === 'pass' ? '通过' : plan.trial.result === 'fail' ? '未通过' : '中断')]);
      }
      return rows;
    },
    logRows(rampId) {
      const rows = [['时间', '匝道', '方案编号', '角色', '操作人', '操作', '说明', '结果']];
      Store.todayLogs(rampId).slice().sort((a, b) => a.at - b.at).forEach(l => {
        rows.push([U.fmtDT(l.at), l.rampName, l.planNo, ROLE_LABEL[l.role] || l.role, l.user, l.action, l.detail,
          l.level === 'ok' ? '正常' : l.level === 'warn' ? '注意' : l.level === 'err' ? '异常' : '记录']);
      });
      return rows;
    }
  };

  window.U = U;
  window.Store = Store;
  window.Exporter = Exporter;
  window.DOMAIN = {
    STATE_LABEL, STATE_RANK, ROLE_LABEL, LOST_TIME, TRIAL_SECONDS, TRIAL_RECORD_STEP,
    DEFAULT_TIMING, baseParams, derived, mkPlan, defaultDevices, cloneDevices, RAMP_META
  };
})();
