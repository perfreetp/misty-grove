import type {
  AppState,
  CaseDoc,
  Conventions,
  Person,
  ValveModel,
  VolumeMeta,
} from '../lib/types';
import { SEED_PHANTOM_BICUSPID_B, SEED_PHANTOM_TRICUSPID_A } from './seedCases';

export const DEFAULT_CONVENTIONS: Conventions = {
  annulusContour: '内缘',
  perimeterMethod: '折线',
  lvotOffsetMm: 5,
  coronaryHeightRef: '开口下缘',
  sizingReference: '周长派生径',
  minOversizePct: -2,
  maxOversizePct: 12,
  targetOversizePct: 6,
  frameClearanceMinMm: 3,
  ostiumHeightMinMm: 10,
  pvlGapMm: 1.2,
  calcThresholdHU: 400,
  calcSectorCount: 36,
  calcBandMm: 6,
  calcStiffnessGain: 1,
  annularThicknessMm: 2.5,
  updatedAt: 0,
  updatedBy: '系统默认',
};

export const PEOPLE: Person[] = [
  { id: 'op-li', name: '李承泽', title: '主任医师', role: 'physician' },
  { id: 'op-zhao', name: '赵敏行', title: '副主任医师', role: 'physician' },
  { id: 'op-wu', name: '吴蔚', title: '主治医师', role: 'physician' },
  { id: 'op-qin', name: '秦予安', title: '住院医师', role: 'physician' },
  { id: 'tech-zhou', name: '周立群', title: '影像技师', role: 'technologist' },
  { id: 'dir-chen', name: '陈嘉禾', title: '心内科主任', role: 'director' },
];

export const DEFAULT_VALVES: ValveModel[] = [
  {
    id: 'valve-evolut-fx',
    brand: 'Medtronic',
    name: 'Evolut FX',
    type: '自膨胀',
    active: true,
    frameHeightMm: 45,
    skirtHeightMm: 12,
    riskZoneHeightMm: 22,
    radialForceNPerMm: 0.62,
    cellCount: 12,
    shape: 'flare',
    sizes: [
      { nominalMm: 23, label: '23' },
      { nominalMm: 26, label: '26' },
      { nominalMm: 29, label: '29' },
      { nominalMm: 34, label: '34' },
    ],
    notes: '环上瓣设计,瓣架高位,冠脉风险需重点关注。',
  },
  {
    id: 'valve-sapien-3',
    brand: 'Edwards',
    name: 'SAPIEN 3 Ultra',
    type: '球囊扩张',
    active: true,
    frameHeightMm: 22,
    skirtHeightMm: 9,
    riskZoneHeightMm: 12,
    radialForceNPerMm: 0.86,
    cellCount: 9,
    shape: 'straight',
    sizes: [
      { nominalMm: 20, label: '20' },
      { nominalMm: 23, label: '23' },
      { nominalMm: 26, label: '26' },
      { nominalMm: 29, label: '29' },
    ],
    notes: '短瓣架,低位释放,瓣周漏与传导阻滞需权衡。',
  },
  {
    id: 'valve-navitor',
    brand: '微创心通',
    name: 'VitaFlow Liberty',
    type: '自膨胀',
    active: true,
    frameHeightMm: 45,
    skirtHeightMm: 14,
    riskZoneHeightMm: 24,
    radialForceNPerMm: 0.71,
    cellCount: 12,
    shape: 'flare',
    sizes: [
      { nominalMm: 21, label: '21' },
      { nominalMm: 24, label: '24' },
      { nominalMm: 27, label: '27' },
      { nominalMm: 30, label: '30' },
    ],
    notes: '国产自膨胀瓣膜,径向力较高,钙化重时注意膨胀形态。',
  },
  {
    id: 'valve-venus',
    brand: '启明医疗',
    name: 'VenusA-Plus',
    type: '自膨胀',
    active: false,
    frameHeightMm: 43,
    skirtHeightMm: 12,
    riskZoneHeightMm: 21,
    radialForceNPerMm: 0.58,
    cellCount: 12,
    shape: 'flare',
    sizes: [
      { nominalMm: 23, label: '23' },
      { nominalMm: 26, label: '26' },
      { nominalMm: 29, label: '29' },
      { nominalMm: 32, label: '32' },
    ],
    notes: '暂停维护:2026 年批次口径待厂家确认。',
  },
];

