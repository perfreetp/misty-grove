<template>
  <div class="modal-mask" @click.self="$emit('close')">
    <div class="modal">
      <h3>新建病例</h3>
      <div class="form-grid">
        <label>患者姓名<input v-model.trim="f.patientName" class="input" placeholder="姓名" /></label>
        <label>住院/门诊号<input v-model.trim="f.patientId" class="input" placeholder="编号" /></label>
        <label>性别
          <select v-model="f.sex" class="input"><option>男</option><option>女</option></select>
        </label>
        <label>年龄<input v-model.number="f.age" type="number" min="1" max="120" class="input" /></label>
        <label>疼痛节段
          <select v-model="f.segment" class="input">
            <option v-for="s in SEGMENTS" :key="s">{{ s }}</option>
          </select>
        </label>
        <label>责任神经根
          <span class="row">
            <select v-model="f.side" class="input"><option v-for="s in SIDES" :key="s">{{ s }}</option></select>
            <select v-model="f.root" class="input"><option v-for="r in ROOTS" :key="r">{{ r }}</option></select>
          </span>
        </label>
        <label class="span2">既往手术史
          <textarea v-model.trim="f.surgeryHistory" class="input" rows="2" placeholder="无则留空"></textarea>
        </label>
      </div>
      <fieldset class="coag">
        <legend>凝血指标</legend>
        <label>PT (s)<input v-model.number="f.coag.PT" type="number" step="0.1" class="input" :class="{warn: f.coag.PT > 14.5}" /></label>
        <label>APTT (s)<input v-model.number="f.coag.APTT" type="number" step="0.1" class="input" :class="{warn: f.coag.APTT > 40}" /></label>
        <label>INR<input v-model.number="f.coag.INR" type="number" step="0.01" class="input" :class="{warn: f.coag.INR > 1.5}" /></label>
        <label>PLT (10⁹/L)<input v-model.number="f.coag.PLT" type="number" class="input" :class="{warn: f.coag.PLT < 80}" /></label>
      </fieldset>
      <p v-if="coagWarn" class="warn-text">⚠ 凝血指标异常,请注意穿刺出血风险</p>
      <div class="modal-actions">
        <button class="btn ghost" @click="$emit('close')">取消</button>
        <button class="btn primary" :disabled="!valid" @click="submit">创建</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { SEGMENTS, ROOTS, SIDES, createCase } from '../store'

const emit = defineEmits(['close', 'created'])
const f = reactive({
  patientName: '', patientId: '', sex: '男', age: 50,
  segment: 'L4-L5', root: 'L5', side: '左',
  surgeryHistory: '',
  coag: { PT: 12.0, APTT: 32.0, INR: 1.0, PLT: 180 },
})

const valid = computed(() => f.patientName && f.patientId && f.age > 0)
const coagWarn = computed(() => f.coag.INR > 1.5 || f.coag.PLT < 80 || f.coag.PT > 14.5 || f.coag.APTT > 40)

function submit() {
  const c = createCase(f)
  emit('created', c.id)
  emit('close')
}
</script>
