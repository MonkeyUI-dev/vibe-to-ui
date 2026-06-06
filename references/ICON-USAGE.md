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

### Icon Library Lock

When a project already uses an icon library, **lock new UI chrome icons to that single library** by default.

Before adding any UI icon:

1. Inspect the project for existing icon dependencies and imports (`package.json`, lockfile, component imports, shared `Icon` wrappers).
2. If exactly one library is already used, set it as `ui_icon_source` and use it for all new navigation, toolbar, button, table, form, and status icons.
3. If multiple libraries are already present, prefer the dominant library used by shared components or the current surface. Do not introduce a third library.
4. If no icon library exists, recommend one library that matches the stack and page type, then use that one consistently.
5. Record the decision in the design system output and in `DESIGN.md` when available.

Only deviate from the locked library when:

- the user explicitly asks for a different library
- the icon metaphor does not exist in the locked library
- the locked icon looks visibly out of family with the confirmed aesthetic
- the user asks for custom SVG or generated image icons

When deviating, create a custom SVG component first for UI chrome. Use raster image generation only for marketing or expressive illustrated icons, not small operational controls.

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
| Navigation, buttons, inputs, tables (16–24px) | Locked project icon library or **custom SVG** | This document |
| Hero, feature blocks, empty states, OG images | **Raster illustration** via image generation | [VISUAL-ASSET-GENERATION.md](VISUAL-ASSET-GENERATION.md) |
| Marketing "feature icons" (64–256px illustrative) | Generated SVG/PNG/WebP set with style reference | Visual asset guide + manifest |
| Social sharing visuals, 3D object icons, mascot props | Raster image generation | Visual asset guide + manifest |

**Default:** never replace UI chrome icons with AI raster images. Icons stay vector, token-colored, and grid-aligned unless the user explicitly overrides the strategy.

### User override policy

Users may request:

- **library only**: use the locked icon library and avoid custom icons
- **custom SVG only**: avoid libraries; create reusable SVG components
- **generated illustrated icons**: create a feature/marketing icon set with image generation
- **raster/image icons**: use PNG/WebP for expressive surfaces such as landing pages, launch graphics, and social previews

When the requested strategy reduces usability, explain the tradeoff briefly and continue if the user confirms or the request is clearly intentional. For example, raster icons are expressive but weaker for small UI controls because they lose crispness, theme adaptability, state coloring, and accessibility at 16–24px.

### When to generate illustrated icons

Generate a small illustrated icon set (4–8) only when:

- The user explicitly asks for custom **feature** or **marketing** icons, not app chrome
- Aesthetic guide calls for illustrative metaphor icons that no library provides
- The same `concept_id` and hero style reference are used for consistency

Output as SVG when possible (Recraft SVG or traced vector); register each file in `design-assets.manifest.json` with `role: icon_illustrated`.

Generated illustrated icons should be treated as a family:

- define a shared metaphor system before generation
- use the same `concept_id`, `style_seed`, accent colors, material language, camera angle, shadow style, and background treatment
- generate as a contact sheet or review wall when possible so the user can compare the set before Apply
- store final assets in the same manifest as hero, feature, empty-state, and OG assets

## Icon Family Presets

Use these presets as starting points. The agent should pick one passively from page type, product personality, and references, then adapt it with user-specific details learned during the workflow.

| Preset | Default use | Rules |
|--------|-------------|-------|
| `outline-system` | SaaS, dashboards, docs, general UI | 24×24 grid, 1.75–2px stroke, rounded caps, no fill, `currentColor` |
| `solid-glyph` | Mobile apps, compact tabs, consumer surfaces | 20–24px grid, filled shapes, simple silhouettes, strong selected state |
| `duotone-soft` | Friendly apps, wellness, education, creator tools | 24px grid, primary + muted accent, low contrast fill, rounded geometry |
| `technical-line` | Devtools, infra, analytics, security | 24px grid, 1.5px stroke, precise geometry, square or subtle caps |
| `playful-sticker` | Landing feature icons, onboarding, light consumer marketing | 64–128px, bold silhouette, soft shadow, token-colored fills |
| `3d-object-pop` | Social sharing, launch visuals, youth/culture/e-commerce branding | 128–512px, rendered object, strong accent color, material highlights, cast shadow |
| `mascot-prop` | Brand systems with a character or IP metaphor | Mascot-adjacent props, repeated proportions, expressive but not used for controls |

For UI controls, prefer `outline-system`, `solid-glyph`, `duotone-soft`, or `technical-line`. For expressive references that use 3D objects, bright accent color, and product-like props, choose `3d-object-pop` for marketing surfaces while keeping UI chrome on a locked vector strategy.

## DESIGN.md Capture

When `DESIGN.md` exists, or when the skill creates/updates design context, passively record the icon and illustrated asset strategy without asking the user to manage it manually:

```yaml
icon_system:
  ui_icon_source: lucide              # locked library or custom_svg
  lock_policy: single_library_for_new_ui_icons
  fallback: custom_svg_component
  preset: outline-system
  grid: 24
  stroke_width: 2
  stroke_cap: round
  corner_language: soft
  color_mode: currentColor + semantic tokens
  user_override: null                 # library_only | custom_svg_only | generated_icons | raster_icons

illustrated_icon_system:
  enabled_for: [landing_feature, social_preview, empty_state]
  preset: 3d-object-pop
  format: webp
  style_reference: hero-brand-v1
  accent_color: "#63FF00"
  avoid_for: [navigation, form_controls, table_actions]
```

Update this block when:

- a library is detected or chosen
- a user overrides the default icon strategy
- a visual direction establishes a new illustrated icon family
- generated icon assets are added to the manifest

## Decision flowchart

```
Need an icon on the page?
│
├─ Is this a small UI chrome icon?
│  ├─ Yes → Use the locked project icon library
│  │  └─ If no good match → custom SVG component
│  └─ No → Continue
│
├─ Is this a marketing, feature, social, or empty-state icon?
│  ├─ Yes → Use illustrated SVG/PNG/WebP family via Visual Asset Generation
│  └─ No → Continue
│
├─ Did the user request a different strategy?
│  ├─ Yes → Follow the request after noting tradeoffs
│  └─ No → Use the default role-based strategy
│
└─ No match at all →
   └─ Create a custom SVG component
       (Never fall back to emoji)
```

> **Mindset**: When crafting a custom icon, ask two questions: *What is this icon communicating?* and *What visual language does the surrounding UI speak?* Then design an SVG that answers both — functional clarity and aesthetic harmony. A visitor should not be able to tell which icons are from the library and which are custom.
