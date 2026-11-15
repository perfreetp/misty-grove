<template>
  <div class="app">
    <header>
      <div class="title">高架桥下空间利用方案编排与联审系统</div>
      <input class="sname" v-model="scheme.name" :disabled="!editable" title="方案名称">
      <span class="badge" :class="ver.status">{{ STATUS_TEXT[ver.status] }} · V{{ ver.n }}</span>
      <span v-if="scheme.published" class="badge pub">已发布</span>
      <div class="spacer"></div>
      <label class="role">当前角色
        <select v-model="store.role">
          <option v-for="r in ROLES" :key="r" :value="r">{{ r }}</option>
        </select>
      </label>
      <button v-if="ver.status==='draft' && store.role==='规划员' && store.viewing==null"
              class="btn primary" @click="submitReview">提交联审</button>
      <template v-if="ver.status==='review' && REVIEWERS.includes(store.role) && ver.reviews[store.role]==='pending'">
        <button class="btn ok" @click="reviewPass(store.role)">通过（{{ store.role }}）</button>
        <button class="btn warn" @click="doReturn">退回（{{ store.role }}）</button>
      </template>
      <button class="btn" @click="doExportPlan">导出平面图</button>
      <button class="btn" :disabled="ver.status!=='approved'" @click="doExportSheet"
              :title="ver.status!=='approved' ? '批复完成后可导出批复单' : ''">导出批复单</button>
      <button class="btn pub" :disabled="ver.status!=='approved' || scheme.published" @click="publish"
              :title="ver.status!=='approved' ? '未走完批复流程，不允许对外发布' : (scheme.published ? '已发布' : '对外发布')">
        {{ scheme.published ? '已对外发布' : '对外发布' }}
      </button>
      <button class="btn ghost" @click="resetScheme" title="清空并重置为示例">重置</button>
    </header>

    <div class="main">
      <aside class="left">
        <BridgeParams />
        <Palette />
      </aside>

      <section class="center">
        <div class="tabs">
          <button :class="{on: store.centerTab==='plan'}" @click="store.centerTab='plan'">平面编排</button>
          <button :class="{on: store.centerTab==='scene'}" @click="store.centerTab='scene'">三维净空</button>
        </div>
        <PlanView v-show="store.centerTab==='plan'" />
        <Scene3D v-if="store.centerTab==='scene'" />
      </section>

      <aside class="right">
        <div class="tabs">
          <button :class="{on: rightTab==='props'}" @click="rightTab='props'">属性</button>
          <button :class="{on: rightTab==='stats'}" @click="rightTab='stats'">统计</button>
          <button :class="{on: rightTab==='review'}" @click="rightTab='review'">联审</button>
          <button :class="{on: rightTab==='vers'}" @click="rightTab='vers'">版本</button>
        </div>
        <PropsPanel v-show="rightTab==='props'" />
        <StatsPanel v-show="rightTab==='stats'" />
        <ReviewPanel v-show="rightTab==='review'" />
        <VersionPanel v-show="rightTab==='vers'" />
      </aside>
    </div>

    <transition name="fade">
      <div v-if="store.toastMsg" class="toast">{{ store.toastMsg }}</div>
    </transition>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { store, currentVersion, editable, STATUS_TEXT, ROLES, REVIEWERS,
         submitReview, reviewPass, reviewReturn, publish, resetScheme, toast } from './store.js'
import { exportPlanPNG, exportApprovalSheet } from './export.js'
import BridgeParams from './components/BridgeParams.vue'
import Palette from './components/Palette.vue'
import PlanView from './components/PlanView.vue'
import Scene3D from './components/Scene3D.vue'
import PropsPanel from './components/PropsPanel.vue'
import StatsPanel from './components/StatsPanel.vue'
import ReviewPanel from './components/ReviewPanel.vue'
import VersionPanel from './components/VersionPanel.vue'

const scheme = computed(() => store.scheme)
const ver = currentVersion
const rightTab = ref('props')

function doReturn() {
  if (confirmAction(`确认以「${store.role}」身份退回本方案？将生成新版本并保留当前版。`)) reviewReturn(store.role)
}
function confirmAction(msg) { return window.confirm(msg) }

function doExportPlan() {
  exportPlanPNG(store.scheme, ver.value)
  toast('平面图已导出')
}
function doExportSheet() {
  if (exportApprovalSheet(store.scheme, ver.value)) toast('批复单已生成（可在新窗口打印/另存PDF）')
  else toast('浏览器拦截了弹出窗口，请允许后重试')
}
</script>

<style scoped>
.app { display: flex; flex-direction: column; height: 100vh; }
header { display: flex; align-items: center; gap: 10px; padding: 8px 14px; background: #1f2a3a; color: #fff; flex-wrap: wrap; }
.title { font-size: 15px; font-weight: 700; white-space: nowrap; }
.sname { background: #2c3a4f; color: #fff; border: 1px solid #46566e; border-radius: 4px; padding: 4px 8px; font-size: 13px; width: 300px; }
.badge { font-size: 12px; padding: 2px 10px; border-radius: 10px; background: #556; }
.badge.draft { background: #4a6fa5; }
.badge.review { background: #b8860b; }
.badge.approved { background: #2e8b57; }
.badge.returned { background: #b03a3a; }
.badge.pub { background: #7a4fb5; }
.spacer { flex: 1; }
.role { font-size: 12px; display: flex; align-items: center; gap: 4px; }
.role select { background: #2c3a4f; color: #fff; border: 1px solid #46566e; border-radius: 4px; padding: 3px 6px; }
.btn { padding: 5px 12px; border: 1px solid #46566e; background: #2c3a4f; color: #fff; border-radius: 4px; cursor: pointer; font-size: 12px; }
.btn.primary { background: #2f6fd0; border-color: #2f6fd0; }
.btn.ok { background: #2e8b57; border-color: #2e8b57; }
.btn.warn { background: #b03a3a; border-color: #b03a3a; }
.btn.pub { background: #7a4fb5; border-color: #7a4fb5; }
.btn.ghost { background: transparent; }
.btn:disabled { opacity: .45; cursor: not-allowed; }

.main { flex: 1; display: flex; min-height: 0; }
.left { width: 250px; padding: 12px; overflow-y: auto; background: #f6f8fa; border-right: 1px solid #e0e4e9;
  display: flex; flex-direction: column; gap: 14px; }
.center { flex: 1; padding: 12px; overflow-y: auto; min-width: 0; }
.right { width: 300px; padding: 12px; overflow-y: auto; background: #f6f8fa; border-left: 1px solid #e0e4e9; }
.tabs { display: flex; gap: 4px; margin-bottom: 10px; }
.tabs button { flex: 1; padding: 5px; border: 1px solid #d0d6dd; background: #fff; border-radius: 4px; cursor: pointer; font-size: 12px; }
.tabs button.on { background: #2f6fd0; color: #fff; border-color: #2f6fd0; }

.toast { position: fixed; left: 50%; bottom: 40px; transform: translateX(-50%);
  background: #222c; color: #fff; padding: 10px 22px; border-radius: 6px; font-size: 13px; z-index: 99;
  backdrop-filter: blur(4px); }
.fade-enter-active, .fade-leave-active { transition: opacity .3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
