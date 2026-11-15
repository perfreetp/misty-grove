// 病例工作区：截图导入、WebGL2 增强、多边形标注、测量、取材对账、工作流操作、讨论单导出

import type { Calibration, EnhanceParams, EsdCase, Polygon } from '../types';
import { STATUS_LABEL, MODALITY_LABEL } from '../types';
import { store } from '../storage/store';
import { clear, fmtDateTime, h, toast } from '../utils/dom';
import { formatArea, formatMm, uid } from '../utils/geometry';
import { EnhanceRenderer } from '../webgl/EnhanceRenderer';
import { AnnotationCanvas, type DrawKind } from '../components/AnnotationCanvas';
import { renderEnhancePanel } from './enhancePanel';
import { renderBlocksPanel } from './blocksPanel';
import { renderCaseList } from './caseList';
import { showReturnModal } from './modals';
import { composeOverlay, downloadCanvas, exportDiscussionSheet } from '../utils/export';

export interface CaseViewController {
  reload(): void;
  renderGl(): void;
  getLiveParams(): EnhanceParams;
  setLiveParams(p: EnhanceParams): void;
}

let renderer: EnhanceRenderer | null = null;
let anno: AnnotationCanvas | null = null;
let liveParams: EnhanceParams | null = null;
let currentCalibration: Calibration | null = null;
let resizeObserver: ResizeObserver | null = null;

export function showCaseView(caseId: string): void {
  store.setCurrentCase(caseId);
  render();
}

export function teardownCaseView(): void {
  resizeObserver?.disconnect();
  resizeObserver = null;
  renderer?.dispose();
  renderer = null;
  anno = null;
  liveParams = null;
}

function render(): void {
  const root = document.getElementById('view-root')!;
  // 重建前断开旧画布的观察器与 GL 资源，避免上下文/监听器泄漏
  resizeObserver?.disconnect();
  resizeObserver = null;
  renderer?.dispose();
  renderer = null;
  anno = null;
  clear(root);
  const c = store.currentCase();
  if (!c) {
    renderCaseList(root);
    return;
  }
  liveParams = c.enhanceParams ? { ...c.enhanceParams, colorMatrix: [...c.enhanceParams.colorMatrix] } : null;
  currentCalibration = store.state.calibrations.find((x) => x.id === c.calibrationId) ?? null;

  root.append(
    h('button', { class: 'back-link', onclick: () => { teardownCaseView(); store.setCurrentCase(null); renderCaseList(root); } }, '← 返回病例列表'),
    h('div', { class: 'page-head' },
      h('h2', {}, `${c.patientNo}　`, h('span', { class: `badge badge-${c.status}`, style: 'font-size:13px' }, STATUS_LABEL[c.status])),
      workflowButtons(c),
    ),
  );

  if (c.status === 'returned') {
    root.append(h('div', { class: 'return-banner' },
      h('strong', {}, '退回原因：'), c.returnReason,
      h('div', { style: 'margin-top:6px' },
        h('button', {
          class: 'btn btn-sm btn-primary',
          onclick: () => void silentReload(() => store.reopenDraft(c.id)),
        }, '接收并开始修改'),
      ),
    ));
  }

  const workspace = h('div', { class: 'workspace' });
  const left = h('div', { style: 'display:flex;flex-direction:column;gap:16px;min-width:0' });
  const right = h('div', { class: 'side-stack' });

  left.append(imageStrip(c), stageArea(c), measurePanel(c));
  right.append(renderEnhancePanel(c, ctrl), renderBlocksPanel(c), auditPanel(c));
  workspace.append(left, right);
  root.append(workspace);

  // 初始化 WebGL
  const glCanvas = root.querySelector<HTMLCanvasElement>('.gl-canvas')!;
  const overlay = root.querySelector<HTMLCanvasElement>('.overlay-canvas')!;
  const stage = root.querySelector<HTMLElement>('.stage')!;
  if (glCanvas && overlay) {
    initStage(c, glCanvas, overlay, stage);
  }
}

const ctrl: CaseViewController = {
  reload: () => render(),
  renderGl: () => renderer?.render(),
  getLiveParams: () => liveParams ?? store.currentCase()?.enhanceParams!,
  setLiveParams: (p) => {
    liveParams = p;
  },
};

/** 静默执行：持久化到 IndexedDB 但不触发全局路由重渲染（保护 WebGL 画布） */
export async function silent(fn: () => Promise<void> | void): Promise<void> {
  await store.batchSilent(fn);
}

/** 静默持久化后局部重渲染当前病例视图 */
export async function silentReload(fn: () => Promise<void> | void): Promise<void> {
  await silent(fn);
  render();
}

