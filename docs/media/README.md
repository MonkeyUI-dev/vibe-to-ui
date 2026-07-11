# docs/media — README visual assets

Drop finished files into this folder using the **exact filenames** below.
Then remove the matching `<!-- TODO(media): … -->` comments in `README.md` / `README.zh_CN.md`.

Do **not** commit multi‑MB originals. Prefer WebP (or SVG for the logo), long edge ≤ 1600px for stills.

## Required for launch polish

| # | Filename | Size / ratio | What to show | Notes |
|---|----------|--------------|--------------|-------|
| 1 | `logo.svg` (or `logo.png`) | ~512×512, transparent | Product mark only | No tiny wordmark; readable at 64px |
| 2 | `hero-banner.webp` | 1600×900 (16:9) | First-viewport story: brand + one line + full-bleed collage of previews | One composition, not a dashboard; avoid purple-AI / cream-serif clichés |
| 3 | `agents-strip.webp` | ~1200×120 | Logos of compatible agents | Quiet background, even spacing |
| 4 | `flow-diagram.webp` | ~1400×480 | Inspire → 3 directions → mood board → preview → apply | Horizontal, editorial, minimal chrome |
| 5 | `example-concepts.webp` | 1600×900 | Concept A / B / C for **one** product | Same page type, distinct visual + motion personality |
| 6 | `example-moodboard.webp` | ~1200×900 | Real generated mood-board HTML screenshot | Color + type + texture + one motion hint |
| 7 | `example-before-after.webp` | 1600×800 | Left generic / right after direction | Same content skeleton; honest contrast |
| 8 | `example-consumer-app.webp` | ~1200×800 | C-end app: nav + core + empty/error | Mobile-first frame |
| 9 | `design-context-diagram.webp` | ~1200×700 | Profile → targets → merge handoff | Diagram, not a photo |

## Optional later

| Filename | Intent |
|----------|--------|
| `example-motion.gif` or `.mp4` | Short loop of entrance / scroll motion from a concept preview |
| `og-card.webp` | 1200×630 social share card for the repo |

## Review checklist

- [ ] Hero passes brand test: without nav, still obviously vibe-to-ui
- [ ] Examples look like product UI, not abstract gradients
- [ ] File sizes reasonable for GitHub (< ~500KB each where possible)
- [ ] Alt text in README still accurate after swap
- [ ] Chinese README uses the same filenames (no duplicate assets)

## Status

All files above are **missing until you add them**. Broken image icons in the README are expected until this checklist is complete.
