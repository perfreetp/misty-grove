<template>
  <div ref="container" class="scene-container"></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { SchemeParams, SimResult } from '../types'
import { parseDateTime, sunPosition } from '../utils/solar'

const props = defineProps<{ params: SchemeParams; result: SimResult | null }>()

const container = ref<HTMLDivElement | null>(null)
let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let controls: OrbitControls
let worldGroup: THREE.Group | null = null
let raf = 0
let resizeObs: ResizeObserver | null = null

const ROAD_W = 10.5
const PORTAL_H = 7.2

function buildWorld(): THREE.Group {
  const g = new THREE.Group()
  const p = props.params
  const Lc = Math.max(5, p.canopyLength)
  const spacing = Math.max(0.3, p.grilleSpacing)

  // ---- 地形 ----
  const groundGeo = new THREE.PlaneGeometry(400, 400, 48, 48)
  const pos = groundGeo.attributes.position
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const y = pos.getY(i)
    // 平面局部坐标: 之后旋转为水平; 在洞门后方(-x 方向)隆起山体
    const hill = 26 * Math.exp(-Math.pow((y + 45) / 45, 2)) * Math.exp(-Math.pow(x / 90, 2))
    pos.setZ(i, hill + Math.sin(x * 0.08) * Math.cos(y * 0.06) * 1.2)
  }
  groundGeo.computeVertexNormals()
  const ground = new THREE.Mesh(
    groundGeo,
    new THREE.MeshLambertMaterial({ color: 0x6f8f5f })
  )
  ground.rotation.x = -Math.PI / 2
  ground.rotation.z = Math.PI / 2 // 局部 y 轴对齐世界 -x(洞门后方)
  g.add(ground)

  // ---- 路面 ----
  const roadLen = Lc + 60
  const road = new THREE.Mesh(
    new THREE.BoxGeometry(roadLen, 0.2, ROAD_W),
    new THREE.MeshLambertMaterial({ color: 0x3a3d42 })
  )
  road.position.set(Lc / 2 + 15, 0.1, 0)
  g.add(road)
  // 车道线
  for (const z of [-ROAD_W / 4, ROAD_W / 4]) {
    const line = new THREE.Mesh(
      new THREE.BoxGeometry(roadLen, 0.02, 0.15),
      new THREE.MeshBasicMaterial({ color: 0xd8d8d8 })
    )
    line.position.set(Lc / 2 + 15, 0.22, z)
    g.add(line)
  }

  // ---- 洞门端墙(带拱形洞口的断面) ----
  const shape = new THREE.Shape()
  const wallW = 16
  const wallH = 12
  shape.moveTo(-wallW / 2, 0)
  shape.lineTo(wallW / 2, 0)
  shape.lineTo(wallW / 2, wallH)
  shape.lineTo(-wallW / 2, wallH)
  shape.closePath()
  // 马蹄形洞口(圆拱+直墙)
  const hole = new THREE.Path()
  const r = ROAD_W / 2
  const springH = PORTAL_H - r // 起拱线高
  hole.moveTo(-r, 0)
  hole.lineTo(-r, springH)
  hole.absarc(0, springH, r, Math.PI, 0, true)
  hole.lineTo(r, 0)
  hole.closePath()
  shape.holes.push(hole)
  const wall = new THREE.Mesh(
    new THREE.ExtrudeGeometry(shape, { depth: 1.2, bevelEnabled: false }),
    new THREE.MeshLambertMaterial({ color: 0x9aa0a6 })
  )
  wall.rotation.y = Math.PI / 2
  wall.position.set(-0.6, 0, 0)
  g.add(wall)

  // ---- 隧道暗洞(短管) ----
  const tube = new THREE.Mesh(
    new THREE.CylinderGeometry(r + 0.4, r + 0.4, 14, 24, 1, true, 0, Math.PI),
    new THREE.MeshLambertMaterial({ color: 0x1c1e22, side: THREE.DoubleSide })
  )
  tube.rotation.z = Math.PI / 2
  tube.rotation.y = Math.PI / 2
  tube.position.set(-7.5, springH, 0)
  g.add(tube)

  // ---- 遮光棚: 立柱 + 纵梁 + 格栅 ----
  const canopyH = PORTAL_H + 0.8
  const steel = new THREE.MeshLambertMaterial({ color: 0x4f6f8f })
  const grilleMat = new THREE.MeshLambertMaterial({ color: 0x2f4a63 })
  // 立柱(每 5m 一排, 两侧)
  for (let x = 0; x <= Lc; x += 5) {
    for (const z of [-ROAD_W / 2 - 0.6, ROAD_W / 2 + 0.6]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, canopyH, 10), steel)
      post.position.set(x, canopyH / 2, z)
      g.add(post)
    }
  }
  // 纵梁
  for (const z of [-ROAD_W / 2 - 0.6, ROAD_W / 2 + 0.6]) {
    const beam = new THREE.Mesh(new THREE.BoxGeometry(Lc, 0.35, 0.35), steel)
    beam.position.set(Lc / 2, canopyH, z)
    g.add(beam)
  }
  // 格栅横梁(按间距)
  const n = Math.floor(Lc / spacing)
  for (let i = 0; i <= n; i++) {
    const bar = new THREE.Mesh(
      new THREE.BoxGeometry(Math.min(0.25, spacing * 0.4), Math.max(0.15, p.grilleDepth), ROAD_W + 1.6),
      grilleMat
    )
    bar.position.set(i * spacing, canopyH + Math.max(0.15, p.grilleDepth) / 2, 0)
    g.add(bar)
  }

  // ---- 超限/陡跳红色标记 ----
  if (props.result) {
    const red = new THREE.MeshBasicMaterial({ color: 0xe02424 })
    const orange = new THREE.MeshBasicMaterial({ color: 0xf59e0b })
    for (const q of props.result.points) {
      if (!q.exceeded && !q.steep) continue
      const m = new THREE.Mesh(new THREE.ConeGeometry(0.45, 1.4, 8), q.exceeded ? red : orange)
      m.position.set(q.x, 1.0, 0)
      m.rotation.x = Math.PI
      g.add(m)
    }
  }

  // 整体旋转到洞口朝向(方位角: 0=北, 世界北=-Z)
  g.rotation.y = THREE.MathUtils.degToRad(90 - p.orientation)
  return g
}

