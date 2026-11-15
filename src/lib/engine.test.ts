// 引擎规则验证脚本：node --import tsx 无需额外测试框架
import { makeScheme, makePier } from './factory';
import {
  approachRise,
  approachSlope,
  calcClearance,
  calcMetrics,
  hasBlockingErrors,
  pierInCarriageway,
  pierInPipeline,
  roadGeometry,
  runChecks,
} from './engine';

let passed = 0;
const ok = (name: string, cond: boolean) => {
  if (!cond) throw new Error(`FAIL: ${name}`);
  passed++;
  console.log(`  ✓ ${name}`);
};

// 1. 道路几何：3 车道 ×3.75 + 3m 硬路肩 = 14.25m 半幅
const s = makeScheme();
const road = roadGeometry(s);
ok('单幅宽度=车道数×车道宽+硬路肩', Math.abs(road.roadwayHalfWidth - 14.25) < 1e-9);
ok('默认净空=5.2m', Math.abs(calcClearance(s) - 5.2) < 1e-9);
ok('默认方案无强制错误', !hasBlockingErrors(runChecks(s)));

// 2. 净空低于 5m → 错误并禁止提交
const low = makeScheme();
low.girderBottomElev = low.roadElevation + 4.9;
const lowIssues = runChecks(low);
ok('净空4.9m报CLEARANCE_LOW', lowIssues.some((i) => i.code === 'CLEARANCE_LOW' && i.level === 'error'));
ok('净空不足禁止提交', hasBlockingErrors(lowIssues));

// 3. 净空 5.2m 富余不足 → 警告而非错误
const tight = makeScheme();
tight.girderBottomElev = tight.roadElevation + 5.2;
ok('净空5.2m无错误', !runChecks(tight).some((i) => i.level === 'error'));

// 4. 墩位落在行车道 → 错误
const pierScheme = makeScheme();
const badPier = makePier(5, '违规墩'); // 5m 处位于右幅行车道(1m~14.25m)
ok('X=5m 判定在行车道内', pierInCarriageway(badPier, roadGeometry(pierScheme)));
pierScheme.piers.push(badPier);
ok('墩位占道报PIER_IN_LANE', runChecks(pierScheme).some((i) => i.code === 'PIER_IN_LANE'));

// 5. 墩位落在中央分隔带 → 合法
const medianPier = makePier(0, '中分带墩');
ok('X=0 中分带不占道', !pierInCarriageway(medianPier, roadGeometry(pierScheme)));

// 6. 墩位落入管线保护范围 → 错误
const pipePier = makePier(-7, '管线墩'); // 默认管线 -8.5~-5.5
ok('X=-7m 侵入默认管线', pierInPipeline(pipePier, pierScheme) === '燃气管道保护带');
pierScheme.piers.push(pipePier);
ok('侵入管线报PIER_IN_PIPELINE', runChecks(pierScheme).some((i) => i.code === 'PIER_IN_PIPELINE'));

// 7. 梯道陡于 1:4 → 警告；缓于等于 → 无警告
const steep = makeScheme();
steep.approaches = [{ id: 'a1', type: 'stair', side: 'left', run: 10, width: 3 }];
const rise = approachRise(steep); // 5.2+1.2+0.08 = 6.48m
ok('梯道坡度计算正确', Math.abs((approachSlope(steep, steep.approaches[0]) ?? 0) - rise / 10) < 1e-9);
ok('10m梯道陡于1:4报SLOPE_STEEP', runChecks(steep).some((i) => i.code === 'SLOPE_STEEP' && i.level === 'warning'));
const gentle = makeScheme();
gentle.approaches = [{ id: 'a2', type: 'stair', side: 'left', run: 30, width: 3 }, { id: 'a3', type: 'stair', side: 'right', run: 30, width: 3 }];
ok('30m梯道不陡于1:4无坡度警告', !runChecks(gentle).some((i) => i.code === 'SLOPE_STEEP'));

// 8. 坡道阈值 1:10
const rampScheme = makeScheme();
rampScheme.approaches = [{ id: 'r1', type: 'ramp', side: 'left', run: 40, width: 2.5 }];
ok('40m坡道(1:6.2)陡于1:10报警告', runChecks(rampScheme).some((i) => i.code === 'SLOPE_STEEP'));

// 9. 缺侧接入设施 → 警告
const oneSide = makeScheme();
oneSide.approaches = [{ id: 'o1', type: 'stair', side: 'left', run: 30, width: 3 }];
ok('缺右侧设施报APPROACH_MISSING', runChecks(oneSide).some((i) => i.code === 'APPROACH_MISSING'));

// 10. 指标计算：钢方案钢材 > 0，混凝土方案钢筋计入钢材
const steelM = calcMetrics(makeScheme({ material: 'steel' }));
const concM = calcMetrics(makeScheme({ material: 'concrete' }));
ok('钢箱梁方案有型钢用量', steelM.steelTons > 20);
ok('混凝土方案含钢筋用量', concM.steelTons > 5);
ok('混凝土方案有混凝土方量', concM.concreteM3 > 30);
ok('钢方案造价与混凝土方案均为正', steelM.costWan > 0 && concM.costWan > 0);
ok('混凝土封闭工期长于钢箱梁', concM.closureDays > steelM.closureDays);
ok('占地为正值', steelM.footprintM2 > 0);

// 11. 电梯不计坡度
const elev = makeScheme();
elev.approaches = [
  { id: 'e1', type: 'elevator', side: 'left', run: 0, width: 2.6 },
  { id: 'e2', type: 'elevator', side: 'right', run: 0, width: 2.6 },
];
ok('电梯方案无坡度警告', !runChecks(elev).some((i) => i.code === 'SLOPE_STEEP'));
ok('电梯方案无强制错误', !hasBlockingErrors(runChecks(elev)));

console.log(`\n全部 ${passed} 项引擎规则测试通过`);
