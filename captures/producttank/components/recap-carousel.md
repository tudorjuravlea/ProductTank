# recap-carousel: the post-event LinkedIn carousel (quotes, speakers, the room)

**Structure.** Nine `social-portrait` canvases (1080×1350) on the **Gradient ground** (`.canvas.ground-gradient`),
exported as one PDF and posted as a LinkedIn document. Every slide carries the lockup (top-left on the cover,
bottom-left on the rest), one venn kept clear of the lockup and the copy, and a counter top-right written as
words ("2 of 9", never "02/09", which reads as a date). **No eyebrow pills above titles or quotes**; the only
pill is the cover's call to action ("Swipe for the quotes", `.pill.white`, on the main photo). One markup per
slide, on the words that carry the line, kept on one line with its closing punctuation
(`<span style="white-space:nowrap">…markup….”</span>`). (DEC-024.)

**The sequence and its layouts** (margins 72 px; content above y 1090 so the bottom lockup breathes):

| # | Slide | Layout | Photo slots (left, top, width × height) |
|---|---|---|---|
| 1 | Cover | lockup top; headline "Quick recap of our {last meetup}" (markup), then one bold line naming the talks and one plain line saying what each was about | whole room 72,760 740×518; speaker A 828,760 180×251; speaker B 828,1027 180×251 |
| 2 | Speaker A, quote | round portrait top-right (688,150, 320); quote 64 px from y 540; attribution | – |
| 3 | Speaker A on stage | wide photo on top 72,120 936×624 (3:2, the whole gesture inside); quote from y 790 | stage photo |
| 4 | Co-presenter or second voice | round portrait 72,150 (220) with the attribution beside it; quote 58 px from y 430; wide photo below 72,760 936×330 | duo on stage |
| 5 | Speaker B, quote | round portrait top-left (72,150, 320); quote 84 px from y 540 | – |
| 6 | The shortest, strongest line | quote 104 px top; two audience frames below: 72,590 600×500 and 688,590 320×500 | a question from the floor, people listening |
| 7 | Speaker B, another line | quote 72 px top; wide room photo 72,640 936×450 | speaker with the room |
| 8 | The room | headline "Two talks, a full room and {good questions}"; collage 72,470 584×620 + 672,470 336×302 + 672,788 336×302 | three different room moments |
| 9 | Thanks | headline "Thank you, {product people}"; the speakers' round portraits in a row (264 px at y 560); one body paragraph thanking speakers and host by name, then "Follow ProductTank Belgium for the next date" | – |

**Photos.** Event photos sit in rounded frames (`border-radius: var(--radius-card)`, `object-fit: cover`) at
their natural colour, **no tritone wash** on a recap carousel; the wash stays for textural photos elsewhere.
Round portraits use `border-radius: var(--radius-pill)` with an 8 px white ring at 12 %. Every frame is cut
by `tools/event-photos.py crop` at the **exact ratio of its slot**, so the page never crops a second time:
hands, raised arms and gestures stay inside the frame (`--top` when an arm reaches the top edge). Use each
photo once across the nine slides; the cover's big frame shows as much of the room as fits (prefer the
widest shot). Name frame classes `.ph` / `.pc`: `.card` is taken by base.css and adds a white border.

**Selection.** Only frames that are sharp on the subject: run `event-photos.py score`, treat anything under
the set's 25th percentile of face focus as suspect, confirm with `zoom` at 100 %, and drop motion blur or
soft faces even when the moment is good. Pick a portrait with open eyes and an engaged expression over a
sharper but awkward one; re-cut portraits from the original, never from a crop of a crop.

**Copy.** Quotes come only from the talks and their public Q&A, verbatim with light clean-up of transcription
errors, attributed "Name, Role @ Company" exactly as the speaker writes it. A transcript recorded through
the break holds private conversations: never quote them, never share the raw file. When a voice in the
transcript cannot be named with certainty, attribute to the team ("The <company> team") and ask. Speakers
approve their lines before posting. The caption follows the playbook's skeleton and carries the date.

**Gates.** pt-lint on the folder (0 errors), render-batch to PNG, look at every slide at full size (hand and
gesture crops, markup wrap, shapes behind the lockup), then the PNGs into one PDF. Real event slides live in
`events/<date>/recap-carousel/` (private, registered in the lock as event screens).
