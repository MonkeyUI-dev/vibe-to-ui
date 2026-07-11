# Spatial Vibe Exploration Guide

## Overview

Spatial Vibe Exploration translates fuzzy aesthetic intent into page-level layout decisions. A design system gives the agent the vocabulary: color, type, spacing, radius, motion, and component tokens. Spatial Vibe gives the grammar: how content breathes, where attention lands, how sections relate, and what rhythm the page should create.

Use this guide when the user says things like:

- "Make this landing page feel more relaxed."
- "I want an editorial, magazine-like feeling."
- "I like the vibe of this cafe, this film still, and this album cover."
- "Do not make it look like a generic SaaS landing page."

Inspiration can come from anywhere: **website URLs**, apps, photography, landscapes, architecture, interiors, magazines, posters, packaging, fashion, album covers, film stills, illustrations, music, or video. For live sites, prefer a URL and follow [INSPIRATION-SOURCES.md](INSPIRATION-SOURCES.md) instead of asking for a full-page screenshot. Non-UI references should be translated into transferable design signals, not copied literally.

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

Spatial DNA is the working grammar for the page. Derive it from the product goal, UX constraints, and references. When the user leads with mood keywords or music instead of images, translate those first using the mapping aids in [Translating Keywords and Music Into Spatial Signals](#translating-keywords-and-music-into-spatial-signals). Do not use preset style templates or a fixed vibe taxonomy.

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

Use whichever sketch form fits the direction, but make the sketch understandable to a non-designer. The sketch is not useful if it only contains internal shorthand such as `copy`, `cards`, `specimen`, or `story` without explaining what those blocks mean in the user's product.

**User-readable ASCII architecture sketch** — for reasoning about section order, nesting, and dominant regions:

```
┌──────────────────────────────────────┐
│ 01 NAVIGATION                         │
│    brand mark              key links  │
├──────────────────────────────────────┤
│ 02 HERO  (asymmetric 60/40)            │
│    promise copy        product visual  │
├──────────────────────────────────────┤
│ 03 LEARNING MODES (3-up cards)         │
│    collect words | review | practice   │
└──────────────────────────────────────┘
```

Every ASCII sketch must be paired with a short legend or content map:

| Label in sketch | Meaning in this product | Example content | Why it belongs here |
|-----------------|-------------------------|-----------------|---------------------|
| `promise copy` | Main value proposition | "Collect each word into a quiet place" | Establishes the emotional thesis before details |
| `product visual` | Screenshot, illustration, or product specimen | Vocabulary card / learning sheet | Grounds the abstract mood in the actual product |
| `learning modes` | User-facing ways to use the product | Collect, review, practice | Turns the page from mood into product understanding |

Rules for sketch labels:

- Prefer semantic product labels (`learning modes`, `word specimen`, `practice flow`) over generic labels (`cards`, `image`, `copy`).
- If a short label is necessary to fit the sketch, define it in the legend immediately below.
- Number the major sections (`01`, `02`, `03`) so the reading order is obvious.
- Use the user's language when possible. If the product/content is Chinese, labels may be Chinese or bilingual.
- Avoid unexplained abbreviations such as `idx`, `CTA`, `specimen`, or `copy` unless the legend defines them.
- Do not let the sketch become purely decorative ASCII. It must explain what content lives in each region and why that region exists.

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
- A mini layout sketch (ASCII block sketch or loose proportion table)
- Section order and rhythm
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

### Mode A: Compare Three Complete Layout Directions

Spatial Vibe Exploration defaults to **Mode A** when the user is exploring layout. This means all 3 directions must be comparable at the same level of detail.

Do **not** produce 3 summary cards and then fully expand only 1 direction unless the user explicitly asks for a single recommended direction. That pattern makes the workflow look incomplete: it says "3 layouts" but shows only 1 layout in detail.

For each of the 3 directions, provide the same comparison unit:

```markdown
### Direction [A/B/C]: [Name]

- **Best for**: [product goal / audience / page type fit]
- **Spatial DNA**: [density, whitespace, hierarchy, rhythm, focus]
- **Mini layout sketch**: [user-readable ASCII architecture sketch or loose proportion table]
- **Sketch legend / content map**: [what each label means in the user's product, with example content]
- **Section order**: [top-to-bottom composition]
- **Key layout decisions**: [3-5 bullets]
- **Tradeoffs / risks**: [what this direction makes harder]
- **Responsive posture**: [what collapses first, what must stay intact]
```

Then let the user choose one. Only after selection should you expand the chosen direction into a deeper implementation skeleton or formalize it into the design system document's **Spatial / Layout DNA** section.

If you decide to recommend one direction before the user chooses, label it explicitly:

```
Recommended direction: Direction B
Reason: [why it best fits the user's keywords, references, and page type]
```

The recommendation can sit above the 3-way comparison, but it must not replace the complete comparison.

### 8. Generate Standalone Previews Before Production Changes

For each direction, generate a standalone preview artifact before modifying the user's project. The preview should show the page-level composition, not only tokens or isolated components.

All 3 previews should have equal structural fidelity:

- each preview shows its own mini layout sketch or visual layout thumbnail
- each preview includes a legend or content map that explains every non-obvious sketch label
- each preview shows its own section order
- each preview explains its own spatial rhythm and density
- each preview states its own tradeoffs
- no preview should be merely a color/style card while another is the only real layout
- no preview should rely on unexplained internal shorthand that leaves the user guessing what the architecture means

The preview should make visible:

- section order and rhythm
- density and whitespace
- hierarchy and focal points
- semantic meaning of each major region
- example real content or assumptions for each major region
- image or media behavior
- card or surface logic
- motion and interaction tempo when relevant
- responsive intent at a high level

Use realistic content from the user's product when available. If content is unknown, label assumptions clearly.

For long pages, it is acceptable to create one comparison artifact containing the 3 complete directions side by side, or 3 separate artifacts. In either case, each direction must be represented as a real layout option, not just a concept blurb.

### 9. Review Rendered Output and Revise

After rendering, inspect the output as a designer would. Revise if the result:

- looks like a generic SaaS landing page despite the brief
- copies a non-UI reference literally
- ignores the product's required content or task flow
- has a mood that conflicts with the page type
- makes all three directions feel too similar
- uses labels that only the agent understands, such as unexplained `copy`, `cards`, `idx`, `specimen`, or `CTA`
- lacks a legend/content map that tells the user what each architecture block means
- uses decorative spacing that harms clarity
- fails on smaller screens

If the architecture sketch is unclear, revise the labels first. The user should be able to answer, "What content goes here, why is it here, and how do I read this page?" without needing to infer the agent's shorthand.

State what changed after review. The final output should explain why the spatial direction fits both the user's feeling and the product surface.

## Reference Fidelity: Extracting Structure From a Concrete UI

When the user provides a concrete UI reference (**website URL**, screenshot, live page, or local project) and wants its **layout structure** preserved — not just its mood translated — run this lightweight extraction before exploring directions. This satisfies Reference Fidelity Mode's promise to "first match the page type and structural feel."

When the reference is a URL, follow [INSPIRATION-SOURCES.md](INSPIRATION-SOURCES.md): read DOM/section order from the live page first; use selective captures only where layout is visually ambiguous.

This is deliberately lighter than full pixel reverse-engineering. The goal is a faithful structural read that can seed previews, not an exact reproduction.

1. **Identify sections top-to-bottom** (from the live DOM when available; or, for a partial screenshot, treat the whole image as one named section). Give each a semantic name based on what you actually see — not a canonical `header → hero → features → footer` template.
2. **Read each section's grid**: container width (full-bleed / constrained / narrow), column count or asymmetric split, alignment, stacking direction, and approximate gutter.
3. **Capture relative proportion**, not absolute coordinates, using the loose proportion-table form above. The most useful signals are relationships: which region dominates, which cards share a baseline, which row is clearly shorter, whether a block is half-width or full-width.
4. **Note layering** where elements overlap: what recedes, what floats, where depth or tension is intended.
5. **Infer responsive behavior**: which side-by-side relationships stack first, which spatial relationships are essential to preserve, what likely hides or simplifies on small screens.
6. **Produce a semantic skeleton** reverse-engineered from this specific reference — class names derived from the section names above, reflecting the actual structure rather than a preset page template.

Feed this structural read into the Spatial DNA (Step 5) as the **structure reference**, then explore directions that adapt mood, density, and material while staying recognizably descended from the reference's composition. Record the result in the design system document's **Spatial / Layout DNA** section.

## Translating Keywords and Music Into Spatial Signals

References are not the only input. Users often lead with **mood keywords** ("relaxed", "distinctive", "neutral-cool", "premium", "free") or with **music**. Translate these into spatial decisions the same way you translate images — they feed the Spatial DNA in Step 5. Treat keywords and music as vibe references, always bounded by the page type.

### Keywords → Spatial DNA

Map the user's own words to spatial decisions instead of leaving them as adjectives. Keep their language; translate the consequence.

| Keyword family | Spatial translation | Watch-outs |
|----------------|---------------------|------------|
| Relaxed / calm / unhurried (松弛) | Generous whitespace, slow vertical rhythm, fewer competing focal points, lower density | Do not let openness become emptiness that hides the primary action |
| Distinctive / characterful (个性) | Asymmetry, deliberate offsets, broken-grid moments, varied section cadence | Keep one stable anchor so personality does not read as chaos |
| Neutral-cool / understated (中性酷) | Restrained spacing, strong alignment, controlled negative space, quiet hierarchy | Avoid coldness that erases warmth or invitation where the product needs it |
| Premium / high-end (高级) | Large negative space, few elements per view, generous margins, single strong focal plane | Sparse ≠ empty; each remaining element must earn its weight |
| Free / open (自由) | Asymmetric balance, overlapping or layered surfaces, non-uniform rhythm | Preserve reading order and task flow under the looseness |
| Editorial / magazine | Asymmetric columns, wide margins, mixed image/text blocks, deliberate cadence shifts | Maintain a consistent baseline so it reads composed, not random |
| Cinematic | Strong focal axis, horizontal bands, large negative space, controlled reveal tempo | Reserve for surfaces that can afford slower information delivery |
| Playful / energetic | Varied module sizes, rhythmic alternation, rounded or bouncy surfaces | Keep enough order for scanability on denser page types |
| Dense / operational | Compact module grid, stable alignment, predictable scan paths | Density must stay legible; protect state clarity and spacing discipline |

Combine families when the user gives several keywords (for example "relaxed + distinctive + neutral-cool"): reconcile them into one Spatial DNA, and note any tension you had to resolve.

### Music → Spatial Signals

When the user shares a recording, song, or musical feeling, map its sonic qualities to spatial decisions (this mirrors the visual mapping in [DESIGN-EXPLORATION.md](DESIGN-EXPLORATION.md), but lands on layout instead of color/type).

| Musical quality | What to listen for | Spatial signal |
|-----------------|--------------------|----------------|
| **Tempo** | Slow ballad vs. fast track | Slow vertical rhythm and longer sections ↔ tighter, faster section cadence |
| **Rhythm** | Steady beat vs. syncopated / free | Regular, aligned grid ↔ broken-grid, asymmetric offsets |
| **Dynamics** | Even vs. wide soft-to-loud range | Uniform section weight ↔ strong contrast between dominant and quiet sections |
| **Texture / layers** | Sparse solo vs. dense ensemble | Low content density, much whitespace ↔ layered, information-rich composition |
| **Space / reverb** | Dry and close vs. roomy and reverberant | Compact, intimate spacing ↔ expansive margins and breathing room |
| **Build-ups / drops** | Gradual swells, sudden drops | Section transitions and reveal tempo — scroll chapters, soft fades, or hard cuts |
| **Register** | High and airy vs. deep low-end | Light visual gravity, content sitting high ↔ grounded, weighty anchoring |

Example translation:

```
Music: slow, spacious R&B with sparse instrumentation, warm low-end, lots of room reverb.
Spatial signals:
- Tempo: slow -> unhurried vertical rhythm, long sections
- Texture: sparse -> low density, generous whitespace
- Space: reverberant -> wide margins, strong breathing room
- Register: warm low-end -> grounded anchoring, weight near the base of sections
-> Spatial DNA leaning: relaxed, image-led, large negative space, slow section cadence
```

Always reconcile keyword and music signals with the page type before locking the Spatial DNA: a dense B-end workbench stays scannable even when the music says "slow and spacious."

## Interaction Principles

- **Design System is the vocabulary. Spatial Vibe is the grammar.**
- Translate before generating: reference signals must become product-aware layout decisions.
- Treat anti-references as first-class input.
- Do not let atmosphere override usability.
- Do not copy non-UI sources literally.
- Do not offer preset style templates or a fixed vibe taxonomy.
- Show the user rendered alternatives before touching production code.
