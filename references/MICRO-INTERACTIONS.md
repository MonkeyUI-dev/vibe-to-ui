# Micro-Interactions Pattern Library

## 0. Scope and binding

Micro-interactions are the short, finite, user-driven or state-driven animations that confirm and explain: a button compresses when pressed, a toggle slides, a card expands, a sheet rises, a snackbar appears, a tab indicator glides, a list staggers in. They are not the entrance or atmosphere animations owned by [MOTION-SYSTEM.md](MOTION-SYSTEM.md) and they are not the engine-tier selection owned by [MOTION-ENGINE-ROUTER.md](MOTION-ENGINE-ROUTER.md). This doc owns the **recipe bodies** — what a tap, hover, focus, sheet, snackbar, modal, pull, etc. looks like per platform — and binds every recipe to the already-shipped motion token vocabulary.

**Platforms covered.** Three columns per pattern:

- **Web** — keyboard + pointer (`@media (hover: hover)` and `@media (pointer: fine)` guards)
- **Mobile-web** — touch (`pointerdown` / `pointerup` / `touch-action: manipulation`) plus safe-area awareness for sheets, modals, and full-bleed surfaces
- **Mobile-native-aspirational** — pointer mechanics for native shells (Capacitor / React Native bridge); native haptics appear as reference lines, not as generated code (out of scope for v0.7.0)

**Token binding (mandatory).** Every per-pattern block uses the shipped tokens:

| Property | Token | When to use |
|---|---|---|
| Duration | `--duration-fast` (≈ 120ms) | tap feedback, focus ring, hover lift, toggle, switch |
| Duration | `--duration-normal` (≈ 240ms) | bottom sheet rise, card expand, modal open, tab indicator, toast |
| Duration | `--duration-slow` (≈ 360ms) | page transition, list stagger base |
| Easing | `--ease-default` (Calm `cubic-bezier(0.4, 0, 0.2, 1)`) | default for everything except where noted |
| Easing | `--ease-out` (`cubic-bezier(0, 0, 0.2, 1)`) | content arriving, settling into place (toast in, sheet rise) |
| Easing | `--ease-in` (`cubic-bezier(0.4, 0, 1, 1)`) | content leaving (toast out, sheet dismiss) |
| Distance | `--motion-distance-sm` (4–8px) | tap compression, hover lift, focus ring offset |
| Distance | `--motion-distance-md` (12–24px) | sheet rise, card expand, modal scale-in |

Do **not** invent a new token vocabulary for micro-interactions. If a pattern needs a value the shipped vocabulary does not cover, prefer the nearest existing token and note the deviation in the pattern's *Common variants* block.

**Reduced-motion and mobile branches always live in the same pattern entry** — never split them across docs. Every pattern closes with both.

## 1. Pattern × Platform matrix

| Pattern | Web | Mobile-web | Mobile-native-aspirational | Reduced-motion |
|---|---|---|---|---|
| tap-feedback (§ 2.1) | `:active` scale + tint | `pointerdown` scale + tint | pointer + haptic | instant state change |
| hover-lift (§ 2.2) | `translateY(-2/4px)` + shadow | (avoid) | (avoid) | opacity-only |
| focus-ring (§ 2.3) | `:focus-visible` outline expand | `:focus-visible` outline expand | pointer focus + larger ring | static outline |
| toggle / switch (§ 2.4) | thumb slide + track color | thumb slide + track color | thumb slide + haptic on commit | instant flip |
| checkbox (§ 2.5) | box + check stroke + tick | box + check stroke + tick | stroke + haptic on commit | instant fill |
| radio (§ 2.6) | outer + inner scale | outer + inner scale | scale + haptic on commit | instant fill |
| card-expand (§ 2.7) | height + crossfade | height + crossfade | shared-element transition | crossfade without height |
| list-stagger (§ 2.8) | 40–80ms fade-up per row | same | same | opacity only, no stagger |
| bottom-sheet (§ 2.9) | rare (desktop sidebar) | rise + safe-area padding | native sheet module | instant show + opacity |
| pull-to-refresh (§ 2.10) | (avoid) | drag + threshold + spinner | drag + threshold + spinner | static progress bar |
| toast / snackbar (§ 2.11) | slide-in bottom + auto-dismiss | slide-in bottom + safe-area | slide-in + haptic on arrival | text-only, no translate |
| modal / dialog (§ 2.12) | scale-in + backdrop fade | slide-up full-bleed | slide-up + haptic on open | instant + backdrop fade |
| tab-indicator (§ 2.13) | indicator glide | indicator glide | indicator glide | instant jump, color-only |
| page-transition (§ 2.14) | View Transitions API where supported; fallback slide+fade | slide+fade by navigation direction | native push/pop animation | opacity-only |
| skeleton → content (§ 2.15) | crossfade + shimmer pause | same | same | static skeleton, no shimmer |

