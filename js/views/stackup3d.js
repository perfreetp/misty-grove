/* 视图：WebGPU 三维层叠剖切
 * - 按真实厚度比例（µm 直接作为场景单位）构建介质/铜层
 * - 每层切 10 个实例化片元，拖动剖切面时片元颜色映射走线密度热力
 * - 滑块 + 画布拖拽剖切平面，带层定位与厚度读数
 */
(function (global) {
  const App = global.App || (global.App = {});
  const Store = App.Store;
  const UI = App.UI;

  const W = 600, D = 600;        // 基板长/宽（µm）
  const SLICES_PER_LAYER = 10;
  const RAMP = [
    [0.00, [0.07, 0.23, 0.36]],
    [0.35, [0.12, 0.48, 0.71]],
    [0.60, [0.36, 0.78, 0.95]],
    [0.78, [0.96, 0.84, 0.43]],
    [0.92, [0.95, 0.55, 0.22]],
    [1.00, [0.85, 0.29, 0.29]],
  ];

  function ramp(t) {
    t = Math.max(0, Math.min(1, t));
    for (let i = 1; i < RAMP.length; i++) {
      if (t <= RAMP[i][0]) {
        const [t0, c0] = RAMP[i - 1], [t1, c1] = RAMP[i];
        const k = (t - t0) / (t1 - t0 || 1);
        return [c0[0] + (c1[0] - c0[0]) * k, c0[1] + (c1[1] - c0[1]) * k, c0[2] + (c1[2] - c0[2]) * k];
      }
    }
    return RAMP[RAMP.length - 1][1];
  }

  function composeTRS(out, i, sx, sy, sz, tx, ty, tz, r, g, b, a) {
    out.set([sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, tx, ty, tz, 1], i * 20);
    out.set([r, g, b, a], i * 20 + 16);
  }

  App.Views.stackup3d = {
    _renderer: null,

    render(root) {
      const proj = Store.currentProject();
      const total = Store.totalThickness(proj);
      const supported = App.GpuRenderer.isSupported();
      const cutMax = W; // X 方向 0..W

      root.innerHTML = `
        <div class="toolbar">
          <h2 style="margin:0">三维层叠剖切 · WebGPU</h2>
          <span class="spacer"></span>
          <span class="muted">左键旋转 · 右键平移 · 滚轮缩放 · 场景单位 = µm（真实厚度比例）</span>
        </div>
        <div class="view-3d-wrap">
          <div class="panel canvas-panel">
            <canvas id="stackGpuCanvas" class="gpu-canvas"></canvas>
            ${supported ? '<div class="canvas-hint">左键旋转 · 右键平移 · 滚轮缩放 · <b>Shift+水平拖动</b>或双击移动剖切平面（也可用右侧滑块）</div>'
              : `<div class="canvas-banner"><b>当前浏览器不支持 WebGPU</b>
                 <span>已自动降级为二维厚度剖面图（仍按真实比例），3D 剖切请使用 Chrome/Edge 113+ 且开启硬件加速。</span></div>`}
            <div id="stackFallback" style="position:absolute;inset:0;display:none"></div>
          </div>
          <div class="side-controls">
            <div class="ctrl-block">
              <h4>剖切面控制（X 轴）</h4>
              <div class="ctrl-line"><label>剖切位置</label><span class="mono muted" id="cutVal">—</span></div>
              <input type="range" id="cutSlider" min="0" max="${cutMax}" value="${cutMax}" style="width:100%">
              <div class="ctrl-line" style="margin-top:8px">
                <label>显示走线密度热力</label>
                <input type="checkbox" id="heatToggle" checked>
              </div>
              <div class="ctrl-line"><label>显示剖切平面</label><input type="checkbox" id="planeToggle" checked></div>
            </div>
            <div class="ctrl-block">
              <h4>层定位（点击跳转剖切位置）</h4>
              <div id="layerList" style="display:flex;flex-direction:column;gap:6px"></div>
            </div>
            <div class="ctrl-block">
              <h4>走线密度图例</h4>
              <div class="density-bar"></div>
              <div style="display:flex;justify-content:space-between" class="pin-note"><span>0% 稀疏</span><span>100% 密集</span></div>
            </div>
            <div class="ctrl-block">
              <h4>材质图例</h4>
              <div id="matLegend"></div>
            </div>
          </div>
        </div>`;

      if (!supported) {
        root.querySelector("#stackFallback").style.display = "block";
        const fb = this._renderFallback(root, proj);
        this._bindSideControls(root, proj, fb);
        return;
      }
      this._initGpu(root, proj);
    },

    async _initGpu(root, proj) {
      const canvas = root.querySelector("#stackGpuCanvas");
      const renderer = new App.GpuRenderer(canvas);
      this._renderer = renderer;
      try {
        await renderer.init();
      } catch (e) {
        console.error(e);
        root.querySelector("#stackGpuCanvas").insertAdjacentHTML("afterend",
          `<div class="canvas-banner"><b>WebGPU 初始化失败：${UI.esc(e.message)}</b><span>已降级为二维剖面图。</span></div>`);
        root.querySelector("#stackFallback").style.display = "block";
        this._renderFallback(root, proj);
        return;
      }

      const total = Store.totalThickness(proj);
      renderer.resetView(Math.max(1100, total * 2.2), [0, total / 2, 0]);

      const unitBox = App.Geometry.unitBox();
      const sliceItem = renderer.addInstanced(unitBox, (proj.layers.length * SLICES_PER_LAYER + 8) * 2);
      const baseItem = renderer.addInstanced(unitBox, 16);
      const planeMesh = App.Geometry.box([0, total / 2, 0], [2, total + 80, D + 120], [0.36, 0.78, 0.95, 0.18]);
      const planeItem = renderer.addSolid(planeMesh, { transparent: true });
      // 剖切面上的走线密度热力面：每层（介质段+铜段）一条实例化色带，按各层密度着色
      const heatItem = renderer.addInstanced(unitBox, proj.layers.length * 2 + 4);
      heatItem._hidden = true;

      const ctx = { renderer, sliceItem, baseItem, planeItem, heatItem, cut: W, heat: true, planeVisible: true, fallback: false };
      ctx.setCut = (v) => this._setCut(root, ctx, proj, v);
      ctx.setHeat = (on) => { ctx.heat = on; this._rebuildScene(proj, ctx); };
      ctx.setPlaneVisible = (on) => { ctx.planeVisible = on; this._updateCutVisuals(proj, ctx); };
      this._ctx = ctx;
      this._rebuildScene(proj, ctx);
      this._bindSideControls(root, proj, ctx);
      this._bindPlaneDrag(canvas, proj, ctx, root);

      if (typeof App._pendingCutIndex === "number") {
        this._setCut(root, ctx, proj, Math.round(W * 0.6));
        App._pendingCutIndex = undefined;
      }
    },

    _rebuildScene(proj, ctx) {
      const total = Store.totalThickness(proj);
      /* ---- 层叠实例：每层 10 个片元（沿 X 切片） ---- */
      const transforms = new Float32Array(proj.layers.length * SLICES_PER_LAYER * 20);
      const baseTransforms = new Float32Array(proj.layers.length * 2 * 20);
      let i = 0, bi = 0;
      let y = 0;
      const sliceW = W / SLICES_PER_LAYER;
      for (const layer of proj.layers) {
        const dT = +layer.dielectricThickness, cT = +layer.cuThickness;
        const mat = Store.materialColor(layer.material);
        const heat = ramp(layer.density / 100);
        // 介质
        for (let s = 0; s < SLICES_PER_LAYER; s++) {
          const col = ctx.heat ? heat : mat;
          composeTRS(transforms, i++, sliceW - 1.5, dT, D,
            s * sliceW + sliceW / 2 - W / 2, y + dT / 2, 0,
            col[0], col[1], col[2], 1);
        }
        y += dT;
        // 铜层（铜色，不受热力影响）
        for (let s = 0; s < SLICES_PER_LAYER; s++) {
          composeTRS(transforms, i++, sliceW - 1.5, Math.max(1, cT * 0.55), D,
            s * sliceW + sliceW / 2 - W / 2, y + cT / 2, 0,
            0.78, 0.45, 0.24, 1);
        }
        y += cT;
        // 基座（完整箱体，仅在未剖切时作为轮廓参考；默认实例数 0，由 cut 控制）
        composeTRS(baseTransforms, bi++, W, 0.6, 0.6, -W / 2 - 1, 0, D / 2 + 1, 0.45, 0.55, 0.66, 1);
        composeTRS(baseTransforms, bi++, W, 0.6, 0.6, -W / 2 - 1, total, D / 2 + 1, 0.45, 0.55, 0.66, 1);
      }
      ctx.renderer.setInstances(ctx.sliceItem, transforms, i);
      ctx.renderer.setInstances(ctx.baseItem, baseTransforms, bi);
      this._updateCutVisuals(proj, ctx);
    },

    _updateCutVisuals(proj, ctx) {
      const total = Store.totalThickness(proj);
      const cut = ctx.cut;
      // GPU 剖切：丢弃世界坐标 x > cut-W/2 的片元（平面法向 +X，d 为世界坐标 x）
      ctx.renderer.setClip([1, 0, 0], cut - W / 2, cut < W ? 1 : 0);
      ctx.planeVisible ? (ctx.planeItem._hidden = false) : (ctx.planeItem._hidden = true);
      this._repositionPlane(ctx, proj);
      this._rebuildHeatFace(proj, ctx);
    },

    /* 半透明剖切平面：随滑块移动位置（solid 数量少，直接重建 buffer） */
    _repositionPlane(ctx, proj) {
      const total = Store.totalThickness(proj);
      const mesh = App.Geometry.box([ctx.cut - W / 2, total / 2, 0], [2, total + 80, D + 120], [0.36, 0.78, 0.95, 0.18]);
      ctx.renderer._replaceSolid(ctx.planeItem, mesh, true);
      ctx.planeItem._hidden = !ctx.planeVisible;
    },

    /* 热力面：在剖切位置按层高度分段，介质段映射该层走线密度色，铜段保持铜色 */
    _rebuildHeatFace(proj, ctx) {
      const show = ctx.heat && ctx.cut < W;
      ctx.heatItem._hidden = !show;
      if (!show) { ctx.renderer.setInstances(ctx.heatItem, new Float32Array(0), 0); return; }
      const x = ctx.cut - W / 2 + 1.2;
      const data = new Float32Array(proj.layers.length * 2 * 20);
      let i = 0, y = 0;
      for (const layer of proj.layers) {
        const dT = +layer.dielectricThickness, cT = +layer.cuThickness;
        const hc = ramp(layer.density / 100);
        composeTRS(data, i++, 3, dT, D + 4, x, y + dT / 2, 0, hc[0], hc[1], hc[2], 0.96);
        y += dT;
        composeTRS(data, i++, 3, Math.max(1, cT * 0.55), D + 4, x, y + cT / 2, 0, 0.78, 0.45, 0.24, 0.96);
        y += cT;
      }
      ctx.renderer.setInstances(ctx.heatItem, data, i);
    },

    _bindSideControls(root, proj, ctx) {
      const slider = root.querySelector("#cutSlider");
      const layerList = root.querySelector("#layerList");
      let y = 0;
      layerList.innerHTML = proj.layers.map((l, idx) => {
        const dT = +l.dielectricThickness, cT = +l.cuThickness;
        const row = { name: l.name, y0: y, y1: y + dT + cT };
        y += dT + cT;
        return `<button class="btn sm" data-cut-idx="${idx}" style="justify-content:flex-start">
          ${UI.esc(l.name)} · ${UI.esc(l.material)} · ${l.dielectricThickness + l.cuThickness}µm · 密度${l.density}%</button>`;
      }).join("");
      layerList.querySelectorAll("[data-cut-idx]").forEach((b) => {
        b.onclick = () => {
          const idx = +b.dataset.cutIdx;
          const layer = proj.layers[idx];
          if (!ctx) return;
          if (ctx.fallback) {
            // 降级模式：剖切到 60% 并高亮该层
            ctx.setCut(Math.round(W * 0.6));
            ctx.focusLayer(idx);
          } else {
            let yy = 0;
            for (let k = 0; k < idx; k++) yy += +proj.layers[k].dielectricThickness + +proj.layers[k].cuThickness;
            ctx.renderer.target = [0, yy + (+layer.dielectricThickness + +layer.cuThickness) / 2, 0];
          }
          UI.toast(`定位到 ${layer.name}（${layer.material}，走线密度 ${layer.density}%）`, "success");
        };
      });

      const matLegend = root.querySelector("#matLegend");
      const used = [...new Set(proj.layers.map((l) => l.material))];
      matLegend.innerHTML = used.map((m) => {
        const c = Store.materialColor(m);
        return `<div style="font-size:12px;margin-bottom:5px;color:var(--fg-dim)">
          <span class="legend-dot" style="background:rgb(${Math.round(c[0] * 255)},${Math.round(c[1] * 255)},${Math.round(c[2] * 255)})"></span>${UI.esc(m)}</div>`;
      }).join("") + `<div style="font-size:12px;color:var(--fg-dim)"><span class="legend-dot" style="background:#c87f4a"></span>铜层</div>`;

      slider.addEventListener("input", () => ctx.setCut(+slider.value));
      root.querySelector("#heatToggle").addEventListener("change", (e) => ctx.setHeat(e.target.checked));
      const planeToggle = root.querySelector("#planeToggle");
      planeToggle.addEventListener("change", (e) => ctx.setPlaneVisible(e.target.checked));
      if (ctx.fallback) planeToggle.disabled = true;
    },

    _setCut(root, ctx, proj, value) {
      ctx.cut = value;
      root.querySelector("#cutSlider").value = value;
      root.querySelector("#cutVal").textContent = value >= W ? "未剖切" : `${value}µm / ${W}µm`;
      this._updateCutVisuals(proj, ctx);
    },

    /* 在画布上拖动剖切平面：用屏幕 X 映射到 0..W */
    _bindPlaneDrag(canvas, proj, ctx, root) {
      let dragging = false;
      canvas.addEventListener("pointerdown", (e) => {
        if (e.shiftKey || e.button === 1) {
          dragging = true;
          try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
          e.stopImmediatePropagation();
          e.preventDefault();
        }
      }, true);
      canvas.addEventListener("pointermove", (e) => {
        if (!dragging) return;
        const rect = canvas.getBoundingClientRect();
        const t = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        this._setCut(root, ctx, proj, Math.round(t * W));
      }, true);
      canvas.addEventListener("pointerup", () => (dragging = false), true);
      // 普通点击吸附一段距离的提示
      canvas.addEventListener("dblclick", (e) => {
        const rect = canvas.getBoundingClientRect();
        const t = (e.clientX - rect.left) / rect.width;
        this._setCut(root, ctx, proj, Math.round(Math.max(0, Math.min(1, t)) * W));
      });
    },

    /* ---------- WebGPU 不可用时的二维降级：按真实厚度比例的侧剖图（控件行为与 3D 一致） ---------- */
    _renderFallback(root, proj) {
      const host = root.querySelector("#stackFallback");
      const canvas = document.createElement("canvas");
      canvas.style.cssText = "width:100%;height:100%;border-radius:6px;background:#0a1018";
      host.appendChild(canvas);
      const state = { cut: W, heat: true, focusIdx: -1 };
      const cutVal = root.querySelector("#cutVal");

      const draw = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = host.clientWidth || 800, h = host.clientHeight || 500;
        canvas.width = w * dpr; canvas.height = h * dpr;
        const ctx2 = canvas.getContext("2d");
        ctx2.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx2.clearRect(0, 0, w, h);
        const total = Store.totalThickness(proj);
        const padX = 70, padTop = 40, padBot = 50;
        const cutPct = state.cut / W;
        const barW = (w - padX * 2) * cutPct;
        const scale = (h - padTop - padBot) / total;
        let y = padTop;
        proj.layers.forEach((layer, idx) => {
          const dH = +layer.dielectricThickness * scale, cH = Math.max(2, +layer.cuThickness * scale);
          const mc = Store.materialColor(layer.material);
          const hc = ramp(layer.density / 100);
          const fill = state.heat ? hc : mc;
          ctx2.fillStyle = `rgb(${fill.map((v) => Math.round(v * 255)).join(",")})`;
          ctx2.fillRect(padX, y, barW, dH);
          ctx2.fillStyle = "#c87f4a";
          ctx2.fillRect(padX, y + dH, barW, cH);
          if (idx === state.focusIdx) {
            ctx2.strokeStyle = "#38bdf8"; ctx2.lineWidth = 2;
            ctx2.strokeRect(padX - 3, y - 2, barW + 6, dH + cH + 4);
          }
          ctx2.fillStyle = "#dce6f2";
          ctx2.font = "12px Segoe UI";
          ctx2.textAlign = "left";
          ctx2.fillText(`${layer.name} ${layer.material} 介质${layer.dielectricThickness} 铜${layer.cuThickness} 密度${layer.density}%`,
            padX + 8, y + dH / 2 + 4);
          y += dH + cH;
        });
        if (state.cut < W) {
          ctx2.strokeStyle = "#38bdf8";
          ctx2.lineWidth = 2;
          ctx2.beginPath(); ctx2.moveTo(padX + barW, padTop - 8); ctx2.lineTo(padX + barW, y + 8); ctx2.stroke();
        }
        ctx2.fillStyle = "#8ea3b8";
        ctx2.font = "11px Segoe UI";
        ctx2.textAlign = "center";
        ctx2.fillText(`总厚 ${total}µm（真实比例）· 二维降级视图`, w / 2, h - 18);
      };
      draw();

      return {
        fallback: true,
        setCut(v) {
          state.cut = v;
          cutVal.textContent = v >= W ? "未剖切" : `${v}µm / ${W}µm`;
          draw();
        },
        setHeat(on) { state.heat = on; draw(); },
        setPlaneVisible() { /* 降级视图无独立剖切平面 */ },
        focusLayer(idx) { state.focusIdx = idx; draw(); },
      };
    },
  };
})(window);
