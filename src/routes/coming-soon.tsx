import { createFileRoute } from "@tanstack/react-router";
import categoryFragrance from "@/assets/category-fragrance.jpg";
import { PageHero } from "@/components/lux/PageHero";
import { Reveal } from "@/components/lux/Reveal";

import { NotifyForm } from "@/components/lux/NotifyForm";
import { DustField } from "@/components/lux/DustField";
import { CATEGORIES } from "@/data/categories";
import { absoluteUrl, breadcrumbLd, OG_IMAGE } from "@/lib/seo";

export const Route = createFileRoute("/coming-soon")({
  head: () => ({
    meta: [
      { title: "Coming Soon — The First Chapter | ODCORRECT" },
      {
        name: "description",
        content:
          "The first ODCORRECT release arrives in limited quantity. Join the private list for launch announcements and exclusive previews.",
      },
      { property: "og:title", content: "Coming Soon — ODCORRECT" },
      {
        property: "og:description",
        content:
          "The opening chapter of ODCORRECT. Limited quantity, announced only to the private list.",
      },

      { property: "og:url", content: absoluteUrl("/coming-soon") },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/coming-soon") }],
    scripts: [breadcrumbLd([{ name: "Coming Soon", path: "/coming-soon" }])],
  }),
  component: ComingSoon,
});

function ComingSoon() {
  return (
    <main>
      <PageHero
        eyebrow="Coming Soon"
        title="Something is being made slowly."
        intro="No date has been promised, only a standard. When the first chapter is ready, the private list will know before anyone else."
      />

      <section className="section-pad relative overflow-hidden bg-background">
        <DustField />
        <div className="shell relative">
          <Reveal className="max-w-xl">
            <p className="eyebrow">Notify Me</p>
            <h2 className="display-md mt-6 text-foreground">
              Be told first, and told quietly.
            </h2>
            <div className="mt-10">
              <NotifyForm id="cs-notify" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad hairline-t bg-ink">
        <div className="shell">
          <Reveal className="max-w-xl">
            <p className="eyebrow">What Arrives First</p>
            <h2 className="display-lg mt-8 text-foreground">The opening chapter</h2>
          </Reveal>
          <div className="mt-16 grid gap-px bg-border sm:grid-cols-3">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.slug} delay={i * 130} className="bg-ink px-8 py-14 lg:px-12">
                <p className="eyebrow">{c.index}</p>
                <h3 className="display-md mt-6 text-foreground">{c.name}</h3>
                <p className="body-lux mt-6">{c.tagline}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
