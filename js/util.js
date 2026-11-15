/* BoardDocs Studio — 通用工具（ESM） */
export const U = {};

let seq = 0;
U.uid = (p) => `${p || 'id'}_${(++seq).toString(36)}${Math.random().toString(36).slice(2, 6)}`;
U.clone = (v) => (typeof structuredClone === 'function' ? structuredClone(v) : JSON.parse(JSON.stringify(v)));

/* ---------- DOM ---------- */
function append(el, kids) {
  for (const k of kids.flat(4)) {
    if (k == null || k === false) continue;
    if (Array.isArray(k)) append(el, k);
    else if (k instanceof Node) el.appendChild(k);
    else el.appendChild(document.createTextNode(String(k)));
  }
}
U.h = function (tag, props, ...kids) {
  const el = document.createElement(tag);
  if (props) {
    for (const [k, v] of Object.entries(props)) {
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k === 'text') el.textContent = v;
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else if (k === 'dataset') Object.assign(el.dataset, v);
      else if (k === 'value') el.value = v;
      else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
      else if (k === 'checked' || k === 'disabled' || k === 'selected' || k === 'hidden' || k === 'readOnly') el[k] = !!v;
      else el.setAttribute(k, v === true ? '' : v);
    }
  }
  append(el, kids);
  return el;
};
U.svg = function (tag, props, ...kids) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  if (props) {
    for (const [k, v] of Object.entries(props)) {
      if (v == null || v === false) continue;
      if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
      else el.setAttribute(k, v === true ? '' : v);
    }
  }
  for (const k of kids.flat(3)) {
    if (k == null || k === false) continue;
    if (k instanceof Node) el.appendChild(k);
    else el.appendChild(document.createTextNode(String(k)));
  }
  return el;
};
U.esc = (s) =>
  String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
U.qs = (sel, root) => (root || document).querySelector(sel);
U.clear = (el) => {
  while (el.firstChild) el.removeChild(el.firstChild);
  return el;
};

/* ---------- time ---------- */
const pad = (n) => String(n).padStart(2, '0');
U.fmtDate = (ts) => {
  if (!ts) return '—';
  const d = new Date(ts);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};
U.fmtDay = (ts) => {
  if (!ts) return '—';
  const d = new Date(ts);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};
U.rel = (ts) => {
  if (!ts) return '—';
  const diff = Date.now() - ts;
  const m = diff / 60000;
  if (m < 1) return '刚刚';
  if (m < 60) return `${Math.floor(m)} 分钟前`;
  const hr = m / 60;
  if (hr < 24) return `${Math.floor(hr)} 小时前`;
  const d = hr / 24;
  if (d < 30) return `${Math.floor(d)} 天前`;
  return U.fmtDay(ts);
};
U.fmtDuration = (ms) => {
  if (ms == null || isNaN(ms) || ms < 0) return '—';
  const min = ms / 60000;
  if (min < 1) return '< 1 分钟';
  if (min < 90) return `${Math.round(min)} 分钟`;
  const hr = min / 60;
  if (hr < 36) return `${hr.toFixed(hr < 10 ? 1 : 0)} 小时`;
  const d = hr / 24;
  return `${d.toFixed(d < 10 ? 1 : 0)} 天`;
};

/* ---------- toast ---------- */
U.toast = function (msg, kind, ms) {
  const box = document.getElementById('toasts');
  if (!box) return;
  const el = U.h('div', { class: 'toast ' + (kind || '') }, msg);
  box.appendChild(el);
  setTimeout(() => {
    el.classList.add('fade');
    setTimeout(() => el.remove(), 320);
  }, ms || 2800);
};

/* ---------- modal ---------- */
U.modal = function (opts) {
  const root = document.getElementById('modal-root');
  const close = () => {
    back.remove();
    document.removeEventListener('keydown', onKey);
    if (opts.onClose) opts.onClose();
  };
  const onKey = (e) => {
    if (e.key === 'Escape') close();
  };
  const body = typeof opts.body === 'string' ? U.h('div', { html: opts.body }) : opts.body;
  const foot = U.h('footer');
  for (const a of opts.actions || []) {
    foot.appendChild(
      U.h(
        'button',
        {
          class: 'btn ' + (a.kind || ''),
          onclick: () => {
            const r = a.onClick ? a.onClick(close) : undefined;
            if (r !== false && a.keepOpen !== true) close();
          },
        },
        a.label
      )
    );
  }
  if (!foot.childElementCount) foot.appendChild(U.h('button', { class: 'btn', onclick: close }, '关闭'));
  const modal = U.h(
    'div',
    { class: 'modal', role: 'dialog', 'aria-modal': 'true', style: opts.width ? { width: opts.width } : null },
    U.h('header', {}, U.h('h2', {}, opts.title || ''), U.h('button', { class: 'icon-btn', onclick: close, title: '关闭' }, '✕')),
    U.h('div', { class: 'content' }, body),
    foot
  );
  const back = U.h('div', { class: 'modal-back', onmousedown: (e) => { if (e.target === back) close(); } }, modal);
  root.appendChild(back);
  document.addEventListener('keydown', onKey);
  const focusEl = modal.querySelector('input, textarea, select');
  if (focusEl) setTimeout(() => focusEl.focus(), 30);
  return close;
};
U.confirm = function (title, text, okLabel, onOk, danger) {
  U.modal({
    title,
    body: U.h('p', { style: { margin: 0, lineHeight: 1.7 } }, text),
    actions: [
      { label: '取消' },
      { label: okLabel || '确定', kind: danger ? 'danger' : 'primary', onClick: () => onOk && onOk() },
    ],
  });
};

/* ---------- download ---------- */
U.download = function (filename, content, mime) {
  try {
    const blob = content instanceof Blob ? content : new Blob([content], { type: mime || 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 6000);
    return true;
  } catch (e) {
    U.toast('导出失败：' + e.message, 'err');
    return false;
  }
};

U.debounce = (fn, ms) => {
  let t;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), ms || 160);
  };
};
U.hexToRgb = function (hex) {
  const h = String(hex || '#888888').replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};
U.rgbToHex = function (rgb) {
  const p = (v) => Math.max(0, Math.min(255, Math.round(v * 255))).toString(16).padStart(2, '0');
  return '#' + p(rgb[0]) + p(rgb[1]) + p(rgb[2]);
};
U.mix = (hex, target, amount) => {
  const a = U.hexToRgb(hex), b = U.hexToRgb(target);
  return U.rgbToHex(a.map((v, i) => v + (b[i] - v) * amount));
};
U.fmtPct = (v) => `${Math.round((v || 0) * 100)}%`;
U.seeded = function (seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};
U.slug = (s) => String(s || '').replace(/[^\w一-龥-]+/g, '_').replace(/^_+|_+$/g, '');
