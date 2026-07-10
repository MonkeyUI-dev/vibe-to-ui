# Design Context (Local Profile MVP)

## Overview

Design Context is a **local, profile-scoped brand memory** that lives outside the skill package and outside any single project repo.

It turns a website URL or screenshot into a reusable brand visual language, persists it under `~/.vibe-to-ui/profiles/<profile>/`, and on demand adapts that shared brand into medium-specific target rules (`web`, `social-cover`, `hyperframes`).

This is the 90/10 MVP: reuse existing extraction capabilities (Design System Extraction, Aesthetic Analysis, Motion System), write plain files, and keep user data separate from skill install/update.

**Out of scope for this MVP:** cloud sync, team collaboration, vector databases, and complex UI.

## Core vocabulary

| Term | Meaning |
|------|---------|
| **Profile** | One independent brand, product, or client design context (e.g. `vibe-to-ui`, `nextai`, a customer brand). Not an output platform. |
| **Target** | A medium adaptation of the same profile: `web`, `social-cover`, or `hyperframes`. |
| **Brand master** | Cross-medium shared language in `brand.md` + `tokens.json` + `decisions.md`. |
| **Merged context** | Brand master + requested target rules, assembled for a downstream agent. |

## Storage root (user data, not skill data)

```text
~/.vibe-to-ui/
└── profiles/
    └── <profile>/
        ├── profile.yaml
        ├── brand.md
        ├── tokens.json
        ├── decisions.md
        ├── assets/
        ├── sources/
        └── targets/          # created on demand, not at profile creation
            ├── web.md
            ├── social-cover.md
            └── hyperframes.md
```

### Lifecycle separation (non-negotiable)

| Location | Owns | Skill update / reinstall |
|----------|------|--------------------------|
| Skill package (`SKILL.md`, `references/`, `assets/` templates) | Instructions and empty templates | May change freely |
| `~/.vibe-to-ui/` | User profiles, tokens, decisions, assets, sources, targets | **Must never be overwritten, deleted, or reset** by skill install, update, or remove |

- Never store live profile data inside the skill directory.
- Never copy `~/.vibe-to-ui/` into the skill package.
- Templates under `assets/design-context/` are **seeds only**. Copy them into `~/.vibe-to-ui/profiles/<profile>/` when creating or updating a profile; do not reverse-sync user edits back into the skill.

Expand `~` to the current user's home directory. If `$HOME` / `~` is unavailable, ask once where to store profiles, then keep using that root consistently.

## Command surface

Agents should treat the following as the canonical invocation (natural language equivalents are fine):

```bash
vibe-to-ui context --profile <profile> --target web|social-cover|hyperframes
```

Optional source flags the agent may accept in the same turn:

```bash
# URL source
vibe-to-ui context --profile <profile> --from-url https://example.com

# Screenshot / image source
vibe-to-ui context --profile <profile> --from-image ./shot.png

# Create or refresh brand master only (no target yet)
vibe-to-ui context --profile <profile> --init

# List known profiles
vibe-to-ui context --list
```

There is no separate CLI binary in this skill package. The agent executes the workflow with filesystem tools: create directories, write files, read existing profiles, and merge context for the user.

## Profile vs target

```text
Profile (brand / product / client)
  └── shared: brand.md + tokens.json + decisions.md + assets/ + sources/
        ├── target: web            → layout, components, responsive, interaction
        ├── target: social-cover   → ratio, composition, title hierarchy, mobile readability
        └── target: hyperframes    → shots, captions, transitions, pacing, motion
```

- Creating a profile writes the shared brand master only.
- `targets/` is **not** created by default.
- The first request for a given target generates that target file from the brand master and saves it.
- Later requests **reuse and update** the existing target file instead of regenerating from scratch.

## Workflow A — Create or refresh a profile from a source

**Trigger:** user provides a website URL and/or screenshot and asks to save / extract design context into a named profile; or runs `--init` / `--from-url` / `--from-image`.

