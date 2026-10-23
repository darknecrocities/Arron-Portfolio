"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { ACHIEVEMENTS, Achievement } from "@/data/achievements";
import { FiExternalLink, FiX, FiChevronRight } from "react-icons/fi";
import SectionHeading from "@/components/motion/SectionHeading";
import ClothCurtain from "@/components/motion/ClothCurtain";

export default function AchievementsSection() {
  const [selected, setSelected] = useState<Achievement | null>(null);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll tracking for fluid cloth curtain reveal
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 38,
    damping: 24,
    mass: 1.25,
    restDelta: 0.001,
  });

  // Underneath content scales up with spotlight clarity
  const contentScale = useTransform(smoothProgress, [0.18, 0.48], [0.93, 1]);
  const contentOpacity = useTransform(smoothProgress, [0.18, 0.46], [0.35, 1]);

  const displayedAchievements = showAll ? ACHIEVEMENTS : ACHIEVEMENTS.slice(0, 6);

  // Group into 3 stages for podium column cascade
  const col1 = displayedAchievements.filter((_, i) => i % 3 === 0);
  const col2 = displayedAchievements.filter((_, i) => i % 3 === 1);
  const col3 = displayedAchievements.filter((_, i) => i % 3 === 2);

  const STAGES = [
    { label: "Stage I · National Honors", items: col1, isCenter: false },
    { label: "Stage II · Championship Podium", items: col2, isCenter: true },
    { label: "Stage III · Academic & Industry Merit", items: col3, isCenter: false },
  ];

  const renderCard = (achievement: Achievement, keyPrefix: string) => (
    <motion.div
      key={`${keyPrefix}-${achievement.id}`}
      layout
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="trophy-card cursor-pointer group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0d0d12]/95 backdrop-blur-xl hover:border-amber-400/40 hover:shadow-[0_16px_45px_rgba(245,158,11,0.12)] transition-all overflow-hidden"
      onClick={() => setSelected(achievement)}
      role="button"
      aria-label={`View ${achievement.title} details`}
    >
      <div>
        {/* Award / Trophy Hero Photography */}
        {achievement.image && (
          <div className="relative h-44 overflow-hidden border-b border-white/10 bg-black/60 group-hover:bg-black/20 transition-all duration-500">
            <Image
              src={achievement.image}
              alt={achievement.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
              className="object-cover transition-transform duration-700 group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12] via-transparent to-transparent pointer-events-none" />

            {/* Domo Insignia Stamp in Corner */}
            <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/75 border border-white/20 backdrop-blur-md text-[9px] font-mono text-amber-300 flex items-center gap-1 shadow-lg">
              <span>⬡</span>
              <span>VERIFIED</span>
            </div>
          </div>
        )}

        <div className="p-5">
          {/* Tag & Date */}
          <div className="flex items-center justify-between gap-2 mb-2 font-mono">
            <span
              className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                achievement.type === "Champion"
                  ? "bg-amber-400/15 border-amber-400/40 text-amber-300"
                  : achievement.type === "Award"
                  ? "bg-emerald-400/15 border-emerald-400/40 text-emerald-300"
                  : "bg-white/10 border-white/20 text-white"
              }`}
            >
              {achievement.type}
            </span>
            <span className="text-[10px] text-zinc-500">{achievement.date}</span>
          </div>

          <h3 className="text-white text-sm sm:text-base font-bold font-sans leading-tight mt-1 group-hover:text-amber-200 transition-colors">
            {achievement.title}
          </h3>

          <p className="text-zinc-400 text-xs mt-1.5 font-mono">{achievement.issuer}</p>

          <p className="text-zinc-400 text-xs leading-relaxed mt-2.5 line-clamp-2">
            {achievement.description}
          </p>
        </div>
      </div>

      <div className="px-5 pb-4 pt-2.5 border-t border-white/5 flex items-center justify-between font-mono text-[11px]">
        <span className="text-zinc-500">Inspection</span>
        <span className="text-white font-semibold group-hover:text-amber-300 group-hover:translate-x-1 transition-all inline-flex items-center gap-1">
          <span>Inspect Award</span>
          <FiChevronRight className="text-xs" />
        </span>
      </div>
    </motion.div>
  );

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="section-base relative z-10 overflow-hidden"
    >
      {/* =====================================================================
          PHYSICS-BASED CLOTH CURTAIN WITH 3D VELVET FLUTES & ACCORDION GATHERING
          ===================================================================== */}
      <ClothCurtain scrollProgress={smoothProgress} />

      {/* =====================================================================
          UNVEILED CHAMPIONSHIP PODIUM CONTENT
          ===================================================================== */}
      <motion.div
        style={{ scale: contentScale, opacity: contentOpacity }}
        className="container-site relative z-10 will-change-transform"
      >
        {/* DOMO VICTORY AMBIENT WATERMARK */}
        <div className="pointer-events-none absolute top-10 right-10 w-96 h-96 -z-10 opacity-5 blur-[1px]">
          <Image
            src="/shipathon-trophy.png"
            alt="Domo Championship Trophy"
            fill
            className="object-contain"
          />
        </div>

        <SectionHeading
          eyebrow="Honors & Awards"
          title="Championship Wall"
          description="National championships, hackathon victories, and academic distinction across competitive arenas."
        />

        {/* 3-COLUMN PODIUM CASCADE (DESKTOP) */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 items-start mt-8">
          {STAGES.map((stage) => (
            <div
              key={stage.label}
              className={`flex flex-col gap-5 relative ${
                stage.isCenter ? "lg:-translate-y-3" : ""
              }`}
            >
              {/* Podium Highlight Aura for Center Stage */}
              {stage.isCenter && (
                <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-amber-500/[0.04] blur-3xl -z-10" />
              )}

              {/* Stage Header */}
              <div className="flex items-center gap-2 px-1 font-mono text-[10px] text-amber-300/80 uppercase tracking-widest border-b border-white/10 pb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>{stage.label}</span>
              </div>

              {/* Column Cards */}
              <AnimatePresence mode="popLayout">
                {stage.items.map((achievement) => renderCard(achievement, "desktop"))}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* RESPONSIVE GRID (MOBILE / TABLET) */}
        <div className="grid sm:grid-cols-2 lg:hidden gap-4 mt-6">
          <AnimatePresence mode="popLayout">
            {displayedAchievements.map((achievement) => (
              <div key={`mobile-${achievement.id}`}>
                {renderCard(achievement, "mobile")}
              </div>
            ))}
          </AnimatePresence>
        </div>

        {/* TOGGLE ALL AWARDS */}
        {ACHIEVEMENTS.length > 6 && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-secondary px-8 py-3 rounded-xl text-xs font-mono tracking-wider uppercase border border-white/20 hover:border-amber-400/40 hover:text-amber-300 transition-colors cursor-pointer"
            >
              {showAll ? "Show Less" : "View Complete Trophy Vault"}
            </button>
          </div>
        )}
      </motion.div>

      {/* INSPECTION MODAL */}
      <AnimatePresence>
        {selected && (
          <div
            className="modal-overlay"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ duration: 0.2 }}
              className="modal-box bg-[#0c0c10] border border-amber-400/30 p-6 sm:p-7 relative rounded-2xl shadow-2xl max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {selected.image && (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/15 mb-4 bg-black flex items-center justify-center">
                  <Image
                    src={selected.image}
                    alt={selected.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 750px"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex items-start justify-between gap-4 pb-3 border-b border-white/10 font-mono">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black bg-amber-400 px-2.5 py-0.5 rounded-full">
                    {selected.type}
                  </span>
                  <h3 className="text-white font-bold text-lg font-sans mt-2">{selected.title}</h3>
                  <p className="text-zinc-400 text-xs mt-1">
                    {selected.issuer} · {selected.date}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-zinc-400 hover:text-white p-1 rounded-full border border-white/10 hover:border-white transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <FiX size={18} />
                </button>
              </div>

              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mt-4 font-sans whitespace-pre-line">
                {selected.description}
              </p>

              {selected.link && (
                <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs inline-flex items-center gap-2 px-4 py-2 rounded-xl"
                  >
                    <FiExternalLink size={13} />
                    <span>Official Reference</span>
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="section-divider mt-20" />
    </section>
  );
}
