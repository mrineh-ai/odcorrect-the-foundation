import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/lux/Reveal";
import { getJournalEntry, getNextJournalEntry } from "@/data/journal";
import { absoluteUrl, breadcrumbLd, SITE_URL, LOGO_URL } from "@/lib/seo";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const entry = getJournalEntry(params.slug);
    if (!entry) throw notFound();
    return { entry };
  },
  head: ({ params, loaderData }) => {
    const entry = loaderData?.entry;
    if (!entry) {
      return {
        meta: [
          { title: "Chapter Not Found — ODCORRECT" },
          { name: "robots", content: "noindex, follow" },
        ],
      };
    }
    const url = absoluteUrl(`/journal/${params.slug}`);
    const image = `${SITE_URL}${entry.image}`;
    const title = `${entry.title} — The Journal | ODCORRECT`;
    return {
      meta: [
        { title },
        { name: "description", content: entry.excerpt },
        { property: "og:title", content: `${entry.title} — ODCORRECT` },
        { property: "og:description", content: entry.excerpt },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { property: "og:image", content: image },
        { property: "article:published_time", content: entry.publishedAt },
        { property: "article:section", content: entry.chapter },
        { name: "twitter:title", content: `${entry.title} — ODCORRECT` },
        { name: "twitter:description", content: entry.excerpt },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        breadcrumbLd([
          { name: "Journal", path: "/journal" },
          { name: entry.title, path: `/journal/${params.slug}` },
        ]),
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: entry.title,
            description: entry.excerpt,
            image,
            datePublished: entry.publishedAt,
            dateModified: entry.publishedAt,
            articleSection: entry.chapter,
            inLanguage: "en",
            mainEntityOfPage: url,
            author: { "@type": "Organization", name: "ODCORRECT", url: `${SITE_URL}/` },
            publisher: {
              "@type": "Organization",
              name: "ODCORRECT",
              logo: { "@type": "ImageObject", url: LOGO_URL },
            },
          }),
        },
      ],
    };
  },
  component: JournalArticle,
  notFoundComponent: ChapterNotFound,
});

function ChapterNotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-ink px-6">
      <div className="max-w-xl text-center">
        <p className="eyebrow">The Journal</p>
        <h1 className="display-lg mt-8 text-foreground">This chapter isn&apos;t published</h1>
        <p className="body-lux mx-auto mt-8 max-w-md">
          The entry you&apos;re looking for isn&apos;t part of the journal.
        </p>
        <div className="mt-14">
          <Link to="/journal" className="btn-lux-gold">
            All Chapters
          </Link>
        </div>
      </div>
    </main>
  );
}

function JournalArticle() {
  const { entry } = Route.useLoaderData();
  const next = getNextJournalEntry(entry.slug);
  const published = new Date(entry.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main>
      <article>
        <header className="section-pad bg-ink pb-0">
          <div className="shell max-w-3xl">
            <Reveal>
              <Link to="/journal" className="eyebrow-muted link-lux">
                The Journal
              </Link>
              <p className="eyebrow mt-8">{entry.chapter}</p>
              <h1 className="display-xl mt-6 text-foreground">{entry.title}</h1>
              <p className="eyebrow-muted mt-8">
                {entry.readingTime} · <time dateTime={entry.publishedAt}>{published}</time>
              </p>
            </Reveal>
          </div>
        </header>

        <div className="section-pad bg-ink pt-16">
          <div className="shell">
            <Reveal>
              <div className="overflow-hidden bg-charcoal">
                <img
                  src={entry.image}
                  alt={entry.title}
                  width={1600}
                  height={900}
                  className="h-[320px] w-full object-cover opacity-90 sm:h-[460px] lg:h-[560px]"
                />
              </div>
            </Reveal>
          </div>
        </div>

        <div className="section-pad bg-background pt-0">
          <div className="shell max-w-2xl pt-24">
            <Reveal>
              <p className="body-lux text-lg leading-relaxed text-foreground/90">
                {entry.excerpt}
              </p>
            </Reveal>
            <div className="mt-14 space-y-10">
              {entry.body.map((paragraph, i) => (
                <Reveal key={i} delay={Math.min(i, 3) * 60}>
                  <p className="body-lux leading-loose">{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </article>

      <section className="section-pad hairline-t bg-ink">
        <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <p className="eyebrow">Next Chapter</p>
            {next ? (
              <h2 className="display-lg mt-8 text-foreground">{next.title}</h2>
            ) : (
              <h2 className="display-lg mt-8 text-foreground">Continue Reading</h2>
            )}
          </Reveal>
          <Reveal delay={140} className="flex flex-col justify-end">
            {next ? (
              <>
                <p className="body-lux">{next.excerpt}</p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    to="/journal/$slug"
                    params={{ slug: next.slug }}
                    className="btn-lux-gold"
                  >
                    Read {next.chapter}
                  </Link>
                  <Link to="/journal" className="btn-lux">
                    All Chapters
                  </Link>
                </div>
              </>
            ) : (
              <div className="mt-4">
                <Link to="/journal" className="btn-lux">
                  All Chapters
                </Link>
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </main>
  );
}

