<script>
  import { onMount, onDestroy } from 'svelte';
  import * as THREE from 'three';
  import { createScene, createMarker, disposeMarker } from '../lib/geometry.js';
  import { downloadBlob } from '../lib/utils.js';

  let container = $state(null);
  let api = null;
  let downPos = null;
  let markers = [];

  let {
    moles = [],
    findings = [],
    flaggedIds = $bindable([]),
    selectedId = $bindable(null),
    pickMode = false,
    opacity = 1,
    onpick = null
  } = $props();

  const MARKER_COLORS = {
    flag: 0xf0b429,
    selected: 0x4f8cff,
    normal: 0x37b26c,
    removed: 0x6b7c95
  };

  function colorFor(mole) {
    if (mole.removed) return MARKER_COLORS.removed;
    if (mole.id === selectedId) return MARKER_COLORS.selected;
    if (flaggedIds.includes(mole.id)) return MARKER_COLORS.flag;
    return MARKER_COLORS.normal;
  }

  function rebuildMarkers() {
    if (!api) return;
    for (const m of markers) {
      api.markerLayer.remove(m.group);
      disposeMarker(m.group);
    }
    markers = [];
    for (const mole of moles) {
      const sp = api.surfacePoint(mole.partId, mole.u, mole.v);
      if (!sp) continue;
      const g = createMarker(mole.code, '#' + new THREE.Color(colorFor(mole)).getHexString());
      g.position.copy(sp.point).addScaledVector(sp.normal, 0.004);
      g.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), sp.normal);
      g.userData.moleId = mole.id;
      api.markerLayer.add(g);
      markers.push({ group: g, moleId: mole.id });
    }
  }

  $effect(() => {
    // 依赖
    moles;
    findings;
    flaggedIds;
    selectedId;
    rebuildMarkers();
  });

  $effect(() => {
    api?.setOpacity(opacity);
  });

  onMount(() => {
    api = createScene(container);
    rebuildMarkers();
    const el = api.renderer.domElement;
    el.addEventListener('pointerdown', (e) => {
      downPos = { x: e.clientX, y: e.clientY };
    });
    el.addEventListener('pointerup', (e) => {
      if (!downPos) return;
      const moved = Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y);
      downPos = null;
      if (moved > 6) return; // 拖拽旋转，不当作点击
      const hit = api.pickSurface(e.clientX, e.clientY);
      if (!hit) return;
      if (pickMode && onpick) onpick(hit);
      else {
        // 点中已有标记 → 选中
        const found = markers.find((m) => {
          const d = m.group.position.distanceTo(hit.point);
          return d < 0.03;
        });
        if (found) selectedId = found.moleId;
      }
    });
  });

  onDestroy(() => {
    api?.dispose();
    api = null;
  });

  function frame(side) {
    api.frame(side);
  }
  function shot() {
    const url = api.exportPNG();
    fetch(url)
      .then((r) => r.blob())
      .then((b) => downloadBlob(b, `三维痣图_${new Date().toISOString().slice(0, 10)}.png`));
  }
</script>

<div class="viewer-wrap">
  <div class="toolbar">
    <button class="sm" onclick={() => frame('front')}>正面</button>
    <button class="sm" onclick={() => frame('back')}>背面</button>
    <button class="sm" onclick={() => frame('left')}>左侧</button>
    <button class="sm" onclick={() => frame('right')}>右侧</button>
    <span class="sep"></span>
    <label class="inline small muted">
      模型透明度
      <input type="range" min="0.35" max="1" step="0.05" bind:value={opacity} />
    </label>
    <span class="sep"></span>
    <button class="sm" onclick={shot}>导出痣图 PNG</button>
    {#if pickMode}
      <span class="badge info">定位模式：点击模型表面放置新痣</span>
    {/if}
    <span class="spacer"></span>
    <span class="small muted"><span class="dot green"></span>普通</span>
    <span class="small muted"><span class="dot yellow"></span>标黄</span>
    <span class="small muted"><span class="dot blue"></span>选中</span>
    <span class="small muted"><span class="dot gray"></span>已切除</span>
  </div>
  <div class="canvas-host" bind:this={container}></div>
</div>

<style>
  .viewer-wrap { height: 100%; display: flex; flex-direction: column; min-height: 420px; }
  .toolbar {
    display: flex; gap: 8px; align-items: center; flex-wrap: wrap;
    padding: 8px 10px; background: var(--panel); border: 1px solid var(--border);
    border-radius: 10px 10px 0 0; border-bottom: none;
  }
  .sep { width: 1px; height: 20px; background: var(--border); }
  .spacer { flex: 1; }
  .inline { display: flex; align-items: center; gap: 6px; }
  .inline input { width: 110px; }
  .canvas-host { flex: 1; min-height: 380px; border: 1px solid var(--border); border-radius: 0 0 10px 10px; overflow: hidden; }
  .canvas-host :global(canvas) { display: block; }
</style>
