<script setup>
import { reactive, ref } from 'vue'
import { store, uid, STATUS } from '../store'
import { fmtStake, parseStake } from '../rules'

const blank = () => ({
  id: null, name: '', code: '',
  kStartText: 'K120+000', kEndText: 'K123+000',
  lanes: 3, designSpeed: 120,
  medianOpenings: [],
  period: { start: '', end: '' }
})

const form = reactive(blank())
const editing = ref(false)
const formErr = ref('')

function edit(sec) {
  Object.assign(form, blank(), {
    id: sec.id, name: sec.name, code: sec.code,
    kStartText: fmtStake(sec.kStart), kEndText: fmtStake(sec.kEnd),
    lanes: sec.lanes, designSpeed: sec.designSpeed,
    medianOpenings: sec.medianOpenings.map(o => ({ ...o, stakeText: fmtStake(o.stake) })),
    period: { ...sec.period }
  })
  editing.value = true
  formErr.value = ''
}

function addOpening() {
  form.medianOpenings.push({ stakeText: '', label: `${form.medianOpenings.length + 1}#开口` })
}

function save() {
  const kStart = parseStake(form.kStartText)
  const kEnd = parseStake(form.kEndText)
  if (!form.name.trim()) { formErr.value = '请填写路段名称'; return }
  if (!Number.isFinite(kStart) || !Number.isFinite(kEnd) || kEnd <= kStart) {
    formErr.value = '桩号范围无效，请按 K120+000 格式填写且终点大于起点'; return
  }
  if (form.lanes < 1 || form.lanes > 6) { formErr.value = '主线车道数应在 1~6 之间'; return }
  if (!form.period.start || !form.period.end || form.period.end < form.period.start) {
    formErr.value = '请填写有效的施工工期(结束日期不早于开始日期)'; return
  }
  const openings = []
  for (const o of form.medianOpenings) {
    const s = parseStake(o.stakeText)
    if (!Number.isFinite(s)) { formErr.value = `开口「${o.label}」桩号无效`; return }
    if (s <= kStart || s >= kEnd) { formErr.value = `开口「${o.label}」桩号须在路段范围内`; return }
    openings.push({ stake: s, label: o.label || '开口' })
  }
  const data = {
    name: form.name.trim(), code: form.code.trim() || 'SEC',
    kStart, kEnd, lanes: Number(form.lanes), designSpeed: Number(form.designSpeed),
    medianOpenings: openings, period: { ...form.period }
  }
  if (form.id) {
    Object.assign(store.sections.find(s => s.id === form.id), data)
  } else {
    store.sections.push({ id: uid(), ...data })
  }
  Object.assign(form, blank())
  editing.value = false
  formErr.value = ''
}

function remove(sec) {
  if (store.plans.some(p => p.sectionId === sec.id)) {
    alert('该路段下已有渠化方案，请先删除相关方案')
    return
  }
  if (confirm(`确定删除路段「${sec.name}」?`)) {
    store.sections.splice(store.sections.indexOf(sec), 1)
  }
}

function toEditor(sec) {
  store.ui.sectionId = sec.id
  let p = store.plans.find(x => x.sectionId === sec.id && (x.status === '草稿' || x.status === '退回'))
  if (!p) {
    p = {
      id: uid(), sectionId: sec.id, name: `${sec.name} 渠化方案`,
      status: '草稿', items: [], reviews: {}, history: [],
      version: null, removeDate: null, removed: false,
      createdAt: new Date().toLocaleString('zh-CN', { hour12: false })
    }
    store.plans.push(p)
  }
  store.ui.planId = p.id
  store.ui.tab = 'editor'
}

function plansOf(sec) {
  return store.plans.filter(p => p.sectionId === sec.id)
}
</script>

