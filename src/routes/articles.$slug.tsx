import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Cta, CtaBand, PageHero, seo } from "@/components/site/ui";
import { articles, getArticle } from "@/content/articles";

const SITE = "https://delighttechpro.lovable.app";

export const Route = createFileRoute("/articles/$slug")({
  staticData: { sitemap: true },
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const a = loaderData;
    const base = seo(`${a.title} | DelightTech Pro`, a.description, `/articles/${a.slug}`);
    return {
      ...base,
      meta: base.meta.map((m) => ("property" in m && m.property === "og:type" ? { property: "og:type", content: "article" } : m)),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title,
            description: a.description,
            datePublished: a.date,
            dateModified: a.date,
            mainEntityOfPage: `${SITE}/articles/${a.slug}`,
            author: { "@type": "Organization", name: "DelightTech Pro", url: SITE },
            publisher: { "@type": "Organization", name: "DelightTech Pro", url: SITE },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE },
              { "@type": "ListItem", position: 2, name: "Articles", item: `${SITE}/articles` },
              { "@type": "ListItem", position: 3, name: a.title, item: `${SITE}/articles/${a.slug}` },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <PageHero eyebrow="Articles" title="Article not found.">
      <Cta to="/articles">Browse all articles</Cta>
    </PageHero>
  ),
  component: Page,
});

function Page() {
  const a = Route.useLoaderData();
  const related = articles.filter((x) => x.slug !== a.slug).slice(0, 3);
  return (
    <>
      <PageHero eyebrow={`${a.service.label} · ${a.readMinutes} min read`} title={a.title} intro={a.intro} />
      <article className="container-site max-w-3xl py-12">
        {a.sections.map((s) => (
          <section key={s.heading} className="mt-10 first:mt-0">
            <h2 className="text-3xl font-semibold">{s.heading}</h2>
            {s.paragraphs.map((p) => (
              <p key={p} className="mt-4 text-lg leading-relaxed text-muted-foreground">{p}</p>
            ))}
            {s.list && (
              <ul className="mt-4 list-disc space-y-2 pl-6 text-lg text-muted-foreground">
                {s.list.map((li) => <li key={li}>{li}</li>)}
              </ul>
            )}
          </section>
        ))}
        <section className="mt-12">
          <h2 className="text-3xl font-semibold">Frequently asked questions</h2>
          {a.faqs.map((f) => (
            <div key={f.q} className="mt-6">
              <h3 className="text-xl font-semibold">{f.q}</h3>
              <p className="mt-2 text-lg text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </section>
        <div className="mt-12 rounded-2xl bg-card p-8">
          <h2 className="text-2xl font-semibold">Want this fixed for your store?</h2>
          <p className="mt-3 text-muted-foreground">DelightTech Pro has 6+ years of hands-on Shopify experience. We'll find what's holding your store back and fix it.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Cta to="/contact">Get a Free Store Audit</Cta>
            <Cta to={a.service.to} variant="ghost">Explore {a.service.label}</Cta>
          </div>
        </div>
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Related articles</h2>
          <ul className="mt-4 space-y-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link to="/articles/$slug" params={{ slug: r.slug }} className="text-lg font-medium underline-offset-4 hover:underline">{r.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
      <CtaBand />
    </>
  );
}
