// _lib.mjs: shared helpers for the template generators (social and slides). Every emitted file is
// standalone HTML that links ../../fonts/fonts.css, ../../assets/tokens.css and ../../assets/base.css.
import { readFileSync } from 'node:fs';
import path from 'node:path';
export const CAP = path.join(path.dirname(new URL(import.meta.url).pathname), '..');
export const LOCKUP = JSON.parse(readFileSync(path.join(CAP, 'lockup.json'), 'utf8')).file; // e.g. producttank-belgium
export const L = (variant = 'white', width = 380, cls = 'bottom', extraStyle = '') => `<div class="lockup ${cls}" data-slot="lockup"${extraStyle ? ` style="${extraStyle}"` : ''}><img src="../../assets/logo/${LOCKUP}-${variant}.svg" alt="ProductTank Belgium, a Mind the Product meetup" width="${width}"></div>`;
export const ready = `<script>document.fonts.ready.then(() => document.querySelector('.canvas').setAttribute('data-render-ready', ''));</script>`;
export const head = (title, dark = false, extraCss = '') => `<!doctype html>
<html lang="en"${dark ? ' data-theme="dark"' : ''}><head><meta charset="utf-8"><title>${title}</title>
<link rel="stylesheet" href="../../fonts/fonts.css"><link rel="stylesheet" href="../../assets/tokens.css"><link rel="stylesheet" href="../../assets/base.css">
<style>${extraCss}</style></head><body>`;
export const target = (cx, cy, r, cls = 'stroke-zingy', dot = 'fill-zingy') => { const sw = Math.round(r * 0.12); return `<circle class="${cls}" cx="${cx}" cy="${cy}" r="${Math.round(r * 0.94)}" stroke-width="${sw}"/><circle class="${cls}" cx="${cx}" cy="${cy}" r="${Math.round(r * 0.66)}" stroke-width="${sw}"/><circle class="${cls}" cx="${cx}" cy="${cy}" r="${Math.round(r * 0.38)}" stroke-width="${sw}"/><circle class="${dot}" cx="${cx}" cy="${cy}" r="${Math.round(r * 0.12)}"/>`; };
export const full = (cx, cy, r, cls = 'fill-blurple') => `<circle class="${cls}" cx="${cx}" cy="${cy}" r="${r}"/>`;
export const ring = (cx, cy, r, cls = 'stroke-purple') => `<circle class="${cls}" cx="${cx}" cy="${cy}" r="${Math.round(r * 0.94)}" stroke-width="${Math.round(r * 0.12)}"/>`;
export const venn = (w, h, recipe, body, style = '') => `<svg class="layer-shapes" data-derived-art="venn" data-venn="${recipe}" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true"${style ? ` style="${style}"` : ''}>${body}</svg>`;
export const shape = (file, style, extra = '') => { const raw = readFileSync(path.join(CAP, 'assets', 'shapes', file), 'utf8').trim(); const vb = /viewBox="([^"]+)"/.exec(raw)[1]; const inner = raw.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, ''); return `<svg class="shape" data-derived-art="shape" ${extra} viewBox="${vb}" preserveAspectRatio="none" fill="currentColor" style="${style}" aria-hidden="true">${inner}</svg>`; };
export const photo = (style, alt = 'Subject photo slot: replace with a cut-out (transparent PNG) that bleeds off the edge', cls = 'photo subject') => `<figure class="${cls}" data-slot="photo" style="${style}"><img src="../../assets/shapes/photo-slot-subject.svg" alt="${alt}" style="width:100%;height:100%;opacity:.18"></figure>`;
export const facts = (rows, cls = 'facts subheading') => `<ul class="${cls}" data-slot="facts">${rows.map((r) => `<li>${r}</li>`).join('')}</ul>`;
export const speaker = (name, role, company, size = 112, cls = 'speaker') => `<div class="${cls}" data-slot="speaker"><div class="portrait" style="width:${size}px;height:${size}px"><img src="../../assets/shapes/photo-slot-subject.svg" alt="Portrait slot for ${name}" style="opacity:.35"></div><div><p class="subheading bold" data-slot="speaker-name">${name}</p><p class="body-sm" data-slot="role">${role}</p><p class="body-sm medium" data-slot="company">@ ${company}</p></div></div>`;
export const highlight = (a, b) => `<div class="highlight" data-slot="highlight"><span>${a}</span><span>${b}</span></div>`;
export const pill = (text, variant = '') => `<span class="pill ${variant}" data-slot="label">${text}</span>`;
export const sponsorBox = (label = 'Sponsor logo') => `<div class="sponsor-box caption" data-slot="sponsor-logo">${label}</div>`;
