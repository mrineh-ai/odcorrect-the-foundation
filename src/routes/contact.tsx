import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageHero } from "@/components/lux/PageHero";
import { Reveal } from "@/components/lux/Reveal";
import { absoluteUrl, breadcrumbLd, OG_IMAGE } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact the House — ODCORRECT" },
      {
        name: "description",
        content:
          "Enquiries, press and partnerships. Write to the ODCORRECT house directly — every message is read.",
      },
      { property: "og:title", content: "Contact the House — ODCORRECT" },
      {
        property: "og:description",
        content: "Enquiries, press and partnership correspondence with ODCORRECT.",
      },

      { property: "og:url", content: absoluteUrl("/contact") },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/contact") }],
    scripts: [breadcrumbLd([{ name: "Contact", path: "/contact" }])],
  }),
  component: Contact,
});

function Contact() {
  const [status, setStatus] = useState<"idle" | "error">("idle");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) return;
    setStatus("error");
  };

  const field =
    "form-field mt-4";

  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Write to the house."
        intro="Every message is read by someone who can act on it."
      />

      <section className="section-pad bg-background">
        <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-24">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Direct</p>
            <div className="rule-gold mt-8" />
            <dl className="mt-12 space-y-10">
              <div>
                <dt className="eyebrow-muted">General &amp; Press</dt>
                <dd className="mt-3">
                  <a
                    href="mailto:ceo@odcorrect.in"
                    className="text-lg font-light tracking-[0.1em] text-foreground transition-colors duration-700 hover:text-gold"
                  >
                    ceo@odcorrect.in
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow-muted">Atelier</dt>
                <dd className="body-lux mt-3">New Delhi, India</dd>
              </div>
              <div>
                <dt className="eyebrow-muted">Response</dt>
                <dd className="body-lux mt-3">Within three working days</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={140} className="lg:col-span-8">
            <form
              onSubmit={onSubmit}
              onChange={() => setStatus("idle")}
              className="max-w-2xl"
              aria-describedby="contact-status"
            >
              <div className="grid gap-12 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="eyebrow-muted block">
                    Name
                  </label>
                  <input id="c-name" name="name" required autoComplete="name" className={field} placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="c-email" className="eyebrow-muted block">
                    Email
                  </label>
                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={field}
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div className="mt-12">
                <label htmlFor="c-subject" className="eyebrow-muted block">
                  Subject
                </label>
                <input id="c-subject" name="subject" className={field} placeholder="Enquiry" />
              </div>
              <div className="mt-12">
                <label htmlFor="c-message" className="eyebrow-muted block">
                  Message
                </label>
                <textarea
                  id="c-message"
                  name="message"
                  rows={5}
                  required
                  className={`${field} resize-none`}
                  placeholder="How may we help?"
                />
              </div>
              <div className="mt-14">
                <button type="submit" className="btn-lux-gold">
                  Send Message
                </button>
              </div>
              <p
                id="contact-status"
                role="status"
                aria-live="polite"
                className="mt-8 min-h-5 text-xs font-light tracking-[0.16em] text-muted-foreground"
              >
                {status === "error" ? (
                  <>
                    Online delivery is not available yet. Please write to{" "}
                    <a href="mailto:ceo@odcorrect.in" className="text-gold hover:underline">
                      ceo@odcorrect.in
                    </a>
                    .
                  </>
                ) : (
                  "\u00A0"
                )}
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
