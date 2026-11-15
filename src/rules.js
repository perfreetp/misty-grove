// 规范参数与合规校验规则
// 依据《公路养护安全作业规程》(JTG H30) 的思路设置，各阈值可按项目要求调整。

export const LANE_WIDTH = 3.75        // 每条车道宽度 (m)
export const TAPER_DOWNSTREAM_MIN = 30 // 下游过渡区最小长度 (m)
export const CONE_GAP_TAPER = 4        // 渐变段(上游过渡区)内锥桶最大间距 (m)
export const CONE_GAP_NORMAL = 10      // 其余路段锥桶最大间距 (m)
export const BARRIER_GAP_MAX = 2       // 水马最大间距 (m)
export const FENCE_GAP_MAX = 3         // 施工围挡最大间距 (m)
export const MAX_SPEED_DROP = 20       // 相邻限速段最大落差 (km/h)
export const SPEED_LEVELS = [120, 100, 80]
export const PREWARN = { 120: 300, 100: 200, 80: 100 } // 限速标志预告距离 (m)
export const WORKZONE_MAX_SPEED = 80   // 作业区最高限速 (km/h)

// 渐变段(上游过渡区)最小长度：V>60 时 L=0.625·V·W，否则 L=V²·W/155
export function taperRequired(designSpeed, lanesClosed) {
  const W = LANE_WIDTH * lanesClosed
  const L = designSpeed > 60
    ? 0.625 * designSpeed * W
    : (designSpeed * designSpeed * W) / 155
  return Math.ceil(L)
}

export function fmtStake(m) {
  const km = Math.floor(m / 1000)
  const r = Math.round(m - km * 1000)
  return `K${km}+${String(r).padStart(3, '0')}`
}

export function parseStake(s) {
  if (s == null) return NaN
  let t = String(s).trim().toUpperCase().replace(/^K/, '').replace(/\s/g, '')
  if (t.includes('+')) {
    const [a, b] = t.split('+')
    return parseInt(a, 10) * 1000 + parseInt(b || '0', 10)
  }
  const n = Number(t)
  return Number.isFinite(n) ? Math.round(n) : NaN
}

/**
 * 对方案做全量合规分析。
 * 返回 { issues, closures, tapers, stats }
 * issue: { id, itemIds, stakes, message, suggestion }
 */
