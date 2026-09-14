"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Holds the hero copy still while the rest of the page scrolls up over it.
 *
 * On a phone the hero stacks: copy first, aircraft below it. The copy is
 * pinned with position:sticky — that part is plain CSS, applied through
 * className so it can be scoped to the stacked layout — and everything from
 * the aircraft down scrolls over the top of it.
 *
 * What this component adds is the fade. The aircraft is a PNG with a
 * transparent surround, so without one the pinned copy would read straight
 * through it. Painting an opaque backdrop on the aircraft instead would solve
 * the same problem, but it would also lay a flat rectangle over the hero's
 * ambient glow, so the copy fades as it is covered.
 *
 * The fade is driven off the page scroll rather than off this element's own
 * position, which is the part worth knowing: once the element is pinned it no
 * longer moves relative to the viewport, so a useScroll keyed to it would
 * freeze at whatever progress it had when it stuck. Page scroll keeps
 * advancing. The distance is this block's own height, measured rather than
 * guessed, so the copy has faded out about when the aircraft has swept up
 * across it.
 *
 * Wide layouts are left alone — there the two sit side by side, so nothing
 * passes over anything — as is a reduced-motion preference. Neither applies
 * any style, and the media match starts false so the server render and the
 * first client render agree.
 */
export default function HeroRecede({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [stacked, setStacked] = useState(false);
  const [range, setRange] = useState(1);

  useEffect(() => {
    // lg — the breakpoint the hero stops stacking at
    const mq = window.matchMedia("(max-width: 63.9375rem)");
    const sync = () => setStacked(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setRange(Math.max(el.offsetHeight, 1));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollY } = useScroll();

  // solid for the first stretch, so it reads as held rather than as already
  // going, then out across the remainder
  const opacity = useTransform(scrollY, [0, range * 0.18, range], [1, 1, 0]);
  const pointerEvents = useTransform(opacity, (v) =>
    v < 0.08 ? ("none" as const) : ("auto" as const),
  );

  const active = stacked && !reduced;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={active ? { opacity, pointerEvents } : undefined}
    >
      {children}
    </motion.div>
  );
}
