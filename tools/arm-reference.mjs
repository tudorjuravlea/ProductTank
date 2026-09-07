#!/usr/bin/env node
// arm-reference.mjs: promote an OWNER-APPROVED render into the screen's pixel reference.
//   node tools/arm-reference.mjs --lock <design-lock.json> --screen <id> --approved-by "<name>" [--note "…"]
// Copies .render/<id>.png (the engine's render, or render-batch's) to reference/armed/<id>.png, sets
// referenceImage / passThreshold 0.005 / tileCeiling 0.4, removes netNew, appends a DEC entry, and
// re-derives provenance hashes. Refuses without --approved-by: a reference is never self-seeded (DEC-005).
import { existsSync, mkdirSync, copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
const args = process.argv.slice(2);
const flag = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
if (args.includes('--help') || !args.length) { process.stdout.write(readFileSync(new URL(import.meta.url)).toString().split('\n').filter((l) => l.startsWith('//')).slice(0, 6).map((l) => l.replace(/^\/\/ ?/, '')).join('\n') + '\n'); process.exit(0); }
const lockPath = flag('--lock'), id = flag('--screen'), by = flag('--approved-by');
if (!lockPath || !id) { process.stderr.write('arm-reference: --lock and --screen are required\n'); process.exit(2); }
if (!by) { process.stderr.write('arm-reference: refused. A reference is armed only on explicit human approval: pass --approved-by "<name>" after the owner reviewed the render (DEC-005).\n'); process.exit(2); }
const lock = JSON.parse(readFileSync(lockPath, 'utf8')); const dir = path.dirname(path.resolve(lockPath));
const screen = lock.screens.find((s) => s.id === id);
if (!screen) { process.stderr.write(`arm-reference: no screen "${id}" in the lock\n`); process.exit(2); }
const candidates = [path.join(dir, '.render', `${id}.png`), path.join(dir, '.render', 'social', `${id}.png`), path.join(dir, '.render', 'slides', `${id.replace(/^slide-/, '')}.png`)];
const src = candidates.find((p) => existsSync(p));
if (!src) { process.stderr.write(`arm-reference: no render found for "${id}" (looked in ${candidates.map((c) => path.relative(dir, c)).join(', ')}); render it first\n`); process.exit(2); }
mkdirSync(path.join(dir, 'reference', 'armed'), { recursive: true });
const rel = path.join('reference', 'armed', `${id}.png`);
copyFileSync(src, path.join(dir, rel));
screen.referenceImage = rel; screen.passThreshold = 0.005; screen.tileCeiling = 0.4; delete screen.netNew;
screen.referenceSource = { fileKey: 'owner-approved-render', nodeId: id, exportedAt: new Date().toISOString().slice(0, 10), note: `armed from ${path.relative(dir, src)} on approval by ${by}` };
const n = (lock.decisions || []).length + 1;
lock.decisions = [...(lock.decisions || []), { id: `DEC-${String(n).padStart(3, '0')}`, date: new Date().toISOString().slice(0, 10), scope: id, decision: `Pixel reference armed for ${id} from an owner-approved render (${path.relative(dir, src)}).`, rationale: `Approved by ${by}${flag('--note') ? '. ' + flag('--note') : ''}`, status: 'approved' }];
writeFileSync(lockPath, JSON.stringify(lock, null, 2) + '\n');
const ENGINE = process.env.FIDELITY_ENGINE || path.join(os.homedir(), '.claude', 'fidelity-engine');
const r = spawnSync('node', [path.join(ENGINE, 'scripts', 'capture-figma.mjs'), '--lock', lockPath, '--derive'], { encoding: 'utf8' });
process.stdout.write(`armed ${id} → ${rel} (approved by ${by}); derive exit ${r.status}\nnext: node ${path.join(ENGINE, 'scripts', 'verify.mjs')} --lock ${lockPath} --screen ${id}\n`);
process.exit(r.status === 0 ? 0 : 2);
