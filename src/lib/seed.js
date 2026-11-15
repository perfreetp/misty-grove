import { sectorPolygon, vialNumber, pointOnCircle, pointSite, DEFAULT_GEO } from './domain.js';

const G = { ...DEFAULT_GEO };
const p = (id, seq) => id;

let uid = 0;
export const newId = (prefix = 'id') => `${prefix}-${Date.now().toString(36)}-${(uid++).toString(36)}`;

const lesion = (id, startHour, endHour, rIn, rOut, grade, extra = {}) => ({
  id,
  startHour,
  endHour,
  rIn,
  rOut,
  grade,
  points: sectorPolygon(G, startHour, endHour, rIn, rOut),
  clockNote: '',
  circumferenceManual: null,
  note: '',
  ...extra
});

const biopsy = (id, seq, accession, h, r, lesionId, pathGrade = null, pathDate = null, extra = {}) => {
  const pt = pointOnCircle(G, r, h * 30);
  const hour = ((h % 12) + 12) % 12 || 12;
  const quad = hour === 12 || hour === 1 || hour === 2 || hour === 3 ? '左前' : '左后';
  const site = pointSite(pt, G);
  return {
    id,
    seq,
    vial: vialNumber(accession, seq),
    point: pt,
    siteHour: site.hour,
    siteText: site.description,
    lesionId,
    pathGrade,
    pathDate,
    pathNote: '',
    takenBy: '',
    ...extra
  };
};

// 点位描述由 domain 在运行时计算并写回 store；此处仅给出基础字段。

