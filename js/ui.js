/* 共享 UI：DOM 构建、Toast、模态框、数字输入、徽章等 */
(function (global) {
  const App = global.App || (global.App = {});
  const Store = App.Store;

  function h(html) {
    const tpl = document.createElement("template");
    tpl.innerHTML = html.trim();
    return tpl.content.firstElementChild;
  }

  function esc(s) {
    return String(s ?? "").replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function toast(msg, type = "success") {
    const root = document.getElementById("toastRoot");
    const el = h(`<div class="toast ${type}">${esc(msg)}</div>`);
    root.appendChild(el);
    setTimeout(() => { el.style.opacity = "0"; el.style.transition = "opacity .3s"; setTimeout(() => el.remove(), 320); }, 3200);
  }

  /* 通用模态框：bodyHtml 为字符串或 HTMLElement；footButtons [{label, cls, onClick(close, body)}] */
  function modal({ title, body, wide = false, buttons = [] }) {
    const root = document.getElementById("modalRoot");
    const bodyNode = typeof body === "string" ? h(`<div>${body}</div>`) : body;
    const mask = h(`<div class="modal-mask">
      <div class="modal ${wide ? "wide" : ""}">
        <div class="modal-head"><h3>${esc(title)}</h3><button class="modal-x">✕</button></div>
        <div class="modal-body"></div>
        <div class="modal-foot"></div>
      </div>
    </div>`);
    mask.querySelector(".modal-body").appendChild(bodyNode);
    const foot = mask.querySelector(".modal-foot");
    const close = () => mask.remove();
    mask.querySelector(".modal-x").onclick = close;
    mask.addEventListener("mousedown", (e) => { if (e.target === mask) close(); });
    for (const b of buttons) {
      const btn = h(`<button class="btn ${b.cls || ""}">${esc(b.label)}</button>`);
      btn.onclick = () => b.onClick && b.onClick(close, bodyNode);
      foot.appendChild(btn);
    }
    root.appendChild(mask);
    return { mask, body: bodyNode, close };
  }

  function statusBadge(status) {
    const meta = Store.STATUSES[status];
    return `<span class="badge ${meta.badge}">${meta.label}</span>`;
  }

  function defectBadge(type) {
    const map = { nominal: ["gray", "正常"], missing: ["gray", "缺球"], offset: ["amber", "偏位"], bridge: ["orange", "连锡"] };
    const [cls, label] = map[type] || ["gray", type];
    return `<span class="badge ${cls}">${label}</span>`;
  }

  function confirmDialog(title, text, onOk, okCls = "primary") {
    modal({
      title,
      body: `<p style="margin:0">${esc(text)}</p>`,
      buttons: [
        { label: "取消", onClick: (close) => close() },
        { label: "确定", cls: okCls, onClick: (close) => { close(); onOk(); } },
      ],
    });
  }

  function lockedBanner(proj) {
    if (!proj.locked) return "";
    return `<div class="locked-banner">
      <span style="font-size:18px">🔒</span>
      <div>
        <b>层叠已锁定</b>（工艺评审通过 / 版本 V${proj.version}，当前状态：${Store.STATUSES[proj.status].label}）。
        层叠与球阵参数不允许再改；如需调整请走<b>变更单</b>重新开一轮评审。
      </div>
    </div>`;
  }

  function canEdit(proj) { return !proj.locked; }

  App.UI = { h, esc, toast, modal, statusBadge, defectBadge, confirmDialog, lockedBanner, canEdit };
})(window);
