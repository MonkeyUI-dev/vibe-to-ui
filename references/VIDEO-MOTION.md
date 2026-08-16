# Video Motion (L5 MiniMax)

Progressive-load reference. Read this only after [MOTION-ENGINE-ROUTER.md](MOTION-ENGINE-ROUTER.md) selects **L5 MiniMax Video**. It is an integration guide, not a general video-generation platform or editor.

## The L5 decision

Use AI Video only when the intended experience needs **natural movement, complex shape/material change, or a cinematic camera move that code cannot express convincingly**. Start with L1 and work upward. A video must have a clear product or narrative job, a named interaction input, and a static fallback.

| Need | Route |
|---|---|
| Button, card, modal, tab, simple reveal | L1 CSS / Motion |
| Pinned editorial choreography with DOM layers | L2 GSAP |
| Image warp, shader, distortion | L3 OGL |
| Interactive model, spatial lighting, live camera | L4 Three.js |
| Natural product transformation, character action, continuous generated world/camera | L5 MiniMax Video |

Do not choose L5 because video looks more impressive. **Video as an asset is not Video Motion:** a hero background `<video>` uses the simple patterns below; a video texture in a Three.js scene remains L4. L5 is the dominant motion medium only when the generated clip itself carries the essential interaction or story.

### MiniMax-only provider policy

The first release supports **MiniMax only**. Do not create a provider abstraction, silently switch platforms, or recommend an alternative generator.

When L5 is selected, first look for the official MiniMax CLI and, when available, its official skill. Confirm the CLI can run and authentication is valid before generation (for example, `mmx --version` and `mmx auth status`). Use the supported command surface such as:

```bash
mmx video generate --prompt "..."
```

