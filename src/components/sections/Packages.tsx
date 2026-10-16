"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { packages } from "@/content/site";
import { categories, servicesByCategory } from "@/content/services";
import { useBooking } from "../BookingContext";
import Button from "../ui/Button";
import Eyebrow from "../ui/Eyebrow";
import SplitHeading from "../ui/SplitHeading";
import { useTilt } from "@/lib/hooks";

export default function Packages() {
  const { request } = useBooking();
  const [picked, setPicked] = useState<string[]>([]);
  const toggle = (t: string) => setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  return (
    <section id="packages" aria-labelledby="packages-title" className="section-pad bg-mist text-obsidian">
      <div className="site-x mx-auto max-w-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow className="text-graphite">Packages & pricing</Eyebrow>
            <SplitHeading id="packages-title" lines={["The right care", "for your drive."]} className="display-lg mt-6" />
          </div>
          <p data-reveal className="text-sm leading-relaxed text-graphite lg:col-span-4">
            Pricing depends on vehicle size and condition, so every package is confirmed with you before any work
            begins. Tell us what you drive and we&apos;ll recommend the right level.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((p, i) => (
            <PackageCard key={p.id} index={i} pkg={p} onRequest={() => request(p.name)} />
          ))}
        </div>

        {/* Customise */}
        <div data-reveal className="mt-4 rounded-2xl bg-obsidian p-6 text-white sm:p-10">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow text-silver">Customize your service</p>
              <h3 className="display-md mt-4">Build your own.</h3>
              <p className="mt-4 text-sm leading-relaxed text-silver">
                Need something specific? Choose the treatments you&apos;re interested in and we&apos;ll add them to your
                enquiry.
              </p>
              <div className="mt-8">
                <Button
                  onClick={() => request("Custom selection", picked.length ? `Interested in: ${picked.join(", ")}` : undefined)}
                  disabled={picked.length === 0}
                >
                  {picked.length ? `Add ${picked.length} to enquiry` : "Select treatments"}
                </Button>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
              {categories.map((c) => (
                <fieldset key={c.id}>
                  <legend className="eyebrow mb-3 text-silver">
                    <span className="text-accent">{c.code}</span> · {c.title}
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {servicesByCategory(c.id).map((s) => {
                      const on = picked.includes(s.title);
                      return (
                        <button
                          key={s.slug}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggle(s.title)}
                          className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${
                            on ? "border-accent bg-accent-strong text-white" : "border-line text-silver hover:border-white/40 hover:text-white"
                          }`}
                        >
                          {on ? <Check aria-hidden className="size-3.5" strokeWidth={3} /> : <Plus aria-hidden className="size-3.5" />}
                          {s.title}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PackageCard({
  pkg,
  index,
  onRequest,
}: {
  pkg: (typeof packages)[number];
  index: number;
  onRequest: () => void;
}) {
  const tilt = useTilt<HTMLElement>(4);
  const dark = pkg.highlight;
  return (
    <article
      ref={tilt}
      data-reveal
      className={`relative flex flex-col rounded-2xl p-7 ${dark ? "bg-obsidian text-white" : "border border-obsidian/10 bg-white"}`}
    >
      {dark && (
        <span className="eyebrow absolute right-6 top-7 rounded-full bg-accent-strong px-2.5 py-1 text-[0.6rem] text-white">
          Protection
        </span>
      )}
      <p className={`font-display text-sm font-extrabold ${dark ? "text-accent" : "text-accent-strong"}`}>0{index + 1}</p>
      <h3 className="mt-8 font-display text-[1.7rem] font-extrabold uppercase leading-[0.95] tracking-tight">{pkg.name}</h3>
      <p className={`mt-3 text-sm ${dark ? "text-silver" : "text-graphite"}`}>{pkg.summary}</p>

      <p className={`mt-8 font-display text-2xl font-extrabold uppercase ${dark ? "" : ""}`}>
        {pkg.price ?? "Price on enquiry"}
      </p>

      <div className={`mt-6 border-t pt-6 ${dark ? "border-line" : "border-obsidian/10"}`}>
        {pkg.inclusions.length > 0 ? (
          <>
            <p className="eyebrow text-[0.62rem]">Includes</p>
            <ul className="mt-3 space-y-2 text-sm">
              {pkg.inclusions.map((x) => (
                <li key={x} className="flex gap-2">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0" /> {x}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p className={`eyebrow text-[0.62rem] ${dark ? "text-silver" : "text-graphite"}`}>Ideal for</p>
            <ul className="mt-3 space-y-2 text-sm font-semibold">
              {pkg.idealFor.map((x) => (
                <li key={x} className="flex gap-2">
                  <span aria-hidden className={`mt-2 h-px w-3 shrink-0 ${dark ? "bg-accent" : "bg-accent-strong"}`} /> {x}
                </li>
              ))}
            </ul>
            <p className={`mt-5 text-xs ${dark ? "text-silver/80" : "text-graphite/80"}`}>
              Exact inclusions confirmed by the studio for your vehicle.
            </p>
          </>
        )}
      </div>

      <div className="mt-auto pt-8">
        <Button onClick={onRequest} variant={dark ? "primary" : "dark"} className="w-full">
          Request this package
        </Button>
      </div>
    </article>
  );
}
