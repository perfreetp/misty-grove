<script>
  import { FLAT_ANCHORS, BODY_PARTS } from '../lib/constants.js';

  let {
    moles = [],
    zones = [],
    flaggedIds = [],
    selectedId = $bindable(null),
    onpick = null
  } = $props();

  let side = $state('front');
  const VB_W = 480;
  const VB_H = 470;
  const CX = VB_W / 2;

  // 由部件局部 u/v 换算平面坐标
  function flatPos(mole) {
    const anchor = FLAT_ANCHORS[mole.partId]?.[side];
    if (!anchor) return null;
    const [x0, x1] = anchor.x;
    const [y0, y1] = anchor.y;
    const def = BODY_PARTS.find((p) => p.id === mole.partId);
    let fx;
    if (def.kind === 'cylinder' || def.kind === 'capsule') {
      // u 来自 atan2 角度：前/后面取朝向当前面的一半，按左右投影
      const isLeft = mole.partId.endsWith('L') || x1 < 0;
      fx = isLeft ? 0.78 - mole.u * 0.5 : 0.22 + mole.u * 0.5;
      fx = Math.min(0.95, Math.max(0.05, fx));
    } else {
      fx = mole.u;
    }
    const x = x0 + (x1 - x0) * fx + CX;
    const y = y1 - (y1 - y0) * mole.v; // v=1 在上方
    return { x, y };
  }

  const ZONE_BOXES = [
    // 前/后位的示意分区（x 相对中心）
    { zone: 'HF', sides: ['front'], x: [-26, 26], y: [18, 70] },
    { zone: 'HL', sides: ['back'], x: [-26, 26], y: [18, 70] },
    { zone: 'NF', sides: ['front'], x: [-15, 15], y: [80, 100] },
    { zone: 'NL', sides: ['back'], x: [-15, 15], y: [80, 100] },
    { zone: 'SH', sides: ['front', 'back'], x: [-104, 104], y: [104, 138] },
    { zone: 'CH', sides: ['front'], x: [-72, 72], y: [106, 178] },
    { zone: 'AB', sides: ['front'], x: [-68, 68], y: [178, 246] },
    { zone: 'BK', sides: ['back'], x: [-72, 72], y: [106, 190] },
    { zone: 'LP', sides: ['back'], x: [-68, 68], y: [190, 246] },
    { zone: 'PV', sides: ['front', 'back'], x: [-60, 60], y: [248, 290] },
    { zone: 'UA', sides: ['front', 'back'], x: null, parts: [['upperArmL', -1], ['upperArmR', 1]] },
    { zone: 'EL', sides: ['front', 'back'], x: null, parts: [['elbowL', -1], ['elbowR', 1]] },
    { zone: 'FA', sides: ['front', 'back'], x: null, parts: [['forearmL', -1], ['forearmR', 1]] },
    { zone: 'HD', sides: ['front', 'back'], x: null, parts: [['handL', -1], ['handR', 1]] },
    { zone: 'TH', sides: ['front', 'back'], x: null, parts: [['thighL', -1], ['thighR', 1]] },
    { zone: 'KN', sides: ['front', 'back'], x: null, parts: [['kneeL', -1], ['kneeR', 1]] },
    { zone: 'LG', sides: ['front', 'back'], x: null, parts: [['lowerLegL', -1], ['lowerLegR', 1]] },
    { zone: 'FT', sides: ['front', 'back'], x: null, parts: [['footL', -1], ['footR', 1]] }
  ];

  function boxesOf(zoneId) {
    const spec = ZONE_BOXES.find((b) => b.zone === zoneId);
    if (!spec || !spec.sides.includes(side)) return [];
    if (spec.x) {
      return [{ x: spec.x.map((v) => v + CX), y: spec.y }];
    }
    return spec.parts.map(([partId]) => {
      const a = FLAT_ANCHORS[partId][side];
      return { x: [a.x[0] + CX, a.x[1] + CX], y: a.y };
    });
  }

  function zoneColor(id) {
    return zones.find((z) => z.id === id)?.color || '#33445c';
  }
  function zoneName(id) {
    return zones.find((z) => z.id === id)?.name || id;
  }
  function isFlag(moleId) {
    return flaggedIds.includes(moleId);
  }
  function visibleMoles() {
    return moles
      .map((m) => ({ m, pos: flatPos(m) }))
      .filter((x) => x.pos);
  }
