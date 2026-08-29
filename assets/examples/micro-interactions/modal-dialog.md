# Modal / Dialog

Block interaction to require a decision. Preserves background for context.

## Intent

Force a decision the user cannot defer. Used for destructive confirmations, blocking errors, multi-step wizards, and important first-time disclosures.

## When to use

- Destructive actions (delete account, discard unsaved changes)
- Blocking errors (auth expired, payment failed)
- Multi-step wizards (onboarding, checkout)
- Important first-time disclosures (cookie consent, terms update)

## When NOT to use

- Non-blocking notifications (use toast-snackbar.md)
- Long-form content the user wants to read independently (use a navigation transition)
- Forms that could be inline (inline is always preferred over modal)

## Bindings

| Property | Token | Value |
|---|---|---|
| Duration | `--duration-normal` | 200–280ms |
| Easing | `--ease-default` | Calm |
| Distance | `--motion-distance-md` | 12–24px (scale 0.96 → 1.0) |

## Web recipe

```css
.modal-overlay {
  --duration-normal: 240ms;
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --motion-distance-md: 16px;
  position: fixed; inset: 0;
  background: rgba(0, 0, 0, 0);
  display: flex; align-items: center; justify-content: center;
  transition: background-color var(--duration-normal) var(--ease-default);
}
.modal-overlay.is-open { background: rgba(0, 0, 0, 0.5); }
.modal {
  background: #1a1a1a; color: #eee;
  border-radius: 16px; padding: 24px;
  width: min(420px, calc(100% - 32px));
  transform: scale(0.96);
  opacity: 0;
  transition: transform var(--duration-normal) var(--ease-default),
              opacity var(--duration-normal) var(--ease-default);
}
.modal-overlay.is-open .modal { transform: scale(1); opacity: 1; }
@media (prefers-reduced-motion: reduce) {
  .modal-overlay, .modal,
  .modal-overlay.is-open, .modal-overlay.is-open .modal {
    transition: opacity 160ms linear;
    transform: none;
  }
  .modal-overlay:not(.is-open) .modal { opacity: 0; }
}
```

## Demo

```html
<!doctype html>
<html><head>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<style>
  :root {
    --duration-normal: 240ms;
    --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
    --motion-distance-md: 16px;
  }
  body { margin: 0; padding: 40px; background: #0e0e0e; color: #eee;
         font: 14px system-ui; }
  button { padding: 12px 20px; background: #2a2a2a; color: #eee;
    border: 0; border-radius: 12px; font: 14px system-ui; cursor: pointer;
    touch-action: manipulation; }
  button.danger { background: #cf222e; }
  .overlay {
    position: fixed; inset: 0; background: rgba(0, 0, 0, 0);
    display: flex; align-items: center; justify-content: center;
    transition: background-color var(--duration-normal) var(--ease-default);
    pointer-events: none;
  }
  .overlay.is-open { background: rgba(0, 0, 0, 0.5); pointer-events: auto; }
  .dialog {
    background: #1a1a1a; color: #eee;
    border-radius: 16px; padding: 24px;
    width: min(420px, calc(100% - 32px));
    transform: scale(0.96); opacity: 0;
    transition: transform var(--duration-normal) var(--ease-default),
                opacity var(--duration-normal) var(--ease-default);
  }
  .overlay.is-open .dialog { transform: scale(1); opacity: 1; }
  h2 { margin: 0 0 8px; font-size: 18px; }
  p { margin: 0 0 16px; color: #aaa; }
  .actions { display: flex; gap: 8px; justify-content: flex-end; }
  @media (prefers-reduced-motion: reduce) {
    .overlay, .dialog, .overlay.is-open, .overlay.is-open .dialog {
      transition: opacity 160ms linear;
      transform: none;
    }
    .overlay:not(.is-open) .dialog { opacity: 0; }
  }
</style>
</head>
<body>
  <button id="open">Delete account</button>
  <div class="overlay" id="overlay">
    <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="title">
      <h2 id="title">Delete account?</h2>
      <p>This action is permanent and cannot be undone.</p>
      <div class="actions">
        <button id="cancel">Cancel</button>
        <button class="danger" id="confirm">Delete</button>
      </div>
    </div>
  </div>
<script>
  const overlay = document.getElementById('overlay');
  document.getElementById('open').addEventListener('click', () => overlay.classList.add('is-open'));
  document.getElementById('cancel').addEventListener('click', () => overlay.classList.remove('is-open'));
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('is-open'); });
</script>
</body>
</html>
```

## Mobile-web recipe

Full-bleed slide-up on small viewports (≤ 480px); safe-area padding on all sides. Bottom padding = `max(env(safe-area-inset-bottom, 0px), 16px)`. Drag handle at top to allow swipe-down dismiss.

```css
@media (max-width: 480px) {
  .dialog {
    width: 100%; height: auto; max-height: 90dvh;
    border-radius: 16px 16px 0 0;
    align-self: flex-end;
    transform: translateY(100%);
  }
  .overlay.is-open .dialog { transform: translateY(0); }
}
```

## Mobile-native-aspirational pointer recipe

Native modal (iOS `UIViewController` modal / Android `DialogFragment`). Haptic on open. Do not generate native code in v0.7.0 — reference only.

## Reduced-motion fallback

Instant show + backdrop fade. Focus trap still required.

## Common mistakes

- **No focus trap** — keyboard users escape the modal without dismissing it
- **Focus not restored to trigger on close** — focus is lost
- **Backdrop tap dismisses a destructive dialog** — destructive modals require explicit close
- **Modal wider than viewport on mobile** — full-bleed slide-up instead
- **Modal too tall to scroll** — cap at 90dvh with internal `overflow-y: auto`
- **Animation longer than 280ms** — feels heavy for what is essentially a "show/hide"
- **`role="dialog"` without `aria-modal="true"`** — screen readers do not know to ignore background