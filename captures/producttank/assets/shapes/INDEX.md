# Shapes

All files use `currentColor`. This public tree ships the drawings made for this repository:

| file | family | status |
|---|---|---|
| `venn-full.svg`, `venn-donut.svg`, `venn-polo.svg`, `venn-ring.svg`, `venn-eye.svg`, `venn-target.svg` | the six venn circles | drawn to the Brand Guide's recipe (a solid circle; thick, medium and thin rings; ring + centre; three rings + dot) |
| `markup-box.svg`, `markup-underline.svg`, `markup-circle.svg`, `markup-plus.svg`, `markup-arrow.svg`, `markup-exclamation.svg`, `markup-sparkle.svg` | markup gestures | hand-drawn strokes in the guide's spirit; `markup-box` and `markup-underline` are also the CSS masks in `base.css` |
| `venniverse-double-bump.svg`, `venniverse-chevron.svg`, `venniverse-quarter.svg` | Venniverse shapes | drawn from the organiser templates' silhouettes |
| `photo-slot-subject.svg` | typed photo slot | a ghost silhouette that marks where a cut-out goes |

Mind the Product's own drawings (its Circle and Venn components, its markup set) are not included; if
you have them from Mind the Product, drop them in under the same names and run `tools/sync-shapes-css.mjs`.

Rules: one markup gesture per canvas; text on markup is Midnight or Black; at most one target circle
per venn; the venn never masks a photo; Venniverse shapes are secondary, few and large.
