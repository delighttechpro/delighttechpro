import { describe, expect, it } from "vitest";
import { publishedReviews } from "@/components/site/ClientReviews";
import reviewerCountries from "@/components/site/reviewer-countries.json";

describe("Owner-supplied reviewer countries", () => {
  it("attaches all 658 assignments before filtering and pagination", () => {
    expect(publishedReviews).toHaveLength(658);
    expect(Object.keys(reviewerCountries)).toHaveLength(658);
    expect(publishedReviews.filter((review) => review.country?.trim())).toHaveLength(658);
  });

  it("preserves supplied countries for both datasets", () => {
    expect(publishedReviews.find((review) => review.id === "1")).toMatchObject({ name: "Jessica Scott", country: "United Arab Emirates" });
    expect(publishedReviews.find((review) => review.id === "2")).toMatchObject({ name: "Mia Hunt", country: "India" });
    expect(publishedReviews.find((review) => review.id === "additional-300-1")).toMatchObject({ name: "Michael Fisher", country: "United States" });
    expect(publishedReviews.find((review) => review.id === "additional-300-60")).toMatchObject({ name: "Poppy Palmer", country: "Lithuania" });
    expect(publishedReviews.find((review) => review.id === "additional-300-300")).toMatchObject({ name: "Victoria Roberts", country: "Croatia" });
  });

  it("retains all supplied countries on later service pages", () => {
    for (const service of ["Shopify Development", "Conversion Optimization", "Marketing & Growth", "Store Optimization"]) {
      const reviews = publishedReviews.filter((review) => review.service === service);
      for (let start = 0; start < reviews.length; start += 9) {
        expect(reviews.slice(start, start + 9).every((review) => Boolean(review.country))).toBe(true);
      }
    }
  });
});