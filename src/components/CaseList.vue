<template>
  <div class="panel">
    <div class="panel-head">
      <h2>病例列表</h2>
      <div class="head-actions">
        <select v-model="filter" class="input slim">
          <option value="">全部状态</option>
          <option v-for="(label, k) in STATUS" :key="k" :value="k">{{ label }}</option>
        </select>
        <button v-if="isPhysician" class="btn primary" @click="$emit('new-case')">+ 新建病例</button>
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>病例号</th><th>患者</th><th>疼痛节段</th><th>责任神经根</th><th>状态</th>
          <th>创建人</th><th>更新时间</th><th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in filtered" :key="c.id">
          <td>{{ c.id }}</td>
          <td>{{ c.patientName }}({{ c.sex }}/{{ c.age }}岁)</td>
          <td>{{ c.segment }}</td>
          <td>{{ c.side }}{{ c.root }}</td>
          <td><span class="tag" :class="'st-' + c.status">{{ STATUS[c.status] }}</span></td>
          <td>{{ c.createdBy }}</td>
          <td>{{ fmtTime(c.updatedAt) }}</td>
          <td class="ops">
            <button v-if="canPlan(c)" class="btn slim" @click="$emit('open-planner', c.id)">规划</button>
            <button v-if="c.status === 'pending' && isChief" class="btn slim warn" @click="$emit('open-review', c.id)">审签</button>
            <button v-if="c.status === 'approved'" class="btn slim ok" @click="$emit('open-briefing', c.id)">交底单</button>
            <button class="btn slim ghost" @click="exportOne(c)">导出</button>
            <button v-if="isPhysician && c.status === 'planning'" class="btn slim danger" @click="remove(c)">删除</button>
          </td>
        </tr>
        <tr v-if="!filtered.length"><td colspan="8" class="empty">暂无病例</td></tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { store, STATUS, fmtTime, deleteCase, exportData, downloadJSON } from '../store'

const emit = defineEmits(['new-case', 'open-planner', 'open-review', 'open-briefing'])
const filter = ref('')

const isPhysician = computed(() => store.user.role === 'physician')
const isChief = computed(() => store.user.role === 'chief')

const filtered = computed(() =>
  store.cases.filter(c => !filter.value || c.status === filter.value)
)

function canPlan(c) {
  return isPhysician.value && (c.status === 'planning' || c.status === 'rejected')
}
async function exportOne(c) {
  const data = await exportData([c.id])
  downloadJSON(data, `病例_${c.id}_${c.patientName}.json`)
}
function remove(c) {
  if (confirm(`确认删除病例 ${c.id}(${c.patientName})?`)) deleteCase(c.id)
}
</script>
