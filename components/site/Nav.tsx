"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { LumiMark } from "@/components/lumi/Chat";
import { BRAND } from "@/lib/brand";
import { NAV_LINKS } from "@/lib/data";
import { useScrolled } from "@/lib/hooks";

export function Nav() {
  const pathname = usePathname();
  const scrolled = useScrolled(16);
  const [open, setOpen] = useState(false);

  // Close the mobile sheet on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => {
    const root = href.split("#")[0];
    if (root === "/") return pathname === "/";
    return pathname === root || pathname.startsWith(`${root}/`);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-line bg-paper/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="shell flex h-16 items-center gap-6 md:h-[4.5rem]" aria-label="Main">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label={`${BRAND.name} — home`}
        >
          <LumiMark />
          <span className="text-[1.05rem] font-semibold tracking-[-0.035em]">{BRAND.name}</span>
        </Link>

        <ul className="ml-4 hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="relative inline-flex h-9 items-center rounded-[8px] px-3 text-[0.9rem] text-ink-soft transition-colors duration-200 hover:text-ink data-[active=true]:text-ink"
                data-active={isActive(link.href)}
              >
                {link.label}
                {isActive(link.href) ? (
                  <span className="absolute inset-x-3 -bottom-px h-[2px] rounded-full bg-indigo" />
                ) : null}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <Link
            href="/contact"
            className="inline-flex h-9 items-center rounded-[8px] px-3 text-[0.9rem] text-ink-soft transition-colors duration-200 hover:text-ink"
          >
            Log in
          </Link>
          <ButtonLink href="/contact" size="sm">
            Start free
          </ButtonLink>
        </div>

        <button
          onClick={() => setOpen((value) => !value)}
          className="ml-auto grid h-10 w-10 place-items-center rounded-[9px] border border-line lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <svg viewBox="0 0 18 18" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path d="M4 4l10 10M14 4L4 14" strokeLinecap="round" />
            ) : (
              <path d="M2.5 6h13M2.5 12h13" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile sheet — a real list, not a compressed desktop bar. */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-line bg-paper lg:hidden"
      >
        <ul className="shell flex flex-col py-3">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="flex items-center justify-between border-b border-line py-3.5 text-[1.05rem] tracking-[-0.015em]"
              >
                {link.label}
                <svg
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5 text-ink-faint"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden
                >
                  <path d="M3 8h9.5M9 4.5 12.5 8 9 11.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
        <div className="shell flex flex-col gap-2 pb-5">
          <ButtonLink href="/contact" size="md" className="w-full">
            Start free
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline" size="md" className="w-full">
            Log in
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
