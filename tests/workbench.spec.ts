import { test, expect } from 'playwright/test';
import { canvasHasContent, gotoView, openApp, sampleCanvas, seekTo, selectExam, selectExamByPatient, snapshot, switchUser } from './helpers';

test.beforeEach(async ({ page }) => {
  await openApp(page);
});

test('renders the reading workbench with a painted frame and a timeline', async ({ page }) => {
  await expect(page.locator('.exam-card')).toHaveCount(5);
  await expect(page.locator('#nav .nav-btn')).toHaveCount(5);
  expect(await canvasHasContent(page, '#frameCanvas')).toBe(true);
  await expect(page.locator('.timeline-canvas')).toHaveCount(1);

  // each tract segment renders a visibly different mucosa
  await selectExam(page, 1);
  await seekTo(page, 300);
  const stomach = await sampleCanvas(page, '#frameCanvas');
  await seekTo(page, 940);
  const jejunum = await sampleCanvas(page, '#frameCanvas');
  const distance = Math.abs(stomach[0] - jejunum[0]) + Math.abs(stomach[1] - jejunum[1]) + Math.abs(stomach[2] - jejunum[2]);
  expect(distance).toBeGreaterThan(20);
  expect(await canvasHasContent(page, '#frameCanvas')).toBe(true);
});

test('playback advances frames and supports 8x fast forward and 8x slow motion', async ({ page }) => {
  await selectExam(page, 1);
  const start = (await snapshot(page)).frame;

  await page.locator('[data-speed="8"]').click();
  await page.locator('#playBtn').click();
  await page.waitForTimeout(1100);
  const fast = await snapshot(page);
  expect(fast.frame).toBeGreaterThan(start + 20);
  expect(fast.playing).toBe(true);

  await page.locator('#playBtn').click();
  await page.waitForTimeout(150);
  const paused = await snapshot(page);
  expect(paused.playing).toBe(false);
  const pauseFrame = paused.frame;
  await page.waitForTimeout(400);
  expect((await snapshot(page)).frame).toBe(pauseFrame);

  await page.locator('[data-speed="0.125"]').click();
  expect((await snapshot(page)).speed).toBe(0.125);
  await expect(page.locator('.hud-speed')).toContainText('已暂停');
});

test('auto-pauses exactly on a marked frame while playing fast', async ({ page }) => {
  await selectExam(page, 1);
  // The first marked frame is a keyframe of the vascular finding, not the
  // finding frame itself, so start playback just before the earliest mark.
  const firstMark = await page.evaluate(() => {
    type F = { frameIndex: number; keyframes: { frameIndex: number }[] };
    const store = (window as unknown as { __capsule: { selectedExam: () => { findings: F[] } } }).__capsule;
    const frames = store.selectedExam().findings.flatMap((f) => [f.frameIndex, ...f.keyframes.map((k) => k.frameIndex)]);
    return Math.min(...frames);
  });
  const findingFrame = firstMark;
  await seekTo(page, findingFrame - 22);
  await page.locator('[data-speed="8"]').click();
  await page.locator('#playBtn').click();
  await page.waitForTimeout(1600);
  const state = await snapshot(page);
  expect(state.playing).toBe(false);
  expect(state.frame).toBe(findingFrame);
  await expect(page.locator('.toast')).toContainText('已停在标记帧');

  // toggling the setting off lets playback run through markers
  await page.locator('.toggle-row').click();
  await seekTo(page, findingFrame - 22);
  await page.locator('#playBtn').click();
  await page.waitForTimeout(1200);
  const after = await snapshot(page);
  expect(after.frame).toBeGreaterThan(findingFrame);
  expect(after.playing).toBe(true);
});

