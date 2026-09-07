// _build.mjs: emits the social templates (one static HTML per archetype × format) from the measured
// geometry in BRAND-FACTS §8, and (with --register) registers each as a netNew B2 screen in the lock.
// The emitted files are the deliverable: an agent copies the nearest one and changes its slots.
//   node templates/social/_build.mjs [--register]
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { CAP, L, ready, head, target, full, ring, venn, shape, photo, facts, speaker, highlight, pill, sponsorBox } from '../_lib.mjs';
const HERE = path.dirname(new URL(import.meta.url).pathname);
const formats = JSON.parse(readFileSync(path.join(CAP, 'formats.json'), 'utf8'));
const T = {};

// ---------- event-announce (the evergreen canvas) ----------
T['event-announce-portrait'] = { format: 'social-portrait', archetype: 'event-announce', html: () => head('event-announce · portrait') + `
<main class="canvas" data-format="social-portrait" data-archetype="event-announce">
${venn(1080, 1350, 'target,full,ring', full(600, 1000, 430) + target(480, 604, 300) + ring(880, 880, 350))}
${photo('right:0;bottom:0;width:520px;height:976px')}
<div class="copy">
  <h1 class="headline" data-slot="headline">Welcome back:<br><span class="markup" data-markup="box">Brussels</span></h1>
  <div style="margin-top: var(--space-8)">${facts(['Tuesday 14 October', '18:30'])}${facts(['Venue name, Brussels'])}</div>
  <p class="body medium" data-slot="rsvp" style="margin-top: var(--space-6)">Free to attend. RSVP on Meetup.</p>
</div>
${L('white', 380)}
</main>${ready}</body></html>` };

T['event-announce-square'] = { format: 'social-square', archetype: 'event-announce', html: () => head('event-announce · square') + `
<main class="canvas" data-format="social-square" data-archetype="event-announce">
${venn(1080, 1080, 'target,full,ring', full(760, 1080, 420) + target(810, 640, 270) + ring(1080, 1000, 320))}
${photo('right:0;bottom:0;width:440px;height:760px')}
<div class="copy">
  <h1 class="headline" data-slot="headline">Welcome<br>back:<br><span class="markup" data-markup="box">Brussels</span></h1>
  <div style="margin-top: var(--space-8)">${facts(['Tuesday 14 October', '18:30'])}</div>
  <p class="body medium" data-slot="rsvp" style="margin-top: var(--space-4)">Free to attend. RSVP on Meetup.</p>
</div>
${L('white', 380)}
</main>${ready}</body></html>` };

T['event-announce-landscape'] = { format: 'social-landscape', archetype: 'event-announce', html: () => head('event-announce · landscape') + `
<main class="canvas" data-format="social-landscape" data-archetype="event-announce">
${venn(1200, 628, 'target,full,ring', full(736, 512, 128) + target(800, 296, 192) + ring(1064, 560, 232))}
${photo('right:0;bottom:0;width:352px;height:560px')}
<div class="copy" style="right: 400px">
  <h1 class="headline" data-slot="headline" style="font-size: 64px">Welcome back: <span class="markup" data-markup="box">Brussels</span></h1>
  <div style="margin-top: var(--space-5)">${facts(['Tuesday 14 October', '18:30', 'Venue name'])}</div>
  <p class="body-sm medium" data-slot="rsvp" style="margin-top: var(--space-3)">Free to attend. RSVP on Meetup.</p>
</div>
${L('white', 300)}
</main>${ready}</body></html>` };

