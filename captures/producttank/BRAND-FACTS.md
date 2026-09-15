> Public edition: Mind the Product's renders, file keys and node ids are withheld; values and measurements are complete. The Brand Guide itself is Mind the Product's.

# BRAND-FACTS: ProductTank Belgium (a Mind the Product meetup)

The prose authority for this capture. `design-lock.json` is its machine mirror; if the two disagree,
this file wins and the lock is stale. Every value states its source and its rung on the engine's
context ladder (1 Figma, 3 live product, 4 brand assets; nothing here is rung 6 memory).
Retractions stay in place (§10). Captured 2026-09-07.

Sources: **[G]** Figma *MTP Brand Resources 2026* → page 🔵 Brand Guide UPDATE ("Brand Guide 2024",
39 frames, read through the REST API as node text + fills), **[R]** the same file's pages
🗯️ ProductTank social assets, 🖼️ Templates, 🌎 World Product Day, ©️ ProductTank city logo repository
(image exports at scale 1, `the reference registration (not included: Mind the Product's renders)`), **[W]** mindtheproduct.com CSS and
renders (2026-09-07), **[D]** the Drive folder *ProductTank Brussels* (master deck, docs, covers),
**[M]** pixel measurements of the [R] renders (private capture notes).

## 0. What ProductTank is (copy facts, rung 3/4)

- "ProductTank: Local meetups for product people, by product people." [W /producttank/ meta]
- "ProductTank is an informal meetup that brings together the local product community in each of
  those cities. Whatever your role in Product, you are welcome! ProductTanks are always free to
  attend, organised by volunteers from the local product community, and supported by our generous
  sponsors." [W /producttank/]
- Founded 2010 in London; today spans 200+ cities. [W]
- ProductTank is a trademarked brand owned by Mind the Product; a city tank is started with MTP's
  permission and uses the ProductTank branding. [W]
- Organiser rules [D co-branding, checklist]: the event follows the ProductTank principles (product
  related, not promoting products); ProductTank branding must be used; the event is free to attend;
  registration happens on Meetup.com (a co-registration elsewhere is allowed); co-branding only with
  communities that do not compete with MTP.
- Event lifecycle the organisers run [D checklist]: 3–4 weeks before (confirm speakers, publish the
  Meetup page, promote on LinkedIn and the WhatsApp group), 1 week (final decks, roles), 48–36 h
  (reminder through Meetup, waitlist), day (signs, check-in, photos), after (numbers, survey, photos,
  thanks, LinkedIn recap). Speakers send bios, photos and titles; decks are merged into one master
  deck with the ProductTank intro slides.

## 1. Colours [G 4.1, 4.2; rung 1]

"We're famous for our Cyan. … Bold Cyan is our new primary colour, but it should rarely be left to
do all the work on its own."

| Name | Role | Hex | RGB | CMYK | Pantone | Lock slot |
|---|---|---|---|---|---|---|
| Bold Cyan | primary; "nearly everywhere Mind the Product shows up"; grounds and CTAs | `#126CFF` | 18 108 255 | 100 40 0 0 | 285C | `bold-cyan`, `background` (light) |
| Zingy Cyan | secondary, "cool spectrum of support" | `#21CCFA` | 33 204 250 | 64 0 2 0 | 2985C | `zingy-cyan`, `accent` |
| Purple | secondary | `#8B4BEF` | 139 75 239 | 62 73 0 0 | 2665C | `purple`, `accent3` |
| Blurple | secondary | `#4546E0` | 69 70 224 | 80 69 0 0 | 2726C | `blurple`, `accent2` |
| Markup Yellow | action; "sparingly and with great care … special CTAs, important UI tags, and our Markup graphic element" | `#ECF023` | 236 240 35 | 12 0 85 0 | 388C | `markup-yellow`, `action` |
| Midnight | neutral; text and the dark ground | `#17044A` | 23 4 74 | 97 99 38 45 | 2765C | `midnight`, `text2` (light) / `background` (dark) |
| Mid Gray | neutral | `#C6C1DB` | 198 193 219 | 21 24 7 0 | 665C | `mid-gray`, `border` |
| Light Gray | neutral; "the stage for our other colors" | `#EFEEF2` | 239 238 242 | 11 11 2 0 | 7443C | `light-gray`, `surface2` |
| White | neutral | `#FFFFFF` | 255 255 255 | 0 0 0 0 | Process White | `white`, `surface1`, `text1` (light) |
| Black | neutral; the guide's own body-text colour and the ground of MTP's 2026 organiser templates | `#060119` | 6 1 25 | not in the guide's table; measured from the guide's text fills and the organiser templates | | `black`, `ground-black` (DEC-010) |

