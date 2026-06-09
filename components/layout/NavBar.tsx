"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { CtaLink } from "@/components/ui/CtaLink";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const links = [
  { href: "/who-am-i", label: "Who am I" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/blog", label: "Blog" },
];

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-ink/5 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-container items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-title"
          onClick={() => setOpen(false)}
        >
          {siteConfig.name}
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm transition-colors hover:text-title",
                    active ? "text-title" : "text-body",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <CtaLink href={`mailto:${siteConfig.email}`}>Let&apos;s talk</CtaLink>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-pill text-title md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div className="border-t border-ink/5 bg-background px-5 py-6 md:hidden">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-lg text-title"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <CtaLink
            href={`mailto:${siteConfig.email}`}
            className="mt-6 w-full"
            onClick={() => setOpen(false)}
          >
            Let&apos;s talk
          </CtaLink>
        </div>
      )}
    </header>
  );
}
