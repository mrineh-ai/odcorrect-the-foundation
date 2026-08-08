import { useState, type FormEvent } from "react";

interface NotifyFormProps {
  /** Compact variant for tighter sections. */
  compact?: boolean;
  buttonLabel?: string;
  id?: string;
}

/**
 * Newsletter / launch-notification capture.
 * The form remains honest until a mailing-list endpoint is connected: it
 * never reports a successful subscription without a confirmed submission.
 */
export function NotifyForm({ compact = false, buttonLabel = "Notify Me", id = "notify" }: NotifyFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error">("idle");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) return;
    setStatus("error");
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
            onChange={(e) => {
              setEmail(e.target.value);
              setStatus("idle");
            }}
            aria-invalid={status === "error"}
            placeholder="you@example.com"
            className="form-field mt-4"
          />
        </div>
        <button type="submit" className="btn-lux-gold shrink-0">
          {buttonLabel}
        </button>
      </div>
      <p
        id={`${id}-status`}
        role="status"
        aria-live="polite"
        className="mt-5 min-h-5 text-xs font-light tracking-[0.16em] text-muted-foreground"
      >
        {status === "error"
          ? "Online registration is not available yet. Please try again later."
          : "\u00A0"}
      </p>
    </form>
  );
}
