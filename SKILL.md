---
name: producttank
description: Pixel-precise generation locked to the ProductTank Belgium design system (a Mind the Product meetup), with a machine-verified ship gate (render, then pixel diff, then token and microcopy lint through the shared fidelity engine) for social posts and slide decks. Use ONLY when the user explicitly asks to build/reproduce screens in ProductTank Belgium, make a ProductTank social post, story, banner or deck, run its fidelity pipeline, or bootstrap its component library. NEVER trigger automatically on generic design or UI tasks. Invoke explicitly.
---

# ProductTank Belgium: design-system fidelity

You are in **fidelity mode** for one design system: **ProductTank Belgium**, the Brussels meetup of
the Mind the Product community. The brand is Mind the Product's (Brand Guide 2024, captured from
the *MTP Brand Resources 2026* Figma file and mindtheproduct.com); this skill produces the
community's **social posts** (LinkedIn, Instagram, Meetup, stories, banners) and **slide decks**.
The design system is a hard constraint, not a suggestion; variance is a defect. All machinery is
shared:

- **ENGINE** = `~/.claude/fidelity-engine/`: scripts, references, schema, runtime deps.
  **Read `ENGINE/CONTRACT.md` before anything else** (exit codes, invariants, gate ordering).
- **LOCK** = `~/.claude/skills/producttank/captures/producttank/design-lock.json`: the frozen SSOT:
  tokens, typography, fonts, spacing, radii, `signatures[]`, `donts[]`, `forbidden`, the microcopy
  layer, screens, decisions. **CAPTURE** = the directory holding it. Its prose authority is
  `CAPTURE/BRAND-FACTS.md`: if the two disagree, the prose wins and the lock is stale.
- **SKILL** = `~/.claude/skills/producttank/`: this file, `tools/`, `references/`, `evals/`, `gauntlet/`.

Every engine call: `node ENGINE/scripts/<name>.mjs --lock LOCK [--screen <id>]`. Every skill tool:
`node SKILL/tools/<name>.mjs --help` first.

## 0. Blocking gate: no lock, no generation

Lock missing or incomplete: STOP. Run the capture flow (`ENGINE/references/spec-capture.md`,
then `CAPTURE/BRAND-FACTS.md` §0 for this brand's sources), reload, resume as a blocker. Never
generate from memory of the Mind the Product brand. Never silently overwrite a lock
(`capture-figma.mjs --merge`). Setup unverified: run `ENGINE/scripts/setup-check.mjs`.

A second blocking gate is **facts**: a date, time, venue, speaker, sponsor or number that the
brief and `BRAND-FACTS.md` §9 do not supply stays a typed slot or gets asked for. It is never
invented (DEC-006).

## 1. What this skill makes, and how

**Formats** (`CAPTURE/formats.json`, DEC-004):

| id | canvas | use |
|---|---|---|
| `social-portrait` | 1080×1350 | LinkedIn / Instagram feed post (default) |
| `social-square` | 1080×1080 | Instagram, Meetup square, WhatsApp |
| `social-landscape` | 1200×628 | LinkedIn link card, Facebook, Meetup event photo |
| `story` | 1080×1920 | Instagram / LinkedIn stories, WhatsApp status |
| `event-banner` | 1600×900 | LinkedIn event / Meetup cover, deck cover |
| `linkedin-cover` | 2256×382 | LinkedIn page cover |
| `slide` | 1920×1080 | deck slides |

**Archetypes** (`CAPTURE/templates/social/<archetype>-<format>.html`): `event-announce`
(portrait, square, landscape, story; Bold Cyan, the MTP-central evergreen), `event-promo`
(landscape, portrait; Black ground, MTP's organiser template with the date|time highlight,
location, host-logo box and circular speakers, DEC-010/011), `speaker-spotlight` (portrait, landscape), `lineup`
(portrait, square), `reminder` (portrait, story), `recap-thanks` (portrait, landscape),
`call-for` (portrait, square), `stat` (square), `quote` (portrait), `event-banner-1600x900`,
`linkedin-cover`. **Slides** (`CAPTURE/templates/slides/`): `cover`, `welcome`, `agenda`,
`speaker`, `talk-title`, `panel`, `host-sponsor`, `community`, `closing`, plus `deck.html` (the
presentable shell). Which post when: `SKILL/references/playbook.md`. Deck workflow:
`SKILL/references/slides.md`. Slides follow MTP's 2026 organiser template: Black ground, lockup bottom-left at 300 px, blurple pill labels, a yellow underline under "Today's speaker(s)", circular portraits with name / role / "@ Company" (`speaker` helper in `templates/_lib.mjs`), ring shapes, white QR and sponsor-logo slots.

**Workflow: copy the nearest template, change its slots, never start from a blank page.**

1. Read the brief. List the facts it supplies and the ones it does not (§0).
2. Pick the archetype and formats from the playbook. Copy the template file to a new name
   (`<archetype>-<format>-<yyyy-mm-dd>-<slug>.html`) in the same folder or a working folder
   beside it; keep the relative links to `../../assets`, `../../fonts`.
3. Change only the typed slots (`data-slot="headline|keyword|facts|rsvp|body|label|role|talk|
   speaker-name|photo|stats|quote|attribution"`) and the photo `<img>`. Keep the structure, the
   venn declaration (`data-venn`), the lockup and the markup count. A slot with no fact stays as
   the template's typed sample or is removed together with its row.
4. Register the screen in the lock's `screens[]` (copy the template's entry, new `id` and `url`,
   `netNew: true`): never render a screen the lock does not know.
