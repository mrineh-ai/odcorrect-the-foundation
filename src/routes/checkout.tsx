import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { formatPrice } from "@/data/products";
import { lineProduct, useCart } from "@/lib/cart";
import { absoluteUrl } from "@/lib/seo";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — ODCORRECT" },
      {
        name: "description",
        content: "Complete your ODCORRECT order details.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Checkout — ODCORRECT" },
      { property: "og:description", content: "Complete your ODCORRECT order details." },
      { property: "og:url", content: absoluteUrl("/checkout") },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/checkout") }],
  }),
  component: CheckoutPage,
});

/**
 * Delivery options are declared as data so a real rate engine (or a
 * `shipping_methods` table) can replace them without touching the form.
 */
const DELIVERY = [
  { id: "standard", label: "Standard — 5-7 working days", price: 0 },
  { id: "express", label: "Express — 2-3 working days", price: 1500 },
  { id: "white-glove", label: "White glove — appointment delivery", price: 4500 },
] as const;

type DeliveryId = (typeof DELIVERY)[number]["id"];

function Field({
  label,
  name,
  type = "text",
  required = true,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-[0.58rem] uppercase tracking-[0.28em] text-muted-foreground">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete ?? "on"}
        className="form-field mt-3"
      />
    </label>
  );
}

function CheckoutPage() {
  const { lines, subtotal, ready } = useCart();
  const [delivery, setDelivery] = useState<DeliveryId>("standard");
  const [notice, setNotice] = useState("");

  const deliveryCost = DELIVERY.find((d) => d.id === delivery)!.price;
  const total = subtotal + (lines.length > 0 ? deliveryCost : 0);

  /**
   * Payment is intentionally not wired. When a gateway (Razorpay) is added,
   * this handler creates the order server-side and hands the returned order
   * id to the gateway — the form and summary above stay unchanged.
   */
  const placeOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice(
      "Payments are not open yet. Your details were not submitted and no order was placed — the first chapter releases soon.",
    );
  };

  return (
    <main className="pt-36 lg:pt-44">
      <div className="shell pb-28">
        <p className="eyebrow">The Boutique</p>
        <h1 className="display-lg mt-6 text-foreground">Checkout</h1>

        {ready && lines.length === 0 ? (
          <div className="mt-12 max-w-lg">
            <p className="body-lux">Your cart is empty.</p>
            <div className="mt-10">
              <Link to="/shop" className="btn-lux-gold">
                Enter the Collection
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-14 grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-24">
            <form onSubmit={placeOrder} className="space-y-16">
              <fieldset>
                <legend className="text-[0.62rem] uppercase tracking-[0.32em] text-gold">
                  Contact
                </legend>
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <Field label="Full name" name="name" autoComplete="name" />
                  <Field label="Email" name="email" type="email" autoComplete="email" />
                  <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-[0.62rem] uppercase tracking-[0.32em] text-gold">
                  Shipping address
                </legend>
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Field label="Address" name="address1" autoComplete="address-line1" />
                  </div>
                  <div className="sm:col-span-2">
                    <Field
                      label="Apartment, suite (optional)"
                      name="address2"
                      required={false}
                      autoComplete="address-line2"
                    />
                  </div>
                  <Field label="City" name="city" autoComplete="address-level2" />
                  <Field label="State" name="state" autoComplete="address-level1" />
                  <Field label="Postal code" name="postalCode" autoComplete="postal-code" />
                  <Field label="Country" name="country" autoComplete="country-name" />
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-[0.62rem] uppercase tracking-[0.32em] text-gold">
                  Delivery
                </legend>
                <div className="mt-8 space-y-4">
                  {DELIVERY.map((option) => (
                    <label
                      key={option.id}
                      className="flex cursor-pointer items-center justify-between border px-6 py-5 transition-colors duration-300"
                      style={{
                        borderColor: delivery === option.id ? "var(--gold)" : "var(--border)",
                      }}
                    >
                      <span className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="delivery"
                          value={option.id}
                          checked={delivery === option.id}
                          onChange={() => setDelivery(option.id)}
                          className="accent-[var(--gold)]"
                        />
                        <span className="text-sm font-light text-foreground">{option.label}</span>
                      </span>
                      <span className="text-sm font-light text-muted-foreground">
                        {option.price === 0 ? "Complimentary" : formatPrice(option.price)}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <button type="submit" className="btn-lux-gold">
                  Place Order
                </button>
                <p
                  aria-live="polite"
                  className="mt-6 max-w-md text-sm font-light leading-relaxed text-muted-foreground"
                >
                  {notice}
                </p>
              </div>
            </form>

            <aside className="h-fit border border-border p-8 lg:sticky lg:top-32">
              <h2 className="text-[0.6rem] uppercase tracking-[0.32em] text-muted-foreground">
                Order summary
              </h2>
              <ul className="mt-8 space-y-6">
                {lines.map((line) => {
                  const product = lineProduct(line);
                  return (
                    <li key={line.variantSku} className="flex gap-4">
                      {product ? (
                        <img
                          src={product.images[0]!.src}
                          alt=""
                          loading="lazy"
                          className="h-20 w-16 shrink-0 object-cover"
                        />
                      ) : null}
                      <div className="flex-1">
                        <p className="font-serif text-base font-light text-foreground">
                          {product?.name ?? line.slug}
                        </p>
                        <p className="mt-1 text-[0.55rem] uppercase tracking-[0.24em] text-muted-foreground">
                          {[line.size, line.colour].filter(Boolean).join(" · ")} · ×{line.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-light text-muted-foreground">
                        {formatPrice(line.unitPrice * line.quantity)}
                      </p>
                    </li>
                  );
                })}
              </ul>

              <dl className="mt-8 space-y-4 border-t border-border pt-6 text-sm font-light text-muted-foreground">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Delivery</dt>
                  <dd>{deliveryCost === 0 ? "Complimentary" : formatPrice(deliveryCost)}</dd>
                </div>
              </dl>
              <div className="mt-6 flex justify-between border-t border-border pt-6 text-foreground">
                <span className="text-[0.62rem] uppercase tracking-[0.3em]">Total</span>
                <span className="font-serif text-xl font-light">{formatPrice(total)}</span>
              </div>
              <p className="mt-8 text-[0.55rem] uppercase leading-relaxed tracking-[0.24em] text-muted-foreground">
                Preview catalogue — payments open with the first chapter.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
