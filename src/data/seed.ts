import type {
  Annotation,
  AuditEntry,
  Batch,
  Board,
  Database,
  DefectRecord,
  DefectType,
  ImageVersion,
  MachineDefectType,
  Program,
  Shift,
  User,
} from '../types';
import { layoutBoard, type CompSpec } from '../lib/boardImage';
import { hashString, mulberry32, pick, randInt } from '../lib/prng';
import { evaluateVerdict } from '../lib/verdict';

export const USERS: User[] = [
  { id: 'U-1024', name: '张岚', role: 'rechecker', code: 'OP-1024' },
  { id: 'U-1031', name: '陈昊', role: 'rechecker', code: 'OP-1031' },
  { id: 'U-1090', name: '林静', role: 'supervisor', code: 'QA-1090' },
  { id: 'U-1120', name: '周扬', role: 'engineer', code: 'PE-1120' },
];

export const PROGRAMS: Program[] = [
  {
    id: 'PRG-A1',
    code: 'AOI-SMT-A1',
    name: 'SMT-A 主程序 Rev7',
    machineId: 'AOI-01',
    line: 'SMT-1',
    alertThreshold: 15,
  },
  {
    id: 'PRG-A2',
    code: 'AOI-SMT-A2',
    name: 'SMT-A 副板程序 Rev4',
    machineId: 'AOI-02',
    line: 'SMT-1',
    alertThreshold: 15,
  },
  {
    id: 'PRG-B1',
    code: 'AOI-SMT-B1',
    name: 'SMT-B 主程序 Rev12',
    machineId: 'AOI-03',
    line: 'SMT-2',
    alertThreshold: 18,
  },
  {
    id: 'PRG-D1',
    code: 'AOI-DIP-01',
    name: 'DIP 波峰焊程序 Rev3',
    machineId: 'AOI-04',
    line: 'DIP-1',
    alertThreshold: 12,
  },
  {
    id: 'PRG-F1',
    code: 'AOI-FPC-02',
    name: 'FPC 软板程序 Rev2',
    machineId: 'AOI-05',
    line: 'FLEX-1',
    alertThreshold: 10,
  },
];

export const PRODUCTS: Record<string, string> = {
  'PRG-A1': 'PH-820 主板',
  'PRG-A2': 'PH-820 副板',
  'PRG-B1': 'PB-450 控制板',
  'PRG-D1': 'PD-310 电源板',
  'PRG-F1': 'PF-77 显示软板',
};

export const DEFAULT_THRESHOLDS = {
  insufficient_solder: 2,
  cold_joint: 1,
  offset: 2,
  bridging: 2,
  sampleRatio: 0.05,
};

export function isoAgo(hours: number): string {
  return new Date(Date.now() - hours * 3600_000).toISOString();
}

export function rectForDefect(
  comp: CompSpec,
  padIdx: number | null,
  type: MachineDefectType,
): { x: number; y: number; w: number; h: number } {
  if (type === 'offset' || padIdx === null) {
    return { x: comp.x - 14, y: comp.y - 14, w: comp.w + 28, h: comp.h + 28 };
  }
  const pad = comp.pads[padIdx];
  const inflate = type === 'bridging' ? 24 : 17;
  return { x: pad.x - inflate, y: pad.y - inflate, w: pad.w + inflate * 2, h: pad.h + inflate * 2 };
}

const TRUE_TYPES: MachineDefectType[] = [
  'insufficient_solder',
  'cold_joint',
  'offset',
  'bridging',
];

interface DefectGenOptions {
  seed: number;
  layoutSeed: number;
  falseCallBias: number;
  missBias: number;
  count: number;
  idPrefix: string;
}

