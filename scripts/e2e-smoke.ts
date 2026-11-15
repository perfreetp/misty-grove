// E2E 冒烟：驱动系统 Chrome 验证关键交互（dev server 需运行在 5199）
import puppeteer from 'puppeteer-core';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const URL = 'http://127.0.0.1:5199/';

let passed = 0;
const ok = (name: string, cond: unknown) => {
  if (!cond) throw new Error(`FAIL: ${name}`);
  passed++;
  console.log(`  ✓ ${name}`);
};

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--window-size=1680,1050'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1680, height: 1050 });

const pageErrors: string[] = [];
page.on('pageerror', (e) => pageErrors.push(`pageerror: ${e.message}`));
page.on('console', (m) => {
  if (m.type() === 'error') pageErrors.push(`console: ${m.text()}`);
});

try {
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForSelector('.app-header', { timeout: 10000 });
  ok('应用顶栏渲染', await page.$('.app-header'));
  ok('three.js canvas 渲染', (await page.$$('.scene-wrap canvas')).length >= 1);
  ok('初始两个方案', (await page.$$('.scheme-card')).length === 2);

  // 方案B 卡片应带“错误 1”徽标（净空 4.8m）
  const cards = await page.$$('.scheme-card');
  const bBadges = await cards[1].$$eval('.badge', (els) => els.map((e) => e.textContent));
  ok('方案B 显示错误徽标', bBadges.some((t) => t?.includes('错误 1')));

  // 打开方案B
  await cards[1].click();
  await new Promise((r) => setTimeout(r, 300));
  const clearanceText = await page.$eval('.metric-card .v.bad', (el) => el.textContent);
  ok('方案B 净空标红显示 4.80m', !!clearanceText?.includes('4.80'));
  const submitDisabled = await page.evaluate(() => {
    const b = [...document.querySelectorAll('button')].find((x) =>
      x.textContent?.includes('提交公路部门审核'),
    ) as HTMLButtonElement;
    return b?.disabled;
  });
  ok('存在强制错误时提交按钮禁用', submitDisabled === true);

  // 回到方案A
  const cards2 = await page.$$('.scheme-card');
  await cards2[0].click();
  await new Promise((r) => setTimeout(r, 300));

  // 提交审核
  const before = await page.$eval('.scheme-card.active .badge', (el) => el.textContent);
  ok('方案A 初始为草稿', before === '草稿');
  await page.$$eval('button.primary', (btns) => {
    const b = btns.find((x) => x.textContent?.includes('提交公路部门审核')) as HTMLButtonElement;
    b.click();
  });
  await page.waitForFunction(
    () => [...document.querySelectorAll('.scheme-card.active .badge')].some((e) => e.textContent === '待审核'),
    { timeout: 5000 },
  );
  ok('提交后状态变为待审核', true);

  // 公路部门受理 → 弹层
  await page.$$eval('button', (btns) => {
    const b = btns.find((x) => x.textContent?.trim() === '公路部门受理') as HTMLButtonElement;
    b.click();
  });
  await page.waitForSelector('.modal', { timeout: 5000 });
  ok('审核弹层打开', true);

  // 选择挂靠构件=主梁，填写意见，退回
  await page.select('.modal select', 'main-girder');
  await page.type('.modal textarea', '梁底净空富余偏小，请结合路面加铺预案复核高程');
  await page.$$eval('.modal-foot button', (btns) => {
    (btns.find((x) => x.textContent?.includes('退回修改')) as HTMLButtonElement).click();
  });
  await page.waitForSelector('.modal', { hidden: true, timeout: 5000 });
  await page.waitForFunction(
    () => [...document.querySelectorAll('.scheme-card.active .badge')].some((e) => e.textContent === '已退回'),
    { timeout: 5000 },
  );
  ok('退回后状态变为已退回', true);
  await page.waitForSelector('.comment-bubble', { timeout: 5000 });
  const bubbleCount = await page.$$eval('.comment-bubble', (els) => els.length);
  ok('退回意见以气泡挂到主梁构件', bubbleCount >= 1);
  const commentText = await page.$eval('.comment-item', (el) => el.textContent);
  ok('右栏出现退回意见条目', commentText.includes('梁底净空富余偏小'));

  // 并排比选弹层
  await page.$$eval('.app-header button', (btns) => {
    (btns.find((x) => x.textContent?.includes('方案并排比选')) as HTMLButtonElement).click();
  });
  await page.waitForSelector('table.compare', { timeout: 5000 });
  const rowLabels = await page.$$eval('table.compare td.metric-name', (els) =>
    els.map((e) => e.textContent),
  );
  ok('比选表含造价/净空/占地/封闭工期', ['估算造价', '桥下净空', '占地面积', '封闭施工天数'].every((k) =>
    rowLabels.some((r) => r?.includes(k)),
  ));
  const colCount = await page.$$eval('table.compare thead th', (els) => els.length);
  ok('比选表两个方案列 + 指标列', colCount === 3);
  await page.keyboard.press('Escape').catch(() => undefined);
  await page.$$eval('.modal-mask', (els) => {
    const mask = els[0] as HTMLElement;
    mask.click();
  });
  await page.waitForSelector('table.compare', { hidden: true, timeout: 5000 });

  // 桥墩布置页签
  await page.$$eval('.sub-tabs button', (btns) => {
    (btns.find((x) => x.textContent?.includes('桥墩布置')) as HTMLButtonElement).click();
  });
  await new Promise((r) => setTimeout(r, 200));
  const pierRows = await page.$$('.comp-row').then((els) => els.length);
  ok('桥墩页签列出桥台/桥墩', pierRows >= 2);

  // 无致命页面错误（three.js 与 Solid 运行期）
  const critical = pageErrors.filter((e) => !/WebGL|swiftshader|GPU|TensorFlow|favicon/i.test(e));
  ok(`运行期无未捕获异常（捕获 ${pageErrors.length} 条可忽略图形告警）`, critical.length === 0);

  console.log(`\n全部 ${passed} 项 E2E 交互测试通过`);
} catch (e) {
  await page.screenshot({ path: 'e2e-failure.png' });
  console.error('页面错误记录:', pageErrors);
  throw e;
} finally {
  await browser.close();
}
