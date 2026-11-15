// 三维表面拾取 → 分区自动编号 → 测量录入 的专项测试
import { makeClient } from './cdp.mjs';

const APP = 'http://127.0.0.1:5175/';
const cdp = await makeClient(APP);
const errors = [];
cdp.ws.addEventListener('message', (ev) => {
  const m = JSON.parse(ev.data);
  if (m.method === 'Runtime.exceptionThrown') {
    errors.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
  }
});
let pass = 0;
const check = (n, c, x = '') => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (c ? '' : ' ' + x)); if (c) pass++; };

await cdp.waitFor('document.querySelector("aside")');
await cdp.eval(`window.confirm = () => true; window.alert = () => {};`);
// 清库保证独立
await cdp.eval(`new Promise((res) => {
  const req = indexedDB.open('molemap3d');
  req.onsuccess = () => {
    const db = req.result;
    const names = [...db.objectStoreNames];
    const tx = db.transaction(names, 'readwrite');
    names.forEach((n) => tx.objectStore(n).clear());
    tx.oncomplete = tx.onerror = () => { db.close(); res(true); };
  };
  req.onerror = () => res(true);
})`);
await cdp.navigate(APP);
await cdp.waitFor('document.querySelector("aside")');
await cdp.eval(`window.confirm = () => true; window.alert = () => {};`);

// 新建患者
await cdp.clickByText('新建患者');
await cdp.waitFor(`document.querySelector(".modal input")`);
await cdp.eval(`(() => { const i = document.querySelector('.modal input'); i.value='拾取测试患者'; i.dispatchEvent(new Event('input',{bubbles:true})); })()`);
await cdp.eval(`[...document.querySelectorAll('.modal button')].find(b=>b.textContent.includes('创建并进入')).click()`);
await cdp.waitFor(`document.querySelector(".ws-head")`);
check('进入空白患者工作台', true);

// 开启定位模式并在 canvas 中心偏上派发点击（射线应命中躯干/头部）
await cdp.clickByText('在体表定位新痣');
await cdp.waitFor(`document.body.textContent.includes("定位模式")`);
const pickResult = await cdp.eval(`(async () => {
  const canvas = document.querySelector('.canvas-host canvas');
  const rect = canvas.getBoundingClientRect();
  // 躯干大约在视口中上部
  const x = rect.left + rect.width * 0.5;
  const y = rect.top + rect.height * 0.42;
  ['pointerdown','pointerup','click'].forEach((t) =>
    canvas.dispatchEvent(new PointerEvent(t, { clientX: x, clientY: y, bubbles: true, button: 0 })));
  await new Promise((r) => setTimeout(r, 400));
  return {
    modalOpen: !!document.querySelector('.modal'),
    partValue: document.querySelector('.modal input[readonly]')?.value || null,
    title: document.querySelector('.modal h3')?.textContent || null
  };
})()`);
check('点击模型表面弹出定位弹窗', pickResult.modalOpen, JSON.stringify(pickResult));
check('射线命中具体身体部件', !!pickResult.partValue, pickResult.partValue);

// 选择分区并生成编号
await cdp.eval(`(() => {
  const sel = document.querySelector('.modal select');
  const opt = [...sel.options].find((o) => o.value === 'BK' || o.value === 'CH' || o.value === 'AB');
  sel.value = opt.value;
  sel.dispatchEvent(new Event('change', { bubbles: true }));
})()`);
await cdp.eval(`[...document.querySelectorAll('.modal button')].find(b=>b.textContent.includes('生成编号')).click()`);
await cdp.waitFor(`document.querySelectorAll('.mole-item').length === 1`);
const moleCode = await cdp.eval(`document.querySelector('.mole-item strong')?.textContent`);
check('按分区规则生成永久编号', /^[A-Z]{2}(-[LR])?-\d{3}$/.test(moleCode || ''), moleCode);

// 录入皮肤镜测量（用合成 Blob 当照片）
await cdp.waitFor(`document.querySelector('.modal input[type="number"]')`);
await cdp.eval(`(() => {
  const num = document.querySelector('.modal input[type="number"]');
  num.value = '2.5';
  num.dispatchEvent(new Event('input', { bubbles: true }));
})()`);
const blobOk = await cdp.eval(`(async () => {
  // 注入一个合成图片文件到 file input
  const blob = new Blob([new Uint8Array([137,80,78,71])], { type: 'image/png' });
  const file = new File([blob], 'derm.png', { type: 'image/png' });
  const input = document.querySelector('.modal input[type="file"]');
  const dt = new DataTransfer();
  dt.items.add(file);
  input.files = dt.files;
  input.dispatchEvent(new Event('change', { bubbles: true }));
  await new Promise((r) => setTimeout(r, 300));
  return !!document.querySelector('.modal img.thumb');
})()`);
check('皮肤镜照片可挂接并预览', blobOk);
await cdp.eval(`[...document.querySelectorAll('.modal button')].find(b=>b.textContent.includes('保存测量记录')).click()`);
await cdp.waitFor(`!document.querySelector('.modal')`);
check('测量记录保存成功', !(await cdp.eval(`!!document.querySelector('.modal')`)));

// 验证标记上了 3D 模型且进入清单
const listBadge = await cdp.eval(`document.querySelector('.mole-item .badge.ok')?.textContent`);
check('痣清单显示已记录', listBadge === '已记录', listBadge);

// 验证持久化（按当前患者过滤，避免受演示数据干扰）
const idb = await cdp.eval(`new Promise((res) => {
  const r = indexedDB.open('molemap3d');
  r.onsuccess = () => {
    const db = r.result;
    const tx = db.transaction(['patients', 'moles', 'findings']);
    tx.objectStore('patients').getAll().onsuccess = (pe) => {
      const pid = pe.target.result.find((p) => p.name === '拾取测试患者').id;
      tx.objectStore('moles').getAll().onsuccess = (me) => {
        const moles = me.target.result.filter((m) => m.patientId === pid);
        tx.objectStore('findings').getAll().onsuccess = (fe) => {
          const findings = fe.target.result.filter((f) => moles.some((m) => m.id === f.moleId));
          res({ moles: moles.length, findings: findings.length, hasBlob: findings.some((x) => x.photoBlob instanceof Blob) });
        };
      };
    };
  };
})`);
check('新痣与测量已持久化到 IndexedDB', idb.moles === 1 && idb.findings === 1, JSON.stringify(idb));
check('新记录照片 Blob 完整', idb.hasBlob);

// OrbitControls 对合成事件的 setPointerCapture 报错属测试环境噪声，过滤后再判断真实错误
const realErrors = errors.filter((e) => !e.includes('setPointerCapture'));
console.log(`\n${realErrors.length ? '页面错误:\n' + realErrors.join('\n') : '页面无运行时错误（合成指针的 OrbitControls 噪声已过滤）'}`);
console.log(`\n结果 ${pass}/7 通过`);
await cdp.close();
process.exit(realErrors.length || pass < 7 ? 1 : 0);
