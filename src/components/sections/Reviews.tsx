"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { reviews } from "@/content/site";
import { business } from "@/content/business";
import Button from "../ui/Button";
import Eyebrow from "../ui/Eyebrow";
import SplitHeading from "../ui/SplitHeading";
import OwnerInput from "../ui/OwnerInput";

/**
 * Renders ONLY genuine reviews from `content/site.ts`. With none supplied,
 * it shows an honest empty state instead of placeholder testimonials.
 */
export default function Reviews() {
  const track = useRef<HTMLUListElement>(null);
  const scroll = (dir: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section aria-labelledby="reviews-title" className="section-pad overflow-hidden bg-obsidian">
      <div className="site-x mx-auto max-w-site">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Eyebrow className="text-silver">Customer reviews</Eyebrow>
            <SplitHeading id="reviews-title" lines={["Trust built on", "every detail."]} className="display-lg mt-6" />
          </div>
          {reviews.length > 1 && (
            <div className="flex gap-2">
              <button type="button" onClick={() => scroll(-1)} aria-label="Previous reviews" className="grid size-12 place-items-center rounded-full border border-white/25 hover:bg-white hover:text-obsidian">
                <ArrowLeft className="size-5" />
              </button>
              <button type="button" onClick={() => scroll(1)} aria-label="Next reviews" className="grid size-12 place-items-center rounded-full border border-white/25 hover:bg-white hover:text-obsidian">
                <ArrowRight className="size-5" />
              </button>
            </div>
          )}
        </div>

        {reviews.length > 0 ? (
          <ul ref={track} className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto" data-lenis-prevent>
            {reviews.map((r) => (
              <li key={`${r.author}-${r.date}`} className="w-[min(86vw,28rem)] shrink-0 snap-start rounded-2xl border border-line bg-charcoal p-8">
                <p className="flex gap-1" aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} aria-hidden className={`size-4 ${i < r.rating ? "fill-white text-white" : "text-silver/40"}`} />
                  ))}
                </p>
                <blockquote className="mt-6 text-lg font-medium leading-relaxed">“{r.text}”</blockquote>
                <p className="mt-6 font-display font-bold uppercase">{r.author}</p>
                <p className="text-sm text-silver">
                  {r.url ? (
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                      via {r.source}
                    </a>
                  ) : (
                    `via ${r.source}`
                  )}
                  {r.date && ` · ${r.date}`}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div data-reveal className="mt-14 grid gap-8 rounded-3xl border border-dashed border-silver/25 p-8 sm:p-12 lg:grid-cols-12 lg:items-center">
            <p className="font-display text-[clamp(1.6rem,3vw,2.6rem)] font-extrabold uppercase leading-[1.02] tracking-tight lg:col-span-7">
              Real reviews only. <span className="text-silver/60">No invented praise, no stock testimonials.</span>
            </p>
            <div className="text-sm leading-relaxed text-silver lg:col-span-5">
              <p>
                Verified customer feedback will appear here, linked to its original source. Until then, we&apos;d
                rather show nothing than show something that isn&apos;t true.
              </p>
              <div className="mt-6">
                <OwnerInput label="Genuine reviews & review link" />
              </div>
            </div>
          </div>
        )}

        {business.reviewsUrl && (
          <div className="mt-10">
            <Button href={business.reviewsUrl} external variant="outline">
              Read customer reviews
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
