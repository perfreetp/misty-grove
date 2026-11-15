// ============================================================
// 场景交互控制器：相机操作 / 工具布置 / 悬停拾取 / 标签 / 渲染循环
// ============================================================
import { store } from '../core/store';
import { Renderer } from './renderer';
import { pickSlope } from '../core/geometry';
import { uid } from '../core/engine';
import type { PickHit, ToolId } from '../types';
import { toast } from '../ui/widgets';

interface WallDraft { gradeId: string; startX: number; }

export class SceneController {
  private renderer: Renderer;
  private canvas: HTMLCanvasElement;
  private dragging = false;
  private panning = false;
  private last = { x: 0, y: 0 };
  private wallDraft: WallDraft | null = null;
  private raf = 0;
  private labelLayer: HTMLElement;
  private tooltip: HTMLElement;

  constructor() {
    this.canvas = document.getElementById('glCanvas') as HTMLCanvasElement;
    this.renderer = new Renderer(this.canvas);
    this.labelLayer = document.getElementById('labelLayer')!;
    this.tooltip = document.getElementById('tooltip')!;
    this.renderer.frameTarget(store.state.config);
    this.bindEvents();
    this.loop();
  }

  /** 状态变更后刷新场景数据 */
  sync() {
    this.renderer.frameTarget(store.state.config);
    this.renderer.setScene(store.model, store.state.components, store.selectedGradeId);
    this.renderHud();
    this.renderLegend();
  }

  /** 导入新项目后复位取景 */
  frameTargetExternal(config: { slopeLength: number; topElev: number; toeElev: number }) {
    this.renderer.frameTarget(config);
  }