T['event-announce-story'] = { format: 'story', archetype: 'event-announce', dark: true, html: () => head('event-announce · story', true) + `
<main class="canvas" data-format="story" data-archetype="event-announce">
${venn(1080, 1920, 'full,full', `<path class="fill-purple" d="M0 900 h232 a232 232 0 0 1 -232 232 z"/><path class="fill-purple" d="M0 1150 a232 232 0 0 1 232 232 h-232 z"/>` + full(1080, 1920, 520) + full(-40, 1700, 260, 'fill-blurple'))}
${photo('left:200px;right:200px;bottom:120px;height:760px', 'Subject photo slot: a cut-out centred in the lower half')}
<div class="copy" style="top: var(--space-64)">
  ${L('white', 480, 'top').replace('class="lockup top"', 'class="lockup top" style="position:relative;left:0;top:0"')}
  <div class="highlight" data-slot="highlight" style="margin-top: var(--space-10)"><span>Tuesday 14 October</span><span>18:30 – 21:00</span></div>
  <h1 class="headline" data-slot="headline" style="margin-top: var(--space-8)">Welcome back, <span class="markup" data-markup="box">Brussels</span></h1>
  <p class="subheading" style="margin-top: var(--space-6)">Two talks and a room full of product people.</p>
  <p class="body medium" data-slot="rsvp" style="margin-top: var(--space-6)">Free to attend. RSVP on Meetup.</p>
</div>
</main>${ready}</body></html>` };

// ---------- event-promo (MTP's organiser template: dark ground, highlight, title, location, sponsor box, speakers) ----------
T['event-promo-landscape'] = { format: 'social-landscape', archetype: 'event-promo', dark: true, html: () => head('event-promo · landscape', true) + `
<main class="canvas ground-black" data-format="social-landscape" data-archetype="event-promo">
${venn(1200, 628, 'target,full,ring', full(1120, 96, 176, 'fill-blurple') + target(1140, 600, 150) + ring(700, 660, 160, 'stroke-blurple'))}
${L('white', 240, 'top')}
<div class="copy" style="top: 176px; right: 480px">
  ${highlight('Tuesday 14 October', '18:30')}
  <h1 class="headline" data-slot="headline" style="margin-top: var(--space-6); font-size: 52px">Saying no without losing the room</h1>
  <p class="body medium" data-slot="facts" style="margin-top: var(--space-5)">Venue name, Brussels</p>
  <p class="body-sm" data-slot="rsvp" style="margin-top: var(--space-3)">Free to attend. RSVP on Meetup.</p>
</div>
<div style="position:absolute;left:var(--space-16);bottom:var(--space-16);z-index:3">${sponsorBox('Host logo')}</div>
<div style="position:absolute;right:var(--space-16);top:200px;z-index:2;display:flex;flex-direction:column;gap:var(--space-8)" data-slot="lineup">
  ${speaker('Firstname Lastname', 'Head of Product', 'Acme', 96)}
  ${speaker('Firstname Lastname', 'Product manager', 'Beta', 96)}
</div>
</main>${ready}</body></html>` };

T['event-promo-portrait'] = { format: 'social-portrait', archetype: 'event-promo', dark: true, html: () => head('event-promo · portrait', true) + `
<main class="canvas ground-black" data-format="social-portrait" data-archetype="event-promo">
${venn(1080, 1350, 'target,full,ring', full(980, 1240, 300, 'fill-blurple') + target(520, 1260, 220) + ring(1000, 560, 240, 'stroke-blurple'))}
${L('white', 380, 'top')}
<div class="copy" style="top: 240px">
  ${highlight('Tuesday 14 October', '18:30')}
  <h1 class="headline" data-slot="headline" style="margin-top: var(--space-8)">Saying no without losing the room</h1>
  <p class="subheading" data-slot="facts" style="margin-top: var(--space-6)">Venue name, Brussels</p>
  <div style="margin-top: var(--space-10); display:flex; flex-direction:column; gap: var(--space-6)" data-slot="lineup">
    ${speaker('Firstname Lastname', 'Head of Product', 'Acme', 112)}
    ${speaker('Firstname Lastname', 'Product manager', 'Beta', 112)}
  </div>
  <p class="body medium" data-slot="rsvp" style="margin-top: var(--space-10)">Free to attend. RSVP on Meetup.</p>
</div>
<div style="position:absolute;left:var(--space-16);bottom:var(--space-16);z-index:3">${sponsorBox('Host logo')}</div>
</main>${ready}</body></html>` };

