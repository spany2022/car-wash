import { Crosshair, Layers, ScanSearch, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { reasons } from "@/content/site";
import Eyebrow from "../ui/Eyebrow";
import SplitHeading from "../ui/SplitHeading";
import OwnerInput from "../ui/OwnerInput";

const icons = { Crosshair, Layers, ScanSearch, ShieldCheck, SlidersHorizontal };

export default function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="section-pad bg-mist text-obsidian">
      <div className="site-x mx-auto max-w-site">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <Eyebrow className="text-graphite">Why choose us</Eyebrow>
            <SplitHeading id="why-title" lines={["Detailing", "without", "compromise."]} className="display-lg mt-6 !text-[clamp(2.1rem,4.4vw,4.6rem)]" />
            <p data-reveal className="lede mt-8 max-w-md text-graphite">
              Clean, considered work from people who care how your vehicle looks when you collect it — and how it
              looks months later.
            </p>
            <div data-reveal className="mt-8 flex flex-wrap gap-2">
              <OwnerInput tone="light" label="Certifications" />
              <OwnerInput tone="light" label="Product brands" />
              <OwnerInput tone="light" label="Years of experience" />
            </div>
          </div>

          <ol className="lg:col-span-7">
            {reasons.map((r, i) => {
              const Icon = icons[r.icon];
              return (
                <li
                  key={r.title}
                  data-reveal
                  className="group grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-t border-obsidian/15 py-9 last:border-b sm:grid-cols-[4.5rem_auto_1fr] sm:items-start"
                >
                  <span className="font-display text-sm font-extrabold text-accent-strong">0{i + 1}</span>
                  <span className="grid size-12 place-items-center rounded-full bg-obsidian text-white transition-colors duration-500 group-hover:bg-accent-strong sm:row-span-2">
                    <Icon aria-hidden className="size-5" strokeWidth={2.2} />
                  </span>
                  <h3 className="col-span-2 font-display text-[clamp(1.35rem,2.4vw,2rem)] font-extrabold uppercase leading-none tracking-tight sm:col-span-1">
                    {r.title}
                  </h3>
                  <p className="col-span-2 max-w-lg text-graphite sm:col-span-1 sm:col-start-3">{r.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
