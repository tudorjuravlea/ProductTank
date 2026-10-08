#!/usr/bin/env python3
"""portrait.py: ProductTank team and speaker portraits (components/portrait.md, DEC-023).

  python3 tools/portrait.py --src <dir|photo...> --out <dir> [--size 1080] [--scale 0.537]
                            [--grounds bold-cyan,blurple,purple,zingy-cyan] [--no-match] [--blur name=1.6 ...]

For every photo: the person is cut out (macOS Vision, no network), the face box is detected, the crop
is a square whose side = face height / --scale (face centre at mid height, hair bleeding past the
circle), the cut-out sits on the next brand ground, and the batch is matched: every face is pulled
to the median luminance and the median edge sharpness of the set. Writes <name>-round.png (circle,
transparent corners) and <name>-square.jpg, both --size px, plus a contact sheet.
Needs: macOS with Xcode's swiftc (first run compiles tools/portrait/cutface), Pillow, numpy.
Grounds never include Markup Yellow (Brand Guide 4.2).
"""
import argparse, os, subprocess, sys, statistics
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageOps
import numpy as np

HERE = Path(__file__).resolve().parent
GROUNDS = {'bold-cyan': (0x12, 0x6C, 0xFF), 'blurple': (0x45, 0x46, 0xE0), 'purple': (0x8B, 0x4B, 0xEF), 'zingy-cyan': (0x21, 0xCC, 0xFA), 'midnight': (0x17, 0x04, 0x4A)}

def cutface():
    exe = HERE / 'portrait' / 'cutface'
    if not exe.exists():
        subprocess.run(['swiftc', '-O', str(HERE / 'portrait' / 'cutface.swift'), '-o', str(exe)], check=True)
    return exe

def cut(photo, out_png):
    r = subprocess.run([str(cutface()), str(photo), str(out_png)], capture_output=True, text=True, check=True)
    parts = r.stdout.split()
    if len(parts) < 5: sys.exit(f'portrait: no face found in {photo.name}')
    return tuple(int(v) for v in parts[1:5])

def frame(im, face, scale, size, fcy=0.5):
    fx, fy, fw, fh = face
    im.putalpha(im.getchannel('A').filter(ImageFilter.MinFilter(3)))  # erode 1 px: no background fringe
    side = int(fh / scale); cx = fx + fw // 2; cy = fy + fh // 2; x0 = cx - side // 2; y0 = int(cy - side * fcy)
    if y0 + side > im.height - 10:  # keep the crop bottom inside the photo so no hard edge shows
        y0 = im.height - side - 10
        if y0 < 0:  # photo ends at the neck: fill below with the garment's colour
            pad = -y0 + side; big = Image.new('RGBA', (im.width, im.height + pad), (0, 0, 0, 0)); big.paste(im, (0, 0))
            band = im.crop((0, im.height - 60, im.width, im.height)); px = [p for p in band.getdata() if p[3] > 200 and (p[0] * .3 + p[1] * .59 + p[2] * .11) < 90]
            col = tuple(int(statistics.median(c[i] for c in px)) for i in range(3)) if px else (30, 30, 40)
            ext = Image.new('RGBA', (im.width, pad), col + (255,)); ext.putalpha(im.crop((0, im.height - 1, im.width, im.height)).getchannel('A').filter(ImageFilter.GaussianBlur(2)).resize((im.width, pad)))
            big.paste(ext, (0, im.height), ext); im = big; y0 = int(cy - side * fcy)
    crop = im.crop((x0, y0, x0 + side, y0 + side)).resize((size, size), Image.LANCZOS)
    k = size / side; fb = (int((fx - x0) * k), int((fy - y0) * k), int((fx + fw - x0) * k), int((fy + fh - y0) * k))
    return crop, fb

def metrics(crop, fb):
    g = np.asarray(ImageOps.grayscale(crop.crop(fb)), dtype=float); a = np.asarray(crop.crop(fb).getchannel('A')) > 128
    lap = np.abs(4 * g[1:-1, 1:-1] - g[:-2, 1:-1] - g[2:, 1:-1] - g[1:-1, :-2] - g[1:-1, 2:])
    return g[a].mean(), lap[a[1:-1, 1:-1]].mean()

def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--src', nargs='+', required=True); ap.add_argument('--out', required=True)
    ap.add_argument('--size', type=int, default=1080); ap.add_argument('--scale', type=float, default=0.537, help='face height as a fraction of the circle')
    ap.add_argument('--grounds', default='bold-cyan,blurple,purple,zingy-cyan'); ap.add_argument('--no-match', action='store_true'); ap.add_argument('--blur', nargs='*', default=[], help='name=radius extra softening per person')
    a = ap.parse_args(); out = Path(a.out); out.mkdir(parents=True, exist_ok=True); tmp = out / '.cutouts'; tmp.mkdir(exist_ok=True)
    files = []
    for s in a.src:
        p = Path(s); files += sorted(x for x in p.iterdir() if x.suffix.lower() in ('.jpg', '.jpeg', '.png') and '-round' not in x.stem and '-square' not in x.stem) if p.is_dir() else [p]
    grounds = a.grounds.split(','); blur = dict((kv.split('=')[0].lower(), float(kv.split('=')[1])) for kv in a.blur)
    size = a.size; mask = Image.new('L', (size * 4, size * 4), 0); ImageDraw.Draw(mask).ellipse((0, 0, size * 4 - 1, size * 4 - 1), fill=255); mask = mask.resize((size, size), Image.LANCZOS)
    crops = {}
    for i, f in enumerate(files):
        name = f.stem.lower(); cutout = tmp / f'{name}.png'; face = cut(f, cutout)
        crop, fb = frame(Image.open(cutout).convert('RGBA'), face, a.scale, size)
        if name in blur: al = crop.getchannel('A'); crop = crop.filter(ImageFilter.GaussianBlur(blur[name])); crop.putalpha(al)
        crops[name] = (crop, fb, GROUNDS[grounds[i % len(grounds)]], grounds[i % len(grounds)])
    if not a.no_match and len(crops) > 1:
        m = {n: metrics(c, fb) for n, (c, fb, _, _) in crops.items()}
        tl = statistics.median(v[0] for v in m.values()); ts = statistics.median(v[1] for v in m.values())
        for n, (crop, fb, rgb, g) in crops.items():
            al = crop.getchannel('A'); c = ImageEnhance.Brightness(crop.convert('RGB')).enhance(tl / m[n][0])
            for _ in range(6):
                c2 = c.copy(); c2.putalpha(al); _, cur = metrics(c2, fb)
                if abs(cur - ts) / ts < 0.08: break
                c = c.filter(ImageFilter.UnsharpMask(radius=2, percent=60, threshold=0)) if cur < ts else c.filter(ImageFilter.GaussianBlur(0.6))
            c.putalpha(al); crops[n] = (c, fb, rgb, g)
    sheet = Image.new('RGB', (30 + 415 * len(crops), 460), (255, 255, 255))
    for i, (n, (crop, fb, rgb, g)) in enumerate(crops.items()):
        sq = Image.alpha_composite(Image.new('RGBA', (size, size), rgb + (255,)), crop); rnd = sq.copy(); rnd.putalpha(mask)
        sq.convert('RGB').save(out / f'{n}-square.jpg', quality=92); rnd.save(out / f'{n}-round.png')
        th = rnd.resize((400, 400)); sheet.paste(th, (30 + i * 415, 30), th); print(f'{n}: {g}, face {fb[3]-fb[1]} px of {size}')
    sheet.save(out / '_sheet.jpg'); print(f'{len(crops)} portraits in {out}')

if __name__ == '__main__': main()