// ---------- speaker-spotlight (Community Spotlight pattern) ----------
T['speaker-spotlight-landscape'] = { format: 'social-landscape', archetype: 'speaker-spotlight', html: () => head('speaker-spotlight · landscape') + `
<main class="canvas" data-format="social-landscape" data-archetype="speaker-spotlight">
${venn(1200, 628, 'full,full,full', full(924, 130, 276) + full(1180, 560, 190, 'fill-purple'))}
${photo('right:64px;bottom:0;width:480px;height:600px', 'Speaker photo slot: a head-and-shoulders cut-out bleeding off the bottom edge')}
${shape('markup-sparkle.svg', 'position:absolute;left:600px;top:72px;width:112px;height:144px;color:var(--action);z-index:2', 'data-markup="sparkle"')}
${L('white', 330, 'top')}
<div class="copy" style="top: 216px; right: 560px">
  <span class="pill" data-slot="label">Community spotlight</span>
  <h1 class="headline" data-slot="headline" style="margin-top: var(--space-6)">Firstname<br>Lastname</h1>
  <p class="subheading" data-slot="role" style="margin-top: var(--space-6)">Director of Product<br>@ Acme</p>
</div>
</main>${ready}</body></html>` };

T['speaker-spotlight-portrait'] = { format: 'social-portrait', archetype: 'speaker-spotlight', html: () => head('speaker-spotlight · portrait') + `
<main class="canvas" data-format="social-portrait" data-archetype="speaker-spotlight">
${venn(1080, 1350, 'target,full,ring', full(760, 1100, 420) + target(300, 1010, 240) + ring(1000, 700, 300))}
${photo('right:0;bottom:0;width:640px;height:896px', 'Speaker photo slot: a head-and-shoulders cut-out bleeding off the bottom edge')}
${shape('markup-sparkle.svg', 'position:absolute;left:720px;top:352px;width:112px;height:144px;color:var(--action);z-index:2', 'data-markup="sparkle"')}
${L('white', 380, 'top')}
<div class="copy" style="top: 328px">
  <span class="pill" data-slot="label">Speaker</span>
  <h1 class="headline" data-slot="headline" style="margin-top: var(--space-6)">Firstname<br>Lastname</h1>
  <p class="subheading" data-slot="role" style="margin-top: var(--space-6)">Director of Product, Acme</p>
  <p class="body" data-slot="talk" style="margin-top: var(--space-8); max-width: 520px">Talk title goes here, in sentence case, eight words at most</p>
</div>
</main>${ready}</body></html>` };

// ---------- lineup ----------
const row = (n, t, r, c) => `<li style="margin-top: var(--space-8)">${speaker(n, r, c, 112)}<p class="body" data-slot="talk" style="margin: var(--space-3) 0 0 136px">${t}</p></li>`;
T['lineup-portrait'] = { format: 'social-portrait', archetype: 'lineup', html: () => head('lineup · portrait') + `
<main class="canvas" data-format="social-portrait" data-archetype="lineup">
${venn(1080, 1350, 'target,full,ring', full(1000, 1250, 380) + target(1060, 200, 240) + ring(720, 1150, 320))}
<div class="copy">
  <h1 class="headline" data-slot="headline">Two talks,<br><span class="markup" data-markup="box">one evening</span></h1>
  <div style="margin-top: var(--space-8)">${facts(['Tuesday 14 October', '18:30'])}${facts(['Venue name, Brussels'])}</div>
  <ul style="list-style:none;padding:0;margin:0;max-width:640px" data-slot="lineup">
    ${row('Firstname Lastname', 'Saying no without losing the room', 'Head of Product', 'Acme')}
    ${row('Firstname Lastname', 'What our onboarding data got wrong', 'Product manager', 'Beta')}
  </ul>
  <p class="body medium" data-slot="rsvp" style="margin-top: var(--space-8)">Free to attend. RSVP on Meetup.</p>
</div>
${L('white', 380)}
</main>${ready}</body></html>` };

T['lineup-square'] = { format: 'social-square', archetype: 'lineup', html: () => head('lineup · square') + `
<main class="canvas" data-format="social-square" data-archetype="lineup">
${venn(1080, 1080, 'target,full,ring', full(1000, 980, 340) + target(980, 260, 220) + ring(760, 900, 260))}
<div class="copy">
  <h1 class="headline" data-slot="headline">Two talks,<br><span class="markup" data-markup="box">one evening</span></h1>
  <div style="margin-top: var(--space-6)">${facts(['Tuesday 14 October', '18:30'])}</div>
  <ul style="list-style:none;padding:0;margin:0;max-width:624px" data-slot="lineup">
    ${row('Firstname Lastname', 'Saying no without losing the room', 'Head of Product', 'Acme')}
    ${row('Firstname Lastname', 'What our onboarding data got wrong', 'Product manager', 'Beta')}
  </ul>
</div>
${L('white', 380)}
</main>${ready}</body></html>` };

