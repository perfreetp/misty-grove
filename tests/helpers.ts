import { test, expect, type Page } from 'playwright/test';

const EXAM = (index: number) => `.exam-card >> nth=${index}`;

export async function openApp(page: Page): Promise<void> {
  await page.goto('/');
  await page.waitForSelector('.exam-card', { timeout: 20_000 });
  // wait for IndexedDB seeding / hydration to settle
  await page.waitForFunction(() => Boolean((window as unknown as { __capsule?: unknown }).__capsule), null, { timeout: 20_000 });
}

export type StoreSnapshot = {
  status: string;
  findings: number;
  keyframes: number;
  versions: { version: number; status: string; replacesVersion: number | null }[];
  amendment: string | null;
  returnCount: number;
  view: string;
  segments: { key: string; start: number; end: number; startAdjustedBy: string | null; endAdjustedBy: string | null }[];
  frame: number;
  playing: boolean;
  speed: number;
};

export async function snapshot(page: Page): Promise<StoreSnapshot> {
  return page.evaluate(() => {
    const store = (window as unknown as {
      __capsule: {
        state: { view: string; reading: { frame: number; playing: boolean; speed: number } };
        selectedExam: () => {
          status: string;
          findings: { keyframes: unknown[] }[];
          reportVersions: { version: number; status: string; replacesVersion: number | null }[];
          amendment: { status: string } | null;
          returnCount: number;
          segments: { key: string; startFrame: number; endFrame: number; startAdjustedBy: string | null; endAdjustedBy: string | null }[];
        };
      };
    }).__capsule;
    const exam = store.selectedExam();
    return {
      status: exam.status,
      findings: exam.findings.length,
      keyframes: exam.findings.reduce((sum, f) => sum + f.keyframes.length, 0),
      versions: exam.reportVersions.map((v) => ({ version: v.version, status: v.status, replacesVersion: v.replacesVersion })),
      amendment: exam.amendment?.status ?? null,
      returnCount: exam.returnCount,
      view: store.state.view,
      segments: exam.segments.map((s) => ({
        key: s.key,
        start: s.startFrame,
        end: s.endFrame,
        startAdjustedBy: s.startAdjustedBy,
        endAdjustedBy: s.endAdjustedBy,
      })),
      frame: store.state.reading.frame,
      playing: store.state.reading.playing,
      speed: store.state.reading.speed,
    };
  });
}

export async function selectExam(page: Page, index: number): Promise<void> {
  await page.locator(EXAM(index)).click();
  await page.waitForTimeout(250);
}

export async function selectExamByPatient(page: Page, name: string): Promise<void> {
  await page.locator('.exam-card', { hasText: name }).first().click();
  await page.waitForTimeout(250);
}

export async function switchUser(page: Page, userId: string): Promise<void> {
  await page.selectOption('#userSelect', userId);
  await page.waitForTimeout(350);
}

export async function gotoView(page: Page, view: 'registry' | 'reading' | 'lesions' | 'report' | 'stats'): Promise<void> {
  await page.locator(`#nav .nav-btn[data-view="${view}"]`).click();
  await page.waitForTimeout(400);
}

export async function seekTo(page: Page, frame: number): Promise<void> {
  const framed = page.locator('#frameInput');
  if (await framed.count()) {
    await framed.fill(String(frame + 1));
    await page.locator('[data-act="goto-frame"]').click();
  } else {
    // annotation view uses its own playhead control
    const lesionInput = page.locator('#lesionFrameInput');
    await lesionInput.fill(String(frame + 1));
    await lesionInput.press('Enter');
  }
  await page.waitForTimeout(260);
}

export async function canvasHasContent(page: Page, selector: string): Promise<boolean> {
  return page.evaluate((sel) => {
    const canvas = document.querySelector<HTMLCanvasElement>(sel);
    if (!canvas) return false;
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let bright = 0;
    for (let i = 0; i < data.length; i += 4 * 197) {
      if ((data[i] ?? 0) > 24 || (data[i + 1] ?? 0) > 24 || (data[i + 2] ?? 0) > 24) bright++;
    }
    return bright > 40;
  }, selector);
}

/** Mean colour of the mucosal wall ring (away from the lumen and FOV rim). */
export async function sampleCanvas(page: Page, selector: string): Promise<[number, number, number]> {
  return page.evaluate((sel) => {
    const canvas = document.querySelector<HTMLCanvasElement>(sel);
    if (!canvas) return [0, 0, 0];
    const ctx = canvas.getContext('2d');
    if (!ctx) return [0, 0, 0];
    const w = canvas.width;
    const h = canvas.height;
    const r = Math.min(w, h) * 0.36;
    const cx = w / 2;
    const cy = h / 2;
    const img = ctx.getImageData(0, 0, w, h).data;
    let sr = 0, sg = 0, sb = 0, n = 0;
    for (let y = 0; y < h; y += 3) {
      for (let x = 0; x < w; x += 3) {
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < r || dist > r * 1.55) continue;
        const i = (y * w + x) * 4;
        sr += img[i] ?? 0;
        sg += img[i + 1] ?? 0;
        sb += img[i + 2] ?? 0;
        n++;
      }
    }
    if (n === 0) return [0, 0, 0];
    return [Math.round(sr / n), Math.round(sg / n), Math.round(sb / n)] as [number, number, number];
  }, selector);
}

export async function resetData(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const store = (window as unknown as { __capsule: { resetAll: () => Promise<void> } }).__capsule;
    await store.resetAll();
  });
  await page.waitForTimeout(600);
}

export { test, expect };
