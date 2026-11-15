// 左侧面板：工程参数 / 分级坡 / 地质分层 / 工具 / 规则校验
import { store } from '../core/store';
import type { ToolId } from '../types';
import { toast } from './widgets';

function numField(label: string, value: number, step: number, onChange: (v: number) => void, min = 0): string {
  return `<label class="field"><span>${label}</span>
    <input type="number" step="${step}" min="${min}" value="${value}" data-num></label>`;
}

function bindNum(scope: HTMLElement, selector: string, cb: (v: number) => void) {
  const el = scope.querySelector(selector) as HTMLInputElement;
  el.addEventListener('change', () => {
    const v = parseFloat(el.value);
    if (Number.isFinite(v)) cb(v);
    else toast('请输入有效数字', 'error');
  });
}

const TOOLS: { id: ToolId; ico: string; name: string; hint: string }[] = [
  { id: 'select', ico: '▣', name: '选择/浏览', hint: '左键旋转，右键平移，滚轮缩放；点击坡面选中分级。' },
  { id: 'frame', ico: '▦', name: '锚杆框架梁', hint: '点击某级坡面启用该级框架梁（6m 自动分块并与坡顶线对齐），再次点击取消。' },
  { id: 'ditch', ico: '☷', name: '截水沟', hint: '点击坡顶地面或平台，沿走向生成整段截水沟；可在右栏调整起止桩号。' },
  { id: 'wall', ico: '▤', name: '护面墙', hint: '在同一级坡面上点击两点确定走向区间，自动生成护面墙。' },
  { id: 'monitor', ico: '◉', name: '监测点', hint: '点击坡面放置监测点，右栏可修改监测类型与编号。' },
];

