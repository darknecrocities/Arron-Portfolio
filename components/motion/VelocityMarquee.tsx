"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

interface RowProps {
  items: string[];
  /** Percent of one copy moved per second. Negative = leftward. */
  baseVelocity: number;
  outlined?: boolean;
}

function MarqueeRow({ items, baseVelocity, outlined = false }: RowProps) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const skewX = useTransform(smoothVelocity, [-2500, 2500], [10, -10]);
  const direction = useRef(1);

  // Content is rendered 4x, so wrapping between -25% and 0% loops seamlessly.
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) direction.current = -1;
    else if (vf > 0) direction.current = 1;
    moveBy += direction.current * moveBy * vf;
    baseX.set(baseX.get() + moveBy);
  });

  const copy = (
    <span className="flex shrink-0 items-center">
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span
            className={`px-6 sm:px-8 ${outlined ? "text-transparent" : "text-white"}`}
            style={outlined ? { WebkitTextStroke: "1px rgba(255,255,255,0.45)" } : undefined}
          >
            {item}
          </span>
          <span className="h-2 w-2 bg-white/50 rotate-45" />
        </span>
      ))}
    </span>
  );

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="flex w-max font-black uppercase tracking-tight text-3xl sm:text-5xl lg:text-6xl leading-none py-2"
        style={{ x, skewX }}
      >
        {copy}
        {copy}
        {copy}
        {copy}
      </motion.div>
    </div>
  );
}

const ROW_A = ["Computer Vision", "Local AI", "Machine Learning", "Flutter", "Next.js", "Python"];
const ROW_B = ["TypeScript", "PyTorch", "React", "Reinforcement Learning", "Supabase", "UI / UX"];

/**
 * Two skill rows that drift in opposite directions. Scrolling speeds them up,
 * skews them with your scroll velocity, and flips their direction when you scroll up.
 */
export default function VelocityMarquee() {
  return (
    <section aria-label="Core skills" className="relative z-10 py-10 sm:py-14 border-y border-white/10 overflow-hidden">
      <p className="sr-only">Core skills: {[...ROW_A, ...ROW_B].join(", ")}.</p>
      <div aria-hidden="true" className="space-y-2 select-none">
        <MarqueeRow items={ROW_A} baseVelocity={-2} />
        <MarqueeRow items={ROW_B} baseVelocity={2} outlined />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-black to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-black to-transparent" />
    </section>
  );
}
