// 主任医师视图：待审队列逐例审核、退回、统计与导出
import { createMemo, createSignal, For, Show } from 'solid-js';
import { approveVisit, getDevice, returnVisit, stageQueue, state } from '../store';
import { EYE_LABEL, STAGE_LABEL, VERDICT_LABEL, type Visit } from '../types';
import { compareQuads, meanThicknessUm, quadStats } from '../lib/oct';
import { fmtDay } from '../lib/util';
import { exportProgressReport, exportThicknessTrend } from '../lib/exporter';

export default function ChiefView(props: { onOpenVisit: (id: string) => void }) {
  const [tab, setTab] = createSignal<'review' | 'stats'>('review');
  return (
    <div class="view">
      <div class="subtabs">
        <button classList={{ active: tab() === 'review' }} onClick={() => setTab('review')}>待审队列</button>
        <button classList={{ active: tab() === 'stats' }} onClick={() => setTab('stats')}>统计与导出</button>
      </div>
      {tab() === 'review' ? <ReviewQueue onOpenVisit={props.onOpenVisit} /> : <StatsPanel />}
    </div>
  );
}

function patientName(id: string) {
  return state.patients.find((p) => p.id === id)?.name ?? id;
}

function prevOf(v: Visit): Visit | null {
  const chain = Object.values(state.visits)
    .filter((x) => x.patientId === v.patientId && x.eye === v.eye && x.acquiredAt < v.acquiredAt && x.layers)
    .sort((a, b) => b.acquiredAt.localeCompare(a.acquiredAt));
  return chain[0] ?? null;
}

function ReviewQueue(props: { onOpenVisit: (id: string) => void }) {
  const queue = createMemo(() => stageQueue('interpreted'));
  const [reason, setReason] = createSignal<Record<string, string>>({});

  return (
    <div class="panel">
      <h3>待主任医师审核（{queue().length} 例）</h3>
      <Show when={queue().length} fallback={<p class="muted">所有判读均已处理。</p>}>
        <div class="review-list">
          <For each={queue()}>{(v) => {
            const dev = getDevice(v.deviceId);
            const prev = prevOf(v);
            const cmp = compareQuads(v, prev, dev.scaleZum);
            const flagged = cmp.filter((c) => c.flagged);
            return (
              <div class="review-card">
                <div class="review-head">
                  <b>{patientName(v.patientId)}</b> · {EYE_LABEL[v.eye]} · {fmtDay(v.acquiredAt)}
                  <span class={`verdict ${v.interpretation!.verdict}`}>{VERDICT_LABEL[v.interpretation!.verdict]}</span>
                  <span class="muted">平均厚度 {meanThicknessUm(v, dev.scaleZum).toFixed(1)}µm</span>
                </div>
                <div class="review-body">
                  <MiniCurve visit={v} />
                  <div class="review-quads">
                    <For each={cmp}>{(c) => (
                      <div class="mini-quad" classList={{ flagged: c.flagged }}>
                        <b>{c.label}</b>
                        <span>{c.current.toFixed(1)}µm</span>
                        <span classList={{ red: c.flagged }}>
                          {c.deltaUm == null ? '首次' : `${c.deltaUm > 0 ? '+' : ''}${c.deltaUm.toFixed(1)}µm`}
                        </span>
                        <Show when={c.flagged}><span class="red">{c.reason}</span></Show>
                      </div>
                    )}</For>
                  </div>
                  <div class="review-rationale">
                    <h4>医师判读依据</h4>
                    <p>{v.interpretation!.rationale}</p>
                    <h4>标红象限（变薄&gt;5µm 或断裂）</h4>
                    <Show when={flagged.length} fallback={<p class="muted">无标红象限。</p>}>
                      <For each={flagged}>{(c) => <p class="warning-text">⚠ {c.label}：{c.reason}</p>}</For>
                    </Show>
                  </div>
                </div>
                <div class="review-actions">
                  <button class="btn" onClick={() => props.onOpenVisit(v.id)}>打开完整视图</button>
                  <button class="btn" onClick={() => approveVisit(v.id)}>审核通过</button>
                  <input placeholder="退回原因（必填）" value={reason()[v.id] ?? ''}
                    onInput={(e) => setReason((r) => ({ ...r, [v.id]: e.currentTarget.value }))} />
                  <button class="btn danger" disabled={!(reason()[v.id] ?? '').trim()}
                    onClick={() => returnVisit(v.id, (reason()[v.id] ?? '').trim())}>
                    退回重新分层
                  </button>
                </div>
              </div>
            );
          }}</For>
        </div>
      </Show>
    </div>
  );
}

