<template>
  <div class="review">
    <h3>联审意见（V{{ ver.n }}）</h3>
    <div class="signs">
      <div v-for="r in REVIEWERS" :key="r" class="sign" :class="ver.reviews[r]">
        {{ r }}：{{ signText(ver.reviews[r]) }}
      </div>
    </div>

    <div v-if="canComment" class="cform">
      <select v-model="targetId">
        <option value="">— 选择关联构件 —</option>
        <option v-for="c in comps" :key="c.id" :value="c.id">{{ nameOf(c) }}</option>
      </select>
      <textarea v-model="text" rows="3" placeholder="填写审查意见（挂在所选构件上）"></textarea>
      <button class="btn primary" @click="submit">提交意见</button>
    </div>
    <p v-else class="tip">{{ ver.status==='review' ? '切换到城管/消防/养护角色可填写意见' : '联审阶段可填写意见' }}</p>

    <div v-for="m in ver.comments" :key="m.id" class="cmt">
      <div class="cmt-head">
        <b>{{ m.role }}</b>
        <span class="cmt-comp" v-if="m.componentId" @click="store.selectedId = m.componentId">📌 {{ m.componentName }}</span>
        <span class="cmt-time">{{ fmtTime(m.time) }}</span>
      </div>
      <div class="cmt-body">{{ m.text }}</div>
    </div>
    <p v-if="!ver.comments.length" class="tip">暂无意见</p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { store, viewVersion, components, addComment, fmtTime, REVIEWERS, ROLES } from '../store.js'
import { TYPES } from '../rules.js'

const ver = viewVersion
const comps = components
const text = ref('')
const targetId = ref('')

const canComment = computed(() =>
  ver.value.status === 'review' && REVIEWERS.includes(store.role) && ver.value.reviews[store.role] === 'pending')

function signText(s) { return s === 'pass' ? '✔ 已通过' : s === 'return' ? '✘ 已退回' : '… 待审' }
function nameOf(c) { return c.label || (TYPES[c.type].name + (c.type === 'parking' ? `×${c.spots}` : '')) }

function submit() {
  const t = text.value.trim()
  if (!t) return
  const c = comps.value.find(x => x.id === targetId.value)
  addComment(store.role, c ? c.id : null, c ? nameOf(c) : '', t)
  text.value = ''
  targetId.value = ''
}
</script>

<style scoped>
.review h3 { margin: 0 0 8px; font-size: 14px; }
.signs { display: flex; gap: 6px; margin-bottom: 10px; }
.sign { flex: 1; text-align: center; font-size: 12px; padding: 5px 2px; border-radius: 4px; background: #eef0f3; }
.sign.pass { background: #dcf3e3; color: #1c7a3d; }
.sign.return { background: #fde8e8; color: #c02020; }
.cform select, .cform textarea { width: 100%; box-sizing: border-box; margin-bottom: 6px; font-size: 12px;
  border: 1px solid #c8cfd6; border-radius: 4px; padding: 4px 6px; font-family: inherit; }
.btn { width: 100%; padding: 6px; border: none; border-radius: 4px; cursor: pointer; font-size: 13px; }
.primary { background: #2f6fd0; color: #fff; }
.cmt { border: 1px solid #e0e4e9; border-radius: 6px; padding: 6px 8px; margin-bottom: 6px; background: #fff; }
.cmt-head { display: flex; gap: 8px; align-items: center; font-size: 12px; }
.cmt-comp { color: #2f6fd0; cursor: pointer; }
.cmt-time { margin-left: auto; color: #99a; font-size: 11px; }
.cmt-body { font-size: 12px; margin-top: 4px; white-space: pre-wrap; }
.tip { font-size: 11px; color: #889; }
</style>
