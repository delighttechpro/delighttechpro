import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Cta, CtaBand, PageHero, Reveal, seo } from "@/components/site/ui";
import { services } from "@/components/site/data";

export const Route = createFileRoute("/services")({
  head: () => seo("Services — Shopify, CRO & eCommerce Marketing | DelighTech Pro", "Shopify development, eCommerce development, conversion optimization, digital marketing and growth strategy from one partner."),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title="One growth system. Five connected disciplines." intro="Each service is strong on its own. Together, they compound.">
        <Cta to="/contact">Start a Project</Cta>
      </PageHero>
      <section className="container-site py-24">
        {services.map((s, i) => (
          <Reveal key={s.id}>
            <div id={s.id} className="grid gap-10 border-t border-border py-16 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="eyebrow text-muted-foreground">{s.num}</p>
                <h2 className="mt-4 text-4xl font-semibold md:text-5xl">{s.name}</h2>
                <p className="mt-5 text-lg text-muted-foreground">{s.blurb}</p>
                {i === 0 && <div className="mt-8"><Cta to="/shopify-development" variant="dark">Explore Shopify Development</Cta></div>}
                {i >= 3 && <div className="mt-8"><Cta to="/growth" variant="dark">Explore Growth Services</Cta></div>}
              </div>
              <ul className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-7">
                {s.items.map((it) => (
                  <li key={it} className="flex items-center gap-3 rounded-xl bg-card p-4 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-ring" /> {it}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </section>
      <section className="bg-secondary py-24">
        <div className="container-site grid gap-10 md:grid-cols-2">
          <Reveal>
            <h2 className="text-4xl font-semibold md:text-5xl">Custom engagements.</h2>
            <p className="mt-5 text-lg text-muted-foreground">No packaged pricing. Every project is scoped around what your business actually needs.</p>
            <div className="mt-8"><Cta to="/contact" variant="dark">Discuss Your Project</Cta></div>
          </Reveal>
          <Reveal className="flex flex-wrap content-center gap-2">
            {["Scope", "Complexity", "Business goals", "Required integrations", "Growth requirements"].map((t) => (
              <span key={t} className="rounded-full bg-card px-5 py-3 font-display text-lg">{t}</span>
            ))}
          </Reveal>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
