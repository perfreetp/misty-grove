/* =========================================================
   平面图渲染与设备布置（Canvas2D）
   ========================================================= */
(function () {
  'use strict';

  const U = window.U;

  const C = {
    bg: '#08121c',
    grid: 'rgba(56,189,248,0.045)',
    roadFill: '#16202c',
    roadEdge: '#3d556c',
    edgeLine: 'rgba(226,240,252,0.72)',
    dash: 'rgba(226,240,252,0.42)',
    median: '#1d3a4f',
    laneGreen: '#3fdc9b',
    laneAmber: '#f5c451',
    laneRed: '#f87171',
    text: '#cfe4f5',
    sub: '#7897b0',
    accent: '#38bdf8'
  };

  function bez(p0, p1, p2, p3, t) {
    const mt = 1 - t;
    const a = mt * mt * mt, b = 3 * mt * mt * t, c = 3 * mt * t * t, d = t * t * t;
    return { x: a * p0.x + b * p1.x + c * p2.x + d * p3.x, y: a * p0.y + b * p1.y + c * p2.y + d * p3.y };
  }

  function sampleBezier(p0, p1, p2, p3, n) {
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const p = bez(p0, p1, p2, p3, t);
      pts.push({ x: p.x, y: p.y, t });
    }
    let len = 0;
    pts[0].d = 0;
    for (let i = 1; i < pts.length; i++) {
      const dx = pts[i].x - pts[i - 1].x, dy = pts[i].y - pts[i - 1].y;
      len += Math.hypot(dx, dy);
      pts[i].d = len;
      pts[i].a = Math.atan2(dy, dx);
    }
    pts[0].a = pts[1].a;
    return { pts, len };
  }

  function atDist(path, dist) {
    const pts = path.pts;
    const L = path.len;
    const d = U.clamp(dist, 0, L);
    let lo = 0, hi = pts.length - 1;
    while (lo < hi - 1) {
      const mid = (lo + hi) >> 1;
      if (pts[mid].d <= d) lo = mid; else hi = mid;
    }
    const p0 = pts[lo], p1 = pts[Math.min(lo + 1, pts.length - 1)];
    const span = Math.max(1e-6, p1.d - p0.d);
    const f = (d - p0.d) / span;
    return {
      x: p0.x + (p1.x - p0.x) * f,
      y: p0.y + (p1.y - p0.y) * f,
      a: p0.a + (p1.a - p0.a) * f,
      d: d
    };
  }

  function atS(path, s) { return atDist(path, U.clamp(s, 0, 1) * path.len); }

  function offsetPolyline(pts, dist) {
    return pts.map((p, i) => {
      const prev = pts[Math.max(0, i - 1)], next = pts[Math.min(pts.length - 1, i + 1)];
      const a = Math.atan2(next.y - prev.y, next.x - prev.x);
      return { x: p.x - Math.sin(a) * dist, y: p.y + Math.cos(a) * dist };
    });
  }

  function polyline(ctx, pts) {
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
  }

  function roundRect(ctx, x, y, w, h, r) {
    const rr = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  }

  class Stage {
    constructor(canvas, wrap, opts) {
      this.canvas = canvas;
      this.wrap = wrap;
      this.ctx = canvas.getContext('2d');
      this.opts = opts || {};
      this.mode = 'select';
      this.labels = true;
      this.view = { scale: 1, tx: 0, ty: 0 };
      this.W = 800; this.H = 520; this.dpr = 1;
      this.params = null;
      this.devices = { signals: [], detectors: [] };
      this.meta = null;
      this.snap = null;
      this.selectedId = null;
      this.visual = { mainCars: [], rampCars: [], releaseAcc: 0, pulse: 0, spillPulse: 0 };
      this.geo = null;
      this.drag = null;
      this.pan = null;
      this.hover = null;
      this.popEl = null;
      this._bind();
      this._observe();
      this.resize();
    }

    /* ---------------- 生命周期 ---------------- */
    setPlan(params, devices, meta) {
      this.params = params;
      this.devices = devices;
      this.meta = meta;
      if (this.selectedId && !this._findDevice(this.selectedId)) this.setSelected(null);
      this.buildGeometry();
      this.syncCars(true);
    }

    setSnapshot(snap) { this.snap = snap; }

    setMode(mode) {
      this.mode = mode;
      if (mode !== 'select') this.setSelected(null);
      this.wrap.classList.toggle('selecting', mode === 'select');
      this.canvas.style.cursor = mode === 'select' ? 'default' : 'crosshair';
    }

    setLabels(on) { this.labels = on; }

    resetView() {
      this.view = { scale: 1, tx: 0, ty: 0 };
      this.setSelected(null);
    }

    setSelected(id) {
      this.selectedId = id;
      if (this.opts.onSelect) this.opts.onSelect(this.getSelected());
      this.renderPopup();
    }

    getSelected() { return this.selectedId ? this._findDevice(this.selectedId) : null; }

    _findDevice(id) {
      if (!this.devices) return null;
      return this.devices.signals.find(s => s.id === id) || this.devices.detectors.find(d => d.id === id) || null;
    }

    /* ---------------- 尺寸 ---------------- */
    _observe() {
      if (typeof ResizeObserver !== 'undefined') {
        this.ro = new ResizeObserver(() => this.resize());
        this.ro.observe(this.wrap);
      } else {
        window.addEventListener('resize', () => this.resize());
      }
    }

    resize() {
      const rect = this.wrap.getBoundingClientRect();
      const W = Math.max(320, Math.round(rect.width));
      const H = Math.max(260, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      this.W = W; this.H = H; this.dpr = dpr;
      this.canvas.width = Math.round(W * dpr);
      this.canvas.height = Math.round(H * dpr);
      this.canvas.style.width = W + 'px';
      this.canvas.style.height = H + 'px';
      this.wrap.classList.toggle('compact', H < 400);
      this.wrap.classList.toggle('tiny', H < 300);
      this.buildGeometry();
      this.syncCars(true);
      this.renderPopup();
    }

    /* ---------------- 几何 ---------------- */
    buildGeometry() {
      const W = this.W, H = this.H;
      const laneCount = U.clamp((this.params && this.params.laneCount) || 3, 2, 4);
      const laneW = U.clamp(H * 0.056, 14, 28);
      const padX = Math.max(38, W * 0.045);
      const arterialY = H - U.clamp(H * 0.10, 40, 62);
      const mainCenter = H * 0.375;
      const ebBottom = mainCenter + laneW * laneCount / 2;
      const ebTop = mainCenter - laneW * laneCount / 2;
      const medianH = U.clamp(H * 0.028, 8, 16);
      const wbTop = ebTop - medianH - laneW * 3;
      const mergeX = W * 0.685;

      const rampP0 = { x: padX + W * 0.055, y: arterialY - 10 };
      const rampP1 = { x: padX + W * 0.12, y: arterialY - H * 0.20 };
      const rampP2 = { x: W * 0.40, y: ebBottom + H * 0.14 };
      const rampP3 = { x: mergeX, y: ebBottom };
      const path = sampleBezier(rampP0, rampP1, rampP2, rampP3, 200);

      this.geo = {
        W, H, laneW, laneCount, padX, arterialY, mainCenter, ebTop, ebBottom, wbTop, medianH,
        x0: padX, x1: W - padX, mergeX, ramp: path,
        rampW: U.clamp(laneW * 0.95, 13, 26)
      };
      this.mainlineAt = s => ({ x: this.geo.x0 + (this.geo.x1 - this.geo.x0) * U.clamp(s, 0, 1) });
    }

    /* ---------------- 设备坐标 ---------------- */
    devicePos(dev) {
      const g = this.geo;
      if (!g) return { x: 0, y: 0, a: 0 };
      if (dev.corridor === 'ramp') {
        const p = atS(g.ramp, dev.s);
        return { x: p.x, y: p.y, a: p.a };
      }
      const s = U.clamp(dev.s, 0, 1);
      return { x: g.x0 + (g.x1 - g.x0) * s, y: g.mainCenter, a: 0 };
    }

    /* ---------------- 交互 ---------------- */
    _bind() {
      const cv = this.canvas;
      cv.addEventListener('pointerdown', e => this._down(e));
      cv.addEventListener('pointermove', e => this._move(e));
      cv.addEventListener('pointerup', e => this._up(e));
      cv.addEventListener('pointercancel', e => this._up(e));
      cv.addEventListener('pointerleave', () => { this.hover = null; this.renderPopup(); });
      cv.addEventListener('wheel', e => {
        e.preventDefault();
        const rect = cv.getBoundingClientRect();
        const mx = e.clientX - rect.left, my = e.clientY - rect.top;
        const old = this.view.scale;
        const next = U.clamp(old * (e.deltaY < 0 ? 1.12 : 0.89), 1, 2.6);
        if (Math.abs(next - old) < 0.0001) return;
        const wx = (mx - this.view.tx) / old, wy = (my - this.view.ty) / old;
        this.view.scale = next;
        this.view.tx = mx - wx * next;
        this.view.ty = my - wy * next;
        this._clampView();
        this.renderPopup();
      }, { passive: false });
      cv.addEventListener('dblclick', () => { if (this.mode === 'select') this.resetView(); });
    }

    _screen(e) {
      const r = this.canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    _toWorld(p) {
      const v = this.view;
      return { x: (p.x - v.tx) / v.scale, y: (p.y - v.ty) / v.scale };
    }

    _clampView() {
      const v = this.view;
      const maxTx = 0, maxTy = 0;
      const minTx = this.W - this.W * v.scale, minTy = this.H - this.H * v.scale;
      v.tx = U.clamp(v.tx, Math.min(minTx, maxTx), Math.max(minTx, maxTx));
      v.ty = U.clamp(v.ty, Math.min(minTy, maxTy), Math.max(minTy, maxTy));
    }

    _hit(world, radius) {
      const r = radius || 16;
      let best = null, bestD = r;
      const all = this.devices.signals.concat(this.devices.detectors);
      all.forEach(d => {
        const p = this.devicePos(d);
        const dist = Math.hypot(p.x - world.x, p.y - world.y);
        if (dist < bestD) { best = d; bestD = dist; }
      });
      return best;
    }

    _corridorAt(world) {
      // 返回 {corridor, s, dist}
      const g = this.geo;
      let best = null;
      const sx = U.clamp((world.x - g.x0) / (g.x1 - g.x0), 0, 1);
      const onMain = Math.abs(world.y - g.mainCenter) < g.laneW * 2.2;
      if (onMain && world.x > g.x0 - 10 && world.x < g.x1 + 10) {
        best = { corridor: 'mainline', s: sx, dist: Math.abs(world.y - g.mainCenter) };
      }
      const pts = g.ramp.pts;
      let bd = Infinity, bs = 0;
      for (let i = 0; i < pts.length; i++) {
        const d = Math.hypot(pts[i].x - world.x, pts[i].y - world.y);
        if (d < bd) { bd = d; bs = pts[i].d / g.ramp.len; }
      }
      if (bd < g.rampW * 2.4 && (!best || bd < best.dist)) {
        best = { corridor: 'ramp', s: bs, dist: bd };
      }
      return best;
    }

    _down(e) {
      const world = this._toWorld(this._screen(e));
      const hit = this._hit(world, 14 / this.view.scale);

      if (this.mode === 'signal' || this.mode === 'detector') {
        const cor = this.mode === 'signal' ? this._corridorAtRamp(world) : this._corridorAt(world);
        if (!cor) {
          if (this.opts.onToast) this.opts.onToast('请在' + (this.mode === 'signal' ? '匝道' : '道路') + '上点击布置', 'warn');
          return;
        }
        if (this.opts.onPlace) this.opts.onPlace(this.mode, cor);
        return;
      }

      if (hit) {
        this.setSelected(hit.id);
        if (this._canEdit()) {
          this.drag = { id: hit.id, moved: false };
          this.canvas.setPointerCapture(e.pointerId);
        }
        return;
      }
      this.setSelected(null);
      this.pan = { x: this._screen(e).x, y: this._screen(e).y, tx: this.view.tx, ty: this.view.ty };
      this.canvas.setPointerCapture(e.pointerId);
    }

    _corridorAtRamp(world) {
      const g = this.geo;
      const pts = g.ramp.pts;
      let bd = Infinity, bs = 0;
      for (let i = 0; i < pts.length; i++) {
        const d = Math.hypot(pts[i].x - world.x, pts[i].y - world.y);
        if (d < bd) { bd = d; bs = pts[i].d / g.ramp.len; }
      }
      if (bd > g.rampW * 3) return null;
      return { corridor: 'ramp', s: U.clamp(bs, 0.05, 0.99), dist: bd };
    }

    _move(e) {
      const sp = this._screen(e);
      if (this.drag) {
        const world = this._toWorld(sp);
        const dev = this._findDevice(this.drag.id);
        if (!dev) return;
        if (dev.corridor === 'ramp') {
          const cor = this._corridorAtRamp(world);
          if (cor) { dev.s = U.round(cor.s, 3); this.drag.moved = true; this.renderPopup(); }
        } else {
          const g = this.geo;
          const s = U.clamp((world.x - g.x0) / (g.x1 - g.x0), 0.02, 0.98);
          dev.s = U.round(s, 3);
          dev.corridor = 'mainline';
          this.drag.moved = true;
          this.renderPopup();
        }
        this.syncCars(true);
        return;
      }
      if (this.pan) {
        this.view.tx = this.pan.tx + (sp.x - this.pan.x);
        this.view.ty = this.pan.ty + (sp.y - this.pan.y);
        this._clampView();
        this.renderPopup();
        return;
      }
      const world = this._toWorld(sp);
      const hit = this._hit(world, 14 / this.view.scale);
      this.hover = hit ? hit.id : null;
      this.canvas.style.cursor = hit && this.mode === 'select' ? 'grab' : (this.mode === 'select' ? 'default' : 'crosshair');
    }

    _up(e) {
      if (this.drag) {
        const dev = this._findDevice(this.drag.id);
        if (dev && this.drag.moved && this.opts.onDeviceMove) this.opts.onDeviceMove(dev);
        this.drag = null;
      }
      if (this.pan) this.pan = null;
      try { this.canvas.releasePointerCapture(e.pointerId); } catch (err) { /* noop */ }
    }

    _canEdit() { return this.opts.canEdit ? this.opts.canEdit() : true; }

    deleteSelected() {
      if (!this.selectedId) return false;
      if (!this._canEdit()) {
        if (this.opts.onToast) this.opts.onToast('方案已锁定，不能删除设备', 'warn');
        return false;
      }
      const id = this.selectedId;
      const isSig = !!this.devices.signals.find(s => s.id === id);
      if (isSig) this.devices.signals = this.devices.signals.filter(s => s.id !== id);
      else this.devices.detectors = this.devices.detectors.filter(d => d.id !== id);
      this.setSelected(null);
      if (this.opts.onDeviceDelete) this.opts.onDeviceDelete(id, isSig);
      return true;
    }

    /* ---------------- 设备浮层 ---------------- */
    renderPopup() {
      if (!this.popEl) return;
      const dev = this.getSelected();
      const wrapRect = this.wrap.getBoundingClientRect();
      if (!dev || !this.geo) { this.popEl.hidden = true; return; }
      const p = this.devicePos(dev);
      const v = this.view;
      const sx = p.x * v.scale + v.tx;
      const sy = p.y * v.scale + v.ty;
      const isSig = !!this.devices.signals.find(s => s.id === dev.id);
      const d = window.DOMAIN.derived(this.params);
      const snap = this.snap || { occMain: 0, occRamp: 0, queue: 0 };
      const rows = isSig
        ? [['相位', snap.phase === 'green' ? '绿灯' : snap.phase === 'amber' ? '黄灯' : '红灯'],
           ['周期 / 绿灯', d.cycle + 's / ' + d.green + 's'],
           ['当前位置 s', U.num(dev.s, 2)]]
        : [['断面类型', dev.corridor === 'ramp' ? '匝道检测器' : '主线检测器'],
           ['当前位置 s', U.num(dev.s, 2)],
           ['实测值', dev.corridor === 'ramp' ? U.num(snap.occRamp, 1) + '%' : U.num(snap.occMain, 1) + '%']];
      this.popEl.innerHTML =
        '<h4><i style="width:7px;height:7px;border-radius:50%;background:' + (isSig ? '#facc15' : '#38bdf8') + '"></i>' +
        U.esc(dev.name) + '</h4>' +
        rows.map(r => '<div class="row-line"><span>' + U.esc(r[0]) + '</span><b>' + U.esc(r[1]) + '</b></div>').join('') +
        (this._canEdit() ? '<div class="pop-actions"><button class="btn sm ghost" data-act="del">删除设备</button></div>' : '') +
        '<div class="row-line"><span>布置状态</span><b>' + (this._canEdit() ? '可编辑' : '方案锁定') + '</b></div>';
      this.popEl.hidden = false;
      const pw = this.popEl.offsetWidth || 180;
      const ph = this.popEl.offsetHeight || 110;
      let left = sx + 16, top = sy - ph / 2;
      if (left + pw > wrapRect.width - 8) left = sx - pw - 16;
      left = U.clamp(left, 8, Math.max(8, wrapRect.width - pw - 8));
      top = U.clamp(top, 8, Math.max(8, wrapRect.height - ph - 8));
      this.popEl.style.left = left + 'px';
      this.popEl.style.top = top + 'px';
      const btn = this.popEl.querySelector('[data-act="del"]');
      if (btn) btn.onclick = () => this.deleteSelected();
    }

    /* ---------------- 车辆视觉状态 ---------------- */
    syncCars(rebuild) {
      if (!this.geo || !this.params) { this.visual = { mainCars: [], rampCars: [], releaseAcc: 0, pulse: 0, spillPulse: 0 }; return; }
      const v = this.visual;
      if (!rebuild && v.mainCars.length) return;
      const g = this.geo;
      const p = this.params;
      const lanes = U.clamp(p.laneCount || 3, 2, 4);
      const target = U.clamp(Math.round(p.mainFlow / (115 - lanes * 12)), 5, 38);
      const cars = [];
      for (let i = 0; i < target; i++) {
        const lane = i % lanes;
        cars.push({
          x: g.x0 + Math.random() * (g.x1 - g.x0),
          lane: lane,
          len: g.laneW * (0.55 + Math.random() * 0.22),
          tone: Math.random()
        });
      }
      v.mainCars = cars;
    }

    consumeRelease(n) {
      if (!n) return;
      const g = this.geo;
      if (!g) return;
      const sig = this.devices.signals[0];
      const startS = sig ? Math.max(0, sig.s - 0.02) : 0.1;
      const pool = this.visual.rampCars;
      let add = Math.min(n, 4);
      while (add > 0) {
        add -= 1;
        if (pool.length > 26) break;
        pool.push({ s: startS, v: 0, merged: false });
      }
    }

    /* ---------------- 主渲染 ---------------- */
    render(dtReal, snap) {
      const ctx = this.ctx;
      const g = this.geo;
      if (!g) return;
      if (snap) this.snap = snap;
      const v = this.visual;
      v.pulse = (v.pulse + dtReal) % 1000;

      ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      ctx.clearRect(0, 0, this.W, this.H);
      this._drawBackdrop(ctx);

      ctx.save();
      ctx.translate(this.view.tx, this.view.ty);
      ctx.scale(this.view.scale, this.view.scale);

      this._drawArterial(ctx);
      this._drawMainline(ctx);
      this._drawRamp(ctx);
      this._updateAndDrawRampCars(ctx, dtReal);
      this._drawMainCars(ctx, dtReal);
      this._drawSpill(ctx);
      this._drawDevices(ctx);
      this._drawAnnotations(ctx);
      ctx.restore();

      this._drawOverlayText(ctx);
    }

    _drawBackdrop(ctx) {
      const g = this.geo;
      ctx.fillStyle = C.bg;
      ctx.fillRect(0, 0, g.W, g.H);
      // 地形网格
      ctx.strokeStyle = C.grid;
      ctx.lineWidth = 1;
      const step = 34;
      ctx.beginPath();
      for (let x = 0; x < g.W; x += step) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, g.H); }
      for (let y = 0; y < g.H; y += step) { ctx.moveTo(0, y + 0.5); ctx.lineTo(g.W, y + 0.5); }
      ctx.stroke();
      // 地块色块
      ctx.fillStyle = 'rgba(27,49,68,0.35)';
      roundRect(ctx, g.padX * 0.4, g.H * 0.06, g.W * 0.24, g.H * 0.16, 6); ctx.fill();
      ctx.fillStyle = 'rgba(24,44,62,0.30)';
      roundRect(ctx, g.W * 0.62, g.H * 0.60, g.W * 0.30, g.H * 0.18, 6); ctx.fill();
    }

    _drawArterial(ctx) {
      const g = this.geo;
      const y = g.arterialY;
      const h = U.clamp(g.laneW * 1.7, 22, 42);
      ctx.fillStyle = C.roadFill;
      ctx.fillRect(-4, y, g.W + 8, h);
      ctx.strokeStyle = C.roadEdge;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(-4, y + 0.5); ctx.lineTo(g.W + 4, y + 0.5);
      ctx.moveTo(-4, y + h - 0.5); ctx.lineTo(g.W + 4, y + h - 0.5);
      ctx.stroke();
      ctx.strokeStyle = C.dash;
      ctx.lineWidth = 1.2;
      ctx.setLineDash([12, 10]);
      ctx.beginPath();
      ctx.moveTo(-4, y + h / 2); ctx.lineTo(g.W + 4, y + h / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      if (this.labels) {
        ctx.font = '600 9.5px "Microsoft YaHei",sans-serif';
        ctx.fillStyle = C.sub;
        ctx.textAlign = 'left';
        ctx.fillText((this.meta && this.meta.arterial ? this.meta.arterial : '地面道路') + '  ·  入口衔接', 12, y - 6);
      }
    }

    _drawMainline(ctx) {
      const g = this.geo;
      const { laneW, ebTop, ebBottom, wbTop, medianH } = g;
      // 西行（对向）车行道
      ctx.fillStyle = '#111a24';
      ctx.fillRect(0, wbTop, g.W, laneW * 3);
      // 中央分隔带
      ctx.fillStyle = C.median;
      ctx.fillRect(0, wbTop + laneW * 3, g.W, medianH);
      ctx.strokeStyle = 'rgba(96,150,190,0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, wbTop + 0.5); ctx.lineTo(g.W, wbTop + 0.5);
      ctx.stroke();
      // 东行（本向）车行道
      ctx.fillStyle = C.roadFill;
      ctx.fillRect(0, ebTop, g.W, ebBottom - ebTop);

      // 车道分隔虚线（本向）
      ctx.strokeStyle = C.dash;
      ctx.lineWidth = 1.2;
      ctx.setLineDash([16, 14]);
      for (let i = 1; i < g.laneCount; i++) {
        const y = ebTop + laneW * i;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(g.W, y); ctx.stroke();
      }
      // 对向车道线
      ctx.globalAlpha = 0.4;
      for (let i = 1; i < 3; i++) {
        const y = wbTop + laneW * i;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(g.W, y); ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;

      // 边缘线
      ctx.strokeStyle = C.edgeLine;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(0, ebTop + 0.5); ctx.lineTo(g.W, ebTop + 0.5);
      ctx.moveTo(0, ebBottom - 0.5); ctx.lineTo(g.W, ebBottom - 0.5);
      ctx.moveTo(0, wbTop + 0.5); ctx.lineTo(g.W, wbTop + 0.5);
      ctx.stroke();

      // 方向箭头
      this._arrow(ctx, g.W * 0.14, g.mainCenter, 1, 1);
      this._arrow(ctx, g.W * 0.86, g.mainCenter, 1, 1);
      this._arrow(ctx, g.W * 0.30, wbTop + laneW * 4.4, -1, 0.55);
      this._arrow(ctx, g.W * 0.74, wbTop + laneW * 4.4, -1, 0.55);

      if (this.labels) {
        // 对向车流标注（空间足够时才画，避免压到主线标注）
        if (ebTop - (wbTop + laneW * 1.7) > 4) {
          ctx.font = '600 9.5px "Microsoft YaHei",sans-serif';
          ctx.fillStyle = 'rgba(120,150,176,0.72)';
          ctx.textAlign = 'left';
          ctx.fillText('对向车流', 12, wbTop + laneW * 1.5);
        }
        // 车道数标识
        const badge = (g.laneCount || 3) + ' 车道';
        ctx.font = '600 9px "Bahnschrift","Microsoft YaHei",monospace';
        const bw = ctx.measureText(badge).width + 12;
        ctx.fillStyle = 'rgba(8,18,28,0.75)';
        ctx.strokeStyle = 'rgba(76,120,150,0.5)';
        ctx.lineWidth = 1;
        roundRect(ctx, g.x0, ebTop - 16, bw, 14, 4);
        ctx.fill(); ctx.stroke();
        ctx.fillStyle = 'rgba(170,205,230,0.9)';
        ctx.textAlign = 'center';
        ctx.fillText(badge, g.x0 + bw / 2, ebTop - 6);
      }
    }

    _arrow(ctx, x, y, dir, alpha) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = 'rgba(148,180,206,0.45)';
      ctx.beginPath();
      const s = 6;
      ctx.moveTo(x + dir * s, y);
      ctx.lineTo(x - dir * s, y - s * 0.8);
      ctx.lineTo(x - dir * s, y + s * 0.8);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    _drawRamp(ctx) {
      const g = this.geo;
      const path = g.ramp;
      const rw = g.rampW;
      ctx.lineCap = 'butt';
      ctx.lineJoin = 'round';

      // 路基
      polyline(ctx, path.pts);
      ctx.strokeStyle = '#101a25';
      ctx.lineWidth = rw + 5;
      ctx.stroke();

      // 路面
      polyline(ctx, path.pts);
      ctx.strokeStyle = C.roadFill;
      ctx.lineWidth = rw;
      ctx.stroke();

      // 边线
      const left = offsetPolyline(path.pts, rw / 2 - 0.8);
      const right = offsetPolyline(path.pts, -(rw / 2 - 0.8));
      ctx.strokeStyle = 'rgba(226,240,252,0.66)';
      ctx.lineWidth = 1.5;
      polyline(ctx, left); ctx.stroke();
      polyline(ctx, right); ctx.stroke();

      // 中心引导线（进入渐变段后消失）
      const tail = path.pts.filter(p => p.d < path.len * 0.9);
      if (tail.length > 2) {
        ctx.setLineDash([9, 9]);
        ctx.strokeStyle = 'rgba(226,240,252,0.30)';
        ctx.lineWidth = 1.1;
        polyline(ctx, tail); ctx.stroke();
        ctx.setLineDash([]);
      }

      // 渐变段（加速车道）
      const merge = atS(path, 1);
      const ebBottom = g.ebBottom;
      const taperEnd = { x: merge.x + g.W * 0.075, y: ebBottom - g.laneW * 0.5 };
      ctx.beginPath();
      ctx.moveTo(merge.x - 2, ebBottom - rw * 0.2);
      ctx.quadraticCurveTo(merge.x + g.W * 0.03, ebBottom, taperEnd.x, taperEnd.y);
      ctx.lineTo(taperEnd.x, taperEnd.y + 2);
      ctx.quadraticCurveTo(merge.x + g.W * 0.03, ebBottom + rw * 0.6, merge.x - 2, ebBottom + rw * 0.6);
      ctx.closePath();
      ctx.fillStyle = C.roadFill;
      ctx.fill();
      ctx.strokeStyle = 'rgba(226,240,252,0.5)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      if (this.labels) {
        const lp = atS(path, 0.20);
        ctx.save();
        ctx.translate(lp.x, lp.y);
        ctx.rotate(lp.a);
        ctx.font = '600 10px "Microsoft YaHei",sans-serif';
        ctx.fillStyle = 'rgba(150,184,210,0.8)';
        ctx.textAlign = 'center';
        ctx.fillText('入口匝道 · 单车道', 0, -rw * 0.9);
        ctx.restore();
      }
    }

    _queueLayout() {
      const g = this.geo;
      const path = g.ramp;
      const p = this.params || {};
      const snap = this.snap || { queue: 0 };
      const q = snap.queue || 0;
      const cap = Math.max(1, p.rampCap || 20);
      const sig = this.devices.signals[0];
      const sigS = sig ? sig.s : 0.72;
      const backLen = path.len * sigS;
      const perCar = 9.2;
      const maxDraw = Math.max(1, Math.floor(backLen * 0.94 / perCar));
      const drawn = Math.min(Math.ceil(q), maxDraw);
      const spacingPx = drawn > 0 ? Math.min(34, (backLen * 0.94) / drawn) : 34;
      const queueRatio = U.clamp(q / cap, 0, 1.6);
      const pressure = U.clamp(q / Math.max(1, cap * 1.2), 0, 1);
      return { q, cap, sigS, backLen, drawn, spacingPx, queueRatio, pressure, path };
    }

    _updateAndDrawRampCars(ctx, dtReal) {
      const g = this.geo;
      const path = g.ramp;
      const v = this.visual;
      const snap = this.snap || { queue: 0, phase: 'red', overflow: false };
      const L = this._queueLayout();

      // ---- 已放行车流（信号后 → 汇入点） ----
      const pool = v.rampCars;
      const green = snap.phase === 'green';
      for (let i = pool.length - 1; i >= 0; i--) {
        const car = pool[i];
        car.v = Math.min(1.05, (car.v || 0) + dtReal * 0.55);
        car.s += car.v * dtReal * 0.20;
        if (car.s >= 1) {
          pool.splice(i, 1);
        }
      }
      // 汇入点产生主线车辆
      if (pool.filter(c => c.s > 1).length) pool.length = pool.length;

      // ---- 排队车辆 ----
      const qColor = snap.overflow ? '#f87171' : (L.pressure > 0.66 ? '#f59e0b' : '#38bdf8');
      const startS = Math.max(0.045, L.sigS - (L.drawn * L.spacingPx) / path.len);
      for (let i = 0; i < L.drawn; i++) {
        const s = startS + (i * L.spacingPx) / path.len;
        const p = atS(path, s);
        // 前车起步流动感：绿灯时最前面几辆略微移动
        let jitter = 0;
        if (green && i < 3) jitter = Math.sin(v.pulse * 6 + i) * 1.4;
        this._car(ctx, p.x + Math.cos(p.a) * jitter, p.y + Math.sin(p.a) * jitter, p.a,
          U.clamp(g.rampW * 0.62, 8, 17), qColor, snap.overflow ? 0.95 : 0.88, i < 3 && green);
      }

      // ---- 放行车辆 ----
      pool.forEach(c => {
        const p = atS(path, U.clamp(c.s, 0, 1));
        this._car(ctx, p.x, p.y, p.a, U.clamp(g.rampW * 0.6, 8, 16), '#7fe3ff', 0.9, true);
      });

      // ---- 信号灯前的停止线 ----
      if (L.sigS > 0.02) {
        const sp = atS(path, L.sigS - 0.012);
        this._crossLine(ctx, sp, g.rampW, 'rgba(226,240,252,0.7)', 2);
      }
    }

    _car(ctx, x, y, a, len, color, alpha, headlight) {
      const w = len * 0.86, h = len;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(a);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      roundRect(ctx, -w / 2, -h / 2, w, h, Math.min(3.2, w * 0.28));
      ctx.fill();
      ctx.globalAlpha = alpha * 0.55;
      ctx.fillStyle = '#06111a';
      roundRect(ctx, -w * 0.18, -h * 0.34, w * 0.4, h * 0.68, 1.6);
      ctx.fill();
      if (headlight) {
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = '#fff6cf';
        ctx.fillRect(w / 2 - 1.4, -h * 0.34, 1.6, h * 0.2);
        ctx.fillRect(w / 2 - 1.4, h * 0.14, 1.6, h * 0.2);
      }
      ctx.restore();
    }

    _crossLine(ctx, p, width, color, lw) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.a);
      ctx.strokeStyle = color;
      ctx.lineWidth = lw;
      ctx.beginPath();
      ctx.moveTo(0, -width / 2);
      ctx.lineTo(0, width / 2);
      ctx.stroke();
      ctx.restore();
    }

    _drawMainCars(ctx, dtReal) {
      const g = this.geo;
      const v = this.visual;
      const snap = this.snap || { speed: 80, spill: 0, occMain: 15 };
      const p = this.params || { mainFlow: 2000 };
      const speed = snap.speed || 0;
      const pxPerSec = (speed / 3.6) * (g.W / 1300);
      const spill = snap.spill || 0;
      const mergeZone = g.mergeX;

      // 密度自洽
      const lanes = U.clamp(p.laneCount || 3, 2, 4);
      const target = U.clamp(Math.round(p.mainFlow / (115 - lanes * 12)), 5, 38);
      while (v.mainCars.length < target) {
        v.mainCars.push({ x: g.x0 - Math.random() * 200, lane: v.mainCars.length % lanes, len: g.laneW * 0.6, tone: Math.random() });
      }
      while (v.mainCars.length > target + 4) v.mainCars.pop();

      v.mainCars.forEach(c => {
        let sp = pxPerSec;
        const nearMerge = c.x < mergeZone + 40 && c.x > mergeZone - 220;
        if (nearMerge && spill > 0.02) sp *= (1 - 0.62 * spill);
        if (nearMerge) sp *= 0.96;
        c.x += sp * dtReal;
        if (c.x > g.x1 + 40) {
          c.x = g.x0 - 20 - Math.random() * 120;
          c.lane = Math.floor(Math.random() * lanes);
        }
        const laneY = g.ebTop + g.laneW * (c.lane + 0.5);
        const len = U.clamp(g.laneW * 0.58, 8, 16);
        const crowded = spill > 0.3 && c.lane === lanes - 1 && nearMerge;
        const color = crowded ? '#f8a5a5' : (snap.occMain > (p.mainOcc || 20) ? '#e8c07a' : '#a8c8e0');
        this._car(ctx, c.x, laneY, 0, len, color, 0.85, true);
      });
    }

    _drawSpill(ctx) {
      const g = this.geo;
      const snap = this.snap || {};
      const spill = snap.spill || 0;
      if (spill <= 0.02) return;
      const merge = atS(g.ramp, 1);
      const t = (this.visual.pulse * 1.6) % 1;

      ctx.save();
      // 汇入区红色拥堵晕染
      const grad = ctx.createRadialGradient(merge.x, g.ebBottom, 4, merge.x, g.ebBottom, 130);
      grad.addColorStop(0, 'rgba(248,113,113,' + (0.30 * spill) + ')');
      grad.addColorStop(1, 'rgba(248,113,113,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(merge.x - 140, g.ebBottom - 90, 280, 170);

      // 匝道排队尾部的红色示警
      const L = this._queueLayout();
      const tailS = Math.max(0.045, L.sigS - (L.drawn * L.spacingPx) / g.ramp.len);
      const tail = atS(g.ramp, tailS);
      ctx.beginPath();
      ctx.arc(tail.x, tail.y, 8 + t * 10, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(248,113,113,' + (0.55 * (1 - t)) + ')';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 主线受影响区段标注
      if (spill > 0.35) {
        ctx.strokeStyle = 'rgba(248,113,113,' + (0.35 + 0.2 * Math.sin(this.visual.pulse * 5)) + ')';
        ctx.lineWidth = 1.6;
        ctx.setLineDash([8, 6]);
        ctx.strokeRect(g.mergeX - 150, g.ebTop - 3, 210, g.ebBottom - g.ebTop + 6);
        ctx.setLineDash([]);
        ctx.font = '600 10px "Microsoft YaHei",sans-serif';
        ctx.fillStyle = '#fda4a4';
        ctx.textAlign = 'left';
        ctx.fillText('主线受溢出影响', g.mergeX - 150, g.ebTop - 8);
      }
      ctx.restore();
    }

    _drawDevices(ctx) {
      const g = this.geo;
      const snap = this.snap || {};
      const d = window.DOMAIN.derived(this.params || {});
      const sel = this.selectedId;

      // 检测器
      this.devices.detectors.forEach(det => {
        const p = this.devicePos(det);
        const isRamp = det.corridor === 'ramp';
        const width = isRamp ? g.rampW : g.laneW * g.laneCount;
        const occ = isRamp ? (snap.occRamp || 0) : (snap.occMain || 0);
        const limit = isRamp ? (this.params.rampOcc || 30) : (this.params.mainOcc || 20);
        const hot = occ >= limit;
        const color = hot ? '#f87171' : '#38bdf8';

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.a);
        // 断面虚线
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.75;
        ctx.lineWidth = 1.4;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(0, -width / 2 - 4);
        ctx.lineTo(0, width / 2 + 4);
        ctx.stroke();
        ctx.setLineDash([]);
        // 检测线圈
        ctx.globalAlpha = 1;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(0, -width / 2);
        ctx.lineTo(0, width / 2);
        ctx.stroke();
        ctx.restore();

        // 检测器标记
        const bx = p.x + (isRamp ? -Math.sin(p.a) * (g.rampW / 2 + 16) : 0);
        const by = p.y + (isRamp ? Math.cos(p.a) * (g.rampW / 2 + 16) : -g.laneW * 1.5 - 16);
        this._detBox(ctx, bx, by, det.id, U.num(occ, 1) + '%', color, sel === det.id, hot);
      });

      // 信号灯
      this.devices.signals.forEach((sig, idx) => {
        const p = this.devicePos(sig);
        const nx = -Math.sin(p.a), ny = Math.cos(p.a);
        const ox = p.x + nx * (g.rampW / 2 + 22);
        const oy = p.y + ny * (g.rampW / 2 + 22);
        this._signalHead(ctx, ox, oy, snap.phase || 'red', sel === sig.id, sig.id, idx);
        // 连接杆
        ctx.strokeStyle = '#4b6880';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(p.x + nx * (g.rampW / 2), p.y + ny * (g.rampW / 2));
        ctx.lineTo(ox, oy);
        ctx.stroke();
      });
    }

    _detBox(ctx, x, y, id, val, color, selected, hot) {
      const w = 62, h = 26;
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = 'rgba(8,18,28,0.92)';
      ctx.strokeStyle = selected ? '#7ee0ff' : (hot ? 'rgba(248,113,113,0.8)' : 'rgba(56,189,248,0.4)');
      ctx.lineWidth = selected ? 1.6 : 1;
      roundRect(ctx, -w / 2, -h / 2, w, h, 5);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.font = '600 9px "Bahnschrift",monospace';
      ctx.textAlign = 'center';
      ctx.fillText(id, -w / 2 + 15, 2);
      ctx.fillStyle = hot ? '#fca5a5' : '#a8d8f0';
      ctx.font = '600 10px "Bahnschrift",monospace';
      ctx.textAlign = 'right';
      ctx.fillText(val, w / 2 - 6, 2);
      ctx.restore();
      // 指示线
      ctx.strokeStyle = 'rgba(56,189,248,0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + h / 2 + 2);
      ctx.stroke();
    }

    _signalHead(ctx, x, y, phase, selected, id, idx) {
      const w = 20, h = 54;
      ctx.save();
      // 立柱
      ctx.strokeStyle = '#4b6880';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x + w / 2 + 2, y + h / 2);
      ctx.lineTo(x + w / 2 + 2, y + h / 2 + 16);
      ctx.stroke();

      ctx.translate(x, y);
      // 机箱
      ctx.fillStyle = '#0d1620';
      ctx.strokeStyle = selected ? '#7ee0ff' : '#2b4760';
      ctx.lineWidth = selected ? 1.8 : 1.2;
      roundRect(ctx, -w / 2, -h / 2, w, h, 4);
      ctx.fill();
      ctx.stroke();

      const lamps = [
        { key: 'red', color: '#ef4444', cy: -h / 2 + 10 },
        { key: 'amber', color: '#f59e0b', cy: 0 },
        { key: 'green', color: '#22c55e', cy: h / 2 - 10 }
      ];
      lamps.forEach(l => {
        const on = phase === l.key;
        ctx.beginPath();
        ctx.arc(0, l.cy, 6, 0, Math.PI * 2);
        if (on) {
          const g2 = ctx.createRadialGradient(0, l.cy, 1, 0, l.cy, 12);
          g2.addColorStop(0, l.color);
          g2.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = g2;
          ctx.fillRect(-14, l.cy - 14, 28, 28);
          ctx.fillStyle = l.color;
        } else {
          ctx.fillStyle = 'rgba(40,56,70,0.95)';
        }
        ctx.beginPath();
        ctx.arc(0, l.cy, 5.6, 0, Math.PI * 2);
        ctx.fill();
        if (on) {
          ctx.strokeStyle = 'rgba(255,255,255,0.65)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
      ctx.restore();

      // 编号
      ctx.save();
      ctx.fillStyle = 'rgba(10,20,30,0.86)';
      ctx.strokeStyle = 'rgba(56,189,248,0.35)';
      ctx.lineWidth = 1;
      roundRect(ctx, x - 13, y - h / 2 - 17, 26, 14, 4);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#8fd8f5';
      ctx.font = '600 9px "Bahnschrift",monospace';
      ctx.textAlign = 'center';
      ctx.fillText(id || 'S1', x, y - h / 2 - 7);
      ctx.restore();
    }

    _drawAnnotations(ctx) {
      const g = this.geo;
      const meta = this.meta;
      if (!this.labels || !meta) return;
      ctx.save();
      // 匝道口铭牌
      const bp = atS(g.ramp, 0.02);
      ctx.font = '600 11px "Microsoft YaHei",sans-serif';
      ctx.fillStyle = 'rgba(210,236,252,0.9)';
      ctx.textAlign = 'left';
      ctx.fillText(meta.code + ' ' + meta.name, bp.x + 14, bp.y - 16);
      ctx.font = '9.5px "Microsoft YaHei",sans-serif';
      ctx.fillStyle = 'rgba(126,151,177,0.85)';
      ctx.fillText(meta.km + ' · ' + meta.dir, bp.x + 14, bp.y - 4);

      // 主线断面标注
      ctx.strokeStyle = 'rgba(126,151,177,0.22)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 5]);
      [g.x0, g.mergeX, g.x1].forEach(x => {
        ctx.beginPath();
        ctx.moveTo(x, g.wbTop - 4);
        ctx.lineTo(x, g.ebBottom + 6);
        ctx.stroke();
      });
      ctx.setLineDash([]);
      ctx.font = '9px "Bahnschrift",monospace';
      ctx.fillStyle = 'rgba(126,151,177,0.75)';
      ctx.textAlign = 'center';
      ctx.fillText('上游', g.x0, g.ebBottom + 20);
      ctx.fillText('合流点', g.mergeX, g.ebBottom + 20);
      ctx.fillText('下游', g.x1, g.ebBottom + 20);

      // 比例尺
      const bx = g.padX, by = g.H - 12;
      ctx.strokeStyle = 'rgba(160,190,214,0.5)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(bx, by); ctx.lineTo(bx + 70, by);
      ctx.moveTo(bx, by - 4); ctx.lineTo(bx, by + 4);
      ctx.moveTo(bx + 70, by - 4); ctx.lineTo(bx + 70, by + 4);
      ctx.stroke();
      ctx.font = '9px "Bahnschrift",monospace';
      ctx.fillStyle = 'rgba(160,190,214,0.65)';
      ctx.textAlign = 'center';
      ctx.fillText('100 m', bx + 35, by - 7);

      // 指北针
      ctx.save();
      ctx.translate(g.W - 26, 30);
      ctx.strokeStyle = 'rgba(126,151,177,0.55)';
      ctx.fillStyle = 'rgba(126,151,177,0.8)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(0, -12); ctx.lineTo(8, 5); ctx.lineTo(0, 0); ctx.lineTo(-8, 5); ctx.closePath();
      ctx.fill();
      ctx.font = '600 8px "Bahnschrift",monospace';
      ctx.textAlign = 'center';
      ctx.fillText('N', 0, 16);
      ctx.restore();
      ctx.restore();
    }

    _drawOverlayText(ctx) {
      const g = this.geo;
      const snap = this.snap;
      if (!snap) return;
      ctx.save();
      ctx.font = '9px "Microsoft YaHei",sans-serif';
      ctx.fillStyle = 'rgba(126,151,177,0.45)';
      ctx.textAlign = 'left';
      ctx.fillText('平面示意图 · 非实测比例', g.padX + 96, g.H - 8);
      ctx.restore();
    }
  }

  window.Stage = Stage;
})();
