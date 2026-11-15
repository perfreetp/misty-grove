// 桥梁几何模型：由跨径布置与各墩位桥面标高生成桥下净空模型
// 坐标系：x 沿桥纵向(0..L)，y 沿桥横向(0..deckWidth)，高程为绝对标高(m)

export const MIN_CLEARANCE = 3.0 // 净高控制值(m)

export function totalLength(b) {
  return b.spans.reduce((s, v) => s + v, 0)
}

// 各墩(台)节点：{x, elev} —— elev 为桥面标高
export function bridgeNodes(b) {
  const nodes = [{ x: 0, elev: b.elevations[0] }]
  let x = 0
  b.spans.forEach((s, i) => {
    x += s
    nodes.push({ x, elev: b.elevations[i + 1] })
  })
  return nodes
}

// 梁底(净空顶面)标高：桥面标高沿跨线性内插，减去主梁结构高度
export function soffitAt(b, x) {
  const nodes = bridgeNodes(b)
  if (x <= 0) return nodes[0].elev - b.girderDepth
  for (let i = 0; i < nodes.length - 1; i++) {
    const a = nodes[i], c = nodes[i + 1]
    if (x <= c.x + 1e-9) {
      const t = (x - a.x) / (c.x - a.x)
      return a.elev + (c.elev - a.elev) * t - b.girderDepth
    }
  }
  return nodes[nodes.length - 1].elev - b.girderDepth
}

// 某纵向位置净空 = 梁底标高 - 地面标高
export function clearanceAt(b, x) {
  return soffitAt(b, x) - b.groundElev
}

// 桥墩/桥台平面占位矩形（横向居中于桥面）
export function pierRects(b) {
  const nodes = bridgeNodes(b)
  return nodes.map((n, i) => {
    const end = i === 0 || i === nodes.length - 1
    const pw = end ? b.abutmentWidth : b.pierWidth
    return {
      x0: n.x - pw / 2, x1: n.x + pw / 2,
      y0: (b.deckWidth - b.pierDepth) / 2, y1: (b.deckWidth + b.pierDepth) / 2,
      cx: n.x, end
    }
  })
}

// 净高低于控制值的纵向区间（红色禁摆区）
export function lowZones(b) {
  const nodes = bridgeNodes(b)
  const zones = []
  for (let i = 0; i < nodes.length - 1; i++) {
    const a = nodes[i], c = nodes[i + 1]
    const ca = clearanceAt(b, a.x), cc = clearanceAt(b, c.x)
    if (ca >= MIN_CLEARANCE && cc >= MIN_CLEARANCE) continue
    if (ca < MIN_CLEARANCE && cc < MIN_CLEARANCE) { zones.push({ x0: a.x, x1: c.x }); continue }
    const xc = a.x + (c.x - a.x) * (MIN_CLEARANCE - ca) / (cc - ca)
    zones.push(ca < MIN_CLEARANCE ? { x0: a.x, x1: xc } : { x0: xc, x1: c.x })
  }
  return zones
}

// 桥墩间可布置跨段（扣除墩身宽度）
export function bays(b) {
  const piers = pierRects(b)
  const out = []
  for (let i = 0; i < piers.length - 1; i++) {
    out.push({ x0: piers[i].x1, x1: piers[i + 1].x0, index: i + 1 })
  }
  return out
}
