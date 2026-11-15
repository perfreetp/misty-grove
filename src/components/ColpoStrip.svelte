<script>
  import { onMount, tick } from 'svelte';
  import {
    DEFAULT_GEO, LESION_GRADE_COLOR, thetaDeg, normaliseHour, polygonClockSpan,
    polygonArea, areaMM2, clamp, pointOnCircle, dist, pointInPolygon, polygonCentroid,
    unitMM, hourLabel
  } from '../lib/domain.js';
  import { loadImage } from '../lib/imageCache.js';

  let {
    exam = null,
    priorExam = null,
    mode = 'annotate',
    activeLesionId = null,
    activeBiopsyId = null,
    showPrior = false,
    priorOpacity = 0.45,
    showGrid = true,
    showLabels = true,
    showTz = true,
    compact = false,
    showPhaseLabels = true,
    hint = '',
    zoom = 1,
    fit = 'cover',
    onselectlesion = () => {},
    onselectbiopsy = () => {},
    oncreate = () => {},
    onmovepoint = () => {},
    onbiopsypoint = () => {},
    ondragstate = () => {}
  } = $props();

  const PHASES = [
    { key: 'pre', label: '醋酸前', sub: '原生上皮' },
    { key: 'post', label: '醋酸后', sub: '白色上皮' },
    { key: 'iodine', label: '碘 染', sub: '不着色区' }
  ];

  let images = $state({ pre: null, post: null, iodine: null });
  let priorImages = $state({ pre: null, post: null, iodine: null });
  let loadToken = 0;

  const geo = $derived(exam?.geometry || DEFAULT_GEO);
  const lesions = $derived(exam?.lesions || []);
  const biopsies = $derived(exam?.biopsies || []);
  const activeLesion = $derived(lesions.find(l => l.id === activeLesionId) || null);

  // 合成演示影像需要病灶轮廓才能“画出”病灶外观
  const seedLesions = $derived((exam?.lesions || []).map(l => ({ points: l.points })));

  $effect(() => {
    const token = ++loadToken;
    const imgs = exam?.images || {};
    const priorImgs = priorExam?.images || {};
    const sl = seedLesions;
    (async () => {
      const [pre, post, iodine, ppre, ppost, piod] = await Promise.all([
        loadImage(imgs.pre, sl, geo, exam?.tzType),
        loadImage(imgs.post, sl, geo, exam?.tzType),
        loadImage(imgs.iodine, sl, geo, exam?.tzType),
        loadImage(priorImgs.pre, priorExam?.lesions, priorExam?.geometry, priorExam?.tzType),
        loadImage(priorImgs.post, priorExam?.lesions, priorExam?.geometry, priorExam?.tzType),
        loadImage(priorImgs.iodine, priorExam?.lesions, priorExam?.geometry, priorExam?.tzType)
      ]);
      if (token !== loadToken) return;
      images = { pre, post, iodine };
      priorImages = { pre: ppre, post: ppost, iodine: piod };
    })();
  });

  let singlePhase = $state(1);
  let host;
  let canvasEl;
  let width = $state(900);
  let height = $state(300);
  let hover = $state(null);
  let drag = $state(null);
  let animT = $state(0);

  export function toCanvas(e) {
    const r = host.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  // 每个面板为固定宽高比的画幅：图像以 cover 填充，钟面与轮廓共用同一坐标空间
  const PANEL_ASPECT = 0.94; // w / h
  const single = $derived(width < 620);

  function slotRect(i) {
    if (single) {
      return { x: i === singlePhase ? 0 : width + 40, y: 0, w: width, h: height };
    }
    const gap = compact ? 8 : 10;
    const w = (width - gap * 2) / 3;
    return { x: i * (w + gap), y: 0, w, h: height };
  }

  function panelRect(i) {
    const s = slotRect(i);
    let w = s.w, h = s.w / PANEL_ASPECT;
    if (h > s.h) { h = s.h; w = h * PANEL_ASPECT; }
    return { x: s.x + (s.w - w) / 2, y: s.y + (s.h - h) / 2, w, h };
  }

  function panelIndexAt(pt) {
    const list = single ? [singlePhase] : [0, 1, 2];
    for (const i of list) {
      const r = panelRect(i);
      if (pt.x >= r.x && pt.x <= r.x + r.w && pt.y >= r.y && pt.y <= r.y + r.h) return i;
    }
    return -1;
  }

  function norm(pt) {
    const i = panelIndexAt(pt);
    if (i < 0) return { x: -1, y: -1, panel: -1, px: 0, py: 0, outside: true };
    const r = panelRect(i);
    return { x: (pt.x - r.x) / r.w, y: (pt.y - r.y) / r.h, panel: i, px: pt.x - r.x, py: pt.y };
  }

  function toPx(n, panel) {
    const r = panelRect(panel);
    return { x: r.x + n.x * r.w, y: n.y * r.h };
  }

  // 拖拽顶点
  const VERT = 6;

  function hitVertex(n) {
    const p = toPx(n, n.panel);
    let best = null;
    for (const l of lesions) {
      for (let i = 0; i < (l.points || []).length; i++) {
        const v = toPx(l.points[i], n.panel);
        const d = Math.hypot(v.x - p.x, v.y - p.y);
        if (d < VERT + 3) { if (!best || d < best.d) best = { lesionId: l.id, index: i, d, kind: 'vertex' }; }
      }
    }
    for (const b of biopsies) {
      const v = toPx(b.point, n.panel);
      const d = Math.hypot(v.x - p.x, v.y - p.y);
      if (d < 12) { if (!best || d < best.d) best = { biopsyId: b.id, d, kind: 'biopsy' }; }
    }
    return best;
  }

  function nearestEdge(n, lesion) {
    const p = toPx(n, n.panel);
    let best = null;
    for (let i = 0; i < lesion.points.length; i++) {
      const a = toPx(lesion.points[i], n.panel), b = toPx(lesion.points[(i + 1) % lesion.points.length], n.panel);
      const vx = b.x - a.x, vy = b.y - a.y;
      const t = clamp(((p.x - a.x) * vx + (p.y - a.y) * vy) / (vx * vx + vy * vy || 1), 0, 1);
      const q = { x: a.x + vx * t, y: a.y + vy * t };
      const d = Math.hypot(q.x - p.x, q.y - p.y);
      if (!best || d < best.d) best = { index: i, t, d };
    }
    return best;
  }

  function addVertexAt(n) {
    const l = activeLesion;
    if (!l) return;
    const e = nearestEdge(n, l);
    if (!e) return;
    const pts = [...l.points];
    pts.splice(e.index + 1, 0, { x: clamp(n.x, 0, 1), y: clamp(n.y, 0, 1) });
    onmovepoint({ lesionId: l.id, points: pts });
  }

  function deleteVertexAt(n) {
    const hit = hitVertex(n);
    if (!hit || hit.kind !== 'vertex') return;
    const l = lesions.find(x => x.id === hit.lesionId);
    if (!l || l.points.length <= 3) return;
    const pts = l.points.filter((_, i) => i !== hit.index);
    onmovepoint({ lesionId: l.id, points: pts });
  }

  export function handlePointerDown(e) {
    if (e.button !== 0) return;
    const pt = toCanvas(e);
    const n = norm(pt);
    if (n.outside) return;
    if (mode === 'biopsy') {
      const b = hitVertex(n);
      if (b && b.kind === 'biopsy') {
        onselectbiopsy(b.biopsyId);
        drag = { kind: 'biopsy', id: b.biopsyId, panel: n.panel };
        ondragstate(true);
        host.setPointerCapture(e.pointerId);
        return;
      }
      onbiopsypoint({ x: clamp(n.x, 0.02, 0.98), y: clamp(n.y, 0.02, 0.98), panel: n.panel });
      return;
    }
    const hit = hitVertex(n);
    if (hit?.kind === 'vertex') {
      drag = { kind: 'vertex', lesionId: hit.lesionId, index: hit.index, panel: n.panel };
      onselectlesion(hit.lesionId);
      ondragstate(true);
      host.setPointerCapture(e.pointerId);
      return;
    }
    if (hit?.kind === 'biopsy') {
      onselectbiopsy(hit.biopsyId);
      drag = { kind: 'biopsy', id: hit.biopsyId, panel: n.panel };
      ondragstate(true);
      host.setPointerCapture(e.pointerId);
      return;
    }
    for (const l of lesions) {
      if (pointInPolygon({ x: n.x, y: n.y }, l.points)) {
        onselectlesion(l.id);
        drag = { kind: 'lesion', id: l.id, panel: n.panel, last: { x: n.x, y: n.y } };
        ondragstate(true);
        host.setPointerCapture(e.pointerId);
        return;
      }
    }
    onselectlesion(null);
  }

  export function handlePointerMove(e) {
    const pt = toCanvas(e);
    const n = norm(pt);
    hover = n.outside ? null : n;
    if (!drag) return;
    const nn = norm(pt);
    if (drag.kind === 'vertex') {
      const l = lesions.find(x => x.id === drag.lesionId);
      if (!l) return;
      const pts = l.points.map((p, i) => (i === drag.index ? { x: clamp(nn.x, 0.01, 0.99), y: clamp(nn.y, 0.01, 0.99) } : p));
      onmovepoint({ lesionId: l.id, points: pts, preview: true });
    } else if (drag.kind === 'biopsy') {
      onmovepoint({ biopsyId: drag.id, point: { x: clamp(nn.x, 0.01, 0.99), y: clamp(nn.y, 0.01, 0.99) }, preview: true });
    } else if (drag.kind === 'lesion') {
      const l = lesions.find(x => x.id === drag.id);
      if (!l) return;
      const dx = nn.x - drag.last.x, dy = nn.y - drag.last.y;
      drag.last = { x: nn.x, y: nn.y };
      const pts = l.points.map(p => ({ x: clamp(p.x + dx, 0.005, 0.995), y: clamp(p.y + dy, 0.005, 0.995) }));
      onmovepoint({ lesionId: l.id, points: pts, preview: true });
    }
  }

  export function handlePointerUp(e) {
    if (drag) {
      ondragstate(false);
      drag = null;
      try { host.releasePointerCapture(e.pointerId); } catch (_) {}
    }
  }

  export function handleDblClick(e) {
    if (mode !== 'annotate' || !activeLesion) return;
    const n = norm(toCanvas(e));
    if (toPx(n, n.panel) && nearestEdge(n, activeLesion).d < 14) addVertexAt(n);
  }

  // ---------- 绘制 ----------
  let raf = 0;

  function draw() {
    if (!canvasEl || !width) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cv = canvasEl;
    const W = Math.max(320, width), H = Math.max(180, height);
    if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) {
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
    }
    const g = cv.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, W, H);

    PHASES.forEach((ph, i) => {
      const r = panelRect(i);
      drawPanel(g, r, ph, i);
    });
  }

  function drawPanel(g, r, ph, i) {
    const img = images[ph.key];
    const pimg = priorImages[ph.key];
    g.save();
    roundRect(g, r.x, r.y, r.w, r.h, 10);
    g.clip();

    // 背景
    g.fillStyle = '#12100f';
    g.fillRect(r.x, r.y, r.w, r.h);

    // 底图：当前检查；前次以半透明叠在其上（对齐比较）
    if (img) {
      drawCover(g, img, r.x, r.y, r.w, r.h, 1);
    }
    if (pimg && showPrior) {
      g.save();
      try { g.filter = 'saturate(0.55) brightness(1.06)'; } catch (_) {}
      drawCover(g, pimg, r.x, r.y, r.w, r.h, priorOpacity);
      g.restore();
    }
    if (!img && !pimg) {
      g.fillStyle = 'rgba(255,255,255,0.5)';
      g.font = '500 12px system-ui';
      g.textAlign = 'center';
      g.fillText('尚未导入图像', r.x + r.w / 2, r.y + r.h / 2);
    }

    // 图像色调统一（碘染层次稍暗）
    g.restore();

    g.save();
    roundRect(g, r.x, r.y, r.w, r.h, 10);
    g.clip();

    if (img || pimg) {
      const tone = g.createLinearGradient(r.x, r.y, r.x, r.y + r.h);
      tone.addColorStop(0, 'rgba(10,14,12,0.10)');
      tone.addColorStop(0.55, 'rgba(10,14,12,0)');
      tone.addColorStop(1, 'rgba(10,14,12,0.34)');
      g.fillStyle = tone;
      g.fillRect(r.x, r.y, r.w, r.h);
    }

    const geoPx = { ...geo };
    // 若图像宽高比与面板不一致，按 cover 处理，几何仍按归一化绘制
    if (showTz) drawTz(g, r, geoPx, i);
    if (showGrid) drawClockGrid(g, r, geoPx, i, img != null);

    // 本次病灶
    lesions.forEach(l => {
      const isActive = l.id === activeLesionId;
      drawLesion(g, r, l, geoPx, i, isActive);
    });

    // 前次病灶轮廓：绘制在本次之上，便于看清面积边界位移
    if (showPrior && priorExam?.lesions?.length) {
      const pg = priorExam.geometry || DEFAULT_GEO;
      priorExam.lesions.forEach(l => drawLesion(g, r, l, pg, i, false, false, true));
    }

    // 活检点位
    biopsies.forEach(b => {
      drawBiopsy(g, r, b, geoPx, i, b.id === activeBiopsyId);
    });

    // 悬停指示：点中轮廓时高亮
    if (hover && hover.panel === i) {
      const h = lesions.find(l => pointInPolygon({ x: hover.x, y: hover.y }, l.points));
      if (h && h.id !== activeLesionId) drawLesion(g, r, h, geoPx, i, false, true);
    }

    g.restore();

    // 边框与标签
    g.save();
    roundRect(g, r.x + 0.5, r.y + 0.5, r.w - 1, r.h - 1, 10);
    g.strokeStyle = 'rgba(255,255,255,0.16)';
    g.lineWidth = 1;
    g.stroke();
    g.restore();

    if (showPhaseLabels) {
      const label = ph.label;
      const sub = ph.sub;
      g.save();
      g.font = '600 11px system-ui, "Segoe UI", sans-serif';
      const tw = g.measureText(label).width;
      const bw = tw + 16;
      roundRect(g, r.x + 10, r.y + 10, bw, 22, 6);
      g.fillStyle = 'rgba(12,20,18,0.62)';
      g.fill();
      g.fillStyle = '#f4f8f5';
      g.textAlign = 'left';
      g.textBaseline = 'middle';
      g.fillText(label, r.x + 18, r.y + 21.5);
      g.font = '400 10px system-ui, sans-serif';
      g.fillStyle = 'rgba(244,248,245,0.55)';
      g.fillText(sub, r.x + 18 + tw + 8, r.y + 22);
      g.restore();
    }

    // 前次半透明标签
    if (pimg && showPrior) {
      g.save();
      g.font = '600 10px system-ui, sans-serif';
      const text = `前次 ${priorExam?.examDate?.slice(5).replace('-', '/') || ''} · ${Math.round(priorOpacity * 100)}%`;
      const tw = g.measureText(text).width;
      roundRect(g, r.x + r.w - tw - 22, r.y + 10, tw + 12, 20, 5);
      g.fillStyle = 'rgba(120,72,10,0.72)';
      g.fill();
      g.fillStyle = '#ffeec9';
      g.textAlign = 'left';
      g.textBaseline = 'middle';
      g.fillText(text, r.x + r.w - tw - 16, r.y + 20.5);
      g.restore();
    }
  }

  // 图像绘制：contain 保证整幅宫颈完整可见，contour 对齐才准确
  function drawCover(g, img, x, y, w, h, alpha) {
    const ia = img.width / img.height;
    const pa = w / h;
    let dw, dh;
    if (fit === 'cover') {
      if (ia > pa) { dh = h; dw = h * ia; } else { dw = w; dh = w / ia; }
    } else if (ia > pa) { dw = w; dh = w / ia; } else { dh = h; dw = h * ia; }
    const z = Math.max(1, zoom);
    dw *= z;
    dh *= z;
    g.globalAlpha = alpha;
    g.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
    g.globalAlpha = 1;
  }

  function drawClockGrid(g, r, geo, panel, withImage) {
    const cx = r.x + geo.cx * r.w;
    const cy = r.y + geo.cy * r.h;
    const R = geo.outerR * Math.min(r.w, r.h);

    g.save();
    g.translate(cx, cy);
    g.scale(1, r.h / r.w);

    // 象限分界
    g.strokeStyle = withImage ? 'rgba(255,255,255,0.20)' : 'rgba(120,130,124,0.24)';
    g.lineWidth = 1;
    g.setLineDash([3, 5]);
    for (let q = 0; q < 4; q++) {
      const a = (q * 90 * Math.PI) / 180;
      g.beginPath();
      g.moveTo(0, 0);
      g.lineTo(R * 1.22 * Math.sin(a), -R * 1.22 * Math.cos(a));
      g.stroke();
    }
    g.setLineDash([]);

    // 钟面刻度环
    const ringR = R * 0.885;
    g.beginPath();
    g.arc(0, 0, ringR, 0, Math.PI * 2);
    g.strokeStyle = withImage ? 'rgba(255,255,255,0.18)' : 'rgba(120,130,124,0.26)';
    g.lineWidth = 1;
    g.stroke();

    // 12 个刻度与小数字
    for (let h = 1; h <= 12; h++) {
      const a = ((h % 12) * 30 * Math.PI) / 180;
      const major = h % 3 === 0;
      const r0 = ringR - (major ? 8 : 4);
      const x0 = r0 * Math.sin(a), y0 = -r0 * Math.cos(a);
      const x1 = ringR * Math.sin(a), y1 = -ringR * Math.cos(a);
      g.beginPath();
      g.moveTo(x0, y0);
      g.lineTo(x1, y1);
      g.strokeStyle = withImage ? `rgba(255,255,255,${major ? 0.6 : 0.32})` : 'rgba(90,105,98,0.45)';
      g.lineWidth = major ? 1.8 : 1;
      g.stroke();

      if (showLabels) {
        const lr = ringR - 16;
        const lx = lr * Math.sin(a), ly = -lr * Math.cos(a);
        g.save();
        g.scale(1, r.w / r.h);
        g.font = `${major ? 600 : 500} ${major ? 10.5 : 9.5}px "SF Mono", Consolas, monospace`;
        g.textAlign = 'center';
        g.textBaseline = 'middle';
        g.fillStyle = withImage ? `rgba(255,255,255,${major ? 0.85 : 0.55})` : `rgba(72,88,81,${major ? 0.8 : 0.55})`;
        g.fillText(major ? (h === 12 ? '12' : String(h)) : h, lx, ly);
        g.restore();
      }
    }
    g.restore();

    // 中心十字（宫颈口）
    if (showTz) {
      g.save();
      g.strokeStyle = withImage ? 'rgba(255,255,255,0.45)' : 'rgba(90,105,98,0.4)';
      g.lineWidth = 1;
      g.beginPath();
      g.moveTo(cx - 5, cy);
      g.lineTo(cx + 5, cy);
      g.moveTo(cx, cy - 5);
      g.lineTo(cx, cy + 5);
      g.stroke();
      g.restore();
    }
  }

  function drawTz(g, r, geo, panel) {
    const cx = r.x + geo.cx * r.w;
    const cy = r.y + geo.cy * r.h;
    const s = Math.min(r.w, r.h);
    g.save();
    g.setLineDash([2, 4]);
    g.strokeStyle = 'rgba(255,255,255,0.24)';
    g.lineWidth = 1;
    g.beginPath();
    g.ellipse(cx, cy, geo.outerR * s, geo.outerR * s * (r.h / r.w) * 0.98, 0, 0, Math.PI * 2);
    g.stroke();
    g.setLineDash([]);
    g.strokeStyle = 'rgba(255,214,140,0.5)';
    g.lineWidth = 1.2;
    g.beginPath();
    g.ellipse(cx, cy, geo.innerR * s, geo.innerR * s * (r.h / r.w), 0, 0, Math.PI * 2);
    g.stroke();
    g.restore();

    // 小标注
    if (showLabels) {
      g.save();
      g.font = '600 8px "SF Mono", Consolas, monospace';
      g.fillStyle = 'rgba(255,255,255,0.42)';
      g.textAlign = 'left';
      g.fillText('SCJ', cx + geo.outerR * s * 0.72, cy - geo.outerR * s * 0.68 * (r.h / r.w) - 3);
      g.restore();
    }
  }

  function drawLesion(g, r, l, geo, panel, isActive, ghost = false, isPrior = false) {
    const pts = (l.points || []).map(p => ({ x: r.x + p.x * r.w, y: r.y + p.y * r.h }));
    if (pts.length < 3) return;
    const c = LESION_GRADE_COLOR[l.grade] || LESION_GRADE_COLOR['低级别'];
    const t = performance.now();
    const pulse = isActive ? 0.5 + 0.5 * Math.sin(t / 480) : 0;

    g.save();
    g.beginPath();
    pts.forEach((p, i) => (i ? g.lineTo(p.x, p.y) : g.moveTo(p.x, p.y)));
    g.closePath();
    if (isPrior) {
      g.fillStyle = 'rgba(90,220,235,0.10)';
      g.fill();
      g.setLineDash([5, 3.5]);
      g.strokeStyle = 'rgba(120,235,245,0.95)';
      g.lineWidth = 1.7;
      g.stroke();
      g.setLineDash([]);
      g.restore();
      return;
    }
    g.fillStyle = ghost ? 'rgba(255,255,255,0.07)' : c.fill;
    g.fill();
    g.strokeStyle = isActive ? '#ffffff' : c.line;
    g.lineWidth = isActive ? 2.4 : 1.7;
    g.setLineDash([]);
    g.stroke();
    if (isActive) {
      g.strokeStyle = `rgba(255,255,255,${0.18 + pulse * 0.3})`;
      g.lineWidth = 5.5;
      g.stroke();
    }

    // 顶点
    if (isActive && mode === 'annotate') {
      pts.forEach(p => {
        g.beginPath();
        g.arc(p.x, p.y, 3.4, 0, Math.PI * 2);
        g.fillStyle = '#ffffff';
        g.fill();
        g.strokeStyle = c.line;
        g.lineWidth = 1.4;
        g.stroke();
      });
    }

    // 方位标签：置于轮廓外接框上方，避免遮挡病灶
    if (showLabels) {
      const span = polygonClockSpan(l.points, geo);
      const cen = polygonCentroid(l.points);
      const area = areaMM2(polygonArea(l.points), geo);
      const label = `${span.label} · ${area.toFixed(0)}mm²`;
      g.font = '600 9.5px system-ui, "Segoe UI", sans-serif';
      const tw = g.measureText(label).width;
      // 沿宫颈口→质心方向外推，落在轮廓之外
      const ox = r.x + geo.cx * r.w, oy = r.y + geo.cy * r.h;
      const px = r.x + cen.x * r.w, py = r.y + cen.y * r.h;
      let dx = px - ox, dy = py - oy;
      const len = Math.hypot(dx, dy) || 1;
      dx /= len; dy /= len;
      const reach = Math.max(...pts.map(p => Math.hypot(p.x - ox, p.y - oy)));
      let lx = clamp(ox + dx * (reach + 26), r.x + tw / 2 + 7, r.x + r.w - tw / 2 - 7);
      let ly = clamp(oy + dy * (reach + 18), r.y + 36, r.y + r.h - 34);
      roundRect(g, lx - tw / 2 - 5, ly - 8, tw + 10, 16, 4);
      g.fillStyle = 'rgba(10,18,15,0.7)';
      g.fill();
      g.fillStyle = isActive ? '#ffffff' : 'rgba(255,255,255,0.86)';
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      g.fillText(label, lx, ly + 0.5);
    }

    // 编号徽标（右上角）
    const idx = lesions.findIndex(x => x.id === l.id) + 1;
    g.restore();
    drawBadge(g, r.x + r.w - 16, r.y + 52, String(idx), c.line, isActive);
  }

  function drawBadge(g, x, y, text, color, active) {
    g.save();
    g.beginPath();
    g.arc(x, y, 9, 0, Math.PI * 2);
    g.fillStyle = active ? color : 'rgba(10,18,15,0.66)';
    g.fill();
    g.strokeStyle = color;
    g.lineWidth = 1.5;
    g.stroke();
    g.fillStyle = '#fff';
    g.font = '700 9.5px system-ui, sans-serif';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText(text, x, y + 0.5);
    g.restore();
  }

  function drawBiopsy(g, r, b, geo, panel, isActive) {
    const x = r.x + b.point.x * r.w;
    const y = r.y + b.point.y * r.h;
    const col = b.pathGrade
      ? (['CIN 2', 'CIN 3', 'AIS', '鳞状细胞癌', '腺癌'].includes(b.pathGrade) ? '#f6a7c1' : b.pathGrade === 'CIN 1' ? '#ffd98a' : '#a7d9c4')
      : '#ffffff';
    g.save();
    // 十字准星
    g.strokeStyle = 'rgba(255,255,255,0.5)';
    g.lineWidth = 1;
    g.beginPath();
    g.moveTo(x - 13, y);
    g.lineTo(x - 6, y);
    g.moveTo(x + 6, y);
    g.lineTo(x + 13, y);
    g.moveTo(x, y - 13);
    g.lineTo(x, y - 6);
    g.moveTo(x, y + 6);
    g.lineTo(x, y + 13);
    g.stroke();

    g.beginPath();
    g.arc(x, y, isActive ? 7 : 5.6, 0, Math.PI * 2);
    g.fillStyle = 'rgba(10,18,15,0.35)';
    g.fill();
    g.strokeStyle = col;
    g.lineWidth = 1.8;
    g.stroke();

    g.beginPath();
    g.arc(x, y, 2, 0, Math.PI * 2);
    g.fillStyle = col;
    g.fill();

    // 编号
    g.beginPath();
    g.arc(x + 11, y - 11, 7.4, 0, Math.PI * 2);
    g.fillStyle = isActive ? '#ffffff' : 'rgba(10,18,15,0.8)';
    g.fill();
    g.strokeStyle = col;
    g.lineWidth = 1.2;
    g.stroke();
    g.fillStyle = isActive ? '#10201c' : col;
    g.font = '700 8.5px system-ui, sans-serif';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText(String(b.seq || ''), x + 11, y - 10.4);
    g.restore();
  }

  function roundRect(g, x, y, w, h, r) {
    const rr = Math.min(r, w / 2, h / 2);
    g.beginPath();
    g.moveTo(x + rr, y);
    g.arcTo(x + w, y, x + w, y + h, rr);
    g.arcTo(x + w, y + h, x, y + h, rr);
    g.arcTo(x, y + h, x, y, rr);
    g.arcTo(x, y, x + w, y, rr);
    g.closePath();
  }

  onMount(() => {
    const ro = new ResizeObserver(entries => {
      const cr = entries[0].contentRect;
      width = Math.round(cr.width);
      height = Math.round(cr.height);
    });
    ro.observe(host);
    let running = true;
    const loop = () => {
      if (!running) return;
      draw();
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  });

  $effect(() => {
    // 触发重绘（依赖读取）
    lesions; biopsies; activeLesionId; activeBiopsyId; images; priorImages; showPrior; priorOpacity;
    showGrid; showLabels; showTz; mode; width; height; hover; canvasEl; zoom; fit; single; singlePhase;
    draw();
  });

</script>

<div class="strip" bind:this={host} class:compact
  onpointerdown={handlePointerDown}
  onpointermove={handlePointerMove}
  onpointerup={handlePointerUp}
  onpointercancel={handlePointerUp}
  onpointerleave={(e) => { if (!drag) hover = null; }}
  ondblclick={handleDblClick}
  role="application"
  aria-label="阴道镜影像标注区"
>
  <canvas bind:this={canvasEl} style="width:100%;height:100%;display:block;"></canvas>
  {#if single}
    <div class="phase-switch" role="group" aria-label="切换影像">
      {#each PHASES as ph, i}
        <button class:on={singlePhase === i} onclick={() => (singlePhase = i)} aria-pressed={singlePhase === i}>
          {ph.label.replace(' ', '')}
        </button>
      {/each}
    </div>
  {/if}
  {#if hint && !single}
    <div class="hint"><span>{hint}</span></div>
  {/if}
</div>

<style>
  .strip {
    position: relative;
    width: 100%;
    height: 300px;
    border-radius: 12px;
    background: #12100f;
    overflow: hidden;
    touch-action: none;
    user-select: none;
    cursor: crosshair;
  }
  .strip.compact { height: auto; aspect-ratio: 3 / 1; }
  .phase-switch {
    position: absolute;
    right: 8px;
    bottom: 8px;
    display: flex;
    gap: 2px;
    background: rgba(10, 18, 15, .72);
    border: 1px solid rgba(255, 255, 255, .14);
    border-radius: 7px;
    padding: 2px;
    backdrop-filter: blur(3px);
  }
  .phase-switch button {
    border: 0;
    background: transparent;
    color: rgba(255, 255, 255, .62);
    font-size: 10.5px;
    height: 22px;
    padding: 0 8px;
    border-radius: 5px;
  }
  .phase-switch button.on { background: rgba(255, 255, 255, .92); color: #12201c; font-weight: 600; }
  .hint {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 22px 12px 7px;
    font-size: 10.5px;
    color: rgba(255, 255, 255, 0.34);
    text-align: center;
    pointer-events: none;
    background: linear-gradient(transparent, rgba(8, 12, 10, 0.55));
    letter-spacing: 0.02em;
  }
  @media (max-width: 900px) {
    .strip { height: 240px; }
  }
</style>
