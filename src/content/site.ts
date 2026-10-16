import type { MediaKey } from "./media";

export const nav = [
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "coating", label: "Coating" },
  { id: "ppf", label: "PPF" },
  { id: "work", label: "Our Work" },
  { id: "packages", label: "Packages" },
  { id: "contact", label: "Contact" },
] as const;

export const journey: { no: string; title: string; text: string; image: MediaKey }[] = [
  {
    no: "01",
    title: "Prepare",
    text: "Initial inspection, vehicle assessment and preparation. We note the condition of paint, wheels and interior and agree the right scope with you.",
    image: "workshop",
  },
  {
    no: "02",
    title: "Clean",
    text: "Exterior washing, wheel cleaning, interior vacuuming and deep cleaning — the steps your service calls for, done safely and in the right order.",
    image: "foamWash",
  },
  {
    no: "03",
    title: "Refine",
    text: "Polishing, paint correction and scratch treatment where appropriate, matched to what the paint can safely take.",
    image: "paintCurve",
  },
  {
    no: "04",
    title: "Protect",
    text: "Waxing, ceramic or graphene coating, or PPF installation — according to the service you've selected.",
    image: "emblemDroplets",
  },
  {
    no: "05",
    title: "Reveal",
    text: "A final inspection and walk-around. Clean surfaces, enhanced gloss and a vehicle presented the way it deserves.",
    image: "tealStudio",
  },
];

export type Package = {
  id: string;
  name: string;
  summary: string;
  idealFor: string[];
  /** Only set once confirmed by the business. */
  price: string | null;
  /** Only list inclusions the business has confirmed. */
  inclusions: string[];
  highlight?: boolean;
};

export const packages: Package[] = [
  {
    id: "essential-wash",
    name: "Essential Wash",
    summary: "For routine exterior maintenance.",
    idealFor: ["Regular upkeep between details", "Daily drivers that see plenty of road", "A quick, safe exterior refresh"],
    price: null,
    inclusions: [],
  },
  {
    id: "complete-detail",
    name: "Complete Detail",
    summary: "For a more thorough interior and exterior cleaning experience.",
    idealFor: ["Cabins that need more than a vacuum", "Seasonal deep cleans", "Preparing a car for sale or an occasion"],
    price: null,
    inclusions: [],
  },
  {
    id: "premium-detail",
    name: "Premium Detail",
    summary: "For enhanced finishing and selected detailing services.",
    idealFor: ["Paint that has lost its gloss", "A visible step up in finish", "Newly purchased vehicles"],
    price: null,
    inclusions: [],
  },
  {
    id: "ultimate-protection",
    name: "Ultimate Protection",
    summary: "For customers interested in advanced paint protection solutions.",
    idealFor: ["New or freshly corrected paint", "High-value and enthusiast vehicles", "Long-term protection planning"],
    price: null,
    inclusions: [],
    highlight: true,
  },
];

export type GalleryCategory =
  | "Exterior"
  | "Interior"
  | "Paint Correction"
  | "Coating"
  | "PPF"
  | "Wheels"
  | "Showroom";

export const gallery: { image: MediaKey; category: GalleryCategory; caption: string; shape: "tall" | "wide" | "square" }[] = [
  { image: "silverSupercar", category: "Showroom", caption: "Studio presentation", shape: "wide" },
  { image: "paintCurve", category: "Paint Correction", caption: "Clarity in the curves", shape: "tall" },
  { image: "foamWash", category: "Exterior", caption: "Pre-wash rinse", shape: "square" },
  { image: "interior", category: "Interior", caption: "Cabin detail", shape: "wide" },
  { image: "emblemDroplets", category: "Coating", caption: "Hydrophobic beading", shape: "tall" },
  { image: "wheelSpray", category: "Wheels", caption: "Wheel & tyre care", shape: "square" },
  { image: "redR8", category: "PPF", caption: "High-impact panels", shape: "tall" },
  { image: "redGarage", category: "Showroom", caption: "Ready for handover", shape: "wide" },
  { image: "hoodGloss", category: "Paint Correction", caption: "Reflection check", shape: "tall" },
  { image: "handWash", category: "Exterior", caption: "Two-bucket hand wash", shape: "wide" },
  { image: "cockpit", category: "Interior", caption: "Driver's environment", shape: "square" },
  { image: "tealStudio", category: "Showroom", caption: "Final reveal", shape: "wide" },
];

export const reasons = [
  {
    title: "Precision-Focused Workmanship",
    text: "Every step is deliberate — from how we rinse to how we inspect under light. We take the time the finish needs.",
    icon: "Crosshair",
  },
  {
    title: "Professional Vehicle Care",
    text: "Surface-specific products and safe techniques for paint, glass, trim, leather and fabric.",
    icon: "ShieldCheck",
  },
  {
    title: "Services Tailored to Your Vehicle",
    text: "We assess condition first and recommend only what your vehicle actually needs.",
    icon: "SlidersHorizontal",
  },
  {
    title: "Advanced Protection Options",
    text: "Ceramic and graphene coatings and paint protection film for longer-lasting results.",
    icon: "Layers",
  },
  {
    title: "Attention to Every Detail",
    text: "Door shuts, badges, vents and seams. The places most people miss are where we start.",
    icon: "ScanSearch",
  },
] as const;

export type Review = {
  author: string;
  rating: number; // 1–5
  text: string;
  source: string; // e.g. "Google"
  url?: string;
  date?: string;
};

/** Add GENUINE customer reviews only (with permission and a source). Leave empty until then. */
export const reviews: Review[] = [];
