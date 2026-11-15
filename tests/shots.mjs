import { makeClient } from './cdp.mjs';
import fs from 'fs';

const APP = 'http://127.0.0.1:5175/';
const cdp = await makeClient(APP);
await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await cdp.waitFor('document.querySelector("aside")');
await cdp.eval(`window.confirm=()=>true;window.alert=()=>{};`);
// 清库
await cdp.eval(`new Promise((res) => {
  const req = indexedDB.open('molemap3d');
  req.onsuccess = () => { const db=req.result; const names=[...db.objectStoreNames];
    const tx=db.transaction(names,'readwrite'); names.forEach(n=>tx.objectStore(n).clear());
    tx.oncomplete=tx.onerror=()=>{db.close();res(true);} };
})`);
await cdp.navigate(APP);
await cdp.waitFor('document.querySelector("aside")');
await cdp.eval(`window.confirm=()=>true;window.alert=()=>{};`);

const shot = async (name) => {
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`tests/shots/${name}.png`, Buffer.from(data, 'base64'));
  console.log('saved', name);
};
fs.mkdirSync('tests/shots', { recursive: true });

// 患者列表
await shot('01-patients-empty');
// 演示数据 + 三维工作台
await cdp.clickByText('载入演示数据');
await cdp.waitFor('document.querySelector(".canvas-host canvas")');
await new Promise((r) => setTimeout(r, 1200));
await shot('02-workspace-3d');
// 平面图
await cdp.eval(`document.querySelector('.viewer-col .pill-tabs button:nth-child(2)').click()`);
await cdp.waitFor('document.querySelector(".map-svg")');
await new Promise((r) => setTimeout(r, 400));
await shot('03-flat-map');
// 判读视图 + 选中标黄痣对比
await cdp.eval(`document.querySelector('.viewer-col .pill-tabs button:nth-child(1)').click()`);
await cdp.eval(`[...document.querySelectorAll('.nav-item')].find(e=>e.textContent.includes('随访任务')).click()`);
await cdp.waitFor('document.body.textContent.includes("查看/判读")');
await cdp.clickByText('查看/判读');
await cdp.waitFor('document.querySelector(".mole-item.flag")');
await cdp.eval(`document.querySelector('.mole-item.flag').click()`);
await cdp.waitFor('document.querySelector(".flag-banner") || document.querySelector(".ok-banner")');
await new Promise((r) => setTimeout(r, 500));
await shot('04-read-compare');
// 主任待审：先把所有有复诊记录的痣判读并提交，任务进入已判读
await cdp.eval(`[...document.querySelectorAll('.mole-item')].forEach((b) => b.click())`);
// 逐颗判读（等待异步渲染，用循环点保存）
await cdp.eval(`(async () => {
  const items = [...document.querySelectorAll('.mole-item')];
  for (const it of items) {
    it.click();
    await new Promise((r) => setTimeout(r, 120));
    const ta = document.querySelector('.judge-box textarea');
    if (!ta) continue;
    ta.value = '结合直径、边缘与色素网络变化的判读理由。';
    ta.dispatchEvent(new Event('input', { bubbles: true }));
    const save = [...document.querySelectorAll('.judge-box button')].find((b) => b.textContent.includes('保存判读') || b.textContent.includes('更新判读'));
    if (save) save.click();
    await new Promise((r) => setTimeout(r, 120));
  }
})()`);
await new Promise((r) => setTimeout(r, 500));
await cdp.clickByText('完成判读并提交主任审核');
await new Promise((r) => setTimeout(r, 600));
// 主任待审
await cdp.eval(`[...document.querySelectorAll('.nav-item')].find(e=>e.textContent.includes('主任待审')).click()`);
await cdp.waitFor('document.querySelector(".task-item")');
await cdp.eval(`document.querySelector('.task-item').click()`);
await cdp.waitFor('document.querySelector(".mole-pill")');
await new Promise((r) => setTimeout(r, 400));
await shot('05-review');
// 统计
await cdp.eval(`[...document.querySelectorAll('.nav-item')].find(e=>e.textContent.includes('统计分析')).click()`);
await cdp.waitFor('document.body.textContent.includes("标黄命中")');
await shot('06-stats');
// 规则维护
await cdp.eval(`[...document.querySelectorAll('.nav-item')].find(e=>e.textContent.includes('规则维护')).click()`);
await cdp.waitFor('document.body.textContent.includes("分区编码")');
await shot('07-settings');
// 操作日志
await cdp.eval(`[...document.querySelectorAll('.nav-item')].find(e=>e.textContent.includes('操作日志')).click()`);
await cdp.waitFor('document.querySelectorAll("tbody tr").length > 3');
await shot('08-logs');

await cdp.close();
console.log('done');
process.exit(0);
