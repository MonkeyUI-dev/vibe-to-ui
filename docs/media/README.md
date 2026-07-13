# docs/media — README visual assets

Drop finished files into this folder using the **exact filenames** below.
When an asset is ready, add it back to `README.md` / `README.zh_CN.md` (currently only `brand-slogan.webp` is embedded).

Do **not** commit multi‑MB originals. Prefer WebP (or SVG for the logo), long edge ≤ 1600px for stills.

## User-provided assets — never regenerate

When the user uploads a finished brand asset (for example the slogan hero):

- **Copy the upload verbatim** to `docs/media/` (keep the target filename, e.g. `brand-slogan.webp`).
- **Do not** call image-generation tools to recreate, “fix”, or approximate it from a text description.
- If the chat attachment is not on disk, **stop and ask the user** to save the export to `docs/media/brand-slogan-source.png` (or re-attach the file) — do not substitute an AI redraw.
- WebP compression is allowed only with **no crop and no aspect-ratio change**. Downscale only when the long edge exceeds 1600px.
- Preserve the **full composition** (footer bars, registration marks, typography, color grading).

To replace `brand-slogan.webp` from a local export:

```bash
python3 scripts/compress-readme-media.py docs/media/brand-slogan-source.png docs/media/brand-slogan.webp
```

## Present

| Filename | Role |
|----------|------|
| `brand-slogan.webp` | Brand slogan hero (“Design the dream you were told to put away.”) — used at the top of both READMEs |

## Still needed

| # | Filename | Size / ratio | What to show | Notes |
|---|----------|--------------|--------------|-------|
| 1 | `logo.svg` (or `logo.png`) | ~512×512, transparent | Product mark only | Optional if slogan banner carries brand enough |
| 2 | `agents-strip.webp` | ~1200×120 | Logos of compatible agents | Quiet background, even spacing |
| 3 | `flow-diagram.webp` | ~1400×480 | Inspire → 3 directions → mood board → preview → apply | Horizontal, editorial, minimal chrome |
| 4 | `example-concepts.webp` | 1600×900 | Concept A / B / C for **one** product | Same page type, distinct visual + motion personality |
| 5 | `example-moodboard.webp` | ~1200×900 | Real generated mood-board HTML screenshot | Color + type + texture + one motion hint |
| 6 | `example-before-after.webp` | 1600×800 | Left generic / right after direction | Same content skeleton; honest contrast |
| 7 | `example-consumer-app.webp` | ~1200×800 | C-end app: nav + core + empty/error | Mobile-first frame |
| 8 | `design-context-diagram.webp` | ~1200×700 | Profile → targets → merge handoff | Diagram, not a photo |

## Optional later

| Filename | Intent |
|----------|--------|
| `example-motion.gif` or `.mp4` | Short loop of entrance / scroll motion from a concept preview |
| `og-card.webp` | 1200×630 social share card for the repo |

## Review checklist

- [x] Brand slogan hero present (`brand-slogan.webp`)
- [ ] Examples look like product UI, not abstract gradients
- [ ] File sizes reasonable for GitHub (< ~500KB each where possible)
- [ ] Alt text in README still accurate after swap
- [ ] Chinese README uses the same filenames (no duplicate assets)
