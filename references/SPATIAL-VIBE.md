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

The grid governs the *final rendered page*, not the agent's reasoning:

- Do not display grid lines in the finished preview.
- Do not turn it into a fixed 12-column template.
- Do not let the result look mechanically gridded unless the Spatial DNA calls for that.
- The grid is a means, not the deliverable — the page is the deliverable.

However, **do produce a lightweight, disposable structure sketch before generating the HTML**. Jumping straight from prose Spatial DNA to a final page tends to drift into generic, templated layouts. A quick throwaway sketch forces the spatial decisions to become concrete and gives you something to check the render against. It is a scratchpad, not a spec — rough values are intentional, and it is discarded once the preview exists.

Use whichever sketch form fits the direction:

**ASCII block sketch** — for reasoning about section order, nesting, and dominant regions:

```
┌──────────────────────────────────────┐
│ NAV        [logo]            [link x3] │
├──────────────────────────────────────┤
│ HERO  (asymmetric 60/40)               │
│   [big headline]      [inset visual]   │
├──────────────────────────────────────┤
│ FEATURES (3-up, equal weight)          │
│   [card] [card] [card]                 │
└──────────────────────────────────────┘
```

**Loose proportion table** — for reasoning about relative weight and rhythm (±10–15% is fine; the goal is spatial feel, not pixel replication):

| Region | approx width% | approx height% | Spatial feel |
|--------|---------------|----------------|--------------|
| Hero headline | ~55% | ~40% | Dominant, left-anchored |
| Hero visual | ~40% | ~40% | Floats right, same baseline |
| Feature row | ~100% | ~30% | Shorter band, even cadence |

Keep the sketch private or clearly labeled as a throwaway alignment aid. Do not present it as the final design, do not let it become a reusable template, and discard it once the rendered preview exists.

Derive the grid (and the sketch) from the Spatial DNA:

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

After rendering, compare the page against the structure sketch and check whether it feels over-templated. The grid should support the intended vibe without exposing itself as the design.

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

## Reference Fidelity: Extracting Structure From a Concrete UI

When the user provides a concrete UI reference (screenshot, live page, or local project) and wants its **layout structure** preserved — not just its mood translated — run this lightweight extraction before exploring directions. This satisfies Reference Fidelity Mode's promise to "first match the page type and structural feel."

This is deliberately lighter than full pixel reverse-engineering. The goal is a faithful structural read that can seed previews, not an exact reproduction.

1. **Identify sections top-to-bottom** (or, for a partial screenshot, treat the whole image as one named section). Give each a semantic name based on what you actually see — not a canonical `header → hero → features → footer` template.
2. **Read each section's grid**: container width (full-bleed / constrained / narrow), column count or asymmetric split, alignment, stacking direction, and approximate gutter.
3. **Capture relative proportion**, not absolute coordinates, using the loose proportion-table form above. The most useful signals are relationships: which region dominates, which cards share a baseline, which row is clearly shorter, whether a block is half-width or full-width.
4. **Note layering** where elements overlap: what recedes, what floats, where depth or tension is intended.
5. **Infer responsive behavior**: which side-by-side relationships stack first, which spatial relationships are essential to preserve, what likely hides or simplifies on small screens.
6. **Produce a semantic skeleton** reverse-engineered from this specific reference — class names derived from the section names above, reflecting the actual structure rather than a preset page template.

Feed this structural read into the Spatial DNA (Step 5) as the **structure reference**, then explore directions that adapt mood, density, and material while staying recognizably descended from the reference's composition. Record the result in the design system document's **Spatial / Layout DNA** section.

## Interaction Principles

- **Design System is the vocabulary. Spatial Vibe is the grammar.**
- Translate before generating: reference signals must become product-aware layout decisions.
- Treat anti-references as first-class input.
- Do not let atmosphere override usability.
- Do not copy non-UI sources literally.
- Do not offer preset style templates or a fixed vibe taxonomy.
- Show the user rendered alternatives before touching production code.
