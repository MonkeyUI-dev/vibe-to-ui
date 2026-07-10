# vibe-to-ui

[中文](README.zh_CN.md)

> Agent Skills for vibe coding developers — build professional-grade UIs without designer expertise.

---

## What is vibe-to-ui?

**vibe-to-ui** is an [Agent Skills](https://agentskills.io) package that gives AI coding agents (Claude Code, GitHub Copilot, Cursor, etc.) specialized design knowledge so they can help developers who code by feel — but don't speak fluent design. Beyond static visual tokens, vibe-to-ui also extracts and generates **motion systems** — defining how, when, and why UI elements should animate to communicate meaning and product personality. With **visual asset generation**, it can produce hero illustrations, feature imagery, and empty-state art aligned to your product and confirmed design direction (via your agent's image tool or MCP). The agent works collaboratively — all design exploration happens through standalone previews and concept pages, and only touches your project when you confirm a direction and ask to apply it.

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

A design companion for vibe coding developers. Turns screenshots, mood images, non-UI inspiration, music, and gut feelings into structured design systems, motion languages, Consumer app UIUX systems, visual asset directions, and product-aware spatial layouts — and, by default, uses the user's product background to derive **3 visual directions** before formalizing tokens, so the result is visible and exploratory instead of prematurely locked. Only applies designs to your project when you're ready.

**Seven core capabilities:**

#### 1. Design System Extraction
*For users who have a complete design to restore.*

Provide a screenshot of a UI or design mockup. The skill extracts its complete "style DNA" and generates a **standalone preview page** for you to evaluate — it does not modify your project until you confirm:

- **Colors** — with semantic roles (primary, surface, text, border, etc.)
- **Typography** — font families, size scale, weights, line heights
- **Spacing** — base unit and consistent multiplier scale
- **Border radius** — per-component radius strategy
- **Shadows** — elevation system
- **Motion** — tempo, easing, density, triggers, reduced-motion fallback
- **Consumer app UIUX** — navigation model, primary loop, state matrix, tactile feedback, and mobile-first preview requirements when the page type is a C-end app surface

Outputs tokens in three formats: **CSS custom properties**, **Tailwind CSS config**, and a **JSON token file** — applied to your project only after you confirm the preview.

Use this path when you want **restoration or close replication**. If you instead want the reference to be **extended into 3 possible directions for your own product**, the skill should route to Design Exploration first.

#### 2. Design Exploration
*For users who only have a feeling.*

Not sure what style you want? Or do you already have a reference image, but want it translated into **3 visual directions based on your product background** instead of copied literally? The skill guides you through an interactive conversation:

1. Shares what your project does and who it's for
2. Drop any inspiration images (landscapes, objects, other apps — anything) **or music recordings** (audio clips, hummed melodies, song snippets)
3. The skill translates both visual and sonic signals into design qualities — tempo, timbre, and rhythm become energy, warmth, and texture in your UI
4. Explores **typography as its own axis** across the 3 directions — heading/body pairing, readability posture, hierarchy feel, and fallback stack
5. Synthesizes **3 distinct design concepts** — each with its own visual style **and motion personality** — and, when a concrete reference exists, keeps them recognizably descended from that reference's structure and page archetype
6. Generates **standalone concept preview pages** with page-type appropriate transitions and entrance animations, plus **mood boards** for each direction. For Consumer app surfaces, previews include navigation, a core screen, a detail/create flow, a non-happy state, and tactile app motion.
7. You react, compare, and choose — or mix elements from different concepts, including typography across directions
8. The chosen direction is formalized into a full design system with motion tokens and a preview page
9. Once confirmed, the design is applied to your project (via Capability 5)

#### 3. Spatial Vibe Exploration
*For users who can feel the page, but cannot yet describe the layout.*

Want a landing page to feel more relaxed, editorial, cinematic, spacious, or less like a generic SaaS template? Share fuzzy intent or references from anywhere:

- photography, landscapes, architecture, interiors
- magazines, posters, packaging, fashion
- album covers, film stills, illustrations
- music or video references

The skill translates those references into transferable layout signals — content density, whitespace, hierarchy, dominant visual focus, spatial rhythm, card usage, image behavior, section transitions, interaction tempo, and responsive strategy. Non-UI inspiration is not copied literally: a coastal-road photo might become openness, wide negative space, slow rhythm, and restrained density, not "put a road photo in the hero."

It then derives a product-aware **Spatial DNA** and generates **3 genuinely different standalone layout previews** before any production code changes. Each direction is comparable at the same level of detail: user-readable mini layout sketch, label/content map, section order, spatial rhythm, tradeoffs, and responsive posture.

#### 4. Mood Board Generation
*For users who want a visual direction board before locking tokens.*

When references are atmospheric, mixed, or still a bit fuzzy, the skill can generate a **standalone HTML mood board** that turns the direction into something visceral and shareable:

- Curates references into one coherent visual story instead of a random collage
- Shows color story, typography mood, texture/material cues, and motion hints together
- Keeps the board aligned with the actual page archetype so it does not drift into the wrong kind of product surface
- Lets you compare multiple directions side by side before formalizing a design system

#### 5. Apply Design to Project
*For users who have confirmed a direction and are ready to apply.*

After exploring and choosing a design direction — whether from concept previews, mood boards, or design system extraction — this capability applies the finalized design system to your actual project:

- Confirms the scope of what to apply and where
- Audits your project's existing framework, CSS approach, and file conventions
- Generates token files in your preferred format (CSS, Tailwind, JSON)
- Integrates tokens into your project, respecting existing conventions
- Presents a summary of changes for your review
- Optionally deploys visual assets to `public/design-assets/` with a manifest (see Capability 6)

#### 6. Visual Asset Generation
*For users who want product-aligned imagery, not only tokens.*

After a design direction exists (or during exploration), the skill compiles **StyleContext** from your product background, page type, tokens, and aesthetic guide, then drives your agent's **image generation tool** (a host-provided tool or MCP server) to create:

- **Hero, feature, empty-state, and OG/social** illustrations (P0)
- **Consistent visual families** per concept — hero first, then sibling assets with style reference
- **Role-based icon strategy** — one locked UI icon library for chrome, custom SVG fallback, generated illustrated icons for marketing/social surfaces
- **Review + placement workflow** — contact sheets, mood board walls, placement previews, safe zones, and manifest validation before Apply
- **`design-assets.manifest.json`** — paths, roles, alt text, regeneration lineage
- **Mood boards with real `<img>` assets** instead of CSS placeholders when tools are available
- **Apply with assets** — copies into `public/design-assets/` and wires your components

UI navigation icons still use a single locked icon library or custom SVG ([ICON-USAGE.md](references/ICON-USAGE.md)). Expressive feature icons, 3D object icons, and social visuals can use generated SVG/PNG/WebP families when they support memorability and sharing. This phase focuses on image-based assets only.

See [references/VISUAL-ASSET-GENERATION.md](references/VISUAL-ASSET-GENERATION.md) and the E2E walkthrough [assets/examples/visual-asset-e2e.md](assets/examples/visual-asset-e2e.md).

#### 7. Local Design Context (Profile + Targets)
*For users who want reusable brand memory across projects and media.*

Extract brand visual language from a **website URL or screenshot** and persist it under `~/.vibe-to-ui/profiles/<profile>/` — outside the skill package so install/update never overwrites your data:

- **Profile** = one brand, product, or client (e.g. `vibe-to-ui`, `nextai`) — not an output platform
- Shared brand master: `profile.yaml`, `brand.md`, `tokens.json`, `decisions.md`, `assets/`, `sources/`
- **Targets on demand** (`web`, `social-cover`, `hyperframes`): created the first time you ask, then reused and updated
- Merge brand + tokens + decisions + target rules for webpage, social-cover, or launch-video agents

```bash
vibe-to-ui context --profile <profile> --target web|social-cover|hyperframes
```

See [references/DESIGN-CONTEXT.md](references/DESIGN-CONTEXT.md) and [assets/examples/design-context-e2e.md](assets/examples/design-context-e2e.md). Cloud sync, team collaboration, and vector search are out of scope for this MVP.

#### Consumer App UIUX scenario

When the target is a Consumer app / C-end app, vibe-to-ui treats it as a first-class development scene, not just a page type label:

- Classifies platform, lifecycle stage, primary loop, navigation model, gesture model, and state risk
- Requires previews to show navigation, home/feed or main task, detail/create flow, non-happy state, and touch-oriented motion
- Adds a state matrix for loading, empty, error, offline, and success behavior
- Keeps generated assets in product-safe slots such as onboarding, empty states, badges, achievements, and share cards
- Preserves vector UI chrome icons while allowing expressive illustrated assets where they improve memory and motivation

See [references/CONSUMER-APP-DESIGN.md](references/CONSUMER-APP-DESIGN.md) and the E2E walkthrough [assets/examples/consumer-app-e2e.md](assets/examples/consumer-app-e2e.md).


#### Composing capabilities

These capabilities chain naturally, following an **explore → choose → apply** pattern:

```
Use product background + reference → Get 3 contextual visual directions → Choose from concept previews + mood boards → Extract design system → Preview → Apply to project
```

Or mix and match — use one reference for structure, another for atmosphere, and translate both into a product-aware spatial direction. The agent only touches your project when you say "apply."

---

## Installation

**Preferred — works with Claude Code, Codex, Cursor, Gemini CLI, Kimi Code, and any `npx`-capable agent:**

```bash
npx skills add MonkeyUI-dev/vibe-to-ui#v0.3.0
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

# Explore spatial vibe
"I like the vibe of this cafe, this film still, and this album cover — make my landing page feel editorial, but not like a generic SaaS page"

# Apply a confirmed design to your project
"I like Concept B — apply this design to my project"


# Generate visuals for a concept (exploration — does not modify your project)
"Generate hero and feature illustrations for Concept B that match our product"

# Generate an expressive illustrated icon family
"Create 3D feature icons for Concept B, but keep app navigation icons in Lucide"

# Explore a Consumer app experience
"Design 3 visual/UIUX directions for my habit-tracking consumer app, including onboarding, tabs, empty state, and tactile motion"

# Apply design tokens and images together
"Apply Concept B with assets to my Next.js app"

# Save brand context from a URL or screenshot into a local profile
"Extract design context from https://nextai.example into profile nextai"

# Load or generate medium-specific rules for a profile
"vibe-to-ui context --profile nextai --target web"
"vibe-to-ui context --profile nextai --target social-cover"
"vibe-to-ui context --profile nextai --target hyperframes"

# Full pipeline
"I have some inspiration images and a music clip — let's explore the spatial vibe, choose a direction, then apply it to my product"
```


---

## Visual assets: tools and environment

vibe-to-ui is **instructions-only** — it does not bundle API keys or call image APIs itself. Your agent uses host tools or MCP.

The skill passively records visual decisions in `DESIGN.md` when available: locked UI icon library, custom SVG fallback, illustrated icon preset, visual family rules, manifest paths, confirmed assets, and regeneration notes.

### Host image tool (default)

Use the built-in image generation tool provided by your agent host when the skill triggers Capability 6. Save outputs beside mood board HTML during exploration; copy to `public/design-assets/` on Apply.

### Optional MCP / API providers

Set environment variables in your shell or agent config (never commit secrets):

| Variable | Purpose |
|----------|---------|
| `VIBE_IMAGE_PROVIDER` | `host` (default), `openai`, `flux`, `ideogram`, `recraft` |
| `OPENAI_API_KEY` | OpenAI image models |
| `BFL_API_KEY` | Flux API |
| `IDEOGRAM_API_KEY` | Ideogram |
| `RECRAFT_API_KEY` | Recraft |

Expose MCP tools such as `generate_image(prompt, width, height, reference_path?)` that write files to disk and return paths.

### Cost and resolution

- **Exploration**: preview size (~960px long edge) to limit cost
- **Apply**: regenerate at final size (e.g. 1920px hero) when the user confirms
- **Retries**: at most 2 per asset, then CSS placeholder fallback

---

## Skill Structure

```
.
├── SKILL.md                          # Core instructions (loaded on activation)
├── references/
│   ├── DESIGN-SYSTEM.md              # Design system extraction methodology
│   ├── DESIGN-EXPLORATION.md         # Interactive exploration conversation guide
│   ├── SPATIAL-VIBE.md               # Feeling-driven layout exploration guide
│   ├── MOTION-SYSTEM.md              # Motion system extraction and generation guide
│   ├── MOTION-ENGINE-ROUTER.md       # Progressive-load engine router (web/React/Vue × L1–L4)
│   ├── AESTHETIC-ANALYSIS.md         # Aesthetic soul capture methodology
│   ├── CONTEXT-COLLABORATION.md      # DESIGN.md collaboration protocol
│   ├── DESIGN-CONTEXT.md             # Local Design Context profile + targets MVP
│   ├── ICON-USAGE.md                 # Icon component guidelines
│   ├── MOOD-BOARD.md                 # Mood board generation guide
│   ├── CONSUMER-APP-DESIGN.md        # Consumer app / C-end UIUX scenario guide
│   ├── VISUAL-ASSET-GENERATION.md    # Hero/illustration generation + manifest
│   └── APPLY-DESIGN.md              # Apply confirmed design to project guide
└── assets/
    ├── DESIGN.md                     # Persistent product/design context template
    ├── design-system-template.md     # Standard output template for design tokens
    ├── design-context/               # Seed templates for ~/.vibe-to-ui/profiles/
    │   ├── profile.yaml
    │   ├── brand.md
    │   ├── tokens.json
    │   ├── decisions.md
    │   ├── sources/
    │   └── targets/                  # web | social-cover | hyperframes seeds
    └── examples/
        ├── visual-asset-e2e.md       # Concept → mood board → apply walkthrough
        ├── consumer-app-e2e.md       # Consumer app UIUX → preview → apply walkthrough
        ├── design-context-e2e.md     # Source → profile → target → handoff walkthrough
        └── design-assets.manifest.example.json
```

User Design Context data lives at `~/.vibe-to-ui/profiles/<profile>/` and is **not** part of this package. Skill updates never overwrite it.

Following [Agent Skills progressive disclosure](https://agentskills.io/specification): only `SKILL.md` metadata loads at startup (~100 tokens). Reference files load on demand, keeping context lean.

---

## Compatible Agents

This skill follows the open [Agent Skills standard](https://agentskills.io) and works with any compatible agent:

Claude Code · GitHub Copilot · Cursor · Gemini CLI · TRAE · and more.

---

## License

MIT — see [LICENSE](LICENSE).

Built with ❤️ by [MonkeyUI-dev](https://github.com/MonkeyUI-dev).
