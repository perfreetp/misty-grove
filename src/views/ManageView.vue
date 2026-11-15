<template>
  <div class="manage">
    <aside class="panel list">
      <h3>全部方案(只读)</h3>
      <div
        v-for="s in store.schemes"
        :key="s.id"
        class="scheme-item"
        :class="{ active: current?.id === s.id }"
        @click="selectedId = s.id"
      >
        <div class="si-top">
          <b>{{ s.current.params.tunnelName || '(未命名)' }} · {{ s.current.params.portalName }}</b>
          <span class="badge" :class="s.status">{{ STATUS_NAMES[s.status] }}</span>
        </div>
        <div class="muted si-sub">{{ s.current.params.stake }} · v{{ s.current.version }}</div>
      </div>
    </aside>

    <section v-if="current" class="panel detail">
      <div class="head">
        <h3>{{ current.current.params.tunnelName }} · {{ current.current.params.portalName }}
          <span class="muted">{{ current.current.params.stake }}</span>
        </h3>
        <span class="badge" :class="current.status">{{ STATUS_NAMES[current.status] }}</span>
      </div>

      <div class="meta muted">
        朝向 {{ current.current.params.orientation }}° · 纬度 {{ current.current.params.latitude }}° ·
        棚长 {{ current.current.params.canopyLength }}m · 格栅间距 {{ current.current.params.grilleSpacing }}m ·
        阈值 {{ current.current.params.thresholdPct }}% · 返工 {{ current.reworkCount }} 次
      </div>

      <CurveChart
        v-if="current.current.result"
        title="棚下照度明暗过渡曲线"
        :series="[{ name: '棚下照度', color: '#60a5fa', points: curvePoints }]"
        :limit-points="limitPoints"
        :markers="markers"
      />
      <p v-else class="muted">该方案尚未运行仿真。</p>

      <!-- 批注(仅管理处角色可写) -->
      <div class="panel-inner">
        <h4>管理处批注</h4>
        <div v-if="!current.annotations.length" class="muted">暂无批注。</div>
        <div v-for="a in current.annotations" :key="a.id" class="anno">
          <span class="anno-text">{{ a.text }}</span>
          <span class="muted">— {{ a.author }} · {{ a.time }}</span>
        </div>
        <div v-if="isManager" class="anno-form">
          <textarea v-model="annoText" rows="2" placeholder="填写运管批注意见, 如: 冬季傍晚西口眩光明显, 建议加密格栅"></textarea>
          <button :disabled="!annoText.trim()" @click="onAnnotate">提交批注</button>
        </div>
        <p v-else class="muted">当前角色为「{{ ROLE_NAMES[store.session.role] }}」, 仅路段管理处可添加批注。</p>
      </div>

      <AuditLog :scheme="current" />
    </section>
    <section v-else class="panel muted">请选择左侧方案查看。</section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ROLE_NAMES, STATUS_NAMES } from '../types'
import type { Scheme } from '../types'
import { addAnnotation, store } from '../store/schemes'
import CurveChart, { type ChartMarker } from '../components/CurveChart.vue'
import AuditLog from '../components/AuditLog.vue'

const selectedId = ref<string>(store.schemes[0]?.id ?? '')
const annoText = ref('')

const current = computed<Scheme | undefined>(() => store.schemes.find((s) => s.id === selectedId.value))
const isManager = computed(() => store.session.role === 'manager')

const curvePoints = computed(() => current.value?.current.result?.points.map((q) => ({ x: q.x, y: q.illuminance })) ?? [])
const limitPoints = computed(() => current.value?.current.result?.points.map((q) => ({ x: q.x, y: q.limit })) ?? null)
const markers = computed<ChartMarker[] | null>(() => {
  const r = current.value?.current.result
  if (!r) return null
  return r.points
    .filter((q) => q.exceeded || q.steep)
    .map((q) => ({ x: q.x, y: q.illuminance, offset: q.offset, kind: q.exceeded ? ('exceeded' as const) : ('steep' as const) }))
})

function onAnnotate(): void {
  if (!current.value || !annoText.value.trim()) return
  addAnnotation(current.value, annoText.value.trim())
  annoText.value = ''
}
</script>

<style scoped>
.manage { display: grid; grid-template-columns: 300px 1fr; gap: 14px; align-items: start; }
.scheme-item { padding: 8px; border-radius: 8px; cursor: pointer; border: 1px solid transparent; }
.scheme-item:hover { background: var(--panel-2); }
.scheme-item.active { border-color: var(--accent); background: var(--panel-2); }
.si-top { display: flex; justify-content: space-between; gap: 6px; align-items: center; }
.si-sub { font-size: 12px; margin-top: 2px; }
.head { display: flex; justify-content: space-between; align-items: center; }
.meta { font-size: 13px; margin-bottom: 10px; }
.panel-inner { background: var(--panel-2); border-radius: 8px; padding: 10px; margin-top: 12px; }
.panel-inner h4 { margin: 0 0 8px; font-size: 13px; }
.anno { display: flex; justify-content: space-between; gap: 10px; padding: 6px 0; border-bottom: 1px dashed var(--border); font-size: 13px; flex-wrap: wrap; }
.anno-text { flex: 1; min-width: 200px; }
.anno-form { display: flex; gap: 8px; margin-top: 10px; align-items: flex-end; }
.anno-form textarea { flex: 1; }
</style>
