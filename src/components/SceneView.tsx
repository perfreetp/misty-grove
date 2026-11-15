import { createEffect, onCleanup, onMount } from 'solid-js';
import { Scene3D } from '../three/Scene3D';
import { flaggedComponentIds, runChecks } from '../lib/engine';
import type { Store } from '../store';

export function SceneView(props: {
  store: Store;
  onSelect: (id: string | null) => void;
}) {
  let host!: HTMLDivElement;
  let scene: Scene3D | undefined;

  onMount(() => {
    scene = new Scene3D(host, {
      onPierDrag: (pierId, x) => {
        const s = props.store.active();
        props.store.updatePier(s.id, pierId, { x });
      },
      onSelect: (id) => props.onSelect(id),
    });
  });

  // 方案或校核状态变化 → 重建场景
  createEffect(() => {
    const s = props.store.active();
    // 订阅所有影响几何的字段
    void [
      s.material,
      s.roadElevation,
      s.lanesPerSide,
      s.laneWidth,
      s.medianWidth,
      s.shoulderWidth,
      s.girderBottomElev,
      s.girderDepth,
      s.deckWidth,
      s.span,
      JSON.parse(JSON.stringify(s.piers)),
      JSON.parse(JSON.stringify(s.approaches)),
      JSON.parse(JSON.stringify(s.pipelines)),
      JSON.parse(JSON.stringify(s.comments)),
    ];
    if (scene) scene.render(s, flaggedComponentIds(runChecks(s)));
  });

  onCleanup(() => scene?.dispose());

  return (
    <div class="scene-wrap" ref={host!}>
      <div class="scene-toolbar">
        <span>🖱️ 左键旋转 · 滚轮缩放 · 右键平移</span>
        <span class="muted">|</span>
        <span>桥墩可沿桥跨方向拖拽移动，实时校核墩位</span>
      </div>
      <div class="scene-hint">
        红色＝强制性错误（净空&lt;5m / 墩位违规，禁止提交）；黄色＝警告（坡度偏陡 / 净空富余不足）；💬＝审核退回意见
      </div>
    </div>
  );
}
