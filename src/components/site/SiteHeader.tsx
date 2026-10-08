import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Cta } from "./ui";
import logo from "@/assets/delighttech-logo.png";

const links = [
  { to: "/services", label: "Service" },
  { to: "/work", label: "Portfolio" },
  { to: "/reviews", label: "Reviews" },
  { to: "/about", label: "About" },
  { to: "/insights", label: "Insight" },
] as const;

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" aria-label="DelightTech Pro home" className={cn("inline-flex shrink-0 items-center", className)}>
      <img src={logo} alt="DelightTech Pro" width={1475} height={308} className="h-auto w-40 object-contain lg:w-48" />
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <div
        className={cn(
          "container-site flex h-16 items-center justify-between rounded-full text-ink-foreground transition-all duration-500",
          scrolled ? "bg-ink/95 shadow-lift backdrop-blur-md" : "bg-ink/95",
        )}
      >
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm text-ink-muted transition-colors hover:text-ink-foreground" activeProps={{ className: "!text-ink-foreground" }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Cta to="/contact" className="py-2.5">Start a Project</Cta>
        </div>
        <button aria-label={open ? "Close menu" : "Open menu"} className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      <div
        className={cn(
          "fixed inset-0 top-0 -z-10 flex flex-col justify-between bg-ink px-6 pb-10 pt-28 text-ink-foreground transition-all duration-500 md:hidden",
          open ? "opacity-100" : "pointer-events-none -translate-y-4 opacity-0",
        )}
      >
        <nav className="flex flex-col gap-2">
          {[...links, { to: "/contact", label: "Contact" } as const].map((l, i) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="border-b border-ink-border py-4 font-display text-4xl font-semibold" style={{ transitionDelay: `${i * 40}ms` }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div onClick={() => setOpen(false)}>
          <Cta to="/contact" className="w-full justify-center">Start a Project</Cta>
        </div>
      </div>
    </header>
  );
}
