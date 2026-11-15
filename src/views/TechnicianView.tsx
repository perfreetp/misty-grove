// 技师视图：设备导入、待分层队列处理、分层模板维护
import { createMemo, createSignal, For, Show } from 'solid-js';
import {
  createTemplate,
  currentUser,
  getDevice,
  getTemplate,
  getVisit,
  importVisit,
  registerDevice,
  runAutoSegmentation,
  saveTemplate,
  stageQueue,
  state,
  submitLayers,
} from '../store';
import { STAGE_LABEL, type LayerTemplate, type Eye } from '../types';
import { fmtDate, fmtDay } from '../lib/util';
import { VOL } from '../lib/oct';

export default function TechnicianView(props: { onOpenVisit: (id: string) => void }) {
  const [tab, setTab] = createSignal<'queue' | 'import' | 'devices' | 'templates'>('queue');
  return (
    <div class="view">
      <div class="subtabs">
        <button classList={{ active: tab() === 'queue' }} onClick={() => setTab('queue')}>待分层 / 已退回队列</button>
        <button classList={{ active: tab() === 'import' }} onClick={() => setTab('import')}>设备导入</button>
        <button classList={{ active: tab() === 'devices' }} onClick={() => setTab('devices')}>设备台账</button>
        <button classList={{ active: tab() === 'templates' }} onClick={() => setTab('templates')}>分层模板维护</button>
      </div>
      {tab() === 'queue' && <LayerQueue onOpenVisit={props.onOpenVisit} />}
      {tab() === 'import' && <ImportPanel />}
      {tab() === 'devices' && <DevicePanel />}
      {tab() === 'templates' && <TemplatePanel />}
    </div>
  );
}

function patientName(id: string) {
  return state.patients.find((p) => p.id === id)?.name ?? id;
}

