import { DEFECT_META, DEFECT_ORDER } from '../lib/defects';
import type { DefectType } from '../types';

export function StackedBar({
  data,
  total,
  height = 10,
  showEmpty,
}: {
  data: Record<DefectType, number>;
  total?: number;
  height?: number;
  showEmpty?: boolean;
}) {
  const sum = total ?? DEFECT_ORDER.reduce((a, t) => a + data[t], 0);
  if (sum <= 0 && !showEmpty) return <div className="bar" style={{ height }} />;
  return (
    <div
      style={{
        display: 'flex',
        height,
        borderRadius: 4,
        overflow: 'hidden',
        background: 'rgba(255,255,255,.07)',
        gap: 1,
      }}
    >
      {DEFECT_ORDER.map((t) => {
        const v = data[t];
        if (!v) return null;
        return (
          <div
            key={t}
            title={`${DEFECT_META[t].label} ${v}`}
            style={{ width: `${(v / Math.max(sum, 1)) * 100}%`, background: DEFECT_META[t].color }}
          />
        );
      })}
    </div>
  );
}

export function DefectLegend() {
  return (
    <div className="legend">
      {DEFECT_ORDER.map((t) => (
        <b key={t}>
          <i style={{ background: DEFECT_META[t].color }} />
          {DEFECT_META[t].label}
        </b>
      ))}
    </div>
  );
}

interface BarDatum {
  label: string;
  value: number;
  sub?: string;
  color?: string;
  alert?: boolean;
}

export function HBarChart({
  data,
  max,
  format = (v) => v.toFixed(1),
  height = 22,
}: {
  data: BarDatum[];
  max?: number;
  format?: (v: number) => string;
  height?: number;
}) {
  const top = max ?? Math.max(0.0001, ...data.map((d) => d.value));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
      {data.map((d) => (
        <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            className="mono small"
            style={{ width: 104, color: 'var(--txt-2)', flex: 'none', whiteSpace: 'nowrap' }}
            title={d.label}
          >
            {d.label}
          </div>
          <div
            style={{
              flex: 1,
              height,
              background: 'rgba(255,255,255,.045)',
              borderRadius: 4,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${Math.min(100, (d.value / top) * 100)}%`,
                height: '100%',
                background: d.color ?? (d.alert ? 'var(--amber)' : 'var(--green)'),
                opacity: 0.9,
                borderRadius: 4,
                transition: 'width .3s',
              }}
            />
          </div>
          <div
            className="mono"
            style={{
              width: 62,
              textAlign: 'right',
              flex: 'none',
              fontSize: 11.5,
              color: d.alert ? 'var(--amber)' : 'var(--txt)',
            }}
          >
            {format(d.value)}
          </div>
          <div className="small dim nowrap" style={{ width: 66, flex: 'none' }}>
            {d.sub}
          </div>
        </div>
      ))}
    </div>
  );
}

function polar(cx: number, cy: number, r: number, a: number) {
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function ringArc(cx: number, cy: number, r: number, from: number, to: number) {
  const p1 = polar(cx, cy, r, from);
  const p2 = polar(cx, cy, r, to);
  const large = to - from > Math.PI ? 1 : 0;
  return `M ${p1.x} ${p1.y} A ${r} ${r} 0 ${large} 1 ${p2.x} ${p2.y}`;
}

export function Donut({
  data,
  size = 130,
  thickness = 22,
  centerTop,
  centerBottom,
}: {
  data: { type: DefectType; value: number }[];
  size?: number;
  thickness?: number;
  centerTop?: string;
  centerBottom?: string;
}) {
  const r = size / 2 - thickness / 2 - 2;
  const total = data.reduce((a, d) => a + d.value, 0) || 1;
  const cx = size / 2;
  const cy = size / 2;
  let angle = -Math.PI / 2;
  const gap = 0.014;
  const segs = data
    .filter((d) => d.value > 0)
    .map((d) => {
      const sweep = (d.value / total) * Math.PI * 2;
      const s = { from: angle + gap, to: angle + sweep - gap, d };
      angle += sweep;
      return s;
    });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,.055)" strokeWidth={thickness} />
      {segs.map((s) => (
        <path
          key={s.d.type}
          d={ringArc(cx, cy, r, s.from, Math.max(s.from + 0.01, s.to))}
          fill="none"
          stroke={DEFECT_META[s.d.type].color}
          strokeWidth={thickness}
          strokeLinecap="butt"
        >
          <title>{`${DEFECT_META[s.d.type].label} ${s.d.value}`}</title>
        </path>
      ))}
      {centerTop && (
        <text
          x={cx}
          y={cy + 2}
          textAnchor="middle"
          fill="var(--txt)"
          fontSize={size * 0.2}
          fontFamily="ui-monospace, monospace"
          fontWeight={600}
        >
          {centerTop}
        </text>
      )}
      {centerBottom && (
        <text x={cx} y={cy + size * 0.14} textAnchor="middle" fill="var(--muted)" fontSize={size * 0.088}>
          {centerBottom}
        </text>
      )}
    </svg>
  );
}

export function Sparkline({
  values,
  width = 120,
  height = 30,
  color = 'var(--green)',
}: {
  values: number[];
  width?: number;
  height?: number;
  color?: string;
}) {
  if (values.length < 2) return null;
  const max = Math.max(...values, 0.0001);
  const min = Math.min(...values, 0);
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * width;
    const y = height - ((v - min) / (max - min || 1)) * (height - 4) - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth={1.6} strokeLinejoin="round" />
    </svg>
  );
}
