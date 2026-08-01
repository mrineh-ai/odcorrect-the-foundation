import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/collections", label: "Collections" },
  { to: "/craftsmanship", label: "Craftsmanship" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-[500] transition-all duration-1000"
      style={{
        backgroundColor: scrolled ? "oklch(0.092 0 0 / 0.86)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid oklch(1 0 0 / 8%)" : "1px solid transparent",
      }}
    >
      <div className="shell flex items-center justify-between py-5">
        <Link to="/" aria-label="ODCORRECT home" className="shrink-0">
          <Logo width={scrolled ? 92 : 110} priority className="transition-all duration-1000" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-10 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="link-lux"
              activeProps={{ style: { color: "var(--gold)" } }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link to="/coming-soon" className="btn-lux-gold !px-7 !py-3">
            Notify Me
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 flex-col items-end justify-center gap-[7px] lg:hidden"
        >
          <span
            className="block h-px bg-foreground transition-all duration-700"
            style={{ width: open ? 24 : 28, transform: open ? "rotate(45deg) translateY(4px)" : "none" }}
          />
          <span
            className="block h-px bg-foreground transition-all duration-700"
            style={{ width: open ? 24 : 18, transform: open ? "rotate(-45deg) translateY(-4px)" : "none" }}
          />
        </button>
      </div>

      <div
        id="mobile-nav"
        className="fixed inset-0 top-0 z-[490] flex flex-col justify-center bg-ink px-8 lg:hidden"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 800ms cubic-bezier(0.16,1,0.3,1)",
        }}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-7">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="display-md text-foreground"
              activeProps={{ style: { color: "var(--gold)" } }}
              activeOptions={{ exact: item.to === "/" }}
              tabIndex={open ? 0 : -1}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-14">
          <Link to="/coming-soon" className="btn-lux-gold" tabIndex={open ? 0 : -1}>
            Notify Me
          </Link>
        </div>
      </div>
    </header>
  );
}
