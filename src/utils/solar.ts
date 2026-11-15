// 太阳位置计算(简化 NOAA 算法)
export interface SunPosition {
  altitude: number  // 高度角(度)
  azimuth: number   // 方位角(度, 0=北, 顺时针)
}

const D2R = Math.PI / 180
const R2D = 180 / Math.PI

export function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0)
  return Math.floor((date.getTime() - start.getTime()) / 86400000)
}

// 太阳赤纬(度)
export function solarDeclination(doy: number): number {
  return 23.45 * Math.sin(D2R * (360 / 365) * (284 + doy))
}

// 均时差(分钟, 近似)
export function equationOfTime(doy: number): number {
  const b = D2R * (360 / 365) * (doy - 81)
  return 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b)
}

/**
 * 计算太阳位置
 * @param latitude 纬度(度, 北纬为正)
 * @param date 日期时间(本地时)
 * @param longitude 经度(度, 默认 120 东八区中央经线)
 */
export function sunPosition(latitude: number, date: Date, longitude = 120): SunPosition {
  const doy = dayOfYear(date)
  const decl = solarDeclination(doy) * D2R
  const lat = latitude * D2R
  const minutes = date.getHours() * 60 + date.getMinutes()
  // 真太阳时(分钟)
  const tst = minutes + equationOfTime(doy) + 4 * (longitude - 120)
  const ha = D2R * (tst / 4 - 180) // 时角(弧度)

  const sinAlt = Math.sin(lat) * Math.sin(decl) + Math.cos(lat) * Math.cos(decl) * Math.cos(ha)
  const altitude = Math.asin(Math.max(-1, Math.min(1, sinAlt)))

  // 方位角(自北顺时针)
  const cosAz =
    (Math.sin(decl) - Math.sin(lat) * Math.sin(altitude)) /
    (Math.cos(lat) * Math.cos(altitude) || 1e-9)
  let azimuth = Math.acos(Math.max(-1, Math.min(1, cosAz)))
  if (ha > 0) azimuth = 2 * Math.PI - azimuth // 下午偏西

  return { altitude: altitude * R2D, azimuth: azimuth * R2D }
}

/** 组合日期与时刻字符串为 Date */
export function parseDateTime(dateStr: string, timeStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number)
  const [hh, mm] = timeStr.split(':').map(Number)
  return new Date(y, (m || 1) - 1, d || 1, hh || 0, mm || 0, 0, 0)
}

/** 方位角差(0~180) */
export function azimuthDiff(a: number, b: number): number {
  let d = Math.abs(a - b) % 360
  if (d > 180) d = 360 - d
  return d
}
