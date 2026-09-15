// Generates the negative-control fixtures for tools/pt-lint.mjs: _clean.html passes; every
// <rule>.html breaks exactly one rule. Re-run after changing base.css or the linter.
import { writeFileSync, readFileSync } from 'node:fs';
import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname);
const CAP = '../../captures/producttank';
const clean = ({ format = 'social-portrait', archetype = 'event-announce', lockup = 'bottom', logo = `${JSON.parse(readFileSync(path.join(HERE, CAP, 'lockup.json'), 'utf8')).file}-white.svg`, alt = 'ProductTank Belgium, a Mind the Product meetup', headline = 'Welcome back: <span class="markup" data-markup="box">Belgium</span>', venn = 'target,full,ring', facts = '<li>Tuesday 14 October</li><li>18:30</li><li>Venue name, city</li>', body = 'Two talks, networking before and after. Free to attend, RSVP on Meetup.', extraMarkup = '', ground = '', readyAttr = 'data-render-ready', width = '380', lockupStyle = '' } = {}) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>fixture</title>
<link rel="stylesheet" href="${CAP}/fonts/fonts.css"><link rel="stylesheet" href="${CAP}/assets/tokens.css"><link rel="stylesheet" href="${CAP}/assets/base.css">
<style>${ground}</style></head>
<body><main class="canvas" data-format="${format}" data-archetype="${archetype}">
<svg class="layer-shapes" data-derived-art="venn" data-venn="${venn}" viewBox="0 0 1080 1350" aria-hidden="true">
<circle class="fill-blurple" cx="600" cy="1000" r="430"/><circle class="stroke-zingy" cx="480" cy="604" r="282" stroke-width="36"/><circle class="stroke-purple" cx="880" cy="880" r="330" stroke-width="40"/></svg>
<div class="copy"><h1 class="headline" data-slot="headline">${headline}</h1>
<ul class="facts subheading" data-slot="facts">${facts}</ul>
<p class="body" data-slot="body">${body}</p>${extraMarkup}</div>
<div class="lockup ${lockup}" data-slot="lockup" style="${lockupStyle}"><img src="${CAP}/assets/logo/${logo}" alt="${alt}" width="${width}"></div>
</main><script>document.fonts.ready.then(() => document.querySelector('.canvas').setAttribute('${readyAttr}', ''));</script></body></html>
`;
const fixtures = {
  '_clean': clean(),
  'canvas-declared': clean({ readyAttr: 'data-ready' }),
  'lockup-present': clean().replace('data-slot="lockup"', 'data-slot="logo"'),
  'lockup-colour': clean({ logo: 'producttank-belgium-cyan.svg' }),
  'lockup-corner': clean({ lockupStyle: 'left: 50%; bottom: 40%;' }),
  'lockup-min-width': clean({ width: '60' }),
  'markup-once': clean({ extraMarkup: '<p class="body">See you <span class="underline-markup">there</span></p>' }),
  'yellow-not-ground': clean({ ground: '.canvas{background:var(--action)}' }),
  'venn-recipe': clean({ venn: 'donut,ring,polo' }),
  'target-once': clean({ venn: 'target,target,full' }),
  'headline-sentence-case': clean({ headline: 'WELCOME BACK BELGIUM' }),
  'no-pm-abbrev': clean({ body: 'A night for PMs and designers. Free to attend, RSVP on Meetup.' }),
  'brand-names': clean({ body: 'Product Tank is back. Free to attend, RSVP on Meetup.' }),
  'date-month-spelled': clean({ facts: '<li>14/10/2026</li><li>18:30</li>' }),
  'announce-disclosure': clean({ body: 'Two talks, networking before and after.' }),
  'no-external-url': clean({ body: 'Free to attend, RSVP on Meetup: https://www.meetup.com/producttank-brussels' }),
  'strapline-verbatim': clean({ alt: 'ProductTank Belgium, a Mind the Product meet-up' }),
};
for (const [name, html] of Object.entries(fixtures)) writeFileSync(path.join(HERE, `${name}.html`), html);
console.log('fixtures written:', Object.keys(fixtures).length);
