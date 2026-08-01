import { useState, type FormEvent } from "react";

interface NotifyFormProps {
  /** Compact variant for tighter sections. */
  compact?: boolean;
  buttonLabel?: string;
  id?: string;
}

/**
 * Newsletter / launch-notification capture.
 * Presentation-only today; the submit handler is the single seam where a
 * backend (Lovable Cloud) or CRM integration will later be attached.
 */
export function NotifyForm({ compact = false, buttonLabel = "Notify Me", id = "notify" }: NotifyFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done">("idle");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("done");
    setEmail("");
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`w-full ${compact ? "max-w-md" : "max-w-xl"}`}
      aria-describedby={`${id}-status`}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor={`${id}-email`} className="eyebrow-muted block">
            Email Address
          </label>
          <input
            id={`${id}-email`}
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-4 w-full border-0 border-b border-border bg-transparent pb-3 text-base font-light tracking-[0.1em] text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none"
            style={{ transition: "border-color 900ms cubic-bezier(0.16,1,0.3,1)" }}
          />
        </div>
        <button type="submit" className="btn-lux shrink-0">
          {buttonLabel}
        </button>
      </div>
      <p
        id={`${id}-status`}
        role="status"
        aria-live="polite"
        className="mt-5 text-xs font-light tracking-[0.22em] text-gold"
        style={{ opacity: status === "done" ? 1 : 0, transition: "opacity 900ms" }}
      >
        {status === "done" ? "Thank you. You are on the list." : "\u00A0"}
      </p>
    </form>
  );
}
