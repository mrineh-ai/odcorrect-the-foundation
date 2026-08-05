# ODCORRECT Production Upgrade

Production hardening only. No redesign — layout, aesthetic, animations, typography, colors, glass effects and responsive behaviour stay exactly as approved.

---

## 1. Production SEO metadata

`src/routes/__root.tsx` already carries a full metadata block; it gets updated in place rather than rebuilt.

- Title → `ODCORRECT | Luxury Fashion House | Clothing • Footwear • Fragrance`
- Description → the new 158-character description supplied.
- Keywords → the full 16-term list.
- Robots → `index, follow, max-image-preview:large`
- Author → `Mrinal Gahlaut`; publisher → `ODCORRECT`; language `en`.
- Theme color: keep the existing dual `prefers-color-scheme` entries so it tracks light/dark automatically.
- Canonical: `https://odcorrect.in` at root, and a self-referencing canonical on every leaf route (canonical lives on leaves only — a root canonical would duplicate).

Per-page `head()` on every route (`/`, `/about`, `/collections`, `/craftsmanship`, `/journal`, `/coming-soon`, `/contact`, `/founder`, `/privacy-policy`, `/terms`) gets its own title, description, `og:title`, `og:description`, `og:url` and canonical. No page reuses the homepage copy.

## 2. Open Graph & Twitter

Root defaults, overridden per page:

- `og:site_name` ODCORRECT, `og:type` website, `og:url` https://odcorrect.in
- `og:title` / `og:description` per the supplied copy
- `og:image` → a single `OG_IMAGE` constant in `src/lib/seo.ts` pointing at the logo today, so a dedicated share image is a one-line swap later.
- Twitter: `summary_large_image`, title, description, image (same constant).

## 3. Structured data (JSON-LD)

Root: Organization (name, url, logo, description, slogan, founder + CEO as `Person: Mrinal Gahlaut`, `ContactPoint` with ceo@odcorrect.in, `sameAs` social placeholders), Brand, and WebSite with a `SearchAction`.

Leaf routes: `BreadcrumbList` on every non-home page. The founder page also carries a `Person` schema for Mrinal Gahlaut.

## 4. Favicon audit

`public/` already contains `favicon.ico`, 16x16, 32x32, apple-touch-icon, both android-chrome sizes and `site.webmanifest`. This pass verifies each one is actually rendered from the ODCORRECT logo (not a leftover default), confirms the manifest name/theme colours, adds `browserconfig.xml` with the msapplication tile, and greps the whole project for any remaining Lovable branding reference.

## 5. New page — `/founder`, "Meet the Founder"

New file `src/routes/founder.tsx`, built entirely from the existing design tokens and `Reveal` / `DustField` components so it reads as part of the same house. Sections in order:

1. **Hero** — eyebrow "Meet the Founder", name in the display serif, "Founder & CEO", large portrait, slow fade reveal.
2. **Founder letter** — a long, personal, restrained letter covering why ODCORRECT exists, why luxury should outlive trends, fewer products, craftsmanship, details, timelessness, and building a house rather than a brand. Signed `— Mrinal Gahlaut / Founder / ODCORRECT`.
3. **Timeline** — Vision, Foundation, Future Collections, Footwear, Fragrance, Global House, as a hairline vertical editorial timeline.
4. **Philosophy** — expanded section on timelessness, craftsmanship, patience, luxury, minimalism, perfection, purpose, quality over quantity.
5. **Personal values** — five cards: design over trends, quality over quantity, craft over speed, luxury through restraint, long-term thinking.
6. **Signature quote** — large centred editorial typography: *"We are not here to create more fashion. We are here to create fewer things worth remembering."*

`Founder` is added to the header nav (desktop + mobile) and to the footer links.

## 6. Homepage changes

- **Remove** the founder letter section entirely from `src/routes/index.tsx` (portrait, letter, signature block). No empty spacing left behind.
- **Add "Explore the House"** — a restrained link grid: About, Craftsmanship, Collections, Journal, Founder, Coming Soon, styled with the existing `link-lux` / hairline treatment.
- **"The House" editorial cards** — the homepage already has a three-up category section driven by `src/data/categories.ts` (Luxury Clothing / Premium Footwear / Signature Fragrances). Rather than adding a second near-identical three-card block, this section is retitled **The House**, the three supplied taglines are used verbatim, and each card carries a discreet **Coming Soon** marker. Same layout, same images, same animations.

## 7. Performance

Logo preload already present; keep it. Confirm every below-the-fold image uses `loading="lazy"` with explicit `width`/`height` (prevents layout shift), keep `fetchPriority="high"` on the hero only, and confirm fonts stay on `display=swap` with existing preconnects.

## 8. Accessibility

Audit pass, no visual change: single `<main>` per page, correct h1→h2→h3 order on the new founder page, `aria-label` on every icon-only control, visible focus indicators on links and buttons, keyboard reachability of the mobile menu, and contrast check on gold-on-dark and gold-on-light text.

## 9. UX polish (subtle only)

- Underline-sweep hover on nav links using the existing easing curve.
- Slightly smoother button hover transitions.
- Image reveal + scroll animations tuned via the existing `Reveal` component (timing only, no new animation style).

## 10. Final check

No Lovable branding, no placeholder text, no broken images, no console errors, page ends at the footer, responsive at desktop / 412px Android / 390px iPhone. Verified with Playwright across viewports plus a typecheck.

---

## Technical notes

- New: `src/routes/founder.tsx`, `src/lib/seo.ts` (shared constants: site URL, OG image, description, keywords, breadcrumb helper), `public/browserconfig.xml`.
- Edited: `src/routes/__root.tsx` (metadata + JSON-LD), every route file (`head()`), `src/routes/index.tsx` (remove founder section, add Explore the House, retitle The House), `src/components/lux/Header.tsx` and `Footer.tsx` (Founder link).
- Canonical tags go on leaf routes only — TanStack concatenates `links`, so a root canonical would emit duplicates.
- `og:image` stays out of `__root` per-leaf overrides where a page has its own hero image.
