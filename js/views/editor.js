/* BoardDocs Studio — 场景编辑器 */
import { U } from '../util.js';
import {
  store, GROUPS, GROUP_MAP, LAYER_KINDS, boardStats, findConflicts, conflictPinSet, pinConflicts,
  pinAnnotation, unlabeledVoltagePins, publishChecks, statusText,
} from '../store.js';
import { BoardRenderer, groupColor } from '../gl.js';
import { openPreview, stepOffsets } from '../preview.js';
import { exportPinCsv, exportStepsSvg, exportDocJson } from '../export.js';
import { openPublishDialog } from '../publishDialog.js';

export function renderEditor({ host, board, app, nav }) {
  const content = store.contentFor(board);
  const state = {
    leftTab: 'layers',
    rightTab: 'pins',
    selectedLayerId: content.layers[0]?.id || null,
    selectedStepId: (content.steps || [])[0]?.id || null,
    selectedPinId: null,
    highlightGroups: new Set(),
    search: '',
    bottomTab: 'conflicts',
    dotMode: false,
    showLabels: false,
    viewMode: 'edit',
    stepIndex: 0,
  };
  let preview = null;

  /* ---------------- DOM shells ---------------- */
  const root = U.h('div', { class: 'editor' });
  const leftPanel = U.h('div', { class: 'ed-col ed-left' });
  const center = U.h('div', { class: 'ed-center' });
  const rightPanel = U.h('div', { class: 'ed-col ed-right' });
  const bottom = U.h('div', { class: 'ed-bottom' });
  root.appendChild(leftPanel);
  root.appendChild(center);
  root.appendChild(rightPanel);
  root.appendChild(bottom);
  host.appendChild(root);

  const canvas = U.h('canvas');
  const tooltip = U.h('div', { class: 'pin-tooltip' });
  const stackInfo = U.h('div', { class: 'vp-stack' });
  const labelsLayer = U.h('div', { class: 'pin-labels' });
  const hint = U.h('div', { class: 'vp-help' });
  const stepBar = U.h('div', { class: 'play-bar' });
  const readonlyBanner = U.h('div', { class: 'readonly-banner', hidden: true });
  const viewport = U.h('div', { class: 'viewport' }, canvas, labelsLayer, stackInfo, hint, stepBar, tooltip, readonlyBanner);

  const toolbar = U.h('div', { class: 'vp-toolbar' });
  viewport.appendChild(toolbar);

  const renderer = new BoardRenderer(canvas);
  center.appendChild(viewport);

  if (!renderer.ok) {
    viewport.appendChild(
      U.h('div', { class: 'empty', style: { position: 'absolute', inset: '18%' } },
        U.h('b', {}, '当前浏览器不支持 WebGL2'),
        '场景渲染不可用，但引脚与装配编辑、导出仍可继续使用。'
      )
    );
  }
  renderer.setContent(board, content, {
    visible: null,
    highlightGroups: state.highlightGroups,
    conflictPins: conflictPinSet(content),
    selectedPinId: null,
    stepLayerIds: new Set(),
  });

  /* ---------------- canvas interactions ---------------- */
  renderer.onHoverCanvas = (mx, my) => {
    if (!renderer.ok) return;
    const p = mx < 0 ? null : renderer.pickPin(mx, my);
    renderer.setState({ hoverPinId: p ? p.id : null });
    if (state.viewMode !== 'edit') {
      canvas.style.cursor = p ? 'pointer' : 'default';
      p ? showTip(p, mx, my) : (tooltip.style.display = 'none');
      return;
    }
    canvas.style.cursor = state.dotMode ? 'crosshair' : p ? 'pointer' : 'default';
    if (!p) {
      tooltip.style.display = 'none';
      return;
    }
    showTip(p, mx, my);
  };
  function showTip(p, mx, my) {
    const conflicts = pinConflicts(p);
    tooltip.innerHTML =
      `<b>${U.esc(p.name || '未命名')}</b> <span class="muted">${U.esc(GROUP_MAP[p.group]?.label || '')}</span>` +
      `<span class="fn">${p.voltage ? U.esc(p.voltage) : '<span style="color:var(--red)">未标注电压</span>'}</span>` +
      `<span class="fn">${(p.funcs || []).map((f) => U.esc(f.label)).filter(Boolean).join(' · ') || '<span class="muted">无复用功能</span>'}</span>` +
      (conflicts.length ? `<span class="warnline">⚠ ${conflicts.map((c) => U.esc(c.name)).join('、')} 重复占用</span>` : '');
    tooltip.style.display = 'block';
    const r = viewport.getBoundingClientRect();
    let x = mx + 16, y = my + 14;
    const tw = tooltip.offsetWidth, th = tooltip.offsetHeight;
    if (x + tw > r.width - 8) x = mx - tw - 12;
    if (y + th > r.height - 8) y = my - th - 12;
    tooltip.style.left = Math.max(6, x) + 'px';
    tooltip.style.top = Math.max(6, y) + 'px';
  }
  renderer.onClickCanvas = (mx, my) => {
    if (!renderer.ok) return;
    const p = renderer.pickPin(mx, my);
    if (p) {
      selectPin(p.id);
      renderer.focusPin(p);
      return;
    }
    if (state.viewMode !== 'edit') return;
    if (state.dotMode) {
      const hit = renderer.pickSurface(mx, my);
      if (!hit || !hit.onBoard) {
        U.toast('请在主板范围内点击打点', 'warn');
        return;
      }
      if (!store.canEdit(board)) {
        U.toast('当前草稿不可编辑：' + statusText(board), 'warn');
        return;
      }
      const pin = store.addPinTo(board, hit);
      if (pin) {
        U.toast('已在主板上打点，右侧填写名称、电压与复用功能');
        refreshAll({ focusPinId: pin.id });
      }
    } else if (state.selectedPinId) {
      state.selectedPinId = null;
      renderer.setState({ selectedPinId: null });
      selectPin(null);
    }
  };

  /* ---------------- toolbar ---------------- */
  function renderToolbar() {
    U.clear(toolbar);
    if (readonlyBannerVisible()) {
      toolbar.appendChild(U.h('span', { class: 'tag amber' }, '只读'));
    }
    toolbar.appendChild(U.h('button', { onclick: () => renderer.resetView(), title: '双击画布也可重置' }, '重置视角'));
    toolbar.appendChild(U.h('button', { onclick: () => { renderer.target.pitch = 1.34; renderer.target.dist = 14; } }, '俯视'));
    toolbar.appendChild(U.h('button', { onclick: () => { renderer.target.pitch = 0.18; renderer.target.dist = 16; } }, '平视'));
    toolbar.appendChild(U.h('span', { style: { width: '1px', background: 'var(--line-2)', margin: '2px 3px' } }));
    const dotBtn = U.h('button', { class: 'btn' , title: '打点模式：在主板空白处点击新增引脚热点' }, '＋ 打点');
    dotBtn.classList.toggle('on', state.dotMode);
    dotBtn.onclick = () => {
      state.dotMode = !state.dotMode;
      renderToolbar();
      hint.textContent = state.dotMode ? '打点模式：点击主板空白处新增热点 · 拖拽旋转 · 右键/Shift 平移 · 滚轮缩放' : defaultHint();
    };
    toolbar.appendChild(dotBtn);
    const labBtn = U.h('button', { title: '在画布上叠加引脚名' }, '引脚名');
    labBtn.classList.toggle('on', state.showLabels);
    labBtn.onclick = () => { state.showLabels = !state.showLabels; labelsLayer.hidden = !state.showLabels; renderToolbar(); updateLabels(); };
    toolbar.appendChild(labBtn);
    const cBtn = U.h('button', { title: '在画布上高亮功能冲突的引脚' }, '冲突');
    cBtn.classList.toggle('on', state.showConflicts !== false);
    cBtn.onclick = () => {
      state.showConflicts = state.showConflicts === false;
      renderer.setState({ conflictPins: state.showConflicts === false ? new Set() : conflictPinSet(content) });
      renderToolbar();
    };
    toolbar.appendChild(cBtn);
    toolbar.appendChild(U.h('span', { style: { width: '1px', background: 'var(--line-2)', margin: '2px 3px' } }));
    toolbar.appendChild(U.h('button', { onclick: openFullPreview, title: '打开分步播放 / 自由查看预览' }, '预览 ▸'));
    const stepsBtn = U.h('button', { title: '在场景中按步骤播放' }, '分步播放');
    stepsBtn.classList.toggle('on', state.viewMode === 'steps');
    stepsBtn.onclick = () => setViewMode(state.viewMode === 'steps' ? 'edit' : 'steps');
    toolbar.appendChild(stepsBtn);
    readonlyBanner.hidden = !readonlyBannerVisible();
    readonlyBanner.textContent = readonlyBannerVisible() ? `当前版本状态「${statusText(board)}」，画面只读。` : '';
  }
  function defaultHint() {
    return '左键拖拽旋转 · 右键/Shift 拖拽平移 · 滚轮缩放 · 点击热点选中';
  }
  function readonlyBannerVisible() {
    return !store.canEdit(board);
  }

  /* ---------------- left panel ---------------- */
  function renderLeft() {
    U.clear(leftPanel);
    const head = U.h('div', { class: 'panel-head' },
      U.h('b', {}, board.name),
      U.h('span', { class: 'spacer' }),
      U.h('span', { class: 'tag ' + tagForStatus(board) }, statusText(board))
    );
    leftPanel.appendChild(head);
    const tabs = U.h('div', { class: 'ed-tabs' },
      U.h('button', { class: state.leftTab === 'layers' ? 'active' : '', onclick: () => { state.leftTab = 'layers'; renderLeft(); } }, '图层 ' + content.layers.length),
      U.h('button', { class: state.leftTab === 'steps' ? 'active' : '', onclick: () => { state.leftTab = 'steps'; renderLeft(); } }, '装配步骤 ' + (content.steps || []).length)
    );
    leftPanel.appendChild(tabs);
    const body = U.h('div', { class: 'panel-body' });
    leftPanel.appendChild(body);

    if (state.leftTab === 'layers') {
      body.appendChild(
        U.h('div', { style: { display: 'flex', gap: '5px', marginBottom: '8px' } },
          U.h('button', { class: 'btn small primary', style: { flex: 1 }, onclick: openImportModel }, '⤓ 导入分层模型'),
          U.h('button', { class: 'btn small', title: '新增图层', onclick: openAddLayer }, '+')
        )
      );
      const list = U.h('div', { class: 'layer-list' });
      const layers = content.layers;
      layers.forEach((l, i) => {
        const kind = LAYER_KINDS[l.kind] || LAYER_KINDS.custom;
        const row = U.h(
          'div',
          {
            class: 'layer-row' + (state.selectedLayerId === l.id ? ' sel' : '') + (l.visible === false ? ' hidden-layer' : ''),
            draggable: store.canEdit(board) ? 'true' : 'false',
            onclick: () => { state.selectedLayerId = l.id; renderLeft(); renderToolbar(); },
          },
          U.h('span', { class: 'grip', title: '拖拽调整堆叠顺序' }, '⠿'),
          U.h('span', { class: 'swatch', style: { background: l.color } }),
          U.h('div', { class: 'name' }, l.name),
          U.h('span', { class: 'kind' }, kind.label),
          U.h('button', {
            class: 'icon-btn eye', title: l.visible === false ? '显示' : '隐藏',
            onclick: (e) => { e.stopPropagation(); store.updateLayer(board, l.id, { visible: l.visible === false }); },
          }, l.visible === false ? '◌' : '●'),
          U.h('button', { class: 'icon-btn', title: '上移', onclick: (e) => { e.stopPropagation(); store.moveLayer(board, l.id, -1); } }, '↑'),
          U.h('button', { class: 'icon-btn', title: '下移', onclick: (e) => { e.stopPropagation(); store.moveLayer(board, l.id, 1); } }, '↓')
        );
        row.dataset.layerId = l.id;
        row.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/layer', l.id);
          row.classList.add('dragging');
        });
        row.addEventListener('dragend', () => {
          row.classList.remove('dragging');
          list.querySelectorAll('.layer-row').forEach((r) => r.classList.remove('drop-before', 'drop-after'));
        });
        row.addEventListener('dragover', (e) => {
          e.preventDefault();
          const r = row.getBoundingClientRect();
          const after = e.clientY > r.top + r.height / 2;
          row.classList.toggle('drop-after', after);
          row.classList.toggle('drop-before', !after);
        });
        row.addEventListener('dragleave', () => row.classList.remove('drop-before', 'drop-after'));
        row.addEventListener('drop', (e) => {
          e.preventDefault();
          const srcId = e.dataTransfer.getData('text/layer');
          if (!srcId || srcId === l.id) return;
          const after = e.clientY > row.getBoundingClientRect().top + row.offsetHeight / 2;
          store.reorderLayer(board, srcId, l.id, after);
        });
        list.appendChild(row);
      });
      body.appendChild(list);
      const selected = content.layers.find((l) => l.id === state.selectedLayerId) || content.layers[content.layers.length - 1];
      if (selected) {
        body.appendChild(U.h('hr', { class: 'hr' }));
        body.appendChild(renderLayerProps(selected, layers.indexOf(selected) + 1, layers.length));
      }
    } else {
      body.appendChild(
        U.h('div', { style: { display: 'flex', gap: '5px', marginBottom: '8px' } },
          U.h('button', { class: 'btn small primary', style: { flex: 1 }, onclick: () => { const s = store.addStep(board); if (s) { state.selectedStepId = s.id; state.rightTab = 'steps'; refreshAll(); } } }, '+ 新增装配步骤'),
          U.h('button', { class: 'btn small', title: '按销毁顺序生成拆卸步骤', onclick: buildStepsFromLayers }, '自动')
        )
      );
      const list = U.h('div', { class: 'step-list' });
      (content.steps || []).forEach((s, i) => {
        const row = U.h(
          'div',
          {
            class: 'step-row' + (state.selectedStepId === s.id ? ' sel' : ''),
            draggable: store.canEdit(board) ? 'true' : 'false',
            onclick: () => { state.selectedStepId = s.id; state.rightTab = 'steps'; refreshAll(); },
          },
          U.h('span', { class: 'idx' }, i + 1),
          U.h('div', { class: 'meta' },
            U.h('b', {}, s.title || '(未命名)'),
            U.h('small', {}, (s.action === 'install' ? '安装 ' : '拆卸 ') + ((s.layerIds || []).length ? s.layerIds.map((id) => (content.layers.find((l) => l.id === id) || {}).name || '?').join(' + ') : '未指定零件'))
          ),
          U.h('button', { class: 'icon-btn', title: '在场景中播放此步', onclick: (e) => { e.stopPropagation(); playStep(i); } }, '▷')
        );
        row.dataset.stepId = s.id;
        row.addEventListener('dragstart', (e) => { e.dataTransfer.setData('text/step', s.id); row.classList.add('dragging'); });
        row.addEventListener('dragend', () => row.classList.remove('dragging'));
        row.addEventListener('dragover', (e) => { e.preventDefault(); row.classList.add('drop-before'); });
        row.addEventListener('dragleave', () => row.classList.remove('drop-before'));
        row.addEventListener('drop', (e) => {
          e.preventDefault();
          row.classList.remove('drop-before');
          const srcId = e.dataTransfer.getData('text/step');
          if (srcId && srcId !== s.id) store.reorderStep(board, srcId, s.id);
        });
        list.appendChild(row);
      });
      if (!(content.steps || []).length) {
        body.appendChild(U.h('div', { class: 'empty', style: { padding: '18px', marginTop: '8px' } }, U.h('b', {}, '还没有装配步骤'), '点击「新增装配步骤」或按图层自动生成。'));
      }
      body.appendChild(list);
      body.appendChild(U.h('p', { class: 'hint', style: { marginTop: '10px' } }, '每一步指定要拆卸或安装的零件图层，并填写操作提示。顺序会同步到预览播放。'));
    }
  }

  function renderLayerProps(l, idx, total) {
    const box = U.h('div', { class: 'stack' });
    box.appendChild(U.h('div', { style: { display: 'flex', alignItems: 'center', gap: '6px' } }, U.h('b', { style: { fontSize: '12px' } }, '图层属性'), U.h('span', { class: 'muted', style: { fontSize: '10.5px', marginLeft: 'auto' } }, `${idx}/${total} · ${LAYER_KINDS[l.kind]?.label || l.kind}`)));
    const nameIn = U.h('input', { type: 'text', value: l.name, maxlength: 24 });
    nameIn.addEventListener('input', () => {
      const v = nameIn.value.trim();
      if (!v) return;
      store.setLayerLive(board, l.id, { name: v });
      const row = leftPanel.querySelector(`.layer-row[data-layer-id="${l.id}"] .name`);
      if (row) row.textContent = v;
      renderStackInfo();
    });
    nameIn.addEventListener('blur', () => {
      if (!nameIn.value.trim()) { U.toast('图层名称不能为空', 'warn'); nameIn.value = l.name; store.setLayerLive(board, l.id, { name: l.name }); }
      renderLeft();
    });
    box.appendChild(U.h('label', { class: 'field' }, U.h('span', {}, '图层名称'), nameIn));
    const kindSel = U.h('select', { onchange: (e) => store.updateLayer(board, l.id, { kind: e.target.value, color: LAYER_KINDS[e.target.value]?.color || l.color }) },
      Object.entries(LAYER_KINDS).map(([k, v]) => U.h('option', { value: k, selected: k === l.kind }, v.label))
    );
    box.appendChild(U.h('label', { class: 'field' }, U.h('span', {}, '零件类型'), kindSel));
    const color = U.h('input', { type: 'color', value: l.color, style: { width: '100%', height: '30px', padding: '2px', background: '#0e151d' }, oninput: (e) => { l.color = e.target.value; store.updateLayer(board, l.id, { color: e.target.value }); } });
    box.appendChild(U.h('label', { class: 'field' }, U.h('span', {}, '颜色'), color));
    const scale = U.h('input', { type: 'range', min: 0.3, max: 2, step: 0.02, value: l.scale || 1, oninput: (e) => store.setLayerLive(board, l.id, { scale: Number(e.target.value) }) });
    box.appendChild(U.h('label', { class: 'field' }, U.h('span', {}, '缩放'), scale));
    const ox = U.h('input', { type: 'range', min: -3, max: 3, step: 0.05, value: l.offsetX || 0, oninput: (e) => store.setLayerLive(board, l.id, { offsetX: Number(e.target.value) }) });
    const oz = U.h('input', { type: 'range', min: -3, max: 3, step: 0.05, value: l.offsetZ || 0, oninput: (e) => store.setLayerLive(board, l.id, { offsetZ: Number(e.target.value) }) });
    box.appendChild(U.h('label', { class: 'field' }, U.h('span', {}, '水平位移'), ox));
    box.appendChild(U.h('label', { class: 'field' }, U.h('span', {}, '前后位移'), oz));
    box.appendChild(U.h('div', { class: 'btn-row' },
      U.h('button', { class: 'btn small', onclick: () => store.updateLayer(board, l.id, { offsetX: 0, offsetZ: 0, scale: 1 }) }, '复位'),
      U.h('button', { class: 'btn small danger', onclick: () => U.confirm('删除图层', `确认删除「${l.name}」？关联的引脚会回到第一个图层。`, '删除', () => { store.removeLayer(board, l.id); state.selectedLayerId = content.layers[0]?.id; refreshAll(); }, true) }, '删除图层')
    ));
    return box;
  }

  function openAddLayer() {
    const kind = U.h('select', {}, Object.entries(LAYER_KINDS).map(([k, v]) => U.h('option', { value: k }, v.label)));
    const name = U.h('input', { type: 'text', placeholder: '留空则自动命名' });
    U.modal({
      title: '新增图层',
      body: U.h('div', { class: 'stack' },
        U.h('label', { class: 'field' }, U.h('span', {}, '零件类型'), kind),
        U.h('label', { class: 'field', style: { marginBottom: 0 } }, U.h('span', {}, '图层名称'), name)
      ),
      actions: [{ label: '取消' }, {
        label: '新增', kind: 'primary',
        onClick: () => {
          const ly = store.addLayer(board, kind.value, name.value.trim());
          if (ly) { state.selectedLayerId = ly.id; refreshAll(); }
        },
      }],
    });
  }

  /* 导入分层模型：按所选零件类型批量生成图层 */
  function openImportModel() {
    const modelName = U.h('input', { type: 'text', value: board.sku + '_assembly.step', readonly: true, class: 'mono', style: { fontSize: '11.5px' } });
    const defaults = ['shell', 'pcb', 'shield', 'connector', 'display'];
    const checks = defaults.map((k) => {
      const cb = U.h('input', { type: 'checkbox', checked: true, style: { width: 'auto' } });
      return { k, cb, row: U.h('label', { class: 'imp-row' }, cb, U.h('span', { class: 'swatch', style: { background: LAYER_KINDS[k].color } }), U.h('span', { style: { flex: 1 } }, LAYER_KINDS[k].label), U.h('span', { class: 'muted', style: { fontSize: '10.5px' } }, 'layer_' + k + '.mesh')) };
    });
    const extra = U.h('input', { type: 'text', placeholder: '额外图层名称，用逗号分隔（可选）' });
    U.modal({
      title: '导入分层模型',
      width: '600px',
      body: U.h('div', { class: 'stack' },
        U.h('label', { class: 'field' }, U.h('span', {}, '模型文件（演示为内置分层样例）'), modelName),
        U.h('p', { class: 'hint', style: { margin: '0 0 4px' } }, '导入后每个零件会成为独立图层，可逐层命名、调整堆叠顺序。以下为检测到的分层：'),
        U.h('div', { class: 'imp-list' }, checks.map((c) => c.row)),
        U.h('label', { class: 'field', style: { marginTop: '10px', marginBottom: 0 } }, U.h('span', {}, '补充图层'), extra),
        U.h('p', { class: 'hint', style: { margin: 0 } }, '已存在的同类型图层不会被重复创建。')
      ),
      actions: [
        { label: '取消' },
        {
          label: '导入所选分层', kind: 'primary',
          onClick: () => {
            const kinds = checks.filter((c) => c.cb.checked).map((c) => c.k);
            const names = extra.value.split(/[,，]/).map((s) => s.trim()).filter(Boolean);
            let added = 0;
            kinds.forEach((k) => {
              if (content.layers.some((l) => l.kind === k)) return;
              const ly = store.addLayer(board, k);
              if (ly) { added++; state.selectedLayerId = ly.id; }
            });
            names.forEach((n) => { const ly = store.addLayer(board, 'custom', n); if (ly) { added++; state.selectedLayerId = ly.id; } });
            U.toast(added ? `已导入 ${added} 个分层` : '没有新的分层可导入', added ? '' : 'warn');
            state.leftTab = 'layers';
            refreshAll();
          },
        },
      ],
    });
  }

  function buildStepsFromLayers() {
    if (!store.canEdit(board)) { U.toast('当前草稿不可编辑', 'warn'); return; }
    U.confirm('按图层自动生成拆卸步骤', '将按「最上层优先」顺序为每个可见图层生成拆卸步骤，现有步骤会被替换。', '生成', () => {
      const layers = [...content.layers].reverse();
      store.mutate(board, (c) => {
        c.steps = layers.map((l, i) => ({
          id: U.uid('st'),
          action: 'remove',
          title: `拆卸${l.name}`,
          layerIds: [l.id],
          note: i === 0 ? '从最外层开始，记录拆卸顺序以便售后复原。' : '',
        }));
      }, 'steps-generated');
      state.selectedStepId = content.steps[0]?.id || null;
      refreshAll();
      U.toast('已生成 ' + content.steps.length + ' 个拆卸步骤');
    });
  }

  /* ---------------- right panel ---------------- */
  function renderRight() {
    U.clear(rightPanel);
    const tabs = U.h('div', { class: 'ed-tabs' },
      U.h('button', { class: state.rightTab === 'pins' ? 'active' : '', onclick: () => { state.rightTab = 'pins'; renderRight(); } }, '引脚 ' + (content.pins || []).length),
      U.h('button', { class: state.rightTab === 'steps' ? 'active' : '', onclick: () => { state.rightTab = 'steps'; renderRight(); } }, '步骤'),
      U.h('button', { class: state.rightTab === 'version' ? 'active' : '', onclick: () => { state.rightTab = 'version'; renderRight(); } }, '版本')
    );
    rightPanel.appendChild(tabs);
    const body = U.h('div', { class: 'panel-body tight' });
    body.id = 'right-body';
    rightPanel.appendChild(body);

    if (state.rightTab === 'pins') {
      const conflicts = conflictPinSet(content);
      // groups
      const gWrap = U.h('div', { class: 'pin-groups' });
      GROUPS.filter((g) => (content.pins || []).some((p) => p.group === g.id)).forEach((g) => {
        const on = state.highlightGroups.has(g.id);
        const groupPins = content.pins.filter((p) => p.group === g.id);
        const count = groupPins.length;
        gWrap.appendChild(U.h('button', {
          class: 'pin-group' + (on ? ' on' : ''),
          style: { color: g.color },
          onclick: () => { on ? state.highlightGroups.delete(g.id) : state.highlightGroups.add(g.id); renderRight(); renderer.setState({ highlightGroups: state.highlightGroups }); },
        }, U.h('span', { class: 'dotc' }), g.label, U.h('span', { class: 'muted', style: { fontSize: '9.5px' } }, count)));
      });
      body.appendChild(gWrap);
      const filterWrap = U.h('div', { style: { padding: '8px 10px', borderBottom: '1px solid var(--line)', display: 'flex', gap: '6px' } });
      const search = U.h('input', { type: 'search', placeholder: '搜索引脚 / 功能…', value: state.search, style: { fontSize: '11.5px' } });
      search.addEventListener('input', () => { state.search = search.value; renderPinList(); });
      filterWrap.appendChild(search);
      filterWrap.appendChild(U.h('button', {
        class: 'btn small', title: '清除分组高亮',
        onclick: () => { state.highlightGroups.clear(); renderRight(); renderer.setState({ highlightGroups: state.highlightGroups }); },
      }, '×'));
      const noVolt = unlabeledVoltagePins(content).length;
      filterWrap.appendChild(U.h('button', {
        class: 'btn small' + (noVolt ? ' danger' : ''),
        title: '逐个跳转到未标注电压的引脚',
        disabled: !noVolt,
        onclick: () => jumpToUnlabeled(),
      }, noVolt ? `未标电压 ${noVolt}` : '电压齐全'));
      body.appendChild(filterWrap);
      const detail = U.h('div', { class: 'pin-detail' });
      detail.id = 'pin-detail';
      body.appendChild(detail);
      const list = U.h('div', { class: 'pin-list' });
      list.id = 'pin-list';
      body.appendChild(list);
      renderPinDetail();
      renderPinList();
    } else if (state.rightTab === 'steps') {
      body.appendChild(renderStepEditor());
    } else {
      body.appendChild(renderVersionPanel());
    }
  }

  function pinMatches(p) {
    if (!state.search.trim()) return true;
    const q = state.search.trim().toLowerCase();
    return (
      (p.name || '').toLowerCase().includes(q) ||
      (p.voltage || '').toLowerCase().includes(q) ||
      (p.funcs || []).some((f) => (f.label || '').toLowerCase().includes(q))
    );
  }

  function renderPinList() {
    const list = document.getElementById('pin-list');
    if (!list) return;
    U.clear(list);
    const conflicts = conflictPinSet(content);
    const pins = (content.pins || []).filter(pinMatches);
    if (!pins.length) {
      list.appendChild(U.h('div', { class: 'empty', style: { margin: '8px' } }, U.h('b', {}, state.search ? '没有匹配的引脚' : '还没有引脚热点'), state.search ? '换个关键词试试' : '在场景中用「＋ 打点」添加热点'));
      return;
    }
    pins.forEach((p) => {
      const ann = pinAnnotation(p);
      const hasConflict = conflicts.has(p.id);
      const row = U.h('div', { class: 'pin-item' + (state.selectedPinId === p.id ? ' sel' : '') + (!p.voltage ? ' novolt' : ''), onclick: () => { selectPin(p.id); const pp = content.pins.find((x) => x.id === p.id); if (pp && renderer.ok) renderer.focusPin(pp); } },
        U.h('div', { class: 'top' },
          U.h('span', { class: 'dotc', style: { width: '7px', height: '7px', borderRadius: '50%', background: groupColor(p.group), flex: 'none' } }),
          U.h('b', {}, p.name || '未命名'),
          hasConflict ? U.h('span', { class: 'conflict-dot', title: '功能重复占用' }) : null,
          !ann.complete ? U.h('span', { class: 'sel-dot', style: { background: 'var(--amber)' }, title: '标注未完成' }) : null,
          U.h('span', { class: 'v' }, p.voltage || '无电压')
        ),
        U.h('div', { class: 'fnline' }, (p.funcs || []).map((f) => f.label).filter(Boolean).join(' · ') || '无复用功能')
      );
      list.appendChild(row);
    });
  }

  function selectPin(id) {
    state.selectedPinId = id;
    renderer.setState({ selectedPinId: id });
    renderPinList();
    renderPinDetail();
  }

  function renderPinDetail() {
    const detail = document.getElementById('pin-detail');
    if (!detail) return;
    U.clear(detail);
    const p = (content.pins || []).find((x) => x.id === state.selectedPinId);
    if (!p) {
      const hintBox = U.h('div', { class: 'hint', style: { padding: '4px 2px' } }, '选中画布或列表中的引脚，填写名称、电压与复用功能。');
      detail.appendChild(hintBox);
      detail.appendChild(U.h('div', { class: 'btn-row', style: { marginTop: '8px' } },
        U.h('button', { class: 'btn small', onclick: () => { state.dotMode = true; renderToolbar(); } }, '＋ 进入打点模式'),
        U.h('button', { class: 'btn small', onclick: () => jumpToUnlabeled() }, '跳转到未标电压的引脚')
      ));
      return;
    }
    const editable = store.canEdit(board);
    const conflicts = pinConflicts(p);
    const conflictingLabels = new Set(conflicts.map((c) => c.key));
    const field = (label, node) => U.h('label', { class: 'field' }, U.h('span', {}, label), node);

    const nameIn = U.h('input', { type: 'text', value: p.name || '', maxlength: 20, disabled: !editable });
    nameIn.addEventListener('input', () => { store.setPinLive(board, p.id, { name: nameIn.value }); });
    nameIn.addEventListener('blur', () => { renderPinList(); renderBottom(); });
    const voltIn = U.h('input', { type: 'text', value: p.voltage || '', placeholder: '如 3.3V / 5V / 0V', disabled: !editable });
    voltIn.addEventListener('input', () => { store.setPinLive(board, p.id, { voltage: voltIn.value }); });
    voltIn.addEventListener('blur', () => { renderPinList(); renderBottom(); });
    const groupSel = U.h('select', { disabled: !editable, onchange: (e) => { store.updatePin(board, p.id, { group: e.target.value }); } },
      GROUPS.map((g) => U.h('option', { value: g.id, selected: g.id === p.group }, g.label))
    );
    const layerSel = U.h('select', { disabled: !editable, onchange: (e) => { store.updatePin(board, p.id, { layerId: e.target.value }); } },
      content.layers.map((l) => U.h('option', { value: l.id, selected: l.id === p.layerId }, l.name))
    );
    const noteIn = U.h('textarea', { rows: 2, value: p.note || '', placeholder: '备注（选填）', disabled: !editable });
    noteIn.addEventListener('input', () => store.setPinLive(board, p.id, { note: noteIn.value }));

    detail.appendChild(U.h('div', { class: 'detail-head' },
      U.h('b', { class: 'mono' , style: { fontSize: '13px', color: 'var(--accent)' } }, p.name || '未命名引脚'),
      U.h('span', { class: 'tag ' + (pinAnnotation(p).complete ? 'green' : 'amber') }, pinAnnotation(p).complete ? '标注完整' : '待完善'),
      U.h('span', { style: { flex: 1 } }),
      U.h('button', { class: 'icon-btn', title: '定位到该引脚', onclick: () => { const q = content.pins.find((x) => x.id === p.id); renderer.focusPin(q); } }, '◎'),
      U.h('button', { class: 'icon-btn danger', title: '删除引脚', disabled: !editable, onclick: () => U.confirm('删除引脚', `确认删除「${p.name}」热点？`, '删除', () => { store.removePin(board, p.id); state.selectedPinId = null; refreshAll(); }, true) }, '✕')
    ));
    detail.appendChild(field('名称', nameIn));
    const voltBtns = ['3.3V', '5V', '0V'].map((v) =>
      U.h('button', { class: 'btn small', disabled: !editable, onclick: () => { voltIn.value = v; store.updatePin(board, p.id, { voltage: v }); } }, v)
    );
    const voltWrap = U.h('div', { style: { display: 'flex', gap: '5px' } }, voltIn, U.h('div', { class: 'quick-volt' }, voltBtns));
    detail.appendChild(field('电压' + (!p.voltage ? '（发布阻断项）' : ''), voltWrap));
    detail.appendChild(U.h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' } },
      field('分组', groupSel), field('所在图层', layerSel)
    ));
    const fnBox = U.h('div', { class: 'stack', style: { gap: '0' } });
    detail.appendChild(field('复用功能', fnBox));
    (p.funcs || []).forEach((f) => {
      const conflict = conflictingLabels.has(String(f.label || '').trim().toLowerCase());
      const row = U.h('div', { class: 'fn-row' + (conflict ? ' conflict' : '') });
      const inp = U.h('input', { type: 'text', value: f.label || '', placeholder: '如 UART1_TX / ADC1_CH3', disabled: !editable });
      inp.addEventListener('input', () => { f.label = inp.value; store.touch('live'); });
      inp.addEventListener('change', () => { store.updateFunction(board, p.id, f.id, inp.value); });
      row.appendChild(inp);
      row.appendChild(U.h('span', { class: 'muted mono', style: { fontSize: '10px', textAlign: 'right' } }, p.voltage || '—'));
      row.appendChild(U.h('button', { class: 'icon-btn del', title: '删除该功能', disabled: !editable, onclick: () => { store.removeFunction(board, p.id, f.id); } }, '✕'));
      fnBox.appendChild(row);
      if (conflict) {
        const other = (p.funcs || []).filter((x) => x.id !== f.id && String(x.label || '').trim().toLowerCase() === String(f.label || '').trim().toLowerCase());
        fnBox.appendChild(U.h('div', { class: 'conf', style: { margin: '0 0 6px' } }, `⚠ 已在本引脚被占用 ${other.length} 次，删除重复项`));
      }
    });
    if (editable) {
      fnBox.appendChild(U.h('button', { class: 'btn small', style: { alignSelf: 'flex-start', marginTop: '3px' }, onclick: () => { store.addFunction(board, p.id, ''); setTimeout(() => { const inputs = fnBox.querySelectorAll('input'); inputs[inputs.length - 1]?.focus(); }, 30); } }, '+ 添加复用功能'));
    }
    detail.appendChild(field('备注', noteIn));
    if (!editable) detail.appendChild(U.h('p', { class: 'hint', style: { margin: 0 } }, '只读：提交审核或发布后不可直接修改，请基于版本开修订。'));
  }

  function jumpToUnlabeled() {
    const pins = unlabeledVoltagePins(content);
    if (!pins.length) {
      U.toast('所有引脚都已标注电压');
      return;
    }
    const cur = pins.findIndex((p) => p.id === state.selectedPinId);
    const next = pins[(cur + 1) % pins.length];
    state.rightTab = 'pins';
    renderRight();
    selectPin(next.id);
    renderer.focusPin(next);
    U.toast(`跳到未标电压引脚：${next.name || '未命名'}`, 'warn');
  }

  /* ---------------- step editor ---------------- */
  function renderStepEditor() {
    const box = U.h('div', { class: 'stack', style: { padding: '10px' } });
    const step = (content.steps || []).find((s) => s.id === state.selectedStepId) || content.steps?.[0];
    if (!step) {
      box.appendChild(U.h('div', { class: 'empty', style: { padding: '20px' } }, U.h('b', {}, '未选择步骤'), '在左侧「装配步骤」中新建或选择一个步骤。'));
      return box;
    }
    if (step.id !== state.selectedStepId) state.selectedStepId = step.id;
    const idx = content.steps.indexOf(step);
    const editable = store.canEdit(board);
    const title = U.h('input', { type: 'text', value: step.title || '', disabled: !editable });
    title.addEventListener('input', () => { store.setStepLive(board, step.id, { title: title.value }); });
    title.addEventListener('change', () => store.updateStep(board, step.id, { title: title.value }));
    const action = U.h('select', { disabled: !editable, onchange: (e) => store.updateStep(board, step.id, { action: e.target.value }) },
      U.h('option', { value: 'install', selected: step.action === 'install' }, '安装'),
      U.h('option', { value: 'remove', selected: step.action === 'remove' }, '拆卸')
    );
    const note = U.h('textarea', { rows: 4, value: step.note || '', disabled: !editable, placeholder: '操作提示：螺丝规格、工具、注意事项…' });
    // 输入即保存，但不重渲染整个右侧面板（避免 blur 吃掉点击）
    note.addEventListener('input', () => store.setStepLive(board, step.id, { note: note.value }));

    box.appendChild(U.h('div', { style: { display: 'flex', alignItems: 'center', gap: '7px' } },
      U.h('span', { class: 'step-row idx', style: { width: '24px', height: '24px' } }, idx + 1),
      U.h('b', { style: { fontSize: '12.5px' } }, `第 ${idx + 1} 步`),
      U.h('span', { class: 'tag ' + (step.action === 'install' ? 'blue' : 'amber') }, step.action === 'install' ? '安装' : '拆卸'),
      U.h('span', { style: { flex: 1 } }),
      U.h('button', { class: 'icon-btn', title: '在场景中播放此步', onclick: () => playStep(idx) }, '▷')
    ));
    box.appendChild(U.h('label', { class: 'field' }, U.h('span', {}, '标题'), title));
    box.appendChild(U.h('label', { class: 'field' }, U.h('span', {}, '动作'), action));
    box.appendChild(U.h('div', { class: 'field' }, U.h('span', {}, '涉及零件'),
      U.h('div', { class: 'layer-checks' }, content.layers.map((l) => {
        const cb = U.h('input', { type: 'checkbox', checked: (step.layerIds || []).includes(l.id), disabled: !editable, style: { width: 'auto' } });
        cb.addEventListener('change', () => {
          const ids = new Set(step.layerIds || []);
          cb.checked ? ids.add(l.id) : ids.delete(l.id);
          store.updateStep(board, step.id, { layerIds: [...ids] });
        });
        return U.h('label', { class: 'layer-check' }, cb, U.h('span', { class: 'swatch', style: { background: l.color } }), l.name);
      }))
    ));
    box.appendChild(U.h('label', { class: 'field' }, U.h('span', {}, '操作提示文字'), note));
    box.appendChild(U.h('div', { class: 'btn-row' },
      U.h('button', { class: 'btn small', disabled: !editable || idx === 0, onclick: () => { store.moveStep(board, step.id, -1); refreshAll(); } }, '↑ 上移'),
      U.h('button', { class: 'btn small', disabled: !editable || idx === content.steps.length - 1, onclick: () => { store.moveStep(board, step.id, 1); refreshAll(); } }, '↓ 下移'),
      U.h('button', { class: 'btn small', disabled: !editable, onclick: () => { store.duplicateStep(board, step.id); refreshAll(); } }, '复制'),
      U.h('button', { class: 'btn small danger', disabled: !editable, onclick: () => U.confirm('删除步骤', `确认删除第 ${idx + 1} 步？`, '删除', () => { store.removeStep(board, step.id); state.selectedStepId = content.steps[0]?.id || null; refreshAll(); }, true) }, '删除')
    ));
    return box;
  }

  /* ---------------- version panel ---------------- */
  function renderVersionPanel() {
    const box = U.h('div', { class: 'stack', style: { padding: '10px' } });
    const checks = publishChecks(board, content);
    const last = store.latestVersion(board);

    if (board.work) {
      box.appendChild(U.h('div', { class: 'stat-card', style: { padding: '11px 12px' } },
        U.h('div', { style: { display: 'flex', alignItems: 'center', gap: '7px' } },
          U.h('b', { style: { fontSize: '12.5px' } }, '当前草稿'),
          U.h('span', { class: 'tag ' + tagForStatus(board) }, statusText(board))
        ),
        U.h('div', { class: 'kv', style: { marginTop: '8px' } }, U.h('span', {}, '修订号'), U.h('b', { class: 'mono' }, 'Rev ' + board.work.rev)),
        U.h('div', { class: 'kv' }, U.h('span', {}, '基线版本'), U.h('b', {}, board.work.baseLabel || '无（首版）')),
        U.h('div', { class: 'kv' }, U.h('span', {}, '固件目标'), U.h('b', { class: 'mono' }, board.work.firmwareTarget || '—')),
        U.h('div', { class: 'kv' }, U.h('span', {}, '阻断项'), U.h('b', { style: { color: checks.blockers.length ? 'var(--red)' : 'var(--green)' } }, String(checks.blockers.length)))
      ));
    } else {
      box.appendChild(U.h('div', { class: 'stat-card', style: { padding: '11px 12px' } },
        U.h('div', { style: { display: 'flex', alignItems: 'center', gap: '7px' } },
          U.h('b', { style: { fontSize: '12.5px' } }, '当前状态'),
          U.h('span', { class: 'tag ' + tagForStatus(board) }, statusText(board))
        ),
        U.h('div', { class: 'kv', style: { marginTop: '8px' } }, U.h('span', {}, '已发布版本'), U.h('b', {}, String(board.versions.length))),
        U.h('div', { class: 'kv' }, U.h('span', {}, '最新版本'), U.h('b', { class: 'mono' }, last ? `${last.label} / ${last.firmware}` : '—')),
        U.h('div', { class: 'kv' }, U.h('span', {}, '最近发布'), U.h('b', {}, last ? U.fmtDay(last.publishedAt) : '—')),
        U.h('div', { class: 'kv' }, U.h('span', {}, '说明'), U.h('b', {}, '只读，修订需开新草稿'))
      ));
    }

    if (board.work) {
      const fwIn = U.h('input', { type: 'text', value: board.work.firmwareTarget || '', class: 'mono', disabled: board.work.status === 'in_review' || board.work.status === 'approved' });
      fwIn.addEventListener('change', () => store.mutate(board, (c, b) => { b.work.firmwareTarget = fwIn.value; }, 'firmware'));
      box.appendChild(U.h('label', { class: 'field', style: { marginBottom: 0 } }, U.h('span', {}, '对应固件版本'), fwIn));
      if (board.work.status === 'rejected' && board.work.rejectionNote) {
        box.appendChild(U.h('div', { class: 'issue blocking', style: { marginTop: '8px' } }, U.h('div', { class: 'body' }, U.h('b', {}, '本次已退回'), U.h('small', {}, board.work.rejectionNote))));
      }
      const blocked = checks.blockers.length > 0;
      box.appendChild(U.h('div', { class: 'btn-row', style: { marginTop: '10px' } },
        store.canEdit(board)
          ? U.h('button', { class: 'btn primary', onclick: openSubmit }, '提交审核')
          : board.work.status === 'approved' && store.canReview()
            ? U.h('button', { class: 'btn primary', onclick: () => openPublishDialog({ board, content, onPublished: (v) => nav(`#/published/${v.id}`) }) }, '生成发布版本')
            : null,
        U.h('button', { class: 'btn', onclick: () => { state.bottomTab = 'checks'; renderBottom(); document.getElementById('bottom-main')?.scrollIntoView({ block: 'nearest' }); } }, blocked ? `发布检查（${checks.blockers.length} 阻断）` : '发布检查'),
        U.h('button', { class: 'btn', onclick: () => { state.rightTab = 'version'; openExportMenu(); } }, '导出')
      ));
      if (blocked) box.appendChild(U.h('p', { class: 'hint', style: { color: 'var(--red)' } }, `存在 ${checks.blockers.length} 个阻断项（未标电压引脚），发布前必须补齐。`));
      if (board.work.status === 'approved') {
        box.appendChild(U.h('p', { class: 'hint' }, store.canReview()
          ? '评审已通过，可生成对应固件版本的发布版本。'
          : '评审已通过；发布需要评审权限，可在右上角切换到评审员。'));
      }
    } else {
      box.appendChild(U.h('p', { class: 'hint' }, board.versions.length
        ? `该型号已发布 ${board.versions.length} 个版本。发布后不可直接修改，需基于版本开修订。`
        : '还没有草稿。'));
      box.appendChild(U.h('div', { class: 'btn-row', style: { marginTop: '8px' } },
        board.versions.length
          ? U.h('button', { class: 'btn primary', onclick: () => { const v = store.latestVersion(board); openRevision(v); } }, '基于最新版本开修订')
          : null,
        board.versions.length
          ? U.h('button', { class: 'btn', onclick: () => openExportMenu() }, '导出最新已发布版本')
          : null,
        U.h('button', { class: 'btn', onclick: () => { state.bottomTab = 'checks'; renderBottom(); } }, '发布检查')
      ));
    }

    if (board.versions.length) {
      box.appendChild(U.h('div', { class: 'section-title', style: { margin: '12px 0 8px', fontSize: '12px' } }, '已发布版本'));
      [...board.versions].reverse().forEach((v) => {
        box.appendChild(U.h('div', { class: 'ver-row' },
          U.h('div', { class: 'ver-line' },
            U.h('b', { class: 'mono' }, v.label),
            U.h('span', { class: 'tag violet' }, v.firmware),
            U.h('span', { class: 'muted', style: { fontSize: '10.5px', marginLeft: 'auto' } }, U.fmtDay(v.publishedAt))
          ),
          U.h('div', { class: 'btn-row', style: { marginTop: '5px' } },
            U.h('button', { class: 'btn small', onclick: () => nav(`#/published/${v.id}`) }, '查看'),
            !board.work
              ? U.h('button', { class: 'btn small', title: '基于该版本创建修订草稿', onclick: () => openRevision(v) }, '开修订')
              : null,
            U.h('button', { class: 'btn small', title: '查看该版本快照', onclick: () => openPreview({ board, content: v.content, title: `${board.name} · ${v.label}`, subtitle: `${v.firmware} · ${U.fmtDate(v.publishedAt)}`, readonly: true }) }, '预览')
          )
        ));
      });
    }
    return box;
  }

  function openRevision(v) {
    U.confirm('基于该版本开始修订', `将以 ${v.label}（${v.firmware}）为基线创建新草稿，发布后不可回改该版本。`, '开始修订', () => {
      const ok = store.openRevision(board, v.id);
      if (ok) {
        U.toast('已创建修订草稿，可继续编辑');
        nav(`#/board/${board.id}/editor`);
        setTimeout(() => app.forceRender && app.forceRender(), 10);
      }
    });
  }

  /* ---------------- submit / export ---------------- */
  function openSubmit() {
    const checks = publishChecks(board, content);
    const note = U.h('textarea', { rows: 3, placeholder: '给评审员的说明（可填）' });
    const warnList = U.h('div', { class: 'check-list' });
    checks.blockers.slice(0, 5).forEach((b) => warnList.appendChild(U.h('div', { class: 'issue blocking', style: { marginBottom: '5px' } }, U.h('div', { class: 'body' }, U.h('b', {}, b.title), U.h('small', {}, b.detail))) ));
    checks.warnings.slice(0, 6).forEach((b) => warnList.appendChild(U.h('div', { class: 'issue', style: { marginBottom: '5px' } }, U.h('div', { class: 'body' }, U.h('b', {}, b.title), U.h('small', {}, b.detail)))));
    U.modal({
      title: '提交审核',
      width: '620px',
      body: U.h('div', { class: 'stack' },
        U.h('p', { class: 'hint', style: { margin: 0 } }, '提交后草稿锁定为「待审核」，评审可逐条批注并退回。发布检查中的阻断项必须在发布前处理。'),
        U.h('label', { class: 'field', style: { marginBottom: 0 } }, U.h('span', {}, '提交说明'), note),
        warnList.childElementCount ? U.h('div', { style: { marginTop: '10px' } }, U.h('b', { style: { fontSize: '12px' } }, `当前检查：${checks.blockers.length} 个阻断项 / ${checks.warnings.length} 个提醒`), warnList) : U.h('p', { class: 'ok-row' }, '✓ 发布检查通过，无阻断项')
      ),
      actions: [
        { label: '取消' },
        {
          label: '提交审核', kind: 'primary',
          onClick: () => {
            const ok = store.submitForReview(board, note.value.trim());
            if (ok) {
              U.toast('已提交审核');
              nav(`#/review/${board.work?.reviewId || ''}`);
            }
          },
        },
      ],
    });
  }

  function openExportMenu() {
    const name = `${board.sku}_${board.work ? 'Rev' + board.work.rev : (store.latestVersion(board)?.label || 'draft')}`;
    U.modal({
      title: '导出给售后与课程组',
      body: U.h('div', { class: 'stack' },
        U.h('button', { class: 'btn', onclick: () => { exportPinCsv(board, content); U.toast('已导出引脚清单 CSV'); } }, '⤓ 引脚清单（CSV）— 售后检索'),
        U.h('button', { class: 'btn', onclick: () => { exportStepsSvg(board, content); U.toast('已导出装配步骤图（SVG）'); } }, '⤓ 装配步骤图（SVG）— 课程讲义'),
        U.h('button', { class: 'btn', onclick: () => { exportDocJson(board, content, name); } }, '⤓ 完整说明包（JSON）'),
        U.h('button', { class: 'btn', onclick: () => {
          const handle = openPreview({ board, content, title: `${board.name} · 预览`, subtitle: board.work ? `Rev ${board.work.rev}` : '已发布快照' });
          app.previewClose = () => handle.close();
        } }, '▸ 分步播放预览'),
        U.h('p', { class: 'hint', style: { margin: 0 } }, '引脚清单包含名称 / 电压 / 复用功能 / 所在图层；步骤图按当前顺序排版，含操作提示。')
      ),
    });
  }

  /* ---------------- bottom panel ---------------- */
  function renderBottom() {
    U.clear(bottom);
    const conflicts = findConflicts(content);
    const checks = publishChecks(board, content);
    const openReviews = (board.reviews || []).filter((r) => r.status !== 'approved');
    const tabBtn = (key, label, badgeText, badgeCls) =>
      U.h('button', { class: state.bottomTab === key ? 'active' : '', onclick: () => { state.bottomTab = key; renderBottom(); } },
        U.h('span', {}, label),
        U.h('span', { class: 'badge ' + (badgeCls || '') }, badgeText),
        U.h('span', { style: { flex: 1 } })
      );
    const tabs = U.h('div', { class: 'bottom-tabs' },
      tabBtn('conflicts', '功能冲突', String(conflicts.length), conflicts.length ? 'red' : ''),
      tabBtn('checks', '发布检查', String(checks.blockers.length + checks.warnings.length), checks.blockers.length ? 'red' : checks.warnings.length ? 'amber' : ''),
      tabBtn('reviews', '评审记录', String((board.reviews || []).length), openReviews.length ? 'amber' : '')
    );
    bottom.appendChild(tabs);
    const main = U.h('div', { class: 'bottom-main' });
    bottom.appendChild(main);

    if (state.bottomTab === 'conflicts') {
      if (!conflicts.length) {
        main.appendChild(U.h('div', { class: 'ok-row' }, '✓ 没有重复占用的复用功能；同一引脚上重复填写同一功能时会即时提示。'));
      } else {
        const list = U.h('div', { class: 'conflict-list' });
        conflicts.forEach((c) => {
          list.appendChild(U.h('div', { class: 'conflict-card' },
            U.h('div', { class: 'why' }, U.h('b', {}, c.pinName), ` 的「${c.name}」重复占用 ${c.count} 次`),
            U.h('button', { class: 'btn small', onclick: () => { state.rightTab = 'pins'; state.selectedPinId = c.pinId; renderRight(); const p = content.pins.find((x) => x.id === c.pinId); if (p) renderer.focusPin(p); } }, '定位并处理'),
            U.h('button', { class: 'btn small danger', disabled: !store.canEdit(board), title: store.canEdit(board) ? '' : '当前草稿只读', onclick: () => dedupe(c) }, '一键去重')
          ));
        });
        main.appendChild(list);
      }
      const complete = content.pins.filter((p) => pinAnnotation(p).complete).length;
      const ratio = content.pins.length ? complete / content.pins.length : 0;
      main.appendChild(U.h('div', { class: 'row-stats' },
        U.h('span', {}, `已标注 ${complete}/${content.pins.length}（${U.fmtPct(ratio)}）`),
        U.h('span', {}, `${unlabeledVoltagePins(content).length} 个未标电压`),
        U.h('span', {}, `平均审核 ${statsAvg(board)}`)
      ));
    } else if (state.bottomTab === 'checks') {
      if (!checks.blockers.length && !checks.warnings.length) {
        main.appendChild(U.h('div', { class: 'ok-row' }, '✓ 发布检查全部通过'));
      } else {
        const list = U.h('div', { class: 'conflict-list' });
        if (checks.blockers.length) {
          list.appendChild(U.h('b', { style: { fontSize: '11.5px', color: 'var(--red)', letterSpacing: '.4px' } }, `阻断项 ${checks.blockers.length}`));
          checks.blockers.forEach((b) => {
            list.appendChild(U.h('div', { class: 'issue blocking', style: { marginBottom: '0' } },
              U.h('div', { class: 'body' }, U.h('b', {}, b.title), U.h('small', {}, b.detail)),
              U.h('div', { class: 'act' }, U.h('button', { class: 'btn small', onclick: () => gotoIssue(b) }, '去处理'))));
          });
        }
        if (checks.warnings.length) {
          list.appendChild(U.h('b', { style: { fontSize: '11.5px', color: 'var(--amber)', letterSpacing: '.4px', marginTop: '6px' } }, `提醒 ${checks.warnings.length}`));
          checks.warnings.slice(0, 30).forEach((b) => {
            list.appendChild(U.h('div', { class: 'issue', style: { marginBottom: '0' } },
              U.h('div', { class: 'body' }, U.h('b', {}, b.title), U.h('small', {}, b.detail)),
              U.h('div', { class: 'act' }, U.h('button', { class: 'btn small', onclick: () => gotoIssue(b) }, '去处理'))));
          });
        }
        main.appendChild(list);
      }
    } else {
      if (!(board.reviews || []).length) {
        main.appendChild(U.h('div', { class: 'ok-row', style: { color: 'var(--fg-3)' } }, '还没有提交过评审。'));
      } else {
        const list = U.h('div', { class: 'conflict-list' });
        [...board.reviews].reverse().forEach((r) => {
          list.appendChild(U.h('div', { class: 'rv-strip' },
            U.h('span', { class: 'tag ' + (r.status === 'approved' ? 'green' : r.status === 'rejected' ? 'red' : 'blue') },
              { approved: '通过', rejected: '已退回', in_review: '审核中' }[r.status]),
            U.h('span', {}, `Rev ${r.rev} · ${r.submittedBy} · ${U.rel(r.submittedAt)}`),
            U.h('span', { class: 'muted', style: { marginLeft: 'auto' } }, `${r.comments.length} 条批注${r.decidedBy ? ' · ' + r.decidedBy : ''}`),
            U.h('button', { class: 'btn small', onclick: () => nav(`#/review/${r.id}`) }, r.status === 'in_review' ? '去评审' : '查看')
          ));
        });
        main.appendChild(list);
      }
    }
  }

  function statsAvg(b) {
    const stats = boardStats(b);
    return stats.avgReview ? U.fmtDuration(stats.avgReview) : '—';
  }

  function dedupe(c) {
    if (!store.canEdit(board)) { U.toast('当前草稿不可编辑', 'warn'); return; }
    store.mutate(board, (cont) => {
      const p = cont.pins.find((x) => x.id === c.pinId);
      const seen = new Set();
      p.funcs = p.funcs.filter((f) => {
        const k = String(f.label || '').trim().toLowerCase();
        if (!k) return true;
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      });
    }, 'dedupe');
    U.toast('已清除重复功能');
  }

  function gotoIssue(b) {
    if (b.targetType === 'pin') {
      state.rightTab = 'pins';
      state.selectedPinId = b.targetId;
      renderRight();
      const p = content.pins.find((x) => x.id === b.targetId);
      if (p) { renderer.focusPin(p); selectPin(p.id); }
    } else if (b.targetType === 'step') {
      state.leftTab = 'steps';
      state.rightTab = 'steps';
      state.selectedStepId = b.targetId;
      refreshAll();
    }
  }

  /* ---------------- step play in scene ---------------- */
  function setViewMode(m) {
    state.viewMode = m;
    if (renderer.ok) {
      if (m === 'steps') {
        state.stepIndex = Math.min(state.stepIndex, (content.steps || []).length - 1);
        if (state.stepIndex < 0) state.stepIndex = 0;
        applyStepState(true);
      } else {
        const offs = {};
        content.layers.forEach((l) => (offs[l.id] = { y: 0, alpha: 1, instant: true }));
        renderer.applyStepLayout(offs, null);
        renderer.setState({ stepLayerIds: new Set() });
      }
    }
    renderToolbar();
    renderStepBar();
    updateHint();
  }
  function applyStepState(instant) {
    if (!(content.steps || []).length) return;
    const offs = stepOffsets(content, state.stepIndex);
    for (const k of Object.keys(offs)) offs[k].instant = !!instant;
    renderer.applyStepLayout(offs, null);
    const cur = content.steps[state.stepIndex];
    renderer.setState({ stepLayerIds: new Set(cur.layerIds || []) });
  }
  function playStep(i) {
    state.stepIndex = i;
    if (state.viewMode !== 'steps') {
      state.viewMode = 'steps';
      setViewMode('steps');
    } else {
      applyStepState(false);
    }
    renderStepBar();
    renderToolbar();
  }
  function renderStepBar() {
    U.clear(stepBar);
    if (state.viewMode !== 'steps' || !(content.steps || []).length) {
      stepBar.style.display = 'none';
      return;
    }
    stepBar.style.display = 'flex';
    const steps = content.steps;
    const cur = steps[state.stepIndex];
    stepBar.appendChild(U.h('button', { class: 'icon-btn', onclick: () => { state.stepIndex = Math.max(0, state.stepIndex - 1); applyStepState(false); renderStepBar(); } }, '◀'));
    stepBar.appendChild(U.h('button', { class: 'icon-btn', onclick: () => { state.stepIndex = Math.min(steps.length - 1, state.stepIndex + 1); applyStepState(false); renderStepBar(); } }, '▶'));
    stepBar.appendChild(U.h('span', { class: 'pc' }, `${state.stepIndex + 1}/${steps.length}`));
    stepBar.appendChild(U.h('div', { class: 'prog' },
      U.h('div', { class: 'txt' }, `${cur.action === 'install' ? '安装' : '拆卸'} · ${cur.title || '(未命名)'}`),
      U.h('div', { class: 'txt muted', style: { fontSize: '10.5px' } }, cur.note || '')
    ));
    stepBar.appendChild(U.h('button', { class: 'btn small', onclick: () => setViewMode('edit') }, '返回编辑'));
  }
  function updateHint() {
    hint.textContent = state.viewMode === 'steps' ? '分步播放：拖动查看每步的零件位置变化 · Esc 退出' : defaultHint();
  }

  function openFullPreview() {
    const v = store.latestVersion(board);
    const title = board.work ? `${board.name} · 草稿 Rev ${board.work.rev}` : `${board.name} · ${v?.label || ''}`;
    const handle = openPreview({ board, content, title, subtitle: board.work ? '当前草稿预览（未发布）' : `${v?.firmware || ''} · 已发布快照` });
    app.previewClose = () => handle.close();
  }

  /* ---------------- labels overlay ---------------- */
  function updateLabels() {
    if (!state.showLabels || !renderer.ok) {
      U.clear(labelsLayer);
      return;
    }
    U.clear(labelsLayer);
    const conflicts = conflictPinSet(content);
    const taken = [];
    const order = [...content.pins].sort((a, b) => {
      const pa = pinPriority(a), pb = pinPriority(b);
      return pb - pa;
    });
    function pinPriority(p) {
      let v = 0;
      if (state.highlightGroups.has(p.group)) v += 2;
      if (conflicts.has(p.id)) v += 3;
      if (p.id === state.selectedPinId) v += 5;
      return v;
    }
    for (const p of order) {
      const s = renderer.pinScreenPos(p);
      if (!s.visible) continue;
      if (s.x < -40 || s.y < -20 || s.x > renderer.cssW + 40 || s.y > renderer.cssH + 20) continue;
      const text = p.name || '—';
      const w = Math.max(22, text.length * 7 + 10), h = 14;
      const bx = s.x - w / 2, by = s.y - 24;
      if (taken.some((r) => bx < r.x + r.w && bx + w > r.x && by < r.y + r.h && by + h > r.y)) continue;
      taken.push({ x: bx, y: by, w, h });
      const dim = state.highlightGroups.size > 0 && !state.highlightGroups.has(p.group);
      labelsLayer.appendChild(U.h('span', {
        class: 'pin-label' + (dim ? ' dim' : '') + (conflicts.has(p.id) ? ' bad' : ''),
        style: { left: s.x + 'px', top: s.y + 'px', borderColor: groupColor(p.group), color: dim ? 'var(--fg-3)' : groupColor(p.group) },
      }, text));
    }
  }
  const labelTick = setInterval(() => updateLabels(), 130);

  /* ---------------- refresh ---------------- */
  let rafPending = false;
  function renderStackInfo() {
    const layers = content.layers || [];
    const visible = layers.filter((l) => l.visible !== false);
    const rows = visible.map((l) => `<div>${U.esc(l.name)}</div>`).join('');
    stackInfo.innerHTML =
      `<div style="color:var(--fg-2);margin-bottom:2px">${U.esc(board.name)}</div>` +
      (rows || '<div class="muted">无可见图层</div>') +
      `<div style="margin-top:4px;color:var(--fg-3)">${(content.pins || []).length} 热点 · ${(content.steps || []).length} 步</div>`;
  }

  function refreshAll(opts) {
    U.clear(readonlyBanner);
    const rendererState = { highlightGroups: state.highlightGroups, conflictPins: state.showConflicts === false ? new Set() : conflictPinSet(content), stepLayerIds: state.viewMode === 'steps' ? new Set((content.steps?.[state.stepIndex]?.layerIds) || []) : new Set() };
    if (renderer.ok) renderer.setContent(board, content, rendererState);
    renderLeft();
    renderRight();
    renderBottom();
    renderToolbar();
    renderStackInfo();
    updateHint();
    if (state.viewMode === 'steps') applyStepState(true);
    if (opts && opts.focusPinId) {
      state.selectedPinId = opts.focusPinId;
      renderPinList();
      renderPinDetail();
    }
  }
  function refreshLight() {
    if (renderer.ok) {
      renderer.syncLive(content);
      renderer.setState({ conflictPins: state.showConflicts === false ? new Set() : conflictPinSet(content) });
    }
    const list = document.getElementById('pin-list');
    if (list) renderPinList();
    renderBottom();
    renderStackInfo();
  }

  const unsub = store.subscribe((reason) => {
    if (!store.board(board.id)) { nav('#/boards'); return; }
    if (reason === 'live') { refreshLight(); return; }
    if (reason === 'user') { renderToolbar(); return; }
    refreshAll();
  });
  app.forceRender = () => refreshAll();

  /* ---------------- loop ---------------- */
  let last = 0;
  let raf = 0;
  function loop(t) {
    const dt = Math.min(0.05, (t - last) / 1000 || 0.016);
    last = t;
    if (renderer.ok) {
      renderer.resize();
      renderer.frame(dt);
    }
    raf = requestAnimationFrame(loop);
  }

  renderToolbar();
  hint.textContent = defaultHint();
  refreshAll();
  if (renderer.ok) raf = requestAnimationFrame(loop);

  const onKey = (e) => {
    if (e.target.matches('input, textarea, select')) return;
    if (e.key === 'Escape' && state.viewMode === 'steps') setViewMode('edit');
    if (e.key === 'Delete' && state.selectedPinId && state.rightTab === 'pins') {
      U.confirm('删除引脚', '确认删除选中的引脚热点？', '删除', () => { store.removePin(board, state.selectedPinId); state.selectedPinId = null; refreshAll(); }, true);
    }
  };
  window.addEventListener('keydown', onKey);

  return {
    cleanup() {
      unsub();
      cancelAnimationFrame(raf);
      clearInterval(labelTick);
      window.removeEventListener('keydown', onKey);
      if (renderer.ro) renderer.ro.disconnect();
      app.forceRender = null;
      root.remove();
    },
  };
}

/* ---------- helpers ---------- */
function tagForStatus(board) {
  if (!board.work) return board.versions?.length ? 'violet' : 'off';
  return { draft: 'amber', in_review: 'blue', rejected: 'red', approved: 'green' }[board.work.status] || 'off';
}
