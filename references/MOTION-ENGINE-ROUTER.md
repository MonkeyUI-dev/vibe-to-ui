# Motion Engine Router

Progressive-load reference. **Do not read this file during vibe exploration, mood boards, or token extraction.** Load it only when the agent is about to **implement motion in code** (preview HTML, concept page, or project Apply) and has already produced Motion DNA from [MOTION-SYSTEM.md](MOTION-SYSTEM.md).

## Purpose

Turn the user's vibe and confirmed Motion DNA into **one** implementation engine and **one** minimal recipe set. The router exists so agents:

1. Express the target feeling with the **simplest technology that can carry it**
2. **Never mix engines** on the same surface
3. **Never stack** decorative effects (parallax + particles + 3D + scroll scrub on the same hero)
4. **Never copy** library default demo aesthetics (generic floating shapes, stock purple gradients, boilerplate particle fields)

## Router pipeline

```
User vibe / reference / music
        ↓
Motion DNA (8 dimensions + narrative from MOTION-SYSTEM.md)
        ↓
Capability check (what must be expressed?)
        ↓
Dependency audit (project + device + a11y)
        ↓
Engine selection (exactly one: L1–L4)
        ↓
Recipe pick (1 primary + at most 1 supporting pattern)
        ↓
Implement with tokens + fallbacks
```

## Non-negotiable rules

| Rule | Requirement |
|------|-------------|
| **One engine per surface** | A page, screen, or preview artifact uses **one** engine tier. Shared layout CSS transitions are allowed; do not add a second animation runtime. |
| **Simplest sufficient layer** | Start at L1 (Motion). Escalate only when L1 cannot express a **required** capability (see ladder below). |
| **One decorative motion budget** | At most **one** atmosphere-class effect per surface (role = atmosphere in Motion DNA). Feedback and guidance patterns are separate and stay minimal. |
| **No demo cosplay** | Do not reproduce official examples (Framer Motion layout demos, GSAP ScrollSmoother defaults, Three.js particle fields, shader toy noise). Derive motion from **Motion DNA + design tokens**. |
| **Page type wins** | B-end / dense surfaces default to L1 or CSS-only. Landing / brand may reach L2–L4 only when atmosphere is an explicit design goal. |
| **Reduced motion first-class** | Every recipe ships with a `prefers-reduced-motion` branch before shipping. |
| **Mobile honesty** | If the chosen recipe cannot hold 60fps on mid-tier mobile, downgrade engine tier or switch to static / simplified fallback — do not ship jank. |

## Step 1 — Compile Motion DNA from vibe

Use the eight dimensions in [MOTION-SYSTEM.md](MOTION-SYSTEM.md). When the user gives only a vibe (no reference), map signals into this **compiled record** before choosing an engine:

| Field | Source | Example |
|-------|--------|---------|
| `roles[]` | Which motion roles are required | `["feedback", "guidance"]` |
| `triggers[]` | What fires motion | `["in-view", "hover", "state-change"]` |
| `tempo` | slow / medium / fast | `medium` |
| `easing` | calm / sharp / elastic | `calm` |
| `distance` | small / medium / large | `small` |
| `density` | minimal / moderate / rich | `minimal` |
| `repeat` | once / every-trigger / loop | `every-trigger` |
| `reduced_strategy` | fade / static / simplified / pausable | `fade` |
| `personality` | narrative layer | `reliable & composed` |
| `page_metaphor` | product manual / launch / dashboard / story / showcase | `dashboard` |
| `primary_intent` | understanding / excitement | `understanding` |

### Vibe word → DNA shortcuts

