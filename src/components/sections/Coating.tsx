"use client";

import Image from "next/image";
import { useRef } from "react";
import { Check, Info } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { media } from "@/content/media";
import { useBooking } from "../BookingContext";
import Button from "../ui/Button";
import Eyebrow from "../ui/Eyebrow";
import SplitHeading from "../ui/SplitHeading";
import OwnerInput from "../ui/OwnerInput";

const steps = ["Wash & decontaminate", "Correct as required", "Panel wipe", "Apply & level", "Controlled cure"];

const options = [
  {
    name: "Ceramic coating",
    text: "A silica-based (SiO₂) coating that bonds to the clear coat, forming a hard, glossy and strongly water-repellent layer.",
  },
  {
    name: "Graphene coating",
    text: "Graphene-enhanced formulations designed for extra slickness and to help reduce water spotting. Performance varies by product.",
  },
];

const benefits = [
  "Deep gloss and richer colour",
  "Strong water beading — washing becomes quicker",
  "Added resistance to UV, bird droppings and chemical etching when cleaned promptly",
  "A slick surface that resists dirt bonding",
];

const care = [
  "Use a pH-neutral shampoo and the two-bucket method",
  "Avoid automatic brush washes",
  "Follow the curing guidance given at handover",
  "Periodic inspection and maintenance top-ups extend performance",
];

export default function Coating() {
  const root = useRef<HTMLElement>(null);
  const { request } = useBooking();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-coat-img]",
          { clipPath: "inset(18% 18% 18% 18% round 32px)", scale: 1.25 },
          {
            clipPath: "inset(0% 0% 0% 0% round 24px)",
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-coat-img]", start: "top 90%", end: "center 55%", scrub: true },
          }
        );
        gsap.to("[data-coat-float]", {
          yPercent: -30,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
        gsap.from("[data-coat-step]", {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1,
          ease: "power3.inOut",
          stagger: 0.12,
          scrollTrigger: { trigger: "[data-coat-steps]", start: "top 85%", once: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="coating" aria-labelledby="coating-title" className="section-pad grain relative overflow-hidden bg-obsidian">
      <div className="site-x relative z-[2] mx-auto max-w-site">
        <Eyebrow className="text-silver">Ceramic & graphene coating</Eyebrow>
        <SplitHeading
          id="coating-title"
          lines={["Gloss that turns heads.", "Protection that", "goes further."]}
          outline={[1]}
          className="display-lg mt-6 max-w-[16ch] lg:max-w-none"
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div className="relative lg:col-span-7">
            <div data-coat-img className="relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[5/4]">
              <Image
                src={media.emblemDroplets.src}
                alt={media.emblemDroplets.alt}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
              <div className="light-sweep" />
            </div>
            <div
              data-coat-float
              className="absolute -bottom-10 right-4 hidden aspect-[3/4] w-[38%] overflow-hidden rounded-2xl border-4 border-obsidian sm:block lg:-right-10"
            >
              <Image src={media.hoodGloss.src} alt={media.hoodGloss.alt} fill sizes="25vw" className="object-cover" />
            </div>
          </div>

          <div className="lg:col-span-5 lg:pl-6">
            <div className="grid gap-4">
              {options.map((o) => (
                <div key={o.name} data-reveal className="rounded-2xl border border-line bg-charcoal p-6">
                  <h3 className="font-display text-xl font-extrabold uppercase">{o.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-silver">{o.text}</p>
                </div>
              ))}
            </div>

            <h3 className="eyebrow mt-10 text-silver">What a coating can do</h3>
            <ul className="mt-4 space-y-3">
              {benefits.map((b) => (
                <li key={b} data-reveal className="flex gap-3 font-semibold">
                  <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={2.5} />
                  {b}
                </li>
              ))}
            </ul>

            <p data-reveal className="mt-8 flex gap-3 rounded-xl border border-silver/20 p-4 text-sm leading-relaxed text-silver">
              <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
              Honest expectations: coatings are not scratch-proof and won&apos;t stop stone chips. How long one lasts
              depends on the product, preparation, how the car is used and how it&apos;s maintained.
            </p>
          </div>
        </div>

        {/* Process */}
        <div className="mt-28">
          <h3 className="eyebrow text-silver">Preparation & application</h3>
          <ol data-coat-steps className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s, i) => (
              <li key={s}>
                <div data-coat-step className="h-0.5 bg-gradient-to-r from-accent to-silver/40" />
                <p className="mt-4 font-display text-sm font-extrabold text-accent">0{i + 1}</p>
                <p className="mt-1 font-display text-lg font-bold uppercase leading-tight">{s}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-20 grid gap-10 border-t border-line pt-12 lg:grid-cols-3">
          <div>
            <h3 className="eyebrow text-silver">Maintenance</h3>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-silver">
              {care.map((c) => (
                <li key={c}>— {c}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow text-silver">Packages & warranty</h3>
            <p className="mt-4 text-sm text-silver">
              Coating packages, product brands and any warranty terms are confirmed by the studio.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <OwnerInput label="Coating packages" />
              <OwnerInput label="Warranty terms" />
            </div>
          </div>
          <div className="flex items-end lg:justify-end">
            <Button onClick={() => request("Ceramic & Graphene Coating")} magnetic>
              Enquire about coating
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
