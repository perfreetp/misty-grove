import { buildPhantomVolume, PHANTOM_PRESETS } from '../src/data/phantom';
import { writeFileSync } from 'node:fs';

/** Minimal explicit-VR little-endian DICOM writer for CT slices. */
function padEven(s: string) {
  return s.length % 2 ? s + ' ' : s;
}
function uid(seed: number) {
  return `1.2.826.0.1.3680043.10.999.${seed}.${Date.now() % 100000}`;
}
function elem(tag: string, vr: string, value: Buffer | string | number, num?: number) {
  const group = parseInt(tag.slice(1, 5), 16);
  const el = parseInt(tag.slice(5, 9), 16);
  let payload: Buffer;
  if (typeof value === 'string') payload = Buffer.from(padEven(value), 'ascii');
  else if (typeof value === 'number') {
    payload = Buffer.alloc(num === 4 ? 4 : 2);
    if (num === 4) payload.writeUInt32LE(value, 0);
    else payload.writeUInt16LE(value, 0);
  } else payload = value;
  const longVr = ['OB', 'OW', 'OF', 'SQ', 'UT', 'UN'];
  const head = Buffer.alloc(8);
  head.writeUInt16LE(group, 0);
  head.writeUInt16LE(el, 2);
  head.write(vr, 4, 2, 'ascii');
  if (longVr.includes(vr)) {
    head.writeUInt16LE(0, 6);
    const len = Buffer.alloc(4);
    len.writeUInt32LE(payload.length, 0);
    return Buffer.concat([head, len, payload]);
  }
  head.writeUInt16LE(payload.length, 6);
  return Buffer.concat([head, payload]);
}

const SEP = String.fromCharCode(92);
const spec = PHANTOM_PRESETS[0];
const vol = buildPhantomVolume(spec);
const seriesUid = uid(1);
const studyUid = uid(2);
const frameUid = uid(3);
const outDir = 'tools/dicomtest/series';
import { mkdirSync, rmSync } from 'node:fs';
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

let files = 0;
for (let z = 0; z < vol.depth; z++) {
  // Meta header (group 0002)
  const meta = Buffer.concat([
    elem('x00020000', 'UL', 208, 4),
    elem('x00020001', 'OB', Buffer.from([0, 1])),
    elem('x00020002', 'UI', '1.2.840.10008.5.1.4.1.1.2'),
    elem('x00020003', 'UI', seriesUid + '.' + z),
    elem('x00020010', 'UI', '1.2.840.10008.1.2.1'),
    elem('x00020012', 'UI', '1.2.826.0.1.3680043.10.999'),
  ]);
  // Explicit VR: meta group length must count from after the group-length element.
  const metaLen = meta.length - 12;
  meta.writeUInt32LE(metaLen, 8);

  const ipp = [vol.origin[0], vol.origin[1], vol.origin[2] + z * vol.spacing[2]].map((v) => v.toFixed(4)).join(SEP);
  const rows = vol.height;
  const cols = vol.width;
  const pixels = Buffer.alloc(rows * cols * 2);
  for (let i = 0; i < rows * cols; i++) {
    pixels.writeInt16LE(vol.voxels[z * rows * cols + i], i * 2);
  }
  const body = Buffer.concat([
    elem('x00080016', 'UI', '1.2.840.10008.5.1.4.1.1.2'),
    elem('x00080018', 'UI', seriesUid + '.' + z),
    elem('x00080020', 'DA', '20261102'),
    elem('x00080060', 'CS', 'CT'),
    elem('x00080090', 'PN', 'ZHOU LQ'),
    elem('x00100010', 'PN', 'PHANTOM^A'),
    elem('x00100020', 'LO', 'MRN-884120'),
    elem('x00100030', 'DA', '19500512'),
    elem('x00100040', 'CS', 'M'),
    elem('x00180050', 'DS', vol.spacing[2].toFixed(3)),
    elem('x00180060', 'DS', '120'),
    elem('x00180088', 'DS', '0'),
    elem('x00181020', 'LO', 'TAVR-PLAN'),
    elem('x0020000D', 'UI', studyUid),
    elem('x0020000E', 'UI', seriesUid),
    elem('x00200013', 'IS', String(z + 1)),
    elem('x00200032', 'DS', ipp),
    elem('x00200037', 'DS', ['1', '0', '0', '0', '1', '0'].join(SEP)),
    elem('x00200052', 'UI', frameUid),
    elem('x00201040', 'LO', ''),
    elem('x00280002', 'US', 1, 2),
    elem('x00280004', 'CS', 'MONOCHROME2'),
    elem('x00280008', 'IS', String(vol.depth)),
    elem('x00280010', 'US', rows, 2),
    elem('x00280011', 'US', cols, 2),
    elem('x00280030', 'DS', [vol.spacing[1], vol.spacing[0]].map((v) => v.toFixed(4)).join(SEP)),
    elem('x00280100', 'US', 16, 2),
    elem('x00280101', 'US', 16, 2),
    elem('x00280102', 'US', 15, 2),
    elem('x00280103', 'US', 1, 2),
    elem('x00281050', 'DS', '330'),
    elem('x00281051', 'DS', '760'),
    elem('x00281052', 'DS', '0'),
    elem('x00281053', 'DS', '1'),
    elem('x7fe00010', 'OW', pixels),
  ]);
  const file = Buffer.concat([Buffer.alloc(128), Buffer.from('DICM', 'ascii'), meta, body]);
  writeFileSync(`${outDir}/IM${String(z + 1).padStart(4, '0')}.dcm`, file);
  files++;
}
console.log('wrote', files, 'files, rows', vol.height, 'cols', vol.width, 'depth', vol.depth);
