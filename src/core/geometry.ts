// ============================================================
// 边坡三维几何生成
// 坐标：X 沿路线走向，Y 高程（竖直），Z 横向（坡外为正）
// ============================================================
import type {
  DesignConfig, GeoLayer, GradeFace, PickHit, SlopeModel, Vec3,
} from '../types';
import { v3, rayPlane, type Ray } from './math';

/** 按高程查找所处岩土层（自上而下） */
export function layerAtElev(elev: number, layers: GeoLayer[]): GeoLayer {
  for (const layer of layers) {
    if (elev >= layer.bottomElev) return layer;
  }
  return layers[layers.length - 1];
}

/** 土岩分界高程：最上层 rock 之顶（即其上方最后一个 soil 层的底高程） */
export function soilRockBoundary(config: DesignConfig): number | null {
  for (let i = 0; i < config.layers.length; i++) {
    if (config.layers[i].kind === 'rock') {
      return i === 0 ? config.layers[i].bottomElev : config.layers[i - 1].bottomElev;
    }
  }
  return null;
}

interface SectionNode { y: number; z: number; }

/** 生成剖面折线（坡顶地面 → 各级坡/平台 → 坡脚），不含 X */
function buildSection(config: DesignConfig): { nodes: SectionNode[]; faces: GradeFace[]; boundaryElev: number | null } {
  const L = config.slopeLength;
  const nodes: SectionNode[] = [];
  const faces: GradeFace[] = [];
  const topGroundWidth = 4; // 坡顶后方地面带出宽度，仅用于渲染

  let y = config.topElev;
  let z = 0;
  nodes.push({ y, z: z - topGroundWidth }); // 坡顶后缘地面
  nodes.push({ y, z });                     // 坡顶线

  const boundaryElev = soilRockBoundary(config);

  config.grades.forEach((g, index) => {
    const topY = y, topZ = z;
    const dz = g.ratio * g.height;
    const slopeLen = g.height * Math.sqrt(1 + g.ratio * g.ratio);
    const toeY = topY - g.height;
    const toeZ = topZ + dz;

    const topStart: Vec3 = [0, topY, topZ];
    const topEnd: Vec3 = [L, topY, topZ];
    const toeStart: Vec3 = [0, toeY, toeZ];
    const toeEnd: Vec3 = [L, toeY, toeZ];
    const dipDir = v3.norm(v3.sub(toeStart, topStart));
    const normal = v3.norm(v3.cross(dipDir, [1, 0, 0]));

    // 土岩分界与本坡面交点
    let boundaryS: number | null = null;
    if (boundaryElev !== null && boundaryElev <= topY && boundaryElev >= toeY) {
      const s = (boundaryElev - topY) / dipDir[1]; // dipDir[1] < 0
      if (s >= 0 && s <= slopeLen) boundaryS = s;
    }

    faces.push({
      gradeId: g.id, index,
      topStart, topEnd, toeStart, toeEnd,
      topElev: topY, toeElev: toeY,
      dipDir, normal, slopeLength: slopeLen,
      ratio: g.ratio, height: g.height,
      boundaryS, boundaryElev: boundaryS === null ? null : boundaryElev,
    });

    // 坡脚点 + 平台
    nodes.push({ y: toeY, z: toeZ });
    y = toeY;
    z = toeZ;
    if (index < config.grades.length - 1 && g.bermWidth > 0) {
      z += g.bermWidth;
      nodes.push({ y, z });
    }
  });

  return { nodes, faces, boundaryElev };
}

/** 坡面上取点：x 走向坐标，s 自坡顶沿倾向斜距 */
export function pointOnFace(face: GradeFace, x: number, s: number): Vec3 {
  const base: Vec3 = [x, face.topStart[1], face.topStart[2]];
  return v3.add(base, v3.scale(face.dipDir, s));
}

/** 颜色浮点 0..1 */
function layerColor(layer: GeoLayer): [number, number, number] {
  return [layer.color[0] / 255, layer.color[1] / 255, layer.color[2] / 255];
}

/**
 * 生成渲染网格：将剖面折线细分后沿 X 拉伸成棱柱面，
 * 顶点颜色由其高程所处岩土层决定，自然呈现地质分层。
 */
