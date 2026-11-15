import { writable, derived, get } from 'svelte/store';
import { buildAlignment, calcRamp, calcStats, RAMP_TYPES, VEHICLES, STATUS, stakeText } from './calc.js';
import { SAMPLE_PROFILE } from './sampleData.js';

function load(key, fallback) {
  try { const s = localStorage.getItem(key); if (s) return JSON.parse(s); } catch {}
  return fallback;
}
function persist(store, key) {
  store.subscribe(v => { try { localStorage.setItem(key, JSON.stringify(v)); } catch {} });
}

export const profile = writable(load('er_profile', SAMPLE_PROFILE));
export const ramps = writable(load('er_ramps', []));
export const settings = writable(load('er_settings', { runawayRate: 0.8 }));
export const selectedId = writable(null);
export const addMode = writable(false);

persist(profile, 'er_profile');
persist(ramps, 'er_ramps');
persist(settings, 'er_settings');

export const alignment = derived(profile, $p => buildAlignment($p));

export const results = derived(
  [ramps, profile, alignment],
  ([$ramps, $profile, $alignment]) => {
    const map = {};
    for (const r of $ramps) map[r.id] = calcRamp(r, $profile, $alignment, $ramps);
    return map;
  }
);

export const stats = derived(
  [ramps, results, profile, settings],
  ([$ramps, $results, $profile, $settings]) =>
    calcStats($ramps, $results, $profile, $settings.runawayRate)
);

// 全部修订记录(按时间倒序)
export const allRevisions = derived(ramps, $ramps =>
  $ramps
    .flatMap(r => (r.revisions || []).map(v => ({ ...v, rampName: r.name, rampId: r.id })))
    .sort((a, b) => b.time.localeCompare(a.time))
);

function now() { return new Date().toLocaleString('zh-CN', { hour12: false }); }

function basisOf(ramp) {
  const res = calcRamp(ramp, get(profile), get(alignment), get(ramps));
  return res.basis;
}

export function addRamp(stakeM) {
  const id = 'R' + Date.now().toString(36);
  const n = get(ramps).length + 1;
  const ramp = {
    id,
    name: `避险车道${n}号`,
    stakeM: Math.round(stakeM),
    type: 'sand',
    vehicle: 'heavyTruck',
    v0: VEHICLES.heavyTruck.v0,
    loadT: VEHICLES.heavyTruck.load,
    status: 'draft',
    revisions: []
  };
  ramp.revisions.push({
    time: now(), action: '创建',
    detail: `于 ${stakeText(ramp.stakeM)} 拟定 ${RAMP_TYPES[ramp.type].name},状态:拟定`,
    basis: basisOf(ramp)
  });
  ramps.update(rs => [...rs, ramp]);
  selectedId.set(id);
  addMode.set(false);
  return id;
}

export function updateRampStake(id, stakeM) {
  ramps.update(rs => rs.map(r => r.id === id ? { ...r, stakeM: Math.round(stakeM) } : r));
}

export function commitMove(id, fromStake) {
  ramps.update(rs => rs.map(r => {
    if (r.id !== id) return r;
    if (Math.round(fromStake) === r.stakeM) return r;
    const rev = {
      time: now(), action: '调整位置',
      detail: `引道口由 ${stakeText(fromStake)} 移至 ${stakeText(r.stakeM)}`,
      basis: basisOf(r)
    };
    return { ...r, revisions: [...r.revisions, rev] };
  }));
}

export function updateRamp(id, patch, actionLabel) {
  ramps.update(rs => rs.map(r => {
    if (r.id !== id) return r;
    const next = { ...r, ...patch };
    const changes = [];
    if (patch.type && patch.type !== r.type) changes.push(`型式 ${RAMP_TYPES[r.type].name}→${RAMP_TYPES[patch.type].name}`);
    if (patch.vehicle && patch.vehicle !== r.vehicle) changes.push(`车型 ${VEHICLES[r.vehicle].name}→${VEHICLES[patch.vehicle].name}`);
    if (patch.v0 !== undefined && patch.v0 !== r.v0) changes.push(`初速度 ${r.v0}→${patch.v0} km/h`);
    if (patch.loadT !== undefined && patch.loadT !== r.loadT) changes.push(`载重 ${r.loadT}→${patch.loadT} t`);
    if (patch.bedGrade !== undefined && patch.bedGrade !== (r.bedGrade ?? RAMP_TYPES[r.type].grade)) changes.push(`制动床纵坡→${patch.bedGrade}%`);
    if (patch.fric !== undefined && patch.fric !== (r.fric ?? RAMP_TYPES[r.type].fric)) changes.push(`滚动阻力系数→${patch.fric}`);
    if (patch.name && patch.name !== r.name) changes.push(`更名 ${r.name}→${patch.name}`);
    if (changes.length === 0) return next;
    const rev = {
      time: now(), action: actionLabel || '修改参数',
      detail: changes.join(';'),
      basis: basisOf(next)
    };
    return { ...next, revisions: [...next.revisions, rev] };
  }));
}

export function advanceStatus(id) {
  const r = get(ramps).find(x => x.id === id);
  if (!r) return { ok: false, msg: '未找到该避险车道' };
  const cur = STATUS[r.status];
  if (!cur.next) return { ok: false, msg: '已建成,流程结束' };
  const res = get(results)[id];
  if (r.status === 'draft' && res && res.errors.length > 0) {
    return { ok: false, msg: '存在标红问题(长度不足或视距遮挡),请先挪位置或换型式再提交联审' };
  }
  const next = cur.next;
  ramps.update(rs => rs.map(x => x.id === id ? {
    ...x, status: next,
    revisions: [...x.revisions, {
      time: now(), action: '状态流转',
      detail: `${cur.name} → ${STATUS[next].name}`,
      basis: basisOf(x)
    }]
  } : x));
  return { ok: true };
}

export function rollbackStatus(id) {
  const order = ['draft', 'review', 'approved', 'built'];
  ramps.update(rs => rs.map(r => {
    if (r.id !== id) return r;
    const idx = order.indexOf(r.status);
    if (idx <= 0) return r;
    const prev = order[idx - 1];
    return { ...r, status: prev, revisions: [...r.revisions, {
      time: now(), action: '状态回退',
      detail: `${STATUS[r.status].name} → ${STATUS[prev].name}(退回修改)`,
      basis: basisOf(r)
    }] };
  }));
}

export function deleteRamp(id) {
  ramps.update(rs => rs.filter(r => r.id !== id));
  if (get(selectedId) === id) selectedId.set(null);
}

export function importProfile(segments) {
  profile.set(segments);
}

export function resetAll() {
  ramps.set([]);
  profile.set(SAMPLE_PROFILE);
  selectedId.set(null);
}
