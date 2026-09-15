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
  <h1 class="headline" data-slot="headline">Welcome back:<br><span class="markup" data-markup="box">Belgium</span></h1>
  <div style="margin-top: var(--space-8)">${facts(['Tuesday 14 October', '18:30'])}${facts(['Venue name, city'])}</div>
  <p class="body medium" data-slot="rsvp" style="margin-top: var(--space-6)">Free to attend. RSVP on Meetup.</p>
</div>
${L('white', 380)}
</main>${ready}</body></html>` };

T['event-announce-square'] = { format: 'social-square', archetype: 'event-announce', html: () => head('event-announce · square') + `
<main class="canvas" data-format="social-square" data-archetype="event-announce">
${venn(1080, 1080, 'target,full,ring', full(760, 1080, 420) + target(810, 640, 270) + ring(1080, 1000, 320))}
${photo('right:0;bottom:0;width:440px;height:760px')}
<div class="copy">
  <h1 class="headline" data-slot="headline">Welcome<br>back:<br><span class="markup" data-markup="box">Belgium</span></h1>
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
  <h1 class="headline" data-slot="headline" style="font-size: 64px">Welcome back: <span class="markup" data-markup="box">Belgium</span></h1>
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
  <h1 class="headline" data-slot="headline" style="margin-top: var(--space-8)">Welcome back, <span class="markup" data-markup="box">Belgium</span></h1>
  <p class="subheading" style="margin-top: var(--space-6)">Two talks and a room full of product people.</p>
  <p class="body medium" data-slot="rsvp" style="margin-top: var(--space-6)">Free to attend. RSVP on Meetup.</p>
</div>
</main>${ready}</body></html>` };

// ---------- event-promo (MTP's organiser template: dark ground, highlight, title, location, sponsor box, speakers) ----------
T['event-promo-landscape'] = { format: 'social-landscape', archetype: 'event-promo', dark: true, html: () => head('event-promo · landscape', true) + `
<main class="canvas ground-black" data-format="social-landscape" data-archetype="event-promo">
${venn(1200, 628, 'target,full,ring', full(1120, 96, 176, 'fill-blurple') + target(1140, 600, 150) + ring(700, 660, 160, 'stroke-blurple'))}
${L('white', 240, 'top')}
<div class="copy" style="top: 216px; right: 480px">
  ${highlight('Tuesday 14 October', '18:30')}
  <h1 class="headline" data-slot="headline" style="margin-top: var(--space-6); font-size: 52px">Saying no without losing the room</h1>
  <p class="body medium" data-slot="facts" style="margin-top: var(--space-5)">Venue name, city</p>
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
<div class="copy" style="top: 360px">
  ${highlight('Tuesday 14 October', '18:30')}
  <h1 class="headline" data-slot="headline" style="margin-top: var(--space-8)">Saying no without losing the room</h1>
  <p class="subheading" data-slot="facts" style="margin-top: var(--space-6)">Venue name, city</p>
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
  <div style="margin-top: var(--space-8)">${facts(['Tuesday 14 October', '18:30'])}${facts(['Venue name, city'])}</div>
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
  <div style="margin-top: var(--space-8)">${facts(['Tuesday 14 October', '18:30'])}${facts(['Venue name, city'])}</div>
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
  <h1 class="headline" data-slot="headline" style="margin-top: var(--space-6)">Thank you,<br><span class="markup" data-markup="box">Belgium</span></h1>
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
  <h1 class="headline" data-slot="headline" style="margin-top: var(--space-4)">Thank you,<br><span class="markup" data-markup="box">Belgium</span></h1>
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
  <h1 class="headline" data-slot="headline">ProductTank<br>Belgium 2026<br>in numbers</h1>
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
  <h1 class="headline" data-slot="headline">Welcome back:<br><span class="markup" data-markup="box">Belgium</span></h1>
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

