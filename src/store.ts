import { DEFAULT_READER, PLAYBACK_SPEEDS, SEGMENT_META, SECOND_READER } from './constants';
import { storage } from './db';
import { defaultSegments, segmentForFrame } from './frames';
import type {
  Assessment,
  AuditEvent,
  Exam,
  ExamRegistrationInput,
  ExamStatus,
  Finding,
  FindingType,
  Keyframe,
  ReportFindingSnapshot,
  ReportVersion,
  SegmentKey,
  User,
  ValidationIssue,
  ValidationResult,
  ViewKey,
  Box,
} from './types';
import { clamp, naturalCompare, uid } from './utils';

const PLAYBACK_PREFS_KEY = 'capsule-station:playback';

export interface FindingDraft {
  id: string | null;
  type: FindingType;
  sizeMm: number | null;
  frameIndex: number;
  box: Box;
  note: string;
}

export interface FilterState {
  status: ExamStatus | 'all';
  query: string;
  reader: string;
}

export interface AppState {
  ready: boolean;
  users: User[];
  currentUserId: string;
  view: ViewKey;
  exams: Exam[];
  audit: AuditEvent[];
  selectedExamId: string | null;
  filter: FilterState;
  reading: {
    frame: number;
    playing: boolean;
    speed: number;
    autoPauseOnMark: boolean;
  };
  activeFindingId: string | null;
  findingDraft: FindingDraft | null;
  busy: string | null;
  storageError: string | null;
}

type Listener = () => void;

const FPS = 30;

function nowIso(): number {
  return Date.now();
}

function blankAssessments(exam: Pick<Exam, 'readers' | 'readerNames'>): Assessment[] {
  return exam.readers.map((id) => ({
    readerId: id,
    readerName: exam.readerNames[id] ?? id,
    conclusion: '',
    impression: '',
    startedAt: null,
    submittedAt: null,
    readingSeconds: 0,
    updatedAt: 0,
  }));
}

export class Store {
  state: AppState = {
    ready: false,
    users: [],
    currentUserId: DEFAULT_READER.id,
    view: 'registry',
    exams: [],
    audit: [],
    selectedExamId: null,
    filter: { status: 'all', query: '', reader: 'all' },
    reading: { frame: 0, playing: false, speed: 4, autoPauseOnMark: true },
    activeFindingId: null,
    findingDraft: null,
    busy: null,
    storageError: null,
  };

  private listeners = new Set<Listener>();
  private commitQueue: Promise<void> = Promise.resolve();

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private emit(): void {
    for (const fn of this.listeners) fn();
  }

  setState(patch: Partial<AppState>): void {
    this.state = { ...this.state, ...patch };
    this.emit();
  }

  async init(users: User[], initialUserId: string): Promise<void> {
    this.loadPlaybackPrefs();
    try {
      await storage.init();
      let exams = (await storage.listExams()).map(normalizeExam);
      const audit = await storage.listAudit();
      if (exams.length === 0) {
        exams = await this.seedDemoExams(users);
      }
      this.state = {
        ...this.state,
        ready: true,
        users,
        currentUserId: initialUserId,
        exams,
        audit,
        selectedExamId: exams[0]?.id ?? null,
      };
    } catch (err) {
      this.state = {
        ...this.state,
        ready: true,
        users,
        currentUserId: initialUserId,
        storageError: err instanceof Error ? err.message : String(err),
      };
    }
    this.emit();
  }

  currentUser(): User {
    return this.state.users.find((u) => u.id === this.state.currentUserId) ?? this.state.users[0]!;
  }

  setUser(id: string): void {
    this.setState({ currentUserId: id, activeFindingId: null, findingDraft: null });
  }

  setView(view: ViewKey): void {
    this.setState({ view });
  }

  selectExam(id: string | null): void {
    if (this.state.selectedExamId === id) return;
    this.setState({ selectedExamId: id, activeFindingId: null, findingDraft: null, reading: { ...this.state.reading, frame: 0, playing: false } });
  }

  setFilter(patch: Partial<FilterState>): void {
    this.setState({ filter: { ...this.state.filter, ...patch } });
  }

  examById(id: string | null): Exam | undefined {
    if (!id) return undefined;
    return this.state.exams.find((e) => e.id === id);
  }

  selectedExam(): Exam | undefined {
    return this.examById(this.state.selectedExamId);
  }

  participatingReaders(exam: Exam): string[] {
    return exam.readers.length > 0 ? exam.readers : [DEFAULT_READER.id];
  }

  assessmentFor(exam: Exam, readerId: string): Assessment | undefined {
    return exam.assessments.find((a) => a.readerId === readerId);
  }

  /** Reader currently "on duty" for the exam: the current user if they are a reader, else the primary reader. */
  activeReaderId(exam: Exam): string {
    const user = this.currentUser();
    if (user.role === 'reader' && exam.readers.includes(user.id)) return user.id;
    // Fall back to the reader who is still owed a submission, else the primary.
    const pending = this.pendingReaders(exam)[0];
    if (pending) return pending;
    return exam.readers[0] ?? DEFAULT_READER.id;
  }

  /**
   * Readers can revise conclusions while the exam is in progress, after a
   * return, and while a correction draft is being prepared. Once the report is
   * published without an open correction, conclusions are frozen.
   */
  conclusionEditable(exam: Exam): boolean {
    if (exam.status === 'reading' || exam.status === 'returned' || exam.status === 'pending') return true;
    return exam.status === 'published' && exam.amendment?.status === 'draft';
  }

  allReadersSubmitted(exam: Exam): boolean {
    return exam.readers.every((id) => Boolean(this.assessmentFor(exam, id)?.submittedAt));
  }

  pendingReaders(exam: Exam): string[] {
    return exam.readers.filter((id) => !this.assessmentFor(exam, id)?.submittedAt);
  }

  // ---------- persistence helpers ----------

  private enqueue(fn: () => Promise<void>): void {
    this.commitQueue = this.commitQueue.then(fn).catch((err) => {
      console.error('[store] 持久化失败', err);
      this.setState({ storageError: err instanceof Error ? err.message : String(err) });
    });
  }

  private async persistExam(exam: Exam, auditEvents: AuditEvent[] = []): Promise<void> {
    this.state = {
      ...this.state,
      exams: this.state.exams.map((e) => (e.id === exam.id ? exam : e)),
      audit: [...auditEvents, ...this.state.audit],
    };
    this.emit();
    this.enqueue(async () => {
      await storage.saveExam(exam);
      await storage.appendAudit(auditEvents);
    });
  }

  private audit(exam: Exam, kind: AuditEvent['kind'], message: string, user?: User): AuditEvent {
    const u = user ?? this.currentUser();
    return {
      id: uid('ev'),
      examId: exam.id,
      at: nowIso(),
      byId: u.id,
      byName: u.name,
      kind,
      message,
    };
  }

  private touch(exam: Exam): Exam {
    return { ...exam, updatedAt: nowIso() };
  }