Consult `mmx video generate --help` before using model-specific first/last-frame flags; do not invent flags from memory. The [official MiniMax CLI documentation](https://platform.minimaxi.com/docs/token-plan/minimax-cli) covers installation, `mmx auth login --api-key …`, optional official skill installation, and `mmx video generate`.

If MiniMax is missing or not configured, say exactly:

> Video Motion currently supports MiniMax only. Other video generation providers are not supported yet.

Then offer the MiniMax setup path. If the user declines or postpones setup, do **not** generate anything. Deliver the executable Video Motion Plan described below instead.

```bash
npm install -g mmx-cli
mmx auth login --api-key <your-api-key>
mmx auth status
# Recommended when the agent host supports Skills:
npx skills add MiniMax-AI/cli -y -g
```

Do not ask the user to paste their key into project files or source control. If authentication has a region mismatch, use the official MiniMax guidance to set the region and re-check `mmx auth status`.

## Simple native-video patterns

Use a normal `<video>` with a `poster`, accessible controls where appropriate, and a static fallback. Do not create a complex L5 workflow for these patterns:

- **Ambient loop:** muted, `playsinline`, pausable when it is decorative; stop or replace under reduced motion.
- **Hover / click / in-view playback:** tie `play()` / `pause()` to one meaningful event; never make hover the only way to access meaning.
- **Video mask / reveal:** use a video as a clipped visual layer when it is a short, non-interactive visual asset.
- **Poster / failure fallback:** show the chosen poster immediately; if metadata, decode, or playback fails, leave the final static content visible.

## Required planning record

Before generation, write a compact record. It makes retries and integration deterministic:

```yaml
video_motion_plan:
  recipe: continuous-scrub # continuous-scrub | state-transition | cinematic-journey
  intent: "Explain how the product separates into serviceable layers."
  input: scroll            # scroll | pointer | drag | triggered-playback
  subject_lock: "matte black speaker; centered logo; seven visible parts; no added controls"
  visual_lock: "front three-quarter camera, soft studio light, warm grey seamless background"
  display: "desktop 1440x900 stage; mobile static poster"
  duration: "6 s"
  aspect_ratio: "16:9"
  first_frame: "approved product-closed keyframe"
  last_frame: "approved fully-exploded product keyframe"
  integration_strategy: "pinned native-video stage; RAF maps scroll progress to currentTime; poster first"
  fallback: "closed and exploded static comparison"
```

When MiniMax cannot be used yet, this completed record is the deliverable: include the scene/keyframe specification, generation-ready MiniMax prompt, first/last-frame requirements, duration and aspect ratio, plus the integration strategy and static fallback. Do not pretend a clip was generated.

### Prompt and keyframe strategy

1. Lock an approved **reference/keyframe** before making motion: subject identity, geometry, logo, count of parts, material, camera, lighting, background, and forbidden changes.
2. For a single continuous path, define start, decisive middle poses, and end. Ask for one direction of motion only; the website supplies reverse movement by seeking the same clip backward.
3. For a state transition, provide approved State A and State B as the first and last frame. Ask only for the physically/plausibly continuous in-between.
4. For a journey, create a master world/style frame, then the scene keyframes. Export actual rendered boundary frames before generating transitions.
5. Use a concise MiniMax prompt: **locked subject + start/end state + camera path + motion constraint + visual continuity constraints + exclusions**. State that there must be no cuts, new objects, logo changes, duplicated components, or camera reset when those would break the interaction.

Prompt skeleton:

```text
[Subject lock]. Start at [approved first-frame state] and continuously [single action]
until [approved last-frame state]. [Camera path] at [speed]; [lighting/background lock].
One unbroken shot, stable identity and proportions, preserve logo and all structural details.
No cut, no camera reset, no new objects, no duplicated parts, no text changes.
```

## Recipe 1 — Continuous Scrub

Use for product disassembly, continuous character action, natural deformation, and any experience that must move forward and backward along one coherent path.

```text
approved reference / keyframes
        ↓
MiniMax continuous clip
        ↓
trim pauses; inspect and optimize
        ↓
map scroll, pointer, or drag progress (0–1) to video time (0–duration)
```

### Integration contract

- Wait for `loadedmetadata`, keep the poster visible until the first seeked frame is drawable, and clamp progress to `0…1`.
- On a single `requestAnimationFrame` loop, apply the newest input progress: `video.currentTime = progress * video.duration`. Do not create one seek for every raw scroll/pointer event.
- Only write `currentTime` when it meaningfully changes; retain the latest target while a seek is pending. Test rapid forward and reverse input.
- Scroll: map the pinned stage’s start/end to `0…1`. Pointer: map the declared axis and clamp; two-axis natural responses need planned two-dimensional media rather than pretending a single clip can solve them. Drag: map the handle’s travel with touch support.
- Start with native video seeking. If the display demands frame-accurate reverse scrubbing that the codec/device cannot sustain, re-encode or use a preprocessed frame sequence **only after measuring**. Do not ship competing render backends for the same effect.

## Recipe 2 — State Transition

Use for Before → After, closed → open, material/form changes, logo morphs, and character state changes.

```text
approved State A + approved State B
        ↓
MiniMax first-last-frame clip
        ↓
triggered playback or progress scrub
```

- State A and State B are real approved frames, not descriptive aspirations.
- Generate and inspect a short bridge, then choose **triggered playback** for a discrete causal action or **scrub** when users need reversible comparison.
- Keep surrounding layout/state labels stable so the moving subject, not unrelated DOM motion, communicates the change.
- For playback, initialize State A as the poster and freeze on State B after completion; for reverse scrub, use the same progress mapping as Continuous Scrub.

## Recipe 3 — Cinematic Journey

Use for a scroll-controlled trip across multiple generated scenes. It is a pinned visual stage, not a generic background montage.

```text
scene A → transition AB → scene B → transition BC → scene C
```

For every connector, use real boundary frames:

```text
transition.firstFrame = previousClip.actualLastFrame
transition.lastFrame  = nextClip.actualFirstFrame
```

Generate the transition from those extracted frames, with a simple continuous camera direction. A slow forward glide is safer than an upward reset or map-view jump. Build an ordered clip manifest with each clip duration and the associated copy/scene range; map total journey progress across the cumulative durations, not equally across clip count.

- Pin one visual stage and map scroll to global journey progress.
- Preload the current clip and its immediate neighbor(s); retain the static poster and scene copy until the necessary clip is ready.
- Test clip boundaries in both directions. Crossfade only when it preserves a real seam; it must not conceal an incompatible camera jump.
- On mobile, default to a poster/static scene sequence or short triggered playback unless performance testing proves scrubbing is smooth.

## Asset delivery, loading, and accessibility

- Trim dead air and rejected frames before delivery. Encode to the **actual rendered dimensions**, not source resolution; omit audio for this scope; include an appropriate poster and `preload="metadata"` by default.
- Validate seeking with the chosen encode on the target browsers. Favor an encoding/keyframe cadence that supports the intended scrub responsiveness; inspect the final hosted asset rather than assuming local playback is representative.
- Never show a black box: poster first, loading state second, static content on error. Do not block page copy or controls on a decorative clip.
- Respect `prefers-reduced-motion: reduce`: show the approved static first/last state (or a clearly labelled static sequence), do not autoplay, do not pin a scrub-only story, and preserve the information in text or images.
- Pause/stop off-screen ambient media; keep `playsinline`; avoid hover-only control; test touch, keyboard focus, data-saver/slow-network behavior, and a practical mobile fallback.

## Video Motion QA

Before handoff, verify all of the following:

- [ ] Subject identity, proportions, logo, and product structure stay continuous.
- [ ] No unwanted morph, extra limb, duplicated component, text mutation, or camera reset appears.
- [ ] First and last states match their approved keyframes exactly enough for the intended handoff.
- [ ] Journey transitions use actual boundary frames and have no visible jump.
- [ ] Forward and reverse scrub are natural; fast input does not flash stale frames.
- [ ] The first render is never black; poster and static/error fallback work.
- [ ] Mobile uses a tested lighter experience; `prefers-reduced-motion` yields a meaningful static alternative.
- [ ] The final file is optimized for its real display size and tested in the deployed integration.

### End-to-end acceptance paths

Use these three checks whenever validating the Router, before calling L5 production-ready:

| Path | Router result | Required proof |
|---|---|---|
| Product breaks into physical layers as the user scrolls backward and forward | L5 `continuous-scrub` | Approved start/middle/end keyframes; native progress mapping; fast reverse-scrub recording; poster/static fallback |
| A product changes from closed to open after a click | L5 `state-transition` | Approved State A/B; first-last-frame MiniMax plan; State A poster and held State B; reduced-motion A/B comparison |
| User scrolls through three generated worlds | L5 `cinematic-journey` | Ordered scene/transition manifest; every transition uses extracted real boundary frames; seam test in both directions; nearby preload and mobile static path |

Also run negative route checks: a button hover must remain L1, an editorial DOM pin story L2, an image distortion L3, and a live interactive product model L4. L5 is wrong when any of those can express the required experience.

## First-release boundary

Do not add other providers, a provider abstraction, a video editor, timeline GUI, multi-track editing, audio/BGM, cloud asset management, a self-hosted generation model, or duplicate rendering backends. This system is a Motion Director: it decides when code is sufficient, and when MiniMax Video is necessary, then integrates that video correctly.

## Inspiration credit

The Continuous Scrub approach is inspired by [oil-motion](https://github.com/oil-oil/oil-motion). The multi-scene, real-boundary-frame transition approach is inspired by [kubeez-scroll-world-video](https://github.com/KubeezMedia/kubeez-scroll-world-video).
