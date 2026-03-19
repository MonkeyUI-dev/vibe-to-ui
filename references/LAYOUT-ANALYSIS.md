# UI Layout Analysis Guide

## Overview

This guide covers extracting reusable layout structures from UI screenshots. The screenshot can be a full webpage **or any section of one** — for example, just a feature list, a pricing block, a testimonials row, a navigation bar, or any other partial UI region. The goal is to produce layout blueprints that both humans and LLMs can understand and apply to new projects.

## Analysis Process

### Step 1: Determine Screenshot Scope and Identify Sections

First, determine whether the screenshot shows a full page or a partial UI region:

- **Full page**: Scan top-to-bottom and identify each distinct section using common page anatomy:
  - **Navigation/Header**: Top bar, logo placement, nav links, CTA buttons
  - **Hero/Banner**: Above-the-fold primary content area
  - **Content Sections**: Feature grids, text blocks, media sections
  - **Sidebar**: If present — left or right auxiliary content
  - **Footer**: Bottom area with links, copyright, secondary nav

- **Partial / section screenshot**: Treat the entire image as a single named section. Identify what type of component or section it represents (e.g., `features-list`, `pricing-table`, `testimonials`, `cta-banner`) and analyze its internal layout directly.

Label each section with a semantic name (e.g., `hero`, `features-grid`, `testimonials`, `pricing-table`, `cta-banner`, `footer`).

### Step 2: Analyze Grid Structure

For each section, determine:

- **Container width**: Full-bleed, max-width constrained, or narrow centered
- **Column count**: 1, 2, 3, 4, or asymmetric split (e.g., 2/3 + 1/3)
- **Alignment**: Left-aligned, centered, or right-aligned content
- **Stacking direction**: Horizontal flow or vertical stack
- **Gap/Gutter**: Space between grid items (approximate in px or spacing units)

### Step 3: Generate ASCII Layout

Convert the visual structure into ASCII art. Use these conventions:

**Full-page example:**
```
┌─────────────────────────────────────────────────┐
│                   HEADER                        │
│  [Logo]              [Nav] [Nav] [Nav]  [CTA]   │
├─────────────────────────────────────────────────┤
│                                                 │
│                    HERO                         │
│         [Heading]                               │
│         [Subheading]                            │
│         [CTA Button]  [Secondary Button]        │
│                                                 │
├─────────────────────────────────────────────────┤
│           FEATURES (3-column grid)              │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐         │
│  │ [Icon]  │  │ [Icon]  │  │ [Icon]  │         │
│  │ [Title] │  │ [Title] │  │ [Title] │         │
│  │ [Desc]  │  │ [Desc]  │  │ [Desc]  │         │
│  └─────────┘  └─────────┘  └─────────┘         │
├─────────────────────────────────────────────────┤
│        CONTENT (asymmetric 60/40 split)         │
│  ┌──────────────────┐  ┌────────────┐           │
│  │   [Text Block]   │  │  [Image]   │           │
│  │   [Paragraph]    │  │            │           │
│  │   [CTA Link]     │  │            │           │
│  └──────────────────┘  └────────────┘           │
├─────────────────────────────────────────────────┤
│                   FOOTER                        │
│  [Col1]    [Col2]    [Col3]    [Col4]           │
│  [Links]   [Links]   [Links]   [Social]        │
│                [Copyright]                      │
└─────────────────────────────────────────────────┘
```

