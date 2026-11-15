<template>
  <div class="stats">
    <h3>指标统计</h3>
    <table>
      <tr><td>桥下总面积</td><td>{{ s.totalArea.toFixed(1) }} ㎡</td></tr>
      <tr><td>桥墩/桥台占用</td><td>{{ s.pierArea.toFixed(1) }} ㎡</td></tr>
      <tr><td>低净空不可用</td><td>{{ s.lowArea.toFixed(1) }} ㎡</td></tr>
      <tr><td>可利用面积</td><td>{{ s.usable.toFixed(1) }} ㎡</td></tr>
      <tr><td>已布置面积</td><td>{{ s.placed.toFixed(1) }} ㎡</td></tr>
      <tr class="hl"><td>面积利用率</td><td>{{ (s.utilization * 100).toFixed(1) }}%</td></tr>
      <tr class="hl"><td>停车位数量</td><td>{{ s.spots }} 个</td></tr>
      <tr class="hl"><td>投资估算</td><td>{{ (s.cost / 10000).toFixed(2) }} 万元</td></tr>
      <tr :class="{badrow: !fl.ok}"><td>消防通道净宽</td><td>{{ fl.width.toFixed(1) }} m（≥4m）</td></tr>
    </table>
    <h3 v-if="s.breakdown.length">投资明细</h3>
    <table v-if="s.breakdown.length">
      <tr v-for="it in s.breakdown" :key="it.id">
        <td>{{ it.label || it.name }}</td><td>{{ (it.amount / 10000).toFixed(2) }} 万元</td>
      </tr>
    </table>
    <p class="tip">单价：停车位 800 元/个，篮球场 320 元/㎡，绿化带 160 元/㎡，配电箱 2.8 万元/台</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { store, components, fireLaneState } from '../store.js'
import { stats } from '../rules.js'

const s = computed(() => stats(store.scheme.bridge, components.value))
const fl = fireLaneState
</script>

<style scoped>
.stats h3 { margin: 8px 0 6px; font-size: 14px; }
table { width: 100%; border-collapse: collapse; font-size: 12px; }
td { border: 1px solid #dde2e8; padding: 4px 8px; }
td:last-child { text-align: right; font-weight: 600; }
.hl td { background: #eef5ff; }
.badrow td { background: #fde8e8; color: #c02020; }
.tip { font-size: 11px; color: #889; }
</style>
