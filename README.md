# Sergio Piñeros — Portfolio

Single-page portfolio built with Next.js, Tailwind CSS v4, and GSAP ScrollTrigger.

## Stack

- **Next.js 15** (App Router)
- **Tailwind CSS v4**
- **GSAP + ScrollTrigger** for scroll animations
- **3-color palette:** Ivory `#F4F1EB`, Charcoal `#1A1917`, Clay `#9C7B6A`

## Structure

```
app/
  layout.tsx      # Fonts + metadata
  page.tsx        # Entry point
  globals.css     # Grid system, tokens, utilities
components/
  Portfolio.tsx   # Full single-page experience
```

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Deploy to Vercel:

```bash
npx vercel
```

Or connect the repo to Vercel for automatic deployments.

## Customization

- Replace shape placeholders with real project imagery in `components/Portfolio.tsx`
- Update copy, email, and links in the footer section
- Adjust colors in `app/globals.css` under `:root` and `@theme`
