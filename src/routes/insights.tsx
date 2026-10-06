import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, PageHero, Reveal, seo } from "@/components/site/ui";

export const Route = createFileRoute("/insights")({
  head: () => seo("Insights — Shopify & eCommerce Growth | DelighTech Pro", "Practical thinking on Shopify development, conversion optimization and eCommerce growth."),
  component: Page,
});

const topics = ["Shopify development", "Conversion optimization", "Paid acquisition", "Retention & email", "Analytics", "Scaling"];

function Page() {
  return (
    <>
      <PageHero eyebrow="Insights" title="Thinking on building and growing eCommerce." intro="Articles and guides are on the way. Here's what we'll be writing about." />
      <section className="container-site grid gap-4 py-24 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((t, i) => (
          <Reveal key={t} delay={i * 50} className="flex aspect-[4/3] flex-col justify-between rounded-2xl bg-card p-8">
            <span className="eyebrow text-muted-foreground">Coming soon</span>
            <h2 className="text-3xl font-semibold">{t}</h2>
          </Reveal>
        ))}
      </section>
      <CtaBand />
    </>
  );
}
