#!/usr/bin/env python3
"""event-photos.py: select, edit and frame event photos for ProductTank recap posts (components/recap-carousel.md, DEC-024).

  python3 tools/event-photos.py score --src <photo dir> --out <work dir>
      face boxes (macOS Vision), focus per face (Laplacian variance on a 200 px face crop), motion
      anisotropy, frame sharpness and exposure; writes score.json and labelled contact sheets.
  python3 tools/event-photos.py zoom --src <photo dir> --ids 2652,2659 --out <sheet.jpg> [--face 0]
      true 100% crops of a face (or the centre) per frame, for the by-eye focus check.
  python3 tools/event-photos.py edit --src <photo dir> --spec <spec.json> --out <selection dir>
      spec: [{"id": 2638, "cx": .46, "cy": .52, "w": .92, "aspect": "3:2", "rot": 0, "caption": "..."}]
      reframe (centre, width fraction, ratio), tone, sharpen, strip metadata; writes NN_IMG_<id>_edit.jpg,
      selection.json and _contact-sheet.jpg. Originals are never touched.
  python3 tools/event-photos.py crop --src <photo> --out <file.jpg> --ratio 6:5 [--width 1200]
      [--face 0 --k 2.7 --fy .40] | [--box x0,y0,w] (fractions of the original) | [--top]
      one frame at the exact ratio of its slot on the canvas, so the page never crops again.
Rules (DEC-024): no motion blur, nothing out of focus on the subject: rank with `score`, confirm with
`zoom` at 100%, drop what fails. Hands and gestures stay inside the frame. Needs macOS (swiftc), Pillow, numpy.
"""
import argparse, json, os, subprocess, sys, statistics
from pathlib import Path
from PIL import Image, ImageOps, ImageFilter, ImageEnhance, ImageDraw, ImageFont
import numpy as np

HERE = Path(__file__).resolve().parent
FONT = '/System/Library/Fonts/Supplemental/Arial.ttf'

def faces_bin():
    exe = HERE / 'portrait' / 'faces'
    if not exe.exists(): subprocess.run(['swiftc', '-O', str(HERE / 'portrait' / 'faces.swift'), '-o', str(exe)], check=True)
    return exe

def detect(paths):
    out = {}
    r = subprocess.run([str(faces_bin()), *map(str, paths)], capture_output=True, text=True, check=True)
    for line in r.stdout.strip().splitlines():
        parts = line.split(' | '); head = parts[0].split()
        out[head[0]] = [tuple(map(int, p.split())) for p in parts[1:]]
    return out

def font(n): 
    try: return ImageFont.truetype(FONT, n)
    except OSError: return ImageFont.load_default()

def load(p): return ImageOps.exif_transpose(Image.open(p)).convert('RGB')

def tone(im):
    """Natural event-photo grade: mild white balance, exposure to a 0.38 median, toe lift, highlight
    roll-off above 0.70, gentle midtone contrast, light clarity, +2% colour. Tuned on a real event set."""
    a = np.asarray(im, dtype=np.float32) / 255.
    m = a.reshape(-1, 3).mean(0); gain = 1 + (np.clip(m.mean() / m, 0.9, 1.1) - 1) * 0.3; a = np.clip(a * gain, 0, 1)
    L = 0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]
    g = np.clip(np.log(0.38) / np.log(max(float(np.median(L)), 1e-3)), 0.82, 1.2); L2 = L ** g
    L2 = L2 + 0.04 * (1 - L2) * np.exp(-((L2 - 0.12) / 0.12) ** 2)
    L2 = np.where(L2 > 0.70, 0.70 + (L2 - 0.70) * 0.62, L2)
    L2 = np.clip(L2 + 0.03 * np.sin((L2 - 0.5) * np.pi) * (L2 * (1 - L2)) * 4, 0, 1)
    a = np.clip(a * np.where(L > 1e-4, L2 / np.maximum(L, 1e-4), 1)[..., None], 0, 1)
    out = Image.fromarray((a * 255).astype(np.uint8)).filter(ImageFilter.UnsharpMask(radius=40, percent=9, threshold=0))
    return ImageEnhance.Color(out).enhance(1.02)

def finish(im): return tone(im).filter(ImageFilter.UnsharpMask(radius=1.4, percent=55, threshold=3))

