// 随访差分闪烁对比：同一帧位置在本次/上次 B 扫描之间自动交替
import { createSignal, onCleanup, Show } from 'solid-js';
import BScanViewer from './BScanViewer';
import type { Visit } from '../types';
import { VOL } from '../lib/oct';

interface Props {
  current: Visit;
  previous: Visit | null;
  editable: boolean;
  slice: number;
}

export default function CompareView(props: Props) {
  const [flickerOn, setFlickerOn] = createSignal(false);
  const [showCurrent, setShowCurrent] = createSignal(true);
  const [intervalMs, setIntervalMs] = createSignal(700);
  let timer: ReturnType<typeof setInterval> | undefined;

  function stop() {
    if (timer) clearInterval(timer);
    timer = undefined;
  }
  function toggle() {
    if (timer) {
      stop();
      setFlickerOn(false);
    } else {
      setFlickerOn(true);
      timer = setInterval(() => setShowCurrent((v) => !v), intervalMs());
    }
  }
  function manual(which: boolean) {
    stop();
    setFlickerOn(false);
    setShowCurrent(which);
  }
  onCleanup(stop);

  return (
    <div class="compare-box">
      <div class="compare-toolbar">
        <button class="btn" classList={{ primary: flickerOn() }} onClick={toggle}>
          {flickerOn() ? '■ 停止闪烁' : '▶ 开始差分闪烁'}
        </button>
        <button class="btn" classList={{ primary: showCurrent() && !flickerOn() }} onClick={() => manual(true)}>
          仅看本次
        </button>
        <button class="btn" classList={{ primary: !showCurrent() && !flickerOn() }} onClick={() => manual(false)} disabled={!props.previous}>
          仅看上次
        </button>
        <label class="interval-label">
          间隔
          <select value={intervalMs()} onChange={(e) => setIntervalMs(Number(e.currentTarget.value))}>
            <option value={300}>300ms</option>
            <option value={700}>700ms</option>
            <option value={1200}>1200ms</option>
          </select>
        </label>
        <span class="flicker-state">
          当前显示：<b>{showCurrent() ? '本次随访' : '上次随访'}</b>
        </span>
      </div>
      <Show
        when={props.previous}
        fallback={<p class="muted">该眼为首次访视，无上一次随访可对比。</p>}
      >
        <div class="flicker-stage">
          <div class="flicker-pane" classList={{ hidden: !(showCurrent() || flickerOn()) }} style={{ opacity: showCurrent() ? 1 : 0 }}>
            <div class="pane-tag current">本次 · 帧 {props.slice + 1}/{VOL.slices}</div>
            <BScanViewer visit={props.current} slice={props.slice} editable={props.editable && showCurrent()} />
          </div>
          <div class="flicker-pane" classList={{ hidden: showCurrent() && !flickerOn() }} style={{ opacity: showCurrent() ? 0 : 1 }}>
            <div class="pane-tag previous">上次 · 帧 {props.slice + 1}/{VOL.slices}</div>
            <BScanViewer visit={props.previous as Visit} slice={props.slice} editable={false} />
          </div>
        </div>
      </Show>
    </div>
  );
}
