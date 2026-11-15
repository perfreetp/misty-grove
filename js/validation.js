/* 三档校验：
 * 1) 总厚度 > 客户上限(1.2mm) —— error，硬拦截，不可提交
 * 2) 单层介质 < 25um        —— warning，提示风险但仍可提交
 * 3) 铜厚与阻抗表不一致      —— error，要求按阻抗表回填后方可提交
 */
(function (global) {
  const App = global.App || (global.App = {});
  const Store = App.Store;

  function validateProject(proj) {
    const checks = [];

    /* 档位一：总厚度硬拦截 */
    const total = Store.totalThickness(proj);
    const limit = proj.limitUm || Store.CUSTOMER_LIMIT_UM;
    checks.push({
      level: total > limit ? "error" : "pass",
      title: `总厚度校验（客户上限 ${limit}µm / ${(limit / 1000).toFixed(2)}mm）`,
      desc: `当前总厚度 ${total}µm（${(total / 1000).toFixed(3)}mm）` +
        (total > limit ? `，超出上限 ${total - limit}µm，系统直接拦下，必须调整层叠后才能提交。` : "，满足客户厚度上限要求。"),
      layers: [],
    });

    /* 档位二：介质厚度风险提示 */
    const thinLayers = proj.layers.filter((l) => +l.dielectricThickness < Store.DIELECTRIC_MIN_UM);
    checks.push({
      level: thinLayers.length ? "warn" : "pass",
      title: `介质厚度工艺风险（下限 ${Store.DIELECTRIC_MIN_UM}µm）`,
      desc: thinLayers.length
        ? `以下 ${thinLayers.length} 层介质低于 ${Store.DIELECTRIC_MIN_UM}µm，存在压合填胶与可靠性风险，仅提示不拦截，仍可提交并在评审中说明：` +
          thinLayers.map((l) => `${l.name}=${l.dielectricThickness}µm`).join("，")
        : `所有介质层厚度均不低于 ${Store.DIELECTRIC_MIN_UM}µm。`,
      layers: thinLayers.map((l) => l.id),
    });

    /* 档位三：铜厚 vs 阻抗表，必须回填 */
    const mismatches = [];
    for (const layer of proj.layers) {
      const row = proj.impedance.find((r) => r.layer === layer.name);
      const expected = row ? +row.cuThickness : null;
      if (expected === null || +layer.cuThickness !== expected) {
        mismatches.push({ layerId: layer.id, name: layer.name, actual: +layer.cuThickness, expected });
      }
    }
    checks.push({
      level: mismatches.length ? "error" : "pass",
      title: "铜厚与阻抗表一致性（要求回填）",
      desc: mismatches.length
        ? "以下层铜厚与阻抗表对不上，必须执行「按阻抗表回填」或修改阻抗表后才能提交：" +
          mismatches.map((m) => `${m.name} 实际=${m.actual}µm / 阻抗表=${m.expected === null ? "缺失" : m.expected + "µm"}`).join("；")
        : "各层铜厚与阻抗表完全一致。",
      layers: mismatches.map((m) => m.layerId),
      mismatches,
    });

    const errors = checks.filter((c) => c.level === "error");
    const warnings = checks.filter((c) => c.level === "warn");
    return {
      checks,
      errors,
      warnings,
      total,
      canSubmit: errors.length === 0, // warning 不拦截
    };
  }

  App.Validation = { validateProject };
})(window);