Rules: text is always White or Midnight (Black on the Markup is allowed) [G 6.1, 6.5]. Midnight
pairs with Bold Cyan on light grounds; Bold Cyan with Light Gray on Midnight or Black; Midnight
with Light Gray on Bold Cyan [G 6.1]. Contrast floor 4.5:1 for text [G 1.5]. Do not use only
low-contrast colours together [G 5.4]. Measured contrast: White on Bold Cyan 4.58:1 (passes),
Midnight on Bold Cyan 3.99:1 (large text only), White on Midnight 16.9:1, Midnight on Markup
Yellow 12.0:1.

Grounds in MTP's own organiser templates [D exports, rung 4]: the 2026 slide template uses Black `#060119` on 20 of 26 slides and Bold Cyan on the welcome slide; the 1200×675 social template uses Black for event promos and a washed crowd photo for cover images; the WPD images use Black. Bold Cyan remains the ground of MTP-central social work (the evergreen renders) and of this skill's social default; Black is the slide default (DEC-010).

Web-only extras [W, rung 3]: Hot Pink `#F761F7` (site preset `--wp--preset--color--hotpink`) and
the hero gradient Bold Cyan → Blurple appear on mindtheproduct.com; they are not in the 2024
guide and are **not** tokens for social or slides.

**Deprecated (forbidden in the lock, DEC-003):** the pre-2024 palette on the file's 🎨 Colors page:
Midnight Cyan `#192844`, Cyan `#009EE3`, Baby Cyan `#92EAFF`, Misty Cyan `#DDEEEE`, Accessible
Cyan `#007EB6`, Light Cyan Mist `#EFF6F7`, Medium Grey `#8B98A7`, Alert Red `#FA6969`; and the
2023 slide-template theme in the master deck's second master [D]: `#7E57FF`, `#FDAF53`,
`#092232`, `#442A30`, `#EDFE37`, `#C4BFB2`. `#EBEF23` (seen on the file's markup shapes) is the
same yellow drawn by hand, not a second token (DEC-008).

## 2. Typography [G 3.1, 3.2; rung 1] and the shipped face

- Brand typeface **Cera Pro** (TypeMates), "chosen for its simplicity, warmth and elegance …
  works nicely alongside the circles in our Venn". Headings Cera Pro Bold; body Cera Pro
  Regular; Bold and Italic for emphasis.
- Licence: "we have a license for the Cera Pro font family for 15 desktop users and up to 500,000
  users/month on the web. If you're part of the Mind the Product team you can access the font
  files in Drive." Organisers are not covered.
- **Google font alternative (the organiser rule):** "In instances where we cannot use Cera Pro, for
  example Google docs and slides, we use the free google font Montserrat. ProductTank organisers
  can also use Montserrat if they'd prefer not to purchase a license for Cera Pro. … Use Montserrat
  Bold for headings and Regular for bodytext." System fallback: Arial (emails only).
- **Shipped:** Montserrat variable (100–900, normal + italic, latin + latin-ext), SIL OFL 1.1,
  from Google Fonts (`fonts/`). Cera Pro is a drop-in: put the woff2 files in `fonts/`, change
  `fonts[]` and `tokens.typography.*.family`, run `capture-figma.mjs --derive` (DEC-002).
- **Confirmed by MTP's organiser templates** [D exports, rung 4]: the 2026 slide template and the social template both open with "Please use Montserrat ONLY" and "Only use colors in the theme row". Sizes in those templates (at 960×540 / 1200×675): slide titles 50–53 px bold, speaker names 20 px bold, roles 16 px, pills 14 px bold caps, body 12–17 px; social titles 42 px bold (WPD 62), date/time highlight 18 px bold caps, roles Medium 28, speaker names 25 bold. Owner ruling 2026-09-07: Montserrat at the closest optical size (DEC-002).
- Case: "All our headings should be sentence case." UPPER CASE and Capitalised Headings are the
  guide's ✗ examples. Caps are used only in the label pill and the text highlight [G 6.1].
- Leading: "Ensure text has plenty of leading … tight line spacing is stressful to read".
- Web scale [W]: caption 14, body 16, body-large 20, title-5 20, title-4 24, title-3 32, title-2
  40, title-1 48 px; weights 400/500/600/700/900; body line-height 1.5–1.6.
- Guide frames [G]: page numbers and titles Cera Pro 700 80 px; section heads 700 42 px;
  sub-heads 700 24 px; body 400 18 px; intro 500 18 px; data 400 15 px.
- **Social scale (measured, §8):** headline ≈ 100 px bold on the portrait, ≈ 128 px on the
  square, ≈ 82 px on the landscape; lockup wordmark ≈ 64–70 px bold, strapline ≈ 28–30 px
  medium; landscape body ≈ 36 px regular; label pill 18 px bold caps.

Lock roles (7-name scale, Montserrat): display 100/700/1.1 · heading 64/700/1.05 · subheading
36/500/1.2 · body 28/400/1.35 · body-sm 22/400/1.35 · caption 18/500/1.3 · label 16/700/1.2
(+0.06 em, caps).

## 3. Logo and the ProductTank lockup [G 2.1–2.5, R; rung 1]

- The Mind the Product logo is the stacked wordmark "mind the / PRODUCT"; things to avoid: change
  the colour, add text, drop shadow or reflection, retype in another face, distort, outline, add
  a venn, rotate.
- **ProductTank logo** = the wordmark "ProductTank" + strapline; "It only consists of the
  wordmark. The ProductTank logo is subsidiary to the Mind the Product wordmark but should be used
  whenever we communicate with the ProductTank audience." Capitalisation now matches the written
  form (one word, capital P and T).
- **City version:** "Each ProductTank in our network has its own version of the ProductTank logo
  that incorporates the name of their city, region, or locale. This city name is added to the
  ProductTank logo in Cera Pro Regular, and the strapline changes to indicate it is one of the many
  meetups in the network." Strapline text: **a Mind the Product meetup** (locked string).
- Clear space: "the height of the P in product". Minimum size: digital 80 px wide, print 16 mm.
- Colour: "available in two colours, Midnight Cyan and White. Do not change the colour."
- Positioning: "left aligned, and therefore should always appear in either the top or bottom left
  corner"; "Our Logo is always justified to the left-hand side".
- Files shipped (`assets/logo/`, Figma exports with text outlined, fill `#17044A` or white):
  `producttank-brussels-{midnight,white}.svg` (392×155 viewBox, three lines: ProductTank /
  Brussels / strapline), `producttank-belgium-*` (derived from it, DEC-013), `producttank-generic-*` (two lines), `producttank-cityname-*` (template
  with the literal "City Name"), `producttank-wordmark-*` (392×97, wordmark + strapline).
- MTP wordmark files (pass 2, component (node)): `assets/logo/mtp-wordmark-{midnight,white}.svg`, for the co-branded title lockup "ProductTank / mind the PRODUCT" seen on the 2026 template's mission slide and for MTP-voice canvases (numbers carousel).
- Default lockup for this community: **ProductTank Belgium** (owner ruling 2026-09-15, DEC-013: derived from the official Brussels file, "Belgium" in Montserrat wght 440 outlined). "ProductTank Belgium" is the only written name; "ProductTank Brussels" is never written (a venue address may say Brussels). History: DEC-001 (Brussels lockup, Belgium in copy) and DEC-012 (always Brussels) are deprecated. No official Belgium lockup exists in MTP's repository yet; ask the regional coordinator.
- In the social templates [R, M] the lockup is rendered as live text, white, bottom-left:
  wordmark ≈ 64 px Cera Bold, strapline ≈ 28 px Cera Medium (portrait), left margin 64 px,
  bottom margin 68 px; Community Spotlight puts it top-left with the city line in Regular.

## 4. The Venn [G 5.1–5.4, (node) "Circle" component set; rung 1]

- "Our venns are constructed from a set of 6 circles": **Full, Donut, Polo, Eye, Target, Ring**
  (component variants, 225×225 each).
- Recipe: "With exception of the full circles venn, the venns should always include 1 full circle,
  one target circle and either a donut, polo, eye or ring." Positioned on the venn grid.
- Avoid: "Do not use more than one target circle, it's too busy"; "Do not use the venn to mask
  photographs or images (this is something we used to do that we are no longer doing)"; "Do not
  use only low-contrast colors together".
- Venns as backdrop: "a venn acts as a backdrop for the visual subject, creating a spotlight of
  texture and color" [G 5.4]; subject photography "can be layered on top of a venn and a
  background color to achieve our signature look" [G 6.2].
- Observed colouring in the ProductTank templates [R]: target in Zingy Cyan, full circle in
  Blurple, ring in Purple, on the Bold Cyan ground; the LinkedIn profile mark uses the same trio on
  white; the slide cover uses Zingy Cyan rings bottom-right.
- Shapes shipped (`assets/shapes/venn-*.svg`): **MTP's official Circle component variants** (Figma pass 2 via the owner's copy, component set (node)), converted to currentColor (DEC-009). The four official venn compositions ((node)) are kept as reference files in `assets/shapes/official-venns/`. The first-pass derived circles remain as `*.derived.svg`.

