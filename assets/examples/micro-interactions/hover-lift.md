# Hover Lift (web only)

Hint that an element is interactive and preview the press depth. Web only.

## Intent

Show the user that an element responds to interaction. Subtle translateY plus shadow elevation gives a "lift" feel.

## When to use

- Web interactive surfaces (cards, list rows, buttons in marketing pages)
- Anywhere mouse users need a hint of interactivity

## When NOT to use

- Touch-primary screens — `:hover` does not work on touch; the lift will appear after the user releases, looking broken
- Inside form inputs or critical actions (use tap-feedback + focus-ring instead)
- On elements that already have a `:hover` reveal (avoid double motion)

## Bindings

| Property | Token | Value |
|---|---|---|
| Duration | `--duration-fast` | 120–180ms |
| Easing | `--ease-default` | Calm |
| Distance | `--motion-distance-sm` | -2 to -4px translateY + shadow elevation |

## Web recipe

```css
.liftable {
  --duration-fast: 120ms;
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --motion-distance-sm: 8px;
  transition: transform var(--duration-fast) var(--ease-default),
              box-shadow var(--duration-fast) var(--ease-default);
}
@media (hover: hover) and (pointer: fine) {
  .liftable:hover {
    transform: translateY(calc(var(--motion-distance-sm) * -0.5));
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
}
@media (prefers-reduced-motion: reduce) {
  .liftable, .liftable:hover {
    transition: opacity 80ms linear;
    transform: none;
  }
  @media (hover: hover) and (pointer: fine) {
    .liftable:hover { background-color: rgba(255, 255, 255, 0.06); }
  }
}
```

## Demo

```html
<!doctype html>
<html><head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  :root {
    --duration-fast: 120ms;
    --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
    --motion-distance-sm: 8px;
  }
  body { margin: 0; padding: 40px; background: #0e0e0e; color: #eee;
         font: 14px system-ui; display: grid; gap: 16px; max-width: 480px; }
  .liftable {
    padding: 16px; background: #1a1a1a; border-radius: 12px;
    cursor: pointer; user-select: none;
    transition: transform var(--duration-fast) var(--ease-default),
                box-shadow var(--duration-fast) var(--ease-default);
  }
  @media (hover: hover) and (pointer: fine) {
    .liftable:hover {
      transform: translateY(calc(var(--motion-distance-sm) * -0.5));
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    }
  }
  .hint { color: #888; font: 12px system-ui; }
  @media (prefers-reduced-motion: reduce) {
    .liftable, .liftable:hover {
      transition: background-color 80ms linear;
      transform: none;
    }
    @media (hover: hover) and (pointer: fine) {
      .liftable:hover { background-color: #222; }
    }
  }
</style>
</head>
<body>
  <div class="liftable">Hover me — desktop only</div>
  <div class="liftable">Hover me too</div>
  <div class="hint">No hover effect on touch devices.</div>
</body>
</html>
```

## Mobile-web recipe

**Skip entirely.** Touch users get tap-feedback (`tap-feedback.md`); hover-lift on touch causes the card to "stick" after release and looks broken. Use `@media (hover: hover) and (pointer: fine)` to scope hover styles to devices that have hover — this is the gate that makes hover-lift safe.

## Mobile-native-aspirational pointer recipe

Skip unless the device is a 2-in-1 with explicit hover mode (e.g. iPad with Magic Keyboard, Surface Pro). The same `@media (hover: hover) and (pointer: fine)` gate applies. Do not generate native code in v0.7.0 — reference only.

## Reduced-motion fallback

Replace translateY with opacity-only shadow change (or background-color change). Lift disappears under reduce-motion.

## Anti-pattern callout

- **Hover-lift on touch-only screens** — the lift appears after the user releases the tap, looking broken. Always scope with `@media (hover: hover) and (pointer: fine)`.
- **Hover-lift on critical actions** — pair with tap-feedback; hover is a hint, tap is the action.
- **Hover-lift on form inputs** — input hover has different semantics (focus, not hover); use focus-ring.
- **Hover-lift + tap-feedback both translating** — pick one direction; tap compresses down, hover lifts up — they can coexist if they target different properties (translateY for hover, scale for tap).
- **Lift translation larger than 8px** — feels floaty and disconnects from the surface.

## Common mistakes

- **Hover styles defined outside `@media (hover: hover)`** — fires on touch; card sticks after release
- **Lift combined with a transform on focus** — transform compounds; use a separate property for focus (outline, not transform)
- **No transition on the hover state** — instant snap from rest to lifted feels janky
- **Hover defined but never tested on a touch device** — always emulate mobile in Chrome DevTools before shipping
- **Hover-lift used as the only feedback** — no tap-feedback; keyboard users get nothing