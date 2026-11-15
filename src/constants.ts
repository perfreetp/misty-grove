import type { ExamStatus, FindingType, Role, SegmentKey, ViewKey } from './types';

export const APP_NAME = 'Capsule Station';
export const APP_SUBTITLE = '消化内镜中心 · 胶囊内镜图像序列阅片与报告发布工作台';

export const USERS: { id: string; name: string; role: Role; title: string }[] = [
  { id: 'u-tech', name: '周敏', role: 'technician', title: '内镜技师 · 登记导入' },
  { id: 'u-read1', name: '林启航', role: 'reader', title: '阅片医师 · 主治' },
  { id: 'u-read2', name: '苏雅', role: 'reader', title: '阅片医师 · 住院' },
  { id: 'u-review', name: '陈思远', role: 'reviewer', title: '审核医师 · 副主任' },
];

export const READERS = USERS.filter((u) => u.role === 'reader');
export const REVIEWERS = USERS.filter((u) => u.role === 'reviewer');
export const DEFAULT_READER = READERS[0]!;
export const SECOND_READER = READERS[1]!;
export const DEFAULT_REVIEWER = REVIEWERS[0]!;

export const STATUS_META: Record<ExamStatus, { label: string; tone: string; short: string }> = {
  pending: { label: '待阅片', tone: 'slate', short: '待阅' },
  reading: { label: '阅片中', tone: 'cyan', short: '阅片中' },
  review: { label: '待审核', tone: 'amber', short: '待审' },
  returned: { label: '已退回', tone: 'rose', short: '退回' },
  published: { label: '已发布', tone: 'emerald', short: '已发布' },
};

export const FINDING_META: Record<FindingType, { label: string; color: string; soft: string; description: string }> = {
  bleeding: { label: '出血', color: '#f43f5e', soft: 'rgba(244,63,94,0.16)', description: '活动性渗血 / 血性内容物' },
  ulcer: { label: '溃疡', color: '#f59e0b', soft: 'rgba(245,158,11,0.16)', description: '黏膜破损伴白苔' },
  polyp: { label: '息肉', color: '#8b5cf6', soft: 'rgba(139,92,246,0.16)', description: '隆起性病变' },
  vascular: { label: '血管畸形', color: '#06b6d4', soft: 'rgba(6,182,212,0.16)', description: '血管丛扩张 / 动静脉畸形' },
};

export const FINDING_ORDER: FindingType[] = ['bleeding', 'ulcer', 'polyp', 'vascular'];

export const SEGMENT_META: Record<SegmentKey, { name: string; short: string; tint: string; border: string; lane: string; text: string }> = {
  esophagus: {
    name: '食管',
    short: '食管',
    tint: 'rgba(56,189,248,0.20)',
    border: 'rgba(56,189,248,0.75)',
    lane: 'rgba(56,189,248,0.11)',
    text: '#7dd3fc',
  },
  stomach: {
    name: '胃',
    short: '胃',
    tint: 'rgba(251,146,60,0.20)',
    border: 'rgba(251,146,60,0.75)',
    lane: 'rgba(251,146,60,0.11)',
    text: '#fdba74',
  },
  duodenum: {
    name: '十二指肠',
    short: '十二指肠',
    tint: 'rgba(163,230,53,0.18)',
    border: 'rgba(163,230,53,0.7)',
    lane: 'rgba(163,230,53,0.10)',
    text: '#bef264',
  },
  jejunum: {
    name: '空肠',
    short: '空肠',
    tint: 'rgba(45,212,191,0.18)',
    border: 'rgba(45,212,191,0.7)',
    lane: 'rgba(45,212,191,0.10)',
    text: '#5eead4',
  },
  ileum: {
    name: '回肠',
    short: '回肠',
    tint: 'rgba(196,181,253,0.18)',
    border: 'rgba(196,181,253,0.7)',
    lane: 'rgba(196,181,253,0.10)',
    text: '#c4b5fd',
  },
  colon: {
    name: '结肠',
    short: '结肠',
    tint: 'rgba(244,114,182,0.16)',
    border: 'rgba(244,114,182,0.65)',
    lane: 'rgba(244,114,182,0.09)',
    text: '#f9a8d4',
  },
};

export const SEGMENT_ORDER: SegmentKey[] = ['esophagus', 'stomach', 'duodenum', 'jejunum', 'ileum', 'colon'];

export const PLAYBACK_SPEEDS = [0.125, 0.25, 0.5, 1, 2, 4, 8] as const;

export const VIEW_META: Record<ViewKey, { label: string; icon: string; hint: string }> = {
  registry: { label: '登记导入', icon: 'registry', hint: '检查单登记 · 图像序列导入' },
  reading: { label: '时间轴阅片', icon: 'reading', hint: '逐帧浏览 · 分段定位 · 标记停顿' },
  lesions: { label: '病灶标注', icon: 'lesions', hint: '框选病灶 · 关键帧 · 肠段绑定' },
  report: { label: '报告审核', icon: 'report', hint: '结论汇总 · 审核发布 · 更正版本' },
  stats: { label: '阅片统计', icon: 'stats', hint: '阅片时长 · 检出数 · 退回率' },
};

export const MAX_SIZE_MM = 80;
