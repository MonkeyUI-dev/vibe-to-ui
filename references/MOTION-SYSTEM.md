# Motion System Guide

## Overview

Motion is not decoration — it is a product communication language. Where static design uses size, color, and whitespace to create hierarchy, motion creates hierarchy in the **time dimension**: what appears first, what follows, what responds to what. This guide helps extract and define a motion system that communicates meaning, establishes causality, and conveys product personality.

## Motion DNA

When analyzing a reference UI or defining motion for a new project, extract the following dimensions:

### Dimension 1: Motion Role

Every animation should have a clear purpose. Identify which role each motion serves:

| Role | Purpose | Example |
|------|---------|---------|
| **Emphasis** | Draw attention to what's important | A CTA button pulses subtly on first view |
| **Explanation** | Show cause and effect, reveal process | A card expands to show details, progress bar fills |
| **Guidance** | Lead the user's eye through a sequence | Staggered entry of list items, scroll-linked reveals |
| **Feedback** | Confirm an action was received | Button press animation, success checkmark |
| **Atmosphere** | Set emotional tone without functional purpose | Background parallax, floating particles, ambient gradients |

**Key question**: If you remove this animation, does the user lose information or just lose decoration?

### Dimension 2: Trigger

What causes the motion to start:

| Trigger | When it fires | Common uses |
|---------|--------------|-------------|
| **page-load** | Page or section first renders | Hero entrance, logo animation |
| **in-view** | Element scrolls into viewport | Section reveals, counter animations |
| **scroll** | Continuously linked to scroll position | Parallax, progress indicators, sticky transforms |
| **hover** | Mouse enters an element | Card lift, button glow, preview reveal |
| **click / tap** | User activates an element | Modal open, accordion expand, navigation transition |
| **focus** | Keyboard focus on an element | Input highlight, focus ring animation |
| **state-change** | Data or app state updates | Loading → loaded, error shake, notification slide-in |
| **auto-play** | Runs on a timer, no user action needed | Carousel rotation, ambient background animation |

### Dimension 3: Tempo

The overall speed character of the motion system:

| Tempo | Duration range | Personality |
|-------|---------------|-------------|
| **Slow** | 400–800ms | Calm, deliberate, luxurious, reliable |
| **Medium** | 200–400ms | Balanced, professional, polished |
| **Fast** | 100–200ms | Snappy, responsive, energetic, performant |

**Note**: A motion system usually has a **base tempo** with variations. Micro-interactions (button feedback) should be faster than macro-transitions (page changes).

### Dimension 4: Easing

The acceleration curve defines how motion *feels*:

| Easing | CSS equivalent | Character |
|--------|---------------|-----------|
| **Calm** | `cubic-bezier(0.4, 0, 0.2, 1)` | Smooth, natural, unobtrusive — standard Material ease |
| **Sharp** | `cubic-bezier(0.4, 0, 0.6, 1)` | Decisive, direct, snappy — enters and exits with confidence |
| **Elastic** | `cubic-bezier(0.68, -0.55, 0.27, 1.55)` | Playful, bouncy, energetic — overshoots and settles |
| **Linear** | `linear` | Mechanical, continuous, progress-oriented — best for loaders and progress |
| **Ease-out** | `cubic-bezier(0, 0, 0.2, 1)` | Decelerating — content arriving, settling into place |
| **Ease-in** | `cubic-bezier(0.4, 0, 1, 1)` | Accelerating — content leaving, exiting the stage |

### Dimension 5: Distance & Scale

How far elements move or how much they transform:

| Distance | Transform range | When to use |
|----------|----------------|-------------|
| **Small** | 4–8px translate, 0.95–1.0 scale | Subtle feedback — hover lifts, focus shifts |
| **Medium** | 12–24px translate, 0.9–1.0 scale | Section reveals, card entrances |
| **Large** | 40–100px+ translate, 0.8–1.0 scale | Hero entrances, page transitions, dramatic reveals |

### Dimension 6: Density

How many things move on a given page:

| Density | Description | Personality |
|---------|-------------|-------------|
| **Minimal** | Only essential feedback animations — buttons, form validation, navigation transitions | Professional, restrained, performance-focused |
| **Moderate** | Key content has entrance animations, interactive elements have hover/focus states | Polished, modern, balanced |
| **Rich** | Most visible elements animate — scroll reveals, parallax, ambient motion, decorative animations | Immersive, expressive, showcase/marketing |

### Dimension 7: Repeat Policy

How often each animation plays:

| Policy | Behavior | Example |
|--------|----------|---------|
| **Once** | Plays on first trigger only | Section entrance on first scroll into view |
| **Every trigger** | Replays each time the trigger fires | Hover effects, click feedback |
| **Loop** | Repeats continuously | Loading spinners, ambient background animations |
| **First-session** | Only on first visit / first page load | Onboarding animations, welcome sequences |

### Dimension 8: Reduced-Motion Fallback

Every motion system must respect `prefers-reduced-motion`. Define the fallback strategy:

| Strategy | What happens | When to use |
|----------|-------------|-------------|
| **Fade only** | Replace all transform animations with simple opacity fade-in | Default recommendation for most UIs |
| **Static** | Remove animation entirely, show final state immediately | For performance-critical or content-heavy pages |
| **Simplified** | Keep animations but reduce distance, remove parallax, shorten duration | When motion carries meaning that shouldn't be fully lost |
| **Pausable** | Keep animations but add pause/play controls | For auto-playing media, carousels, ambient loops |

