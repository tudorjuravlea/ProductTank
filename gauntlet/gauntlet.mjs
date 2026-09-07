#!/usr/bin/env node
// gauntlet.mjs: the standing acceptance board for the producttank skill. Independent lanes that
// re-derive their expectations from the lock, the files and the pixels.
//   node gauntlet/gauntlet.mjs [--lane <name>] [--json]
// Lanes: contract, engine-lint, lint-fixtures, shapes-css, screens-registered, portability, docs,
//        evals-files, templates-render. Unknown lane = exit 2. Any FAIL = exit 1.
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
const SKILL = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const CAP = path.join(SKILL, 'captures', 'producttank');
const LOCK = path.join(CAP, 'design-lock.json');
const ENGINE = process.env.FIDELITY_ENGINE || path.join(os.homedir(), '.claude', 'fidelity-engine');
const args = process.argv.slice(2);
const only = args.includes('--lane') ? args[args.indexOf('--lane') + 1] : null;
const run = (cmd, cwd = CAP) => { const r = spawnSync(cmd[0], cmd.slice(1), { cwd, encoding: 'utf8' }); return { code: r.status, out: (r.stdout || '') + (r.stderr || '') }; };
const walk = (d, acc = []) => { for (const e of readdirSync(d)) { if (e.startsWith('.') || e === 'node_modules') continue; const p = path.join(d, e); statSync(p).isDirectory() ? walk(p, acc) : acc.push(p); } return acc; };
const lanes = {
  contract() { const r = run(['node', path.join(ENGINE, 'scripts', 'contract-guard.mjs'), '--lock', LOCK]); return { pass: r.code === 0, detail: (r.out.match(/RESULT:.*/) || [r.out.slice(-200)])[0] }; },
  'engine-lint'() { const r = run(['node', path.join(ENGINE, 'scripts', 'adherence-lint.mjs'), '--lock', LOCK, '--src', path.join(CAP, 'templates')]); return { pass: r.code === 0, detail: (r.out.match(/RESULT:.*/) || [r.out.slice(-200)])[0] }; },
  'lint-fixtures'() { const r = run(['node', path.join(SKILL, 'tools', 'pt-lint.mjs'), '--self-test'], SKILL); return { pass: r.code === 0, detail: (r.out.match(/self-test:.*/) || [r.out.slice(-200)])[0] }; },
  'shapes-css'() { const r = run(['node', path.join(SKILL, 'tools', 'sync-shapes-css.mjs'), '--check'], SKILL); return { pass: r.code === 0, detail: r.out.trim().split('\n').pop() }; },
  'screens-registered'() {
    const lock = JSON.parse(readFileSync(LOCK, 'utf8'));
    const files = walk(path.join(CAP, 'templates')).filter((f) => f.endsWith('.html') && path.basename(f) !== 'deck.html').map((f) => path.relative(CAP, f));
    const urls = new Set(lock.screens.map((s) => s.url));
    const unregistered = files.filter((f) => !urls.has(f));
    const missing = lock.screens.filter((s) => !existsSync(path.join(CAP, s.url))).map((s) => s.id);
    return { pass: !unregistered.length && !missing.length, detail: `${files.length} templates, ${lock.screens.length} screens; unregistered: ${unregistered.join(', ') || 'none'}; missing files: ${missing.join(', ') || 'none'}` };
  },
  portability() {
    const shipped = [...walk(path.join(CAP, 'templates')), ...walk(path.join(CAP, 'assets')), path.join(SKILL, 'SKILL.md'), ...walk(path.join(SKILL, 'references')), path.join(CAP, 'BRAND-FACTS.md'), path.join(CAP, 'design-lock.json')];
    const hits = shipped.filter((f) => /\.(html|css|md|json|svg)$/.test(f)).filter((f) => /\/Users\/|file:\/\/\//.test(readFileSync(f, 'utf8'))).map((f) => path.relative(SKILL, f));
    return { pass: !hits.length, detail: hits.length ? `home paths in: ${hits.join(', ')}` : `${shipped.length} shipped files carry no home path` };
  },
  docs() {
    const skill = readFileSync(path.join(SKILL, 'SKILL.md'), 'utf8'); const readme = readFileSync(path.join(SKILL, 'README.md'), 'utf8');
    const lock = JSON.parse(readFileSync(LOCK, 'utf8'));
    const tools = readdirSync(path.join(SKILL, 'tools')).filter((f) => /\.(mjs|py)$/.test(f));
    const toolMiss = tools.filter((t) => !skill.includes(t) && !readme.includes(t));
    const laneMiss = Object.keys(lanes).filter((l) => !skill.includes(`\`${l}\``));
    const sigMiss = lock.signatures.filter((s) => !skill.includes(s.rule)).map((s) => s.rule.slice(0, 40));
    const dontMiss = lock.donts.filter((d) => !skill.includes(d)).map((d) => d.slice(0, 40));
    const problems = [...toolMiss.map((t) => `tool not documented: ${t}`), ...laneMiss.map((l) => `lane not in SKILL.md: ${l}`), ...sigMiss.map((s) => `signature drifted: ${s}…`), ...dontMiss.map((d) => `dont drifted: ${d}…`)];
    return { pass: !problems.length, detail: problems.length ? problems.join('; ') : `${tools.length} tools, ${Object.keys(lanes).length} lanes, ${lock.signatures.length} signatures, ${lock.donts.length} donts all present verbatim` };
  },
  'evals-files'() {
    const evals = JSON.parse(readFileSync(path.join(SKILL, 'evals', 'evals.json'), 'utf8'));
    const missing = evals.flatMap((e) => (e.files || []).filter((f) => !existsSync(path.join(SKILL, f))).map((f) => `${e.id}: ${f}`));
    const neg = evals.some((e) => e.id === 'should-not-trigger');
    return { pass: !missing.length && neg, detail: `${evals.length} cases; should-not-trigger ${neg ? 'present' : 'MISSING'}; missing files: ${missing.join(', ') || 'none'}` };
  },
  'templates-render'() {
    const out = path.join(CAP, '.render', 'gauntlet');
    const a = run(['node', path.join(SKILL, 'tools', 'render-batch.mjs'), '--lock', LOCK, '--src', path.join(CAP, 'templates', 'social'), '--out', out]);
    const b = run(['node', path.join(SKILL, 'tools', 'render-batch.mjs'), '--lock', LOCK, '--deck', path.join(CAP, 'templates', 'slides'), '--out', out]);
    const n = existsSync(out) ? readdirSync(out).filter((f) => f.endsWith('.png')).length : 0;
    return { pass: a.code === 0 && b.code === 0, detail: `social exit ${a.code}, deck exit ${b.code}, ${n} PNGs${a.code || b.code ? ': ' + (a.out + b.out).trim().split('\n').pop() : ''}` };
  },
};
if (args.includes('--help')) { process.stdout.write(`node gauntlet/gauntlet.mjs [--lane <${Object.keys(lanes).join('|')}>] [--json]\n`); process.exit(0); }
if (only && !lanes[only]) { process.stderr.write(`unknown lane "${only}"; lanes: ${Object.keys(lanes).join(', ')}\n`); process.exit(2); }
const results = [];
for (const [name, fn] of Object.entries(lanes)) { if (only && name !== only) continue; let r; try { r = fn(); } catch (e) { r = { pass: false, detail: `threw: ${e.message}` }; } results.push({ lane: name, ...r }); if (!args.includes('--json')) process.stdout.write(`${r.pass ? 'PASS' : 'FAIL'}  ${name.padEnd(20)} ${r.detail}\n`); }
if (args.includes('--json')) process.stdout.write(JSON.stringify(results, null, 2) + '\n');
const fails = results.filter((r) => !r.pass).length;
process.stdout.write(`\ngauntlet: ${fails ? 'FAIL' : 'PASS'} (${results.length - fails}/${results.length} lanes)\n`);
process.exit(fails ? 1 : 0);
