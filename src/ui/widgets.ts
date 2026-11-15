// 轻量提示与模态框
type ToastType = 'info' | 'ok' | 'warn' | 'error';

export function toast(message: string, type: ToastType = 'info', duration = 3600) {
  const root = document.getElementById('toastRoot')!;
  const el = document.createElement('div');
  el.className = `toast ${type === 'info' ? '' : type}`;
  el.textContent = message;
  root.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transition = 'opacity .25s';
    setTimeout(() => el.remove(), 260);
  }, duration);
}

export interface ModalHandle {
  close: () => void;
}

export function modal(title: string, bodyHtml: string, onMount?: (root: HTMLElement, close: () => void) => void): ModalHandle {
  const root = document.getElementById('modalRoot')!;
  const mask = document.createElement('div');
  mask.className = 'mask';
  mask.innerHTML = `<div class="modal"><h2>${title}</h2><div class="modal-body">${bodyHtml}</div></div>`;
  const close = () => mask.remove();
  mask.addEventListener('mousedown', (e) => { if (e.target === mask) close(); });
  root.appendChild(mask);
  onMount?.(mask, close);
  return { close };
}

export function confirmModal(title: string, html: string): Promise<boolean> {
  return new Promise((resolve) => {
    const m = modal(title, html + `<div class="foot">
      <button class="btn ghost" data-act="cancel">取消</button>
      <button class="btn primary" data-act="ok">确定</button></div>`);
    const mask = document.querySelector('#modalRoot .mask:last-child') as HTMLElement;
    mask.querySelector('[data-act=cancel]')!.addEventListener('click', () => { m.close(); resolve(false); });
    mask.querySelector('[data-act=ok]')!.addEventListener('click', () => { m.close(); resolve(true); });
  });
}

export function fmt(n: number, digits = 2): string {
  return n.toLocaleString('zh-CN', { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

export function fmtDate(iso: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}
