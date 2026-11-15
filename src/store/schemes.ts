import { reactive, watch } from 'vue'
import type { Role, Scheme, SchemeParams, SchemeStatus, SchemeVersion } from '../types'
import { runSimulation } from '../utils/illuminance'

const STORAGE_KEY = 'tunnel-shading-schemes-v1'
const SESSION_KEY = 'tunnel-shading-session-v1'

export interface Session {
  role: Role
  operator: string
}

interface Store {
  schemes: Scheme[]
  session: Session
}

function now(): string {
  return new Date().toLocaleString('zh-CN', { hour12: false })
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}

function defaultParams(): SchemeParams {
  return {
    tunnelName: '',
    portalName: '进口',
    stake: 'K0+000',
    orientation: 90,
    latitude: 30.5,
    canopyLength: 60,
    grilleSpacing: 1.5,
    grilleDepth: 0.6,
    thresholdPct: 3,
    simDate: `${new Date().getFullYear()}-06-21`,
    simTime: '12:00'
  }
}

function makeScheme(params: SchemeParams, operator: string): Scheme {
  const s: Scheme = {
    id: uid(),
    status: 'draft',
    reworkCount: 0,
    locked: false,
    current: { version: 1, params, result: null, submittedAt: '', submittedBy: operator },
    history: [],
    returns: [],
    annotations: [],
    audit: [{ action: '新建方案单', operator, role: 'designer', time: now() }],
    createdAt: now()
  }
  return s
}

function load(): Store {
  let schemes: Scheme[] = []
  let session: Session = { role: 'designer', operator: '设计员A' }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) schemes = JSON.parse(raw)
  } catch { /* ignore */ }
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (raw) session = JSON.parse(raw)
  } catch { /* ignore */ }
  if (schemes.length === 0) schemes = seed()
  return reactive({ schemes, session })
}

function seed(): Scheme[] {
  const demo = makeScheme(
    {
      ...defaultParams(),
      tunnelName: '青云山隧道',
      portalName: '进口',
      stake: 'K12+380',
      orientation: 95,
      latitude: 29.8,
      canopyLength: 72,
      grilleSpacing: 1.2,
      grilleDepth: 0.7,
      thresholdPct: 3
    },
    '设计员A'
  )
  demo.current.result = runSimulation(demo.current.params)
  submitScheme(demo, '设计员A')
  approveScheme(demo, '审核人B')
  const demo2 = makeScheme(
    {
      ...defaultParams(),
      tunnelName: '青云山隧道',
      portalName: '出口',
      stake: 'K14+105',
      orientation: 268,
      latitude: 29.8,
      canopyLength: 30,
      grilleSpacing: 3.0,
      grilleDepth: 0.4,
      thresholdPct: 4
    },
    '设计员A'
  )
  demo2.current.result = runSimulation(demo2.current.params)
  return [demo, demo2]
}

export const store = load()

watch(
  () => [store.schemes, store.session],
  () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store.schemes))
      localStorage.setItem(SESSION_KEY, JSON.stringify(store.session))
    } catch { /* ignore */ }
  },
  { deep: true }
)

// ============ 操作(全部记审计日志) ============
function log(s: Scheme, action: string, detail?: string): void {
  s.audit.push({ action, operator: store.session.operator, role: store.session.role, time: now(), detail })
}

export function createScheme(): Scheme {
  const s = makeScheme(defaultParams(), store.session.operator)
  store.schemes.push(s)
  return s
}

export function deleteScheme(id: string): void {
  const i = store.schemes.findIndex((s) => s.id === id)
  if (i >= 0 && store.schemes[i].status === 'draft') store.schemes.splice(i, 1)
}

export function runAndSave(s: Scheme): void {
  s.current.result = runSimulation(s.current.params)
  log(s, '运行仿真', `v${s.current.version} 洞外照度 ${s.current.result.outsideIlluminance} lux, ${s.current.result.pass ? '通过' : '未通过'}`)
}

export function submitScheme(s: Scheme, operator?: string): void {
  if (!s.current.result) s.current.result = runSimulation(s.current.params)
  if (s.status === 'returned') s.reworkCount += 1
  const snapshot: SchemeVersion = JSON.parse(JSON.stringify({ ...s.current, submittedAt: now(), submittedBy: operator ?? store.session.operator }))
  s.history.push(snapshot)
  s.status = 'pending'
  log(s, '提交审核', `v${s.current.version} 快照入库`)
}

export function approveScheme(s: Scheme, reviewer?: string): void {
  s.status = 'approved'
  s.locked = true
  log(s, '审核通过', `审核人 ${reviewer ?? store.session.operator}, 方案锁定`)
}

export function returnScheme(s: Scheme, reason: string, paramsToFix: string): void {
  s.status = 'returned'
  s.returns.push({ reason, paramsToFix, reviewer: store.session.operator, time: now() })
  log(s, '退回方案', `原因: ${reason}; 需改参数: ${paramsToFix}`)
}

export function reviseAndResubmit(s: Scheme): void {
  // 设计员修改参数后重新提交: 版本号+1
  s.current.version += 1
  s.current.result = runSimulation(s.current.params)
  submitScheme(s)
}

export function addAnnotation(s: Scheme, text: string): void {
  s.annotations.push({ id: uid(), text, author: store.session.operator, time: now() })
  log(s, '添加批注', text.slice(0, 40))
}

export function deliverPackage(tunnelName: string, schemeIds: string[]): void {
  for (const id of schemeIds) {
    const s = store.schemes.find((x) => x.id === id)
    if (s && s.status === 'approved') {
      s.status = 'delivered'
      log(s, '方案交付', `随「${tunnelName}」交付包导出`)
    }
  }
}

export function schemesByTunnel(): Map<string, Scheme[]> {
  const m = new Map<string, Scheme[]>()
  for (const s of store.schemes) {
    const key = s.current.params.tunnelName || '(未命名隧道)'
    if (!m.has(key)) m.set(key, [])
    m.get(key)!.push(s)
  }
  return m
}

export const STATUS_FLOW: SchemeStatus[] = ['draft', 'pending', 'returned', 'approved', 'delivered']
