// 核心计算逻辑验证：比例尺换算、长/短径、面积、取材对账
// 运行：npx tsx tests/geometry.test.ts（无框架，纯断言）

import {
  convexHull,
  diameterNorm,
  dist,
  measureCase,
  minBoundingRectNorm,
  mmPerPixel,
  polygonAreaNorm,
  reconcileBlocks,
} from '../src/utils/geometry';
import type { Calibration, Polygon, SpecimenBlock } from '../src/types';

let passed = 0;
let failed = 0;

function assert(cond: boolean, msg: string): void {
  if (cond) {
    passed += 1;
    console.log(`  ✓ ${msg}`);
  } else {
    failed += 1;
    console.error(`  ✗ ${msg}`);
  }
}

function approx(a: number, b: number, tol = 0.05): boolean {
  return Math.abs(a - b) <= tol;
}

// 1000x750 图像上，标定线从 (0.25,0.5) 到 (0.75,0.5)，即 500 px = 10 mm → 0.02 mm/px
const cal: Calibration = {
  id: 'cal1',
  name: 'test',
  p1: { x: 0.25, y: 0.5 },
  p2: { x: 0.75, y: 0.5 },
  knownLengthMm: 10,
  createdAt: 0,
};

console.log('比例尺:');
const scale = mmPerPixel(cal, 1000, 750);
assert(approx(scale, 0.02), `mm/px = 0.02，实际 ${scale}`);

// 矩形病变：归一化 (0.2,0.2)-(0.6,0.6)，在 1000x750 图上为 400x300 px → 8x6 mm，面积 48 mm²
const lesion: Polygon = {
  id: 'l',
  kind: 'lesion',
  points: [
    { x: 0.2, y: 0.2 },
    { x: 0.6, y: 0.2 },
    { x: 0.6, y: 0.6 },
    { x: 0.2, y: 0.6 },
  ],
  createdAt: 0,
  updatedAt: 0,
};

console.log('多边形面积:');
assert(approx(polygonAreaNorm(lesion.points), 0.16), `归一化面积 = 0.16，实际 ${polygonAreaNorm(lesion.points)}`);

console.log('凸包/直径:');
const hull = convexHull(lesion.points);
assert(hull.length === 4, `矩形凸包 4 个顶点，实际 ${hull.length}`);
assert(approx(diameterNorm(hull), Math.hypot(0.4, 0.4), 1e-9), '凸包直径 = 对角线');

console.log('最小外接矩形:');
const mbr = minBoundingRectNorm(hull);
assert(approx(mbr.long, 0.4, 1e-9) && approx(mbr.short, 0.4, 1e-9), `归一化外接矩形 0.4/0.4，实际 ${mbr.long}/${mbr.short}`);

console.log('病例测量（mm 物理空间，各向异性正确）:');
const m = measureCase({ lesion, calibration: cal, imgW: 1000, imgH: 750 });
assert(m.calibrated, '标定有效');
assert(approx(m.longAxisMm, 8), `长径 8mm，实际 ${m.longAxisMm}`);
assert(approx(m.shortAxisMm, 6), `短径 6mm，实际 ${m.shortAxisMm}`);
assert(approx(m.areaMm2, 48), `面积 48mm²，实际 ${m.areaMm2}`);

// 切开线：(0.15,0.15)-(0.65,0.65)，500x375 px → 10x7.5 mm = 75 mm²
const incision: Polygon = {
  id: 'i',
  kind: 'incision',
  points: [
    { x: 0.15, y: 0.15 },
    { x: 0.65, y: 0.15 },
    { x: 0.65, y: 0.65 },
    { x: 0.15, y: 0.65 },
  ],
  createdAt: 0,
  updatedAt: 0,
};
const m2 = measureCase({ lesion, incision, calibration: cal, imgW: 1000, imgH: 750 });
assert(approx(m2.incisionAreaMm2, 75), `切开面积 75mm²，实际 ${m2.incisionAreaMm2}`);

console.log('取材对账:');
// 够覆盖：2 块 8x8 = 128 mm² ≥ 75，块长 8 ≥ 长径 8
const enough: SpecimenBlock[] = [
  { id: 'b1', lengthMm: 8, widthMm: 8 },
  { id: 'b2', lengthMm: 8, widthMm: 8 },
];
const r1 = reconcileBlocks(enough, m2);
assert(r1.passed === true, '128mm² 取材覆盖 75mm² 切开线 → 通过');
assert(r1.areaCovered && r1.longAxisCovered, '面积与长径均覆盖');

// 盖不住：1 块 5x5 = 25 mm² < 75
const tooSmall: SpecimenBlock[] = [{ id: 'b3', lengthMm: 5, widthMm: 5 }];
const r2 = reconcileBlocks(tooSmall, m2);
assert(r2.passed === false, '25mm² 盖不住 75mm² → 不通过');
assert(r2.areaCovered === false, '面积未覆盖标记正确');
assert(r2.warnings.some((w) => w.includes('盖不住')), '产生盖不住切开线警告');

// 长径不够：面积够但块长 < 8mm
const shortBlocks: SpecimenBlock[] = [
  { id: 'b4', lengthMm: 6, widthMm: 10 },
  { id: 'b5', lengthMm: 6, widthMm: 10 },
];
const r3 = reconcileBlocks(shortBlocks, m2);
assert(r3.areaCovered === true, '120mm² 面积够覆盖 75mm²');
assert(r3.longAxisCovered === false, '最长块 6mm < 长径 8mm → 长径未覆盖');
assert(r3.passed === false, '综合不通过');

// 无标定时对账应安全失败
const r4 = reconcileBlocks(enough, null);
assert(r4.passed === false && r4.warnings.length > 0, '无测量数据时安全失败并给警告');

console.log('距离工具:');
assert(approx(dist({ x: 0, y: 0 }, { x: 3, y: 4 }), 5), '3-4-5 距离');

console.log(`\n结果：${passed} 通过，${failed} 失败`);
if (failed > 0) process.exit(1);
