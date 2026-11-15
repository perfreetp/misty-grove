// 审核流与交付物端到端测试（Node 环境，polyfill localStorage）
export {};
const mem = new Map<string, string>();
(globalThis as Record<string, unknown>).localStorage = {
  getItem: (k: string) => (mem.has(k) ? mem.get(k)! : null),
  setItem: (k: string, v: string) => void mem.set(k, v),
  removeItem: (k: string) => void mem.delete(k),
  clear: () => mem.clear(),
};

const { useStore } = await import('../store');
const { briefingSvg, componentListCsv, steelStatistics, statusLabel } = await import('./deliverables');
const { runChecks } = await import('./engine');

let passed = 0;
const ok = (name: string, cond: boolean) => {
  if (!cond) throw new Error(`FAIL: ${name}`);
  passed++;
  console.log(`  ✓ ${name}`);
};

const store = useStore();
const [schemeA, schemeB] = store.state.schemes;

// 1. 方案B 净空 4.8m 存在强制错误 → 禁止提交
ok('方案B 存在强制错误', store.blocked(schemeB));
const r1 = store.submit(schemeB.id);
ok('方案B 提交被拦截', !r1.ok && /禁止提交/.test(r1.reason ?? ''));
ok('被拦截后状态仍为草稿', schemeB.status === 'draft');

// 2. 方案A 无强制错误 → 提交成功
const r2 = store.submit(schemeA.id);
ok('方案A 提交成功', r2.ok && schemeA.status === 'submitted');
ok('提交历史已记录', schemeA.history[schemeA.history.length - 1]?.action === 'submit');

// 3. 退回：意见挂靠左桥台
const pierId = schemeA.piers[0].id;
store.returnScheme(schemeA.id, '桥台位置侵占视距三角区，请外移', pierId);
ok('退回后状态=returned', schemeA.status === 'returned');
ok('退回意见已生成并挂靠构件', schemeA.comments[0]?.componentId === pierId);
ok('意见含审核人与日期', !!schemeA.comments[0].reviewer && /^\d{4}-\d{2}-\d{2}$/.test(schemeA.comments[0].date));

// 4. 标记整改
store.resolveComment(schemeA.id, schemeA.comments[0].id);
ok('意见可标记整改', schemeA.comments[0].resolved === true);

// 5. 重新提交后审定通过
store.submit(schemeA.id);
ok('整改后可重新提交', schemeA.status === 'submitted');
store.approve(schemeA.id);
ok('审定通过状态正确', schemeA.status === 'approved');
ok('审定人与日期已记录', schemeA.approver === store.state.reviewer && /^\d{4}-\d{2}-\d{2}$/.test(schemeA.approvalDate));
ok('通过方案自动标为选定', schemeA.preferred === true);
ok('其余方案取消选定', schemeB.preferred === false);

// 6. 审定后改几何参数 → 回到草稿，防止带病交付
store.patch(schemeA.id, 'girderBottomElev', schemeA.roadElevation + 5.3);
ok('关键几何变更后回到草稿', schemeA.status === 'draft');
// 恢复可提交状态
store.patch(schemeA.id, 'girderBottomElev', schemeA.roadElevation + 5.2);
store.submit(schemeA.id);
store.approve(schemeA.id);

// 7. 持久化：重新从 localStorage 载入的数据结构完整
const raw = JSON.parse(mem.get('footbridge-schemes-v1')!);
ok('localStorage 已持久化方案', raw.schemes.length === 2 && raw.reviewer === store.state.reviewer);

// 8. 交付物：交底图 SVG
const svg = briefingSvg(schemeA);
ok('交底图为合法 SVG', svg.startsWith('<svg') && svg.includes('</svg>'));
ok('交底图含净空标注', svg.includes('净空 5.20m'));
ok('交底图含审定人与日期', svg.includes(schemeA.approver) && svg.includes(schemeA.approvalDate));
ok('交底图含桥跨尺寸', svg.includes('桥跨总长 46m'));

// 9. 构件清单 CSV
const csv = componentListCsv(schemeA);
ok('清单含主梁/桥墩/梯道行', csv.includes('主梁') && csv.includes('左桥台') && csv.includes('梯道'));
ok('清单含审定信息与钢材汇总', csv.includes('审定人') && csv.includes('钢材用量(t)'));

// 10. 各方案钢材统计
const stats = steelStatistics(store.state.schemes);
ok('钢材统计覆盖全部方案', stats.length === 2);
ok('每行钢材合计=型钢+钢筋+附属', stats.every((r) => Math.abs(r.total - (r.girderSteel + r.rebar + r.approachSteel)) < 0.011));
ok('钢材总计为正', stats.reduce((a, r) => a + r.total, 0) > 50);

// 11. 复制方案产生独立 id 且重置审核状态
store.duplicateScheme(schemeA.id);
const copy = store.state.schemes[store.state.schemes.length - 1];
ok('副本独立 id', copy.id !== schemeA.id);
ok('副本审核状态重置为草稿', copy.status === 'draft' && copy.comments.length === 0);
ok('副本构件 id 已重新生成', copy.piers[0].id !== schemeA.piers[0].id);

// 12. 状态标签
ok('状态标签中文映射', statusLabel('approved') === '已通过' && statusLabel('returned') === '已退回');

// 13. 新增空方案默认无强制错误
store.addScheme();
const fresh = store.state.schemes[store.state.schemes.length - 1];
ok('新建方案默认通过强制校核', !store.blocked(fresh));
ok('新建方案校核可运行', Array.isArray(runChecks(fresh)));

console.log(`\n全部 ${passed} 项审核流/交付物测试通过`);
