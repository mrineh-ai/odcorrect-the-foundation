import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/lux/Reveal";
import { getProduct, relatedProducts, formatPrice, CATEGORY_LABELS } from "@/data/products";
import { useCart } from "@/lib/cart";
import { absoluteUrl, breadcrumbLd, OG_IMAGE } from "@/lib/seo";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Piece Unavailable — ODCORRECT" }, { name: "robots", content: "noindex" }],
      };
    }
    const p = loaderData.product;
    const url = absoluteUrl(`/shop/${p.slug}`);
    return {
      meta: [
        { title: p.seo.title },
        { name: "description", content: p.seo.description },
        { property: "og:title", content: p.seo.title },
        { property: "og:description", content: p.seo.description },
        { property: "og:url", content: url },
        { property: "og:type", content: "product" },
        { property: "og:image", content: OG_IMAGE },
        { name: "twitter:title", content: p.seo.title },
        { name: "twitter:description", content: p.seo.description },
        { name: "twitter:image", content: OG_IMAGE },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        breadcrumbLd([
          { name: "Shop", path: "/shop" },
          { name: p.name, path: `/shop/${params.slug}` },
        ]),
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            sku: p.sku,
            description: p.seo.description,
            brand: { "@type": "Brand", name: "ODCORRECT" },
            category: CATEGORY_LABELS[p.category],
            material: p.materials.join(", "),
            url,
            offers: {
              "@type": "Offer",
              url,
              priceCurrency: "INR",
              price: p.price,
              availability: "https://schema.org/PreOrder",
              itemCondition: "https://schema.org/NewCondition",
            },
          }),
        },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const cart = useCart();
  const navigate = useNavigate();

  const hasSizes = product.sizes.length > 0;
  const [size, setSize] = useState<string | undefined>(product.sizes[0]);
  const [colour, setColour] = useState<string>(product.colours[0]!);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const variant = useMemo(
    () =>
      product.variants.find(
        (v) => v.colour === colour && (hasSizes ? v.size === size : true),
      ) ?? product.variants[0]!,
    [product.variants, colour, size, hasSizes],
  );

  const unitPrice = product.price + (variant.priceDelta ?? 0);
  const related = relatedProducts(product);

  const addToCart = () => {
    cart.add({
      productId: product.id,
      slug: product.slug,
      variantSku: variant.sku,
      ...(variant.size ? { size: variant.size } : {}),
      colour: variant.colour,
      quantity,
      unitPrice,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2600);
  };

  const buyNow = () => {
    addToCart();
    void navigate({ to: "/checkout" });
  };

  const image = product.images[activeImage] ?? product.images[0]!;

  return (
    <main className="pt-32 lg:pt-40">
      <div className="shell">
        <nav aria-label="Breadcrumb" className="text-[0.58rem] uppercase tracking-[0.3em] text-muted-foreground">
          <Link to="/shop" className="transition-colors duration-300 hover:text-gold">
            The Collection
          </Link>
          <span className="px-3">/</span>
          <span>{CATEGORY_LABELS[product.category]}</span>
        </nav>

        <div className="mt-12 grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <div className="overflow-hidden bg-ink">
              <img
                src={image.src}
                alt={image.alt}
                width={896}
                height={1152}
                loading="eager"
                className="aspect-[7/9] w-full object-cover"
              />
            </div>
            {product.images.length > 1 ? (
              <div className="mt-4 flex gap-4">
                {product.images.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                    className="h-24 w-20 overflow-hidden border transition-colors duration-300"
                    style={{ borderColor: i === activeImage ? "var(--gold)" : "var(--border)" }}
                  >
                    <img src={img.src} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="lg:pt-6">
            <p className="eyebrow">{CATEGORY_LABELS[product.category]} · Preview</p>
            <h1 className="display-lg mt-6 text-foreground">{product.name}</h1>
            <p className="mt-6 text-lg font-light text-muted-foreground">
              {formatPrice(unitPrice)}
            </p>
            <p className="body-lux mt-8">{product.description}</p>

            {hasSizes ? (
              <fieldset className="mt-12">
                <legend className="text-[0.6rem] uppercase tracking-[0.32em] text-muted-foreground">
                  Size
                </legend>
                <div className="mt-5 flex flex-wrap gap-3">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      aria-pressed={size === s}
                      className="min-w-14 border px-4 py-3 text-[0.64rem] uppercase tracking-[0.22em] transition-all duration-200"
                      style={{
                        borderColor: size === s ? "var(--gold)" : "var(--border)",
                        color: size === s ? "var(--gold)" : "var(--foreground)",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </fieldset>
            ) : null}

            <fieldset className="mt-10">
              <legend className="text-[0.6rem] uppercase tracking-[0.32em] text-muted-foreground">
                {product.category === "fragrance" ? "Volume" : "Colour"}
              </legend>
              <div className="mt-5 flex flex-wrap gap-3">
                {product.colours.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColour(c)}
                    aria-pressed={colour === c}
                    className="border px-5 py-3 text-[0.64rem] uppercase tracking-[0.22em] transition-all duration-200"
                    style={{
                      borderColor: colour === c ? "var(--gold)" : "var(--border)",
                      color: colour === c ? "var(--gold)" : "var(--foreground)",
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-10 flex items-center gap-6">
              <span className="text-[0.6rem] uppercase tracking-[0.32em] text-muted-foreground">
                Quantity
              </span>
              <div className="flex items-center border border-border">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="px-4 py-2 text-foreground transition-colors duration-200 hover:text-gold"
                >
                  −
                </button>
                <span className="min-w-10 text-center text-sm text-foreground">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  aria-label="Increase quantity"
                  className="px-4 py-2 text-foreground transition-colors duration-200 hover:text-gold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <button type="button" onClick={addToCart} className="btn-lux-gold">
                Add to Cart
              </button>
              <button type="button" onClick={buyNow} className="btn-lux">
                Buy Now
              </button>
            </div>
            <p
              aria-live="polite"
              className="mt-5 h-5 text-[0.6rem] uppercase tracking-[0.28em] text-gold"
            >
              {added ? "Added to your cart" : ""}
            </p>

            <div className="mt-14 border-t border-border pt-10">
              <h2 className="text-[0.6rem] uppercase tracking-[0.32em] text-muted-foreground">
                Materials &amp; Craft
              </h2>
              <ul className="mt-5 space-y-2 text-sm font-light text-muted-foreground">
                {product.materials.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
              {product.care ? (
                <p className="mt-5 text-sm font-light text-muted-foreground">{product.care}</p>
              ) : null}
            </div>

            <div className="mt-10 border-t border-border pt-10">
              <h2 className="text-[0.6rem] uppercase tracking-[0.32em] text-muted-foreground">
                Shipping &amp; Returns
              </h2>
              <p className="mt-5 text-sm font-light leading-relaxed text-muted-foreground">
                This is a preview piece from the first chapter — nothing is dispatched yet.
                When the house opens, orders ship insured worldwide, with complimentary
                delivery in India and thirty days to return an unworn piece.
              </p>
            </div>
          </div>
        </div>

        <section className="section-pad">
          <h2 className="display-md text-foreground">Also of the House</h2>
          <div className="mt-12 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Reveal key={r.slug}>
                <Link to="/shop/$slug" params={{ slug: r.slug }} className="group block">
                  <div className="overflow-hidden bg-ink">
                    <img
                      src={r.images[0]!.src}
                      alt={r.images[0]!.alt}
                      width={896}
                      height={1152}
                      loading="lazy"
                      className="aspect-[7/9] w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-6">
                    <h3 className="font-serif text-lg font-light text-foreground">{r.name}</h3>
                    <p className="text-sm font-light text-muted-foreground">
                      {formatPrice(r.price)}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
