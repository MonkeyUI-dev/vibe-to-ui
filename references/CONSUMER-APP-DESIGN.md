# Consumer App Design Guide

## Overview

Consumer app surfaces deserve their own workflow. They are not lighter dashboards and they are not miniature landing pages. A consumer app must earn trust quickly, feel good in the hand, explain itself through states, and keep the next action obvious without flattening the product's personality.

Use this guide whenever Stage 0 classifies the target as **Consumer app surface**, or when the user mentions mobile app, consumer app, social app, creator app, wellness app, shopping app, finance app, education app, habit app, community app, or a C-end product experience.

For a complete walkthrough, see [consumer-app-e2e.md](../assets/examples/consumer-app-e2e.md).

## What Makes Consumer App UIUX Different

Consumer apps optimize for a mix of:

- **First-glance comprehension**: the user should understand where they are and what to do next within seconds
- **Tactile confidence**: buttons, tabs, sheets, and cards should feel responsive and physically coherent
- **Emotional memory**: visual tone, iconography, empty states, and microcopy create a reason to return
- **Habit loops**: repeated flows need speed, reward, and low cognitive load
- **State completeness**: loading, empty, error, permission, offline, success, and partial-data states are part of the product, not afterthoughts
- **Small-screen hierarchy**: every screen needs a clear primary action and restrained secondary actions

B-end surfaces primarily protect accuracy and repeated operational speed. Consumer app surfaces must protect usability while also carrying brand feeling, delight, and motivation.

## Stage 0 Additions

When classifying a Consumer app surface, add these fields to the page type summary:

```yaml
consumer_app:
  platform: mobile_app | responsive_web_app | tablet_app | unknown
  lifecycle_stage: acquisition | onboarding | activation | daily_use | retention | monetization
  primary_loop: browse | create | track | learn | transact | socialize | manage
  navigation_model: bottom_tabs | top_tabs | stack_navigation | feed_first | hub_and_detail | unknown
  gesture_model: tap_first | swipe_cards | pull_to_refresh | drag_reorder | camera_capture | mixed
  state_risk: low | medium | high
```

Use these fields to decide which modules, states, and motion previews the artifact must include.

## Core Screen Archetypes

Consumer app work should cover at least the relevant subset of these screens:

| Screen | Role | UIUX requirement |
|--------|------|------------------|
| Home / feed | Re-entry and discovery | Fast scanning, clear continuation point, strong content cards |
| Detail | Decision and confidence | Clear title, visual hierarchy, persistent or obvious primary action |
| Create / input | Contribution or task completion | Low-friction fields, progressive disclosure, helpful validation |
| Onboarding | Activation | Explain value quickly, ask permissions only when contextual |
| Empty state | Recovery and motivation | Reassure, explain why empty, give one next action |
| Loading / skeleton | Perceived performance | Preserve layout, avoid jumpy content shifts |
| Error / offline | Trust repair | Plain explanation, retry path, preserve user work when possible |
| Profile / settings | Identity and control | Clear ownership, privacy, account, notification controls |
| Paywall / upgrade | Monetization | Transparent value, readable pricing, no deceptive hierarchy |

Do not make a consumer app preview that only shows a decorative hero and one card. At minimum, show navigation, one main content pattern, one action flow or detail state, and one non-happy state.

## Navigation And IA

Consumer app navigation should be designed around the user's mental model:

- Use **bottom tabs** for 3-5 top-level destinations used repeatedly.
- Use **stack navigation** for drill-down detail flows.
- Use **top tabs or segmented controls** only for peer-level filters inside one screen.
- Keep global actions stable; avoid moving the main CTA between unrelated positions.
- Make the selected state visually stronger than hover-like styling. Mobile has no hover.
- Treat notification badges, unread counts, and progress indicators as semantic state, not decoration.

If the product has more than five primary destinations, group them into a hub, profile/settings, or contextual entry points instead of adding more tabs.

## Interaction And Motion

Consumer app motion should feel tactile and fast:

| Pattern | Default guidance |
|---------|------------------|
| Tap feedback | 80-140ms scale, tint, or opacity change |
| Screen transition | 180-280ms slide/fade with clear direction |
| Bottom sheet | 220-320ms, spring-like but controlled |
| Card expansion | 180-260ms shared-origin feel |
| Pull to refresh | Lightweight progress and clear completion |
| Success feedback | Short confirmation, then return focus to the next useful action |
| Error feedback | Avoid violent shake by default; use inline correction and calm emphasis |