</script>

<div class="flat-map card">
  <div class="row" style="justify-content:space-between">
    <h3 style="margin:0">平面展开痣图（{side === 'front' ? '前位' : '后位'}）</h3>
    <div class="pill-tabs" style="margin:0">
      <button class="sm" class:active={side === 'front'} onclick={() => (side = 'front')}>前位</button>
      <button class="sm" class:active={side === 'back'} onclick={() => (side = 'back')}>后位</button>
    </div>
  </div>
  <svg viewBox="0 0 {VB_W} {VB_H}" class="map-svg">
    <!-- 人体轮廓 -->
    <ellipse cx={CX} cy="46" rx="34" ry="34" fill="#22304a" stroke="#3a4d6e" />
    <rect x={CX - 16} y="78" width="32" height="24" rx="8" fill="#22304a" stroke="#3a4d6e" />
    <path
      d={`M ${CX - 76} 104
          Q ${CX - 96} 112 ${CX - 104} 138
          L ${CX - 116} 372 Q ${CX - 114} 386 ${CX - 100} 388
          L ${CX - 90} 388 Q ${CX - 86} 386 ${CX - 86} 372
          L ${CX - 78} 150
          L ${CX - 62} 296 L ${CX - 60} 452 L ${CX - 16} 452
          L ${CX - 12} 296 L {CX + 12} 296 L {CX + 16} 452
          L {CX + 60} 452 L {CX + 62} 296 L {CX + 78} 150
          L {CX + 86} 372 Q {CX + 86} 386 ${CX + 90} 388
          L {CX + 100} 388 Q ${CX + 114} 386 ${CX + 116} 372
          L {CX + 104} 138 Q ${CX + 96} 112 ${CX + 76} 104 Z`}
      fill="#1b2740"
      stroke="#3a4d6e"
      stroke-width="1.5"
    />
    <!-- 分区 -->
    {#each ZONE_BOXES as spec (spec.zone)}
      {#each boxesOf(spec.zone) as box, i (spec.zone + i)}
        {@const z = zones.find((zz) => zz.id === spec.zone)}
        <rect
          x={box.x[0]} y={box.y[0]}
          width={box.x[1] - box.x[0]} height={box.y[1] - box.y[0]}
          rx="6"
          fill={zoneColor(spec.zone)}
          fill-opacity={z?.active === false ? 0.06 : 0.16}
          stroke={zoneColor(spec.zone)}
          stroke-opacity="0.55"
          stroke-dasharray="4 3"
        >
          <title>{zoneName(spec.zone)}（{spec.zone}）</title>
        </rect>
      {/each}
    {/each}
    <!-- 痣标记 -->
    {#each visibleMoles() as { m, pos } (m.id)}
      <g
        class="mole-g"
        role="button"
        onclick={() => (selectedId = m.id)}
      >
        <circle
          cx={pos.x} cy={pos.y}
          r={m.id === selectedId ? 7 : 5}
          fill={m.removed ? '#6b7c95' : isFlag(m.id) ? '#f0b429' : '#37b26c'}
          stroke="#0f1622" stroke-width="1.5"
        />
        <text x={pos.x + 8} y={pos.y + 3.5} class="mole-label">{m.code}</text>
        <title>{m.code}{isFlag(m.id) ? '（标黄）' : ''}</title>
      </g>
    {/each}
  </svg>
  {#if onpick}
    <div class="small muted">提示：在三维模型上点击表面完成精确定位，平面图同步显示。</div>
  {/if}
</div>

<style>
  .map-svg { width: 100%; height: auto; background: #101a2b; border-radius: 8px; margin-top: 10px; }
  .mole-g { cursor: pointer; }
  .mole-label {
    fill: #dbe6f5; font-size: 9px; font-family: monospace;
    paint-order: stroke; stroke: #0f1622; stroke-width: 2.5px;
  }
</style>
