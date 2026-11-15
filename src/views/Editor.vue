<script setup>
import { computed, ref, watch, watchEffect, onMounted, onUnmounted } from 'vue'
import { store, uid, now, pushHistory, STATUS } from '../store'
import { analyze, taperRequired, fmtStake } from '../rules'
import { layout, drawPlan } from '../render'

const cv = ref(null)
const scrollEl = ref(null)
const scale = ref(0.5)
const tool = ref('select')
const selId = ref(null)
const ghost = ref(null)
let dragging = null

const tools = [
  { key: 'select', label: '选择/移动' },
  { key: 'cone', label: '锥桶' },
  { key: 'barrier', label: '水马' },
  { key: 'fence', label: '施工围挡' },
  { key: 'sign120', label: '限速120' },
  { key: 'sign100', label: '限速100' },
  { key: 'sign80', label: '限速80' },
  { key: 'erase', label: '删除设施' }
]

const isEditor = computed(() => store.role === '编制人')
const section = computed(() => store.sections.find(s => s.id === store.ui.sectionId) || store.sections[0])
const plansOfSection = computed(() => store.plans.filter(p => p.sectionId === section.value?.id))
const plan = computed(() =>
  store.plans.find(p => p.id === store.ui.planId && p.sectionId === section.value?.id)
  || plansOfSection.value[0])
const editable = computed(() =>
  isEditor.value && plan.value && (plan.value.status === '草稿' || plan.value.status === '退回'))

const derived = computed(() => (section.value && plan.value) ? analyze(section.value, plan.value) : null)
const issues = computed(() => derived.value?.issues || [])
const stats = computed(() => derived.value?.stats || {})
const L = computed(() => section.value ? layout(section.value, scale.value) : null)
const taper1 = computed(() => section.value ? taperRequired(section.value.designSpeed, 1) : 0)
const canSubmit = computed(() => editable.value && plan.value.items.length > 0 && issues.value.length === 0)

const hint = computed(() => {
  if (!editable.value) return isEditor.value ? '当前方案已在联审/已通过，图面只读' : '当前角色仅可查看'
  switch (tool.value) {
    case 'select': return '点击设施选中，按住拖动(自动吸附车道线)，Delete 键删除'
    case 'erase': return '点击要删除的设施'
    case 'cone': return '在车道线上点击放置锥桶(自动吸附)'
    case 'barrier': return '在车道线上点击放置水马(自动吸附)'
    case 'fence': return '在车道线上点击放置施工围挡(自动吸附)'
    default: return '点击放置限速标志(自动落于右侧路肩外)'
  }
})

watch(() => store.ui.sectionId, () => {
  store.ui.planId = plansOfSection.value[0]?.id || null
})

watchEffect(() => {
  const c = cv.value
  if (!c || !section.value || !plan.value) return
  drawPlan(c.getContext('2d'), section.value, plan.value, {
    scale: scale.value,
    derived: derived.value,
    issues: issues.value,
    selectedId: selId.value,
    ghost: ghost.value
  })
}, { flush: 'post' })

function pos(e) {
  const r = cv.value.getBoundingClientRect()
  return { x: e.clientX - r.left, y: e.clientY - r.top }
}

function snap(p) {
  const lay = L.value
  const N = section.value.lanes
  let stake = Math.round(lay.s0 + (p.x - lay.left) / scale.value)
  stake = Math.max(section.value.kStart, Math.min(section.value.kEnd, stake))
  let best = 0, bd = Infinity
  for (let k = 0; k <= N + 1; k++) {
    const d = Math.abs(p.y - lay.yOf(k))
    if (d < bd) { bd = d; best = k }
  }
  return { stake, line: best }
}

function hit(p) {
  const lay = L.value
  let best = null, bd = 14
  for (const it of plan.value.items) {
    const dx = p.x - lay.xOf(it.stake)
    const dy = p.y - lay.yOf(it.line)
    const d = Math.hypot(dx, dy)
    if (d < bd) { bd = d; best = it }
  }
  return best
}

