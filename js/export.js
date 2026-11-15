/* 导出：层叠表 CSV、球阵缺陷明细 CSV（UTF-8 BOM，Excel 可直接打开） */
(function (global) {
  const App = global.App || (global.App = {});
  const Store = App.Store;

  function downloadCsv(filename, rows) {
    const escape = (v) => {
      const s = v === null || v === undefined ? "" : String(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const csv = "﻿" + rows.map((r) => r.map(escape).join(",")).join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function exportStackup(proj) {
    const rows = [["项目", proj.name], ["封装类型", proj.packageType], ["客户", proj.customer],
      ["版本", `V${proj.version}`], ["状态", Store.STATUSES[proj.status].label], ["导出时间", Store.fmtTime(Store.nowISO())], []];
    rows.push(["层名", "介质厚度(um)", "铜厚(um)", "材料代号", "走线密度(%)", "累计厚度(um)"]);
    let acc = 0;
    for (const l of proj.layers) {
      acc += +l.dielectricThickness + +l.cuThickness;
      rows.push([l.name, l.dielectricThickness, l.cuThickness, l.material, l.density, acc]);
    }
    rows.push([]);
    rows.push(["总厚度(um)", Store.totalThickness(proj), "", "客户上限(um)", proj.limitUm,
      Store.totalThickness(proj) > proj.limitUm ? "超限" : "合格"]);
    rows.push([]);
    rows.push(["阻抗表"]);
    rows.push(["层名", "阻抗表铜厚(um)"]);
    for (const r of proj.impedance) rows.push([r.layer, r.cuThickness]);
    downloadCsv(`${proj.name}_层叠表_V${proj.version}.csv`, rows);
  }

  function exportBgaDefects(proj) {
    const rows = [["项目", proj.name], ["球阵规格", `${proj.bga.cols}列 x ${proj.bga.rows}行`],
      ["列间距(um)", proj.bga.pitchX], ["行间距(um)", proj.bga.pitchY],
      ["导出时间", Store.fmtTime(Store.nowISO())], []];
    rows.push(["球位编号", "行", "列", "缺陷类型", "X偏位(um)", "Y偏位(um)", "备注"]);
    const defects = Store.defectBalls(proj);
    if (!defects.length) rows.push(["（无缺陷球）"]);
    for (const b of defects) {
      rows.push([b.id, b.row, b.col, Store.DEFECT_TYPES[b.defect] || b.defect,
        b.offsetX || 0, b.offsetY || 0, b.remark || ""]);
    }
    rows.push([]);
    rows.push(["缺陷统计"]);
    const counts = { missing: 0, offset: 0, bridge: 0 };
    for (const b of defects) counts[b.defect] = (counts[b.defect] || 0) + 1;
    rows.push(["缺球", counts.missing || 0], ["偏位", counts.offset || 0], ["连锡", counts.bridge || 0],
      ["缺陷总数", defects.length], ["焊球总数", proj.bga.balls.length],
      ["缺陷率(%)", (defects.length / proj.bga.balls.length * 100).toFixed(2)]);
    downloadCsv(`${proj.name}_球阵缺陷明细_V${proj.version}.csv`, rows);
  }

  App.Export = { exportStackup, exportBgaDefects, downloadCsv };
})(window);