function buildMesh(config: DesignConfig, nodes: SectionNode[]) {
  const L = config.slopeLength;
  // 1) 细分剖面（让土岩分界在坡面上呈清晰色带）
  const refined: SectionNode[] = [];
  const SUB = 20;
  for (let k = 0; k < nodes.length - 1; k++) {
    const a = nodes[k], b = nodes[k + 1];
    refined.push(a);
    for (let i = 1; i < SUB; i++) {
      const t = i / SUB;
      refined.push({ y: a.y + (b.y - a.y) * t, z: a.z + (b.z - a.z) * t });
    }
  }
  refined.push(nodes[nodes.length - 1]);

  const nPts = refined.length;
  const positions: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];
  // 两列顶点：x=0 与 x=L
  for (let ix = 0; ix <= 1; ix++) {
    const x = ix * L;
    for (const p of refined) {
      positions.push(x, p.y, p.z);
      const layer = layerAtElev(p.y, config.layers);
      const c = layerColor(layer);
      colors.push(c[0], c[1], c[2]);
    }
  }
  const base = nPts;
  for (let k = 0; k < nPts - 1; k++) {
    const a = k, b = k + 1, c0 = base + k, d = base + k + 1;
    indices.push(a, c0, b, b, c0, d);
  }
  // 两端封盖（x=0 / x=L），三角扇
  const capColor: [number, number, number] = [0.22, 0.26, 0.32];
  const capStart = positions.length / 3;
  for (let end = 0; end < 2; end++) {
    const x = end * L;
    const center: Vec3 = [x, averageY(refined), averageZ(refined)];
    const ci = positions.length / 3;
    positions.push(...center);
    colors.push(...capColor);
    for (const p of refined) {
      positions.push(x, p.y, p.z);
      const layer = layerAtElev(p.y, config.layers);
      const cc = layerColor(layer);
      colors.push(cc[0] * 0.7, cc[1] * 0.7, cc[2] * 0.7);
    }
    for (let k = 0; k < nPts - 1; k++) {
      const a = capStart + 1 + k, b = capStart + 1 + k + 1;
      if (end === 0) indices.push(ci, b, a);
      else indices.push(ci, a, b);
    }
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    indices: new Uint32Array(indices),
  };
}

function averageY(n: SectionNode[]): number { return n.reduce((s, p) => s + p.y, 0) / n.length; }
function averageZ(n: SectionNode[]): number { return n.reduce((s, p) => s + p.z, 0) / n.length; }

/** 主入口：由设计参数生成完整边坡模型 */
export function buildSlopeModel(config: DesignConfig): SlopeModel {
  const { nodes, faces, boundaryElev } = buildSection(config);
  const mesh = buildMesh(config, nodes);
  const sectionPoints: Vec3[] = nodes.map((p) => [0, p.y, p.z]);
  return { faces, sectionPoints, mesh, soilRockBoundaryElev: boundaryElev };
}

/** 射线拾取：与各级坡面对应的四边形求交，取最近命中 */
export function pickSlope(ray: Ray, model: SlopeModel): PickHit | null {
  let best: PickHit | null = null;
  let bestT = Infinity;
  for (const face of model.faces) {
    const t = rayPlane(ray, face.topStart, face.normal);
    if (t === null || t >= bestT) continue;
    const p = v3.add(ray.origin, v3.scale(ray.dir, t));
    const x = p[0];
    const s = v3.dot(v3.sub(p, face.topStart), face.dipDir);
    const eps = 0.05;
    if (x < -eps || x > config_len(face) + eps || s < -eps || s > face.slopeLength + eps) continue;
    const cx = Math.max(0, Math.min(config_len(face), x));
    const cs = Math.max(0, Math.min(face.slopeLength, s));
    const cp = pointOnFace(face, cx, cs);
    best = {
      gradeId: face.gradeId, point: cp, x: cx, s: cs,
      elev: cp[1], face,
    };
    bestT = t;
  }
  return best;
}

// 坡面走向长度统一取顶线长度
function config_len(face: GradeFace): number {
  return face.topEnd[0] - face.topStart[0];
}
