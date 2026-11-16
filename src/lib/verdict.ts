import type { Annotation, DefectType, Thresholds } from '../types';
import { DEFECT_META, DEFECT_ORDER } from './defects';

export function emptyCounts(): Record<DefectType, number> {
  return {
    insufficient_solder: 0,
    cold_joint: 0,
    offset: 0,
    bridging: 0,
    false_call: 0,
  };
}

export function countAnnotations(annotations: Annotation[]): Record<DefectType, number> {
  const counts = emptyCounts();
  for (const a of annotations) {
    if (a.status !== 'active') continue;
    counts[a.type] += 1;
  }
  return counts;
}

export interface VerdictResult {
  verdict: 'pass' | 'rework';
  counts: Record<DefectType, number>;
  reasons: string[];
}

/**
 * 按缺陷类型阈值判定单板是否过站。
 * 规则：任一计入判定的缺陷数量 > 该类型阈值 → 返修。
 * 连锡、偏移为硬性规则：超过 2 处直接判返修，配置的阈值只能更严格（≤2），不能放宽。
 */
export const HARD_LIMIT = 2;

export function effectiveLimit(type: DefectType, thresholds: Thresholds): number | null {
  const meta = DEFECT_META[type];
  if (!meta.counted) return null;
  const configured = thresholds[type as keyof Thresholds] as number;
  return meta.hard ? Math.min(HARD_LIMIT, configured) : configured;
}

export function evaluateVerdict(
  annotations: Annotation[],
  thresholds: Thresholds,
): VerdictResult {
  const counts = countAnnotations(annotations);
  const reasons: string[] = [];
  for (const type of DEFECT_ORDER) {
    const meta = DEFECT_META[type];
    const limit = effectiveLimit(type, thresholds);
    if (limit === null) continue;
    const count = counts[type];
    if (count > limit) {
      reasons.push(
        `${meta.label} ${count} 处，超过阈值 ${limit} 处${meta.hard ? '（硬性规则，直接返修）' : ''}`,
      );
    }
  }
  return { verdict: reasons.length > 0 ? 'rework' : 'pass', counts, reasons };
}

/** 放行抽检下限：方案要求不低于 5% */
export const MIN_SAMPLE_RATIO = 0.05;

export function effectiveSampleRatio(thresholds: Thresholds): number {
  return Math.max(MIN_SAMPLE_RATIO, thresholds.sampleRatio);
}

export function requiredSampleCount(boardCount: number, thresholds: Thresholds): number {
  return Math.max(1, Math.ceil(boardCount * effectiveSampleRatio(thresholds)));
}
