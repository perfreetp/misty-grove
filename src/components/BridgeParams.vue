<template>
  <div class="bp">
    <h3>桥跨与标高</h3>
    <label>跨径布置(m，逗号分隔)
      <input v-model="spansText" :disabled="locked" placeholder="如 30,30,30">
    </label>
    <label>各墩位桥面标高(m，{{ spanCount + 1 }} 个)
      <input v-model="elevText" :disabled="locked" placeholder="如 7.6,8.6,8.4,9.0">
    </label>
    <div class="grid2">
      <label>桥面宽度(m)<input type="number" step="0.5" v-model.number="f.deckWidth" :disabled="locked"></label>
      <label>主梁高度(m)<input type="number" step="0.1" v-model.number="f.girderDepth" :disabled="locked"></label>
      <label>地面标高(m)<input type="number" step="0.1" v-model.number="f.groundElev" :disabled="locked"></label>
      <label>桥墩纵向宽(m)<input type="number" step="0.1" v-model.number="f.pierWidth" :disabled="locked"></label>
      <label>桥墩横向厚(m)<input type="number" step="0.1" v-model.number="f.pierDepth" :disabled="locked"></label>
      <label>桥台宽(m)<input type="number" step="0.1" v-model.number="f.abutmentWidth" :disabled="locked"></label>
    </div>
    <button class="btn primary" @click="apply" :disabled="locked">生成净空模型</button>
    <p v-if="err" class="err">{{ err }}</p>
    <p class="tip">净高 = 桥面标高 − 主梁高度 − 地面标高；低于 3m 的区段自动标红。</p>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch } from 'vue'
import { store, editable, toast } from '../store.js'

const locked = computed(() => !editable.value)
const f = reactive({ ...store.scheme.bridge })
const spansText = ref(store.scheme.bridge.spans.join(','))
const elevText = ref(store.scheme.bridge.elevations.join(','))
const err = ref('')
const spanCount = computed(() => spansText.value.split(',').filter(s => s.trim() !== '').length)

watch(() => store.scheme.bridge, (nb) => {
  Object.assign(f, nb)
  spansText.value = nb.spans.join(',')
  elevText.value = nb.elevations.join(',')
}, { deep: true })

function apply() {
  err.value = ''
  const spans = spansText.value.split(',').map(s => parseFloat(s.trim())).filter(v => !isNaN(v))
  const elevs = elevText.value.split(',').map(s => parseFloat(s.trim())).filter(v => !isNaN(v))
  if (!spans.length || spans.some(v => v <= 0)) { err.value = '跨径必须为正数'; return }
  if (elevs.length !== spans.length + 1) { err.value = `桥面标高需为 ${spans.length + 1} 个（每墩位一个）`; return }
  if (f.deckWidth <= 0 || f.girderDepth <= 0 || f.pierWidth <= 0 || f.pierDepth <= 0) { err.value = '尺寸参数必须为正数'; return }
  if (f.pierDepth >= f.deckWidth) { err.value = '桥墩横向厚度不能超过桥面宽度'; return }
  const minClear = Math.min(...elevs) - f.girderDepth - f.groundElev
  if (minClear <= 0) { err.value = '梁底低于地面，请检查标高'; return }
  store.scheme.bridge = { spans, elevations: elevs, deckWidth: f.deckWidth, girderDepth: f.girderDepth,
    groundElev: f.groundElev, pierWidth: f.pierWidth, pierDepth: f.pierDepth, abutmentWidth: f.abutmentWidth }
  toast('净空模型已更新' + (minClear < 3 ? '，存在净高不足 3m 的红色区段' : ''))
}
</script>

<style scoped>
.bp h3 { margin: 0 0 8px; font-size: 14px; }
label { display: block; font-size: 12px; color: #556; margin-bottom: 6px; }
input { width: 100%; box-sizing: border-box; padding: 4px 6px; border: 1px solid #c8cfd6; border-radius: 4px; font-size: 12px; margin-top: 2px; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 8px; }
.btn { width: 100%; padding: 6px; border: none; border-radius: 4px; cursor: pointer; font-size: 13px; }
.primary { background: #2f6fd0; color: #fff; }
.btn:disabled { opacity: .5; cursor: not-allowed; }
.err { color: #c02020; font-size: 12px; }
.tip { color: #889; font-size: 11px; }
</style>
