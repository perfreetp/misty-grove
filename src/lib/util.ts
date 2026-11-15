// 确定性伪随机与数值工具，保证同一 visit 的体数据可程序化重建

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 可复现的平滑类噪声：若干正弦叠加 + 种子扰动 */
export function smoothNoise(rand: () => number, n: number, harmonics = 4): number[] {
  const phases = Array.from({ length: harmonics }, () => rand() * Math.PI * 2);
  const freqs = Array.from({ length: harmonics }, (_, i) => i + 1);
  const amps = freqs.map((f) => 1 / f);
  const norm = amps.reduce((s, v) => s + v, 0);
  const out: number[] = new Array(n);
  for (let i = 0; i < n; i++) {
    const x = (i / (n - 1)) * Math.PI * 2;
    let v = 0;
    for (let h = 0; h < harmonics; h++) v += amps[h] * Math.sin(freqs[h] * x + phases[h]);
    out[i] = v / norm; // -1..1
  }
  return out;
}

export function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

export function mean(xs: (number | null)[]): number {
  const vs = xs.filter((v): v is number => v != null);
  return vs.length ? vs.reduce((s, v) => s + v, 0) / vs.length : 0;
}

export function median(xs: number[]): number {
  if (!xs.length) return 0;
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

/** 滑动平均平滑，null（断裂）向两侧传播保留 */
export function smoothCurve(curve: (number | null)[], window: number): (number | null)[] {
  const half = Math.max(0, Math.floor(window / 2));
  return curve.map((v, i) => {
    if (v == null) return null;
    const vals: number[] = [];
    for (let j = i - half; j <= i + half; j++) {
      if (j >= 0 && j < curve.length && curve[j] != null) vals.push(curve[j] as number);
    }
    return vals.reduce((s, x) => s + x, 0) / vals.length;
  });
}

export function uid(prefix = 'id'): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function nowIso(): string {
  return new Date().toISOString();
}

export function fmtDate(iso: string): string {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

export function fmtDay(iso: string): string {
  return fmtDate(iso).slice(0, 10);
}
