import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";

export interface JournalEntry {
  slug: string;
  chapter: string;
  title: string;
  excerpt: string;
  image: string;
  readingTime: string;
  publishedAt: string;
  body: string[];
}

export function JournalCard({ entry, delay = 0 }: { entry: JournalEntry; delay?: number }) {
  return (
    <Reveal as="article" delay={delay} className="group" >
      <Link
        to="/journal/$slug"
        params={{ slug: entry.slug }}
        id={entry.slug}
        className="journal-card block focus-visible:outline-none"
        aria-label={`Read ${entry.title}`}
      >
      <div className="overflow-hidden bg-charcoal">
        <img
          src={entry.image}
          alt={entry.title}
          loading="lazy"
          width={1200}
          height={912}
          className="img-zoom h-[280px] w-full object-cover opacity-85 transition-opacity duration-1000 group-hover:opacity-100 sm:h-[340px]"
        />
      </div>
      <div className="journal-card-copy mt-7">
        <p className="eyebrow">{entry.chapter}</p>
        <h3 className="display-md mt-4 text-foreground">{entry.title}</h3>
        <p className="body-lux mt-4 line-clamp-3">{entry.excerpt}</p>
        <p className="eyebrow-muted mt-6">{entry.readingTime}</p>
      </div>
      </Link>
    </Reveal>
  );
}
