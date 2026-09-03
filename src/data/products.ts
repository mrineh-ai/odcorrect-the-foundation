import overcoat from "@/assets/shop/overcoat.jpg";
import shirt from "@/assets/shop/shirt.jpg";
import trouser from "@/assets/shop/trouser.jpg";
import knit from "@/assets/shop/knit.jpg";
import derby from "@/assets/shop/derby.jpg";
import loafer from "@/assets/shop/loafer.jpg";
import court from "@/assets/shop/court.jpg";
import fragranceOrigin from "@/assets/shop/fragrance-origin.jpg";
import fragranceRefusal from "@/assets/shop/fragrance-refusal.jpg";
import fragranceAfterDark from "@/assets/shop/fragrance-afterdark.jpg";

/**
 * ODCORRECT catalogue — PREVIEW pieces.
 *
 * This module is the single source of truth for the boutique. It mirrors the
 * shape of the future `products` / `product_images` / `product_variants` /
 * `inventory` tables, so swapping this file for a database query later is a
 * drop-in change: keep the exported types, replace the array.
 */

export type ProductCategory = "clothing" | "footwear" | "fragrance";
export type ProductStatus = "preview" | "coming-soon" | "available";

export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductVariant {
  /** Stable identifier — becomes product_variants.sku in the database. */
  sku: string;
  /** Size label, absent for fragrance. */
  size?: string;
  /** Colour / finish label. */
  colour: string;
  /** Price delta in INR applied to the base price. */
  priceDelta?: number;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  sku: string;
  /** Base price in INR. */
  price: number;
  currency: "INR";
  shortDescription: string;
  description: string;
  materials: string[];
  care?: string;
  sizes: string[];
  colours: string[];
  variants: ProductVariant[];
  images: ProductImage[];
  status: ProductStatus;
  featured: boolean;
  /** Sort key for "Newest" — ISO date the piece entered the catalogue. */
  releasedAt: string;
  seo: { title: string; description: string };
}

export const CATEGORY_LABELS: Record<ProductCategory | "all", string> = {
  all: "All",
  clothing: "Clothing",
  footwear: "Footwear",
  fragrance: "Fragrance",
};

const CLOTHING_SIZES = ["XS", "S", "M", "L", "XL"];
const SHOE_SIZES = ["40", "41", "42", "43", "44", "45"];

function buildVariants(
  sku: string,
  sizes: string[],
  colours: string[],
  stock = 6,
): ProductVariant[] {
  if (sizes.length === 0) {
    return colours.map((colour) => ({
      sku: `${sku}-${colour.replace(/\s+/g, "").toUpperCase().slice(0, 4)}`,
      colour,
      stock,
    }));
  }
  return sizes.flatMap((size) =>
    colours.map((colour) => ({
      sku: `${sku}-${size}-${colour.replace(/\s+/g, "").toUpperCase().slice(0, 4)}`,
      size,
      colour,
      stock,
    })),
  );
}