// ---------------- 截图条 ----------------

function imageStrip(c: EsdCase): HTMLElement {
  const box = h('div', { class: 'card' });
  box.append(h('h3', {}, '内镜截图（白光 / NBI）'));
  const wliInput = h('input', { type: 'file', accept: 'image/*', style: 'display:none' }) as HTMLInputElement;
  const nbiInput = h('input', { type: 'file', accept: 'image/*', style: 'display:none' }) as HTMLInputElement;
  wliInput.addEventListener('change', () => pickFile(wliInput, c, 'WLI'));
  nbiInput.addEventListener('change', () => pickFile(nbiInput, c, 'NBI'));
  box.append(h('div', { class: 'btn-row', style: 'margin-bottom:12px' },
    h('button', { class: 'btn btn-primary', onclick: () => wliInput.click() }, '导入白光 WLI'),
    h('button', { class: 'btn btn-primary', onclick: () => nbiInput.click() }, '导入窄带 NBI'),
    wliInput, nbiInput,
  ));
  if (c.images.length === 0) {
    box.append(h('p', { class: 'muted' }, '截图保存在浏览器 IndexedDB，不会上传服务器。'));
    return box;
  }
  const strip = h('div', { class: 'thumb-row' });
  for (const img of c.images) {
    const urlP = store.getImageBlob(img).then((b) => URL.createObjectURL(b));
    const thumb = h('div', { class: `thumb ${c.activeImageId === img.id ? 'active' : ''}` },
      h('div', { style: 'height:80px;background:#000' }),
      h('div', { class: 'thumb-meta' },
        h('span', { class: `badge ${img.modality === 'WLI' ? 'badge-wli' : 'badge-nbi'}` }, img.modality),
        h('button', {
          class: 'thumb-del',
          title: '删除截图',
          onclick: (e: Event) => {
            e.stopPropagation();
            void silentReload(() => store.removeImage(c.id, img.id));
          },
        }, '×'),
      ),
    );
    thumb.addEventListener('click', () => {
      void silentReload(() => store.setActiveImage(c.id, img.id));
    });
    void urlP.then((url) => {
      const im = h('img', { src: url });
      thumb.querySelector('div')!.replaceWith(im);
    });
    strip.append(thumb);
  }
  box.append(strip);
  return box;
}

async function pickFile(input: HTMLInputElement, c: EsdCase, modality: 'WLI' | 'NBI'): Promise<void> {
  const file = input.files?.[0];
  input.value = '';
  if (!file) return;
  try {
    await silent(() => store.addImage(c.id, file, modality));
    toast(`${MODALITY_LABEL[modality]} 截图已导入`, 'success');
    render();
  } catch (err) {
    toast((err as Error).message, 'error');
  }
}

// ---------------- 舞台 ----------------

function stageArea(c: EsdCase): HTMLElement {
  const hasImage = c.images.length > 0;
  const stage = h('div', { class: 'stage' });
  if (!hasImage) {
    stage.style.height = '420px';
    stage.append(h('div', { class: 'empty-tip' }, '请先导入内镜截图'));
    return h('div', {}, toolBar(c), stage);
  }
  const glCanvas = h('canvas', { class: 'gl-canvas' }) as HTMLCanvasElement;
  const overlay = h('canvas', { class: 'overlay-canvas' }) as HTMLCanvasElement;
  const inner = h('div', { class: 'stage-inner' }, glCanvas, overlay);
  stage.append(inner);
  return h('div', {}, toolBar(c), stage);
}

