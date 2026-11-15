<template>
  <div class="review">
    <aside class="panel list">
      <h3>待审核方案 ({{ pendingList.length }})</h3>
      <p v-if="!pendingList.length" class="muted">暂无待审核方案。</p>
      <div
        v-for="s in pendingList"
        :key="s.id"
        class="scheme-item"
        :class="{ active: current?.id === s.id }"
        @click="selectedId = s.id"
      >
        <div class="si-top">
          <b>{{ s.current.params.tunnelName }} · {{ s.current.params.portalName }}</b>
          <span class="badge pending">待审核</span>
        </div>
        <div class="muted si-sub">v{{ s.current.version }} · 返工 {{ s.reworkCount }} 次 · {{ s.current.submittedAt }}</div>
      </div>

      <h3 style="margin-top: 16px">已审核记录</h3>
      <div v-for="s in reviewedList" :key="'h' + s.id" class="scheme-item" @click="selectedId = s.id"
        :class="{ active: current?.id === s.id }">
        <div class="si-top">
          <b>{{ s.current.params.tunnelName }} · {{ s.current.params.portalName }}</b>
          <span class="badge" :class="s.status">{{ STATUS_NAMES[s.status] }}</span>
        </div>
      </div>
    </aside>

    <section v-if="current" class="panel detail">
      <div class="head">
        <h3>
          {{ current.current.params.tunnelName }} · {{ current.current.params.portalName }}
          <span class="muted">{{ current.current.params.stake }}</span>
        </h3>
        <span class="badge" :class="current.status">{{ STATUS_NAMES[current.status] }}</span>
      </div>

      <div class="meta muted">
        朝向 {{ current.current.params.orientation }}° · 纬度 {{ current.current.params.latitude }}° ·
        棚长 {{ current.current.params.canopyLength }}m · 格栅间距 {{ current.current.params.grilleSpacing }}m ·
        阈值 {{ current.current.params.thresholdPct }}% · 提交人 {{ current.current.submittedBy }}
      </div>

      <!-- 并排对比两版过渡曲线 -->
      <div class="compare" v-if="submittedVersion">
        <CurveChart
          :title="`本次提交 v${submittedVersion.version}(${submittedVersion.submittedAt})`"
          :series="seriesOf(submittedVersion, '#60a5fa')"
          :limit-points="limitOf(submittedVersion)"
          :markers="markersOf(submittedVersion)"
        />
        <CurveChart
          v-if="previousVersion"
          :title="`上一版 v${previousVersion.version}(${previousVersion.submittedAt})`"
          :series="seriesOf(previousVersion, '#a78bfa')"
          :limit-points="limitOf(previousVersion)"
          :markers="markersOf(previousVersion)"
        />
        <div v-else class="panel empty-compare muted">首次提交, 无历史版本可对比</div>
      </div>

      <!-- 参数差异 -->
      <div v-if="paramDiff.length" class="panel-inner">
        <h4>与上一版参数差异</h4>
        <table class="grid-table">
          <thead><tr><th>参数</th><th>上一版</th><th>本次</th></tr></thead>
          <tbody>
            <tr v-for="d in paramDiff" :key="d.key"><td>{{ d.label }}</td><td>{{ d.prev }}</td><td class="tag-red">{{ d.cur }}</td></tr>
          </tbody>
        </table>
      </div>

      <!-- 审核操作 -->
      <div v-if="current.status === 'pending'" class="review-actions">
        <template v-if="isReviewer">
          <button class="ok" @click="onApprove">✔ 审核通过(锁定方案)</button>
          <button class="danger" @click="showReturn = !showReturn">✘ 退回</button>
          <div v-if="showReturn" class="return-form">
            <label>退回原因<textarea v-model="returnReason" rows="2" placeholder="如: 洞门处照度超阈值, 明暗过渡不满足要求"></textarea></label>
            <label>需改参数<textarea v-model="returnParams" rows="2" placeholder="如: 减光棚长度加长至80m; 格栅间距加密至1.0m"></textarea></label>
            <button class="danger" :disabled="!returnReason.trim() || !returnParams.trim()" @click="onReturn">确认退回</button>
          </div>
        </template>
        <p v-else class="muted">当前角色为「{{ ROLE_NAMES[store.session.role] }}」, 仅审核人可执行通过/退回。</p>
      </div>

      <!-- 退回历史 -->
      <div v-if="current.returns.length" class="panel-inner">
        <h4>退回记录</h4>
        <div v-for="(rt, i) in current.returns" :key="i" class="return-item">
          <b>#{{ i + 1 }}</b> {{ rt.reason }};<b>需改:</b>{{ rt.paramsToFix }}
          <span class="muted">— {{ rt.reviewer }} {{ rt.time }}</span>
        </div>
      </div>

      <!-- 审计日志 -->
      <AuditLog :scheme="current" />
    </section>
    <section v-else class="panel muted">请选择左侧方案。</section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ROLE_NAMES, STATUS_NAMES } from '../types'
