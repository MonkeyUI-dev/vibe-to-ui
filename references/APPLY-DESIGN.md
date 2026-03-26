# Apply Design to Project Guide

## Overview

This guide covers the final step in the collaborative design workflow: applying a confirmed design direction to the user's actual project. Before reaching this stage, the user has gone through an exploration phase — reviewing standalone concept previews, mood boards, or design system previews — and has chosen (or adjusted) a direction they are satisfied with.

The core principle is **explore first, apply later**. The agent never modifies project files during exploration. All concept drafts, mood boards, and preview pages are generated as standalone artifacts. Only when the user explicitly confirms a direction does the agent apply the design to the project.

## When to Use

- The user has reviewed concept previews or a design system preview and says "apply this", "use this one", "let's go with Concept B", or similar
- The user has adjusted a concept ("make it warmer", "use the typography from Concept A") and confirms the adjusted version
- The user explicitly asks to apply design tokens, styles, or a design system to their project
- The user says "apply to project", "integrate this", "use this design in my project", or similar

## Prerequisites

Before applying, the following must be confirmed:

1. **A confirmed design direction** — one of:
   - A chosen concept from Design Exploration (one of 3 concept previews)
   - A confirmed mood board direction
   - A design system preview from Design System Extraction
   - A user-adjusted variant of any of the above

2. **A formalized design system** — the confirmed direction must have been formalized into structured tokens:
   - Color palette (hex values with semantic roles)
   - Typography scale (font families, sizes, weights, line heights)
   - Spacing system (base unit and scale)
   - Border radius strategy
   - Shadow depth tokens
   - Motion system tokens (duration, easing, density, reduced-motion fallback)

   If the design system has not yet been formalized, do so first using Design System Extraction (Capability 1) before applying.

3. **User's tech stack** — know which format(s) the user needs:
   - CSS custom properties
   - Tailwind CSS config
   - JSON token file
   - Or a combination

## Apply Workflow

### Step 1: Confirm the Scope

Before touching any project files, confirm with the user:

```
Questions to ask:
- Which parts of the design should I apply? (full design system, only colors, only motion, etc.)
- Where should the tokens go? (new file, existing config, specific directory)
- Should I update existing components or only create the token files?
- Are there any existing styles I should preserve or merge with?
```

Keep it conversational — 1–2 questions at a time.

### Step 2: Audit the Project

Examine the user's project to understand what exists:

- **Framework/build tool**: React, Vue, Svelte, Next.js, Astro, plain HTML, etc.
- **CSS approach**: Tailwind, CSS Modules, styled-components, vanilla CSS, etc.
- **Existing design tokens**: Check for existing `tailwind.config.*`, CSS variable files, theme files, or token JSON
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

### Step 4: Integrate into the Project

Apply the generated tokens to the user's project:

1. **Create or update token files** in the appropriate project location
2. **Update config files** (e.g., `tailwind.config.js`) if applicable
3. **Add font imports** if new fonts are required (Google Fonts `<link>` or `@import`)
4. **Preserve existing styles** — merge with, don't overwrite, existing tokens unless the user explicitly asks to replace

### Step 5: Summary and Verification

After applying, present a clear summary:

```
Applied design summary:
- Created: [list of new files]
- Updated: [list of modified files]
- Tokens applied: [colors, typography, spacing, radius, shadows, motion]
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
