// 待讨论视图：上级医师比对增强前后图像、查看测量与对账，执行通过/退回

import type { EsdCase } from '../types';
import { STATUS_LABEL, MODALITY_LABEL } from '../types';
import { store } from '../storage/store';
import { clear, fmtDateTime, h, toast } from '../utils/dom';
import { formatArea, formatMm } from '../utils/geometry';
import { EnhanceRenderer } from '../webgl/EnhanceRenderer';
import { defaultParams } from '../webgl/presets';
import { KIND_STYLE } from '../components/AnnotationCanvas';
import { showReturnModal } from './modals';
import { composeOverlay, downloadCanvas, exportDiscussionSheet } from '../utils/export';

export function renderDiscussion(root: HTMLElement): void {
  clear(root);
  const pending = store.state.cases.filter((c) => c.status === 'pending' || c.status === 'approved' || c.status === 'returned');

  root.append(
    h('div', { class: 'page-head' }, h('h2', {}, '术前讨论（上级医师）')),
  );

  if (pending.length === 0) {
    root.append(h('div', { class: 'card' }, h('p', { class: 'muted' }, '待讨论列表为空。内镜医师提交后病例会出现在这里。')));
    return;
  }

  for (const c of pending) {
    root.append(discussionCard(c));
  }
}

function discussionCard(c: EsdCase): HTMLElement {
  const card = h('div', { class: 'card', style: 'margin-bottom:16px' });
  const head = h('div', { style: 'display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:12px' });
  head.append(
    h('h3', { style: 'margin:0' },
      `${c.patientNo} · ${c.lesionSite || '部位未填'} · ${c.operator || '医师未填'}　`,
      h('span', { class: `badge badge-${c.status}` }, STATUS_LABEL[c.status]),
    ),
    h('div', { class: 'btn-row' },
      c.status === 'pending'
        ? h('button', { class: 'btn btn-primary', onclick: () => {
          void store.approveCase(c.id).then(() => {
            toast('已通过', 'success');
            renderDiscussion(document.getElementById('view-root')!);
          });
        } }, '通过')
        : null,
      c.status === 'pending' ? h('button', { class: 'btn btn-danger', onclick: () => showReturnModal(c.id) }, '退回并填原因') : null,
      (c.status === 'pending' || c.status === 'approved')
        ? h('button', { class: 'btn', onclick: () => void exportFromCard(c) }, '导出讨论单')
        : null,
    ),
  );
  card.append(head);

  if (c.status === 'returned') {
    card.append(h('div', { class: 'warn-box', style: 'margin-bottom:12px' }, `退回原因：${c.returnReason}`));
  }

  // 图像对比区
  const compare = h('div', { class: 'compare-grid' });
  const img = c.images.find((i) => i.id === c.activeImageId) ?? c.images[0];
  if (img) {
    const rawCell = h('div', { class: 'compare-cell' },
      h('div', { class: 'cell-title' }, `原图 · ${MODALITY_LABEL[img.modality]}`),
      h('div', { style: 'padding:8px' }, h('img', { style: 'max-width:100%;border-radius:4px' })),
    );
    const enhCell = h('div', { class: 'compare-cell' },
      h('div', { class: 'cell-title' }, '增强 + 边界叠加'),
      h('div', { style: 'padding:8px' }, h('canvas')),
    );
    compare.append(rawCell, enhCell);
    void store.getImageBlob(img).then((blob) => {
      const url = URL.createObjectURL(blob);
      (rawCell.querySelector('img') as HTMLImageElement).src = url;
      renderEnhanced(c, blob, enhCell.querySelector('canvas')!);
    });
  } else {
    compare.append(h('div', { class: 'muted' }, '无截图'));
  }
  card.append(compare);

  // 测量与对账
  const m = c.measurements;
  const r = c.reconciliation;
  const info = h('div', { class: 'grid-2', style: 'margin-top:14px' });
  info.append(
    h('div', {},
      h('h4', { style: 'margin-top:0' }, '尺寸与面积'),
      m
        ? h('div', {},
          kv('病变长径', formatMm(m.longAxisMm)),
          kv('病变短径', formatMm(m.shortAxisMm)),
          kv('病变面积', formatArea(m.areaMm2)),
          kv('切开范围面积', formatArea(m.incisionAreaMm2)),
          kv('抬举范围面积', formatArea(m.liftingAreaMm2)),
        )
        : h('p', { class: 'muted' }, '无测量数据'),
    ),
    h('div', {},
      h('h4', { style: 'margin-top:0' }, '取材对账'),
      r
        ? (r.passed
          ? h('div', { class: 'ok-box' }, `✓ ${r.blockCount} 块，合计 ${formatArea(r.totalBlockAreaMm2)}，覆盖切开线`)
          : h('div', { class: 'warn-box' }, h('strong', {}, '✗ 盖不住切开线 '), h('ul', {}, ...r.warnings.map((w) => h('li', {}, w)))))
        : h('p', { class: 'muted' }, '无对账数据'),
      h('h4', {}, '边界图例'),
      h('div', { class: 'muted', style: 'line-height:2' },
        ...c.polygons.map((p) => h('div', {},
          h('span', { class: 'dot', style: `display:inline-block;width:10px;height:10px;border-radius:50%;background:${KIND_STYLE[p.kind].stroke};margin-right:6px` }),
          polygonLabel(p.kind), `（${p.points.length} 个顶点）`),
        ),
      ),
    ),
  );
  card.append(info);

  // 审计
  card.append(
    h('h4', {}, '流程记录'),
    h('ul', { class: 'timeline' },
      ...c.audit.slice().reverse().map((a) => h('li', {},
        h('div', {}, h('strong', {}, a.action), a.detail ? `（${a.detail}）` : ''),
        h('div', { class: 't-time' }, `${fmtDateTime(a.at)} · ${a.role}`),
      )),
    ),
  );
  return card;
}

