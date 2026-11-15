import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { CaseDoc, MeasurementSummary, Volume } from '../lib/types';
import { Scene3D } from '../render/scene';
import type { SceneLayer } from '../render/scene';
import { Scene3D as _S } from '../render/scene';
import {
  axisLines,
  calciumMesh,
  frameMesh,
  gapTube,
  gridMesh,
  lvotMesh,
  ostiumMarkers,
  ringMesh,
} from '../render/build';
import { assessRelease, simulateDeployment } from '../lib/release';
import type { FrameGeometry } from '../lib/release';
import type { Conventions, ReleaseResult, ValveModel } from '../lib/types';

void _S;

export interface ReleaseLayersInput {
  summary: MeasurementSummary;
  conventions: Conventions;
  volume: Volume | null;
  valve: ValveModel;
  nominalMm: number;
  depthMm: number;
  calcThreshold: number;
  pvlThreshold: number;
  showCalc: boolean;
  showFrame: boolean;
  showRing: boolean;
  showGaps: boolean;
  showAxes: boolean;
  deployProgress?: number;
}

export interface AssembledScene {
  frameGeometry: FrameGeometry;
  layers: SceneLayer[];
  bounds: { center: [number, number, number]; radius: number };
  calciumInfo: { verts: number; tris: number };
}

/** Builds every scene layer for a given valve state. Pure, memo-friendly. */
export function assembleScene(input: ReleaseLayersInput): AssembledScene {
  const { summary, volume, valve, nominalMm, depthMm, calcThreshold, pvlThreshold, conventions } = input;
  const frameGeometry = simulateDeployment(
    valve,
    nominalMm,
    summary.ring,
    summary.calc,
    conventions,
    depthMm,
    summary.lvot?.dAreaMm ?? 0,
  );
  const layers: SceneLayer[] = [];
  let calciumInfo = { verts: 0, tris: 0 };
  const c0 = summary.ring.center;
  // frame the annulus and the deployed frame together
  const center: [number, number, number] = [
    c0[0] + summary.ring.normal[0] * (valve.frameHeightMm * 0.40),
    c0[1] + summary.ring.normal[1] * (valve.frameHeightMm * 0.40),
    c0[2] + summary.ring.normal[2] * (valve.frameHeightMm * 0.40),
  ];
  const radius = Math.max(34, summary.ring.dMaxMm / 2 + valve.frameHeightMm * 0.72);

  if (input.showRing) {
    layers.push({
      id: 'ring',
      mesh: ringMesh(summary),
      kind: 'mesh',
      opacity: 1,
      ambient: 0.5,
      tint: [1, 1, 1],
    });
    const lv = lvotMesh(summary);
    if (lv) layers.push({ id: 'lvot', mesh: lv, kind: 'mesh', opacity: 0.9, ambient: 0.6 });
  }

  if (input.showFrame) {
    const { mesh, skirt } = frameMesh(
      frameGeometry,
      summary,
      valve,
      { depthMm } as unknown as ReleaseResult,
      input.deployProgress ?? 1,
    );
    layers.push({ id: 'frame', mesh, kind: 'mesh', opacity: 1, ambient: 0.34, tint: [1, 1, 1] });
    layers.push({ id: 'skirt', mesh: skirt, kind: 'mesh', opacity: 0.42, ambient: 0.46, tint: [0.82, 0.9, 1] });
  }

  if (input.showCalc && volume && summary.calc) {
    const cm = calciumMesh(volume, summary, calcThreshold);
    calciumInfo = { verts: cm.positions.length / 3, tris: cm.indices.length / 3 };
    if (cm.indices.length) {
      layers.push({ id: 'calcium', mesh: cm, kind: 'mesh', opacity: 1, ambient: 0.58, tint: [1, 1, 1] });
    }
  }

  if (input.showGaps) {
    layers.push({ id: 'gaps', mesh: gapTube(summary, frameGeometry, pvlThreshold), kind: 'mesh', opacity: 1, ambient: 0.7 });
  }

  if (input.showAxes) {
    layers.push({ id: 'ostia', mesh: ostiumMarkers(summary), kind: 'lines', opacity: 1 });
    if (summary.angulation) {
      layers.push({ id: 'axis-aortic', mesh: axisLines(summary, [0.62, 0.82, 0.93]), kind: 'lines', opacity: 0.9 });
    }
  }

  layers.push({
    id: 'grid',
    mesh: gridMesh(center, radius * 1.4, center[2] - Math.max(26, depthMm + 16)),
    kind: 'lines',
    opacity: 0.5,
  });

  return { frameGeometry, layers, bounds: { center, radius }, calciumInfo };
}