## Narrative DNA

Motion exists within a larger narrative context. When defining or extracting a motion system, also identify the narrative layer — this is what turns a collection of animations into a coherent product voice.

### Product Personality

What personality does the motion system convey?

| Personality | Motion characteristics | Example brands |
|-------------|----------------------|----------------|
| **Reliable & Composed** | Slow/medium tempo, calm easing, minimal density, subtle distance | Enterprise SaaS, banking, healthcare |
| **Innovative & Performant** | Fast tempo, sharp easing, medium density, large distance on hero | Dev tools, AI products, tech launches |
| **Guiding & Supportive** | Medium tempo, calm/elastic easing, moderate density, step-by-step reveals | Onboarding flows, educational platforms, assistant products |
| **Premium & Luxurious** | Slow tempo, calm easing, rich density, large parallax | Fashion, luxury goods, portfolio sites |
| **Playful & Energetic** | Fast tempo, elastic easing, rich density, bouncy interactions | Consumer apps, games, social platforms |

### Page Metaphor

How should the page feel as a whole?

| Metaphor | Description | Motion strategy |
|----------|-------------|----------------|
| **Product manual** | Clear, structured, scannable — motion serves clarity | Minimal density, feedback-focused, no atmosphere animations |
| **Product launch** | Cinematic, progressive reveal, building excitement | Rich density, scroll-linked reveals, large-distance hero entrance |
| **Dashboard / tool** | Functional, responsive, state-driven | Fast tempo, feedback and state-change triggers, minimal atmosphere |
| **Story / narrative** | Sequential, guided, chapter-like progression | Scroll-driven, staggered reveals, medium tempo, guidance-focused |
| **Portfolio / showcase** | Visual-first, immersive, details on hover | Rich density, hover triggers, parallax, atmosphere animations |

### Motion Purpose

For each page or section, clarify: does the motion serve **understanding** or **excitement**?

- **Understanding**: Motion makes complex information easier to parse (expanding cards, step-by-step reveals, causal transitions)
- **Excitement**: Motion creates emotional impact (hero animations, parallax, ambient effects, cinematic scroll)

Most pages blend both, but knowing the primary intent helps make consistent choices.

## Extraction Process

### From a Reference Screenshot or Live Site

When extracting motion from a reference (screenshot with visible motion cues, or a live site the user describes):

1. **Catalog visible animations**: List every moving element and what it does
2. **Classify by role**: Is each animation for emphasis, explanation, guidance, feedback, or atmosphere?
3. **Identify triggers**: What causes each animation (scroll, hover, page load, etc.)?
4. **Extract timing**: Estimate duration and easing from the observed motion character
5. **Note density**: How many elements animate on the page? Is it minimal, moderate, or rich?
6. **Check repeat behavior**: Do animations replay or fire only once?
7. **Check accessibility**: Does the site respect `prefers-reduced-motion`? Are auto-playing elements pausable?
8. **Identify narrative**: What personality and metaphor does the overall motion system create?

### From User Vibes (No Concrete Reference)

When the user describes a feeling rather than pointing to a reference:

1. **Map vibe words to motion dimensions**:
   - "Calm" / "Zen" / "Minimal" → Slow tempo, calm easing, minimal density, small distance
   - "Powerful" / "Fast" / "Cutting-edge" → Fast tempo, sharp easing, medium density, large distance on hero
   - "Friendly" / "Fun" / "Playful" → Medium tempo, elastic easing, moderate density, bouncy
   - "Premium" / "Luxurious" / "Elegant" → Slow tempo, calm easing, rich density, parallax
   - "Professional" / "Enterprise" / "Trustworthy" → Medium tempo, calm easing, minimal density, subtle
   - "Guiding" / "Helpful" / "Step-by-step" → Medium tempo, calm easing, moderate density, staggered reveals

2. **Translate music signals to motion** (when user shares music):
   - Tempo (BPM) → Motion tempo (slow/medium/fast)
   - Dynamics (soft/loud) → Motion distance (small/large)
   - Rhythm (regular/syncopated) → Motion density and stagger pattern
   - Texture (sparse/dense) → Motion density (minimal/rich)
   - Energy (calm/intense) → Easing character (calm/sharp/elastic)

3. **Present 2–3 motion concepts** alongside visual concepts, each with different motion personalities

### From Product Type

When the user describes what their product does:

| Product type | Suggested motion defaults |
|-------------|--------------------------|
| **SaaS dashboard** | Fast tempo, minimal density, feedback-focused, sharp easing |
| **Marketing / landing page** | Medium tempo, moderate-rich density, scroll reveals, calm easing |
| **E-commerce** | Medium tempo, moderate density, hover-focused, calm easing |
| **Portfolio / creative** | Slow-medium tempo, rich density, parallax + hover, calm easing |
| **Documentation / content** | Medium tempo, minimal density, feedback-only, calm easing |
| **AI / ML product** | Medium tempo, moderate density, explanation-focused (show process), calm/sharp easing |
| **Mobile app (web)** | Fast tempo, minimal density, sharp easing, gesture-linked |

## Output

Generate motion tokens as part of the design system output using the motion section of [../assets/design-system-template.md](../assets/design-system-template.md).
