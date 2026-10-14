import { createFileRoute } from "@tanstack/react-router";
import { HealthCheckSection } from "@/components/site/HealthCheck";
import { PageHero, seo } from "@/components/site/ui";

const url = "https://delighttechpro.lovable.app/free-store-audit";

export const Route = createFileRoute("/free-store-audit")({
  staticData: { sitemap: true },
  head: () => {
    const base = seo(
      "Free Shopify Store Audit & Website Analyzer | DelightTech Pro",
      "Free online Shopify store audit tool. Analyze any eCommerce store or website for SEO, speed, conversion, design and marketing issues, with clear fixes.",
      "/free-store-audit",
    );
    return {
      ...base,
      scripts: [
        ...(("scripts" in base && Array.isArray(base.scripts)) ? base.scripts : []),
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "DelightTech Pro Free Store Audit",
            url,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            description: "Free Shopify and eCommerce website audit: SEO, performance, conversion, design and marketing checks on any public store page.",
            provider: { "@id": "https://delighttechpro.lovable.app/#org" },
          }),
        },
      ],
    };
  },
  component: AuditPage,
});

function AuditPage() {
  return (
    <>
      <PageHero eyebrow="Free Shopify Store Audit" title="Free store & website audit." />
      <HealthCheckSection />
      <section className="container-site py-12 md:py-16">
        <h2 className="text-3xl font-semibold md:text-4xl">What this free Shopify audit checks</h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          Enter any Shopify, WooCommerce or other eCommerce store address. The DelightTech Pro analyzer reads the live public page and reports issues in six areas — SEO, page speed, conversion, design and UX, marketing tracking and eCommerce essentials — each with a suggested fix. No sign-up is needed.
        </p>
      </section>
    </>
  );
}
