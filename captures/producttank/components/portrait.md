# portrait: round team and speaker portraits on a brand ground

**Structure.** A square of `--size` px (1080 default) carrying one person cut out of their photo, set on a
solid brand ground, delivered twice: `<name>-round.png` (circle, transparent corners, for LinkedIn, lu.ma,
Meetup and the `team-member` and `speaker` slots) and `<name>-square.jpg` (the same frame, square, for
places that mask their own circle). Made by `tools/portrait.py` (macOS Vision cut-out and face detection,
Pillow); never pasted by hand. (DEC-023, from the organising-team set of 2026-10-08.)

**Exact values.** MEASURED on the approved set: the face box (Vision's rectangle, brow to chin) is
**0.537 of the circle's diameter** and its centre sits at **50 % of the height**; the crop side is face
height / 0.537, so hair and shoulders run past the circle instead of being clipped inside it. The crop's
bottom edge stays at least 10 px inside the photo; when a photo ends at the neck, the strip below is
filled with the garment's own colour (median of the dark pixels in the last 60 rows), blended over 40 px.
The cut-out alpha is eroded by 1 px so no background fringe survives. INFERRED: a batch is matched, every
face pulled to the median luminance (brightness gain on the subject only) and the median edge sharpness
(unsharp mask or Gaussian in 0.6 px steps, within 8 %) of the set, so four people shot on four cameras
read as one series.

**Colour slots.** Grounds rotate through Bold Cyan, Blurple, Purple, Zingy Cyan (then Midnight), one per
person, in that order unless the brief assigns them. Markup Yellow is never a ground (Brand Guide 4.2),
and the photo is never colour-washed: skin stays skin.

**Copy.** None on the asset. The name, role and "@ Company" sit beside it in the canvas slots.

**Notes.** The circle is the crop, not a mask over a full photo: nothing of the original background
survives. A full-torso source (face under 20 % of the photo height) is enlarged more than 2.5 times and
reads soft at full size; ask for a closer headshot when one is available. Photos come from the people
themselves with consent; the sources stay in the private repo and never ship with the skill or the MCP.
