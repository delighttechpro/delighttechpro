import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { ArrowUpRight, Check } from "lucide-react";
import { Eyebrow, Reveal, seo } from "@/components/site/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => seo("Start a Project — Contact DelighTech Pro", "Tell us about your Shopify or eCommerce project. Development, CRO, marketing or full growth — let's build something that grows."),
  component: Contact,
});

const needs = ["Shopify Development", "Store Redesign", "eCommerce Development", "CRO", "Marketing", "SEO", "Email Marketing", "Full eCommerce Growth", "Other"];

const schema = z.object({
  name: z.string().trim().min(1, "Please add your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  company: z.string().trim().max(100).optional(),
  website: z.string().trim().max(255).optional(),
  platform: z.string().max(50).optional(),
  budget: z.string().max(50).optional(),
  timeline: z.string().max(50).optional(),
  message: z.string().trim().max(2000).optional(),
});

const field = "w-full border-b border-input bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground";

function Contact() {
  const [selected, setSelected] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
  };

  return (
    <section className="bg-ink pt-36 text-ink-foreground md:pt-44">
      <div className="container-site grid gap-16 pb-24 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Eyebrow className="text-ink-muted">Contact</Eyebrow>
          <h1 className="mt-6 text-5xl font-semibold md:text-7xl">Let's build something that grows.</h1>
          <p className="mt-6 text-lg text-ink-muted">Tell us about your store, where it is today and where you want it to go. We'll come back with clear next steps.</p>
          <ul className="mt-10 space-y-3 text-sm text-ink-muted">
            {["Response within 1–2 business days", "No obligation, no hard sell", "Every engagement scoped to your goals"].map((t) => (
              <li key={t} className="flex items-center gap-3"><Check className="h-4 w-4 text-primary" />{t}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-7">
          <div className="rounded-[2rem] bg-background p-8 text-foreground md:p-12">
            {sent ? (
              <div className="py-16 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary"><Check className="h-6 w-6" /></div>
                <h2 className="mt-6 text-4xl font-semibold">Thanks — we've got it.</h2>
                <p className="mt-3 text-muted-foreground">We'll review your project and get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  <F label="Name *" error={errors["name"]}><input name="name" className={field} placeholder="Jane Doe" /></F>
                  <F label="Email *" error={errors["email"]}><input name="email" type="email" className={field} placeholder="jane@brand.com" /></F>
                  <F label="Company / Brand"><input name="company" className={field} placeholder="Brand name" /></F>
                  <F label="Website"><input name="website" className={field} placeholder="yourstore.com" /></F>
                </div>
                <div>
                  <p className="eyebrow text-muted-foreground">What do you need help with?</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {needs.map((n) => {
                      const on = selected.includes(n);
                      return (
                        <button type="button" key={n} aria-pressed={on} onClick={() => setSelected(on ? selected.filter((x) => x !== n) : [...selected, n])}
                          className={cn("rounded-full border px-4 py-2 text-sm transition-all", on ? "border-primary bg-primary text-primary-foreground" : "border-input hover:border-foreground")}>
                          {n}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="grid gap-8 sm:grid-cols-3">
                  <F label="Current platform"><Sel name="platform" opts={["Shopify", "WooCommerce", "Magento", "Other", "No store yet"]} /></F>
                  <F label="Approx. budget"><Sel name="budget" opts={["Under $5k", "$5k–$15k", "$15k–$50k", "$50k+", "Not sure yet"]} /></F>
                  <F label="Timeline"><Sel name="timeline" opts={["ASAP", "1–3 months", "3–6 months", "Flexible"]} /></F>
                </div>
                <F label="Message"><textarea name="message" rows={4} className={cn(field, "resize-none")} placeholder="Tell us about your project and goals" /></F>
                <button type="submit" className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 font-medium text-ink-foreground transition-all hover:bg-foreground sm:w-auto">
                  Start a Project <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function F({ label, error, children }: { label: string; error?: string | undefined; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-sm text-destructive">{error}</span>}
    </label>
  );
}

function Sel({ name, opts }: { name: string; opts: string[] }) {
  return (
    <select name={name} defaultValue="" className={cn(field, "cursor-pointer")}>
      <option value="" disabled>Select</option>
      {opts.map((o) => <option key={o}>{o}</option>)}
    </select>
  );
}
