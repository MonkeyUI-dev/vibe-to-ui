# Context Collaboration Guide

## Overview

This guide defines how vibe-to-ui collaborates with other agent skills (PM skills, product strategy skills, user research skills, frontend skills, etc.) through a shared context file: **DESIGN.md**.

The core principle: **DESIGN.md is the interface.** It is a plain Markdown file in the project root that any skill can read from and write to. No APIs, no protocols, no schemas — just structured sections in a file that both humans and LLMs can parse.

## Why DESIGN.md

Design does not exist in a vacuum. Every visual decision — color warmth, typography weight, spacing density, motion energy, icon language, imagery style, and generated asset strategy — should trace back to product context: who the users are, what they are trying to do, and how the product should feel.

DESIGN.md is a persistent, compounding context artifact. Knowledge is compiled once and kept current, not re-derived on every query.

## The Interface: DESIGN.md Sections

### `## Overview`

Product positioning that constrains design.

| Sub-section | Written by | Read by | Purpose |
|-------------|------------|---------|---------|
| Product Definition | PM skills, user, any skill | vibe-to-ui | Name, one-liner, stage |
| Target Users | PM skills, user research skills, user | vibe-to-ui | Who we design for |
| Core Use Cases | PM skills, user | vibe-to-ui | Key scenarios and layout priorities |
| Product Personality | User, PM skills, vibe-to-ui | vibe-to-ui | Emotional target for color, type, motion, assets |
| Design Constraints | PM skills, user, tech skills | vibe-to-ui | Hard limits such as accessibility, performance, platform |

### `## Page Context`

Page type and density classification from vibe-to-ui. This controls layout, motion, imagery posture, and which assets are appropriate.

For Consumer app surfaces, this section also stores platform, lifecycle stage, primary loop, navigation model, gesture model, state risk, core screens, and state matrix from [CONSUMER-APP-DESIGN.md](CONSUMER-APP-DESIGN.md).

### `## Visual Direction`

The active aesthetic direction: concept id, style seed, mood, typography posture, motion personality, and imagery strategy.

### `## Icon System`

The role-based icon strategy:

- locked UI icon library or `custom_svg`
- custom SVG fallback rules
- icon family preset
- user override policy
- illustrated icon system for feature, social, onboarding, empty-state, and brand surfaces

Small UI chrome icons and expressive illustrated icons are intentionally separate.

### `## Visual Assets`

Generated or project-owned visual assets:

- manifest path
- storage directory
- contact sheet, mood board wall, or placement preview path
- selected cross-role combination
- confirmed and rejected assets
- manifest validation status
- placement notes showing copy/CTA/layout relationships
- regeneration notes

### `## User Insights`

Accumulated user understanding. Each insight has a design implication.

### `## Design Decisions Log`

Historical design decisions and rationale. Append new decisions; do not delete old ones.

### `## Iteration Context`

Cross-references to current design artifacts: design system, mood board, layout blueprint, asset manifest, and last update date.

## How Skills Write to DESIGN.md

### Append, Don't Overwrite

- **New information** -> append to the appropriate section
- **Updated information** -> update the specific field, preserving existing useful context
- **Contradictory information** -> add the new information with a date; don't silently delete the old entry

### Source Attribution

When adding an insight or filling in a section, include the source when useful:

```markdown
- **Primary**: Solo developers building side projects — technical but not design-trained
  <!-- Source: conversational requirement gathering / 2026-06-06 -->
```

### Don't Write What You Don't Know

If a skill gathers target user info but has no insight about product personality, it should fill in Target Users and leave Product Personality empty.

## How vibe-to-ui Reads DESIGN.md

At the start of every design workflow (extraction, exploration, layout analysis, mood board, visual asset generation, apply), vibe-to-ui should:

1. Check if `DESIGN.md` exists in the project root.
2. Read `## Overview`, `## Page Context`, `## Visual Direction`, `## Icon System`, and `## Visual Assets` when present.
3. Use the context to inform design decisions:
   - Target Users -> accessibility requirements, visual density, formality level
   - Core Use Cases -> information hierarchy, layout priorities
   - Product Personality -> color warmth, motion energy, typography weight
   - Page Context -> asset pack, imagery posture, density, and Consumer app UIUX constraints when present
   - Icon System -> locked library, custom SVG fallback, generated icon permissions
   - Visual Assets -> style references, manifest paths, selected combinations, placement rules, validator status, confirmed/rejected generations
4. Reference the context in design rationale when it matters.

## Passive Context Writing

vibe-to-ui should update DESIGN.md when it learns product or design context through conversation:

- User describes users -> update Target Users
- User describes product purpose -> update Product Definition and Core Use Cases
- User describes desired feeling -> update Product Personality and Visual Direction
- Page type is identified -> update Page Context
- Consumer app platform, lifecycle stage, primary loop, navigation, gesture, or state risk is identified -> update Page Context > Consumer App Context
- Existing icon library is detected -> update Icon System
- User requests custom SVG or raster/image icons -> record `user_override`
- A generated illustrated icon family is chosen -> update Illustrated Icon System
- Generated assets are created, confirmed, rejected, or regenerated -> update Visual Assets
- A review wall/contact sheet produces a selected pairing -> record the selected combination
- Manifest validation fails or warns -> record status and issue summary
- An asset placement decision is made -> record the slot, purpose, copy/CTA relationship, and responsive behavior
- User confirms a direction and rationale -> append to Design Decisions Log

The update should be automatic and silent. Do not ask the user whether to update DESIGN.md; the value comes from context accumulating without friction.

## Collaboration with Skill Types

### PM / Product Strategy Skills

Write product definition, target users, core use cases, product stage, user journeys, pain points, and constraints to `## Overview` and `## User Insights`.

### User Research Skills

Write behavioral insights and accessibility needs to `## User Insights` and `Overview > Design Constraints`.

### Frontend / Tech Skills

Write technical constraints such as framework, browser support, performance budgets, and existing icon libraries to `Overview > Design Constraints` and `## Icon System`.

### Visual / Brand Skills

Write mood, visual direction, icon family decisions, generated asset manifests, and image-generation lineage to `## Visual Direction`, `## Icon System`, and `## Visual Assets`.

## The 90/10 Principle

- The interface is a Markdown file.
- Sections are stable.
- Any skill can read it.
- Any skill can update the relevant section.
- No coordination protocol is required beyond the file.

The file is the interface. That's it.
