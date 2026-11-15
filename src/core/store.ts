// ============================================================
// 全局状态仓库：pub/sub + localStorage 持久化 + 模型派生
// ============================================================
import type {
  AcceptanceBatch, DesignConfig, DesignIntents, ProjectState, Role, SlopeModel, ToolId,
} from '../types';
import { buildSlopeModel } from './geometry';
import { rebuildComponents, type EngineResult } from './engine';
import { defaultProject, STORAGE_KEY } from './defaults';

type Listener = () => void;

class Store {
  state: ProjectState;
  model: SlopeModel;
  engine: EngineResult;
  role: Role = 'designer';
  tool: ToolId = 'select';
  selectedGradeId: string | null = null;
  private listeners = new Set<Listener>();

  constructor() {
    this.state = this.load();
    this.model = buildSlopeModel(this.state.config);
    this.engine = rebuildComponents(this.state.config, this.model, this.state.intents);
    // 首次计算后写回构件，保证持久化数据完整
    this.state.components = this.engine.components;
  }

  private load(): ProjectState {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ProjectState;
        if (parsed && parsed.config && parsed.intents) return parsed;
      }
    } catch { /* 忽略损坏存档 */ }
    return defaultProject();
  }

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private emit() {
    this.persist();
    this.listeners.forEach((fn) => fn());
  }

  private persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch { /* 存储满等情况忽略 */ }
  }

  /** 重新派生几何模型与构件（参数或意图变更后调用） */
  private recompute() {
    this.model = buildSlopeModel(this.state.config);
    this.engine = rebuildComponents(this.state.config, this.model, this.state.intents);
    this.state.components = this.engine.components;
  }

  // ---------------- 配置编辑 ----------------
  updateConfig(patch: Partial<DesignConfig>) {
    Object.assign(this.state.config, patch);
    this.recompute();
    this.emit();
  }

  updateGrade(gradeId: string, patch: Partial<ProjectState['config']['grades'][number]>) {
    const g = this.state.config.grades.find((x) => x.id === gradeId);
    if (g) Object.assign(g, patch);
    this.recompute();
    this.emit();
  }

  updateLayer(layerId: string, patch: Partial<ProjectState['config']['layers'][number]>) {
    const l = this.state.config.layers.find((x) => x.id === layerId);
    if (l) Object.assign(l, patch);
    this.recompute();
    this.emit();
  }

  // ---------------- 设计意图 ----------------
  updateIntents(mutator: (d: DesignIntents) => void) {
    mutator(this.state.intents);
    this.recompute();
    this.emit();
  }

  setFrameEnabled(gradeId: string, enabled: boolean) {
    this.updateIntents((d) => { d.frameEnabled[gradeId] = enabled; });
  }

  setDensified(gradeId: string, v: boolean) {
    this.updateIntents((d) => { d.densified[gradeId] = v; });
  }

  // ---------------- UI 状态（不持久化、不触发全量重算） ----------------
  setRole(role: Role) { this.role = role; this.emit(); }
  setTool(tool: ToolId) { this.tool = tool; this.emit(); }
  selectGrade(gradeId: string | null) { this.selectedGradeId = gradeId; this.emit(); }

  // ---------------- 验收批次 ----------------
  addBatch(batch: AcceptanceBatch) {
    this.state.batches.push(batch);
    this.emit();
  }

  updateBatch(batchId: string, patch: Partial<AcceptanceBatch>) {
    const b = this.state.batches.find((x) => x.id === batchId);
    if (b) Object.assign(b, patch);
    this.emit();
  }

  removeBatch(batchId: string) {
    this.state.batches = this.state.batches.filter((x) => x.id !== batchId);
    this.emit();
  }

  // ---------------- 项目导入导出 / 重置 ----------------
  replaceProject(next: ProjectState) {
    this.state = next;
    this.recompute();
    this.emit();
  }

  resetProject() {
    this.state = defaultProject();
    this.recompute();
    this.emit();
  }
}

export const store = new Store();
