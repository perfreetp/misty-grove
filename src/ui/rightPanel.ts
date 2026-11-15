// 右侧面板：设计构件 / 工程量 / 验收批次 / 看板
import { store } from '../core/store';
import { summarize } from '../core/engine';
import {
  approveBatch, dashboard, declareBatch, isOverdue, rejectBatch, resubmitBatch, statusLabel,
} from '../core/acceptance';
import { buildBillRows } from '../core/export';
import type { AcceptanceBatch, ComponentType } from '../types';
import { fmt, fmtDate, modal, toast } from './widgets';

type Tab = 'design' | 'qty' | 'accept' | 'board';
let currentTab: Tab = 'design';

const TYPE_NAME: Record<ComponentType, string> = {
  frame: '锚杆框架梁', ditch: '截水沟', wall: '护面墙', monitor: '监测点',
};

export function renderRightPanel(): void {
  const el = document.getElementById('rightPanel')!;
  const stats = dashboard(store.state);
  el.innerHTML = `
    <div class="tabs">
      ${tabBtn('design', '设计构件')}
      ${tabBtn('qty', '工程量')}
      ${tabBtn('accept', `验收批次${stats.submitted + stats.rejected > 0 ? `<span class="pill-count">${stats.submitted + stats.rejected}</span>` : ''}`)}
      ${tabBtn('board', '看板')}
    </div>
    <div id="tabBody"></div>`;
  el.querySelectorAll<HTMLElement>('.tab').forEach((t) =>
    t.addEventListener('click', () => { currentTab = t.dataset.tab as Tab; renderRightPanel(); }));
  const body = el.querySelector('#tabBody') as HTMLElement;
  if (currentTab === 'design') renderDesign(body);
  else if (currentTab === 'qty') renderQty(body);
  else if (currentTab === 'accept') renderAccept(body);
  else renderBoard(body);
}

function tabBtn(id: Tab, label: string): string {
  return `<div class="tab ${currentTab === id ? 'active' : ''}" data-tab="${id}">${label}</div>`;
}

