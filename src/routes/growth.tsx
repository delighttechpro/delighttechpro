import { createFileRoute } from "@tanstack/react-router";
import { Cta, CtaBand, PageHero, Reveal, SectionHead, seo } from "@/components/site/ui";

export const Route = createFileRoute("/growth")({
  head: () => seo("eCommerce Growth & Marketing Services | DelighTech Pro", "Paid ads, SEO, email, CRO and retention for Shopify brands — connected into one growth system."),
  component: Page,
});

const stages = [
  ["Traffic", "Meta, Google and TikTok Ads, SEO and content that bring qualified visitors."],
  ["Experience", "Pages, navigation and product storytelling that build confidence."],
  ["Conversion", "CRO, A/B testing and checkout improvements that turn visits into orders."],
  ["Retention", "Email flows, retargeting and loyalty that bring customers back."],
  ["Growth", "Analytics, AOV and LTV strategy that make scaling profitable."],
];

function Page() {
  return (
    <>
      <PageHero eyebrow="eCommerce Growth" title="Traffic is only the beginning." intro="Marketing that's connected to the store it sends people to. We plan, run and optimize every stage of the customer journey.">
        <Cta to="/contact">Get an eCommerce Audit</Cta>
      </PageHero>
      <section className="container-site py-24 md:py-32">
        <SectionHead eyebrow="The growth chain" title="Five stages. One system." />
        <div className="mt-16 space-y-4">
          {stages.map(([t, d], i) => (
            <Reveal key={t} delay={i * 60}>
              <div className="grid items-center gap-6 rounded-2xl bg-card p-8 md:grid-cols-12" style={{ marginLeft: `${i * 3}%` }}>
                <span className="font-display text-5xl font-semibold text-ring md:col-span-2">0{i + 1}</span>
                <h3 className="text-3xl font-semibold md:col-span-3">{t}</h3>
                <p className="text-muted-foreground md:col-span-7">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand title="Let's find your biggest growth lever." />
    </>
  );
}
