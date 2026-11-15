// 解剖分区与三维/平面定位的常量定义
// side: front=前侧可见, back=后侧可见, both=双面可见（四肢用投影可见性控制）
export const DEFAULT_ZONES = [
  // 头颈部
  { id: 'HF', name: '前面部', code: 'HF', parts: ['head'], side: 'front', band: null, color: '#f4b6c2', active: true },
  { id: 'HL', name: '头皮/颅部', code: 'HL', parts: ['head'], side: 'back', band: null, color: '#e8a0b0', active: true },
  { id: 'NF', name: '颈前区', code: 'NF', parts: ['neck'], side: 'front', band: null, color: '#f8c8d2', active: true },
  { id: 'NL', name: '颈后区', code: 'NL', parts: ['neck'], side: 'back', band: null, color: '#eeb8c4', active: true },
  // 躯干
  { id: 'CH', name: '胸部', code: 'CH', parts: ['torso'], side: 'front', band: 'upper', color: '#b8d8f0', active: true },
  { id: 'AB', name: '腹部', code: 'AB', parts: ['torso'], side: 'front', band: 'lower', color: '#a8c8e8', active: true },
  { id: 'BK', name: '背部', code: 'BK', parts: ['torso'], side: 'back', band: 'upper', color: '#9fc0e0', active: true },
  { id: 'LP', name: '腰区', code: 'LP', parts: ['torso'], side: 'back', band: 'lower', color: '#8fb4d8', active: true },
  { id: 'SH', name: '肩带区', code: 'SH', parts: ['shoulderL', 'shoulderR'], side: 'both', band: null, color: '#c8e0b8', active: true },
  { id: 'PV', name: '骨盆/腹股沟区', code: 'PV', parts: ['pelvis'], side: 'both', band: null, color: '#d8c8a8', active: true },
  // 上肢
  { id: 'UA', name: '上臂', code: 'UA', parts: ['upperArmL', 'upperArmR'], side: 'both', band: null, color: '#d8e8a8', active: true },
  { id: 'EL', name: '肘区', code: 'EL', parts: ['elbowL', 'elbowR'], side: 'both', band: null, color: '#c8d898', active: true },
  { id: 'FA', name: '前臂', code: 'FA', parts: ['forearmL', 'forearmR'], side: 'both', band: null, color: '#b8d088', active: true },
  { id: 'HD', name: '手部', code: 'HD', parts: ['handL', 'handR'], side: 'both', band: null, color: '#a8c078', active: true },
  // 下肢
  { id: 'TH', name: '大腿', code: 'TH', parts: ['thighL', 'thighR'], side: 'both', band: null, color: '#e8c8a0', active: true },
  { id: 'KN', name: '膝区', code: 'KN', parts: ['kneeL', 'kneeR'], side: 'both', band: null, color: '#d8b890', active: true },
  { id: 'LG', name: '小腿', code: 'LG', parts: ['lowerLegL', 'lowerLegR'], side: 'both', band: null, color: '#c8a880', active: true },
  { id: 'FT', name: '足部', code: 'FT', parts: ['footL', 'footR'], side: 'both', band: null, color: '#b89870', active: true }
];

export const DEFAULT_ANGLES = [
  { id: 'AN01', name: '全身正位', body: '全身', guidance: '患者直立，双臂外展约30°，镜头距患者2米，居中取景，含头足。', active: true },
  { id: 'AN02', name: '全身背位', body: '全身', guidance: '患者背向镜头，双脚并拢，镜头距患者2米，完整取景。', active: true },
  { id: 'AN03', name: '躯干左侧位', body: '躯干', guidance: '左侧45°斜位，取景自肩峰至髂嵴，光源45°斜照。', active: true },
  { id: 'AN04', name: '躯干右侧位', body: '躯干', guidance: '右侧45°斜位，取景自肩峰至髂嵴，光源45°斜照。', active: true },
  { id: 'AN05', name: '上肢近摄', body: '上肢', guidance: '皮损置画面中央，皮肤镜垂直皮面，内置比例尺，焦距固定。', active: true },
  { id: 'AN06', name: '下肢近摄', body: '下肢', guidance: '皮损置画面中央，皮肤镜垂直皮面，内置比例尺，焦距固定。', active: true },
  { id: 'AN07', name: '头面特写', body: '头面', guidance: '自然光+偏振模式各一张，保持与基线相同机位与放大倍数。', active: true }
];

