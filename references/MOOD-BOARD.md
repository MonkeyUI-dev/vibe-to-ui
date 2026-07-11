# Mood Board Guide

## Overview

A mood board is a curated visual collage that captures the aesthetic direction of a project before formal design begins. It is the designer's most powerful intermediate artifact — a bridge between vague feelings and concrete design decisions. Unlike a design system (which is prescriptive tokens) or an aesthetic analysis (which is descriptive prose), a mood board is **evocative and compositional**: it shows how colors, textures, typography, imagery, and spatial rhythms **feel together**.

This guide covers generating interactive HTML mood boards that serve as a tangible design reference point — for the user to validate direction, for collaborators to align on vision, and for the agent to anchor subsequent design system extraction.

## When to Generate a Mood Board

A mood board is the right tool when:

- The user has collected **multiple reference images** and wants to see them synthesized into a cohesive visual story
- The user has finished **Design Exploration** (Capability 2) and wants a visual anchor before formalizing tokens
- The user wants a **shareable visual artifact** that communicates design intent without requiring design vocabulary
- The user mentions "mood board", "inspiration board", "visual direction board", or similar terms
- The user is deciding between design directions and wants a **side-by-side comparison** in mood board format
- The user wants to **document the "why" behind design choices** — mood boards tell the story that token lists cannot

## Mood Board Anatomy

A well-constructed mood board is not a random collage. It has intentional structure:

### 1. Theme Title & Mood Line

Every mood board needs a name and a short emotional descriptor:

```
Theme: "Coastal Clarity"
Mood: Serene · Spacious · Confident · Luminous
```

The title should be evocative (2–3 words), and the mood line captures 3–5 emotional keywords separated by ` · `.

### 2. Hero Image / Dominant Visual

One image or visual element that anchors the entire board. It occupies the most space and sets the emotional center of gravity. This could be:

- A landscape or environment photo that captures the mood
- A UI screenshot that best represents the target aesthetic
- An abstract texture or pattern that defines the material language

### 3. Color Story

Not just swatches — a **color narrative**:

- **Primary palette**: 3–5 dominant colors extracted from the collected references, displayed as large blocks showing their relative weight/proportion
- **Accent moments**: 1–2 accent colors shown smaller, indicating they appear sparingly
- **Color relationships**: How colors sit next to each other matters — show adjacencies that will appear in the actual UI (e.g., text-on-background pairs, accent-on-neutral pairs)

### 4. Typography Specimens

Real text samples (not just font names) that show character:

- A headline set in the proposed heading typeface, using words that echo the project's tone
- A body paragraph showing reading rhythm and density
- A label or caption showing the small-text treatment
- Font pairing relationship: how heading and body fonts contrast or complement

### 5. Texture & Material Samples

Visual fragments that capture surface quality:

- Background textures (grain, gradient, solid, pattern)
- Surface treatments (glass, paper, matte, metallic)
- Border and edge treatments (sharp, soft, glowing, invisible)
- Shadow character (none, subtle, dramatic, colored)

### 6. Supporting Imagery

3–6 secondary images that reinforce the mood without dominating:

- Environmental/atmospheric photos
- Detail crops showing relevant textures or patterns
- Abstract shapes or geometric compositions
- Object photography that echoes the material language

### 7. Spatial & Motion Cues

Visual hints about layout rhythm and motion personality:

- A note on spacing feel (dense / balanced / generous)
- A note on motion character (still / subtle / flowing / energetic)
- Optional: a small animated element in the HTML mood board that previews the motion feel (e.g., a gently pulsing accent shape, a slow-drifting gradient)

### 8. Keywords & Design Principles

3–5 short design principles or guiding statements that anchor the aesthetic philosophy:

```
"Let the content breathe"
"Warmth through material, not decoration"
"Motion should feel like settling, not bouncing"
```

## Mood Board Layout Patterns

The spatial composition of the mood board itself communicates aesthetic intent. Choose a layout that echoes the project's spatial personality:

### Grid Collage (for structured, geometric aesthetics)

```
┌──────────────┬────────┐
│              │  img2  │
│  Hero Image  ├────────┤
│              │  img3  │
├───────┬──────┴────────┤
│ Color │  Typography   │
│ Story │  Specimens    │
├───────┼───────────────┤
│ img4  │   Keywords    │
└───────┴───────────────┘
```