<template>
  <div class="panel">
    <h2>路段档案</h2>
    <table class="grid">
      <thead>
        <tr>
          <th>路段名称</th><th>桩号范围</th><th>主线车道数</th><th>设计速度</th>
          <th>中央分隔带开口</th><th>施工工期</th><th>方案数</th><th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sec in store.sections" :key="sec.id">
          <td>{{ sec.name }}</td>
          <td>{{ fmtStake(sec.kStart) }} ~ {{ fmtStake(sec.kEnd) }}</td>
          <td>{{ sec.lanes }} 车道</td>
          <td>{{ sec.designSpeed }} km/h</td>
          <td>
            <span v-if="!sec.medianOpenings.length" class="muted">无</span>
            <span v-for="o in sec.medianOpenings" :key="o.stake" class="badge badge-draft" style="margin-right:4px">
              {{ o.label }} {{ fmtStake(o.stake) }}
            </span>
          </td>
          <td>{{ sec.period.start }} ~ {{ sec.period.end }}</td>
          <td>{{ plansOf(sec).length }}</td>
          <td style="white-space:nowrap">
            <button @click="edit(sec)">编辑</button>
            <button class="primary" style="margin:0 4px" @click="toEditor(sec)">去编排</button>
            <button class="danger" @click="remove(sec)">删除</button>
          </td>
        </tr>
        <tr v-if="!store.sections.length"><td colspan="8" class="muted" style="text-align:center">暂无路段，请在下方新建</td></tr>
      </tbody>
    </table>
  </div>

  <div class="panel">
    <h2>{{ form.id ? '编辑路段' : '新建路段' }}</h2>
    <div class="form-row">
      <label><span>路段名称</span><input v-model="form.name" style="width:260px" placeholder="如:G2京沪高速改扩建(北京方向)" /></label>
      <label><span>路段代号</span><input v-model="form.code" style="width:110px" placeholder="如:G2K120" /></label>
      <label><span>起点桩号</span><input v-model="form.kStartText" style="width:110px" /></label>
      <label><span>终点桩号</span><input v-model="form.kEndText" style="width:110px" /></label>
      <label><span>主线车道数(单向)</span>
        <select v-model.number="form.lanes"><option v-for="n in [2,3,4,5,6]" :key="n" :value="n">{{ n }}</option></select>
      </label>
      <label><span>设计速度</span>
        <select v-model.number="form.designSpeed">
          <option :value="120">120 km/h</option><option :value="100">100 km/h</option><option :value="80">80 km/h</option>
        </select>
      </label>
      <label><span>施工开始</span><input type="date" v-model="form.period.start" /></label>
      <label><span>施工结束</span><input type="date" v-model="form.period.end" /></label>
    </div>

    <h3>中央分隔带开口 <button style="margin-left:8px" @click="addOpening">+ 添加开口</button></h3>
    <div v-for="(o, i) in form.medianOpenings" :key="i" class="form-row" style="align-items:flex-end">
      <label><span>开口名称</span><input v-model="o.label" style="width:100px" /></label>
      <label><span>开口桩号</span><input v-model="o.stakeText" placeholder="K121+200" style="width:110px" /></label>
      <button class="danger" @click="form.medianOpenings.splice(i, 1)">移除</button>
    </div>
    <p v-if="!form.medianOpenings.length" class="muted">未设置开口。开口用于导改期间车辆借道对向车道。</p>

    <div style="margin-top:12px">
      <button class="primary" @click="save">{{ form.id ? '保存修改' : '创建路段' }}</button>
      <button v-if="form.id || editing" style="margin-left:8px" @click="Object.assign(form, blank()); editing = false; formErr = ''">取消</button>
      <span v-if="formErr" style="color:#b91c1c;margin-left:12px">{{ formErr }}</span>
    </div>
  </div>

  <div class="panel" v-if="store.plans.length">
    <h2>各路段方案一览</h2>
    <table class="grid">
      <thead><tr><th>方案名称</th><th>所属路段</th><th>状态</th><th>实施版本</th><th>撤除日期</th></tr></thead>
      <tbody>
        <tr v-for="p in store.plans" :key="p.id">
          <td>{{ p.name }}</td>
          <td>{{ (store.sections.find(s => s.id === p.sectionId) || {}).name || '-' }}</td>
          <td><span class="badge" :class="STATUS[p.status]">{{ p.status }}</span></td>
          <td>{{ p.version || '-' }}</td>
          <td>{{ p.removeDate || '-' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
