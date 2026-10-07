import { createFileRoute } from "@tanstack/react-router";
import { Cta, CtaBand, PageHero, Reveal, seo } from "@/components/site/ui";

export const Route = createFileRoute("/insights")({
  staticData: { sitemap: true },
  head: () => seo("Insights — Shopify & eCommerce Growth | DelighTech Pro", "Practical thinking on Shopify development, conversion optimization and eCommerce growth.", "/insights"),
  component: Page,
});

const guides = [
  { title: "Shopify development", text: "Start with the customer journey, not the theme. Make collections easy to browse, give product pages clear imagery and buying information, and check the cart on mobile before launch. Keep app additions tied to a specific need so the store stays maintainable.", to: "/shopify-development", link: "Explore Store Development" },
  { title: "Conversion optimization", text: "Trace the path from landing page to product, cart and checkout. Look for unanswered questions about size, delivery, returns or product suitability. Address one clearly defined problem at a time and compare results against a baseline before deciding what to keep.", to: "/growth", link: "Explore Conversion Support" },
  { title: "Paid acquisition", text: "Align the advert with the page it sends shoppers to: the product, offer and message should match. Check mobile usability and conversion tracking before increasing spend. Evaluate purchases and acquisition costs, not just clicks, while allowing for attribution differences.", to: "/growth", link: "Explore Marketing Services" },
  { title: "Retention & email", text: "Plan the experience after the first purchase. Useful order information, product-care guidance and relevant follow-up can support repeat buying. Separate transactional messages from marketing, respect consent and provide a clear unsubscribe option for promotional emails.", to: "/growth", link: "Explore Retention Support" },
  { title: "Analytics", text: "Choose measures that answer a business question: conversion rate for the buying journey, average order value for basket value, and repeat purchases for retention. Use comparable periods and account for promotions, traffic mix and seasonality before attributing a change to a redesign.", to: "/process", link: "See Our Measurement Approach" },
  { title: "Scaling", text: "More traffic can amplify existing problems. Before expanding campaigns, review stock availability, checkout reliability, mobile navigation and fulfillment expectations. Prioritize the bottleneck that limits the current buying journey rather than changing every part of the store at once.", to: "/services", link: "Explore Growth Capabilities" },
];

function Page() {
  return (
    <>
      <PageHero eyebrow="Insights" title="Practical Shopify & eCommerce guidance." intro="Six starting points for planning a store, improving the buying journey and connecting marketing to business performance." />
      <section className="container-site grid gap-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide, i) => (
          <Reveal key={guide.title} delay={i * 50} className="flex flex-col rounded-2xl bg-card p-8">
            <span className="eyebrow text-muted-foreground">Practical guide / 0{i + 1}</span>
            <h2 className="mt-6 text-3xl font-semibold">{guide.title}</h2>
            <p className="mb-8 mt-5 leading-relaxed text-muted-foreground">{guide.text}</p>
            <Cta to={guide.to} variant="ghost" className="mt-auto self-start">{guide.link}</Cta>
          </Reveal>
        ))}
      </section>
      <CtaBand />
    </>
  );
}
