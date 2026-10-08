#!/usr/bin/env node
// export-pptx-editable.mjs: one rendered ProductTank canvas → one editable PowerPoint slide (widescreen,
// 13.333 x 7.5 in). Every element becomes a native object: circles and rounded boxes as shapes in the
// brand hex colours, every text node its own Montserrat text box at the scaled size, the markup box a
// rotated rectangle under its text, photos as pictures (circular crop for portraits), the lockup, facts
// icons and a QR rasterised from their SVG. The Gradient ground is the one image (OOXML built this way
// cannot carry a native gradient); Black and Bold Cyan grounds are solid fills.
//
//   node tools/export-pptx-editable.mjs --src <canvas.html|dir> --out <dir> [--title "<deck title>"]
//
// Positions are measured on the rendered DOM with the engine's Chromium (client rects, computed fonts),
// never redrawn by hand, so a 16:9 canvas maps onto the page exactly; a non-16:9 canvas is fitted by
// width. Montserrat must be installed where the file is opened (captures/producttank/fonts/). Deps resolve
// from the engine: playwright, pptxgenjs, sharp (npm install --save pptxgenjs sharp in ENGINE once).
// Exit codes: 0 ok · 2 setup/usage · 5 render failure.
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const ENGINE = process.env.FIDELITY_ENGINE || path.join(os.homedir(), '.claude', 'fidelity-engine');
const args = process.argv.slice(2);
const flag = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
if (args.includes('--help') || !flag('--src')) { process.stdout.write(readFileSync(new URL(import.meta.url)).toString().split('\n').filter((l) => l.startsWith('//')).slice(0, 15).map((l) => l.replace(/^\/\/ ?/, '')).join('\n') + '\n'); process.exit(flag('--src') ? 0 : 2); }
let chromium, pptxgen, sharp;
try { const r = createRequire(path.join(ENGINE, 'package.json')); chromium = r('playwright').chromium; pptxgen = r('pptxgenjs'); sharp = r('sharp'); }
catch (e) { process.stderr.write(`export-pptx-editable: deps not resolvable from ${ENGINE} (${e.message}); run: cd ${ENGINE} && npm install --save pptxgenjs sharp\n`); process.exit(2); }
const out = path.resolve(flag('--out') || '.'); mkdirSync(out, { recursive: true });
const src = path.resolve(flag('--src'));
const files = statSync(src).isDirectory() ? readdirSync(src).filter((f) => f.endsWith('.html') && !f.endsWith('.preview.html') && !f.startsWith('_')).sort().map((f) => path.join(src, f)) : [src];
if (!files.length) { process.stderr.write('export-pptx-editable: no .html under --src\n'); process.exit(2); }

