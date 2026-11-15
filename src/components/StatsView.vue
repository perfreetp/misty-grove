<template>
  <div class="panel">
    <div class="panel-head"><h2>统计分析(按疼痛节段)</h2></div>
    <table class="table">
      <thead>
        <tr>
          <th>节段</th><th>病例数</th><th>送审次数</th><th>通过数</th><th>退回次数</th>
          <th>一次通过率</th><th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in segStats" :key="row.segment">
          <td>{{ row.segment }}</td>
          <td>{{ row.total }}</td>
          <td>{{ row.submits }}</td>
          <td>{{ row.approved }}</td>
          <td>{{ row.rejects }}</td>
          <td>{{ row.total ? Math.round(row.rate * 100) + '%' : '-' }}</td>
          <td class="bar-cell">
            <div class="bar" v-if="row.total">
              <div class="bar-fill" :style="{ width: row.rate * 100 + '%' }"></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="panel-head" style="margin-top:26px"><h2>退回原因分布</h2></div>
    <div class="reason-list" v-if="reasonStats.length">
      <div v-for="r in reasonStats" :key="r.reason" class="reason-row">
        <span class="reason-label">{{ r.reason }}</span>
        <div class="bar reason-bar"><div class="bar-fill warn-fill" :style="{ width: (r.count / maxReason) * 100 + '%' }"></div></div>
        <b>{{ r.count }}</b>
      </div>
    </div>
    <p v-else class="empty">暂无退回记录</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { store, SEGMENTS, isFirstPass } from '../store'

const segStats = computed(() =>
  SEGMENTS.map(seg => {
    const cases = store.cases.filter(c => c.segment === seg)
    const submits = cases.reduce((n, c) => n + c.log.filter(l => l.action === '提交审签').length, 0)
    const rejects = cases.reduce((n, c) => n + c.log.filter(l => l.action === '退回').length, 0)
    const approvedCases = cases.filter(c => c.log.some(l => l.action === '审签通过'))
    const firstPass = approvedCases.filter(isFirstPass).length
    return {
      segment: seg,
      total: cases.length,
      submits,
      rejects,
      approved: approvedCases.length,
      rate: approvedCases.length ? firstPass / approvedCases.length : 0,
    }
  })
)

const reasonStats = computed(() => {
  const map = {}
  for (const c of store.cases) {
    for (const l of c.log) {
      if (l.action !== '退回') continue
      const reason = (l.detail || '其他').split(':')[0] || '其他'
      map[reason] = (map[reason] || 0) + 1
    }
  }
  return Object.entries(map).map(([reason, count]) => ({ reason, count })).sort((a, b) => b.count - a.count)
})
const maxReason = computed(() => Math.max(1, ...reasonStats.value.map(r => r.count)))
</script>

<style scoped>
.bar-cell { width: 30%; }
.bar { height: 12px; background: #223046; border-radius: 6px; overflow: hidden; }
.bar-fill { height: 100%; background: #3f9d6e; }
.warn-fill { background: #d08030; }
.reason-list { display: flex; flex-direction: column; gap: 8px; max-width: 640px; }
.reason-row { display: flex; align-items: center; gap: 12px; font-size: 13px; color: #c8d6e5; }
.reason-label { width: 130px; flex-shrink: 0; }
.reason-bar { flex: 1; }
.empty { color: #5f7185; }
</style>
