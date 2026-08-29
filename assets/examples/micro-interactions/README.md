# Micro-Interactions Walkthrough Index

Each page in this folder is a self-contained markdown walkthrough with one fenced HTML demo and the per-platform recipe summary. The HTML demos are **scratch previews only** — copy the fenced block into a temporary file outside the repo to load it in a browser; do **not** commit raw `.html` files (per repo convention; see `docs/media/README.md` and the no-raw-html rule in `AGENTS.md`).

## Reading order

If you are new to the library, read in this order — most foundational first:

1. **tap-feedback** — the most important micro-interaction; every pressable surface needs one
2. **focus-ring** — accessibility baseline; always ships with tap-feedback
3. **toggle** — covers switch + checkbox + radio via `data-variant`
4. **card-expand** — reveal-in-place without navigation
5. **bottom-sheet** — mobile-primary contextual reveal
6. **pull-to-refresh** — re-fetch without a visible refresh button
7. **toast-snackbar** — transient acknowledgements
8. **modal-dialog** — blocking decision surfaces
9. **tab-indicator** — switch between peer views without page navigation
10. **page-transition** — direction-aware navigation motion
11. **list-stagger** — sequence a list as it enters view
12. **skeleton-content** — preserve layout while loading
13. **hover-lift** — web-only hint (read last; read anti-patterns first)

## Pattern × Platform index

| Pattern | Web recipe | Mobile-web | Native-aspirational | Reduced-motion | File |
|---|---|---|---|---|---|
| tap-feedback | CSS `:active` | `pointerdown`/`up` + `touch-action: manipulation` | pointer + haptic | instant state change | [tap-feedback.md](tap-feedback.md) |
| focus-ring | `:focus-visible` outline | `:focus-visible` outline | pointer focus + larger ring | static outline | [focus-ring.md](focus-ring.md) |
| toggle / switch | class toggle + thumb slide | whole-control tap target | thumb slide + selection haptic | color-only flip | [toggle.md](toggle.md) |
| card-expand | `max-height` + opacity | same | shared-element transition | crossfade only | [card-expand.md](card-expand.md) |
| bottom-sheet | rare (centered card) | rise + drag-to-dismiss + safe-area | native sheet module | instant show + fade | [bottom-sheet.md](bottom-sheet.md) |
| pull-to-refresh | (avoid) | drag 80px threshold + spinner | drag + success haptic | static progress bar | [pull-to-refresh.md](pull-to-refresh.md) |
| toast / snackbar | bottom-fixed + `aria-live` | safe-area bottom padding | haptic on arrival | text-only banner | [toast-snackbar.md](toast-snackbar.md) |
| modal / dialog | centered + backdrop | full-bleed slide-up + safe-area | native modal + haptic | instant + backdrop | [modal-dialog.md](modal-dialog.md) |
| tab-indicator | indicator glide | same | selection haptic | color-only | [tab-indicator.md](tab-indicator.md) |
| page-transition | View Transitions API | slide+fade by direction | native push/pop | opacity-only | [page-transition.md](page-transition.md) |
| list-stagger | IntersectionObserver stagger | same | recycler views skip | opacity only, no stagger | [list-stagger.md](list-stagger.md) |
| skeleton → content | crossfade + shimmer | same | native placeholders | static skeleton, no shimmer | [skeleton-content.md](skeleton-content.md) |
| hover-lift | `translateY` + shadow (web only) | (avoid) | (avoid) | opacity-only shadow | [hover-lift.md](hover-lift.md) |

## How to use

1. Open the per-pattern markdown file for the surface you are designing.
2. Read the per-platform recipe summary at the top.
3. Copy the fenced HTML demo to a scratch file (e.g. `/tmp/preview.html`) and open it in a browser.
4. Test with Chrome DevTools iPhone 15 / Pixel 8 emulation.
5. Toggle OS-level "Reduce motion" — confirm the reduced-motion branch fires.
6. Use the recipe summary as the recipe to apply in your project, bound to the shipped tokens.

For the engine-tier binding and stack-family decision, load `references/MOTION-ENGINE-ROUTER.md` instead. The walkthroughs here are platform-agnostic; the router is where the engine gets picked.