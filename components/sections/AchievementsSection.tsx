"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ACHIEVEMENTS } from "@/data/achievements";
import { FiAward, FiStar, FiGithub, FiExternalLink, FiX } from "react-icons/fi";

const TYPE_ICONS = {
  Champion: FiAward,
  Finalist: FiAward,
  Award: FiStar,
  Honor: FiStar,
  Contribution: FiGithub,
};

const TYPE_COLORS = {
  Champion: "#FFD700",
  Finalist: "#C0C0C0",
  Award: "#FFD700",
  Honor: "#C5A059",
  Contribution: "#FFFFFF",
};

export default function AchievementsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<typeof ACHIEVEMENTS[0] | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedAchievements = showAll ? ACHIEVEMENTS : ACHIEVEMENTS.slice(0, 6);

  return (
    <section id="achievements" ref={ref} className="section-base relative z-10">
      {/* Championship wall background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(120,0,0,0.5) 0%, transparent 60%)",
      }} />

      <div className="container-site relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-crimson-400" />
            <span className="text-crimson-200 text-xs font-bold uppercase tracking-[0.2em]">Achievements</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>
          <h2 className="text-headline text-white font-black">Championship Wall</h2>
          <p className="text-silver-400 text-sm mt-2 max-w-xl">
            6+ hackathon championships. National and global recognition. Built from pure execution.
          </p>
        </motion.div>

        {/* Trophy wall grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {displayedAchievements.map((achievement, i) => {
              const Icon = TYPE_ICONS[achievement.type];
              const iconColor = TYPE_COLORS[achievement.type];

              return (
                <motion.div
                  key={achievement.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className="trophy-card cursor-pointer group relative"
                  onClick={() => setSelected(achievement)}
                  role="button"
                  aria-label={`View ${achievement.title} details`}
                >
                  {/* Image if available */}
                  {achievement.image && (
                    <div className="relative h-36 overflow-hidden rounded-t-lg">
                      <Image src={achievement.image} alt={achievement.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
                    </div>
                  )}

                  <div className="p-5">
                    {/* Badge */}
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0"
                        style={{ background: `${achievement.color}15`, border: `1px solid ${achievement.color}40` }}
                      >
                        <Icon style={{ color: iconColor }} size={18} />
                      </div>
                      <div className="min-w-0">
                        <span
                          className="text-[10px] font-black uppercase tracking-widest"
                          style={{ color: achievement.color }}
                        >
                          {achievement.type}
                        </span>
                        <h3 className="text-silver-100 text-sm font-bold leading-tight mt-0.5 line-clamp-2">
                          {achievement.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-silver-500 text-xs">{achievement.issuer}</p>
                        <p className="text-silver-600 text-xs">{achievement.date}</p>
                      </div>
                      {achievement.type === "Champion" && (
                        <FiAward className="text-amber-400" size={18} />
                      )}
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/5">
                      <span className="text-crimson-300 text-xs font-semibold">View Details →</span>
                    </div>
                  </div>

                  {/* Glow on hover */}
                  <div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 30px ${achievement.color}10`,
                    }}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Toggle Button */}
        {ACHIEVEMENTS.length > 6 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-secondary w-full sm:w-auto px-12 justify-center"
            >
              {showAll ? "Show Less" : `View All ${ACHIEVEMENTS.length} Achievements`}
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
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="modal-box"
              onClick={(e) => e.stopPropagation()}
            >
              {selected.image && (
                <div className="relative h-48 overflow-hidden rounded-t-xl">
                  <Image src={selected.image} alt={selected.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest" style={{ color: selected.color }}>
                      {selected.type}
                    </span>
                    <h3 className="text-white font-black text-lg mt-1">{selected.title}</h3>
                    <p className="text-silver-400 text-sm">{selected.issuer} · {selected.date}</p>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-silver-500 hover:text-white p-1 flex-shrink-0" aria-label="Close">
                    <FiX size={20} />
                  </button>
                </div>
                <p className="text-silver-400 text-sm leading-relaxed mt-4">{selected.description}</p>
                {selected.link && (
                  <div className="mt-5 pt-4 border-t border-white/5">
                    <a
                      href={selected.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-sm inline-flex items-center gap-2 no-underline"
                    >
                      <FiExternalLink size={14} />
                      <span>View Source</span>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="section-divider mt-20" />
    </section>
  );
}