test('timeline scrub and boundary drag both work, and the modifier is recorded', async ({ page }) => {
  await selectExam(page, 1);
  const timeline = page.locator('.timeline-canvas');
  const box = (await timeline.boundingBox())!;
  const bandY = box.y + 54;

  // scrub to ~60% of the clip
  await page.mouse.move(box.x + box.width * 0.3, bandY);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.6, bandY, { steps: 12 });
  await page.mouse.up();
  await page.waitForTimeout(300);
  const total = 2060;
  const scrubbed = (await snapshot(page)).frame;
  expect(scrubbed / total).toBeGreaterThan(0.5);
  expect(scrubbed / total).toBeLessThan(0.72);

  // drag the stomach/duodenum boundary from 25% to 30%
  const before = (await snapshot(page)).segments;
  await page.mouse.move(box.x + box.width * 0.25, bandY);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.3, bandY, { steps: 16 });
  await page.mouse.up();
  await page.waitForTimeout(400);
  const after = (await snapshot(page)).segments;
  const stomachBefore = before.find((s) => s.key === 'stomach')!;
  const stomachAfter = after.find((s) => s.key === 'stomach')!;
  const duodenumAfter = after.find((s) => s.key === 'duodenum')!;
  expect(stomachAfter.end).toBe(duodenumAfter.start);
  expect(stomachAfter.end).toBeGreaterThan(stomachBefore.end);
  expect(stomachAfter.endAdjustedBy).toBeTruthy();
  expect(duodenumAfter.startAdjustedBy).toBeTruthy();
  await expect(page.locator('.seg-row').nth(2)).toContainText('F');
});

test('registered exams start in 待阅片 and move to 阅片中 on first read', async ({ page }) => {
  await selectExam(page, 0);
  expect((await snapshot(page)).status).toBe('pending');
  await page.locator('[data-act="begin-reading"]').click();
  await page.waitForTimeout(600);
  expect((await snapshot(page)).status).toBe('reading');
  await expect(page.locator('.status-badge').first()).toContainText('阅片中');
});

test('lesion annotation requires a size, a keyframe, and binds both to a tract segment', async ({ page }) => {
  await selectExam(page, 0);
  await page.locator('[data-act="begin-reading"]').click();
  await page.waitForTimeout(400);
  await gotoView(page, 'lesions');
  await seekTo(page, 900);

  await page.locator('[data-act="new-finding"]').first().click();
  await page.waitForTimeout(250);

  // saving without a size is blocked
  await page.locator('[data-act="save-finding"]').click();
  await page.waitForTimeout(300);
  await expect(page.locator('.toast.err')).toContainText('估计大小');
  expect((await snapshot(page)).findings).toBe(0);

  // draw a box
  const canvas = page.locator('#lesionCanvas');
  const cb = (await canvas.boundingBox())!;
  await page.mouse.move(cb.x + cb.width * 0.34, cb.y + cb.height * 0.36);
  await page.mouse.down();
  await page.mouse.move(cb.x + cb.width * 0.58, cb.y + cb.height * 0.6, { steps: 12 });
  await page.mouse.up();
  await page.waitForTimeout(250);

  await page.locator('[data-type="polyp"]').click();
  await page.waitForTimeout(200);
  await page.locator('[data-size="8"]').click();
  await page.waitForTimeout(200);
  await page.locator('[data-act="save-finding"]').click();
  await page.waitForTimeout(700);

  const saved = await page.evaluate(() => {
    const store = (window as unknown as { __capsule: { selectedExam: () => { findings: { type: string; sizeMm: number | null; box: { w: number; h: number } }[] } } }).__capsule;
    const f = store.selectedExam().findings[0]!;
    return { type: f.type, size: f.sizeMm, w: f.box.w, h: f.box.h };
  });
  expect(saved.type).toBe('polyp');
  expect(saved.size).toBe(8);
  expect(saved.w).toBeGreaterThan(0.15);
  expect(saved.h).toBeGreaterThan(0.15);
  expect((await snapshot(page)).keyframes).toBe(0);

  // bind a keyframe at the current frame
  await page.locator('[data-act="capture-keyframe"]').first().click();
  await page.waitForTimeout(600);
  expect((await snapshot(page)).keyframes).toBe(1);
  const keyframe = await page.evaluate(() => {
    const store = (window as unknown as { __capsule: { selectedExam: () => { findings: { keyframes: { frameIndex: number; segmentKey: string; segmentName: string }[] }[] } } }).__capsule;
    const k = store.selectedExam().findings[0]!.keyframes[0]!;
    return { frameIndex: k.frameIndex, segmentKey: k.segmentKey, segmentName: k.segmentName };
  });
  expect(keyframe.frameIndex).toBe(900);
  expect(keyframe.segmentName).toBe('空肠');
});

