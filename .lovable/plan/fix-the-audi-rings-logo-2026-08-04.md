# Fix the Audi rings logo

## Problem

The four rings in the header/footer logo are drawn far apart inside an oversized viewBox, so they read as a row of loose circles instead of the interlocking Audi rings. The circles sit at x = 10, 50, 90, 130 with radius 15 in a 200x40 box: gaps between them, plus a large empty area on the right that makes the logo look off-centre and too small next to the "F1." wordmark.

## Fix

Rework `AudiRings` in `src/components/site/Logo.tsx`:

- Tighten the viewBox to fit the artwork exactly (roughly 124x36), removing the dead space.
- Space the four circles so they overlap like the real mark: centres at 18, 46, 74, 102 with radius 17, giving the classic interlocking look.
- Keep `stroke="currentColor"` so the mark inherits colour, and set a proportionally thinner stroke width plus `vectorEffect="non-scaling-stroke"` so the rings stay crisp at small sizes.
- Keep the exported API (`className`, `aria-hidden`) unchanged so `Logo`, the nav, footer, and loading screen need no edits.

Optionally bump the rings' height in `Logo` slightly (h-5 to h-6) so they sit visually balanced against the wordmark.

## Scope

One file: `src/components/site/Logo.tsx`. No layout, routing, or data changes.
