<script setup>
import { computed, ref, watchEffect, nextTick } from 'vue'
import { store, sectionOf, pushHistory, STATUS } from '../store'
import { analyze, fmtStake } from '../rules'
import { drawPlan } from '../render'

const FRAME_LEN = 500 // 每幅封道图覆盖 500m
const FRAME_SCALE = 1.4

const expanded = ref(null)
const frameCvs = ref([])

const approved = computed(() => store.plans.filter(p => p.status === '已通过'))

function stage(p) {
  const sec = sectionOf(p)
  const today = new Date().toISOString().slice(0, 10)
  if (p.removed) return { text: '已撤除', cls: 'badge-draft' }
  if (today < sec.period.start) return { text: '待实施', cls: 'badge-reviewing' }
  if (today <= p.removeDate) return { text: '实施中', cls: 'badge-approved' }
  return { text: '超期未撤除', cls: 'badge-returned' }
}

function framesOf(p) {
  const sec = sectionOf(p)
  const frames = []
  for (let s = sec.kStart; s < sec.kEnd; s += FRAME_LEN) {
    frames.push([s, Math.min(s + FRAME_LEN, sec.kEnd)])
  }
  return frames
}

function toggle(p) {
  expanded.value = expanded.value === p.id ? null : p.id
}

watchEffect(async () => {
  if (!expanded.value) return
  const p = store.plans.find(x => x.id === expanded.value)
  if (!p) return
  await nextTick()
  const sec = sectionOf(p)
  const derived = analyze(sec, p)
  const frames = framesOf(p)
  frameCvs.value.forEach((c, i) => {
    if (!c || !frames[i]) return
    drawPlan(c.getContext('2d'), sec, p, {
      scale: FRAME_SCALE,
      win: frames[i],
      derived,
      frameTitle: `${p.version} 分幅封道图 第${i + 1}幅 ${fmtStake(frames[i][0])}~${fmtStake(frames[i][1])}`
    })
  })
}, { flush: 'post' })

function exportPng(p) {
  const sec = sectionOf(p)
  const derived = analyze(sec, p)
  const scale = 0.5
  const c = document.createElement('canvas')
  c.width = Math.ceil((sec.kEnd - sec.kStart) * scale) + 88
  c.height = sec.lanes * 34 + 24 + 50 + 46
  const ctx = c.getContext('2d')
  drawPlan(ctx, sec, p, { scale, derived, frameTitle: `${p.name} (${p.version})` })
  c.toBlob(b => {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(b)
    a.download = `渠化图_${p.version || p.name}.png`
    a.click()
    URL.revokeObjectURL(a.href)
  })
}

function exportCsv(p) {
  const sec = sectionOf(p)
  const { stats } = analyze(sec, p)
  const rows = [
    ['方案名称', p.name],
    ['所属路段', sec.name],
    ['桩号范围', `${fmtStake(sec.kStart)}~${fmtStake(sec.kEnd)}`],
    ['实施版本', p.version || '-'],
    ['施工工期', `${sec.period.start}~${sec.period.end}`],
    ['撤除日期', p.removeDate || '-'],
    [],
    ['设施名称', '规格', '数量', '单位'],
    ['锥桶', '-', stats.cone, '个'],
    ['水马', '-', stats.barrier, '个'],
    ['施工围挡', '-', stats.fence, '块'],
    ['限速标志', '120km/h', stats.sign120, '块'],
    ['限速标志', '100km/h', stats.sign100, '块'],
    ['限速标志', '80km/h', stats.sign80, '块']
  ]
  const csv = '﻿' + rows.map(r => r.join(',')).join('\r\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  a.download = `设施数量清单_${p.version || p.name}.csv`
  a.click()
  URL.revokeObjectURL(a.href)
}

function confirmRemove(p) {
  if (confirm(`确认「${p.name}」现场设施已全部撤除?`)) {
    p.removed = true
    pushHistory(p, store.role, '确认撤除', `撤除日期 ${p.removeDate}`)
  }
}
</script>

<template>
  <div class="panel">
    <h2>实施台账 <span class="muted">联审通过的方案自动生成实施版本与撤除日期;监控中心分幅封道图与现场一致</span></h2>
    <p v-if="!approved.length" class="empty">暂无已通过联审的方案</p>
    <table v-else class="grid">
      <thead>
        <tr>
          <th>实施版本</th><th>方案名称</th><th>路段</th><th>施工工期</th>
          <th>撤除日期</th><th>阶段</th><th>操作</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="p in approved" :key="p.id">
          <tr>
            <td><b>{{ p.version }}</b></td>
            <td>{{ p.name }}</td>
            <td>{{ sectionOf(p)?.name }}</td>
            <td style="white-space:nowrap">{{ sectionOf(p)?.period.start }} ~ {{ sectionOf(p)?.period.end }}</td>
            <td>{{ p.removeDate }}</td>
            <td><span class="badge" :class="stage(p).cls">{{ stage(p).text }}</span></td>
            <td style="white-space:nowrap">
              <button class="primary" @click="toggle(p)">{{ expanded === p.id ? '收起' : '分幅封道图' }}</button>
              <button style="margin:0 4px" @click="exportPng(p)">导出渠化图</button>
              <button style="margin-right:4px" @click="exportCsv(p)">导出数量清单</button>
              <button v-if="!p.removed" class="danger" @click="confirmRemove(p)">确认撤除</button>
            </td>
          </tr>
          <tr v-if="expanded === p.id">
            <td colspan="7" style="background:#f7f9fb">
              <div class="muted" style="margin-bottom:6px">
                监控中心视图 · 与现场布设一致 · 每幅 {{ FRAME_LEN }}m · 红色底纹为封闭车道,黄色底纹为渐变段
              </div>
              <div v-for="(f, i) in framesOf(p)" :key="i" style="overflow-x:auto;margin-bottom:10px;border:1px solid #d5dbe3;border-radius:6px">
                <canvas :ref="el => frameCvs[i] = el"
                  :width="Math.ceil(64 + (f[1] - f[0]) * FRAME_SCALE + 24)"
                  :height="sectionOf(p).lanes * 34 + 24 + 50 + 46"></canvas>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
