import type { AppState, Volume, VolumeMeta } from '../lib/types';

const DB_NAME = 'tavr-planning-station';
const DB_VERSION = 1;
const STORE_STATE = 'state';
const STORE_VOLUMES = 'volumes';

let dbPromise: Promise<IDBDatabase> | null = null;

function openDb(): Promise<IDBDatabase> {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE_STATE)) db.createObjectStore(STORE_STATE);
        if (!db.objectStoreNames.contains(STORE_VOLUMES)) db.createObjectStore(STORE_VOLUMES);
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error ?? new Error('IndexedDB 打开失败'));
    });
  }
  return dbPromise;
}

function tx<T>(store: string, mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const t = db.transaction(store, mode);
        const req = fn(t.objectStore(store));
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error ?? new Error('IndexedDB 操作失败'));
      }),
  );
}

export interface StoredVolume {
  meta: VolumeMeta;
  voxels: ArrayBuffer;
  savedAt: number;
}

export async function saveState(state: AppState): Promise<void> {
  const plain = JSON.parse(JSON.stringify(state));
  await tx(STORE_STATE, 'readwrite', (s) => s.put(plain, 'app'));
}

export async function loadState(): Promise<AppState | null> {
  try {
    const v = await tx<AppState | undefined>(STORE_STATE, 'readonly', (s) => s.get('app'));
    return v ?? null;
  } catch {
    return null;
  }
}

export async function saveVolume(meta: VolumeMeta, voxels: Int16Array): Promise<void> {
  const copy = voxels.slice();
  const record = {
    meta,
    voxels: copy.buffer,
    savedAt: Date.now(),
  };
  await tx(STORE_VOLUMES, 'readwrite', (s) => s.put(record, meta.id));
}

export async function loadVolume(id: string): Promise<Volume | null> {
  try {
    const rec = await tx<{ meta: VolumeMeta; voxels: ArrayBuffer; savedAt: number } | undefined>(
      STORE_VOLUMES,
      'readonly',
      (s) => s.get(id),
    );
    if (!rec) return null;
    return { ...rec.meta, voxels: new Int16Array(rec.voxels) };
  } catch {
    return null;
  }
}

export async function listVolumes(): Promise<{ id: string; meta: VolumeMeta; savedAt: number; bytes: number }[]> {
  try {
    const db = await openDb();
    return new Promise((resolve) => {
      const t = db.transaction(STORE_VOLUMES, 'readonly');
      const store = t.objectStore(STORE_VOLUMES);
      const out: { id: string; meta: VolumeMeta; savedAt: number; bytes: number }[] = [];
      const req = store.openCursor();
      req.onsuccess = () => {
        const cursor = req.result;
        if (cursor) {
          const v = cursor.value as { meta: VolumeMeta; voxels: ArrayBuffer; savedAt: number };
          out.push({ id: cursor.key as string, meta: v.meta, savedAt: v.savedAt, bytes: v.voxels.byteLength });
          cursor.continue();
        } else resolve(out);
      };
      req.onerror = () => resolve([]);
    });
  } catch {
    return [];
  }
}

export async function deleteVolume(id: string): Promise<void> {
  try {
    await tx(STORE_VOLUMES, 'readwrite', (s) => s.delete(id));
  } catch {
    /* ignore */
  }
}

export async function estimateUsage(): Promise<{ usage: number; quota: number } | null> {
  if (!navigator.storage?.estimate) return null;
  try {
    const e = await navigator.storage.estimate();
    return { usage: e.usage ?? 0, quota: e.quota ?? 0 };
  } catch {
    return null;
  }
}
