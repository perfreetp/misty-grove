<template>
  <div class="design">
    <!-- 左: 方案列表 -->
    <aside class="panel list">
      <div class="list-head">
        <h3>洞门方案单</h3>
        <button v-if="isDesigner" @click="onCreate">+ 新建</button>
      </div>
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
        <div class="si-sub muted">
          {{ s.current.params.stake }} · v{{ s.current.version }} · 返工 {{ s.reworkCount }} 次
          <span v-if="s.locked">· 🔒已锁定</span>
        </div>
      </div>
    </aside>

    <!-- 中: 参数表单 + 结果 -->
    <section v-if="current" class="panel form-panel">
      <div class="form-head">
        <h3>方案参数 <span class="muted">v{{ current.current.version }}</span></h3>
        <span class="badge" :class="current.status">{{ STATUS_NAMES[current.status] }}</span>
      </div>

      <div v-if="current.status === 'returned' && lastReturn" class="return-box">
        <b>审核退回:</b> {{ lastReturn.reason }}<br />
        <b>需改参数:</b> {{ lastReturn.paramsToFix }}
        <span class="muted">({{ lastReturn.reviewer }} · {{ lastReturn.time }})</span>
      </div>

      <div class="grid2">
        <label>隧道名称
          <input v-model="p.tunnelName" :disabled="!editable" placeholder="如: 青云山隧道" />
        </label>
        <label>洞口名称
          <select v-model="p.portalName" :disabled="!editable">
            <option>进口</option><option>出口</option>
          </select>
        </label>
        <label>桩号
          <input v-model="p.stake" :disabled="!editable" placeholder="K12+380" />
        </label>
        <label>洞口朝向(方位角°) {{ orientationName(p.orientation) }}
          <input type="number" v-model.number="p.orientation" min="0" max="359" :disabled="!editable" />
        </label>
        <label>所在纬度(°)
          <input type="number" v-model.number="p.latitude" step="0.1" min="0" max="55" :disabled="!editable" />
        </label>
        <label>减光棚长度(m)
          <input type="number" v-model.number="p.canopyLength" min="10" max="200" :disabled="!editable" />
        </label>
        <label>格栅间距(m)
          <input type="number" v-model.number="p.grilleSpacing" step="0.1" min="0.3" max="5" :disabled="!editable" />
        </label>
        <label>格栅高度(m)
          <input type="number" v-model.number="p.grilleDepth" step="0.1" min="0.2" max="2" :disabled="!editable" />
        </label>
        <label>减光段照度阈值
          <select v-model.number="p.thresholdPct" :disabled="!editable">
            <option :value="2">洞外亮度 2%</option>
            <option :value="3">洞外亮度 3%</option>
            <option :value="4">洞外亮度 4%</option>
            <option :value="5">洞外亮度 5%</option>
          </select>
        </label>
        <label>仿真日期
          <input type="date" v-model="p.simDate" :disabled="!editable" />
        </label>
        <label>仿真时刻
          <input type="time" v-model="p.simTime" :disabled="!editable" />
        </label>
      </div>

      <div class="btn-row">
        <button v-if="editable" @click="onRun">▶ 运行太阳轨迹仿真</button>
        <button v-if="editable && current.status !== 'pending'" class="ok" @click="onSubmit" :disabled="!current.current.result">
          {{ current.status === 'returned' ? '修改完成, 重新提交' : '提交审核' }}
        </button>
        <button v-if="isDesigner && current.status === 'draft'" class="ghost" @click="onDelete">删除草稿</button>
      </div>

      <!-- 仿真结果 -->
      <template v-if="r">
        <div class="metrics">
          <div class="metric"><span>太阳高度角</span><b>{{ r.solarAltitude }}°</b></div>
          <div class="metric"><span>太阳方位角</span><b>{{ r.solarAzimuth }}°</b></div>
          <div class="metric"><span>洞外照度</span><b>{{ r.outsideIlluminance.toLocaleString() }} lux</b></div>
          <div class="metric"><span>单层格栅遮挡率</span><b>{{ (r.shadingPerGrille * 100).toFixed(1) }}%</b></div>
          <div class="metric"><span>洞门处照度</span><b>{{ r.portalIlluminance.toLocaleString() }} lux</b></div>
          <div class="metric">
            <span>校核结论</span>
            <b :class="r.pass ? 'tag-ok' : 'tag-red'">{{ r.pass ? '通过' : `超限${r.exceededCount}处 / 陡跳${r.steepCount}处` }}</b>
          </div>
        </div>

        <CurveChart
          title="棚下路面照度明暗过渡曲线(距洞门 x → 棚外端)"
          :series="[{ name: '棚下照度', color: '#60a5fa', points: curvePoints }]"
          :limit-points="limitPoints"
          :markers="markers"
        />

        <div v-if="badPoints.length" class="panel-inner">
          <h4 class="tag-red">⚠ 标红位置与偏移量(共 {{ badPoints.length }} 处)</h4>
          <div class="table-scroll">
            <table class="grid-table">
              <thead><tr><th>位置 x(m)</th><th>照度(lux)</th><th>限值(lux)</th><th>类型</th><th>偏移量(lux)</th></tr></thead>
              <tbody>
                <tr v-for="(q, i) in badPoints" :key="i">
                  <td>{{ q.x }}</td><td>{{ q.illuminance.toLocaleString() }}</td><td>{{ q.limit.toLocaleString() }}</td>
                  <td :class="q.exceeded ? 'tag-red' : ''">{{ q.exceeded ? '超阈值' : '陡跳' }}</td>
                  <td class="tag-red">+{{ q.offset.toLocaleString() }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>

      <!-- 冬季眩光提示 -->
      <div class="panel-inner">
        <h4>❄ 冬季低角度眩光时段提示(朝向 {{ p.orientation }}° {{ orientationName(p.orientation) }})</h4>
        <template v-if="glareWindows.length">
          <table class="grid-table">
            <thead><tr><th>代表日期</th><th>眩光时段</th><th>时段内最大高度角</th></tr></thead>
            <tbody>
              <tr v-for="(w, i) in glareWindows" :key="i">
                <td>{{ w.date }}</td><td>{{ w.start }} ~ {{ w.end }}</td><td>{{ w.maxAltitude }}°</td>
              </tr>
            </tbody>
          </table>
          <p class="muted">提示: 以上时段太阳低角度直射洞口, 建议加强防眩设施并纳入运管提示。</p>
        </template>
        <p v-else class="muted">该朝向冬季无显著低角度直射眩光时段。</p>
      </div>
    </section>

    <!-- 右: 三维场景 -->
    <section v-if="current" class="panel scene-panel">
      <h3>三维场景(洞门断面 · 地形 · 太阳轨迹)</h3>
      <PortalScene :params="p" :result="current.current.result" />
      <p class="muted scene-note">
        蓝色箭头=北向, 黄色虚线=当日太阳轨迹; 红色锥标=超阈值位置, 橙色=陡跳位置。拖拽旋转, 滚轮缩放。
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { STATUS_NAMES } from '../types'
import type { Scheme } from '../types'
import {
  createScheme, deleteScheme, reviseAndResubmit, runAndSave, store, submitScheme
} from '../store/schemes'
import { orientationName, winterGlareWindows } from '../utils/illuminance'
import PortalScene from '../components/PortalScene.vue'
import CurveChart, { type ChartMarker } from '../components/CurveChart.vue'

const selectedId = ref<string>(store.schemes[0]?.id ?? '')
const current = computed<Scheme | undefined>(() => store.schemes.find((s) => s.id === selectedId.value))

const isDesigner = computed(() => store.session.role === 'designer')
const editable = computed(() => {
  const s = current.value
  if (!s || !isDesigner.value || s.locked) return false
  return s.status === 'draft' || s.status === 'returned'
})

const p = computed(() => current.value!.current.params)
const r = computed(() => current.value?.current.result ?? null)

const lastReturn = computed(() => current.value?.returns[current.value.returns.length - 1])

const curvePoints = computed(() => r.value?.points.map((q) => ({ x: q.x, y: q.illuminance })) ?? [])
const limitPoints = computed(() => r.value?.points.map((q) => ({ x: q.x, y: q.limit })) ?? null)
const markers = computed<ChartMarker[] | null>(() => {
  if (!r.value) return null
  return r.value.points
    .filter((q) => q.exceeded || q.steep)
    .map((q) => ({ x: q.x, y: q.illuminance, offset: q.offset, kind: q.exceeded ? ('exceeded' as const) : ('steep' as const) }))
})
const badPoints = computed(() => r.value?.points.filter((q) => q.exceeded || q.steep) ?? [])

const glareWindows = computed(() =>
  current.value ? winterGlareWindows(p.value.latitude, p.value.orientation) : []
)

function onCreate(): void {
  const s = createScheme()
  selectedId.value = s.id
}
function onRun(): void {
  if (current.value) runAndSave(current.value)
}
function onSubmit(): void {
  const s = current.value
  if (!s) return
  if (s.status === 'returned') reviseAndResubmit(s)
  else submitScheme(s)
}
function onDelete(): void {
  if (!current.value) return
  deleteScheme(current.value.id)
  selectedId.value = store.schemes[0]?.id ?? ''
}
</script>

<style scoped>
.design { display: grid; grid-template-columns: 260px minmax(420px, 1fr) minmax(380px, 1fr); gap: 14px; align-items: start; }
.list-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.scheme-item { padding: 8px; border-radius: 8px; cursor: pointer; border: 1px solid transparent; }
.scheme-item:hover { background: var(--panel-2); }
.scheme-item.active { border-color: var(--accent); background: var(--panel-2); }
.si-top { display: flex; justify-content: space-between; gap: 6px; align-items: center; }
.si-sub { font-size: 12px; margin-top: 2px; }
.form-head { display: flex; justify-content: space-between; align-items: center; }
.return-box { background: #451a03; border: 1px solid #9a3412; border-radius: 8px; padding: 8px 10px; margin: 8px 0; font-size: 13px; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 12px; margin: 10px 0; }
.grid2 label { display: flex; flex-direction: column; gap: 3px; }
.btn-row { display: flex; gap: 8px; margin: 10px 0; flex-wrap: wrap; }
.metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin: 10px 0; }
.metric { background: var(--panel-2); border-radius: 8px; padding: 8px 10px; display: flex; flex-direction: column; }
.metric span { font-size: 12px; color: var(--text-dim); }
.metric b { font-size: 15px; }
.panel-inner { background: var(--panel-2); border-radius: 8px; padding: 10px; margin-top: 10px; }
.panel-inner h4 { margin: 0 0 8px; font-size: 13px; }
.table-scroll { max-height: 220px; overflow: auto; }
.scene-panel { display: flex; flex-direction: column; }
.scene-panel > div { flex: 1; }
.scene-note { font-size: 12px; margin: 8px 0 0; }
@media (max-width: 1400px) { .design { grid-template-columns: 240px 1fr; } .scene-panel { grid-column: 1 / -1; min-height: 420px; } }
</style>
