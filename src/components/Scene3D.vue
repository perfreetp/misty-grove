<template>
  <div class="scene-wrap">
    <canvas ref="cv"></canvas>
    <div class="scene-hint">拖动旋转 · 滚轮缩放 ｜ 红色：净高&lt;3m 禁摆区 ｜ 绿色：消防通道</div>
    <div v-if="!supported" class="nogl">当前浏览器不支持 WebGL2，无法显示三维净空模型</div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { store, components, fireLaneState } from '../store.js'
import { createScene } from '../gl/scene.js'

const cv = ref(null)
const supported = ref(true)
let scene = null

function rebuild() {
  if (!scene) return
  scene.rebuild(store.scheme.bridge, components.value)
  scene.rebuildLane(components.value.length ? fireLaneState.value : null, store.scheme.bridge)
}

onMounted(() => {
  scene = createScene(cv.value)
  if (!scene) { supported.value = false; return }
  rebuild()
  scene.start()
  watch([() => store.scheme.bridge, components, fireLaneState], rebuild, { deep: true })
})
onBeforeUnmount(() => scene && scene.stop())
</script>

<style scoped>
.scene-wrap { position: relative; width: 100%; height: 100%; min-height: 420px; }
canvas { width: 100%; height: 100%; display: block; border-radius: 6px; }
.scene-hint { position: absolute; left: 10px; bottom: 8px; font-size: 12px; color: #dde; opacity: .85; pointer-events: none; }
.nogl { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: #c02020; }
</style>