## 5. Markup and the text highlight [G 6.1, 6.5; rung 1]

- **Markup**: "Inspired by analog highlighters … helps us draw even more focus and attention to
  what's most important." Do: call attention to more important information; text on it is
  Midnight or Black. Don't: use this colour as the primary colour in a composition, or for
  anything other than markup gestures or CTA buttons; don't mark up more than a few words.
  Shipped strokes (pass 2, Deck Icons page (node), official): underline, underline-2, circle small, circle, plus, arrow, arrows (chevrons), exclamation. The box behind a word and the sparkle are derived masks/strokes (no official component). The 2026 slide template's "Markup" page repeats the set and says "Use sparingly to add emphasis".
- **Text highlight** (new style): "always consists of two related pieces of information" (e.g.
  `MTP LEADER MEMBER AMA` | `MARCH 17 | 5PM GMT`), Cera Pro Bold in all caps, one row, never
  stacked; pairings: Midnight + Bold Cyan on light grounds, Bold Cyan + Light Gray on
  Midnight/Black, Midnight + Light Gray on Bold Cyan; text White or Midnight for maximum contrast;
  print padding 3× the width of a capital I above/below and 5× left/right. The old headline
  highlight style is retired.
- Label pill (observed) [R]: Midnight box, white bold caps 18 px with tracking, one row
  ("COMMUNITY SPOTLIGHT"); date/time highlight on the WPD story: Bold Cyan cell + White cell.