export function buildSeed() {
  const cases = [];
  const images = (seed, lesions = []) => ({
    pre: `syn:${seed}:pre`,
    post: `syn:${seed}:post`,
    iodine: `syn:${seed}:iodine`
  });

  const l1 = lesion('L-101', 10, 2, 0.10, 0.215, '低级别');
  const l2 = lesion('L-102', 5, 7, 0.115, 0.25, '高级别');
  const l3 = lesion('L-201', 7, 9, 0.10, 0.26, '高级别');
  const l4 = lesion('L-301', 1, 4, 0.09, 0.20, '低级别');
  const l5 = lesion('L-302', 6, 8, 0.10, 0.235, '低级别');
  const l6 = lesion('L-401', 11, 1, 0.095, 0.21, '高级别');
  const l7 = lesion('L-501', 2, 5, 0.10, 0.225, '高级别');
  const l8 = lesion('L-601', 8, 11, 0.10, 0.24, '高级别');
  const l9 = lesion('L-701', 3, 6, 0.10, 0.23, '低级别');
  const l10 = lesion('L-801', 9, 12, 0.095, 0.205, '低级别');

  // 1 待检查
  cases.push({
    id: 'C-2026-1102',
    accession: 'C-2026-1102',
    name: '赵*敏',
    age: 38,
    phone: '138****6621',
    physician: '李敏',
    registeredAt: '2026-11-14',
    scheduledAt: '2026-11-16',
    status: 'pending',
    indication: 'TCT ASC-US，HPV16 阳性，首次阴道镜',
    parity: 'G2P1',
    lmp: '2026-11-01',
    priorScreen: 'TCT 2026-10-28 ASC-US；HPV 16+',
    exam: null,
    priorExams: [],
    tasks: [],
    log: [ev('2026-11-14 09:12', '登记', '王雪', '门诊转诊登记，预约至 11-16')]
  });

  // 2 已检查，未取活检
  cases.push({
    id: 'C-2026-1103',
    accession: 'C-2026-1103',
    name: '孙*华',
    age: 42,
    phone: '139****0318',
    physician: '李敏',
    registeredAt: '2026-11-10',
    scheduledAt: '2026-11-12',
    status: 'examined',
    indication: 'HPV 18 阳性，TCT NILM，既往 CIN1 随访',
    parity: 'G3P2',
    lmp: '2026-11-08',
    priorScreen: 'HPV 18+；TCT NILM',
    exam: {
      examDate: '2026-11-12',
      tzType: 'II',
      geometry: { ...G },
      images: images(21),
      lesions: [l1, l2],
      biopsies: [],
      noLesionNote: '',
      impression: '宫颈 10—2 点及 5—7 点醋酸白上皮，见细小镶嵌，转化区部分可见（II 型）。',
      aceticOnset: '60',
      lugol: '部分不着色',
      scjVisible: '部分可见'
    },
    priorExams: [],
    tasks: [],
    log: [
      ev('2026-11-10 14:02', '登记', '王雪', 'HPV18 阳性转诊'),
      ev('2026-11-12 10:26', '完成检查', '李敏', '三图采集完成，标注 2 处病灶，暂未取活检')
    ]
  });

  // 3 待活检（病理未回填）
  const c3Acc = 'C-2026-1104';
  const c3b1 = biopsy('B-301', 1, c3Acc, 8, 0.19, 'L-201');
  const c3b2 = biopsy('B-302', 2, c3Acc, 10, 0.21, 'L-201');
  const c3b3 = biopsy('B-303', 3, c3Acc, 2, 0.16, null);
  cases.push({
    id: c3Acc,
    accession: c3Acc,
    name: '周*',
    age: 33,
    phone: '137****7742',
    physician: '王雪',
    registeredAt: '2026-11-08',
    scheduledAt: '2026-11-11',
    status: 'biopsy',
    indication: 'TCT HSIL，HPV16 阳性',
    parity: 'G1P0',
    lmp: '2026-11-03',
    priorScreen: 'TCT 2026-11-05 HSIL；HPV16+',
    exam: {
      examDate: '2026-11-11',
      tzType: 'I',
      geometry: { ...G },
      images: images(33),
      lesions: [l3],
      biopsies: [
        { ...c3b1, takenBy: '王雪' },
        { ...c3b2, takenBy: '王雪' },
        { ...c3b3, takenBy: '王雪' }
      ],
      noLesionNote: '',
      impression: '7—9 点致密醋酸白上皮，边界清晰，见粗大镶嵌及点状血管，符合高级别病变。',
      aceticOnset: '45',
      lugol: '芥末黄（不着色）',
      scjVisible: '完全可见'
    },
    priorExams: [],
    tasks: [],
    log: [
      ev('2026-11-08 11:20', '登记', '王雪', 'HSIL 转诊'),
      ev('2026-11-11 09:48', '完成检查', '王雪', '标注 7—9 点高级别灶'),
      ev('2026-11-11 10:15', '登记活检', '王雪', '3 点活检，瓶号已生成')
    ]
  });

  // 4 已出病理 + 面积增大（与 2026-05 前次对比）
  const c4Acc = 'C-2026-1105';
  const prevLesion = lesion('L-401P', 11, 1, 0.10, 0.185, '高级别');
  cases.push({
    id: c4Acc,
    accession: c4Acc,
    name: '吴*芳',
    age: 47,
    phone: '136****2287',
    physician: '王雪',
    registeredAt: '2026-11-06',
    scheduledAt: '2026-11-09',
    status: 'pathology',
    indication: 'CIN2 随访，既往 2026-05 阴道镜',
    parity: 'G2P2',
    lmp: '2026-10-29',
    priorScreen: 'TCT 2026-11-02 ASC-H；HPV16+',
    exam: {
      examDate: '2026-11-09',
      tzType: 'II',
      geometry: { ...G },
      images: images(45),
      lesions: [l6],
      biopsies: [
        { ...biopsy('B-401', 1, c4Acc, 11, 0.17, 'L-401'), pathGrade: 'CIN 2', pathDate: '2026-11-13', pathNote: '局部腺体受累', takenBy: '王雪' },
        { ...biopsy('B-402', 2, c4Acc, 1, 0.20, 'L-401'), pathGrade: 'CIN 2', pathDate: '2026-11-13', pathNote: '', takenBy: '王雪' }
      ],
      noLesionNote: '',
      impression: '11—1 点片状醋酸白上皮，范围较前次扩大，碘试验不着色。',
      aceticOnset: '60',
      lugol: '不着色',
      scjVisible: '完全可见'
    },
    priorExams: [
      {
        examDate: '2026-05-12',
        tzType: 'II',
        geometry: { ...G },
        images: images(44),
        lesions: [prevLesion],
        biopsies: [{ ...biopsy('B-401P', 1, 'C-2026-0418', 12, 0.16, 'L-401P'), pathGrade: 'CIN 1', pathDate: '2026-05-16', pathNote: '', takenBy: '王雪' }],
        impression: '12 点小片醋酸白上皮，活检 CIN1。',
        aceticOnset: '60',
        lugol: '部分不着色',
        scjVisible: '完全可见'
      }
    ],
    tasks: [],
    log: [
      ev('2026-11-06 10:32', '登记', '王雪', 'CIN2 随访复查'),
      ev('2026-11-09 11:05', '完成检查', '王雪', '病灶较前次扩大，取 2 点'),
      ev('2026-11-13 16:40', '病理回填', '刘颖', '2 瓶均回报 CIN2')
    ]
  });

  // 5 随访中，任务即将到期 + 一次改约记录
  const c5Acc = 'C-2026-1106';
  cases.push({
    id: c5Acc,
    accession: c5Acc,
    name: '郑*丽',
    age: 29,
    phone: '135****9903',
    physician: '陈立',
    registeredAt: '2026-10-20',
    scheduledAt: '2026-10-23',
    status: 'followup',
    indication: 'CIN1 观察随访',
    parity: 'G1P1',
    lmp: '2026-11-09',
    priorScreen: 'TCT 2026-10-15 LSIL；HPV52+',
    exam: {
      examDate: '2026-10-23',
      tzType: 'I',
      geometry: { ...G },
      images: images(57),
      lesions: [l4, l5],
      biopsies: [
        { ...biopsy('B-501', 1, c5Acc, 2, 0.18, 'L-301'), pathGrade: 'CIN 1', pathDate: '2026-10-28', pathNote: 'p16 斑片状', takenBy: '陈立' },
        { ...biopsy('B-502', 2, c5Acc, 7, 0.20, 'L-302'), pathGrade: '未见CIN / 炎症', pathDate: '2026-10-28', pathNote: '', takenBy: '陈立' }
      ],
      noLesionNote: '',
      impression: '2—4 点及 6—8 点薄醋酸白上皮，边界欠清。',
      aceticOnset: '90',
      lugol: '部分不着色',
      scjVisible: '完全可见'
    },
    priorExams: [],
    tasks: [
      { id: 'T-501', kind: '阴道镜复查', dueDate: '2026-11-20', status: '待随访', assignee: '陈立', phone: '135****9903', note: 'CIN1 6 个月复查，提前安排', history: [] },
      { id: 'T-502', kind: 'HPV 分型复查', dueDate: '2026-11-09', status: '待随访', assignee: '陈立', phone: '135****9903', note: '原定 11-09，患者出差改约', history: [{ at: '2026-11-07 15:10', by: '陈立', from: '2026-11-09', to: '2026-11-24', reason: '患者外地出差，电话沟通后改约至 11-24' }] }
    ],
    log: [
      ev('2026-10-20 09:40', '登记', '陈立', 'LSIL 转诊'),
      ev('2026-10-28 17:02', '病理回填', '刘颖', 'CIN1 / 炎症'),
      ev('2026-10-30 10:12', '开启随访', '陈立', '生成复查任务 2 项')
    ]
  });

  // 6 随访中 CIN3
  const c6Acc = 'C-2026-1107';
  cases.push({
    id: c6Acc,
    accession: c6Acc,
    name: '冯*',
    age: 51,
    phone: '133****4410',
    physician: '陈立',
    registeredAt: '2026-09-28',
    scheduledAt: '2026-10-02',
    status: 'followup',
    indication: 'CIN3 锥切后随访',
    parity: 'G2P1',
    lmp: '2026-11-02',
    priorScreen: 'TCT 2026-09-20 HSIL；HPV16+',
    exam: {
      examDate: '2026-10-02',
      tzType: 'III',
      geometry: { ...G },
      images: images(69),
      lesions: [l7],
      biopsies: [
        { ...biopsy('B-601', 1, c6Acc, 3, 0.19, 'L-501'), pathGrade: 'CIN 3', pathDate: '2026-10-08', pathNote: '累及腺体，切缘待评', takenBy: '陈立' }
      ],
      noLesionNote: '',
      impression: '宫颈 2—5 点厚醋酸白上皮，碘试验明显不着色；SCJ 部分不可见。',
      aceticOnset: '45',
      lugol: '不着色',
      scjVisible: '不可见'
    },
    priorExams: [],
    tasks: [
      { id: 'T-601', kind: '阴道镜复查', dueDate: '2027-01-02', status: '待随访', assignee: '陈立', phone: '133****4410', note: 'CIN3 治疗后 3 个月复查', history: [] },
      { id: 'T-602', kind: 'TCT + HPV 联合筛查', dueDate: '2026-11-28', status: '待随访', assignee: '王雪', phone: '133****4410', note: '', history: [] }
    ],
    log: [
      ev('2026-09-28 13:30', '登记', '陈立', '锥切后随访'),
      ev('2026-10-08 16:20', '病理回填', '刘颖', 'CIN3，累及腺体'),
      ev('2026-10-09 09:15', '开启随访', '陈立', '3 个月复查 + 联合筛查')
    ]
  });

  // 7 已结案 CIN2
  const c7Acc = 'C-2026-1108';
  cases.push({
    id: c7Acc,
    accession: c7Acc,
    name: '蒋*英',
    age: 36,
    phone: '130****8812',
    physician: '李敏',
    registeredAt: '2026-04-08',
    scheduledAt: '2026-04-10',
    status: 'closed',
    indication: 'CIN2 LEEP 术后随访',
    parity: 'G1P1',
    lmp: '2026-04-25',
    priorScreen: 'TCT 2026-04-02 HSIL',
    exam: {
      examDate: '2026-04-10',
      tzType: 'I',
      geometry: { ...G },
      images: images(81),
      lesions: [l8],
      biopsies: [
        { ...biopsy('B-701', 1, c7Acc, 9, 0.18, 'L-601'), pathGrade: 'CIN 2', pathDate: '2026-04-16', pathNote: 'p16 弥漫阳性', takenBy: '李敏' }
      ],
      noLesionNote: '',
      impression: '8—11 点醋酸白上皮，界限清晰。',
      aceticOnset: '60',
      lugol: '不着色',
      scjVisible: '完全可见'
    },
    priorExams: [],
    tasks: [
      { id: 'T-701', kind: '术后 6 个月复查', dueDate: '2026-10-10', status: '已完成', assignee: '李敏', phone: '130****8812', note: '', history: [] },
      { id: 'T-702', kind: 'HPV 复查', dueDate: '2026-10-10', status: '已完成', assignee: '李敏', phone: '130****8812', note: '', history: [] }
    ],
    closedAt: '2026-10-20',
    closeSummary: '术后 6 个月复查 TCT NILM、HPV 阴性，阴道镜未见残留病灶，随访结束结案。',
    log: [
      ev('2026-04-08 08:50', '登记', '王雪', 'LEEP 术后随访'),
      ev('2026-04-16 15:30', '病理回填', '刘颖', 'CIN2，p16 弥漫'),
      ev('2026-04-18 09:20', '开启随访', '李敏', '术后 6 个月复查'),
      ev('2026-10-20 11:00', '结案', '李敏', '复查双阴性，随访结束')
    ]
  });

  // 8 已结案 阴性
  const c8Acc = 'C-2026-1109';
  cases.push({
    id: c8Acc,
    accession: c8Acc,
    name: '何*',
    age: 44,
    phone: '131****3325',
    physician: '王雪',
    registeredAt: '2026-03-02',
    scheduledAt: '2026-03-05',
    status: 'closed',
    indication: '接触性出血，排除宫颈病变',
    parity: 'G3P1',
    lmp: '2026-03-20',
    priorScreen: 'TCT NILM；HPV 阴性',
    exam: {
      examDate: '2026-03-05',
      tzType: 'I',
      geometry: { ...G },
      images: images(93),
      lesions: [],
      biopsies: [
        { ...biopsy('B-801', 1, c8Acc, 6, 0.16, null), pathGrade: '未见CIN / 炎症', pathDate: '2026-03-10', pathNote: '慢性宫颈炎', takenBy: '王雪' }
      ],
      noLesionNote: '宫颈光滑，醋酸试验未见白色上皮，碘染均匀着染，未见可疑病灶。',
      impression: '未见异常病灶，6 点取点活检排除病变。',
      aceticOnset: '120',
      lugol: '均匀着染',
      scjVisible: '完全可见'
    },
    priorExams: [],
    tasks: [
      { id: 'T-801', kind: '常规筛查复查', dueDate: '2027-03-05', status: '已完成', assignee: '王雪', phone: '131****3325', note: '', history: [] }
    ],
    closedAt: '2026-09-12',
    closeSummary: '病理慢性宫颈炎，症状缓解，常规筛查年度随访，结案。',
    log: [
      ev('2026-03-02 10:15', '登记', '王雪', '接触性出血'),
      ev('2026-03-10 14:00', '病理回填', '刘颖', '慢性宫颈炎'),
      ev('2026-09-12 10:30', '结案', '王雪', '症状缓解，转年度筛查')
    ]
  });

  // 9 待活检 + 点位与病理不符（部分回填）
  const c9Acc = 'C-2026-1110';
  cases.push({
    id: c9Acc,
    accession: c9Acc,
    name: '吕*萍',
    age: 40,
    phone: '132****6678',
    physician: '陈立',
    registeredAt: '2026-11-07',
    scheduledAt: '2026-11-10',
    status: 'biopsy',
    indication: 'TCT ASC-H',
    parity: 'G2P1',
    lmp: '2026-10-27',
    priorScreen: 'TCT 2026-11-04 ASC-H；HPV 阴性',
    exam: {
      examDate: '2026-11-10',
      tzType: 'II',
      geometry: { ...G },
      images: images(105),
      lesions: [l9],
      biopsies: [
        { ...biopsy('B-901', 1, c9Acc, 8, 0.20, null), pathGrade: 'CIN 2', pathDate: '2026-11-14', pathNote: '点状血管区取样，与标注灶位置不符', takenBy: '陈立' },
        { ...biopsy('B-902', 2, c9Acc, 10, 0.17, null), takenBy: '陈立' }
      ],
      noLesionNote: '',
      impression: '3—6 点醋酸白上皮伴点状血管，10 点可疑薄白上皮；8 点取材时见点状血管，与标注灶位置不完全一致。',
      aceticOnset: '60',
      lugol: '部分不着色',
      scjVisible: '部分可见'
    },
    priorExams: [],
    tasks: [],
    log: [
      ev('2026-11-07 09:05', '登记', '王雪', 'ASC-H 转诊'),
      ev('2026-11-14 17:22', '病理回填', '刘颖', 'B901 CIN2；B902 待回填')
    ]
  });

  // 10 已出病理 高级别未证实 + 面积提示
  const c10Acc = 'C-2026-1111';
  cases.push({
    id: c10Acc,
    accession: c10Acc,
    name: '施*',
    age: 55,
    phone: '138****1190',
    physician: '李敏',
    registeredAt: '2026-10-30',
    scheduledAt: '2026-11-03',
    status: 'pathology',
    indication: '绝经后异常出血，可疑病变',
    parity: 'G4P2',
    lmp: '2025-06（绝经）',
    priorScreen: 'TCT 2026-10-26 HSIL；HPV18+',
    exam: {
      examDate: '2026-11-03',
      tzType: 'III',
      geometry: { ...G },
      images: images(117),
      lesions: [l10],
      biopsies: [
        { ...biopsy('B-1001', 1, c10Acc, 10, 0.19, 'L-801'), pathGrade: 'CIN 1', pathDate: '2026-11-08', pathNote: '鳞化上皮，p16 阴性', takenBy: '李敏' },
        { ...biopsy('B-1002', 2, c10Acc, 2, 0.20, null), pathGrade: 'CIN 1', pathDate: '2026-11-08', pathNote: '', takenBy: '李敏' }
      ],
      noLesionNote: '',
      impression: '9—12 点醋白上皮，绝经后 SCJ 内移，转化区不可见，病灶分级偏低但与细胞学不一致。',
      aceticOnset: '90',
      lugol: '完全不着色',
      scjVisible: '不可见'
    },
    priorExams: [],
    tasks: [],
    log: [
      ev('2026-10-30 11:40', '登记', '王雪', '绝经后出血'),
      ev('2026-11-03 10:20', '完成检查', '李敏', '2 点活检，SCJ 不可见'),
      ev('2026-11-08 16:05', '病理回填', '刘颖', '两瓶均 CIN1')
    ]
  });

  return cases;
}

function ev(at, action, by, note) {
  return { at, action, by, note };
}
