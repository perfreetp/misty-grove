// 三维脊柱场景:程序化腰椎模型(L1-L5+骶骨)、硬膜囊、神经根、椎间孔、穿刺针
// 单位:毫米(mm)。Y轴=头侧, Z轴=腹侧(前方), X轴=左右(左为负)
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const LEVELS = ['L1', 'L2', 'L3', 'L4', 'L5']
const BODY_H = 26
const DISC_H = 10
const PITCH = BODY_H + DISC_H // 36
const SEGMENTS = ['L1-L2', 'L2-L3', 'L3-L4', 'L4-L5', 'L5-S1']

const DURAL_A = new THREE.Vector3(0, 24, -17)   // 硬膜囊轴线上端
const DURAL_B = new THREE.Vector3(0, -186, -17) // 下端(骶管)
const DURAL_R = 8

const levelY = i => -i * PITCH                 // 椎体中心
const discY = i => -i * PITCH - BODY_H / 2 - DISC_H / 2 // 第i个节段椎间盘中心

function boneMat() {
  return new THREE.MeshStandardMaterial({ color: 0xe6dbc8, roughness: 0.75, metalness: 0.05 })
}

function buildVertebra(i) {
  const g = new THREE.Group()
  const label = LEVELS[i]
  const mat = boneMat()

  const body = new THREE.Mesh(new THREE.CylinderGeometry(21, 23, BODY_H, 28), mat)
  body.scale.z = 0.72
  body.userData = { kind: 'vertebra', label }
  g.add(body)

  const pedicleGeo = new THREE.BoxGeometry(6, 10, 12)
  for (const s of [-1, 1]) {
    const p = new THREE.Mesh(pedicleGeo, mat)
    p.position.set(s * 9, 0, -19)
    p.userData = { kind: 'vertebra', label }
    g.add(p)
  }
  const lamina = new THREE.Mesh(new THREE.BoxGeometry(16, 15, 4), mat)
  lamina.position.set(0, 0, -29)
  lamina.userData = { kind: 'vertebra', label }
  g.add(lamina)

  const spinous = new THREE.Mesh(new THREE.BoxGeometry(5, 13, 18), mat)
  spinous.position.set(0, -3, -38)
  spinous.userData = { kind: 'vertebra', label }
  g.add(spinous)

  const tpGeo = new THREE.BoxGeometry(15, 4, 5)
  for (const s of [-1, 1]) {
    const tp = new THREE.Mesh(tpGeo, mat)
    tp.position.set(s * 20, 4, -17)
    tp.userData = { kind: 'vertebra', label }
    g.add(tp)
  }
  const apGeo = new THREE.BoxGeometry(6, 10, 7)
  for (const s of [-1, 1]) {
    const ap = new THREE.Mesh(apGeo, mat)
    ap.position.set(s * 11, -3, -26)
    ap.userData = { kind: 'vertebra', label }
    g.add(ap)
  }
  g.position.y = levelY(i)
  return g
}

function buildDisc(i) {
  const geo = new THREE.CylinderGeometry(20, 20, DISC_H, 28)
  const mat = new THREE.MeshStandardMaterial({ color: 0x8fa8b8, roughness: 0.6, transparent: true, opacity: 0.85 })
  const m = new THREE.Mesh(geo, mat)
  m.scale.z = 0.72
  m.position.y = discY(i)
  m.userData = { kind: 'disc', label: SEGMENTS[i] + ' 椎间盘' }
  return m
}

function buildRoot(segIdx, side) {
  // 神经根:自硬膜囊发出,经椎间孔穿出。side: -1左 / 1右
  const s = side
  const y = discY(segIdx)
  const pts = [
    new THREE.Vector3(s * 4, y + 34, -17),
    new THREE.Vector3(s * 7, y + 15, -17),
    new THREE.Vector3(s * 13, y + 6, -16),
    new THREE.Vector3(s * 20, y + 1, -14),
    new THREE.Vector3(s * 28, y - 4, -10),
    new THREE.Vector3(s * 35, y - 8, -4),
  ]
  const curve = new THREE.CatmullRomCurve3(pts)
  const rootName = LEVELS[segIdx]
  const sideLabel = s < 0 ? '左' : '右'
  const mat = new THREE.MeshStandardMaterial({ color: 0xd8c46a, roughness: 0.5, emissive: 0x000000 })
  const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 2.2, 8, false), mat)
  tube.userData = { kind: 'nerveRoot', label: `${sideLabel}${rootName}神经根`, root: rootName, side: sideLabel, segIdx }
  return { tube, curve, samples: curve.getSpacedPoints(80), name: `${sideLabel}${rootName}`, segIdx }
}

