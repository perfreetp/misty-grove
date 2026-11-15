/* 视图：材料统计 —— 按材料代号汇总介质用量（µm）与层数分布，支持全平台跨项目汇总 */
(function (global) {
  const App = global.App || (global.App = {});
  const Store = App.Store;
  const UI = App.UI;

  function summarize(projects) {
    const map = new Map();
    for (const proj of projects) {
      for (const layer of proj.layers) {
        const key = layer.material || "未指定";
        if (!map.has(key)) map.set(key, { code: key, layers: 0, dielectricUm: 0, cuUm: 0, projects: new Set(), details: [] });
        const row = map.get(key);
        row.layers += 1;
        row.dielectricUm += +layer.dielectricThickness || 0;
        row.cuUm += +layer.cuThickness || 0;
        row.projects.add(proj.name);
        row.details.push({ project: proj.name, layer: layer.name, d: +layer.dielectricThickness, c: +layer.cuThickness, density: layer.density });
      }
    }
    return [...map.values()].sort((a, b) => b.dielectricUm - a.dielectricUm);
  }

  App.Views.materials = {
    render(root) {
      const proj = Store.currentProject();
      const currentRows = summarize([proj]);
      const allRows = summarize(Store.state.projects);
      const maxUm = Math.max(1, ...currentRows.map((r) => r.dielectricUm));
      const totalD = currentRows.reduce((s, r) => s + r.dielectricUm, 0);

      root.innerHTML = `
        <div class="toolbar">
          <h2 style="margin:0">材料用量统计</h2>
          <span class="spacer"></span>
          <button class="btn sm" data-act="export-all">导出全平台材料汇总 CSV</button>
        </div>

        <div class="panel">
          <div class="panel-title"><h3>当前项目 · ${UI.esc(proj.name)}（V${proj.version}）按材料代号汇总</h3>
            <span class="muted">介质总用量 ${totalD}µm · ${proj.layers.length} 层</span></div>
          ${currentRows.map((r) => {
            const col = Store.materialColor(r.code);
            const rgb = `rgb(${col.map((v) => Math.round(v * 255)).join(",")})`;
            return `
            <div class="bar-row">
              <span class="bar-label mono"><span class="legend-dot" style="background:${rgb}"></span>${UI.esc(r.code)}</span>
              <div class="bar-track"><div class="bar-fill" style="width:${(r.dielectricUm / maxUm * 100).toFixed(1)}%;background:${rgb}"></div></div>
              <span class="bar-val">${r.layers} 层 · ${r.dielectricUm}µm</span>
            </div>`;
          }).join("")}
        </div>

        <div class="grid cols-2 section-gap">
          <div class="panel">
            <h3>层数分布明细（当前项目）</h3>
            <div class="table-scroll">
              <table>
                <thead><tr><th>材料代号</th><th>分布层</th><th class="num-cell">层数</th><th class="num-cell">介质用量(µm)</th><th class="num-cell">附铜总量(µm)</th></tr></thead>
                <tbody>
                  ${currentRows.map((r) => `
                    <tr>
                      <td><b>${UI.esc(r.code)}</b></td>
                      <td class="wrap">${r.details.map((d) => d.layer).join("、")}</td>
                      <td class="num-cell">${r.layers}</td>
                      <td class="num-cell">${r.dielectricUm}</td>
                      <td class="num-cell">${r.cuUm}</td>
                    </tr>`).join("")}
                </tbody>
              </table>
            </div>
          </div>
          <div class="panel">
            <h3>全平台跨项目汇总（${Store.state.projects.length} 个项目）</h3>
            <div class="table-scroll">
              <table>
                <thead><tr><th>材料代号</th><th class="num-cell">涉及项目</th><th class="num-cell">总层数</th><th class="num-cell">介质总用量(µm)</th></tr></thead>
                <tbody>
                  ${allRows.map((r) => `
                    <tr>
                      <td><b>${UI.esc(r.code)}</b></td>
                      <td class="num-cell">${r.projects.size}</td>
                      <td class="num-cell">${r.layers}</td>
                      <td class="num-cell">${r.dielectricUm}</td>
                    </tr>`).join("")}
                </tbody>
              </table>
            </div>
            <p class="pin-note" style="margin-top:10px">用量按介质厚度累加；同一代号在多个项目、多个层中重复出现时分别计入。</p>
          </div>
        </div>`;

      root.querySelector('[data-act="export-all"]').onclick = () => {
        const rows = [["材料代号", "涉及项目数", "总层数", "介质总用量(um)", "附铜总量(um)", "分布明细"]];
        for (const r of allRows) {
          rows.push([r.code, r.projects.size, r.layers, r.dielectricUm, r.cuUm,
            r.details.map((d) => `${d.project}/${d.layer}`).join(" | ")]);
        }
        App.Export.downloadCsv("全平台材料用量汇总.csv", rows);
      };
    },
  };
})(window);
