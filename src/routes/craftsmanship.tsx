import { createFileRoute, Link } from "@tanstack/react-router";
import craftHands from "@/assets/craft-hands.jpg";
import craftFabric from "@/assets/craft-fabric.jpg";
import atelier from "@/assets/atelier.jpg";
import categoryFootwear from "@/assets/category-footwear.jpg";
import { PageHero } from "@/components/lux/PageHero";
import { Reveal } from "@/components/lux/Reveal";
import { absoluteUrl, breadcrumbLd, OG_IMAGE } from "@/lib/seo";

export const Route = createFileRoute("/craftsmanship")({
  head: () => ({
    meta: [
      { title: "Craftsmanship — Materials, Construction & Finishing | ODCORRECT" },
      {
        name: "description",
        content:
          "Inside the standards of ODCORRECT: premium fabrics, full-canvas construction, hand finishing and an obsession with what cannot be seen.",
      },
      { property: "og:title", content: "Craftsmanship — ODCORRECT" },
      {
        property: "og:description",
        content:
          "Premium materials, considered construction and hand finishing — the making standards of the house.",
      },

      { property: "og:url", content: absoluteUrl("/craftsmanship") },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/craftsmanship") }],
    scripts: [breadcrumbLd([{ name: "Craftsmanship", path: "/craftsmanship" }])],
  }),
  component: Craftsmanship,
});

const STAGES = [
  {
    index: "I",
    title: "Selection",
    body: "Material is chosen before design begins. Wool from mills that have not altered their rhythm in a century; hides tanned slowly with bark rather than chemistry; naturals distilled in small volume. If a material cannot be traced, it is not used.",
    image: craftFabric,
    alt: "Macro study of dark wool weave with fine hand stitching",
  },
  {
    index: "II",
    title: "Construction",
    body: "Full-canvas tailoring that moulds to the wearer rather than resisting them. Goodyear-welted footwear built to be resoled again and again. Interiors cut with the same discipline as exteriors, because the unseen is where standards are proven.",
    image: craftHands,
    alt: "Artisan hands cutting leather with brass tools on dark wood",
  },
  {
    index: "III",
    title: "Finishing",
    body: "Edges closed by hand. Buttonholes worked in silk. Flacons weighted and polished until the light behaves correctly on the glass. Finishing is not decoration — it is the last chance to be honest about the work beneath it.",
    image: categoryFootwear,
    alt: "Hand-finished black leather derby shoe on dark marble",
  },
];

function Craftsmanship() {
  return (
    <main>
      <PageHero
        eyebrow="Craftsmanship"
        title="The unseen decides everything."
        intro="Quality is not applied at the end of a process. It is the entire process, from the first material decision to the final hand-finished edge."
        image={atelier}
        imageAlt="A tailor's atelier at night lit by a single brass lamp"
      />

      <section className="section-pad bg-background">
        <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-24">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Why It Matters</p>
            <div className="rule-gold mt-8" />
            <h2 className="display-lg mt-10 text-foreground">Quality is a decision made early.</h2>
          </Reveal>
          <Reveal delay={140} className="lg:col-span-8 space-y-8">
            <p className="body-lux">
              A garment reveals its origins slowly. In the first month, almost anything can
              appear luxurious. In the third year, only the truth remains: how the fibre was
              spun, whether the canvas was stitched or glued, whether the seam allowance was
              generous enough to be altered by a wearer who has changed.
            </p>
            <p className="body-lux">
              This is why we treat material selection as a design decision rather than a
              procurement one. A beautiful pattern executed in a compromised cloth is not a
              beautiful garment; it is a beautiful drawing. The cloth is the design.
            </p>
            <p className="body-lux">
              Construction follows the same logic. We accept the slower method almost every
              time — not out of romance for tradition, but because those methods have survived
              precisely by producing objects that survive. Hand finishing costs hours that no
              customer will ever count. It buys years that every customer will feel.
            </p>
            <p className="body-lux">
              We would rather deliver later and be worn longer. That is the whole of our
              manufacturing philosophy.
            </p>
          </Reveal>
        </div>
      </section>

      {STAGES.map((s, i) => (
        <section
          key={s.index}
          className={`section-pad ${i % 2 === 0 ? "bg-ink hairline-t" : "bg-background"}`}
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
                    src={s.image}
                    alt={s.alt}
                    loading="lazy"
                    width={1600}
                    height={1104}
                    className="img-zoom h-[400px] w-full object-cover lg:h-[600px]"
                  />
                </div>
              </Reveal>
              <Reveal delay={140}>
                <p className="eyebrow">Stage {s.index}</p>
                <h2 className="display-lg mt-8 text-foreground">{s.title}</h2>
                <p className="body-lux mt-10">{s.body}</p>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <section className="section-pad hairline-t bg-ink text-center">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">The Standard</p>
            <h2 className="display-lg mx-auto mt-8 max-w-3xl text-foreground">
              If it cannot be repaired, it should not be sold.
            </h2>
            <div className="mt-14">
              <Link to="/coming-soon" className="btn-lux-gold">
                Notify Me
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
