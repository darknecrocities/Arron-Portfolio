"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FEATURED_PROJECTS, ALL_PROJECTS, Project } from "@/data/projects";
import { FiGithub, FiExternalLink, FiStar, FiX, FiTarget } from "react-icons/fi";

const LANG_COLORS: Record<string, string> = {
  Python: "#3776AB",
  TypeScript: "#3178C6",
  "Jupyter Notebook": "#DA5B0B",
  Dart: "#0175C2",
  JavaScript: "#F7DF1E",
  "C++": "#00599C",
  PHP: "#777BB4",
};

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="modal-box w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {project.image && (
          <div className="relative h-48 overflow-hidden rounded-t-xl">
            <Image src={project.image} alt={project.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-white text-xl font-black">{project.name}</h3>
              {project.role && <p className="text-crimson-300 text-sm mt-0.5">{project.role}</p>}
            </div>
            <button onClick={onClose} className="text-silver-500 hover:text-white p-1" aria-label="Close modal">
              <FiX size={20} />
            </button>
          </div>

          {project.impact && (
            <div className="mt-3 px-3 py-2 bg-crimson-600/10 border border-crimson-600/20 rounded-sm flex items-center gap-1.5">
              <FiTarget className="text-crimson-200 flex-shrink-0" size={14} />
              <span className="text-crimson-200 text-xs font-bold">Impact: </span>
              <span className="text-silver-300 text-xs">{project.impact}</span>
            </div>
          )}

          <p className="text-silver-400 text-sm leading-relaxed mt-4">{project.description}</p>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tags.map((tag) => (
              <span key={tag} className="text-[11px] text-silver-400 bg-white/5 border border-white/8 px-2 py-0.5 rounded-sm">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/5">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm flex items-center gap-2 no-underline"
            >
              <FiGithub size={14} />
              View on GitHub
            </a>
            {project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm flex items-center gap-2 no-underline"
              >
                <FiExternalLink size={14} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const [modal, setModal] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const isFirst = index === 0;

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.1 }}
        className={`trophy-card cursor-pointer ${isFirst ? "lg:col-span-2" : ""}`}
        onClick={() => setModal(true)}
        role="button"
        aria-label={`View ${project.name} details`}
      >
        <div className={`relative ${isFirst ? "lg:flex" : ""} overflow-hidden`}>
          {/* Image */}
          {project.image && (
            <div className={`relative ${isFirst ? "lg:w-1/2" : ""} h-48 overflow-hidden`}>
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
              {isFirst && (
                <div className="absolute top-3 left-3 bg-crimson-600 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-sm">
                  Flagship Project
                </div>
              )}
            </div>
          )}
          {/* Content */}
          <div className={`p-5 ${isFirst ? "lg:flex-1" : ""}`}>
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-silver-100 font-black text-base">{project.name}</h3>
              <div className="flex items-center gap-1 text-amber-400 text-xs">
                <FiStar size={12} />
                {project.stars}
              </div>
            </div>
            {project.role && (
              <p className="text-crimson-300 text-xs font-semibold mt-0.5">{project.role}</p>
            )}
            <p className="text-silver-400 text-xs leading-relaxed mt-2 line-clamp-3">{project.description}</p>
            {project.impact && (
              <p className="text-crimson-200 text-xs font-semibold mt-2 flex items-center gap-1">
                <FiTarget size={12} />
                <span>Impact: {project.impact}</span>
              </p>
            )}
            <div className="flex flex-wrap gap-1 mt-3">
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-[10px] text-silver-500 bg-white/5 px-1.5 py-0.5 rounded-sm border border-white/5">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/5">
              {project.language && (
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: LANG_COLORS[project.language] || "#777" }} />
                  <span className="text-silver-500 text-xs">{project.language}</span>
                </div>
              )}
              <span className="text-crimson-300 text-xs font-medium ml-auto">View Details →</span>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {modal && <ProjectModal project={project} onClose={() => setModal(false)} />}
      </AnimatePresence>
    </>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="projects" ref={ref} className="section-base relative z-10">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-crimson-400" />
            <span className="text-crimson-200 text-xs font-bold uppercase tracking-[0.2em]">Projects</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>
          <h2 className="text-headline text-white font-black">Flagship Showcase</h2>
          <p className="text-silver-400 text-sm mt-2 max-w-xl">
            From AI research to full-stack platforms — projects that solve real-world problems.
          </p>
        </motion.div>

        {/* Featured grid */}
        <div className="grid lg:grid-cols-2 gap-4 mb-8">
          {FEATURED_PROJECTS.map((project, i) => (
            <FeaturedCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* All projects toggle */}
        <div className="mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="btn-secondary w-full justify-center"
          >
            {showAll ? "Show Less" : `View All ${ALL_PROJECTS.length + FEATURED_PROJECTS.length}+ Projects`}
          </button>
        </div>

        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-6"
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {ALL_PROJECTS.map((project, i) => (
                  <motion.a
                    key={project.id}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="cert-card p-4 no-underline block"
                    aria-label={`View ${project.name} on GitHub`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="text-silver-200 text-sm font-bold">{project.name}</h4>
                      <div className="flex items-center gap-1 text-amber-400 text-xs flex-shrink-0">
                        <FiStar size={11} />
                        {project.stars}
                      </div>
                    </div>
                    <p className="text-silver-500 text-xs leading-relaxed line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[10px] text-silver-600 bg-white/4 px-1.5 py-0.5 rounded-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.language && (
                      <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-white/5">
                        <div className="w-2 h-2 rounded-full" style={{ background: LANG_COLORS[project.language] || "#777" }} />
                        <span className="text-silver-600 text-[10px]">{project.language}</span>
                      </div>
                    )}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
