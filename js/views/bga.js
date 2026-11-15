/* 视图：BGA 球阵编辑 —— 行列/间距参数生成，缺球/偏位/连锡标记，WebGPU 三维球阵与缺陷清单 */
(function (global) {
  const App = global.App || (global.App = {});
  const Store = App.Store;
  const UI = App.UI;

  const DEFECT_COLORS = {
    nominal: [0.36, 0.78, 0.95],
    missing: [0.54, 0.60, 0.66],
    offset:  [0.97, 0.62, 0.20],
    bridge:  [0.98, 0.49, 0.20],
  };

  App.Views.bga = {
    _editor: null,
    _gpu: null,
    _selected: null,

    render(root) {
      const proj = Store.currentProject();
      const bga = proj.bga;
      const locked = proj.locked;
      const defects = Store.defectBalls(proj);

      root.innerHTML = `
        ${UI.lockedBanner(proj)}
        <div class="toolbar">
          <h2 style="margin:0">BGA 球阵编辑 · ${UI.esc(proj.name)}</h2>
          <span class="spacer"></span>
          <span class="muted">共 ${bga.balls.length} 颗 · <b class="orange-text">异常 ${defects.length} 颗</b></span>
          <button class="btn sm" data-act="export">导出缺陷明细 CSV</button>
        </div>

        <div class="bga-layout">
          <div class="panel tight">
            <div class="panel-title" style="padding:4px 6px 8px">
              <h3 style="margin:0">球阵平面编辑（点击焊球应用左侧标记工具）</h3>
              <span class="pin-note">${App.GpuRenderer.isSupported() ? "WebGPU 可用，下方含三维预览" : "当前环境无 WebGPU，使用二维编辑"}</span>
            </div>
            <canvas id="bga2dCanvas" class="bga-canvas"></canvas>
          </div>

          <div style="display:flex;flex-direction:column;gap:14px;min-width:0">
            <div class="panel tight">
              <h4 style="color:var(--fg-dim);margin:0 0 8px">球阵参数（µm）</h4>
              <div class="grid cols-2" style="gap:8px">
                <label class="pin-note">列数<input type="number" id="bgaCols" value="${bga.cols}" min="1" max="40" ${locked ? "disabled" : ""} style="width:100%;margin-top:3px"></label>
                <label class="pin-note">行数<input type="number" id="bgaRows" value="${bga.rows}" min="1" max="40" ${locked ? "disabled" : ""} style="width:100%;margin-top:3px"></label>
                <label class="pin-note">列间距<input type="number" id="bgaPitchX" value="${bga.pitchX}" min="50" ${locked ? "disabled" : ""} style="width:100%;margin-top:3px"></label>
                <label class="pin-note">行间距<input type="number" id="bgaPitchY" value="${bga.pitchY}" min="50" ${locked ? "disabled" : ""} style="width:100%;margin-top:3px"></label>
                <label class="pin-note">焊球直径<input type="number" id="bgaDia" value="${bga.ballDiameter}" min="50" ${locked ? "disabled" : ""} style="width:100%;margin-top:3px"></label>
              </div>
              <button class="btn primary sm" id="regenBtn" style="width:100%;margin-top:10px" ${locked ? "disabled" : ""}>按参数重新生成球阵</button>
            </div>

            <div class="panel tight">
              <h4 style="color:var(--fg-dim);margin:0 0 8px">标记工具</h4>
              <div class="defect-type-list" id="toolList">
                ${["missing", "offset", "bridge", "nominal"].map((t) => `
                  <label><input type="radio" name="defTool" value="${t}" ${t === "missing" ? "checked" : ""} ${locked ? "disabled" : ""}>
                    ${UI.defectBadge(t === "nominal" ? "nominal" : t)} <span class="pin-note">${toolHint(t)}</span></label>`).join("")}
              </div>
              <div id="offsetEditor" style="display:none;margin-top:10px">
                <h4 style="color:var(--fg-dim);margin:0 0 6px">偏位量（选中偏位球，µm）</h4>
                <label class="pin-note">X 偏位<input type="number" id="offX" class="cell" style="width:90px"></label>
                <label class="pin-note" style="margin-left:8px">Y 偏位<input type="number" id="offY" class="cell" style="width:90px"></label>
                <button class="btn sm" id="applyOffset" style="margin-left:8px">应用</button>
              </div>
            </div>

            <div class="panel tight">
              <div class="panel-title" style="margin-bottom:8px"><h4 style="margin:0">缺陷清单（${defects.length}）</h4>
                <span class="pin-note">三维中渲染为橙色</span></div>
              <div class="table-scroll" style="max-height:230px">
                <table>
                  <thead><tr><th>球位</th><th>类型</th><th>偏位</th><th>备注</th></tr></thead>
                  <tbody>
                    ${defects.map((b) => `<tr>
                      <td><b>${b.id}</b></td>
                      <td>${UI.defectBadge(b.defect)}</td>
                      <td class="num-cell">${b.defect === "offset" ? `${b.offsetX}, ${b.offsetY}` : "—"}</td>
                      <td class="wrap">${UI.esc(b.remark || "—")}</td>
                    </tr>`).join("") || '<tr><td colspan="4" class="empty-hint">暂无缺陷</td></tr>'}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="panel section-gap canvas-panel" style="height:440px">
          <div class="panel-title" style="position:absolute;top:10px;left:14px;z-index:2;margin:0">
            <h3 style="margin:0">WebGPU 三维球阵预览（异常球橙色高亮）</h3>
          </div>
          <canvas id="bgaGpuCanvas" class="gpu-canvas" style="height:440px"></canvas>
          <div class="canvas-hint">左键旋转 · 右键平移 · 滚轮缩放；橙色 = 缺球/偏位/连锡</div>
          <div id="bgaGpuFallback" class="canvas-banner" style="display:none">
            <b>当前浏览器不支持 WebGPU</b><span>三维球阵不可用，二维编辑与缺陷清单功能完整；请使用 Chrome/Edge 113+ 查看三维渲染。</span>
          </div>
        </div>`;

      /* ---------- 二维编辑器 ---------- */
      const canvas2d = root.querySelector("#bga2dCanvas");
      this._editor = new App.Bga2dEditor(canvas2d, {
        readOnly: locked,
        annotations: proj.annotations,
        tool: "missing",
        onMark: (ball, tool) => this._markWithDialog(ball, tool),
        onSelect: (ball) => {
          this._selected = ball;
          const off = root.querySelector("#offsetEditor");
          off.style.display = ball && ball.defect === "offset" ? "block" : "none";
          if (ball && ball.defect === "offset") {
            root.querySelector("#offX").value = ball.offsetX || 0;
            root.querySelector("#offY").value = ball.offsetY || 0;
          }
        },
      });
      this._editor.setProject(proj);

      root.querySelectorAll("[name=defTool]").forEach((r) => {
        r.addEventListener("change", () => this._editor.setTool(r.value));
      });
      root.querySelector("#applyOffset").onclick = () => {
        if (!this._selected) return;
        Store.markBall(this._selected.id, {
          defect: "offset",
          offsetX: +root.querySelector("#offX").value || 0,
          offsetY: +root.querySelector("#offY").value || 0,
        });
        UI.toast(`已更新 ${this._selected.id} 偏位量`, "success");
      };

      root.querySelector("#regenBtn").onclick = () => {
        const cols = +root.querySelector("#bgaCols").value;
        const rows = +root.querySelector("#bgaRows").value;
        const px = +root.querySelector("#bgaPitchX").value;
        const py = +root.querySelector("#bgaPitchY").value;
        if (!(cols > 0 && rows > 0 && px > 0 && py > 0)) return UI.toast("参数必须为正数", "error");
        UI.confirmDialog("重新生成球阵", `将按 ${cols}列 × ${rows}行、间距 ${px}/${py}µm 重新生成，现有标记会被清除，是否继续？`,
          () => { Store.regenerateBga(cols, rows, px, py); UI.toast("球阵已重新生成", "success"); }, "amber");
      };
      root.querySelector("#bgaDia").addEventListener("change", (e) => {
        if (+e.target.value > 0) Store.updateBgaConfig({ ballDiameter: +e.target.value });
      });
      root.querySelector('[data-act="export"]').onclick = () => App.Export.exportBgaDefects(proj);

      if (App.GpuRenderer.isSupported()) this._initGpu(root, proj);
      else root.querySelector("#bgaGpuFallback").style.display = "flex";
    },

    _markWithDialog(ball, tool) {
      if (tool === "offset") {
        UI.modal({
          title: `标记偏位 · ${ball.id}`,
          body: `
            <div class="form-row"><label>X 偏位 (µm)</label><input type="number" id="mOffX" value="${ball.offsetX || 0}"></div>
            <div class="form-row"><label>Y 偏位 (µm)</label><input type="number" id="mOffY" value="${ball.offsetY || 0}"></div>
            <div class="form-row"><label>备注</label><input type="text" id="mRemark" value="${UI.esc(ball.remark || "")}" placeholder="偏位原因…"></div>`,
          buttons: [
            { label: "取消", onClick: (c) => c() },
            { label: "确认标记", cls: "amber", onClick: (c, body) => {
              Store.markBall(ball.id, {
                defect: "offset",
                offsetX: +body.querySelector("#mOffX").value || 0,
                offsetY: +body.querySelector("#mOffY").value || 0,
                remark: body.querySelector("#mRemark").value,
              });
              c(); UI.toast(`${ball.id} 已标记偏位（橙色）`, "warn");
            } },
          ],
        });
      } else if (tool === "bridge") {
        UI.modal({
          title: `标记连锡 · ${ball.id}`,
          body: `<p class="muted" style="margin-top:0">将把 <b>${ball.id}</b> 与右侧相邻球 <b>R${ball.row}C${ball.col + 1}</b> 同时标记为连锡（如已存在则同步计入）。</p>
            <div class="form-row"><label>备注</label><input type="text" id="mRemark" value="${UI.esc(ball.remark || "")}" placeholder="连锡描述…"></div>`,
          buttons: [
            { label: "取消", onClick: (c) => c() },
            { label: "确认标记", cls: "amber", onClick: (c, body) => {
              const remark = body.querySelector("#mRemark").value;
              Store.markBall(ball.id, { defect: "bridge", remark: remark || ball.remark });
              const neighbor = Store.currentProject().bga.balls.find((x) => x.id === `R${ball.row}C${ball.col + 1}`);
              if (neighbor && neighbor.defect === "nominal") Store.markBall(neighbor.id, { defect: "bridge" });
              c(); UI.toast("连锡已标记（橙色）并计入缺陷清单", "warn");
            } },
          ],
        });
      } else {
        const label = Store.DEFECT_TYPES[tool];
        if (tool === "missing") {
          Store.markBall(ball.id, { defect: "missing", remark: ball.remark || "手动标记缺球" });
          UI.toast(`${ball.id} 已标记缺球（橙色）`, "warn");
        } else {
          Store.markBall(ball.id, { defect: "nominal" });
          UI.toast(`${ball.id} 已恢复正常`, "success");
        }
      }
    },

    /* ---------------- WebGPU 三维球阵 ---------------- */
    async _initGpu(root, proj) {
      const canvas = root.querySelector("#bgaGpuCanvas");
      const gpu = new App.GpuRenderer(canvas);
      this._gpu = gpu;
      try { await gpu.init(); } catch (e) {
        console.error(e);
        root.querySelector("#bgaGpuFallback").style.display = "flex";
        return;
      }
      this._buildScene(gpu, proj);
    },

    _buildScene(gpu, proj) {
      const bga = proj.bga;
      const spanX = (bga.cols - 1) * bga.pitchX;
      const spanY = (bga.rows - 1) * bga.pitchY;
      const r = bga.ballDiameter / 2;
      gpu.resetView(Math.max(spanX, spanY) * 1.25 + 800, [0, r, 0]);

      const sphereMesh = App.Geometry.sphere([0, 0, 0], r, [1, 1, 1, 1], 12, 16);
      const ringMesh = App.Geometry.torus([0, 0, 0], r * 0.85, r * 0.12, [1, 1, 1, 1]);
      const cylMesh = App.Geometry.cylinder([0, 0, 0], r * 0.28, r * 1.2, [1, 1, 1, 1], 14);
      const sphereItem = gpu.addInstanced(sphereMesh, bga.balls.length + 4);
      const ringItem = gpu.addInstanced(ringMesh, bga.balls.length + 4);
      const cylItem = gpu.addInstanced(cylMesh, bga.balls.length + 4);

      // 基板底座（薄盒，按球阵外扩）
      const baseW = spanX + bga.pitchX * 1.4;
      const baseD = spanY + bga.pitchY * 1.4;
      gpu.addSolid(App.Geometry.box([0, -r * 0.55, 0], [baseW, r * 0.5, baseD], [0.16, 0.24, 0.32]));

      const spheres = new Float32Array(bga.balls.length * 20);
      const rings = new Float32Array(bga.balls.length * 20);
      const cyls = new Float32Array(bga.balls.length * 20);
      let si = 0, ri = 0, ci = 0;
      const byId = new Map(bga.balls.map((b) => [b.id, b]));

      for (const ball of bga.balls) {
        const x = (ball.col - 1) * bga.pitchX - spanX / 2 + (ball.offsetX || 0);
        const z = (ball.row - 1) * bga.pitchY - spanY / 2 + (ball.offsetY || 0);
        const col = DEFECT_COLORS[ball.defect] || DEFECT_COLORS.nominal;
        if (ball.defect === "missing") {
          // 缺球：灰色圆环占位
          rings.set([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, 0, z, 1], ri * 20);
          rings.set([col[0], col[1], col[2], 0.9], ri * 20 + 16);
          ri++;
        } else {
          spheres.set([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, r, z, 1], si * 20);
          spheres.set([col[0], col[1], col[2], 1], si * 20 + 16);
          si++;
          if (ball.defect === "bridge") {
            const neighbor = byId.get(`R${ball.row}C${ball.col + 1}`);
            if (neighbor && neighbor.defect === "bridge") {
              const nx = (neighbor.col - 1) * bga.pitchX - spanX / 2 + (neighbor.offsetX || 0);
              cyls.set([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, (x + nx) / 2, r, z, 1], ci * 20);
              cyls.set([col[0], col[1], col[2], 1], ci * 20 + 16);
              ci++;
            }
          }
        }
      }
      gpu.setInstances(sphereItem, spheres, si);
      gpu.setInstances(ringItem, rings, ri);
      gpu.setInstances(cylItem, cyls, ci);
    },
  };

  function toolHint(t) {
    return { missing: "焊球缺失，显示占位环", offset: "焊球偏离名义位置", bridge: "相邻球连锡短路", nominal: "清除标记恢复正常" }[t];
  }
})(window);
