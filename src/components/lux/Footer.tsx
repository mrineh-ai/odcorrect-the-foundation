import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

const YEAR = new Date().getFullYear();

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: "M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 3.4A6.4 6.4 0 1 0 18.4 12 6.4 6.4 0 0 0 12 5.6Zm0 10.6A4.2 4.2 0 1 1 16.2 12 4.2 4.2 0 0 1 12 16.2Zm6.6-10.9a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5Z",
  },
  {
    label: "X",
    href: "https://x.com",
    path: "M18.2 2.5h3.3l-7.2 8.2 8.4 11.1h-6.6l-5.2-6.8-5.9 6.8H1.7l7.7-8.8L1.3 2.5h6.8l4.7 6.2Zm-1.2 17.4h1.8L7.1 4.4H5.2Z",
  },
  {
    label: "Pinterest",
    href: "https://pinterest.com",
    path: "M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5.1s-.3-.6-.3-1.5c0-1.4.8-2.5 1.8-2.5.9 0 1.3.6 1.3 1.4 0 .9-.6 2.2-.9 3.4-.2 1 .5 1.9 1.6 1.9 1.9 0 3.2-2.4 3.2-5.2 0-2.2-1.4-3.8-4-3.8a4.6 4.6 0 0 0-4.8 4.6c0 .9.3 1.5.7 2 .2.2.2.3.1.6l-.2.8c-.1.2-.2.3-.5.2-1.3-.6-2-2.3-2-3.7 0-3 2.5-6.6 7.4-6.6 3.9 0 6.5 2.8 6.5 5.9 0 4-2.2 7-5.5 7-1.1 0-2.1-.6-2.5-1.3l-.7 2.7c-.2.9-.8 2-1.2 2.6A10 10 0 1 0 12 2Z",
  },
];

export function Footer() {
  return (
    <footer className="hairline-t bg-ink">
      <div className="shell py-20 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo width={150}  />
            <p className="body-lux mt-8 max-w-sm">
              A luxury house devoted to timeless clothing, footwear and fragrance. Fewer
              products. Made to deserve their existence.
            </p>
            <div className="mt-10 flex items-center gap-6">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`ODCORRECT on ${s.label}`}
                  className="text-muted-foreground transition-colors duration-700 hover:text-gold"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="eyebrow-muted">House</h2>
            <ul className="mt-7 space-y-4">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/collections", label: "Collections" },
                { to: "/craftsmanship", label: "Craftsmanship" },
                { to: "/journal", label: "Journal" },
                { to: "/coming-soon", label: "Coming Soon" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm font-light tracking-[0.14em] text-muted-foreground transition-colors duration-700 hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="eyebrow-muted">Legal</h2>
            <ul className="mt-7 space-y-4">
              {[
                { to: "/privacy-policy", label: "Privacy Policy" },
                { to: "/terms", label: "Terms &amp; Conditions" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm font-light tracking-[0.14em] text-muted-foreground transition-colors duration-700 hover:text-gold"
                  >
                    {l.label.replace("&amp;", "&")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="eyebrow-muted">Enquiries</h2>
            <ul className="mt-7 space-y-4 text-sm font-light tracking-[0.14em] text-muted-foreground">
              <li>
                <a
                  href="mailto:house@odcorrect.com"
                  className="transition-colors duration-700 hover:text-gold"
                >
                  house@odcorrect.com
                </a>
              </li>
              <li>New Delhi &middot; India</li>
            </ul>
          </div>
        </div>

        <div className="hairline-t mt-20 flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-light tracking-[0.24em] text-muted-foreground">
            &copy; {YEAR} ODCORRECT. All rights reserved.
          </p>
          <p className="text-xs font-light tracking-[0.34em] text-muted-foreground uppercase">
            Unlearn What&apos;s Right
          </p>
        </div>
      </div>
    </footer>
  );
}
