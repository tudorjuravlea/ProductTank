#!/usr/bin/env node
// pptx-survey.mjs: a layout census of a PPTX (or a Google Slides export): slide size, theme colours
// and fonts, masters and layouts, typeface and colour usage, media list, slide text. The survey that
// read the Drive master deck on 2026-09-07, as a script.
//   node tools/pptx-survey.mjs <file.pptx> [--json]
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, readdirSync, statSync, rmSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
const args = process.argv.slice(2); const file = args.find((a) => !a.startsWith('--'));
if (!file || args.includes('--help')) { process.stdout.write('node tools/pptx-survey.mjs <file.pptx> [--json]\n'); process.exit(args.includes('--help') ? 0 : 2); }
const tmp = mkdtempSync(path.join(os.tmpdir(), 'pptx-')); const u = spawnSync('unzip', ['-oq', file, '-d', tmp]);
if (u.status !== 0) { process.stderr.write('pptx-survey: unzip failed (is the file a PPTX?)\n'); process.exit(2); }
const rd = (p) => readFileSync(path.join(tmp, p), 'utf8');
const list = (d) => { try { return readdirSync(path.join(tmp, d)).filter((f) => f.endsWith('.xml')).sort((a, b) => Number(a.match(/\d+/)) - Number(b.match(/\d+/))); } catch { return []; } };
const pres = rd('ppt/presentation.xml'); const cx = Number(/sldSz[^>]*cx="(\d+)"/.exec(pres)?.[1]), cy = Number(/sldSz[^>]*cy="(\d+)"/.exec(pres)?.[1]);
const themes = list('ppt/theme').map((t) => { const x = rd(`ppt/theme/${t}`); const scheme = {}; for (const m of x.matchAll(/<a:(dk1|lt1|dk2|lt2|accent\d|hlink|folHlink)>(.*?)<\/a:\1>/gs)) scheme[m[1]] = /(?:srgbClr val|lastClr)="([0-9A-Fa-f]{6})"/.exec(m[2])?.[1]; return { file: t, name: /clrScheme name="([^"]*)"/.exec(x)?.[1], scheme, major: /<a:majorFont>.*?<a:latin typeface="([^"]*)"/s.exec(x)?.[1], minor: /<a:minorFont>.*?<a:latin typeface="([^"]*)"/s.exec(x)?.[1] }; });
const layouts = list('ppt/slideLayouts').map((l) => ({ file: l, name: /<p:cSld name="([^"]*)"/.exec(rd(`ppt/slideLayouts/${l}`))?.[1] }));
const count = (re, files) => { const c = {}; for (const f of files) for (const m of rd(f).matchAll(re)) c[m[1]] = (c[m[1]] || 0) + 1; return Object.entries(c).sort((a, b) => b[1] - a[1]); };
const all = [...list('ppt/slides').map((f) => `ppt/slides/${f}`), ...list('ppt/slideLayouts').map((f) => `ppt/slideLayouts/${f}`), ...list('ppt/slideMasters').map((f) => `ppt/slideMasters/${f}`)];
const fonts = count(/typeface="([^"]+)"/g, all).slice(0, 12); const colours = count(/srgbClr val="([0-9A-Fa-f]{6})"/g, all).slice(0, 20);
const media = (() => { try { return readdirSync(path.join(tmp, 'ppt/media')).map((m) => ({ file: m, bytes: statSync(path.join(tmp, 'ppt/media', m)).size })); } catch { return []; } })();
const slides = list('ppt/slides').map((s) => ({ file: s, text: [...rd(`ppt/slides/${s}`).matchAll(/<a:t>([^<]{1,80})<\/a:t>/g)].slice(0, 8).map((m) => m[1]).join(' | ') }));
const masters = list('ppt/slideMasters').length;
rmSync(tmp, { recursive: true, force: true });
const report = { file, slideSizePx: [Math.round(cx / 9525), Math.round(cy / 9525)], themes, masters, layouts, fonts, colours, media: media.length, mediaFiles: media, slides };
if (args.includes('--json')) { process.stdout.write(JSON.stringify(report, null, 2) + '\n'); process.exit(0); }
process.stdout.write(`${file}\nslide size ${report.slideSizePx.join('x')} px · masters ${report.masters} · layouts ${layouts.length} · slides ${slides.length} · media ${media.length}\n`);
for (const t of themes) process.stdout.write(`theme ${t.file} "${t.name}" fonts ${t.major}/${t.minor}: ${Object.entries(t.scheme).map(([k, v]) => `${k}=#${v}`).join(' ')}\n`);
process.stdout.write(`fonts: ${fonts.map(([f, n]) => `${f}(${n})`).join(', ')}\ncolours: ${colours.map(([c, n]) => `#${c}(${n})`).join(', ')}\nlayouts: ${layouts.map((l) => l.name).join(', ')}\n`);
for (const s of slides) process.stdout.write(`  ${s.file}: ${s.text}\n`);
