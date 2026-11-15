// 应用状态仓库：病例工作流、预设/标定管理、审计日志、统计
// 简单的可观察 store，UI 订阅后整体重渲染（数据量小，无需虚拟 DOM）

import type {
  AuditEntry,
  Calibration,
  CaseImage,
  CaseStatus,
  EsdCase,
  EnhanceParams,
  EnhancePreset,
  ImageModality,
  Polygon,
  Role,
  SpecimenBlock,
} from '../types';
import { idbPut, idbPutBlob, idbGetBlob, idbDeleteBlob, idbGetAll, idbDelete, STORES } from './idb';
import { measureCase, reconcileBlocks, uid } from '../utils/geometry';
import { PRESETS, defaultParams, makePreset } from '../webgl/presets';

interface State {
  cases: EsdCase[];
  presets: EnhancePreset[];
  calibrations: Calibration[];
  role: Role;
  currentCaseId: string | null;
}

type Listener = () => void;

class AppStore {
  state: State = {
    cases: [],
    presets: [],
    calibrations: [],
    role: 'endoscopist',
    currentCaseId: null,
  };

  private listeners = new Set<Listener>();
  /** 静默计数 >0 时 emit 只通知显式监听者，不触发全局路由重渲染 */
  private silent = 0;

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  /** 执行一批更新，期间不触发全局重渲染；结束后仅回调一次 */
  async batchSilent(fn: () => Promise<void> | void): Promise<void> {
    this.silent += 1;
    try {
      await fn();
    } finally {
      this.silent -= 1;
    }
  }

  private emit(): void {
    if (this.silent > 0) return;
    for (const fn of this.listeners) fn();
  }

  /** 强制通知（静默批处理结束后手动刷新用） */
  notify(): void {
    for (const fn of this.listeners) fn();
  }

  private async persistCase(c: EsdCase): Promise<void> {
    c.updatedAt = Date.now();
    await idbPut(STORES.CASES, c);
    this.emit();
  }

  async init(): Promise<void> {
    const [cases, presets, calibrations] = await Promise.all([
      idbGetAll<EsdCase>(STORES.CASES),
      idbGetAll<EnhancePreset>(STORES.PRESETS),
      idbGetAll<Calibration>(STORES.CALIBRATIONS),
    ]);
    // 首次启动写入内置预设
    if (presets.length === 0) {
      const now = Date.now();
      const seeded: EnhancePreset[] = PRESETS.map((p, i) => ({
        ...p,
        id: `builtin_preset_${i}`,
        usageCount: 0,
        createdAt: now,
        updatedAt: now,
      }));
      for (const p of seeded) await idbPut(STORES.PRESETS, p);
      this.state.presets = seeded;
    } else {
      this.state.presets = presets;
    }
    this.state.cases = cases.sort((a, b) => b.updatedAt - a.updatedAt);
    this.state.calibrations = calibrations;
    this.emit();
  }

  setRole(role: Role): void {
    this.state.role = role;
    this.emit();
  }

  setCurrentCase(id: string | null): void {
    this.state.currentCaseId = id;
    this.emit();
  }

  currentCase(): EsdCase | null {
    return this.state.cases.find((c) => c.id === this.state.currentCaseId) ?? null;
  }

  // ---------------- 病例 ----------------

  async createCase(input: { patientNo: string; lesionSite: string; operator: string }): Promise<EsdCase> {
    const now = Date.now();
    const c: EsdCase = {
      id: uid('case'),
      patientNo: input.patientNo,
      lesionSite: input.lesionSite,
      operator: input.operator,
      status: 'drafting',
      images: [],
      activeImageId: null,
      polygons: [],
      blocks: [],
      calibrationId: this.state.calibrations[0]?.id ?? null,
      presetId: this.state.presets[0]?.id ?? null,
      enhanceParams: this.state.presets[0] ? presetToParams(this.state.presets[0]) : defaultParams(),
      measurements: null,
      reconciliation: null,
      returnReason: '',
      audit: [],
      createdAt: now,
      updatedAt: now,
    };
    this.log(c, 'endoscopist', '创建病例');
    this.state.cases.unshift(c);
    this.state.currentCaseId = c.id;
    await this.persistCase(c);
    return c;
  }

