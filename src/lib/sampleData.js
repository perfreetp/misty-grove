// 示例纵断面: 某山区高速连续 13.3km 长下坡
// 格式: { 桩号(m), 坡度(%), 坡长(m), 平曲线半径(m, 0=直线, 符号表示转向) }
export const SAMPLE_PROFILE = [
  { stakeM: 0,     grade: -2.5, length: 800,  radius: 0 },
  { stakeM: 800,   grade: -4.8, length: 1500, radius: 600 },
  { stakeM: 2300,  grade: -5.5, length: 2000, radius: 0 },
  { stakeM: 4300,  grade: -6.0, length: 1800, radius: -450 },
  { stakeM: 6100,  grade: -5.2, length: 2200, radius: 800 },
  { stakeM: 8300,  grade: -6.5, length: 1600, radius: 0 },
  { stakeM: 9900,  grade: -4.0, length: 1400, radius: 380 },
  { stakeM: 11300, grade: -3.0, length: 1200, radius: 0 },
  { stakeM: 12500, grade: -1.0, length: 800,  radius: 0 }
];
