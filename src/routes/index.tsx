import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, ShoppingBag, MousePointerClick, ChartNoAxesCombined } from "lucide-react";
import { Cta, CtaBand, Eyebrow, Reveal, SectionHead, seo } from "@/components/site/ui";
import { journey, process, services } from "@/components/site/data";
import { cn } from "@/lib/utils";
import { PortfolioSection, SalesProofSection, TestimonialsSection } from "@/components/site/ProofSections";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () =>
    seo(
      "DelightTech Pro — Shopify Development & eCommerce Growth Agency",
      "Over 6 years of Shopify and eCommerce experience. Store development, conversion optimization and marketing focused on sales growth.",
      "/",
    ),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Trust />
      <ServicesExplorer />
      <OnePartner />
      <PortfolioSection />
      <SalesProofSection />
      <ShopifySection />
      <GrowthSection />
      <ProcessSection />
      <TestimonialsSection />
      <WhySection />
      <CtaBand />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink pb-12 pt-32 text-ink-foreground md:pb-16 md:pt-40">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-50" />
      <div className="container-site relative">
        <Reveal>
          <Eyebrow className="text-ink-muted">Shopify & eCommerce Growth Partner</Eyebrow>
          <h1 className="mt-6 max-w-6xl text-5xl font-semibold leading-[1.02] md:text-7xl lg:text-8xl">
            DelightTech Pro.<br /><span className="text-primary">Built to sell. Ready to scale.</span>
          </h1>
        </Reveal>
        <Reveal delay={150} className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
          <p className="text-lg text-ink-muted md:col-span-6 md:text-xl">
            Over 6 years of hands-on eCommerce experience. We build Shopify stores, sharpen conversion and connect your marketing — with one clear focus: more sales for your brand.
          </p>
          <div className="flex flex-wrap gap-3 md:col-span-6 md:justify-end">
            <Cta to="/contact">Let's Grow Your Store</Cta>
            <Cta to="/services" variant="outlineInk">Explore Our Services</Cta>
          </div>
        </Reveal>
        <Reveal delay={300} className="mt-12 border-y border-ink-border md:mt-16">
          <div className="grid divide-y divide-ink-border md:grid-cols-3 md:divide-x md:divide-y-0">
            {[
              { Icon: ShoppingBag, title: "Build a store that sells", detail: "Shopify design & development", num: "01" },
              { Icon: MousePointerClick, title: "Turn visitors into buyers", detail: "Conversion & customer experience", num: "02" },
              { Icon: ChartNoAxesCombined, title: "Grow beyond the launch", detail: "Marketing, retention & scaling", num: "03" },
            ].map(({ Icon, title, detail, num }) => (
              <div key={num} className="flex items-start gap-4 py-7 md:px-6 first:md:pl-0">
                <Icon className="mt-1 h-7 w-7 shrink-0 text-primary" aria-hidden="true" />
                <div><p className="font-display text-xl font-semibold">{title}</p><p className="mt-2 text-sm text-ink-muted">{detail}</p></div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Trust() {
  const words = ["Strategy", "Build", "Launch", "Optimize", "Market", "Scale"];
  return (
    <section className="border-b border-border py-10">
      <div className="container-site flex flex-col gap-6 md:flex-row md:items-center">
        <p className="shrink-0 font-display text-xl font-semibold md:w-72">Built for ambitious eCommerce brands.</p>
        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="animate-marquee flex w-max gap-12">
            {[...words, ...words, ...words, ...words].map((w, i) => (
              <span key={i} className="flex items-center gap-12 font-display text-3xl font-medium text-muted-foreground">
                {w} <span className="h-2 w-2 rounded-full bg-primary" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesExplorer() {
  const [active, setActive] = useState(0);
   const s = services[active] ?? services[0];
   if (!s) return null;
  return (
    <section className="container-site py-24 md:py-36">
      <SectionHead eyebrow="Services" title="Everything your eCommerce brand needs to grow." intro="One team across the full lifecycle — from the first line of code to the hundredth campaign." />
      <Reveal className="mt-16 grid gap-6 lg:grid-cols-12">
        <div className="flex flex-col lg:col-span-5">
          {services.map((sv, i) => (
            <button
              key={sv.id}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={cn(
                "group flex items-baseline gap-5 border-t border-border py-6 text-left transition-colors last:border-b",
                i === active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="eyebrow">{sv.num}</span>
              <span className="font-display text-2xl font-semibold md:text-3xl">{sv.name}</span>
              <ArrowRight className={cn("ml-auto h-5 w-5 self-center transition-all", i === active ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0")} />
            </button>
          ))}
        </div>
        <div key={s.id} className="animate-in fade-in slide-in-from-bottom-2 rounded-[2rem] bg-ink p-8 text-ink-foreground duration-500 md:p-12 lg:col-span-7">
          <p className="eyebrow text-primary">{s.num} / 05</p>
          <h3 className="mt-4 text-3xl font-semibold md:text-5xl">{s.name}</h3>
          <p className="mt-5 max-w-lg text-lg text-ink-muted">{s.blurb}</p>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {s.items.map((it) => (
              <li key={it} className="flex items-center gap-3 border-b border-ink-border pb-3 text-sm">
                <Check className="h-4 w-4 text-primary" /> {it}
              </li>
            ))}
          </ul>
          <Link to="/services" className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            Explore Services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

function OnePartner() {
  return (
    <section className="bg-ink py-24 text-ink-foreground md:py-36">
      <div className="container-site">
        <Reveal className="max-w-4xl">
          <Eyebrow className="text-ink-muted">Why one partner</Eyebrow>
          <h2 className="mt-5 text-4xl font-semibold md:text-7xl">One partner. The entire eCommerce growth journey.</h2>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">Over 6 years of experience, one accountable team. We connect your store, conversion strategy and marketing to drive tangible results — so every decision serves the same goal: growing your sales.</p>
        </Reveal>
        <div className="mt-20 grid gap-px overflow-hidden rounded-[2rem] bg-ink-border sm:grid-cols-2 lg:grid-cols-6">
          {journey.map((j, i) => (
            <Reveal key={j.num} delay={i * 80} className="group bg-ink p-7 transition-colors hover:bg-ink-card">
              <p className="eyebrow text-primary">{j.num}</p>
              <p className="mt-16 font-display text-2xl font-semibold">{j.name}</p>
              <p className="mt-3 text-sm text-ink-muted">{j.text}</p>
              <div className="mt-6 h-0.5 w-8 bg-primary transition-all duration-500 group-hover:w-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShopifySection() {
  const pillars = ["Brand", "User experience", "Conversion", "Performance", "Scalability", "Mobile experience"];
  return (
    <section className="container-site grid gap-16 py-24 md:py-36 lg:grid-cols-2">
      <SectionHead eyebrow="Shopify Development" title="Shopify stores built for more than just looking good." intro="Beautiful is the baseline. Every store we build is engineered around the things that move revenue." />
      <Reveal className="flex flex-col justify-end">
        <div className="grid grid-cols-2 gap-3">
          {pillars.map((p, i) => (
            <div key={p} className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
              <span className="eyebrow text-muted-foreground">0{i + 1}</span>
              <p className="mt-6 font-display text-xl font-semibold">{p}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Cta to="/shopify-development" variant="dark">Explore Shopify Development</Cta>
        </div>
      </Reveal>
    </section>
  );
}

function GrowthSection() {
  const flow = ["Traffic", "Experience", "Conversion", "Retention", "Growth"];
  return (
    <section className="bg-secondary py-24 md:py-36">
      <div className="container-site">
        <SectionHead eyebrow="Marketing & Growth" title="Traffic is only the beginning." intro="Visitors aren't enough. Your store has to turn them into customers — and customers into repeat buyers. We work the whole chain." />
        <Reveal className="mt-16 flex flex-col gap-3 md:flex-row md:items-stretch">
          {flow.map((f, i) => (
            <div key={f} className="flex flex-1 items-center gap-3 md:flex-col md:items-stretch">
              <div className={cn("flex flex-1 flex-col justify-between rounded-2xl p-6 md:min-h-48", i === flow.length - 1 ? "bg-primary text-primary-foreground" : "bg-card")}>
                <span className="eyebrow opacity-60">Step {i + 1}</span>
                <span className="mt-6 font-display text-2xl font-semibold">{f}</span>
              </div>
            </div>
          ))}
        </Reveal>
        <Reveal className="mt-12 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-2">
            {["Paid advertising", "SEO", "Email marketing", "Retargeting", "CRO", "Analytics", "Retention"].map((t) => (
              <span key={t} className="rounded-full border border-foreground/15 px-4 py-2 text-sm">{t}</span>
            ))}
          </div>
          <Cta to="/growth" variant="dark">Explore Growth Services</Cta>
        </Reveal>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="container-site py-24 md:py-36">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHead eyebrow="Process" title="A better way to build and grow eCommerce." />
        <Cta to="/process" variant="ghost">See How We Work</Cta>
      </div>
      <div className="mt-16">
        {process.map((p, i) => (
          <Reveal key={p.num} delay={i * 50}>
            <div className="group grid items-baseline gap-4 border-t border-border py-8 transition-colors hover:bg-secondary md:grid-cols-12 md:px-4">
              <span className="font-display text-5xl font-semibold text-muted-foreground/40 transition-colors group-hover:text-primary md:col-span-2 md:text-6xl">{p.num}</span>
              <span className="font-display text-3xl font-semibold md:col-span-4">{p.name}</span>
              <span className="text-muted-foreground md:col-span-6">{p.text}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function WhySection() {
  const points = [
    ["End-to-end", "Development, optimization and marketing under one roof."],
    ["Conversion-focused", "Every buying journey is designed with a clear goal: turn more visitors into customers."],
    ["6+ years of experience", "Hands-on Shopify and eCommerce expertise, with tangible results across our work."],
    ["Strategy before execution", "Every project starts with understanding the business and its customers."],
    ["Built for growth", "Infrastructure that supports where you're going, not just where you are."],
    ["Long-term partnership", "We stay after launch to keep improving and scaling."],
  ];
  return (
    <section className="container-site py-24 md:py-36">
      <SectionHead eyebrow="Why DelighTech Pro" title="Expertise, clarity and outcomes." />
      <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {points.map(([t, d], i) => (
          <Reveal key={t} delay={i * 60}>
            <div className="h-1 w-10 bg-primary" />
            <h3 className="mt-6 text-2xl font-semibold">{t}</h3>
            <p className="mt-3 text-muted-foreground">{d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