function buildSkyAndSun(): void {
  if (!scene) return
  // 清除旧光源
  const olds = scene.children.filter((c) => c.userData.sun)
  olds.forEach((o) => scene.remove(o))

  const p = props.params
  const sun = sunPosition(p.latitude, parseDateTime(p.simDate, p.simTime))
  const alt = THREE.MathUtils.degToRad(Math.max(-5, sun.altitude))
  const az = THREE.MathUtils.degToRad(sun.azimuth)
  const dir = new THREE.Vector3(
    Math.sin(az) * Math.cos(alt),
    Math.sin(alt),
    -Math.cos(az) * Math.cos(alt)
  )

  const hemi = new THREE.HemisphereLight(0xbfd7ea, 0x4a5540, sun.altitude > 0 ? 0.9 : 0.25)
  hemi.userData.sun = true
  scene.add(hemi)

  const dl = new THREE.DirectionalLight(0xfff2d8, sun.altitude > 0 ? 2.2 : 0.05)
  dl.position.copy(dir.clone().multiplyScalar(180))
  dl.userData.sun = true
  scene.add(dl)

  // 太阳圆盘
  const sunMesh = new THREE.Mesh(
    new THREE.SphereGeometry(4, 16, 16),
    new THREE.MeshBasicMaterial({ color: sun.altitude > 0 ? 0xffd75e : 0x555566 })
  )
  sunMesh.position.copy(dir.clone().multiplyScalar(220))
  sunMesh.userData.sun = true
  scene.add(sunMesh)

  // 太阳当日轨迹线
  const pts: THREE.Vector3[] = []
  const day = parseDateTime(p.simDate, '00:00')
  for (let min = 300; min <= 1140; min += 20) {
    const t = new Date(day)
    t.setHours(Math.floor(min / 60), min % 60)
    const sp = sunPosition(p.latitude, t)
    if (sp.altitude < -2) continue
    const a = THREE.MathUtils.degToRad(sp.altitude)
    const z = THREE.MathUtils.degToRad(sp.azimuth)
    pts.push(
      new THREE.Vector3(
        Math.sin(z) * Math.cos(a) * 210,
        Math.sin(a) * 210,
        -Math.cos(z) * Math.cos(a) * 210
      )
    )
  }
  if (pts.length > 1) {
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineDashedMaterial({ color: 0xffb84d, dashSize: 4, gapSize: 3 })
    )
    line.computeLineDistances()
    line.userData.sun = true
    scene.add(line)
  }

  // 北向箭头
  const north = new THREE.ArrowHelper(
    new THREE.Vector3(0, 0, -1),
    new THREE.Vector3(0, 0.5, 0),
    25,
    0x3b82f6,
    4,
    2
  )
  north.userData.sun = true
  scene.add(north)

  scene.background = new THREE.Color(sun.altitude > 0 ? 0x9fc5e8 : 0x141a26)
}

function rebuild(): void {
  if (!scene) return
  if (worldGroup) {
    scene.remove(worldGroup)
    worldGroup.traverse((o) => {
      const mesh = o as THREE.Mesh
      if (mesh.geometry) mesh.geometry.dispose()
    })
  }
  worldGroup = buildWorld()
  scene.add(worldGroup)
  buildSkyAndSun()
}

onMounted(() => {
  const el = container.value!
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(55, el.clientWidth / el.clientHeight, 0.1, 1000)
  camera.position.set(70, 45, 70)
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(el.clientWidth, el.clientHeight)
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
  el.appendChild(renderer.domElement)
  controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(20, 4, 0)
  controls.enableDamping = true
  rebuild()
  const loop = () => {
    raf = requestAnimationFrame(loop)
    controls.update()
    renderer!.render(scene, camera)
  }
  loop()
  resizeObs = new ResizeObserver(() => {
    if (!renderer) return
    camera.aspect = el.clientWidth / el.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(el.clientWidth, el.clientHeight)
  })
  resizeObs.observe(el)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  resizeObs?.disconnect()
  controls?.dispose()
  renderer?.dispose()
})

watch(() => [props.params, props.result], rebuild, { deep: true })
</script>

<style scoped>
.scene-container {
  width: 100%;
  height: 100%;
  min-height: 380px;
  border-radius: 8px;
  overflow: hidden;
}
</style>
