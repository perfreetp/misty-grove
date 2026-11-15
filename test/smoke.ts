// 核心业务规则冒烟测试（node 直接运行 TS，经 esbuild 转译）
import { defaultConfig, defaultIntents } from '../src/core/defaults';
import { buildSlopeModel } from '../src/core/geometry';
import { rebuildComponents, summarize, validate } from '../src/core/engine';
import { declareBatch, approveBatch, rejectBatch, dashboard, isOverdue } from '../src/core/acceptance';
import { buildBillRows } from '../src/core/export';
import type { ProjectState } from '../src/types';

let pass = 0, fail = 0;
function check(name: string, cond: boolean, extra = '') {
  if (cond) { pass++; console.log(`  ✓ ${name}`); }
  else { fail++; console.error(`  ✗ ${name} ${extra}`); }
}

function makeProject() {
  const config = defaultConfig();
  const intents = defaultIntents(config);
  const state: ProjectState = {
    version: 1, config, intents,
    components: { frames: [], ditches: [], walls: [], monitors: [] },
    batches: [],
  };
  return state;
}

console.log('1) 默认工程几何与框架梁');
{
  const state = makeProject();
  const model = buildSlopeModel(state.config);
  check('生成 3 级坡面', model.faces.length === 3);
  check('土岩分界高程=308', model.soilRockBoundaryElev === 308);
  const eng = rebuildComponents(state.config, model, state.intents);
  state.components = eng.components;
  // 默认前两级启用框架
  check('前两级生成框架梁', eng.components.frames.length === 2);
  const f1 = eng.components.frames[0];
  // 坡长 180 / 6 = 30 列，31 个走向节点
  check('走向 6m 分块=30（31列节点）', f1.colCount === 30);
  // 第1级斜长 = 12*sqrt(1+0.75²)=15，排距6 → round(15/6)=3排，实际5m等距，应触发错误
  check('第1级框架排数', f1.rowCount >= 3);
  const issues = eng.issues;
  check('存在规则问题', issues.length > 0, JSON.stringify(issues.map(i => i.message)));
}

console.log('2) 排距不一致 → 报错；排距正确时无错误');
{
  const state = makeProject();
  const model = buildSlopeModel(state.config);
  // 第3级斜长 = 12*sqrt(1+1.25²)=19.21，排距6 → round=3，间距6.4 超容差 → 错误
  state.intents.frameEnabled.g3 = true;
  let issues = validate(state.config, model, state.intents);
  check('默认参数下存在排距错误', issues.some(i => i.level === 'error'));
  // 给第3级设置能整除的排距：斜长/3 ≈ 6.403
  const face3 = model.faces[2];
  state.config.frameRowSpacing = +(face3.slopeLength / 3).toFixed(3);
  issues = validate(state.config, model, state.intents);
  const g3Err = issues.some(i => i.level === 'error' && i.gradeId === 'g3');
  check('排距改为等距后 g3 无错误', !g3Err, JSON.stringify(issues.filter(i => i.gradeId === 'g3')));
}

console.log('3) 锚杆长度随岩层变化');
{
  const state = makeProject();
  state.intents.frameEnabled.g3 = true; // 让三级坡全部布置框架
  const model = buildSlopeModel(state.config);
  const eng = rebuildComponents(state.config, model, state.intents);
  // g1 全在土层(12)；g2 跨土/强风化(12,9)；g3 跨强/中风化(9,6)
  const g2 = eng.components.frames.find(f => f.gradeId === 'g2')!;
  const g3 = eng.components.frames.find(f => f.gradeId === 'g3')!;
  check('g2 锚杆出现两种长度（跨土岩）', new Set(g2.anchors.map(a => a.length)).size === 2);
  check('g3 锚杆出现两种长度（跨岩层）', new Set(g3.anchors.map(a => a.length)).size === 2);
  const soilAnchor = g2.anchors.find(a => a.pos[1] >= 308);
  check('土层锚杆长度=12', !!soilAnchor && soilAnchor.length === 12);
  const rockAnchor = g3.anchors.find(a => a.pos[1] < 296);
  check('中风化岩层锚杆长度=6', !!rockAnchor && rockAnchor.length === 6);
}

