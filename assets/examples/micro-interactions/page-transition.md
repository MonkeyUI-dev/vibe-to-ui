# Page Transition

Tell the user which way they navigated. Direction-aware, platform-aware.

## Intent

Make navigation feel intentional and contextual. Forward vs back has different meaning — motion encodes that.

## When to use

- Multi-page apps (SPA route changes)
- Modal push (page is pushed as a full-screen modal)
- Hero transitions (shared element between origin and destination)

## When NOT to use

- Same-page state changes (use the relevant micro-interaction)
- Tab switches (use tab-indicator.md)
- Heavy L5 video transitions on content-heavy pages (defeats the purpose — see MOTION-ENGINE-ROUTER.md mobile honesty rule)

## Bindings

| Property | Token | Value |
|---|---|---|
| Duration | `--duration-normal` | 220–320ms |
| Easing | `--ease-default` | Calm |
| Distance | `--motion-distance-md` | 12–24px slide |

## Web recipe

```js
// View Transitions API (preferred when supported)
function navigate(href) {
  if (!document.startViewTransition) {
    window.location.href = href;
    return;
  }
  document.startViewTransition(() => {
    // update DOM to new page state
  });
}
```

CSS:

```css
::view-transition-old(root) {
  animation: 240ms ease both slide-out;
}
::view-transition-new(root) {
  animation: 240ms ease both slide-in;
}
@keyframes slide-out { to { transform: translateX(-24px); opacity: 0; } }
@keyframes slide-in { from { transform: translateX(24px); opacity: 0; } }
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root), ::view-transition-new(root) {
    animation: 160ms linear opacity;
  }
  @keyframes slide-out { to { opacity: 0; } }
  @keyframes slide-in { from { opacity: 0; } }
}
```

## Demo (fallback slide+fade)

```html
<!doctype html>
<html><head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  :root {
    --duration-normal: 240ms;
    --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
    --motion-distance-md: 16px;
  }
  body { margin: 0; background: #0e0e0e; color: #eee;
         font: 14px system-ui; min-height: 100dvh; }
  .view {
    padding: 40px;
    animation: view-in var(--duration-normal) var(--ease-default);
  }
  @keyframes view-in {
    from { transform: translateX(var(--motion-distance-md)); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @media (prefers-reduced-motion: reduce) {
    .view { animation: fade-in 160ms linear; }
    @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
  }
  h1 { margin-top: 0; }
  a { color: #4d9aff; }
</style>
</head>
<body>
  <div class="view">
    <h1>Home</h1>
    <p><a href="#detail">Open detail →</a></p>
    <p><a href="#profile">Open profile →</a></p>
  </div>
</body>
</html>
```

The View Transitions API demo requires a multi-page setup; the snippet above shows the fallback slide+fade used when the API is unsupported.

## Mobile-web recipe

Match the platform direction: iOS push slides left-to-right (new page enters from right); Android fades + scale (Material motion). Detect via `(max-width: 768px)` and a UA feature query.

```css
/* iOS-style push */
@media (max-width: 768px) {
  @keyframes view-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
  @keyframes view-out { from { transform: translateX(0); } to { transform: translateX(-30%); } }
}
```

## Mobile-native-aspirational pointer recipe

Native push/pop animation (iOS `UINavigationController` / Android `Fragment` transitions). Selection haptic not appropriate here — haptics are for state changes, not navigation. Do not generate native code in v0.7.0 — reference only.

## Reduced-motion fallback

Opacity-only fade, no slide. View Transitions API still works but with `skipTransition()` or `animation: fade`.

## Common mistakes

- **Same animation for forward and back** — forward should slide in from right, back should slide in from left (mirrored)
- **Transition longer than 320ms** — feels sluggish; use 220–280ms for typical navigation
- **Animation on initial page load** — first paint should not animate (no "from" state)
- **Heavy L5 video transition on a content page** — defeats the mobile honesty rule
- **No `prefers-reduced-motion` branch** — animation runs for users who asked to reduce it