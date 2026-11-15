/* BoardDocs Studio — 预览播放器（分步播放 / 自由查看） */
import { U } from './util.js';
import { BoardRenderer, groupColor } from './gl.js';
import { GROUP_MAP, GROUPS, pinConflicts } from './store.js';

const Y_UP = 2.9;
const Y_DOWN = -2.9;

/** 计算某一步时的图层位移/透明度 */
export function stepOffsets(content, idx) {
  const out = {};
  const steps = content.steps || [];
  for (const l of content.layers || []) {
    let first = steps.findIndex((s) => (s.layerIds || []).includes(l.id));
    if (first < 0) {
      out[l.id] = { y: 0, alpha: 1 };
      continue;
    }
    const action = steps[first].action;
    if (idx < first) {
      out[l.id] = action === 'install' ? { y: Y_DOWN, alpha: 0 } : { y: 0, alpha: 1 };
    } else if (idx === first) {
      out[l.id] = action === 'install' ? { y: 0.95, alpha: 0.98 } : { y: Y_UP, alpha: 0.3 };
    } else {
      out[l.id] = action === 'install' ? { y: 0, alpha: 1 } : { y: Y_UP, alpha: 0.14 };
    }
  }
  return out;
}

export function createPreview(opts) {
  const { board, content, readOnly } = opts;
  const steps = content.steps || [];
  let step = 0;
  let mode = steps.length ? 'steps' : 'free';
  let playing = false;
  let timer = null;
  let stopLoop = null;
  let selectedPinId = null;
  const groups = new Set();

  const canvas = U.h('canvas');
  const tooltip = U.h('div', { class: 'pin-tooltip' });
  const stackInfo = U.h('div', { class: 'vp-stack' });
  const playBar = U.h('div', { class: 'play-bar' });
  const legend = U.h('div', { class: 'pv-legend' });

  const modeBtns = U.h(
    'div',
    { class: 'pv-mode' },
    U.h('button', { class: mode === 'steps' ? 'on' : '', onclick: () => setMode('steps'), disabled: !steps.length, title: steps.length ? '' : '没有装配步骤' }, '分步播放'),
    U.h('button', { class: mode === 'free' ? 'on' : '', onclick: () => setMode('free') }, '自由查看')
  );

  const toolbar = U.h(
    'div',
    { class: 'vp-toolbar' },
    modeBtns,
    U.h('button', { onclick: () => renderer.resetView(), title: '重置视角' }, '重置视角'),
    U.h('button', { onclick: () => renderer.target.pitch = 1.35, title: '俯视' }, '俯视'),
    U.h('button', { onclick: () => renderer.target.pitch = 0.12, title: '平视' }, '平视')
  );

  const viewport = U.h('div', { class: 'viewport' }, canvas, toolbar, tooltip, stackInfo, playBar, legend);
  const strip = U.h('div', { class: 'pv-strip' });
  const root = U.h('div', { class: 'preview' }, viewport, strip);
  if (!steps.length) strip.hidden = true;

  const renderer = new BoardRenderer(canvas);
  if (!renderer.ok) {
    viewport.appendChild(U.h('div', { class: 'empty', style: { position: 'absolute', inset: '20%' } }, U.h('b', {}, '当前浏览器不支持 WebGL2'), '无法在场景中预览模型，请使用最新版 Chrome / Edge / Firefox。'));
  }

  renderer.setContent(board, content, {
    visible: null,
    highlightGroups: groups,
    conflictPins: new Set(),
    selectedPinId: null,
    stepLayerIds: new Set(),
  });

  renderer.onHoverCanvas = (mx, my) => {
    if (!renderer.ok) return;
    const p = mx < 0 ? null : renderer.pickPin(mx, my);
    renderer.setState({ hoverPinId: p ? p.id : null });
    canvas.style.cursor = p ? 'pointer' : 'default';
    if (!p) {
      tooltip.style.display = 'none';
      return;
    }
    const conflicts = pinConflicts(p);
    tooltip.innerHTML =
      `<b>${U.esc(p.name || '未命名')}</b> <span class="muted">${U.esc(GROUP_MAP[p.group]?.label || '未分组')}</span>` +
      `<span class="fn">电压 ${p.voltage ? U.esc(p.voltage) : '<span style="color:var(--red)">未标注</span>'}</span>` +
      `<span class="fn">${(p.funcs || []).map((f) => U.esc(f.label)).filter(Boolean).join(' · ') || '<span class="muted">无复用功能</span>'}</span>` +
      (conflicts.length ? `<span class="warnline">⚠ 功能重复：${conflicts.map((c) => U.esc(c.name)).join('、')}</span>` : '');
    tooltip.style.display = 'block';
    const r = viewport.getBoundingClientRect();
    let x = mx + 16, y = my + 14;
    const tw = tooltip.offsetWidth, th = tooltip.offsetHeight;
    if (x + tw > r.width - 8) x = mx - tw - 12;
    if (y + th > r.height - 8) y = my - th - 12;
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
  };
  renderer.onClickCanvas = (mx, my) => {
    if (!renderer.ok) return;
    const p = renderer.pickPin(mx, my);
    if (p) {
      selectedPinId = p.id;
      renderer.setState({ selectedPinId });
      renderer.focusPin(p);
      showPinPanel(p);
    }
  };

  /* ---------- pin info card (preview) ---------- */
  let pinPanel = null;
  function showPinPanel(p) {
    if (pinPanel) pinPanel.remove();
    const conflicts = pinConflicts(p);
    const annotated = !!(p.name && p.voltage && (p.funcs || []).some((f) => f.label));
    pinPanel = U.h(
      'div',
      { class: 'pv-pinpanel' },
      U.h('div', { class: 'pp-head' },
        U.h('b', {}, p.name || '未命名引脚'),
        U.h('span', { class: 'tag ' + (annotated ? 'green' : 'amber') }, annotated ? '已标注' : '待完善'),
        U.h('button', { class: 'icon-btn', onclick: () => { pinPanel.remove(); pinPanel = null; renderer.setState({ selectedPinId: null }); } }, '✕')
      ),
      U.h('div', { class: 'pp-grid' },
        kv('电压', p.voltage || '未标注', !p.voltage),
        kv('分组', GROUP_MAP[p.group]?.label || '未分组'),
        kv('所在图层', (content.layers.find((l) => l.id === p.layerId) || {}).name || '—')
      ),
      U.h('div', { class: 'pp-funcs' },
        U.h('span', { class: 'muted', style: { fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '.5px' } }, '复用功能'),
        U.h('div', { class: 'pill-row', style: { marginTop: '5px' } },
          (p.funcs || []).filter((f) => f.label).map((f) => U.h('span', { class: 'tag ' + (conflicts.some((c) => c.name === f.label) ? 'red' : '') }, f.label)),
          !(p.funcs || []).some((f) => f.label) ? U.h('span', { class: 'muted' }, '无') : null
        )
      ),
      conflicts.length ? U.h('div', { class: 'pp-warn' }, '⚠ 功能重复占用：' + conflicts.map((c) => c.name).join('、')) : null,
      p.note ? U.h('div', { class: 'hint', style: { marginTop: '8px' } }, '备注：' + p.note) : null
    );
    viewport.appendChild(pinPanel);
  }
  const kv = (k, v, bad) => U.h('div', { class: 'kv' }, U.h('span', {}, k), U.h('b', { style: bad ? { color: 'var(--red)' } : null }, v));

  /* ---------- legend ---------- */
  GROUPS.forEach((g) => {
    const b = U.h(
      'button',
      {
        class: 'pin-group',
        style: { color: g.color },
        onclick: () => {
          if (groups.has(g.id)) groups.delete(g.id);
          else groups.add(g.id);
          render();
        },
      },
      U.h('span', { class: 'dotc' }), g.label
    );
    b.dataset.group = g.id;
    legend.appendChild(b);
  });
  legend.appendChild(U.h('span', { class: 'pv-legend-hint' }, '点击分组高亮热点'));

  /* ---------- playback ---------- */
  function setMode(m) {
    if (m === 'steps' && !steps.length) return;
    mode = m;
    playing = false;
    stopTimer();
    modeBtns.querySelectorAll('button')[0].classList.toggle('on', mode === 'steps');
    modeBtns.querySelectorAll('button')[1].classList.toggle('on', mode === 'free');
    applyState(true);
    renderStrip();
    render();
  }
  function stopTimer() {
    if (timer) clearInterval(timer);
    timer = null;
  }
  function applyState(instant) {
    if (mode === 'steps' && steps.length) {
      const offs = stepOffsets(content, step);
      for (const k of Object.keys(offs)) offs[k].instant = !!instant;
      renderer.applyStepLayout(offs, null);
      const cur = steps[step];
      renderer.setState({ stepLayerIds: new Set(cur.layerIds || []) });
    } else {
      const offs = {};
      (content.layers || []).forEach((l) => (offs[l.id] = { y: 0, alpha: 1, instant: !!instant }));
      renderer.applyStepLayout(offs, null);
      renderer.setState({ stepLayerIds: new Set() });
    }
  }
  function goto(i, opts) {
    step = Math.max(0, Math.min(steps.length - 1, i));
    applyState(!!opts?.instant);
    renderStrip();
    render();
  }
  function next() {
    if (step < steps.length - 1) goto(step + 1);
    else {
      playing = false;
      stopTimer();
      render();
    }
  }
  function togglePlay() {
    if (!steps.length) return;
    playing = !playing;
    if (playing) {
      if (step >= steps.length - 1) goto(0, { instant: true });
      timer = setInterval(next, 2600);
    } else stopTimer();
    render();
  }

  function renderStrip() {
    if (!steps.length) return;
    U.clear(strip);
    steps.forEach((st, i) => {
      const active = mode === 'steps' && i === step;
      strip.appendChild(
        U.h(
          'div',
          { class: 'pv-thumb' + (active ? ' on' : '') + (i < step ? ' done' : ''), onclick: () => { setMode('steps'); goto(i); } },
          U.h('div', { class: 'n' }, `${String(i + 1).padStart(2, '0')} · ${st.action === 'install' ? '安装' : '拆卸'}`),
          U.h('div', { class: 't' }, st.title || '(未命名)'),
          U.h('div', { class: 'muted', style: { fontSize: '10px', marginTop: 'auto' } }, layerNames(st).join(' + ') || '未指定零件')
        )
      );
    });
    const on = strip.querySelector('.pv-thumb.on');
    if (on) on.scrollIntoView({ inline: 'nearest', block: 'nearest' });
  }
  function layerNames(st) {
    return (st.layerIds || []).map((id) => (content.layers.find((l) => l.id === id) || {}).name || '?');
  }

  function render() {
    // play bar
    U.clear(playBar);
    if (mode === 'steps' && steps.length) {
      const st = steps[step];
      playBar.appendChild(U.h('button', { class: 'icon-btn', onclick: () => goto(step - 1), title: '上一步' }, '◀'));
      playBar.appendChild(U.h('button', { class: 'icon-btn', onclick: togglePlay, title: playing ? '暂停' : '播放' }, playing ? '❚❚' : '▶'));
      playBar.appendChild(U.h('button', { class: 'icon-btn', onclick: () => goto(step + 1), title: '下一步' }, '▶'));
      playBar.appendChild(U.h('span', { class: 'pc' }, `${step + 1}/${steps.length}`));
      playBar.appendChild(
        U.h('div', { class: 'prog' },
          U.h('div', { class: 'txt' }, `${st.action === 'install' ? '安装' : '拆卸'} · ${st.title || '(未命名步骤)'}`),
          U.h('div', { class: 'txt muted', style: { fontSize: '10.5px' } }, st.note || '')
        )
      );
      playBar.appendChild(
        U.h('input', {
          type: 'range', min: 0, max: Math.max(0, steps.length - 1), value: step, style: { width: '110px' },
          oninput: (e) => { playing = false; stopTimer(); goto(Number(e.target.value)); },
        })
      );
      playBar.style.display = 'flex';
    } else {
      playBar.style.display = 'none';
    }
    legend.querySelectorAll('.pin-group').forEach((el) => el.classList.toggle('on', groups.has(el.dataset.group)));
    // stack info
    const visible = (content.layers || []).filter((l) => l.visible !== false);
    stackInfo.innerHTML =
      `<div style="color:var(--fg-2);margin-bottom:3px">${U.esc(board?.name || '')}</div>` +
      visible.map((l) => `<div>${U.esc(l.name)}</div>`).join('') +
      `<div style="margin-top:4px">${(content.pins || []).length} 个热点</div>`;
  }

  renderStrip();
  applyState(true);
  render();

  // animation loop
  let last = 0;
  const loop = (t) => {
    const dt = Math.min(0.05, (t - last) / 1000 || 0.016);
    last = t;
    if (renderer.ok) {
      renderer.resize();
      renderer.frame(dt);
    }
    raf = requestAnimationFrame(loop);
  };
  let raf = requestAnimationFrame(loop);

  return {
    el: root,
    renderer,
    setStep: goto,
    setMode,
    destroy() {
      stopTimer();
      cancelAnimationFrame(raf);
      if (renderer.ro) renderer.ro.disconnect();
      root.remove();
    },
    refresh(nextContent) {
      Object.assign(content, nextContent || {});
      renderer.setContent(board, content, { highlightGroups: groups });
      applyState(true);
      renderStrip();
      render();
    },
  };
}

/* ---------- 全屏预览浮层 ---------- */
export function openPreview({ board, content, title, subtitle, readonly, onClose }) {
  let inst = null;
  const overlay = U.h('div', { class: 'pv-overlay' });
  const close = () => {
    inst && inst.destroy();
    overlay.remove();
    document.removeEventListener('keydown', onKey);
    if (onClose) onClose();
  };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  const host = U.h('div', { class: 'pv-host' });
  overlay.appendChild(
    U.h('div', { class: 'pv-overlay-head' },
      U.h('div', { class: 'pv-title' },
        U.h('b', {}, title || board?.name || '预览'),
        U.h('span', { class: 'muted', style: { fontSize: '11.5px' } }, subtitle || ''),
      ),
      readonly ? U.h('span', { class: 'tag blue' }, '只读') : null,
      U.h('button', { class: 'icon-btn', onclick: close, title: '关闭 (Esc)' }, '✕')
    )
  );
  overlay.appendChild(host);
  document.body.appendChild(overlay);
  document.addEventListener('keydown', onKey);
  inst = createPreview({ board, content: U.clone(content), readonly });
  host.appendChild(inst.el);
  return { close, instance: inst };
}
