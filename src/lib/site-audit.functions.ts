import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type AuditCategory = "SEO" | "Performance" | "Conversion" | "Design & UX" | "Marketing" | "eCommerce";
export type AuditFinding = {
  category: AuditCategory;
  status: "pass" | "warn" | "fail";
  title: string;
  measured: string;
  impact: "High" | "Medium" | "Low";
  suggestion?: string;
};
export type AuditResult = {
  url: string;
  finalUrl: string;
  platform: string;
  responseMs: number;
  htmlKb: number;
  score: number;
  categories: { name: AuditCategory; score: number }[];
  findings: AuditFinding[];
};

const BLOCKED = /^(localhost|127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.|0\.|\[?::1\]?$|.*\.local$|.*\.internal$)/i;

function normalize(raw: string) {
  let s = raw.trim();
  if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
  const u = new URL(s);
  if (!["http:", "https:"].includes(u.protocol) || BLOCKED.test(u.hostname) || !u.hostname.includes(".")) {
    throw new Error("Please enter a public website address, like yourstore.com");
  }
  return u;
}

async function timedFetch(url: string, ms = 12000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, {
      signal: ctrl.signal,
      redirect: "follow",
      headers: { "user-agent": "Mozilla/5.0 (compatible; DelightTechProHealthCheck/1.0)", accept: "text/html,*/*" },
    });
  } finally {
    clearTimeout(t);
  }
}

const count = (html: string, re: RegExp) => (html.match(re) || []).length;
const strip = (s: string) => s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, "\"").replace(/\s+/g, " ").trim();

