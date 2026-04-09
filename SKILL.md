---
name: vibe-to-ui
description: >-
  Extract design systems (colors, typography, spacing, shadows, radius, motion) from UI
  screenshots or design mockups, explore aesthetic directions through interactive
  conversation with mood/inspiration images or music recordings, generate mood boards as
  curated visual collages to crystallize and communicate design direction, analyze UI
  layout structures from webpage screenshots into reusable ASCII layout blueprints,
  apply confirmed design directions to the user's project, and codify design constraints
  into a DESIGN.md file that any AI coding agent can read to enforce design consistency
  during iterative development. All exploration outputs (concept previews, mood boards,
  design system previews) are generated as standalone artifacts — the agent only modifies
  project files when the user explicitly confirms a direction and asks to apply it.
  Includes motion system extraction — defining how, when, and why elements animate to
  communicate meaning and product personality. Includes Design Guard — extracting
  established design decisions, component behavior contracts, and anti-patterns from
  iterating projects into a universal DESIGN.md that keeps coding agents aligned with
  product identity. Use when the user wants to establish visual style and motion language
  for their project, needs help defining design aesthetics, wants to extract a design
  system from an existing UI, wants to define or understand a motion system, wants to
  create a mood board to capture and validate aesthetic direction before formal design,
  needs to understand and reuse a webpage layout structure, has confirmed a design
  direction and wants to apply it to their project, wants to lock down design constraints
  for consistent AI-generated UI, or needs to update design constraints after project
  iteration. Also use when the user shares a music recording or describes a song/melody
  to express the emotional feeling they want their design to convey. Ideal for vibe
  coding developers who lack professional design skills.
metadata:
  author: MonkeyUI
  version: "0.1.0"
---

# vibe-to-ui

A local, single-project design companion for vibe coding developers. Extracts "style DNA" — including motion systems — from visual references, generates mood boards to crystallize aesthetic direction, and turns vague aesthetic feelings into actionable design systems with motion language — no design expertise required. All design exploration happens through standalone previews; the agent only touches your project when you confirm a direction and ask to apply it.

