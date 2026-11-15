<template>
  <div class="delivery">
    <div v-for="[tunnel, list] in tunnelGroups" :key="tunnel" class="panel pkg">
      <div class="pkg-head">
        <h3>🚇 {{ tunnel }} <span class="muted">交付包({{ list.length }} 个洞口方案)</span></h3>
        <div class="pkg-actions">
          <button
            v-if="canDeliver(tunnel, list)"
            class="ok"
            @click="onDeliver(tunnel, list)"
          >汇总交付(锁定并导出交付包)</button>
          <button
            v-else-if="list.every((s) => s.status === 'delivered')"
            class="ghost"
            @click="onReexport(tunnel, list)"
          >重新导出交付包</button>
          <span v-else class="muted">待全部洞口方案审核通过后可交付</span>
        </div>
      </div>

      <table class="grid-table">
        <thead>
          <tr>
            <th>洞口</th><th>桩号</th><th>朝向</th><th>棚长/间距</th><th>阈值</th>
            <th>状态流转</th><th>返工</th><th>校核</th><th>导出</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in list" :key="s.id">
            <td>{{ s.current.params.portalName }}</td>
            <td>{{ s.current.params.stake }}</td>
            <td>{{ s.current.params.orientation }}°</td>
            <td>{{ s.current.params.canopyLength }}m / {{ s.current.params.grilleSpacing }}m</td>
            <td>{{ s.current.params.thresholdPct }}%</td>
            <td>
              <div class="flow">
                <template v-for="(st, i) in flowOf(s)" :key="st">
                  <span class="badge" :class="st">{{ STATUS_NAMES[st] }}</span>
                  <span v-if="i < flowOf(s).length - 1" class="arrow">→</span>
                </template>
              </div>
            </td>
            <td>{{ s.reworkCount }} 次</td>
            <td>
              <span v-if="s.current.result" :class="s.current.result.pass ? 'tag-ok' : 'tag-red'">
                {{ s.current.result.pass ? '通过' : '未通过' }}
              </span>
              <span v-else class="muted">未仿真</span>
            </td>
            <td class="exports">
              <template v-if="s.locked">
                <button class="ghost" @click="exportLampLayout(s)">路灯布置表</button>
                <button class="ghost" @click="exportGrilleBOM(s)">格栅材料清单</button>
                <button class="ghost" @click="exportCheckReport(s)">照度校核报告</button>
              </template>
              <span v-else class="muted">通过后锁定可导出</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-if="!tunnelGroups.length" class="panel muted">暂无方案数据。</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { STATUS_NAMES } from '../types'
import type { Scheme, SchemeStatus } from '../types'
import { deliverPackage, schemesByTunnel, store } from '../store/schemes'
import {
  exportCheckReport, exportDeliveryPackage, exportGrilleBOM, exportLampLayout
} from '../utils/exporters'

const tunnelGroups = computed(() => [...schemesByTunnel().entries()])

function canDeliver(_tunnel: string, list: Scheme[]): boolean {
  return list.length > 0 && list.every((s) => s.status === 'approved')
}

function flowOf(s: Scheme): SchemeStatus[] {
  // 按审计日志还原该方案实际走过的状态路径
  const path: SchemeStatus[] = ['draft']
  for (const a of s.audit) {
    if (a.action === '提交审核') path.push('pending')
    else if (a.action === '退回方案') path.push('returned')
    else if (a.action === '审核通过') path.push('approved')
    else if (a.action === '方案交付') path.push('delivered')
  }
  return path
}

function onDeliver(tunnel: string, list: Scheme[]): void {
  deliverPackage(tunnel, list.map((s) => s.id))
  exportDeliveryPackage(tunnel, store.schemes.filter((s) => list.some((l) => l.id === s.id)))
}

function onReexport(tunnel: string, list: Scheme[]): void {
  exportDeliveryPackage(tunnel, list)
}
</script>

<style scoped>
.delivery { display: flex; flex-direction: column; gap: 14px; }
.pkg-head { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; }
.pkg-actions { display: flex; align-items: center; gap: 8px; }
.flow { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; }
.arrow { color: var(--text-dim); font-size: 11px; }
.exports { white-space: nowrap; }
.exports button { margin: 2px 4px 2px 0; padding: 3px 8px; font-size: 12px; }
</style>
