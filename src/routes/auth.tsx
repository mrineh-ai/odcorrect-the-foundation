import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "House Access — ODCORRECT" },
      { name: "description", content: "Private access to the ODCORRECT house records." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) void navigate({ to: "/admin" });
    });
  }, [navigate]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");

    if (mode === "signin") {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (signInError) {
        setError(signInError.message);
        return;
      }
      void navigate({ to: "/admin" });
      return;
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });
    setBusy(false);
    if (signUpError) {
      setError(signUpError.message);
      return;
    }
    setNotice("Account created. Confirm your email address, then sign in.");
    setMode("signin");
  };

  return (
    <main className="flex min-h-dvh items-center justify-center bg-ink px-6 py-32">
      <div className="w-full max-w-sm">
        <p className="eyebrow">Private</p>
        <h1 className="display-lg mt-6 text-foreground">House Access</h1>
        <p className="body-lux mt-6 text-sm">
          This area is reserved for the house. It is not part of the public site.
        </p>

        <form onSubmit={onSubmit} className="mt-12 space-y-6">
          <div>
            <label htmlFor="email" className="eyebrow-muted block">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-3 w-full border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors focus:border-gold"
            />
          </div>
          <div>
            <label htmlFor="password" className="eyebrow-muted block">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-3 w-full border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors focus:border-gold"
            />
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          {notice ? <p className="text-sm text-gold">{notice}</p> : null}

          <button type="submit" disabled={busy} className="btn-lux-gold w-full disabled:opacity-60">
            {busy ? "One moment…" : mode === "signin" ? "Enter" : "Create Account"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError("");
          }}
          className="link-lux mt-10 text-sm text-muted-foreground"
        >
          {mode === "signin" ? "Create the first account" : "I already have an account"}
        </button>
      </div>
    </main>
  );
}