  // ---------- registration / import ----------

  async nextExamCode(): Promise<string> {
    const year = new Date().getFullYear();
    const prefix = `CE-${year}-`;
    const existing = this.state.exams
      .map((e) => e.code)
      .filter((c) => c.startsWith(prefix))
      .map((c) => parseInt(c.slice(prefix.length), 10))
      .filter((n) => Number.isFinite(n));
    const next = existing.length ? Math.max(...existing) + 1 : 1;
    return `${prefix}${String(next).padStart(4, '0')}`;
  }

  async registerExam(input: ExamRegistrationInput): Promise<{ ok: boolean; examId?: string; error?: string }> {
    const user = this.currentUser();
    if (user.role !== 'technician') {
      return { ok: false, error: '仅内镜技师可执行登记导入' };
    }
    if (!input.patientName.trim()) return { ok: false, error: '请填写受检者姓名' };
    if (!input.indication.trim()) return { ok: false, error: '请填写检查适应证' };

    const files = [...input.files].sort((a, b) => naturalCompare(a.name, b.name));
    if (input.sourceKind === 'imported') {
      if (files.length < 4) return { ok: false, error: '图像序列至少需要 4 个文件（按文件名自然排序）' };
      const bad = files.find((f) => !f.type.startsWith('image/'));
      if (bad) return { ok: false, error: `文件 ${bad.name} 不是受支持的图像格式` };
    }

    this.setState({ busy: '正在登记检查单…' });
    try {
      const code = await this.nextExamCode();
      const frameCount = input.sourceKind === 'imported' ? files.length : 1800;
      const readerIds = input.dualReading ? [DEFAULT_READER.id, SECOND_READER.id] : [DEFAULT_READER.id];
      const readerNames: Record<string, string> = {};
      for (const id of readerIds) {
        const u = this.state.users.find((x) => x.id === id);
        readerNames[id] = u?.name ?? id;
      }
      const exam: Exam = {
        id: uid('exam'),
        code,
        patientName: input.patientName.trim(),
        patientSex: input.patientSex,
        patientAge: input.patientAge,
        indication: input.indication.trim(),
        notes: input.notes.trim(),
        source:
          input.sourceKind === 'imported'
            ? { kind: 'imported', frameCount: files.length, importedFiles: files.map((f) => f.name) }
            : { kind: 'generated', seed: Math.floor(Math.random() * 1_000_000) + 1, frameCount },
        // Exported capsule archives run at a few frames per second; short clips
        // would otherwise show every timestamp as 00:00.
        fps: input.sourceKind === 'imported' ? (files.length >= 600 ? 30 : 4) : 30,
        status: 'pending',
        dualReading: input.dualReading,
        readers: readerIds,
        readerNames,
        segments: defaultSegments(frameCount),
        findings: [],
        assessments: [],
        reportVersions: [],
        amendment: null,
        readPositions: {},
        registeredBy: user.id,
        registeredByName: user.name,
        registeredAt: nowIso(),
        updatedAt: nowIso(),
        submittedAt: null,
        publishedAt: null,
        lastReturn: null,
        returnCount: 0,
      };
      exam.assessments = blankAssessments(exam);

      let frames;
      if (input.sourceKind === 'imported') {
        this.setState({ busy: `正在导入 ${files.length} 帧图像…` });
        frames = await Promise.all(
          files.map(async (file, index) => ({
            key: `${exam.id}:${index}`,
            examId: exam.id,
            frameIndex: index,
            blob: file,
          })),
        );
        for (let i = 0; i < frames.length; i += 60) {
          await storage.putFrames(frames.slice(i, i + 60));
        }
      }

      const audit = [this.audit(exam, 'register', `登记检查单 ${exam.code} · ${exam.patientName}`)];
      if (input.sourceKind === 'imported') {
        audit.push(this.audit(exam, 'import', `导入图像序列 ${files.length} 帧：${files[0]!.name} … ${files[files.length - 1]!.name}`));
      }
      await storage.saveExam(exam);
      await storage.appendAudit(audit);
      await this.refreshFromDb(exam.id);
      return { ok: true, examId: exam.id };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    } finally {
      this.setState({ busy: null });
    }
  }

  private async refreshFromDb(selectId?: string): Promise<void> {
    const [exams, audit] = await Promise.all([storage.listExams(), storage.listAudit()]);
    this.setState({
      exams,
      audit,
      selectedExamId: selectId ?? this.state.selectedExamId ?? exams[0]?.id ?? null,
    });
  }

  // ---------- reading session ----------

  setReading(patch: Partial<AppState['reading']>): void {
    this.setState({ reading: { ...this.state.reading, ...patch } });
    if ('speed' in patch || 'autoPauseOnMark' in patch) {
      this.persistPlaybackPrefs();
    }
  }

  // Playback preferences are a per-viewer convenience, not exam data: keeping
  // them in localStorage avoids touching IndexedDB on every speed change.
  private persistPlaybackPrefs(): void {
    try {
      localStorage.setItem(
        PLAYBACK_PREFS_KEY,
        JSON.stringify({
          speed: this.state.reading.speed,
          autoPauseOnMark: this.state.reading.autoPauseOnMark,
        }),
      );
    } catch {
      /* storage may be unavailable; preferences simply won't persist */
    }
  }

