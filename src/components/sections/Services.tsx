"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useTilt } from "@/lib/hooks";
import { categories, servicesByCategory, type CategoryId, type Service } from "@/content/services";
import { media } from "@/content/media";
import { useBooking } from "../BookingContext";
import SplitHeading from "../ui/SplitHeading";
import Eyebrow from "../ui/Eyebrow";

export default function Services() {
  const [active, setActive] = useState<CategoryId>("exterior");
  const panels = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (id: CategoryId) => {
    if (id === active) return;
    setActive(id);
    requestAnimationFrame(() => {
      const panel = panels.current?.querySelector(`[data-panel="${id}"]`);
      if (!panel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        panel.querySelectorAll("[data-stagger]"),
        { y: 40, autoAlpha: 0, clipPath: "inset(0 0 100% 0)" },
        { y: 0, autoAlpha: 1, clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "power3.out", stagger: 0.07 }
      );
    });
  };

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + categories.length) % categories.length;
    tabRefs.current[next]?.focus();
    select(categories[next].id);
  };

  return (
    <section id="services" aria-labelledby="services-title" className="section-pad relative bg-mist text-obsidian">
      <div className="site-x mx-auto max-w-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow className="text-graphite">Premium services</Eyebrow>
            <SplitHeading
              id="services-title"
              lines={["Every detail.", "Every surface.", "Every time."]}
              className="display-lg mt-6"
            />
          </div>
          <p data-reveal className="lede text-graphite lg:col-span-4">
            From essential maintenance washes to advanced paint protection, discover professional care tailored to
            your vehicle.
          </p>
        </div>

        {/* Category tabs */}
        <div
          role="tablist"
          aria-label="Service categories"
          className="no-scrollbar -mx-4 mt-14 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0"
        >
          {categories.map((c, i) => {
            const on = c.id === active;
            return (
              <button
                key={c.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`tab-${c.id}`}
                aria-selected={on}
                aria-controls={`panel-${c.id}`}
                tabIndex={on ? 0 : -1}
                onClick={() => select(c.id)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={`flex shrink-0 items-center gap-3 rounded-full border px-5 py-3 text-[0.78rem] font-bold uppercase tracking-[0.12em] transition-colors duration-300 ${
                  on
                    ? "border-obsidian bg-obsidian text-white"
                    : "border-obsidian/15 text-graphite hover:border-obsidian/40"
                }`}
              >
                <span className={`font-display ${on ? "text-accent" : ""}`}>{c.code}</span>
                {c.title}
              </button>
            );
          })}
        </div>

        <div ref={panels} className="mt-10">
          {categories.map((c) => {
            const list = servicesByCategory(c.id);
            return (
              <div
                key={c.id}
                role="tabpanel"
                id={`panel-${c.id}`}
                aria-labelledby={`tab-${c.id}`}
                data-panel={c.id}
                hidden={c.id !== active}
              >
                <div className="mb-10 flex flex-col justify-between gap-6 border-b border-obsidian/10 pb-8 md:flex-row md:items-end">
                  <p
                    data-stagger
                    aria-hidden
                    className="font-display text-[clamp(3.5rem,13vw,12rem)] font-extrabold uppercase leading-[0.78] tracking-[-0.06em] text-obsidian/[0.08]"
                  >
                    {c.heading}
                  </p>
                  <p data-stagger className="max-w-md text-[1.02rem] font-medium leading-relaxed text-graphite">
                    {c.intro}
                  </p>
                </div>
                {c.id === "exterior" && <ExteriorLayout list={list} />}
                {c.id === "interior" && <InteriorLayout list={list} />}
                {c.id === "correction" && <CorrectionLayout list={list} />}
                {c.id === "protection" && <ProtectionLayout list={list} />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Card ──────────────────────────────────────────────── */

function ServiceCard({
  s,
  className = "",
  tall = false,
  wide = false,
  priority = false,
}: {
  s: Service;
  className?: string;
  tall?: boolean;
  wide?: boolean;
  priority?: boolean;
}) {
  const tilt = useTilt<HTMLElement>(5);
  const img = media[s.image];
  const category = categories.find((c) => c.id === s.category)!;
  return (
    <article
      ref={tilt}
      data-stagger
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-obsidian text-white [transform-style:preserve-3d] ${className}`}
    >
      <div className={`relative overflow-hidden ${tall ? "min-h-[22rem] flex-1" : wide ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
        <Image
          src={img.src}
          alt={img.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.07]"
          style={{ objectPosition: s.imagePosition ?? ("position" in img ? img.position : undefined) }}
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent" />
        {/* Reflective highlight follows cursor */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgb(255 255 255 / 0.12), transparent 40%)" }}
        />
        <span className="eyebrow absolute left-5 top-5 rounded-full bg-obsidian/70 px-3 py-1.5 text-[0.62rem] text-silver backdrop-blur-sm">
          {category.code} · {category.heading}
        </span>
      </div>
      <div className="relative flex flex-col gap-3 p-6">
        <h3 className="display-sm">{s.title}</h3>
        <p className="text-sm leading-relaxed text-silver">{s.short}</p>
        <div className="mt-2 flex items-center justify-between gap-4">
          <Link
            href={`/services/${s.slug}`}
            className="inline-flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.14em] after:absolute after:inset-0 hover:text-accent"
          >
            Explore service <ArrowUpRight aria-hidden className="size-4" />
          </Link>
          {s.startingPrice && <span className="text-sm font-semibold text-silver">{s.startingPrice}</span>}
        </div>
      </div>
      {/* Animated border highlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl border border-white/0 transition-colors duration-500 group-hover:border-accent/70"
      />
    </article>
  );
}

/* ── Layouts: deliberately different per category ──────── */

function ExteriorLayout({ list }: { list: Service[] }) {
  const [first, ...rest] = list;
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
      <ServiceCard s={first} tall priority className="md:col-span-2 lg:col-span-7 lg:row-span-2" />
      {rest.map((s, i) => (
        <ServiceCard key={s.slug} s={s} wide={i > 1} className={i < 2 ? "lg:col-span-5" : "lg:col-span-6"} />
      ))}
    </div>
  );
}

function InteriorLayout({ list }: { list: Service[] }) {
  const [open, setOpen] = useState(0);
  const { request } = useBooking();
  const current = list[open];
  const img = media[current.image];
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div data-stagger className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-obsidian lg:col-span-5 lg:aspect-auto lg:min-h-[36rem]">
        {list.map((s, i) => (
          <Image
            key={s.slug}
            src={media[s.image].src}
            alt={i === open ? img.alt : ""}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className={`object-cover transition-[opacity,transform] duration-700 ${i === open ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
            style={{ objectPosition: s.imagePosition }}
          />
        ))}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent" />
        <p className="absolute bottom-6 left-6 font-display text-7xl font-extrabold text-white/90">0{open + 1}</p>
      </div>
      <ol className="lg:col-span-7">
        {list.map((s, i) => {
          const on = i === open;
          return (
            <li key={s.slug} data-stagger className="border-b border-obsidian/10">
              <h3>
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={`int-${s.slug}`}
                  onClick={() => setOpen(i)}
                  className="flex w-full items-center gap-5 py-6 text-left"
                >
                  <span className={`font-display text-sm font-extrabold ${on ? "text-accent-strong" : "text-graphite/60"}`}>0{i + 1}</span>
                  <span className="flex-1 font-display text-[clamp(1.3rem,2.4vw,2.1rem)] font-extrabold uppercase leading-none tracking-tight">
                    {s.title}
                  </span>
                  <Plus aria-hidden className={`size-5 shrink-0 transition-transform duration-500 ${on ? "rotate-45" : ""}`} />
                </button>
              </h3>
              <div
                id={`int-${s.slug}`}
                className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)] ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <div className="pb-7 pl-10">
                    <p className="max-w-xl text-graphite">{s.description}</p>
                    <div className="mt-5 flex flex-wrap gap-5">
                      <Link
                        href={`/services/${s.slug}`}
                        tabIndex={on ? 0 : -1}
                        className="inline-flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.14em] hover:text-accent-strong"
                      >
                        Explore service <ArrowUpRight aria-hidden className="size-4" />
                      </Link>
                      <button
                        type="button"
                        tabIndex={on ? 0 : -1}
                        onClick={() => request(s.title)}
                        className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-accent-strong underline-offset-4 hover:underline"
                      >
                        Request this service
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function CorrectionLayout({ list }: { list: Service[] }) {
  const polishing = list.find((s) => s.options && s.slug === "machine-polishing");
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {list.map((s) => (
        <ServiceCard key={s.slug} s={s} tall className="min-h-[34rem]" />
      ))}
      {polishing?.options && (
        <div data-stagger className="rounded-2xl border border-obsidian/10 bg-white p-6 sm:p-8 lg:col-span-3">
          <div className="grid gap-6 lg:grid-cols-4 lg:items-start">
            <div>
              <p className="eyebrow text-graphite">Polishing options</p>
              <p className="mt-3 text-sm text-graphite">
                One polishing service, three levels. The right stage is recommended after inspecting your paint.
              </p>
            </div>
            {polishing.options.map((o, i) => (
              <div key={o.name} className="border-t-2 border-obsidian pt-4">
                <p className="font-display text-xs font-extrabold text-accent-strong">Stage 0{i + 1}</p>
                <p className="mt-2 font-display text-lg font-extrabold uppercase leading-tight">{o.name}</p>
                <p className="mt-2 text-sm text-graphite">{o.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ProtectionLayout({ list }: { list: Service[] }) {
  const anchors: Record<string, string> = {
    "ceramic-graphene-coating": "#coating",
    "paint-protection-film": "#ppf",
  };
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {list.map((s, i) => {
        const img = media[s.image];
        return (
          <article key={s.slug} data-stagger className="group relative isolate flex min-h-[32rem] flex-col justify-end overflow-hidden rounded-2xl bg-obsidian p-8 text-white sm:p-10">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="-z-10 object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105"
            />
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-obsidian via-obsidian/60 to-obsidian/10" />
            <p className="eyebrow text-silver">Premium protection · 0{i + 1}</p>
            <h3 className="display-md mt-4">{s.title}</h3>
            <p className="mt-4 max-w-md text-silver">{s.short}</p>
            <div className="mt-8 flex flex-wrap gap-6">
              <a
                href={anchors[s.slug]}
                className="inline-flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.14em] hover:text-accent"
              >
                See how it works <ArrowUpRight aria-hidden className="size-4" />
              </a>
              <Link
                href={`/services/${s.slug}`}
                className="inline-flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-silver hover:text-white"
              >
                Explore service
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
