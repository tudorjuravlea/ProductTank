#!/usr/bin/env node
// render-batch.mjs: render ProductTank canvases (social templates, slides, fixtures) to PNG with the
// engine's pinned Chromium, and a deck to PNG-per-slide + PDF. Deterministic like ENGINE/scripts/render.mjs
// (fonts asserted, animations disabled, caret hidden), but batch-oriented and format-aware.
// Exit codes per CONTRACT.md: 0 ok · 2 setup/usage · 4 font parity · 5 render failure.
//
//   node tools/render-batch.mjs --lock <lock> --src <dir|file.html> [--out <dir>] [--scale 1|2]
//   node tools/render-batch.mjs --lock <lock> --deck <slides-dir> [--out <dir>]     (PNG per slide + deck.pdf)
//   node tools/render-batch.mjs --lock <lock> --shapes [--out <dir>]                (contact sheet of assets/shapes)
//
// Every canvas must be a `.canvas[data-format]` sized by base.css; the screenshot clips to it. The
// page must set data-render-ready (after document.fonts.ready) or the render fails after 8 s.
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const ENGINE = process.env.FIDELITY_ENGINE || path.join(os.homedir(), '.claude', 'fidelity-engine');
const args = process.argv.slice(2);
const flag = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
if (args.includes('--help') || !args.length) {
  process.stdout.write(readFileSync(new URL(import.meta.url)).toString().split('\n').filter((l) => l.startsWith('//')).slice(0, 14).map((l) => l.replace(/^\/\/ ?/, '')).join('\n') + '\n');
  process.exit(0);
}
const lockPath = flag('--lock');
if (!lockPath || !existsSync(lockPath)) { process.stderr.write('render-batch: --lock <design-lock.json> is required\n'); process.exit(2); }
const lock = JSON.parse(readFileSync(lockPath, 'utf8'));
const lockDir = path.dirname(path.resolve(lockPath));
const scale = Number(flag('--scale') || 1);
const src = flag('--src'); const deck = flag('--deck'); const shapes = args.includes('--shapes');
const out = path.resolve(flag('--out') || path.join(lockDir, '.render'));
mkdirSync(out, { recursive: true });
let chromium;
try { chromium = createRequire(path.join(ENGINE, 'package.json'))('playwright').chromium; }
catch (e) { process.stderr.write(`render-batch: playwright not resolvable from ${ENGINE}: ${e.message}\n`); process.exit(2); }

function walk(p, acc = []) {
  const st = statSync(p);
  if (st.isFile()) { if (p.endsWith('.html') && !p.endsWith('.preview.html') && !path.basename(p).startsWith('deck') && !path.basename(p).startsWith('_')) acc.push(p); return acc; }
  for (const e of readdirSync(p).sort()) { if (e.startsWith('.') || e === 'node_modules') continue; walk(path.join(p, e), acc); }
  return acc;
}
const fontChecks = (lock.fonts || []).flatMap((f) => f.fontChecks || []);

async function renderCanvas(browser, file, outFile) {
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: scale, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.addInitScript(() => { const fixed = new Date('2026-09-07T12:00:00Z').valueOf(); Date.now = () => fixed; Math.random = () => 0.42; });
  await page.goto('file://' + file, { waitUntil: 'load', timeout: 30000 });
  await page.waitForSelector('[data-render-ready]', { timeout: 8000 }).catch(() => { throw new Error('data-render-ready never set (fonts.ready + attribute)'); });
  const parity = await page.evaluate((checks) => checks.map((c) => [c, document.fonts.check(c)]), fontChecks);
  const missing = parity.filter(([, ok]) => !ok).map(([c]) => c);
  if (missing.length) { await ctx.close(); const err = new Error(`FONT_PARITY: ${missing.join('; ')}`); err.code = 4; throw err; }
  await page.evaluate(() => document.getAnimations().forEach((a) => a.finish()));
  await page.addStyleTag({ content: '*{caret-color:transparent!important;transition:none!important;animation:none!important}' });
  const box = await page.evaluate(() => { const c = document.querySelector('.canvas'); if (!c) return null; const r = c.getBoundingClientRect(); return { x: r.x + window.scrollX, y: r.y + window.scrollY, width: r.width, height: r.height, format: c.getAttribute('data-format') }; });
  if (!box) { await ctx.close(); throw new Error('no .canvas element'); }
  await page.setViewportSize({ width: Math.ceil(box.x + box.width), height: Math.ceil(box.y + box.height) });
  await page.waitForTimeout(150);
  await page.screenshot({ path: outFile, clip: { x: box.x, y: box.y, width: box.width, height: box.height }, scale: scale === 1 ? 'css' : 'device' });
  await ctx.close();
  return box;
}

