import React from 'react';
import type { CalcDistribution, CaseDoc, CaseStatus, ReleaseFlag, Role } from '../lib/types';

export const STATUS_CLASS: Record<CaseStatus, string> = {
  待测量: 'tag-todo',
  待审核: 'tag-wait',
  已通过: 'tag-pass',
  需复核: 'tag-review',
};

export function StatusChip({ status }: { status: CaseStatus }) {
  return <span className={`chip ${STATUS_CLASS[status]}`}>{status}</span>;
}

export function fmt(n: number | null | undefined, digits = 1, unit = '') {
  if (n === null || n === undefined || !Number.isFinite(n)) return '—';
  return `${n.toFixed(digits)}${unit}`;
}

export function fmtDate(ts?: number) {
  if (!ts) return '—';
  const d = new Date(ts);
  const p = (v: number) => String(v).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

export function fmtTime(ts: number) {
  const d = new Date(ts);
  const p = (v: number) => String(v).padStart(2, '0');
  return `${p(d.getHours())}:${p(d.getMinutes())}`;
}

export function relativeTime(ts: number) {
  const delta = Date.now() - ts;
  const mins = Math.round(delta / 60000);
  if (mins < 1) return '刚刚';
  if (mins < 60) return `${mins} 分钟前`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} 小时前`;
  return `${Math.round(hours / 24)} 天前`;
}

/** Bold the numbers inside a clinical line for scannability. */
export function Num({ children }: { children: React.ReactNode }) {
  return <span className="mono" style={{ color: 'var(--text)', fontWeight: 600 }}>{children}</span>;
}

export function RiskBanner({ flags }: { flags: ReleaseFlag[] }) {
  const warns = flags.filter((f) => f.severity === 'warn');
  if (!warns.length) {
    return (
      <div className="banner banner-ok">
        <span>✓</span>
        <div>型号与释放参数均在测量口径范围内,冠脉净距与贴合格隙达标。</div>
      </div>
    );
  }
  return (
    <div style={{ display: 'grid', gap: 7 }}>
      {warns.map((f) => (
        <div className="banner banner-warn" key={f.code}>
          <span style={{ fontSize: 14, lineHeight: 1 }}>▲</span>
          <div>
            <div style={{ fontWeight: 600, color: '#f6d79b' }}>
              {f.title}
              {f.value ? <span className="mono" style={{ marginLeft: 8, color: '#ffd88f' }}>{f.value}</span> : null}
            </div>
            <div style={{ marginTop: 2, opacity: 0.92 }}>{f.detail}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Stat({ label, value, unit, hint, tone }: { label: string; value: string; unit?: string; hint?: string; tone?: 'ok' | 'warn' }) {
  const color = tone === 'warn' ? 'var(--amber)' : tone === 'ok' ? 'var(--green)' : 'var(--text)';
  return (
    <div style={{ minWidth: 0 }}>
      <div style={{ fontSize: 10.5, color: 'var(--text-3)', fontWeight: 600, letterSpacing: '0.04em' }}>{label}</div>
      <div className="mono" style={{ fontSize: 17, fontWeight: 600, color, lineHeight: 1.25 }}>
        {value}
        {unit ? <span style={{ fontSize: 10.5, color: 'var(--text-3)', marginLeft: 2, fontWeight: 500 }}>{unit}</span> : null}
      </div>
      {hint ? <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{hint}</div> : null}
    </div>
  );
}

const SECTOR_COLORS = (burden: number, maxHU: number, threshold: number) => {
  if (maxHU > threshold + 500 || burden > 0.85) return '#ef4b33';
  if (maxHU > threshold + 260 || burden > 0.6) return '#f08b34';
  if (maxHU > threshold || burden > 0.32) return '#e9c24a';
  if (burden > 0.12) return '#7f9aba';
  return '#3a4a5e';
};

/** 360° polar chart of calcium burden with clock labels. */
export function CalcPolarChart({
  calc,
  size = 168,
  showHot = true,
  label = true,
}: {
  calc: CalcDistribution;
  size?: number;
  showHot?: boolean;
  label?: boolean;
}) {
  const r = size / 2 - (label ? 20 : 6);
  const cx = size / 2;
  const cy = size / 2;
  const n = calc.sectors.length;
  const maxVol = Math.max(1e-6, ...calc.sectors.map((s) => s.volumeMm3));
  const sectors = calc.sectors.map((s, i) => {
    const a0 = (i / n) * Math.PI * 2 - Math.PI / 2;
    const a1 = ((i + 1) / n) * Math.PI * 2 - Math.PI / 2;
    const rr = Math.max(7, (s.volumeMm3 / maxVol) * r);
    const x0 = cx + Math.cos(a0) * rr;
    const y0 = cy + Math.sin(a0) * rr;
    const x1 = cx + Math.cos(a1) * rr;
    const y1 = cy + Math.sin(a1) * rr;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const path = `M ${cx} ${cy} L ${x0} ${y0} A ${rr} ${rr} 0 ${large} 1 ${x1} ${y1} Z`;
    const hot = showHot && calc.hotSectors.includes(i);
    return { path, color: SECTOR_COLORS(s.burden, s.maxHU, calc.thresholdHU), hot, vol: s.volumeMm3, i };
  });
  const clockLabels = ['12', '3', '6', '9'];
  return (
    <svg width={size} height={size} style={{ overflow: 'visible' }}>
      <circle cx={cx} cy={cy} r={r} fill="rgba(9,14,21,0.7)" stroke="var(--line-2)" strokeWidth={1} />
      {[0.33, 0.66].map((f) => (
        <circle key={f} cx={cx} cy={cy} r={r * f} fill="none" stroke="rgba(46,61,79,0.6)" strokeDasharray="2 3" />
      ))}
      {sectors.map((s) => (
        <path key={s.i} d={s.path} fill={s.color} stroke="rgba(6,10,16,0.55)" strokeWidth={0.6} opacity={0.94} />
      ))}
      {sectors
        .filter((s) => s.hot && s.vol > 0.6)
        .map((s) => (
          <circle key={`h${s.i}`} cx={cx} cy={cy} r={2.6} fill="#ffd47a" opacity={0.9} />
        ))}
      <circle cx={cx} cy={cy} r={2.2} fill="#93a4b8" />
      {label
        ? clockLabels.map((lb, i) => {
            const ang = (i / 4) * Math.PI * 2 - Math.PI / 2;
            const lx = cx + Math.cos(ang) * (r + 10);
            const ly = cy + Math.sin(ang) * (r + 10);
            return (
              <text key={lb} x={lx} y={ly} fill="var(--text-3)" fontSize={9} textAnchor="middle" dominantBaseline="middle">
                {lb}
              </text>
            );
          })
        : null}
    </svg>
  );
}

/** Horizontal linear profile of calcium for compact tables. */
export function CalcBar({ calc }: { calc: CalcDistribution }) {
  const n = calc.sectors.length;
  return (
    <div style={{ display: 'flex', gap: 1, height: 16, alignItems: 'stretch' }}>
      {calc.sectors.map((s, i) => {
        const h = Math.max(0.12, s.volumeMm3 / Math.max(1e-6, ...calc.sectors.map((x) => x.volumeMm3)));
        return (
          <div
            key={i}
            title={`${i * (360 / n)}°–${(i + 1) * (360 / n)}°: ${s.volumeMm3.toFixed(0)} mm³ · 峰值 ${s.maxHU} HU`}
            style={{
              flex: 1,
              background: SECTOR_COLORS(s.burden, s.maxHU, calc.thresholdHU),
              opacity: 0.35 + h * 0.65,
              borderRadius: 1,
            }}
          />
        );
      })}
    </div>
  );
}

export function SparkLine({ values, width = 90, height = 24, color = 'var(--accent)' }: { values: number[]; width?: number; height?: number; color?: string }) {
  if (!values.length) return null;
  const max = Math.max(...values, 0.001);
  const min = Math.min(...values, 0);
  const span = max - min || 1;
  const step = width / Math.max(1, values.length - 1);
  const pts = values.map((v, i) => `${(i * step).toFixed(2)},${(height - ((v - min) / span) * height).toFixed(2)}`);
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
    </svg>
  );
}

export const ROLE_LABEL: Record<Role, string> = {
  physician: '介入医师',
  technologist: '技师',
  director: '主任',
};

export function OperatorName(c: CaseDoc, people: { id: string; name: string }[]) {
  return people.find((p) => p.id === c.operatorId)?.name ?? c.requester ?? '—';
}
