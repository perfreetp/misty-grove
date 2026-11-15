import type { Scheme, SimResult } from '../types'
import { orientationName } from './illuminance'

function download(filename: string, content: string, mime = 'text/plain'): void {
  const blob = new Blob(['﻿' + content], { type: `${mime};charset=utf-8` })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function csv(rows: (string | number)[][]): string {
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\r\n')
}

/** 路灯(隧道加强照明)布置表 */
export function exportLampLayout(s: Scheme): void {
  const p = s.current.params
  const r = s.current.result
  const ePortal = r ? r.portalIlluminance : 0
  // 入口段→过渡段→中间段, 照度按规范式递减
  const sections: [string, number, number][] = [
    ['入口段Ⅰ', Math.round(ePortal), 30],
    ['入口段Ⅱ', Math.round(ePortal * 0.5), 30],
    ['过渡段Ⅰ', Math.round(ePortal * 0.15), 36],
    ['过渡段Ⅱ', Math.round(ePortal * 0.05), 48],
    ['中间段', Math.max(200, Math.round(ePortal * 0.02)), 0]
  ]
  const rows: (string | number)[][] = [
    ['段落', '设计照度(lux)', '段长(m)', '灯具型号', '单灯功率(W)', '布置方式', '纵向间距(m)', '灯具数量(套)']
  ]
  for (const [name, lux, len] of sections) {
    const power = lux > 5000 ? 400 : lux > 1500 ? 250 : lux > 500 ? 150 : 100
    const spacing = lux > 5000 ? 1.5 : lux > 1500 ? 2.5 : lux > 500 ? 4 : 8
    const count = len > 0 ? Math.ceil(len / spacing) * 2 : '按洞身长度'
    rows.push([
      name,
      lux,
      len > 0 ? len : '-',
      `LED隧道灯 ${power}W`,
      power,
      '两侧对称',
      spacing,
      count
    ])
  }
  rows.push([])
  rows.push(['隧道', p.tunnelName, '洞口', p.portalName, '桩号', p.stake])
  rows.push(['校核时间', r?.computedAt ?? '-', '洞外照度(lux)', r?.outsideIlluminance ?? '-'])
  download(`${p.tunnelName}-${p.portalName}-路灯布置表.csv`, csv(rows), 'text/csv')
}

/** 格栅材料清单 */
export function exportGrilleBOM(s: Scheme): void {
  const p = s.current.params
  const roadWidth = 10.5 // 单洞双向两车道建筑限界宽(简化)
  const grilleCount = Math.floor(p.canopyLength / p.grilleSpacing) + 1
  const postRows = Math.ceil(p.canopyLength / 5) + 1
  const steelPerGrille = roadWidth * p.grilleDepth * 7.85 * 12 // kg, 简化估算
  const rows: (string | number)[][] = [
    ['序号', '材料名称', '规格', '单位', '数量', '单重(kg)', '总重(kg)', '备注'],
    [1, '格栅横梁', `型钢 ${Math.round(p.grilleDepth * 1000)}mm 高`, '根', grilleCount, Math.round(steelPerGrille), Math.round(steelPerGrille * grilleCount), `间距 ${p.grilleSpacing}m`],
    [2, '立柱', 'Φ299×10 钢管', '根', postRows * 2, 180, postRows * 2 * 180, '纵向间距 5m'],
    [3, '纵向联系梁', 'HM300×200', 'm', Math.round(p.canopyLength * 2), 56, Math.round(p.canopyLength * 2 * 56), '两侧通长'],
    [4, '柱脚基础', 'C30 混凝土', 'm³', Math.round(postRows * 2 * 1.2 * 10) / 10, '-', '-', '含预埋件'],
    [5, '高强螺栓', 'M20×60 10.9S', '套', grilleCount * 8 + postRows * 8, '-', '-', '含平垫弹垫'],
    [6, '防腐涂装', '热浸镀锌+氟碳面漆', 'm²', Math.round(grilleCount * roadWidth * p.grilleDepth * 2), '-', '-', '格栅双面']
  ]
  rows.push([])
  rows.push(['减光棚长度(m)', p.canopyLength, '格栅间距(m)', p.grilleSpacing, '格栅高度(m)', p.grilleDepth])
  download(`${p.tunnelName}-${p.portalName}-格栅材料清单.csv`, csv(rows), 'text/csv')
}

/** 照度校核报告 */
export function exportCheckReport(s: Scheme): void {
  const p = s.current.params
  const r: SimResult | null = s.current.result
  const L: string[] = []
  L.push('隧道洞门遮光棚照度校核报告')
  L.push('='.repeat(40))
  L.push(`隧道名称: ${p.tunnelName}    洞口: ${p.portalName}    桩号: ${p.stake}`)
  L.push(`洞口朝向: ${p.orientation}°(${orientationName(p.orientation)})    纬度: ${p.latitude}°`)
  L.push(`减光棚长度: ${p.canopyLength} m    格栅间距: ${p.grilleSpacing} m    格栅高度: ${p.grilleDepth} m`)
  L.push(`减光段照度阈值: 洞外亮度的 ${p.thresholdPct}%`)
  L.push(`仿真日期时刻: ${p.simDate} ${p.simTime}`)
  L.push('')
  if (r) {
    L.push(`太阳高度角: ${r.solarAltitude}°    太阳方位角: ${r.solarAzimuth}°`)
    L.push(`洞外照度: ${r.outsideIlluminance} lux`)
    L.push(`单层格栅遮挡率: ${(r.shadingPerGrille * 100).toFixed(1)}%`)
    L.push(`洞门处棚下照度: ${r.portalIlluminance} lux (限值 ${Math.round(r.outsideIlluminance * p.thresholdPct / 100)} lux)`)
    L.push(`陡跳判据: 局部突变 > 限值的 ${r.jumpLimitPct}%`)
    L.push('')
    const bad = r.points.filter((q) => q.exceeded || q.steep)
    if (bad.length === 0) {
      L.push('校核结论: 全段照度及过渡梯度均满足限值要求, 通过。')
    } else {
      L.push(`校核结论: 不满足。超限 ${r.exceededCount} 处, 陡跳 ${r.steepCount} 处, 最大偏移量 ${r.maxOffset} lux。`)
      L.push('')
      L.push('超限/陡跳位置明细:')
      L.push('位置x(m)\t照度(lux)\t限值(lux)\t类型\t偏移量(lux)')
      for (const q of bad) {
        L.push(`${q.x}\t${q.illuminance}\t${q.limit}\t${q.exceeded ? '超阈值' : '陡跳'}\t${q.offset}`)
      }
    }
    L.push('')
    L.push(`计算时间: ${r.computedAt}`)
  } else {
    L.push('(未运行仿真)')
  }
  L.push('')
  L.push(`方案状态: ${s.status}    返工次数: ${s.reworkCount}    版本: v${s.current.version}`)
  download(`${p.tunnelName}-${p.portalName}-照度校核报告.txt`, L.join('\r\n'))
}

/** 交付包(同一隧道多洞口汇总) */
export function exportDeliveryPackage(tunnelName: string, schemes: Scheme[]): void {
  const L: string[] = []
  L.push(`隧道洞门减光棚设计交付包 — ${tunnelName}`)
  L.push('='.repeat(48))
  L.push(`交付时间: ${new Date().toLocaleString('zh-CN', { hour12: false })}`)
  L.push(`包含洞口方案 ${schemes.length} 个`)
  L.push('')
  schemes.forEach((s, i) => {
    const p = s.current.params
    const r = s.current.result
    L.push(`--- 方案 ${i + 1}: ${p.portalName} (${p.stake}) v${s.current.version} ---`)
    L.push(`朝向 ${p.orientation}°(${orientationName(p.orientation)})  纬度 ${p.latitude}°`)
    L.push(`棚长 ${p.canopyLength}m  格栅间距 ${p.grilleSpacing}m  格栅高度 ${p.grilleDepth}m  阈值 ${p.thresholdPct}%`)
    if (r) {
      L.push(`仿真 ${p.simDate} ${p.simTime}: 洞外 ${r.outsideIlluminance} lux, 洞门处 ${r.portalIlluminance} lux, ${r.pass ? '校核通过' : '校核未通过'}`)
    }
    L.push(`返工次数 ${s.reworkCount}, 提交版本数 ${s.history.length}`)
    L.push('')
  })
  download(`${tunnelName}-交付包清单.txt`, L.join('\r\n'))
  // 各方案三份附件
  for (const s of schemes) {
    exportLampLayout(s)
    exportGrilleBOM(s)
    exportCheckReport(s)
  }
}
