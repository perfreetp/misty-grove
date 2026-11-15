// 访视详情工作台：B 扫描分层修正、地形图、差分闪烁、双眼对称、判读/退回、审计
import { createMemo, createSignal, Show } from 'solid-js';
import {
  currentUser,
  getDevice,
  getTemplate,
  previousVisit,
  runAutoSegmentation,
  state,
  submitLayers,
  visitChain,
} from '../store';
import { EYE_LABEL, LAYER_LABEL, LAYER_ORDER, STAGE_LABEL, type Visit } from '../types';
import { VOL, compareQuads } from '../lib/oct';
import { fmtDate, fmtDay } from '../lib/util';
import BScanViewer from '../components/BScanViewer';
import ThicknessMap from '../components/ThicknessMap';
import CompareView from '../components/CompareView';
import { BilateralSymmetry, ThicknessTrend } from '../components/Charts';
import { InterpretationForm } from './ClinicianView';
import { exportProgressReport, exportThicknessTrend } from '../lib/exporter';

type Tab = 'layers' | 'compare' | 'maps' | 'audit';

export default function VisitWorkspace(props: { visitId: string; onBack: () => void }) {
  const visit = (): Visit => state.visits[props.visitId];
  const [slice, setSlice] = createSignal(0);
  const [tab, setTab] = createSignal<Tab>('layers');
  const user = createMemo(currentUser);

  const prev = createMemo(() => previousVisit(visit()));
  const dev = createMemo(() => getDevice(visit().deviceId));
  const cmp = createMemo(() => compareQuads(visit(), prev(), dev().scaleZum));

  const canEdit = createMemo(() => {
    const v = visit();
    if (!v.layers) return false;
    if (user().role === 'clinician') return v.stage === 'pending_review' || v.stage === 'returned';
    if (user().role === 'technician') return v.stage === 'pending_layers' || v.stage === 'returned';
    return false;
  });

  // 同次访视的对侧眼
  const fellow = createMemo(() => {
    const targetEye = visit().eye === 'OD' ? 'OS' : 'OD';
    return visitChain(visit().patientId, targetEye as 'OD' | 'OS').find(
      (x) => fmtDay(x.acquiredAt) === fmtDay(visit().acquiredAt) && x.layers,
    );
  });

  const patient = createMemo(() => state.patients.find((p) => p.id === visit().patientId)!);

  return (
    <div class="workspace">
      <div class="ws-header">
        <button class="btn" onClick={props.onBack}>← 返回队列</button>
        <h2>
          {patient().name}（{patient().mrn}） · {EYE_LABEL[visit().eye]} · {fmtDay(visit().acquiredAt)}
        </h2>
        <span class={`stage-badge ${visit().stage}`}>{STAGE_LABEL[visit().stage]}</span>
        <div class="ws-meta">
          设备：{dev().vendor} {dev().model}（{dev().serial}） · 模板：{getTemplate(visit().templateId).name} ·
          分层人：{visit().layeredBy ?? '—'} {visit().layeredAt ? `@ ${fmtDate(visit().layeredAt as string)}` : ''}
        </div>
        <div class="ws-actions">
          <Show when={user().role === 'technician'}>
            <button class="btn" onClick={() => runAutoSegmentation(visit().id)}>重新自动分层</button>
            <button class="btn primary" disabled={!visit().layers} onClick={() => submitLayers(visit().id)}>
              提交分层 → 待判读
            </button>
          </Show>
          <button class="btn" onClick={() => exportProgressReport(patient().id)}>导出进展报告</button>
          <button class="btn" onClick={() => exportThicknessTrend(patient().id)}>导出厚度趋势表</button>
        </div>
      </div>

      <Show when={visit().stage === 'returned'}>
        <div class="return-banner">
          <b>该访视单已被 {visit().returnedBy} 退回（{fmtDate(visit().returnedAt!)}）：</b>
          {visit().returnReason}
        </div>
      </Show>

      <div class="subtabs">
        <button classList={{ active: tab() === 'layers' }} onClick={() => setTab('layers')}>断层分层</button>
        <button classList={{ active: tab() === 'compare' }} onClick={() => setTab('compare')}>随访差分闪烁</button>
        <button classList={{ active: tab() === 'maps' }} onClick={() => setTab('maps')}>地形图 / 对称图 / 趋势</button>
        <button classList={{ active: tab() === 'audit' }} onClick={() => setTab('audit')}>
          操作审计（{visit().audit.length}）
        </button>
      </div>

      <Show when={tab() === 'layers'}>
        <div class="panel">
          <div class="slice-control">
            <label>
              B 扫描帧 <b>{slice() + 1}</b> / {VOL.slices}
              <input type="range" min="0" max={VOL.slices - 1} value={slice()}
                onInput={(e) => setSlice(Number(e.currentTarget.value))} />
            </label>
            <div class="layer-quick">
              {LAYER_ORDER.map((k) => (
                <span class="chip">{LAYER_LABEL[k]}</span>
              ))}
            </div>
          </div>
          <Show when={visit().layers} fallback={<p class="muted">该访视尚未分层。请技师执行「自动分层」后再进行修正。</p>}>
            <BScanViewer visit={visit()} slice={slice()} editable={canEdit()} />
          </Show>
          <Show when={!visit().layers}>
            <BScanViewer visit={visit()} slice={slice()} editable={false} showRaw />
          </Show>
        </div>
      </Show>

      <Show when={tab() === 'compare'}>
        <div class="panel">
          <h3>与上一次随访对比</h3>
          <Show when={prev()} fallback={<p class="muted">该眼为首次访视，无基线。</p>}>
            <p class="muted">
              上次访视：{fmtDay(prev()!.acquiredAt)}（{STAGE_LABEL[prev()!.stage]}）。闪烁交替显示同帧位置两次 B 扫描，
              便于识别边界位移与层间厚度变化。
            </p>
            <div class="slice-control">
              <label>帧位置 <b>{slice() + 1}</b> / {VOL.slices}
                <input type="range" min="0" max={VOL.slices - 1} value={slice()}
                  onInput={(e) => setSlice(Number(e.currentTarget.value))} />
              </label>
            </div>
            <CompareView current={visit()} previous={prev()} editable={canEdit()} slice={slice()} />
          </Show>
        </div>
      </Show>

      <Show when={tab() === 'maps'}>
        <div class="maps-grid">
          <div class="panel">
            <h3>厚度地形图（ILM–GCL 神经节细胞复合体）</h3>
            <ThicknessMap visitId={visit().id} compare={cmp()} />
          </div>
          <div class="panel">
            <h3>随访象限差分</h3>
            <QuadDiffList visit={visit()} />
          </div>
          <BilateralSymmetry
            odVisitId={visit().eye === 'OD' ? visit().id : fellow()?.id}
            osVisitId={visit().eye === 'OS' ? visit().id : fellow()?.id}
          />
          <ThicknessTrend patient={patient()} eye={visit().eye} />
        </div>
        <Show when={user().role === 'clinician' && (visit().stage === 'pending_review' || visit().stage === 'returned')}>
          <InterpretationForm visit={visit()} />
        </Show>
      </Show>

      <Show when={tab() === 'audit'}>
        <div class="panel">
          <h3>操作审计（每次改动记录操作人与时间）</h3>
          <table class="data-table audit-table">
            <thead><tr><th>时间</th><th>操作人</th><th>角色</th><th>动作</th><th>明细</th></tr></thead>
            <tbody>
              {[...visit().audit].reverse().map((a) => (
                <tr>
                  <td class="nowrap">{fmtDate(a.at)}</td>
                  <td>{a.user}</td>
                  <td>{a.role}</td>
                  <td>{a.action}</td>
                  <td>{a.detail ?? ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Show>

      <Show when={tab() !== 'maps' && user().role === 'clinician' && (visit().stage === 'pending_review' || visit().stage === 'returned')}>
        <InterpretationForm visit={visit()} />
      </Show>
    </div>
  );
}

function QuadDiffList(props: { visit: Visit }) {
  const prev = createMemo(() => previousVisit(props.visit));
  const dev = createMemo(() => getDevice(props.visit.deviceId));
  const rows = createMemo(() => compareQuads(props.visit, prev(), dev().scaleZum));
  return (
    <table class="quad-table">
      <thead>
        <tr><th>象限</th><th>本次(µm)</th><th>上次(µm)</th><th>差值</th><th>状态</th></tr>
      </thead>
      <tbody>
        {rows().map((r) => (
          <tr classList={{ flagged: r.flagged }}>
            <td>{r.label}</td>
            <td>{r.current.toFixed(1)}</td>
            <td>{r.previous != null ? r.previous.toFixed(1) : '—'}</td>
            <td>{r.deltaUm != null ? `${r.deltaUm > 0 ? '+' : ''}${r.deltaUm.toFixed(1)}` : '—'}</td>
            <td>{r.flagged ? <span class="red">● {r.reason}</span> : <span class="green">正常</span>}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
