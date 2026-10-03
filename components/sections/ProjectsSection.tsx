"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FEATURED_PROJECTS,
  GITHUB_REPOS,
  REPO_CATEGORIES,
  type Project,
  type RepoCategory,
} from "@/data/projects";
import { FiGithub, FiExternalLink, FiX, FiArrowUpRight } from "react-icons/fi";
import SectionHeading, { EASE_OUT } from "@/components/motion/SectionHeading";
import TiltCard from "@/components/motion/TiltCard";
import Reveal from "@/components/motion/Reveal";

const INITIAL_REPOS = 9;

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={project.name}
        initial={{ scale: 0.95, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
        className="modal-box w-full bg-[#0a0a0a] border border-white/20 p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <h3 className="text-white text-xl font-bold font-sans">{project.name}</h3>
            {project.role && <p className="text-xs text-zinc-400 mt-1 font-mono">{project.role}</p>}
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white p-1 border border-white/10 hover:border-white transition-colors cursor-pointer"
            aria-label="Close project details"
          >
            <FiX size={18} />
          </button>
        </div>

        {project.image && (
          <div className="relative h-52 sm:h-64 mt-4 overflow-hidden border border-white/10 bg-black">
            <Image
              src={project.image}
              alt={`${project.name} screenshot`}
              fill
              sizes="(max-width: 640px) 100vw, 600px"
              className="object-cover object-top"
            />
          </div>
        )}

        {project.impact && (
          <p className="mt-4 p-3 bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
            {project.impact}
          </p>
        )}

        <p className="text-zinc-300 text-sm leading-relaxed mt-4 font-sans">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs text-zinc-300 bg-white/5 border border-white/10 px-2 py-0.5">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-6 pt-4 border-t border-white/10">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-xs flex items-center gap-1.5"
          >
            <FiGithub size={13} />
            <span>View Code</span>
          </a>
          {project.homepage && (
            <a
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs flex items-center gap-1.5"
            >
              <FiExternalLink size={13} />
              <span>Live Site</span>
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function FeaturedCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay: (index % 3) * 0.1 }}
    >
      <TiltCard>
        <button
          type="button"
          onClick={onOpen}
          className="trophy-card group w-full h-full text-left flex flex-col justify-between cursor-pointer"
          aria-label={`Open ${project.name} details`}
        >
          <div>
            {project.image && (
              <div className="relative h-48 sm:h-52 overflow-hidden border-b border-white/10 bg-black">
                <Image
                  src={project.image}
                  alt={`${project.name} screenshot`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                {/* Curtain that wipes away when the card scrolls into view */}
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[#0d0d0d] origin-top"
                  initial={{ scaleY: 1 }}
                  whileInView={{ scaleY: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.15 + (index % 3) * 0.1 }}
                />
              </div>
            )}

            <div className="p-5">
              <div className="flex items-baseline justify-between gap-2 mb-1.5">
                <h3 className="text-white font-bold text-base sm:text-lg font-sans">{project.name}</h3>
                <span className="font-mono text-[11px] text-zinc-500 shrink-0">{project.language}</span>
              </div>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed line-clamp-3">{project.description}</p>
            </div>
          </div>

          <div className="px-5 pb-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
            <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
              {project.tags.slice(0, 2).map((t) => (
                <span key={t} className="text-zinc-400 bg-white/5 px-2 py-0.5">
                  {t}
                </span>
              ))}
            </div>
            <span className="font-mono text-white font-semibold transition-transform duration-300 group-hover:translate-x-1">
              Details →
            </span>
          </div>
        </button>
      </TiltCard>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [category, setCategory] = useState<"All" | RepoCategory>("All");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(
    () => (category === "All" ? GITHUB_REPOS : GITHUB_REPOS.filter((r) => r.category === category)),
    [category],
  );
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_REPOS);

  return (
    <section id="projects" className="section-base relative z-10">
      <div className="container-site">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Selected Work"
          description="Private, offline-first AI tools, computer vision research and mobile apps. Tap a card for the details."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_PROJECTS.map((project, i) => (
            <FeaturedCard key={project.id} project={project} index={i} onOpen={() => setSelected(project)} />
          ))}
        </div>

        {/* More from GitHub */}
        <Reveal className="mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-subheadline text-white">More from GitHub</h3>
              <p className="text-zinc-400 text-sm mt-1 font-sans">
                {GITHUB_REPOS.length} public repositories, from research models to client systems.
              </p>
            </div>
            <a
              href="https://github.com/darknecrocities"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-zinc-300 hover:text-white inline-flex items-center gap-1.5 underline-offset-4 hover:underline"
            >
              <FiGithub size={13} />
              <span>github.com/darknecrocities</span>
            </a>
          </div>

          {/* Filter tabs with a sliding active pill */}
          <div className="flex flex-wrap gap-1.5 mb-6" role="tablist" aria-label="Filter repositories">
            {REPO_CATEGORIES.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setCategory(cat);
                    setShowAll(false);
                  }}
                  className={`relative px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider border rounded-[2px] transition-colors cursor-pointer ${
                    active ? "text-black border-white" : "text-zinc-400 border-white/10 hover:text-white hover:border-white/30"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="repo-filter-pill"
                      className="absolute inset-0 bg-white rounded-[1px]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{cat}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <AnimatePresence mode="popLayout">
            {visible.map((repo, i) => (
              <motion.a
                layout
                key={repo.id}
                href={repo.homepage ?? repo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, ease: EASE_OUT, delay: Math.min(i, 8) * 0.035 }}
                className="group bg-[#0c0c0c] border border-white/10 p-5 hover:border-white/35 hover:bg-[#111] transition-colors flex flex-col justify-between no-underline"
                aria-label={`${repo.name}: ${repo.homepage ? "open live site" : "open repository"}`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-white text-sm font-bold font-sans">{repo.name}</h4>
                    <FiArrowUpRight
                      size={15}
                      className="text-zinc-500 shrink-0 transition-transform duration-300 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>
                  <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">{repo.description}</p>
                </div>
                <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-white/5 font-mono text-[10px] text-zinc-500">
                  <span>
                    {repo.language} · {repo.year}
                  </span>
                  <span className="uppercase tracking-wider">{repo.homepage ? "Live" : "Code"}</span>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length > INITIAL_REPOS && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="btn-secondary w-full sm:w-auto px-10 text-xs py-3"
            >
              {showAll ? "Show Less" : `Show All ${filtered.length}`}
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      <div className="section-divider mt-20" />
    </section>
  );
}