export function ReleaseCanvas({
  sceneKey,
  layers,
  bounds,
  onReady,
  className,
  showHint = true,
  initialYaw = 1.15,
  initialPitch = 0.72,
}: {
  sceneKey: string;
  layers: SceneLayer[];
  bounds: { center: [number, number, number]; radius: number };
  onReady?: (api: { snapshot: () => Promise<string | null>; setCamera: (yaw: number, pitch: number, dist: number) => void }) => void;
  className?: string;
  showHint?: boolean;
  initialYaw?: number;
  initialPitch?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<Scene3D | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const dragRef = useRef<{ x: number; y: number; yaw: number; pitch: number } | null>(null);
  const [ortho, setOrtho] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const s = new Scene3D();
    sceneRef.current = s;
    let disposed = false;
    s.init(canvas)
      .then(() => {
        if (disposed) return;
        setReady(true);
        s.setCamera({
          yaw: initialYaw,
          pitch: initialPitch,
          distance: bounds.radius * 2.5,
          target: bounds.center,
        });
        onReady?.({
          snapshot: () => s.snapshot().catch(() => null),
          setCamera: (yaw, pitch, dist) => s.setCamera({ yaw, pitch, distance: dist }),
        });
      })
      .catch((e) => setError(e instanceof Error ? e.message : String(e)));
    return () => {
      disposed = true;
      s.dispose();
      sceneRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneKey]);

  useEffect(() => {
    sceneRef.current?.setLayers(layers);
  }, [layers, ready]);

  useEffect(() => {
    sceneRef.current?.setCamera({ target: bounds.center, distance: bounds.radius * 2.5 });
  }, [bounds.center, bounds.radius]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { x: e.clientX, y: e.clientY, yaw: 0, pitch: 0 };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    const s = sceneRef.current;
    if (!d || !s) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    s.setCamera({
      yaw: s.camera.yaw - dx * 0.008,
      pitch: Math.max(-1.5, Math.min(1.5, s.camera.pitch + dy * 0.006)),
    });
    d.x = e.clientX;
    d.y = e.clientY;
  };
  const onPointerUp = () => {
    dragRef.current = null;
  };
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const s = sceneRef.current;
    if (!s) return;
    s.setCamera({ distance: Math.max(28, Math.min(520, s.camera.distance * (e.deltaY > 0 ? 1.08 : 0.93))) });
  };

  const views: { name: string; yaw: number; pitch: number }[] = [
    { name: '斜位', yaw: 1.15, pitch: 0.55 },
    { name: '瓣环平面', yaw: 1.15, pitch: 1.42 },
    { name: '侧位', yaw: 2.9, pitch: 0.35 },
    { name: '冠脉面', yaw: 0.42, pitch: 0.18 },
  ];

  return (
    <div className={className} style={{ position: 'relative', background: '#070a10', borderRadius: 9, overflow: 'hidden', border: '1px solid var(--line)', minHeight: 300 }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'grab', touchAction: 'none' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
      />
      {error ? (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', padding: 20 }}>
          <div className="banner banner-danger" style={{ maxWidth: 340 }}>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>三维渲染不可用</div>
              {error}
            </div>
          </div>
        </div>
      ) : null}
      {!ready && !error ? (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: 'var(--text-3)', fontSize: 12 }}>
          正在初始化 WebGPU…
        </div>
      ) : null}
      <div style={{ position: 'absolute', left: 10, top: 8, fontSize: 10.5, color: 'var(--text-3)', display: 'flex', gap: 10, alignItems: 'center' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: ready ? 'var(--green)' : 'var(--text-3)' }} />
          WebGPU
        </span>
        {showHint ? <span>拖拽旋转 · 滚轮缩放</span> : null}
      </div>
      <div style={{ position: 'absolute', right: 8, bottom: 8, display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        {views.map((v) => (
          <button
            key={v.name}
            className="view-btn btn btn-sm"
            style={{ background: 'rgba(12,18,26,0.82)', backdropFilter: 'blur(4px)' }}
            onClick={() => sceneRef.current?.setCamera({ yaw: v.yaw, pitch: v.pitch })}
          >
            {v.name}
          </button>
        ))}
      </div>
      <button
        className="btn btn-sm"
        style={{ position: 'absolute', right: 8, top: 8, background: 'rgba(12,18,26,0.82)' }}
        onClick={() => setOrtho((o) => !o)}
        title="视角切换"
      >
        {ortho ? '透视' : '正视'}
      </button>
    </div>
  );
}

export function useScene(input: ReleaseLayersInput) {
  return useMemo(() => assembleScene(input), [
    input.summary,
    input.conventions,
    input.volume,
    input.valve,
    input.nominalMm,
    input.depthMm,
    input.calcThreshold,
    input.pvlThreshold,
    input.showCalc,
    input.showFrame,
    input.showRing,
    input.showGaps,
    input.showAxes,
    input.deployProgress,
  ]);
}

export { assessRelease };
export type { CaseDoc };
