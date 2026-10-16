/**
 * BUSINESS DETAILS — single source of truth.
 *
 * Every field set to `null` is something the business owner must supply.
 * The UI renders a clearly-marked placeholder for missing values instead of
 * inventing data, and structured data (JSON-LD) is only emitted once
 * `verified` is set to true with a real name, address and phone number.
 */

export type Address = {
  street: string;
  locality: string; // town / city
  region?: string;
  postalCode: string;
  country: string; // ISO 3166-1 alpha-2, e.g. "GB", "IN", "US"
};

export type OpeningHours = {
  label: string; // e.g. "Mon – Fri"
  days: Array<"Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa" | "Su">;
  opens: string | null; // "08:00" — null means closed
  closes: string | null; // "18:00"
};

export type Business = {
  /** Brand name. "Obsidian Detail Studio" is a DEMO placeholder — replace with the real trading name. */
  name: string;
  shortName: string;
  description: string;
  /** International format for display, e.g. "+44 20 7946 0000". */
  phone: string | null;
  /** Digits only including country code, e.g. "447700900000" — enables WhatsApp CTAs. */
  whatsapp: string | null;
  email: string | null;
  address: Address | null;
  hours: OpeningHours[] | null;
  /** Areas served — only list places the business genuinely serves. */
  serviceArea: string[] | null;
  /** Public review profile (e.g. Google Business Profile). */
  reviewsUrl: string | null;
  social: { label: string; href: string }[];
  /** Canonical production URL. */
  siteUrl: string;
  /** Flip to true once all of the above has been confirmed by the owner. */
  verified: boolean;
};

export const business: Business = {
  name: "Obsidian Detail Studio",
  shortName: "Obsidian",
  description:
    "Precision car care, advanced paint protection, and detailing craftsmanship designed to keep your vehicle looking exceptional.",
  phone: null,
  whatsapp: null,
  email: null,
  address: null,
  hours: null,
  serviceArea: null,
  reviewsUrl: null,
  social: [],
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  verified: false,
};

export const formatAddress = (a: Address) =>
  [a.street, a.locality, a.region, a.postalCode].filter(Boolean).join(", ");

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export const whatsappHref = (number: string, text?: string) =>
  `https://wa.me/${number.replace(/\D/g, "")}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const mapsDirectionsHref = (a: Address) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(formatAddress(a))}`;
