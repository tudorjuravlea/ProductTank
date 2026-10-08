# facts-row: date · time · venue

**Structure.** `<ul class="facts subheading" data-slot="facts"><li>Tuesday 14 October</li><li>18:30</li><li>Venue name, city</li></ul>`.
Whitespace separates the items; no dot, no bar (DEC-018, owner ruling 2026-09-16; before that,
Zingy Cyan dots inferred from the site's dot separators). The evergreen renders carry no facts row,
the caption carries the facts there.

**Exact values.** `subheading` role (36/500/1.2) on portrait and landscape; `body` (28) on square; one row,
wraps to two at most. Sits directly under the headline block with a `--space-8` gap, or above it when the
brief leads with the date (the a sibling skill rule: functional facts may lead).

**Colour slots.** `text1`. No separator colour (DEC-018).

**Copy.** Month spelled out (`14 October`, never `14/10`); 24 h time; venue as the brief gives it. If a fact
is missing the item is omitted, never invented (DEC-006). Order and lines (DEC-020): date, time, place on
the first line, with the weekday attached to the date or dropped, never next to the place pin;
"Free to attend" on a second line of the same row (`<li style="flex-basis:100%">`), never after the
place. Print canvases carry "Doors open at 18:00" as the time item.
