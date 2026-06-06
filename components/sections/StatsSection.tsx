"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { STATS } from "@/data/misc";

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative z-10 py-16">
      <div className="container-site">
        <div className="glass border border-white/5 rounded-xl p-8 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 opacity-30" style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(160,0,0,0.3) 0%, transparent 70%)",
          }} />

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center group"
              >
                <div className="text-3xl md:text-4xl font-black text-white tabular-nums glow-text-red leading-none">
                  {stat.prefix && <span className="text-crimson-200">{stat.prefix}</span>}
                  {inView ? (
                    <CountUp
                      end={stat.value}
                      duration={2}
                      delay={i * 0.1}
                    />
                  ) : (
                    0
                  )}
                  {stat.suffix && <span className="text-crimson-200">{stat.suffix}</span>}
                </div>
                <div className="text-silver-300 text-sm font-semibold mt-1">{stat.label}</div>
                <div className="text-silver-600 text-xs mt-0.5">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