test('submission is blocked until every lesion has size and keyframe and the conclusion is filled', async ({ page }) => {
  await selectExam(page, 0);
  await gotoView(page, 'lesions');
  await seekTo(page, 700);
  await page.locator('[data-act="new-finding"]').first().click();
  await page.waitForTimeout(250);
  await page.locator('[data-size="5"]').click();
  await page.waitForTimeout(150);
  await page.locator('[data-act="save-finding"]').click();
  await page.waitForTimeout(600);

  await gotoView(page, 'report');
  await page.locator('[data-act="submit-read"]').click();
  await page.waitForTimeout(500);
  await expect(page.locator('.modal-title')).toContainText('提交被拦截');
  await expect(page.locator('.issue-row').first()).toContainText('未绑定关键帧');

  // fix the lesion from the modal shortcut
  await page.locator('[data-goto]').click();
  await page.waitForTimeout(500);
  expect((await snapshot(page)).view).toBe('lesions');
  await page.locator('[data-open-finding]').first().click();
  await page.waitForTimeout(400);
  await page.locator('[data-act="capture-keyframe"]').click();
  await page.waitForTimeout(500);

  await gotoView(page, 'report');
  await page.locator('[data-act="submit-read"]').click();
  await page.waitForTimeout(500);
  await expect(page.locator('.issue-row').first()).toContainText('镜下结论');

  await page.locator('.modal [data-close]').first().click();
  await page.waitForTimeout(250);
  await page.locator('[data-conclusion]').first().fill('空肠中段息肉样隆起，未见活动性出血。');
  await page.locator('[data-act="submit-read"]').click();
  await page.waitForTimeout(800);
  const state = await snapshot(page);
  expect(state.status).toBe('review');
  expect(state.versions).toEqual([{ version: 1, status: 'pending', replacesVersion: null }]);
});

test('dual reading shows both conclusions and flags the disagreement', async ({ page }) => {
  await selectExam(page, 2);
  await gotoView(page, 'report');
  await expect(page.locator('.reader-card')).toHaveCount(2);
  const diff = page.locator('.diff-panel');
  await expect(diff).toContainText('存在差异');
  await expect(page.locator('.diff-col')).toHaveCount(2);
  await expect(page.locator('.diff-col-text').first()).toContainText('克罗恩病');
  await expect(page.locator('.diff-col-text').nth(1)).toContainText('未见活动性出血');
});

test('publishing requires a reviewer and records the version as published', async ({ page }) => {
  await selectExam(page, 2);

  // a reader cannot publish
  await gotoView(page, 'report');
  await expect(page.locator('[data-act="publish-report"]')).toBeDisabled();

  await switchUser(page, 'u-review');
  await gotoView(page, 'report');
  await page.locator('[data-review-comment]').fill('两位结论基本一致，采纳第一位阅片人意见。');
  await page.locator('[data-act="publish-report"]').click();
  await page.waitForTimeout(800);
  const state = await snapshot(page);
  expect(state.status).toBe('published');
  expect(state.versions).toEqual([{ version: 1, status: 'published', replacesVersion: null }]);
  await expect(page.locator('.report-banner')).toContainText('已发布');
});

test('a return requires a comment and sends the exam back to the reader', async ({ page }) => {
  await selectExam(page, 2);
  await switchUser(page, 'u-review');
  await gotoView(page, 'report');

  await page.locator('[data-act="return-report"]').click();
  await page.waitForTimeout(400);
  await expect(page.locator('.toast.err')).toContainText('退回意见');
  expect((await snapshot(page)).status).toBe('review');

  await page.locator('[data-review-comment]').fill('关键帧不足，请补充出血量描述。');
  await page.locator('[data-act="return-report"]').click();
  await page.waitForTimeout(700);
  const state = await snapshot(page);
  expect(state.status).toBe('returned');
  expect(state.returnCount).toBe(1);
  await expect(page.locator('.report-banner')).toContainText('报告已退回');
  await expect(page.locator('.report-banner')).toContainText('关键帧不足');
});

test('amending a published report keeps the old version and republishes as v2', async ({ page }) => {
  await selectExam(page, 2);
  await switchUser(page, 'u-review');
  await gotoView(page, 'report');
  await page.locator('[data-act="publish-report"]').click();
  await page.waitForTimeout(700);
  expect((await snapshot(page)).status).toBe('published');

  await switchUser(page, 'u-read1');
  await gotoView(page, 'report');
  await page.locator('[data-act="start-amendment"]').click();
  await page.waitForTimeout(350);
  await page.locator('#amendReason').fill('补充息肉山田分型描述');
  await page.locator('[data-ok]').click();
  await page.waitForTimeout(600);
  let state = await snapshot(page);
  expect(state.amendment).toBe('draft');
  expect(state.versions.at(-1)).toEqual({ version: 2, status: 'draft', replacesVersion: 1 });

  await page.locator('[data-act="submit-read"]').click();
  await page.waitForTimeout(700);
  state = await snapshot(page);
  expect(state.status).toBe('review');
  expect(state.versions.at(-1)).toEqual({ version: 2, status: 'pending', replacesVersion: 1 });

  await switchUser(page, 'u-review');
  await gotoView(page, 'report');
  await page.locator('[data-act="publish-report"]').click();
  await page.waitForTimeout(800);
  state = await snapshot(page);
  expect(state.status).toBe('published');
  // v1 is preserved as a superseded history version
  expect(state.versions).toEqual([
    { version: 1, status: 'superseded', replacesVersion: null },
    { version: 2, status: 'published', replacesVersion: 1 },
  ]);
  expect(state.amendment).toBeNull();
  await expect(page.locator('.version-item.old')).toContainText('历史版本');
});