/** 生成图像上的焊点记录：机器报出的可疑焊点 + 机器漏检的真实缺陷 */
export function generateDefectRecords(opts: DefectGenOptions): DefectRecord[] {
  const rng = mulberry32(opts.seed);
  const layout = layoutBoard(opts.layoutSeed);
  const usable = layout.components
    .map((c, i) => ({ c, i }))
    .filter(({ c }) => c.kind !== 'tht' && c.pads.length > 1);
  const out: DefectRecord[] = [];
  const used = new Set<string>();

  const place = (machineJudged: boolean, idx: number): boolean => {
    const target = pick(rng, usable);
    const comp = target.c;
    if (!comp) return false;
    const isOffset = rng() < 0.16;
    const padIdx = isOffset ? null : Math.floor(rng() * comp.pads.length);
    const key = `${target.i}:${padIdx ?? 'body'}`;
    if (used.has(key)) return false;
    used.add(key);
    const type: MachineDefectType = isOffset
      ? 'offset'
      : padIdx !== null && padIdx % 2 === 0 && rng() < 0.2
        ? 'bridging'
        : pick(rng, TRUE_TYPES);
    const subtle = !machineJudged && rng() < 0.5;
    const isFalse = machineJudged && rng() < opts.falseCallBias;
    const rel = rectForDefect(comp, padIdx, type);
    out.push({
      id: `${opts.idPrefix}-${idx}`,
      machineJudged,
      machineType: machineJudged ? type : null,
      actual: isFalse ? null : type,
      confidence: machineJudged ? Math.round(54 + rng() * 45) : 0,
      componentRef: comp.ref,
      compIdx: target.i,
      padIdx,
      subtle,
      x: rel.x,
      y: rel.y,
      w: rel.w,
      h: rel.h,
    });
    return true;
  };

  let n = 0;
  for (let k = 0; k < opts.count; k++) {
    if (place(true, n)) n += 1;
  }
  if (opts.missBias > 0 && rng() < opts.missBias) {
    place(false, n);
  }
  return out;
}

interface BatchSpec {
  code: string;
  programId: string;
  shift: Shift;
  status: Batch['status'];
  boards: number;
  ageHours: number;
  reviewedRatio: number;
  sampling: number;
  returned?: boolean;
  rescanBoards?: number;
  calls: number;
}

const SPECS: BatchSpec[] = [
  { code: 'B-2611-118', programId: 'PRG-A1', shift: '白班', status: 'pending', boards: 12, ageHours: 0.7, reviewedRatio: 0, sampling: 0, calls: 3 },
  { code: 'B-2611-117', programId: 'PRG-F1', shift: '白班', status: 'pending', boards: 9, ageHours: 2.4, reviewedRatio: 0, sampling: 0, calls: 5 },
  { code: 'B-2611-116', programId: 'PRG-F1', shift: '夜班', status: 'reviewing', boards: 8, ageHours: 8.5, reviewedRatio: 0.625, sampling: 0, rescanBoards: 1, calls: 5 },
  { code: 'B-2611-115', programId: 'PRG-B1', shift: '夜班', status: 'reviewing', boards: 10, ageHours: 10.2, reviewedRatio: 0.4, sampling: 0, calls: 4 },
  { code: 'B-2611-114', programId: 'PRG-A1', shift: '白班', status: 'awaiting_release', boards: 10, ageHours: 26, reviewedRatio: 1, sampling: 0, rescanBoards: 1, calls: 3 },
  { code: 'B-2611-113', programId: 'PRG-D1', shift: '夜班', status: 'awaiting_release', boards: 8, ageHours: 28.5, reviewedRatio: 1, sampling: 1, calls: 3 },
  { code: 'B-2611-112', programId: 'PRG-A2', shift: '夜班', status: 'released', boards: 9, ageHours: 34, reviewedRatio: 1, sampling: 1, calls: 3 },
  { code: 'B-2611-111', programId: 'PRG-A1', shift: '白班', status: 'released', boards: 10, ageHours: 40, reviewedRatio: 1, sampling: 1, returned: true, calls: 3 },
  { code: 'B-2611-110', programId: 'PRG-B1', shift: '白班', status: 'released', boards: 9, ageHours: 47, reviewedRatio: 1, sampling: 2, calls: 4 },
  { code: 'B-2611-109', programId: 'PRG-F1', shift: '夜班', status: 'released', boards: 8, ageHours: 53, reviewedRatio: 1, sampling: 1, calls: 5 },
  { code: 'B-2611-108', programId: 'PRG-D1', shift: '白班', status: 'released', boards: 8, ageHours: 61, reviewedRatio: 1, sampling: 1, calls: 3 },
  { code: 'B-2611-107', programId: 'PRG-A2', shift: '夜班', status: 'released', boards: 10, ageHours: 68, reviewedRatio: 1, sampling: 2, calls: 3 },
];

const FALSE_CALL_BIAS: Record<string, number> = {
  'PRG-A1': 0.08,
  'PRG-A2': 0.13,
  'PRG-B1': 0.21,
  'PRG-D1': 0.1,
  'PRG-F1': 0.28,
};

const MISS_BIAS: Record<string, number> = {
  'PRG-A1': 0.1,
  'PRG-A2': 0.16,
  'PRG-B1': 0.2,
  'PRG-D1': 0.12,
  'PRG-F1': 0.24,
};

interface BoardBuild {
  board: Board;
}

function boardReviewerFor(shift: Shift): User {
  return shift === '白班' ? USERS[0] : USERS[1];
}

