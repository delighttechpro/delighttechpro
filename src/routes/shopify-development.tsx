import { createFileRoute } from "@tanstack/react-router";
import { Cta, CtaBand, PageHero, Reveal, SectionHead, seo } from "@/components/site/ui";

export const Route = createFileRoute("/shopify-development")({
  head: () => seo("Shopify Development & Store Design | DelighTech Pro", "Custom Shopify 2.0 stores, themes, migrations and integrations — designed for conversion, speed and scale."),
  component: Page,
});

const caps = [
  ["Store design", "Brand-led design systems built around how your customers actually shop."],
  ["Shopify 2.0 & custom themes", "Flexible sections your team can edit without breaking anything."],
  ["App integrations", "The right apps, connected properly — without bloating load times."],
  ["Custom functionality", "Bundles, subscriptions, configurators and logic beyond the theme store."],
  ["Store migration", "Move from WooCommerce, Magento or elsewhere without losing data or SEO."],
  ["Performance & mobile", "Fast, mobile-first storefronts that hold up under real traffic."],
];

function Page() {
  return (
    <>
      <PageHero eyebrow="Shopify Development" title="Stores engineered to sell." intro="We design and develop Shopify stores around brand, user experience, conversion and performance — then hand you a store you can grow with.">
        <Cta to="/contact">Start a Project</Cta>
        <Cta to="/work" variant="outlineInk">View Our Work</Cta>
      </PageHero>
      <section className="container-site py-24 md:py-32">
        <SectionHead eyebrow="Capabilities" title="Everything a serious Shopify store needs." />
        <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] bg-border md:grid-cols-2 lg:grid-cols-3">
          {caps.map(([t, d], i) => (
            <Reveal key={t} delay={i * 60} className="bg-background p-8 transition-colors hover:bg-card">
              <span className="eyebrow text-muted-foreground">0{i + 1}</span>
              <h3 className="mt-10 text-2xl font-semibold">{t}</h3>
              <p className="mt-3 text-muted-foreground">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand title="Ready for a store that performs?" />
    </>
  );
}