function nowMinus(hours: number) {
  return Date.now() - hours * 3600 * 1000;
}

export function makeAudit(by: string, role: Person['role'], action: string, detail: string, at = Date.now()) {
  return { at, by, role, action, detail };
}

export function initialCases(): CaseDoc[] {
  const seedA = SEED_PHANTOM_TRICUSPID_A;
  const seedB = SEED_PHANTOM_BICUSPID_B;
  const base = (
    id: string,
    orderNo: string,
    name: string,
    sex: '男' | '女',
    age: number,
    mrn: string,
    operatorId: string,
    volumeRef: string,
    status: CaseDoc['status'],
    priority: CaseDoc['priority'],
    indication: string,
    hoursAgo: number,
    extra: Partial<CaseDoc> = {},
  ): CaseDoc => {
    const createdAt = nowMinus(hoursAgo);
    return {
      id,
      orderNo,
      patient: { name, sex, age, mrn },
      operatorId,
      requester: PEOPLE.find((p) => p.id === operatorId)?.name ?? '',
      createdAt,
      updatedAt: createdAt,
      status,
      priority,
      indication,
      notes: '',
      volumeRef,
      measurement: { contours: [], landmarks: [] },
      submissionCount: 0,
      returnCount: 0,
      audit: [makeAudit('系统', 'technologist', '创建申请单', `由门诊 HIS 申请单 ${orderNo} 同步`, createdAt)],
      ...extra,
    };
  };

  const seeded = (
    doc: CaseDoc,
    seed: typeof seedA,
    status: CaseDoc['status'],
    extra: Partial<CaseDoc> = {},
  ): CaseDoc => {
    const measurement = {
      contours: seed.measurement.contours,
      landmarks: seed.measurement.landmarks,
    };
    return {
      ...doc,
      status,
      measurement,
      summary: seed.summary,
      sizing: seed.sizing,
      release: seed.release,
      ...extra,
    };
  };

  const c1 = base(
    'case-2601',
    'TAVR-2026-0174',
    '孙学礼',
    '男',
    76,
    'MRN-884120',
    'op-li',
    'phantom-tricuspid-a',
    '待测量',
    '优先',
    '重度主动脉瓣狭窄,STS 4.2%,拟行 TAVR。',
    6,
  );

  const c2 = seeded(
    base(
      'case-2602',
      'TAVR-2026-0172',
      '顾慧兰',
      '女',
      81,
      'MRN-884057',
      'op-zhao',
      'phantom-bicuspid-b',
      '待审核',
      '常规',
      '二叶式主动脉瓣重度狭窄,低冠脉开口高度,需评估冠脉阻塞。',
      26,
    ),
    seedB,
    '待审核',
    {
      submittedAt: nowMinus(3),
      submissionCount: 1,
      justification: {
        text: '瓣环钙化呈偏心分布,按 29 mm 试算;左冠开口高度 9.5 mm 低于口径下限,术中拟备球囊保护并在释放后即刻造影确认。',
        by: '赵敏行',
        at: nowMinus(4),
        flags: ['coronary-left', 'under-expansion'],
        nominalMm: 29,
      },
      audit: [
        ...base(
          'x',
          'x',
          'x',
          '男',
          0,
          '',
          '',
          '',
          '待审核',
          '常规',
          '',
          0,
        ).audit,
        makeAudit('赵敏行', 'physician', '导入影像', 'PHANTOM-B / 二叶式 重度钙化 低冠脉', nowMinus(24)),
        makeAudit('赵敏行', 'physician', '完成瓣环与 LVOT 测量', '瓣环 7 层轮廓,LVOT 1 层,冠脉开口已标记', nowMinus(8)),
        makeAudit('赵敏行', 'physician', '填写偏离理由', '29 mm · 冠脉净距不足、瓣架膨胀不全', nowMinus(4)),
        makeAudit('赵敏行', 'physician', '提交审核', '测量、型号与虚拟释放结果已提交主任审核', nowMinus(3)),
      ],
    },
  );

  const c3 = seeded(
    base(
      'case-2603',
      'TAVR-2026-0168',
      '马鸿远',
      '男',
      72,
      'MRN-883774',
      'op-wu',
      'phantom-tricuspid-a',
      '已通过',
      '常规',
      '老年退行性主动脉瓣狭窄,外科高风险。',
      74,
    ),
    seedA,
    '已通过',
    {
      submittedAt: nowMinus(30),
      submissionCount: 1,
      review: {
        reviewer: '陈嘉禾',
        at: nowMinus(27),
        decision: '通过',
        comment: '测量规范,瓣环周长与面积一致性好;26 mm 型号合理,同意按计划行 TAVR。',
        reasonCodes: [],
        finalNominalMm: 26,
      },
      report: {
        at: nowMinus(26),
        by: '陈嘉禾',
        summary: '瓣环周长 80.9 mm,面积 475 mm²,周长派生径 25.7 mm;型号 26 mm。',
      },
      audit: [
        makeAudit('吴蔚', 'physician', '导入影像', 'PHANTOM-A / 三叶瓣 中重度钙化', nowMinus(70)),
        makeAudit('吴蔚', 'physician', '完成瓣环测量', '瓣环 7 层轮廓,LVOT 1 层', nowMinus(31)),
        makeAudit('吴蔚', 'physician', '提交审核', '26 mm,过度扩张 +1.0%', nowMinus(30)),
        makeAudit('陈嘉禾', 'director', '审核通过', '测量规范,同意 26 mm', nowMinus(27)),
        makeAudit('陈嘉禾', 'director', '生成术前讨论单', '含三维截图与测量摘要', nowMinus(26)),
      ],
    },
  );

  const c4 = seeded(
    base(
      'case-2604',
      'TAVR-2026-0170',
      '范书芹',
      '女',
      79,
      'MRN-883902',
      'op-li',
      'phantom-bicuspid-b',
      '需复核',
      '常规',
      '主动脉瓣重度狭窄合并中度钙化,瓣环测量待复核。',
      48,
    ),
    seedB,
    '需复核',
    {
      submittedAt: nowMinus(20),
      submissionCount: 1,
      returnCount: 1,
      review: {
        reviewer: '陈嘉禾',
        at: nowMinus(18),
        decision: '退回',
        comment: '瓣环轮廓只勾了 3 层,且未做 LVOT;请补充至 ≥5 层并重测 LVOT 后再提交。',
        reasonCodes: ['瓣环勾画偏差', '冠脉净距标注缺失'],
      },
      audit: [
        makeAudit('李承泽', 'physician', '导入影像', 'PHANTOM-B / 二叶式 重度钙化 低冠脉', nowMinus(44)),
        makeAudit('李承泽', 'physician', '完成瓣环测量', '瓣环 3 层轮廓', nowMinus(22)),
        makeAudit('李承泽', 'physician', '提交审核', '29 mm', nowMinus(20)),
        makeAudit('陈嘉禾', 'director', '退回重测', '瓣环勾画偏差、冠脉净距标注缺失', nowMinus(18)),
      ],
    },
  );

  return [c1, c2, c3, c4];
}

export function initialState(): AppState {
  return {
    role: 'physician',
    people: PEOPLE,
    cases: initialCases(),
    valves: DEFAULT_VALVES,
    conventions: { ...DEFAULT_CONVENTIONS, updatedAt: nowMinus(120), updatedBy: '周立群' },
    version: 1,
    lastSavedAt: 0,
  };
}

export function emptyMeasurementCase(
  orderNo: string,
  patient: CaseDoc['patient'],
  operatorId: string,
  volumeRef: string,
): CaseDoc {
  const at = Date.now();
  return {
    id: `case-${Math.random().toString(36).slice(2, 9)}`,
    orderNo,
    patient,
    operatorId,
    requester: PEOPLE.find((p) => p.id === operatorId)?.name ?? operatorId,
    createdAt: at,
    updatedAt: at,
    status: '待测量',
    priority: '常规',
    indication: '',
    notes: '',
    volumeRef,
    measurement: { contours: [], landmarks: [] },
    submissionCount: 0,
    returnCount: 0,
    audit: [makeAudit(PEOPLE.find((p) => p.id === operatorId)?.name ?? operatorId, 'physician', '新建申请单', `影像序列 ${volumeRef}`)],
  };
}

export type { VolumeMeta };