function buildBoard(
  batchCode: string,
  spec: BatchSpec,
  boardNo: string,
  reviewed: boolean,
  rescan: boolean,
  reviewer: User,
): BoardBuild {
  const boardId = `${batchCode}-${boardNo}`;
  const seed = hashString(boardId);
  const layoutSeed = hashString(`${batchCode}-layout`);
  const rng = mulberry32(seed);
  const callCount = randInt(rng, Math.max(0, spec.calls - 2), spec.calls);
  const defects = generateDefectRecords({
    seed,
    layoutSeed,
    falseCallBias: FALSE_CALL_BIAS[spec.programId] ?? 0.12,
    missBias: MISS_BIAS[spec.programId] ?? 0.1,
    count: callCount,
    idPrefix: `${boardNo}C`,
  });

  const v1: ImageVersion = {
    id: `${boardId}-V1`,
    seq: 1,
    label: '首检图像 V1',
    kind: 'import',
    createdAt: isoAgo(spec.ageHours + 0.9),
    createdBy: 'AOI 检测机',
    layoutSeed,
    renderSeed: seed,
    exposure: ((seed % 5) - 2) * 0.02,
    width: 2000,
    height: 1400,
    defects,
    annotations: [],
  };

  const versions: ImageVersion[] = [v1];

  const makeAnnotations = (version: ImageVersion, srcDefects: DefectRecord[]): Annotation[] => {
    const list: Annotation[] = [];
    for (const d of srcDefects) {
      const r = mulberry32(hashString(d.id) + seed);
      if (d.machineJudged) {
        if (d.actual === null) {
          list.push({
            id: `${version.id}-A${list.length + 1}`,
            versionId: version.id,
            boardId,
            batchId: '',
            type: 'false_call',
            note: '焊点成形正常，润湿良好，判为程序误报',
            defectId: d.id,
            status: 'active',
            createdAt: isoAgo(spec.ageHours - 0.2),
            createdBy: reviewer.name,
            x: d.x,
            y: d.y,
            w: d.w,
            h: d.h,
          });
        } else {
          const drift = r() < 0.07;
          list.push({
            id: `${version.id}-A${list.length + 1}`,
            versionId: version.id,
            boardId,
            batchId: '',
            type: drift ? pick(r, TRUE_TYPES) : d.actual,
            note: drift ? '与程序判定类型不一致，按实际形貌记录' : '',
            defectId: d.id,
            status: 'active',
            createdAt: isoAgo(spec.ageHours - 0.2),
            createdBy: reviewer.name,
            x: d.x,
            y: d.y,
            w: d.w,
            h: d.h,
          });
        }
      } else if (r() < 0.82) {
        list.push({
          id: `${version.id}-A${list.length + 1}`,
          versionId: version.id,
          boardId,
          batchId: '',
          type: d.actual!,
          note: '检测机未报出，人工复核发现并标注',
          defectId: d.id,
          status: 'active',
          createdAt: isoAgo(spec.ageHours - 0.2),
          createdBy: reviewer.name,
          x: d.x,
          y: d.y,
          w: d.w,
          h: d.h,
        });
      }
    }
    return list;
  };

  if (reviewed) {
    v1.annotations = makeAnnotations(v1, defects);
  }

  let activeVersion = v1;

  if (rescan) {
    const v2Defects = defects.map((d, i) => ({ ...d, id: `${d.id}-R${i}` }));
    const v2: ImageVersion = {
      id: `${boardId}-V2`,
      seq: 2,
      label: '重扫图像 V2',
      kind: 'rescan',
      createdAt: isoAgo(spec.ageHours - 0.5),
      createdBy: reviewer.name,
      layoutSeed,
      renderSeed: seed + 999,
      exposure: ((seed + 3) % 5) * 0.014 - 0.028,
      width: 2000,
      height: 1400,
      defects: v2Defects,
      annotations: [],
    };
    if (reviewed) {
      v1.annotations = v1.annotations.map((a) => ({
        ...a,
        status: 'void' as const,
        voidedAt: v2.createdAt,
        voidedBy: reviewer.name,
        voidReason: '换用重扫图像 V2，旧版标注随图像版本作废',
      }));
      v2.annotations = makeAnnotations(v2, v2Defects).map((a, i) => ({
        ...a,
        id: `${v2.id}-A${i + 1}`,
        versionId: v2.id,
        createdAt: isoAgo(spec.ageHours - 0.4),
      }));
    }
    versions.push(v2);
    activeVersion = v2;
  }

  const board: Board = {
    id: boardId,
    batchId: '',
    boardNo,
    activeVersionId: activeVersion.id,
    versions,
    reviewStatus: reviewed ? 'reviewed' : 'pending',
    submitTimes: reviewed ? 1 : 0,
    reviewedBy: reviewed ? reviewer.name : undefined,
    reviewedAt: reviewed ? isoAgo(spec.ageHours - 0.3) : undefined,
  };

  if (reviewed) {
    const res = evaluateVerdict(activeVersion.annotations, DEFAULT_THRESHOLDS);
    board.verdict = {
      verdict: res.verdict,
      counts: res.counts,
      reasons: res.reasons,
      at: isoAgo(spec.ageHours - 0.3),
      by: reviewer.name,
    };
  }
  return { board };
}

