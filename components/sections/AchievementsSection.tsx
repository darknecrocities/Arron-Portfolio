"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import Image from "next/image";
import { ACHIEVEMENTS, Achievement } from "@/data/achievements";
import { FiExternalLink, FiX, FiChevronRight, FiRepeat } from "react-icons/fi";
import SectionHeading from "@/components/motion/SectionHeading";
import ClothCurtain from "@/components/motion/ClothCurtain";

interface TrophyCardItemProps {
  achievement: Achievement;
  index: number;
  scrollProgress: MotionValue<number>;
  onInspect: (a: Achievement) => void;
}

const TROPHY_MASCOT_QUOTES = [
  "Ship-a-Little Trophy Winner! 🏆🐾",
  "RevenueCat Community Builder! 🚀",
  "Shipped & Awarded on Stage at Huawei! ⚡",
  "Zero Cloud Lag, 100% Native! ✨",
  "Purr-fect Execution! 🐾",
];

function TrophyMascotPerch() {
  const [catSpeech, setCatSpeech] = useState<string | null>(null);
  const [catWobble, setCatWobble] = useState(0);

  const handleCatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCatWobble((c) => c + 1);
    const q = TROPHY_MASCOT_QUOTES[Math.floor(Math.random() * TROPHY_MASCOT_QUOTES.length)];
    setCatSpeech(q);
    setTimeout(() => setCatSpeech(null), 3200);
  };

  return (
    <motion.div
      key={`cat-trophy-${catWobble}`}
      onClick={handleCatClick}
      whileHover={{ scale: 1.15, y: -4, rotate: 4 }}
      whileTap={{ scale: 0.9, y: 2, rotate: -5 }}
      style={{
        transform: "translateZ(-8px)",
        backfaceVisibility: "hidden",
      }}
      className="absolute -top-16 sm:-top-20 md:-top-24 right-2 sm:right-5 w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 z-0 cursor-pointer pointer-events-auto filter drop-shadow-[0_16px_35px_rgba(0,0,0,0.95)]"
      title="Click Cat Mascot!"
      role="button"
      tabIndex={0}
      aria-label="Cat Mascot Shipathon Winner"
    >
      <div className="relative w-full h-full">
        <Image
          src="/mascot/cat_mascot_animated.gif"
          alt="Animated Cat Mascot Trophy Companion"
          fill
          unoptimized
          className="object-contain"
        />
      </div>

      {/* Popover speech bubble */}
      <AnimatePresence>
        {catSpeech && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 6 }}
            transition={{ type: "spring", stiffness: 360, damping: 20 }}
            className="absolute right-0 bottom-full mb-1.5 whitespace-nowrap px-3 py-1.5 rounded-xl border border-amber-400/80 bg-[#120a06]/98 backdrop-blur-md shadow-2xl text-[11px] font-mono text-amber-300 font-bold z-50 pointer-events-none"
          >
            {catSpeech}
            <div className="absolute right-5 -bottom-1.5 w-3 h-3 bg-[#120a06] border-b border-r border-amber-400/80 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function TrophyCardItem({ achievement, index, scrollProgress, onInspect }: TrophyCardItemProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Staggered 3D scroll flip entry per column
  const startP = 0.14 + (index % 3) * 0.04;
  const endP = startP + 0.16;
  const scrollRotate = useTransform(scrollProgress, [startP, endP], [180, 0]);
  const finalRotateY = useTransform(scrollRotate, (rot) => (isFlipped ? rot + 180 : rot));

  const toggleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped((f) => !f);
  };

  return (
    <div className="w-full [perspective:1200px]">
      <motion.div
        layout
        style={{
          rotateY: finalRotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{ duration: 0.55, type: "spring", stiffness: 220, damping: 20 }}
        className={`relative w-full min-h-[380px] rounded-2xl will-change-transform cursor-pointer group ${
          achievement.id === "shipathon-appbuilders" ? "mt-8 sm:mt-12" : ""
        }`}
        onClick={() => onInspect(achievement)}
      >
        {/* Creative Cat Mascot Overlaying from Behind the Shipathon Trophy Card */}
        {achievement.id === "shipathon-appbuilders" && <TrophyMascotPerch />}

        {/* =================================================================
            FRONT FACE: TROPHY PHOTOGRAPHY & RECOGNITION
            ================================================================= */}
        <div
          style={{ transform: "translateZ(4px)" }}
          className="absolute inset-0 w-full h-full [backface-visibility:hidden] z-10 flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0d0d12]/95 backdrop-blur-xl hover:border-amber-400/40 hover:shadow-[0_16px_45px_rgba(245,158,11,0.15)] transition-all overflow-hidden"
        >
          <div>
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

                {/* Domo Insignia Stamp */}
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/75 border border-white/20 backdrop-blur-md text-[9px] font-mono text-amber-300 flex items-center gap-1 shadow-lg">
                  <span>⬡</span>
                  <span>VERIFIED</span>
                </div>

                {/* Quick 3D Flip Button */}
                <button
                  onClick={toggleFlip}
                  className="absolute top-2.5 left-2.5 p-1.5 rounded-full bg-black/75 border border-white/20 hover:border-amber-400 text-zinc-300 hover:text-amber-300 backdrop-blur-md transition-all shadow-lg cursor-pointer"
                  title="Flip Card in 3D"
                  aria-label="Flip Card in 3D"
                >
                  <FiRepeat size={12} />
                </button>
              </div>
            )}

            <div className="p-5">
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
        </div>

        {/* =================================================================
            BACK FACE: GILDED DOMO CHAMPIONSHIP GOLD SEAL
            ================================================================= */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-between p-6 rounded-2xl border-2 border-amber-400/60 bg-gradient-to-br from-[#1c1204] via-[#0d0903] to-[#2b1c06] shadow-[0_20px_50px_rgba(245,158,11,0.25)] text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.12)_0,transparent_70%)] pointer-events-none" />

          {/* Header Badge */}
          <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-amber-300/80 border-b border-amber-400/30 pb-3">
            <span className="tracking-widest uppercase">DOMO PODIUM #{index + 1}</span>
            <button
              onClick={toggleFlip}
              className="p-1 rounded-full bg-black/60 border border-amber-400/40 text-amber-300 hover:text-white transition-all cursor-pointer"
              title="Flip to Front"
            >
              <FiRepeat size={12} />
            </button>
          </div>

          {/* Center Laurel Trophy Insignia */}
          <div className="relative z-10 my-auto flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border-2 border-amber-400/80 bg-amber-500/10 flex items-center justify-center text-3xl shadow-[0_0_25px_rgba(245,158,11,0.5)] mb-3">
              🏆
            </div>
            <h4 className="text-amber-200 font-sans font-black text-sm sm:text-base leading-snug px-2">
              {achievement.title}
            </h4>
            <p className="text-amber-400/70 text-xs font-mono mt-1">{achievement.issuer}</p>
            <div className="mt-3 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider">
              {achievement.type} · {achievement.date}
            </div>
          </div>

          {/* Bottom Flip Trigger */}
          <div className="relative z-10 pt-3 border-t border-amber-400/30 flex items-center justify-center font-mono text-[10px] text-amber-300/80">
            <span>✦ Click Card to View Front Details ✦</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function AchievementsSection() {
  const [selected, setSelected] = useState<Achievement | null>(null);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll tracking for fluid cloth curtain reveal & 3D card flips
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 24,
    mass: 1.2,
    restDelta: 0.001,
  });

  // Underneath content scales up with spotlight clarity over longer runway
  const contentScale = useTransform(smoothProgress, [0.15, 0.42], [0.92, 1]);
  const contentOpacity = useTransform(smoothProgress, [0.15, 0.38], [0.2, 1]);

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

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="section-base relative z-10 overflow-hidden min-h-[185vh] md:min-h-[210vh] flex flex-col justify-center"
    >
      {/* =====================================================================
          THEATRICAL VELVET CURTAIN WITH OVERHEAD VALANCE & FOOTLIGHTS
          ===================================================================== */}
      <ClothCurtain scrollProgress={smoothProgress} />

      {/* =====================================================================
          UNVEILED CHAMPIONSHIP PODIUM CONTENT WITH 3D CARD FLIPS
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
                {stage.items.map((achievement, idx) => (
                  <TrophyCardItem
                    key={`desktop-${achievement.id}`}
                    achievement={achievement}
                    index={idx}
                    scrollProgress={smoothProgress}
                    onInspect={setSelected}
                  />
                ))}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* RESPONSIVE GRID (MOBILE / TABLET) */}
        <div className="grid sm:grid-cols-2 lg:hidden gap-4 mt-6">
          <AnimatePresence mode="popLayout">
            {displayedAchievements.map((achievement, idx) => (
              <TrophyCardItem
                key={`mobile-${achievement.id}`}
                achievement={achievement}
                index={idx}
                scrollProgress={smoothProgress}
                onInspect={setSelected}
              />
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
