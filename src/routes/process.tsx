import { createFileRoute } from "@tanstack/react-router";
import { Cta, CtaBand, PageHero, Reveal, seo } from "@/components/site/ui";
import { process } from "@/components/site/data";

export const Route = createFileRoute("/process")({
  head: () => seo("Our Process — Discover to Scale | DelighTech Pro", "How DelighTech Pro builds and grows Shopify stores: discover, strategize, build, launch, optimize and scale."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Process" title="A better way to build and grow eCommerce." intro="Six stages, one team, no handoffs between strangers.">
        <Cta to="/contact">Start a Project</Cta>
      </PageHero>
      <section className="container-site py-24">
        <div className="relative border-l border-border pl-8 md:pl-16">
          {process.map((p, i) => (
            <Reveal key={p.num} delay={i * 40} className="relative pb-16 last:pb-0">
              <span className="absolute -left-[calc(2rem+7px)] top-3 h-3.5 w-3.5 rounded-full bg-primary ring-4 ring-background md:-left-[calc(4rem+7px)]" />
              <p className="eyebrow text-muted-foreground">Stage {p.num}</p>
              <h2 className="mt-3 text-5xl font-semibold md:text-6xl">{p.name}</h2>
              <p className="mt-4 max-w-xl text-lg text-muted-foreground">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
