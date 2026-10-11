"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FiExternalLink,
  FiGithub,
  FiCheck,
  FiZap,
  FiArrowUpRight,
  FiChevronRight,
} from "react-icons/fi";
import { DOMO_PROJECTS, DomoProjectItem } from "@/data/domoProjects";

/* =========================================================================
   APP ICON STACK COMPONENT (Matches Image 4)
   ========================================================================= */

interface AppIconStackProps {
  onSelectProject?: (projectId: string) => void;
  selectedId?: string | null;
}

const STACK_ICONS = [
  { id: "domodomo", src: "/domo/domodomo_v2.png", alt: "DomoDomo (Panda Mascot)", rotate: -10, bg: "#121214" },
  { id: "domoskills", src: "/domo/domoskills.png", alt: "DomoSkills", rotate: -5, bg: "#121214" },
  { id: "domonote", src: "/domo/domonote.png", alt: "DomoNote", rotate: 0, bg: "#121214" },
  { id: "domoscope", src: "/domo/domoscope.png", alt: "DomoScope", rotate: 4, bg: "#121214" },
  { id: "codepyne", src: "/domo/codepyne.png", alt: "Codepyne", rotate: 8, bg: "#121214" },
  { id: "domolens", src: "/domo/domolens.png", alt: "DomoLens", rotate: 12, bg: "#121214" },
];

function AppIconStack({ onSelectProject, selectedId }: AppIconStackProps) {
  return (
    <div className="relative w-full max-w-xl mx-auto my-3 sm:my-5 flex flex-col items-center select-none">
      {/* Subtle silver glow behind stack */}
      <div className="pointer-events-none absolute -inset-3 rounded-full bg-white/5 blur-2xl" />

      {/* Interactive Fanned App Icon Stack */}
      <div className="relative flex items-center justify-center py-2 px-4 overflow-visible">
        {STACK_ICONS.map((item, idx) => {
          const isSelected = selectedId === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => onSelectProject?.(item.id)}
              animate={{
                y: isSelected ? -14 : [0, -7, 0],
                rotate: isSelected ? 0 : [item.rotate, item.rotate + (idx % 2 === 0 ? 2 : -2), item.rotate],
                scale: isSelected ? 1.12 : [1, 1.04, 1],
              }}
              transition={{
                duration: 3.2 + (idx * 0.35),
                repeat: Infinity,
                ease: "easeInOut",
                delay: idx * 0.2,
              }}
              whileHover={{
                y: -16,
                scale: 1.22,
                rotate: 0,
                zIndex: 40,
                transition: { type: "spring", stiffness: 350, damping: 20 },
              }}
              whileTap={{ scale: 0.95 }}
              className={`relative -ml-4 sm:-ml-6 first:ml-0 rounded-[16px] sm:rounded-[20px] shadow-[0_12px_28px_rgba(0,0,0,0.85)] border border-white/20 overflow-hidden transition-all duration-300 focus:outline-none cursor-pointer ${
                isSelected ? "ring-2 ring-white scale-110 z-30 -translate-y-3" : ""
              }`}
              style={{
                width: "clamp(52px, 6vw, 68px)",
                height: "clamp(52px, 6vw, 68px)",
                transform: `rotate(${item.rotate}deg)`,
                zIndex: idx + 10,
                backgroundColor: item.bg,
              }}
              title={item.alt}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="68px"
                className="object-cover"
                priority={idx < 3}
              />
              <div className="pointer-events-none absolute inset-0 rounded-[16px] sm:rounded-[20px] ring-1 ring-inset ring-white/25" />
            </motion.button>
          );
        })}
      </div>

      <p className="text-[11px] font-mono text-zinc-500 mt-1">
        ✦ Domo Ecosystem Suite · Click any app icon to inspect
      </p>
    </div>
  );
}

/* =========================================================================
   DOMO ECOSYSTEM GRID COMPONENT (Matches Image 3)
   ========================================================================= */

interface DomoEcosystemGridProps {
  className?: string;
}

