# E2E Example: Consumer App UIUX -> Preview -> Apply

This walkthrough demonstrates the Consumer app scenario as a first-class design workflow. It shows how the agent should move from product context to 3 UIUX directions, app-preview artifacts, design-system formalization, visual assets, and mobile-first Apply checks.

Product: **BloomTrack** - a habit-tracking consumer app for people building gentle daily routines.
Confirmed direction: **Gentle Momentum** - warm, encouraging, tactile, calm.

---

## Step 0 - Page type and app context

Run Stage 0 before extracting tokens or generating previews.

| Field | Value |
|-------|-------|
| Primary page type | Consumer app surface |
| Secondary modifier | Onboarding + daily-use habit loop |
| Density | medium |
| Confidence | high |
| Evidence | Bottom tabs, habit cards, daily check-in, onboarding, empty state |
| Design consequence | Mobile-first hierarchy, touch feedback, complete state coverage, expressive but restrained brand moments |

Consumer app fields from [CONSUMER-APP-DESIGN.md](../../references/CONSUMER-APP-DESIGN.md):

```yaml
consumer_app:
  platform: mobile_app
  lifecycle_stage: activation
  primary_loop: track
  navigation_model: bottom_tabs
  gesture_model: tap_first
  state_risk: medium
```

Do not treat this as a landing page. The output must prove app usability: navigation, a main loop, a flow/detail state, and at least one non-happy state.

---

## Step 1 - Gather product and experience context

Ask only what is needed:

```text
What is the app's main daily loop?
Which screens matter most right now: onboarding, home, detail, create, empty state, paywall, or profile?
Should the app feel more calm, playful, premium, social, or focused?
```

Example gathered context:

```yaml
product:
  name: BloomTrack
  domain: Gentle habit tracking for personal routines
  users: Busy consumers who want motivation without pressure
  primary_loop: choose habit -> complete daily check-in -> see streak/progress -> plan next day
  emotional_target: encouraging, calm, quietly rewarding
  anti_references: gamified neon, guilt-heavy productivity, enterprise dashboard density
```

Update `DESIGN.md` if present:

- Product Definition and Core Use Cases
- Page Context > Consumer App Context
- Product Personality

---

## Step 2 - Generate 3 app experience directions

Each concept should vary more than color. Vary navigation feel, card rhythm, state strategy, motion, and typography.

| Concept | UIUX posture | Visual posture | Motion posture | Best for |
|---------|--------------|----------------|----------------|----------|
| A. Gentle Momentum | Calm bottom-tabs, daily cards, reassuring empty states | Warm neutrals, soft green accent, rounded cards | Fast tap feedback, soft sheet transition | Habit app with low-pressure motivation |
| B. Bright Ritual | More playful progress rings, achievement badges | Brighter accent pops, bolder icons, compact cards | Elastic micro-reward on completion | Users who want positive reinforcement |
| C. Quiet Focus | Minimal tab chrome, focus-first daily task | Cooler neutrals, type-led hierarchy, fewer illustrations | Subtle fade/slide, minimal celebration | Users who dislike gamification |

For every concept, define:

```yaml
concept:
  name: Gentle Momentum
  navigation_model: bottom_tabs
  primary_loop: track
  core_screens: [onboarding, home, habit_detail, create_habit, empty_state]
  state_strategy: reassuring_empty_state + preserved_work_error
  tactile_interaction: 100ms tap scale, 240ms bottom sheet, reduced-motion fade
  typography_posture: warm readable mobile sans
  asset_posture: onboarding + empty state + achievement badge, no full-bleed hero
```

---

## Step 3 - Generate standalone app previews

