/* BoardDocs Studio — 导出：引脚清单 CSV / 装配步骤图 SVG / 说明包 JSON */
import { U } from './util.js';
import { GROUPS, GROUP_MAP, LAYER_KINDS, pinConflicts, store } from './store.js';

const ACT_LABEL = { install: '安装', remove: '拆卸' };

export function pinRows(board, content) {
  return (content.pins || []).map((p, i) => {
    const conflicts = pinConflicts(p);
    const layer = (content.layers || []).find((l) => l.id === p.layerId);
    return {
      no: i + 1,
      name: p.name || '',
      voltage: p.voltage || '',
      group: GROUP_MAP[p.group]?.label || '未分组',
      layer: layer?.name || '',
      funcs: (p.funcs || []).map((f) => f.label).filter(Boolean).join(' / '),
      conflict: conflicts.length ? conflicts.map((c) => c.name).join(' / ') : '',
      note: p.note || '',
    };
  });
}

export function exportPinCsv(board, content) {
  const rows = pinRows(board, content);
  const head = ['序号', '引脚名称', '电压', '分组', '所在图层', '复用功能', '重复占用', '备注'];
  const esc = (v) => {
    const s = String(v == null ? '' : v);
    return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  };
  const lines = [
    `# ${board.name} (${board.sku}) 引脚清单`,
    `# 导出时间 ${U.fmtDate(Date.now())} · 共 ${rows.length} 个引脚 · 未标电压 ${rows.filter((r) => !r.voltage).length} 个`,
    head.map(esc).join(','),
    ...rows.map((r) => [r.no, r.name, r.voltage, r.group, r.layer, r.funcs, r.conflict, r.note].map(esc).join(',')),
  ];
  U.download(`${U.slug(board.sku)}_pins.csv`, '﻿' + lines.join('\r\n'), 'text/csv;charset=utf-8');
}

/* ============================================================
   装配步骤图 SVG
   ============================================================ */
