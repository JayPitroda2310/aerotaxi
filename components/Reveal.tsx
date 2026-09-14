"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
};

/** Fades + lifts children into view once, when they scroll into the viewport. */
export default function Reveal({
  delay = 0,
  y = 26,
  children,
  ...rest
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.9, 0.24, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
