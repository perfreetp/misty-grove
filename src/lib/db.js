// 浏览器本地 IndexedDB 封装：照片以 Blob 存储，其余业务数据以 JSON 对象存储
const DB_NAME = 'molemap3d';
const DB_VERSION = 1;

export const STORES = [
  'meta',        // 键值（含计数器、种子标记、当前操作人/角色）
  'patients',
  'visits',      // 就诊（基线/复诊）
  'moles',       // 痣主档（按编号长期追踪）
  'findings',    // 每次就诊对每颗痣的测量记录与皮肤镜照片
  'tasks',       // 随访任务及状态流转
  'judgments',   // 医师判读
  'reviews',     // 主任审核
  'zones',       // 解剖分区规则（技师维护）
  'angles',      // 拍摄角度模板（技师维护）
  'logs'         // 操作日志
];

let _db = null;

export function openDb() {
  if (_db) return Promise.resolve(_db);
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      for (const name of STORES) {
        if (!db.objectStoreNames.contains(name)) {
          const store = db.createObjectStore(name, { keyPath: 'id' });
          if (name === 'findings') {
            store.createIndex('visitId', 'visitId');
            store.createIndex('moleId', 'moleId');
          }
          if (name === 'moles') store.createIndex('patientId', 'patientId');
          if (name === 'visits') store.createIndex('patientId', 'patientId');
          if (name === 'tasks') {
            store.createIndex('patientId', 'patientId');
            store.createIndex('status', 'status');
          }
          if (name === 'judgments') {
            store.createIndex('taskId', 'taskId');
            store.createIndex('moleId', 'moleId');
          }
          if (name === 'reviews') store.createIndex('taskId', 'taskId');
          if (name === 'logs') store.createIndex('ts', 'ts');
        }
      }
    };
    req.onsuccess = () => {
      _db = req.result;
      resolve(_db);
    };
    req.onerror = () => reject(req.error);
  });
}

function tx(db, store, mode = 'readonly') {
  return db.transaction(store, mode).objectStore(store);
}

function wrap(req) {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

// Svelte 5 的 $state 会把对象包装成深层 Proxy，无法被 IndexedDB 结构化克隆，
// 写入前统一脱壳为普通对象（Blob/File 是结构化克隆支持的内置类型，JSON 会破坏它，故单独保留）。
function snapshot(value) {
  if (value === null || typeof value !== 'object') return value;
  if (typeof Blob !== 'undefined' && value instanceof Blob) return value;
  if (typeof File !== 'undefined' && value instanceof File) return value;
  if (Array.isArray(value)) return value.map(snapshot);
  if (value instanceof Date) return new Date(value.getTime());
  const out = {};
  for (const key of Object.keys(value)) {
    const v = value[key];
    if (v instanceof Blob || v instanceof File) out[key] = v;
    else if (v && typeof v === 'object') out[key] = snapshot(v);
    else out[key] = v;
  }
  return out;
}

export async function getAll(store) {
  const db = await openDb();
  return wrap(tx(db, store).getAll());
}

export async function getOne(store, id) {
  const db = await openDb();
  return wrap(tx(db, store).get(id));
}

export async function put(store, obj) {
  const db = await openDb();
  await wrap(tx(db, store, 'readwrite').put(snapshot(obj)));
  return obj;
}

export async function putBulk(store, objs) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const t = db.transaction(store, 'readwrite');
    const s = t.objectStore(store);
    for (const o of objs) s.put(snapshot(o));
    t.oncomplete = () => resolve(objs);
    t.onerror = () => reject(t.error);
  });
}

export async function remove(store, id) {
  const db = await openDb();
  await wrap(tx(db, store, 'readwrite').delete(id));
}

export async function clearStore(store) {
  const db = await openDb();
  await wrap(tx(db, store, 'readwrite').clear());
}

export async function getByIndex(store, indexName, value) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const req = tx(db, store).index(indexName).getAll(value);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

// ---- meta 键值 ----
export async function getMeta(key, fallback = null) {
  const db = await openDb();
  const row = await wrap(tx(db, 'meta').get(key));
  return row ? row.value : fallback;
}

export async function setMeta(key, value) {
  const db = await openDb();
  await wrap(tx(db, 'meta', 'readwrite').put(snapshot({ id: key, value })));
}

// 分区流水号：格式 { 'zoneId:seq': n }
export async function nextZoneSeq(zoneId) {
  const key = `seq:${zoneId}`;
  const n = (await getMeta(key, 0)) + 1;
  await setMeta(key, n);
  return n;
}

export function uid(prefix = '') {
  return prefix + (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2));
}
