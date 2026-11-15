// 内置增强预设与默认参数

import type { EnhanceParams, EnhancePreset } from '../types';
import { uid } from '../utils/geometry';

// 假彩色矩阵（行主序存储，上传时转 mat3 列主序）
// 行 = 输出 R/G/B，列 = 输入 R/G/B
export const PRESETS: Omit<EnhancePreset, 'id' | 'usageCount' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: '标准白光',
    builtin: true,
    colorMatrix: [1, 0, 0, 0, 1, 0, 0, 0, 1],
    vesselGain: 0.6,
    saturation: 1.15,
    contrast: 1.05,
    greenBoost: 0.1,
  },
  {
    name: 'NBI 血管增强',
    builtin: true,
    // NBI 下黏膜偏棕，血管显棕褐色：压低红、强调绿蓝
    colorMatrix: [0.55, 0.25, 0.0, 0.15, 0.95, 0.2, 0.1, 0.35, 0.9],
    vesselGain: 1.6,
    saturation: 1.35,
    contrast: 1.15,
    greenBoost: 0.55,
  },
  {
    name: '靛胭脂染色模拟',
    builtin: true,
    // 蓝色素沉着效果：蓝通道叠加明度
    colorMatrix: [0.35, 0.25, 0.1, 0.25, 0.45, 0.25, 0.35, 0.6, 0.85],
    vesselGain: 1.0,
    saturation: 1.5,
    contrast: 1.2,
    greenBoost: 0.25,
  },
  {
    name: '醋酸染色模拟',
    builtin: true,
    // 白化+对比度提升，凸显腺管结构
    colorMatrix: [0.85, 0.35, 0.2, 0.3, 0.9, 0.3, 0.25, 0.35, 0.85],
    vesselGain: 0.4,
    saturation: 0.75,
    contrast: 1.35,
    greenBoost: 0.05,
  },
];

export function defaultParams(): EnhanceParams {
  const p = PRESETS[0];
  return {
    colorMatrix: [...p.colorMatrix],
    vesselGain: p.vesselGain,
    saturation: p.saturation,
    contrast: p.contrast,
    greenBoost: p.greenBoost,
  };
}

export function makePreset(name: string, params: EnhanceParams): EnhancePreset {
  const now = Date.now();
  return {
    id: uid('preset'),
    name,
    builtin: false,
    colorMatrix: [...params.colorMatrix],
    vesselGain: params.vesselGain,
    saturation: params.saturation,
    contrast: params.contrast,
    greenBoost: params.greenBoost,
    usageCount: 0,
    createdAt: now,
    updatedAt: now,
  };
}

/** 行主序 9 元素 → 列主序（WebGL uniformMatrix3fv 要求） */
export function rowMajorToMat3(m: number[]): number[] {
  // 输入 [r0c0,r0c1,r0c2, r1c0,...]，mat3 列主序需要 [r0c0,r1c0,r2c0, r0c1,...]
  const out = new Array(9);
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      out[col * 3 + row] = m[row * 3 + col];
    }
  }
  return out;
}
