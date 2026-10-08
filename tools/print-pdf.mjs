// print-pdf.mjs: export print canvases to PDF at a physical page size.
//   node tools/print-pdf.mjs --src <file|dir> --out <dir> --width 111mm --height 154mm
// Each .html under --src is rendered (waits for data-render-ready) and written as <name>.pdf, one page,
// the .canvas scaled to fill the page exactly (no margins, backgrounds printed). The page is the
// bleed size; the printer trims it. Playwright is resolved from the engine, like render-batch.
import { readdirSync, statSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createRequire } from 'node:module';
const ENGINE = process.env.FIDELITY_ENGINE || path.join(os.homedir(), '.claude', 'fidelity-engine');
const args = process.argv.slice(2);
const flag = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
if (args.includes('--help') || !flag('--src')) { process.stdout.write('node tools/print-pdf.mjs --src <file|dir> --out <dir> --width 111mm --height 154mm\n'); process.exit(flag('--src') ? 0 : 2); }
const width = flag('--width') || '111mm', height = flag('--height') || '154mm';
const out = path.resolve(flag('--out') || '.'); mkdirSync(out, { recursive: true });
const chromium = createRequire(path.join(ENGINE, 'package.json'))('playwright').chromium;
const mm = (v) => v.endsWith('mm') ? parseFloat(v) : v.endsWith('in') ? parseFloat(v) * 25.4 : parseFloat(v) * 25.4 / 96;
const walk = (p, acc = []) => { if (statSync(p).isFile()) { if (p.endsWith('.html')) acc.push(p); return acc; } for (const e of readdirSync(p).sort()) if (!e.startsWith('.')) walk(path.join(p, e), acc); return acc; };
const browser = await chromium.launch({ headless: true });
let code = 0;
for (const f of walk(path.resolve(flag('--src')))) {
  const page = await browser.newPage();
  try {
    await page.goto('file://' + f, { waitUntil: 'load' });
    await page.waitForSelector('[data-render-ready]', { timeout: 8000 });
    const box = await page.evaluate(() => { const r = document.querySelector('.canvas').getBoundingClientRect(); return { w: r.width, h: r.height }; });
    const scale = (mm(width) / 25.4 * 96) / box.w; // CSS px per page width
    // The markup box is a CSS mask in base.css; Chromium writes masks into the PDF as soft masks, which some
    // viewers (a reader on the organiser's laptop, 2026-09-21) draw as a broken image. Print gets a flat
    // box in the same colour with a one-degree tilt instead: same gesture, plain fill, opens everywhere.
    await page.addStyleTag({ content: `@page{size:${width} ${height};margin:0} html,body{margin:0;padding:0;background:none} .canvas{margin:0;position:absolute;left:0;top:0} .markup::before{-webkit-mask-image:none!important;mask-image:none!important;transform:rotate(-1deg);border-radius:6px}` });
    const pdf = path.join(out, path.basename(f, '.html') + '.pdf');
    await page.pdf({ path: pdf, width, height, printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 }, scale, preferCSSPageSize: false });
    process.stdout.write(`${path.basename(pdf)} ${width} x ${height} (canvas ${box.w}x${box.h}, scale ${scale.toFixed(4)})\n`);
  } catch (e) { code = 1; process.stderr.write(`print-pdf: ${path.basename(f)}: ${e.message}\n`); }
  await page.close();
}
await browser.close(); process.exit(code);
