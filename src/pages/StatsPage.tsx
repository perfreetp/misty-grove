import { useMemo, useState } from 'react';
import type { CaseDoc, OperatorStats } from '../lib/types';
import { useStore } from '../state/store';
import { fmt, CalcPolarChart } from '../components/ui';


export function StatsPage() {
  const { state } = useStore();
  const [range, setRange] = useState<'all' | '90d'>('all');

  const stats = useMemo<OperatorStats[]>(() => {
    const cutoff = range === '90d' ? Date.now() - 90 * 86400000 : 0;
    const people = state.people.filter((p) => p.role === 'physician');
    return people.map((p) => {
      const all = state.cases.filter((c) => c.operatorId === p.id && c.submissionCount > 0);
      const cs = all.filter((c) => c.submittedAt ? c.submittedAt >= cutoff : c.updatedAt >= cutoff);
      const approved = cs.filter((c) => c.status === '已通过');
      const reviewed = cs.filter((c) => c.status === '已通过' || c.status === '需复核');
      const returned = cs.reduce((a, c) => a + c.returnCount, 0);
      // 一次通过：已审核的提交中没有被退回过的比例
      const firstPass = reviewed.filter((c) => c.returnCount === 0 && c.status === '已通过').length;
      // 一次选准：审核通过时确认的最终型号与医师选择一致
      const accurate = approved.filter((c) => {
        if (!c.sizing) return false;
        const finalMm = c.review?.finalNominalMm ?? c.sizing.nominalMm;
        return Math.abs(finalMm - c.sizing.nominalMm) < 0.5;
      }).length;
      const oversizes = cs.map((c) => c.sizing?.oversizePct).filter((x): x is number => typeof x === 'number');
      return {
        operatorId: p.id,
        name: p.name,
        total: state.cases.filter((c) => c.operatorId === p.id).length,
        measured: state.cases.filter((c) => c.operatorId === p.id && (c.status !== '待测量')).length,
        submitted: cs.length,
        approved: approved.length,
        returned,
        firstPass,
        firstPassRate: reviewed.length ? (firstPass / reviewed.length) * 100 : 0,
        accurateSize: accurate,
        accurateSizeRate: approved.length ? (accurate / approved.length) * 100 : 0,
        avgReturns: cs.length ? returned / cs.length : 0,
        avgOversize: oversizes.length ? oversizes.reduce((a, b) => a + b, 0) / oversizes.length : 0,
        pending: state.cases.filter((c) => c.operatorId === p.id && c.status === '待审核').length,
      };
    });
  }, [state.cases, state.people, range]);

  const maxSub = Math.max(1, ...stats.map((s) => s.submitted));
  const team = useMemo(() => {
    const sub = stats.reduce((a, s) => a + s.submitted, 0);
    const app = stats.reduce((a, s) => a + s.approved, 0);
    const ret = stats.reduce((a, s) => a + s.returned, 0);
    const fp = stats.reduce((a, s) => a + s.firstPass, 0);
    const reviewedTotal = stats.reduce((a, s) => a + (s.approved + Math.max(0, s.submitted - s.approved - s.pending)), 0);
    const acc = stats.reduce((a, s) => a + s.accurateSize, 0);
    return {
      submitted: sub,
      approved: app,
      returned: ret,
      firstPassRate: reviewedTotal ? (fp / reviewedTotal) * 100 : 0,
      accurateRate: app ? (acc / app) * 100 : 0,
      avgReturns: sub ? ret / sub : 0,
    };
  }, [stats]);

  const calcs = state.cases.map((c) => c.summary?.calc).filter((x) => x);
  const bubble = useMemo(() => {
    return stats.map((s) => ({ s, x: s.firstPassRate, y: s.accurateSizeRate, r: 6 + (s.submitted / maxSub) * 12 }));
  }, [stats, maxSub]);

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h2 style={{ fontSize: 17 }}>术者质量统计</h2>
          <div style={{ fontSize: 12, color: 'var(--text-3)' }}>型号一次选准率 = 审核通过且最终型号与本单选定一致 / 已通过单数</div>
        </div>
        <div className="seg-row" style={{ margin: 0 }}>
          <button className={`seg ${range === 'all' ? 'on' : ''}`} onClick={() => setRange('all')}>全部</button>
          <button className={`seg ${range === '90d' ? 'on' : ''}`} onClick={() => setRange('90d')}>近 90 天</button>
        </div>
      </div>

      <div className="stat-cards">
        <BigCard label="已提交审核" value={String(team.submitted)} hint="含待审与已审" />
        <BigCard label="团队一次通过率" value={fmt(team.firstPassRate, 0, '%')} hint="已审核提交中未被退回的比例" tone={team.firstPassRate > 70 ? 'ok' : 'warn'} />
        <BigCard label="型号一次选准率" value={fmt(team.accurateRate, 0, '%')} hint="通过且型号未修正" tone={team.accurateRate > 70 ? 'ok' : 'warn'} />
        <BigCard label="平均退回次数" value={fmt(team.avgReturns, 2)} hint="每次提交" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 12, alignItems: 'start' }}>
        <div className="card" style={{ padding: 14 }}>
          <div className="section-title">按术者明细</div>
          <div className="stats-table">
            <div className="stats-row head">
              <span>术者</span>
              <span>申请</span>
              <span>提交</span>
              <span>通过</span>
              <span>退回</span>
              <span>一次通过</span>
              <span>选准率</span>
              <span>平均过度扩张</span>
            </div>
            {stats.map((s) => (
              <div className="stats-row" key={s.operatorId}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="avatar">{s.name.slice(0, 1)}</span>
                  {s.name}
                </span>
                <span className="mono">{s.total}</span>
                <span className="mono">{s.submitted}</span>
                <span className="mono" style={{ color: 'var(--green)' }}>{s.approved}</span>
                <span className="mono" style={{ color: s.returned ? 'var(--amber)' : 'var(--text-3)' }}>{s.returned}</span>
                <span className="mono">{s.firstPassRate.toFixed(0)}%</span>
                <span className="mono" style={{ color: s.accurateSizeRate >= 70 ? 'var(--green)' : 'var(--amber)' }}>
                  {s.approved ? `${s.accurateSizeRate.toFixed(0)}%` : '—'}
                  <span style={{ color: 'var(--text-3)', fontSize: 9.5, marginLeft: 3 }}>{s.approved ? `(${s.accurateSize}/${s.approved})` : ''}</span>
                </span>
                <span className="mono">{s.avgOversize > 0 ? `+${s.avgOversize.toFixed(1)}%` : s.avgOversize ? `${s.avgOversize.toFixed(1)}%` : '—'}</span>
              </div>
            ))}
          </div>
          <div className="divider" />
          <div className="section-title">提交量</div>
          <div style={{ display: 'grid', gap: 6 }}>
            {stats.map((s) => (
              <div key={s.operatorId} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5 }}>
                <span style={{ width: 52, color: 'var(--text-2)' }}>{s.name}</span>
                <div style={{ flex: 1, height: 9, background: 'var(--bg-2)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${(s.submitted / maxSub) * 100}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-2), var(--accent))' }} />
                </div>
                <span className="mono" style={{ width: 24, textAlign: 'right', color: 'var(--text-3)' }}>{s.submitted}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 14 }}>
          <div className="section-title">一次通过率 × 选准率</div>
          <BubbleChart points={bubble} />
          <div className="divider" />
          <div className="section-title">全组钙化负担分布</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {calcs.slice(0, 6).map((c, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <CalcPolarChart calc={c!} size={92} label={false} />
                <div style={{ fontSize: 9, color: 'var(--text-3)' }}>{c!.burdenScore}/100</div>
              </div>
            ))}
            {calcs.length === 0 ? <div style={{ fontSize: 11.5, color: 'var(--text-3)' }}>暂无钙化测量数据</div> : null}
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 14, marginTop: 12 }}>
        <div className="section-title">退回原因分布</div>
        <ReasonDistribution cases={state.cases} />
      </div>
    </div>
  );
}

