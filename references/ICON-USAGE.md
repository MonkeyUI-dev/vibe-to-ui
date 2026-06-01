# Icon Usage Guidelines

## Core rule

**Never use raw emoji characters** (e.g., 🔥, ✨, 📊, 🎯) as visual elements on the page.

Emojis render inconsistently across platforms and browsers, break visual harmony with the design system, and feel unprofessional. They are a shorthand for prototyping, not for production UI.

## Use an icon component library

Always prefer whichever icon library the user's project already uses. If none is installed, recommend one that fits their stack:

| Library | Style | Best for |
|---------|-------|----------|
| [Lucide](https://lucide.dev/) | Clean, consistent, customizable | General-purpose, works everywhere |
| [Heroicons](https://heroicons.com/) | Solid + outline variants | Tailwind ecosystem |
| [Phosphor Icons](https://phosphoricons.com/) | 6 weight variants per icon | Projects needing visual weight flexibility |
| [Radix Icons](https://www.radix-ui.com/icons) | Minimal, 15×15 grid | Small UI controls, compact layouts |
| [Tabler Icons](https://tabler.io/icons) | Large set, stroke-based | Projects needing broad icon coverage |

## When no library icon fits: custom SVG components

When the icon library lacks a suitable match — or the available icons feel generic and don't harmonize with the page's aesthetic — do **not** fall back to emoji. Instead, generate a **custom SVG icon component** purpose-built for the context.

### Design principles for custom icons

#### 1. Inherit the design system

Stroke width, corner radius, and sizing should echo the design system's tokens:
- If the UI uses `border-radius: 12px` and soft curves → the icon should use rounded line caps and gentle curves
- If the UI uses `border-radius: 2px` and sharp edges → the icon should use square geometry and crisp strokes
- Match the base stroke width to the icon library's convention (typically 1.5px–2px)

#### 2. Match the aesthetic soul

Reference the aesthetic analysis or design exploration output:
- **Warm & organic** → gentle curves, natural forms, slight irregularity
- **Precise & technical** → clean geometry, uniform strokes, mathematical proportion
- **Playful & bold** → rounded shapes, generous stroke, expressive forms
- **Luxurious & refined** → thin strokes, elegant proportion, generous whitespace within the icon

#### 3. Respect the color system

Custom icons must use semantic color tokens — never hardcode colors:

```css
/* Correct */
color: currentColor;
fill: var(--color-primary);
stroke: var(--color-muted);

/* Wrong */
fill: #3b82f6;
stroke: #94a3b8;
```

This ensures icons adapt to themes, dark mode, hover states, and context automatically.

#### 4. Feel cohesive, not decorative

The icon should feel like it belongs to the same icon family as the rest of the UI:
- **Optical weight**: Match the perceived heaviness of library icons at the same size
- **Padding**: Use consistent inset from the viewBox edge (typically 1–2px on a 24×24 grid)
- **Metaphor style**: If library icons use literal representations (e.g., a literal envelope for "mail"), don't suddenly introduce abstract symbols — and vice versa
- **Grid alignment**: Design on the same grid as the library (usually 24×24)

#### 5. Provide as a reusable component

Wrap custom icons as components that follow the same API conventions as the project's icon library:

```tsx
// React example — matching Lucide's API
interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

const CustomIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* SVG paths here */}
  </svg>
);
```

## UI icons vs illustrated assets (Capability 6)

| Need | Use | Guide |
|------|-----|-------|
| Navigation, buttons, inputs, tables (24×24) | Project icon library or **custom SVG** | This document |
| Hero, feature blocks, empty states, OG images | **Raster illustration** via image generation | [VISUAL-ASSET-GENERATION.md](VISUAL-ASSET-GENERATION.md) |
| Marketing "feature icons" (64–128px illustrative) | P1: generated SVG/PNG set with style reference | Visual asset guide + manifest |

**Default (P0):** never replace UI chrome icons with AI raster images. Icons stay vector, token-colored, and grid-aligned.

### When to generate illustrated icons (P1)

Generate a small illustrated icon set (4–8) only when:

- The user explicitly asks for custom **feature** or **marketing** icons, not app chrome
- Aesthetic guide calls for illustrative metaphor icons that no library provides
- The same `concept_id` and hero style reference are used for consistency

Output as SVG when possible (Recraft SVG or traced vector); register each file in `design-assets.manifest.json` with `role: icon_illustrated`.

## Decision flowchart

```
Need an icon on the page?
│
├─ Does the project's icon library have a good match?
│  ├─ Yes → Use it
│  └─ No, but there's a close match →
│     └─ Does it harmonize with the page's aesthetic?
│        ├─ Yes → Use it
│        └─ No → Create a custom SVG component
│
└─ No match at all →
   └─ Create a custom SVG component
       (Never fall back to emoji)
```

> **Mindset**: When crafting a custom icon, ask two questions: *What is this icon communicating?* and *What visual language does the surrounding UI speak?* Then design an SVG that answers both — functional clarity and aesthetic harmony. A visitor should not be able to tell which icons are from the library and which are custom.
