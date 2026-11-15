import { FLAG_RULES } from './constants.js';

export function fmtDate(ts) {
  if (!ts) return '—';
  const d = new Date(ts);
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

export function fmtDay(ts) {
  if (!ts) return '—';
  const d = new Date(ts);
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export function toCSV(rows, headers) {
  const esc = (v) => {
    if (v === null || v === undefined) return '';
    const s = String(v).replaceAll('"', '""');
    return /[",\n]/.test(s) ? `"${s}"` : s;
  };
  const head = headers.map((h) => esc(h.label)).join(',');
  const body = rows
    .map((r, i) => headers.map((h) => esc(typeof h.get === 'function' ? h.get(r, i) : r[h.key])).join(','))
    .join('\r\n');
  return '﻿' + head + '\r\n' + body;
}

// 差异判定：直径增加 >1mm 或边缘新出现不规则，或基线不存在的新痣
export function diffFinding(baseline, current) {
  const reasons = [];
  let flagged = false;
  if (!baseline) {
    flagged = FLAG_RULES.newMole;
    if (flagged) reasons.push('新发痣（基线无记录）');
    return {
      flagged,
      reasons,
      deltaMm: null,
      diameterBase: null,
      edgeBase: null,
      networkBase: null
    };
  }
  const delta = +(current.diameterMm - baseline.diameterMm).toFixed(2);
  const irregularNow = FLAG_RULES.irregularEdges.includes(current.edgeType);
  const irregularBefore = FLAG_RULES.irregularEdges.includes(baseline.edgeType);
  if (delta > FLAG_RULES.diameterDeltaMm) {
    flagged = true;
    reasons.push(`直径增加 ${delta.toFixed(2)}mm（阈值 >${FLAG_RULES.diameterDeltaMm}mm）`);
  }
  if (irregularNow && !irregularBefore) {
    flagged = true;
    reasons.push(`边缘由「${baseline.edgeType}」变为「${current.edgeType}」`);
  }
  return {
    flagged,
    reasons,
    deltaMm: delta,
    diameterBase: baseline.diameterMm,
    edgeBase: baseline.edgeType,
    networkBase: baseline.networkType
  };
}

// 合成皮肤镜示意照片（无真实照片时的演示数据）
export function synthDermoscopyImage(seed, diameterMm, edgeType, networkType) {
  const size = 320;
  const cnv = document.createElement('canvas');
  cnv.width = cnv.height = size;
  const ctx = cnv.getContext('2d');
  let s = 0;
  for (const ch of String(seed)) s = (s * 31 + ch.charCodeAt(0)) >>> 0;
  const rnd = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  // 皮肤底色
  const grad = ctx.createRadialGradient(size / 2, size / 2, 20, size / 2, size / 2, size / 1.5);
  grad.addColorStop(0, '#f2c9ad');
  grad.addColorStop(1, '#d9a383');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const cx = size / 2 + (rnd() - 0.5) * 14;
  const cy = size / 2 + (rnd() - 0.5) * 14;
  const r = Math.max(26, Math.min(110, diameterMm * 14));
  const irregular = edgeType.includes('不规则') || edgeType.includes('伪足');
  // 痣本体
  ctx.beginPath();
  const pts = 48;
  for (let i = 0; i <= pts; i++) {
    const ang = (i / pts) * Math.PI * 2;
    const wobble = irregular ? 1 + (rnd() - 0.5) * 0.32 : 1 + (rnd() - 0.5) * 0.05;
    const x = cx + Math.cos(ang) * r * wobble;
    const y = cy + Math.sin(ang) * r * wobble * (irregular ? 0.9 + rnd() * 0.2 : 1);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  const moleGrad = ctx.createRadialGradient(cx, cy, r * 0.1, cx, cy, r);
  moleGrad.addColorStop(0, '#5a3826');
  moleGrad.addColorStop(0.7, '#7a4a30');
  moleGrad.addColorStop(1, '#9a6a48');
  ctx.fillStyle = moleGrad;
  ctx.fill();
  // 色素网络
  if (networkType !== '无结构' && networkType !== '均质状') {
    ctx.strokeStyle = 'rgba(40,22,14,0.55)';
    ctx.lineWidth = 1.2;
    const lines = networkType.includes('非典型') ? 26 : 18;
    for (let i = 0; i < lines; i++) {
      ctx.beginPath();
      const x0 = cx + (rnd() - 0.5) * r * 1.4;
      const y0 = cy + (rnd() - 0.5) * r * 1.4;
      ctx.moveTo(x0, y0);
      ctx.bezierCurveTo(
        x0 + (rnd() - 0.5) * 40, y0 + (rnd() - 0.5) * 40,
        x0 + (rnd() - 0.5) * 50, y0 + (rnd() - 0.5) * 50,
        x0 + (rnd() - 0.5) * r, y0 + (rnd() - 0.5) * r
      );
      ctx.stroke();
    }
  }
  // 比例尺
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.fillRect(size - 86, size - 28, 60, 5);
  ctx.font = '12px system-ui';
  ctx.fillText('1 mm', size - 80, size - 12);
  return new Promise((resolve) => cnv.toBlob((b) => resolve(b), 'image/png'));
}

export function blobUrl(blob) {
  if (!blob) return null;
  return URL.createObjectURL(blob);
}
