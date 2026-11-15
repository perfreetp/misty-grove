<script setup>
import { computed, reactive } from 'vue'
import { store, sectionOf, pushHistory, STATUS } from '../store'

const comments = reactive({}) // planId -> 审批意见输入

const plans = computed(() =>
  store.plans
    .filter(p => p.status !== '草稿' || store.role === '编制人')
    .slice()
    .sort((a, b) => (a.status === '联审中' ? -1 : 1) - (b.status === '联审中' ? -1 : 1)))

const canReview = computed(() => store.role === '交警' || store.role === '路政')

function myReview(p) {
  return p.reviews[store.role]
}

function approve(p) {
  if (!canReview.value || p.status !== '联审中' || myReview(p)) return
  const comment = (comments[p.id] || '').trim()
  p.reviews[store.role] = { result: '通过', comment, time: new Date().toLocaleString('zh-CN', { hour12: false }) }
  pushHistory(p, store.role, '通过', comment)
  comments[p.id] = ''
  const j = p.reviews['交警']
  const l = p.reviews['路政']
  if (j?.result === '通过' && l?.result === '通过') finalize(p)
}

function reject(p) {
  if (!canReview.value || p.status !== '联审中' || myReview(p)) return
  const comment = (comments[p.id] || '').trim()
  if (!comment) { alert('退回必须填写审批意见'); return }
  p.reviews[store.role] = { result: '退回', comment, time: new Date().toLocaleString('zh-CN', { hour12: false }) }
  p.status = '退回'
  pushHistory(p, store.role, '退回', comment)
  comments[p.id] = ''
}

function finalize(p) {
  const sec = sectionOf(p)
  const seq = store.plans.filter(x => x.sectionId === p.sectionId && x.version).length + 1
  p.version = `${sec.code}-V${seq}`
  p.removeDate = sec.period.end
  p.status = '已通过'
  pushHistory(p, '系统', `联审通过,生成实施版本 ${p.version},撤除日期 ${p.removeDate}`)
}

function toEditor(p) {
  store.ui.sectionId = p.sectionId
  store.ui.planId = p.id
  store.ui.tab = 'editor'
}
</script>

<template>
  <div class="panel">
    <h2>联审流转 <span class="muted">编制人提交后,交警、路政双方均通过方可生成实施版本;退回须填写意见并留痕</span></h2>
    <p v-if="!plans.length" class="empty">暂无流转中的方案</p>

    <div v-for="p in plans" :key="p.id" class="panel" style="background:#fafbfc">
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
        <b>{{ p.name }}</b>
        <span class="badge" :class="STATUS[p.status]">{{ p.status }}</span>
        <span v-if="p.version" class="badge badge-approved">{{ p.version }}</span>
        <span class="muted">{{ sectionOf(p)?.name }}</span>
        <span style="flex:1"></span>
        <button v-if="store.role === '编制人' && (p.status === '退回' || p.status === '草稿')" @click="toEditor(p)">去修改</button>
      </div>

      <!-- 双方审批状态 -->
      <div style="display:flex;gap:14px;margin:10px 0;flex-wrap:wrap">
        <div v-for="r in ['交警', '路政']" :key="r"
          style="flex:1;min-width:240px;border:1px solid #e2e7ee;border-radius:6px;padding:8px 10px;background:#fff">
          <b>{{ r }}</b>
          <template v-if="p.reviews[r]">
            <span class="badge" :class="p.reviews[r].result === '通过' ? 'badge-approved' : 'badge-returned'" style="margin-left:8px">
              {{ p.reviews[r].result }}
            </span>
            <div class="muted" style="margin-top:4px">{{ p.reviews[r].time }}</div>
            <div v-if="p.reviews[r].comment" style="font-size:13px;margin-top:4px">意见:{{ p.reviews[r].comment }}</div>
          </template>
          <span v-else class="muted" style="margin-left:8px">待审批</span>
        </div>
      </div>

      <!-- 审批操作 -->
      <div v-if="canReview && p.status === '联审中' && !myReview(p)"
        style="border-top:1px dashed #d5dbe3;padding-top:10px">
        <textarea v-model="comments[p.id]" placeholder="审批意见(通过可不填,退回必填)"></textarea>
        <div style="margin-top:8px">
          <button class="primary" @click="approve(p)">通过</button>
          <button class="danger" style="margin-left:8px" @click="reject(p)">退回</button>
        </div>
      </div>

      <!-- 流转留痕 -->
      <details v-if="p.history.length" style="margin-top:10px">
        <summary style="cursor:pointer;color:#1f5a8a">流转记录({{ p.history.length }}条)</summary>
        <table class="grid" style="margin-top:8px">
          <thead><tr><th>时间</th><th>角色</th><th>动作</th><th>意见</th></tr></thead>
          <tbody>
            <tr v-for="(h, i) in p.history" :key="i">
              <td style="white-space:nowrap">{{ h.time }}</td>
              <td>{{ h.actor }}</td>
              <td>{{ h.action }}</td>
              <td>{{ h.comment || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </details>
    </div>
  </div>
</template>
