import { READERS, SEGMENT_META } from '../constants';
import { renderSyntheticFrame } from '../frames';
import { store } from '../store';
import type { Exam, ExamRegistrationInput } from '../types';
import { formatRelative, naturalCompare } from '../utils';
import { bindActions, html, icon, raw, toast } from '../ui';
import type { ViewInstance } from './types';

interface RegistryState {
  patientName: string;
  patientSex: '男' | '女';
  patientAge: string;
  indication: string;
  notes: string;
  sourceKind: 'generated' | 'imported';
  dualReading: boolean;
  files: File[];
  error: string;
  touched: boolean;
}

const DEMO_INDICATIONS = [
  '不明原因消化道出血，胃镜及结肠镜阴性',
  '缺铁性贫血待查',
  '反复腹痛，怀疑克罗恩病',
  '慢性腹泻，疑似小肠病变',
  '健康体检，家族性息肉病史',
];

export function createRegistryView(): ViewInstance {
  let root: HTMLElement | null = null;
  let state: RegistryState = freshState();
  let previewSeeds: number[] = [];
  let examRef: Exam | null = null;
  let lastListSignature = '';

  function examListSignature(): string {
    return [
      store.state.exams.length,
      store.state.exams.map((e) => `${e.id}:${e.status}:${e.findings.length}`).join(','),
      store.state.currentUserId,
    ].join('|');
  }

  function freshState(): RegistryState {
    return {
      patientName: '',
      patientSex: '男',
      patientAge: '',
      indication: '',
      notes: '',
      sourceKind: 'generated',
      dualReading: false,
      files: [],
      error: '',
      touched: false,
    };
  }

  function render(): void {
    if (!root) return;
    const user = store.currentUser();
    const isTech = user.role === 'technician';
    const recent = store.state.exams.slice(0, 4);
    const frameEstimate = state.sourceKind === 'imported' ? state.files.length : 1800;
    root.innerHTML = String(html`
      <div class="registry-view">
        <div class="view-head">
          <div>
            <h1 class="view-title">登记导入</h1>
            <div class="view-sub">内镜技师登记检查单并导入胶囊内镜本地图像序列，导入后进入待阅片队列。</div>
          </div>
          <span class="tag" style="padding:4px 10px">${icon('user')} ${user.name} · ${user.title}</span>
        </div>

        ${isTech
          ? ''
          : html`<div class="notice warn">${icon('alert')}<div>当前身份为「${user.title}」，登记导入仅限内镜技师操作。可在右上角切换身份为「周敏 · 技师」后登记。仍可查看下方流程与最近登记记录。</div></div>`}

        <div class="registry-grid">
          <section class="panel card-form">
            <div class="panel-head">
              <span class="panel-title"><span class="accent-bar"></span>检查单信息</span>
              <span class="tag mono">${state.sourceKind === 'imported' ? `${state.files.length} 帧` : '1800 帧'}</span>
            </div>
            <div class="panel-body">
              <div class="form-grid">
                <div class="field">
                  <span class="field-label">受检者姓名<span class="req">*</span></span>
                  <input class="input ${state.touched && !state.patientName.trim() ? 'invalid' : ''}" data-role="name" value="${state.patientName}" placeholder="如 王建国" autocomplete="off" />
                </div>
                <div class="field">
                  <span class="field-label">性别 / 年龄<span class="req">*</span></span>
                  <div style="display:flex;gap:7px">
                    <select class="select" data-role="sex" style="width:76px">
                      <option value="男" ${state.patientSex === '男' ? raw('selected') : ''}>男</option>
                      <option value="女" ${state.patientSex === '女' ? raw('selected') : ''}>女</option>
                    </select>
                    <input class="input mono ${state.touched && !validAge() ? 'invalid' : ''}" data-role="age" value="${state.patientAge}" placeholder="年龄" inputmode="numeric" style="flex:1" />
                  </div>
                </div>
                <div class="field span-2">
                  <span class="field-label">检查适应证<span class="req">*</span></span>
                  <input class="input ${state.touched && !state.indication.trim() ? 'invalid' : ''}" data-role="indication" value="${state.indication}" placeholder="如 不明原因消化道出血，胃镜阴性" list="indication-list" autocomplete="off" />
                  <datalist id="indication-list">
                    ${DEMO_INDICATIONS.map((d) => html`<option value="${d}"></option>`)}
                  </datalist>
                </div>
                <div class="field span-2">
                  <span class="field-label">备注（可选）</span>
                  <textarea class="textarea" data-role="notes" rows="2" placeholder="服用抗凝药、既往小肠手术史等">${state.notes}</textarea>
                </div>
                <div class="field span-2">
                  <span class="field-label">图像序列来源</span>
                  <div class="seg-toggle">
                    <button class="chip ${state.sourceKind === 'generated' ? 'active' : ''}" data-src="generated">${icon('sparkle')}演示序列（模拟 1800 帧）</button>
                    <button class="chip ${state.sourceKind === 'imported' ? 'active' : ''}" data-src="imported">${icon('upload')}导入本地图像帧</button>
                  </div>
                </div>
                ${state.sourceKind === 'imported'
                  ? html`<div class="field span-2">
                      <div class="dropzone" data-dropzone tabindex="0" role="button" aria-label="选择图像文件">
                        ${icon('upload')}
                        <div class="dropzone-title">拖入图像帧，或点击选择文件</div>
                        <div class="dropzone-sub">支持 JPG / PNG / WebP，按文件名自然排序为播放顺序 · 至少 4 帧</div>
                        <input type="file" accept="image/*" multiple data-file-input hidden />
                      </div>
                      ${state.files.length
                        ? html`<div class="file-list">
                            ${state.files.map(
                              (f, i) => html`<div class="file-row">
                                <span class="idx">${String(i + 1).padStart(3, '0')}</span>
                                <span class="name">${f.name}</span>
                                <span class="size">${(f.size / 1024).toFixed(0)} KB</span>
                                <button class="rm" data-rm-file="${i}" aria-label="移除">${icon('x')}</button>
                              </div>`,
                            )}
                          </div>`
                        : ''}
                    </div>`
                  : html`<div class="field span-2">
                      <div class="projection">
                        <div class="projection-head">
                          <span class="field-label">分段预览</span>
                          <span class="hint">按默认比例自动切分胃肠段，阅片时可在时间轴上拖动修正</span>
                        </div>
                        <div class="seg-strip">
                          ${segmentsFor(frameEstimate).map((seg) => {
                            const meta = SEGMENT_META[seg.key];
                            return html`<div class="seg-strip-part" style="flex:${seg.endFrame - seg.startFrame};--seg-tint:${meta.tint};--seg-border:${meta.border};--seg-text:${meta.text}" title="${meta.name} F${seg.startFrame + 1}–${seg.endFrame}">
                              <span>${meta.short}</span>
                            </div>`;
                          })}
                        </div>
                      </div>
                    </div>`}
                <div class="field span-2">
                  <label class="toggle-row" style="font-size:12.2px">
                    <input type="checkbox" data-role="dual" ${state.dualReading ? raw('checked') : ''} />
                    <span class="toggle-track"><span class="toggle-thumb"></span></span>
                    <span>双人阅片（${READERS.map((r) => r.name).join(' + ')}）· 两人结论差异将在报告审核时并列展示</span>
                  </label>
                </div>
              </div>
              ${state.error ? html`<div class="notice err" style="margin-top:11px">${icon('alert')}<div>${state.error}</div></div>` : ''}
              <div class="form-actions">
                <button class="btn" data-act="reset-form">重置</button>
                <button class="btn primary" data-act="register" ${isTech ? '' : raw('disabled')}>${icon('check')}登记并导入</button>
              </div>
            </div>
          </section>

          <div class="reg-side">
            <section class="panel">
              <div class="panel-head">
                <span class="panel-title"><span class="accent-bar"></span>导入后流程</span>
              </div>
              <div class="panel-body">
                <div class="flow">
                  <div class="flow-step">
                    <span class="flow-num">1</span>
                    <div><div class="flow-title">待阅片</div><div class="flow-desc">检查单进入待阅片队列，阅片医师打开后状态切换为「阅片中」，阅片时长开始累计。</div></div>
                  </div>
                  <div class="flow-step">
                    <span class="flow-num">2</span>
                    <div><div class="flow-title">阅片中 · 标注</div><div class="flow-desc">时间轴逐帧浏览，框选病灶并绑定关键帧；双人阅片时两人分别提交镜下结论。</div></div>
                  </div>
                  <div class="flow-step">
                    <span class="flow-num">3</span>
                    <div><div class="flow-title">待审核</div><div class="flow-desc">所有阅片人提交后生成报告草稿送审，审核医师核对病灶与结论差异。</div></div>
                  </div>
                  <div class="flow-step">
                    <span class="flow-num">4</span>
                    <div><div class="flow-title">已发布 / 已退回</div><div class="flow-desc">审核通过发布正式报告；退回则重新进入阅片。已发布报告修改会生成更正版本并保留旧版。</div></div>
                  </div>
                </div>
              </div>
            </section>

            <section class="panel">
              <div class="panel-head">
                <span class="panel-title"><span class="accent-bar"></span>最近登记</span>
                <span class="tag">${store.state.exams.length} 条</span>
              </div>
              <div class="panel-body">
                <div class="recent-list">
                  ${recent.map(
                    (e) => html`<button class="recent-item" data-open-exam="${e.id}">
                      <span class="status-badge ${statusTone(e.status)}">${statusLabel(e.status)}</span>
                      <span>
                        <span class="recent-name">${e.patientName}</span>
                        <span class="recent-meta"> · ${e.source.frameCount} 帧 · ${e.findings.length} 处病灶</span>
                      </span>
                      <span class="time">${formatRelative(e.registeredAt)}</span>
                    </button>`,
                  )}
                </div>
              </div>
            </section>

            <div class="role-note">
              ${icon('info')}
              <div>数据通过 IndexedDB 保存在本机浏览器，刷新页面不会丢失；可随时导出报告文本。</div>
            </div>
          </div>
        </div>
      </div>
    `);
    lastListSignature = examListSignature();
    bindInputs();
    bindDropzone();
    paintPreview();
  }

  function paintPreview(): void {
    const hosts = root?.querySelectorAll<HTMLCanvasElement>('[data-preview]');
    hosts?.forEach((canvas) => {
      const idx = Number(canvas.dataset.preview);
      const seed = previewSeeds[idx] ?? 42;
      const frameCount = 1800;
      const frameIndex = Math.round((0.05 + idx * 0.09) * frameCount);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const w = canvas.clientWidth || 120;
      const h = canvas.clientHeight || 90;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderSyntheticFrame(ctx, w, h, {
        seed,
        frameIndex,
        frameCount,
        segment: segmentForFraction(frameIndex / frameCount),
        showOverlay: false,
      });
    });
  }

  function bindInputs(): void {
    if (!root) return;
    const name = root.querySelector<HTMLInputElement>('[data-role="name"]');
    name?.addEventListener('input', () => {
      state.patientName = name.value;
      state.error = '';
    });
    const age = root.querySelector<HTMLInputElement>('[data-role="age"]');
    age?.addEventListener('input', () => {
      state.patientAge = age.value.replace(/[^\d]/g, '').slice(0, 3);
      if (age.value !== state.patientAge) age.value = state.patientAge;
    });
    const indication = root.querySelector<HTMLInputElement>('[data-role="indication"]');
    indication?.addEventListener('input', () => {
      state.indication = indication.value;
      state.error = '';
    });
    const notes = root.querySelector<HTMLTextAreaElement>('[data-role="notes"]');
    notes?.addEventListener('input', () => {
      state.notes = notes.value;
    });
    const sex = root.querySelector<HTMLSelectElement>('[data-role="sex"]');
    sex?.addEventListener('change', () => {
      state.patientSex = sex.value === '女' ? '女' : '男';
    });
    const dual = root.querySelector<HTMLInputElement>('[data-role="dual"]');
    dual?.addEventListener('change', () => {
      state.dualReading = dual.checked;
    });
  }

  function bindDropzone(): void {
    const zone = root?.querySelector<HTMLElement>('[data-dropzone]');
    if (!zone) return;
    const input = zone.querySelector<HTMLInputElement>('[data-file-input]');
    const open = () => input?.click();
    zone.addEventListener('click', (ev) => {
      if ((ev.target as HTMLElement).closest('[data-rm-file]')) return;
      open();
    });
    zone.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        open();
      }
    });
    input?.addEventListener('change', () => {
      if (input.files) addFiles([...input.files]);
      input.value = '';
    });
    zone.addEventListener('dragover', (ev) => {
      ev.preventDefault();
      zone.classList.add('dragover');
    });
    zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
    zone.addEventListener('drop', (ev) => {
      ev.preventDefault();
      zone.classList.remove('dragover');
      if (ev.dataTransfer?.files) addFiles([...ev.dataTransfer.files]);
    });
  }

  function addFiles(files: File[]): void {
    const images = files.filter((f) => f.type.startsWith('image/'));
    const rejected = files.length - images.length;
    const existing = new Set(state.files.map((f) => `${f.name}:${f.size}`));
    const merged = [...state.files, ...images.filter((f) => !existing.has(`${f.name}:${f.size}`))];
    state.files = merged.sort((a, b) => naturalCompare(a.name, b.name)).slice(0, 6000);
    if (rejected > 0) toast(`已忽略 ${rejected} 个非图像文件`, 'warn', 3000);
    state.error = '';
    render();
  }

  function validAge(): boolean {
    const n = Number(state.patientAge);
    return Number.isFinite(n) && n >= 1 && n <= 120;
  }

  function validate(): string | null {
    state.touched = true;
    if (!state.patientName.trim()) return '请填写受检者姓名';
    if (!validAge()) return '请填写有效年龄（1–120）';
    if (!state.indication.trim()) return '请填写检查适应证';
    if (state.sourceKind === 'imported') {
      if (state.files.length < 4) return `图像序列至少需要 4 帧，当前 ${state.files.length} 帧`;
    }
    return null;
  }

  async function submit(): Promise<void> {
    const err = validate();
    if (err) {
      state.error = err;
      render();
      return;
    }
    const input: ExamRegistrationInput = {
      patientName: state.patientName,
      patientSex: state.patientSex,
      patientAge: Number(state.patientAge),
      indication: state.indication,
      notes: state.notes,
      dualReading: state.dualReading,
      secondReaderId: state.dualReading ? READERS[1]?.id ?? null : null,
      sourceKind: state.sourceKind,
      files: state.files,
    };
    const res = await store.registerExam(input);
    if (!res.ok || !res.examId) {
      state.error = res.error ?? '登记失败';
      render();
      return;
    }
    const exam = store.examById(res.examId);
    state = freshState();
    toast(`检查单 ${exam?.code ?? ''} 已登记，${exam?.source.frameCount ?? 0} 帧进入待阅片队列`, 'ok', 3600);
    render();
    const created = res.examId;
    setTimeout(() => {
      if (store.state.selectedExamId === created) {
        store.setView('reading');
      }
    }, 60);
  }

  function onClick(ev: Event): void {
    const el = ev.target as HTMLElement;
    const src = el.closest<HTMLElement>('[data-src]');
    if (src?.dataset.src) {
      state.sourceKind = src.dataset.src === 'imported' ? 'imported' : 'generated';
      state.error = '';
      render();
      return;
    }
    const rm = el.closest<HTMLElement>('[data-rm-file]');
    if (rm?.dataset.rmFile) {
      state.files = state.files.filter((_, i) => i !== Number(rm.dataset.rmFile));
      render();
      return;
    }
    const open = el.closest<HTMLElement>('[data-open-exam]');
    if (open?.dataset.openExam) {
      store.selectExam(open.dataset.openExam);
      return;
    }
  }

  return {
    mount(el: HTMLElement) {
      root = el;
      examRef = store.selectedExam() ?? null;
      previewSeeds = [24051, 12781, 61103, 9987];
      render();
      bindActions(el, {
        register: () => void submit(),
        'reset-form': () => {
          state = freshState();
          render();
        },
      });
      el.addEventListener('click', onClick);
    },
    update() {
      const current = store.selectedExam();
      if (current?.id !== examRef?.id) {
        examRef = current ?? null;
      }
      if (!root) return;
      // Only rebuild when the roster/counts changed; otherwise re-rendering on
      // every store tick would clobber whatever the technician is typing.
      const sig = examListSignature();
      if (sig !== lastListSignature) {
        lastListSignature = sig;
        render();
        return;
      }
      const btn = root.querySelector<HTMLButtonElement>('[data-act="register"]');
      if (btn && store.state.busy) {
        btn.disabled = true;
        btn.innerHTML = String(html`<span class="spin"></span>${store.state.busy}`);
      }
    },
    destroy() {
      root = null;
    },
  };
}

