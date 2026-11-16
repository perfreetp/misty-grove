import type { ReactNode } from 'react';
import { DEFECT_META, STATUS_META } from '../lib/defects';
import type { BatchStatus, DefectType } from '../types';

export function StatusChip({ status }: { status: BatchStatus }) {
  const m = STATUS_META[status];
  return (
    <span className="chip" style={{ color: m.color, background: m.bg, borderColor: `${m.color}44` }}>
      <span className="chip-dot" />
      {m.label}
    </span>
  );
}

export function DefectChip({
  type,
  count,
  onClick,
  active,
}: {
  type: DefectType;
  count?: number;
  onClick?: () => void;
  active?: boolean;
}) {
  const m = DEFECT_META[type];
  return (
    <button
      className="chip"
      onClick={onClick}
      style={{
        color: m.color,
        background: active ? `${m.color}26` : `${m.color}14`,
        borderColor: active ? m.color : `${m.color}33`,
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <span className="chip-dot" />
      {m.label}
      {count !== undefined && <span className="mono" style={{ opacity: 0.85 }}>{count}</span>}
    </button>
  );
}

export function Meter({
  value,
  max = 1,
  color = 'var(--green)',
  height = 4,
}: {
  value: number;
  max?: number;
  color?: string;
  height?: number;
}) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div className="bar" style={{ height }}>
      <i style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

export function Kpi({
  label,
  value,
  sub,
  accent = 'var(--green)',
  icon,
  onClick,
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  accent?: string;
  icon?: ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      className="kpi"
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : undefined}
    >
      <div className="kpi-accent" style={{ background: accent }} />
      <div className="kpi-label">
        {icon && <span style={{ color: accent, display: 'inline-flex' }}>{icon}</span>}
        {label}
      </div>
      <div className="kpi-value">{value}</div>
      {sub && <div className="kpi-sub">{sub}</div>}
    </div>
  );
}

export function Segmented<T extends string>({
  value,
  options,
  onChange,
  size = 'md',
}: {
  value: T;
  options: { value: T; label: ReactNode; title?: string }[];
  onChange: (v: T) => void;
  size?: 'sm' | 'md';
}) {
  return (
    <div className="seg">
      {options.map((o) => (
        <button
          key={o.value}
          title={o.title}
          className={value === o.value ? 'on' : ''}
          style={size === 'sm' ? { padding: '3px 7px', fontSize: 11 } : undefined}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <div className="empty">{children}</div>;
}

export function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="field">
      <label>
        {label} {required && <span className="req">*</span>}
      </label>
      {children}
      {hint && <div className="small dim" style={{ marginTop: 5 }}>{hint}</div>}
    </div>
  );
}
