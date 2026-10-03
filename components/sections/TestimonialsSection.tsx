"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS_COLUMNS, Testimonial } from "@/data/misc";
import SectionHeading from "@/components/motion/SectionHeading";

const FLIP_WORDS = ["Mentors", "Teammates", "Collaborators", "Developers", "Peers"];

function FlippingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % FLIP_WORDS.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="inline-flex items-center justify-center relative overflow-hidden align-baseline border-b-2 sm:border-b-4 border-white px-2 sm:px-4 mx-1 sm:mx-2 min-w-[5.5ch] sm:min-w-[6.5ch] h-[1.18em] bg-white/5">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={FLIP_WORDS[index]}
          initial={{ y: "100%", opacity: 0, rotateX: -60 }}
          animate={{ y: "0%", opacity: 1, rotateX: 0 }}
          exit={{ y: "-100%", opacity: 0, rotateX: 60 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block text-white font-black"
        >
          {FLIP_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div className="bg-[#0c0c0c] border border-white/10 p-5 rounded-sm hover:border-white/30 transition-colors select-none flex flex-col justify-between">
      <div>
        {/* Highlight Tag */}
        <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2.5">
          {item.highlight}
        </div>

        {/* Quote text */}
        <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans mb-4">
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>

      {/* Author & Role (No fake company) */}
      <div className="flex items-center gap-3 pt-3 border-t border-white/10">
        <div className="w-8 h-8 rounded-full bg-white text-black font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
          {item.initials}
        </div>
        <div className="min-w-0">
          <div className="text-white font-semibold text-xs sm:text-sm truncate">
            {item.author}
          </div>
          <div className="text-zinc-400 text-[11px] truncate font-mono">
            {item.role}
          </div>
        </div>
      </div>
    </div>
  );
}

function MarqueeColumn({
  items,
  reverse = false,
  duration = 32,
  className = "",
}: {
  items: Testimonial[];
  reverse?: boolean;
  duration?: number;
  className?: string;
}) {
  // Loop array 3 times for seamless non-stop continuous cycling
  const looped = [...items, ...items, ...items];

  return (
    <div className={`relative overflow-hidden h-full ${className}`}>
      <motion.div
        className="flex flex-col gap-4 py-2"
        initial={{ y: reverse ? "-33.333%" : "0%" }}
        animate={{ y: reverse ? "0%" : "-33.333%" }}
        transition={{
          y: {
            duration,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          },
        }}
      >
        {looped.map((item, idx) => (
          <TestimonialCard key={`${item.id}-${idx}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

export default function TestimonialsSection() {
  const columnConfigs = [
    { reverse: false, duration: 32, className: "block" },
    { reverse: true, duration: 36, className: "hidden sm:block" },
    { reverse: false, duration: 28, className: "hidden lg:block" },
    { reverse: true, duration: 34, className: "hidden lg:block" },
  ];

  return (
    <section id="testimonials" className="section-base relative z-10 overflow-hidden py-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="Endorsements & Testimonies"
          title={
            <span className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              <span>What</span>
              <FlippingWord />
              <span>Say</span>
            </span>
          }
          description="Perspectives from faculty mentors, hackathon teammates, and student developers."
          align="center"
        />

        {/* 4-Column Infinite Vertical Marquee Container */}
        <div className="relative h-[620px] sm:h-[680px] overflow-hidden border-y border-white/10 my-4">
          {/* Top and Bottom Gradient Fade for smooth infinite effect */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black via-black/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />

          {/* 4 Columns Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 h-full">
            {TESTIMONIALS_COLUMNS.map((column, colIdx) => {
              const cfg = columnConfigs[colIdx % columnConfigs.length];
              return (
                <MarqueeColumn
                  key={colIdx}
                  items={column}
                  reverse={cfg.reverse}
                  duration={cfg.duration}
                  className={cfg.className}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
