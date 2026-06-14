"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { CtaLink } from "@/components/ui/CtaLink";
import { siteConfig } from "@/lib/site-config";
import { features } from "@/lib/features";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  ...(features.blog ? [{ href: "/blog", label: "Blog" }] : []),
  { href: "/who-am-i", label: "Who am I?" },
];

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 24);

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  // Close on Escape and outside click.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onClick);
    };
  }, [open]);

  return (
    <header
      className="sticky top-0 w-full px-3 py-4 sm:px-5"
      style={{ zIndex: "var(--z-nav)" }}
    >
      <nav
        className={cn(
          "mx-auto flex h-[72px] items-center justify-between bg-background/80 backdrop-blur-md transition-[max-width,height,padding,background-color,border-radius,box-shadow] duration-500 [transition-timing-function:var(--ease-out-quart)]",
          isScrolled
            ? "max-w-[min(36rem,calc(100vw-1.5rem))] rounded-pill px-3 ring-1 ring-ink/5"
            : "max-w-page rounded-none px-2 ring-0 sm:px-3",
        )}
        aria-label="Primary navigation"
      >
        <Link
          href="/"
          aria-label={`${siteConfig.name} — home`}
          className="flex items-center gap-3 text-title"
        >
          <span className="relative size-11 shrink-0 overflow-hidden rounded-full bg-paper ring-1 ring-ink/10">
            <Image
              src="/avatar.png"
              alt=""
              fill
              sizes="44px"
              className="object-cover object-top"
            />
          </span>
          <span className="flex flex-col">
            <span className="text-[18px] uppercase leading-tight tracking-tight">
              <span className="font-bold">Majed</span>{" "}
              <span className="font-normal text-title/85">Sief Alnasr.</span>
            </span>
            <span className="hidden text-xs font-medium text-body sm:block">
              {siteConfig.role}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2" ref={panelRef}>
          <CtaLink href={siteConfig.links.bookingEmail} className="hidden sm:inline-flex">
            Let&apos;s talk
          </CtaLink>

          <div className="relative">
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="primary-menu"
              onClick={() => setOpen((v) => !v)}
              className="tap-feedback inline-flex size-[54px] items-center justify-center rounded-pill bg-surface text-title ring-1 ring-ink/10 hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <span
                className={cn(
                  "grid transition-transform duration-200 [transition-timing-function:var(--ease-out-quart)]",
                  open && "rotate-90",
                )}
                aria-hidden
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </span>
            </button>

            {/* Floating pill stack (Figma): each link is its own white pill,
                right-aligned under the menu button, staggering in. */}
            <ul
              id="primary-menu"
              aria-hidden={!open}
              className={cn(
                "absolute right-0 top-[calc(100%+0.75rem)] flex w-max flex-col items-end gap-3",
                !open && "pointer-events-none",
              )}
            >
              <li
                className={cn(
                  "sm:hidden transition duration-200 [transition-timing-function:var(--ease-out-quart)]",
                  open
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-2 opacity-0 pointer-events-none",
                )}
              >
                <Link
                  href={siteConfig.links.bookingEmail}
                  tabIndex={open ? undefined : -1}
                  onClick={() => setOpen(false)}
                  className="tap-feedback flex h-[54px] items-center whitespace-nowrap rounded-pill bg-ink px-6 text-[15px] font-semibold text-paper shadow-[0_8px_8px_-8px_rgba(26,26,26,0.18)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  Let&apos;s talk
                </Link>
              </li>
              {links.map((link, i) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li
                    key={link.href}
                    className={cn(
                      "transition duration-200 [transition-timing-function:var(--ease-out-quart)]",
                      open
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-2 opacity-0 pointer-events-none",
                    )}
                    style={{
                      transitionDelay: open
                        ? `${(i + 1) * 40}ms`
                        : "0ms",
                    }}
                  >
                    <Link
                      href={link.href}
                      tabIndex={open ? undefined : -1}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "tap-feedback flex h-[54px] items-center whitespace-nowrap rounded-pill bg-surface px-6 text-[15px] text-title shadow-[0_8px_8px_-8px_rgba(26,26,26,0.18)] ring-1 ring-ink/5 hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
                        active ? "font-bold" : "font-semibold",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
