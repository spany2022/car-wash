"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { media } from "@/content/media";
import SplitHeading from "../ui/SplitHeading";
import Eyebrow from "../ui/Eyebrow";

const improvements = [
  { k: "01", t: "Paint gloss & clarity", d: "Road film and haze removed so reflections look sharp again." },
  { k: "02", t: "Interior cleanliness", d: "Surfaces, seams and carpets cleaned with material-safe products." },
  { k: "03", t: "Wheels & tyres", d: "Brake dust lifted, tyres dressed to a clean, even finish." },
  { k: "04", t: "Surface protection", d: "Optional wax, coating or film to help the finish last." },
  { k: "05", t: "Overall presentation", d: "Glass, trim and the small details brought into line." },
];

export default function Transformation() {
  const [pos, setPos] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const root = useRef<HTMLElement>(null);

  const update = useCallback((clientX: number) => {
    const r = frame.current!.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          frame.current,
          { clipPath: "inset(12% 8% 12% 8% round 24px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 24px)",
            ease: "none",
            scrollTrigger: { trigger: frame.current, start: "top 95%", end: "top 35%", scrub: true },
          }
        );
        gsap.fromTo(
          "[data-compare-img]",
          { scale: 1.15 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: frame.current, start: "top bottom", end: "bottom top", scrub: true } }
        );
        // A gentle hint that the frame is interactive.
        const hint = { v: 50 };
        gsap.to(hint, {
          v: 32,
          duration: 0.9,
          ease: "power2.inOut",
          yoyo: true,
          repeat: 1,
          onUpdate: () => !dragging.current && setPos(hint.v),
          onComplete: () => !dragging.current && setPos(50),
          scrollTrigger: { trigger: frame.current, start: "top 55%", once: true },
        });
      });
    },
    { scope: root }
  );

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - step));
    else if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + step));
    else if (e.key === "Home") setPos(0);
    else if (e.key === "End") setPos(100);
    else return;
    e.preventDefault();
  };

  return (
    <section ref={root} id="transformation" aria-labelledby="transformation-title" className="section-pad relative bg-obsidian">
      <div className="site-x mx-auto max-w-site">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow className="text-silver">The transformation</Eyebrow>
            <SplitHeading
              id="transformation-title"
              lines={["From everyday drive", "to showroom pride."]}
              className="display-lg mt-6"
            />
          </div>
          <p data-reveal className="lede text-silver lg:col-span-4">
            An ordinary wash removes surface dirt. Professional detailing goes further — safe techniques, the right
            products for every surface, and the patience to finish what most washes miss.
          </p>
        </div>

        <div
          ref={frame}
          className="relative mt-14 aspect-[4/5] touch-pan-y select-none overflow-hidden rounded-3xl bg-charcoal sm:aspect-[16/10] lg:aspect-[21/10]"
          onPointerDown={(e) => {
            dragging.current = true;
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
            update(e.clientX);
          }}
          onPointerMove={(e) => dragging.current && update(e.clientX)}
          onPointerUp={() => (dragging.current = false)}
          onPointerCancel={() => (dragging.current = false)}
        >
          {/* AFTER (full) */}
          <div data-compare-img className="absolute inset-0">
            <Image
              src={media.redGarage.src}
              alt="Illustrative 'after' view: the vehicle with clean, glossy paint"
              fill
              sizes="(min-width: 1400px) 1400px, 100vw"
              className="pointer-events-none object-cover"
            />
          </div>
          {/* BEFORE (simulated, clipped) */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <div data-compare-img className="absolute inset-0">
              <Image
                src={media.redGarage.src}
                alt="Illustrative 'before' view: the same vehicle digitally dulled to simulate road grime"
                fill
                sizes="(min-width: 1400px) 1400px, 100vw"
                className="pointer-events-none object-cover [filter:grayscale(.45)_sepia(.4)_brightness(.62)_contrast(.78)_saturate(.7)_blur(.6px)]"
              />
              <div aria-hidden className="absolute inset-0 bg-[#6b5a3e]/25 mix-blend-multiply" />
              <div
                aria-hidden
                className="absolute inset-0 opacity-60 mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='d'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.55' numOctaves='4'/%3E%3CfeColorMatrix values='0 0 0 0 .55 0 0 0 0 .48 0 0 0 0 .38 0 0 0 1.4 -.35'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23d)'/%3E%3C/svg%3E\")",
                }}
              />
            </div>
          </div>

          <span className="eyebrow absolute left-4 top-4 rounded-full bg-obsidian/80 px-3 py-2 sm:left-6 sm:top-6">Before</span>
          <span className="eyebrow absolute right-4 top-4 rounded-full bg-white px-3 py-2 text-obsidian sm:right-6 sm:top-6">
            After
          </span>

          {/* Handle */}
          <div aria-hidden className="pointer-events-none absolute inset-y-0 w-0.5 bg-white" style={{ left: `${pos}%` }} />
          <div
            role="slider"
            tabIndex={0}
            aria-label="Compare before and after"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            aria-valuetext={`${Math.round(pos)}% before`}
            onKeyDown={onKey}
            className="absolute top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full bg-white text-obsidian shadow-[0_10px_40px_rgb(0_0_0/0.5)]"
            style={{ left: `${pos}%` }}
          >
            <span className="flex">
              <ChevronLeft className="size-4" strokeWidth={3} />
              <ChevronRight className="size-4" strokeWidth={3} />
            </span>
          </div>
        </div>
        <p className="mt-4 text-xs font-medium text-silver/80">
          Illustrative simulation — the “before” is the same photograph digitally dulled. Replace with genuine
          before-and-after photography from the studio.
        </p>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {improvements.map((i) => (
            <li key={i.k} data-reveal className="bg-obsidian p-6">
              <span className="font-display text-sm font-extrabold text-accent">{i.k}</span>
              <h3 className="mt-4 font-display text-lg font-bold uppercase leading-tight">{i.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-silver">{i.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
