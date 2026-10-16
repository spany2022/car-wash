/** Clearly marked placeholder for information the business owner must supply. Never invent the value. */
export default function OwnerInput({ label, tone = "dark" }: { label: string; tone?: "dark" | "light" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-md border border-dashed px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${
        tone === "dark" ? "border-silver/40 text-silver" : "border-obsidian/30 text-graphite"
      }`}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-accent" />
      Owner to provide · {label}
    </span>
  );
}
