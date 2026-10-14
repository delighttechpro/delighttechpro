import { describe, expect, it } from "vitest";
import { publishedReviews } from "@/components/site/ClientReviews";
import photo31 from "@/assets/review-client-31.png.asset.json";
import photo32 from "@/assets/review-client-32.png.asset.json";
import photo33 from "@/assets/review-client-33.png.asset.json";
import photo34 from "@/assets/review-client-34.png.asset.json";
import photo35 from "@/assets/review-client-35.png.asset.json";
import photo36 from "@/assets/review-client-36.png.asset.json";
import photo37 from "@/assets/review-client-37.png.asset.json";
import photo38 from "@/assets/review-client-38.png.asset.json";
import photo39 from "@/assets/review-client-39.png.asset.json";
import photo40 from "@/assets/review-client-40.png.asset.json";

const firstPage = (service: string) => publishedReviews.filter((review) => review.service === service).slice(0, 9);

describe("Supplied service review portraits", () => {
  it("finishes Conversion Optimization page one with image 31", () => {
    const reviews = firstPage("Conversion Optimization");
    expect(reviews.at(-1)).toMatchObject({ id: "additional-300-60", photo: photo31.url });
    expect(reviews.filter((review) => review.photo)).toHaveLength(9);
  });

  it("attaches images 32 through 39 to the eight missing Marketing & Growth reviews in order", () => {
    const reviews = firstPage("Marketing & Growth");
    expect(reviews.slice(1).map(({ id, photo }) => ({ id, photo }))).toEqual([
      { id: "additional-300-24", photo: photo32.url },
      { id: "additional-300-27", photo: photo33.url },
      { id: "additional-300-29", photo: photo34.url },
      { id: "additional-300-30", photo: photo35.url },
      { id: "additional-300-31", photo: photo36.url },
      { id: "additional-300-50", photo: photo37.url },
      { id: "additional-300-51", photo: photo38.url },
      { id: "additional-300-54", photo: photo39.url },
    ]);
    expect(reviews.filter((review) => review.photo)).toHaveLength(9);
  });

  it("finishes Store Optimization page one with image 40", () => {
    const reviews = firstPage("Store Optimization");
    expect(reviews.at(-1)).toMatchObject({ id: "additional-300-26", photo: photo40.url });
    expect(reviews.filter((review) => review.photo)).toHaveLength(9);
  });
});