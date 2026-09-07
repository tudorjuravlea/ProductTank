#!/usr/bin/env node
// figma-pass-2.mjs: the second capture pass over MTP Brand Resources 2026. Pass a file key with --key; the tool never carries one.
//   node tools/figma-pass-2.mjs --out <dir> [--key <fileKey>] [--nodes <ids.json>] [--dry-run]
// Reads ~/.figma-token ONLY into a request header (never printed). Honours Retry-After: if the wait is
// longer than an hour it records the reopen time and exits 2 instead of polling (engine spec-capture.md).
// Fetches: node trees of the ProductTank social templates (geometry + text styles for the tear-down
// sheets), SVG exports of the Circle/Venn component variants and the markup shapes, the MTP Logo
// component variants, and the WPD26 slide frames as PNG. Everything lands under --out for review;
// nothing enters the capture without a human reading it (BRAND-FACTS §10).
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
const args = process.argv.slice(2);
const flag = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
// --key: the original file <fileKey> sits under a plan cap; the owner's copy (same node ids) does not.
const KEY = flag('--key'); if (!KEY) { process.stderr.write('figma-pass-2: --key <fileKey> is required (the file key of your copy of the brand resources)\n'); process.exit(2); }
if (args.includes('--help') || !flag('--out')) { process.stdout.write(readFileSync(new URL(import.meta.url)).toString().split('\n').filter((l) => l.startsWith('//')).slice(0, 10).map((l) => l.replace(/^\/\/ ?/, '')).join('\n') + '\n'); process.exit(args.includes('--help') ? 0 : 2); }
const out = path.resolve(flag('--out')); mkdirSync(out, { recursive: true });
const tokenFile = path.join(os.homedir(), '.figma-token');
if (!existsSync(tokenFile)) { process.stderr.write('figma-pass-2: ~/.figma-token not found (a personal access token, one line)\n'); process.exit(2); }
const token = readFileSync(tokenFile, 'utf8').trim();
const nodesFile = flag('--nodes') || path.join(path.dirname(new URL(import.meta.url).pathname), 'figma-nodes.json');
if (!existsSync(nodesFile)) { process.stderr.write('figma-pass-2: node ids come from --nodes <json> ({templates, shapeSets, markup, wpdSlides}); none found\n'); process.exit(2); }
const NODES = JSON.parse(readFileSync(nodesFile, 'utf8'));
const TEMPLATES = NODES.templates, SHAPE_SETS = NODES.shapeSets, MARKUP = NODES.markup, WPD_SLIDES = NODES.wpdSlides;
async function get(url) {
  const r = await fetch(url, { headers: { 'X-Figma-Token': token } });
  if (r.status === 429) { const ra = Number(r.headers.get('retry-after') || 0); const when = new Date(Date.now() + ra * 1000).toISOString(); writeFileSync(path.join(out, 'RETRY.txt'), `429 at ${new Date().toISOString()}; retry-after ${ra}s → reopens ${when}; limit type ${r.headers.get('x-figma-rate-limit-type')}\n`); process.stderr.write(`figma-pass-2: rate limited, reopens ≈ ${when} (recorded in RETRY.txt)\n`); process.exit(2); }
  if (!r.ok) { process.stderr.write(`figma-pass-2: HTTP ${r.status} for ${url.replace(/\?.*/, '')}\n`); process.exit(1); }
  return r.json();
}
async function download(url, file) { const r = await fetch(url); if (!r.ok) throw new Error(`asset ${r.status}`); writeFileSync(file, Buffer.from(await r.arrayBuffer())); }
if (args.includes('--dry-run')) { process.stdout.write(`would fetch ${TEMPLATES.length} template nodes, ${SHAPE_SETS.length} component sets (+ variants as SVG), ${MARKUP.length} markup SVGs, ${WPD_SLIDES.length} slide PNGs into ${out}\n`); process.exit(0); }
const nodes = await get(`https://api.figma.com/v1/files/${KEY}/nodes?ids=${encodeURIComponent([...TEMPLATES, ...SHAPE_SETS].join(','))}`);
writeFileSync(path.join(out, 'nodes.json'), JSON.stringify(nodes));
const variantIds = SHAPE_SETS.flatMap((id) => (nodes.nodes[id]?.document?.children || []).map((c) => c.id));
const names = {}; for (const id of SHAPE_SETS) for (const c of nodes.nodes[id]?.document?.children || []) names[c.id] = `${nodes.nodes[id].document.name}-${c.name}`.replace(/[^\w-]+/g, '_');
async function images(ids, fmt, scale, sub) {
  mkdirSync(path.join(out, sub), { recursive: true });
  for (let i = 0; i < ids.length; i += 10) {
    const chunk = ids.slice(i, i + 10);
    const d = await get(`https://api.figma.com/v1/images/${KEY}?ids=${encodeURIComponent(chunk.join(','))}&format=${fmt}&scale=${scale}`);
    for (const [id, url] of Object.entries(d.images || {})) { if (!url) continue; await download(url, path.join(out, sub, `${names[id] || id.replace(':', '-')}.${fmt}`)); }
  }
}
await images(variantIds, 'svg', 1, 'shapes'); await images(MARKUP, 'svg', 1, 'markup'); await images(WPD_SLIDES, 'png', 1, 'wpd26-slides');
process.stdout.write(`figma-pass-2: nodes.json (${Object.keys(nodes.nodes).length} nodes), ${variantIds.length} shape variants, ${MARKUP.length} markup shapes, ${WPD_SLIDES.length} slides → ${out}\nNext: read them, then update BRAND-FACTS §4/§5/§8 and replace the derived shapes (DEC-008).\n`);