// ---------------- 设计构件 ----------------
function renderDesign(body: HTMLElement) {
  const { components, config, intents } = store.state;
  const gradeName = (id: string | null) => {
    if (id === null) return '坡顶';
    const i = config.grades.findIndex((g) => g.id === id);
    return i >= 0 ? `第${i + 1}级坡` : id;
  };
  body.innerHTML = `
    <div class="section">
      <h3>锚杆框架梁（${components.frames.length} 级）</h3>
      ${components.frames.length === 0 ? '<div class="empty">尚未布置，选择「锚杆框架梁」工具后点击坡面</div>' :
      components.frames.map((f) => {
        const densifiedAnchors = f.anchors.filter((a) => a.densified).length;
        return `<div class="list-item ${store.selectedGradeId === f.gradeId ? 'selected' : ''}" data-pick="${f.gradeId}">
          <div class="head"><b>${gradeName(f.gradeId)}</b>
            <span class="tag ${f.densifiedAtBoundary ? 'submitted' : 'draft'}">${f.densifiedAtBoundary ? '含分界加密' : '常规'}</span></div>
          <div class="meta">网格 ${f.colCount}列 × ${f.rowCount}排 · 锚杆 <b>${f.anchors.length}</b> 根
            ${densifiedAnchors ? `（加密 ${densifiedAnchors} 根）` : ''}<br>
            混凝土 ${fmt(f.concrete)} m³ · 钢筋 ${fmt(f.steel)} t</div>
          <button class="btn danger sm" data-rmframe="${f.gradeId}" style="margin-top:5px">删除该级框架</button>
        </div>`;
      }).join('')}
    </div>

    <div class="section">
      <h3>截水沟（${components.ditches.length}）</h3>
      ${intents.ditches.length === 0 ? '<div class="empty">无</div>' : intents.ditches.map((d) => {
        const real = components.ditches.find((x) => x.id === d.id);
        return `<div class="list-item">
          <div class="head"><b>${gradeName(d.gradeId)}截水沟</b>
            <button class="btn danger sm" data-rmditch="${d.id}">删除</button></div>
          <div class="row2">
            <label class="field"><span>起点 X(m)</span><input type="number" value="${d.startX}" data-dstart="${d.id}"></label>
            <label class="field"><span>终点 X(m)</span><input type="number" value="${d.endX}" data-dend="${d.id}"></label>
          </div>
          <div class="meta">长度 ${(d.endX - d.startX).toFixed(1)}m · 混凝土 ${real ? fmt(real.concrete) : 0} m³</div>
        </div>`;
      }).join('')}
    </div>

    <div class="section">
      <h3>护面墙（${components.walls.length}）</h3>
      ${intents.walls.length === 0 ? '<div class="empty">选择护面墙工具，在同级坡面点击两点圈定区间</div>' :
      intents.walls.map((w) => {
        const real = components.walls.find((x) => x.id === w.id);
        return `<div class="list-item">
          <div class="head"><b>${gradeName(w.gradeId)}护面墙</b>
            <button class="btn danger sm" data-rmwall="${w.id}">删除</button></div>
          <div class="row2">
            <label class="field"><span>起点 X(m)</span><input type="number" value="${w.startX}" data-wstart="${w.id}"></label>
            <label class="field"><span>终点 X(m)</span><input type="number" value="${w.endX}" data-wend="${w.id}"></label>
          </div>
          <div class="meta">混凝土 ${real ? fmt(real.concrete) : 0} m³</div>
        </div>`;
      }).join('')}
    </div>

    <div class="section">
      <h3>监测点（${components.monitors.length}）</h3>
      ${intents.monitors.length === 0 ? '<div class="empty">选择监测点工具后点击坡面</div>' :
      intents.monitors.map((m) => `
        <div class="list-item">
          <div class="head"><b>${m.code}</b>
            <button class="btn danger sm" data-rmmon="${m.id}">删除</button></div>
          <div class="row2">
            <label class="field"><span>类型</span>
              <select data-mkind="${m.id}">
                ${['位移监测桩', '深部位移孔', '地下水位孔', '锚索测力计'].map((k) =>
                  `<option ${m.kind === k ? 'selected' : ''}>${k}</option>`).join('')}
              </select></label>
            <label class="field"><span>编号</span><input type="text" value="${m.code}" data-mcode="${m.id}"></label>
          </div>
          <div class="meta">${gradeName(m.gradeId)} · X=${m.x.toFixed(1)}m · 高程 ${components.monitors.find((x) => x.id === m.id)?.pos[1].toFixed(2) ?? '—'}m</div>
        </div>`).join('')}
    </div>`;

  bindDesignEvents(body);
}

function bindDesignEvents(body: HTMLElement) {
  body.querySelectorAll<HTMLElement>('[data-pick]').forEach((el0) =>
    el0.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).tagName === 'BUTTON') return;
      store.selectGrade(el0.dataset.pick!);
    }));
  body.querySelectorAll<HTMLButtonElement>('[data-rmframe]').forEach((b) =>
    b.addEventListener('click', () => store.setFrameEnabled(b.dataset.rmframe!, false)));
  body.querySelectorAll<HTMLButtonElement>('[data-rmditch]').forEach((b) =>
    b.addEventListener('click', () => store.updateIntents((d) => {
      d.ditches = d.ditches.filter((x) => x.id !== b.dataset.rmditch);
    })));
  body.querySelectorAll<HTMLButtonElement>('[data-rmwall]').forEach((b) =>
    b.addEventListener('click', () => store.updateIntents((d) => {
      d.walls = d.walls.filter((x) => x.id !== b.dataset.rmwall);
    })));
  body.querySelectorAll<HTMLButtonElement>('[data-rmmon]').forEach((b) =>
    b.addEventListener('click', () => store.updateIntents((d) => {
      d.monitors = d.monitors.filter((x) => x.id !== b.dataset.rmmon);
    })));

  body.querySelectorAll<HTMLInputElement>('[data-dstart]').forEach((inp) =>
    inp.addEventListener('change', () => store.updateIntents((d) => {
      const it = d.ditches.find((x) => x.id === inp.dataset.dstart)!;
      it.startX = clampNum(inp.value);
    })));
  body.querySelectorAll<HTMLInputElement>('[data-dend]').forEach((inp) =>
    inp.addEventListener('change', () => store.updateIntents((d) => {
      const it = d.ditches.find((x) => x.id === inp.dataset.dend)!;
      it.endX = clampNum(inp.value);
    })));
  body.querySelectorAll<HTMLInputElement>('[data-wstart]').forEach((inp) =>
    inp.addEventListener('change', () => store.updateIntents((d) => {
      const it = d.walls.find((x) => x.id === inp.dataset.wstart)!;
      it.startX = clampNum(inp.value);
    })));
  body.querySelectorAll<HTMLInputElement>('[data-wend]').forEach((inp) =>
    inp.addEventListener('change', () => store.updateIntents((d) => {
      const it = d.walls.find((x) => x.id === inp.dataset.wend)!;
      it.endX = clampNum(inp.value);
    })));
  body.querySelectorAll<HTMLSelectElement>('[data-mkind]').forEach((sel) =>
    sel.addEventListener('change', () => store.updateIntents((d) => {
      const it = d.monitors.find((x) => x.id === sel.dataset.mkind)!;
      it.kind = sel.value as typeof it.kind;
    })));
  body.querySelectorAll<HTMLInputElement>('[data-mcode]').forEach((inp) =>
    inp.addEventListener('change', () => store.updateIntents((d) => {
      const it = d.monitors.find((x) => x.id === inp.dataset.mcode)!;
      it.code = inp.value;
    })));
}