Each row links to its detail entry below.

## 2. Per-pattern entries

### 2.1 tap-feedback (foundation)

The most important micro-interaction. Every pressable surface — button, link, card, list row, tab, icon button — must react to a tap within one frame of contact.

- **Intent** Confirm the system received the tap before the action runs. Never delay the action for the animation.
- **Duration band** fast: 100–140ms (`--duration-fast`)
- **Easing token** `--ease-default`
- **Distance token** `--motion-distance-sm` (scale 0.97 + 1–4px shadow inset, no translate)
- **Web CSS recipe** Use `:active` (works on mouse + touch via modern browsers). Optional `:hover` lift layered on top (see § 2.2).
- **Mobile-web touch recipe** `pointerdown` adds the pressed class; `pointerup` / `pointercancel` / `pointerleave` removes it. Set `touch-action: manipulation` on the element to suppress 300ms double-tap delay. Safe-area: not relevant (point-of-press is local).
- **Mobile-native-aspirational pointer recipe** Trigger a soft haptic on `pointerdown` if the platform exposes `UIImpactFeedbackGenerator` (iOS) / `VibrationEffect` (Android); keep the visual tap-feedback identical to web.
- **Reduced-motion fallback** Drop the scale; change only `background-color` or border. Action remains instant.
- **Common variants** Disabled (no feedback, cursor not-allowed), Loading (state-change to spinner replaces tap-feedback mid-press), Long-tap (do **not** use this entry; see § 2.2 long-press in MOBILE-GESTURES.md).

### 2.2 hover-lift (web only)

- **Intent** Hint that an element is interactive and preview the press depth.
- **Duration band** fast: 120–180ms (`--duration-fast`)
- **Easing token** `--ease-default`
- **Distance token** `--motion-distance-sm` (translateY -2 to -4px + shadow elevation)
- **Web CSS recipe** `@media (hover: hover) and (pointer: fine)` guard — never apply on touch-primary screens. Use `transform: translateY(...)` plus a token-driven box-shadow lift.
- **Mobile-web touch recipe** **Skip entirely.** Touch users get tap-feedback (§ 2.1); hover-lift on touch causes the card to "stick" after release and looks broken.
- **Mobile-native-aspirational pointer recipe** Skip unless the device is a 2-in-1 with explicit hover mode (`@media (hover: hover) and (pointer: fine)`).
- **Reduced-motion fallback** Replace translateY with opacity-only shadow change.
- **Anti-pattern** Pair hover-lift with an equivalent reveal-on-tap-down when shipping for tablet/2-in-1 only — do not assume hover exists.

### 2.3 focus-ring

- **Intent** Make keyboard focus visible without adding visual noise for mouse users.
- **Duration band** instant in, fast out: 0ms appear, 80ms retract (`--duration-fast`)
- **Easing token** `--ease-default`
- **Distance token** `--motion-distance-sm` (2px outline offset)
- **Web CSS recipe** Use `:focus-visible` only — never `:focus`. Outline width transitions on retract; ring color uses token-driven accent.
- **Mobile-web touch recipe** Same selector. Touch users do not normally focus, but assistive technologies (switch control, external keyboard) do — keep the ring available.
- **Mobile-native-aspirational pointer recipe** Larger ring on first focus inside a modal; haptic on focus for users with screen readers.
- **Reduced-motion fallback** Static outline, no retract transition.
- **Common variants** Error state (red ring), Success state (green ring), Invalid input (red ring + shake, see § 2.5 variants).

### 2.4 toggle / switch

