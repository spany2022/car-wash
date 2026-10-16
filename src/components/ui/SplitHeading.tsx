"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  lines: string[];
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Index of lines rendered in outline style for layered editorial emphasis. */
  outline?: number[];
  id?: string;
};

/** Oversized heading whose lines rise from a mask as it scrolls into view. */
export default function SplitHeading({ lines, as: Tag = "h2", className = "", outline = [], id }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current!.querySelectorAll("[data-line]"), {
          yPercent: 105,
          duration: 1.15,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <span data-line className={`block ${outline.includes(i) ? "outline-text" : ""}`}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
