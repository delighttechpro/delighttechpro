import { createFileRoute } from "@tanstack/react-router";
import { PageHero, seo } from "@/components/site/ui";

export const Route = createFileRoute("/privacy")({
  head: () => seo("Privacy Policy | DelighTech Pro", "How DelighTech Pro handles your information."),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <section className="container-site max-w-3xl py-20 text-lg text-muted-foreground">
        <p>Our full privacy policy is being finalized and will be published here. For any questions about your data, please reach out through our contact page.</p>
      </section>
    </>
  ),
});
