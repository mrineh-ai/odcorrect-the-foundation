import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/lux/Reveal";
import {
  CATEGORY_LABELS,
  PRODUCTS,
  formatPrice,
  type Product,
  type ProductCategory,
} from "@/data/products";
import { absoluteUrl, breadcrumbLd, OG_IMAGE, SITE_URL } from "@/lib/seo";

const TITLE = "The Collection — Shop | ODCORRECT";
const DESCRIPTION =
  "The ODCORRECT digital boutique. Preview the first clothing, footwear and fragrance pieces of the house — considered without compromise.";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "The Collection — ODCORRECT" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: absoluteUrl("/shop") },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:title", content: "The Collection — ODCORRECT" },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/shop") }],
    scripts: [
      breadcrumbLd([{ name: "Shop", path: "/shop" }]),
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "The Collection — ODCORRECT",
          url: absoluteUrl("/shop"),
          description: DESCRIPTION,
          isPartOf: { "@id": `${SITE_URL}/#website` },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: PRODUCTS.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.name,
              url: absoluteUrl(`/shop/${p.slug}`),
            })),
          },
        }),
      },
    ],
  }),
  component: ShopPage,
});

const FILTERS: Array<ProductCategory | "all"> = ["all", "clothing", "footwear", "fragrance"];

type SortKey = "featured" | "newest" | "price-asc" | "price-desc";

const SORTS: Array<{ key: SortKey; label: string }> = [
  { key: "featured", label: "Featured" },
  { key: "newest", label: "Newest" },
  { key: "price-asc", label: "Price Low → High" },
  { key: "price-desc", label: "Price High → Low" },
];

function sortProducts(items: Product[], key: SortKey): Product[] {
  const copy = [...items];
  switch (key) {
    case "newest":
      return copy.sort((a, b) => b.releasedAt.localeCompare(a.releasedAt));
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    default:
      return copy.sort(
        (a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name),
      );
  }
}

function ShopPage() {
  const [filter, setFilter] = useState<ProductCategory | "all">("all");
  const [sort, setSort] = useState<SortKey>("featured");

  const visible = useMemo(() => {
    const filtered = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);
    return sortProducts(filtered, sort);
  }, [filter, sort]);

  return (
    <main>
      <section className="on-dark relative flex min-h-[52vh] items-end overflow-hidden bg-ink pb-16 pt-40 lg:min-h-[58vh] lg:pb-20">
        <div className="shell relative">
          <Reveal>
            <p className="eyebrow">The Boutique</p>
            <h1 className="display-xl mt-8 max-w-4xl text-foreground">The Collection</h1>
            <p className="body-lux mt-10 max-w-xl">
              Clothing. Footwear. Fragrance.
              <br />
              Considered without compromise.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="hairline-t bg-background pb-24 pt-10 lg:pb-32">
        <div className="shell">
          <div className="flex flex-col gap-8 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div
              role="group"
              aria-label="Filter by category"
              className="flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              {FILTERS.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  aria-pressed={filter === key}
                  className="text-[0.68rem] uppercase tracking-[0.34em] transition-colors duration-300"
                  style={{
                    color: filter === key ? "var(--gold)" : "var(--muted-foreground)",
                  }}
                >
                  {CATEGORY_LABELS[key]}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-4 text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground">
              <span>Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="border-b border-border bg-transparent pb-1 pr-2 text-[0.66rem] uppercase tracking-[0.24em] text-foreground focus:outline-none focus-visible:border-gold"
              >
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key} className="bg-charcoal text-foreground">
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <p className="mt-8 text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
            {visible.length} {visible.length === 1 ? "piece" : "pieces"} · Preview catalogue
          </p>

          <div className="mt-14 grid gap-x-10 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((product, i) => (
              <Reveal key={product.slug} delay={(i % 3) * 90}>
                <Link
                  to="/shop/$slug"
                  params={{ slug: product.slug }}
                  className="group block"
                  aria-label={`${product.name} — view piece`}
                >
                  <div className="relative overflow-hidden bg-ink">
                    <img
                      src={product.images[0]!.src}
                      alt={product.images[0]!.alt}
                      width={896}
                      height={1152}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[7/9] w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    <span className="absolute left-0 top-0 bg-ink/70 px-4 py-2 text-[0.55rem] uppercase tracking-[0.3em] text-gold backdrop-blur-sm">
                      Preview
                    </span>
                  </div>
                  <div className="mt-6 flex items-baseline justify-between gap-6">
                    <h2 className="font-serif text-xl font-light text-foreground">
                      {product.name}
                    </h2>
                    <p className="shrink-0 text-sm font-light text-muted-foreground">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                  <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
                    {product.shortDescription}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
