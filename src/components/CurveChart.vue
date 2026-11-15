<template>
  <div class="chart-wrap">
    <div class="chart-title">{{ title }}</div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="chart">
      <!-- 网格 -->
      <line v-for="t in yTicks" :key="'y' + t" :x1="padL" :x2="W - padR" :y1="y(t)" :y2="y(t)" class="grid" />
      <line v-for="t in xTicks" :key="'x' + t" :x1="x(t)" :x2="x(t)" :y1="padT" :y2="H - padB" class="grid" />
      <!-- 轴 -->
      <line :x1="padL" :x2="W - padR" :y1="H - padB" :y2="H - padB" class="axis" />
      <line :x1="padL" :x2="padL" :y1="padT" :y2="H - padB" class="axis" />
      <text v-for="t in yTicks" :key="'yl' + t" :x="padL - 6" :y="y(t) + 4" class="tick" text-anchor="end">{{ fmtTick(t) }}</text>
      <text v-for="t in xTicks" :key="'xl' + t" :x="x(t)" :y="H - padB + 16" class="tick" text-anchor="middle">{{ t }}m</text>
      <text :x="padL - 34" :y="padT - 6" class="tick">lux</text>
      <!-- 限值曲线 -->
      <polyline v-if="limitPoints" :points="toPoly(limitPoints)" fill="none" class="limit-line" />
      <!-- 数据曲线 -->
      <polyline v-for="(s, i) in series" :key="i" :points="toPoly(s.points)" fill="none" :stroke="s.color" stroke-width="2" />
      <!-- 红色超标点 -->
      <g v-if="markers">
        <circle v-for="(m, i) in markers" :key="'m' + i" :cx="x(m.x)" :cy="y(m.y)" r="4"
          :fill="m.kind === 'exceeded' ? '#e02424' : '#f59e0b'" stroke="#fff" stroke-width="1">
          <title>{{ m.kind === 'exceeded' ? '超阈值' : '陡跳' }} x={{ m.x }}m 偏移 {{ m.offset }} lux</title>
        </circle>
      </g>
    </svg>
    <div class="legend">
      <span v-for="(s, i) in series" :key="'lg' + i" class="lg-item">
        <i :style="{ background: s.color }"></i>{{ s.name }}
      </span>
      <span v-if="limitPoints" class="lg-item"><i class="lg-limit"></i>限值曲线</span>
      <span v-if="markers?.length" class="lg-item"><i style="background:#e02424;border-radius:50%"></i>超阈值</span>
      <span v-if="markers?.length" class="lg-item"><i style="background:#f59e0b;border-radius:50%"></i>陡跳</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface ChartSeries { name: string; color: string; points: { x: number; y: number }[] }
export interface ChartMarker { x: number; y: number; offset: number; kind: 'exceeded' | 'steep' }

const props = defineProps<{
  title: string
  series: ChartSeries[]
  limitPoints?: { x: number; y: number }[] | null
  markers?: ChartMarker[] | null
}>()

const W = 560
const H = 260
const padL = 56
const padR = 12
const padT = 22
const padB = 30

const allPts = computed(() => {
  const pts = props.series.flatMap((s) => s.points)
  if (props.limitPoints) pts.push(...props.limitPoints)
  return pts
})
const xMax = computed(() => Math.max(1, ...allPts.value.map((p) => p.x)))
const yMax = computed(() => Math.max(100, ...allPts.value.map((p) => p.y)) * 1.08)

function x(v: number): number {
  return padL + (v / xMax.value) * (W - padL - padR)
}
function y(v: number): number {
  return H - padB - (v / yMax.value) * (H - padT - padB)
}
function toPoly(pts: { x: number; y: number }[]): string {
  return pts.map((p) => `${x(p.x).toFixed(1)},${y(p.y).toFixed(1)}`).join(' ')
}
const xTicks = computed(() => {
  const n = 6
  return Array.from({ length: n + 1 }, (_, i) => Math.round((xMax.value / n) * i))
})
const yTicks = computed(() => {
  const n = 4
  return Array.from({ length: n + 1 }, (_, i) => (yMax.value / n) * i)
})
function fmtTick(v: number): string {
  return v >= 10000 ? (v / 1000).toFixed(0) + 'k' : String(Math.round(v))
}
</script>

<style scoped>
.chart-wrap { background: var(--panel); border: 1px solid var(--border); border-radius: 8px; padding: 8px; }
.chart-title { font-size: 13px; font-weight: 600; margin-bottom: 4px; color: var(--text); }
.chart { width: 100%; height: auto; display: block; }
.grid { stroke: var(--border); stroke-width: 0.6; }
.axis { stroke: var(--text-dim); stroke-width: 1; }
.tick { font-size: 10px; fill: var(--text-dim); }
.limit-line { stroke: #dc2626; stroke-width: 1.4; stroke-dasharray: 6 4; }
.legend { display: flex; flex-wrap: wrap; gap: 12px; font-size: 12px; color: var(--text-dim); margin-top: 4px; }
.lg-item { display: inline-flex; align-items: center; gap: 4px; }
.lg-item i { width: 14px; height: 3px; display: inline-block; }
.lg-limit { background: repeating-linear-gradient(90deg, #dc2626 0 4px, transparent 4px 7px); }
</style>
