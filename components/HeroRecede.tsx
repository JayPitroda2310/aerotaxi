"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Lets the hero copy fall away under the aircraft as the page scrolls.
 *
 * On a phone the hero stacks: copy first, aircraft below it. Scrolling
 * drifts the copy downwards at less than scroll speed and fades it out, so
 * the aircraft — which moves at full speed and paints above — rises over the
 * top of it rather than simply following it up the page.
 *
 * It wraps Reveal rather than being folded into it: Reveal owns y and opacity
 * for its entrance, and two things writing the same transform would fight.
 * This is the outer element and the grid item; Reveal sits inside it.
 *
 * Wide layouts are left alone — there the two sit side by side, so there is
 * nothing to pass over — as is a reduced-motion preference. Neither applies
 * any style at all, and the server render matches the first client render
 * because the match starts false.
 */
export default function HeroRecede({
  children,
  className,
  shift = 92,
}: {
  children: ReactNode;
  className?: string;
  /** how far the copy drifts down, in px, across its own height of scrolling */
  shift?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [stacked, setStacked] = useState(false);

  useEffect(() => {
    // lg — the breakpoint the hero grid itself collapses at
    const mq = window.matchMedia("(max-width: 63.9375rem)");
    const sync = () => setStacked(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // 0 while the block sits below the top of the viewport, 1 once it has
  // travelled its own height past it
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, shift]);
  // Runs the whole travel rather than finishing early. An opaque backdrop on
  // the aircraft would occlude the copy outright and make a fade unnecessary,
  // but it would also paint a flat rectangle over the hero's ambient glow —
  // so the copy has to actually fade, and it should not hit zero while the
  // call-to-action row is still sitting in the middle of the screen.
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  // once it has faded there is nothing to tap, and the links underneath it
  // should not answer either
  const pointerEvents = useTransform(opacity, (v) =>
    v < 0.08 ? ("none" as const) : ("auto" as const),
  );

  const active = stacked && !reduced;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={active ? { y, opacity, pointerEvents } : undefined}
    >
      {children}
    </motion.div>
  );
}
