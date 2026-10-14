import { useState, type FormEvent } from "react";
import { Star, Mail, MapPin, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow, Reveal } from "./ui";
import { socialLinks } from "./social";
import existingReviews from "./published-reviews.json";
import additionalReviews from "./additional-reviews.json";
import reviewerCountries from "./reviewer-countries.json";
import reviewDetails from "./review-details.json";
import photo4 from "@/assets/review-client-4.png";
import photo5 from "@/assets/review-client-5.png";
import photo6 from "@/assets/review-client-6.png";
import photo7 from "@/assets/review-client-7.png";
import photo8 from "@/assets/review-client-8.png";
import photo9 from "@/assets/review-client-9.png";
import photo10 from "@/assets/review-client-10.png";
import photo11 from "@/assets/review-client-11.png";
import photo12 from "@/assets/review-client-12.png";
import photo13 from "@/assets/review-client-13.png";
import photo14 from "@/assets/review-client-14.png";
import photo15 from "@/assets/review-client-15.png";
import photo16 from "@/assets/review-client-16.png";
import photo17 from "@/assets/review-client-17.png";
import photo18 from "@/assets/review-client-18.png";
import photo19 from "@/assets/review-client-19.png";
import photo20 from "@/assets/review-client-20.png";
import photo21 from "@/assets/review-client-21.png";
import photo22 from "@/assets/review-client-22.png";
import photo23 from "@/assets/review-client-23.png";
import photo24 from "@/assets/review-client-24.png";
import photo25 from "@/assets/review-client-25.png";
import photo26 from "@/assets/review-client-26.png";
import photo27 from "@/assets/review-client-27.png";
import photo28 from "@/assets/review-client-28.png";
import photo29 from "@/assets/review-client-29.png";
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

const reviewPhotos = [photo4, photo5, photo6, photo7, photo8, photo9, photo10, photo11, photo12, photo13, photo14, photo15, photo16, photo17, photo18, photo19, photo20, photo21];
const photoSlots: Record<number, string> = {
  18: photo23, 19: photo25, 20: photo24, 21: photo22, 42: photo26, 46: photo27, 51: photo28, 54: photo29,
  59: photo31.url,
  23: photo32.url, 26: photo33.url, 28: photo34.url, 29: photo35.url,
  30: photo36.url, 49: photo37.url, 50: photo38.url, 53: photo39.url,
  25: photo40.url,
};
const countriesByReviewId: Record<string, string> = reviewerCountries;
const detailsByReviewId: Record<string, { date: string; price: string; delivery: string; helpful: number }> = reviewDetails;
export const publishedReviews = [...additionalReviews, ...existingReviews].map((review, index) => ({
  ...review,
  photo: reviewPhotos[index] ?? photoSlots[index],
  country: countriesByReviewId[review.id],
  details: detailsByReviewId[review.id],
}));

const reviewServices = ["Shopify Development", "Conversion Optimization", "Marketing & Growth", "Store Optimization"];
const inputClass = "mt-2 w-full rounded-md border border-input bg-background px-3 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

