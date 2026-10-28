# Build notes — sergiopineros.com rebuild (Oct 26, 2026)

Do not deploy until Sergio approves copy and screenshots.

## Audit of the previous site

- Stack kept: Next.js 15 App Router, TypeScript, Tailwind CSS v4, Vercel-ready.
- Removed: GSAP, custom cursor, screen loader, pill nav, bento/work cards, Inter, “brand & product designer” title.
- No analytics, pixels, or form SaaS were present. None added.
- Existing contact address in the repo: `hello@sergioatelier.co` — used in `content/site.ts`. Change there if a sergiopineros.com inbox should replace it.
- Preserved: `/lassie` application page, `public/` SVGs.
- Stan Store URL is `TODO_STAN_URL` and is hidden until a real URL is set in the data file.

## 21st.dev components

Search is free. Three code retrievals were used; paper shaders were not retrieved because they are animated/WebGL-heavy.

1. **Editorial Hero** — id 19075 — felipemenezes098 (`hero-05`)
   - Kept: left factual tagline / right headline + copy grid, quiet wayfinding instead of loud CTAs.
   - Removed: landscape image, motion/framer, Balancer, rounded media, pill CTAs, default colours.
   - Restyled: Baskervville display, paper/ink tokens, type-only, Caveat aside once.

2. **Classic Header with Sheet Menu** — id 26888 — ln-dev7 (`header-17`)
   - Kept: name left, compact nav, mobile disclosure.
   - Removed: logo mark, Sign in, pill “Get started”, Radix Sheet, Lucide, rounded controls, blur.
   - Restyled: sticky paper masthead, hairline rule, `details/summary` menu (works without JS).

3. **Minimal Two-Column Footer** — id 26908 — ln-dev7 (`footer-17`)
   - Kept: closing identity + compact link list + colophon.
   - Removed: logo image, pricing/docs columns, mono credits.
   - Restyled: dark ink field, large Baskervville closing line, paper-coloured hairline, uppercase text links, one Contact link.

Not installed (on purpose): paper design shader (id 6546) and background paper shaders (id 5732) — replaced with a static SVG `feTurbulence` grain overlay at low opacity. Editorial list / herbarium / marquee were not imported; writing and work use hairline index rows.

## Choices made when the prompt left room

- No theme toggle. No ticker. No work photos until Sergio supplies them.
- Contact send path: Resend or `CONTACT_WEBHOOK_URL` if env is set; otherwise a calm error plus the mailto fallback. No new SaaS signup.
- `/lassie` left in place as an existing private page, not linked from the new homepage.

## Still needed from Sergio

1. Final copy pass on every line in `content/site.ts`.
2. Real Stan Store URL.
3. Confirm contact email (currently the atelier address already on the old site).
4. Optional photos: about / hero, Savron, Grafti, Nature, Rebranded specimen.
5. Approval of desktop + mobile screenshots before deploy.
