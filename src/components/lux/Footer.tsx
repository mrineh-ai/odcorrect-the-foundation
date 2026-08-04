import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

const YEAR = 2026;

export function Footer() {
  return (
    <footer className="hairline-t bg-ink">
      <div className="shell py-20 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="inline-flex">
  <Logo width={150} />
</div>
            <p className="body-lux mt-8 max-w-sm">
              A luxury house devoted to timeless clothing, footwear and fragrance. Fewer
              products. Made to deserve their existence.
            </p>
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
                  href="mailto:ceo@odcorrect.in"
                  className="transition-colors duration-700 hover:text-gold"
                >
                  ceo@odcorrect.in
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
