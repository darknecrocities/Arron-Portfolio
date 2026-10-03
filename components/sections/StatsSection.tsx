"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { STATS } from "@/data/misc";

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative z-10 py-12 border-y border-white/10 bg-[#060606]">
      <div className="container-site">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/5">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="text-left md:text-center pt-4 md:pt-0 px-2"
            >
              <div className="font-mono text-2xl sm:text-3xl font-black text-white tracking-tight flex items-baseline md:justify-center gap-0.5">
                {stat.prefix && <span className="text-zinc-500 text-lg">{stat.prefix}</span>}
                {inView ? (
                  <CountUp
                    end={stat.value}
                    duration={2}
                    delay={i * 0.05}
                  />
                ) : (
                  <span>0</span>
                )}
                {stat.suffix && <span className="text-zinc-400 text-base">{stat.suffix}</span>}
              </div>
              <div className="font-mono text-xs font-semibold text-zinc-200 mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
              <div className="text-[11px] text-zinc-500 mt-0.5 font-sans leading-tight">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
