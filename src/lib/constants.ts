// ===== 工程估算参数（可按地方定额调整） =====
import type { Material } from '../types';

/** 净空控制标准（米） */
export const MIN_CLEARANCE = 5.0;
/** 净空富余提示线（米） */
export const CLEARANCE_WARN = 5.5;

/** 梯道坡度提示阈值（陡于 1:4 即 0.25） */
export const STAIR_SLOPE_LIMIT = 1 / 4;
/** 坡道坡度提示阈值（陡于 1:10 即 0.10） */
export const RAMP_SLOPE_LIMIT = 1 / 10;

export interface MaterialSpec {
  label: string;
  /** 主梁每平米桥面综合钢耗（吨/㎡，仅钢箱梁用） */
  steelPerM2: number;
  /** 混凝土梁体每平米桥面混凝土（m³/㎡） */
  concretePerM2: number;
  /** 混凝土方案钢筋含量（吨/m³ 混凝土） */
  rebarPerM3: number;
  /** 梁体综合单价（万元/㎡ 桥面） */
  girderPricePerM2: number;
  /** 桥面系（铺装、栏杆、照明）综合单价（万元/㎡） */
  deckPricePerM2: number;
  /** 封闭施工基础天数 */
  closureBase: number;
  /** 每米跨径增加封闭天数 */
  closurePerSpanM: number;
}

export const MATERIAL_SPECS: Record<Material, MaterialSpec> = {
  steel: {
    label: '钢箱梁',
    steelPerM2: 0.32,
    concretePerM2: 0,
    rebarPerM3: 0,
    girderPricePerM2: 0.28,
    deckPricePerM2: 0.09,
    closureBase: 8,
    closurePerSpanM: 0.08,
  },
  concrete: {
    label: '混凝土箱梁',
    steelPerM2: 0,
    concretePerM2: 0.55,
    rebarPerM3: 0.14,
    girderPricePerM2: 0.17,
    deckPricePerM2: 0.08,
    closureBase: 22,
    closurePerSpanM: 0.25,
  },
};

/** 钢箱梁默认梁高（米） */
export const DEFAULT_GIRDER_DEPTH: Record<Material, number> = {
  steel: 1.2,
  concrete: 1.6,
};

/** 桥墩 */
export const PIER = {
  /** 墩柱混凝土综合单价（万元/m³） */
  concretePrice: 0.12,
  /** 墩柱钢筋含量（吨/m³） */
  rebarPerM3: 0.16,
  /** 单个墩基础造价（万元） */
  foundationPrice: 6.5,
};

/** 接入设施单价与指标 */
export const APPROACH_COST = {
  // 钢梯道：每水平投影平米
  stair: { pricePerM2: 0.18, steelPerM2: 0.12 },
  // 混凝土坡道
  ramp: { pricePerM2: 0.09, rebarPerM3: 0.12, concretePerM2: 0.35 },
  // 电梯（含井道、机房），单部
  elevator: { priceEach: 48, steelEach: 6.0 },
};

/** 栏杆（双侧，万元/延米桥长） */
export const RAILING_PRICE_PER_M = 0.06;
/** 栏杆钢耗（吨/延米，双侧） */
export const RAILING_STEEL_PER_M = 0.04;

/** 占地折减：投影面积综合系数（梯道重叠、放坡等） */
export const FOOTPRINT_FACTOR = 1.15;

/** 数字 / 金额格式化 */
export const fmt = (n: number, digits = 2): string =>
  n.toLocaleString('zh-CN', { minimumFractionDigits: digits, maximumFractionDigits: digits });