### Steps

1. **Resolve profile id**
   - Prefer the explicit `--profile` value.
   - Normalize to lowercase kebab-case: letters, digits, hyphens only (`nextai`, `acme-brand`).
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
   - For URL sources without a screenshot: browse or fetch the page when tools allow; otherwise ask the user for a screenshot and continue with partial confidence notes.

5. **Write shared profile files**
   - Copy seed templates from the skill package's `assets/design-context/` for **shared files only**: `profile.yaml`, `brand.md`, `tokens.json`, `decisions.md`. Do **not** copy `targets/` at init.
   - Fill `profile.yaml` — metadata (name, description, sources summary, created/updated timestamps).
   - Fill `brand.md` — cross-medium brand temperament, visual language, design principles.
   - Fill `tokens.json` — structured design tokens (color, typography, spacing, radius, elevation, motion). Prefer the JSON shape from [design-system-template.md](../assets/design-system-template.md); drop page-layout-only fields that are not brand-shared, or keep them under a `layoutHints` object if useful.
   - Append to `decisions.md` — important extraction/adaptation decisions and why (Design Memory). Never delete prior decisions; mark superseded ones instead.
   - Copy durable brand visuals (logo, key screenshots, illustrations) into `assets/` when available.
   - When a target is later requested, copy the matching seed from `assets/design-context/targets/<target>.md` into the profile's `targets/` and fill it from the brand master.

6. **Update vs recreate**
   - If the profile already exists: update `brand.md` / `tokens.json` with new evidence, bump `updated_at` in `profile.yaml`, append to `decisions.md` and `sources/`.
   - Do not wipe `assets/`, `sources/`, or existing `targets/` during a refresh.

7. **Confirm to the user**
   - Show profile path, what was extracted, confidence gaps, and that no target was generated unless requested.

## Workflow B — `vibe-to-ui context --profile <profile> --target <target>`

**Trigger:** user asks for context for a specific medium, or runs the command above.

### Steps

1. **Load the profile**
   - Read `~/.vibe-to-ui/profiles/<profile>/`.
   - If missing: tell the user and offer Workflow A (init from URL/screenshot).
   - Required shared files: `brand.md`, `tokens.json`. If `decisions.md` or `profile.yaml` is missing, recreate from templates without inventing fake history.

2. **Resolve target path**
   - Allowed targets: `web` | `social-cover` | `hyperframes`.
   - Path: `targets/<target>.md`.

3. **Create or update target rules**
   - If `targets/<target>.md` **does not exist**:
     - Create `targets/` if needed.
     - Generate rules from `brand.md` + `tokens.json` + `decisions.md` + relevant `assets/` using the matching target template under [assets/design-context/targets/](../assets/design-context/targets/).
     - Save the file.
   - If it **does exist**:
     - Prefer reuse: read the existing file first.
     - Update only where brand master changes, new decisions, or user feedback require it.
     - Preserve medium-specific choices the user already confirmed unless they ask to regenerate.
     - Append a short "Updated" note with date when material changes land.

4. **Merge and emit context for the downstream agent**

Assemble one merged package (Markdown + embedded or adjacent JSON) containing:

1. Profile metadata (`profile.yaml`)
2. Brand master (`brand.md`)
3. Design tokens (`tokens.json`)
4. Relevant decisions (full `decisions.md`, or the latest / target-tagged entries if very long)
5. Target rules (`targets/<target>.md`)
6. Asset pointers under `assets/` that matter for this target (logos, hero refs, motion refs)

Present this merged context to the user and to the consuming agent for that medium:

| Target | Typical consumer |
|--------|------------------|
| `web` | Webpage / app UI agent |
| `social-cover` | Social cover / OG / share-card agent |
| `hyperframes` | Launch video / Hyperframes agent |

Do not invent a second token system per target. Targets adapt **application rules**; shared tokens stay in `tokens.json`.

## Target generation guides

