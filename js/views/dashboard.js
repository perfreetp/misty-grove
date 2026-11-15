/* 视图：项目总览（KPI、三档校验摘要、球阵缺陷摘要、评审动态、快捷操作） */
(function (global) {
  const App = global.App || (global.App = {});
  const Store = App.Store;
  const UI = App.UI;

  App.Views = App.Views || {};
  App.Views.dashboard = {
    render(root) {
      const proj = Store.currentProject();
      const result = App.Validation.validateProject(proj);
      const defects = Store.defectBalls(proj);
      const counts = { missing: 0, offset: 0, bridge: 0 };
      for (const b of defects) counts[b.defect] = (counts[b.defect] || 0) + 1;
      const total = Store.totalThickness(proj);
      const logs = [...proj.reviewLogs].reverse().slice(0, 5);

      root.innerHTML = `
        <div class="toolbar">
          <h2 style="margin:0">${UI.esc(proj.name)} <span style="margin-left:8px">${UI.statusBadge(proj.status)}</span>
            <span class="badge gray" style="margin-left:6px">V${proj.version}</span></h2>
          <span class="spacer"></span>
          <button class="btn sm" data-act="export-stack">导出层叠表</button>
          <button class="btn sm" data-act="export-bga">导出球阵缺陷明细</button>
        </div>

        <div class="grid cols-4">
          <div class="panel kpi">
            <span class="lbl">层叠总厚度</span>
            <span class="num ${total > proj.limitUm ? "err-text" : ""}">${total}<small> µm</small></span>
            <span class="sub">上限 ${proj.limitUm}µm（${(proj.limitUm / 1000).toFixed(2)}mm）· 占比 ${(total / proj.limitUm * 100).toFixed(1)}%</span>
          </div>
          <div class="panel kpi">
            <span class="lbl">基板层数</span>
            <span class="num">${proj.layers.length}<small> 层</small></span>
            <span class="sub">铜层 ${proj.layers.length} 层 · 介质 ${proj.layers.length} 层</span>
          </div>
          <div class="panel kpi">
            <span class="lbl">BGA 焊球 / 缺陷</span>
            <span class="num">${proj.bga.balls.length}<small> / </small><span class="${defects.length ? "orange-text" : "ok-text"}">${defects.length}</span></span>
            <span class="sub">缺球 ${counts.missing || 0} · 偏位 ${counts.offset || 0} · 连锡 ${counts.bridge || 0}</span>
          </div>
          <div class="panel kpi">
            <span class="lbl">校验状态</span>
            <span class="num ${result.errors.length ? "err-text" : result.warnings.length ? "warn-text" : "ok-text"}">
              ${result.errors.length ? "拦截" : result.warnings.length ? "风险" : "通过"}</span>
            <span class="sub">硬错误 ${result.errors.length} · 风险提示 ${result.warnings.length}</span>
          </div>
        </div>

        <div class="grid cols-2 section-gap">
          <div class="panel">
            <div class="panel-title"><h3>三档校验摘要</h3><button class="btn sm" data-go="stackup">前往层叠设计</button></div>
            ${result.checks.map((c) => `
              <div class="check-row ${c.level}">
                <span class="check-icon">${c.level === "pass" ? "✅" : c.level === "warn" ? "⚠️" : "⛔"}</span>
                <div class="check-body">
                  <div class="check-title">${UI.esc(c.title)}</div>
                  <div class="check-desc">${UI.esc(c.desc)}</div>
                </div>
              </div>`).join("")}
          </div>
          <div class="panel">
            <div class="panel-title"><h3>球阵缺陷分布</h3><button class="btn sm" data-go="bga">前往球阵编辑</button></div>
            <div class="bar-row"><span class="bar-label">缺球</span>
              <div class="bar-track"><div class="bar-fill" style="width:${(counts.missing || 0) / Math.max(1, proj.bga.balls.length) * 100}%;background:linear-gradient(90deg,#5a6a7d,#8a98a8)"></div></div>
              <span class="bar-val">${counts.missing || 0} 颗</span></div>
            <div class="bar-row"><span class="bar-label">偏位</span>
              <div class="bar-track"><div class="bar-fill" style="width:${(counts.offset || 0) / Math.max(1, proj.bga.balls.length) * 100}%;background:linear-gradient(90deg,#8a6110,#f59e0b)"></div></div>
              <span class="bar-val">${counts.offset || 0} 颗</span></div>
            <div class="bar-row"><span class="bar-label">连锡</span>
              <div class="bar-track"><div class="bar-fill" style="width:${(counts.bridge || 0) / Math.max(1, proj.bga.balls.length) * 100}%;background:linear-gradient(90deg,#7a3a12,#fb7c32)"></div></div>
              <span class="bar-val">${counts.bridge || 0} 颗</span></div>
            <p class="muted" style="margin-top:14px">异常球在 WebGPU 三维球阵中统一渲染为<b class="orange-text">橙色</b>，并自动计入缺陷清单与导出明细。</p>
          </div>
        </div>

        <div class="panel section-gap">
          <div class="panel-title"><h3>评审动态（最近 5 条）</h3><button class="btn sm" data-go="review">完整流程</button></div>
          <div class="timeline">
            ${logs.map((l) => `
              <div class="tl-item ${l.action === "reject" ? "reject" : l.action === "confirm" ? "confirm" : ""}">
                <div class="tl-time">${Store.fmtTime(l.at)} · ${UI.esc(l.actor)}</div>
                <div class="tl-action">${actionLabel(l.action)}${l.reason ? ` · 原因：${UI.esc(l.reason)}` : ""}</div>
                <div class="tl-meta">${UI.esc(l.note || "")}</div>
              </div>`).join("") || '<div class="empty-hint">暂无评审记录</div>'}
          </div>
        </div>`;

      root.querySelector('[data-act="export-stack"]').onclick = () => App.Export.exportStackup(proj);
      root.querySelector('[data-act="export-bga"]').onclick = () => App.Export.exportBgaDefects(proj);
      root.querySelectorAll("[data-go]").forEach((b) => (b.onclick = () => Store.setView(b.dataset.go)));
    },
  };

  function actionLabel(a) {
    return {
      create: "创建项目", submit: "提交工艺评审", approve: "工艺评审通过",
      reject: "退回设计自检", confirm: "客户确认", "change-order": "发起变更单",
    }[a] || a;
  }
})(window);
