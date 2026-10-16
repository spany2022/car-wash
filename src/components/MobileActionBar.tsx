"use client";

import { Phone, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { business, telHref, whatsappHref } from "@/content/business";

/** Persistent booking / contact bar on small screens. */
export default function MobileActionBar() {
  const isHome = usePathname() === "/";
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-obsidian/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <div className="flex gap-2">
        <a
          href={isHome ? "#book" : "/#book"}
          className="flex min-h-12 flex-1 items-center justify-center rounded-full bg-accent-strong text-[0.78rem] font-bold uppercase tracking-[0.14em] text-white"
        >
          Book your detail
        </a>
        {business.whatsapp && (
          <a
            href={whatsappHref(business.whatsapp, `Hi ${business.name}, I'd like to enquire about a detail.`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="grid size-12 place-items-center rounded-full border border-white/25"
          >
            <MessageCircle className="size-5" />
          </a>
        )}
        {business.phone && (
          <a
            href={telHref(business.phone)}
            aria-label={`Call ${business.phone}`}
            className="grid size-12 place-items-center rounded-full border border-white/25"
          >
            <Phone className="size-5" />
          </a>
        )}
      </div>
    </div>
  );
}
