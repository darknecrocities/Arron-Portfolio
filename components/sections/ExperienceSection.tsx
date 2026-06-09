"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { EXPERIENCE, EDUCATION } from "@/data/experience";
import { FiBriefcase, FiBook, FiChevronDown, FiChevronUp, FiStar } from "react-icons/fi";

function ExperienceCard({ exp, index }: { exp: typeof EXPERIENCE[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.08 }}
      className="leadership-node relative pl-14"
    >
      {/* Timeline dot */}
      <div className={`timeline-dot mt-2 ${exp.highlight ? "glow-red-md" : ""}`} style={{ top: 8 }} />

      {/* Card */}
      <div
        className={`cert-card p-5 cursor-pointer ${exp.highlight ? "border-crimson-600/20" : ""}`}
        onClick={() => setExpanded(!expanded)}
        role="button"
        aria-expanded={expanded}
        aria-label={`${exp.role} at ${exp.company}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="text-silver-100 font-bold text-sm">{exp.role}</h3>
              {exp.highlight && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-crimson-200 bg-crimson-600/10 border border-crimson-600/20 px-2 py-0.5 rounded-sm">
                  Featured
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-crimson-300 text-xs font-semibold">{exp.company}</span>
              <span className="text-silver-600 text-xs">{exp.period}</span>
            </div>
          </div>
          <button className="text-silver-500 hover:text-crimson-200 transition-colors flex-shrink-0 mt-0.5" aria-label="Toggle details">
            {expanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
          </button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-silver-400 text-sm leading-relaxed mt-3 pt-3 border-t border-white/5">
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {exp.tags.map((tag) => (
                  <span key={tag} className="text-[10px] text-silver-500 bg-white/5 px-2 py-0.5 rounded-sm border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [tab, setTab] = useState<"experience" | "education">("experience");

  return (
    <section id="experience" ref={ref} className="section-base relative z-10">
      <div className="container-site">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-crimson-400" />
            <span className="text-crimson-200 text-xs font-bold uppercase tracking-[0.2em]">Career</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>
          <h2 className="text-headline text-white font-black">Experience & Education</h2>
          <p className="text-silver-400 text-sm mt-2 max-w-xl">
            From NVIDIA and Microsoft internships to founding a developer community — a journey of continuous growth.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-10">
          <button
            onClick={() => setTab("experience")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold uppercase tracking-wider rounded-sm border transition-all ${
              tab === "experience"
                ? "border-crimson-600/40 text-crimson-200 bg-crimson-600/10"
                : "border-white/10 text-silver-400 hover:text-silver-200"
            }`}
          >
            <FiBriefcase size={14} />
            Experience
          </button>
          <button
            onClick={() => setTab("education")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold uppercase tracking-wider rounded-sm border transition-all ${
              tab === "education"
                ? "border-crimson-600/40 text-crimson-200 bg-crimson-600/10"
                : "border-white/10 text-silver-400 hover:text-silver-200"
            }`}
          >
            <FiBook size={14} />
            Education
          </button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {tab === "experience" ? (
            <motion.div
              key="experience"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              {/* Timeline line */}
              <div className="timeline-line" style={{ left: "24px" }} />
              <div className="space-y-4">
                {EXPERIENCE.map((exp, i) => (
                  <ExperienceCard key={exp.id} exp={exp} index={i} />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="education"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              <div className="timeline-line" style={{ left: "24px" }} />
              <div className="space-y-4">
                {EDUCATION.map((edu, i) => (
                  <motion.div
                    key={edu.degree + i}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="leadership-node relative pl-14"
                  >
                    <div className="timeline-dot" style={{ top: 12 }} />
                    <div className="cert-card p-5">
                      <h3 className="text-silver-100 font-bold text-sm">{edu.degree}</h3>
                      <p className="text-crimson-300 text-xs font-semibold mt-0.5">{edu.school}</p>
                      <p className="text-silver-600 text-xs mt-0.5">{edu.period}</p>
                      {edu.note && (
                        <p className="text-amber-400/80 text-xs mt-2 font-medium flex items-center gap-1">
                          <FiStar size={12} className="flex-shrink-0" />
                          <span>{edu.note}</span>
                        </p>
                      )}
                    </div>
                  </motion.div>
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
