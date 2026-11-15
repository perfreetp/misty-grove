import { FINDING_META, FINDING_ORDER, MAX_SIZE_MM, SEGMENT_META } from '../constants';
import { FrameSource } from '../frames';
import { store } from '../store';
import type { Box, Exam, Finding, FindingType } from '../types';
import { clamp, formatFrameStamp, formatSize } from '../utils';
import { bindActions, html, icon, raw, setHtml, toast, type RawHtml } from '../ui';
import { segmentKeyAt } from './timeline';
import type { ViewInstance } from './types';

interface DragState {
  startX: number;
  startY: number;
  curX: number;
  curY: number;
  mode: 'draw' | 'move' | 'resize';
  handle: string | null;
  origin: Box | null;
}

export function createLesionsView(): ViewInstance {
  let root: HTMLElement | null = null;
  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;
  let source: FrameSource | null = null;
  let exam: Exam | null = null;
  let drag: DragState | null = null;
  let ro: ResizeObserver | null = null;
  let redrawPending = false;
  let frameRendered = -1;

  function currentExam(): Exam | undefined {
    return store.selectedExam();
  }

  function draft() {
    return store.state.findingDraft;
  }

  function activeFinding(): Finding | undefined {
    const e = currentExam();
    if (!e) return undefined;
    const id = store.state.activeFindingId;
    return id ? e.findings.find((f) => f.id === id) : undefined;
  }

  function isLocked(e: Exam): boolean {
    return !store.findingsEditable(e);
  }

  function syncFrame(): void {
    const e = currentExam();
    if (!e) return;
    const f = Math.min(store.state.reading.frame, e.source.frameCount - 1);
    if (f !== store.state.reading.frame) store.setReading({ frame: f });
  }

  function canvasSize(): { w: number; h: number; dpr: number } {
    if (!canvas) return { w: 1, h: 1, dpr: 1 };
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    return { w: canvas.width / dpr, h: canvas.height / dpr, dpr };
  }

  function resizeCanvas(): void {
    if (!canvas) return;
    const host = canvas.parentElement;
    if (!host) return;
    const rect = host.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = Math.max(200, Math.floor(rect.width));
    const h = Math.max(200, Math.floor(rect.height));
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    frameRendered = -1;
    requestRedraw();
  }

  function requestRedraw(): void {
    if (redrawPending) return;
    redrawPending = true;
    requestAnimationFrame(() => {
      redrawPending = false;
      void redraw();
    });
  }

  async function redraw(): Promise<void> {
    const e = currentExam();
    if (!e || !ctx || !canvas) return;
    if (!source || source['exam']?.id !== e.id) {
      source?.dispose();
      source = new FrameSource(e);
    }
    const { w, h, dpr } = canvasSize();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const frame = store.state.reading.frame;
    if (frame !== frameRendered) {
      await source.draw(ctx, w, h, frame);
      frameRendered = frame;
    } else {
      // redraw frame is cached; still needs repaint
      await source.draw(ctx, w, h, frame);
    }
    drawOverlays(w, h);
  }

  function drawOverlays(w: number, h: number): void {
    const e = currentExam();
    if (!e || !ctx) return;
    const frame = store.state.reading.frame;
    const activeId = store.state.activeFindingId;
    for (const f of e.findings) {
      const related = f.frameIndex === frame || f.keyframes.some((k) => k.frameIndex === frame);
      if (!related && f.id !== activeId) continue;
      const color = FINDING_META[f.type].color;
      const b = { x: f.box.x * w, y: f.box.y * h, w: f.box.w * w, h: f.box.h * h };
      const isActive = f.id === activeId || (draft()?.id === f.id);
      drawBox(b, color, isActive, labelFor(e, f));
    }
    const d = draft();
    if (d) {
      const color = FINDING_META[d.type].color;
      const b = { x: d.box.x * w, y: d.box.y * h, w: d.box.w * w, h: d.box.h * h };
      drawBox(b, color, true, `${FINDING_META[d.type].label} · ${d.sizeMm ? d.sizeMm + ' mm' : '未测量'}`);
      drawHandles(b, color);
    } else if (activeFinding()) {
      const af = activeFinding()!;
      const color = FINDING_META[af.type].color;
      const b = { x: af.box.x * w, y: af.box.y * h, w: af.box.w * w, h: af.box.h * h };
      drawHandles(b, color);
    }
    if (drag && drag.mode === 'draw') {
      const rect = normRect(drag.startX, drag.startY, drag.curX, drag.curY);
      const color = FINDING_META[draft()?.type ?? 'bleeding'].color;
      ctx.save();
      ctx.setLineDash([6, 4]);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.6;
      ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
      ctx.restore();
    }
  }

  function labelFor(e: Exam, f: Finding): string {
    const idx = e.findings.indexOf(f) + 1;
    return `#${idx} ${FINDING_META[f.type].label} · ${formatSize(f.sizeMm)}`;
  }

  function drawBox(b: { x: number; y: number; w: number; h: number }, color: string, active: boolean, label: string): void {
    if (!ctx) return;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = active ? 2.2 : 1.4;
    ctx.shadowColor = color;
    ctx.shadowBlur = active ? 10 : 4;
    const c = 12;
    const x0 = Math.round(b.x) + 0.5;
    const y0 = Math.round(b.y) + 0.5;
    const x1 = Math.round(b.x + b.w) - 0.5;
    const y1 = Math.round(b.y + b.h) - 0.5;
    ctx.beginPath();
    ctx.moveTo(x0, y0 + c);
    ctx.lineTo(x0, y0);
    ctx.lineTo(x0 + c, y0);
    ctx.moveTo(x1 - c, y0);
    ctx.lineTo(x1, y0);
    ctx.lineTo(x1, y0 + c);
    ctx.moveTo(x1, y1 - c);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x1 - c, y1);
    ctx.moveTo(x0 + c, y1);
    ctx.lineTo(x0, y1);
    ctx.lineTo(x0, y1 - c);
    ctx.stroke();
    if (active) {
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.5;
      ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
    }
    ctx.restore();
    ctx.save();
    ctx.font = '600 11px "Segoe UI", "Microsoft YaHei", sans-serif';
    const tw = ctx.measureText(label).width + 12;
    const ly = Math.max(2, b.y - 20);
    ctx.fillStyle = 'rgba(7,10,15,0.86)';
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    roundRect(ctx, b.x, ly, tw, 17, 5);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.fillText(label, b.x + 6, ly + 9);
    ctx.restore();
  }

  function drawHandles(b: { x: number; y: number; w: number; h: number }, color: string): void {
    if (!ctx) return;
    ctx.save();
    ctx.fillStyle = color;
    const pts = [
      [b.x, b.y],
      [b.x + b.w, b.y],
      [b.x, b.y + b.h],
      [b.x + b.w, b.y + b.h],
    ];
    for (const p of pts) {
      ctx.beginPath();
      ctx.arc(p[0]!, p[1]!, 3.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(7,10,15,0.9)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.restore();
  }

  function normRect(x0: number, y0: number, x1: number, y1: number): { x: number; y: number; w: number; h: number } {
    return { x: Math.min(x0, x1), y: Math.min(y0, y1), w: Math.abs(x1 - x0), h: Math.abs(y1 - y0) };
  }

  function hitHandle(b: Box, px: number, py: number): string | null {
    const { w, h } = canvasSize();
    const bx = b.x * w;
    const by = b.y * h;
    const bw = b.w * w;
    const bh = b.h * h;
    const pts: [string, number, number][] = [
      ['nw', bx, by],
      ['ne', bx + bw, by],
      ['sw', bx, by + bh],
      ['se', bx + bw, by + bh],
    ];
    for (const [name, x, y] of pts) {
      if (Math.abs(px - x) <= 9 && Math.abs(py - y) <= 9) return name;
    }
    return null;
  }

  function clientToLocal(ev: PointerEvent): { x: number; y: number } {
    const rect = canvas!.getBoundingClientRect();
    return { x: ev.clientX - rect.left, y: ev.clientY - rect.top };
  }

  function onPointerDown(ev: PointerEvent): void {
    const e = currentExam();
    if (!e || isLocked(e)) return;
    const d = draft();
    if (!d) {
      toast('请先点击「新增病灶」再在影像上框选区域', 'warn', 2600);
      return;
    }
    const { x, y } = clientToLocal(ev);
    const { w, h } = canvasSize();
    const handle = hitHandle(d.box, x, y);
    canvas!.setPointerCapture(ev.pointerId);
    if (handle) {
      drag = { startX: x, startY: y, curX: x, curY: y, mode: 'resize', handle, origin: { ...d.box } };
      return;
    }
    const inside = x >= d.box.x * w && x <= (d.box.x + d.box.w) * w && y >= d.box.y * h && y <= (d.box.y + d.box.h) * h;
    if (inside) {
      drag = { startX: x, startY: y, curX: x, curY: y, mode: 'move', handle: null, origin: { ...d.box } };
      return;
    }
    drag = { startX: x, startY: y, curX: x, curY: y, mode: 'draw', handle: null, origin: null };
    requestRedraw();
  }

  function onPointerMove(ev: PointerEvent): void {
    if (!drag || !canvas) return;
    const { x, y } = clientToLocal(ev);
    drag.curX = x;
    drag.curY = y;
    const { w, h } = canvasSize();
    if (drag.mode === 'draw') {
      requestRedraw();
      return;
    }
    const d = draft();
    if (!d || !drag.origin) return;
    const dx = (x - drag.startX) / w;
    const dy = (y - drag.startY) / h;
    let box: Box;
    if (drag.mode === 'move') {
      box = {
        x: clamp(drag.origin.x + dx, 0, 1 - drag.origin.w),
        y: clamp(drag.origin.y + dy, 0, 1 - drag.origin.h),
        w: drag.origin.w,
        h: drag.origin.h,
      };
    } else {
      const o = drag.origin;
      let x0 = o.x;
      let y0 = o.y;
      let x1 = o.x + o.w;
      let y1 = o.y + o.h;
      const hd = drag.handle ?? '';
      if (hd.includes('w')) x0 = clamp(o.x + dx, 0, x1 - 0.02);
      if (hd.includes('e')) x1 = clamp(o.x + o.w + dx, x0 + 0.02, 1);
      if (hd.includes('n')) y0 = clamp(o.y + dy, 0, y1 - 0.02);
      if (hd.includes('s')) y1 = clamp(o.y + o.h + dy, y0 + 0.02, 1);
      box = { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
    }
    store.updateDraft({ box });
    requestRedraw();
  }

  function onPointerUp(ev: PointerEvent): void {
    if (!drag) return;
    const { x, y } = clientToLocal(ev);
    const { w, h } = canvasSize();
    if (drag.mode === 'draw') {
      const rect = normRect(drag.startX, drag.startY, x, y);
      if (rect.w >= 12 && rect.h >= 12) {
        store.updateDraft({ box: { x: rect.x / w, y: rect.y / h, w: rect.w / w, h: rect.h / h } });
      }
    }
    drag = null;
    requestRedraw();
    renderInspector();
  }

  function renderShell(): void {
    if (!root) return;
    const e = currentExam();
    if (!e) {
      root.innerHTML = String(html`<div class="empty" style="height:100%">${icon('lesions')}
        <div class="empty-title">请从左侧选择一条检查单</div>
        <div class="empty-sub">在影像上按住拖动框选病灶，填写类型与大小，并绑定关键帧。</div></div>`);
      return;
    }
    syncFrame();
    const frame = store.state.reading.frame;
    const segKey = segmentKeyAt(e, frame);
    const locked = isLocked(e);
    const d = draft();
    root.innerHTML = String(html`
      <div class="lesions-view">
        <div class="lesion-main">
          <div class="lesion-toolbar">
            <div class="toolbar-left">
              <button class="btn ${d ? 'ghost' : 'primary'}" data-act="new-finding" ${locked ? raw('disabled') : ''}>${icon('plus')}新增病灶</button>
              <div class="frame-nav">
                <button class="btn ghost icon sm" data-step="-1" title="上一帧 (←)">${icon('stepBack')}</button>
                <input class="input mono" id="lesionFrameInput" type="number" min="1" max="${e.source.frameCount}" value="${frame + 1}" aria-label="定位帧" />
                <span class="hint mono">/ ${e.source.frameCount}</span>
                <button class="btn ghost icon sm" data-step="1" title="下一帧 (→)">${icon('stepFwd')}</button>
              </div>
              <span class="tag">${SEGMENT_META[segKey].name} · ${formatFrameStamp(frame, e.fps)}</span>
            </div>
            <div class="toolbar-right">
              <span class="tag">${e.findings.length} 处病灶</span>
              ${locked ? html`<span class="tag warn">${icon('clock')}${e.status === 'review' ? '待审核锁定' : '已发布锁定'}</span>` : ''}
            </div>
          </div>
          <div class="lesion-canvas-host" id="lesionCanvasHost">
            <canvas id="lesionCanvas"></canvas>
            ${d ? html`<div class="canvas-hint">${icon('box')}在影像上拖动框选病灶区域；拖动方框四角可调整大小</div>` : html`<div class="canvas-hint muted">${icon('eye')}点击「新增病灶」后可在影像上框选</div>`}
          </div>
          <div class="lesion-filmstrip" id="filmstrip">${raw(filmstripHtml(e))}</div>
        </div>
        <div class="lesion-side" id="lesionSide">${inspectorHtml(e)}</div>
      </div>
    `);
    const frameInput = root.querySelector<HTMLInputElement>('#lesionFrameInput');
    frameInput?.addEventListener('change', () => {
      const v = Number(frameInput.value);
      if (Number.isFinite(v)) seekFrame(v - 1);
    });
    frameInput?.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') {
        ev.preventDefault();
        const v = Number(frameInput.value);
        if (Number.isFinite(v)) seekFrame(v - 1);
      }
    });
    root.querySelectorAll<HTMLElement>('[data-step]').forEach((btn) => {
      btn.addEventListener('click', () => seekFrame(store.state.reading.frame + Number(btn.dataset.step ?? 0)));
    });
    canvas = root.querySelector<HTMLCanvasElement>('#lesionCanvas');
    ctx = canvas?.getContext('2d') ?? null;
    if (canvas) {
      bindCanvasEvents();
      resizeCanvas();
      ro?.disconnect();
      ro = new ResizeObserver(() => resizeCanvas());
      const host = root.querySelector<HTMLElement>('#lesionCanvasHost');
      if (host) ro.observe(host);
    }
    attachFilmstrip();
  }

  function filmstripHtml(e: Exam): string {
    const frame = store.state.reading.frame;
    const keyframes = e.findings.flatMap((f) => f.keyframes.map((k) => ({ f, k })));
    const seen = new Set<number>();
    const unique: { frame: number; color: string; label: string }[] = [];
    for (const { f, k } of keyframes) {
      if (seen.has(k.frameIndex)) continue;
      seen.add(k.frameIndex);
      unique.push({ frame: k.frameIndex, color: FINDING_META[f.type].color, label: `${FINDING_META[f.type].label} · ${k.segmentName}` });
    }
    for (const f of e.findings) {
      if (seen.has(f.frameIndex)) continue;
      seen.add(f.frameIndex);
      unique.push({ frame: f.frameIndex, color: FINDING_META[f.type].color, label: `${FINDING_META[f.type].label} · 病灶帧` });
    }
    unique.sort((a, b) => a.frame - b.frame);
    if (unique.length === 0) {
      return String(html`<div class="strip-empty">暂无标记帧。绑定关键帧后，时间点会出现在这里。</div>`);
    }
    return String(html`${unique.map(
      (u) => html`<button class="strip-item ${u.frame === frame ? 'active' : ''}" data-strip="${u.frame}" title="${u.label}">
        <span class="strip-dot" style="background:${u.color}"></span>
        <span class="strip-frame mono">F${u.frame + 1}</span>
        <span class="strip-time mono">${clockShort(u.frame / e.fps)}</span>
      </button>`,
    )}`);
  }

  function attachFilmstrip(): void {
    const strip = root?.querySelector<HTMLElement>('#filmstrip');
    if (!strip) return;
    strip.addEventListener('click', (ev) => {
      const btn = (ev.target as HTMLElement).closest<HTMLElement>('[data-strip]');
      if (!btn?.dataset.strip) return;
      seekFrame(Number(btn.dataset.strip));
    });
  }

  function seekFrame(frame: number): void {
    const e = currentExam();
    if (!e) return;
    store.setReading({ frame: clamp(frame, 0, e.source.frameCount - 1) });
    frameRendered = -1;
    if (draft()) {
      // Keep the in-progress box; only refresh the frame readouts around it.
      store.updateDraft({ frameIndex: store.state.reading.frame });
      refreshChromeOnly();
      requestRedraw();
      return;
    }
    renderShell();
  }

  function refreshChromeOnly(): void {
    const e = currentExam();
    if (!e || !root) return;
    const frame = store.state.reading.frame;
    const segKey = segmentKeyAt(e, frame);
    const tag = root.querySelector('.toolbar-left .tag:last-of-type');
    if (tag) tag.textContent = `${SEGMENT_META[segKey].name} · ${formatFrameStamp(frame, e.fps)}`;
    const input = root.querySelector<HTMLInputElement>('#lesionFrameInput');
    if (input && document.activeElement !== input) input.value = String(frame + 1);
    const strip = root.querySelector<HTMLElement>('#filmstrip');
    if (strip) {
      setHtml(strip, filmstripHtml(e));
      attachFilmstrip();
    }
  }

  function stepFrame(delta: number): void {
    const e = currentExam();
    if (!e) return;
    seekFrame(store.state.reading.frame + delta);
  }

  function inspectorHtml(e: Exam): RawHtml {
    const d = draft();
    const active = activeFinding();
    if (d) return draftFormHtml(e, d);
    if (active) return findingDetailHtml(e, active);
    return findingsListHtml(e);
  }

  function draftFormHtml(e: Exam, d: NonNullable<ReturnType<typeof draft>>): RawHtml {
    const segKey = segmentKeyAt(e, d.frameIndex);
    const sizeInvalid = d.sizeMm === null;
    const relatedKeyframes = d.id ? e.findings.find((f) => f.id === d.id)?.keyframes ?? [] : [];
    return html`
      <div class="side-panel-inner">
        <div class="side-head">
          <span class="panel-title"><span class="accent-bar"></span>${d.id ? '编辑病灶' : '新增病灶'}</span>
          <button class="btn ghost icon" data-act="cancel-finding" aria-label="取消">${icon('x')}</button>
        </div>
        <div class="form-block">
          <div class="field">
            <span class="field-label">病灶类型<span class="req">*</span></span>
            <div class="type-grid">
              ${FINDING_ORDER.map(
                (t) => html`<button class="type-btn ${d.type === t ? 'active' : ''}" data-type="${t}" style="--type-color:${FINDING_META[t].color};--type-soft:${FINDING_META[t].soft}">
                  <span class="type-dot" style="background:${FINDING_META[t].color}"></span>
                  <span class="type-label">${FINDING_META[t].label}</span>
                  <span class="type-desc">${FINDING_META[t].description}</span>
                </button>`,
              )}
            </div>
          </div>
          <div class="field">
            <span class="field-label">估计大小（mm）<span class="req">*</span></span>
            <div class="size-row">
              <input class="input mono ${sizeInvalid ? 'invalid' : ''}" id="sizeInput" type="number" min="0.5" max="${MAX_SIZE_MM}" step="0.5" value="${d.sizeMm ?? ''}" placeholder="必填" data-role="size" />
              <span class="hint">mm</span>
              <div class="size-quick">
                ${[3, 5, 8, 12, 20].map((s) => html`<button class="chip sm" data-size="${s}">${s}</button>`)}
              </div>
            </div>
            ${sizeInvalid ? html`<span class="err-text">${icon('alert')}估计大小不能为空，否则无法保存病灶</span>` : ''}
          </div>
          <div class="kv-grid">
            <div class="kv"><span class="k">时间点</span><span class="v mono">F${d.frameIndex + 1} · ${clockShort(d.frameIndex / e.fps)}</span></div>
            <div class="kv"><span class="k">肠段</span><span class="v" style="color:${SEGMENT_META[segKey].text}">${SEGMENT_META[segKey].name}</span></div>
            <div class="kv"><span class="k">框选区域</span><span class="v mono">${(d.box.w * 100).toFixed(0)}% × ${(d.box.h * 100).toFixed(0)}%</span></div>
          </div>
          <div class="field">
            <span class="field-label">描述（可选）</span>
            <textarea class="textarea" id="noteInput" rows="2" placeholder="例如：回肠末段纵行溃疡，覆白苔" data-role="note">${d.note}</textarea>
          </div>
          ${d.id
            ? html`<div class="kf-block">
                <span class="field-label">已绑定关键帧（${relatedKeyframes.length}）</span>
                <div class="kf-list">
                  ${relatedKeyframes.length === 0
                    ? html`<div class="hint">尚无关键帧。切到目标帧后点击下方按钮绑定。</div>`
                    : relatedKeyframes.map(
                        (k) => html`<div class="kf-chip">
                          <span class="mono">F${k.frameIndex + 1}</span>
                          <span class="hint">${k.segmentName}</span>
                          <button class="btn ghost icon sm" data-del-kf="${k.id}" title="解除绑定">${icon('x')}</button>
                        </div>`,
                      )}
                </div>
              </div>`
            : html`<div class="notice info">${icon('info')}<div>保存后请在检查单列表切换到关键帧时间点并绑定关键帧；无关键帧的病灶无法提交审核。</div></div>`}
        </div>
        <div class="side-foot">
          <button class="btn" data-act="cancel-finding">取消</button>
          <button class="btn primary" data-act="save-finding">${icon('save')}保存病灶</button>
        </div>
      </div>
    `;
  }

  function findingDetailHtml(e: Exam, f: Finding): RawHtml {
    const idx = e.findings.indexOf(f) + 1;
    const locked = isLocked(e);
    const seg = segmentKeyAt(e, f.frameIndex);
    return html`
      <div class="side-panel-inner">
        <div class="side-head">
          <span class="panel-title"><span class="accent-bar"></span>病灶 #${idx}</span>
          <span class="type-pill" style="--type-color:${FINDING_META[f.type].color};--type-soft:${FINDING_META[f.type].soft}">
            <span class="legend-dot" style="background:${FINDING_META[f.type].color}"></span>${FINDING_META[f.type].label}
          </span>
        </div>
        <div class="kv-grid">
          <div class="kv"><span class="k">估计大小</span><span class="v mono ${f.sizeMm === null ? 'err-text' : ''}">${formatSize(f.sizeMm)}</span></div>
          <div class="kv"><span class="k">位置</span><span class="v">${SEGMENT_META[seg].name} · F${f.frameIndex + 1}</span></div>
          <div class="kv"><span class="k">时间点</span><span class="v mono">${clockShort(f.frameIndex / e.fps)}</span></div>
          <div class="kv"><span class="k">登记人</span><span class="v">${f.authorName}</span></div>
        </div>
        ${f.note ? html`<div class="note-block">${f.note}</div>` : ''}
        <div class="kf-block">
          <div class="kf-head">
            <span class="field-label">关键帧（${f.keyframes.length}）</span>
            <button class="btn sm" data-act="capture-keyframe" ${locked ? raw('disabled') : ''}>${icon('camera')}绑定当前帧</button>
          </div>
          <div class="kf-strip">
            ${f.keyframes.length === 0
              ? html`<div class="notice warn">${icon('alert')}<div>该病灶尚无关键帧绑定，提交审核时会被拦截。</div></div>`
              : f.keyframes.map(
                  (k) => html`<div class="kf-item ${k.frameIndex === store.state.reading.frame ? 'active' : ''}">
                    <button class="kf-thumb" data-jump="${k.frameIndex}" title="跳转到该帧">
                      <span class="kf-frame mono">F${k.frameIndex + 1}</span>
                      <span class="kf-time mono">${clockShort(k.frameIndex / e.fps)}</span>
                      <span class="kf-seg">${k.segmentName}</span>
                    </button>
                    ${locked ? '' : html`<button class="btn ghost icon sm kf-del" data-del-kf="${k.id}" title="解除绑定">${icon('trash')}</button>`}
                  </div>`,
                )}
          </div>
        </div>
        <div class="side-foot">
          <button class="btn danger sm" data-act="delete-finding" ${locked ? raw('disabled') : ''}>${icon('trash')}删除</button>
          <span class="spacer"></span>
          <button class="btn" data-act="back-list">返回列表</button>
          <button class="btn primary" data-act="edit-finding" ${locked ? raw('disabled') : ''}>${icon('edit')}编辑</button>
        </div>
      </div>
    `;
  }

  function findingsListHtml(e: Exam): RawHtml {
    const locked = isLocked(e);
    return html`
      <div class="side-panel-inner">
        <div class="side-head">
          <span class="panel-title"><span class="accent-bar"></span>病灶列表</span>
          <span class="tag">${e.findings.length} 处</span>
        </div>
        ${e.findings.length === 0
          ? html`<div class="empty" style="padding:28px 10px">${icon('lesions')}
              <div class="empty-title">尚未登记病灶</div>
              <div class="empty-sub">点击「新增病灶」，在影像上框选异常区域。</div></div>`
          : html`<div class="finding-list">
              ${e.findings.map((f, i) => {
                const seg = segmentKeyAt(e, f.frameIndex);
                const issues: string[] = [];
                if (f.sizeMm === null) issues.push('大小为空');
                if (f.keyframes.length === 0) issues.push('缺关键帧');
                return html`<button class="finding-card" data-open-finding="${f.id}">
                  <span class="finding-card-bar" style="background:${FINDING_META[f.type].color}"></span>
                  <span class="finding-card-main">
                    <span class="finding-card-top">
                      <span class="finding-card-title">#${i + 1} ${FINDING_META[f.type].label}</span>
                      <span class="mono hint">${formatSize(f.sizeMm)}</span>
                    </span>
                    <span class="finding-card-meta">
                      <span>${SEGMENT_META[seg].name} · F${f.frameIndex + 1}</span>
                      <span class="tag">${f.keyframes.length} 关键帧</span>
                    </span>
                    ${issues.length
                      ? html`<span class="finding-card-issues">${issues.map((x) => html`<span class="badge-err">${x}</span>`)}</span>`
                      : html`<span class="finding-card-issues"><span class="badge-ok">${icon('check')}可提交</span></span>`}
                  </span>
                </button>`;
              })}
            </div>`}
        <div class="side-foot">
          <span class="hint">${locked ? '报告已锁定，仅可查看' : '提示：每个病灶都需要至少一张关键帧与估计大小'}</span>
          <button class="btn primary" data-act="new-finding" ${locked ? raw('disabled') : ''}>${icon('plus')}新增病灶</button>
        </div>
      </div>
    `;
  }

  function renderInspector(): void {
    const side = root?.querySelector<HTMLElement>('#lesionSide');
    const e = currentExam();
    if (!side || !e) return;
    const active = document.activeElement;
    const isTyping = active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement;
    if (isTyping) return;
    setHtml(side, inspectorHtml(e));
    bindInspectorInputs();
  }

  function bindInspectorInputs(): void {
    const sizeInput = root?.querySelector<HTMLInputElement>('#sizeInput');
    if (sizeInput) {
      sizeInput.addEventListener('input', () => {
        const rawVal = sizeInput.value.trim();
        const v = rawVal === '' ? null : Number(rawVal);
        store.updateDraft({ sizeMm: v !== null && Number.isFinite(v) ? v : null });
        sizeInput.classList.toggle('invalid', v === null || !Number.isFinite(v) || v <= 0);
      });
      sizeInput.addEventListener('change', () => {
        const v = Number(sizeInput.value);
        if (Number.isFinite(v) && v > 0) store.updateDraft({ sizeMm: v });
      });
    }
    const noteInput = root?.querySelector<HTMLTextAreaElement>('#noteInput');
    if (noteInput) {
      noteInput.addEventListener('input', () => store.updateDraft({ note: noteInput.value }));
    }
  }

  async function saveDraft(): Promise<void> {
    const e = currentExam();
    const d = draft();
    if (!e || !d) return;
    const sizeInput = root?.querySelector<HTMLInputElement>('#sizeInput');
    let size = d.sizeMm;
    if (sizeInput && sizeInput.value.trim() !== '') {
      const v = Number(sizeInput.value);
      if (Number.isFinite(v)) size = v;
    }
    if (size === null || Number.isNaN(size) || size <= 0) {
      toast('请填写估计大小（mm）后再保存病灶', 'err');
      sizeInput?.focus();
      return;
    }
    const res = await store.saveFinding(store.examById(e.id) ?? e, { ...d, sizeMm: size });
    if (!res.ok) {
      toast(res.error ?? '保存失败', 'err');
      return;
    }
    toast(d.id ? '病灶已更新' : '病灶已登记，请切换到关键帧时间点绑定关键帧', 'ok', 3200);
    const fresh = store.examById(e.id);
    if (fresh) store.setState({ selectedExamId: fresh.id });
    renderShell();
  }

  const handlers: Record<string, (target: HTMLElement) => void> = {
    'new-finding': () => {
      const e = currentExam();
      if (!e) return;
      if (isLocked(e)) {
        toast('报告已锁定，无法新增病灶', 'err');
        return;
      }
      store.startFinding(store.state.reading.frame);
      renderShell();
    },
    'cancel-finding': () => {
      store.cancelFinding();
      renderShell();
    },
    'save-finding': () => {
      void saveDraft();
    },
    'capture-keyframe': () => {
      const e = currentExam();
      const f = activeFinding();
      if (!e || !f) return;
      void store.captureKeyframe(store.examById(e.id) ?? e, f.id).then((res) => {
        if (!res.ok) {
          toast(res.error ?? '绑定失败', res.duplicate ? 'warn' : 'err');
          return;
        }
        toast(`关键帧已绑定到 F${store.state.reading.frame + 1} · ${SEGMENT_META[segmentKeyAt(e, store.state.reading.frame)].name}`, 'ok');
        renderShell();
      });
    },
    'delete-finding': () => {
      const e = currentExam();
      const f = activeFinding();
      if (!e || !f) return;
      void store.deleteFinding(store.examById(e.id) ?? e, f.id).then(() => {
        toast('病灶已删除', 'ok');
        renderShell();
      });
    },
    'edit-finding': () => {
      const f = activeFinding();
      if (!f) return;
      store.editFinding(f);
      renderShell();
    },
    'back-list': () => {
      store.cancelFinding();
      store.setState({ activeFindingId: null });
      renderShell();
    },
  };

  function bindCanvasEvents(): void {
    if (!canvas) return;
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);
    canvas.addEventListener('pointerleave', () => {
      if (!drag) return;
    });
  }

  function onClick(ev: Event): void {
    const el = ev.target as HTMLElement;
    const typeBtn = el.closest<HTMLElement>('[data-type]');
    if (typeBtn?.dataset.type) {
      store.updateDraft({ type: typeBtn.dataset.type as FindingType });
      renderShell();
      return;
    }
    const sizeBtn = el.closest<HTMLElement>('[data-size]');
    if (sizeBtn?.dataset.size) {
      store.updateDraft({ sizeMm: Number(sizeBtn.dataset.size) });
      renderShell();
      return;
    }
    const delKf = el.closest<HTMLElement>('[data-del-kf]');
    if (delKf?.dataset.delKf) {
      const e = currentExam();
      const f = activeFinding();
      if (!e || !f) return;
      void store.removeKeyframe(store.examById(e.id) ?? e, f.id, delKf.dataset.delKf).then(() => {
        toast('关键帧已解除绑定', 'ok', 2000);
        renderShell();
      });
      return;
    }
    const jump = el.closest<HTMLElement>('[data-jump]');
    if (jump?.dataset.jump) {
      seekFrame(Number(jump.dataset.jump));
      return;
    }
    const openFinding = el.closest<HTMLElement>('[data-open-finding]');
    if (openFinding?.dataset.openFinding) {
      store.setState({ activeFindingId: openFinding.dataset.openFinding });
      const e = currentExam();
      const f = e?.findings.find((x) => x.id === openFinding.dataset.openFinding);
      if (f) seekFrame(f.frameIndex);
      return;
    }
  }

  function onChange(ev: Event): void {
    const el = ev.target as HTMLInputElement;
    if (el.id === 'lesionFrameInput') {
      const v = Number(el.value);
      if (Number.isFinite(v)) seekFrame(v - 1);
    }
  }

  function onKeyDown(ev: KeyboardEvent): void {
    const active = document.activeElement;
    if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) return;
    if (ev.key === 'ArrowLeft') {
      ev.preventDefault();
      stepFrame(ev.shiftKey ? -10 : -1);
    } else if (ev.key === 'ArrowRight') {
      ev.preventDefault();
      stepFrame(ev.shiftKey ? 10 : 1);
    }
  }

  return {
    mount(el: HTMLElement) {
      root = el;
      exam = currentExam() ?? null;
      if (!exam) {
        renderShell();
        bindActions(el, handlers);
        el.addEventListener('click', onClick);
        el.addEventListener('change', onChange);
        return;
      }
      syncFrame();
      renderShell();
      bindActions(el, handlers);
      el.addEventListener('click', onClick);
      el.addEventListener('change', onChange);
      el.addEventListener('keydown', onKeyDown);
    },
    update() {
      const e = currentExam();
      if (!e) {
        exam = null;
        renderShell();
        return;
      }
      exam = e;
      syncFrame();
      if (!draft() && !activeFinding()) {
        // refresh list only when ids/counts change
        const side = root?.querySelector<HTMLElement>('#lesionSide');
        if (side && !side.querySelector('.finding-list') && !side.querySelector('.form-block')) {
          renderInspector();
        } else if (side && side.querySelector('.finding-list')) {
          renderInspector();
        }
      }
      frameRendered = -1;
      requestRedraw();
      const strip = root?.querySelector<HTMLElement>('#filmstrip');
      if (strip) setHtml(strip, filmstripHtml(e));
      attachFilmstrip();
      const side = root?.querySelector<HTMLElement>('#lesionSide');
      if (side && !draft() && activeFinding()) setHtml(side, inspectorHtml(e));
      bindInspectorInputs();
    },
    destroy() {
      ro?.disconnect();
      ro = null;
      source?.dispose();
      source = null;
      root?.removeEventListener('click', onClick);
      root?.removeEventListener('change', onChange);
      root?.removeEventListener('keydown', onKeyDown);
      root = null;
    },
  };
}

function clockShort(seconds: number): string {
  const s = Math.max(0, Math.round(seconds));
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

