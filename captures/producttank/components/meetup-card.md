# meetup-card: the Meetup event page as LinkedIn shows it (DEC-014)

**Structure.** `<main class="canvas" data-format="social-portrait" data-archetype="meetup-card">` holding
(1) `.frame-tilt > section.frame-card[data-slot="event-card"]`: the brand canvas, a Midnight card with the
lockup top-left, the two-cell highlight (date | time), the headline, the venue line, the RSVP line, two
speaker rows and a venn clipped by the card; (2) `.frame-copy`: `.frame-title[data-slot="title"]` beside
`.date-tile[data-slot="date-tile"]` (month, day, time), `.frame-location[data-slot="location"]` with the
Lucide pin, `.frame-button[data-slot="cta-button"]` reading "Attend on Meetup", and a last row with
`.frame-by[data-slot="by-line"]` ("By ProductTank Belgium") and `[data-slot="platform-logo"]`.

**Exact values.** INFERRED from a Meetup share image at 959×1197, scaled to 1080×1350: frame margin
64 px (the format's margin); card 952 wide, 600 tall, radius 24, padding 48, tilt −3°, shadow
0 24 64 Midnight at 28 %; card headline 48 px, speaker names 28 px, portraits 96 px; title 64 px
Montserrat Bold Midnight; date tile 112 px wide, day 56 px bold; location 36 px with a 40 px pin at
3 px stroke; button 96 px tall, 3 px Mid Gray border, pill radius, White; by-line 36 px bold.

**Colour slots.** Frame `light-gray`; title, location, button text and by-line `midnight`; tile and
button `surface1`; button border `mid-gray`; the card follows the social rules (Midnight ground, White
text, venn colours). No other colour: Meetup's red is Meetup's, not ours.

**Copy.** The title repeats the card headline or names the evening; the tile carries the month
abbreviated (the only place a month is abbreviated), the day and the 24 h time; the location names
the venue and city; the button reads exactly "Attend on Meetup"; the by-line reads "By ProductTank
Belgium".

**Notes.** The frame depicts Meetup's page, so it is not a brand ground (DEC-014); pt-lint checks the
lockup and the ground on the inner card with the tilt removed. The platform logo is a typed slot: the
skill never draws Meetup's mark; the organiser drops Meetup's own file in under Meetup's brand terms.
Photography: consented speaker headshots in the portraits, nothing from the reference image.
