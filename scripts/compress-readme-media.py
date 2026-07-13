#!/usr/bin/env python3
"""Lossless-ish WebP compression for README media.

Rules (match docs/media/README.md):
- No crop, no aspect-ratio change
- Downscale only when long edge > 1600px
"""

from __future__ import annotations

import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError as exc:  # pragma: no cover
    raise SystemExit(
        "Pillow is required: pip install pillow"
    ) from exc

MAX_LONG_EDGE = 1600
DEFAULT_QUALITY = 85


def compress(src: Path, dst: Path, *, quality: int = DEFAULT_QUALITY) -> tuple[int, int]:
    img = Image.open(src)
    if img.mode not in ("RGB", "RGBA"):
        img = img.convert("RGBA" if "A" in img.getbands() else "RGB")

    w, h = img.size
    long_edge = max(w, h)
    if long_edge > MAX_LONG_EDGE:
        scale = MAX_LONG_EDGE / long_edge
        img = img.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)

    dst.parent.mkdir(parents=True, exist_ok=True)
    save_kwargs = {"quality": quality, "method": 6}
    if img.mode == "RGBA":
        img.save(dst, "WEBP", **save_kwargs)
    else:
        img.save(dst, "WEBP", **save_kwargs)
    return img.size


def main(argv: list[str]) -> int:
    if len(argv) not in (2, 3):
        print(
            "Usage: compress-readme-media.py <source-image> [dest.webp]",
            file=sys.stderr,
        )
        return 2

    src = Path(argv[1])
    dst = Path(argv[2]) if len(argv) == 3 else Path("docs/media/brand-slogan.webp")

    if not src.is_file():
        print(f"Source not found: {src}", file=sys.stderr)
        return 1

    size = compress(src, dst)
    print(f"Wrote {dst} ({size[0]}x{size[1]}, {dst.stat().st_size} bytes)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