// ---------- meetup-card (DEC-014: the Meetup event page as LinkedIn shows it, around the brand canvas) ----------
T['meetup-card-portrait'] = { format: 'social-portrait', archetype: 'meetup-card', html: () => head('meetup-card · portrait') + `
<main class="canvas" data-format="social-portrait" data-archetype="meetup-card">
<div class="frame-tilt"><section class="frame-card" data-slot="event-card" style="height: 600px">
${venn(952, 600, 'target,full,ring', full(952, 620, 170) + target(820, 540, 150) + ring(560, 680, 160)).replace('class="layer-shapes"', 'class="layer-shapes" style="left:0;top:0"')}
${L('white', 300, 'top')}
<div class="copy" style="margin-top: 208px; max-width: 500px">
  ${highlight('14 October', '18:30')}
  <h1 class="headline" data-slot="headline" style="margin-top: var(--space-6)">Saying no without losing the room</h1>
  <p class="body medium" data-slot="facts" style="margin-top: var(--space-5)">Venue name, city</p>
  <p class="body-sm" data-slot="rsvp" style="margin-top: var(--space-3)">Free to attend. RSVP on Meetup.</p>
</div>
<div style="position:absolute;left:560px;top:var(--space-12);z-index:2;display:flex;flex-direction:column;gap:var(--space-6)" data-slot="lineup">
  ${speaker('Firstname Lastname', 'Head of Product', 'Acme', 96)}
  ${speaker('Firstname Lastname', 'Product manager', 'Beta', 96)}
</div>
</section></div>
<div class="frame-copy" style="top: 760px">
  <div style="display:flex; gap: var(--space-8); align-items:flex-start">
    <h2 class="frame-title" data-slot="title" style="flex:1">Saying no without losing the room</h2>
    <div class="date-tile" data-slot="date-tile"><div class="tile"><div class="month">Oct</div><div class="day">14</div></div><div class="time">18:30</div></div>
  </div>
  <div class="frame-location" data-slot="location" style="margin-top: var(--space-10)"><svg viewBox="0 0 24 24" data-derived-art="icon" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg><span>Venue name, city</span></div>
  <div class="frame-button" data-slot="cta-button" style="margin-top: var(--space-10)">Attend on Meetup</div>
  <div style="display:flex; justify-content:space-between; align-items:center; margin-top: var(--space-12)">
    <p class="frame-by" data-slot="by-line">By ProductTank Belgium</p>
    ${sponsorBox('Meetup logo').replace('data-slot="sponsor-logo"', 'data-slot="platform-logo"')}
  </div>
</div>
</main>${ready}</body></html>` };

// ---------- chapter layouts (DEC-015: patterns observed in other chapters' posts, rebuilt in this system) ----------
const hostedBy = (label = 'Host logo') => `<div class="hosted-by"><span class="caption medium">Hosted by</span>${sponsorBox(label)}</div>`;
const excl = (style) => shape('markup-exclamation.svg', style, 'data-markup="exclamation"');
const arrow = (style) => shape('markup-arrow.svg', style, 'data-markup="arrow"');
const circleSlot = (style, name = 'Firstname Lastname') => `<figure class="portrait-circle" data-slot="photo" style="${style}"><img src="../../assets/shapes/photo-slot-subject.svg" alt="Portrait slot for ${name}" style="opacity:.35"></figure>`;

T['speaker-tease-square'] = { format: 'social-square', archetype: 'speaker-tease', html: () => head('speaker-tease · square') + `
<main class="canvas" data-format="social-square" data-archetype="speaker-tease">
${venn(1080, 1080, 'target,full,ring', target(1000, 140, 300) + full(-40, 1120, 300) + ring(1040, 1000, 260))}
${L('white', 380, 'top')}
${circleSlot('right:var(--space-16);top:400px;width:360px;height:360px')}
<div class="copy" style="top: 400px; right: 480px">
  <div style="display:flex;align-items:flex-end;gap:var(--space-4)"><p class="subheading bold" data-slot="label">Meet the next speaker</p>${excl('width:48px;height:88px;color:var(--action);flex:none')}</div>
  <h1 class="headline" data-slot="headline" style="margin-top: var(--space-6)">Firstname<br>Lastname</h1>
  <p class="subheading" data-slot="role" style="margin-top: var(--space-6)">Head of Product @ Acme</p>
</div>
<div style="position:absolute;left:var(--space-16);bottom:var(--space-16);z-index:2">${highlight('December', 'Stay tuned for updates')}</div>
</main>${ready}</body></html>` };

