"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { TESTIMONIALS } from "@/data/misc";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const PAGE_SIZE = 3;
  const totalPages = Math.ceil(TESTIMONIALS.length / PAGE_SIZE);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((i) => (i + 1) % totalPages);
    }, 5000);
    return () => clearInterval(timer);
  }, [totalPages]);

  const goNext = () => {
    setDirection(1);
    setCurrentIndex((i) => (i + 1) % totalPages);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrentIndex((i) => (i - 1 + totalPages) % totalPages);
  };

  const pageItems = TESTIMONIALS.slice(currentIndex * PAGE_SIZE, currentIndex * PAGE_SIZE + PAGE_SIZE);

  return (
    <section ref={ref} className="section-base relative z-10">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-crimson-400" />
            <span className="text-crimson-200 text-xs font-bold uppercase tracking-[0.2em]">Testimonials</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>
          <h2 className="text-headline text-white font-black">What People Say</h2>
          <p className="text-silver-400 text-sm mt-2">Colleagues, clients, and mentors share their experience working with Arron.</p>
        </motion.div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: direction * 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -direction * 60, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {pageItems.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass border border-white/5 rounded-lg p-5 relative"
                >
                  {/* Quote mark */}
                  <div
                    className="absolute top-4 right-4 text-5xl font-black leading-none"
                    style={{ color: "rgba(160,0,0,0.2)" }}
                    aria-hidden="true"
                  >
                    &ldquo;
                  </div>

                  <p className="text-silver-400 text-sm leading-relaxed relative z-10">&ldquo;{t.text}&rdquo;</p>

                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden border border-crimson-600/30 flex-shrink-0">
                      <Image src={t.avatar} alt={t.name} fill sizes="36px" className="object-cover" />
                    </div>
                    <div>
                      <p className="text-silver-200 text-sm font-semibold">{t.name}</p>
                      <p className="text-silver-600 text-xs">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={goPrev}
            className="w-9 h-9 border border-white/10 rounded-sm flex items-center justify-center text-silver-500 hover:text-crimson-200 hover:border-crimson-600/40 transition-all"
            aria-label="Previous testimonials"
          >
            <FiChevronLeft size={16} />
          </button>
          <div className="flex gap-1.5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "w-6 bg-crimson-400" : "w-1.5 bg-white/20"
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={goNext}
            className="w-9 h-9 border border-white/10 rounded-sm flex items-center justify-center text-silver-500 hover:text-crimson-200 hover:border-crimson-600/40 transition-all"
            aria-label="Next testimonials"
          >
            <FiChevronRight size={16} />
          </button>
        </div>
        <p className="text-center text-silver-600 text-xs mt-3">
          {currentIndex * PAGE_SIZE + 1}–{Math.min((currentIndex + 1) * PAGE_SIZE, TESTIMONIALS.length)} of {TESTIMONIALS.length} testimonials
        </p>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
