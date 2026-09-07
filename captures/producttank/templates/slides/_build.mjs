// _build.mjs (slides): emits deck.html (the presentable shell) and nine standalone 1920x1080 layouts
// modelled on MTP's 2026 organiser slide template (Black ground, lockup bottom-left, pills, yellow
// underline markup, circular speaker portraits, ring shapes, QR slots) with the Bold Cyan globe cover.
//   node templates/slides/_build.mjs [--register]
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { CAP, L, ready, head, target, full, ring, venn, shape, photo, facts, speaker, highlight, pill, sponsorBox } from '../_lib.mjs';
const HERE = path.dirname(new URL(import.meta.url).pathname);
const slide = (id, title, ground, body) => head(`slide · ${title}`, ground !== 'cyan') + `\n<main class="canvas${ground === 'black' ? ' ground-black' : ''}" data-format="slide" data-archetype="slide-${id}">\n${body}\n</main>${ready}</body></html>`;
const rings = (x, y, r) => `<circle class="stroke-blurple" cx="${x}" cy="${y}" r="${Math.round(r * 0.94)}" stroke-width="${Math.round(r * 0.12)}"/><circle class="stroke-purple" cx="${x}" cy="${y}" r="${Math.round(r * 0.66)}" stroke-width="${Math.round(r * 0.12)}"/><circle class="stroke-blurple" cx="${x}" cy="${y}" r="${Math.round(r * 0.38)}" stroke-width="${Math.round(r * 0.12)}"/>`;
const underline = (w) => shape('markup-underline.svg', `position:absolute;left:0;bottom:-28px;width:${w}px;height:22px;color:var(--action)`, 'data-markup="underline"');
const T = {};

T.cover = { ground: 'cyan', html: slide('cover', 'cover', 'cyan', `
${photo('left:50%;', 'Textural photo slot: the globe or a scene from a past evening, full-bleed on the right half, takes the tritone wash', 'photo textural')}
${venn(1920, 1080, 'target,full,ring', target(1560, 700, 460) + full(1900, 1080, 260) + ring(1180, 1060, 240), 'z-index:2')}
<div class="copy" style="top: 320px; right: 960px">
  <h1 class="headline" data-slot="headline">Welcome to<br>ProductTank<br><span class="markup" data-markup="box">Brussels</span></h1>
  <div style="margin-top: var(--space-10)">${facts(['Tuesday 14 October', '18:30', 'Venue name'])}</div>
</div>
${L('white', 420)}`) };

T.welcome = { ground: 'black', html: slide('welcome', 'welcome', 'black', `
${photo('left:0;top:0;width:100%;height:100%', 'Textural photo slot: a scene from a past evening, full-bleed, takes the tritone wash', 'photo textural')}
<div class="copy" style="top: 120px; left: 0; right: 0; text-align: center">
  <img src="../../assets/logo/mtp-wordmark-white.svg" alt="Mind the Product" width="220" style="display:inline-block" data-slot="cobrand">
</div>
<div class="copy" style="top: 360px; left: 240px; right: 240px; text-align: center">
  <h1 class="slide-title" data-slot="headline" style="font-size: var(--space-14)">Our mission is to foster collaboration and growth within local product management communities to drive innovation and <span class="underline-markup">excellence.</span></h1>
</div>
${L('white', 300)}`) };

T.agenda = { ground: 'black', html: slide('agenda', 'agenda', 'black', `
${venn(1920, 1080, 'target,full,ring', rings(1700, 300, 300) + full(1900, 1080, 120, 'fill-zingy') + ring(1000, 1100, 200, 'stroke-blurple'))}
<div class="copy" style="right: 720px">
  ${pill("Tonight's meetup", 'blurple')}
  <h1 class="slide-title" data-slot="headline" style="margin-top: var(--space-8)">Tonight</h1>
  <ol class="slide-body" data-slot="agenda" style="list-style:none;padding:0;margin: var(--space-10) 0 0;max-width: 1000px">
    <li style="display:flex;gap:var(--space-8);padding: var(--space-4) 0;border-bottom: 2px solid var(--blurple)"><span class="bold" style="width:160px">18:00</span><span>Doors open, drinks and networking</span></li>
    <li style="display:flex;gap:var(--space-8);padding: var(--space-4) 0;border-bottom: 2px solid var(--blurple)"><span class="bold" style="width:160px">18:30</span><span>Welcome from the organisers</span></li>
    <li style="display:flex;gap:var(--space-8);padding: var(--space-4) 0;border-bottom: 2px solid var(--blurple)"><span class="bold" style="width:160px">18:40</span><span>Talk 1: Saying no without losing the room</span></li>
    <li style="display:flex;gap:var(--space-8);padding: var(--space-4) 0;border-bottom: 2px solid var(--blurple)"><span class="bold" style="width:160px">19:15</span><span>Talk 2: What our onboarding data got wrong</span></li>
    <li style="display:flex;gap:var(--space-8);padding: var(--space-4) 0"><span class="bold" style="width:160px">19:50</span><span>Questions, then more networking</span></li>
  </ol>
</div>
<div style="position:absolute;right:var(--space-24);bottom:var(--space-24);z-index:3;display:flex;align-items:center;gap:var(--space-6)"><span class="body-sm">Thank you to our host</span>${sponsorBox('Host logo')}</div>
${L('white', 300)}`) };