T['team-member-portrait'] = { format: 'social-portrait', archetype: 'team-member', html: () => head('team-member · portrait') + `
<main class="canvas" data-format="social-portrait" data-archetype="team-member">
${venn(1080, 1350, 'target,full,ring', target(1020, 160, 260) + full(180, 1300, 300, 'fill-blurple') + ring(1040, 1100, 300))}
${photo('right:0;bottom:0;width:620px;height:900px', 'Team member photo slot: a head-and-shoulders cut-out bleeding off the bottom edge')}
${L('white', 380, 'top')}
<div class="copy" style="top: 380px">
  <span class="pill" data-slot="label">Meet the team</span>
  <div class="bar-markup" data-markup="bar" style="margin-top: var(--space-10); max-width: 560px">
    <h1 class="headline" data-slot="headline">Firstname<br>Lastname</h1>
    <p class="subheading" data-slot="role" style="margin-top: var(--space-6)">Product consultant @ Acme, trainer and facilitator</p>
  </div>
</div>
</main>${ready}</body></html>` };

T['carousel-cover-portrait'] = { format: 'social-portrait', archetype: 'carousel-cover', html: () => head('carousel-cover · portrait') + `
<main class="canvas" data-format="social-portrait" data-archetype="carousel-cover">
${venn(1080, 1350, 'target,full,ring', full(-60, 300, 380, 'fill-blurple') + target(900, 1300, 320) + ring(1080, 700, 240))}
${photo('right:0;bottom:0;width:520px;height:640px', 'Subject photo slot: the person recommending, a cut-out bleeding off the bottom edge')}
${L('white', 380, 'top')}
<div class="copy" style="top: 360px">
  <h1 class="headline" data-slot="headline">What gets our<br>brains in motion</h1>
  <p class="subheading" data-slot="body" style="margin-top: var(--space-6); max-width: 800px">Content our community turns to for learning and inspiration</p>
  <div style="display:flex;align-items:center;gap:var(--space-6);margin-top: var(--space-10)"><span class="pill" data-slot="cta">Swipe to see</span>${arrow('width:140px;height:80px;color:var(--action);flex:none')}</div>
  <p class="body" data-slot="attribution" style="margin-top: var(--space-16); max-width: 480px">Recommendations from<br><span class="bold">Firstname Lastname</span><br>Product designer @ Acme</p>
</div>
</main>${ready}</body></html>` };

T['lineup-columns-portrait'] = { format: 'social-portrait', archetype: 'lineup', html: () => head('lineup · portrait · columns') + `
<main class="canvas" data-format="social-portrait" data-archetype="lineup">
${venn(1080, 1350, 'target,full,ring', full(540, 1420, 360, 'fill-blurple') + target(180, 1380, 260) + ring(920, 1400, 260))}
${L('white', 380, 'top')}
${hostedBy()}
<div class="copy" style="top: 360px">
  ${highlight('Tuesday 14 October', '18:30')}
  <h1 class="headline" data-slot="headline" style="margin-top: var(--space-6)">AI, applied</h1>
  <p class="subheading" data-slot="talk" style="margin-top: var(--space-4); max-width: 900px">Real stories from product people using AI</p>
  ${facts(['Venue name, city'], 'facts body medium').replace('class="facts body medium"', 'class="facts body medium" style="margin-top: var(--space-6)"')}
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-6);margin-top: var(--space-12)" data-slot="lineup">
    ${speaker('Firstname Lastname', 'Senior product owner', 'Acme', 200, 'speaker col')}
    ${speaker('Firstname Lastname', 'Senior product manager', 'Beta', 200, 'speaker col')}
    ${speaker('Firstname Lastname', 'Product owner', 'Gamma', 200, 'speaker col')}
  </div>
  <p class="body medium" data-slot="rsvp" style="margin-top: var(--space-10)">Free to attend. RSVP on Meetup.</p>
</div>
</main>${ready}</body></html>` };

