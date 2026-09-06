import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import emblemAsset from "@/assets/odcorrect-emblem.png.asset.json";


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
  const { count, ready } = useCart();

  // A single page-position observer controls visibility. It never uses scroll
  // direction: the home page watches its hero, while every other route watches
  // the shared top sentinel rendered by the root layout.
  useLayoutEffect(() => {
    setHidden(false);
    setScrolled(false);

    const frame = window.requestAnimationFrame(() => {
      const target =
        pathname === "/"
          ? document.getElementById("hero")
          : document.getElementById("page-top-sentinel");

      if (!target) {
        setHidden(window.scrollY > 24);
        setScrolled(window.scrollY > 24);
        return;
      }

      const rect = target.getBoundingClientRect();
      const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
      setHidden(!isVisible);
      setScrolled(!isVisible);

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return;
          setHidden(!entry.isIntersecting);
          setScrolled(!entry.isIntersecting);
        },
        { threshold: 0 },
      );

      observer.observe(target);
      observerRef = observer;
    });

    let observerRef: IntersectionObserver | undefined;
    return () => {
      window.cancelAnimationFrame(frame);
      observerRef?.disconnect();
    };
  }, [pathname]);


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
          <span
            className="flex items-center justify-center rounded-full transition-all duration-1000"
            style={{
              width: scrolled ? 40 : 46,
              height: scrolled ? 40 : 46,
              background: "linear-gradient(145deg, #ffffff 0%, #f2f2f2 60%, #e4e4e4 100%)",
              boxShadow:
                "inset 0 1px 2px oklch(1 0 0 / 90%), inset 0 -2px 4px oklch(0 0 0 / 8%), 0 2px 6px oklch(0 0 0 / 35%), 0 6px 18px oklch(0 0 0 / 28%)",
            }}
          >
            <img
              src={emblemAsset.url}
              alt="ODCORRECT"
              width={scrolled ? 30 : 35}
              height={scrolled ? 30 : 35}
              className="block rounded-full object-contain transition-all duration-1000"
              style={{ width: "76%", height: "76%" }}
              loading="eager"
              decoding="async"
            />
          </span>
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

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            to="/coming-soon"
            className="link-lux"
            style={{ color: "oklch(0.98 0 0 / 0.92)" }}
          >
            Notify Me
          </Link>
          <Link to="/shop" className="btn-shop">
            Shop
          </Link>
          <Link
            to="/cart"
            aria-label={`Cart${ready && count > 0 ? `, ${count} items` : ""}`}
            className="relative px-1 text-[0.66rem] uppercase tracking-[0.3em] transition-colors duration-300 hover:text-gold"
            style={{ color: "oklch(0.98 0 0 / 0.92)" }}
          >
            Cart
            {ready && count > 0 ? (
              <span className="ml-2 text-gold">({count})</span>
            ) : null}
          </Link>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <Link to="/shop" className="btn-shop !px-5 !py-2.5">
            Shop
          </Link>
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
          backgroundColor: "color-mix(in oklch, var(--background) 68%, transparent)",
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
        <div className="mt-12 flex flex-col gap-5">
          <Link to="/shop" className="btn-shop w-full" tabIndex={open ? 0 : -1}>
            Shop the Collection
          </Link>
          <Link to="/cart" className="btn-lux w-full" tabIndex={open ? 0 : -1}>
            Cart{ready && count > 0 ? ` (${count})` : ""}
          </Link>
          <Link to="/coming-soon" className="btn-lux-gold w-full" tabIndex={open ? 0 : -1}>
            Notify Me
          </Link>
        </div>
      </div>

    </header>
  );
}
