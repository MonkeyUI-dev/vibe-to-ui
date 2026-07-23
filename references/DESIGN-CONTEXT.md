# Design Context (Local Profile MVP)

## Overview

Design Context is a **local, profile-scoped brand memory** that lives outside the skill package and outside any single project repo.

It turns a website URL or screenshot into a reusable brand visual language, persists it under `~/.vibe-to-ui/profiles/<profile>/`, and on demand adapts that shared brand into **medium-specific target rules**. A target is an open medium abstraction — not a fixed enum. Common examples include `web`, `social-cover`, and `hyperframes`; users may also define their own (e.g. `linkedin`, `print-brochure`, `email-header`).

This is the 90/10 MVP: reuse existing extraction capabilities (Design System Extraction, Aesthetic Analysis, Motion System), write plain files, and keep user data separate from skill install/update. When the user provides a URL, intake follows [INSPIRATION-SOURCES.md](INSPIRATION-SOURCES.md) (browse → frontend cues → selective capture → optional motion); screenshots and other sources remain equally valid.

**Out of scope for this MVP:** cloud sync, team collaboration, vector databases, and complex UI.

## Core vocabulary

| Term | Meaning |
|------|---------|
| **Profile** | One independent brand, product, or client design context (e.g. `vibe-to-ui`, `acme-brand`). Not an output platform. |
| **Target** | A medium adaptation of the same profile — any kebab-case medium id the user needs (e.g. `web`, `social-cover`, `hyperframes`, `linkedin`, `print-brochure`). Not a closed list. |
| **Brand master** | Cross-medium shared language in `brand.md` + `tokens.json` + `decisions.md`. |
| **Profile doc** | `profile.md` — human-readable profile summary with YAML frontmatter for id/timestamps (same pattern as project `DESIGN.md`). |
| **Merged context** | Brand master + requested target rules, assembled for a downstream agent. |

## Storage root (user data, not skill data)

```text
~/.vibe-to-ui/
├── inspirations/              # Design Inspiration Library (global cases)
│   └── <inspiration-id>/
├── page-directions/           # Page Direction + Inspiration Memory (Cap 9)
│   └── <project-slug>/
└── profiles/
    └── <profile>/
        ├── profile.md
        ├── brand.md
        ├── tokens.json
        ├── decisions.md
        ├── inspiration-refs.json  # optional links to inspirations/ (no case copy)
        ├── assets/
        ├── sources/
        └── targets/          # created on demand, not at profile creation
            ├── web.md                 # example
            ├── social-cover.md        # example
            ├── hyperframes.md         # example
            ├── linkedin.md            # user-defined example
            └── print-brochure.md      # user-defined example
```

Target filenames are `targets/<target-id>.md`. The ids above are illustrations only — any valid medium id may appear. Inspiration cases are documented in [INSPIRATION-LIBRARY.md](INSPIRATION-LIBRARY.md) — they must **not** be stored inside a profile directory. Page Direction sessions are documented in [PAGE-DIRECTION.md](PAGE-DIRECTION.md).

### Lifecycle separation (non-negotiable)

| Location | Owns | Skill update / reinstall |
|----------|------|--------------------------|
| Skill package (`SKILL.md`, `references/`, `assets/` templates) | Instructions and empty templates | May change freely |
| `~/.vibe-to-ui/` | User profiles, inspiration library, tokens, decisions, assets, sources, targets | **Must never be overwritten, deleted, or reset** by skill install, update, or remove |

- Never store live profile data inside the skill directory.
- Never copy `~/.vibe-to-ui/` into the skill package.
- Templates under `assets/design-context/` are **seeds only**. Copy them into `~/.vibe-to-ui/profiles/<profile>/` when creating or updating a profile; do not reverse-sync user edits back into the skill.

Expand `~` to the current user's home directory. If `$HOME` / `~` is unavailable, ask once where to store profiles, then keep using that root consistently.

## Command surface

```bash
vibe-to-ui context --list
vibe-to-ui context --profile <profile> --init
vibe-to-ui context --profile <profile> --target <medium>
```

`<medium>` is a kebab-case medium id. Examples (not an exhaustive allow-list): `web`, `social-cover`, `hyperframes`, `linkedin`, `print-brochure`, `email-header`.

### CLI (programmatic)

This skill package ships a **Node.js zero-dependency CLI** (`bin/vibe-to-ui.js`, `package.json` bin: `vibe-to-ui`):