function pointSegDist(p, a, b) {
  const ab = new THREE.Vector3().subVectors(b, a)
  const t = Math.max(0, Math.min(1, new THREE.Vector3().subVectors(p, a).dot(ab) / ab.lengthSq()))
  return p.distanceTo(new THREE.Vector3().copy(a).addScaledVector(ab, t))
}

export class SpineScene {
  constructor(container, opts = {}) {
    this.opts = opts
    this.container = container
    this.segment = opts.segment || 'L4-L5'
    this.side = opts.side === '右' ? 1 : -1
    this.needle = { az: 45, el: 10, advance: 0 }
    this.marks = { vertebra: '', foramen: '', nerveRoot: '' }
    this.alert = false
    this._disposed = false

    const w = container.clientWidth || 800
    const h = container.clientHeight || 600

    this.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true })
    this.renderer.setSize(w, h)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(this.renderer.domElement)

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x10151c)
    this.scene.fog = new THREE.Fog(0x10151c, 400, 900)

    this.camera = new THREE.PerspectiveCamera(45, w / h, 1, 2000)
    this.camera.position.set(-150, -50, -190)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.target.set(0, -85, -12)
    this.controls.enableDamping = true

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.55))
    const dir = new THREE.DirectionalLight(0xffffff, 1.4)
    dir.position.set(-120, 120, -80)
    this.scene.add(dir)
    const fill = new THREE.DirectionalLight(0x88aaff, 0.4)
    fill.position.set(150, -40, 120)
    this.scene.add(fill)

    // ----- 脊柱模型 -----
    this.pickables = []
    this.vertebraMeshes = []
    for (let i = 0; i < 5; i++) {
      const v = buildVertebra(i)
      this.scene.add(v)
      v.traverse(o => { if (o.isMesh) { this.pickables.push(o); this.vertebraMeshes.push(o) } })
      if (i < 5) this.scene.add(buildDisc(i))
    }
    // 骶骨
    const sacrum = new THREE.Mesh(new THREE.BoxGeometry(46, 30, 26), boneMat())
    sacrum.position.set(0, levelY(4) - PITCH + 2, -6)
    sacrum.userData = { kind: 'vertebra', label: 'S1' }
    this.scene.add(sacrum)
    this.pickables.push(sacrum)

    // 硬膜囊
    const duralLen = DURAL_A.distanceTo(DURAL_B)
    this.dural = new THREE.Mesh(
      new THREE.CylinderGeometry(DURAL_R, DURAL_R * 0.7, duralLen, 20),
      new THREE.MeshStandardMaterial({ color: 0xf0e6a0, transparent: true, opacity: 0.32, roughness: 0.4 })
    )
    this.dural.position.copy(new THREE.Vector3().addVectors(DURAL_A, DURAL_B).multiplyScalar(0.5))
    this.dural.userData = { kind: 'dural', label: '硬膜囊' }
    this.scene.add(this.dural)
    this.pickables.push(this.dural)

    // 神经根
    this.roots = []
    for (let i = 0; i < 5; i++) {
      for (const s of [-1, 1]) {
        const r = buildRoot(i, s)
        this.roots.push(r)
        this.scene.add(r.tube)
        this.pickables.push(r.tube)
      }
    }

    // 椎间孔(可点击代理球)
    this.foramina = []
    const foramGeo = new THREE.SphereGeometry(5, 16, 16)
    for (let i = 0; i < 5; i++) {
      for (const s of [-1, 1]) {
        const f = new THREE.Mesh(foramGeo, new THREE.MeshStandardMaterial({
          color: 0x4cc9f0, transparent: true, opacity: 0.35, emissive: 0x0a2a3a,
        }))
        f.position.set(s * 23, discY(i), -14)
        f.userData = { kind: 'foramen', label: `${SEGMENTS[i]}${s < 0 ? '左' : '右'}椎间孔`, segIdx: i, side: s < 0 ? '左' : '右' }
        this.scene.add(f)
        this.foramina.push(f)
        this.pickables.push(f)
      }
    }

    // 靶点标记
    this.targetMarker = new THREE.Mesh(
      new THREE.SphereGeometry(2, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xff4444 })
    )
    this.scene.add(this.targetMarker)

    // ----- 穿刺针 -----
    this.needleGroup = new THREE.Group()
    this.needleMat = new THREE.MeshStandardMaterial({ color: 0xd0d4d8, metalness: 0.85, roughness: 0.3 })
    this.tipMat = new THREE.MeshStandardMaterial({ color: 0xff7043, metalness: 0.4, roughness: 0.4, emissive: 0x331005 })
    const LEN = 150
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, LEN, 12), this.needleMat)
    shaft.geometry.rotateX(Math.PI / 2)
    shaft.position.z = -LEN / 2 // 针尖在局部 z=0
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.9, 5, 12), this.tipMat)
    tip.geometry.rotateX(Math.PI / 2)
    tip.position.z = 2.5
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.2, 14, 12), new THREE.MeshStandardMaterial({ color: 0x3a6ea8, roughness: 0.5 }))
    hub.geometry.rotateX(Math.PI / 2)
    hub.position.z = -LEN - 7
    this.needleGroup.add(shaft, tip, hub)
    this.needleGroup.userData = { kind: 'needle' }
    this.needleGroup.traverse(o => { o.userData.kind = 'needle' })
    this.scene.add(this.needleGroup)
    this.needlePick = [shaft, tip, hub]

    // 皮肤参考面(半透明)
    const skin = new THREE.Mesh(
      new THREE.PlaneGeometry(320, 320),
      new THREE.MeshStandardMaterial({ color: 0xc9a189, transparent: true, opacity: 0.12, side: THREE.DoubleSide })
    )
    skin.position.set(0, -85, -60)
    this.scene.add(skin)

    // ----- 交互 -----
    this.raycaster = new THREE.Raycaster()
    this.pointer = new THREE.Vector2()
    this._dragNeedle = false
    this._downPos = null

    const el = this.renderer.domElement
    this._onPointerDown = e => {
      this._downPos = { x: e.clientX, y: e.clientY }
      if (!this.opts.editable) return
      const hit = this._raycast(e, this.needlePick)
      if (hit) {
        this._dragNeedle = true
        this.controls.enabled = false
        el.setPointerCapture(e.pointerId)
      }
    }
    this._onPointerMove = e => {
      if (this._dragNeedle) {
        this.needle.az = THREE.MathUtils.clamp(this.needle.az + e.movementX * 0.2, 0, 80)
        this.needle.el = THREE.MathUtils.clamp(this.needle.el - e.movementY * 0.2, -30, 45)
        this._updateNeedle()
        this.opts.onNeedleChange?.({ ...this.needle })
      } else {
        const hit = this._raycast(e, this.pickables.concat(this.needlePick))
        this.opts.onHover?.(hit ? (hit.object.userData.kind === 'needle' ? '穿刺针(拖拽调整角度)' : hit.object.userData.label) : '')
      }
    }
    this._onPointerUp = e => {
      const wasDrag = this._dragNeedle
      this._dragNeedle = false
      this.controls.enabled = true
      if (!this.opts.editable || wasDrag) return
      if (this._downPos && Math.hypot(e.clientX - this._downPos.x, e.clientY - this._downPos.y) < 5) {
        const hit = this._raycast(e, this.pickables)
        if (hit && ['vertebra', 'foramen', 'nerveRoot'].includes(hit.object.userData.kind)) {
          this.opts.onMark?.({ kind: hit.object.userData.kind, label: hit.object.userData.label })
        }
      }
      this._downPos = null
    }
    el.addEventListener('pointerdown', this._onPointerDown)
    el.addEventListener('pointermove', this._onPointerMove)
    el.addEventListener('pointerup', this._onPointerUp)

    this._resizeObs = new ResizeObserver(() => this.resize())
    this._resizeObs.observe(container)

    this.setSegment(this.segment, this.opts.side || '左')
    this.setNeedle(opts.needle || {})
    this._animate()
  }

  _raycast(e, objects) {
    const rect = this.renderer.domElement.getBoundingClientRect()
    this.pointer.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1)
    this.raycaster.setFromCamera(this.pointer, this.camera)
    const hits = this.raycaster.intersectObjects(objects, false)
    return hits[0] || null
  }

  _targetPos() {
    const i = SEGMENTS.indexOf(this.segment)
    return new THREE.Vector3(this.side * 23, discY(Math.max(0, i)), -14)
  }

  _needleDir() {
    const az = THREE.MathUtils.degToRad(this.needle.az)
    const el = THREE.MathUtils.degToRad(this.needle.el)
    const s = this.side
    return new THREE.Vector3(-s * Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el)).normalize()
  }

  _updateNeedle() {
    const target = this._targetPos()
    const dir = this._needleDir()
    this.needleGroup.position.copy(target).addScaledVector(dir, this.needle.advance)
    this.needleGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir)
    this.targetMarker.position.copy(target)
    this._reportDistances()
  }

  tipWorld() {
    return this.needleGroup.position.clone() // 针尖 = 组原点(局部z=0)
  }

  computeDistances() {
    const tip = this.tipWorld()
    let root = Infinity, rootName = ''
    for (const r of this.roots) {
      for (const p of r.samples) {
        const d = tip.distanceTo(p) - 2.2 // 减去根管半径
        if (d < root) { root = d; rootName = r.name }
      }
    }
    const dural = pointSegDist(tip, DURAL_A, DURAL_B) - DURAL_R
    return { root: Math.max(0, root), rootName, dural: Math.max(0, dural), tip: tip.toArray().map(v => +v.toFixed(1)) }
  }

  _reportDistances() {
    const d = this.computeDistances()
    const bad = d.root < 3 || d.dural < 3
    if (bad !== this.alert) {
      this.alert = bad
      this.tipMat.color.set(bad ? 0xff2222 : 0xff7043)
      this.tipMat.emissive.set(bad ? 0x881111 : 0x331005)
    }
    this.opts.onDistances?.(d)
  }

  setSegment(segment, sideLabel) {
    this.segment = segment
    this.side = sideLabel === '右' ? 1 : -1
    const segIdx = SEGMENTS.indexOf(segment)
    // 高亮本节段神经根与椎间孔
    for (const r of this.roots) {
      const active = r.segIdx === segIdx
      r.tube.material.color.set(active ? 0xffb020 : 0xd8c46a)
      r.tube.material.emissive.set(active ? 0x553300 : 0x000000)
    }
    for (const f of this.foramina) {
      const active = f.userData.segIdx === segIdx && f.userData.side === sideLabel
      f.material.opacity = active ? 0.75 : 0.25
    }
    this._updateNeedle()
  }

  setNeedle(n) {
    Object.assign(this.needle, n)
    this._updateNeedle()
  }

  setMarks(marks) {
    this.marks = { ...marks }
    const markColor = 0x35d07f
    for (const m of this.vertebraMeshes) {
      m.material = m.material.clone()
      m.material.emissive = new THREE.Color(m.userData.label === marks.vertebra ? markColor : 0x000000)
      m.material.emissiveIntensity = m.userData.label === marks.vertebra ? 0.35 : 0
    }
    for (const f of this.foramina) {
      const hit = marks.foramen && f.userData.label.includes(marks.foramen.replace('椎间孔', ''))
      f.material.color.set(hit ? markColor : 0x4cc9f0)
    }
    for (const r of this.roots) {
      const hit = marks.nerveRoot && r.tube.userData.label === marks.nerveRoot
      if (hit) {
        r.tube.material.color.set(markColor)
        r.tube.material.emissive.set(0x0a4426)
      }
    }
  }

  screenshot() {
    this.renderer.render(this.scene, this.camera)
    return this.renderer.domElement.toDataURL('image/png')
  }

  resize() {
    const w = this.container.clientWidth, h = this.container.clientHeight
    if (!w || !h) return
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h)
  }

  _animate() {
    if (this._disposed) return
    this._raf = requestAnimationFrame(() => this._animate())
    this.controls.update()
    const t = performance.now() / 1000
    this.targetMarker.scale.setScalar(1 + 0.25 * Math.sin(t * 4))
    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    this._disposed = true
    cancelAnimationFrame(this._raf)
    this._resizeObs.disconnect()
    const el = this.renderer.domElement
    el.removeEventListener('pointerdown', this._onPointerDown)
    el.removeEventListener('pointermove', this._onPointerMove)
    el.removeEventListener('pointerup', this._onPointerUp)
    this.controls.dispose()
    this.renderer.dispose()
    el.parentNode?.removeChild(el)
  }
}