export default function DomoEcosystemGrid({ className = "" }: DomoEcosystemGridProps) {
  const [selectedProject, setSelectedProject] = useState<DomoProjectItem | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const handleSelectFromStack = (id: string) => {
    setHighlightedId(id);
    const found = DOMO_PROJECTS.find((p) => p.id === id);
    if (found) {
      setSelectedProject(found);
    }
    const cardEl = document.getElementById(`card-${id}`);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  return (
    <div className={`relative w-full max-w-6xl mx-auto flex flex-col justify-center ${className}`}>
      {/* FLOATING AMBIENT PARTICLES (Matches Image 3) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/6 w-1 h-1 rounded-full bg-white/40 blur-[1px]" />
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-white/30 blur-[1px]" />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-white/20 blur-[2px]" />
      </div>

      {/* HEADER: Clean & prominent (Matches Image 3) */}
      <div className="text-center mb-2 sm:mb-4 px-2 sm:px-3">
        {/* Title */}
        <h3 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white font-sans leading-tight">
          Connected Platforms &amp; Autonomous Tools
        </h3>

        {/* Subtitle */}
        <p className="text-zinc-400 text-[11px] sm:text-sm max-w-2xl mx-auto mt-1 sm:mt-1.5 font-sans leading-relaxed">
          Integrated, privacy-first companion applications engineered for modern developers, security
          analysts, and AI agents. Click any application below to view technical architecture.
        </p>
      </div>

      {/* APP ICON STACK (Matches Image 4) */}
      <AppIconStack onSelectProject={handleSelectFromStack} selectedId={highlightedId} />

      {/* 6 CARDS (Responsive Carousel on mobile, 3x2 Grid on desktop) */}
      <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 px-2 sm:px-3 mt-1 sm:mt-2 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 scrollbar-none snap-x">
        {DOMO_PROJECTS.map((project, index) => {
          const isHighlighted = highlightedId === project.id;

          return (
            <motion.div
              id={`card-${project.id}`}
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.015 }}
              className={`group relative flex flex-col justify-between rounded-2xl border bg-[#141417]/95 backdrop-blur-2xl p-4 sm:p-5 shadow-[0_12px_40px_rgba(0,0,0,0.9)] transition-all duration-300 text-left min-w-[260px] max-w-[290px] sm:min-w-0 sm:max-w-none flex-shrink-0 sm:flex-shrink snap-center ${
                isHighlighted
                  ? "border-white shadow-[0_0_30px_rgba(255,255,255,0.25)] ring-1 ring-white/50"
                  : "border-white/15 hover:border-white/30 hover:shadow-[0_16px_45px_rgba(0,0,0,0.95)]"
              }`}
            >
              <div>
                {/* TOP ROW: Squircle App Icon + Category Badge (Matches Image 3) */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  {/* Real Squircle App Icon (Continuous Non-Stop Breathing - GPU accelerated) */}
                  <motion.div
                    animate={{
                      y: [0, -3, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                    className="relative w-11 h-11 rounded-[14px] overflow-hidden border border-white/20 bg-black shadow-md flex-shrink-0 group-hover:scale-110 transition-transform duration-300 will-change-transform"
                  >
                    <Image
                      src={project.iconUrl}
                      alt={project.name}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-[14px] ring-1 ring-inset ring-white/25" />
                  </motion.div>

                  {/* Category Pill */}
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono text-zinc-400 bg-white/5 border border-white/10 select-none whitespace-nowrap">
                    {project.category}
                  </span>
                </div>

                {/* MIDDLE: App Title with Arrow ↗ (Matches Image 3) */}
                <div>
                  <a
                    href={project.demoUrl || project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/title inline-flex items-center gap-1.5 text-base sm:text-lg font-bold text-white hover:text-zinc-200 transition-colors"
                  >
                    <span>{project.displayName}</span>
                    <FiArrowUpRight className="text-sm text-zinc-400 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-transform" />
                  </a>

                  {/* 2-line Description */}
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans line-clamp-2 mt-1.5">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* CARD FOOTER: "⚡ Quick View" + "View >" (Matches Image 3) */}
              <div className="flex items-center justify-between pt-3.5 mt-3.5 border-t border-white/5 text-xs text-zinc-400">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer py-1"
                >
                  <FiZap className="text-[11px] text-zinc-300" />
                  <span>Quick View</span>
                </button>

                <a
                  href={project.demoUrl || project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 font-medium hover:text-white transition-colors py-1"
                >
                  <span>View</span>
                  <FiChevronRight className="text-xs text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
      <p className="text-[10px] font-mono text-zinc-500 text-center mt-2 sm:hidden select-none">
        ← Swipe cards to explore all 6 apps →
      </p>

      {/* SPECS MODAL: On "Quick View" Click */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-[#141416] p-6 shadow-2xl text-left"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-[14px] overflow-hidden border border-white/15 bg-black shadow-lg">
                    <Image
                      src={selectedProject.iconUrl}
                      alt={selectedProject.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedProject.displayName}</h3>
                    <p className="text-xs font-mono text-zinc-400">{selectedProject.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-zinc-400 hover:text-white text-lg p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                {selectedProject.description}
              </p>

              <div className="mb-5">
                <h5 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  Key Capabilities &amp; Architecture
                </h5>
                <ul className="space-y-1.5 text-xs text-zinc-300">
                  {selectedProject.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <FiCheck className="text-white flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3.5 border-t border-zinc-800">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-900 text-xs font-medium text-white hover:bg-zinc-800 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <FiGithub /> View on GitHub
                </a>
                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg text-xs font-medium text-black bg-white hover:bg-zinc-200 transition-colors inline-flex items-center gap-1.5 shadow-lg font-sans cursor-pointer"
                  >
                    <span>Launch</span>
                    <FiExternalLink />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
