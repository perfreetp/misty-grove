<template>
  <div class="needle-view">
    <div ref="el" class="viewport"></div>
    <transition name="flash">
      <div v-if="alertOn" class="alert-flash">
        ⚠ 危险:针尖距{{ alertLabel }}小于 3mm,请调整路径
      </div>
    </transition>
    <div v-if="alertOn" class="alert-border"></div>
    <div v-if="hover" class="hover-tip">{{ hover }}</div>
    <div class="dist-panel" v-if="dist">
      <div class="dist-row" :class="{ bad: dist.root < 3 }">
        <span>针尖-神经根({{ dist.rootName }})</span>
        <b>{{ dist.root.toFixed(1) }} mm</b>
      </div>
      <div class="dist-row" :class="{ bad: dist.dural < 3 }">
        <span>针尖-硬膜囊</span>
        <b>{{ dist.dural.toFixed(1) }} mm</b>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { SpineScene } from '../spine'

const props = defineProps({
  segment: { type: String, default: 'L4-L5' },
  side: { type: String, default: '左' },
  needle: { type: Object, default: () => ({ az: 45, el: 10, advance: 0 }) },
  marks: { type: Object, default: () => ({}) },
  editable: { type: Boolean, default: false },
})
const emit = defineEmits(['update:needle', 'mark', 'distances'])

const el = ref(null)
const hover = ref('')
const dist = ref(null)
let scene = null

const alertOn = computed(() => dist.value && (dist.value.root < 3 || dist.value.dural < 3))
const alertLabel = computed(() => {
  if (!dist.value) return ''
  if (dist.value.root < 3 && dist.value.dural < 3) return '神经根与硬膜囊'
  return dist.value.root < 3 ? `神经根(${dist.value.rootName})` : '硬膜囊'
})

onMounted(() => {
  scene = new SpineScene(el.value, {
    editable: props.editable,
    segment: props.segment,
    side: props.side,
    needle: props.needle,
    onHover: v => (hover.value = v),
    onMark: m => emit('mark', m),
    onNeedleChange: n => emit('update:needle', n),
    onDistances: d => {
      dist.value = d
      emit('distances', d)
    },
  })
  if (props.marks) scene.setMarks(props.marks)
})

watch(() => [props.segment, props.side], () => scene?.setSegment(props.segment, props.side))
watch(() => props.needle, n => { if (n && scene) scene.setNeedle(n) }, { deep: true })
watch(() => props.marks, m => { if (m && scene) scene.setMarks(m) }, { deep: true })

function screenshot() { return scene?.screenshot() || '' }
defineExpose({ screenshot })

onBeforeUnmount(() => { scene?.dispose(); scene = null })
</script>

<style scoped>
.needle-view { position: relative; width: 100%; height: 100%; min-height: 380px; overflow: hidden; border-radius: 8px; }
.viewport { position: absolute; inset: 0; }
.hover-tip {
  position: absolute; top: 10px; left: 10px; background: rgba(20, 28, 40, 0.85); color: #9fd3ff;
  padding: 4px 10px; border-radius: 4px; font-size: 13px; pointer-events: none;
}
.dist-panel {
  position: absolute; right: 10px; top: 10px; background: rgba(16, 22, 32, 0.88); border: 1px solid #2a3a50;
  border-radius: 6px; padding: 8px 12px; min-width: 210px; font-size: 13px;
}
.dist-row { display: flex; justify-content: space-between; gap: 12px; color: #c8d6e5; padding: 2px 0; }
.dist-row b { color: #7ee2a8; font-variant-numeric: tabular-nums; }
.dist-row.bad b { color: #ff5555; }
.alert-flash {
  position: absolute; left: 50%; top: 14px; transform: translateX(-50%);
  background: #d32f2f; color: #fff; font-weight: 700; padding: 8px 18px; border-radius: 6px;
  animation: blink 0.6s step-start infinite; pointer-events: none; z-index: 5; white-space: nowrap;
}
.alert-border {
  position: absolute; inset: 0; border: 4px solid #ff2222; border-radius: 8px;
  animation: blink 0.6s step-start infinite; pointer-events: none; z-index: 4;
}
@keyframes blink { 50% { opacity: 0.15; } }
</style>
