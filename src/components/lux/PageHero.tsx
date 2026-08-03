import { Reveal } from "./Reveal";
import { DustField } from "./DustField";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  intro?: string;
  image: string;
  imageAlt: string;
}

/** Shared editorial masthead for interior pages. */
export function PageHero({ eyebrow, title, intro, image, imageAlt }: PageHeroProps) {
  return (
    <section className="on-dark relative flex min-h-[68vh] items-end overflow-hidden bg-ink pb-20 pt-40 lg:min-h-[78vh] lg:pb-28">
      <img
        src={image}
        alt={imageAlt}
        width={1600}
        height={1104}
        className="animate-drift absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-ink/55" aria-hidden="true" />
      <DustField />
      <div className="shell relative">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display-xl mt-8 max-w-4xl text-foreground">{title}</h1>
          {intro ? <p className="body-lux mt-10 max-w-xl">{intro}</p> : null}
        </Reveal>
      </div>
    </section>
  );
}
