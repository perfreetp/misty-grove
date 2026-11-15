import React, { useMemo, useState } from 'react';
import type { CaseDoc, Conventions, ValveModel } from '../lib/types';
import { useStore } from '../state/store';
import { fmtDate } from '../components/ui';
import { IconCheck, IconPlus, IconSliders, IconTrash } from '../components/icons';

export function LibraryPage() {
  const { state, upsertValve, removeValve, updateConventions, toast } = useStore();
  const [draft, setDraft] = useState<ValveModel | null>(null);
  const [convDraft, setConvDraft] = useState<Conventions>({ ...state.conventions });
  const [tab, setTab] = useState<'valves' | 'conventions'>('valves');

  const startEdit = (v: ValveModel) => {
    setDraft(JSON.parse(JSON.stringify(v)));
  };

  const saveValve = () => {
    if (!draft) return;
    if (!draft.name.trim()) {
      toast('型号名称不能为空', 'warn');
      return;
    }
    if (!draft.sizes.length) {
      toast('至少需要一个规格', 'warn');
      return;
    }
    upsertValve(draft);
    toast(`型号 ${draft.brand} ${draft.name} 已保存`, 'ok');
    setDraft(null);
  };

  const saveConv = () => {
    updateConventions(convDraft, '周立群');
    toast('测量口径已更新,后续测量与审核均按新口径计算', 'ok');
  };

  const convChanged = useMemo(() => {
    const keys = Object.keys(convDraft) as (keyof Conventions)[];
    return keys.some((k) => k !== 'updatedAt' && k !== 'updatedBy' && convDraft[k] !== state.conventions[k]);
  }, [convDraft, state.conventions]);

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h2 style={{ fontSize: 17 }}>型号库与测量口径</h2>
          <div style={{ fontSize: 12, color: 'var(--text-3)' }}>技师维护 · 口径变更记录于 {fmtDate(state.conventions.updatedAt)} · {state.conventions.updatedBy}</div>
        </div>
        <div className="seg-row" style={{ margin: 0 }}>
          <button className={`seg ${tab === 'valves' ? 'on' : ''}`} onClick={() => setTab('valves')}>瓣膜型号库</button>
          <button className={`seg ${tab === 'conventions' ? 'on' : ''}`} onClick={() => setTab('conventions')}>测量口径</button>
        </div>
      </div>

      {tab === 'valves' ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
            <button
              className="btn btn-primary"
              onClick={() => {
                const nv: ValveModel = {
                  id: `valve-${Date.now().toString(36)}`,
                  brand: '自定义',
                  name: '新型号',
                  type: '自膨胀',
                  active: true,
                  frameHeightMm: 40,
                  skirtHeightMm: 10,
                  riskZoneHeightMm: 20,
                  radialForceNPerMm: 0.6,
                  cellCount: 12,
                  shape: 'flare',
                  sizes: [
                    { nominalMm: 23, label: '23' },
                    { nominalMm: 26, label: '26' },
                  ],
                  notes: '',
                };
                setDraft(nv);
              }}
            >
              <IconPlus size={14} /> 新增型号
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: 10 }}>
            {state.valves.map((v) => (
              <div key={v.id} className="card" style={{ padding: 12 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                      {v.name}
                      <span className="chip tag-todo" style={{ height: 17, fontSize: 9.5 }}>{v.type}</span>
                      {!v.active ? <span className="chip tag-danger" style={{ height: 17, fontSize: 9.5 }}>停用</span> : null}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{v.brand}</div>
                  </div>
                  <button className="icon-btn" onClick={() => startEdit(v)} title="编辑"><IconSliders size={14} /></button>
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 8, fontSize: 11 }}>
                  <MiniKV k="瓣架高" v={`${v.frameHeightMm} mm`} />
                  <MiniKV k="裙边" v={`${v.skirtHeightMm} mm`} />
                  <MiniKV k="径向力" v={`${v.radialForceNPerMm} N/mm`} />
                </div>
                <div style={{ display: 'flex', gap: 3, marginTop: 8, flexWrap: 'wrap' }}>
                  {v.sizes.map((s) => (
                    <span key={s.nominalMm} className="mono" style={{ fontSize: 10.5, padding: '1px 7px', borderRadius: 4, background: 'var(--bg-2)', border: '1px solid var(--line-2)' }}>
                      {s.label}
                    </span>
                  ))}
                </div>
                {v.notes ? <div style={{ marginTop: 8, fontSize: 10.5, color: 'var(--text-3)', lineHeight: 1.6 }}>{v.notes}</div> : null}
                <div style={{ display: 'flex', gap: 5, marginTop: 10 }}>
                  <button className="btn btn-sm" onClick={() => { upsertValve({ ...v, active: !v.active }); toast(v.active ? '已停用该型号' : '已启用该型号', 'ok'); }}>
                    {v.active ? '停用' : '启用'}
                  </button>
                  <button
                    className="btn btn-sm btn-ghost"
                    style={{ marginLeft: 'auto', color: 'var(--text-3)' }}
                    onClick={() => {
                      if (confirm(`删除型号 ${v.name}?已引用该型号的申请单将保留历史记录。`)) {
                        removeValve(v.id);
                        toast('已删除型号', 'warn');
                      }
                    }}
                  >
                    <IconTrash size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="card" style={{ padding: 16, maxWidth: 760 }}>
          <div className="section-title">瓣环 / 流出道口径</div>
          <div className="form-grid">
            <Field label="瓣环勾画基准">
              <select value={convDraft.annulusContour} onChange={(e) => setConvDraft({ ...convDraft, annulusContour: e.target.value as Conventions['annulusContour'] })}>
                <option>内缘</option>
                <option>中心线</option>
              </select>
            </Field>
            <Field label="周长算法">
              <select value={convDraft.perimeterMethod} onChange={(e) => setConvDraft({ ...convDraft, perimeterMethod: e.target.value as Conventions['perimeterMethod'] })}>
                <option>样条</option>
                <option>折线</option>
              </select>
            </Field>
            <Field label="LVOT 测量层面偏移 (mm)">
              <input type="number" value={convDraft.lvotOffsetMm} onChange={(e) => setConvDraft({ ...convDraft, lvotOffsetMm: Number(e.target.value) })} />
            </Field>
            <Field label="冠脉高度参照">
              <select value={convDraft.coronaryHeightRef} onChange={(e) => setConvDraft({ ...convDraft, coronaryHeightRef: e.target.value as Conventions['coronaryHeightRef'] })}>
                <option>开口下缘</option>
                <option>开口中心</option>
              </select>
            </Field>
            <Field label="瓣环壁校准厚度 (mm)">
              <input type="number" step={0.1} value={convDraft.annularThicknessMm} onChange={(e) => setConvDraft({ ...convDraft, annularThicknessMm: Number(e.target.value) })} />
            </Field>
            <Field label="选型参考径">
              <select value={convDraft.sizingReference} onChange={(e) => setConvDraft({ ...convDraft, sizingReference: e.target.value as Conventions['sizingReference'] })}>
                <option>周长派生径</option>
                <option>面积派生径</option>
              </select>
            </Field>
          </div>

          <div className="divider" />
          <div className="section-title">选型与安全性阈值</div>
          <div className="form-grid">
            <Field label="目标过度扩张 (%)">
              <input type="number" value={convDraft.targetOversizePct} onChange={(e) => setConvDraft({ ...convDraft, targetOversizePct: Number(e.target.value) })} />
            </Field>
            <Field label="下限 (%)">
              <input type="number" value={convDraft.minOversizePct} onChange={(e) => setConvDraft({ ...convDraft, minOversizePct: Number(e.target.value) })} />
            </Field>
            <Field label="上限 (%)">
              <input type="number" value={convDraft.maxOversizePct} onChange={(e) => setConvDraft({ ...convDraft, maxOversizePct: Number(e.target.value) })} />
            </Field>
            <Field label="瓣架–冠脉净距下限 (mm)">
              <input type="number" step={0.5} value={convDraft.frameClearanceMinMm} onChange={(e) => setConvDraft({ ...convDraft, frameClearanceMinMm: Number(e.target.value) })} />
            </Field>
            <Field label="冠脉开口高度下限 (mm)">
              <input type="number" step={0.5} value={convDraft.ostiumHeightMinMm} onChange={(e) => setConvDraft({ ...convDraft, ostiumHeightMinMm: Number(e.target.value) })} />
            </Field>
            <Field label="瓣周漏间隙阈值 (mm)">
              <input type="number" step={0.1} value={convDraft.pvlGapMm} onChange={(e) => setConvDraft({ ...convDraft, pvlGapMm: Number(e.target.value) })} />
            </Field>
          </div>

          <div className="divider" />
          <div className="section-title">钙化分析口径</div>
          <div className="form-grid">
            <Field label="钙化阈值 (HU)">
              <input type="number" step={50} value={convDraft.calcThresholdHU} onChange={(e) => setConvDraft({ ...convDraft, calcThresholdHU: Number(e.target.value) })} />
            </Field>
            <Field label="扇区数">
              <input type="number" step={4} value={convDraft.calcSectorCount} onChange={(e) => setConvDraft({ ...convDraft, calcSectorCount: Math.max(12, Math.min(72, Number(e.target.value))) })} />
            </Field>
            <Field label="分析带宽 (mm)">
              <input type="number" step={1} value={convDraft.calcBandMm} onChange={(e) => setConvDraft({ ...convDraft, calcBandMm: Number(e.target.value) })} />
            </Field>
            <Field label="钙化刚度增益">
              <input type="number" step={0.1} value={convDraft.calcStiffnessGain} onChange={(e) => setConvDraft({ ...convDraft, calcStiffnessGain: Number(e.target.value) })} />
            </Field>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 16, alignItems: 'center' }}>
            <button className="btn btn-primary" onClick={saveConv} disabled={!convChanged}>
              <IconCheck size={14} /> 保存口径
            </button>
            <button className="btn" onClick={() => setConvDraft({ ...state.conventions })} disabled={!convChanged}>
              还原
            </button>
            {convChanged ? <span style={{ fontSize: 11, color: 'var(--amber)' }}>有未保存的修改</span> : <span style={{ fontSize: 11, color: 'var(--text-3)' }}>已与当前口径一致</span>}
          </div>
          <div className="banner banner-info" style={{ marginTop: 12, fontSize: 11.5 }}>
            口径变更会影响所有重新计算的申请单(已提交的审核记录保留当时数值)。演示环境无版本审批流。
          </div>
        </div>
      )}

      {draft ? (
        <div className="modal-backdrop" onMouseDown={() => setDraft(null)}>
          <div className="modal" style={{ width: 560 }} onMouseDown={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3 style={{ fontSize: 14 }}>编辑型号</h3>
              <button className="icon-btn" onClick={() => setDraft(null)}>✕</button>
            </div>
            <div style={{ padding: 14 }}>
              <div className="form-grid">
                <Field label="商品名"><input type="text" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></Field>
                <Field label="厂商"><input type="text" value={draft.brand} onChange={(e) => setDraft({ ...draft, brand: e.target.value })} /></Field>
                <Field label="类型">
                  <select value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value as ValveModel['type'] })}>
                    <option>自膨胀</option>
                    <option>球囊扩张</option>
                    <option>机械扩张</option>
                  </select>
                </Field>
                <Field label="瓣架形态">
                  <select value={draft.shape} onChange={(e) => setDraft({ ...draft, shape: e.target.value as ValveModel['shape'] })}>
                    <option value="flare">环上外扩</option>
                    <option value="straight">直筒</option>
                    <option value="taper">锥形</option>
                  </select>
                </Field>
                <Field label="瓣架高度 (mm)"><input type="number" value={draft.frameHeightMm} onChange={(e) => setDraft({ ...draft, frameHeightMm: Number(e.target.value) })} /></Field>
                <Field label="裙边高度 (mm)"><input type="number" value={draft.skirtHeightMm} onChange={(e) => setDraft({ ...draft, skirtHeightMm: Number(e.target.value) })} /></Field>
                <Field label="冠脉风险区高度 (mm)"><input type="number" value={draft.riskZoneHeightMm} onChange={(e) => setDraft({ ...draft, riskZoneHeightMm: Number(e.target.value) })} /></Field>
                <Field label="径向力 (N/mm)"><input type="number" step={0.01} value={draft.radialForceNPerMm} onChange={(e) => setDraft({ ...draft, radialForceNPerMm: Number(e.target.value) })} /></Field>
                <Field label="连接点数"><input type="number" value={draft.cellCount} onChange={(e) => setDraft({ ...draft, cellCount: Number(e.target.value) })} /></Field>
              </div>
              <div className="divider" />
              <div className="section-title">
                规格
                <button
                  className="btn btn-sm"
                  onClick={() => setDraft({ ...draft, sizes: [...draft.sizes, { nominalMm: (draft.sizes.at(-1)?.nominalMm ?? 20) + 3, label: String((draft.sizes.at(-1)?.nominalMm ?? 20) + 3) }] })}
                >
                  <IconPlus size={12} /> 添加
                </button>
              </div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {draft.sizes.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 3, background: 'var(--bg-2)', border: '1px solid var(--line-2)', borderRadius: 5, padding: '3px 5px' }}>
                    <input
                      type="number"
                      value={s.nominalMm}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        setDraft({ ...draft, sizes: draft.sizes.map((x, j) => (j === i ? { nominalMm: v, label: String(v) } : x)) });
                      }}
                      style={{ width: 56, height: 22, padding: '0 4px' }}
                      className="mono"
                    />
                    <span style={{ fontSize: 10, color: 'var(--text-3)' }}>mm</span>
                    <button className="icon-btn" style={{ width: 18, height: 18 }} onClick={() => setDraft({ ...draft, sizes: draft.sizes.filter((_, j) => j !== i) })}>
                      <IconTrash size={11} />
                    </button>
                  </div>
                ))}
              </div>
              <Field label="备注" style={{ marginTop: 10 }}>
                <textarea rows={2} value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} style={{ width: '100%' }} />
              </Field>
              <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                <button className="btn btn-primary" onClick={saveValve}><IconCheck size={14} /> 保存</button>
                <button className="btn" onClick={() => setDraft(null)}>取消</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MiniKV({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ minWidth: 0 }}>
      <div style={{ fontSize: 9.5, color: 'var(--text-3)' }}>{k}</div>
      <div className="mono" style={{ fontSize: 11.5 }}>{v}</div>
    </div>
  );
}

function Field({ label, children, style }: { label: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <label style={{ display: 'grid', gap: 4, ...style }}>
      <span className="label">{label}</span>
      {children}
    </label>
  );
}

export type { CaseDoc };
