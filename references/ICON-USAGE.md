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

Before designing a custom SVG, determine the icon's role in the interface:

- **Navigation / toolbar / action / status**: use a recognizable UI icon from the locked library first.
- **Informational UI support**: use an icon only when it improves scanning or comprehension; otherwise let typography, labels, spacing, and hierarchy carry the meaning.
- **Feature marketing / empty state / onboarding / social**: use an illustrated icon or image asset only when the surface can support larger, more expressive artwork.

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

#### 5. Keep the metaphor minimal

For 16–24px UI icons, design the smallest possible metaphor that remains recognizable. Avoid turning the icon into a miniature screenshot, diagram, dashboard, wireframe, chart, or multi-object scene.

Use this detail budget:

- **Default UI icon**: 1 primary shape + 0–2 supporting details.
- **Modifier icon**: 1 base metaphor + 1 small modifier, placed consistently.
- **Dense operational UI**: prefer a familiar library icon or text label over a custom symbol with uncertain meaning.
- **Marketing feature icon**: may use more detail, but only at 64px+ and as part of an illustrated family.

Reject the icon if it needs explanation, if its internal details blur at 20px, or if the user must decode it before reading the adjacent label.

#### 6. Use optical consistency, not mechanical equality

Keep icons on a shared grid, but adjust individual forms for visual balance. A circle, square, vertical rectangle, and horizontal rectangle may need different apparent dimensions to feel equally weighted. Do not force every path to occupy the same bounding box if the result looks heavier, lighter, or off-center.

Check:

- **Size**: UI icons use the project's established size, usually 16, 20, or 24px.
- **Stroke**: one stroke weight per family, usually 1.5–2px for line icons.
- **Perspective**: front-facing by default; avoid tilted, dimensional, or pseudo-3D UI glyphs.
- **Terminals / joins**: match the locked library or the surrounding shape language.
- **Color**: system icons are monochrome by default and inherit `currentColor`.

#### 7. Provide as a reusable component

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

### Custom SVG QA checklist

Run this checklist before keeping a generated custom SVG:

- **Role fit**: Is this a UI icon or an illustrated asset, and does the chosen treatment match that role?
- **Instant recognition**: Does the icon communicate one concept without reading the label?
- **Small-size legibility**: Does it stay clear at 16px, 20px, and 24px on standard and high-DPI screens?
- **Detail budget**: Does it avoid miniature screens, nested boxes, tiny text-like strokes, and multi-object scenes?
- **Family match**: Does it match the locked library's grid, stroke weight, caps, joins, optical weight, and perspective?
- **State behavior**: Can hover, active, disabled, selected, and dark-mode states be expressed with the same color tokens as text?
- **Accessibility fallback**: If meaning is not obvious, is there a visible label, `aria-label`, or tooltip?

If any of the first four checks fail, replace the custom SVG with the locked library icon, a text marker, or a larger illustrated asset in the correct surface.

### Source-backed principles

These rules are distilled from current major design-system guidance:

- [Material Design icons](https://m1.material.io/style/icons.html) emphasizes simple, intuitive, actionable, consistent icons; 20–24dp grids; consistent stroke weight; pixel alignment; and avoiding overly literal or delicate icons.
- [Apple Human Interface Guidelines: Icons](https://developer.apple.com/design/human-interface-guidelines/icons) recommends recognizable, highly simplified interface icons with consistent size, level of detail, weight, and perspective.
- [Apple Human Interface Guidelines: SF Symbols](https://developer.apple.com/design/human-interface-guidelines/sf-symbols) advises custom symbols to stay simple, recognizable, inclusive, directly related to the represented action/content, and consistent with system symbols in detail, optical weight, alignment, position, and perspective.
- [IBM Carbon Icons](https://carbondesignsystem.com/elements/icons/usage/) treats UI icons as monochrome symbols, ties color contrast to text contrast, and requires consistent sizing and text alignment.
- [Microsoft Fluent iconography](https://fluent2.microsoft.design/iconography) frames system icons as semantic UI elements that should be recognizable, functional, easily understood, minimal, harmonious, and careful with modifiers and color.

## UI icons vs illustrated assets (Capability 6)

| Need | Use | Guide |
|------|-----|-------|
| Navigation, buttons, inputs, tables (16–24px) | Locked project icon library or **custom SVG** | This document |
| Hero, feature blocks, empty states, OG images | **Raster illustration** via image generation | [VISUAL-ASSET-GENERATION.md](VISUAL-ASSET-GENERATION.md) |
| Marketing "feature icons" (64–256px illustrative) | Generated SVG/PNG/WebP set with style reference | Visual asset guide + manifest |
| Social sharing visuals, 3D object icons, mascot props | Raster image generation | Visual asset guide + manifest |

**Default:** never replace UI chrome icons with AI raster images. Icons stay vector, token-colored, and grid-aligned unless the user explicitly overrides the strategy.

For Consumer app surfaces, bottom tabs, top tabs, toolbar actions, input adornments, and sheet controls are always UI chrome. Use the locked icon library or custom SVG for these roles, with clear selected, pressed, disabled, and notification/badge states. Generated illustrated icons may support onboarding, empty states, achievements, badges, referrals, and share cards, but should not become the navigation system. See [CONSUMER-APP-DESIGN.md](CONSUMER-APP-DESIGN.md).

### User override policy

Users may request:

- **library only**: use the locked icon library and avoid custom icons
- **custom SVG only**: avoid libraries; create reusable SVG components
- **generated illustrated icons**: create a feature/marketing icon set with image generation
- **raster/image icons**: use PNG/WebP for expressive surfaces such as landing pages, launch graphics, and social previews

When the requested strategy reduces usability, explain the tradeoff briefly and continue if the user confirms or the request is clearly intentional. For example, raster icons are expressive but weaker for small UI controls because they lose crispness, theme adaptability, state coloring, and accessibility at 16–24px.

For generated image icons, always declare target display size first. If the icon will render below 64px, switch to this document's UI icon rules. If it will render at 64px or larger, follow [VISUAL-ASSET-GENERATION.md](VISUAL-ASSET-GENERATION.md) and request a transparent source background by default when the asset will sit on an existing UI surface.

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
