## Goal
Replace the currently selected image on the Home page "Latest" section (the first news card: "Hartmann secures maiden podium in Melbourne") with the uploaded image, without generating a new image.

## Current state
- The selected `<img>` is rendered from `src/routes/index.tsx` line 206, mapping the `NEWS` array.
- The first news item is defined in `src/data/news.ts` and uses `import img3 from "@/assets/race.jpg"`.
- The uploaded image is available at `user-uploads://images.jpg` (mounted at `/mnt/user-uploads/images.jpg`).

## Plan
1. Upload the uploaded image to Lovable Assets:
   - `mkdir -p src/assets`
   - `lovable-assets create --file /mnt/user-uploads/images.jpg --filename f1-car-action.jpg > src/assets/f1-car-action.jpg.asset.json`
2. Update `src/data/news.ts`:
   - Add a new import for the generated asset pointer: `import raceAction from "@/assets/f1-car-action.jpg.asset.json";`
   - Change the first news item's `img` from `img3` to `raceAction.url`.
3. Verify the change renders correctly in the preview and that the new image appears in the first news card.

No component template changes are needed; only the data source and a new asset pointer are updated.