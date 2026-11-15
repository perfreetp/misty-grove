/* 列主序 4x4 矩阵与向量工具（约定同 gl-matrix，WebGPU 直接可用） */
(function (global) {
  const App = global.App || (global.App = {});

  const Mat4 = {
    create() {
      const m = new Float32Array(16);
      m[0] = m[5] = m[10] = m[15] = 1;
      return m;
    },
    identity(out) {
      out.fill(0);
      out[0] = out[5] = out[10] = out[15] = 1;
      return out;
    },
    perspective(out, fovyRad, aspect, near, far) {
      const f = 1 / Math.tan(fovyRad / 2);
      const nf = 1 / (near - far);
      out.fill(0);
      out[0] = f / aspect;
      out[5] = f;
      out[10] = far * nf;
      out[11] = -1;
      out[14] = far * near * nf;
      return out;
    },
    lookAt(out, eye, center, up) {
      let [x0, y0, z0] = [eye[0] - center[0], eye[1] - center[1], eye[2] - center[2]];
      let len = Math.hypot(x0, y0, z0) || 1;
      x0 /= len; y0 /= len; z0 /= len;
      let x1 = up[1] * z0 - up[2] * y0;
      let y1 = up[2] * x0 - up[0] * z0;
      let z1 = up[0] * y0 - up[1] * x0;
      len = Math.hypot(x1, y1, z1) || 1;
      x1 /= len; y1 /= len; z1 /= len;
      const x2 = y0 * z1 - z0 * y1;
      const y2 = z0 * x1 - x0 * z1;
      const z2 = x0 * y1 - y0 * x1;
      out[0] = x1; out[1] = x2; out[2] = x0; out[3] = 0;
      out[4] = y1; out[5] = y2; out[6] = y0; out[7] = 0;
      out[8] = z1; out[9] = z2; out[10] = z0; out[11] = 0;
      out[12] = -(x1 * eye[0] + y1 * eye[1] + z1 * eye[2]);
      out[13] = -(x2 * eye[0] + y2 * eye[1] + z2 * eye[2]);
      out[14] = -(x0 * eye[0] + y0 * eye[1] + z0 * eye[2]);
      out[15] = 1;
      return out;
    },
    multiply(out, a, b) {
      const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
      const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
      const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
      const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
      let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
      out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
      out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
      out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
      out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      return out;
    },
  };

  function v3normalize(v) {
    const l = Math.hypot(v[0], v[1], v[2]) || 1;
    return [v[0] / l, v[1] / l, v[2] / l];
  }
  function v3sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function v3dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function v3cross(a, b) {
    return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  }

  App.Mat4 = Mat4;
  App.v3 = { normalize: v3normalize, sub: v3sub, dot: v3dot, cross: v3cross };
})(window);
