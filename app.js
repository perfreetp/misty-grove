/* =====================================================================
 * 高速公路服务区危化品车辆分区停放与巡查系统
 * 纯前端实现：Three.js r128 + localStorage，无构建依赖
 * ===================================================================*/
'use strict';

/* ---------------- 常量与规则 ---------------- */
const STORAGE_KEY = 'hazmat_service_area_v1';
const TYPES = {
  hazmat: { label: '危化品车位', color: 0xf59e0b, css: '#f59e0b', spotW: 4.2, spotL: 15, pitch: 4.9, vehicleLabel: '危化品车辆' },
  truck:  { label: '普通货车位', color: 0x8b5cf6, css: '#8b5cf6', spotW: 3.6, spotL: 12, pitch: 4.2, vehicleLabel: '普通货车' },
  car:    { label: '小车位',     color: 0x10b981, css: '#10b981', spotW: 2.7, spotL: 5.2, pitch: 3.3, vehicleLabel: '小车' },
};
const MEDIA_OPTIONS = ['汽油', '柴油', '甲醇', '液化天然气(LNG)', '液氯', '液氨', '其他'];
const DEFAULT_RULES = {
  minHazmatSpots: 6,
  minTruckSpots: 10,
  minCarSpots: 15,
  minHazmatToGas: 30,        // 危化品车位距加油站下限（米）
  minHazmatToRestaurant: 25, // 危化品车位距餐厅下限（米）
  maxStayMinutes: 60,        // 免费/规定停放时长上限
};
const SCENE = { w: 150, d: 110 };

let state = null;
let currentRole = 'admin';
let currentTab = null;
let layoutMode = false;     // 管理员布置模式（可拖拽/旋转）
let addZoneType = null;     // 正在新增的分区类型
let selectedGizmoObject = null;

/* ---------------- 工具函数 ---------------- */
const $ = sel => document.querySelector(sel);
const uid = p => p + '_' + Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
const pad2 = n => String(n).padStart(2, '0');
function fmtDateTime(ts) {
  if (!ts) return '—';
  const d = new Date(ts);
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}
function fmtTime(ts) {
  const d = new Date(ts);
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}
function fmtDuration(ms) {
  if (ms == null || isNaN(ms)) return '—';
  const min = Math.max(0, Math.round(ms / 60000));
  if (min < 60) return `${min} 分钟`;
  const h = Math.floor(min / 60), m = min % 60;
  return m ? `${h} 小时 ${m} 分` : `${h} 小时`;
}
function isSameVirtualDay(ts) {
  const a = new Date(virtualNow()), b = new Date(ts);
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function currentShift(ts) {
  const h = new Date(ts ?? virtualNow()).getHours();
  return (h >= 8 && h < 20) ? 'day' : 'night';
}
function shiftLabel(s) { return s === 'day' ? '白班 (08:00-20:00)' : '夜班 (20:00-08:00)'; }
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function toast(msg, kind = '') {
  const t = $('#toast');
  t.textContent = msg;
  t.className = kind;
  t.hidden = false;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => { t.hidden = true; }, 2600);
}
function openModal(title, bodyHTML) {
  $('#modalTitle').textContent = title;
  $('#modalBody').innerHTML = bodyHTML;
  $('#modalMask').hidden = false;
  return $('#modalBody');
}
function closeModal() { $('#modalMask').hidden = true; }
$('#modalClose').addEventListener('click', closeModal);
$('#modalMask').addEventListener('pointerdown', e => { if (e.target.id === 'modalMask') closeModal(); });

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { console.warn('持久化失败', e); }
}
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) { state = JSON.parse(raw); return true; }
  } catch (e) { console.warn('读取失败', e); }
  return false;
}

