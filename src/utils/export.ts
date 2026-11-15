// 讨论单导出：将增强图像 + 边界叠加渲染到一张高清 Canvas，导出 PNG 与可打印讨论单

import type { EsdCase } from '../types';
import { MODALITY_LABEL, STATUS_LABEL } from '../types';
import { formatArea, formatMm } from '../utils/geometry';
import { KIND_STYLE } from '../components/AnnotationCanvas';

/** 生成带边界叠加的合成图（增强结果 + 多边形），返回 canvas */
export function composeOverlay(
  enhanced: HTMLCanvasElement | HTMLImageElement,
  caseData: EsdCase,
): HTMLCanvasElement {
  const w = enhanced.width;
  const h = enhanced.height;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(enhanced, 0, 0, w, h);

  for (const poly of caseData.polygons) {
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
    ctx.lineWidth = Math.max(2, w / 500);
    ctx.stroke();
    const first = poly.points[0];
    ctx.font = `bold ${Math.max(14, w / 45)}px system-ui`;
    ctx.fillStyle = style.stroke;
    ctx.fillText(style.label, first.x * w + 8, first.y * h - 8);
  }
  return canvas;
}

/** 完整讨论单：信息头 + 叠加图 + 测量/对账/切开线说明，导出 PNG */
export function exportDiscussionSheet(
  caseData: EsdCase,
  overlayCanvas: HTMLCanvasElement,
): HTMLCanvasElement {
  const pad = 40;
  const headerH = 210;
  const footerH = 260;
  const maxW = 1100;
  const scale = Math.min(1, maxW / overlayCanvas.width);
  const imgW = Math.round(overlayCanvas.width * scale);
  const imgH = Math.round(overlayCanvas.height * scale);
  const W = maxW + pad * 2;
  const H = headerH + imgH + footerH + pad * 2;

  const sheet = document.createElement('canvas');
  sheet.width = W;
  sheet.height = H;
  const ctx = sheet.getContext('2d')!;

  // 背景
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#1d1d1f';
  ctx.font = 'bold 26px system-ui';
  ctx.fillText('ESD 术前讨论单', pad, pad + 10);

  ctx.font = '15px system-ui';
  ctx.fillStyle = '#444';
  const m = caseData.measurements;
  const r = caseData.reconciliation;
  const img = caseData.images.find((i) => i.id === caseData.activeImageId) ?? caseData.images[0];
  const lines = [
    `病例编号：${caseData.patientNo}    病灶部位：${caseData.lesionSite || '—'}    操作医师：${caseData.operator || '—'}`,
    `状态：${STATUS_LABEL[caseData.status]}    成像模式：${img ? MODALITY_LABEL[img.modality] : '—'}    导出时间：${new Date().toLocaleString('zh-CN')}`,
    m
      ? `病变长径：${formatMm(m.longAxisMm)}    短径：${formatMm(m.shortAxisMm)}    病变面积：${formatArea(m.areaMm2)}`
      : '测量：未完成标定',
    m && m.incisionAreaMm2 > 0 ? `计划切开范围面积：${formatArea(m.incisionAreaMm2)}    抬举范围面积：${formatArea(m.liftingAreaMm2)}` : '切开线/抬举边界：未完整标注',
    r
      ? `取材块数：${r.blockCount}    取材总面积：${formatArea(r.totalBlockAreaMm2)}    对账结论：${r.passed ? '✓ 通过' : '✗ 未通过'}`
      : '取材对账：未填写',
  ];
  let y = pad + 48;
  for (const line of lines) {
    ctx.fillText(line, pad, y);
    y += 28;
  }

  // 图像
  const imgY = headerH;
  ctx.strokeStyle = '#d2d2d7';
  ctx.lineWidth = 1;
  ctx.strokeRect(pad - 1, imgY - 1, imgW + 2, imgH + 2);
  ctx.drawImage(overlayCanvas, pad, imgY, imgW, imgH);

  // 底部：对账警告与审计
  const fy = imgY + imgH + 30;
  ctx.fillStyle = '#1d1d1f';
  ctx.font = 'bold 16px system-ui';
  ctx.fillText('对账与讨论记录', pad, fy);
  ctx.font = '14px system-ui';
  ctx.fillStyle = r && !r.passed ? '#d70015' : '#444';
  let wy = fy + 26;
  if (r && r.warnings.length > 0) {
    for (const wText of r.warnings) {
      ctx.fillText(`⚠ ${wText}`, pad, wy);
      wy += 22;
    }
  } else {
    ctx.fillText('取材范围可覆盖计划切开线，无对账警告。', pad, wy);
    wy += 22;
  }
  if (caseData.returnReason) {
    ctx.fillStyle = '#d70015';
    ctx.fillText(`上次退回原因：${caseData.returnReason}`, pad, wy + 6);
    wy += 22;
  }
  ctx.fillStyle = '#86868b';
  ctx.font = '12px system-ui';
  const recent = caseData.audit.slice(-6).map((a) => `${new Date(a.at).toLocaleString('zh-CN')} ${a.action}${a.detail ? '（' + a.detail + '）' : ''}`);
  ctx.fillText('流程记录：' + (recent.join(' ｜ ') || '无'), pad, H - pad);

  return sheet;
}

export function downloadCanvas(canvas: HTMLCanvasElement, filename: string): void {
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, 'image/png');
}
