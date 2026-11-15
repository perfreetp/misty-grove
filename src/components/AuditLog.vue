<template>
  <div class="panel-inner audit">
    <h4>操作记录(操作人 / 时间)</h4>
    <table class="grid-table">
      <thead><tr><th>时间</th><th>操作人</th><th>角色</th><th>操作</th><th>详情</th></tr></thead>
      <tbody>
        <tr v-for="(a, i) in [...scheme.audit].reverse()" :key="i">
          <td>{{ a.time }}</td>
          <td>{{ a.operator }}</td>
          <td>{{ ROLE_NAMES[a.role] }}</td>
          <td>{{ a.action }}</td>
          <td class="muted">{{ a.detail ?? '' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ROLE_NAMES } from '../types'
import type { Scheme } from '../types'

defineProps<{ scheme: Scheme }>()
</script>

<style scoped>
.audit { background: var(--panel-2); border-radius: 8px; padding: 10px; margin-top: 12px; }
.audit h4 { margin: 0 0 8px; font-size: 13px; }
</style>
