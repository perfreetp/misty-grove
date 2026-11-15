const fs = require('fs');
const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');

const ROOT = path.resolve(__dirname, '..', 'scs-system');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

const virtualConsole = new VirtualConsole();
virtualConsole.sendTo(console);

const dom = new JSDOM(html, {
  url: 'http://localhost/',
  runScripts: 'outside-only',
  pretendToBeVisual: true,
  virtualConsole
});
const { window } = dom;

// stubs
window.confirm = () => true;
window.prompt = () => '测试备注';
window.URL.createObjectURL = () => 'blob:mock';
window.URL.revokeObjectURL = () => {};
window.XMLSerializer = window.XMLSerializer; // jsdom has it

// load vue + app in page context
const vueSrc = fs.readFileSync(path.join(ROOT, 'vendor', 'vue.global.prod.js'), 'utf8');
const appSrc = fs.readFileSync(path.join(ROOT, 'js', 'app.js'), 'utf8');
try {
  window.eval(vueSrc);
  console.log('Vue typeof:', typeof window.Vue, window.Vue && window.Vue.version);
  window.eval(appSrc);
  console.log('app.js evaluated');
} catch (e) {
  console.error('EVAL/MOUNT ERROR:', e.message);
  process.exit(1);
}

const rootProxy = window.__scsApp;
if (!rootProxy) {
  console.error('MOUNT FAILED — window.__scsApp not set');
  process.exit(1);
}

function assert(cond, msg) {
  if (!cond) { console.error('FAIL: ' + msg); process.exitCode = 1; }
  else { console.log('ok: ' + msg); }
}