export function ClientReviews() {
  const [active, setActive] = useState("All");
  const [rating, setRating] = useState(0);
  const [visibleCount, setVisibleCount] = useState(15);
  const filteredReviews = active === "All" ? publishedReviews : publishedReviews.filter((review) => review.service === active);
  const batchSize = 15;
  const visibleReviews = filteredReviews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredReviews.length;
  const counts = (service: string) => service === "All" ? publishedReviews.length : publishedReviews.filter((review) => review.service === service).length;
  const email = socialLinks.find((link) => link.label === "Email");

  function sendReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!rating || !email) return;
    const form = new FormData(event.currentTarget);
    const body = [
      `Name: ${form.get("name")}`, `Company: ${form.get("company") || "Not provided"}`,
      `Service: ${form.get("service")}`, `Rating: ${rating}/5`,
      `Review: ${form.get("review")}`, `Project price: ${form.get("price") || "Not provided"}`,
      `Delivery time: ${form.get("delivery") || "Not provided"}`,
      "I approve publication of this review and my name/company on the DelightTech Pro website.",
    ].join("\n\n");
    window.location.href = `${email.href}?subject=${encodeURIComponent("Client review for DelightTech Pro")}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section className="border-y border-border bg-ink py-12 md:py-16" aria-labelledby="reviews-heading">
      <div className="container-site">
        <Reveal><Eyebrow>Client Feedback</Eyebrow><h2 id="reviews-heading" className="mt-5 text-4xl font-semibold md:text-6xl">What Our Clients Say</h2></Reveal>
        <Reveal className="mt-12">
          <form onSubmit={sendReview} className="rounded-lg border border-border bg-card p-6 md:p-8">
            <h3 className="text-xl font-semibold">Leave a Review</h3>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-medium">Name *<input required name="name" autoComplete="name" placeholder="Your name" maxLength={100} className={inputClass} /></label>
              <label className="text-sm font-medium">Company<input name="company" autoComplete="organization" placeholder="Your company" maxLength={100} className={inputClass} /></label>
              <label className="text-sm font-medium sm:col-span-2">Service *<select required name="service" defaultValue="" className={inputClass}><option value="" disabled>Select a service</option>{reviewServices.map((service) => <option key={service}>{service}</option>)}</select></label>
              <fieldset className="sm:col-span-2"><legend className="text-sm font-medium">Rating *</legend><div className="mt-2 flex gap-1" role="radiogroup" aria-label="Review rating">{[1, 2, 3, 4, 5].map((value) => <Button key={value} type="button" variant="ghost" size="icon" role="radio" aria-checked={rating === value} aria-label={`${value} ${value === 1 ? "star" : "stars"}`} title={`${value} ${value === 1 ? "star" : "stars"}`} onClick={() => setRating(value)} className="text-rating hover:text-rating"><Star className={value <= rating ? "fill-current" : ""} /></Button>)}</div></fieldset>
              <label className="text-sm font-medium sm:col-span-2">Your Review *<textarea required name="review" placeholder="Share your experience" rows={4} maxLength={3000} className={inputClass} /></label>
              <label className="text-sm font-medium">Project Price (optional)<input name="price" placeholder="Project price" maxLength={60} className={inputClass} /></label>
              <label className="text-sm font-medium">Delivery Time (optional)<input name="delivery" placeholder="Project timeframe" maxLength={60} className={inputClass} /></label>
              <label className="flex items-start gap-3 text-sm text-muted-foreground sm:col-span-2"><input required type="checkbox" className="mt-1 accent-primary" />I approve publication of my review, name and company.</label>
              <Button type="submit" disabled={!rating} className="h-12 sm:col-span-2"><Mail />Send Review by Email</Button>
            </div>
          </form>
        </Reveal>
        <div className="mt-10 flex flex-wrap items-start justify-between gap-6">
          <h3 className="text-2xl font-semibold">Client Reviews <span className="text-muted-foreground">({publishedReviews.length})</span></h3>
          <div className="flex max-w-full flex-wrap gap-2" role="group" aria-label="Filter client reviews">{["All", ...reviewServices].map((service) => <Button key={service} type="button" variant={active === service ? "default" : "ghost"} aria-pressed={active === service} onClick={() => { setActive(service); setPage(1); }} className="h-auto whitespace-normal rounded-full px-4 py-2 text-xs">{service} ({counts(service)})</Button>)}</div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-label="Published client reviews">
          {visibleReviews.map((review) => (
            <article key={review.id} className="flex flex-col rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                {review.photo ? <img src={review.photo} alt={`${review.name} portrait`} width={44} height={44} loading="lazy" className="h-11 w-11 shrink-0 rounded-full object-cover" /> : <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary font-semibold text-secondary-foreground">{review.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("")}</span>}
                <div className="min-w-0"><h4 className="text-base font-semibold leading-snug">{review.name}</h4><p className="mt-1 text-xs text-muted-foreground">{review.service}</p>{review.country && <p className="mt-1 flex items-start gap-1 text-xs text-muted-foreground"><MapPin aria-hidden="true" className="h-3 w-3 shrink-0" /><span>{review.country}</span></p>}</div>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex gap-1 text-rating" role="img" aria-label={`${review.rating} out of 5 stars`}>
                  {[1, 2, 3, 4, 5].map((star) => <Star key={star} aria-hidden="true" className={`h-4 w-4 ${star <= review.rating ? "fill-current" : ""}`} />)}
                </div>
                {review.details && <span className="text-xs text-muted-foreground">{review.details.date}</span>}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground">{review.text}</p>
              {review.details && (
                <div className="mt-auto pt-5">
                  <dl className="grid grid-cols-2 gap-3 border-t border-border pt-4 text-xs">
                    <div><dt className="text-muted-foreground">Price</dt><dd className="mt-1 font-medium">{review.details.price}</dd></div>
                    <div><dt className="text-muted-foreground">Duration</dt><dd className="mt-1 font-medium">{review.details.delivery}</dd></div>
                  </dl>
                  <p className="mt-3 flex items-center gap-1 text-xs text-muted-foreground"><ThumbsUp aria-hidden="true" className="h-3 w-3" />Helpful ({review.details.helpful})</p>
                </div>
              )}
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground" aria-live="polite">Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filteredReviews.length)} of {filteredReviews.length} reviews</p>
          <nav className="flex items-center gap-3" aria-label="Review pages">
            <Button type="button" variant="outline" size="icon" aria-label="Previous review page" title="Previous review page" disabled={page === 1} onClick={() => setPage((current) => current - 1)}><ChevronLeft /></Button>
            <span className="min-w-20 text-center text-sm">{page} / {totalPages}</span>
            <Button type="button" variant="outline" size="icon" aria-label="Next review page" title="Next review page" disabled={page === totalPages} onClick={() => setPage((current) => current + 1)}><ChevronRight /></Button>
          </nav>
        </div>
      </div>
    </section>
  );
}