/* ---------------- 虚拟时钟（支持倍速演练） ---------------- */
function virtualNow() { return Date.now() + (state?.simOffsetMs || 0); }
setInterval(() => {
  if (!state) return;
  state.simOffsetMs += ((state.simSpeed || 1) - 1) * 500;
  const d = new Date(virtualNow());
  $('#simTime').textContent =
    `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
}, 500);
document.querySelectorAll('.speed-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    state.simSpeed = Number(btn.dataset.speed);
    document.querySelectorAll('.speed-btn').forEach(b => b.classList.toggle('active', b === btn));
    saveState();
    toast(`模拟倍速已切换为 ${state.simSpeed}×`);
  });
});

/* ---------------- 演示数据 ---------------- */
function buildSeedData() {
  const now = Date.now();
  const min = 60000;
  const rules = { ...DEFAULT_RULES };
  const zones = [
    { id: 'zone_h1', name: '危化品停放区 A', type: 'hazmat', x: 0, z: 30, rot: 0, cols: 8,
      spots: Array.from({ length: 8 }, (_, i) => ({ id: `spot_h1_${i}`, index: i, vehicleId: null })) },
    { id: 'zone_t1', name: '普通货车区 B', type: 'truck', x: -32, z: 2, rot: 0, cols: 12,
      spots: Array.from({ length: 12 }, (_, i) => ({ id: `spot_t1_${i}`, index: i, vehicleId: null })) },
    { id: 'zone_c1', name: '小车停放区 C', type: 'car', x: 34, z: 6, rot: 0, cols: 20,
      spots: Array.from({ length: 20 }, (_, i) => ({ id: `spot_c1_${i}`, index: i, vehicleId: null })) },
  ];
  const landmarks = [
    { id: 'lm_gas', kind: 'gas', name: '加油站', x: -48, z: -32 },
    { id: 'lm_rest', kind: 'restaurant', name: '餐厅', x: 42, z: -34 },
  ];
  const vehicles = [
    { id: 'v1', plate: '鲁A·D8266', media: '汽油', escort: '王建国', type: 'hazmat', zoneId: 'zone_h1', spotId: 'spot_h1_0',
      entryTs: now - 75 * min, plannedExitTs: now - 15 * min, status: 'parked', exitTs: null, note: '' },
    { id: 'v2', plate: '鲁B·H5190', media: '液化天然气(LNG)', escort: '李志强', type: 'hazmat', zoneId: 'zone_h1', spotId: 'spot_h1_1',
      entryTs: now - 30 * min, plannedExitTs: now + 30 * min, status: 'parked', exitTs: null, note: '' },
    { id: 'v3', plate: '京A·T3372', media: '', escort: '', type: 'truck', zoneId: 'zone_t1', spotId: 'spot_t1_0',
      entryTs: now - 40 * min, plannedExitTs: now + 20 * min, status: 'parked', exitTs: null, note: '' },
    { id: 'v4', plate: '冀F·9K218', media: '柴油', escort: '赵伟', type: 'hazmat', zoneId: 'zone_t1', spotId: 'spot_t1_1',
      entryTs: now - 25 * min, plannedExitTs: now + 35 * min, status: 'parked', exitTs: null, note: '演示：停错区域' },
    { id: 'v5', plate: '浙C·62X81', media: '', escort: '', type: 'car', zoneId: 'zone_c1', spotId: 'spot_c1_0',
      entryTs: now - 12 * min, plannedExitTs: now + 48 * min, status: 'parked', exitTs: null, note: '' },
  ];
  zones.forEach(z => z.spots.forEach(s => {
    const v = vehicles.find(vv => vv.spotId === s.id);
    if (v) s.vehicleId = v.id;
  }));
  const alerts = [
    { id: 'al1', ts: now - 15 * min, type: 'overtime', level: 'high', title: '危化品车辆超时未离场',
      detail: '鲁A·D8266（汽油）已停放 75 分钟，超过 60 分钟上限', vehicleId: 'v1', zoneId: 'zone_h1', spotId: 'spot_h1_0',
      status: 'open', orderId: null, resolvedTs: null, resolveNote: '' },
    { id: 'al2', ts: now - 25 * min, type: 'wrongzone', level: 'high', title: '危化品车辆停错区域',
      detail: '冀F·9K218（柴油）停放在普通货车区 B，应停入危化品停放区 A', vehicleId: 'v4', zoneId: 'zone_t1', spotId: 'spot_t1_1',
      status: 'open', orderId: null, resolvedTs: null, resolveNote: '' },
    { id: 'al3', ts: now - 200 * min, type: 'patrol', level: 'mid', title: '巡查发现：灭火器过期',
      detail: '危化品停放区 A-03 车位旁灭火器过期，巡检员拍照上报', vehicleId: null, zoneId: 'zone_h1', spotId: 'spot_h1_2',
      status: 'converted', orderId: 'o1', resolvedTs: now - 120 * min, resolveNote: '已更换灭火器并复检合格' },
  ];
  const patrols = [
    { id: 'p1', ts: now - 210 * min, shift: 'day', inspector: '孙巡逻', zoneId: 'zone_h1', spotId: 'spot_h1_2',
      status: 'abnormal', photoData: null, note: '灭火器过期', alertId: 'al3' },
    { id: 'p2', ts: now - 180 * min, shift: 'day', inspector: '孙巡逻', zoneId: 'zone_h1', spotId: 'spot_h1_0',
      status: 'normal', photoData: null, note: '车辆标识齐全，无泄漏', alertId: null },
    { id: 'p3', ts: now - 90 * min, shift: 'day', inspector: '周安民', zoneId: 'zone_t1', spotId: 'spot_t1_0',
      status: 'normal', photoData: null, note: '正常', alertId: null },
  ];
  const orders = [
    { id: 'o1', alertId: 'al3', source: '巡查异常转单', ts: now - 200 * min, title: '灭火器过期整改',
      detail: '危化品停放区 A-03 旁灭火器过期，需立即更换', handler: '周安民', status: 'done',
      result: '已更换 4kg 干粉灭火器 2 具，复检合格', closeTs: now - 120 * min },
  ];
  return {
    version: 1, rules, zones, landmarks, vehicles, alerts, patrols, orders,
    simSpeed: 1, simOffsetMs: 0,
  };
}

/* ---------------- 数据查询辅助 ---------------- */
const getZone = id => state.zones.find(z => z.id === id);
const getSpot = (zoneId, spotId) => {
  const z = getZone(zoneId);
  const s = z?.spots.find(x => x.id === spotId);
  return s ? { zone: z, spot: s } : null;
};
const parkedVehicles = () => state.vehicles.filter(v => v.status === 'parked');
const openAlerts = () => state.alerts.filter(a => a.status === 'open');
const pendingOrders = () => state.orders.filter(o => o.status === 'pending');
function findFreeSpot(type, preferredZoneId) {
  const zones = state.zones.filter(z => z.type === type);
  const ordered = preferredZoneId ? [getZone(preferredZoneId), ...zones].filter(Boolean) : zones;
  for (const z of [...new Set(ordered)]) {
    const s = z.spots.find(sp => !sp.vehicleId);
    if (s) return { zone: z, spot: s };
  }
  return null;
}
function vehicleOvertime(v) {
  return v.status === 'parked' && virtualNow() > v.plannedExitTs;
}

/* =====================================================================
 *  Three.js 三维场景
 * ===================================================================*/
let renderer, scene, camera, orbit, transform, raycaster, mouse;
let groundMesh, dynamicGroup, labelGroup;
const pulseMaterials = [];   // 需脉冲闪烁的材质
const clickables = [];      // 可点击 mesh
let pointerDownPos = null;

function initThree() {
  const container = $('#threeContainer');
  renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0c1320);
  scene.fog = new THREE.Fog(0x0c1320, 160, 300);

  camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 600);
  camera.position.set(62, 72, 78);

  const amb = new THREE.AmbientLight(0xffffff, 0.55);
  scene.add(amb);
  const dir = new THREE.DirectionalLight(0xffffff, 0.9);
  dir.position.set(50, 90, 30);
  dir.castShadow = true;
  dir.shadow.mapSize.set(2048, 2048);
  dir.shadow.camera.left = -90; dir.shadow.camera.right = 90;
  dir.shadow.camera.top = 90; dir.shadow.camera.bottom = -90;
  scene.add(dir);

  orbit = new THREE.OrbitControls(camera, renderer.domElement);
  orbit.target.set(0, 0, 0);
  orbit.maxPolarAngle = Math.PI / 2.08;
  orbit.minDistance = 25;
  orbit.maxDistance = 220;
  orbit.enableDamping = true;

  transform = new THREE.TransformControls(camera, renderer.domElement);
  transform.setMode('translate');
  transform.addEventListener('dragging-changed', e => { orbit.enabled = !e.value; });
  transform.addEventListener('objectChange', () => {
    if (!selectedGizmoObject) return;
    const ud = selectedGizmoObject.userData;
    if (ud.zoneId) {
      const z = getZone(ud.zoneId);
      z.x = selectedGizmoObject.position.x;
      z.z = selectedGizmoObject.position.z;
      z.rot = selectedGizmoObject.rotation.y;
      saveState(); refreshComplianceDependent();
    } else if (ud.landmarkId) {
      const lm = state.landmarks.find(l => l.id === ud.landmarkId);
      lm.x = selectedGizmoObject.position.x;
      lm.z = selectedGizmoObject.position.z;
      saveState(); refreshComplianceDependent();
    }
  });
  scene.add(transform);

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  buildStaticScene();
  dynamicGroup = new THREE.Group();
  labelGroup = new THREE.Group();
  scene.add(dynamicGroup);
  scene.add(labelGroup);
  buildDynamicObjects();
  renderer.domElement.addEventListener('pointerdown', e => {
    pointerDownPos = { x: e.clientX, y: e.clientY };
  });
  renderer.domElement.addEventListener('pointerup', onSceneClick);
  renderer.domElement.addEventListener('pointermove', onSceneHover);

  window.addEventListener('resize', onResize);
  animate();
}
function onResize() {
  const c = $('#threeContainer');
  camera.aspect = c.clientWidth / c.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(c.clientWidth, c.clientHeight);
}

/* 静态场景：地面、道路、围墙、网格 */
function buildStaticScene() {
  const groundGeo = new THREE.PlaneGeometry(SCENE.w, SCENE.d);
  const groundMat = new THREE.MeshStandardMaterial({ color: 0x232d3d, roughness: 0.95 });
  groundMesh = new THREE.Mesh(groundGeo, groundMat);
  groundMesh.rotation.x = -Math.PI / 2;
  groundMesh.receiveShadow = true;
  groundMesh.userData.ground = true;
  scene.add(groundMesh);

  const grid = new THREE.GridHelper(SCENE.w, 30, 0x3a4d6e, 0x27364e);
  grid.position.y = 0.02;
  scene.add(grid);

  // 中央主干道
  const roadMat = new THREE.MeshStandardMaterial({ color: 0x333f52, roughness: 0.9 });
  const road = new THREE.Mesh(new THREE.PlaneGeometry(SCENE.w - 8, 12), roadMat);
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, 0.03, -14);
  scene.add(road);
  // 车道虚线
  for (let x = -66; x <= 66; x += 9) {
    const dash = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 0.35),
      new THREE.MeshBasicMaterial({ color: 0xd9e1ec }));
    dash.rotation.x = -Math.PI / 2;
    dash.position.set(x, 0.05, -14);
    scene.add(dash);
  }
  // 服务区围墙
  const wallMat = new THREE.MeshStandardMaterial({ color: 0x4a5d7c });
  const wallH = 1.2, t = 0.6;
  const walls = [
    { w: SCENE.w, d: t, x: 0, z: -SCENE.d / 2 },
    { w: SCENE.w, d: t, x: 0, z: SCENE.d / 2 },
    { w: t, d: SCENE.d, x: -SCENE.w / 2, z: 0 },
    { w: t, d: SCENE.d, x: SCENE.w / 2, z: 0 },
  ];
  walls.forEach(w => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w.w, wallH, w.d), wallMat);
    m.position.set(w.x, wallH / 2, w.z);
    m.castShadow = true;
    scene.add(m);
  });
  // 入口标识
  const gate = new THREE.Mesh(new THREE.BoxGeometry(14, 4.5, 0.8),
    new THREE.MeshStandardMaterial({ color: 0x1d4ed8 }));
  gate.position.set(0, 2.25, -SCENE.d / 2 + 1.2);
  scene.add(gate);
  const gateLabel = makeTextSprite('服务区入口', { bg: 'rgba(29,78,216,0.85)', scale: 0.55 });
  gateLabel.position.set(0, 6.2, -SCENE.d / 2 + 1.2);
  scene.add(gateLabel);
}

/* 文字标签 sprite */
function makeTextSprite(text, opts = {}) {
  const lines = String(text).split('\n');
  const fontSize = opts.fontSize || 40;
  const pad = 16;
  const cv = document.createElement('canvas');
  const ctx = cv.getContext('2d');
  ctx.font = `bold ${fontSize}px "Microsoft YaHei", sans-serif`;
  const w = Math.max(...lines.map(l => ctx.measureText(l).width)) + pad * 2;
  const h = lines.length * (fontSize * 1.25) + pad;
  cv.width = Math.ceil(w); cv.height = Math.ceil(h);
  ctx.font = `bold ${fontSize}px "Microsoft YaHei", sans-serif`;
  ctx.fillStyle = opts.bg || 'rgba(15,22,34,0.82)';
  roundRect(ctx, 0, 0, cv.width, cv.height, 12);
  ctx.fill();
  ctx.strokeStyle = opts.stroke || 'rgba(96,165,250,0.7)';
  ctx.lineWidth = 2;
  roundRect(ctx, 1, 1, cv.width - 2, cv.height - 2, 12);
  ctx.stroke();
  ctx.fillStyle = opts.color || '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  lines.forEach((l, i) => {
    ctx.fillText(l, cv.width / 2, pad / 2 + fontSize * 0.62 + i * fontSize * 1.25);
  });
  const tex = new THREE.CanvasTexture(cv);
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: opts.depthTest ?? false });
  const sp = new THREE.Sprite(mat);
  const s = opts.scale || 1;
  sp.scale.set(cv.width / 120 * s, cv.height / 120 * s, 1);
  return sp;
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/* 合规引擎：返回车位数量与安全距离校验结果 */
function evaluateCompliance() {
  const r = state.rules;
  const countOf = type => state.zones.filter(z => z.type === type).reduce((n, z) => n + z.spots.length, 0);
  const counts = {
    hazmat: { have: countOf('hazmat'), min: r.minHazmatSpots },
    truck:  { have: countOf('truck'),  min: r.minTruckSpots },
    car:    { have: countOf('car'),    min: r.minCarSpots },
  };
  Object.values(counts).forEach(c => c.pass = c.have >= c.min);

  const distanceRows = [];
  state.zones.filter(z => z.type === 'hazmat').forEach(z => {
    let minGas = Infinity, minRest = Infinity;
    z.spots.forEach((s, i) => {
      const p = spotWorldPos(z, i);
      state.landmarks.forEach(lm => {
        const d = Math.hypot(p.x - lm.x, p.z - lm.z);
        if (lm.kind === 'gas') minGas = Math.min(minGas, d);
        if (lm.kind === 'restaurant') minRest = Math.min(minRest, d);
      });
    });
    if (!state.landmarks.some(l => l.kind === 'gas')) minGas = NaN;
    if (!state.landmarks.some(l => l.kind === 'restaurant')) minRest = NaN;
    distanceRows.push({
      zoneId: z.id, zoneName: z.name,
      minGas, minRest,
      gasPass: isNaN(minGas) || minGas >= r.minHazmatToGas,
      restPass: isNaN(minRest) || minRest >= r.minHazmatToRestaurant,
    });
  });
  const countPass = Object.values(counts).every(c => c.pass);
  const distPass = distanceRows.every(d => d.gasPass && d.restPass);
  return { counts, distanceRows, overallPass: countPass && distPass };
}
function spotWorldPos(zone, index) {
  const def = TYPES[zone.type];
  const n = zone.spots.length;
  const lx = (index - (n - 1) / 2) * def.pitch;
  const rot = zone.rot || 0;
  return {
    x: zone.x + lx * Math.cos(rot),
    z: zone.z - lx * Math.sin(rot),
  };
}

/* 动态对象：分区、车位、车辆、地标 */
function buildDynamicObjects() {
  pulseMaterials.length = 0;
  clickables.length = 0;
  // 清除旧组
  [dynamicGroup, labelGroup].forEach(g => {
    while (g.children.length) {
      const obj = g.children.pop();
      obj.traverse?.(c => {
        if (c.geometry) c.geometry.dispose?.();
        if (c.material) {
          const mats = Array.isArray(c.material) ? c.material : [c.material];
          mats.forEach(m => { m.map?.dispose?.(); m.dispose?.(); });
        }
      });
    }
  });

  const comp = evaluateCompliance();
  const badZoneIds = new Set(comp.distanceRows.filter(d => !(d.gasPass && d.restPass)).map(d => d.zoneId));
  const badCountTypes = new Set(Object.entries(comp.counts).filter(([, c]) => !c.pass).map(([t]) => t));

  // 地标
  state.landmarks.forEach(lm => dynamicGroup.add(buildLandmark(lm)));

  // 分区
  state.zones.forEach(zone => {
    const g = buildZoneGroup(zone, badZoneIds.has(zone.id) || badCountTypes.has(zone.type));
    dynamicGroup.add(g);
  });
}

function buildLandmark(lm) {
  const g = new THREE.Group();
  g.position.set(lm.x, 0, lm.z);
  g.userData.landmarkId = lm.id;
  if (lm.kind === 'gas') {
    // 加油站：站房 + 罩棚 + 立柱
    const shop = new THREE.Mesh(new THREE.BoxGeometry(10, 4, 7),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0 }));
    shop.position.set(-4, 2, 0);
    shop.castShadow = true;
    g.add(shop);
    const canopyMat = new THREE.MeshStandardMaterial({ color: 0xdc2626 });
    const canopy = new THREE.Mesh(new THREE.BoxGeometry(16, 0.8, 9), canopyMat);
    canopy.position.set(5, 5.2, 0);
    canopy.castShadow = true;
    g.add(canopy);
    [[-1, -3.5], [-1, 3.5], [11, -3.5], [11, 3.5]].forEach(([x, z]) => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 5, 10),
        new THREE.MeshStandardMaterial({ color: 0xf3f4f6 }));
      col.position.set(x, 2.5, z);
      g.add(col);
    });
    const label = makeTextSprite('⛽ 加油站', { scale: 0.7, bg: 'rgba(220,38,38,0.85)', stroke: 'rgba(255,255,255,.4)' });
    label.position.set(5, 7.4, 0);
    g.add(label);
  } else {
    const b = new THREE.Mesh(new THREE.BoxGeometry(12, 5, 9),
      new THREE.MeshStandardMaterial({ color: 0x0ea5e9 }));
    b.position.y = 2.5;
    b.castShadow = true;
    g.add(b);
    const roof = new THREE.Mesh(new THREE.BoxGeometry(13, 0.6, 10),
      new THREE.MeshStandardMaterial({ color: 0x075985 }));
    roof.position.y = 5.3;
    g.add(roof);
    const label = makeTextSprite('🍚 餐厅', { scale: 0.7, bg: 'rgba(14,165,233,0.85)' });
    label.position.set(0, 7.2, 0);
    g.add(label);
  }
  g.traverse(o => { if (o.isMesh) { o.userData.landmarkId = lm.id; clickables.push(o); } });
  return g;
}

function buildZoneGroup(zone, isBad) {
  const def = TYPES[zone.type];
  const g = new THREE.Group();
  g.position.set(zone.x, 0, zone.z);
  g.rotation.y = zone.rot || 0;
  g.userData.zoneId = zone.id;

  const totalW = zone.spots.length * def.pitch + 1.5;
  const totalL = def.spotL + 3;

  // 分区底板
  const slabMat = new THREE.MeshStandardMaterial({
    color: isBad ? 0x7f1d1d : def.color,
    transparent: true, opacity: isBad ? 0.32 : 0.16,
    roughness: 0.85, emissive: isBad ? 0xff0000 : 0x000000, emissiveIntensity: 0,
  });
  if (isBad) pulseMaterials.push({ mat: slabMat, base: 0.15, amp: 0.35 });
  const slab = new THREE.Mesh(new THREE.PlaneGeometry(totalW, totalL), slabMat);
  slab.rotation.x = -Math.PI / 2;
  slab.position.y = 0.06;
  g.add(slab);

  // 车位
  zone.spots.forEach((spot, i) => {
    const lx = (i - (zone.spots.length - 1) / 2) * def.pitch;
    const vehicle = state.vehicles.find(v => v.id === spot.vehicleId && v.status === 'parked');
    const wrongHere = vehicle && vehicle.type !== zone.type;
    const overtimeHere = vehicle && vehicleOvertime(vehicle);
    const spotBad = isBad || wrongHere || overtimeHere;

    const mat = new THREE.MeshStandardMaterial({
      color: spotBad ? 0xef4444 : def.color,
      transparent: true, opacity: 0.55, roughness: 0.7,
      emissive: spotBad ? 0xff0000 : 0x000000, emissiveIntensity: 0,
    });
    if (spotBad) pulseMaterials.push({ mat, base: 0.2, amp: 0.5 });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(def.spotW, def.spotL), mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(lx, 0.09, 0);
    mesh.userData = { zoneId: zone.id, spotId: spot.id };
    g.add(mesh);
    clickables.push(mesh);

    // 车位编号
    const num = makeTextSprite(`${zone.name.slice(-1)}-${pad2(i + 1)}`, {
      fontSize: 34, scale: 0.32, bg: 'rgba(15,22,34,0.7)',
      color: spotBad ? '#fca5a5' : '#dbeafe',
    });
    num.position.set(lx, 0.4, def.spotL / 2 - 1.1);
    g.add(num);

    if (vehicle) g.add(buildVehicleMesh(vehicle, lx, spotBad));
  });

  // 分区标签
  const occupied = zone.spots.filter(s => s.vehicleId).length;
  const label = makeTextSprite(
    `${zone.name}（${TYPES[zone.type].label}）\n${occupied}/${zone.spots.length} 个车位${isBad ? '  ⚠不合规' : ''}`,
    { scale: 0.75, bg: isBad ? 'rgba(127,29,29,0.92)' : 'rgba(21,31,48,0.9)', stroke: isBad ? '#ef4444' : undefined }
  );
  label.position.set(0, 6.5, -totalL / 2 - 1.5);
  g.add(label);

  g.traverse(o => {
    if (o.isMesh && !o.userData.zoneId) o.userData.zoneId = zone.id;
  });
  return g;
}

function buildVehicleMesh(vehicle, lx, bad) {
  const vg = new THREE.Group();
  vg.position.set(lx, 0.1, 0);
  const paint = bad ? 0xdc2626 : (vehicle.type === 'hazmat' ? 0xea580c : vehicle.type === 'truck' ? 0x475569 : 0x2563eb);
  if (vehicle.type === 'car') {
    const body = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.7, 4.4),
      new THREE.MeshStandardMaterial({ color: paint, roughness: 0.5 }));
    body.position.y = 0.55;
    body.castShadow = true;
    vg.add(body);
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.6, 2.1),
      new THREE.MeshStandardMaterial({ color: 0xbfdbfe, roughness: 0.3 }));
    cabin.position.set(0, 1.15, -0.3);
    vg.add(cabin);
  } else {
    const isHaz = vehicle.type === 'hazmat';
    const tankW = isHaz ? 3.1 : 2.9, tankL = isHaz ? 8.6 : 8.2;
    const cargo = isHaz
      ? new THREE.Mesh(new THREE.CylinderGeometry(tankW / 2, tankW / 2, tankL, 18),
          new THREE.MeshStandardMaterial({ color: paint, roughness: 0.45, metalness: 0.2 }))
      : new THREE.Mesh(new THREE.BoxGeometry(tankW, 2.4, tankL),
          new THREE.MeshStandardMaterial({ color: paint, roughness: 0.6 }));
    if (isHaz) cargo.rotation.x = Math.PI / 2;
    cargo.position.set(0, isHaz ? 1.9 : 1.7, 0.6);
    cargo.castShadow = true;
    vg.add(cargo);
    const cab = new THREE.Mesh(new THREE.BoxGeometry(tankW, 2.2, 2.4),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5 }));
    cab.position.set(0, 1.5, -tankL / 2 - 0.9);
    cab.castShadow = true;
    vg.add(cab);
    if (isHaz) {
      const diamond = makeTextSprite('☣\n危化品', {
        fontSize: 30, scale: 0.4, bg: 'rgba(245,158,11,0.95)', stroke: '#000', color: '#1a1a1a',
      });
      diamond.position.set(0, 3.6, 0.6);
      vg.add(diamond);
    }
  }
  // 车牌小标签
  const plate = makeTextSprite(vehicle.plate, { fontSize: 30, scale: 0.34, bg: 'rgba(15,23,42,0.9)' });
  plate.position.set(0, 4.4, 0);
  vg.add(plate);
  vg.traverse(o => { if (o.isMesh) o.userData.vehicleId = vehicle.id; });
  return vg;
}

/* 场景交互：点击与悬停 */
function setMouse(e) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
}
function firstHit() {
  raycaster.setFromCamera(mouse, camera);
  return raycaster.intersectObjects(clickables, false)[0] || null;
}
function onSceneClick(e) {
  if (!pointerDownPos) return;
  const moved = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
  pointerDownPos = null;
  if (moved > 6) return;
  setMouse(e);

  // 新增分区：点击地面
  if (addZoneType) {
    raycaster.setFromCamera(mouse, camera);
    const gh = raycaster.intersectObject(groundMesh)[0];
    if (gh) {
      const p = gh.point;
      addZoneAt(addZoneType, p.x, p.z);
      addZoneType = null;
      $('#viewModeHint').textContent = '';
      renderPanel();
    }
    return;
  }

  const hit = firstHit();
  if (!hit) { hideSpotTip(); transform.detach(); selectedGizmoObject = null; return; }
  const ud = hit.object.userData;

  if (layoutMode && currentRole === 'admin') {
    // 布置模式：吸附 gizmo
    let target = null;
    if (ud.zoneId) target = dynamicGroup.children.find(c => c.userData.zoneId === ud.zoneId);
    else if (ud.landmarkId) target = dynamicGroup.children.find(c => c.userData.landmarkId === ud.landmarkId);
    if (target) {
      transform.attach(target);
      selectedGizmoObject = target;
      toast('已选中对象，可用三轴/旋转控件调整位置');
    }
    return;
  }
  if (ud.spotId) showSpotTip(ud.zoneId, ud.spotId, e.clientX, e.clientY);
}
function onSceneHover(e) {
  if (addZoneType) { renderer.domElement.style.cursor = 'crosshair'; return; }
  setMouse(e);
  const hit = firstHit();
  renderer.domElement.style.cursor = hit ? 'pointer' : 'default';
}
function hideSpotTip() { $('#spotTip').hidden = true; }

function showSpotTip(zoneId, spotId, cx, cy) {
  const found = getSpot(zoneId, spotId);
  if (!found) return;
  const { zone, spot } = found;
  const vehicle = state.vehicles.find(v => v.id === spot.vehicleId && v.status === 'parked');
  const tip = $('#spotTip');
  let html = `<div><b>${esc(zone.name)}</b> · ${pad2(spot.index + 1)} 号位 <span class="tag tag-${zone.type}">${TYPES[zone.type].label}</span></div>`;
  if (vehicle) {
    const over = vehicleOvertime(vehicle);
    html += `<div style="margin-top:6px">车牌：<b>${esc(vehicle.plate)}</b></div>`;
    if (vehicle.media) html += `<div>介质：${esc(vehicle.media)}　押运人：${esc(vehicle.escort)}</div>`;
    html += `<div>入场：${fmtTime(vehicle.entryTs)}　已停：${fmtDuration(virtualNow() - vehicle.entryTs)}</div>`;
    html += `<div>状态：${over ? '<span style="color:#f87171;font-weight:700">超时未离场</span>' : '正常计时'}</div>`;
    if (vehicle.type !== zone.type) html += `<div style="color:#f87171;font-weight:700">⚠ 车辆类型与分区不匹配</div>`;
  } else {
    html += `<div style="margin-top:6px;color:#9db0c9">空闲车位</div>`;
  }
  tip.innerHTML = html;
  tip.hidden = false;
  const rect = $('#threeContainer').getBoundingClientRect();
  tip.style.left = Math.min(cx - rect.left + 14, rect.width - 240) + 'px';
  tip.style.top = Math.min(cy - rect.top + 14, rect.height - 160) + 'px';
  setTimeout(hideSpotTip, 6000);
}

/* 视角按钮 */
$('#btnTopView').addEventListener('click', () => {
  camera.position.set(0, 150, 0.01);
  orbit.target.set(0, 0, 0);
});
$('#btnPerspective').addEventListener('click', () => {
  camera.position.set(62, 72, 78);
  orbit.target.set(0, 0, 0);
});

/* 渲染循环 */
function animate() {
  requestAnimationFrame(animate);
  const t = performance.now() * 0.003;
  pulseMaterials.forEach((p, i) => { p.mat.emissiveIntensity = p.base + Math.abs(Math.sin(t + i)) * p.amp; });
  orbit.update();
  renderer.render(scene, camera);
}

function refreshComplianceDependent() {
  buildDynamicObjects();
  if (['layout', 'compliance'].includes(currentTab)) renderPanel();
  updateSceneStatus();
}
function updateSceneStatus() {
  const comp = evaluateCompliance();
  const el = $('#sceneStatus');
  if (comp.overallPass) {
    el.innerHTML = `✅ 当前布置合规：危化品区安全距离与各类车位数量均满足下限要求　|　在途车辆 ${parkedVehicles().length} 台　|　未处置告警 ${openAlerts().length} 条`;
  } else {
    const parts = [];
    Object.entries(comp.counts).forEach(([type, c]) => {
      if (!c.pass) parts.push(`${TYPES[type].label}仅 ${c.have} 个（下限 ${c.min}）`);
    });
    comp.distanceRows.forEach(d => {
      if (!d.gasPass) parts.push(`${d.zoneName} 距加油站 ${d.minGas.toFixed(1)}m（下限 ${state.rules.minHazmatToGas}m）`);
      if (!d.restPass) parts.push(`${d.zoneName} 距餐厅 ${d.minRest.toFixed(1)}m（下限 ${state.rules.minHazmatToRestaurant}m）`);
    });
    el.innerHTML = `🚨 <span style="color:#f87171;font-weight:700">布置不合规：${esc(parts.join('；'))}</span>　|　未处置告警 ${openAlerts().length} 条`;
  }
}

/* =====================================================================
 *  业务动作
 * ===================================================================*/
function addZoneAt(type, x, z) {
  const def = TYPES[type];
  const defaultCount = { hazmat: 6, truck: 10, car: 16 }[type];
  const id = uid('zone');
  const zone = {
    id, name: `${def.label.replace('车位', '')} ${String(state.zones.length + 1).padStart(2, '0')}`,
    type, x: Math.round(x), z: Math.round(z), rot: 0, cols: defaultCount,
    spots: Array.from({ length: defaultCount }, (_, i) => ({ id: `${id}_${i}`, index: i, vehicleId: null })),
  };
  state.zones.push(zone);
  saveState();
  buildDynamicObjects();
  updateSceneStatus();
  toast(`已新增${def.label}分区，含 ${defaultCount} 个车位`, 'ok');
}
function removeZone(zoneId) {
  const z = getZone(zoneId);
  if (z.spots.some(s => s.vehicleId)) { toast('该分区仍有车辆停放，无法删除', 'error'); return; }
  if (!confirm(`确认删除分区「${z.name}」及其 ${z.spots.length} 个车位？`)) return;
  state.zones = state.zones.filter(x => x.id !== zoneId);
  saveState();
  transform.detach(); selectedGizmoObject = null;
  buildDynamicObjects(); updateSceneStatus(); renderPanel();
  toast('分区已删除');
}
function resizeZone(zoneId, count) {
  const z = getZone(zoneId);
  const used = z.spots.filter(s => s.vehicleId).length;
  if (count < used) { toast(`不能少于当前占用数 ${used}`, 'error'); return; }
  const spots = [];
  for (let i = 0; i < count; i++) {
    spots.push(z.spots[i] || { id: `${zoneId}_${i}`, index: i, vehicleId: null });
  }
  z.spots = spots; z.cols = count;
  saveState();
  buildDynamicObjects(); updateSceneStatus(); renderPanel();
}

/* 车辆入场登记 */
function registerVehicle(data) {
  const vNow = virtualNow();
  let target;
  if (data.zoneId) {
    const z = getZone(data.zoneId);
    if (!z) { toast('所选分区不存在', 'error'); return false; }
    const s = z.spots.find(sp => !sp.vehicleId);
    if (!s) { toast('所选分区无空闲车位', 'error'); return false; }
    target = { zone: z, spot: s };
  } else {
    target = findFreeSpot(data.type);
    if (!target) { toast(`${TYPES[data.type].label}已满，无法分配车位`, 'error'); return false; }
  }
  const v = {
    id: uid('v'), plate: data.plate.toUpperCase(), media: data.media || '', escort: data.escort || '',
    type: data.type, zoneId: target.zone.id, spotId: target.spot.id,
    entryTs: vNow, plannedExitTs: vNow + state.rules.maxStayMinutes * 60000,
    status: 'parked', exitTs: null, note: data.note || '',
  };
  target.spot.vehicleId = v.id;
  state.vehicles.push(v);

  if (v.type !== target.zone.type) {
    pushAlert({
      type: 'wrongzone', level: 'high',
      title: `${TYPES[v.type].vehicleLabel}停错区域`,
      detail: `${v.plate}（${v.media || '—'}）停放在${target.zone.name}，应停入${TYPES[v.type].label}所在分区`,
      vehicleId: v.id, zoneId: target.zone.id, spotId: target.spot.id,
    });
    toast('登记成功，但车辆类型与分区不匹配，已生成告警', 'error');
  } else {
    toast(`登记成功，已分配 ${target.zone.name} ${pad2(target.spot.index + 1)} 号位`, 'ok');
  }
  saveState();
  buildDynamicObjects(); updateSceneStatus(); refreshNavBadges();
  return true;
}
function exitVehicle(vehicleId) {
  const v = state.vehicles.find(x => x.id === vehicleId);
  if (!v || v.status !== 'parked') return;
  v.status = 'exited';
  v.exitTs = virtualNow();
  const found = getSpot(v.zoneId, v.spotId);
  if (found) found.spot.vehicleId = null;
  // 自动关闭该车的在场类告警
  state.alerts.forEach(a => {
    if (a.vehicleId === v.id && a.status === 'open') {
      a.status = 'resolved';
      a.resolvedTs = virtualNow();
      a.resolveNote = '车辆已离场，告警自动关闭';
    }
  });
  saveState();
  buildDynamicObjects(); updateSceneStatus(); renderPanel(); refreshNavBadges();
  toast(`${v.plate} 已离场，计时结束`, 'ok');
}
function reassignVehicle(vehicleId, newSpotId) {
  const v = state.vehicles.find(x => x.id === vehicleId);
  const [zoneId, spotId] = newSpotId.split('|');
  const found = getSpot(zoneId, spotId);
  if (!found || found.spot.vehicleId) { toast('目标车位不可用', 'error'); return; }
  const old = getSpot(v.zoneId, v.spotId);
  if (old) old.spot.vehicleId = null;
  found.spot.vehicleId = v.id;
  v.zoneId = zoneId; v.spotId = spotId;
  // 停错区域告警：纠正后自动关闭
  if (v.type === found.zone.type) {
    state.alerts.forEach(a => {
      if (a.vehicleId === v.id && a.type === 'wrongzone' && a.status === 'open') {
        a.status = 'resolved';
        a.resolvedTs = virtualNow();
        a.resolveNote = '车辆已调整至正确分区，告警自动关闭';
      }
    });
  } else {
    pushAlert({
      type: 'wrongzone', level: 'high',
      title: `${TYPES[v.type].vehicleLabel}停错区域`,
      detail: `${v.plate} 调位后仍停放在${found.zone.name}，与车辆类型不匹配`,
      vehicleId: v.id, zoneId, spotId,
    });
  }
  saveState();
  buildDynamicObjects(); updateSceneStatus(); renderPanel(); refreshNavBadges();
  toast('车位调整完成', 'ok');
}

/* 告警 */
function pushAlert(a) {
  state.alerts.unshift(Object.assign({
    id: uid('al'), ts: virtualNow(), status: 'open', orderId: null, resolvedTs: null, resolveNote: '',
    vehicleId: null, zoneId: null, spotId: null,
  }, a));
  updateAlertTicker();
  refreshNavBadges();
}
function convertAlertToOrder(alertId) {
  const a = state.alerts.find(x => x.id === alertId);
  if (!a || a.status !== 'open') return;
  const order = {
    id: uid('o'), alertId: a.id, source: a.type === 'patrol' ? '巡查异常转单' : '告警转应急处置单',
    ts: virtualNow(), title: a.title, detail: a.detail, handler: '',
    status: 'pending', result: '', closeTs: null,
  };
  state.orders.unshift(order);
  a.status = 'converted';
  a.orderId = order.id;
  saveState();
  renderPanel(); refreshNavBadges();
  toast('已生成应急处置单', 'ok');
}
function resolveAlert(alertId, note) {
  const a = state.alerts.find(x => x.id === alertId);
  if (!a || a.status !== 'open') return;
  a.status = 'resolved';
  a.resolvedTs = virtualNow();
  a.resolveNote = note || '人工关闭';
  saveState();
  renderPanel(); refreshNavBadges(); updateAlertTicker();
  toast('告警已关闭', 'ok');
}

/* 巡查打卡 */
function submitPatrol(data) {
  const p = {
    id: uid('p'), ts: virtualNow(), shift: currentShift(),
    inspector: data.inspector || '匿名巡查员',
    zoneId: data.zoneId, spotId: data.spotId,
    status: data.status, photoData: data.photoData || null,
    note: data.note || '', alertId: null,
  };
  state.patrols.unshift(p);
  if (data.status === 'abnormal') {
    const found = getSpot(data.zoneId, data.spotId);
    const alert = {
      type: 'patrol', level: 'mid',
      title: `巡查异常：${data.note ? data.note.slice(0, 18) : '现场异常'}`,
      detail: `${p.inspector} 在 ${found?.zone.name || ''} 巡查发现异常：${data.note || '未填写说明'}`,
      zoneId: data.zoneId, spotId: data.spotId,
    };
    // 复用 pushAlert 但需要关联巡查单：先创建再补
    pushAlert(alert);
    const created = state.alerts[0];
    p.alertId = created.id;
    convertAlertToOrder(created.id);
    toast('打卡成功，异常条目已自动转应急处置单', 'error');
  } else {
    toast('巡查打卡成功', 'ok');
  }
  saveState();
  buildDynamicObjects();
  renderPanel();
  refreshNavBadges();
}

/* 处置单回填 */
function closeOrder(orderId, handler, result) {
  const o = state.orders.find(x => x.id === orderId);
  if (!o || o.status !== 'pending') return;
  o.handler = handler;
  o.result = result;
  o.status = 'done';
  o.closeTs = virtualNow();
  if (o.alertId) {
    const a = state.alerts.find(x => x.id === o.alertId);
    if (a && a.status === 'converted') {
      a.status = 'resolved';
      a.resolvedTs = o.closeTs;
      a.resolveNote = `处置完成：${result}`;
    }
  }
  saveState();
  renderPanel(); refreshNavBadges(); updateAlertTicker(); updateSceneStatus();
  toast('处置结果已回填，单据关闭', 'ok');
}

/* 定时引擎：超时扫描 */
setInterval(() => {
  if (!state) return;
  let changed = false;
  parkedVehicles().forEach(v => {
    if (virtualNow() > v.plannedExitTs) {
      const exists = state.alerts.some(a => a.vehicleId === v.id && a.type === 'overtime' &&
        (a.status === 'open' || a.status === 'converted'));
      if (!exists) {
        const overMin = Math.round((virtualNow() - v.plannedExitTs) / 60000);
        pushAlert({
          type: 'overtime', level: 'high',
          title: `${TYPES[v.type].vehicleLabel}超时未离场`,
          detail: `${v.plate}（${v.media || '—'}）规定停放 ${state.rules.maxStayMinutes} 分钟，已超时 ${overMin} 分钟`,
          vehicleId: v.id, zoneId: v.zoneId, spotId: v.spotId,
        });
        changed = true;
      }
    }
  });
  if (changed) {
    saveState();
    buildDynamicObjects();
    updateSceneStatus();
    refreshNavBadges();
  }
  // 刷新当前面板上的倒计时（用户正在表单中输入时不打断）
  if (['vehicles', 'alerts', 'dashboard'].includes(currentTab) && !panelHasFocus()) renderPanel();
}, 2000);

function panelHasFocus() {
  const el = document.activeElement;
  if (!el || el === document.body) return false;
  return !!el.closest('#panelBody') && /^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName);
}

/* =====================================================================
 *  侧边栏 UI 路由
 * ===================================================================*/
const ROLE_TABS = {
  admin: [
    { key: 'layout', label: '分区布置' },
    { key: 'compliance', label: '合规校验' },
    { key: 'vehicles', label: '车辆登记' },
    { key: 'alerts', label: '告警中心' },
    { key: 'orders', label: '应急处置' },
  ],
  inspector: [
    { key: 'patrol', label: '巡查打卡' },
    { key: 'patrolLogs', label: '巡查记录' },
    { key: 'alerts', label: '告警中心' },
    { key: 'orders', label: '应急处置' },
  ],
  supervisor: [
    { key: 'dashboard', label: '运营看板' },
    { key: 'alerts', label: '告警中心' },
    { key: 'orders', label: '应急处置' },
    { key: 'export', label: '导出中心' },
  ],
};
$('#roleSelect').addEventListener('change', e => {
  currentRole = e.target.value;
  currentTab = ROLE_TABS[currentRole][0].key;
  layoutMode = false; addZoneType = null;
  transform.detach(); selectedGizmoObject = null;
  $('#viewModeHint').textContent = '';
  renderNav(); renderPanel(); updateSceneStatus();
});
function renderNav() {
  const tabs = ROLE_TABS[currentRole];
  if (!tabs.some(t => t.key === currentTab)) currentTab = tabs[0].key;
  $('#navTabs').innerHTML = tabs.map(t => {
    let badge = '';
    if (t.key === 'alerts') {
      const n = openAlerts().length;
      if (n) badge = `<span class="badge">${n}</span>`;
    }
    if (t.key === 'orders') {
      const n = pendingOrders().length;
      if (n) badge = `<span class="badge">${n}</span>`;
    }
    return `<button class="nav-tab ${t.key === currentTab ? 'active' : ''}" data-tab="${t.key}">${t.label}${badge}</button>`;
  }).join('');
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      currentTab = btn.dataset.tab;
      renderNav(); renderPanel();
    });
  });
}
function refreshNavBadges() { renderNav(); }

function renderPanel() {
  const body = $('#panelBody');
  const map = {
    layout: panelLayout, compliance: panelCompliance, vehicles: panelVehicles,
    alerts: panelAlerts, orders: panelOrders, patrol: panelPatrol,
    patrolLogs: panelPatrolLogs, dashboard: panelDashboard, export: panelExport,
  };
  body.innerHTML = '';
  (map[currentTab] || (() => ''))(body);
}

/* ---------- 管理员：分区布置 ---------- */
function panelLayout(root) {
  root.innerHTML = `
    <div class="section">
      <div class="section-title">布置模式</div>
      <div class="hint">开启后可在三维视图中<b style="color:#60a5fa">拖拽分区/地标调整位置</b>，点击对象选中后可用控件平移或旋转。新增分区时在地面点击即可落位。</div>
      <div class="btn-row">
        <button class="btn ${layoutMode ? 'btn-danger' : ''}" id="toggleLayout">${layoutMode ? '关闭布置模式' : '开启布置模式'}</button>
        <button class="btn btn-small" id="gizmoMove">平移控件</button>
        <button class="btn btn-small" id="gizmoRotate">旋转控件</button>
      </div>
    </div>
    <div class="section">
      <div class="section-title">新增停车分区 <span class="count">点击类型后在三维地面点击落位</span></div>
      <div class="btn-row">
        <button class="btn btn-small add-zone" data-type="hazmat" style="border-color:var(--hazmat);color:#fbbf24">＋ 危化品车位分区</button>
        <button class="btn btn-small add-zone" data-type="truck" style="border-color:var(--truck);color:#a78bfa">＋ 普通货车分区</button>
        <button class="btn btn-small add-zone" data-type="car" style="border-color:var(--car);color:#34d399">＋ 小车分区</button>
      </div>
    </div>
    <div class="section">
      <div class="section-title">现有分区 <span class="count">${state.zones.length} 个</span></div>
      <div id="zoneList"></div>
    </div>
    <div class="section">
      <div class="section-title">固定设施 <span class="count">可在布置模式拖动</span></div>
      <div id="landmarkList"></div>
    </div>`;

  $('#toggleLayout').addEventListener('click', () => {
    layoutMode = !layoutMode;
    if (!layoutMode) { transform.detach(); selectedGizmoObject = null; }
    $('#viewModeHint').textContent = layoutMode ? '布置模式：点击对象选中，拖动控件调整' : '';
    renderPanel();
  });
  $('#gizmoMove').addEventListener('click', () => { transform.setMode('translate'); toast('控件：平移'); });
  $('#gizmoRotate').addEventListener('click', () => { transform.setMode('rotate'); toast('控件：旋转'); });
  document.querySelectorAll('.add-zone').forEach(btn => {
    btn.addEventListener('click', () => {
      addZoneType = btn.dataset.type;
      layoutMode = false;
      $('#viewModeHint').textContent = `请在三维视图地面点击，放置${TYPES[addZoneType].label}分区（按 Esc 取消）`;
      toast('请到三维视图点击地面完成落位');
    });
  });

  const comp = evaluateCompliance();
  const badZoneIds = new Set(comp.distanceRows.filter(d => !(d.gasPass && d.restPass)).map(d => d.zoneId));
  const badCountTypes = new Set(Object.entries(comp.counts).filter(([, c]) => !c.pass).map(([t]) => t));
  $('#zoneList').innerHTML = state.zones.map(z => {
    const occ = z.spots.filter(s => s.vehicleId).length;
    const bad = badZoneIds.has(z.id) || badCountTypes.has(z.type);
    return `<div class="mini-zone ${bad ? 'bad' : ''}" data-zone="${z.id}">
      <div class="mz-head">
        <span><span class="tag tag-${z.type}">${TYPES[z.type].label}</span> ${esc(z.name)}</span>
        ${bad ? '<span class="tag tag-danger">不合规</span>' : '<span class="tag tag-ok">合规</span>'}
      </div>
      <div class="mz-sub">坐标 (${z.x}, ${z.z})　朝向 ${Math.round((z.rot || 0) * 180 / Math.PI)}°　占用 ${occ}/${z.spots.length}</div>
      <div class="form-row" style="margin-top:8px">
        <label>车位数量（调整后自动重新校验）</label>
        <input type="number" min="1" max="40" value="${z.spots.length}" data-resize="${z.id}">
      </div>
      <div class="li-actions">
        <button class="btn btn-small" data-locate="${z.id}">视图定位</button>
        <button class="btn btn-small btn-danger-text" data-del="${z.id}">删除分区</button>
      </div>
    </div>`;
  }).join('') || '<div class="empty">暂无分区，请先新增</div>';
  document.querySelectorAll('[data-resize]').forEach(inp => {
    inp.addEventListener('change', () => resizeZone(inp.dataset.resize, Math.max(1, Math.min(40, Number(inp.value) || 1))));
  });
  document.querySelectorAll('[data-del]').forEach(btn => btn.addEventListener('click', () => removeZone(btn.dataset.del)));
  document.querySelectorAll('[data-locate]').forEach(btn => btn.addEventListener('click', () => {
    const z = getZone(btn.dataset.locate);
    camera.position.set(z.x + 35, 38, z.z + 38);
    orbit.target.set(z.x, 0, z.z);
  }));

  $('#landmarkList').innerHTML = state.landmarks.map(lm => `
    <div class="list-item">
      <div class="li-head"><span class="li-title">${lm.kind === 'gas' ? '⛽' : '🍚'} ${esc(lm.name)}</span>
      <span class="tag tag-info">固定设施</span></div>
      <div class="li-meta">坐标 (${lm.x}, ${lm.z})　${lm.kind === 'gas' ? `危化品区安全距离下限 ${state.rules.minHazmatToGas} m` : `危化品区安全距离下限 ${state.rules.minHazmatToRestaurant} m`}</div>
    </div>`).join('');
}

/* ---------- 管理员：合规校验 ---------- */
function panelCompliance(root) {
  const comp = evaluateCompliance();
  const r = state.rules;
  root.innerHTML = `
    <div class="section">
      <div class="section-title">合规规则配置 <span class="count">依据 GB 50156 / 服务区危化品停放管理要求（演示阈值可调整）</span></div>
      <div class="card">
        <div class="form-grid-2">
          <div class="form-row"><label>危化品车位数量下限（个）</label><input type="number" id="rule_h" value="${r.minHazmatSpots}"></div>
          <div class="form-row"><label>普通货车位数量下限（个）</label><input type="number" id="rule_t" value="${r.minTruckSpots}"></div>
          <div class="form-row"><label>小车位数量下限（个）</label><input type="number" id="rule_c" value="${r.minCarSpots}"></div>
          <div class="form-row"><label>单车上限停放时长（分钟）</label><input type="number" id="rule_stay" value="${r.maxStayMinutes}"></div>
          <div class="form-row"><label>危化品区→加油站 距离下限（米）</label><input type="number" id="rule_gas" value="${r.minHazmatToGas}"></div>
          <div class="form-row"><label>危化品区→餐厅 距离下限（米）</label><input type="number" id="rule_rest" value="${r.minHazmatToRestaurant}"></div>
        </div>
        <button class="btn" id="saveRules" style="margin-top:10px">保存并重新校验</button>
      </div>
    </div>
    <div class="section">
      <div class="section-title">校验结论
        ${comp.overallPass ? '<span class="tag tag-ok">整体合规</span>' : '<span class="tag tag-danger">存在不合规项（三维视图已标红）</span>'}
      </div>
      <div id="compRows"></div>
    </div>`;

  const rows = [];
  Object.entries(comp.counts).forEach(([type, c]) => {
    rows.push(`<div class="compliance-row ${c.pass ? 'pass' : 'fail'}">
      <span class="compliance-icon">${c.pass ? '✅' : '🚨'}</span>
      <div class="compliance-main">
        <b>${TYPES[type].label}数量</b>：当前 ${c.have} 个
        ${c.pass ? `，满足下限要求` : `<span class="compliance-detail"> → 低于下限，至少还需 <b>${c.min - c.have}</b> 个（下限 <span class="min-limit">${c.min}</span> 个），三维视图中该类分区已标红</span>`}
      </div></div>`);
  });
  if (!comp.distanceRows.length) {
    rows.push(`<div class="compliance-row fail"><span class="compliance-icon">🚨</span>
      <div class="compliance-main"><b>危化品停放区缺失</b><span class="compliance-detail"> → 尚未布置任何危化品车位分区，安全距离与容量均无法满足要求</span></div></div>`);
  }
  comp.distanceRows.forEach(d => {
    rows.push(`<div class="compliance-row ${d.gasPass && d.restPass ? 'pass' : 'fail'}">
      <span class="compliance-icon">${d.gasPass && d.restPass ? '✅' : '🚨'}</span>
      <div class="compliance-main">
        <b>${esc(d.zoneName)} 安全距离</b>
        <div class="compliance-detail">
          距加油站 <b style="color:${d.gasPass ? '#4ade80' : '#f87171'}">${d.minGas.toFixed(1)} m</b>（下限 <span class="min-limit">${r.minHazmatToGas} m</span>）
          ；距餐厅 <b style="color:${d.restPass ? '#4ade80' : '#f87171'}">${d.minRest.toFixed(1)} m</b>（下限 <span class="min-limit">${r.minHazmatToRestaurant} m</span>）
          ${(!d.gasPass || !d.restPass) ? '<br>不满足安全距离，该分区在三维视图中已标红，请拖动分区或设施直至达标' : ''}
        </div>
      </div></div>`);
  });
  $('#compRows').innerHTML = rows.join('');

  $('#saveRules').addEventListener('click', () => {
    state.rules = {
      minHazmatSpots: Math.max(0, Number($('#rule_h').value) || 0),
      minTruckSpots: Math.max(0, Number($('#rule_t').value) || 0),
      minCarSpots: Math.max(0, Number($('#rule_c').value) || 0),
      maxStayMinutes: Math.max(1, Number($('#rule_stay').value) || 60),
      minHazmatToGas: Math.max(0, Number($('#rule_gas').value) || 0),
      minHazmatToRestaurant: Math.max(0, Number($('#rule_rest').value) || 0),
    };
    saveState();
    buildDynamicObjects(); updateSceneStatus(); renderPanel();
    toast('规则已保存并完成重新校验', 'ok');
  });
}

/* ---------- 车辆登记与在场车辆 ---------- */
function panelVehicles(root) {
  const vNow = virtualNow();
  root.innerHTML = `
    <div class="section">
      <div class="section-title">危化品车辆入场登记 <span class="count">登记即自动分配车位并开始计时</span></div>
      <div class="card">
        <div class="form-grid-2">
          <div class="form-row"><label>车牌号码 *</label><input id="in_plate" placeholder="如 鲁A·D8266"></div>
          <div class="form-row"><label>车辆类型 *</label>
            <select id="in_type">
              <option value="hazmat">危化品车辆</option>
              <option value="truck">普通货车</option>
              <option value="car">小车</option>
            </select></div>
          <div class="form-row" id="mediaRow"><label>装载介质 *（危化品必填）</label>
            <select id="in_media">${MEDIA_OPTIONS.map(m => `<option>${m}</option>`).join('')}</select></div>
          <div class="form-row" id="escortRow"><label>押运人 *（危化品必填）</label><input id="in_escort" placeholder="押运员姓名"></div>
        </div>
        <div class="form-row"><label>指定分区（不选则自动分配同类型空闲车位；选错误类型可演示停错告警）</label>
          <select id="in_zone"><option value="">自动分配</option>
            ${state.zones.map(z => `<option value="${z.id}">${esc(z.name)}（${TYPES[z.type].label}，空闲 ${z.spots.filter(s => !s.vehicleId).length}）</option>`).join('')}
          </select></div>
        <div class="form-row"><label>备注</label><input id="in_note" placeholder="可选"></div>
        <button class="btn" id="btnRegister">入场登记并分配车位</button>
      </div>
    </div>
    <div class="section">
      <div class="section-title">在场车辆 <span class="count">${parkedVehicles().length} 台 / 规定停放 ${state.rules.maxStayMinutes} 分钟</span></div>
      <div id="vehicleList"></div>
    </div>
    <div class="section">
      <div class="section-title">今日已离场 <span class="count">${state.vehicles.filter(v => v.status === 'exited' && v.exitTs && isSameVirtualDay(v.exitTs)).length} 台</span></div>
      <div id="exitedList"></div>
    </div>`;

  $('#in_type').addEventListener('change', e => {
    const haz = e.target.value === 'hazmat';
    $('#mediaRow').style.opacity = haz ? '1' : '.5';
    $('#escortRow').style.opacity = haz ? '1' : '.5';
    $('#in_media').disabled = !haz;
    $('#in_escort').disabled = !haz;
  });
  $('#btnRegister').addEventListener('click', () => {
    const type = $('#in_type').value;
    const plate = $('#in_plate').value.trim();
    const media = type === 'hazmat' ? $('#in_media').value : '';
    const escort = $('#in_escort').value.trim();
    if (!plate) return toast('请填写车牌号码', 'error');
    if (type === 'hazmat' && !escort) return toast('危化品车辆必须登记押运人', 'error');
    if (parkedVehicles().some(v => v.plate === plate.toUpperCase())) return toast('该车牌已在场内，请勿重复登记', 'error');
    const ok = registerVehicle({
      plate, type, media, escort,
      zoneId: $('#in_zone').value || null, note: $('#in_note').value.trim(),
    });
    if (ok) {
      $('#in_plate').value = ''; $('#in_escort').value = ''; $('#in_note').value = '';
      renderPanel();
    }
  });

  $('#vehicleList').innerHTML = parkedVehicles().map(v => {
    const z = getZone(v.zoneId);
    const spotInfo = getSpot(v.zoneId, v.spotId);
    const over = vehicleOvertime(v);
    const wrongZone = z && v.type !== z.type;
    const remain = v.plannedExitTs - vNow;
    const pct = Math.min(100, (vNow - v.entryTs) / (v.plannedExitTs - v.entryTs) * 100);
    return `<div class="list-item ${over || wrongZone ? 'alert-item' : ''}">
      <div class="li-head">
        <span class="li-title">${esc(v.plate)} <span class="tag tag-${v.type}">${TYPES[v.type].vehicleLabel}</span>
          ${over ? '<span class="tag tag-danger">超时</span>' : ''}${wrongZone ? '<span class="tag tag-danger">停错区</span>' : ''}</span>
        <span class="li-meta">${esc(z?.name || '—')} ${pad2((spotInfo?.spot.index ?? 0) + 1)} 号位</span>
      </div>
      <div class="li-meta">
        ${v.media ? `介质：${esc(v.media)}　押运人：${esc(v.escort)}　` : ''}
        入场 ${fmtDateTime(v.entryTs)}　已停 <b style="color:${over ? '#f87171' : '#e8eef7'}">${fmtDuration(vNow - v.entryTs)}</b>
        ${over ? `　超时 <b style="color:#f87171">${fmtDuration(-remain)}</b>` : `　剩余 ${fmtDuration(remain)}`}
      </div>
      <div class="progress"><i class="${over ? 'red' : pct > 80 ? 'amber' : 'green'}" style="width:${pct}%"></i></div>
      <div class="li-actions">
        <button class="btn btn-small" data-move="${v.id}">调整车位</button>
        <button class="btn btn-small btn-danger-text" data-exit="${v.id}">车辆离场</button>
      </div>
    </div>`;
  }).join('') || '<div class="empty">当前无在场车辆</div>';

  document.querySelectorAll('[data-exit]').forEach(b => b.addEventListener('click', () => exitVehicle(b.dataset.exit)));
  document.querySelectorAll('[data-move]').forEach(b => b.addEventListener('click', () => openMoveModal(b.dataset.move)));

  const exitedToday = state.vehicles.filter(v => v.status === 'exited' && v.exitTs && isSameVirtualDay(v.exitTs));
  $('#exitedList').innerHTML = exitedToday.map(v => `
    <div class="list-item ok-item">
      <div class="li-head"><span class="li-title">${esc(v.plate)} <span class="tag tag-gray">已离场</span></span>
      <span class="li-meta">停留 ${fmtDuration(v.exitTs - v.entryTs)}</span></div>
      <div class="li-meta">入场 ${fmtTime(v.entryTs)} → 离场 ${fmtTime(v.exitTs)}</div>
    </div>`).join('') || '<div class="empty">今日暂无离场记录</div>';
}
function openMoveModal(vehicleId) {
  const v = state.vehicles.find(x => x.id === vehicleId);
  const options = state.zones.map(z => {
    const free = z.spots.filter(s => !s.vehicleId);
    if (!free.length) return '';
    return `<optgroup label="${esc(z.name)}（${TYPES[z.type].label}）">
      ${free.map(s => `<option value="${z.id}|${s.id}">${pad2(s.index + 1)} 号位</option>`).join('')}
    </optgroup>`;
  }).join('');
  const body = openModal('调整车位', `
    <div class="hint">车辆：<b>${esc(v.plate)}</b>（${TYPES[v.type].vehicleLabel}）。调至正确类型分区将自动关闭“停错区域”告警。</div>
    <div class="form-row"><label>目标空闲车位</label><select id="mv_sel">${options}</select></div>
    <div class="modal-foot"><button class="btn btn-ghost" id="mv_cancel">取消</button>
    <button class="btn" id="mv_ok">确认调整</button></div>`);
  body.querySelector('#mv_cancel').addEventListener('click', closeModal);
  body.querySelector('#mv_ok').addEventListener('click', () => {
    reassignVehicle(vehicleId, body.querySelector('#mv_sel').value);
    closeModal();
  });
}

/* ---------- 告警中心 ---------- */
function alertTag(a) {
  const map = { overtime: '超时未离场', wrongzone: '停错区域', patrol: '巡查异常' };
  return `<span class="tag tag-danger">${map[a.type] || '告警'}</span>`;
}
function panelAlerts(root) {
  const open = state.alerts.filter(a => a.status === 'open');
  const converted = state.alerts.filter(a => a.status === 'converted');
  const resolved = state.alerts.filter(a => a.status === 'resolved');
  const item = (a, state2) => {
    const v = a.vehicleId ? state.vehicles.find(x => x.id === a.vehicleId) : null;
    return `<div class="list-item ${a.status === 'open' ? 'alert-item' : a.status === 'converted' ? 'warn-item' : 'ok-item'}">
      <div class="li-head">
        <span class="li-title">${alertTag(a)} ${esc(a.title)}</span>
        <span class="li-meta">${fmtDateTime(a.ts)}</span>
      </div>
      <div class="li-meta">${esc(a.detail)}</div>
      ${v ? `<div class="li-meta">车牌：${esc(v.plate)}${v.media ? `　介质：${esc(v.media)}　押运：${esc(v.escort)}` : ''}</div>` : ''}
      ${a.status === 'resolved' ? `<div class="li-meta" style="color:#4ade80">关闭说明：${esc(a.resolveNote)}（${fmtDateTime(a.resolvedTs)}）</div>` : ''}
      ${a.status === 'converted' ? `<div class="li-meta" style="color:#fbbf24">已转处置单 ${esc(a.orderId)}，待回填处置结果</div>` : ''}
      ${a.status === 'open' ? `<div class="li-actions">
        <button class="btn btn-small btn-danger" data-order="${a.id}">转应急处置单</button>
        <button class="btn btn-small" data-resolve="${a.id}">直接关闭</button>
        ${a.vehicleId ? `<button class="btn btn-small" data-move2="${a.vehicleId}">调整车辆</button>` : ''}
      </div>` : ''}
    </div>`;
  };
  root.innerHTML = `
    <div class="section">
      <div class="section-title">未处置告警 <span class="count">${open.length} 条 · 三维视图中对应车位红色闪烁</span></div>
      ${open.map(a => item(a)).join('') || '<div class="empty">暂无未处置告警</div>'}
    </div>
    <div class="section">
      <div class="section-title">处置中（已转单）<span class="count">${converted.length} 条</span></div>
      ${converted.map(a => item(a)).join('') || '<div class="empty">暂无处置中告警</div>'}
    </div>
    <div class="section">
      <div class="section-title">已关闭 <span class="count">${resolved.length} 条</span></div>
      ${resolved.slice(0, 10).map(a => item(a)).join('') || '<div class="empty">暂无已关闭告警</div>'}
    </div>`;
  document.querySelectorAll('[data-order]').forEach(b => b.addEventListener('click', () => convertAlertToOrder(b.dataset.order)));
  document.querySelectorAll('[data-resolve]').forEach(b => b.addEventListener('click', () => {
    const body = openModal('关闭告警', `
      <div class="form-row"><label>关闭说明</label><textarea id="rs_note" placeholder="如：已电话通知车主、现场复核无异常"></textarea></div>
      <div class="modal-foot"><button class="btn btn-ghost" id="rs_no">取消</button><button class="btn" id="rs_yes">确认关闭</button></div>`);
    body.querySelector('#rs_no').addEventListener('click', closeModal);
    body.querySelector('#rs_yes').addEventListener('click', () => {
      resolveAlert(b.dataset.resolve, body.querySelector('#rs_note').value.trim());
      closeModal();
    });
  }));
  document.querySelectorAll('[data-move2]').forEach(b => b.addEventListener('click', () => {
    closeModal();
    openMoveModal(b.dataset.move2);
  }));
}

/* ---------- 应急处置 ---------- */
function panelOrders(root) {
  const pending = pendingOrders();
  const done = state.orders.filter(o => o.status === 'done');
  root.innerHTML = `
    <div class="section">
      <div class="section-title">待处置单据 <span class="count">${pending.length} 单 · 巡查异常与告警均可转单</span></div>
      ${pending.map(o => `
        <div class="list-item warn-item">
          <div class="li-head"><span class="li-title">📋 ${esc(o.title)}</span>
          <span class="tag tag-warn">待处置</span></div>
          <div class="li-meta">单号：${o.id}　来源：${esc(o.source)}　下发：${fmtDateTime(o.ts)}</div>
          <div class="li-meta">${esc(o.detail)}</div>
          <div class="li-actions"><button class="btn btn-danger" data-fill="${o.id}">回填处置结果</button></div>
        </div>`).join('') || '<div class="empty">暂无待处置单据</div>'}
    </div>
    <div class="section">
      <div class="section-title">已闭环单据 <span class="count">${done.length} 单</span></div>
      ${done.slice(0, 10).map(o => `
        <div class="list-item ok-item">
          <div class="li-head"><span class="li-title">📋 ${esc(o.title)}</span>
          <span class="tag tag-ok">已闭环 · 耗时 ${fmtDuration((o.closeTs || 0) - o.ts)}</span></div>
          <div class="li-meta">处置人：${esc(o.handler || '—')}　关闭：${fmtDateTime(o.closeTs)}</div>
          <div class="li-meta">处置结果：${esc(o.result)}</div>
        </div>`).join('') || '<div class="empty">暂无已闭环单据</div>'}
    </div>`;
  document.querySelectorAll('[data-fill]').forEach(b => b.addEventListener('click', () => {
    const o = state.orders.find(x => x.id === b.dataset.fill);
    const body = openModal('回填应急处置结果', `
      <div class="card" style="background:var(--panel-2)">
        <b>${esc(o.title)}</b>
        <div class="li-meta" style="margin-top:6px">${esc(o.detail)}</div>
        <div class="li-meta">下发时间：${fmtDateTime(o.ts)}</div>
      </div>
      <div class="form-row"><label>处置人 *</label><input id="od_handler" placeholder="姓名"></div>
      <div class="form-row"><label>处置措施与结果 *</label><textarea id="od_result" placeholder="如：现场警戒、导流、堵漏、复检合格等"></textarea></div>
      <div class="modal-foot"><button class="btn btn-ghost" id="od_no">取消</button>
      <button class="btn btn-ok" id="od_yes">提交并闭环</button></div>`);
    body.querySelector('#od_no').addEventListener('click', closeModal);
    body.querySelector('#od_yes').addEventListener('click', () => {
      const handler = body.querySelector('#od_handler').value.trim();
      const result = body.querySelector('#od_result').value.trim();
      if (!handler || !result) return toast('处置人与处置结果均为必填', 'error');
      closeOrder(o.id, handler, result);
      closeModal();
    });
  }));
}

/* ---------- 巡查员：打卡 ---------- */
function panelPatrol(root) {
  root.innerHTML = `
    <div class="section">
      <div class="section-title">班次巡检打卡 <span class="count">当前班次：${shiftLabel(currentShift())}</span></div>
      <div class="card">
        <div class="form-grid-2">
          <div class="form-row"><label>巡查员姓名 *</label><input id="pt_name" placeholder="姓名"></div>
          <div class="form-row"><label>巡检车位 *</label><select id="pt_spot"></select></div>
        </div>
        <div class="form-row"><label>现场状态 *</label>
          <select id="pt_status">
            <option value="normal">正常</option>
            <option value="abnormal">异常（自动转应急处置单）</option>
          </select></div>
        <div class="form-row"><label>车位现场照片 *</label>
          <div class="photo-uploader" id="pt_uploader">点击上传 / 拖拽照片到此处</div>
          <input type="file" id="pt_file" accept="image/*" hidden>
          <div class="photo-preview" id="pt_preview" hidden><img id="pt_img"></div>
        </div>
        <div class="form-row"><label>情况说明</label><textarea id="pt_note" placeholder="正常可简写；异常须描述问题，如泄漏、堆放杂物、灭火器过期"></textarea></div>
        <button class="btn" id="pt_submit">提交打卡</button>
      </div>
    </div>
    <div class="section">
      <div class="section-title">我的最近打卡 <span class="count">${state.patrols.length} 条</span></div>
      ${state.patrols.slice(0, 5).map(patrolItemHTML).join('') || '<div class="empty">暂无巡查记录</div>'}
    </div>`;

  const spotSel = $('#pt_spot');
  spotSel.innerHTML = state.zones.map(z => `
    <optgroup label="${esc(z.name)}">
      ${z.spots.map(s => {
        const v = state.vehicles.find(x => x.id === s.vehicleId && x.status === 'parked');
        return `<option value="${z.id}|${s.id}">${pad2(s.index + 1)} 号位${v ? `（占用：${esc(v.plate)}）` : '（空闲）'}</option>`;
      }).join('')}
    </optgroup>`).join('');

  let photoData = null;
  const fileInput = $('#pt_file');
  $('#pt_uploader').addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => compressImage(fileInput.files[0], d => {
    photoData = d;
    $('#pt_img').src = d;
    $('#pt_preview').hidden = false;
    $('#pt_uploader').textContent = '已选择照片，点击可重新上传';
  }));
  $('#pt_submit').addEventListener('click', () => {
    const name = $('#pt_name').value.trim();
    const spot = $('#pt_spot').value;
    if (!name) return toast('请填写巡查员姓名', 'error');
    if (!spot) return toast('请选择巡检车位', 'error');
    if (!photoData) return toast('请上传车位现场照片', 'error');
    const [zoneId, spotId] = spot.split('|');
    submitPatrol({
      inspector: name, zoneId, spotId,
      status: $('#pt_status').value,
      photoData, note: $('#pt_note').value.trim(),
    });
  });
}
function patrolItemHTML(p) {
  const found = getSpot(p.zoneId, p.spotId);
  return `<div class="list-item ${p.status === 'abnormal' ? 'alert-item' : 'ok-item'}">
    <div class="li-head">
      <span class="li-title">${esc(found?.zone.name || '已删除分区')} ${pad2((found?.spot.index ?? 0) + 1)} 号位
        ${p.status === 'abnormal' ? '<span class="tag tag-danger">异常</span>' : '<span class="tag tag-ok">正常</span>'}</span>
      <span class="li-meta">${fmtDateTime(p.ts)} · ${p.shift === 'day' ? '白班' : '夜班'}</span>
    </div>
    <div class="li-meta">巡查员：${esc(p.inspector)}　说明：${esc(p.note || '—')}
      ${p.photoData ? '　📷 含现场照片' : ''}${p.alertId ? '　已转处置单' : ''}</div>
    ${p.photoData ? `<img src="${p.photoData}" style="max-width:100%;max-height:150px;margin-top:6px;border-radius:8px;border:1px solid var(--line)">` : ''}
  </div>`;
}
function compressImage(file, cb) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const max = 480;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const cv = document.createElement('canvas');
      cv.width = img.width * scale; cv.height = img.height * scale;
      cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
      cb(cv.toDataURL('image/jpeg', 0.72));
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

/* ---------- 巡查记录 ---------- */
function panelPatrolLogs(root) {
  root.innerHTML = `
    <div class="section">
      <div class="section-title">巡查记录 <span class="count">共 ${state.patrols.length} 条 · 异常 ${state.patrols.filter(p => p.status === 'abnormal').length} 条</span></div>
      <div class="form-grid-2" style="margin-bottom:10px">
        <div class="form-row"><label>按班次筛选</label>
          <select id="fl_shift"><option value="">全部</option><option value="day">白班</option><option value="night">夜班</option></select></div>
        <div class="form-row"><label>按状态筛选</label>
          <select id="fl_status"><option value="">全部</option><option value="normal">正常</option><option value="abnormal">异常</option></select></div>
      </div>
      <div id="patrolFiltered">${state.patrols.map(patrolItemHTML).join('') || '<div class="empty">暂无巡查记录</div>'}</div>
    </div>`;
  const apply = () => {
    const s = $('#fl_shift').value, st = $('#fl_status').value;
    const list = state.patrols.filter(p => (!s || p.shift === s) && (!st || p.status === st));
    $('#patrolFiltered').innerHTML = list.map(patrolItemHTML).join('') || '<div class="empty">没有符合条件的记录</div>';
  };
  $('#fl_shift').addEventListener('change', apply);
  $('#fl_status').addEventListener('change', apply);
}

/* ---------- 主管：运营看板 ---------- */
function panelDashboard(root) {
  const vNow = virtualNow();
  const totalSpots = state.zones.reduce((n, z) => n + z.spots.length, 0);
  const parked = parkedVehicles();
  const occRate = totalSpots ? parked.length / totalSpots : 0;
  const overtime = parked.filter(vehicleOvertime).length;
  const overtimeRate = parked.length ? overtime / parked.length : 0;
  const todayAlerts = state.alerts.filter(a => isSameVirtualDay(a.ts));
  const todayOpen = todayAlerts.filter(a => a.status !== 'resolved').length;
  const todayPatrols = state.patrols.filter(p => isSameVirtualDay(p.ts));
  const todayEntries = state.vehicles.filter(v => isSameVirtualDay(v.entryTs));
  const closedToday = state.orders.filter(o => o.status === 'done' && o.closeTs && isSameVirtualDay(o.closeTs));
  const avgHandle = closedToday.length
    ? closedToday.reduce((s, o) => s + (o.closeTs - o.ts), 0) / closedToday.length : null;

  const byType = ['hazmat', 'truck', 'car'].map(t => {
    const zones = state.zones.filter(z => z.type === t);
    const total = zones.reduce((n, z) => n + z.spots.length, 0);
    const used = zones.reduce((n, z) => n + z.spots.filter(s => s.vehicleId).length, 0);
    return { type: t, total, used, rate: total ? used / total : 0 };
  });

  root.innerHTML = `
    <div class="section">
      <div class="section-title">当日运营指标 <span class="count">数据截至 ${fmtDateTime(vNow)}</span></div>
      <div class="stat-grid">
        <div class="stat-card"><div class="stat-label">总车位 / 在场车辆</div>
          <div class="stat-value blue">${parked.length}<span class="stat-unit">/ ${totalSpots} 个</span></div></div>
        <div class="stat-card"><div class="stat-label">当日占用率</div>
          <div class="stat-value ${occRate > 0.85 ? 'red' : occRate > 0.6 ? 'amber' : 'green'}">${(occRate * 100).toFixed(1)}<span class="stat-unit">%</span></div>
          <div class="progress"><i class="${occRate > .85 ? 'red' : occRate > .6 ? 'amber' : 'green'}" style="width:${(occRate * 100).toFixed(1)}%"></i></div></div>
        <div class="stat-card"><div class="stat-label">超时率（在场车辆）</div>
          <div class="stat-value ${overtimeRate > 0 ? 'red' : 'green'}">${(overtimeRate * 100).toFixed(1)}<span class="stat-unit">%（${overtime}/${parked.length}）</span></div></div>
        <div class="stat-card"><div class="stat-label">告警平均处置时长</div>
          <div class="stat-value ${avgHandle && avgHandle > 60 * 60000 ? 'amber' : 'blue'}">${avgHandle ? fmtDuration(avgHandle) : '—'}</div>
          <div class="stat-label" style="margin-top:4px">今日闭环 ${closedToday.length} 单</div></div>
        <div class="stat-card"><div class="stat-label">今日告警</div>
          <div class="stat-value ${todayOpen ? 'red' : 'green'}">${todayAlerts.length}<span class="stat-unit">条，待处置 ${todayOpen}</span></div></div>
        <div class="stat-card"><div class="stat-label">今日入场 / 巡查打卡</div>
          <div class="stat-value blue">${todayEntries.length}<span class="stat-unit">台 / ${todayPatrols.length} 次</span></div></div>
      </div>
    </div>
    <div class="chart-wrap">
      <h4>各类型车位占用结构</h4>
      <div class="donut-grid"><canvas id="donut" width="150" height="150"></canvas>
        <div class="donut-legend">
          ${byType.map(d => `<div><i style="background:${TYPES[d.type].css}"></i>${TYPES[d.type].label}：已用 ${d.used} / ${d.total}（${(d.rate * 100).toFixed(0)}%）</div>`).join('')}
          <div><i style="background:#33456a"></i>空闲：${totalSpots - parked.length} 个</div>
        </div></div>
    </div>
    <div class="chart-wrap">
      <h4>各分区占用率</h4>
      <div class="bar-chart">
        ${state.zones.map(z => {
          const used = z.spots.filter(s => s.vehicleId).length;
          const rate = z.spots.length ? used / z.spots.length : 0;
          return `<div class="bar-row">
            <span>${esc(z.name)}</span>
            <div class="bar-track"><div class="bar-fill" style="width:${(rate * 100).toFixed(1)}%;background:${TYPES[z.type].css}"></div></div>
            <span>${used}/${z.spots.length}</span></div>`;
        }).join('')}
      </div>
    </div>
    <div class="chart-wrap">
      <h4>今日告警分类</h4>
      <div class="bar-chart">
        ${['overtime', 'wrongzone', 'patrol'].map(t => {
          const n = todayAlerts.filter(a => a.type === t).length;
          const labels = { overtime: '超时未离场', wrongzone: '停错区域', patrol: '巡查异常' };
          return `<div class="bar-row"><span>${labels[t]}</span>
            <div class="bar-track"><div class="bar-fill" style="width:${todayAlerts.length ? (n / todayAlerts.length * 100) : 0}%;background:var(--danger)"></div></div>
            <span>${n} 条</span></div>`;
        }).join('')}
      </div>
    </div>`;
  drawDonut(byType, totalSpots - parked.length);
}
function drawDonut(byType, freeCount) {
  const cv = $('#donut');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const data = byType.map(d => ({ v: d.used, c: TYPES[d.type].css }));
  data.push({ v: freeCount, c: '#33456a' });
  const total = data.reduce((s, d) => s + d.v, 0);
  let start = -Math.PI / 2;
  const cx = 75, cy = 75, R = 62, r = 38;
  ctx.clearRect(0, 0, 150, 150);
  if (!total) { ctx.fillStyle = '#33456a'; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill(); return; }
  data.forEach(d => {
    if (!d.v) return;
    const ang = d.v / total * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, R, start, start + ang);
    ctx.closePath();
    ctx.fillStyle = d.c;
    ctx.fill();
    start += ang;
  });
  ctx.fillStyle = '#1a2740';
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#e8eef7';
  ctx.font = 'bold 20px sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const used = byType.reduce((s, d) => s + d.used, 0);
  ctx.fillText(used, cx, cy - 8);
  ctx.font = '11px sans-serif';
  ctx.fillStyle = '#9db0c9';
  ctx.fillText('在场车辆', cx, cy + 12);
}

/* ---------- 导出中心 ---------- */
function panelExport(root) {
  root.innerHTML = `
    <div class="section">
      <div class="section-title">数据与图纸导出</div>
      <div class="card">
        <div class="li-title" style="margin-bottom:6px">📄 巡查记录（CSV）</div>
        <div class="hint">导出全部巡查打卡记录，含班次、巡查员、车位、状态、异常说明、照片及关联处置单，可用 Excel 直接打开。</div>
        <button class="btn" id="expPatrol">导出巡查记录 CSV</button>
      </div>
      <div class="card">
        <div class="li-title" style="margin-bottom:6px">🗺 分区平面图（PNG）</div>
        <div class="hint">切换正交俯视相机渲染当前三维布置，含分区着色、车位编号、地标与合规标红，导出高清 PNG。</div>
        <button class="btn" id="expPlan">导出分区平面图 PNG</button>
      </div>
      <div class="card">
        <div class="li-title" style="margin-bottom:6px">📃 车辆登记记录（CSV）</div>
        <div class="hint">含入场/离场时间、介质、押运人、停放时长与告警情况。</div>
        <button class="btn" id="expVehicle">导出车辆登记 CSV</button>
      </div>
    </div>`;
  $('#expPatrol').addEventListener('click', exportPatrolCSV);
  $('#expPlan').addEventListener('click', exportPlanPNG);
  $('#expVehicle').addEventListener('click', exportVehicleCSV);
}
function downloadBlob(content, filename, type) {
  const blob = new Blob([content], { type });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}
function csvCell(v) { return `"${String(v ?? '').replace(/"/g, '""')}"`; }
function exportPatrolCSV() {
  const head = ['打卡时间', '班次', '巡查员', '分区', '车位', '状态', '情况说明', '现场照片', '关联告警/处置单'];
  const rows = state.patrols.map(p => {
    const found = getSpot(p.zoneId, p.spotId);
    const a = p.alertId ? state.alerts.find(x => x.id === p.alertId) : null;
    return [
      fmtDateTime(p.ts), p.shift === 'day' ? '白班' : '夜班', p.inspector,
      found?.zone.name || '—', found ? `${pad2(found.spot.index + 1)}号位` : '—',
      p.status === 'abnormal' ? '异常' : '正常', p.note,
      p.photoData ? '已上传(系统内查看)' : '无',
      a ? `${a.title} / 处置单 ${a.orderId || '待生成'}` : '—',
    ].map(csvCell).join(',');
  });
  downloadBlob('﻿' + [head.map(csvCell).join(','), ...rows].join('\r\n'),
    `巡查记录_${fmtDateTime(virtualNow()).replace(/[: ]/g, '-')}.csv`, 'text/csv;charset=utf-8');
  toast('巡查记录已导出', 'ok');
}
function exportVehicleCSV() {
  const head = ['车牌', '车辆类型', '介质', '押运人', '停放分区', '车位', '入场时间', '计划离场', '实际离场', '停放时长', '状态'];
  const rows = state.vehicles.map(v => {
    const found = getSpot(v.zoneId, v.spotId);
    return [
      v.plate, TYPES[v.type].vehicleLabel, v.media || '—', v.escort || '—',
      found?.zone.name || '—', found ? `${pad2(found.spot.index + 1)}号位` : '—',
      fmtDateTime(v.entryTs), fmtDateTime(v.plannedExitTs),
      v.exitTs ? fmtDateTime(v.exitTs) : '未离场',
      fmtDuration((v.exitTs || virtualNow()) - v.entryTs),
      v.status === 'parked' ? (vehicleOvertime(v) ? '超时停放' : '在场') : '已离场',
    ].map(csvCell).join(',');
  });
  downloadBlob('﻿' + [head.map(csvCell).join(','), ...rows].join('\r\n'),
    `车辆登记记录_${fmtDateTime(virtualNow()).replace(/[: ]/g, '-')}.csv`, 'text/csv;charset=utf-8');
  toast('车辆登记记录已导出', 'ok');
}
function exportPlanPNG() {
  const W = 1920, H = 1440;
  const prevCam = camera.clone();
  const prevTarget = orbit.target.clone();
  const gizmoTarget = transform.object;
  if (gizmoTarget) transform.detach();
  const ortho = new THREE.OrthographicCamera(-SCENE.w / 2, SCENE.w / 2, SCENE.d / 2, -SCENE.d / 2, 0.1, 400);
  ortho.position.set(0, 160, 0.01);
  ortho.lookAt(0, 0, 0);
  const oldSize = new THREE.Vector2();
  renderer.getSize(oldSize);
  renderer.setSize(W, H);
  scene.background = new THREE.Color(0x0c1320);
  renderer.render(scene, ortho);
  const url = renderer.domElement.toDataURL('image/png');

  // 叠加标题与指北针
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');
  ctx.drawImage(renderer.domElement, 0, 0);
  ctx.fillStyle = 'rgba(15,22,34,0.85)';
  ctx.fillRect(0, 0, W, 90);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 38px "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('高速公路服务区车辆分区停放平面图', 40, 58);
  ctx.font = '22px sans-serif';
  ctx.fillStyle = '#9db0c9';
  const comp = evaluateCompliance();
  ctx.fillText(`导出时间：${fmtDateTime(virtualNow())}　合规状态：${comp.overallPass ? '合规' : '存在不合规项（红色标注）'}`, 760, 58);
  // 指北针
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(15,22,34,0.85)';
  ctx.beginPath(); ctx.arc(W - 90, H - 90, 52, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ef4444';
  ctx.beginPath(); ctx.moveTo(W - 90, H - 128); ctx.lineTo(W - 104, H - 82); ctx.lineTo(W - 90, H - 90); ctx.lineTo(W - 76, H - 82); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.font = 'bold 24px sans-serif';
  ctx.fillText('N', W - 90, H - 50);

  const a = document.createElement('a');
  a.href = cv.toDataURL('image/png');
  a.download = `分区平面图_${fmtDateTime(virtualNow()).replace(/[: ]/g, '-')}.png`;
  a.click();

  // 还原
  renderer.setSize(oldSize.x, oldSize.y);
  camera.position.copy(prevCam.position);
  camera.rotation.copy(prevCam.rotation);
  camera.zoom = prevCam.zoom;
  camera.updateProjectionMatrix();
  orbit.target.copy(prevTarget);
  if (gizmoTarget) transform.attach(gizmoTarget);
  toast('分区平面图已导出', 'ok');
}

/* ---------- 告警滚动条 ---------- */
function updateAlertTicker() {
  const a = openAlerts()[0];
  const ticker = $('#alertTicker');
  if (!a) { ticker.hidden = true; return; }
  $('#alertTickerText').innerHTML = `<b>${esc(a.title)}</b><br><span style="color:#d8b0b0">${esc(a.detail)}</span>`;
  ticker.hidden = false;
}
$('#tickerClose').addEventListener('click', () => { $('#alertTicker').hidden = true; });
$('#tickerGo').addEventListener('click', () => {
  const tabs = ROLE_TABS[currentRole].map(t => t.key);
  currentTab = tabs.includes('alerts') ? 'alerts' : tabs[0];
  renderNav(); renderPanel();
});

/* ---------- 重置演示 ---------- */
$('#resetDemoBtn').addEventListener('click', () => {
  if (!confirm('将清空全部本地数据并恢复演示场景，确认继续？')) return;
  localStorage.removeItem(STORAGE_KEY);
  state = buildSeedData();
  saveState();
  currentRole = 'admin';
  $('#roleSelect').value = 'admin';
  currentTab = 'layout';
  layoutMode = false; addZoneType = null;
  transform.detach(); selectedGizmoObject = null;
  document.querySelectorAll('.speed-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
  buildDynamicObjects();
  renderNav(); renderPanel(); updateSceneStatus(); updateAlertTicker();
  toast('已恢复演示数据', 'ok');
});

/* =====================================================================
 *  启动
 * ===================================================================*/
function boot() {
  if (!loadState()) {
    state = buildSeedData();
    saveState();
  }
  document.querySelectorAll('.speed-btn').forEach(b =>
    b.classList.toggle('active', Number(b.dataset.speed) === (state.simSpeed || 1)));
  // Esc 取消“新增分区落位”
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && addZoneType) {
      addZoneType = null;
      $('#viewModeHint').textContent = '';
    }
  });
  initThree();
  // 支持 URL hash 深链，如 index.html#role/supervisor
  const hashRole = (location.hash.match(/role\/(\w+)/) || [])[1];
  if (hashRole && ROLE_TABS[hashRole]) {
    currentRole = hashRole;
    $('#roleSelect').value = hashRole;
  }
  currentTab = ROLE_TABS[currentRole][0].key;
  renderNav();
  renderPanel();
  updateSceneStatus();
  updateAlertTicker();
}
boot();