export const NETWORK_TYPES = ['网状', '均匀网状', '非典型网状', '球状', '均质状', '条纹状', '无结构'];
export const EDGE_TYPES = ['规则', '轻度不规则', '明显不规则', '伪足/放射纹'];
export const DECISIONS = [
  { id: 'observe', name: '观察' },
  { id: 'biopsy', name: '活检' },
  { id: 'excise', name: '切除' }
];

export const TASK_STATUS = [
  { id: 'pending_capture', name: '待采集' },
  { id: 'pending_read', name: '待判读' },
  { id: 'judged', name: '已判读' },
  { id: 'returned', name: '已退回' }
];

export const ROLES = [
  { id: 'physician', name: '门诊医师' },
  { id: 'tech', name: '技师' },
  { id: 'director', name: '主任' }
];

export const FLAG_RULES = {
  diameterDeltaMm: 1,            // 直径增加 > 1mm 标黄
  irregularEdges: ['明显不规则', '伪足/放射纹'],
  newMole: true                  // 基线不存在的新痣标黄
};

// 三维人体部件定义：名称、几何体、尺寸与世界坐标（y 向上，单位近似米）
export const BODY_PARTS = [
  { id: 'head',      kind: 'sphere',  size: [0.115, 0.135, 0.105], pos: [0, 1.66, 0] },
  { id: 'neck',      kind: 'cylinder', size: [0.045, 0.05, 0.09], pos: [0, 1.49, 0] },
  { id: 'torso',     kind: 'cylinder', size: [0.175, 0.145, 0.52], pos: [0, 1.19, 0] },
  { id: 'shoulderL', kind: 'sphere',  size: [0.062, 0.062, 0.062], pos: [-0.20, 1.40, 0] },
  { id: 'shoulderR', kind: 'sphere',  size: [0.062, 0.062, 0.062], pos: [0.20, 1.40, 0] },
  { id: 'upperArmL', kind: 'capsule', size: [0.042, 0.042, 0.27], pos: [-0.245, 1.235, 0] },
  { id: 'upperArmR', kind: 'capsule', size: [0.042, 0.042, 0.27], pos: [0.245, 1.235, 0] },
  { id: 'elbowL',    kind: 'sphere',  size: [0.04, 0.04, 0.04], pos: [-0.25, 1.085, 0] },
  { id: 'elbowR',    kind: 'sphere',  size: [0.04, 0.04, 0.04], pos: [0.25, 1.085, 0] },
  { id: 'forearmL',  kind: 'capsule', size: [0.036, 0.036, 0.24], pos: [-0.252, 0.94, 0] },
  { id: 'forearmR',  kind: 'capsule', size: [0.036, 0.036, 0.24], pos: [0.252, 0.94, 0] },
  { id: 'handL',     kind: 'sphere',  size: [0.038, 0.052, 0.024], pos: [-0.255, 0.785, 0] },
  { id: 'handR',     kind: 'sphere',  size: [0.038, 0.052, 0.024], pos: [0.255, 0.785, 0] },
  { id: 'pelvis',    kind: 'sphere',  size: [0.15, 0.10, 0.095], pos: [0, 0.885, 0] },
  { id: 'thighL',    kind: 'capsule', size: [0.062, 0.062, 0.34], pos: [-0.085, 0.65, 0] },
  { id: 'thighR',    kind: 'capsule', size: [0.062, 0.062, 0.34], pos: [0.085, 0.65, 0] },
  { id: 'kneeL',     kind: 'sphere',  size: [0.05, 0.046, 0.05], pos: [-0.085, 0.45, 0] },
  { id: 'kneeR',     kind: 'sphere',  size: [0.05, 0.046, 0.05], pos: [0.085, 0.45, 0] },
  { id: 'lowerLegL', kind: 'capsule', size: [0.046, 0.04, 0.34], pos: [-0.085, 0.255, 0] },
  { id: 'lowerLegR', kind: 'capsule', size: [0.046, 0.04, 0.34], pos: [0.085, 0.255, 0] },
  { id: 'footL',     kind: 'box',     size: [0.06, 0.04, 0.12], pos: [-0.085, 0.045, 0.028] },
  { id: 'footR',     kind: 'box',     size: [0.06, 0.04, 0.12], pos: [0.085, 0.045, 0.028] }
];

