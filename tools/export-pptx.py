#!/usr/bin/env python3
"""export-pptx.py: a 16:9 PowerPoint from rendered slide PNGs (one full-bleed image per slide).

    uvx --with python-pptx --with pillow python tools/export-pptx.py <png-dir> <out.pptx>

The slides are IMAGES, not editable text: tell the recipient. The editable source for
co-organisers remains Mind the Product's Google Slides template (DEC-004). PNGs are taken in
name order; deck.html's order is cover, welcome, agenda, speaker, talk-title, panel, host-sponsor,
community, closing, so pass --order to override: --order cover,welcome,agenda,...
Exit codes: 0 written, 2 usage / missing input.
"""
import sys, os
from pathlib import Path

def main(argv):
    if len(argv) < 3 or argv[1] in ('-h', '--help'):
        print(__doc__); return 0 if len(argv) > 1 else 2
    src, out = Path(argv[1]), Path(argv[2])
    order = None
    if '--order' in argv: order = argv[argv.index('--order') + 1].split(',')
    if not src.is_dir(): print(f'export-pptx: no such directory {src}', file=sys.stderr); return 2
    pngs = sorted(p for p in src.glob('*.png') if not p.name.startswith('_'))
    if order: pngs = [src / f'{n}.png' for n in order if (src / f'{n}.png').exists()]
    if not pngs: print('export-pptx: no PNGs', file=sys.stderr); return 2
    from pptx import Presentation
    from pptx.util import Inches
    prs = Presentation(); prs.slide_width, prs.slide_height = Inches(13.333), Inches(7.5)
    blank = prs.slide_layouts[6]
    for p in pngs:
        s = prs.slides.add_slide(blank)
        s.shapes.add_picture(str(p), 0, 0, width=prs.slide_width, height=prs.slide_height)
    prs.save(out); print(f'{out}: {len(pngs)} slides (images, not editable text)'); return 0

if __name__ == '__main__': sys.exit(main(sys.argv))
