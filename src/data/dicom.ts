import dicomParser from 'dicom-parser';
import type { Vec3, Volume, VolumeMeta } from '../lib/types';
import { dot, normalize } from '../lib/geom';

interface SliceInfo {
  z: number;
  rows: number;
  cols: number;
  /** [column spacing, row spacing] in mm */
  spacing: [number, number];
  origin: Vec3;
  axisU: Vec3;
  axisV: Vec3;
  pixels: Int16Array;
  instance: number;
  frameOfReference: string;
}

const BIG_ENDIAN_TS = ['1.2.840.10008.1.2.2', '1.2.840.10008.1.2.1.99'];

function parseFloats(v: string | undefined, expected: number): number[] | null {
  if (!v) return null;
  const parts = v.split('\\').map((s) => parseFloat(s.trim()));
  if (parts.length < expected) return null;
  if (!parts.slice(0, expected).every((p) => Number.isFinite(p))) return null;
  return parts;
}

function parseDicomFile(buffer: ArrayBuffer): SliceInfo | null {
  let ds: dicomParser.DataSet;
  try {
    ds = dicomParser.parseDicom(new Uint8Array(buffer));
  } catch {
    return null;
  }
  const rows = ds.uint16('x00280010');
  const cols = ds.uint16('x00280011');
  if (!rows || !cols) return null;
  if (ds.uint16('x00280100') !== 16) return null;
  const signed = ds.uint16('x00280103') !== 0;
  const el = ds.elements['x7fe00010'];
  if (!el || el.hadUndefinedLength) return null;

  const ts = ds.string('x00020010') ?? '1.2.840.10008.1.2.1';
  const littleEndian = !BIG_ENDIAN_TS.includes(ts);
  if (/1\.2\.840\.10008\.1\.2\.1\.99/.test(ts)) return null; // deflated – unsupported
  if (/1\.2\.840\.10008\.1\.2\.5/.test(ts)) return null; // RLE – unsupported

  const ipp = parseFloats(ds.string('x00200032'), 3);
  const iop = parseFloats(ds.string('x00200037'), 6);
  const ps = parseFloats(ds.string('x00280030'), 2);
  if (!ipp || !ps) return null;

  const axisU: Vec3 = iop ? normalize([iop[0], iop[1], iop[2]]) : [1, 0, 0];
  const axisV: Vec3 = iop ? normalize([iop[3], iop[4], iop[5]]) : [0, 1, 0];
  const origin: Vec3 = [ipp[0], ipp[1], ipp[2]];
  const spacing: [number, number] = [Math.abs(ps[1]) || 1, Math.abs(ps[0]) || 1];

  const slope = parseFloat(ds.string('x00281053') ?? '1') || 1;
  const intercept = parseFloat(ds.string('x00281052') ?? '0') || 0;

  const count = rows * cols;
  const need = count * 2;
  const start = el.dataOffset;
  if (start + need > ds.byteArray.length) return null;
  const view = new DataView(ds.byteArray.buffer, ds.byteArray.byteOffset + start, need);
  const pixels = new Int16Array(count);
  for (let i = 0; i < count; i++) {
    const raw = signed ? view.getInt16(i * 2, littleEndian) : view.getUint16(i * 2, littleEndian);
    pixels[i] = Math.round(raw * slope + intercept);
  }

  return {
    z: 0,
    rows,
    cols,
    spacing,
    origin,
    axisU,
    axisV,
    pixels,
    instance: parseInt(ds.string('x00200013') ?? '0', 10) || 0,
    frameOfReference: ds.string('x00200052') ?? '',
  };
}

export interface DicomLoadResult {
  volume: Volume;
  warnings: string[];
  accepted: number;
  skipped: number;
}

export interface DicomFileInput {
  name: string;
  buffer: ArrayBuffer;
}

