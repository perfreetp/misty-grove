<template>
  <div class="plan-wrap" @dragover.prevent @drop="onDrop">
    <div v-if="!editable" class="readonly-banner">
      {{ store.viewing != null ? `正在查看历史版本 V${ver.n}（只读）` : (ver.status === 'review' ? '联审中，平面只读' : ver.status === 'approved' ? '已批复，平面只读' : '当前角色不可编辑') }}
    </div>
    <svg ref="svgEl" :viewBox="`0 0 ${vbW} ${vbH}`" class="plan-svg"
         @pointermove="onMove" @pointerup="onUp" @pointerleave="onUp">
      <!-- 低净空红区 -->
      <g v-for="(z,i) in zones" :key="'z'+i">
        <rect :x="X(z.x0)" :y="Y(0)" :width="(z.x1-z.x0)*sc" :height="b.deckWidth*sc" fill="rgba(224,48,48,.25)"/>
        <text :x="X(z.x0)+4" :y="Y(0)+14" class="t-red">净高&lt;3m 禁摆</text>
      </g>
      <!-- 桥面轮廓 -->
      <rect :x="X(0)" :y="Y(0)" :width="L*sc" :height="b.deckWidth*sc"
            fill="#f4f6f8" stroke="#333" stroke-width="1.5"/>
      <!-- 消防通道 -->
      <g v-if="fl.y1-fl.y0>0.01">
        <rect :x="X(0)" :y="Y(fl.y0)" :width="L*sc" :height="(fl.y1-fl.y0)*sc"
              :fill="fl.ok ? 'rgba(47,191,95,.15)' : 'rgba(224,48,48,.18)'"/>
        <text :x="X(0)+6" :y="Y(fl.y0)+14" :class="fl.ok?'t-green':'t-red'">
          消防通道 净宽 {{ fl.width.toFixed(1) }}m{{ fl.ok ? '' : '（不足4m，禁止提交）' }}
        </text>
      </g>
      <!-- 桥墩 -->
      <g v-for="(p,i) in piers" :key="'p'+i">
        <rect :x="X(p.x0)" :y="Y(p.y0)" :width="(p.x1-p.x0)*sc" :height="(p.y1-p.y0)*sc"
              fill="#8a939c" stroke="#555"/>
        <text :x="X(p.cx)" :y="Y(b.deckWidth)+34" text-anchor="middle" class="t-dim">
          桥面{{ nodes[i].elev.toFixed(2) }} / 净空{{ clearance(nodes[i].x).toFixed(2) }}m
        </text>
      </g>
      <!-- 跨径标注 -->
      <text v-for="(s,i) in b.spans" :key="'s'+i"
            :x="X((nodes[i].x+nodes[i+1].x)/2)" :y="Y(0)-10" text-anchor="middle" class="t-dim">
        跨径 {{ s }}m
      </text>
      <text :x="14" :y="Y(b.deckWidth/2)" class="t-dim" :transform="`rotate(-90 14 ${Y(b.deckWidth/2)})`">
        桥宽 {{ b.deckWidth }}m
      </text>
      <!-- 构件 -->
      <g v-for="c in comps" :key="c.id"
         @pointerdown="onDown(c, $event)" @click.stop="select(c)"
         :style="{cursor: editable?'move':'default'}">
        <rect :x="X(c.x-c.len/2)" :y="Y(c.y-c.wid/2)" :width="c.len*sc" :height="c.wid*sc"
              :fill="fillOf(c)" :stroke="c.id===store.selectedId?'#ffb300':(invalidIds.has(c.id)?'#e03030':'#334')"
              :stroke-width="c.id===store.selectedId?3:1.2" rx="2"/>
        <text :x="X(c.x-c.len/2)+4" :y="Y(c.y-c.wid/2)+14" class="t-comp">{{ compName(c) }}</text>
        <text v-if="c.wid*sc>30" :x="X(c.x-c.len/2)+4" :y="Y(c.y-c.wid/2)+28" class="t-comp t-sub">
          {{ c.len.toFixed(1) }}×{{ c.wid.toFixed(1) }}m
        </text>
      </g>
      <!-- 拖拽中的幽灵 -->
      <rect v-if="ghost" :x="X(ghost.x-ghost.len/2)" :y="Y(ghost.y-ghost.wid/2)"
            :width="ghost.len*sc" :height="ghost.wid*sc"
            :fill="ghostOk ? 'rgba(47,191,95,.35)' : 'rgba(224,48,48,.4)'"
            :stroke="ghostOk ? '#2fbf5f' : '#e03030'" stroke-dasharray="5 3"/>
    </svg>
    <div class="plan-hint" v-if="editable">从左侧构件库拖入桥墩之间；构件自动避让桥墩，净高不足 3m 的红色区域不能摆放</div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { store, components, invalidIds, fireLaneState, editable, viewVersion, addComponent, toast } from '../store.js'