// ---------- reminder ----------
T['reminder-portrait'] = { format: 'social-portrait', archetype: 'reminder', html: () => head('reminder · portrait') + `
<main class="canvas" data-format="social-portrait" data-archetype="reminder">
${venn(1080, 1350, 'target,full,ring', full(560, 1080, 460) + target(760, 560, 300) + ring(160, 900, 300))}
<div class="copy">
  <span class="pill" data-slot="label">Last call</span>
  <h1 class="headline" data-slot="headline" style="margin-top: var(--space-6)">See you<br><span class="markup" data-markup="box">tomorrow</span></h1>
  <div style="margin-top: var(--space-8)">${facts(['Tuesday 14 October', '18:30'])}${facts(['Venue name, Brussels'])}</div>
  <p class="body medium" data-slot="rsvp" style="margin-top: var(--space-6); max-width: 720px">A few spots left. RSVP on Meetup, and free yours up if you cannot make it.</p>
</div>
${L('white', 380)}
</main>${ready}</body></html>` };

T['reminder-story'] = { format: 'story', archetype: 'reminder', dark: true, html: () => head('reminder · story', true) + `
<main class="canvas" data-format="story" data-archetype="reminder">
${venn(1080, 1920, 'target,full,ring', full(1080, 1500, 520) + target(320, 1300, 340) + ring(900, 900, 330))}
<div class="copy" style="top: var(--space-64)">
  ${L('white', 480, 'top').replace('class="lockup top"', 'class="lockup top" style="position:relative;left:0;top:0"')}
  <span class="pill" data-slot="label" style="margin-top: var(--space-10); background: var(--white); color: var(--midnight)">Last call</span>
  <h1 class="headline" data-slot="headline" style="margin-top: var(--space-8)">See you<br><span class="markup" data-markup="box">tomorrow</span></h1>
  <div class="highlight" data-slot="highlight" style="margin-top: var(--space-8)"><span>Tuesday 14 October</span><span>18:30</span></div>
  <p class="subheading" data-slot="rsvp" style="margin-top: var(--space-8)">A few spots left. RSVP on Meetup.</p>
</div>
</main>${ready}</body></html>` };

// ---------- recap-thanks (textural photo with the tritone wash) ----------
T['recap-thanks-portrait'] = { format: 'social-portrait', archetype: 'recap-thanks', html: () => head('recap-thanks · portrait') + `
<main class="canvas" data-format="social-portrait" data-archetype="recap-thanks">
<figure class="photo textural" data-slot="photo"><img src="../../assets/shapes/photo-slot-subject.svg" alt="Event photo slot: a full-bleed photo from the evening takes the tritone wash"></figure>
${venn(1080, 1350, 'target,full,ring', full(900, 1200, 300) + target(940, 260, 200) + ring(160, 700, 220)).replace('class="layer-shapes"', 'class="layer-shapes" style="z-index:2;opacity:.9"')}
<div class="copy">
  <span class="pill" data-slot="label">Recap</span>
  <h1 class="headline" data-slot="headline" style="margin-top: var(--space-6)">Thank you,<br><span class="markup" data-markup="box">Brussels</span></h1>
  <div style="display:flex;gap:var(--space-24);margin-top: var(--space-12)" data-slot="stats">
    <div data-slot="stat"><p class="stat-number" style="font-size: var(--space-40)">84</p><p class="body">product people</p></div>
    <div data-slot="stat"><p class="stat-number" style="font-size: var(--space-40)">2</p><p class="body">talks</p></div>
  </div>
  <p class="body" data-slot="thanks" style="margin-top: var(--space-12); max-width: 760px">Thanks to our speakers and to our host for the room. Photos and slides are on the Meetup page.</p>
</div>
${L('white', 380)}
</main>${ready}</body></html>` };

