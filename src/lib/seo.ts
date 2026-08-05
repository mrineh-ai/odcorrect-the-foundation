/**
 * Central SEO constants for ODCORRECT.
 *
 * Swap OG_IMAGE for a dedicated 1200x630 social card when one is produced —
 * every route reads from here, so it is a one-line change.
 */
export const SITE_URL = "https://odcorrect.in";
export const SITE_NAME = "ODCORRECT";
export const OG_IMAGE = `${SITE_URL}/odcorrect-logo.png`;
export const LOGO_URL = `${SITE_URL}/odcorrect-logo.png`;

export const SITE_TITLE =
  "ODCORRECT | Luxury Fashion House | Clothing • Footwear • Fragrance";

export const SITE_DESCRIPTION =
  "ODCORRECT is a luxury fashion house creating timeless clothing, premium footwear and refined fragrances through exceptional craftsmanship, modern design and uncompromising quality.";

export const OG_DESCRIPTION =
  "Timeless clothing, premium footwear and luxury fragrances designed for people who appreciate craftsmanship over trends.";


export const SITE_KEYWORDS = [
  "Luxury Fashion",
  "Luxury Clothing",
  "Premium Clothing",
  "Luxury Shoes",
  "Luxury Footwear",
  "Luxury Fragrance",
  "Designer Fashion",
  "Fashion House",
  "Luxury Lifestyle",
  "Premium Brand",
  "Indian Luxury Brand",
  "ODCORRECT",
  "Mrinal Gahlaut",
  "Timeless Fashion",
  "Minimal Luxury",
  "Luxury Apparel",
].join(", ");

/** Absolute URL for a route path ("/about" -> "https://odcorrect.in/about"). */
export function absoluteUrl(path: string): string {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Standard head fragment for a leaf route: canonical, og:url and the
 * social image. Spread the pieces into the route's own head().
 */
export function pageSeo(opts: {
  path: string;
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  image?: string;
  type?: string;
}) {
  const url = absoluteUrl(opts.path);
  const image = opts.image ?? OG_IMAGE;
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { property: "og:title", content: opts.ogTitle ?? opts.title },
      {
        property: "og:description",
        content: opts.ogDescription ?? opts.description,
      },
      { property: "og:url", content: url },
      { property: "og:type", content: opts.type ?? "website" },
      { property: "og:image", content: image },
      { name: "twitter:title", content: opts.ogTitle ?? opts.title },
      {
        name: "twitter:description",
        content: opts.ogDescription ?? opts.description,
      },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

/** BreadcrumbList JSON-LD for an interior page. */
export function breadcrumbLd(trail: Array<{ name: string; path: string }>) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { name: "Home", path: "/" },
        ...trail,
      ].map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: absoluteUrl(item.path),
      })),
    }),
  };
}
