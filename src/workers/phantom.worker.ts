import { buildPhantomVolume, PHANTOM_PRESETS } from '../data/phantom';

export interface PhantomRequest {
  id: string;
}

self.onmessage = (ev: MessageEvent<PhantomRequest>) => {
  const spec = PHANTOM_PRESETS.find((p) => p.id === ev.data.id);
  if (!spec) {
    (self as unknown as Worker).postMessage({ error: `未知体模 ${ev.data.id}` });
    return;
  }
  try {
    const vol = buildPhantomVolume(spec);
    (self as unknown as Worker).postMessage(
      {
        meta: {
          id: vol.id,
          width: vol.width,
          height: vol.height,
          depth: vol.depth,
          spacing: vol.spacing,
          origin: vol.origin,
          axisU: vol.axisU,
          axisV: vol.axisV,
          normal: vol.normal,
          minHU: vol.minHU,
          maxHU: vol.maxHU,
          description: vol.description,
          studyDate: vol.studyDate,
          patientLabel: vol.patientLabel,
          source: vol.source,
        },
        voxels: vol.voxels.buffer,
      },
      [vol.voxels.buffer],
    );
  } catch (e) {
    (self as unknown as Worker).postMessage({ error: e instanceof Error ? e.message : String(e) });
  }
};
