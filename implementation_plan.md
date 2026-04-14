# Scrollytelling Personal Portfolio

A high-end personal portfolio using Next.js 14, Tailwind CSS, Framer Motion, and HTML5 Canvas for a smooth, high-performance scroll-linked image sequence animation.

## User Review Required

> [!WARNING]
> It appears that **Node.js/npm is not installed** on this machine, which means you won't be able to run `npm install` or start the Next.js development server locally right away. 
> 
> My plan is to **manually scaffold all the required Next.js files** in `c:\Users\91989\Documents\portfolio` so the codebase is fully ready. Once we finish building, you can install Node.js (or run it via another environment like WSL/Docker) to install dependencies and view the app. Let me know if you would prefer to install Node.js first, or if we should proceed with manual scaffolding.

> [!IMPORTANT]
> The source folder `c:\Users\91989\Documents\portfolio\sequence` contains `.png` files, not `.webp`. I will write the sequence logic to load `.png` files since that matches the actual files on your disk. Let me know if you'll be converting them to WebP.

## Proposed Changes

We will build the Next.js app structure from scratch.

### Root Configs
> We will manually create the Next.js root configuration files.
#### [NEW] `package.json`
#### [NEW] `tsconfig.json`
#### [NEW] `tailwind.config.ts`
#### [NEW] `postcss.config.mjs`

### App Router
> The core Next.js application files.
#### [NEW] `app/layout.tsx` (Root layout with global fonts)
#### [NEW] `app/page.tsx` (Main page orchestrating ScrollyCanvas, Overlay, and Projects)
#### [NEW] `app/globals.css` (Tailwind reset and dark background #121212)

### Components
> The specialized React components for the website.
#### [NEW] `components/ScrollyCanvas.tsx`
- Parent container `h-[500vh]` and a sticky inner `h-screen` container.
- Uses HTML5 `<canvas>` with `framer-motion`'s `useScroll`.
- Includes an image preloader hook to map 75 frames (`frame_00_delay-0.066s.png` to `frame_74_delay-0.066s.png`) seamlessly.
#### [NEW] `components/Overlay.tsx`
- 3 text sections styled with z-index overlaid on the canvas.
- Uses `useScroll` and `useTransform` to achieve parallax and fade-in/fade-out effects based on scroll percentage.
#### [NEW] `components/Projects.tsx`
- A dark, modern glass-morphism project layout styled with tailwind `backdrop-blur`.

### File Operations
#### [MODIFY] Move sequence images to public folder
- We need to move the `sequence` folder into `public/sequence` because Next.js serves static assets from the `public/` directory.

## Open Questions

- What font would you like configured? We will use Inter by default for a clean sans-serif look.
- Are there specific project titles or placeholders you want for the Work Grid? (We will use generic placeholders for now).
- You mentioned "nano banana" for UI components - I'll assume that might be a speech-to-text artifact for standard UI components or "shadcn UI", but I will stick to hand-crafted Tailwind + Framer Motion components for this premium experience to avoid bloating the app. Let me know if you meant something else!

## Verification Plan

### Manual Verification
- All code files will be properly written and typed (`.tsx`).
- You will need to install Node.js and run `npm install` and `npm run dev` to preview the result.