export function analyzeHtml(html: string, finalUrl: string, responseMs: number, extras: { robots: boolean; sitemap: boolean }): Omit<AuditResult, "url"> {
  const f: AuditFinding[] = [];
  const add = (x: AuditFinding) => f.push(x);
  const lower = html.toLowerCase();
  const htmlKb = Math.round(new TextEncoder().encode(html).length / 1024);

  const isShopify = /cdn\.shopify\.com|shopify\.theme|myshopify\.com/i.test(html);
  const platform = isShopify ? "Shopify" : /woocommerce/i.test(html) ? "WooCommerce" : /wix\.com|wixstatic/i.test(html) ? "Wix" : /squarespace/i.test(html) ? "Squarespace" : /bigcommerce/i.test(html) ? "BigCommerce" : "Not detected";

  // SEO
  const title = strip(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  add(!title
    ? { category: "SEO", status: "fail", title: "Page title missing", measured: "No <title> tag found", impact: "High", suggestion: "Add a unique title (50–60 characters) with your main product keyword and brand name." }
    : title.length < 30 || title.length > 65
      ? { category: "SEO", status: "warn", title: "Page title length", measured: `${title.length} characters: “${title.slice(0, 80)}”`, impact: "Medium", suggestion: "Keep the title between 30 and 65 characters so Google shows it in full and it attracts clicks." }
      : { category: "SEO", status: "pass", title: "Page title", measured: `${title.length} characters`, impact: "Medium" });

  const desc = html.match(/<meta[^>]+name=["']description["'][^>]*>/i)?.[0].match(/content=["']([^"']*)["']/i)?.[1] ?? "";
  add(!desc
    ? { category: "SEO", status: "fail", title: "Meta description missing", measured: "No meta description found", impact: "High", suggestion: "Write a 120–160 character description that sells the click: what you sell, who it’s for and a reason to buy." }
    : desc.length < 70 || desc.length > 170
      ? { category: "SEO", status: "warn", title: "Meta description length", measured: `${desc.length} characters`, impact: "Medium", suggestion: "Aim for 120–160 characters so search results show a complete, persuasive summary." }
      : { category: "SEO", status: "pass", title: "Meta description", measured: `${desc.length} characters`, impact: "Medium" });

  const h1 = count(html, /<h1[\s>]/gi);
  add(h1 === 1
    ? { category: "SEO", status: "pass", title: "Main heading (H1)", measured: "Exactly 1 H1 found", impact: "Medium" }
    : { category: "SEO", status: h1 === 0 ? "fail" : "warn", title: "Main heading (H1)", measured: `${h1} H1 headings found`, impact: "Medium", suggestion: "Use one clear H1 per page that states what you sell. Multiple or missing H1s confuse search engines." });

  const canonical = /<link[^>]+rel=["']canonical["']/i.test(html);
  add(canonical
    ? { category: "SEO", status: "pass", title: "Canonical URL", measured: "Canonical tag present", impact: "Low" }
    : { category: "SEO", status: "warn", title: "Canonical URL missing", measured: "No canonical tag found", impact: "Medium", suggestion: "Add a canonical tag to stop duplicate product/collection URLs from splitting your rankings." });

  const jsonLd = count(html, /application\/ld\+json/gi);
  add(jsonLd
    ? { category: "SEO", status: "pass", title: "Structured data", measured: `${jsonLd} structured data block(s)`, impact: "Medium" }
    : { category: "SEO", status: "fail", title: "No structured data", measured: "0 JSON-LD blocks found", impact: "Medium", suggestion: "Add Product, Organization and Review schema so Google can show prices, stars and stock in results." });

  add(extras.sitemap
    ? { category: "SEO", status: "pass", title: "XML sitemap", measured: "/sitemap.xml responds", impact: "Low" }
    : { category: "SEO", status: "warn", title: "XML sitemap not found", measured: "/sitemap.xml did not respond", impact: "Medium", suggestion: "Publish a sitemap and submit it in Google Search Console so all products get indexed." });
  add(extras.robots
    ? { category: "SEO", status: "pass", title: "robots.txt", measured: "/robots.txt responds", impact: "Low" }
    : { category: "SEO", status: "warn", title: "robots.txt not found", measured: "/robots.txt did not respond", impact: "Low", suggestion: "Add a robots.txt that points crawlers to your sitemap." });

  const imgs = html.match(/<img\b[^>]*>/gi) || [];
  const noAlt = imgs.filter((i) => !/\balt=["'][^"']+["']/i.test(i)).length;
  add(imgs.length === 0
    ? { category: "SEO", status: "warn", title: "Image alt text", measured: "No images found in the page HTML", impact: "Low" }
    : noAlt === 0
      ? { category: "SEO", status: "pass", title: "Image alt text", measured: `All ${imgs.length} images have alt text`, impact: "Medium" }
      : { category: "SEO", status: noAlt / imgs.length > 0.3 ? "fail" : "warn", title: "Images missing alt text", measured: `${noAlt} of ${imgs.length} images have no alt text`, impact: "Medium", suggestion: "Describe every product image in its alt text — it helps Google Images traffic and accessibility." });

  // Performance
  add(responseMs < 800
    ? { category: "Performance", status: "pass", title: "Server response time", measured: `${responseMs} ms to load the page HTML`, impact: "High" }
    : { category: "Performance", status: responseMs > 2000 ? "fail" : "warn", title: "Slow server response", measured: `${responseMs} ms to load the page HTML`, impact: "High", suggestion: "Slow first response delays everything. Remove unused apps, reduce redirects and use a lighter theme." });
  add(htmlKb < 250
    ? { category: "Performance", status: "pass", title: "Page HTML size", measured: `${htmlKb} KB`, impact: "Medium" }
    : { category: "Performance", status: htmlKb > 600 ? "fail" : "warn", title: "Heavy page HTML", measured: `${htmlKb} KB`, impact: "Medium", suggestion: "Trim inline code, oversized menus and leftover app snippets to speed up mobile loading." });
  const scripts = count(html, /<script\b[^>]*\bsrc=/gi);
  add(scripts <= 20
    ? { category: "Performance", status: "pass", title: "External scripts", measured: `${scripts} external scripts`, impact: "Medium" }
    : { category: "Performance", status: scripts > 35 ? "fail" : "warn", title: "Too many external scripts", measured: `${scripts} external scripts`, impact: "High", suggestion: "Each app adds scripts. Audit installed apps and remove ones you no longer use — it’s one of the fastest speed wins." });
  const lazy = imgs.filter((i) => /loading=["']lazy["']/i.test(i)).length;
  if (imgs.length > 5) add(lazy > 0
    ? { category: "Performance", status: "pass", title: "Lazy-loaded images", measured: `${lazy} of ${imgs.length} images lazy-load`, impact: "Low" }
    : { category: "Performance", status: "warn", title: "Images not lazy-loaded", measured: `0 of ${imgs.length} images lazy-load`, impact: "Medium", suggestion: "Lazy-load images below the fold so the first screen appears faster on mobile." });

  // Design & UX
  const viewport = /<meta[^>]+name=["']viewport["']/i.test(html);
  add(viewport
    ? { category: "Design & UX", status: "pass", title: "Mobile viewport", measured: "Viewport tag present", impact: "High" }
    : { category: "Design & UX", status: "fail", title: "Not mobile-ready", measured: "No viewport tag found", impact: "High", suggestion: "Most shoppers browse on phones. Add a viewport tag and use a responsive theme." });
  const lang = /<html[^>]+lang=/i.test(html);
  add(lang
    ? { category: "Design & UX", status: "pass", title: "Page language", measured: "Language declared", impact: "Low" }
    : { category: "Design & UX", status: "warn", title: "Page language missing", measured: "No lang attribute on <html>", impact: "Low", suggestion: "Declare your page language so browsers, screen readers and Google serve the right audience." });
  const favicon = /<link[^>]+rel=["'][^"']*icon[^"']*["']/i.test(html);
  add(favicon
    ? { category: "Design & UX", status: "pass", title: "Favicon", measured: "Favicon present", impact: "Low" }
    : { category: "Design & UX", status: "warn", title: "Favicon missing", measured: "No favicon link found", impact: "Low", suggestion: "Add a favicon — a small trust signal in browser tabs and search results." });

  // Conversion
  const https = finalUrl.startsWith("https://");
  add(https
    ? { category: "Conversion", status: "pass", title: "Secure connection (HTTPS)", measured: "Served over HTTPS", impact: "High" }
    : { category: "Conversion", status: "fail", title: "Not secure", measured: "Served over HTTP", impact: "High", suggestion: "Browsers flag HTTP sites as ‘Not secure’, which kills trust at checkout. Enable SSL." });
  const reviews = /judge\.me|yotpo|loox|okendo|stamped|trustpilot|reviews\.io|aggregateRating/i.test(html);
  add(reviews
    ? { category: "Conversion", status: "pass", title: "Social proof / reviews", measured: "Review app or rating markup detected", impact: "High" }
    : { category: "Conversion", status: "warn", title: "No review system detected", measured: "No known review app or rating markup found", impact: "High", suggestion: "Show product reviews and star ratings. Social proof is one of the strongest drivers of add-to-cart." });
  const cta = /add to cart|add-to-cart|buy now|shop now|\/cart\/add/i.test(html);
  add(cta
    ? { category: "Conversion", status: "pass", title: "Clear call to action", measured: "Shop / add-to-cart action found on page", impact: "High" }
    : { category: "Conversion", status: "warn", title: "No clear call to action", measured: "No ‘Shop now’ / ‘Add to cart’ action found on this page", impact: "High", suggestion: "Put a clear, high-contrast ‘Shop now’ button above the fold that leads straight to your best sellers." });
  const trust = /free shipping|money.back|guarantee|returns|secure checkout/i.test(html);
  add(trust
    ? { category: "Conversion", status: "pass", title: "Trust messaging", measured: "Shipping / returns / guarantee messaging found", impact: "Medium" }
    : { category: "Conversion", status: "warn", title: "Weak trust messaging", measured: "No shipping, returns or guarantee messaging found", impact: "Medium", suggestion: "Add shipping, returns and guarantee details near the buy button to remove purchase hesitation." });

  // Marketing
  const og = /property=["']og:title["']/i.test(html) && /property=["']og:image["']/i.test(html);
  add(og
    ? { category: "Marketing", status: "pass", title: "Social sharing previews", measured: "og:title and og:image present", impact: "Medium" }
    : { category: "Marketing", status: "warn", title: "Social sharing previews incomplete", measured: "og:title or og:image missing", impact: "Medium", suggestion: "Add Open Graph tags so links shared on Facebook, WhatsApp and iMessage show an attractive preview." });
  const ga = /googletagmanager\.com|gtag\(|google-analytics\.com/i.test(html);
  add(ga
    ? { category: "Marketing", status: "pass", title: "Google analytics / tag manager", measured: "Google tag detected", impact: "High" }
    : { category: "Marketing", status: "warn", title: "No Google tracking detected", measured: "No Google Analytics or Tag Manager found", impact: "High", suggestion: "Install GA4 so you know where sales come from — you can’t grow what you don’t measure." });
  const meta = /connect\.facebook\.net|fbq\(/i.test(html);
  add(meta
    ? { category: "Marketing", status: "pass", title: "Meta (Facebook) Pixel", measured: "Meta Pixel detected", impact: "Medium" }
    : { category: "Marketing", status: "warn", title: "No Meta Pixel detected", measured: "Meta Pixel not found", impact: "Medium", suggestion: "Add the Meta Pixel to build retargeting audiences and optimize Facebook & Instagram ads." });
  const email = /klaviyo|mailchimp|omnisend|privy|newsletter|subscribe/i.test(lower);
  add(email
    ? { category: "Marketing", status: "pass", title: "Email capture", measured: "Email / newsletter signup detected", impact: "High" }
    : { category: "Marketing", status: "warn", title: "No email capture detected", measured: "No newsletter or email tool found", impact: "High", suggestion: "Capture emails with a signup offer and set up welcome and abandoned-cart flows to recover lost sales." });

  // eCommerce
  add({ category: "eCommerce", status: platform === "Not detected" ? "warn" : "pass", title: "Store platform", measured: platform === "Not detected" ? "No eCommerce platform detected on this page" : `${platform} detected`, impact: "Low", suggestion: platform === "Not detected" ? "If you sell online, a dedicated platform like Shopify gives you checkout, payments and apps out of the box." : undefined });
  const product = /"@type"\s*:\s*"Product"/i.test(html);
  add(product
    ? { category: "eCommerce", status: "pass", title: "Product schema", measured: "Product structured data found", impact: "Medium" }
    : { category: "eCommerce", status: "warn", title: "No product schema on this page", measured: "No Product structured data found", impact: "Medium", suggestion: "Product schema lets Google show price, availability and ratings — test a product page too." });

  const weight = { High: 3, Medium: 2, Low: 1 } as const;
  const pts = { pass: 1, warn: 0.5, fail: 0 } as const;
  const scoreOf = (list: AuditFinding[]) => {
    const total = list.reduce((s, x) => s + weight[x.impact], 0);
    return total ? Math.round((list.reduce((s, x) => s + weight[x.impact] * pts[x.status], 0) / total) * 100) : 100;
  };
  const names: AuditCategory[] = ["SEO", "Performance", "Conversion", "Design & UX", "Marketing", "eCommerce"];
  return {
    finalUrl,
    platform,
    responseMs,
    htmlKb,
    score: scoreOf(f),
    categories: names.map((name) => ({ name, score: scoreOf(f.filter((x) => x.category === name)) })),
    findings: f,
  };
}

export const runSiteAudit = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ url: z.string().trim().min(3).max(300) }).parse(d))
  .handler(async ({ data }): Promise<AuditResult> => {
    const u = normalize(data.url);
    const start = Date.now();
    let res: Response;
    try {
      res = await timedFetch(u.href);
    } catch {
      throw new Error("We couldn't reach that website. Check the address and try again.");
    }
    const responseMs = Date.now() - start;
    if (!res.ok) throw new Error(`The website responded with an error (${res.status}). Password-protected or blocked stores can't be analyzed.`);
    const html = (await res.text()).slice(0, 3_000_000);
    const finalUrl = res.url || u.href;
    const origin = new URL(finalUrl).origin;
    const probe = async (p: string) => {
      try { const r = await timedFetch(origin + p, 6000); return r.ok; } catch { return false; }
    };
    const [robots, sitemap] = await Promise.all([probe("/robots.txt"), probe("/sitemap.xml")]);
    return { url: u.href, ...analyzeHtml(html, finalUrl, responseMs, { robots, sitemap }) };
  });
