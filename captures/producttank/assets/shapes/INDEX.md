# Shapes: the venn circle set, markup strokes, Venniverse shapes

All files use `currentColor`, so the wrapper's `color` picks the token. Templates draw circles
inline (the classes in `base.css`); these files are the spec, the MCP asset, and the CSS masks.

| file | family | status | source |
|---|---|---|---|
| `venn-full.svg` … `venn-target.svg` | the six venn circles | **official** MTP Circle component variants ((node)), currentColor | DEC-009; first-pass derived versions kept as `*.derived.svg` |
| `official-venns/*.svg` | the four official venn compositions (Complex ×3, Full) | official, colours as exported (reference only) | (node) |
| `markup-box.svg` | Markup highlighter box behind a word (CSS mask in base.css) | derived; hand-drawn wobble like the reference "London" box (406×107 at 1080 wide, FIG-confirmed) | Brand Guide 6.5, reference renders; no official component |
| `markup-underline.svg` | Markup underline | derived; reference WPD story underline 580×15 | idem |
| `markup-underline.svg`, `markup-underline-2.svg`, `markup-underlines.svg`, `markup-circle-small.svg`, `markup-circle.svg`, `markup-plus.svg`, `markup-arrow.svg`, `markup-arrows.svg`, `markup-exclamation.svg` | Markup gestures | **official** Deck Icons exports ((node) page), currentColor | DEC-009 |
| `markup-sparkle.svg` | the sparkle strokes beside a portrait | derived from the spotlight render | no official component |
| `venniverse-double-bump.svg`, `venniverse-chevron.svg`, `venniverse-quarter.svg` | Venniverse shapes | derived from the numbers carousel and WPD story renders | Brand Guide 6.4 |

Rules: one markup gesture per canvas; text on markup is Midnight or Black; at most one target
circle per venn; the venn never masks a photo; Venniverse shapes are secondary, few and large.

These drawings are Mind the Product's, included with its permission for ProductTank organisers (NOTICE).
