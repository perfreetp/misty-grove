<template>
  <div class="modal-mask" @click.self="$emit('close')">
    <div class="sheet" v-if="c">
      <div class="sheet-actions no-print">
        <button class="btn primary" @click="doPrint">打印</button>
        <button class="btn ghost" @click="$emit('close')">关闭</button>
      </div>
      <div class="sheet-body" id="briefing-sheet">
        <h2>疼痛科脊柱介入穿刺术前交底单</h2>
        <p class="sub">病例号:{{ c.id }} · 生成时间:{{ now }}</p>
        <table class="sheet-table">
          <tbody>
            <tr>
              <th>患者</th><td>{{ c.patientName }}({{ c.sex }}/{{ c.age }}岁)</td>
              <th>编号</th><td>{{ c.patientId }}</td>
            </tr>
            <tr>
              <th>疼痛节段</th><td>{{ c.segment }}</td>
              <th>责任神经根</th><td>{{ c.side }}{{ c.root }}</td>
            </tr>
            <tr>
              <th>既往手术史</th><td colspan="3">{{ c.surgeryHistory }}</td>
            </tr>
            <tr>
              <th>凝血指标</th><td colspan="3">
                PT {{ c.coag.PT }}s · APTT {{ c.coag.APTT }}s · INR {{ c.coag.INR }} · PLT {{ c.coag.PLT }}×10⁹/L
              </td>
            </tr>
            <tr>
              <th>入路/模板</th><td colspan="3">{{ templateName }}</td>
            </tr>
            <tr>
              <th>进针参数</th><td colspan="3">
                外展角 <b>{{ c.needle.az.toFixed(1) }}°</b> ·
                头倾角 <b>{{ c.needle.el.toFixed(1) }}°</b> ·
                针尖过靶点 <b>{{ c.needle.advance.toFixed(1) }} mm</b>
              </td>
            </tr>
            <tr>
              <th>安全距离</th><td colspan="3">
                针尖-神经根({{ c.distances?.rootName || '-' }}): <b>{{ c.distances ? c.distances.root.toFixed(1) : '-' }} mm</b> ·
                针尖-硬膜囊: <b>{{ c.distances ? c.distances.dural.toFixed(1) : '-' }} mm</b>
              </td>
            </tr>
            <tr>
              <th>解剖标记</th><td colspan="3">
                椎体 {{ c.marks.vertebra || '-' }} · {{ c.marks.foramen || '-' }} · {{ c.marks.nerveRoot || '-' }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="shot-row">
          <figure v-if="c.screenshot">
            <img :src="c.screenshot" alt="三维路径截图" />
            <figcaption>三维规划路径(提交时截图)</figcaption>
          </figure>
        </div>
        <table class="sheet-table">
          <tbody>
            <tr v-for="(l, i) in keyLog" :key="i">
              <th>{{ l.action }}</th><td>{{ fmtTime(l.t) }} · {{ l.user }}({{ roleLabel(l.role) }}) {{ l.detail }}</td>
            </tr>
          </tbody>
        </table>
        <div class="sign-row">
          <span>接诊医师:____________</span>
          <span>介入技师:____________</span>
          <span>主任医师:____________</span>
          <span>患者/家属:____________</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { store, getCase, fmtTime, ROLES } from '../store'

const props = defineProps({ caseId: { type: String, required: true } })
defineEmits(['close'])

const c = computed(() => getCase(props.caseId))
const now = fmtTime(new Date().toISOString())

const templateName = computed(() => {
  const t = store.templates.find(t => t.id === c.value?.templateId)
  return t ? `${t.name}(${t.approach})` : '自定义路径'
})
const keyLog = computed(() =>
  (c.value?.log || []).filter(l => ['新建病例', '提交审签', '审签通过', '退回'].includes(l.action))
)
function roleLabel(r) { return ROLES[r] || r }
function doPrint() { window.print() }
</script>

<style scoped>
.sheet {
  background: #fff; color: #111; width: min(820px, 94vw); max-height: 92vh; overflow-y: auto;
  border-radius: 8px; padding: 20px 28px;
}
.sheet-actions { display: flex; gap: 10px; justify-content: flex-end; margin-bottom: 10px; }
.sheet-body h2 { text-align: center; margin: 0 0 4px; font-size: 20px; }
.sub { text-align: center; color: #555; font-size: 12px; margin: 0 0 14px; }
.sheet-table { width: 100%; border-collapse: collapse; margin-bottom: 12px; font-size: 13px; }
.sheet-table th, .sheet-table td { border: 1px solid #999; padding: 6px 10px; text-align: left; }
.sheet-table th { background: #f0f0f0; width: 90px; white-space: nowrap; }
.shot-row { display: flex; justify-content: center; margin: 10px 0; }
.shot-row figure { margin: 0; text-align: center; }
.shot-row img { max-width: 480px; width: 100%; border: 1px solid #999; border-radius: 4px; }
.shot-row figcaption { font-size: 12px; color: #555; margin-top: 4px; }
.sign-row { display: flex; justify-content: space-between; margin-top: 26px; font-size: 13px; flex-wrap: wrap; gap: 10px; }
@media print {
  .modal-mask { position: static; background: none; }
  .sheet { max-height: none; width: 100%; border-radius: 0; padding: 0; overflow: visible; }
}
</style>
