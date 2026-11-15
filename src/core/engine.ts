// ============================================================
// 设计引擎：框架梁自动排布 / 规则校验 / 工程量计算
// ============================================================
import type {
  Anchor, DesignConfig, DesignIntents, Ditch, FaceWall, FrameBeam,
  GeoLayer, GradeFace, MonitorPoint, ProtectionComponents, SlopeModel, Vec3,
} from '../types';
import { v3 } from './math';
import { layerAtElev, pointOnFace } from './geometry';

export type Level = 'error' | 'warn' | 'ok';
export interface DesignIssue {
  level: Level;
  gradeId: string | null;
  message: string;
}

export interface EngineResult {
  components: ProtectionComponents;
  issues: DesignIssue[];
}

const SPACING_TOL = 0.05; // 排距/分块均匀性容差（m）

let seq = 0;
export function uid(prefix: string): string {
  seq += 1;
  return `${prefix}_${Date.now().toString(36)}_${seq}`;
}

/** 钢筋单位重（kg/m），d 为直径 mm */
export function rebarUnitWeight(d: number): number {
  return 0.00617 * d * d;
}

/** 将长度均匀分为 n 段，返回各分界点（含 0 与 len） */
function uniformDivisions(len: number, n: number): number[] {
  const out: number[] = [];
  for (let i = 0; i <= n; i++) out.push((len * i) / n);
  return out;
}

/** 框架梁 + 锚杆 生成 */
function buildFrame(
  config: DesignConfig, face: GradeFace, enabled: boolean, densified: boolean,
): FrameBeam | null {
  if (!enabled) return null;
  const L = config.slopeLength;
  const block = config.frameBlock;

  // ---- 走向：每 6m 分块，与坡顶线（x=0）对齐 ----
  const colCount = Math.max(1, Math.round(L / block));
  const actualColSpacing = L / colCount;
  const xs = uniformDivisions(L, colCount);

  // ---- 倾向排距 ----
  const slopeLen = face.slopeLength;
  const rowCount = Math.max(1, Math.round(slopeLen / config.frameRowSpacing));
  const rowSpacing = slopeLen / rowCount;
  const ss = uniformDivisions(slopeLen, rowCount);

  // ---- 土岩分界处理（仅当代格内部存在分界时才参与加密/标记）----
  const interiorBoundary = face.boundaryS !== null &&
    face.boundaryS > 0.05 && face.boundaryS < slopeLen - 0.05 ? face.boundaryS : null;
  let rowParams = ss;
  let usedDensify = false;
  let boundaryRowIndex = -1;
  if (interiorBoundary !== null) {
    const near = ss.findIndex((s) => Math.abs(s - interiorBoundary) <= Math.max(0.5, rowSpacing * 0.25));
    if (densified && near === -1) {
      // 设计员确认加密：插入分界排，并对上下两段各自重新均匀分块
      const bs = interiorBoundary;
      const nUp = Math.max(1, Math.round(bs / rowSpacing));
      const nDown = Math.max(1, Math.round((slopeLen - bs) / rowSpacing));
      const set = new Set<number>();
      for (let i = 0; i <= nUp; i++) set.add(+(bs * i / nUp).toFixed(4));
      for (let i = 0; i <= nDown; i++) set.add(+(bs + (slopeLen - bs) * i / nDown).toFixed(4));
      rowParams = [...set].sort((a, b) => a - b);
      usedDensify = true;
      boundaryRowIndex = rowParams.findIndex((s) => Math.abs(s - bs) < 1e-3);
    } else if (near >= 0) {
      boundaryRowIndex = near; // 自然网格已覆盖分界，该排标记为分界排
    }
  }

  // ---- 节点锚杆 ----
  const anchors: Anchor[] = [];
  let col = 0;
  for (const x of xs) {
    let row = 0;
    for (const s of rowParams) {
      const pos = pointOnFace(face, x, s);
      const layer = layerAtElev(pos[1], config.layers);
      const isBoundary = row === boundaryRowIndex;
      anchors.push({
        id: uid('A'),
        gradeId: face.gradeId,
        pos,
        dir: v3.copy(face.normal),
        length: anchorLengthFor(layer),
        layerId: layer.id,
        col, row,
        densified: isBoundary,
      });
      row++;
    }
    col++;
  }

  // ---- 框架梁混凝土：竖梁 + 横梁总长 × 截面 ----
  const sectionArea = config.beamWidth * config.beamDepth;
  const verticalBeamLen = xs.length * slopeLen;
  const horizontalBeamLen = rowParams.length * L;
  const beamTotalLen = verticalBeamLen + horizontalBeamLen;
  const concrete = beamTotalLen * sectionArea;

  // ---- 钢筋：框架梁（按配筋率）+ 锚杆杆体 ----
  const beamSteelT = (concrete * (config.beamSteelRatio / 100) * 7850) / 1000;
  const anchorSteelKg = anchors.reduce(
    (sum, a) => sum + rebarUnitWeight(config.anchorBarDiameter) * a.length, 0,
  );
  const steel = beamSteelT + anchorSteelKg / 1000;

  return {
    id: uid('F'),
    gradeId: face.gradeId,
    colCount,
    rowCount: rowParams.length,
    anchors,
    concrete,
    steel,
    densifiedAtBoundary: usedDensify || boundaryRowIndex >= 0,
  };
}

