# ProductTank

Make social posts and slide decks for a ProductTank meetup. The posts and decks follow the
Mind the Product brand. A machine checks each one before you use it.

ProductTank meetups are free events for product people. Mind the Product runs the ProductTank
network. This tool was made for ProductTank Belgium. Any ProductTank can use it.

![Example: a LinkedIn post made with this tool](docs/demo-linkedin-post-2026-10-08.png)

## What you get

- 20 templates for social posts: LinkedIn, Instagram, Meetup, stories, covers and banners.
- 9 templates for slides, and a deck viewer for the screen in the room.
- The brand rules as data: colours, type, spacing, the logo rules, the words to use.
- A checker with 16 brand rules. Each rule has a test that proves the rule can fail.
- A renderer. It makes PNG, PDF and PowerPoint files.
- The ProductTank Belgium and ProductTank Brussels logo files and the Mind the Product shapes.
  Mind the Product gave permission to include them.

You do not need to know code. You give the facts of the event. The tool makes the canvas. A canvas
is one picture at the size a channel needs, for example a LinkedIn post or a slide. If you do not
give a fact, the tool leaves an empty slot. It does not invent a date, a place or a name.

## How it works

1. You give the facts of the event to an AI agent. Claude Code is the agent we use.
2. The agent copies the template that fits. It changes only the text slots.
3. The checker reads the result. It stops if a brand rule is broken.
4. The renderer makes the picture. You look at the picture. You approve it.

The agent reads its instructions from `SKILL.md`. The checks run on your computer. Nothing is sent
to a server.

## Before you start

You need:

- A Mac or a Linux computer.
- Node 20 or newer. To check, open a terminal and type `node --version`.
- Git.
- Claude Code, or another AI agent that can read a `SKILL.md` file.
- For a city that is not Belgium: your city's ProductTank logo files. Ask your regional
  coordinator at Mind the Product.

## Install

Do the steps in this order. Each step has one command. Copy the command into your terminal and
press Enter.

1. Install the engine. The engine is a separate open source tool. It does the checks and the
   rendering.
   ```bash
   git clone https://github.com/tudorjuravlea/fidelity-machine ~/fidelity-machine && cd ~/fidelity-machine && npm install && npx playwright install chromium
   ```
2. Tell the skill where the engine is. If the folder `~/.claude/fidelity-engine` already exists, do
   not do this step.
   ```bash
   mkdir -p ~/.claude/skills && ln -s ~/fidelity-machine ~/.claude/fidelity-engine
   ```
3. Get this repository. Tell Claude Code that it is a skill.
   ```bash
   git clone https://github.com/tudorjuravlea/ProductTank ~/ProductTank && ln -s ~/ProductTank ~/.claude/skills/producttank
   ```
4. Check the engine. The last line must say `READY`.
   ```bash
   node ~/.claude/fidelity-engine/scripts/setup-check.mjs
   ```
5. Check the skill. The last line must say `gauntlet: PASS (9/9 lanes)`.
   ```bash
   cd ~/ProductTank && node gauntlet/gauntlet.mjs
   ```

If a check fails, read the line that starts with `FAIL`. It tells you what is missing and what
to do.

## Make your first post

With Claude Code:

1. Open a new Claude Code session.
2. Type `/producttank`.
3. Write the facts of the event: the date, the time, the place, the speakers, and what you need.
   Example: "A LinkedIn post for our meetup on Thursday 8 October at 18:30, two speakers."
4. Look at the picture the agent shows you. Ask for changes if you want them.

Without an agent:

1. Copy the file `captures/producttank/templates/social/event-announce-portrait.html`. Give the
   copy a new name in the same folder.
2. Open the copy in a text editor. Change only the text inside the elements that have a
   `data-slot` attribute. Change the photo `<img>` if you have a photo. Do not change other parts.
3. Run the checker:
   ```bash
   node tools/pt-lint.mjs --lock captures/producttank/design-lock.json --src <your-file>
   ```
4. Make the picture:
   ```bash
   node tools/render-batch.mjs --lock captures/producttank/design-lock.json --src <your-file> --out out
   ```
5. Open the PNG file in the `out` folder. Look at it. If it is not correct, change the copy and do
   steps 3 and 4 again.

## Use your city's logo

The Belgium logo is included. For a different city:

1. Get the files `ProductTank-logo-<City>-midnight.svg` and `ProductTank-logo-<City>-white.svg`
   from Mind the Product.
2. Copy the two files into `captures/producttank/assets/logo/`. Rename them to
   `producttank-<city>-midnight.svg` and `producttank-<city>-white.svg`. Use lower case letters
   and no spaces.
3. Open `captures/producttank/lockup.json`. Set `"file"` to `"producttank-<city>"`.
4. Make the templates again:
   ```bash
   cd captures/producttank && node templates/social/_build.mjs --register && node templates/slides/_build.mjs --register
   ```
5. Some sample headlines say "Belgium". Change that word in the templates you use.

Note: the logo must be white or midnight. It must be on the left side, at the top or at the bottom.
Do not change its colour. Do not rotate it. Do not type it again in a font.

