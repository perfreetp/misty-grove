# 皮肤痣图三维体表定位与随访比对系统（MoleMap 3D）

面向皮肤科门诊的全身色素痣三维定位、分区编码与随访比对系统。前端纯本地运行，
照片与痣图全部保存在浏览器 IndexedDB，不上传任何服务器。

## 技术栈

- **Svelte 5**（runes：`$state` / `$derived` / `$effect` / `$props`）
- **three.js**（WebGL 三维人体、OrbitControls 旋转、射线拾取表面定位）
- **Vite 6** 构建
- **IndexedDB** 本地持久化，皮肤镜照片以 `Blob` 原样存储

## 启动

```bash
npm install
npm run dev        # 开发服务器（默认 http://127.0.0.1:5173）
npm run build      # 生产构建到 dist/
npm run preview    # 预览生产构建
```

首次打开可点击「载入演示数据」，一键生成含 6 颗痣（其中 3 颗会在复诊标黄：
直径增大、边缘变不规则、新发痣）的完整随访链路。

## 角色与功能

左上角可切换当前操作人，系统据此记录操作日志与统计归属。

| 角色 | 职责 |
| --- | --- |
| 门诊医师 | 体表定位、分区编码、挂皮肤镜照片、随访配对、逐颗判读（观察/活检/切除+理由） |
| 技师 | 维护解剖分区编号规则、拍摄角度模板；执行采集与重新配对 |
| 主任 | 待审列表查看标黄痣前后对比与判读意见，审核通过或退回重新配对 |

### 核心业务链路

1. **三维定位与编码**：在可旋转的三维人体模型表面点击，射线拾取命中部件与
   局部坐标 `(u,v)` 及前/后朝向；选择解剖分区后自动生成永久编号
   `分区码-左右侧-流水号`，例如 `BK-L-001`（背部-左侧-第 1 号）。
2. **皮肤镜记录**：每颗痣记录直径(mm)、边缘形态、色素网络形态、拍摄角度模板，
   并挂接皮肤镜照片（Blob）。
3. **痣图**：三维模型上以颜色标记（绿=普通、黄=标黄、蓝=选中、灰=已切除），
   支持前/后/左/右视角、模型半透明、导出 PNG；可一键展开为前/后位**平面痣图**。
4. **随访任务**：待采集 → 待判读 → 已判读 →（主任可退回）已退回，
   每次状态变更都记录操作人与时间。
5. **自动标黄规则**（`src/lib/constants.js` 的 `FLAG_RULES`）：
   - 直径增加 **> 1mm**；
   - 边缘由规则变为「明显不规则」或「伪足/放射纹」；
   - 基线不存在的**新发痣**。
6. **判读**：医师逐颗选择观察 / 活检 / 切除并填写理由。
7. **主任审核**：逐颗查看基线与复诊并排对比、标黄原因与判读意见，可退回
   （任务回到「已退回」），技师/医师在工作台「重新配对」后再次提交。
8. **导出**：随访差异清单 CSV、活检/切除建议单 CSV、三维痣图 PNG、操作日志 CSV。
9. **统计**：按医师计算标黄命中率（标黄中活检/切除占比）、活检比例、有创处置比例。

## 目录结构

```
src/
├── lib/
│   ├── db.js            # IndexedDB 封装（含 Proxy 脱壳，照片 Blob 直存）
│   ├── constants.js     # 分区/角度/判定/状态规则、三维部件与平面锚盒
│   ├── geometry.js      # three.js 场景、人体建模、射线拾取、标记精灵
│   ├── store.svelte.js  # 全局响应式状态与全部业务流转
│   ├── utils.js         # 差异判定、CSV、合成演示图、对象 URL 工具
│   └── demo.js          # 演示数据生成器
├── components/
│   ├── BodyViewer3D.svelte  # 可旋转三维体表 + 表面定位 + 编号标记
│   ├── FlatMap.svelte       # 前/后位平面展开痣图（SVG）
│   ├── ComparePanel.svelte  # 基线/复诊照片与指标并排对比
│   ├── FindingForm.svelte   # 直径/边缘/色素网络/照片录入
│   ├── PhotoField.svelte    # 照片 Blob 上传与预览
│   └── Modal.svelte
└── views/
    ├── PatientsView.svelte  # 患者档案
    ├── WorkspaceView.svelte # 三维工作台（建档/采集/判读三模式）
    ├── TasksView.svelte     # 随访任务四态流转与导出
    ├── ReviewView.svelte    # 主任待审与退回
    ├── StatsView.svelte     # 医师质量指标
    ├── SettingsView.svelte  # 技师规则维护
    └── LogsView.svelte      # 操作日志
```

## 数据模型（IndexedDB stores）

`patients` 患者 · `visits` 就诊（基线/复诊）· `moles` 痣主档（永久编号+三维坐标）·
`findings` 每次就诊的测量与照片 · `tasks` 随访任务与状态 · `judgments` 判读 ·
`reviews` 审核 · `zones` 分区规则 · `angles` 拍摄角度模板 · `logs` 操作日志 · `meta` 键值/计数器。

## 端到端测试

测试通过 Chrome DevTools Protocol 驱动真实无头浏览器，无需额外测试框架。

```bash
# 先启动 dev 服务器，再执行（脚本默认连接 http://127.0.0.1:5175）
npm run dev
node tests/smoke.mjs   # 29 项全链路：标黄/判读/审核/退回/配对/导出/统计/持久化
node tests/pick.mjs    # 三维表面拾取 → 自动编号 → 测量录入专项
```
