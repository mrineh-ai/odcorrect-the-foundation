import categoryClothing from "@/assets/category-clothing.jpg";
import categoryFootwear from "@/assets/category-footwear.jpg";
import categoryFragrance from "@/assets/category-fragrance.jpg";

export interface Category {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  /** Short editorial line used by the homepage "The House" cards. */
  houseLine: string;
  notes: string[];
}

/**
 * The three — and only three — categories of the house.
 * Shaped as data so future product listings can extend this model
 * without altering the presentation layer.
 */
export const CATEGORIES: Category[] = [
  {
    slug: "clothing",
    index: "I",
    name: "Luxury Clothing",
    tagline: "Tailoring built to outlive its season",
    description:
      "Structured outerwear, considered tailoring and quiet essentials cut from fibres chosen for how they age rather than how they photograph. Each pattern is drafted once, corrected slowly, and kept.",
    image: categoryClothing,
    houseLine: "Timeless silhouettes crafted to be worn for years, not seasons.",
    notes: ["Full-canvas construction", "Hand-finished edges", "Natural fibre only"],
  },
  {
    slug: "footwear",
    index: "II",
    name: "Premium Footwear",
    tagline: "Constructed to be repaired, not replaced",
    description:
      "Leathers tanned over months, lasts refined until the line is inevitable, soles stitched so the shoe can be renewed again and again. Footwear that records a life rather than a season.",
    image: categoryFootwear,
    houseLine: "Precision, comfort and enduring design in every step.",
    notes: ["Vegetable-tanned leather", "Goodyear welted", "Resolable for decades"],
  },
  {
    slug: "fragrance",
    index: "III",
    name: "Signature Fragrances",
    tagline: "Composition before projection",
    description:
      "Compositions built around a small number of exceptional raw materials, given the time to settle. Weighted glass, restrained architecture, and a trail meant only for those standing close.",
    image: categoryFragrance,
    houseLine: "Scents created to become signatures, not trends.",
    notes: ["High-concentration extrait", "Rare naturals", "Refillable flacon"],
  },
];
