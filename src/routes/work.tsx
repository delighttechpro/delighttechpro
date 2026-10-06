import { createFileRoute } from "@tanstack/react-router";
import { Cta, CtaBand, PageHero, Reveal, seo } from "@/components/site/ui";

export const Route = createFileRoute("/work")({
  head: () => seo("Work & Case Studies | DelighTech Pro", "Shopify and eCommerce projects by DelighTech Pro — challenges, solutions and verified results."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Work" title="Built to perform." intro="Our case studies are being prepared. We only publish projects with real, verified outcomes.">
        <Cta to="/contact">Start a Project</Cta>
      </PageHero>
      <section className="container-site grid gap-6 py-24 md:grid-cols-2">
        {[1, 2, 3, 4].map((n) => (
          <Reveal key={n} delay={(n % 2) * 100}>
            <article className="flex aspect-[5/4] flex-col justify-between rounded-[2rem] border border-dashed border-foreground/20 bg-card p-8">
              <div className="flex justify-between">
                <span className="eyebrow text-muted-foreground">Case study 0{n}</span>
                <span className="eyebrow rounded-full bg-secondary px-3 py-1">Coming soon</span>
              </div>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                {["Brand", "Industry", "Services", "Challenge", "Solution", "Results"].map((f) => (
                  <div key={f}>
                    <dt className="eyebrow text-muted-foreground">{f}</dt>
                    <dd className="mt-1 h-3 w-3/4 rounded bg-secondary" />
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>
        ))}
      </section>
      <CtaBand title="Want to be our next case study?" />
    </>
  );
}
