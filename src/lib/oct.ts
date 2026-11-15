// OCT 体数据（程序化模拟）、自动分层、厚度/象限统计
import type { Device, Layers, LayerCurve, LayerKind, LayerTemplate, Visit } from '../types';
import { clamp, mean, mulberry32, smoothCurve, smoothNoise } from './util';

export const VOL = { width: 256, height: 256, slices: 64, scaleZum: 2.0, scaleXum: 4.0 };

export interface QuadStat {
  quad: 'ST' | 'SN' | 'IT' | 'IN'; // 颞上/鼻上/颞下/鼻下（演示固定布局）
  label: string;
  meanUm: number;
  minUm: number;
  breaks: number;
  cols: number;
}

export const QUAD_LABEL: Record<QuadStat['quad'], string> = {
  ST: '颞上',
  SN: '鼻上',
  IT: '颞下',
  IN: '鼻下',
};

/** 自动分层：按模板参数对一次访视的体数据生成三条分层线（每帧一条曲线，扁平化存储） */
export function autoSegment(
  seed: number,
  thicknessBiasUm: number,
  trueBreaks: string[],
  device: Device,
  template: LayerTemplate,
): Layers {
  const { width, height, slices, scaleZum } = device;
  const breakSet = new Set(trueBreaks);
  const ilm: LayerCurve[] = [];
  const gcl: LayerCurve[] = [];
  const lc: LayerCurve[] = [];

  for (let s = 0; s < slices; s++) {
    const n1 = smoothNoise(mulberry32(seed + s * 7919), width, 4);
    const n2 = smoothNoise(mulberry32(seed + s * 104729 + 13), width, 3);
    const n3 = smoothNoise(mulberry32(seed + s * 40503 + 7), width, 2);
    const cx = width / 2;
    // 中心凹凹陷（中间帧最深，向两侧帧变浅）
    const foveaStrength = 1 - Math.abs(s - slices / 2) / (slices / 2);

    const ilmRow: LayerCurve = new Array(width);
    const gclRow: LayerCurve = new Array(width);
    const lcRow: LayerCurve = new Array(width);

    const biasPx = thicknessBiasUm / scaleZum;
    for (let x = 0; x < width; x++) {
      const fovea = Math.exp(-Math.pow((x - cx) / (width * 0.09), 2)) * 26 * foveaStrength;
      const ilmDepth = 42 + n1[x] * 7 - fovea + n3[x] * 2;
      const gclDepth = ilmDepth + 34 + n2[x] * 5 + biasPx * 0.45;
      const lcDepth = height * template.lcDepthRatio + n3[x] * 9 + n1[x] * 3 + biasPx;
      ilmRow[x] = clamp(ilmDepth, 4, height - 4);
      gclRow[x] = clamp(gclDepth, ilmDepth + 6, height - 8);
      lcRow[x] = clamp(lcDepth, gclDepth + 10, height - 2);
    }
    ilm.push(smoothCurve(ilmRow, template.smoothWindow.ILM));
    gcl.push(smoothCurve(gclRow, template.smoothWindow.GCL));
    lc.push(smoothCurve(lcRow, template.smoothWindow.LC));

    // 断裂检出：灵敏度越高，断裂邻域被置空的列越多
    const gap = Math.round(2 + template.breakSensitivity * 6);
    for (const key of breakSet) {
      const [bs, bc] = key.split(':').map(Number);
      if (bs !== s) continue;
      for (const layer of [ilm, gcl, lc]) {
        const row = layer[layer.length - 1];
        for (let x = bc - gap; x <= bc + gap; x++) {
          if (x >= 0 && x < width) row[x] = null;
        }
      }
    }
  }
  return { ILM: ilm.flat(), GCL: gcl.flat(), LC: lc.flat() };
}

function sliceCurve(layers: Layers, kind: LayerKind, slice: number): LayerCurve {
  return layers[kind].slice(slice * VOL.width, (slice + 1) * VOL.width);
}

/** 神经节细胞复合体厚度（ILM→GCL），单位微米；断裂处记 null */
export function thicknessGridUm(visit: Visit, scaleZum: number): (number | null)[][] {
  if (!visit.layers) return [];
  const grid: (number | null)[][] = [];
  for (let s = 0; s < VOL.slices; s++) {
    const a = sliceCurve(visit.layers, 'ILM', s);
    const b = sliceCurve(visit.layers, 'GCL', s);
    grid.push(
      a.map((v, x) => (v == null || b[x] == null ? null : Math.abs((b[x] as number) - v) * scaleZum)),
    );
  }
  return grid;
}

