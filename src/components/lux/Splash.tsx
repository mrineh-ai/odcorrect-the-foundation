import { useCallback, useEffect, useRef, useState } from "react";

const SESSION_KEY = "odcorrect:splash-seen";
const MAX_DURATION = 7000;
const SPLASH_SRC = "/odcorrect-splash.mp4";

/**
 * First experience: the brand splash film with the official logo centred.
 * Plays once per session, then fades seamlessly into the site.
 */
export function Splash() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const seen = typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY);
    if (!seen) {
      setActive(true);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const dismiss = useCallback(() => {
    setLeaving(true);
    sessionStorage.setItem(SESSION_KEY, "1");
    document.body.style.overflow = "";
    window.setTimeout(() => setActive(false), 1200);
  }, []);

  useEffect(() => {
    if (!active) return;
    const timer = window.setTimeout(dismiss, MAX_DURATION);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") dismiss();
    };
    // Some mobile browsers reject autoplay until nudged.
    videoRef.current?.play().catch(() => {});
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [active, dismiss]);

  if (!mounted || !active) return null;

  return (
    <div
      role="presentation"
      aria-label="ODCORRECT introduction"
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-ink"
      style={{
        opacity: leaving ? 0 : 1,
        transition: "opacity 1200ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div className="relative flex w-full max-w-[1100px] items-center justify-center px-6">
        <video
          ref={videoRef}
          className="h-auto max-h-[72vh] w-full object-contain"
          src={SPLASH_SRC}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={dismiss}
          onError={dismiss}
        />
      </div>
      <button
        type="button"
        onClick={dismiss}
        className="absolute bottom-10 right-8 eyebrow-muted transition-colors duration-700 hover:text-gold"
      >
        Skip
      </button>
    </div>
  );
}