export function stepsSvg(board, content) {
  const steps = content.steps || [];
  const layers = content.layers || [];
  const cols = 3;
  const cw = 300, ch = 218, gap = 16;
  const W = cols * cw + (cols - 1) * gap + 56;
  const headerH = 92;
  const rows = Math.ceil(steps.length / cols) || 1;
  const H = headerH + rows * ch + (rows - 1) * gap + 70;
  const parts = [];
  const actColor = (a) => (a === 'install' ? '#2aa895' : '#c98a3a');

  parts.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="'Microsoft YaHei','PingFang SC',sans-serif">`);
  parts.push(`<rect width="${W}" height="${H}" fill="#0e151d"/>`);
  // header
  parts.push(`<text x="28" y="42" fill="#dfe8f0" font-size="21" font-weight="700">${xml(board.name)}</text>`);
  parts.push(`<text x="28" y="66" fill="#7f93a5" font-size="12.5">${xml(board.sku)} · 装配步骤图 · ${steps.length} 步 · 导出于 ${U.fmtDay(Date.now())}</text>`);
  parts.push(`<line x1="28" y1="${headerH - 10}" x2="${W - 28}" y2="${headerH - 10}" stroke="#24313e"/>`);

  steps.forEach((st, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    const x = 28 + col * (cw + gap);
    const y = headerH + row * (ch + gap);
    const color = actColor(st.action);
    parts.push(`<g>`);
    parts.push(`<rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="10" fill="#151d26" stroke="#24313e"/>`);
    parts.push(`<rect x="${x}" y="${y}" width="${cw}" height="3" rx="1.5" fill="${color}"/>`);
    // thumbnail: 迷你爆炸视图（涉及图层高亮，其余半透明）
    const tx = x + 14, ty = y + 22, tw = 96, th = 92;
    parts.push(`<rect x="${tx}" y="${ty}" width="${tw}" height="${th}" rx="7" fill="#0b1219" stroke="#1d2937"/>`);
    const stack = layers.slice().reverse().slice(0, 5); // 顶层在上
    const involvedIds = new Set(st.layerIds || []);
    const cascade = stack.length;
    stack.forEach((l, k) => {
      const involved = involvedIds.has(l.id);
      const sw = tw * 0.6 - k * 2;
      const sx = tx + (tw - sw) / 2 + (k - cascade / 2) * 2.4;
      const sh = 9;
      const sy = ty + th - 20 - k * 14;
      if (involved) {
        parts.push(`<rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="2" fill="${l.color}" stroke="rgba(255,255,255,.45)"/>`);
      } else {
        parts.push(`<rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="2" fill="${l.color}" fill-opacity="0.14" stroke="${l.color}" stroke-opacity="0.35"/>`);
      }
    });
    // 方向标记
    if (st.action === 'remove') {
      parts.push(`<g stroke="#e8b45a" stroke-width="1.5" fill="none" stroke-linecap="round"><path d="M${tx + tw - 17} ${ty + 20} l0 -9 m-4 4 l4 -4 l4 4"/></g>`);
    } else {
      parts.push(`<g stroke="#5fd68a" stroke-width="1.5" fill="none" stroke-linecap="round"><path d="M${tx + tw - 17} ${ty + 11} l0 9 m-4 -4 l4 4 l4 -4"/></g>`);
    }
    // text
    const tx2 = x + 122;
    parts.push(`<text x="${tx2}" y="${y + 34}" fill="#7f93a5" font-size="11" font-family="ui-monospace,Consolas,monospace">STEP ${String(i + 1).padStart(2, '0')}</text>`);
    parts.push(`<text x="${x + cw - 14}" y="${y + 34}" fill="${color}" font-size="11" text-anchor="end">${ACT_LABEL[st.action] || '操作'}</text>`);
    wrapText(st.title || '(未命名步骤)', 13, 15, tx2, y + 56, cw - 136).forEach((ln, k) => {
      parts.push(`<text x="${tx2}" y="${y + 56 + k * 17}" fill="#dfe8f0" font-size="13" font-weight="600">${xml(ln)}</text>`);
    });
    // layer chips
    let chipX = tx2;
    let chipY = y + 104;
    (st.layerIds || []).forEach((id) => {
      const l = layers.find((q) => q.id === id);
      if (!l) return;
      const w = Math.min(100, 16 + l.name.length * 7.2);
      if (chipX + w > x + cw - 12) { chipX = tx2; chipY += 22; }
      parts.push(`<rect x="${chipX}" y="${chipY}" width="${w}" height="17" rx="4" fill="${l.color}" opacity="0.22" stroke="${l.color}" stroke-opacity="0.45"/>`);
      parts.push(`<text x="${chipX + w / 2}" y="${chipY + 12}" fill="#c8d6e2" font-size="10" text-anchor="middle">${xml(clip(l.name, 9))}</text>`);
      chipX += w + 5;
    });
    // note
    if (st.note) {
      parts.push(`<line x1="${x + 12}" y1="${y + ch - 46}" x2="${x + cw - 12}" y2="${y + ch - 46}" stroke="#1f2b36"/>`);
      wrapText(st.note, 10.5, 13.5, x + 14, y + ch - 30, cw - 28).slice(0, 2).forEach((ln, k) => {
        parts.push(`<text x="${x + 14}" y="${y + ch - 30 + k * 14}" fill="#8ba0b2" font-size="10.5">${xml(ln)}</text>`);
      });
    }
    parts.push(`</g>`);
  });

  // footer
  const fy = H - 32;
  parts.push(`<text x="28" y="${fy}" fill="#5c6e80" font-size="10.5">BoardDocs Studio · 本图由装配步骤自动生成，修改步骤后请重新导出 · 供课程组与售后使用</text>`);
  parts.push(`</svg>`);
  return parts.join('\n');
}

export function exportStepsSvg(board, content) {
  const svg = stepsSvg(board, content);
  U.download(`${U.slug(board.sku)}_assembly.svg`, svg, 'image/svg+xml;charset=utf-8');
}

export function exportDocJson(board, content, name) {
  const doc = {
    board: { id: board.id, name: board.name, sku: board.sku, desc: board.desc },
    meta: {
      exportedAt: new Date().toISOString(),
      exporter: store.currentUser().name,
      version: store.latestVersion(board)?.label || null,
      firmware: store.latestVersion(board)?.firmware || null,
    },
    pins: pinRows(board, content),
    layers: (content.layers || []).map((l, i) => ({ order: i + 1, name: l.name, kind: l.kind, type: LAYER_KINDS[l.kind]?.label || l.kind })),
    steps: (content.steps || []).map((s, i) => ({
      no: i + 1,
      action: ACT_LABEL[s.action] || s.action,
      title: s.title,
      parts: (s.layerIds || []).map((id) => (content.layers.find((l) => l.id === id) || {}).name).filter(Boolean),
      note: s.note || '',
    })),
  };
  U.download(`${name || U.slug(board.sku)}_doc.json`, JSON.stringify(doc, null, 2), 'application/json;charset=utf-8');
}

/* ---------- text helpers ---------- */
function xml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c]));
}
function clip(s, n) {
  const a = [...String(s)];
  return a.length > n ? a.slice(0, n - 1).join('') + '…' : a.join('');
}
function wrapText(text, size, lineH, x, y, maxW) {
  // 粗略按字符宽度换行（中文按 1 个字宽，ASCII 按 0.55）
  const chars = [...String(text || '')];
  const lines = [];
  let cur = '', w = 0;
  for (const ch of chars) {
    const cw = /[一-龥]/.test(ch) ? size : size * 0.56;
    if (w + cw > maxW && cur) {
      lines.push(cur);
      cur = '';
      w = 0;
    }
    cur += ch;
    w += cw;
  }
  if (cur) lines.push(cur);
  return lines;
}
