# Sergio Piñeros — Portfolio

Single-page portfolio modeled after [sanvithi.com](https://sanvithi.com/), built with Next.js, Tailwind CSS v4, and GSAP.

## Stack

- **Next.js 15** (App Router)
- **Tailwind CSS v4**
- **GSAP ScrollTrigger** for scroll animations
- **Fonts:** Averia Serif Libre + Inclusive Sans + Caveat (all SIL OFL, free commercial use)

## Structure

```
app/
  layout.tsx, page.tsx, globals.css
components/
  Portfolio.tsx          # Full page (nav, hero, projects, footer)
  AssetPlaceholder.tsx   # Dashed placeholders until assets arrive
lib/
  projects.ts            # Copy, project data, themes
ASSETS.md                # Complete asset checklist per section
```

## Development

```bash
npm install
npm run dev
```

## Assets

See **[ASSETS.md](./ASSETS.md)** for the full checklist of images needed per section (hero stickers, project screenshots, footer, etc.).

## Deploy

```bash
npx vercel
```
