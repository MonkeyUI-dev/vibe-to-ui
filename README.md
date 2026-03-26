# vibe-to-ui

[中文](README.zh_CN.md)

> Agent Skills for [MonkeyUI](https://github.com/MonkeyUI-dev/MonkeyUI) — helping vibe coding developers build professional-grade UIs without designer expertise.

---

## What is vibe-to-ui?

**vibe-to-ui** is a collection of [Agent Skills](https://agentskills.io) built for MonkeyUI's local, single-project mode. These skills give AI coding agents (Claude Code, GitHub Copilot, Cursor, etc.) specialized design knowledge so they can help developers who code by feel — but don't speak fluent design. Beyond static visual tokens, vibe-to-ui also extracts and generates **motion systems** — defining how, when, and why UI elements should animate to communicate meaning and product personality. The agent works collaboratively — all design exploration happens through standalone previews and concept pages, and only touches your project when you confirm a direction and ask to apply it.

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

A design companion for vibe coding developers. Turns screenshots, mood images, and gut feelings into structured design systems, motion languages, and layout blueprints — all through standalone previews for collaborative exploration. Only applies designs to your project when you're ready.

**Four core capabilities:**

#### 1. Design System Extraction
*For users who have a complete design to restore.*

Provide a screenshot of a UI or design mockup. The skill extracts its complete "style DNA" and generates a **standalone preview page** for you to evaluate — it does not modify your project until you confirm:

- **Colors** — with semantic roles (primary, surface, text, border, etc.)
- **Typography** — font families, size scale, weights, line heights
- **Spacing** — base unit and consistent multiplier scale
- **Border radius** — per-component radius strategy
- **Shadows** — elevation system
- **Motion** — tempo, easing, density, triggers, reduced-motion fallback

Outputs tokens in three formats: **CSS custom properties**, **Tailwind CSS config**, and a **JSON token file** — applied to your project only after you confirm the preview.

#### 2. Design Exploration
*For users who only have a feeling.*

Not sure what style you want? Just have some rough inspiration — a landscape photo, a color you like, a vague mood, or a piece of music that captures the feeling? The skill guides you through an interactive conversation:

1. Shares what your project does and who it's for
2. Drop any inspiration images (landscapes, objects, other apps — anything) **or music recordings** (audio clips, hummed melodies, song snippets)
3. The skill translates both visual and sonic signals into design qualities — tempo, timbre, and rhythm become energy, warmth, and texture in your UI
4. Synthesizes **3 distinct design concepts** — each with its own visual style **and motion personality** — and generates **standalone concept preview pages** with hover transitions and entrance animations, plus **mood boards** for each direction
5. You react, compare, and choose — or mix elements from different concepts
6. The chosen direction is formalized into a full design system with motion tokens and a preview page
7. Once confirmed, the design is applied to your project (via Capability 5)

#### 3. UI Layout Analysis
*For users who can't describe layout in words.*

Provide a webpage screenshot. The skill extracts its layout structure into formats both humans and LLMs can understand and reuse:

- **ASCII art diagram** — visual layout map any model can parse
- **Semantic structure** — section-by-section role description
- **Responsive behavior notes** — how the layout adapts across breakpoints
- **HTML skeleton** — clean markup structure ready to style
- **Component tree** — hierarchical breakdown of all UI parts

#### 4. Apply Design to Project
*For users who have confirmed a direction and are ready to apply.*

After exploring and choosing a design direction — whether from concept previews, mood boards, or design system extraction — this capability applies the finalized design system to your actual project:

- Confirms the scope of what to apply and where
- Audits your project's existing framework, CSS approach, and file conventions
- Generates token files in your preferred format (CSS, Tailwind, JSON)
- Integrates tokens into your project, respecting existing conventions
- Presents a summary of changes for your review

#### Composing capabilities

These capabilities chain naturally, following an **explore → choose → apply** pattern:

```
Explore vibes → Choose from 3 concepts + mood boards → Extract design system → Preview → Apply to project
```

Or mix and match — extract style from one site, apply it to a layout from another. The agent only touches your project when you say "apply."

---

## Installation

**Preferred — works with Claude Code, Codex, Cursor, Gemini CLI, Kimi Code, and any `npx`-capable agent:**

```bash
npx skills add MonkeyUI-dev/vibe-to-ui
```

**Manual (git clone):**

For **Claude Code** — installs into `~/.claude/skills/`:

```bash
# First time: create the directory if it doesn't exist
mkdir -p ~/.claude/skills

git clone https://github.com/MonkeyUI-dev/vibe-to-ui.git ~/.claude/skills/vibe-to-ui
```

For **other agents** (Codex, Cursor, Gemini CLI, Kimi Code, etc.) — installs into `~/.agents/skills/`:

```bash
# First time: create the directory if it doesn't exist
mkdir -p ~/.agents/skills

git clone https://github.com/MonkeyUI-dev/vibe-to-ui.git ~/.agents/skills/vibe-to-ui
```

---

## Usage Examples

```
# Extract a design system (generates preview first, doesn't modify your project)
"Analyze the design of this screenshot and give me the design tokens"

# Explore aesthetics with images (generates 3 concepts + mood boards)
"I want something that feels calm and modern, a bit like Scandinavian design — help me find a direction"

# Explore aesthetics with music
"I recorded a melody that captures the feeling I want — can you listen to it and translate that into a design direction?"

# Explore aesthetics from a song description
"I want my UI to feel like a slow acoustic guitar piece — warm, unhurried, and natural"

# Define motion from a vibe
"I want my product to feel innovative and fast — help me define how things should animate"

# Extract from a layout
"I love how this page is structured, extract the layout so I can reuse it"

# Apply a confirmed design to your project
"I like Concept B — apply this design to my project"

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
│   ├── MOTION-SYSTEM.md              # Motion system extraction and generation guide
│   ├── AESTHETIC-ANALYSIS.md         # Aesthetic soul capture methodology
│   ├── ICON-USAGE.md                 # Icon component guidelines
│   ├── MOOD-BOARD.md                 # Mood board generation guide
│   └── APPLY-DESIGN.md              # Apply confirmed design to project guide
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