function statusTone(status: string): string {
  switch (status) {
    case 'pending':
      return 'slate';
    case 'reading':
      return 'cyan';
    case 'review':
      return 'amber';
    case 'returned':
      return 'rose';
    default:
      return 'emerald';
  }
}

function statusLabel(status: string): string {
  switch (status) {
    case 'pending':
      return '待阅片';
    case 'reading':
      return '阅片中';
    case 'review':
      return '待审核';
    case 'returned':
      return '已退回';
    default:
      return '已发布';
  }
}

function segmentsFor(frameCount: number): Exam['segments'] {
  const fractions: Record<string, [number, number]> = {
    esophagus: [0, 0.07],
    stomach: [0.07, 0.25],
    duodenum: [0.25, 0.34],
    jejunum: [0.34, 0.65],
    ileum: [0.65, 0.92],
    colon: [0.92, 1],
  };
  return (Object.keys(fractions) as Exam['segments'][number]['key'][]).map((key) => ({
    key,
    name: SEGMENT_META[key].name,
    startFrame: Math.round(fractions[key]![0] * frameCount),
    endFrame: Math.round(fractions[key]![1] * frameCount),
    startAdjustedBy: null,
    startAdjustedAt: null,
    endAdjustedBy: null,
    endAdjustedAt: null,
  }));
}

function segmentForFraction(frac: number): Exam['segments'][number]['key'] {
  if (frac < 0.07) return 'esophagus';
  if (frac < 0.25) return 'stomach';
  if (frac < 0.34) return 'duodenum';
  if (frac < 0.65) return 'jejunum';
  if (frac < 0.92) return 'ileum';
  return 'colon';
}

