// 合成阴道镜演示影像（不含任何真实患者数据）
// 用于首次启动时的示例病例；真实使用时由「导入图像」替换为本地照片。

const mulberry32 = seed => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const rgba = (r, g, b, a = 1) => `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${a})`;

export function syntheticColposcopy({ seed = 7, phase = 'post', geometry = { cx: 0.5, cy: 0.47, innerR: 0.052, outerR: 0.3 }, lesions = [], tzType = 'I' }) {
  const W = 880, H = 660;
  const cv = document.createElement('canvas');
  cv.width = W;
  cv.height = H;
  const g = cv.getContext('2d');
  const rnd = mulberry32(seed * 977 + (phase === 'pre' ? 11 : phase === 'post' ? 29 : 47));

  const cx = geometry.cx * W;
  const cy = geometry.cy * H;
  const R = geometry.outerR * Math.min(W, H);
  const innerR = geometry.innerR * Math.min(W, H);
  const cervixR = R * 1.34;

  // 背景：阴道壁
  const bg = g.createRadialGradient(W * 0.5, H * 0.48, cervixR * 0.6, W * 0.5, H * 0.48, W * 0.75);
  bg.addColorStop(0, '#7e4048');
  bg.addColorStop(0.45, '#5e2b36');
  bg.addColorStop(1, '#2a1119');
  g.fillStyle = bg;
  g.fillRect(0, 0, W, H);

  // 阴道壁皱襞
  g.save();
  for (let i = 0; i < 26; i++) {
    const a = rnd() * Math.PI * 2;
    const rr = cervixR * (1.12 + rnd() * 0.5);
    g.beginPath();
    const x0 = W * 0.5 + Math.cos(a) * rr, y0 = H * 0.48 + Math.sin(a) * rr * 0.8;
    g.moveTo(x0, y0);
    g.quadraticCurveTo(x0 + Math.cos(a + 0.5) * 60, y0 + Math.sin(a + 0.5) * 60, x0 + Math.cos(a) * 120, y0 + Math.sin(a) * 110);
    g.strokeStyle = `rgba(120,60,68,${0.10 + rnd() * 0.14})`;
    g.lineWidth = 3 + rnd() * 9;
    g.stroke();
  }
  g.restore();

  const iodine = phase === 'iodine';
  const post = phase === 'post';

  // 宫颈外口圆盘
  g.save();
  g.beginPath();
  g.ellipse(cx, cy, cervixR, cervixR * 0.94, 0, 0, Math.PI * 2);
  const disc = g.createRadialGradient(cx - cervixR * 0.2, cy - cervixR * 0.25, cervixR * 0.1, cx, cy, cervixR);
  if (iodine) {
    disc.addColorStop(0, '#6d3320');
    disc.addColorStop(0.55, '#58251a');
    disc.addColorStop(0.9, '#43180f');
    disc.addColorStop(1, '#31110c');
  } else {
    disc.addColorStop(0, post ? '#e7b9b8' : '#d79d9c');
    disc.addColorStop(0.5, post ? '#cf9195' : '#bd7d80');
    disc.addColorStop(0.88, post ? '#a9626c' : '#965157');
    disc.addColorStop(1, '#6d343d');
  }
  g.fillStyle = disc;
  g.fill();
  g.restore();

  // 黏膜纹理 / 碘染斑驳
  g.save();
  g.beginPath();
  g.ellipse(cx, cy, cervixR, cervixR * 0.94, 0, 0, Math.PI * 2);
  g.clip();
  for (let i = 0; i < (iodine ? 2400 : 1500); i++) {
    const a = rnd() * Math.PI * 2;
    const rr = Math.sqrt(rnd()) * cervixR;
    const x = cx + Math.cos(a) * rr;
    const y = cy + Math.sin(a) * rr * 0.94;
    const s = 0.6 + rnd() * 2.6;
    if (iodine) {
      g.fillStyle = rnd() > 0.5 ? `rgba(30,10,6,${0.05 + rnd() * 0.12})` : `rgba(150,90,45,${0.04 + rnd() * 0.09})`;
    } else {
      g.fillStyle = rnd() > 0.55 ? rgba(225, 175, 168, 0.10 + rnd() * 0.16) : rgba(150, 85, 92, 0.06 + rnd() * 0.1);
    }
    g.beginPath();
    g.arc(x, y, s, 0, Math.PI * 2);
    g.fill();
  }
  g.restore();

  // 原始鳞柱交界（外圈）
  g.save();
  g.beginPath();
  const wav = tzType === 'III' ? 0.72 : 1;
  for (let i = 0; i <= 180; i++) {
    const a = (i / 180) * Math.PI * 2;
    const wob = 1 + Math.sin(a * 5 + seed) * 0.035 + Math.sin(a * 11 + seed * 2) * 0.022;
    const rr = R * wav * wob;
    const x = cx + Math.cos(a) * rr;
    const y = cy + Math.sin(a) * rr * 0.96;
    i ? g.lineTo(x, y) : g.moveTo(x, y);
  }
  g.closePath();
  g.strokeStyle = iodine ? 'rgba(210,150,90,0.32)' : 'rgba(240,196,190,0.30)';
  g.lineWidth = 2.6;
  g.stroke();
  g.restore();

  // 柱状上皮（宫颈管口周围）
  const osRx = innerR * (tzType === 'III' ? 1.9 : 1.35);
  g.save();
  const osGrad = g.createRadialGradient(cx, cy, innerR * 0.1, cx, cy, osRx * 1.5);
  osGrad.addColorStop(0, '#3a1114');
  osGrad.addColorStop(0.45, '#7a2c32');
  osGrad.addColorStop(0.75, 'rgba(190,100,105,0.85)');
  osGrad.addColorStop(1, 'rgba(190,100,105,0)');
  g.fillStyle = osGrad;
  g.beginPath();
  g.ellipse(cx, cy, osRx * 1.5, osRx * 1.4, 0, 0, Math.PI * 2);
  g.fill();
  // 宫颈口
  g.beginPath();
  g.ellipse(cx, cy + osRx * 0.05, osRx * 0.5, osRx * 0.42, 0.1, 0, Math.PI * 2);
  g.fillStyle = '#2a0b0e';
  g.fill();
  g.restore();

  // 病灶区域
  for (const l of lesions) {
    if (!l.points || l.points.length < 3) continue;
    g.save();
    g.beginPath();
    l.points.forEach((p, i) => {
      const x = p.x * W, y = p.y * H;
      i ? g.lineTo(x, y) : g.moveTo(x, y);
    });
    g.closePath();
    if (iodine) {
      g.fillStyle = 'rgba(206,162,92,0.93)';
      g.fill();
      g.strokeStyle = 'rgba(232,196,132,0.5)';
      g.lineWidth = 2;
      g.stroke();
    } else if (post) {
      g.fillStyle = 'rgba(251,247,238,0.86)';
      g.fill();
      // 醋酸白增厚边缘
      g.strokeStyle = 'rgba(255,252,246,0.9)';
      g.lineWidth = 3.4;
      g.stroke();
    } else {
      g.fillStyle = 'rgba(206,120,126,0.20)';
      g.fill();
    }
    // 腺体开口
    const c = l.points.reduce((s, p) => ({ x: s.x + p.x / l.points.length, y: s.y + p.y / l.points.length }), { x: 0, y: 0 });
    for (let i = 0; i < 16; i++) {
      const a = rnd() * Math.PI * 2, rr = Math.sqrt(rnd()) * 0.055;
      const x = (c.x + Math.cos(a) * rr) * W, y = (c.y + Math.sin(a) * rr) * H;
      g.beginPath();
      g.arc(x, y, 1.4 + rnd() * 2.2, 0, Math.PI * 2);
      g.fillStyle = iodine ? 'rgba(140,92,40,0.5)' : post ? 'rgba(196,152,150,0.55)' : 'rgba(150,70,78,0.35)';
      g.fill();
    }
    g.restore();
  }

  // 异型血管
  g.save();
  for (let i = 0; i < 7; i++) {
    const a = rnd() * Math.PI * 2, rr = cervixR * (0.35 + rnd() * 0.45);
    let x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr;
    g.beginPath();
    g.moveTo(x, y);
    for (let k = 0; k < 5; k++) {
      x += (rnd() - 0.5) * 26;
      y += (rnd() - 0.5) * 22;
      g.lineTo(x, y);
    }
    g.strokeStyle = `rgba(146,38,52,${iodine ? 0.10 : 0.20 + rnd() * 0.14})`;
    g.lineWidth = 0.9 + rnd();
    g.stroke();
  }
  g.restore();

  // 高光
  g.save();
  g.globalCompositeOperation = 'lighter';
  for (const [hx, hy, hr, alpha] of [[0.36, 0.28, 0.16, 0.16], [0.66, 0.62, 0.1, 0.1], [0.55, 0.22, 0.06, 0.13]]) {
    const hg = g.createRadialGradient(W * hx, H * hy, 0, W * hx, H * hy, Math.min(W, H) * hr);
    hg.addColorStop(0, `rgba(255,246,240,${alpha})`);
    hg.addColorStop(1, 'rgba(255,246,240,0)');
    g.fillStyle = hg;
    g.beginPath();
    g.ellipse(W * hx, H * hy, Math.min(W, H) * hr, Math.min(W, H) * hr * 0.7, -0.3, 0, Math.PI * 2);
    g.fill();
  }
  g.restore();

  // 暗角
  const vg = g.createRadialGradient(W * 0.5, H * 0.48, Math.min(W, H) * 0.3, W * 0.5, H * 0.48, Math.max(W, H) * 0.78);
  vg.addColorStop(0, 'rgba(0,0,0,0)');
  vg.addColorStop(1, 'rgba(8,2,4,0.62)');
  g.fillStyle = vg;
  g.fillRect(0, 0, W, H);

  // 轻噪点，避免画面过于平滑
  const img = g.getImageData(0, 0, W, H);
  const data = img.data;
  for (let i = 0; i < data.length; i += 4) {
    const n = (rnd() - 0.5) * 9;
    data[i] += n; data[i + 1] += n; data[i + 2] += n;
  }
  g.putImageData(img, 0, 0);

  return cv.toDataURL('image/jpeg', 0.78);
}

export function generateTrio({ seed, geometry, lesions, tzType }) {
  return {
    pre: syntheticColposcopy({ seed, phase: 'pre', geometry, lesions, tzType }),
    post: syntheticColposcopy({ seed, phase: 'post', geometry, lesions, tzType }),
    iodine: syntheticColposcopy({ seed, phase: 'iodine', geometry, lesions, tzType })
  };
}

// 读取本地图片文件为压缩后的 dataURL
export function readImageFile(file, maxSide = 1400) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('读取文件失败'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('无法解析该图像'));
      img.onload = () => {
        const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
        const cv = document.createElement('canvas');
        cv.width = Math.round(img.width * scale);
        cv.height = Math.round(img.height * scale);
        const g = cv.getContext('2d');
        g.drawImage(img, 0, 0, cv.width, cv.height);
        resolve(cv.toDataURL('image/jpeg', 0.86));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export function downloadDataURL(dataURL, filename) {
  const a = document.createElement('a');
  a.href = dataURL;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
