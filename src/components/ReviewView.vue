<template>
  <div>
    <div v-if="!activeId" class="panel">
      <div class="panel-head"><h2>待审签列表</h2></div>
      <table class="table">
        <thead>
          <tr><th>病例号</th><th>患者</th><th>节段</th><th>责任神经根</th><th>提交人</th><th>提交时间</th><th>操作</th></tr>
        </thead>
        <tbody>
          <tr v-for="c in pending" :key="c.id">
            <td>{{ c.id }}</td>
            <td>{{ c.patientName }}({{ c.sex }}/{{ c.age }}岁)</td>
            <td>{{ c.segment }}</td>
            <td>{{ c.side }}{{ c.root }}</td>
            <td>{{ lastSubmit(c)?.user }}</td>
            <td>{{ fmtTime(lastSubmit(c)?.t) }}</td>
            <td><button class="btn slim warn" @click="activeId = c.id">进入审签</button></td>
          </tr>
          <tr v-if="!pending.length"><td colspan="7" class="empty">暂无待审病例</td></tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <div class="review-bar">
        <button class="btn ghost" @click="activeId = ''">← 返回列表</button>
        <span class="spacer"></span>
        <template v-if="isChief">
          <button class="btn danger" @click="showReject = true">退回</button>
          <button class="btn ok" @click="doApprove">审签通过</button>
        </template>
      </div>
      <PlannerView :case-id="activeId" @back="activeId = ''" />

      <div v-if="showReject" class="modal-mask" @click.self="showReject = false">
        <div class="modal">
          <h3>退回病例 {{ activeId }}</h3>
          <label class="block-label">退回原因
            <select v-model="rejectReason" class="input">
              <option v-for="r in REJECT_REASONS" :key="r">{{ r }}</option>
            </select>
          </label>
          <label class="block-label">补充说明
            <textarea v-model.trim="rejectNote" class="input" rows="3" placeholder="具体说明需要修改的内容"></textarea>
          </label>
          <div class="modal-actions">
            <button class="btn ghost" @click="showReject = false">取消</button>
            <button class="btn danger" @click="doReject">确认退回</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PlannerView from './PlannerView.vue'
import { store, fmtTime, getCase, approveCase, rejectCase, REJECT_REASONS } from '../store'

const activeId = ref('')
defineExpose({ activeId })
const showReject = ref(false)
const rejectReason = ref(REJECT_REASONS[0])
const rejectNote = ref('')

const isChief = computed(() => store.user.role === 'chief')
const pending = computed(() => store.cases.filter(c => c.status === 'pending'))

function lastSubmit(c) {
  return [...c.log].reverse().find(l => l.action === '提交审签')
}
function doApprove() {
  const c = getCase(activeId.value)
  if (!c) return
  if (confirm(`确认通过病例 ${c.id}(${c.patientName})的穿刺路径?`)) {
    approveCase(c)
    activeId.value = ''
  }
}
function doReject() {
  const c = getCase(activeId.value)
  if (!c) return
  rejectCase(c, rejectReason.value, rejectNote.value)
  showReject.value = false
  rejectNote.value = ''
  activeId.value = ''
}
</script>

<style scoped>
.review-bar { display: flex; gap: 10px; align-items: center; margin-bottom: 10px; }
.spacer { flex: 1; }
.block-label { display: block; font-size: 13px; color: #9fb2c8; margin: 10px 0; }
</style>
