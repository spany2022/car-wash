"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/content/site";
import { business, telHref } from "@/content/business";
import { getLenis } from "@/lib/scroll";
import Button from "./ui/Button";
import Logo from "./ui/Logo";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const sections = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [isHome]);

  // Mobile menu: lock scroll, close on Escape, return focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const toggle = toggleRef.current;
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  const href = (id: string) => (isHome ? `#${id}` : `/#${id}`);
  const solid = scrolled || !isHome || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
        solid ? "border-b border-line bg-obsidian/92 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-obsidian"
      >
        Skip to content
      </a>
      <div className="site-x mx-auto flex h-[4.5rem] max-w-site items-center justify-between gap-6">
        <Link href="/" aria-label={`${business.name} — home`} className="shrink-0" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const isActive = active === item.id && isHome;
              return (
                <li key={item.id}>
                  <a
                    href={href(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative rounded-full px-3.5 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.12em] transition-colors ${
                      isActive ? "text-white" : "text-silver hover:text-white"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left bg-accent transition-transform duration-500 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {business.phone && (
            <a
              href={telHref(business.phone)}
              className="hidden text-sm font-semibold text-silver transition-colors hover:text-white xl:inline"
            >
              {business.phone}
            </a>
          )}
          <Button href={href("book")} variant="primary" icon={false} className="whitespace-nowrap !min-h-11 !px-5 max-sm:!hidden">
            Book your detail
          </Button>
          <button
            ref={toggleRef}
            type="button"
            className="grid size-11 place-items-center rounded-full border border-white/20 text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!open}
        className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-obsidian lg:hidden"
      >
        <nav aria-label="Mobile" className="site-x flex min-h-full flex-col justify-between py-8">
          <ul>
            {nav.map((item, i) => (
              <li key={item.id} className="border-b border-line">
                <a
                  href={href(item.id)}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-4 font-display text-3xl font-extrabold uppercase tracking-tight"
                >
                  {item.label}
                  <span className="text-xs font-semibold text-silver">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-3" onClick={() => setOpen(false)}>
            <Button href={href("book")}>
              Book your detail
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
