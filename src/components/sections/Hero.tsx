"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { media } from "@/content/media";
import Button from "../ui/Button";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const skipped = document.documentElement.classList.contains("skip-loader");
        const tl = gsap.timeline({ delay: skipped ? 0.1 : 1.3 });
        tl.fromTo("[data-hero-media]", { scale: 1.22 }, { scale: 1, duration: 2.6, ease: "power3.out" }, 0)
          .to("[data-hero-line] > span", { y: 0, duration: 1.2, ease: "power4.out", stagger: 0.13 }, 0.15)
          .to("[data-hero-fade]", { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.08 }, 0.75);
        gsap.set("[data-hero-fade]", { y: 24 });

        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to("[data-hero-parallax]", { yPercent: 14, ease: "none", scrollTrigger: st });
        gsap.to("[data-hero-content]", { yPercent: -22, opacity: 0, ease: "none", scrollTrigger: { ...st, end: "bottom 25%" } });
        gsap.fromTo(
          "[data-hero-frame]",
          { clipPath: "inset(0% 0% 0% 0% round 0px)" },
          { clipPath: "inset(0% 2.5% 7% 2.5% round 28px)", ease: "none", scrollTrigger: st }
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} aria-labelledby="hero-title" className="relative h-[100svh] min-h-[38rem] overflow-hidden bg-obsidian">
      <div data-hero-frame className="absolute inset-0 overflow-hidden">
        <div data-hero-parallax className="absolute inset-0 will-change-transform">
          <div data-hero-media className="absolute inset-0 will-change-transform">
            <Image
              src={media.heroCoupe.src}
              alt={media.heroCoupe.alt}
              fill
              priority
              quality={80}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: media.heroCoupe.position }}
            />
          </div>
        </div>
        <div className="light-sweep" />
        {/* Legibility gradients */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-obsidian/50" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-obsidian/70 via-transparent to-transparent" />
      </div>

      <div
        data-hero-content
        className="site-x relative z-10 mx-auto flex h-full max-w-site flex-col justify-end pb-28 pt-28 md:pb-16"
      >
        <p data-hero-fade className="eyebrow mb-6 flex items-center gap-3 text-silver">
          <span aria-hidden className="size-1.5 rounded-full bg-accent" />
          Precision detailing. Premium protection.
        </p>

        <h1 id="hero-title" className="display-xl">
          <span data-hero-line className="block overflow-hidden pb-[0.04em]">
            <span className="block">Beyond clean.</span>
          </span>
          <span data-hero-line className="block overflow-hidden pb-[0.04em]">
            <span className="block">
              Into <span className="text-accent">perfection.</span>
            </span>
          </span>
        </h1>

        <div className="mt-8 grid items-end gap-8 md:mt-10 md:grid-cols-[minmax(0,32rem)_1fr]">
          <p data-hero-fade className="lede max-w-[32rem] text-silver">
            Precision car care, advanced paint protection, and detailing craftsmanship designed to keep your vehicle
            looking exceptional.
          </p>
          <div data-hero-fade className="flex flex-wrap gap-3 md:justify-end">
            <Button href="#book" magnetic>
              Book your detail
            </Button>
            <Button href="#services" variant="outline" magnetic icon={false}>
              Explore services
            </Button>
          </div>
        </div>
      </div>

      <a
        href="#transformation"
        data-hero-fade
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-silver xl:flex"
        aria-label="Scroll to the transformation section"
      >
        <span className="eyebrow text-[0.62rem]">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-white/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_ease-in-out_infinite] bg-white" />
        </span>
      </a>
      <style>{`@keyframes scrollcue{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
    </section>
  );
}