### `web.md`

Derive from brand master:

- Layout density and hierarchy posture for product/web UI
- Component surface rules (buttons, inputs, cards/panels — only when interaction needs a container)
- Responsive breakpoints and collapse behavior
- Interaction and motion application (hover, focus, page transitions) using shared motion tokens
- What must stay brand-faithful vs what may flex per page type

### `social-cover.md`

Derive from brand master:

- Aspect ratios (e.g. 1:1, 4:5, 16:9, 1.91:1) and safe zones
- Composition: brand mark placement, title hierarchy, supporting line budget
- Mobile readability: minimum type size feel, contrast, edge margins
- Color/type usage when space is scarce (hero budget: brand + one headline + one short line + one dominant visual)
- Avoid card chrome and overlay stickers unless the brand already uses them

### `hyperframes.md`

Derive from brand master:

- Shot language and visual motifs from brand imagery
- Caption / subtitle hierarchy and on-screen type rules
- Transition vocabulary mapped from motion tokens (tempo, easing, density)
- Pacing and beat structure that match brand energy
- What not to do (generic stock motion, conflicting color flashes, unreadable type)

## Relationship to project `DESIGN.md`

| Artifact | Scope | Location |
|----------|-------|----------|
| Design Context profile | Cross-project brand / client memory | `~/.vibe-to-ui/profiles/<profile>/` |
| Project `DESIGN.md` | Single-repo product + page context | Project root |

Rules:

1. When a profile is active and the user is working in a project, **read the profile first** for brand tokens and principles.
2. Continue using project `DESIGN.md` for product definition, page type, and project-local decisions ([CONTEXT-COLLABORATION.md](CONTEXT-COLLABORATION.md)).
3. Optionally note the active profile id in `DESIGN.md` Iteration Context (e.g. `design_context_profile: nextai`) so later sessions reconnect.
4. Do not replace `DESIGN.md` with the profile; do not copy the entire profile into the repo unless the user asks to export.

## Confidence and honesty

- Mark low-confidence token extractions in `tokens.json` notes or in `decisions.md`.
- If a URL cannot be fetched, say so and proceed from screenshots or partial HTML.
- Prefer fewer high-confidence tokens over a complete but invented system.

## Anti-patterns

- Storing profiles inside the skill repo or `~/.agents/skills/vibe-to-ui/`
- Creating all three target files on profile init
- Regenerating an existing target from scratch when a light update would do
- Treating `web` / `social-cover` / `hyperframes` as separate profiles
- Cloud sync, team sharing, or embedding pipelines in this MVP
- Overwriting `decisions.md` or deleting `sources/` history

## Quick checklist

```text
[ ] Profile id is kebab-case and means a brand/product/client
[ ] Files written under ~/.vibe-to-ui/profiles/<profile>/
[ ] Skill package templates were copied, not used as the live store
[ ] sources/ records URL and/or screenshot provenance
[ ] brand.md + tokens.json + decisions.md reflect shared brand language
[ ] targets/ created only when a target was requested
[ ] Existing target reused/updated rather than blindly regenerated
[ ] Merged context emitted for the requesting medium agent
[ ] ~/.vibe-to-ui/ left untouched by any skill install/update path
```

## Templates

Seed files (copy into the profile directory; never edit user copies via skill update):

- [profile.yaml](../assets/design-context/profile.yaml)
- [brand.md](../assets/design-context/brand.md)
- [tokens.json](../assets/design-context/tokens.json)
- [decisions.md](../assets/design-context/decisions.md)
- [sources/SOURCE.template.md](../assets/design-context/sources/SOURCE.template.md)
- [targets/web.md](../assets/design-context/targets/web.md)
- [targets/social-cover.md](../assets/design-context/targets/social-cover.md)
- [targets/hyperframes.md](../assets/design-context/targets/hyperframes.md)

Example walkthrough: [design-context-e2e.md](../assets/examples/design-context-e2e.md)
