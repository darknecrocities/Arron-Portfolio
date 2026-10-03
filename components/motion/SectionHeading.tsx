"use client";

import { motion, type Variants } from "framer-motion";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

const rule: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, ease: EASE_OUT } },
};

const word: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.75, ease: EASE_OUT } },
};

interface SectionHeadingProps {
  eyebrow: string;
  title: string | React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Shared section header. The title rises word-by-word from behind a mask,
 * a short rule draws in next to the eyebrow, and the description fades up.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`mb-12 ${centered ? "text-center max-w-2xl mx-auto" : ""} ${className}`}
    >
      <motion.div
        variants={fadeUp}
        className={`flex items-center gap-3 font-mono text-xs text-zinc-400 uppercase tracking-widest mb-3 ${
          centered ? "justify-center" : ""
        }`}
      >
        <motion.span variants={rule} className="h-px w-8 bg-white/40 origin-left" aria-hidden="true" />
        <span>{eyebrow}</span>
      </motion.div>

      <h2
        className="text-headline text-white font-black"
        aria-label={typeof title === "string" ? title : undefined}
      >
        {typeof title === "string" ? (
          title.split(" ").map((w, i) => (
            <span
              key={`${w}-${i}`}
              className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em] mr-[0.22em] last:mr-0"
              aria-hidden="true"
            >
              <motion.span variants={word} className="inline-block">
                {w}
              </motion.span>
            </span>
          ))
        ) : (
          title
        )}
      </h2>

      {description && (
        <motion.p
          variants={fadeUp}
          className={`text-zinc-400 text-sm sm:text-base mt-3 max-w-xl font-sans ${centered ? "mx-auto" : ""}`}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
