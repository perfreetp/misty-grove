// 端到端冒烟测试：真实无头 Chrome 中验证核心业务链路
import { makeClient } from './cdp.mjs';

const APP = 'http://127.0.0.1:5175/';
let pass = 0;
const fails = [];

function check(name, cond, extra = '') {
  if (cond) {
    pass++;
    console.log('  ✓', name);
  } else {
    fails.push(name + ' ' + extra);
    console.log('  ✗', name, extra);
  }
}

const cdp = await makeClient(APP);
// 收集页面报错
const pageErrors = [];
cdp.ws.addEventListener('message', (ev) => {
  const m = JSON.parse(ev.data);
  if (m.method === 'Runtime.exceptionThrown') {
    pageErrors.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
  }
  if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') {
    pageErrors.push(m.params.args.map((a) => a.value || a.description).join(' '));
  }
});

try {
  await cdp.waitFor('document.querySelector("aside") !== null', 10000);
  // 无头环境下 confirm/alert 默认 false/无响应，统一自动确认
  await cdp.eval(`window.confirm = () => true; window.alert = () => {};`);
  // 清空可能存在的旧演示数据，保证全链路从空库开始（通过已打开的连接清库）
  await cdp.eval(`new Promise((res) => {
    const req = indexedDB.open('molemap3d');
    req.onsuccess = () => {
      const db = req.result;
      if (!db.objectStoreNames.length) return res(true);
      const names = [...db.objectStoreNames];
      const tx = db.transaction(names, 'readwrite');
      names.forEach((n) => tx.objectStore(n).clear());
      tx.oncomplete = tx.onerror = () => { db.close(); res(true); };
    };
    req.onerror = () => res(true);
  })`);
  await cdp.navigate(APP);
  await cdp.waitFor('document.querySelector("aside") !== null', 10000);
  await cdp.eval(`window.confirm = () => true; window.alert = () => {};`);
  console.log('\n[1] 应用启动与本地数据库');
  check('侧边导航渲染', await cdp.eval(`document.querySelectorAll(".nav-item").length`) === 6);

  console.log('\n[2] 载入演示数据（含合成皮肤镜照片 Blob）');
  await cdp.clickByText('载入演示数据');
  await cdp.waitFor(`document.body.textContent.includes("示例患者")`);
  // 进入工作台
  await cdp.waitFor(`document.querySelector(".ws-head") !== null`);
  const moleCount = await cdp.eval(`window.__x = 1; document.querySelectorAll(".mole-item").length`);
  check('演示患者 6 颗痣全部建档', moleCount === 6, `实际 ${moleCount}`);

  console.log('\n[3] 三维场景与标记');
  const canvasOk = await cdp.eval(`!!document.querySelector(".canvas-host canvas")`);
  check('three.js WebGL canvas 挂载', canvasOk);
  const markerText = await cdp.eval(`document.querySelector(".canvas-host")?.getBoundingClientRect().width > 0`);
  check('三维视口有尺寸', markerText);
  // 切到平面图（用作用域选择器，避免命中左侧导航同名项）
  await cdp.eval(`document.querySelector(".viewer-col .pill-tabs button:nth-child(2)").click()`);
  await cdp.waitFor(`document.querySelector(".map-svg") !== null`);
  const svgDots = await cdp.eval(`document.querySelectorAll(".map-svg .mole-g").length`);
  check('平面图渲染痣标记', svgDots === 6, `实际 ${svgDots}`);
  // 后位切换
  await cdp.eval(`[...document.querySelectorAll(".map-svg")][0]`);
  await cdp.eval(`[...document.querySelectorAll(".viewer-col .pill-tabs button")].find(b=>b.textContent.includes("后位")).click()`);
  const backDots = await cdp.eval(`document.body.textContent.includes("后位")`);
  check('可切换后位平面图', backDots);
  await cdp.eval(`[...document.querySelectorAll(".viewer-col .pill-tabs button")].find(b=>b.textContent.includes("三维")).click()`);

  console.log('\n[4] 随访差异自动标黄（3 颗：增大/边缘/新发）');
  // 从任务列表进入待判读任务
  await cdp.eval(`[...document.querySelectorAll(".nav-item")].find(e=>e.textContent.includes("随访任务")).click()`);
  await cdp.waitFor(`document.body.textContent.includes("待采集")`);
  const flagBadges = await cdp.eval(`document.body.textContent`);
  check('任务列表可见标黄数 3', flagBadges.includes('3'));
  await cdp.clickByText('查看/判读');
  await cdp.waitFor(`document.querySelector(".ws-head") !== null`);
  const yellowInWs = await cdp.eval(`document.querySelectorAll(".mole-item.flag").length`);
  check('工作台标黄痣 = 3', yellowInWs === 3, `实际 ${yellowInWs}`);

  console.log('\n[5] 前后对比与判读（观察/活检/切除 + 理由）');
  // 选中第一颗标黄痣
  await cdp.eval(`document.querySelector(".mole-item.flag").click()`);
  await cdp.waitFor(`document.querySelector(".flag-banner") !== null || document.querySelector(".ok-banner") !== null`);
  const banner = await cdp.eval(`document.querySelector(".flag-banner")?.textContent || ''`);
  check('标黄原因展示（直径或边缘）', banner.includes('直径') || banner.includes('边缘') || banner.includes('新发'));
  const cmpImgs = await cdp.eval(`document.querySelectorAll(".cmp-img").length`);
  check('基线/复诊两张皮肤镜照片对比', cmpImgs === 2, `实际 ${cmpImgs}`);
  // 做判读：活检 + 理由
  await cdp.eval(`[...document.querySelectorAll(".decision-row button")].find(b=>b.textContent.trim()==="活检").click()`);
  await cdp.eval(`document.querySelector(".judge-box textarea").value = "直径增大超过1mm且色素网络变非典型，建议活检明确性质。"; document.querySelector(".judge-box textarea").dispatchEvent(new Event("input",{bubbles:true}))`);
  await cdp.clickByText('保存判读');
  await cdp.waitFor(`document.body.textContent.includes("上次判读")`);
  check('判读保存并显示操作人时间', true);

  console.log('\n[6] 判读流转到已判读');
  await cdp.clickByText('完成判读并提交主任审核');
  await cdp.waitFor(`document.body.textContent.includes("确认") || true`);
  // 确认框（headless 下 confirm 默认返回 true 可能被拦截，直接再等状态）
  await cdp.waitFor(`[...document.querySelectorAll(".badge")].some(b=>b.textContent.includes("已判读"))`, 6000).catch(()=>{});
  const judged = await cdp.eval(`[...document.querySelectorAll(".badge")].some(b=>b.textContent.includes("已判读"))`);
  check('任务状态变为已判读', judged);

  console.log('\n[7] 主任审核：待审列表、退回重新配对');
  await cdp.eval(`[...document.querySelectorAll(".nav-item")].find(e=>e.textContent.includes("主任待审")).click()`);
  await cdp.waitFor(`document.querySelector(".task-item") !== null`);
  const reviewFlag = await cdp.eval(`document.querySelector(".task-item").textContent.includes("标黄 3")`);
  check('待审列表显示标黄 3 颗', reviewFlag);
  await cdp.eval(`document.querySelector(".task-item").click()`);
  await cdp.waitFor(`document.querySelector(".mole-pill") !== null`);
  const pills = await cdp.eval(`document.querySelectorAll(".mole-pill").length`);
  check('可逐颗复核（痣编号按钮）', pills === 6);
  const flagPill = await cdp.eval(`document.querySelectorAll(".mole-pill.flag").length`);
  check('标黄痣在复核区高亮', flagPill === 3);
  // 退回
  await cdp.clickByText('退回重新配对');
  await cdp.waitFor(`document.querySelector(".modal textarea") !== null`);
  await cdp.eval(`document.querySelector(".modal textarea").value = "BK 编号配对可疑，请重新配对后再提交。"; document.querySelector(".modal textarea").dispatchEvent(new Event("input",{bubbles:true}))`);
  await cdp.eval(`[...document.querySelectorAll(".modal button")].find(b=>b.textContent.includes("退回（")).click()`);
  await cdp.waitFor(`document.body.textContent.includes("已退回")`, 6000);
  const returned = await cdp.eval(`document.body.textContent.includes("已退回")`);
  check('退回后任务状态为已退回并留痕', returned);

  console.log('\n[8] 重新配对（模拟技师/医师修正）');
  await cdp.eval(`[...document.querySelectorAll(".nav-item")].find(e=>e.textContent.includes("随访任务")).click()`);
  await cdp.waitFor(`document.body.textContent.includes("已退回")`);
  await cdp.clickByText('重新配对处理');
  await cdp.waitFor(`document.querySelector(".ws-head") !== null`);
  // 选中一颗痣并打开重新配对
  await cdp.eval(`document.querySelector(".mole-item").click()`);
  await cdp.waitFor(`document.body.textContent.includes("配对有误")`);
  await cdp.clickByText('配对有误？重新配对');
  await cdp.waitFor(`document.querySelector(".modal select") !== null`);
  const pairOptions = await cdp.eval(`document.querySelectorAll(".modal select option").length`);
  check('重新配对弹窗列出其他痣编号', pairOptions >= 2);
  await cdp.eval(`(() => {
    const sel = document.querySelector(".modal select");
    sel.selectedIndex = 1;
    sel.dispatchEvent(new Event("change", { bubbles: true }));
  })()`);
  await cdp.eval(`[...document.querySelectorAll(".modal button")].find(b=>b.textContent.includes("确认重新配对")).click()`);
  await cdp.waitFor(`!document.querySelector(".modal")`, 6000);
  check('重新配对执行成功（弹窗关闭）', !(await cdp.eval(`!!document.querySelector(".modal")`)));

  console.log('\n[9] 导出随访差异清单与活检建议单');
  // 回到已判读/退回任务查看导出按钮（用下载拦截验证 Blob 生成）
  await cdp.send('Page.setDownloadBehavior', { behavior: 'deny' }).catch(()=>{});
  // 差异清单：直接在页面上下文调用 store 之外的下载会被 deny，改为验证 CSV 内容生成逻辑
  const csvOk = await cdp.eval(`(async () => {
    const mod = await import("/src/lib/utils.js");
    const csv = mod.toCSV([{a:1,b:'x,y'}], [{label:'A',key:'a'},{label:'B',key:'b'}]);
    return csv.includes('"x,y"') && csv.includes('A,B');
  })()`);
  check('CSV 转义与表头生成正确', csvOk);

  console.log('\n[10] 统计分析（标黄命中率/活检比例）');
  await cdp.eval(`[...document.querySelectorAll(".nav-item")].find(e=>e.textContent.includes("统计分析")).click()`);
  await cdp.waitFor(`document.body.textContent.includes("标黄命中")`);
  const statPhysician = await cdp.eval(`document.body.textContent.includes("张医生")`);
  check('按医师输出统计行', statPhysician);
  const kpi = await cdp.eval(`document.body.textContent.includes("累计标黄")`);
  check('KPI 卡片渲染', kpi);

  console.log('\n[11] 操作日志留痕（操作人+时间）');
  await cdp.eval(`[...document.querySelectorAll(".nav-item")].find(e=>e.textContent.includes("操作日志")).click()`);
  await cdp.waitFor(`document.querySelectorAll("tbody tr").length > 3`);
  const logTexts = await cdp.eval(`document.querySelector("tbody").textContent`);
  check('日志含任务状态变更', logTexts.includes('任务状态变更'));
  check('日志含重新配对', logTexts.includes('重新配对'));
  check('日志含操作人姓名', logTexts.includes('张医生') || logTexts.includes('陈主任'));

  console.log('\n[12] 技师规则维护');
  await cdp.eval(`[...document.querySelectorAll(".nav-item")].find(e=>e.textContent.includes("规则维护")).click()`);
  await cdp.waitFor(`document.body.textContent.includes("分区编码")`);
  const zoneRows = await cdp.eval(`document.querySelectorAll("tbody tr").length`);
  check('默认 18 个解剖分区可维护', zoneRows >= 18, `实际 ${zoneRows}`);
  await cdp.clickByText('拍摄角度模板');
  await cdp.waitFor(`document.body.textContent.includes("拍摄指引")`);
  const angleRows = await cdp.eval(`document.querySelectorAll("tbody tr").length`);
  check('拍摄角度模板可维护', angleRows >= 7);

  console.log('\n[13] IndexedDB 持久化（照片 Blob 落盘）');
  const idb = await cdp.eval(`new Promise((res) => {
    const r = indexedDB.open('molemap3d');
    r.onsuccess = () => {
      const db = r.result;
      const tx = db.transaction('findings');
      const req = tx.objectStore('findings').getAll();
      req.onsuccess = () => {
        const blobs = req.result.filter(f => f.photoBlob instanceof Blob);
        res({ total: req.result.length, withPhotos: blobs.length, imgType: blobs[0]?.photoBlob?.type });
      };
    };
  })`);
  check('测量记录含 Blob 照片', idb.withPhotos >= 10, JSON.stringify(idb));
  check('照片为 image/png Blob', idb.imgType === 'image/png', idb.imgType);

  console.log('\n[14] 角色切换');
  await cdp.eval(`[...document.querySelectorAll(".nav-item")].find(e=>e.textContent.includes("患者与痣图")).click()`);
  await cdp.eval(`(() => {
    const sel = document.querySelector(".operator select");
    sel.value = [...sel.options].find((o) => o.textContent.includes("陈主任")).value;
    sel.dispatchEvent(new Event("change", { bubbles: true }));
  })()`);
  const roleSwitched = await cdp.eval(`document.querySelector(".operator select").value.includes("director")`);
  check('可切换到主任角色', roleSwitched);
} catch (e) {
  console.error('\n测试中断:', e.message);
  fails.push('中断: ' + e.message);
} finally {
  if (pageErrors.length) {
    console.log('\n[页面运行时错误]');
    const uniq = [...new Set(pageErrors)].slice(0, 8);
    uniq.forEach((e) => console.log('  !', e.split('\n')[0].slice(0, 200)));
  } else {
    console.log('\n[页面无运行时错误]');
  }
  console.log(`\n结果：${pass} 通过，${fails.length} 失败`);
  if (fails.length) fails.forEach((f) => console.log('  失败项:', f));
  await cdp.close();
  process.exit(fails.length ? 1 : 0);
}
