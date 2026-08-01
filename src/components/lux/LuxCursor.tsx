import { useEffect, useRef, useState } from "react";

/** Premium trailing cursor ring — desktop pointer devices only. */
export function LuxCursor() {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let frame = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x - 2}px, ${y - 2}px, 0)`;
      }
      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest("a, button, input, [role='button']");
      if (ringRef.current) {
        ringRef.current.style.width = interactive ? "48px" : "26px";
        ringRef.current.style.height = interactive ? "48px" : "26px";
        ringRef.current.style.opacity = interactive ? "0.9" : "0.45";
      }
    };

    const loop = () => {
      rx += (x - rx) * 0.13;
      ry += (y - ry) * 0.13;
      if (ringRef.current) {
        const size = parseFloat(ringRef.current.style.width || "26");
        ringRef.current.style.transform = `translate3d(${rx - size / 2}px, ${ry - size / 2}px, 0)`;
      }
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move, { passive: true });
    loop();
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      <div
        ref={ringRef}
        className="absolute left-0 top-0 rounded-full border border-gold"
        style={{
          width: 26,
          height: 26,
          opacity: 0.45,
          transition: "width 600ms cubic-bezier(0.16,1,0.3,1), height 600ms cubic-bezier(0.16,1,0.3,1), opacity 600ms",
        }}
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1 w-1 rounded-full bg-gold"
        style={{ opacity: 0.85 }}
      />
    </div>
  );
}
