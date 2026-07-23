# Page Direction + Inspiration Memory

## Why this exists

Many pages are already “not ugly” but still **ordinary**: no memorable proposition, weak hero presence, interchangeable SaaS chrome, or motion piled on as decoration. Users then either paste a random website for the agent to copy, or ask for “more animation.”

**Page Direction** forces a product-aware fork **before** Spatial DNA locks, Motion DNA formalizes, or the Motion Engine Router loads. It retrieves local Inspiration Memory, proposes **3 structurally different directions**, previews them as equal standalone HTML, pauses for human choice, records decisions, then compiles DNA and only then selects the cheapest sufficient motion implementation.

MVP: local files + simple keyword search. No vector DB, cloud sync, recommendation model, or graph DB.

## When this workflow is mandatory

Run Page Direction when **any** of these are true:

1. Designing a **new** primary page / surface
2. User says the current page feels **普通 / generic / forgettable / lacking hero or memory point**
3. User asks to “make it more interesting” without a locked concept
4. User wants motion, polish, or “wow” but **no page direction is selected yet**

### Hard gate (non-negotiable)

| Phase | Allowed | Forbidden |
|-------|---------|-----------|
| Before user selects / mixes / rejects directions | Stage 0, Brand/Inspiration retrieve, 3 Page Directions, equal HTML previews, provisional Spatial + Motion notes, Exploration Interim Motion (CSS only) | Loading [MOTION-ENGINE-ROUTER.md](MOTION-ENGINE-ROUTER.md); rewriting project UI; applying tokens as final; stacking decorative motion to “fix ordinary” |
| After selection recorded | Compile Spatial DNA + Motion DNA; then Router at lowest sufficient tier; full-page preview | Skipping decision memory write |
| After full-page preview confirm | Capability 5 Apply | Silent Apply |

**Exact restoration** (Capability 1 restore path) may skip Page Direction when the user explicitly wants token-faithful replication — not “make it special.”

## Relationship to other capabilities

| Capability | Role here |
|------------|-----------|
| Stage 0 page type | Always first |
| Cap 7 Design Context | Brand temperament + tokens as constraints |
| Cap 8 Inspiration Library | Case retrieval via local keyword search |
| Cap 2 Design Exploration | Visual attitude feeds into a Page Direction — do not run as a separate 3×3 |
| Cap 3 Spatial Vibe | Spatial DNA is **compiled from** the chosen Page Direction (not a second parallel tournament) |
| Motion System | Provisional DNA during preview; confirmed DNA after selection |
| Motion Engine Router | **Only after** selection + DNA compile |
| Cap 5 Apply | Only after full-page preview confirm |

Bind visual + spatial into **one** direction card — do not multiply Cap 2 × Cap 3 into nine options ([SKILL.md](../SKILL.md) Combining rules).

## Local storage

```text
~/.vibe-to-ui/
├── inspirations/                 # Cap 8 cases (search corpus)
├── profiles/                     # Cap 7 brand
└── page-directions/
    └── <project-slug>/
        ├── session.md            # latest 3 directions + status
        ├── decisions.md          # append-only choose / keep / reject / mix
        └── memory.md             # compact searchable summary
```

- `<project-slug>`: kebab-case product or repo id (e.g. `acme-landing`, `vibe-to-ui-docs`)
- Skill install/update must **never** touch `~/.vibe-to-ui/`
- Project `DESIGN.md` mirrors the **active** decision; local memory keeps history across sessions

Seeds (copy on init): `assets/page-direction/`.

### CLI (lifecycle + simple search)

```bash
vibe-to-ui page-direction init --slug <project-slug>
vibe-to-ui page-direction list
vibe-to-ui page-direction show <slug>
vibe-to-ui page-direction search <query>
vibe-to-ui page-direction record <slug> --choice <A|B|C|mix|reject> [--keep <ids>] [--reject <ids>] [--reason "..."]
```

`search` greps local Inspiration `metadata.json` / `analysis.md` / `design-seed.md` and page-direction `memory.md` / `session.md` — case-insensitive substring match. No embeddings.

## Workflow

### Step 1 — Context pack

Gather (read-only):

1. **Product background** — project `DESIGN.md` Overview + Page Context
2. **Brand Context** — active profile `brand.md` + `tokens.json` if any
3. **Current page** — live URL, screenshot, or local components (what feels ordinary)
4. **Inspirations** — `page-direction search <keywords>` and/or `inspiration list` filtered by page type / mood keywords
5. **Prior decisions** — `page-directions/<slug>/decisions.md` + DESIGN.md Page Direction sections

State confidence when any bucket is missing; do not invent brand canon.

### Step 2 — Diagnose “ordinary”

