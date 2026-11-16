import type { Batch, Database, DefectType, Program, Shift } from '../types';
import { DEFECT_ORDER } from './defects';
import { countAnnotations, emptyCounts } from './verdict';

export interface ProgramStats {
  programId: string;
  code: string;
  name: string;
  machineId: string;
  line: string;
  batches: number;
  boards: number;
  reviewedBoards: number;
  machineCalls: number;
  missedDefects: number;
  activeAnnotations: number;
  falseCalls: number;
  falseRate: number;
  reworkBoards: number;
  reworkRate: number;
  appeals: number;
  openAppeals: number;
  rejectedBatches: number;
  alert: boolean;
  alertThreshold: number;
  detail: Record<DefectType, number>;
}

function statsFor(db: Database, p: Program, shift?: Shift): ProgramStats {
  const batches = db.batches.filter((b) => b.programId === p.id && (!shift || b.shift === shift));
  const detail = emptyCounts();
  let boards = 0;
  let reviewedBoards = 0;
  let machineCalls = 0;
  let missedDefects = 0;
  let reworkBoards = 0;
  let rejectedBatches = 0;
  for (const batch of batches) {
    if (batch.returns.length > 0) rejectedBatches += 1;
    for (const board of batch.boards) {
      boards += 1;
      const version = board.versions.find((v) => v.id === board.activeVersionId);
      const active = version?.annotations.filter((a) => a.status === 'active') ?? [];
      machineCalls += version?.defects.filter((d) => d.machineJudged).length ?? 0;
      missedDefects += active.filter((a) => {
        const d = version?.defects.find((x) => x.id === a.defectId);
        return d ? !d.machineJudged : false;
      }).length;
      const counts = countAnnotations(active);
      for (const t of DEFECT_ORDER) detail[t] += counts[t];
      if (board.reviewStatus === 'reviewed') {
        reviewedBoards += 1;
        if (board.verdict?.verdict === 'rework') reworkBoards += 1;
      }
    }
  }
  const activeAnnotations = DEFECT_ORDER.reduce((acc, t) => acc + detail[t], 0);
  const falseCalls = detail.false_call;
  const falseRate = machineCalls > 0 ? falseCalls / machineCalls : 0;
  const reworkRate = reviewedBoards > 0 ? reworkBoards / reviewedBoards : 0;
  const appeals = db.appeals.filter((a) => a.programId === p.id);
  return {
    programId: p.id,
    code: p.code,
    name: p.name,
    machineId: p.machineId,
    line: p.line,
    batches: batches.length,
    boards,
    reviewedBoards,
    machineCalls,
    missedDefects,
    activeAnnotations,
    falseCalls,
    falseRate,
    reworkBoards,
    reworkRate,
    appeals: appeals.length,
    openAppeals: appeals.filter((a) => a.status === 'open').length,
    rejectedBatches,
    alert: machineCalls > 0 && falseRate * 100 >= p.alertThreshold,
    alertThreshold: p.alertThreshold,
    detail,
  };
}

export function programStats(db: Database, shift?: Shift): ProgramStats[] {
  return db.programs.map((p) => statsFor(db, p, shift));
}

export interface ShiftStats {
  shift: Shift;
  batches: number;
  boards: number;
  machineCalls: number;
  falseCalls: number;
  falseRate: number;
  reworkBoards: number;
  reviewedBoards: number;
  reworkRate: number;
  appeals: number;
  detail: Record<DefectType, number>;
  perProgram: { programId: string; code: string; falseRate: number; reworkRate: number }[];
}

export function shiftStats(db: Database): ShiftStats[] {
  return (['白班', '夜班'] as Shift[]).map((shift) => {
    const detail = emptyCounts();
    let boards = 0;
    let machineCalls = 0;
    let reviewed = 0;
    let rework = 0;
    const batches = db.batches.filter((b) => b.shift === shift);
    const per = new Map<string, { calls: number; fc: number; rev: number; rw: number }>();
    for (const b of batches) {
      const acc = per.get(b.programId) ?? { calls: 0, fc: 0, rev: 0, rw: 0 };
      for (const board of b.boards) {
        const version = board.versions.find((v) => v.id === board.activeVersionId);
        const counts = countAnnotations(version?.annotations ?? []);
        for (const t of DEFECT_ORDER) detail[t] += counts[t];
        const calls = version?.defects.filter((d) => d.machineJudged).length ?? 0;
        machineCalls += calls;
        acc.calls += calls;
        acc.fc += counts.false_call;
        boards += 1;
        if (board.reviewStatus === 'reviewed') {
          reviewed += 1;
          acc.rev += 1;
          if (board.verdict?.verdict === 'rework') {
            rework += 1;
            acc.rw += 1;
          }
        }
      }
      per.set(b.programId, acc);
    }
    const appeals = db.appeals.filter((a) => a.shift === shift);
    return {
      shift,
      batches: batches.length,
      boards,
      machineCalls,
      falseCalls: detail.false_call,
      falseRate: machineCalls ? detail.false_call / machineCalls : 0,
      reworkBoards: rework,
      reviewedBoards: reviewed,
      reworkRate: reviewed ? rework / reviewed : 0,
      appeals: appeals.length,
      detail,
      perProgram: [...per.entries()].map(([programId, v]) => ({
        programId,
        code: db.programs.find((p) => p.id === programId)?.code ?? programId,
        falseRate: v.calls ? v.fc / v.calls : 0,
        reworkRate: v.rev ? v.rw / v.rev : 0,
      })),
    };
  });
}

export interface BatchStats {
  total: number;
  reviewed: number;
  rework: number;
  pass: number;
  pending: number;
  defectCount: number;
  falseCallCount: number;
  falseRate: number;
  machineCalls: number;
  missedDefects: number;
  detail: Record<DefectType, number>;
}

export function batchStats(batch: Batch): BatchStats {
  const detail = emptyCounts();
  let reviewed = 0;
  let rework = 0;
  let pass = 0;
  let pending = 0;
  let machineCalls = 0;
  let missedDefects = 0;
  for (const board of batch.boards) {
    const version = board.versions.find((v) => v.id === board.activeVersionId);
    machineCalls += version?.defects.filter((d) => d.machineJudged).length ?? 0;
    const actives = version?.annotations.filter((a) => a.status === 'active') ?? [];
    missedDefects += actives.filter((a) => {
      const d = version?.defects.find((x) => x.id === a.defectId);
      return d ? !d.machineJudged : false;
    }).length;
    const counts = countAnnotations(actives);
    for (const t of DEFECT_ORDER) detail[t] += counts[t];
    if (board.reviewStatus === 'reviewed') {
      reviewed += 1;
      if (board.verdict?.verdict === 'rework') rework += 1;
      else pass += 1;
    } else {
      pending += 1;
    }
  }
  const defectCount = DEFECT_ORDER.filter((t) => t !== 'false_call').reduce(
    (a, t) => a + detail[t],
    0,
  );
  return {
    total: batch.boards.length,
    reviewed,
    rework,
    pass,
    pending,
    defectCount,
    falseCallCount: detail.false_call,
    falseRate: machineCalls ? detail.false_call / machineCalls : 0,
    machineCalls,
    missedDefects,
    detail,
  };
}

export function programOf(db: Database, id: string): Program | undefined {
  return db.programs.find((p) => p.id === id);
}

export function alertPrograms(db: Database): ProgramStats[] {
  return programStats(db).filter((p) => p.alert);
}
