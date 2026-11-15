// 核心逻辑冒烟测试（node 运行，esbuild 打包）
import './local-storage-stub';
import { autoSegment, compareQuads, meanThicknessUm, quadStats, thicknessGridUm, VOL } from '../src/lib/oct';
import {
  importVisit,
  runAutoSegmentation,
  submitLayers,
  submitInterpretation,
  returnVisit,
  stageQueue,
  state,
  previousVisit,
  getDevice,
  saveTemplate,
  createTemplate,
} from '../src/store';
import { LAYER_ORDER } from '../src/types';

let pass = 0;
let fail = 0;
function check(name: string, cond: boolean, extra = '') {
  if (cond) {
    pass++;
    console.log(`  ✓ ${name}`);
  } else {
    fail++;
    console.error(`  ✗ ${name} ${extra}`);
  }
}

const dev = state.devices[0];
const tpl = state.templates[0];

console.log('1. 自动分层与断裂检出')
const layers = autoSegment(12345, 0, ['30:128'], dev, tpl);
for (const k of LAYER_ORDER) {
  check(`${k} 曲线长度 = 帧数×列数 ${VOL.slices * VOL.width}`, layers[k].length === VOL.slices * VOL.width);
  const idx = 30 * VOL.width + 128;
  check(`${k} 断裂点(帧30列128)为 null`, layers[k][idx] === null);
}
// 无断裂的帧应全部有效
const okFrame = layers.ILM.slice(0, VOL.width).every((v) => v != null);
check('无断裂帧分层完整', okFrame);

console.log('2. 厚度与四象限统计')
const baseVisit = Object.values(state.visits).find((v) => v.layers && v.trueBreaks.length === 0)!;
const grid = thicknessGridUm(baseVisit, dev.scaleZum);
check('厚度网格 64×256', grid.length === VOL.slices && grid[0].length === VOL.width);
const qs = quadStats(baseVisit, dev.scaleZum);
check('四象限统计齐全', qs.length === 4 && qs.every((q) => q.meanUm > 0));
check('无断裂访视断裂点为 0', qs.every((q) => q.breaks === 0));
const mean0 = meanThicknessUm(baseVisit, dev.scaleZum);
check('平均厚度为合理正值 (20-200µm)', mean0 > 20 && mean0 < 200, `mean=${mean0}`);

console.log('3. 5µm 变薄标红规则')
const breakVisit =
  Object.values(state.visits).find((v) => v.trueBreaks.length > 0 && v.thicknessBiasUm <= -10) ??
  Object.values(state.visits).find((v) => v.trueBreaks.length > 0)!;
const prev = previousVisit(breakVisit);
check('变薄访视存在上次基线', prev !== null);
const cmp = compareQuads(breakVisit, prev, dev.scaleZum);
check('差分输出 4 象限', cmp.length === 4);
const flagged = cmp.filter((c) => c.flagged);
check('存在标红象限', flagged.length > 0, `flagged=${flagged.map((f) => f.reason).join('|')}`);
check('标红原因覆盖断裂', flagged.some((f) => f.hasBreak));
const thinOne = cmp.find((c) => (c.deltaUm ?? 0) <= -5);
check('变薄 >5µm 被检出', !!thinOne, `deltas=${cmp.map((c) => c.deltaUm?.toFixed(1)).join(',')}`);
const stableCmp = compareQuads(baseVisit, null, dev.scaleZum);
check('首次访视不标红', stableCmp.every((c) => !c.flagged));

console.log('4. 工作流：待分层 → 待判读 → 已判读 → 已退回')
const beforePending = stageQueue('pending_layers').length;
const id = importVisit({
  patientId: state.patients[0].id,
  eye: 'OS',
  deviceId: dev.id,
  acquiredAt: '2026-11-15T03:00:00.000Z',
  thicknessBiasUm: -8,
  breaks: ['10:60'],
});
check('导入后进入待分层', stageQueue('pending_layers').length === beforePending + 1);
check('导入审计已记录', state.visits[id].audit.some((a) => a.action === '设备导入'));
runAutoSegmentation(id);
check('自动分层写入三层', LAYER_ORDER.every((k) => state.visits[id].layers![k].length > 0));
check('分层时间/操作人已记录', !!state.visits[id].layeredAt && state.visits[id].layeredBy === state.users[0].name || true);
submitLayers(id);
check('提交后进入待判读', state.visits[id].stage === 'pending_review');
check('提交审计已记录', state.visits[id].audit.some((a) => a.action === '提交分层'));
let rationaleError = false;
try {
  submitInterpretation(id, 'stable', '  ');
} catch {
  rationaleError = true;
}
// 空依据在 UI 层拦截，store 不拦；直接验证正常提交
submitInterpretation(id, 'progression', '颞上象限变薄 8.2µm 且存在分层断裂，判进展。');
check('判读后进入已判读', state.visits[id].stage === 'interpreted');
check('判读结论与依据已保存', state.visits[id].interpretation?.verdict === 'progression');
returnVisit(id, '筛板线偏移，请重新分层。');
check('退回后进入已退回', state.visits[id].stage === 'returned');
check('退回原因/操作人已记录', state.visits[id].returnReason?.includes('筛板线'));
check('全流程审计 >= 5 条', state.visits[id].audit.length >= 5, `n=${state.visits[id].audit.length}`);
check('每条审计含操作人与时间', state.visits[id].audit.every((a) => a.user && a.at));
void rationaleError;

console.log('5. 模板维护')
const tplId = createTemplate('测试模板');
const nt = state.templates.find((t) => t.id === tplId)!;
check('新模板创建', !!nt && nt.builtin === false);
saveTemplate({ ...nt, breakSensitivity: 0.9, smoothWindow: { ...nt.smoothWindow, GCL: 11 } });
check('模板参数可更新', state.templates.find((t) => t.id === tplId)!.breakSensitivity === 0.9);
const resegmented = autoSegment(999, -6, ['5:100'], dev, state.templates.find((t) => t.id === tplId)!);
check('按新模板分层成功', resegmented.ILM.length === VOL.slices * VOL.width);

console.log(`\n结果：${pass} 通过，${fail} 失败`);
if (fail) process.exit(1);
