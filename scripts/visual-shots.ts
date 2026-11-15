import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';

const OUT = process.env.TEMP + '/footbridge-smoke';
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--window-size=1680,1050'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1680, height: 1050 });
await page.goto('http://127.0.0.1:5199/', { waitUntil: 'networkidle2' });
await new Promise((r) => setTimeout(r, 1500));

// 1. 主界面
await page.screenshot({ path: `${OUT}/v1-main.png` });

// 2. 比选抽屉
await page.$$eval('.app-header button', (btns) =>
  (btns.find((x) => x.textContent?.includes('方案并排比选')) as HTMLButtonElement).click(),
);
await page.waitForSelector('table.compare');
await new Promise((r) => setTimeout(r, 400));
await page.screenshot({ path: `${OUT}/v2-compare.png` });
await page.evaluate(() => {
  const mask = document.querySelector('.modal-mask') as HTMLElement;
  mask.click();
});
await page.waitForSelector('table.compare', { hidden: true });

// 3. 方案A：提交 → 审定通过 → 交底图弹层
await page.$$eval('button', (btns) =>
  (btns.find((x) => x.textContent?.includes('提交公路部门审核')) as HTMLButtonElement).click(),
);
await new Promise((r) => setTimeout(r, 300));
await page.$$eval('button', (btns) =>
  (btns.find((x) => x.textContent?.trim() === '公路部门受理') as HTMLButtonElement).click(),
);
await page.waitForSelector('.modal');
await page.$$eval('.modal-foot button', (btns) =>
  (btns.find((x) => x.textContent?.includes('审定通过')) as HTMLButtonElement).click(),
);
await page.waitForSelector('.modal', { hidden: true });
await new Promise((r) => setTimeout(r, 300));
await page.$$eval('button', (btns) =>
  (btns.find((x) => x.textContent?.includes('交底图 / 清单')) as HTMLButtonElement).click(),
);
await page.waitForSelector('.svg-preview svg');
await new Promise((r) => setTimeout(r, 500));
await page.screenshot({ path: `${OUT}/v3-briefing.png` });

// 4. 交底弹层内切到钢材统计
await page.$$eval('.sub-tabs button', (btns) =>
  (btns.find((x) => x.textContent?.includes('钢材用量统计')) as HTMLButtonElement).click(),
);
await new Promise((r) => setTimeout(r, 300));
await page.screenshot({ path: `${OUT}/v4-steel.png` });

console.log('screenshots written to', OUT);
await browser.close();
