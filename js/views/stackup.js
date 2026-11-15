/* 视图：层叠设计 —— 层数/介质厚度/铜厚/材料代号录入，阻抗表与回填，三档校验与提交 */
(function (global) {
  const App = global.App || (global.App = {});
  const Store = App.Store;
  const UI = App.UI;

  const MATERIAL_OPTIONS = ["EM-285", "EM-350", "BT-EP", "PI-2611", "ABF-GX", "RCC-1080"];

  App.Views.stackup = {
    render(root) {
      const proj = Store.currentProject();
      const result = App.Validation.validateProject(proj);
      const locked = proj.locked;
      const total = result.total;
      const thinIds = new Set(result.checks[1].layers);
      const mismatchIds = new Set(result.checks[2].layers);

      root.innerHTML = `
        ${UI.lockedBanner(proj)}
        <div class="toolbar">
          <h2 style="margin:0">层叠设计 · ${UI.esc(proj.name)} <span class="badge gray">V${proj.version}</span></h2>
          <span class="spacer"></span>
          ${locked ? "" : `
            <button class="btn sm" data-act="add-layer">追加层</button>
            <button class="btn sm red" data-act="remove-layer">删除末层</button>`}
          <button class="btn sm" data-act="export">导出层叠表 CSV</button>
        </div>

        <div class="grid" style="grid-template-columns:minmax(0,1fr) 380px">
          <div>
            <div class="panel">
              <div class="panel-title"><h3>各层参数（厚度单位 µm，按真实厚度比例进入三维剖切）</h3>
                <span class="muted">总厚度 <b class="${total > proj.limitUm ? "err-text" : ""}">${total}µm</b> / 上限 ${proj.limitUm}µm</span></div>
              <div class="table-scroll">
                <table>
                  <thead><tr>
                    <th>层名</th><th>介质厚度(µm)</th><th>铜厚(µm)</th><th>材料代号</th><th>走线密度(%)</th><th>校验标记</th>${locked ? "" : "<th>操作</th>"}
                  </tr></thead>
                  <tbody>
                    ${proj.layers.map((l, i) => `
                      <tr>
                        <td><b>${UI.esc(l.name)}</b></td>
                        <td>
                          <input class="cell" type="number" min="1" data-layer="${l.id}" data-field="dielectricThickness"
                            value="${l.dielectricThickness}" ${locked ? "disabled" : ""}>
                          ${thinIds.has(l.id) ? '<div class="warn-text pin-note">⚠ &lt;25µm 风险</div>' : ""}
                        </td>
                        <td>
                          <input class="cell" type="number" min="1" data-layer="${l.id}" data-field="cuThickness"
                            value="${l.cuThickness}" ${locked ? "disabled" : ""}>
                          ${mismatchIds.has(l.id) ? '<div class="err-text pin-note">⛔ 阻抗表不一致</div>' : ""}
                        </td>
                        <td>
                          <select data-layer="${l.id}" data-field="material" ${locked ? "disabled" : ""}>
                            ${MATERIAL_OPTIONS.map((m) => `<option ${m === l.material ? "selected" : ""}>${m}</option>`).join("")}
                            ${MATERIAL_OPTIONS.includes(l.material) ? "" : `<option selected>${UI.esc(l.material)}</option>`}
                          </select>
                        </td>
                        <td>
                          <input type="range" min="0" max="100" value="${l.density}" data-layer="${l.id}" data-field="density"
                            ${locked ? "disabled" : ""}> <span class="muted mono">${l.density}%</span>
                        </td>
                        <td>
                          ${thinIds.has(l.id) ? '<span class="badge amber">介质风险</span>' : ""}
                          ${mismatchIds.has(l.id) ? '<span class="badge red">需回填</span>' : ""}
                          ${!thinIds.has(l.id) && !mismatchIds.has(l.id) ? '<span class="badge green">正常</span>' : ""}
                        </td>
                        ${locked ? "" : `<td><button class="btn sm" data-act="density3d" data-idx="${i}">剖切查看</button></td>`}
                      </tr>`).join("")}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="panel section-gap">
              <div class="panel-title">
                <h3>阻抗表（设计依据，单位 µm）</h3>
                ${mismatchIds.size ? '<button class="btn sm amber" data-act="backfill">按阻抗表一键回填铜厚</button>' : '<span class="badge green">铜厚已与阻抗表对齐</span>'}
              </div>
              <table>
                <thead><tr><th>层名</th><th>阻抗表要求铜厚(µm)</th><th>当前层铜厚(µm)</th><th>一致性</th></tr></thead>
                <tbody>
                  ${proj.impedance.map((r) => {
                    const layer = proj.layers.find((x) => x.name === r.layer);
                    const ok = layer && +layer.cuThickness === +r.cuThickness;
                    return `<tr>
                      <td><b>${UI.esc(r.layer)}</b></td>
                      <td><input class="cell" type="number" min="1" data-imp="${r.layer}" value="${r.cuThickness}" ${locked ? "disabled" : ""}></td>
                      <td>${layer ? layer.cuThickness : "—"}</td>
                      <td>${ok ? '<span class="badge green">一致</span>' : '<span class="badge red">不一致</span>'}</td>
                    </tr>`;
                  }).join("")}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div class="panel">
              <div class="panel-title"><h3>三档校验</h3>
                <span class="badge ${result.canSubmit ? "green" : "red"}">${result.canSubmit ? "可提交" : "拦截中"}</span></div>
              ${result.checks.map((c) => `
                <div class="check-row ${c.level}">
                  <span class="check-icon">${c.level === "pass" ? "✅" : c.level === "warn" ? "⚠️" : "⛔"}</span>
                  <div class="check-body">
                    <div class="check-title">${UI.esc(c.title)}</div>
                    <div class="check-desc">${UI.esc(c.desc)}</div>
                  </div>
                </div>`).join("")}
              <div style="margin-top:12px;display:flex;flex-direction:column;gap:8px">
                ${proj.status === "self-check" ? `
                  <button class="btn primary" data-act="submit" ${result.canSubmit ? "" : "disabled"}>
                    ${result.canSubmit ? "提交工艺评审" : `存在硬错误，不可提交（${result.errors.length} 项）`}
                  </button>
                  ${result.warnings.length ? '<div class="pin-note warn-text">⚠ 风险提示不拦截提交，请在评审单中说明工艺措施。</div>' : ""}`
                  : `<div class="check-row warn"><span class="check-icon">ℹ️</span><div class="check-body">
                      <div class="check-title">当前不在设计自检阶段</div>
                      <div class="check-desc">状态：${Store.STATUSES[proj.status].label}，请在「评审流程」页处理。</div></div></div>`}
              </div>
            </div>
            <div class="panel section-gap">
              <h3>厚度构成比例</h3>
              ${thicknessBars(proj)}
            </div>
          </div>
        </div>`;

      /* 事件绑定：input 静默更新（不丢焦点），change 时统一重渲染 */
      root.querySelectorAll("[data-layer]").forEach((el) => {
        const apply = () => {
          const field = el.dataset.field;
          const val = field === "material" ? el.value : +el.value;
          if (field !== "material" && !(val > 0)) return;
          Store.updateLayer(el.dataset.layer, { [field]: val });
        };
        el.addEventListener("input", () => Store.batch(apply));
        el.addEventListener("change", apply);
      });
      root.querySelectorAll("[data-imp]").forEach((el) => {
        const apply = () => { const v = +el.value; if (v > 0) Store.updateImpedance(el.dataset.imp, v); };
        el.addEventListener("input", () => Store.batch(apply));
        el.addEventListener("change", apply);
      });
      const act = (sel, fn) => { const b = root.querySelector(sel); if (b) b.onclick = fn; };
      act('[data-act="add-layer"]', () => {
        const n = proj.layers.length + 1;
        const layer = Store.makeLayer(n);
        proj.layers.push(layer);
        proj.impedance.push({ layer: layer.name, cuThickness: layer.cuThickness });
        Store.emit();
      });
      act('[data-act="remove-layer"]', () => {
        if (proj.layers.length <= 1) return UI.toast("至少保留一层", "warn");
        const removed = proj.layers.pop();
        const idx = proj.impedance.findIndex((r) => r.layer === removed.name);
        if (idx >= 0) proj.impedance.splice(idx, 1);
        Store.emit();
      });
      act('[data-act="backfill"]', () => { Store.backfillCuFromImpedance(); UI.toast("已按阻抗表回填各层铜厚", "success"); });
      act('[data-act="export"]', () => App.Export.exportStackup(proj));
      act('[data-act="submit"]', () => {
        UI.modal({
          title: "提交工艺评审",
          body: `<div class="form-row"><label>提交说明</label>
            <textarea id="submitNote" rows="4" placeholder="请补充设计说明，风险项（如介质<25µm）的工艺措施…"></textarea></div>`,
          buttons: [
            { label: "取消", onClick: (c) => c() },
            { label: "确认提交", cls: "primary", onClick: (c, body) => {
              Store.submitForReview(body.querySelector("#submitNote").value);
              c(); UI.toast("已提交工艺评审", "success");
            } },
          ],
        });
      });
      const d3 = root.querySelector('[data-act="density3d"]');
      if (d3) d3.onclick = () => {
        App._pendingCutIndex = +d3.dataset.idx;
        Store.setView("stackup3d");
      };
    },
  };

  function thicknessBars(proj) {
    const total = Store.totalThickness(proj);
    return proj.layers.map((l) => {
      const dPct = (+l.dielectricThickness / total * 100).toFixed(1);
      const cPct = (+l.cuThickness / total * 100).toFixed(1);
      const col = Store.materialColor(l.material);
      const rgb = `rgb(${Math.round(col[0] * 255)},${Math.round(col[1] * 255)},${Math.round(col[2] * 255)})`;
      return `<div style="margin-bottom:10px">
        <div class="pin-note" style="margin-bottom:3px"><b>${UI.esc(l.name)}</b> · ${UI.esc(l.material)} · 介质 ${l.dielectricThickness} + 铜 ${l.cuThickness} µm</div>
        <div style="display:flex;height:14px;border-radius:4px;overflow:hidden">
          <div style="width:${dPct}%;background:${rgb}" title="介质 ${dPct}%"></div>
          <div style="width:${cPct}%;background:#c87f4a" title="铜 ${cPct}%"></div>
        </div>
      </div>`;
    }).join("");
  }
})(window);
