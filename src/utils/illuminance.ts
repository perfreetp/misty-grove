import type { GlareWindow, SchemeParams, SimPoint, SimResult } from '../types'
import { azimuthDiff, parseDateTime, sunPosition } from './solar'

const D2R = Math.PI / 180

/** 洞外照度模型(lux): 晴空直射+散射, 随太阳高度角变化 */
export function outsideIlluminance(altitudeDeg: number): number {
  if (altitudeDeg <= 0) return altitudeDeg > -6 ? 300 : 5 // 晨昏蒙影/夜间
  const sinA = Math.sin(altitudeDeg * D2R)
  return Math.round(2500 + 95000 * Math.pow(sinA, 1.15))
}

/**
 * 单层格栅遮挡率:
 * 格栅梁垂直于道路轴线布置, 梁宽 w、高度 d、间距 s。
 * 太阳高度角 α、太阳方位与道路轴线夹角 β 时,
 * 单根格栅在路面沿轴线方向的阴影长度 = w + d·|cosβ| / tanα。
 */
export function grilleShadingRatio(
  altitudeDeg: number,
  sunAzimuth: number,
  orientation: number,
  grilleDepth: number,
  grilleSpacing: number
): number {
  if (altitudeDeg <= 0.5) return 0.95 // 太阳贴近地平线, 深格栅几乎全遮挡
  const beta = azimuthDiff(sunAzimuth, orientation) * D2R
  const w = Math.min(0.35, 0.3 * grilleSpacing) // 格栅梁宽
  const shadowLen = w + (grilleDepth * Math.abs(Math.cos(beta))) / Math.tan(altitudeDeg * D2R)
  return Math.max(0.02, Math.min(0.9, shadowLen / grilleSpacing))
}

/**
 * 运行减光仿真:
 * 距洞门 x 处, 光线穿过 n(x) = (Lc - x)/s 层格栅, 透过率 τ = (1-k)^n。
 * 限值曲线: 洞门端 = 阈值% × 洞外照度, 线性升至棚外端 100%。
 * 陡跳判据: 局部照度与平滑趋势的偏差 > 该处限值的 6%(格栅明暗条纹过强)。
 */
export function runSimulation(p: SchemeParams): SimResult {
  const dt = parseDateTime(p.simDate, p.simTime)
  const sun = sunPosition(p.latitude, dt)
  const eOut = outsideIlluminance(sun.altitude)
  const k = grilleShadingRatio(sun.altitude, sun.azimuth, p.orientation, p.grilleDepth, p.grilleSpacing)
  const th = p.thresholdPct / 100
  const Lc = p.canopyLength
  const s = Math.max(0.3, p.grilleSpacing)

  const step = Math.max(0.25, Math.min(1, Lc / 200))
  const raw: { x: number; e: number }[] = []
  for (let x = 0; x <= Lc + 1e-6; x += step) {
    const n = (Lc - x) / s // 剩余格栅层数
    const tau = Math.pow(1 - k, n)
    // 格栅明暗条纹(越靠棚外端越弱)
    const ripple = 1 + 0.12 * k * Math.sin((2 * Math.PI * x) / s) * (x / Lc)
    raw.push({ x, e: eOut * tau * ripple })
  }
  // 平滑趋势(窗口 ≈ 一个格栅间距, 仅取棚内点), 用于陡跳(局部突变)判定
  const win = Math.max(1, Math.round(s / step))
  const trend = raw.map((_, i) => {
    let sum = 0
    let cnt = 0
    for (let j = Math.max(0, i - win); j <= Math.min(raw.length - 1, i + win); j++) {
      sum += raw[j].e
      cnt++
    }
    return sum / cnt
  })

  const points: SimPoint[] = raw.map((pt, i) => {
    const limit = pt.x > Lc ? eOut : eOut * (th + (1 - th) * (pt.x / Lc))
    const jumpLimit = 0.06 * limit
    const residual = Math.abs(pt.e - trend[i])
    const exceeded = pt.e > limit + 1e-6
    // 出口侧一个格栅间距为展开段, 照度回升至洞外值, 不参与陡跳判定
    const steep = pt.x <= Lc - s && residual > jumpLimit
    const offset = exceeded ? pt.e - limit : steep ? residual - jumpLimit : 0
    return {
      x: Math.round(pt.x * 100) / 100,
      illuminance: Math.round(pt.e),
      limit: Math.round(limit),
      exceeded,
      steep,
      offset: Math.round(offset)
    }
  })

  const exceeded = points.filter((q) => q.exceeded)
  const steepPts = points.filter((q) => q.steep)
  return {
    outsideIlluminance: eOut,
    solarAltitude: Math.round(sun.altitude * 10) / 10,
    solarAzimuth: Math.round(sun.azimuth * 10) / 10,
    shadingPerGrille: Math.round(k * 1000) / 1000,
    portalIlluminance: points[0]?.illuminance ?? 0,
    jumpLimitPct: 6,
    points,
    exceededCount: exceeded.length,
    steepCount: steepPts.length,
    maxOffset: points.reduce((m, q) => Math.max(m, q.offset), 0),
    pass: exceeded.length === 0 && steepPts.length === 0,
    computedAt: new Date().toLocaleString('zh-CN', { hour12: false })
  }
}

/**
 * 冬季低角度眩光时段提示:
 * 以冬至前后三个代表日计算, 太阳高度角 < 18° 且太阳方位与洞口朝向夹角 < 40° 的时段。
 */
export function winterGlareWindows(latitude: number, orientation: number): GlareWindow[] {
  const year = new Date().getFullYear()
  const representativeDays = [
    { label: `${year}-11-21`, date: new Date(year, 10, 21) },
    { label: `${year}-12-21`, date: new Date(year, 11, 21) },
    { label: `${year + 1}-01-21`, date: new Date(year + 1, 0, 21) }
  ]
  const windows: GlareWindow[] = []
  for (const { label, date } of representativeDays) {
    let start: number | null = null
    let maxAlt = 0
    for (let min = 360; min <= 1080; min += 10) {
      const t = new Date(date)
      t.setHours(Math.floor(min / 60), min % 60, 0, 0)
      const sun = sunPosition(latitude, t)
      const glare =
        sun.altitude > 0 && sun.altitude < 18 && azimuthDiff(sun.azimuth, orientation) < 40
      if (glare) {
        if (start === null) start = min
        maxAlt = Math.max(maxAlt, sun.altitude)
      } else if (start !== null) {
        windows.push({
          date: label,
          start: fmtMin(start),
          end: fmtMin(min),
          maxAltitude: Math.round(maxAlt * 10) / 10
        })
        start = null
        maxAlt = 0
      }
    }
    if (start !== null) {
      windows.push({ date: label, start: fmtMin(start), end: '18:00', maxAltitude: Math.round(maxAlt * 10) / 10 })
    }
  }
  return windows
}

function fmtMin(min: number): string {
  return `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`
}

/** 朝向文字描述 */
export function orientationName(azimuth: number): string {
  const names = ['北', '东北', '东', '东南', '南', '西南', '西', '西北']
  return names[Math.round((((azimuth % 360) + 360) % 360) / 45) % 8]
}