In 3–6 bullets, name why the page lacks memory (e.g. no proposition, hero is stock chrome, hierarchy flat, motion is generic fade-up). This diagnosis must appear in `session.md` and inform all three directions.

### Step 3 — Generate 3 Page Directions

Produce **A / B / C** that differ in **structure and expression**, not only palette. Each direction card **must** include:

| Field | Meaning |
|-------|---------|
| **Page proposition** | One sentence: what this page *is for* and what it should be remembered for |
| **Visual metaphor** | Non-literal organizing idea (gallery frame, workbench loom, editorial chapter…) |
| **Signature Experience** | The one memorable moment (hero beat, interaction, proof moment) — not a feature list |
| **Spatial DNA** | Density, hierarchy, focus, rhythm, image behavior, responsive collapse (Cap 3 shape) |
| **Motion duties** | What motion is *for* on this page (feedback / guidance / narrative). Provisional only |
| **Reference sources** | Inspiration ids + what was transferred vs brand-specific / non-transferable |
| **Implementation cost** | `S` / `M` / `L` — layout risk, asset need, motion tier hint (L1–L2 expected; L3+ only if Signature Experience requires it) |

Coverage rules:

- At least two directions must change **layout grammar**, not just color
- At least one direction must keep **lower motion cost** while still being memorable (type / space / evidence — not animation)
- Page type wins: do not turn a dense workbench into a cinematic landing unless the user asks for repositioning

### Step 4 — Equal standalone HTML previews

Generate **three** self-contained HTML previews with **equal completion**:

- Same content budget and section coverage for the target page type
- Show proposition, Signature Experience, and Spatial DNA in the UI — not three thin mood cards
- Exploration Interim Motion only (CSS + one provisional signature motif per direction)
- Do **not** load Motion Engine Router
- Prefer one comparison index page that links or embeds all three, **or** three sibling files of equal depth

Pause. Do **not** modify the project.

### Step 5 — User choice → memory write

User may **select**, **mix**, or **reject**.

Record to:

1. Project `DESIGN.md` — Page Direction Candidates + Visual Direction + Decisions Log + Iteration Context
2. `~/.vibe-to-ui/page-directions/<slug>/decisions.md` + update `session.md` / `memory.md`
3. Prefer CLI: `page-direction record <slug> --choice … --reason "…"`

Capture:

- Chosen direction id(s) or mix recipe
- Kept / rejected directions and **why**
- Inspiration ids cited
- Date

### Step 6 — Compile DNA (still no Apply)

From the locked direction:

1. **Spatial DNA** — finalize Cap 3 fields; write into design-system / Layout Blueprint path noted in Iteration Context
2. **Motion DNA** — finalize eight dimensions + narrative + **signature motif** from Signature Experience + Motion duties ([MOTION-SYSTEM.md](MOTION-SYSTEM.md))
3. **Then** load [MOTION-ENGINE-ROUTER.md](MOTION-ENGINE-ROUTER.md): lowest tier that expresses the motif; emit `motion_engine_decision`

### Step 7 — Full-page preview → Apply gate

Build one consolidated full-page preview (tokens + layout + approved motion implementation).

Only after explicit user confirm → Capability 5 Apply to the project.

## Direction card template

```markdown
### Direction <A|B|C> — <Name>

- **Status**: candidate
- **Page proposition**: …
- **Visual metaphor**: …
- **Signature Experience**: …
- **Spatial DNA**:
  - Density:
  - Hierarchy / focus:
  - Rhythm:
  - Image behavior:
  - Responsive:
- **Motion duties** (provisional): …
- **Reference sources**:
  - `inspirations/<id>` — transferred: … / not copied: …
- **Implementation cost**: S|M|L — notes:
- **Why it fixes “ordinary”**: …
```

## Preview checklist

```text
[ ] Stage 0 page type recorded
[ ] Brand + product + current page + inspirations consulted (or gaps stated)
[ ] 3 directions differ in structure/expression
[ ] Each card has all seven required fields
[ ] Three HTML previews at equal completion
[ ] Motion Engine Router NOT loaded yet
[ ] Project files untouched
[ ] After choice: DESIGN.md + ~/.vibe-to-ui/page-directions/<slug>/ updated
[ ] Spatial DNA + Motion DNA compiled before Router
[ ] Router picks lowest sufficient tier
[ ] Full-page preview confirmed before Apply
```

## Anti-patterns

- Jumping to Motion Engine / GSAP / WebGL to “add life” to a generic layout
- Three palette swaps with the same hero + card grid
- One deep preview and two shallow stubs
- Copying Inspiration brand chrome into the product
- Writing project code during the direction tournament
- Treating Inspiration Library cases as Design Context brand master