console.log('4) 土岩分界提示与加密');
{
  const state = makeProject();
  // 把覆盖层底高程抬到 314，使分界落在 g1（320→308）坡面内部
  state.config.layers[0].bottomElev = 314;
  state.config.frameRowSpacing = 5; // g1 斜长15，5m 整除 → 3 排等距，无排距错误
  const model = buildSlopeModel(state.config);
  const face1 = model.faces[0];
  check('第1级坡内部存在土岩分界交点', face1.boundaryS !== null && face1.boundaryS! > 0 && face1.boundaryS! < face1.slopeLength);
  let issues = validate(state.config, model, state.intents);
  const warnBefore = issues.some(i => i.level === 'warn' && i.gradeId === 'g1');
  check('未加密时给出分界警告', warnBefore, JSON.stringify(issues.filter(i => i.gradeId === 'g1')));
  // 执行加密
  state.intents.densified.g1 = true;
  const eng = rebuildComponents(state.config, model, state.intents);
  const f1 = eng.components.frames.find(f => f.gradeId === 'g1')!;
  check('加密后含 densified 锚杆', f1.anchors.some(a => a.densified));
  check('加密后排数增加（插入分界排）', f1.rowCount > 3, `rowCount=${f1.rowCount}`);
  issues = validate(state.config, model, state.intents);
  check('加密后无 g1 分界警告', !issues.some(i => i.level === 'warn' && i.gradeId === 'g1'));
}

console.log('5) 工程量统计');
{
  const state = makeProject();
  const model = buildSlopeModel(state.config);
  const eng = rebuildComponents(state.config, model, state.intents);
  state.components = eng.components;
  const t = summarize(eng.components);
  check('锚杆根数>0', t.anchorCount > 0);
  check('混凝土总量=框架+截水沟+护面墙',
    Math.abs(t.concreteTotal - (t.frameConcrete + t.ditchConcrete + t.wallConcrete)) < 1e-6);
  check('钢筋吨位>0', t.steelTotal > 0);
  const rows = buildBillRows(state);
  check('清单含锚杆/框架/截水沟条目', rows.some(r => r.name.includes('锚杆')) && rows.some(r => r.name.includes('截水沟')));
}

console.log('6) 护面墙与监测点工程量');
{
  const state = makeProject();
  state.intents.frameEnabled = { g1: false, g2: false, g3: false };
  state.intents.ditches = [];
  state.intents.walls = [{ id: 'w1', gradeId: 'g2', startX: 10, endX: 70 }];
  state.intents.monitors = [{ id: 'm1', gradeId: 'g1', x: 30, s: 5, kind: '深部位移孔', code: 'JC001' }];
  const model = buildSlopeModel(state.config);
  const eng = rebuildComponents(state.config, model, state.intents);
  check('护面墙方量=长×高×厚', Math.abs(eng.components.walls[0].concrete - 60 * 12 * 0.5) < 1e-6);
  check('监测点生成且高程正确', eng.components.monitors[0].code === 'JC001' && eng.components.monitors[0].pos[1] > 0);
}

console.log('7) 验收批次流转与看板');
{
  const state = makeProject();
  const model = buildSlopeModel(state.config);
  const eng = rebuildComponents(state.config, model, state.intents);
  state.components = eng.components;
  const b = declareBatch(state, 'g1', 'frame', '一班');
  check('申报后状态=submitted', b.status === 'submitted');
  check('批次编号 P1-01', b.code === 'P1-01');
  check('工程量快照含锚杆数', b.snapshot.anchorCount > 0);
  check('应完成日期=申报+7天', Math.abs(new Date(b.dueAt!).getTime() - new Date(b.submittedAt!).getTime() - 7 * 86400000) < 1000);
  check('新批次未超期', !isOverdue(b));
  state.batches.push(b);
  // 监理退回（无整改说明应被 UI 拦截，这里直接给说明）
  const rejected = rejectBatch(b, '间距偏差', '重新校正框架定位');
  check('退回后状态=rejected 且有整改说明', rejected.status === 'rejected' && rejected.rectification.length > 0);
  // 重新申报
  const resub = rejectBatch(b, 'x', 'y');
  void resub;
  // 签认
  const approved = approveBatch(b, '合格');
  check('签认后状态=approved', approved.status === 'approved' && !!approved.approvedAt);
  const d = dashboard({ ...state, batches: [approved] });
  check('看板统计已签认=1', d.approved === 1);
  check('各级完成比例 g1=100%', d.progress.find(p => p.gradeId === 'g1')!.ratio === 1);
  // 超期批次
  const overdue = { ...b, status: 'submitted' as const, dueAt: new Date(Date.now() - 86400000).toISOString() };
  check('超期判定生效', isOverdue(overdue));
}

console.log(`\n结果：${pass} 通过，${fail} 失败`);
if (fail) process.exit(1);