// 1. measure: every drawable primitive in canvas px, in DOM (z) order
async function measure(browser, file) {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('file://' + file, { waitUntil: 'load' });
  await page.waitForSelector('[data-render-ready]', { timeout: 8000 });
  const d = await page.evaluate(() => {
    const c = document.querySelector('.canvas'); const cr = c.getBoundingClientRect(); const out = { w: cr.width, h: cr.height, ground: c.className, items: [] };
    const hex = (s) => { const m = s.match(/\d+(\.\d+)?/g); if (!m || (m.length >= 4 && +m[3] === 0)) return null; return m.slice(0, 3).map((v) => (+v).toString(16).padStart(2, '0')).join('').toUpperCase(); };
    const box = (r) => ({ x: r.x - cr.x, y: r.y - cr.y, w: r.width, h: r.height });
    document.querySelectorAll('svg.layer-shapes circle').forEach((el) => { const cs = getComputedStyle(el); const sw = +(el.getAttribute('stroke-width') || 0); out.items.push({ t: 'circle', cx: +el.getAttribute('cx'), cy: +el.getAttribute('cy'), r: +el.getAttribute('r'), fill: sw ? null : hex(cs.fill), stroke: sw ? hex(cs.stroke) : null, sw }); });
    const walk = (el) => { for (const n of el.childNodes) {
      if (n.nodeType === 3) { if (!n.textContent.trim()) continue; const cs = getComputedStyle(n.parentElement); const rg = document.createRange(); rg.selectNodeContents(n); const rects = [...rg.getClientRects()]; if (!rects.length) continue;
        const u = { x: Math.min(...rects.map((r) => r.x)), y: Math.min(...rects.map((r) => r.y)), r: Math.max(...rects.map((r) => r.right)), b: Math.max(...rects.map((r) => r.bottom)) };
        let text = n.textContent.replace(/\s+/g, ' ').trim(); if (cs.textTransform === 'uppercase') text = text.toUpperCase();
        out.items.push({ t: 'text', text, ...box({ x: u.x, y: u.y, width: u.r - u.x, height: u.b - u.y }), fs: parseFloat(cs.fontSize), fw: +cs.fontWeight, color: hex(cs.color), align: cs.textAlign, ls: cs.letterSpacing, lh: parseFloat(cs.lineHeight), lines: rects.length }); continue; }
      if (n.nodeType !== 1 || n.matches('svg.layer-shapes, script, style')) continue;
      const cs = getComputedStyle(n); const bb = box(n.getBoundingClientRect());
      if (n.tagName === 'IMG') { out.items.push({ t: 'img', src: n.getAttribute('src'), ...bb, round: cs.borderRadius.includes('%') || n.parentElement.classList.contains('portrait') }); continue; }
      if (n.tagName === 'svg') { out.items.push(n.classList.contains('qr') ? { t: 'qr', svg: n.outerHTML, ...bb } : { t: 'icon', svg: n.outerHTML, stroke: hex(cs.stroke), ...bb }); continue; }
      const bg = hex(cs.backgroundColor);
      if (bg && !n.classList.contains('canvas') && !n.querySelector('img')) { // a wrapper behind a photo is not drawn
        if (cs.borderRadius.includes('%') && parseFloat(cs.borderRadius) >= 50) out.items.push({ t: 'circle', cx: bb.x + bb.w / 2, cy: bb.y + bb.h / 2, r: bb.w / 2, fill: bg, stroke: null, sw: 0 });
        else out.items.push({ t: 'rect', ...bb, fill: bg, radius: parseFloat(cs.borderRadius) || 0, name: n.className });
      }
      if (n.classList.contains('markup')) { const ps = getComputedStyle(n, '::before'); const [top, left, right, bottom] = [ps.top, ps.left, ps.right, ps.bottom].map(parseFloat); out.items.push({ t: 'rect', x: bb.x + left, y: bb.y + top, w: bb.w - left - right, h: bb.h - top - bottom, fill: hex(ps.backgroundColor), radius: 6, rotate: -1, name: 'markup' }); }
      walk(n); } };
    walk(c); return out;
  });
  await page.close(); return d;
}

