# ODCORRECT — What to do next to make it truly professional

I audited every page in a real browser (home, about, collections, craftsmanship, journal, coming-soon, contact, privacy, terms). The design, header behaviour, metadata and animations are in good shape: no console errors, no broken images, every page has a single H1, unique title/description, canonical and breadcrumb JSON-LD.

What separates it from a professional house site today is **function, not looks**. Three real gaps:

1. **Both forms are dead ends.** The Notify form and the Contact form validate the input, then show "not available yet". A visitor who wants in cannot get in, and you never learn they came. This is the single biggest issue.
2. **The Journal has no articles.** Five entries exist with titles and excerpts, but every card links back to `/journal#slug`. Clicking a story does nothing — the strongest SEO and brand asset on the site is unreadable.
3. **No visibility.** No analytics, no way to know traffic, sources, or which page holds attention.

---

## Phase 1 — Make the house reachable (highest priority)

Enable Lovable Cloud (built-in database + server logic, no external accounts) and wire both forms for real.

- **Waitlist**: a `waitlist` table (email, source page, timestamp). Notify form writes to it, dedupes repeat emails, and returns a proper editorial confirmation — "You are on the list. We will write to you before the first chapter." Errors handled honestly.
- **Contact**: an `enquiries` table (name, email, subject, message, timestamp) plus the same restrained confirmation state.
- **Email notification to ceo@odcorrect.in** whenever a contact enquiry arrives, so nothing sits unread. Requires a sending service (Resend) — I will ask before setting that up.
- Basic anti-abuse: honeypot field and per-submission rate limiting.

No visual change: same fields, same typography, same buttons. Only the states become real.

## Phase 2 — Give the Journal real articles

- New route `/journal/$slug` — a proper editorial reading page: eyebrow chapter, serif headline, hero image, long-form body set at a comfortable measure, and a "Next chapter" link at the foot.
- Write the full body for all five existing chapters in the current house voice.
- Each article gets its own title, description, canonical, `og:image` from its hero, and `Article` JSON-LD with a real `datePublished`.
- Journal cards and the homepage preview link to the article instead of an anchor.
- Add the article URLs to `sitemap.xml`.

This is the change most likely to bring search traffic before a product exists.

## Phase 3 — Trust and polish

- **Analytics** so you can see visitors, sources and drop-off.
- **Legal**: privacy policy currently describes no data collection — it must be updated once forms store emails (what is collected, why, retention, how to request deletion). Add a short cookie/analytics line.
- **Sitemap**: add `lastmod` per page from real publish dates, not build time.
- **Social profiles**: the JSON-LD `sameAs` lists Instagram, LinkedIn and X handles. If those accounts do not exist, they should be removed — invalid profile links weaken the entity signal.
- **Accessibility pass**: focus-visible on every interactive element, form errors announced, reduced-motion respected across the reveal animations.
- **Performance**: convert the editorial photography to WebP with correct `width`/`height`; the hero JPEG alone is ~160KB and several more load below the fold.

## Phase 4 — Optional depth (only if you want it)

- Press / stockist enquiry as a separate contact reason.
- A private "First Chapter" preview page for waitlist members.
- Product-level pages under Collections once the first pieces exist.

---

## Technical notes

- Lovable Cloud provides the database, row-level security and server functions; forms submit through TanStack server functions, not client-side inserts.
- Waitlist and enquiry tables are insert-only for the public with no public read, so no submitted email is ever exposed.
- Journal content stays in `src/data/journal.ts` (extended with a `body` field and `publishedAt`) — no CMS needed at this stage.
- No layout, colour, typography, animation or header behaviour changes anywhere in this plan.

## Suggested order

Phase 1 first — it stops losing interested visitors from today. Phase 2 next, then Phase 3.