| Command | Behavior |
|---------|----------|
| `--list` | **Read-only** list of profiles under `~/.vibe-to-ui`. If the root does not exist, print an empty-state message — never create directories. |
| `--profile <id> --init` | Create profile skeleton from `assets/design-context/` seeds; create `assets/` + `sources/`; **do not** create `targets/`; never overwrite existing shared files |
| `--profile <id> --target <medium>` | Ensure `targets/<medium>.md` exists (create stub if missing, else reuse); append a decision note **only on first create**; print **merged context** on stdout |

Root is always `~/.vibe-to-ui` (`os.homedir()` + `.vibe-to-ui`). There is **no** `VIBE_TO_UI_HOME` override. Do not store profiles under `/tmp` or inside the project/skill directory.

For `--init` / `--target`, the CLI checks that `~/.vibe-to-ui` is writable (user-level home permissions — not elevated privileges). Permission failures exit non-zero with an explicit grant-write message — never fall back to a temp directory.

Run via:

```bash
# from a checkout / installed skill directory
node bin/vibe-to-ui.js context --list
node bin/vibe-to-ui.js context --profile vibe-to-ui --init
node bin/vibe-to-ui.js context --profile vibe-to-ui --target print-brochure

# when the package bin is on PATH (local npm link / npx)
npx vibe-to-ui context --list
```

`--from-url` / `--from-image` are **not** implemented in the CLI yet. URL/image extraction remains an agent workflow that writes into an already-initialized profile.

Agents should prefer the CLI for list / init / target lifecycle and merge assembly, then fill brand/target **content** using the skill guides. Agents must **not** invent an alternate storage root.

## Profile vs target

```text
Profile (brand / product / client)
  └── shared: brand.md + tokens.json + decisions.md + assets/ + sources/
        ├── target: web              → layout, components, responsive, interaction   (example)
        ├── target: social-cover     → ratio, composition, title hierarchy           (example)
        ├── target: hyperframes      → shots, captions, transitions, pacing          (example)
        ├── target: linkedin         → feed crop, headline budget, professional tone (user-defined)
        └── target: print-brochure   → trim, folds, ink/contrast, physical hierarchy (user-defined)
```

