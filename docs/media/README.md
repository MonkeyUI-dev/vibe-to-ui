# README media production brief

This folder contains optimized, finished visuals used by the public README. It is **not** a source-media archive: keep editable originals, screen recordings, project files, and exports outside the repository.

The README will embed proof assets only after they are real and approved. Until then, the files and notes below are the production handoff — no visitor-facing placeholder or fake product imagery.

## Delivery rules

- Use the exact filenames below; English and Chinese READMEs share each asset.
- Still images: WebP preferred, longest edge at most 1600 px, normally under 500 KB.
- Motion proof: optimized GIF, 8–15 seconds, silent, normally 8–12 MB maximum. Keep the source recording outside Git.
- Show real product UI, not abstract gradients or imagined dashboards.
- Use a clear, readable frame in both GitHub light and dark themes. Do not bake tiny explanatory copy into visuals.
- Pair every animated proof with a `.webp` poster using the same subject and a meaningful still frame.

## Current brand asset

| Filename | Status | Role | Delivery note |
|---|---|---|---|
| `brand-slogan.png` | Present | Brand sign-off near the end of both READMEs | Keep the supplied 1024×512 file. Do not redraw or upscale it. |

## First-release proof assets

These are the assets that unlock the result-first README. Deliver in this order.

| Priority | Filename | Size / format | What it must prove |
|---|---|---|---|
| 1 | `demo-before-after.gif` | 1600×900, GIF, 8–15 s, silent | The same marketing landing page moves from generic AI UI to an intentional final direction. |
| 1 | `demo-before-after-poster.webp` | 1600×900, WebP | A sharp key frame from the same demo for sharing and static fallback. |
| 2 | `flow-diagram.webp` | 1400×480, WebP | `Reference / intent → 3 directions → preview → confirm → apply`. |
| 3 | `example-concepts.webp` | 1600×900, WebP | Three genuinely different directions for the same product and page type; not just color swaps. |
| 4 | `design-context-diagram.webp` | 1200×700, WebP | Profile → medium targets → project handoff, with the user controlling when rules are applied. |

### Hero demo storyboard — `demo-before-after.gif`

Use one product and the same content skeleton throughout. The claim is credibility, not a flashy transition.

1. **0–3 s — Before:** an honest, generic AI-generated marketing landing page; show the page long enough to understand its hierarchy and content.
2. **3–5 s — Direction:** show the input signal (reference or vibe) and a very brief glimpse of the three direction previews. Avoid dense terminal footage.
3. **5–12 s — After:** reveal the finished page with clear visual hierarchy, typography, spacing, imagery, and restrained motion. Hold on the final result.
4. **12–15 s — Optional close:** a compact “preview first · apply when ready” line or final-page motion detail. Do not end on a product logo alone.

The before and after must preserve the same core page and content. Do not compare unrelated products, and do not claim automation that the skill does not perform.

## Secondary assets — not required for the first README release

| Filename | Size / format | Role |
|---|---|---|
| `agents-strip.webp` | ~1200×120, WebP | Quiet strip of compatible agent logos, with even spacing. |
| `example-moodboard.webp` | ~1200×900, WebP | Screenshot of a real generated mood-board HTML artifact: color, type, texture, and one motion cue. |
| `example-consumer-app.webp` | ~1200×800, WebP | Consumer-app proof: navigation, core screen, and empty/error state in a mobile-first frame. |
| `example-motion.gif` | 1200×675, GIF | Short loop that demonstrates a restrained signature motion from a real concept preview. |
| `og-card.webp` | 1200×630, WebP | Social share card for the repository. |
| `logo.svg` | ~512×512, transparent SVG | Optional product mark; only add if it materially improves brand recognition. |

## Release checklist

- [x] Brand slogan hero is present (`brand-slogan.png`)
- [ ] Hero demo and poster show the same real marketing landing page
- [ ] Demo plays as an optimized GIF and stays within the target size budget
- [ ] Before and after preserve the same content skeleton
- [ ] New assets look like usable product UI, not mood-only art
- [ ] README alt text describes the final assets accurately
- [ ] English and Chinese READMEs use the same filenames
- [ ] No source video, layered design file, or multi-megabyte original is committed
