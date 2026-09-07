#!/usr/bin/env node
// pt-lint.mjs: the ProductTank brand linter (skill-local rules the shared engine cannot express).
// Runs beside ENGINE/scripts/adherence-lint.mjs, never instead of it. Exit codes per CONTRACT.md:
// 0 no errors · 1 at least one ERROR · 2 setup/usage error.
//
//   node tools/pt-lint.mjs --lock <design-lock.json> --src <dir|file> [--json]
//   node tools/pt-lint.mjs --self-test          (runs gauntlet/__lint-fixtures, proves every rule red)
//
// Rules (each one has a fixture that fails only it):
//   canvas-declared         root .canvas has data-format + data-archetype; source sets data-render-ready
//   (deck.html, the presentation shell, is skipped: it holds no canvas)
//   lockup-present          exactly one [data-slot="lockup"] with an <img> from assets/logo
//   lockup-colour           the lockup file is a -white or -midnight variant
//   lockup-corner           lockup left edge on the margin; vertically in the top or bottom third
//   lockup-min-width        rendered lockup width >= 80 px
//   markup-once             at most one markup gesture (.markup, .underline-markup, [data-markup])
//   yellow-not-ground       the canvas background is Bold Cyan, Midnight or Black (never Markup Yellow, Purple, White on social)
//   venn-recipe             data-venn = one full + one target + one of donut|polo|eye|ring, or all full
//   target-once             at most one target in data-venn
//   headline-sentence-case  [data-slot="headline"] is not all caps
//   no-pm-abbrev            no "PM"/"PMs" as a word in visible text
//   brand-names             no "Product Tank", "Mind The Product", "MindTheProduct", "Productank", "ProductTank Belgium" (DEC-012)
//   date-month-spelled      no numeric d/m dates in [data-slot="facts"] or visible text
//   announce-disclosure     archetype event-announce carries "Free to attend" + "Meetup"; reminder carries "Meetup"
//   no-external-url         no http(s):// or www. in visible text
//   strapline-verbatim      the lockup alt (or visible text) contains exactly "a Mind the Product meetup"
import { createRequire } from 'node:module';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const ENGINE = process.env.FIDELITY_ENGINE || path.join(os.homedir(), '.claude', 'fidelity-engine');
const HERE = path.dirname(new URL(import.meta.url).pathname);
const RULES = ['canvas-declared','lockup-present','lockup-colour','lockup-corner','lockup-min-width','markup-once','yellow-not-ground','venn-recipe','target-once','headline-sentence-case','no-pm-abbrev','brand-names','date-month-spelled','announce-disclosure','no-external-url','strapline-verbatim'];

function usage(code = 0) {
  const text = readFileSync(new URL(import.meta.url)).toString().split('\n').filter((l) => l.startsWith('//')).slice(0, 26).map((l) => l.replace(/^\/\/ ?/, '')).join('\n');
  (code ? process.stderr : process.stdout).write(text + '\n');
  process.exit(code);
}
const args = process.argv.slice(2);
const flag = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
if (args.includes('--help') || args.length === 0) usage(0);
const selfTest = args.includes('--self-test');
const asJson = args.includes('--json');
const lockPath = flag('--lock') || (selfTest ? path.join(HERE, '..', 'captures', 'producttank', 'design-lock.json') : undefined);
const src = flag('--src') || (selfTest ? path.join(HERE, '..', 'gauntlet', '__lint-fixtures') : undefined);
if (!lockPath || !src) { process.stderr.write('pt-lint: --lock and --src are required (or --self-test)\n'); process.exit(2); }
if (!existsSync(lockPath)) { process.stderr.write(`pt-lint: lock not found: ${lockPath}\n`); process.exit(2); }
if (!existsSync(src)) { process.stderr.write(`pt-lint: --src not found: ${src}\n`); process.exit(2); }
const lock = JSON.parse(readFileSync(lockPath, 'utf8'));

let chromium;
try { chromium = createRequire(path.join(ENGINE, 'package.json'))('playwright').chromium; }
catch (e) { process.stderr.write(`pt-lint: cannot resolve playwright from ${ENGINE}: ${e.message} (run ENGINE/scripts/setup-check.mjs)\n`); process.exit(2); }

function walk(p, acc = []) {
  const st = statSync(p);
  if (st.isFile()) { if (p.endsWith('.html') && !p.endsWith('.preview.html') && path.basename(p) !== 'deck.html' && !path.basename(p).startsWith('_')) acc.push(p); return acc; }
  for (const e of readdirSync(p)) { if (e === 'node_modules' || e.startsWith('.')) continue; walk(path.join(p, e), acc); }
  return acc;
}
const files = walk(path.resolve(src)).sort();
if (!files.length) { process.stderr.write(`pt-lint: no .html under ${src}\n`); process.exit(2); }

