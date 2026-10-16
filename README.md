# Obsidian Detail Studio — premium detailing website (demo)

Next.js 16 · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger · Lenis · Lucide.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static production build
```

## Before going live — owner must supply

Nothing below has been invented. Missing values render as dashed **"Owner to provide"** tags.

| What | Where |
| --- | --- |
| Trading name (the "Obsidian" brand is a demo placeholder), phone, WhatsApp, email, address, hours, service area, review link, social links | `src/content/business.ts` |
| Set `verified: true` once confirmed (enables LocalBusiness JSON-LD) | `src/content/business.ts` |
| Production URL | `NEXT_PUBLIC_SITE_URL` env var |
| Genuine customer reviews only | `reviews` in `src/content/site.ts` |
| Package inclusions and prices | `packages` in `src/content/site.ts` |
| Service starting prices (optional) | `startingPrice` in `src/content/services.ts` |
| Studio photography, plus real before/after pairs | `src/content/media.ts` (currently illustrative Unsplash stock) |
| Coating packages and warranty, certifications, product brands | Coating and Why Us sections |
| Logo artwork | `src/components/ui/Logo.tsx`, `src/app/icon.svg` |
| Privacy and terms review | `src/app/privacy`, `src/app/terms` (templates only) |

## Booking flow

There is no booking backend. The form validates, then opens WhatsApp (if `whatsapp` is set) or email (if `email` is set) with the enquiry pre-filled. With neither set, it runs in clearly labelled demo mode and sends nothing. The site never shows a booking as confirmed.

## Structure

- `src/content/*` — all copy and data (services, packages, gallery, journey, business)
- `src/components/sections/*` — one component per page section
- `src/app/services/[slug]` — statically generated page for each service (SEO)
- Motion respects `prefers-reduced-motion`. The horizontal "journey" section pins only on desktop.
