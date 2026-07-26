# Asset Checklist — Sergio Piñeros Portfolio

This site is modeled after [sanvithi.com](https://sanvithi.com/). Replace each placeholder with the asset listed below.

**Recommended formats:** PNG or JPG for photos/mockups, SVG for logos, MP4/WebM for footer animation (optional).

---

## Global / Navigation

| Slot | Location | What to provide | Specs |
|------|----------|-----------------|-------|
| Favicon | Browser tab | Monogram or "S" mark | 32×32 PNG, 180×180 for Apple touch |
| Nav logo | Top-left pill | Wordmark or monogram (optional — currently text) | SVG or PNG, ~120px wide |

---

## Hero Section

No hero asset is required. The blue handwritten layer is rendered as live text
and changes with each tab, matching the reference site's central composition.

Optional future upgrade: provide five transparent handwritten PNG or SVG marks,
one for each hero tab, if you want to replace the live handwritten font.

---

## Project 1 — Savron Brand

| Slot | Location | What to provide | Specs |
|------|----------|-----------------|-------|
| **SAVRON brand hero** | Project card screenshot area | Brand board, logo lockup on signage, business card spread, or shop interior mockup | **1200×800px min**, 3:2 ratio, JPG/PNG |

**Ideal content:** Monogram, color palette swatches, typography specimen, or hero brand photography.

---

## Project 2 — Grafti Brand

| Slot | Location | What to provide | Specs |
|------|----------|-----------------|-------|
| **Grafti brand hero** | Project card screenshot area | Packaging mockup, field guide cover, logo on agrotech product, or campaign visual | **1200×800px min**, 3:2 ratio |

**Ideal content:** Organic/natural brand feel — packaging, logo on green background, marketing collateral.

---

## Project 3 — Sergio & Co. (Studio)

| Slot | Location | What to provide | Specs |
|------|----------|-----------------|-------|
| **Sergio & Co. studio** | Project card screenshot area | Studio brand board, bento grid mockup, or sergioatelier.co homepage screenshot | **1200×800px min**, 3:2 ratio |

**Ideal content:** Monochromatic, silent luxury — sharp typography, minimal layout screenshot.

---

## Project 4 — Savron CRM (Product)

| Slot | Location | What to provide | Specs |
|------|----------|-----------------|-------|
| **Savron CRM product** | Project card screenshot area | Dashboard UI, schedule grid, host view, or booking flow screenshot | **1440×900px min**, 16:10 ratio, PNG |

**Ideal content:** Show the product — host dashboard with time slots, client list, or ePass wallet screen. This is the key asset for AI infra job applications.

**Optional extras for future case study page:**
- Database schema diagram
- User flow wireframes
- Feature highlight screens (Bookings, Communications, Analytics)

---

## Project 5 — Client Automations (Coming Soon)

| Slot | Location | What to provide | Specs |
|------|----------|-----------------|-------|
| **Automation case study** | Project card screenshot area | Workflow diagram, AI agent UI, or before/after automation screenshot | TBD — **1200×800px** when ready |

---

## Footer

| Slot | Location | What to provide | Specs |
|------|----------|-----------------|-------|
| **Footer wordmark animation** (optional) | Large footer logo area | Looping video of wordmark — white default, blue/accent on hover (like sanvithi) | MP4, ~952×314px, muted loop |
| **Résumé PDF** | Footer pill link | Your résumé PDF | PDF file, link in footer |

Currently footer uses text wordmark with hover color change. Add video later if desired.

---

## Social / Links (optional)

| Slot | Location | What to provide |
|------|----------|-----------------|
| LinkedIn URL | Footer pill | Profile link |
| Twitter/X URL | Footer pill | Profile link |
| Résumé URL | Footer pill | Google Drive or direct PDF link |

---

## How to add assets

1. Save files to `public/` folder:
   ```
   public/
     stickers/sticker-1.png … sticker-4.png
     projects/savron.jpg
     projects/grafti.jpg
     projects/sergio-co.jpg
     projects/savron-crm.png
     projects/automations.jpg  (when ready)
   ```

2. Replace placeholders in `components/Portfolio.tsx` and `components/AssetPlaceholder.tsx` with Next.js `<Image>` components pointing to those paths.

---

## Fonts used (free for commercial use)

| Role | Font | License |
|------|------|---------|
| Headlines / descriptions | [Averia Serif Libre](https://fonts.google.com/specimen/Averia+Serif+Libre) | SIL Open Font License |
| Body / UI | [Inclusive Sans](https://fonts.google.com/specimen/Inclusive+Sans) | SIL Open Font License |
| "Coming soon" display | [Caveat](https://fonts.google.com/specimen/Caveat) | SIL Open Font License |

These match sanvithi.com's Averia Serif Libre + Inclusive Sans pairing. Caveat substitutes their custom "Awesome Ways" display font.
