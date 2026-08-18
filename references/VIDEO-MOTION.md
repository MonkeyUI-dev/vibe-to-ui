# Video Motion (MiniMax + Native Video Delivery)

Progressive-load reference. Read this after [MOTION-ENGINE-ROUTER.md](MOTION-ENGINE-ROUTER.md) selects **L5 MiniMax Video** or any native-video delivery route. It is an integration guide, not a general video-generation platform or editor.

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

- **Hero take:** a generated or supplied one-directional opening shot that plays once and holds an approved end frame. This is the default for a narrative hero clip; do not add `loop`.
- **Ambient loop:** muted, `playsinline`, and pausable when decorative. Use it only after passing the loop certificate below; stop or replace under reduced motion.
- **Hover / click / in-view playback:** tie `play()` / `pause()` to one meaningful event; never make hover the only way to access meaning.
- **Video mask / reveal:** use a video as a clipped visual layer when it is a short, non-interactive visual asset.
- **Poster / failure fallback:** show the chosen poster immediately; if metadata, decode, or playback fails, leave the final static content visible.

## Video Intent Router

Run this route whenever a native or generated video is proposed. It prevents a directional L5 clip from being treated as generic moving wallpaper.

| Intent | Choose when | Delivery | Do not choose when |
|---|---|---|---|
| `hero-take` | The motion provides a short emotional opening and its final frame can remain as the hero | `page-load-once` → hold final frame; replay only by explicit user action | The final composition is unusable, or the user must control progress to understand the product |
| `continuous-scrub` | The motion explains a reversible change and each scroll chapter has a visible causal state | Pinned stage; scroll/pointer/drag maps `0…1` to video time | Scroll would only decorate an unrelated camera move |
| `state-transition` | A discrete action causes a meaningful State A → State B change | Click/tap/state trigger; State B is held | The story needs several chapters or continuous comparison |
| `ambient-loop` | Motion is genuinely low-information atmosphere | Muted native loop with visible pause/stop and static fallback | The camera pushes, reveals, transforms, changes scene, or ends on a different composition |
| `static` / `triggered-playback` | No intent above is justified | Poster or user-initiated playback | Never autoplay simply because a clip exists |

**Default:** use `hero-take` for a generated directional opening; use `static` when video cannot carry a real job. `ambient-loop` is an explicit exception, not a fallback for a clip with an incompatible ending.

### Loop certificate (required for `ambient-loop`)

Before adding the `loop` attribute, record and pass all of the following:

- The asset was authored/generated as a loop, with approved first and last compositions matching in subject pose, camera, lighting, background, and crop.
- Review the rendered desktop and mobile crop across **three consecutive cycles**; no jump, brightness pulse, camera reset, or subject discontinuity is visible.
- The loop is muted, off-screen media pauses, a visible pause/stop control exists, and reduced motion swaps to an approved static frame.
- A crossfade cannot be used to hide an incompatible camera jump. If a real transition is required, use actual boundary frames and a `cinematic-journey` instead.

Never reuse a portrait source as a full-bleed desktop landscape background without approving its actual crop. Plan separate desktop/mobile encodes or a static mobile alternative when the subject or safe space would be lost.

## Required planning record

Before generation, write a compact record. It makes retries and integration deterministic:

```yaml
video_motion_plan:
  recipe: continuous-scrub # hero-take | continuous-scrub | state-transition | cinematic-journey | ambient-loop
  intent: "Explain how the product separates into serviceable layers."
  input: scroll            # page-load-once | scroll | pointer | drag | triggered-playback
  repeat_policy: user-controlled # once-hold | user-controlled | certified-loop
  loop_certificate: not-applicable # required and approved for ambient-loop only
  subject_lock: "matte black speaker; centered logo; seven visible parts; no added controls"
  visual_lock: "front three-quarter camera, soft studio light, warm grey seamless background"
  display: "desktop 1440x900 stage; mobile static poster"
  crop_review: "approved 16:9 desktop and 9:16 mobile compositions"
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

## Recipe 0 — Hero Take

Use for a short generated opening that adds product character but does not need user-controlled progress. Its end frame is part of the composition, not a temporary video frame to throw away.

```text
approved opening keyframe
        ↓
one directional MiniMax hero clip
        ↓
approved held end keyframe
        ↓
play once on declared first entry; remain still
```

- Declare `input: page-load-once`, `repeat_policy: once-hold`, and `loop_certificate: not-applicable`.
- Render `<video autoplay muted playsinline>` **without** `loop`; retain the final frame when it ends and do not replay it when the hero re-enters the viewport.
- Keep a poster until a playable first frame is ready. Treat the final held frame as a second approved poster for failure, reduced-motion, and return-visit logic where appropriate.
- If autoplay runs longer than five seconds, provide a visible pause/stop control; an explicit replay control is preferable to automatic re-entry playback.
- On mobile and under `prefers-reduced-motion`, show the approved static composition by default unless a separately tested short playback is essential.

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
- For `hero-take`, keep the held final frame after completion; never manufacture a reset by setting `currentTime = 0` or adding `loop`. For every autoplay, make the pause/stop affordance discoverable when needed and do not replay on viewport re-entry.
- Respect `prefers-reduced-motion: reduce`: show the approved static first/last state (or a clearly labelled static sequence), do not autoplay, do not pin a scrub-only story, and preserve the information in text or images.
- Pause/stop off-screen ambient media; keep `playsinline`; avoid hover-only control; test touch, keyboard focus, data-saver/slow-network behavior, and a practical mobile fallback.

## Video Motion QA

Before handoff, verify all of the following:

- [ ] Subject identity, proportions, logo, and product structure stay continuous.
- [ ] No unwanted morph, extra limb, duplicated component, text mutation, or camera reset appears.
- [ ] First and last states match their approved keyframes exactly enough for the intended handoff.
- [ ] Video Intent Router result is recorded; a generated directional shot is `hero-take` or user-controlled, never an unreviewed loop.
- [ ] A loop, if present, has a completed loop certificate and passes three-cycle desktop/mobile crop review.
- [ ] A `hero-take` holds a reviewed final frame, does not replay on re-entry, and exposes the required pause/stop or replay control.
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
| A hero makes one natural product reveal and ends on a strong close-up | L5 `hero-take` | Approved opening/end frames; no `loop`; final-frame hold; session/re-entry and pause-control check; mobile static path |
| A product changes from closed to open after a click | L5 `state-transition` | Approved State A/B; first-last-frame MiniMax plan; State A poster and held State B; reduced-motion A/B comparison |
| User scrolls through three generated worlds | L5 `cinematic-journey` | Ordered scene/transition manifest; every transition uses extracted real boundary frames; seam test in both directions; nearby preload and mobile static path |

Also run negative route checks: a button hover must remain L1, an editorial DOM pin story L2, an image distortion L3, and a live interactive product model L4. L5 is wrong when any of those can express the required experience.

## First-release boundary

Do not add other providers, a provider abstraction, a video editor, timeline GUI, multi-track editing, audio/BGM, cloud asset management, a self-hosted generation model, or duplicate rendering backends. This system is a Motion Director: it decides when code is sufficient, and when MiniMax Video is necessary, then integrates that video correctly.

## Inspiration credit

The Continuous Scrub approach is inspired by [oil-motion](https://github.com/oil-oil/oil-motion). The multi-scene, real-boundary-frame transition approach is inspired by [kubeez-scroll-world-video](https://github.com/KubeezMedia/kubeez-scroll-world-video).
