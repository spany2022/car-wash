"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useMagnetic } from "@/lib/hooks";

type Variant = "primary" | "outline" | "light" | "dark" | "outline-dark";

const styles: Record<Variant, string> = {
  primary: "bg-accent-strong text-white hover:bg-white hover:text-obsidian",
  light: "bg-white text-obsidian hover:bg-accent-strong hover:text-white",
  dark: "bg-obsidian text-white hover:bg-accent-strong",
  outline: "border border-white/35 text-white hover:border-white hover:bg-white hover:text-obsidian",
  "outline-dark": "border border-obsidian/30 text-obsidian hover:border-obsidian hover:bg-obsidian hover:text-white",
};

type Common = {
  children: React.ReactNode;
  variant?: Variant;
  magnetic?: boolean;
  icon?: boolean;
  className?: string;
};

type AsLink = Common & { href: string; onClick?: never; type?: never; external?: boolean };
type AsButton = Common & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export default function Button(props: AsLink | AsButton) {
  const { children, variant = "primary", magnetic = false, icon = true, className = "" } = props;
  const ref = useMagnetic<HTMLSpanElement>(magnetic ? 0.28 : 0);
  const cls = `group inline-flex min-h-[3.25rem] items-center justify-center gap-3 rounded-full px-7 py-3.5 text-[0.8rem] font-bold uppercase tracking-[0.14em] transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowUpRight
          aria-hidden
          className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2.5}
        />
      )}
    </>
  );

  const content =
    "href" in props && props.href !== undefined ? (
      props.external ? (
        <a href={props.href} target="_blank" rel="noopener noreferrer" className={cls}>
          {inner}
        </a>
      ) : (
        <Link href={props.href} className={cls}>
          {inner}
        </Link>
      )
    ) : (
      <button
        type={(props as AsButton).type ?? "button"}
        onClick={(props as AsButton).onClick}
        disabled={(props as AsButton).disabled}
        className={cls}
      >
        {inner}
      </button>
    );

  return magnetic ? (
    <span ref={ref} className="inline-flex">
      {content}
    </span>
  ) : (
    content
  );
}
