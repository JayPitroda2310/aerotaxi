import Link from "next/link";
import { PLANE_PATH } from "./network";
import type { ComponentProps, ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Button                                                              */
/* ------------------------------------------------------------------ */

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full border border-transparent " +
  "font-semibold tracking-tight whitespace-nowrap cursor-pointer leading-none " +
  "transition-[transform,background,border-color,box-shadow,color] duration-250 " +
  "active:translate-y-px active:scale-[0.985] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants = {
  solid:
    /* Flat fill, no box-shadow at all. The cast shadow underneath read as
       a glow, and the inset highlight drew a hard seam along the top edge. */
    "bg-accent text-[#0d1b2a] font-bold " +
    "hover:-translate-y-0.5 hover:brightness-95",
  line:
    "border-accent/35 text-accent bg-accent/5 " +
    "hover:bg-accent/15 hover:border-accent hover:-translate-y-0.5",
  ghost: "text-fog hover:text-accent",
  outline:
    "border-hair text-head bg-transparent " +
    "hover:border-head/45 hover:bg-tint hover:-translate-y-0.5",
  contrast:
    "bg-head text-ink " +
    "shadow-[0_10px_26px_-12px_rgb(13_27_42/0.10)] " +
    "hover:-translate-y-0.5 hover:opacity-90",
} as const;

/* With leading-none above, these land at roughly 36 / 41 / 45px tall. */
const sizes = {
  sm: "px-4 py-2.5 text-[13.5px]",
  md: "px-5 py-3 text-[14.5px]",
  lg: "px-6.5 py-3.5 text-[15px]",
} as const;

/** The button's class string, so a client-side anchor can wear the same look. */
export function buttonClass(
  variant: keyof typeof variants = "solid",
  size: keyof typeof sizes = "md",
  className = "",
) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

type ButtonProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "solid",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps & Omit<ComponentProps<"button">, "children">) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "solid",
  size = "md",
  className = "",
  children,
  href,
  ...rest
}: ButtonProps & ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}



/* ------------------------------------------------------------------ */
/* Section heading                                                     */
/* ------------------------------------------------------------------ */

/**
 * Wraps an eyebrow label. The rule beneath the words is a contrail rather than
 * a plain underline: it fades up from nothing at the left and reaches full
 * strength at the right, where the aircraft's tail meets it.
 */
export function EyebrowLine({ children }: { children: ReactNode }) {
  return (
    /*
     * Two things here are easy to get wrong.
     *
     * The trail fades in over a fixed 60px rather than across the label. A
     * percentage fade stretches with the text, so a long eyebrow washed out to
     * almost nothing while a short one looked solid — the same rule appearing
     * to have two different weights on one page.
     *
     * The label carries leading-none so its line box equals the font size —
     * a fractional box lands the 1px rule on a half pixel, where the browser
     * antialiases it across two rows and it reads thinner than the same rule
     * elsewhere on the page.
     *
     * The aircraft is positioned against the rule, not laid out beside it.
     * Its box matches the artwork's 28:18 aspect so nothing is letterboxed,
     * and it is pulled down half its height less half the rule's, which puts
     * its centre on the rule's centre rather than on the padding edge.
     */
    <span className="relative inline-block pr-[15px] pb-1.5 leading-none">
      {children}
      <span
        aria-hidden
        className="absolute right-4 bottom-0 left-0 h-px bg-[linear-gradient(to_right,transparent,var(--color-accent)_60px)]"
      />
      <svg
        viewBox="-14 -9 28 18"
        aria-hidden="true"
        className="absolute right-0 bottom-0 h-[9px] w-3.5 translate-y-[calc(50%-0.5px)] fill-accent"
      >
        <path d={PLANE_PATH} />
      </svg>
    </span>
  );
}

export function Eyebrow({
  children,
  centered = false,
}: {
  children: ReactNode;
  centered?: boolean;
}) {
  return (
    <span
      className="mb-3.5 inline-block text-[11px] leading-none font-semibold tracking-[0.22em] text-accent uppercase"
    >
      <EyebrowLine>{children}</EyebrowLine>
    </span>
  );
}

/** Wraps a phrase in the accent accent used throughout the headings. */
export function Hl({ children }: { children: ReactNode }) {
  return <span className="text-accent">{children}</span>;
}