/** 迷你厚度曲线（沿帧方向的平均厚度） */
function MiniCurve(props: { visit: Visit }) {
  const series = createMemo(() => {
    if (!props.visit.layers) return [] as number[];
    const dev = getDevice(props.visit.deviceId);
    const W = 256;
    const out: number[] = [];
    for (let s = 0; s < 64; s++) {
      const a = props.visit.layers.ILM.slice(s * W, (s + 1) * W);
      const b = props.visit.layers.GCL.slice(s * W, (s + 1) * W);
      const vals = a.map((x, i) => (x != null && b[i] != null ? Math.abs((b[i] as number) - x) * dev.scaleZum : null))
        .filter((x): x is number => x != null);
      out.push(vals.length ? vals.reduce((s, x) => s + x, 0) / vals.length : 0);
    }
    return out;
  });
  const W = 300;
  const H = 90;
  return (
    <div class="mini-curve">
      <h4>厚度曲线（64 帧平均）</h4>
      <svg viewBox={`0 0 ${W} ${H}`}>
        {(() => {
          const d = series();
          if (!d.length) return <text x="10" y="45" fill="#8aa">无数据</text>;
          const lo = Math.min(...d) - 2;
          const hi = Math.max(...d) + 2;
          const path = d.map((v, i) => {
            const x = (i / (d.length - 1)) * W;
            const y = H - 8 - ((v - lo) / (hi - lo)) * (H - 16);
            return `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`;
          }).join(' ');
          return <path d={path} fill="none" stroke="#39d0ff" stroke-width="2" />;
        })()}
      </svg>
    </div>
  );
}

function StatsPanel() {
  const stats = createMemo(() => {
    const interpreted = Object.values(state.visits).filter((v) => v.interpretation);
    const byPatient = new Map<string, { total: number; progression: number }>();
    for (const v of interpreted) {
      const row = byPatient.get(v.patientId) ?? { total: 0, progression: 0 };
      row.total++;
      if (v.interpretation!.verdict === 'progression') row.progression++;
      byPatient.set(v.patientId, row);
    }
    const patientRows = state.patients.map((p) => {
      const r = byPatient.get(p.id) ?? { total: 0, progression: 0 };
      return {
        id: p.id,
        name: p.name,
        mrn: p.mrn,
        total: r.total,
        progression: r.progression,
        rate: r.total ? (r.progression / r.total) * 100 : 0,
      };
    });
    const returns = Object.values(state.visits).filter((v) => v.returnReason);
    const reasonGroups = new Map<string, number>();
    for (const v of returns) reasonGroups.set(v.returnReason!, (reasonGroups.get(v.returnReason!) ?? 0) + 1);
    const overall = interpreted.length
      ? ((interpreted.filter((v) => v.interpretation!.verdict === 'progression').length / interpreted.length) * 100).toFixed(1)
      : '0.0';
    return { patientRows, returns, reasonGroups: [...reasonGroups.entries()], overall };
  });

  return (
    <div class="panel">
      <h3>随访统计</h3>
      <div class="kpi-row">
        <div class="kpi"><b>{stats().overall}%</b><span>总体进展率（按访视单）</span></div>
        <div class="kpi"><b>{stats().returns.length}</b><span>累计退回单数</span></div>
        <div class="kpi"><b>{Object.values(state.visits).length}</b><span>访视单总数</span></div>
      </div>
      <h4>按患者进展率</h4>
      <table class="data-table">
        <thead><tr><th>患者</th><th>病历号</th><th>已判读次数</th><th>判进展次数</th><th>进展率</th></tr></thead>
        <tbody>
          <For each={stats().patientRows}>{(r) => (
            <tr>
              <td>{r.name}</td><td>{r.mrn}</td><td>{r.total}</td><td>{r.progression}</td>
              <td><b classList={{ red: r.rate >= 40 }}>{r.rate.toFixed(1)}%</b></td>
            </tr>
          )}</For>
        </tbody>
      </table>
      <h4>退回原因分布</h4>
      <Show when={stats().reasonGroups.length} fallback={<p class="muted">暂无退回记录。</p>}>
        <table class="data-table">
          <thead><tr><th>退回原因</th><th>次数</th></tr></thead>
          <tbody>
            <For each={stats().reasonGroups}>{([reason, n]) => (
              <tr><td class="reason-cell">{reason}</td><td>{n}</td></tr>
            )}</For>
          </tbody>
        </table>
      </Show>
      <h4>报告导出</h4>
      <div class="form-row">
        <For each={state.patients}>{(p) => (
          <span class="export-group">
            <b>{p.name}</b>
            <button class="btn small" onClick={() => exportProgressReport(p.id)}>进展报告</button>
            <button class="btn small" onClick={() => exportThicknessTrend(p.id)}>厚度趋势表(CSV)</button>
          </span>
        )}</For>
      </div>
      <p class="muted">导出内容含判读结论、依据、象限差分、标红项、厚度趋势及完整操作审计（操作人+时间）。</p>
    </div>
  );
}