export function analyze(section, plan) {
  const N = section.lanes
  const V = section.designSpeed
  const issues = []
  let eid = 0
  const err = (itemIds, stakes, message, suggestion) =>
    issues.push({ id: ++eid, itemIds: itemIds || [], stakes: stakes || [], message, suggestion })

  const devices = plan.items.filter(i => i.type !== 'sign').slice().sort((a, b) => a.stake - b.stake)
  const signs = plan.items.filter(i => i.type === 'sign').slice().sort((a, b) => a.stake - b.stake)

  // ---- 1. 封闭车道数 ----
  const byLine = new Map()
  for (const d of devices) {
    if (!byLine.has(d.line)) byLine.set(d.line, [])
    byLine.get(d.line).push(d)
  }
  const closures = []
  for (let k = 0; k <= N; k++) {
    const arr = byLine.get(k)
    if (!arr || !arr.length) continue
    const s0 = arr[0].stake
    const s1 = arr[arr.length - 1].stake
    const closed = N - k // 车道线k以内的设施封闭第 k+1..N 车道
    if (closed >= N) {
      err(arr.map(d => d.id), [s0, s1],
        `第${k === 0 ? '中央分隔带边缘' : k + '条'}车道线上的设施将封闭全部${N}条车道`,
        `至少保留1条行车道，建议将设施外移至第1车道线(距中央分隔带1条车道)以外`)
    } else if (closed > 0) {
      closures.push({ line: k, s0, s1, closed })
    }
  }

  // ---- 2. 渐变段(上/下游过渡区)长度 ----
  const tapers = []
  for (let i = 1; i < devices.length; i++) {
    const d1 = devices[i - 1]
    const d2 = devices[i]
    const a = d1.line
    const b = d2.line
    if (a === b || a > N || b > N) continue
    const gap = d2.stake - d1.stake
    if (b < a) { // 边界向中央方向内移 → 上游渐变段(封闭)
      const req = taperRequired(V, a - b)
      tapers.push({ s0: d1.stake, s1: d2.stake, req, kind: 'up' })
      if (gap < req) {
        err([d1.id, d2.id], [d1.stake, d2.stake],
          `渐变段长度${gap}m不足：设计速度${V}km/h、封闭${a - b}条车道`,
          `渐变段长度应≥${req}m，建议将下游设施移至 ${fmtStake(d1.stake + req)} 以外`)
      }
    } else { // 边界向外放开 → 下游过渡区
      const req = TAPER_DOWNSTREAM_MIN
      tapers.push({ s0: d1.stake, s1: d2.stake, req, kind: 'down' })
      if (gap < req) {
        err([d1.id, d2.id], [d1.stake, d2.stake],
          `下游过渡区长度${gap}m不足`,
          `下游过渡区应≥${req}m，建议将下游设施移至 ${fmtStake(d1.stake + req)} 以外`)
      }
    }
  }

  // ---- 3. 设施间距 ----
  const taperRegions = tapers.filter(t => t.kind === 'up').map(t => [t.s0, t.s0 + t.req])
  const inTaper = s => taperRegions.some(([a, b]) => s >= a && s <= b)
  const gapMax = { cone: null, barrier: BARRIER_GAP_MAX, fence: FENCE_GAP_MAX }
  const typeName = { cone: '锥桶', barrier: '水马', fence: '施工围挡' }
  for (const [, arr] of byLine) {
    for (const type of ['cone', 'barrier', 'fence']) {
      const same = arr.filter(d => d.type === type)
      for (let i = 1; i < same.length; i++) {
        const gap = same[i].stake - same[i - 1].stake
        const max = type === 'cone'
          ? (inTaper((same[i].stake + same[i - 1].stake) / 2) ? CONE_GAP_TAPER : CONE_GAP_NORMAL)
          : gapMax[type]
        if (gap > max) {
          err([same[i - 1].id, same[i].id], [same[i - 1].stake, same[i].stake],
            `${typeName[type]}间距${gap}m超过限值${max}m`,
            `建议按≤${max}m加密布设(该段约需补设 ${Math.ceil(gap / max) - 1} 个)`)
        }
      }
    }
  }

  // ---- 4. 限速逐级衔接与预告距离 ----
  let prevLimit = V
  let prevStake = null
  for (const sg of signs) {
    const drop = prevLimit - sg.limit
    if (drop > MAX_SPEED_DROP) {
      err([sg.id], [sg.stake],
        `限速由${prevLimit}km/h直接降至${sg.limit}km/h，落差${drop}km/h超标`,
        `相邻限速段落差应≤${MAX_SPEED_DROP}km/h，建议在此前增设 ${prevLimit - MAX_SPEED_DROP}km/h 限速标志逐级过渡`)
    } else if (drop < -MAX_SPEED_DROP) {
      err([sg.id], [sg.stake],
        `限速由${prevLimit}km/h直接恢复至${sg.limit}km/h，落差${-drop}km/h超标`,
        `恢复限速也应逐级衔接，建议增设 ${prevLimit + MAX_SPEED_DROP}km/h 过渡限速标志`)
    }
    if (prevStake != null && sg.limit < prevLimit) {
      const d = sg.stake - prevStake
      const req = PREWARN[sg.limit] || 100
      if (d < req) {
        err([sg.id], [prevStake, sg.stake],
          `限速${sg.limit}km/h的预告距离${d}m不足`,
          `预告距离应≥${req}m，建议将该标志移至 ${fmtStake(prevStake + req)} 之后，或将上级限速标志前移`)
      }
    }
    prevLimit = sg.limit
    prevStake = sg.stake
  }
  if (devices.length) {
    const c = devices[0].stake // 作业区起点
    const before = signs.filter(s => s.stake < c)
    if (!before.length) {
      err([], [c], '作业区前未设置限速标志',
        `建议在 ${fmtStake(c - (PREWARN[80] || 100))} 前设置80km/h限速标志，并按 120→100→80 逐级衔接`)
    } else {
      const last = before[before.length - 1]
      if (last.limit > WORKZONE_MAX_SPEED) {
        err([last.id], [last.stake],
          `作业区前限速${last.limit}km/h过高`,
          `作业区限速应≤${WORKZONE_MAX_SPEED}km/h，建议增设80km/h限速标志`)
      } else {
        const d = c - last.stake
        const req = PREWARN[last.limit] || 100
        if (d < req) {
          err([last.id], [last.stake, c],
            `限速${last.limit}km/h标志距作业区${d}m，预告距离不足`,
            `预告距离应≥${req}m，建议将标志移至 ${fmtStake(c - req)} 以前`)
        }
      }
    }
  }

  // ---- 5. 数量统计 ----
  const stats = {
    cone: 0, barrier: 0, fence: 0,
    sign120: 0, sign100: 0, sign80: 0
  }
  for (const it of plan.items) {
    if (it.type === 'sign') stats['sign' + it.limit]++
    else stats[it.type]++
  }

  return { issues, closures, tapers, stats }
}
