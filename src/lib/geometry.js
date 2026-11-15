// three.js 三维人体模型构建与表面定位
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { BODY_PARTS } from './constants.js';

const SKIN = 0xf0c8b0;

function buildPart(def) {
  let geo;
  const [a, b, h] = def.size;
  switch (def.kind) {
    case 'sphere':
      geo = new THREE.SphereGeometry(1, 32, 24);
      geo.scale(a, b, h);
      break;
    case 'cylinder':
      geo = new THREE.CylinderGeometry(a, b, h, 32, 1);
      break;
    case 'capsule':
      // radius=a, 圆柱段长度 h-2a
      geo = new THREE.CapsuleGeometry(a, Math.max(0.01, h - 2 * a), 8, 20);
      break;
    case 'box':
      geo = new THREE.BoxGeometry(a, b, h);
      break;
    default:
      geo = new THREE.SphereGeometry(a, 24, 18);
  }
  const mat = new THREE.MeshStandardMaterial({
    color: SKIN,
    roughness: 0.82,
    metalness: 0,
    transparent: true,
    opacity: 1
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.name = def.id;
  mesh.position.set(...def.pos);
  return mesh;
}

export function createScene(container) {
  const width = container.clientWidth || 800;
  const height = container.clientHeight || 600;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1d2430);

  const camera = new THREE.PerspectiveCamera(42, width / height, 0.05, 50);
  camera.position.set(0, 1.0, 3.1);

  const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x4a5568, 1.15));
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(1.6, 2.6, 2.2);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xbfd8ff, 0.7);
  rim.position.set(-1.8, 1.4, -2.0);
  scene.add(rim);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0.92, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 1.1;
  controls.maxDistance = 6;
  controls.update();

  const group = new THREE.Group();
  scene.add(group);

  const partMeshes = new Map();
  for (const def of BODY_PARTS) {
    const mesh = buildPart(def);
    mesh.userData.partId = def.id;
    partMeshes.set(def.id, mesh);
    group.add(mesh);
  }

  // 地面
  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(1.1, 48),
    new THREE.MeshStandardMaterial({ color: 0x2a3342, roughness: 1 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.005;
  scene.add(floor);

  // 痣标记层
  const markerLayer = new THREE.Group();
  group.add(markerLayer);

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  let raf = 0;
  function animate() {
    raf = requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!w || !h) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  function dispose() {
    cancelAnimationFrame(raf);
    ro.disconnect();
    controls.dispose();
    renderer.dispose();
    scene.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) {
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        mats.forEach((m) => m.dispose());
      }
    });
    renderer.domElement.remove();
  }

  // 屏幕事件 -> 射线拾取部件表面点
  function pickSurface(clientX, clientY) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects([...partMeshes.values()], false);
    if (!hits.length) return null;
    const hit = hits[0];
    const partId = hit.object.userData.partId;
    const local = hit.object.worldToLocal(hit.point.clone());
    const def = BODY_PARTS.find((p) => p.id === partId);
    const [a, b, h] = def.size;
    let u, v;
    if (def.kind === 'sphere') {
      u = THREE.MathUtils.clamp(local.x / (a || 1) / 2 + 0.5, 0, 1);
      v = THREE.MathUtils.clamp(local.y / (b || 1) / 2 + 0.5, 0, 1);
    } else if (def.kind === 'box') {
      u = THREE.MathUtils.clamp(local.x / (a || 1) + 0.5, 0, 1);
      v = THREE.MathUtils.clamp(local.y / (b || 1) + 0.5, 0, 1);
    } else {
      // cylinder / capsule：径向角 + 纵向
      u = THREE.MathUtils.clamp(
        (Math.atan2(local.z, local.x) + Math.PI) / (Math.PI * 2),
        0, 1
      );
      v = THREE.MathUtils.clamp(local.y / (h || 1) + 0.5, 0, 1);
    }
    // 法向在世界坐标系中指向相机侧，用来判断前/后面
    const normalWorld = hit.face.normal.clone().transformDirection(hit.object.matrixWorld);
    return {
      partId,
      point: hit.point.clone(),
      normal: normalWorld,
      u: +u.toFixed(4),
      v: +v.toFixed(4),
      side: normalWorld.z >= 0 ? 'front' : 'back'
    };
  }

  // 由 (partId,u,v) 还原世界坐标与朝向，用于挂载标记
  function surfacePoint(partId, u, v) {
    const mesh = partMeshes.get(partId);
    if (!mesh) return null;
    const def = BODY_PARTS.find((p) => p.id === partId);
    const [a, b, h] = def.size;
    const local = new THREE.Vector3();
    if (def.kind === 'sphere') {
      local.set((u - 0.5) * 2 * a, (v - 0.5) * 2 * b, h).normalize();
      local.set(local.x * a, local.y * b, local.z * h);
    } else if (def.kind === 'box') {
      local.set((u - 0.5) * a, (v - 0.5) * b, h / 2);
    } else {
      const theta = u * Math.PI * 2 - Math.PI;
      local.set(Math.cos(theta) * a, (v - 0.5) * h, Math.sin(theta) * a);
    }
    const world = mesh.localToWorld(local.clone());
    const nLocal = new THREE.Vector3(0, 0, 1);
    if (def.kind === 'sphere') nLocal.copy(local.clone().normalize());
    const normal = nLocal.transformDirection(mesh.matrixWorld);
    return { point: world, normal, side: normal.z >= 0 ? 'front' : 'back' };
  }

  return {
    scene,
    camera,
    renderer,
    controls,
    group,
    partMeshes,
    markerLayer,
    pickSurface,
    surfacePoint,
    setOpacity(opacity) {
      for (const m of partMeshes.values()) m.material.opacity = opacity;
    },
    frame(side) {
      if (side === 'front') camera.position.set(0, 1.0, 3.1);
      else if (side === 'back') camera.position.set(0, 1.0, -3.1);
      else if (side === 'left') camera.position.set(-3.1, 1.0, 0);
      else if (side === 'right') camera.position.set(3.1, 1.0, 0);
      controls.target.set(0, 0.92, 0);
      controls.update();
    },
    exportPNG() {
      renderer.render(scene, camera);
      return renderer.domElement.toDataURL('image/png');
    },
    resize,
    dispose
  };
}

