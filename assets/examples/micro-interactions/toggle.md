# Toggle / Switch / Checkbox / Radio

A single file covers switch + checkbox + radio via `data-variant`. The recipes are nearly identical — only the geometry differs.

## Intent

Confirm current binary / single-choice state and commit the next state on tap.

## When to use

- **Switch (`data-variant="switch"`)** — on/off, takes effect immediately (no Save button)
- **Checkbox (`data-variant="checkbox"`)** — multi-choice (zero, one, or many of N)
- **Radio (`data-variant="radio"`)** — single-choice (exactly one of N)

## When NOT to use

- Switch for actions that need confirmation (use a button + dialog)
- Checkbox for mutually exclusive choices (use radio)
- Radio for ≤ 2 choices where a single switch is clearer

## Bindings

| Property | Token | Value |
|---|---|---|
| Duration | `--duration-fast` | 180ms thumb slide |
| Easing | thumb `--ease-default`, track `--ease-out` | Calm / out |
| Distance | `--motion-distance-md` | 16–24px thumb translate |

## Web recipe

```css
.control {
  --duration-fast: 120ms;
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --motion-distance-md: 16px;
  position: relative; display: inline-block;
  min-width: 44px; min-height: 24px;
}
.control[data-variant="switch"] .track,
.control[data-variant="checkbox"] .box,
.control[data-variant="radio"] .outer {
  transition: background-color var(--duration-fast) var(--ease-out),
              border-color var(--duration-fast) var(--ease-out);
}
.control[data-variant="switch"] .thumb {
  transition: transform var(--duration-fast) var(--ease-default);
}
.control[data-variant="checkbox"] .check,
.control[data-variant="radio"] .inner {
  transform: scale(0);
  transition: transform var(--duration-fast) var(--ease-default);
}
.control[aria-checked="true"][data-variant="switch"] .thumb {
  transform: translateX(var(--motion-distance-md));
}
.control[aria-checked="true"][data-variant="checkbox"] .check,
.control[aria-checked="true"][data-variant="radio"] .inner {
  transform: scale(1);
}
@media (prefers-reduced-motion: reduce) {
  .control *, .control[aria-checked="true"] * {
    transition: background-color 80ms linear;
    transform: none !important;
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
    --ease-out: cubic-bezier(0, 0, 0.2, 1);
    --motion-distance-md: 16px;
    --color-primary: #4d9aff;
    --color-neutral: #444;
    --color-success: #2ea44f;
  }
  body { margin: 0; padding: 40px; background: #0e0e0e; color: #eee;
         font: 14px system-ui; display: grid; gap: 24px; max-width: 480px; }
  .row { display: flex; align-items: center; gap: 16px; }
  /* switch */
  .switch { position: relative; width: 44px; height: 24px;
    background: var(--color-neutral); border-radius: 12px;
    transition: background-color var(--duration-fast) var(--ease-out);
    cursor: pointer; user-select: none; touch-action: manipulation; }
  .switch .thumb {
    position: absolute; top: 2px; left: 2px; width: 20px; height: 20px;
    background: #fff; border-radius: 50%;
    transition: transform var(--duration-fast) var(--ease-default);
  }
  .switch[aria-checked="true"] { background: var(--color-success); }
  .switch[aria-checked="true"] .thumb { transform: translateX(var(--motion-distance-md)); }
  /* checkbox */
  .checkbox { position: relative; width: 22px; height: 22px;
    background: transparent; border: 2px solid var(--color-neutral);
    border-radius: 4px;
    transition: background-color var(--duration-fast) var(--ease-out),
                border-color var(--duration-fast) var(--ease-out);
    cursor: pointer; }
  .checkbox[aria-checked="true"] { background: var(--color-primary); border-color: var(--color-primary); }
  .checkbox .check {
    position: absolute; top: 2px; left: 5px; width: 6px; height: 12px;
    border: solid #fff; border-width: 0 2px 2px 0;
    transform: scale(0) rotate(45deg); transform-origin: center;
    transition: transform var(--duration-fast) var(--ease-default);
  }
  .checkbox[aria-checked="true"] .check { transform: scale(1) rotate(45deg); }
  /* radio */
  .radio { position: relative; width: 22px; height: 22px;
    background: transparent; border: 2px solid var(--color-neutral);
    border-radius: 50%;
    transition: border-color var(--duration-fast) var(--ease-out);
    cursor: pointer; }
  .radio[aria-checked="true"] { border-color: var(--color-primary); }
  .radio .inner {
    position: absolute; top: 4px; left: 4px; width: 10px; height: 10px;
    background: var(--color-primary); border-radius: 50%;
    transform: scale(0);
    transition: transform var(--duration-fast) var(--ease-default);
  }
  .radio[aria-checked="true"] .inner { transform: scale(1); }
  @media (prefers-reduced-motion: reduce) {
    .switch, .switch .thumb, .checkbox, .checkbox .check, .radio, .radio .inner {
      transition: background-color 80ms linear, border-color 80ms linear;
      transform: none !important;
    }
    .checkbox[aria-checked="true"] .check { transform: rotate(45deg); }
  }
</style>
</head>
<body>
  <div class="row">
    <span class="switch" role="switch" aria-checked="false" data-variant="switch" id="sw"></span>
    <label for="sw">Notifications</label>
  </div>
  <div class="row">
    <span class="checkbox" role="checkbox" aria-checked="false" data-variant="checkbox" id="cb"></span>
    <label for="cb">Remember me</label>
  </div>
  <div class="row">
    <span class="radio" role="radio" aria-checked="true" data-variant="radio" id="r1"></span>
    <label for="r1">Daily</label>
  </div>
  <div class="row">
    <span class="radio" role="radio" aria-checked="false" data-variant="radio" id="r2"></span>
    <label for="r2">Weekly</label>
  </div>
<script>
  // toggle handlers — pointerdown for instant feedback
  document.querySelectorAll('[role]').forEach(el => {
    const group = el.getAttribute('role') === 'radio' ? 'radio' : null;
    el.addEventListener('click', () => {
      if (group === 'radio') {
        document.querySelectorAll(`[role="radio"]`).forEach(r => r.setAttribute('aria-checked', 'false'));
        el.setAttribute('aria-checked', 'true');
      } else {
        const cur = el.getAttribute('aria-checked') === 'true';
        el.setAttribute('aria-checked', String(!cur));
      }
    });
  });
</script>
</body>
</html>
```

## Mobile-web recipe

Tap targets must be ≥ 44×44 CSS pixels (Apple HIG) / 48×48 (Material). Pair the visual element with a `<label>` so tapping the label triggers the same handler.

```html
<label class="row">
  <span class="switch" role="switch" aria-checked="false" id="sw"></span>
  <span>Notifications</span>
</label>
```

`touch-action: manipulation` to suppress 300ms double-tap delay.

## Mobile-native-aspirational pointer recipe

Trigger a selection haptic on commit (state-change, not on press). iOS `UISelectionFeedbackGenerator` / Android `HapticFeedbackConstants.CLOCK_TICK` or `CONTEXT_CLICK`. Do not generate native code in v0.7.0 — reference only.

## Reduced-motion fallback

No translate, no scale. Color-only flip. Optional: 80ms color crossfade.

## Common mistakes

- **Toggle animation runs in the wrong direction on RTL** — mirror the thumb slide for `dir="rtl"`
- **Tap target smaller than 44×44** — accessibility failure on mobile
- **Switch used for actions needing confirmation** — use a button + dialog
- **Indeterminate state looks identical to off** — use a small inner dash (see indeterminate variant)
- **No haptic on commit (mobile)** — user does not feel the state change