  async deleteCase(id: string): Promise<void> {
    const c = this.state.cases.find((x) => x.id === id);
    if (c) {
      for (const img of c.images) await idbDeleteBlob(img.blobKey).catch(() => undefined);
    }
    await idbDelete(STORES.CASES, id);
    this.state.cases = this.state.cases.filter((x) => x.id !== id);
    if (this.state.currentCaseId === id) this.state.currentCaseId = null;
    this.emit();
  }

  async addImage(caseId: string, file: File, modality: ImageModality): Promise<void> {
    const c = this.mustGet(caseId);
    const blobKey = `blob_${uid('img')}`;
    await idbPutBlob(blobKey, file);
    const dims = await imageDimensions(file);
    const img: CaseImage = {
      id: uid('img'),
      modality,
      blobKey,
      width: dims.w,
      height: dims.h,
      fileName: file.name,
      uploadedAt: Date.now(),
    };
    c.images.push(img);
    if (!c.activeImageId) c.activeImageId = img.id;
    this.log(c, 'endoscopist', `导入${modality}截图`, file.name);
    await this.persistCase(c);
  }

  async removeImage(caseId: string, imageId: string): Promise<void> {
    const c = this.mustGet(caseId);
    const img = c.images.find((i) => i.id === imageId);
    if (!img) return;
    await idbDeleteBlob(img.blobKey).catch(() => undefined);
    c.images = c.images.filter((i) => i.id !== imageId);
    if (c.activeImageId === imageId) c.activeImageId = c.images[0]?.id ?? null;
    await this.persistCase(c);
  }

  async setActiveImage(caseId: string, imageId: string): Promise<void> {
    const c = this.mustGet(caseId);
    c.activeImageId = imageId;
    await this.persistCase(c);
  }

  async getImageBlob(img: CaseImage): Promise<Blob> {
    const blob = await idbGetBlob(img.blobKey);
    if (!blob) throw new Error('图像数据丢失');
    return blob;
  }

  // ---------------- 标注 ----------------

  async savePolygon(caseId: string, poly: Polygon): Promise<void> {
    const c = this.mustGet(caseId);
    const idx = c.polygons.findIndex((p) => p.id === poly.id);
    poly.updatedAt = Date.now();
    if (idx >= 0) c.polygons[idx] = poly;
    else {
      poly.createdAt = Date.now();
      c.polygons.push(poly);
      this.log(c, 'endoscopist', `绘制${polygonKindLabel(poly.kind)}`);
    }
    await this.recompute(c);
  }

  async deletePolygon(caseId: string, polyId: string): Promise<void> {
    const c = this.mustGet(caseId);
    c.polygons = c.polygons.filter((p) => p.id !== polyId);
    await this.recompute(c);
  }

  private async recompute(c: EsdCase): Promise<void> {
    const img = c.images.find((i) => i.id === c.activeImageId) ?? c.images[0];
    const cal = this.state.calibrations.find((x) => x.id === c.calibrationId) ?? null;
    const lesion = c.polygons.find((p) => p.kind === 'lesion');
    const lifting = c.polygons.find((p) => p.kind === 'lifting');
    const incision = c.polygons.find((p) => p.kind === 'incision');
    if (img && lesion) {
      const m = measureCase({ lesion, lifting, incision, calibration: cal, imgW: img.width, imgH: img.height });
      c.measurements = {
        longAxisMm: m.longAxisMm,
        shortAxisMm: m.shortAxisMm,
        areaMm2: m.areaMm2,
        incisionAreaMm2: m.incisionAreaMm2,
        liftingAreaMm2: m.liftingAreaMm2,
      };
      c.reconciliation = reconcileBlocks(c.blocks, m);
    } else {
      c.measurements = null;
      c.reconciliation = c.blocks.length ? reconcileBlocks(c.blocks, null) : null;
    }
    await this.persistCase(c);
  }

