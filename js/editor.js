/* ============================================================
   GEM STUDIO EDITOR — Photo & Video
   Canvas-based, non-destructive, runs entirely in the browser.
   ============================================================ */

(function () {
  const GEM = window.GEM;
  const $ = (sel, el) => (el || document).querySelector(sel);
  const $$ = (sel, el) => Array.from((el || document).querySelectorAll(sel));

  /* Settings fallback (app.js isn't loaded on this page) */
  if (!GEM.getSettings) {
    const DEF = {
      name: "Megan Sawamura", nmls: "972639", companyNmls: "330511", states: "CA",
      handle: "@gemhometeam", phone: "", email: "", city: "San Diego", apiKey: ""
    };
    GEM.getSettings = function () {
      try {
        const saved = JSON.parse(localStorage.getItem("gem-settings") || "{}");
        const merged = Object.assign({}, DEF);
        Object.keys(saved).forEach(k => { if (saved[k] !== "" && saved[k] != null) merged[k] = saved[k]; });
        return merged;
      } catch (e) { return Object.assign({}, DEF); }
    };
    GEM.saveSettings = function (s) { localStorage.setItem("gem-settings", JSON.stringify(s)); };
  }

  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove("show"), 2400);
  }

  function download(blob, name) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
  }

  const BRAND_COLORS = ["#FFFFFF", "#0D2B36", "#45B6E8", "#E8C468", "#F7F4EF"];

  function drawGemLogo(ctx, x, y, size, opacity) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.translate(x, y);
    const s = size / 100;
    ctx.scale(s, s);
    ctx.beginPath();
    ctx.moveTo(50, 6); ctx.lineTo(94, 42); ctx.lineTo(82, 42); ctx.lineTo(82, 94);
    ctx.lineTo(18, 94); ctx.lineTo(18, 42); ctx.lineTo(6, 42); ctx.closePath();
    ctx.fillStyle = "#45B6E8"; ctx.fill();
    ctx.beginPath();
    ctx.moveTo(50, 50); ctx.lineTo(63, 65); ctx.lineTo(50, 80); ctx.lineTo(37, 65); ctx.closePath();
    ctx.fillStyle = "#0D2B36"; ctx.fill();
    ctx.restore();
  }

  /* ============================================================
     MODE SWITCHING
     ============================================================ */
  $$(".mode-btn").forEach(b => b.addEventListener("click", () => switchMode(b.dataset.mode)));
  function switchMode(mode) {
    $$(".mode-btn").forEach(b => b.classList.toggle("active", b.dataset.mode === mode));
    $$(".mode-panel").forEach(p => p.classList.toggle("active", p.id === "mode-" + mode));
    if (mode === "video") V.resize();
  }

  /* ============================================================
     PHOTO EDITOR
     ============================================================ */
  const ADJ_DEFS = [
    ["exposure", "Exposure", -100, 100, 0],
    ["contrast", "Contrast", -100, 100, 0],
    ["saturation", "Saturation", -100, 100, 0],
    ["temperature", "Warmth", -100, 100, 0],
    ["tint", "Tint", -100, 100, 0],
    ["highlights", "Highlights", -100, 100, 0],
    ["shadows", "Shadows", -100, 100, 0],
    ["hue", "Hue shift", -180, 180, 0],
    ["fade", "Matte fade", 0, 100, 0],
    ["vignette", "Vignette", 0, 100, 0],
    ["grain", "Film grain", 0, 100, 0],
    ["sharpen", "Sharpen", 0, 100, 0],
    ["blur", "Soften", 0, 20, 0]
  ];
  const DEF_ADJ = {};
  ADJ_DEFS.forEach(d => DEF_ADJ[d[0]] = d[4]);

  const PH_PRESETS = [
    ["GEM Clean", { contrast: 8, saturation: 5, temperature: 5 }],
    ["Editorial B&W", { saturation: -100, contrast: 14, grain: 12, fade: 8 }],
    ["Golden Hour", { temperature: 24, exposure: 4, contrast: 6, fade: 6, vignette: 14 }],
    ["Coastal", { temperature: -12, exposure: 6, saturation: 8, contrast: 4 }],
    ["Matte", { fade: 24, contrast: -6, saturation: -8, vignette: 12 }],
    ["Crisp", { sharpen: 40, contrast: 10, saturation: 4 }]
  ];

  const P = {
    img: null, name: "photo",
    rot: 0, flipH: false, flipV: false, straighten: 0,
    crop: null, cropDraft: null, cropAspect: null, cropping: false,
    adj: Object.assign({}, DEF_ADJ),
    texts: [], selText: -1,
    overlays: [],
    logo: { on: false, pos: "br", size: 8, op: 85 },
    lut: null, lutName: "", lutMix: 100,
    frame: { pad: 0, color: "#F7F4EF" },
    history: [], compare: false
  };

  const phCanvas = $("#ph-canvas");
  const phCtx = phCanvas.getContext("2d", { willReadFrequently: true });

  function phSnapshot() {
    P.history.push(JSON.stringify({
      rot: P.rot, flipH: P.flipH, flipV: P.flipV, straighten: P.straighten,
      crop: P.crop, adj: P.adj, texts: P.texts, logo: P.logo
    }));
    if (P.history.length > 40) P.history.shift();
  }
  function phUndo() {
    const s = P.history.pop();
    if (!s) return toast("Nothing to undo");
    const o = JSON.parse(s);
    Object.assign(P, { rot: o.rot, flipH: o.flipH, flipV: o.flipV, straighten: o.straighten, crop: o.crop });
    P.adj = o.adj; P.texts = o.texts; P.logo = o.logo;
    phSyncControls(); phRequestRender(); phRenderTextLayers();
  }

  function phSyncControls() {
    ADJ_DEFS.forEach(([k]) => {
      const el = $("#adj-" + k);
      if (el) { el.value = P.adj[k]; $("#adj-" + k + "-val").textContent = P.adj[k]; }
    });
    $("#ph-straighten").value = P.straighten;
    $("#ph-straighten-val").textContent = P.straighten + "°";
    $("#ph-logo-on").checked = P.logo.on;
    $("#ph-logo-pos").value = P.logo.pos;
    $("#ph-logo-size").value = P.logo.size;
    $("#ph-logo-op").value = P.logo.op;
  }

  /* --- Oriented + cropped base canvas at a max width --- */
  function phOrientedSize() {
    const w = P.img.width, h = P.img.height;
    return (P.rot % 180 === 0) ? { w, h } : { w: h, h: w };
  }
  function phBuildBase(maxDim, ignoreCrop) {
    const os = phOrientedSize();
    let sw = os.w, sh = os.h, sx = 0, sy = 0;
    const crop = (!ignoreCrop && P.crop) ? P.crop : null;
    if (crop) { sx = crop.x * os.w; sy = crop.y * os.h; sw = crop.w * os.w; sh = crop.h * os.h; }
    const scale = Math.min(1, maxDim / Math.max(sw, sh));
    const c = document.createElement("canvas");
    c.width = Math.max(2, Math.round(sw * scale));
    c.height = Math.max(2, Math.round(sh * scale));
    const ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.imageSmoothingQuality = "high";
    if (P.adj.blur > 0) ctx.filter = `blur(${P.adj.blur * scale}px)`;
    ctx.save();
    // Move so that crop region top-left maps to origin
    ctx.translate(-sx * scale, -sy * scale);
    ctx.scale(scale, scale);
    // orient about the center of the oriented image
    ctx.translate(os.w / 2, os.h / 2);
    const st = P.straighten * Math.PI / 180;
    if (st) {
      // scale up so straighten rotation doesn't expose blank corners
      const cs = Math.abs(Math.cos(st)), sn = Math.abs(Math.sin(st));
      const cover = Math.max((os.w * cs + os.h * sn) / os.w, (os.w * sn + os.h * cs) / os.h);
      ctx.scale(cover, cover);
      ctx.rotate(st);
    }
    ctx.rotate(P.rot * Math.PI / 180);
    ctx.scale(P.flipH ? -1 : 1, P.flipV ? -1 : 1);
    ctx.drawImage(P.img, -P.img.width / 2, -P.img.height / 2);
    ctx.restore();
    return c;
  }

  /* --- Pixel adjustments --- */
  function phApplyAdjustments(canvas) {
    const a = P.adj;
    const hasPixelWork = a.exposure || a.contrast || a.saturation || a.temperature || a.tint ||
      a.highlights || a.shadows || a.fade || a.hue || P.lut;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (hasPixelWork) {
      const id = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = id.data;
      const expMul = Math.pow(2, a.exposure / 100);
      const C = a.contrast * 1.27;
      const conF = (259 * (C + 255)) / (255 * (259 - C));
      const sat = 1 + a.saturation / 100;
      const tR = a.temperature * 0.3, tB = -a.temperature * 0.3, tG = a.tint * 0.25;
      const hi = a.highlights, sh = a.shadows;
      const lift = a.fade * 0.45;
      // luma-preserving hue rotation matrix (as in SVG feColorMatrix)
      const hA = a.hue * Math.PI / 180, hc = Math.cos(hA), hs = Math.sin(hA);
      const m00 = 0.213 + 0.787 * hc - 0.213 * hs, m01 = 0.715 - 0.715 * hc - 0.715 * hs, m02 = 0.072 - 0.072 * hc + 0.928 * hs;
      const m10 = 0.213 - 0.213 * hc + 0.143 * hs, m11 = 0.715 + 0.285 * hc + 0.140 * hs, m12 = 0.072 - 0.072 * hc - 0.283 * hs;
      const m20 = 0.213 - 0.213 * hc - 0.787 * hs, m21 = 0.715 - 0.715 * hc + 0.715 * hs, m22 = 0.072 + 0.928 * hc + 0.072 * hs;
      const lut = P.lut, lutMix = P.lutMix / 100;
      for (let i = 0; i < d.length; i += 4) {
        let r = d[i], g = d[i + 1], b = d[i + 2];
        // exposure
        r *= expMul; g *= expMul; b *= expMul;
        // contrast
        r = conF * (r - 128) + 128; g = conF * (g - 128) + 128; b = conF * (b - 128) + 128;
        // temperature / tint
        r += tR; b += tB; g += tG;
        // saturation
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        r = lum + (r - lum) * sat; g = lum + (g - lum) * sat; b = lum + (b - lum) * sat;
        // highlights / shadows (luma-weighted)
        const ln = lum / 255;
        if (hi && ln > 0.5) { const w = (ln - 0.5) * 2 * (hi / 100) * 55; r += w; g += w; b += w; }
        if (sh && ln < 0.5) { const w = (0.5 - ln) * 2 * (sh / 100) * 55; r += w; g += w; b += w; }
        // hue rotation
        if (hA) {
          const nr = m00 * r + m01 * g + m02 * b;
          const ng = m10 * r + m11 * g + m12 * b;
          const nb = m20 * r + m21 * g + m22 * b;
          r = nr; g = ng; b = nb;
        }
        // matte fade (lift blacks)
        if (lift) { r = r * (255 - lift) / 255 + lift; g = g * (255 - lift) / 255 + lift; b = b * (255 - lift) / 255 + lift; }
        // 3D LUT (trilinear)
        if (lut) {
          const N = lut.size, Nm = N - 1, L = lut.data;
          const fr = Math.min(255, Math.max(0, r)) / 255 * Nm;
          const fg = Math.min(255, Math.max(0, g)) / 255 * Nm;
          const fb = Math.min(255, Math.max(0, b)) / 255 * Nm;
          const r0 = Math.floor(fr), g0 = Math.floor(fg), b0 = Math.floor(fb);
          const r1 = Math.min(Nm, r0 + 1), g1 = Math.min(Nm, g0 + 1), b1 = Math.min(Nm, b0 + 1);
          const dr = fr - r0, dg = fg - g0, db = fb - b0;
          let lr = 0, lg = 0, lb = 0;
          for (let bi = 0; bi < 2; bi++) for (let gi = 0; gi < 2; gi++) for (let ri = 0; ri < 2; ri++) {
            const w = (ri ? dr : 1 - dr) * (gi ? dg : 1 - dg) * (bi ? db : 1 - db);
            if (!w) continue;
            const idx = (((bi ? b1 : b0) * N + (gi ? g1 : g0)) * N + (ri ? r1 : r0)) * 3;
            lr += w * L[idx]; lg += w * L[idx + 1]; lb += w * L[idx + 2];
          }
          r = r + (lr * 255 - r) * lutMix;
          g = g + (lg * 255 - g) * lutMix;
          b = b + (lb * 255 - b) * lutMix;
        }
        d[i] = r < 0 ? 0 : r > 255 ? 255 : r;
        d[i + 1] = g < 0 ? 0 : g > 255 ? 255 : g;
        d[i + 2] = b < 0 ? 0 : b > 255 ? 255 : b;
      }
      ctx.putImageData(id, 0, 0);
    }
    if (a.sharpen > 0) phSharpen(canvas, a.sharpen / 100);
    if (a.vignette > 0) {
      const w = canvas.width, h = canvas.height;
      const gctx = canvas.getContext("2d");
      const g = gctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.35, w / 2, h / 2, Math.max(w, h) * 0.72);
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(1, `rgba(0,0,0,${(a.vignette / 100) * 0.55})`);
      gctx.fillStyle = g;
      gctx.fillRect(0, 0, w, h);
    }
    if (a.grain > 0) phGrain(canvas, a.grain / 100);
    return canvas;
  }

  function phSharpen(canvas, amt) {
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const w = canvas.width, h = canvas.height;
    const src = ctx.getImageData(0, 0, w, h);
    const out = ctx.createImageData(w, h);
    const s = src.data, o = out.data;
    const k = amt * 0.8;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        if (x === 0 || y === 0 || x === w - 1 || y === h - 1) {
          o[i] = s[i]; o[i + 1] = s[i + 1]; o[i + 2] = s[i + 2]; o[i + 3] = s[i + 3];
          continue;
        }
        for (let c = 0; c < 3; c++) {
          const v = s[i + c] * (1 + 4 * k)
            - k * (s[i + c - 4] + s[i + c + 4] + s[i + c - w * 4] + s[i + c + w * 4]);
          o[i + c] = v < 0 ? 0 : v > 255 ? 255 : v;
        }
        o[i + 3] = s[i + 3];
      }
    }
    ctx.putImageData(out, 0, 0);
  }

  function phGrain(canvas, amt) {
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const id = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const d = id.data;
    const strength = amt * 26;
    for (let i = 0; i < d.length; i += 4) {
      const n = (Math.random() - 0.5) * strength;
      d[i] += n; d[i + 1] += n; d[i + 2] += n;
    }
    ctx.putImageData(id, 0, 0);
  }

  /* --- LUT (.cube) parsing --- */
  function parseCube(text) {
    const lines = text.split(/\r?\n/);
    let size = 0;
    const data = [];
    for (const ln of lines) {
      const s = ln.trim();
      if (!s || s.startsWith("#")) continue;
      if (/^LUT_3D_SIZE/i.test(s)) { size = +s.split(/\s+/)[1]; continue; }
      if (/^(TITLE|DOMAIN_|LUT_1D)/i.test(s)) continue;
      const parts = s.split(/\s+/).map(Number);
      if (parts.length === 3 && parts.every(n => !isNaN(n))) data.push(parts[0], parts[1], parts[2]);
    }
    if (!size || data.length !== size * size * size * 3) throw new Error("Not a valid 3D .cube LUT");
    return { size, data: Float32Array.from(data) };
  }

  /* --- Frame / border --- */
  function phApplyFrame(c) {
    const p = P.frame.pad;
    if (!p) return c;
    const padPx = Math.round(p / 100 * Math.min(c.width, c.height));
    const o = document.createElement("canvas");
    o.width = c.width + padPx * 2;
    o.height = c.height + padPx * 2;
    const ctx = o.getContext("2d");
    ctx.fillStyle = P.frame.color;
    ctx.fillRect(0, 0, o.width, o.height);
    ctx.drawImage(c, padPx, padPx);
    return o;
  }

  /* --- Overlays: images + text/badges + logo --- */
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function phDrawOverlays(ctx, w, h, forExport) {
    P.overlays.forEach(o => {
      if (!o.img) return;
      const ow = o.scale * w;
      const oh = ow * (o.img.height / o.img.width);
      ctx.save();
      ctx.globalAlpha = o.op / 100;
      ctx.drawImage(o.img, o.x * w - ow / 2, o.y * h - oh / 2, ow, oh);
      ctx.restore();
      if (!forExport) o._bbox = { x: o.x * w - ow / 2, y: o.y * h - oh / 2, w: ow, h: oh };
    });
    P.texts.forEach((t, idx) => {
      const size = (t.size / 100) * h * 0.12;
      ctx.save();
      ctx.font = `${t.weight || 800} ${size}px "Avenir Next","Segoe UI","Helvetica Neue",Arial,sans-serif`;
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      const content = t.upper ? t.text.toUpperCase() : t.text;
      const x = t.x * w, y = t.y * h;
      if (t.badge) ctx.letterSpacing = Math.round(size * 0.08) + "px";
      const metrics = ctx.measureText(content);
      const tw = metrics.width;
      if (t.badge) {
        const padX = size * 0.7, padY = size * 0.42;
        ctx.fillStyle = t.bg || "#E8C468";
        roundRect(ctx, x - tw / 2 - padX, y - size / 2 - padY, tw + padX * 2, size + padY * 2, (size + padY * 2) / 2);
        ctx.fill();
      } else if (t.scrim) {
        ctx.fillStyle = "rgba(8,30,39,.62)";
        const pad = size * 0.5;
        ctx.fillRect(x - tw / 2 - pad, y - size * 0.72, tw + pad * 2, size * 1.44);
      } else {
        ctx.shadowColor = "rgba(0,0,0,.45)";
        ctx.shadowBlur = size * 0.18;
        ctx.shadowOffsetY = size * 0.04;
      }
      ctx.fillStyle = t.color;
      ctx.fillText(content, x, y);
      ctx.restore();
      // remember bbox for hit-testing (preview only)
      if (!forExport) t._bbox = { x: x - tw / 2 - 8, y: y - size * 0.8, w: tw + 16, h: size * 1.6 };
    });
    if (P.logo.on) {
      const size = (P.logo.size / 100) * Math.min(w, h);
      const m = size * 0.35;
      let x = w - size - m, y = h - size - m;
      if (P.logo.pos === "bl") { x = m; }
      if (P.logo.pos === "tr") { y = m; }
      if (P.logo.pos === "tl") { x = m; y = m; }
      if (P.logo.pos === "bc") { x = w / 2 - size / 2; }
      drawGemLogo(ctx, x, y, size, P.logo.op / 100);
    }
  }

  /* --- Render loop --- */
  let phRenderQueued = false;
  function phRequestRender() {
    if (phRenderQueued) return;
    phRenderQueued = true;
    requestAnimationFrame(() => { phRenderQueued = false; phRender(); });
  }

  function phRender() {
    if (!P.img) return;
    let base = phBuildBase(1100, P.cropping);
    if (!P.compare) phApplyAdjustments(base);
    if (!P.cropping) base = phApplyFrame(base);
    phCanvas.width = base.width; phCanvas.height = base.height;
    phCtx.drawImage(base, 0, 0);
    if (!P.cropping && !P.compare) phDrawOverlays(phCtx, base.width, base.height, false);
    if (P.cropping) phDrawCropOverlay();
    $("#ph-dims").textContent = P.crop
      ? `${Math.round(P.crop.w * phOrientedSize().w)}×${Math.round(P.crop.h * phOrientedSize().h)}px (cropped from ${P.img.width}×${P.img.height})`
      : `${P.img.width}×${P.img.height}px`;
  }

  /* --- Crop UI --- */
  function phStartCrop(aspect) {
    P.cropAspect = aspect;
    P.cropping = true;
    const os = phOrientedSize();
    let w = 0.86, h = 0.86;
    if (aspect) {
      const imgAspect = os.w / os.h;
      if (aspect > imgAspect) { w = 0.92; h = (os.w * w / aspect) / os.h; }
      else { h = 0.92; w = (os.h * h * aspect) / os.w; }
    }
    P.cropDraft = { x: (1 - w) / 2, y: (1 - h) / 2, w, h };
    phRequestRender();
  }

  function phDrawCropOverlay() {
    const c = P.cropDraft;
    if (!c) return;
    const w = phCanvas.width, h = phCanvas.height;
    const rx = c.x * w, ry = c.y * h, rw = c.w * w, rh = c.h * h;
    phCtx.save();
    phCtx.fillStyle = "rgba(4,16,21,.62)";
    phCtx.fillRect(0, 0, w, ry);
    phCtx.fillRect(0, ry + rh, w, h - ry - rh);
    phCtx.fillRect(0, ry, rx, rh);
    phCtx.fillRect(rx + rw, ry, w - rx - rw, rh);
    phCtx.strokeStyle = "#45B6E8"; phCtx.lineWidth = 2;
    phCtx.strokeRect(rx, ry, rw, rh);
    // thirds
    phCtx.strokeStyle = "rgba(69,182,232,.35)"; phCtx.lineWidth = 1;
    for (let i = 1; i < 3; i++) {
      phCtx.beginPath(); phCtx.moveTo(rx + rw * i / 3, ry); phCtx.lineTo(rx + rw * i / 3, ry + rh); phCtx.stroke();
      phCtx.beginPath(); phCtx.moveTo(rx, ry + rh * i / 3); phCtx.lineTo(rx + rw, ry + rh * i / 3); phCtx.stroke();
    }
    // handles
    phCtx.fillStyle = "#45B6E8";
    const hs = Math.max(8, w * 0.015);
    [[rx, ry], [rx + rw, ry], [rx, ry + rh], [rx + rw, ry + rh]].forEach(([hx, hy]) => {
      phCtx.fillRect(hx - hs / 2, hy - hs / 2, hs, hs);
    });
    phCtx.restore();
  }

  /* --- Pointer interactions on the photo canvas (crop drag + text drag) --- */
  let phDrag = null;
  phCanvas.addEventListener("pointerdown", (e) => {
    if (!P.img) return;
    const rect = phCanvas.getBoundingClientRect();
    const px = (e.clientX - rect.left) * (phCanvas.width / rect.width);
    const py = (e.clientY - rect.top) * (phCanvas.height / rect.height);
    if (P.cropping && P.cropDraft) {
      const c = P.cropDraft;
      const w = phCanvas.width, h = phCanvas.height;
      const rx = c.x * w, ry = c.y * h, rw = c.w * w, rh = c.h * h;
      const hs = Math.max(14, w * 0.03);
      const corners = { tl: [rx, ry], tr: [rx + rw, ry], bl: [rx, ry + rh], br: [rx + rw, ry + rh] };
      let hit = null;
      Object.keys(corners).forEach(k => {
        if (Math.abs(px - corners[k][0]) < hs && Math.abs(py - corners[k][1]) < hs) hit = k;
      });
      if (hit) phDrag = { type: "crop-corner", corner: hit };
      else if (px > rx && px < rx + rw && py > ry && py < ry + rh) phDrag = { type: "crop-move", ox: px / w - c.x, oy: py / h - c.y };
      if (phDrag) phCanvas.setPointerCapture(e.pointerId);
      return;
    }
    // text hit-test (topmost first)
    for (let i = P.texts.length - 1; i >= 0; i--) {
      const b = P.texts[i]._bbox;
      if (b && px >= b.x && px <= b.x + b.w && py >= b.y && py <= b.y + b.h) {
        P.selText = i;
        phDrag = { type: "text", idx: i, ox: px / phCanvas.width - P.texts[i].x, oy: py / phCanvas.height - P.texts[i].y };
        phCanvas.setPointerCapture(e.pointerId);
        phRenderTextLayers();
        return;
      }
    }
    // image overlay hit-test
    for (let i = P.overlays.length - 1; i >= 0; i--) {
      const b = P.overlays[i]._bbox;
      if (b && px >= b.x && px <= b.x + b.w && py >= b.y && py <= b.y + b.h) {
        phDrag = { type: "overlay", idx: i, ox: px / phCanvas.width - P.overlays[i].x, oy: py / phCanvas.height - P.overlays[i].y };
        phCanvas.setPointerCapture(e.pointerId);
        return;
      }
    }
  });
  phCanvas.addEventListener("pointermove", (e) => {
    if (!phDrag) return;
    const rect = phCanvas.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    if (phDrag.type === "text") {
      const t = P.texts[phDrag.idx];
      t.x = Math.min(0.98, Math.max(0.02, nx - phDrag.ox));
      t.y = Math.min(0.98, Math.max(0.02, ny - phDrag.oy));
      phRequestRender();
    } else if (phDrag.type === "overlay") {
      const o = P.overlays[phDrag.idx];
      o.x = Math.min(0.98, Math.max(0.02, nx - phDrag.ox));
      o.y = Math.min(0.98, Math.max(0.02, ny - phDrag.oy));
      phRequestRender();
    } else if (phDrag.type === "crop-move") {
      const c = P.cropDraft;
      c.x = Math.min(1 - c.w, Math.max(0, nx - phDrag.ox));
      c.y = Math.min(1 - c.h, Math.max(0, ny - phDrag.oy));
      phRequestRender();
    } else if (phDrag.type === "crop-corner") {
      const c = P.cropDraft;
      const right = c.x + c.w, bottom = c.y + c.h;
      let x1 = c.x, y1 = c.y, x2 = right, y2 = bottom;
      if (phDrag.corner === "tl") { x1 = nx; y1 = ny; }
      if (phDrag.corner === "tr") { x2 = nx; y1 = ny; }
      if (phDrag.corner === "bl") { x1 = nx; y2 = ny; }
      if (phDrag.corner === "br") { x2 = nx; y2 = ny; }
      x1 = Math.max(0, Math.min(x1, x2 - 0.05)); y1 = Math.max(0, Math.min(y1, y2 - 0.05));
      x2 = Math.min(1, Math.max(x2, x1 + 0.05)); y2 = Math.min(1, Math.max(y2, y1 + 0.05));
      let w = x2 - x1, h = y2 - y1;
      if (P.cropAspect) {
        const os = phOrientedSize();
        // adjust h to match aspect in *pixel* terms
        h = (w * os.w / P.cropAspect) / os.h;
        if (phDrag.corner === "tl" || phDrag.corner === "tr") y1 = y2 - h; else y2 = y1 + h;
        if (y1 < 0) { y1 = 0; h = y2 - y1; w = (h * os.h * P.cropAspect) / os.w; if (phDrag.corner === "tl" || phDrag.corner === "bl") x1 = x2 - w; else x2 = x1 + w; }
        if (y2 > 1) { y2 = 1; h = y2 - y1; w = (h * os.h * P.cropAspect) / os.w; if (phDrag.corner === "tl" || phDrag.corner === "bl") x1 = x2 - w; else x2 = x1 + w; }
      }
      P.cropDraft = { x: x1, y: y1, w: x2 - x1, h: y2 - y1 };
      phRequestRender();
    }
  });
  phCanvas.addEventListener("pointerup", () => { phDrag = null; });

  /* --- Text layers UI --- */
  function phRenderTextLayers() {
    const wrap = $("#ph-text-layers");
    wrap.innerHTML = "";
    P.texts.forEach((t, i) => {
      const div = document.createElement("div");
      div.className = "layer-item" + (i === P.selText ? " sel" : "");
      div.innerHTML = `
        <input type="text" value="${t.text.replace(/"/g, "&quot;")}" data-k="text" style="background:var(--navy-2);border:1px solid var(--line);color:var(--ink);border-radius:8px;padding:7px 10px;font-size:.85rem">
        <div class="slider-row"><label>Size</label><input type="range" data-k="size" min="30" max="220" value="${t.size}"><output>${t.size}</output></div>
        <div class="row">
          <div class="swatches">${BRAND_COLORS.map(c => `<button class="swatch${t.color === c ? " active" : ""}" data-c="${c}" style="background:${c}" aria-label="color ${c}"></button>`).join("")}</div>
          <label class="note" style="display:flex;align-items:center;gap:4px"><input type="checkbox" data-k="upper" ${t.upper ? "checked" : ""}>ABC</label>
          <label class="note" style="display:flex;align-items:center;gap:4px"><input type="checkbox" data-k="scrim" ${t.scrim ? "checked" : ""}>Scrim</label>
          <button class="btn small danger" data-del="1">✕</button>
        </div>`;
      div.querySelector('[data-k="text"]').addEventListener("input", (e) => { t.text = e.target.value; phRequestRender(); });
      div.querySelector('[data-k="size"]').addEventListener("input", (e) => { t.size = +e.target.value; e.target.nextElementSibling.textContent = t.size; phRequestRender(); });
      div.querySelector('[data-k="upper"]').addEventListener("change", (e) => { t.upper = e.target.checked; phRequestRender(); });
      div.querySelector('[data-k="scrim"]').addEventListener("change", (e) => { t.scrim = e.target.checked; phRequestRender(); });
      div.querySelectorAll(".swatch").forEach(sw => sw.addEventListener("click", () => { t.color = sw.dataset.c; phRenderTextLayers(); phRequestRender(); }));
      div.querySelector("[data-del]").addEventListener("click", () => { phSnapshot(); P.texts.splice(i, 1); P.selText = -1; phRenderTextLayers(); phRequestRender(); });
      wrap.appendChild(div);
    });
  }

  /* --- Load & open --- */
  function phLoadFile(file) {
    if (!file || !file.type.startsWith("image/")) return toast("That's not an image file");
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      P.img = img; P.name = (file.name || "photo").replace(/\.[^.]+$/, "");
      Object.assign(P, { rot: 0, flipH: false, flipV: false, straighten: 0, crop: null, cropDraft: null, cropping: false, selText: -1 });
      P.adj = Object.assign({}, DEF_ADJ);
      P.texts = []; P.history = [];
      $("#ph-empty").classList.add("hidden");
      $("#ph-workspace").classList.remove("hidden");
      phSyncControls(); phRenderTextLayers(); phRequestRender();
      toast("Photo loaded — happy editing");
    };
    img.onerror = () => toast("Couldn't open that image");
    img.src = url;
  }
  function phLoadDataUrl(dataUrl, name) {
    const img = new Image();
    img.onload = () => {
      P.img = img; P.name = name || "frame";
      Object.assign(P, { rot: 0, flipH: false, flipV: false, straighten: 0, crop: null, cropDraft: null, cropping: false, selText: -1 });
      P.adj = Object.assign({}, DEF_ADJ);
      P.texts = []; P.history = [];
      $("#ph-empty").classList.add("hidden");
      $("#ph-workspace").classList.remove("hidden");
      phSyncControls(); phRenderTextLayers(); phRequestRender();
    };
    img.src = dataUrl;
  }

  /* --- Export --- */
  function phExport() {
    if (!P.img) return;
    let base = phBuildBase(6000, false);
    phApplyAdjustments(base);
    base = phApplyFrame(base);
    const octx = base.getContext("2d");
    phDrawOverlays(octx, base.width, base.height, true);
    let out = base;
    const sizeVal = $("#ph-exp-size").value;
    if (sizeVal !== "orig") {
      const [tw, th] = sizeVal.split("x").map(Number);
      out = document.createElement("canvas");
      out.width = tw; out.height = th;
      const ctx = out.getContext("2d");
      ctx.imageSmoothingQuality = "high";
      const scale = Math.max(tw / base.width, th / base.height);
      const dw = base.width * scale, dh = base.height * scale;
      ctx.drawImage(base, (tw - dw) / 2, (th - dh) / 2, dw, dh);
    }
    const fmt = $("#ph-exp-fmt").value;
    out.toBlob(b => {
      if (!b) return toast("Export failed — try a smaller size");
      download(b, `gem-${P.name}-${sizeVal === "orig" ? "full" : sizeVal}.${fmt === "png" ? "png" : "jpg"}`);
      toast("Exported ✓");
    }, fmt === "png" ? "image/png" : "image/jpeg", 0.92);
  }

  /* --- AI tools --- */
  function phAiThumb() {
    const base = phBuildBase(512, false);
    phApplyAdjustments(base);
    return base.toDataURL("image/jpeg", 0.8);
  }
  function phAiOut(text) {
    const out = $("#ph-ai-out");
    out.textContent = text;
    out.classList.add("show");
    $("#ph-ai-copyrow").classList.remove("hidden");
  }
  async function phAiRun(btn, fn) {
    if (!P.img) return;
    const orig = btn.textContent;
    btn.disabled = true; btn.textContent = "Thinking…";
    try { await fn(); }
    catch (e) { phAiOut("⚠️ " + e.message); }
    finally { btn.disabled = false; btn.textContent = orig; }
  }

  const GRADE_SYSTEM = `You are a professional photo colorist. You will receive a photo. Reply with ONLY a JSON object (no markdown, no prose) giving subtle, tasteful adjustments to make this photo look professionally edited — natural and editorial, never over-filtered. Keys (integers): exposure, contrast, saturation, temperature, tint, highlights, shadows (each -100..100, stay within -35..35), fade (0..25), vignette (0..25), sharpen (0..40). Only include keys worth changing.`;

  /* ============================================================
     VIDEO EDITOR
     ============================================================ */
  const VD_ASPECTS = [["9:16", 9 / 16, "Reel / Story"], ["1:1", 1, "Square"], ["4:5", 4 / 5, "Portrait"], ["16:9", 16 / 9, "Landscape"]];
  const VD_ADJ_DEFS = [
    ["brightness", "Brightness", -50, 50, 0],
    ["contrast", "Contrast", -50, 50, 0],
    ["saturation", "Saturation", -100, 50, 0],
    ["temperature", "Warmth", -50, 50, 0]
  ];
  const VD_PRESETS = [
    ["None", {}],
    ["Clean", { contrast: 8, saturation: 6 }],
    ["Warm", { temperature: 18, contrast: 5 }],
    ["Coastal", { temperature: -14, saturation: 8, brightness: 4 }],
    ["B&W", { saturation: -100, contrast: 12 }],
    ["Matte", { contrast: -6, saturation: -12, brightness: 3 }]
  ];
  const TRANS_DUR = 0.6;

  const V = {
    clips: [], aspect: 9 / 16, aspectName: "9:16", fit: "cover",
    adj: { brightness: 0, contrast: 0, saturation: 0, temperature: 0 },
    texts: [], music: { url: null, name: null, el: null, vol: 35, fade: true },
    vo: { url: null, name: null, el: null, vol: 100, srcNode: null, gain: null },
    overlays: [],
    muteClips: false, logo: false,
    playing: false, t: 0, activeIdx: -1,
    audioCtx: null, audioDest: null, masterGain: null, exporting: false
  };

  const vdCanvas = $("#vd-canvas");
  const vdCtx = vdCanvas.getContext("2d");

  V.totalDur = function () {
    return V.clips.reduce((s, c) => s + Math.max(0, (c.out - c.in) / c.speed), 0);
  };
  V.locate = function (t) {
    let acc = 0;
    for (let i = 0; i < V.clips.length; i++) {
      const c = V.clips[i];
      const d = Math.max(0, (c.out - c.in) / c.speed);
      if (t < acc + d || i === V.clips.length - 1) {
        return { idx: i, src: Math.min(c.out, c.in + (t - acc) * c.speed) };
      }
      acc += d;
    }
    return null;
  };
  V.resize = function () {
    const h = 620;
    vdCanvas.height = h;
    vdCanvas.width = Math.round(h * V.aspect);
    if (V.aspect > 1) { vdCanvas.width = 760; vdCanvas.height = Math.round(760 / V.aspect); }
    vdDrawFrame();
  };

  function vdEnsureAudio() {
    if (V.audioCtx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    V.audioCtx = new AC();
    V.audioDest = V.audioCtx.createMediaStreamDestination();
    V.masterGain = V.audioCtx.createGain();
    V.masterGain.connect(V.audioCtx.destination);
    V.masterGain.connect(V.audioDest);
  }
  function vdWireClipAudio(c) {
    vdEnsureAudio();
    if (!V.audioCtx || c.srcNode) return;
    try {
      c.srcNode = V.audioCtx.createMediaElementSource(c.el);
      c.gain = V.audioCtx.createGain();
      c.srcNode.connect(c.gain); c.gain.connect(V.masterGain);
    } catch (e) { /* already wired */ }
  }
  function vdWireMusicAudio() {
    vdEnsureAudio();
    const m = V.music;
    if (!V.audioCtx || !m.el || m.srcNode) return;
    try {
      m.srcNode = V.audioCtx.createMediaElementSource(m.el);
      m.gain = V.audioCtx.createGain();
      m.srcNode.connect(m.gain); m.gain.connect(V.masterGain);
    } catch (e) { /* already wired */ }
  }

  function vdAddFiles(files) {
    let pending = 0;
    Array.from(files).forEach(f => {
      if (!f.type.startsWith("video/")) return;
      pending++;
      const url = URL.createObjectURL(f);
      const el = document.createElement("video");
      el.src = url; el.preload = "auto"; el.muted = false; el.playsInline = true; el.crossOrigin = "anonymous";
      el.addEventListener("loadedmetadata", () => {
        V.clips.push({
          file: f, url, el, name: f.name, dur: el.duration,
          in: 0, out: el.duration, speed: 1, vol: 100, mute: false, srcNode: null, gain: null,
          trans: "cut", motion: "none"
        });
        pending--;
        if (pending === 0) {
          $("#vd-empty").classList.add("hidden");
          $("#vd-workspace").classList.remove("hidden");
          vdRenderClips(); V.resize(); vdSeek(V.t);
          toast(`${V.clips.length} clip${V.clips.length > 1 ? "s" : ""} on the timeline`);
        }
      }, { once: true });
      el.addEventListener("error", () => { pending--; toast(`Couldn't open ${f.name}`); }, { once: true });
    });
    if (!pending) toast("No video files found in that drop");
  }

  function fmtTime(s) {
    s = Math.max(0, s || 0);
    return Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");
  }

  function vdRenderClips() {
    const wrap = $("#vd-clips");
    wrap.innerHTML = "";
    if (!V.clips.length) { wrap.innerHTML = '<p class="note">No clips yet.</p>'; return; }
    V.clips.forEach((c, i) => {
      const div = document.createElement("div");
      div.className = "clip-item";
      div.innerHTML = `
        <div class="name">${i + 1}. ${c.name} · ${fmtTime(c.dur)}</div>
        <div class="row">
          <span class="note">In ${c.in.toFixed(1)}s</span><button class="btn small" data-a="setin">⌖ from playhead</button>
          <span class="note">Out ${c.out.toFixed(1)}s</span><button class="btn small" data-a="setout">⌖ from playhead</button>
        </div>
        <div class="row">
          <div class="field" style="flex:1"><label>Speed</label>
            <select data-a="speed">${[0.5, 0.75, 1, 1.25, 1.5, 2].map(s => `<option value="${s}"${c.speed === s ? " selected" : ""}>${s}×</option>`).join("")}</select></div>
          <div class="field" style="flex:1"><label>Volume ${c.vol}%</label>
            <input type="range" data-a="vol" min="0" max="100" value="${c.vol}"></div>
        </div>
        <div class="row">
          <div class="field" style="flex:1"><label>Motion</label>
            <select data-a="motion">
              <option value="none"${c.motion === "none" ? " selected" : ""}>None</option>
              <option value="in"${c.motion === "in" ? " selected" : ""}>Slow zoom in</option>
              <option value="out"${c.motion === "out" ? " selected" : ""}>Slow zoom out</option>
              <option value="lr"${c.motion === "lr" ? " selected" : ""}>Pan left → right</option>
              <option value="rl"${c.motion === "rl" ? " selected" : ""}>Pan right → left</option>
            </select></div>
          <div class="field" style="flex:1"><label>Transition out</label>
            <select data-a="trans" ${i === V.clips.length - 1 ? "disabled" : ""}>
              <option value="cut"${c.trans === "cut" ? " selected" : ""}>Cut</option>
              <option value="fade"${c.trans === "fade" ? " selected" : ""}>Crossfade</option>
              <option value="black"${c.trans === "black" ? " selected" : ""}>Dip to black</option>
            </select></div>
        </div>
        <div class="row">
          <button class="btn small" data-a="up" ${i === 0 ? "disabled" : ""}>↑</button>
          <button class="btn small" data-a="down" ${i === V.clips.length - 1 ? "disabled" : ""}>↓</button>
          <button class="btn small danger" data-a="del">Remove</button>
        </div>`;
      div.querySelector('[data-a="setin"]').addEventListener("click", () => {
        const loc = V.locate(V.t);
        if (loc && loc.idx === i) { c.in = Math.min(loc.src, c.out - 0.2); vdRenderClips(); vdUpdateTime(); }
        else toast("Move the playhead into this clip first");
      });
      div.querySelector('[data-a="setout"]').addEventListener("click", () => {
        const loc = V.locate(V.t);
        if (loc && loc.idx === i) { c.out = Math.max(loc.src, c.in + 0.2); vdRenderClips(); vdUpdateTime(); }
        else toast("Move the playhead into this clip first");
      });
      div.querySelector('[data-a="speed"]').addEventListener("change", (e) => { c.speed = +e.target.value; vdUpdateTime(); });
      div.querySelector('[data-a="vol"]').addEventListener("input", (e) => { c.vol = +e.target.value; });
      div.querySelector('[data-a="motion"]').addEventListener("change", (e) => { c.motion = e.target.value; vdDrawFrame(); });
      div.querySelector('[data-a="trans"]').addEventListener("change", (e) => { c.trans = e.target.value; });
      div.querySelector('[data-a="up"]').addEventListener("click", () => { [V.clips[i - 1], V.clips[i]] = [V.clips[i], V.clips[i - 1]]; vdRenderClips(); });
      div.querySelector('[data-a="down"]').addEventListener("click", () => { [V.clips[i + 1], V.clips[i]] = [V.clips[i], V.clips[i + 1]]; vdRenderClips(); });
      div.querySelector('[data-a="del"]').addEventListener("click", () => {
        vdPause(); URL.revokeObjectURL(c.url); V.clips.splice(i, 1);
        if (!V.clips.length) { $("#vd-workspace").classList.add("hidden"); $("#vd-empty").classList.remove("hidden"); }
        vdRenderClips(); vdUpdateTime();
      });
      wrap.appendChild(div);
    });
  }

  function vdColorFilter() {
    const a = V.adj;
    const filters = [];
    if (a.brightness) filters.push(`brightness(${1 + a.brightness / 100})`);
    if (a.contrast) filters.push(`contrast(${1 + a.contrast / 100})`);
    if (a.saturation) filters.push(`saturate(${Math.max(0, 1 + a.saturation / 100)})`);
    return filters.join(" ") || "none";
  }
  function vdDrawClip(c, w, h, alpha) {
    const vid = c.el;
    if (vid.readyState < 2) return;
    const vw = vid.videoWidth, vh = vid.videoHeight;
    if (!vw || !vh) return;
    // Ken Burns motion
    const span = Math.max(0.01, c.out - c.in);
    const q = Math.min(1, Math.max(0, (vid.currentTime - c.in) / span));
    let mScale = 1, mx = 0;
    if (c.motion === "in") mScale = 1 + 0.10 * q;
    if (c.motion === "out") mScale = 1.10 - 0.10 * q;
    if (c.motion === "lr") { mScale = 1.08; mx = (q - 0.5) * 0.08 * w; }
    if (c.motion === "rl") { mScale = 1.08; mx = (0.5 - q) * 0.08 * w; }
    const scale = (V.fit === "cover" ? Math.max(w / vw, h / vh) : Math.min(w / vw, h / vh)) * mScale;
    const dw = vw * scale, dh = vh * scale;
    vdCtx.save();
    vdCtx.globalAlpha = alpha;
    vdCtx.filter = vdColorFilter();
    vdCtx.drawImage(vid, (w - dw) / 2 + mx, (h - dh) / 2, dw, dh);
    vdCtx.restore();
  }
  function vdDrawFrame() {
    const w = vdCanvas.width, h = vdCanvas.height;
    vdCtx.filter = "none";
    vdCtx.fillStyle = "#06161d";
    vdCtx.fillRect(0, 0, w, h);
    const loc = V.locate(V.t);
    if (!loc) return;
    const c = V.clips[loc.idx];
    const next = V.clips[loc.idx + 1];
    // transition progress at the tail of the current clip
    const remain = (c.out - c.el.currentTime) / c.speed;
    const p = (next && c.trans !== "cut" && remain < TRANS_DUR) ? 1 - remain / TRANS_DUR : 0;
    vdDrawClip(c, w, h, 1);
    if (p > 0 && c.trans === "fade" && next.el.readyState >= 2) vdDrawClip(next, w, h, p);
    if (p > 0 && c.trans === "black") {
      vdCtx.fillStyle = `rgba(4,12,16,${p})`;
      vdCtx.fillRect(0, 0, w, h);
    }
    // dip-to-black recovery at the head of a clip whose predecessor dipped
    const prev = V.clips[loc.idx - 1];
    if (prev && prev.trans === "black") {
      const into = (c.el.currentTime - c.in) / c.speed;
      if (into < TRANS_DUR / 2) {
        vdCtx.fillStyle = `rgba(4,12,16,${1 - into / (TRANS_DUR / 2)})`;
        vdCtx.fillRect(0, 0, w, h);
      }
    }
    const a = V.adj;
    if (a.temperature) {
      vdCtx.save();
      vdCtx.globalCompositeOperation = "soft-light";
      vdCtx.globalAlpha = Math.min(0.6, Math.abs(a.temperature) / 60);
      vdCtx.fillStyle = a.temperature > 0 ? "#ff9c40" : "#3d7dff";
      vdCtx.fillRect(0, 0, w, h);
      vdCtx.restore();
    }
    // image overlays (badges, headshots, logos)
    V.overlays.forEach(o => {
      if (!o.img) return;
      if (V.t < o.start || V.t > o.end) return;
      const ow = (o.size / 100) * w;
      const oh = ow * (o.img.height / o.img.width);
      const m = w * 0.04;
      let x = w - ow - m, y = m;
      if (o.pos === "tl") x = m;
      if (o.pos === "bl") { x = m; y = h - oh - m; }
      if (o.pos === "br") { y = h - oh - m; }
      if (o.pos === "c") { x = w / 2 - ow / 2; y = h / 2 - oh / 2; }
      vdCtx.save();
      vdCtx.globalAlpha = o.op / 100;
      vdCtx.drawImage(o.img, x, y, ow, oh);
      vdCtx.restore();
    });
    // text overlays
    V.texts.forEach(t => {
      if (V.t < t.start || V.t > t.end) return;
      const size = (t.size / 100) * h * 0.08;
      vdCtx.save();
      vdCtx.font = `800 ${size}px "Avenir Next","Segoe UI",Arial,sans-serif`;
      vdCtx.textAlign = "center"; vdCtx.textBaseline = "middle";
      const content = t.upper ? t.text.toUpperCase() : t.text;
      const y = t.pos === "top" ? h * 0.12 : t.pos === "center" ? h * 0.5 : h * 0.82;
      const tw = vdCtx.measureText(content).width;
      if (t.scrim) {
        vdCtx.fillStyle = "rgba(8,30,39,.62)";
        vdCtx.fillRect(w / 2 - tw / 2 - size * 0.5, y - size * 0.75, tw + size, size * 1.5);
      } else {
        vdCtx.shadowColor = "rgba(0,0,0,.5)"; vdCtx.shadowBlur = size * 0.2;
      }
      vdCtx.fillStyle = t.color;
      vdCtx.fillText(content, w / 2, y);
      vdCtx.restore();
    });
    if (V.logo) drawGemLogo(vdCtx, w - w * 0.14, h - w * 0.14, w * 0.1, 0.85);
  }

  function vdUpdateTime() {
    const total = V.totalDur();
    $("#vd-time").textContent = fmtTime(V.t) + " / " + fmtTime(total);
    $("#vid-scrub").value = total ? Math.round((V.t / total) * 1000) : 0;
  }

  function vdSeek(t) {
    V.t = Math.max(0, Math.min(t, V.totalDur()));
    const loc = V.locate(V.t);
    if (loc) {
      const c = V.clips[loc.idx];
      if (Math.abs(c.el.currentTime - loc.src) > 0.05) c.el.currentTime = loc.src;
      V.activeIdx = loc.idx;
      const draw = () => { vdDrawFrame(); vdUpdateTime(); };
      if (c.el.seeking) c.el.addEventListener("seeked", draw, { once: true });
      else setTimeout(draw, 30);
    }
    vdUpdateTime();
  }

  function vdApplyVolumes(loc) {
    V.clips.forEach((c, i) => {
      const vol = (V.muteClips || c.mute) ? 0 : c.vol / 100;
      if (c.gain) c.gain.gain.value = i === loc.idx ? vol : 0;
      else c.el.volume = i === loc.idx ? vol : 0;
      c.el.muted = (V.muteClips || c.mute);
    });
    const m = V.music;
    if (m.el) {
      let v = m.vol / 100;
      if (m.fade) {
        const total = V.totalDur();
        const f = 1.2;
        if (V.t < f) v *= V.t / f;
        if (total - V.t < f) v *= Math.max(0, (total - V.t) / f);
      }
      if (m.gain) m.gain.gain.value = v; else m.el.volume = v;
    }
    if (V.vo.el) {
      const v = V.vo.vol / 100;
      if (V.vo.gain) V.vo.gain.gain.value = v; else V.vo.el.volume = v;
    }
  }
  function vdWireVoAudio() {
    vdEnsureAudio();
    const vo = V.vo;
    if (!V.audioCtx || !vo.el || vo.srcNode) return;
    try {
      vo.srcNode = V.audioCtx.createMediaElementSource(vo.el);
      vo.gain = V.audioCtx.createGain();
      vo.srcNode.connect(vo.gain); vo.gain.connect(V.masterGain);
    } catch (e) { /* already wired */ }
  }

  let vdRaf = null;
  function vdPlay() {
    if (!V.clips.length || V.playing) return;
    if (V.t >= V.totalDur() - 0.05) V.t = 0;
    vdEnsureAudio();
    if (V.audioCtx && V.audioCtx.state === "suspended") V.audioCtx.resume();
    V.clips.forEach(c => vdWireClipAudio(c));
    vdWireMusicAudio();
    vdWireVoAudio();
    V.playing = true;
    $("#vd-play").textContent = "⏸ Pause";
    let loc = V.locate(V.t);
    const startClip = () => {
      const c = V.clips[loc.idx];
      // if the clip is already rolling (transition pre-roll), don't rewind it
      if (c.el.paused || Math.abs(c.el.currentTime - loc.src) > TRANS_DUR + 0.2) c.el.currentTime = loc.src;
      c.el.playbackRate = c.speed;
      vdApplyVolumes(loc);
      c.el.play().catch(() => {});
      V.activeIdx = loc.idx;
    };
    startClip();
    if (V.music.el) {
      try { V.music.el.currentTime = Math.min(V.t, V.music.el.duration || V.t); } catch (e) {}
      V.music.el.play().catch(() => {});
    }
    if (V.vo.el) {
      try { V.vo.el.currentTime = V.t; } catch (e) {}
      V.vo.el.play().catch(() => {});
    }
    let offsetBefore = 0;
    for (let i = 0; i < loc.idx; i++) offsetBefore += (V.clips[i].out - V.clips[i].in) / V.clips[i].speed;
    const tick = () => {
      if (!V.playing) return;
      const c = V.clips[V.activeIdx];
      V.t = offsetBefore + (c.el.currentTime - c.in) / c.speed;
      // pre-roll the next clip during a transition window
      const nxt = V.clips[V.activeIdx + 1];
      if (nxt && c.trans === "fade" && (c.out - c.el.currentTime) / c.speed < TRANS_DUR && nxt.el.paused) {
        nxt.el.currentTime = nxt.in;
        nxt.el.playbackRate = nxt.speed;
        nxt.el.play().catch(() => {});
      }
      if (c.el.currentTime >= c.out - 0.03 || c.el.ended) {
        c.el.pause();
        if (V.activeIdx < V.clips.length - 1) {
          offsetBefore += (c.out - c.in) / c.speed;
          loc = { idx: V.activeIdx + 1, src: V.clips[V.activeIdx + 1].in };
          startClip();
        } else {
          vdPause();
          V.t = V.totalDur();
          vdUpdateTime(); vdDrawFrame();
          if (V.onPlaybackDone) V.onPlaybackDone();
          return;
        }
      }
      vdApplyVolumes({ idx: V.activeIdx });
      vdDrawFrame(); vdUpdateTime();
      vdRaf = requestAnimationFrame(tick);
    };
    vdRaf = requestAnimationFrame(tick);
  }
  function vdPause() {
    V.playing = false;
    $("#vd-play").textContent = "▶ Play";
    if (vdRaf) cancelAnimationFrame(vdRaf);
    V.clips.forEach(c => c.el.pause());
    if (V.music.el) V.music.el.pause();
    if (V.vo.el) V.vo.el.pause();
  }

  /* --- Voiceover recording --- */
  let voRec = null;
  async function voToggle(btn) {
    if (voRec) { voRec.stop(); return; }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return toast("This browser can't record audio");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      const chunks = [];
      mr.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
      mr.onstop = () => {
        stream.getTracks().forEach(t => t.stop());
        const blob = new Blob(chunks, { type: mr.mimeType || "audio/webm" });
        if (V.vo.url) URL.revokeObjectURL(V.vo.url);
        if (V.vo.srcNode) { try { V.vo.srcNode.disconnect(); } catch (e) {} }
        const url = URL.createObjectURL(blob);
        V.vo = { url, name: "voiceover", el: new Audio(url), vol: V.vo.vol, srcNode: null, gain: null };
        $("#vd-vo-name").textContent = "🎙 Voiceover attached";
        voRec = null;
        btn.textContent = "🎙 Record voiceover";
        vdPause();
        toast("Voiceover attached to the timeline");
      };
      voRec = mr;
      mr.start();
      btn.textContent = "⏹ Stop recording";
      vdSeek(0);
      vdPlay();
      toast("Recording — narrate over the playback (headphones avoid echo)");
    } catch (e) {
      toast("Microphone unavailable — check browser permissions");
    }
  }

  /* --- Script → timed caption cards (CapCut-style) --- */
  function spreadCaptions(script) {
    const words = script.trim().split(/\s+/).filter(Boolean);
    const total = V.totalDur();
    if (!words.length) return toast("Paste your script first");
    if (!total) return toast("Add clips first");
    const chunks = [];
    for (let i = 0; i < words.length; i += 4) chunks.push(words.slice(i, i + 4).join(" "));
    const per = total / chunks.length;
    chunks.forEach((txt, i) => {
      V.texts.push({
        text: txt, start: +(i * per).toFixed(1), end: +(((i + 1) * per) - 0.05).toFixed(1),
        pos: "lower", size: 90, color: "#FFFFFF", upper: false, scrim: true
      });
    });
    vdRenderTextLayers(); vdDrawFrame();
    toast(`${chunks.length} caption cards placed — tweak timings in the list`);
  }

  /* --- Video text overlays UI --- */
  function vdRenderTextLayers() {
    const wrap = $("#vd-text-layers");
    wrap.innerHTML = "";
    V.texts.forEach((t, i) => {
      const div = document.createElement("div");
      div.className = "layer-item";
      div.innerHTML = `
        <input type="text" value="${t.text.replace(/"/g, "&quot;")}" data-k="text" style="background:var(--navy-2);border:1px solid var(--line);color:var(--ink);border-radius:8px;padding:7px 10px;font-size:.85rem">
        <div class="row">
          <div class="field" style="flex:1"><label>From (s)</label><input type="number" data-k="start" min="0" step="0.5" value="${t.start}"></div>
          <div class="field" style="flex:1"><label>To (s)</label><input type="number" data-k="end" min="0" step="0.5" value="${t.end}"></div>
          <div class="field" style="flex:1"><label>Position</label>
            <select data-k="pos"><option value="lower"${t.pos === "lower" ? " selected" : ""}>Lower third</option><option value="center"${t.pos === "center" ? " selected" : ""}>Center</option><option value="top"${t.pos === "top" ? " selected" : ""}>Top</option></select></div>
        </div>
        <div class="slider-row"><label>Size</label><input type="range" data-k="size" min="40" max="200" value="${t.size}"><output>${t.size}</output></div>
        <div class="row">
          <div class="swatches">${BRAND_COLORS.map(c => `<button class="swatch${t.color === c ? " active" : ""}" data-c="${c}" style="background:${c}"></button>`).join("")}</div>
          <label class="note" style="display:flex;align-items:center;gap:4px"><input type="checkbox" data-k="scrim" ${t.scrim ? "checked" : ""}>Scrim</label>
          <button class="btn small danger" data-del="1">✕</button>
        </div>`;
      div.querySelector('[data-k="text"]').addEventListener("input", e => { t.text = e.target.value; vdDrawFrame(); });
      div.querySelector('[data-k="start"]').addEventListener("input", e => { t.start = +e.target.value || 0; vdDrawFrame(); });
      div.querySelector('[data-k="end"]').addEventListener("input", e => { t.end = +e.target.value || 0; vdDrawFrame(); });
      div.querySelector('[data-k="pos"]').addEventListener("change", e => { t.pos = e.target.value; vdDrawFrame(); });
      div.querySelector('[data-k="size"]').addEventListener("input", e => { t.size = +e.target.value; e.target.nextElementSibling.textContent = t.size; vdDrawFrame(); });
      div.querySelector('[data-k="scrim"]').addEventListener("change", e => { t.scrim = e.target.checked; vdDrawFrame(); });
      div.querySelectorAll(".swatch").forEach(sw => sw.addEventListener("click", () => { t.color = sw.dataset.c; vdRenderTextLayers(); vdDrawFrame(); }));
      div.querySelector("[data-del]").addEventListener("click", () => { V.texts.splice(i, 1); vdRenderTextLayers(); vdDrawFrame(); });
      wrap.appendChild(div);
    });
  }

  /* --- Export --- */
  function vdPickMime() {
    const candidates = [
      'video/mp4;codecs="avc1.42E01E,mp4a.40.2"',
      "video/mp4",
      'video/webm;codecs="vp9,opus"',
      "video/webm"
    ];
    for (const c of candidates) {
      if (window.MediaRecorder && MediaRecorder.isTypeSupported(c)) return c;
    }
    return null;
  }

  async function vdExport() {
    if (!V.clips.length || V.exporting) return;
    const mime = vdPickMime();
    if (!mime) return toast("This browser can't record video — try Chrome or Safari");
    V.exporting = true;
    const btn = $("#vd-export");
    btn.disabled = true; btn.textContent = "Rendering…";
    const prog = $("#vd-exp-prog");
    prog.classList.remove("hidden");
    vdPause();
    vdSeek(0);
    // export-resolution canvas mirrors the preview canvas each frame
    const res = +$("#vd-exp-res").value;
    const scaleTo = res / Math.max(vdCanvas.width, vdCanvas.height) * (V.aspect <= 1 ? 1 : 1);
    const exp = document.createElement("canvas");
    exp.width = Math.round(vdCanvas.width * (res / vdCanvas.height));
    exp.height = res;
    if (V.aspect > 1) { exp.width = res; exp.height = Math.round(res / (vdCanvas.width / vdCanvas.height)); }
    const ectx = exp.getContext("2d");
    const copier = setInterval(() => {
      ectx.imageSmoothingQuality = "high";
      ectx.drawImage(vdCanvas, 0, 0, exp.width, exp.height);
    }, 1000 / 30);

    vdEnsureAudio();
    V.clips.forEach(c => vdWireClipAudio(c));
    vdWireMusicAudio();
    vdWireVoAudio();
    const stream = exp.captureStream(30);
    if (V.audioDest) V.audioDest.stream.getAudioTracks().forEach(t => stream.addTrack(t));
    const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 8_000_000 });
    const chunks = [];
    rec.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
    const done = new Promise(res2 => rec.onstop = res2);
    const total = V.totalDur();
    const progTimer = setInterval(() => {
      prog.firstElementChild.style.width = Math.min(100, (V.t / total) * 100) + "%";
    }, 200);

    rec.start(500);
    V.onPlaybackDone = () => {
      setTimeout(() => rec.stop(), 300);
    };
    vdPlay();
    await done;
    clearInterval(copier); clearInterval(progTimer);
    V.onPlaybackDone = null;
    const ext = mime.startsWith("video/mp4") ? "mp4" : "webm";
    const blob = new Blob(chunks, { type: mime.split(";")[0] });
    download(blob, `gem-reel-${V.aspectName.replace(":", "x")}.${ext}`);
    prog.classList.add("hidden");
    prog.firstElementChild.style.width = "0%";
    btn.disabled = false; btn.textContent = "⬇ Export video";
    V.exporting = false;
    toast(ext === "mp4" ? "Exported MP4 ✓ — ready for Instagram" : "Exported WebM ✓ — Instagram needs MP4; upload to CapCut/HandBrake for a quick convert, or export from Safari/Chrome 130+ for MP4");
  }

  /* --- Frame capture --- */
  function vdCaptureFrameCanvas() {
    const loc = V.locate(V.t);
    if (!loc) return null;
    const c = V.clips[loc.idx].el;
    const full = document.createElement("canvas");
    const scale = Math.max(1080 / vdCanvas.width, 1);
    full.width = vdCanvas.width * scale; full.height = vdCanvas.height * scale;
    const fctx = full.getContext("2d");
    fctx.imageSmoothingQuality = "high";
    fctx.drawImage(vdCanvas, 0, 0, full.width, full.height);
    return full;
  }

  /* ============================================================
     MUSIC PANEL
     ============================================================ */
  function loadMusicFile(file) {
    if (!file || !file.type.startsWith("audio/")) return toast("That's not an audio file");
    if (V.music.url) URL.revokeObjectURL(V.music.url);
    if (V.music.srcNode) { try { V.music.srcNode.disconnect(); } catch (e) {} }
    const url = URL.createObjectURL(file);
    const el = new Audio(url);
    el.loop = true;
    V.music = { url, name: file.name, el, vol: V.music.vol, fade: V.music.fade, srcNode: null, gain: null };
    $("#vd-music-name").textContent = "🎵 " + file.name;
    $("#mu-loaded").textContent = "🎵 " + file.name + " — ready in the Video tab";
    toast("Track loaded into the video editor");
  }

  function renderSpList() {
    const wrap = $("#sp-list");
    let list = [];
    try { list = JSON.parse(localStorage.getItem("gem-music-ideas") || "[]"); } catch (e) {}
    wrap.innerHTML = list.length ? "" : '<p class="note">No saved track ideas yet.</p>';
    list.forEach((item, i) => {
      const row = document.createElement("div");
      row.className = "row";
      row.style.justifyContent = "space-between";
      row.innerHTML = `<span class="note" style="color:var(--ink)">🎧 ${item}</span>
        <span class="row">
          <a class="btn small" style="text-decoration:none" href="https://open.spotify.com/search/${encodeURIComponent(item)}" target="_blank" rel="noopener">Spotify ↗</a>
          <button class="btn small danger" data-i="${i}">✕</button>
        </span>`;
      row.querySelector("button").addEventListener("click", () => {
        list.splice(i, 1);
        localStorage.setItem("gem-music-ideas", JSON.stringify(list));
        renderSpList();
      });
      wrap.appendChild(row);
    });
  }

  /* ============================================================
     WIRING
     ============================================================ */
  function init() {
    /* ---- photo: open ---- */
    const phDrop = $("#ph-drop"), phFile = $("#ph-file");
    phDrop.addEventListener("click", () => phFile.click());
    phDrop.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") phFile.click(); });
    phFile.addEventListener("change", e => { if (e.target.files[0]) phLoadFile(e.target.files[0]); e.target.value = ""; });
    ["dragover", "dragleave", "drop"].forEach(ev => phDrop.addEventListener(ev, e => {
      e.preventDefault();
      phDrop.classList.toggle("over", ev === "dragover");
      if (ev === "drop" && e.dataTransfer.files[0]) phLoadFile(e.dataTransfer.files[0]);
    }));
    document.addEventListener("paste", e => {
      if (!$("#mode-photo").classList.contains("active")) return;
      const item = Array.from(e.clipboardData.items).find(i => i.type.startsWith("image/"));
      if (item) phLoadFile(item.getAsFile());
    });
    $("#ph-new").addEventListener("click", () => { $("#ph-workspace").classList.add("hidden"); $("#ph-empty").classList.remove("hidden"); });
    $("#ph-undo").addEventListener("click", phUndo);
    const cmp = $("#ph-compare");
    ["pointerdown", "pointerup", "pointerleave"].forEach(ev =>
      cmp.addEventListener(ev, e => { P.compare = ev === "pointerdown"; phRequestRender(); }));

    /* ---- photo: sliders ---- */
    const sl = $("#ph-sliders");
    ADJ_DEFS.forEach(([k, label, min, max, def]) => {
      const row = document.createElement("div");
      row.className = "slider-row";
      row.innerHTML = `<label for="adj-${k}">${label}</label>
        <input type="range" id="adj-${k}" min="${min}" max="${max}" value="${def}">
        <output id="adj-${k}-val">${def}</output>`;
      row.querySelector("input").addEventListener("input", e => {
        P.adj[k] = +e.target.value;
        $("#adj-" + k + "-val").textContent = e.target.value;
        phRequestRender();
      });
      sl.appendChild(row);
    });
    const resetRow = document.createElement("div");
    resetRow.className = "row";
    resetRow.innerHTML = '<button class="btn small" id="ph-adj-reset">Reset all</button>';
    resetRow.querySelector("button").addEventListener("click", () => {
      phSnapshot(); P.adj = Object.assign({}, DEF_ADJ); phSyncControls(); phRequestRender();
    });
    sl.appendChild(resetRow);

    /* ---- photo: presets ---- */
    const pr = $("#ph-presets");
    PH_PRESETS.forEach(([name, adj]) => {
      const b = document.createElement("button");
      b.className = "chip"; b.textContent = name;
      b.addEventListener("click", () => {
        phSnapshot();
        P.adj = Object.assign({}, DEF_ADJ, adj);
        $$(".chip", pr).forEach(x => x.classList.toggle("active", x === b));
        phSyncControls(); phRequestRender();
      });
      pr.appendChild(b);
    });

    /* ---- photo: crop & rotate ---- */
    const asp = $("#ph-aspects");
    [["Free", null], ["1:1", 1], ["4:5", 4 / 5], ["9:16", 9 / 16], ["16:9", 16 / 9], ["3:2", 3 / 2]].forEach(([label, ratio]) => {
      const b = document.createElement("button");
      b.className = "chip"; b.textContent = label;
      b.addEventListener("click", () => {
        $$(".chip", asp).forEach(x => x.classList.toggle("active", x === b));
        phStartCrop(ratio);
      });
      asp.appendChild(b);
    });
    $("#ph-crop-apply").addEventListener("click", () => {
      if (!P.cropping || !P.cropDraft) return toast("Pick an aspect first to start cropping");
      phSnapshot();
      // compose with existing crop if one was applied before
      const prev = P.crop, d = P.cropDraft;
      P.crop = prev
        ? { x: prev.x + d.x * prev.w, y: prev.y + d.y * prev.h, w: d.w * prev.w, h: d.h * prev.h }
        : d;
      P.cropping = false; P.cropDraft = null;
      $$(".chip", asp).forEach(x => x.classList.remove("active"));
      phRequestRender();
      toast("Crop applied");
    });
    $("#ph-crop-cancel").addEventListener("click", () => {
      phSnapshot();
      P.crop = null; P.cropping = false; P.cropDraft = null;
      $$(".chip", asp).forEach(x => x.classList.remove("active"));
      phRequestRender();
    });
    $("#ph-rot").addEventListener("click", () => { phSnapshot(); P.rot = (P.rot + 90) % 360; P.crop = null; phRequestRender(); });
    $("#ph-fliph").addEventListener("click", () => { phSnapshot(); P.flipH = !P.flipH; phRequestRender(); });
    $("#ph-flipv").addEventListener("click", () => { phSnapshot(); P.flipV = !P.flipV; phRequestRender(); });
    $("#ph-straighten").addEventListener("input", e => {
      P.straighten = +e.target.value;
      $("#ph-straighten-val").textContent = e.target.value + "°";
      phRequestRender();
    });

    /* ---- photo: text ---- */
    $("#ph-add-text").addEventListener("click", () => {
      if (!P.img) return;
      phSnapshot();
      P.texts.push({ text: "Your headline", x: 0.5, y: 0.5, size: 100, color: "#FFFFFF", weight: 800, upper: false, scrim: false });
      P.selText = P.texts.length - 1;
      phRenderTextLayers(); phRequestRender();
    });

    /* ---- photo: badges ---- */
    const BADGES = [
      ["JUST LISTED", "#E8C468"], ["JUST SOLD", "#45B6E8"], ["OPEN HOUSE", "#F7F4EF"],
      ["NEW PRICE", "#E8C468"], ["UNDER CONTRACT", "#45B6E8"]
    ];
    const bwrap = $("#ph-badges");
    BADGES.forEach(([label, bg]) => {
      const b = document.createElement("button");
      b.className = "chip"; b.textContent = label;
      b.addEventListener("click", () => {
        if (!P.img) return;
        phSnapshot();
        P.texts.push({ text: label, x: 0.5, y: 0.12, size: 60, color: "#0D2B36", weight: 800, upper: true, scrim: false, badge: true, bg });
        P.selText = P.texts.length - 1;
        phRenderTextLayers(); phRequestRender();
      });
      bwrap.appendChild(b);
    });

    /* ---- photo: image overlays ---- */
    function phRenderOverlays() {
      const wrap = $("#ph-overlays");
      wrap.innerHTML = "";
      P.overlays.forEach((o, i) => {
        const div = document.createElement("div");
        div.className = "layer-item";
        div.innerHTML = `
          <div class="note" style="color:var(--ink)">🖼 ${o.name}</div>
          <div class="slider-row"><label>Size</label><input type="range" data-k="scale" min="5" max="80" value="${Math.round(o.scale * 100)}"><output>${Math.round(o.scale * 100)}%</output></div>
          <div class="slider-row"><label>Opacity</label><input type="range" data-k="op" min="10" max="100" value="${o.op}"><output>${o.op}%</output></div>
          <button class="btn small danger">Remove</button>`;
        div.querySelector('[data-k="scale"]').addEventListener("input", e => { o.scale = +e.target.value / 100; e.target.nextElementSibling.textContent = e.target.value + "%"; phRequestRender(); });
        div.querySelector('[data-k="op"]').addEventListener("input", e => { o.op = +e.target.value; e.target.nextElementSibling.textContent = e.target.value + "%"; phRequestRender(); });
        div.querySelector(".danger").addEventListener("click", () => { P.overlays.splice(i, 1); phRenderOverlays(); phRequestRender(); });
        wrap.appendChild(div);
      });
    }
    const phOvFile = document.createElement("input");
    phOvFile.type = "file"; phOvFile.accept = "image/*";
    phOvFile.addEventListener("change", e => {
      const f = e.target.files[0];
      if (!f) return;
      const img = new Image();
      img.onload = () => {
        P.overlays.push({ img, name: f.name, x: 0.5, y: 0.5, scale: 0.25, op: 100 });
        phRenderOverlays(); phRequestRender();
        toast("Overlay added — drag it into place");
      };
      img.src = URL.createObjectURL(f);
      phOvFile.value = "";
    });
    $("#ph-add-overlay").addEventListener("click", () => { if (P.img) phOvFile.click(); });

    /* ---- photo: LUT ---- */
    const lutFile = document.createElement("input");
    lutFile.type = "file"; lutFile.accept = ".cube,.CUBE";
    lutFile.addEventListener("change", e => {
      const f = e.target.files[0];
      if (!f) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          P.lut = parseCube(String(reader.result));
          P.lutName = f.name;
          $("#ph-lut-name").textContent = "🎞 " + f.name;
          $("#ph-lut-controls").classList.remove("hidden");
          phRequestRender();
          toast("LUT applied");
        } catch (err) { toast(err.message); }
      };
      reader.readAsText(f);
      lutFile.value = "";
    });
    $("#ph-lut-btn").addEventListener("click", () => lutFile.click());
    $("#ph-lut-mix").addEventListener("input", e => { P.lutMix = +e.target.value; $("#ph-lut-mix-val").textContent = e.target.value + "%"; phRequestRender(); });
    $("#ph-lut-clear").addEventListener("click", () => {
      P.lut = null; P.lutName = "";
      $("#ph-lut-name").textContent = "";
      $("#ph-lut-controls").classList.add("hidden");
      phRequestRender();
    });

    /* ---- photo: frame ---- */
    $("#ph-frame-pad").addEventListener("input", e => {
      P.frame.pad = +e.target.value;
      $("#ph-frame-pad-val").textContent = e.target.value + "%";
      phRequestRender();
    });
    $$("#ph-frame-colors .swatch").forEach(sw => sw.addEventListener("click", () => {
      P.frame.color = sw.dataset.c;
      $$("#ph-frame-colors .swatch").forEach(x => x.classList.toggle("active", x === sw));
      phRequestRender();
    }));

    /* ---- photo: logo ---- */
    $("#ph-logo-on").addEventListener("change", e => { P.logo.on = e.target.checked; phRequestRender(); });
    $("#ph-logo-pos").addEventListener("change", e => { P.logo.pos = e.target.value; phRequestRender(); });
    $("#ph-logo-size").addEventListener("input", e => { P.logo.size = +e.target.value; $("#ph-logo-size-val").textContent = e.target.value + "%"; phRequestRender(); });
    $("#ph-logo-op").addEventListener("input", e => { P.logo.op = +e.target.value; $("#ph-logo-op-val").textContent = e.target.value + "%"; phRequestRender(); });

    /* ---- photo: AI ---- */
    $("#ph-ai-grade").addEventListener("click", e => phAiRun(e.target, async () => {
      const raw = await GEM.aiVision(
        "Grade this photo. Reply with ONLY the JSON object.",
        phAiThumb(), { system: GRADE_SYSTEM });
      const m = raw.match(/\{[\s\S]*\}/);
      if (!m) throw new Error("The AI didn't return usable settings — try again.");
      const adj = JSON.parse(m[0]);
      phSnapshot();
      Object.keys(adj).forEach(k => { if (k in DEF_ADJ && typeof adj[k] === "number") P.adj[k] = Math.round(adj[k]); });
      phSyncControls(); phRequestRender();
      phAiOut("✨ Auto-grade applied: " + Object.keys(adj).map(k => `${k} ${adj[k] > 0 ? "+" : ""}${adj[k]}`).join(", ") + "\n\nFine-tune with the sliders, or Undo to go back.");
    }));
    $("#ph-ai-caption").addEventListener("click", e => phAiRun(e.target, async () => {
      const text = await GEM.aiVision(
        "Write an Instagram caption for this photo, posted by GEM Home Team. Reflect what is actually in the photo. Hook first line, short paragraphs, one CTA (DM keyword or link in bio), 3-5 fitting emoji max.",
        phAiThumb());
      phAiOut(text + "\n\n" + GEM.buildDisclaimer(GEM.getSettings()));
    }));
    $("#ph-ai-alt").addEventListener("click", e => phAiRun(e.target, async () => {
      const text = await GEM.aiVision(
        "Write concise alt text for this image for accessibility (one to two sentences, factual, no hashtags, no 'image of').",
        phAiThumb());
      phAiOut(text);
    }));
    $("#ph-ai-critique").addEventListener("click", e => phAiRun(e.target, async () => {
      const text = await GEM.aiVision(
        "You're a social media photo coach for a real estate/mortgage brand. In 5 short bullet points: what works in this photo, and what specific edits (crop, light, color) would make it stronger for Instagram. Be direct and practical.",
        phAiThumb());
      phAiOut(text);
    }));
    $("#ph-ai-copy").addEventListener("click", () => {
      const txt = $("#ph-ai-out").textContent;
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(() => toast("Copied ✓"));
      else {
        const ta = document.createElement("textarea");
        ta.value = txt; document.body.appendChild(ta); ta.select();
        document.execCommand("copy"); ta.remove(); toast("Copied ✓");
      }
    });

    /* ---- photo: export ---- */
    $("#ph-export").addEventListener("click", phExport);

    /* ---- video: open ---- */
    const vdDrop = $("#vd-drop"), vdFile = $("#vd-file");
    vdDrop.addEventListener("click", () => vdFile.click());
    vdFile.addEventListener("change", e => { if (e.target.files.length) vdAddFiles(e.target.files); e.target.value = ""; });
    ["dragover", "dragleave", "drop"].forEach(ev => vdDrop.addEventListener(ev, e => {
      e.preventDefault();
      vdDrop.classList.toggle("over", ev === "dragover");
      if (ev === "drop" && e.dataTransfer.files.length) vdAddFiles(e.dataTransfer.files);
    }));
    $("#vd-add").addEventListener("click", () => vdFile.click());
    $("#vd-clear").addEventListener("click", () => {
      vdPause();
      V.clips.forEach(c => URL.revokeObjectURL(c.url));
      V.clips = []; V.t = 0; V.texts = [];
      $("#vd-workspace").classList.add("hidden");
      $("#vd-empty").classList.remove("hidden");
      vdRenderClips(); vdRenderTextLayers();
    });

    /* ---- video: transport ---- */
    $("#vd-play").addEventListener("click", () => V.playing ? vdPause() : vdPlay());
    $("#vid-scrub").addEventListener("input", e => {
      vdPause();
      vdSeek((+e.target.value / 1000) * V.totalDur());
    });
    document.addEventListener("keydown", e => {
      if (!$("#mode-video").classList.contains("active") || e.target.matches("input,textarea,select")) return;
      if (e.key === " ") { e.preventDefault(); V.playing ? vdPause() : vdPlay(); }
      if (e.key === "ArrowRight") { vdPause(); vdSeek(V.t + 1); }
      if (e.key === "ArrowLeft") { vdPause(); vdSeek(V.t - 1); }
    });

    /* ---- video: aspect / fit / color ---- */
    const va = $("#vd-aspects");
    VD_ASPECTS.forEach(([name, ratio, label], i) => {
      const b = document.createElement("button");
      b.className = "chip" + (i === 0 ? " active" : "");
      b.textContent = `${name} ${label}`;
      b.addEventListener("click", () => {
        $$(".chip", va).forEach(x => x.classList.toggle("active", x === b));
        V.aspect = ratio; V.aspectName = name; V.resize();
      });
      va.appendChild(b);
    });
    $("#vd-fit").addEventListener("change", e => { V.fit = e.target.value; vdDrawFrame(); });
    const vpr = $("#vd-presets");
    VD_PRESETS.forEach(([name, adj]) => {
      const b = document.createElement("button");
      b.className = "chip"; b.textContent = name;
      b.addEventListener("click", () => {
        $$(".chip", vpr).forEach(x => x.classList.toggle("active", x === b));
        V.adj = { brightness: 0, contrast: 0, saturation: 0, temperature: 0 };
        Object.assign(V.adj, adj);
        VD_ADJ_DEFS.forEach(([k]) => {
          const inp = $("#vadj-" + k);
          if (inp) { inp.value = V.adj[k]; inp.nextElementSibling.textContent = V.adj[k]; }
        });
        vdDrawFrame();
      });
      vpr.appendChild(b);
    });
    const vsl = $("#vd-sliders");
    VD_ADJ_DEFS.forEach(([k, label, min, max, def]) => {
      const row = document.createElement("div");
      row.className = "slider-row";
      row.innerHTML = `<label>${label}</label><input type="range" id="vadj-${k}" min="${min}" max="${max}" value="${def}"><output>${def}</output>`;
      row.querySelector("input").addEventListener("input", e => {
        V.adj[k] = +e.target.value;
        row.querySelector("output").textContent = e.target.value;
        vdDrawFrame();
      });
      vsl.appendChild(row);
    });

    /* ---- video: text + captions ---- */
    $("#vd-add-text").addEventListener("click", () => {
      V.texts.push({ text: "Your headline", start: 0, end: Math.max(3, Math.round(V.totalDur())), pos: "lower", size: 100, color: "#FFFFFF", upper: false, scrim: true });
      vdRenderTextLayers(); vdDrawFrame();
    });
    $("#vd-captions-btn").addEventListener("click", () => spreadCaptions($("#vd-captions-script").value));
    $("#vd-captions-clear").addEventListener("click", () => { V.texts = []; vdRenderTextLayers(); vdDrawFrame(); });

    /* ---- video: voiceover ---- */
    $("#vd-vo-rec").addEventListener("click", e => voToggle(e.target));
    $("#vd-vo-vol").addEventListener("input", e => { V.vo.vol = +e.target.value; $("#vd-vo-vol-val").textContent = e.target.value + "%"; });
    $("#vd-vo-del").addEventListener("click", () => {
      if (V.vo.url) URL.revokeObjectURL(V.vo.url);
      if (V.vo.srcNode) { try { V.vo.srcNode.disconnect(); } catch (e) {} }
      V.vo = { url: null, name: null, el: null, vol: V.vo.vol, srcNode: null, gain: null };
      $("#vd-vo-name").textContent = "No voiceover yet";
    });

    /* ---- video: image overlays ---- */
    function vdRenderOverlays() {
      const wrap = $("#vd-overlays");
      wrap.innerHTML = "";
      V.overlays.forEach((o, i) => {
        const div = document.createElement("div");
        div.className = "layer-item";
        div.innerHTML = `
          <div class="note" style="color:var(--ink)">🖼 ${o.name}</div>
          <div class="row">
            <div class="field" style="flex:1"><label>Position</label>
              <select data-k="pos">${[["tr", "Top right"], ["tl", "Top left"], ["br", "Bottom right"], ["bl", "Bottom left"], ["c", "Center"]].map(([v, l]) => `<option value="${v}"${o.pos === v ? " selected" : ""}>${l}</option>`).join("")}</select></div>
            <div class="field" style="flex:1"><label>From (s)</label><input type="number" data-k="start" min="0" step="0.5" value="${o.start}"></div>
            <div class="field" style="flex:1"><label>To (s)</label><input type="number" data-k="end" min="0" step="0.5" value="${o.end}"></div>
          </div>
          <div class="slider-row"><label>Size</label><input type="range" data-k="size" min="8" max="60" value="${o.size}"><output>${o.size}%</output></div>
          <div class="slider-row"><label>Opacity</label><input type="range" data-k="op" min="10" max="100" value="${o.op}"><output>${o.op}%</output></div>
          <button class="btn small danger">Remove</button>`;
        div.querySelector('[data-k="pos"]').addEventListener("change", e => { o.pos = e.target.value; vdDrawFrame(); });
        div.querySelector('[data-k="start"]').addEventListener("input", e => { o.start = +e.target.value || 0; vdDrawFrame(); });
        div.querySelector('[data-k="end"]').addEventListener("input", e => { o.end = +e.target.value || 0; vdDrawFrame(); });
        div.querySelector('[data-k="size"]').addEventListener("input", e => { o.size = +e.target.value; e.target.nextElementSibling.textContent = e.target.value + "%"; vdDrawFrame(); });
        div.querySelector('[data-k="op"]').addEventListener("input", e => { o.op = +e.target.value; e.target.nextElementSibling.textContent = e.target.value + "%"; vdDrawFrame(); });
        div.querySelector(".danger").addEventListener("click", () => { V.overlays.splice(i, 1); vdRenderOverlays(); vdDrawFrame(); });
        wrap.appendChild(div);
      });
    }
    const vdOvFile = document.createElement("input");
    vdOvFile.type = "file"; vdOvFile.accept = "image/*";
    vdOvFile.addEventListener("change", e => {
      const f = e.target.files[0];
      if (!f) return;
      const img = new Image();
      img.onload = () => {
        V.overlays.push({ img, name: f.name, pos: "tr", size: 20, op: 100, start: 0, end: Math.max(600, Math.ceil(V.totalDur())) });
        vdRenderOverlays(); vdDrawFrame();
        toast("Overlay added");
      };
      img.src = URL.createObjectURL(f);
      vdOvFile.value = "";
    });
    $("#vd-add-overlay").addEventListener("click", () => vdOvFile.click());

    /* ---- video: music ---- */
    $("#vd-music-add").addEventListener("click", () => $("#vd-music-file").click());
    $("#vd-music-file").addEventListener("change", e => { if (e.target.files[0]) loadMusicFile(e.target.files[0]); e.target.value = ""; });
    $("#vd-music-vol").addEventListener("input", e => { V.music.vol = +e.target.value; $("#vd-music-vol-val").textContent = e.target.value + "%"; });
    $("#vd-music-fade").addEventListener("change", e => { V.music.fade = e.target.checked; });
    $("#vd-mute-clips").addEventListener("change", e => { V.muteClips = e.target.checked; });

    /* ---- video: watermark + export + frames ---- */
    $("#vd-logo-on").addEventListener("change", e => { V.logo = e.target.checked; vdDrawFrame(); });
    $("#vd-export").addEventListener("click", vdExport);
    $("#vd-frame").addEventListener("click", () => {
      const c = vdCaptureFrameCanvas();
      if (c) c.toBlob(b => { download(b, "gem-frame.png"); toast("Frame saved ✓"); }, "image/png");
    });
    $("#vd-frame-edit").addEventListener("click", () => {
      const c = vdCaptureFrameCanvas();
      if (!c) return;
      phLoadDataUrl(c.toDataURL("image/png"), "frame");
      switchMode("photo");
      toast("Frame opened in the photo editor");
    });

    /* ---- music panel ---- */
    $("#sp-go").addEventListener("click", () => {
      const q = $("#sp-q").value.trim();
      window.open("https://open.spotify.com/search/" + encodeURIComponent(q || "trending reels audio"), "_blank", "noopener");
    });
    $("#sp-q").addEventListener("keydown", e => { if (e.key === "Enter") $("#sp-go").click(); });
    $("#sp-add").addEventListener("click", () => {
      const v = $("#sp-save").value.trim();
      if (!v) return;
      let list = [];
      try { list = JSON.parse(localStorage.getItem("gem-music-ideas") || "[]"); } catch (e) {}
      list.unshift(v);
      localStorage.setItem("gem-music-ideas", JSON.stringify(list.slice(0, 30)));
      $("#sp-save").value = "";
      renderSpList();
      toast("Saved to your shortlist");
    });
    renderSpList();
    const muInput = document.createElement("input");
    muInput.type = "file"; muInput.accept = "audio/*";
    muInput.addEventListener("change", e => { if (e.target.files[0]) loadMusicFile(e.target.files[0]); muInput.value = ""; });
    $("#mu-load").addEventListener("click", () => muInput.click());

    vdRenderClips();
  }

  document.addEventListener("DOMContentLoaded", init);
  if (document.readyState !== "loading") init();
})();
