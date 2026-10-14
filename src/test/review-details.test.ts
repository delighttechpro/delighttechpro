import { describe, expect, it } from "vitest";
import { publishedReviews } from "@/components/site/ClientReviews";

describe("Owner-supplied review details", () => {
  it("attaches details to all 658 reviews", () => {
    expect(publishedReviews.filter((r) => r.details)).toHaveLength(658);
  });
  it("keeps supplied values", () => {
    expect(publishedReviews.find((r) => r.id === "1")?.details).toEqual({ date: "4 days ago", price: "$100-$150", delivery: "1 week", helpful: 87 });
  });
});
