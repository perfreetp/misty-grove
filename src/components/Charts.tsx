// 厚度趋势曲线（SVG）与双眼对称对比图
import { meanThicknessUm, quadStats } from '../lib/oct';
import { getDevice, getVisit, visitChain } from '../store';
import { fmtDay } from '../lib/util';
import type { Eye, Patient } from '../types';

/** 同一患者单眼或双眼的平均厚度随访趋势 */
export function ThicknessTrend(props: { patient: Patient; eye?: Eye }) {
  const chains = () => {
    const eyes: Eye[] = props.eye ? [props.eye] : ['OD', 'OS'];
    return eyes.map((eye) => ({
      eye,
      points: visitChain(props.patient.id, eye)
        .filter((v) => v.layers)
        .map((v) => ({
          date: fmtDay(v.acquiredAt),
          value: meanThicknessUm(v, getDevice(v.deviceId).scaleZum),
          stage: v.stage,
        })),
    }));
  };

  const W = 560;
  const H = 220;
  const pad = { l: 46, r: 14, t: 18, b: 34 };

  const all = () => chains().flatMap((c) => c.points.map((p) => p.value));
  const ticks = () => {
    const vals = all();
    if (!vals.length) return null;
    const lo = Math.min(...vals) - 4;
    const hi = Math.max(...vals) + 4;
    const allDates = Array.from(new Set(chains().flatMap((c) => c.points.map((p) => p.date)))).sort();
    const x = (i: number) => pad.l + (allDates.length <= 1 ? (W - pad.l - pad.r) / 2 : (i / (allDates.length - 1)) * (W - pad.l - pad.r));
    const y = (v: number) => pad.t + (1 - (v - lo) / (hi - lo)) * (H - pad.t - pad.b);
    return { lo, hi, allDates, x, y };
  };

  const eyeColor: Record<Eye, string> = { OD: '#39d0ff', OS: '#ffb44d' };

  return (
    <div class="chart-card">
      <h4>厚度趋势表（神经节细胞复合体平均厚度 µm）</h4>
      <svg viewBox={`0 0 ${W} ${H}`} class="trend-svg">
        {(() => {
          const t = ticks();
          if (!t) return <text x={W / 2} y={H / 2} fill="#8aa">暂无分层数据</text>;
          const gridVals = Array.from({ length: 5 }, (_, i) => t.lo + ((t.hi - t.lo) * i) / 4);
          return (
            <>
              {gridVals.map((gv) => (
                <g>
                  <line x1={pad.l} x2={W - pad.r} y1={t.y(gv)} y2={t.y(gv)} stroke="#2a3548" />
                  <text x={pad.l - 6} y={t.y(gv) + 3} fill="#7d8da6" font-size="10" text-anchor="end">
                    {gv.toFixed(0)}
                  </text>
                </g>
              ))}
              {t.allDates.map((d, i) => (
                <text x={t.x(i)} y={H - 12} fill="#9fb0c8" font-size="10" text-anchor="middle">
                  {d.slice(5)}
                </text>
              ))}
              {chains().map((c) => {
                if (c.points.length === 0) return null;
                const pts = c.points.map((p) => ({ x: t.x(t.allDates.indexOf(p.date)), y: t.y(p.value) }));
                const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x},${p.y}`).join(' ');
                return (
                  <g>
                    <path d={d} fill="none" stroke={eyeColor[c.eye]} stroke-width="2.2" />
                    {pts.map((p, i) => (
                      <circle cx={p.x} cy={p.y} r="3.5" fill={eyeColor[c.eye]}>
                        <title>{`${c.eye} ${c.points[i].date}：${c.points[i].value.toFixed(1)}µm`}</title>
                      </circle>
                    ))}
                  </g>
                );
              })}
            </>
          );
        })()}
      </svg>
      <div class="eye-legend">
        <span><i style={{ background: eyeColor.OD }} />右眼 OD</span>
        <span><i style={{ background: eyeColor.OS }} />左眼 OS</span>
      </div>
    </div>
  );
}

/** 双眼对称图：同次访视左右眼四象限厚度并列对比，差异 >5µm 标红 */
export function BilateralSymmetry(props: { odVisitId?: string; osVisitId?: string }) {
  const rows = () => {
    const quads: { quad: string; label: string }[] = [
      { quad: 'ST', label: '颞上' },
      { quad: 'SN', label: '鼻上' },
      { quad: 'IT', label: '颞下' },
      { quad: 'IN', label: '鼻下' },
    ];
    const od = props.odVisitId ? getQuadMap(props.odVisitId) : null;
    const os = props.osVisitId ? getQuadMap(props.osVisitId) : null;
    return quads.map((q) => {
      const a = od?.get(q.quad) ?? null;
      const b = os?.get(q.quad) ?? null;
      const diff = a != null && b != null ? a - b : null;
      return { ...q, od: a, os: b, diff, asym: diff != null && Math.abs(diff) > 5 };
    });
  };

  return (
    <div class="chart-card">
      <h4>双眼对称图（同次访视四象限厚度差）</h4>
      <table class="sym-table">
        <thead>
          <tr>
            <th>象限</th>
            <th>右眼 OD (µm)</th>
            <th>左眼 OS (µm)</th>
            <th>差值 OD−OS (µm)</th>
          </tr>
        </thead>
        <tbody>
          {rows().map((r) => (
            <tr classList={{ flagged: r.asym }}>
              <td>{r.label}</td>
              <td>{r.od != null ? r.od.toFixed(1) : '—'}</td>
              <td>{r.os != null ? r.os.toFixed(1) : '—'}</td>
              <td>
                {r.diff == null ? (
                  '—'
                ) : (
                  <span classList={{ red: r.asym }}>
                    {r.diff > 0 ? '+' : ''}
                    {r.diff.toFixed(1)}
                    {r.asym ? ' ⚠不对称' : ''}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getQuadMap(visitId: string): Map<string, number> {
  const v = getVisit(visitId);
  const dev = getDevice(v.deviceId);
  return new Map(quadStats(v, dev.scaleZum).map((q) => [q.quad, q.meanUm]));
}
