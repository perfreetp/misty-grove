<template>
  <div class="panel">
    <div class="panel-head">
      <h2>穿刺模板与入路偏好维护</h2>
      <button v-if="isTech" class="btn primary" @click="edit(blank())">+ 新建模板</button>
    </div>
    <p class="hint" v-if="!isTech">仅介入技师可编辑模板,当前为只读查看。</p>
    <table class="table">
      <thead>
        <tr>
          <th>名称</th><th>节段</th><th>入路</th><th>侧别</th><th>外展角</th><th>头倾角</th><th>过靶点</th>
          <th>备注</th><th>维护人</th><th>更新时间</th><th v-if="isTech">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in store.templates" :key="t.id">
          <td>{{ t.name }}</td>
          <td>{{ t.segment }}</td>
          <td><span class="tag approach">{{ t.approach }}</span></td>
          <td>{{ t.side }}</td>
          <td>{{ t.az }}°</td>
          <td>{{ t.el }}°</td>
          <td>{{ t.advance }}mm</td>
          <td class="note">{{ t.note }}</td>
          <td>{{ t.updatedBy }}</td>
          <td>{{ fmtTime(t.updatedAt) }}</td>
          <td v-if="isTech" class="ops">
            <button class="btn slim" @click="edit({ ...t })">编辑</button>
            <button class="btn slim danger" @click="del(t)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="editing" class="modal-mask" @click.self="editing = null">
      <div class="modal">
        <h3>{{ editing.id ? '编辑模板' : '新建模板' }}</h3>
        <div class="form-grid">
          <label class="span2">模板名称<input v-model.trim="editing.name" class="input" /></label>
          <label>节段
            <select v-model="editing.segment" class="input"><option v-for="s in SEGMENTS" :key="s">{{ s }}</option></select>
          </label>
          <label>入路
            <select v-model="editing.approach" class="input"><option v-for="a in APPROACHES" :key="a">{{ a }}</option></select>
          </label>
          <label>偏好侧别
            <select v-model="editing.side" class="input"><option v-for="s in SIDES" :key="s">{{ s }}</option></select>
          </label>
          <label>外展角 (°)<input v-model.number="editing.az" type="number" min="0" max="80" class="input" /></label>
          <label>头倾角 (°)<input v-model.number="editing.el" type="number" min="-30" max="45" class="input" /></label>
          <label>针尖过靶点 (mm)<input v-model.number="editing.advance" type="number" min="-30" max="30" class="input" /></label>
          <label class="span2">备注<textarea v-model.trim="editing.note" class="input" rows="2"></textarea></label>
        </div>
        <div class="modal-actions">
          <button class="btn ghost" @click="editing = null">取消</button>
          <button class="btn primary" :disabled="!editing.name" @click="save">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { store, SEGMENTS, SIDES, APPROACHES, fmtTime, saveTemplate, deleteTemplate } from '../store'

const isTech = computed(() => store.user.role === 'tech')
const editing = ref(null)

function blank() {
  return { id: '', name: '', segment: 'L4-L5', approach: '后外侧入路', side: '左', az: 45, el: 10, advance: 0, note: '' }
}
function edit(t) { editing.value = t }
function save() {
  saveTemplate(editing.value)
  editing.value = null
}
function del(t) {
  if (confirm(`删除模板「${t.name}」?`)) deleteTemplate(t.id)
}
</script>

<style scoped>
.hint { color: #7f93a8; font-size: 13px; }
.note { max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.tag.approach { background: #274b6d; color: #9fd3ff; }
</style>
