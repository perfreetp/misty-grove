<template>
  <div class="planner" v-if="c">
    <div class="planner-left">
      <NeedleView
        ref="nv"
        :segment="c.segment"
        :side="c.side"
        :needle="c.needle"
        :marks="c.marks"
        :editable="editable"
        @update:needle="onNeedle"
        @mark="onMark"
        @distances="d => (dist = d)"
      />
      <div class="hint" v-if="editable">
        点击模型标记椎体 / 椎间孔 / 神经根 · 拖拽穿刺针调整角度 · 红色球为靶点({{ c.segment }}{{ c.side }}椎间孔)
      </div>
      <div class="hint" v-else>审签视图(只读)· 可旋转缩放查看三维路径</div>
    </div>

    <div class="planner-right">
      <section class="card">
        <h4>病例信息 <span class="tag" :class="'st-' + c.status">{{ STATUS[c.status] }}</span></h4>
        <div class="kv"><span>病例号</span>{{ c.id }}</div>
        <div class="kv"><span>患者</span>{{ c.patientName }}({{ c.sex }}/{{ c.age }}岁) {{ c.patientId }}</div>
        <div class="kv"><span>疼痛节段</span>{{ c.segment }}</div>
        <div class="kv"><span>责任神经根</span>{{ c.side }}{{ c.root }}</div>
        <div class="kv"><span>既往手术史</span>{{ c.surgeryHistory }}</div>
        <div class="kv"><span>凝血</span>
          PT {{ c.coag.PT }}s · APTT {{ c.coag.APTT }}s · INR {{ c.coag.INR }} · PLT {{ c.coag.PLT }}
        </div>
      </section>

      <section class="card" v-if="editable">
        <h4>影像导入</h4>
        <div class="row">
          <select v-model="imgKind" class="input slim"><option>CT</option><option>透视</option></select>
          <input type="file" accept="image/*" multiple @change="onFiles" class="file-input" />
        </div>
        <div class="img-list">
          <figure v-for="img in c.images" :key="img.id">
            <img :src="imgUrls[img.id]" :alt="img.name" @click="preview = imgUrls[img.id]" />
            <figcaption>{{ img.kind }} · {{ img.name }}
              <button class="btn slim danger" @click="removeImg(img)">删</button>
            </figcaption>
          </figure>
          <p v-if="!c.images.length" class="empty">尚未导入影像</p>
        </div>
      </section>

      <section class="card" v-else>
        <h4>影像切层比对</h4>
        <div class="img-list">
          <figure v-for="img in c.images" :key="img.id">
            <img :src="imgUrls[img.id]" :alt="img.name" @click="preview = imgUrls[img.id]" />
            <figcaption>{{ img.kind }} · {{ img.name }}</figcaption>
          </figure>
          <p v-if="!c.images.length" class="empty">无影像</p>
        </div>
      </section>

      <section class="card">
        <h4>解剖标记</h4>
        <div class="kv"><span>椎体</span><b :class="{miss: !c.marks.vertebra}">{{ c.marks.vertebra || '未标记' }}</b></div>
        <div class="kv"><span>椎间孔</span><b :class="{miss: !c.marks.foramen}">{{ c.marks.foramen || '未标记' }}</b></div>
        <div class="kv"><span>神经根</span><b :class="{miss: !c.marks.nerveRoot}">{{ c.marks.nerveRoot || '未标记' }}</b></div>
      </section>

      <section class="card" v-if="editable">
        <h4>穿刺模板(技师维护)</h4>
        <div class="row">
          <select v-model="tplId" class="input">
            <option value="">选择模板…</option>
            <option v-for="t in segTemplates" :key="t.id" :value="t.id">
              {{ t.name }}({{ t.approach }} 外展{{ t.az }}° 头倾{{ t.el }}°)
            </option>
          </select>
          <button class="btn slim" :disabled="!tplId" @click="applyTpl">应用</button>
        </div>
      </section>

      <section class="card">
        <h4>进针参数</h4>
        <label class="slider">外展角 {{ c.needle.az.toFixed(1) }}°
          <input type="range" min="0" max="80" step="0.5" v-model.number="c.needle.az" :disabled="!editable" />
        </label>
        <label class="slider">头倾角 {{ c.needle.el.toFixed(1) }}°
          <input type="range" min="-30" max="45" step="0.5" v-model.number="c.needle.el" :disabled="!editable" />
        </label>
        <label class="slider">针尖过靶点 {{ c.needle.advance.toFixed(1) }} mm
          <input type="range" min="-30" max="30" step="0.5" v-model.number="c.needle.advance" :disabled="!editable" />
        </label>
      </section>

      <section class="card" v-if="editable">
        <h4>提交审签</h4>
        <ul class="err-list" v-if="submitErrors.length">
          <li v-for="e in submitErrors" :key="e">✗ {{ e }}</li>
        </ul>
        <p v-else class="ok-text">✓ 校验通过,可提交</p>
        <button class="btn primary block" :disabled="!!submitErrors.length" @click="doSubmit">
          {{ c.status === 'rejected' ? '重新提交审签' : '提交审签' }}
        </button>
      </section>

      <section class="card">
        <h4>操作记录</h4>
        <ul class="log">
          <li v-for="(l, i) in [...c.log].reverse()" :key="i">
            <span class="log-t">{{ fmtTime(l.t) }}</span>
            <b>{{ l.action }}</b> {{ l.detail }}
            <span class="log-u">{{ l.user }}({{ ROLES[l.role] }})</span>
          </li>
        </ul>
      </section>
    </div>

    <div v-if="preview" class="img-preview" @click="preview = ''">
      <img :src="preview" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import NeedleView from './NeedleView.vue'