def focus(gray_crop):
    g = np.asarray(gray_crop.resize((200, 200), Image.LANCZOS), dtype=float)
    lap = 4 * g[1:-1, 1:-1] - g[:-2, 1:-1] - g[2:, 1:-1] - g[1:-1, :-2] - g[1:-1, 2:]
    gx = np.diff(g, axis=1)[:-1, :]; gy = np.diff(g, axis=0)[:, :-1]; ex, ey = (gx ** 2).mean(), (gy ** 2).mean()
    return float(lap.var()), float(abs(ex - ey) / (ex + ey))

def photos(src): return sorted(p for p in Path(src).iterdir() if p.suffix.lower() in ('.jpg', '.jpeg', '.png') and not p.name.startswith(('_', '.')))

def cmd_score(a):
    out = Path(a.out); out.mkdir(parents=True, exist_ok=True); files = photos(a.src); fb = detect(files); res = []
    for p in files:
        im = load(p); gray = im.convert('L'); sm = gray.copy(); sm.thumbnail((800, 800)); g = np.asarray(sm, dtype=float)
        lap = np.abs(4 * g[1:-1, 1:-1] - g[:-2, 1:-1] - g[2:, 1:-1] - g[1:-1, :-2] - g[1:-1, 2:])
        fs = []
        for (x, y, w, h) in fb.get(p.name, []):
            if h < 60: continue
            f, an = focus(gray.crop((x, y, x + w, y + h))); fs.append(dict(box=[x, y, w, h], focus=round(f, 1), aniso=round(an, 2)))
        fs.sort(key=lambda d: -d['box'][3])
        res.append(dict(file=p.name, w=im.width, h=im.height, sharp=round(float(np.percentile(lap, 99)), 1), mean=round(float(g.mean())), faces=fs))
    json.dump(res, open(out / 'score.json', 'w'), indent=1)
    allf = [d['focus'] for r in res for d in r['faces']]
    if allf: print(f'face focus over {len(allf)} faces: p25 {np.percentile(allf,25):.0f} median {np.median(allf):.0f} p75 {np.percentile(allf,75):.0f}; below p25 is suspect, confirm with zoom')
    F = font(18)
    for k in range(0, len(res), 24):
        sh = Image.new('RGB', (6 * 330, 4 * 290), (255, 255, 255)); dr = ImageDraw.Draw(sh)
        for i, r in enumerate(res[k:k + 24]):
            im = load(Path(a.src) / r['file']); im.thumbnail((320, 240)); x = (i % 6) * 330 + 5; y = (i // 6) * 290 + 5
            sh.paste(im, (x + (320 - im.width) // 2, y)); top = r['faces'][0]['focus'] if r['faces'] else '-'
            dr.text((x, y + 245), f"{Path(r['file']).stem}  frame {r['sharp']:.0f}  face {top}", fill=(0, 0, 0), font=F)
        sh.save(out / f'sheet-{k // 24 + 1}.jpg', quality=80)
    print(f'{len(res)} photos scored → {out}/score.json and contact sheets')

def cmd_zoom(a):
    ids = [s.strip() for s in a.ids.split(',')]; T = 460; F = font(22); files = {p.stem.split('_')[-1]: p for p in photos(a.src)}
    paths = [files[i] for i in ids]; fb = detect(paths)
    sh = Image.new('RGB', (5 * T, ((len(ids) + 4) // 5) * (T + 30)), (255, 255, 255)); dr = ImageDraw.Draw(sh)
    for i, p in enumerate(paths):
        im = load(p); fs = sorted(fb.get(p.name, []), key=lambda b: -b[3])
        if fs and a.face < len(fs): x, y, w, h = fs[a.face]; cx, cy = x + w // 2, y + h // 2
        else: cx, cy = im.width // 2, im.height // 2
        x0 = (i % 5) * T; y0 = (i // 5) * (T + 30); sh.paste(im.crop((cx - T // 2, cy - T // 2, cx + T // 2, cy + T // 2)), (x0, y0))
        dr.text((x0 + 6, y0 + T + 3), f'{p.stem} 100%', fill=(0, 0, 0), font=F)
    sh.save(a.out, quality=88); print('zoom sheet →', a.out)

def ratio(s): w, h = s.split(':'); return float(w), float(h)

def cmd_edit(a):
    spec = json.load(open(a.spec)); out = Path(a.out); out.mkdir(parents=True, exist_ok=True); files = {p.stem.split('_')[-1]: p for p in photos(a.src)}; sel = []
    for i, s in enumerate(spec, 1):
        p = files[str(s['id'])]; im = load(p)
        if s.get('rot'): im = im.rotate(s['rot'], resample=Image.BICUBIC)
        aw, ah = ratio(s.get('aspect', '3:2')); W, H = im.size; w = W * s.get('w', 1.0); h = w * ah / aw
        if h > H: h = H; w = h * aw / ah
        x0 = min(max(s.get('cx', .5) * W - w / 2, 0), W - w); y0 = min(max(s.get('cy', .5) * H - h / 2, 0), H - h)
        name = f'{i:02d}_IMG_{s["id"]}_edit.jpg'; finish(im.crop((int(x0), int(y0), int(x0 + w), int(y0 + h)))).save(out / name, quality=92, subsampling=0)
        sel.append(dict(n=i, file=name, source=p.name, caption=s.get('caption', ''))); print(name, s.get('caption', ''))
    json.dump(sel, open(out / 'selection.json', 'w'), indent=1)
    F = font(20); cols = 4; cw, ch = 480, 340; sh = Image.new('RGB', (cols * cw, ((len(sel) + cols - 1) // cols) * ch), (255, 255, 255)); dr = ImageDraw.Draw(sh)
    for i, s in enumerate(sel):
        im = Image.open(out / s['file']); im.thumbnail((cw - 10, ch - 40)); x = (i % cols) * cw + 5; y = (i // cols) * ch + 5
        sh.paste(im, (x + (cw - 10 - im.width) // 2, y)); dr.text((x, y + ch - 32), f"{s['n']:02d}  {s['caption'][:40]}", fill=(0, 0, 0), font=F)
    sh.save(out / '_contact-sheet.jpg', quality=88); print(f'{len(sel)} edits → {out}')

def cmd_crop(a):
    im = load(a.src); aw, ah = ratio(a.ratio); asp = aw / ah
    if a.box:
        x0, y0, wf = map(float, a.box.split(',')); W = im.width * wf; H = W / asp; X, Y = im.width * x0, im.height * y0
    elif a.face is not None:
        fs = sorted(detect([Path(a.src)]).get(Path(a.src).name, []), key=lambda b: -b[3]); x, y, w, h = fs[a.face]
        H = h * a.k; W = H * asp; X = x + w / 2 - W / 2; Y = y + h / 2 - H * a.fy
    else:
        W, H = (im.width, im.width / asp) if im.width / im.height < asp else (im.height * asp, im.height); X = (im.width - W) / 2; Y = 0 if a.top else (im.height - H) / 2
    W, H = min(W, im.width), min(H, im.height); X = max(0, min(im.width - W, X)); Y = max(0, min(im.height - H, Y))
    c = finish(im.crop((int(X), int(Y), int(X + W), int(Y + H)))); w = a.width; c.resize((w, round(w / asp)), Image.LANCZOS).save(a.out, quality=90)
    print(f'{a.out} {w}x{round(w / asp)} from {int(W)}x{int(H)} at {int(X)},{int(Y)}')

ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter); sp = ap.add_subparsers(dest='cmd', required=True)
s = sp.add_parser('score'); s.add_argument('--src', required=True); s.add_argument('--out', required=True); s.set_defaults(fn=cmd_score)
s = sp.add_parser('zoom'); s.add_argument('--src', required=True); s.add_argument('--ids', required=True); s.add_argument('--out', required=True); s.add_argument('--face', type=int, default=0); s.set_defaults(fn=cmd_zoom)
s = sp.add_parser('edit'); s.add_argument('--src', required=True); s.add_argument('--spec', required=True); s.add_argument('--out', required=True); s.set_defaults(fn=cmd_edit)
s = sp.add_parser('crop'); s.add_argument('--src', required=True); s.add_argument('--out', required=True); s.add_argument('--ratio', required=True); s.add_argument('--width', type=int, default=1200)
s.add_argument('--face', type=int); s.add_argument('--k', type=float, default=2.7); s.add_argument('--fy', type=float, default=0.40); s.add_argument('--box'); s.add_argument('--top', action='store_true'); s.set_defaults(fn=cmd_crop)
a = ap.parse_args(); a.fn(a)
