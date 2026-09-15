# Demo: 8 October evening

Three canvases composed with the producttank skill on 2026-09-07 from the shipped templates
(`linkedin-cover.html`, `slides/cover.html`), slots changed only. Second pass on the owner's request: two typed speaker slots (portrait circle, name, role, @ company) on every canvas.

| Canvas | File | Render | Facts used |
|---|---|---|---|
| LinkedIn page cover 2256×382 | `linkedin-cover-2026-10-08.html` | `docs/linkedin-cover-2026-10-08.png` (rendered in this tree) | date: Thursday 8 October (owner); two speaker slots; time and venue: "Time and venue on Meetup" |
| LinkedIn feed post 1080×1350 (`lineup` template) | `linkedin-post-2026-10-08.html` | `docs/linkedin-post-2026-10-08.png` (rendered in this tree) | date; two speaker slots; "Time and venue on Meetup" |
| Opening slide 1920×1080 (`panel` layout, "Today's speakers" pattern) | `opening-slide-2026-10-08.html` | `docs/opening-slide-2026-10-08.png` (rendered in this tree) | date pill; two speaker slots |

Gates: engine adherence-lint PASS, pt-lint PASS (2 files), `verify.mjs` on both screens
`lint=ok render=ok geometry=ok census=ok`, pixel gate `diff=FAIL(2)` = no reference (net-new,
expected). Production status: **concept-ready** (no photo, no time or venue, lockup is the
DEC-013 Belgium file since 2026-09-15). Both are registered as `demo-*` screens in the lock.
