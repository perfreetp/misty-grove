// 厚度地形图：Canvas 2D 热力图 + 四象限边界 + 标红象限/断裂点
import { createEffect, onCleanup, onMount } from 'solid-js';
import { VOL, quadStats, thicknessGridUm, type QuadCompare } from '../lib/oct';
import { getDevice, getVisit } from '../store';
import type { Visit } from '../types';

interface Props {
  visitId: string;
  compare?: QuadCompare[]; // 传入差分结果时按标红象限加红框
  height?: number;
}

function heatColor(v: number, min: number, max: number): [number, number, number] {
  const t = max === min ? 0.5 : (v - min) / (max - min);
  // 蓝(薄) → 青 → 绿 → 黄 → 红(厚)
  const stops: [number, [number, number, number]][] = [
    [0, [40, 60, 180]],
    [0.25, [30, 170, 200]],
    [0.5, [60, 190, 90]],
    [0.75, [240, 200, 50]],
    [1, [220, 70, 50]],
  ];
  for (let i = 1; i < stops.length; i++) {
    if (t <= stops[i][0]) {
      const [t0, c0] = stops[i - 1];
      const [t1, c1] = stops[i];
      const k = (t - t0) / (t1 - t0);
      return [c0[0] + (c1[0] - c0[0]) * k, c0[1] + (c1[1] - c0[1]) * k, c0[2] + (c1[2] - c0[2]) * k];
    }
  }
  return stops[stops.length - 1][1];
}

export default function ThicknessMap(props: Props) {
  let canvas!: HTMLCanvasElement;
  let ro: ResizeObserver;

  function render() {
    const visit: Visit = getVisit(props.visitId);
    const dev = getDevice(visit.deviceId);
    const grid = thicknessGridUm(visit, dev.scaleZum);
    const ctx = canvas.getContext('2d')!;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const W = rect.width;
    const H = rect.height;
    ctx.clearRect(0, 0, W, H);
    if (!grid.length) {
      ctx.fillStyle = '#8aa';
      ctx.font = '13px sans-serif';
      ctx.fillText('尚未分层，无厚度数据', 12, H / 2);
      return;
    }
    const vals = grid.flat().filter((v): v is number => v != null);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const cw = W / VOL.width;
    const ch = H / VOL.slices;
    for (let s = 0; s < VOL.slices; s++) {
      for (let x = 0; x < VOL.width; x++) {
        const v = grid[s][x];
        if (v == null) {
          ctx.fillStyle = '#3a0d12';
        } else {
          const [r, g, b] = heatColor(v, min, max);
          ctx.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`;
        }
        ctx.fillRect(x * cw, s * ch, Math.ceil(cw), Math.ceil(ch));
        if (v == null) {
          ctx.strokeStyle = 'rgba(255,80,80,0.9)';
          ctx.lineWidth = 1;
          const px = x * cw;
          const py = s * ch;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px + cw, py + ch);
          ctx.moveTo(px + cw, py);
          ctx.lineTo(px, py + ch);
          ctx.stroke();
        }
      }
    }
    // 象限分割线
    ctx.strokeStyle = 'rgba(255,255,255,0.85)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(W / 2, 0);
    ctx.lineTo(W / 2, H);
    ctx.moveTo(0, H / 2);
    ctx.lineTo(W, H / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // 标红象限
    if (props.compare) {
      const flagged = new Set(props.compare.filter((c) => c.flagged).map((c) => c.quad));
      const rects: Record<string, [number, number, number, number]> = {
        ST: [0, 0, W / 2, H / 2],
        SN: [W / 2, 0, W / 2, H / 2],
        IT: [0, H / 2, W / 2, H / 2],
        IN: [W / 2, H / 2, W / 2, H / 2],
      };
      for (const q of flagged) {
        const [x, y, w, h] = rects[q];
        ctx.strokeStyle = '#ff3b3b';
        ctx.lineWidth = 3.5;
        ctx.strokeRect(x + 2, y + 2, w - 4, h - 4);
      }
    }

    // 象限名称
    const names: [string, number, number][] = [
      ['颞上 ST', 8, 16],
      ['鼻上 SN', W / 2 + 8, 16],
      ['颞下 IT', 8, H / 2 + 16],
      ['鼻下 IN', W / 2 + 8, H / 2 + 16],
    ];
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    for (const [t, x, y] of names) ctx.fillText(t, x, y);

    // 色标
    const barW = 120;
    const barH = 8;
    const bx = W - barW - 8;
    const by = H - 16;
    for (let i = 0; i < barW; i++) {
      const [r, g, b] = heatColor(min + ((max - min) * i) / barW, min, max);
      ctx.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`;
      ctx.fillRect(bx + i, by, 1, barH);
    }
    ctx.fillStyle = '#fff';
    ctx.font = '10px sans-serif';
    ctx.fillText(`${min.toFixed(0)}µm`, bx, by - 2);
    ctx.fillText(`${max.toFixed(0)}µm`, bx + barW - 28, by - 2);
  }

  onMount(() => {
    render();
    ro = new ResizeObserver(render);
    ro.observe(canvas);
    onCleanup(() => ro.disconnect());
  });

  createEffect(() => {
    const v = getVisit(props.visitId);
    if (v.layers) JSON.stringify(v.layers);
    void props.compare;
    if (canvas) render();
  });

  return (
    <div class="map-block">
      <canvas ref={canvas} class="thickness-canvas" style={{ height: `${props.height ?? 260}px` }} />
      <QuadTable visitId={props.visitId} compare={props.compare} />
    </div>
  );
}

function QuadTable(props: { visitId: string; compare?: QuadCompare[] }) {
  const stats = () => {
    const v = getVisit(props.visitId);
    const dev = getDevice(v.deviceId);
    return quadStats(v, dev.scaleZum);
  };
  const cmpMap = () => {
    const m = new Map<string, QuadCompare>();
    props.compare?.forEach((c) => m.set(c.quad, c));
    return m;
  };
  return (
    <table class="quad-table">
      <thead>
        <tr>
          <th>象限</th>
          <th>平均厚度(µm)</th>
          <th>最薄点(µm)</th>
          <th>断裂点</th>
          <th>较上次(µm)</th>
          <th>判读</th>
        </tr>
      </thead>
      <tbody>
        {stats().map((q) => {
          const c = cmpMap().get(q.quad);
          return (
            <tr classList={{ flagged: c?.flagged }}>
              <td>{q.label}</td>
              <td>{q.meanUm.toFixed(1)}</td>
              <td>{q.minUm.toFixed(1)}</td>
              <td>{q.breaks > 0 ? <span class="red">{q.breaks}</span> : '0'}</td>
              <td>
                {c?.deltaUm == null ? (
                  '—'
                ) : (
                  <span classList={{ red: c.deltaUm <= -5, green: c.deltaUm > 0 }}>
                    {c.deltaUm > 0 ? '+' : ''}
                    {c.deltaUm.toFixed(1)}
                  </span>
                )}
              </td>
              <td>{c ? c.reason : '—'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
