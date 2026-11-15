// 极简 CDP 客户端：原生 WebSocket，支持 Runtime.evaluate / 点击 / 等待
const BASE = 'http://127.0.0.1:9222';

async function newPage() {
  const res = await fetch(`${BASE}/json/new?about:blank`, { method: 'PUT' }).then((r) => r.json());
  return res.webSocketDebuggerUrl;
}

export class CDP {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 0;
    this.pending = new Map();
    this.events = [];
    this.ready = new Promise((resolve, reject) => {
      this.ws.addEventListener('open', () => resolve());
      this.ws.addEventListener('error', reject);
    });
    this.ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(JSON.stringify(msg.error)));
        else resolve(msg.result);
      } else if (msg.method) {
        this.events.push(msg);
      }
    });
  }
  async send(method, params = {}) {
    await this.ready;
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  async navigate(url) {
    await this.send('Page.enable');
    await this.send('Runtime.enable');
    await this.send('Page.navigate', { url });
  }
  // 在页面执行表达式，返回 JS 值
  async eval(expr, awaitPromise = true) {
    const r = await this.send('Runtime.evaluate', {
      expression: expr,
      awaitPromise,
      returnByValue: true,
      userGesture: true
    });
    if (r.exceptionDetails) {
      throw new Error('PAGE EXC: ' + JSON.stringify(r.exceptionDetails.exception?.description || r.exceptionDetails.text));
    }
    return r.result.value;
  }
  async click(selector) {
    const ok = await this.eval(`(() => { const el = document.querySelector(${JSON.stringify(selector)}); if (!el) return false; el.click(); return true; })()`);
    if (!ok) throw new Error('click target missing: ' + selector);
  }
  async clickByText(text) {
    const ok = await this.eval(`(() => {
      const els = [...document.querySelectorAll('button, a')];
      const el = els.find((e) => e.textContent.trim().includes(${JSON.stringify(text)}));
      if (!el) return false; el.click(); return true;
    })()`);
    if (!ok) throw new Error('click text missing: ' + text);
    return ok;
  }
  async waitFor(fnExpr, timeout = 8000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      const v = await this.eval(fnExpr);
      if (v) return v;
      await new Promise((r) => setTimeout(r, 150));
    }
    throw new Error('waitFor timeout: ' + fnExpr);
  }
  async text(selector) {
    return this.eval(`document.querySelector(${JSON.stringify(selector)})?.textContent || null`);
  }
  async close() {
    this.ws.close();
  }
}

export async function makeClient(url) {
  const wsUrl = await newPage();
  const cdp = new CDP(wsUrl);
  await cdp.ready;
  if (url) await cdp.navigate(url);
  return cdp;
}
