// ===== three.js 三维场景：道路 / 天桥 / 接入设施 / 拖拽布墩 / 标红 / 意见气泡 =====
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
  CSS2DObject,
  CSS2DRenderer,
} from 'three/addons/renderers/CSS2DRenderer.js';
import type { Approach, Pier, ReviewComment, Scheme } from '../types';
import { approachRise, approachSlope, ratioText, roadGeometry } from '../lib/engine';
import { MIN_CLEARANCE } from '../lib/constants';

const COLORS = {
  steel: 0x8a94a6,
  concrete: 0xd8cfc0,
  error: 0xe53935,
  warning: 0xf9a825,
  asphalt: 0x3a3d42,
  shoulder: 0x4b4f55,
  median: 0x6ab04c,
  ground: 0x8fbc7a,
  pipeline: 0xff7043,
  stair: 0x607d8b,
  ramp: 0xc9bfa8,
  elevator: 0x90a4ae,
  laneLine: 0xf5f5f5,
  railing: 0xcfd8dc,
};

interface SceneCallbacks {
  onPierDrag: (pierId: string, x: number) => void;
  onSelect: (componentId: string | null) => void;
}

export class Scene3D {
  private renderer: THREE.WebGLRenderer;
  private labelRenderer: CSS2DRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private modelGroup = new THREE.Group();
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  private dragging: Pier | null = null;
  private downPos = new THREE.Vector2();
  private scheme: Scheme | null = null;
  private cb: SceneCallbacks;
  private resizeObs: ResizeObserver;
  private selectedId: string | null = null;

  constructor(private container: HTMLElement, cb: SceneCallbacks) {
    this.cb = cb;
    const w = container.clientWidth;
    const h = container.clientHeight;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.setSize(w, h);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(this.renderer.domElement);

    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(w, h);
    Object.assign(this.labelRenderer.domElement.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      'pointer-events': 'none',
    });
    container.appendChild(this.labelRenderer.domElement);

    this.scene.background = new THREE.Color(0xeef2f6);
    this.scene.fog = new THREE.Fog(0xeef2f6, 120, 260);