- **Intent** Show current binary state and commit the next state on tap.
- **Duration band** fast: 120–180ms (`--duration-fast`)
- **Easing token** `--ease-default` for thumb slide; `--ease-out` for track color change
- **Distance token** thumb translates 16–24px (token-controlled by `--motion-distance-md`)
- **Web CSS recipe** Two-state class toggle (`.is-on` / `.is-off`). Track background uses token-driven `color-success` / `color-neutral`. Thumb uses `transform: translateX(var(--motion-distance-md))` plus token-driven shadow.
- **Mobile-web touch recipe** Tap the entire control (track + thumb), not just the thumb — tap targets must be ≥ 44×44 CSS pixels (Apple HIG) / 48×48 (Material). `pointerdown` starts the thumb slide from the tap position, not the current thumb position.
- **Mobile-native-aspirational pointer recipe** Trigger a selection haptic on commit (state-change, not on press).
- **Reduced-motion fallback** No translate; color-only flip. Optional: 80ms color crossfade.
- **Common variants** Disabled (lower contrast), Loading (track becomes indeterminate), Indeterminate (used for "select all" tri-state checkboxes — same visual as off + small inner dash).

### 2.5 checkbox

- **Intent** Confirm a selection in a multi-choice context; provide explicit on/off affordance.
- **Duration band** fast: 120–180ms (`--duration-fast`)
- **Easing token** `--ease-default`
- **Distance token** `--motion-distance-sm` for stroke draw; no translate
- **Web CSS recipe** SVG path stroke draw using `stroke-dasharray` + `stroke-dashoffset` transition (or a pre-authored Lottie / Rive micro-asset). On check, fill token-driven `color-primary`; on uncheck, reverse.
- **Mobile-web touch recipe** Whole-box tap target ≥ 44×44. Pair with label so tapping the label toggles the checkbox.
- **Mobile-native-aspirational pointer recipe** Selection haptic on commit.
- **Reduced-motion fallback** Instant fill, no stroke-draw.
- **Common variants** Indeterminate (used by parent checkboxes when children are mixed), Error (red border + shake, 4 iterations of 60ms — see error-shake recipe in the consumer-app pattern list), Required (asterisk copy, not a different visual).

### 2.6 radio

- **Intent** Confirm a single choice in a 2–7 option group.
- **Duration band** fast: 100–140ms (`--duration-fast`)
- **Easing token** `--ease-default`
- **Distance token** `--motion-distance-sm` for inner dot scale
- **Web CSS recipe** Outer ring is static; inner dot uses `transform: scale(...)` 0 → 1. Group behavior: tapping a sibling radio deselects the current one with the same animation.
- **Mobile-web touch recipe** Whole-circle tap target ≥ 44×44. Wrap with `<label>` so the label is also a tap target.
- **Mobile-native-aspirational pointer recipe** Selection haptic on commit.
- **Reduced-motion fallback** Instant fill, no scale.
- **Common variants** Disabled (lower contrast), Required (legend asterisk), Inline-help (small text below).

### 2.7 card-expand

- **Intent** Reveal detail in place without a full navigation; preserve the user's reading position.
- **Duration band** normal: 180–260ms (`--duration-normal`)
- **Easing token** `--ease-default`
- **Distance token** `--motion-distance-md` (12–24px translate / scale) for the entrance; static for the card itself
- **Web CSS recipe** Animate `max-height` (token-driven cap, e.g. `--motion-distance-md * 30`) and `opacity` simultaneously. Avoid animating `height: auto` directly. If using View Transitions API on a supported browser, use `view-transition-name` for shared-origin.
- **Mobile-web touch recipe** Same. On touch, ensure parent is not in a scroll-lock — scroll-locked parents will trap the tap.
- **Mobile-native-aspirational pointer recipe** Shared-element transition (`view-transition-name` on web; native `sharedElements` if a bridge is available).
- **Reduced-motion fallback** Crossfade only — no height animation, no layout shift.
- **Common variants** Multi-card expand (only one open at a time — close others before opening the new one), Disabled (no tap response), Error (close + show inline error).

### 2.8 list-stagger

