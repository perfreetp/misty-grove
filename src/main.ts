// ============================================================
// 应用入口：装配状态、渲染器、面板与导入导出
// ============================================================
import './styles.css';
import { store } from './core/store';
import { SceneController } from './renderer/controller';
import { renderLeftPanel } from './ui/leftPanel';
import { renderRightPanel } from './ui/rightPanel';
import { exportBillCsv, exportProjectJson, parseProjectJson } from './core/export';
import { toast } from './ui/widgets';
import type { Role } from './types';

function renderAll() {
  renderLeftPanel();
  renderRightPanel();
  controller.sync();
  syncRoleUi();
}

let controller: SceneController;
try {
  controller = new SceneController();
} catch (err) {
  document.getElementById('glCanvas')!.outerHTML =
    `<div style="padding:40px;color:#f87171">WebGL2 初始化失败：${(err as Error).message}<br>请使用最新版 Chrome / Edge 浏览器。</div>`;
  throw err;
}

// 角色切换
const roleSelect = document.getElementById('roleSelect') as HTMLSelectElement;
roleSelect.addEventListener('change', () => store.setRole(roleSelect.value as Role));
function syncRoleUi() {
  roleSelect.value = store.role;
}

store.subscribe(renderAll);
renderAll();

// 导出 / 导入
document.getElementById('exportCsvBtn')!.addEventListener('click', () => {
  const errorCount = store.engine.issues.filter((i) => i.level === 'error').length;
  if (errorCount > 0) {
    toast(`存在 ${errorCount} 项设计错误，导出数据可能不完整，请先整改`, 'warn', 5000);
  }
  exportBillCsv(store.state);
  toast('工程量清单 CSV 已导出', 'ok');
});

document.getElementById('exportJsonBtn')!.addEventListener('click', () => {
  exportProjectJson(store.state);
  toast('项目 JSON 已导出', 'ok');
});

document.getElementById('importJsonBtn')!.addEventListener('click', () =>
  (document.getElementById('importFile') as HTMLInputElement).click());

document.getElementById('importFile')!.addEventListener('change', (e) => {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const project = parseProjectJson(String(reader.result));
      store.replaceProject(project);
      controller.frameTargetExternal(project.config);
      toast('项目导入成功', 'ok');
    } catch (err) {
      toast('导入失败：' + (err as Error).message, 'error', 5000);
    } finally {
      input.value = '';
    }
  };
  reader.readAsText(file);
});

// 全局错误兜底，避免白屏
window.addEventListener('error', (e) => {
  console.error(e.error);
  toast('运行异常：' + e.message, 'error', 6000);
});
