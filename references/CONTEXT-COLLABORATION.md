# Context Collaboration Guide

## Overview

This guide defines how vibe-to-ui collaborates with other agent skills (PM skills, product strategy skills, user research skills, etc.) through a shared context file: **DESIGN.md**.

The core principle: **DESIGN.md is the interface.** It's a plain markdown file in the project root that any skill can read from and write to. No APIs, no protocols, no schemas — just structured sections in a file that both humans and LLMs can parse.

## Why DESIGN.md

Design doesn't exist in a vacuum. Every visual decision — color warmth, typography weight, spacing density, motion energy — should trace back to product context: who are the users, what are they trying to do, how should the product feel.

Today, this context lives in the designer's head, or scattered across PRDs, Slack threads, and meeting notes. When an AI agent does design work, it starts from zero every session.

DESIGN.md solves this by being a **persistent, compounding context artifact** — inspired by the LLM Wiki pattern. Knowledge is compiled once and kept current, not re-derived on every query.

## The Interface: DESIGN.md Sections

DESIGN.md has a simple, stable structure. Each section has a clear **owner** (who writes) and **consumer** (who reads):

### `## Overview`

**The most critical section.** Product positioning that constrains design.

| Sub-section | Written by | Read by | Purpose |
|-------------|-----------|---------|---------|
| Product Definition | PM skills, user, any skill | vibe-to-ui | Name, one-liner, stage — grounds all design in product reality |
| Target Users | PM skills, user research skills, user | vibe-to-ui | Who we design for — drives accessibility, density, tone |
| Core Use Cases | PM skills, user | vibe-to-ui | Key scenarios — determines layout priorities, information hierarchy |
| Product Personality | User, PM skills, vibe-to-ui | vibe-to-ui | Emotional target — maps directly to motion, color, typography |
| Design Constraints | PM skills, user, tech skills | vibe-to-ui | Hard limits — mobile-first, accessibility, performance budgets |

### `## User Insights`

Accumulated user understanding. Each insight has a design implication.

| Written by | Read by | Purpose |
|-----------|---------|---------|
| PM skills, user research skills, user, vibe-to-ui | vibe-to-ui | Behavioral patterns that should influence design choices |

### `## Design Decisions Log`

Historical design decisions and rationale.

| Written by | Read by | Purpose |
|-----------|---------|---------|
| vibe-to-ui | All skills, user | Why past design choices were made — prevents flip-flopping |

### `## Iteration Context`

Cross-references to current design artifacts.

| Written by | Read by | Purpose |
|-----------|---------|---------|
| vibe-to-ui | All skills | Where to find current design system, mood boards, layouts |

## How Skills Write to DESIGN.md

### Convention: Append, Don't Overwrite

- **New information** → append to the appropriate section
- **Updated information** → update the specific field, preserving existing content
- **Contradictory information** → add the new information with a date; don't delete the old entry

### Convention: Source Attribution

When adding an insight or filling in a section, include the source:

```markdown
- **Primary**: Solo developers building side projects — technical but not design-trained
  <!-- Source: PM skill / conversational requirement gathering / 2026-04-20 -->
```

### Convention: Don't Write What You Don't Know

If a PM skill gathers target user info but has no insight about product personality, it should fill in Target Users and leave Product Personality empty. Don't guess — let the right skill fill it in.

## How vibe-to-ui Reads DESIGN.md

### Passive Context Loading

At the start of **every** design workflow (extraction, exploration, layout analysis, mood board, apply), vibe-to-ui should:

1. **Check** if `DESIGN.md` exists in the project root
2. **Read** the `## Overview` section
3. **Use** the product context to inform design decisions:
   - Target Users → accessibility requirements, visual density, formality level
   - Core Use Cases → information hierarchy, layout priorities
   - Product Personality → color warmth, motion energy, typography weight
   - Design Constraints → hard limits on design choices
4. **Reference** the context in design rationale: "Chose airy spacing because target users are first-time visitors who need breathing room (see DESIGN.md)"

### When DESIGN.md Is Empty or Missing

If DESIGN.md doesn't exist or Overview is empty:
- During **Design Exploration** (Capability 2): ask the user about product context as part of Phase 1 (Context Gathering), then create/update DESIGN.md
- During **other workflows**: proceed without product context, but note in the output that design decisions could be better informed with product context

### Passive Context Writing

vibe-to-ui should update DESIGN.md when it learns product context through conversation:

- User says "this is for enterprise admins who need to monitor 50+ dashboards" → update Target Users and add a Design Constraint about dense information display
- User says "we want it to feel like Notion — clean and focused" → update Product Personality
- User confirms a design direction and provides rationale → add to Design Decisions Log
- A new design system is extracted → update Iteration Context

**The update should be automatic and silent** — don't ask the user "should I update DESIGN.md?" Just do it, because the value is in accumulation without friction.

## Collaboration with Specific Skill Types

### PM / Product Strategy Skills

**What they provide**: Target users, core use cases, business goals, product stage, user journeys, pain points, business rules.

**What they should write to DESIGN.md**: 
- `Overview > Product Definition`: product name, one-liner, stage
- `Overview > Target Users`: user segment descriptions
- `Overview > Core Use Cases`: key scenarios
- `Overview > Design Constraints`: any product-imposed constraints (mobile-first, offline-capable, etc.)
- `User Insights`: behavioral insights with design implications

**Example flow** with a PM skill like Agile-PM-Workflow:
1. PM skill runs conversational requirement gathering
2. PM skill identifies target users, core scenarios, business goals
3. PM skill writes findings to DESIGN.md `## Overview`
4. User later invokes vibe-to-ui for design exploration
5. vibe-to-ui reads DESIGN.md, understands the product context, and generates design concepts that serve the actual product goals

### User Research Skills

**What they provide**: User behavior patterns, pain points, preferences, accessibility needs.

**What they should write to DESIGN.md**:
- `User Insights`: each insight with source and design implication
- `Overview > Design Constraints`: accessibility requirements discovered through research

### Frontend / Tech Skills

**What they provide**: Technical constraints (framework, browser support, performance budgets).

**What they should write to DESIGN.md**:
- `Overview > Design Constraints`: technical limits (e.g., "no heavy animations — target devices are low-end")

## The 90/10 Principle

This system is intentionally simple:

- **The interface is a markdown file** — no APIs, no JSON schemas, no message protocols
- **Sections are stable** — the structure rarely changes; the content accumulates
- **Reading is just reading a file** — any skill can parse markdown headings
- **Writing is just editing a file** — any skill can append to a section
- **No coordination needed** — skills don't need to know about each other; they just read from and write to the same file

The 10% of effort (a structured markdown file) delivers 90% of the value (persistent product context that makes design better over time).

## For Skill Authors: How to Integrate

If you're building a skill that produces product context, here's how to integrate with DESIGN.md:

1. **Check** if DESIGN.md exists in the project root
2. **Read** the template from vibe-to-ui's `assets/DESIGN.md` if you need to create one
3. **Write** your findings to the appropriate section, following the conventions above
4. **Don't import vibe-to-ui** — there's no dependency. DESIGN.md is the only contract.

```
Your Skill                    DESIGN.md                    vibe-to-ui
    |                             |                             |
    |--- write Target Users ----->|                             |
    |--- write Use Cases -------->|                             |
    |                             |                             |
    |                             |<--- read Overview ----------|
    |                             |<--- read User Insights -----|
    |                             |                             |
    |                             |--- design decisions ------->|
    |                             |    (informed by context)     |
```

The file is the interface. That's it.