const hex = (c) => { const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(c || ''); return m ? '#' + [m[1], m[2], m[3]].map((x) => Number(x).toString(16).padStart(2, '0')).join('').toUpperCase() : null; };
const tok = lock.tokens.colors.light;
const GROUNDS = new Set([tok['bold-cyan'], tok.midnight, tok.black].filter(Boolean).map((s) => s.toUpperCase()));

async function lintFile(page, file) {
  const findings = [];
  const add = (rule, detail) => findings.push({ level: 'ERROR', rule, file, detail });
  const source = readFileSync(file, 'utf8');
  await page.goto('file://' + file, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const d = await page.evaluate(() => {
    const canvas = document.querySelector('.canvas');
    const rect = (el) => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; };
    const lockups = [...document.querySelectorAll('[data-slot="lockup"]')];
    const imgs = lockups.map((l) => l.querySelector('img'));
    const hl = document.querySelector('[data-slot="headline"]');
    const facts = [...document.querySelectorAll('[data-slot="facts"]')].map((f) => f.innerText).join(' ');
    return {
      hasCanvas: !!canvas,
      format: canvas?.getAttribute('data-format') || null,
      archetype: canvas?.getAttribute('data-archetype') || null,
      canvasRect: canvas ? rect(canvas) : null,
      canvasBg: canvas ? getComputedStyle(canvas).backgroundColor : null,
      canvasMargin: canvas ? getComputedStyle(canvas).getPropertyValue('--margin') : null,
      lockups: lockups.map((l, i) => ({ rect: rect(l), src: imgs[i]?.getAttribute('src') || null, alt: imgs[i]?.getAttribute('alt') || '', text: l.innerText })),
      markups: document.querySelectorAll('.markup, .underline-markup, [data-markup]').length,
      venns: [...document.querySelectorAll('[data-venn]')].map((v) => v.getAttribute('data-venn')),
      headline: hl ? hl.innerText : null,
      text: document.body.innerText,
      factsText: facts,
    };
  });
  if (!d.hasCanvas || !d.format || !d.archetype || !/data-render-ready/.test(source)) add('canvas-declared', `root .canvas needs data-format (${d.format}) and data-archetype (${d.archetype}) and the source must set data-render-ready`);
  const arche = d.archetype || '';
  const social = !/^(slide|deck)/.test(arche);
  // lockup
  if (d.lockups.length !== 1) add('lockup-present', `expected exactly one [data-slot="lockup"], found ${d.lockups.length}`);
  else {
    const L = d.lockups[0];
    if (!L.src || !/assets\/logo\/producttank-[a-z-]+\.svg$/.test(L.src)) add('lockup-present', `lockup must be an <img> from assets/logo (got ${L.src})`);
    else if (!/-(white|midnight)\.svg$/.test(L.src)) add('lockup-colour', `lockup file must be a -white or -midnight variant (got ${path.basename(L.src)})`);
    if (L.rect.w < 80) add('lockup-min-width', `lockup renders ${Math.round(L.rect.w)} px wide, minimum 80`);
    if (d.canvasRect) {
      const c = d.canvasRect; const m = parseFloat(d.canvasMargin) || 0;
      const leftOk = Math.abs(L.rect.x - c.x - m) <= 2 || (m === 0 && L.rect.x - c.x <= 120);
      const topThird = L.rect.y - c.y <= c.h / 3; const bottomThird = (L.rect.y + L.rect.h) - c.y >= (2 * c.h) / 3;
      if (!leftOk || !(topThird || bottomThird)) add('lockup-corner', `lockup at (${Math.round(L.rect.x - c.x)}, ${Math.round(L.rect.y - c.y)}) is not left-aligned on the margin (${m}px) in the top or bottom third`);
    }
    const alt = (L.alt || '') + ' ' + (L.text || '');
    if (!alt.includes('a Mind the Product meetup')) add('strapline-verbatim', `lockup alt/text must contain exactly "a Mind the Product meetup" (got "${(L.alt || L.text || '').slice(0, 60)}")`);
  }
  // ground
  const bg = hex(d.canvasBg);
  if (social && (!bg || !GROUNDS.has(bg))) add('yellow-not-ground', `social canvas background is ${bg}; only Bold Cyan ${tok['bold-cyan']}, Midnight ${tok.midnight} or Black ${tok.black}`);
  if (!social && bg === tok.action.toUpperCase()) add('yellow-not-ground', 'Markup Yellow is never a ground');
  // markup
  if (d.markups > 1) add('markup-once', `${d.markups} markup gestures; one per canvas`);
  // venn
  for (const v of d.venns) {
    const parts = v.split(',').map((s) => s.trim()).filter(Boolean);
    const count = (k) => parts.filter((p) => p === k).length;
    if (count('target') > 1) add('target-once', `data-venn="${v}" has ${count('target')} targets`);
    const allFull = parts.length >= 2 && parts.every((p) => p === 'full');
    const extra = parts.filter((p) => ['donut', 'polo', 'eye', 'ring'].includes(p)).length;
    const ok = allFull || (count('full') === 1 && count('target') === 1 && extra === 1 && parts.length === 3);
    if (!ok && count('target') <= 1) add('venn-recipe', `data-venn="${v}" is not one full + one target + one of donut|polo|eye|ring (or all full)`);
  }
  // copy
  if (d.headline) { const letters = d.headline.replace(/[^A-Za-z]/g, ''); if (letters.length > 3 && letters === letters.toUpperCase()) add('headline-sentence-case', `headline is all caps: "${d.headline.slice(0, 50)}"`); }
  const text = d.text || '';
  if (/\bPMs?\b/.test(text)) add('no-pm-abbrev', 'visible text says "PM"/"PMs"; say product manager / product people');
  const bad = [/Product Tank/, /Mind The Product/, /MindTheProduct/, /Productank/i, /Product-Tank/i, /ProductTank Belgium/i].find((r) => r.test(text));
  if (bad) add('brand-names', `visible text spells a brand name wrong (${bad})`);
  if (/\b\d{1,2}[./]\d{1,2}(?:[./]\d{2,4})?\b/.test(d.factsText + ' ' + text)) add('date-month-spelled', 'a numeric date (d/m) appears; spell out the month');
  if (/^event-announce/.test(arche) && !(/Free to attend/.test(text) && /Meetup/.test(text))) add('announce-disclosure', 'event-announce canvases must say "Free to attend" and mention Meetup');
  if (/^reminder/.test(arche) && !/Meetup/.test(text)) add('announce-disclosure', 'reminder canvases must mention Meetup');
  if (/https?:\/\/|\bwww\./i.test(text)) add('no-external-url', 'a URL is baked into the canvas; the post carries the link');
  return findings;
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
const all = [];
for (const f of files) { try { all.push(...await lintFile(page, f)); } catch (e) { all.push({ level: 'ERROR', rule: 'canvas-declared', file: f, detail: `could not evaluate: ${e.message}` }); } }
await browser.close();

if (selfTest) {
  let fails = 0;
  for (const f of files) {
    const base = path.basename(f, '.html');
    const got = new Set(all.filter((x) => x.file === f).map((x) => x.rule));
    if (base === '_clean') { const ok = got.size === 0; fails += ok ? 0 : 1; process.stdout.write(`${ok ? 'PASS' : 'FAIL'}  _clean.html  ${ok ? 'no findings' : 'unexpected: ' + [...got].join(',')}\n`); continue; }
    const rule = base;
    if (!RULES.includes(rule)) { process.stdout.write(`SKIP  ${base}.html (not a rule name)\n`); continue; }
    const ok = got.has(rule) && got.size === 1;
    fails += ok ? 0 : 1;
    process.stdout.write(`${ok ? 'PASS' : 'FAIL'}  ${base}.html  expected only [${rule}], got [${[...got].join(',') || 'nothing'}]\n`);
  }
  const covered = files.map((f) => path.basename(f, '.html')).filter((b) => RULES.includes(b));
  const missing = RULES.filter((r) => !covered.includes(r));
  if (missing.length) { fails += 1; process.stdout.write(`FAIL  rules without a fixture: ${missing.join(', ')}\n`); }
  process.stdout.write(`\nself-test: ${fails === 0 ? 'PASS' : 'FAIL'} (${covered.length}/${RULES.length} rules proved red, clean fixture ${fails === 0 ? 'green' : 'see above'})\n`);
  process.exit(fails ? 1 : 0);
}
if (asJson) process.stdout.write(JSON.stringify(all, null, 2) + '\n');
else {
  for (const x of all) process.stdout.write(`[${x.level}] ${x.rule} — ${path.relative(process.cwd(), x.file)} — ${x.detail}\n`);
  process.stdout.write(`\npt-lint: ${all.length ? 'FAIL' : 'PASS'} — ${all.length} error(s) across ${files.length} file(s)\n`);
}
process.exit(all.length ? 1 : 0);
