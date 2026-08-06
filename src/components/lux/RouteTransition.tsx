import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Logo } from "./Logo";

/**
 * A short (≈420ms) luxury veil between routes: glass blur, centred logo,
 * soft fade. Purely presentational — never blocks interaction after it clears.
 */
export function RouteTransition() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const first = useRef(true);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setActive(true);
    const t = setTimeout(() => setActive(false), 420);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9998] flex items-center justify-center transition-opacity duration-500"
      style={{
        opacity: active ? 1 : 0,
        visibility: active ? "visible" : "hidden",
        backdropFilter: "blur(26px) saturate(160%)",
        WebkitBackdropFilter: "blur(26px) saturate(160%)",
        background: "color-mix(in oklab, var(--color-ink) 62%, transparent)",
        transitionTimingFunction: "var(--ease-luxury)",
      }}
    >
      <Logo
        width={132}
        style={{
          opacity: active ? 1 : 0,
          transform: active ? "scale(1)" : "scale(0.97)",
          transition: "opacity 500ms var(--ease-luxury), transform 700ms var(--ease-luxury)",
          filter: "contrast(1.2) saturate(1.1)",
        }}
      />
    </div>
  );
}