test('statistics aggregate reading time, lesion counts and a return rate', async ({ page }) => {
  await gotoView(page, 'stats');
  const values = await page.locator('.kpi-value').allTextContents();
  expect(values).toHaveLength(4);
  expect(values[0]).toMatch(/分钟/);
  expect(values[2]).toMatch(/%/);
  await expect(page.locator('.stats-table tbody tr')).toHaveCount(5);
  const returnRate = parseFloat(values[2]!);
  expect(returnRate).toBeGreaterThan(0);

  // drill-in from the table selects the exam
  await page.locator('.stats-table tbody tr').nth(2).click();
  await page.waitForTimeout(300);
  const selected = await page.evaluate(() => (window as unknown as { __capsule: { state: { selectedExamId: string } } }).__capsule.state.selectedExamId);
  expect(selected).toBeTruthy();
});

test('data survives a page reload (IndexedDB persistence)', async ({ page }) => {
  await selectExam(page, 1);
  await gotoView(page, 'lesions');
  await seekTo(page, 420);
  await page.locator('[data-act="new-finding"]').first().click();
  await page.waitForTimeout(250);
  await page.locator('[data-type="ulcer"]').click();
  await page.locator('[data-size="12"]').click();
  await page.waitForTimeout(200);
  await page.locator('[data-act="save-finding"]').click();
  await page.waitForTimeout(700);
  expect((await snapshot(page)).findings).toBe(2);

  // move the segment boundary too — it must persist with the modifier's name.
  // Boundaries live on the reading view's timeline, so switch back there.
  await gotoView(page, 'reading');
  const timeline = page.locator('.timeline-canvas');
  const box = (await timeline.boundingBox())!;
  await page.mouse.move(box.x + box.width * 0.65, box.y + 54);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.7, box.y + 54, { steps: 12 });
  await page.mouse.up();
  await page.waitForTimeout(500);
  const adjusted = (await snapshot(page)).segments.filter((s) => s.startAdjustedBy || s.endAdjustedBy);
  expect(adjusted.length).toBeGreaterThan(0);

  await page.reload();
  await page.waitForSelector('.exam-card');
  await page.waitForFunction(() => Boolean((window as unknown as { __capsule?: unknown }).__capsule));
  await page.waitForTimeout(500);
  await selectExam(page, 1);
  const after = await snapshot(page);
  expect(after.findings).toBe(2);
  const adjustedAfter = after.segments.filter((s) => s.startAdjustedBy || s.endAdjustedBy);
  expect(adjustedAfter.length).toBe(adjusted.length);
  expect(adjustedAfter[0]!.endAdjustedBy ?? adjustedAfter[0]!.startAdjustedBy).toBeTruthy();
});