> **Tip**: For multi-project sync, team collaboration, and cloud-based design management, upgrade to [MonkeyUI SaaS](https://demo.monkeyui.com/).

## When to use this skill

- User provides a **screenshot or design mockup** and wants to extract its design system
- User has a **vague aesthetic feeling** and wants to explore design directions with inspiration images or music recordings
- User **shares a music recording or audio clip** (a melody, song snippet, or recorded humming) to express the mood they want their UI to feel
- User describes a **song, genre, or musical feeling** they associate with their desired aesthetic
- User provides a **screenshot of any UI** (full page or any section/component) and wants to extract its layout structure for reuse
- User wants to define a **motion system** — how, when, and why elements should animate
- User describes a **product personality or feeling** (e.g., "reliable", "innovative", "playful") and wants motion guidance that matches
- User wants to create a **mood board** — a curated visual collage to capture and communicate design direction before formal design work
- User has collected **multiple reference images** and wants to see them synthesized into a cohesive visual story
- User wants a **shareable design artifact** that communicates aesthetic intent to collaborators or stakeholders
- User has **confirmed a design direction** (from concept previews, mood boards, or design system previews) and wants to **apply it to their project**
- User's project has been through initial design setup and wants to **lock down design constraints** so coding agents stay consistent
- User says things like "guard my design", "create a DESIGN.md", "lock down my design", "keep the AI consistent", "extract design constraints"
- User notices **design inconsistency** creeping in across pages or components during iterative development
- User wants to **update design constraints** after adding new features or components ("update my DESIGN.md", "sync design guard")

## Six core capabilities

### 1. Design System Extraction (Design Style Restoration)

User provides a complete UI screenshot or design mockup → Extract design system and generate a standalone preview page for the user to review before applying to their project.

**Trigger**: User says things like "extract the style from this", "what's the design system here", "analyze this design", "what motion does this use", or provides an image asking to replicate the look and feel.

**Workflow**:
1. Ask the user to provide a screenshot or image of the target UI
2. Analyze the image systematically — see [references/DESIGN-SYSTEM.md](references/DESIGN-SYSTEM.md) for token extraction and [references/AESTHETIC-ANALYSIS.md](references/AESTHETIC-ANALYSIS.md) for aesthetic soul capture
3. Analyze the motion system — see [references/MOTION-SYSTEM.md](references/MOTION-SYSTEM.md)
4. Output a structured design system (including motion tokens) following the template in [assets/design-system-template.md](assets/design-system-template.md)
5. If the user wants a richer aesthetic guide (soul-level, not just tokens), also generate an Aesthetic Analysis document following [references/AESTHETIC-ANALYSIS.md](references/AESTHETIC-ANALYSIS.md)
6. **Generate a standalone preview page** as an HTML artifact showcasing the extracted design system applied to sample components — this is NOT applied to the project yet, it is a separate preview for the user to evaluate
7. Ask user to confirm or adjust the extracted values and preview
8. Once the user confirms, transition to **Capability 5** (Apply Design to Project) to integrate the design system into the actual project

### 2. Design Exploration

User has feelings/vibes but no concrete design target → Interactive conversation to discover and define aesthetics, generating standalone concept previews for collaborative exploration.

**Trigger**: User says things like "I want something that feels like...", "I have some inspiration images", "I'm not sure what style I want", shares mood/landscape/object photos, or shares a music recording/audio clip/song that captures the feeling they want.

**Workflow** — see [references/DESIGN-EXPLORATION.md](references/DESIGN-EXPLORATION.md):
1. Ask the user about their project context (what it does, who it's for)
2. Invite them to share inspiration — images (landscapes, objects, other websites, anything) **or music recordings/audio clips**
3. For each image, description, or music recording, identify aesthetic qualities:
   - Color mood (warm/cool/muted/vibrant)
   - Texture feel (smooth/rough/organic/geometric)
   - Spatial impression (dense/airy/structured/fluid)
   - Emotional tone (playful/serious/luxurious/minimal)
   - Motion feel (still/flowing/snappy/bouncy/cinematic)
4. For each **music recording or audio clip**, translate sonic qualities into design signals — see [references/DESIGN-EXPLORATION.md](references/DESIGN-EXPLORATION.md)
5. Synthesize findings into **3 distinct design concept directions**, each with a motion personality
6. Generate a **mood board** for each concept direction — see [references/MOOD-BOARD.md](references/MOOD-BOARD.md) — as a standalone HTML artifact for the user to feel and compare
7. For each concept, generate a **standalone concept preview page** as a self-contained HTML artifact:
   - A styled sample card/component showcasing the palette, typography, and spacing
   - Include the concept name, color swatches, font samples, and a mini layout demo
   - Include motion preview: CSS transitions/animations on hover states and entrance effects
   - These are standalone pages for exploration — they do NOT modify the user's project
8. Let the user react, compare, and choose (or mix elements from different concepts)
9. Once the user decides, apply **Capability 1** (Design System Extraction) to formalize the chosen direction into a complete design system including motion tokens
10. Transition to **Capability 5** (Apply Design to Project) to integrate the confirmed design into the actual project

### 3. UI Layout Analysis

User provides a screenshot of any UI — a full webpage or any section of one (e.g., an asymmetric feature showcase, a pricing block, a hero area) → Extract and formalize its layout structure. This is especially useful for sections with unique spatial structures that are hard to describe verbally.

**Trigger**: User says things like "I like this layout", "analyze this page structure", "extract the layout from this screenshot", "how is this section structured", or provides an image of any UI component or page region — especially one with a complex or non-obvious layout.

**Workflow** — see [references/LAYOUT-ANALYSIS.md](references/LAYOUT-ANALYSIS.md):
1. Ask the user to provide a screenshot — it can be the full page or any specific section/component
2. Analyze the visual hierarchy and spatial structure
3. Output a multi-layer layout blueprint:
   - **ASCII art** representation for LLM-friendly layout description
   - **Spatial proportion hints** (loose percentage sketch of positions and sizes) to convey spatial feel and rhythm — not for exact replication, but to prevent major misreadings; see Step 3b in the LAYOUT-ANALYSIS guide
   - **Semantic structure** describing each section's role
   - **Responsive behavior** notes (how it likely adapts to smaller screens)
4. Generate a reusable layout skeleton (HTML structure or component tree) the user can apply to their own project
5. Ask user if they want to customize any section or combine with a design system from Capability 1

### 4. Mood Board Generation

User wants to synthesize inspiration and aesthetic signals into a curated visual collage → Generate an interactive HTML mood board as a tangible design anchor.

**Trigger**: User says things like "create a mood board", "I want to see the visual direction as a board", "make an inspiration board", "synthesize these references into a mood board", or has collected multiple reference images/signals and wants a cohesive visual summary before moving to design system extraction.

**Workflow** — see [references/MOOD-BOARD.md](references/MOOD-BOARD.md):
1. Gather the aesthetic signals already established (from Design Exploration, user-provided images, or direct description)
2. Curate and select — not every reference belongs on the board; choose elements that reinforce a cohesive narrative
3. Choose a mood board layout pattern that echoes the project's spatial personality (grid collage, organic flow, asymmetric editorial, or minimal centered)
4. Generate a self-contained HTML mood board artifact with:
   - Theme title and mood keywords
   - Dominant hero visual (CSS-generated or image reference)
   - Color story with proportional swatches reflecting usage weight
   - Typography specimens showing real text in proposed fonts
   - Texture and material samples
   - Spatial and motion cues (including optional subtle CSS animation)
   - Design principles / guiding statements
5. If the user is choosing between directions, generate multiple mood boards for comparison (one per concept)
6. Present the mood board and invite the user's visceral reaction — "How does this feel?" not "Is this correct?"
7. Once the user confirms a direction, the mood board becomes source material for Design System Extraction (Capability 1)

### 5. Apply Design to Project

User has confirmed a design direction (from exploration concepts, design system preview, or mood board) → Apply the finalized design system to the user's actual project.

**Trigger**: User says things like "apply this design", "use this one", "let's go with this direction", "integrate this into my project", "apply Concept B to my project", or confirms they are satisfied with a preview and want it in their codebase.

**Workflow** — see [references/APPLY-DESIGN.md](references/APPLY-DESIGN.md):
1. Confirm the scope with the user — which parts of the design to apply and where in the project
2. Audit the user's project to understand existing framework, CSS approach, file conventions, and any existing design tokens
3. Generate the appropriate token files (CSS custom properties, Tailwind config, JSON tokens) based on the user's tech stack
4. Integrate the tokens into the project — create new files or merge with existing ones, respecting project conventions
5. Present a clear summary of what was created or modified
6. Invite the user to review and iterate — the collaborative spirit continues after applying

**Important**: This capability is the ONLY point at which the agent modifies the user's project files. All prior exploration (concept previews, mood boards, design system previews) produces standalone artifacts that do not touch the project.

### 6. Design Guard

User's project has gone through initial design and iteration → Extract established design decisions and codify them into a `DESIGN.md` file that any AI coding agent reads to generate consistent UI.

**Trigger**: User says things like "guard my design", "lock down my design", "create a DESIGN.md", "keep the AI consistent with my design", "extract design constraints", or notices inconsistency creeping in during iterative development. Also triggered naturally after **Capability 5** (Apply Design to Project) as a recommended next step.

**Workflow** — see [references/DESIGN-GUARD.md](references/DESIGN-GUARD.md) for full methodology and [references/DESIGN-GUARD-INTEGRATION.md](references/DESIGN-GUARD-INTEGRATION.md) for agent integration:

#### 6a: Extract & Codify

1. **Audit the project** — scan token files (CSS vars, Tailwind config, JSON tokens), component patterns, motion usage, existing design documents
2. **Interview the user** — ask about brand personality, intentional design choices, interaction pattern rationale, terminology rules (1–2 questions at a time, conversational)
3. **Generate DESIGN.md** — produce a comprehensive design constraint file following the template in [assets/design-guard-template.md](assets/design-guard-template.md):
   - Standard DESIGN.md sections (Visual Theme, Color Palette, Typography, Component Stylings, Layout, Depth, Do's/Don'ts, Responsive) compatible with the [DESIGN.md standard](https://stitch.withgoogle.com/docs/design-md/overview/)
   - Extended sections for iterating products: Component Behavior Contracts, Motion Constraints, Copy & Voice, Guard Metadata, Evolve Triggers, Decision Log
4. **Place at project root** — `DESIGN.md` goes in the root directory where all coding agents can discover it
5. **Check for existing agent files** — if the project has `AGENTS.md`, `CLAUDE.md`, `.instructions.md`, `.cursor/rules/`, or `.windsurfrules`, offer to add a one-line pointer to `DESIGN.md` (never create these files from scratch)
6. **Summary** — present what was created and what the guard covers

#### 6b: Evolve & Update

1. **Read existing DESIGN.md** — load current guard and its metadata
2. **Re-scan the project** — identify new components, new pages, modified tokens, new interaction patterns since last update
3. **Diff against existing constraints** — categorize findings as consistent (✅), evolution (🆕 new pattern to add), or drift (⚠️ deviation from constraints)
4. **Present findings to user** — show what's new, what's changed, what might be drifting
5. **Update DESIGN.md** — merge confirmed changes, update metadata, log decisions
6. **Summary** — list what changed in the guard

**Design Guard philosophy**: Constraints are a gravity field, not a wall. They pull agents toward consistency but never block legitimate creative work. Evolve triggers embedded in the guard suggest updates — they don't prevent coding.

## Combining capabilities

These capabilities compose naturally. The workflow follows an **explore → choose → apply** pattern: the agent generates standalone previews for collaborative exploration, the user confirms a direction, and only then is the design applied to the project.

- **Exploration → Choose → Apply**: Explore vibes, generate 3 concept previews + mood boards, user chooses → formalize into design system → apply to project
- **Exploration → Mood Board → Choose → Apply**: Explore vibes, crystallize into mood boards for validation, user confirms direction → extract design system → apply to project
- **Design Restoration → Preview → Apply**: Extract design system from a complete design draft, generate a standalone preview page → user confirms → apply to project
- **Mood Board → Extraction → Apply**: Generate mood board from references, formalize confirmed direction into design system → apply to project
- **Exploration → Mood Board**: Generate a mood board during Design Exploration (after concept synthesis, before visual preview) as a mid-process checkpoint to let the user feel the direction
- **Layout + Design System → Apply**: Analyze a layout from one site, apply a design system from another → user confirms the combination → apply to project
- **Layout + Mood Board**: Extract a layout from one reference, apply the mood board's visual direction to it
- **Full pipeline**: Explore feelings → Choose direction (from 3 concepts + mood boards) → Extract design system → Analyze a reference layout → Preview → Apply styled skeleton to project
- **Apply → Guard**: After applying a design system to the project, immediately extract constraints into DESIGN.md to lock in the direction for all future agent sessions
- **Guard → Evolve**: After significant project iteration, re-scan and update the DESIGN.md to capture new patterns and detect drift
- **Full lifecycle**: Explore → Choose → Apply → Guard → Iterate → Evolve → (repeat Evolve as needed)

## Output format guidelines

All design system outputs should include:
- **Human-readable Markdown** summary for documentation
- **Machine-readable tokens** in at least one format:
  - CSS custom properties (`:root { --color-primary: #xxx; }`)
  - Tailwind CSS config (`tailwind.config.js` theme extension)
  - JSON token file (for framework-agnostic use)
- **Motion tokens** — duration, easing, and animation definitions alongside visual tokens

Layout outputs should include:
- ASCII art layout diagram
- **Spatial proportion hints** (loose percentage sketch of each major element's position and size) — gives the agent a sense of spatial weight and rhythm without dictating an exact reproduction
- Semantic HTML structure
- Component hierarchy description

Design Guard outputs should include:
- A single `DESIGN.md` file at the project root following the [DESIGN.md standard](https://stitch.withgoogle.com/docs/design-md/overview/) with guard extensions
- Standard sections (Visual Theme, Colors, Typography, Components, Layout, Depth, Do's/Don'ts, Responsive) for universal agent compatibility
- Extended sections (Behavior Contracts, Motion Constraints, Copy & Voice, Metadata, Evolve Triggers, Decision Log) for iterating products
- Guard Metadata block with structured data (version, known_components, known_pages, token_files) for programmatic evolve detection

## Icon usage guidelines

**Never use raw emoji characters as visual elements in generated UI code.** Always use the project's icon component library. When no library icon fits or harmonizes with the page's aesthetic, create a custom SVG icon component that inherits the design system's tokens and matches the aesthetic soul — see [references/ICON-USAGE.md](references/ICON-USAGE.md) for detailed guidance.

## Important notes

- **Explore first, apply later**: Never modify the user's project files during design exploration. Generate all concept previews, mood boards, and design system previews as standalone artifacts. Only apply to the project when the user explicitly confirms a direction (via Capability 5).
- **Guard is a gravity field, not a wall**: Design Guard constraints pull agents toward consistency but never block legitimate creative work. Evolve triggers embedded in the guard suggest updates — they don't prevent coding. Write constraints as context and rationale, not terse rules.
- **DESIGN.md is agent-neutral**: The guard outputs a single DESIGN.md at the project root using the [DESIGN.md standard](https://stitch.withgoogle.com/docs/design-md/overview/). This format is natively understood by Google Stitch and universally discoverable by all major coding agents (Copilot, Claude Code, Cursor, Codex, Windsurf, etc.). Never create agent-specific instruction files from scratch — only add minimal pointers to existing ones.
- **Guard evolves with the project**: After initial guard creation, recommend the user update it periodically. The guard contains embedded evolve triggers that help coding agents notice when an update may be needed.
- Always ask which CSS framework/tech stack the user is using before generating code tokens
- When extracting colors, provide both hex values and semantic names (e.g., `primary`, `surface`, `accent`)
- For typography, note both the font family and the scale ratios, not just absolute sizes
- Spacing should be expressed as a consistent scale (e.g., 4px base unit)
- Motion tokens should always include `prefers-reduced-motion` fallbacks — accessibility is non-negotiable
- Be honest when visual analysis is uncertain — flag low-confidence extractions and suggest the user verify
