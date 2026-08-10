/* ============================================================
   GEM MARKETING OS — Post Graphic Generator
   Renders finished, on-brand post images (and carousels) on
   canvas. Editorial and photographic: serif display type, gold
   hairlines, generous space. Never cartoon, never animated.
   ============================================================ */

(function () {
  const GEM = window.GEM;

  const SERIF = '"Didot","Bodoni MT",Georgia,"Times New Roman",serif';
  const SANS = '"Avenir Next","Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif';
  const C = {
    navy: "#0D2B36", ink: "#081E27", blue: "#45B6E8",
    gold: "#E8C468", cloud: "#F7F4EF", mist: "#B8D4E0", mistDim: "#7FA3B2", white: "#FFFFFF"
  };

  GEM.postSizes = {
    portrait: { w: 1080, h: 1350, label: "Instagram portrait 1080×1350" },
    square: { w: 1080, h: 1080, label: "Square 1080×1080" },
    story: { w: 1080, h: 1920, label: "Story / Reel cover 1080×1920" }
  };
  GEM.postLayouts = [
    { id: "statement", label: "Statement" },
    { id: "list", label: "List" },
    { id: "stat", label: "Stats" },
    { id: "quote", label: "Quote" }
  ];

  /* ---------- text helpers ---------- */
  function stripEmoji(s) {
    return String(s || "")
      .replace(/[\u{1F300}-\u{1FAFF}\u{2190}-\u{21FF}\u{2300}-\u{27BF}\u{FE0F}\u{2022}]/gu, "")
      .replace(/\s{2,}/g, " ")
      .trim();
  }
  function wrap(ctx, text, maxW) {
    const words = String(text).split(/\s+/).filter(Boolean);
    const lines = [];
    let line = "";
    words.forEach(w => {
      const test = line ? line + " " + w : w;
      if (ctx.measureText(test).width > maxW && line) { lines.push(line); line = w; }
      else line = test;
    });
    if (line) lines.push(line);
    return lines;
  }
  /* Draw wrapped text, shrinking to fit a height budget. Returns bottom y. */
  function drawBlock(ctx, text, x, y, maxW, opts) {
    const o = Object.assign({ font: SANS, size: 40, weight: 400, color: C.white, lh: 1.28, maxH: 1e6, minSize: 18, align: "left", measure: false }, opts);
    let size = o.size, lines;
    for (;;) {
      ctx.font = `${o.weight} ${size}px ${o.font}`;
      lines = wrap(ctx, text, maxW);
      if (lines.length * size * o.lh <= o.maxH || size <= o.minSize) break;
      size -= 2;
    }
    if (!o.measure) {
      ctx.fillStyle = o.color;
      ctx.textAlign = o.align;
      ctx.textBaseline = "top";
      lines.forEach((ln, i) => ctx.fillText(ln, x, y + i * size * o.lh));
    }
    return y + lines.length * size * o.lh;
  }
  /* Height a block will occupy, without painting it. */
  function blockH(ctx, text, maxW, opts) {
    return drawBlock(ctx, text, 0, 0, maxW, Object.assign({}, opts, { measure: true }));
  }

  /* ---------- brand furniture ---------- */
  function gemMark(ctx, x, y, size, color, inner) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 100, size / 100);
    ctx.beginPath();
    ctx.moveTo(50, 6); ctx.lineTo(94, 42); ctx.lineTo(82, 42); ctx.lineTo(82, 94);
    ctx.lineTo(18, 94); ctx.lineTo(18, 42); ctx.lineTo(6, 42); ctx.closePath();
    ctx.fillStyle = color || C.blue; ctx.fill();
    ctx.beginPath();
    ctx.moveTo(50, 50); ctx.lineTo(63, 65); ctx.lineTo(50, 80); ctx.lineTo(37, 65); ctx.closePath();
    ctx.fillStyle = inner || C.navy; ctx.fill();
    ctx.restore();
  }
  /* Equal Housing Lender glyph — house outline with equality bars */
  function ehlMark(ctx, x, y, size, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 100, size / 100);
    ctx.strokeStyle = color; ctx.fillStyle = color;
    ctx.lineWidth = 7; ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(8, 44); ctx.lineTo(50, 12); ctx.lineTo(92, 44);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(20, 46); ctx.lineTo(20, 88); ctx.lineTo(80, 88); ctx.lineTo(80, 46);
    ctx.stroke();
    ctx.fillRect(34, 58, 32, 8);
    ctx.fillRect(34, 72, 32, 8);
    ctx.restore();
  }
  function background(ctx, W, H, spec) {
    const g = ctx.createLinearGradient(0, 0, W * 0.6, H);
    if (spec.light) { g.addColorStop(0, C.cloud); g.addColorStop(1, "#EAE4DA"); }
    else { g.addColorStop(0, C.navy); g.addColorStop(1, C.ink); }
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    if (spec.photo) {
      const img = spec.photo;
      const s = Math.max(W / img.width, H / img.height);
      const dw = img.width * s, dh = img.height * s;
      ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
      // editorial scrim: readable type, photo still breathes
      const sc = ctx.createLinearGradient(0, 0, 0, H);
      sc.addColorStop(0, "rgba(8,30,39,.34)");
      sc.addColorStop(0.42, "rgba(8,30,39,.62)");
      sc.addColorStop(1, "rgba(8,30,39,.93)");
      ctx.fillStyle = sc;
      ctx.fillRect(0, 0, W, H);
    }
  }
  function footer(ctx, W, H, spec, u) {
    const s = spec.settings || {};
    const dark = !spec.light || !!spec.photo;
    const pad = 64 * u;
    const baseY = H - pad;
    ctx.save();
    // hairline
    ctx.strokeStyle = dark ? "rgba(184,212,224,.22)" : "rgba(13,43,54,.18)";
    ctx.lineWidth = Math.max(1, u);
    ctx.beginPath();
    ctx.moveTo(pad, baseY - 96 * u);
    ctx.lineTo(W - pad, baseY - 96 * u);
    ctx.stroke();
    // logo + handle
    gemMark(ctx, pad, baseY - 78 * u, 46 * u, dark ? C.blue : C.navy, dark ? C.navy : C.cloud);
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.font = `700 ${20 * u}px ${SANS}`;
    ctx.fillStyle = dark ? C.white : C.navy;
    ctx.letterSpacing = `${2.4 * u}px`;
    ctx.fillText("GEM HOME TEAM", pad + 62 * u, baseY - 76 * u);
    ctx.letterSpacing = "0px";
    ctx.font = `400 ${17 * u}px ${SANS}`;
    ctx.fillStyle = dark ? C.mistDim : "rgba(13,43,54,.66)";
    ctx.fillText(`${s.name || "Anthony Edrozo"} · NMLS #${s.nmls || "2829800"}`, pad + 62 * u, baseY - 50 * u);
    // required company disclosure + EHL mark
    ctx.font = `400 ${14 * u}px ${SANS}`;
    ctx.fillStyle = dark ? "rgba(127,163,178,.92)" : "rgba(13,43,54,.6)";
    const disc = `NEO Home Loans is a division of Better Mortgage Corporation NMLS #${s.companyNmls || "330511"} | Equal Housing Lender | nmlsconsumeraccess.org`;
    const lines = wrap(ctx, disc, W - pad * 2 - 46 * u);
    lines.forEach((ln, i) => ctx.fillText(ln, pad, baseY - 14 * u + i * 18 * u - (lines.length - 1) * 18 * u));
    ehlMark(ctx, W - pad - 34 * u, baseY - 34 * u, 34 * u, dark ? "rgba(184,212,224,.75)" : "rgba(13,43,54,.55)");
    ctx.restore();
  }
  function kickerRule(ctx, x, y, u, text, dark) {
    ctx.save();
    ctx.textAlign = "left"; ctx.textBaseline = "top";
    ctx.font = `700 ${18 * u}px ${SANS}`;
    ctx.letterSpacing = `${5 * u}px`;
    ctx.fillStyle = C.gold;
    ctx.fillText(String(text || "").toUpperCase(), x, y);
    ctx.letterSpacing = "0px";
    ctx.strokeStyle = C.gold;
    ctx.lineWidth = Math.max(1.5, 2 * u);
    ctx.beginPath();
    ctx.moveTo(x, y + 34 * u);
    ctx.lineTo(x + 56 * u, y + 34 * u);
    ctx.stroke();
    ctx.restore();
    return y + 62 * u;
  }
  function slideCounter(ctx, W, H, u, spec) {
    if (!spec.index || !spec.total || spec.total < 2) return;
    ctx.save();
    ctx.font = `700 ${17 * u}px ${SANS}`;
    ctx.fillStyle = "rgba(184,212,224,.6)";
    ctx.textAlign = "right"; ctx.textBaseline = "top";
    ctx.letterSpacing = `${2 * u}px`;
    ctx.fillText(`${spec.index} / ${spec.total}`, W - 64 * u, 64 * u);
    ctx.letterSpacing = "0px";
    ctx.restore();
  }
  function swipeCue(ctx, W, H, u, dark) {
    ctx.save();
    ctx.font = `700 ${17 * u}px ${SANS}`;
    ctx.fillStyle = dark ? C.blue : C.navy;
    ctx.textAlign = "right"; ctx.textBaseline = "bottom";
    ctx.letterSpacing = `${3 * u}px`;
    ctx.fillText("SWIPE →", W - 64 * u, H - 190 * u);
    ctx.letterSpacing = "0px";
    ctx.restore();
  }

  /* ---------- layouts ---------- */
  function layoutStatement(ctx, W, H, spec, u) {
    const pad = 64 * u;
    const dark = !spec.light || !!spec.photo;
    const maxW = W - pad * 2;
    const safeTop = H * 0.13, safeBottom = H - 210 * u;
    const titleOpts = {
      font: SERIF, weight: 500, size: (spec.photo ? 74 : 82) * u, color: dark ? C.white : C.navy,
      lh: 1.16, maxH: H * 0.36, minSize: 34 * u
    };
    const bodyOpts = {
      font: SANS, weight: 400, size: 32 * u, color: dark ? C.mist : "rgba(13,43,54,.78)",
      lh: 1.42, maxH: H * 0.12, minSize: 20 * u
    };
    const body = (spec.lines || []).filter(Boolean).slice(0, 4);
    // measure so the block sits deliberately in the frame instead of floating
    let total = (spec.kicker ? 62 * u : 0) + blockH(ctx, stripEmoji(spec.title), maxW, titleOpts);
    if (body.length) {
      total += 34 * u;
      body.forEach(ln => { total += blockH(ctx, stripEmoji(ln), maxW, bodyOpts) + 18 * u; });
    }
    let y = Math.max(safeTop, safeBottom - total - 26 * u);
    if (spec.kicker) y = kickerRule(ctx, pad, y, u, spec.kicker, dark);
    y = drawBlock(ctx, stripEmoji(spec.title), pad, y, maxW, titleOpts);
    if (body.length) {
      y += 34 * u;
      body.forEach(ln => { y = drawBlock(ctx, stripEmoji(ln), pad, y, maxW, bodyOpts) + 18 * u; });
    }
  }
  function layoutList(ctx, W, H, spec, u) {
    const pad = 64 * u;
    const dark = !spec.light || !!spec.photo;
    let y = H * 0.14;
    if (spec.kicker) y = kickerRule(ctx, pad, y, u, spec.kicker, dark);
    y = drawBlock(ctx, stripEmoji(spec.title), pad, y, W - pad * 2, {
      font: SERIF, weight: 500, size: 62 * u, color: dark ? C.white : C.navy,
      lh: 1.16, maxH: H * 0.22, minSize: 32 * u
    });
    y += 46 * u;
    const items = (spec.lines || []).filter(Boolean).slice(0, 5);
    const itemOpts = { font: SANS, weight: 400, size: 33 * u, lh: 1.36, minSize: 19 * u, maxH: 220 * u };
    const heights = items.map(it => blockH(ctx, stripEmoji(it), W - pad * 2 - 84 * u, itemOpts) + 58 * u);
    const room = H - 210 * u - y;
    const per = Math.min(Math.max(...heights, 0) + 22 * u, items.length ? room / items.length : room);
    // optically centre the stack — biased up, since the footer carries visual weight
    y += Math.max(0, (room - per * items.length) * 0.42);
    items.forEach((it, i) => {
      const top = y + i * per;
      ctx.save();
      ctx.strokeStyle = dark ? "rgba(184,212,224,.16)" : "rgba(13,43,54,.14)";
      ctx.lineWidth = Math.max(1, u);
      ctx.beginPath(); ctx.moveTo(pad, top); ctx.lineTo(W - pad, top); ctx.stroke();
      ctx.font = `500 ${40 * u}px ${SERIF}`;
      ctx.fillStyle = C.gold;
      ctx.textAlign = "left"; ctx.textBaseline = "top";
      ctx.fillText(String(i + 1).padStart(2, "0"), pad, top + 22 * u);
      ctx.restore();
      drawBlock(ctx, stripEmoji(it), pad + 84 * u, top + 24 * u, W - pad * 2 - 84 * u, {
        font: SANS, weight: 400, size: 33 * u, color: dark ? C.white : C.navy,
        lh: 1.36, maxH: per - 40 * u, minSize: 19 * u
      });
    });
  }
  function layoutStat(ctx, W, H, spec, u) {
    const pad = 64 * u;
    const dark = !spec.light || !!spec.photo;
    let y = H * 0.15;
    if (spec.kicker) y = kickerRule(ctx, pad, y, u, spec.kicker, dark);
    if (spec.title) {
      y = drawBlock(ctx, stripEmoji(spec.title), pad, y, W - pad * 2, {
        font: SERIF, weight: 500, size: 58 * u, color: dark ? C.white : C.navy,
        lh: 1.15, maxH: H * 0.16, minSize: 30 * u
      });
      y += 40 * u;
    }
    const stats = (spec.stats || []).slice(0, 3);
    const room = H - 210 * u - y;
    const per = Math.min(230 * u, stats.length ? room / stats.length : room);
    y += Math.max(0, (room - per * stats.length) * 0.42);
    stats.forEach((st, i) => {
      const top = y + i * per;
      ctx.save();
      ctx.strokeStyle = dark ? "rgba(184,212,224,.16)" : "rgba(13,43,54,.14)";
      ctx.lineWidth = Math.max(1, u);
      ctx.beginPath(); ctx.moveTo(pad, top); ctx.lineTo(W - pad, top); ctx.stroke();
      ctx.textAlign = "left"; ctx.textBaseline = "top";
      ctx.font = `700 ${18 * u}px ${SANS}`;
      ctx.letterSpacing = `${4 * u}px`;
      ctx.fillStyle = dark ? C.mistDim : "rgba(13,43,54,.6)";
      ctx.fillText(String(st.label || "").toUpperCase(), pad, top + 26 * u);
      ctx.letterSpacing = "0px";
      let vs = 88 * u;
      do { ctx.font = `500 ${vs}px ${SERIF}`; vs -= 4 * u; }
      while (ctx.measureText(String(st.value)).width > W - pad * 2 && vs > 34 * u);
      ctx.fillStyle = dark ? C.white : C.navy;
      ctx.fillText(String(st.value), pad, top + 58 * u);
      if (st.note) {
        ctx.font = `400 ${24 * u}px ${SANS}`;
        ctx.fillStyle = C.blue;
        ctx.fillText(stripEmoji(st.note), pad, top + 58 * u + vs * 1.16);
      }
      ctx.restore();
    });
  }
  function layoutQuote(ctx, W, H, spec, u) {
    const pad = 72 * u;
    const dark = !spec.light || !!spec.photo;
    const qOpts = { font: SERIF, weight: 500, size: 62 * u, lh: 1.28, maxH: H * 0.36, minSize: 30 * u };
    const attrLine = (spec.lines || []).filter(Boolean)[0];
    const attrOpts = { font: SANS, weight: 600, size: 28 * u, lh: 1.4, maxH: 120 * u };
    const total = (spec.kicker ? 62 * u : 0) + 110 * u +
      blockH(ctx, stripEmoji(spec.title), W - pad * 2, qOpts) +
      (attrLine ? 58 * u + blockH(ctx, stripEmoji(attrLine), W - pad * 2, attrOpts) : 0);
    const safeTop = H * 0.11;
    let y = safeTop + Math.max(0, (H - 210 * u - safeTop - total) * 0.42);
    if (spec.kicker) y = kickerRule(ctx, pad, y, u, spec.kicker, dark);
    ctx.save();
    ctx.font = `500 ${150 * u}px ${SERIF}`;
    ctx.fillStyle = C.gold;
    ctx.textAlign = "left"; ctx.textBaseline = "top";
    ctx.fillText("“", pad - 8 * u, y - 20 * u);
    ctx.restore();
    y += 110 * u;
    y = drawBlock(ctx, stripEmoji(spec.title), pad, y, W - pad * 2, {
      font: SERIF, weight: 500, size: 62 * u, color: dark ? C.white : C.navy,
      lh: 1.28, maxH: H * 0.36, minSize: 30 * u
    });
    const attr = attrLine;
    if (attr) {
      y += 36 * u;
      ctx.save();
      ctx.strokeStyle = C.gold;
      ctx.lineWidth = Math.max(1.5, 2 * u);
      ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(pad + 48 * u, y); ctx.stroke();
      ctx.restore();
      drawBlock(ctx, stripEmoji(attr), pad, y + 22 * u, W - pad * 2, {
        font: SANS, weight: 600, size: 28 * u, color: dark ? C.mist : "rgba(13,43,54,.75)", lh: 1.4, maxH: 120 * u
      });
    }
  }

  const LAYOUTS = { statement: layoutStatement, list: layoutList, stat: layoutStat, quote: layoutQuote };

  /**
   * Render one post graphic onto a canvas.
   * spec: {layout, kicker, title, lines[], stats[], photo, light, index, total, swipe, settings}
   */
  GEM.renderPost = function (canvas, spec, size) {
    const sz = GEM.postSizes[size] || GEM.postSizes.portrait;
    canvas.width = sz.w; canvas.height = sz.h;
    const ctx = canvas.getContext("2d");
    const u = sz.w / 1080;
    ctx.clearRect(0, 0, sz.w, sz.h);
    background(ctx, sz.w, sz.h, spec);
    (LAYOUTS[spec.layout] || layoutStatement)(ctx, sz.w, sz.h, spec, u);
    slideCounter(ctx, sz.w, sz.h, u, spec);
    if (spec.swipe) swipeCue(ctx, sz.w, sz.h, u, !spec.light || !!spec.photo);
    footer(ctx, sz.w, sz.h, spec, u);
    return canvas;
  };

  /* ---------- turn content into slide decks ---------- */
  function cleanParagraphs(caption) {
    return String(caption || "")
      .split(/\n\s*\n/)
      .map(p => stripEmoji(p.replace(/\n/g, " ")).trim())
      .filter(p => p.length > 12);
  }
  /**
   * Build a slide deck from a Studio topic.
   * Carousels get cover + content slides + CTA; single posts get one slide.
   */
  GEM.slidesForTopic = function (topic, hook, settings) {
    const pillar = (GEM.pillars[topic.pillar] || {}).label || "";
    const isCarousel = /carousel/i.test(topic.format || "");
    const paras = cleanParagraphs(topic.caption);
    const cover = {
      layout: "statement",
      kicker: pillar,
      title: stripEmoji(hook || topic.title),
      lines: isCarousel ? [] : paras.slice(0, 1),
      settings, swipe: isCarousel
    };
    if (!isCarousel) return [cover];
    const slides = [cover];
    paras.slice(0, 5).forEach((p, i) => {
      const sentences = p.split(/(?<=[.!?])\s+/).filter(Boolean);
      const head = sentences.shift() || p;
      slides.push({
        layout: "statement",
        kicker: `${String(i + 1).padStart(2, "0")} of ${Math.min(paras.length, 5)}`,
        title: head,
        lines: sentences.slice(0, 2),
        settings,
        swipe: true
      });
    });
    slides.push({
      layout: "statement",
      kicker: "Next step",
      title: stripEmoji(topic.cta || "Send me a DM and let's map it out."),
      lines: [`DM ${(settings && settings.handle) || "@gemhometeam"} — zero pressure, zero obligation.`],
      settings
    });
    return slides.map((s, i) => Object.assign(s, { index: i + 1, total: slides.length }));
  };
  /** Build a slide from Template Autopilot output (its on-image text). */
  GEM.slidesForAutopilot = function (ap, result, settings) {
    const raw = String(result.onImage || "").split("\n").map(l => stripEmoji(l).trim()).filter(Boolean);
    const head = raw.shift() || ap.label;
    const statLines = raw.filter(l => /:/.test(l));
    if (statLines.length >= 2) {
      return [{
        layout: "stat",
        kicker: ap.label,
        title: head,
        stats: statLines.slice(0, 3).map(l => {
          const [label, ...rest] = l.split(":");
          return { label: label.trim(), value: rest.join(":").trim() };
        }),
        settings, index: 1, total: 1
      }];
    }
    return [{
      layout: /testimonial|review/i.test(ap.label) ? "quote" : "statement",
      kicker: ap.label,
      title: head,
      lines: raw.slice(0, 3),
      settings, index: 1, total: 1
    }];
  };

  /* ---------- export ---------- */
  GEM.downloadCanvas = function (canvas, filename) {
    return new Promise(resolve => {
      canvas.toBlob(blob => {
        if (!blob) return resolve(false);
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); resolve(true); }, 1200);
      }, "image/jpeg", 0.94);
    });
  };
  GEM.downloadSlides = async function (slides, size, baseName) {
    const canvas = document.createElement("canvas");
    for (let i = 0; i < slides.length; i++) {
      GEM.renderPost(canvas, slides[i], size);
      await GEM.downloadCanvas(canvas, `${baseName}${slides.length > 1 ? "-" + (i + 1) : ""}.jpg`);
    }
    return slides.length;
  };
})();