### Organic Flow (for warm, natural, editorial aesthetics)

```
┌────────────────────────┐
│      Hero Image        │
├──────┬─────┬───────────┤
│ img2 │img3 │  Color    │
│      │     │  Story    │
├──────┴─────┼───────────┤
│ Typography │   img4    │
├────────────┴───────────┤
│       Keywords         │
└────────────────────────┘
```

### Asymmetric Editorial (for bold, modern, magazine-feel aesthetics)

```
┌────────┬───────────────┐
│        │   img2        │
│ Hero   ├───────┬───────┤
│ Image  │ Color │ img3  │
│        │ Story │       │
├────────┴───────┴───────┤
│ Typography + Keywords  │
└────────────────────────┘
```

### Minimal Centered (for clean, restrained, luxury aesthetics)

```
        ┌──────────┐
        │  Hero    │
        │  Image   │
        └──────────┘
   ┌──────┐    ┌──────┐
   │ img2 │    │ img3 │
   └──────┘    └──────┘
     Color Palette Swatches
      Typography Specimen
         Keywords
```

## HTML Mood Board Generation

### Output Format

Generate a **self-contained HTML page** that the user can open in a browser. This is the mood board artifact.

### Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mood Board — [Theme Name]</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <!-- Load proposed fonts -->
  <style>
    /* All styles inline — the mood board must be self-contained */

    /* === Board Layout === */
    /* Use CSS Grid to create the collage composition */
    /* Choose a layout pattern that echoes the project's spatial personality */

    /* === Color Swatches === */
    /* Show color blocks with proportional sizes reflecting intended usage weight */

    /* === Typography === */
    /* Real text samples, not font names — show the fonts in action */

    /* === Motion Hint (optional) === */
    /* A single subtle animation that previews the motion personality */
    /* e.g., a slow-drifting gradient, a gently pulsing accent shape */

    @media (prefers-reduced-motion: reduce) {
      * { animation: none !important; transition: none !important; }
    }
  </style>
</head>
<body>
  <!-- Theme Header -->
  <header>
    <h1>[Theme Name]</h1>
    <p class="mood-line">[keyword1] · [keyword2] · [keyword3]</p>
  </header>

  <!-- Mood Board Grid -->
  <main class="mood-grid">
    <!-- Hero visual — largest element -->
    <!-- Color story — proportional swatches -->
    <!-- Typography specimens — real text samples -->
    <!-- Texture/material samples — CSS-generated or described -->
    <!-- Supporting imagery — placeholder frames with descriptions -->
    <!-- Spatial & motion cues -->
  </main>

  <!-- Design Principles -->
  <footer>
    <!-- 3–5 guiding statements -->
  </footer>
