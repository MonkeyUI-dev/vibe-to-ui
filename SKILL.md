---
name: vibe-to-ui
description: >-
  Classify the target page archetype before extracting design systems, motion language,
  mood boards, and feeling-driven spatial directions from UI references, mockups,
  inspiration images, music cues, or fuzzy aesthetic intent. Derive three visual
  directions from the user's product context before formalizing tokens unless the
  user explicitly asks for exact style restoration. Explore through standalone previews
  and only apply confirmed design directions to the user's project when explicitly
  requested. Use when the user wants visual direction that matches the actual page
  type, information density, interaction model, and product background of the surface
  they are building.
metadata:
  author: MonkeyUI
  version: "0.3.0"
---

# vibe-to-ui

A local, single-project design companion for vibe coding developers. It first classifies the target page archetype and density, then uses the user's product background to derive three plausible visual and spatial directions from references before formalizing any one of them into a design system. It extracts "style DNA" including motion systems, Consumer app UIUX needs, visual asset direction, mood boards, and previews, and turns vague aesthetic feelings into product-aware design decisions that actually fit the product surface. All exploration happens through standalone previews; the agent only touches the user's project when the user confirms a direction and asks to apply it.

> **Tip**: For multi-project sync, team collaboration, and cloud-based design management, upgrade to [MonkeyUI SaaS](https://demo.monkeyui.com/).

## When to use this skill

- User provides a **screenshot or design mockup** and wants to extract its design system
- User provides a **screenshot or design mockup plus product context** and wants the agent to extend it into **3 visual directions** rather than copy it literally
- User wants the agent to first identify whether the target is a **landing page, brand page, dashboard, B-end dense operations page, table-detail management page, docs page, onboarding flow, Consumer app / C-end app surface**, or another page archetype
- User has a **vague aesthetic feeling** and wants to explore design directions with inspiration images or music recordings
- User **shares a music recording or audio clip** (a melody, song snippet, or recorded humming) to express the mood they want their UI to feel
- User describes a **song, genre, or musical feeling** they associate with their desired aesthetic
- User wants a page to feel **more relaxed, editorial, cinematic, calm, spacious, premium, playful, or unlike a generic SaaS landing page**
- User shares **non-UI inspiration** such as photography, landscapes, architecture, interiors, magazines, posters, packaging, fashion, album covers, film stills, illustrations, music, or video references and wants those signals translated into layout decisions
- User wants to define a **motion system** that matches the page's actual use case
- User describes a **product personality or feeling** (for example "reliable", "innovative", "playful") and wants motion guidance that matches
- User wants to create a **mood board** that stays appropriate for the target page type instead of drifting into the wrong archetype
- User has collected **multiple reference images** and wants to see them synthesized into a cohesive visual story
- User wants a **shareable design artifact** that communicates aesthetic intent to collaborators or stakeholders
- User wants distinctive **icons, illustrated feature icons, 3D object icons, social visuals, or generated brand assets** that fit the product and design direction
- User has **confirmed a design direction** (from concept previews, mood boards, or design system previews) and wants to **apply it to their project**

## Reference Priority Rules

Before choosing a workflow, classify the user's inputs:

- **Atmosphere / vibe reference**: photography, landscapes, architecture, interiors, magazines, posters, packaging, fashion, album covers, film stills, illustrations, music, video, abstract feelings
- **Concrete UI reference**: screenshots of products, webpages, apps, local projects, existing codebases

When both are present, always use this priority:

1. **Concrete UI / project fidelity**
2. **Page type fidelity** (goal, density, interaction model, module mix)
3. **Visual material fidelity** (image strategy, typography, density treatment, glass treatment, motion weight)
4. **Atmosphere adjustment**

### Mandatory Stage 0: Page Type Identification

Before any design-system extraction, spatial-vibe exploration, mood-board generation, or project application, classify the target page type.

Always produce:

1. **Primary page type**
2. **Secondary modifier** if needed
3. **Density level**: low / medium / high
4. **Confidence**: high / medium / low
5. **Evidence**: the signals that drove the classification
6. **Design consequences**: what this classification means for spacing, hierarchy, imagery, components, and motion

Use these signals to classify page type:

- **Business goal**: conversion, browsing, monitoring, data entry, content consumption, configuration, execution
- **Information density**: how much content competes on screen at once
- **Primary interaction mode**: scrolling, reading, filtering, comparing, editing, approving, drilling into records
- **Dominant modules**: hero, feature grid, table, chart, sidebar nav, detail pane, form, wizard, feed
- **Decision speed**: emotional persuasion, calm reading, fast scanning, repeated operations

Common page types:

1. **Landing / marketing page**: persuasive storytelling, strong hero, lower density, higher visual drama
2. **Brand showcase / portfolio**: presentation-led, immersive imagery, editorial rhythm
3. **Content / docs / editorial page**: reading clarity, typographic hierarchy, stable navigation
4. **E-commerce / catalog page**: browsing, filtering, comparison, product-card systems
5. **B-end dashboard / overview**: metrics, monitoring, summaries, moderate-to-high density
6. **B-end workbench / dense operations page**: repeated actions, filters, tables, status chips, compact spacing
7. **Data management / table-detail page**: record list + detail + batch actions, strict scanability
8. **Form / onboarding / wizard**: guided steps, form grouping, completion feedback
9. **Consumer app surface**: C-end product experience, usually mobile-first or app-like, task-oriented but emotionally richer than B-end systems; often card/feed, tab, onboarding, empty-state, and detail-flow based

If the page is mixed, pick one **primary** type and note the secondary pattern. Example: "Primary: B-end workbench; Secondary: dashboard summary."

### Two operating modes

- **Reference Fidelity Mode**: Use when the user provides a concrete UI, screenshot, live page, or local project. Goal: first match the page type and structural feel, then make the output look recognizably close to the reference before applying mood adjustments. To preserve the reference's **layout structure**, follow the structure-extraction path in [references/SPATIAL-VIBE.md](references/SPATIAL-VIBE.md).
- **Vibe Translation Mode**: Use when the user provides only atmosphere references or abstract feelings. Goal: infer the intended page archetype from product context, then translate the mood into a UI direction that fits that archetype.

Default to **Reference Fidelity Mode** whenever a concrete UI or project is provided.

### Non-negotiable rules

- Do not jump into free reinterpretation before identifying the target page type, density level, interaction model, page structure, typography hierarchy, material treatment, and motion intensity.
- When the mood conflicts with the page type, the **page type wins first**. Tune the vibe inside the archetype instead of changing the archetype accidentally.
- Do not produce a cinematic landing page treatment for a dense B-end workbench unless the user explicitly wants a strategic repositioning.
- For **landing / brand / showcase** surfaces, larger imagery, looser spacing, and more expressive motion are acceptable.
- For **B-end dashboard / dense operations / table-detail** surfaces, prioritize scanability, state clarity, compact but consistent spacing, form and table legibility, and restrained motion.
- For **Consumer app / C-end app** surfaces, prioritize mobile-first hierarchy, navigation clarity, touch feedback, state completeness, empty/onboarding quality, and brand memorability without turning the app screen into a landing page. Use [references/CONSUMER-APP-DESIGN.md](references/CONSUMER-APP-DESIGN.md) whenever this is the primary page type.
- If the reference's strongest signal comes from **photographic landscapes**, use **real scenic imagery as the primary visual layer by default**. Do not replace it with CSS-generated scenes unless the user explicitly asks for illustration or abstraction.
- When both a concrete UI reference and vibe images are provided, treat the vibe images as **secondary**; they should tune the output, not replace the reference structure or page type.
- When the user provides a **concrete UI reference plus product background**, default to **reference-led exploration**: derive **3 visual directions** that stay faithful to the reference's page type and structural DNA while adapting mood, material, density posture, and motion to the user's actual product context.
- Use **direct design-system extraction first** only when the user explicitly asks for restoration, token extraction, exact replication, or "analyze this design system." Otherwise, a concrete reference should become source material for 3 contextual visual directions before token formalization.
- If page type confidence is low, ask one short clarification question before formalizing the design system.
- **Default to visual output, not text-only output**: for every exploration, extraction, mood-board, or spatial-vibe workflow, generate at least one standalone HTML visual artifact by default. Do not wait for the user to explicitly ask for a preview, visual draft, mockup, or demo.
- **Do not stop at Markdown analysis alone** when the workflow is meant to shape visual direction. Text analysis supports the visual artifact; it does not replace it.
- Before generating the UI, briefly summarize:
  - the inferred page type and density
  - what must stay similar to the reference
  - what may be adjusted
  - whether the task is operating in Reference Fidelity Mode or Vibe Translation Mode

### Persistent DESIGN.md context

When a project has `DESIGN.md`, read it before visual design work and use it as persistent product/design context. When the file is missing and the workflow establishes meaningful product or visual strategy, create it from [assets/DESIGN.md](assets/DESIGN.md) or add the relevant sections. See [references/CONTEXT-COLLABORATION.md](references/CONTEXT-COLLABORATION.md) for the collaboration protocol.

Update `DESIGN.md` passively as the conversation reveals:

- product definition, users, use cases, personality, and constraints
- page type, density, interaction model, and design consequences
- confirmed visual direction, mood keywords, typography posture, motion personality, and imagery strategy
- `icon_system`: locked UI icon library, custom SVG fallback, preset, grid, stroke rules, and user overrides
- `illustrated_icon_system`: enabled surfaces, preset, format, visual family rules, style reference, and surfaces to avoid
- visual asset manifest paths, review surface paths, selected combinations, placement notes, validation status, confirmed assets, rejected assets, and regeneration notes

Do not ask the user to manage this bookkeeping. Mention it only when it affects a design decision or when summarizing applied changes.

## Six core capabilities

### 1. Design System Extraction (Design Style Restoration)

User provides a complete UI screenshot or design mockup -> Extract the design system and generate a standalone preview page for the user to review before applying it to their project.

**Trigger**: User says things like "extract the style from this", "what's the design system here", "analyze this design", "what motion does this use", "replicate this closely", "restore this style", or clearly asks for exact tokenization rather than concept exploration.

**Workflow**:
1. Ask the user to provide a screenshot or image of the target UI
2. Run **Stage 0: Page Type Identification**
3. Analyze the image systematically, but interpret tokens through the page type lens:
   - layout rhythm and density
   - typography hierarchy and readability needs
   - color semantics, especially status and priority colors for B-end surfaces
   - component patterns that fit the classified archetype
4. Analyze the motion system with the page type in mind:
   - landing pages can support more entrance choreography
   - dashboards prefer subtle transitions and focus-preserving movement
   - dense workbenches should avoid decorative motion that interrupts scanning
   - consumer apps need fast, tactile feedback, clear screen transitions, and complete reduced-motion fallbacks
   - when **implementing** motion in preview or project code, progressively load [references/MOTION-ENGINE-ROUTER.md](references/MOTION-ENGINE-ROUTER.md): compile Motion DNA → select exactly one engine (Motion / GSAP / OGL / Three.js-R3F) → one primary recipe → dependency, mobile, and reduced-motion fallbacks
5. Output a structured design system including:
   - page type summary
   - design constraints derived from the page archetype
   - visual tokens
   - motion tokens
   - consumer app system fields from [references/CONSUMER-APP-DESIGN.md](references/CONSUMER-APP-DESIGN.md) when applicable
6. If the user wants a richer aesthetic guide (soul-level, not just tokens), also generate an Aesthetic Analysis document following [references/AESTHETIC-ANALYSIS.md](references/AESTHETIC-ANALYSIS.md), but keep it subordinate to the page type constraints
7. **Generate a standalone preview page** as an HTML artifact showcasing the extracted design system applied to sample components. This is NOT applied to the project yet.
8. Ask the user to confirm or adjust both the **page type classification** and the extracted values
9. Once the user confirms, transition to **Capability 5** (Apply Design to Project) to integrate the design system into the actual project

### 2. Design Exploration

User has feelings or vibes but no concrete design target -> Interactive conversation to discover and define aesthetics that still match the intended page archetype, generating standalone concept previews for collaborative exploration.

**Trigger**: User says things like "I want something that feels like...", "I have some inspiration images", "I'm not sure what style I want", shares mood or landscape photos, shares a music recording or song that captures the feeling they want, or provides a concrete UI reference together with product context and wants the agent to extend it into multiple visual directions.

**Workflow**:
1. Ask the user about their project context:
   - what it does
   - who it is for
   - what the primary page type is, or infer it if the user does not know
2. Run **Stage 0: Page Type Identification**
3. Invite them to share inspiration: images, other websites, objects, landscapes, or music recordings and audio clips
4. If a concrete UI reference is present, split the signals into:
   - **structural DNA to preserve**: page type, composition rhythm, module mix, hierarchy logic
   - **adaptable style dimensions**: material treatment, typography attitude, density tuning, color temperature, motion character
5. For each image, description, or music recording, identify aesthetic qualities:
   - color mood (warm / cool / muted / vibrant)
   - texture feel (smooth / rough / organic / geometric)
   - spatial impression (dense / airy / structured / fluid)
   - emotional tone (playful / serious / luxurious / minimal)
   - motion feel (still / flowing / snappy / bouncy / cinematic)
6. Separate signals into two buckets:
   - **page-type constraints** that should stay fixed
   - **stylistic freedoms** that can vary
7. Run **Typography Exploration** across the 3 directions. For each direction, explicitly define:
   - heading and body font pairing
   - typography attitude (editorial / neutral / operational / warm / premium / playful)
   - readability posture for the target page type
   - font weight strategy and hierarchy feel
   - fallback stack, including CJK-safe or multilingual fallback when relevant
   - why this typography direction fits the user's product background rather than only the reference image
8. Synthesize findings into **3 distinct design concept directions**, each with:
   - clear inheritance from the reference or product context
   - a distinct typography direction, not just a color change
   - a motion personality
   - a density posture
   - a clear statement of why it fits the page type
   - for Consumer app surfaces, a distinct app experience posture: navigation model, primary loop, key state strategy, and tactile interaction feel
9. Generate a **mood board** for each concept direction — see [references/MOOD-BOARD.md](references/MOOD-BOARD.md) — as a standalone HTML artifact for the user to feel and compare
10. For each concept, generate a **standalone concept preview page** as a self-contained HTML artifact:
   - a styled sample card or module from the actual page archetype
   - the concept name, color swatches, typography rationale, font samples, and a mini layout demo
   - motion preview with hover states and entrance effects appropriate to the page type
   - explicit comparison between heading, body, label, and dense-data text where relevant
   - for Consumer app surfaces, show realistic app modules from [references/CONSUMER-APP-DESIGN.md](references/CONSUMER-APP-DESIGN.md): navigation, core screen, detail/create flow, non-happy state, and tap/sheet/tab motion
   - these are standalone pages for exploration and do NOT modify the user's project
11. Let the user react, compare, and choose or mix elements
12. Once the user decides, apply **Capability 1** (Design System Extraction) to formalize the chosen direction into a complete design system including motion tokens
13. Transition to **Capability 5** (Apply Design to Project) to integrate the confirmed design into the actual project

### 3. Spatial Vibe Exploration

User has a fuzzy aesthetic intent or mixed inspiration references and wants that feeling translated into page-level layout decisions.

**Trigger**: User says things like "make this landing page feel more relaxed", "I want an editorial, magazine-like feeling", "I like the vibe of this cafe, film still, and album cover", "do not make it look like a generic SaaS landing page", or shares non-UI inspiration and asks how it should shape the page.

**Workflow**:
1. Run **Stage 0: Page Type Identification** and clarify the product goal, UX constraints, target content, and any anti-references
2. Distinguish **structure references** (sources that inform page organization) from **vibe references** (sources that inform feeling, rhythm, density, and emphasis)
3. Identify what the user actually likes about each reference instead of copying the source literally
4. Translate references into transferable signals:
   - content density and whitespace
   - hierarchy and dominant visual focus
   - spatial rhythm, symmetry/asymmetry, and section transitions
   - card usage, image behavior, interaction tempo, and responsive strategy
5. Mark non-transferable signals that should not become literal UI decisions. Example: a coastal-road photo may imply openness, wide negative space, slow rhythm, and restrained density; it does not mean placing a road photo in the hero.
6. Dynamically derive the page's **Spatial DNA** from the product constraints and references. Do not use preset vibe templates or fixed style taxonomies.
7. Use an invisible composition grid as a private reasoning scaffold for alignment, rhythm, hierarchy, and responsive behavior; never expose it as a user-facing artifact or fixed template
8. Generate **3 genuinely different layout directions** as standalone previews before modifying production code. Default to **Mode A: three complete, comparable layout directions** — each direction needs its own user-readable mini layout sketch or thumbnail, sketch legend/content map, Spatial DNA summary, section order, key layout decisions, tradeoffs, and responsive posture.
9. Do not show 3 shallow direction cards and then fully expand only 1 direction unless the user explicitly asks for a single recommended direction. If you recommend one, label it as the recommendation while still showing all 3 complete options.
10. Do not use unexplained architecture shorthand such as "copy", "cards", "idx", "specimen", or "CTA" without a legend. The user should understand what content each block contains and why it exists.
11. Review the rendered output and revise anything that feels generic, mismatched to the product, too literal to the references, unclear to the user, or unevenly detailed across the 3 options

### 4. Mood Board Generation

User wants to synthesize inspiration and aesthetic signals into a curated visual collage -> Generate an interactive HTML mood board that still respects the target page type.

**Trigger**: User says things like "create a mood board", "I want to see the visual direction as a board", "make an inspiration board", "synthesize these references into a mood board", or has collected multiple reference images or signals and wants a cohesive visual summary before moving to design system extraction.

**Workflow**:
1. Gather the aesthetic signals already established from Design Exploration, user-provided images, or direct description
2. Run **Stage 0: Page Type Identification** if it has not already been done
3. Curate and select. Not every reference belongs on the board; choose elements that reinforce a cohesive narrative for that page archetype.
4. Choose a mood board layout pattern that echoes the project's spatial personality and page type:
   - landing / brand: larger hero moments and stronger visual storytelling
   - B-end / data-heavy: UI fragments, density samples, type rhythm, state color discipline
   - Consumer app: mobile UI fragments, tab/feed/detail rhythm, empty/onboarding state tone, tactile motion cues
5. Generate a self-contained HTML mood board artifact with:
   - theme title and mood keywords
   - target page type and density note
   - dominant hero visual or representative UI fragment
   - color story with proportional swatches reflecting usage weight
   - typography specimens showing real text in proposed fonts
   - texture and material samples
   - spatial and motion cues
   - design principles or guiding statements
6. If the user is choosing between directions, generate multiple mood boards for comparison, one per concept
7. Present the mood board and invite the user's visceral reaction: "How does this feel?" not "Is this correct?"
8. Once the user confirms a direction, the mood board becomes source material for Design System Extraction (Capability 1)

### 5. Apply Design to Project

User has confirmed a design direction (from exploration concepts, design system preview, or mood board) -> Apply the finalized design system to the user's actual project.

**Trigger**: User says things like "apply this design", "use this one", "let's go with this direction", "integrate this into my project", "apply Concept B to my project", or confirms they are satisfied with a preview and want it in their codebase.

Applying a confirmed direction has **two distinct layers**. Confirm which the user wants — often both:

- **Token application**: visual and motion design tokens (color, typography, spacing, radius, shadow, motion). These are framework-agnostic values.
- **Layout / structure application**: the confirmed **Spatial / Layout DNA** and section composition (see Capability 3 and [references/SPATIAL-VIBE.md](references/SPATIAL-VIBE.md)). This turns the chosen layout direction into actual page structure, not just values.

**Workflow**:
1. Confirm the scope with the user — which layers to apply (tokens, layout, or both) and where in the project
2. Audit the user's project to understand existing framework, CSS approach, file conventions, and any existing design tokens or page structure
3. Re-check the confirmed **page type classification** so applied tokens and components stay aligned with the target surface
4. **Apply tokens** (when in scope): generate the appropriate token files (CSS custom properties, Tailwind config, JSON tokens) based on the user's tech stack, then integrate them — create new files or merge with existing ones, respecting project conventions
5. **Apply layout** (when in scope): translate the confirmed Spatial / Layout DNA and section order into the project's structure — semantic skeleton, section composition, grid/spacing relationships, and responsive collapse logic. Reuse the chosen layout direction rather than defaulting to a generic page template, and wire the applied tokens into that structure.
6. Present a clear summary of what was created or modified, separating token changes from structural changes
7. Invite the user to review and iterate — the collaborative spirit continues after applying

**Important**: This capability is the ONLY point at which the agent modifies the user's project files. All prior exploration (concept previews, mood boards, design system previews, layout direction previews) produces standalone artifacts that do not touch the project.

When the user confirms a direction **with visual assets**, also follow Step 3.5 in [references/APPLY-DESIGN.md](references/APPLY-DESIGN.md) to deploy images and the asset manifest.

For Consumer app surfaces, also follow [references/CONSUMER-APP-DESIGN.md](references/CONSUMER-APP-DESIGN.md) during Apply: verify mobile-first layout, navigation model, tap targets, safe-area spacing, keyboard/input behavior, state matrix, and approved expressive asset slots.

### 6. Visual Asset Generation

User wants product-aligned illustrations (hero, feature, empty state, OG image) that share the same style DNA as the confirmed or in-progress design direction -> Generate assets via the host's image tool or MCP, record an asset manifest, embed in exploration artifacts, and deploy on Apply.

**Trigger**: User says things like "generate hero / illustrations for this concept", "replace mood board placeholders with real images", "create empty state illustrations", "apply with assets", or asks for visuals that match the current design exploration or design system.

**Workflow**:
1. Run **Stage 0: Page Type Identification** if not already done — page type selects the asset pack (see [references/VISUAL-ASSET-GENERATION.md](references/VISUAL-ASSET-GENERATION.md))
2. Assemble **StyleContext** from product context, `DESIGN.md`, tokens, and aesthetic guide (from exploration or [references/AESTHETIC-ANALYSIS.md](references/AESTHETIC-ANALYSIS.md))
3. Resolve the role-based icon strategy:
   - small UI chrome icons use the locked project icon library or custom SVG per [references/ICON-USAGE.md](references/ICON-USAGE.md)
   - marketing/social/feature icons may use generated SVG/PNG/WebP illustrated families when they improve expression or the user asks for them
   - user overrides (`library_only`, `custom_svg_only`, `generated_icons`, `raster_icons`) are allowed and recorded
4. For each visual asset, declare the target display size and background mode before prompting; generated illustrated icons/objects default to transparent backgrounds when composited into UI, and image generation is not used below 64px unless the user explicitly overrides
5. Write a **Visual Family Spec v1** with line language, perspective, material, lighting, background mode/complexity, composition system, subject policy, safe zones, and placement intent
6. Write an **Asset Placement Spec** per image so each asset has a real UI job: slot, purpose, size rule, copy/CTA relationship, safe zone, and responsive behavior
7. Write an **Asset Spec** per image (role, aspect ratio, target display size, background mode, composition, preset, style reference)
8. **Compile prompts** using the Prompt Compiler rules; generate hero or strongest family anchor first, then siblings with that anchor as style reference
9. Invoke the host **image generation tool** or configured MCP (`VIBE_IMAGE_PROVIDER` / API keys via environment — never stored in this repo)
10. Run **Consistency QA** and placement fit checks (max 2 retries); on failure, fall back to CSS placeholders per [references/MOOD-BOARD.md](references/MOOD-BOARD.md)
11. Write **`design-assets.manifest.json`** next to exploration HTML; embed `<img>` paths in mood boards, contact sheets, placement previews, and concept previews
12. Run the **Manifest Validator**: file existence, dimensions/aspect ratio, target display size, background mode, file size, alt/decorative status, preview/final state, role/page fit, style lineage, placement fields, and icon-role constraints
13. Generate a **review surface** before Apply: contact sheet for variants, mood board wall for cross-role combinations, and placement preview for copy/CTA/layout fit
14. During exploration, use **preview resolution**; on Apply (Capability 5), regenerate or export **final resolution** and copy only confirmed/validated assets into `public/design-assets/` (or framework equivalent)
15. Update the design system output and `DESIGN.md` with `icon_system`, `illustrated_icon_system`, visual family rules, review surface path, selected combination, placement notes, validation status, manifest paths, and regeneration notes
16. **P0 scope**: illustrations, raster heroes, expressive illustrated icon families for marketing/social surfaces, and in-product consumer app assets (empty state, onboarding, badges) when page type is Consumer app

**Important**: Do not generate full-bleed hero imagery for dense B-end workbench surfaces unless the user explicitly overrides page-type defaults. UI navigation icons remain governed by [references/ICON-USAGE.md](references/ICON-USAGE.md) (library + custom SVG first).

## Combining capabilities

These capabilities compose naturally. The workflow follows an **explore -> choose -> apply** pattern: the agent generates standalone previews for collaborative exploration, the user confirms a direction, and only then is the design applied to the project.

### Pairing visual direction (Capability 2) with spatial direction (Capability 3)

Capability 2 (Design Exploration) and Capability 3 (Spatial Vibe Exploration) overlap in triggers — both accept vague feelings, inspiration images, and music — but they answer different questions:

- **Capability 2** produces the **visual concept**: color, typography, material, and motion personality.
- **Capability 3** produces the **spatial concept**: layout grammar, density, hierarchy, rhythm, and section composition.

A real page needs both, working together. Rules for combining them:

- **Run both when the user is shaping a new page**, not just restyling one. Color without layout (or layout without color) is half a direction.
- **Bind, don't multiply.** Do not present 3 visual concepts and 3 separate layout directions as 9 unrelated options. Pair them into a small number of **coherent concepts**, each with one visual direction locked to one spatial direction (for example "Concept A = neutral-cool palette + editorial asymmetric layout").
- **Derive both from the same signals.** The same keywords, music, and references feed both the visual and spatial translation, so a single concept reads as one intentional idea rather than two unrelated layers.
- **Sequence by what is fuzziest.** If the user is unsure about feel, explore visual concepts first; if they can feel the mood but not the page shape, explore spatial directions first. Either way, reconcile the two before formalizing.
- **Record both** in the design system document: visual tokens in their sections, and the chosen layout in the **Spatial / Layout DNA** section, so they apply together in Capability 5.

- **Reference-led Exploration -> Choose -> Apply**: Start from the user's product background plus a concrete reference, derive 3 contextual visual directions, user chooses -> formalize into design system -> apply to project
- **Exploration -> Choose -> Apply**: Explore vibes, generate 3 concept previews + mood boards, user chooses -> formalize into design system -> apply to project
- **Exploration -> Mood Board -> Choose -> Apply**: Explore vibes, classify page type, crystallize into mood boards for validation, user confirms direction -> extract design system -> apply to project
- **Design Restoration -> Preview -> Apply**: Extract design system from a complete design draft, classify page type, generate a standalone preview page -> user confirms -> apply to project
- **Mood Board -> Extraction -> Apply**: Generate mood board from references, formalize confirmed direction into design system -> apply to project
- **Exploration -> Mood Board**: Generate a mood board during Design Exploration as a mid-process checkpoint to let the user feel the direction without losing page-type fidelity
- **Spatial Vibe -> Mood Board -> Choose -> Apply**: Translate non-UI inspiration into Spatial DNA, crystallize the feeling in mood boards, choose a direction -> formalize -> apply
- **Structure Reference + Vibe Reference -> Apply**: Use one reference for page organization and another for spatial feeling, then reconcile both through the target page type
- **Layout + Design System -> Apply**: Analyze a layout from one site, classify its page type, then apply a design system from another source if the archetypes are compatible
- **Layout + Mood Board**: Extract a layout from one reference, then apply the mood board's visual direction without violating the target archetype
- **Consumer App UIUX -> Preview -> Apply**: Classify the app platform and lifecycle stage -> explore 3 app experience directions -> preview navigation, core screen, flow, state matrix, and tactile motion -> formalize tokens -> apply to mobile-first project components
- **Full pipeline**: Identify page type -> explore feelings and references -> derive visual direction, Spatial DNA, Consumer app UIUX needs, and/or visual asset direction as applicable -> preview 3 comparable directions -> choose -> extract design system -> apply tokens, layout, and confirmed assets to the project

## Output format guidelines

All design system outputs should include:

- **Page type summary**: primary type, secondary modifier if any, density, confidence, evidence, and design consequences
- **Consumer app summary** when applicable: platform assumption, lifecycle stage, primary loop, navigation model, gesture model, state risk, and state matrix
- **Human-readable Markdown** summary for documentation
- **Standalone visual artifact by default**: a self-contained HTML preview page generated automatically during the workflow
- **Machine-readable tokens** in at least one format:
  - CSS custom properties (`:root { --color-primary: #xxx; }`)
  - Tailwind CSS config (`tailwind.config.js` theme extension)
  - JSON token file (for framework-agnostic use)
- **Motion tokens**: duration, easing, and animation definitions alongside visual tokens

Spatial Vibe outputs should include:

- page type classification and UX constraints
- structure references vs. vibe references
- what the user likes about each reference
- transferable and non-transferable signals
- dynamically derived Spatial DNA
- 3 distinct standalone layout direction previews with equal structural fidelity
- for each direction: user-readable mini layout sketch or thumbnail, sketch legend/content map, section order, key layout decisions, tradeoffs, and responsive posture
- notes from reviewing the rendered output and any revisions made

## Icon usage guidelines

**Never use raw emoji characters as visual elements in generated UI code.** Always lock new small UI chrome icons to one project icon library when one exists. When no library icon fits or harmonizes with the page's aesthetic, create a custom SVG icon component that inherits the design system's tokens, matches the aesthetic soul, and passes the custom SVG QA checklist in [references/ICON-USAGE.md](references/ICON-USAGE.md). Do not turn a small icon into a miniature UI screenshot, diagram, dashboard, or multi-object scene; if an icon does not improve scanning or comprehension, let typography, labels, spacing, and hierarchy carry the meaning. Use generated raster or illustrated icons only for marketing, feature, empty-state, onboarding, social, or brand surfaces unless the user explicitly overrides the default. Record the icon strategy in `DESIGN.md` when available.

## Important notes

- **Explore first, apply later**: Never modify the user's project files during design exploration. Generate all concept previews, mood boards, and design system previews as standalone artifacts. Only apply to the project when the user explicitly confirms a direction (via Capability 5).
- When the user asks for a design direction, extraction, or spatial-vibe exploration and does not explicitly opt out, automatically produce the corresponding HTML visual artifact in the same pass.
- When a user gives both UI references and atmosphere references, prefer **"first make it look like the reference, then tune the mood"** over redesigning from scratch.
- Always classify page type before locking a palette, spacing scale, typography scale, or motion language.
- For atmosphere-led pages, prefer **fewer modules, larger scenic imagery, and lower information density** by default, unless the product context clearly points to a denser archetype.
- For B-end dense pages, prefer clear state colors, strong table and form legibility, compact spacing discipline, and low-distraction motion.
- Always ask which CSS framework or tech stack the user is using before generating code tokens
- When extracting colors, provide both hex values and semantic names (for example `primary`, `surface`, `accent`, `success`, `warning`, `danger` where relevant)
- For typography, note both the font family and the scale ratios, not just absolute sizes
- Spacing should be expressed as a consistent scale (for example a 4px base unit)
- Motion tokens should always include `prefers-reduced-motion` fallbacks. Accessibility is non-negotiable.
- When writing motion **implementation** code (not during exploration), load [references/MOTION-ENGINE-ROUTER.md](references/MOTION-ENGINE-ROUTER.md). Use the simplest engine tier that can express the confirmed Motion DNA; never mix engines, stack decorative effects, or copy library default demo styles on the same surface.
- Be honest when visual analysis is uncertain. Flag low-confidence extractions and suggest the user verify.