T['event-promo-square'] = { format: 'social-square', archetype: 'event-promo', dark: true, html: () => head('event-promo · square', true) + `
<main class="canvas ground-black" data-format="social-square" data-archetype="event-promo">
${venn(1080, 1080, 'target,full,ring', full(1100, 700, 200, 'fill-blurple') + target(1040, 1000, 200) + ring(760, 1120, 220, 'stroke-blurple'))}
${L('white', 380, 'top')}
${hostedBy()}
<div class="copy" style="top: 320px">
  ${highlight('Tuesday 14 October, 18:30', 'Venue name, city')}
  <h1 class="headline" data-slot="headline" style="margin-top: var(--space-6); font-size: 72px; max-width: 880px">When the ground is shifting but you're rearranging deck chairs</h1>
  <p class="subheading" data-slot="talk" style="margin-top: var(--space-5); max-width: 800px">How to stop layering AI on broken systems and rethink your product</p>
</div>
<div style="position:absolute;left:var(--space-16);bottom:var(--space-16);z-index:2;display:flex;flex-direction:column;gap:var(--space-5)" data-slot="lineup">
  ${speaker('Firstname Lastname', 'Co-founder, data and AI strategy', 'Acme', 144)}
  <p class="body-sm medium" data-slot="rsvp">Free to attend. RSVP on Meetup.</p>
</div>
</main>${ready}</body></html>` };

T['linkedin-cover-evergreen'] = { format: 'linkedin-cover', archetype: 'linkedin-cover', html: () => head('linkedin-cover · evergreen · 2256x382') + `
<main class="canvas" data-format="linkedin-cover" data-archetype="linkedin-cover">
${venn(2256, 382, 'target,full,ring', target(1700, 60, 260) + full(2256, 260, 200, 'fill-white') + ring(1560, 400, 180, 'stroke-blurple'))}
${photo('right:0;bottom:0;width:640px;height:382px', 'City photo slot: a landmark cut-out bleeding off the right and bottom edges')}
<div class="divider-v" style="left: 560px; top: 64px; height: 254px"></div>
<div class="copy" style="top: 64px; left: 640px; right: 560px">
  <h1 class="headline" data-slot="headline">See you in <span class="markup" data-markup="box">Belgium</span></h1>
  <p class="subheading" data-slot="body" style="margin-top: var(--space-5)">Meetups for product people, by product people</p>
</div>
${L('white', 420, 'top').replace('class="lockup top"', 'class="lockup top" style="top: 64px"')}
</main>${ready}</body></html>` };

// ---------- programme layouts (DEC-016: compositions rebuilt from a sibling community skill's canvases) ----------
const ICON = { calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>', clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>', pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>', check: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>' };
const icon = (name) => `<svg viewBox="0 0 24 24" data-derived-art="icon" aria-hidden="true">${ICON[name]}</svg>`;
const ifacts = (rows) => `<ul class="facts icons body medium" data-slot="facts">${rows.map(([i, t]) => `<li>${icon(i)}<span>${t}</span></li>`).join('')}</ul>`;
const partners = (label, names) => `<div data-slot="partners"><hr class="hairline"><p class="caption medium" style="margin-top: var(--space-5); letter-spacing: 0.08em; text-transform: uppercase">${label}</p><ul class="partners" style="margin-top: var(--space-4)">${names.map((n) => `<li>${n}</li>`).join('')}</ul></div>`;

T['statement-portrait'] = { format: 'social-portrait', archetype: 'statement', html: () => head('statement · portrait') + `
<main class="canvas" data-format="social-portrait" data-archetype="statement">
${venn(1080, 1350, 'target,full,ring', full(1080, 760, 300, 'fill-blurple') + target(160, 1000, 220) + ring(980, 1150, 260))}
${L('white', 380, 'top')}
<div class="copy" style="top: 360px">
  ${ifacts([['calendar', 'Tuesday 14 October'], ['clock', '18:30'], ['pin', 'Venue name, city']])}
  <h1 class="headline" data-slot="headline" style="margin-top: var(--space-6)">Curiosity welcomed.</h1>
  <p class="payoff" data-slot="body" style="margin-top: var(--space-4)">Product people, meet product people.</p>
  <p class="body medium" data-slot="rsvp" style="margin-top: var(--space-8)">Free to attend. RSVP on Meetup.</p>
</div>
<div style="position:absolute;left:var(--space-16);right:var(--space-16);bottom:var(--space-16);z-index:2">${partners('Hosted and supported by', ['Host name', 'Partner name', 'Partner name'])}</div>
</main>${ready}</body></html>` };