/** 锚杆长度随岩层变化：土层长、岩层短（取岩层定义值） */
function anchorLengthFor(layer: GeoLayer): number {
  return layer.anchorLength;
}

/** 截水沟（梯形断面） */
function buildDitch(config: DesignConfig, model: SlopeModel, intent: DesignIntents['ditches'][number]): Ditch {
  const L = config.slopeLength;
  const startX = Math.max(0, Math.min(L, intent.startX));
  const endX = Math.max(startX, Math.min(L, intent.endX));
  // 放置高程/横向位置
  let y = config.topElev;
  let z = 0;
  if (intent.gradeId !== null) {
    const face = model.faces.find((f) => f.gradeId === intent.gradeId);
    if (face) {
      y = face.toeElev;
      z = face.toeStart[2] + 0.6; // 平台上偏坡外 0.6m
    }
  } else {
    z = -0.6; // 坡顶截水沟，位于坡顶线后方
  }
  const path: Vec3[] = [];
  const steps = Math.max(2, Math.ceil((endX - startX) / 6) + 1);
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    path.push([startX + (endX - startX) * t, y, z]);
  }
  const depth = config.ditchDepth;
  const sectionArea = (config.ditchBottomWidth + config.ditchTopWidth) / 2 * depth;
  const concrete = sectionArea * (endX - startX);
  return { id: intent.id, gradeId: intent.gradeId, startX, endX, path, concrete };
}

/** 护面墙 */
function buildWall(config: DesignConfig, face: GradeFace, intent: DesignIntents['walls'][number]): FaceWall {
  const L = config.slopeLength;
  const startX = Math.max(0, Math.min(L, intent.startX));
  const endX = Math.max(startX, Math.min(L, intent.endX));
  const len = endX - startX;
  const concrete = len * face.height * config.wallThickness;
  return {
    id: intent.id, gradeId: face.gradeId, startX, endX,
    topElev: face.topElev, bottomElev: face.toeElev, concrete,
  };
}

/** 监测点 */
function buildMonitor(face: GradeFace, intent: DesignIntents['monitors'][number]): MonitorPoint {
  const s = Math.max(0, Math.min(face.slopeLength, intent.s));
  const pos = pointOnFace(face, intent.x, s);
  return { id: intent.id, gradeId: face.gradeId, pos, kind: intent.kind, code: intent.code };
}

