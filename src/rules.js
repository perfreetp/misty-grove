// 布置规则：构件避让、净空校验、消防通道、统计与投资估算
import { pierRects, clearanceAt, totalLength, lowZones, MIN_CLEARANCE } from './bridge.js'

export const PIER_MARGIN = 0.3   // 构件与桥墩最小净距(m)
export const FIRE_LANE_MIN = 4.0 // 消防通道最小净宽(m)

// 构件类型库：len 沿桥纵向, wid 沿桥横向, height 用于三维展示
export const TYPES = {
  parking:    { name: '停车位', color: '#3f7fd9', len: 5.3,  wid: 2.5,  height: 0.06, pricePerSpot: 800 },
  basketball: { name: '篮球场', color: '#e8853d', len: 28,   wid: 15,   height: 0.12, pricePerM2: 320 },
  green:      { name: '绿化带', color: '#46a05a', len: 10,   wid: 3,    height: 0.55, pricePerM2: 160 },
  powerbox:   { name: '配电箱', color: '#8e5bc0', len: 1.6,  wid: 0.9,  height: 2.2,  pricePerUnit: 28000 }
}

let seq = 1
export function makeComponent(type, x, y) {
  const t = TYPES[type]
  return {
    id: 'c' + (seq++) + '_' + Math.random().toString(36).slice(2, 7),
    type, x, y,
    len: t.len, wid: t.wid,
    spots: type === 'parking' ? 1 : 0,
    label: ''
  }
}

export function compRect(c) {
  return { x0: c.x - c.len / 2, x1: c.x + c.len / 2, y0: c.y - c.wid / 2, y1: c.y + c.wid / 2 }
}

function rectsOverlap(a, b) {
  return a.x0 < b.x1 && a.x1 > b.x0 && a.y0 < b.y1 && a.y1 > b.y0
}

// 构件范围内最小净空（净空仅沿纵向变化，取两端即可）
export function minClearance(b, c) {
  const r = compRect(c)
  const L = totalLength(b)
  return Math.min(clearanceAt(b, Math.max(0, r.x0)), clearanceAt(b, Math.min(L, r.x1)))
}

// 校验单个构件位置，返回 {ok, reason}
export function validate(b, comps, c, ignoreId = null) {
  const r = compRect(c)
  const L = totalLength(b)
  if (r.x0 < 0 || r.x1 > L || r.y0 < 0 || r.y1 > b.deckWidth) return { ok: false, reason: '超出桥面投影范围' }
  for (const p of pierRects(b)) {
    const ep = { x0: p.x0 - PIER_MARGIN, x1: p.x1 + PIER_MARGIN, y0: p.y0 - PIER_MARGIN, y1: p.y1 + PIER_MARGIN }
    if (rectsOverlap(r, ep)) return { ok: false, reason: '与桥墩/桥台冲突' }
  }
  if (minClearance(b, c) < MIN_CLEARANCE) return { ok: false, reason: `净高不足 ${MIN_CLEARANCE}m，禁止摆放` }
  for (const o of comps) {
    if (o.id === ignoreId || o.id === c.id) continue
    if (rectsOverlap(r, compRect(o))) return { ok: false, reason: '与其他构件重叠' }
  }
  return { ok: true, reason: '' }
}

// 自动避让：先夹回桥面范围，再把压到桥墩的构件沿纵向推到最近一侧
export function autoAvoid(b, c) {
  const L = totalLength(b)
  c.x = Math.min(Math.max(c.x, c.len / 2), L - c.len / 2)
  c.y = Math.min(Math.max(c.y, c.wid / 2), b.deckWidth - c.wid / 2)
  for (let pass = 0; pass < 3; pass++) {
    for (const p of pierRects(b)) {
      const ep = { x0: p.x0 - PIER_MARGIN, x1: p.x1 + PIER_MARGIN, y0: p.y0 - PIER_MARGIN, y1: p.y1 + PIER_MARGIN }
      let r = compRect(c)
      if (rectsOverlap(r, ep)) {
        const toLeft = (ep.x0 - c.len / 2)  // 构件中心放到墩左侧
        const toRight = (ep.x1 + c.len / 2)
        const cand = Math.abs(c.x - toLeft) <= Math.abs(c.x - toRight) ? toLeft : toRight
        c.x = Math.min(Math.max(cand, c.len / 2), L - c.len / 2)
        r = compRect(c)
        if (rectsOverlap(r, ep)) { // 另一侧再试
          const alt = cand === toLeft ? toRight : toLeft
          c.x = Math.min(Math.max(alt, c.len / 2), L - c.len / 2)
        }
      }
    }
  }
  return c
}

// 消防通道：纵向直线通道，求全桥连续可通行的最大净宽
export function fireLane(b, comps) {
  const L = totalLength(b)
  const piers = pierRects(b)
  let lanes = [[0, b.deckWidth]] // 当前仍连通的横向区间
  const step = 0.2
  for (let x = 0; x <= L + 1e-9; x += step) {
    let free = [[0, b.deckWidth]]
    const cut = (r) => {
      const next = []
      for (const [a, c] of free) {
        if (r.y1 <= a || r.y0 >= c) { next.push([a, c]); continue }
        if (r.y0 > a) next.push([a, r.y0])
        if (r.y1 < c) next.push([r.y1, c])
      }
      free = next
    }
    for (const p of piers) if (x > p.x0 && x < p.x1) cut(p)
    for (const c of comps) {
      const r = compRect(c)
      if (x > r.x0 && x < r.x1) cut(r)
    }
    // 与累计通道求交
    const next = []
    for (const [a, c] of lanes) for (const [d, e] of free) {
      const lo = Math.max(a, d), hi = Math.min(c, e)
      if (hi - lo > 0.01) next.push([lo, hi])
    }
    lanes = next
    if (!lanes.length) break
  }
  let best = null
  for (const [a, c] of lanes) if (!best || c - a > best[1] - best[0]) best = [a, c]
  const width = best ? best[1] - best[0] : 0
  return { ok: width >= FIRE_LANE_MIN, width, y0: best ? best[0] : 0, y1: best ? best[1] : 0 }
}

// 统计：面积利用率、车位数、投资估算
export function stats(b, comps) {
  const L = totalLength(b)
  const totalArea = L * b.deckWidth
  const pierArea = pierRects(b).reduce((s, p) => s + (p.x1 - p.x0) * (p.y1 - p.y0), 0)
  const lowArea = lowZones(b).reduce((s, z) => s + (z.x1 - z.x0), 0) * b.deckWidth
  const usable = Math.max(0, totalArea - pierArea - lowArea)
  const placed = comps.reduce((s, c) => s + c.len * c.wid, 0)
  const spots = comps.filter(c => c.type === 'parking').reduce((s, c) => s + (c.spots || 0), 0)
  let cost = 0
  const breakdown = []
  for (const c of comps) {
    const t = TYPES[c.type]
    let item = 0
    if (c.type === 'parking') item = (c.spots || 0) * t.pricePerSpot
    else if (c.type === 'powerbox') item = t.pricePerUnit
    else item = c.len * c.wid * t.pricePerM2
    cost += item
    breakdown.push({ id: c.id, name: t.name, label: c.label, amount: item })
  }
  return {
    totalArea, pierArea, lowArea, usable, placed,
    utilization: usable > 0 ? placed / usable : 0,
    spots, cost, breakdown
  }
}
