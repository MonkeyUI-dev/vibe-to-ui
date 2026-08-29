# Bottom Sheet

Reveal contextual detail (filters, share, comments) without leaving the current screen. Mobile-primary; rare on desktop.

## Intent

Show options or detail without losing the user's context. Bottom-anchored by convention (thumb-reachable).

## When to use

- Action sheets (share targets, delete confirmations)
- Filter panels
- Comment threads (in-app, not full-screen)
- Snap-to-half / snap-to-full panels (maps, music players)

## When NOT to use

- Long-form content that needs its own URL
- Multi-step flows (use a full-screen modal)
- Desktop sidebars (use a sidebar pattern, not a bottom sheet)

## Bindings

| Property | Token | Value |
|---|---|---|
| Duration | `--duration-normal` to `--duration-slow` low end | 220–320ms |
| Easing | `--ease-out` rise, `--ease-in` dismiss | Calm-out / Calm-in |
| Distance | `--motion-distance-md` | 12–24px settle after overshoot |

## Web recipe

Rare on desktop. If used, rise from the bottom of a centered card on a wide viewport (max-width ~480px). Backdrop fades 0 → 0.5 opacity over the same duration.

```css
.sheet-overlay {
  --duration-normal: 240ms;
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --motion-distance-md: 16px;
  position: fixed; inset: 0;
  background: rgba(0, 0, 0, 0);
  transition: background-color var(--duration-normal) var(--ease-out);
}
.sheet-overlay.is-open { background: rgba(0, 0, 0, 0.5); }
.sheet {
  position: fixed; left: 50%; bottom: 0; transform: translate(-50%, 100%);
  width: min(480px, 100%);
  background: #1a1a1a; border-radius: 16px 16px 0 0;
  padding: 16px;
  padding-bottom: max(env(safe-area-inset-bottom, 0px), 16px);
  transition: transform var(--duration-normal) var(--ease-out);
}
.sheet-overlay.is-open .sheet { transform: translate(-50%, 0); }
@media (prefers-reduced-motion: reduce) {
  .sheet-overlay, .sheet {
    transition: background-color 160ms linear;
    transform: translate(-50%, 0) !important;
  }
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
    --ease-out: cubic-bezier(0, 0, 0.2, 1);
    --ease-in: cubic-bezier(0.4, 0, 1, 1);
    --motion-distance-md: 16px;
  }
  body { margin: 0; padding: 24px; background: #0e0e0e; color: #eee;
         font: 14px system-ui; }
  .page { min-height: 100dvh; }
  .trigger { padding: 12px 20px; background: #2a2a2a; color: #eee;
    border: 0; border-radius: 12px; font: 14px system-ui; cursor: pointer;
    touch-action: manipulation; }
  .overlay {
    position: fixed; inset: 0;
    background: rgba(0, 0, 0, 0);
    transition: background-color var(--duration-normal) var(--ease-out);
    display: flex; align-items: flex-end; justify-content: center;
    pointer-events: none;
  }
  .overlay.is-open { background: rgba(0, 0, 0, 0.5); pointer-events: auto; }
  .sheet {
    width: min(420px, 100%);
    background: #1a1a1a; color: #eee;
    border-radius: 16px 16px 0 0;
    padding: 12px 16px 16px;
    padding-bottom: max(env(safe-area-inset-bottom, 0px), 16px);
    transform: translateY(100%);
    transition: transform var(--duration-normal) var(--ease-out);
  }
  .overlay.is-open .sheet { transform: translateY(0); }
  .handle {
    width: 36px; height: 4px; margin: 0 auto 12px;
    background: #444; border-radius: 2px;
  }
  .actions { display: grid; gap: 8px; }
  .actions button {
    padding: 14px; background: #2a2a2a; color: #eee;
    border: 0; border-radius: 10px; font: 14px system-ui;
    cursor: pointer; touch-action: manipulation;
  }
  @media (prefers-reduced-motion: reduce) {
    .overlay, .sheet, .overlay.is-open, .overlay.is-open .sheet {
      transition: background-color 160ms linear;
      transform: none;
    }
  }
</style>
</head>
<body>
  <div class="page">
    <h1>Article title</h1>
    <p>Tap below to share.</p>
    <button class="trigger" id="open">Share</button>
  </div>
  <div class="overlay" id="overlay">
    <div class="sheet" role="dialog" aria-label="Share">
      <div class="handle"></div>
      <div class="actions">
        <button>Copy link</button>
        <button>Send to friend</button>
        <button>Post to feed</button>
        <button id="close">Cancel</button>
      </div>
    </div>
  </div>
<script>
  const overlay = document.getElementById('overlay');
  const open = () => overlay.classList.add('is-open');
  const close = () => overlay.classList.remove('is-open');
  document.getElementById('open').addEventListener('click', open);
  document.getElementById('close').addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
</script>
</body>
</html>
```

## Mobile-web recipe

Bottom edge of sheet handles drag-to-dismiss (see MOBILE-GESTURES.md § swipe-to-dismiss). Sheet content bottom padding = `max(env(safe-area-inset-bottom, 0px), 16px)` (until MOBILE-VIEWPORT.md formally ships `--inset-bottom`). Drag handle is mandatory.

Set `touch-action: none` on the sheet body during active drag; `touch-action: pan-y` on the backdrop.

## Mobile-native-aspirational pointer recipe

Use native sheet module if available (iOS 15+ `UISheetPresentationController` / Android `BottomSheetDialogFragment`). Haptic on open + on snap-point change. Do not generate native code in v0.7.0 — reference only.

## Reduced-motion fallback

Instant show + backdrop fade. No translate.

## Common mistakes

- **No drag handle** — mobile users discover dismissal by accident or not at all
- **Modal sheet allows backdrop dismiss for destructive action** — destructive sheets must use an explicit close (no backdrop tap)
- **Sheet bottom padding eats home indicator area** — content hidden under system UI; use `max(env(safe-area-inset-bottom, 0px), 16px)`
- **Sheet content longer than viewport** — sheet must scroll internally; cap at 90dvh and use `overflow-y: auto` inside
- **No focus trap** — keyboard users escape the sheet without dismissing it
- **Drag fights with scroll** — only register vertical drag when the sheet is at top scroll position