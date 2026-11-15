// 全局状态：方案、版本、联审流程（localStorage 持久化）
import { reactive, watch, computed } from 'vue'
import { fireLane, validate } from './rules.js'

const KEY = 'under-bridge-scheme-v1'
export const ROLES = ['规划员', '城管', '消防', '养护']
export const REVIEWERS = ['城管', '消防', '养护']
export const STATUS_TEXT = { draft: '初稿', review: '联审中', approved: '已批复', returned: '已退回' }

function newVersion(n, components = []) {
  return {
    n,
    status: 'draft',
    components: JSON.parse(JSON.stringify(components)),
    comments: [], // {id, role, componentId, componentName, text, time}
    reviews: { 城管: 'pending', 消防: 'pending', 养护: 'pending' },
    createdAt: Date.now(), submittedAt: null, approvedAt: null
  }
}

function defaultScheme() {
  return {
    name: '××高架 K2+300 段桥下空间利用方案',
    bridge: {
      spans: [32, 32, 32],
      elevations: [7.6, 8.6, 8.4, 9.0], // 各墩位桥面标高
      deckWidth: 25,
      girderDepth: 1.8,
      groundElev: 3.0,
      pierWidth: 1.4,
      pierDepth: 1.2,
      abutmentWidth: 1.5
    },
    versions: [newVersion(1)],
    published: false,
    publishedAt: null
  }
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const s = JSON.parse(raw)
      if (s && s.bridge && Array.isArray(s.versions) && s.versions.length) return s
    }
  } catch (e) { /* 忽略损坏数据 */ }
  return defaultScheme()
}

export const store = reactive({
  role: '规划员',
  scheme: load(),
  selectedId: null,
  viewing: null,   // null = 当前版本；否则为版本数组下标（只读查看历史版本）
  toastMsg: '',
  centerTab: 'plan'
})

watch(() => store.scheme, (s) => {
  try { localStorage.setItem(KEY, JSON.stringify(s)) } catch (e) { /* 存储满则忽略 */ }
}, { deep: true })

let toastTimer = null
export function toast(msg) {
  store.toastMsg = msg
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { store.toastMsg = ''}, 3200)
}

export const currentVersion = computed(() => store.scheme.versions[store.scheme.versions.length - 1])
export const viewVersion = computed(() =>
  store.viewing == null ? currentVersion.value : store.scheme.versions[store.viewing])
export const editable = computed(() =>
  store.viewing == null && currentVersion.value.status === 'draft' && store.role === '规划员')

export const components = computed(() => viewVersion.value.components)

// 当前版本中被判定为非法的构件（桥型参数变更后可能出现）
export const invalidIds = computed(() => {
  const out = new Set()
  const comps = components.value
  for (const c of comps) if (!validate(store.scheme.bridge, comps, c, c.id).ok) out.add(c.id)
  return out
})

export const fireLaneState = computed(() => fireLane(store.scheme.bridge, components.value))

export function addComponent(comp) {
  currentVersion.value.components.push(comp)
  store.selectedId = comp.id
}

export function removeComponent(id) {
  const v = currentVersion.value
  const i = v.components.findIndex(c => c.id === id)
  if (i >= 0) v.components.splice(i, 1)
  if (store.selectedId === id) store.selectedId = null
}

// 提交联审：消防通道不足 4m 或存在非法构件时拦截
export function submitReview() {
  const v = currentVersion.value
  if (v.status !== 'draft') return
  if (!v.components.length) { toast('方案为空，请先布置构件'); return }
  if (invalidIds.value.size) { toast('存在净高不足或冲突的构件，无法提交'); return }
  const fl = fireLane(store.scheme.bridge, v.components)
  if (!fl.ok) { toast(`消防通道净宽仅 ${fl.width.toFixed(1)}m，不足 ${4}m，禁止提交联审`); return }
  v.status = 'review'
  v.submittedAt = Date.now()
  toast('已提交联审，等待城管/消防/养护三方意见')
}

export function reviewPass(role) {
  const v = currentVersion.value
  if (v.status !== 'review' || v.reviews[role] !== 'pending') return
  v.reviews[role] = 'pass'
  if (REVIEWERS.every(r => v.reviews[r] === 'pass')) {
    v.status = 'approved'
    v.approvedAt = Date.now()
    toast('三方均已通过，方案批复完成')
  } else {
    toast(`${role}已通过，等待其余方意见`)
  }
}

// 退回：当前版本封存为“已退回”，以其内容生成下一版初稿
export function reviewReturn(role) {
  const v = currentVersion.value
  if (v.status !== 'review' || v.reviews[role] !== 'pending') return
  v.reviews[role] = 'return'
  v.status = 'returned'
  const nv = newVersion(v.n + 1, v.components)
  store.scheme.versions.push(nv)
  store.viewing = null
  store.selectedId = null
  toast(`${role}退回，已生成 V${nv.n} 初稿（V${v.n} 已保留）`)
}

let commentSeq = 1
export function addComment(role, componentId, componentName, text) {
  const v = currentVersion.value
  v.comments.push({
    id: 'm' + (commentSeq++) + '_' + Date.now(),
    role, componentId, componentName, text, time: Date.now()
  })
}

export function publish() {
  const v = currentVersion.value
  if (v.status !== 'approved') { toast('方案未走完批复流程，不允许对外发布'); return }
  store.scheme.published = true
  store.scheme.publishedAt = Date.now()
  toast('方案已对外发布')
}

export function resetScheme() {
  store.scheme = defaultScheme()
  store.viewing = null
  store.selectedId = null
  toast('已重置为示例方案')
}

export function fmtTime(ts) {
  if (!ts) return '—'
  const d = new Date(ts)
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}