## Commands

Run these commands in the folder `captures/producttank/`, unless the table says a different
folder.

| Task | Command |
|---|---|
| Check the design lock | `node ~/.claude/fidelity-engine/scripts/contract-guard.mjs --lock design-lock.json` |
| Run the engine checks on the templates | `node ~/.claude/fidelity-engine/scripts/adherence-lint.mjs --lock design-lock.json --src templates` |
| Run the brand checker | `node ../../tools/pt-lint.mjs --lock design-lock.json --src templates` |
| Prove that the brand checker can fail | `node ../../tools/pt-lint.mjs --self-test` |
| Run all engine checks on one canvas | `node ~/.claude/fidelity-engine/scripts/verify.mjs --lock design-lock.json --screen event-announce-portrait` |
| Make pictures of all social templates | `node ../../tools/render-batch.mjs --lock design-lock.json --src templates/social --out .render/social` |
| Make pictures of the deck and a PDF | `node ../../tools/render-batch.mjs --lock design-lock.json --deck templates/slides --out .render/slides` |
| Show all pictures on one sheet | `node ../../tools/contact-sheet.mjs --dir .render/social` |
| Make a PowerPoint file from the pictures | `uvx --with python-pptx --with pillow python ../../tools/export-pptx.py .render/slides deck.pptx` |
| Save an approved picture as the reference for pixel checks | `node ../../tools/arm-reference.mjs --lock design-lock.json --screen <id> --approved-by "<name>"` |
| Make the templates again after a rule change | `node templates/social/_build.mjs --register && node templates/slides/_build.mjs --register` |
| Update the CSS masks after a shape change | `node ../../tools/sync-shapes-css.mjs` |
| Read the layouts of a PowerPoint file | `node ../../tools/pptx-survey.mjs <file.pptx>` |
| Get the brand data from Figma again | `node ../../tools/figma-pass-2.mjs --key <fileKey> --out <dir>` |
| Run all checks of the skill (in the top folder) | `node gauntlet/gauntlet.mjs` |

Exit codes: 0 is pass. 1 is a finding. 2 is a setup or usage error. 4 is a missing font. 5 is a
render failure.

## What the checks do

- The engine checks: colours come from the tokens only, spacing is on the 8 px grid, no filler
  text, no em dashes, enough contrast, no forbidden fonts, the brand signatures are present, the
  required sentences are on announcements.
- The brand checker has 16 rules. The main ones:
  - The logo is present. It is white or midnight. It is on the left. It is at least 80 px wide.
  - There is one yellow markup per canvas, not more.
  - The ground is Bold Cyan, Midnight or Black.
  - The venn follows the recipe: one full circle, one target, and one other circle.
  - Headlines are in sentence case.
  - The text says "product people", not "PM".
  - The brand names are spelled correctly.
  - Months are written as words, not as numbers.
  - Announcements say "Free to attend" and name Meetup.
  - There is no web address on the canvas.
  - The strapline "a Mind the Product meetup" is exact.
- The renderer: it uses one fixed version of Chromium. It stops if the font is not loaded. After
  you approve a picture, the engine can compare new pictures to it, pixel by pixel.

## The brand in short

- Bold Cyan `#126CFF` is the ground of social posts. Black `#060119` is the ground of slides.
  Midnight `#17044A` is the ground of stories.
- Zingy Cyan, Purple and Blurple are the support colours. Markup Yellow is for one highlighter
  stroke only.
- Headlines are Montserrat Bold, in sentence case. Mind the Product uses Cera Pro. That font has a
  licence for their team only. Their Brand Guide names Montserrat as the font for organisers.
- The logo is always on the left, at the top or at the bottom.
- Facts come from you. The tool does not invent them.

The full record, with the source of each value: `captures/producttank/BRAND-FACTS.md`.

## Files and folders

```
SKILL.md                      the instructions for the agent
references/                   which post to make and when; how the brand sounds; how to make a deck
captures/producttank/         the brand data: BRAND-FACTS.md, design-lock.json, formats.json,
                              lockup.json, assets/ (tokens, base.css, logo, shapes), fonts/,
                              components/ (how each part is built), templates/social, templates/slides
tools/                        the checker, the renderer, the contact sheet and the other tools
gauntlet/                     all checks of the skill, and one broken test file for each brand rule
evals/evals.json              test cases for the agent
demos/2026-10-08/             three finished canvases with empty speaker slots
```

## Licence and trademarks

The code, the templates and the documents are under the Apache-2.0 licence (`LICENSE`).

ProductTank and Mind the Product are trademarks of Mind the Product. The logo files, the wordmark
and the brand shapes are property of Mind the Product. Mind the Product gave permission to include
them for ProductTank organisers. Use them only for ProductTank communication. They are not under
the Apache licence.

Montserrat is under the SIL Open Font License. See `NOTICE` for the details.

## Help and contributions

- To report a problem, open an issue on GitHub.
- To propose a change, read `CONTRIBUTING.md`. All checks must pass. A new rule needs a test file.
- To report a security problem, use the Security tab on GitHub. Do not open a public issue.
