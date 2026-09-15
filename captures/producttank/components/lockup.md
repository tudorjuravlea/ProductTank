# lockup: the ProductTank city lockup

**Structure.** One `<div class="lockup bottom|top" data-slot="lockup">` containing one
`<img src="…/assets/logo/producttank-belgium-{white|midnight}.svg" alt="ProductTank Belgium, a Mind the Product meetup">`.
The file carries wordmark + city + strapline as outlined paths, so the mark is exact regardless of
the shipped text face. DERIVED (DEC-013): wordmark and strapline are the untouched outlines of Mind the
Product's Brussels file (Figma city logo repository (node) / (node)); the word "Belgium" is
Montserrat wght 440 outlined, matched to the Brussels glyphs on cap height, baseline, left edge and
stem width. `producttank-brussels-*` stays in the folder as the official reference.

**Exact values.**
- Position: left edge on the canvas margin; bottom-left by default (the evergreen renders), top-left
  on spotlight and story canvases. MEASURED: portrait x = 63, bottom margin 68; square x = 71, bottom 72;
  landscape x = 62, bottom 66; story top-left x = 116, y = 230.
- Width: portrait/square 380 px (wordmark cap height ≈ 47 px, strapline ≈ 21 px, matching the render
  bands 1193–1239 and 1262–1282). Landscape 330 px. Story 480 px. Slides 420 px. Minimum anywhere 80 px
  (Brand Guide 2.3). INFERRED: widths chosen so the wordmark cap height matches the measured bands.
- Clear space: the height of the "P" on every side; nothing else enters that zone. Layer 3, never covered.

**Type.** None (outlined). If the brief demands another city, use `producttank-cityname-*.svg` only as a
typed placeholder and flag it: the city name must be set in Cera Pro Regular by MTP (DEC-001), or
derived the DEC-013 way until MTP supplies the file.

**Colour slots.** `white` on Bold Cyan and Midnight grounds; `midnight` on white or Light Gray surfaces.
Never another colour (Brand Guide 2.3).

**Copy.** The alt text and any adjacent caption spell the strapline exactly: `a Mind the Product meetup`.

**Notes.** The reference renders set the lockup as live Cera Pro text; the SVG is the higher-fidelity
choice for this capture (DEC-002, DEC-005). Community Spotlight adds the city line in Regular under the
wordmark: the Belgium file already includes it.
