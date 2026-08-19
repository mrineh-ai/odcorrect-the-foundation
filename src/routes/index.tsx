import { createFileRoute, Link } from "@tanstack/react-router";
import heroDark from "@/assets/hero-editorial-dark.jpg";
import craftFabric from "@/assets/craft-fabric.jpg";
import craftHands from "@/assets/craft-hands.jpg";
import { Reveal } from "@/components/lux/Reveal";
import { DustField } from "@/components/lux/DustField";
import { NotifyForm } from "@/components/lux/NotifyForm";

import { JOURNAL_ENTRIES } from "@/data/journal";
import { CATEGORIES } from "@/data/categories";
import { pageSeo } from "@/lib/seo";

const homeSeo = pageSeo({
  path: "/",
  title: "ODCORRECT | Luxury Fashion House | Clothing, Footwear & Fragrance",
  description:
    "ODCORRECT is a luxury fashion house creating timeless clothing, footwear and fragrance through restraint, craftsmanship, honest materials and enduring design.",
  ogTitle: "ODCORRECT | Luxury Fashion House",
  ogDescription:
    "Timeless clothing, footwear and fragrance created through restraint, craftsmanship and enduring design.",
});

const featured = JOURNAL_ENTRIES[0]!;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [...homeSeo.meta, { name: "robots", content: "index, follow" }],
    links: homeSeo.links,
  }),
  component: Home,
});