// 痣标记：小圆片 + 编号精灵
export function createMarker(label, color) {
  const g = new THREE.Group();
  const disc = new THREE.Mesh(
    new THREE.CircleGeometry(0.014, 24),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(color), side: THREE.DoubleSide, depthTest: false })
  );
  disc.renderOrder = 999;
  g.add(disc);
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.0145, 0.0175, 24),
    new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, depthTest: false, transparent: true })
  );
  ring.renderOrder = 1000;
  g.add(ring);

  const cnv = document.createElement('canvas');
  cnv.width = 256;
  cnv.height = 96;
  const ctx = cnv.getContext('2d');
  ctx.fillStyle = 'rgba(10,16,24,0.85)';
  roundRect(ctx, 4, 18, 248, 60, 12);
  ctx.fill();
  ctx.font = 'bold 40px system-ui, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label.length > 9 ? '…' + label.slice(-8) : label, 128, 49);
  const tex = new THREE.CanvasTexture(cnv);
  tex.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true })
  );
  sprite.scale.set(0.11, 0.041, 1);
  sprite.position.y = 0.032;
  sprite.renderOrder = 1001;
  g.add(sprite);
  g.userData.tex = tex;
  return g;
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

export function disposeMarker(group) {
  group.traverse((o) => {
    if (o.geometry) o.geometry.dispose();
    if (o.material) {
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      mats.forEach((m) => {
        if (m.map) m.map.dispose();
        m.dispose();
      });
    }
  });
}
