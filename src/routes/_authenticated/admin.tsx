import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { listSubmissions } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "House Records — ODCORRECT" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function AdminPage() {
  const navigate = useNavigate();
  const fetchSubmissions = useServerFn(listSubmissions);
  const { data, isPending, error } = useQuery({
    queryKey: ["submissions"],
    queryFn: () => fetchSubmissions({ data: undefined }),
    refetchOnWindowFocus: true,
  });

  const signOut = async () => {
    await supabase.auth.signOut();
    void navigate({ to: "/auth" });
  };

  return (
    <main className="min-h-dvh bg-ink px-6 py-32">
      <div className="shell max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Private</p>
            <h1 className="display-lg mt-6 text-foreground">House Records</h1>
          </div>
          <button type="button" onClick={signOut} className="link-lux text-sm text-muted-foreground">
            Sign out
          </button>
        </div>

        {isPending ? <p className="body-lux mt-16">Loading records…</p> : null}

        {error ? (
          <p className="body-lux mt-16 text-red-400">
            {String((error as Error).message).includes("Forbidden")
              ? "This account does not have house access."
              : "Records could not be loaded."}
          </p>
        ) : null}

        {data ? (
          <>
            <section className="mt-20">
              <h2 className="display-sm text-foreground">
                Enquiries{" "}
                <span className="eyebrow-muted align-middle">({data.enquiries.length})</span>
              </h2>
              {data.enquiries.length === 0 ? (
                <p className="body-lux mt-8">No enquiries yet.</p>
              ) : (
                <ul className="mt-10 divide-y divide-border border-y border-border">
                  {data.enquiries.map((row) => (
                    <li key={row.id} className="py-8">
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <p className="text-foreground">
                          {row.name}{" "}
                          <a href={`mailto:${row.email}`} className="link-lux text-muted-foreground">
                            {row.email}
                          </a>
                        </p>
                        <p className="eyebrow-muted">{formatDate(row.created_at)}</p>
                      </div>
                      {row.subject ? <p className="eyebrow mt-4">{row.subject}</p> : null}
                      <p className="body-lux mt-4 whitespace-pre-line">{row.message}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="mt-24">
              <h2 className="display-sm text-foreground">
                Private List{" "}
                <span className="eyebrow-muted align-middle">({data.waitlist.length})</span>
              </h2>
              {data.waitlist.length === 0 ? (
                <p className="body-lux mt-8">Nobody on the list yet.</p>
              ) : (
                <ul className="mt-10 divide-y divide-border border-y border-border">
                  {data.waitlist.map((row) => (
                    <li key={row.id} className="flex flex-wrap justify-between gap-3 py-5">
                      <a href={`mailto:${row.email}`} className="link-lux text-foreground">
                        {row.email}
                      </a>
                      <p className="eyebrow-muted">
                        {row.source ? `${row.source} · ` : ""}
                        {formatDate(row.created_at)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}