export const PRODUCTS: Product[] = [
  {
    id: "p-001",
    slug: "the-no-01-overcoat",
    name: "The No. 01 Overcoat",
    category: "clothing",
    sku: "OD-CL-001",
    price: 96000,
    currency: "INR",
    shortDescription: "Double-faced wool. Drafted once, corrected slowly.",
    description:
      "The first garment of the house. A full-canvas overcoat cut from double-faced virgin wool, with a shoulder built by hand and a hem weighted to fall without persuasion. Nothing is applied to it that a decade would remove.",
    materials: ["Double-faced virgin wool", "Full canvas construction", "Horn buttons"],
    care: "Dry clean sparingly. Brush after wear. Rest on a broad hanger.",
    sizes: CLOTHING_SIZES,
    colours: ["Charcoal", "Deep Black"],
    variants: buildVariants("OD-CL-001", CLOTHING_SIZES, ["Charcoal", "Deep Black"]),
    images: [{ src: overcoat, alt: "The No. 01 Overcoat in charcoal wool, ODCORRECT" }],
    status: "preview",
    featured: true,
    releasedAt: "2026-09-01",
    seo: {
      title: "The No. 01 Overcoat — ODCORRECT",
      description:
        "A full-canvas double-faced wool overcoat, hand-built at the shoulder. A preview piece from the first ODCORRECT chapter.",
    },
  },
  {
    id: "p-002",
    slug: "the-refusal-shirt",
    name: "The Refusal Shirt",
    category: "clothing",
    sku: "OD-CL-002",
    price: 18500,
    currency: "INR",
    shortDescription: "Ivory poplin, cut long, finished by hand.",
    description:
      "A shirt with nothing to prove. Long-staple cotton poplin, a collar that holds its shape unaided, and side seams closed with a single needle. It is the quietest thing in the wardrobe and the most worn.",
    materials: ["Long-staple cotton poplin", "Single-needle side seams", "Mother-of-pearl buttons"],
    care: "Machine wash cold. Press damp.",
    sizes: CLOTHING_SIZES,
    colours: ["Ivory", "Soft White"],
    variants: buildVariants("OD-CL-002", CLOTHING_SIZES, ["Ivory", "Soft White"]),
    images: [{ src: shirt, alt: "The Refusal Shirt in ivory cotton poplin, ODCORRECT" }],
    status: "preview",
    featured: true,
    releasedAt: "2026-08-24",
    seo: {
      title: "The Refusal Shirt — ODCORRECT",
      description:
        "Long-staple ivory cotton poplin, single-needle finishing, a self-supporting collar. An ODCORRECT preview piece.",
    },
  },
  {
    id: "p-003",
    slug: "the-house-trouser",
    name: "The House Trouser",
    category: "clothing",
    sku: "OD-CL-003",
    price: 26500,
    currency: "INR",
    shortDescription: "High-rise wool tailoring with a single forward pleat.",
    description:
      "Tailored from a dry-finished wool that creases where it should and nowhere else. A single forward pleat, an extended waistband, and a leg that falls straight from hip to hem.",
    materials: ["Dry-finished virgin wool", "Extended tab waistband", "Curtained interior"],
    care: "Dry clean. Hang from the cuff.",
    sizes: CLOTHING_SIZES,
    colours: ["Deep Black", "Slate"],
    variants: buildVariants("OD-CL-003", CLOTHING_SIZES, ["Deep Black", "Slate"]),
    images: [{ src: trouser, alt: "The House Trouser in black wool, ODCORRECT" }],
    status: "preview",
    featured: false,
    releasedAt: "2026-08-18",
    seo: {
      title: "The House Trouser — ODCORRECT",
      description:
        "High-rise dry-finished wool trousers with a single forward pleat and curtained interior. An ODCORRECT preview piece.",
    },
  },
  {
    id: "p-004",
    slug: "the-essential-knit",
    name: "The Essential Knit",
    category: "clothing",
    sku: "OD-CL-004",
    price: 32000,
    currency: "INR",
    shortDescription: "Grade-A cashmere, fully fashioned, unhurried.",
    description:
      "Knitted in a fine gauge from grade-A cashmere and fully fashioned so the shoulder follows the body rather than the pattern. It softens with wear and never loses its line.",
    materials: ["Grade-A cashmere", "Fully fashioned panels", "Hand-linked collar"],
    care: "Hand wash cool. Dry flat.",
    sizes: CLOTHING_SIZES,
    colours: ["Muted Grey", "Deep Black"],
    variants: buildVariants("OD-CL-004", CLOTHING_SIZES, ["Muted Grey", "Deep Black"]),
    images: [{ src: knit, alt: "The Essential Knit in grey cashmere, ODCORRECT" }],
    status: "preview",
    featured: false,
    releasedAt: "2026-08-10",
    seo: {
      title: "The Essential Knit — ODCORRECT",
      description:
        "A fine-gauge grade-A cashmere knit, fully fashioned and hand-linked. An ODCORRECT preview piece.",
    },
  },
  {
    id: "p-005",
    slug: "the-no-01-derby",
    name: "The No. 01 Derby",
    category: "footwear",
    sku: "OD-FW-001",
    price: 68000,
    currency: "INR",
    shortDescription: "Goodyear-welted calf. Built to be renewed, not replaced.",
    description:
      "A cap-toe derby on a last refined until the line became inevitable. Goodyear welted over an oak-bark sole so the shoe can be rebuilt for as long as its owner wants it.",
    materials: ["Box calf leather", "Goodyear welted", "Oak-bark tanned sole"],
    care: "Cedar trees between wears. Cream polish monthly.",
    sizes: SHOE_SIZES,
    colours: ["Black", "Dark Oak"],
    variants: buildVariants("OD-FW-001", SHOE_SIZES, ["Black", "Dark Oak"], 4),
    images: [{ src: derby, alt: "The No. 01 Derby in black calf leather, ODCORRECT" }],
    status: "preview",
    featured: true,
    releasedAt: "2026-09-01",
    seo: {
      title: "The No. 01 Derby — ODCORRECT",
      description:
        "A Goodyear-welted box calf derby on an oak-bark sole, resolable for decades. An ODCORRECT preview piece.",
    },
  },
  {
    id: "p-006",
    slug: "the-house-loafer",
    name: "The House Loafer",
    category: "footwear",
    sku: "OD-FW-002",
    price: 54000,
    currency: "INR",
    shortDescription: "Unlined suede, hand-lasted, quietly worn in.",
    description:
      "An unlined suede loafer, hand-lasted and blake-stitched to sit close to the foot from the first hour. The vamp softens quickly; the shape does not.",
    materials: ["Unlined suede", "Blake stitched", "Vegetable-tanned insole"],
    care: "Brush with crepe. Protect before first wear.",
    sizes: SHOE_SIZES,
    colours: ["Dark Brown", "Stone"],
    variants: buildVariants("OD-FW-002", SHOE_SIZES, ["Dark Brown", "Stone"], 4),
    images: [{ src: loafer, alt: "The House Loafer in dark brown suede, ODCORRECT" }],
    status: "preview",
    featured: false,
    releasedAt: "2026-08-20",
    seo: {
      title: "The House Loafer — ODCORRECT",
      description:
        "An unlined, hand-lasted suede loafer, blake-stitched for closeness. An ODCORRECT preview piece.",
    },
  },
  {
    id: "p-007",
    slug: "the-odcorrect-court",
    name: "The ODCORRECT Court",
    category: "footwear",
    sku: "OD-FW-003",
    price: 42000,
    currency: "INR",
    shortDescription: "Full-grain court silhouette. No logo, no noise.",
    description:
      "A low court shoe in full-grain Italian calf with a cupsole cut flush to the upper. Deliberately unbranded — the only mark it carries is wear.",
    materials: ["Full-grain Italian calf", "Vulcanised cupsole", "Unbranded upper"],
    care: "Wipe with a damp cloth. Air dry.",
    sizes: SHOE_SIZES,
    colours: ["Soft White", "Black"],
    variants: buildVariants("OD-FW-003", SHOE_SIZES, ["Soft White", "Black"], 5),
    images: [{ src: court, alt: "The ODCORRECT Court in white full-grain leather" }],
    status: "preview",
    featured: false,
    releasedAt: "2026-08-05",
    seo: {
      title: "The ODCORRECT Court — ODCORRECT",
      description:
        "A deliberately unbranded full-grain calf court shoe on a flush cupsole. An ODCORRECT preview piece.",
    },
  },
  {
    id: "p-008",
    slug: "odcorrect-01-origin",
    name: "ODCORRECT 01 — ORIGIN",
    category: "fragrance",
    sku: "OD-FR-001",
    price: 28000,
    currency: "INR",
    shortDescription: "Extrait. Iris, cedar, warm skin.",
    description:
      "The first composition of the house. Orris butter given six months to settle over Virginian cedar and a base of ambrette and skin-warm musk. Worn close; noticed only by those already near.",
    materials: ["Extrait de parfum 25%", "Orris butter", "Refillable weighted flacon"],
    care: "Store away from light. 100ml.",
    sizes: [],
    colours: ["100ml"],
    variants: buildVariants("OD-FR-001", [], ["100ml"], 12),
    images: [{ src: fragranceOrigin, alt: "ODCORRECT 01 ORIGIN extrait de parfum flacon" }],
    status: "preview",
    featured: true,
    releasedAt: "2026-09-01",
    seo: {
      title: "ODCORRECT 01 — ORIGIN — ODCORRECT",
      description:
        "An extrait de parfum of orris butter, Virginian cedar and skin-warm musk in a refillable flacon. An ODCORRECT preview composition.",
    },
  },
  {
    id: "p-009",
    slug: "odcorrect-02-refusal",
    name: "ODCORRECT 02 — REFUSAL",
    category: "fragrance",
    sku: "OD-FR-002",
    price: 28000,
    currency: "INR",
    shortDescription: "Extrait. Vetiver, smoked leather, black tea.",
    description:
      "Haitian vetiver distilled long, laid against smoked leather and a dry black tea accord. Austere at the opening, unmistakably warm by the third hour.",
    materials: ["Extrait de parfum 25%", "Haitian vetiver", "Refillable weighted flacon"],
    care: "Store away from light. 100ml.",
    sizes: [],
    colours: ["100ml"],
    variants: buildVariants("OD-FR-002", [], ["100ml"], 12),
    images: [{ src: fragranceRefusal, alt: "ODCORRECT 02 REFUSAL extrait de parfum flacon" }],
    status: "preview",
    featured: false,
    releasedAt: "2026-08-22",
    seo: {
      title: "ODCORRECT 02 — REFUSAL — ODCORRECT",
      description:
        "Haitian vetiver, smoked leather and dry black tea in a 25% extrait. An ODCORRECT preview composition.",
    },
  },
  {
    id: "p-010",
    slug: "odcorrect-03-after-dark",
    name: "ODCORRECT 03 — AFTER DARK",
    category: "fragrance",
    sku: "OD-FR-003",
    price: 31000,
    currency: "INR",
    shortDescription: "Extrait. Oud, tonka, night-blooming jasmine.",
    description:
      "The house after hours. Cultivated oud held under night-blooming jasmine, closing on tonka and a trace of resin. The most projecting of the three, still meant for arm's length.",
    materials: ["Extrait de parfum 28%", "Cultivated oud", "Refillable weighted flacon"],
    care: "Store away from light. 100ml.",
    sizes: [],
    colours: ["100ml"],
    variants: buildVariants("OD-FR-003", [], ["100ml"], 10),
    images: [{ src: fragranceAfterDark, alt: "ODCORRECT 03 AFTER DARK extrait de parfum flacon" }],
    status: "preview",
    featured: false,
    releasedAt: "2026-08-12",
    seo: {
      title: "ODCORRECT 03 — AFTER DARK — ODCORRECT",
      description:
        "Cultivated oud, night-blooming jasmine and tonka in a 28% extrait. An ODCORRECT preview composition.",
    },
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function relatedProducts(product: Product, limit = 3): Product[] {
  const sameCategory = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug,
  );
  const rest = PRODUCTS.filter(
    (p) => p.category !== product.category && p.slug !== product.slug,
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}
