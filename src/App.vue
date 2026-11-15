<script setup>
import { computed } from 'vue'
import { store, ROLES } from './store'
import Archive from './views/Archive.vue'
import Editor from './views/Editor.vue'
import Review from './views/Review.vue'
import Ledger from './views/Ledger.vue'

const tabs = [
  { key: 'archive', label: '路段档案' },
  { key: 'editor', label: '渠化编排' },
  { key: 'review', label: '联审流转' },
  { key: 'ledger', label: '实施台账' }
]
const tab = computed({
  get: () => store.ui.tab,
  set: v => { store.ui.tab = v }
})
</script>

<template>
  <div class="app">
    <header class="topbar">
      <div class="title">
        <span class="logo">🛣</span>
        <div>
          <h1>高速公路改扩建导改渠化方案编排与审批系统</h1>
          <p>养护工程部 · 交通组织方案编制 / 联审 / 实施管理</p>
        </div>
      </div>
      <div class="role">
        <label>当前角色</label>
        <select v-model="store.role">
          <option v-for="r in ROLES" :key="r" :value="r">{{ r }}</option>
        </select>
      </div>
    </header>

    <nav class="tabs">
      <button v-for="t in tabs" :key="t.key"
        :class="{ on: tab === t.key }"
        @click="tab = t.key">{{ t.label }}</button>
    </nav>

    <main>
      <Archive v-if="tab === 'archive'" />
      <Editor v-else-if="tab === 'editor'" />
      <Review v-else-if="tab === 'review'" />
      <Ledger v-else />
    </main>
  </div>
</template>
