// 导出：批复单(打印页) 与 带标注平面图(PNG)
import { bridgeNodes, pierRects, lowZones, totalLength, clearanceAt, MIN_CLEARANCE } from './bridge.js'
import { TYPES, compRect, stats, fireLane, FIRE_LANE_MIN } from './rules.js'
import { STATUS_TEXT, fmtTime } from './store.js'

const SCALE = 14 // px/m

export function exportPlanPNG(scheme, version) {
  const b = scheme.bridge
  const L = totalLength(b)
  const M = 90 // 边距
  const W = Math.round(L * SCALE + M * 2)
  const H = Math.round(b.deckWidth * SCALE + M * 2 + 120)
  const cv = document.createElement('canvas')
  cv.width = W; cv.height = H
  const g = cv.getContext('2d')
  const X = (x) => M + x * SCALE
  const Y = (y) => M + y * SCALE

  g.fillStyle = '#ffffff'; g.fillRect(0, 0, W, H)
  // 标题
  g.fillStyle = '#111'; g.font = 'bold 26px "Microsoft YaHei", sans-serif'
  g.fillText(`${scheme.name} —— 平面布置图 (V${version.n} ${STATUS_TEXT[version.status]})`, M, 48)
  g.font = '14px "Microsoft YaHei", sans-serif'
  g.fillStyle = '#555'
  g.fillText(`跨径 ${b.spans.join('+')} m  桥宽 ${b.deckWidth} m  净高控制 ≥${MIN_CLEARANCE}m  导出时间 ${fmtTime(Date.now())}`, M, 74)

  // 低净空红区
  for (const z of lowZones(b)) {
    g.fillStyle = 'rgba(224,48,48,0.28)'
    g.fillRect(X(z.x0), Y(0), (z.x1 - z.x0) * SCALE, b.deckWidth * SCALE)
    g.fillStyle = '#c02020'; g.font = '12px sans-serif'
    g.fillText(`净高<${MIN_CLEARANCE}m 禁摆`, X(z.x0) + 4, Y(0) + 16)
  }
  // 桥面范围
  g.strokeStyle = '#222'; g.lineWidth = 2
  g.strokeRect(X(0), Y(0), L * SCALE, b.deckWidth * SCALE)

  // 消防通道
  const fl = fireLane(b, version.components)
  if (fl.y1 - fl.y0 > 0.01) {
    g.fillStyle = fl.ok ? 'rgba(47,191,95,0.18)' : 'rgba(224,48,48,0.15)'
    g.fillRect(X(0), Y(fl.y0), L * SCALE, (fl.y1 - fl.y0) * SCALE)
    g.fillStyle = fl.ok ? '#1c7a3d' : '#c02020'; g.font = '13px sans-serif'
    g.fillText(`消防通道 净宽 ${fl.width.toFixed(1)}m${fl.ok ? '' : ' (不足4m!)'}`, X(0) + 6, Y(fl.y0) + 15)
  }

  // 桥墩
  for (const p of pierRects(b)) {
    g.fillStyle = '#8a939c'
    g.fillRect(X(p.x0), Y(p.y0), (p.x1 - p.x0) * SCALE, (p.y1 - p.y0) * SCALE)
    g.strokeStyle = '#555'; g.lineWidth = 1
    g.strokeRect(X(p.x0), Y(p.y0), (p.x1 - p.x0) * SCALE, (p.y1 - p.y0) * SCALE)
  }

  // 构件
  g.font = '13px "Microsoft YaHei", sans-serif'
  for (const c of version.components) {
    const t = TYPES[c.type]
    const r = compRect(c)
    g.fillStyle = t.color + 'cc'
    g.fillRect(X(r.x0), Y(r.y0), c.len * SCALE, c.wid * SCALE)
    g.strokeStyle = '#333'; g.lineWidth = 1
    g.strokeRect(X(r.x0), Y(r.y0), c.len * SCALE, c.wid * SCALE)
    g.fillStyle = '#fff'
    const name = c.label || t.name + (c.type === 'parking' ? `×${c.spots}` : '')
    g.fillText(name, X(r.x0) + 4, Y(r.y0) + 16)
    g.fillText(`${c.len.toFixed(1)}×${c.wid.toFixed(1)}m`, X(r.x0) + 4, Y(r.y0) + 32)
  }

  // 标注：跨径与墩位标高
  const nodes = bridgeNodes(b)
  g.fillStyle = '#111'; g.font = '13px sans-serif'
  for (let i = 0; i < nodes.length - 1; i++) {
    const mid = (nodes[i].x + nodes[i + 1].x) / 2
    g.fillText(`跨径 ${b.spans[i]}m`, X(mid) - 26, Y(b.deckWidth) + 22)
  }
  for (const n of nodes) {
    g.fillText(`桥面 ${n.elev.toFixed(2)}`, X(n.x) - 30, Y(0) - 10)
    g.fillText(`净空 ${clearanceAt(b, n.x).toFixed(2)}m`, X(n.x) - 32, Y(b.deckWidth) + 40)
  }
  // 横向宽度标注
  g.fillText(`桥宽 ${b.deckWidth}m`, 12, Y(b.deckWidth / 2))

  // 图例
  let lx = M
  const ly = H - 46
  g.font = '13px "Microsoft YaHei", sans-serif'
  for (const key of Object.keys(TYPES)) {
    g.fillStyle = TYPES[key].color; g.fillRect(lx, ly - 11, 14, 14)
    g.fillStyle = '#222'; g.fillText(TYPES[key].name, lx + 18, ly + 1)
    lx += 96
  }
  g.fillStyle = 'rgba(224,48,48,0.5)'; g.fillRect(lx, ly - 11, 14, 14)
  g.fillStyle = '#222'; g.fillText('低净空禁摆区', lx + 18, ly + 1); lx += 116
  g.fillStyle = 'rgba(47,191,95,0.5)'; g.fillRect(lx, ly - 11, 14, 14)
  g.fillStyle = '#222'; g.fillText('消防通道', lx + 18, ly + 1)

  const a = document.createElement('a')
  a.download = `${scheme.name}-V${version.n}-平面图.png`
  a.href = cv.toDataURL('image/png')
  a.click()
}

