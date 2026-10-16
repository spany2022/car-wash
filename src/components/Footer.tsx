import Link from "next/link";
import { business, formatAddress, telHref } from "@/content/business";
import { nav } from "@/content/site";
import Logo from "./ui/Logo";
import OwnerInput from "./ui/OwnerInput";

const serviceLinks = [
  { href: "/services/pressure-car-wash", label: "Exterior Car Care" },
  { href: "/services/interior-deep-cleaning", label: "Interior Detailing" },
  { href: "/services/machine-polishing", label: "Paint Correction" },
  { href: "/services/ceramic-graphene-coating", label: "Ceramic & Graphene Coating" },
  { href: "/services/paint-protection-film", label: "Paint Protection Film" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-obsidian pb-28 pt-20 md:pb-10">
      <div className="site-x mx-auto max-w-site">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-silver">{business.description}</p>
            {business.social.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-2">
                {business.social.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] hover:border-white"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-6">
                <OwnerInput label="Social links" />
              </div>
            )}
          </div>

          <nav aria-label="Footer" className="md:col-span-2">
            <h2 className="eyebrow text-silver">Explore</h2>
            <ul className="mt-5 space-y-3 text-sm font-semibold">
              {nav.map((n) => (
                <li key={n.id}>
                  <Link href={`/#${n.id}`} className="transition-colors hover:text-accent">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="eyebrow text-silver">Services</h2>
            <ul className="mt-5 space-y-3 text-sm font-semibold">
              {serviceLinks.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="transition-colors hover:text-accent">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <address className="not-italic md:col-span-3">
            <h2 className="eyebrow text-silver">Contact</h2>
            <ul className="mt-5 space-y-3 text-sm font-semibold">
              <li>{business.address ? formatAddress(business.address) : <OwnerInput label="Address" />}</li>
              <li>
                {business.phone ? (
                  <a href={telHref(business.phone)} className="hover:text-accent">
                    {business.phone}
                  </a>
                ) : (
                  <OwnerInput label="Phone" />
                )}
              </li>
              <li>
                {business.email ? (
                  <a href={`mailto:${business.email}`} className="hover:text-accent">
                    {business.email}
                  </a>
                ) : (
                  <OwnerInput label="Email" />
                )}
              </li>
            </ul>
          </address>
        </div>

        <div aria-hidden className="mt-20 select-none overflow-hidden">
          <p className="whitespace-nowrap font-display text-[clamp(3rem,14vw,15rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.05em] text-white/[0.05]">
            Beyond clean.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-line pt-6 text-xs font-semibold text-silver md:flex-row md:items-center md:justify-between">
          <p>© {business.name}. All rights reserved. Photography shown is illustrative.</p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