| User says | DNA bias |
|-----------|----------|
| calm, zen, minimal, trustworthy | slow–medium tempo, calm easing, minimal density, small distance, feedback-only roles |
| snappy, fast, cutting-edge | fast tempo, sharp easing, medium density, state-change heavy |
| playful, bouncy, fun | medium–fast tempo, elastic easing, moderate density, emphasis + feedback |
| premium, cinematic, luxurious | slow tempo, calm easing, rich density, large distance, atmosphere allowed |
| editorial, story, guided | medium tempo, guidance role, in-view + scroll triggers, staggered once |
| tactile, app-like | fast tempo, small distance, click/tap + state-change, **L1 only** unless 3D product viewer |

Music signals (when provided): BPM → tempo; dynamics → distance; rhythm → stagger; texture → density; energy → easing.

## Step 2 — Capability check

Ask: **What is the minimum expressiveness required?**

| Required capability | Minimum tier |
|--------------------|--------------|
| Hover / tap feedback, enter/exit, layout morph, modal, tab, list stagger | **L1 Motion** |
| Scroll-scrubbed narrative, pinned sections, complex multi-step timeline, horizontal scroll choreography | **L2 GSAP** |
| Full-screen shader atmosphere, 2D WebGL image warp, lightweight GPU gradient/noise tied to scroll or pointer | **L3 OGL** |
| True 3D object, camera path, lighting on mesh, interactive orbit, spatial product hero | **L4 Three.js / R3F** |

If multiple rows match, pick the **lowest** tier that covers all **functional** requirements. Atmosphere alone never justifies L4.

## Step 3 — Engine ladder

| Tier | Engine | Runtime | Typical stack |
|------|--------|---------|---------------|
| **L1** | **Motion** (`motion` / `framer-motion`) | React declarative | Next.js, Vite + React |
| **L2** | **GSAP** (+ ScrollTrigger when needed) | Imperative timeline | Any DOM; React use `useGSAP` / `gsap.context` |
| **L3** | **OGL** | Minimal WebGL | Vanilla or React wrapper; no full scene graph |
| **L4** | **Three.js** / **React Three Fiber** | Full 3D | `@react-three/fiber` + `@react-three/drei` when in React |

Escalation requires a **written reason** tied to Motion DNA, not "it would look cool."

## Step 4 — Selection & rejection matrix

### L1 — Motion

**Choose when**

- React (or preview HTML with React CDN) is the implementation surface
- Motion roles are feedback, guidance, explanation with DOM/CSS-friendly transforms
- Density is minimal or moderate
- Consumer app tactile patterns (press, sheet, tab indicator)
- Page metaphor is product manual, dashboard, or form

**Reject when**

- Scroll position must drive animation progress with sub-section precision (use L2)
- Need WebGL shader or mesh deformation (use L3+)
- Need real 3D camera and lit geometry (use L4)
- Non-React project with no appetite for Motion — prefer CSS transitions or GSAP

**Do not use for**

- Long pinned scroll stories (GSAP territory)
- Full-viewport GPU backgrounds (OGL territory)

---

### L2 — GSAP

**Choose when**

- Scroll-scrubbed or pinned section narrative is **required**
- Multi-element timeline with precise sequencing (>3 chained beats on one trigger)
- Horizontal scroll gallery with snap and progress sync
- Vanilla HTML preview without React

**Reject when**

- Only need hover, tap, and simple in-view fade (L1 or CSS is enough)
- Effect is purely shader/GPU (L3)
- Effect is 3D mesh (L4)
- Page type is dense B-end workbench — scroll choreography usually **fails** page-type fit

**Do not use for**

- Button hover micro-interactions (overkill)
- Default ScrollSmoother + generic parallax stack

---

### L3 — OGL

**Choose when**

- Atmosphere role needs GPU gradient, noise, or subtle distortion **without** a 3D scene
- Image warp / reveal tied to pointer or scroll on a **single** plane or quad
- Performance-sensitive full-bleed background where CSS cannot match the material DNA

**Reject when**

- DOM-only motion suffices
- Need rigged 3D models or camera orbit (L4)
- User is on low WebGL adoption risk and atmosphere is optional — use CSS + static image instead

**Do not use for**