export function exportApprovalSheet(scheme, version) {
  const b = scheme.bridge
  const s = stats(b, version.components)
  const fl = fireLane(b, version.components)
  const rows = version.comments.map(c =>
    `<tr><td>${c.role}</td><td>${c.componentName || '—'}</td><td>${escapeHtml(c.text)}</td><td>${fmtTime(c.time)}</td></tr>`).join('')
  const reviewCells = ['城管', '消防', '养护'].map(r => {
    const st = version.reviews[r]
    return `<td>${st === 'pass' ? '同意' : st === 'return' ? '退回' : '未签署'}</td>`
  }).join('')
  const html = `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8">
<title>批复单 - ${escapeHtml(scheme.name)}</title>
<style>
body{font-family:"Microsoft YaHei",sans-serif;margin:40px;color:#111}
h1{text-align:center;font-size:22px} h2{font-size:16px;border-bottom:1px solid #999;padding-bottom:4px}
table{border-collapse:collapse;width:100%;margin:8px 0} td,th{border:1px solid #666;padding:6px 10px;font-size:13px}
.seal{margin-top:36px;display:flex;justify-content:space-between}
@media print{button{display:none}}
</style></head><body>
<button onclick="window.print()">打印 / 另存为 PDF</button>
<h1>高架桥下空间利用方案批复单</h1>
<h2>一、方案信息</h2>
<table>
<tr><td>方案名称</td><td>${escapeHtml(scheme.name)}</td><td>版本</td><td>V${version.n}</td></tr>
<tr><td>桥跨布置</td><td>${b.spans.join(' + ')} m</td><td>桥面宽度</td><td>${b.deckWidth} m</td></tr>
<tr><td>提交时间</td><td>${fmtTime(version.submittedAt)}</td><td>批复时间</td><td>${fmtTime(version.approvedAt)}</td></tr>
</table>
<h2>二、主要指标</h2>
<table>
<tr><td>桥下总面积</td><td>${s.totalArea.toFixed(1)} ㎡</td><td>可利用面积</td><td>${s.usable.toFixed(1)} ㎡</td></tr>
<tr><td>已布置面积</td><td>${s.placed.toFixed(1)} ㎡</td><td>面积利用率</td><td>${(s.utilization * 100).toFixed(1)}%</td></tr>
<tr><td>停车位数量</td><td>${s.spots} 个</td><td>投资估算</td><td>${(s.cost / 10000).toFixed(2)} 万元</td></tr>
<tr><td>消防通道净宽</td><td>${fl.width.toFixed(1)} m（要求 ≥${FIRE_LANE_MIN}m）</td><td>净高控制</td><td>≥${MIN_CLEARANCE}m</td></tr>
</table>
<h2>三、联审意见</h2>
<table><tr><th>城管</th><th>消防</th><th>养护</th></tr>
<tr>${reviewCells}</tr></table>
<table><tr><th>单位</th><th>关联构件</th><th>意见</th><th>时间</th></tr>
${rows || '<tr><td colspan="4">无具体意见</td></tr>'}</table>
<h2>四、批复结论</h2>
<p>经城管、消防、养护三方联合审查，本方案（V${version.n}）符合桥下空间利用管理要求，同意按图实施。</p>
<div class="seal"><span>城管（签章）：____________</span><span>消防（签章）：____________</span><span>养护（签章）：____________</span></div>
</body></html>`
  const w = window.open('', '_blank')
  if (!w) return false
  w.document.write(html)
  w.document.close()
  return true
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
}
