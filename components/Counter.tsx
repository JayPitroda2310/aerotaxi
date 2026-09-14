"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

/** Counts up from 0 to `to` the first time it scrolls into view. */
export default function Counter({
  to,
  suffix = "",
  className = "",
}: {
  to: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return;

    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 0.9, 0.24, 1],
      onUpdate: (v) => {
        node.textContent = Math.round(v).toLocaleString("en-US") + suffix;
      },
    });

    return () => controls.stop();
  }, [inView, to, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
