# UI Layout Analysis Guide

## Overview

This guide covers extracting reusable layout structures from UI screenshots. The screenshot can be a full webpage **or any section of one** — for example, just a feature list, a pricing block, a testimonials row, a navigation bar, or any other partial UI region. The goal is to produce layout blueprints that both humans and LLMs can understand and apply to new projects.

Layout analysis should not end as text-only analysis when the user is clearly trying to understand or reuse a visual structure. By default, also generate a **standalone HTML wireframe or low-fidelity structural preview** that lets the user see the extracted composition immediately.

## Analysis Process

### Step 1: Determine Screenshot Scope and Identify Sections

First, determine whether the screenshot shows a full page or a partial UI region:

- **Full page**: Scan top-to-bottom and identify each distinct section using common page anatomy:
  - **Navigation/Header**: Top bar, logo placement, nav links, CTA buttons
  - **Hero/Banner**: Above-the-fold primary content area
  - **Content Sections**: Feature grids, text blocks, media sections
  - **Sidebar**: If present — left or right auxiliary content
  - **Footer**: Bottom area with links, copyright, secondary nav

- **Partial / section screenshot**: Treat the entire image as a single named section. Identify what type of component or section it represents (e.g., `features-list`, `pricing-table`, `testimonials`, `cta-banner`) and analyze its internal layout directly.

Label each section with a semantic name (e.g., `hero`, `features-grid`, `testimonials`, `pricing-table`, `cta-banner`, `footer`).

### Step 2: Analyze Grid Structure

For each section, determine:

- **Container width**: Full-bleed, max-width constrained, or narrow centered
- **Column count**: 1, 2, 3, 4, or asymmetric split (e.g., 2/3 + 1/3)
- **Alignment**: Left-aligned, centered, or right-aligned content
- **Stacking direction**: Horizontal flow or vertical stack
- **Gap/Gutter**: Space between grid items (approximate in px or spacing units)

### Step 3: Generate ASCII Layout

Convert the visual structure into ASCII art. Use these conventions:

> **No preset page template**: Do NOT copy a generic "header → hero → features → footer" structure. Every page has a unique composition — analyze and represent what you actually see, not a canonical landing page.

**ASCII conventions** (format guide — use these drawing rules, not these specific layouts):
- `┌─┐│└─┘` for section/component boundaries
- `[Label]` for UI elements (buttons, text, images, icons)
- Section names in UPPERCASE
- Notes in parentheses for layout behavior (e.g., "asymmetric 60/40")
- Indent to show nesting
- Reflect the **actual** spatial structure you see — different screenshots should produce fundamentally different ASCII art

### Step 3b: Spatial Proportion Hints (Loose Percentage Guide)

After the ASCII art, add a **lightweight spatial hint table** — not to copy the layout precisely, but to give the agent a sense of *proportion and weight*: which element is dominant, which row is shorter, whether a card is partial-width or full-width. This prevents the most common spatial misreadings while still leaving room for the agent to interpret freely.

Think of it as sketching a thumbnail, not drafting blueprints. Rough values (±10–15%) are fine and intentional — the goal is directional spatial feel, not pixel replication.

| Element | approx x% | approx y% | approx width% | approx height% | Spatial feel |
|---------|-----------|-----------|---------------|----------------|---------------|
| Section heading | ~0% | ~0% | ~60% | ~14% | Left-anchored, not full-width |
| Card A (row 1, left) | ~0% | ~18% | ~48% | ~46% | Tall, left half |
| Card B (row 1, right) | ~52% | ~18% | ~48% | ~46% | Same visual weight as Card A |
| Card C (row 2) | ~0% | ~68% | ~48% | ~30% | Shorter, left-anchored — not full-width |

The most useful things to call out are **relative relationships** — not absolute coordinates:
- Cards in the same row share the same `y_start` (they're visually aligned)
- A card that's ~50% wide reads very differently from one that's full-width
- A row that's clearly shorter than another conveys visual rhythm

**For layered or overlapping elements**, briefly note the stacking intent:

| Element | approx position | Overlap feel |
|---------|-----------------|--------------|
| Background panel | fills ~80% of section | recedes visually |
| UI panel A | sits upper-left of bg | floats above |
| UI panel B | partially overlaps panel A | tension / depth |

> **Spirit**: These numbers are a sketch, not a spec. An agent reading this should feel the *spatial personality* of the layout — its rhythm, dominance, and balance — and let that inspire a fresh composition, not reproduce it exactly.

---

### Step 4: Semantic Structure Description

For each section, provide a structured description. Describe what you actually observe — do not default to generic patterns:

```markdown
### Section: [name based on what you see]
- **Layout**: [observed column/flow structure]
- **Container**: [width behavior — full-bleed, constrained, narrow?]
- **Content order**: [actual element sequence]
- **Background**: [what you see — solid, gradient, image, none?]
- **Spatial character**: [dense/open, symmetrical/asymmetric, heavy/light?]
```

> Describe rhythm and spatial character, not just CSS specs. The reader should grasp the section's personality.

### Step 5: Responsive Behavior Notes

Briefly infer how the layout's key spatial relationships would naturally adapt at smaller viewports. Focus on which relationships break first and what stacks — don't prescribe specific breakpoints or generic responsive patterns.

```markdown
## Responsive Behavior
- [Describe which side-by-side elements would stack first]
- [Note which spatial relationships are essential to preserve vs. which can reflow]
- [Any elements that likely hide/simplify on small screens]
```

### Step 6: Generate Reusable Skeleton

Produce a clean HTML skeleton and component tree that reflect the **actual analyzed structure** — not a generic page template. Use semantic class names derived from the section names you identified in Step 1.

> **Critical**: Do NOT use a preset page template. The skeleton must be reverse-engineered from THIS specific screenshot's layout. A pricing page, a dashboard, an editorial blog, and a product showcase should all produce fundamentally different skeletons.

### Step 7: Generate a Visual Wireframe Artifact

Create a **self-contained HTML wireframe preview** from the extracted structure. This artifact should:

- visualize the hierarchy and block rhythm from the screenshot
- stay low-fidelity unless the user also asked for style extraction
- use simple surfaces, labels, and spacing to make the structure legible at a glance
- reflect the actual asymmetry, density, and sectional composition of the analyzed reference
- remain standalone and not modify the user's project

The purpose is to let the user verify, "yes, this is the structure I meant," before styling or project integration.

## Combining with Design System

After layout extraction, suggest combining with a design system:

- "Want me to apply a design system to this skeleton?"
- "I can extract the visual style from the same screenshot, or you can provide a different reference."
- If they have a design system from Capability 1, apply it directly to the skeleton.
