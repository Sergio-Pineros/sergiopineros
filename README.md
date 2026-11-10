# Sergio Piñeros — Portfolio

An evolving personal home for Sergio Piñeros: artist, writer, and maker. A quiet, full-screen statement opens into a separate five-question conversation; an interactive desktop holds the projects. Built with Next.js, Tailwind CSS v4, and GSAP.

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
  QuestionConversation.tsx # Full-screen questions with a liquid dissolve
  AttentionEye.tsx       # Original SVG engraving, discovered inside a desktop folder
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

Project images live in `public/projects`. The original eye engraving lives in the desktop folder **The art of noticing**
and its miniature cover preview; the hero contains no illustrations.
The older **[ASSETS.md](./ASSETS.md)** checklist remains as a project asset reference.

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
widths. The question has a soft light behind it and a translucent tracing-paper layer
that lifts on interaction, inspired by printed editorial compositions. Touch/click its text or rub the ink
sideways to advance; keyboard controls are Enter/Space, Arrow Left/Right, and
Home/End. Scrolling never changes the current question. After five seconds viewing the first question, a gentle liquid ripple
suggests interaction (disabled for reduced motion). Open the desktop, open each
folder, inspect the content preview on its translucent cover, drag a window on
desktop, toggle the theme, and close with Escape. Mobile previews are centered
floating windows with visible margins, bounded height, and a dismissible backdrop. Tab stays
inside the desktop and focus returns to its entry button on exit. Also check with
reduced motion enabled. There is no unit-test suite configured.

## Editorial assets

`AttentionEye.tsx` is original vector linework, not a reproduction of reference art.
`public/textures/paper-grain.png` is a small, generated grayscale paper tile. It is
static, reused across the hero, conversation, and footer, and does not animate or intercept input.
The reflection deck is described as work in progress; there is no shop or preorder.