T['stat-portrait'] = { format: 'social-portrait', archetype: 'stat', html: () => head('stat · portrait · hero number') + `
<main class="canvas" data-format="social-portrait" data-archetype="stat">
${venn(1080, 1350, 'target,full,ring', full(1000, 1300, 380, 'fill-blurple') + target(1040, 300, 220) + ring(120, 1250, 260))}
${L('white', 380, 'top')}
<div class="copy" style="top: 360px">
  ${ifacts([['calendar', 'Season 2026'], ['check', 'Free to attend']])}
  <p class="hero-number" data-slot="stats" style="margin-top: var(--space-6)">NN</p>
  <h1 class="headline" data-slot="headline" style="margin-top: var(--space-4); font-size: 72px">product people in the room last time.</h1>
  <p class="payoff" data-slot="body" style="margin-top: var(--space-4)">Numbers from Meetup, counted, never guessed.</p>
</div>
<div style="position:absolute;left:var(--space-16);right:var(--space-16);bottom:var(--space-16);z-index:2"><hr class="hairline"><div style="display:flex;justify-content:space-between;margin-top: var(--space-5)"><p class="subheading bold" data-slot="rsvp">Next one on Meetup.</p><p class="subheading" data-slot="label" style="opacity:.7; white-space:nowrap">Meetup NN</p></div></div>
</main>${ready}</body></html>` };

T['milestone-portrait'] = { format: 'social-portrait', archetype: 'milestone', html: () => head('milestone · portrait · counter') + `
<main class="canvas" data-format="social-portrait" data-archetype="milestone">
${venn(1080, 1350, 'target,full,ring', full(-40, 400, 300, 'fill-blurple') + target(1040, 260, 240) + ring(1000, 900, 300))}
${L('white', 380, 'top')}
<div class="copy" style="top: 420px">
  ${ifacts([['calendar', 'Since 2023'], ['check', 'Free to attend']])}
  <h1 class="headline" data-slot="headline" style="margin-top: var(--space-6)">Ten meetups.<br><span class="markup" data-markup="box">Eleven</span> is next.</h1>
  <p class="payoff" data-slot="body" style="margin-top: var(--space-4)">Date and venue on Meetup soon.</p>
</div>
<div style="position:absolute;left:var(--space-16);right:var(--space-16);bottom:var(--space-16);z-index:2"><ol class="counter" data-slot="stats"><li>01</li><li>02</li><li>03</li><li>04</li><li>05</li><li>06</li><li>07</li><li>08</li><li>09</li><li>10</li><li class="current">11</li></ol></div>
</main>${ready}</body></html>` };

T['talk-card-portrait'] = { format: 'social-portrait', archetype: 'talk-card', html: () => head('talk-card · portrait') + `
<main class="canvas" data-format="social-portrait" data-archetype="talk-card">
${venn(1080, 1350, 'target,full,ring', full(1000, 1300, 360, 'fill-blurple') + target(120, 1200, 240) + ring(1020, 300, 260))}
${L('white', 380, 'top')}
<div class="copy" style="top: 360px">
  ${highlight('Tuesday 14 October', '18:30')}
  <section class="card" style="margin-top: var(--space-10)">
    <h1 class="heading" data-slot="talk" style="font-size: var(--space-14)">Saying no without losing the room</h1>
    <p class="body" data-slot="body" style="margin-top: var(--space-5)">Twenty minutes on the conversations product people avoid: how to decline a request, keep the relationship and leave with a better roadmap than you came in with.</p>
    <span class="pill straddle" data-slot="label">The talk</span>
  </section>
  <div style="margin-top: var(--space-14)" data-slot="lineup">${speaker('Firstname Lastname', 'Head of Product', 'Acme', 144)}</div>
  <p class="body medium" data-slot="rsvp" style="margin-top: var(--space-8)">Free to attend. RSVP on Meetup.</p>
</div>
</main>${ready}</body></html>` };

