<script>
  import { onMount, onDestroy } from 'svelte';
  import * as THREE from 'three';
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
  import { alignment, ramps, results, selectedId, addMode } from './store.js';
  import { addRamp, updateRampStake, commitMove } from './store.js';
  import { stakeText, STATUS } from './calc.js';

  let container;
  let renderer, scene, camera, controls, raycaster;
  let terrainMesh = null, roadMesh = null;
  let rampGroup, labelGroup;
  let dragId = null, dragFrom = 0;
  let hoverId = null;

  const unsubs = [];

  onMount(() => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0d1520);
    scene.fog = new THREE.Fog(0x0d1520, 3000, 14000);

    camera = new THREE.PerspectiveCamera(55, 1, 1, 40000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.maxPolarAngle = Math.PI * 0.49;

    scene.add(new THREE.HemisphereLight(0xbfd4ff, 0x2a2118, 0.9));
    const sun = new THREE.DirectionalLight(0xfff2dd, 1.4);
    sun.position.set(3000, 5000, 2000);
    scene.add(sun);

    rampGroup = new THREE.Group();
    labelGroup = new THREE.Group();
    scene.add(rampGroup, labelGroup);

    raycaster = new THREE.Raycaster();

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    unsubs.push(alignment.subscribe(a => { rebuildStatic(a); rebuildRamps(); }));
    unsubs.push(ramps.subscribe(() => rebuildRamps()));
    unsubs.push(results.subscribe(() => rebuildRamps()));
    unsubs.push(selectedId.subscribe(() => rebuildRamps()));

    renderer.setAnimationLoop(() => {
      controls.update();
      renderer.render(scene, camera);
    });
  });

  onDestroy(() => {
    unsubs.forEach(u => u());
    renderer?.setAnimationLoop(null);
    renderer?.dispose();
  });

  function resize() {
    if (!renderer || !container) return;
    const w = container.clientWidth || 1, h = container.clientHeight || 1;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  // ---------- 地形与主线 ----------
  function rebuildStatic(pts) {
    if (!pts || pts.length < 2) return;
    if (terrainMesh) { scene.remove(terrainMesh); disposeObj(terrainMesh); terrainMesh = null; }
    if (roadMesh) { scene.remove(roadMesh); disposeObj(roadMesh); roadMesh = null; }
    labelGroup.clear();

    let minX = 1e9, maxX = -1e9, minZ = 1e9, maxZ = -1e9;
    for (const p of pts) {
      minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x);
      minZ = Math.min(minZ, p.z); maxZ = Math.max(maxZ, p.z);
    }
    const pad = 500;
    minX -= pad; maxX += pad; minZ -= pad; maxZ += pad;

    // 地形网格: 以最近主线点高程为基准,横坡一侧抬升一侧下切,叠加起伏噪声
    const nx = 140, nz = 140;
    const geo = new THREE.PlaneGeometry(maxX - minX, maxZ - minZ, nx, nz);
    geo.rotateX(-Math.PI / 2);
    geo.translate((minX + maxX) / 2, 0, (minZ + maxZ) / 2);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i), vz = pos.getZ(i);
      let best = null, bd = Infinity;
      for (const p of pts) {
        const d = (p.x - vx) ** 2 + (p.z - vz) ** 2;
        if (d < bd) { bd = d; best = p; }
      }
      const dist = Math.sqrt(bd);
      const side = Math.sign(Math.cos(best.heading) * (vx - best.x) - Math.sin(best.heading) * (vz - best.z)) || 1;
      const noise = 10 * Math.sin(vx * 0.008) * Math.cos(vz * 0.011) + 5 * Math.sin(vx * 0.025 + vz * 0.02);
      const blend = Math.min(1, dist / 80);
      const h = best.y + blend * (side > 0 ? dist * 0.85 : -dist * 1.1) + blend * noise;
      pos.setY(i, h);
    }
    geo.computeVertexNormals();
    terrainMesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0x3d5a3a, roughness: 1 }));
    scene.add(terrainMesh);

    // 主线 ribbon
    roadMesh = makeRibbon(pts, 12, 0.4, new THREE.MeshStandardMaterial({ color: 0x2b2f36, roughness: 0.9 }));
    scene.add(roadMesh);

    // 公里桩标注
    for (let i = 0; i < pts.length; i += Math.round(1000 / (pts[1].stakeM - pts[0].stakeM || 20))) {
      const p = pts[i];
      const s = makeLabel(stakeText(p.stakeM), '#cfe3ff');
      s.position.set(p.x, p.y + 18, p.z);
      labelGroup.add(s);
    }

    // 相机取景
    const cx = (minX + maxX) / 2, cz = (minZ + maxZ) / 2;
    const midY = pts[Math.floor(pts.length / 2)].y;
    const span = Math.max(maxX - minX, maxZ - minZ);
    controls.target.set(cx, midY, cz);
    camera.position.set(cx + span * 0.45, midY + span * 0.5, cz + span * 0.45);
  }

  function makeRibbon(pts, width, lift, material, gradePct = 0) {
    const verts = [], idx = [];
    let yOff = 0;
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const q = pts[Math.min(i + 1, pts.length - 1)];
      const dx = q.x - p.x, dz = q.z - p.z;
      const len = Math.hypot(dx, dz) || 1;
      const px = -dz / len, pz = dx / len;
      if (i > 0) yOff += (gradePct / 100) * Math.hypot(p.x - pts[i - 1].x, p.z - pts[i - 1].z);
      verts.push(p.x + px * width / 2, p.y + lift + yOff, p.z + pz * width / 2);
      verts.push(p.x - px * width / 2, p.y + lift + yOff, p.z - pz * width / 2);
      if (i > 0) {
        const a = (i - 1) * 2;
        idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return new THREE.Mesh(g, material);
  }

  // ---------- 避险车道 ----------
  function nearestIndex(pts, stakeM) {
    let lo = 0, hi = pts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (pts[mid].stakeM < stakeM) lo = mid + 1; else hi = mid;
    }
    return lo;
  }

  function rebuildRamps() {
    if (!rampGroup) return;
    const pts = alignmentRef;
    rampGroup.clear();
    if (!pts || pts.length < 2) return;
    const rampList = rampsRef, resMap = resultsRef;
    for (const r of rampList) {
      const res = resMap[r.id];
      if (!res) continue;
      const i0 = nearestIndex(pts, r.stakeM);
      const p0 = pts[i0];
      // 引道+制动床中心线: 自主线向右偏出 35°,沿制动床纵坡爬升
      const ang = p0.heading - 0.6;
      const dir = { x: Math.sin(ang), z: Math.cos(ang) };
      const step = 10;
      const n = Math.max(2, Math.ceil(res.L_design / step));
      const bedPts = [];
      for (let k = 0; k <= n; k++) {
        const d = Math.min(k * step, res.L_design);
        bedPts.push({
          x: p0.x + dir.x * d, z: p0.z + dir.z * d,
          y: p0.y + (res.bedGrade / 100) * d
        });
      }
      const bad = res.errors.length > 0;
      const color = bad ? 0xef4444 : parseInt(STATUS[r.status].color.slice(1), 16);
      const bed = makeRibbon(bedPts, res.width, 0.5,
        new THREE.MeshStandardMaterial({ color, roughness: 0.8, transparent: true, opacity: 0.92 }));
      bed.userData.rampId = r.id;
      rampGroup.add(bed);

      // 端部防撞端墙
      const end = bedPts[bedPts.length - 1];
      const wall = new THREE.Mesh(
        new THREE.BoxGeometry(res.width, 4, 1.5),
        new THREE.MeshStandardMaterial({ color: 0x8a8f98 }));
      wall.position.set(end.x, end.y + 2, end.z);
      wall.rotation.y = ang;
      rampGroup.add(wall);

      // 引道口拖放标记(锥体)
      const sel = r.id === selectedRef;
      const marker = new THREE.Mesh(
        new THREE.ConeGeometry(sel ? 7 : 5, sel ? 16 : 12, 12),
        new THREE.MeshStandardMaterial({ color: sel ? 0xffffff : color, emissive: sel ? 0x666666 : 0x000000 }));
      marker.position.set(p0.x, p0.y + 10, p0.z);
      marker.userData.rampId = r.id;
      marker.userData.marker = true;
      rampGroup.add(marker);

      const label = makeLabel(
        `${r.name} ${stakeText(r.stakeM)}\n${bad ? '⚠ ' + res.errors.length + '项问题' : 'L=' + res.L_design + 'm'}`,
        bad ? '#ff9a9a' : '#d7f5d7');
      label.position.set(p0.x, p0.y + 34, p0.z);
      label.userData.rampId = r.id;
      rampGroup.add(label);
    }
  }

  function makeLabel(text, color = '#ffffff') {
    const lines = text.split('\n');
    const cv = document.createElement('canvas');
    cv.width = 512; cv.height = 64 * lines.length;
    const ctx = cv.getContext('2d');
    ctx.fillStyle = 'rgba(10,16,24,0.72)';
    ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.font = 'bold 40px "Microsoft YaHei", sans-serif';
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    lines.forEach((ln, i) => ctx.fillText(ln, 256, 48 + i * 64));
    const tex = new THREE.CanvasTexture(cv);
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false }));
    sp.scale.set(150, 30 * lines.length, 1);
    return sp;
  }

  function disposeObj(o) {
    o.traverse?.(c => { c.geometry?.dispose?.(); c.material?.dispose?.(); });
  }

  // ---------- 交互 ----------
  let alignmentRef = [], rampsRef = [], resultsRef = {}, selectedRef = null, addModeRef = false;
  unsubsPushLater();
  function unsubsPushLater() {
    unsubs.push(alignment.subscribe(a => { alignmentRef = a; }));
    unsubs.push(ramps.subscribe(r => { rampsRef = r; }));
    unsubs.push(results.subscribe(r => { resultsRef = r; }));
    unsubs.push(selectedId.subscribe(s => { selectedRef = s; }));
    unsubs.push(addMode.subscribe(m => { addModeRef = m; }));
  }

  function pointerNDC(e) {
    const rect = renderer.domElement.getBoundingClientRect();
    return new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1);
  }

  function nearestStake(point) {
    let bd = Infinity, bs = 0;
    for (const p of alignmentRef) {
      const d = (p.x - point.x) ** 2 + (p.z - point.z) ** 2;
      if (d < bd) { bd = d; bs = p.stakeM; }
    }
    return bs;
  }

  function onPointerDown(e) {
    if (e.button !== 0) return;
    raycaster.setFromCamera(pointerNDC(e), camera);
    const hits = raycaster.intersectObjects(rampGroup.children, true);
    const hit = hits.find(h => {
      let o = h.object;
      while (o) { if (o.userData?.rampId) return true; o = o.parent; }
      return false;
    });
    if (hit) {
      let o = hit.object;
      while (o && !o.userData?.rampId) o = o.parent;
      const id = o.userData.rampId;
      selectedId.set(id);
      if (o.userData.marker || hit.object.userData.marker) {
        dragId = id;
        dragFrom = rampsRef.find(r => r.id === id)?.stakeM ?? 0;
        controls.enabled = false;
      }
      return;
    }
    // 添加模式: 点击主线/地形布设新避险车道
    if (addModeRef) {
      const targets = [roadMesh, terrainMesh].filter(Boolean);
      const g = raycaster.intersectObjects(targets, false)[0];
      if (g) addRamp(nearestStake(g.point));
    }
  }

  function onPointerMove(e) {
    if (!dragId) return;
    raycaster.setFromCamera(pointerNDC(e), camera);
    const targets = [roadMesh, terrainMesh].filter(Boolean);
    const g = raycaster.intersectObjects(targets, false)[0];
    if (g) updateRampStake(dragId, nearestStake(g.point));
  }

  function onPointerUp() {
    if (dragId) {
      commitMove(dragId, dragFrom);
      dragId = null;
      controls.enabled = true;
    }
  }
</script>

<div class="viewport" bind:this={container}></div>

<style>
  .viewport { position: absolute; inset: 0; }
  .viewport :global(canvas) { display: block; }
</style>
