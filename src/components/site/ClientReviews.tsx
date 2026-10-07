import { useState, type FormEvent } from "react";
import { Star, Mail, MessageSquareQuote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow, Reveal } from "./ui";
import { socialLinks } from "./social";

const reviewServices = ["Shopify Development", "Conversion Optimization", "Marketing & Growth", "Store Optimization"];
const inputClass = "mt-2 w-full rounded-md border border-input bg-background px-3 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

export function ClientReviews() {
  const [active, setActive] = useState("All");
  const [rating, setRating] = useState(0);
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
          <h3 className="text-2xl font-semibold">Client Reviews <span className="text-muted-foreground">(0)</span></h3>
          <div className="flex max-w-full flex-wrap gap-2" role="group" aria-label="Filter client reviews">{["All", ...reviewServices].map((service) => <Button key={service} type="button" variant={active === service ? "default" : "ghost"} aria-pressed={active === service} onClick={() => setActive(service)} className="h-auto whitespace-normal rounded-full px-4 py-2 text-xs">{service} (0)</Button>)}</div>
        </div>
        <div className="mt-8 border-t border-border py-12 text-center" aria-live="polite">
          <MessageSquareQuote className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
          <p className="mt-4 font-medium">{active === "All" ? "Client reviews are awaiting publication." : `No published reviews for ${active.toLowerCase()} yet.`}</p>
          <p className="mt-2 text-sm text-muted-foreground">Only genuine, client-approved feedback appears here.</p>
        </div>
      </div>
    </section>
  );
}