## 6. Photography, icons, Venniverse shapes [G 6.2–6.4; rung 1]

- Subject photography: cut-outs of people/places "standing off the page", layered over a venn and
  a ground, cropped lines bleeding off the edge. Textural photography: full-bleed background
  scenes; may take the one colour wash: tritone **Midnight → Bold Cyan → Zingy Cyan** (gradient
  map). Quality: high resolution; use a venn ring as a frame for poor crops in a pinch.
- Icons: Feather/Lucide outline set, 30 px artboard, 3 px stroke with rounded caps, 22 px content
  area (4 px padding), 1 px corner radius; sizes small/standard/large 32/XL 80; embellished icons
  fill Bold Cyan at 60 %.
- Venniverse shapes: gestural, "secondary or tertiary elements", "fewer larger shapes rather than
  many smaller shapes", never as icons, new shapes need Brand Design approval. Observed [R]:
  blurple double-bump, cyan chevron/arc rows, quarter circles.

## 7. Voice and copy rules [G 1.2–1.4; rung 1]

- Personality: Authentic, Curious, Passionate, Welcoming, Connected, Moxie ("we don't take
  ourselves too seriously").
- Tone: "proper but informal. We're not afraid to make puns or jokes … we do not take an
  authoritative or definitive voice."
- Brand names always "Mind the Product" and "ProductTank". Audience: "product people" (singular
  "product person"), never capitalised; **"We never say 'PM' or 'PMs'"** unless quoting a title.
- UK spelling by default; either is fine if consistent within a piece (40 % of the audience is in
  North America).
- Dates: "always spell out the month"; UK format `10 October, 2020 at 09:00` (24 h), US
  `October 10, 2020 at 9:00am`. Belgium default: `14 October 2026, 18:30`.
- Titles, headlines, email subjects in sentence case. Oxford comma: "Yes, yes, and yes."
- Gender neutral writing. Neutral point of view for the brand; signed opinions are welcome.
- Design principles that govern copy: one message at a time, one call to action; negative space;
  patterns, break them only to grab attention; KISS.
- Hashtags observed on the community's channels are not captured; the playbook proposes
  `#ProductTank #ProductTankBelgium #mindtheproduct #productmanagement` as a starting set
  (rung 6, flagged in `references/playbook.md`).

## 8. Formats and measured template geometry [R, M; rung 1 renders, measurements ±2 px; Figma-measured values from pass 2 in the FIG paragraph]

**FIG (pass 2, node trees, exact):** portrait 1080×1350: headline text box x 60, y 83, 678×191, Cera Pro 700 95 px, line height 128, letter-spacing −1.73 px; markup union x 35, y 184, 406×107, fill #EBEF23; lockup group: "ProductTank" 700 63 px at (60, 1192), strapline 500 29 px at (64, 1265); venn frame x 170, y 315, 1101×1158 with Zingy target vectors, Blurple full, Purple ring (748×749 at 523, 519); photo 496×1936 at (618, −74). Spotlight 1200×628: lockup frame (50, 51) 294×112, wordmark 700 47.25 px with the city line in the same text box, strapline 500 21.75 px; pill (50, 214) 308×33 with caps 700 22 px, letter-spacing 1.52; name 700 90 px, line height 85, at (53, 273); role 500 32 px at (60, 477); Blurple vector 701×605 at (648, −109); photo 478×663 at (670, 64); sparkle group 147×163 at (589, 67). Story 1080×1920: lockup frame (114, 229) 432×102, wordmark 700 69.5 px, strapline 500 32 px; highlight frame (114, 377) 444×43 with caps 700 30 px, letter-spacing 1.75, cells Bold Cyan + White (black text); title 700 111.3 px, line height 125, at (114, 442); subtitle 500 47.6 px, line height 53.5, at (114, 712); underline group 582×16 at (107, 823); Blurple full 1281×1281 at (201, 1131); Purple quarters 240×240 at (−8, 903) and (−8, 1143); photo ellipse 690×690 at (195, 1056). Slide cover 1600×900: dotted arcs stroke 2 px white, dots 35 px, rings group 1386×263 at (907, 639). Numbers carousel 1000×1000: MTP wordmark frame (80, 110) 252×80; title 700 124 px, line height 119, at (80, 283); chevron pairs 226×226 from (4, 715); double bumps 328×328 from (373, −164); plus 103×106 at (858, 190); arrow 141×91 at (742, 759). Full dump: (private capture notes).

**Organiser event-promo canvas (2024 social template, 1200×675, D exports, rung 4):** Black ground; lockup top-left ≈ (50, 50) 240 wide; date|time highlight (blurple/cyan cell + white cell) under it; title 42 px bold, three lines; "Location" line Medium 28; white "Sponsor Logo" box ≈ 200×40 bottom-left; right side: Blurple/Zingy venn shapes, or one to four circular speaker photos (≈ 90 px) each with name 25 px bold, role, "@ Company". The WPD canvas is the same with the globe and a yellow underline under the subtitle.

Format table: see `formats.json` beside the lock and PLAN.md §5.

**Evergreen event canvas, portrait 1080×1350** (`mtp-producttank-social-1080x1350.png`):
- Ground Bold Cyan (46 % of pixels), Blurple full circle 13 %, Zingy target 8 %, Purple ring 3 %.
- Headline "Welcome back:" white bold, cap band y 75–146 (72 px cap height ⇒ ≈ 100 px type),
  x = 63. Markup box `#ECF023` x 35–441, y 184–291 (406×107) with Midnight "London" inside, glyph
  band y 203–275 (same ≈ 100 px size). Line pitch headline → keyword 128 px (1.28).
- Venn: target (Zingy) bbox x 170–789, y 315–893 (Ø ≈ 600, centre ≈ 480,604); full (Blurple)
  centre ≈ 600,1000 r ≈ 430 clipped bottom/right; ring (Purple) centre ≈ 880,880 r ≈ 350 clipped
  right. Subject photo (Big Ben) cut-out bleeding off the right and bottom edges.
- Lockup white bottom-left: wordmark band y 1193–1239 (47 px cap ⇒ ≈ 64 px), strapline band
  y 1262–1282 (≈ 28 px), x = 63, bottom margin 68 px.

**Square 1000×1000** (source; shipped format is 1080×1080, scale 1.08):
- Headline two lines, bands y 72–166 and 208–302 (95 px cap ⇒ ≈ 128 px), x = 71, pitch 136.
  Markup box x 55–568, y 324–459 (513×135), Midnight text band y 344–439.
- Target Ø ≈ 500 centred ≈ 750,600 (clipped right); full Blurple bottom-right; Purple ring
  bottom-right corner.
- Lockup: wordmark band y 832–882 (≈ 70 px), strapline y 906–928 (≈ 30 px), x = 71, bottom
  margin 72.

**Landscape 1200×628**:
- Headline band y 57–117 (61 ⇒ ≈ 82 px), x = 62; markup box x 33–390, y 143–237 (357×94);
  body copy two lines, bands y 267–294 and 319–346 (≈ 36 px regular, pitch 52); lockup wordmark
  band y 473–519 (≈ 64 px), strapline y 542–562 (≈ 28 px), bottom margin 66.
- Venn right of centre: target bbox x 616–909, y 110–490 (Ø ≈ 380, centre ≈ 760,300); Blurple
  full x 616–850, y 387–628; photo cut-out right edge.

**Community Spotlight 1200×628**:
- Lockup top-left: "ProductTank" band y 52–86 (≈ 48 px bold), "City Name" y 97–138 (≈ 52 px
  regular), strapline y 147–162 (≈ 22 px), x = 53. Label pill Midnight x 50–358, y 214–247
  (308×33) with white caps ≈ 18 px bold. Name two lines bands y 275–343, 369–428 (≈ 92 px bold,
  pitch 94). Role bands y 479–507, 517–537 (≈ 36 px regular). Photo cut-out right, Blurple circle
  top-right (x 648–1200, y 0–412), yellow sparkle strokes x 611–719, y 78–214.

**Story 1080×1920 (World Product Day)**: Midnight ground; lockup top-left x 116, wordmark band
y 230–281 (≈ 70 px), strapline y 306–334 (≈ 36 px); date/time highlight y 377–419 (Bold Cyan
cell + White cell, caps ≈ 28 px bold); title two lines bands y 456–539, 581–664 (≈ 114 px bold,
pitch 125); subtitle bands y 714–757, 768–811 (≈ 52 px regular); yellow underline x 108–688,
y 824–839 (15 px thick); Purple quarter circles left, Blurple bottom-right; subject photo centred.

**Slide cover 1600×900**: Bold Cyan ground; textural globe photo (tritone wash) right; white
dotted network arcs with white dots; Zingy Cyan rings bottom-right (bbox x 907–1600, y 119–900);
left half empty for the title.

**Numbers carousel 1000×1000**: Bold Cyan; MTP wordmark white top-left (x 80, bands y 110–142,
153–189); title three lines bands y 288–381, 406–500, 526–619 (≈ 128 px bold, pitch 118);
Blurple double-bump top (x 373–1000, y 0–164); Zingy chevron row bottom-left (x 4–682,
y 715–1000); yellow plus (x 742–960, y 190–280) and arrow bottom-right.

**LinkedIn cover 2256×382**: Bold Cyan; halftone globe with dotted arcs left; "ProductTank"
white bold + "a Mind the Product meetup" right of centre; concentric rings (Zingy, Blurple,
Midnight) right edge. **Profile 400×400/1000×1000**: the Zingy target + Blurple full + Purple ring
trio on white.

Margins observed: 63–72 px on the 1000–1080 canvases, 53–62 px on 1200×628, 108–116 px on the
story. The 8 px rhythm [G 1.4] governs the shipped scale.

## 9. Community facts (sourced only; slots otherwise)

| Fact | Value | Source |
|---|---|---|
| Community name in copy | ProductTank Belgium | owner ruling 2026-09-15 (DEC-013); [D] survey title and LinkedIn cover file names said Brussels |
| Lockup | ProductTank Belgium, derived from the official Brussels file (DEC-013) | [R] city logo repository, owner |
| Registration | Meetup.com event page (required by MTP) | [D co-branding] |
| Price | Free to attend, always | [W, D] |
| Format of an evening (Tallinn's template, for reference only) | 2–3 talks of 20 min, networking before and after | [D host proposal] |
| Meetup URL, LinkedIn page, WhatsApp group, organisers, venues, sponsors, dates | **not captured** | supply in the brief; the skill refuses to invent them (DEC-006) |

## 10. Retractions and open items

- 2026-09-07 evening: DEC-008 withdrawn, the derived venn/markup shapes are replaced by MTP's official components (pass 2 ran the same day through the owner's copy of the file; DEC-009). The pixel-measured geometry in §8 stands; the FIG paragraph adds the exact values (all within 4 px of the measurements). The five Google-native Drive files arrived as owner exports ((private capture notes), surveys beside them): Black #060119 joins the tokens (DEC-010) and the speaker element and event-promo canvas follow the organiser templates (DEC-011). DEC-001 approved by the owner (Brussels lockup, "ProductTank Brussels" in copy).
