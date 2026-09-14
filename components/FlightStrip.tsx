"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import planeSide from "@/public/plane-side.png";

/* The artwork is aircraft plus trailing banner, and the aircraft is only the
   first 65% of it — so the element runs wider than a plane-only image would,
   to keep the aircraft itself reading at a useful size. */
const WIDTH = "min(52vw,600px)";

/**
 * A full-bleed band the aircraft crosses as the section passes the viewport.
 *
 * The band hugs the artwork: the section is only as tall as the aeroplane plus
 * a little breathing room, so nothing empty sits above or below it.
 *
 * Travel is locked straight to scroll position — no spring, no easing, no
 * timer. Both widths are measured, so the aircraft covers exactly
 * viewportWidth + elementWidth across exactly the stretch of scrolling the
 * band is in view: it enters as the band appears and clears as the band
 * leaves, with no wasted travel at either end. Movement is therefore directly
 * proportional to scroll — stop and it stops dead, scroll back and it flies
 * backwards at the same rate.
 */
export default function FlightStrip() {
  const ref = useRef<HTMLElement>(null);
  const plane = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [dim, setDim] = useState({ vw: 0, ew: 0 });

  // measure both widths, so the travel is exact rather than a vw approximation
  useEffect(() => {
    const measure = () => {
      const ew = plane.current?.offsetWidth ?? 0;
      const vw = window.innerWidth;
      // bail out when nothing moved, or the observer below would loop
      setDim((d) => (d.vw === vw && d.ew === ew ? d : { vw, ew }));
    };
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (plane.current) ro.observe(plane.current);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  // 0 as the band enters the bottom of the viewport, 1 as it leaves the top
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // straight off the scroll value — no spring, so there is no lag to fall out
  // of step with, and the two move as one
  const x = useTransform(scrollYProgress, [0, 1], [dim.vw, -dim.ew]);
  // a shallow rise and settle, and the bank that goes with it
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [10, -8, 10]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [1.4, -0.9, 1.2]);

  const ready = dim.ew > 0;

  return (
    <section
      ref={ref}
      aria-hidden
      className="relative overflow-hidden py-12 max-md:py-8"
    >
      <div className="relative w-full">
        <motion.div
          ref={plane}
          style={
            reduced
              ? { width: WIDTH, marginInline: "auto" }
              : /* held back for the one frame before the measurement lands,
                   so it cannot flash at the wrong position */
                { width: WIDTH, x, y, rotate, opacity: ready ? 1 : 0 }
          }
        >
          <Image
            src={planeSide}
            alt=""
            sizes="(max-width: 1150px) 52vw, 600px"
            className="h-auto w-full drop-shadow-[0_26px_44px_rgb(13_27_42/0.10)]"
          />
        </motion.div>
      </div>
    </section>
  );
}
