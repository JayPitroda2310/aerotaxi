"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AuthModal, { type AuthMode } from "./AuthModal";
import { Button, ButtonLink } from "./ui";

type NavItem = {
  label: string;
  href?: string;
  items?: { label: string; href: string }[];
};

/* Placeholder anchors: none of these pages exist yet, so they point at the
   footer rather than pretending to navigate. Swap in real routes as they land. */
const SOON = "/#footer";

const LINKS: NavItem[] = [
  {
    label: "About Us",
    items: [
      { label: "Our story", href: "/about" },
      { label: "Founders", href: "/about#founders" },
      { label: "Fleet", href: "/about#fleet" },
      { label: "Routes", href: "/#routes" },
    ],
  },
  {
    label: "Jobs & Careers",
    items: [
      { label: "Life at Aero Taxi", href: "/careers" },
      { label: "Full Time", href: "/careers#full-time" },
      { label: "Internship", href: "/careers#internship" },
    ],
  },
  {
    label: "Policies",
    items: [
      { label: "Terms & Conditions", href: SOON },
      { label: "Disclaimer Policy", href: SOON },
      { label: "Privacy Policy", href: SOON },
      { label: "Baggage Rules", href: SOON },
      { label: "Special Assistance", href: SOON },
      { label: "Conduct On-Board", href: SOON },
      { label: "Fares, Taxes, Fees & Charges", href: SOON },
      { label: "Liability For Damage", href: SOON },
      { label: "Forms", href: SOON },
      { label: "Other Information", href: SOON },
      { label: "Cancellation Policy", href: SOON },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: SOON },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 text-[21px] font-extrabold tracking-[-0.04em] ${className}`}
    >
      <span className="grid size-8.5 place-items-center rounded-[11px] bg-linear-[145deg,var(--color-accent),var(--color-accent-dark)] text-[#0d1b2a] shadow-[0_6px_18px_-6px_rgb(58_160_238/0.7)]">
        <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
          <path
            d="M16 2 19 12 30 16 19 20 16 30 13 20 2 16 13 12Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="font-display">
        Aero<span className="text-accent">Taxi</span>
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Theme toggle                                                        */
/* ------------------------------------------------------------------ */

function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    setTheme(
      document.documentElement.dataset.theme === "light" ? "light" : "dark",
    );
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("aerotaxi-theme", next);
    } catch {
      /* storage blocked — theme still applies for this page view */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={`grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-hair text-fog transition-[color,border-color,background,transform] duration-250 hover:-translate-y-0.5 hover:border-accent/45 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className}`}
    >
      {theme === "dark" ? (
        /* sun — click to go light */
        <svg
          viewBox="0 0 24 24"
          width="17"
          height="17"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        /* moon — click to go dark */
        <svg
          viewBox="0 0 24 24"
          width="17"
          height="17"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
      )}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar                                                              */
/* ------------------------------------------------------------------ */

export default function Navbar() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(null);
        setOpen(false);
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) {
        setMenu(null);
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  /*
   * A tap on a touch screen fires a synthetic mouseenter before the click.
   * With hover wired up unconditionally that opened the menu and the click
   * then toggled it straight back shut, so dropdowns never opened on a phone.
   * Hover is only attached where hovering is actually possible.
   */
  const pathname = usePathname();

  /* A same-page anchor like "/#routes" is not a route, so it never lights up.
     A dropdown lights up when the page open is one of its own entries. */
  const isCurrent = (href?: string) =>
    !!href &&
    !href.includes("#") &&
    (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const isCurrentGroup = (l: NavItem) =>
    isCurrent(l.href) || !!l.items?.some((it) => isCurrent(it.href));

  const [hoverable, setHoverable] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setHoverable(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const [auth, setAuth] = useState<AuthMode | null>(null);

  const closeAll = () => {
    setMenu(null);
    setOpen(false);
  };

  const openAuth = (m: AuthMode) => {
    closeAll();
    setAuth(m);
  };

  return (
    <header
      ref={navRef}
      className="fixed inset-x-0 top-4 z-90 px-4 max-lg:top-3"
    >
      <div
        className={`mx-auto flex w-full max-w-[1240px] items-center gap-5 rounded-2xl border px-5 py-2.5 transition-[background,border-color,box-shadow] duration-350 ${
          stuck
            ? "border-hair bg-ink/80 shadow-[0_18px_44px_-20px_rgb(13_27_42/0.17)] backdrop-blur-xl backdrop-saturate-150"
            : "border-accent/14 bg-ink/45 shadow-[0_10px_34px_-24px_rgb(13_27_42/0.15)] backdrop-blur-md"
        }`}
      >
        <Logo />

        <nav
          className={`ml-auto flex items-center gap-1 max-lg:fixed max-lg:inset-x-3.5 max-lg:top-[86px] max-lg:max-h-[calc(100dvh-108px)] max-lg:flex-col max-lg:items-stretch max-lg:gap-0.5 max-lg:overflow-y-auto max-lg:rounded-[20px] max-lg:border max-lg:border-accent/15 max-lg:bg-ink-2/97 max-lg:p-3.5 max-lg:shadow-[0_30px_60px_-22px_rgb(13_27_42/0.17)] max-lg:backdrop-blur-xl max-lg:transition-all max-lg:duration-300 ${
            open
              ? "max-lg:visible max-lg:translate-y-0 max-lg:opacity-100"
              : "max-lg:invisible max-lg:-translate-y-3 max-lg:opacity-0"
          }`}
        >
          {LINKS.map((l) => {
            const current = isCurrentGroup(l);
            const linkClass =
              "rounded-full px-3 py-2.5 text-[14.5px] font-medium text-fog transition-colors duration-200 hover:bg-tint hover:text-head max-lg:px-4 max-lg:py-3 max-lg:text-[15px]";

            if (!l.items) {
              return (
                <Link
                  key={l.label}
                  href={l.href!}
                  onClick={closeAll}
                  aria-current={current ? "page" : undefined}
                  className={linkClass}
                >
                  {l.label}
                </Link>
              );
            }

            const isOpen = menu === l.label;
            // past four entries the panel flows into equal columns rather
            // than growing into a tall list that has to scroll
            const wide = (l.items?.length ?? 0) > 4;

            return (
              <div
                key={l.label}
                className="relative max-lg:w-full"
                onMouseEnter={
                  hoverable ? () => setMenu(l.label) : undefined
                }
                onMouseLeave={
                  hoverable
                    ? () => setMenu((m) => (m === l.label ? null : m))
                    : undefined
                }
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={() => setMenu((m) => (m === l.label ? null : l.label))}
                  className={`${linkClass} inline-flex w-full cursor-pointer items-center gap-1.5 ${
                    isOpen ? "bg-tint text-head" : ""
                  }`}
                >
                  {l.label}
                  <svg
                    viewBox="0 0 12 8"
                    width="10"
                    height="7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className={`transition-transform duration-250 max-lg:ml-auto ${isOpen ? "rotate-180" : ""}`}
                  >
                    <path d="M1 1.5 6 6.5l5-5" />
                  </svg>
                </button>

                <div
                  className={`absolute top-full pt-2.5 transition-all duration-250 max-lg:static max-lg:w-full max-lg:translate-x-0 max-lg:pt-0 ${
                    wide
                      ? "left-1/2 w-[45rem] max-w-[calc(100vw-2rem)] -translate-x-1/2 max-xl:w-[31rem] max-lg:left-0 max-lg:w-full"
                      : "left-0 w-56"
                  } ${
                    isOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-1.5 opacity-0 max-lg:hidden"
                  }`}
                >
                  <ul
                    className={`grid max-h-[min(26rem,calc(100dvh-7rem))] gap-0.5 overflow-y-auto overscroll-contain rounded-[18px] border border-hair bg-ink-2 p-2 shadow-[0_28px_58px_-24px_rgb(13_27_42/0.14)] max-lg:max-h-none max-lg:grid-flow-row max-lg:grid-rows-none max-lg:overflow-visible max-lg:border-transparent max-lg:bg-transparent max-lg:p-1 max-lg:shadow-none ${
                      wide
                        ? /* fill down each column, and auto-cols-fr keeps every
                             column the same width so the block stays even */
                          "auto-cols-fr grid-flow-col grid-rows-4 max-xl:grid-rows-6"
                        : ""
                    }`}
                  >
                    {l.items.map((it) => (
                      <li key={it.label}>
                        <Link
                          href={it.href}
                          onClick={closeAll}
                          className="block rounded-xl px-3.5 py-2.5 text-[14px] font-medium text-fog transition-colors duration-200 hover:bg-tint hover:text-accent"
                        >
                          {it.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}

          {/* everything the bar sheds on small screens lands here */}
          <div className="hidden border-t border-hair pt-3 max-lg:mt-2 max-lg:block">
            <div className="mt-2 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => openAuth("signin")}
              >
                Login
              </Button>
              <Button
                variant="contrast"
                size="sm"
                className="flex-1"
                onClick={() => openAuth("signup")}
              >
                Sign Up
              </Button>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-hair pt-3">
              <span className="pl-1 text-[13.5px] text-fog">Appearance</span>
              <ThemeToggle />
            </div>
          </div>
        </nav>

        {/* On phones the bar carries the logo and the menu button and nothing
            else — the theme toggle and the auth pair live in the
            drawer, where they get room to breathe. */}
        <div className="ml-3 flex items-center gap-2 max-lg:ml-auto max-lg:mr-1">
          <ThemeToggle className="max-lg:hidden" />
          <Button
            variant="outline"
            size="sm"
            className="max-lg:hidden"
            onClick={() => openAuth("signin")}
          >
            Login
          </Button>
          <Button
            variant="contrast"
            size="sm"
            className="max-lg:hidden"
            onClick={() => openAuth("signup")}
          >
            Sign Up
          </Button>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="hidden size-10.5 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl max-lg:flex"
        >
          <span
            className={`block h-0.5 w-4 rounded-sm bg-accent transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-4 rounded-sm bg-accent transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-4 rounded-sm bg-accent transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      <AuthModal
        mode={auth}
        logo={<Logo />}
        onMode={setAuth}
        onClose={() => setAuth(null)}
      />
    </header>
  );
}
