# Focus Ring

Visible keyboard focus without adding visual noise for mouse users. Accessibility baseline.

## Intent

Make keyboard focus visible to assistive technology users without distracting mouse users with a constantly-on outline.

## When to use

- Every interactive element (button, link, input, select, textarea)
- Every element with `tabindex="0"` or natural tab order
- Modal dialogs (focus the dialog on open; restore focus to the trigger on close)

## When NOT to use

- Never on `:focus` (always-on for mouse users)
- Never removed to "clean up the design" — focus is a legal accessibility requirement (WCAG 2.4.7)

## Bindings

| Property | Token | Value |
|---|---|---|
| Duration (in) | — | 0ms (instant appear) |
| Duration (out) | `--duration-fast` | 80ms retract |
| Easing | `--ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Distance | `--motion-distance-sm` | 2px outline offset |

## Web recipe

```css
.focusable {
  --duration-fast: 120ms;
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  outline: 2px solid transparent;
  outline-offset: 2px;
  transition: outline-color var(--duration-fast) var(--ease-default),
              outline-offset var(--duration-fast) var(--ease-default);
}
.focusable:focus-visible {
  outline-color: var(--color-focus, #4d9aff);
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .focusable, .focusable:focus-visible {
    transition: none;
    outline-offset: 2px;
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
    --color-focus: #4d9aff;
    --color-danger: #cf222e;
  }
  body { margin: 0; padding: 40px; background: #0e0e0e; color: #eee;
         font: 14px system-ui; display: grid; gap: 16px; max-width: 480px; }
  button {
    padding: 12px 20px; border-radius: 12px; border: 0;
    background: #2a2a2a; color: #eee; font: 14px system-ui; cursor: pointer;
    outline: 2px solid transparent;
    outline-offset: 2px;
    transition: outline-color var(--duration-fast) var(--ease-default),
                outline-offset var(--duration-fast) var(--ease-default);
  }
  button:focus-visible { outline-color: var(--color-focus); }
  button.invalid:focus-visible { outline-color: var(--color-danger); }
  input {
    padding: 10px 12px; border-radius: 8px; border: 1px solid #444;
    background: #1a1a1a; color: #eee; font: 14px system-ui;
    outline: 2px solid transparent;
    outline-offset: 2px;
    transition: outline-color var(--duration-fast) var(--ease-default);
  }
  input:focus-visible { outline-color: var(--color-focus); border-color: transparent; }
  .hint { color: #888; font: 12px system-ui; }
  @media (prefers-reduced-motion: reduce) {
    button, input, button:focus-visible, input:focus-visible {
      transition: none;
    }
  }
</style>
</head>
<body>
  <button id="b1">Primary</button>
  <button id="b2" class="invalid">Invalid</button>
  <input id="i1" placeholder="Text input" />
  <div class="hint">Tab through these — only :focus-visible fires the ring.</div>
</body>
</html>
```

## Mobile-web recipe

Same CSS. Touch users do not normally trigger `:focus-visible`, but switch control, external keyboards, and screen-reader navigation do — keep the ring available.

## Mobile-native-aspirational pointer recipe

Larger ring on first focus inside a modal. Optional haptic on focus for users with screen readers (not for sighted users).

## Reduced-motion fallback

Static outline, no retract transition. Outline still appears and disappears (it is a state, not motion).

## Common mistakes

- **Using `:focus` instead of `:focus-visible`** — fires on every mouse click and clutters the UI
- **Outline color matches background** — invisible focus ring
- **Outline removed entirely** — accessibility failure (WCAG 2.4.7)
- **Focus not trapped inside modal** — keyboard users escape the modal without dismissing it (see modal-dialog.md)
- **Focus not restored to trigger element on modal close** — focus is lost, frustrating for keyboard users
- **No error ring for invalid inputs** — color-only errors are missed by color-blind users; pair with an icon or copy