- Particle galaxy demos
- Replacing all L1 feedback animations

---

### L4 — Three.js / R3F

**Choose when**

- Product or hero **requires** readable 3D geometry, lighting, or camera movement
- Spatial metaphor is explicitly showcase / launch **and** 3D is content, not wallpaper
- User confirmed WebGL weight for their page type

**Reject when**

- 2D layout motion or shader plane is enough (L1–L3)
- B-end, docs, or dense table surfaces
- No `webgl` or device is mobile-low-tier without fallback asset
- Atmosphere-only brief — never use L4 for decoration alone

**Do not use for**

- Default rotating cube / torus / particle field
- Copying drei `Float`, `Stars`, or example boilerplate without DNA-driven art direction

## Step 5 — Dependency check

Run before locking an engine. If a check fails, **downgrade tier** or switch to static fallback.

### Universal checks

| Check | Pass | Fail action |
|-------|------|-------------|
| `prefers-reduced-motion: reduce` | Fallback defined | Do not ship until branch exists |
| Page type fit | Motion density ≤ archetype allowance | Remove atmosphere; keep feedback only |
| Single engine | No second runtime planned | Remove extra library |
| Token binding | Durations/easing from design tokens | Remap; no library defaults |

### L1 Motion

| Check | How |
|-------|-----|
| React available | `package.json` has `react` + `motion` or `framer-motion`, or preview uses React CDN |
| SSR | Use `LazyMotion` + `domAnimation` or client-only boundary in Next.js |
| Bundle | One motion feature slice; avoid importing entire motion-plus |

### L2 GSAP

| Check | How |
|-------|-----|
| License | GSAP standard license OK for target; note Club plugins only if user has them |
| ScrollTrigger | Register plugin once; `gsap.context()` for React cleanup |
| Reduced motion | `gsap.matchMedia('(prefers-reduced-motion: reduce)')` → set duration 0 or opacity-only |
| Mobile scroll | Avoid heavy scrub on long pinned sections; cap pin duration |

### L3 OGL

| Check | How |
|-------|-----|
| WebGL | `canvas.getContext('webgl')` or WebGL2; fallback image/CSS |
| DPR cap | `Math.min(devicePixelRatio, 2)` on mobile |
| Resize | Listener + cancel animation on unmount |
| Memory | Dispose programs/textures on route change |

### L4 Three.js / R3F

| Check | How |
|-------|-----|
| Packages | `three`, `@react-three/fiber`; `drei` only for justified helpers |
| Canvas budget | ≤1 Canvas per surface; limit lights and postprocessing |
| Mobile | Reduce geometry, shadow off, cap DPR; offer static poster |
| SSR | `dynamic(..., { ssr: false })` for Canvas |
| Reduced motion | Pause render loop or show poster frame |

### Dependency check output (agent must emit)

```yaml
motion_engine_decision:
  motion_dna_summary: "medium tempo, calm easing, minimal density, feedback+guidance"
  selected_tier: L1
  selected_engine: motion
  escalation_reason: null
  rejected_tiers: [L2, L3, L4]
  rejection_notes: "No scroll-scrub narrative; dashboard page type"
  dependencies_ok: true
  dependency_notes: ["motion@12 present", "LazyMotion for SSR"]
  primary_recipe: "in-view-stagger"
  secondary_recipe: null
  decorative_budget: none
  reduced_motion_strategy: fade
  mobile_strategy: transform-none; opacity-only under 768px for atmosphere
```

## Step 6 — Recipes (minimal high-frequency)

Pick **one primary recipe**. Add **at most one** secondary recipe only if roles span feedback + guidance and both are token-light.

### L1 — Motion recipes

#### R1 — In-view stagger (`in-view-stagger`)

- **Role**: guidance
- **Trigger**: in-view (once)
- **Pattern**: parent `staggerChildren` 0.06–0.12s; child `opacity` 0→1 + `y` 8–16px (from `--motion-distance-md`)
- **Page types**: landing sections, marketing lists, editorial
- **Reduced**: opacity only, stagger 0
- **Mobile**: same; cap distance to `--motion-distance-sm`