5. Run the gates (§7). Look at the PNG. Loop ≤ 4 rounds. Report (§8).

**Brief discipline** (from a sibling slides skill): re-state the subject in every canvas instruction (each
canvas is composed with no memory of the others); pick one density for the whole set (sparse /
standard) and say it each time; say what the canvas MEANS, not how to build it.

## 2. The composition rules, quoted, not paraphrased

The lock's `signatures[]` (positive, must always be true) and `donts[]` (negative, must never
happen) **are** the design system for this capture. They are reproduced verbatim below; the lock
is the authority if these ever drift (the gauntlet's `docs` lane checks they match).

**Signatures**
1. "Every canvas carries the ProductTank lockup (wordmark + city + strapline), White or Midnight, left-aligned in the top-left or bottom-left corner": `grep: data-slot="lockup"`
2. "The strapline reads exactly 'a Mind the Product meetup', never reworded, never translated": `grep: a Mind the Product meetup`
3. "The ground is Bold Cyan (social default) or Midnight (stories, closing slides); Markup Yellow and Purple are never grounds" (Black `#060119` is the third allowed ground since DEC-010: slides and event-promo canvases)
4. "Headlines are sentence case, Montserrat Bold (Cera Pro Bold when licensed), White on Bold Cyan or Midnight, at the display size of the format"
5. "The key word of an announcement sits on one yellow Markup box in Midnight text; one markup gesture per canvas": `grep: class="markup` on announce/reminder/call-for
6. "A venn (one full circle, one target, one of donut/polo/eye/ring) or one or two Venniverse shapes anchor the composition; never two targets": `grep: data-venn` on announce/spotlight/lineup/reminder
7. "Facts (date, time, venue) sit in one facts row with the month spelled out, above or beside the headline, never buried in body copy": `grep: data-slot="facts"` on announce/reminder/lineup
8. "Subject photography is a cut-out that bleeds off at least one edge and sits over the venn; textural photography is full-bleed with the tritone wash"
9. "Every canvas declares its format and archetype on the root and sets data-render-ready only after fonts have loaded": `grep: data-render-ready`

**Don'ts**
1. "Do not change the colour of the logo or lockup: Midnight or White only (Brand Guide 2.2, 2.3)"
2. "Do not add text, a drop shadow, a reflection, an outline, a rotation, a distortion or a venn to the logo, and never retype it (2.2)"
3. "Do not place the lockup centred or on the right; never smaller than 80 px wide; keep clear space equal to the height of the P (2.3)"
4. "Do not use Markup Yellow as a background field or as the primary colour of a composition; it is for markup gestures, CTAs and tags only (4.2, 6.5)"
5. "Do not set coloured text: text is White or Midnight (Black on a markup is allowed); no gradient text, no cyan text on cyan (6.1)"
6. "Do not use more than one target circle; do not mask photographs with the venn; do not combine only low-contrast colours (5.4)"
7. "Do not stack the text highlight; it is one row of two related facts in bold caps (6.1)"
8. "No UPPER CASE or Capitalised Headings: headings are sentence case; caps live only in the label pill and the text highlight (3.2)"
9. "No legacy palette: the pre-2024 cyan set (#009EE3, #192844, #92EAFF, #DDEEEE, #007EB6, #EFF6F7, #8B98A7, #FA6969) and the 2023 slide theme (#7E57FF, #FDAF53, #092232, #442A30, #EDFE37, #C4BFB2) are forbidden (DEC-003)"
10. "No 'PM' or 'PMs': the audience is product people; brand names are spelled Mind the Product and ProductTank (1.3)"
11. "No invented facts: dates, venues, speaker names, sponsor names and numbers come from the brief or BRAND-FACTS §9, or the slot stays typed (DEC-006)"
12. "No URLs baked into a canvas: the post or the Meetup page carries the link (playbook)"
13. "No em dashes, no lorem ipsum, no glassmorphism or backdrop blur, no gradients except the tritone photo wash (Midnight > Bold Cyan > Zingy Cyan)"
14. "No AI-default typefaces (Inter, Roboto, Poppins, Space Grotesk, Arial as a display face) and no script or brush lettering"
15. "Do not reuse the photography inside the Figma reference renders; it is Mind the Product's imagery, not this community's (DEC-007)"

STRICT vs FREE, in one line: colours, fonts, the lockup, the markup count, the venn recipe and the
copy rules are gated; which venn, where the photo goes, how big the type within the format's
scale, the hook and the tone are yours.

## 3. Route every region: Mode B2 today

Every screen in this capture is **Mode B2**: no Figma geometry for the generated canvases, no
`componentMap`. The Figma renders under `CAPTURE/reference/figma/` are tear-down and review
references (they were set in Cera Pro, DEC-005), never pixel-diff ground truth; a pixel reference
is armed only from a render the owner approved (`SKILL/tools/arm-reference.mjs`). Net-new screens
carry `netNew: true` and are honestly reported as "lint, render, geometry ok; no pixel reference".

Anatomy library first: before composing any region, read `CAPTURE/components/INDEX.md` and the
spec it points to (lockup, headline, facts-row, venn, markup, label-pill, text-highlight,
photo-cutout, stat) and build from its exact values; the measured numbers are in
`CAPTURE/BRAND-FACTS.md` §8. Shapes: `CAPTURE/assets/shapes/INDEX.md`. Every gap is named in the
report as a capture task, never improvised.

Imagery policy (`imagery.policy` in the lock): Tier 1 captured assets (`assets/logo`, `<img>` or
inline `<svg data-fig-name>`), Tier 2 derived compositions declared `data-derived-art="venn|shape"`,
photography only from the brief (event photos, consented headshots) with subject cut-outs over
the venn or textural full-bleed with the wash. `ENGINE/references/mode-b.md` for the method.

Surface class: every canvas here is a fixed-size poster or slide (no interaction, no responsive
behaviour); `ENGINE/references/surface-classes.md` applies only if a web surface is ever added.

## 4. `<spec_adherence>`: declare before code

Before generating any canvas, emit the block: (1) TOKENS with exact values + source rung
(`CAPTURE/assets/tokens.css` names); (2) COMPONENTS: which anatomy specs the regions bind to;
(3) MEASUREMENTS px vs the tear-down sheet for the format; (4) TEXT SLOTS (element × context ×
tone, and which facts fill them, with their source); (5) BANNED-DEVIATION SWEEP against §2. An
unfillable line means a capture gap or a missing fact: back to §0, never improvise.

## 5. Generation rules

Tokens only: colours through `var(--token)` from `assets/tokens.css` (raw hex outside `:root` fails
lint; absolute white/black is a warning, still avoid it), spacing from the 8 px rhythm
(`--space-*`), type roles from `assets/base.css` (`.headline .heading .subheading .body .body-sm
.caption .label`; the per-format headline sizes live in `base.css`, do not override them with
new numbers), fonts only via `fonts/fonts.css`. Structure: `<main class="canvas"
data-format="<format>" data-archetype="<archetype>">`, layers in order shapes (0), then photo (1), then copy (2),
then lockup (3); `data-render-ready` set after `document.fonts.ready`; `data-fig-id` where a captured
node exists. Typed flexible slots, ≥ 2 lines slack, no fixed text widths beyond the copy column.
The lockup is an `<img>` from `assets/logo/` (DEC-013: the community is always written "ProductTank Belgium", never "ProductTank Brussels"), 380 px on 1080-wide canvases, 300 on
1200×628, 480 on stories, 420 on slides; never live text. Never reproduce Figma export artifacts
(micro-skews, `data-node-id`, expiring asset URLs). Taste composes within the vocabulary
(`ENGINE/references/taste-and-composition.md`); precedence: system constraints > signatures/donts
> craft heuristics; novelty stays OFF. Slides: `ENGINE/references/slides-and-decks.md` plus
`SKILL/references/slides.md`. Slides follow MTP's 2026 organiser template: Black ground, lockup bottom-left at 300 px, blurple pill labels, a yellow underline under "Today's speaker(s)", circular portraits with name / role / "@ Company" (`speaker` helper in `templates/_lib.mjs`), ring shapes, white QR and sponsor-logo slots. Charts (rare here): `ENGINE/references/dataviz-craft.md`, chart
colours from the four brand hues only.

## 6. Microcopy pass (after layout, before gates)

No lorem, ever. Voice: `SKILL/references/voice.md` and the lock's `content.voiceChart` (Welcoming,
Curious, Moxie, Clear and specific, Connected). Rules that the lints enforce: "Mind the Product"
and "ProductTank" spelled exactly; "product people", never "PM"/"PMs"; the month spelled out in
every date, 24 h times; sentence-case headlines; announcements carry "Free to attend" and mention
Meetup (`content.disclosureInventory`); no URLs on the canvas; no em dashes; one message and one
call to action per canvas. Caption text for the post itself follows the playbook's skeleton and
is delivered beside the canvas, never baked into it. Patterns and the 4-pass edit:
`ENGINE/references/microcopy-patterns.md`, `microcopy-voice.md`. Disclosures are `⚠ Legal`,
never paraphrased or cut.

