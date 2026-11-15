/* BGA 二维球阵编辑器（Canvas 2D）：点击标记 缺球/偏位/连锡，同时作为无 WebGPU 环境的降级视图与客户批注底图 */
(function (global) {
  const App = global.App || (global.App = {});

  const COLORS = {
    nominal: "#5cc8f2",
    missing: "#8a98a8",
    offset:  "#f59e0b",
    bridge:  "#fb7c32",
    grid: "#243343",
    text: "#8ea3b8",
  };

  class Bga2dEditor {
    constructor(canvas, opts = {}) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.readOnly = !!opts.readOnly;
      this.showAnnotations = opts.showAnnotations !== false;
      this.tool = opts.tool || "missing";
      this.onMark = opts.onMark || (() => {});
      this.onSelect = opts.onSelect || (() => {});
      this.onCanvasClick = opts.onCanvasClick || (() => {});
      this.onBallClick = opts.onBallClick || null;
      this.annotations = opts.annotations || [];
      this._bind();
    }

    setProject(proj) { this.proj = proj; this.draw(); }
    setTool(tool) { this.tool = tool; }
    setAnnotations(list) { this.annotations = list; this.draw(); }

    _metrics() {
      const bga = this.proj.bga;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = this.canvas.clientWidth || 800;
      const cssH = this.canvas.clientHeight || 600;
      if (this.canvas.width !== Math.floor(cssW * dpr)) {
        this.canvas.width = Math.floor(cssW * dpr);
        this.canvas.height = Math.floor(cssH * dpr);
      }
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const w = cssW, h = cssH;
      const spanX = (bga.cols - 1) * bga.pitchX;
      const spanY = (bga.rows - 1) * bga.pitchY;
      const margin = 90;
      const scale = Math.min((w - margin * 2) / Math.max(spanX, 1), (h - margin * 2) / Math.max(spanY, 1));
      const ox = (w - spanX * scale) / 2;
      const oy = (h - spanY * scale) / 2;
      const radius = Math.max(7, Math.min(16, bga.ballDiameter * scale * 0.5));
      return { w, h, scale, ox, oy, radius };
    }

    ballCenter(ball) {
      const m = this._metrics();
      const bga = this.proj.bga;
      const x = m.ox + (ball.col - 1) * bga.pitchX * m.scale + (ball.offsetX || 0) * m.scale;
      const y = m.oy + (ball.row - 1) * bga.pitchY * m.scale + (ball.offsetY || 0) * m.scale;
      return { x, y, r: m.radius, m };
    }

    draw() {
      if (!this.proj) return;
      const ctx = this.ctx;
      const m = this._metrics();
      ctx.clearRect(0, 0, m.w, m.h);
      const bga = this.proj.bga;

      // 网格（行列间距真实比例）
      ctx.strokeStyle = COLORS.grid;
      ctx.lineWidth = 1;
      for (let r = 0; r < bga.rows; r++) {
        const y = m.oy + r * bga.pitchY * m.scale;
        ctx.beginPath(); ctx.moveTo(m.ox - 30, y); ctx.lineTo(m.ox + (bga.cols - 1) * bga.pitchX * m.scale + 30, y); ctx.stroke();
      }
      for (let c = 0; c < bga.cols; c++) {
        const x = m.ox + c * bga.pitchX * m.scale;
        ctx.beginPath(); ctx.moveTo(x, m.oy - 30); ctx.lineTo(x, m.oy + (bga.rows - 1) * bga.pitchY * m.scale + 30); ctx.stroke();
      }
      // 行列号
      ctx.fillStyle = COLORS.text;
      ctx.font = "11px Segoe UI";
      ctx.textAlign = "center";
      for (let c = 1; c <= bga.cols; c++) {
        ctx.fillText(String(c), m.ox + (c - 1) * bga.pitchX * m.scale, m.oy - 44);
      }
      ctx.textAlign = "right";
      for (let r = 1; r <= bga.rows; r++) {
        ctx.fillText(String(r), m.ox - 40, m.oy + (r - 1) * bga.pitchY * m.scale + 4);
      }

      // 连锡连线（先画线再画球）
      const byId = new Map(bga.balls.map((b) => [b.id, b]));
      ctx.strokeStyle = COLORS.bridge;
      ctx.lineWidth = 4;
      for (const ball of bga.balls) {
        if (ball.defect !== "bridge") continue;
        const right = byId.get(`R${ball.row}C${ball.col + 1}`);
        if (right && right.defect === "bridge") {
          const a = this.ballCenter(ball), b = this.ballCenter(right);
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }

      // 焊球
      for (const ball of bga.balls) {
        const { x, y, r } = this.ballCenter(ball);
        const color = COLORS[ball.defect] || COLORS.nominal;
        ctx.beginPath();
        if (ball.defect === "missing") {
          // 缺球：虚线圆环占位
          ctx.arc(x, y, r * 0.75, 0, Math.PI * 2);
          ctx.setLineDash([4, 4]);
          ctx.strokeStyle = COLORS.missing;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.setLineDash();
          ctx.beginPath();
          ctx.moveTo(x - r * 0.5, y - r * 0.5); ctx.lineTo(x + r * 0.5, y + r * 0.5);
          ctx.moveTo(x + r * 0.5, y - r * 0.5); ctx.lineTo(x - r * 0.5, y + r * 0.5);
          ctx.strokeStyle = COLORS.missing;
          ctx.stroke();
        } else {
          const grad = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.1, x, y, r);
          grad.addColorStop(0, this._lighten(color));
          grad.addColorStop(1, color);
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
          ctx.strokeStyle = "rgba(0,0,0,.35)";
          ctx.lineWidth = 1;
          ctx.stroke();
          if (ball.defect === "offset") {
            // 偏位：画出名义位置十字
            const nx = m.ox + (ball.col - 1) * bga.pitchX * m.scale;
            const ny = m.oy + (ball.row - 1) * bga.pitchY * m.scale;
            ctx.strokeStyle = "rgba(245,158,11,.55)";
            ctx.setLineDash([3, 3]);
            ctx.beginPath(); ctx.moveTo(nx, ny); ctx.lineTo(x, y); ctx.stroke();
            ctx.setLineDash();
            ctx.beginPath();
            ctx.arc(nx, ny, r * 0.45, 0, Math.PI * 2);
            ctx.strokeStyle = COLORS.offset;
            ctx.stroke();
          }
        }
      }

      // 客户批注挂点
      if (this.showAnnotations) {
        let i = 0;
        for (const anno of this.annotations) {
          if (!anno.anchor || anno.anchor.kind !== "bga") continue;
          const ball = byId.get(anno.anchor.ballId);
          if (!ball) continue;
          const { x, y, r } = this.ballCenter(ball);
          const px = x + r + 6, py = y - r - 6;
          ctx.beginPath();
          ctx.arc(px, py, 9, 0, Math.PI * 2);
          ctx.fillStyle = anno.resolved ? "#3a4a5c" : "#a78bfa";
          ctx.fill();
          ctx.fillStyle = "#0e141d";
          ctx.font = "bold 10px Segoe UI";
          ctx.textAlign = "center";
          ctx.fillText(String(i + 1), px, py + 3.5);
          i++;
        }
      }
    }

    _lighten(hex) {
      const n = parseInt(hex.slice(1), 16);
      const r = Math.min(255, (n >> 16) + 60), g = Math.min(255, ((n >> 8) & 255) + 60), b = Math.min(255, (n & 255) + 60);
      return `rgb(${r},${g},${b})`;
    }

    _pick(evt) {
      const rect = this.canvas.getBoundingClientRect();
      const px = evt.clientX - rect.left, py = evt.clientY - rect.top;
      let best = null, bestD = Infinity;
      for (const ball of this.proj.bga.balls) {
        const { x, y, r } = this.ballCenter(ball);
        const d = Math.hypot(px - x, py - y);
        if (d <= r + 4 && d < bestD) { best = ball; bestD = d; }
      }
      return best;
    }

    _bind() {
      this.canvas.addEventListener("click", (evt) => {
        if (!this.proj) return;
        const ball = this._pick(evt);
        if (ball) {
          if (this.readOnly) { this.onBallClick && this.onBallClick(ball); this.onSelect(ball); return; }
          this.onMark(ball, this.tool);
          this.onSelect(ball);
        } else if (!this.readOnly) {
          this.onCanvasClick(evt);
        }
      });
    }
  }

  App.Bga2dEditor = Bga2dEditor;
})(window);