import {
  store, STATUS, ROLES, fmtTime, getCase, addImages, removeImage,
  setMarks, setNeedle, applyTemplate, validateSubmit, submitCase,
} from '../store'
import { getImage } from '../db'

const props = defineProps({ caseId: { type: String, required: true } })
const emit = defineEmits(['back'])

const c = computed(() => getCase(props.caseId))
const editable = computed(() =>
  store.user.role === 'physician' && c.value && ['planning', 'rejected'].includes(c.value.status)
)

const nv = ref(null)
const dist = ref(null)
const imgKind = ref('CT')
const tplId = ref('')
const preview = ref('')
const imgUrls = ref({})

const segTemplates = computed(() => store.templates.filter(t => t.segment === c.value?.segment))

async function loadUrls() {
  if (!c.value) return
  for (const img of c.value.images) {
    if (!imgUrls.value[img.id]) {
      const blob = await getImage(img.id)
      if (blob) imgUrls.value[img.id] = URL.createObjectURL(blob)
    }
  }
}
onMounted(loadUrls)
watch(() => c.value?.images.length, loadUrls)

function onNeedle(n) {
  setNeedle(c.value, n)
}
function onMark(m) {
  if (!editable.value) return
  const patch = {}
  if (m.kind === 'vertebra') patch.vertebra = m.label
  if (m.kind === 'foramen') patch.foramen = m.label
  if (m.kind === 'nerveRoot') patch.nerveRoot = m.label
  setMarks(c.value, patch)
}
async function onFiles(e) {
  const files = [...e.target.files]
  if (files.length) await addImages(c.value, files, imgKind.value)
  e.target.value = ''
  loadUrls()
}
async function removeImg(img) {
  await removeImage(c.value, img)
  delete imgUrls.value[img.id]
}
function applyTpl() {
  applyTemplate(c.value, tplId.value)
  tplId.value = ''
}

const submitErrors = computed(() => (c.value ? validateSubmit(c.value, dist.value) : []))

function doSubmit() {
  if (submitErrors.value.length) return
  const shot = nv.value?.screenshot() || ''
  submitCase(c.value, dist.value, shot)
  emit('back')
}
</script>

<style scoped>
.planner { display: flex; gap: 14px; height: calc(100vh - 130px); min-height: 500px; }
.planner-left { flex: 1.4; display: flex; flex-direction: column; gap: 8px; min-width: 0; }
.planner-left :deep(.needle-view) { flex: 1; }
.planner-right { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; padding-right: 4px; }
.hint { font-size: 12px; color: #7f93a8; }
.card { background: #182130; border: 1px solid #26344a; border-radius: 8px; padding: 10px 14px; }
.card h4 { margin: 0 0 8px; font-size: 14px; color: #9fc1e8; display: flex; align-items: center; gap: 8px; }
.kv { display: flex; gap: 10px; font-size: 13px; padding: 2px 0; color: #d5e0ec; }
.kv span { color: #7f93a8; min-width: 72px; flex-shrink: 0; }
.kv b.miss { color: #ff9a3c; }
.row { display: flex; gap: 8px; align-items: center; }
.file-input { font-size: 12px; color: #9fb2c8; flex: 1; min-width: 0; }
.img-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
.img-list figure { margin: 0; width: 110px; }
.img-list img { width: 110px; height: 80px; object-fit: cover; border-radius: 4px; cursor: zoom-in; border: 1px solid #2a3a50; }
.img-list figcaption { font-size: 11px; color: #8fa3ba; word-break: break-all; }
.empty { color: #5f7185; font-size: 12px; }
.slider { display: block; font-size: 13px; color: #c8d6e5; margin: 6px 0; }
.slider input { width: 100%; }
.err-list { margin: 0 0 8px; padding: 0; list-style: none; color: #ff7a7a; font-size: 13px; }
.ok-text { color: #7ee2a8; font-size: 13px; margin: 0 0 8px; }
.log { margin: 0; padding: 0; list-style: none; font-size: 12px; color: #b8c7d8; max-height: 180px; overflow-y: auto; }
.log li { padding: 3px 0; border-bottom: 1px dashed #243144; }
.log-t { color: #6d8299; margin-right: 6px; }
.log-u { color: #6d8299; margin-left: 6px; }
.img-preview { position: fixed; inset: 0; background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center; z-index: 50; cursor: zoom-out; }
.img-preview img { max-width: 92vw; max-height: 92vh; }
.warn-text { color: #ff9a3c; }
</style>