export function renderLeftPanel(): void {
  const el = document.getElementById('leftPanel')!;
  const { config } = store.state;
  const issues = store.engine.issues;
  const errors = issues.filter((i) => i.level === 'error');
  const warns = issues.filter((i) => i.level === 'warn');

  el.innerHTML = `
    <div class="section">
      <h3>工程参数</h3>
      <label class="field"><span>项目名称</span><input id="fProject" type="text" value="${config.projectName}"></label>
      <label class="field"><span>起讫桩号</span><input id="fChainage" type="text" value="${config.chainage}"></label>
      <div class="row2">
        <label class="field"><span>走向长度 L(m)</span><input id="fLen" type="number" step="1" value="${config.slopeLength}"></label>
        <label class="field"><span>批次工期(天)</span><input id="fDue" type="number" step="1" value="${config.batchDueDays}"></label>
      </div>
      <div class="row2">
        <label class="field"><span>坡顶高程(m)</span><input id="fTop" type="number" step="0.5" value="${config.topElev}"></label>
        <label class="field"><span>坡脚高程(m)</span><input id="fToe" type="number" step="0.5" value="${config.toeElev}"></label>
      </div>
    </div>

    <div class="section">
      <h3>设计工具</h3>
      <div class="tools">
        ${TOOLS.map((t) => `<button class="tool-btn ${store.tool === t.id ? 'active' : ''}" data-tool="${t.id}">
          <span class="ico">${t.ico}</span><span>${t.name}</span></button>`).join('')}
      </div>
      <div class="tool-hint" id="toolHint">${TOOLS.find((t) => t.id === store.tool)?.hint ?? ''}</div>
    </div>

    <div class="section">
      <h3>分级坡（坡率 / 分级高度）</h3>
      ${config.grades.map((g, i) => {
        const face = store.model.faces.find((f) => f.gradeId === g.id);
        const enabled = !!store.state.intents.frameEnabled[g.id];
        const densified = !!store.state.intents.densified[g.id];
        const bS = face?.boundaryS ?? null;
        const isInterior = bS !== null && bS > 0.05 && bS < (face?.slopeLength ?? 0) - 0.05;
        return `<div class="list-item ${store.selectedGradeId === g.id ? 'selected' : ''}" data-grade="${g.id}">
          <div class="head"><b>第${i + 1}级坡</b>
            <label class="inline muted"><input type="checkbox" data-frame="${g.id}" ${enabled ? 'checked' : ''}>框架梁</label></div>
          <div class="row3">
            <label class="field"><span>坡率 1:n</span><input type="number" step="0.05" value="${g.ratio}" data-gratio="${g.id}"></label>
            <label class="field"><span>高度(m)</span><input type="number" step="0.5" value="${g.height}" data-gh="${g.id}"></label>
            <label class="field"><span>平台宽(m)</span><input type="number" step="0.1" value="${g.bermWidth}" data-gb="${g.id}"></label>
          </div>
          <div class="meta">斜长 ${face?.slopeLength.toFixed(2) ?? '—'}m ·
            ${isInterior ? `土岩分界 ${bS!.toFixed(2)}m处` : '土岩分界位于分级线'}</div>
          ${isInterior ? `
            <button class="btn sm ${densified ? 'primary' : ''}" data-densify="${g.id}" style="margin-top:5px">
              ${densified ? '✓ 已分界加密（点击取消）' : '土岩分界处加密锚杆'}</button>` : ''}
        </div>`;
      }).join('')}
      <div class="row2" style="margin-top:6px">
        <label class="field"><span>框架分块/走向间距(m)</span><input id="fBlock" type="number" step="0.5" min="1" value="${config.frameBlock}"></label>
        <label class="field"><span>锚杆排距(m)</span><input id="fRow" type="number" step="0.5" min="1" value="${config.frameRowSpacing}"></label>
      </div>
    </div>

    <div class="section">
      <h3>地质分层（锚杆长度随岩层）</h3>
      ${config.layers.map((l) => `
        <div class="list-item">
          <div class="head"><b>${l.name}</b>
            <span class="tag ${l.kind === 'soil' ? 'submitted' : 'approved'}">${l.kind === 'soil' ? '土' : '岩'}</span></div>
          <div class="row3">
            <label class="field"><span>层底高程</span><input type="number" step="0.5" value="${l.bottomElev}" data-lbot="${l.id}"></label>
            <label class="field"><span>锚杆长(m)</span><input type="number" step="0.5" value="${l.anchorLength}" data-len="${l.id}"></label>
            <label class="field"><span>颜色</span><input type="color" value="${rgbToHex(l.color)}" data-lcol="${l.id}"></label>
          </div>
        </div>`).join('')}
    </div>

    <div class="section">
      <h3>构件截面参数</h3>
      <div class="row2">
        <label class="field"><span>框架梁宽(m)</span><input id="fBw" type="number" step="0.05" value="${config.beamWidth}"></label>
        <label class="field"><span>框架梁高(m)</span><input id="fBd" type="number" step="0.05" value="${config.beamDepth}"></label>
        <label class="field"><span>截水沟底宽(m)</span><input id="fDb" type="number" step="0.05" value="${config.ditchBottomWidth}"></label>
        <label class="field"><span>截水沟顶宽(m)</span><input id="fDt" type="number" step="0.05" value="${config.ditchTopWidth}"></label>
        <label class="field"><span>截水沟深(m)</span><input id="fDd" type="number" step="0.05" value="${config.ditchDepth}"></label>
        <label class="field"><span>护面墙厚(m)</span><input id="fWt" type="number" step="0.05" value="${config.wallThickness}"></label>
        <label class="field"><span>锚杆直径(mm)</span><input id="fAd" type="number" step="1" value="${config.anchorBarDiameter}"></label>
        <label class="field"><span>梁配筋率(%)</span><input id="fSr" type="number" step="0.1" value="${config.beamSteelRatio}"></label>
      </div>
      <button class="btn ghost sm" id="resetBtn" style="width:100%;margin-top:4px">恢复默认工程</button>
    </div>

    <div class="section">
      <h3>规则校验（${errors.length} 错误 / ${warns.length} 警告）</h3>
      ${issues.length === 0 ? '<div class="empty">全部规则通过 ✓</div>' : issues.map((i) =>
        `<div class="msg ${i.level === 'error' ? 'error' : i.level === 'warn' ? 'warn' : 'ok'}">${i.message}</div>`).join('')}
    </div>
  `;

  bindLeftEvents(el);
}

function rgbToHex(c: [number, number, number]): string {
  const h = (n: number) => n.toString(16).padStart(2, '0');
  return `#${h(c[0])}${h(c[1])}${h(c[2])}`;
}
function hexToRgb(hex: string): [number, number, number] {
  return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
}