function onDown(e) {
  if (!editable.value || !plan.value) return
  const p = pos(e)
  if (tool.value === 'select') {
    const it = hit(p)
    selId.value = it ? it.id : null
    if (it) dragging = it
  } else if (tool.value === 'erase') {
    const it = hit(p)
    if (it) {
      plan.value.items.splice(plan.value.items.indexOf(it), 1)
      if (selId.value === it.id) selId.value = null
    }
  } else {
    const s = snap(p)
    const isSign = tool.value.startsWith('sign')
    const item = {
      id: uid(),
      type: isSign ? 'sign' : tool.value,
      stake: s.stake,
      line: isSign ? section.value.lanes + 1 : s.line
    }
    if (isSign) item.limit = Number(tool.value.slice(4))
    plan.value.items.push(item)
    selId.value = item.id
  }
}

function onMove(e) {
  if (!plan.value || !section.value) return
  const p = pos(e)
  const s = snap(p)
  if (dragging) {
    dragging.stake = s.stake
    if (dragging.type !== 'sign') dragging.line = s.line
    return
  }
  if (editable.value && tool.value !== 'select' && tool.value !== 'erase') {
    const isSign = tool.value.startsWith('sign')
    ghost.value = {
      type: isSign ? 'sign' : tool.value,
      stake: s.stake,
      line: isSign ? section.value.lanes + 1 : s.line,
      ...(isSign ? { limit: Number(tool.value.slice(4)) } : {})
    }
  } else {
    ghost.value = null
  }
}

function onUp() { dragging = null }
function onLeave() { ghost.value = null; dragging = null }

function onKey(e) {
  if ((e.key === 'Delete' || e.key === 'Backspace') && selId.value && editable.value) {
    const i = plan.value.items.findIndex(x => x.id === selId.value)
    if (i >= 0) plan.value.items.splice(i, 1)
    selId.value = null
  }
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))

function scrollToIssue(is) {
  if (!is.stakes.length || !scrollEl.value) return
  scrollEl.value.scrollLeft = Math.max(0, L.value.xOf(is.stakes[0]) - 120)
}

function newPlan() {
  const p = {
    id: uid(), sectionId: section.value.id,
    name: `${section.value.name} 渠化方案`,
    status: '草稿', items: [], reviews: {}, history: [],
    version: null, removeDate: null, removed: false, createdAt: now()
  }
  store.plans.push(p)
  store.ui.planId = p.id
}

function delPlan() {
  if (confirm(`确定删除方案「${plan.value.name}」?`)) {
    store.plans.splice(store.plans.indexOf(plan.value), 1)
    store.ui.planId = plansOfSection.value[0]?.id || null
  }
}

function submit() {
  if (!canSubmit.value) return
  plan.value.status = '联审中'
  plan.value.reviews = {}
  pushHistory(plan.value, '编制人', plan.value.history.some(h => h.action.includes('提交')) ? '重新提交联审' : '提交联审')
  store.ui.tab = 'review'
}
</script>