function LayerQueue(props: { onOpenVisit: (id: string) => void }) {
  const items = createMemo(() =>
    [...stageQueue('pending_layers'), ...stageQueue('returned')].sort((a, b) =>
      a.acquiredAt.localeCompare(b.acquiredAt),
    ),
  );
  return (
    <div class="panel">
      <h3>分层工作台（{items().length} 例）</h3>
      <Show when={items().length} fallback={<p class="muted">队列为空。</p>}>
        <table class="data-table">
          <thead>
            <tr>
              <th>患者</th><th>眼别</th><th>采集日期</th><th>设备</th><th>状态</th>
              <th>退回原因</th><th>操作</th>
            </tr>
          </thead>
          <tbody>
            <For each={items()}>
              {(v) => (
                <tr classList={{ returned: v.stage === 'returned' }}>
                  <td>{patientName(v.patientId)}</td>
                  <td>{v.eye}</td>
                  <td>{fmtDay(v.acquiredAt)}</td>
                  <td>{getDevice(v.deviceId).model}</td>
                  <td><span class={`stage-badge ${v.stage}`}>{STAGE_LABEL[v.stage]}</span></td>
                  <td class="reason-cell">{v.returnReason ?? '—'}</td>
                  <td class="nowrap">
                    <Show when={!v.layers}>
                      <button class="btn small" onClick={() => { runAutoSegmentation(v.id); }}>自动分层</button>
                    </Show>
                    <button class="btn small" onClick={() => props.onOpenVisit(v.id)}>
                      {v.layers ? '检查/修正' : '打开'}
                    </button>
                    <button class="btn small primary" disabled={!v.layers} onClick={() => submitLayers(v.id)}>
                      提交判读
                    </button>
                  </td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </Show>
    </div>
  );
}

function ImportPanel() {
  const [patientId, setPatientId] = createSignal(state.patients[0].id);
  const [eye, setEye] = createSignal<Eye>('OD');
  const [deviceId, setDeviceId] = createSignal(state.devices[0].id);
  const [date, setDate] = createSignal(new Date().toISOString().slice(0, 10));
  const [bias, setBias] = createSignal(0);
  const [addBreak, setAddBreak] = createSignal(false);
  const [breakSlice, setBreakSlice] = createSignal(30);
  const [breakCol, setBreakCol] = createSignal(128);
  const [breaks, setBreaks] = createSignal<string[]>([]);
  const [msg, setMsg] = createSignal('');

  function doImport() {
    const id = importVisit({
      patientId: patientId(),
      eye: eye(),
      deviceId: deviceId(),
      acquiredAt: `${date()}T03:00:00.000Z`,
      thicknessBiasUm: Number(bias()),
      breaks: breaks(),
    });
    setMsg(`导入成功，访视单号 ${id.slice(-8)}，已进入待分层队列。`);
    setBreaks([]);
  }

  return (
    <div class="panel form-grid">
      <h3>OCT B 扫描序列导入（模拟设备直连/DICOM 导入）</h3>
      <p class="muted">
        体数据规格：{VOL.slices} 帧 × {VOL.width} A扫描 × {VOL.height} 深度，横向 {VOL.scaleXum}µm/px、轴向 {VOL.scaleZum}µm/px。
        演示环境按种子程序化重建灰度体数据。
      </p>
      <label>患者
        <select value={patientId()} onChange={(e) => setPatientId(e.currentTarget.value)}>
          <For each={state.patients}>{(p) => <option value={p.id}>{p.name}（{p.mrn}）</option>}</For>
        </select>
      </label>
      <label>眼别
        <select value={eye()} onChange={(e) => setEye(e.currentTarget.value as Eye)}>
          <option value="OD">右眼 OD</option>
          <option value="OS">左眼 OS</option>
        </select>
      </label>
      <label>来源设备
        <select value={deviceId()} onChange={(e) => setDeviceId(e.currentTarget.value)}>
          <For each={state.devices}>{(d) => <option value={d.id}>{d.vendor} {d.model} ({d.serial})</option>}</For>
        </select>
      </label>
      <label>采集日期
        <input type="date" value={date()} onInput={(e) => setDate(e.currentTarget.value)} />
      </label>
      <label>模拟厚度变化（相对基线 µm，负值=变薄）
        <input type="number" step="0.5" value={bias()} onInput={(e) => setBias(Number(e.currentTarget.value))} />
      </label>
      <div class="break-editor">
        <label class="inline">
          <input type="checkbox" checked={addBreak()} onChange={(e) => setAddBreak(e.currentTarget.checked)} />
          注入分层断裂（演示用）
        </label>
        <Show when={addBreak()}>
          <span>帧
            <input type="number" min="0" max={VOL.slices - 1} value={breakSlice()} onInput={(e) => setBreakSlice(Number(e.currentTarget.value))} />
            列
            <input type="number" min="0" max={VOL.width - 1} value={breakCol()} onInput={(e) => setBreakCol(Number(e.currentTarget.value))} />
            <button class="btn small" onClick={() => setBreaks((b) => [...b, `${breakSlice()}:${breakCol()}`])}>添加断裂点</button>
          </span>
        </Show>
        <Show when={breaks().length}>
          <div class="chip-row">
            <For each={breaks()}>{(b, i) => (
              <span class="chip red">帧{b.split(':')[0]} 列{b.split(':')[1]}
                <button onClick={() => setBreaks((arr) => arr.filter((_, j) => j !== i()))}>×</button>
              </span>
            )}</For>
          </div>
        </Show>
      </div>
      <div>
        <button class="btn primary" onClick={doImport}>导入序列</button>
        <span class="success-msg">{msg()}</span>
      </div>
    </div>
  );
}

function DevicePanel() {
  const [vendor, setVendor] = createSignal('Topcon');
  const [model, setModel] = createSignal('Maestro 2');
  const [serial, setSerial] = createSignal('');
  return (
    <div class="panel">
      <h3>设备台账（{state.devices.length} 台）</h3>
      <table class="data-table">
        <thead><tr><th>厂商</th><th>型号</th><th>序列号</th><th>导入时间</th><th>操作人</th></tr></thead>
        <tbody>
          <For each={state.devices}>{(d) => (
            <tr><td>{d.vendor}</td><td>{d.model}</td><td>{d.serial}</td><td>{fmtDate(d.importedAt)}</td><td>{d.operator}</td></tr>
          )}</For>
        </tbody>
      </table>
      <h4>注册新设备</h4>
      <div class="form-row">
        <label>厂商<input value={vendor()} onInput={(e) => setVendor(e.currentTarget.value)} /></label>
        <label>型号<input value={model()} onInput={(e) => setModel(e.currentTarget.value)} /></label>
        <label>序列号<input placeholder="SN-xxxx" value={serial()} onInput={(e) => setSerial(e.currentTarget.value)} /></label>
        <button class="btn primary" disabled={!serial().trim()}
          onClick={() => { registerDevice({ vendor: vendor(), model: model(), serial: serial().trim() }); setSerial(''); }}>
          注册
        </button>
      </div>
    </div>
  );
}

function TemplatePanel() {
  const [selectedId, setSelectedId] = createSignal(state.templates[0].id);
  const tpl = (): LayerTemplate => getTemplate(selectedId());
  const update = (patch: Partial<LayerTemplate>) => saveTemplate({ ...tpl(), ...patch });
  const kinds: (keyof LayerTemplate['smoothWindow'])[] = ['ILM', 'GCL', 'LC'];

  return (
    <div class="panel template-panel">
      <h3>分层模板维护</h3>
      <div class="tpl-layout">
        <div class="tpl-list">
          <For each={state.templates}>{(t) => (
            <button classList={{ active: t.id === selectedId() }} onClick={() => setSelectedId(t.id)}>
              {t.name}
              {t.builtin ? <span class="tag">内置</span> : <span class="tag custom">自定义</span>}
            </button>
          )}</For>
          <button class="btn small" onClick={() => setSelectedId(createTemplate(`新模板 ${state.templates.length + 1}`))}>
            + 新建模板
          </button>
        </div>
        <div class="tpl-edit">
          <label>模板名称
            <input value={tpl().name} onInput={(e) => update({ name: e.currentTarget.value })} />
          </label>
          <h4>平滑窗口（A扫描列数，越大越平滑）</h4>
          <div class="form-row">
            <For each={kinds}>{(k) => (
              <label>{k}
                <input type="number" min="1" max="31" step="2" value={tpl().smoothWindow[k]}
                  onInput={(e) => update({ smoothWindow: { ...tpl().smoothWindow, [k]: Number(e.currentTarget.value) } })} />
              </label>
            )}</For>
          </div>
          <label>断裂检测灵敏度（{Math.round(tpl().breakSensitivity * 100)}%）
            <input type="range" min="0" max="1" step="0.05" value={tpl().breakSensitivity}
              onInput={(e) => update({ breakSensitivity: Number(e.currentTarget.value) })} />
          </label>
          <label>筛板估计深度比例（{Math.round(tpl().lcDepthRatio * 100)}%）
            <input type="range" min="0.55" max="0.85" step="0.01" value={tpl().lcDepthRatio}
              onInput={(e) => update({ lcDepthRatio: Number(e.currentTarget.value) })} />
          </label>
          <p class="muted">最后更新：{fmtDate(tpl().updatedAt)} · {tpl().updatedBy}（操作人：{currentUser().name}）</p>
          <p class="muted">参数保存后，对访视重新执行「自动分层」即按新模板生成分层线。</p>
        </div>
      </div>
    </div>
  );
}