function toolBar(c: EsdCase): HTMLElement {
  const locked = c.status === 'pending' || c.status === 'approved';
  const bar = h('div', { class: 'toolbar' });
  const tools: { kind: DrawKind; label: string; color?: string }[] = [
    { kind: 'lesion', label: '病变范围', color: 'var(--lesion)' },
    { kind: 'lifting', label: '抬举试验边界', color: 'var(--lifting)' },
    { kind: 'incision', label: '计划切开线', color: 'var(--incision)' },
    { kind: 'calibration', label: '比例尺标定', color: 'var(--primary)' },
  ];
  for (const t of tools) {
    const btn = h('button', { class: 'tool-btn' },
      t.color ? h('span', { class: 'dot', style: `background:${t.color}` }) : '',
      t.label,
    ) as HTMLButtonElement;
    btn.disabled = locked;
    btn.addEventListener('click', () => {
      if (anno) {
        anno.setDrawKind(t.kind);
        bar.querySelectorAll('.tool-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        if (t.kind === 'calibration') toast('在图上点击标定线段的两个端点，然后在右侧填写已知长度', 'info');
        if (t.kind && t.kind !== 'calibration') toast('逐点点击圈定范围，双击闭合；右键取消绘制', 'info');
      }
    });
    bar.append(btn);
  }
  const finishBtn = h('button', {
    class: 'btn btn-sm',
    onclick: () => void anno?.commitActive(),
  }, '闭合多边形');
  finishBtn.disabled = locked;
  const calBtn = h('button', {
    class: 'btn btn-sm btn-primary',
    onclick: () => saveCalibration(c),
  }, '保存标定');
  calBtn.disabled = locked;
  bar.append(finishBtn, calBtn);
  if (locked) bar.append(h('span', { class: 'muted', style: 'align-self:center' }, '当前状态下标注已锁定'));
  return bar;
}

async function saveCalibration(c: EsdCase): Promise<void> {
  const pts = anno?.getCalibrationPoints();
  if (!pts) return toast('请先在图上点击标定线段的两个端点', 'error');
  const known = prompt('该标定线段对应的真实长度（mm）：', '5');
  if (known === null) return;
  const knownLengthMm = Number(known);
  if (!Number.isFinite(knownLengthMm) || knownLengthMm <= 0) return toast('长度无效', 'error');
  const cal: Calibration = {
    id: uid('cal'),
    name: `${c.patientNo} 标定 ${knownLengthMm}mm`,
    p1: pts.p1,
    p2: pts.p2,
    knownLengthMm,
    createdAt: Date.now(),
  };
  await silent(() => store.saveCalibration(cal));
  anno?.resetCalibrationDraft();
  await silent(() => store.setCalibration(c.id, cal.id));
  currentCalibration = cal;
  toast('比例尺已保存并应用到本病例', 'success');
  render();
}

function initStage(c: EsdCase, glCanvas: HTMLCanvasElement, overlay: HTMLCanvasElement, stage: HTMLElement): void {
  const img = c.images.find((i) => i.id === c.activeImageId) ?? c.images[0];
  if (!img || !liveParams) return;

  // 每次进入/重渲染工作区都会生成新 canvas，WebGL 上下文必须随之重建
  renderer?.dispose();
  renderer = new EnhanceRenderer(glCanvas, liveParams);
  renderer.setParams(liveParams);

  anno = new AnnotationCanvas({
    glCanvas,
    overlay,
    renderer,
    getCase: () => store.currentCase(),
    getCalibrationDraft: () => currentCalibration,
    onCommit: (poly) => {
      const cur = store.currentCase();
      if (!cur) return;
      // 同类多边形替换（一次只保留一个病变/抬举/切开线）
      cur.polygons = cur.polygons.filter((x) => x.kind !== poly.kind);
      cur.polygons.push(poly);
      void silentReload(() => store.savePolygon(cur.id, poly));
    },
    onEdit: (poly) => {
      const cur = store.currentCase();
      if (cur) void silentReload(() => store.savePolygon(cur.id, poly));
    },
    onChange: () => {
      const cur = store.currentCase();
      if (cur) setTimeout(() => render(), 0);
    },
  });

  void store.getImageBlob(img).then(async (blob) => {
    const dims = await renderer!.loadImage(blob);
    fitStageSize(stage, glCanvas, overlay, dims.naturalWidth, dims.naturalHeight);
    renderer!.setParams(liveParams!);
    renderer!.render();
    anno!.redraw();
  });

  resizeObserver?.disconnect();
  resizeObserver = new ResizeObserver(() => {
    if (!renderer) return;
    const size = renderer.getImageSize();
    if (size) fitStageSize(stage, glCanvas, overlay, size.w, size.h);
  });
  resizeObserver.observe(stage);
}

function fitStageSize(stage: HTMLElement, _glCanvas: HTMLCanvasElement, _overlay: HTMLCanvasElement, imgW: number, imgH: number): void {
  const inner = stage.querySelector<HTMLElement>('.stage-inner');
  if (!inner) return;
  const availW = stage.clientWidth || 800;
  const maxH = Math.min(640, window.innerHeight - 260);
  let w = availW;
  let h = (w * imgH) / imgW;
  if (h > maxH) {
    h = maxH;
    w = (h * imgW) / imgH;
  }
  inner.style.width = `${w}px`;
  inner.style.height = `${h}px`;
  anno?.resize(w, h);
}

// ---------------- 测量面板 ----------------

function measurePanel(c: EsdCase): HTMLElement {
  const box = h('div', { class: 'card' });
  box.append(h('h3', {}, '测量结果（按像素比例尺）'));
  const calSel = h('select', {
    onchange: (e: Event) => void silentReload(() => store.setCalibration(c.id, (e.target as HTMLSelectElement).value || null)),
  },
    h('option', { value: '' }, '— 选择比例尺 —'),
    ...store.state.calibrations.map((cal) => {
      const opt = h('option', { value: cal.id }, `${cal.name}（${cal.knownLengthMm} mm）`);
      if (c.calibrationId === cal.id) opt.selected = true;
      return opt;
    }),
  );
  box.append(h('label', { class: 'field' }, h('span', {}, '比例尺标定'), calSel));

  const m = c.measurements;
  if (!m) {
    box.append(h('p', { class: 'muted' }, '完成标定并圈定病变范围后自动计算长径、短径与面积。'));
  } else {
    box.append(
      kv('病变长径', formatMm(m.longAxisMm)),
      kv('病变短径', formatMm(m.shortAxisMm)),
      kv('病变面积', formatArea(m.areaMm2)),
      kv('抬举范围面积', formatArea(m.liftingAreaMm2)),
      kv('切开范围面积', formatArea(m.incisionAreaMm2)),
    );
  }

  // 多边形管理
  if (c.polygons.length > 0) {
    box.append(h('h4', {}, '标注管理（拖动顶点微调，双击边线插入顶点）'));
    for (const poly of c.polygons) {
      box.append(h('div', {
        style: 'display:flex;justify-content:space-between;align-items:center;padding:4px 0',
      },
        h('span', {}, polygonLabel(poly), ` · ${poly.points.length} 点`),
        h('button', {
          class: 'pill-remove',
          disabled: c.status === 'pending' || c.status === 'approved',
          onclick: () => void silentReload(() => store.deletePolygon(c.id, poly.id)),
        }, '删除'),
      ));
    }
  }
  return box;
}

function polygonLabel(poly: Polygon): string {
  return poly.kind === 'lesion' ? '病变范围' : poly.kind === 'lifting' ? '抬举试验边界' : '计划切开线';
}

function kv(k: string, v: string): HTMLElement {
  return h('div', { class: 'kv' }, h('span', { class: 'k' }, k), h('span', { class: 'v' }, v));
}

// ---------------- 审计 ----------------

function auditPanel(c: EsdCase): HTMLElement {
  const box = h('div', { class: 'card' });
  box.append(h('h3', {}, '流程记录'));
  const ul = h('ul', { class: 'timeline' },
    ...c.audit.slice().reverse().map((a) => h('li', {},
      h('div', {}, h('strong', {}, a.action), a.detail ? `（${a.detail}）` : ''),
      h('div', { class: 't-time' }, `${fmtDateTime(a.at)} · ${a.role}`),
    )),
  );
  box.append(ul);
  return box;
}

// ---------------- 工作流按钮 ----------------

function workflowButtons(c: EsdCase): HTMLElement {
  const row = h('div', { class: 'btn-row' });
  const role = store.state.role;

  if ((role === 'endoscopist') && (c.status === 'drafting' || c.status === 'returned')) {
    row.append(h('button', {
      class: 'btn btn-primary',
      onclick: () => {
        const problems = store.validateSubmission(c);
        if (problems.length > 0) return toast(problems.join('；'), 'error');
        void store.submitForDiscussion(c.id).then(() => {
          toast('已提交到待讨论列表', 'success');
          render();
        });
      },
    }, '提交讨论'));
  }
  if (role === 'reviewer' && c.status === 'pending') {
    row.append(
      h('button', { class: 'btn btn-primary', onclick: () => {
        void store.approveCase(c.id).then(() => {
          toast('讨论通过', 'success');
          render();
        });
      } }, '通过'),
      h('button', { class: 'btn btn-danger', onclick: () => showReturnModal(c.id) }, '退回修改'),
    );
  }
  if (c.status === 'approved') {
    row.append(h('button', {
      class: 'btn btn-primary',
      onclick: () => void exportSheet(c),
    }, '导出讨论单 (PNG)'));
  }
  if (c.status === 'pending') {
    row.append(h('button', { class: 'btn', onclick: () => void exportSheet(c) }, '预览讨论单'));
  }
  return row;
}

async function exportSheet(c: EsdCase): Promise<void> {
  if (!renderer || c.polygons.length === 0) {
    toast('缺少标注，无法导出', 'error');
    return;
  }
  const off = renderer.drawToOffscreen();
  if (!off) return;
  const overlay = composeOverlay(off, c);
  const sheet = exportDiscussionSheet(c, overlay);
  downloadCanvas(sheet, `ESD讨论单_${c.patientNo}_${Date.now()}.png`);
  toast('讨论单已导出', 'success');
}
