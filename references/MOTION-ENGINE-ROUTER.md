# Motion Engine Router

Progressive-load reference. **Do not read this file during vibe exploration, mood boards, or token extraction.** For exploration HTML motion, use **Exploration Interim Motion** in [SKILL.md](../SKILL.md) (CSS + provisional DNA + signature motif). Load this file only when the agent is about to **implement production-grade motion in code** (design-system preview, productionized concept, or project Apply) and has already produced Motion DNA + signature motif from [MOTION-SYSTEM.md](MOTION-SYSTEM.md).

## Purpose

Turn the user's vibe and confirmed Motion DNA into **one** implementation engine, **one** stack binding, and **one** minimal recipe set — then **mutate** that recipe with the signature motif so the result feels like the user's references, not a correct-but-generic template. The router exists so agents:

1. Express the target feeling with the **simplest technology that can carry it**
2. Bind that engine to the project's **Web / React / Vue** stack family — not a kitchen-sink multi-platform catalog
3. **Never mix engines** on the same surface
4. **Never stack** decorative effects (parallax + particles + 3D + scroll scrub on the same hero)
5. **Never copy** library default demo aesthetics (generic floating shapes, stock purple gradients, boilerplate particle fields)
6. **Break mediocrity gravity** — recipes are skeletons; DNA + signature motif must change defaults before shipping

## 2026 coverage calibration

This Router deliberately covers the motion patterns that are both common in current web work and useful to product teams: purposeful micro-feedback, shared state/view transitions, native scroll-linked reveals, kinetic type, scrollytelling, 2D shader material, interactive 3D, pre-authored vector states, and generated natural motion. The important shift is not “more animation”; it is progressive enhancement: modern CSS can now bind simple animation to scroll or element visibility, while the [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) can preserve context between supported page or UI states.

