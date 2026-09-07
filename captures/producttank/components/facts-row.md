# facts-row: date · time · venue

**Structure.** `<ul class="facts subheading" data-slot="facts"><li>Tuesday 14 October</li><li>18:30</li><li>Venue name, Brussels</li></ul>`.
Zingy Cyan dots separate the items (INFERRED from the site's dot separators and the WPD story's
date/time highlight; the evergreen renders carry no facts row, the caption carries the facts there).

**Exact values.** `subheading` role (36/500/1.2) on portrait and landscape; `body` (28) on square; one row,
wraps to two at most. Sits directly under the headline block with a `--space-8` gap, or above it when the
brief leads with the date (the a sibling skill rule: functional facts may lead).

**Colour slots.** `text1`. Dots `zingy-cyan`.

**Copy.** Month spelled out (`14 October`, never `14/10`); 24 h time; venue as the brief gives it. If a fact
is missing the item is omitted, never invented (DEC-006).
