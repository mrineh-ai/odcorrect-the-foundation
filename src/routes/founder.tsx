import { createFileRoute, Link } from "@tanstack/react-router";
import founderPortrait from "@/assets/founder-portrait.jpg";
import architecture from "@/assets/architecture.jpg";
import { Reveal } from "@/components/lux/Reveal";
import { DustField } from "@/components/lux/DustField";
import { pageSeo, breadcrumbLd, absoluteUrl, LOGO_URL } from "@/lib/seo";

const seo = pageSeo({
  path: "/founder",
  title: "Meet the Founder — Mrinal Gahlaut | ODCORRECT",
  description:
    "Mrinal Gahlaut, Founder and CEO of ODCORRECT, on why the house exists, why luxury should outlive trends, and why fewer things made properly matter more than more things made quickly.",
  ogTitle: "Meet the Founder — Mrinal Gahlaut | ODCORRECT",
  ogDescription:
    "A letter from the founder of ODCORRECT on craftsmanship, patience and building a house rather than a brand.",
  type: "profile",
});

export const Route = createFileRoute("/founder")({
  head: () => ({
    meta: seo.meta,
    links: seo.links,
    scripts: [
      breadcrumbLd([{ name: "Meet the Founder", path: "/founder" }]),
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Mrinal Gahlaut",
          jobTitle: "Founder & Chief Executive Officer",
          url: absoluteUrl("/founder"),
          email: "ceo@odcorrect.in",
          nationality: "Indian",
          worksFor: {
            "@type": "Organization",
            name: "ODCORRECT",
            url: absoluteUrl("/"),
            logo: LOGO_URL,
          },
        }),
      },
    ],
  }),
  component: FounderPage,
});

const TIMELINE = [
  {
    marker: "I",
    title: "Vision",
    body: "A single conviction, written down before anything was made: that luxury had become loud, fast and disposable, and that a house could be built on the exact opposite of those three things.",
  },
  {
    marker: "II",
    title: "Foundation",
    body: "Standards before products. The materials we would accept, the constructions we would use, the finishes we would insist on, and the compromises we would refuse — all agreed in writing before a single pattern was cut.",
  },
  {
    marker: "III",
    title: "Future Collections",
    body: "Clothing first. Structured outerwear and considered tailoring, released in small quantity, drafted once and corrected slowly until the proportion is inevitable.",
  },
  {
    marker: "IV",
    title: "Footwear",
    body: "Leathers tanned over months and lasts refined until the line is correct. Welted, resolable, built to record a life rather than a season.",
  },
  {
    marker: "V",
    title: "Fragrance",
    body: "Compositions built from a small number of exceptional raw materials, given the time to settle. Weighted glass, restrained architecture, a trail meant for those standing close.",
  },
  {
    marker: "VI",
    title: "Global House",
    body: "Three disciplines held to one standard, presented in a handful of places, to people who recognise the difference. Not scale for its own sake — permanence.",
  },
] as const;

const PHILOSOPHY = [
  {
    title: "Timelessness",
    body: "A piece should look correct the year it is made and the decade after. We design against the calendar, not with it, and we accept that this makes the work slower and the audience smaller.",
  },
  {
    title: "Craftsmanship",
    body: "Craft is not a marketing word for us; it is a cost. Full canvas rather than fused. Welted rather than cemented. Edges closed by hand at the pace the hand requires.",
  },
  {
    title: "Patience",
    body: "Nothing is released to meet a date. We will wait three months for the right material rather than accept one that happens to be available, and we will delay a launch rather than ship an approximation.",
  },
  {
    title: "Luxury",
    body: "Luxury is not price, and it is certainly not a logo. It is the accumulated evidence of decisions made carefully when nobody was watching.",
  },
  {
    title: "Minimalism",
    body: "Ornament is easy; proportion is difficult. We remove until only what is necessary remains, and then we spend most of our time refining what is left.",
  },
  {
    title: "Perfection",
    body: "Not perfection as vanity — perfection as obligation. If a detail cannot be defended, it does not survive the review, however expensive that decision becomes.",
  },
  {
    title: "Purpose",
    body: "Every object must answer why it deserves to exist before it is allowed to. Most ideas do not survive that question, which is precisely the point.",
  },
  {
    title: "Quality Over Quantity",
    body: "The world already owns more clothing than it can wear. Our ambition is the harder one: make fewer things, and make each of them worth keeping.",
  },
] as const;

