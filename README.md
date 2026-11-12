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
widths. Every question has exactly two lines in bold Baskervville, fitted to the
available width after fonts load and on resize. Answers use DM Sans Light (300)
with -0.05em tracking. The question has a soft light behind it and a translucent tracing-paper layer
that lifts on interaction, inspired by printed editorial compositions. Touch/click its text or rub the ink
sideways to advance; keyboard controls are Enter/Space, Arrow Left/Right, and
Home/End. Scrolling never changes the current question. After five seconds viewing the first question, a gentle liquid ripple
suggests interaction (disabled for reduced motion). Open the desktop, open each
folder, inspect the content preview (75% opacity) on its translucent cover, drag a window on
desktop, toggle the theme, and close with Escape. Mobile previews are centered
floating windows with visible margins, bounded height, and a dismissible backdrop. Tab stays
inside the desktop and focus returns to its entry button on exit. Also check with
reduced motion enabled. There is no unit-test suite configured.

## Editorial assets

`AttentionEye.tsx` is original vector linework, not a reproduction of reference art.
`public/textures/paper-grain.png` is a small, generated grayscale paper tile. It is
static, reused across the hero, conversation, and footer, and does not animate or intercept input.
The reflection deck is described as work in progress; there is no shop or preorder.

Client project windows link to https://sergioatelier.co/work#case-studies; the
studio folder retains its homepage destination. The desktop has no extra external-link button row.

## Folder files and conversation cards

Reusable controls live in `components/ui`; Tailwind v4 styles enter through
`app/globals.css`. `components.json` records those paths for shadcn tooling.
`CardHandGallery` uses `motion/react` for the lifted selection and curved hand.
It accepts controlled or internal selection, original image sources, and a
`renderCard` function for text files and vector artwork.

Folder contents come from `Project.files` in `lib/projects.ts`. Each file has a
stable `id`, `title`, and optional `description`, `image`, `artwork`, or `text`.
When omitted, the current project preview and a text note use existing content.
Future Story folders can supply ordered files through the same data shape;
no Story content is published by this change. Project links remain available
below the hand. Fine pointers can flick a file upward; touch users can tap cards
or use Previous/Next without blocking vertical scrolling.

The conversation keeps each question and its answer together on a translucent
sheet, with a folded corner and a faint following sheet. Answers are divided
at sentence boundaries. The whole sheet advances the question, while the NxtSeat
link remains independent. Previous/Next, arrow keys, Home/End, and reduced-motion
preferences remain supported. The face icon returns home; the power key traces
its glyph before opening the desktop.