T['agenda-portrait'] = { format: 'social-portrait', archetype: 'agenda', html: () => head('agenda · portrait') + `
<main class="canvas" data-format="social-portrait" data-archetype="agenda">
${venn(1080, 1350, 'target,full,ring', full(1080, 1350, 320, 'fill-blurple') + target(1040, 260, 200) + ring(60, 1300, 240))}
${L('white', 380, 'top')}
<div class="copy" style="top: 360px">
  ${ifacts([['calendar', 'Tuesday 14 October'], ['pin', 'Venue name, city']])}
  <h1 class="headline" data-slot="headline" style="margin-top: var(--space-6); font-size: 80px">The evening, hour by hour</h1>
  <ol class="ladder subheading" data-slot="body" style="margin-top: var(--space-8)">
    <li><span class="time">18:00</span><span>Doors open, networking</span></li>
    <li><span class="time">18:35</span><span>Opening words</span></li>
    <li><span class="time">18:40</span><span>First talk and questions</span></li>
    <li><span class="time">19:10</span><span>Break</span></li>
    <li><span class="time">19:20</span><span>Second talk and questions</span></li>
    <li><span class="time">19:50</span><span>Networking</span></li>
  </ol>
  <p class="body medium" data-slot="rsvp" style="margin-top: var(--space-8)">Free to attend. RSVP on Meetup.</p>
</div>
</main>${ready}</body></html>` };

T['reminder-numbers-portrait'] = { format: 'social-portrait', archetype: 'reminder', html: () => head('reminder · portrait · twin numbers') + `
<main class="canvas" data-format="social-portrait" data-archetype="reminder">
${venn(1080, 1350, 'target,full,ring', full(1040, 1320, 380, 'fill-blurple') + target(100, 1200, 220) + ring(1040, 500, 260))}
${L('white', 380, 'top')}
<div class="copy" style="top: 360px">
  <span class="pill" data-slot="label">Last call</span>
  <div style="margin-top: var(--space-8)">${facts(['Tuesday 14 October', '18:30'])}${facts(['Venue name, city'])}</div>
  <div class="twin" data-slot="stats" style="margin-top: var(--space-10)">
    <div><p class="hero-number">NN</p><p class="subheading">days left<br>to RSVP</p></div>
    <div><p class="hero-number">NN</p><p class="subheading">seats left<br>on Meetup</p></div>
  </div>
  <h1 class="headline" data-slot="headline" style="margin-top: var(--space-10); font-size: 72px">Closing soon.</h1>
</div>
<div style="position:absolute;left:var(--space-16);right:var(--space-16);bottom:var(--space-16);z-index:2"><hr class="hairline"><p class="subheading bold" data-slot="rsvp" style="margin-top: var(--space-5)">Free to attend. RSVP on Meetup, or free your spot.</p></div>
</main>${ready}</body></html>` };

T['explainer-portrait'] = { format: 'social-portrait', archetype: 'explainer', html: () => head('explainer · portrait') + `
<main class="canvas" data-format="social-portrait" data-archetype="explainer">
${venn(1080, 1350, 'target,full,ring', full(-60, 1350, 320, 'fill-blurple') + target(1040, 240, 220) + ring(1040, 1250, 260))}
${L('white', 380, 'top')}
<div class="copy" style="top: 360px">
  ${ifacts([['calendar', 'Every two months'], ['check', 'Free to attend']])}
  <h1 class="headline" data-slot="headline" style="margin-top: var(--space-6)">Why come?</h1>
  <ul class="blocks" data-slot="body" style="margin-top: var(--space-6)">
    <li><p class="subheading bold">Talks from the work, not the slides</p><p class="body" style="margin-top: var(--space-2)">Twenty minutes each, from product people who shipped the thing they talk about.</p></li>
    <li><p class="subheading bold">Questions that get answered</p><p class="body" style="margin-top: var(--space-2)">Time after every talk, and a room that stays for the conversation.</p></li>
    <li><p class="subheading bold">A community, not an audience</p><p class="body" style="margin-top: var(--space-2)">Part of Mind the Product, with ProductTank chapters in many cities.</p></li>
  </ul>
</div>
<div style="position:absolute;left:var(--space-16);right:var(--space-16);bottom:var(--space-16);z-index:2"><hr class="hairline"><p class="subheading bold" data-slot="rsvp" style="margin-top: var(--space-5)">Free to attend. RSVP on Meetup.</p></div>
</main>${ready}</body></html>` };

