# Next Upgrade: Launch Readiness — Real Waitlist & Early-Access System

## Why this upgrade

ODCORRECT is a pre-launch luxury house. Every page ends with "Notify Me" or "Subscribe," and the "Coming Soon" page exists solely to capture early interest. Today those forms do nothing — they render but don't persist. The single highest-value upgrade is to make the anticipation real: capture, store, and acknowledge every early supporter, and give the founder a private view of the list before the first collection drops.

This upgrade enables Lovable Cloud (database + email + auth) and wires the existing forms to a real backend, without touching any approved design, layout, animation, typography, or content.

---

## What we will build

### 1. Enable Lovable Cloud
- Activate the managed backend (database, auth, email, storage).
- Confirm the connection and that secrets are available to server functions.

### 2. Database: `waitlist` table
```text
waitlist
├─ id            uuid, pk
├─ email          text, unique, not null
├─ name           text, nullable (optional, collected on Coming Soon page)
├─ source         text  ('home' | 'coming-soon' | 'footer')
├─ ip_hash        text  (privacy-friendly hash, no raw IP stored)
├─ confirmed      boolean default false
├─ confirm_token  text  (unique)
├─ created_at     timestamptz default now()
└─ status         text default 'pending' ('pending' | 'confirmed' | 'unsubscribed')
```
- RLS: only `authenticated` admins can read the list; `anon`/`authenticated` may INSERT only (cannot read others' rows).
- `service_role` used only by the founder admin view.
- Grants + RLS + policies in a single migration per Lovable schema rules.

### 3. Server functions (client-safe `*.functions.ts`)
- `joinWaitlist(email, name?, source?)` — inserts a row, generates a confirm token, fires a confirmation email via Lovable Email.
- `confirmSubscription(token)` — marks `confirmed = true`.
- `unsubscribe(token)` — sets `status = 'unsubscribed'`.
- `listWaitlist()` — protected with `requireSupabaseAuth` + admin role check; returns the list for the founder view.

### 4. Wire the existing forms
- `NotifyForm.tsx` (used on Home + Coming Soon) → calls `joinWaitlist` with `source` set per page.
- Footer email link stays as-is (it's a mailto, not a form).
- On success: show a refined inline confirmation message (no layout change — replace the form area only).
- On duplicate email: graceful "You're already on the list" message.

### 5. Double opt-in email
- Branded confirmation email using the luxury design language (dark, gold, Cormorant).
- Single CTA: "Confirm your early access."
- Unsubscribe link included in every email.

### 6. Founder admin view
- New private route `/founder` (under `_authenticated`).
- Auth gate: founder signs in via Lovable Cloud auth (email + password, or magic link).
- Shows: total signups, confirmed count, recent entries, simple CSV export.
- Minimal luxury styling, reuses existing design tokens. No public link.

### 7. Privacy & legal
- Add a short privacy note under each form: "We never share your address. Unsubscribe anytime."
- Hash IPs (no raw storage) to stay privacy-first.

---

## What we will NOT change
- No redesign, no layout, no color, no typography, no animation changes.
- No new public pages beyond the private `/founder` route.
- Splash screen, header, footer, hero, philosophy, craftsmanship, journal — untouched.
- Existing "Notify Me" buttons keep their style; only their behavior changes.

---

## Out of scope (future upgrades, not this one)
- Shoppable product catalog and pre-order flow (next phase, after launch).
- Journal CMS / editorial workflow (next phase).
- Lovable AI features (image generation, chat) — not needed yet.

---

## Technical notes
- Server functions live in `src/lib/waitlist.functions.ts`; DB helpers in `src/lib/waitlist.server.ts`.
- Admin route under `src/routes/_authenticated/founder.tsx` to stay behind the auth gate.
- `requireSupabaseAuth` middleware on the admin server function; `has_role('admin')` check before returning the list.
- One migration creates the table, grants, RLS, and a `confirm_token`-based policy.
