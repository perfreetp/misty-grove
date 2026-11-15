import { FINDING_META, PLAYBACK_SPEEDS, SEGMENT_META } from '../constants';
import { FrameSource, SOURCE_FPS } from '../frames';
import { warmTextures } from '../texture';
import { store } from '../store';
import type { Exam } from '../types';
import { clamp, formatClock, formatFrameStamp } from '../utils';
import { bindActions, html, icon, raw, setHtml, toast } from '../ui';
import { Timeline, segmentKeyAt } from './timeline';
import type { ViewInstance } from './types';

export function createReadingView(): ViewInstance {
  let root: HTMLElement | null = null;
  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;
  let source: FrameSource | null = null;
  let timeline: Timeline | null = null;
  let exam: Exam | null = null;
  let raf = 0;
  let lastTs = 0;
  let frameAccumulator = 0;
  let dirty = true;
  let lastRenderedFrame = -1;
  let unsavedSeconds = 0;
  let pendingAutoPause = false;
  let resizeObserver: ResizeObserver | null = null;
  let lastSignature = '';

  function currentExam(): Exam | undefined {
    return store.selectedExam();
  }

  function readerId(e: Exam): string {
    return store.activeReaderId(e);
  }

  function setCanvasSize(): void {
    if (!canvas) return;
    const host = canvas.parentElement;
    if (!host) return;
    const rect = host.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = Math.max(200, Math.floor(rect.width));
    const h = Math.max(200, Math.floor(rect.height));
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    dirty = true;
  }

  function examRef(): Exam | null {
    return exam;
  }

  async function renderFrameNow(): Promise<void> {
    if (!ctx || !canvas || !source) return;
    const dpr = canvas.width / Math.max(1, parseFloat(canvas.style.width || '1'));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    await source.draw(ctx, canvas.width / dpr, canvas.height / dpr, store.state.reading.frame);
    lastRenderedFrame = store.state.reading.frame;
  }

  function markedFrames(): Set<number> {
    const set = new Set<number>();
    const e = examRef();
    if (!e) return set;
    for (const f of e.findings) {
      set.add(f.frameIndex);
      for (const kf of f.keyframes) set.add(kf.frameIndex);
    }
    return set;
  }

  function loop(ts: number): void {
    raf = requestAnimationFrame(loop);
    if (!examRef() || !source) return;
    const reading = store.state.reading;
    const now = ts || performance.now();
    const delta = lastTs === 0 ? 0 : now - lastTs;
    lastTs = now;
    // Reading time is wall-clock time spent in this exam, paused or playing:
    // a reader studying a still frame is working just as much as one scrubbing.
    if (delta > 0 && delta < 2000 && isReadingThisExam()) {
      unsavedSeconds += delta / 1000;
    }
    if (reading.playing) {
      const speed = reading.speed;
      // real-time frame rate = source fps * speed, capped for stability
      const sourceFps = examRef()?.fps ?? SOURCE_FPS;
      const fps = Math.min(120, sourceFps * speed);
      frameAccumulator += (delta / 1000) * fps;
      const advance = Math.floor(frameAccumulator);
      if (advance > 0) {
        frameAccumulator -= advance;
        const total = source.frameCount;
        let next = reading.frame + advance;
        const marks = markedFrames();
        if (reading.autoPauseOnMark) {
          for (let f = reading.frame + 1; f <= Math.min(total - 1, next); f++) {
            if (marks.has(f)) {
              next = f;
              pendingAutoPause = true;
              break;
            }
          }
        }
        if (next >= total) {
          next = total - 1;
          store.setReading({ frame: next, playing: false });
        } else {
          store.setReading({ frame: next, playing: pendingAutoPause ? false : reading.playing });
        }
        if (pendingAutoPause) {
          pendingAutoPause = false;
          toast(`已停在标记帧 F${next + 1} · ${segmentLabelAt(next)}`, 'warn', 2200);
        }
        dirty = true;
      }
    }
    if (dirty && store.state.reading.frame !== lastRenderedFrame) {
      dirty = false;
      void renderFrameNow().then(() => updateFrameHud());
    } else if (!reading.playing) {
      // play/pause and speed changes don't move the playhead, so refresh the
      // transport chrome directly instead of rebuilding the shell
      updateTransport();
    }
    timeline?.setFrame(store.state.reading.frame);
    if (unsavedSeconds >= 1) {
      flushReadingStats();
    }
  }

  /**
   * True when the mounted view is actually in front of the reader and the exam
   * is in a readable state. This keeps background tabs and locked exams from
   * inflating the reading-time statistic.
   */
  function isReadingThisExam(): boolean {
    if (!examRef() || !root || !root.isConnected) return false;
    if (document.visibilityState !== 'visible') return false;
    const status = examRef()!.status;
    if (status !== 'reading' && status !== 'returned' && status !== 'published') return false;
    if (!source) return false;
    const active = document.activeElement;
    if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) return false;
    return true;
  }

  function segmentLabelAt(frame: number): string {
    const e = examRef();
    if (!e) return '';
    return SEGMENT_META[segmentKeyAt(e, frame)].name;
  }

  let lastTransportKey = '';
  function updateTransport(): void {
    const reading = store.state.reading;
    const key = `${reading.playing}:${reading.speed}:${reading.autoPauseOnMark}`;
    if (key === lastTransportKey) return;
    lastTransportKey = key;
    const playBtn = root?.querySelector('#playBtn');
    if (playBtn) {
      playBtn.innerHTML = String(html`${icon(reading.playing ? 'pause' : 'play')}<span>${reading.playing ? '暂停' : '播放'}</span>`);
      playBtn.classList.toggle('primary', !reading.playing);
    }
    root?.querySelectorAll<HTMLElement>('[data-speed]').forEach((chip) => {
      chip.classList.toggle('active', Number(chip.dataset.speed) === reading.speed);
    });
    const speedNote = root?.querySelector<HTMLElement>('#speedNote');
    if (speedNote) setHtml(speedNote, speedNoteHtml());
    const autopause = root?.querySelector<HTMLInputElement>('[data-act="toggle-autopause"]');
    if (autopause) autopause.checked = reading.autoPauseOnMark;
  }

  let lastHudFrame = -1;
  function updateFrameHud(): void {
    const frame = store.state.reading.frame;
    if (frame === lastHudFrame) return;
    lastHudFrame = frame;
    const e = examRef();
    if (!e) return;
    const segKey = segmentKeyAt(e, frame);
    const seg = e.segments.find((s) => s.key === segKey);
    const stamp = root?.querySelector('#frameStamp');
    if (stamp) stamp.textContent = formatFrameStamp(frame, examRef()?.fps ?? SOURCE_FPS);
    const segLabel = root?.querySelector('#frameSegment');
    if (segLabel) {
      segLabel.textContent = `${SEGMENT_META[segKey].name}${seg ? ` · F${seg.startFrame + 1}–${seg.endFrame}` : ''}`;
      (segLabel as HTMLElement).style.color = SEGMENT_META[segKey].text;
    }
    const playBtn = root?.querySelector('#playBtn');
    if (playBtn) {
      const playing = store.state.reading.playing;
      playBtn.innerHTML = String(html`${icon(playing ? 'pause' : 'play')}<span>${playing ? '暂停' : '播放'}</span>`);
      playBtn.classList.toggle('primary', !playing);
    }
    const playhead = root?.querySelector<HTMLInputElement>('#frameInput');
    if (playhead && document.activeElement !== playhead) playhead.value = String(frame + 1);
    const speedChips = root?.querySelectorAll<HTMLElement>('[data-speed]');
    speedChips?.forEach((chip) => {
      chip.classList.toggle('active', Number(chip.dataset.speed) === store.state.reading.speed);
    });
    const speedNote = root?.querySelector<HTMLElement>('#speedNote');
    if (speedNote) setHtml(speedNote, speedNoteHtml());
    const autopause = root?.querySelector<HTMLInputElement>('[data-act="toggle-autopause"]');
    if (autopause) autopause.checked = store.state.reading.autoPauseOnMark;
    const segChips = root?.querySelectorAll<HTMLElement>('.seg-chip');
    segChips?.forEach((chip) => {
      const key = chip.dataset.seg;
      chip.classList.toggle('active', key === segKey);
    });
    const markHint = root?.querySelector<HTMLElement>('#markHint');
    if (markHint) {
      const isMarked = markedFrames().has(frame);
      markHint.hidden = !isMarked;
    }
    const onFrame = findingAtFrame(e, frame);
    const frameFindings = root?.querySelector<HTMLElement>('#frameFindings');
    if (frameFindings) {
      const total = e.findings.length;
      const badge = frameFindings.querySelector('.tag');
      if (badge) badge.textContent = `${onFrame.length} / ${total} 处`;
      const body = frameFindings.querySelector<HTMLElement>('.current-findings');
      if (body) setHtml(body, currentFindingsHtml(e, frame));
      attachFrameFindings();
    }
  }

  function speedNoteHtml(): ReturnType<typeof html> {
    const e = examRef();
    const speed = store.state.reading.speed;
    const fps = e?.fps ?? SOURCE_FPS;
    return html`${speed < 1
      ? html`<span class="tag cyan">慢放 ${speed}×</span>`
      : speed > 1
        ? html`<span class="tag amber">快放 ${speed}×</span>`
        : html`<span class="tag">原速 1×</span>`}
      <span class="hint">${fps} fps 序列 · 当前 ${Math.round(fps * speed)} 帧/秒</span>`;
  }

  function flushReadingStats(): void {
    const e = examRef();
    if (!e || unsavedSeconds <= 0) return;
    const seconds = unsavedSeconds;
    unsavedSeconds = 0;
    const rid = readerId(e);
    const current = store.assessmentFor(e, rid);
    if (!current?.startedAt) return;
    store.accumulateReadingTime(e, rid, seconds);
    void store.savePlayhead(store.examById(e.id) ?? e, rid, store.state.reading.frame, (current.readingSeconds ?? 0) + seconds);
  }

  function onSeek(frame: number, final: boolean): void {
    if (!examRef()) return;
    if (store.state.reading.playing) store.setReading({ playing: false });
    store.setReading({ frame });
    frameAccumulator = 0;
    dirty = true;
    void renderFrameNow().then(() => updateFrameHud());
    if (final) flushReadingStats();
  }

  function step(delta: number): void {
    const e = examRef();
    if (!e) return;
    if (store.state.reading.playing) store.setReading({ playing: false });
    store.setFrame(store.state.reading.frame + delta, e);
    frameAccumulator = 0;
    dirty = true;
    void renderFrameNow().then(() => updateFrameHud());
  }

  function jumpToSegment(key: string): void {
    const e = examRef();
    if (!e) return;
    const seg = e.segments.find((s) => s.key === key);
    if (!seg) return;
    onSeek(seg.startFrame, true);
    timeline?.setFrame(seg.startFrame);
  }

  function jumpToFinding(f: { frameIndex: number }): void {
    onSeek(f.frameIndex, true);
  }

  function togglePlay(): void {
    const e = examRef();
    if (!e) return;
    if (!source) return;
    const reading = store.state.reading;
    if (!reading.playing && reading.frame >= e.source.frameCount - 1) {
      store.setReading({ frame: 0 });
      frameAccumulator = 0;
      dirty = true;
    }
    store.setReading({ playing: !reading.playing });
    lastTs = 0;
    if (!reading.playing) {
      void store.beginReading(e);
    }
  }

  function setSpeed(speed: number): void {
    store.setReading({ speed });
  }

  function renderShell(): void {
    if (!root) return;
    const e = examRef();
    if (!e) {
      root.innerHTML = String(html`<div class="empty" style="height:100%">
        ${icon('reading')}
        <div class="empty-title">请从左侧选择一条检查单</div>
        <div class="empty-sub">时间轴阅片支持滑杆拖动定位、胃肠分段底色区分与标记帧自动停顿。</div>
      </div>`);
      return;
    }
    const reading = store.state.reading;
    const segKey = segmentKeyAt(e, reading.frame);
    const segMeta = SEGMENT_META[segKey];
    const canBegin = e.status === 'pending' || e.status === 'reading';
    const rid = readerId(e);
    const assessment = store.assessmentFor(e, rid);
    root.innerHTML = String(html`
      <div class="reading-view">
        <div class="reading-stage">
          <div class="stage-top">
            <div class="stage-patient">
              <span class="exam-code">${e.code}</span>
              <span class="stage-name">${e.patientName}</span>
              <span class="stage-meta">${e.patientSex} · ${e.patientAge} 岁</span>
              <span class="status-badge ${canBegin ? 'cyan' : e.status === 'review' ? 'amber' : e.status === 'published' ? 'emerald' : 'rose'}">
                ${e.status === 'pending' ? '待阅片' : e.status === 'reading' ? '阅片中' : e.status === 'review' ? '待审核' : e.status === 'published' ? '已发布' : '已退回'}
              </span>
            </div>
            <div class="stage-actions">
              <span id="markHint" class="mark-hint" hidden>${icon('flag')}标记帧</span>
              <button class="btn sm" data-act="goto-lesions">${icon('lesions')}标注病灶</button>
            </div>
          </div>
          <div class="canvas-host" id="canvasHost">
            <canvas id="frameCanvas"></canvas>
            <div class="stage-overlay" id="stageOverlay">
              <div class="stage-hud">
                <div class="hud-seg" id="frameSegment" style="color:${segMeta.text}">${segMeta.name}</div>
                <div class="hud-stamp mono" id="frameStamp">${formatFrameStamp(reading.frame, e.fps)}</div>
              </div>
              <div class="stage-hud bottom">
                <div class="hud-flag">${raw(Object.values(FINDING_META).map((m) => `<span class="legend-item"><span class="legend-dot" style="background:${m.color}"></span>${m.label}</span>`).join(''))}</div>
                <div class="hud-speed">${reading.speed}× ${reading.playing ? '播放中' : '已暂停'}</div>
              </div>
              ${e.status === 'pending'
                ? html`<div class="stage-cta">
                    <div class="stage-cta-card">
                      <div class="stage-cta-title">检查单等待阅片</div>
                      <div class="stage-cta-sub">开始后检查单状态将变为「阅片中」，阅片时长与进度自动保存。</div>
                      <button class="btn primary" data-act="begin-reading">${icon('play')}开始阅片</button>
                    </div>
                  </div>`
                : ''}
            </div>
          </div>
        </div>
        <div class="reading-side">
          <div class="panel side-panel">
            <div class="panel-head">
              <span class="panel-title"><span class="accent-bar"></span>播放控制</span>
              <span class="tag">${assessment?.startedAt ? `阅片 ${formatClock(assessment.readingSeconds)}` : '未开始'}</span>
            </div>
            <div class="panel-body control-body">
              <div class="transport">
                <button class="btn ghost icon" data-act="step-back" title="上一帧 (←)">${icon('stepBack')}</button>
                <button class="btn" data-act="prev-mark" title="上一标记帧">${icon('prev')}</button>
                <button class="btn primary play-btn" id="playBtn" data-act="toggle-play">${icon(reading.playing ? 'pause' : 'play')}<span>${reading.playing ? '暂停' : '播放'}</span></button>
                <button class="btn" data-act="next-mark" title="下一标记帧">${icon('next')}</button>
                <button class="btn ghost icon" data-act="step-fwd" title="下一帧 (→)">${icon('stepFwd')}</button>
              </div>
              <div class="speed-row">
                <span class="field-label">播放速度</span>
                <div class="speed-chips">
                  ${PLAYBACK_SPEEDS.map(
                    (s) => html`<button class="chip speed ${reading.speed === s ? 'active' : ''}" data-speed="${s}">${s}×</button>`,
                  )}
                </div>
              </div>
              <div class="speed-note" id="speedNote">${speedNoteHtml()}</div>
              <label class="toggle-row">
                <input type="checkbox" data-act="toggle-autopause" ${reading.autoPauseOnMark ? raw('checked') : ''} />
                <span class="toggle-track"><span class="toggle-thumb"></span></span>
                <span>遇到标记帧自动停顿</span>
              </label>
              <div class="frame-jump">
                <label class="field-label" for="frameInput">定位帧</label>
                <input class="input mono" id="frameInput" type="number" min="1" max="${e.source.frameCount}" value="${reading.frame + 1}" data-role="frame-input" aria-label="定位帧号" />
                <span class="hint">共 ${e.source.frameCount} 帧</span>
                <button class="btn sm" data-act="goto-frame">跳转</button>
              </div>
            </div>
          </div>

          <div class="panel side-panel grow">
            <div class="panel-head">
              <span class="panel-title"><span class="accent-bar"></span>胃肠分段</span>
              <span class="hint">拖动时间轴边界可修正</span>
            </div>
            <div class="panel-body seg-body">
              ${e.segments.map((seg) => {
                const meta = SEGMENT_META[seg.key];
                const active = seg.key === segKey;
                const boundaryAdjusted =
                  seg.startAdjustedBy || seg.endAdjustedBy;
                return html`<button class="seg-row ${active ? 'active' : ''}" data-seg="${seg.key}" style="--seg-tint:${meta.tint};--seg-border:${meta.border};--seg-text:${meta.text}">
                  <span class="seg-row-name"><span class="seg-swatch"></span>${seg.name}</span>
                  <span class="seg-row-range mono">F${seg.startFrame + 1}–${seg.endFrame}</span>
                  <span class="seg-row-time mono">${formatClock(seg.startFrame / e.fps)}</span>
                  ${boundaryAdjusted ? html`<span class="seg-edit" title="分段边界已人工修正">${icon('edit')}</span>` : ''}
                </button>`;
              })}
            </div>
          </div>

          <div class="panel side-panel" id="frameFindings">
            <div class="panel-head">
              <span class="panel-title"><span class="accent-bar"></span>当前帧病灶</span>
              <span class="tag">${findingAtFrame(e, reading.frame).length} / ${e.findings.length} 处</span>
            </div>
            <div class="panel-body current-findings" data-frame-findings>
              ${currentFindingsHtml(e, reading.frame)}
            </div>
          </div>
        </div>
        <div class="timeline-panel">
          <div class="timeline-toolbar">
            <span class="panel-title" style="font-size:11.5px"><span class="accent-bar"></span>时间轴</span>
            <span class="tl-legend">
              ${e.segments.map((seg) => html`<button class="tl-seg-btn" data-seg="${seg.key}" style="--seg-text:${SEGMENT_META[seg.key].text}">
                <span class="tl-seg-dot" style="background:${SEGMENT_META[seg.key].border}"></span>${seg.name}
              </button>`)}
            </span>
            <span class="hint" style="margin-left:auto">拖动滑杆定位 · 拖动分段边界修正（记录改动人）· 三角标记为标记帧</span>
          </div>
          <div class="timeline-host" id="timelineHost"></div>
        </div>
      </div>
    `);

    lastSignature = signature(e);
    lastHudFrame = -1;
    canvas = root.querySelector<HTMLCanvasElement>('#frameCanvas');
    ctx = canvas?.getContext('2d') ?? null;
    if (canvas) {
      setCanvasSize();
      if (resizeObserver) resizeObserver.disconnect();
      resizeObserver = new ResizeObserver(() => {
        setCanvasSize();
        void renderFrameNow();
      });
      const host = root.querySelector('#canvasHost');
      if (host) resizeObserver.observe(host);
    }
    source?.dispose();
    source = new FrameSource(e);
    const tlHost = root.querySelector<HTMLElement>('#timelineHost');
    if (tlHost) {
      timeline?.destroy();
      timeline = new Timeline(
        tlHost,
        e,
        {
          onSeek: (frame, final) => onSeek(frame, final),
          onBoundaryChange: async (index, frame) => {
            const current = currentExam();
            if (!current) return;
            const res = await store.moveBoundary(current, index, frame);
            if (!res.ok) {
              toast(res.error ?? '无法修正分段边界', 'err');
              return;
            }
            const user = store.currentUser();
            toast(`分段边界已修正至 F${frame + 1} · 记录改动人 ${user.name}`, 'ok', 2600);
            timeline?.setExam(store.examById(current.id) ?? current);
            refresh();
          },
          onBoundaryPreview: () => {},
          canEditBoundaries: () => {
            const current = currentExam();
            return Boolean(current && store.findingsEditable(current));
          },
        },
        { fps: e.fps },
      );
      timeline.setFrame(reading.frame);
    }
    frameAccumulator = 0;
    dirty = true;
    lastRenderedFrame = -1;
    void renderFrameNow().then(() => updateFrameHud());
    attachFrameFindings();
  }

  function findingAtFrame(e: Exam, frame: number) {
    return e.findings.filter((f) => f.frameIndex === frame || f.keyframes.some((k) => k.frameIndex === frame));
  }

  function currentFindingsHtml(e: Exam, frame: number): ReturnType<typeof html> {
    const onFrame = findingAtFrame(e, frame);
    if (onFrame.length === 0) {
      const nearest = e.findings
        .map((f) => ({ f, d: Math.min(f.frameIndex, ...f.keyframes.map((k) => k.frameIndex)) }))
        .sort((a, b) => Math.abs(a.d - frame) - Math.abs(b.d - frame))[0];
      return html`<div class="hint" style="padding:6px 0;line-height:1.6">
        当前帧未登记病灶。${nearest ? html`最近标记在 F${nearest.f.frameIndex + 1}。` : '可在「病灶标注」中框选新病灶。'}
      </div>`;
    }
    return html`${onFrame.map(
      (f) => html`<button class="mini-finding" data-finding="${f.id}" data-jump="${f.frameIndex}">
        <span class="legend-dot" style="background:${FINDING_META[f.type].color}"></span>
        <span>${FINDING_META[f.type].label}</span>
        <span class="mono hint">${f.sizeMm ?? '?'} mm</span>
        <span class="mono hint">${f.keyframes.length} 关键帧</span>
        <span class="mini-arrow">${icon('arrowRight')}</span>
      </button>`,
    )}`;
  }

  function attachFrameFindings(): void {
    root?.querySelectorAll<HTMLElement>('#frameFindings [data-finding]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.finding;
        if (!id) return;
        const e = currentExam();
        const finding = e?.findings.find((f) => f.id === id);
        if (finding) onSeek(finding.frameIndex, true);
        store.setState({ activeFindingId: id });
        store.setView('lesions');
      });
    });
  }

  function nextMarked(direction: 1 | -1): void {
    const e = currentExam();
    if (!e) return;
    const markers = [...markedFrames()].sort((a, b) => a - b);
    if (markers.length === 0) {
      toast('当前检查单还没有标记帧', 'info', 2200);
      return;
    }
    const cur = store.state.reading.frame;
    const target = direction > 0 ? markers.find((m) => m > cur) : [...markers].reverse().find((m) => m < cur);
    if (target === undefined) {
      toast(direction > 0 ? '已到最后一个标记帧' : '已到第一个标记帧', 'info', 1800);
      return;
    }
    onSeek(target, true);
  }

  const handlers: Record<string, (target: HTMLElement) => void> = {
    'toggle-play': () => togglePlay(),
    'step-back': () => step(-1),
    'step-fwd': () => step(1),
    'prev-mark': () => nextMarked(-1),
    'next-mark': () => nextMarked(1),
    'goto-frame': () => {
      const input = root?.querySelector<HTMLInputElement>('#frameInput');
      const e = currentExam();
      if (!input || !e) return;
      const v = Number(input.value);
      if (!Number.isFinite(v)) return;
      // The input shows 1-based frame numbers to match the HUD and F labels.
      onSeek(clamp(Math.round(v) - 1, 0, e.source.frameCount - 1), true);
    },
    'begin-reading': () => {
      const e = currentExam();
      if (!e) return;
      void store.beginReading(store.examById(e.id) ?? e).then(() => {
        toast('已开始阅片，检查单状态更新为「阅片中」', 'ok');
        refresh();
      });
    },
    'goto-lesions': () => {
      store.setView('lesions');
      store.setState({ activeFindingId: null });
    },
  };

  function signature(e: Exam | undefined): string {
    if (!e) return 'none';
    return [
      e.id,
      e.status,
      e.source.frameCount,
      e.findings.map((f) => `${f.id}:${f.frameIndex}:${f.keyframes.length}`).join(','),
      e.segments.map((s) => `${s.key}:${s.startFrame}:${s.endFrame}:${s.startAdjustedBy ?? ''}:${s.endAdjustedBy ?? ''}`).join(','),
      e.assessments.map((a) => `${a.readerId}:${a.startedAt ?? 0}`).join(','),
      store.state.currentUserId,
    ].join('|');
  }

  function refresh(): void {
    const e = currentExam();
    if (!e) return;
    exam = e;
    // Store emits on every frame tick while scrubbing or playing. Rebuilding the
    // shell there would destroy the timeline mid-drag and stutter playback, so
    // only rebuild when something the layout depends on actually changed.
    const sig = signature(e);
    if (sig === lastSignature) {
      timeline?.setExam(e);
      return;
    }
    const active = document.activeElement;
    if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) {
      timeline?.setExam(e);
      return;
    }
    lastSignature = sig;
    renderShell();
  }

  return {
    mount(el: HTMLElement) {
      root = el;
      const e = currentExam();
      exam = e ?? null;
      renderShell();
      bindActions(el, handlers);
      el.addEventListener('click', onClick);
      el.addEventListener('change', onChange);
      el.addEventListener('keydown', onKeyDown);
      el.addEventListener('focusout', onFocusOut);
      lastTs = 0;
      raf = requestAnimationFrame(loop);
      const examSeed = exam?.source.kind === 'generated' ? exam.source.seed : null;
      if (examSeed !== null) {
        // Build the remaining segment textures during idle time so crossing a
        // boundary later doesn't drop frames.
        const idle = (window as unknown as { requestIdleCallback?: (cb: () => void) => void }).requestIdleCallback;
        const warm = () => {
          const allSegments = exam?.segments.map((x) => x.key) ?? [];
          warmTextures([examSeed], allSegments);
        };
        if (idle) idle(warm);
        else setTimeout(warm, 400);
      }
    },
    update() {
      const e = currentExam();
      const prevId = exam?.id;
      exam = e ?? null;
      if (!e) {
        renderShell();
        return;
      }
      if (prevId !== e.id) {
        renderShell();
        return;
      }
      refresh();
    },
    destroy() {
      flushReadingStats();
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      resizeObserver?.disconnect();
      resizeObserver = null;
      timeline?.destroy();
      timeline = null;
      source?.dispose();
      source = null;
      const host = root;
      host?.removeEventListener('click', onClick);
      host?.removeEventListener('change', onChange);
      host?.removeEventListener('keydown', onKeyDown);
      host?.removeEventListener('focusout', onFocusOut);
      root = null;
    },
  };

  function onClick(ev: Event): void {
    const el = ev.target as HTMLElement;
    const segBtn = el.closest<HTMLElement>('[data-seg]');
    if (segBtn?.dataset.seg) {
      jumpToSegment(segBtn.dataset.seg);
      return;
    }
    const speedBtn = el.closest<HTMLElement>('[data-speed]');
    if (speedBtn?.dataset.speed) {
      setSpeed(Number(speedBtn.dataset.speed));
      return;
    }
    const findingBtn = el.closest<HTMLElement>('[data-finding]');
    if (findingBtn?.dataset.finding) {
      if (findingBtn.dataset.jump) jumpToFinding({ frameIndex: Number(findingBtn.dataset.jump) });
      store.setState({ activeFindingId: findingBtn.dataset.finding });
      store.setView('lesions');
      return;
    }
  }

  function onChange(ev: Event): void {
    const el = ev.target as HTMLInputElement;
    if (el.matches('[data-act="toggle-autopause"]')) {
      store.setReading({ autoPauseOnMark: el.checked });
      toast(el.checked ? '已开启标记帧自动停顿' : '已关闭标记帧自动停顿', 'info', 1800);
    }
  }

  /** Enter in the frame box jumps immediately; leaving the box commits too. */
  function onFocusOut(ev: FocusEvent): void {
    const el = ev.target as HTMLElement;
    if (el instanceof HTMLInputElement && el.id === 'frameInput') {
      handlers['goto-frame']!(el as HTMLElement);
    }
  }

  function onKeyDown(ev: KeyboardEvent): void {
    const target = ev.target as HTMLElement | null;
    if (target?.id === 'frameInput') {
      if (ev.key === 'Enter') {
        ev.preventDefault();
        handlers['goto-frame']!(target);
        (target as HTMLInputElement).blur();
      }
      return;
    }
    const active = document.activeElement;
    if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement || active instanceof HTMLSelectElement) return;
    if (ev.key === ' ') {
      ev.preventDefault();
      togglePlay();
    } else if (ev.key === 'ArrowLeft') {
      ev.preventDefault();
      step(ev.shiftKey ? -10 : -1);
    } else if (ev.key === 'ArrowRight') {
      ev.preventDefault();
      step(ev.shiftKey ? 10 : 1);
    } else if (ev.key === '[') {
      const idx = PLAYBACK_SPEEDS.indexOf(store.state.reading.speed as (typeof PLAYBACK_SPEEDS)[number]);
      setSpeed(PLAYBACK_SPEEDS[Math.max(0, idx - 1)]!);
    } else if (ev.key === ']') {
      const idx = PLAYBACK_SPEEDS.indexOf(store.state.reading.speed as (typeof PLAYBACK_SPEEDS)[number]);
      setSpeed(PLAYBACK_SPEEDS[Math.min(PLAYBACK_SPEEDS.length - 1, idx + 1)]!);
    }
  }
}
