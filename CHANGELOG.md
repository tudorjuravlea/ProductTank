# Changelog

## 0.9.0 (2026-09-15)

- A third ground beside Bold Cyan and Black: the Gradient ground (`.canvas.ground-gradient`,
  decision DEC-017), a 135 degree gradient from a bright blue through a darkened Blurple to Midnight.
  Twelve templates ship a `-gradient` twin.
- Six new layouts learned from other chapters' posts (DEC-015): `speaker-tease-square`,
  `team-member-portrait`, `carousel-cover-portrait`, `lineup-columns-portrait`, `event-promo-square`,
  `linkedin-cover-evergreen`.
- Eight new layouts (DEC-016), each with a `-black` twin: `statement-portrait`, `stat-portrait`,
  `milestone-portrait`, `talk-card-portrait`, `agenda-portrait`, `reminder-numbers-portrait`,
  `explainer-portrait` and `badge-a6` (a new A6 name badge format at 300 dpi).
- A `meetup-card` layout (DEC-014): a post that looks like the Meetup event page around the event
  card, with "Attend on Meetup" as the button; Meetup's own logo stays a typed slot.
- The address placeholder in the templates is now "Venue name, city".
- Every template with the logo on top starts its copy lower (360 px on portrait).
- The brand checker accepts the Gradient ground and measures a `meetup-card` on its inner event card.
- 64 social templates in total; component specs `chapter-layouts.md`, `programme-layouts.md`,
  `meetup-card.md`.

## 0.4.0 (2026-09-15)

- The community is now "ProductTank Belgium" (decision DEC-013 in the design lock). The logo files
  `producttank-belgium-midnight.svg` and `producttank-belgium-white.svg` are the default lockup. They
  keep the ProductTank wordmark and strapline from the official Brussels file and set the word
  "Belgium" in Montserrat, outlined. The Brussels files stay in the folder.
- The brand checker now flags "ProductTank Brussels" instead of "ProductTank Belgium".
- Templates, sample headlines, demo renders and documentation say Belgium.

## 0.3.0 (2026-09-07)

First public release, exported from the maintainer's working repository.

- Capture of Mind the Product's Brand Guide 2024 (colours, type, voice, logo rules, venn, markup)
  and of the organiser templates (Black ground, circular speakers, event promo), recorded in
  `BRAND-FACTS.md` and `design-lock.json` with 12 decisions.
- 20 social canvases and 9 slide layouts as standalone HTML; Montserrat (OFL) as the organiser face.
- A 16-rule brand linter with negative controls, a renderer (PNG, PDF, PowerPoint), a contact-sheet
  tool, an arm-reference tool for owner-approved pixel references, a 9-lane gauntlet.
- Placeholder lockups; Mind the Product's own assets are not included (see `NOTICE`).
