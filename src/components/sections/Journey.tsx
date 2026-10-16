"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, DESKTOP_MOTION } from "@/lib/gsap";
import { journey } from "@/content/site";
import { media } from "@/content/media";
import Eyebrow from "../ui/Eyebrow";

/**
 * Desktop: the section pins and the five stages travel horizontally, scrubbed by scroll.
 * Tablet / mobile / reduced motion: a natural vertical sequence — nothing pins.
 */
export default function Journey() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        gsap.fromTo("[data-progress]", { scaleX: 0 }, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
        });
        gsap.utils.toArray<HTMLElement>("[data-stage]").forEach((stage) => {
          const img = stage.querySelector("[data-stage-img]");
          gsap.fromTo(
            stage.querySelector("[data-stage-mask]"),
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              ease: "none",
              scrollTrigger: { trigger: stage, containerAnimation: tween, start: "left 95%", end: "left 35%", scrub: true },
            }
          );
          gsap.fromTo(img, { xPercent: -12, scale: 1.2 }, {
            xPercent: 12,
            scale: 1.05,
            ease: "none",
            scrollTrigger: { trigger: stage, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
          });
        });
      });

      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-stage-mask]").forEach((m) => {
          gsap.fromTo(m, { clipPath: "inset(0 0 100% 0)" }, {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: m, start: "top 85%", once: true },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="process"
      aria-labelledby="process-title"
      className="grain relative overflow-hidden bg-charcoal motion-safe:lg:h-screen"
    >
      <div ref={track} className="relative z-[2] flex flex-col motion-safe:lg:h-full motion-safe:lg:w-max motion-safe:lg:flex-row motion-safe:lg:items-center">
        {/* Intro panel */}
        <div className="site-x flex flex-col justify-center pb-10 pt-24 motion-safe:lg:h-full motion-safe:lg:w-[52vw] motion-safe:lg:shrink-0 motion-safe:lg:py-0 motion-safe:lg:pl-[max(3.5rem,calc((100vw-88rem)/2+3.5rem))]">
          <Eyebrow className="text-silver">The detailing journey</Eyebrow>
          <h2 id="process-title" className="display-lg mt-6">
            Precision is not a step.{" "}
            <span className="text-silver/60">It is the standard.</span>
          </h2>
          <p className="lede mt-8 max-w-md text-silver">
            Every vehicle follows a considered sequence. The exact steps depend on the service you choose — not every
            car needs every procedure, and we&apos;ll never suggest one it doesn&apos;t.
          </p>
          <p className="eyebrow mt-10 hidden items-center gap-3 text-silver motion-safe:lg:flex">
            Scroll to follow the process <span aria-hidden>→</span>
          </p>
        </div>

        <ol className="site-x grid gap-16 pb-24 motion-safe:lg:flex motion-safe:lg:h-full motion-safe:lg:items-center motion-safe:lg:gap-[6vw] motion-safe:lg:px-0 motion-safe:lg:pb-0 motion-safe:lg:pr-[10vw]">
          {journey.map((step) => {
            const img = media[step.image];
            return (
              <li key={step.no} data-stage className="relative motion-safe:lg:w-[min(64vw,58rem)] motion-safe:lg:shrink-0">
                <div className="grid gap-6 lg:grid-cols-[1fr_17rem] lg:items-end lg:gap-10">
                  <div data-stage-mask className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-[16/11]">
                    <div data-stage-img className="absolute inset-0">
                      <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                    </div>
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-obsidian/60 to-transparent" />
                  </div>
                  <div>
                    <p
                      aria-hidden
                      className="font-display text-[clamp(5rem,11vw,10rem)] font-extrabold leading-[0.8] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_rgb(191_195_200/0.5)]"
                    >
                      {step.no}
                    </p>
                    <h3 className="display-md mt-4">
                      <span className="sr-only">Step {step.no}: </span>
                      {step.title}
                    </h3>
                    <p className="mt-4 text-[0.98rem] leading-relaxed text-silver">{step.text}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Progress indicator (desktop) */}
      <div aria-hidden className="absolute inset-x-0 bottom-10 z-[3] hidden motion-safe:lg:block">
        <div className="site-x mx-auto flex max-w-site items-center gap-6">
          <span className="eyebrow text-silver">01</span>
          <div className="h-px flex-1 bg-white/15">
            <div data-progress className="h-px origin-left scale-x-0 bg-accent" />
          </div>
          <span className="eyebrow text-silver">05</span>
        </div>
      </div>
    </section>
  );
}
