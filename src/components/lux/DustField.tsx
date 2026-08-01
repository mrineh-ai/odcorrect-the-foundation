import { useEffect, useRef } from "react";

/** Floating particles inspired by dust suspended in soft light. */
export function DustField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Mote = { x: number; y: number; r: number; vx: number; vy: number; a: number };
    let motes: Mote[] = [];

    const build = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = rect?.width ?? window.innerWidth;
      height = rect?.height ?? window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(70, Math.round((width * height) / 26000));
      motes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.3 + 0.3,
        vx: (Math.random() - 0.5) * 0.08,
        vy: -(Math.random() * 0.14 + 0.02),
        a: Math.random() * 0.35 + 0.06,
      }));
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      for (const m of motes) {
        m.x += m.vx;
        m.y += m.vy;
        if (m.y < -10) {
          m.y = height + 10;
          m.x = Math.random() * width;
        }
        if (m.x < -10) m.x = width + 10;
        if (m.x > width + 10) m.x = -10;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 169, 106, ${m.a})`;
        ctx.fill();
      }
      frame = requestAnimationFrame(tick);
    };

    build();
    tick();
    window.addEventListener("resize", build);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", build);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  );
}
