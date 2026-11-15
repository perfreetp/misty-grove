import { reactive, watch } from 'vue'

const KEY = 'hwy-channelization-v1'

export function uid() {
  return Math.random().toString(36).slice(2, 9)
}

export function now() {
  return new Date().toLocaleString('zh-CN', { hour12: false })
}

function seed() {
  // 示例路段
  const sec1 = {
    id: 'sec1',
    name: 'G2京沪高速改扩建(北京方向)',
    code: 'G2K120',
    kStart: 120000,
    kEnd: 123000,
    lanes: 3,
    designSpeed: 120,
    medianOpenings: [
      { stake: 121200, label: '1#开口' },
      { stake: 122500, label: '2#开口' }
    ],
    period: { start: '2026-11-20', end: '2026-12-20' }
  }

  // 示例方案一：合规方案，已通过联审(实施台账演示)
  const items1 = []
  const push = (type, stake, line, limit) =>
    items1.push({ id: uid(), type, stake, line, ...(limit ? { limit } : {}) })
  push('sign', 120000, 4, 100)
  push('sign', 120200, 4, 80)
  push('cone', 120300, 3)
  for (let s = 120600; s <= 120700; s += 5) push('cone', s, 2)
  for (let s = 120702; s <= 121000; s += 2) push('barrier', s, 2)
  for (let s = 120600; s <= 121000; s += 3) push('fence', s, 4)
  const plan1 = {
    id: 'plan1', sectionId: 'sec1',
    name: 'K120+300~K121+000 占用第3车道 渠化方案',
    status: '已通过',
    items: items1,
    reviews: {
      '交警': { result: '通过', comment: '同意，注意夜间警示灯布设。', time: '2026/11/14 10:20:00' },
      '路政': { result: '通过', comment: '同意。', time: '2026/11/14 15:41:00' }
    },
    history: [
      { time: '2026/11/13 09:02:00', actor: '编制人', action: '提交联审', comment: '' },
      { time: '2026/11/14 10:20:00', actor: '交警', action: '通过', comment: '同意，注意夜间警示灯布设。' },
      { time: '2026/11/14 15:41:00', actor: '路政', action: '通过', comment: '同意。' },
      { time: '2026/11/14 15:41:00', actor: '系统', action: '联审通过，生成实施版本 G2K120-V1，撤除日期 2026-12-20', comment: '' }
    ],
    version: 'G2K120-V1',
    removeDate: '2026-12-20',
    removed: false,
    createdAt: '2026/11/13 08:30:00'
  }

  // 示例方案二：含不合规项的草稿(标红演示)
  const items2 = []
  const push2 = (type, stake, line, limit) =>
    items2.push({ id: uid(), type, stake, line, ...(limit ? { limit } : {}) })
  push2('sign', 121350, 4, 80)          // 120→80 落差超标
  push2('cone', 121400, 3)
  push2('cone', 121500, 2)              // 渐变段100m < 需282m
  push2('cone', 121540, 2)
  push2('cone', 121580, 2)              // 与下一间距过大
  push2('cone', 121640, 2)
  const plan2 = {
    id: 'plan2', sectionId: 'sec1',
    name: 'K121+400~K121+700 占用第3车道 渠化方案(草稿)',
    status: '草稿',
    items: items2,
    reviews: {},
    history: [],
    version: null,
    removeDate: null,
    removed: false,
    createdAt: '2026/11/15 14:00:00'
  }

  return {
    role: '编制人',
    sections: [sec1],
    plans: [plan1, plan2],
    ui: { tab: 'archive', sectionId: 'sec1', planId: 'plan2' }
  }
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) { /* ignore */ }
  return seed()
}

export const store = reactive(load())

watch(store, s => {
  try { localStorage.setItem(KEY, JSON.stringify(s)) } catch (e) { /* ignore */ }
}, { deep: true })

export function sectionOf(plan) {
  return store.sections.find(s => s.id === plan.sectionId)
}

export function pushHistory(plan, actor, action, comment = '') {
  plan.history.push({ time: now(), actor, action, comment })
}

export const ROLES = ['编制人', '交警', '路政', '监控中心']

export const STATUS = {
  '草稿': 'badge-draft',
  '联审中': 'badge-reviewing',
  '退回': 'badge-returned',
  '已通过': 'badge-approved'
}
