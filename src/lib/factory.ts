// ===== 方案工厂与示例数据 =====
import type { Approach, Pier, Scheme } from '../types';
import { DEFAULT_GIRDER_DEPTH } from './constants';

let seq = 0;
export const uid = (prefix: string): string =>
  `${prefix}-${Date.now().toString(36)}-${(seq++).toString(36)}`;

export function makePier(x: number, name: string): Pier {
  return { id: uid('pier'), name, x, thickness: 1.4, width: 2.0 };
}

export function makeApproach(
  type: Approach['type'],
  side: Approach['side'],
  run: number,
): Approach {
  return {
    id: uid('ap'),
    type,
    side,
    run,
    width: type === 'ramp' ? 2.5 : 3.0,
  };
}

export function makeScheme(partial: Partial<Scheme> = {}): Scheme {
  const material = partial.material ?? 'steel';
  const roadElevation = partial.roadElevation ?? 45.0;
  const span = partial.span ?? 46;
  return {
    id: uid('sch'),
    name: partial.name ?? '新方案',
    status: 'draft',
    material,
    roadElevation,
    lanesPerSide: partial.lanesPerSide ?? 3,
    laneWidth: partial.laneWidth ?? 3.75,
    medianWidth: partial.medianWidth ?? 2.0,
    shoulderWidth: partial.shoulderWidth ?? 3.0,
    pipelines: partial.pipelines ?? [
      { id: uid('pipe'), name: '燃气管道保护带', xStart: -8.5, xEnd: -5.5 },
    ],
    // 默认梁底高出路面 5.2m，满足 5m 净空
    girderBottomElev: partial.girderBottomElev ?? roadElevation + 5.2,
    girderDepth: partial.girderDepth ?? DEFAULT_GIRDER_DEPTH[material],
    deckWidth: partial.deckWidth ?? 4.5,
    span,
    piers:
      partial.piers ?? [
        makePier(-span / 2 + 2.5, '左桥台'),
        makePier(span / 2 - 2.5, '右桥台'),
      ],
    approaches:
      partial.approaches ?? [
        makeApproach('stair', 'left', 22),
        makeApproach('stair', 'right', 22),
      ],
    approver: '',
    approvalDate: '',
    comments: [],
    history: [],
    preferred: false,
  };
}

/** 内置两个对比示例方案 */
export function sampleSchemes(): Scheme[] {
  const a = makeScheme({ name: '方案A · 钢箱梁 + 双侧梯道', material: 'steel' });
  const b = makeScheme({
    name: '方案B · 混凝土箱梁 + 坡道电梯',
    material: 'concrete',
  });
  b.girderDepth = DEFAULT_GIRDER_DEPTH.concrete;
  b.approaches = [
    makeApproach('ramp', 'left', 56),
    makeApproach('elevator', 'left', 0),
    makeApproach('stair', 'right', 22),
  ];
  // 故意给 B 留一个偏紧净空，演示校核标红/标黄
  b.girderBottomElev = b.roadElevation + 4.8;
  return [a, b];
}
