import { createFileRoute, Link } from "@tanstack/react-router";
import heroEditorial from "@/assets/hero-editorial.jpg";
import craftFabric from "@/assets/craft-fabric.jpg";
import craftHands from "@/assets/craft-hands.jpg";
import architecture from "@/assets/architecture.jpg";
import founderPortrait from "@/assets/founder-portrait.jpg";
import { Reveal } from "@/components/lux/Reveal";
import { DustField } from "@/components/lux/DustField";
import { NotifyForm } from "@/components/lux/NotifyForm";
import { Countdown } from "@/components/lux/Countdown";
import { JournalCard } from "@/components/lux/JournalCard";
import { JOURNAL_ENTRIES } from "@/data/journal";
import { CATEGORIES } from "@/data/categories";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ODCORRECT — Luxury. Without Compromise." },
      {
        name: "description",
        content:
          "ODCORRECT is preparing a new standard of premium fashion through timeless clothing, footwear and fragrances. Discover the philosophy of the house.",
      },
      { property: "og:title", content: "ODCORRECT — Luxury. Without Compromise." },
      {
        property: "og:description",
        content:
          "A luxury fashion house devoted to craftsmanship, patience and timeless design. Clothing, footwear and fragrance.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <main>
      {/* ——— Hero ——— */}
      <section className="relative flex min-h-dvh items-center overflow-hidden bg-ink">
        <img
          src={heroEditorial}
          alt="ODCORRECT editorial campaign — tailored charcoal overcoat under runway lighting"
          width={1920}
          height={1280}
          fetchPriority="high"
          className="animate-drift absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, #050505 8%, rgba(5,5,5,0.45) 70%)" }}
          aria-hidden="true"
        />
        <DustField />

        <div className="shell relative pt-36 pb-24 lg:pt-40">
          <div className="animate-lux-fade max-w-3xl">
            <p className="eyebrow">The House of ODCORRECT</p>
            <h1 className="display-xl mt-10 text-foreground">
              Luxury.
              <br />
              Without Compromise.
            </h1>
            <p className="body-lux mt-10 max-w-xl">
              ODCORRECT is preparing a new standard of premium fashion through timeless
              clothing, footwear and fragrances.
            </p>
            <div className="mt-14 flex flex-col gap-5 sm:flex-row sm:items-center">
              <Link to="/coming-soon" className="btn-lux-gold">
                Notify Me
              </Link>
              <a href="#philosophy" className="btn-lux">
                Discover Our Philosophy
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 right-0" aria-hidden="true">
          <div className="shell flex items-end justify-between">
            <span className="eyebrow-muted">Est. MMXXVI</span>
            <span className="h-16 w-px origin-bottom bg-gold/50" style={{ animation: "lux-line 2.4s var(--ease-luxury) infinite alternate" }} />
          </div>
        </div>
      </section>

      {/* ——— Philosophy ——— */}
      <section id="philosophy" className="section-pad bg-background">
        <div className="shell">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-24">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow">Our Philosophy</p>
              <div className="rule-gold mt-8" />
              <h2 className="display-lg mt-10 text-foreground">
                Luxury is not
                <br />
                loud.
              </h2>
            </Reveal>

            <Reveal delay={140} className="lg:col-span-8">
              <p className="body-lux !text-[1.05rem] first-letter:float-left first-letter:mr-4 first-letter:font-[var(--font-display)] first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-gold">
                ODCORRECT believes true luxury has never been created by a logo, a season, or
                the noise that surrounds them. It is created quietly — in the hours a pattern
                is corrected, in the fibre chosen because it will age well rather than
                photograph well, in the seam that no one will ever see and that is finished
                perfectly all the same. Luxury is defined by craftsmanship, by patience, by
                timeless design, by honest materials, and by an attention to detail that
                refuses to negotiate with the calendar.
              </p>
              <p className="body-lux mt-8">
                We are not interested in producing more fashion. The world already has more
                than it can wear. Our ambition is the opposite and far more difficult: to
                create fewer products, and to make certain each one deserves to exist. A
                garment that earns a place in a wardrobe for a decade. A pair of shoes that
                improves with every year it is repaired rather than replaced. A fragrance
                composed slowly enough to still feel like itself in ten years&apos; time.
              </p>
              <p className="body-lux mt-8">
                This is a slower way to build a house. It is also the only way we know how to
                build one that lasts. Restraint is not an absence of ambition — it is the most
                demanding form of it.
              </p>
              <div className="mt-12">
                <Link to="/about" className="link-lux">
                  Read Our Story
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— Categories ——— */}
      <section className="section-pad hairline-t bg-ink">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Three Disciplines</p>
            <h2 className="display-lg mt-8 text-foreground">The Future of the House</h2>
            <p className="body-lux mt-8">
              Three categories. No more. Each one held to the same standard, each one released
              only when it is ready.
            </p>
          </Reveal>

          <div className="mt-20 grid gap-px bg-border md:grid-cols-3">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.slug} delay={i * 160} className="group bg-ink">
                <Link to="/collections" hash={c.slug} className="block">
                  <div className="glass-sheen overflow-hidden">
                    <img
                      src={c.image}
                      alt={`${c.name} — ODCORRECT editorial study`}
                      loading="lazy"
                      width={1200}
                      height={1504}
                      className="img-zoom h-[440px] w-full object-cover opacity-80 transition-opacity duration-1000 group-hover:opacity-100 lg:h-[560px]"
                    />
                  </div>
                  <div className="px-7 py-10 lg:px-10 lg:py-12">
                    <p className="eyebrow">{c.index}</p>
                    <h3 className="display-md mt-5 text-foreground">{c.name}</h3>
                    <p className="body-lux mt-4">{c.tagline}</p>
                    <span className="link-lux mt-8 inline-block">Explore</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Craftsmanship ——— */}
      <section className="section-pad bg-background">
        <div className="shell">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <Reveal>
              <div className="glass-sheen overflow-hidden">
                <img
                  src={craftFabric}
                  alt="Close study of hand stitching in dark wool with champagne thread"
                  loading="lazy"
                  width={1600}
                  height={1104}
                  className="img-zoom h-[420px] w-full object-cover lg:h-[620px]"
                />
              </div>
            </Reveal>
            <Reveal delay={160}>
              <p className="eyebrow">Craftsmanship</p>
              <div className="rule-gold mt-8" />
              <h2 className="display-lg mt-10 text-foreground">
                Made slowly,
                <br />
                on purpose.
              </h2>
              <p className="body-lux mt-10">
                Quality is not a finishing touch applied at the end of a process. It is the
                process. It begins with the mill, with the tannery, with the decision to wait
                three months for a material rather than accept one that is merely available.
              </p>
              <p className="body-lux mt-6">
                Construction follows. Full canvas rather than fused. Welted rather than
                cemented. Linings cut with the same care as the exterior, because the parts of
                an object that are never seen are precisely where standards are revealed.
                Finishing is done by hand, at the pace the hand requires.
              </p>
              <p className="body-lux mt-6">
                The result is not perfection for its own sake. It is longevity — objects that
                remain correct in ten years, and better in twenty.
              </p>
              <div className="mt-12">
                <Link to="/craftsmanship" className="link-lux">
                  Inside the Atelier
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— Full-bleed statement ——— */}
      <section className="relative overflow-hidden bg-ink">
        <img
          src={architecture}
          alt="Minimal dark stone gallery lit by a single shaft of light"
          loading="lazy"
          width={1600}
          height={1104}
          className="animate-drift h-[70vh] w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <Reveal className="max-w-3xl text-center">
            <p className="display-lg text-foreground">
              &ldquo;We are not making more.
              <br />
              We are making fewer things worth keeping.&rdquo;
            </p>
          </Reveal>
        </div>
      </section>

      {/* ——— Founder's letter ——— */}
      <section className="section-pad bg-background">
        <div className="shell">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-24">
            <Reveal className="lg:col-span-5">
              <div className="glass-sheen overflow-hidden">
                <img
                  src={founderPortrait}
                  alt="Editorial portrait of the founder of ODCORRECT"
                  loading="lazy"
                  width={1200}
                  height={1504}
                  className="img-zoom h-[520px] w-full object-cover lg:h-[720px]"
                />
              </div>
            </Reveal>

            <Reveal delay={160} className="lg:col-span-7">
              <p className="eyebrow">A Letter From The Founder</p>
              <div className="rule-gold mt-8" />
              <h2 className="display-lg mt-10 text-foreground">On beginning.</h2>

              <div className="mt-10 space-y-7">
                <p className="body-lux">
                  Fashion today moves quickly. It follows trends that arrive fully formed and
                  leave before anyone has learned to love them. I have watched beautiful
                  materials rushed into objects designed to be forgotten, and I have never
                  been able to accept it as the natural order of things.
                </p>
                <p className="body-lux">
                  ODCORRECT was created to pursue something different. Not louder. Not faster.
                  Simply better, and for longer. My ambition is to build products people are
                  proud to wear for years rather than for one season — pieces that quietly
                  become part of a life instead of a moment.
                </p>
                <p className="body-lux">
                  Every future garment, every pair of shoes and every fragrance that carries
                  this name will have to represent three things before it is allowed to exist:
                  patience, craftsmanship, and authenticity. If a piece cannot answer for all
                  three, it will not be made. That is the standard I have written down, and it
                  is the one I intend to be held to.
                </p>
                <p className="body-lux">
                  The journey is only beginning. There is no collection yet — only a promise,
                  a set of standards, and a great deal of work ahead. Thank you for being one
                  of the earliest people to discover ODCORRECT. You are here before anything
                  exists, which is the rarest place to stand.
                </p>
              </div>

              <div className="mt-14 border-t border-border pt-10">
                <p
                  className="text-5xl leading-none text-gold sm:text-6xl"
                  style={{ fontFamily: "var(--font-script)" }}
                >
                  Mrinal Gahlaut
                </p>
                <p className="eyebrow-muted mt-6">Mrinal Gahlaut</p>
                <p className="eyebrow-muted mt-2">Founder</p>
                <p className="eyebrow mt-2">ODCORRECT</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— Coming soon / countdown ——— */}
      <section className="section-pad hairline-t relative overflow-hidden bg-ink">
        <DustField />
        <div className="shell relative">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Coming Soon</p>
            <h2 className="display-lg mt-8 text-foreground">The First Chapter</h2>
            <p className="body-lux mt-8">
              Our opening release will be presented in limited quantity, to a limited
              audience, and without announcement elsewhere.
            </p>
          </Reveal>
          <Reveal delay={160} className="mt-16">
            <Countdown />
          </Reveal>
          <Reveal delay={240} className="mt-14">
            <Link to="/coming-soon" className="btn-lux-gold">
              Notify Me
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ——— Journal preview ——— */}
      <section className="section-pad bg-background">
        <div className="shell">
          <Reveal className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-xl">
              <p className="eyebrow">The Journal</p>
              <h2 className="display-lg mt-8 text-foreground">Notes From The House</h2>
            </div>
            <Link to="/journal" className="link-lux">
              All Entries
            </Link>
          </Reveal>

          <div className="mt-20 grid gap-14 md:grid-cols-3">
            {JOURNAL_ENTRIES.slice(0, 3).map((entry, i) => (
              <JournalCard key={entry.slug} entry={entry} delay={i * 140} />
            ))}
          </div>
        </div>
      </section>

      {/* ——— Newsletter ——— */}
      <section className="section-pad hairline-t relative overflow-hidden bg-ink">
        <img
          src={craftHands}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={1600}
          height={1104}
          className="absolute inset-0 h-full w-full object-cover opacity-15"
        />
        <div className="shell relative">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
            <Reveal>
              <p className="eyebrow">Private List</p>
              <h2 className="display-lg mt-8 text-foreground">Become One Of The First.</h2>
            </Reveal>
            <Reveal delay={140} className="flex flex-col justify-end">
              <p className="body-lux">
                Receive launch announcements, exclusive previews of the first collection, and
                occasional letters from the atelier. Rarely sent. Never shared.
              </p>
              <div className="mt-10">
                <NotifyForm id="home-notify" buttonLabel="Subscribe" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