Artifact folder (standalone, not in the user's project yet):

```text
./artifacts/bloomtrack-consumer-app/
├── concept-a-gentle-momentum.html
├── concept-b-bright-ritual.html
├── concept-c-quiet-focus.html
├── mood-board-gentle-momentum.html
├── app-state-matrix-gentle-momentum.md
├── design-assets.manifest.json
└── design-assets/
    ├── empty-state-gentle-momentum-v1.webp
    ├── onboarding-gentle-momentum-v1.webp
    └── badge-streak-gentle-momentum-v1.webp
```

### Required preview modules

Each Consumer app preview must include:

1. Mobile app viewport with safe-area spacing
2. Bottom tab bar with selected, inactive, and badge states
3. Home / daily loop screen with habit cards
4. Habit detail or create-habit bottom sheet
5. Empty, loading, error, permission, or offline state
6. Primary CTA plus pressed, disabled, and loading states
7. Motion demo for tap feedback, tab switch, card expansion, or sheet transition
8. Reduced-motion behavior

### Preview skeleton

```html
<main class="app-frame" data-concept="gentle-momentum">
  <section class="screen home-screen">
    <header class="screen-header">
      <p class="eyebrow">Today</p>
      <h1>Build one gentle routine</h1>
    </header>

    <button class="habit-card is-complete" type="button">
      <span class="habit-title">Morning stretch</span>
      <span class="habit-status">Done</span>
    </button>

    <button class="primary-action" type="button">Add habit</button>
  </section>

  <section class="bottom-sheet" aria-label="Habit detail">
    <h2>Evening walk</h2>
    <p>Keep it light. A 10 minute walk counts.</p>
    <button class="primary-action" type="button">Mark done</button>
  </section>

  <nav class="tab-bar" aria-label="Main navigation">
    <button class="tab is-selected" type="button">Today</button>
    <button class="tab" type="button">Progress</button>
    <button class="tab" type="button">Profile</button>
  </nav>
</main>
```

The preview can use inline CSS, but it must not depend on the user's app repo.

---

## Step 4 - State matrix

Formalize the state matrix before applying the design:

| Component / screen | Loading | Empty | Error | Offline | Success |
|--------------------|---------|-------|-------|---------|---------|
| Home / daily loop | Skeleton habit cards preserve layout | Empty-state illustration + "Add your first habit" CTA | Inline retry, no lost data | Show cached habits + offline badge | Short completion confirmation |
| Habit detail | Sheet skeleton with title row | Not applicable | Keep sheet open, show retry | Disable sync-only actions | Mark complete and return focus |
| Create habit | Field skeleton only if templates load | Blank form with examples | Preserve typed values | Allow local draft | Confirm creation, show next step |

Record this in the design system output under **Consumer App System**.

---

## Step 5 - Visual assets for the app

Use [VISUAL-ASSET-GENERATION.md](../../references/VISUAL-ASSET-GENERATION.md), but follow Consumer app placement rules:

| Asset | Role | Placement | Constraint |
|-------|------|-----------|------------|
| `empty-state-gentle-momentum-v1` | `empty_state` | Empty home screen | 120-240px in app UI; one CTA remains dominant |
| `onboarding-gentle-momentum-v1` | `onboarding` | First-run panel | One idea per panel; no text baked into image |
| `badge-streak-gentle-momentum-v1` | `icon_illustrated` | Achievement card | Not used in tab bar or toolbar |

Do not generate a full-bleed hero for the app screen. UI chrome icons remain vector and come from the locked library or custom SVG strategy.

Example asset context:

```yaml
asset:
  role: empty_state
  aspect_ratio: "1:1"
  target_width_px: 512
  placement_slot: empty_home
  purpose: reassure_empty_state
  must_avoid: [text_in_image, navigation_icon, toolbar_icon, busy_background]
```

---

## Step 6 - User chooses a direction

User: "Use Gentle Momentum. Keep the bottom tabs, but make the completion badge a little more playful."

Agent actions:

1. Merge the selected adjustment into Concept A.
2. Regenerate only the badge asset or update the custom SVG badge if it is vector.
3. Formalize the design system using [design-system-template.md](../design-system-template.md).
4. Populate:
   - Page Type Summary
   - Consumer App System
   - State Matrix
   - Icon System
   - Visual Assets
   - Motion System
5. Generate a standalone design-system preview for the final direction.

---

## Step 7 - Apply to project

User: "Apply Gentle Momentum to my React Native app."

Agent actions:

1. Confirm scope: tokens, navigation styling, app components, selected assets.
2. Audit project conventions:
   - framework: React Native / Expo / React web / Next.js / other
   - navigation: bottom tabs, stack routes, route files
   - styling: StyleSheet, NativeWind, CSS modules, Tailwind, design token file
   - icons: existing icon library and wrapper component
   - state handling: loading, offline, error, permission handling patterns
3. Apply tokens to real app components, not only global CSS.
4. Keep tab, toolbar, and input icons vector.
5. Copy only confirmed assets into the correct project asset directory.
6. Run mobile-first verification.

Example project asset destination:

```text
assets/
└── design-assets/
    ├── empty-state-gentle-momentum-v1.webp
    ├── onboarding-gentle-momentum-v1.webp
    └── badge-streak-gentle-momentum-v2.webp
design-assets.manifest.json
```

---

## Step 8 - Apply verification checklist

- [ ] Mobile viewport checked first
- [ ] Safe-area spacing respected
- [ ] Bottom tabs show selected, inactive, disabled, and badge states where relevant
- [ ] Tap targets meet platform expectations
- [ ] Primary action is reachable and visually dominant
- [ ] Home/main loop, detail/create flow, and one non-happy state are implemented or previewed
- [ ] State matrix covers loading, empty, error, offline, and success
- [ ] Pressed, disabled, loading, and selected component states exist
- [ ] Reduced-motion behavior preserves meaning
- [ ] UI chrome icons are vector and themeable
- [ ] Generated assets are used only in onboarding, empty states, achievements, badges, or share cards
- [ ] No full-bleed marketing hero is inserted into the app screen unless explicitly requested
- [ ] `DESIGN.md` records Consumer App Context, Icon System, Visual Assets, and Design Decisions Log

---

## Common mistakes this E2E prevents

- Stopping at one pretty mobile card
- Forgetting bottom tab selected and badge states
- Using generated raster icons for navigation
- Ignoring loading, empty, error, offline, or permission states
- Making app typography look like a landing hero
- Applying tokens globally without touching actual app flows
- Letting illustrations compete with the user's primary task
