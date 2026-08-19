import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { joinWaitlist } from "@/lib/forms.functions";

interface NotifyFormProps {
  /** Compact variant for tighter sections. */
  compact?: boolean;
  buttonLabel?: string;
  id?: string;
  /** Recorded with the entry so we know which page brought them in. */
  source?: string;
}

/**
 * Private-list capture. Submissions are stored server-side; the form never
 * reports success without a confirmed write.
 */
export function NotifyForm({
  compact = false,
  buttonLabel = "Notify Me",
  id = "notify",
  source,
}: NotifyFormProps) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const submit = useServerFn(joinWaitlist);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) return;
    setStatus("sending");
    try {
      const result = await submit({
        data: { email, ...(source ? { source } : {}), ...(company ? { company } : {}) },
      });
      setStatus(result.ok ? "done" : "error");
      setMessage(result.message);
      if (result.ok) setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something interrupted us. Please try again in a moment.");
    }
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
              setMessage("");
            }}
            aria-invalid={status === "error"}
            placeholder="you@example.com"
            className="form-field mt-4"
            disabled={status === "sending"}
          />
        </div>
        <button type="submit" className="btn-lux-gold shrink-0" disabled={status === "sending"}>
          {status === "sending" ? "Sending" : buttonLabel}
        </button>
      </div>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor={`${id}-company`}>Company</label>
        <input
          id={`${id}-company`}
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <p
        id={`${id}-status`}
        role="status"
        aria-live="polite"
        className="mt-5 min-h-5 text-xs font-light tracking-[0.16em] text-muted-foreground"
      >
        {message || "\u00A0"}
      </p>
    </form>
  );
}
