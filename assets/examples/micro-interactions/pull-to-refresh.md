# Pull to Refresh

Re-fetch the top of a feed without a visible refresh button.

## Intent

Let the user re-fetch fresh content with a natural gesture, without cluttering the UI with a refresh button.

## When to use

- Feeds (timeline, news, social)
- Lists with new content appearing over time (notifications, messages)
- Any content the user is expected to "refresh" by re-fetching

## When NOT to use

- Web (use an explicit Refresh button — pull-to-refresh fights with scroll)
- Forms or detail screens
- When a refresh button is already visible (use that)

## Bindings

| Property | Token | Value |
|---|---|---|
| Duration (spinner appear) | `--duration-fast` | 200ms |
| Duration (settle) | `--duration-normal` | 240ms |
| Easing | `--ease-out` spinner; spring snap-back | Calm-out |
| Distance | `--motion-distance-md` | 16px spinner slot |

## Web recipe

Avoid. Pull-to-refresh fights with scroll on desktop. Use a Refresh button instead.

```css
.refresh-btn { /* standard button styles */ }
```

## Demo (mobile-web only)

```html
<!doctype html>
<html><head>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<style>
  :root {
    --duration-fast: 120ms;
    --duration-normal: 240ms;
    --ease-out: cubic-bezier(0, 0, 0.2, 1);
    --motion-distance-md: 16px;
    --inset-bottom: env(safe-area-inset-bottom, 0px);
  }
  body { margin: 0; background: #0e0e0e; color: #eee; font: 14px system-ui; }
  .feed {
    height: 100dvh; overflow: hidden; position: relative;
    background: #0e0e0e;
  }
  .feed-scroller {
    height: 100%; overflow-y: auto; touch-action: pan-y;
    -webkit-overflow-scrolling: touch;
  }
  .spinner-slot {
    height: 0; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    transition: height var(--duration-fast) var(--ease-out);
  }
  .spinner-slot.is-pulling { height: 60px; }
  .spinner {
    width: 24px; height: 24px; border-radius: 50%;
    border: 2px solid #444; border-top-color: #4d9aff;
    animation: spin 1s linear infinite;
    opacity: 0; transition: opacity var(--duration-fast) var(--ease-out);
  }
  .spinner-slot.is-pulling .spinner,
  .spinner-slot.is-refreshing .spinner { opacity: 1; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .row {
    padding: 16px; border-bottom: 1px solid #1a1a1a;
    background: #0e0e0e;
  }
  @media (prefers-reduced-motion: reduce) {
    .spinner { animation: none; opacity: 1; }
    .spinner-slot { transition: none; }
  }
</style>
</head>
<body>
  <div class="feed">
    <div class="spinner-slot" id="slot"><div class="spinner"></div></div>
    <div class="feed-scroller" id="scroller">
      <div class="row">Item 1 — scroll up to refresh</div>
      <div class="row">Item 2</div>
      <div class="row">Item 3</div>
      <div class="row">Item 4</div>
      <div class="row">Item 5</div>
      <div class="row">Item 6</div>
      <div class="row">Item 7</div>
      <div class="row">Item 8</div>
    </div>
  </div>
<script>
  const scroller = document.getElementById('scroller');
  const slot = document.getElementById('slot');
  let startY = 0;
  let pulling = false;
  const THRESHOLD = 80;

  scroller.addEventListener('pointerdown', (e) => {
    if (scroller.scrollTop === 0) {
      startY = e.clientY;
      pulling = true;
      scroller.setPointerCapture(e.pointerId);
    }
  });
  scroller.addEventListener('pointermove', (e) => {
    if (!pulling) return;
    const dy = e.clientY - startY;
    if (dy > 0 && scroller.scrollTop === 0) {
      slot.classList.toggle('is-pulling', dy > 10);
    }
  });
  scroller.addEventListener('pointerup', (e) => {
    if (!pulling) return;
    pulling = false;
    const dy = e.clientY - startY;
    if (dy > THRESHOLD) {
      slot.classList.add('is-refreshing');
      slot.classList.remove('is-pulling');
      // simulate fetch
      setTimeout(() => {
        slot.classList.remove('is-refreshing');
      }, 1200);
    } else {
      slot.classList.remove('is-pulling');
    }
  });
</script>
</body>
</html>
```

## Mobile-web recipe

`pointerdown` only registers pull-to-refresh when `scrollTop === 0`. Threshold 80px before trigger; release < 80px springs back. Disable parent scroll while drag is active. Top-edge pull-down on iOS is system-reserved for notification center — `scrollTop === 0` check prevents the conflict.

```js
// pseudo: pointerdown → only track if scrollTop === 0
// pointermove → translate the slot height
// pointerup → if travel > 80px, refresh; else snap back
```

## Mobile-native-aspirational pointer recipe

Same pointer mechanics. Success haptic on commit (state-change, not on press). Do not generate native code in v0.7.0 — reference only.

## Reduced-motion fallback

Static progress bar (token-driven `--color-primary` width); no spinner rotation.

## Common mistakes

- **Triggering on any vertical drag** — fights with scroll; only register when `scrollTop === 0`
- **No cancellation rule** — drag without threshold logic steals other gestures
- **Spinner rotation continues forever under reduce-motion** — pause or remove the animation
- **Content jumps when refresh completes** — settle the spinner slot height back to 0 smoothly
- **Re-fires on every pointermove** — throttle to once per gesture; commit only on pointerup