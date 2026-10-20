"""Builds AuraNova email signatures (table layout + inline styles, email-client safe).

Usage: python build_firmas.py <mark_png_1024> <out_dir> [base_url] [theme bar]
  base_url: public folder URL (ending in /) where the PNGs are hosted; "" = relative, for previews.
  theme bar: e.g. "a vertical" writes the install files firma-<person>-<oscura|clara>.html for that choice;
  without it, writes the options preview (opciones.html) instead.
Chosen 2026-10-20: bar "vertical" (gradient divider). The PNGs are also served by the site from public/firma/.

  python brand/firmas/build_firmas.py "<DS>/logo/auranova-mark-1024.png" brand/firmas https://<host>/firma/ a vertical
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw

MARK_SRC, OUT = Path(sys.argv[1]), Path(sys.argv[2])
BASE = sys.argv[3] if len(sys.argv) > 3 else ""
CHOICE = sys.argv[4:6] if len(sys.argv) > 5 else None
OUT.mkdir(parents=True, exist_ok=True)

# Design tokens v1.3 (Resources/AuraNova/Design System/tokens.css), as hex: email clients don't read CSS variables.
LIME1, VIOLET1, VIOLET3, VIOLET5 = "#D8FD34", "#FBFBFF", "#9DA4FE", "#5934FD"
GRAY1, GRAY2, GRAY3, GRAY5, GRAY6, GRAY7 = "#EDEFF0", "#C2C9CC", "#9BA3A8", "#595F61", "#383B3D", "#191B1C"

# Brand fonts aren't available in email; these stacks fall back to the closest system faces.
DISPLAY = "'Roboto Condensed','Arial Narrow','HelveticaNeue-CondensedBold','Helvetica Neue',Arial,sans-serif"
BODY = "Montserrat,'Segoe UI','Helvetica Neue',Arial,sans-serif"

MARK_PX = 40  # displayed size; the file is 3x for sharp screens

PEOPLE = {
    "david": {"name": "David Contreras Morales", "role": "Dueño", "email": "david.contreras@auranova.mx"},
    "contacto": {"name": "Contacto", "role": None, "email": "contacto@auranova.mx"},
}
TAGLINE = "Soluciones digitales para tu negocio"

THEMES = {
    "a": {  # dark card, like the site's dark sections
        "label": "A · Tarjeta oscura",
        "card": f"background-color:{GRAY7};border:1px solid {GRAY6};border-radius:16px;",
        "bgcolor": GRAY7,
        "word": GRAY1, "name": GRAY1, "muted": GRAY3, "link": VIOLET3, "rule": GRAY6, "dot": LIME1,
        "pad": "24px 28px",
    },
    "b": {  # light, no card: sits on any message
        "label": "B · Clara",
        "card": "",
        "bgcolor": None,
        "word": GRAY7, "name": GRAY7, "muted": GRAY5, "link": VIOLET5, "rule": GRAY2, "dot": VIOLET5,
        "pad": "8px 0",
    },
}


def lerp_hex(a: str, b: str, t: float) -> str:
    ca = [int(a[i:i + 2], 16) for i in (1, 3, 5)]
    cb = [int(b[i:i + 2], 16) for i in (1, 3, 5)]
    return "#" + "".join(f"{round(x + (y - x) * t):02X}" for x, y in zip(ca, cb))


INNER = 424  # content width; the card adds 2 x 28 px padding
LINE_H, VLINE_W, VLINE_H = 3, 2, 56  # displayed px; files are 3x


def gradient_png(path: Path, w: int, h: int, vertical: bool = False, fade: bool = False) -> None:
    """The logo's gradient (lime at 4% -> violet) as a 3x PNG line with rounded ends.
    fade: the line dissolves into transparency over its last 45% (the 'aura')."""
    s = 3
    W, H = w * s, h * s
    length = H if vertical else W
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    px = img.load()
    for i in range(length):
        t = max(0.0, (i / (length - 1) - 0.04) / 0.96)
        c = lerp_hex(LIME1, VIOLET5, t)
        rgb = tuple(int(c[k:k + 2], 16) for k in (1, 3, 5))
        a = 255
        if fade and i / (length - 1) > 0.55:
            a = round(255 * (1 - (i / (length - 1) - 0.55) / 0.45))
        for j in range(W if vertical else H):
            px[(j, i) if vertical else (i, j)] = (*rgb, a)
    # Rounded ends: a pill-shaped alpha mask.
    mask = Image.new("L", (W, H), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, W - 1, H - 1), radius=min(W, H) // 2, fill=255)
    alpha = Image.composite(img.getchannel("A"), Image.new("L", (W, H), 0), mask)
    img.putalpha(alpha)
    img.save(path, optimize=True)


BARS = {
    "linea": "1 · Línea continua",
    "destello": "2 · Línea que se desvanece",
    "vertical": "3 · Divisor vertical en degradado (sin línea horizontal)",
}


def signature(theme_key: str, person_key: str, base: str, bar: str = "linea") -> str:
    t, p = THEMES[theme_key], PEOPLE[person_key]
    inner = INNER
    bg_attr = f' bgcolor="{t["bgcolor"]}"' if t["bgcolor"] else ""
    role = (
        f'<tr><td style="padding:2px 0 0 0;font-family:{BODY};font-size:14px;line-height:20px;color:{t["muted"]};">{p["role"]}</td></tr>'
        if p["role"] else ""
    )
    if bar == "vertical":
        divider = (
            f'<td valign="middle" width="{VLINE_W}" style="width:{VLINE_W}px;padding:0;">'
            f'<img src="{base}firma-vertical.png" width="{VLINE_W}" height="{VLINE_H}" alt="" '
            f'style="display:block;border:0;width:{VLINE_W}px;height:{VLINE_H}px;"></td>\n<td valign="middle" style="padding:0 0 0 20px;">'
        )
        line_row = '<tr><td colspan="3" style="padding:16px 0 0 0;font-size:0;line-height:0;">&nbsp;</td></tr>'
        span = 3
    else:
        divider = f'<td valign="middle" style="border-left:1px solid {t["rule"]};padding:0 0 0 20px;">'
        line_row = (
            f'<tr><td colspan="2" style="padding:18px 0 12px 0;font-size:0;line-height:0;">'
            f'<img src="{base}firma-{bar}.png" width="{inner}" height="{LINE_H}" alt="" '
            f'style="display:block;border:0;width:{inner}px;height:{LINE_H}px;"></td></tr>'
        )
        span = 2
    return f"""<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="{inner + (56 if t['bgcolor'] else 0)}"{bg_attr} style="border-collapse:separate;{t['card']}">