// 2. build: one slide per canvas
async function build(d, html, outFile, title) {
  const SW = 13.333; const k = SW / d.w; const X = (v) => +(v * k).toFixed(4); const PT = (px) => +(px * k * 72).toFixed(1);
  const b64 = (buf) => 'image/png;base64,' + buf.toString('base64');
  const pres = new pptxgen(); pres.layout = 'LAYOUT_WIDE'; pres.author = 'ProductTank Belgium'; pres.title = title;
  pres.theme = { headFontFace: 'Montserrat', bodyFontFace: 'Montserrat' };
  const s = pres.addSlide();
  if (d.ground.includes('ground-gradient')) {
    const w = d.w, h = d.h, L = (w + h) * Math.SQRT1_2, stops = [[0, [0x3E, 0x67, 0xE7]], [0.5, [0x35, 0x30, 0xAE]], [1, [0x17, 0x04, 0x4A]]]; // tokens: --ground-gradient-start, -mid, --midnight at 135deg
    const buf = Buffer.alloc(w * h * 3);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { let t = ((x - w / 2) + (y - h / 2)) * Math.SQRT1_2 / L + 0.5; t = Math.min(1, Math.max(0, t)); const i = t < 0.5 ? 0 : 1; const f = (t - stops[i][0]) / (stops[i + 1][0] - stops[i][0]); for (let c = 0; c < 3; c++) buf[(y * w + x) * 3 + c] = Math.round(stops[i][1][c] + (stops[i + 1][1][c] - stops[i][1][c]) * f); }
    s.background = { data: b64(await sharp(buf, { raw: { width: w, height: h, channels: 3 } }).png().toBuffer()) };
  } else s.background = { color: d.ground.includes('ground-black') ? '060119' : '126CFF' };
  let n = 0;
  for (const it of d.items) {
    n++;
    if (it.t === 'circle') { const o = { x: X(it.cx - it.r), y: X(it.cy - it.r), w: X(2 * it.r), h: X(2 * it.r), objectName: 'Shape ' + n }; if (it.sw) { o.fill = { type: 'none' }; o.line = { color: it.stroke, width: PT(it.sw) }; } else { o.fill = { color: it.fill }; o.line = { type: 'none' }; } s.addShape(pres.ShapeType.ellipse, o); }
    else if (it.t === 'rect') { const o = { x: X(it.x), y: X(it.y), w: X(it.w), h: X(it.h), fill: { color: it.fill }, line: { type: 'none' }, objectName: it.name || 'Rect ' + n }; if (it.rotate) o.rotate = it.rotate; if (it.radius) { o.rectRadius = X(it.radius); s.addShape(pres.ShapeType.roundRect, o); } else s.addShape(pres.ShapeType.rect, o); }
    else if (it.t === 'text') { const pad = it.fs * 0.3; s.addText(it.text, { x: X(it.x), y: X(it.y - pad / 2), w: X(it.w + (it.lines > 1 ? 0 : pad * 2)), h: X(it.h + pad), fontFace: 'Montserrat', fontSize: PT(it.fs), bold: it.fw >= 600, color: it.color, margin: 0, valign: 'middle', align: it.align === 'center' ? 'center' : 'left', charSpacing: it.ls !== 'normal' ? +(parseFloat(it.ls) * k * 72).toFixed(2) : undefined, lineSpacingMultiple: +(it.lh / it.fs).toFixed(2), isTextBox: true, wrap: it.lines > 1, objectName: it.text.slice(0, 30) }); }
    else if (it.t === 'img') { const p = path.resolve(path.dirname(html), it.src); const o = { x: X(it.x), y: X(it.y), w: X(it.w), h: X(it.h), objectName: path.basename(p) }; if (p.endsWith('.svg')) o.data = b64(await sharp(readFileSync(p), { density: 600 }).png().toBuffer()); else o.path = p; if (it.round) o.rounding = true; s.addImage(o); }
    else if (it.t === 'qr') { const svg = it.svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" width="2048" height="2048" fill="#17044A" ').replace(/class="fill-midnight"/, 'fill="#17044A"'); s.addImage({ data: b64(await sharp(Buffer.from(svg)).png().toBuffer()), x: X(it.x), y: X(it.y), w: X(it.w), h: X(it.h), objectName: 'QR code' }); }
    else if (it.t === 'icon') { const svg = it.svg.replace('<svg ', `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="none" stroke="#${it.stroke}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" `); s.addImage({ data: b64(await sharp(Buffer.from(svg)).png().toBuffer()), x: X(it.x), y: X(it.y), w: X(it.w), h: X(it.h), objectName: 'Icon ' + n }); }
  }
  await pres.writeFile({ fileName: outFile });
  return d.items.length;
}

const browser = await chromium.launch({ headless: true });
let code = 0;
try {
  for (const f of files) {
    const d = await measure(browser, f);
    const outFile = path.join(out, path.basename(f, '.html') + '.pptx');
    const count = await build(d, f, outFile, flag('--title') || path.basename(f, '.html'));
    process.stdout.write(`${path.basename(outFile)} ${Math.round(d.w)}x${Math.round(d.h)} → 13.333x7.5in, ${count} objects\n`);
  }
} catch (e) { code = 5; process.stderr.write(`export-pptx-editable: ${e.message}\n`); }
await browser.close();
process.exit(code);