#### R2 — Shared layout transition (`layout-handoff`)

- **Role**: explanation
- **Trigger**: state-change (tab, filter, route segment)
- **Pattern**: `layoutId` on shared element; `transition` from `--duration-normal` + `--ease-default`
- **Page types**: consumer app tabs, settings panels, segmented controls
- **Reduced**: crossfade without layout interpolation
- **Mobile**: prefer opacity morph; avoid large shared-element flights

#### R3 — Tactile press (`tap-feedback`)

- **Role**: feedback
- **Trigger**: click / tap
- **Pattern**: `whileTap={{ scale: 0.97 }}` + optional `whileHover` lift 2px; duration `--duration-fast`
- **Page types**: consumer app, forms, CTAs
- **Reduced**: instant state change or border-color only
- **Mobile**: default for all touch targets; no hover-dependent behavior

---

### L2 — GSAP recipes

#### R1 — Scroll-scrubbed reveal (`scrub-section-reveal`)

- **Role**: guidance
- **Trigger**: scroll
- **Pattern**: ScrollTrigger scrub 0.5–1.5; section children fade + y tied to scroll progress; one pinned block max
- **Page types**: brand story, launch narrative
- **Reduced**: trigger once on enter, no scrub; or static layout
- **Mobile**: shorten pin; reduce scrub sensitivity; prefer R1 Motion in-view instead if jank

#### R2 — Timeline entrance (`load-timeline`)

- **Role**: emphasis + guidance
- **Trigger**: page-load (once)
- **Pattern**: single `timeline` ≤1.2s total; hero headline → subcopy → CTA stagger; no looping
- **Page types**: landing hero
- **Reduced**: show final state; optional 150ms opacity fade total
- **Mobile**: cut distance 50%; max 3 tweens

#### R3 — Horizontal chapter (`horizontal-scroll-chapter`)

- **Role**: guidance + atmosphere
- **Trigger**: scroll
- **Pattern**: pinned container + horizontal `xPercent`; snap optional; progress indicator tied to tokens
- **Page types**: showcase, portfolio story
- **Reduced**: vertical stack static sections
- **Mobile**: **avoid** unless content demands; fallback to vertical narrative

---

### L3 — OGL recipes

#### R1 — Token gradient field (`shader-atmosphere`)

- **Role**: atmosphere
- **Trigger**: auto-play (slow) + optional pointer parallax ≤8px
- **Pattern**: full-bleed quad; fragment colors sampled from CSS token hex; low-frequency noise; no particles
- **Page types**: landing, brand hero background
- **Reduced**: static CSS `linear-gradient` from same tokens
- **Mobile**: DPR cap 1.5; pause when `document.hidden`; static fallback under `prefers-reduced-motion`

#### R2 — Image plane warp (`pointer-warp`)

- **Role**: atmosphere + emphasis
- **Trigger**: hover or pointer move
- **Pattern**: single texture quad; subtle UV displacement; strengths from `--motion-distance-sm`
- **Page types**: product showcase, editorial hero image
- **Reduced**: static image
- **Mobile**: disable warp; use static or light CSS scale on tap

#### R3 — Scroll-linked displacement (`scroll-displace`)

- **Role**: atmosphere
- **Trigger**: scroll
- **Pattern**: displacement strength tied to scroll 0–1; one uniform; no extra meshes
- **Page types**: immersive landing
- **Reduced**: parallax off; static frame
- **Mobile**: prefer static; scroll-linked GPU on low-end → static

---

### L4 — Three.js / R3F recipes

#### R1 — Product orbit (`product-orbit`)

