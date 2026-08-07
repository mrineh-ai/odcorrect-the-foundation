import { createFileRoute, Link } from "@tanstack/react-router";
import architecture from "@/assets/architecture.jpg";
import atelier from "@/assets/atelier.jpg";
import journalFuture from "@/assets/journal-future.jpg";
import { PageHero } from "@/components/lux/PageHero";
import { Reveal } from "@/components/lux/Reveal";
import { absoluteUrl, breadcrumbLd, OG_IMAGE } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the House — ODCORRECT" },
      {
        name: "description",
        content:
          "ODCORRECT is a luxury fashion house built on craftsmanship, patience and timeless design. Learn the values behind the house before its first collection.",
      },
      { property: "og:title", content: "About the House — ODCORRECT" },
      {
        property: "og:description",
        content:
          "The values, standards and intent behind ODCORRECT — a luxury house of clothing, footwear and fragrance.",
      },

      { property: "og:url", content: absoluteUrl("/about") },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/about") }],
    scripts: [breadcrumbLd([{ name: "About", path: "/about" }])],
  }),
  component: About,
});

const PILLARS = [
  {
    index: "01",
    title: "Patience",
    body: "Nothing is released to meet a date. A piece is finished when it is correct, and not one week before.",
  },
  {
    index: "02",
    title: "Material Honesty",
    body: "We state exactly what a thing is made of, where it came from, and how it will age. No substitution, no ambiguity.",
  },
  {
    index: "03",
    title: "Restraint",
    body: "Ornament is easy. Proportion is hard. We remove until only what is necessary remains, then refine what is left.",
  },
  {
    index: "04",
    title: "Longevity",
    body: "Every object is designed to be repaired, renewed and kept. Disposability is the opposite of luxury.",
  },
];

function About() {
  return (
    <main>
      <PageHero
        eyebrow="The House"
        title="A house built before a collection."
        intro="ODCORRECT began not with a product, but with a standard — written down, agreed upon, and refused to be broken."
      />

      <section className="section-pad bg-background">
        <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-24">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Our Intent</p>
            <div className="rule-gold mt-8" />
            <h2 className="display-lg mt-10 text-foreground">Fewer things, made properly.</h2>
          </Reveal>
          <Reveal delay={140} className="lg:col-span-8 space-y-8">
            <p className="body-lux">
              ODCORRECT is a luxury fashion house devoted to three disciplines: clothing,
              footwear and fragrance. We are not a streetwear label, and we are not a trend
              house. We have no interest in producing a product simply because a season
              demands one.
            </p>
            <p className="body-lux">
              The house exists because there is a widening distance between what luxury claims
              to be and what it has become. Marketing has grown louder while construction has
              grown quieter. We intend to reverse that order — to let the object speak and the
              brand remain silent.
            </p>
            <p className="body-lux">
              Everything we make will be released in limited quantity, documented honestly,
              and built to be repaired rather than replaced. This is a slower business model.
              It is also a more durable one, for the wearer and for the house alike.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad hairline-t bg-ink">
        <div className="shell">
          <Reveal className="max-w-xl">
            <p className="eyebrow">Standards</p>
            <h2 className="display-lg mt-8 text-foreground">Four commitments</h2>
          </Reveal>
          <div className="mt-20 grid gap-px bg-border sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <Reveal key={p.index} delay={i * 120} className="bg-ink px-8 py-14 lg:px-14 lg:py-20">
                <p className="eyebrow">{p.index}</p>
                <h3 className="display-md mt-6 text-foreground">{p.title}</h3>
                <p className="body-lux mt-6 max-w-sm">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-background">
        <div className="shell grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <div className="glass-sheen overflow-hidden">
              <img
                src={atelier}
                alt="A tailor's workbench at night with thread, shears and cut cloth"
                loading="lazy"
                width={1600}
                height={1104}
                className="img-zoom h-[420px] w-full object-cover lg:h-[600px]"
              />
            </div>
          </Reveal>
          <Reveal delay={140}>
            <p className="eyebrow">Origin</p>
            <h2 className="display-lg mt-8 text-foreground">Founded on refusal.</h2>
            <p className="body-lux mt-10">
              The house was founded by Mrinal Gahlaut on a simple and uncomfortable premise:
              that most of what is produced does not need to exist. Rather than adding to it,
              ODCORRECT begins by deciding what it will refuse to make.
            </p>
            <p className="body-lux mt-6">
              That list is longer than the catalogue will ever be. It is, in every meaningful
              sense, the design of the house.
            </p>
            <div className="mt-12">
              <Link to="/craftsmanship" className="link-lux">
                How We Make
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink">
        <img
          src={journalFuture}
          alt="Editorial fashion photograph in flowing black silk"
          loading="lazy"
          width={1200}
          height={912}
          className="animate-drift h-[60vh] w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <Reveal className="max-w-2xl text-center">
            <p className="display-lg text-foreground">
              &ldquo;Time is the only material we cannot buy. So we spend it.&rdquo;
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
