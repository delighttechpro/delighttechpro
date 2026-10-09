import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const CALENDLY_URL = "https://calendly.com/delighttechpro-info/30min";

const WIDGET_SRC = "https://assets.calendly.com/assets/external/widget.js";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

let widgetLoading: Promise<void> | null = null;

// Loaded after hydration only — the Calendly widget script is browser-only.
function loadWidget(): Promise<void> {
  if (!widgetLoading) {
    widgetLoading = new Promise<void>((resolve) => {
      const existing = document.querySelector<HTMLScriptElement>(`script[src="${WIDGET_SRC}"]`);
      if (existing) {
        if (window.Calendly) resolve();
        else existing.addEventListener("load", () => resolve(), { once: true });
        return;
      }
      const script = document.createElement("script");
      script.src = WIDGET_SRC;
      script.async = true;
      script.addEventListener("load", () => resolve(), { once: true });
      script.addEventListener("error", () => resolve(), { once: true });
      document.head.appendChild(script);
    });
  }
  return widgetLoading;
}

export function CalendlyEmbed({ url = CALENDLY_URL, className }: { url?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.getAttribute("data-calendly-initialized") === "true") return;
    el.setAttribute("data-calendly-initialized", "true");
    let active = true;
    loadWidget().then(() => {
      if (!active || !window.Calendly) return;
      window.Calendly.initInlineWidget({ url, parentElement: el });
    });
    return () => {
      active = false;
    };
  }, [url]);

  return <div ref={ref} className={cn("h-full w-full", className)} aria-label="Calendly booking calendar" />;
}