<tr><td style="padding:{t['pad']};">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="{inner}" style="border-collapse:collapse;">
<tr>
<td valign="middle" width="168" style="width:168px;padding:0 20px 0 0;white-space:nowrap;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;"><tr>
<td valign="middle" style="padding:0 10px 0 0;"><img src="{base}auranova-firma-mark.png" width="{MARK_PX}" height="{MARK_PX}" alt="" style="display:block;border:0;width:{MARK_PX}px;height:{MARK_PX}px;"></td>
<td valign="middle" style="font-family:{DISPLAY};font-size:22px;line-height:24px;font-weight:800;letter-spacing:-0.2px;color:{t['word']};white-space:nowrap;">AuraNova</td>
</tr></table>
</td>
{divider}
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
<tr><td style="font-family:{DISPLAY};font-size:19px;line-height:23px;font-weight:800;color:{t['name']};">{p['name']}</td></tr>
{role}
<tr><td style="padding:8px 0 0 0;font-family:{BODY};font-size:14px;line-height:20px;"><a href="mailto:{p['email']}" style="color:{t['link']};text-decoration:none;">{p['email']}</a></td></tr>
</table>
</td>
</tr>
{line_row.replace('colspan="2"', f'colspan="{span}"')}
<tr><td colspan="{span}" style="font-family:{BODY};font-size:11px;line-height:16px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;color:{t['muted']};">
<span style="color:{t['dot']};font-size:10px;">&#9679;</span>&nbsp; {TAGLINE.upper()}</td></tr>
</table>
</td></tr>
</table>"""


# Derived images (the masters stay untouched).
mark = Image.open(MARK_SRC).convert("RGBA").resize((MARK_PX * 3, MARK_PX * 3), Image.LANCZOS)
mark.save(OUT / "auranova-firma-mark.png", optimize=True)
gradient_png(OUT / "firma-vertical.png", VLINE_W, VLINE_H, vertical=True)
if not CHOICE:
    gradient_png(OUT / "firma-linea.png", INNER, LINE_H)
    gradient_png(OUT / "firma-destello.png", INNER, LINE_H, fade=True)

if CHOICE:
    tk, bar = CHOICE
    for pk in PEOPLE:
        # One line, no wrapper: paste it as-is into Zoho's "Insert HTML" (stray newlines can become blank lines).
        (OUT / f"firma-{pk}-{'oscura' if tk == 'a' else 'clara'}.html").write_text(
            signature(tk, pk, BASE, bar).replace("\n", ""), encoding="utf-8"
        )

if not CHOICE:
    # Preview: each line option, dark card (A) and light (B), inside a mock message.
    def pane(title: str, bg: str, fg: str, cards: list[str]) -> str:
        sigs = "".join(
            f'<div style="margin:0 0 28px 0;"><p style="margin:0 0 14px;font:15px/1.5 Segoe UI,Arial,sans-serif;color:{fg};">Saludos,</p>{c}</div>'
            for c in cards
        )
        return (
            f'<section style="margin:0 0 32px;"><h2 style="font:600 13px/1.4 Segoe UI,Arial,sans-serif;letter-spacing:1px;'
            f'text-transform:uppercase;color:#595F61;margin:0 0 10px;">{title}</h2>'
            f'<div style="background:{bg};border:1px solid #C2C9CC;border-radius:12px;padding:28px;overflow-x:auto;">{sigs}</div></section>'
        )

    panes = [
        pane(label, "#FFFFFF", GRAY7, [signature("a", "david", BASE, bar), signature("b", "david", BASE, bar)])
        for bar, label in BARS.items()
    ]
    panes.append(pane("Así se ve Contacto · opción 3", "#FFFFFF", GRAY7,
                      [signature("a", "contacto", BASE, "vertical"), signature("b", "contacto", BASE, "vertical")]))
    (OUT / "opciones.html").write_text(
        "<!doctype html><html lang=\"es\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">"
        "<title>Firmas AuraNova</title></head><body style=\"margin:0;padding:32px 16px;background:#EDEFF0;\">"
        f"<main style=\"max-width:640px;margin:0 auto;\">{''.join(panes)}</main></body></html>",
        encoding="utf-8",
    )
print("ok", sorted(p.name for p in OUT.iterdir()))
