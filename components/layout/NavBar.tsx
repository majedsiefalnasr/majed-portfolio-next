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
  const panelRef = useRef<HTMLDivElement>(null);

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
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md">
      <nav className="w-full px-5 sm:px-8 pt-4">
        <div className="mx-auto flex h-[72px] max-w-page items-center justify-between">
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
          <CtaLink href={siteConfig.links.bookingEmail}>Let&apos;s talk</CtaLink>

          <div className="relative">
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="primary-menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-[54px] items-center justify-center rounded-pill bg-surface text-title ring-1 ring-ink/10 transition-colors hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>

            {/* Floating pill stack (Figma): each link is its own white pill,
                right-aligned under the menu button, staggering in. */}
            <ul
              id="primary-menu"
              className={cn(
                "absolute right-0 top-[calc(100%+0.75rem)] flex w-max flex-col items-end gap-3",
                !open && "pointer-events-none",
              )}
            >
              {links.map((link, i) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li
                    key={link.href}
                    className={cn(
                      "transition duration-200 ease-out",
                      open
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-2 opacity-0 pointer-events-none",
                    )}
                    style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex h-[54px] items-center whitespace-nowrap rounded-pill bg-surface px-6 text-[15px] text-title shadow-[0_18px_40px_-18px_rgba(26,26,26,0.35)] ring-1 ring-ink/5 transition-colors hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
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
        </div>
      </nav>
    </header>
  );
}