## 7. Ship gates, fixed order

Run from `CAPTURE` (the lock's directory):

1. **Content/compliance lint**: `node ENGINE/scripts/adherence-lint.mjs --lock design-lock.json --src templates`
   then the brand linter `node SKILL/tools/pt-lint.mjs --lock design-lock.json --src <file|dir>`
   (16 rules: lockup presence/colour/corner/width, one markup, ground, venn recipe, one target,
   sentence case, PM, brand names, dates, disclosures, URLs, strapline). An ERROR blocks
   regardless of looks.
2. **Taste self-critique** (yours): Philosophy-alignment / Hierarchy / Craft / Functionality, 0to10
   with cited evidence; any score of 4 or less means redo. Check every signature. Run the **brand-transplant test**:
   swap Bold Cyan, the lockup and the venn for a competitor's marks: does anything else still
   say ProductTank? If not, lean on the signatures, never on off-system invention.
3. **Render + geometry + pixel + census**: `node ENGINE/scripts/verify.mjs --lock design-lock.json --screen <id>`
   (font parity asserted before any screenshot: Montserrat missing = exit 4). For batches and
   decks: `node SKILL/tools/render-batch.mjs --lock design-lock.json --src <dir|file>` or
   `--deck templates/slides` (PNG per slide + `deck.pdf`), then
   `node SKILL/tools/contact-sheet.mjs --dir .render/<dir>` and **look at every render**. A net-new
   screen reports `diff=FAIL(2)` = no reference: that is the expected state, say so. Once the
   owner approves a render: `node SKILL/tools/arm-reference.mjs --lock design-lock.json --screen <id> --approved-by <name>`,
   after which the pixel gate and `colour-census` run for real (PASS ⇔ `globalPct ≤ passThreshold`
   AND `worstTile ≤ tileCeiling`).
4. **Gauntlet** before shipping a batch or changing the capture: `node SKILL/gauntlet/gauntlet.mjs`
   (lanes: `contract`, `engine-lint`, `lint-fixtures`, `shapes-css`, `screens-registered`,
   `portability`, `docs`, `evals-files`, `templates-render`).

Loop ≤ 4 rounds, best-so-far, revert regressions, STOP honestly on no progress. Threshold caps
are law (`ENGINE/references/pixel-diff-tuning.md`), never a looser gate.

## 8. Reporting

Per canvas: archetype and format; the facts used and their source (brief / BRAND-FACTS §9); the
`<spec_adherence>` summary; the copy delivered (canvas text + caption); taste scores with
evidence; gate results (lint errors, pt-lint errors, render size, verify line); **every gate that
did not run, with its reason**; the PNG/PDF paths. Production status: **`production-ready`**
(every fact verified, real photo in the slot, reference armed or owner-reviewed),
**`concept-ready`** naming what remains (typed photo slot, unconfirmed date, provisional lockup
decision DEC-001), or **`blocked`** naming the missing input. Templates ship as `concept-ready`
until a real brief fills them.

## 9. Evals convention

`SKILL/evals/evals.json` holds the cases `{id, prompt, expected_behavior, files}`, including the
`should-not-trigger` negative (a generic design prompt must NOT activate this skill) and one case
per hard rule; every fixture in `files` must exist (gauntlet lane `evals-files`).

## Module index (load on demand, never wholesale)

| Need | File |
|---|---|
| Which post, when, with which caption | `references/playbook.md` |
| Tone, words, dates, spelling | `references/voice.md` |
| Building and exporting a deck | `references/slides.md` |
| Every brand value with its source | `captures/producttank/BRAND-FACTS.md` |
| Component anatomy and measured geometry | `captures/producttank/components/INDEX.md` |
| Shapes (venn, markup, Venniverse) | `captures/producttank/assets/shapes/INDEX.md` |
| Reference renders and their provenance | `captures/producttank/reference/figma/REGISTRATION.md` |
| Regenerate the templates after a rule change | `captures/producttank/templates/social/_build.mjs --register`, `templates/slides/_build.mjs --register` |
| Keep base.css masks in sync with the shape files | `tools/sync-shapes-css.mjs` |
| Second Figma pass (node geometry, official shapes) | `tools/figma-pass-2.mjs` |
| Survey a PPTX/Google Slides export | `tools/pptx-survey.mjs` |
| PPTX from rendered slides | `tools/export-pptx.py` |

## Hard rules

The lock is the only authority; the prose authority is BRAND-FACTS.md. Never invent an off-lock
value, a fact, or a photo. Never retype, recolour or reposition the lockup. Never exceed a
threshold cap. References come from Figma's renderer or an owner-approved render: never your own
render armed by yourself. Disclosures are never cut. Report failures faithfully, name every gate
that did not run, and ship net-new work as concept-ready.
