export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readMinutes: number;
  service: { label: string; to: string };
  intro: string;
  sections: { heading: string; paragraphs: string[]; list?: string[] }[];
  faqs: { q: string; a: string }[];
};

export const articles: Article[] = [
  {
    slug: "shopify-traffic-but-no-sales",
    title: "Shopify Store Getting Traffic but No Sales? 12 Fixes That Work",
    description: "Visitors but no orders? Find out why Shopify stores get traffic without sales and the practical fixes for product pages, trust, checkout and ad targeting.",
    date: "2026-10-08",
    readMinutes: 8,
    service: { label: "Conversion Optimization", to: "/growth" },
    intro: "Traffic without sales is one of the most common problems Shopify owners bring to us. The good news: it usually comes down to a handful of fixable issues — the wrong visitors, unanswered questions, or friction between product page and checkout.",
    sections: [
      {
        heading: "1. Check whether the traffic is the right traffic",
        paragraphs: [
          "Open Shopify Analytics and look at sessions by source. Broad social campaigns, cheap clicks from unrelated countries or bot traffic can inflate visitor numbers without any buying intent.",
          "Compare conversion rate by channel. If one source sends lots of visitors that never add to cart, fix the targeting before redesigning the store.",
        ],
      },
      {
        heading: "2. Make the product page answer every buying question",
        paragraphs: ["Shoppers leave when they can't quickly find what they need to decide. A strong product page covers:"],
        list: [
          "Clear, high-quality images and video, including scale and real-life use",
          "Benefit-led copy, not just specifications",
          "Price, shipping cost and delivery time visible before checkout",
          "Sizing guidance, materials and care information",
          "Returns policy summarised next to the Add to Cart button",
          "Genuine reviews from previous buyers",
        ],
      },
      {
        heading: "3. Build trust fast",
        paragraphs: [
          "New visitors don't know your brand. Show a real contact method, a clear About page, secure payment badges, recognisable payment options (Shop Pay, Apple Pay, PayPal) and policies that are easy to find.",
        ],
      },
      {
        heading: "4. Fix mobile first",
        paragraphs: [
          "Most Shopify traffic is mobile. Test your store on a phone: can you find a product, choose a variant and reach checkout in a few taps? Sticky Add to Cart buttons, readable fonts and fast-loading images make a measurable difference.",
        ],
      },
      {
        heading: "5. Remove checkout friction",
        paragraphs: [
          "Unexpected shipping fees are a top cause of abandoned carts. Show costs early, enable express checkouts, and set up abandoned-checkout emails in Shopify so interested shoppers get a reminder.",
        ],
      },
      {
        heading: "6. Match the ad to the landing page",
        paragraphs: [
          "If an ad promises a specific product or offer, send visitors straight to that product — not the homepage. Message mismatch is one of the quickest ways to waste ad spend.",
        ],
      },
      {
        heading: "7. Measure, change one thing, measure again",
        paragraphs: [
          "Track add-to-cart rate, checkout-reached rate and conversion rate. Change one element at a time so you know what actually moved the numbers.",
        ],
      },
    ],
    faqs: [
      { q: "What is a good conversion rate for a Shopify store?", a: "It varies widely by niche, price point and traffic source. Rather than chasing an industry average, measure your own baseline and improve it step by step." },
      { q: "How long does it take to fix a store with no sales?", a: "Quick wins like clearer shipping information, trust signals and better targeting can be made within days. Deeper changes to product pages and funnels take a few weeks of testing." },
    ],
  },
  {
    slug: "increase-shopify-conversion-rate",
    title: "How to Increase Your Shopify Conversion Rate: A Practical Guide",
    description: "A step-by-step guide to raising your Shopify conversion rate through better product pages, faster speed, smarter offers, upsells and checkout optimization.",
    date: "2026-10-08",
    readMinutes: 7,
    service: { label: "Conversion Optimization", to: "/growth" },
    intro: "Conversion rate optimization (CRO) means turning more of the visitors you already have into buyers. It is usually the cheapest way to grow revenue, because every improvement makes your existing traffic and ad spend work harder.",
    sections: [
      {
        heading: "Start with your funnel numbers",
        paragraphs: ["In Shopify Analytics, look at the conversion funnel: sessions → added to cart → reached checkout → purchased. The biggest drop-off tells you where to focus first."],
      },
      {
        heading: "Improve collection and product pages",
        paragraphs: ["Make navigation obvious, use filters on larger catalogues, and keep product pages focused on one clear action."],
        list: ["Lead with your strongest image", "Put the key benefit above the fold", "Show reviews near the price", "Use urgency only when it's true (real stock levels, real deadlines)"],
      },
      {
        heading: "Raise average order value",
        paragraphs: ["Bundles, 'frequently bought together' blocks, free-shipping thresholds and post-purchase upsells increase revenue per order without needing more traffic."],
      },
      {
        heading: "Speed up the store",
        paragraphs: ["Slow pages cost sales. Compress images, remove unused apps and avoid heavy scripts above the fold. See our guide to speeding up a slow Shopify store."],
      },
      {
        heading: "Test, don't guess",
        paragraphs: ["Run A/B tests on headlines, images, offers and page layouts when you have enough traffic. With low traffic, make one change at a time and compare equal periods."],
      },
    ],
    faqs: [
      { q: "Which Shopify apps help conversion?", a: "Reviews, upsell/bundle, and email/SMS apps are the most common. Install only what solves a specific problem — too many apps slow your store down." },
      { q: "Should I redesign my store to increase conversions?", a: "Not always. Targeted fixes on the product page, cart and checkout often outperform a full redesign and are faster to ship." },
    ],
  },
  {
    slug: "speed-up-slow-shopify-store",
    title: "Why Is My Shopify Store Slow? How to Speed It Up",
    description: "Learn the real causes of a slow Shopify store — heavy apps, large images, theme bloat — and the step-by-step fixes to improve speed and Core Web Vitals.",
    date: "2026-10-08",
    readMinutes: 6,
    service: { label: "Shopify Development", to: "/shopify-development" },
    intro: "Speed affects both conversions and search rankings. Google uses Core Web Vitals as a ranking signal, and shoppers abandon pages that take too long to load. Most slow Shopify stores share the same few causes.",
    sections: [
      {
        heading: "Common causes",
        paragraphs: ["These are the issues we find most often when auditing slow stores:"],
        list: ["Too many apps injecting scripts on every page", "Leftover code from apps that were uninstalled", "Uncompressed, oversized images and autoplaying videos", "Outdated or heavily customised themes", "Multiple tracking pixels and chat widgets loading at once"],
      },
      {
        heading: "How to measure",
        paragraphs: ["Use Shopify's Web Performance report and Google PageSpeed Insights on your homepage, a collection page and a product page. Focus on Largest Contentful Paint (LCP), Interaction to Next Paint (INP) and Cumulative Layout Shift (CLS)."],
      },
      {
        heading: "Fixes that make a difference",
        paragraphs: [
          "Audit your apps and remove anything you don't actively use, then check the theme code for leftover snippets. Serve images at the size they're displayed and let Shopify deliver modern formats. Lazy-load images below the fold. Move to a modern Online Store 2.0 theme if yours is several years old.",
        ],
      },
    ],
    faqs: [
      { q: "Does store speed affect Google rankings?", a: "Yes. Page experience, including Core Web Vitals, is one of the signals Google uses, and faster stores also convert better." },
      { q: "Will removing an app delete its code?", a: "Not always. Some apps leave snippets in your theme that need to be removed manually." },
    ],
  },
  {
    slug: "shopify-abandoned-cart-recovery",
    title: "Shopify Abandoned Cart Recovery: Emails, Flows and Fixes",
    description: "How to reduce abandoned carts on Shopify and win back lost sales with recovery emails, SMS, retargeting and checkout improvements.",
    date: "2026-10-08",
    readMinutes: 6,
    service: { label: "Marketing & Growth", to: "/growth" },
    intro: "Most shoppers who add to cart don't buy on their first visit. A recovery strategy combines removing the reasons people leave with timely reminders that bring them back.",
    sections: [
      {
        heading: "Why carts get abandoned",
        paragraphs: ["The usual reasons:"],
        list: ["Unexpected shipping costs or taxes", "Forced account creation", "Missing preferred payment method", "Long delivery times", "Just browsing or comparing prices"],
      },
      {
        heading: "Set up a recovery flow",
        paragraphs: [
          "Shopify includes abandoned-checkout emails, and tools like Klaviyo let you build a sequence. A common structure: a reminder within a few hours, a second email the next day addressing objections (shipping, returns, reviews), and an optional final reminder. Only add a discount if your margins allow it.",
        ],
      },
      {
        heading: "Add retargeting",
        paragraphs: ["Meta and Google retargeting ads can show viewed products to shoppers who left. Keep frequency reasonable and exclude recent buyers."],
      },
      {
        heading: "Respect consent",
        paragraphs: ["Only send marketing emails and SMS to people who have opted in, and always include a clear unsubscribe option — especially important for customers in the UK, EU and Canada."],
      },
    ],
    faqs: [
      { q: "Should abandoned cart emails include a discount?", a: "Not always. Many shoppers return with a simple reminder. Test with and without a discount to protect your margins." },
    ],
  },
  {
    slug: "shopify-facebook-ads-not-converting",
    title: "Facebook & Instagram Ads Not Converting for Your Shopify Store?",
    description: "Getting clicks but no sales from Meta ads? Check tracking, targeting, creative and landing pages with this practical troubleshooting guide for Shopify.",
    date: "2026-10-08",
    readMinutes: 7,
    service: { label: "Marketing & Growth", to: "/growth" },
    intro: "When Meta ads get clicks but no purchases, the problem is rarely just 'the algorithm'. Work through tracking, the offer, the creative and the landing page in that order.",
    sections: [
      {
        heading: "1. Confirm tracking works",
        paragraphs: ["Install the Facebook & Instagram sales channel in Shopify, enable the Conversions API, and check Events Manager to confirm Purchase, Add to Cart and Initiate Checkout events are firing correctly."],
      },
      {
        heading: "2. Optimise for the right event",
        paragraphs: ["Campaigns optimised for clicks or traffic find people who click, not people who buy. For sales, use a Sales objective optimised for purchases once your pixel has enough data."],
      },
      {
        heading: "3. Strengthen creative",
        paragraphs: ["Show the product in use, lead with the main benefit in the first seconds of video, and test several angles — problem/solution, social proof, demonstration, offer."],
      },
      {
        heading: "4. Fix the landing page",
        paragraphs: ["Send traffic to the exact product advertised, make sure it loads quickly on mobile, and keep the price and offer consistent with the ad."],
      },
      {
        heading: "5. Give it enough budget and time",
        paragraphs: ["Constant edits reset learning. Make deliberate changes, judge results on purchases and cost per acquisition, and allow for attribution differences between Meta and Shopify."],
      },
    ],
    faqs: [
      { q: "Why do Meta and Shopify show different sales numbers?", a: "They use different attribution windows and methods. Use both, but make budget decisions on consistent comparisons over time." },
    ],
  },
  {
    slug: "shopify-seo-guide",
    title: "Shopify SEO: How to Rank Your Store on Google and AI Search",
    description: "A practical Shopify SEO guide covering keywords, product and collection pages, technical setup, content and how to appear in AI search answers.",
    date: "2026-10-08",
    readMinutes: 8,
    service: { label: "Marketing & Growth", to: "/growth" },
    intro: "SEO brings shoppers who are actively searching for what you sell — without paying per click. Shopify handles a lot of the technical basics, but rankings come from well-structured pages and genuinely helpful content.",
    sections: [
      {
        heading: "Choose the right keywords",
        paragraphs: ["Map one main keyword theme to each page: broad category terms for collection pages, specific product terms for product pages, and questions for blog posts."],
      },
      {
        heading: "Optimise product and collection pages",
        list: ["Unique title tags and meta descriptions for every page", "Original product descriptions — not copied from suppliers", "Descriptive image alt text", "Short intro copy on collection pages", "Internal links between related products and collections"],
        paragraphs: [],
      },
      {
        heading: "Get the technical basics right",
        paragraphs: ["Submit your sitemap in Google Search Console, fix broken links, avoid duplicate content from tag and filter pages, and keep the store fast on mobile."],
      },
      {
        heading: "Publish helpful content",
        paragraphs: ["Buying guides, comparisons and answers to common customer questions attract visitors earlier in their journey and build topical authority."],
      },
      {
        heading: "Show up in AI search",
        paragraphs: ["AI assistants such as ChatGPT, Perplexity and Google's AI Overviews draw on clear, well-structured, factual pages. Answer questions directly, use descriptive headings, keep business details consistent across the web, and earn mentions on reputable sites."],
      },
    ],
    faqs: [
      { q: "How long does Shopify SEO take to work?", a: "SEO typically takes months, not days. Technical fixes can show results sooner; content and authority build over time." },
      { q: "Is Shopify good for SEO?", a: "Yes. Shopify covers the technical foundations well; success depends on your page content, structure and authority." },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
