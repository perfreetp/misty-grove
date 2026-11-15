/* 应用入口：外壳渲染、导航与角色权限、项目切换、新建封装项目向导、视图路由 */
(function (global) {
  const App = global.App;
  const Store = App.Store;
  const UI = App.UI;

  const NAV = [
    { group: "评审工作台" },
    { id: "dashboard",  icon: "▦", label: "项目总览", roles: ["designer", "process", "customer"] },
    { id: "stackup",    icon: "☰", label: "层叠设计", roles: ["designer", "process"] },
    { id: "stackup3d",  icon: "◈", label: "三维层叠剖切", roles: ["designer", "process"] },
    { id: "bga",        icon: "◉", label: "BGA 球阵编辑", roles: ["designer", "process"] },
    { id: "review",     icon: "✎", label: "评审流程", roles: ["designer", "process", "customer"] },
    { id: "materials",  icon: "▤", label: "材料用量统计", roles: ["designer", "process"] },
    { group: "客户专区" },
    { id: "customer",   icon: "♛", label: "客户门户（已确认版本）", roles: ["customer"] },
  ];

  let lastRenderKey = "";

  function navItems() {
    const role = Store.state.role;
    return NAV.filter((n) => n.group || n.roles.includes(role));
  }

  function renderShell() {
    /* 项目下拉 */
    const sel = document.getElementById("projectSelect");
    const role = Store.state.role;
    const projects = role === "customer"
      ? Store.state.projects.filter((p) => p.status === "confirmed")
      : Store.state.projects;
    const currentId = Store.state.currentProjectId;
    if (role === "customer" && projects.length && !projects.some((p) => p.id === currentId)) {
      Store.state.currentProjectId = projects[0].id;
    }
    sel.innerHTML = projects.map((p) =>
      `<option value="${p.id}" ${p.id === Store.state.currentProjectId ? "selected" : ""}>
        ${UI.esc(p.name)} · V${p.version} · ${Store.STATUSES[p.status].label}</option>`).join("")
      || '<option value="">（无可见项目）</option>';
    sel.disabled = role === "customer";

    document.getElementById("roleSelect").value = role;

    /* 侧栏 */
    const sidebar = document.getElementById("sidebar");
    sidebar.innerHTML = navItems().map((n) => n.group
      ? `<div class="nav-group-label">${n.group}</div>`
      : `<div class="nav-item ${Store.state.currentView === n.id ? "active" : ""}" data-view="${n.id}">
           <span class="nav-icon">${n.icon}</span><span>${n.label}</span></div>`).join("");
    sidebar.querySelectorAll("[data-view]").forEach((el) => {
      el.onclick = () => Store.setView(el.dataset.view);
    });
  }

  function renderView() {
    const root = document.getElementById("mainView");
    const role = Store.state.role;
    let view = Store.state.currentView;

    /* 权限路由：客户只能在 customer 视图；工艺/设计不能进 customer */
    if (role === "customer" && view !== "customer" && view !== "review" && view !== "dashboard") {
      view = "customer";
    }
    if (role !== "customer" && view === "customer") view = "dashboard";
    Store.state.currentView = view;

    const key = `${Store.state.currentProjectId}|${view}|${Store.state.role}|${signature(Store.currentProject())}`;
    if (key === lastRenderKey) return;
    lastRenderKey = key;

    disposeViewResources();
    const v = App.Views[view];
    if (!v) { root.innerHTML = '<div class="empty-hint">视图不存在</div>'; return; }
    v.render(root);
  }

  /* 参与重渲染判定的数据签名：层叠/BGA/评审/批注/状态/版本 */
  function signature(proj) {
    if (!proj) return "none";
    return JSON.stringify({
      s: proj.status, v: proj.version, l: proj.locked,
      layers: proj.layers, imp: proj.impedance,
      bga: { c: proj.bga.cols, r: proj.bga.rows, px: proj.bga.pitchX, py: proj.bga.pitchY, d: proj.bga.ballDiameter, balls: proj.bga.balls },
      logs: proj.reviewLogs.length, co: proj.changeOrders.length, ann: proj.annotations,
    });
  }

  let view3d = null;
  function disposeViewResources() {
    if (App.Views.stackup3d._renderer) { App.Views.stackup3d._renderer.dispose(); App.Views.stackup3d._renderer = null; App.Views.stackup3d._ctx = null; }
    if (App.Views.bga._gpu) { App.Views.bga._gpu.dispose(); App.Views.bga._gpu = null; }
    App.Views.bga._editor = null;
    App.Views.customer._editor = null;
  }

  /* ---------------- 新建封装项目向导 ---------------- */
  function newProjectWizard() {
    if (Store.state.role === "customer") return UI.toast("客户角色不能新建项目", "error");
    const body = UI.h(`<div>
      <div class="form-row"><label>项目名称 *</label><input id="npName" placeholder="如 FCBGA-55x55-新一代"></div>
      <div class="form-row"><label>封装类型</label>
        <select id="npPkg"><option>FCBGA</option><option>SiP</option><option>FCCSP</option><option>WLCSP</option><option>2.5D Interposer</option></select></div>
      <div class="form-row"><label>客户名称</label><input id="npCustomer" value="华芯半导体"></div>
      <div class="form-row"><label>基板层数 *</label><input id="npLayers" type="number" min="1" max="30" value="4">
        <div class="form-hint">创建后在「层叠设计」中逐层录入介质厚度、铜厚与材料代号；默认每层 60µm 介质 / 15µm 铜 / EM-285。</div></div>
      <div class="form-row"><label>初始 BGA 规格</label>
        <div style="display:flex;gap:8px;align-items:center">
          <input id="npCols" type="number" value="8" min="1" style="width:70px"> 列 ×
          <input id="npRows" type="number" value="8" min="1" style="width:70px"> 行，间距
          <input id="npPitch" type="number" value="400" min="50" style="width:90px"> µm
        </div></div>
    </div>`);
    UI.modal({
      title: "新建封装项目",
      body,
      buttons: [
        { label: "取消", onClick: (c) => c() },
        { label: "创建并录入层叠", cls: "primary", onClick: (c, b) => {
          const name = b.querySelector("#npName").value.trim();
          const layerCount = +b.querySelector("#npLayers").value;
          if (!name) return UI.toast("请填写项目名称", "error");
          if (!(layerCount > 0)) return UI.toast("基板层数必须大于 0", "error");
          const cols = +b.querySelector("#npCols").value, rows = +b.querySelector("#npRows").value;
          const pitch = +b.querySelector("#npPitch").value;
          const proj = Store.createProject({
            name, packageType: b.querySelector("#npPkg").value,
            customer: b.querySelector("#npCustomer").value || "未命名客户",
            layerCount,
          });
          if (cols > 0 && rows > 0 && pitch > 0) Store.regenerateBga(cols, rows, pitch, pitch);
          c();
          UI.toast(`项目「${name}」已创建，请录入层叠参数`, "success");
        } },
      ],
    });
  }

  /* ---------------- 启动 ---------------- */
  function start() {
    document.getElementById("newProjectBtn").onclick = newProjectWizard;
    document.getElementById("projectSelect").onchange = (e) => Store.selectProject(e.target.value);
    document.getElementById("roleSelect").onchange = (e) => {
      Store.setRole(e.target.value);
      if (e.target.value === "customer") Store.state.currentView = "customer";
      else if (Store.state.currentView === "customer") Store.state.currentView = "dashboard";
      lastRenderKey = "";
      Store.emit();
    };

    Store.subscribe(() => {
      renderShell();
      renderView();
      const pill = document.getElementById("savePill");
      pill.textContent = "已自动保存";
      pill.classList.remove("dirty");
    });
    window.addEventListener("beforeunload", () => Store.emit());
    renderShell();
    renderView();
  }

  document.addEventListener("DOMContentLoaded", start);
})(window);
