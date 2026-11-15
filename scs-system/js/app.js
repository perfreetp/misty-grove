/* SCS 术后程控与随访系统 — Vue 3 全局构建版 */
(function () {
  'use strict';

  /* ================= 常量 ================= */
  var DERM = ['C2','C3','C4','C5','C6','C7','C8','T1','T2','T3','T4','T5','T6','T7','T8','T9',
              'T10','T11','T12','L1','L2','L3','L4','L5','S1','S2','S3','S4','S5'];
  var IMPLANT_SEGMENTS = ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12','L1','L2'];
  var BAND_TOP = 40, BAND_BOTTOM = 790;
  var BAND_H = (BAND_BOTTOM - BAND_TOP) / DERM.length;
  var TOTAL_LIMIT = 100;          // 总电流上限 %
  var COVER_FULL = 0.35;          // 单皮节带达到该权重视为完全覆盖
  var SPREAD_SIGMA = 55;          // 电流扩散高斯半径（px）
  var Z_MIN = 400, Z_MAX = 2500;  // 阻抗正常范围 Ω
  var Z_CHANGE = 0.3;             // 阻抗变化告警阈值 30%
  var COV_CHANGE = 20;            // 覆盖率变化告警阈值（百分点）
  var DB_KEY = 'scs_db_v1';

  function bandY0(i) { return BAND_TOP + i * BAND_H; }
  function bandYC(i) { return bandY0(i) + BAND_H / 2; }
  function uid() { return 'id' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function deepCopy(o) { return JSON.parse(JSON.stringify(o)); }

  /* 按植入节段生成触点布局 */
  function genContacts(leadModel, segments) {
    var n = leadModel === 16 ? 16 : 8;
    var cols = leadModel === 16 ? 2 : 1;
    var rows = n / cols;
    var idxs = segments.map(function (s) { return DERM.indexOf(s); })
      .filter(function (i) { return i >= 0; }).sort(function (a, b) { return a - b; });
    var yTop = idxs.length ? bandYC(idxs[0]) - 12 : 300;
    var yBot = idxs.length ? bandYC(idxs[idxs.length - 1]) + 12 : 520;
    var contacts = [];
    for (var c = 0; c < cols; c++) {
      for (var r = 0; r < rows; r++) {
        var y = rows === 1 ? (yTop + yBot) / 2 : yTop + (yBot - yTop) * r / (rows - 1);
        contacts.push({ id: contacts.length + 1, col: c, row: r, y: Math.round(y * 10) / 10, current: 0, polarity: 'off' });
      }
    }
    return contacts;
  }

  function emptyRegForm() {
    return {
      name: '', mrn: '', age: null, sex: '男', physician: '', diagnosis: '',
      implantDate: today(), baselineVas: 7, leadModel: 8, side: 'left', segments: []
    };
  }

  /* ================= 演示数据 ================= */
  function demoDB() {
    var p1contacts = genContacts(8, ['T8', 'T9', 'T10']);
    // 给演示患者一套已配置的触点
    p1contacts[2].polarity = 'cathode'; p1contacts[2].current = 45;
    p1contacts[3].polarity = 'cathode'; p1contacts[3].current = 55;
    p1contacts[4].polarity = 'anode';   p1contacts[4].current = 0;
    p1contacts[1].polarity = 'anode';   p1contacts[1].current = 0;

    var p1 = {
      id: uid(), name: '张建国', mrn: 'ZY20260301', age: 62, sex: '男',
      physician: '王立新', diagnosis: '腰椎术后疼痛综合征(FBSS)',
      baselineVas: 8, createdAt: today(),
      implant: { date: '2026-09-10', leadModel: 8, side: 'left', segments: ['T8', 'T9', 'T10'] },
      painRegions: ['T10', 'T11', 'T12', 'L1'],
      contacts: p1contacts,
      programs: { A: null, B: null, C: null }
    };
    p1.programs.A = {
      contacts: deepCopy(p1contacts), coverageRate: 72, savedAt: '2026-09-15 10:30',
      note: '双阴极宽覆盖，患者异感可耐受'
    };

    var p2contacts = genContacts(16, ['T9', 'T10', 'T11']);
    p2contacts[4].polarity = 'cathode'; p2contacts[4].current = 40;
    p2contacts[5].polarity = 'cathode'; p2contacts[5].current = 35;
    p2contacts[12].polarity = 'anode';  p2contacts[12].current = 25;

    var p2 = {
      id: uid(), name: '李秀兰', mrn: 'ZY20260412', age: 55, sex: '女',
      physician: '陈明远', diagnosis: '带状疱疹后神经痛(T10)',
      baselineVas: 7, createdAt: today(),
      implant: { date: '2026-10-08', leadModel: 16, side: 'right', segments: ['T9', 'T10', 'T11'] },
      painRegions: ['T9', 'T10'],
      contacts: p2contacts,
      programs: { A: null, B: null, C: null }
    };

    var records = [
      { id: uid(), patientId: p1.id, date: '2026-09-15', technician: '刘工', group: 'A',
        paramChanges: '触点#3、#4 阴极 45%/55%，#2、#5 阳极；频率 40Hz，脉宽 300μs',
        vas: 5, status: 'reviewed', reviewer: '王立新', reviewComment: '',
        coverageRate: 72, impedances: { 1: 820, 2: 910, 3: 760, 4: 880, 5: 940, 6: 1010, 7: 870, 8: 990 } },
      { id: uid(), patientId: p1.id, date: '2026-10-20', technician: '刘工', group: 'A',
        paramChanges: '触点#4 电流 55%→60%，余不变',
        vas: 4, status: 'implemented', reviewer: '', reviewComment: '',
        coverageRate: 78, impedances: { 1: 830, 2: 905, 3: 780, 4: 860, 5: 950, 6: 1000, 7: 880, 8: 970 } },
      { id: uid(), patientId: p2.id, date: '2026-10-15', technician: '赵工', group: 'A',
        paramChanges: '双列触点跨列组合，#5、#6 阴极，#13 阳极',
        vas: 4, status: 'reviewed', reviewer: '陈明远', reviewComment: '',
        coverageRate: 81, impedances: { 4: 1200, 5: 1150, 6: 1180, 12: 1300 } }
    ];

    var followups = [
      { id: uid(), patientId: p1.id, date: '2026-10-01', vas: 5, satisfaction: '满意', paresthesia: '覆盖良好', notes: '口服加巴喷丁减量' },
      { id: uid(), patientId: p1.id, date: '2026-11-01', vas: 4, satisfaction: '满意', paresthesia: '覆盖良好', notes: '夜间疼痛明显减轻' },
      { id: uid(), patientId: p2.id, date: '2026-11-05', vas: 4, satisfaction: '非常满意', paresthesia: '覆盖良好', notes: '' }
    ];

    return { patients: [p1, p2], records: records, followups: followups };
  }

  /* ================= Vue 应用 ================= */
  var app = Vue.createApp({
    data: function () {
      var db;
      try { db = JSON.parse(localStorage.getItem(DB_KEY)) || null; } catch (e) { db = null; }
      if (!db || !db.patients) { db = { patients: [], records: [], followups: [] }; }
      return {
        db: db,
        role: 'physician',
        tab: 'register',
        tabs: [
          { key: 'register',  label: '植入登记', icon: '📋' },
          { key: 'electrode', label: '电极配置', icon: '🎛️' },
          { key: 'coverage',  label: '覆盖模拟', icon: '🗺️' },
          { key: 'records',   label: '程控记录', icon: '📝' },
          { key: 'followup',  label: '随访评价', icon: '📈' }
        ],
        currentPatientId: '',
        editingPatientId: '',
        regForm: emptyRegForm(),
        implantSegments: IMPLANT_SEGMENTS,
        dermList: DERM,
        totalLimit: TOTAL_LIMIT,
        zMin: Z_MIN, zMax: Z_MAX,
        blockFlash: false,
        showRecForm: true,
        recForm: { date: today(), technician: '', group: 'A', paramChanges: '', vas: 5, impedances: {} },
        fuForm: { date: today(), vas: 5, satisfaction: '满意', paresthesia: '覆盖良好', notes: '' },
        toast: { show: false, msg: '', type: 'ok' },
        _toastTimer: null
      };
    },

    computed: {
      currentPatient: function () {
        var self = this;
        return this.db.patients.find(function (p) { return p.id === self.currentPatientId; }) || null;
      },
      canRegister: function () { return this.role === 'physician'; },
      canProgram:  function () { return this.role === 'physician' || this.role === 'technician'; },
      canReview:   function () { return this.role === 'physician'; },
      canFollowup: function () { return this.role === 'physician' || this.role === 'nurse'; },

      totalCurrent: function () {
        if (!this.currentPatient) return 0;
        return this.currentPatient.contacts.reduce(function (s, c) {
          return s + (c.polarity === 'off' ? 0 : (c.current || 0));
        }, 0);
      },

      /* 各皮节带覆盖权重 */
      coverageWeights: function () {
        var w = DERM.map(function () { return 0; });
        var p = this.currentPatient;
        if (!p) return w;
        p.contacts.forEach(function (c) {
          if (c.polarity === 'off' || !c.current) return;
          var amp = c.current / 100 * (c.polarity === 'cathode' ? 1 : 0.7);
          for (var i = 0; i < DERM.length; i++) {
            var d = bandYC(i) - c.y;
            w[i] += amp * Math.exp(-(d * d) / (2 * SPREAD_SIGMA * SPREAD_SIGMA));
          }
        });
        return w;
      },

      /* 疼痛区重合率 */
      overlapRate: function () {
        var p = this.currentPatient;
        if (!p || !p.painRegions.length) return null;
        var w = this.coverageWeights, sum = 0;
        p.painRegions.forEach(function (code) {
          var i = DERM.indexOf(code);
          if (i >= 0) sum += Math.min(1, w[i] / COVER_FULL);
        });
        return Math.round(100 * sum / p.painRegions.length);
      },
      overlapClass: function () {
        if (this.overlapRate === null) return '';
        return this.overlapRate >= 60 ? 'ok' : 'low';
      },

      patientRecords: function () {
        var self = this;
        if (!this.currentPatient) return [];
        return this.db.records
          .filter(function (r) { return r.patientId === self.currentPatient.id; })
          .sort(function (a, b) { return a.date < b.date ? -1 : 1; });
      },
      patientFollowups: function () {
        var self = this;
        if (!this.currentPatient) return [];
        return this.db.followups
          .filter(function (f) { return f.patientId === self.currentPatient.id; })
          .sort(function (a, b) { return a.date < b.date ? -1 : 1; });
      },

      /* 程控对比图数据点 */
      chartDots: function () {
        var recs = this.patientRecords;
        if (!recs.length) return [];
        var n = recs.length;
        return recs.map(function (r, i) {
          var x = n === 1 ? 335 : 60 + i * (550 / (n - 1));
          return {
            x: x,
            vas: r.vas,
            vasY: 180 - r.vas * 14,
            cov: r.coverageRate,
            covY: r.coverageRate === null || r.coverageRate === undefined ? null : 180 - r.coverageRate * 1.4,
            shortDate: r.date.slice(5),
            label: r.date
          };
        });
      },

      /* VAS 趋势（基线 + 程控 + 随访） */
      vasTrend: function () {
        var p = this.currentPatient;
        if (!p) return [];
        var pts = [{ date: p.implant.date, vas: p.baselineVas, src: '术前' }];
        this.patientRecords.forEach(function (r) { pts.push({ date: r.date, vas: r.vas, src: '程控' }); });
        this.patientFollowups.forEach(function (f) { pts.push({ date: f.date, vas: f.vas, src: '随访' }); });
        pts.sort(function (a, b) { return a.date < b.date ? -1 : 1; });
        return pts;
      },
      trendDots: function () {
        var pts = this.vasTrend, n = pts.length;
        if (!n) return [];
        return pts.map(function (p, i) {
          return {
            x: n === 1 ? 335 : 60 + i * (550 / (n - 1)),
            y: 165 - p.vas * 13.5,
            vas: p.vas, src: p.src, date: p.date, shortDate: p.date.slice(5)
          };
        });
      },
      trendPoints: function () {
        return this.trendDots.map(function (d) { return d.x + ',' + d.y; }).join(' ');
      },

      /* 医师 VAS 下降统计 */
      physicianStats: function () {
        var self = this;
        var map = {};
        this.db.patients.forEach(function (p) {
          var key = p.physician || '未指定';
          if (!map[key]) map[key] = { physician: key, n: 0, baseSum: 0, latestSum: 0, responders: 0 };
          var latest = self.latestVas(p);
          if (latest === null) return;
          var m = map[key];
          m.n++;
          m.baseSum += p.baselineVas;
          m.latestSum += latest;
          if (p.baselineVas > 0 && (p.baselineVas - latest) / p.baselineVas >= 0.5) m.responders++;
        });
        return Object.keys(map).map(function (k) {
          var m = map[k];
          var avgB = m.baseSum / m.n, avgL = m.latestSum / m.n;
          var drop = avgB - avgL;
          return {
            physician: m.physician, n: m.n,
            avgBaseline: avgB.toFixed(1), avgLatest: avgL.toFixed(1),
            avgDrop: drop.toFixed(1),
            avgDropPct: avgB > 0 ? Math.round(100 * drop / avgB) : 0,
            responders: m.responders
          };
        });
      }
    },

    watch: {
      db: {
        deep: true,
        handler: function (v) {
          try { localStorage.setItem(DB_KEY, JSON.stringify(v)); } catch (e) { /* 存储满等 */ }
        }
      }
    },

    methods: {
      /* ---------- 通用 ---------- */
      showToast: function (msg, type) {
        var self = this;
        this.toast = { show: true, msg: msg, type: type || 'ok' };
        clearTimeout(this._toastTimer);
        this._toastTimer = setTimeout(function () { self.toast.show = false; }, 2600);
      },
      bandY0: bandY0,
      bandYC: bandYC,
      bandH: BAND_H,
      sideLabel: function (s) { return { left: '左侧', right: '右侧', bilateral: '双侧' }[s] || s; },
      statusLabel: function (s) {
        return { draft: '草稿', implemented: '已实施', reviewed: '已复核', returned: '已退回' }[s] || s;
      },
      selectPatient: function (id) { this.currentPatientId = id; },
      loadDemo: function () {
        this.db = demoDB();
        this.currentPatientId = this.db.patients[0].id;
        this.showToast('已载入演示数据');
      },

      /* ---------- 模块一：植入登记 ---------- */
      saveRegistration: function () {
        var f = this.regForm;
        if (!f.name || !f.mrn) { this.showToast('请填写姓名和病历号', 'warn'); return; }
        if (!f.segments.length) { this.showToast('请选择植入节段', 'warn'); return; }
        var segs = f.segments.slice().sort(function (a, b) {
          return DERM.indexOf(a) - DERM.indexOf(b);
        });
        if (this.editingPatientId) {
          var p = this.db.patients.find(function (x) { return x.id === f._editId; });
          if (!p) return;
          p.name = f.name; p.mrn = f.mrn; p.age = f.age; p.sex = f.sex;
          p.physician = f.physician; p.diagnosis = f.diagnosis; p.baselineVas = f.baselineVas;
          p.implant = { date: f.implantDate, leadModel: f.leadModel, side: f.side, segments: segs };
          p.contacts = genContacts(f.leadModel, segs);
          p.programs = { A: null, B: null, C: null };
          this.showToast('已保存修改，触点布局已重建');
        } else {
          var np = {
            id: uid(), name: f.name, mrn: f.mrn, age: f.age, sex: f.sex,
            physician: f.physician, diagnosis: f.diagnosis,
            baselineVas: f.baselineVas, createdAt: today(),
            implant: { date: f.implantDate, leadModel: f.leadModel, side: f.side, segments: segs },
            painRegions: [],
            contacts: genContacts(f.leadModel, segs),
            programs: { A: null, B: null, C: null }
          };
          this.db.patients.push(np);
          this.currentPatientId = np.id;
          this.showToast('登记成功，已生成 ' + f.leadModel + ' 触点布局');
        }
        this.resetRegForm();
      },
      editPatient: function (p) {
        this.editingPatientId = p.id;
        this.regForm = {
          _editId: p.id, name: p.name, mrn: p.mrn, age: p.age, sex: p.sex,
          physician: p.physician, diagnosis: p.diagnosis, implantDate: p.implant.date,
          baselineVas: p.baselineVas, leadModel: p.implant.leadModel,
          side: p.implant.side, segments: p.implant.segments.slice()
        };
      },
      resetRegForm: function () { this.editingPatientId = ''; this.regForm = emptyRegForm(); },
      deletePatient: function (p) {
        if (!confirm('确认删除患者「' + p.name + '」？其程控记录与随访将一并删除。')) return;
        this.db.patients = this.db.patients.filter(function (x) { return x.id !== p.id; });
        this.db.records = this.db.records.filter(function (r) { return r.patientId !== p.id; });
        this.db.followups = this.db.followups.filter(function (f) { return f.patientId !== p.id; });
        if (this.currentPatientId === p.id) this.currentPatientId = '';
        this.showToast('已删除');
      },

      /* ---------- 模块二：电极配置 ---------- */
      contactX: function (c) {
        var p = this.currentPatient;
        var cols = p.implant.leadModel === 16 ? 2 : 1;
        if (cols === 1) {
          // 单列：按侧别偏移
          return p.implant.side === 'right' ? 165 : (p.implant.side === 'left' ? 95 : 130);
        }
        // 双列
        if (p.implant.side === 'left')  return c.col === 0 ? 70 : 110;
        if (p.implant.side === 'right') return c.col === 0 ? 150 : 190;
        return c.col === 0 ? 90 : 170;
      },
      cyclePolarity: function (c) {
        if (!this.canProgram) { this.showToast('当前角色不可调整参数', 'warn'); return; }
        var order = ['off', 'cathode', 'anode'];
        c.polarity = order[(order.indexOf(c.polarity) + 1) % order.length];
      },
      polaritySymbol: function (c) {
        return c.polarity === 'cathode' ? '−' : (c.polarity === 'anode' ? '+' : '');
      },
      polarityLabel: function (c) {
        return c.polarity === 'cathode' ? '阴极 −' : (c.polarity === 'anode' ? '阳极 +' : '关闭');
      },
      onCurrentInput: function (c, ev) {
        var v = Math.max(0, Math.min(100, +ev.target.value || 0));
        var others = this.currentPatient.contacts.reduce(function (s, x) {
          return s + (x === c || x.polarity === 'off' ? 0 : (x.current || 0));
        }, 0);
        var allowed = TOTAL_LIMIT - others;
        if (v > allowed) {
          v = Math.max(0, allowed);
          ev.target.value = v;
          this.flashBlocked();
        }
        c.current = v;
      },
      flashBlocked: function () {
        var self = this;
        this.blockFlash = true;
        clearTimeout(this._blockTimer);
        this._blockTimer = setTimeout(function () { self.blockFlash = false; }, 1200);
      },
      allOff: function () {
        this.currentPatient.contacts.forEach(function (c) { c.polarity = 'off'; });
      },
      resetCurrents: function () {
        this.currentPatient.contacts.forEach(function (c) { c.current = 0; });
      },

      /* ---------- 模块三：覆盖模拟 ---------- */
      coverageOpacity: function (i) {
        var w = this.coverageWeights[i];
        return Math.min(0.75, w * 1.6);
      },
      isPain: function (code) {
        return this.currentPatient && this.currentPatient.painRegions.indexOf(code) >= 0;
      },
      togglePain: function (code) {
        var p = this.currentPatient;
        if (!p) return;
        var i = p.painRegions.indexOf(code);
        if (i >= 0) p.painRegions.splice(i, 1);
        else p.painRegions.push(code);
        p.painRegions.sort(function (a, b) { return DERM.indexOf(a) - DERM.indexOf(b); });
      },
      bodyContactX: function (c) {
        var p = this.currentPatient;
        var cols = p.implant.leadModel === 16 ? 2 : 1;
        if (cols === 1) {
          return p.implant.side === 'right' ? 230 : (p.implant.side === 'left' ? 170 : 200);
        }
        if (p.implant.side === 'left')  return c.col === 0 ? 150 : 175;
        if (p.implant.side === 'right') return c.col === 0 ? 225 : 250;
        return c.col === 0 ? 175 : 225;
      },
      saveProgram: function (g) {
        var p = this.currentPatient;
        var note = prompt('程序 ' + g + ' 备注（可留空）', (p.programs[g] && p.programs[g].note) || '');
        if (note === null) return;
        var now = new Date();
        p.programs[g] = {
          contacts: deepCopy(p.contacts),
          coverageRate: this.overlapRate,
          savedAt: now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' +
                   String(now.getDate()).padStart(2, '0') + ' ' +
                   String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0'),
          note: note
        };
        this.showToast('程序 ' + g + ' 已保存（重合率 ' + (this.overlapRate === null ? '—' : this.overlapRate + '%') + '）');
      },
      loadProgram: function (g) {
        var p = this.currentPatient;
        if (!p.programs[g]) return;
        p.contacts = deepCopy(p.programs[g].contacts);
        this.showToast('已调入程序 ' + g);
      },
      deleteProgram: function (g) {
        if (!confirm('删除程序 ' + g + '？')) return;
        this.currentPatient.programs[g] = null;
      },
      exportCoverageSVG: function () {
        var svg = this.$refs.bodySvg;
        if (!svg) return;
        var clone = svg.cloneNode(true);
        clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        // 内联关键样式，保证独立打开时可见
        var style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
        style.textContent =
          'text{font-family:sans-serif}.body-outline circle,.body-outline path{fill:none;stroke:#475569;stroke-width:1.6}' +
          '.derm-label{font-size:10px;fill:#64748b}.contact-no{font-size:11px;fill:#64748b}';
        clone.insertBefore(style, clone.firstChild);
        var title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        title.setAttribute('x', '200'); title.setAttribute('y', '816');
        title.setAttribute('text-anchor', 'middle'); title.setAttribute('font-size', '12');
        title.textContent = this.currentPatient.name + ' 覆盖模拟图 ' + today() +
          ' 重合率 ' + (this.overlapRate === null ? '—' : this.overlapRate + '%');
        clone.appendChild(title);
        var blob = new Blob([new XMLSerializer().serializeToString(clone)], { type: 'image/svg+xml' });
        this.download(blob, this.currentPatient.name + '_覆盖图_' + today() + '.svg');
      },

      /* ---------- 模块四：程控记录 ---------- */
      saveRecord: function (status) {
        var p = this.currentPatient, f = this.recForm;
        if (!f.date) { this.showToast('请填写日期', 'warn'); return; }
        if (!f.technician) { this.showToast('请填写技师姓名', 'warn'); return; }
        var impedances = {};
        p.contacts.forEach(function (c) {
          var v = +f.impedances[c.id];
          if (v > 0) impedances[c.id] = v;
        });
        this.db.records.push({
          id: uid(), patientId: p.id, date: f.date, technician: f.technician,
          group: f.group, paramChanges: f.paramChanges, vas: f.vas,
          status: status, reviewer: '', reviewComment: '',
          coverageRate: this.overlapRate,
          impedances: impedances,
          contactsSnapshot: deepCopy(p.contacts)
        });
        this.recForm.paramChanges = '';
        this.showToast(status === 'draft' ? '草稿已保存' : '程控单已保存并标记已实施');
      },
      setStatus: function (r, status) {
        r.status = status;
        if (status === 'reviewed') { r.reviewer = this.reviewerName(); r.reviewComment = ''; }
        this.showToast('状态已更新为「' + this.statusLabel(status) + '」');
      },
      returnRecord: function (r) {
        var comment = prompt('退回意见（必填）：');
        if (!comment) { this.showToast('已取消退回', 'warn'); return; }
        r.status = 'returned';
        r.reviewComment = comment;
        r.reviewer = this.reviewerName();
        this.showToast('已退回，意见已记录', 'warn');
      },
      reviewerName: function () {
        return (this.currentPatient && this.currentPatient.physician) || '医师';
      },
      deleteRecord: function (r) {
        if (!confirm('删除该程控记录？')) return;
        this.db.records = this.db.records.filter(function (x) { return x.id !== r.id; });
      },
      prevRecord: function (r) {
        var recs = this.patientRecords;
        var i = recs.indexOf(r);
        return i > 0 ? recs[i - 1] : null;
      },
      recordFlags: function (r) {
        var flags = [];
        var zs = Object.keys(r.impedances || {}).map(function (k) { return r.impedances[k]; });
        if (zs.some(function (z) { return z < Z_MIN || z > Z_MAX; })) {
          flags.push('阻抗超出正常范围(' + Z_MIN + '-' + Z_MAX + 'Ω)');
        }
        var prev = this.prevRecord(r);
        if (prev) {
          var jump = Object.keys(r.impedances || {}).some(function (k) {
            var a = prev.impedances && prev.impedances[k], b = r.impedances[k];
            return a > 0 && b > 0 && Math.abs(b - a) / a > Z_CHANGE;
          });
          if (jump) flags.push('阻抗较上次变化>' + (Z_CHANGE * 100) + '%');
          if (r.coverageRate !== null && r.coverageRate !== undefined &&
              prev.coverageRate !== null && prev.coverageRate !== undefined &&
              Math.abs(r.coverageRate - prev.coverageRate) > COV_CHANGE) {
            flags.push('覆盖率变化>' + COV_CHANGE + '%（' + prev.coverageRate + '%→' + r.coverageRate + '%）');
          }
        }
        return flags;
      },
      chartPoints: function (kind) {
        return this.chartDots.map(function (d) {
          var y = kind === 'vas' ? d.vasY : (d.covY === null ? 180 : d.covY);
          return d.x + ',' + y;
        }).join(' ');
      },
      exportRecordsCSV: function () {
        var p = this.currentPatient;
        var rows = [['日期', '技师', '程序组', 'VAS', '重合率%', '状态', '复核人', '复核意见', '参数变化', '阻抗(Ω)']];
        this.patientRecords.forEach(function (r) {
          var z = Object.keys(r.impedances || {}).map(function (k) { return '#' + k + ':' + r.impedances[k]; }).join(' ');
          rows.push([r.date, r.technician, r.group, r.vas,
            r.coverageRate === null ? '' : r.coverageRate,
            { draft: '草稿', implemented: '已实施', reviewed: '已复核', returned: '已退回' }[r.status] || r.status,
            r.reviewer || '', (r.reviewComment || '').replace(/[\r\n,]/g, ' '),
            (r.paramChanges || '').replace(/[\r\n,]/g, ' '), z]);
        });
        var csv = '﻿' + rows.map(function (r) { return r.join(','); }).join('\r\n');
        this.download(new Blob([csv], { type: 'text/csv;charset=utf-8' }),
          p.name + '_程控记录_' + today() + '.csv');
      },
      exportPatientJSON: function () {
        var p = this.currentPatient;
        var data = {
          patient: p,
          records: this.patientRecords,
          followups: this.patientFollowups,
          exportedAt: new Date().toISOString()
        };
        this.download(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }),
          p.name + '_数据_' + today() + '.json');
      },

      /* ---------- 模块五：随访评价 ---------- */
      saveFollowup: function () {
        var p = this.currentPatient, f = this.fuForm;
        if (!f.date) { this.showToast('请填写日期', 'warn'); return; }
        this.db.followups.push({
          id: uid(), patientId: p.id, date: f.date, vas: f.vas,
          satisfaction: f.satisfaction, paresthesia: f.paresthesia, notes: f.notes
        });
        this.fuForm.notes = '';
        this.showToast('随访已保存');
      },
      deleteFollowup: function (f) {
        if (!confirm('删除该随访记录？')) return;
        this.db.followups = this.db.followups.filter(function (x) { return x.id !== f.id; });
      },
      vasDropPct: function (f) {
        var p = this.currentPatient;
        if (!p || !p.baselineVas) return null;
        return Math.round(100 * (p.baselineVas - f.vas) / p.baselineVas);
      },
      latestVas: function (p) {
        var dates = [];
        this.db.followups.forEach(function (f) { if (f.patientId === p.id) dates.push({ d: f.date, v: f.vas }); });
        this.db.records.forEach(function (r) { if (r.patientId === p.id) dates.push({ d: r.date, v: r.vas }); });
        if (!dates.length) return null;
        dates.sort(function (a, b) { return a.d < b.d ? -1 : 1; });
        return dates[dates.length - 1].v;
      },

      /* ---------- 导出工具 ---------- */
      download: function (blob, filename) {
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
          URL.revokeObjectURL(a.href);
          a.remove();
        }, 100);
      }
    }
  });

  // 挂载并把根实例代理暴露到 window，便于控制台调试与自动化测试
  window.__scsApp = app.mount('#app');
})();