</body>
</html>
```

### Critical Rules

1. **Self-contained**: All styles must be inline or in a `<style>` block. No external CSS files (Google Fonts `<link>` is the one exception).
2. **Real visual language**: Use the actual proposed colors, fonts, spacing, and radii on the mood board itself — the board's own styling IS a design preview.
3. **Placeholder imagery**: Since the agent cannot embed the user's reference photos, use CSS-generated visual blocks (gradients, patterns, solid colors with descriptive labels) as image stand-ins. Label each block with what it represents (e.g., "ocean horizon photo", "weathered concrete texture"). If the user provides image URLs or has images in their project, reference those directly.
4. **Typography in action**: Show real text — a headline, a paragraph, a label — not just font names. The text content should echo the project's domain if known.
5. **Color proportions matter**: Don't show five equal swatches. Show the primary background color as the largest block, accent as a small chip. The visual weight on the mood board should mirror intended usage.
6. **One motion hint**: Include at most one subtle CSS animation that captures the motion personality (a slow gradient shift, a gentle opacity pulse, a floating element). This should feel ambient, not distracting.
7. **The board IS the pitch**: It should be polished enough to share with stakeholders. Visual quality matters.

### Handling User-Provided and Generated Images

When building a mood board:

- **Live site references**: If the user shared a website URL, prefer **selective agent captures** or the site’s OG/hero asset URLs from [INSPIRATION-SOURCES.md](INSPIRATION-SOURCES.md) over embedding a multi‑MB full-page screenshot
- **Generated assets (preferred when tools exist)**: Generate hero + supporting images for the active `concept_id` before finalizing HTML. Use preview resolution during exploration; see [VISUAL-ASSET-GENERATION.md](VISUAL-ASSET-GENERATION.md) for page-type asset packs and prompt rules.
- **Review surface**: When multiple generated assets exist, include a contact sheet or mood board wall that lets the user compare combinations such as `A2 hero + B1 empty state + C3 icon set`.
- **If images are accessible via URL**: Embed them directly in the mood board using `<img>` tags
- **If images are local files in the project**: Reference them with relative paths
- **If images were shared inline in chat** (not as files) and cannot be saved: Use CSS-generated visual placeholders with descriptive text labels that capture what the image conveyed (e.g., a gradient block labeled "soft morning light over ocean — warm golds into cool blues")
- **On Apply**: Final-resolution assets copy into `public/design-assets/` per [APPLY-DESIGN.md](APPLY-DESIGN.md) Step 3.5 — do not leave exploration-only preview paths in the user's production pages without updating paths

### Asset Review Wall

When generated assets are part of the direction, the mood board should include a review wall, not just a collage.

Required elements:

- **Asset tiles**: each tile shows preview image, asset id, role, intended placement, and preview/final state
- **Combination row**: suggested pairings such as `A1 hero + B2 feature + C1 icon set`
- **Placement miniatures**: small UI compositions showing copy, CTA, and image scale together
- **Safe-zone overlays**: for hero and social assets, show where headline/CTA can sit without collision
- **Reject/iterate notes**: short labels such as "too busy behind copy" or "best thumbnail read"

The review wall should help the user make a design decision. Avoid presenting generated images as a pile of files.

### Placement Preview Rules

For assets that will appear in UI, show how the image works with surrounding content:

- Hero images must be previewed with representative H1, supporting copy, primary CTA, and responsive stacking note
- Feature images must sit beside the feature title/body they support
- Empty-state images must leave the action button dominant
- Illustrated icon sets must be previewed in feature cards or launch/social contexts, not as tiny nav icons
- Social/OG assets must be checked at thumbnail scale

If the asset hurts readability, CTA clarity, or content hierarchy in the placement preview, regenerate it or move it to a different role.

### Mood Board Variants for Comparison

When the user is choosing between directions, generate **multiple mood boards** — one per concept. Each should:

- Be a separate HTML file (e.g., `mood-board-coastal-clarity.html`, `mood-board-urban-pulse.html`)
- Use the same structural format but with distinctly different visual language
- Be clearly labeled with concept name and mood keywords
- Feel visually different enough that the user can react viscerally — if two boards look similar, the concepts aren't distinct enough

## Mood Board in the Design Workflow

### As Input to Design System Extraction

Once the user confirms a mood board direction, the mood board becomes **source material** for Capability 1 (Design System Extraction):

- Colors on the mood board are formalized into color tokens
- Typography specimens become the type scale
- Spacing feel becomes the spacing system
- Motion hints become the motion system
- Material textures become shadow, border, and surface tokens

### As Input to Design Exploration

A mood board can also be generated **during** Capability 2 (Design Exploration) as a mid-process checkpoint:

- After Phase 3 (Concept Synthesis) and before Phase 4 (Visual Preview), generate a mood board to let the user feel the direction before seeing a UI component preview
- This is especially useful when the user's references are more atmospheric (photos, music) than UI-specific

### As a Standalone Artifact

Sometimes the user just wants a mood board — no design system, no code. That's valid. The mood board itself is a meaningful design deliverable.

## Interaction Principles

- **Curate, don't dump**: A mood board is not "all the references arranged on a page." It's a selective, intentional composition. Omit references that don't serve the narrative.
- **Tell a visual story**: The board should have a reading flow — hero image grabs attention, color and type reinforce direction, keywords summarize the philosophy.
- **Match the board's style to its content**: If the mood is "minimal and restrained," the board itself should be clean and spacious. If the mood is "rich and layered," the board can be denser and more collage-like.
- **Name everything**: Unnamed mood boards are forgettable. A good name ("Coastal Clarity", "Midnight Industrial", "Soft Machine") makes the direction memorable and discussable.
- **Invite reaction, not approval**: Ask "How does this feel?" not "Is this correct?" Mood boards are emotional tools.
