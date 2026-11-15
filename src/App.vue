<template>
  <div class="app">
    <header class="topbar no-print">
      <h1>疼痛科脊柱介入穿刺路径三维规划与审签系统</h1>
      <nav>
        <button v-for="t in tabs" :key="t.key" class="tab" :class="{ on: store.view === t.key }" @click="go(t.key)">
          {{ t.label }}
          <span v-if="t.key === 'review' && pendingCount" class="badge">{{ pendingCount }}</span>
        </button>
      </nav>
      <div class="user-box">
        <select v-model="userName" class="input slim" title="切换身份">
          <option v-for="u in USERS" :key="u.name" :value="u.name">{{ u.name }} · {{ ROLES[u.role] }}</option>
        </select>
        <button class="btn slim ghost" @click="doExportAll">导出全部</button>
        <label class="btn slim ghost">
          导入<input type="file" accept=".json" hidden @change="doImport" />
        </label>
      </div>
    </header>

    <main :class="{ 'no-print': briefingId }">
      <CaseList
        v-if="store.view === 'cases'"
        @new-case="showForm = true"
        @open-planner="openPlanner"
        @open-review="openReview"
        @open-briefing="id => (briefingId = id)"
      />
      <div v-else-if="store.view === 'planner'">
        <button class="btn ghost back no-print" @click="store.view = 'cases'">← 返回病例列表</button>
        <PlannerView :case-id="store.activeCaseId" @back="store.view = 'cases'" />
      </div>
      <TemplatesView v-else-if="store.view === 'templates'" />
      <ReviewView v-else-if="store.view === 'review'" ref="reviewRef" />
      <StatsView v-else-if="store.view === 'stats'" />
    </main>

    <CaseForm v-if="showForm" @close="showForm = false" @created="openPlanner" />
    <BriefingSheet v-if="briefingId" :case-id="briefingId" @close="briefingId = ''" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { store, USERS, ROLES, exportData, importData, downloadJSON } from './store'
import CaseList from './components/CaseList.vue'
import CaseForm from './components/CaseForm.vue'
import PlannerView from './components/PlannerView.vue'
import TemplatesView from './components/TemplatesView.vue'
import ReviewView from './components/ReviewView.vue'
import StatsView from './components/StatsView.vue'
import BriefingSheet from './components/BriefingSheet.vue'

const showForm = ref(false)
const briefingId = ref('')
const reviewRef = ref(null)

const tabs = computed(() => [
  { key: 'cases', label: '病例列表' },
  { key: 'templates', label: '模板维护' },
  { key: 'review', label: '审签台' },
  { key: 'stats', label: '统计分析' },
])

const pendingCount = computed(() => store.cases.filter(c => c.status === 'pending').length)

const userName = computed({
  get: () => store.user.name,
  set: name => { store.user = USERS.find(u => u.name === name) || USERS[0] },
})

function go(view) { store.view = view }
function openPlanner(id) {
  store.activeCaseId = id
  store.view = 'planner'
}
function openReview(id) {
  store.view = 'review'
  // 等审签台挂载后直接进入该病例
  setTimeout(() => { if (reviewRef.value) reviewRef.value.activeId = id }, 0)
}
async function doExportAll() {
  const data = await exportData()
  downloadJSON(data, `疼痛科穿刺规划导出_${new Date().toISOString().slice(0, 10)}.json`)
}
async function doImport(e) {
  const file = e.target.files[0]
  e.target.value = ''
  if (!file) return
  try {
    const json = JSON.parse(await file.text())
    const n = await importData(json)
    alert(`导入完成: ${n} 个病例`)
  } catch (err) {
    alert('导入失败: ' + err.message)
  }
}
</script>