function Home() {
  return (
    <main>
      {/* ——— Hero ——— */}
      <section
        id="hero"
        className="on-dark relative flex min-h-dvh items-center overflow-hidden bg-ink"
        aria-labelledby="hero-title"
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
            opacity: 0.8,
          }}
        />

        <div className="hero-contrast-overlay absolute inset-0" aria-hidden="true" />

        <DustField />

        <div className="shell relative pt-36 pb-24 lg:pt-40">
          <div className="hero-content animate-lux-fade max-w-3xl">
            <p className="eyebrow">The House of ODCORRECT</p>
            <h1 id="hero-title" className="display-xl mt-10 text-foreground">
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
            <span
              className="h-16 w-px origin-bottom bg-gold/50"
              style={{ animation: "lux-line 2.4s var(--ease-luxury) infinite alternate" }}
            />
          </div>
        </div>
      </section>

      {/* ——— Philosophy ——— */}
      <section
        id="philosophy"
        className="section-pad bg-background"
        aria-labelledby="philosophy-title"
      >
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-24">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow">Our Philosophy</p>
              <div className="rule-gold mt-8" />
              <h2 id="philosophy-title" className="display-lg mt-10 text-foreground">
                Luxury is not
                <br />
                loud.
              </h2>
            </Reveal>

            <Reveal delay={140} className="lg:col-span-8">
              <p className="body-lux !text-[1.05rem]">
                ODCORRECT believes in restraint — in craftsmanship, honest materials and
                design that refuses to negotiate with the calendar. We are not interested in
                producing more fashion; the world already has more than it can wear.
              </p>
              <p className="body-lux mt-6">
                Our ambition is the opposite, and far more difficult: to make fewer things,
                and to be certain each one deserves to exist.
              </p>
              <div className="mt-12">
                <Link to="/about" className="btn-lux">
                  Discover Our Philosophy
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— The House ——— */}
      <section className="section-pad hairline-t bg-ink" aria-labelledby="house-title">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">The House</p>
            <h2 id="house-title" className="display-lg mt-8 text-foreground">
              Three Disciplines
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-px bg-border md:grid-cols-3">
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
                      className="img-zoom h-[360px] w-full object-cover opacity-80 transition-opacity duration-1000 group-hover:opacity-100 lg:h-[480px]"
                    />
                  </div>
                  <div className="px-7 py-9 lg:px-10 lg:py-10">
                    <p className="eyebrow">{c.index}</p>
                    <h3 className="display-md mt-5 text-foreground">{c.name}</h3>
                    <p className="body-lux mt-4">{c.houseLine}</p>
                    <p className="eyebrow-muted mt-7 border-t border-border pt-6">Coming Soon</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Craftsmanship ——— */}
      <section className="section-pad bg-background" aria-labelledby="craft-title">
        <div className="shell">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
            <Reveal>
              <div className="glass-sheen overflow-hidden">
                <img
                  src={craftFabric}
                  alt="Close study of hand stitching in dark wool with champagne thread"
                  loading="lazy"
                  width={1600}
                  height={1104}
                  className="img-zoom h-[340px] w-full object-cover lg:h-[520px]"
                />
              </div>
            </Reveal>
            <Reveal delay={160}>
              <p className="eyebrow">Craftsmanship</p>
              <div className="rule-gold mt-8" />
              <h2 id="craft-title" className="display-lg mt-10 text-foreground">
                Quality is not a finishing touch.
                <br />
                It is the process.
              </h2>
              <p className="body-lux mt-8">
                It begins with the mill and the tannery, and ends only when the hand is
                satisfied.
              </p>
              <div className="mt-12">
                <Link to="/craftsmanship" className="btn-lux">
                  Inside the Atelier
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— The First Chapter ——— */}
      <section
        className="section-pad hairline-t relative overflow-hidden bg-ink"
        aria-labelledby="first-chapter-title"
      >
        <DustField />
        <div className="shell relative">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Coming Soon</p>
            <h2 id="first-chapter-title" className="display-lg mt-8 text-foreground">
              The First Chapter
            </h2>
            <p className="body-lux mt-8">
              Our opening release will be presented in limited quantity, to a limited
              audience.
            </p>
          </Reveal>
          <Reveal delay={160} className="mt-12">
            <Link to="/coming-soon" className="btn-lux-gold">
              Notify Me
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ——— Journal preview ——— */}
      <section className="section-pad bg-background" aria-labelledby="journal-title">
        <div className="shell">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="glass-sheen overflow-hidden bg-charcoal">
                <img
                  src={featured.image}
                  alt={featured.title}
                  loading="lazy"
                  width={1200}
                  height={912}
                  className="img-zoom h-[300px] w-full object-cover lg:h-[440px]"
                />
              </div>
            </Reveal>
            <Reveal delay={140}>
              <p className="eyebrow">The Journal</p>
              <h2 id="journal-title" className="display-lg mt-8 text-foreground">
                {featured.title}
              </h2>
              <p className="body-lux mt-6">{featured.excerpt}</p>
              <div className="mt-10">
                <Link to="/journal" className="btn-lux">
                  Read the Journal
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— Mrineh Group ——— */}
      <section className="section-pad hairline-t bg-ink" aria-labelledby="mrineh-title">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Parent House</p>
            <h2 id="mrineh-title" className="display-md mt-6 text-foreground">
              Part of a larger house.
            </h2>
            <p className="body-lux mt-6">
              ODCORRECT is a venture of Mrineh Group — a group building independent brands
              across technology, education, fashion and hospitality.
            </p>
            <div className="mt-9">
              <a
                href="https://mrinehgroup.online/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lux !px-7 !py-3.5"
              >
                Explore Mrineh Group
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ——— Private list ——— */}
      <section
        className="on-dark section-pad hairline-t relative overflow-hidden bg-ink"
        aria-labelledby="private-list-title"
      >
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
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-24">
            <Reveal>
              <p className="eyebrow">Private List</p>
              <h2 id="private-list-title" className="display-lg mt-8 text-foreground">
                Become One Of The First.
              </h2>
            </Reveal>
            <Reveal delay={140} className="flex flex-col justify-end">
              <p className="body-lux">
                Launch announcements and first access. Rarely sent. Never shared.
              </p>
              <div className="mt-8">
                <NotifyForm id="home-notify" buttonLabel="Subscribe" source="home" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
