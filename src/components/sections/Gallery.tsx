"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { gsap, useGSAP, DESKTOP_MOTION } from "@/lib/gsap";
import { gallery, type GalleryCategory } from "@/content/site";
import { media } from "@/content/media";
import { getLenis } from "@/lib/scroll";
import Eyebrow from "../ui/Eyebrow";
import SplitHeading from "../ui/SplitHeading";

const filters: ("All" | GalleryCategory)[] = [
  "All",
  "Exterior",
  "Interior",
  "Paint Correction",
  "Coating",
  "PPF",
  "Wheels",
  "Showroom",
];

const shapeClass = { tall: "aspect-[3/4]", wide: "aspect-[4/3]", square: "aspect-square" };

export default function Gallery() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const items = gallery.filter((g) => filter === "All" || g.category === filter);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        gsap.utils.toArray<HTMLElement>("[data-depth]").forEach((el, i) => {
          gsap.to(el, {
            yPercent: [-6, 4, -10][i % 3],
            ease: "none",
            scrollTrigger: { trigger: grid.current, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
      });
    },
    { scope: grid, dependencies: [filter], revertOnUpdate: true }
  );

  const changeFilter = (f: (typeof filters)[number]) => {
    setFilter(f);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      requestAnimationFrame(() =>
        gsap.fromTo(
          grid.current!.querySelectorAll("[data-tile]"),
          { autoAlpha: 0, scale: 0.96 },
          { autoAlpha: 1, scale: 1, duration: 0.7, ease: "power3.out", stagger: 0.05 }
        )
      );
    }
  };

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
    getLenis()?.stop();
  };
  const close = useCallback(() => {
    dialog.current?.close();
  }, []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    const dlg = dialog.current;
    if (!dlg) return;
    const onClose = () => {
      setIndex(null);
      getLenis()?.start();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    dlg.addEventListener("close", onClose);
    dlg.addEventListener("keydown", onKey);
    return () => {
      dlg.removeEventListener("close", onClose);
      dlg.removeEventListener("keydown", onKey);
    };
  }, [step]);

  const current = index !== null ? items[index] : null;

  return (
    <section id="work" aria-labelledby="work-title" className="section-pad bg-obsidian">
      <div className="site-x mx-auto max-w-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow className="text-silver">Our work</Eyebrow>
            <SplitHeading id="work-title" lines={["Results speak", "louder than words."]} className="display-lg mt-6" />
          </div>
          <p data-reveal className="text-sm leading-relaxed text-silver lg:col-span-4">
            Imagery shown is illustrative while the studio&apos;s own portfolio is prepared. We only publish genuine
            customer vehicles with the owner&apos;s permission.
          </p>
        </div>

        <div role="group" aria-label="Filter gallery" className="no-scrollbar -mx-4 mt-12 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => changeFilter(f)}
              className={`shrink-0 rounded-full border px-4 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.12em] transition-colors ${
                filter === f ? "border-white bg-white text-obsidian" : "border-line text-silver hover:border-white/40 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div ref={grid} className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((g, i) => {
            const img = media[g.image];
            return (
              <div key={`${g.image}-${g.category}`} data-tile className="mb-4 break-inside-avoid">
                <div data-depth>
                  <button
                    type="button"
                    onClick={() => open(i)}
                    className={`group relative block w-full overflow-hidden rounded-2xl bg-charcoal ${shapeClass[g.shape]}`}
                    aria-label={`Open image: ${g.caption} (${g.category})`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                    <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 text-left">
                      <span>
                        <span className="eyebrow block text-[0.6rem] text-silver">{g.category}</span>
                        <span className="mt-1 block font-display text-lg font-bold uppercase">{g.caption}</span>
                      </span>
                      <Expand aria-hidden className="size-5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <dialog
        ref={dialog}
        aria-label="Gallery image viewer"
        className="lightbox m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-white"
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        {current && (
          <div className="flex h-full flex-col p-4 sm:p-8" onClick={(e) => e.target === e.currentTarget && close()}>
            <div className="flex items-center justify-between">
              <p className="eyebrow text-silver">
                {current.category} · {index! + 1} / {items.length}
              </p>
              <button type="button" onClick={close} aria-label="Close viewer" className="grid size-12 place-items-center rounded-full border border-white/25 hover:bg-white hover:text-obsidian">
                <X className="size-5" />
              </button>
            </div>
            <div className="relative my-4 flex-1">
              <Image
                key={current.image}
                src={media[current.image].src}
                alt={media[current.image].alt}
                fill
                sizes="100vw"
                quality={85}
                className="animate-[lb-in_.6s_cubic-bezier(.16,1,.3,1)] object-contain"
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="font-display text-lg font-bold uppercase sm:text-2xl">{current.caption}</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => step(-1)} aria-label="Previous image" className="grid size-12 place-items-center rounded-full border border-white/25 hover:bg-white hover:text-obsidian">
                  <ChevronLeft className="size-5" />
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next image" className="grid size-12 place-items-center rounded-full border border-white/25 hover:bg-white hover:text-obsidian">
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          </div>
        )}
        <style>{`@keyframes lb-in{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}`}</style>
      </dialog>
    </section>
  );
}
