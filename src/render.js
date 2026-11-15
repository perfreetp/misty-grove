// Canvas2D 渠化图渲染：编辑器与监控中心分幅封道图共用，保证图面一致。
import { fmtStake } from './rules.js'

export function layout(section, scale, win) {
  const s0 = win ? win[0] : section.kStart
  const s1 = win ? win[1] : section.kEnd
  const left = 64
  const top = 50
  const laneH = 34
  const shoulderH = 24
  const bottom = 46
  const right = 24
  const N = section.lanes
  const width = Math.ceil(left + (s1 - s0) * scale + right)
  const roadBottom = top + N * laneH + shoulderH
  const height = roadBottom + bottom
  return {
    s0, s1, left, top, laneH, shoulderH, bottom, right, N, width, height, roadBottom,
    xOf: s => left + (s - s0) * scale,
    yOfLine: k => top + k * laneH,
    yOf: k => (k <= N ? top + k * laneH : top + N * laneH + shoulderH)
  }
}

function hline(ctx, x0, x1, y) {
  ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke()
}

export function drawItem(ctx, it, L, selected) {
  const x = L.xOf(it.stake)
  const y = L.yOf(it.line)
  if (it.type === 'cone') {
    ctx.fillStyle = '#ff7a00'
    ctx.beginPath(); ctx.moveTo(x, y - 8); ctx.lineTo(x - 5, y + 5); ctx.lineTo(x + 5, y + 5); ctx.closePath(); ctx.fill()
    ctx.fillStyle = '#c25700'; ctx.fillRect(x - 6, y + 5, 12, 2)
  } else if (it.type === 'barrier') {
    ctx.fillStyle = '#d8392b'
    ctx.beginPath(); ctx.roundRect(x - 6, y - 9, 12, 15, 3); ctx.fill()
    ctx.fillStyle = '#fff'; ctx.fillRect(x - 6, y - 3, 12, 3)
  } else if (it.type === 'fence') {
    ctx.fillStyle = '#2f6fb2'; ctx.fillRect(x - 6, y - 10, 12, 17)
    ctx.fillStyle = '#9cc0e8'; ctx.fillRect(x - 6, y - 4, 12, 3)
  } else if (it.type === 'sign') {
    ctx.strokeStyle = '#555'; ctx.lineWidth = 2
    hline(ctx, x, x, 0) // noop keep path state clean
    ctx.beginPath(); ctx.moveTo(x, y - 4); ctx.lineTo(x, y + 5); ctx.stroke()
    ctx.beginPath(); ctx.arc(x, y - 14, 9.5, 0, Math.PI * 2)
    ctx.fillStyle = '#fff'; ctx.fill()
    ctx.strokeStyle = '#d11'; ctx.lineWidth = 2.5; ctx.stroke()
    ctx.fillStyle = '#111'; ctx.font = 'bold 8.5px sans-serif'
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText(String(it.limit), x, y - 13.5)
    ctx.textBaseline = 'alphabetic'
  }
  if (selected) {
    ctx.strokeStyle = '#1a73e8'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3])
    ctx.beginPath(); ctx.arc(x, y - 2, 14, 0, Math.PI * 2); ctx.stroke()
    ctx.setLineDash([])
  }
}

