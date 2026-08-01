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
  },
  {
    slug: "honest-materials",
    chapter: "Luxury Materials",
    title: "Honest Materials",
    excerpt:
      "Marble, leather, brushed metal, dark wood, wool spun in mills that have not changed their rhythm in a century. Material honesty is the first promise a house makes.",
    image: journalMaterials,
    readingTime: "Chapter Two",
  },
  {
    slug: "design-without-noise",
    chapter: "Design Philosophy",
    title: "Design Without Noise",
    excerpt:
      "Restraint is the hardest discipline in design. We examine the quiet decisions — proportion, line, weight — that let an object remain relevant for decades.",
    image: atelier,
    readingTime: "Chapter Three",
  },
  {
    slug: "behind-the-house",
    chapter: "Behind The Brand",
    title: "Behind The House",
    excerpt:
      "Before a first collection exists, a house must decide what it refuses to make. An account of the standards written down at the very beginning of ODCORRECT.",
    image: journalPackaging,
    readingTime: "Chapter Four",
  },
  {
    slug: "the-future-of-luxury",
    chapter: "The Future Of Luxury",
    title: "The Future Of Luxury",
    excerpt:
      "Luxury is moving away from volume and toward meaning. What the next decade asks of the houses that intend to still be here at the end of it.",
    image: journalFuture,
    readingTime: "Chapter Five",
  },
];
