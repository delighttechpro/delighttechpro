import { MessagesSquare, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { socialLinks } from "./social";

export function WhatsAppChat() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button aria-label="Live Chat — choose a contact option" className="fixed bottom-4 right-4 z-40 h-auto max-w-[calc(100vw-2rem)] gap-3 rounded-lg px-4 py-3 shadow-lift md:bottom-6 md:right-6">
          <MessagesSquare aria-hidden="true" />
          <span className="text-left"><span className="block font-semibold">Live Chat</span><span className="block text-xs font-normal">Respond within 1 hour</span></span>
        </Button>
      </PopoverTrigger>
      <PopoverContent side="top" align="end" sideOffset={12} className="w-80 max-w-[calc(100vw-2rem)] rounded-lg p-5" aria-label="Contact DelightTech Pro">
        <h2 className="text-xl font-semibold">Let’s talk.</h2>
        <p className="mt-2 text-sm text-muted-foreground">Respond within 1 hour</p>
        <div className="mt-4 space-y-1">
          {socialLinks.map(({ label, href, Icon }) => (
            <Button key={label} asChild variant="ghost" className="h-auto w-full justify-start gap-3 px-3 py-3">
              <a href={href} target={label === "Email" ? undefined : "_blank"} rel="noopener noreferrer">
                <Icon aria-hidden="true" className="text-primary" />
                <span className="min-w-0 whitespace-normal text-left"><span className="block">{label}</span>{label === "Email" && <span className="block break-all text-xs text-muted-foreground">delighttechpro@gmail.com</span>}</span>
                <ArrowUpRight className="ml-auto" aria-hidden="true" />
              </a>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}