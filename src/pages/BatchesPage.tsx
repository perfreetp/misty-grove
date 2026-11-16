import { useMemo, useState } from 'react';
import { Modal } from '../components/Modal';
import { useUI } from '../components/uiStore';
import { Field } from '../components/common';
import { IconPlus } from '../components/Icons';
import { navigate } from '../App';
import { useStore } from '../store/useStore';
import { alertPrograms, batchStats, programStats } from '../lib/stats';
import { STATUS_META, STATUS_FLOW } from '../lib/defects';
import { fmtDateTime, fmtPct } from '../lib/format';
import { Kpi, Meter, StatusChip } from '../components/common';
import { StackedBar, DefectLegend } from '../components/charts';
import {
  IconAlertTri,
  IconLayers,
  IconShield,
  IconTarget,
  IconWarn,
} from '../components/Icons';
import type { BatchStatus } from '../types';

type Tab = 'all' | BatchStatus;

export function BatchesPage() {
  const db = useStore((s) => s.db);
  const [tab, setTab] = useState<Tab>('all');
  const [q, setQ] = useState('');
  const [showImport, setShowImport] = useState(false);

  const rows = useMemo(() => {
    return db.batches
      .map((batch) => {
        const program = db.programs.find((p) => p.id === batch.programId)!;
        const stats = batchStats(batch);
        const progStat = programStats(db).find((p) => p.programId === batch.programId)!;
        return { batch, program, stats, progStat };
      })
      .filter((r) => (tab === 'all' ? true : r.batch.status === tab))
      .filter((r) =>
        q.trim()
          ? `${r.batch.code} ${r.batch.product} ${r.program.code} ${r.batch.line}`.includes(q.trim())
          : true,
      )
      .sort((a, b) => new Date(b.batch.importedAt).getTime() - new Date(a.batch.importedAt).getTime());
  }, [db, tab, q]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: db.batches.length };
    for (const s of STATUS_FLOW) c[s] = db.batches.filter((b) => b.status === s).length;
    return c;
  }, [db]);

  const totals = useMemo(() => {
    let boards = 0;
    let pendingBoards = 0;
    let rework = 0;
    let calls = 0;
    let fc = 0;
    for (const b of db.batches) {
      const s = batchStats(b);
      boards += s.total;
      pendingBoards += s.pending;
      rework += s.rework;
      calls += s.machineCalls;
      fc += s.falseCallCount;
    }
    return { boards, pendingBoards, rework, falseRate: calls ? fc / calls : 0 };
  }, [db]);

  const alerts = alertPrograms(db);

  return (
    <div className="page">
      <div className="page-pad">
        <div className="page-hd">
          <div className="grow">
            <h1>批次复判</h1>
            <div className="sub">
              检测机导入的缺陷记录批次队列 · 单板复判完成后汇总到批次，按缺陷类型阈值判定过站
            </div>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <span className="tag">
              <IconLayers size={11} /> 今日导入{' '}
              {db.batches.filter((b) => Date.now() - new Date(b.importedAt).getTime() < 86400000).length} 批
            </span>
            <button className="btn btn-primary" onClick={() => setShowImport(true)}>
              <IconPlus size={13} /> 导入检测批次
            </button>
          </div>
        </div>

        <div className="kpi-grid">
          <Kpi
            label="待放行批次"
            value={counts.awaiting_release ?? 0}
            sub="品质主管需抽检后放行"
            accent="var(--amber)"
            icon={<IconShield size={13} />}
            onClick={() => setTab('awaiting_release')}
          />
          <Kpi
            label="待复判板数"
            value={totals.pendingBoards}
            sub={`共 ${totals.boards} 块板在制`}
            accent="var(--blue)"
            icon={<IconTarget size={13} />}
          />
          <Kpi
            label="返修板合计"
            value={totals.rework}
            sub={`返修率 ${fmtPct(totals.boards ? totals.rework / totals.boards : 0)}`}
            accent="var(--red)"
            icon={<IconWarn size={13} />}
          />
          <Kpi
            label="整机误报率"
            value={fmtPct(totals.falseRate)}
            sub="机器判点中判为误报的占比"
            accent="var(--violet)"
            icon={<IconAlertTri size={13} />}
          />
        </div>

        {alerts.length > 0 && (
          <div className="warn-banner">
            <IconAlertTri size={15} style={{ flex: 'none', marginTop: 1 }} />
            <div>
              检测程式 <b>{alerts.map((a) => a.code).join('、')}</b> 误报率高于预警阈值（
              {alerts.map((a) => `${a.code} ${fmtPct(a.falseRate)} / 阈值 ${a.alertThreshold}%`).join('；')}
              ），列表中已标黄，需安排调机。
            </div>
          </div>
        )}

        <div className="card" style={{ overflow: 'hidden' }}>
          <div className="card-hd" style={{ gap: 12 }}>
            <div className="filters">
              <button className={`filter ${tab === 'all' ? 'on' : ''}`} onClick={() => setTab('all')}>
                全部 <span className="count">{counts.all}</span>
              </button>
              {STATUS_FLOW.map((s) => (
                <button
                  key={s}
                  className={`filter ${tab === s ? 'on' : ''}`}
                  onClick={() => setTab(s)}
                >
                  <span style={{ color: STATUS_META[s].color }}>●</span>
                  {STATUS_META[s].label} <span className="count">{counts[s] ?? 0}</span>
                </button>
              ))}
            </div>
            <input
              className="search"
              placeholder="搜索批次号 / 产品 / 程式"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>批次 / 产品</th>
                  <th>检测程式</th>
                  <th>班次</th>
                  <th>复判进度</th>
                  <th>返修板</th>
                  <th>误报率</th>
                  <th>缺陷分布</th>
                  <th>状态</th>
                  <th>导入时间</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rows.map(({ batch, program, stats, progStat }) => {
                  const alert = progStat.alert;
                  const pct = stats.total ? stats.reviewed / stats.total : 0;
                  return (
                    <tr
                      key={batch.id}
                      className={`clickable ${alert ? 'alert-row' : ''}`}
                      onClick={() => navigate(`/batch/${batch.id}`)}
                    >
                      <td>
                        <div className="row" style={{ gap: 7 }}>
                          <span className="mono" style={{ fontWeight: 600, fontSize: 12.5 }}>
                            {batch.code}
                          </span>
                          {batch.returns.length > 0 && (
                            <span
                              className="tag"
                              style={{ color: 'var(--red)', borderColor: 'rgba(255,107,94,.35)' }}
                              title={`退回 ${batch.returns.length} 次`}
                            >
                              退回×{batch.returns.length}
                            </span>
                          )}
                        </div>
                        <div className="small dim" style={{ marginTop: 3 }}>
                          {batch.product} · {batch.line}/{batch.machineId}
                        </div>
                      </td>
                      <td>
                        <div className="mono small" style={{ color: alert ? 'var(--amber)' : 'var(--txt-2)' }}>
                          {program.code}
                          {alert && (
                            <span
                              className="tag"
                              style={{
                                marginLeft: 6,
                                color: 'var(--amber)',
                                borderColor: 'rgba(255,200,87,.4)',
                              }}
                            >
                              待调机
                            </span>
                          )}
                        </div>
                        <div className="small dim" style={{ marginTop: 2 }}>{program.name}</div>
                      </td>
                      <td>
                        <span className="tag">{batch.shift}</span>
                      </td>
                      <td style={{ minWidth: 120 }}>
                        <div className="row" style={{ justifyContent: 'space-between', marginBottom: 4 }}>
                          <span className="mono small">
                            {stats.reviewed}/{stats.total}
                          </span>
                          <span className="small dim">{Math.round(pct * 100)}%</span>
                        </div>
                        <Meter
                          value={stats.reviewed}
                          max={stats.total}
                          color={pct === 1 ? 'var(--green)' : 'var(--blue)'}
                        />
                      </td>
                      <td>
                        <span
                          className="mono"
                          style={{ color: stats.rework > 0 ? 'var(--red)' : 'var(--muted)', fontSize: 13 }}
                        >
                          {stats.rework}
                        </span>
                      </td>
                      <td>
                        <span
                          className="mono"
                          style={{ color: alert ? 'var(--amber)' : 'var(--txt-2)', fontSize: 12.5 }}
                        >
                          {fmtPct(stats.falseRate)}
                        </span>
                        <div className="small dim">{stats.falseCallCount}/{stats.machineCalls}</div>
                      </td>
                      <td style={{ minWidth: 108 }}>
                        <StackedBar data={stats.detail} />
                        <div className="row small dim" style={{ marginTop: 4, gap: 6 }}>
                          <span>{stats.defectCount} 缺陷</span>
                          <span>·</span>
                          <span>{stats.missedDefects} 漏判</span>
                        </div>
                      </td>
                      <td>
                        <StatusChip status={batch.status} />
                      </td>
                      <td className="mono small dim nowrap">{fmtDateTime(batch.importedAt)}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/batch/${batch.id}`);
                          }}
                        >
                          进入 →
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={10}>
                      <div className="empty">没有匹配的批次</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div
            className="row"
            style={{
              padding: '10px 16px',
              borderTop: '1px solid var(--line)',
              justifyContent: 'space-between',
            }}
          >
            <DefectLegend />
            <span className="small dim">共 {rows.length} 批</span>
          </div>
        </div>
      </div>
      {showImport && <ImportModal onClose={() => setShowImport(false)} />}
    </div>
  );
}

function ImportModal({ onClose }: { onClose: () => void }) {
  const db = useStore((s) => s.db);
  const importBatch = useStore((s) => s.importBatch);
  const toast = useUI((s) => s.toast);
  const [programId, setProgramId] = useState(db.programs[0].id);
  const [shift, setShift] = useState<'白班' | '夜班'>('白班');
  const [boards, setBoards] = useState(10);
  const [phase, setPhase] = useState<'idle' | 'working' | 'done'>('idle');
  const program = db.programs.find((p) => p.id === programId)!;

  return (
    <Modal
      title="导入检测批次"
      desc="模拟 AOI 检测机上传本批次的缺陷记录与对应板面图像，导入后批次进入「待复判」"
      onClose={onClose}
      width={560}
      footer={
        phase === 'done' ? (
          <button className="btn btn-primary" onClick={onClose}>
            完成
          </button>
        ) : (
          <>
            <button className="btn btn-ghost" onClick={onClose} disabled={phase === 'working'}>
              取消
            </button>
            <button
              className="btn btn-primary"
              disabled={phase === 'working' || boards < 1 || boards > 40}
              onClick={() => {
                setPhase('working');
                setTimeout(() => {
                  importBatch({ programId, shift, boards });
                  setPhase('done');
                  toast(`已导入 ${boards} 块板，批次进入待复判`);
                }, 700);
              }}
            >
              {phase === 'working' ? '导入中…' : '开始导入'}
            </button>
          </>
        )
      }
    >
      <div className="row" style={{ gap: 10, marginBottom: 14 }}>
        <Field label="检测程式">
          <select value={programId} onChange={(e) => setProgramId(e.target.value)}>
            {db.programs.map((p) => (
              <option key={p.id} value={p.id}>
                {p.code} · {p.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="班次">
          <select value={shift} onChange={(e) => setShift(e.target.value as '白班' | '夜班')}>
            <option value="白班">白班</option>
            <option value="夜班">夜班</option>
          </select>
        </Field>
        <Field label="板数">
          <input
            type="number"
            min={1}
            max={40}
            value={boards}
            onChange={(e) => setBoards(Number(e.target.value))}
            style={{ fontFamily: 'var(--mono)' }}
          />
        </Field>
      </div>
      <div className="check-line" style={{ alignItems: 'flex-start' }}>
        <span style={{ color: 'var(--blue)', marginTop: 1 }}>
          <IconLayers size={13} />
        </span>
        <div className="small" style={{ lineHeight: 1.65, color: 'var(--txt-2)' }}>
          将导入 {boards} 块板的缺陷记录与图像，机台 <b className="mono">{program.machineId}</b> · 线体{' '}
          <b>{program.line}</b>。每块板生成 1 个图像版本（首检 V1），缺陷记录为可疑焊点，需逐条复判。
        </div>
      </div>
      {phase === 'done' && (
        <div className="check-line" style={{ borderColor: 'rgba(61,220,151,.4)', marginTop: 10 }}>
          <span style={{ color: 'var(--green)' }}>
            <IconShield size={13} />
          </span>
          导入完成，批次已进入列表顶部。
        </div>
      )}
    </Modal>
  );
}