  private loadPlaybackPrefs(): void {
    try {
      const raw = localStorage.getItem(PLAYBACK_PREFS_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { speed?: unknown; autoPauseOnMark?: unknown };
      const speed = typeof parsed.speed === 'number' && PLAYBACK_SPEEDS.includes(parsed.speed as (typeof PLAYBACK_SPEEDS)[number]) ? parsed.speed : null;
      this.state = {
        ...this.state,
        reading: {
          ...this.state.reading,
          speed: speed ?? this.state.reading.speed,
          autoPauseOnMark: typeof parsed.autoPauseOnMark === 'boolean' ? parsed.autoPauseOnMark : this.state.reading.autoPauseOnMark,
        },
      };
    } catch {
      /* ignore malformed preferences */
    }
  }

  setFrame(frame: number, exam?: Exam): void {
    const target = exam ?? this.selectedExam();
    if (!target) return;
    const max = target.source.frameCount - 1;
    const clamped = clamp(Math.round(frame), 0, max);
    this.setState({ reading: { ...this.state.reading, frame: clamped } });
  }

  togglePlay(): void {
    this.setState({ reading: { ...this.state.reading, playing: !this.state.reading.playing } });
  }

  stopPlay(): void {
    if (this.state.reading.playing) this.setState({ reading: { ...this.state.reading, playing: false } });
  }

  /** Marks the exam as 阅片中 for the current reader and keeps a persisted playhead. */
  async beginReading(exam: Exam): Promise<void> {
    if (exam.status !== 'pending' && exam.status !== 'reading') return;
    const readerId = this.activeReaderId(exam);
    if (!exam.readers.includes(readerId)) return;
    const user = this.state.users.find((u) => u.id === readerId)!;
    const assessment = this.assessmentFor(exam, readerId);
    if (assessment && assessment.startedAt) {
      if (exam.status === 'pending') {
        const next: Exam = this.touch({ ...exam, status: 'reading' });
        await this.persistExam(next, [this.audit(next, 'read', `${user.name} 继续阅片`, user)]);
      }
      return;
    }
    const updated: Exam = this.touch({
      ...exam,
      status: 'reading',
      assessments: exam.assessments.map((a) =>
        a.readerId === readerId ? { ...a, startedAt: a.startedAt ?? nowIso(), updatedAt: nowIso() } : a,
      ),
    });
    if (!updated.assessments.some((a) => a.readerId === readerId)) {
      updated.assessments.push({
        readerId,
        readerName: user.name,
        conclusion: '',
        impression: '',
        startedAt: nowIso(),
        submittedAt: null,
        readingSeconds: 0,
        updatedAt: nowIso(),
      });
    }
    await this.persistExam(updated, [this.audit(updated, 'read', `${user.name} 开始阅片`, user)]);
  }

  accumulateReadingTime(exam: Exam, readerId: string, seconds: number): void {
    if (seconds <= 0) return;
    const updated: Exam = {
      ...exam,
      assessments: exam.assessments.map((a) =>
        a.readerId === readerId ? { ...a, readingSeconds: Math.round((a.readingSeconds + seconds) * 10) / 10, updatedAt: nowIso() } : a,
      ),
      updatedAt: nowIso(),
    };
    this.state = { ...this.state, exams: this.state.exams.map((e) => (e.id === exam.id ? updated : e)) };
    this.emit();
    this.enqueue(async () => {
      await storage.saveExam(updated);
    });
  }

  async savePlayhead(exam: Exam, readerId: string, frame: number, seconds: number): Promise<void> {
    const updated: Exam = {
      ...exam,
      readPositions: { ...exam.readPositions, [readerId]: { frame, readingSeconds: seconds } },
    };
    this.state = { ...this.state, exams: this.state.exams.map((e) => (e.id === exam.id ? updated : e)) };
    this.emit();
    this.enqueue(async () => {
      await storage.saveExam(updated);
    });
  }

  // ---------- segments ----------

  async moveBoundary(exam: Exam, boundaryIndex: number, frame: number): Promise<{ ok: boolean; error?: string }> {
    const user = this.currentUser();
    if (exam.status === 'review') return { ok: false, error: '报告待审核中，分段已锁定' };
    if (!this.findingsEditable(exam)) return { ok: false, error: '已发布报告需先发起更正版本才能修改分段' };
    if (boundaryIndex < 1 || boundaryIndex >= exam.segments.length) return { ok: false, error: '无效的分段边界' };
    const maxFrame = exam.source.frameCount;
    const prev = exam.segments[boundaryIndex - 1]!;
    const next = exam.segments[boundaryIndex]!;
    const clamped = clamp(Math.round(frame), prev.startFrame + 1, next.endFrame - 1);
    if (clamped === prev.endFrame) return { ok: true };
    const segments = exam.segments.map((s, i) => {
      if (i === boundaryIndex - 1) {
        return { ...s, endFrame: clamped, endAdjustedBy: user.name, endAdjustedAt: nowIso() };
      }
      if (i === boundaryIndex) {
        return { ...s, startFrame: clamped, startAdjustedBy: user.name, startAdjustedAt: nowIso() };
      }
      return s;
    });
    void maxFrame;
    const updated: Exam = this.touch({ ...exam, segments });
    await this.persistExam(updated, [
      this.audit(
        updated,
        'boundary',
        `${user.name} 将 ${prev.name}/${next.name} 分段边界修正至 F${clamped + 1}（${(clamped / FPS).toFixed(1)}s）`,
      ),
    ]);
    return { ok: true };
  }

  async resetSegments(exam: Exam): Promise<void> {
    const user = this.currentUser();
    if (exam.status === 'published') return;
    const segments = defaultSegments(exam.source.frameCount).map((s) => ({
      ...s,
      startAdjustedBy: user.name,
      startAdjustedAt: nowIso(),
      endAdjustedBy: user.name,
      endAdjustedAt: nowIso(),
    }));
    const updated: Exam = this.touch({ ...exam, segments });
    await this.persistExam(updated, [this.audit(updated, 'boundary', `${user.name} 重置胃肠分段为默认比例`)]);
  }

  segmentAt(exam: Exam, frame: number): SegmentKey {
    return segmentForFrame(exam, frame);
  }

  // ---------- findings ----------

  startFinding(frame: number): void {
    this.setState({
      activeFindingId: null,
      findingDraft: {
        id: null,
        type: 'bleeding',
        sizeMm: null,
        frameIndex: frame,
        box: { x: 0.36, y: 0.34, w: 0.28, h: 0.24 },
        note: '',
      },
    });
  }

  editFinding(finding: Finding): void {
    this.setState({
      activeFindingId: finding.id,
      findingDraft: {
        id: finding.id,
        type: finding.type,
        sizeMm: finding.sizeMm,
        frameIndex: finding.frameIndex,
        box: { ...finding.box },
        note: finding.note,
      },
      reading: { ...this.state.reading, frame: finding.frameIndex, playing: false },
    });
  }

  updateDraft(patch: Partial<FindingDraft>): void {
    if (!this.state.findingDraft) return;
    this.setState({ findingDraft: { ...this.state.findingDraft, ...patch } });
  }

  cancelFinding(): void {
    this.setState({ activeFindingId: null, findingDraft: null });
  }

  async saveFinding(exam: Exam, draft: FindingDraft): Promise<{ ok: boolean; error?: string; findingId?: string }> {
    const user = this.currentUser();
    if (user.role !== 'reader' && user.role !== 'technician') {
      return { ok: false, error: '仅阅片医师或技师可登记病灶' };
    }
    if (exam.status === 'review') return { ok: false, error: '报告待审核中，病灶已锁定' };
    if (!this.findingsEditable(exam)) return { ok: false, error: '已发布报告需发起更正版本后再修改病灶' };
    const size = draft.sizeMm;
    if (size === null || Number.isNaN(size)) {
      return { ok: false, error: '请填写估计大小（mm）后再保存病灶' };
    }
    if (size <= 0) return { ok: false, error: '估计大小必须大于 0' };
    const box = {
      x: clamp(draft.box.x, 0, 0.98),
      y: clamp(draft.box.y, 0, 0.98),
      w: clamp(draft.box.w, 0.02, 1),
      h: clamp(draft.box.h, 0.02, 1),
    };
    box.w = Math.min(box.w, 1 - box.x);
    box.h = Math.min(box.h, 1 - box.y);
    const frame = clamp(Math.round(draft.frameIndex), 0, exam.source.frameCount - 1);
    const segmentKey = this.segmentAt(exam, frame);
    const existing = draft.id ? exam.findings.find((f) => f.id === draft.id) : undefined;

    let findings: Finding[];
    let findingId: string;
    let auditKind: AuditEvent['kind'];
    let message: string;
    if (existing) {
      findingId = existing.id;
      const sizeChanged = existing.sizeMm !== size || existing.type !== draft.type;
      const frameChanged = existing.frameIndex !== frame;
      const keyframes = existing.keyframes.map((k) =>
        k.frameIndex === frame || !frameChanged
          ? { ...k, frameIndex: frame, segmentKey, segmentName: SEGMENT_META[segmentKey].name }
          : k,
      );
      findings = exam.findings.map((f) =>
        f.id === existing.id
          ? {
              ...f,
              type: draft.type,
              sizeMm: size,
              frameIndex: frame,
              box,
              note: draft.note.trim(),
              keyframes,
              updatedAt: nowIso(),
            }
          : f,
      );
      auditKind = 'finding';
      message = `${user.name} 修改病灶 #${exam.findings.indexOf(existing) + 1}（${SEGMENT_META[segmentKey].name} · F${frame + 1}${sizeChanged ? ` · ${size}mm` : ''}）`;
    } else {
      const id = uid('find');
      findingId = id;
      const finding: Finding = {
        id,
        examId: exam.id,
        type: draft.type,
        sizeMm: size,
        frameIndex: frame,
        box,
        note: draft.note.trim(),
        keyframes: [],
        authorId: user.id,
        authorName: user.name,
        createdAt: nowIso(),
        updatedAt: nowIso(),
      };
      findings = [...exam.findings, finding];
      auditKind = 'finding';
      message = `${user.name} 登记病灶（${segmentLabel(draft.type)} · ${SEGMENT_META[segmentKey].name} · F${frame + 1} · ${size}mm）`;
    }
    let updated: Exam = this.touch({ ...exam, findings });
    if (updated.status === 'pending') {
      // Registering a lesion is real reading work, so the exam moves to 阅片中
      // and the reader's clock starts even if playback was never pressed.
      const readerId = this.activeReaderId(updated);
      const reader = this.state.users.find((u) => u.id === readerId);
      updated = {
        ...updated,
        status: 'reading',
        assessments: updated.assessments.map((a) =>
          a.readerId === readerId ? { ...a, startedAt: a.startedAt ?? nowIso(), updatedAt: nowIso() } : a,
        ),
      };
      if (reader && !updated.assessments.some((a) => a.readerId === readerId)) {
        updated.assessments.push({
          readerId,
          readerName: reader.name,
          conclusion: '',
          impression: '',
          startedAt: nowIso(),
          submittedAt: null,
          readingSeconds: 0,
          updatedAt: nowIso(),
        });
      }
    }
    await this.persistExam(updated, [this.audit(updated, auditKind, message)]);
    this.setState({
      findingDraft: null,
      activeFindingId: findingId,
    });
    return { ok: true, findingId };
  }

  async deleteFinding(exam: Exam, findingId: string): Promise<void> {
    if (exam.status === 'review' || exam.status === 'published') return;
    const finding = exam.findings.find((f) => f.id === findingId);
    if (!finding) return;
    const updated: Exam = this.touch({ ...exam, findings: exam.findings.filter((f) => f.id !== findingId) });
    await this.persistExam(updated, [
      this.audit(updated, 'finding', `${this.currentUser().name} 删除病灶（${segmentLabel(finding.type)} · F${finding.frameIndex + 1}）`),
    ]);
    if (this.state.activeFindingId === findingId) this.setState({ activeFindingId: null });
  }

  async captureKeyframe(exam: Exam, findingId: string): Promise<{ ok: boolean; error?: string; duplicate?: boolean }> {
    const user = this.currentUser();
    if (exam.status === 'review' || exam.status === 'published') {
      return { ok: false, error: '报告已锁定，无法追加关键帧' };
    }
    const finding = exam.findings.find((f) => f.id === findingId);
    if (!finding) return { ok: false, error: '病灶不存在' };
    const frame = this.state.reading.frame;
    if (finding.keyframes.some((k) => k.frameIndex === frame)) {
      return { ok: false, duplicate: true, error: '该时间点已绑定关键帧' };
    }
    const segmentKey = this.segmentAt(exam, frame);
    const keyframe: Keyframe = {
      id: uid('kf'),
      assetId: uid('asset'),
      frameIndex: frame,
      segmentKey,
      segmentName: SEGMENT_META[segmentKey].name,
      capturedAt: nowIso(),
      capturedBy: user.id,
      capturedByName: user.name,
    };
    const findings = exam.findings.map((f) =>
      f.id === findingId ? { ...f, keyframes: [...f.keyframes, keyframe].sort((a, b) => a.frameIndex - b.frameIndex), updatedAt: nowIso() } : f,
    );
    const updated: Exam = this.touch({ ...exam, findings });
    await this.persistExam(updated, [
      this.audit(updated, 'keyframe', `${user.name} 为病灶绑定关键帧 F${frame + 1}（${SEGMENT_META[segmentKey].name}）`),
    ]);
    return { ok: true };
  }

  async removeKeyframe(exam: Exam, findingId: string, keyframeId: string): Promise<void> {
    if (exam.status === 'review' || exam.status === 'published') return;
    const findings = exam.findings.map((f) =>
      f.id === findingId ? { ...f, keyframes: f.keyframes.filter((k) => k.id !== keyframeId), updatedAt: nowIso() } : f,
    );
    const updated: Exam = this.touch({ ...exam, findings });
    await this.persistExam(updated, [this.audit(updated, 'keyframe', `${this.currentUser().name} 解除一张关键帧绑定`)]);
  }

  updateAssessment(exam: Exam, readerId: string, patch: Partial<Assessment>): void {
    if (exam.status === 'review' || exam.status === 'published') return;
    const assessments = exam.assessments.some((a) => a.readerId === readerId)
      ? exam.assessments.map((a) => (a.readerId === readerId ? { ...a, ...patch, updatedAt: nowIso() } : a))
      : [
          ...exam.assessments,
          {
            readerId,
            readerName: exam.readerNames[readerId] ?? readerId,
            conclusion: '',
            impression: '',
            startedAt: nowIso(),
            submittedAt: null,
            readingSeconds: 0,
            updatedAt: nowIso(),
            ...patch,
          },
        ];
    const updated: Exam = this.touch({ ...exam, assessments });
    this.state = { ...this.state, exams: this.state.exams.map((e) => (e.id === exam.id ? updated : e)) };
    this.emit();
    this.enqueue(async () => {
      await storage.saveExam(updated);
    });
  }

  /** Lesions and segment boundaries may be edited until the report is sent for review. */
  findingsEditable(exam: Exam): boolean {
    if (exam.status === 'review') return false;
    if (exam.status === 'published') return exam.amendment?.status === 'draft';
    return true;
  }

  validateForSubmit(exam: Exam): ValidationResult {
    const issues: ValidationIssue[] = [];
    if (exam.findings.length === 0) {
      issues.push({ code: 'no-findings', message: '尚未登记任何病灶，请至少在影像上框选一处病灶或注明未见异常', target: 'lesions' });
    }
    for (let i = 0; i < exam.findings.length; i++) {
      const f = exam.findings[i]!;
      const label = `病灶 #${i + 1}（${SEGMENT_META[this.segmentAt(exam, f.frameIndex)].name} · F${f.frameIndex + 1}）`;
      if (f.sizeMm === null || f.sizeMm === undefined || Number.isNaN(f.sizeMm) || f.sizeMm <= 0) {
        issues.push({ code: 'missing-size', message: `${label} 的估计大小为空`, findingId: f.id, target: 'lesions' });
      }
      if (f.keyframes.length === 0) {
        issues.push({ code: 'missing-keyframe', message: `${label} 未绑定关键帧`, findingId: f.id, target: 'lesions' });
      }
    }
    const readers = this.participatingReaders(exam);
    for (const readerId of readers) {
      const a = this.assessmentFor(exam, readerId);
      if (!a || !a.conclusion.trim()) {
        issues.push({
          code: 'missing-conclusion',
          message: `${exam.readerNames[readerId] ?? readerId} 的镜下结论尚未填写`,
          target: 'report',
        });
      }
    }
    if (issues.length === 0) {
      const hasAbnormal = exam.findings.length > 0;
      const conclusions = readers.map((id) => this.assessmentFor(exam, id)?.conclusion ?? '');
      if (!hasAbnormal && conclusions.every((c) => !/未见|正常|无异常/.test(c))) {
        issues.push({ code: 'no-abnormal-wording', message: '未见病灶时结论需明确写明“未见明显异常”', target: 'report' });
      }
    }
    return { ok: issues.length === 0, issues };
  }

  async submitForReview(exam: Exam): Promise<{ ok: boolean; issues: ValidationIssue[]; waitingFor?: string[] }> {
    const user = this.currentUser();
    const readerId = this.activeReaderId(exam);
    if (user.role !== 'reader') return { ok: false, issues: [{ code: 'role', message: '仅阅片医师可提交阅片结果' }] };
    const amending = exam.status === 'published' && exam.amendment?.status === 'draft';
    if ((exam.status === 'published' && !amending) || exam.status === 'review') {
      return { ok: false, issues: [{ code: 'status', message: '当前状态不可提交阅片' }] };
    }
    const validation = this.validateForSubmit(exam);
    if (!validation.ok) return { ok: false, issues: validation.issues };

    const submission: Assessment = {
      readerId,
      readerName: exam.readerNames[readerId] ?? user.name,
      conclusion: this.assessmentFor(exam, readerId)?.conclusion ?? '',
      impression: this.assessmentFor(exam, readerId)?.impression ?? '',
      startedAt: this.assessmentFor(exam, readerId)?.startedAt ?? nowIso(),
      submittedAt: nowIso(),
      readingSeconds: this.assessmentFor(exam, readerId)?.readingSeconds ?? 0,
      updatedAt: nowIso(),
    };
    let assessments = exam.assessments.map((a) => (a.readerId === readerId ? submission : a));
    if (!assessments.some((a) => a.readerId === readerId)) assessments = [...assessments, submission];

    const waitingFor = exam.readers.filter((id) => {
      const a = assessments.find((x) => x.readerId === id);
      return !a?.submittedAt;
    });
    const readyForReview = waitingFor.length === 0;

    const auditEvents: AuditEvent[] = [
      this.audit(exam, 'submit', `${submission.readerName} 提交阅片结论${readyForReview ? '，双阅完成进入待审核' : '，等待第二阅片人'}`),
    ];

    let reportVersions = exam.reportVersions;
    if (readyForReview) {
      if (exam.amendment) {
        const draft = reportVersions.find((v) => v.id === exam.amendment!.draftVersionId);
        if (draft) {
          reportVersions = reportVersions.map((v) =>
            v.id === draft.id
              ? {
                  ...v,
                  status: 'pending',
                  submittedAt: nowIso(),
                  conclusion: primaryConclusion(exam, assessments),
                  impression: mergeImpressions(exam, assessments),
                  findingsSnapshot: snapshotFindings(exam),
                  segmentsSnapshot: snapshotSegments(exam),
                  readerConclusions: snapshotReaderConclusions(exam, assessments),
                }
              : v,
          );
        }
        auditEvents.push(this.audit(exam, 'amend', `更正版本 v${(exam.amendment.baseVersion ?? 0) + 1} 提交审核`));
      } else {
        const version = (reportVersions.at(-1)?.version ?? 0) + 1;
        const report: ReportVersion = {
          id: uid('rep'),
          examId: exam.id,
          version,
          status: 'pending',
          conclusion: primaryConclusion(exam, assessments),
          impression: mergeImpressions(exam, assessments),
          findingsSnapshot: snapshotFindings(exam),
          segmentsSnapshot: snapshotSegments(exam),
          readerConclusions: snapshotReaderConclusions(exam, assessments),
          authorId: user.id,
          authorName: user.name,
          createdAt: nowIso(),
          submittedAt: nowIso(),
          reviewedAt: null,
          reviewerId: null,
          reviewerName: null,
          reviewComment: '',
          publishedAt: null,
          amendmentReason: null,
          replacesVersion: null,
        };
        reportVersions = [...reportVersions, report];
      }
    }

    const updated: Exam = this.touch({
      ...exam,
      status: readyForReview ? 'review' : 'reading',
      assessments,
      reportVersions,
      submittedAt: readyForReview ? nowIso() : exam.submittedAt,
    });
    await this.persistExam(updated, auditEvents);
    return { ok: true, issues: [], waitingFor: waitingFor.map((id) => exam.readerNames[id] ?? id) };
  }

  // ---------- review / publish ----------

  async reviewReport(
    exam: Exam,
    decision: 'publish' | 'return',
    comment: string,
  ): Promise<{ ok: boolean; error?: string }> {
    const user = this.currentUser();
    if (user.role !== 'reviewer') return { ok: false, error: '仅审核医师可执行审核操作' };
    if (exam.status !== 'review') return { ok: false, error: '当前检查不在待审核状态' };
    if (decision === 'return' && !comment.trim()) return { ok: false, error: '退回时必须填写退回意见' };

    const pendingVersion = [...exam.reportVersions].reverse().find((v) => v.status === 'pending');
    if (!pendingVersion) return { ok: false, error: '未找到待审核的报告版本' };
    const isAmendment = Boolean(exam.amendment);
    const now = nowIso();

    let reportVersions: ReportVersion[];
    let updated: Exam;
    if (decision === 'publish') {
      reportVersions = exam.reportVersions.map((v) => {
        if (v.id === pendingVersion.id) {
          return {
            ...v,
            status: 'published',
            reviewedAt: now,
            reviewerId: user.id,
            reviewerName: user.name,
            reviewComment: comment.trim(),
            publishedAt: now,
          };
        }
        if (v.status === 'published' || v.status === 'superseded') {
          return { ...v, status: 'superseded' };
        }
        return v;
      });
      updated = this.touch({
        ...exam,
        status: 'published',
        reportVersions,
        amendment: null,
        publishedAt: now,
      });
      await this.persistExam(updated, [
        this.audit(
          updated,
          'publish',
          isAmendment
            ? `${user.name} 审核通过更正版本 v${pendingVersion.version}，原 v${pendingVersion.replacesVersion} 保留为历史版本`
            : `${user.name} 审核通过并发布报告 v${pendingVersion.version}`,
        ),
      ]);
    } else {
      reportVersions = exam.reportVersions.map((v) =>
        v.id === pendingVersion.id
          ? {
              ...v,
              status: 'returned',
              reviewedAt: now,
              reviewerId: user.id,
              reviewerName: user.name,
              reviewComment: comment.trim(),
            }
          : v,
      );
      updated = this.touch({
        ...exam,
        status: isAmendment ? 'published' : 'returned',
        reportVersions,
        // A correction that gets sent back stays editable as a draft carrying the
        // reviewer's note, so the reader can revise and resubmit it. The published
        // version remains in force until the correction is approved.
        amendment: exam.amendment
          ? { ...exam.amendment, status: 'draft', returnedComment: comment.trim(), returnedAt: now }
          : null,
        lastReturn: { at: now, byId: user.id, byName: user.name, comment: comment.trim() },
        returnCount: (exam.returnCount ?? 0) + 1,
        // A normal report return sends the whole read back, so both readers
        // resubmit. A returned correction only goes back to the reader who
        // authored it — the other reader's conclusion already stands.
        assessments: exam.assessments.map((a) => {
          if (!a.submittedAt) return a;
          if (isAmendment && a.readerId !== pendingVersion.authorId) return a;
          return { ...a, submittedAt: null };
        }),
      });
      await this.persistExam(updated, [
        this.audit(
          updated,
          'return',
          `${user.name} 退回${isAmendment ? '更正版本' : '报告'}：${comment.trim()}`,
        ),
      ]);
    }
    return { ok: true };
  }

  // ---------- corrections ----------

  async startAmendment(exam: Exam, reason: string): Promise<{ ok: boolean; error?: string }> {
    const user = this.currentUser();
    if (exam.status !== 'published') return { ok: false, error: '仅已发布报告可发起更正' };
    if (!reason.trim()) return { ok: false, error: '请填写更正原因' };
    if (exam.amendment && exam.amendment.status === 'draft') return { ok: false, error: '已存在进行中的更正版本' };
    const published = exam.reportVersions.find((v) => v.status === 'published');
    if (!published) return { ok: false, error: '未找到已发布报告' };
    const nextVersion = (exam.reportVersions.at(-1)?.version ?? published.version) + 1;
    const draft: ReportVersion = {
      ...published,
      id: uid('rep'),
      version: nextVersion,
      status: 'draft',
      findingsSnapshot: snapshotFindings(exam),
      segmentsSnapshot: snapshotSegments(exam),
      readerConclusions: exam.readers.map((id) => ({
        readerId: id,
        readerName: exam.readerNames[id] ?? id,
        conclusion: this.assessmentFor(exam, id)?.conclusion ?? '',
      })),
      authorId: user.id,
      authorName: user.name,
      createdAt: nowIso(),
      submittedAt: null,
      reviewedAt: null,
      reviewerId: null,
      reviewerName: null,
      reviewComment: '',
      publishedAt: null,
      amendmentReason: reason.trim(),
      replacesVersion: published.version,
    };
    const updated: Exam = this.touch({
      ...exam,
      reportVersions: [...exam.reportVersions, draft],
      amendment: {
        reason: reason.trim(),
        requestedBy: user.id,
        requestedByName: user.name,
        requestedAt: nowIso(),
        baseVersion: published.version,
        draftVersionId: draft.id,
        status: 'draft',
        returnedComment: '',
        returnedAt: null,
      },
    });
    await this.persistExam(updated, [
      this.audit(updated, 'amend', `${user.name} 发起更正版本 v${nextVersion}（原 v${published.version} 保留）：${reason.trim()}`),
    ]);
    return { ok: true };
  }

  async cancelAmendment(exam: Exam): Promise<void> {
    if (!exam.amendment || exam.amendment.status !== 'draft' || exam.status !== 'published') return;
    const updated: Exam = this.touch({
      ...exam,
      reportVersions: exam.reportVersions.filter((v) => v.status !== 'draft'),
      amendment: null,
    });
    await this.persistExam(updated, [this.audit(updated, 'amend', `${this.currentUser().name} 撤销更正草稿`)]);
  }

  // ---------- dual reading diff ----------

  conclusionDiff(exam: Exam): { readerId: string; readerName: string; conclusion: string }[] {
    if (exam.readers.length < 2) return [];
    return exam.readers.map((id) => ({
      readerId: id,
      readerName: exam.readerNames[id] ?? id,
      conclusion: this.assessmentFor(exam, id)?.conclusion.trim() ?? '',
    }));
  }

  hasConclusionDisagreement(exam: Exam): boolean {
    const rows = this.conclusionDiff(exam);
    if (rows.length < 2) return false;
    const normalized = rows.map((r) => normalizeConclusion(r.conclusion));
    return new Set(normalized).size > 1;
  }

  /** Findings-level difference between readers is not tracked separately, but we label findings by author for review. */
  findingsByReader(exam: Exam): { authorId: string; authorName: string; count: number }[] {
    const map = new Map<string, { authorId: string; authorName: string; count: number }>();
    for (const f of exam.findings) {
      const row = map.get(f.authorId) ?? { authorId: f.authorId, authorName: f.authorName, count: 0 };
      row.count += 1;
      map.set(f.authorId, row);
    }
    return [...map.values()];
  }

  // ---------- demo seed ----------

  private async seedDemoExams(users: User[]): Promise<Exam[]> {
    const seeds: {
      name: string;
      sex: '男' | '女';
      age: number;
      indication: string;
      status: ExamStatus;
      dual: boolean;
      daysAgo: number;
      generatedAt: number;
      findings: { type: FindingType; frac: number; size: number | null; note: string; frames: number[]; box: Box }[];
      conclusions: string[];
    }[] = [
      {
        name: '王建国',
        sex: '男',
        age: 58,
        indication: '不明原因消化道出血，胃镜及结肠镜阴性',
        status: 'pending',
        dual: false,
        daysAgo: 0,
        generatedAt: 0,
        findings: [],
        conclusions: [],
      },
      {
        name: '李秀兰',
        sex: '女',
        age: 46,
        indication: '缺铁性贫血待查',
        status: 'reading',
        dual: false,
        daysAgo: 1,
        generatedAt: 0,
        findings: [
          { type: 'vascular', frac: 0.48, size: 6.5, note: '空肠中段血管丛扩张，伴轻度渗血', frames: [0.465, 0.472], box: { x: 0.55, y: 0.4, w: 0.18, h: 0.15 } },
        ],
        conclusions: ['空肠血管畸形伴渗血，建议双气囊小肠镜进一步评估'],
      },
      {
        name: '赵鹏',
        sex: '男',
        age: 63,
        indication: '反复腹痛，怀疑克罗恩病',
        status: 'review',
        dual: true,
        daysAgo: 2,
        generatedAt: 0,
        findings: [
          { type: 'ulcer', frac: 0.42, size: 12.4, note: '回肠末段纵行溃疡，覆白苔', frames: [0.405, 0.412], box: { x: 0.3, y: 0.45, w: 0.22, h: 0.2 } },
          { type: 'polyp', frac: 0.6, size: 5.2, note: '回肠中段小息肉样隆起', frames: [0.588], box: { x: 0.6, y: 0.33, w: 0.16, h: 0.14 } },
        ],
        conclusions: [
          '回肠末段纵行溃疡，考虑克罗恩病，建议结合影像与病理',
          '回肠末段溃疡，息肉样隆起，未见活动性出血',
        ],
      },
      {
        name: '孙丽',
        sex: '女',
        age: 39,
        indication: '健康体检，家族性息肉病史',
        status: 'published',
        dual: false,
        daysAgo: 4,
        generatedAt: 0,
        findings: [
          { type: 'polyp', frac: 0.71, size: 8.0, note: '回肠中下段息肉，表面光滑', frames: [0.695, 0.703], box: { x: 0.42, y: 0.5, w: 0.2, h: 0.16 } },
        ],
        conclusions: ['回肠息肉，建议内镜随访'],
      },
      {
        name: '周文斌',
        sex: '男',
        age: 71,
        indication: '黑便，疑似小肠出血',
        status: 'returned',
        dual: false,
        daysAgo: 3,
        generatedAt: 0,
        findings: [
          { type: 'bleeding', frac: 0.55, size: 3.5, note: '空肠活动性渗血', frames: [0.542], box: { x: 0.5, y: 0.42, w: 0.15, h: 0.13 } },
        ],
        conclusions: ['空肠活动性渗血'],
      },
    ];

    const exams: Exam[] = [];
    const audit: AuditEvent[] = [];
    const tech = users.find((u) => u.role === 'technician')!;
    const reviewer = users.find((u) => u.role === 'reviewer')!;
    const readers = users.filter((u) => u.role === 'reader');

    // Case numbers are assigned oldest-first so the newest exam carries the
    // highest sequence, but the array itself stays newest-first (list order).
    const byAge = [...seeds].sort((a, b) => b.daysAgo - a.daysAgo);
    for (let seedIndex = 0; seedIndex < seeds.length; seedIndex++) {
      const seedDef = seeds[seedIndex]!;
      const caseNumber = byAge.indexOf(seedDef) + 1;
      const registeredAt = Date.now() - seedDef.daysAgo * 86_400_000 - 5 * 3_600_000;
      const frameCount = 1800 + seedIndex * 260;
      const year = new Date(registeredAt).getFullYear();
      const readerIds = seedDef.dual ? [readers[0]!.id, readers[1]!.id] : [readers[0]!.id];
      const readerNames: Record<string, string> = {};
      for (const id of readerIds) readerNames[id] = users.find((u) => u.id === id)?.name ?? id;
      const examId = `demo-exam-${seedIndex + 1}`;
      const exam: Exam = {
        id: examId,
        code: `CE-${year}-${String(caseNumber).padStart(4, '0')}`,
        patientName: seedDef.name,
        patientSex: seedDef.sex,
        patientAge: seedDef.age,
        indication: seedDef.indication,
        notes: '',
        source: { kind: 'generated', seed: 24051 + seedIndex * 977, frameCount },
        fps: 30,
        status: seedDef.status,
        dualReading: seedDef.dual,
        readers: readerIds,
        readerNames,
        segments: defaultSegments(frameCount),
        findings: [],
        assessments: [],
        reportVersions: [],
        amendment: null,
        readPositions: {},
        registeredBy: tech.id,
        registeredByName: tech.name,
        registeredAt,
        updatedAt: registeredAt,
        submittedAt: null,
        publishedAt: null,
        lastReturn: null,
        returnCount: seedDef.status === 'returned' ? 1 : 0,
      };

      for (let fi = 0; fi < seedDef.findings.length; fi++) {
        const fdef = seedDef.findings[fi]!;
        const frameIndex = Math.round(fdef.frac * frameCount);
        const author = readers[fi % readers.length]!;
        const finding: Finding = {
          id: `demo-find-${seedIndex}-${fi}`,
          examId,
          type: fdef.type,
          sizeMm: fdef.size,
          frameIndex,
          box: fdef.box,
          note: fdef.note,
          keyframes: fdef.frames.map((fr, ki) => {
            const kfFrame = Math.round(fr * frameCount);
            const kfSeg = segmentForFrame(exam, kfFrame);
            return {
              id: `demo-kf-${seedIndex}-${fi}-${ki}`,
              assetId: `demo-asset-${seedIndex}-${fi}-${ki}`,
              frameIndex: kfFrame,
              segmentKey: kfSeg,
              segmentName: SEGMENT_META[kfSeg].name,
              capturedAt: registeredAt + 1_800_000,
              capturedBy: author.id,
              capturedByName: author.name,
            };
          }),
          authorId: author.id,
          authorName: author.name,
          createdAt: registeredAt + 1_800_000,
          updatedAt: registeredAt + 1_800_000,
        };
        exam.findings.push(finding);
      }

      const startedAt = registeredAt + 1_200_000;
      exam.assessments = readerIds.map((id, ri) => {
        const submitted = ['review', 'published', 'returned'].includes(seedDef.status);
        return {
          readerId: id,
          readerName: readerNames[id] ?? id,
          conclusion: seedDef.conclusions[ri] ?? seedDef.conclusions[0] ?? '',
          impression: '',
          startedAt: seedDef.status === 'pending' ? null : startedAt + ri * 60_000,
          submittedAt: submitted ? registeredAt + 3_600_000 + ri * 240_000 : null,
          readingSeconds: seedDef.status === 'pending' ? 0 : 780 + ri * 320 + seedIndex * 45,
          updatedAt: registeredAt + 3_600_000,
        };
      });

      const submittedAt = exam.assessments.every((a) => a.submittedAt) ? registeredAt + 4_200_000 : null;
      exam.submittedAt = submittedAt;
      if (submittedAt) {
        const version: ReportVersion = {
          id: `demo-report-${seedIndex}-1`,
          examId,
          version: 1,
          status: seedDef.status === 'published' ? 'published' : seedDef.status === 'review' ? 'pending' : 'returned',
          conclusion: seedDef.conclusions[0] ?? '',
          impression: '',
          findingsSnapshot: snapshotFindings(exam),
          segmentsSnapshot: snapshotSegments(exam),
          readerConclusions: snapshotReaderConclusions(exam, exam.assessments),
          authorId: readerIds[0]!,
          authorName: readerNames[readerIds[0]!] ?? '',
          createdAt: submittedAt,
          submittedAt,
          reviewedAt: seedDef.status === 'published' || seedDef.status === 'returned' ? submittedAt + 3_600_000 : null,
          reviewerId: seedDef.status === 'published' || seedDef.status === 'returned' ? reviewer.id : null,
          reviewerName: seedDef.status === 'published' || seedDef.status === 'returned' ? reviewer.name : null,
          reviewComment:
            seedDef.status === 'returned' ? '关键帧仅 1 张，且未描述出血量，请补充后重新提交。' : '',
          publishedAt: seedDef.status === 'published' ? submittedAt + 3_600_000 : null,
          amendmentReason: null,
          replacesVersion: null,
        };
        exam.reportVersions.push(version);
      }
      if (seedDef.status === 'published') exam.publishedAt = registeredAt + 7_800_000;
      if (seedDef.status === 'returned') {
        exam.lastReturn = {
          at: registeredAt + 7_800_000,
          byId: reviewer.id,
          byName: reviewer.name,
          comment: '关键帧仅 1 张，且未描述出血量，请补充后重新提交。',
        };
        exam.assessments = exam.assessments.map((a) => ({ ...a, submittedAt: null }));
      }
      if (seedDef.status === 'published') {
        // add a demo amendment in progress for the published exam
        const published = exam.reportVersions[0]!;
        const draft: ReportVersion = {
          ...published,
          id: `demo-report-${seedIndex}-2`,
          version: 2,
          status: 'draft',
          createdAt: registeredAt + 20_000_000,
          submittedAt: null,
          reviewedAt: null,
          reviewerId: null,
          reviewerName: null,
          reviewComment: '',
          publishedAt: null,
          amendmentReason: '补充描述息肉山田分型',
          replacesVersion: 1,
        };
        exam.reportVersions.push(draft);
        exam.amendment = {
          reason: '补充描述息肉山田分型',
          requestedBy: readerIds[0]!,
          requestedByName: readerNames[readerIds[0]!] ?? '',
          requestedAt: registeredAt + 20_000_000,
          baseVersion: 1,
          draftVersionId: draft.id,
          status: 'draft',
          returnedComment: '',
          returnedAt: null,
        };
        audit.push({
          id: uid('ev'),
          examId,
          at: registeredAt + 20_000_000,
          byId: readerIds[0]!,
          byName: readerNames[readerIds[0]!] ?? '',
          kind: 'amend',
          message: `${readerNames[readerIds[0]!] ?? ''} 发起更正版本 v2（原 v1 保留）：补充描述息肉山田分型`,
        });
      }

      for (const f of exam.findings) {
        for (const k of f.keyframes) {
          audit.push({
            id: uid('ev'),
            examId,
            at: k.capturedAt,
            byId: k.capturedBy,
            byName: k.capturedByName,
            kind: 'keyframe',
            message: `${k.capturedByName} 为病灶绑定关键帧 F${k.frameIndex + 1}（${k.segmentName}）`,
          });
        }
      }
      audit.push({
        id: uid('ev'),
        examId,
        at: registeredAt,
        byId: tech.id,
        byName: tech.name,
        kind: 'register',
        message: `登记检查单 ${exam.code} · ${exam.patientName}`,
      });
      if (exam.submittedAt) {
        audit.push({
          id: uid('ev'),
          examId,
          at: exam.submittedAt,
          byId: exam.assessments[0]!.readerId,
          byName: exam.assessments[0]!.readerName,
          kind: 'submit',
          message: '提交阅片结论',
        });
      }
      if (exam.publishedAt) {
        audit.push({
          id: uid('ev'),
          examId,
          at: exam.publishedAt,
          byId: reviewer.id,
          byName: reviewer.name,
          kind: 'publish',
          message: `审核通过并发布报告 v1`,
        });
      }
      exams.push(exam);
    }

    await storage.saveExams(exams);
    await storage.appendAudit(audit);
    return exams;
  }

  async resetAll(): Promise<void> {
    await storage.clearAll();
    const exams = await this.seedDemoExams(this.state.users);
    const audit = await storage.listAudit();
    this.setState({
      exams,
      audit,
      selectedExamId: exams[0]?.id ?? null,
      reading: { ...this.state.reading, frame: 0, playing: false },
      activeFindingId: null,
      findingDraft: null,
    });
  }
}

/** Fills in fields added after records were first written, so upgrades don't break old data. */
function normalizeExam(exam: Exam): Exam {
  const source = exam.source;
  const fps = exam.fps && exam.fps > 0 ? exam.fps : source.kind === 'imported' && source.frameCount < 600 ? 4 : 30;
  return {
    ...exam,
    fps,
    returnCount: exam.returnCount ?? 0,
    lastReturn: exam.lastReturn ?? null,
    amendment: exam.amendment ?? null,
    readPositions: exam.readPositions ?? {},
    reportVersions: exam.reportVersions ?? [],
    assessments: exam.assessments ?? blankAssessments(exam),
  };
}

export function segmentLabel(type: FindingType): string {
  switch (type) {
    case 'bleeding':
      return '出血';
    case 'ulcer':
      return '溃疡';
    case 'polyp':
      return '息肉';
    case 'vascular':
      return '血管畸形';
  }
}

function normalizeConclusion(text: string): string {
  return text
    .replace(/[\s，,。.;；:：、]/g, '')
    .replace(/考虑|建议|可能|请结合/g, '')
    .toLowerCase();
}

function primaryConclusion(exam: Exam, assessments: Assessment[]): string {
  const first = exam.readers.map((id) => assessments.find((a) => a.readerId === id)).find((a) => a?.conclusion.trim());
  return first?.conclusion.trim() ?? '';
}

function mergeImpressions(exam: Exam, assessments: Assessment[]): string {
  return exam.readers
    .map((id) => assessments.find((a) => a.readerId === id))
    .map((a) => a?.impression.trim())
    .filter(Boolean)
    .join('\n');
}

function snapshotFindings(exam: Exam): ReportFindingSnapshot[] {
  return exam.findings.map((f) => ({
    id: f.id,
    type: f.type,
    sizeMm: f.sizeMm,
    frameIndex: f.frameIndex,
    segmentName: SEGMENT_META[segmentForFrame(exam, f.frameIndex)].name,
    note: f.note,
    keyframeCount: f.keyframes.length,
    authorName: f.authorName,
  }));
}

function snapshotSegments(exam: Exam) {
  return exam.segments.map((s) => ({ key: s.key, name: s.name, startFrame: s.startFrame, endFrame: s.endFrame }));
}

function snapshotReaderConclusions(exam: Exam, assessments: Assessment[]) {
  return exam.readers.map((id) => {
    const a = assessments.find((x) => x.readerId === id);
    return { readerId: id, readerName: exam.readerNames[id] ?? id, conclusion: a?.conclusion.trim() ?? '' };
  });
}

export const store = new Store();
