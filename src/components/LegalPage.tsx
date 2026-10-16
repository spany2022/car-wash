import OwnerInput from "./ui/OwnerInput";

export default function LegalPage({
  title,
  sections,
}: {
  title: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <div className="bg-mist pb-24 pt-36 text-obsidian">
      <div className="site-x mx-auto max-w-3xl">
        <h1 className="display-md">{title}</h1>
        <div className="mt-6">
          <OwnerInput tone="light" label="Legal review before publishing" />
        </div>
        <p className="mt-6 text-sm text-graphite">
          This is a starting template, not legal advice. The business owner should review and adapt it with a
          qualified adviser for their jurisdiction.
        </p>
        <div className="mt-12 space-y-10">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-xl font-extrabold uppercase">{s.heading}</h2>
              <p className="mt-3 leading-relaxed text-graphite">{s.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
