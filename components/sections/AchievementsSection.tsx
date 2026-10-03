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

  return (
    <section id="achievements" className="section-base relative z-10">
      <div className="container-site relative z-10">
        <SectionHeading
          eyebrow="Honors & Awards"
          title="Championship Wall"
          description="National championships, hackathon victories, and academic distinction across competitive arenas."
        />

        {/* Trophy Wall Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {displayedAchievements.map((achievement, i) => (
              <motion.div
                key={achievement.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ delay: i * 0.05 }}
                className="trophy-card cursor-pointer group flex flex-col justify-between"
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
                      <span className="text-[10px] font-bold uppercase tracking-widest text-black bg-white px-1.5 py-0.2">
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
