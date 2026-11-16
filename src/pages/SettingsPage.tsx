import { useState } from 'react';
import { useStore } from '../store/useStore';
import { DEFECT_META, DEFECT_ORDER, ROLE_META, STATUS_META, STATUS_FLOW } from '../lib/defects';
import { fmtFull, fmtPct } from '../lib/format';
import { Field, Segmented } from '../components/common';
import { Modal } from '../components/Modal';
import { useUI } from '../components/uiStore';
import { IconHistory, IconLock, IconRefresh, IconShield, IconTrash, IconWarn } from '../components/Icons';
import { programStats } from '../lib/stats';
import { effectiveLimit, effectiveSampleRatio, HARD_LIMIT } from '../lib/verdict';

export function SettingsPage() {
  const db = useStore((s) => s.db);
  const updateThresholds = useStore((s) => s.updateThresholds);
  const resetDemo = useStore((s) => s.resetDemo);
  const toast = useUI((s) => s.toast);
  const [showReset, setShowReset] = useState(false);
  const [draft, setDraft] = useState({
    insufficient_solder: db.thresholds.insufficient_solder,
    cold_joint: db.thresholds.cold_joint,
    offset: db.thresholds.offset,
    bridging: db.thresholds.bridging,
    sampleRatio: db.thresholds.sampleRatio * 100,
  });
  const programs = programStats(db);
  const dirty =
    draft.insufficient_solder !== db.thresholds.insufficient_solder ||
    draft.cold_joint !== db.thresholds.cold_joint ||
    draft.offset !== db.thresholds.offset ||
    draft.bridging !== db.thresholds.bridging ||
    draft.sampleRatio !== db.thresholds.sampleRatio * 100;

  return (
    <div className="page">
      <div className="page-pad">
        <div className="page-hd">
          <div className="grow">
            <h1>规则与留痕</h1>
            <div className="sub">缺陷类型阈值、放行抽检比例、误报预警与实际操作审计</div>
          </div>
          <button className="btn btn-danger" onClick={() => setShowReset(true)}>
            <IconRefresh size={13} /> 重置演示数据
          </button>
        </div>

        <div className="split-2" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="card">
            <div className="card-hd">
              <IconShield size={13} style={{ color: 'var(--green)' }} />
              <h3>过站判定阈值</h3>
              <span className="hint">某类型缺陷数量 &gt; 阈值即判返修</span>
            </div>
            <div style={{ padding: 16 }}>
              {DEFECT_ORDER.filter((t) => DEFECT_META[t].counted).map((t) => (
                <div key={t} className="row" style={{ gap: 12, marginBottom: 12 }}>
                  <span className="type-dot" style={{ background: DEFECT_META[t].color, width: 9, height: 9 }} />
                  <div style={{ width: 90 }}>
                    <div style={{ fontSize: 12.5 }}>{DEFECT_META[t].label}</div>
                    <div className="small dim">{DEFECT_META[t].hard ? `硬性 ≤ ${HARD_LIMIT}` : '一般缺陷'}</div>
                  </div>
                  <input
                    type="number"
                    min={0}
                    max={DEFECT_META[t].hard ? HARD_LIMIT : 20}
                    value={draft[t as 'insufficient_solder']}
                    onChange={(e) => setDraft({ ...draft, [t]: Math.max(0, Number(e.target.value)) })}
                    style={{ width: 76, fontFamily: 'var(--mono)' }}
                    title={DEFECT_META[t].hard ? `硬性规则上限 ${HARD_LIMIT}，超出按 ${HARD_LIMIT} 生效` : undefined}
                  />
                  <span className="small dim" style={{ flex: 1 }}>
                    {DEFECT_META[t].desc}
                  </span>
                </div>
              ))}
              <div className="hr" />
              <div className="row" style={{ gap: 12, marginBottom: 8 }}>
                <span className="type-dot" style={{ background: 'var(--blue)', width: 9, height: 9 }} />
                <div style={{ width: 90 }}>
                  <div style={{ fontSize: 12.5 }}>放行抽检比例</div>
                  <div className="small dim">品质主管</div>
                </div>
                <input
                  type="number"
                  min={5}
                  max={100}
                  value={draft.sampleRatio}
                  onChange={(e) => setDraft({ ...draft, sampleRatio: Math.max(5, Number(e.target.value)) })}
                  style={{ width: 76, fontFamily: 'var(--mono)' }}
                />
                <span className="small dim">
                  % · 放行前须实际检视的样本占比，最低 5%（当前生效{' '}
                  {(effectiveSampleRatio({ ...db.thresholds, ...{ sampleRatio: draft.sampleRatio / 100 } }) * 100).toFixed(0)}%）
                </span>
              </div>
              <div className="row" style={{ marginTop: 14, gap: 8 }}>
                <button
                  className="btn btn-primary btn-sm"
                  disabled={!dirty}
                  onClick={() => {
                    updateThresholds({
                      insufficient_solder: draft.insufficient_solder,
                      cold_joint: draft.cold_joint,
                      offset: draft.offset,
                      bridging: draft.bridging,
                      sampleRatio: Math.max(0.05, draft.sampleRatio / 100),
                    });
                    toast('阈值已更新，历史判定结论不回溯');
                  }}
                >
                  保存阈值
                </button>
                <button
                  className="btn btn-sm btn-ghost"
                  disabled={!dirty}
                  onClick={() =>
                    setDraft({
                      insufficient_solder: db.thresholds.insufficient_solder,
                      cold_joint: db.thresholds.cold_joint,
                      offset: db.thresholds.offset,
                      bridging: db.thresholds.bridging,
                      sampleRatio: db.thresholds.sampleRatio * 100,
                    })
                  }
                >
                  撤销修改
                </button>
                <span className="small dim">修改会写入审计；已提交的单板判定保持原快照</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-hd">
              <IconWarn size={13} style={{ color: 'var(--amber)' }} />
              <h3>误报预警阈值（按检测程式）</h3>
              <span className="hint">超阈值的程式在列表标黄</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>程式</th>
                    <th>当前误报率</th>
                    <th>预警阈值</th>
                    <th>状态</th>
                  </tr>
                </thead>
                <tbody>
                  {programs.map((p) => (
                    <tr key={p.programId} className={p.alert ? 'alert-row' : ''}>
                      <td>
                        <div className="mono small" style={{ fontWeight: 600 }}>{p.code}</div>
                        <div className="small dim">{p.line} · {p.machineId}</div>
                      </td>
                      <td className="num" style={{ color: p.alert ? 'var(--amber)' : 'var(--txt)' }}>
                        {fmtPct(p.falseRate)}
                        <span className="small dim"> ({p.falseCalls}/{p.machineCalls})</span>
                      </td>
                      <td className="num dim">{p.alertThreshold}%</td>
                      <td>
                        {p.alert ? (
                          <span className="chip" style={{ color: 'var(--amber)', background: 'var(--amber-dim)' }}>
                            待调机
                          </span>
                        ) : (
                          <span className="chip" style={{ color: 'var(--green)', background: 'var(--green-dim)' }}>
                            正常
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding: '10px 16px', borderTop: '1px solid var(--line)' }} className="small dim">
              预警阈值由品质工程在检测程式侧维护，此处只读展示。
            </div>
          </div>
        </div>

        <div className="split-2" style={{ gridTemplateColumns: '1.5fr 1fr', marginTop: 14 }}>
          <div className="card">
            <div className="card-hd">
              <IconHistory size={13} style={{ color: 'var(--txt-2)' }} />
              <h3>操作审计</h3>
              <span className="hint">共 {db.audit.length} 条 · 最新在前</span>
            </div>
            <div className="audit" style={{ maxHeight: 460 }}>
              {db.audit.slice(0, 80).map((a) => {
                const user = db.users.find((u) => u.id === a.actorId);
                return (
                  <div className="audit-item" key={a.id}>
                    <div className="audit-time">{fmtFull(a.at).slice(5, 16)}</div>
                    <div className="audit-body">
                      <b>{a.action}</b>{' '}
                      <span className="who">· {user?.name ?? a.actorId}</span>
                      {a.batchId && (
                        <span className="tag" style={{ marginLeft: 6 }}>
                          {db.batches.find((b) => b.id === a.batchId)?.code ?? a.batchId}
                        </span>
                      )}
                      <div style={{ color: 'var(--txt-2)', marginTop: 2, lineHeight: 1.5 }}>{a.detail}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="card">
              <div className="card-hd">
                <IconLock size={13} style={{ color: 'var(--green)' }} />
                <h3>标注与图像版本规则</h3>
              </div>
              <div style={{ padding: '12px 16px', fontSize: 12, lineHeight: 1.85, color: 'var(--txt-2)' }}>
                <div>· 每条标注挂接在具体<b>图像版本</b>（板号 + 版本号）上，不挂板。</div>
                <div>· 换用重扫图像时，旧版本全部有效标注自动置为<b>作废</b>，记录作废人、时间、原因。</div>
                <div>· 只有当前有效版本的标注参与过站判定与看板统计。</div>
                <div>· 已放行批次完全只读，标注/换图/复判均不可再操作。</div>
                <div>· 退回批次全部单板回到待复判，已有标注保留供修正。</div>
              </div>
            </div>
            <div className="card">
              <div className="card-hd">
                <IconShield size={13} style={{ color: 'var(--blue)' }} />
                <h3>角色权限</h3>
              </div>
              <div style={{ padding: '4px 0 10px' }}>
                {db.users.map((u) => (
                  <div className="audit-item" key={u.id} style={{ gridTemplateColumns: '1fr auto' }}>
                    <div>
                      <b>{u.name}</b>{' '}
                      <span className="tag" style={{ marginLeft: 4 }}>
                        {u.code}
                      </span>
                      <div className="small dim" style={{ marginTop: 3 }}>
                        {u.role === 'rechecker'
                          ? '画布标注、提交单板复判、换图'
                          : u.role === 'supervisor'
                            ? '批次放行 / 退回、抽检、全员操作'
                            : '查看统计与申诉，不参与放行'}
                      </div>
                    </div>
                    <span className="chip" style={{ color: ROLE_META[u.role].color, background: `${ROLE_META[u.role].color}1f` }}>
                      {ROLE_META[u.role].label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <div className="card-hd">
                <IconHistory size={13} style={{ color: 'var(--txt-2)' }} />
                <h3>批次状态机</h3>
              </div>
              <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                {STATUS_FLOW.map((s, i) => (
                  <span key={s} className="row" style={{ gap: 6 }}>
                    <span className="chip" style={{ color: STATUS_META[s].color, background: STATUS_META[s].bg }}>
                      {STATUS_META[s].label}
                    </span>
                    {i < STATUS_FLOW.length - 1 && <span className="dim">→</span>}
                  </span>
                ))}
                <div className="small dim" style={{ marginTop: 8, lineHeight: 1.6 }}>
                  「待放行」可被退回至「复判中」，退回必须选择分类并填写原因，并记录退回人。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showReset && (
        <Modal
          title="重置演示数据"
          desc="将清空当前所有标注、复判、放行与退回记录，恢复为初始演示数据。此操作不可撤销。"
          onClose={() => setShowReset(false)}
          footer={
            <>
              <button className="btn btn-ghost" onClick={() => setShowReset(false)}>
                取消
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  resetDemo();
                  setShowReset(false);
                  toast('已重置为初始演示数据');
                }}
              >
                <IconRefresh size={13} /> 确认重置
              </button>
            </>
          }
        >
          <div className="check-line" style={{ alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--amber)', marginTop: 1 }}>
              <IconWarn size={13} />
            </span>
            <div style={{ lineHeight: 1.6 }}>
              当前数据中有 {db.batches.length} 个批次、{db.audit.length} 条审计记录。重置后全部丢失。
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