    this.camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 500);
    this.camera.position.set(42, 30, 48);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.target.set(0, 3, 0);
    this.controls.maxPolarAngle = Math.PI / 2.05;

    const hemi = new THREE.HemisphereLight(0xffffff, 0x8a9a7b, 1.0);
    const sun = new THREE.DirectionalLight(0xffffff, 1.6);
    sun.position.set(30, 50, 20);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -60;
    sun.shadow.camera.right = 60;
    sun.shadow.camera.top = 60;
    sun.shadow.camera.bottom = -60;
    this.scene.add(hemi, sun);

    const grid = new THREE.GridHelper(160, 80, 0x9fb3c8, 0xc5d2de);
    (grid.material as THREE.Material).opacity = 0.5;
    (grid.material as THREE.Material).transparent = true;
    this.scene.add(grid);
    this.scene.add(this.modelGroup);

    this.renderer.domElement.addEventListener('pointerdown', this.onPointerDown);
    window.addEventListener('pointermove', this.onPointerMove);
    window.addEventListener('pointerup', this.onPointerUp);

    this.resizeObs = new ResizeObserver(() => this.resize());
    this.resizeObs.observe(container);

    this.animate();
  }

  private animate = () => {
    requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  };

  private resize() {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    if (!w || !h) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    this.labelRenderer.setSize(w, h);
  }

  // ===== 模型重建 =====
  render(scheme: Scheme, flagged: { errors: Set<string>; warnings: Set<string> }) {
    this.scheme = scheme;
    this.clearGroup();
    const s = scheme;
    const road = roadGeometry(s);
    // 显示坐标：把路面高程平移到 y=0
    const y0 = s.roadElevation;
    const elev = (abs: number) => abs - y0;
    const clearance = s.girderBottomElev - s.roadElevation;
    const girderColor = (id: string) =>
      flagged.errors.has(id)
        ? COLORS.error
        : flagged.warnings.has(id)
          ? COLORS.warning
          : s.material === 'steel'
            ? COLORS.steel
            : COLORS.concrete;

    // —— 地面 ——
    this.addBox(180, 0.2, 180, 0, -0.15, 0, COLORS.ground, { edge: false, receiveShadow: true });

    // —— 公路横断面（沿 Z 延伸） ——
    const roadLen = 140;
    for (const cw of road.carriageways) {
      this.addBox(cw.xEnd - cw.xStart, 0.12, roadLen, (cw.xStart + cw.xEnd) / 2, 0.02, 0, COLORS.asphalt, { edge: false });
      // 车道虚线
      const lanes = s.lanesPerSide;
      for (let i = 1; i < lanes; i++) {
        const x = cw.xStart + (i * (cw.xEnd - cw.xStart)) / lanes;
        for (let z = -roadLen / 2 + 4; z < roadLen / 2; z += 8) {
          this.addBox(0.12, 0.02, 4, x, 0.1, z, COLORS.laneLine, { edge: false });
        }
      }
    }
    // 中央分隔带
    this.addBox(road.median.xEnd - road.median.xStart, 0.3, roadLen, 0, 0.1, 0, COLORS.median, { edge: false });
    // 管线保护范围
    for (const z of s.pipelines) {
      const mat = new THREE.MeshStandardMaterial({
        color: COLORS.pipeline,
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
      });
      this.addBox(z.xEnd - z.xStart, 0.06, roadLen * 0.92, (z.xStart + z.xEnd) / 2, 0.14, 0, mat, { edge: false });
      this.addLabel(z.name, (z.xStart + z.xEnd) / 2, 0.6, roadLen / 2 - 6, 'pipe-label');
    }

    // —— 主梁 + 桥面 ——
    const girderBottomY = elev(s.girderBottomElev);
    const girder = this.addBox(
      s.span,
      s.girderDepth,
      s.deckWidth,
      0,
      girderBottomY + s.girderDepth / 2,
      0,
      girderColor('main-girder'),
      { componentId: 'main-girder' },
    );
    this.attachCommentBubbles(girder, s.comments, 'main-girder');

    // 桥面铺装
    this.addBox(s.span + 0.6, 0.08, s.deckWidth + 0.4, 0, elev(s.girderBottomElev + s.girderDepth) + 0.04, 0, 0x9e9e9e);
    // 栏杆
    const railY = elev(s.girderBottomElev + s.girderDepth) + 0.7;
    for (const zSide of [-1, 1]) {
      this.addBox(s.span + 0.6, 1.1, 0.08, 0, railY, zSide * (s.deckWidth / 2 + 0.18), COLORS.railing, { edge: false });
    }

    // —— 净空标注（中央分隔带处） ——
    this.addClearanceMarker(0.4, clearance);

    // —— 桥墩 / 桥台 ——
    for (const p of s.piers) {
      const color = flagged.errors.has(p.id)
        ? COLORS.error
        : flagged.warnings.has(p.id)
          ? COLORS.warning
          : COLORS.concrete;
      const topY = girderBottomY;
      const pierMesh = this.addBox(
        p.thickness,
        topY,
        p.width,
        p.x,
        topY / 2,
        0,
        color,
        componentPickable(p.id),
      );
      // 承台
      this.addBox(p.thickness + 1.2, 0.5, p.width + 1.0, p.x, 0.25, 0, 0xb0a595, { edge: false });
      this.addLabel(`${p.name}（X=${p.x.toFixed(1)}m）`, p.x, topY + 0.4, 0, 'pier-label');
      this.attachCommentBubbles(pierMesh, s.comments, p.id);
    }

    // —— 接入设施 ——
    const sideOffset = new Map<string, number>();
    for (const a of s.approaches) {
      const idx = sideOffset.get(a.side) ?? 0;
      sideOffset.set(a.side, idx + 1);
      this.buildApproach(a, idx, s, elev, flagged);
    }
  }

  private buildApproach(
    a: Approach,
    stackIndex: number,
    s: Scheme,
    elev: (abs: number) => number,
    flagged: { errors: Set<string>; warnings: Set<string> },
  ) {
    const dir = a.side === 'left' ? -1 : 1;
    const zOffset = (stackIndex - 0.5) * 4.0;
    const deckTopY = elev(s.girderBottomElev + s.girderDepth + 0.08);
    const color = flagged.errors.has(a.id)
      ? COLORS.error
      : flagged.warnings.has(a.id)
        ? COLORS.warning
        : a.type === 'stair'
          ? COLORS.stair
          : a.type === 'ramp'
            ? COLORS.ramp
            : COLORS.elevator;
    const pick = componentPickable(a.id);
    const startX = dir * s.span / 2;

    if (a.type === 'elevator') {
      const shaft = this.addBox(2.6, deckTopY, 2.6, startX + dir * 0.5, deckTopY / 2, zOffset, color, pick);
      this.addLabel('电梯', startX + dir * 0.5, deckTopY + 0.5, zOffset, 'ap-label');
      this.attachCommentBubbles(shaft, s.comments, a.id);
      return;
    }

    const rise = approachRise(s);
    const run = a.run;
    const endX = startX + dir * run;
    const midX = (startX + endX) / 2;
    const slope = approachSlope(s, a);
    if (a.type === 'ramp') {
      const length = Math.hypot(run, rise);
      const mesh = this.addBox(length, 0.25, a.width, midX, deckTopY / 2, zOffset, color, pick);
      mesh.rotation.z = Math.atan2(rise, run) * -dir;
      // 坡道栏杆
      for (const zSide of [-1, 1]) {
        const rail = this.addBox(length, 0.9, 0.06, midX, deckTopY / 2 + 0.5, zOffset + zSide * (a.width / 2), COLORS.railing, { edge: false });
        rail.rotation.z = mesh.rotation.z;
      }
      this.addLabel(`坡道 1:${slope ? (1 / slope).toFixed(1) : '-'}`, midX, deckTopY + 1.2, zOffset, 'ap-label');
    } else {
      // 梯道：用阶梯块表达
      const steps = Math.max(8, Math.round(rise / 0.15));
      const stepRun = run / steps;
      for (let i = 0; i < steps; i++) {
        const t = (i + 0.5) / steps;
        const x = startX + dir * stepRun * (i + 0.5);
        const h = rise * (1 - t);
        this.addBox(stepRun * 0.92, Math.max(h, 0.12), a.width, x, h / 2, zOffset, color, i === 0 ? pick : undefined);
      }
      this.addLabel(
        slope ? `梯道 ${ratioText(slope)}` : '梯道',
        midX,
        deckTopY * 0.6,
        zOffset,
        'ap-label',
      );
    }
  }

  // —— 净空标注线 ——
  private addClearanceMarker(x: number, clearance: number) {
    const pts = [
      new THREE.Vector3(x, 0.15, 0),
      new THREE.Vector3(x, clearance, 0),
    ];
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineDashedMaterial({
      color: clearance < MIN_CLEARANCE ? COLORS.error : 0x1565c0,
      dashSize: 0.4,
      gapSize: 0.25,
      linewidth: 2,
    });
    const line = new THREE.Line(geo, mat);
    line.computeLineDistances();
    this.modelGroup.add(line);
    this.addLabel(
      `净空 ${clearance.toFixed(2)}m${clearance < MIN_CLEARANCE ? '（<5m 禁止提交）' : ''}`,
      x + 0.6,
      clearance / 2,
      0,
      clearance < MIN_CLEARANCE ? 'clearance-label bad' : 'clearance-label',
    );
  }

  // —— 构件上的退回意见气泡 ——
  private attachCommentBubbles(mesh: THREE.Object3D, comments: ReviewComment[], componentId: string) {
    const list = comments.filter((c) => c.componentId === componentId);
    if (!list.length) return;
    const el = document.createElement('div');
    el.className = 'comment-bubble';
    el.innerHTML = `💬 ${list.length} 条意见`;
    el.title = list.map((c) => `[${c.date}] ${c.reviewer}：${c.text}`).join('\n');
    const obj = new CSS2DObject(el);
    obj.position.set(0, 1.2, 0);
    mesh.add(obj);
  }

  // —— 基础构件工具 ——
  private addBox(
    sx: number,
    sy: number,
    sz: number,
    x: number,
    y: number,
    z: number,
    color: number | THREE.Material,
    opts: { componentId?: string; edge?: boolean; receiveShadow?: boolean } = {},
  ): THREE.Mesh {
    const geo = new THREE.BoxGeometry(sx, sy, sz);
    const mat =
      color instanceof THREE.Material
        ? color
        : new THREE.MeshStandardMaterial({ color, roughness: 0.65, metalness: 0.15 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = opts.receiveShadow ?? true;
    if (opts.componentId) {
      mesh.userData.componentId = opts.componentId;
      mesh.userData.pickable = true;
    }
    if (opts.edge !== false) {
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(geo),
        new THREE.LineBasicMaterial({ color: 0x2b3440, transparent: true, opacity: 0.35 }),
      );
      mesh.add(edges);
    }
    this.modelGroup.add(mesh);
    return mesh;
  }

  private addLabel(text: string, x: number, y: number, z: number, className: string) {
    const el = document.createElement('div');
    el.className = `scene-label ${className}`;
    el.textContent = text;
    const obj = new CSS2DObject(el);
    obj.position.set(x, y, z);
    this.modelGroup.add(obj);
  }

  private clearGroup() {
    this.modelGroup.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.geometry.dispose();
        const m = o.material;
        if (Array.isArray(m)) m.forEach((x) => x.dispose());
        else m.dispose();
      }
    });
    this.modelGroup.clear();
  }

  // ===== 拾取与拖拽 =====
  private updatePointer(e: PointerEvent) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  }

  private pickPier(): Pier | null {
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hits = this.raycaster.intersectObjects(this.modelGroup.children, true);
    for (const hit of hits) {
      const id = hit.object.userData.componentId as string | undefined;
      if (id && id.startsWith('pier-')) {
        return this.scheme?.piers.find((p) => p.id === id) ?? null;
      }
    }
    return null;
  }

  private onPointerDown = (e: PointerEvent) => {
    this.downPos.set(e.clientX, e.clientY);
    this.updatePointer(e);
    const pier = this.pickPier();
    if (pier) {
      this.dragging = pier;
      this.controls.enabled = false;
      this.renderer.domElement.style.cursor = 'grabbing';
    }
  };

  private onPointerMove = (e: PointerEvent) => {
    this.updatePointer(e);
    if (this.dragging && this.scheme) {
      this.raycaster.setFromCamera(this.pointer, this.camera);
      const hit = new THREE.Vector3();
      if (this.raycaster.ray.intersectPlane(this.dragPlane, hit)) {
        const limit = this.scheme.span / 2 - 0.5;
        const x = THREE.MathUtils.clamp(hit.x, -limit, limit);
        this.cb.onPierDrag(this.dragging.id, Number(x.toFixed(2)));
      }
      return;
    }
    // 悬停光标
    const pier = this.pickPier();
    this.renderer.domElement.style.cursor = pier ? 'grab' : 'default';
  };

  private onPointerUp = (e: PointerEvent) => {
    const moved = Math.hypot(e.clientX - this.downPos.x, e.clientY - this.downPos.y);
    if (this.dragging) {
      this.dragging = null;
      this.controls.enabled = true;
      this.renderer.domElement.style.cursor = 'default';
      return;
    }
    if (moved < 5) {
      // 普通点选：构件
      this.updatePointer(e);
      this.raycaster.setFromCamera(this.pointer, this.camera);
      const hits = this.raycaster.intersectObjects(this.modelGroup.children, true);
      const id = hits.find((h) => h.object.userData.componentId)?.object.userData
        .componentId as string | undefined;
      this.selectedId = id ?? null;
      this.cb.onSelect(this.selectedId);
    }
  };

  setSelected(_id: string | null) {
    this.selectedId = _id;
  }

  dispose() {
    this.resizeObs.disconnect();
    this.renderer.domElement.removeEventListener('pointerdown', this.onPointerDown);
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.onPointerUp);
    this.controls.dispose();
    this.clearGroup();
    this.renderer.dispose();
    this.container.innerHTML = '';
  }
}

function componentPickable(id: string) {
  return { componentId: id };
}
