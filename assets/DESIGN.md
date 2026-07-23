# DESIGN.md

> A persistent, compounding design context file — compatible with the [DESIGN.md format](https://designmd.ai/what-is-design-md) created by Google Stitch. Extends the standard format with product context, icon strategy, and visual asset sections that help AI agents make design decisions grounded in product goals.
>
> **Maintained by**: AI agents (vibe-to-ui, PM skills, and other collaborating skills). Humans review and refine.

---

## Overview

<!--
  Product positioning + aesthetic direction in prose. This is the most important section.
  It serves two roles:
  1. Standard DESIGN.md role: a concise description of the design system's aesthetic identity
  2. Extended role: product context that constrains and guides design decisions

  Example:
  "An editorial precision interface for a community platform where developers discover,
  share, and download design system files. The aesthetic is quietly confident — bold display
  typography, generous spacing, and gallery-frame card surfaces. The mood is professional
  and modern without being sterile. High information density balanced by breathing room."
-->

### Product Definition

- **Product Name**: <!-- e.g., "DESIGNmd" -->
- **One-liner**: <!-- e.g., "A community platform where developers discover, share, and download design system files" -->
- **Product Stage**: <!-- Idea / MVP / Growth / Mature -->

### Target Users

<!-- Describe primary user segments. Each segment should include who they are, their context, and what matters to them. Design decisions flow from this: developer-facing products need dense information and sharp typography; consumer products need breathing room and warmth. -->

- **Primary**: <!-- e.g., "Frontend developers and vibe coders who want ready-made design systems — they browse, preview, and download .md files to drop into their projects. They value speed, clarity, and being able to evaluate a design system at a glance." -->
- **Secondary**: <!-- e.g., "Design system authors who create and publish their systems — they want their work to look polished in the gallery and attract downloads. They value good presentation and discoverability." -->

### Core Use Cases

<!-- The 2-5 key scenarios where users interact with this product. Focus on situations, not features. These determine layout priorities: what's above the fold, what gets the most visual weight, what interactions must feel instant. -->

1. <!-- e.g., "Developer browses the gallery of design systems — needs to scan 20+ cards quickly and evaluate each system's aesthetic from a small preview. Card design must communicate the system's personality at thumbnail size." -->
2. <!-- e.g., "Developer opens a design system detail page — needs to see colors, typography, spacing, and components at a glance, then decide whether to download. Information density matters but must not feel overwhelming." -->
3. <!-- e.g., "Developer downloads a DESIGN.md and drops it into their project root — the file must be immediately usable by AI coding agents with zero configuration." -->

### Product Personality

<!-- How should this product feel to use? This directly maps to design tokens:
  - Tone -> color temperature, border radius, shadow depth
  - Energy -> motion system (still/flowing/snappy), animation duration
  - Density -> spacing scale, typography size, information per viewport -->

- **Tone**: <!-- e.g., "Quietly confident — professional and modern without being sterile. The interface should feel like a well-curated gallery, not a cluttered marketplace." -->
- **Metaphor**: <!-- e.g., "A gallery of framed works — each design system is presented like an art piece in a clean, well-lit space. The frame (card) should complement, never compete with the content." -->

### Design Constraints from Product

<!-- Hard constraints that product context imposes on design. These are non-negotiable and override aesthetic preferences. -->

- <!-- e.g., "Must render color swatches accurately — no CSS filters or overlays on color previews" -->
- <!-- e.g., "Cards must work in a responsive grid from 1 column (mobile) to 4 columns (desktop)" -->
- <!-- e.g., "Design system previews must load without external dependencies — inline all assets" -->
- <!-- e.g., "Accessibility: WCAG AA minimum — color contrast ratios must pass for all text on all surfaces" -->

---

## Page Context

<!-- Populated by vibe-to-ui when a page type is identified. -->

- **Primary page type**: <!-- landing / dashboard / workbench / docs / form / consumer app / other -->
- **Secondary modifier**: <!-- optional -->
- **Density**: <!-- low / medium / high -->
- **Interaction model**: <!-- scrolling / scanning / filtering / editing / onboarding / purchasing -->
- **Design consequences**: <!-- how page type affects hierarchy, imagery, motion, and density -->

### Consumer App Context

<!-- Populated when the primary page type is consumer app. See references/CONSUMER-APP-DESIGN.md. -->

```yaml
consumer_app:
  platform: null                       # mobile_app | responsive_web_app | tablet_app | unknown
  lifecycle_stage: null                # acquisition | onboarding | activation | daily_use | retention | monetization
  primary_loop: null                   # browse | create | track | learn | transact | socialize | manage
  navigation_model: null               # bottom_tabs | top_tabs | stack_navigation | feed_first | hub_and_detail | unknown
  gesture_model: null                  # tap_first | swipe_cards | pull_to_refresh | drag_reorder | camera_capture | mixed
  state_risk: null                     # low | medium | high
  core_screens: []                     # home | feed | detail | create | onboarding | empty_state | profile | settings | paywall
  state_matrix: []                     # loading | empty | error | offline | success | permission
  thumb_zone_notes: null
  monetization_notes: null
```

---

## User Insights

Accumulated understanding of users — from research, conversations, usage patterns, and feedback. Each insight should trace to a design implication.

<!-- Insights accumulate over time. New entries are appended, old ones are never deleted. -->

| Insight | Source | Design Implication | Date |
|---------|--------|--------------------|------|
| <!-- e.g., "Users spend avg. 3s on a card before deciding to click or scroll — the card must communicate the design system's personality instantly" --> | <!-- e.g., "Analytics / PM skill" --> | <!-- e.g., "Card hero image/preview is the most important element; text metadata is secondary" --> | <!-- YYYY-MM-DD --> |
| <!-- e.g., "70% of downloads happen on the detail page, not from the card — users need to 'try before they buy'" --> | <!-- e.g., "Usage data" --> | <!-- e.g., "Detail page should have interactive component previews, not just static screenshots" --> | <!-- YYYY-MM-DD --> |

---

## Page Direction Candidates

<!-- Cap 9: three structurally different directions before Motion Engine. Status: candidate | selected | rejected | mixed-into -->

| ID | Name | Proposition (one line) | Signature Experience | Cost | Status | Why kept / rejected |
|----|------|------------------------|----------------------|------|--------|---------------------|
| A | <!-- --> | <!-- --> | <!-- --> | S/M/L | candidate | <!-- --> |
| B | <!-- --> | <!-- --> | <!-- --> | S/M/L | candidate | <!-- --> |
| C | <!-- --> | <!-- --> | <!-- --> | S/M/L | candidate | <!-- --> |

- **Ordinary diagnosis**: <!-- why the page felt generic / forgettable -->
- **Inspirations consulted**: <!-- inspiration ids under ~/.vibe-to-ui/inspirations/ -->
- **Mix recipe** (if any): <!-- e.g. A spatial + B signature moment -->
- **Local memory**: <!-- ~/.vibe-to-ui/page-directions/<slug>/ -->

---

## Visual Direction

<!-- Populated after a Page Direction is selected (or via exploration / extraction). -->

- **Concept ID**: <!-- stable id for the active visual direction / Page Direction -->
- **Style seed**: <!-- shared seed / reference chain -->
- **Mood keywords**: <!-- calm, precise, playful, premium, etc. -->
- **Color temperature**: <!-- warm / cool / neutral -->
- **Saturation strategy**: <!-- muted / balanced / vivid / selective pops -->
- **Typography posture**: <!-- editorial / operational / playful / premium / neutral -->
- **Motion personality**: <!-- still / subtle / polished / energetic / cinematic -->
- **Imagery strategy**: <!-- photography / soft illustration / 3D object / abstract texture / restrained empty state -->
- **Page proposition**: <!-- from selected Page Direction -->
- **Visual metaphor**: <!-- from selected Page Direction -->
- **Signature Experience**: <!-- memorable moment to preserve through Apply -->
- **Rejected directions**: <!-- ids + short reasons -->
- **Inspiration citations**: <!-- transferable rules used; brand-specific excluded -->

---

## Icon System

Small UI icons and expressive marketing icons are separate systems. vibe-to-ui updates this section passively after inspecting the project and references.

```yaml
icon_system:
  ui_icon_source: null                # lucide | heroicons | phosphor | radix | tabler | custom_svg
  lock_policy: single_library_for_new_ui_icons
  detected_libraries: []
  fallback: custom_svg_component
  preset: outline-system             # outline-system | solid-glyph | duotone-soft | technical-line
  grid: 24
  stroke_width: 2
  stroke_cap: round
  stroke_join: round
  corner_language: soft
  color_mode: currentColor + semantic tokens
  user_override: null                # library_only | custom_svg_only | generated_icons | raster_icons

illustrated_icon_system:
  enabled_for: []                    # landing_feature | social_preview | empty_state | onboarding
  preset: null                       # playful-sticker | 3d-object-pop | mascot-prop | custom
  format: null                       # svg | webp | png
  style_reference: null              # hero or visual-family anchor id
  accent_color: null
  visual_family_rules:
    perspective: null
    material: null
    lighting: null
    shadow: null
    background: null
    detail_density: null
  avoid_for: [navigation, form_controls, table_actions, toolbar_controls]
```

---

## Visual Assets

<!-- Populated by vibe-to-ui when generated or project-owned assets become part of the design direction. -->

- **Manifest path**: <!-- design-assets.manifest.json / public/design-assets/manifest.json -->
- **Storage directory**: <!-- public/design-assets/ -->
- **Preview artifact path**: <!-- standalone mood board, contact sheet, or concept page path -->
- **Review surface path**: <!-- contact sheet, mood board wall, or placement preview path -->
- **Selected combination**: <!-- e.g., A2 hero + B1 empty state + C3 icon set -->
- **Confirmed assets**: <!-- asset ids confirmed for Apply -->
- **Rejected assets**: <!-- rejected asset ids and why -->
- **Regeneration notes**: <!-- what changed between v1, v2, etc. -->
- **Manifest validation**: <!-- passed / warning / failed; date; issue summary -->

### Asset Placement Notes

<!-- Keep only the active placement decisions here; detailed per-asset data stays in the manifest. -->

| Asset ID | Slot | Purpose | Copy / CTA Relationship | Responsive Behavior | Notes |
|----------|------|---------|--------------------------|---------------------|-------|
| <!-- hero-example-v1 --> | <!-- hero_visual --> | <!-- emotional_anchor --> | <!-- left 40% clear for H1; subject points toward CTA --> | <!-- right on desktop, below copy on mobile --> | <!-- confirmed / needs regeneration --> |

---

## Design Decisions Log

Key design decisions and their rationale — so future sessions understand *why*, not just *what*.

<!-- Append new decisions. Don't delete old ones — they're historical context. -->

| Decision | Rationale | Date |
|----------|-----------|------|
| <!-- e.g., "12px card border-radius, 6px button/input radius" --> | <!-- e.g., "Cards are gallery frames — rounder feels warmer and inviting. Buttons are tools — tighter radius feels crisp and actionable. The contrast reinforces the gallery metaphor." --> | <!-- YYYY-MM-DD --> |
| <!-- e.g., "Indigo (#6366F1) reserved strictly for interactive elements" --> | <!-- e.g., "In a gallery of diverse color palettes, the UI's own brand color must never compete with the content. Limiting indigo to CTAs keeps it functional, not decorative." --> | <!-- YYYY-MM-DD --> |

---

## Iteration Context

Cross-references to design artifacts produced during project iterations. Keeps the trail visible.

- **Current Design System**: <!-- path to design-system.md if extracted -->
- **Active Mood Board**: <!-- path or description -->
- **Layout Blueprint**: <!-- path or description -->
- **Page Direction Memory**: <!-- ~/.vibe-to-ui/page-directions/<slug>/ -->
- **Page Direction Previews**: <!-- paths to A/B/C standalone HTML -->
- **Asset Manifest**: <!-- path to design-assets.manifest.json if generated -->
- **Design Context Profile**: <!-- e.g. vibe-to-ui — maps to ~/.vibe-to-ui/profiles/<profile>/ -->
- **Last Updated**: <!-- YYYY-MM-DD -->

---

<!--
  ============================================================================
  DESIGN SYSTEM SECTIONS (below)

  These follow the standard DESIGN.md format from designmd.ai / Google Stitch.
  They are populated by vibe-to-ui when a design system is extracted or applied.

  Standard sections:
  - ## Colors
  - ## Typography
  - ## Spacing
  - ## Border Radius
  - ## Elevation
  - ## Components
  - ## Do's and Don'ts

  Leave these empty until vibe-to-ui fills them through design workflows.
  ============================================================================
-->

## Colors

<!-- Populated by vibe-to-ui design system extraction. Format follows designmd.ai convention. -->

## Typography

<!-- Populated by vibe-to-ui design system extraction. -->

## Spacing

<!-- Populated by vibe-to-ui design system extraction. -->

## Border Radius

<!-- Populated by vibe-to-ui design system extraction. -->

## Elevation

<!-- Populated by vibe-to-ui design system extraction. -->

## Components

<!-- Populated by vibe-to-ui design system extraction. -->

## Do's and Don'ts

<!-- Populated by vibe-to-ui design system extraction. -->
