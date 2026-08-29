# Toast / Snackbar

Acknowledge a transient action without stealing focus. Auto-dismiss or swipe to dismiss.

## Intent

Confirm a save / send / undo-eligible action without interrupting the user's flow.

## When to use

- "Saved" / "Sent" / "Deleted" confirmations
- Undo affordances (delete → "Undo" within 5 seconds)
- Network status changes (offline → online)
- Non-blocking errors (background sync failed; retry available)

## When NOT to use

- Errors that block the user from continuing (use a modal)
- Critical warnings (use a persistent banner)
- Long messages (truncate or link to detail)

## Bindings

| Property | Token | Value |
|---|---|---|
| Duration (enter) | `--duration-normal` | 240ms |
| Duration (hold) | — | 4–6 seconds |
| Duration (exit) | `--duration-fast` | 160ms |
| Easing | `--ease-out` enter, `--ease-in` exit | Calm-out / Calm-in |
| Distance | `--motion-distance-md` | 12–24px translateY |

## Web recipe

```css
.toast {
  --duration-normal: 240ms;
  --duration-fast: 120ms;
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --motion-distance-md: 16px;
  position: fixed; left: 50%; bottom: 24px; transform: translate(-50%, 100%);
  background: #222; color: #eee; padding: 12px 16px; border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  transition: transform var(--duration-normal) var(--ease-out);
  z-index: 1000;
}
.toast.is-visible { transform: translate(-50%, 0); }
.toast.is-leaving { transition: transform var(--duration-fast) var(--ease-in); transform: translate(-50%, 100%); }
@media (prefers-reduced-motion: reduce) {
  .toast, .toast.is-visible, .toast.is-leaving {
    transition: opacity 160ms linear;
    transform: translate(-50%, 0);
  }
  .toast:not(.is-visible) { opacity: 0; }
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
    --duration-fast: 120ms;
    --ease-out: cubic-bezier(0, 0, 0.2, 1);
    --ease-in: cubic-bezier(0.4, 0, 1, 1);
    --motion-distance-md: 16px;
  }
  body { margin: 0; padding: 40px; background: #0e0e0e; color: #eee;
         font: 14px system-ui; }
  button { padding: 12px 20px; background: #2a2a2a; color: #eee;
    border: 0; border-radius: 12px; font: 14px system-ui; cursor: pointer;
    touch-action: manipulation; }
  .toast {
    position: fixed; left: 16px; right: 16px; bottom: 16px;
    padding-bottom: max(env(safe-area-inset-bottom, 16px), 16px);
    background: #222; color: #eee; padding: 14px 16px; border-radius: 10px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    transform: translateY(calc(100% + 16px));
    transition: transform var(--duration-normal) var(--ease-out);
    z-index: 1000;
    display: flex; gap: 12px; align-items: center;
  }
  .toast.is-visible { transform: translateY(0); }
  .toast.is-leaving {
    transition: transform var(--duration-fast) var(--ease-in);
    transform: translateY(calc(100% + 16px));
  }
  .toast .msg { flex: 1; }
  .toast button {
    background: transparent; color: #4d9aff;
    padding: 4px 8px; font-weight: 600;
  }
  @media (prefers-reduced-motion: reduce) {
    .toast, .toast.is-visible, .toast.is-leaving {
      transition: opacity 160ms linear;
      transform: translateY(0);
    }
    .toast:not(.is-visible):not(.is-leaving) { opacity: 0; pointer-events: none; }
  }
</style>
</head>
<body>
  <button id="save">Save</button>
  <div class="toast" id="toast" role="status" aria-live="polite">
    <span class="msg">Saved</span>
    <button id="undo">Undo</button>
  </div>
<script>
  const toast = document.getElementById('toast');
  let timer;
  function show(msg) {
    toast.querySelector('.msg').textContent = msg;
    toast.classList.remove('is-leaving');
    toast.classList.add('is-visible');
    clearTimeout(timer);
    timer = setTimeout(hide, 4500);
  }
  function hide() {
    toast.classList.remove('is-visible');
    toast.classList.add('is-leaving');
    setTimeout(() => toast.classList.remove('is-leaving'), 200);
  }
  document.getElementById('save').addEventListener('click', () => show('Saved'));
  document.getElementById('undo').addEventListener('click', () => { hide(); /* undo handler */ });
</script>
</body>
</html>
```

## Mobile-web recipe

Bottom padding = `max(env(safe-area-inset-bottom, 0px), 16px)`. Optional swipe-down to dismiss (see MOBILE-GESTURES.md § swipe-to-dismiss). Use `aria-live="polite"` (not `assertive`) so screen readers announce but do not interrupt.

## Mobile-native-aspirational pointer recipe

Success / selection haptic on arrival. Pair with `Undo` action button when the action is destructive. Do not generate native code in v0.7.0 — reference only.

## Reduced-motion fallback

Static text-only banner, no translate. Hold duration unchanged.

## Common mistakes

- **No pause-on-hover** — toast hides while the user is reading it (desktop)
- **No dismiss-action copy** — Undo / Dismiss / View must be visible if the toast is action-bearing
- **`aria-live="assertive"`** — interrupts the user; use `polite`
- **Stacked toasts overlap** — max 3 visible; older dismiss to make room
- **Error toast auto-dismisses** — errors need explicit close; never auto-dismiss destructive errors
- **Toast hides essential info** — "Saved" alone is fine; "Server responded with 503 after retrying twice" needs a persistent banner