const VALUES = [
  {
    index: "01",
    title: "Design Over Trends",
    body: "Trends arrive fully formed and leave before anyone learns to love them. We design for the wardrobe, not the feed.",
  },
  {
    index: "02",
    title: "Quality Over Quantity",
    body: "Fewer products, each one able to justify its existence. Volume is the easiest thing in fashion to achieve and the least worth achieving.",
  },
  {
    index: "03",
    title: "Craft Over Speed",
    body: "The hand sets the pace. Where a process can only be done properly slowly, it will be done slowly.",
  },
  {
    index: "04",
    title: "Luxury Through Restraint",
    body: "Nothing added to be noticed. Confidence is quiet, and so is everything we intend to make.",
  },
  {
    index: "05",
    title: "Long-Term Thinking",
    body: "We are building for decades, not quarters. Every decision is judged by how it will read in twenty years.",
  },
] as const;

function FounderPage() {
  return (
    <main>
      {/* ——— Hero ——— */}
      <section className="on-dark relative overflow-hidden bg-ink pb-20 pt-40 lg:pb-28 lg:pt-48">
        <img
          src={architecture}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={1600}
          height={1104}
          className="animate-drift absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-ink/60" aria-hidden="true" />
        <DustField />

        <div className="shell relative">
          <div className="grid items-end gap-16 lg:grid-cols-12 lg:gap-24">
            <Reveal className="lg:col-span-6">
              <p className="eyebrow">Meet the Founder</p>
              <h1 className="display-xl mt-8 text-foreground">Mrinal Gahlaut</h1>
              <div className="rule-gold mt-10" />
              <p className="eyebrow-muted mt-8">Founder &amp; Chief Executive Officer</p>
              <p className="body-lux mt-10 max-w-lg">
                A house is not built by announcing one. It is built by deciding, early and
                permanently, what you will not do.
              </p>
            </Reveal>

            <Reveal delay={200} className="lg:col-span-6">
              <div className="glass-sheen overflow-hidden">
                <img
                  src={founderPortrait}
                  alt="Editorial portrait of Mrinal Gahlaut, Founder and CEO of ODCORRECT"
                  loading="lazy"
                  width={719}
                  height={1016}
                  className="img-zoom h-[520px] w-full object-cover object-top lg:h-[760px]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— Founder letter ——— */}
      <section className="section-pad bg-background">
        <div className="shell">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-24">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow">A Letter From The Founder</p>
              <div className="rule-gold mt-8" />
              <h2 className="display-lg mt-10 text-foreground">
                On why this
                <br />
                exists.
              </h2>
            </Reveal>

            <Reveal delay={160} className="lg:col-span-8">
              <p className="body-lux !text-[1.05rem] first-letter:float-left first-letter:mr-4 first-letter:font-[var(--font-display)] first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-gold">
                I did not begin ODCORRECT because the world needed another fashion label.
                It plainly does not. I began it because I could no longer accept the
                bargain the industry now offers — that beautiful materials should be
                rushed into objects designed to be forgotten, and that we should all agree
                to call this progress.
              </p>

              <div className="mt-8 space-y-8">
                <p className="body-lux">
                  Somewhere in the last two decades, luxury stopped meaning permanence and
                  started meaning access. Houses that once measured their work in decades
                  began measuring it in drops. The garment became a photograph of a
                  garment. The shoe became a silhouette rather than a construction. And
                  the customer, who is not naive, learned to expect less while paying
                  more. I have watched this happen at close range, and I have never been
                  able to accept it as the natural order of things.
                </p>
                <p className="body-lux">
                  Luxury should outlive trends because a trend is, by definition, a
                  temporary agreement about taste. If an object is designed to satisfy a
                  temporary agreement, it will be discarded when the agreement expires.
                  That is not a flaw in the customer; it is a flaw written into the object
                  at the design stage. The only honest response is to design for the
                  opposite: for the version of the wearer who exists in ten years and no
                  longer cares what was fashionable in the year they bought it.
                </p>
                <p className="body-lux">
                  This is why fewer products matter. Every additional style is a
                  distraction of attention, of material, of the hours of the very few
                  people who can finish a thing properly. When a house makes hundreds of
                  pieces a season, no one in that house can possibly know all of them.
                  When it makes a handful, every one of them can be defended in detail by
                  the person who made it. I would rather be responsible for ten objects I
                  can describe seam by seam than a thousand I can only describe as a
                  collection.
                </p>
                <p className="body-lux">
                  Craftsmanship is the mechanism by which that intention becomes real. It
                  is not romance and it is not heritage marketing — it is a set of
                  expensive, inconvenient decisions. Full canvas rather than fused, because
                  the jacket should learn the shape of the person wearing it. Welted rather
                  than cemented, because a shoe worth buying is a shoe worth repairing.
                  Vegetable tanning that takes months rather than chemistry that takes
                  days. Each of these choices costs money and time and gains nothing that
                  photographs well. They are the entire point.
                </p>
                <p className="body-lux">
                  Details matter for the same reason. The lining nobody sees, the interior
                  seam finished as carefully as the exterior, the weight and balance of a
                  flacon in the hand, the way a button sits when the coat is open rather
                  than closed. These are the parts of an object where standards are
                  revealed, precisely because there is no incentive to get them right. A
                  house is not judged by what it shows you. It is judged by what it does
                  when it has the opportunity to cut a corner and does not.
                </p>
                <p className="body-lux">
                  I want fashion to become timeless again — not nostalgic, not conservative,
                  simply built to survive. Modern in proportion and material, but indifferent
                  to the calendar. Something a person buys once, wears for years, has
                  repaired without embarrassment, and eventually passes on rather than
                  disposes of. That was ordinary a century ago. It has become radical, which
                  tells you how far the standard has fallen.
                </p>
                <p className="body-lux">
                  And so ODCORRECT is being built as a house, not a clothing brand. A brand
                  is a name applied to products. A house is a set of standards that products
                  must earn their way into — clothing first, then footwear, then fragrance,
                  each held to the same discipline, each released only when it is ready. It
                  will be slower to build. It will be smaller for longer. It is also the
                  only version of this worth my life&apos;s work.
                </p>
                <p className="body-lux">
                  There is no collection yet. There is a standard, a great deal of unfinished
                  work, and a promise that nothing will carry this name until it can be
                  defended completely. If you are reading this, you are here before anything
                  exists — which is the rarest place to stand, and the one I am most grateful
                  for.
                </p>
              </div>

              <div className="mt-14 border-t border-border pt-10">
                <p
                  className="text-4xl leading-tight text-gold italic sm:text-5xl"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em" }}
                >
                  — Mrinal Gahlaut
                </p>
                <p className="eyebrow-muted mt-6">Founder</p>
                <p className="eyebrow mt-2">ODCORRECT</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— Timeline ——— */}
      <section className="section-pad hairline-t bg-ink">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">The Path</p>
            <h2 className="display-lg mt-8 text-foreground">Six chapters, in order.</h2>
          </Reveal>

          <ol className="mt-20 border-l border-border">
            {TIMELINE.map((step, i) => (
              <Reveal key={step.title} delay={i * 110}>
                <li className="relative pb-16 pl-10 last:pb-0 lg:pl-16">
                  <span
                    className="absolute -left-px top-2 h-px w-6 bg-gold/60 lg:w-10"
                    aria-hidden="true"
                  />
                  <p className="eyebrow">{step.marker}</p>
                  <h3 className="display-md mt-4 text-foreground">{step.title}</h3>
                  <p className="body-lux mt-5 max-w-2xl">{step.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ——— Philosophy ——— */}
      <section className="section-pad bg-background">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Philosophy</p>
            <div className="rule-gold mt-8" />
            <h2 className="display-lg mt-10 text-foreground">
              Eight positions,
              <br />
              held without exception.
            </h2>
          </Reveal>

          <div className="mt-20 grid gap-14 md:grid-cols-2 lg:gap-x-24 lg:gap-y-16">
            {PHILOSOPHY.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 140}>
                <h3 className="display-md text-foreground">{p.title}</h3>
                <p className="body-lux mt-5">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Personal values ——— */}
      <section className="section-pad hairline-t bg-ink">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Personal Values</p>
            <h2 className="display-lg mt-8 text-foreground">What I will not trade.</h2>
          </Reveal>

          <div className="mt-20 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 110} className="bg-ink">
                <article className="h-full px-8 py-12 lg:px-10 lg:py-14">
                  <p className="eyebrow">{v.index}</p>
                  <h3 className="display-md mt-5 text-foreground">{v.title}</h3>
                  <p className="body-lux mt-5">{v.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Signature quote ——— */}
      <section className="on-dark section-pad relative overflow-hidden bg-ink">
        <DustField />
        <div className="shell relative">
          <Reveal className="mx-auto max-w-4xl text-center">
            <blockquote>
              <p className="display-lg text-foreground">
                &ldquo;We are not here to create more fashion.
                <br />
                We are here to create fewer things worth remembering.&rdquo;
              </p>
              <footer className="eyebrow-muted mt-12">Mrinal Gahlaut · Founder</footer>
            </blockquote>
            <div className="mt-16">
              <Link to="/coming-soon" className="btn-lux-gold">
                Join The Private List
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
