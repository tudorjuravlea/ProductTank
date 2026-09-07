# Contributing

Thanks for helping other ProductTank organisers. A few house rules keep the gate honest.

1. **Run the gauntlet before and after.** `node gauntlet/gauntlet.mjs` must print `PASS (9/9 lanes)`.
   If you add a lint rule, add a fixture that breaks only that rule (`gauntlet/__lint-fixtures/`);
   the self-test refuses rules without one.
2. **Templates are generated.** Edit `captures/producttank/templates/social/_build.mjs` or
   `templates/slides/_build.mjs` and regenerate with `--register`; never edit an emitted HTML file
   by hand.
3. **Derived files are never hand-edited.** `assets/tokens.css`, `tailwind.tokens.cjs` and
   `tokens.dtcg.json` come from the lock through the engine; edit the lock and re-derive.
4. **Brand values are facts with a source.** A new value goes into `BRAND-FACTS.md` with where it
   came from, then into the lock. A changed value under the same token name is a major version.
5. **No brand assets in pull requests.** Do not commit Mind the Product's lockups, wordmark,
   photography or official drawings; the placeholders stay placeholders (see `NOTICE`).
6. **No invented facts in samples.** "Firstname Lastname", "Venue name", "Host name".
7. **Plain language in docs.** Short sentences, one action per line, no em dashes.

This repository is exported from the maintainer's working repository, where the capture sources
live. Pull requests are reviewed here, merged upstream, and re-exported; your change and your name
land in `CHANGELOG.md`.
