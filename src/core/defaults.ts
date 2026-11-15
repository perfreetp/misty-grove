// ============================================================
// 默认工程参数（可直接演示的 3 级深路堑 + 3 类岩土层）
// ============================================================
import type { DesignConfig, DesignIntents, ProjectState } from '../types';

export const STORAGE_KEY = 'slope-protection-project-v1';

export function defaultConfig(): DesignConfig {
  return {
    projectName: 'K12 标段深路堑边坡防护工程',
    chainage: 'K12+300 ~ K12+480',
    slopeLength: 180,
    topElev: 320,
    toeElev: 284,
    grades: [
      { id: 'g1', ratio: 0.75, height: 12, bermWidth: 2 },
      { id: 'g2', ratio: 1.0, height: 12, bermWidth: 2 },
      { id: 'g3', ratio: 1.25, height: 12, bermWidth: 0 },
    ],
    layers: [
      { id: 'L1', name: '粉质黏土（覆盖层）', bottomElev: 308, kind: 'soil', anchorLength: 12, color: [180, 140, 90] },
      { id: 'L2', name: '强风化砂岩', bottomElev: 296, kind: 'rock', anchorLength: 9, color: [150, 110, 95] },
      { id: 'L3', name: '中风化砂岩', bottomElev: 260, kind: 'rock', anchorLength: 6, color: [110, 120, 130] },
    ],
    frameBlock: 6,
    frameRowSpacing: 6,
    beamWidth: 0.4,
    beamDepth: 0.35,
    ditchBottomWidth: 0.4,
    ditchTopWidth: 0.8,
    ditchDepth: 0.6,
    wallThickness: 0.5,
    anchorBarDiameter: 32,
    beamSteelRatio: 0.8,
    batchDueDays: 7,
  };
}

export function defaultIntents(config: DesignConfig): DesignIntents {
  const frameEnabled: Record<string, boolean> = {};
  const densified: Record<string, boolean> = {};
  config.grades.forEach((g, i) => {
    frameEnabled[g.id] = i < 2; // 默认前两级布置框架梁
    densified[g.id] = false;
  });
  return {
    frameEnabled,
    densified,
    ditches: [
      { id: 'd_top', gradeId: null, startX: 0, endX: config.slopeLength },
    ],
    walls: [],
    monitors: [],
  };
}

export function defaultProject(): ProjectState {
  const config = defaultConfig();
  return {
    version: 1,
    config,
    intents: defaultIntents(config),
    components: { frames: [], ditches: [], walls: [], monitors: [] },
    batches: [],
  };
}
