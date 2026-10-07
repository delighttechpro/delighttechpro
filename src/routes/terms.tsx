import { createFileRoute } from "@tanstack/react-router";
import { PageHero, seo } from "@/components/site/ui";

export const Route = createFileRoute("/terms")({
  staticData: { sitemap: true },
  head: () => seo("Terms | DelighTech Pro", "Terms of use for the DelighTech Pro website.", "/terms"),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title="Terms" />
      <section className="container-site max-w-3xl py-20 text-lg text-muted-foreground">
        <p>Our terms of use are being finalized and will be published here.</p>
      </section>
    </>
  ),
});
