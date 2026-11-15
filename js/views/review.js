/* 视图：评审流程 —— 设计自检/工艺评审/客户确认三状态，退回必须选原因分类并留时间，通过后锁定与变更单 */
(function (global) {
  const App = global.App || (global.App = {});
  const Store = App.Store;
  const UI = App.UI;

  const FLOW = ["self-check", "process-review", "customer-confirm", "confirmed"];

  App.Views.review = {
    render(root) {
      const proj = Store.currentProject();
      const result = App.Validation.validateProject(proj);
      const role = Store.state.role;

      root.innerHTML = `
        <div class="toolbar">
          <h2 style="margin:0">评审流程 · ${UI.esc(proj.name)}</h2>
          <span class="spacer"></span>
          <span class="badge gray">版本 V${proj.version}</span>
          ${UI.statusBadge(proj.status)}
        </div>

        <div class="panel">
          <div style="display:flex;align-items:center;gap:0;overflow-x:auto;padding:6px 0">
            ${FLOW.map((s, i) => {
              const curIdx = FLOW.indexOf(proj.status);
              const stateCls = i < curIdx ? "done" : i === curIdx ? "current" : "todo";
              return `
                <div style="display:flex;align-items:center;flex:1;min-width:150px">
                  <div style="text-align:center;flex:1">
                    <div class="flow-dot ${stateCls}">${i < curIdx ? "✓" : i + 1}</div>
                    <div style="margin-top:6px;font-size:12px;font-weight:600">${Store.STATUSES[s].label}</div>
                    <div class="pin-note">${stateText(s, proj)}</div>
                  </div>
                  ${i < FLOW.length - 1 ? `<div class="flow-line ${i < curIdx ? "done" : ""}"></div>` : ""}
                </div>`;
            }).join("")}
          </div>
        </div>

        <div class="grid cols-2 section-gap">
          <div class="panel">
            <h3>可执行操作（按当前角色与状态授权）</h3>
            <div id="actionArea"></div>
          </div>
          <div class="panel">
            <h3>变更单记录</h3>
            ${proj.changeOrders.length ? proj.changeOrders.map((co) => `
              <div class="anno-card">
                <div class="anno-head"><b>${UI.esc(co.no)}</b><span>${Store.fmtTime(co.at)}</span></div>
                <div>原因分类：<b>${UI.esc(co.reason)}</b> · V${co.fromVersion} → V${co.fromVersion + 1}</div>
                <div class="muted" style="margin-top:3px">${UI.esc(co.note || "—")}</div>
              </div>`).join("") : '<div class="empty-hint">暂无变更单。层叠锁定后如需修改，必须在此发起变更单重新开一轮评审。</div>'}
            ${proj.locked && role === "designer" ? `<button class="btn amber" id="coBtn" style="width:100%;margin-top:10px">发起变更单（解锁并升版本）</button>` : ""}
          </div>
        </div>

        <div class="panel section-gap">
          <h3>评审单时间线（退回原因分类与时间完整留存）</h3>
          <div class="timeline" style="margin-top:12px">
            ${[...proj.reviewLogs].reverse().map((l) => `
              <div class="tl-item ${l.action === "reject" ? "reject" : l.action === "confirm" ? "confirm" : ""}">
                <div class="tl-time">${Store.fmtTime(l.at)}（${Store.fmtTime(l.at).slice(11)}） · ${UI.esc(l.actor)} · 角色：${App.roleName(l.role)}</div>
                <div class="tl-action">${actionLabel(l.action)}
                  ${l.fromStatus ? `<span class="pin-note">${Store.STATUSES[l.fromStatus]?.label || l.fromStatus} → ${Store.STATUSES[l.toStatus]?.label || l.toStatus}</span>` : ""}
                </div>
                ${l.reason ? `<div class="warn-text" style="font-size:12px">退回原因分类：${UI.esc(l.reason)}</div>` : ""}
                <div class="tl-meta">${UI.esc(l.note || "")}</div>
              </div>`).join("")}
          </div>
        </div>

        <style>
          .flow-dot { width:38px;height:38px;border-radius:50%;margin:0 auto;display:flex;align-items:center;justify-content:center;font-weight:700;border:2px solid var(--line);color:var(--fg-mute);background:var(--bg-3); }
          .flow-dot.done { background:#104436;border-color:#176b53;color:var(--green); }
          .flow-dot.current { background:var(--accent-dim);border-color:var(--accent);color:var(--accent);box-shadow:0 0 0 4px rgba(56,189,248,.12); }
          .flow-line { flex:0 0 40px;height:2px;background:var(--line);margin:0 4px; }
          .flow-line.done { background:#176b53; }
        </style>`;

      this._renderActions(root.querySelector("#actionArea"), proj, role, result);
      const coBtn = root.querySelector("#coBtn");
      if (coBtn) coBtn.onclick = () => this._changeOrderDialog();
    },

    _renderActions(area, proj, role, result) {
      const btn = (id, label, cls, disabled, hint) => `
        <div style="margin-bottom:10px">
          <button class="btn ${cls}" id="${id}" style="width:100%;text-align:left" ${disabled ? "disabled" : ""}>${label}</button>
          ${hint ? `<div class="pin-note" style="margin-top:4px">${hint}</div>` : ""}
        </div>`;
      let html = "";

      if (proj.status === "self-check") {
        if (role === "designer") {
          html += btn("actSubmit", "① 提交工艺评审（设计自检 → 工艺评审）", "primary",
            !result.canSubmit,
            result.canSubmit
              ? (result.warnings.length ? "存在介质厚度风险提示，不拦截，但需在评审中说明工艺措施。" : "三档校验通过，可提交。")
              : `存在 ${result.errors.length} 项硬错误（总厚超限/铜厚阻抗不一致），提交已被系统拦下。`);
        } else {
          html += emptyAction("等待设计员提交。设计自检阶段仅设计员可提交。");
        }
      } else if (proj.status === "process-review") {
        if (role === "process") {
          html += btn("actApprove", "② 工艺评审通过（→ 客户确认，通过后层叠锁定）", "green", false,
            "通过后层叠与球阵参数立即锁定，任何修改须走变更单。");
          html += btn("actReject", "退回设计自检（必须选择原因分类）", "red", false,
            "退回动作会记录原因分类、操作人与精确时间。");
        } else if (role === "designer") {
          html += emptyAction("工艺工程师评审中，可在时间线查看进展；被退回后回到本角色修改。");
        } else {
          html += emptyAction("客户在工艺评审通过后方可确认。");
        }
      } else if (proj.status === "customer-confirm") {
        if (role === "customer") {
          html += btn("actConfirm", "③ 客户确认（→ 已确认，归档为确认版本）", "green", false,
            "确认后生成版本快照，客户门户仅展示已确认版本。");
          html += btn("actReject", "退回设计自检（必须选择原因分类）", "red", false, "客户退回同样解锁层叠并完整留痕。");
        } else if (role === "process") {
          html += btn("actReject", "工艺侧退回设计自检", "red", false, "工艺工程师仍可在客户确认阶段退回。");
        } else {
          html += emptyAction("等待客户确认。如需修改，请客户退回或由设计员发起变更单。");
        }
      } else {
        html += `<div class="check-row pass"><span class="check-icon">✅</span><div class="check-body">
          <div class="check-title">版本已确认并锁定</div>
          <div class="check-desc">客户确认版本 V${proj.version} 已归档；后续修改只能通过变更单升版重新评审。</div></div></div>`;
        if (role === "designer") html += btn("coInline", "发起变更单", "amber", false, "版本号 +1，状态回到设计自检，重新走完整三状态流程。");
      }

      area.innerHTML = html;
      const bind = (id, fn) => { const b = area.querySelector("#" + id); if (b) b.onclick = fn; };
      bind("actSubmit", () => Store.setView("stackup"));
      bind("actApprove", () => this._approveDialog());
      bind("actReject", () => this._rejectDialog());
      bind("actConfirm", () => this._confirmDialog());
      bind("coInline", () => this._changeOrderDialog());
    },

    _rejectDialog() {
      const proj = Store.currentProject();
      UI.modal({
        title: "退回设计自检 · 选择原因分类",
        body: `
          <div class="form-row"><label>原因分类 *</label>
            <select id="rjReason">${Store.REJECT_REASONS.map((r) => `<option>${r}</option>`).join("")}</select></div>
          <div class="form-row"><label>退回说明</label>
            <textarea id="rjNote" rows="4" placeholder="请填写具体问题与整改要求…"></textarea></div>
          <div class="form-hint">退回时间将由系统自动记录（精确到分钟），写入评审单时间线，不可删除。</div>`,
        buttons: [
          { label: "取消", onClick: (c) => c() },
          { label: "确认退回", cls: "red", onClick: (c, body) => {
            const reason = body.querySelector("#rjReason").value;
            const note = body.querySelector("#rjNote").value.trim();
            if (!note) return UI.toast("请填写退回说明", "error");
            Store.reject(reason, note);
            c(); UI.toast("已退回设计自检，原因与时间已留存", "warn");
          } },
        ],
      });
    },

    _approveDialog() {
      UI.modal({
        title: "工艺评审通过",
        body: `<div class="form-row"><label>评审意见</label>
          <textarea id="apNote" rows="4" placeholder="工艺措施确认、可制造性结论…"></textarea></div>
          <div class="form-hint">通过后层叠立即锁定，进入客户确认；锁定后的修改只能走变更单。</div>`,
        buttons: [
          { label: "取消", onClick: (c) => c() },
          { label: "确认通过并锁定", cls: "green", onClick: (c, body) => {
            Store.processApprove(body.querySelector("#apNote").value);
            c(); UI.toast("工艺评审通过，层叠已锁定", "success");
          } },
        ],
      });
    },

    _confirmDialog() {
      const proj = Store.currentProject();
      UI.modal({
        title: "客户确认",
        body: `<p class="muted" style="margin-top:0">确认对象：<b>${UI.esc(proj.name)}</b> 版本 V${proj.version}，确认后归档为客户可见的确认版本。</p>
          <div class="form-row"><label>确认意见</label><textarea id="cfNote" rows="4" placeholder="可填写确认结论…"></textarea></div>`,
        buttons: [
          { label: "取消", onClick: (c) => c() },
          { label: "确认版本", cls: "green", onClick: (c, body) => {
            Store.customerConfirm(body.querySelector("#cfNote").value);
            c(); UI.toast("版本已确认归档", "success");
          } },
        ],
      });
    },

    _changeOrderDialog() {
      UI.modal({
        title: "发起变更单（锁定层叠修改前置流程）",
        body: `
          <div class="form-row"><label>变更原因分类 *</label>
            <select id="coReason">${Store.REJECT_REASONS.map((r) => `<option>${r}</option>`).join("")}</select></div>
          <div class="form-row"><label>变更内容说明 *</label>
            <textarea id="coNote" rows="4" placeholder="说明需修改的层/参数及变更依据…"></textarea></div>
          <div class="form-hint">变更单通过后版本号 +1，状态回到设计自检，层叠解锁并重新走完整三状态评审；原确认版本快照保留。</div>`,
        buttons: [
          { label: "取消", onClick: (c) => c() },
          { label: "提交变更单并解锁", cls: "amber", onClick: (c, body) => {
            const note = body.querySelector("#coNote").value.trim();
            if (!note) return UI.toast("请填写变更内容说明", "error");
            Store.createChangeOrder(body.querySelector("#coReason").value, note);
            c(); UI.toast("变更单已生效，版本号 +1，层叠已解锁", "warn");
          } },
        ],
      });
    },
  };

  function emptyAction(text) {
    return `<div class="check-row warn"><span class="check-icon">ℹ️</span><div class="check-body"><div class="check-desc">${text}</div></div></div>`;
  }
  function stateText(s, proj) {
    const idx = FLOW.indexOf(proj.status);
    const my = FLOW.indexOf(s);
    if (my < idx) return "已完成";
    if (my === idx) return "进行中";
    return "待处理";
  }
  function actionLabel(a) {
    return {
      create: "创建项目", submit: "提交工艺评审", approve: "工艺评审通过",
      reject: "退回设计自检", confirm: "客户确认归档", "change-order": "发起变更单",
    }[a] || a;
  }
})(window);
