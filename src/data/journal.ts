import journalMaterials from "@/assets/journal-materials.jpg";
import journalPackaging from "@/assets/journal-packaging.jpg";
import journalFuture from "@/assets/journal-future.jpg";
import craftFabric from "@/assets/craft-fabric.jpg";
import atelier from "@/assets/atelier.jpg";
import type { JournalEntry } from "@/components/lux/JournalCard";

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    slug: "the-patience-of-craft",
    chapter: "Craftsmanship",
    title: "The Patience of Craft",
    excerpt:
      "A single garment can pass through more than two hundred deliberate gestures before it is considered finished. We look at why the slowest hands produce the longest-lived work.",
    image: craftFabric,
    readingTime: "Chapter One",
    publishedAt: "2026-03-04",
    body: [
      "A garment is not made in an afternoon. It is made in the accumulation of small, unhurried decisions — where a seam turns, how a shoulder is set, how much ease is left in a sleeve so that an arm can move without the cloth complaining. Counted honestly, a single piece can pass through more than two hundred deliberate gestures before anyone is willing to call it finished.",
      "Most of those gestures are invisible. Nobody sees the second pressing. Nobody sees the interior tape that keeps a lapel from collapsing after three winters. Nobody sees the hours spent deciding that a pocket sits four millimetres too high. And yet these are precisely the decisions that separate an object you keep from an object you replace.",
      "Speed is the enemy here, and not for romantic reasons. Speed removes the pauses in which mistakes are noticed. A hand that is rushing cannot feel the difference between a stitch that is tight and a stitch that is merely tidy. Patience is not a virtue we perform for the story; it is the only condition under which quality can be detected at all.",
      "There is a moment in every piece where the work stops being construction and starts being judgement. The pattern is correct, the cloth is correct, the machine has done what a machine can do — and then someone has to look at it and decide whether it is right. That judgement cannot be automated, and it cannot be hurried. It can only be trained, slowly, over years.",
      "This is why we plan in seasons rather than weeks, and why the first ODCORRECT collection will arrive later than it could have. We would rather answer for a delay than for a compromise. A late garment is forgotten within a month. A poor one is remembered every time it is worn.",
      "The reward for this patience is not visible on the first day. It appears in the third year, when the shoulders still sit, the colour has aged rather than faded, and the piece has become more yours than it was when it was new. That is the only test of craft that matters: how the work behaves once the excitement has worn off.",
    ],
  },
  {
    slug: "honest-materials",
    chapter: "Luxury Materials",
    title: "Honest Materials",
    excerpt:
      "Marble, leather, brushed metal, dark wood, wool spun in mills that have not changed their rhythm in a century. Material honesty is the first promise a house makes.",
    image: journalMaterials,
    readingTime: "Chapter Two",
    publishedAt: "2026-03-26",
    body: [
      "Every house makes its first promise through material. Before a logo means anything, before a silhouette is recognised, the cloth in someone's hand has already told them what kind of company they are dealing with. Material is the part of luxury that cannot be styled, photographed, or argued into being.",
      "We look for materials that are honest about what they are. Wool that behaves like wool — warm, slightly wilful, improving as it relaxes into a body. Leather that takes a patina rather than resisting it. Metal that is finished rather than plated over a compromise. Wood and stone that carry the irregularities of their origin instead of being sanded into anonymity.",
      "Honesty rules out a great deal. It rules out coatings that imitate age, blends that borrow the name of a fibre while diluting its behaviour, and finishes designed to look expensive for exactly as long as a product remains on a shelf. These shortcuts are not cheaper in any meaningful sense; they simply move the cost from the maker to the owner.",
      "The mills and tanneries capable of this work are not numerous, and they are rarely fast. Many of them have kept the same rhythm for a century, not out of nostalgia, but because the process has already been optimised as far as it can go without losing the thing that makes it worth doing. Working with them means accepting their calendar rather than imposing ours.",
      "There is also a quieter argument for material honesty: it ages well in public. A synthetic finish looks its best in the first photograph and declines from there. A genuine one looks better in year five than it did in the studio. Over a long enough horizon, the honest material is the only one that flatters the house that chose it.",
      "So the question we ask of every candidate material is not whether it is impressive, but whether it will still be defensible in a decade — on a body, in daylight, after use. Very few pass. Those that do become the foundation everything else is built on.",
    ],
  },
  {
    slug: "design-without-noise",
    chapter: "Design Philosophy",
    title: "Design Without Noise",
    excerpt:
      "Restraint is the hardest discipline in design. We examine the quiet decisions — proportion, line, weight — that let an object remain relevant for decades.",
    image: atelier,
    readingTime: "Chapter Three",
    publishedAt: "2026-04-21",
    body: [
      "It is easy to be noticed and difficult to be remembered. Noise — an unexpected colour, an oversized mark, a detail placed to be photographed — buys attention immediately and spends it just as fast. Restraint buys nothing on the first day and everything afterwards.",
      "Design without noise is not the absence of decisions. It is the presence of harder ones. When there is no ornament to hide behind, proportion has to be exact. Line has to be intentional. Weight has to be balanced. Every element that remains must justify itself, because there is nothing else on the object to distract from a mistake.",
      "We start by removing. A first sketch always contains more than it needs; the work is in identifying which parts are structural and which are merely reassuring. What survives that process tends to be the shape itself — and a shape, unlike a motif, does not go out of date.",
      "Restraint also changes how an object behaves in a wardrobe. A loud piece dictates everything around it and can only be worn on its own terms. A quiet one adapts: it works in three contexts instead of one, and it does not announce how often it has been seen. Longevity is partly a design property and partly a social one.",
      "None of this means severity. Quiet objects can be warm, tactile, even sensual — the pleasure simply arrives through hand and proportion rather than through signalling. The difference is who the object is speaking to. Noise is addressed to the room; restraint is addressed to the wearer.",
      "The measure we hold ourselves to is simple. If a piece would look dated beside its own photograph in ten years, it was designed for attention. If it would still look considered, it was designed properly.",
    ],
  },
  {
    slug: "behind-the-house",
    chapter: "Behind The Brand",
    title: "Behind The House",
    excerpt:
      "Before a first collection exists, a house must decide what it refuses to make. An account of the standards written down at the very beginning of ODCORRECT.",
    image: journalPackaging,
    readingTime: "Chapter Four",
    publishedAt: "2026-05-19",
    body: [
      "Most houses are defined by what they release. We began by writing down what we would refuse to make. It is a shorter document, and a more useful one, because refusals are the only standards that survive commercial pressure.",
      "The first refusal was volume. A house that measures itself in the number of pieces released each season will eventually release pieces it does not believe in. We would rather produce a small number of things and be answerable for each of them.",
      "The second was decoration for its own sake. Nothing is added to an ODCORRECT piece to make it read as expensive. If a detail is present, it is doing work — structural, functional, or proportional. Luxury that must be announced is not yet luxury.",
      "The third was the invisible compromise: the lining chosen because nobody checks, the finish applied because it photographs well, the deadline met by lowering a standard quietly. These are the decisions that hollow out a house from the inside, and they are almost never noticed until the reputation is already spent.",
      "In place of those, we wrote down three commitments. Fewer products, made properly. Materials that age rather than degrade. Prices that reflect the work, not the marketing around it. They are unglamorous commitments, and they are difficult precisely because nobody would notice if we broke them once.",
      "A house is not the sum of its collections. It is the sum of the decisions it kept making when no one was watching. That document is where ODCORRECT actually began — long before there was anything to sell.",
    ],
  },
  {
    slug: "the-future-of-luxury",
    chapter: "The Future Of Luxury",
    title: "The Future Of Luxury",
    excerpt:
      "Luxury is moving away from volume and toward meaning. What the next decade asks of the houses that intend to still be here at the end of it.",
    image: journalFuture,
    readingTime: "Chapter Five",
    publishedAt: "2026-06-30",
    body: [
      "For two decades, luxury grew by expanding: more categories, more collections, more doors, more visibility. That model produced extraordinary businesses and, along the way, quietly redefined the word itself. Luxury came to mean access to a name rather than possession of something rare.",
      "The correction now underway is not a rejection of luxury but a return to its definition. Buyers are asking harder questions — where was this made, how long will it last, what happens when it wears. These are not ethical questions dressed up as commercial ones; they are the original questions, being asked again.",
      "What this asks of a house is uncomfortable. Fewer releases mean each one carries more weight. Longevity means designing against your own repeat sales. Transparency means the supply chain becomes part of the product. None of these are marketing positions; each one changes what the business is allowed to do.",
      "We think the houses that remain in twenty years will share three traits: a narrow product line they can genuinely defend, a relationship with makers rather than merely suppliers, and a refusal to inflate desire faster than they can meet it. Scale will still be possible — but it will follow the work rather than lead it.",
      "There is an opportunity in this for a house being built now. We are not unwinding a decade of expansion or protecting an existing volume. We can begin with the constraints already in place, and let everything grow inside them.",
      "That is the wager ODCORRECT is making: that meaning outlasts momentum, and that a small number of things worth keeping will matter more, ten years from now, than a large number of things worth noticing today.",
    ],
  },
];

export function getJournalEntry(slug: string) {
  return JOURNAL_ENTRIES.find((entry) => entry.slug === slug);
}

/** The next chapter in reading order, wrapping back to the first. */
export function getNextJournalEntry(slug: string) {
  const index = JOURNAL_ENTRIES.findIndex((entry) => entry.slug === slug);
  if (index === -1) return undefined;
  return JOURNAL_ENTRIES[(index + 1) % JOURNAL_ENTRIES.length];
}
