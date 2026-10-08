# Component anatomy index (ProductTank canvases)

Look a region up here before composing it. Each spec has Structure / Exact values / Type / Colour
slots / Copy / Notes, with every line marked MEASURED (from the Figma renders, BRAND-FACTS §8) or
INFERRED (derived from the Brand Guide's rules). Selection by intent:

| You need | Spec | Notes |
|---|---|---|
| the brand mark on any canvas | `lockup.md` | mandatory on every canvas; SVG file, never retyped |
| a big statement with one highlighted word | `headline.md` | sentence case; the key word on one markup box |
| date, time, venue | `facts-row.md` | month spelled out; one row |
| the composition's anchor shape | `venn.md` | recipe: full + target + one of donut/polo/eye/ring |
| a yellow gesture | `markup.md` | one per canvas; box, underline, circle, plus, arrow, sparkle |
| a category tag ("Community spotlight", "Last call") | `label-pill.md` | Midnight box, white caps |
| two related facts in one row ("14 October | 18:30") | `text-highlight.md` | Bold Cyan + White cells |
| a person or place | `photo-cutout.md` | subject cut-out bleeding off an edge, over the venn |
| a round team or speaker portrait on a brand ground | `portrait.md` | face 0.537 of the circle, grounds rotate Bold Cyan / Blurple / Purple / Zingy Cyan, batch matched for brightness and sharpness; `tools/portrait.py` (DEC-023) |
| a number with a caption | `stat.md` | numbers carousel pattern |
| a speaker tease, a team intro, a carousel cover, three speakers in columns, a square promo with a host, an evergreen LinkedIn cover | `chapter-layouts.md` | six compositions learned from other chapters' posts (DEC-015) |
| a statement with a payoff, a hero number, a milestone counter, a talk card, an agenda ladder, twin countdown numbers, explainer blocks, a name badge | `programme-layouts.md` | eight compositions rebuilt from a sibling community skill (DEC-016) |
| a post that looks like the Meetup event page ("Attend on Meetup") | `meetup-card.md` | Light Gray frame around the Midnight event card; Meetup's logo is a typed slot (DEC-014) |

Deprecated (never generate): the old headline text-highlight (Brand Guide 6.1 OLD), the venn as a
photo mask, blue colour-washes on subject photos, the pre-2024 palette.
