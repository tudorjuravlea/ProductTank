# chapter-layouts: six compositions learned from other chapters' posts (DEC-015)

**Structure.** One template each in `templates/social/`: `speaker-tease-square`, `team-member-portrait`,
`carousel-cover-portrait`, `lineup-columns-portrait`, `event-promo-square`, `linkedin-cover-evergreen`.
Helpers in `base.css`: `.bar-markup[data-markup="bar"]` (a Markup Yellow vertical bar, 8 px, beside a
name block; it is the canvas's one markup gesture), `.speaker.col` (portrait above name and role,
centred), `.portrait-circle` (a standalone circular photo slot), `.hosted-by` (caption "Hosted by" over a
white host-logo box, top-right, inside the margin), `.divider-v` (a 3 px white vertical rule).

**Exact values.** INFERRED from the references, scaled to the format: speaker tease on 1080 square:
portrait circle 360 px at the right margin, label 36 px bold with a 48×88 exclamation, name at the
format's headline size, highlight bottom-left. Team member on 1080×1350: pill at y 380, bar 8 px with 24
px gap, name two lines, cut-out 620×900 bottom-right. Carousel cover: headline at y 300, pill plus a
140×80 arrow, attribution block 64 px below, cut-out 520×640 bottom-right. Lineup columns: three
200 px portraits on a 3-column grid with 24 px gaps, names 36 px bold, roles 22 px. Event promo square:
headline 72 px in an 880 px column, one 144 px speaker row bottom-left. Evergreen cover 2256×382:
divider at x 560, copy from x 640, headline 72 px, tagline 36 px, photo slot 640 px wide at the right.

**Colour slots.** Grounds stay Bold Cyan or Black (event promo). Bar, exclamation and arrow take
`action`. Text is White; the markup word is `ink`. Host box is `surface1` with `midnight` text.

**Copy.** Speaker tease: "Meet the next speaker", name, role "@ Company", a month and "Stay tuned for
updates" (the only announcement without a day: the date is not known yet). Team member: "Meet the
team", name, role. Carousel cover: a headline, one line of context, "Swipe to see", "Recommendations
from" and the person. Lineup columns and event promo square: date | time highlight, title, subtitle,
venue, speakers, "Free to attend. RSVP on Meetup." Evergreen cover: "See you in Belgium", "Meetups for
product people, by product people".

**Notes.** What the references did that this system does not: Blurple and gradient grounds, coloured
text, stacked highlights, a lockup on the right, abbreviated months, the 2023 palette and wordmark, 3D
emoji and stock objects. Photography comes from the brief; nothing from the references is reused.