Use the native path first. [CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) belong in L1 for a self-contained reveal/progress transform; a pinned multi-beat story remains L2. A supplied vector asset is an L1 exception: use linear playback (for example, Lottie) for a truly authored short sequence, or a [Rive state machine](https://rive.app/docs/runtimes/web/state-machines) when it owns an interaction state. Neither justifies a second decorative runtime. WebGPU is intentionally not a separate tier in this 90/10 web-first scope: OGL/Three.js already cover the justified WebGL cases with wider operational maturity.

## Product scope (what this router covers)

vibe-to-ui is a **web-first design companion**. Motion implementation guidance covers three stack families only:

| Family | Detect when | Out of scope |
|--------|-------------|--------------|
| **Web** | Vanilla HTML/CSS, static preview HTML, Astro content islands without a SPA framework, Tailwind-only pages | — |
| **React** | `react`, Next.js, Remix, Vite+React, shadcn/ui (React) | React Native |
| **Vue** | `vue`, Nuxt, Vite+Vue, Nuxt UI | Native mobile |

**Do not** invent Flutter / RN / SwiftUI / Compose motion paths here. If the project is native-mobile, keep Motion DNA as tokens and ask the user which web surface (if any) should receive implementation.

## Router pipeline

```
User vibe / reference / music
        ↓
Motion DNA (8 dimensions + narrative from MOTION-SYSTEM.md)
        ↓
Capability check (what must be expressed?)
        ↓
Video intent route (only when native or generated video is proposed)
        ↓
Stack family detect (web | react | vue)
        ↓
Dependency audit (project + device + a11y)
        ↓
Engine selection (exactly one dominant tier: L1–L5) + stack binding
        ↓
Recipe pick (1 primary + at most 1 supporting pattern)
        ↓
Implement with tokens + fallbacks
```

## Non-negotiable rules

| Rule | Requirement |
|------|-------------|
| **One dominant motion medium per surface** | A page, screen, or preview artifact uses **one** engine tier. Shared layout CSS transitions are allowed; L5 may use native `<video>` seeking for its interaction, but do not add a second animation runtime or competing video renderer. |
| **Simplest sufficient layer** | Start at L1. Escalate only when L1 cannot express a **required** capability (see ladder below). |
| **Stack follows the project** | Prefer packages already in `package.json`. Do not force React Motion into a Vue app or TresJS into a React app. |
| **One decorative motion budget** | At most **one** atmosphere-class effect per surface (role = atmosphere in Motion DNA). Feedback and guidance patterns are separate and stay minimal. |
| **No demo cosplay** | Do not reproduce official examples (Motion layout demos, GSAP ScrollSmoother defaults, Three.js particle fields, Tres/drei boilerplate). Derive motion from **Motion DNA + design tokens**. |
| **Page type wins** | B-end / dense surfaces default to L1 or CSS-only. Landing / brand may reach L2–L5 only when the experience has a justified narrative or explanatory need. |
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
| `repeat` | once / once-hold / every-trigger / certified-loop | `every-trigger` |
| `reduced_strategy` | fade / static / simplified / pausable | `fade` |
| `personality` | narrative layer | `reliable & composed` |
| `page_metaphor` | product manual / launch / dashboard / story / showcase | `dashboard` |
| `primary_intent` | understanding / excitement | `understanding` |
| `signature_motif` | One memorable motion idea from vibe/reference | `"soft paper settle: 12px rise, calm ease-out, 60ms stagger"` |

### Video intent route (required when video is proposed)

Do not let a generated clip become `autoplay muted loop` by default. First assign one delivery intent. This is a product decision before choosing a video runtime or writing markup.

| If the video job is… | Choose | Required evidence | Reject when |
|---|---|---|---|
| A short emotional opening whose final image can calmly remain on screen | `hero-take` | A useful held final frame; no user-controlled progress is needed | The moving image is only generic wallpaper or the final frame cannot support the hero |
| Explain a reversible product change or map visual states to scroll chapters | `continuous-scrub` | Approved start/middle/end keyframes; every chapter has a visible causal state; reverse seeking is natural | Scroll merely makes an unrelated camera move look busy |
| Show a discrete before/after caused by an action | `state-transition` | Approved State A/B and a clear click, tap, or state trigger | The user needs continuous comparison or a multi-chapter story |
| Create low-information atmosphere | `ambient-loop` | A loop certificate: matching endpoints, three-cycle seam review in the rendered crop, pause control, and static fallback | The clip has a camera push, reveal, transformation, or incompatible end frame |
| None of the above | static poster or user-triggered playback | A useful static image and normal reading flow | Do not generate or autoplay a clip just to add motion |

`hero-take` is the default for a generated, one-directional opening shot: play once at the declared entry point, hold the approved end frame, and do not replay merely because the element re-enters the viewport. `ambient-loop` is an exception, never the default. A portrait clip must not be blindly `object-fit: cover` into a desktop landscape stage; plan and inspect the actual desktop and mobile crops or deliver separate variants.

### Signature motif (required)

Before picking a recipe, write one sentence for `signature_motif`. It must be specific enough to change recipe defaults (distance, easing, stagger, which property moves). Reject motifs that are only "fade in" or "subtle hover."

**Motif → parameter mutation examples**

| Motif cue | Mutate |
|-----------|--------|
| soft / paper / calm | smaller distance, longer ease-out, gentler stagger |
| snappy / tool / precise | shorter duration, sharp easing, near-zero overshoot |
| playful / bounce | elastic only on **feedback** roles; keep guidance calm |
| cinematic / premium | larger distance on hero only; everywhere else restrained |
| music syncopation | uneven stagger (e.g. 40/80/40ms) instead of uniform 80ms |

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
| Hover / tap feedback, enter/exit, layout morph, modal, tab, list stagger | **L1** |
| Self-contained scroll/view-linked reveal, progress, mask, or transform | **L1 CSS Scroll-Driven / WAAPI** |
| Supplied authored vector playback/state (for example Lottie or an existing Rive state machine) | **L1 vector-asset exception** |
| Pinned scroll-scrubbed narrative, image-sequence stage, complex multi-step timeline, horizontal scroll choreography | **L2 GSAP** |
| Full-screen shader atmosphere, 2D WebGL image warp, lightweight GPU gradient/noise tied to scroll or pointer | **L3 OGL** |
| True 3D object, camera path, lighting on mesh, interactive orbit, spatial product hero | **L4 Three.js family** |
| Natural action, complex physical/material transformation, or continuous generated cinematic camera path that code cannot express convincingly | **L5 MiniMax Video** |

**Do not confuse video as an asset with L5.** A normal hero background video uses native `<video>` patterns; a video texture remains L4. A generated natural hero take may use L5 generation but still integrates through native `<video>`; it must pass the Video Intent Route and use `hero-take`, not a generic loop. Select L5 only when generated video is the dominant narrative or explanatory medium. When L5 wins, load [VIDEO-MOTION.md](VIDEO-MOTION.md) before generation or integration.

**Routing sanity examples:** button hover → L1; one section fading with view progress → L1 `native-scroll-link`; branded supplied vector state → L1 `vector-asset-handoff`; kinetic headline → L1 `kinetic-type`; pinned editorial DOM story or deterministic image sequence → L2; liquid image distortion → L3; interactive 3D product → L4; AI product opening shot with a holdable end frame → L5 `hero-take`; AI product transformation → L5 `state-transition`; scroll-controlled natural disassembly → L5 `continuous-scrub`; travel through generated worlds → L5 `cinematic-journey`.

If multiple rows match, pick the **lowest** tier that covers all **functional** requirements. Atmosphere alone never justifies L4.

## Step 3 — Stack family adapter

Detect the project's stack family **before** locking packages. Capability chooses the **tier**; stack family chooses the **binding**.

### Detection signals

| Family | Signals (any strong match) |
|--------|----------------------------|
| **react** | `react` / `next` / `react-dom` in deps; `.tsx` app router; shadcn/ui; Remix |
| **vue** | `vue` / `nuxt` / `nuxt-ui` in deps; `.vue` SFCs; Vite Vue plugin |
| **web** | No SPA framework; static HTML preview; Astro content-only; plain Tailwind/CSS |

If both React and Vue appear (e.g. Astro islands), bind to the **island framework that owns the animated surface**, not the site shell.

If detection confidence is low, ask one short question: "Is this surface React, Vue, or plain HTML?"

### Tier → package binding matrix

| Tier | Capability | **Web** binding | **React** binding | **Vue** binding |
|------|------------|-----------------|-------------------|-----------------|
| **L1** | Declarative UI motion | CSS transitions/animations, `scroll()` / `view()` timelines first; vanilla **`motion`** only if CSS cannot express gesture/stagger | **`motion`** (preferred) or `framer-motion` if already installed | **`motion-v`** (preferred Motion-for-Vue); if project already uses **`@vueuse/motion`**, keep it — do not dual-install |
| **L2** | Timeline / scroll choreography | **`gsap`** + `ScrollTrigger` | **`gsap`** + `@gsap/react` (`useGSAP`) / `gsap.context` | **`gsap`** + `ScrollTrigger`; cleanup in `onUnmounted` via `gsap.context` / `ctx.revert()` |
| **L3** | Lightweight WebGL / shader plane | **`ogl`** (vanilla canvas) | **`ogl`** in a client component (or thin wrapper); avoid a second 3D framework | **`ogl`** in `onMounted` / `onBeforeUnmount`; dispose on unmount |
| **L4** | True 3D scene | **`three`** (vanilla) | **`three`** + **`@react-three/fiber`**; `@react-three/drei` only when justified | **`three`** + **`@tresjs/core`** (TresJS); `@tresjs/cientos` only when justified; Nuxt may use `@tresjs/nuxt` |
| **L5** | Generated natural / continuous / cinematic motion | **MiniMax CLI** + native `<video>` | **MiniMax CLI** + client-side native `<video>` ref | **MiniMax CLI** + native `<video>` ref in client lifecycle |

### Stack adapter rules

1. **Same tier, different package** — L1 on Vue is `motion-v`, not React `motion`. Do not cross-wire.
2. **Prefer already-installed peers** — If `framer-motion` is present and `motion` is not, stay on `framer-motion`. If `@vueuse/motion` is present and DNA fits, stay — do not add `motion-v` just for brand alignment.
3. **Web L1 stays CSS-first** — Standalone HTML previews should prefer CSS `@keyframes` / transitions and native `scroll()` / `view()` timelines bound to design tokens. Add vanilla `motion` only when gestures, layout handoff, or orchestrated stagger are required.
4. **Astro / multi-island** — Animate inside one island with one engine; do not put GSAP in the layout and Motion inside a React island on the same hero.
5. **L1 vector-asset exception** — Prefer CSS for simple vector motion. Use supplied linear vector playback only for a short authored sequence, or a supplied [Rive state machine](https://rive.app/docs/runtimes/web/state-machines) when it owns a meaningful interaction state; do not generate a Rive/Lottie asset, install it beside another motion runtime, or use it as a decorative loop.
6. **Out of scope stacks** — RN, Flutter, SwiftUI, Compose: emit Motion DNA only; do not fake a web binding.

## Step 4 — Engine ladder

| Tier | Engine (capability name) | Runtime idea |
|------|--------------------------|--------------|
| **L1** | Declarative motion (Motion family / CSS) | Component or CSS-driven UI motion |
| **L2** | **GSAP** (+ ScrollTrigger when needed) | Imperative timeline / scrub |
| **L3** | **OGL** | Minimal WebGL quad / shader |
| **L4** | **Three.js family** (vanilla / R3F / TresJS) | Full 3D scene |
| **L5** | **MiniMax Video** | Generated video integrated as native video playback / progress seeking |

Escalation requires a **written reason** tied to Motion DNA, not "it would look cool." L5 additionally requires a written explanation of why L1–L4 cannot express the natural action, transformation, or camera continuity at the required quality.

## Step 5 — Selection & rejection matrix

### L1 — Declarative motion

**Choose when**

- Motion roles are feedback, guidance, explanation with DOM/CSS-friendly transforms
- A self-contained element can animate from scroll/view progress with native CSS timelines; do not introduce GSAP merely for that
- Density is minimal or moderate
- Consumer app tactile patterns (press, sheet, tab indicator)
- Page metaphor is product manual, dashboard, or form
- Stack is Web (CSS/`motion`), React (`motion`), or Vue (`motion-v` / `@vueuse/motion`)
- An existing, interaction-bearing vector state machine is supplied and is smaller/clearer than rebuilding it with DOM motion

**Reject when**

- Scroll position must coordinate a pinned multi-section story, a sequence stage, or several dependent beats (use L2)
- Need WebGL shader or mesh deformation (use L3+)
- Need real 3D camera and lit geometry (use L4)

**Do not use for**

- Long pinned scroll stories (GSAP territory)
- Full-viewport GPU backgrounds (OGL territory)
- Decorative autoplay vector loops; use static SVG/CSS or remove them

---

### L2 — GSAP

**Choose when**

- Scroll-scrubbed or pinned section narrative is **required**
- Multi-element timeline with precise sequencing (>3 chained beats on one trigger)
- Horizontal scroll gallery with snap and progress sync
- An approved pre-rendered image sequence needs one scroll-controlled product stage; Canvas is the renderer, GSAP is the one scroll driver
- Vanilla HTML preview without a declarative motion library — **or** Web stack where L1 CSS is insufficient

**Reject when**

- Only need hover, tap, and simple in-view fade (L1 or CSS is enough)
- Effect is purely shader/GPU (L3)
- Effect is 3D mesh (L4)
- Page type is dense B-end workbench — scroll choreography usually **fails** page-type fit

**Do not use for**

- Button hover micro-interactions (overkill)
- Default ScrollSmoother + generic parallax stack
- Treating a Canvas sequence, native video, and AI video as interchangeable renderers for the same stage; choose one after an asset/performance audit

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

### L4 — Three.js family

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
- Copying drei / cientos `Float`, `Stars`, or example boilerplate without DNA-driven art direction

---

### L5 — MiniMax Video

**Choose when**

- The essential movement is natural action, complex product/material/shape transformation, or a generated continuous camera journey that L1–L4 cannot represent convincingly
- The generated clip itself is the primary explanatory or narrative medium, with a named input (`page-load-once`, scroll, pointer, drag, or playback trigger)
- A static poster/fallback and a mobile/reduced-motion alternative are part of the design

**Reject when**

- CSS/Motion, GSAP, OGL, or Three.js can express the required result at production quality
- Video is merely a hero background, mask, decorative loop, or a texture inside a Three.js scene. A one-directional hero take is allowed only when it has a narrative job and passes the Video Intent Route.
- The page is a dense B-end, documentation, table, or repeated-task surface without a strong explanatory exception
- The only justification is cinematic novelty

**Provider rule**

- L5 supports **MiniMax only**. First check the official `mmx` CLI and authentication, and use the official MiniMax CLI / skill when available.
- If it is unavailable or unconfigured, state: `Video Motion currently supports MiniMax only. Other video generation providers are not supported yet.` Then provide a keyframe, prompt, duration/aspect-ratio, and integration plan without generating video.
- Do not add an alternative provider, provider abstraction, video editor, or multiple rendering backends. Read [VIDEO-MOTION.md](VIDEO-MOTION.md) for the three recipes and exact handoff rules.

## Step 6 — Dependency check

Run before locking an engine. If a check fails, **downgrade tier** or switch to static fallback.

### Universal checks

| Check | Pass | Fail action |
|-------|------|-------------|
| `prefers-reduced-motion: reduce` | Fallback defined | Do not ship until branch exists |
| Page type fit | Motion density ≤ archetype allowance | Remove atmosphere; keep feedback only |
| Single engine | No second runtime planned | Remove extra library |
| Token binding | Durations/easing from design tokens | Remap; no library defaults |
| Stack family | Detected `web` / `react` / `vue` | Ask once, or default `web` for standalone HTML previews |

### L1 by stack

| Stack | Check |
|-------|-------|
| **web** | Prefer CSS variables for duration/easing; if using vanilla `motion`, confirm package or CDN; no React/Vue imports in static HTML |
| **react** | `react` + `motion` or `framer-motion`; Next.js → `LazyMotion` / client boundary; avoid importing entire motion-plus |
| **vue** | `vue` ≥ 3 + `motion-v` **or** existing `@vueuse/motion`; Nuxt → `motion-v/nuxt` module or client-only plugin; do not install both Motion Vue libraries |
| **vector state** | Supplied vector asset has an approved fallback frame; one runtime only; keyboard/touch state is equivalent; pause any loop and replace with the fallback under reduced motion |

### L2 GSAP by stack

| Stack | Check |
|-------|-------|
| **all** | GSAP standard license OK; Club plugins (Flip, SplitText) only if user has them |
| **web** | Register ScrollTrigger once; kill tweens on page teardown |
| **react** | `useGSAP` or `gsap.context` + cleanup; no duplicate ScrollTrigger registrations |
| **vue** | Create animations in `onMounted`; `gsap.context(el)` + `ctx.revert()` in `onUnmounted` |
| **a11y** | `gsap.matchMedia('(prefers-reduced-motion: reduce)')` → duration 0 or opacity-only |
| **mobile** | Avoid heavy scrub on long pinned sections; cap pin duration |
| **image sequence** | Preload a bounded window around the current frame; provide a poster; choose one renderer per stage (Canvas sequence **or** video), and downgrade on memory-constrained mobile |

### L3 OGL by stack

| Stack | Check |
|-------|-------|
| **all** | WebGL context available; DPR `Math.min(devicePixelRatio, 2)` on mobile; dispose on unmount |
| **react** | Client-only component; cancel RAF on unmount |
| **vue** | `ref` canvas; init in `onMounted`; dispose program/geometry/textures in `onBeforeUnmount` |
| **web** | Same dispose discipline on `pagehide` / navigation |

### L4 Three.js family by stack

| Stack | Check |
|-------|-------|
| **web** | `three` only; ≤1 renderer; dispose geometries/materials/renderer |
| **react** | `three` + `@react-three/fiber`; `drei` only when justified; `dynamic(..., { ssr: false })` in Next.js |
| **vue** | `three` + `@tresjs/core`; Vite needs Tres `templateCompilerOptions`; `@tresjs/cientos` only when justified; Nuxt may use `@tresjs/nuxt` |
| **all** | ≤1 Canvas/renderer per surface; mobile: lower poly, shadows off, DPR cap, static poster; reduced-motion → poster / pause loop |

### L5 MiniMax Video

| Check | Pass | Fail action |
|-------|------|-------------|
| Provider | Official `mmx` CLI is installed and `mmx auth status` succeeds | Do not switch provider; give the MiniMax setup instructions and an executable generation plan only |
| Capability fit | Natural motion / transformation / cinematic continuity cannot be delivered well by L1–L4 | Downgrade to the lowest sufficient tier |
| Keyframes | Subject, logo, geometry, camera, and start/end frames are approved | Create/approve keyframes before video generation |
| Interaction | One input maps cleanly to playback or progress | Simplify to triggered playback or choose a code tier |
| Video intent | `hero-take`, `continuous-scrub`, `state-transition`, or certified `ambient-loop` is recorded | Use static poster or user-triggered playback |
| Delivery | Poster, error fallback, display-size encoding, actual desktop/mobile crop review, and native-video seek test exist | Do not ship L5 |
| Loop safety | `loop: false`, or an approved `ambient-loop` certificate exists | Remove `loop`; do not conceal an incompatible cut with a crossfade |

### Dependency check output (agent must emit)

```yaml
motion_engine_decision:
  motion_dna_summary: "medium tempo, calm easing, minimal density, feedback+guidance"
  signature_motif: "soft paper settle: 12px rise, calm ease-out, 60ms stagger"
  stack_family: react   # web | react | vue
  stack_signals: ["next", "react", "shadcn"]
  selected_tier: L1
  selected_engine: motion
  stack_binding: "motion@12"   # e.g. css-tokens | motion | framer-motion | motion-v | @vueuse/motion | gsap | ogl | three | r3f | tresjs | mmx-cli+native-video
  escalation_reason: null
  rejected_tiers: [L2, L3, L4, L5]
  rejection_notes: "No scroll-scrub narrative; dashboard page type"
  dependencies_ok: true
  dependency_notes: ["motion present", "LazyMotion for SSR"]
  primary_recipe: "in-view-stagger"
  secondary_recipe: "tap-feedback"  # only if feedback+guidance; else null
  recipe_mutations: "distance 12px; stagger 60ms; ease calm — from signature_motif"
  decorative_budget: none
  reduced_motion_strategy: fade
  mobile_strategy: transform-none; opacity-only under 768px for atmosphere
  video_motion: null            # L5 only: intent, provider_status, keyframe_status, input, loop_certificate, poster, fallback
```

## Step 7 — Recipes (minimal high-frequency)

Pick **one primary recipe**. Add **at most one** secondary recipe **only** when both of these are true:

1. Roles span **feedback + guidance** (e.g. tap-feedback + in-view-stagger, or tap-feedback + tab-indicator)
2. Both recipes stay token-light (no atmosphere, no L2 scrub, no WebGL or L5 Video as secondary)

**Never** use atmosphere, emphasis-only spectacle, L5 Video, or a second scroll/WebGL driver as a secondary recipe. If the surface needs atmosphere or L5, that recipe **is** the primary (and decorative budget is spent).

Recipes are **capability skeletons**. After choosing one, **mutate** duration, easing, distance, and stagger from Motion DNA + `signature_motif`. Shipping the numeric defaults below unchanged is a mediocrity failure.

Recipes are **capability patterns**. Implement them with the stack binding from Step 3 — do not copy React JSX into Vue SFCs.

### L1 recipes

#### R1 — In-view stagger (`in-view-stagger`)

- **Role**: guidance
- **Trigger**: in-view (once)
- **Pattern**: parent stagger 0.06–0.12s; child opacity 0→1 + y 8–16px (from `--motion-distance-md`) — **override from motif**
- **Page types**: landing sections, marketing lists, editorial
- **Reduced**: opacity only, stagger 0
- **Mobile**: same; cap distance to `--motion-distance-sm`
- **Bindings**:
  - **web**: CSS `@keyframes` + `animation-delay` per child, or vanilla `motion` stagger
  - **react**: `staggerChildren` / variants on `motion.*`
  - **vue**: `motion-v` variants / stagger; or `@vueuse/motion` `v-motion` + delay per item

#### R2 — Shared layout transition (`layout-handoff`)

- **Role**: explanation
- **Trigger**: state-change (tab, filter, route segment)
- **Pattern**: shared-element or layout interpolation; duration `--duration-normal` + `--ease-default`
- **Page types**: consumer app tabs, settings panels, segmented controls
- **Reduced**: crossfade without layout interpolation
- **Mobile**: prefer opacity morph; avoid large shared-element flights
- **Bindings**:
  - **web**: View Transitions API when enough; else crossfade CSS — do not fake FLIP with GSAP unless escalated to L2
  - **react**: `layoutId` on `motion.*`
  - **vue**: `motion-v` layout / shared layout APIs; if only `@vueuse/motion`, degrade to crossfade (no fake layoutId)

#### R3 — Tactile press (`tap-feedback`)

- **Role**: feedback
- **Trigger**: click / tap
- **Pattern**: press scale ~0.97 + optional hover lift 2px; duration `--duration-fast` — scale/lift from motif
- **Page types**: consumer app, forms, CTAs
- **Reduced**: instant state change or border-color only
- **Mobile**: default for all touch targets; no hover-dependent behavior
- **Bindings**:
  - **web**: `:active { transform: scale(0.97) }` + transition
  - **react**: `whileTap` / `whileHover` on `motion.*`
  - **vue**: `motion-v` tap/hover gestures; or CSS `:active` if staying dependency-free

#### R4 — Sheet rise (`sheet-rise`)

- **Role**: explanation + guidance
- **Trigger**: click / tap (open), dismiss gesture or backdrop (close)
- **Pattern**: sheet enters from bottom (`y` 100%→0 or 24–48px rise + fade); duration 220–320ms from Consumer app guidance; controlled spring or calm ease-out per motif — **no full-screen bounce**
- **Page types**: Consumer app detail/create flows, filters, confirmations
- **Reduced**: instant show/hide or opacity-only; keep final state readable
- **Mobile**: primary pattern; respect safe-area inset; backdrop fade without parallax stack
- **Bindings**:
  - **web**: CSS `@keyframes` / `transition` on transform + opacity; `role="dialog"`
  - **react**: `motion` animate `y` + opacity; exit animation on unmount
  - **vue**: `motion-v` enter/exit or CSS transition on `v-if` / `<Transition>`

#### R5 — Tab indicator (`tab-indicator`)

- **Role**: feedback + guidance
- **Trigger**: click / tap (tab change)
- **Pattern**: selected indicator slides or morphs to the active tab (layout handoff on the underline/pill only); content crossfades or short directional slide ≤12px; duration `--duration-fast`–`--duration-normal`
- **Page types**: Consumer app bottom tabs, top tabs, segmented controls
- **Reduced**: instant selection state; no sliding indicator required
- **Mobile**: thumb-zone stable; do not animate the whole tab bar vertically
- **Bindings**:
  - **web**: indicator `transform: translateX(...)` with token easing
  - **react**: `layoutId` on indicator only (prefer over animating all tab panels)
  - **vue**: `motion-v` layout on indicator; or CSS transform on active index

**Consumer app default pairing**: primary `sheet-rise` or `tab-indicator` as required by the screen; secondary `tap-feedback` only (feedback + guidance rule).

#### R6 — Native scroll / view link (`native-scroll-link`)

- **Role**: guidance or restrained atmosphere
- **Trigger**: scroll / in-view
- **Pattern**: one element’s opacity, translate, clip, scale, or progress indicator follows a CSS `scroll()` or `view()` timeline; bind range and distance to tokens
- **Page types**: editorial reading flow, lightweight product sections, progress affordances
- **Reduced**: final state or a one-time opacity reveal; never leave content hidden
- **Mobile**: retain only the most meaningful range; static if browser/device support or performance is insufficient
- **Bindings**:
  - **web**: CSS Scroll-Driven Animations first; `IntersectionObserver`/static fallback only when support requires it
  - **react / vue**: keep the CSS timeline in component styles; do not bring GSAP in for a one-element effect

#### R7 — Kinetic type (`kinetic-type`)

- **Role**: emphasis or guidance
- **Trigger**: page-load, in-view, or one scroll range
- **Pattern**: semantic heading reveals by line/word grouping, a clipped baseline, or modest tracking/opacity shift; words must remain readable at every sampled frame
- **Page types**: launch, editorial, brand; never routine dashboard/table copy
- **Reduced**: render final text immediately or use a ≤200ms opacity transition
- **Mobile**: preserve natural line wrapping; do not animate individual glyphs if it changes layout or causes cumulative shifts
- **Bindings**: CSS-first. Escalate to L2 only when a truly multi-beat timeline must synchronize type with a pinned scene. Do not use text-splitting libraries or inaccessible per-character spans by default.

#### R8 — Vector asset handoff (`vector-asset-handoff`)

- **Role**: feedback or explanation
- **Trigger**: click / tap / state-change
- **Pattern**: one supplied vector asset either plays one brief authored sequence or changes between named state-machine states; its semantic label and DOM fallback expose the same state
- **Page types**: compact onboarding explainer, branded control, empty state with a meaningful state change
- **Reduced / mobile**: static approved artboard/frame; no essential information is animation-only
- **Bindings**: use only one vector runtime and only when CSS would lose the supplied authored state. It is L1, not a license to add a second scene engine.

---

### L2 — GSAP recipes

#### R1 — Scroll-scrubbed reveal (`scrub-section-reveal`)

- **Role**: guidance
- **Trigger**: scroll
- **Pattern**: ScrollTrigger scrub 0.5–1.5; section children fade + y tied to scroll progress; one pinned block max
- **Page types**: brand story, launch narrative
- **Reduced**: trigger once on enter, no scrub; or static layout
- **Mobile**: shorten pin; reduce scrub sensitivity; prefer L1 in-view instead if jank
- **Bindings**: same GSAP API on web/react/vue — differ only in lifecycle (`useGSAP` vs `onMounted`/`revert`)

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

#### R4 — Image sequence stage (`image-sequence-stage`)

- **Role**: explanation + guidance
- **Trigger**: scroll
- **Pattern**: one pinned Canvas stage maps scroll progress to an approved ordered image sequence; preload a bounded nearby-frame window and keep a poster until the first frame is ready
- **Page types**: product rotation, engineered exploded view, controlled camera move where deterministic pre-rendered frames already exist
- **Reduced**: static keyframe(s) plus normal reading flow; no compulsory pin
- **Mobile**: smaller sequence or static poster based on memory/performance budget
- **Boundary**: choose this only for an already-authored deterministic sequence. If natural generated motion is required, route L5; do not implement both Canvas and video for the same scene.

---

### L3 — OGL recipes

#### R1 — Token gradient field (`shader-atmosphere`)

- **Role**: atmosphere
- **Trigger**: auto-play (slow) + optional pointer parallax ≤8px
- **Pattern**: full-bleed quad; fragment colors sampled from CSS token hex; low-frequency noise; no particles
- **Page types**: landing, brand hero background
- **Reduced**: static CSS `linear-gradient` from same tokens
- **Mobile**: DPR cap 1.5; pause when `document.hidden`; static fallback under `prefers-reduced-motion`
- **Bindings**: vanilla OGL in all families; wrap only for mount/unmount

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

### L4 — Three.js family recipes

#### R1 — Product orbit (`product-orbit`)

- **Role**: explanation + emphasis
- **Trigger**: auto-play slow orbit + drag optional
- **Pattern**: one mesh or imported GLTF; lighting from art direction; background matches `--color-background`; no stock helpers
- **Page types**: product launch, configurable hero
- **Reduced**: poster image + drag disabled
- **Mobile**: lower poly; no shadows; drag only if essential
- **Bindings**:
  - **web**: `three` + `OrbitControls` if needed
  - **react**: R3F `<Canvas>` + mesh; avoid default `Float`/`Stars`
  - **vue**: TresJS `<TresCanvas>` + mesh; avoid default cientos spectacle helpers

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

---

### L5 — MiniMax Video recipes

These are primary recipes only. Load [VIDEO-MOTION.md](VIDEO-MOTION.md) for MiniMax availability, keyframe, prompt, optimization, integration, fallback, and QA requirements.

#### R0 — Hero take (`hero-take`)

- **Role**: emphasis or narrative opening
- **Trigger**: `page-load-once` or an explicit replay action
- **Pattern**: one continuous generated opening shot plays once, then holds its approved final frame. It must not replay on viewport re-entry and must not use `loop`.
- **Page types**: product launch, brand showcase, a low-density hero where the final frame remains a strong static composition
- **Reduced / mobile**: approved static end frame or a separately reviewed mobile poster; provide a visible pause/stop control when autoplay lasts more than five seconds
- **Implementation constraint**: treat the poster and final frame as designed states; pause when off-screen before completion, retain session state, and handle playback failure without blocking copy

#### R1 — Continuous scrub (`continuous-scrub`)

- **Role**: explanation or guidance
- **Trigger**: scroll, pointer, or drag
- **Pattern**: MiniMax generates one inspected continuous motion path; native video maps interaction progress `0…1` to `currentTime 0…duration`
- **Page types**: product disassembly, natural character/product action, reversible transformation
- **Reduced / mobile**: approved static keyframe pair or short non-scrub playback; never leave a pinned blank stage
- **Implementation constraint**: one RAF-mediated progress→seek path; verify rapid forward and reverse input without stale flashes

#### R2 — State transition (`state-transition`)

- **Role**: explanation
- **Trigger**: click / tap / state change, or comparison scrub
- **Pattern**: approved State A + State B are MiniMax first/last frames; generated bridge plays once or is progress-seeked
- **Page types**: before/after, closed/open, material/form change, logo morph, character state
- **Reduced / mobile**: static A/B comparison with clear labels, or short triggered playback only if explicitly requested
- **Implementation constraint**: State A is the poster; State B is held after playback; inspect both endpoints before integration

#### R3 — Cinematic journey (`cinematic-journey`)

- **Role**: guidance + atmosphere
- **Trigger**: scroll
- **Pattern**: pinned stage maps global progress across ordered scene and transition clips; each transition begins at `previousClip.actualLastFrame` and ends at `nextClip.actualFirstFrame`
- **Page types**: brand/story showcase and generated-world travel
- **Reduced / mobile**: static scene sequence or lightweight triggered clips; normal vertical content remains readable
- **Implementation constraint**: preload current and nearby clips, test seams in both directions, and do not use a crossfade to hide incompatible camera movement

## Step 8 — Mobile & reduced-motion fallbacks

Apply **both** branches to every implementation.

### Reduced-motion (`prefers-reduced-motion: reduce`)

| Strategy | Implementation |
|----------|----------------|
| **fade** (default) | Remove transforms; opacity 0→1 ≤200ms or instant |
| **static** | Final keyframe state immediately; no loop |
| **simplified** | Keep meaning-bearing motion (e.g. progress); remove parallax and atmosphere |
| **pausable** | `animation-play-state` + visible control for loops |

Engine-specific:

- **L1 web**: CSS media query zeroes duration / distance tokens
- **L1 react**: `useReducedMotion()` → skip `transform` variants
- **L1 vue**: `useReducedMotion` from `motion-v` / matchMedia; or CSS media query with `@vueuse/motion`
- **L1 native scroll / vector**: show final content/static frame; do not rely on a timeline or state machine to expose meaning
- **GSAP**: `matchMedia` context with `duration: 0` or simplified tweens
- **OGL**: detach RAF; swap canvas for CSS/static image
- **R3F / TresJS / three**: poster frame; pause or unmount renderer when `reduce`
- **L5 MiniMax Video**: do not autoplay or scrub; show the approved static poster / keyframe sequence with the same explanatory copy

### Mobile

| Risk | Mitigation |
|------|------------|
| Scroll jank (L2/L3/L4/L5) | Downgrade recipe; shorten pin; static fallback |
| WebGL thermal throttling | Cap DPR; pause off-screen; static hero image |
| Touch vs hover | All hover recipes need tap-equivalent or run once on reveal |
| Safe areas | Motion must not shift fixed nav / notches; test 390×844 |
| Connection / CPU | Prefer L1; lazy-load L3/L4 after first paint with poster |
| Video decode / seek pressure | Keep the poster until a frame is ready; preload only nearby L5 clips; fall back to static on constrained mobile |

## Step 9 — Anti-patterns (reject automatically)

| Anti-pattern | Why | Instead |
|--------------|-----|---------|
| Motion + GSAP on same page | Double runtime, inconsistent easing | One engine |
| GSAP for one simple scroll/view reveal | Ignores native CSS timelines and adds main-thread work | L1 `native-scroll-link` with a static fallback |
| React `motion` inside a Vue SFC (or vice versa) | Wrong stack binding | Use `motion-v` / `@vueuse/motion` on Vue |
| `motion-v` + `@vueuse/motion` together | Duplicate L1 runtimes | Keep the one already in the project |
| GSAP + OGL scroll both scrubbing | Stacked scroll listeners | One scroll driver |
| R3F/Tres background + GSAP parallax + L1 text stagger | Triple decorative stack | Pick one atmosphere recipe |
| `Float` + `Stars` + bloom defaults (drei/cientos) | Demo cosplay | DNA-driven single effect |
| Elastic easing on tables/forms | Breaks scanability | calm + fast, small distance |
| Infinite hero loops | Accessibility + distraction | once or pausable |
| Generated reveal emitted with `<video loop>` | A directional shot jumps from its ending back to an incompatible beginning | `hero-take`, `continuous-scrub`, or static poster after the Video Intent Route |
| 3D on B-end dashboard | Page type violation | L1 feedback only |
| Choosing generated video because it is "cool" | Violates simplest-sufficient routing | Keep the lowest code tier that expresses the intent |
| Switching to another generator when MiniMax is unavailable | Breaks the MiniMax-only first release | Give setup instructions and a Video Motion Plan only |
| Making an L5 video a second decorative effect | Competing motion media and decode cost | Make L5 the primary medium or use a simple video asset |
| Journey transition made from imagined rather than actual boundary frames | Visible seams on forward/reverse scrub | Extract real previous-last / next-first frames before generation |
| Forcing GSAP because a blog post used it | Ignores simplest-sufficient rule | Stay on L1 when DNA fits |
| Shipping recipe numeric defaults unchanged | Correct but mediocre | Mutate from `signature_motif` |
| Uniform fade-up on every section | Generic LLM gravity | One motif; vary only where hierarchy needs it |
| Glyph-by-glyph headline animation by default | Hurts readability, localization, and motion comfort | Semantic line/word-level `kinetic-type`, or static type |
| Rive/Lottie loop added as decoration | Extra runtime without product meaning | CSS/static SVG, or one interaction-bearing vector state with fallback |
| Exploration HTML with GSAP/Three CDN demos | Loads Router too early / demo cosplay | CSS interim motion + motif |

## Step 10 — Break mediocrity gravity (self-review before ship)

After implementing, answer **yes** to all before considering motion done:

1. **Motif present** — Can you name the signature motif in one sentence, and does the code encode it (not only comments)?
2. **Reference lineage** — Does at least one timing/distance/easing choice trace to the user's vibe, music, or UI reference?
3. **Not template-identical** — If brand color/type were swapped, would the motion still feel distinct from a generic SaaS fade-up kit?
4. **Recipe mutated** — Did duration, distance, or stagger differ from the recipe's printed defaults for a DNA reason?
5. **Budget held** — Still one engine, ≤1 secondary (feedback+guidance only), ≤1 atmosphere effect? If L5, is it the one dominant medium?
6. **A11y held** — Reduced-motion and mobile fallbacks still match the motif's *meaning* (state visible), not only "turn off"?
7. **L5 integrity (when selected)** — Is MiniMax configured, is the video intent recorded, are keyframes/boundaries approved, and do the matching `hero-take` or forward/reverse/fast-input QA checks pass?

If any answer is no, revise before showing the user.

## Agent workflow (when implementing)

1. Read confirmed Motion DNA + signature motif from design system or exploration output
2. **Load this file** (progressive load — not during early exploration)
3. Run capability check → **detect stack family** → dependency check → select tier + binding. If L5 wins, immediately load [VIDEO-MOTION.md](VIDEO-MOTION.md).
4. Pick primary recipe (+ optional feedback+guidance secondary); **mutate** from motif
5. Emit `motion_engine_decision` YAML (see Step 6) including `signature_motif` and `recipe_mutations`
6. Implement with token-bound durations/easing in the correct stack idiom
7. Wire `prefers-reduced-motion` and mobile fallback
8. Pass Step 10 mediocrity self-review

## Related references

- Motion DNA dimensions & extraction: [MOTION-SYSTEM.md](MOTION-SYSTEM.md)
- Token output shape: [../assets/design-system-template.md](../assets/design-system-template.md) § Motion System
- Consumer app tactile patterns: [CONSUMER-APP-DESIGN.md](CONSUMER-APP-DESIGN.md)
- Page type constraints: [SKILL.md](../SKILL.md) § Stage 0
- Exploration Interim Motion: [SKILL.md](../SKILL.md) § Design Exploration
- L5 MiniMax Video planning and integration: [VIDEO-MOTION.md](VIDEO-MOTION.md)
