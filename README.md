# 基板层叠与球阵可视化评审平台

面向封装设计所的基板（Substrate）层叠结构与 BGA 球阵三维可视化评审平台。纯静态实现（无构建工具、无外部依赖），三维渲染基于 **WebGPU**，在不支持 WebGPU 的浏览器中自动降级为 Canvas 2D。

## 运行

```bash
# 任选一种静态服务器（WebGPU 要求 http(s) 或 localhost 上下文）
python -m http.server 8000
# 或
npx serve .
```

浏览器打开 `http://localhost:8000`。推荐 Chrome / Edge 113+ 并开启硬件加速以获得 WebGPU 三维能力；无 WebGPU 时平台所有数据与二维功能完整可用，仅三维视图降级。

## 功能与需求映射

| 需求 | 实现位置 |
| --- | --- |
| 新建封装项目、录入层数/介质厚度/铜厚/材料代号 | `js/store.js`（向导）、`js/views/stackup.js` |
| 三维按真实厚度比例渲染层叠剖切（µm 即场景单位） | `js/webgpu/gpu.js`、`js/views/stackup3d.js` |
| 拖动剖切面查看每层走线密度分布（热力色带 + 密度图例） | `stackup3d.js`（滑块 / Shift 拖拽 / 双击 / 层定位） |
| BGA 按行列间距生成焊球，支持缺球/偏位/连锡标记 | `js/bga2d.js`、`js/views/bga.js` |
| 异常球三维渲染为橙色并计入缺陷清单 | `bga.js` 三维实例化（统一橙色系）+ 缺陷清单表 |
| 三档校验：>1.2mm 硬拦截 / 介质<25µm 风险可提交 / 铜厚阻抗不符要求回填 | `js/validation.js`、`stackup.js` 校验面板与一键回填 |
| 评审单三状态：设计自检 → 工艺评审 → 客户确认 | `js/views/review.js`、`store.js` 状态机 |
| 退回必选原因分类并留时间 | `review.js` 退回弹窗（分类必填 + 说明必填，时间精确到分钟写入时间线） |
| 工艺通过后锁定层叠，变更须走变更单重开一轮（版本 +1） | `store.js`（locked 标志、`createChangeOrder`、快照） |
| 按材料代号汇总用量与层数分布 | `js/views/materials.js`（当前项目 + 全平台跨项目） |
| 导出层叠表 / 球阵缺陷明细 | `js/export.js`（UTF-8 BOM CSV，Excel 直接打开） |
| 客户仅可见已确认版本并在线批注 | `js/views/customer.js`（只读 + 全局/球位挂接批注，紫色图钉） |

## 三档校验规则

1. **硬拦截（error）**：层叠总厚度（介质 + 铜累加）超过客户上限 1200µm，提交按钮禁用。
2. **风险提示（warning）**：任一介质层 < 25µm，黄色警示但**不拦截**，可提交并在评审单说明工艺措施。
3. **回填要求（error）**：层铜厚与阻抗表不一致时不可提交，点击「按阻抗表一键回填铜厚」后解除。

## 角色与权限

- **设计员**：建项、录层叠、编球阵、提交、发起变更单。
- **工艺工程师**：工艺评审通过（锁定层叠）或退回（留因留时）。
- **客户**：仅能在客户门户查看 `confirmed` 版本，数据只读，可发表批注（可挂接到具体球位）。

切换角色在右上角下拉框，导航与可执行操作随角色/状态自动变化。

## 目录结构

```
index.html
css/style.css
js/
  util/mat4.js          列主序矩阵/向量（WebGPU 直接可用）
  util/geometry.js      盒/球/环/圆柱几何与实例化合批
  webgpu/gpu.js         自研引擎：实体+实例化管线、剖切 uniform、轨道相机、透明混合
  store.js              数据模型、localStorage 持久化、评审状态机、变更单、版本快照
  validation.js         三档校验
  export.js             CSV 导出
  bga2d.js              BGA 二维编辑器（兼作无 WebGPU 降级视图与批注底图）
  ui.js                 DOM/Toast/模态框等共享组件
  views/*.js            7 个视图：总览/层叠/三维剖切/BGA/评审/材料/客户门户
  main.js               外壳、导航权限、路由、新建项目向导
test/harness.js         Node 逻辑测试台（桩 DOM，33 项断言）
```

## 测试

```bash
node test/harness.js
```

覆盖：种子数据、三档校验全部分支、硬拦截、评审状态机与锁定、退回留痕、变更单升版、BGA 标记与重生成、材料汇总、7 个视图渲染冒烟、localStorage 持久化。

## 数据说明

所有数据保存在浏览器 `localStorage`（键 `substrate-review-platform-v1`），刷新不丢失；内置两个种子项目（一个含校验风险与球阵缺陷的自检项目、一个已确认样例）。清除浏览器站点数据或在控制台调用 `App.Store.resetAll()` 可恢复初始演示数据。
