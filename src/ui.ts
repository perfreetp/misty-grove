import { escapeHtml } from './utils';

export class RawHtml {
  constructor(public readonly value: string) {}
  toString(): string {
    return this.value;
  }
}

export function raw(value: string): RawHtml {
  return new RawHtml(value);
}

export function html(strings: TemplateStringsArray, ...values: unknown[]): RawHtml {
  let out = '';
  for (let i = 0; i < strings.length; i++) {
    out += strings[i] ?? '';
    if (i < values.length) out += renderValue(values[i]);
  }
  return new RawHtml(out);
}

function renderValue(value: unknown): string {
  if (value === null || value === undefined || value === false) return '';
  if (value instanceof RawHtml) return value.value;
  if (Array.isArray(value)) return value.map(renderValue).join('');
  return escapeHtml(String(value));
}

// ---------------- icons ----------------

const ICONS: Record<string, string> = {
  registry: '<path d="M9 3h6a1 1 0 0 1 1 1v1H8V4a1 1 0 0 1 1-1z"/><path d="M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><path d="M9 12h6M9 16h4"/>',
  reading: '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="m10 9.5 5 2.5-5 2.5z" fill="currentColor" stroke="none"/>',
  lesions: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.2"/><path d="M12 3.5v2.6M12 17.9v2.6M3.5 12h2.6M17.9 12h2.6"/>',
  report: '<path d="M6 3h8l4.5 4.5V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5"/><path d="m9 14 2 2 4-4"/>',
  stats: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
  play: '<path d="M7 4.8v14.4a.8.8 0 0 0 1.23.67l11-7.2a.8.8 0 0 0 0-1.34l-11-7.2A.8.8 0 0 0 7 4.8z" fill="currentColor" stroke="none"/>',
  pause: '<rect x="6.5" y="4.5" width="4" height="15" rx="1.2" fill="currentColor" stroke="none"/><rect x="13.5" y="4.5" width="4" height="15" rx="1.2" fill="currentColor" stroke="none"/>',
  prev: '<path d="M18 5v14L8 12z" fill="currentColor" stroke="none"/><path d="M5 4.5v15"/>',
  next: '<path d="M6 5v14l10-7z" fill="currentColor" stroke="none"/><path d="M19 4.5v15"/>',
  stepBack: '<path d="M13 6 7 12l6 6"/><path d="M19 6v12"/>',
  stepFwd: '<path d="m11 6 6 6-6 6"/><path d="M5 6v12"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  camera: '<path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.5"/>',
  flag: '<path d="M5 21V4M5 4h10l-1.5 3.5L15 11H5"/>',
  trash: '<path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  alert: '<path d="M12 3 2.5 20a1 1 0 0 0 .87 1.5h17.26a1 1 0 0 0 .87-1.5L12 3z"/><path d="M12 9.5v5"/><circle cx="12" cy="18" r="0.8" fill="currentColor"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6"/><circle cx="12" cy="7.8" r="0.9" fill="currentColor"/>',
  upload: '<path d="M12 16V4M7.5 8.5 12 4l4.5 4.5"/><path d="M4 15v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4"/>',
  download: '<path d="M12 4v12M7.5 11.5 12 16l4.5-4.5"/><path d="M4 15v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.4 2"/>',
  refresh: '<path d="M20 11a8 8 0 1 0-1.6 6"/><path d="M20 5v6h-6"/>',
  edit: '<path d="M4 20h4l11-11a2.1 2.1 0 0 0-3-3L5 17v3z"/><path d="m14.5 5.5 3 3"/>',
  eye: '<path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="2.8"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5z"/><path d="m3 13 9 5 9-5"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M8 3v4M16 3v4M3.5 10h17"/>',
  user: '<circle cx="12" cy="8" r="3.8"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/>',
  box: '<rect x="4" y="4" width="16" height="16" rx="2.5" stroke-dasharray="4 3"/><path d="M8 8h3M8 8v3M16 16h-3M16 16v-3"/>',
  save: '<path d="M5 3h11l3 3v15H5z"/><path d="M8 3v6h7V3M8 21v-7h8v7"/>',
  arrowRight: '<path d="M4 12h15M13.5 6.5 20 12l-6.5 5.5"/>',
  history: '<path d="M3.5 12a8.5 8.5 0 1 0 3-6.5"/><path d="M3.5 4.5V10H9"/><path d="M12 8v4.5l3 1.8"/>',
  sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
  undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h9a7 7 0 0 1 0 14h-2"/>',
};

export function icon(name: keyof typeof ICONS | string, cls = ''): RawHtml {
  const path = ICONS[name] ?? ICONS.info!;
  return raw(
    `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`,
  );
}

// ---------------- toasts ----------------

type ToastKind = 'ok' | 'err' | 'warn' | 'info';

