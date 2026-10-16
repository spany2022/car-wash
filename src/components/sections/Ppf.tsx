"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { media } from "@/content/media";
import { useBooking } from "../BookingContext";
import Button from "../ui/Button";
import Eyebrow from "../ui/Eyebrow";
import SplitHeading from "../ui/SplitHeading";

type Zone =
  | "bumper"
  | "hoodEdge"
  | "hood"
  | "fenderEdge"
  | "fender"
  | "mirror"
  | "pillar"
  | "roof"
  | "doors"
  | "rocker"
  | "quarter"
  | "rear";

/** Side-profile zones, each clipped to the body silhouette. */
const zones: Record<Zone, { x: number; y: number; w: number; h: number } | "mirror"> = {
  bumper: { x: 0, y: 0, w: 108, h: 220 },
  hoodEdge: { x: 108, y: 0, w: 70, h: 146 },
  hood: { x: 178, y: 0, w: 92, h: 146 },
  fenderEdge: { x: 108, y: 146, w: 70, h: 74 },
  fender: { x: 178, y: 146, w: 122, h: 74 },
  mirror: "mirror",
  pillar: { x: 270, y: 0, w: 110, h: 118 },
  roof: { x: 380, y: 0, w: 260, h: 104 },
  doors: { x: 300, y: 104, w: 262, h: 66 },
  rocker: { x: 228, y: 170, w: 334, h: 50 },
  quarter: { x: 562, y: 0, w: 176, h: 220 },
  rear: { x: 738, y: 0, w: 62, h: 220 },
};

const coverage: { id: string; name: string; text: string; zones: Zone[] }[] = [
  {
    id: "partial",
    name: "Partial front",
    text: "Front bumper, leading edge of the bonnet and wings, and mirrors — the areas hit most by road debris.",
    zones: ["bumper", "hoodEdge", "fenderEdge", "mirror"],
  },
  {
    id: "full-front",
    name: "Full front",
    text: "Full bonnet, full front wings, front bumper and mirrors — no visible film line across the bonnet.",
    zones: ["bumper", "hoodEdge", "hood", "fenderEdge", "fender", "mirror"],
  },
  {
    id: "high-impact",
    name: "High impact",
    text: "Full front plus A-pillars, roof leading edge and sills — common for enthusiast and motorway use.",
    zones: ["bumper", "hoodEdge", "hood", "fenderEdge", "fender", "mirror", "pillar", "rocker"],
  },
  {
    id: "full-body",
    name: "Full body",
    text: "Every painted panel covered for the most complete protection against everyday wear.",
    zones: Object.keys(zones) as Zone[],
  },
];

const BODY =
  "M30 168 C30 150 40 140 70 134 L262 116 C300 92 340 72 400 66 L520 64 C580 68 640 96 690 112 L748 122 C764 126 770 140 770 160 L768 186 L664 188 A50 50 0 0 0 564 188 L226 188 A50 50 0 0 0 126 188 L40 188 C32 184 30 176 30 168 Z";

const process = ["Consultation & coverage plan", "Paint preparation", "Pattern & fit", "Edge finishing & inspection"];

