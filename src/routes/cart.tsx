import { createFileRoute, Link } from "@tanstack/react-router";
import { formatPrice } from "@/data/products";
import { lineProduct, useCart } from "@/lib/cart";
import { absoluteUrl } from "@/lib/seo";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — ODCORRECT" },
      {
        name: "description",
        content: "Review the pieces held in your ODCORRECT cart before checkout.",
      },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "Your Cart — ODCORRECT" },
      {
        property: "og:description",
        content: "Review the pieces held in your ODCORRECT cart before checkout.",
      },
      { property: "og:url", content: absoluteUrl("/cart") },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/cart") }],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, subtotal, total, count, setQuantity, remove, ready } = useCart();

  return (
    <main className="pt-36 lg:pt-44">
      <div className="shell pb-28">
        <p className="eyebrow">The Boutique</p>
        <h1 className="display-lg mt-6 text-foreground">Your Cart</h1>

        {!ready ? (
          <p className="body-lux mt-10">Retrieving your selection…</p>
        ) : lines.length === 0 ? (
          <div className="mt-12 max-w-lg">
            <p className="body-lux">
              Nothing is held yet. The first chapter is presented in the boutique.
            </p>
            <div className="mt-10">
              <Link to="/shop" className="btn-lux-gold">
                Enter the Collection
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-14 grid gap-16 lg:grid-cols-[1.6fr_1fr] lg:gap-24">
            <ul className="border-t border-border">
              {lines.map((line) => {
                const product = lineProduct(line);
                return (
                  <li
                    key={line.variantSku}
                    className="flex gap-6 border-b border-border py-8 sm:gap-8"
                  >
                    {product ? (
                      <Link
                        to="/shop/$slug"
                        params={{ slug: line.slug }}
                        className="w-24 shrink-0 overflow-hidden bg-ink sm:w-32"
                      >
                        <img
                          src={product.images[0]!.src}
                          alt={product.images[0]!.alt}
                          loading="lazy"
                          className="aspect-[7/9] w-full object-cover"
                        />
                      </Link>
                    ) : null}

                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <div>
                          <h2 className="font-serif text-lg font-light text-foreground">
                            {product?.name ?? line.slug}
                          </h2>
                          <p className="mt-2 text-[0.6rem] uppercase tracking-[0.26em] text-muted-foreground">
                            {[line.size, line.colour].filter(Boolean).join(" · ")}
                          </p>
                          <p className="mt-1 text-[0.55rem] uppercase tracking-[0.24em] text-muted-foreground">
                            {line.variantSku}
                          </p>
                        </div>
                        <p className="text-sm font-light text-muted-foreground">
                          {formatPrice(line.unitPrice * line.quantity)}
                        </p>
                      </div>

                      <div className="mt-6 flex items-center justify-between gap-6">
                        <div className="flex items-center border border-border">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => setQuantity(line.variantSku, line.quantity - 1)}
                            className="px-4 py-2 text-foreground transition-colors duration-200 hover:text-gold"
                          >
                            −
                          </button>
                          <span className="min-w-10 text-center text-sm text-foreground">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => setQuantity(line.variantSku, line.quantity + 1)}
                            className="px-4 py-2 text-foreground transition-colors duration-200 hover:text-gold"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(line.variantSku)}
                          className="text-[0.58rem] uppercase tracking-[0.28em] text-muted-foreground transition-colors duration-300 hover:text-gold"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <aside className="h-fit border border-border p-8 lg:sticky lg:top-32">
              <h2 className="text-[0.6rem] uppercase tracking-[0.32em] text-muted-foreground">
                Summary
              </h2>
              <dl className="mt-8 space-y-4 text-sm font-light text-muted-foreground">
                <div className="flex justify-between">
                  <dt>Items</dt>
                  <dd>{count}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Delivery</dt>
                  <dd>Calculated at checkout</dd>
                </div>
              </dl>
              <div className="mt-8 flex justify-between border-t border-border pt-6 text-foreground">
                <span className="text-[0.62rem] uppercase tracking-[0.3em]">Total</span>
                <span className="font-serif text-xl font-light">{formatPrice(total)}</span>
              </div>
              <div className="mt-10 flex flex-col gap-4">
                <Link to="/checkout" className="btn-lux-gold w-full">
                  Checkout
                </Link>
                <Link to="/shop" className="btn-lux w-full">
                  Continue
                </Link>
              </div>
              <p className="mt-8 text-[0.55rem] uppercase leading-relaxed tracking-[0.24em] text-muted-foreground">
                Preview catalogue — no order is dispatched yet.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
