/* =========================================================
   仿真引擎：匝道排队 / 信号放行 / 主线速度与占有率
   —— 单车道入口匝道、定时控制、每周期 3s 启动损失
   ========================================================= */
(function () {
  'use strict';

  const { derived, LOST_TIME } = window.DOMAIN;
  const U = window.U;

  const MAIN_CAP_PER_LANE = 2200; // veh/h/lane
  const SIM_SPEED = 10;            // 1 秒真实时间 ≈ 10 秒仿真时间

  function smoothstep(a, b, x) {
    const t = U.clamp((x - a) / (b - a), 0, 1);
    return t * t * (3 - 2 * t);
  }

  class Engine {
    constructor() {
      this.time = 0;          // 仿真时间 s
      this.queue = 0;
      this.arriveAcc = 0;
      this.releaseAcc = 0;
      this.speed = 90;
      this.occMain = 14;
      this.spill = 0;
      this.overflow = false;
      this.phase = 'red';
      this.cycleClock = 0;
      this.params = null;
      this.devices = null;
      this.derived = null;
      this.meterOn = true;
      this.phaseSince = 0;
      this.lastOverflowAt = -999;
      this.peakQueue = 0;
      this.rand = 1;
      this.offset = 0;
      this.mainSpeedLimit = 100;
    }

    configure(params, devices) {
      this.params = Object.assign({}, params);
      this.devices = devices;
      this.derived = derived(params);
      const sig = devices && devices.signals ? devices.signals.length : 0;
      this.meterOn = sig > 0;
      this.offset = (params.cycle || 60) * 0.13;
      this.mainSpeedLimit = params.mainSpeed || 100;
      if (!this.meterOn) this.phase = 'green';
    }

    reset(seed) {
      this.time = 0;
      this.queue = 0;
      this.arriveAcc = 0;
      this.releaseAcc = 0;
      this.mainSpeedLimit = (this.params && this.params.mainSpeed) || 100;
      this.speed = this.mainSpeedLimit;
      this.occMain = 14;
      this.spill = 0;
      this.overflow = false;
      this.cycleClock = 0;
      this.phaseSince = 0;
      this.lastOverflowAt = -999;
      this.peakQueue = 0;
      this.history = [];
      this.rand = (seed || 12345) % 9973 + 1;
      this.releaseRate = 0;
      this.releaseRateEma = 0;
      this.histAcc = 0;
      this.occRamp = 0;
      this.lastLoad = 0;
      this.phase = this.meterOn ? this._phaseAt(0) : 'green';
    }

    _rnd() {
      // 稳定可复现的伪随机
      this.rand = (this.rand * 16807) % 2147483647;
      return this.rand / 2147483647;
    }

    _phaseAt(t) {
      const d = this.derived;
      if (!this.meterOn) return 'green';
      const c = ((t + this.offset) % d.cycle + d.cycle) % d.cycle;
      // 绿灯后 2s 黄灯，其后红灯
      if (c < d.green) return 'green';
      if (c < d.green + 2) return 'amber';
      return 'red';
    }

    /* ---- 单步推进 ---- */
    step(dt) {
      if (!this.params) return this.snapshot();
      const p = this.params;
      const d = this.derived;
      const prevPhase = this.phase;
      this.time += dt;
      this.cycleClock = this.time % d.cycle;
      this.phase = this._phaseAt(this.time);
      if (this.phase !== prevPhase) this.phaseSince = this.time;

      /* --- 匝道到达 --- */
      const arrivalRate = (p.rampFlow / 3600) * (0.9 + this._rnd() * 0.2);
      this.arriveAcc += arrivalRate * dt;

      /* --- 信号放行 --- */
      let release = 0;
      const satRate = p.satFlow / 3600;      // veh/s
      const inGreen = this.phase === 'green';
      const greenElapsed = this.time - this.phaseSince;
      // 启动损失：绿灯起步 2s 内放行能力衰减
      let startFactor = 1;
      if (inGreen) {
        if (greenElapsed < 2) startFactor = 0.15 + 0.42 * greenElapsed;
      }
      if (inGreen) {
        const want = satRate * startFactor * dt;
        release = Math.min(this.queue + this.arriveAcc, want);
      }
      // 未布设信号灯：常开放行
      if (!this.meterOn) {
        const want = satRate * dt;
        release = Math.min(this.queue + this.arriveAcc, want);
      }

      // 排队更新
      this.queue = Math.max(0, this.queue + this.arriveAcc - release);
      this.arriveAcc = 0;
      this.releaseAcc += release;
      this.peakQueue = Math.max(this.peakQueue, this.queue);

      // 实测放行率：按瞬时值做指数平滑，跨周期稳定
      const instRate = (release / Math.max(dt, 1e-6)) * 3600;
      this.releaseRateEma = (this.releaseRateEma || 0) + (instRate - (this.releaseRateEma || 0)) * (1 - Math.exp(-dt / 75));
      this.releaseRate = this.releaseRateEma;

      /* --- 溢出判定 --- */
      const depth = Math.max(0, this.queue - p.rampCap);
      const targetSpill = U.clamp(depth / Math.max(3, p.rampCap * 0.4), 0, 1);
      // 回溢扩散快、消退慢
      const tau = targetSpill > this.spill ? 3.5 : 8;
      this.spill += (targetSpill - this.spill) * (1 - Math.exp(-dt / tau));
      if (targetSpill <= 0 && this.spill < 0.004) this.spill = 0;
      const wasOverflow = this.overflow;
      this.overflow = depth > 0.3;
      if (this.overflow && !wasOverflow) this.lastOverflowAt = this.time;

      /* --- 主线负荷 --- */
      // 回溢车流占用合流车道，主线有效通行能力下降
      const mainCap = p.laneCount * MAIN_CAP_PER_LANE * (1 - 0.60 * this.spill);
      const mergeRate = (release / Math.max(dt, 0.001)) * 3600;
      const inflow = p.mainFlow + Math.min(mergeRate, p.satFlow) * 0.72 + this.spill * 260;
      const load = inflow / Math.max(1, mainCap);
      this.lastLoad = load;

      const speedTarget = Math.max(12,
        this.mainSpeedLimit * (1 - 0.55 * smoothstep(0.60, 1.30, load)));
      const speedTau = speedTarget < this.speed ? 5 : 11;
      this.speed += (speedTarget - this.speed) * (1 - Math.exp(-dt / speedTau));

      const occTarget = U.clamp(4 + 17 * Math.pow(load, 1.5) + 9 * this.spill, 2, 78);
      this.occMain += (occTarget - this.occMain) * (1 - Math.exp(-dt / 6));

      // 匝道断面占有率：与排队比例相关
      this.occRamp = U.clamp(3 + 78 * (this.queue / Math.max(1, p.rampCap * 1.45)), 1, 97);

      // 趋势采样（每 5s 一点，保留 6 分钟）
      this.histAcc = (this.histAcc || 0) + dt;
      if (this.histAcc >= 5) {
        this.histAcc = 0;
        this.history.push({
          t: this.time,
          q: U.round(this.queue, 1),
          v: U.round(this.speed, 1),
          auto: U.round(this.occMain, 1),
          on: this.overflow ? 1 : 0,
          cap: p.rampCap
        });
        if (this.history.length > 72) this.history.shift();
      }

      return this.snapshot();
    }

    snapshot() {
      const d = this.derived || derived(this.params || {});
      return {
        time: this.time,
        phase: this.phase,
        cycleClock: this.cycleClock,
        queue: this.queue,
        peakQueue: this.peakQueue,
        spill: this.spill,
        overflow: this.overflow,
        speed: this.speed,
        occMain: this.occMain,
        occRamp: this.occRamp || 0,
        releaseRate: this.releaseRate || 0,
        capacity: d.capacity,
        vc: d.vc,
        green: d.green,
        red: d.red,
        cycle: d.cycle,
        meterOn: this.meterOn,
        history: this.history,
        load: this.lastLoad
      };
    }
  }

  /* =========================================================
     调节建议：根据排队压力、主线占用率和需求给出 C 与 g/C
     ========================================================= */
  function recommend(params, snap) {
    const d = derived(params);
    const q = snap ? snap.queue : 0;
    const occ = snap ? snap.occMain : 0;
    const overflow = snap ? snap.overflow : false;
    const qRatio = q / Math.max(1, params.rampCap);
    const reqCap = params.rampFlow * 1.06;
    // 满足需求所需的最小绿信比（含每周期 3s 启动损失）
    const minSplit = U.clamp(reqCap / params.satFlow + LOST_TIME / 60 + 0.02, 0.18, 0.9);
    // 溢出时主线占有率本身含回溢影响，需与主线自身负荷区分
    const occExcess = (snap && snap.spill > 0.25) ? 0 : occ;

    let cycle, split, why, priority;

    if (overflow || qRatio > 0.75) {
      // 排队告急：缩短周期、提高绿信比（在主线可承受范围内）
      priority = 'queue';
      cycle = U.clamp(Math.min(params.cycle, 60) - (overflow ? 15 : 0), 35, 180);
      split = U.clamp(Math.max(minSplit + 0.10, params.split + 0.14), 0.2, 0.86);
      if (occExcess > params.mainOcc + 1) {
        // 主线自身也紧张：缩短周期但不再加大放行
        split = U.clamp(params.split, 0.18, 0.9);
        why = '主线占有率 ' + U.num(occ, 1) + '% 高于阈值，先缩短周期压低排队波动，暂不加大放行';
      } else {
        why = '排队 ' + U.num(q, 0) + ' veh 已达容量 ' + params.rampCap +
          '，缩短周期并提高绿信比至 ' + U.num(U.clamp(Math.max(minSplit + 0.10, params.split + 0.14), 0.2, 0.86), 2) + ' 以加快消散';
      }
    } else if (occ > params.mainOcc + 2) {
      // 主线拥堵：压降匝道放行
      priority = 'mainline';
      cycle = U.clamp(params.cycle, 60, 120);
      split = U.clamp(params.split - 0.08, 0.18, 0.9);
      why = '主线占有率偏高，降低绿信比以保护主线，需监控匝道排队';
    } else if (qRatio < 0.25 && occ < params.mainOcc - 3) {
      // 运行宽松：适度延长周期减少停车次数
      priority = 'smooth';
      cycle = U.clamp(params.cycle + 15, 60, 150);
      split = U.clamp(minSplit + 0.02, 0.2, 0.9);
      why = '排队轻、主线畅通，延长周期减少停车与启动损失';
    } else {
      priority = 'steady';
      cycle = params.cycle;
      split = U.clamp(Math.max(params.split, minSplit), 0.2, 0.9);
      why = '当前排队与主线占用率均在合理区间，维持并微调绿信比';
    }

    // 容量校验
    const cap = Math.round(params.satFlow * Math.max(0, Math.round(cycle * split) - LOST_TIME) / cycle);
    const vc = cap > 0 ? params.rampFlow / cap : 9;
    if (vc > 0.98) {
      split = U.clamp(split + 0.05, 0.2, 0.92);
      why += '；饱和度 ' + U.num(vc, 2) + ' 偏高，补足绿信比';
    }
    return { cycle: Math.round(cycle), split: U.round(split, 2), why, priority };
  }

  /* =========================================================
     试运行评估
     ========================================================= */
  function evaluateTrial(records, params, summary) {
    const s = summary || {};
    const meanDev = s.meanDev == null ? 0 : s.meanDev;
    const avgOcc = s.avgOcc == null ? 0 : s.avgOcc;
    const overflowCount = s.overflowCount || 0;
    const pass = meanDev <= 6 && avgOcc <= params.mainOcc + 6 && overflowCount === 0 &&
      (s.peakQueue == null || s.peakQueue <= params.rampCap * 1.25);
    const reasons = [];
    if (meanDev > 6) reasons.push('方案偏差 ' + meanDev + '% 超出 ±6% 允许范围');
    if (avgOcc > params.mainOcc + 6) reasons.push('实际占有率均值 ' + avgOcc + '% 明显高于阈值 ' + params.mainOcc + '%');
    if (overflowCount > 0) reasons.push('试运行期间出现 ' + overflowCount + ' 次排队溢出');
    if (s.peakQueue != null && s.peakQueue > params.rampCap * 1.25) reasons.push('峰值排队 ' + s.peakQueue + ' veh 超过匝道容量的 125%');
    return { pass: pass, result: pass ? 'pass' : 'fail', reasons: reasons };
  }

  window.SimEngine = { Engine, recommend, evaluateTrial, SIM_SPEED, MAIN_CAP_PER_LANE };
})();
