import { business } from "@/content/business";

/** Wordmark placeholder — swap for the studio's real logo artwork. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 32" aria-hidden className="size-8">
        <path d="M16 2 29 9.5v13L16 30 3 22.5v-13Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M9 18.5c3.8-4.6 10.2-4.6 14 0" fill="none" stroke="#287BFF" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      <span className="leading-none">
        <span className="block font-display text-[1.05rem] font-extrabold uppercase tracking-[0.06em]">
          {business.shortName}
        </span>
        <span className="block text-[0.58rem] font-semibold uppercase tracking-[0.34em] text-silver">Detail Studio</span>
      </span>
    </span>
  );
}
