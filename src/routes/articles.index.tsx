import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaBand, PageHero, Reveal, seo } from "@/components/site/ui";
import { articles } from "@/content/articles";

export const Route = createFileRoute("/articles/")({
  staticData: { sitemap: true },
  head: () => seo("Shopify Help Articles — Fix Sales, Speed, Ads & SEO | DelightTech Pro", "Practical answers to common Shopify problems: traffic with no sales, low conversion rate, slow stores, abandoned carts, ads and SEO.", "/articles"),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Articles" title="Shopify problems, solved." intro="Clear, practical answers to the questions Shopify store owners ask us most." />
      <section className="container-site grid gap-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a, i) => (
          <Reveal key={a.slug} delay={i * 50}>
            <Link to="/articles/$slug" params={{ slug: a.slug }} className="flex h-full flex-col rounded-2xl bg-card p-8 transition-colors hover:bg-secondary">
              <span className="eyebrow text-muted-foreground">{a.service.label} · {a.readMinutes} min read</span>
              <h2 className="mt-5 text-2xl font-semibold">{a.title}</h2>
              <p className="mt-4 text-muted-foreground">{a.description}</p>
            </Link>
          </Reveal>
        ))}
      </section>
      <CtaBand />
    </>
  );
}