T['recap-thanks-landscape'] = { format: 'social-landscape', archetype: 'recap-thanks', html: () => head('recap-thanks · landscape') + `
<main class="canvas" data-format="social-landscape" data-archetype="recap-thanks">
<figure class="photo textural" data-slot="photo"><img src="../../assets/shapes/photo-slot-subject.svg" alt="Event photo slot: a full-bleed photo from the evening takes the tritone wash"></figure>
${venn(1200, 628, 'target,full,ring', full(1100, 560, 200) + target(1000, 160, 150) + ring(760, 600, 170)).replace('class="layer-shapes"', 'class="layer-shapes" style="z-index:2;opacity:.9"')}
<div class="copy" style="right: 480px">
  <span class="pill" data-slot="label">Recap</span>
  <h1 class="headline" data-slot="headline" style="margin-top: var(--space-4)">Thank you,<br><span class="markup" data-markup="box">Brussels</span></h1>
  <p class="body" data-slot="thanks" style="margin-top: var(--space-6)">84 product people, two talks, one host to thank. Slides are on the Meetup page.</p>
</div>
${L('white', 330)}
</main>${ready}</body></html>` };

// ---------- call-for ----------
T['call-for-portrait'] = { format: 'social-portrait', archetype: 'call-for', html: () => head('call-for · portrait') + `
<main class="canvas" data-format="social-portrait" data-archetype="call-for">
${venn(1080, 1350, 'target,full,ring', full(940, 1100, 440) + target(260, 1000, 260) + ring(1000, 520, 280))}
<div class="copy">
  <span class="pill" data-slot="label">Call for speakers</span>
  <h1 class="headline" data-slot="headline" style="margin-top: var(--space-6)">Share what works<br>(and what<br><span class="markup" data-markup="box">doesn't</span>)</h1>
  <p class="subheading" data-slot="body" style="margin-top: var(--space-8); max-width: 760px">Twenty minutes, one story from your product work, and a room that wants it.</p>
  <p class="body medium" data-slot="rsvp" style="margin-top: var(--space-8)">Propose a talk: message the organisers on Meetup.</p>
</div>
${L('white', 380)}
</main>${ready}</body></html>` };

T['call-for-square'] = { format: 'social-square', archetype: 'call-for', html: () => head('call-for · square') + `
<main class="canvas" data-format="social-square" data-archetype="call-for">
${venn(1080, 1080, 'target,full,ring', full(940, 900, 360) + target(240, 880, 220) + ring(1000, 400, 240))}
<div class="copy">
  <span class="pill" data-slot="label">Call for hosts</span>
  <h1 class="headline" data-slot="headline" style="margin-top: var(--space-6)">Got a room<br>for <span class="markup" data-markup="box">80 people</span>?</h1>
  <p class="subheading" data-slot="body" style="margin-top: var(--space-8); max-width: 704px">Host an evening of ProductTank: a screen, some chairs, and your team on stage if you like.</p>
  <p class="body medium" data-slot="rsvp" style="margin-top: var(--space-8)">Message the organisers on Meetup.</p>
</div>
${L('white', 380)}
</main>${ready}</body></html>` };

// ---------- stat (numbers carousel pattern) ----------
T['stat-square'] = { format: 'social-square', archetype: 'stat', html: () => head('stat · square') + `
<main class="canvas" data-format="social-square" data-archetype="stat">
${shape('venniverse-double-bump.svg', 'position:absolute;right:0;top:0;width:680px;height:176px;color:var(--blurple)')}
${shape('venniverse-chevron.svg', 'position:absolute;left:0;bottom:0;width:200px;height:320px;color:var(--zingy-cyan)')}
${shape('venniverse-chevron.svg', 'position:absolute;left:240px;bottom:0;width:200px;height:320px;color:var(--zingy-cyan)')}
${shape('venniverse-chevron.svg', 'position:absolute;left:480px;bottom:0;width:200px;height:320px;color:var(--zingy-cyan)')}
${shape('markup-plus.svg', 'position:absolute;right:80px;top:200px;width:120px;height:120px;color:var(--action)', 'data-markup="plus"')}
${L('white', 380, 'top')}
<div class="copy" style="top: 320px">
  <h1 class="headline" data-slot="headline">ProductTank<br>Brussels 2026<br>in numbers</h1>
</div>
</main>${ready}</body></html>` };