<template>
  <div v-if="!section" class="empty">请先在「路段档案」中建立路段</div>
  <template v-else>
    <div class="panel">
      <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center">
        <label>路段
          <select v-model="store.ui.sectionId" style="margin-left:6px">
            <option v-for="s in store.sections" :key="s.id" :value="s.id">{{ s.name }}</option>
          </select>
        </label>
        <label>方案
          <select v-model="store.ui.planId" style="margin-left:6px;max-width:320px">
            <option v-for="p in plansOfSection" :key="p.id" :value="p.id">{{ p.name }}</option>
          </select>
        </label>
        <template v-if="plan">
          <span class="badge" :class="STATUS[plan.status]">{{ plan.status }}</span>
          <span v-if="plan.version" class="badge badge-approved">{{ plan.version }}</span>
        </template>
        <button v-if="isEditor" @click="newPlan">新建方案</button>
        <button v-if="isEditor && plan && plan.status === '草稿'" class="danger" @click="delPlan">删除方案</button>
        <span style="flex:1"></span>
        <label>缩放
          <select v-model.number="scale" style="margin-left:6px">
            <option :value="0.2">远</option><option :value="0.5">中</option>
            <option :value="1">近</option><option :value="2">特写</option>
          </select>
        </label>
      </div>
      <div v-if="plan" style="margin-top:8px;display:flex;gap:10px;align-items:center">
        <input v-model="plan.name" :disabled="!editable" style="flex:1;max-width:480px" placeholder="方案名称" />
        <span class="muted">
          {{ fmtStake(section.kStart) }}~{{ fmtStake(section.kEnd) }} ·
          {{ section.lanes }}车道 · 设计速度{{ section.designSpeed }}km/h ·
          工期 {{ section.period.start }}~{{ section.period.end }}
        </span>
      </div>
    </div>

    <div class="panel" v-if="plan">
      <div v-if="editable" style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin-bottom:10px">
        <button v-for="t in tools" :key="t.key" :class="{ on: tool === t.key }" @click="tool = t.key">{{ t.label }}</button>
        <span class="muted" style="margin-left:10px">{{ hint }}</span>
      </div>
      <div v-else class="muted" style="margin-bottom:10px">{{ hint }}</div>

      <div style="display:flex;gap:14px;align-items:flex-start">
        <div ref="scrollEl" style="flex:1;min-width:0;overflow-x:auto;border:1px solid #d5dbe3;border-radius:6px">
          <canvas ref="cv" :width="L.width" :height="L.height"
            :style="{ cursor: editable && tool !== 'select' ? 'crosshair' : 'default' }"
            @mousedown="onDown" @mousemove="onMove" @mouseup="onUp" @mouseleave="onLeave"></canvas>
        </div>

        <aside style="width:320px;flex:none">
          <h3 style="margin-top:0">合规检查
            <span v-if="issues.length" class="badge badge-returned">{{ issues.length }} 项不合规</span>
            <span v-else class="badge badge-approved">✔ 全部合规</span>
          </h3>
          <div style="max-height:220px;overflow-y:auto">
            <div v-for="is in issues" :key="is.id" @click="scrollToIssue(is)"
              style="border:1px solid #f3c2c2;background:#fdf3f3;border-radius:6px;padding:8px;margin-bottom:6px;cursor:pointer">
              <div style="color:#b91c1c;font-size:13px">⚠ {{ is.message }}</div>
              <div style="color:#7c2d12;font-size:12px;margin-top:3px">建议:{{ is.suggestion }}</div>
            </div>
            <p v-if="!issues.length" class="muted">锥桶间距、封闭车道数、渐变段长度、限速衔接均满足规范要求。</p>
          </div>

          <h3>规范控制值</h3>
          <ul class="muted" style="padding-left:18px;margin:0;font-size:12px;line-height:1.9">
            <li>渐变段长度(封1车道):≥{{ taper1 }}m</li>
            <li>锥桶间距:渐变段≤4m,其余≤10m</li>
            <li>水马≤2m,施工围挡≤3m</li>
            <li>限速落差≤20km/h(120→100→80)</li>
            <li>预告距离:120→300m,100→200m,80→100m</li>
          </ul>

          <h3>设施数量</h3>
          <table class="grid">
            <tbody>
              <tr><th>锥桶</th><td>{{ stats.cone || 0 }} 个</td><th>水马</th><td>{{ stats.barrier || 0 }} 个</td></tr>
              <tr><th>施工围挡</th><td>{{ stats.fence || 0 }} 块</td><th>限速标志</th><td>{{ (stats.sign120 || 0) + (stats.sign100 || 0) + (stats.sign80 || 0) }} 块</td></tr>
            </tbody>
          </table>

          <div v-if="isEditor && (plan.status === '草稿' || plan.status === '退回')" style="margin-top:14px">
            <button class="primary" style="width:100%" :disabled="!canSubmit" @click="submit">提交交警/路政联审</button>
            <p v-if="issues.length" class="muted" style="color:#b91c1c;margin:6px 0 0">存在不合规项,整改后方可提交</p>
            <p v-else-if="!plan.items.length" class="muted" style="margin:6px 0 0">请先在画布上布设设施</p>
          </div>
          <div v-if="plan.status === '退回' && plan.history.length" style="margin-top:10px;border:1px solid #f3c2c2;border-radius:6px;padding:8px;background:#fdf3f3">
            <b style="color:#b91c1c;font-size:13px">最近退回意见</b>
            <div style="font-size:12px;margin-top:4px">
              {{ [...plan.history].reverse().find(h => h.action === '退回')?.comment || '' }}
            </div>
          </div>
        </aside>
      </div>
    </div>
    <div v-else class="panel empty">该路段暂无方案,点击「新建方案」开始编排</div>
  </template>
</template>