Motion must support causality: the user should understand what changed because of their action. Always include reduced-motion behavior that keeps state changes visible without transform-heavy animation.

## Visual And Component Standards

Consumer app UI should usually favor:

- **Readable but expressive typography**: compact enough for mobile, distinctive enough for brand memory
- **Card systems with clear affordance**: distinguish tappable cards from static panels
- **Soft hierarchy**: fewer borders than B-end, but stronger content grouping than editorial pages
- **Thumb-aware actions**: primary actions should be reachable and not fight with system gestures
- **Friendly iconography**: selected tab and key action icons may use solid or duotone treatment; operational controls stay crisp and vector
- **Stateful components**: every button, tab, card, input, and sheet needs pressed, disabled, loading, error, and selected states where relevant

Avoid pure marketing-page treatments for real app screens. Brand expression belongs in navigation polish, content rhythm, illustrations, onboarding, and empty states rather than oversized hero drama.

## Visual Assets For Consumer Apps

Consumer app assets should have jobs inside the product:

| Asset role | Best slots | Guidance |
|------------|------------|----------|
| `empty_state` | Empty feed, no results, first saved item | 120-240px in app UI; larger only for onboarding |
| `onboarding` | Activation cards, first-run carousel | 4:3 or 1:1; one idea per panel |
| `mascot_prop` | Habit, wellness, education, community | Use sparingly; never block the task |
| `icon_illustrated` | Feature education, achievements, badges | Keep separate from tab/nav icons |
| `social_object` | Share cards, referral, launch moments | Strong silhouette, no tiny UI role |

For Consumer app surfaces, do not generate full-bleed hero imagery by default unless the app has a marketing landing screen. Prefer in-product assets: onboarding, empty states, badges, achievement moments, and share cards.

## Preview Artifact Requirements

When Consumer app is the primary page type, standalone concept and design-system previews must show a realistic app surface. Include:

1. Device or app-frame viewport with realistic safe-area spacing
2. Bottom tab bar or the chosen navigation model
3. Home/feed or main task screen
4. Detail, bottom sheet, or create/input flow
5. Empty, loading, error, permission, or offline state
6. Primary CTA and secondary actions with pressed/disabled/loading states
7. Motion demo for tap feedback, sheet transition, tab switch, or card expansion
8. Notes on platform assumptions: iOS, Android, responsive web app, or unknown

If the app is responsive web rather than native mobile, show both narrow mobile and wider layout behavior.

## Design System Output Additions

For Consumer app systems, add this block to the design-system deliverable:

```yaml
consumer_app_system:
  platform_assumption: mobile_app
  navigation_model: bottom_tabs
  primary_loop: track
  core_screens: [home, detail, create, empty_state]
  state_matrix: [loading, empty, error, offline, success]
  gesture_rules: [tap_feedback, pull_to_refresh]
  thumb_zone_notes: "Primary action stays in lower comfortable zone; destructive actions require confirmation."
  monetization_notes: "Only if relevant; no deceptive hierarchy."
```

Also include a state matrix:

| Component / screen | Loading | Empty | Error | Offline | Success |
|--------------------|---------|-------|-------|---------|---------|
| Home / feed | [behavior] | [behavior] | [behavior] | [behavior] | [behavior] |
| Detail | [behavior] | [behavior] | [behavior] | [behavior] | [behavior] |
| Create / input | [behavior] | [behavior] | [behavior] | [behavior] | [behavior] |

## Apply Guidance

When applying a Consumer app design to a project:

1. Audit the target framework and platform assumptions before writing tokens.
2. Identify existing navigation, route, and state-management conventions.
3. Apply tokens to real app components, not only global CSS.
4. Verify mobile viewport first, then wider responsive states if relevant.
5. Check tap targets, text wrapping, safe-area spacing, keyboard/input behavior, and non-happy states.
6. Keep UI chrome icons vector and themeable; deploy generated assets only to approved expressive slots.

## Common Failure Modes

- Treating the app like a landing page with too much hero drama
- Showing only happy-path cards and no empty/error/loading states
- Using hover-dependent UI on mobile
- Making tab icons decorative but unclear
- Adding large illustrations that compete with the task
- Forgetting disabled, loading, pressed, selected, and permission states
- Over-animating transitions until the app feels slow
- Hiding monetization or destructive actions behind misleading hierarchy

The goal is not just a pretty screen. The goal is a product surface that feels clear, alive, trustworthy, and worth returning to.
