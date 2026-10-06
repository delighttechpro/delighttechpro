import { Link } from "@tanstack/react-router";
import { Logo } from "./SiteHeader";

const nav = [
  { to: "/services", label: "Services" },
  { to: "/shopify-development", label: "Shopify Development" },
  { to: "/growth", label: "eCommerce Growth" },
  { to: "/work", label: "Work" },
  { to: "/process", label: "Process" },
  { to: "/about", label: "About" },
  { to: "/insights", label: "Insights" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-site grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-6 max-w-sm text-ink-muted">Shopify & eCommerce development, optimization and growth.</p>
        </div>
        <div className="md:col-span-4">
          <p className="eyebrow text-ink-muted">Navigate</p>
          <ul className="mt-5 grid grid-cols-2 gap-3 text-sm">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-ink-foreground/80 hover:text-primary">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow text-ink-muted">Social</p>
          <ul className="mt-5 space-y-3 text-sm text-ink-foreground/50">
            <li>LinkedIn — coming soon</li>
            <li>Instagram — coming soon</li>
            <li>X — coming soon</li>
          </ul>
        </div>
      </div>
      <div className="container-site overflow-hidden">
        <p className="select-none font-display text-[18vw] font-bold leading-[0.8] tracking-tighter text-ink-card">DelighTech</p>
      </div>
      <div className="container-site flex flex-col justify-between gap-4 border-t border-ink-border py-8 text-xs text-ink-muted md:flex-row">
        <p>© {new Date().getFullYear()} DelighTech Pro. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:text-ink-foreground">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-ink-foreground">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
