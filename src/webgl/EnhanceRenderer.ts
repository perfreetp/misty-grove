// WebGL2 增强引擎
// 管线：原始截图纹理 → 明度去相关/对比度 → 9 抽头血管卷积（高频细节增强）
//      → 假彩色通道混合（color matrix）→ 输出
// 全部计算在 GPU 片段着色器完成，UI 滑块调整 uniform 后即时重绘。

import type { EnhanceParams } from '../types';
import { rowMajorToMat3 } from './presets';

const VERT = `#version 300 es
in vec2 a_pos;
out vec2 v_uv;
void main() {
  // 全屏四边形，UV 上下翻转以匹配图像纹理坐标
  v_uv = vec2((a_pos.x + 1.0) * 0.5, 1.0 - (a_pos.y + 1.0) * 0.5);
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 out_color;

uniform sampler2D u_tex;
uniform vec2 u_texel;          // 1/纹理尺寸
uniform float u_vesselGain;    // 血管（高频）增强 0..3
uniform float u_saturation;    // 饱和度/去相关 0..2
uniform float u_contrast;      // 对比度 0.5..2
uniform float u_greenBoost;    // 绿色通道强调 0..1
uniform mat3 u_colorMatrix;    // 假彩色通道混合（列主序）

float luma(vec3 c) {
  return dot(c, vec3(0.299, 0.587, 0.114));
}

void main() {
  vec3 c = texture(u_tex, v_uv).rgb;

  // ---- 阶段 1：对比度（围绕中灰 0.5）----
  c = (c - 0.5) * u_contrast + 0.5;

  // ---- 阶段 2：明度去相关（饱和度增强）----
  float l = luma(c);
  c = mix(vec3(l), c, u_saturation);

  // ---- 阶段 3：血管增强（9 抽头拉普拉斯型高频提取）----
  // 取中心与 8 邻域，高频 = 中心 - 邻域均值加权，血管/微血管边缘为高频信号
  vec3 sum = vec3(0.0);
  sum += texture(u_tex, v_uv + u_texel * vec2(-1.0, -1.0)).rgb;
  sum += texture(u_tex, v_uv + u_texel * vec2( 0.0, -1.0)).rgb * 2.0;
  sum += texture(u_tex, v_uv + u_texel * vec2( 1.0, -1.0)).rgb;
  sum += texture(u_tex, v_uv + u_texel * vec2(-1.0,  0.0)).rgb * 2.0;
  sum += texture(u_tex, v_uv + u_texel * vec2( 1.0,  0.0)).rgb * 2.0;
  sum += texture(u_tex, v_uv + u_texel * vec2(-1.0,  1.0)).rgb;
  sum += texture(u_tex, v_uv + u_texel * vec2( 0.0,  1.0)).rgb * 2.0;
  sum += texture(u_tex, v_uv + u_texel * vec2( 1.0,  1.0)).rgb;
  vec3 localMean = sum / 12.0;
  vec3 highFreq = c - localMean;
  // 血管在绿色通道（NBI）信号最强，对高频的 G 通道额外加权
  highFreq.g *= (1.0 + u_greenBoost);
  c = c + highFreq * u_vesselGain;

  // ---- 阶段 4：绿色通道整体强调（NBI 棕褐色血管显影）----
  c.g += u_greenBoost * 0.15 * (1.0 - c.g);

  // ---- 阶段 5：假彩色合成（3x3 通道混合矩阵）----
  c = u_colorMatrix * c;

  out_color = vec4(clamp(c, 0.0, 1.0), 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader {
  const sh = gl.createShader(type);
  if (!sh) throw new Error('无法创建着色器');
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh);
    gl.deleteShader(sh);
    throw new Error(`着色器编译失败: ${log}`);
  }
  return sh;
}

export class EnhanceRenderer {
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram;
  private vao: WebGLVertexArrayObject;
  private tex: WebGLTexture | null = null;
  private texW = 0;
  private texH = 0;
  private u: Record<string, WebGLUniformLocation | null> = {};
  private params: EnhanceParams;
  private image: HTMLImageElement | null = null;

  constructor(canvas: HTMLCanvasElement, initial: EnhanceParams) {
    const gl = canvas.getContext('webgl2', { premultipliedAlpha: false, preserveDrawingBuffer: true });
    if (!gl) throw new Error('当前浏览器不支持 WebGL2');
    this.gl = gl;
    this.params = { ...initial, colorMatrix: [...initial.colorMatrix] };

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      throw new Error(`着色器链接失败: ${gl.getProgramInfoLog(prog)}`);
    }
    this.program = prog;
    gl.useProgram(prog);

    // 全屏三角形带 VAO
    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    this.vao = vao;

    for (const name of ['u_tex', 'u_texel', 'u_vesselGain', 'u_saturation', 'u_contrast', 'u_greenBoost', 'u_colorMatrix']) {
      this.u[name] = gl.getUniformLocation(prog, name);
    }
    gl.uniform1i(this.u.u_tex, 0);
  }

  async loadImage(blob: Blob): Promise<HTMLImageElement> {
    const url = URL.createObjectURL(blob);
    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const im = new Image();
        im.onload = () => resolve(im);
        im.onerror = () => reject(new Error('图像解码失败'));
        im.src = url;
      });
      this.image = img;
      this.uploadTexture(img);
      return img;
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  private uploadTexture(img: HTMLImageElement): void {
    const gl = this.gl;
    if (!this.tex) {
      this.tex = gl.createTexture();
    }
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    this.texW = img.naturalWidth;
    this.texH = img.naturalHeight;
  }

  setParams(p: EnhanceParams): void {
    this.params = { ...p, colorMatrix: [...p.colorMatrix] };
  }

  getParams(): EnhanceParams {
    return { ...this.params, colorMatrix: [...this.params.colorMatrix] };
  }

  getImageSize(): { w: number; h: number } | null {
    return this.image ? { w: this.image.naturalWidth, h: this.image.naturalHeight } : null;
  }  render(): void {
    const gl = this.gl;
    if (!this.tex) return;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(this.program);
    gl.bindVertexArray(this.vao);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.tex);

    const p = this.params;
    gl.uniform2f(this.u.u_texel, 1 / this.texW, 1 / this.texH);
    gl.uniform1f(this.u.u_vesselGain, p.vesselGain);
    gl.uniform1f(this.u.u_saturation, p.saturation);
    gl.uniform1f(this.u.u_contrast, p.contrast);
    gl.uniform1f(this.u.u_greenBoost, p.greenBoost);
    // 预设按行主序存储，mat3 uniform 为列主序，上传前转置
    gl.uniformMatrix3fv(this.u.u_colorMatrix, false, new Float32Array(rowMajorToMat3(p.colorMatrix)));

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  /** 将当前增强结果按原始图像分辨率绘制到离屏 canvas，用于讨论单导出 */
  drawToOffscreen(): HTMLCanvasElement | null {
    if (!this.tex || !this.image) return null;
    const off = document.createElement('canvas');
    off.width = this.image.naturalWidth;
    off.height = this.image.naturalHeight;
    const octx = off.getContext('2d')!;
    octx.drawImage(this.gl.canvas as HTMLCanvasElement, 0, 0, off.width, off.height);
    return off;
  }

  dispose(): void {
    const gl = this.gl;
    if (this.tex) gl.deleteTexture(this.tex);
    gl.deleteProgram(this.program);
    gl.deleteVertexArray(this.vao);
  }
}