/** 规则校验，产出错误/警告/提示 */
export function validate(config: DesignConfig, model: SlopeModel, intents: DesignIntents): DesignIssue[] {
  const issues: DesignIssue[] = [];
  const block = config.frameBlock;
  const L = config.slopeLength;

  for (const face of model.faces) {
    const g = config.grades.find((x) => x.id === face.gradeId)!;
    const enabled = intents.frameEnabled[face.gradeId];
    if (!enabled) continue;

    // 规则1：走向分块必须与坡顶线对齐且等宽（6m）
    const colCount = Math.max(1, Math.round(L / block));
    const actual = L / colCount;
    if (Math.abs(actual - block) > SPACING_TOL) {
      issues.push({
        level: 'error', gradeId: face.gradeId,
        message: `第${face.index + 1}级坡：走向长 ${L.toFixed(2)}m 不能被 ${block}m 等分（实际分块 ${actual.toFixed(2)}m），框架梁无法与坡顶线对齐，请调整坡长或分块尺寸。`,
      });
    }

    // 规则2：同级坡上下排锚杆间距必须一致，否则直接报错
    const rowCount = Math.max(1, Math.round(face.slopeLength / config.frameRowSpacing));
    const rowSpacing = face.slopeLength / rowCount;
    if (Math.abs(rowSpacing - config.frameRowSpacing) > SPACING_TOL) {
      const suggest = face.slopeLength / rowCount;
      issues.push({
        level: 'error', gradeId: face.gradeId,
        message: `第${face.index + 1}级坡：斜长 ${face.slopeLength.toFixed(2)}m 按排距 ${config.frameRowSpacing}m 排布时末排间距不一致（实际 ${rowSpacing.toFixed(2)}m），上下排锚杆间距不允许不等。建议将排距改为 ${suggest.toFixed(2)}m（${rowCount} 排等距）。`,
      });
    }

    // 规则3：土岩分界处提示加密（仅当代格内部存在分界）
    const interior = face.boundaryS !== null &&
      face.boundaryS > 0.05 && face.boundaryS < face.slopeLength - 0.05;
    if (interior) {
      const near = uniformDivisions(face.slopeLength, rowCount)
        .findIndex((s) => Math.abs(s - face.boundaryS!) <= Math.max(0.5, rowSpacing * 0.25));
      if (near === -1 && !intents.densified[face.gradeId]) {
        issues.push({
          level: 'warn', gradeId: face.gradeId,
          message: `第${face.index + 1}级坡：土岩分界（高程 ${face.boundaryElev?.toFixed(2)}m）位于两排锚杆之间，建议在分界处加密锚杆。可在左侧面板点击「分界处加密」。`,
        });
      } else if (intents.densified[face.gradeId]) {
        issues.push({
          level: 'ok', gradeId: face.gradeId,
          message: `第${face.index + 1}级坡：已在土岩分界处加密锚杆并重新等距排布。`,
        });
      }
    }

    if (g.ratio <= 0 || g.height <= 0) {
      issues.push({ level: 'error', gradeId: face.gradeId, message: `第${face.index + 1}级坡坡率与高度必须为正数。` });
    }
  }

  // 地质分层连续性
  for (let i = 1; i < config.layers.length; i++) {
    if (config.layers[i].bottomElev > config.layers[i - 1].bottomElev) {
      issues.push({ level: 'error', gradeId: null, message: `地质分层「${config.layers[i].name}」底高程高于上一层，分层顺序错误。` });
    }
  }
  if (config.layers.length === 0) {
    issues.push({ level: 'error', gradeId: null, message: '至少需要一个岩土层。' });
  }
  return issues;
}

/** 依据意图 + 模型重建全部构件与工程量 */
export function rebuildComponents(
  config: DesignConfig, model: SlopeModel, intents: DesignIntents,
): EngineResult {
  const frames: FrameBeam[] = [];
  for (const face of model.faces) {
    const f = buildFrame(config, face, !!intents.frameEnabled[face.gradeId], !!intents.densified[face.gradeId]);
    if (f) frames.push(f);
  }
  const ditches: Ditch[] = intents.ditches
    .filter((d) => d.endX > d.startX)
    .map((d) => buildDitch(config, model, d));
  const walls: FaceWall[] = intents.walls
    .filter((w) => w.endX > w.startX)
    .map((w) => {
      const face = model.faces.find((f) => f.gradeId === w.gradeId)!;
      return face ? buildWall(config, face, w) : null;
    })
    .filter((x): x is FaceWall => x !== null);
  const monitors: MonitorPoint[] = intents.monitors
    .map((m) => {
      const face = model.faces.find((f) => f.gradeId === m.gradeId);
      return face ? buildMonitor(face, m) : null;
    })
    .filter((x): x is MonitorPoint => x !== null);

  const issues = validate(config, model, intents);
  return {
    components: { frames, ditches, walls, monitors },
    issues,
  };
}

// ---------------- 工程量汇总 ----------------
export interface QuantityTotals {
  anchorCount: number;
  anchorTotalLength: number;
  concreteTotal: number;
  steelTotal: number;
  frameConcrete: number;
  ditchConcrete: number;
  wallConcrete: number;
  frameSteel: number;
}

export function summarize(components: ProtectionComponents): QuantityTotals {
  const anchors = components.frames.flatMap((f) => f.anchors);
  const frameConcrete = components.frames.reduce((s, f) => s + f.concrete, 0);
  const ditchConcrete = components.ditches.reduce((s, d) => s + d.concrete, 0);
  const wallConcrete = components.walls.reduce((s, w) => s + w.concrete, 0);
  return {
    anchorCount: anchors.length,
    anchorTotalLength: anchors.reduce((s, a) => s + a.length, 0),
    concreteTotal: frameConcrete + ditchConcrete + wallConcrete,
    steelTotal: components.frames.reduce((s, f) => s + f.steel, 0),
    frameConcrete,
    ditchConcrete,
    wallConcrete,
    frameSteel: components.frames.reduce((s, f) => s + f.steel, 0),
  };
}