export function drawPlan(ctx, section, plan, opts = {}) {
  const {
    scale = 0.5, win = null, derived = null, issues = [],
    selectedId = null, ghost = null, frameTitle = null
  } = opts
  const L = layout(section, scale, win)
  const N = L.N
  const roadW = L.width - L.left - L.right

  ctx.clearRect(0, 0, L.width, L.height)
  ctx.fillStyle = '#eef1f4'; ctx.fillRect(0, 0, L.width, L.height)

  // 路面与硬路肩
  ctx.fillStyle = '#757d87'; ctx.fillRect(L.left, L.top, roadW, N * L.laneH + L.shoulderH)
  ctx.fillStyle = '#868e98'; ctx.fillRect(L.left, L.top + N * L.laneH, roadW, L.shoulderH)

  // 中央分隔带（含开口）
  ctx.fillStyle = '#3d7a4e'; ctx.fillRect(L.left, L.top - 24, roadW, 24)
  for (const op of section.medianOpenings || []) {
    const x = L.xOf(op.stake - 15)
    const w = Math.max(30 * scale, 10)
    if (x > L.width - L.right || x + w < L.left) continue
    ctx.fillStyle = '#eef1f4'; ctx.fillRect(x, L.top - 24, w, 24)
    ctx.strokeStyle = '#c9a227'; ctx.setLineDash([4, 3]); ctx.strokeRect(x, L.top - 24, w, 24); ctx.setLineDash([])
    ctx.fillStyle = '#2c5c39'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center'
    ctx.fillText(op.label || '开口', x + w / 2, L.top - 29)
  }
  ctx.fillStyle = '#fff'; ctx.font = '10px sans-serif'; ctx.textAlign = 'left'
  ctx.fillText('中央分隔带', 6, L.top - 9)

  // 车道线
  for (let k = 0; k <= N; k++) {
    const y = L.yOfLine(k)
    ctx.strokeStyle = k === 0 ? '#f2c94c' : '#e8eaed'
    ctx.lineWidth = k === 0 || k === N ? 2 : 1.5
    ctx.setLineDash(k === 0 || k === N ? [] : [10, 8])
    hline(ctx, L.left, L.width - L.right, y)
  }
  ctx.setLineDash([]); ctx.lineWidth = 1
  ctx.strokeStyle = '#e8eaed'; hline(ctx, L.left, L.width - L.right, L.roadBottom)

  // 车道标注
  ctx.fillStyle = '#4b5563'; ctx.font = '11px sans-serif'; ctx.textAlign = 'left'
  for (let i = 1; i <= N; i++) ctx.fillText(`第${i}车道`, 6, L.top + (i - 0.5) * L.laneH + 4)
  ctx.fillText('硬路肩', 6, L.top + N * L.laneH + L.shoulderH / 2 + 4)

  // 封闭区与渐变段底纹
  if (derived) {
    for (const c of derived.closures) {
      const x0 = L.xOf(c.s0); const x1 = L.xOf(c.s1)
      ctx.fillStyle = 'rgba(229,62,62,.16)'
      ctx.fillRect(x0, L.yOfLine(c.line), x1 - x0, L.roadBottom - L.yOfLine(c.line))
      ctx.fillStyle = '#a33'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center'
      ctx.fillText(`封闭${c.closed}车道`, (x0 + x1) / 2, L.roadBottom - 4)
    }
    for (const t of derived.tapers) {
      const x0 = L.xOf(t.s0); const x1 = L.xOf(t.s1)
      ctx.fillStyle = 'rgba(242,169,0,.20)'
      ctx.fillRect(x0, L.top, x1 - x0, L.roadBottom - L.top)
      ctx.fillStyle = '#8a6d00'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center'
      ctx.fillText(`渐变段 ${Math.round(t.s1 - t.s0)}m / 需${t.req}m`, (x0 + x1) / 2, L.top + 12)
    }
  }

  // 桩号标尺
  const steps = [50, 100, 200, 500, 1000, 2000]
  const step = steps.find(st => st * scale >= 70) || 2000
  ctx.strokeStyle = '#9aa1a9'; ctx.fillStyle = '#5b636c'
  ctx.font = '10px sans-serif'; ctx.textAlign = 'center'
  for (let s = Math.ceil(L.s0 / step) * step; s <= L.s1; s += step) {
    const x = L.xOf(s)
    hline(ctx, x, x, 0) // reset
    ctx.beginPath(); ctx.moveTo(x, L.roadBottom); ctx.lineTo(x, L.roadBottom + 6); ctx.stroke()
    ctx.fillText(fmtStake(s), x, L.roadBottom + 18)
  }

  // 行车方向
  ctx.fillStyle = '#5b636c'; ctx.textAlign = 'right'
  ctx.fillText('行车方向 →', L.width - L.right - 4, L.top - 30)

  // 设施
  for (const it of plan.items) {
    if (it.stake < L.s0 - 20 || it.stake > L.s1 + 20) continue
    drawItem(ctx, it, L, it.id === selectedId)
  }

  // 不合规标红
  ctx.strokeStyle = '#e01b1b'; ctx.fillStyle = '#e01b1b'
  for (const is of issues) {
    for (const id of is.itemIds || []) {
      const it = plan.items.find(i => i.id === id)
      if (!it) continue
      const x = L.xOf(it.stake); const y = L.yOf(it.line)
      ctx.setLineDash([3, 3]); ctx.lineWidth = 2
      ctx.beginPath(); ctx.arc(x, y - 2, 16, 0, Math.PI * 2); ctx.stroke()
      ctx.setLineDash([])
    }
    if (is.stakes && is.stakes.length) {
      const y = L.roadBottom + 30
      const xs = is.stakes.map(s => L.xOf(s))
      const x0 = Math.min(...xs); const x1 = Math.max(...xs)
      ctx.setLineDash([5, 4]); ctx.lineWidth = 1.5
      hline(ctx, x0, Math.max(x1, x0 + 2), y)
      ctx.setLineDash([])
      ctx.beginPath(); ctx.arc((x0 + Math.max(x1, x0 + 2)) / 2, y, 7, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = '#fff'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center'
      ctx.fillText('!', (x0 + Math.max(x1, x0 + 2)) / 2, y + 3.5)
      ctx.fillStyle = '#e01b1b'
    }
  }

  // 拖拽/放置预览
  if (ghost) {
    ctx.globalAlpha = 0.55
    drawItem(ctx, ghost, L, false)
    ctx.globalAlpha = 1
  }

  // 图幅标题
  if (frameTitle) {
    ctx.fillStyle = '#1f2937'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'left'
    ctx.fillText(frameTitle, L.left, 18)
  }
}
