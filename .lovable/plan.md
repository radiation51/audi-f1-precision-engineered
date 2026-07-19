# Audi Formula 1 — Immersive Team Website

A cinematic, dark-themed multi-page site for the Audi F1 team, built on the existing TanStack Start + Tailwind v4 + shadcn stack, with Three.js/R3F for 3D, Framer Motion for animation, and placeholder data ready for a live F1 API later.

## Scope note & disclaimers

- This is a **fan/concept site**. All content (drivers, results, engine specs) will be **placeholder data** clearly marked as such — Audi's real F1 program launches 2026 and public data is limited.
- No real Audi trademarks/logos will be embedded as assets; we'll use a **stylized "AUDI F1" wordmark** built in CSS/SVG (four rings + wordmark) as a design element.
- No live F1 API wired on first pass — data layer is structured so it can be swapped later.
- Videos/images: we'll use AI-generated hero imagery + short generated hero video (or a subtle animated telemetry canvas fallback) rather than copyrighted F1 footage.

## Design system

- **Palette**: near-black `#0A0A0B` bg, carbon `#141416`, graphite `#1E1E22`, Audi red `#E30613`, white `#FFFFFF`, muted gray text. All tokens go in `src/styles.css` via `@theme inline`.
- **Type**: Space Grotesk (display) + Inter (body), loaded via `<link>` in `__root.tsx`.
- **Textures**: subtle carbon-fiber SVG pattern, glassmorphism (backdrop-blur + white/5 borders), red glow accents.
- **Motion**: Framer Motion everywhere — fade/slide reveals on scroll, hover micro-interactions, animated counters, page transitions via `AnimatePresence` on the root Outlet.
- **Background**: animated telemetry canvas (moving grid + waveform) as a fixed low-opacity layer.
- **Loading screen**: full-screen overlay with animated four-rings + "AUDI F1" wordmark until initial route mounts.

## Route architecture (TanStack Start file-based)

Each route gets its own `head()` with unique title/description/og tags.

```
src/routes/
  __root.tsx           → shell: fonts, nav, footer, telemetry bg, loader, page transitions
  index.tsx            → Home (replaces placeholder)
  about.tsx            → About / history / vision
  car.tsx              → 3D car + hotspots + engine 3D
  drivers.tsx          → Driver roster
  drivers.$slug.tsx    → Driver detail
  performance.tsx      → Standings, charts, calendar
  gallery.tsx          → Category-filtered lightbox grid
  contact.tsx          → Form, map, socials, newsletter
```

Nav lives in `__root.tsx`: sticky transparent navbar, scroll-shrinks with blur; scroll progress bar at top; back-to-top button; footer.

## Page-by-page

**Home** — hero (animated bg video/canvas, wordmark, headline, two CTAs), scroll-reveal timeline, animated stat counters (power/speed/hybrid/goals), interactive car silhouette (SVG with hover regions), news cards grid, sponsor logo strip.

**About** — Audi story, motorsport heritage, F1 entry rationale, sustainability, hybrid PU development; vertical animated timeline; factory-style imagery; value cards.

**Car** — R3F scene with a **stylized F1 car model** (procedural geometry — chassis, wings, wheels, halo — with carbon material + red accents; not a licensed Audi model). OrbitControls (rotate/zoom/pan), env lighting, contact shadow. Hotspots (front wing, rear wing, halo, suspension, tires, floor, sidepods) as `Html` markers that open a glass side panel with copy.

  Below: **Power Unit** R3F scene — stylized hybrid PU assembly (ICE block, turbo, MGU-H, MGU-K, battery, ERS, cooling, gearbox as distinct meshes). Controls: rotate, zoom, **explode slider** (animates parts outward), animated pistons, click a part → info panel with name/description/specs/function.

**Drivers** — two animated cards (portrait, flag, number, stats). Click → detail route with bio, anecdote, career stats, animated progress bars.

**Performance** — recent results table, driver + constructor standings, poles/fastest laps, points evolution line chart (Recharts), race calendar list. Data from a typed `src/data/performance.ts` placeholder module; a thin `src/lib/f1-api.ts` stub notes where to plug a live API.

**Gallery** — masonry grid with category filter chips (Car/Drivers/Garage/Pit Stop/Engine/Race); click opens a shadcn Dialog lightbox with prev/next.

**Contact** — form (name/email/subject/message, react-hook-form + zod, submits to a `createServerFn` that just logs for now), embedded map iframe, social icons, newsletter input.

## Data & assets

- `src/data/` modules: `drivers.ts`, `performance.ts`, `news.ts`, `carHotspots.ts`, `engineParts.ts`, `timeline.ts`, `gallery.ts`.
- Hero + gallery + driver portraits + factory shots generated via imagegen (cinematic, dark, red-accent) and uploaded through `lovable-assets`.
- Stylized wordmark and four-rings as inline SVG components.

## Technical details

- **Deps to add**: `three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion`, `recharts`, `react-hook-form`, `zod`, `@hookform/resolvers`, `lucide-react` (likely present).
- **3D perf**: R3F scenes lazy-loaded with `React.lazy` behind `<ClientOnly>` (SSR-safe); `Suspense` fallback = skeleton with spinner; DPR clamped `[1, 1.75]`; `frameloop="demand"` where possible.
- **SEO**: unique `head()` per route (title, description, og:title/description/url, twitter card), leaf-only `og:image` from generated hero art, canonical relative paths, JSON-LD `SportsOrganization` on root and `Person` on driver detail.
- **A11y**: semantic landmarks, focus-visible rings on red accent, alt text on all images, prefers-reduced-motion disables large animations, keyboard-navigable lightbox and hotspots.
- **Perf**: route-level code splitting (auto), lazy 3D, image `loading="lazy"`, preconnect to fonts.
- **Dark/Light toggle**: dark default; token pairs already in `styles.css` — add a small theme toggle in nav using `class` on `<html>`.
- **Search bar**: nav command palette (shadcn `Command` in a Dialog) indexing static page + driver entries.

## Build order

1. Design tokens, fonts, telemetry background, loader, nav + footer in `__root.tsx`, page-transition wrapper.
2. Data modules + generated imagery/assets.
3. Home page (replaces placeholder `index.tsx`).
4. About, Drivers list + detail, Performance (with Recharts), Gallery, Contact.
5. Car page: R3F car scene + hotspots.
6. Car page: Power Unit scene with explode + part inspector.
7. Extras: scroll progress, back-to-top, command palette search, theme toggle, JSON-LD, per-route head metadata.
8. Responsive pass + reduced-motion pass + Lighthouse polish.

## Open questions (I'll assume these unless you say otherwise)

- Stylized/generic F1 car geometry is fine (no licensed Audi CAD).
- AI-generated hero video + telemetry canvas fallback instead of real F1 footage.
- Placeholder drivers ("Driver 01 / Driver 02" with invented stats) — you can rename later.
- Contact form just logs server-side; no email provider wired yet.

Reply "go" (or with tweaks) and I'll build it.
