/** Brief, CSS-only brand intro (~1.5s, once per session, skipped for reduced motion). */
export default function Loader() {
  const words = ["Prepare.", "Refine.", "Protect."];
  return (
    <div className="loader" aria-hidden>
      <div className="w-[min(88vw,40rem)]">
        <p className="flex flex-wrap gap-x-4 font-display text-[clamp(1.8rem,6vw,3.6rem)] font-extrabold uppercase leading-none tracking-tight">
          {words.map((w, i) => (
            <span key={w} className="loader-word" style={{ animationDelay: `${0.1 + i * 0.22}s` }}>
              {i === 2 ? <span className="text-accent">{w}</span> : w}
            </span>
          ))}
        </p>
        <div className="mt-6 h-px w-full bg-white/10">
          <div className="loader-bar h-px bg-white" />
        </div>
      </div>
    </div>
  );
}