  // ---------------- 取材块 ----------------

  async saveBlock(caseId: string, block: SpecimenBlock): Promise<void> {
    const c = this.mustGet(caseId);
    const idx = c.blocks.findIndex((b) => b.id === block.id);
    if (idx >= 0) c.blocks[idx] = block;
    else c.blocks.push(block);
    await this.recompute(c);
  }

  async deleteBlock(caseId: string, blockId: string): Promise<void> {
    const c = this.mustGet(caseId);
    c.blocks = c.blocks.filter((b) => b.id !== blockId);
    await this.recompute(c);
  }

  async setCalibration(caseId: string, calibrationId: string | null): Promise<void> {
    const c = this.mustGet(caseId);
    c.calibrationId = calibrationId;
    await this.recompute(c);
  }

  // ---------------- 增强 ----------------

  async applyPreset(caseId: string, presetId: string): Promise<void> {
    const c = this.mustGet(caseId);
    const preset = this.state.presets.find((p) => p.id === presetId);
    if (!preset) return;
    c.presetId = presetId;
    c.enhanceParams = presetToParams(preset);
    preset.usageCount += 1;
    preset.updatedAt = Date.now();
    await idbPut(STORES.PRESETS, preset);
    this.log(c, this.state.role, '应用增强预设', preset.name);
    await this.persistCase(c);
  }

  async updateEnhanceParams(caseId: string, params: EnhanceParams): Promise<void> {
    const c = this.mustGet(caseId);
    c.enhanceParams = params;
    await this.persistCase(c);
  }

  async savePreset(name: string, params: EnhanceParams): Promise<void> {
    const preset = makePreset(name, params);
    this.state.presets.push(preset);
    await idbPut(STORES.PRESETS, preset);
    this.emit();
  }

  async updatePreset(preset: EnhancePreset): Promise<void> {
    preset.updatedAt = Date.now();
    const idx = this.state.presets.findIndex((p) => p.id === preset.id);
    if (idx >= 0) this.state.presets[idx] = preset;
    await idbPut(STORES.PRESETS, preset);
    this.emit();
  }

  async deletePreset(presetId: string): Promise<void> {
    const preset = this.state.presets.find((p) => p.id === presetId);
    if (!preset || preset.builtin) return;
    this.state.presets = this.state.presets.filter((p) => p.id !== presetId);
    await idbDelete(STORES.PRESETS, presetId);
    this.emit();
  }

  // ---------------- 标定 ----------------

  async saveCalibration(cal: Calibration): Promise<void> {
    const idx = this.state.calibrations.findIndex((x) => x.id === cal.id);
    if (idx >= 0) this.state.calibrations[idx] = cal;
    else this.state.calibrations.push(cal);
    await idbPut(STORES.CALIBRATIONS, cal);
    // 关联病例重算
    for (const c of this.state.cases) {
      if (c.calibrationId === cal.id) await this.recompute(c);
    }
    this.emit();
  }

  async deleteCalibration(id: string): Promise<void> {
    this.state.calibrations = this.state.calibrations.filter((x) => x.id !== id);
    await idbDelete(STORES.CALIBRATIONS, id);
    for (const c of this.state.cases) {
      if (c.calibrationId === id) {
        c.calibrationId = null;
        await this.recompute(c);
      }
    }
    this.emit();
  }

  // ---------------- 工作流 ----------------

  async submitForDiscussion(caseId: string): Promise<void> {
    const c = this.mustGet(caseId);
    const problems = this.validateSubmission(c);
    if (problems.length > 0) throw new Error(problems.join('；'));
    c.status = 'pending';
    c.returnReason = '';
    this.log(c, 'endoscopist', '提交讨论');
    await this.persistCase(c);
  }