T['badge-a6'] = { format: 'badge-a6', archetype: 'badge', html: () => head('badge · A6') + `
<main class="canvas" data-format="badge-a6" data-archetype="badge">
${venn(1240, 1748, 'target,full,ring', full(1240, 700, 300, 'fill-blurple') + target(160, 1300, 260) + ring(1140, 1200, 300))}
${L('white', 480, 'top')}
<div class="copy" style="top: 600px; text-align: left">
  <h1 class="headline" data-slot="headline">Firstname<br>Lastname</h1>
  <p class="subheading" data-slot="role" style="margin-top: var(--space-8)">Company or chapter</p>
</div>
<div style="position:absolute;left:var(--space-20);right:var(--space-20);bottom: 440px;z-index:2">${partners('Hosted and supported by', ['Host name', 'Partner name'])}</div>
<div class="badge-band" data-slot="label">Speaker</div>
</main>${ready}</body></html>` };

// Black-ground twins of the programme layouts (DEC-016): same slots, same geometry, the Black ground of DEC-010.
for (const id of ['statement-portrait', 'stat-portrait', 'milestone-portrait', 'talk-card-portrait', 'agenda-portrait', 'reminder-numbers-portrait', 'explainer-portrait', 'badge-a6']) {
  const base = T[id];
  T[`${id}-black`] = { format: base.format, archetype: base.archetype, dark: true, html: () => base.html()
    .replace('<html lang="en">', '<html lang="en" data-theme="dark">')
    .replace(/<title>([^<]*)<\/title>/, '<title>$1 · black</title>')
    .replace('<main class="canvas" data-format', '<main class="canvas ground-black" data-format') };
}

// Gradient-ground twins (DEC-017): the programme layouts and the chapter layouts that came from gradient references.
for (const id of ['statement-portrait', 'stat-portrait', 'milestone-portrait', 'talk-card-portrait', 'agenda-portrait', 'reminder-numbers-portrait', 'explainer-portrait', 'badge-a6', 'speaker-tease-square', 'team-member-portrait', 'carousel-cover-portrait', 'lineup-columns-portrait']) {
  const base = T[id];
  T[`${id}-gradient`] = { format: base.format, archetype: base.archetype, html: () => base.html()
    .replace(/<title>([^<]*)<\/title>/, '<title>$1 · gradient</title>')
    .replace('<main class="canvas" data-format', '<main class="canvas ground-gradient" data-format') };
}

for (const [id, t] of Object.entries(T)) writeFileSync(path.join(HERE, `${id}.html`), t.html());
console.log('templates written:', Object.keys(T).length);

if (process.argv.includes('--register')) {
  const lockPath = path.join(CAP, 'design-lock.json');
  const lock = JSON.parse(readFileSync(lockPath, 'utf8'));
  const keep = (lock.screens || []).filter((s) => !T[s.id] || s.referenceImage); // armed screens are never touched
  for (const [id, t] of Object.entries(T)) {
    if (keep.find((s) => s.id === id)) continue;
    const f = formats[t.format];
    keep.push({ id, mode: 'B2', netNew: true, captureWidth: f.width, captureHeight: f.height, dpr: 1, colorScheme: t.dark ? 'dark' : 'light', url: `templates/social/${id}.html`, stateContract: `${t.archetype} template with typed sample copy; Belgium lockup; no photo (slot only)`, locales: ['en'], note: `archetype=${t.archetype} format=${t.format}; tear-down reference: ${f.reference || 'none'}` });
  }
  keep.sort((a, b) => a.id.localeCompare(b.id));
  lock.screens = keep;
  writeFileSync(lockPath, JSON.stringify(lock, null, 2) + '\n');
  console.log('screens registered:', keep.length);
}
