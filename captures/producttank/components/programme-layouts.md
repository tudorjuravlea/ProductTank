# programme-layouts: eight compositions rebuilt from a sibling community skill (DEC-016)

**Structure.** Templates in `templates/social/`: `statement-portrait`, `stat-portrait`,
`milestone-portrait`, `talk-card-portrait`, `agenda-portrait`, `reminder-numbers-portrait`,
`explainer-portrait`, `badge-a6`, each with a `-black` twin on the Black ground (DEC-010; the badge twin's band is Bold Cyan). Helpers in `base.css`: `.facts.icons` (a facts row with 28 px Lucide
outlines, `data-derived-art="icon"`), `.payoff` (a 64 px semibold line under the headline in `text2`),
`.hairline` (a 2 px rule at 40 % White), `.partners[data-slot="partners"]` (hairline, an uppercase
caption "Hosted and supported by", a row of bold names or logo boxes), `.hero-number` (384 px bold,
tight), `.counter` (a row of two-digit numbers, the current one White and larger), `.card` (a White
card, radius 24, Midnight text) with `.pill.straddle` (a pill straddling the card's bottom edge),
`.ladder` (numbered rows with hairlines, a bold time column), `.twin` (two hero numbers side by side at
192 px with captions), `.blocks` (titled blocks separated by hairlines), `.badge-band` (a 384 px
Midnight band with the role in 96 px caps).

**Exact values.** INFERRED from the sibling's canvases, re-set on this system's 8 px rhythm and type
roles: portrait copy starts at y 260 to 300; facts 28 px medium with 28 px icons; headline at the
format's size or 72 to 80 px when a list follows; payoff 64 px; partners row inside the bottom margin;
hero number 384 px (twin: 192); counter 36 px with the current at 48; card padding 48 with the pill
24 px below its edge; ladder rows 16 px vertical padding; badge 1240×1748 with an 80 px margin,
name 120 px, band 384 px.

**Colour slots.** Grounds Bold Cyan (the badge too). Text White; payoff and counter `text2`; card
`surface1` with `midnight` text; band `midnight`. No light ground, no gradient, no watermark.

**Copy.** Statement: a two-word claim and a payoff. Stat and reminder numbers: typed `NN` until
counted from Meetup (DEC-006). Milestone: the count in words with the next on the markup box.
Talk card: title in sentence case, an abstract of three lines at most, the pill "The talk". Agenda:
24 h times, six rows at most. Explainer: three blocks, one line of title and two of body. Badge:
first name and last name on two lines, company or chapter, the role in the band.

**Notes.** A print badge is exported as PNG at 300 dpi (A6 = 1240×1748); bleed and crop marks are
the printer's step, not this template's. Partner names come from the brief exactly as the partner
writes them ("hosted by", "supported by", never "powered by").
