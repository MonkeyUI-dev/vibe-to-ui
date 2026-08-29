# Tap Feedback

The canonical micro-interaction. Every pressable surface — button, link, card, list row, tab, icon button — must react to a tap within one frame of contact. This file is the **canonical reference** for the whole library; every other pattern references the tap-feedback recipe for its press-handling.

## Intent

Confirm the system received the tap before the action runs. Never delay the action for the animation.

## When to use

- Every pressable surface
- Press confirmation before a navigation, mutation, or API call
- Anywhere a user might wonder "did it register?"

## When NOT to use

- Static display elements (text, images, dividers)
- Disabled controls (no feedback when not actionable)
- Pure reveal interactions better served by a long-press menu (see MOBILE-GESTURES.md § long-press)

## Bindings

| Property | Token | Value |
|---|---|---|
| Duration | `--duration-fast` | 120ms |
| Easing | `--ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Distance | `--motion-distance-sm` | scale 0.97, no translate |

## Web recipe

```css
.pressable {
  --duration-fast: 120ms;
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  transition: transform var(--duration-fast) var(--ease-default),
              background-color var(--duration-fast) var(--ease-default);
  touch-action: manipulation;
}
.pressable:active {
  transform: scale(0.97);
  background-color: rgba(0, 0, 0, 0.06);
}
@media (prefers-reduced-motion: reduce) {
  .pressable, .pressable:active {
    transition: background-color 80ms linear;
    transform: none;
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
  button, a {
    padding: 12px 20px; border-radius: 12px; border: 0;
    background: #2a2a2a; color: #eee; font: 14px system-ui;
    cursor: pointer; user-select: none;
    touch-action: manipulation;
    transition: transform var(--duration-fast) var(--ease-default),
                background-color var(--duration-fast) var(--ease-default);
  }
  a { display: inline-block; text-decoration: none; text-align: center; }
  button:active, a:active {
    transform: scale(0.97);
    background-color: rgba(255, 255, 255, 0.12);
  }
  .log { font: 12px ui-monospace, monospace; color: #888; min-height: 18px; }
  @media (prefers-reduced-motion: reduce) {
    button, a, button:active, a:active {
      transition: background-color 80ms linear;
      transform: none;
    }
  }
</style>
</head>
<body>
  <button id="btn">Tap me</button>
  <a href="#" role="button" id="link">Inline link styled as button</a>
  <div class="log" id="log">Awaiting tap…</div>
<script>
  const log = document.getElementById('log');
  let n = 0;
  ['btn', 'link'].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('pointerdown', () => log.textContent = `tap ${++n}: pointerdown @ ${Date.now() % 100000}`);
    el.addEventListener('pointerup', () => log.textContent = `tap ${n}: pointerup @ ${Date.now() % 100000}`);
  });
</script>
</body>
</html>
```

## Mobile-web recipe

Same CSS. Key additions:

```html
<button class="pressable" style="touch-action: manipulation;">Tap</button>
```

- `touch-action: manipulation` — suppresses 300ms double-tap delay on older mobile browsers
- Tap targets must be ≥ 44×44 CSS pixels (Apple HIG) / 48×48 (Material)
- Use `pointerdown` for instant feedback (do not wait for `click`)

```js
el.addEventListener('pointerdown', () => el.classList.add('is-pressed'));
el.addEventListener('pointerup', () => el.classList.remove('is-pressed'));
el.addEventListener('pointercancel', () => el.classList.remove('is-pressed'));
el.addEventListener('pointerleave', () => el.classList.remove('is-pressed'));
```

## Mobile-native-aspirational pointer recipe

Same pointer mechanics. Add a soft haptic on `pointerdown` if the platform exposes native haptics (iOS `UIImpactFeedbackGenerator(style: .light)` / Android `VibrationEffect` with `EFFECT_TICK`). Do not generate native code in v0.7.0 — reference only.

## Reduced-motion fallback

Drop the scale. Change only `background-color` (or border). Action remains instant. Never substitute a "tiny scale" — it still violates the user's preference.

## Common mistakes

- **Scale below 0.95** — looks broken, not pressed
- **Long-press treated as a single tap** — `pointerdown` should still fire tap-feedback; long-press menu is a separate gesture (see MOBILE-GESTURES.md § long-press)
- **Animation runs longer than the action** — press → state change must complete in ≤ 200ms; if the animation runs longer, cut it
- **No haptic on commit (mobile)** — tap registers visually but the device gives no physical confirmation
- **Disabled control still animates** — disabled controls should have no feedback; remove the `:active` rule or scope it under `:not(:disabled)`