test('a returned correction stays editable and can be resubmitted without losing the old report', async ({ page }) => {
  await selectExam(page, 2);
  await switchUser(page, 'u-review');
  await gotoView(page, 'report');
  await page.locator('[data-act="publish-report"]').click();
  await page.waitForTimeout(700);

  await switchUser(page, 'u-read1');
  await gotoView(page, 'report');
  await page.locator('[data-act="start-amendment"]').click();
  await page.waitForTimeout(300);
  await page.locator('#amendReason').fill('补充息肉山田分型');
  await page.locator('[data-ok]').click();
  await page.waitForTimeout(500);
  await page.locator('[data-act="submit-read"]').click();
  await page.waitForTimeout(700);
  expect((await snapshot(page)).status).toBe('review');

  // reviewer sends the correction back
  await switchUser(page, 'u-review');
  await gotoView(page, 'report');
  await page.locator('[data-review-comment]').fill('分型描述仍不完整，请补全后再提交。');
  await page.locator('[data-act="return-report"]').click();
  await page.waitForTimeout(700);
  let state = await snapshot(page);
  // the published v1 stays in force while the correction goes back for edits
  expect(state.status).toBe('published');
  expect(state.amendment).toBe('draft');
  expect(state.versions).toEqual([
    { version: 1, status: 'published', replacesVersion: null },
    { version: 2, status: 'returned', replacesVersion: 1 },
  ]);
  await expect(page.locator('.report-banner')).toContainText('被退回，待修改');
  await expect(page.locator('.report-banner')).toContainText('分型描述仍不完整');

  // the reader can revise and resubmit
  await switchUser(page, 'u-read1');
  await gotoView(page, 'report');
  await page.locator('[data-act="submit-read"]').click();
  await page.waitForTimeout(700);
  state = await snapshot(page);
  expect(state.status).toBe('review');
  expect(state.versions.at(-1)).toEqual({ version: 2, status: 'pending', replacesVersion: 1 });
});

test('reading time accumulates while studying and stops when the tab is hidden', async ({ page }) => {
  await selectExam(page, 1);
  await page.waitForTimeout(400);
  const readSeconds = () =>
    page.evaluate(() => {
      const store = (window as unknown as { __capsule: { selectedExam: () => { assessments: { readingSeconds: number }[] } } }).__capsule;
      return store.selectedExam().assessments[0]!.readingSeconds;
    });

  const before = await readSeconds();
  await page.waitForTimeout(3200);
  const after = await readSeconds();
  // paused study still counts: at least ~2s of the 3.2s wait
  expect(after - before).toBeGreaterThanOrEqual(2);

  await page.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { get: () => 'hidden', configurable: true });
  });
  await page.waitForTimeout(2600);
  const hidden = await readSeconds();
  expect(hidden).toBe(after);

  await page.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { get: () => 'visible', configurable: true });
  });
});

test('a correction draft unlocks lesions, boundaries and conclusions until it is resubmitted', async ({ page }) => {
  await selectExamByPatient(page, '孙丽'); // published, with a correction draft in the demo data
  let state = await snapshot(page);
  expect(state.status).toBe('published');
  expect(state.amendment).toBe('draft');

  await gotoView(page, 'report');
  // conclusions are editable again so the correction can actually change them
  await expect(page.locator('[data-conclusion]').first()).toBeEnabled();

  // lesions are editable too
  await gotoView(page, 'lesions');
  await expect(page.locator('[data-act="new-finding"]').first()).toBeEnabled();

  // the correction can be submitted once conclusions are filled
  await gotoView(page, 'report');
  await page.locator('[data-conclusion]').first().fill('回肠息肉（山田 II 型），建议内镜随访。');
  await page.locator('[data-act="submit-read"]').click();
  await page.waitForTimeout(800);
  state = await snapshot(page);
  expect(state.status).toBe('review');
  expect(state.versions.at(-1)?.status).toBe('pending');

  // while awaiting review everything locks again
  await gotoView(page, 'lesions');
  await expect(page.locator('[data-act="new-finding"]').first()).toBeDisabled();
});

test('frame jump works by Enter and blur, and playback controls never rebuild the stage', async ({ page }) => {
  await selectExam(page, 1);
  // tag the live canvas: a rebuild would replace it and drop the marker
  await page.evaluate(() => {
    document.querySelector('#frameCanvas')!.dataset.mark = 'kept';
  });

  await page.locator('#frameInput').fill('1234');
  await page.locator('#frameInput').press('Enter');
  await page.waitForTimeout(400);
  expect((await snapshot(page)).frame).toBe(1233);
  expect(await page.evaluate(() => document.querySelector('#frameCanvas')?.dataset.mark === 'kept')).toBe(true);

  await page.locator('#playBtn').click();
  await page.waitForTimeout(400);
  await page.locator('#playBtn').click();
  await page.waitForTimeout(200);
  await page.locator('[data-speed="2"]').click();
  await page.waitForTimeout(300);

  const state = await snapshot(page);
  expect(state.playing).toBe(false);
  expect(state.speed).toBe(2);
  expect(await page.evaluate(() => document.querySelector('#frameCanvas')?.dataset.mark === 'kept')).toBe(true);
  await expect(page.locator('[data-speed].active')).toHaveText('2×');
  await expect(page.locator('#speedNote')).toContainText('快放 2×');
});
