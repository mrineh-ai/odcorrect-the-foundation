import { useTheme } from "@/lib/theme";

/** Apple-style sliding theme switch. Purely presentational, no layout impact. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isLight}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      title={isLight ? "Dark theme" : "Light theme"}
      className={`relative inline-flex h-8 w-[3.35rem] shrink-0 items-center rounded-full ${className}`}
      style={{
        border: "1px solid oklch(0 0 0 / 12%)",
        backgroundColor: isLight ? "oklch(0 0 0 / 6%)" : "oklch(0.24 0 0 / 88%)",
        transition: "background-color 400ms var(--ease-luxury), border-color 400ms var(--ease-luxury)",
      }}
    >
      <span
        className="absolute flex h-6 w-6 items-center justify-center rounded-full"
        style={{
          left: 3,
          transform: isLight ? "translateX(0)" : "translateX(1.35rem)",
          transition: "transform 420ms var(--ease-luxury), background-color 400ms var(--ease-luxury)",
          backgroundColor: isLight ? "oklch(1 0 0)" : "var(--gold)",
          boxShadow: "0 1px 4px oklch(0 0 0 / 18%)",
        }}
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isLight ? "var(--gold-dim)" : "oklch(0.16 0 0)"}
          strokeWidth="1.4"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {isLight ? (
            <>
              <circle cx="12" cy="12" r="4.2" />
              <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6" />
            </>
          ) : (
            <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
          )}
        </svg>
      </span>
    </button>
  );
}
