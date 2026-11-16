import { useMemo, useState } from 'react';
import { useStore } from '../store/useStore';
import { programStats, shiftStats, batchStats } from '../lib/stats';
import { DEFECT_META, DEFECT_ORDER } from '../lib/defects';
import { fmtFull, fmtPct } from '../lib/format';
import { Kpi, Segmented } from '../components/common';
import { Donut, HBarChart, StackedBar, DefectLegend } from '../components/charts';
import {
  IconAlertTri,
  IconChart,
  IconDownload,
  IconList,
  IconShield,
  IconTarget,
  IconWarn,
} from '../components/Icons';
import { exportProgramReportCsv } from '../lib/export';
import { useUI } from '../components/uiStore';
import { navigate } from '../App';
import type { Shift } from '../types';

export function DashboardPage() {
  const db = useStore((s) => s.db);
  const toast = useUI((s) => s.toast);
  const [shiftFilter, setShiftFilter] = useState<'all' | Shift>('all');

  const programs = useMemo(
    () => programStats(db, shiftFilter === 'all' ? undefined : shiftFilter),
    [db, shiftFilter],
  );
  const shifts = useMemo(() => shiftStats(db), [db]);

  const totals = useMemo(() => {
    const batches = shiftFilter === 'all' ? db.batches : db.batches.filter((b) => b.shift === shiftFilter);
    let boards = 0;
    let reviewed = 0;
    let rework = 0;
    let calls = 0;
    let fc = 0;
    const detail = { ...Object.fromEntries(DEFECT_ORDER.map((t) => [t, 0])) } as Record<string, number>;
    for (const b of batches) {
      const s = batchStats(b);
      boards += s.total;
      reviewed += s.reviewed;
      rework += s.rework;
      calls += s.machineCalls;
      fc += s.falseCallCount;
      for (const t of DEFECT_ORDER) detail[t] += s.detail[t];
    }
    const appeals = db.appeals.filter((a) => shiftFilter === 'all' || a.shift === shiftFilter);
    return {
      boards,
      reviewed,
      rework,
      calls,
      fc,
      falseRate: calls ? fc / calls : 0,
      reworkRate: reviewed ? rework / reviewed : 0,
      appeals: appeals.length,
      openAppeals: appeals.filter((a) => a.status === 'open').length,
      detail,
    };
  }, [db, shiftFilter]);

  const donutData = DEFECT_ORDER.map((t) => ({ type: t, value: totals.detail[t] }));
  const totalDefects = DEFECT_ORDER.reduce((a, t) => a + totals.detail[t], 0);

  const [sortBy, setSortBy] = useState<'false' | 'rework' | 'appeal'>('false');
  const sortedPrograms = [...programs].sort((a, b) => {
    if (sortBy === 'false') return b.falseRate - a.falseRate;
    if (sortBy === 'rework') return b.reworkRate - a.reworkRate;
    return b.appeals - a.appeals;
  });

  const alerts = useMemo(() => programStats(db).filter((p) => p.alert), [db]);

  return (
    <div className="page">
      <div className="page-pad">
        <div className="page-hd">
          <div className="grow">
            <h1>质量看板</h1>
            <div className="sub">按班次与检测程式统计误报率、返修率与漏判申诉 · 数据随复判实时更新</div>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <Segmented
              value={shiftFilter}
              onChange={(v) => setShiftFilter(v)}
              options={[
                { value: 'all', label: '全部班次' },
                { value: '白班', label: '白班' },
                { value: '夜班', label: '夜班' },
              ]}
            />
            <button
              className="btn"
              onClick={() => {
                exportProgramReportCsv(db);
                toast('程式质量统计已导出 CSV');
              }}
            >
              <IconDownload size={13} /> 导出统计
            </button>
          </div>
        </div>

        {alerts.length > 0 && (
          <div className="warn-banner">
            <IconAlertTri size={15} style={{ flex: 'none', marginTop: 1 }} />
            <div className="grow">
              <b>{alerts.length} 个检测程式误报率超阈值</b>，建议安排调机：
              {alerts.map((a) => `${a.code} ${fmtPct(a.falseRate)}（阈值 ${a.alertThreshold}%）`).join(' · ')}
            </div>
            <button className="btn btn-sm" onClick={() => navigate('/batches')}>
              查看批次
            </button>
          </div>
        )}

        <div className="kpi-grid">
          <Kpi label="复判板数" value={totals.boards} sub={`已复判 ${totals.reviewed}`} accent="var(--blue)" icon={<IconList size={13} />} />
          <Kpi
            label="误报率"
            value={fmtPct(totals.falseRate)}
            sub={`${totals.fc} / ${totals.calls} 机器判点`}
            accent={totals.falseRate > 0.15 ? 'var(--amber)' : 'var(--green)'}
            icon={<IconTarget size={13} />}
          />
          <Kpi
            label="返修率"
            value={fmtPct(totals.reworkRate)}
            sub={`${totals.rework} 块返修`}
            accent="var(--red)"
            icon={<IconWarn size={13} />}
          />
          <Kpi
            label="漏判申诉"
            value={totals.appeals}
            sub={`${totals.openAppeals} 条未结`}
            accent="var(--violet)"
            icon={<IconShield size={13} />}
          />
        </div>

        <div className="dash-grid">
          <div className="card span-8">
            <div className="card-hd">
              <IconChart size={13} style={{ color: 'var(--green)' }} />
              <h3>检测程式质量统计</h3>
              <span className="hint">
                {shiftFilter === 'all' ? '全部班次' : `${shiftFilter}口径`} · 误报率超阈值行标黄
              </span>
              <div className="grow" />
              <Segmented
                size="sm"
                value={sortBy}
                onChange={setSortBy}
                options={[
                  { value: 'false', label: '误报率' },
                  { value: 'rework', label: '返修率' },
                  { value: 'appeal', label: '申诉' },
                ]}
              />
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>程式</th>
                    <th>线体/机台</th>
                    <th>板数</th>
                    <th>机器判点</th>
                    <th>误报率</th>
                    <th>返修率</th>
                    <th>申诉</th>
                    <th>退回</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {sortedPrograms.map((p) => (
                    <tr
                      key={p.programId}
                      className={`clickable ${p.alert ? 'alert-row' : ''}`}
                      onClick={() => navigate('/batches')}
                    >
                      <td>
                        <div className="mono" style={{ fontWeight: 600, fontSize: 12 }}>
                          {p.code}
                        </div>
                        <div className="small dim">{p.name}</div>
                      </td>
                      <td className="mono small" style={{ color: 'var(--txt-2)' }}>
                        {p.line}
                        <div className="dim">{p.machineId}</div>
                      </td>
                      <td className="num">{p.boards}</td>
                      <td className="num">{p.machineCalls}</td>
                      <td>
                        <div
                          className="mono"
                          style={{
                            color: p.alert ? 'var(--amber)' : 'var(--txt)',
                            fontWeight: 600,
                            fontSize: 12.5,
                          }}
                        >
                          {fmtPct(p.falseRate)}
                        </div>
                        <div className="small dim">阈值 {p.alertThreshold}%</div>
                      </td>
                      <td className="num">{fmtPct(p.reworkRate)}</td>
                      <td>
                        <span className="num">{p.appeals}</span>
                        {p.openAppeals > 0 && (
                          <span
                            className="tag"
                            style={{
                              marginLeft: 5,
                              color: 'var(--violet)',
                              borderColor: 'rgba(183,161,255,.35)',
                            }}
                          >
                            未结 {p.openAppeals}
                          </span>
                        )}
                      </td>
                      <td className="num">{p.rejectedBatches}</td>
                      <td>
                        {p.alert ? (
                          <span className="tag" style={{ color: 'var(--amber)', borderColor: 'rgba(255,200,87,.4)' }}>
                            待调机
                          </span>
                        ) : (
                          <span className="tag" style={{ color: 'var(--green)', borderColor: 'rgba(61,220,151,.3)' }}>
                            正常
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card span-4">
            <div className="card-hd">
              <IconTarget size={13} style={{ color: 'var(--violet)' }} />
              <h3>缺陷类型分布</h3>
            </div>
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Donut
                data={donutData}
                size={168}
                thickness={26}
                centerTop={String(totalDefects)}
                centerBottom="有效标注"
              />
              <div style={{ width: '100%', marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {DEFECT_ORDER.map((t) => {
                  const v = totals.detail[t];
                  const pct = totalDefects ? (v / totalDefects) * 100 : 0;
                  return (
                    <div key={t} className="row" style={{ gap: 8 }}>
                      <span className="type-dot" style={{ background: DEFECT_META[t].color }} />
                      <span style={{ width: 42, fontSize: 11.5 }}>{DEFECT_META[t].label}</span>
                      <div className="bar" style={{ flex: 1, height: 4 }}>
                        <i style={{ width: `${pct}%`, background: DEFECT_META[t].color }} />
                      </div>
                      <span className="mono small" style={{ width: 26, textAlign: 'right' }}>
                        {v}
                      </span>
                      <span className="mono small dim" style={{ width: 40, textAlign: 'right' }}>
                        {pct.toFixed(0)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="card span-6">
            <div className="card-hd">
              <IconShield size={13} style={{ color: 'var(--blue)' }} />
              <h3>班次对比</h3>
              <span className="hint">误报率 / 返修率 / 申诉</span>
            </div>
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 18 }}>
              {shifts.map((s) => (
                <div key={s.shift}>
                  <div className="row" style={{ marginBottom: 9 }}>
                    <span className="chip" style={{ color: s.shift === '白班' ? 'var(--amber)' : 'var(--blue)', background: 'var(--panel-3)' }}>
                      {s.shift}
                    </span>
                    <span className="small dim">
                      {s.batches} 批 · {s.boards} 块板 · {s.reviewedBoards} 已复判
                    </span>
                    <div className="grow" />
                    <span className="mono small" style={{ color: s.falseRate > 0.15 ? 'var(--amber)' : 'var(--txt-2)' }}>
                      误报 {fmtPct(s.falseRate)}
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
                    <div className="stat-cell">
                      <span className="l">误报率</span>
                      <span className="v" style={{ color: s.falseRate > 0.15 ? 'var(--amber)' : 'var(--green)' }}>
                        {fmtPct(s.falseRate)}
                      </span>
                      <div className="bar">
                        <i style={{ width: `${Math.min(100, s.falseRate * 300)}%`, background: s.falseRate > 0.15 ? 'var(--amber)' : 'var(--green)' }} />
                      </div>
                    </div>
                    <div className="stat-cell">
                      <span className="l">返修率</span>
                      <span className="v" style={{ color: 'var(--red)' }}>{fmtPct(s.reworkRate)}</span>
                      <div className="bar">
                        <i style={{ width: `${Math.min(100, s.reworkRate * 200)}%`, background: 'var(--red)' }} />
                      </div>
                    </div>
                    <div className="stat-cell">
                      <span className="l">漏判申诉</span>
                      <span className="v" style={{ color: 'var(--violet)' }}>{s.appeals}</span>
                      <div className="bar">
                        <i style={{ width: `${Math.min(100, s.appeals * 20)}%`, background: 'var(--violet)' }} />
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <StackedBar data={s.detail as never} height={7} showEmpty />
                  </div>
                </div>
              ))}
              <DefectLegend />
            </div>
          </div>

          <div className="card span-6">
            <div className="card-hd">
              <IconWarn size={13} style={{ color: 'var(--violet)' }} />
              <h3>漏判申诉记录</h3>
              <span className="hint">{db.appeals.length} 条</span>
            </div>
            <div className="audit" style={{ maxHeight: 320 }}>
              {db.appeals
                .filter((a) => shiftFilter === 'all' || a.shift === shiftFilter)
                .map((a) => {
                  const program = db.programs.find((p) => p.id === a.programId);
                  const batch = db.batches.find((b) => b.id === a.batchId);
                  return (
                    <div className="audit-item" key={a.id} style={{ gridTemplateColumns: '72px 1fr' }}>
                      <div className="audit-time">{fmtFull(a.raisedAt).slice(5, 16)}</div>
                      <div className="audit-body">
                        <div className="row" style={{ gap: 6, flexWrap: 'wrap' }}>
                          <span className="mono small" style={{ color: 'var(--txt)' }}>
                            {a.id}
                          </span>
                          <span className="tag">{program?.code}</span>
                          <span className="tag">{a.shift}</span>
                          <span
                            className="chip"
                            style={{
                              color: a.status === 'open' ? 'var(--violet)' : 'var(--muted)',
                              background: a.status === 'open' ? 'rgba(183,161,255,.13)' : 'rgba(255,255,255,.04)',
                            }}
                          >
                            {a.status === 'open' ? '未结' : '已结'}
                          </span>
                          <span className="small dim" style={{ marginLeft: 'auto' }}>
                            {a.source}
                          </span>
                        </div>
                        <div style={{ marginTop: 3, color: 'var(--txt-2)', lineHeight: 1.5 }}>
                          {DEFECT_META[a.type].label} · {a.note}
                        </div>
                        {batch && (
                          <div className="small dim mono" style={{ marginTop: 2 }}>
                            {batch.code}
                            {a.boardId ? ` · ${a.boardId.split('-').pop()} 号板` : ''}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="card span-12">
            <div className="card-hd">
              <IconChart size={13} style={{ color: 'var(--amber)' }} />
              <h3>各程式误报率对比</h3>
              <span className="hint">黄条超过该程式预警阈值</span>
              <div className="grow" />
              <span className="small dim">阈值线按各程式独立判定</span>
            </div>
            <div style={{ padding: 16 }}>
              <HBarChart
                data={programs.map((p) => ({
                  label: p.code,
                  value: p.falseRate * 100,
                  sub: `阈值 ${p.alertThreshold}%`,
                  alert: p.alert,
                  color: p.alert ? 'var(--amber)' : 'var(--green)',
                }))}
                max={Math.max(30, ...programs.map((p) => p.falseRate * 100)) * 1.1}
                format={(v) => `${v.toFixed(1)}%`}
              />
              <div className="hr" />
              <HBarChart
                data={programs.map((p) => ({
                  label: p.code,
                  value: p.reworkRate * 100,
                  sub: `${p.reworkBoards}/${p.reviewedBoards} 板`,
                  color: 'var(--red)',
                }))}
                format={(v) => `${v.toFixed(1)}%`}
              />
            </div>
          </div>

          <div className="card span-12">
            <div className="card-hd">
              <IconShield size={13} style={{ color: 'var(--green)' }} />
              <h3>批次放行概览</h3>
              <span className="hint">最近 6 批 · 抽检覆盖与退回情况</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>批次</th>
                    <th>程式</th>
                    <th>班次</th>
                    <th>板数</th>
                    <th>返修</th>
                    <th>抽检覆盖</th>
                    <th>退回</th>
                    <th>状态</th>
                    <th>放行</th>
                  </tr>
                </thead>
                <tbody>
                  {[...db.batches]
                    .sort((a, b) => new Date(b.importedAt).getTime() - new Date(a.importedAt).getTime())
                    .slice(0, 6)
                    .map((b) => {
                      const s = batchStats(b);
                      const need = Math.max(1, Math.ceil(b.boards.length * db.thresholds.sampleRatio));
                      const coverage = b.boards.length ? (b.sampling.length / b.boards.length) * 100 : 0;
                      return (
                        <tr key={b.id} className="clickable" onClick={() => navigate(`/batch/${b.id}`)}>
                          <td className="mono" style={{ fontWeight: 600 }}>{b.code}</td>
                          <td className="mono small dim">{db.programs.find((p) => p.id === b.programId)?.code}</td>
                          <td><span className="tag">{b.shift}</span></td>
                          <td className="num">{s.total}</td>
                          <td className="num" style={{ color: s.rework ? 'var(--red)' : 'var(--muted)' }}>{s.rework}</td>
                          <td>
                            <span className="mono small" style={{ color: b.sampling.length >= need ? 'var(--green)' : 'var(--amber)' }}>
                              {b.sampling.length}/{need} · {coverage.toFixed(1)}%
                            </span>
                          </td>
                          <td>
                            {b.returns.length > 0 ? (
                              <span className="tag" style={{ color: 'var(--red)', borderColor: 'rgba(255,107,94,.35)' }}>
                                {b.returns.length} 次
                              </span>
                            ) : (
                              <span className="dim small">—</span>
                            )}
                          </td>
                          <td>
                            <span className="small" style={{ color: b.status === 'released' ? 'var(--green)' : 'var(--txt-2)' }}>
                              {b.status === 'released' ? '已放行' : b.status === 'awaiting_release' ? '待放行' : b.status === 'reviewing' ? '复判中' : '待复判'}
                            </span>
                          </td>
                          <td className="small dim">{b.released ? `${b.released.by} · ${fmtFull(b.released.at).slice(5, 16)}` : '—'}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card span-12">
            <div className="card-hd">
              <IconList size={13} style={{ color: 'var(--txt-2)' }} />
              <h3>全局审计流水</h3>
              <span className="hint">最近 30 条 · 标注/换图/放行/退回全部留痕</span>
            </div>
            <div className="audit" style={{ maxHeight: 300 }}>
              {db.audit.slice(0, 30).map((a) => (
                <div className="audit-item" key={a.id}>
                  <div className="audit-time">{fmtFull(a.at).slice(5, 16)}</div>
                  <div className="audit-body">
                    <b>{a.action}</b>{' '}
                    <span className="who">· {db.users.find((u) => u.id === a.actorId)?.name ?? a.actorId}</span>
                    <div style={{ color: 'var(--txt-2)', marginTop: 2, lineHeight: 1.5 }}>{a.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ height: 10 }} />
        <div className="small dim" style={{ textAlign: 'center', marginTop: 8 }}>
          统计口径：误报率 = 判为误报的标注数 / 检测机判点数；返修率 = 返修板 / 已复判板；申诉数来自客户·下游工站·OQA。
          {' '}看板仅统计各板「当前有效图像版本」的标注，已作废标注不计入。
        </div>
      </div>
    </div>
  );
}