export default function Ppf() {
  const [sel, setSel] = useState(1);
  const root = useRef<HTMLElement>(null);
  const { request } = useBooking();
  const active = new Set(coverage[sel].zones);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-ppf-outline]", {
          strokeDashoffset: 2400,
          duration: 2.4,
          ease: "power2.inOut",
          scrollTrigger: { trigger: "[data-ppf-svg]", start: "top 80%", once: true },
        });
        gsap.to("[data-ppf-photo]", {
          yPercent: -10,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="ppf" aria-labelledby="ppf-title" className="section-pad relative overflow-hidden bg-charcoal">
      <div className="site-x mx-auto max-w-site">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow className="text-silver">Paint protection film</Eyebrow>
            <SplitHeading id="ppf-title" lines={["Defend", "the finish."]} className="display-xl mt-6" />
          </div>
          <div className="lg:col-span-5">
            <p data-reveal className="lede text-silver">
              Advanced paint protection film designed to help protect vulnerable painted surfaces from everyday road
              wear.
            </p>
            <p data-reveal className="mt-4 text-sm leading-relaxed text-silver/80">
              PPF is a clear, durable urethane film. It adds a physical layer that helps absorb light impacts and
              scuffs while keeping the factory look. It reduces risk — it does not make paint immune to chips,
              scratches or damage.
            </p>
          </div>
        </div>

        {/* Coverage visualiser */}
        <div className="mt-16 grid gap-10 rounded-3xl border border-line bg-obsidian p-5 sm:p-8 lg:grid-cols-12 lg:p-12">
          <div className="lg:col-span-8">
            <svg
              data-ppf-svg
              viewBox="0 0 800 240"
              role="img"
              aria-label={`Vehicle silhouette showing ${coverage[sel].name} PPF coverage`}
              className="w-full"
            >
              <defs>
                <clipPath id="ppf-body">
                  <path d={BODY} />
                </clipPath>
                <linearGradient id="ppf-film" x1="0" x2="1">
                  <stop offset="0" stopColor="#287BFF" stopOpacity="0.85" />
                  <stop offset="1" stopColor="#287BFF" stopOpacity="0.55" />
                </linearGradient>
              </defs>
              <path d={BODY} fill="#24272B" />
              <g clipPath="url(#ppf-body)">
                {(Object.entries(zones) as [Zone, (typeof zones)[Zone]][]).map(([key, z]) =>
                  z === "mirror" ? null : (
                    <rect
                      key={key}
                      x={z.x}
                      y={z.y}
                      width={z.w}
                      height={z.h}
                      fill="url(#ppf-film)"
                      style={{ opacity: active.has(key) ? 1 : 0, transition: "opacity .6s cubic-bezier(.16,1,.3,1)" }}
                    />
                  )
                )}
                {/* Panel lines */}
                <g stroke="#08090B" strokeWidth="2" fill="none" opacity=".8">
                  <path d="M108 120 L118 188" />
                  <path d="M300 112 L300 186" />
                  <path d="M432 70 L436 186" />
                  <path d="M562 82 L566 160" />
                  <path d="M738 118 L744 186" />
                  <path d="M128 170 L562 170" />
                </g>
              </g>
              {/* Glass */}
              <path d="M274 114 C310 92 345 78 400 74 L512 72 C560 76 604 96 636 108 Z" fill="#08090B" opacity=".9" />
              <path d="M432 72 L436 112" stroke="#24272B" strokeWidth="6" />
              {/* Mirror */}
              <path
                d="M282 104 l22 -6 l6 12 l-24 4 Z"
                fill={active.has("mirror") ? "#287BFF" : "#3a3e44"}
                style={{ transition: "fill .6s" }}
              />
              {/* Outline */}
              <path
                data-ppf-outline
                d={BODY}
                fill="none"
                stroke="#BFC3C8"
                strokeWidth="1.5"
                strokeDasharray="2400"
                strokeDashoffset="0"
              />
              {/* Wheels */}
              {[176, 614].map((cx) => (
                <g key={cx}>
                  <circle cx={cx} cy={190} r={40} fill="#08090B" stroke="#BFC3C8" strokeWidth="1.5" />
                  <circle cx={cx} cy={190} r={24} fill="none" stroke="#24272B" strokeWidth="8" />
                  <circle cx={cx} cy={190} r={6} fill="#BFC3C8" />
                </g>
              ))}
              <line x1="0" y1="231" x2="800" y2="231" stroke="#BFC3C8" strokeOpacity=".15" />
            </svg>
            <p className="mt-4 text-xs text-silver/80">
              Common coverage approaches shown for illustration. Options offered are confirmed at consultation.
            </p>
          </div>

          <div className="lg:col-span-4">
            <div role="radiogroup" aria-label="Coverage option" className="grid gap-2">
              {coverage.map((c, i) => {
                const on = i === sel;
                return (
                  <button
                    key={c.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setSel(i)}
                    className={`rounded-xl border p-4 text-left transition-colors duration-300 ${
                      on ? "border-accent bg-accent/10" : "border-line hover:border-white/30"
                    }`}
                  >
                    <span className="flex items-center justify-between font-display text-base font-extrabold uppercase">
                      {c.name}
                      <span
                        aria-hidden
                        className={`size-3 rounded-full border-2 ${on ? "border-accent bg-accent" : "border-silver/50"}`}
                      />
                    </span>
                    {on && <span className="mt-2 block text-sm leading-relaxed text-silver">{c.text}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:col-span-6">
            <div data-ppf-photo className="absolute inset-[-10%_0]">
              <Image src={media.redR8.src} alt={media.redR8.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>
          <div className="lg:col-span-6 lg:pl-8">
            <h3 className="eyebrow text-silver">Installation process</h3>
            <ol className="mt-6 divide-y divide-line border-y border-line">
              {process.map((p, i) => (
                <li key={p} data-reveal className="flex items-baseline gap-6 py-5">
                  <span className="font-display text-sm font-extrabold text-accent">0{i + 1}</span>
                  <span className="font-display text-xl font-bold uppercase">{p}</span>
                </li>
              ))}
            </ol>
            <h3 className="eyebrow mt-10 text-silver">Care & maintenance</h3>
            <p className="mt-3 text-sm leading-relaxed text-silver">
              Hand wash with pH-neutral products, avoid pressure-washing directly at film edges, and allow the film to
              settle after installation as advised at handover. Film can be combined with a coating for easier
              cleaning.
            </p>
            <div className="mt-10">
              <Button onClick={() => request("Paint Protection Film (PPF)", `PPF coverage interest: ${coverage[sel].name}`)} magnetic>
                Explore PPF options
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
