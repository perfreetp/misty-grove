// WebGL2 B 扫描查看器：灰度断层 + ILM/GCL/LC 分层线，支持拖拽修正与断裂标记
import { createEffect, onCleanup, onMount, Show } from 'solid-js';
import { LAYER_COLOR, LAYER_LABEL, LAYER_ORDER, type LayerKind, type Visit } from '../types';
import { VOL, generateBScanPixels, generateRawPixels } from '../lib/oct';
import { getDevice, logLayerEdit, updateLayerPoint } from '../store';

const VERT = `#version 300 es
in vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const IMAGE_FRAG = `#version 300 es
precision highp float;
uniform sampler2D u_tex;
uniform float u_alpha;
out vec4 outColor;
void main() {
  float g = texture(u_tex, vec2(gl_FragCoord.x / float(textureSize(u_tex, 0).x),
                                gl_FragCoord.y / float(textureSize(u_tex, 0).y))).r;
  outColor = vec4(vec3(g), u_alpha);
}
`;

const LINE_FRAG = `#version 300 es
precision highp float;
uniform vec3 u_color;
uniform float u_active;
out vec4 outColor;
void main() {
  vec3 c = mix(u_color, vec3(1.0), u_active * 0.35);
  outColor = vec4(c, 0.95);
}
`;

function compile(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(sh) ?? 'shader compile error');
  }
  return sh;
}

function program(gl: WebGL2RenderingContext, vs: string, fs: string): WebGLProgram {
  const p = gl.createProgram()!;
  gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, vs));
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(p) ?? 'link error');
  }
  return p;
}

interface Props {
  visit: Visit;
  slice: number;
  editable: boolean;
  flicker?: boolean; // 差分闪烁模式（由父组件控制 alpha 切换）
  showRaw?: boolean; // true 时隐藏分层（待分层预览）
}

export default function BScanViewer(props: Props) {
  let canvas!: HTMLCanvasElement;
  let gl: WebGL2RenderingContext;
  let imgProg: WebGLProgram;
  let lineProg: WebGLProgram;
  let vao: WebGLVertexArrayObject;
  let vbo: WebGLBuffer;
  let texture: WebGLTexture;
  let raf = 0;
  let hidden: Record<LayerKind, boolean> = { ILM: false, GCL: false, LC: false };
  let activeLayer: LayerKind | null = null;
  let dragCol = -1;
  let dragLogged = false;
  const cssSize = { w: 760, h: 380 };

  function draw() {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.02, 0.025, 0.035, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // 灰度图像
    gl.useProgram(imgProg);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(gl.getUniformLocation(imgProg, 'u_tex'), 0);
    gl.uniform1f(gl.getUniformLocation(imgProg, 'u_alpha'), props.flicker ? 0.55 : 1.0);
    gl.bindVertexArray(vao);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    // 分层线
    if (!props.showRaw && props.visit.layers) {
      gl.useProgram(lineProg);
      gl.lineWidth(2);
      const W = VOL.width;
      for (const kind of LAYER_ORDER) {
        if (hidden[kind]) continue;
        const curve = props.visit.layers[kind].slice(
          props.slice * W,
          (props.slice + 1) * W,
        );
        const pts: number[] = [];
        for (let x = 0; x < W; x++) {
          const d = curve[x];
          if (d == null) continue;
          pts.push((x + 0.5) / W * 2 - 1, 1 - (d + 0.5) / VOL.height * 2);
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pts), gl.DYNAMIC_DRAW);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        const [r, g, b] = LAYER_COLOR[kind];
        gl.uniform3f(gl.getUniformLocation(lineProg, 'u_color'), r, g, b);
        gl.uniform1f(gl.getUniformLocation(lineProg, 'u_active'), activeLayer === kind ? 1 : 0);
        gl.drawArrays(gl.LINE_STRIP, 0, pts.length / 2);

        // 断裂邻域红叉标记（null 段的边界列）
        const marks: number[] = [];
        for (let x = 1; x < W; x++) {
          if (curve[x] == null && curve[x - 1] != null) {
            const d = curve[x - 1] as number;
            marks.push(...crossMarks(x, d));
          }
          if (curve[x - 1] == null && curve[x] != null) {
            const d = curve[x] as number;
            marks.push(...crossMarks(x, d));
          }
        }
        if (marks.length) {
          gl.uniform3f(gl.getUniformLocation(lineProg, 'u_color'), 1, 0.25, 0.25);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(marks), gl.DYNAMIC_DRAW);
          gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
          gl.drawArrays(gl.LINES, 0, marks.length / 2);
        }
      }
    }
  }

  function crossMarks(col: number, depth: number): number[] {
    const nx = (col + 0.5) / VOL.width * 2 - 1;
    const ny = 1 - (depth + 0.5) / VOL.height * 2;
    const s = 0.018;
    return [nx - s, ny - s, nx + s, ny + s, nx - s, ny + s, nx + s, ny - s];
  }

  function uploadTexture() {
    const dev = getDevice(props.visit.deviceId);
    const px = props.showRaw || !props.visit.layers
      ? generateRawPixels(props.visit.seed, props.slice)
      : generateBScanPixels(props.visit, props.slice, dev.scaleZum);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, VOL.width, VOL.height, 0, gl.RED, gl.UNSIGNED_BYTE, px);
  }

  function scheduleDraw() {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(draw);
  }

  onMount(() => {
    gl = canvas.getContext('webgl2', { antialias: true })!;
    if (!gl) throw new Error('当前浏览器不支持 WebGL2');
    imgProg = program(gl, VERT, IMAGE_FRAG);
    lineProg = program(gl, VERT, LINE_FRAG);
    vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    vbo = gl.createBuffer()!;
    texture = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    // 全屏三角形 quad
    const quad = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      cssSize.w = rect.width;
      cssSize.h = rect.height;
      scheduleDraw();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    onCleanup(() => ro.disconnect());

    uploadTexture();
    draw();
  });

  // 访视/帧变化：重建纹理与线
  createEffect(() => {
    void props.visit.id;
    void props.slice;
    if (gl) {
      uploadTexture();
      scheduleDraw();
    }
  });

  // 分层数据被修正后重绘（纹理中的边界高光也同步刷新）
  createEffect(() => {
    if (props.visit.layers) {
      JSON.stringify(props.visit.layers);
      if (gl) {
        uploadTexture();
        scheduleDraw();
      }
    }
  });

  createEffect(() => {
    void props.flicker;
    scheduleDraw();
  });

  function toVolume(e: { clientX: number; clientY: number }): { col: number; depth: number } {
    const rect = canvas.getBoundingClientRect();
    const fx = (e.clientX - rect.left) / rect.width;
    const fy = (e.clientY - rect.top) / rect.height;
    return {
      col: Math.max(0, Math.min(VOL.width - 1, Math.round(fx * VOL.width - 0.5))),
      depth: Math.max(0, Math.min(VOL.height - 1, fy * VOL.height)),
    };
  }

  function pickLayer(col: number, depth: number): LayerKind | null {
    if (!props.visit.layers) return null;
    let best: LayerKind | null = null;
    let bestDist = 14; // 像素容差
    for (const kind of LAYER_ORDER) {
      const d = props.visit.layers[kind][props.slice * VOL.width + col];
      if (d == null) continue;
      const dist = Math.abs(d - depth);
      if (dist < bestDist) {
        bestDist = dist;
        best = kind;
      }
    }
    return best;
  }

  function onDown(e: PointerEvent) {
    if (!props.editable || !props.visit.layers) return;
    const { col, depth } = toVolume(e);
    const kind = pickLayer(col, depth);
    if (!kind) return;
    activeLayer = kind;
    dragCol = col;
    dragLogged = false;
    canvas.setPointerCapture(e.pointerId);
    canvas.style.cursor = 'grabbing';
  }

  function onMove(e: PointerEvent) {
    const { col, depth } = toVolume(e);
    if (activeLayer && e.buttons === 1) {
      // 拖动经过的列一并吸附，保证曲线连续
      const from = Math.min(dragCol, col);
      const to = Math.max(dragCol, col);
      for (let x = from; x <= to; x++) {
        updateLayerPoint(props.visit.id, activeLayer, props.slice, x, depth);
      }
      dragCol = col;
      if (!dragLogged) {
        logLayerEdit(props.visit.id, activeLayer, props.slice, col);
        dragLogged = true;
      }
      scheduleDraw();
    } else if (props.editable) {
      canvas.style.cursor = pickLayer(col, depth) ? 'grab' : 'crosshair';
    }
  }

  function onUp(e: PointerEvent) {
    if (activeLayer) {
      activeLayer = null;
      canvas.releasePointerCapture(e.pointerId);
      canvas.style.cursor = 'crosshair';
      scheduleDraw();
    }
  }

  /** 双击：在该列标记/修复断裂（null ↔ 插值） */
  function onDblClick(e: MouseEvent) {
    if (!props.editable || !props.visit.layers) return;
    const { col, depth } = toVolume(e);
    const kind = activeLayer ?? pickLayer(col, depth);
    if (!kind) return;
    const idx = props.slice * VOL.width + col;
    const cur = props.visit.layers[kind][idx];
    if (cur == null) {
      // 用邻近有效值插值修复
      let lo = idx;
      let hi = idx;
      while (lo >= 0 && props.visit.layers[kind][lo] == null) lo--;
      while (hi < props.visit.layers[kind].length && props.visit.layers[kind][hi] == null) hi++;
      const a = lo >= 0 ? props.visit.layers[kind][lo] : null;
      const b = hi < props.visit.layers[kind].length ? props.visit.layers[kind][hi] : null;
      const val = a != null && b != null ? (a + b) / 2 : (a ?? b ?? depth);
      updateLayerPoint(props.visit.id, kind, props.slice, col, val);
      logLayerEdit(props.visit.id, kind, props.slice, col);
    } else {
      updateLayerPoint(props.visit.id, kind, props.slice, col, null);
      logLayerEdit(props.visit.id, kind, props.slice, col);
    }
    scheduleDraw();
  }

  return (
    <div class="bscan-wrap">
      <canvas
        ref={canvas}
        class="bscan-canvas"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onDblClick={onDblClick}
        style={{ cursor: props.editable ? 'crosshair' : 'default' }}
      />
      <div class="layer-legend">
        {LAYER_ORDER.map((kind) => (
          <label class="legend-item">
            <input
              type="checkbox"
              checked={!hidden[kind]}
              onChange={(e) => {
                hidden[kind] = !e.currentTarget.checked;
                scheduleDraw();
              }}
            />
            <span class="legend-swatch" style={{ background: rgbCss(LAYER_COLOR[kind]) }} />
            {LAYER_LABEL[kind]}
          </label>
        ))}
        <Show when={props.editable}>
          <span class="hint">拖拽分层线修正 · 双击标记/修复断裂</span>
        </Show>
      </div>
    </div>
  );
}

function rgbCss(c: [number, number, number]): string {
  return `rgb(${c.map((v) => Math.round(v * 255)).join(',')})`;
}