// 平面图（前/后位图）锚盒：x/y 为 SVG 坐标范围（viewBox 高 460），u/v 为部件局部 0..1
// v=0 对应部件下端，v=1 对应上端；左右侧由 x 符号决定
export const FLAT_ANCHORS = {
  head:      { front: { x: [-30, 30],   y: [14, 78] },  back: { x: [-30, 30],   y: [14, 78] } },
  neck:      { front: { x: [-18, 18],   y: [78, 104] }, back: { x: [-18, 18],   y: [78, 104] } },
  torso:     { front: { x: [-78, 78],   y: [104, 252] },back: { x: [-78, 78],   y: [104, 252] } },
  shoulderL: { front: { x: [-108, -78], y: [108, 142] },back: { x: [-108, -78], y: [108, 142] } },
  shoulderR: { front: { x: [78, 108],   y: [108, 142] },back: { x: [78, 108],   y: [108, 142] } },
  upperArmL: { front: { x: [-118, -92], y: [142, 240] },back: { x: [-118, -92], y: [142, 240] } },
  upperArmR: { front: { x: [92, 118],   y: [142, 240] },back: { x: [92, 118],   y: [142, 240] } },
  elbowL:    { front: { x: [-118, -92], y: [240, 262] },back: { x: [-118, -92], y: [240, 262] } },
  elbowR:    { front: { x: [92, 118],   y: [240, 262] },back: { x: [92, 118],   y: [240, 262] } },
  forearmL:  { front: { x: [-114, -90], y: [262, 346] },back: { x: [-114, -90], y: [262, 346] } },
  forearmR:  { front: { x: [90, 114],   y: [262, 346] },back: { x: [90, 114],   y: [262, 346] } },
  handL:     { front: { x: [-116, -88], y: [346, 386] },back: { x: [-116, -88], y: [346, 386] } },
  handR:     { front: { x: [88, 116],   y: [346, 386] },back: { x: [88, 116],   y: [346, 386] } },
  pelvis:    { front: { x: [-66, 66],   y: [252, 296] },back: { x: [-66, 66],   y: [252, 296] } },
  thighL:    { front: { x: [-58, -14],  y: [296, 388] },back: { x: [-58, -14],  y: [296, 388] } },
  thighR:    { front: { x: [14, 58],    y: [296, 388] },back: { x: [14, 58],    y: [296, 388] } },
  kneeL:     { front: { x: [-56, -16],  y: [388, 410] },back: { x: [-56, -16],  y: [388, 410] } },
  kneeR:     { front: { x: [16, 56],    y: [388, 410] },back: { x: [16, 56],    y: [388, 410] } },
  lowerLegL: { front: { x: [-54, -18],  y: [410, 452] },back: { x: [-54, -18],  y: [410, 452] } },
  lowerLegR: { front: { x: [18, 54],    y: [410, 452] },back: { x: [18, 54],    y: [410, 452] } },
  footL:     { front: { x: [-58, -14],  y: [452, 462] },back: { x: [-58, -14],  y: [452, 462] } },
  footR:     { front: { x: [14, 58],    y: [452, 462] },back: { x: [14, 58],    y: [452, 462] } }
};
