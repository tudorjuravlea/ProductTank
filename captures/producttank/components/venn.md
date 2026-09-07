# venn: the composition's anchor

**Structure.** `<svg class="layer-shapes" data-derived-art data-venn="target,full,ring" viewBox="0 0 W H">`
with `<circle>` elements using the fill/stroke classes from `base.css`. Recipe (Brand Guide 5.2): exactly one
`full`, one `target`, and one of `donut|polo|eye|ring`; or the all-full exception (`data-venn="full,full,full"`).
Never two targets. Never a photo mask.

**Exact values.** MEASURED on the portrait render: target Ø ≈ 600 centred (480, 604), rings at 94/66/38 % of r
with stroke 12 % and a centre dot 12 %; full circle r ≈ 430 centred (600, 1000) clipped by the canvas; ring
r ≈ 350 centred (880, 880), stroke ≈ 12 %, clipped right. Square: target Ø ≈ 500 centred (750, 600). Landscape:
target Ø ≈ 380 centred (760, 300); full bottom-right. Circles overlap by roughly a third of a radius; at
least one circle bleeds off an edge.

**Colour slots.** Target `zingy-cyan`; full `blurple`; ring/donut/polo/eye `purple` (the evergreen trio).
On Midnight grounds: `purple` quarter shapes and `blurple` full (WPD story). Slides: `zingy-cyan` rings only.

**Copy.** None.

**Notes.** The venn sits on layer 0 under the photo and the copy. Do not combine only low-contrast colours
(Brand Guide 5.4). Venniverse shapes (`assets/shapes/venniverse-*.svg`) may replace the venn on stat, quote
and cover canvases: at most two, large, secondary.
