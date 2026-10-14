import { describe, expect, it } from "vitest";
import { publishedReviews } from "@/components/site/ClientReviews";
import photo31 from "@/assets/review-client-31.png";
import photo32 from "@/assets/review-client-32.png";
import photo33 from "@/assets/review-client-33.png";
import photo34 from "@/assets/review-client-34.png";
import photo35 from "@/assets/review-client-35.png";
import photo36 from "@/assets/review-client-36.png";
import photo37 from "@/assets/review-client-37.png";
import photo38 from "@/assets/review-client-38.png";
import photo39 from "@/assets/review-client-39.png";
import photo40 from "@/assets/review-client-40.png";

const firstPage = (service: string) => publishedReviews.filter((review) => review.service === service).slice(0, 9);

describe("Supplied service review portraits", () => {
  it("finishes Conversion Optimization page one with image 31", () => {
    const reviews = firstPage("Conversion Optimization");
    expect(reviews.at(-1)).toMatchObject({ id: "additional-300-60", photo: photo31 });
    expect(reviews.filter((review) => review.photo)).toHaveLength(9);
  });

  it("attaches images 32 through 39 to the eight missing Marketing & Growth reviews in order", () => {
    const reviews = firstPage("Marketing & Growth");
    expect(reviews.slice(1).map(({ id, photo }) => ({ id, photo }))).toEqual([
      { id: "additional-300-24", photo: photo32 },
      { id: "additional-300-27", photo: photo33 },
      { id: "additional-300-29", photo: photo34 },
      { id: "additional-300-30", photo: photo35 },
      { id: "additional-300-31", photo: photo36 },
      { id: "additional-300-50", photo: photo37 },
      { id: "additional-300-51", photo: photo38 },
      { id: "additional-300-54", photo: photo39 },
    ]);
    expect(reviews.filter((review) => review.photo)).toHaveLength(9);
  });

  it("finishes Store Optimization page one with image 40", () => {
    const reviews = firstPage("Store Optimization");
    expect(reviews.at(-1)).toMatchObject({ id: "additional-300-26", photo: photo40 });
    expect(reviews.filter((review) => review.photo)).toHaveLength(9);
  });
});