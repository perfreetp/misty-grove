/* 视图：客户门户 —— 客户只能查看「已确认」版本，全部数据只读，可在线批注（文字 + 球位挂接） */
(function (global) {
  const App = global.App || (global.App = {});
  const Store = App.Store;
  const UI = App.UI;

  App.Views.customer = {
    _editor: null,

    render(root) {
      const confirmed = Store.state.projects.filter((p) => p.status === "confirmed");
      if (!confirmed.length) {
        root.innerHTML = `<div class="empty-hint" style="padding:80px 20px">
          <div style="font-size:40px;margin-bottom:12px">🔒</div>
          <h3>暂无已确认版本</h3>
          <p>客户门户仅展示通过完整评审（设计自检 → 工艺评审 → 客户确认）的已确认版本。<br>
          当前还没有项目完成确认，请等待设计与工艺侧完成流程。</p></div>`;
        return;
      }

      const proj = confirmed.find((p) => p.id === Store.state.currentProjectId) || confirmed[0];
      if (Store.currentProject()?.id !== proj.id) Store.state.currentProjectId = proj.id;
      const total = Store.totalThickness(proj);
      const defects = Store.defectBalls(proj);
      const openAnnos = proj.annotations.filter((a) => !a.resolved);

      root.innerHTML = `
        <div class="toolbar">
          <h2 style="margin:0">客户门户 · ${UI.esc(proj.name)}</h2>
          <span class="spacer"></span>
          ${UI.statusBadge("confirmed")}
          <span class="badge gray">确认版本 V${proj.version}</span>
        </div>
        <div class="locked-banner" style="background:rgba(52,211,153,.07);border-color:#176b53;color:#b8f5dd">
          <span style="font-size:18px">✅</span>
          <div>您正在查看<b>已确认归档版本</b>（只读）。层叠、球阵与校验数据均不可修改；可在下方发表在线批注，设计侧会在后续变更中处理。</div>
        </div>

        <div class="grid cols-4">
          <div class="panel kpi"><span class="lbl">确认总厚度</span><span class="num">${total}<small> µm</small></span><span class="sub">上限 ${proj.limitUm}µm</span></div>
          <div class="panel kpi"><span class="lbl">基板层数</span><span class="num">${proj.layers.length}<small> 层</small></span><span class="sub">版本 V${proj.version}</span></div>
          <div class="panel kpi"><span class="lbl">焊球总数</span><span class="num">${proj.bga.balls.length}</span><span class="sub">归档时缺陷 ${defects.length} 颗</span></div>
          <div class="panel kpi"><span class="lbl">未处理批注</span><span class="num ${openAnnos.length ? "warn-text" : "ok-text"}">${openAnnos.length}</span><span class="sub">共 ${proj.annotations.length} 条批注</span></div>
        </div>

        <div class="grid cols-2 section-gap">
          <div class="panel">
            <h3>确认版层叠表（只读）</h3>
            <div class="table-scroll" style="max-height:340px">
              <table>
                <thead><tr><th>层名</th><th class="num-cell">介质(µm)</th><th class="num-cell">铜厚(µm)</th><th>材料</th><th class="num-cell">密度</th></tr></thead>
                <tbody>
                  ${proj.layers.map((l) => `<tr>
                    <td><b>${UI.esc(l.name)}</b></td>
                    <td class="num-cell">${l.dielectricThickness}</td>
                    <td class="num-cell">${l.cuThickness}</td>
                    <td>${UI.esc(l.material)}</td>
                    <td class="num-cell">${l.density}%</td>
                  </tr>`).join("")}
                </tbody>
              </table>
            </div>
          </div>
          <div class="panel">
            <h3>在线批注</h3>
            <div style="max-height:250px;overflow-y:auto;margin-bottom:12px">
              ${proj.annotations.length ? proj.annotations.map((a) => `
                <div class="anno-card" style="opacity:${a.resolved ? 0.55 : 1}">
                  <div class="anno-head">
                    <span>${UI.esc(a.author)} · ${Store.fmtTime(a.at)}${a.anchor?.ballId ? ` · 挂接 ${a.anchor.ballId}` : ""}</span>
                    ${a.resolved ? '<span class="badge green">已处理</span>' : ""}
                  </div>
                  <div>${UI.esc(a.text)}</div>
                </div>`).join("") : '<div class="empty-hint">暂无批注</div>'}
            </div>
            <textarea id="annoText" rows="3" style="width:100%" placeholder="输入批注内容，例如：对 L3 介质选型有疑义、某球位外观确认…"></textarea>
            <div style="display:flex;gap:8px;margin-top:8px">
              <button class="btn primary sm" id="annoAdd" style="flex:1">发表批注（全局）</button>
            </div>
            <div class="pin-note" style="margin-top:6px">也可以点击左侧球阵中的焊球，发表挂接到具体球位的批注。</div>
          </div>
        </div>

        <div class="panel section-gap tight">
          <div class="panel-title" style="padding:6px 6px 8px">
            <h3 style="margin:0">确认版球阵（点击焊球可挂接批注）</h3>
            <span class="pin-note">紫色编号为已挂接批注的球位</span>
          </div>
          <canvas id="custBgaCanvas" style="width:100%;height:520px;background:#0a1018;border-radius:6px"></canvas>
        </div>`;

      const canvas = root.querySelector("#custBgaCanvas");
      this._editor = new App.Bga2dEditor(canvas, {
        readOnly: true,
        annotations: proj.annotations,
        onSelect: () => {},
        onBallClick: (ball) => this._annotationDialog(ball),
      });
      this._editor.setProject(proj);

      root.querySelector("#annoAdd").onclick = () => {
        const ta = root.querySelector("#annoText");
        const text = ta.value.trim();
        if (!text) return UI.toast("请输入批注内容", "error");
        Store.addAnnotation(text, null);
        UI.toast("批注已发表", "success");
      };
    },

    _annotationDialog(ball) {
      UI.modal({
        title: `球位批注 · ${ball.id}（${Store.DEFECT_TYPES[ball.defect]}）`,
        body: `
          <div class="form-hint" style="margin-bottom:8px">该批注将挂接到球位 <b>${ball.id}</b>，并在球阵图上以紫色编号显示。</div>
          <textarea id="ballAnnoText" rows="4" style="width:100%" placeholder="请输入针对该球位的批注…"></textarea>`,
        buttons: [
          { label: "取消", onClick: (c) => c() },
          { label: "发表批注", cls: "primary", onClick: (c, body) => {
            const text = body.querySelector("#ballAnnoText").value.trim();
            if (!text) return UI.toast("请输入批注内容", "error");
            Store.addAnnotation(text, { kind: "bga", ballId: ball.id });
            c(); UI.toast(`批注已挂接到 ${ball.id}`, "success");
          } },
        ],
      });
    },
  };
})(window);
