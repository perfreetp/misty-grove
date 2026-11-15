import { reactive, watch } from 'vue'
import { putImage, getImage, deleteImage, blobToDataURL, dataURLToBlob } from './db'

// ---------- 常量 ----------
export const ROLES = { physician: '接诊医师', tech: '介入技师', chief: '主任医师' }

export const USERS = [
  { name: '王医生', role: 'physician' },
  { name: '李医生', role: 'physician' },
  { name: '张技师', role: 'tech' },
  { name: '赵技师', role: 'tech' },
  { name: '刘主任', role: 'chief' },
]

export const SEGMENTS = ['L1-L2', 'L2-L3', 'L3-L4', 'L4-L5', 'L5-S1']
export const ROOTS = ['L2', 'L3', 'L4', 'L5', 'S1']
export const SIDES = ['左', '右']
export const APPROACHES = ['后外侧入路', '椎间孔内入路', '椎板间入路', '骶管入路']

export const STATUS = {
  planning: '待规划',
  pending: '待审签',
  approved: '已通过',
  rejected: '已退回',
}

export const REJECT_REASONS = [
  '安全距离不足',
  '进针角度不合理',
  '影像资料不全',
  '解剖标记错误',
  '模板选择不当',
  '其他',
]

// 安全距离阈值 (mm)
export const SAFE_DIST = 3

// ---------- 持久化 ----------
const LS = { cases: 'spine.cases', templates: 'spine.templates', user: 'spine.user' }

function load(key, fallback) {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}

function defaultTemplates() {
  const presets = [
    { segment: 'L3-L4', approach: '后外侧入路', az: 40, el: 8, advance: 0, side: '左' },
    { segment: 'L4-L5', approach: '后外侧入路', az: 45, el: 10, advance: 0, side: '左' },
    { segment: 'L5-S1', approach: '后外侧入路', az: 40, el: 18, advance: 0, side: '左' },
    { segment: 'L4-L5', approach: '椎板间入路', az: 12, el: 5, advance: 0, side: '左' },
  ]
  return presets.map((p, i) => ({
    id: 'T' + (i + 1),
    name: `${p.segment} ${p.approach}标准模板`,
    segment: p.segment,
    approach: p.approach,
    side: p.side,
    az: p.az,
    el: p.el,
    advance: p.advance,
    note: '',
    updatedBy: '系统',
    updatedAt: new Date().toISOString(),
  }))
}

function demoCase() {
  const now = new Date().toISOString()
  return {
    id: 'P0001',
    patientName: '示例患者',
    patientId: 'ZY20260001',
    sex: '男',
    age: 58,
    segment: 'L4-L5',
    root: 'L5',
    side: '左',
    surgeryHistory: '2019年腰椎间盘摘除术(L4-L5)',
    coag: { PT: 12.1, APTT: 32.5, INR: 1.02, PLT: 186 },
    status: 'planning',
    images: [],
    marks: { vertebra: '', foramen: '', nerveRoot: '' },
    needle: { az: 45, el: 10, advance: 0 },
    templateId: '',
    screenshot: '',
    distances: null,
    createdBy: '王医生',
    createdAt: now,
    updatedAt: now,
    log: [{ t: now, user: '王医生', role: 'physician', action: '新建病例', detail: '示例病例' }],
  }
}

// ---------- 全局状态 ----------
export const store = reactive({
  user: load(LS.user, null) || USERS[0],
  cases: load(LS.cases, null) || [demoCase()],
  templates: load(LS.templates, null) || defaultTemplates(),
  view: 'cases', // cases | planner | templates | review | stats
  activeCaseId: null,
})

watch(() => store.cases, v => localStorage.setItem(LS.cases, JSON.stringify(v)), { deep: true })
watch(() => store.templates, v => localStorage.setItem(LS.templates, JSON.stringify(v)), { deep: true })
watch(() => store.user, v => localStorage.setItem(LS.user, JSON.stringify(v)), { deep: true })

// ---------- 工具 ----------
export function fmtTime(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  const p = n => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}

export function getCase(id) {
  return store.cases.find(c => c.id === id)
}

function touch(c) {
  c.updatedAt = new Date().toISOString()
}

export function addLog(c, action, detail = '') {
  c.log.push({ t: new Date().toISOString(), user: store.user.name, role: store.user.role, action, detail })
  touch(c)
}

// ---------- 病例操作 ----------
export function createCase(form) {
  const seq = store.cases.reduce((m, c) => Math.max(m, parseInt(c.id.slice(1)) || 0), 0) + 1
  const now = new Date().toISOString()
  const c = {
    id: 'P' + String(seq).padStart(4, '0'),
    patientName: form.patientName,
    patientId: form.patientId,
    sex: form.sex,
    age: form.age,
    segment: form.segment,
    root: form.root,
    side: form.side,
    surgeryHistory: form.surgeryHistory || '无',
    coag: { ...form.coag },
    status: 'planning',
    images: [],
    marks: { vertebra: '', foramen: '', nerveRoot: '' },
    needle: { az: 45, el: 10, advance: 0 },
    templateId: '',
    screenshot: '',
    distances: null,
    createdBy: store.user.name,
    createdAt: now,
    updatedAt: now,
    log: [{ t: now, user: store.user.name, role: store.user.role, action: '新建病例', detail: `${form.segment} / ${form.side}${form.root}` }],
  }
  store.cases.unshift(c)
  return c
}

