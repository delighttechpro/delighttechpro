import { createFileRoute } from "@tanstack/react-router";
import { ClientReviews } from "@/components/site/ClientReviews";
import { PageHero, seo } from "@/components/site/ui";

export const Route = createFileRoute("/reviews")({
  staticData: { sitemap: true },
  head: () => seo(
    "Client Reviews | DelightTech Pro",
    "Read client feedback on DelightTech Pro's Shopify development, conversion optimization, marketing and store optimization services.",
    "/reviews",
  ),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <>
      <PageHero eyebrow="Client Feedback" title="Client reviews." />
      <ClientReviews />
    </>
  );
}