T.speaker = { ground: 'black', html: slide('speaker', 'speaker', 'black', `
${venn(1920, 1080, 'target,full,ring', rings(900, 1060, 220) + full(1900, 200, 220, 'fill-blurple') + ring(1760, 1060, 240, 'stroke-purple'))}
<div class="copy" style="top: 300px; right: 1040px">
  ${pill('Talk 1', 'blurple')}
  <h1 class="slide-title" data-slot="headline" style="margin-top: var(--space-8); position: relative; display: inline-block">Today's speaker${underline(520)}</h1>
</div>
<div style="position:absolute;right:160px;top:240px;z-index:2;width:640px" data-slot="lineup">
  <div class="speaker" style="flex-direction:column;align-items:flex-start;gap:var(--space-6)" data-slot="speaker"><div class="portrait" style="width:360px;height:360px"><img src="../../assets/shapes/photo-slot-subject.svg" alt="Portrait slot" style="opacity:.35"></div><div><p class="heading" data-slot="speaker-name" style="font-size: var(--space-12)">Firstname Lastname</p><p class="subheading" data-slot="role">Head of Product</p><p class="subheading medium" data-slot="company">@ Acme</p></div></div>
  <p class="slide-body medium" data-slot="talk" style="margin-top: var(--space-8)">Saying no without losing the room</p>
</div>
${L('white', 300)}`) };

T['talk-title'] = { ground: 'black', html: slide('talk-title', 'talk title', 'black', `
${venn(1920, 1080, 'full,full', full(1800, 1000, 360) + full(1560, 160, 200, 'fill-purple'))}
<div class="copy" style="top: 300px; right: 560px">
  <h1 class="slide-title" data-slot="headline">Saying no without <span class="underline-markup">losing the room</span></h1>
  <p class="subheading" data-slot="attribution" style="margin-top: var(--space-12)">Firstname Lastname, Head of Product at Acme</p>
</div>
${L('white', 300)}`) };

T.panel = { ground: 'black', html: slide('panel', 'panel', 'black', `
${venn(1920, 1080, 'target,full,ring', rings(1860, 80, 160) + full(60, 1040, 200, 'fill-zingy') + ring(1700, 1000, 220, 'stroke-blurple'))}
<div class="copy" style="right: 720px">
  ${pill('Panel', 'blurple')}
  <h1 class="slide-title" data-slot="headline" style="margin-top: var(--space-8); position: relative; display: inline-block">Today's speakers${underline(560)}</h1>
</div>
<div style="position:absolute;right:var(--space-24);top:264px;z-index:2;display:flex;flex-direction:column;gap:var(--space-8);width:760px" data-slot="lineup">
  ${speaker('Firstname Lastname', 'Moderator', 'ProductTank Brussels', 128)}
  ${speaker('Firstname Lastname', 'Director of Product', 'Acme', 128)}
  ${speaker('Firstname Lastname', 'Product lead', 'Beta', 128)}
</div>
${L('white', 300)}`) };

T['host-sponsor'] = { ground: 'black', html: slide('host-sponsor', 'host and sponsors', 'black', `
${venn(1920, 1080, 'target,full,ring', rings(1760, 200, 220) + full(1840, 1040, 220, 'fill-zingy') + ring(1500, 1000, 220, 'stroke-blurple'))}
<div class="copy">
  ${pill('Sponsorship', 'blurple')}
  <h1 class="slide-title" data-slot="headline" style="margin-top: var(--space-8)">Thanks to our host</h1>
  <div style="margin-top: var(--space-10)">${sponsorBox('Host logo')}</div>
  <p class="subheading" data-slot="body" style="margin-top: var(--space-16)">Supported by</p>
  <div style="display:flex;gap:var(--space-8);margin-top: var(--space-6)" data-slot="sponsors">${sponsorBox('Sponsor logo')}${sponsorBox('Sponsor logo')}${sponsorBox('Sponsor logo')}</div>
</div>
${L('white', 300)}`) };

const qrCard = (label, title, body) => `<div style="width:520px" data-slot="channel">${pill(label, 'blurple')}<p class="subheading bold" style="margin-top: var(--space-4)">${title}</p><p class="body-sm" style="margin-top: var(--space-3)">${body}</p><div class="qr-slot caption" data-slot="qr" style="width:160px;height:160px;margin-top: var(--space-6)">QR slot</div></div>`;
T.community = { ground: 'black', html: slide('community', 'community', 'black', `
${venn(1920, 1080, 'target,full,ring', full(1860, 1000, 240) + rings(1820, 120, 160) + ring(120, 1060, 200, 'stroke-blurple'))}
<div class="copy">
  <h1 class="slide-title" data-slot="headline">Stay in the <span class="markup" data-markup="box">loop</span></h1>
  <div style="display:flex;gap:var(--space-12);margin-top: var(--space-12)" data-slot="channels">
    ${qrCard('Meetup', 'RSVP to every evening', 'Search for ProductTank Brussels on Meetup; slides and photos land on the event page afterwards.')}
    ${qrCard('Speaking', 'Speak at ProductTank', 'Twenty minutes, one story from your product work. Talk to any organiser tonight.')}
    ${qrCard('Sponsorship', 'Host or sponsor an evening', 'A room, a screen, drinks: that is a ProductTank. Local sponsors keep it free.')}
  </div>
</div>
${L('white', 300)}`) };