export function deleteCase(id) {
  const c = getCase(id)
  if (c) for (const img of c.images) deleteImage(img.id).catch(() => {})
  store.cases = store.cases.filter(c => c.id !== id)
}

export async function addImages(c, files, kind) {
  for (const f of files) {
    const id = 'img_' + Math.random().toString(36).slice(2, 10)
    await putImage(id, f)
    c.images.push({ id, name: f.name, kind })
  }
  addLog(c, '导入影像', `${kind} × ${files.length}`)
}

export async function removeImage(c, img) {
  await deleteImage(img.id).catch(() => {})
  c.images = c.images.filter(i => i.id !== img.id)
}

export function setMarks(c, marks) {
  c.marks = { ...c.marks, ...marks }
  addLog(c, '标记解剖', `椎体:${marks.vertebra || c.marks.vertebra || '-'} 椎间孔:${marks.foramen || c.marks.foramen || '-'} 神经根:${marks.nerveRoot || c.marks.nerveRoot || '-'}`)
}

export function setNeedle(c, needle) {
  c.needle = { ...c.needle, ...needle }
  touch(c)
}

export function applyTemplate(c, tplId) {
  const t = store.templates.find(t => t.id === tplId)
  if (!t) return
  c.templateId = t.id
  c.needle = { az: t.az, el: t.el, advance: t.advance }
  addLog(c, '应用模板', t.name)
}

// 提交前校验，返回错误信息数组（空数组 = 可提交）
export function validateSubmit(c, distances) {
  const errs = []
  if (!c.images.length) errs.push('尚未导入CT/透视影像')
  if (!c.marks.vertebra || !c.marks.foramen || !c.marks.nerveRoot) errs.push('解剖标记不完整(椎体/椎间孔/神经根)')
  if (distances && (distances.root < SAFE_DIST || distances.dural < SAFE_DIST))
    errs.push(`安全距离不足(神经根 ${distances.root.toFixed(1)}mm / 硬膜囊 ${distances.dural.toFixed(1)}mm,需 ≥ ${SAFE_DIST}mm)`)
  return errs
}

export function submitCase(c, distances, screenshot) {
  c.distances = { root: distances.root, rootName: distances.rootName, dural: distances.dural }
  c.screenshot = screenshot || ''
  c.status = 'pending'
  addLog(c, '提交审签', `外展角${c.needle.az.toFixed(1)}° 头倾角${c.needle.el.toFixed(1)}° 针尖过靶点${c.needle.advance.toFixed(1)}mm`)
}

export function approveCase(c) {
  c.status = 'approved'
  addLog(c, '审签通过')
}

export function rejectCase(c, reason, note) {
  c.status = 'rejected'
  addLog(c, '退回', note ? `${reason}:${note}` : reason)
}

// 病例是否"一次通过"(从未被退回即通过)
export function isFirstPass(c) {
  const approvedIdx = c.log.findIndex(l => l.action === '审签通过')
  if (approvedIdx < 0) return false
  return !c.log.slice(0, approvedIdx).some(l => l.action === '退回')
}

// ---------- 模板操作 ----------
export function saveTemplate(t) {
  const now = new Date().toISOString()
  if (t.id) {
    const i = store.templates.findIndex(x => x.id === t.id)
    if (i >= 0) store.templates[i] = { ...t, updatedBy: store.user.name, updatedAt: now }
  } else {
    const seq = store.templates.reduce((m, x) => Math.max(m, parseInt(x.id.slice(1)) || 0), 0) + 1
    store.templates.push({ ...t, id: 'T' + seq, updatedBy: store.user.name, updatedAt: now })
  }
}

export function deleteTemplate(id) {
  store.templates = store.templates.filter(t => t.id !== id)
}

// ---------- 导出 / 导入 ----------
export async function exportData(caseIds = null) {
  const cases = caseIds ? store.cases.filter(c => caseIds.includes(c.id)) : store.cases
  const out = []
  for (const c of cases) {
    const images = []
    for (const img of c.images) {
      const blob = await getImage(img.id)
      images.push({ ...img, data: blob ? await blobToDataURL(blob) : null })
    }
    out.push({ ...c, images })
  }
  return {
    app: 'spine-puncture-planner',
    version: 1,
    exportedAt: new Date().toISOString(),
    exportedBy: store.user.name,
    cases: out,
    templates: caseIds ? [] : store.templates,
  }
}

export async function importData(json) {
  if (json.app !== 'spine-puncture-planner') throw new Error('文件格式不正确')
  let n = 0
  for (const c of json.cases || []) {
    const images = []
    for (const img of c.images || []) {
      if (img.data) await putImage(img.id, dataURLToBlob(img.data))
      images.push({ id: img.id, name: img.name, kind: img.kind })
    }
    const nc = { ...c, images }
    const i = store.cases.findIndex(x => x.id === nc.id)
    if (i >= 0) store.cases[i] = nc
    else store.cases.unshift(nc)
    n++
  }
  for (const t of json.templates || []) {
    const i = store.templates.findIndex(x => x.id === t.id)
    if (i >= 0) store.templates[i] = t
    else store.templates.push(t)
  }
  return n
}

export function downloadJSON(obj, filename) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename
  a.click()
  setTimeout(() => URL.revokeObjectURL(a.href), 5000)
}
