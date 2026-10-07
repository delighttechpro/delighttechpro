import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Cta, Reveal, SectionHead } from "./ui";

const questions = [
  {
    question: "Can you improve my existing Shopify store?",
    answer: "Yes. We work on existing stores as well as new builds. That can include design, navigation, product pages, custom sections, app integrations and performance improvements. We start with your current store and business goals to identify the right priorities.",
  },
  {
    question: "What is included in Shopify development?",
    answer: "Our services cover store design, Shopify 2.0 development, custom themes and sections, app integrations, migrations, payment and shipping setup, and performance optimization. Your project scope is agreed around what your brand needs.",
  },
  {
    question: "How do you approach conversion optimization?",
    answer: "We look at the customer journey from landing page to checkout: navigation, product information, mobile usability and buying friction. Improvements can include product and collection pages, landing pages, checkout, upsells and A/B testing.",
  },
  {
    question: "Can you help with marketing after launch?",
    answer: "Yes. Our services include Meta, Google and TikTok ads, retargeting, SEO, email marketing and content. We connect traffic acquisition with the store experience, analytics and retention so they work toward the same business goals.",
  },
  {
    question: "How much does a project cost, and how long does it take?",
    answer: "Pricing and timing depend on the store, its existing setup and the work required. Share your store link, goals and the services you need so we can discuss scope, pricing and a timeline before work starts.",
  },
  {
    question: "Will my store get the same results as the sales videos?",
    answer: "The videos show results from particular stores and periods, not a prediction for every business. Your results depend on your products, offer, traffic and campaigns. We focus on agreed store and marketing improvements and evaluate performance against your own goals.",
  },
  {
    question: "How do I get started?",
    answer: "Reach out through WhatsApp, Instagram, TikTok or email with your store link, if you have one, and what you want to achieve. We can then discuss whether you need a new store, conversion improvements, marketing or ongoing growth support.",
  },
];

export function FaqSection() {
  return (
    <section className="border-t border-border py-12 md:py-16" aria-labelledby="faq-heading">
      <div className="container-site grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHead eyebrow="FAQs" title={<span id="faq-heading">Before we get started.</span>} />
          <Reveal className="mt-6"><Cta to="/contact" variant="ghost">Let’s Talk</Cta></Reveal>
        </div>
        <Reveal className="lg:col-span-7">
          <Accordion type="single" collapsible className="border-t border-border">
            {questions.map(({ question, answer }, index) => (
              <AccordionItem key={question} value={`faq-${index}`} className="border-border">
                <AccordionTrigger className="gap-5 py-5 text-base font-semibold hover:no-underline hover:text-primary">{question}</AccordionTrigger>
                <AccordionContent className="max-w-2xl pb-5 text-base leading-relaxed text-muted-foreground">{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}