- **Intent** Make a list of items read as a sequence, not as a wall. Bound to router recipe **R1 in-view-stagger**.
- **Duration band** base 240ms + 40–80ms stagger (`--duration-normal` + per-item offset)
- **Easing token** `--ease-out`
- **Distance token** `--motion-distance-sm` (4–8px translateY on entrance)
- **Web CSS recipe** Use `IntersectionObserver` to add `.is-in-view` per row; stagger via `animation-delay: calc(var(--stagger-index) * 60ms)`. Respect `prefers-reduced-motion`: stagger only when the user has not asked to reduce motion.
- **Mobile-web touch recipe** Same — touch devices don't need a different stagger. Reduce stagger count when on mid-tier mobile (cap total under 12 items).
- **Mobile-native-aspirational pointer recipe** Same animation curve; native recycler views typically need no entrance animation because they only render visible rows.
- **Reduced-motion fallback** Opacity-only, no stagger, no translate.
- **Common variants** First-paint stagger (cap stagger to 6 rows; rest fade in lazily), Pull-to-refresh pairing (the new content fades in after the spinner commits — see § 2.10).

### 2.9 bottom-sheet

- **Intent** Reveal contextual detail (filters, share, comments) without leaving the current screen. Mobile-primary; rare on desktop.
- **Duration band** normal: 220–320ms (`--duration-normal` to `--duration-slow` low end)
- **Easing token** `--ease-out` for rise; `--ease-in` for dismiss
- **Distance token** `--motion-distance-md` (12–24px settle after overshoot)
- **Web CSS recipe** Rare on desktop; if used, rise from the bottom of a centered card on a wide viewport (max-width ~480px). Backdrop fades 0 → 0.5 opacity over the same duration.
- **Mobile-web touch recipe** Bottom edge of sheet handles drag-to-dismiss (see MOBILE-GESTURES.md § swipe-to-dismiss). Sheet content bottom padding = `max(env(safe-area-inset-bottom, 0px), 16px)` until MOBILE-VIEWPORT.md formally ships `--inset-bottom`. Drag handle is mandatory.
- **Mobile-native-aspirational pointer recipe** Use native sheet module if available (iOS 15+ `UISheetPresentationController` / Android `BottomSheetDialogFragment`). Haptic on open + on snap-point change.
- **Reduced-motion fallback** Instant show + backdrop fade.
- **Common variants** Modal sheet (cannot dismiss by tapping backdrop — must use explicit close), Half-sheet (snap to 50% height), Action sheet (grid of large icons + labels, e.g. share targets).

### 2.10 pull-to-refresh

- **Intent** Re-fetch the top of a feed without a visible refresh button. Bound to MOBILE-GESTURES.md § pull-to-refresh and router recipe R6 in-view.
- **Duration band** spinner 200ms appear + hold; settle 240ms (`--duration-normal`)
- **Easing token** `--ease-out` for spinner appear; spring for snap-back
- **Distance token** `--motion-distance-md` (16px) for spinner slot
- **Web CSS recipe** Avoid. Use an explicit "Refresh" button on web; pull-to-refresh fights with scroll.
- **Mobile-web touch recipe** `pointerdown` only registers pull-to-refresh when `scrollTop === 0`. Threshold 80px before trigger; release < 80px springs back. Disable parent scroll while drag is active.
- **Mobile-native-aspirational pointer recipe** Same pointer mechanics; success haptic on commit.
- **Reduced-motion fallback** Static progress bar (token-driven `--color-primary` width); no spinner rotation.
- **Common variants** Header-attached (spinner pushes content down — more common), Overlay (spinner overlays content without push — easier to retrofit), No-pull (some feeds have no refresh; show last-updated timestamp instead).

### 2.11 toast / snackbar

- **Intent** Acknowledge a transient action without stealing focus. Auto-dismiss or swipe to dismiss.
- **Duration band** enter 240ms (`--duration-normal`); hold 4–6 seconds; exit 160ms
- **Easing token** `--ease-out` enter; `--ease-in` exit
- **Distance token** `--motion-distance-md` (12–24px translateY for the entrance)
- **Web CSS recipe** Bottom-positioned fixed element; `transform: translateY(100%)` initial state, `translateY(0)` on show. Use `aria-live="polite"` (not `assertive`) so screen readers announce but do not interrupt.
- **Mobile-web touch recipe** Bottom padding = `max(env(safe-area-inset-bottom, 0px), 16px)`. Optional swipe-down to dismiss (see MOBILE-GESTURES.md § swipe-to-dismiss).
- **Mobile-native-aspirational pointer recipe** Success / selection haptic on arrival. Pair with `Undo` action button when the action is destructive.
- **Reduced-motion fallback** Static text-only banner, no translate. Hold duration unchanged.
- **Common variants** Action-bearing (`Undo`, `View`), Stacking (max 3 visible; older dismiss to make room), Error (longer hold, no auto-dismiss — explicit close button required).

