import { createFileRoute, Link } from "@tanstack/react-router";
import journalMaterials from "@/assets/journal-materials.jpg";
import { PageHero } from "@/components/lux/PageHero";
import { Reveal } from "@/components/lux/Reveal";
import { CATEGORIES } from "@/data/categories";
import { absoluteUrl, breadcrumbLd, OG_IMAGE } from "@/lib/seo";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — Clothing, Footwear & Fragrance | ODCORRECT" },
      {
        name: "description",
        content:
          "The three disciplines of ODCORRECT: luxury clothing, premium footwear and signature fragrances. Presented ahead of the first release.",
      },
      { property: "og:title", content: "Collections — ODCORRECT" },
      {
        property: "og:description",
        content:
          "Luxury clothing, premium footwear and signature fragrances — the three disciplines of the house.",
      },

      { property: "og:url", content: absoluteUrl("/collections") },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/collections") }],
    scripts: [breadcrumbLd([{ name: "Collections", path: "/collections" }])],
  }),
  component: Collections,
});

function Collections() {
  return (
    <main>
      <PageHero
        eyebrow="Collections"
        title="Three disciplines. Nothing else."
        intro="Clothing, footwear and fragrance. Each will arrive only when it can be presented without apology."
      />

      {CATEGORIES.map((c, i) => (
        <section
          key={c.slug}
          id={c.slug}
          className={`section-pad ${i % 2 === 0 ? "bg-background" : "bg-ink hairline-t"} scroll-mt-24`}
        >
          <div className="shell">
            <div
              className={`grid items-center gap-16 lg:grid-cols-2 lg:gap-24 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Reveal>
                <div className="glass-sheen overflow-hidden">
                  <img
                    src={c.image}
                    alt={`${c.name} — ODCORRECT editorial study`}
                    loading="lazy"
                    width={1200}
                    height={1504}
                    className="img-zoom h-[460px] w-full object-cover lg:h-[720px]"
                  />
                </div>
              </Reveal>
              <Reveal delay={140}>
                <p className="eyebrow">Discipline {c.index}</p>
                <div className="rule-gold mt-8" />
                <h2 className="display-lg mt-10 text-foreground">{c.name}</h2>
                <p className="body-lux mt-8 !text-lg italic">{c.tagline}</p>
                <p className="body-lux mt-8">{c.description}</p>
                <ul className="mt-12 space-y-4">
                  {c.notes.map((n) => (
                    <li key={n} className="flex items-center gap-5">
                      <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
                      <span className="text-sm font-light tracking-[0.2em] text-muted-foreground uppercase">
                        {n}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-14">
                  <Link to="/coming-soon" className="btn-lux">
                    Notify Me
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <section className="section-pad hairline-t bg-background">
        <div className="shell text-center">
          <Reveal>
            <p className="eyebrow">No Catalogue Yet</p>
            <h2 className="display-lg mx-auto mt-8 max-w-3xl text-foreground">
              Every piece will be numbered, documented and limited.
            </h2>
            <p className="body-lux mx-auto mt-10 max-w-xl">
              Individual product pages will open here when the first chapter is released.
            </p>
            <div className="mt-14">
              <Link to="/coming-soon" className="btn-lux-gold">
                Join The List
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
