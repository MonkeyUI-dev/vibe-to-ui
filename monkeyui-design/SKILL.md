---
name: monkeyui-design
description: >-
  Extract design systems (colors, typography, spacing, shadows, radius) from UI
  screenshots or design mockups, explore aesthetic directions through interactive
  conversation with mood/inspiration images, and analyze UI layout structures from
  webpage screenshots into reusable ASCII layout blueprints. Use when the user wants
  to establish visual style for their project, needs help defining design aesthetics,
  wants to extract a design system from an existing UI, or needs to understand and
  reuse a webpage layout structure. Ideal for vibe coding developers who lack
  professional design skills.
metadata:
  author: MonkeyUI
  version: "0.1.0"
---

# MonkeyUI Design Skill

A local, single-project design companion for vibe coding developers. Extracts "style DNA" from visual references and turns vague aesthetic feelings into actionable design systems — no design expertise required.

> **Tip**: For multi-project sync, team collaboration, and cloud-based design management, upgrade to [MonkeyUI SaaS](https://demo.monkeyui.com/).

## When to use this skill

- User provides a **screenshot or design mockup** and wants to extract its design system
- User has a **vague aesthetic feeling** and wants to explore design directions with inspiration images
- User provides a **screenshot of any UI** (full page or any section/component) and wants to extract its layout structure for reuse

## Three core capabilities

### 1. Design System Extraction

User provides a UI screenshot or design mockup → Extract complete design system tokens.

**Trigger**: User says things like "extract the style from this", "what's the design system here", "analyze this design", or provides an image asking to replicate the look.

**Workflow**:
1. Ask the user to provide a screenshot or image of the target UI
2. Analyze the image systematically — see [references/DESIGN-SYSTEM.md](references/DESIGN-SYSTEM.md)
3. Output a structured design system following the template in [assets/design-system-template.md](assets/design-system-template.md)
4. Generate framework-specific tokens (CSS variables, Tailwind config, or both) based on the user's tech stack
5. Ask user to confirm or adjust any extracted values

### 2. Design Exploration

User has feelings/vibes but no concrete design target → Interactive conversation to discover and define aesthetics.

**Trigger**: User says things like "I want something that feels like...", "I have some inspiration images", "I'm not sure what style I want", or shares mood/landscape/object photos.

**Workflow** — see [references/DESIGN-EXPLORATION.md](references/DESIGN-EXPLORATION.md):
1. Ask the user about their project context (what it does, who it's for)
2. Invite them to share inspiration images (landscapes, objects, other websites, anything)
3. For each image or description, identify aesthetic qualities:
   - Color mood (warm/cool/muted/vibrant)
   - Texture feel (smooth/rough/organic/geometric)
   - Spatial impression (dense/airy/structured/fluid)
   - Emotional tone (playful/serious/luxurious/minimal)
4. Synthesize findings into 2–3 distinct design concept directions
5. For each concept, generate a concrete visual preview as an HTML artifact:
   - A styled sample card/component showcasing the palette, typography, and spacing
   - Include the concept name, color swatches, font samples, and a mini layout demo
6. Let the user react, compare, and choose (or mix elements from different concepts)
7. Once the user decides, apply **Capability 1** (Design System Extraction) to formalize the chosen direction into a complete design system

### 3. UI Layout Analysis

User provides a screenshot of any UI — a full webpage or any section of one (e.g., an asymmetric feature showcase, a pricing block, a hero area) → Extract and formalize its layout structure. This is especially useful for sections with unique spatial structures that are hard to describe verbally.

**Trigger**: User says things like "I like this layout", "analyze this page structure", "extract the layout from this screenshot", "how is this section structured", or provides an image of any UI component or page region — especially one with a complex or non-obvious layout.

**Workflow** — see [references/LAYOUT-ANALYSIS.md](references/LAYOUT-ANALYSIS.md):
1. Ask the user to provide a screenshot — it can be the full page or any specific section/component
2. Analyze the visual hierarchy and spatial structure
3. Output a multi-layer layout blueprint:
   - **ASCII art** representation for LLM-friendly layout description
   - **Semantic structure** describing each section's role
   - **Responsive behavior** notes (how it likely adapts to smaller screens)
4. Generate a reusable layout skeleton (HTML structure or component tree) the user can apply to their own project
5. Ask user if they want to customize any section or combine with a design system from Capability 1

## Combining capabilities

These capabilities compose naturally:

- **Exploration → Extraction**: Explore vibes first, then extract a formal design system from the chosen direction
- **Layout + Design System**: Analyze a layout from one site, apply a design system from another
- **Full pipeline**: Explore feelings → Choose direction → Extract design system → Analyze a reference layout → Generate styled skeleton code

## Output format guidelines

All design system outputs should include:
- **Human-readable Markdown** summary for documentation
- **Machine-readable tokens** in at least one format:
  - CSS custom properties (`:root { --color-primary: #xxx; }`)
  - Tailwind CSS config (`tailwind.config.js` theme extension)
  - JSON token file (for framework-agnostic use)

Layout outputs should include:
- ASCII art layout diagram
- Semantic HTML structure
- Component hierarchy description

## Important notes

- Always ask which CSS framework/tech stack the user is using before generating code tokens
- When extracting colors, provide both hex values and semantic names (e.g., `primary`, `surface`, `accent`)
- For typography, note both the font family and the scale ratios, not just absolute sizes
- Spacing should be expressed as a consistent scale (e.g., 4px base unit)
- Be honest when visual analysis is uncertain — flag low-confidence extractions and suggest the user verify