import type { Scheme, SchemeParams, SchemeVersion } from '../types'
import { approveScheme, returnScheme, store } from '../store/schemes'
import CurveChart, { type ChartMarker, type ChartSeries } from '../components/CurveChart.vue'
import AuditLog from '../components/AuditLog.vue'

const selectedId = ref('')
const showReturn = ref(false)
const returnReason = ref('')
const returnParams = ref('')

const pendingList = computed(() => store.schemes.filter((s) => s.status === 'pending'))
const reviewedList = computed(() => store.schemes.filter((s) => s.status !== 'pending' && s.history.length > 0))
const current = computed<Scheme | undefined>(() => store.schemes.find((s) => s.id === selectedId.value))
const isReviewer = computed(() => store.session.role === 'reviewer')

const submittedVersion = computed<SchemeVersion | null>(() => {
  const h = current.value?.history
  return h && h.length ? h[h.length - 1] : null
})
const previousVersion = computed<SchemeVersion | null>(() => {
  const h = current.value?.history
  return h && h.length > 1 ? h[h.length - 2] : null
})

function seriesOf(v: SchemeVersion, color: string): ChartSeries[] {
  return [{ name: `v${v.version} 棚下照度`, color, points: v.result?.points.map((q) => ({ x: q.x, y: q.illuminance })) ?? [] }]
}
function limitOf(v: SchemeVersion) {
  return v.result?.points.map((q) => ({ x: q.x, y: q.limit })) ?? null
}
function markersOf(v: SchemeVersion): ChartMarker[] | null {
  return (
    v.result?.points
      .filter((q) => q.exceeded || q.steep)
      .map((q) => ({ x: q.x, y: q.illuminance, offset: q.offset, kind: q.exceeded ? ('exceeded' as const) : ('steep' as const) })) ?? null
  )
}

const PARAM_LABELS: Record<string, string> = {
  tunnelName: '隧道名称', portalName: '洞口', stake: '桩号', orientation: '朝向(°)',
  latitude: '纬度(°)', canopyLength: '棚长(m)', grilleSpacing: '格栅间距(m)',
  grilleDepth: '格栅高度(m)', thresholdPct: '阈值(%)', simDate: '仿真日期', simTime: '仿真时刻'
}
const paramDiff = computed(() => {
  const a = previousVersion.value?.params
  const b = submittedVersion.value?.params
  if (!a || !b) return []
  return Object.keys(PARAM_LABELS)
    .filter((k) => String(a[k as keyof SchemeParams]) !== String(b[k as keyof SchemeParams]))
    .map((k) => ({
      key: k,
      label: PARAM_LABELS[k],
      prev: String(a[k as keyof SchemeParams]),
      cur: String(b[k as keyof SchemeParams])
    }))
})

function onApprove(): void {
  if (current.value) approveScheme(current.value)
}
function onReturn(): void {
  if (!current.value) return
  returnScheme(current.value, returnReason.value.trim(), returnParams.value.trim())
  showReturn.value = false
  returnReason.value = ''
  returnParams.value = ''
}
</script>

<style scoped>
.review { display: grid; grid-template-columns: 300px 1fr; gap: 14px; align-items: start; }
.scheme-item { padding: 8px; border-radius: 8px; cursor: pointer; border: 1px solid transparent; }
.scheme-item:hover { background: var(--panel-2); }
.scheme-item.active { border-color: var(--accent); background: var(--panel-2); }
.si-top { display: flex; justify-content: space-between; gap: 6px; align-items: center; }
.si-sub { font-size: 12px; margin-top: 2px; }
.head { display: flex; justify-content: space-between; align-items: center; }
.meta { font-size: 13px; margin-bottom: 10px; }
.compare { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.empty-compare { display: flex; align-items: center; justify-content: center; min-height: 180px; }
.panel-inner { background: var(--panel-2); border-radius: 8px; padding: 10px; margin-top: 12px; }
.panel-inner h4 { margin: 0 0 8px; font-size: 13px; }
.review-actions { margin-top: 14px; display: flex; flex-direction: column; gap: 10px; align-items: flex-start; }
.review-actions > button { margin-right: 8px; }
.return-form { display: flex; flex-direction: column; gap: 8px; width: 100%; max-width: 560px; background: var(--panel-2); padding: 10px; border-radius: 8px; }
.return-form label { display: flex; flex-direction: column; gap: 4px; }
.return-item { font-size: 13px; padding: 4px 0; border-bottom: 1px dashed var(--border); }
@media (max-width: 1200px) { .compare { grid-template-columns: 1fr; } }
</style>