function clampNum(v: string): number {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
}

// ---------------- 工程量 ----------------
function renderQty(body: HTMLElement) {
  const t = summarize(store.state.components);
  const rows = buildBillRows(store.state);
  body.innerHTML = `
    <div class="section">
      <h3>总量统计</h3>
      <div class="stat-grid">
        ${stat('锚杆根数', t.anchorCount, '根')}
        ${stat('锚杆钻孔', t.anchorTotalLength, 'm')}
        ${stat('混凝土总量', t.concreteTotal, 'm³')}
        ${stat('钢筋总量', t.steelTotal, 't')}
      </div>
      <div class="divider"></div>
      <table>
        <tr><td class="dim">框架梁混凝土</td><td class="num">${fmt(t.frameConcrete)} m³</td></tr>
        <tr><td class="dim">截水沟混凝土</td><td class="num">${fmt(t.ditchConcrete)} m³</td></tr>
        <tr><td class="dim">护面墙混凝土</td><td class="num">${fmt(t.wallConcrete)} m³</td></tr>
        <tr><td class="dim">框架/锚杆钢筋</td><td class="num">${fmt(t.frameSteel)} t</td></tr>
      </table>
    </div>
    <div class="section">
      <h3>工程量清单（${rows.length} 项）</h3>
      <div style="max-height:340px;overflow:auto">
      <table>
        <thead><tr><th>名称</th><th class="num">数量</th><th>单位</th><th>部位</th></tr></thead>
        <tbody>${rows.map((r) => `<tr><td>${r.name}<div class="muted">${r.spec}</div></td>
          <td class="num">${r.qty}</td><td>${r.unit}</td><td>${r.location}</td></tr>`).join('')}</tbody>
      </table></div>
      <div class="muted" style="margin-top:8px">完整清单可点击右上角「导出工程量清单」生成 CSV。</div>
    </div>`;
}

function stat(k: string, v: number, unit: string): string {
  return `<div class="stat"><div class="k">${k}</div><div class="v">${fmt(v, v >= 100 ? 1 : 2)}<span class="u">${unit}</span></div></div>`;
}

