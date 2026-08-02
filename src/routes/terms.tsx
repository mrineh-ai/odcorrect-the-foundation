import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/lux/Reveal";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — ODCORRECT" },
      {
        name: "description",
        content:
          "The terms governing use of the ODCORRECT website, its content, correspondence and intellectual property.",
      },
      { property: "og:title", content: "Terms & Conditions — ODCORRECT" },
      {
        property: "og:description",
        content: "Terms governing use of the ODCORRECT website and its content.",
      },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

const SECTIONS = [
  {
    title: "Acceptance",
    body: "By accessing this website you agree to these terms. If you do not accept them, please do not use the site.",
  },
  {
    title: "Intellectual Property",
    body: "The ODCORRECT name, logo, imagery, editorial text and design of this site are the property of ODCORRECT and are protected by applicable law. Nothing here may be reproduced, redistributed or used commercially without written permission.",
  },
  {
    title: "Pre-Launch Status",
    body: "ODCORRECT is currently pre-launch. No products are offered for sale through this website at present, and no description here constitutes an offer, a price, or a guarantee of future availability.",
  },
  {
    title: "Correspondence",
    body: "Messages and subscriptions submitted through this site are handled in accordance with our Privacy Policy. Please do not submit confidential or unsolicited creative material.",
  },
  {
    title: "Accuracy",
    body: "We take care to keep the information here accurate, but details of future products, materials and timing may change as the first collection is finalised.",
  },
  {
    title: "External Links",
    body: "Where this site links to third-party platforms, we are not responsible for their content or their practices.",
  },
  {
    title: "Liability",
    body: "To the fullest extent permitted by law, ODCORRECT is not liable for any indirect or consequential loss arising from use of this website.",
  },
  {
    title: "Governing Law",
    body: "These terms are governed by the laws of India, and any dispute will be subject to the exclusive jurisdiction of its courts.",
  },
];

function Terms() {
  return (
    <main>
      <section className="section-pad bg-background pt-40">
        <div className="shell">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Legal</p>
            <h1 className="display-lg mt-8 text-foreground">Terms &amp; Conditions</h1>
            <p className="body-lux mt-8">
              The conditions under which this website and its content may be used.
            </p>
          </Reveal>

          <div className="mt-20 max-w-3xl space-y-16">
            {SECTIONS.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <h2 className="display-md text-foreground">{s.title}</h2>
                <p className="body-lux mt-6">{s.body}</p>
              </Reveal>
            ))}
            <Reveal>
              <p className="eyebrow-muted">Questions: ceo@odcorrect.in</p>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
