import { MessageCircle, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { socialLinks } from "./social";

export function WhatsAppChat() {
  const whatsapp = socialLinks.find((link) => link.label === "WhatsApp");
  if (!whatsapp) return null;

  return (
    <Button asChild className="fixed bottom-4 right-4 z-40 h-auto max-w-[calc(100vw-2rem)] gap-3 rounded-lg px-4 py-3 shadow-lift md:bottom-6 md:right-6">
      <a href={whatsapp.href} target="_blank" rel="noopener noreferrer" aria-label="Chat with DelightTech Pro on WhatsApp — respond within 1 hour">
        <MessageCircle className="size-6" aria-hidden="true" />
        <span className="text-left"><span className="block font-semibold">Chat on WhatsApp</span><span className="block text-xs font-normal">Respond within 1 hour</span></span>
        <ArrowUpRight aria-hidden="true" />
      </a>
    </Button>
  );
}