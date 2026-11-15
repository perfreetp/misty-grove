/* 全局状态：项目 CRUD、层叠/BGA 数据、评审状态机、变更单、批注、版本快照、localStorage 持久化 */
(function (global) {
  const App = global.App || (global.App = {});
  const STORAGE_KEY = "substrate-review-platform-v1";

  const STATUSES = {
    "self-check":      { label: "设计自检", badge: "blue" },
    "process-review":  { label: "工艺评审", badge: "amber" },
    "customer-confirm":{ label: "客户确认", badge: "purple" },
    "confirmed":       { label: "已确认",   badge: "green" },
  };
  const REJECT_REASONS = ["层叠厚度超标", "介质/铜厚不满足工艺", "阻抗不匹配", "球阵缺陷需处理", "材料选型问题", "其他"];
  const DEFECT_TYPES = { nominal: "正常", missing: "缺球", offset: "偏位", bridge: "连锡" };
  const CUSTOMER_LIMIT_UM = 1200; // 客户给定总厚上限 1.2mm
  const DIELECTRIC_MIN_UM = 25;  // 介质厚度风险下限

  function nowISO() { return new Date().toISOString(); }
  function fmtTime(iso) {
    if (!iso) return "—";
    const d = new Date(iso);
    const p = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
  }
  function uid(prefix) {
    return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
  }

  /* 材料代号 -> 展示色（RGB 0..1），未知代号按哈希取色 */
  const MATERIAL_COLORS = {
    "EM-285": [0.31, 0.55, 0.34],
    "EM-350": [0.27, 0.48, 0.58],
    "BT-EP":  [0.40, 0.47, 0.60],
    "PI-2611":[0.55, 0.42, 0.28],
    "ABF-GX": [0.46, 0.36, 0.55],
    "RCC-1080":[0.36, 0.52, 0.48],
  };
  function materialColor(code) {
    if (MATERIAL_COLORS[code]) return MATERIAL_COLORS[code];
    let h = 0;
    for (const ch of String(code || "?")) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    const hue = h % 360;
    return hslToRgb01(hue / 360, 0.32, 0.42);
  }
  function hslToRgb01(h, s, l) {
    const a = s * Math.min(l, 1 - l);
    const f = (n) => {
      const k = (n + h * 12) % 12;
      return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    };
    return [f(0), f(8), f(4)];
  }

  function makeLayer(index, cuThickness = 15, dielectricThickness = 60, material = "EM-285", density = 40) {
    return {
      id: uid("L"),
      name: `L${index}`,
      dielectricThickness, // um
      cuThickness,          // um
      material,
      density,              // 走线密度 0..100
    };
  }

  function makeBgaGrid(cols, rows, pitchX, pitchY) {
    const balls = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        balls.push({
          id: `R${r + 1}C${c + 1}`,
          row: r + 1, col: c + 1,
          defect: "nominal",
          offsetX: 0, offsetY: 0,
          remark: "",
        });
      }
    }
    return balls;
  }

  function seedProject(name, pkg, opts = {}) {
    const layers = opts.layers || [
      (() => { const l = makeLayer(1, 15, 80, "EM-285", 55); return l; })(),
      (() => { const l = makeLayer(2, 20, 20, "EM-350", 72); return l; })(), // 介质 20um 触发风险
      (() => { const l = makeLayer(3, 15, 75, "BT-EP", 64); return l; })(),
      (() => { const l = makeLayer(4, 25, 100, "ABF-GX", 38); return l; })(),
    ];
    const impedance = layers.map((l) => ({ layer: l.name, cuThickness: l.cuThickness === 20 ? 15 : l.cuThickness })); // L2 故意对不上
    const balls = makeBgaGrid(opts.cols || 8, opts.rows || 8, opts.pitchX || 400, opts.pitchY || 400);
    if (opts.withDefects !== false) {
      const set = (id, patch) => { const b = balls.find((x) => x.id === id); if (b) Object.assign(b, patch); };
      set("R3C4", { defect: "missing", remark: "避让过孔" });
      set("R5C6", { defect: "offset", offsetX: 35, offsetY: -20 });
      set("R7C2", { defect: "bridge", remark: "与 R7C3 连锡" });
      set("R7C3", { defect: "bridge" });
      set("R2C7", { defect: "offset", offsetX: 18, offsetY: 12 });
    }
    return {
      id: uid("P"),
      name,
      packageType: pkg,
      customer: opts.customer || "华芯半导体",
      limitUm: CUSTOMER_LIMIT_UM,
      version: 1,
      status: opts.status || "self-check",
      locked: ["customer-confirm", "confirmed"].includes(opts.status),
      createdAt: nowISO(),
      updatedAt: nowISO(),
      layers,
      impedance,
      bga: {
        cols: opts.cols || 8, rows: opts.rows || 8,
        pitchX: opts.pitchX || 400, pitchY: opts.pitchY || 400,
        ballDiameter: 250,
        balls,
      },
      reviewLogs: opts.logs || [],
      changeOrders: [],
      annotations: [],
      snapshots: [],
    };
  }

  function defaultState() {
    const p1 = seedProject("FCBGA-45x45 演示项目", "FCBGA");
    const p2 = seedProject("SiP-模块 已确认样例", "SiP", {
      status: "confirmed", withDefects: false,
      layers: [
        makeLayer(1, 15, 70, "EM-285", 50),
        makeLayer(2, 15, 60, "EM-350", 60),
        makeLayer(3, 15, 70, "BT-EP", 45),
        makeLayer(4, 20, 90, "ABF-GX", 35),
      ],
      logs: [{
        id: uid("LOG"), at: nowISO(), action: "confirm",
        fromStatus: "customer-confirm", toStatus: "confirmed",
        role: "customer", actor: "客户·华芯半导体", reason: "", note: "版本确认通过",
      }],
    });
    p2.impedance = p2.layers.map((l) => ({ layer: l.name, cuThickness: l.cuThickness }));
    return {
      projects: [p1, p2],
      currentProjectId: p1.id,
      role: "designer",
      currentView: "dashboard",
    };
  }

  let state;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    state = raw ? JSON.parse(raw) : defaultState();
  } catch (_) {
    state = defaultState();
  }

  const listeners = new Set();
  let saveTimer = null;
  let quiet = false;
  function persist() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { console.error(e); }
    }, 250);
  }
  function emit() {
    persist();
    if (quiet) return;
    for (const fn of listeners) {
      try { fn(state); } catch (e) { console.error(e); }
    }
  }
  function subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); }
  /* 静默批处理：回调内的数据修改只持久化、不触发重渲染，结束后手动渲染一次 */
  function batch(fn) {
    quiet = true;
    try { fn(); } finally { quiet = false; }
    emit();
  }

  function currentProject() {
    return state.projects.find((p) => p.id === state.currentProjectId) || state.projects[0];
  }
  function getProject(id) { return state.projects.find((p) => p.id === id); }

  function totalThickness(proj) {
    return proj.layers.reduce((s, l) => s + (+l.dielectricThickness || 0) + (+l.cuThickness || 0), 0);
  }
  function defectBalls(proj) {
    return proj.bga.balls.filter((b) => b.defect !== "nominal");
  }

  /* ---------------- Store 动作 ---------------- */
  const Store = {
    state, STATUSES, REJECT_REASONS, DEFECT_TYPES,
    CUSTOMER_LIMIT_UM, DIELECTRIC_MIN_UM,
    subscribe, emit, batch, currentProject, getProject, totalThickness, defectBalls,
    materialColor, uid, nowISO, fmtTime,
    makeLayer,

    selectProject(id) { state.currentProjectId = id; emit(); },
    setRole(role) { state.role = role; emit(); },
    setView(view) { state.currentView = view; emit(); },

    createProject(data) {
      const layers = [];
      for (let i = 1; i <= data.layerCount; i++) layers.push(makeLayer(i));
      const proj = {
        id: uid("P"),
        name: data.name,
        packageType: data.packageType,
        customer: data.customer,
        limitUm: CUSTOMER_LIMIT_UM,
        version: 1,
        status: "self-check",
        locked: false,
        createdAt: nowISO(), updatedAt: nowISO(),
        layers,
        impedance: layers.map((l) => ({ layer: l.name, cuThickness: l.cuThickness })),
        bga: {
          cols: 8, rows: 8, pitchX: 400, pitchY: 400, ballDiameter: 250,
          balls: makeBgaGrid(8, 8, 400, 400),
        },
        reviewLogs: [{
          id: uid("LOG"), at: nowISO(), action: "create",
          fromStatus: "", toStatus: "self-check",
          role: "designer", actor: "设计员", reason: "", note: "新建封装项目",
        }],
        changeOrders: [], annotations: [], snapshots: [],
      };
      state.projects.push(proj);
      state.currentProjectId = proj.id;
      state.currentView = "stackup";
      emit();
      return proj;
    },

    updateLayer(layerId, patch) {
      const proj = currentProject();
      if (proj.locked) return;
      const layer = proj.layers.find((l) => l.id === layerId);
      if (!layer) return;
      Object.assign(layer, patch);
      proj.updatedAt = nowISO();
      emit();
    },

    updateImpedance(layerName, cuThickness) {
      const proj = currentProject();
      if (proj.locked) return;
      let row = proj.impedance.find((r) => r.layer === layerName);
      if (!row) { row = { layer: layerName, cuThickness }; proj.impedance.push(row); }
      row.cuThickness = cuThickness;
      emit();
    },

    updateBgaConfig(patch) {
      const proj = currentProject();
      if (proj.locked) return;
      Object.assign(proj.bga, patch);
      emit();
    },

    regenerateBga(cols, rows, pitchX, pitchY) {
      const proj = currentProject();
      if (proj.locked) return;
      proj.bga.cols = cols; proj.bga.rows = rows;
      proj.bga.pitchX = pitchX; proj.bga.pitchY = pitchY;
      proj.bga.balls = makeBgaGrid(cols, rows, pitchX, pitchY);
      proj.updatedAt = nowISO();
      emit();
    },

    markBall(ballId, patch) {
      const proj = currentProject();
      if (proj.locked) return;
      const ball = proj.bga.balls.find((b) => b.id === ballId);
      if (!ball) return;
      Object.assign(ball, patch);
      if (ball.defect !== "offset") { ball.offsetX = 0; ball.offsetY = 0; }
      if (ball.defect === "nominal") ball.remark = "";
      proj.updatedAt = nowISO();
      emit();
    },

    /* 一键回填：将阻抗表中的铜厚写回各层 */
    backfillCuFromImpedance() {
      const proj = currentProject();
      if (proj.locked) return;
      for (const row of proj.impedance) {
        const layer = proj.layers.find((l) => l.name === row.layer);
        if (layer) layer.cuThickness = row.cuThickness;
      }
      proj.updatedAt = nowISO();
      emit();
    },

    addLog(proj, entry) {
      proj.reviewLogs.push({ id: uid("LOG"), at: nowISO(), ...entry });
    },

    /* 提交评审：硬错误存在时由 validation 层拦截，本方法只做流转 */
    submitForReview(note) {
      const proj = currentProject();
      if (proj.status !== "self-check" || proj.locked) return;
      this.addLog(proj, {
        action: "submit", fromStatus: "self-check", toStatus: "process-review",
        role: "designer", actor: roleName(state.role), reason: "", note: note || "提交工艺评审",
      });
      proj.status = "process-review";
      proj.updatedAt = nowISO();
      emit();
    },

    /* 工艺评审通过 -> 锁定层叠，进入客户确认 */
    processApprove(note) {
      const proj = currentProject();
      if (proj.status !== "process-review") return;
      this.addLog(proj, {
        action: "approve", fromStatus: "process-review", toStatus: "customer-confirm",
        role: "process", actor: "工艺工程师", reason: "", note: note || "工艺评审通过，层叠已锁定",
      });
      proj.status = "customer-confirm";
      proj.locked = true;
      proj.updatedAt = nowISO();
      emit();
    },

    /* 退回：必须选原因分类并记录时间（时间由日志 at 字段留存） */
    reject(reason, note) {
      const proj = currentProject();
      if (!["process-review", "customer-confirm"].includes(proj.status)) return;
      const from = proj.status;
      this.addLog(proj, {
        action: "reject", fromStatus: from, toStatus: "self-check",
        role: state.role, actor: roleName(state.role), reason, note: note || "",
      });
      proj.status = "self-check";
      proj.locked = false;
      proj.updatedAt = nowISO();
      emit();
    },

    customerConfirm(note) {
      const proj = currentProject();
      if (proj.status !== "customer-confirm") return;
      this.addLog(proj, {
        action: "confirm", fromStatus: "customer-confirm", toStatus: "confirmed",
        role: "customer", actor: `客户·${proj.customer}`, reason: "", note: note || "客户确认通过",
      });
      proj.status = "confirmed";
      proj.locked = true;
      proj.snapshots.push({
        id: uid("SNAP"), version: proj.version, at: nowISO(),
        data: JSON.parse(JSON.stringify({ layers: proj.layers, bga: proj.bga, impedance: proj.impedance })),
      });
      proj.updatedAt = nowISO();
      emit();
    },

    /* 变更单：锁定状态下改设计必须走变更单，版本号 +1 并重新开一轮 */
    createChangeOrder(reason, note) {
      const proj = currentProject();
      if (!proj.locked) return;
      const co = {
        id: uid("CO"), no: `CO-${proj.changeOrders.length + 1}`,
        reason, note, at: nowISO(), fromVersion: proj.version,
      };
      proj.changeOrders.push(co);
      this.addLog(proj, {
        action: "change-order", fromStatus: proj.status, toStatus: "self-check",
        role: state.role, actor: roleName(state.role), reason,
        note: `变更单 ${co.no}：${note || reason}，版本 V${proj.version} → V${proj.version + 1}`,
      });
      proj.version += 1;
      proj.status = "self-check";
      proj.locked = false;
      proj.updatedAt = nowISO();
      emit();
      return co;
    },

    addAnnotation(text, anchor) {
      const proj = currentProject();
      proj.annotations.push({
        id: uid("ANN"), at: nowISO(),
        author: roleName(state.role), role: state.role,
        text, anchor: anchor || null, resolved: false,
      });
      emit();
    },

    resolveAnnotation(id) {
      const proj = currentProject();
      const a = proj.annotations.find((x) => x.id === id);
      if (a) a.resolved = true;
      emit();
    },

    resetAll() {
      state = defaultState();
      Object.assign(Store.state, state);
      localStorage.removeItem(STORAGE_KEY);
      emit();
    },
  };

  function roleName(role) {
    return { designer: "设计员", process: "工艺工程师", customer: "客户" }[role] || role;
  }

  App.Store = Store;
  App.roleName = roleName;
})(window);