function BigCard({ label, value, hint, tone }: { label: string; value: string; hint: string; tone?: 'ok' | 'warn' }) {
  return (
    <div className="card" style={{ padding: '10px 13px' }}>
      <div className="label">{label}</div>
      <div className="mono" style={{ fontSize: 24, fontWeight: 600, lineHeight: 1.3, color: tone === 'warn' ? 'var(--amber)' : tone === 'ok' ? 'var(--text)' : 'var(--text)' }}>{value}</div>
      <div style={{ fontSize: 10.5, color: 'var(--text-3)' }}>{hint}</div>
    </div>
  );
}

function BubbleChart({ points }: { points: { s: OperatorStats; x: number; y: number; r: number }[] }) {
  const w = 300;
  const h = 220;
  const pad = 30;
  return (
    <svg width={w} height={h} style={{ display: 'block', margin: '0 auto' }}>
      {[0, 25, 50, 75, 100].map((v) => (
        <g key={v}>
          <line x1={pad} x2={w - pad} y1={h - pad - (v / 100) * (h - pad * 2)} y2={h - pad - (v / 100) * (h - pad * 2)} stroke="var(--line)" strokeDasharray="2 4" />
          <text x={w - pad + 2} y={h - pad - (v / 100) * (h - pad * 2) + 3} fontSize={8} fill="var(--text-3)">{v}%</text>
        </g>
      ))}
      <line x1={pad} x2={pad} y1={pad} y2={h - pad} stroke="var(--line-2)" />
      <line x1={pad} x2={w - pad} y1={h - pad} y2={h - pad} stroke="var(--line-2)" />
      {[0, 50, 100].map((v) => (
        <text key={v} x={pad + (v / 100) * (w - pad * 2)} y={h - pad + 11} fontSize={8} fill="var(--text-3)" textAnchor="middle">{v}%</text>
      ))}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={pad + (p.x / 100) * (w - pad * 2)} cy={h - pad - (p.y / 100) * (h - pad * 2)} r={p.r} fill="rgba(78,164,216,0.24)" stroke="#4ea4d8" />
          <text cx={pad + (p.x / 100) * (w - pad * 2)} x={pad + (p.x / 100) * (w - pad * 2)} y={h - pad - (p.y / 100) * (h - pad * 2) + p.r + 10} fontSize={8.5} fill="var(--text-2)" textAnchor="middle">
            {p.s.name}
          </text>
        </g>
      ))}
      <text x={w / 2} y={12} fontSize={8.5} fill="var(--text-3)" textAnchor="middle">↑ 选准率 · → 一次通过率</text>
    </svg>
  );
}

function ReasonDistribution({ cases }: { cases: CaseDoc[] }) {
  const counts: Record<string, number> = {};
  for (const c of cases) {
    if (c.review?.decision === '退回') for (const r of c.review.reasonCodes) counts[r] = (counts[r] ?? 0) + 1;
  }
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  if (!entries.length) return <div style={{ fontSize: 11.5, color: 'var(--text-3)' }}>暂无退回记录</div>;
  return (
    <div style={{ display: 'grid', gap: 6 }}>
      {entries.map(([k, v]) => (
        <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5 }}>
          <span style={{ width: 110, color: 'var(--text-2)' }}>{k}</span>
          <div style={{ flex: 1, height: 9, background: 'var(--bg-2)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: `${(v / total) * 100}%`, height: '100%', background: 'var(--amber)' }} />
          </div>
          <span className="mono" style={{ width: 30, textAlign: 'right', color: 'var(--text-3)' }}>{v}</span>
        </div>
      ))}
    </div>
  );
}
