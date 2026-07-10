# Target: Social Cover

> Medium rules for social covers, OG images, and share cards.
> Shared brand language comes from `brand.md` and `tokens.json`; this file only adapts composition and readability for scarce space.

- **Profile**: `<profile>`
- **Created**: YYYY-MM-DD
- **Updated**: YYYY-MM-DD
- **Status**: draft | active

## Purpose

Produce covers that are recognizably the same brand as the web product, readable on a phone feed, and not cluttered with dashboard chrome.

## Ratios & safe zones

| Use | Ratio | Notes |
|-----|-------|-------|
| OG / link preview | 1.91:1 | Keep title and logo inside center-safe area |
| Feed square | 1:1 | Strong brand mark + short title |
| Portrait | 4:5 | Prefer for mobile-first feeds |
| Wide / YouTube-style | 16:9 | Cinematic brand stills |

- **Edge margin**: <!-- e.g. ≥ 5–8% of short side -->
- **Safe zone**: avoid critical type/logo in the outer crop risk area

## Composition budget (first read)

Default hero budget for a cover:

1. Brand mark or wordmark (hero-level signal — not a tiny corner afterthought)
2. One headline
3. Optional one short supporting line
4. One dominant visual plane (full-bleed brand imagery or product still)

Do **not** pack stats, schedules, chip clusters, or multi-card collages into the cover unless the brand already owns that pattern.

## Type & color on covers

- Map headline/body to shared typography tokens; increase optical size for mobile.
- Prefer highest-contrast text roles from `tokens.json` (`textInverse` on dark imagery, etc.).
- Accent color for a single emphasis only — not rainbow decoration.

## Brand fidelity for social

- **Must keep**:
- **May adapt**: <!-- crop, type size, fewer words -->
- **Never**: <!-- generic purple gradients, sticker overlays, fake UI chrome unless brand-native -->

## Handoff notes for the social / OG agent

1. Load `brand.md` + `tokens.json` + this file + logo assets under `assets/`.
2. Generate at the requested ratio with safe zones.
3. Keep the cover as one composition, not a mini website.