// ---------------- 验收批次 ----------------
function renderAccept(body: HTMLElement) {
  const role = store.role;
  const { batches, config } = store.state;
  const canDeclare = role === 'crew' || role === 'designer';

  body.innerHTML = `
    <div class="section">
      <h3>申报验收批次（${role === 'supervisor' ? '监理视图' : '班组视图'}）</h3>
      ${canDeclare ? `<div class="row2">
        <label class="field"><span>分级坡</span><select id="bGrade">
          ${config.grades.map((g, i) => `<option value="${g.id}">第${i + 1}级坡</option>`).join('')}</select></label>
        <label class="field"><span>构件类型</span><select id="bType">
          ${(Object.keys(TYPE_NAME) as ComponentType[]).map((k) => `<option value="${k}">${TYPE_NAME[k]}</option>`).join('')}</select></label>
      </div>
      <label class="field"><span>施工班组</span><input id="bCrew" type="text" placeholder="如：边坡防护一班"></label>
      <button class="btn primary" id="declareBtn" style="width:100%">申报验收批次（计划工期 ${config.batchDueDays} 天）</button>`
      : '<div class="msg info">监理角色可逐批签认或退回；请切换到施工班组角色申报批次。</div>'}
    </div>
    <div class="section">
      <h3>批次列表（${batches.length}）</h3>
      ${batches.length === 0 ? '<div class="empty">暂无验收批次</div>' :
      [...batches].reverse().map((b) => batchCard(b)).join('')}
    </div>`;

  if (canDeclare) {
    body.querySelector('#declareBtn')?.addEventListener('click', () => {
      const gradeId = (body.querySelector('#bGrade') as HTMLSelectElement).value;
      const type = (body.querySelector('#bType') as HTMLSelectElement).value as ComponentType;
      const crew = (body.querySelector('#bCrew') as HTMLInputElement).value || '边坡防护一班';
      // 仅当该分级自身存在规则错误时拦截；全局（地质分层）错误只影响框架类
      const gradeError = store.engine.issues.some((i) => i.level === 'error' && i.gradeId === gradeId);
      const globalError = store.engine.issues.some((i) => i.level === 'error' && i.gradeId === null);
      if (gradeError || (globalError && type === 'frame')) {
        toast('该分级存在设计规则错误，整改通过后方可申报验收', 'error');
        return;
      }
      store.addBatch(declareBatch(store.state, gradeId, type, crew));
      toast('验收批次已申报，等待监理签认', 'ok');
    });
  }

  body.querySelectorAll<HTMLElement>('[data-batch]').forEach((card) => {
    const id = card.dataset.batch!;
    card.querySelector('[data-view]')?.addEventListener('click', () => openBatchDetail(id));
    card.querySelector('[data-approve]')?.addEventListener('click', () => openReview(id, true));
    card.querySelector('[data-reject]')?.addEventListener('click', () => openReview(id, false));
    card.querySelector('[data-resubmit]')?.addEventListener('click', () => {
      const b = store.state.batches.find((x) => x.id === id)!;
      store.updateBatch(id, resubmitBatch(b, store.state.config, store.state.components));
      toast('整改完成，批次已重新申报', 'ok');
    });
  });
}

function batchCard(b: AcceptanceBatch): string {
  const gi = store.state.config.grades.findIndex((g) => g.id === b.gradeId);
  const overdue = isOverdue(b);
  return `<div class="list-item" data-batch="${b.id}">
    <div class="head"><b>${b.code} · ${TYPE_NAME[b.componentType]}</b>
      ${overdue ? '<span class="tag overdue">超期</span>' : `<span class="tag ${b.status}">${statusLabel(b.status)}</span>`}</div>
    <div class="meta">第${gi + 1}级坡 · ${b.crew}<br>
      锚杆 ${b.snapshot.anchorCount} 根 · 混凝土 ${fmt(b.snapshot.concrete)}m³ · 钢筋 ${fmt(b.snapshot.steel)}t<br>
      申报 ${fmtDate(b.submittedAt)} · 应完成 ${fmtDate(b.dueAt)}
      ${b.status === 'rejected' ? `<br><span style="color:var(--err)">整改说明：${b.rectification || '—'}</span>` : ''}
    </div>
    <div class="inline" style="margin-top:6px;gap:6px;flex-wrap:wrap">
      <button class="btn sm" data-view>详情</button>
      ${b.status === 'submitted' && store.role === 'supervisor' ? `
        <button class="btn sm primary" data-approve>签认合格</button>
        <button class="btn sm danger" data-reject>退回整改</button>` : ''}
      ${b.status === 'rejected' && store.role !== 'supervisor' ?
        '<button class="btn sm primary" data-resubmit>整改后重新申报</button>' : ''}
    </div>
  </div>`;
}

function openBatchDetail(id: string) {
  const b = store.state.batches.find((x) => x.id === id)!;
  const gi = store.state.config.grades.findIndex((g) => g.id === b.gradeId);
  modal(`批次 ${b.code} 详情`, `
    <div class="kv">
      <div class="k">部位 / 类型</div><div>第${gi + 1}级坡 · ${TYPE_NAME[b.componentType]}</div>
      <div class="k">施工班组</div><div>${b.crew}</div>
      <div class="k">状态</div><div>${statusLabel(b.status)}${isOverdue(b) ? '（已超期）' : ''}</div>
      <div class="k">申报时间</div><div>${fmtDate(b.submittedAt)}</div>
      <div class="k">应完成时间</div><div>${fmtDate(b.dueAt)}</div>
      <div class="k">签认时间</div><div>${fmtDate(b.approvedAt)}</div>
      <div class="k">工程量快照</div><div>锚杆 ${b.snapshot.anchorCount} 根 / 混凝土 ${fmt(b.snapshot.concrete)} m³ / 钢筋 ${fmt(b.snapshot.steel)} t</div>
      <div class="k">监理意见</div><div>${b.reviewNote || '—'}</div>
      <div class="k">整改说明</div><div>${b.rectification || '—'}</div>
    </div>
    <div class="foot"><button class="btn primary" data-close>关闭</button></div>`,
  (root, close) => root.querySelector('[data-close]')!.addEventListener('click', close));
}

