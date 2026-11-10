# Sergio Piñeros — Portfolio

An evolving personal home for Sergio Piñeros: artist, writer, and maker. Five questions open a conversation; an interactive desktop holds the projects. Built with Next.js, Tailwind CSS v4, and GSAP.

## Stack

- **Next.js 15** (App Router)
- **Tailwind CSS v4**
- **GSAP ScrollTrigger** for scroll animations
- **Fonts:** Baskervville + DM Sans + Caveat (all SIL OFL, free commercial use)

## Structure

```
app/
  layout.tsx, page.tsx, globals.css
components/
  Portfolio.tsx          # Five-question conversation, desktop entry, and footer
  AttentionEye.tsx       # Original SVG engraving; a single editorial collage treatment
  StudioDesktop.tsx      # Existing folders, draggable windows, and project links
  AssetPlaceholder.tsx   # Dashed placeholders until assets arrive
lib/
  projects.ts            # Copy, project data, themes
ASSETS.md                # Complete asset checklist per section
```

## Development

```bash
npm ci
npm run dev
```

## Assets

See **[ASSETS.md](./ASSETS.md)** for the full checklist of images needed per section (hero stickers, project screenshots, footer, etc.).

## Deploy

```bash
npx vercel
```

## Validation

```bash
npm run lint
npx tsc --noEmit --incremental false
npm run build
npm run start
```

Stop the development server before a production build; both write to `.next`.
Google Fonts (`fonts.googleapis.com` and `fonts.gstatic.com`) must be reachable
at compile time. Next.js hosts downloaded fonts locally at runtime.

For visual review, check all five questions at desktop, tablet, and narrow mobile
widths. The tabs support Arrow Left/Right and Home/End. Open the desktop, open each
folder, drag a window on desktop, toggle the theme, and close with Escape. Tab stays
inside the desktop and focus returns to its entry button on exit. Also check with
reduced motion enabled. There is no unit-test suite configured.

## Editorial assets

`AttentionEye.tsx` is original vector linework, not a reproduction of reference art.
`public/textures/paper-grain.png` is a small, generated grayscale paper tile. It is
static, reused across the hero and footer, and does not animate or intercept input.
The reflection deck is described as work in progress; there is no shop or preorder.