// ---------- quote ----------
T['quote-portrait'] = { format: 'social-portrait', archetype: 'quote', html: () => head('quote · portrait') + `
<main class="canvas" data-format="social-portrait" data-archetype="quote">
${venn(1080, 1350, 'target,full,ring', full(960, 1180, 400) + target(180, 1080, 240) + ring(1000, 560, 280))}
<div class="copy" style="top: 200px">
  <span class="pill" data-slot="label">From the stage</span>
  <blockquote class="quote" data-slot="quote" style="margin-top: var(--space-8); max-width: 840px">“Saying no is a product skill. Saying it early is a leadership skill.”</blockquote>
  <p class="subheading" data-slot="attribution" style="margin-top: var(--space-8)">Firstname Lastname, Head of Product at Acme</p>
</div>
${L('white', 380)}
</main>${ready}</body></html>` };

// ---------- event-banner (slide cover / LinkedIn event) ----------
T['event-banner-1600x900'] = { format: 'event-banner', archetype: 'event-banner', html: () => head('event-banner · 1600x900') + `
<main class="canvas" data-format="event-banner" data-archetype="event-banner">
<figure class="photo textural" data-slot="photo" style="left:50%"><img src="../../assets/shapes/photo-slot-subject.svg" alt="Textural photo slot: a full-bleed scene takes the tritone wash on the right half"></figure>
${venn(1600, 900, 'target,full,ring', target(1300, 560, 400) + full(1560, 900, 220) + ring(1000, 880, 200)).replace('class="layer-shapes"', 'class="layer-shapes" style="z-index:2"')}
<div class="copy" style="top: 304px; right: 800px">
  <h1 class="headline" data-slot="headline">Welcome back:<br><span class="markup" data-markup="box">Brussels</span></h1>
  <div style="margin-top: var(--space-8)">${facts(['Tuesday 14 October', '18:30'])}</div>
</div>
${L('white', 420)}
</main>${ready}</body></html>` };

// ---------- linkedin-cover ----------
T['linkedin-cover'] = { format: 'linkedin-cover', archetype: 'linkedin-cover', html: () => head('linkedin-cover · 2256x382') + `
<main class="canvas" data-format="linkedin-cover" data-archetype="linkedin-cover">
${venn(2256, 382, 'target,full,ring', target(2060, 190, 330) + full(1760, 420, 220, 'fill-blurple') + ring(2256, 40, 200, 'stroke-midnight'))}
<div class="copy" style="top: 112px; left: 1000px">
  <h1 class="headline" data-slot="headline">Product people, meet product people</h1>
</div>
${L('white', 420, 'top').replace('class="lockup top"', 'class="lockup top" style="top: 64px"')}
</main>${ready}</body></html>` };

for (const [id, t] of Object.entries(T)) writeFileSync(path.join(HERE, `${id}.html`), t.html());
console.log('templates written:', Object.keys(T).length);

if (process.argv.includes('--register')) {
  const lockPath = path.join(CAP, 'design-lock.json');
  const lock = JSON.parse(readFileSync(lockPath, 'utf8'));
  const keep = (lock.screens || []).filter((s) => !T[s.id] || s.referenceImage); // armed screens are never touched
  for (const [id, t] of Object.entries(T)) {
    if (keep.find((s) => s.id === id)) continue;
    const f = formats[t.format];
    keep.push({ id, mode: 'B2', netNew: true, captureWidth: f.width, captureHeight: f.height, dpr: 1, colorScheme: t.dark ? 'dark' : 'light', url: `templates/social/${id}.html`, stateContract: `${t.archetype} template with typed sample copy; Brussels lockup; no photo (slot only)`, locales: ['en'], note: `archetype=${t.archetype} format=${t.format}; tear-down reference: ${f.reference || 'none'}` });
  }
  keep.sort((a, b) => a.id.localeCompare(b.id));
  lock.screens = keep;
  writeFileSync(lockPath, JSON.stringify(lock, null, 2) + '\n');
  console.log('screens registered:', keep.length);
}
