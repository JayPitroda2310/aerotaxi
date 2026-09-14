"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Shared field chrome                                                 */
/* ------------------------------------------------------------------ */

export const fieldCls =
  "block min-w-0 rounded-xl border border-hair bg-tint px-3.5 py-2 transition-colors duration-200";

export const labelCls =
  "mb-0.5 block text-[10px] leading-[13px] font-semibold tracking-[0.09em] text-fog-2 uppercase";

export const valueCls =
  "block h-[22px] w-full min-w-0 truncate text-[14px] font-semibold tracking-tight";

export function Field({
  label,
  children,
  muted = false,
}: {
  label: string;
  children: ReactNode;
  muted?: boolean;
}) {
  return (
    <label
      className={`${fieldCls} focus-within:border-accent/60 focus-within:bg-accent/6 ${
        muted ? "opacity-50" : "hover:border-accent/30"
      }`}
    >
      <span className={labelCls}>{label}</span>
      {children}
    </label>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 8"
      width="10"
      height="7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      className={`shrink-0 text-accent transition-transform duration-250 ${
        open ? "rotate-180" : ""
      }`}
    >
      <path d="M1 1l5 5 5-5" />
    </svg>
  );
}

/** Closes the panel on outside pointer-down or Escape. */
function useDismiss(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);
  return ref;
}

const panelCls =
  "absolute top-[calc(100%+8px)] z-30 rounded-2xl border border-hair bg-panel-2 p-2 shadow-[0_26px_58px_-22px_rgb(13_27_42/0.17)]";

/* ------------------------------------------------------------------ */
/* Airport list                                                        */
/* ------------------------------------------------------------------ */

/**
 * Replaces a native <select>. The browser renders a native option list with
 * OS colours that no CSS can reach, so the list is drawn here instead.
 */
export function AirportSelect({
  label,
  value,
  options,
  onChange,
  align = "left",
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useDismiss(open, () => setOpen(false));
  const listRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setActive(Math.max(0, options.indexOf(value)));
    setOpen((o) => !o);
  };

  useEffect(() => {
    if (open) listRef.current?.focus();
  }, [open]);

  const choose = (v: string) => {
    onChange(v);
    setOpen(false);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setActive(
        (a) =>
          (a + (e.key === "ArrowDown" ? 1 : options.length - 1)) %
          options.length,
      );
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(options[active]);
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`${fieldCls} w-full cursor-pointer text-left ${
          open ? "border-accent/60 bg-accent/6" : "hover:border-accent/30"
        }`}
      >
        <span className={labelCls}>{label}</span>
        <span className="flex items-center gap-2">
          <span className={valueCls}>{value}</span>
          <Chevron open={open} />
        </span>
      </button>

      {open && (
        <div
          ref={listRef}
          role="listbox"
          aria-label={label}
          tabIndex={-1}
          onKeyDown={onKey}
          className={`${panelCls} w-[min(212px,calc(100vw-2.5rem))] outline-none ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {options.map((o, i) => {
            const on = o === value;
            return (
              <button
                key={o}
                type="button"
                role="option"
                aria-selected={on}
                onClick={() => choose(o)}
                onPointerEnter={() => setActive(i)}
                className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-[14px] font-semibold transition-colors duration-150 ${
                  on
                    ? "bg-accent/14 text-accent"
                    : i === active
                      ? "bg-tint text-head"
                      : "text-body"
                }`}
              >
                {o}
                {on && (
                  <svg
                    viewBox="0 0 14 14"
                    width="13"
                    height="13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M2 7.5l3.5 3.5L12 3.5" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Calendar                                                            */
/* ------------------------------------------------------------------ */

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DOW = ["S", "M", "T", "W", "T", "F", "S"];
const SHORT = MONTHS.map((m) => m.slice(0, 3));

/* parse/format by hand — new Date("2026-08-28") is UTC and can slip a day */
const parse = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const toISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
const pretty = (iso: string) => {
  const d = parse(iso);
  return `${d.getDate()} ${SHORT[d.getMonth()]} ${d.getFullYear()}`;
};
const monthIndex = (d: Date) => d.getFullYear() * 12 + d.getMonth();

/**
 * Replaces <input type="date">. The native picker's calendar is drawn by the
 * browser and ignores page styling, so the grid is rendered here instead.
 */
export function DateField({
  label,
  value,
  min,
  onChange,
  placeholder = "Select date",
  align = "left",
}: {
  label: string;
  value: string;
  min: string;
  onChange: (iso: string) => void;
  placeholder?: string;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const ref = useDismiss(open, () => setOpen(false));
  const floor = parse(min);
  const [view, setView] = useState(() => parse(value || min));

  useEffect(() => {
    if (open) setView(parse(value || min));
  }, [open, value, min]);

  const y = view.getFullYear();
  const m = view.getMonth();
  const lead = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();
  const canGoBack = monthIndex(view) > monthIndex(floor);

  const step = (by: number) => setView(new Date(y, m + by, 1));

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`${fieldCls} w-full cursor-pointer text-left ${
          open ? "border-accent/60 bg-accent/6" : "hover:border-accent/30"
        }`}
      >
        <span className={labelCls}>{label}</span>
        <span className="flex items-center gap-2">
          <span className={`${valueCls} ${value ? "" : "text-fog-2"}`}>
            {value ? pretty(value) : placeholder}
          </span>
          <svg
            viewBox="0 0 16 16"
            width="13"
            height="13"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            aria-hidden="true"
            className="shrink-0 text-accent"
          >
            <rect x="1.5" y="3" width="13" height="11.5" rx="2" />
            <path d="M1.5 6.5h13M5 1.5v3M11 1.5v3" />
          </svg>
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={label}
          className={`${panelCls} w-[min(272px,calc(100vw-2.5rem))] p-3 ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={!canGoBack}
              aria-label="Previous month"
              className="grid size-7 cursor-pointer place-items-center rounded-lg border border-hair text-[13px] text-head transition-colors duration-200 hover:border-accent/50 hover:text-accent disabled:cursor-not-allowed disabled:opacity-25"
            >
              ‹
            </button>
            <b className="font-display text-[13.5px] tracking-tight">
              {MONTHS[m]} {y}
            </b>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next month"
              className="grid size-7 cursor-pointer place-items-center rounded-lg border border-hair text-[13px] text-head transition-colors duration-200 hover:border-accent/50 hover:text-accent"
            >
              ›
            </button>
          </div>

          <div className="grid grid-cols-7 gap-0.5">
            {DOW.map((d, i) => (
              <span
                key={i}
                className="grid h-7 place-items-center text-[10.5px] font-bold text-fog-2"
              >
                {d}
              </span>
            ))}

            {Array.from({ length: lead }, (_, i) => (
              <span key={`lead-${i}`} />
            ))}

            {Array.from({ length: days }, (_, i) => {
              const date = new Date(y, m, i + 1);
              const iso = toISO(date);
              const off = date < floor;
              const on = iso === value;
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={off}
                  onClick={() => {
                    onChange(iso);
                    setOpen(false);
                  }}
                  className={`grid h-8 cursor-pointer place-items-center rounded-lg text-[12.5px] font-semibold tabular-nums transition-colors duration-150 disabled:cursor-not-allowed disabled:text-fog-2/35 ${
                    on
                      ? "bg-accent font-bold text-[#0d1b2a]"
                      : off
                        ? ""
                        : "text-body hover:bg-accent/14 hover:text-accent"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
