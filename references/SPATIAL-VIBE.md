# Spatial Vibe Exploration Guide

## Overview

Spatial Vibe Exploration translates fuzzy aesthetic intent into page-level layout decisions. A design system gives the agent the vocabulary: color, type, spacing, radius, motion, and component tokens. Spatial Vibe gives the grammar: how content breathes, where attention lands, how sections relate, and what rhythm the page should create.

Use this guide when the user says things like:

- "Make this landing page feel more relaxed."
- "I want an editorial, magazine-like feeling."
- "I like the vibe of this cafe, this film still, and this album cover."
- "Do not make it look like a generic SaaS landing page."

Inspiration can come from anywhere: websites, apps, photography, landscapes, architecture, interiors, magazines, posters, packaging, fashion, album covers, film stills, illustrations, music, or video. Non-UI references should be translated into transferable design signals, not copied literally.

Example:

```
coastal-road photo -> openness, wide negative space, slow rhythm, restrained density
not -> place a road photo in the hero
```

## Workflow

### 1. Establish Product Goal and UX Constraints

Start with the product surface, not the reference.

Clarify:

- What page or flow is being designed?
- What must the user accomplish on this page?
- Who is the audience?
- What content is required above the fold?
- What cannot change because of business, accessibility, brand, or implementation constraints?
- What should the page explicitly avoid feeling like?

Then classify the target page type and density using the main skill's Stage 0 guidance. The page type sets the boundary for interpretation: a relaxed B-end dashboard still needs scanability; an editorial landing page can accept more expressive rhythm.

### 2. Separate Structure References from Vibe References

Not every reference should influence the same design layer.

- **Structure references** inform organization: module order, hierarchy, navigation pattern, reading flow, image/text balance, section pacing.
- **Vibe references** inform feeling: openness, tension, intimacy, tempo, texture, visual gravity, asymmetry, restraint, warmth, or drama.

The same reference can provide both, but name the role explicitly before deriving layout decisions.

### 3. Identify What the User Actually Likes

Ask or infer what attracts the user to each reference. Avoid vague summaries like "modern" or "beautiful" when a sharper signal is available.

Useful prompts:

- Is it the spacing, the composition, the mood, the color, the content hierarchy, or the pace?
- Does the user like the emptiness, the density, the off-center balance, the big visual moment, or the quiet restraint?
- Is this a positive reference, an anti-reference, or only a partial reference?

Reflect the user's language back to them so the translation stays anchored to their intent.

### 4. Extract Transferable and Non-Transferable Signals

For each reference, split signals into two buckets:

**Transferable signals**

- Content density
- Whitespace amount and placement
- Hierarchy shape
- Dominant visual focus
- Spatial rhythm
- Symmetry or asymmetry
- Card usage
- Image behavior
- Section transitions
- Interaction tempo
- Responsive strategy

**Non-transferable signals**

- Literal subject matter that does not belong in the product
- Decoration that conflicts with accessibility or usability
- Page structures that contradict the target page type
- Mood signals that would harm the required task flow
- Cultural, brand, or content cues the product cannot credibly own

Translate references into product-aware decisions. A film still might imply low-key contrast, compressed vertical spacing, and a single strong focal plane; it does not require cinematic imagery if the product context calls for data clarity.

### 5. Dynamically Derive Spatial DNA

Spatial DNA is the working grammar for the page. Derive it from the product goal, UX constraints, and references. Do not use preset style templates or a fixed vibe taxonomy.

A useful Spatial DNA summary may include:

- **Content density**: sparse, balanced, compact, or deliberately layered
- **Whitespace**: where space expands, where it tightens, and why
- **Hierarchy**: how attention moves from primary action to supporting content
- **Dominant visual focus**: text-led, image-led, product-demo-led, data-led, or mixed
- **Spatial rhythm**: steady, slow, syncopated, modular, editorial, immersive
- **Card usage**: absent, minimal, dense, oversized, overlapping, or broken-grid
- **Symmetry / asymmetry**: centered calm, off-axis tension, alternating rhythm
- **Image behavior**: full-bleed, cropped, inset, cinematic, documentary, abstracted
- **Section transitions**: hard cuts, soft fades, overlapping bands, scroll chapters
- **Interaction tempo**: still, subtle, responsive, flowing, cinematic
- **Responsive strategy**: what relationships must survive on small screens

Keep the summary compact enough to guide generation. It should read like a set of spatial decisions, not a mood thesaurus.

### 6. Use an Invisible Composition Grid

Before generating a preview, use an invisible composition grid as a private reasoning scaffold. This is how a designer would organize alignment, rhythm, hierarchy, and responsive behavior before drawing the final page.

The grid is not a user-facing artifact:

- Do not display grid lines in the preview.
- Do not output the grid as a separate deliverable.
- Do not turn it into a fixed 12-column template.
- Do not let the result look mechanically gridded unless the Spatial DNA calls for that.

Derive the grid from the Spatial DNA:

- **Editorial**: asymmetric columns, wide margins, deliberate offset alignments, varied section cadence
- **Relaxed / calm**: larger gutters, slower vertical rhythm, fewer competing focal points
- **Dense / operational**: compact module grid, stable alignment, predictable scan paths
- **Cinematic**: strong focal axis, horizontal bands, large negative space, controlled reveal tempo

Use the internal grid to reason about:

- column structure
- margins and gutters
- focal axis
- baseline rhythm
- section cadence
- responsive collapse logic

After rendering, check whether the page feels over-templated. The grid should support the intended vibe without exposing itself as the design.

### 7. Generate Three Genuinely Different Layout Directions

Create 3 directions that vary the spatial grammar, not just colors.

Each direction should include:

- Concept name
- Product goal fit
- Spatial DNA summary
- What it borrows from structure references
- What it borrows from vibe references
- Key layout decisions
- Risks or tradeoffs
- Responsive posture

The three directions should differ in meaningful ways, such as:

- one text-led and spacious, one image-led and immersive, one modular and rhythmic
- one symmetrical and calm, one editorial and asymmetrical, one compact but warm
- one scroll-story structure, one strong above-the-fold composition, one section-by-section reading flow

Avoid fixed vibe presets. The directions should emerge from the user's references and product constraints.

### 8. Generate Standalone Previews Before Production Changes

For each direction, generate a standalone preview artifact before modifying the user's project. The preview should show the page-level composition, not only tokens or isolated components.

The preview should make visible:

- section order and rhythm
- density and whitespace
- hierarchy and focal points
- image or media behavior
- card or surface logic
- motion and interaction tempo when relevant
- responsive intent at a high level

Use realistic content from the user's product when available. If content is unknown, label assumptions clearly.

### 9. Review Rendered Output and Revise

After rendering, inspect the output as a designer would. Revise if the result:

- looks like a generic SaaS landing page despite the brief
- copies a non-UI reference literally
- ignores the product's required content or task flow
- has a mood that conflicts with the page type
- makes all three directions feel too similar
- uses decorative spacing that harms clarity
- fails on smaller screens

State what changed after review. The final output should explain why the spatial direction fits both the user's feeling and the product surface.

## Interaction Principles

- **Design System is the vocabulary. Spatial Vibe is the grammar.**
- Translate before generating: reference signals must become product-aware layout decisions.
- Treat anti-references as first-class input.
- Do not let atmosphere override usability.
- Do not copy non-UI sources literally.
- Do not offer preset style templates or a fixed vibe taxonomy.
- Show the user rendered alternatives before touching production code.
