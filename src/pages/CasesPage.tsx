import React, { useMemo, useRef, useState } from 'react';
import type { CaseDoc, CaseStatus, Priority, Volume, VolumeMeta } from '../lib/types';
import { useStore } from '../state/store';
import { loadDicomSeries } from '../data/dicom';
import { PHANTOM_PRESETS } from '../data/phantom';
import { relativeTime, StatusChip, ROLE_LABEL } from '../components/ui';
import { IconUpload, IconPlus, IconFlask, IconCheck, IconX, IconLayers } from '../components/icons';
import { listVolumes } from '../data/storage';

const STATUS_ORDER: CaseStatus[] = ['待测量', '待审核', '需复核', '已通过'];

export function CasesPage({ onNavigate, onOpenCase }: { onNavigate: (v: string) => void; onOpenCase: (c: CaseDoc, v: string) => void }) {
  const { state } = useStore();
  const [filter, setFilter] = useState<'all' | CaseStatus>('all');
  const [q, setQ] = useState('');
  const [importOpen, setImportOpen] = useState(false);

  const cases = useMemo(() => {
    return state.cases.filter((c) => {
      if (filter !== 'all' && c.status !== filter) return false;
      if (q.trim()) {
        const s = q.trim().toLowerCase();
        return (
          c.patient.name.toLowerCase().includes(s) ||
          c.patient.mrn.toLowerCase().includes(s) ||
          c.orderNo.toLowerCase().includes(s)
        );
      }
      return true;
    });
  }, [state.cases, filter, q]);

  const counts = useMemo(() => {
    const m: Record<string, number> = { all: state.cases.length };
    for (const s of STATUS_ORDER) m[s] = state.cases.filter((c) => c.status === s).length;
    return m;
  }, [state.cases]);

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h2 style={{ fontSize: 17 }}>申请单</h2>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>
            从 HIS 同步的 TAVR 术前测量申请 · 共 {state.cases.length} 条
          </div>
        </div>
        <div style={{ display: 'flex', gap: 7 }}>
          <button className="btn" onClick={() => setImportOpen(true)}>
            <IconUpload size={14} /> 导入 CT 序列
          </button>
          <button className="btn btn-primary" onClick={() => onNavigate('new-case')}>
            <IconPlus size={14} /> 新建申请
          </button>
        </div>
      </div>

      <div className="seg-row">
        <button className={`seg ${filter === 'all' ? 'on' : ''}`} onClick={() => setFilter('all')}>
          全部 <span className="seg-n">{counts.all}</span>
        </button>
        {STATUS_ORDER.map((s) => (
          <button key={s} className={`seg ${filter === s ? 'on' : ''}`} onClick={() => setFilter(s)}>
            {s} <span className="seg-n">{counts[s] ?? 0}</span>
          </button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <input type="text" placeholder="姓名 / 病历号 / 单号" value={q} onChange={(e) => setQ(e.target.value)} style={{ width: 190, height: 28 }} />
        </div>
      </div>

      <div className="case-table card">
        <div className="case-row head">
          <span>患者</span>
          <span>申请单号</span>
          <span>术者</span>
          <span>状态</span>
          <span>瓣环测量</span>
          <span>型号</span>
          <span>更新</span>
          <span />
        </div>
        {cases.length === 0 ? (
          <div style={{ padding: 30, textAlign: 'center', color: 'var(--text-3)', fontSize: 12 }}>没有符合条件的申请单</div>
        ) : null}
        {cases.map((c) => (
          <div className="case-row" key={c.id}>
            <span>
              <div style={{ fontWeight: 500 }}>{c.patient.name}</div>
              <div style={{ fontSize: 10.5, color: 'var(--text-3)' }}>{c.patient.sex} · {c.patient.age} 岁 · {c.patient.mrn}</div>
            </span>
            <span className="mono" style={{ fontSize: 11.5 }}>{c.orderNo}</span>
            <span style={{ fontSize: 12 }}>{c.requester}</span>
            <span><StatusChip status={c.status} /></span>
            <span className="mono" style={{ fontSize: 11.5 }}>
              {c.summary ? (
                <>
                  {c.summary.ring.perimeterMm.toFixed(1)} mm / {c.summary.ring.areaMm2.toFixed(0)} mm²
                  <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{c.summary.contouredSlices} 层轮廓</div>
                </>
              ) : (
                <span style={{ color: 'var(--text-3)' }}>未测量</span>
              )}
            </span>
            <span className="mono" style={{ fontSize: 11.5 }}>
              {c.sizing ? (
                <>
                  {c.sizing.nominalMm} mm
                  <div style={{ fontSize: 10, color: c.sizing.withinRange ? 'var(--green)' : 'var(--amber)' }}>
                    {c.sizing.valveModelName.replace(/^\S+\s/, '')}
                  </div>
                </>
              ) : (
                <span style={{ color: 'var(--text-3)' }}>—</span>
              )}
            </span>
            <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{relativeTime(c.updatedAt)}</span>
            <span style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
              <button className="btn btn-sm" onClick={() => onOpenCase(c, c.status === '待测量' || c.status === '需复核' ? 'measure' : 'release')}>
                {c.status === '待测量' || c.status === '需复核' ? '测量' : '查看'}
              </button>
              {c.status === '待审核' ? (
                <button className="btn btn-sm" onClick={() => onNavigate('review')}>
                  审核
                </button>
              ) : null}
              {c.status === '已通过' ? (
                <button className="btn btn-sm" onClick={() => onOpenCase(c, 'report')}>
                  讨论单
                </button>
              ) : null}
            </span>
          </div>
        ))}
      </div>

      {importOpen ? <ImportDialog onClose={() => setImportOpen(false)} /> : null}
    </div>
  );
}

export function ImportDialog({ onClose, caseId }: { onClose: () => void; caseId?: string }) {
  const { importVolume, attachVolumeToCase, toast, refreshStorage } = useStore();
  const [mode, setMode] = useState<'dicom' | 'phantom'>('dicom');
  const [busy, setBusy] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<{ id: string; meta: VolumeMeta; bytes: number }[]>([]);
  const [phantomId, setPhantomId] = useState(PHANTOM_PRESETS[0].id);
  const inputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    listVolumes().then((v) => setSaved(v.map((x) => ({ id: x.id, meta: x.meta, bytes: x.bytes }))));
  }, []);

  const handleFiles = async (files: FileList | null, fromFolder = false) => {
    if (!files || !files.length) return;
    setBusy(true);
    setError(null);
    setWarnings([]);
    try {
      if (fromFolder) {
        const first = files[0] as File & { webkitRelativePath?: string };
        void first.webkitRelativePath;
      }
      const inputs = [];
      for (const f of Array.from(files)) {
        if (f.size === 0) continue;
        inputs.push({ name: f.name, buffer: await f.arrayBuffer() });
      }
      if (!inputs.length) throw new Error('所选文件为空');
      const seriesId = `series-${Date.now().toString(36)}`;
      const res = loadDicomSeries(inputs, seriesId);
      await importVolume(res.volume, caseId);
      setWarnings(res.warnings);
      toast(`已导入 ${res.volume.depth} 层 CT 序列,保存在浏览器本地`, 'ok');
      refreshStorage();
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  const loadPhantom = async () => {
    setBusy(true);
    setError(null);
    try {
      const spec = PHANTOM_PRESETS.find((p) => p.id === phantomId) ?? PHANTOM_PRESETS[0];
      const vol: Volume = await generatePhantomInWorker(spec.id);
      await importVolume(vol, caseId);
      toast(`已载入体模 ${spec.patientLabel}`, 'ok');
      refreshStorage();
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" style={{ width: 620 }} onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <h3 style={{ fontSize: 14 }}>导入 CT 序列</h3>
            <div style={{ fontSize: 11, color: 'var(--text-3)' }}>DICOM 轴位序列或内置体模 · 数据保存在本机 IndexedDB</div>
          </div>
          <button className="icon-btn" onClick={onClose}><IconX size={15} /></button>
        </div>
        <div style={{ padding: 14 }}>
          <div className="seg-row" style={{ marginBottom: 12 }}>
            <button className={`seg ${mode === 'dicom' ? 'on' : ''}`} onClick={() => setMode('dicom')}>DICOM 序列</button>
            <button className={`seg ${mode === 'phantom' ? 'on' : ''}`} onClick={() => setMode('phantom')}>演示体模</button>
          </div>
          {mode === 'dicom' ? (
            <>
              <div
                className="dropzone"
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFiles(e.dataTransfer.files);
                }}
              >
                <IconUpload size={22} />
                <div style={{ marginTop: 6, fontSize: 12.5 }}>点击选择 DICOM 文件,或拖拽到此处</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 3 }}>
                  支持多选整段轴位序列(.dcm / 无扩展名);按 ImagePositionPatient 自动排序
                </div>
                <input ref={inputRef} type="file" multiple style={{ display: 'none' }} onChange={(e) => handleFiles(e.target.files)} />
              </div>
              <div style={{ marginTop: 10, fontSize: 11, color: 'var(--text-3)', lineHeight: 1.7 }}>
                · 仅解析 16 位未压缩 PixelData;压缩序列(JPEG/RLE)请先在 PACS 端解压。<br />
                · 会按层位置排序并去重,层间距不均匀时钙化体积为估算值。
              </div>
            </>
          ) : (
            <>
              <div style={{ display: 'grid', gap: 7 }}>
                {PHANTOM_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    className={`phantom-row ${phantomId === p.id ? 'on' : ''}`}
                    onClick={() => setPhantomId(p.id)}
                  >
                    <IconFlask size={16} />
                    <div style={{ textAlign: 'left', minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 500 }}>{p.patientLabel}</div>
                      <div style={{ fontSize: 10.5, color: 'var(--text-3)', lineHeight: 1.5 }}>{p.description}</div>
                    </div>
                  </button>
                ))}
              </div>
              <button className="btn btn-primary" style={{ marginTop: 12, width: '100%' }} onClick={loadPhantom} disabled={busy}>
                {busy ? '生成中…' : '载入体模序列'}
              </button>
            </>
          )}
          {busy ? <div style={{ marginTop: 10, fontSize: 11.5, color: 'var(--accent)' }}>正在解析 / 写入本地…</div> : null}
          {error ? <div className="banner banner-danger" style={{ marginTop: 10 }}>{error}</div> : null}
          {warnings.map((w, i) => (
            <div key={i} className="banner banner-warn" style={{ marginTop: 6, fontSize: 11.5 }}>{w}</div>
          ))}

          {saved.length ? (
            <>
              <div className="divider" />
              <div className="section-title">本机已保存的序列</div>
              <div style={{ maxHeight: 150, overflowY: 'auto', display: 'grid', gap: 4 }}>
                {saved.map((s) => (
                  <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, padding: '4px 6px', background: 'var(--panel-2)', borderRadius: 5 }}>
                    <IconLayers size={13} />
                    <span className="mono" style={{ color: 'var(--text-2)' }}>{s.id}</span>
                    <span style={{ color: 'var(--text-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.meta.description}</span>
                    <span className="mono" style={{ marginLeft: 'auto', color: 'var(--text-3)' }}>{(s.bytes / 1048576).toFixed(1)} MB</span>
                    {caseId ? (
                      <button className="btn btn-sm" onClick={() => { attachVolumeToCase(caseId, s.id); toast('已关联到当前申请单', 'ok'); onClose(); }}>
                        关联
                      </button>
                    ) : null}
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function NewCasePage({ onNavigate, onOpenCase }: { onNavigate: (v: string) => void; onOpenCase: (c: CaseDoc, v: string) => void }) {
  const { state, createCase, toast } = useStore();
  const [form, setForm] = useState({
    name: '',
    sex: '男' as '男' | '女',
    age: 76,
    mrn: '',
    operatorId: state.people.find((p) => p.role === 'physician')?.id ?? '',
    priority: '常规' as Priority,
    indication: '',
    phantomId: PHANTOM_PRESETS[0].id,
  });
  const [importNow, setImportNow] = useState(true);

  const submit = async () => {
    if (!form.name.trim() || !form.mrn.trim()) {
      toast('请填写患者姓名与病历号', 'warn');
      return;
    }
    const spec = PHANTOM_PRESETS.find((p) => p.id === form.phantomId) ?? PHANTOM_PRESETS[0];
    const id = `case-${Date.now().toString(36)}`;
    const volumeRef = importNow ? '' : spec.id;
    const doc: CaseDoc = {
      id,
      orderNo: `TAVR-2026-${String(180 + state.cases.length).padStart(4, '0')}`,
      patient: { name: form.name.trim(), sex: form.sex, age: form.age, mrn: form.mrn.trim() },
      operatorId: form.operatorId,
      requester: state.people.find((p) => p.id === form.operatorId)?.name ?? '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      status: '待测量',
      priority: form.priority,
      indication: form.indication,
      notes: '',
      volumeRef,
      measurement: { contours: [], landmarks: [] },
      submissionCount: 0,
      returnCount: 0,
      audit: [{ at: Date.now(), by: '李承泽', role: 'physician', action: '新建申请单', detail: `影像 ${importNow ? '待导入' : spec.patientLabel}` }],
    };
    createCase(doc);
    toast('申请单已创建', 'ok');
    onOpenCase(doc, 'measure');
  };

  return (
    <div className="page" style={{ maxWidth: 760 }}>
      <div className="page-head">
        <div>
          <h2 style={{ fontSize: 17 }}>新建申请单</h2>
          <div style={{ fontSize: 12, color: 'var(--text-3)' }}>通常由 HIS 自动同步;此处用于补录或演示</div>
        </div>
        <button className="btn" onClick={() => onNavigate('cases')}>返回列表</button>
      </div>
      <div className="card" style={{ padding: 18 }}>
        <div className="form-grid">
          <Field label="患者姓名"><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="如 孙学礼" /></Field>
          <Field label="性别">
            <select value={form.sex} onChange={(e) => setForm({ ...form, sex: e.target.value as '男' | '女' })}>
              <option>男</option>
              <option>女</option>
            </select>
          </Field>
          <Field label="年龄"><input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: Number(e.target.value) })} /></Field>
          <Field label="病历号"><input type="text" value={form.mrn} onChange={(e) => setForm({ ...form, mrn: e.target.value })} placeholder="MRN-" /></Field>
          <Field label="术者">
            <select value={form.operatorId} onChange={(e) => setForm({ ...form, operatorId: e.target.value })}>
              {state.people.filter((p) => p.role === 'physician').map((p) => (
                <option key={p.id} value={p.id}>{p.name} · {p.title}</option>
              ))}
            </select>
          </Field>
          <Field label="优先级">
            <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value as Priority })}>
              <option>常规</option>
              <option>优先</option>
              <option>急诊</option>
            </select>
          </Field>
        </div>
        <Field label="手术指征" style={{ marginTop: 12 }}>
          <textarea rows={3} value={form.indication} onChange={(e) => setForm({ ...form, indication: e.target.value })} placeholder="如 重度主动脉瓣狭窄,STS 4.2%,拟行 TAVR" style={{ width: '100%' }} />
        </Field>
        <div className="divider" />
        <label style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12.5 }}>
          <input type="checkbox" checked={importNow} onChange={(e) => setImportNow(e.target.checked)} />
          创建后立即导入 CT 序列
        </label>
        {!importNow ? (
          <Field label="演示体模" style={{ marginTop: 10 }}>
            <select value={form.phantomId} onChange={(e) => setForm({ ...form, phantomId: e.target.value })} style={{ width: '100%' }}>
              {PHANTOM_PRESETS.map((p) => (
                <option key={p.id} value={p.id}>{p.patientLabel}</option>
              ))}
            </select>
          </Field>
        ) : null}
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button className="btn btn-primary" onClick={submit}><IconCheck size={14} /> 创建并进入测量</button>
          <button className="btn" onClick={() => onNavigate('cases')}>取消</button>
        </div>
      </div>
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

export { ROLE_LABEL };

/** Phantom generation is ~2.5 s of CPU; run it off the main thread. */
export function generatePhantomInWorker(id: string): Promise<Volume> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('../workers/phantom.worker.ts', import.meta.url), { type: 'module' });
    const done = (fn: () => void) => {
      worker.terminate();
      fn();
    };
    worker.onmessage = (ev: MessageEvent<{ meta?: Omit<Volume, 'voxels'>; voxels?: ArrayBuffer; error?: string }>) => {
      if (ev.data.error || !ev.data.meta || !ev.data.voxels) {
        done(() => reject(new Error(ev.data.error ?? '体模生成失败')));
        return;
      }
      done(() => resolve({ ...ev.data.meta!, voxels: new Int16Array(ev.data.voxels!) }));
    };
    worker.onerror = (e) => done(() => reject(new Error(e.message || 'Worker 执行失败')));
    worker.postMessage({ id });
  });
}

