"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ACHIEVEMENTS } from "@/data/achievements";
import { FiExternalLink, FiX } from "react-icons/fi";
import SectionHeading from "@/components/motion/SectionHeading";

export default function AchievementsSection() {
  const [selected, setSelected] = useState<typeof ACHIEVEMENTS[0] | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedAchievements = showAll ? ACHIEVEMENTS : ACHIEVEMENTS.slice(0, 6);

  // Group achievements into 3 distinct stages for desktop column cascade
  const col1 = displayedAchievements.filter((_, i) => i % 3 === 0);
  const col2 = displayedAchievements.filter((_, i) => i % 3 === 1);
  const col3 = displayedAchievements.filter((_, i) => i % 3 === 2);

  const STAGES = [
    { label: "Stage I · National Honors", items: col1, delay: 0.05, isCenter: false },
    { label: "Stage II · Championship Podium", items: col2, delay: 0.20, isCenter: true },
    { label: "Stage III · Academic & Industry Merit", items: col3, delay: 0.35, isCenter: false },
  ];

  const renderCard = (achievement: typeof ACHIEVEMENTS[0], keyPrefix: string) => (
    <motion.div
      key={`${keyPrefix}-${achievement.id}`}
      layout
      whileHover={{ y: -5, scale: 1.015 }}
      transition={{ duration: 0.25 }}
      className="trophy-card cursor-pointer group flex flex-col justify-between rounded-xl border border-white/10 bg-[#0d0d10]/90 backdrop-blur-md hover:border-white/35 hover:shadow-[0_12px_36px_rgba(255,255,255,0.06)] transition-all overflow-hidden"
      onClick={() => setSelected(achievement)}
      role="button"
      aria-label={`View ${achievement.title} details`}
    >
      <div>
        {/* Image if available */}
        {achievement.image && (
          <div className="relative h-36 overflow-hidden border-b border-white/10 grayscale contrast-110 group-hover:contrast-125 transition-all">
            <Image
              src={achievement.image}
              alt={achievement.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>
        )}

        <div className="p-5">
          {/* Header line */}
          <div className="flex items-center justify-between gap-2 mb-2 font-mono">
            <span className="text-[10px] font-bold uppercase tracking-widest text-black bg-white px-2 py-0.5 rounded-none">
              {achievement.type}
            </span>
            <span className="text-[10px] text-zinc-500">{achievement.date}</span>
          </div>

          <h3 className="text-white text-sm sm:text-base font-bold font-sans leading-tight mt-1 line-clamp-2 group-hover:text-zinc-200">
            {achievement.title}
          </h3>

          <p className="text-zinc-500 text-xs mt-2 font-mono">{achievement.issuer}</p>

          <p className="text-zinc-400 text-xs leading-relaxed mt-2 line-clamp-2">
            {achievement.description}
          </p>
        </div>
      </div>

      <div className="px-5 pb-4 pt-2 border-t border-white/5 flex items-center justify-between font-mono text-[11px]">
        <span className="text-zinc-500">Details</span>
        <span className="text-white font-semibold group-hover:translate-x-1 transition-transform">
          View →
        </span>
      </div>
    </motion.div>
  );

  return (
    <section id="achievements" className="section-base relative z-10">
      <div className="container-site relative z-10">
        <SectionHeading
          eyebrow="Honors & Awards"
          title="Championship Wall"
          description="National championships, hackathon victories, and academic distinction across competitive arenas."
        />

        {/* ===================================================================
            DESKTOP: STAGED 3-COLUMN CASCADE REVEAL (FADES & GLIDES IN BY COLUMN)
            =================================================================== */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-5 items-start">
          {STAGES.map((stage) => (
            <motion.div
              key={stage.label}
              initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.75,
                delay: stage.delay,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`flex flex-col gap-4 relative ${
                stage.isCenter ? "lg:-translate-y-2" : ""
              }`}
            >
              {/* Subtle ambient podium glow for center stage */}
              {stage.isCenter && (
                <div className="pointer-events-none absolute -inset-3 rounded-2xl bg-white/[0.025] blur-2xl -z-10" />
              )}

              {/* Stage Header Indicator */}
              <div className="flex items-center gap-2 px-1 mb-1 font-mono text-[10px] text-zinc-400 uppercase tracking-widest border-b border-white/10 pb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>{stage.label}</span>
              </div>

              {/* Column Cards */}
              <AnimatePresence mode="popLayout">
                {stage.items.map((achievement) => renderCard(achievement, "desktop"))}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* ===================================================================
            MOBILE & TABLET: RESPONSIVE STAGGERED GRID REVEAL
            =================================================================== */}
        <div className="grid sm:grid-cols-2 lg:hidden gap-4">
          <AnimatePresence mode="popLayout">
            {displayedAchievements.map((achievement, i) => (
              <motion.div
                key={`mobile-${achievement.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                {renderCard(achievement, "mobile")}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show all toggle */}
        {ACHIEVEMENTS.length > 6 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-secondary w-full sm:w-auto px-10 justify-center text-xs"
            >
              {showAll ? "Show Less" : "View All Awards"}
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="modal-box bg-[#0a0a0a] border border-white/20 p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {selected.image && (
                <div className="relative h-44 sm:h-52 overflow-hidden border border-white/10 grayscale contrast-110 mb-4">
                  <Image
                    src={selected.image}
                    alt={selected.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 600px"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex items-start justify-between gap-4 pb-3 border-b border-white/10 font-mono">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black bg-white px-2 py-0.5">
                    {selected.type}
                  </span>
                  <h3 className="text-white font-bold text-lg font-sans mt-2">{selected.title}</h3>
                  <p className="text-zinc-400 text-xs mt-1">
                    {selected.issuer} · {selected.date}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-zinc-500 hover:text-white p-1 border border-white/10 hover:border-white transition-colors"
                  aria-label="Close"
                >
                  <FiX size={18} />
                </button>
              </div>

              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mt-4 font-sans">
                {selected.description}
              </p>

              {selected.link && (
                <div className="mt-6 pt-4 border-t border-white/10">
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs inline-flex items-center gap-2"
                  >
                    <FiExternalLink size={13} />
                    <span>View Article</span>
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="section-divider mt-20" />
    </section>
  );
}
