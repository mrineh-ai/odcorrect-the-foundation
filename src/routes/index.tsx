import { createFileRoute, Link } from "@tanstack/react-router";
import heroDark from "@/assets/hero-editorial-dark.jpg";
import heroLight from "@/assets/hero-editorial-light.jpg";
import { useTheme } from "@/lib/theme";
import craftFabric from "@/assets/craft-fabric.jpg";
import craftHands from "@/assets/craft-hands.jpg";
import architecture from "@/assets/architecture.jpg";
import { Reveal } from "@/components/lux/Reveal";
import { DustField } from "@/components/lux/DustField";
import { NotifyForm } from "@/components/lux/NotifyForm";

import { JournalCard } from "@/components/lux/JournalCard";
import { JOURNAL_ENTRIES } from "@/data/journal";
import { CATEGORIES } from "@/data/categories";
import { pageSeo } from "@/lib/seo";

const homeSeo = pageSeo({
  path: "/",
  title: "ODCORRECT | Luxury Fashion House | Clothing • Footwear • Fragrance",
  description:
    "ODCORRECT is a luxury fashion house creating timeless clothing, premium footwear and refined fragrances through exceptional craftsmanship and uncompromising quality.",
  ogTitle: "ODCORRECT | Luxury Fashion House",
  ogDescription:
    "Timeless clothing, premium footwear and luxury fragrances designed for people who appreciate craftsmanship over trends.",
});

const EXPLORE = [
  { to: "/about", label: "About", note: "The standards the house was built on." },
  { to: "/craftsmanship", label: "Craftsmanship", note: "Materials, construction, finishing." },
  { to: "/collections", label: "Collections", note: "Three disciplines, nothing else." },
  { to: "/journal", label: "Journal", note: "Notes written from inside the atelier." },
  
  { to: "/coming-soon", label: "Coming Soon", note: "The first chapter, announced quietly." },
] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: homeSeo.meta,
    links: homeSeo.links,
  }),
  component: Home,
});


function Home() {
  const { theme } = useTheme();

  return (
    <main>
      {/* ——— Hero ——— */}
      <section
        id="hero"
        className="on-dark relative flex min-h-dvh items-center overflow-hidden bg-ink"
      >
        <img
          src={heroDark}
          alt="ODCORRECT editorial campaign — tailored black overcoat in a softly lit stone gallery"
          width={1920}
          height={1280}
          fetchPriority="high"
          className="animate-drift absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: "80% center",
            filter: "blur(9px)",
                        opacity: theme === "light" ? 0 : 0.8,
            transition: "opacity 260ms cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        <img
          src={heroLight}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1280}
          fetchPriority="high"
          className="animate-drift absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: "80% center",
            filter: "blur(9px)",
                        opacity: theme === "light" ? 0.85 : 0,
            transition: "opacity 260ms cubic-bezier(0.16,1,0.3,1)",
          }}
        />

        <div className="hero-contrast-overlay absolute inset-0" aria-hidden="true" />

        <DustField />

        <div className="shell relative pt-36 pb-24 lg:pt-40">
          <div className="hero-content animate-lux-fade max-w-3xl">
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

      {/* ——— The House ——— */}
      <section className="section-pad hairline-t bg-ink">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">The House</p>
            <h2 className="display-lg mt-8 text-foreground">Three Disciplines</h2>
            <p className="body-lux mt-8">
              Clothing, footwear and fragrance. No more. Each one held to the same standard,
              each one released only when it is ready.
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
                    <p className="body-lux mt-4">{c.houseLine}</p>
                    <p className="eyebrow-muted mt-8 border-t border-border pt-6">Coming Soon</p>
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
      <section className="on-dark relative overflow-hidden bg-ink">
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

      {/* ——— Explore the House ——— */}
      <section className="section-pad bg-background">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Explore</p>
            <div className="rule-gold mt-8" />
            <h2 className="display-lg mt-10 text-foreground">Explore the House</h2>
          </Reveal>

          <nav aria-label="Explore the house" className="mt-16">
            <ul className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
              {EXPLORE.map((item, i) => (
                <Reveal key={item.to} delay={i * 100} className="bg-background" as="li">
                  <Link
                    to={item.to}
                    className="group flex h-full items-baseline justify-between gap-6 px-7 py-10 transition-colors duration-700 hover:bg-ink/40 lg:px-10 lg:py-12"
                  >
                    <span>
                      <span className="display-md block text-foreground transition-colors duration-700 group-hover:text-gold">
                        {item.label}
                      </span>
                      <span className="body-lux mt-3 block">{item.note}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-gold transition-transform duration-700 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </nav>
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
          <Reveal delay={160} className="mt-14">
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
      <section className="on-dark section-pad hairline-t relative overflow-hidden bg-ink">
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
