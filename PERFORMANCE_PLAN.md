# Performance Analysis & Optimization Plan

## Scope
Analyze scroll lag / memory usage of `arron-portfolio-v2` **without removing** scroll-driven
kinetic animations, marquee loops, the flashlight cursor, the cinematic background, the
spider resume crawler, or any visual effect. Recommendations are additive/non-destructive.

## Observed bottlenecks (deep analysis)

### A. Always-on animation loops (main-thread + GPU)
1. `CinematicBackground` runs a `requestAnimationFrame` star loop forever (45 particles) even
   when the tab is hidden or the section is far off-screen.
2. `VelocityMarquee` runs two `useAnimationFrame` loops (skill rows + brand belt) continuously,
   each calling `baseX.set(...)` every frame and recomputing `wrap()` + transforms.
3. `TestimonialsSection` runs 4 infinite vertical marquee columns (CSS/JS driven) at all times.
4. `FlashlightCursor` updates React state (`hovering`, `pressed`, `visible`) on every
   `pointermove`, triggering re-renders of the cursor component on each mouse move.

### B. Heavy DOM / repeated content
- `VelocityMarquee` renders each skill row 4× and the brand belt 4× for seamless looping.
- `TestimonialsSection` triples its item arrays and renders 4 columns.
- `SpiderResumeCrawler.prepareWords()` wraps every text node in `<span class="spider-word">`
  on resume click (large DOM mutation, but only on demand).

### C. Large media & image decoding
- Several `priority` images (smartcar HUD/sim, hero portrait) are large; non-priority images
  rely on Next.js lazy loading but some have oversized intrinsic dimensions
  (e.g. NVIDIA 3840×2828, Cursor 3840×917) which still decode large sources before resize.
- `smartcar_detection.mp4` autoplays in a loop; IntersectionObserver pauses only when out of view
  but the video keeps buffering.

### D. Expensive CSS
- Widespread `backdrop-blur-*` (glass surfaces, brand belt, HUDs) forces per-frame compositing
  during scroll.
- `transform: preserve-3d` + rotateY on SmartCar cards keeps a 3D layer alive.
- `will-change` hints are sparse; many animated elements promote layers late.

### E. Scroll-linked work
- `HeroSection` and `LeadershipSection` use `useScroll` + `useTransform` reading scrollY every
  frame; combined with many `whileInView` observers this is the main scroll jank source.
- Framer `whileInView` observers are numerous (one per card/row) and each fires layout reads.

### F. Bundle / unused deps
- `gsap` + `@gsap/react` are installed but unused in `src/` (dead weight in bundle analysis).
- `react-type-animation`, `react-countup` used sparingly.

## Optimization plan (non-destructive, keep all animations)

### Tier 1 — Quick wins (implement now)
1. **Pause rAF loops when hidden/off-screen**
   - `CinematicBackground`: stop `requestAnimationFrame` on `document.visibilitychange` (hidden)
     and resume on visible. Keep animation identical when visible.
   - `VelocityMarquee` rows: guard `useAnimationFrame` with `document.hidden` (and optionally an
     IntersectionObserver on the section) so off-screen marquees stop.
2. **Reduce re-rend churn in `FlashlightCursor`**
   - Replace `hovering`/`pressed`/`visible` `useState` updates with motion values / refs where
     possible, or throttle state updates. Keep visual behavior.
3. **Image hygiene**
   - Add `loading="lazy"` + `decoding="async"` is already Next default; ensure `sizes` are tight.
   - Downscale oversized brand logos (NVIDIA/Cursor) source assets or add `quality`/`sizes`.
4. **CSS containment**
   - Add `content-visibility: auto` + `contain-intrinsic-size` to `.section-base` (measure impact;
     may affect scroll-height estimation — test). Alternative: `contain: layout paint` only.
5. **Pause video when off-screen** — already done via IntersectionObserver; also set
   `preload="metadata"` to avoid buffering full file.

### Tier 2 — Medium effort
6. **Layer promotion hints**: add `will-change: transform` to marquee/hero transforms and remove
   after animation settles (via CSS).
7. **Throttle `whileInView` observers**: group animations, use `viewport={{ once: true }}`
   (already) and larger margins to batch.
8. **Memoize heavy presentational components** (`FeaturedCard`, `TestimonialCard`) with `React.memo`.
9. **Avoid layout thrash in spider crawler**: batch `getBoundingClientRect` reads (already
   throttled 65ms) — keep; consider reducing word scan frequency.

### Tier 3 — Structural (optional, higher risk)
10. **Code-split heavy sections** (SmartCar, Spider crawler) already dynamic for effects; consider
    dynamic import for SmartCarSection and TestimonialsSection.
11. **Remove unused deps** (`gsap`, `@gsap/react`) from package.json after confirming no imports.
12. **Replace backdrop-blur** on always-visible belts with solid translucent backgrounds to cut
    compositing cost (visual change — confirm with design).

## Implemented in this change
- `CinematicBackground`: pause/resume rAF on tab visibility (no visual change when visible).
- Added this plan document.

## Not changed (by design)
- All scroll kinetic animations, marquee loops, transforms, and effects remain intact.
- No section or component removed.
