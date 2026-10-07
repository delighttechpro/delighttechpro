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
        <SectionHead eyebrow="Our focus" title="Built around the eCommerce journey." intro="DelightTech Pro is an end-to-end Shopify and eCommerce growth partner. Our work connects strategy, store development, launch, optimization, marketing and scaling rather than treating each as a separate project." />
        <Reveal className="mt-10 space-y-6 text-lg text-muted-foreground">
          <p>For new founders, that means shaping the store around the offer, the customer and the buying journey before launch. For existing Shopify businesses, it means looking at design, usability, traffic and conversion together to identify what needs attention.</p>
          <p>For growing brands, the focus shifts to a store and marketing system that can support the next stage: clear product storytelling, a smoother mobile experience, connected acquisition and retention, and decisions informed by performance.</p>
          <div className="flex flex-wrap gap-3">
            <Cta to="/process" variant="ghost">See Our Process</Cta>
            <Cta to="/work" variant="ghost">Explore Our Portfolio</Cta>
          </div>
        </Reveal>
      </section>
      <CtaBand />
    </>
  );
}