function openReview(id: string, approve: boolean) {
  const b = store.state.batches.find((x) => x.id === id)!;
  modal(approve ? `签认批次 ${b.code}` : `退回批次 ${b.code}`, `
    <label class="field"><span>监理意见</span><textarea id="rvNote" placeholder="签认意见 / 存在问题"></textarea></label>
    ${approve ? '' : '<label class="field"><span>整改说明（必填）</span><textarea id="rvRect" placeholder="明确整改内容、时限与复验要求"></textarea></label>'}
    <div class="foot">
      <button class="btn ghost" data-close>取消</button>
      <button class="btn ${approve ? 'primary' : 'danger'}" data-ok>${approve ? '确认签认' : '确认退回'}</button>
    </div>`,
  (root, close) => {
    root.querySelector('[data-close]')!.addEventListener('click', close);
    root.querySelector('[data-ok]')!.addEventListener('click', () => {
      const note = (root.querySelector('#rvNote') as HTMLTextAreaElement).value;
      if (approve) {
        store.updateBatch(id, approveBatch(b, note || '现场质量符合设计及规范要求，同意签认。'));
        toast(`批次 ${b.code} 已签认`, 'ok');
      } else {
        const rect = (root.querySelector('#rvRect') as HTMLTextAreaElement).value;
        if (!rect.trim()) { toast('退回必须填写整改说明', 'error'); return; }
        store.updateBatch(id, rejectBatch(b, note, rect));
        toast(`批次 ${b.code} 已退回整改`, 'warn');
      }
      close();
    });
  });
}

// ---------------- 看板 ----------------
function renderBoard(body: HTMLElement) {
  const s = dashboard(store.state);
  body.innerHTML = `
    <div class="section">
      <h3>批次总览</h3>
      <div class="stat-grid">
        ${stat('批次总数', s.totalBatches, '个')}
        ${stat('待签认', s.submitted, '个')}
        ${stat('已签认', s.approved, '个')}
        ${stat('退回整改', s.rejected, '个')}
      </div>
      ${s.overdue > 0 ? `<div class="msg error" style="margin-top:10px">⚠ 有 <b>${s.overdue}</b> 个待签认批次已超过计划工期，请监理及时处理。</div>`
        : '<div class="msg ok" style="margin-top:10px">当前无超期批次。</div>'}
    </div>
    <div class="section">
      <h3>各级坡完成比例</h3>
      ${s.progress.map((p) => `
        <div class="bar-row">
          <div class="lab"><span>${p.label}</span>
            <span class="dim">${p.approved}/${p.total} 批 · ${(p.ratio * 100).toFixed(0)}%
            ${p.rejected ? ` · <span style="color:var(--err)">退${p.rejected}</span>` : ''}</span></div>
          <div class="bar"><i style="width:${(p.ratio * 100).toFixed(1)}%"></i></div>
        </div>`).join('')}
    </div>
    <div class="section">
      <h3>超期批次清单</h3>
      ${store.state.batches.filter(isOverdue).length === 0 ? '<div class="empty">无超期批次</div>' :
      store.state.batches.filter(isOverdue).map((b) => {
        const gi = store.state.config.grades.findIndex((g) => g.id === b.gradeId);
        const days = Math.floor((Date.now() - new Date(b.dueAt!).getTime()) / 86400000);
        return `<div class="list-item" style="border-color:#7f3a3a">
          <div class="head"><b>${b.code}</b><span class="tag overdue">超期 ${days} 天</span></div>
          <div class="meta">第${gi + 1}级坡 · ${TYPE_NAME[b.componentType]} · ${b.crew}<br>应完成 ${fmtDate(b.dueAt)}</div>
        </div>`;
      }).join('')}
    </div>`;
}
