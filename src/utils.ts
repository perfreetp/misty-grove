export function uid(prefix = 'id'): string {
  const rnd = crypto.getRandomValues(new Uint32Array(2));
  return `${prefix}-${rnd[0]!.toString(36)}${rnd[1]!.toString(36)}`;
}

export function clamp(n: number, min: number, max: number): number {
  return n < min ? min : n > max ? max : n;
}

function pad(n: number, width = 2): string {
  return String(n).padStart(width, '0');
}

export function formatClock(seconds: number): string {
  const s = Math.max(0, Math.round(seconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)} 秒`;
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  if (m < 60) return s ? `${m} 分 ${s} 秒` : `${m} 分`;
  const h = Math.floor(m / 60);
  return `${h} 小时 ${m % 60} 分`;
}

const dateFmt = new Intl.DateTimeFormat('zh-CN', {
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

const fullDateFmt = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

export function formatWhen(ts: number | null | undefined): string {
  if (!ts) return '—';
  return dateFmt.format(new Date(ts));
}

export function formatWhenFull(ts: number | null | undefined): string {
  if (!ts) return '—';
  return fullDateFmt.format(new Date(ts));
}

export function formatRelative(ts: number, now = Date.now()): string {
  const diff = Math.max(0, now - ts);
  const min = Math.floor(diff / 60000);
  if (min < 1) return '刚刚';
  if (min < 60) return `${min} 分钟前`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h} 小时前`;
  return `${Math.floor(h / 24)} 天前`;
}

export function frameToSeconds(frameIndex: number, fps: number): number {
  return frameIndex / fps;
}

export function formatFrameStamp(frameIndex: number, fps: number): string {
  return `${formatClock(frameToSeconds(frameIndex, fps))} · F${frameIndex + 1}`;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function escapeAttr(value: string): string {
  return escapeHtml(value);
}

export function percent(part: number, total: number): number {
  return total <= 0 ? 0 : Math.round((part / total) * 1000) / 10;
}

export function formatSize(sizeMm: number | null): string {
  if (sizeMm === null || Number.isNaN(sizeMm)) return '待测量';
  return `${sizeMm.toFixed(1)} mm`;
}

export function initials(name: string): string {
  return name.trim().slice(0, 1) || '?';
}

export function summarize(text: string, max = 62): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean.length > max ? `${clean.slice(0, max)}…` : clean;
}

export function debounce<A extends unknown[]>(fn: (...args: A) => void, wait: number): (...args: A) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: A) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn(...args);
    }, wait);
  };
}

export function downloadText(filename: string, text: string): void {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function naturalCompare(a: string, b: string): number {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}
