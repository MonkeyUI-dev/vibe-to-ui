# Target: Web

> Medium rules for webpage and app UI. Derived from this profile's `brand.md`, `tokens.json`, and `decisions.md`.
> Do not duplicate the full token set here — reference shared tokens and state application rules only.

- **Profile**: `<profile>`
- **Created**: YYYY-MM-DD
- **Updated**: YYYY-MM-DD
- **Status**: draft | active

## Purpose

Rules for product/marketing web surfaces and app UI that must feel like the same brand as social and video, while respecting page-type density and interaction needs.

## Layout & hierarchy

- **Default density**: <!-- sparse / balanced / compact — from brand, tuned for UI -->
- **Hierarchy**: <!-- how brand, headline, body, and actions stack -->
- **Section rhythm**: <!-- steady / editorial / modular -->
- **Responsive**: <!-- what collapses first; what must survive on small screens -->

## Components & surfaces

- **Buttons**: <!-- primary / secondary / ghost mapping to tokens -->
- **Inputs & forms**: <!-- border, focus, error using shared color roles -->
- **Cards / panels**: <!-- only when interaction or grouping needs a container; otherwise prefer open layout -->
- **Navigation**: <!-- top / side / tabs — brand-faithful chrome -->
- **Imagery in UI**: <!-- full-bleed vs inset; product vs atmospheric -->

## Interaction & motion

- Apply shared `tokens.json` motion durations/easing; do not invent a second motion system.
- **Hover / focus**: <!-- subtle lift, underline, color shift — match brand tempo -->
- **Page / section transitions**: <!-- restrained for dense UI; more expressive for marketing -->
- **Reduced motion**: honor `motion.meta.reducedMotion`

## Brand fidelity for web

- **Must keep**:
- **May adapt by page type**: <!-- landing vs dashboard vs consumer app -->
- **Never**:

## Handoff notes for the web agent

1. Load `brand.md` + `tokens.json` + this file.
2. Classify page type before applying density or imagery posture.
3. Prefer project `DESIGN.md` for product-local constraints when present.
