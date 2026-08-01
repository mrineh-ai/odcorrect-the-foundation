import { useEffect, useState } from "react";

/** Launch target — first day of the house. */
export const LAUNCH_DATE = new Date("2027-03-01T00:00:00Z");

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

function diff(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

export function Countdown({ target = LAUNCH_DATE }: { target?: Date }) {
  const [time, setTime] = useState(() => diff(target));
  const [live, setLive] = useState(false);

  useEffect(() => {
    setLive(true);
    const t = window.setInterval(() => setTime(diff(target)), 1000);
    return () => window.clearInterval(t);
  }, [target]);

  return (
    <div
      className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4"
      role="timer"
      aria-label="Time remaining until the first ODCORRECT release"
    >
      {UNITS.map((u) => (
        <div key={u.key} className="glass-sheen bg-ink px-6 py-10 text-center sm:px-10 sm:py-14">
          <div
            className="font-display text-5xl font-light tabular-nums text-foreground sm:text-6xl"
            style={{ opacity: live ? 1 : 0.35, transition: "opacity 1200ms" }}
          >
            {String(time[u.key]).padStart(2, "0")}
          </div>
          <div className="eyebrow-muted mt-5">{u.label}</div>
        </div>
      ))}
    </div>
  );
}
