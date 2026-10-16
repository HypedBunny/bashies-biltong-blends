#!/usr/bin/env python3
"""Generate web-optimised image variants into public/images/optimized/.

The originals in public/ are full-resolution camera/design exports (up to
6378px wide and ~400 KB each). The site displays them at a few hundred pixels,
so this script produces right-sized WebP files for the page, plus small
favicons and a 1200x630 social sharing card.

Re-run after adding or replacing a photo:

    pip install Pillow
    python3 scripts/optimize-images.py
"""

from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
OUT = PUBLIC / "images" / "optimized"

# Product cards are square (aspect-square + object-cover), so a centred square
# crop renders identically and avoids shipping pixels that are never shown.
PRODUCT_IMAGES = {
    "beefnew": "images/products/beefnew.jpeg",
    "chillie": "images/products/chillie.jpg",
    "droewors": "images/products/droewors.jpg",
    "ccdw": "images/products/ccdw.jpeg",
    "PNew": "images/products/PNew.jpeg",
    "Kudu": "images/products/Kudu.jpeg",
}
PRODUCT_WIDTHS = (400, 600, 800)

# About section photo keeps its own aspect ratio.
ABOUT_IMAGE = ("about", "images/products/image1.jpeg", (480, 871))


def load(rel_path: str) -> Image.Image:
    # Apply EXIF orientation so the output matches what browsers display.
    return ImageOps.exif_transpose(Image.open(PUBLIC / rel_path))


def save_webp(im: Image.Image, name: str, quality: int = 75) -> None:
    path = OUT / name
    im.save(path, "WEBP", quality=quality, method=6)
    print(f"{path.relative_to(ROOT)}  {im.width}x{im.height}  {path.stat().st_size // 1024} KB")


def resize_to_width(im: Image.Image, width: int) -> Image.Image:
    width = min(width, im.width)
    height = round(im.height * width / im.width)
    return im.resize((width, height), Image.LANCZOS)


def on_white(im: Image.Image) -> Image.Image:
    bg = Image.new("RGB", im.size, "white")
    bg.paste(im, mask=im.getchannel("A"))
    return bg


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    for name, rel in PRODUCT_IMAGES.items():
        im = load(rel).convert("RGB")
        side = min(im.size)
        square = ImageOps.fit(im, (side, side), Image.LANCZOS)
        for width in PRODUCT_WIDTHS:
            save_webp(square.resize((width, width), Image.LANCZOS), f"{name}-{width}.webp")

    name, rel, widths = ABOUT_IMAGE
    im = load(rel).convert("RGB")
    for width in widths:
        save_webp(resize_to_width(im, width), f"{name}-{width}.webp")

    # Header logo is shown at 32-40px; 128px covers 3x displays.
    logo = load("logoBlack.png")
    save_webp(logo.resize((128, 128), Image.LANCZOS), "logo-black-128.webp", quality=90)

    # Footer banner is shown 64-80px tall (3:1); 720x240 covers 3x displays.
    banner = load("bannerWhite.png")
    save_webp(banner.resize((720, 240), Image.LANCZOS), "banner-white-720.webp", quality=90)

    # Small favicons instead of the 1063px logo PNGs.
    for src, out in (("logoBlack.png", "favicon-black-192.png"), ("logoWhite.png", "favicon-white-192.png")):
        icon = load(src).resize((192, 192), Image.LANCZOS)
        icon.save(OUT / out, optimize=True)
        print(f"{(OUT / out).relative_to(ROOT)}  192x192  {(OUT / out).stat().st_size // 1024} KB")

    # iOS fills transparency with black, so the touch icon gets a white background.
    touch = on_white(load("logoBlack.png").resize((180, 180), Image.LANCZOS))
    touch.save(OUT / "apple-touch-icon.png", optimize=True)
    print(f"{(OUT / 'apple-touch-icon.png').relative_to(ROOT)}  180x180")

    # 1200x630 social sharing card (Open Graph / Twitter).
    card = Image.new("RGB", (1200, 630), "white")
    banner_black = load("bannerBlack.png").resize((1050, 350), Image.LANCZOS)
    card.paste(banner_black, ((1200 - 1050) // 2, (630 - 350) // 2), mask=banner_black.getchannel("A"))
    card.save(OUT / "og-image.jpg", quality=85, optimize=True, progressive=True)
    print(f"{(OUT / 'og-image.jpg').relative_to(ROOT)}  1200x630  {(OUT / 'og-image.jpg').stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