  validateSubmission(c: EsdCase): string[] {
    const problems: string[] = [];
    if (c.images.length === 0) problems.push('尚未导入内镜截图');
    if (!c.polygons.some((p) => p.kind === 'lesion')) problems.push('缺少病变范围圈定');
    if (!c.polygons.some((p) => p.kind === 'incision')) problems.push('缺少计划切开线');
    if (!c.calibrationId) problems.push('未选择比例尺标定');
    if (c.measurements !== null && c.measurements.longAxisMm <= 0) problems.push('测量结果无效，请检查标定与病变边界');
    if (c.reconciliation && !c.reconciliation.passed) problems.push('取材对账未通过：' + c.reconciliation.warnings.join('；'));
    return problems;
  }

  async returnCase(caseId: string, reason: string): Promise<void> {
    const c = this.mustGet(caseId);
    if (!reason.trim()) throw new Error('退回必须填写原因');
    c.status = 'returned';
    c.returnReason = reason.trim();
    this.log(c, 'reviewer', '退回修改', reason);
    await this.persistCase(c);
  }

  async approveCase(caseId: string): Promise<void> {
    const c = this.mustGet(caseId);
    c.status = 'approved';
    this.log(c, 'reviewer', '讨论通过');
    await this.persistCase(c);
  }

  /** 退回后内镜医师重新编辑，回到待讨论前先置为待标注 */
  async reopenDraft(caseId: string): Promise<void> {
    const c = this.mustGet(caseId);
    c.status = 'drafting';
    this.log(c, 'endoscopist', '接收退回，开始修改', c.returnReason);
    await this.persistCase(c);
  }

  // ---------------- 统计 ----------------

  /** 按医师统计边界修改率：有退回记录的病例占其提交病例比例 */
  physicianStats(): { operator: string; total: number; returned: number; modificationRate: number }[] {
    const map = new Map<string, { total: number; returned: Set<string> }>();
    for (const c of this.state.cases) {
      const key = c.operator || '未填写';
      const entry = map.get(key) ?? { total: 0, returned: new Set<string>() };
      const submitted = c.audit.some((a) => a.action === '提交讨论');
      if (submitted) entry.total += 1;
      if (c.audit.some((a) => a.action === '退回修改')) entry.returned.add(c.id);
      map.set(key, entry);
    }
    return [...map.entries()].map(([operator, v]) => ({
      operator,
      total: v.total,
      returned: v.returned.size,
      modificationRate: v.total === 0 ? 0 : v.returned.size / v.total,
    }));
  }

  presetStats(): { name: string; usageCount: number; builtin: boolean }[] {
    return this.state.presets
      .map((p) => ({ name: p.name, usageCount: p.usageCount, builtin: p.builtin }))
      .sort((a, b) => b.usageCount - a.usageCount);
  }

  statusCounts(): Record<CaseStatus, number> {
    const counts: Record<CaseStatus, number> = { drafting: 0, pending: 0, approved: 0, returned: 0 };
    for (const c of this.state.cases) counts[c.status] += 1;
    return counts;
  }

  // ---------------- 辅助 ----------------

  private mustGet(id: string): EsdCase {
    const c = this.state.cases.find((x) => x.id === id);
    if (!c) throw new Error('病例不存在');
    return c;
  }

  private log(c: EsdCase, role: Role, action: string, detail?: string): void {
    const entry: AuditEntry = { id: uid('aud'), at: Date.now(), role, action, detail };
    c.audit.push(entry);
  }
}

function presetToParams(p: EnhancePreset): EnhanceParams {
  return {
    colorMatrix: [...p.colorMatrix],
    vesselGain: p.vesselGain,
    saturation: p.saturation,
    contrast: p.contrast,
    greenBoost: p.greenBoost,
  };
}

function polygonKindLabel(kind: Polygon['kind']): string {
  return kind === 'lesion' ? '病变范围' : kind === 'lifting' ? '抬举试验边界' : '计划切开线';
}

function imageDimensions(file: File): Promise<{ w: number; h: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ w: img.naturalWidth, h: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('无法读取图像尺寸'));
    };
    img.src = url;
  });
}

export const store = new AppStore();
