/* 程序化几何：网格结构 {positions, normals, colors, indices}，可合并、可实例化 */
(function (global) {
  const App = global.App || (global.App = {});

  function makeMesh() {
    return { positions: [], normals: [], colors: [], indices: [] };
  }

  function pushVertex(mesh, p, n, c) {
    mesh.positions.push(p[0], p[1], p[2]);
    mesh.normals.push(n[0], n[1], n[2]);
    mesh.colors.push(c[0], c[1], c[2], c[3] ?? 1);
    return mesh.positions.length / 3 - 1;
  }

  /* 立方体（六面分别发光，法线更直观），center/size 为世界坐标尺寸，color=[r,g,b] 0..1 */
  function box(center, size, color) {
    const mesh = makeMesh();
    const hx = size[0] / 2, hy = size[1] / 2, hz = size[2] / 2;
    const [cx, cy, cz] = center;
    const c = [color[0], color[1], color[2], color[3] ?? 1];
    const faces = [
      { n: [1, 0, 0], verts: [[hx, -hy, -hz], [hx, hy, -hz], [hx, hy, hz], [hx, -hy, hz]] },
      { n: [-1, 0, 0], verts: [[-hx, -hy, hz], [-hx, hy, hz], [-hx, hy, -hz], [-hx, -hy, -hz]] },
      { n: [0, 1, 0], verts: [[-hx, hy, -hz], [-hx, hy, hz], [hx, hy, hz], [hx, hy, -hz]] },
      { n: [0, -1, 0], verts: [[-hx, -hy, hz], [-hx, -hy, -hz], [hx, -hy, -hz], [hx, -hy, hz]] },
      { n: [0, 0, 1], verts: [[-hx, -hy, hz], [hx, -hy, hz], [hx, hy, hz], [-hx, hy, hz]] },
      { n: [0, 0, -1], verts: [[hx, -hy, -hz], [-hx, -hy, -hz], [-hx, hy, -hz], [hx, hy, -hz]] },
    ];
    for (const f of faces) {
      const base = mesh.positions.length / 3;
      for (const v of f.verts) {
        pushVertex(mesh, [v[0] + cx, v[1] + cy, v[2] + cz], f.n, c);
      }
      mesh.indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
    }
    return mesh;
  }

  /* UV 球，用于 BGA 焊球 */
  function sphere(center, radius, color, latSegments = 14, lonSegments = 18) {
    const mesh = makeMesh();
    const c = [color[0], color[1], color[2], color[3] ?? 1];
    const [cx, cy, cz] = center;
    for (let lat = 0; lat <= latSegments; lat++) {
      const theta = (lat / latSegments) * Math.PI;
      const sinT = Math.sin(theta), cosT = Math.cos(theta);
      for (let lon = 0; lon <= lonSegments; lon++) {
        const phi = (lon / lonSegments) * Math.PI * 2;
        const sinP = Math.sin(phi), cosP = Math.cos(phi);
        const nx = sinT * cosP, ny = cosT, nz = sinT * sinP;
        pushVertex(
          mesh,
          [cx + radius * nx, cy + radius * ny, cz + radius * nz],
          [nx, ny, nz],
          c
        );
      }
    }
    const row = lonSegments + 1;
    for (let lat = 0; lat < latSegments; lat++) {
      for (let lon = 0; lon < lonSegments; lon++) {
        const a = lat * row + lon;
        const b = a + row;
        mesh.indices.push(a, b, a + 1, a + 1, b, b + 1);
      }
    }
    return mesh;
  }

  /* 圆环，用于缺球占位 */
  function torus(center, radius, tube, color, radialSegments = 10, tubularSegments = 24) {
    const mesh = makeMesh();
    const c = [color[0], color[1], color[2], color[3] ?? 1];
    const [cx, cy, cz] = center;
    for (let i = 0; i <= radialSegments; i++) {
      const u = (i / radialSegments) * Math.PI * 2;
      const cu = Math.cos(u), su = Math.sin(u);
      for (let j = 0; j <= tubularSegments; j++) {
        const v = (j / tubularSegments) * Math.PI * 2;
        const cv = Math.cos(v), sv = Math.sin(v);
        const x = (radius + tube * cv) * cu;
        const y = tube * sv;
        const z = (radius + tube * cv) * su;
        const n = [cv * cu, sv, cv * su];
        pushVertex(mesh, [cx + x, cy + y, cz + z], n, c);
      }
    }
    const row = tubularSegments + 1;
    for (let i = 0; i < radialSegments; i++) {
      for (let j = 0; j < tubularSegments; j++) {
        const a = i * row + j;
        const b = a + row;
        mesh.indices.push(a, b, a + 1, a + 1, b, b + 1);
      }
    }
    return mesh;
  }

  /* 圆柱：用于连锡标记的连接柱 */
  function cylinder(center, radius, height, color, segments = 16) {
    const mesh = makeMesh();
    const c = [color[0], color[1], color[2], color[3] ?? 1];
    const [cx, cy, cz] = center;
    const hy = height / 2;
    const sideBase = mesh.positions.length / 3;
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      const x = Math.cos(a), z = Math.sin(a);
      pushVertex(mesh, [cx + radius * x, cy - hy, cz + radius * z], [x, 0, z], c);
      pushVertex(mesh, [cx + radius * x, cy + hy, cz + radius * z], [x, 0, z], c);
    }
    for (let i = 0; i < segments; i++) {
      const a = sideBase + i * 2;
      mesh.indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
    // 顶/底盖
    const topCenter = pushVertex(mesh, [cx, cy + hy, cz], [0, 1, 0], c);
    const topStart = mesh.positions.length / 3;
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      pushVertex(mesh, [cx + radius * Math.cos(a), cy + hy, cz + radius * Math.sin(a)], [0, 1, 0], c);
    }
    for (let i = 0; i < segments; i++) mesh.indices.push(topCenter, topStart + i, topStart + i + 1);
    const botCenter = pushVertex(mesh, [cx, cy - hy, cz], [0, -1, 0], c);
    const botStart = mesh.positions.length / 3;
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      pushVertex(mesh, [cx + radius * Math.cos(a), cy - hy, cz + radius * Math.sin(a)], [0, -1, 0], c);
    }
    for (let i = 0; i < segments; i++) mesh.indices.push(botCenter, botStart + i + 1, botStart + i);
    return mesh;
  }

  /* 合并多个网格为一个（实例化前先合批，降低 draw call） */
  function merge(meshes) {
    const out = makeMesh();
    for (const m of meshes) {
      const offset = out.positions.length / 3;
      out.positions.push(...m.positions);
      out.normals.push(...m.normals);
      out.colors.push(...m.colors);
      for (const idx of m.indices) out.indices.push(idx + offset);
    }
    return out;
  }

  /* 单位立方体（1x1x1，居中于原点），供实例化使用 */
  function unitBox() {
    return box([0, 0, 0], [1, 1, 1], [1, 1, 1, 1]);
  }

  App.Geometry = { makeMesh, box, sphere, torus, cylinder, merge, unitBox };
})(window);
