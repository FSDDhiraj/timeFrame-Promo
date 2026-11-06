# TimeFrame Promotional Website

A React + Vite cinematic product-promo website for TimeFrame, built around the actual desktop app screens and supplied brand artwork.

## Stack
- React 18 + Vite 6.4.5 (pinned to avoid incompatible Rolldown/Vite versions)
- GSAP + ScrollTrigger for the cinematic intro, scroll reveals, parallax and pinned horizontal feature story
- Lenis for smooth scrolling, synced to GSAP's ticker
- Anime.js for subtle orbital/pulse details
- Framer Motion for the responsive navigation and product-tour modal
- Lucide React for iconography

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

## Build for deployment

```bash
npm run build
npm run preview
```

The deployable static website is generated in `dist/`.

## Before publishing
1. Replace the placeholder download action in `src/App.jsx` (`DownloadSection` component) with the official Windows installer / release URL.
2. Replace `public/assets/timeframe-tour.mp4` with a polished promotional video if you produce one. The supplied screen recording is currently used in the overview modal.
3. Check the mobile layout and reduced-motion behavior on your target devices.

## Notes
The screenshots in `public/assets/` are cropped stills from the provided TimeFrame screen recording. The app UI is intentionally shown as supplied rather than fabricated.


## Troubleshooting
If you see a dependency-scan error mentioning `rolldown` or an invalid `jsx` option, remove the existing install and lockfile, then reinstall the pinned dependencies:

**Windows PowerShell:**
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm install
npm run dev
```

The project pins Vite to `6.4.5`. Check the installed version with `npm ls vite`; it should show `vite@6.4.5`.
