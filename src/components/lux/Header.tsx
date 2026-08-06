import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";


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
    if (!open) return;
    const { body } = document;
    const scrollY = window.scrollY;
    const prev = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };
    // iOS Safari ignores overflow:hidden on body — pin it instead.
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    return () => {
      body.style.overflow = prev.overflow;
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-[500] transition-all duration-700"
      style={{
        backgroundColor: "transparent",
      }}
    >
      <div className="shell flex items-center justify-between py-5">
       <Link
  to="/"
  aria-label="ODCORRECT home"
  className="shrink-0 transition-all duration-1000"
>
  <Logo
    width={scrolled ? 112 : 132}
    priority
    className="transition-all duration-1000"
    style={{ filter: "contrast(1.22) saturate(1.12) drop-shadow(0 1px 2px oklch(0 0 0 / 35%))" }}
  />
</Link>

        <nav aria-label="Primary" className="hidden items-center gap-10 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="link-lux"
              style={{ color: "oklch(0.98 0 0 / 0.92)" }}
              activeProps={{ style: { color: "var(--gold)" } }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <ThemeToggle />
          <Link
            to="/coming-soon"
            className="btn-lux-gold !px-7 !py-3"
            style={{ color: "oklch(0.98 0 0 / 0.95)", borderColor: "oklch(0.98 0 0 / 0.55)" }}
          >
            Notify Me
          </Link>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 flex-col items-end justify-center gap-[7px]"
          >
            <span
              className="block h-px transition-all duration-700"
              style={{ backgroundColor: "oklch(0.98 0 0 / 0.95)", width: open ? 24 : 28, transform: open ? "rotate(45deg) translateY(4px)" : "none" }}
            />
            <span
              className="block h-px transition-all duration-700"
              style={{ backgroundColor: "oklch(0.98 0 0 / 0.95)", width: open ? 24 : 18, transform: open ? "rotate(-45deg) translateY(-4px)" : "none" }}
            />
          </button>
        </div>

      </div>

      <div
        id="mobile-nav"
        className="fixed inset-0 z-[600] flex h-[100dvh] w-screen flex-col justify-center overflow-y-auto overscroll-contain bg-ink px-8 py-24 lg:hidden"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-8px)",
          visibility: open ? "visible" : "hidden",
          pointerEvents: open ? "auto" : "none",
          transition:
            "opacity 600ms cubic-bezier(0.16,1,0.3,1), transform 600ms cubic-bezier(0.16,1,0.3,1), visibility 600ms",
        }}
        aria-hidden={!open}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          tabIndex={open ? 0 : -1}
          className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors duration-500 hover:text-gold"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>

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