### 2.12 modal / dialog

- **Intent** Block interaction to require a decision; preserve background for context.
- **Duration band** enter 200–280ms (`--duration-normal`); exit 160ms
- **Easing token** `--ease-default`
- **Distance token** `--motion-distance-md` for the dialog itself (scale 0.96 → 1.0, or slide-up on mobile)
- **Web CSS recipe** Center-anchored with max-width ~480px. Backdrop fades 0 → 0.5 opacity. Trap focus inside until close (Tab cycles within). Restore focus to the trigger element on close.
- **Mobile-web touch recipe** Full-bleed slide-up on small viewports; safe-area padding on all sides. Bottom padding = `max(env(safe-area-inset-bottom, 0px), 16px)`. Drag handle at top to allow swipe-down dismiss.
- **Mobile-native-aspirational pointer recipe** Native modal (iOS `UIViewController` modal / Android `DialogFragment`). Haptic on open.
- **Reduced-motion fallback** Instant show + backdrop fade. Focus trap still required.
- **Common variants** Non-modal (popover / popper — does not trap focus, dismisses on outside tap), Destructive (require typed confirmation, e.g. type the item name to confirm delete), Wizard (multi-step; transitions between steps use `view-transition-name`).

### 2.13 tab-indicator

- **Intent** Glide the active marker between tabs without restarting the layout. Bound to router recipe R5 tab-indicator.
- **Duration band** normal: 200–280ms (`--duration-normal`)
- **Easing token** `--ease-default`
- **Distance token** `--motion-distance-sm` (4–8px) for the indicator height, not for travel (travel is computed)
- **Web CSS recipe** Indicator uses `transform: translateX(...)` based on the active tab's offsetLeft; track uses token-driven `color-primary`. Underline vs pill vs background — the indicator motion is identical, only the visual changes.
- **Mobile-web touch recipe** Same; do not animate on swipe between tabs in a swipeable tab container (the gesture IS the motion).
- **Mobile-native-aspirational pointer recipe** Selection haptic on tab change.
- **Reduced-motion fallback** Color-only, no translate. Active tab still has a static marker.
- **Common variants** Sticky tabs (indicator persists while content scrolls), Nested tabs (top tabs inside a detail screen — same recipe, smaller sizes), Animated icons (icon morphs on activation — treat as separate micro-asset, see § 2.14 page-transition for cross-page).

### 2.14 page-transition

- **Intent** Tell the user which way they navigated. Bound to router recipe R2 layout-handoff and (when supported) the View Transitions API.
- **Duration band** normal: 220–320ms (`--duration-normal` to `--duration-slow` low end)
- **Easing token** `--ease-default` for slide+fade; native easing for View Transitions API
- **Distance token** `--motion-distance-md` (12–24px) for slide
- **Web CSS recipe** If browser supports View Transitions API, use `document.startViewTransition(() => updateDOM())` and assign `view-transition-name` to shared elements. Fallback: slide+fade with direction (forward = left-to-right, back = right-to-left).
- **Mobile-web touch recipe** Match the platform direction: iOS push slides left-to-right; Android fades + scale. Detect via `(max-width: 768px)` and a UA feature query.
- **Mobile-native-aspirational pointer recipe** Native push/pop animation (iOS `UINavigationController` / Android `Fragment` transitions). Selection haptic not appropriate here — haptics are for state changes, not navigation.
- **Reduced-motion fallback** Opacity-only fade, no slide. View Transitions API still works but with `skipTransition()`.
- **Common variants** Hero transition (shared element between origin and destination), Modal push (page is pushed as a full-screen modal — see § 2.12), Tab switch (no page transition; the tab indicator recipe owns the motion — see § 2.13).

