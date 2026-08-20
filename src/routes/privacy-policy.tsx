import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/lux/Reveal";
import { absoluteUrl, breadcrumbLd, OG_IMAGE } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — ODCORRECT" },
      {
        name: "description",
        content:
          "How ODCORRECT collects, uses and protects personal information submitted through this website.",
      },
      { property: "og:title", content: "Privacy Policy — ODCORRECT" },
      {
        property: "og:description",
        content: "How ODCORRECT handles and protects personal information.",
      },

      { property: "og:url", content: absoluteUrl("/privacy-policy") },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/privacy-policy") }],
    scripts: [breadcrumbLd([{ name: "Privacy Policy", path: "/privacy-policy" }])],
  }),
  component: Privacy,
});

const SECTIONS = [
  {
    title: "Information We Collect",
    body: "We collect only what is necessary: the email address you provide when joining our private list, and the name, email address and message you submit through our contact form. We do not purchase data, and we do not build profiles.",
  },
  {
    title: "How Information Is Used",
    body: "Your details are used to respond to your enquiry and, where you have asked for it, to send launch announcements, previews and occasional letters from the atelier. Nothing more.",
  },
  {
    title: "Sharing",
    body: "We do not sell, rent or trade personal information. Data may be processed by service providers who host this site or deliver our correspondence, strictly on our instruction and under confidentiality.",
  },
  {
    title: "Storage",
    body: "Details submitted through this site are stored in an access-controlled database used solely by the house. Submissions cannot be read publicly, and access is limited to the person answering your message.",
  },
  {
    title: "Cookies",
    body: "This site uses only the storage required for it to function, such as remembering that you have already seen our introduction during a visit. No advertising trackers are used.",
  },
  {
    title: "Retention",
    body: "Correspondence is retained for as long as it is useful to answer you properly. Subscription details are retained until you ask us to remove them.",
  },
  {
    title: "Your Rights",
    body: "You may request access to, correction of, or deletion of your personal information at any time by writing to ceo@odcorrect.in. Every unsubscribe request is honoured immediately.",
  },
  {
    title: "Changes",
    body: "If this policy changes materially, the revised version will be published on this page with an updated effective date.",
  },
];

function Privacy() {
  return (
    <main>
      <section className="section-pad bg-background pt-40">
        <div className="shell">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Legal</p>
            <h1 className="display-lg mt-8 text-foreground">Privacy Policy</h1>
            <p className="body-lux mt-8">
              ODCORRECT treats personal information with the same restraint it applies to
              everything else. This policy explains what we hold and why.
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
              <p className="eyebrow-muted">
                Enquiries regarding this policy: ceo@odcorrect.in
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
