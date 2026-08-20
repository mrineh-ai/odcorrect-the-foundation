import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/lux/PageHero";
import { Reveal } from "@/components/lux/Reveal";
import { JournalCard } from "@/components/lux/JournalCard";
import { NotifyForm } from "@/components/lux/NotifyForm";
import { JOURNAL_ENTRIES } from "@/data/journal";
import { absoluteUrl, breadcrumbLd, OG_IMAGE } from "@/lib/seo";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "The Journal — Notes From The House | ODCORRECT" },
      {
        name: "description",
        content:
          "Essays on craftsmanship, luxury materials, design philosophy and the future of luxury, written from inside the ODCORRECT atelier.",
      },
      { property: "og:title", content: "The Journal — ODCORRECT" },
      {
        property: "og:description",
        content:
          "Craftsmanship, materials, design philosophy and the future of luxury — notes from the house.",
      },

      { property: "og:url", content: absoluteUrl("/journal") },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/journal") }],
    scripts: [breadcrumbLd([{ name: "Journal", path: "/journal" }])],
  }),
  component: Journal,
});

function Journal() {
  return (
    <main>
      <PageHero
        eyebrow="The Journal"
        title="Notes from the house."
        intro="Chapters written while the first collection is being made. Previews only — the full entries will be published as the house opens."
      />

      <section className="section-pad bg-background">
        <div className="shell">
          <div className="grid gap-16 md:grid-cols-2 lg:gap-20">
            {JOURNAL_ENTRIES.map((entry, i) => (
              <JournalCard key={entry.slug} entry={entry} delay={(i % 2) * 140} />
            ))}
          </div>
          <Reveal className="mt-24 text-center">
            <p className="eyebrow-muted">Full entries publish with the first chapter</p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad hairline-t bg-ink">
        <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <p className="eyebrow">Correspondence</p>
            <h2 className="display-lg mt-8 text-foreground">Become One Of The First.</h2>
          </Reveal>
          <Reveal delay={140} className="flex flex-col justify-end">
            <p className="body-lux">
              New chapters, launch announcements and exclusive previews, sent rarely.
            </p>
            <div className="mt-10">
              <NotifyForm id="journal-notify" buttonLabel="Subscribe" source="journal" />
            </div>
            <div className="mt-10">
              <Link to="/about" className="link-lux">
                About The House
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
