import { Link } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

type CtaProps = { to: string; children: ReactNode; variant?: "primary" | "ghost" | "dark" | "outlineInk"; className?: string };

const variants = {
  primary: "bg-primary text-primary-foreground hover:glow-primary",
  dark: "bg-primary text-primary-foreground hover:bg-primary/90",
  ghost: "border border-foreground/20 text-foreground hover:border-foreground",
  outlineInk: "border border-ink-border text-ink-foreground hover:border-ink-foreground",
};

export function Cta({ to, children, variant = "primary", className }: CtaProps) {
  return (
    <Link
      to={to}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        variants[variant],
        className,
      )}
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-2 text-muted-foreground", className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </p>
  );
}

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-40 text-ink-foreground md:pb-28 md:pt-48">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />
      <div className="container-site relative">
        <Reveal>
          <Eyebrow className="text-ink-muted">{eyebrow}</Eyebrow>
          <h1 className="mt-6 max-w-5xl text-5xl font-semibold md:text-7xl lg:text-8xl">{title}</h1>
          {intro && <p className="mt-8 max-w-2xl text-lg text-ink-muted md:text-xl">{intro}</p>}
          {children && <div className="mt-10 flex flex-wrap gap-3">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}

export function CtaBand({ title = "Let's build something that grows.", text = "Tell us where your store is today and where you want it to go. We'll map the fastest path there." }: { title?: string; text?: string }) {
  return (
    <section className="container-site py-24 md:py-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-primary p-10 text-primary-foreground md:p-16">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-semibold md:text-6xl">{title}</h2>
            <p className="mt-6 max-w-xl text-lg opacity-80">{text}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Cta to="/contact" variant="dark">Start a Project</Cta>
              <Cta to="/contact" variant="ghost">Get an eCommerce Audit</Cta>
            </div>
          </div>
          <div className="pointer-events-none absolute -bottom-16 -right-8 font-display text-[14rem] font-bold leading-none opacity-10 md:text-[20rem]">→</div>
        </div>
      </Reveal>
    </section>
  );
}

export function SectionHead({ eyebrow, title, intro, className }: { eyebrow: string; title: ReactNode; intro?: string; className?: string }) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 text-4xl font-semibold md:text-6xl">{title}</h2>
      {intro && <p className="mt-6 text-lg text-muted-foreground">{intro}</p>}
    </Reveal>
  );
}

export function seo(title: string, description: string, path: string) {
  const url = new URL(path, "https://delighttechpro.lovable.app").href;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