### 2.15 skeleton → content

- **Intent** Reserve space while loading so the layout does not jump when content arrives.
- **Duration band** crossfade 160ms (`--duration-fast` to `--duration-normal`); shimmer 1.4s loop while loading
- **Easing token** `--ease-default`
- **Distance token** none (no translate; reserved height matches final content height)
- **Web CSS recipe** Skeleton elements match the final element's height and shape (use `aspect-ratio` or fixed heights tied to typography tokens). Crossfade on content arrival. Shimmer animation must pause under `prefers-reduced-motion`.
- **Mobile-web touch recipe** Same. On slow connections, prefer skeleton over spinner — it keeps the layout stable and reduces perceived wait.
- **Mobile-native-aspirational pointer recipe** Same; native recycler views skip skeleton entirely because they render placeholders natively.
- **Reduced-motion fallback** Static skeleton (gray rectangles, no shimmer).
- **Common variants** Partial skeleton (only the section that is loading is skeleton; rest is content), Error replacement (skeleton fades to error state, not content — see MOBILE-STATES.md), Image skeleton (preserve aspect ratio with token-driven `aspect-ratio`).

## 3. Anti-patterns (do-not list)

- **Hover-only primary CTAs.** Touch users get no feedback and the button looks dead.
- **Perpetual decorative loops on inputs.** Looping background animation on a card competes with reading; pause on focus.
- **Animation that delays input.** Press → state change must complete in ≤ 200ms. If a micro-interaction runs longer than the action, the action wins — cut the animation, not the action.
- **Relying on `:hover` on touch-primary screens.** Use `@media (hover: hover) and (pointer: fine)` to scope hover styles to devices that have hover.
- **Tap-feedback that scales below 0.95.** The element looks broken rather than pressed.
- **Pull-to-refresh without cancellation rule.** Drag without threshold logic fights the browser's overscroll and steals other gestures.
- **Toast / snackbar without a pause-on-hover and dismiss-action copy.** A toast that hides while the user is reading it is worse than no toast.
- **Modal without focus trap.** Keyboard users escape the modal without dismissing it.
- **Bottom sheet without a drag handle.** Mobile users discover dismissal by accident or not at all.
- **Toggle / checkbox animation that animates the wrong direction on RTL.** Mirror the thumb slide for `dir="rtl"`.
- **Skeleton with absolute sizes that do not match the final content.** The crossfade still causes layout jump because the content was reserved at the wrong height.
- **Mixing two engines on the same surface** (e.g. GSAP + Framer Motion on the same screen). One engine per surface — see MOTION-ENGINE-ROUTER.md Step 1.
- **Replaying entrance animations on every viewport re-entry.** "Once, then hold" (MOTION-SYSTEM.md § Dimension 7) — do not re-stagger a list every time the user scrolls back to the top.
- **Long-translate reduced-motion fallbacks.** Replace translates with opacity transitions; never substitute a "tiny translate" — it still violates the user's preference.

## 4. Cross-references

- [MOTION-SYSTEM.md](MOTION-SYSTEM.md) — 8-dimension Motion DNA (Role / Trigger / Tempo / Easing / Distance / Density / Repeat / Reduced-motion). This library binds every pattern to that DNA.
- [MOTION-ENGINE-ROUTER.md](MOTION-ENGINE-ROUTER.md) — engine-tier selection (L1 CSS → L2 Framer / GSAP → L3 Lottie / Rive → L4 OGL/Three.js → L5 WebGPU) and stack-family binding (web / react / vue). The recipes here are platform-agnostic; the router is where the engine gets picked.
- [CONSUMER-APP-DESIGN.md](CONSUMER-APP-DESIGN.md) — what counts as tactile confidence on a Consumer app surface; motion budgets and gesture-model field that selects which patterns apply.
- For mobile-viewport / safe-area tokens referenced in § 2.9 / § 2.10 / § 2.11 / § 2.12, see MOBILE-VIEWPORT.md (mobile branch).
- For per-gesture thresholds, cancellation rules, and system-conflict notes referenced in § 2.5 / § 2.9 / § 2.10 / § 2.11, see MOBILE-GESTURES.md (mobile branch).