  private bindEvents() {
    const c = this.canvas;
    c.addEventListener('contextmenu', (e) => e.preventDefault());
    c.addEventListener('mousedown', (e) => {
      this.dragging = true;
      this.panning = e.button === 2 || e.button === 1;
      this.last = { x: e.clientX, y: e.clientY };
    });
    window.addEventListener('mouseup', () => { this.dragging = false; this.panning = false; });
    window.addEventListener('mousemove', (e) => this.onMove(e));
    c.addEventListener('click', (e) => this.onClick(e));
    c.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.renderer.zoom(e.deltaY);
    }, { passive: false });
    c.addEventListener('dblclick', () => this.renderer.frameTarget(store.state.config));
  }

  private moved(e: MouseEvent): boolean {
    return Math.abs(e.clientX - this.last.x) + Math.abs(e.clientY - this.last.y) > 4;
  }

  private onMove(e: MouseEvent) {
    if (!this.dragging) {
      this.onHover(e);
      return;
    }
    const dx = e.clientX - this.last.x;
    const dy = e.clientY - this.last.y;
    if (this.panning) this.renderer.pan(dx, dy);
    else this.renderer.rotate(dx, dy);
    this.last = { x: e.clientX, y: e.clientY };
  }

  private onClick(e: MouseEvent) {
    if (this.moved(e)) return;
    const ray = this.renderer.screenRay(e.clientX, e.clientY);
    const hit = pickSlope(ray, store.model);
    if (!hit) {
      if (store.tool === 'select') store.selectGrade(null);
      return;
    }
    this.applyTool(store.tool, hit);
  }

  private applyTool(tool: ToolId, hit: PickHit) {
    const L = store.state.config.slopeLength;
    switch (tool) {
      case 'select':
        store.selectGrade(hit.gradeId);
        toast(`已选中第${hit.face.index + 1}级坡`, 'info', 1600);
        break;
      case 'frame': {
        const cur = !!store.state.intents.frameEnabled[hit.gradeId];
        store.setFrameEnabled(hit.gradeId, !cur);
        toast(!cur ? `第${hit.face.index + 1}级坡已布置框架梁（6m 分块，与坡顶线对齐）` : '已移除该级框架梁', !cur ? 'ok' : 'warn');
        break;
      }
      case 'ditch': {
        // 点击靠近坡顶线（s 很小）→ 坡顶截水沟；否则在该级坡脚平台生成平台截水沟
        const onTop = hit.s < hit.face.slopeLength * 0.12;
        const gradeId = onTop ? null : hit.gradeId;
        const exists = store.state.intents.ditches.some((d) => d.gradeId === gradeId);
        if (exists) { toast('该位置已有截水沟，可在右栏调整或删除后重建', 'warn'); return; }
        store.updateIntents((d) => {
          d.ditches.push({ id: uid('D'), gradeId, startX: 0, endX: L });
        });
        toast(gradeId === null ? '坡顶截水沟已沿全线生成' : '平台截水沟已生成', 'ok');
        break;
      }
      case 'wall': {
        if (!this.wallDraft || this.wallDraft.gradeId !== hit.gradeId) {
          if (this.wallDraft && this.wallDraft.gradeId !== hit.gradeId) {
            toast('护面墙起止点必须在同一级坡面，已重新设置起点', 'warn');
          }
          this.wallDraft = { gradeId: hit.gradeId, startX: hit.x };
          toast(`护面墙起点 X=${hit.x.toFixed(1)}m，请在同一级坡点击终点`, 'info', 5000);
        } else {
          const startX = Math.min(this.wallDraft.startX, hit.x);
          const endX = Math.max(this.wallDraft.startX, hit.x);
          if (endX - startX < 1) { toast('护面墙长度过短', 'error'); this.wallDraft = null; return; }
          const gradeId = this.wallDraft.gradeId;
          store.updateIntents((d) => {
            d.walls.push({ id: uid('W'), gradeId, startX, endX });
          });
          this.wallDraft = null;
          toast('护面墙已生成', 'ok');
        }
        break;
      }
      case 'monitor': {
        const n = store.state.intents.monitors.length + 1;
        const code = `JC${String(n).padStart(3, '0')}`;
        store.updateIntents((d) => {
          d.monitors.push({
            id: uid('M'), gradeId: hit.gradeId, x: hit.x, s: hit.s,
            kind: '位移监测桩', code,
          });
        });
        toast(`监测点 ${code} 已放置`, 'ok');
        break;
      }
    }
  }

  private onHover(e: MouseEvent) {
    if (store.tool === 'select' || store.role === 'supervisor') {
      this.tooltip.hidden = true;
      this.canvas.style.cursor = 'grab';
      return;
    }
    const ray = this.renderer.screenRay(e.clientX, e.clientY);
    const hit = pickSlope(ray, store.model);
    const rect = this.canvas.getBoundingClientRect();
    if (!hit) { this.tooltip.hidden = true; return; }
    const layer = store.state.config.layers.find(
      (l) => hit.elev >= l.bottomElev,
    ) ?? store.state.config.layers[store.state.config.layers.length - 1];
    this.tooltip.hidden = false;
    this.tooltip.style.left = `${e.clientX - rect.left + 14}px`;
    this.tooltip.style.top = `${e.clientY - rect.top + 14}px`;
    this.tooltip.innerHTML = `<b>第${hit.face.index + 1}级坡</b><br>
      X=${hit.x.toFixed(2)}m · 斜距=${hit.s.toFixed(2)}m<br>
      高程=${hit.elev.toFixed(2)}m · 岩层：${layer.name}（锚杆 L=${layer.anchorLength}m）`;
    this.canvas.style.cursor = 'crosshair';
  }

  private renderHud() {
    const { config } = store.state;
    const boundary = store.model.soilRockBoundaryElev;
    document.getElementById('hud')!.innerHTML = `
      <b>${config.projectName}</b><br>
      桩号 ${config.chainage} · 坡长 ${config.slopeLength}m · 坡高 ${(config.topElev - config.toeElev).toFixed(1)}m<br>
      分级 ${config.grades.length} 级 · 土岩分界高程 ${boundary === null ? '无' : boundary.toFixed(2) + 'm'}<br>
      工具：${toolName(store.tool)} · 角色：${roleName(store.role)}
      <span style="opacity:.6">｜左键旋转 / 右键平移 / 滚轮缩放 / 双击复位</span>`;
  }

  private renderLegend() {
    const layers = store.state.config.layers;
    document.getElementById('legend')!.innerHTML = layers.map((l) =>
      `<div class="li"><span class="sw" style="background:rgb(${l.color.join(',')})"></span>${l.name}（${l.kind === 'soil' ? '土' : '岩'} · 锚杆${l.anchorLength}m）</div>`
    ).join('') + `
      <div class="li"><span class="sw" style="background:rgb(${[46, 158, 242].join(',')})"></span>框架梁</div>
      <div class="li"><span class="sw" style="background:rgb(242,89,82)"></span>锚杆节点（橙=分界加密）</div>
      <div class="li"><span class="sw" style="background:rgb(255,235,77)"></span>土岩分界线</div>`;
  }

  /** 三维标签：监测点编号（HTML 叠加层，跟随世界坐标） */
  private renderLabels() {
    const host = this.labelLayer;
    const wanted = new Map<string, { text: string; pos: [number, number, number] }>();
    for (const m of store.state.components.monitors) {
      wanted.set(`lab_m_${m.id}`, {
        text: m.code,
        pos: [m.pos[0], m.pos[1] + 2.6, m.pos[2]],
      });
    }
    // 删除不再需要的标签
    host.querySelectorAll<HTMLElement>('.lab3d').forEach((node) => {
      if (!wanted.has(node.id)) node.remove();
    });
    // 新增/更新标签
    for (const [id, info] of wanted) {
      let node = host.querySelector<HTMLElement>(`#${id}`);
      if (!node) {
        node = document.createElement('div');
        node.id = id;
        node.className = 'lab3d';
        Object.assign(node.style, {
          position: 'absolute', transform: 'translate(-50%,-120%)',
          background: 'rgba(10,16,24,.85)', border: '1px solid #6d5aa8', borderRadius: '5px',
          padding: '1px 6px', fontSize: '10.5px', color: '#d8ccff', pointerEvents: 'none',
          whiteSpace: 'nowrap',
        });
        host.appendChild(node);
      }
      node.textContent = info.text;
      const sp = this.renderer.worldToScreen(info.pos);
      node.style.display = sp.visible ? 'block' : 'none';
      node.style.left = `${sp.x}px`;
      node.style.top = `${sp.y}px`;
    }
  }

  private loop = () => {
    this.renderer.render();
    this.renderLabels();
    this.raf = requestAnimationFrame(this.loop);
  };

  dispose() { cancelAnimationFrame(this.raf); this.renderer.dispose(); }
}

function toolName(t: ToolId): string {
  return { select: '选择浏览', frame: '锚杆框架梁', ditch: '截水沟', wall: '护面墙', monitor: '监测点' }[t];
}
function roleName(r: string): string {
  return { designer: '设计员', crew: '施工班组', supervisor: '监理' }[r] ?? r;
}
