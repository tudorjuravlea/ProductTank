# Slides: building and exporting a ProductTank deck

Layouts (`captures/producttank/templates/slides/`), all 1920×1080, all standalone HTML:

| Layout | Ground | Use | Slots |
|---|---|---|---|
| `cover` | Bold Cyan + textural photo right | on screen while people arrive | headline (event name + markup key word), facts, photo |
| `welcome` | Black + washed photo | the mission slide (MTP wordmark co-brand, mission statement with an underline markup) | photo, mission text |
| `agenda` | Black | the evening's times, host thanks | agenda list (time + item), host logo |
| `speaker` | Black | before each talk: "Today's speaker" with the yellow underline | label (Talk n), circular portrait, name, role, @ company, talk title |
| `talk-title` | Black | the speaker's own opener when they have none | headline with underline markup, attribution |
| `panel` | Black | "Today's speakers" for panels and multi-speaker evenings | title, three circular portraits with name / role / @ company |
| `host-sponsor` | Black | thanks | Sponsorship pill, host logo slot, sponsor logo slots ("Supported by") |
| `community` | Black | how to stay in touch, speak, host | three cards with pill, title, body and a QR slot (no URLs on the canvas) |
| `closing` | Black | the end: next date pill, "See you next time" arrow markup | date pill, headline, body (survey) |

Deck order for a standard evening: cover → welcome → agenda → speaker (1) → [speaker's own deck]
→ speaker (2) → [deck] → community → host-sponsor → closing. The organisers merge speaker decks
into one master deck (checklist); this skill produces the ProductTank frames around them.

Density: choose once for the whole deck (`sparse` for the room, `standard` for a shared PDF) and
repeat it in every slide instruction. Re-state the event in every instruction: each slide is
composed with no memory of the others.

Workflow:
1. Copy the layouts you need into a deck folder (keep `../../assets` links working, or copy the
   folder beside `templates/slides/`), fill the slots from the brief, register each as a screen.
2. `node ~/.claude/fidelity-engine/scripts/adherence-lint.mjs --lock design-lock.json --src <deck-dir>`
   and `node tools/pt-lint.mjs --lock design-lock.json --src <deck-dir>`.
3. `node tools/render-batch.mjs --lock design-lock.json --deck <deck-dir> --out .render/<deck>`
   → one PNG per slide and `deck.pdf`; `node tools/contact-sheet.mjs --dir .render/<deck>` and
   look at every slide.
4. Present: open `deck.html` (it lists the layouts in order; edit its `slides` array for a custom
   deck), press F for fullscreen, arrows to navigate. Share the PDF.
5. PowerPoint / Google Slides: `uvx --with python-pptx --with pillow python tools/export-pptx.py .render/<deck> deck.pptx`
   makes a 16:9 file with one full-bleed image per slide. Tell the recipient the slides are
   images, not editable text; the editable source for co-organisers remains MTP's Google Slides
   template (DEC-004).

Craft: `ENGINE/references/slides-and-decks.md` (page anatomy, dark slides, the 2×2). The master
deck's content structure (agenda with times, one slide per speaker with name, role, company and
talk title, panel with moderator, team slide, thank-you) was captured from the Drive master deck.
