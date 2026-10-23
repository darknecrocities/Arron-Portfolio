"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FiExternalLink,
  FiGithub,
  FiCheck,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiArrowUp,
  FiMessageSquare,
  FiStar,
} from "react-icons/fi";
import { DomoProjectItem } from "@/data/domoProjects";

interface DomoAppModalProps {
  project: DomoProjectItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function DomoAppModal({
  project,
  onClose,
  onPrev,
  onNext,
}: DomoAppModalProps) {
  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (!project) return;
    window.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll while modal is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [project, handleKeyDown]);

  return (
    <AnimatePresence>
      {project && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-app-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-xl"
          onClick={onClose}
        >
          {/* Prevent clicks inside card from closing */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 25 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/20 bg-[#121215]/98 p-5 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.95)] text-left scrollbar-none"
          >
            {/* Ambient Silver Sheen in Modal Top */}
            <div className="pointer-events-none absolute top-0 left-1/4 right-1/4 h-24 bg-white/5 blur-3xl -z-10" />

            {/* TOP BAR: App Icon + Title + Category + Close Button */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3.5">
                {/* App Squircle Icon */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-[18px] overflow-hidden border border-white/20 bg-black shadow-xl flex-shrink-0">
                  <Image
                    src={project.iconUrl}
                    alt={project.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-[18px] ring-1 ring-inset ring-white/25" />
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 id="modal-app-title" className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                      {project.displayName}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-zinc-300 bg-white/5 border border-white/10">
                      {project.category}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-zinc-300 mt-1 font-sans">
                    {project.tagline}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer flex-shrink-0"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            {/* APPBUILDERSPH COMMUNITY STATS BADGES */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap py-3 border-b border-white/10 text-xs">
              {/* Upvotes */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-semibold">
                <FiArrowUp className="text-sm stroke-[3]" />
                <span>{project.upvotes} Upvotes</span>
              </div>

              {/* Comments (if available) */}
              {project.commentsCount !== undefined && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 font-mono">
                  <FiMessageSquare className="text-xs" />
                  <span>{project.commentsCount} Comments</span>
                </div>
              )}

              {/* Rating (if available) */}
              {project.rating !== undefined && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono">
                  <FiStar className="text-xs fill-amber-400" />
                  <span>5.0 Star Rating</span>
                </div>
              )}

              {/* AppBuildersPH Maker Source Link */}
              <a
                href={project.appBuildersUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-white transition-colors ml-auto"
              >
                <span>AppBuildersPH Maker</span>
                <FiExternalLink className="text-[10px]" />
              </a>
            </div>

            {/* DESCRIPTION */}
            <div className="py-4">
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Overview &amp; Architecture
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                {project.description}
              </p>
            </div>

            {/* KEY FEATURES CHECKLIST */}
            <div className="pb-4">
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
                Core Capabilities
              </h4>
              <ul className="space-y-2">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-200">
                    <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-white">
                      <FiCheck className="text-[10px]" />
                    </span>
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* TAGS */}
            <div className="flex flex-wrap gap-1.5 pb-5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-[10px] font-mono text-zinc-400 bg-white/5 border border-white/5"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* FOOTER: Prev / Next Nav + Action Buttons */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10 flex-wrap">
              {/* Prev / Next App Controls */}
              <div className="flex items-center gap-1.5">
                {onPrev && (
                  <button
                    type="button"
                    onClick={onPrev}
                    aria-label="Previous app"
                    className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <FiChevronLeft className="text-base" />
                  </button>
                )}
                {onNext && (
                  <button
                    type="button"
                    onClick={onNext}
                    aria-label="Next app"
                    className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <FiChevronRight className="text-base" />
                  </button>
                )}
                <span className="text-[11px] font-mono text-zinc-500 ml-1">
                  Use ← → keys
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2.5">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl border border-white/15 bg-zinc-900/90 hover:bg-zinc-800 text-xs font-medium text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <FiGithub className="text-sm" />
                  <span>GitHub</span>
                </a>

                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-black bg-white hover:bg-zinc-200 transition-colors inline-flex items-center gap-1.5 shadow-lg font-sans cursor-pointer"
                  >
                    <span>Launch</span>
                    <FiExternalLink className="text-xs" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
