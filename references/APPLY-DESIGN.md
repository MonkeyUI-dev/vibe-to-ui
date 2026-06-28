# Apply Design to Project Guide

## Overview

This guide covers the final step in the collaborative design workflow: applying a confirmed design direction to the user's actual project. Before reaching this stage, the user has gone through an exploration phase — reviewing standalone concept previews, mood boards, or design system previews — and has chosen (or adjusted) a direction they are satisfied with.

The core principle is **explore first, apply later**. The agent never modifies project files during exploration. All concept drafts, mood boards, and preview pages are generated as standalone artifacts. Only when the user explicitly confirms a direction does the agent apply the design to the project.

## When to Use

- The user has reviewed concept previews or a design system preview and says "apply this", "use this one", "let's go with Concept B", or similar
- The user has adjusted a concept ("make it warmer", "use the typography from Concept A") and confirms the adjusted version
- The user explicitly asks to apply design tokens, styles, or a design system to their project
- The user says "apply to project", "integrate this", "use this design in my project", or similar

## Two Application Layers

Applying a confirmed direction can touch **two distinct layers**. Clarify which the user wants — frequently both:

- **Token layer** — framework-agnostic design values: color, typography, spacing, radius, shadow, motion.
- **Layout layer** — the confirmed **Spatial / Layout DNA** and section composition explored in Capability 3 (see [SPATIAL-VIBE.md](SPATIAL-VIBE.md)). This is the page-level grammar: section order, density, hierarchy, focal points, card/surface logic, image behavior, and responsive collapse logic.

Tokens are the vocabulary; layout is the grammar. Applying tokens alone restyles existing structure; applying layout reshapes the structure itself. Many users want both, wired together.

## Prerequisites

Before applying, the following must be confirmed:

1. **A confirmed design direction** — one of:
   - A chosen concept from Design Exploration (one of 3 concept previews)
   - A confirmed mood board direction
   - A design system preview from Design System Extraction
   - A confirmed layout direction from Spatial Vibe Exploration (one of 3 layout previews)
   - A user-adjusted variant of any of the above

2. **A formalized design system** — the confirmed direction must have been formalized into structured tokens:
   - Color palette (hex values with semantic roles)
   - Typography scale (font families, sizes, weights, line heights)
   - Spacing system (base unit and scale)
   - Border radius strategy
   - Shadow depth tokens
   - Motion system tokens (duration, easing, density, reduced-motion fallback)

   If the design system has not yet been formalized, do so first using Design System Extraction (Capability 1) before applying.

3. **A confirmed Spatial / Layout DNA** (when applying the layout layer) — the chosen layout direction recorded as Spatial / Layout DNA plus section order, following the template's Spatial / Layout DNA section. If only tokens are being applied, this can be skipped.

4. **User's tech stack** — know which format(s) the user needs:
   - CSS custom properties
   - Tailwind CSS config
   - JSON token file
   - Or a combination

## Apply Workflow

### Step 1: Confirm the Scope

Before touching any project files, confirm with the user:

```
Questions to ask:
- Which layer(s) should I apply? (design tokens, the layout/structure, or both)
- Which parts of the design system? (full system, only colors, only motion, etc.)
- Where should the tokens go? (new file, existing config, specific directory)
- For layout: new page/section structure, or restructure an existing page?
- Should I update existing components or only create the token files?
- Are there any existing styles or structure I should preserve or merge with?
```

Keep it conversational — 1–2 questions at a time.

### Step 2: Audit the Project

Examine the user's project to understand what exists:

- **Framework/build tool**: React, Vue, Svelte, Next.js, Astro, plain HTML, etc.
- **CSS approach**: Tailwind, CSS Modules, styled-components, vanilla CSS, etc.
- **Existing design tokens**: Check for existing `tailwind.config.*`, CSS variable files, theme files, or token JSON
- **Existing icon system**: Check `package.json`, imports, shared icon wrappers, and component conventions to identify the locked UI icon library or custom SVG pattern
- **File conventions**: Where are styles stored? What naming patterns are used?

Respect existing project conventions. Adapt the output to fit, not the other way around.

### Step 3: Generate Token Files

Based on the confirmed design system and the user's tech stack, generate the appropriate token files:

#### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-primary: #xxx;
  --color-secondary: #xxx;
  /* ... all color tokens */

  /* Typography */
  --font-heading: 'Font Name', sans-serif;
  --font-body: 'Font Name', sans-serif;
  /* ... all typography tokens */

  /* Spacing */
  --space-xs: Xpx;
  --space-sm: Xpx;
  /* ... all spacing tokens */

  /* Border Radius */
  --radius-sm: Xpx;
  --radius-md: Xpx;
  /* ... all radius tokens */

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(...);
  /* ... all shadow tokens */

  /* Motion */
  --duration-instant: Xms;
  --duration-fast: Xms;
  --duration-normal: Xms;
  --duration-slow: Xms;
  --easing-default: cubic-bezier(...);
  /* ... all motion tokens */
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-instant: 0ms;
    --duration-fast: 0ms;
    --duration-normal: 0ms;
    --duration-slow: 0ms;
  }
}
```

#### Tailwind CSS Config

Extend or create `tailwind.config.js` / `tailwind.config.ts` with the extracted tokens.

#### JSON Token File

Generate a structured `design-tokens.json` for framework-agnostic consumption.

### Step 3.5: Deploy Visual Assets (when confirmed)

Follow [VISUAL-ASSET-GENERATION.md](VISUAL-ASSET-GENERATION.md) when the user wants imagery in the project.

1. **Choose destination** — default `public/design-assets/` (Next.js, Vite, Astro) or `static/design-assets/` (SvelteKit) or `src/assets/design-assets/` when the project has no `public/` folder. Match existing conventions from Step 2.

2. **Finalize files**:
   - Regenerate at **final resolution** if exploration used previews only
   - Copy WebP/PNG/SVG files into the destination folder
   - Copy or merge `design-assets.manifest.json` to project root or beside assets (document the chosen location)
   - For illustrated icon sets, copy only confirmed assets and preserve the same `concept_id`, `style_seed`, and `visual_family_preset`
   - Run the manifest validator; do not Apply failed entries unless the user explicitly accepts the listed issues

3. **Wire components**:
   - Update hero, feature, and empty-state components with correct public paths (`/design-assets/...`)
   - Set `alt` from manifest entries; decorative images use `alt=""`
   - Do not inline multi-megabyte base64 in source files
   - Do not wire raster illustrated icons into 16–24px navigation, form, table, or toolbar controls unless the user explicitly requested image-based UI icons
   - Use each asset's placement spec (`slot`, `purpose`, `size_rule`, `copy_safe_zone`, `responsive_behavior`) when deciding layout, crop, and size
   - Verify the asset does not overlap H1 text, CTA controls, nav, forms, data tables, or other primary content

4. **Extend design system doc** — add the Icon System and Visual Assets tables from [design-system-template.md](../assets/design-system-template.md) with live paths

5. **Update DESIGN.md** — passively record `icon_system`, `illustrated_icon_system`, visual family rules, manifest path, review surface path, selected combination, placement notes, validation status, confirmed assets, and regeneration notes when `DESIGN.md` exists or is created for the workflow

6. **Verify** — every manifest `path` resolves to an existing file; no broken relative links from exploration artifact folders; small UI icons still use the locked library or custom SVG strategy; production pages do not reference preview-only assets

If generation tools are unavailable at apply time, apply tokens only and tell the user which manifest entries still need images.

### Step 4: Integrate Tokens into the Project

Apply the generated tokens to the user's project:

1. **Create or update token files** in the appropriate project location
2. **Update config files** (e.g., `tailwind.config.js`) if applicable
3. **Add font imports** if new fonts are required (Google Fonts `<link>` or `@import`)
4. **Preserve existing styles** — merge with, don't overwrite, existing tokens unless the user explicitly asks to replace
5. **Preserve icon consistency** — do not introduce a new icon library when an adequate locked library or custom SVG pattern already exists

### Step 4.5: Consumer App Application Checks

When the primary page type is Consumer app, also follow [CONSUMER-APP-DESIGN.md](CONSUMER-APP-DESIGN.md) before summarizing:

- Verify the mobile viewport first, including safe-area spacing and thumb-zone placement.
- Confirm navigation model, selected states, badges, and app chrome icons remain vector and token-colored.
- Check the core screen, detail/create flow, and at least one non-happy state from the state matrix.
- Validate tap target sizing, pressed/disabled/loading states, input/keyboard behavior, and reduced-motion behavior.
- Deploy generated assets only to approved expressive slots such as onboarding, empty states, achievements, badges, or share cards.
- If the app is responsive web, also verify the wider layout behavior after the mobile pass.

### Step 4b: Apply the Layout / Structure (when in scope)

When the user wants the confirmed layout direction applied — not just restyled tokens — translate the Spatial / Layout DNA into real project structure:

1. **Read the confirmed Spatial / Layout DNA and section order** from the design system document (the template's Spatial / Layout DNA section)
2. **Build a semantic skeleton** that reflects the confirmed section order and composition — do NOT fall back to a generic header → hero → features → footer template. Use semantic, layout-specific names.
3. **Express the spatial grammar in code**: container widths, column structure, margins/gutters, focal axis, section rhythm, and card/surface logic that match the chosen direction's density, hierarchy, and symmetry decisions
4. **Wire the applied tokens into the structure** so color, type, spacing, and motion land on the new layout rather than living as detached variables
5. **Implement responsive collapse logic** from the DNA's responsive strategy — preserve the relationships marked essential, reflow the rest
6. **Respect existing structure** — when restructuring an existing page, preserve required content and task flow; reshape composition, not functionality, unless the user asks otherwise

If only the token layer is in scope, skip this step.

### Step 5: Summary and Verification

After applying, present a clear summary, separating token changes from structural changes:

```
Applied design summary:
- Created: [list of new files]
- Updated: [list of modified files]
- Tokens applied: [colors, typography, spacing, radius, shadows, motion]
- Layout applied: [sections/structure created or restructured, if any]
- Font imports: [fonts added, if any]

Please review the changes and let me know if you'd like to adjust anything.
```

Invite the user to review the changes — the collaborative spirit continues even after applying.

## Important Principles

1. **Never modify project files during exploration**: Concept previews, mood boards, and design system previews are standalone artifacts. The project stays untouched until the user says "apply."

2. **Confirm before applying**: Always confirm scope and location before writing to project files.

3. **Respect project conventions**: Adapt to the project's existing file structure, naming patterns, and tooling. Don't impose a new structure.

4. **Merge, don't overwrite**: If the project already has design tokens or styles, merge the new tokens with existing ones unless the user explicitly asks to replace.

5. **Show what changed**: After applying, clearly list what files were created or modified. The user should never be surprised by changes.

6. **Keep it reversible**: Where possible, make changes that are easy to undo — separate token files are preferable to scattered inline modifications.

7. **Iterate after applying**: The user may want to adjust after seeing the design in their actual project context. Be ready to refine.
