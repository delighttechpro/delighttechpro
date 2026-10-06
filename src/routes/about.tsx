import { createFileRoute } from "@tanstack/react-router";
import { Cta, CtaBand, PageHero, Reveal, SectionHead, seo } from "@/components/site/ui";

export const Route = createFileRoute("/about")({
  head: () => seo("About DelighTech Pro — Shopify & eCommerce Growth Partner", "DelighTech Pro exists to help businesses turn eCommerce into a stronger growth engine."),
  component: Page,
});

const blocks = [
  ["Mission", "Help businesses turn eCommerce into a stronger, more reliable growth engine."],
  ["Philosophy", "A store is a business system, not a brochure. Design, technology and marketing should be built together."],
  ["Approach", "Strategy first, then execution — measured against outcomes, not deliverables."],
  ["Capabilities", "Shopify development, eCommerce engineering, CRO, digital marketing and growth strategy."],
];

function Page() {
  return (
    <>
      <PageHero eyebrow="About" title="We exist to make eCommerce work harder." intro="Too many brands juggle a developer, a designer and an agency — and none of them own the result. We built DelighTech Pro to be the partner that does." >
        <Cta to="/contact">Book a Consultation</Cta>
      </PageHero>
      <section className="container-site grid gap-6 py-24 md:grid-cols-2">
        {blocks.map(([t, d], i) => (
          <Reveal key={t} delay={i * 60} className="rounded-[2rem] bg-card p-10">
            <p className="eyebrow text-muted-foreground">{t}</p>
            <p className="mt-8 font-display text-2xl font-medium leading-snug md:text-3xl">{d}</p>
          </Reveal>
        ))}
      </section>
      <section className="container-site pb-24">
        <SectionHead eyebrow="The team" title="Founder & team story" intro="This space is reserved for the real DelighTech Pro story — founders, team and background — to be added soon." />
        <Reveal className="mt-10 grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="aspect-[3/4] rounded-2xl border border-dashed border-foreground/20 bg-secondary" />
          ))}
        </Reveal>
      </section>
      <CtaBand />
    </>
  );
}