export function loadDicomSeries(inputs: DicomFileInput[], seriesId: string): DicomLoadResult {
  const warnings: string[] = [];
  const slices: SliceInfo[] = [];
  let skipped = 0;
  for (const f of inputs) {
    try {
      const s = parseDicomFile(f.buffer);
      if (s) slices.push(s);
      else skipped++;
    } catch {
      skipped++;
    }
  }
  if (!slices.length) {
    throw new Error('未能从所选文件中解析出 DICOM 图像,请确认是包含 16 位 PixelData 的 CT 轴位序列。');
  }
  if (skipped) warnings.push(`${skipped} 个文件不是可用的 16 位 CT 图像,已跳过。`);

  const rows = slices[0].rows;
  const cols = slices[0].cols;
  const sameSize = slices.filter((s) => s.rows === rows && s.cols === cols);
  if (sameSize.length !== slices.length) {
    warnings.push(
      `${slices.length - sameSize.length} 个图像矩阵尺寸不同(${slices
        .filter((s) => s.rows !== rows || s.cols !== cols)
        .slice(0, 4)
        .map((s) => `${s.rows}×${s.cols}`)
        .join('、')}…),已仅保留 ${rows}×${cols}。`,
    );
  }

  const refs = Array.from(new Set(sameSize.map((s) => s.frameOfReference).filter(Boolean)));
  if (refs.length > 1) {
    warnings.push(`序列包含 ${refs.length} 个 FrameOfReference,可能混合了不同检查,建议确认后重新导入。`);
  }

  const axisU = sameSize[0].axisU;
  const axisV = sameSize[0].axisV;
  const normal = normalize([
    axisU[1] * axisV[2] - axisU[2] * axisV[1],
    axisU[2] * axisV[0] - axisU[0] * axisV[2],
    axisU[0] * axisV[1] - axisU[1] * axisV[0],
  ]);
  const misoriented = sameSize.filter((s) => Math.abs(dot(s.axisU, axisU)) < 0.999);
  if (misoriented.length) {
    warnings.push(`${misoriented.length} 个图像的方位余弦与首层不一致,已按序列法向投影排序,请核对。`);
  }
  for (const s of sameSize) s.z = dot(s.origin, normal);
  sameSize.sort((a, b) => a.z - b.z);

  const unique: SliceInfo[] = [];
  let duplicates = 0;
  for (const s of sameSize) {
    const prev = unique[unique.length - 1];
    if (!prev || Math.abs(prev.z - s.z) > 1e-3) unique.push(s);
    else duplicates++;
  }
  if (duplicates) warnings.push(`${duplicates} 层与相邻层位置重复,已去重。`);
  if (unique.length < 8) throw new Error('有效层数过少(少于 8 层),无法用于瓣环三维重建。');

  const spacingXY = unique[0].spacing;
  const diffs: number[] = [];
  for (let i = 1; i < unique.length; i++) diffs.push(Math.abs(unique[i].z - unique[i - 1].z));
  diffs.sort((a, b) => a - b);
  let dz = diffs[Math.floor(diffs.length / 2)] || 1;
  const irregular = diffs.some((d) => Math.abs(d - dz) > Math.max(0.2, dz * 0.15));
  if (irregular) {
    warnings.push(`层间距不均匀(中位 ${dz.toFixed(2)} mm),三维重建使用中位间距,钙化体积为估算值。`);
  }
  if (!(dz > 0.2 && dz < 10)) {
    dz = 1;
    warnings.push('层间距超出合理范围,已回退为 1.0 mm。');
  }

  const depth = unique.length;
  const voxels = new Int16Array(rows * cols * depth);
  let gmin = Infinity;
  let gmax = -Infinity;
  for (let s = 0; s < depth; s++) {
    voxels.set(unique[s].pixels, s * rows * cols);
    for (let i = 0; i < rows * cols; i++) {
      const v = unique[s].pixels[i];
      if (v < gmin) gmin = v;
      if (v > gmax) gmax = v;
    }
  }

  const meta: VolumeMeta = {
    id: seriesId,
    width: cols,
    height: rows,
    depth,
    spacing: [spacingXY[0], spacingXY[1], dz],
    origin: unique[0].origin,
    axisU,
    axisV,
    normal,
    minHU: gmin,
    maxHU: gmax,
    description: `DICOM 序列 · ${depth} 层 · 体素 ${spacingXY[0].toFixed(2)}×${spacingXY[1].toFixed(2)}×${dz.toFixed(2)} mm`,
    studyDate: new Date().toISOString().slice(0, 10),
    patientLabel: 'DICOM 导入',
    source: 'dicom',
    sliceLocations: unique.map((s) => s.z),
  };

  return {
    volume: { ...meta, voxels },
    warnings,
    accepted: sameSize.length,
    skipped,
  };
}

export function volumeSlice(vol: Volume, index: number): Int16Array {
  const area = vol.width * vol.height;
  const s = Math.max(0, Math.min(vol.depth - 1, index));
  return vol.voxels.subarray(s * area, s * area + area);
}

export function sampleHU(vol: Volume, x: number, y: number, z: number): number {
  const xi = Math.round(x);
  const yi = Math.round(y);
  const zi = Math.round(z);
  if (xi < 0 || yi < 0 || zi < 0 || xi >= vol.width || yi >= vol.height || zi >= vol.depth) return -1000;
  return vol.voxels[(zi * vol.height + yi) * vol.width + xi];
}

/** World-space point of the centre of a voxel. */
export function voxelCenterWorld(vol: Volume, x: number, y: number, z: number): Vec3 {
  return [
    vol.origin[0] + (x + 0.5) * vol.spacing[0] * vol.axisU[0] + (y + 0.5) * vol.spacing[1] * vol.axisV[0] + z * vol.spacing[2] * vol.normal[0],
    vol.origin[1] + (x + 0.5) * vol.spacing[0] * vol.axisU[1] + (y + 0.5) * vol.spacing[1] * vol.axisV[1] + z * vol.spacing[2] * vol.normal[1],
    vol.origin[2] + (x + 0.5) * vol.spacing[0] * vol.axisU[2] + (y + 0.5) * vol.spacing[1] * vol.axisV[2] + z * vol.spacing[2] * vol.normal[2],
  ];
}
