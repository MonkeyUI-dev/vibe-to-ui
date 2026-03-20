# Design System Extraction Guide

## Analysis Process

When the user provides a UI screenshot or design mockup, analyze it in this exact order:

### Step 1: Color Palette Extraction

Identify colors by their role:

| Role | What to look for |
|------|-----------------|
| **Primary** | Main brand/action color — buttons, links, key interactive elements |
| **Secondary** | Supporting color — secondary buttons, badges, highlights |
| **Accent** | Sparingly used attention-grabbing color — notifications, tags |
| **Background** | Page/card background colors (often 2–3 levels of depth) |
| **Surface** | Card/panel/modal backgrounds — slightly elevated from base background |
| **Text Primary** | Main body text color |
| **Text Secondary** | Muted/helper text, labels, placeholders |
| **Border** | Divider lines, input borders, card edges |
| **Success/Warning/Error** | Semantic status colors if visible |

**Extraction rules**:
- Report hex values (e.g., `#1A1A2E`)
- Group into light/dark mode if both are shown
- Note opacity levels if transparency is used (e.g., `rgba(0,0,0,0.06)`)
- Identify if the palette is warm-leaning, cool-leaning, or neutral

### Step 2: Typography Scale

Identify the type hierarchy:

| Level | Typical usage |
|-------|--------------|
| **Display / H1** | Hero headings, page titles |
| **H2** | Section headings |
| **H3** | Sub-section headings |
| **H4** | Card titles, smaller headings |
| **Body Large** | Lead paragraphs, emphasis text |
| **Body** | Default paragraph text |
| **Body Small** | Captions, helper text |
| **Label** | Form labels, button text |
| **Overline** | Category labels, metadata |

For each level, extract:
- **Font family** (or best guess — e.g., "sans-serif similar to Inter/DM Sans")
- **Approximate size** in px or rem
- **Font weight** (400/500/600/700)
- **Line height** ratio (e.g., 1.5)
- **Letter spacing** if notable (tight or wide)

**Tip**: Identify the **scale ratio** between sizes (e.g., 1.25 Major Third, 1.333 Perfect Fourth). This enables the user to generate a full scale from a base size.

### Step 3: Spacing System

Identify the spacing logic:
- **Base unit**: Most design systems use 4px or 8px as a base
- **Scale**: Look for consistent multiples (e.g., 4, 8, 12, 16, 24, 32, 48, 64)
- **Section padding**: Space between page edge and content
- **Card padding**: Internal padding within cards/panels
- **Element gaps**: Space between buttons, form fields, list items
- **Component margins**: Space between sections, between heading and content

### Step 4: Border Radius

Identify the radius strategy:
- **None (0px)**: Sharp, brutalist aesthetic
- **Subtle (2–4px)**: Professional, restrained
- **Medium (6–8px)**: Modern, friendly
- **Large (12–16px)**: Soft, rounded feel
- **Pill (9999px)**: Fully rounded buttons/badges
- Note if different components use different radiuses (e.g., cards vs. buttons vs. inputs)

### Step 5: Shadows & Elevation

Identify shadow usage:
- **None**: Flat design, relies on borders/background differences
- **Subtle**: `0 1px 2px rgba(0,0,0,0.05)` — barely-there depth
- **Medium**: `0 4px 6px rgba(0,0,0,0.07)` — card-level elevation
- **Large**: `0 10px 15px rgba(0,0,0,0.1)` — modal/dropdown elevation
- Note if shadows are warm-tinted, cool-tinted, or neutral

### Step 6: Motion System

Analyze the motion and animation patterns. Even from a static screenshot, many motion cues are inferable from the visual design language (hover states, transition indicators, scroll-linked elements). If analyzing a live site, observe directly.

**Motion roles present**:

| Element | Motion role | Trigger | Notes |
|---------|------------|---------|-------|
| [e.g., Hero heading] | [Emphasis/Guidance/Feedback/Explanation/Atmosphere] | [page-load/scroll/hover/click] | [Duration, easing if observable] |

**Overall motion character**:
- **Tempo**: Slow / Medium / Fast (estimate base duration)
- **Easing**: Calm / Sharp / Elastic / Linear (observe acceleration feel)
- **Density**: Minimal / Moderate / Rich (how many elements animate)
- **Distance**: Small / Medium / Large (how far elements move)

**Reduced-motion consideration**: Note whether the reference respects `prefers-reduced-motion` (if testable).

For detailed motion extraction methodology, see [../references/MOTION-SYSTEM.md](../references/MOTION-SYSTEM.md).

### Step 7: Additional Patterns

If visible, also note:
- **Icons**: Style (outlined/filled/duotone), size, stroke width
- **Illustration style**: Flat, isometric, hand-drawn, photo-based
- **Grid**: Number of columns, gutter width
- **Breakpoints**: If multiple sizes are shown

## Confidence Levels

Mark each extraction with confidence:
- **High**: Clearly visible, unambiguous
- **Medium**: Reasonably inferred, but could vary
- **Low**: Best guess — recommend user verifies

## Output

Generate the output using the template at [../assets/design-system-template.md](../assets/design-system-template.md).
