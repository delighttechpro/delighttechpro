import { ArrowUpRight, MessageSquareQuote } from "lucide-react";
import { portfolio } from "./portfolio";
import { salesVideos } from "./sales-media";
import { Cta, Eyebrow, Reveal, SectionHead } from "./ui";

export function PortfolioSection() {
  return (
    <section className="bg-ink py-24 text-ink-foreground md:py-32" aria-labelledby="portfolio-heading">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <Eyebrow>Our Portfolio</Eyebrow>
            <h2 id="portfolio-heading" className="mt-5 text-4xl font-semibold md:text-6xl">Recent Work</h2>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">Distinct brands. Thoughtful storefronts. Explore our client stores.</p>
          </Reveal>
          <Cta to="/contact" variant="outlineInk">Start Your Project</Cta>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((store, i) => (
            <Reveal key={store.url} delay={(i % 3) * 60}>
              <a href={store.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${store.name} store (opens in a new tab)`} className="group block h-full overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                <div className="aspect-[4/3] overflow-hidden border-b border-border bg-muted">
                  <img src={store.image} alt={`${store.name} storefront`} loading="lazy" width={960} height={713} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
                </div>
                <div className="flex min-h-24 items-center justify-between gap-4 p-5">
                  <div><p className="text-xs text-muted-foreground">{store.category}</p><h3 className="mt-2 text-xl font-semibold leading-snug">{store.name}</h3></div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SalesProofSection() {
  return (
    <section className="bg-background py-24 md:py-32" aria-labelledby="sales-heading">
      <div className="container-site">
        <Reveal>
          <Eyebrow>Sales Proof</Eyebrow>
          <h2 id="sales-heading" className="mt-5 text-4xl font-semibold md:text-6xl">Behind the storefront.</h2>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">Real store recordings. Tangible sales activity. See the results behind the work.</p>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {salesVideos.map((item) => (
            <Reveal key={item.src}>
              <figure className="overflow-hidden rounded-lg border border-border bg-card">
                <video controls playsInline preload="none" poster={item.poster} aria-label={item.title} className="aspect-video w-full bg-muted object-contain">
                  {item.webm && <source src={item.webm} type="video/webm" />}
                  <source src={item.src} type="video/mp4" />
                  <a href={item.src}>Open video</a>
                </video>
                <figcaption className="border-t border-border p-5 text-sm font-medium">{item.title}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">Screenshots and recordings supplied by DelightTech Pro. Results vary by store and period; past performance is not a guarantee.</p>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="border-y border-border bg-ink py-24 md:py-32">
      <div className="container-site">
        <SectionHead eyebrow="Client Feedback" title="What Our Clients Say" intro="Strong partnerships are built on clear communication, thoughtful execution and a shared commitment to growth." />
        <p className="mt-6 text-sm text-muted-foreground">Review placeholders — not client endorsements. Genuine, approved feedback will replace these entries.</p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 12 }, (_, i) => (
            <Reveal key={i} className="rounded-lg border border-border bg-card p-8">
              <p className="eyebrow text-muted-foreground">Review placeholder / {i + 1}</p>
              <MessageSquareQuote className="mt-6 h-8 w-8 text-primary" aria-hidden="true" />
              <p className="my-6 text-lg">[Client Testimonial]</p>
              <p className="font-semibold">[Client Name]</p>
              <p className="mt-1 text-sm text-muted-foreground">[Company Name]</p>
              <p className="mt-4 border-t border-border pt-4 text-sm text-muted-foreground">[Service Provided]</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}