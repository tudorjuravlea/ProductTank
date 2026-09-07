#!/usr/bin/env node
// sync-shapes-css.mjs: inline the markup mask shapes (assets/shapes/markup-box.svg, markup-underline.svg)
// into assets/base.css as data URIs. Chromium refuses external mask-image files on file:// origins, so the
// masks must travel inside the stylesheet; this script keeps them byte-equal to the shape files.
//   node tools/sync-shapes-css.mjs [--check]     (--check exits 1 when base.css is out of sync)
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname);
const A = path.join(HERE, '..', 'captures', 'producttank', 'assets');
const css = readFileSync(path.join(A, 'base.css'), 'utf8');
const uri = (f) => 'url("data:image/svg+xml;utf8,' + encodeURIComponent(readFileSync(path.join(A, 'shapes', f), 'utf8').trim()).replace(/%20/g, ' ').replace(/'/g, '%27') + '")';
let next = css;
for (const [f, marker] of [['markup-box.svg', 'MASK-BOX'], ['markup-underline.svg', 'MASK-UNDERLINE']]) {
  const re = new RegExp(`(/\\* ${marker} \\*/)[\\s\\S]*?(/\\* END ${marker} \\*/)`);
  if (!re.test(next)) { process.stderr.write(`marker ${marker} not found in base.css\n`); process.exit(2); }
  const prop = marker === 'MASK-BOX' ? '.markup::before' : '.underline-markup::after';
  next = next.replace(re, `$1\n${prop} { -webkit-mask-image: ${uri(f)}; mask-image: ${uri(f)}; }\n$2`);
}
if (process.argv.includes('--check')) { if (next !== css) { process.stderr.write('base.css masks are out of sync with assets/shapes; run tools/sync-shapes-css.mjs\n'); process.exit(1); } process.stdout.write('base.css masks in sync\n'); process.exit(0); }
writeFileSync(path.join(A, 'base.css'), next);
process.stdout.write(next === css ? 'base.css unchanged\n' : 'base.css masks updated\n');