- **Role**: explanation + emphasis
- **Trigger**: auto-play slow orbit + drag optional
- **Pattern**: one mesh or imported GLTF; lighting from art direction; background matches `--color-background`; no stock helpers
- **Page types**: product launch, configurable hero
- **Reduced**: poster image + drag disabled
- **Mobile**: lower poly; no shadows; drag only if essential

#### R2 — Scroll camera (`scroll-camera-path`)

- **Role**: guidance + atmosphere
- **Trigger**: scroll
- **Pattern**: camera `position`/`lookAt` lerped along curve; ≤3 key poses; sync with DOM sections
- **Page types**: showcase narrative
- **Reduced**: single hero angle; DOM scroll normal
- **Mobile**: replace with R1 short orbit or static poster unless user insists

#### R3 — Interactive focus (`focus-orbit`)

- **Role**: explanation
- **Trigger**: click / tap hotspots
- **Pattern**: camera tween to predefined views; hotspot labels in DOM overlay
- **Page types**: feature explorer, 3D configurator lite
- **Reduced**: accordion of static images per hotspot
- **Mobile**: tap hotspots; limit to 3 views

## Step 7 — Mobile & reduced-motion fallbacks

Apply **both** branches to every implementation.

### Reduced-motion (`prefers-reduced-motion: reduce`)

| Strategy | Implementation |
|----------|----------------|
| **fade** (default) | Remove transforms; opacity 0→1 ≤200ms or instant |
| **static** | Final keyframe state immediately; no loop |
| **simplified** | Keep meaning-bearing motion (e.g. progress); remove parallax and atmosphere |
| **pausable** | `animation-play-state` + visible control for loops |

Engine-specific:

- **Motion**: `useReducedMotion()` → skip `transform` variants
- **GSAP**: `matchMedia` context with `duration: 0` or simplified tweens
- **OGL**: detach RAF; swap canvas for CSS/static image
- **R3F**: render poster frame; unmount Canvas when `reduce`

### Mobile

| Risk | Mitigation |
|------|------------|
| Scroll jank (L2/L3/L4) | Downgrade recipe; shorten pin; static fallback |
| WebGL thermal throttling | Cap DPR; pause off-screen; static hero image |
| Touch vs hover | All hover recipes need tap-equivalent or run once on reveal |
| Safe areas | Motion must not shift fixed nav / notches; test 390×844 |
| Connection / CPU | Prefer L1; lazy-load L3/L4 after first paint with poster |

## Step 8 — Anti-patterns (reject automatically)

| Anti-pattern | Why | Instead |
|--------------|-----|---------|
| Motion + GSAP on same page | Double runtime, inconsistent easing | One engine |
| GSAP + OGL scroll both scrubbing | Stacked scroll listeners | One scroll driver |
| R3F background + GSAP parallax + Motion text stagger | Triple decorative stack | Pick one atmosphere recipe |
| `Float` + `Stars` + bloom defaults | Demo cosplay | DNA-driven single effect |
| Elastic easing on tables/forms | Breaks scanability | calm + fast, small distance |
| Infinite hero loops | Accessibility + distraction | once or pausable |
| 3D on B-end dashboard | Page type violation | L1 feedback only |

## Agent workflow (when implementing)

1. Read confirmed Motion DNA from design system or exploration output
2. **Load this file** (progressive load — not before)
3. Run capability check → dependency check → select tier
4. Emit `motion_engine_decision` YAML (see Step 5)
5. Implement **one primary recipe** with token-bound durations/easing
6. Wire `prefers-reduced-motion` and mobile fallback
7. Self-review: page type, single engine, no demo aesthetics, no stacked atmosphere

## Related references

- Motion DNA dimensions & extraction: [MOTION-SYSTEM.md](MOTION-SYSTEM.md)
- Token output shape: [../assets/design-system-template.md](../assets/design-system-template.md) § Motion System
- Consumer app tactile patterns: [CONSUMER-APP-DESIGN.md](CONSUMER-APP-DESIGN.md)
- Page type constraints: [SKILL.md](../SKILL.md) § Stage 0