function bindLeftEvents(el: HTMLElement) {
  const { config } = store.state;

  (el.querySelector('#fProject') as HTMLInputElement).addEventListener('change', (e) =>
    store.updateConfig({ projectName: (e.target as HTMLInputElement).value }));
  (el.querySelector('#fChainage') as HTMLInputElement).addEventListener('change', (e) =>
    store.updateConfig({ chainage: (e.target as HTMLInputElement).value }));
  bindNum(el, '#fLen', (v) => store.updateConfig({ slopeLength: v }));
  bindNum(el, '#fDue', (v) => store.updateConfig({ batchDueDays: v }));
  bindNum(el, '#fTop', (v) => store.updateConfig({ topElev: v }));
  bindNum(el, '#fToe', (v) => store.updateConfig({ toeElev: v }));
  bindNum(el, '#fBlock', (v) => store.updateConfig({ frameBlock: v }));
  bindNum(el, '#fRow', (v) => store.updateConfig({ frameRowSpacing: v }));
  bindNum(el, '#fBw', (v) => store.updateConfig({ beamWidth: v }));
  bindNum(el, '#fBd', (v) => store.updateConfig({ beamDepth: v }));
  bindNum(el, '#fDb', (v) => store.updateConfig({ ditchBottomWidth: v }));
  bindNum(el, '#fDt', (v) => store.updateConfig({ ditchTopWidth: v }));
  bindNum(el, '#fDd', (v) => store.updateConfig({ ditchDepth: v }));
  bindNum(el, '#fWt', (v) => store.updateConfig({ wallThickness: v }));
  bindNum(el, '#fAd', (v) => store.updateConfig({ anchorBarDiameter: v }));
  bindNum(el, '#fSr', (v) => store.updateConfig({ beamSteelRatio: v }));

  el.querySelectorAll<HTMLElement>('[data-tool]').forEach((btn) =>
    btn.addEventListener('click', () => store.setTool(btn.dataset.tool as ToolId)));

  config.grades.forEach((g) => {
    const r = (sel: string) => el.querySelector(sel) as HTMLInputElement | null;
    r(`[data-gratio="${g.id}"]`)?.addEventListener('change', (e) =>
      store.updateGrade(g.id, { ratio: parseFloat((e.target as HTMLInputElement).value) }));
    r(`[data-gh="${g.id}"]`)?.addEventListener('change', (e) =>
      store.updateGrade(g.id, { height: parseFloat((e.target as HTMLInputElement).value) }));
    r(`[data-gb="${g.id}"]`)?.addEventListener('change', (e) =>
      store.updateGrade(g.id, { bermWidth: parseFloat((e.target as HTMLInputElement).value) }));
    r(`[data-frame="${g.id}"]`)?.addEventListener('change', (e) =>
      store.setFrameEnabled(g.id, (e.target as HTMLInputElement).checked));
    el.querySelector(`[data-densify="${g.id}"]`)?.addEventListener('click', () =>
      store.setDensified(g.id, !store.state.intents.densified[g.id]));
    el.querySelector(`[data-grade="${g.id}"]`)?.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).hasAttribute('data-densify')) return;
      store.selectGrade(g.id);
    });
  });

  config.layers.forEach((l) => {
    const r = (sel: string) => el.querySelector(sel) as HTMLInputElement | null;
    r(`[data-lbot="${l.id}"]`)?.addEventListener('change', (e) =>
      store.updateLayer(l.id, { bottomElev: parseFloat((e.target as HTMLInputElement).value) }));
    r(`[data-len="${l.id}"]`)?.addEventListener('change', (e) =>
      store.updateLayer(l.id, { anchorLength: parseFloat((e.target as HTMLInputElement).value) }));
    r(`[data-lcol="${l.id}"]`)?.addEventListener('change', (e) =>
      store.updateLayer(l.id, { color: hexToRgb((e.target as HTMLInputElement).value) }));
  });

  el.querySelector('#resetBtn')?.addEventListener('click', () => {
    if (confirm('确定恢复默认工程？当前设计与批次将被清空。')) store.resetProject();
  });
}
