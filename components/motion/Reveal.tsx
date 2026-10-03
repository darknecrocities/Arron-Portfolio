"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "./SectionHeading";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/** Fades, rises and sharpens its content the first time it scrolls into view. */
export default function Reveal({ children, delay = 0, y = 24, className = "" }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}