import { bridgeNodes, pierRects, lowZones, totalLength, clearanceAt } from '../bridge.js'
import { TYPES, makeComponent, autoAvoid, validate } from '../rules.js'

const b = computed(() => store.scheme.bridge)
const L = computed(() => totalLength(b.value))
const nodes = computed(() => bridgeNodes(b.value))
const piers = computed(() => pierRects(b.value))
const zones = computed(() => lowZones(b.value))
const comps = components
const fl = fireLaneState
const ver = viewVersion

const M = 70
const sc = computed(() => 1100 / (L.value + M * 1.2))
const vbW = computed(() => (L.value + M * 1.2) * sc.value)
const vbH = computed(() => (b.value.deckWidth + 1.6) * sc.value + 46)
const X = (x) => M * 0.6 * sc.value + x * sc.value
const Y = (y) => 30 + y * sc.value
const clearance = (x) => clearanceAt(b.value, x)

const svgEl = ref(null)
const ghost = ref(null)
const ghostOk = ref(true)
let drag = null // {comp, dx, dy, orig} 或 {type}

function toWorld(e) {
  const r = svgEl.value.getBoundingClientRect()
  const px = (e.clientX - r.left) / r.width * vbW.value
  const py = (e.clientY - r.top) / r.height * vbH.value
  return { x: (px - M * 0.6 * sc.value) / sc.value, y: (py - 30) / sc.value }
}

function compName(c) {
  const t = TYPES[c.type]
  return c.label || (t.name + (c.type === 'parking' ? `×${c.spots}` : ''))
}
function fillOf(c) {
  if (invalidIds.value.has(c.id)) return 'rgba(224,48,48,.55)'
  return TYPES[c.type].color + 'b8'
}
function select(c) { store.selectedId = c.id }

function onDown(c, e) {
  if (!editable.value) return
  e.preventDefault()
  const w = toWorld(e)
  drag = { comp: c, dx: w.x - c.x, dy: w.y - c.y, orig: { x: c.x, y: c.y } }
  store.selectedId = c.id
}

function onMove(e) {
  if (!drag) return
  const w = toWorld(e)
  const c = drag.comp
  c.x = w.x - drag.dx; c.y = w.y - drag.dy
  autoAvoid(b.value, c)
  ghost.value = null
  ghostOk.value = validate(b.value, comps.value, c, c.id).ok
  // 用幽灵提示合法性，构件本体跟随
  ghost.value = { x: c.x, y: c.y, len: c.len, wid: c.wid }
}

function onUp() {
  if (!drag) return
  const c = drag.comp
  const v = validate(b.value, comps.value, c, c.id)
  if (!v.ok) {
    c.x = drag.orig.x; c.y = drag.orig.y
    toast(v.reason + '，已还原')
  }
  ghost.value = null
  drag = null
}

function onDrop(e) {
  if (!editable.value) return
  const type = e.dataTransfer.getData('comp-type')
  if (!type || !TYPES[type]) return
  const w = toWorld(e)
  const c = makeComponent(type, w.x, w.y)
  autoAvoid(b.value, c)
  const v = validate(b.value, comps.value, c)
  if (!v.ok) { toast(v.reason); return }
  addComponent(c)
}
</script>

<style scoped>
.plan-wrap { position: relative; width: 100%; }
.plan-svg { width: 100%; display: block; background: #e8ebee; border-radius: 6px; touch-action: none; }
.readonly-banner { background: #fff4d6; color: #8a6d00; padding: 4px 10px; font-size: 12px; border-radius: 4px; margin-bottom: 6px; }
.t-dim { font-size: 12px; fill: #445; }
.t-red { font-size: 12px; fill: #c02020; font-weight: 600; }
.t-green { font-size: 12px; fill: #1c7a3d; font-weight: 600; }
.t-comp { font-size: 12px; fill: #fff; pointer-events: none; font-weight: 600; }
.t-sub { font-weight: 400; opacity: .9; }
.plan-hint { font-size: 12px; color: #667; margin-top: 6px; }
</style>