T.closing = { ground: 'black', html: slide('closing', 'closing', 'black', `
${venn(1920, 1080, 'target,full,ring', full(1760, 900, 420) + rings(1240, 960, 240) + ring(1860, 200, 260, 'stroke-purple'))}
<div class="copy" style="top: 280px; right: 760px">
  ${pill('Tuesday 11 November', 'blurple')}
  <div style="display:inline-flex;align-items:center;gap:var(--space-4);margin-left:var(--space-6)">${shape('markup-arrow.svg', 'width:64px;height:40px;color:var(--action);transform:scaleX(-1)', 'data-markup="arrow"')}<span class="body-sm medium">See you next time</span></div>
  <h1 class="headline" data-slot="headline" style="margin-top: var(--space-8)">Thank you,<br>product people</h1>
  <p class="slide-body" data-slot="body" style="margin-top: var(--space-10); max-width: 900px">Two minutes for the feedback survey on Meetup, then the bar is open.</p>
</div>
${L('white', 300)}`) };

for (const [id, t] of Object.entries(T)) writeFileSync(path.join(HERE, `${id}.html`), t.html);
const order = ['cover', 'welcome', 'agenda', 'speaker', 'talk-title', 'panel', 'host-sponsor', 'community', 'closing'];
writeFileSync(path.join(HERE, 'deck.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>ProductTank Brussels deck</title>
<style>
html,body{margin:0;height:100%;background:#000;overflow:hidden}
.stage{position:fixed;inset:0;display:flex;align-items:center;justify-content:center}
iframe{border:0;width:1920px;height:1080px;transform-origin:center center;background:#000}
.hud{position:fixed;left:12px;bottom:12px;color:#fff;font:14px/1 -apple-system,sans-serif;opacity:.5}
@media print{html,body{overflow:visible;background:#fff}.stage{position:static;display:block}.hud{display:none}iframe{display:block;transform:none!important;page-break-after:always}}
</style></head><body>
<div class="stage"><iframe id="f" src="cover.html" title="slide"></iframe></div>
<div class="hud" id="hud"></div>
<script>
const slides = ${JSON.stringify(order.map((s) => s + '.html'))};
let i = Math.max(0, slides.indexOf(location.hash.slice(1)));
const f = document.getElementById('f'), hud = document.getElementById('hud');
function fit(){ const s = Math.min(innerWidth/1920, innerHeight/1080); f.style.transform = 'scale(' + s + ')'; }
function go(n){ i = (n + slides.length) % slides.length; f.src = slides[i]; location.hash = slides[i]; hud.textContent = (i+1) + ' / ' + slides.length + '  ' + slides[i]; }
addEventListener('resize', fit); fit(); go(i);
addEventListener('keydown', (e) => { if (['ArrowRight','PageDown',' '].includes(e.key)) go(i+1); if (['ArrowLeft','PageUp'].includes(e.key)) go(i-1); if (e.key === 'Home') go(0); if (e.key === 'End') go(slides.length-1); });
</script>
<!-- Present: open this file in a browser, press F for fullscreen, arrows to navigate. Export: node tools/render-batch.mjs --lock <lock> --deck templates/slides (PNG per slide + deck.pdf). -->
</body></html>
`);
console.log('slides written:', Object.keys(T).length, '+ deck.html');
if (process.argv.includes('--register')) {
  const lockPath = path.join(CAP, 'design-lock.json');
  const lock = JSON.parse(readFileSync(lockPath, 'utf8'));
  const keep = (lock.screens || []).filter((s) => !s.id.startsWith('slide-') || s.referenceImage);
  for (const [id, t] of Object.entries(T)) {
    const sid = `slide-${id}`; if (keep.find((s) => s.id === sid)) continue;
    keep.push({ id: sid, mode: 'B2', netNew: true, captureWidth: 1920, captureHeight: 1080, dpr: 1, colorScheme: t.ground === 'cyan' ? 'light' : 'dark', url: `templates/slides/${id}.html`, stateContract: `slide layout '${id}' with typed sample copy; Brussels lockup; photo/logo/QR slots only`, locales: ['en'], note: `archetype=slide-${id} format=slide; references: MTP 2026 organiser slide template (owner export), slide cover render` });
  }
  keep.sort((a, b) => a.id.localeCompare(b.id)); lock.screens = keep;
  writeFileSync(lockPath, JSON.stringify(lock, null, 2) + '\n'); console.log('screens registered:', keep.length);
}
