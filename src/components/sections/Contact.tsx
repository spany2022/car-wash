import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import {
  business,
  formatAddress,
  mapsDirectionsHref,
  telHref,
  whatsappHref,
} from "@/content/business";
import Button from "../ui/Button";
import Eyebrow from "../ui/Eyebrow";
import SplitHeading from "../ui/SplitHeading";
import OwnerInput from "../ui/OwnerInput";

export default function Contact() {
  const { address, phone, whatsapp, email, hours } = business;

  const rows = [
    {
      icon: MapPin,
      label: "Studio",
      value: address ? formatAddress(address) : null,
      placeholder: "Business address",
    },
    {
      icon: Phone,
      label: "Call",
      value: phone ? (
        <a href={telHref(phone)} className="hover:text-accent">
          {phone}
        </a>
      ) : null,
      placeholder: "Phone number",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: whatsapp ? (
        <a href={whatsappHref(whatsapp)} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
          Message us on WhatsApp
        </a>
      ) : null,
      placeholder: "WhatsApp number",
    },
    {
      icon: Mail,
      label: "Email",
      value: email ? (
        <a href={`mailto:${email}`} className="hover:text-accent">
          {email}
        </a>
      ) : null,
      placeholder: "Email address",
    },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-pad grain relative overflow-hidden bg-charcoal">
      <div className="site-x relative z-[2] mx-auto max-w-site">
        <Eyebrow className="text-silver">Location & contact</Eyebrow>
        <SplitHeading id="contact-title" lines={["Ready when your", "vehicle is."]} className="display-lg mt-6" />

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <address className="not-italic lg:col-span-5">
            <ul className="divide-y divide-line border-y border-line">
              {rows.map(({ icon: Icon, label, value, placeholder }) => (
                <li key={label} data-reveal className="flex gap-5 py-6">
                  <Icon aria-hidden className="mt-1 size-5 shrink-0 text-accent" />
                  <div>
                    <p className="eyebrow text-silver">{label}</p>
                    <div className="mt-2 font-display text-lg font-bold">
                      {value ?? <OwnerInput label={placeholder} />}
                    </div>
                  </div>
                </li>
              ))}
              <li data-reveal className="flex gap-5 py-6">
                <Clock aria-hidden className="mt-1 size-5 shrink-0 text-accent" />
                <div className="flex-1">
                  <p className="eyebrow text-silver">Hours</p>
                  {hours ? (
                    <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 font-semibold">
                      {hours.map((h) => (
                        <div key={h.label} className="contents">
                          <dt className="text-silver">{h.label}</dt>
                          <dd>{h.opens && h.closes ? `${h.opens} – ${h.closes}` : "Closed"}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <div className="mt-2">
                      <OwnerInput label="Opening hours" />
                    </div>
                  )}
                </div>
              </li>
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              {address ? (
                <Button href={mapsDirectionsHref(address)} external>
                  <span className="inline-flex items-center gap-2">
                    <Navigation aria-hidden className="size-4" /> Get directions
                  </span>
                </Button>
              ) : null}
              <Button href="#book" variant="outline" icon={false}>
                Request a booking
              </Button>
            </div>
          </address>

          <div data-reveal className="relative min-h-[24rem] overflow-hidden rounded-3xl border border-line bg-obsidian lg:col-span-7">
            {address ? (
              <iframe
                title={`Map showing ${business.name}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(formatAddress(address))}&output=embed`}
                className="absolute inset-0 h-full w-full [filter:grayscale(1)_invert(.92)_contrast(.9)]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center">
                <svg aria-hidden className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="none">
                  <defs>
                    <pattern id="map-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                      <path d="M48 0H0V48" fill="none" stroke="#BFC3C8" strokeOpacity=".12" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#map-grid)" />
                  <path d="M-20 300 C 200 240, 320 380, 560 260 S 900 160, 1400 240" stroke="#BFC3C8" strokeOpacity=".25" strokeWidth="14" fill="none" />
                  <path d="M380 -20 C 420 200, 300 360, 420 700" stroke="#BFC3C8" strokeOpacity=".18" strokeWidth="9" fill="none" />
                </svg>
                <div className="relative text-center">
                  <span className="mx-auto grid size-16 place-items-center rounded-full bg-accent-strong shadow-[0_0_0_12px_rgb(40_123_255/0.18),0_0_0_28px_rgb(40_123_255/0.08)]">
                    <MapPin aria-hidden className="size-7" />
                  </span>
                  <p className="mt-8 font-display text-xl font-bold uppercase">Map appears here</p>
                  <p className="mt-2 text-sm text-silver">Google Maps loads once the studio address is added.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
