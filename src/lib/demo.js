// 演示数据：合成皮肤镜图片（Canvas Blob），构造含标黄变化的完整随访链路
import * as db from './db.js';
import { getState } from './store.svelte.js';
import { synthDermoscopyImage } from './utils.js';

const DAY = 86400000;

export async function createDemoData() {
  const s = getState();
  const now = Date.now();
  const physician = '张医生';

  const patient = {
    id: db.uid('pat_'),
    name: '示例患者·王某某',
    gender: '女',
    birthYear: 1986,
    medicalNo: 'DEMO-0001',
    note: '系统内置演示数据，含直径增大、边缘变不规则及新发痣三类标黄场景。',
    createdAt: now - 180 * DAY,
    createdBy: physician
  };
  await db.put('patients', patient);
  s.patients.unshift(patient);

  const baseline = {
    id: db.uid('vis_'),
    patientId: patient.id,
    type: 'baseline',
    visitDate: now - 180 * DAY,
    createdAt: now - 180 * DAY,
    createdBy: physician
  };
  const followup = {
    id: db.uid('vis_'),
    patientId: patient.id,
    type: 'followup',
    visitDate: now - 7 * DAY,
    createdAt: now - 7 * DAY,
    createdBy: physician
  };
  await db.putBulk('visits', [baseline, followup]);
  s.visits.push(baseline, followup);

  // [分区, 部件, u, v, side, 基线直径, 复诊直径, 基线边缘, 复诊边缘, 网络, 复诊变化类型]
  const spec = [
    ['BK', 'torso', 0.38, 0.72, 'back', 3.2, 4.6, '规则', '规则', '网状', 'grow'],
    ['BK', 'torso', 0.62, 0.55, 'back', 2.8, 3.0, '规则', '明显不规则', '非典型网状', 'edge'],
    ['UA', 'upperArmL', 0.30, 0.55, 'front', 2.1, 2.2, '规则', '规则', '均匀网状', 'stable'],
    ['TH', 'thighR', 0.55, 0.45, 'front', 4.0, 4.1, '轻度不规则', '轻度不规则', '球状', 'stable'],
    ['FA', 'forearmL', 0.42, 0.30, 'back', 1.6, 1.7, '规则', '规则', '均质状', 'stable']
  ];

  for (const [zoneId, partId, u, v, side, d0, d1, e0, e1, net, kind] of spec) {
    const zone = s.zones.find((z) => z.id === zoneId);
    const seq = await db.nextZoneSeq(zoneId);
    const lat = partId.endsWith('L') ? 'L' : partId.endsWith('R') ? 'R' : '';
    const code = zone.code + (lat ? '-' + lat + '-' : '-') + String(seq).padStart(3, '0');
    const mole = {
      id: db.uid('mol_'),
      patientId: patient.id,
      code,
      zoneId,
      partId,
      laterality: lat,
      u, v, side,
      removed: false,
      createdAt: baseline.visitDate,
      createdBy: physician
    };
    await db.put('moles', mole);
    s.moles.push(mole);

    const bBlob = await synthDermoscopyImage(code + 'b', d0, e0, net);
    const baseFinding = {
      id: db.uid('fin_'),
      visitId: baseline.id,
      moleId: mole.id,
      diameterMm: d0,
      edgeType: e0,
      networkType: net,
      angleId: 'AN05',
      note: '基线皮肤镜记录',
      photoBlob: bBlob,
      photoName: `baseline_${code}.png`,
      capturedAt: baseline.visitDate,
      capturedBy: physician
    };
    await db.put('findings', baseFinding);
    s.findings.push(baseFinding);

    if (kind !== 'new') {
      const cBlob = await synthDermoscopyImage(code + 'c', d1, e1, kind === 'edge' ? '非典型网状' : net);
      const cur = {
        id: db.uid('fin_'),
        visitId: followup.id,
        moleId: mole.id,
        diameterMm: d1,
        edgeType: e1,
        networkType: kind === 'edge' ? '非典型网状' : net,
        angleId: 'AN05',
        note: kind === 'grow' ? '随访增大' : kind === 'edge' ? '边缘形态改变' : '随访稳定',
        photoBlob: cBlob,
        photoName: `followup_${code}.png`,
        capturedAt: followup.visitDate,
        capturedBy: physician
      };
      await db.put('findings', cur);
      s.findings.push(cur);
    }
  }

  // 新发痣：仅复诊存在
  const zone = s.zones.find((z) => z.id === 'AB');
  const seq = await db.nextZoneSeq('AB');
  const newMole = {
    id: db.uid('mol_'),
    patientId: patient.id,
    code: `${zone.code}-${String(seq).padStart(3, '0')}`,
    zoneId: 'AB',
    partId: 'torso',
    laterality: '',
    u: 0.55, v: 0.32, side: 'front',
    removed: false,
    createdAt: followup.visitDate,
    createdBy: physician
  };
  await db.put('moles', newMole);
  s.moles.push(newMole);
  const nBlob = await synthDermoscopyImage(newMole.code + 'n', 1.9, '规则', '无结构');
  const nf = {
    id: db.uid('fin_'),
    visitId: followup.id,
    moleId: newMole.id,
    diameterMm: 1.9,
    edgeType: '规则',
    networkType: '无结构',
    angleId: 'AN03',
    note: '复诊新发现，基线无此痣',
    photoBlob: nBlob,
    photoName: `new_${newMole.code}.png`,
    capturedAt: followup.visitDate,
    capturedBy: physician
  };
  await db.put('findings', nf);
  s.findings.push(nf);

  // 已提交待判读的随访任务
  const task = {
    id: db.uid('tsk_'),
    patientId: patient.id,
    baselineVisitId: baseline.id,
    visitId: followup.id,
    status: 'pending_read',
    dueDate: now - 5 * DAY,
    createdAt: now - 180 * DAY,
    createdBy: physician,
    submittedAt: now - 7 * DAY,
    lastStatusAt: now - 7 * DAY,
    lastStatusBy: '王技师'
  };
  await db.put('tasks', task);
  s.tasks.unshift(task);

  const log = {
    id: db.uid('log_'),
    ts: now,
    operator: '系统',
    role: 'tech',
    action: '生成演示数据',
    target: patient.id,
    detail: '含 6 颗痣（3 颗将标黄）与待判读随访任务'
  };
  await db.put('logs', log);
  s.logs.unshift(log);

  return { patient, task };
}