/** 四象限统计（以网格中心切分，上/下半 × 左/右半） */
export function quadStats(visit: Visit, scaleZum: number): QuadStat[] {
  const grid = thicknessGridUm(visit, scaleZum);
  if (!grid.length) return [];
  const halfS = VOL.slices / 2;
  const halfX = VOL.width / 2;
  const buckets: Record<QuadStat['quad'], (number | null)[]> = { ST: [], SN: [], IT: [], IN: [] };
  const breakBuckets: Record<QuadStat['quad'], number> = { ST: 0, SN: 0, IT: 0, IN: 0 };
  for (let s = 0; s < VOL.slices; s++) {
    for (let x = 0; x < VOL.width; x++) {
      const top = s < halfS;
      const left = x < halfX;
      const quad: QuadStat['quad'] = top ? (left ? 'ST' : 'SN') : left ? 'IT' : 'IN';
      const v = grid[s][x];
      buckets[quad].push(v);
      if (v == null) breakBuckets[quad]++;
    }
  }
  return (Object.keys(buckets) as QuadStat['quad'][]).map((quad) => {
    const vals = buckets[quad].filter((v): v is number => v != null);
    return {
      quad,
      label: QUAD_LABEL[quad],
      meanUm: vals.length ? mean(vals) : 0,
      minUm: vals.length ? vals.reduce((m, v) => Math.min(m, v), Infinity) : 0,
      breaks: breakBuckets[quad],
      cols: buckets[quad].length,
    };
  });
}

export interface QuadCompare {
  quad: QuadStat['quad'];
  label: string;
  current: number;
  previous: number | null;
  deltaUm: number | null; // 负=变薄
  hasBreak: boolean;
  flagged: boolean; // 变薄 >5µm 或存在断裂
  reason: string;
}

export const THIN_THRESHOLD_UM = 5;

/** 与上一次随访的象限级差分 */
export function compareQuads(current: Visit, previous: Visit | null, scaleZum: number): QuadCompare[] {
  const cur = quadStats(current, scaleZum);
  const prev = previous ? quadStats(previous, scaleZum) : [];
  return cur.map((c) => {
    const p = prev.find((q) => q.quad === c.quad) ?? null;
    const delta = p ? c.meanUm - p.meanUm : null;
    const thin = delta != null && delta <= -THIN_THRESHOLD_UM;
    const hasBreak = c.breaks > 0;
    const reasons: string[] = [];
    if (thin) reasons.push(`变薄 ${Math.abs(delta as number).toFixed(1)}µm(>5µm)`);
    if (hasBreak) reasons.push(`分层断裂 ${c.breaks} 点`);
    return {
      quad: c.quad,
      label: c.label,
      current: c.meanUm,
      previous: p?.meanUm ?? null,
      deltaUm: delta,
      hasBreak,
      flagged: thin || hasBreak,
      reason: reasons.join('；') || '无异常',
    };
  });
}

/** 整眼平均厚度趋势 */
export function meanThicknessUm(visit: Visit, scaleZum: number): number {
  const grid = thicknessGridUm(visit, scaleZum);
  const vals = grid.flat().filter((v): v is number => v != null);
  return vals.length ? mean(vals) : 0;
}

/** 生成单帧 B 扫描的灰度像素（LUMINANCE 单通道纹理），含与分层一致的条带回声 */
export function generateBScanPixels(visit: Visit, slice: number, scaleZum: number): Uint8Array {
  const { width, height } = VOL;
  const rand = mulberry32(visit.seed + slice * 131071 + 3);
  const noiseBase = smoothNoise(mulberry32(visit.seed + slice * 17 + 5), width, 5);
  const out = new Uint8Array(width * height);
  const ilm = visit.layers ? sliceCurve(visit.layers, 'ILM', slice) : null;
  const gcl = visit.layers ? sliceCurve(visit.layers, 'GCL', slice) : null;
  const lc = visit.layers ? sliceCurve(visit.layers, 'LC', slice) : null;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const depth = y / height;
      let g = 30 * (1 - depth * 0.55) + noiseBase[x] * 10 + rand() * 26;
      if (ilm && gcl && lc) {
        const iv = ilm[x];
        const gv = gcl[x];
        const lv = lc[x];
        // 神经上皮条带（ILM-GCL 之间）稍亮
        if (iv != null && gv != null && y > iv && y < gv) g += 34;
        // 各边界高反射亮线
        for (const edge of [iv, gv, lv]) {
          if (edge != null && Math.abs(y - edge) <= 1.4) g += 95;
        }
        // 筛板下方阴影衰减
        if (lv != null && y > lv + 6) g *= 0.55;
      }
      out[y * width + x] = clamp(g, 0, 255);
    }
  }
  void scaleZum;
  return out;
}

/** 无分层时的占位 B 扫描（仅散斑），用于待分层访视的预览 */
export function generateRawPixels(seed: number, slice: number): Uint8Array {
  const { width, height } = VOL;
  const rand = mulberry32(seed + slice * 131071 + 3);
  const drift = smoothNoise(mulberry32(seed + slice * 17 + 5), width, 5);
  const out = new Uint8Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const depth = y / height;
      const band = Math.exp(-Math.pow((y - (70 + drift[x] * 12)) / 22, 2)) * 60;
      const g = 24 * (1 - depth * 0.5) + band + rand() * 28;
      out[y * width + x] = clamp(g, 0, 255);
    }
  }
  return out;
}
