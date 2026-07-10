# Target: Hyperframes (Launch Video)

> Medium rules for launch / product videos (Hyperframes and similar).
> Motion and type should descend from shared `tokens.json` and `brand.md`, not from generic template packs.

- **Profile**: `<profile>`
- **Created**: YYYY-MM-DD
- **Updated**: YYYY-MM-DD
- **Status**: draft | active

## Purpose

Translate the brand's visual language into shot, caption, transition, and pacing rules so a launch video feels like the same product as the website and social covers.

## Shot language

- **Opening**: <!-- brand mark / product in context / atmospheric still — pick one primary -->
- **Motifs to repeat**: <!-- colors, materials, UI fragments, imagery style from assets/ -->
- **Framing**: <!-- centered product / editorial off-axis / UI close-ups -->
- **Avoid**: <!-- stock office B-roll, unrelated neon, competing brand cues -->

## On-screen type & captions

- Use shared heading/body families from `tokens.json`.
- **Title hierarchy**: main title → short support → optional CTA end card
- **Caption style**: <!-- lower-third / centered / kinetic — match brand temperament -->
- **Readability**: high contrast; hold long enough for mobile sound-off viewing

## Transitions & motion

Map from shared motion tokens:

| Beat | Prefer | Token cue |
|------|--------|-----------|
| Micro UI moments | short fades / small distance | `duration.fast`, `distance.sm` |
| Section changes | medium dissolves or soft cuts | `duration.normal`–`slow` |
| Hero emphasis | one deliberate slower beat | `duration.slower`, brand tempo |

- **Easing personality**: follow `motion.easing` and `motion.meta.tempo`
- **Density**: do not stack rich motion if brand `motion.meta.density` is minimal
- **Reduced-motion / accessibility**: offer static end card and readable captions without relying on motion alone

## Pacing

- **Overall energy**: <!-- matches brand temperament -->
- **Beat structure**: <!-- e.g. hook → product proof → feature beats → CTA -->
- **Silence / hold**: leave breathing room; do not cut on every word

## Brand fidelity for video

- **Must keep**:
- **May adapt**: <!-- shot length, caption placement -->
- **Never**: <!-- template transitions that fight brand tempo; unreadable kinetic type -->

## Handoff notes for the Hyperframes / video agent

1. Load `brand.md` + `tokens.json` + this file + key `assets/`.
2. Lock color and type to tokens before choosing transitions.
3. Prefer fewer, clearer shots over decorative motion noise.
