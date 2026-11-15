// IndexedDB 持久化：病例、预设、标定、图像 Blob 全部存在浏览器本地

const DB_NAME = 'esd-boundary-db';
const DB_VERSION = 1;

const STORE_CASES = 'cases';
const STORE_PRESETS = 'presets';
const STORE_CALIBRATIONS = 'calibrations';
const STORE_BLOBS = 'blobs';

let dbPromise: Promise<IDBDatabase> | null = null;

function openDb(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_CASES)) db.createObjectStore(STORE_CASES, { keyPath: 'id' });
      if (!db.objectStoreNames.contains(STORE_PRESETS)) db.createObjectStore(STORE_PRESETS, { keyPath: 'id' });
      if (!db.objectStoreNames.contains(STORE_CALIBRATIONS)) db.createObjectStore(STORE_CALIBRATIONS, { keyPath: 'id' });
      if (!db.objectStoreNames.contains(STORE_BLOBS)) db.createObjectStore(STORE_BLOBS);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

function tx<T>(store: string, mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const t = db.transaction(store, mode);
        const req = fn(t.objectStore(store));
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      }),
  );
}

function bulkTx(store: string, items: { key: string; value: unknown }[], mode: 'put' | 'delete'): Promise<void> {
  return openDb().then(
    (db) =>
      new Promise<void>((resolve, reject) => {
        const t = db.transaction(store, 'readwrite');
        const s = t.objectStore(store);
        for (const it of items) {
          if (mode === 'put') s.put(it.value, it.key);
          else s.delete(it.key);
        }
        t.oncomplete = () => resolve();
        t.onerror = () => reject(t.error);
      }),
  );
}

export async function idbGetAll<T>(store: string): Promise<T[]> {
  return tx<T[]>(store, 'readonly', (s) => s.getAll() as IDBRequest<T[]>);
}

export async function idbGet<T>(store: string, key: string): Promise<T | undefined> {
  return tx<T | undefined>(store, 'readonly', (s) => s.get(key) as IDBRequest<T | undefined>);
}

export async function idbPut<T extends { id: string }>(store: string, value: T): Promise<void> {
  await tx(store, 'readwrite', (s) => s.put(value));
}

export async function idbDelete(store: string, key: string): Promise<void> {
  await tx(store, 'readwrite', (s) => s.delete(key));
}

export async function idbPutBlob(key: string, blob: Blob): Promise<void> {
  await openDb().then(
    (db) =>
      new Promise<void>((resolve, reject) => {
        const t = db.transaction(STORE_BLOBS, 'readwrite');
        t.objectStore(STORE_BLOBS).put(blob, key);
        t.oncomplete = () => resolve();
        t.onerror = () => reject(t.error);
      }),
  );
}

export async function idbGetBlob(key: string): Promise<Blob | undefined> {
  return openDb().then(
    (db) =>
      new Promise<Blob | undefined>((resolve, reject) => {
        const t = db.transaction(STORE_BLOBS, 'readonly');
        const req = t.objectStore(STORE_BLOBS).get(key);
        req.onsuccess = () => resolve(req.result as Blob | undefined);
        req.onerror = () => reject(req.error);
      }),
  );
}

export async function idbDeleteBlob(key: string): Promise<void> {
  await openDb().then(
    (db) =>
      new Promise<void>((resolve, reject) => {
        const t = db.transaction(STORE_BLOBS, 'readwrite');
        t.objectStore(STORE_BLOBS).delete(key);
        t.oncomplete = () => resolve();
        t.onerror = () => reject(t.error);
      }),
  );
}

export const STORES = {
  CASES: STORE_CASES,
  PRESETS: STORE_PRESETS,
  CALIBRATIONS: STORE_CALIBRATIONS,
  BLOBS: STORE_BLOBS,
} as const;

export { bulkTx };