const browser = await chromium.launch({ headless: true });
let code = 0;
try {
  if (shapes) {
    const dir = path.join(lockDir, 'assets', 'shapes');
    const files = readdirSync(dir).filter((f) => f.endsWith('.svg')).sort();
    const html = `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="file://${lockDir}/assets/tokens.css"><style>body{margin:0;background:var(--background);font:600 18px Montserrat,sans-serif;color:var(--text1)}.g{display:grid;grid-template-columns:repeat(4,240px);gap:24px;padding:24px}.c{display:flex;flex-direction:column;align-items:center;gap:8px}.c div{width:225px;height:225px;color:var(--zingy-cyan);display:flex;align-items:center;justify-content:center}.c div svg{width:100%;height:100%}.m div{color:var(--action)}.v div{color:var(--blurple)}</style></head><body><main class="canvas g" data-format="sheet" style="width:1104px">${files.map((f) => `<figure class="c ${f.startsWith('markup') ? 'm' : f.startsWith('venniverse') ? 'v' : ''}"><div>${readFileSync(path.join(dir, f), 'utf8')}</div><figcaption>${f}</figcaption></figure>`).join('')}</main><script>document.fonts.ready.then(()=>document.querySelector('.canvas').setAttribute('data-render-ready',''))</script></body></html>`;
    const tmp = path.join(out, '_shapes-sheet.html'); writeFileSync(tmp, html);
    const box = await renderCanvas(browser, tmp, path.join(out, 'shapes-sheet.png'));
    process.stdout.write(`shapes-sheet.png ${Math.round(box.width)}x${Math.round(box.height)} (${files.length} shapes)\n`);
  }
  if (src) {
    const files = walk(path.resolve(src));
    if (!files.length) { process.stderr.write(`render-batch: no .html under ${src}\n`); process.exit(2); }
    for (const f of files) {
      const outFile = path.join(out, path.basename(f, '.html') + '.png');
      const box = await renderCanvas(browser, f, outFile);
      process.stdout.write(`${path.basename(outFile)} ${Math.round(box.width * scale)}x${Math.round(box.height * scale)} [${box.format}]\n`);
    }
  }
  if (deck) {
    const dir = path.resolve(deck);
    const slides = readdirSync(dir).filter((f) => f.endsWith('.html') && f !== 'deck.html' && !f.endsWith('.preview.html')).sort();
    const pngs = [];
    for (const s of slides) { const outFile = path.join(out, path.basename(s, '.html') + '.png'); const box = await renderCanvas(browser, path.join(dir, s), outFile); pngs.push(outFile); process.stdout.write(`${path.basename(outFile)} ${Math.round(box.width * scale)}x${Math.round(box.height * scale)}\n`); }
    // PDF: one page per slide, 1920x1080 CSS px, from the PNGs so the PDF equals the verified renders
    const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
    const page = await ctx.newPage();
    const html = `<!doctype html><html><head><style>@page{size:1920px 1080px;margin:0}html,body{margin:0}img{display:block;width:1920px;height:1080px;page-break-after:always}</style></head><body>${pngs.map((p) => `<img src="file://${p}">`).join('')}</body></html>`;
    const shell = path.join(out, '_deck-print.html'); writeFileSync(shell, html);
    await page.goto('file://' + shell, { waitUntil: 'load' }); await page.waitForTimeout(300);
    await page.pdf({ path: path.join(out, 'deck.pdf'), width: '1920px', height: '1080px', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
    await ctx.close();
    process.stdout.write(`deck.pdf (${pngs.length} pages)\n`);
  }
} catch (e) {
  code = e.code === 4 ? 4 : 5;
  process.stderr.write(`render-batch: ${e.message}\n`);
}
await browser.close();
process.exit(code);
