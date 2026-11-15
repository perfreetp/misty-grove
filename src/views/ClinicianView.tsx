// 门诊医师视图：待判读队列 + 进展判读表单
import { createMemo, createSignal, For, Show } from 'solid-js';
import { state, stageQueue, submitInterpretation, getDevice } from '../store';
import { STAGE_LABEL, VERDICT_LABEL, type Verdict, type Visit } from '../types';
import { fmtDay } from '../lib/util';
import { compareQuads } from '../lib/oct';

export default function ClinicianView(props: { onOpenVisit: (id: string) => void }) {
  const queue = createMemo(() => stageQueue('pending_review'));
  return (
    <div class="view">
      <div class="panel">
        <h3>待判读队列（{queue().length} 例）</h3>
        <Show when={queue().length} fallback={<p class="muted">暂无待判读访视单。</p>}>
          <table class="data-table">
            <thead>
              <tr><th>患者</th><th>眼别</th><th>采集日期</th><th>设备</th><th>自动预警</th><th>操作</th></tr>
            </thead>
            <tbody>
              <For each={queue()}>{(v) => <QueueRow visit={v} onOpen={props.onOpenVisit} />}</For>
            </tbody>
          </table>
        </Show>
      </div>
      <div class="panel">
        <h3>我已判读（最近）</h3>
        <table class="data-table">
          <thead><tr><th>患者</th><th>眼别</th><th>日期</th><th>结论</th><th>判读时间</th></tr></thead>
          <tbody>
            <For each={Object.values(state.visits)
              .filter((v) => v.interpretation)
              .sort((a, b) => (b.interpretation?.at ?? '').localeCompare(a.interpretation?.at ?? ''))
              .slice(0, 8)}>
              {(v) => (
                <tr>
                  <td>{patientName(v.patientId)}</td>
                  <td>{v.eye}</td>
                  <td>{fmtDay(v.acquiredAt)}</td>
                  <td><span class={`verdict ${v.interpretation!.verdict}`}>{VERDICT_LABEL[v.interpretation!.verdict]}</span></td>
                  <td>{v.interpretation!.at.slice(0, 16).replace('T', ' ')}</td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function QueueRow(props: { visit: Visit; onOpen: (id: string) => void }) {
  const warnings = createMemo(() => {
    const prev = Object.values(state.visits)
      .filter((x) => x.patientId === props.visit.patientId && x.eye === props.visit.eye && x.acquiredAt < props.visit.acquiredAt && x.layers)
      .sort((a, b) => b.acquiredAt.localeCompare(a.acquiredAt))[0];
    if (!prev) return { list: ['首次访视，无基线对比'], flagged: 0 };
    const cmp = compareQuads(props.visit, prev, getDevice(props.visit.deviceId).scaleZum);
    return { list: cmp.filter((c) => c.flagged).map((c) => `${c.label}：${c.reason}`), flagged: cmp.filter((c) => c.flagged).length };
  });
  return (
    <tr classList={{ 'has-warning': warnings().flagged > 0 }}>
      <td>{patientName(props.visit.patientId)}</td>
      <td>{props.visit.eye}</td>
      <td>{fmtDay(props.visit.acquiredAt)}</td>
      <td>{getDevice(props.visit.deviceId).model}</td>
      <td>
        <Show when={warnings().list.length} fallback={<span class="muted">无异常</span>}>
          <For each={warnings().list}>{(w) => <div class="warning-text">⚠ {w}</div>}</For>
        </Show>
      </td>
      <td><button class="btn primary small" onClick={() => props.onOpen(props.visit.id)}>进入判读</button></td>
    </tr>
  );
}

export function InterpretationForm(props: { visit: Visit }) {
  const [verdict, setVerdict] = createSignal<Verdict>(props.visit.interpretation?.verdict ?? 'stable');
  const [rationale, setRationale] = createSignal(props.visit.interpretation?.rationale ?? '');
  const [error, setError] = createSignal('');

  function submit() {
    if (!rationale().trim()) {
      setError('进展判定必须填写判读依据。');
      return;
    }
    submitInterpretation(props.visit.id, verdict(), rationale().trim());
    setError('');
  }

  const options: { v: Verdict; desc: string }[] = [
    { v: 'progression', desc: '厚度变薄/断裂达进展标准' },
    { v: 'suspect', desc: '变化 borderline，需短期复查' },
    { v: 'stable', desc: '与基线相比无显著变化' },
  ];

  return (
    <div class="panel interpretation">
      <h3>进展判定</h3>
      <div class="verdict-options">
        <For each={options}>{(o) => (
          <button class={`verdict-card ${o.v}`} classList={{ selected: verdict() === o.v }} onClick={() => setVerdict(o.v)}>
            <b>{VERDICT_LABEL[o.v]}</b>
            <span>{o.desc}</span>
          </button>
        )}</For>
      </div>
      <label class="rationale-label">判读依据（必填）
        <textarea rows="4" placeholder="记录变薄象限、厚度差、断裂位置及临床判断…"
          value={rationale()} onInput={(e) => setRationale(e.currentTarget.value)} />
      </label>
      <div class="form-row">
        <button class="btn primary" onClick={submit}>
          {props.visit.interpretation ? '重新提交判读' : '提交判读'}
        </button>
        <span class="error-msg">{error()}</span>
      </div>
      <Show when={props.visit.interpretation}>
        <p class="muted">
          当前结论：{VERDICT_LABEL[props.visit.interpretation!.verdict]} · {props.visit.interpretation!.by} ·{' '}
          {props.visit.interpretation!.at.slice(0, 16).replace('T', ' ')} · 状态：{STAGE_LABEL[props.visit.stage]}
        </p>
      </Show>
    </div>
  );
}

function patientName(id: string) {
  return state.patients.find((p) => p.id === id)?.name ?? id;
}
