<template>
  <div class="palette">
    <h3>构件库</h3>
    <div v-for="(t, key) in TYPES" :key="key" class="pal-item"
         :draggable="editable" :class="{disabled: !editable}"
         @dragstart="onDrag(key, $event)">
      <span class="sw" :style="{background: t.color}"></span>
      <div>
        <div class="pal-name">{{ t.name }}</div>
        <div class="pal-size">{{ t.len }}×{{ t.wid }}m{{ key==='parking' ? ' / 车位' : '' }}</div>
      </div>
    </div>
    <p class="pal-tip" v-if="editable">拖到右侧平面图中布置</p>
    <p class="pal-tip" v-else>当前状态/角色不可布置</p>
  </div>
</template>

<script setup>
import { TYPES } from '../rules.js'
import { editable } from '../store.js'
function onDrag(type, e) {
  e.dataTransfer.setData('comp-type', type)
  e.dataTransfer.effectAllowed = 'copy'
}
</script>

<style scoped>
.palette h3 { margin: 0 0 8px; font-size: 14px; }
.pal-item { display: flex; gap: 8px; align-items: center; padding: 8px; border: 1px solid #d5dae0;
  border-radius: 6px; margin-bottom: 8px; background: #fff; cursor: grab; }
.pal-item.disabled { opacity: .5; cursor: not-allowed; }
.sw { width: 18px; height: 18px; border-radius: 3px; flex: none; }
.pal-name { font-size: 13px; font-weight: 600; }
.pal-size { font-size: 11px; color: #778; }
.pal-tip { font-size: 11px; color: #889; }
</style>
