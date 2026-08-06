/* ============================================================
   GEM MARKETING OS — Application
   ============================================================ */

(function () {
  const GEM = window.GEM;
  const $ = (sel, el) => (el || document).querySelector(sel);
  const $$ = (sel, el) => Array.from((el || document).querySelectorAll(sel));

  /* ---------------- Settings ---------------- */
  const DEFAULT_SETTINGS = {
    name: "", nmls: "", companyNmls: "330511", states: "CA",
    handle: "@gemhometeam", phone: "", email: "", city: "San Diego"
  };

  GEM.getSettings = function () {
    try {
      return Object.assign({}, DEFAULT_SETTINGS, JSON.parse(localStorage.getItem("gem-settings") || "{}"));
    } catch (e) { return Object.assign({}, DEFAULT_SETTINGS); }
  };
  GEM.saveSettings = function (s) {
    localStorage.setItem("gem-settings", JSON.stringify(s));
  };

  function personalize(text) {
    const s = GEM.getSettings();
    return text
      .replaceAll("{NAME}", s.name || "[Your Name]")
      .replaceAll("{NMLS}", s.nmls || "[NMLS #]")
      .replaceAll("{HANDLE}", s.handle || "@gemhometeam")
      .replaceAll("{STATE}", s.states || "[Your State]");
  }

  /* ---------------- Navigation ---------------- */
  function switchTab(id) {
    $$(".nav-item").forEach(b => b.classList.toggle("active", b.dataset.tab === id));
    $$(".panel").forEach(p => p.classList.toggle("active", p.id === "panel-" + id));
    window.scrollTo({ top: 0 });
    localStorage.setItem("gem-tab", id);
  }

  /* ---------------- Utilities ---------------- */
  function copyText(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
      if (btn) {
        const old = btn.textContent;
        btn.textContent = "✓ Copied!";
        btn.classList.add("copied");
        setTimeout(() => { btn.textContent = old; btn.classList.remove("copied"); }, 1600);
      }
    });
  }
  window.gemCopy = copyText;

  function download(filename, content, mime) {
    const blob = new Blob([content], { type: mime || "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function hashtagBlock(keys) {
    const tags = [];
    (keys || []).forEach(k => { if (GEM.hashtags[k]) tags.push(...GEM.hashtags[k].tags); });
    return [...new Set(tags)].slice(0, 25).join(" ");
  }

  function fullPost(topic) {
    return personalize(
      topic.hooks[0] + "\n\n" + topic.caption + "\n\n" + topic.cta +
      "\n\n" + hashtagBlock(topic.hashtagKeys) + "\n\n" + GEM.buildDisclaimer()
    );
  }

  /* ---------------- Calendar ---------------- */
  let calYear, calMonth; // current view

  function topicsForPillar(p) { return GEM.topics.filter(t => t.pillar === p); }

  /* Deterministic topic pick: rotates by week-of-year so a month regenerates identically */
  function planForDate(d) {
    const dow = d.getDay();
    const slot = GEM.weekTemplate.find(w => w.dow === dow);
    if (!slot) return null;
    let pillar = slot.pillar;
    // Alternate Wednesdays: realtor-partner content (week number parity)
    const weekNum = Math.floor((d.getTime() / 86400000 + 4) / 7);
    if (dow === 3 && weekNum % 2 === 0) pillar = "realtor";
    const pool = topicsForPillar(pillar);
    if (!pool.length) return null;
    const seed = d.getFullYear() * 373 + weekNum * 7 + dow;
    const topic = pool[seed % pool.length];
    return { date: d, pillar, format: slot.format, time: slot.time, note: slot.note, topic };
  }

  function monthPlan(year, month) {
    const days = [];
    const last = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= last; i++) {
      const d = new Date(year, month, i);
      const plan = planForDate(d);
      if (plan) days.push(plan);
    }
    return days;
  }

  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const FORMAT_ICONS = { Reel: "🎬", Carousel: "🖼️", Static: "📷", Story: "💬", Live: "🔴" };

  function renderCalendar() {
    $("#cal-title").textContent = MONTHS[calMonth] + " " + calYear;
    const grid = $("#cal-grid");
    grid.innerHTML = "";
    ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].forEach(d => {
      const h = document.createElement("div");
      h.className = "cal-dow"; h.textContent = d;
      grid.appendChild(h);
    });
    const firstDow = new Date(calYear, calMonth, 1).getDay();
    for (let i = 0; i < firstDow; i++) {
      const pad = document.createElement("div");
      pad.className = "cal-cell empty";
      grid.appendChild(pad);
    }
    const last = new Date(calYear, calMonth + 1, 0).getDate();
    const today = new Date();
    for (let i = 1; i <= last; i++) {
      const d = new Date(calYear, calMonth, i);
      const plan = planForDate(d);
      const cell = document.createElement("div");
      cell.className = "cal-cell";
      if (d.toDateString() === today.toDateString()) cell.classList.add("today");
      const num = document.createElement("div");
      num.className = "cal-num"; num.textContent = i;
      cell.appendChild(num);
      if (plan) {
        const pillar = GEM.pillars[plan.pillar];
        const chip = document.createElement("div");
        chip.className = "cal-chip";
        chip.style.setProperty("--chip", pillar.color);
        chip.innerHTML = `<span class="chip-fmt">${FORMAT_ICONS[plan.format] || ""}</span><span class="chip-label">${pillar.label}</span>`;
        const title = document.createElement("div");
        title.className = "cal-topic";
        title.textContent = plan.topic.title;
        cell.appendChild(chip);
        cell.appendChild(title);
        cell.classList.add("has-post");
        cell.addEventListener("click", () => openStudioWithTopic(plan.topic.id));
      }
      grid.appendChild(cell);
    }
    // Legend
    const leg = $("#cal-legend");
    leg.innerHTML = Object.values(GEM.pillars).map(p =>
      `<span class="legend-item"><span class="legend-dot" style="background:${p.color}"></span>${p.icon} ${p.label}</span>`
    ).join("");
  }

  function exportCalendarCSV() {
    const plan = monthPlan(calYear, calMonth);
    const rows = [["Date","Time","Format","Pillar","Topic","Caption"]];
    plan.forEach(p => {
      const dateStr = `${p.date.getFullYear()}-${String(p.date.getMonth()+1).padStart(2,"0")}-${String(p.date.getDate()).padStart(2,"0")}`;
      const caption = fullPost(p.topic).replace(/"/g, '""');
      rows.push([dateStr, p.time, p.format, GEM.pillars[p.pillar].label, p.topic.title.replace(/"/g,'""'), caption]);
    });
    const csv = rows.map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    download(`gem-content-${calYear}-${String(calMonth+1).padStart(2,"0")}.csv`, csv, "text/csv");
  }

  /* ---------------- Content Studio ---------------- */
  let currentTopic = null;
  let currentHook = 0;

  function renderPillarButtons() {
    const wrap = $("#studio-pillars");
    wrap.innerHTML = "";
    Object.entries(GEM.pillars).forEach(([key, p]) => {
      const b = document.createElement("button");
      b.className = "pillar-btn";
      b.style.setProperty("--pc", p.color);
      b.innerHTML = `<span class="pillar-icon">${p.icon}</span><span>${p.label}</span>`;
      b.addEventListener("click", () => {
        $$(".pillar-btn", wrap).forEach(x => x.classList.remove("active"));
        b.classList.add("active");
        renderTopicList(key);
      });
      wrap.appendChild(b);
    });
  }

  function renderTopicList(pillar) {
    const wrap = $("#studio-topics");
    wrap.innerHTML = "";
    topicsForPillar(pillar).forEach(t => {
      const b = document.createElement("button");
      b.className = "topic-btn";
      b.innerHTML = `<span class="topic-fmt">${FORMAT_ICONS[t.format] || ""} ${t.format}</span> ${t.title}`;
      b.addEventListener("click", () => { renderStudioOutput(t); $$(".topic-btn", wrap).forEach(x=>x.classList.remove("active")); b.classList.add("active"); });
      wrap.appendChild(b);
    });
    wrap.parentElement.classList.remove("hidden");
  }

  function openStudioWithTopic(topicId) {
    switchTab("studio");
    const t = GEM.topics.find(x => x.id === topicId);
    if (!t) return;
    // Activate pillar button + topic list
    const wrap = $("#studio-pillars");
    $$(".pillar-btn", wrap).forEach((b, i) => {
      const key = Object.keys(GEM.pillars)[i];
      b.classList.toggle("active", key === t.pillar);
    });
    renderTopicList(t.pillar);
    renderStudioOutput(t);
  }

  function renderStudioOutput(topic) {
    currentTopic = topic; currentHook = 0;
    const out = $("#studio-output");
    out.classList.remove("hidden");
    renderStudioContent();
    out.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderStudioContent() {
    const t = currentTopic;
    if (!t) return;
    const pillar = GEM.pillars[t.pillar];
    $("#out-meta").innerHTML =
      `<span class="badge" style="--chip:${pillar.color}">${pillar.icon} ${pillar.label}</span>
       <span class="badge fmt">${FORMAT_ICONS[t.format]} ${t.format}</span>`;
    $("#out-title").textContent = t.title;

    // Hooks
    const hooksEl = $("#out-hooks");
    hooksEl.innerHTML = t.hooks.map((h, i) =>
      `<button class="hook-opt ${i === currentHook ? "active" : ""}" data-i="${i}">${personalize(h)}</button>`
    ).join("");
    $$(".hook-opt", hooksEl).forEach(b => b.addEventListener("click", () => { currentHook = +b.dataset.i; renderStudioContent(); }));

    // Caption assembly
    const caption = personalize(t.hooks[currentHook] + "\n\n" + t.caption + "\n\n" + t.cta);
    const tags = hashtagBlock(t.hashtagKeys);
    const footer = GEM.buildDisclaimer();
    const full = caption + "\n\n" + tags + "\n\n" + footer;

    $("#out-caption").textContent = caption;
    $("#out-tags").textContent = tags;
    $("#out-footer").textContent = footer;
    $("#out-design").textContent = t.designBrief;

    // Compliance check
    const res = GEM.checkCompliance(full);
    const badge = $("#out-compliance");
    badge.className = "comp-badge " + res.status;
    badge.innerHTML = res.status === "pass"
      ? "✅ Compliance check passed"
      : (res.status === "warn" ? "⚠️ Review notes below" : "⛔ Issues found — see below");
    const list = $("#out-comp-findings");
    list.innerHTML = res.findings.map(f =>
      `<li class="finding ${f.level}"><strong>${f.label}</strong><span>${f.why}</span></li>`
    ).join("");

    $("#out-copy-full").onclick = (e) => copyText(full, e.target);
    $("#out-copy-caption").onclick = (e) => copyText(caption, e.target);
    $("#out-copy-tags").onclick = (e) => copyText(tags, e.target);
    $("#out-copy-footer").onclick = (e) => copyText(footer, e.target);
  }

  function shuffleTopic() {
    const t = GEM.topics[Math.floor(Math.random() * GEM.topics.length)];
    openStudioWithTopic(t.id);
  }

  /* ---------------- Reel Studio ---------------- */
  function renderReels() {
    const wrap = $("#reel-list");
    wrap.innerHTML = "";
    GEM.reels.forEach(r => {
      const b = document.createElement("button");
      b.className = "reel-card";
      b.innerHTML = `<div class="reel-title">🎬 ${r.title}</div>
        <div class="reel-meta">${r.length} · ${r.difficulty}</div>`;
      b.addEventListener("click", () => renderReelDetail(r, b));
      wrap.appendChild(b);
    });
  }

  function renderReelDetail(r, btn) {
    $$(".reel-card").forEach(x => x.classList.remove("active"));
    if (btn) btn.classList.add("active");
    const out = $("#reel-output");
    out.classList.remove("hidden");
    $("#reel-out-title").textContent = r.title;
    $("#reel-out-meta").innerHTML =
      `<span class="badge fmt">⏱ ${r.length}</span><span class="badge fmt">🎯 ${r.difficulty}</span>`;
    $("#reel-audio").textContent = r.audio;
    $("#reel-cover").textContent = r.cover;
    const tbl = $("#reel-scenes");
    tbl.innerHTML = `<div class="scene-row scene-head"><div>TIME</div><div>SHOT</div><div>SAY</div><div>ON-SCREEN TEXT</div></div>` +
      r.scenes.map(s =>
        `<div class="scene-row"><div class="scene-time">${s.time}</div><div>${s.shot}</div><div>${s.vo}</div><div class="scene-text">${s.text}</div></div>`
      ).join("");
    const script = `🎬 ${r.title} (${r.length})\nAUDIO: ${r.audio}\nCOVER: ${r.cover}\n\n` +
      r.scenes.map(s => `[${s.time}] ${s.shot}\n  SAY: ${s.vo}\n  TEXT: ${s.text}`).join("\n\n");
    $("#reel-copy").onclick = (e) => copyText(script, e.target);
    out.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ---------------- Compliance Center ---------------- */
  function runComplianceCheck() {
    const text = $("#comp-input").value;
    if (!text.trim()) return;
    const res = GEM.checkCompliance(text);
    const out = $("#comp-results");
    out.classList.remove("hidden");
    const badge = $("#comp-status");
    badge.className = "comp-badge big " + res.status;
    badge.textContent = res.status === "pass" ? "✅ PASSED — no issues detected"
      : res.status === "warn" ? "⚠️ REVIEW — warnings found"
      : "⛔ FAILED — fix before posting";
    const list = $("#comp-findings");
    if (!res.findings.length) {
      list.innerHTML = `<li class="finding pass"><strong>All checks passed</strong><span>NMLS ID and Equal Housing statement found. No prohibited claims or Reg Z triggering terms detected. Remember: your company compliance team always has the final word.</span></li>`;
    } else {
      list.innerHTML = res.findings.map(f => {
        const fix = GEM.complianceFixes[f.id] || "";
        return `<li class="finding ${f.level}"><strong>${f.level === "fail" ? "⛔" : "⚠️"} ${f.label}</strong><span>${f.why}</span>${fix ? `<span class="fix">💡 ${fix}</span>` : ""}</li>`;
      }).join("");
    }
  }

  function applyAutoFix() {
    const el = $("#comp-input");
    el.value = GEM.autoFix(el.value);
    runComplianceCheck();
  }

  function renderRulebook() {
    const wrap = $("#comp-rulebook");
    const section = (title, rules, cls) =>
      `<h4 class="rule-head ${cls}">${title}</h4>` +
      rules.map(r => `<div class="rule-item ${cls}"><strong>${r.label}</strong><span>${r.why}</span></div>`).join("");
    wrap.innerHTML =
      section("✅ Required on every promotional post", GEM.complianceRules.required, "req") +
      section("⛔ Never say (prohibited claims)", GEM.complianceRules.prohibited, "fail") +
      section("⚠️ Triggering terms (Reg Z — require full disclosures)", GEM.complianceRules.triggers, "warn") +
      section("👀 Handle with care", GEM.complianceRules.cautions, "caution");
  }

  /* ---------------- Hashtags ---------------- */
  function renderHashtags() {
    const wrap = $("#hashtag-sets");
    wrap.innerHTML = "";
    Object.values(GEM.hashtags).forEach(set => {
      const card = document.createElement("div");
      card.className = "tag-card";
      const tags = set.tags.join(" ");
      card.innerHTML = `<div class="tag-head"><h4>${set.label}</h4><button class="btn small">Copy set</button></div>
        <div class="tag-list">${set.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>`;
      $("button", card).addEventListener("click", (e) => copyText(tags, e.target));
      wrap.appendChild(card);
    });
  }

  /* ---------------- Brand Kit ---------------- */
  function renderBrandKit() {
    const colors = $("#brand-colors");
    const entries = [
      ["Gem Navy", GEM.brand.colors.navy, "Primary background — every branded asset"],
      ["Deep Ink", GEM.brand.colors.ink, "Darker sections, gradients"],
      ["Gem Blue", GEM.brand.colors.blue, "Accents, icons, highlights, CTAs"],
      ["Deep Blue", GEM.brand.colors.blueDeep, "Hover states, secondary accents"],
      ["White", GEM.brand.colors.white, "Headlines and body on navy"],
      ["Mist", GEM.brand.colors.mist, "Secondary text on navy"],
      ["Gem Gold", GEM.brand.colors.gold, "Wealth/equity moments ONLY — use sparingly"]
    ];
    colors.innerHTML = entries.map(([name, hex, use]) =>
      `<button class="swatch" title="Click to copy ${hex}" data-hex="${hex}">
        <span class="swatch-chip" style="background:${hex}; ${hex === "#FFFFFF" ? "border:1px solid #2a4a58" : ""}"></span>
        <span class="swatch-name">${name}</span>
        <span class="swatch-hex">${hex}</span>
        <span class="swatch-use">${use}</span>
      </button>`).join("");
    $$(".swatch", colors).forEach(b => b.addEventListener("click", () => copyText(b.dataset.hex, $(".swatch-hex", b))));

    const team = $("#brand-team");
    if (team && GEM.team) {
      team.innerHTML = GEM.team.map(m =>
        `<div class="tool-card"><strong>${m.name}</strong><span>${m.role}${m.nmls ? " · NMLS #" + m.nmls : ""}</span></div>`).join("");
      $("#brand-office").innerHTML =
        `${GEM.office} · <a href="${GEM.links.website}" target="_blank" rel="noopener" style="color:var(--blue)">gemhometeam.com</a> · <a href="${GEM.links.facebook}" target="_blank" rel="noopener" style="color:var(--blue)">Facebook</a>. Verify each member's NMLS ID before publishing — update the roster in js/data.js.`;
    }

    const canva = $("#brand-canva");
    if (canva && GEM.canvaTemplates) {
      canva.innerHTML = GEM.canvaTemplates.map(t =>
        `<a class="tool-card" style="display:block;text-decoration:none" href="${t.url}" target="_blank" rel="noopener"><strong>${t.name} ↗</strong><span>${t.use}</span></a>`).join("");
    }

    const prin = $("#brand-principles");
    prin.innerHTML = GEM.designPlaybook.principles.map((p, i) =>
      `<div class="principle"><span class="principle-num">${String(i + 1).padStart(2, "0")}</span>
        <div><strong>${p.title}</strong><p>${p.body}</p></div></div>`).join("");

    $("#brand-formula").innerHTML = GEM.designPlaybook.reelFormula.map(f => `<li>${f}</li>`).join("");
  }

  /* ---------------- Automation Hub ---------------- */
  function renderAutomation() {
    const tools = $("#auto-tools");
    tools.innerHTML = GEM.designPlaybook.tools.map(t =>
      `<div class="tool-card"><strong>${t.name}</strong><span>${t.use}</span></div>`).join("");
  }

  function exportBufferCSV() {
    // Buffer/Later-compatible: text + date columns for the current + next month
    const rows = [["text", "date"]];
    [0, 1].forEach(off => {
      const m = new Date(calYear, calMonth + off, 1);
      monthPlan(m.getFullYear(), m.getMonth()).forEach(p => {
        const dateStr = `${p.date.getFullYear()}-${String(p.date.getMonth()+1).padStart(2,"0")}-${String(p.date.getDate()).padStart(2,"0")} ${p.time}`;
        rows.push([fullPost(p.topic).replace(/"/g, '""'), dateStr]);
      });
    });
    const csv = rows.map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    download("gem-schedule-import.csv", csv, "text/csv");
  }

  /* ---------------- Dashboard ---------------- */
  function renderDashboard() {
    const s = GEM.getSettings();
    $("#dash-greeting").textContent = s.name ? `Welcome back, ${s.name.split(" ")[0]} 👋` : "Welcome to your Marketing OS 👋";

    // Setup nudge
    const nudge = $("#dash-nudge");
    if (!s.nmls || !s.name) {
      nudge.classList.remove("hidden");
    } else nudge.classList.add("hidden");

    // Today + next 7 days
    const today = new Date();
    const plan = planForDate(today);
    const todayEl = $("#dash-today");
    if (plan) {
      const pillar = GEM.pillars[plan.pillar];
      todayEl.innerHTML = `
        <div class="today-chip" style="--chip:${pillar.color}">${pillar.icon} ${pillar.label} · ${FORMAT_ICONS[plan.format]} ${plan.format} · post at ${plan.time}</div>
        <h3>${plan.topic.title}</h3>
        <p>${plan.note}</p>
        <button class="btn primary" id="dash-open-today">Generate this post →</button>`;
      $("#dash-open-today").addEventListener("click", () => openStudioWithTopic(plan.topic.id));
    } else {
      todayEl.innerHTML = `<h3>Rest day 😌</h3><p>No feed post scheduled — run your story playbook and clear your DMs.</p>`;
    }

    const week = $("#dash-week");
    let html = "";
    for (let i = 1; i <= 7; i++) {
      const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
      const p = planForDate(d);
      if (!p) continue;
      const pillar = GEM.pillars[p.pillar];
      html += `<button class="week-row" data-topic="${p.topic.id}">
        <span class="week-day">${["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()]} ${d.getDate()}</span>
        <span class="week-chip" style="--chip:${pillar.color}">${pillar.icon}</span>
        <span class="week-title">${FORMAT_ICONS[p.format]} ${p.topic.title}</span>
        <span class="week-time">${p.time}</span>
      </button>`;
    }
    week.innerHTML = html;
    $$(".week-row", week).forEach(b => b.addEventListener("click", () => openStudioWithTopic(b.dataset.topic)));

    // Story playbook
    $("#dash-stories").innerHTML = GEM.storyPlaybook.map(s2 => `<li>${s2}</li>`).join("");

    // Stats
    $("#stat-topics").textContent = GEM.topics.length;
    $("#stat-reels").textContent = GEM.reels.length;
    $("#stat-tags").textContent = Object.values(GEM.hashtags).reduce((a, s3) => a + s3.tags.length, 0);
    $("#stat-rules").textContent = ["required","triggers","prohibited","cautions"].reduce((a,k)=>a+GEM.complianceRules[k].length,0);
  }

  /* ---------------- Settings panel ---------------- */
  function renderSettingsForm() {
    const s = GEM.getSettings();
    $("#set-name").value = s.name;
    $("#set-nmls").value = s.nmls;
    $("#set-conmls").value = s.companyNmls;
    $("#set-states").value = s.states;
    $("#set-handle").value = s.handle;
    $("#set-phone").value = s.phone;
    $("#set-email").value = s.email;
    $("#set-city").value = s.city;
  }

  function saveSettingsForm() {
    GEM.saveSettings({
      name: $("#set-name").value.trim(),
      nmls: $("#set-nmls").value.trim(),
      companyNmls: $("#set-conmls").value.trim(),
      states: $("#set-states").value.trim(),
      handle: $("#set-handle").value.trim(),
      phone: $("#set-phone").value.trim(),
      email: $("#set-email").value.trim(),
      city: $("#set-city").value.trim()
    });
    const btn = $("#set-save");
    btn.textContent = "✓ Saved!";
    setTimeout(() => btn.textContent = "Save settings", 1600);
    renderDashboard();
    if (currentTopic) renderStudioContent();
  }

  /* ---------------- Init ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    const now = new Date();
    calYear = now.getFullYear(); calMonth = now.getMonth();

    $$(".nav-item").forEach(b => b.addEventListener("click", () => switchTab(b.dataset.tab)));

    $("#cal-prev").addEventListener("click", () => { calMonth--; if (calMonth < 0) { calMonth = 11; calYear--; } renderCalendar(); });
    $("#cal-next").addEventListener("click", () => { calMonth++; if (calMonth > 11) { calMonth = 0; calYear++; } renderCalendar(); });
    $("#cal-export").addEventListener("click", exportCalendarCSV);

    $("#studio-shuffle").addEventListener("click", shuffleTopic);
    $("#comp-run").addEventListener("click", runComplianceCheck);
    $("#comp-fix").addEventListener("click", applyAutoFix);
    $("#auto-export").addEventListener("click", exportBufferCSV);
    $("#set-save").addEventListener("click", saveSettingsForm);
    $("#dash-nudge-btn").addEventListener("click", () => switchTab("settings"));

    renderDashboard();
    renderCalendar();
    renderPillarButtons();
    renderReels();
    renderRulebook();
    renderHashtags();
    renderBrandKit();
    renderAutomation();
    renderSettingsForm();

    const saved = localStorage.getItem("gem-tab");
    switchTab(saved && $("#panel-" + saved) ? saved : "dashboard");
  });
})();
