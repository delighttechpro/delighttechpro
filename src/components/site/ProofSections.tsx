import { ArrowUpRight } from "lucide-react";
import { portfolio } from "./portfolio";
import { salesVideos } from "./sales-media";
import { Cta, Eyebrow, Reveal } from "./ui";
export { ClientReviews as TestimonialsSection } from "./ClientReviews";

export function PortfolioSection() {
  return (
    <section className="bg-ink py-12 text-ink-foreground md:py-16" aria-labelledby="portfolio-heading">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <Eyebrow>Our Portfolio</Eyebrow>
            <h2 id="portfolio-heading" className="mt-5 text-4xl font-semibold md:text-6xl">Recent Work</h2>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">Distinct brands. Thoughtful storefronts. Explore our client stores.</p>
          </Reveal>
          <Cta to="/contact" variant="outlineInk">Start Your Project</Cta>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
    <section className="bg-background py-12 md:py-16" aria-labelledby="sales-heading">
      <div className="container-site">
        <Reveal>
          <Eyebrow>Sales Proof</Eyebrow>
          <h2 id="sales-heading" className="mt-5 text-4xl font-semibold md:text-6xl">Behind the storefront.</h2>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">Real store recordings. Tangible sales activity. See the results behind the work.</p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        <p className="mt-6 max-w-3xl border-l-2 border-primary pl-4 text-sm leading-relaxed text-foreground">Our sales commitment: when we complete the agreed store improvements and marketing work together, we commit to generating sales for your brand. Your sales volume depends on your store, offer and campaigns.</p>
      </div>
    </section>
  );
}
