/* Node 测试台：桩 DOM/localStorage，按 index.html 顺序加载全部脚本，跑核心业务流程 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const storage = {};
const noop = () => {};
const ctx2dStub = () => ({
  setTransform: noop, clearRect: noop, fillRect: noop, strokeRect: noop, save: noop, restore: noop,
  beginPath: noop, moveTo: noop, lineTo: noop, stroke: noop, fill: noop, arc: noop, rect: noop,
  fillText: noop, strokeText: noop, setLineDash: noop, scale: noop, translate: noop, rotate: noop,
  createRadialGradient: () => ({ addColorStop: noop }),
  createLinearGradient: () => ({ addColorStop: noop }),
  measureText: () => ({ width: 10 }),
  fillStyle: "", strokeStyle: "", lineWidth: 1, font: "", textAlign: "", globalAlpha: 1,
});
const elementStub = () => ({
  innerHTML: "", textContent: "", value: "", style: {}, dataset: {}, disabled: false, checked: false,
  clientWidth: 800, clientHeight: 600, width: 0, height: 0,
  classList: { add: noop, remove: noop, toggle: noop },
  addEventListener: noop, removeEventListener: noop, appendChild: noop, remove: noop,
  querySelector: () => elementStub(), querySelectorAll: () => [], insertAdjacentHTML: noop,
  setPointerCapture: noop, releasePointerCapture: noop,
  getContext: (kind) => (kind === "2d" ? ctx2dStub() : null),
  getBoundingClientRect: () => ({ left: 0, top: 0, width: 800, height: 600 }),
  onclick: null, onchange: null,
});
const documentStub = {
  addEventListener: (ev, fn) => { if (ev === "DOMContentLoaded") queueMicrotask(fn); },
  createElement: () => elementStub(),
  getElementById: () => elementStub(),
  querySelector: () => elementStub(),
  querySelectorAll: () => [],
  body: elementStub(),
};
const sandbox = {
  console, setTimeout, clearTimeout, queueMicrotask, Math, JSON, Date, Array, Object, String, Number, Map, Set,
  localStorage: { getItem: (k) => (k in storage ? storage[k] : null), setItem: (k, v) => { storage[k] = String(v); }, removeItem: (k) => { delete storage[k]; } },
  navigator: { gpu: undefined },
  document: documentStub,
  Blob: class {}, URL: { createObjectURL: () => "blob:x", revokeObjectURL: noop },
  requestAnimationFrame: noop,
  addEventListener: noop,
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

const files = [
  "js/util/mat4.js", "js/util/geometry.js", "js/webgpu/gpu.js", "js/store.js",
  "js/validation.js", "js/export.js", "js/bga2d.js", "js/ui.js",
  "js/views/dashboard.js", "js/views/stackup.js", "js/views/stackup3d.js",
  "js/views/bga.js", "js/views/review.js", "js/views/materials.js",
  "js/views/customer.js", "js/main.js",
];
for (const f of files) {
  const code = fs.readFileSync(path.join(ROOT, f), "utf8");
  vm.runInContext(code, sandbox, { filename: f });
}
const App = sandbox.App;
const Store = App.Store;
let pass = 0, fail = 0;
function assert(cond, msg) {
  if (cond) { pass++; console.log("  ✓", msg); }
  else { fail++; console.error("  ✗ FAIL:", msg); }
}

console.log("\n[1] 种子数据与材料色");
const p = Store.currentProject();
assert(p.layers.length === 4, "种子项目 4 层");
assert(Store.totalThickness(p) === 80 + 15 + 20 + 20 + 75 + 15 + 100 + 25, `总厚度=${Store.totalThickness(p)}µm（350）`);
assert(Store.defectBalls(p).length === 5, "种子缺陷球 5 颗");
assert(App.GpuRenderer.isSupported() === false, "无 navigator.gpu 时正确判定不支持");

console.log("\n[2] 三档校验");
let r = App.Validation.validateProject(p);
assert(r.checks[0].level === "pass", "350µm < 1200µm 总厚度通过");
assert(r.checks[1].level === "warn" && r.checks[1].layers.length === 1, "L2 介质 20µm 触发风险提示");
assert(r.checks[2].level === "error", "L2 铜厚与阻抗表不一致为硬错误");
assert(r.canSubmit === false, "存在硬错误不可提交");
Store.backfillCuFromImpedance();
r = App.Validation.validateProject(p);
assert(r.checks[2].level === "pass" && r.canSubmit === true, "回填后阻抗一致且可提交（风险不拦截）");
assert(r.warnings.length === 1, "回填后仍保留 1 条介质风险 warning");

console.log("\n[3] 总厚度硬拦截");
Store.updateLayer(p.layers[0].id, { dielectricThickness: 1200 });
r = App.Validation.validateProject(p);
assert(r.checks[0].level === "error" && r.canSubmit === false, "总厚超限被硬拦截");
Store.updateLayer(p.layers[0].id, { dielectricThickness: 80 });

console.log("\n[4] 评审状态机与锁定");
Store.submitForReview("测试提交");
assert(p.status === "process-review", "提交后进入工艺评审");
assert(p.reviewLogs.at(-1).action === "submit", "提交日志已记录");
Store.processApprove("工艺OK");
assert(p.status === "customer-confirm" && p.locked === true, "工艺通过后锁定并进入客户确认");
const before = JSON.stringify(p.layers);
Store.updateLayer(p.layers[0].id, { dielectricThickness: 999 });
assert(JSON.stringify(p.layers) === before, "锁定后 updateLayer 被拒绝");
Store.reject("阻抗不匹配", "客户退回测试");
assert(p.status === "self-check" && p.locked === false, "退回后解锁回到自检");
const log = p.reviewLogs.at(-1);
assert(log.reason === "阻抗不匹配" && !!log.at, "退回原因分类与时间已留存");

console.log("\n[5] 变更单升版");
Store.submitForReview("再次提交");
Store.processApprove("再次通过");
Store.customerConfirm("客户OK");
assert(p.status === "confirmed" && p.snapshots.length === 1, "客户确认归档并生成快照");
const v = p.version;
const co = Store.createChangeOrder("材料选型问题", "更换 L3 材料");
assert(!!co && p.version === v + 1 && p.status === "self-check" && p.locked === false, "变更单升版并解锁重开一轮");

console.log("\n[6] BGA 标记与重新生成");
Store.regenerateBga(6, 5, 500, 450);
assert(p.bga.balls.length === 30, "重新生成 6x5=30 颗球");
Store.markBall("R2C2", { defect: "missing" });
Store.markBall("R3C3", { defect: "offset", offsetX: 40, offsetY: -10 });
Store.markBall("R4C4", { defect: "bridge" });
Store.markBall("R4C5", { defect: "bridge" });
assert(Store.defectBalls(p).length === 4, "4 颗异常球计入缺陷清单");
const off = p.bga.balls.find((x) => x.id === "R3C3");
assert(off.defect === "offset" && off.offsetX === 40, "偏位量保存正确");
Store.markBall("R2C2", { defect: "nominal" });
assert(Store.defectBalls(p).length === 3, "恢复正常后缺陷数减少");

console.log("\n[7] 材料汇总");
const matMap = new Map();
for (const l of p.layers) matMap.set(l.material, (matMap.get(l.material) || 0) + 1);
assert(matMap.size >= 3, "材料代号分桶正常");

console.log("\n[8] 视图渲染冒烟（桩 DOM，全部视图各 render 一次）");
const root = { innerHTML: "", querySelector: () => elementStub(), querySelectorAll: () => [] };
for (const name of ["dashboard", "stackup", "stackup3d", "bga", "review", "materials", "customer"]) {
  let ok = true;
  try { App.Views[name].render(root); } catch (e) { ok = false; console.error("   render error in", name, e.stack); }
  assert(ok, `视图 ${name} render 不抛异常`);
}

console.log("\n[9] 持久化（防抖 250ms，等待定时器落盘）");
setTimeout(() => {
  assert(!!storage["substrate-review-platform-v1"], "数据已写入 localStorage");
  const reloaded = JSON.parse(storage["substrate-review-platform-v1"]);
  assert(reloaded.projects.length === 2 && reloaded.projects[0].changeOrders.length === 1, "持久化内容含项目与变更单");

  console.log(`\n===== 结果：${pass} 通过 / ${fail} 失败 =====`);
  process.exit(fail ? 1 : 0);
}, 350);
