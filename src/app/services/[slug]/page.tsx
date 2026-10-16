import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Info } from "lucide-react";
import { categoryOf, getService, services } from "@/content/services";
import { media } from "@/content/media";
import { business } from "@/content/business";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  const img = media[s.image];
  return {
    title: s.title,
    description: `${s.short} ${categoryOf(s.category).title} by ${business.name}.`,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: {
      title: `${s.title} | ${business.name}`,
      description: s.short,
      images: [{ url: `${img.src}?auto=format&fit=crop&w=1200&h=630&q=75`, width: 1200, height: 630, alt: img.alt }],
    },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const cat = categoryOf(s.category);
  const img = media[s.image];
  const related = s.related.map(getService).filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <article>
      <header className="relative isolate flex min-h-[78svh] items-end overflow-hidden bg-obsidian pt-32">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
          style={{ objectPosition: s.imagePosition ?? ("position" in img ? img.position : undefined) }}
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-obsidian via-obsidian/60 to-obsidian/30" />
        <div className="site-x mx-auto w-full max-w-site pb-16">
          <Link href="/#services" className="eyebrow inline-flex items-center gap-2 text-silver hover:text-white">
            <ArrowLeft aria-hidden className="size-4" /> All services
          </Link>
          <p className="eyebrow mt-10 text-silver">
            <span className="text-accent">{cat.code}</span> · {cat.title}
          </p>
          <h1 className="display-lg mt-5 max-w-[14ch]">{s.title}</h1>
          <p className="lede mt-6 max-w-xl text-silver">{s.short}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={`/?service=${s.slug}#book`}>Book this service</Button>
            {s.startingPrice && (
              <span className="inline-flex items-center rounded-full border border-white/25 px-6 text-sm font-bold uppercase tracking-[0.14em]">
                {s.startingPrice}
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="section-pad bg-mist text-obsidian">
        <div className="site-x mx-auto grid max-w-site gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow className="text-graphite">Overview</Eyebrow>
            <p className="mt-6 font-display text-[clamp(1.4rem,2.4vw,2.2rem)] font-bold leading-[1.2] tracking-tight">
              {s.description}
            </p>

            <h2 className="eyebrow mt-16 text-graphite">How it works</h2>
            <ol className="mt-6 divide-y divide-obsidian/10 border-y border-obsidian/10">
              {s.process.map((p, i) => (
                <li key={p} className="flex items-baseline gap-6 py-5">
                  <span className="font-display text-sm font-extrabold text-accent-strong">0{i + 1}</span>
                  <span className="font-display text-lg font-bold uppercase leading-tight">{p}</span>
                </li>
              ))}
            </ol>

            {s.options && (
              <>
                <h2 className="eyebrow mt-16 text-graphite">Options</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {s.options.map((o) => (
                    <div key={o.name} className="rounded-2xl border border-obsidian/10 bg-white p-6">
                      <p className="font-display text-lg font-extrabold uppercase">{o.name}</p>
                      <p className="mt-2 text-sm text-graphite">{o.detail}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-3xl bg-obsidian p-8 text-white lg:sticky lg:top-28">
              <h2 className="eyebrow text-silver">Benefits</h2>
              <ul className="mt-5 space-y-3">
                {s.benefits.map((b) => (
                  <li key={b} className="flex gap-3 font-semibold">
                    <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={2.5} /> {b}
                  </li>
                ))}
              </ul>
              <h2 className="eyebrow mt-10 text-silver">Good to know</h2>
              <ul className="mt-5 space-y-3 text-sm text-silver">
                {s.considerations.map((c) => (
                  <li key={c} className="flex gap-3">
                    <Info aria-hidden className="mt-0.5 size-4 shrink-0" /> {c}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Button href={`/?service=${s.slug}#book`} className="w-full">
                  Request a booking
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="section-pad bg-obsidian">
          <div className="site-x mx-auto max-w-site">
            <h2 id="related-title" className="display-md">
              Pairs well with
            </h2>
            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              {related.map((r) => {
                const ri = media[r.image];
                return (
                  <li key={r.slug}>
                    <Link href={`/services/${r.slug}`} className="group relative block aspect-[4/3] overflow-hidden rounded-2xl">
                      <Image src={ri.src} alt={ri.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      <span className="absolute inset-0 bg-gradient-to-t from-obsidian/90 to-transparent" />
                      <span className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                        <span className="font-display text-xl font-extrabold uppercase leading-tight">{r.title}</span>
                        <ArrowUpRight aria-hidden className="size-5 shrink-0" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}