- Creating a profile writes the shared brand master only.
- `targets/` is **not** created by default.
- The first request for a given target generates that target file from the brand master and saves it.
- Later requests **reuse and update** the existing target file instead of regenerating from scratch.
- Targets are **open-ended**: `web` / `social-cover` / `hyperframes` are common examples and have built-in generation guides; any other medium id the user names is valid and uses the [generic target generation guide](#generic-custom-medium).

## Workflow A — Create or refresh a profile from a source

**Trigger:** user provides a website URL and/or screenshot and asks to save / extract design context into a named profile; or runs `--init` / `--from-url` / `--from-image`.

### Steps

1. **Resolve profile id**
   - Prefer the explicit `--profile` value.
   - Normalize to lowercase kebab-case: letters, digits, hyphens only (`vibe-to-ui`, `acme-brand`).
   - If missing, derive a short id from the product/brand name and confirm once.

2. **Ensure directory skeleton**
   - Create `~/.vibe-to-ui/profiles/<profile>/` if missing.
   - Create `assets/` and `sources/` always.
   - Do **not** create `targets/` yet.

3. **Record the source**
   - Under `sources/`, write a dated source record (see [sources template](../assets/design-context/sources/SOURCE.template.md)).
   - For URLs: store the URL, fetch/browse date, and short notes about what was observed (homepage hero, brand page, app UI, etc.).
   - For screenshots/images: copy the file into `sources/` (and optionally `assets/` if it is a reusable brand visual), keep the original filename when safe, and note capture context.
   - Prefer append-only source history. Do not delete prior sources when refreshing.

4. **Extract brand visual language (reuse existing capabilities)**
   - Run Stage 0 page-type identification when the source is a UI surface ([SKILL.md](../SKILL.md)).
   - Reuse Design System Extraction ([DESIGN-SYSTEM.md](DESIGN-SYSTEM.md)) for colors, typography, spacing, radius, shadow, motion.
   - Optionally deepen with [AESTHETIC-ANALYSIS.md](AESTHETIC-ANALYSIS.md) for brand soul / principles (keep subordinate to observed evidence).
   - Reuse [MOTION-SYSTEM.md](MOTION-SYSTEM.md) when motion is visible or clearly implied.
   - For URL sources: follow [INSPIRATION-SOURCES.md](INSPIRATION-SOURCES.md) — browse/fetch the page, read frontend structure and CSS tokens, take **selective** visual captures only as needed, and observe motion when tools allow. If the URL cannot be accessed, offer cropped screenshots or partial continuation — user chooses. For screenshot-only sources, analyze the image directly without requiring a URL.

5. **Write shared profile files**
   - Copy seed templates from the skill package's `assets/design-context/` for **shared files only**: `profile.md`, `brand.md`, `tokens.json`, `decisions.md`. Do **not** create or seed `targets/` at init.
   - Fill `profile.md` — metadata (name, description, sources summary, created/updated timestamps).
   - Fill `brand.md` — cross-medium brand temperament, visual language, design principles.
   - Fill `tokens.json` — brand-shared Design Tokens in DTCG Format Module (2025.10) shape, with group names aligned to Google DESIGN.md (`colors`, `typography`, `spacing`, `rounded`). See [Token format](#token-format-dtcg--designmd). Do not put page-layout-only or component-only tokens here; those belong in project `DESIGN.md` or a target.
   - Append to `decisions.md` — important extraction/adaptation decisions and why (Design Memory). Never delete prior decisions; mark superseded ones instead.
   - Copy durable brand visuals (logo, key screenshots, illustrations) into `assets/` when available.
   - This skill package does **not** ship per-medium target templates (neither for common examples like `web` / `social-cover` / `hyperframes`, nor for user-defined media). Target rule packs may be supplied later by an external mechanism; until then, generate `targets/<target>.md` from the brand master using the guides below when a target is requested.

6. **Update vs recreate**
   - If the profile already exists: update `brand.md` / `tokens.json` with new evidence, bump `updated_at` in `profile.md`, append to `decisions.md` and `sources/`.
   - Do not wipe `assets/`, `sources/`, or existing `targets/` during a refresh.

7. **Confirm to the user**
   - Show profile path, what was extracted, confidence gaps, and that no target was generated unless requested.

## Workflow B — `vibe-to-ui context --profile <profile> --target <target>`

**Trigger:** user asks for context for a specific medium, or runs the command above.

### Steps

1. **Load the profile**
   - Read `~/.vibe-to-ui/profiles/<profile>/`.
   - If missing: tell the user and offer Workflow A (init from URL/screenshot).
   - Required shared files: `brand.md`, `tokens.json`. If `decisions.md` or `profile.md` is missing, recreate from templates without inventing fake history.

2. **Resolve target path**
   - Accept any kebab-case medium id: lowercase letters, digits, and hyphens only (e.g. `web`, `social-cover`, `linkedin`, `print-brochure`).
   - Normalize user phrasing to a stable id (`"LinkedIn cover"` → `linkedin`, `"纸质产品宣传手册"` / `"print brochure"` → `print-brochure`). Confirm once when the mapping is ambiguous.
   - Do **not** reject a target merely because it is not `web` / `social-cover` / `hyperframes` — those are examples, not an allow-list.
   - Path: `targets/<target>.md`.

3. **Create or update target rules**
   - If an **external target rule pack** for this target is available (future provider), prefer that as the starting structure, then fill from the brand master.
   - If `targets/<target>.md` **does not exist**:
     - Create `targets/` if needed.
     - Generate rules from `brand.md` + `tokens.json` + `decisions.md` + relevant `assets/`:
       - If the id matches a **named example guide** below (`web`, `social-cover`, `hyperframes`), use that guide.
       - Otherwise use the **[generic custom-medium guide](#generic-custom-medium)** — derive constraints from the medium's physical/digital properties (format, audience, reading distance, motion capability, production limits).
     - Save the file under the profile's `targets/`.
   - If it **does exist**:
     - Prefer reuse: read the existing file first.
     - Update only where brand master changes, new decisions, or user feedback require it.
     - Preserve medium-specific choices the user already confirmed unless they ask to regenerate.
     - Append a short "Updated" note with date when material changes land.

4. **Merge and emit context for the downstream agent**

Assemble one merged package (Markdown + embedded or adjacent JSON) containing:

1. Profile metadata (`profile.md`)
2. Brand master (`brand.md`)
3. Design tokens (`tokens.json`)
4. Relevant decisions (full `decisions.md`, or the latest / target-tagged entries if very long)
5. Target rules (`targets/<target>.md`)
6. Asset pointers under `assets/` that matter for this target (logos, hero refs, motion refs)

Present this merged context to the user and to the consuming agent for that medium. Examples of typical consumers (not exhaustive):

| Target (examples) | Typical consumer |
|-------------------|------------------|
| `web` | Webpage / app UI agent |
| `social-cover` | Social cover / OG / share-card agent |
| `hyperframes` | Launch video / Hyperframes agent |
| `linkedin` | LinkedIn post / profile / cover agent |
| `print-brochure` | Print / layout agent (trim, folds, ink) |

Do not invent a second token system per target. Targets adapt **application rules**; shared tokens stay in `tokens.json`.

## Target generation guides

Targets are medium abstractions. The three guides below are **common examples** with concrete checklists. For any other medium id, use the [generic custom-medium guide](#generic-custom-medium).

### Example: `web.md`

Derive from brand master:

- Layout density and hierarchy posture for product/web UI
- Component surface rules (buttons, inputs, cards/panels — only when interaction needs a container)
- Responsive breakpoints and collapse behavior
- Interaction and motion application (hover, focus, page transitions) using shared motion tokens
- What must stay brand-faithful vs what may flex per page type

### Example: `social-cover.md`

Derive from brand master:

- Aspect ratios (e.g. 1:1, 4:5, 16:9, 1.91:1) and safe zones
- Composition: brand mark placement, title hierarchy, supporting line budget
- Mobile readability: minimum type size feel, contrast, edge margins
- Color/type usage when space is scarce (hero budget: brand + one headline + one short line + one dominant visual)
- Avoid card chrome and overlay stickers unless the brand already uses them

### Example: `hyperframes.md`

Derive from brand master:

- Shot language and visual motifs from brand imagery
- Caption / subtitle hierarchy and on-screen type rules
- Transition vocabulary mapped from motion tokens (tempo, easing, density)
- Pacing and beat structure that match brand energy
- What not to do (generic stock motion, conflicting color flashes, unreadable type)

### Generic custom medium

Use when the target id is **not** one of the named examples above (or when the user names a medium that only partially overlaps an example — e.g. `linkedin` is closer to social-cover but may need feed-specific rules).

Always start by writing these fields into `targets/<target>.md`:

1. **Medium identity** — human name, slug, and one sentence on what artifact this produces
2. **Format constraints** — size / aspect / page count / fold / duration / character limits / safe zones
3. **Audience & context** — where it is seen (desk, phone feed, trade show, mailer) and reading distance
4. **Brand application** — how color, type, imagery, and motion (if any) map from the brand master without inventing a second token system
5. **Hierarchy budget** — what must appear (brand mark, headline, support, CTA, legal) and what must not crowd the first view
6. **Production limits** — print ink/bleed, platform crop rules, motion capability, file formats
7. **Do / don't** — medium-specific anti-patterns that would break brand or usability

Reuse overlapping example guides as **partial checklists** when helpful (e.g. LinkedIn cover → social-cover ratio/composition ideas; print brochure → hierarchy + contrast from web, but drop interaction/motion). Never refuse a custom medium; generate a best-effort rule pack and note confidence gaps in `decisions.md`.

**Illustrative custom media** (not seeded; generate on request):

| Slug example | Derive especially |
|--------------|-------------------|
| `linkedin` | Feed crop, professional tone, headline budget, mobile scan |
| `print-brochure` | Trim/bleed, folds, ink contrast, physical reading order |
| `email-header` | Narrow width, dark-mode clients, alt text, load weight |
| `packaging` | Dieline panels, viewing angles, material/finish cues |

## Relationship to project `DESIGN.md`

| Artifact | Scope | Location |
|----------|-------|----------|
| Design Context profile | Cross-project brand / client memory | `~/.vibe-to-ui/profiles/<profile>/` |
| Project `DESIGN.md` | Single-repo product + page context | Project root |

Rules:

1. When a profile is active and the user is working in a project, **read the profile first** for brand tokens and principles.
2. Continue using project `DESIGN.md` for product definition, page type, and project-local decisions ([CONTEXT-COLLABORATION.md](CONTEXT-COLLABORATION.md)).
3. Optionally note the active profile id in `DESIGN.md` Iteration Context (e.g. `design_context_profile: vibe-to-ui`) so later sessions reconnect.
4. Do not replace `DESIGN.md` with the profile; do not copy the entire profile into the repo unless the user asks to export.

## Confidence and honesty

- Mark low-confidence token extractions in `tokens.json` notes or in `decisions.md`.
- If a URL cannot be fetched, say so and proceed from screenshots or partial HTML.
- Prefer fewer high-confidence tokens over a complete but invented system.

## Anti-patterns

- Storing profiles inside the skill repo or `~/.agents/skills/vibe-to-ui/`
- Creating all target files (or any fixed set of example targets) on profile init
- Regenerating an existing target from scratch when a light update would do
- Treating media ids (`web`, `social-cover`, `hyperframes`, `linkedin`, …) as separate **profiles**
- Rejecting a user-defined medium because it is not in the example list
- Cloud sync, team sharing, or embedding pipelines in this MVP
- Overwriting `decisions.md` or deleting `sources/` history

## Quick checklist

```text
[ ] Profile id is kebab-case and means a brand/product/client
[ ] Files written under ~/.vibe-to-ui/profiles/<profile>/
[ ] Skill package templates were copied, not used as the live store
[ ] sources/ records URL and/or screenshot provenance
[ ] brand.md + tokens.json + decisions.md reflect shared brand language
[ ] targets/ created only when a target was requested (any medium id)
[ ] Existing target reused/updated rather than blindly regenerated
[ ] Custom media use the generic guide (examples are not an allow-list)
[ ] Merged context emitted for the requesting medium agent
[ ] ~/.vibe-to-ui/ left untouched by any skill install/update path
```

## Token format (DTCG + DESIGN.md)

`tokens.json` is the machine-readable brand token store. It is shaped for two industry references:

| Source | What we take |
|--------|----------------|
| [W3C DTCG Format Module 2025.10](https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/) | Token envelope: `$value`, `$type`, `$description`, `$extensions`; groups; `{path.to.token}` aliases; typed values (`color`, `dimension`, `fontFamily`, `fontWeight`, `duration`, `cubicBezier`); composites (`typography`, `shadow`, `transition`) |
| [Google DESIGN.md](https://github.com/google-labs-code/design.md) (alpha) | Group names and agent-facing roles: `colors`, `typography` (named text styles), `spacing`, `rounded`; CSS color strings; `{colors.primary}`-style references; recommended names such as `primary` / `on-surface` / `body-md` |

### Rules for this MVP

1. **Envelope is DTCG.** Every token is an object with `$value` (and usually `$type`, inherited from the group when omitted on the leaf).
2. **Groups mirror DESIGN.md** where they overlap: `colors`, `typography`, `spacing`, `rounded`. Use `rounded`, not `radius`.
3. **Colors** use CSS color strings (hex recommended), matching DESIGN.md. Full DTCG Color Module objects are optional when wide-gamut precision is required.
4. **Dimensions / durations** use DTCG `{ "value": number, "unit": "px"|"rem" }` or `{ "value": number, "unit": "ms"|"s" }`.
5. **Typography** is a map of composite styles (e.g. `headline-md`, `body-md`), not only a font-family list — same idea as DESIGN.md frontmatter.
6. **Aliases** use `{group.token}` (e.g. `"{fontFamily.heading}"`).
7. **Profile metadata** (profile id, confidence, sources) goes in `$extensions["com.vibe-to-ui"]`, not as fake tokens.
8. **Motion** is a vibe-to-ui extension (`duration`, `easing`, `transition`) until DESIGN.md adds an official motion section.
9. **Components** stay out of the brand profile by default — put them in project `DESIGN.md` or a medium target when needed.
10. When syncing into a project `DESIGN.md`, map `colors` / `typography` / `spacing` / `rounded` into YAML frontmatter; keep elevation/motion in prose or extensions until the project format supports them.

Seed file: [tokens.json](../assets/design-context/tokens.json)

## Templates

Shared seed files only (copy into the profile directory; never edit user copies via skill update):

- [profile.md](../assets/design-context/profile.md)
- [brand.md](../assets/design-context/brand.md)
- [tokens.json](../assets/design-context/tokens.json)
- [decisions.md](../assets/design-context/decisions.md)
- [sources/SOURCE.template.md](../assets/design-context/sources/SOURCE.template.md)

Target rule files are **not** bundled in this skill. They are written under `~/.vibe-to-ui/profiles/<profile>/targets/<target>.md` when requested — for common examples (`web`, `social-cover`, `hyperframes`) or any user-defined medium — using the guides above or a future external provider.

Example walkthrough: [design-context-e2e.md](../assets/examples/design-context-e2e.md)
