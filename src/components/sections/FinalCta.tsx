"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { media } from "@/content/media";
import Button from "../ui/Button";

export default function FinalCta() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-cta-img]",
          { scale: 1.3, yPercent: -8 },
          { scale: 1, yPercent: 8, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } }
        );
        gsap.from("[data-cta-word]", {
          yPercent: 110,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: "top 65%", once: true },
        });
      });
    },
    { scope: root }
  );

  const words = ["Make", "every", "arrival", "count."];

  return (
    <section ref={root} aria-labelledby="final-title" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-obsidian">
      <div data-cta-img className="absolute inset-0 -z-10">
        <Image src={media.silverSupercar.src} alt={media.silverSupercar.alt} fill sizes="100vw" className="object-cover" />
      </div>
      <div className="light-sweep -z-10" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-obsidian via-obsidian/55 to-obsidian/30" />

      <div className="site-x mx-auto w-full max-w-site pb-28 pt-40 md:pb-24">
        <h2 id="final-title" className="display-xl max-w-[12ch]">
          {words.map((w, i) => (
            <span key={w} className="mr-[0.22em] inline-block overflow-hidden pb-[0.04em] align-top">
              <span data-cta-word className={`inline-block ${i === 3 ? "text-accent" : ""}`}>
                {w}
              </span>
            </span>
          ))}
        </h2>
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="lede max-w-md text-silver">Give your vehicle the care, finish, and protection it deserves.</p>
          <div className="flex flex-wrap gap-3">
            <Button href="#book" magnetic>
              Book your detail
            </Button>
            <Button href="#contact" variant="outline" magnetic icon={false}>
              Contact our team
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
