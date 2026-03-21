# vibe-to-ui

[中文](README.zh_CN.md)

> Agent Skills for [MonkeyUI](https://github.com/MonkeyUI-dev/MonkeyUI) — helping vibe coding developers build professional-grade UIs without designer expertise.

---

## What is vibe-to-ui?

**vibe-to-ui** is a collection of [Agent Skills](https://agentskills.io) built for MonkeyUI's local, single-project mode. These skills give AI coding agents (Claude Code, GitHub Copilot, Cursor, etc.) specialized design knowledge so they can help developers who code by feel — but don't speak fluent design. Beyond static visual tokens, vibe-to-ui also extracts and generates **motion systems** — defining how, when, and why UI elements should animate to communicate meaning and product personality.

---

## Why we built this

**Good design shouldn't require a design degree.**

There are countless great developers who can architect complex systems and ship fast — but get stuck the moment they need their product to *look right*. Not because they lack taste. Because no tool speaks their language.

Beauty doesn't only live in design files. It lives in the light hitting a street corner, in a stranger's smile, in the melody that brings tears to your eyes. Those moments of quiet wonder are themselves a design language — raw, personal, and yours.

vibe-to-ui is the translator. Give it a photo, a recording, or a feeling you can't quite name — and it will extract the essence of that beauty: its spatial rhythm, color mood, motion character. That context flows to your agent, into your product, and through your product, out into the world.

We believe: when more developers can carry the beauty that has moved them into what they build, the world gets more products that are genuinely, distinctly alive.

> Not uniform polish. Not templated taste. More beauty — in more forms, from more people.

---

## Skills

A design companion for vibe coding developers. Turns screenshots, mood images, and gut feelings into structured design systems, motion languages, and layout blueprints — ready to apply to your codebase.

**Three core capabilities:**

#### 1. Design System Extraction
*For users who know what they want.*

Provide a screenshot of a UI or design mockup. The skill extracts its complete "style DNA":

- **Colors** — with semantic roles (primary, surface, text, border, etc.)
- **Typography** — font families, size scale, weights, line heights
- **Spacing** — base unit and consistent multiplier scale
- **Border radius** — per-component radius strategy
- **Shadows** — elevation system
- **Motion** — tempo, easing, density, triggers, reduced-motion fallback

Outputs tokens in three formats: **CSS custom properties**, **Tailwind CSS config**, and a **JSON token file** — ready to drop into your project.

#### 2. Design Exploration
*For users who only have a feeling.*

Not sure what style you want? Just have some rough inspiration — a landscape photo, a color you like, a vague mood, or a piece of music that captures the feeling? The skill guides you through an interactive conversation:

1. Shares what your project does and who it's for
2. Drop any inspiration images (landscapes, objects, other apps — anything) **or music recordings** (audio clips, hummed melodies, song snippets)
3. The skill translates both visual and sonic signals into design qualities — tempo, timbre, and rhythm become energy, warmth, and texture in your UI
4. Synthesizes 2–3 distinct design concepts — each with its own visual style **and motion personality** — and generates **live HTML previews** with hover transitions and entrance animations
5. You react, mix, and choose
6. The chosen direction is formalized into a full design system with motion tokens (via Capability 1)

#### 3. UI Layout Analysis
*For users who can't describe layout in words.*

Provide a webpage screenshot. The skill extracts its layout structure into formats both humans and LLMs can understand and reuse:

- **ASCII art diagram** — visual layout map any model can parse
- **Semantic structure** — section-by-section role description
- **Responsive behavior notes** — how the layout adapts across breakpoints
- **HTML skeleton** — clean markup structure ready to style
- **Component tree** — hierarchical breakdown of all UI parts

#### Composing capabilities

These capabilities chain naturally:

```
Explore vibes → Choose direction → Extract design system → Analyze layout → Generate styled skeleton
```

Or mix and match — extract style from one site, apply it to a layout from another.

---

## Installation

```bash
git clone https://github.com/MonkeyUI-dev/vibe-to-ui.git ~/.claude/skills/vibe-to-ui
```

---

## Usage Examples

```
# Extract a design system
"Analyze the design of this screenshot and give me the design tokens"

# Explore aesthetics with images
"I want something that feels calm and modern, a bit like Scandinavian design — help me find a direction"

# Explore aesthetics with music
"I recorded a melody that captures the feeling I want — can you listen to it and translate that into a design direction?"

# Explore aesthetics from a song description
"I want my UI to feel like a slow acoustic guitar piece — warm, unhurried, and natural"

# Define motion from a vibe
"I want my product to feel innovative and fast — help me define how things should animate"

# Extract from a layout
"I love how this page is structured, extract the layout so I can reuse it"

# Full pipeline
"I have some inspiration images and a music clip — let's explore a style, then apply it to this layout I found"
```

---

## Skill Structure

```
.
├── SKILL.md                          # Core instructions (loaded on activation)
├── references/
│   ├── DESIGN-SYSTEM.md              # Design system extraction methodology
│   ├── DESIGN-EXPLORATION.md         # Interactive exploration conversation guide
│   ├── LAYOUT-ANALYSIS.md            # Layout analysis and ASCII blueprint guide
│   └── MOTION-SYSTEM.md              # Motion system extraction and generation guide
└── assets/
    └── design-system-template.md     # Standard output template for design tokens
```

Following [Agent Skills progressive disclosure](https://agentskills.io/specification): only `SKILL.md` metadata loads at startup (~100 tokens). Reference files load on demand, keeping context lean.

---

## Compatible Agents

This skill follows the open [Agent Skills standard](https://agentskills.io) and works with any compatible agent:

Claude Code · GitHub Copilot · Cursor · Gemini CLI · TRAE · and more.

---

## License

MIT — see [LICENSE](LICENSE).

Built with ❤️ by [MonkeyUI](https://github.com/MonkeyUI-dev/MonkeyUI).