function polygonLabel(kind: 'lesion' | 'lifting' | 'incision'): string {
  return kind === 'lesion' ? '病变范围' : kind === 'lifting' ? '抬举试验边界' : '计划切开线';
}

function kv(k: string, v: string): HTMLElement {
  return h('div', { class: 'kv' }, h('span', { class: 'k' }, k), h('span', { class: 'v' }, v));
}

async function renderEnhanced(c: EsdCase, blob: Blob, target: HTMLCanvasElement): Promise<void> {
  let renderer: EnhanceRenderer | null = null;
  try {
    const params = c.enhanceParams ?? defaultParams();
    // 离屏 WebGL canvas 做增强，再画到可见 2D canvas（同一 canvas 不能同时取两种上下文）
    const glCanvas = document.createElement('canvas');
    renderer = new EnhanceRenderer(glCanvas, params);
    const img = await renderer.loadImage(blob);
    const w = Math.min(img.naturalWidth, 560);
    const h = (w * img.naturalHeight) / img.naturalWidth;
    glCanvas.width = w;
    glCanvas.height = h;
    renderer.render();
    target.width = w;
    target.height = h;
    const ctx = target.getContext('2d')!;
    ctx.drawImage(glCanvas, 0, 0, w, h);
    for (const poly of c.polygons) {
      const style = KIND_STYLE[poly.kind];
      ctx.beginPath();
      poly.points.forEach((pt, i) => {
        const x = pt.x * w;
        const y = pt.y * h;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle = style.fill;
      ctx.fill();
      ctx.strokeStyle = style.stroke;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  } catch (err) {
    toast((err as Error).message, 'error');
  } finally {
    renderer?.dispose();
  }
}

async function exportFromCard(c: EsdCase): Promise<void> {
  const img = c.images.find((i) => i.id === c.activeImageId) ?? c.images[0];
  if (!img) return toast('无截图', 'error');
  const blob = await store.getImageBlob(img);
  const off = document.createElement('canvas');
  const bmp = await createImageBitmap(blob);
  off.width = bmp.width;
  off.height = bmp.height;
  // 原图 + 直接叠加（讨论页不持有主渲染器，使用 2D 叠加保证可导出）
  off.getContext('2d')!.drawImage(bmp, 0, 0);
  const overlay = composeOverlay(off, c);
  const sheet = exportDiscussionSheet(c, overlay);
  downloadCanvas(sheet, `ESD讨论单_${c.patientNo}_${Date.now()}.png`);
  toast('讨论单已导出', 'success');
}
