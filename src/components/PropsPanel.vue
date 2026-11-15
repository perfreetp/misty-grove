<template>
  <div v-if="c" class="props">
    <h3>构件属性</h3>
    <div class="row"><span>类型</span><b>{{ TYPES[c.type].name }}</b></div>
    <label>名称标注<input v-model="c.label" :disabled="ro" :placeholder="TYPES[c.type].name"></label>
    <div class="grid2">
      <label>纵向长(m)<input type="number" step="0.1" v-model.number="len" :disabled="ro || c.type==='basketball' || c.type==='powerbox'"></label>
      <label>横向宽(m)<input type="number" step="0.1" v-model.number="wid" :disabled="ro || c.type==='basketball' || c.type==='powerbox'"></label>
    </div>
    <label v-if="c.type==='parking'">车位数量
      <input type="number" min="1" step="1" v-model.number="spots" :disabled="ro">
    </label>
    <div class="row" v-if="posInfo"><span>位置</span><b>{{ posInfo }}</b></div>
    <div class="row"><span>所在处净空</span><b :class="{bad: clearMin < 3}">{{ clearMin.toFixed(2) }}m</b></div>
    <div v-if="errNow" class="err">{{ errNow }}</div>
    <div class="btns" v-if="!ro">
      <button class="btn" @click="rotate">旋转90°</button>
      <button class="btn danger" @click="del">删除</button>
    </div>
  </div>
  <div v-else class="props empty">在平面图中点击构件查看属性</div>
</template>

<script setup>
import { computed } from 'vue'
import { store, components, editable, removeComponent, toast } from '../store.js'
import { TYPES, minClearance, validate, autoAvoid } from '../rules.js'

const ro = computed(() => !editable.value)
const c = computed(() => components.value.find(x => x.id === store.selectedId))

const clearMin = computed(() => c.value ? minClearance(store.scheme.bridge, c.value) : 0)
const posInfo = computed(() => c.value ? `纵向 ${c.value.x.toFixed(1)}m / 横向 ${c.value.y.toFixed(1)}m` : '')
const errNow = computed(() => {
  if (!c.value) return ''
  const v = validate(store.scheme.bridge, components.value, c.value, c.value.id)
  return v.ok ? '' : v.reason
})

function clampRevalidate() {
  if (!c.value) return
  autoAvoid(store.scheme.bridge, c.value)
  const v = validate(store.scheme.bridge, components.value, c.value, c.value.id)
  if (!v.ok) toast(v.reason)
}

const len = computed({
  get: () => c.value?.len,
  set: (v) => { if (c.value && v > 0) { c.value.len = v; clampRevalidate() } }
})
const wid = computed({
  get: () => c.value?.wid,
  set: (v) => { if (c.value && v > 0) { c.value.wid = v; clampRevalidate() } }
})
const spots = computed({
  get: () => c.value?.spots,
  set: (v) => {
    if (!c.value || v < 1) return
    c.value.spots = Math.round(v)
    c.value.wid = +(2.5 * c.value.spots).toFixed(2) // 车位沿横向排开
    clampRevalidate()
  }
})

function rotate() {
  if (!c.value) return
  const t = c.value.len; c.value.len = c.value.wid; c.value.wid = t
  clampRevalidate()
}
function del() { if (c.value) { removeComponent(c.value.id); toast('构件已删除') } }
</script>

<style scoped>
.props h3 { margin: 0 0 8px; font-size: 14px; }
.props.empty { color: #889; font-size: 12px; }
.row { display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 6px; }
label { display: block; font-size: 12px; color: #556; margin-bottom: 6px; }
input { width: 100%; box-sizing: border-box; padding: 4px 6px; border: 1px solid #c8cfd6; border-radius: 4px; font-size: 12px; margin-top: 2px; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 8px; }
.bad { color: #c02020; }
.err { color: #c02020; font-size: 12px; margin: 4px 0; }
.btns { display: flex; gap: 8px; margin-top: 8px; }
.btn { flex: 1; padding: 5px; border: 1px solid #c8cfd6; background: #fff; border-radius: 4px; cursor: pointer; font-size: 12px; }
.danger { color: #c02020; border-color: #e0a0a0; }
</style>
