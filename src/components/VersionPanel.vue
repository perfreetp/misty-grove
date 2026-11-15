<template>
  <div class="vers">
    <h3>版本历史</h3>
    <div v-for="item in list" :key="item.v.n" class="ver" :class="{cur: item.i === scheme.versions.length - 1}">
      <div class="ver-head">
        <b>V{{ item.v.n }}</b>
        <span class="st" :class="item.v.status">{{ STATUS_TEXT[item.v.status] }}</span>
        <span class="time">{{ fmtTime(item.v.createdAt) }}</span>
      </div>
      <div class="ver-sub">构件 {{ item.v.components.length }} 个 · 意见 {{ item.v.comments.length }} 条</div>
      <div class="ver-sub" v-if="item.v.approvedAt">批复于 {{ fmtTime(item.v.approvedAt) }}</div>
      <button v-if="item.i !== scheme.versions.length - 1 && store.viewing !== item.i" class="lnk" @click="store.viewing = item.i">查看该版</button>
      <button v-if="store.viewing === item.i" class="lnk" @click="store.viewing = null">返回当前版</button>
    </div>
    <p class="tip">被退回的版本自动封存保留，修改在新版本上进行。</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { store, STATUS_TEXT, fmtTime } from '../store.js'

const scheme = computed(() => store.scheme)
const list = computed(() => store.scheme.versions.map((v, i) => ({ v, i })).reverse())
</script>

<style scoped>
.vers h3 { margin: 0 0 8px; font-size: 14px; }
.ver { border: 1px solid #e0e4e9; border-radius: 6px; padding: 6px 8px; margin-bottom: 6px; background: #fff; }
.ver.cur { border-color: #2f6fd0; }
.ver-head { display: flex; gap: 8px; align-items: center; font-size: 13px; }
.st { font-size: 11px; padding: 1px 6px; border-radius: 8px; background: #eef0f3; }
.st.review { background: #fff0d0; color: #8a6d00; }
.st.approved { background: #dcf3e3; color: #1c7a3d; }
.st.returned { background: #fde8e8; color: #c02020; }
.time { margin-left: auto; font-size: 11px; color: #99a; }
.ver-sub { font-size: 11px; color: #778; margin-top: 2px; }
.lnk { background: none; border: none; color: #2f6fd0; font-size: 12px; cursor: pointer; padding: 2px 0; }
.tip { font-size: 11px; color: #889; }
</style>
