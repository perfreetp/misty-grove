import type { BatchStatus, DefectType, Role } from '../types';

export const DEFECT_META: Record<
  DefectType,
  { label: string; code: string; color: string; hard: boolean; counted: boolean; desc: string }
> = {
  insufficient_solder: {
    label: '少锡',
    code: 'IS',
    color: '#f6b73c',
    hard: false,
    counted: true,
    desc: '焊料不足、fillet 未成形',
  },
  cold_joint: {
    label: '虚焊',
    code: 'CJ',
    color: '#ff7a6b',
    hard: false,
    counted: true,
    desc: '润湿不良 / 冷焊，焊点发暗',
  },
  offset: {
    label: '偏移',
    code: 'OF',
    color: '#56a8ff',
    hard: true,
    counted: true,
    desc: '元件本体偏离焊盘中心',
  },
  bridging: {
    label: '连锡',
    code: 'BR',
    color: '#ff5fa2',
    hard: true,
    counted: true,
    desc: '相邻焊盘之间搭锡短路',
  },
  false_call: {
    label: '误报',
    code: 'FC',
    color: '#94a3a0',
    hard: false,
    counted: false,
    desc: '焊点正常，程序误判',
  },
};

export const DEFECT_ORDER: DefectType[] = [
  'insufficient_solder',
  'cold_joint',
  'offset',
  'bridging',
  'false_call',
];

export const MACHINE_TYPES = ['insufficient_solder', 'cold_joint', 'offset', 'bridging'] as const;
export type MachineType = (typeof MACHINE_TYPES)[number];

export const STATUS_META: Record<
  BatchStatus,
  { label: string; color: string; bg: string; step: number }
> = {
  pending: { label: '待复判', color: '#b6c2bc', bg: 'rgba(182,194,188,.12)', step: 1 },
  reviewing: { label: '复判中', color: '#5cb2ff', bg: 'rgba(92,178,255,.13)', step: 2 },
  awaiting_release: { label: '待放行', color: '#ffc857', bg: 'rgba(255,200,87,.13)', step: 3 },
  released: { label: '已放行', color: '#3ddc97', bg: 'rgba(61,220,151,.13)', step: 4 },
};

export const STATUS_FLOW: BatchStatus[] = ['pending', 'reviewing', 'awaiting_release', 'released'];

export const ROLE_META: Record<Role, { label: string; short: string; color: string }> = {
  rechecker: { label: '复判员', short: '复判', color: '#5cb2ff' },
  supervisor: { label: '品质主管', short: '主管', color: '#ffc857' },
  engineer: { label: '品质工程', short: '工程', color: '#b7a1ff' },
};

export const RETURN_CATEGORIES = [
  '缺陷类型判定偏差',
  '标注位置/尺寸错误',
  '漏判申诉成立',
  '阈值执行不符合规范',
  '图像版本使用不当',
  '其他',
];

export function typeLabel(t: DefectType): string {
  return DEFECT_META[t].label;
}