export function toast(message: string, kind: ToastKind = 'info', timeout = 3600): void {
  const stack = document.getElementById('toasts');
  if (!stack) return;
  const node = document.createElement('div');
  node.className = `toast ${kind}`;
  const iconName = kind === 'ok' ? 'check' : kind === 'err' ? 'alert' : kind === 'warn' ? 'alert' : 'info';
  node.innerHTML = String(
    html`${icon(iconName, 'toast-icon')}<div>${message}</div>`,
  );
  stack.appendChild(node);
  setTimeout(() => {
    node.classList.add('out');
    setTimeout(() => node.remove(), 220);
  }, timeout);
  while (stack.children.length > 4) stack.firstElementChild?.remove();
}

// ---------------- modal ----------------

export interface ModalOptions {
  title: string;
  subtitle?: string;
  body: string | RawHtml;
  footer?: string | RawHtml;
  wide?: boolean;
  onMount?: (root: HTMLElement, close: () => void) => void;
}

export function openModal(opts: ModalOptions): () => void {
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.innerHTML = String(
    html`<div class="modal ${opts.wide ? 'wide' : ''}" role="dialog" aria-modal="true" aria-label="${opts.title}">
      <div class="modal-head">
        <div>
          <div class="modal-title">${opts.title}</div>
          ${opts.subtitle ? html`<div class="modal-sub">${opts.subtitle}</div>` : ''}
        </div>
        <button class="btn ghost icon" data-close aria-label="关闭">${icon('x')}</button>
      </div>
      <div class="modal-body">${opts.body instanceof RawHtml ? opts.body : raw(opts.body)}</div>
      ${opts.footer ? html`<div class="modal-foot">${opts.footer instanceof RawHtml ? opts.footer : raw(opts.footer)}</div>` : ''}
    </div>`,
  );
  document.body.appendChild(backdrop);
  const close = () => {
    backdrop.remove();
    document.removeEventListener('keydown', onKey);
    backdrop.removeEventListener('capsule:force-close', close as EventListener);
  };
  const onKey = (ev: KeyboardEvent) => {
    if (ev.key === 'Escape') close();
  };
  document.addEventListener('keydown', onKey);
  backdrop.addEventListener('mousedown', (ev) => {
    if (ev.target === backdrop) close();
  });
  backdrop.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', close));
  backdrop.addEventListener('capsule:force-close', close as EventListener);
  opts.onMount?.(backdrop, close);
  return close;
}

/** Closes every open dialog — used when navigation invalidates a dialog's context. */
export function closeAllModals(): void {
  document.querySelectorAll('.modal-backdrop').forEach((el) => {
    el.dispatchEvent(new Event('capsule:force-close'));
    el.remove();
  });
}

// ---------------- focus preserving re-render ----------------

function focusPath(el: Element, root: Element): string {
  const parts: string[] = [];
  let node: Element | null = el;
  while (node && node !== root) {
    const parent: Element | null = node.parentElement;
    if (!parent) break;
    parts.unshift(String(Array.prototype.indexOf.call(parent.children, node)));
    node = parent;
  }
  return parts.join('.');
}

function resolvePath(root: Element, path: string): HTMLElement | null {
  let node: Element | null = root;
  for (const part of path.split('.')) {
    if (!node) return null;
    node = node.children[Number(part)] ?? null;
  }
  return node as HTMLElement | null;
}

export function setHtml(root: HTMLElement, content: RawHtml | string): void {
  const active = document.activeElement as HTMLElement | null;
  let path: string | null = null;
  let selStart: number | null = null;
  let selEnd: number | null = null;
  if (active && active !== root && root.contains(active)) {
    path = focusPath(active, root);
    if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) {
      try {
        selStart = active.selectionStart;
        selEnd = active.selectionEnd;
      } catch {
        /* number inputs throw */
      }
    }
  }
  root.innerHTML = content instanceof RawHtml ? content.value : content;
  if (path) {
    const el = resolvePath(root, path);
    if (el && typeof el.focus === 'function') {
      el.focus({ preventScroll: true });
      if (selStart !== null && (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)) {
        try {
          el.setSelectionRange(selStart, selEnd ?? selStart);
        } catch {
          /* ignore */
        }
      }
    }
  }
}

export function bindActions(
  root: HTMLElement,
  actions: Record<string, (target: HTMLElement, ev: Event) => void>,
): void {
  root.addEventListener('click', (ev) => {
    const target = (ev.target as HTMLElement | null)?.closest<HTMLElement>('[data-act]');
    if (!target || !root.contains(target)) return;
    const act = target.dataset.act;
    if (!act) return;
    const handler = actions[act];
    if (handler) {
      ev.preventDefault();
      handler(target, ev);
    }
  });
}

export function debounce<A extends unknown[]>(fn: (...args: A) => void, wait: number): (...args: A) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: A) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}
