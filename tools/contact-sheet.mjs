#!/usr/bin/env node
// contact-sheet.mjs: one PNG grid of every render in a directory, for the "look at every pixel" step.
//   node tools/contact-sheet.mjs --dir <png-dir> [--out <file.png>] [--cols 3] [--width 1800]
import { createRequire } from 'node:module';
import { readdirSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
const ENGINE = process.env.FIDELITY_ENGINE || path.join(os.homedir(), '.claude', 'fidelity-engine');
const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
if (args.includes('--help') || !flag('--dir')) { process.stdout.write('node tools/contact-sheet.mjs --dir <png-dir> [--out <file.png>] [--cols 3] [--width 1800]\n'); process.exit(args.includes('--help') ? 0 : 2); }
const dir = path.resolve(flag('--dir')); if (!existsSync(dir)) { process.stderr.write(`no such dir: ${dir}\n`); process.exit(2); }
const cols = Number(flag('--cols', 3)); const width = Number(flag('--width', 1800));
const out = path.resolve(flag('--out', path.join(dir, '_contact-sheet.png')));
const files = readdirSync(dir).filter((f) => f.endsWith('.png') && !f.startsWith('_')).sort();
if (!files.length) { process.stderr.write('no PNGs\n'); process.exit(2); }
const { chromium } = createRequire(path.join(ENGINE, 'package.json'))('playwright');
const cell = Math.floor(width / cols) - 16;
const html = `<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0;background:#e9e9ee;font:13px/1.2 -apple-system,sans-serif;color:#222}.g{display:grid;grid-template-columns:repeat(${cols},${cell}px);gap:16px;padding:8px}figure{margin:0;display:flex;flex-direction:column;gap:4px}figure div{width:${cell}px;height:${cell}px;display:flex;align-items:center;justify-content:center;background:#fff;border:1px solid #bbb}img{max-width:100%;max-height:100%}</style></head><body><div class="g">${files.map((f) => `<figure><div><img src="file://${path.join(dir, f)}"></div><figcaption>${f}</figcaption></figure>`).join('')}</div></body></html>`;
const tmp = path.join(os.tmpdir(), `pt-contact-sheet-${process.pid}.html`); writeFileSync(tmp, html); // scratch lives in the temp dir, never beside the renders
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width, height: 1000 } });
await page.goto('file://' + tmp, { waitUntil: 'load' }); await page.waitForTimeout(400);
await page.screenshot({ path: out, fullPage: true });
await browser.close();
process.stdout.write(`${out} (${files.length} renders, ${cols} columns)\n`);