**Partial / section-only example (e.g., a unique asymmetric feature showcase hard to describe verbally):**
```
┌──────────────────────────────────────────────────────────────┐
│  FEATURE-SHOWCASE                                            │
│  [Section Heading — left-aligned, large]                     │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  FEATURE-CARD-WIDE (full-width, ~40/60 text/preview)   │  │
│  │  ┌───────────────────┐  ┌──────────────────────────┐   │  │
│  │  │ [Category Label]  │  │  ┌────────────┐           │   │  │
│  │  │ [Bold Headline]   │  │  │ [UI Panel] │  ┌──────┐ │   │  │
│  │  │ [CTA Arrow Btn]   │  │  └────────────┘  │[UI   │ │   │  │
│  │  │                   │  │   (layered /     │Panel]│ │   │  │
│  │  │                   │  │    overlapping)  └──────┘ │   │  │
│  │  └───────────────────┘  └──────────────────────────┘   │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌─────────────────────────┐  ┌─────────────────────────┐   │
│  │  FEATURE-CARD (50%)     │  │  FEATURE-CARD (50%)     │   │
│  │  [Category Label]       │  │  [Category Label]       │   │
│  │  [Bold Headline]        │  │  [Bold Headline]        │   │
│  │  [CTA Arrow Btn]        │  │  [CTA Arrow Btn]        │   │
│  │  ┌─────────────────┐    │  │  ┌─────────────────┐    │   │
│  │  │  [UI Mockup]    │    │  │  │  [UI Mockup]    │    │   │
│  │  └─────────────────┘    │  │  └─────────────────┘    │   │
│  └─────────────────────────┘  └─────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```
> **When is partial screenshot analysis most valuable?** When the section has a *unique or asymmetric* spatial structure that is hard to describe verbally — for example: a hero card that is full-width with layered overlapping UI panels on one side, followed by a different 2-column card row below it. Simple uniform grids (3 equal icon+title+desc cards) are easy to describe; complex, non-obvious spatial compositions are where visual analysis provides the most value.

**ASCII conventions**:
- `┌─┐│└─┘` for section/component boundaries
- `[Label]` for UI elements (buttons, text, images, icons)
- Section names in UPPERCASE
- Notes in parentheses for layout behavior (e.g., "3-column grid", "asymmetric 60/40")
- Indent to show nesting

### Step 4: Semantic Structure Description

For each section, provide a structured description:

```markdown
### Section: hero
- **Layout**: Single column, centered content
- **Container**: Max-width 1200px, centered
- **Vertical spacing**: 80px top/bottom padding
- **Content order**: Heading → Subheading → Button group (horizontal)
- **Background**: Full-bleed gradient/image
- **Z-index layers**: Background image → Overlay → Content
```

### Step 5: Responsive Behavior Notes

Infer how the layout likely adapts:

```markdown
## Responsive Behavior

### Desktop (≥1024px)
- Features: 3-column grid
- Content sections: Side-by-side (60/40 or 50/50)
- Navigation: Horizontal nav bar

### Tablet (768px–1023px)
- Features: 2-column grid
- Content sections: Stack vertically
- Navigation: Hamburger menu likely

### Mobile (<768px)
- Features: Single column stack
- Content sections: Single column, image above text
- Navigation: Hamburger with slide-out menu
- Hero: Reduced padding, smaller heading
```

### Step 6: Generate Reusable Skeleton

Produce a clean HTML skeleton the user can use as a starting point:

```html
<!-- Only structure, no styling — user applies their own design system -->
<header class="site-header">
  <div class="container">
    <a class="logo" href="/">Logo</a>
    <nav class="main-nav"><!-- nav links --></nav>
    <a class="header-cta" href="#">CTA</a>
  </div>
</header>

<section class="hero">
  <div class="container">
    <h1><!-- heading --></h1>
    <p class="hero-subtitle"><!-- subheading --></p>
    <div class="hero-actions">
      <a class="btn btn-primary" href="#">Primary CTA</a>
      <a class="btn btn-secondary" href="#">Secondary</a>
    </div>
  </div>
</section>

<!-- ... more sections ... -->
```

Also provide a **component tree** view:

```
Page
├── Header
│   ├── Logo
│   ├── MainNav (horizontal links)
│   └── HeaderCTA (button)
├── Hero
│   ├── Heading (h1)
│   ├── Subtitle (p)
│   └── ActionGroup
│       ├── PrimaryButton
│       └── SecondaryButton
├── FeaturesGrid
│   └── FeatureCard × 3
│       ├── Icon
│       ├── Title (h3)
│       └── Description (p)
├── ContentSection
│   ├── TextBlock (60%)
│   │   ├── Heading (h2)
│   │   ├── Paragraph
│   │   └── CTALink
│   └── MediaBlock (40%)
│       └── Image
└── Footer
    ├── FooterColumns × 4
    │   └── LinkList
    └── Copyright
```

## Combining with Design System

After layout extraction, suggest combining with a design system:

- "Want me to apply a design system to this skeleton?"
- "I can extract the visual style from the same screenshot, or you can provide a different reference."
- If they have a design system from Capability 1, apply it directly to the skeleton.