(async () => {
  const nextTick = () => new Promise(r => setTimeout(r, 0));
  await nextTick();

  const p = rootProxy;
  assert(p.db.patients.length === 0, '初始无患者');
  assert(p.tabs.length === 5, '五个模块标签');

  // 载入演示数据
  p.loadDemo();
  await nextTick();
  assert(p.db.patients.length === 2, '演示数据 2 名患者');
  assert(p.currentPatient && p.currentPatient.name === '张建国', '当前患者为张建国');
  assert(p.currentPatient.contacts.length === 8, '8触点布局生成');
  assert(p.db.patients[1].contacts.length === 16, '16触点布局生成');

  // 触点节段排布
  const ys = p.currentPatient.contacts.map(c => c.y);
  assert(Math.min(...ys) > 300 && Math.max(...ys) < 600, '触点按T8-T10节段范围排布 y=' + Math.min(...ys) + '~' + Math.max(...ys));

  // 总电流限制
  p.role = 'technician';
  const cs = p.currentPatient.contacts;
  cs.forEach(c => { c.polarity = 'cathode'; c.current = 0; });
  // 模拟滑块输入：前两个各60%，第二个应被拦截到40
  p.onCurrentInput(cs[0], { target: { value: 60 } });
  p.onCurrentInput(cs[1], { target: { value: 60 } });
  assert(cs[0].current === 60 && cs[1].current === 40, `总电流超限拦截 60+${cs[1].current}=${p.totalCurrent}`);
  assert(p.blockFlash === true, '超限拦截提示已触发');

  // 极性循环
  cs[2].polarity = 'off';
  p.cyclePolarity(cs[2]);
  assert(cs[2].polarity === 'cathode', '极性切换 off→cathode');

  // 覆盖模拟
  p.tab = 'coverage';
  await nextTick();
  const rate = p.overlapRate;
  assert(rate !== null && rate >= 0 && rate <= 100, '重合率计算: ' + rate + '%');
  // 疼痛区标记
  const before = p.currentPatient.painRegions.length;
  p.togglePain('L2');
  assert(p.currentPatient.painRegions.length === before + 1, '点击皮节带标记疼痛区');
  p.togglePain('L2');
  assert(p.currentPatient.painRegions.length === before, '再次点击取消标记');

  // 程序组保存/调入
  p.saveProgram('B');
  assert(p.currentPatient.programs.B && p.currentPatient.programs.B.contacts.length === 8, '程序B已保存(含触点与覆盖图参数)');
  cs[0].current = 10;
  p.loadProgram('B');
  assert(p.currentPatient.contacts[0].current === 60, '调入程序B恢复触点参数');

  // 程控记录
  p.tab = 'records';
  p.recForm.technician = '测试技师';
  p.recForm.impedances = { 1: 800, 2: 900 };
  p.saveRecord('implemented');
  const recs = p.patientRecords;
  assert(recs.length === 3, '新增程控单成功，共' + recs.length + '条');
  const newRec = recs[recs.length - 1];
  assert(newRec.status === 'implemented', '新程控单状态=已实施');

  // 复核/退回流程
  p.role = 'physician';
  p.setStatus(newRec, 'reviewed');
  assert(newRec.status === 'reviewed' && newRec.reviewer === '王立新', '医师复核通过');
  const rec2 = recs[1];
  p.returnRecord(rec2);
  assert(rec2.status === 'returned' && rec2.reviewComment === '测试备注', '复核退回并写意见');
  p.role = 'technician';
  p.setStatus(rec2, 'implemented');
  assert(rec2.status === 'implemented', '退回后重新提交');

  // 阻抗异常标红（先把触点全关掉，使覆盖率较上次掉 >20%）
  p.currentPatient.contacts.forEach(c => { c.current = 0; });
  p.recForm.impedances = { 1: 3200 };
  p.recForm.technician = 'T';
  p.saveRecord('draft');
  const badRec = p.patientRecords[p.patientRecords.length - 1];
  const flags = p.recordFlags(badRec);
  assert(flags.some(f => f.includes('阻抗超出正常范围')), '阻抗异常标红: ' + flags.join(';'));
  assert(flags.some(f => f.includes('覆盖率变化')), '覆盖率变化>20%标红: ' + flags.join(';'));

  // 对比图数据
  assert(p.chartDots.length === p.patientRecords.length, '对比图数据点生成');

  // 随访
  p.tab = 'followup';
  p.role = 'nurse';
  p.fuForm.vas = 3;
  p.saveFollowup();
  assert(p.patientFollowups.length === 3, '护士录入随访成功');
  assert(p.vasDropPct(p.patientFollowups[0]) !== null, 'VAS较术前下降百分比计算');
  assert(p.vasTrend.length > 3, 'VAS趋势数据合并(术前+程控+随访)');

  // 医师统计
  const stats = p.physicianStats;
  assert(stats.length === 2, '医师统计分组: ' + stats.map(s => s.physician + '(' + s.n + ')').join(','));
  const w = stats.find(s => s.physician === '王立新');
  assert(w && w.avgBaseline === '8.0' && parseFloat(w.avgLatest) < 8, '王立新医师 VAS 下降统计: ' + w.avgBaseline + '→' + w.avgLatest + ' (-' + w.avgDropPct + '%)');

  // 角色权限
  p.role = 'nurse';
  assert(p.canProgram === false && p.canReview === false && p.canFollowup === true, '护士权限: 可随访不可程控');
  p.role = 'technician';
  assert(p.canProgram === true && p.canReview === false, '技师权限: 可程控不可复核');

  // localStorage 持久化
  await nextTick();
  const saved = JSON.parse(window.localStorage.getItem('scs_db_v1'));
  assert(saved && saved.patients.length === 2 && saved.records.length >= 4, 'localStorage 持久化');

  // 模板渲染检查：五个模块都能渲染无报错
  for (const t of ['register', 'electrode', 'coverage', 'records', 'followup']) {
    p.tab = t;
    await nextTick();
    assert(window.document.querySelector('main section') !== null, '模块渲染: ' + t);
  }

  console.log(process.exitCode ? '\n=== 存在失败项 ===' : '\n=== 全部通过 ===');
})().catch(e => { console.error('RUNTIME ERROR:', e); process.exitCode = 1; });
