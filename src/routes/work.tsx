import { createFileRoute } from "@tanstack/react-router";
import { Cta, CtaBand, PageHero, seo } from "@/components/site/ui";
import { PortfolioSection, SalesProofSection, TestimonialsSection } from "@/components/site/ProofSections";

export const Route = createFileRoute("/work")({
  staticData: { sitemap: true },
  head: () => seo("Our Portfolio & Recent Work | DelightTech Pro", "Explore 15 client stores in the DelightTech Pro portfolio, alongside Shopify sales recordings and over 6 years of eCommerce experience.", "/work"),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Our Portfolio" title="Recent work. Lasting partnerships." intro="Explore the brands in our portfolio — from jewelry and fashion to beauty, lifestyle and beyond.">
        <Cta to="/contact">Start a Project</Cta>
      </PageHero>
      <PortfolioSection />
      <SalesProofSection />
      <TestimonialsSection />
      <CtaBand title="Want to be our next case study?" />
    </>
  );
}
