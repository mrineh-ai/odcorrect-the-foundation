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
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const delta = y - last;
      setScrolled(y > 24);
      // ignore micro-movements and rubber-banding to avoid flicker
      if (Math.abs(delta) < 6 || y < 0) return;
      if (delta > 0 && y > 120) setHidden(true);
      else if (delta < 0) setHidden(false);
      last = y;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    setScrolled(window.scrollY > 24);
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
      className="fixed inset-x-0 top-0 z-[500] will-change-transform"
      style={{
        backgroundColor: "transparent",
        transform: hidden && !open ? "translateY(-100%)" : "translateY(0)",
        opacity: hidden && !open ? 0 : 1,
        transition:
          "transform 520ms cubic-bezier(0.16,1,0.3,1), opacity 380ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div className="shell flex items-center justify-between py-5">
       <Link
  to="/"
  aria-label="ODCORRECT home"
  className="-ml-1 shrink-0 px-1 py-1 transition-all duration-1000"
>
  <Logo
    width={scrolled ? 124 : 145}
    priority
    className="transition-all duration-1000"
    style={{
      filter:
        "contrast(1.3) saturate(1.16) brightness(1.06) drop-shadow(0 1px 3px oklch(0 0 0 / 30%))",
    }}
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
        className="fixed inset-0 z-[600] flex h-[100dvh] w-screen flex-col justify-center overflow-y-auto overscroll-contain px-8 py-24 lg:hidden"
        style={{
          backgroundColor: "color-mix(in oklch, var(--background) 55%, transparent)",
          backdropFilter: "blur(30px) saturate(180%)",
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