export function createSeedDatabase(): Database {
  const batches: Batch[] = [];
  const audit: AuditEntry[] = [];

  SPECS.forEach((spec, bi) => {
    const program = PROGRAMS.find((p) => p.id === spec.programId)!;
    const reviewer = boardReviewerFor(spec.shift);
    const boardCount = spec.boards;
    const reviewedCount = Math.round(boardCount * spec.reviewedRatio);
    const importedAt = isoAgo(spec.ageHours + 1.2);
    const batchId = `BAT-${spec.code}`;
    const boards: Board[] = [];

    const rescanIdx = new Set<number>();
    if (spec.rescanBoards) {
      for (let i = 0; i < spec.rescanBoards; i++) rescanIdx.add((i * 4 + 2) % boardCount);
    }

    for (let i = 0; i < boardCount; i++) {
      const boardNo = String(i + 1).padStart(2, '0');
      const { board } = buildBoard(
        spec.code,
        spec,
        boardNo,
        i < reviewedCount,
        rescanIdx.has(i),
        reviewer,
      );
      board.batchId = batchId;
      board.versions.forEach((v) => v.annotations.forEach((a) => (a.batchId = batchId)));
      boards.push(board);
    }

    const sampling: Batch['sampling'] = [];
    if (spec.status === 'awaiting_release' || spec.status === 'released') {
      for (let s = 0; s < spec.sampling; s++) {
        const target = boards[(s * 3 + 1) % boards.length];
        sampling.push({
          boardId: target.id,
          by: '林静',
          at: isoAgo(spec.ageHours - 1.6 + s * 0.15),
          viewedAt: spec.status === 'released' ? isoAgo(spec.ageHours - 1.55 + s * 0.15) : undefined,
          note: s === 0 ? '核对焊点成形与标注一致性' : '核对复判结论与图像版本',
        });
      }
    }

    const returns: Batch['returns'] = [];
    if (spec.returned) {
      returns.push({
        id: `RET-${spec.code}-1`,
        by: '林静',
        at: isoAgo(spec.ageHours - 2.6),
        category: '漏判申诉成立',
        reason:
          '客户反馈 R37 焊点虚焊漏判，复核确认复判记录未覆盖该位置；整批退回重做，要求补标并核对同程式其他板。',
      });
    }

    const finalReviewerName = reviewer.name;
    const batch: Batch = {
      id: batchId,
      code: spec.code,
      product: PRODUCTS[spec.programId],
      programId: spec.programId,
      machineId: program.machineId,
      line: program.line,
      shift: spec.shift,
      importedAt,
      importedBy: 'AOI 检测机',
      status: spec.status,
      boards,
      sampling,
      returns,
      submittedAt:
        spec.status === 'awaiting_release' || spec.status === 'released'
          ? isoAgo(spec.ageHours - 1.7)
          : undefined,
      submittedBy:
        spec.status === 'awaiting_release' || spec.status === 'released'
          ? finalReviewerName
          : undefined,
      notes: spec.status === 'pending' ? '检测机自动上传，等待分配复判' : undefined,
    };

    if (spec.status === 'released') {
      batch.released = {
        by: '林静',
        at: isoAgo(spec.ageHours - 2.0),
        note: '抽检通过，缺陷分布与历史一致，准予放行。',
        coveragePct: (sampling.length / boardCount) * 100,
        sampledBoardIds: sampling.map((s) => s.boardId),
      };
    }

    batches.push(batch);

    audit.push({
      id: `AU-${bi}-1`,
      at: importedAt,
      actorId: 'AOI 检测机',
      action: '批次导入',
      detail: `${spec.code} 导入 ${boardCount} 块板 · 检测程式 ${program.code} · ${spec.shift}`,
      batchId,
    });
    if (spec.status === 'reviewing') {
      audit.push({
        id: `AU-${bi}-1b`,
        at: isoAgo(spec.ageHours - 0.1),
        actorId: reviewer.id,
        action: '开始复判',
        detail: `${spec.code} 由 ${reviewer.name} 接单复判`,
        batchId,
      });
    }
    if (spec.status === 'awaiting_release' || spec.status === 'released') {
      audit.push({
        id: `AU-${bi}-2`,
        at: batch.submittedAt!,
        actorId: reviewer.id,
        action: '提交复判',
        detail: `${spec.code} 全批 ${boardCount} 块板复判完成，提交放行审批`,
        batchId,
      });
    }
    if (spec.returned) {
      audit.push({
        id: `AU-${bi}-3`,
        at: isoAgo(spec.ageHours - 2.6),
        actorId: 'U-1090',
        action: '批次退回',
        detail: `${spec.code} 退回 · 分类「漏判申诉成立」，退回人 林静`,
        batchId,
      });
    }
    if (batch.released) {
      audit.push({
        id: `AU-${bi}-4`,
        at: batch.released.at,
        actorId: 'U-1090',
        action: '批次放行',
        detail: `${spec.code} 放行 · 抽检 ${batch.released.sampledBoardIds.length}/${boardCount} 块（${batch.released.coveragePct.toFixed(1)}%）`,
        batchId,
      });
    }
    const firstRescan = [...rescanIdx][0];
    if (firstRescan !== undefined) {
      const b = boards[firstRescan];
      if (b && b.versions.length > 1) {
        audit.push({
          id: `AU-${bi}-5`,
          at: b.versions[1].createdAt,
          actorId: reviewer.id,
          action: '换图作废旧标注',
          detail: `${b.boardNo} 号板切换 ${b.versions[1].label}，V1 标注全部作废并留痕`,
          batchId,
          boardId: b.id,
          versionId: b.versions[1].id,
        });
      }
    }
  });

  const appeals: Database['appeals'] = [
    {
      id: 'AP-0041',
      batchId: 'BAT-B-2611-111',
      boardId: 'B-2611-111-07',
      programId: 'PRG-A1',
      shift: '白班',
      raisedAt: isoAgo(6),
      source: '客户',
      type: 'cold_joint',
      note: '客户产线反馈 R37 焊点虚焊失效，复判记录未覆盖。',
      status: 'open',
    },
    {
      id: 'AP-0040',
      batchId: 'BAT-B-2611-109',
      programId: 'PRG-F1',
      shift: '夜班',
      raisedAt: isoAgo(19),
      source: '下游工站',
      type: 'offset',
      note: '贴装后 U2 偏移超差，复判判为可接受。',
      status: 'open',
    },
    {
      id: 'AP-0039',
      batchId: 'BAT-B-2611-107',
      programId: 'PRG-A2',
      shift: '夜班',
      raisedAt: isoAgo(30),
      source: 'OQA',
      type: 'insufficient_solder',
      note: 'OQA 抽检发现少锡漏判 2 处。',
      status: 'closed',
    },
    {
      id: 'AP-0038',
      batchId: 'BAT-B-2611-112',
      programId: 'PRG-A2',
      shift: '夜班',
      raisedAt: isoAgo(44),
      source: '客户',
      type: 'bridging',
      note: '客户功能测试短路，追溯为 J1 连锡漏判。',
      status: 'closed',
    },
    {
      id: 'AP-0037',
      batchId: 'BAT-B-2611-110',
      programId: 'PRG-B1',
      shift: '白班',
      raisedAt: isoAgo(52),
      source: '下游工站',
      type: 'cold_joint',
      note: '下游工站反馈虚焊返修比例偏高。',
      status: 'closed',
    },
    {
      id: 'AP-0036',
      batchId: 'BAT-B-2611-108',
      programId: 'PRG-D1',
      shift: '白班',
      raisedAt: isoAgo(70),
      source: 'OQA',
      type: 'insufficient_solder',
      note: 'OQA 复核发现少锡判定偏松。',
      status: 'closed',
    },
    {
      id: 'AP-0035',
      batchId: 'BAT-B-2611-109',
      programId: 'PRG-F1',
      shift: '夜班',
      raisedAt: isoAgo(75),
      source: '客户',
      type: 'bridging',
      note: '软板 FPC 连锡失效，客诉成立。',
      status: 'closed',
    },
    {
      id: 'AP-0034',
      batchId: 'BAT-B-2611-112',
      programId: 'PRG-A2',
      shift: '夜班',
      raisedAt: isoAgo(88),
      source: '下游工站',
      type: 'insufficient_solder',
      note: '下游工站反馈少锡漏判 1 处。',
      status: 'closed',
    },
  ];

  return {
    schema: 2,
    users: USERS,
    currentUserId: 'U-1024',
    programs: PROGRAMS,
    thresholds: { ...DEFAULT_THRESHOLDS },
    batches,
    appeals,
    audit,
  };
}
