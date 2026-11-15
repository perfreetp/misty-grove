<template>
  <div class="app">
    <header class="topbar">
      <div class="brand">
        <span class="logo">⛰</span>
        <div>
          <div class="title">隧道洞门遮光棚日照减光仿真与方案评审系统</div>
          <div class="subtitle">公路设计院隧道专业组 · 路段管理处</div>
        </div>
      </div>
      <div class="session">
        <label>当前角色</label>
        <select v-model="store.session.role">
          <option v-for="(name, r) in ROLE_NAMES" :key="r" :value="r">{{ name }}</option>
        </select>
        <label>操作人</label>
        <input v-model="store.session.operator" style="width: 110px" />
      </div>
    </header>

    <nav class="tabs">
      <button
        v-for="m in modules"
        :key="m.key"
        class="tab"
        :class="{ active: activeModule === m.key }"
        @click="activeModule = m.key"
      >
        {{ m.name }}
      </button>
    </nav>

    <main class="main">
      <DesignView v-if="activeModule === 'design'" />
      <ReviewView v-else-if="activeModule === 'review'" />
      <ManageView v-else-if="activeModule === 'manage'" />
      <DeliveryView v-else />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ROLE_NAMES } from './types'
import { store } from './store/schemes'
import DesignView from './views/DesignView.vue'
import ReviewView from './views/ReviewView.vue'
import ManageView from './views/ManageView.vue'
import DeliveryView from './views/DeliveryView.vue'

const modules = [
  { key: 'design', name: '① 方案设计与仿真' },
  { key: 'review', name: '② 方案审核' },
  { key: 'manage', name: '③ 管理处查看批注' },
  { key: 'delivery', name: '④ 交付与导出' }
] as const

const activeModule = ref<(typeof modules)[number]['key']>('design')
</script>

<style scoped>
.app { display: flex; flex-direction: column; height: 100%; }
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 10px 20px;
  background: var(--panel);
  border-bottom: 1px solid var(--border);
  flex-wrap: wrap;
}
.brand { display: flex; align-items: center; gap: 12px; }
.logo { font-size: 28px; }
.title { font-size: 17px; font-weight: 700; }
.subtitle { font-size: 12px; color: var(--text-dim); }
.session { display: flex; align-items: center; gap: 8px; }
.tabs { display: flex; gap: 6px; padding: 8px 20px 0; }
.tab {
  background: var(--panel);
  color: var(--text-dim);
  border: 1px solid var(--border);
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  padding: 8px 18px;
}
.tab.active { background: var(--panel-2); color: var(--text); font-weight: 600; border-color: var(--accent); }
.main { flex: 1; overflow: auto; padding: 16px 20px 24px; }
</style>
