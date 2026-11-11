"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { mainNav } from "@/lib/content/nav";
import { site } from "@/lib/content/site";
import { BookButton } from "@/components/booking/BookButton";
import { durations, thresholds } from "@/lib/motion";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const menuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastY = useRef(0);
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > thresholds.headerSolid);
    if (reduced || open) {
      setHidden(false);
      lastY.current = y;
      return;
    }
    const delta = y - lastY.current;
    if (y > 80 && delta > 4) setHidden(true);
    else if (delta < -4) setHidden(false);
    lastY.current = y;
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function openDropdown(label: string) {
    if (menuTimeout.current) clearTimeout(menuTimeout.current);
    setOpenMenu(label);
  }

  function closeDropdownDelayed() {
    if (menuTimeout.current) clearTimeout(menuTimeout.current);
    menuTimeout.current = setTimeout(() => setOpenMenu(null), 150);
  }

  const mobileMenu =
    mounted &&
    createPortal(
      <div
        className={`fixed inset-0 z-[70] min-[1100px]:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-ink/40 transition ${open ? "opacity-100" : "opacity-0"}`}
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-y-0 right-0 flex h-dvh max-h-dvh w-[min(100%,360px)] flex-col bg-bg transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-sand px-5 py-4">
            <p className="font-serif text-xl text-olive-deep">Menu</p>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
            {mainNav.map((item) => (
              <div key={item.href} className="border-b border-sand/60 py-1">
                <Link
                  href={item.href}
                  className="flex min-h-12 items-center px-3 text-base text-ink"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
                {"children" in item && item.children && (
                  <div className="mb-2 ml-2 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex min-h-11 items-center rounded-xl px-3 text-sm text-ink-soft"
                        onClick={() => setOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href={site.phoneHref}
              className="mt-4 flex min-h-12 items-center whitespace-nowrap px-3 text-olive-deep"
            >
              {site.phone}
            </a>
          </nav>
          <div className="shrink-0 border-t border-sand p-4">
            <BookButton className="w-full whitespace-nowrap" onClick={() => setOpen(false)} />
          </div>
        </div>
      </div>,
      document.body,
    );

  return (
    <>
      <motion.header
        className={`sticky top-0 z-50 border-b ${
          scrolled
            ? "border-sand bg-bg/90 py-2 shadow-[var(--shadow-warm)] backdrop-blur-md"
            : "border-transparent bg-bg/55 py-4 backdrop-blur-sm"
        }`}
        initial={false}
        animate={{
          opacity: 1,
          y: hidden ? "-100%" : 0,
        }}
        transition={{ duration: durations.header, ease: "easeOut" }}
      >
        <div className="container-site flex items-center justify-between gap-4">
          <div>
            <Link
              href="/"
              className="relative block h-11 w-[160px] shrink-0 transition hover:opacity-90 md:h-12 md:w-[190px]"
              aria-label={site.name}
            >
              {/* Full-colour original logo — no mask, filter or tint */}
              <Image
                src="/images/logo/1.png"
                alt={site.name}
                fill
                className="object-contain object-left"
                sizes="190px"
                priority
              />
            </Link>
          </div>

          <nav
            className="hidden items-center gap-0.5 min-[1100px]:flex"
            aria-label="Primary"
          >
            {mainNav.map((item) =>
              "children" in item && item.children ? (
                <Dropdown
                  key={item.href}
                  item={item}
                  open={openMenu === item.label}
                  onOpen={() => openDropdown(item.label)}
                  onClose={closeDropdownDelayed}
                  onForceClose={() => setOpenMenu(null)}
                />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-3.5 text-[15px] text-ink hover:text-olive-deep"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-3 min-[1100px]:flex">
            <a
              href={site.phoneHref}
              className="whitespace-nowrap text-[15px] font-medium text-olive-deep hover:text-olive"
            >
              {site.phone}
            </a>
            <BookButton size="sm" className="whitespace-nowrap" />
          </div>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-sand min-[1100px]:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-5 bg-ink transition ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-ink transition ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-ink transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </motion.header>
      {mobileMenu}
    </>
  );
}

type NavChild = { label: string; href: string; subtitle?: string };

function Dropdown({
  item,
  open,
  onOpen,
  onClose,
  onForceClose,
}: {
  item: { label: string; href: string; children: readonly NavChild[] };
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onForceClose: () => void;
}) {
  const id = useId();
  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onFocus={onOpen}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) onForceClose();
      }}
    >
      <Link
        href={item.href}
        className="inline-flex min-h-11 items-center gap-1 whitespace-nowrap rounded-full px-3.5 text-[15px] text-ink hover:text-olive-deep"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={id}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
            e.preventDefault();
            onOpen();
          }
          if (e.key === "Escape") onForceClose();
        }}
      >
        {item.label}
        <Chevron />
      </Link>
      {open && (
        <div
          id={id}
          role="menu"
          className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2 ${
            item.label === "Treatments" ? "w-[640px]" : "w-72"
          }`}
        >
          <div className="rounded-[24px] border border-sand bg-bg p-4 shadow-[var(--shadow-warm)]">
            <div
              className={
                item.label === "Treatments" ? "grid grid-cols-2 gap-1" : "grid gap-1"
              }
            >
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  role="menuitem"
                  className="rounded-2xl px-3 py-2.5 text-sm text-ink hover:bg-surface"
                  onClick={onForceClose}
                >
                  <span className="block font-medium text-olive-deep">
                    {"subtitle" in child && child.subtitle ? (
                      <span className="sanskrit">{child.label}</span>
                    ) : (
                      child.label
                    )}
                  </span>
                  {"subtitle" in child && child.subtitle && (
                    <span className="mt-0.5 block text-xs text-ink-soft line-clamp-1">
                      {child.subtitle}
                    </span>
                  )}
                </Link>
              ))}
            </div>
            <Link
              href={item.href}
              className="mt-2 block rounded-2xl px-3 py-2 text-sm font-semibold text-olive-deep"
              onClick={onForceClose}
            >
              View all {item.label.toLowerCase()}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
