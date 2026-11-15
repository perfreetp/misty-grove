import type { AssetRecord, AuditEvent, Exam, FrameRecord } from './types';

const DB_NAME = 'capsule-station';
const DB_VERSION = 1;

const STORE_EXAMS = 'exams';
const STORE_AUDIT = 'audit';
const STORE_ASSETS = 'assets';
const STORE_FRAMES = 'frames';

let dbPromise: Promise<IDBDatabase> | null = null;

function openDb(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_EXAMS)) {
        db.createObjectStore(STORE_EXAMS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_AUDIT)) {
        const store = db.createObjectStore(STORE_AUDIT, { keyPath: 'id' });
        store.createIndex('byExam', 'examId');
        store.createIndex('byTime', 'at');
      }
      if (!db.objectStoreNames.contains(STORE_ASSETS)) {
        const store = db.createObjectStore(STORE_ASSETS, { keyPath: 'id' });
        store.createIndex('byExam', 'examId');
      }
      if (!db.objectStoreNames.contains(STORE_FRAMES)) {
        const store = db.createObjectStore(STORE_FRAMES, { keyPath: 'key' });
        store.createIndex('byExam', 'examId');
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error('IndexedDB 打开失败'));
    req.onblocked = () => reject(new Error('IndexedDB 被其他页面占用'));
  });
  return dbPromise;
}

function txDone(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error('IndexedDB 事务失败'));
    tx.onabort = () => reject(tx.error ?? new Error('IndexedDB 事务被中止'));
  });
}

function reqResult<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error('IndexedDB 请求失败'));
  });
}

export class StorageService {
  async init(): Promise<void> {
    await openDb();
  }

  async listExams(): Promise<Exam[]> {
    const db = await openDb();
    const tx = db.transaction(STORE_EXAMS, 'readonly');
    const all = await reqResult(tx.objectStore(STORE_EXAMS).getAll() as IDBRequest<Exam[]>);
    return all.sort((a, b) => b.registeredAt - a.registeredAt);
  }

  async getExam(id: string): Promise<Exam | undefined> {
    const db = await openDb();
    const tx = db.transaction(STORE_EXAMS, 'readonly');
    return reqResult(tx.objectStore(STORE_EXAMS).get(id) as IDBRequest<Exam | undefined>);
  }

  async saveExam(exam: Exam): Promise<void> {
    const db = await openDb();
    const tx = db.transaction(STORE_EXAMS, 'readwrite');
    tx.objectStore(STORE_EXAMS).put(exam);
    await txDone(tx);
  }

  async saveExams(exams: Exam[]): Promise<void> {
    if (exams.length === 0) return;
    const db = await openDb();
    const tx = db.transaction(STORE_EXAMS, 'readwrite');
    const store = tx.objectStore(STORE_EXAMS);
    for (const exam of exams) store.put(exam);
    await txDone(tx);
  }

  async listAudit(examId?: string): Promise<AuditEvent[]> {
    const db = await openDb();
    const tx = db.transaction(STORE_AUDIT, 'readonly');
    const store = tx.objectStore(STORE_AUDIT);
    const req = examId ? (store.index('byExam').getAll(examId) as IDBRequest<AuditEvent[]>) : (store.getAll() as IDBRequest<AuditEvent[]>);
    const all = await reqResult(req);
    return all.sort((a, b) => b.at - a.at);
  }

  async appendAudit(events: AuditEvent[]): Promise<void> {
    if (events.length === 0) return;
    const db = await openDb();
    const tx = db.transaction(STORE_AUDIT, 'readwrite');
    const store = tx.objectStore(STORE_AUDIT);
    for (const e of events) store.put(e);
    await txDone(tx);
  }

  async putAsset(asset: AssetRecord): Promise<void> {
    const db = await openDb();
    const tx = db.transaction(STORE_ASSETS, 'readwrite');
    tx.objectStore(STORE_ASSETS).put(asset);
    await txDone(tx);
  }

  async putAssets(assets: AssetRecord[]): Promise<void> {
    if (assets.length === 0) return;
    const db = await openDb();
    const tx = db.transaction(STORE_ASSETS, 'readwrite');
    const store = tx.objectStore(STORE_ASSETS);
    for (const a of assets) store.put(a);
    await txDone(tx);
  }

  async getAsset(id: string): Promise<AssetRecord | undefined> {
    const db = await openDb();
    const tx = db.transaction(STORE_ASSETS, 'readonly');
    return reqResult(tx.objectStore(STORE_ASSETS).get(id) as IDBRequest<AssetRecord | undefined>);
  }

  async listAssets(examId: string): Promise<AssetRecord[]> {
    const db = await openDb();
    const tx = db.transaction(STORE_ASSETS, 'readonly');
    return reqResult(tx.objectStore(STORE_ASSETS).index('byExam').getAll(examId) as IDBRequest<AssetRecord[]>);
  }

  async putFrames(frames: FrameRecord[]): Promise<void> {
    if (frames.length === 0) return;
    const db = await openDb();
    const tx = db.transaction(STORE_FRAMES, 'readwrite');
    const store = tx.objectStore(STORE_FRAMES);
    for (const f of frames) store.put(f);
    await txDone(tx);
  }

  async getFrame(examId: string, frameIndex: number): Promise<FrameRecord | undefined> {
    const db = await openDb();
    const tx = db.transaction(STORE_FRAMES, 'readonly');
    return reqResult(tx.objectStore(STORE_FRAMES).get(`${examId}:${frameIndex}`) as IDBRequest<FrameRecord | undefined>);
  }

  async countFrames(examId: string): Promise<number> {
    const db = await openDb();
    const tx = db.transaction(STORE_FRAMES, 'readonly');
    return reqResult(tx.objectStore(STORE_FRAMES).index('byExam').count(examId));
  }

  async listFrames(examId: string): Promise<FrameRecord[]> {
    const db = await openDb();
    const tx = db.transaction(STORE_FRAMES, 'readonly');
    return reqResult(tx.objectStore(STORE_FRAMES).index('byExam').getAll(examId) as IDBRequest<FrameRecord[]>);
  }

  async deleteExam(id: string): Promise<void> {
    const db = await openDb();
    const tx = db.transaction([STORE_EXAMS, STORE_AUDIT, STORE_ASSETS, STORE_FRAMES], 'readwrite');
    tx.objectStore(STORE_EXAMS).delete(id);
    for (const storeName of [STORE_AUDIT, STORE_ASSETS, STORE_FRAMES]) {
      const store = tx.objectStore(storeName);
      const keys = await reqResult(store.index('byExam').getAllKeys(id));
      for (const key of keys) store.delete(key);
    }
    await txDone(tx);
  }

  async clearAll(): Promise<void> {
    const db = await openDb();
    const tx = db.transaction([STORE_EXAMS, STORE_AUDIT, STORE_ASSETS, STORE_FRAMES], 'readwrite');
    for (const name of [STORE_EXAMS, STORE_AUDIT, STORE_ASSETS, STORE_FRAMES]) tx.objectStore(name).clear();
    await txDone(tx);
  }
}

export const storage = new StorageService();
